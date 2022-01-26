import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SingleVehicleDisplayComponent } from './single-vehicle-display/single-vehicle-display.component';
import { VehicleGalleryComponent } from './vehicle-gallery/vehicle-gallery.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'gellery' },
  {
    path: '', component: AdminDashboardComponent,
    children: [
      { path: 'gellery', component: VehicleGalleryComponent },
      { path: 'vehicle/:id', component: SingleVehicleDisplayComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
