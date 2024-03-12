import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MainBodyRoutingModule } from './main-body-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    MainBodyRoutingModule,
  ]
})
export class MainBodyModule { }
