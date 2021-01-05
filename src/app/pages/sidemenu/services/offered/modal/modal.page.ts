import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/service';
import { ApiService } from 'src/app/providers/api/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  newServiceForm: FormGroup
  $permitedServices: Observable<Service[]>
  selectedService: Service
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

  @ViewChild(IonSlides) slider: any;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.newServiceForm = this.createNewServiceForm()
    this.$permitedServices = this.api.getPermitedServices()
  }

  async ngAfterViewInit() {
    this.slider = await this.slider.getSwiper()
    console.log('enter', this.slider)
  }
  
  selectService(service: Service) {
    console.table(service)
    this.selectedService = service
    this.next()
  }
  
  next() {
    console.log('next step', this.slider)
    this.slider.appendSlide('') // workarround to make work the slider when the modal is open
    this.slider.removeSlide(5) // workarround to make work the slider when the modal is open
    this.slider.slideNext();
    this.scrollTo('ion-slides');
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
      title: [null, Validators.required],
      region: [null, Validators.required],
      district: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
      workable: [null, Validators.required],
      'lunes': [null, Validators.required],
      'martes': [null, Validators.required],
      'miércoles': [null, Validators.required],
      'jueves': [null, Validators.required],
      'viernes': [null, Validators.required],
      'sábado': [null, Validators.required],
      'domingo': [null, Validators.required]
    })
  }
  
  async closeModal() {
    this.slider.slideReset()
    await this.modalController.dismiss()
  }

}
