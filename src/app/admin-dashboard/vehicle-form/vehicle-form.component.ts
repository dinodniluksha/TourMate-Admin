import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  constructor(
    public service: VehicleService,
    private dialogRef: MatDialogRef<VehicleFormComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Now submit form');
    if (this.service.updateOn)
      this.service.updateVehicle(this.service.form.value);
    else
      this.service.newVehicle(this.service.form.value);
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.onClose();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.service.updateOn = false;
    this.dialogRef.close();
  }
}
