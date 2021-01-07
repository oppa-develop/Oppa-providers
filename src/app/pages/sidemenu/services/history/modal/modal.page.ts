import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  $nextServices: Observable<Service[]>

  constructor(
    private modalController: ModalController,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.$nextServices = this.api.getServicesHistory()
  }
  
  async closeModal() {
    await this.modalController.dismiss()
  }

}
