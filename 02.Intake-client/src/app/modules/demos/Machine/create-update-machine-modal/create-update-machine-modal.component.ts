import { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { MachineDto } from '../../../../proxy/dto-models';
import { MachineService } from '../../../../proxy/services';

@Component({
  selector: 'app-create-update-machine-modal',
  templateUrl: './create-update-machine-modal.component.html',
  styleUrls: ['./create-update-machine-modal.component.scss']
})
export class CreateUpdateMachineModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  //departmentInputDto: DepartmentInputDto = {} as DepartmentInputDto;
  machine: MachineDto = {} as MachineDto;
  formGroup: FormGroup;
  subs = new SubSink();
  isLoading = false;
  machineList: MachineDto[] = [];


  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private toaster: ToasterService,
    private machineService: MachineService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadMachine();

  }

  loadMachine() {
    this.machine = this.initObject();
    this.loadForm();
    if (this.id) {
      this.isLoading = true;
      this.subs.sink = this.machineService
        .get(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(this.initObject());
          })
        )
        .subscribe((machineDto: MachineDto) => {
          this.isLoading = false;
          this.machine = machineDto;
          this.loadForm();
        });
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      machineNr: [
        this.machine.machineNr,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(350),
        ])],
      machineTypeSerial: [this.machine.machineTypeSerial]

    });
  }

  save() {
    this.prepareData();
    if (this.machine.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    this.subs.sink = this.machineService.update(this.machine).subscribe(
      (respone: MachineDto) => {
        this.machine = respone;
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
    this.subs.sink = this.machineService.create(this.machine).subscribe(
      (res: MachineDto) => {
        this.machine = res;
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
    this.machine.machineNr = formData.machineNr;
    this.machine.machineTypeSerial = formData.machineTypeSerial;
  }

  initObject() {
    const EMPTY_ENTITY: MachineDto = {
      id: 0,
      machineNr: '',
      machineTypeSerial: ''
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
