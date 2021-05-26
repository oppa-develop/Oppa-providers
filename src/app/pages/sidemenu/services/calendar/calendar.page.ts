import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';
import * as dayjs from 'dayjs'
import { AuthService } from 'src/app/providers/auth/auth.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { ClinicalRecordPage } from './clinical-record/clinical-record.page';

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
    private browserTab: BrowserTab,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.user = this.auth.userData()
    this.$nextServices = this.api.getServicesByDate(this.user.provider_id, dayjs(this.calendar.currentDate).format('YYYY-MM-DD'))
  }

  ngAfterViewInit() {
    document.querySelector('ion-list.event-detail-container').remove()
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
          console.log('Solicita marcar como terminado el servicio');
          this.confirmEndOfService(service)
        }
      }, {
        text: 'Cancelar Servicio',
        icon: 'ban-outline',
        handler: () => {
          console.log('Solicita cancelar el servicio');
          this.cancelService()
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

  async confirmEndOfService(service) {
    const alert = await this.alertController.create({
      header: '¿Desea dar por terminado el servicio?',
      message: 'Confirma que el servicio ya se ha llevado a cabo',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancela termino de servicio');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirma termino de servicio');
            this.makeRegister(service)
          }
        }
      ]
    });

    await alert.present();
  }

  async makeRegister(service) {
    const alert = await this.alertController.create({
      header: '¿Desea dejar un registro en la ficha del usuario?',
      message: 'Puede ser la receta o la ingesta de algún medicamento, la visita al doctor, el diagnóstico de alguna enfermedad, etc.',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No se crea registro en ficha clínica');
            // actualizamos el estado del servicio
          }
        }, {
          text: 'Sí',
          handler: () => {
            console.log('Confirma crear registro en ficha clínica');
            // actualizamos el estado del servicio antes de crear el registro en la ficha
            this.openModal(service);
          }
        }
      ]
    });

    await alert.present();
  }

  async cancelService() {
    const alert = await this.alertController.create({
      header: '¿Desea cancelar el servicio?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('no se cancela el servicio');
          }
        }, {
          text: 'Sí',
          handler: () => {
            console.log('Confirma cancelar el servicio');
          }
        }
      ]
    });

    await alert.present();
  }

  async openModal(service) {
    const modal = await this.modalController.create({
      component: ClinicalRecordPage,
      componentProps: {
        client_users_user_id: service.clients_users_user_id
      }
    })

    modal.onDidDismiss()
      .then((res: any) => {
        if (res.data.reload) this.$nextServices = this.api.getServicesByDate(this.user.provider_id, dayjs(this.calendar.title).format('YYYY-MM-DD'))
      })

    return await modal.present()
  }

}
