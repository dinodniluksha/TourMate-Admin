import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Apollo, gql } from 'apollo-angular';

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

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private apollo: Apollo) { }

  updateOn: boolean = false;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    type: new FormControl(''),
    imageUrl: new FormControl(''),
    isAvailable: new FormControl(''),
    description: new FormControl(''),

  });

  initializeFormGroup() {
    console.log('Yes...run initilaizaion function');
    this.form.setValue({
      id: '',
      type: '',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pro1-eece0.appspot.com/o/blue_car.jpeg?alt=media&token=83196cd6-c9fe-4da5-86ef-31f2128a98f7',
      isAvailable: null,
      description: '',
    });
  }

  initializeUpdateFormGroup(vehicle: any) {
    console.log('Yes...run initilaizaion function');
    this.form.setValue({
      id: vehicle.id,
      type: vehicle.type,
      imageUrl: vehicle.imageUrl,
      isAvailable: vehicle.isAvailable,
      description: vehicle.description,
    });
  }


  newVehicle(vehicle: any) {
    console.log(vehicle);
    this.apollo.mutate({
      mutation: CREATE_VEHICLE,
      variables: {
        "input": vehicle
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      window.alert('New vehicle is created successfully');
      window.location.reload();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  updateVehicle(vehicle: any) {
    console.log(vehicle);
    this.apollo.mutate({
      mutation: UPDATE_VEHICLE,
      variables: {
        "input": vehicle
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      window.alert('Vehicle is updated successfully');
      window.location.reload();
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  populateForm(vehicle: object) {
    this.form.setValue(vehicle);
  }
}
