import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clinical-record',
  templateUrl: './clinical-record.page.html',
  styleUrls: ['./clinical-record.page.scss'],
})
export class ClinicalRecordPage implements OnInit {

  newRecordForm: FormGroup
  customActionSheetOptions: any = {
    header: 'Seleccione un tipo de registro'
  };

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.newRecordForm = this.createNewRecordForm()
  }

  createNewRecordForm() {
    return this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      icon: [null, Validators.required],
      iconType: [null, Validators.required]
    })
  }

  setIconType() {
    switch (this.newRecordForm.value.icon) {
      case 'medic':
      case 'syringe':
      case 'pills':
        this.newRecordForm.value.iconType = 'custom-icon'
      default:
        this.newRecordForm.value.iconType = 'ion-icon'
    }
  }

  saveRecord() {
    if (!this.newRecordForm.value.icon){
      this.presentToast('Debes seleccionar un tipo', 'danger')
    }else {
      this.closeModal(true)
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
  
  async closeModal(reload: boolean) {
    await this.modalController.dismiss({
      reload
    })
  }

}
