import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/providers/auth/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  pages = [
    { title: 'Servicios',  icon: 'construct-outline',        url: '/sidemenu/services/offered' },
    { title: 'Mis Datos',  icon: 'person-outline',           url: '/sidemenu/account'},
    { title: 'Mensajes',   icon: 'chatbox-ellipses-outline', url: '/sidemenu/messages' },
    { title: 'Facturas',   icon: 'receipt-outline',          url: '/sidemenu/bills' },
    { title: 'Ayuda',      icon: 'help-circle-outline',      url: '/sidemenu/help' },
  ]

  selectedPath = ''
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches || false;

  user: User

  constructor(
    private auth: AuthService,
  ) { }
  
  ngOnInit() {
    this.user = this.auth.userData()
    if (localStorage.getItem('darkMode') === 'on') {
      document.body.setAttribute('data-theme', 'dark');
      this.darkMode = true
    } else {
      document.body.setAttribute('data-theme', 'light');
      this.darkMode = false
    }
  }
  
  ionViewWillEnter() {
    this.user = this.auth.userData()
  }

  logout() {
    this.auth.logout()
  }

  onClick(event){
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('darkMode', 'on');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('darkMode', 'off');
    }
  }

}
