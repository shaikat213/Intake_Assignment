import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CustomerDto } from '../dto-models/models';
import type { CustomerInputDto } from '../input-dtos/models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiName = 'Default';

  create = (input: CustomerInputDto) =>
    this.restService.request<any, CustomerDto>({
      method: 'POST',
      url: '/api/app/customer',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/customer/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, CustomerDto>({
      method: 'GET',
      url: `/api/app/customer/${id}`,
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, CustomerDto[]>({
      method: 'GET',
      url: '/api/app/customer',
    },
    { apiName: this.apiName });

  update = (input: CustomerInputDto) =>
    this.restService.request<any, CustomerDto>({
      method: 'PUT',
      url: '/api/app/customer',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
