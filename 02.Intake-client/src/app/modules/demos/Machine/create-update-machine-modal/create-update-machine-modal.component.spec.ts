import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMachineModalComponent } from './create-update-machine-modal.component';

describe('CreateUpdateMachineModalComponent', () => {
  let component: CreateUpdateMachineModalComponent;
  let fixture: ComponentFixture<CreateUpdateMachineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateMachineModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateMachineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
