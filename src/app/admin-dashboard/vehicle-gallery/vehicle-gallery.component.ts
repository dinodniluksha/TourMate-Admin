import { Component, OnInit, OnDestroy } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

const GET_USERS = gql`
  query {
  getUsers {
    id
    login
    avatar_url
  }
}`;

@Component({
  selector: 'app-vehicle-gallery',
  templateUrl: './vehicle-gallery.component.html',
  styleUrls: ['./vehicle-gallery.component.css']
})
export class VehicleGalleryComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  users: any;

  querySubscription: Subscription = new Subscription;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_USERS
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.users = data.getUsers;
        console.log(this.users);
        console.log(this.loading);
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}