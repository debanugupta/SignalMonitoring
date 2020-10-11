import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalAddComponent } from './signals/signal-add/signal-add.component';
import { SignalListComponent } from './signals/signal-list/signal-list.component';


export const appRoutes: Routes = [

  { path: '', component: SignalListComponent},
  {
      path: '',
      // runGuardsAndResolvers: 'always',
      // canActivate: [AuthGuard],
      children: [
          { path: 'signals', component: SignalListComponent},
          { path: 'signals/add', component: SignalAddComponent},
      ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}

];
