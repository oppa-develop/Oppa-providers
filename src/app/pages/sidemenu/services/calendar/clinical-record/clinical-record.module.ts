import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicalRecordPageRoutingModule } from './clinical-record-routing.module';

import { ClinicalRecordPage } from './clinical-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicalRecordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClinicalRecordPage]
})
export class ClinicalRecordPageModule {}
