import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';
import * as dayjs from 'dayjs'
import { CalendarComponent } from 'ionic2-calendar';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  $nextServices: Observable<Service[]>
  eventSource = []
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-ES',
    title: new Date()
  }
  user: User
  apiUrl: string = environment.HOST + '/'


  constructor(
    private modalController: ModalController,
    private api: ApiService,
    private auth: AuthService,
    private actionSheetController: ActionSheetController,
    private browserTab: BrowserTab
  ) { }

  ngOnInit() {
    this.user = this.auth.userData()
    this.$nextServices = this.api.getServicesByDate(this.user.provider_id, dayjs(this.calendar.currentDate).format('YYYY-MM-DD'))
  }

  ngAfterViewInit() {
    document.querySelector('ion-list.event-detail-container').remove()
  }

  async closeModal() {
    await this.modalController.dismiss()
  }

  onDateSelected($event) {
    console.log($event.selectedTime)
    this.calendar.title = $event.selectedTime
    this.$nextServices = this.api.getServicesByDate(this.user.provider_id, dayjs($event.selectedTime).format('YYYY-MM-DD'))
  }

  async presentActionSheet(service) {
    const actionSheet = await this.actionSheetController.create({
      header: service.title + ' (' + service.client.firstname + ' ' + service.client.lastname + ')',
      // cssClass: 'my-custom-class',
      buttons: [{
        text: 'Ver dirección',
        icon: 'location-outline',
        handler: () => {
          let address = (service.other) ? [service.address.street, service.address.other, service.address.district, service.address.region].join('+') : [service.address.street, service.address.district, service.address.region].join('+')
          address = address.replace(' ', '%20')
          this.browserTab.isAvailable()
            .then(isAvailable => {
              if (isAvailable) {
                this.browserTab.openUrl('https://www.google.com/maps/place/' + address);
                console.log('Direccion', 'https://www.google.com/maps/place/' + address);
              } else {
                window.open('https://www.google.com/maps/place/' + address);
              }
            })
            .catch(err => {
              window.open('https://www.google.com/maps/place/' + address);
            });
        }
      }, {
        text: 'Marcar como terminado',
        icon: 'checkmark-done-outline',
        handler: () => {
          console.log('Marcar como terminado');
        }
      }, {
        text: 'Cancelar Servicio',
        icon: 'ban-outline',
        handler: () => {
          console.log('Cancelar Servicio');
        }
      }, {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cerrar');
        }
      }]
    });
    await actionSheet.present();
  }

}
