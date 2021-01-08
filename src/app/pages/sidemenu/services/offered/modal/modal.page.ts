import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';
import { LocationService } from 'src/app/providers/location/location.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

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
    private location: LocationService
  ) { }

  ngOnInit() {
    this.newServiceForm = this.createNewServiceForm()
    this.$permitedServices = this.api.getPermitedServices()
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
    this.selectedService = service
    this.newServiceForm.value.name = service.name
    this.newServiceForm.value.price = service.price
    this.newServiceForm.value.type = service.type
    this.next()
  }
  
  next() {
    this.newServiceForm.value.id = this.selectedService.id
    this.newServiceForm.value.name = this.selectedService.name
    this.newServiceForm.value.price = this.selectedService.price
    this.newServiceForm.value.type = this.selectedService.type
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
      id: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, Validators.required],
      type: [null, Validators.required],
      region: [null, Validators.required],
      districts: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
      workable: [null, Validators.required]
    })
  }
  
  async closeModal() {
    this.slider.slideReset()
    await this.modalController.dismiss()
  }

}
