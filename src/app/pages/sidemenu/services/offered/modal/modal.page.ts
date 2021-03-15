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

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
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
  slider: any
  slideOpts = {
    centeredSlides: true,
    centeredSlidesBounds: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    allowTouchMove: false,
    autoHeight: false
  }

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
    document.querySelector('ion-slides').getSwiper()
      .then((swiper: any) => {
        this.slider = swiper
      })
    this.location.getRegions().toPromise()
      .then((regions) => {
        this.regions = regions
        console.log(regions);
      })
  }

  getDistrictsByRegion(){
    this.newServiceForm.controls.districts.reset()
    this.location.getDistrictsByRegion(this.regions.find(region => region.nombre === this.newServiceForm.value.region).codigo).toPromise()
      .then((districts: any) => {
        this.districts = districts
      })
  }
  
  selectService(service: Service) {
    console.count()
    console.table(service)
    this.selectedService = service
    this.newServiceForm.value.title = service.title
    this.newServiceForm.value.price = service.price
    this.newServiceForm.value.category_id = service.categories_category_id
    this.newServiceForm.value.super_category = service.super_category
    this.next()
  }
  
  next() {
    this.newServiceForm.value.service_id = this.selectedService.service_id
    this.newServiceForm.value.title = this.selectedService.title
    this.newServiceForm.value.price = this.selectedService.price
    this.newServiceForm.value.category_id = this.selectedService.categories_category_id
    this.newServiceForm.value.super_category = this.selectedService.super_category
    this.dataToCheck = this.newServiceForm.value;
    this.slider.appendSlide('') // workarround to make work the slider when the modal is open
    this.slider.removeSlide(6) // workarround to make work the slider when the modal is open
    this.slider.slideNext(); // workarround to make work the slider when the modal is open
    this.scrollTo('ion-slides'); // workarround to make work the slider when the modal is open
    console.table(this.dataToCheck)
  }

  scrollTo(element: string) {
    document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
    });
  }
  
  prev() {
    console.log('prev step', this.slider)
    this.slider.slidePrev();
  }
  
  createNewServiceForm() {
    return this.formBuilder.group({
      service_id: [null, Validators.required],
      title: [null, Validators.required],
      price: [null, Validators.required],
      category_id: [null, Validators.required],
      super_category: [null, Validators.required],
      region: [null, Validators.required],
      districts: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
      workable: [null, Validators.required],
      gender: [null, Validators.required],
      provider_id: [this.user.provider_id, Validators.required],
      user_id: [this.user.user_id, Validators.required]
    })
  }
  
  async closeModal() {
    this.slider.slideReset()
    await this.modalController.dismiss()
  }

  offerNewService() {
    this.api.offerNewService(this.dataToCheck).toPromise()
      .then((res: any) => {
        this.presentToast('Servicio creado', 'success');
        this.closeModal();
      })
      .catch(err => {
        this.presentToast('No se ha podido crear el servicio', 'danger');
      });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

}
