import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-single-vehicle-display',
  templateUrl: './single-vehicle-display.component.html',
  styleUrls: ['./single-vehicle-display.component.css']
})
export class SingleVehicleDisplayComponent implements OnInit {
  loading: boolean = true;
  id!: any;
  vehicle!: Vehicle;

  constructor(
    private activatedRoute: ActivatedRoute,
    public service: VehicleService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.paramMap.subscribe({
      next: params => {
        this.id = params.get('id');
        this.buildVehicleDisplay(this.id);
      }
    });
  }

  buildVehicleDisplay(vehicleId: string) {
    this.spinner.show();
    this.service.getVehicle(vehicleId).subscribe(
      (result: any) => {
        console.log(result.data);
        console.log(result.loading);
        this.loading = result.data.loading;
        this.vehicle = result.data.vehicle;
      }
    );
  }

  updateVehicle() {
    this.service.updateOn = true;
    this.service.initializeUpdateFormGroup(this.vehicle);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.position = ({ right: '50px' });
    this.dialog.open(VehicleFormComponent, dialogConfig);
  }

  deleteVehicle() {
    this.service.deleteVehicle(this.vehicle.id);
  }
}
