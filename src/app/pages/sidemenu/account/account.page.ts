import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/providers/api/api.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { LocationService } from 'src/app/providers/location/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: User
  userDataForm: FormGroup
  userAddressForm: FormGroup
  regions: any[]
  districts: any[]
  apiUrl: string = environment.HOST + '/'

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private dateFormat: DatePipe,
    private toastCtrl: ToastController,
    private location: LocationService
  ) { }

  ngOnInit() {
    this.user = this.auth.userData()
    this.userDataForm = this.createUserDataForm()
    // this.userAddressForm = this.createUserAddressForm()
    console.table(this.user)
    this.location.getRegions().toPromise()
      .then((regions) => {
        this.regions = regions
      })
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  createUserDataForm() {
    return this.formBuilder.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      gender: [this.user.gender, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      birthdate: [this.dateFormat.transform(this.user.birthdate, 'dd-MM-yyyy'), Validators.required],
      phone: [this.user.phone, Validators.required],
    })
  }
  
  /* createUserAddressForm() {
    return this.formBuilder.group({
      street: [this.user.addresses?.street, Validators.required],
      other: [this.user.addresses?.other, Validators.required],
      district: [this.user.addresses?.district, Validators.required],
      region: [this.user.addresses?.region, Validators.required],
    })
  } */
  
  saveData() {
    this.presentToast('Datos actualizados.', 'light')
  }

  getDistrictsByRegion(){
    this.userAddressForm.controls.districts.reset()
    this.location.getDistrictsByRegion(this.regions.find(region => region.nombre === this.userAddressForm.value.region).codigo).toPromise()
      .then((districts: any) => {
        this.districts = districts
      })
  }

}
