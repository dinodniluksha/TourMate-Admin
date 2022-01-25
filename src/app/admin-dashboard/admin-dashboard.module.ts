import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from "ngx-spinner";
import { VehicleGalleryComponent } from './vehicle-gallery/vehicle-gallery.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    VehicleGalleryComponent,
    VehicleFormComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [MatFormFieldModule, MatInputModule],
  entryComponents: [VehicleFormComponent]
})
export class AdminDashboardModule { }
