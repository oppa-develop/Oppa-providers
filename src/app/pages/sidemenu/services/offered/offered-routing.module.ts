import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferedPage } from './offered.page';

const routes: Routes = [
  {
    path: '',
    component: OfferedPage
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferedPageRoutingModule {}
