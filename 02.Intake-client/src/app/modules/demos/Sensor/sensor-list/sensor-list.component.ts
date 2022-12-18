import { ToasterService } from '@abp/ng.theme.shared';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Common } from '../../../shared/common/common';
import { CommonModalService } from '../../../shared/services/common-modal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SensorDto } from 'src/app/proxy/dto-models';
import { SensorService } from 'src/app/proxy/services';
import { SubSink } from 'subsink';
import { CreateUpdateSensorModalComponent } from '../create-update-sensor-modal/create-update-sensor-modal.component';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss']
})
export class SensorListComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  subs = new SubSink();
  isLoading: boolean;
  sensors: SensorDto[] = [];
  // filter: FilterModel = {
  //     offset: 0,
  //     limit: 0,
  //     pageNo: 1,
  //     pageSize: 10,
  //     sortBy: 'name',
  //     sortOrder: 'asc',
  //     isDesc: false,
  // };

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef,
    private sensorService: SensorService,
    private fb: FormBuilder,
    private toaster: ToasterService,
    private commonModalService: CommonModalService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;
    // this.filter.limit = this.filter.pageSize;
    // this.filter.offset = (this.filter.pageNo - 1) * this.filter.pageSize;

    this.subs.sink = this.sensorService
      .getList()
      .subscribe((response: SensorDto[]) => {
        this.isLoading = false;
        this.sensors = response;
        this.cdRef.detectChanges();
      });
  }

  create() {
    this.edit(undefined);
  }

  edit(id: string): void {
    const modalRef = this.modalService.open(CreateUpdateSensorModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => {
        this.load();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  delete(sensor: SensorDto) {
    const data = Common.GetDeleteModalConfigurationObject(sensor.machineSensor);
    this.commonModalService.confirm(data).then(
      (result: any) => {
        this.subs.sink = this.sensorService.delete(sensor.id).subscribe(
          (reponseData) => {
            this.load();
            this.toaster.success('Data deleted successfully.', 'Success');
          },
          (err: any) => {
            const alertData = {
              title: 'Notification',
              body: 'Unable to perform delete operation.',
              size: null,
              backdrop: true,
              keyboard: true,
              okButtonText: 'Ok',
              okButtonClass: 'btn-primary padding-left-30 padding-right-30',
            };
            this.commonModalService.alert(alertData);
          }
        );
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  //delete(id: string): void {
  //  const modalRef = this.modalService.open(DeleteTestModalComponent);
  //  modalRef.componentInstance.id = id;
  //  modalRef.result.then(
  //    () => {
  //      this.load();
  //    },
  //    (error: any) => {
  //      console.log(error);
  //    }
  //  );
  //}

  view(id: string): void {
    //const modalRef = this.modalService.open(ViewTestModalComponent, {
    //  size: 'md',
    //});
    //modalRef.componentInstance.id = id;
    //modalRef.result.then(() => {
    //  this.load();
    //});
  }

  // pageChanged($event: any) {
  //     this.filter.pageNo = $event;
  //     this.load();
  // }

  // pageSizeChanged($event: any) {
  //     this.filter.pageNo = 1;
  //     this.filter.pageSize = $event;
  //     this.load();
  // }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
