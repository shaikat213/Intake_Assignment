import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCustomerModalComponent } from './create-update-customer-modal.component';

describe('CreateUpdateCustomerModalComponent', () => {
  let component: CreateUpdateCustomerModalComponent;
  let fixture: ComponentFixture<CreateUpdateCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCustomerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
