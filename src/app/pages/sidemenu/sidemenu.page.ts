import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  pages = [
    { title: 'Servicios',             icon: 'construct-outline', url: '/sidemenu/home'},
    { title: 'Mensajes',              icon: 'chatbox-ellipses-outline', url: ''},
    { title: 'Valoraciones',          icon: 'star-outline', url: ''},
    { title: 'Configuración y Pagos', icon: 'settings-outline', url: ''},
    { title: 'Facturas',              icon: 'receipt-outline', url: ''},
    { title: 'Ayuda',                 icon: 'help-circle-outline', url: ''},
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
