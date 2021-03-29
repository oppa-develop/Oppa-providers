import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';
import * as dayjs from 'dayjs'
import { CalendarComponent } from 'ionic2-calendar';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

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
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.auth.userData()
    this.$nextServices = this.api.getServicesHistoryByDate(this.user.provider_id, dayjs(this.calendar.currentDate).format('YYYY-MM-DD'))
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
    this.$nextServices = this.api.getServicesHistoryByDate(this.user.provider_id, dayjs($event.selectedTime).format('YYYY-MM-DD'))
  }

}
