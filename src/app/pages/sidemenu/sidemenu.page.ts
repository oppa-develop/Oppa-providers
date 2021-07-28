import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { WebsocketService } from 'src/app/providers/websocket/websocket.service';
import { environment } from 'src/environments/environment';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  pages = [
    { title: 'Servicios', icon: 'construct-outline', url: '/sidemenu/services/calendar' },
    { title: 'Mis Datos', icon: 'person-outline', url: '/sidemenu/account' },
    { title: 'Mensajes', icon: 'chatbox-ellipses-outline', url: '/sidemenu/messages' },
    { title: 'Facturas', icon: 'receipt-outline', url: '/sidemenu/bills' },
    { title: 'Ayuda', icon: 'help-circle-outline', url: '/sidemenu/help' },
  ]

  selectedPath = ''
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches || false;
  apiUrl: string = environment.HOST + '/'
  user: User
  notificationState: string
  requestingServiceAlert

  constructor(
    private auth: AuthService,
    protected ws: WebsocketService,
    private alertController: AlertController,
    private dateFormat: DatePipe,
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private backgroundMode: BackgroundMode,
    public router: Router,
    private localNotifications: LocalNotifications
  ) { }

  ngOnInit() {
    this.backgroundMode.enable();
    this.backgroundMode.overrideBackButton();
    this.user = this.auth.userData();
    if (localStorage.getItem('darkMode') === 'on') {
      document.body.setAttribute('data-theme', 'dark');
      this.darkMode = true
    } else {
      document.body.setAttribute('data-theme', 'light');
      this.darkMode = false
    }
    this.ws.connect();
    // aqui el proveedor se suscribe a las notificaciones
    this.ws.emit('notificationsProvider', {
      user_id: this.user.user_id,
      provider_id: this.user.provider_id
    });
    this.ws.emit('notificationsClient', {
      user_id: this.user.user_id,
      provider_id: this.user.provider_id
    });
    this.ws.listen('notificateProvider').subscribe((data: any) => {
      //cuando llega una notificación, hace lo siguiente:
      this.notificationState = data.state
      if (this.notificationState === 'requesting') {
        this.localNotifications.schedule({
          id: 1,
          title: 'Nueva solicitud de servicio',
          text: `${data.receptor.firstname} ${data.receptor.lastname} solicita el servicio ${data.service.title}, el día ${this.dateFormat.transform(data.date, 'fullDate')}, a las ${this.dateFormat.transform(data.start, 'hh:mm a')}, en ${data.address.district}.`,
          launch: true
        });
        this.openRequestingServiceAlert(data)
      } else if (this.notificationState === 'canceling') {
        this.requestingServiceAlert.dismiss()
        this.presentToast(`Solicitud de servicio cancelada`, 'danger')
      }
    })
    this.ws.listen('notificateUser').subscribe((data: any) => {
      console.log(data);
      if (this.router.url !== '/sidemenu/messages' && data.type === 'message') this.presentToast(`Nuevo mensaje de ${data.firstname} ${data.lastname}:\n${data.text}`, 'dark')
    })
  }

  ionViewWillEnter() {
    this.user = this.auth.userData()
  }

  logout() {
    this.auth.logout()
  }

  onClick(event) {
    if (event.detail.checked) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('darkMode', 'on');
    }
    else {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('darkMode', 'off');
    }
  }

  async openRequestingServiceAlert(data) {
    this.requestingServiceAlert = await this.alertController.create({
      header: 'Agendar Servicio',
      message: `${data.receptor.firstname} ${data.receptor.lastname} solicita el servicio ${data.service.title}, el día ${this.dateFormat.transform(data.date, 'fullDate')}, a las ${this.dateFormat.transform(data.start, 'hh:mm a')}, en ${data.address.district}.`,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          data.state = 'canceled'
          this.ws.emit('notificateUser', data)
          console.log('Agendar servicio cancelado');
        }
      }, {
        text: 'Agendar',
        handler: () => {
          console.log('Agendando servicio');
          this.requestingServiceAlert.onDidDismiss().then(async () => {
            data.state = 'accepted'
            data.provider = this.user
            this.ws.emit('notificateUser', data)
            const loading = await this.loadingController.create({
              message: 'Esperando confirmación del usuario...'
            });
            await loading.present();
            const serviceConfirmation = this.ws.listen('serviceConfirmation').subscribe((data: any) => {
              console.log(data);
              loading.dismiss();
              serviceConfirmation.unsubscribe()
              if (data.success) {
                this.presentToast('Servicio agendado', 'success')
              } else {
                this.presentToast('Servicio cancelado', 'danger')
              }
            })
          })
        }
      }]
    });

    await this.requestingServiceAlert.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

}
