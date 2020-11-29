import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesPage } from './services.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage,
    children: [
      {
        path: 'offered',
        loadChildren: './offered/offered.module#OfferedPageModule'
      },
      {
        path: 'history',
        loadChildren: './history/history.module#HistoryPageModule'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPageRoutingModule {}
