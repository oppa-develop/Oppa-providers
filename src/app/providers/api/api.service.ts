import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageList } from 'src/app/models/message-list';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';

import * as faker from 'faker/locale/es_MX'
import * as timeago from 'timeago.js';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { serialize } from 'object-to-formdata';
import { Message } from 'src/app/models/message';
import { Record } from 'src/app/models/record';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string = environment.HOST + '/api'

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/auth/login-provider', { email, password });
  }

  getServices(): Observable<Service[]> {
    return of([
      { id: parseInt(faker.random.uuid()), type: `Servicio a Domicilio`,        name: `peluquería`,       description: faker.lorem.paragraph(), price: parseInt(`9990`),  img: `../../../../assets/images/pexels-nick-demou-1319460.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio de acompañamiento`,  name: `realizar trámite`, description: faker.lorem.paragraph(), price: parseInt(`9990`),  img: `../../../../assets/images/1789259.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio a Domicilio`,        name: `podología`,        description: faker.lorem.paragraph(), price: parseInt(`14990`), img: `../../../../assets/images/pexels-stephanie-allen-4085445.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio de acompañamiento`,  name: `cobro`,            description: faker.lorem.paragraph(), price: parseInt(`14990`), img: `../../../../assets/images/pexels-eduardo-soares-5497951.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio a Domicilio`,        name: `inyecciones`,      description: faker.lorem.paragraph(), price: parseInt(`11990`), img: `../../../../assets/images/pexels-gustavo-fring-3985166.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio de acompañamiento`,  name: `paseo`,            description: faker.lorem.paragraph(), price: parseInt(`11990`), img: `../../../../assets/images/pexels-kaboompics-com-6054.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio a Domicilio`,        name: `kinesiólogo`,      description: faker.lorem.paragraph(), price: parseInt(`9990`),  img: `../../../../assets/images/g-terapi-ile-agrilara-son-H1347048-11.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio de acompañamiento`,  name: `salud`,            description: faker.lorem.paragraph(), price: parseInt(`9990`),  img: `../../../../assets/images/pexels-pixabay-40568.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio a Domicilio`,        name: `cuidado`,          description: faker.lorem.paragraph(), price: parseInt(`11990`), img: `../../../../assets/images/pexels-andrea-piacquadio-3768131.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio de acompañamiento`,  name: `pagos`,            description: faker.lorem.paragraph(), price: parseInt(`11990`), img: `../../../../assets/images/resize_1590967555.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio a Domicilio`,        name: `curaciones`,       description: faker.lorem.paragraph(), price: parseInt(`14990`), img: `../../../../assets/images/pexels-cottonbro-5721555.jpg` },
      { id: parseInt(faker.random.uuid()), type: `Servicio de acompañamiento`,  name: `compras`,          description: faker.lorem.paragraph(), price: parseInt(`14990`), img: `../../../../assets/images/pexels-gustavo-fring-4173326.jpg` }
    ])
  }

  getProvidedServices(provider_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services/offered/provider/${provider_id}`)
  }

  getHistoryOfServices(provider_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services/history/provider/${provider_id}`);
  }

  getChatList(user_id: number): Observable<MessageList[]> {
    return this.http.get<MessageList[]>(`${this.apiUrl}/chats/${user_id}`)
  }

  getChatMessages(chat_id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/chats/${chat_id}/messages`)
  }

  getServicesHistory(): Observable<Service[]> {
    return of([
      {
        id: parseInt(faker.random.uuid()),
        date: faker.date.past().toISOString(),
        type: `Servicio a Domicilio`,
        name: `peluquería`,
        description: faker.lorem.paragraph(),
        price: parseInt(`9990`),
        img: `../../../../assets/images/pexels-nick-demou-1319460.jpg`,
        serverName: faker.name.findName(),
        serverImg: `https://loremflickr.com/320/240/selfie?lock=${faker.random.number()}`,
        serverRating: faker.random.number(5)
      },
      {
        id: parseInt(faker.random.uuid()),
        date: faker.date.past().toISOString(),
        type: `Servicio de acompañamiento`,
        name: `realizar trámite`,
        description: faker.lorem.paragraph(),
        price: parseInt(`9990`),
        img: `../../../../assets/images/1789259.jpg`,
        serverName: faker.name.findName(),
        serverImg: `https://loremflickr.com/320/240/selfie?lock=${faker.random.number()}`,
        serverRating: faker.random.number(5)
      },
      {
        id: parseInt(faker.random.uuid()),
        date: faker.date.past().toISOString(),
        type: `Servicio a Domicilio`,
        name: `podología`,
        description: faker.lorem.paragraph(),
        price: parseInt(`14990`),
        img: `../../../../assets/images/pexels-stephanie-allen-4085445.jpg`,
        serverName: faker.name.findName(),
        serverImg: `https://loremflickr.com/320/240/selfie?lock=${faker.random.number()}`,
        serverRating: faker.random.number(5)
      },
      {
        id: parseInt(faker.random.uuid()),
        date: faker.date.past().toISOString(),
        type: `Servicio de acompañamiento`,
        name: `cobro`,
        description: faker.lorem.paragraph(),
        price: parseInt(`14990`),
        img: `../../../../assets/images/pexels-eduardo-soares-5497951.jpg`,
        serverName: faker.name.findName(),
        serverImg: `https://loremflickr.com/320/240/selfie?lock=${faker.random.number()}`,
        serverRating: faker.random.number(5)
      },

    ])
  }

  getPayments(provider_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payments/${provider_id}`)
  }

  getServicesByDate(provider_id: number, date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services/provider/${provider_id}/date/${date}`)
  }

  getPermitedServices(provider_id: number): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services/permitted/provider/${provider_id}`)
    /* return of([
      {
        id: parseInt(faker.random.uuid()),
        type: 'Servicio de acompañamiento',
        name: 'realizar trámite',
        description: faker.lorem.paragraph(),
        price: parseInt('9990'),
        img: '../../../../assets/images/1789259.jpg',
      },
      {
        id: parseInt(faker.random.uuid()),
        type: 'Servicio de acompañamiento',
        name: 'cobro',
        description: faker.lorem.paragraph(),
        price: parseInt('14990'),
        img: '../../../../assets/images/pexels-eduardo-soares-5497951.jpg',
      },
      {
        id: parseInt(faker.random.uuid()),
        type: 'Servicio a Domicilio',
        name: 'peluquería',
        description: faker.lorem.paragraph(),
        price: parseInt('9990'),
        img: '../../../../assets/images/pexels-nick-demou-1319460.jpg',
      }
    ]) */
  }

  changeServiceOfferedState(offeredService): Observable<any> {
    return this.http.patch(`${this.apiUrl}/services/offered/change-state`, offeredService);
  }

  changeServiceScheduledState(scheduledService): Observable<any> {
    return this.http.patch(`${this.apiUrl}/services/scheduled/change-state`, scheduledService);
  }

  offerNewService(offerNewService): Observable<any> {
    let workable = ''
    for (let days of offerNewService.workable) {
      workable += days
    }
    offerNewService.workable = workable
    offerNewService.state = 'active'
    console.log(offerNewService);
    return this.http.post(`${this.apiUrl}/services/provide-service`, offerNewService);
  }

  deleteService(provider_id, provider_has_services_id): Observable<any> {
    return this.http.delete(`${this.apiUrl}/services/offered/provider/${provider_id}/delete/${provider_has_services_id}`);
  }

  createAccount(newAccount): Observable<any> {
    console.log(newAccount);
    delete newAccount['checkPassword']
    if (newAccount.image) {
      newAccount.image = this.base64toBlob(newAccount.image, 'image/' + newAccount.image_ext);
    }
    let formData = serialize(newAccount);
    console.log(formData);
    return this.http.post<any>(`${this.apiUrl}/users/new-provider`, formData);
  }

  private base64toBlob(base64Data: string, contentType: string) {
    contentType = contentType || '';
    let sliceSize = 1024;
    let byteCharacters = atob(base64Data);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        let begin = sliceIndex * sliceSize;
        let end = Math.min(begin + sliceSize, bytesLength);

        let bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  editOfferedService(service) {
    return this.http.put(`${this.apiUrl}/services/offered/edit`, service)
  }
  
  editUser(userData) {
    console.log(userData)
    return this.http.patch(`${this.apiUrl}/users/edit`, userData)
  }

  createRecord(record: Record): Observable<Record> {
    return this.http.post<Record>(`${this.apiUrl}/records/new-record`, record)
  }

  getCode(rut: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/recover-account`, {rut})
  }

  changePass(data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/change-password`, data)
  }

  changeStateToInactiveChat(scheduled_services_id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/chats/update-to-inactive-chat-by-scheduled-service-id/${scheduled_services_id}`, {scheduled_services_id})
  }

}

