import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateProcessModalComponent } from './create-update-process-modal.component';

describe('CreateUpdateProcessModalComponent', () => {
  let component: CreateUpdateProcessModalComponent;
  let fixture: ComponentFixture<CreateUpdateProcessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateProcessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateProcessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
