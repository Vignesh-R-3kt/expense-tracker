import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MainBodyRoutingModule } from './main-body-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyFormatterPipe } from 'src/app/pipes/currency-formatter.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './dashboard/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent,
    CurrencyFormatterPipe,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MainBodyRoutingModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class MainBodyModule { }
