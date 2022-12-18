import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestEntityDto } from 'src/app/proxy/dto-models';
import { TestEntityService } from 'src/app/proxy/services';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-view-test-modal',
  templateUrl: './view-test-modal.component.html',
  styleUrls: ['./view-test-modal.component.scss'],
})
export class ViewTestModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  subs = new SubSink();
  isLoading = false;
  testEntity: TestEntityDto = {} as TestEntityDto;

  constructor(
    public modal: NgbActiveModal,
    private testEntityService: TestEntityService
  ) {}

  ngOnInit(): void {
    this.loadTestEntity();
  }

  loadTestEntity() {
    this.isLoading = true;
    this.subs.sink = this.testEntityService.get(this.id).subscribe(
      (testEntityDto: TestEntityDto) => {
        this.testEntity = testEntityDto;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
