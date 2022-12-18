
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
//import { AccountConfigModule } from '@abp/ng.account/config';
//import { IdentityConfigModule } from '@abp/ng.identity/config';
//import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
//import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { GlobalErrorHandlerService } from './modules/shared/services/global-error-handler.service';
import { GlobalHttpInterceptorService } from './modules/shared/services/global-http-interceptor.service';
import { AppAuthService } from './modules/auth/services/app-auth.service';

// #fake-start#
// import { FakeAPIService } from './_fake/fake-api.service';
// #fake-end#

function appInitializer(appAuthService: AppAuthService) {
  return () => {
    return new Promise((resolve) => {
      appAuthService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot(),
    ThemeBasicModule.forRoot(),
    InlineSVGModule.forRoot(),
    NgbModule,

    // #fake-start#
    // environment_demo.isMockEnabled
    //   ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
    //       passThruUnknownUrl: true,
    //       dataEncapsulation: false,
    //     })
    //   : [],
    // #fake-end#
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AppAuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
