import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestEntityDto } from 'src/app/proxy/dto-models';
import { TestEntityService } from 'src/app/proxy/services';
import { SubSink } from 'subsink';
import { CreateTestModalComponent } from '../create-test-modal/create-test-modal.component';
import { DeleteTestModalComponent } from '../delete-test-modal/delete-test-modal.component';
import { ViewTestModalComponent } from '../view-test-modal/view-test-modal.component';

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss'],
})
export class DemoListComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  isLoading: boolean;
  testEntities: TestEntityDto[] = [];
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
    private testEntityService: TestEntityService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;
    // this.filter.limit = this.filter.pageSize;
    // this.filter.offset = (this.filter.pageNo - 1) * this.filter.pageSize;

    this.subs.sink = this.testEntityService
      .getList()
      .subscribe((response: TestEntityDto[]) => {
        this.isLoading = false;
        this.testEntities = response;
        this.cdRef.detectChanges();
      });
  }

  create() {
    this.edit(undefined);
  }

  edit(id: string): void {
    const modalRef = this.modalService.open(CreateTestModalComponent, {
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

  delete(id: string): void {
    const modalRef = this.modalService.open(DeleteTestModalComponent);
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

  view(id: string): void {
    const modalRef = this.modalService.open(ViewTestModalComponent, {
      size: 'md',
    });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => {
      this.load();
    });
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
