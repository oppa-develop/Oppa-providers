import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/providers/api/api.service';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { LocationService } from 'src/app/providers/location/location.service';
import { environment } from 'src/environments/environment';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: User
  user_img: string;
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
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private toastCtrl: ToastController,
    private location: LocationService
  ) { }

  ngOnInit() {
    this.user = this.auth.userData()
    this.userDataForm = this.createUserDataForm()
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
      user_id: [this.user.user_id, Validators.required],
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      gender: [this.user.gender, Validators.required],
      birthdate: [this.dateFormat.transform(this.user.birthdate, 'dd-MM-yyyy'), Validators.required],
      phone: [this.user.phone, Validators.required],
      image_ext: [''],
      image: [null]
    })
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.userDataForm.value.image = imageData;
      this.user_img = imageData;
      switch(imageData.charAt(0)) {
        case '/':
          this.userDataForm.value.image_ext = 'jpg'
        break
        case 'i':
          this.userDataForm.value.image_ext = 'png'
        break
        case 'R':
          this.userDataForm.value.image_ext = 'gif'
        break
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Seleccionar imagen desde",
      buttons: [{
        text: 'Memoria',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Tomar foto',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  
  saveData() {
    this.api.editUser(this.userDataForm.value).toPromise()
      .then((res: any) => {
        this.user = res.user;
        this.auth.setUserData(this.user);
        this.presentToast('Datos actualizados.', 'light')
      })
  }

  getDistrictsByRegion(){
    this.userAddressForm.controls.districts.reset()
    this.location.getDistrictsByRegion(this.regions.find(region => region.nombre === this.userAddressForm.value.region).codigo).toPromise()
      .then((districts: any) => {
        this.districts = districts
      })
  }

}
