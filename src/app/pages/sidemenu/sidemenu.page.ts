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

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

}
