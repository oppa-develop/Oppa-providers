import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/providers/api/api.service';
import * as dayjs from 'dayjs'
import { AuthService } from 'src/app/providers/auth/auth.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {

  $payments: Observable<any[]>
  today = dayjs()
  user: User
  apiUrl: string = environment.HOST + '/'

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.user = this.auth.userData()
    this.$payments = this.api.getPayments(this.user.provider_id)
  }

}
