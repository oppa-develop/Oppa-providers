import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {

  $services: Observable<Service[]>
  today = dayjs()
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.$services = this.api.getBillsFromDate(this.today.subtract(2, 'months').format('DD-MM-YYYY'))
  }

}
