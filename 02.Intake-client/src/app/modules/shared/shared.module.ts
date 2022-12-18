import { CoreModule } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { PaginationComponent } from './components/pagination/pagination.component';
@NgModule({
  declarations: [
    ConfirmModalComponent,
    AlertModalComponent,
    PaginationComponent

  ],
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    NgbModule,InlineSVGModule

  ],
  exports: [
    CoreModule,
    ConfirmModalComponent,
    AlertModalComponent,
    PaginationComponent

  ],
  providers: []
})
export class SharedModule { }
