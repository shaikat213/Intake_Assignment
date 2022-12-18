import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ProcessDto, SensorSearchDto } from '../dto-models/models';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  apiName = 'Default';

  create = (input: ProcessDto) =>
    this.restService.request<any, ProcessDto>({
      method: 'POST',
      url: '/api/app/process',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/process/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, ProcessDto>({
      method: 'GET',
      url: `/api/app/process/${id}`,
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, ProcessDto[]>({
      method: 'GET',
      url: '/api/app/process',
    },
    { apiName: this.apiName });

  getProcessListByCustomer = (customerName: string) =>
    this.restService.request<any, ProcessDto[]>({
      method: 'GET',
      url: '/api/app/process/process-list-by-customer',
      params: { customerName },
    },
    { apiName: this.apiName });

  getProcessListBySensor = (sensor: SensorSearchDto) =>
    this.restService.request<any, ProcessDto[]>({
      method: 'GET',
      url: '/api/app/process/process-list-by-sensor',
      params: { waterTemp: sensor.waterTemp, pump10: sensor.pump10, pump5: sensor.pump5, draInSensor: sensor.draInSensor, waterLevel: sensor.waterLevel, id: sensor.id },
    },
    { apiName: this.apiName });

  update = (input: ProcessDto) =>
    this.restService.request<any, ProcessDto>({
      method: 'PUT',
      url: '/api/app/process',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
