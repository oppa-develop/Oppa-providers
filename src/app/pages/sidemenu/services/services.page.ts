import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/providers/api/api.service';
import { AuthService } from 'src/app/providers/auth/auth.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  $services: Observable<Service[]>
  user: User
  
  constructor(
    private api: ApiService,
    private auth: AuthService
  ) {
    
  }

  ngOnInit() {
    this.user = this.auth.userData()
    this.$services = this.api.getServices()
  }
  
  ionViewWillEnter() {
    this.user = this.auth.userData()
  }

}
