import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAccountPageRoutingModule } from './create-account-routing.module';

import { CreateAccountPage } from './create-account.page';
import { RutParsePipe } from 'src/app/pipes/rut-parser/rut-parser.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAccountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateAccountPage, RutParsePipe]
})
export class CreateAccountPageModule {}
