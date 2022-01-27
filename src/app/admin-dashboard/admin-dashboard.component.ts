import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: VehicleService) { }

  ngOnInit(): void {
  }

  onCreate() {
    console.log('Add new one');
    this.service.updateOn = false;
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(VehicleFormComponent,
      dialogConfig);
  }
}
