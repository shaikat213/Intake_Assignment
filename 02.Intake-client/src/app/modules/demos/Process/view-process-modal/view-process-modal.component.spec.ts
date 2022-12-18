import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProcessModalComponent } from './view-process-modal.component';

describe('ViewProcessModalComponent', () => {
  let component: ViewProcessModalComponent;
  let fixture: ComponentFixture<ViewProcessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProcessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProcessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
