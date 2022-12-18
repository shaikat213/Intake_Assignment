import { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { CustomerDto } from '../../../proxy/dto-models';
import { CustomerService } from '../../../proxy/services';

@Component({
  selector: 'app-create-update-customer-modal',
  templateUrl: './create-update-customer-modal.component.html',
  styleUrls: ['./create-update-customer-modal.component.scss']
})
export class CreateUpdateCustomerModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  //departmentInputDto: DepartmentInputDto = {} as DepartmentInputDto;
  customer: CustomerDto = {} as CustomerDto;
  formGroup: FormGroup;
  subs = new SubSink();
  isLoading = false;
  customerList: CustomerDto[] = [];


  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private toaster: ToasterService,
    private customerService: CustomerService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadCustomer();

  }

  loadCustomer() {
    this.customer = this.initObject();
    this.loadForm();
    if (this.id) {
      this.isLoading = true;
      this.subs.sink = this.customerService
        .get(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(this.initObject());
          })
        )
        .subscribe((customerDto: CustomerDto) => {
          this.isLoading = false;
          this.customer = customerDto;
          this.loadForm();
        });
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      customerName: [
        this.customer.customerName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(350),
        ])],
      customerPhone: [this.customer.customerPhone]

    });
  }

  save() {
    this.prepareData();
    if (this.customer.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    this.subs.sink = this.customerService.update(this.customer).subscribe(
      (respone: CustomerDto) => {
        this.customer = respone;
        this.toaster.success('Data updated successfully.', 'Success');
        this.modal.close();
      },
      (error) => {
        this.modal.dismiss(error);
        this.toaster.success('Data update failed.', 'Error');
        return of(this.initObject());
      }
    );
  }

  create() {
    this.subs.sink = this.customerService.create(this.customer).subscribe(
      (res: CustomerDto) => {
        this.customer = res;
        this.toaster.success('Data saved successfully.', 'Success');
        this.modal.close();
      },
      (error) => {
        this.modal.dismiss(error);
        this.toaster.success('Data update failed.', 'Error');
        return of(this.initObject());
      }
    );
  }

  prepareData() {
    const formData = this.formGroup.value;
    this.customer.customerName = formData.customerName;
    this.customer.customerPhone = formData.customerPhone;
  }

  initObject() {
    const EMPTY_ENTITY: CustomerDto = {
      id: 0,
      customerName: '',
      customerPhone: ''
    };
    return EMPTY_ENTITY;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

}
