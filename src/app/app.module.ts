import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

// cambiando LOCALE_ID a español
import es from '@angular/common/locales/es'
import { DatePipe, registerLocaleData } from '@angular/common'
import { ApiService } from './providers/api/api.service';
import { LocationService } from './providers/location/location.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { WebsocketService } from './providers/websocket/websocket.service';
import { Camera } from '@ionic-native/Camera/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
registerLocaleData(es)

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    Camera,
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    { 
      provide: LOCALE_ID,
      useValue: "es-ES"
    },
    ApiService,
    LocationService,
    WebsocketService,
    BackgroundMode,
    LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
