import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../vehicle';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

const GET_VEHICLE = gql`
  query Vehicle($vehicleId: ID) {
  vehicle(id: $vehicleId) {
    id
    type
    imageUrl
    isAvailable
    description
  }
}`;

@Component({
  selector: 'app-single-vehicle-display',
  templateUrl: './single-vehicle-display.component.html',
  styleUrls: ['./single-vehicle-display.component.css']
})
export class SingleVehicleDisplayComponent implements OnInit, OnDestroy {

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private apollo: Apollo) { }

  loading: boolean = true;
  id!: any;
  vehicle!: Vehicle;
  querySubscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: params => {
        this.id = params.get('id');
        this.getVehicle(this.id);
      }
    });
  }

  getVehicle(id: string) {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_VEHICLE,
      variables: {
        vehicleId: id
      }
    }).valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.vehicle = data.vehicle;
        //console.log('from backend' + JSON.stringify(this.vehicle));
      });
  }

  updateVehicle() {
    console.log('Update vehicle');
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
