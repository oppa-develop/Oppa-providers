import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/providers/api/api.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { environment } from 'src/environments/environment';
import { EditServicePage } from './edit-service/edit-service.page';
import { ModalPage } from './modal/modal.page';

@Component({
  selector: 'app-offered',
  templateUrl: './offered.page.html',
  styleUrls: ['./offered.page.scss'],
})
export class OfferedPage implements OnInit {

  $services: Observable<Service[]>
  user: User
  apiUrl: string = environment.HOST + '/'
  
  constructor(
    private api: ApiService,
    private auth: AuthService,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
    public toastCtrl: ToastController
  ) {

  }

  ngOnInit() {
    this.user = this.auth.userData()
    this.$services = this.api.getProvidedServices(this.user.provider_id)
  }

  ionViewWillEnter() {
    this.user = this.auth.userData()
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    })

    modal.onDidDismiss()
      .then((res: any) => {
        if (res.data.reload) this.$services = this.api.getProvidedServices(this.user.provider_id)
      })

    return await modal.present()
  }

  async openEditServiceModal(service) {
    const modal = await this.modalController.create({
      component: EditServicePage,
      componentProps: {
        service
      }
    })

    modal.onDidDismiss()
      .then((res: any) => {
        if (res.data.reload) this.$services = this.api.getProvidedServices(this.user.provider_id)
      })

    return await modal.present()
  }

  changeState(service){
    console.log({service});
    
    const updateData = {
      provider_has_services_id: service.provider_has_services_id,
      state: service.state
    }
    this.api.changeServiceOfferedState(updateData).toPromise()
      .then((res: any) => {
        this.presentToast('Servicio cambió estado', 'success')
      })
      .catch(err => {
        console.log(err)
        this.presentToast('No se ha podido cambiar el estado del servicio', 'danger')
      })
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
