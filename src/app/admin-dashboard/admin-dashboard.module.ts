import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from "ngx-spinner";
import { VehicleGalleryComponent } from './vehicle-gallery/vehicle-gallery.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    VehicleGalleryComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    NgxSpinnerModule,
  ]
})
export class AdminDashboardModule { }
