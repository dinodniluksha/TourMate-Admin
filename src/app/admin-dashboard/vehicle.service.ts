import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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

const CREATE_VEHICLE = gql`
  mutation CreateVehicle($input: VehicleInput) {
  createVehicle(input: $input) {
    msg
    createdRecord {
      id
      type
      imageUrl
      isAvailable
      description
    }
  }
}`;

const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle($input: VehicleInput) {
  updateVehicle(input: $input) {
    msg
    updatedFields {
      id
      type
      imageUrl
      isAvailable
      description
    }
  }
}`;

const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($input: ID) {
  deleteVehicle(id: $input) {
    msg
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  result: any;
  updateOn: boolean = false;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    type: new FormControl(''),
    imageUrl: new FormControl(''),
    isAvailable: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private apollo: Apollo,
    private router: Router,
    private location: Location,
  ) { }

  initializeFormGroup() {
    this.form.setValue({
      id: '',
      type: '',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pro1-eece0.appspot.com/o/blue_car.jpeg?alt=media&token=83196cd6-c9fe-4da5-86ef-31f2128a98f7',
      isAvailable: null,
      description: '',
    });
  }

  initializeUpdateFormGroup(vehicle: any) {
    this.form.setValue({
      id: vehicle.id,
      type: vehicle.type,
      imageUrl: vehicle.imageUrl,
      isAvailable: vehicle.isAvailable,
      description: vehicle.description,
    });
  }

  getVehicles(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_VEHICLES
    }).valueChanges
      .pipe(retry(1),
        catchError(this.httpError));
  }

  getVehicle(id: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_VEHICLE,
      variables: {
        vehicleId: id
      }
    }).valueChanges
      .pipe(retry(1),
        catchError(this.httpError));
  }

  createVehicle(vehicle: any) {
    this.apollo.mutate({
      mutation: CREATE_VEHICLE,
      variables: {
        "input": vehicle
      }
    }).subscribe(({ data }) => {
      //console.log('got data', data);
      this.result = data;
      window.alert('New vehicle is created successfully');
      window.location.reload();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  updateVehicle(vehicle: any) {
    this.apollo.mutate({
      mutation: UPDATE_VEHICLE,
      variables: {
        "input": vehicle
      }
    }).subscribe(({ data }) => {
      //console.log('got data', data);
      this.result = data;
      window.alert('Vehicle is updated successfully');
      window.location.reload();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  deleteVehicle(vehicleId: string) {
    console.log(vehicleId);
    //console.log(this.router.url);
    this.apollo.mutate({
      mutation: DELETE_VEHICLE,
      variables: {
        "input": vehicleId
      }
    }).subscribe(({ data }) => {
      //console.log('got data', data);
      this.result = data;
      window.alert('Vehicle is deleted successfully');
      window.location.reload();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
    if (this.router.url != '/dashboard/gellery')
      this.location.back();
  }

  httpError(error: any) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
