import { Component, OnInit } from '@angular/core';
import * as faker from 'faker/locale/es_MX'

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  services = []

  constructor() {
    this.fakeData(10)
  }

  ngOnInit() {
  }

  fakeData(limit: number) {
    for(let i=0; i<limit; i++) {
      this.services.push({
        username: faker.name.findName(),
        img: faker.image.avatar(),
        service: faker.name.jobTitle(),
        time_range: faker.date.recent(),
        for_gender: faker.lorem.word()
      })
    }
  }

}
