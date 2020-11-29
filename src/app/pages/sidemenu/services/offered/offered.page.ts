import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/providers/api/api.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { ModalPage } from './modal/modal.page';

@Component({
  selector: 'app-offered',
  templateUrl: './offered.page.html',
  styleUrls: ['./offered.page.scss'],
})
export class OfferedPage implements OnInit {

  $services: Observable<Service[]>
  user: User

  constructor(
    private api: ApiService,
    private auth: AuthService,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) {

  }

  ngOnInit() {
    this.user = this.auth.userData()
    this.$services = this.api.getProvidedServices()
  }

  ionViewWillEnter() {
    this.user = this.auth.userData()
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    })
    return await modal.present()
  }

}
