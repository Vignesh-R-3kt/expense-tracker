import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MainBodyRoutingModule } from './main-body-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    MainBodyRoutingModule,
    MatIconModule
  ]
})
export class MainBodyModule { }
