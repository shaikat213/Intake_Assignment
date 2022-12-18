import { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { SensorDto } from '../../../../proxy/dto-models';
import { SensorService } from '../../../../proxy/services';

@Component({
  selector: 'app-create-update-sensor-modal',
  templateUrl: './create-update-sensor-modal.component.html',
  styleUrls: ['./create-update-sensor-modal.component.scss']
})
export class CreateUpdateSensorModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  //departmentInputDto: DepartmentInputDto = {} as DepartmentInputDto;
  sensor: SensorDto = {} as SensorDto;
  formGroup: FormGroup;
  subs = new SubSink();
  isLoading = false;
  sensorList: SensorDto[] = [];


  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private toaster: ToasterService,
    private sensorService: SensorService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadSensor();

  }

  loadSensor() {
    this.sensor = this.initObject();
    this.loadForm();
    if (this.id) {
      this.isLoading = true;
      this.subs.sink = this.sensorService
        .get(this.id)
        .pipe(
          first(),
          catchError((errorMessage) => {
            this.modal.dismiss(errorMessage);
            return of(this.initObject());
          })
        )
        .subscribe((sensorDto: SensorDto) => {
          this.isLoading = false;
          this.sensor = sensorDto;
          this.loadForm();
        });
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      machineSensor: [
        this.sensor.machineSensor,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(350),
        ])],
      waterTemp: [this.sensor.waterTemp],
      pump10: [this.sensor.pump10],
      pump5: [this.sensor.pump5],
      draInSensor: [this.sensor.draInSensor],
      waterLevel: [this.sensor.waterLevel]
    });
  }

  save() {
    this.prepareData();
    if (this.sensor.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    this.subs.sink = this.sensorService.update(this.sensor).subscribe(
      (respone: SensorDto) => {
        this.sensor = respone;
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
    this.subs.sink = this.sensorService.create(this.sensor).subscribe(
      (res: SensorDto) => {
        this.sensor = res;
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
    this.sensor.machineSensor = formData.machineSensor;
    this.sensor.waterTemp = formData.waterTemp;
    this.sensor.pump10 = formData.pump10;
    this.sensor.pump5 = formData.pump5;
    this.sensor.draInSensor = formData.draInSensor;
    this.sensor.waterLevel = formData.waterLevel;
  }

  initObject() {
    const EMPTY_ENTITY: SensorDto = {
      id: 0,
      machineSensor: '',
      waterTemp: '',
      pump10: 0,
      pump5: 0,
      draInSensor: 0,
      waterLevel: '',
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
