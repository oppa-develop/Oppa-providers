import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  newServiceForm: FormGroup

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.newServiceForm = this.createNewServiceForm()
  }

  createNewServiceForm() {
    return this.formBuilder.group({
      title: [null, Validators.required],
      workable: [null, Validators.required]
    })
  }

  async closeModal() {
    await this.modalController.dismiss()
  }

}
