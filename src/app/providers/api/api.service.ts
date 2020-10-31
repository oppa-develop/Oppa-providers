import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageList } from 'src/app/models/message-list';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';

import * as faker from 'faker/locale/es_MX'
import * as timeago from 'timeago.js';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  login(email: string, password: string): Observable<User> {
    return of({
      fullname: faker.name.findName(),
      age: faker.random.number(99),
      email: faker.internet.exampleEmail(),
      avatar: faker.image.avatar(),
      role: 'apoderado',
      credit: parseInt(faker.finance.amount()) * 10
    })
  }

  getServices(): Observable<Service[]> {
    return of([
      { id: faker.random.uuid(), type: 'Servicio a Domicilio',        name: 'peluquería',       description: faker.lorem.paragraph(), price: '10000', img: '../../../../assets/images/pexels-nick-demou-1319460.jpg' },
      { id: faker.random.uuid(), type: 'Servicio de acompañamiento',  name: 'realizar trámite', description: faker.lorem.paragraph(), price: '10000', img: '../../../../assets/images/1789259.jpg' },
      { id: faker.random.uuid(), type: 'Servicio a Domicilio',        name: 'podología',        description: faker.lorem.paragraph(), price: '15000', img: '../../../../assets/images/pexels-stephanie-allen-4085445.jpg' },
      { id: faker.random.uuid(), type: 'Servicio de acompañamiento',  name: 'cobro',            description: faker.lorem.paragraph(), price: '15000', img: '../../../../assets/images/pexels-eduardo-soares-5497951.jpg' },
      { id: faker.random.uuid(), type: 'Servicio a Domicilio',        name: 'inyecciones',      description: faker.lorem.paragraph(), price: '12000', img: '../../../../assets/images/pexels-gustavo-fring-3985166.jpg' },
      { id: faker.random.uuid(), type: 'Servicio de acompañamiento',  name: 'paseo',            description: faker.lorem.paragraph(), price: '12000', img: '../../../../assets/images/pexels-kaboompics-com-6054.jpg' },
      { id: faker.random.uuid(), type: 'Servicio a Domicilio',        name: 'kinesiólogo',      description: faker.lorem.paragraph(), price: '10000', img: '../../../../assets/images/g-terapi-ile-agrilara-son-H1347048-11.jpg' },
      { id: faker.random.uuid(), type: 'Servicio de acompañamiento',  name: 'salud',            description: faker.lorem.paragraph(), price: '10000', img: '../../../../assets/images/pexels-pixabay-40568.jpg' },
      { id: faker.random.uuid(), type: 'Servicio a Domicilio',        name: 'cuidado',          description: faker.lorem.paragraph(), price: '12000', img: '../../../../assets/images/pexels-andrea-piacquadio-3768131.jpg' },
      { id: faker.random.uuid(), type: 'Servicio de acompañamiento',  name: 'pagos',            description: faker.lorem.paragraph(), price: '12000', img: '../../../../assets/images/resize_1590967555.jpg' },
      { id: faker.random.uuid(), type: 'Servicio a Domicilio',        name: 'curaciones',       description: faker.lorem.paragraph(), price: '15000', img: '../../../../assets/images/pexels-cottonbro-5721555.jpg' },
      { id: faker.random.uuid(), type: 'Servicio de acompañamiento',  name: 'compras',          description: faker.lorem.paragraph(), price: '15000', img: '../../../../assets/images/pexels-gustavo-fring-4173326.jpg' }
    ])
  }

  getMessages(): Observable<MessageList[]> {
    return of([
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) },
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) },
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) },
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) },
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) },
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) },
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) },
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) },
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) },
      { name: faker.name.findName(), img: faker.image.avatar(), service: faker.name.jobTitle(), lastMsg: faker.lorem.sentence(), lastMsgAgo: timeago.format(faker.date.recent()) }
    ])
  }
}
