import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidemenuPage } from './sidemenu.page';

const routes: Routes = [
  {
    path: 'sidemenu',
    component: SidemenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('../services/services.module').then( m => m.ServicesPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'ratings',
        loadChildren: () => import('../ratings/ratings.module').then( m => m.RatingsPageModule)
      },
      {
        path: 'preferences',
        loadChildren: () => import('../preferences/preferences.module').then( m => m.PreferencesPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('../help/help.module').then( m => m.HelpPageModule)
      },
      {
        path: 'invoices',
        loadChildren: () => import('../invoices/invoices.module').then( m => m.InvoicesPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/sidemenu/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidemenuPageRoutingModule { }
