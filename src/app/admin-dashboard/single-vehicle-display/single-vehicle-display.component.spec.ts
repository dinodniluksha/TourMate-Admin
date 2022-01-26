import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVehicleDisplayComponent } from './single-vehicle-display.component';

describe('SingleVehicleDisplayComponent', () => {
  let component: SingleVehicleDisplayComponent;
  let fixture: ComponentFixture<SingleVehicleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleVehicleDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVehicleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
