import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MainBodyRoutingModule } from './main-body-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CurrencyFormatterPipe } from 'src/app/pipes/currency-formatter.pipe';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent,
    CurrencyFormatterPipe
  ],
  imports: [
    CommonModule,
    MainBodyRoutingModule,
    MatIconModule,
    FormsModule,
    MatButtonModule
  ]
})
export class MainBodyModule { }
