import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';
import * as dayjs from 'dayjs'
import { CalendarComponent } from 'ionic2-calendar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  $nextServices: Observable<Service[]>
  eventSource = []
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'es-ES',
    title: new Date()
  }
  

  constructor(
    private modalController: ModalController,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.$nextServices = this.api.getServicesHistoryByDate(dayjs(this.calendar.currentDate).format('DD-MM-YYYY'))
  }

  ngAfterViewInit() {
    document.querySelector('ion-list.event-detail-container').remove()
  }
  
  async closeModal() {
    await this.modalController.dismiss()
  }

  onDateSelected($event){
    console.log($event.selectedTime)
    this.calendar.title = $event.selectedTime
    this.$nextServices = this.api.getServicesHistoryByDate(dayjs($event.selectedTime).format('DD-MM-YYYY'))
  }

}
