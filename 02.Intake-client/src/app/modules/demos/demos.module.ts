import { DemoListComponent } from './demo-list/demo-list.component';
import { CreateTestModalComponent } from './create-test-modal/create-test-modal.component';
import { ViewTestModalComponent } from './view-test-modal/view-test-modal.component';
import { DeleteTestModalComponent } from './delete-test-modal/delete-test-modal.component';
import { DemosRoutingModule } from './demos-routing.module';
import { DemosComponent } from './demos.component';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModalModule, NgbDatepickerModule, NgbModule, NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CreateUpdateCustomerModalComponent } from './create-update-customer-modal/create-update-customer-modal.component';
import { MachineListComponent } from './Machine/machine-list/machine-list.component';
import { CreateUpdateMachineModalComponent } from './Machine/create-update-machine-modal/create-update-machine-modal.component';
import { SensorListComponent } from './Sensor/sensor-list/sensor-list.component';
import { CreateUpdateSensorModalComponent } from './Sensor/create-update-sensor-modal/create-update-sensor-modal.component';
import { ProcessListComponent } from './Process/process-list/process-list.component';
import { CreateUpdateProcessModalComponent } from './Process/create-update-process-modal/create-update-process-modal.component';
import { SharedModule } from '../shared/shared.module';
import { ViewProcessModalComponent } from './Process/view-process-modal/view-process-modal.component';

@Injectable()
export class CustomNgbDateAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = "/";

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomNgbDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = "/";

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : "";
  }
}

@NgModule({
  declarations: [
    DemosComponent,
    CreateTestModalComponent,
    DeleteTestModalComponent,
    ViewTestModalComponent,
    DemoListComponent,
    CustomerListComponent,
    CreateUpdateCustomerModalComponent,
    MachineListComponent,
    CreateUpdateMachineModalComponent,
    SensorListComponent,
    CreateUpdateSensorModalComponent,
    ProcessListComponent,
    CreateUpdateProcessModalComponent,
    ViewProcessModalComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    DemosRoutingModule,
    NgbModule,
    NgbDatepickerModule,
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomNgbDateAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter },
  ]
})
export class DemosModule { }
