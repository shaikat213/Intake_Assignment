import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { delay, tap, catchError, finalize } from 'rxjs/operators';
import { TestEntityService } from 'src/app/proxy/services';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-delete-test-modal',
  templateUrl: './delete-test-modal.component.html',
  styleUrls: ['./delete-test-modal.component.scss']
})
export class DeleteTestModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  subs = new SubSink();
  isLoading = false;

  constructor(
    private testEntityServiceProxy: TestEntityService,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  deleteTestEntity() {
    this.isLoading = true;
    this.subs.sink = this.testEntityServiceProxy
      .delete(this.id)
      .pipe(
        delay(1000), // Remove it from your code (just for showing loading)
        tap(() => this.modal.close()),
        catchError((error) => {
          this.modal.dismiss(error);
          return of(undefined);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
