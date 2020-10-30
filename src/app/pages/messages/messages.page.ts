import { Component, OnInit } from '@angular/core';
import * as faker from 'faker/locale/es_MX'
import * as timeago from 'timeago.js';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  messages = []
  
  constructor() {
    // timeago.register('pt_BR', locale);
    this.fakeData(10)
  }

  ngOnInit() {
  }

  fakeData(limit: number) {
    for(let i=0; i<limit; i++) {
      this.messages.push({
        name: faker.name.findName(),
        img: faker.image.avatar(),
        service: faker.name.jobTitle(),
        lastMsg: faker.lorem.sentence(),
        lastMsgAgo: timeago.format(faker.date.recent())
      })
    }
  }

}
