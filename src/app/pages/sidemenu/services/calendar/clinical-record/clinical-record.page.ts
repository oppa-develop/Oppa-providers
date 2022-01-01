import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api/api.service';

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
  @Input() client_users_user_id: number

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private api: ApiService,
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
      icon_type: ['null', Validators.required],
      users_user_id: [this.client_users_user_id, Validators.required]
    })
  }

  setIconType() {
    switch (this.newRecordForm.value.icon) {
      case 'medic':
      case 'syringe':
      case 'pills':
        this.newRecordForm.value.icon_type = 'custom-icon'
        break
      default:
        this.newRecordForm.value.icon_type = 'ion-icon'
        break
    }
  }

  saveRecord() {
    if (!this.newRecordForm.value.icon){
      this.presentToast('Debes seleccionar un tipo', 'danger')
    }else {
      this.setIconType()
      this.api.createRecord(this.newRecordForm.value).toPromise()
        .then((res: any) => {
          console.log('new record:', res.record);
          this.closeModal(true)
        })
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
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
