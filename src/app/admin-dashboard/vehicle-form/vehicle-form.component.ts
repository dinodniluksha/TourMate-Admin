import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VehicleService } from '../vehicle.service';
import { MatDialogRef, MatDialogConfig } from "@angular/material/dialog";


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
    this.service.newVehicle(this.service.form.value)
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.onClose();
  }

  onClear() {

  }

  onClose() {
    this.dialogRef.close();
  }
}
