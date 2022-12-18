import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SensorDto } from '../dto-models/models';
import type { SensorInputDto } from '../input-dtos/models';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  apiName = 'Default';

  create = (input: SensorInputDto) =>
    this.restService.request<any, SensorDto>({
      method: 'POST',
      url: '/api/app/sensor',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/sensor/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, SensorDto>({
      method: 'GET',
      url: `/api/app/sensor/${id}`,
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, SensorDto[]>({
      method: 'GET',
      url: '/api/app/sensor',
    },
    { apiName: this.apiName });

  update = (input: SensorInputDto) =>
    this.restService.request<any, SensorDto>({
      method: 'PUT',
      url: '/api/app/sensor',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
