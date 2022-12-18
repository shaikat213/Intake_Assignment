import { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { CustomerDto, MachineDto, ProcessDto, SensorDto } from '../../../../proxy/dto-models';
import { CustomerService, MachineService, ProcessService, SensorService } from '../../../../proxy/services';
import * as moment from 'moment';
import { Common } from '../../../shared/common/common';

@Component({
  selector: 'app-view-process-modal',
  templateUrl: './view-process-modal.component.html',
  styleUrls: ['./view-process-modal.component.scss']
})
export class ViewProcessModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  //departmentInputDto: DepartmentInputDto = {} as DepartmentInputDto;
  process: ProcessDto = {} as ProcessDto;
  formGroup: FormGroup;
  subs = new SubSink();
  isLoading = false;
  processList: ProcessDto[] = [];
  customerList: CustomerDto[] = [];
  machineList: MachineDto[] = [];
  sensorList: SensorDto[] = [];

  customerName: string = ''
  machineNr: string = ''
  machineTypeSerial: string = ''
  processName: string = '';
  processTime: string = '';
  sensorData: string = '';
  onlineFrom: string = '';

  minDate: any;
  maxDate: any;

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private toaster: ToasterService,
    private processService: ProcessService,
    private customerService: CustomerService,
    private machineService: MachineService,
    private sensorService: SensorService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadData();
    //this.loadProcess();

  }

  loadData() {
    this.subs.sink = this.processService.get(this.id).subscribe((data) => {
      let process = data;
      if (process) {
        this.processName = process.processName;
        this.processTime = "Start : " + process.startDate +
          "; End : " + process.endDate;
        this.onlineFrom = process.onlineFrom;

        this.subs.sink = this.customerService.get(process.customerId).subscribe((cust) => {
          let customer = cust;
          this.customerName = customer.customerName;
        
        });
        this.subs.sink = this.machineService.get(process.machineId).subscribe((machinesData) => {
          let machine = machinesData;
          this.machineNr = machine.machineNr;
          this.machineTypeSerial = machine.machineTypeSerial;
        
        });
        this.subs.sink = this.sensorService.get(process.sensorId).subscribe((sens) => {
          let sensor = sens;
          this.sensorData = "Water Temp: celcius : " + sensor.waterTemp +
            "; Pump10 : " + (sensor.pump10 == 1 ? "On" : "Off") +
            "; Pump5 : " + (sensor.pump5 == 1 ? "On" : "Off") +
            "; Dra in Sensor : " + (sensor.draInSensor == 1 ? "On" : "Off") +
            "; Water Level: ml- : " + sensor.waterLevel

        });

        this.cdRef.detectChanges();
      }

      this.cdRef.detectChanges();
    });
    //this.subs.sink = this.customerService.getList().subscribe((data) => {
    //  this.customerList = data;//_.sortBy(data), ['name']); //.filter(d => d.allotmentId == null)
    //  this.cdRef.detectChanges();
    //});
    //this.subs.sink = this.machineService.getList().subscribe((data) => {
    //  this.machineList = data;//_.sortBy(data), ['name']); //.filter(d => d.allotmentId == null)
    //  this.cdRef.detectChanges();
    //});
    //this.subs.sink = this.sensorService.getList().subscribe((data) => {
    //  this.sensorList = data;//_.sortBy(data), ['name']); //.filter(d => d.allotmentId == null)
    //  this.cdRef.detectChanges();
    //});
  }

  //loadProcess() {
  //  //this.process = this.initObject();
  //  this.loadForm();
  //  if (this.id) {
  //    this.isLoading = true;
  //    this.subs.sink = this.processService
  //      .get(this.id)
  //      .pipe(
  //        first(),
  //        catchError((errorMessage) => {
  //          this.modal.dismiss(errorMessage);
  //          return of(this.initObject());
  //        })
  //      )
  //      .subscribe((processDto: ProcessDto) => {
  //        this.isLoading = false;
  //        this.process = processDto;
  //        this.loadForm();
  //      });
  //  }
  //}

  //loadForm() {
  //  this.formGroup = this.fb.group({
  //    processName: [
  //      this.process.processName,
  //      Validators.compose([
  //        Validators.required,
  //        Validators.minLength(3),
  //        Validators.maxLength(350),
  //      ])],
  //    customerId: [this.process.customerId],
  //    machineId: [this.process.machineId],
  //    sensorId: [this.process.sensorId],
  //    startDate: [this.process.startDate != null ? Common.ParseDateForUI(this.process.startDate) : null],//[Common.ParseDateForUI(this.process.startDate)],//[this.process.startDate],
  //    endDate: [this.process.endDate != null ? Common.ParseDateForUI(this.process.endDate) : null],//[Common.ParseDateForUI(this.process.endDate)],//[this.process.endDate],
  //    onlineFrom: [this.process.onlineFrom != null ? Common.ParseDateForUI(this.process.onlineFrom) : null],//[Common.ParseDateForUI(this.process.onlineFrom)]//[this.process.onlineFrom]
  //  });
  //}

  //save() {
  //  this.prepareData();
  //  if (this.process.id) {
  //    this.edit();
  //  } else {
  //    this.create();
  //  }
  //}

  //edit() {
  //  this.subs.sink = this.processService.update(this.process).subscribe(
  //    (respone: ProcessDto) => {
  //      this.process = respone;
  //      this.toaster.success('Data updated successfully.', 'Success');
  //      this.modal.close();
  //    },
  //    (error) => {
  //      this.modal.dismiss(error);
  //      this.toaster.success('Data update failed.', 'Error');
  //      return of(this.initObject());
  //    }
  //  );
  //}

  //create() {
  //  this.subs.sink = this.processService.create(this.process).subscribe(
  //    (res: ProcessDto) => {
  //      this.process = res;
  //      this.toaster.success('Data saved successfully.', 'Success');
  //      this.modal.close();
  //    },
  //    (error) => {
  //      this.modal.dismiss(error);
  //      this.toaster.success('Data update failed.', 'Error');
  //      return of(this.initObject());
  //    }
  //  );
  //}

  //prepareData() {
  //  const formData = this.formGroup.value;
  //  this.process.customerId = formData.customerId;
  //  this.process.machineId = formData.machineId;
  //  this.process.sensorId = formData.sensorId;
  //  this.process.processName = formData.processName;
  //  this.process.startDate = moment(formData.startDate, Common.defaultDateFormat).format(Common.responseDateFormat);
  //  this.process.endDate = moment(formData.endDate, Common.defaultDateFormat).format(Common.responseDateFormat);
  //  this.process.onlineFrom = moment(formData.onlineFrom, Common.defaultDateFormat).format(Common.responseDateFormat);
  //}

  //convertTwoDigitDayAndMonth(date) {
  //  if (date) {
  //    var arr = date.split('-');
  //    var day = arr[0];
  //    var month = arr[1];
  //    day = day < 10 ? "0" + day : day;
  //    month = month < 10 ? "0" + month : month;
  //    return day + "-" + month + "-" + arr[2];
  //  }
  //}

  //initObject() {
  //  const EMPTY_ENTITY: ProcessDto = {
  //    id: 0,
  //    customerId: 0,
  //    machineId: 0,
  //    sensorId: 0,
  //    processName: '',
  //    startDate: '',
  //    endDate: '',
  //    onlineFrom: ''
  //  };
  //  return EMPTY_ENTITY;
  //}

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
