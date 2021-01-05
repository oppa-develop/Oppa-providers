import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferedPageRoutingModule } from './offered-routing.module';

import { OfferedPage } from './offered.page';
import { ModalPage } from './modal/modal.page';
import { LoadingPipe } from 'src/app/pipes/loading/loading.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferedPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OfferedPage, ModalPage, LoadingPipe],
  entryComponents: [ModalPage]
})
export class OfferedPageModule {}
