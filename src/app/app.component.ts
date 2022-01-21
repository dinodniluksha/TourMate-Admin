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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-graphql';
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
