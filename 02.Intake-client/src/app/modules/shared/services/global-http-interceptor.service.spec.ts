/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalHttpInterceptorService } from './global-http-interceptor.service';

describe('Service: GlobalHttpInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalHttpInterceptorService]
    });
  });

  it('should ...', inject([GlobalHttpInterceptorService], (service: GlobalHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
