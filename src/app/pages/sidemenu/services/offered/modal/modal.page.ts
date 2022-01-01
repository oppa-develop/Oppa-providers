import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/providers/api/api.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { LocationService } from 'src/app/providers/location/location.service';
import { environment } from 'src/environments/environment';
import * as dayjs from 'dayjs'

// animaciones
import { slideInLeft, slideInRight, slideOutRight, slideOutLeft } from 'ng-animate'
import { trigger, transition, useAnimation } from '@angular/animations'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
  animations: [
    trigger('onChargeFirst', [
      transition(':leave', useAnimation(slideOutLeft, { params: { timing: 0.2, delay: 0 } })),
    ]),
    trigger('onCharge', [
      transition(':enter', useAnimation(slideInRight, { params: { timing: 0.2, delay: 0.18 } })),
      transition(':leave', useAnimation(slideOutLeft, { params: { timing: 0.2, delay: 0 } })),
    ]),
  ]
})
export class ModalPage implements OnInit {

  user: User
  apiUrl: string = environment.HOST + '/'
  regions: any[] = []
  districts: string[] = []
  newServiceForm: FormGroup
  $permitedServices: Observable<Service[]>
  selectedService: Service
  dataToCheck: any
  steps: number = 1
  disableDistrict: boolean = false

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private location: LocationService,
    private auth: AuthService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.user = this.auth.userData()
    this.newServiceForm = this.createNewServiceForm()
    this.$permitedServices = this.api.getPermitedServices(this.user.provider_id)
    /* document.querySelector('ion-slides').getSwiper()
      .then((swiper: any) => {
        this.slider = swiper
      }) */
    this.location.getRegions().toPromise()
      .then((regions) => {
        this.regions = regions
        console.log(regions);
      })
  }

  getDistrictsByRegion() {
    this.newServiceForm.controls.districts.reset()
    this.location.getDistrictsByRegion(this.regions.find(region => region.nombre === this.newServiceForm.value.region).codigo).toPromise()
      .then((districts: any) => {
        this.districts = districts
      })
  }

  selectService(service: Service) {
    console.count()
    this.selectedService = service
    this.newServiceForm.value.title = service.title
    this.newServiceForm.value.price = service.price
    this.newServiceForm.value.category_id = service.categories_category_id
    this.newServiceForm.value.super_category = service.super_category
    this.next()
  }

  next() {
    this.steps++
    this.newServiceForm.value.service_id = this.selectedService.service_id
    this.newServiceForm.value.title = this.selectedService.title
    this.newServiceForm.value.price = this.selectedService.price
    this.newServiceForm.value.category_id = this.selectedService.categories_category_id
    this.newServiceForm.value.super_category = this.selectedService.super_category
    if (this.newServiceForm.value.start !== null) {
      this.newServiceForm.value.start = this.newServiceForm.value.start.split('T')[1].split(':');
      this.newServiceForm.value.start = this.newServiceForm.value.start[0] + ':' + this.newServiceForm.value.start[1];
    }
    if (this.newServiceForm.value.end !== null) {
      this.newServiceForm.value.end = this.newServiceForm.value.end.split('T')[1].split(':');
      this.newServiceForm.value.end = this.newServiceForm.value.end[0] + ':' + this.newServiceForm.value.end[1];
    }

    this.dataToCheck = this.newServiceForm.value;
  }

  prev() {
    this.steps--
  }

  scrollTo(element: string) {
    document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
    });
  }

  createNewServiceForm() {
    return this.formBuilder.group({
      service_id: [null, Validators.required],
      title: [null, Validators.required],
      price: [null, Validators.required],
      category_id: [null, Validators.required],
      super_category: [null, Validators.required],
      region: [null, Validators.required],
      districts: [null],
      start: [null, Validators.required],
      end: [null, Validators.required],
      workable: [null, Validators.required],
      gender: [null, Validators.required],
      provider_id: [this.user.provider_id, Validators.required],
      user_id: [this.user.user_id, Validators.required]
    })
  }

  async closeModal(reload: boolean) {
    await this.modalController.dismiss({
      reload
    })
  }

  offerNewService() {

    if (this.dataToCheck.districts.includes('Todas las comunas')) this.dataToCheck.districts = this.districts.map((district: any) => district.nombre)
    if (this.dataToCheck.workable.includes('Todos los días')) this.dataToCheck.workable = ['l', 'm', 'x', 'j', 'v', 's', 'd']

    this.api.offerNewService(this.dataToCheck).toPromise()
      .then((res: any) => {
        this.presentToast('Servicio creado', 'success');
        this.closeModal(true);
      })
      .catch(err => {
        this.presentToast('No se ha podido crear el servicio', 'danger');
      });
  }

  selectAllDistricts() {
    if (this.newServiceForm.value.districts.includes('Todas las comunas')) this.newServiceForm.controls.districts.setValue('Todas las comunas')
  }

  selectAllWorkableDays() {
    if (this.newServiceForm.value.workable.includes('Todos los días')) this.newServiceForm.controls.workable.setValue('Todos los días')
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
      color
    });
    toast.present();
  }

}
