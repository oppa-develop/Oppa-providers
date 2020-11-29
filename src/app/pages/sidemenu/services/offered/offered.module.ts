import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferedPageRoutingModule } from './offered-routing.module';

import { OfferedPage } from './offered.page';
import { ModalPage } from './modal/modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferedPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OfferedPage, ModalPage],
  entryComponents: [ModalPage]
})
export class OfferedPageModule {}
