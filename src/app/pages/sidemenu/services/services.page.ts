import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  $services: Observable<Service[]>

  constructor(
    private api: ApiService
  ) {
    
  }

  ngOnInit() {
    this.$services = this.api.getServices()
  }

}
