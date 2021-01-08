import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';

import { SidemenuPage } from './sidemenu.page';

const routes: Routes = [
  {
    path: 'sidemenu',
    component: SidemenuPage,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'services',
        loadChildren: () => import('./services/services.module').then(m => m.ServicesPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('./help/help.module').then(m => m.HelpPageModule)
      },
      {
        path: 'bills',
        loadChildren: () => import('./bills/bills.module').then(m => m.BillsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/sidemenu/services/offered',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidemenuPageRoutingModule { }
