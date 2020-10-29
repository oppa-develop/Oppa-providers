import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  pages = [
    { title: 'Servicios',             icon: 'construct-outline',        url: '/sidemenu/services'},
    { title: 'Mensajes',              icon: 'chatbox-ellipses-outline', url: '/sidemenu/messages'},
    { title: 'Valoraciones',          icon: 'star-outline',             url: '/sidemenu/ratings'},
    { title: 'Configuración y Pagos', icon: 'settings-outline',         url: '/sidemenu/preferences'},
    { title: 'Facturas',              icon: 'receipt-outline',          url: '/sidemenu/invoices'},
    { title: 'Ayuda',                 icon: 'help-circle-outline',      url: '/sidemenu/help'},
  ]

  selectedPath = ''

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url
    })
  }

  ngOnInit() {
    
  }

}
