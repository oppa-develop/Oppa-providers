import { Component, QueryList, ViewChildren } from '@angular/core';

import { IonRouterOutlet, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Autostart } from '@ionic-native/autostart/ngx';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    public router: Router,
    private autostart: Autostart
  ) {
    this.setPortrait();
    this.autostart.enable();

    // cargamos el darkMode según lo guardado en el localStorage
    if (localStorage.getItem('darkMode') === 'on') {
      document.body.setAttribute('data-theme', 'dark');
      // this.darkMode = true
    } else {
      document.body.setAttribute('data-theme', 'light');
      // this.darkMode = false
    }
  }

  // set orientation to portrait
  setPortrait() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  ionViewDidEnter() {
    SplashScreen.hide();
  }
}
