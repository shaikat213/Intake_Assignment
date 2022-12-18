import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { MachineDto } from '../dto-models/models';
import type { MachineInputDto } from '../input-dtos/models';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  apiName = 'Default';

  create = (input: MachineInputDto) =>
    this.restService.request<any, MachineDto>({
      method: 'POST',
      url: '/api/app/machine',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/machine/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, MachineDto>({
      method: 'GET',
      url: `/api/app/machine/${id}`,
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, MachineDto[]>({
      method: 'GET',
      url: '/api/app/machine',
    },
    { apiName: this.apiName });

  update = (input: MachineInputDto) =>
    this.restService.request<any, MachineDto>({
      method: 'PUT',
      url: '/api/app/machine',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
