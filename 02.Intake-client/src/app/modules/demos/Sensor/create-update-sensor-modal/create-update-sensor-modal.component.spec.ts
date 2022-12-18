import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSensorModalComponent } from './create-update-sensor-modal.component';

describe('CreateUpdateSensorModalComponent', () => {
  let component: CreateUpdateSensorModalComponent;
  let fixture: ComponentFixture<CreateUpdateSensorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateSensorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateSensorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
