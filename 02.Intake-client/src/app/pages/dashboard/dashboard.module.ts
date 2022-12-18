import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WidgetsModule } from '../../_metronic/partials';
import { ProcessListComponent } from '../../modules/demos/Process/process-list/process-list.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProcessListComponent //DashboardComponent,
      },
    ]),
    WidgetsModule,
  ],
})
export class DashboardModule {}
