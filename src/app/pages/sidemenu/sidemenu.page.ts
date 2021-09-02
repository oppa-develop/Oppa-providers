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
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  pages = [
    { title: 'Servicios', icon: 'construct-outline',          url: '/sidemenu/services/calendar' },
    { title: 'Mis Datos', icon: 'person-outline',             url: '/sidemenu/account' },
    { title: 'Mensajes',  icon: 'chatbox-ellipses-outline',   url: '/sidemenu/messages' },
    { title: 'Facturas',  icon: 'receipt-outline',            url: '/sidemenu/bills' },
    { title: 'Ayuda',     icon: 'help-circle-outline',        url: '/sidemenu/help' },
  ]

  selectedPath = ''
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches || false;
  apiUrl: string = environment.HOST + '/'
  user: User
  appState: string = 'ok'
  requestingServiceAlert
  paymentLoading

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
    // nos conectamos a la sala de notificaciones
    this.ws.listen('notification').subscribe((data: any) => {
      if (data.type === 'notification' && this.appState === 'ok') {
        this.appState = 'busy'
        console.log('Notification received:', data);
      } else if (data.type === 'service request' && this.appState === 'ok') {
        this.appState = 'busy'
        console.log('Client requesting service:', data);
        this.showClientRequest(data);
      } else if (data.type === 'client payment' && this.appState === 'ok') {
        this.appState = 'busy'
        console.log('Client payment:', data);
        this.paymentLoading.dismiss();
        this.appState = 'ok'
        if (data.state === 'payment accepted') {
          this.presentToast('El cliente ha pagdo el servicio', 'success');
        } else if (data.state === 'payment rejected') {
          this.presentToast('Cliente ha cancelado el servicio', 'danger');
        }
      } else if (this.appState === 'busy') { // si estamos con alert en pantalla o loading se cancelan las solicitudes con un estado especial
        this.ws.emit('notification', { type: 'service request', emitter: this.user.user_id, destination: data.emitter, message: `Respuesta del proveedor ${this.user.firstname} ${this.user.lastname}`, state: 'provider busy' })
      }
    })
  }

  logout() {
    this.auth.logout()
  }

  onClick(event) {
    if (event.detail.checked) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('darkMode', 'on');
    } else {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('darkMode', 'off');
    }
  }

  async showClientRequest(data) {
    this.appState = 'busy'
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Agendar Servicio',
      message: `${data.message.receptor.firstname} ${data.message.receptor.lastname} solicita el servicio ${data.message.service.title}, el día ${this.dateFormat.transform(data.message.date, 'fullDate')}, a las ${data.message.hour} hrs., en ${data.message.address.district}.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.appState = 'busy'
            this.ws.emit('notification', { type: 'service request', emitter: this.user.user_id, destination: data.emitter, message: `Respuesta del proveedor ${this.user.firstname} ${this.user.lastname}`, state: 'request rejected' })
          }
        },
        {
          text: 'Aceptar',
          handler: async () => {            
            this.ws.emit('notification', { type: 'service request', emitter: this.user.user_id, destination: data.emitter, message: `Respuesta del proveedor ${this.user.firstname} ${this.user.lastname}`, state: 'request accepted', provider: this.user})

            this.paymentLoading = await this.loadingController.create({
              message: 'Esperando pago del usuario Oppa...'
            });
            await this.paymentLoading.present();
          }
        }
      ]
    });

    await alert.present();
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
