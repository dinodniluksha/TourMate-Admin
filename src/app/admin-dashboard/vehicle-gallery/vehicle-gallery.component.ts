import { Component, OnInit, OnDestroy } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

const GET_VEHICLES = gql`
  query {
  vehicles {
    id
    type
    imageUrl
    isAvailable
    description
  }
}`;

@Component({
  selector: 'app-vehicle-gallery',
  templateUrl: './vehicle-gallery.component.html',
  styleUrls: ['./vehicle-gallery.component.css']
})
export class VehicleGalleryComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  vehicles: any;
  querySubscription: Subscription = new Subscription;

  constructor(private apollo: Apollo, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_VEHICLES
    }).valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.vehicles = data.vehicles;
        console.log(this.vehicles);
        console.log(this.loading);
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}