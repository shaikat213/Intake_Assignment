import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TestEntityDto } from '../dto-models/models';
import type { TestEntityInputDto } from '../input-dtos/models';

@Injectable({
  providedIn: 'root',
})
export class TestEntityService {
  apiName = 'Default';

  create = (input: TestEntityInputDto) =>
    this.restService.request<any, TestEntityDto>({
      method: 'POST',
      url: '/api/app/test-entity',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/test-entity/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TestEntityDto>({
      method: 'GET',
      url: `/api/app/test-entity/${id}`,
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, TestEntityDto[]>({
      method: 'GET',
      url: '/api/app/test-entity',
    },
    { apiName: this.apiName });

  update = (input: TestEntityInputDto) =>
    this.restService.request<any, TestEntityDto>({
      method: 'PUT',
      url: '/api/app/test-entity',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
