import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicle-gallery',
  templateUrl: './vehicle-gallery.component.html',
  styleUrls: ['./vehicle-gallery.component.css']
})
export class VehicleGalleryComponent implements OnInit {
  loading: boolean = true;
  vehicles: Vehicle[] = [];
  vehicle!: Vehicle;
  value!: boolean;
  availabilityRack: boolean[] = [];
  availability: boolean = true;

  constructor(
    private spinner: NgxSpinnerService,
    private service: VehicleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildVehicleGallery();
  }

  buildVehicleGallery() {
    this.spinner.show();
    this.service.getVehicles().subscribe(
      (result: any) => {
        //console.log(result.data);
        //console.log(result.loading);
        this.loading = result.data.loading;
        this.vehicles = result.data.vehicles;
        this.initializeAvailability();
      }
    );
  }

  showVehicle(vehicleId: string) {
    this.service.updateOn = false;
    this.router.navigate(['/dashboard/vehicle/' + vehicleId]);
  }

  deleteVehicle(vehicleId: string) {
    this.service.deleteVehicle(vehicleId);
  }

  handleAvailabilityChange(point: number, id: string, value: boolean) {
    this.availabilityRack[point] = value;
    this.service.updateVehicle({
      "id": id,
      "isAvailable": value
    });
  }

  initializeAvailability() {
    for (let i = 0; i < this.vehicles.length; i++) {
      this.availabilityRack.push(this.vehicles[i].isAvailable);
    }
  }

  setVisibility() {
    //console.log('Set Visibility...');
  }
}