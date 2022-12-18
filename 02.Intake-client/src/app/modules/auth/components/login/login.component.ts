import { Component, OnInit, OnDestroy, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { PermissionService, isNullOrUndefined } from '@abp/ng.core';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { UserProfile } from '../../models/user.model';
import { AppAuthService } from '../../services/app-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  defaultAuth: any = {
      email: '', password: '',
  };

  errorMessage: string;
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  subs = new SubSink();

  constructor(
      private appAuthService: AppAuthService,
      private oAuthService: OAuthService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private permissionService: PermissionService
  ) {
      this.isLoading$ = this.appAuthService.isLoading$;
      if (this.appAuthService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit(): void {
      if (isDevMode()) {
          this.defaultAuth = { email: 'admin@abp.io', password: '1q2w3E*' };
      }

      this.initForm();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get formControl() {
      return this.loginForm.controls;
  }

  initForm() {
      this.loginForm = this.fb.group({
          email: [
              this.defaultAuth.email,
              Validators.compose([
                  Validators.required,
                  Validators.email,
                  Validators.minLength(3),
                  Validators.maxLength(320),
              ]),
          ],
          password: [
              this.defaultAuth.password,
              Validators.compose([
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(100),
              ]),
          ],
      });
  }

submit(): void {
  this.errorMessage = '';
  this.hasError = false;
  const username = this.formControl.email.value;
  const password = this.formControl.password.value;
  this.oAuthService.oidc = false;
  try {
    this.appAuthService.isLoadingSubject.next(true);
    this.oAuthService
      .fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password)
      .then((userInfo: UserProfile) => {
        if (userInfo) {
          const userModel = this.appAuthService.createUserModel(userInfo);
          console.log(userModel);
          this.router.navigate([this.returnUrl]);
          // this.subs.sink = this.permissionService
          //   .get(userModel.sub, userModel.roles)
          //   .subscribe(
          //     (response: PermissionDto) => {
          //       console.log(response);
          //       this.appAuthService.isLoadingSubject.next(false);
          //       //Your business logic
          //       this.router.navigate([this.returnUrl]);
          //     },
          //     (error) => {
          //       console.log(error);
          //       Swal.fire(
          //         'PERMISSIONS',
          //         'Unable to load user permissions!',
          //         'error'
          //       );
          //     },
          //     () => {
          //       this.router.navigate([this.returnUrl]);
          //     }
          //   );
        } else {
          this.hasError = true;
        }
      })
      .catch((errorResponse) => {
        this.hasError = true;
        this.appAuthService.isLoadingSubject.next(false);
        this.errorMessage = errorResponse.error.error_description || errorResponse.error.error;
      });
  } catch (error) {
    this.hasError = true;
    if (error.message === '\'tokenEndpoint\' should not be null') {
      this.errorMessage = 'Identity server is not running';
    }
  }
}

  ngOnDestroy() {
      this.subs.unsubscribe();
  }

  // submit() {
  //   this.hasError = false;
  //   const loginSubscr = this.authService
  //     .login(this.f.email.value, this.f.password.value)
  //     .pipe(first())
  //     .subscribe((user: DemoUserModel | undefined) => {
  //       if (user) {
  //         this.router.navigate([this.returnUrl]);
  //       } else {
  //         this.hasError = true;
  //       }
  //     });
  //   this.unsubscribe.push(loginSubscr);
  // }

  // ngOnDestroy() {
  //   this.unsubscribe.forEach((sb) => sb.unsubscribe());
  // }
}
