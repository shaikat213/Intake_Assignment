import { ToasterService } from '@abp/ng.theme.shared';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { first, catchError } from 'rxjs/operators';
import { TestEntityDto } from 'src/app/proxy/dto-models';
import { TestEntityInputDto } from 'src/app/proxy/input-dtos';
import { TestEntityService } from 'src/app/proxy/services';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-create-test-modal',
  templateUrl: './create-test-modal.component.html',
  styleUrls: ['./create-test-modal.component.scss']
})
export class CreateTestModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  testEntityInputDto: TestEntityInputDto = {} as TestEntityInputDto;
  testEntity: TestEntityDto = {} as TestEntityDto;
  formGroup: FormGroup;
  subs = new SubSink();
  isLoading = false;

  constructor(
      private fb: FormBuilder,
      public modal: NgbActiveModal,
      private toaster: ToasterService,
      private testEntityService: TestEntityService
  ) { }

  ngOnInit(): void {
      this.loadForm();
      this.loadTestEntity();
  }

  loadTestEntity() {
      if (!this.id) {
          this.testEntity = this.initObject();
          this.loadForm();
      } else {
          this.isLoading = true;
          this.subs.sink = this.testEntityService
              .get(this.id)
              .pipe(
                  first(),
                  catchError((errorMessage) => {
                      this.modal.dismiss(errorMessage);
                      return of(this.initObject());
                  })
              )
              .subscribe((testEntityDto: TestEntityDto) => {
                  this.isLoading = false;
                  this.testEntity = testEntityDto;
                  this.loadForm();
              });
      }
  }

  loadForm() {
      this.formGroup = this.fb.group({
          testName: [
              this.testEntity.testName,
              Validators.compose([
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(350),
              ]),
          ],
          testDescription: [
              this.testEntity.testDescription
          ]
      });
  }

  save() {
      this.prepareData();
      if (this.testEntity.id) {
          this.edit();
      } else {
          this.create();
      }
  }

  edit() {
      this.subs.sink = this.testEntityService.update(this.testEntityInputDto).subscribe(
          (respone: TestEntityDto) => {
              this.testEntity = respone;
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
      this.subs.sink = this.testEntityService.create(this.testEntityInputDto).subscribe(
          (res: TestEntityDto) => {
              this.testEntity = res;
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
      this.testEntityInputDto.testName = formData.testName;
      this.testEntityInputDto.testDescription = formData.testDescription;
      if (this.testEntity.id) {
          this.testEntityInputDto.id = this.testEntity.id;
      }
  }

  initObject() {
      const EMPTY_ENTITY: TestEntityDto = {
          id: '',
          testName: '',
          testDescription: ''
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
