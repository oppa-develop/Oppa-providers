import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverAccountPageRoutingModule } from './recover-account-routing.module';

import { RecoverAccountPage } from './recover-account.page';
import { RutParsePipe } from 'src/app/pipes/rut-parser/rut-parser.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverAccountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecoverAccountPage, RutParsePipe]
})
export class RecoverAccountPageModule {}
