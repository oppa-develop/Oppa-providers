import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
})
export class RatingsPage implements OnInit {

  $services: Observable<Service[]> 

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.$services = this.api.getServicesHistory()
  }

}
