import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainBodyComponent } from './main-body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: MainBodyComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: "**", component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainBodyRoutingModule { }
