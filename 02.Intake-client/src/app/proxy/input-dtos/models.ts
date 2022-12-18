import type { EntityDto } from '@abp/ng.core';

export interface CustomerInputDto extends EntityDto<number> {
  customerName?: string;
  customerPhone?: string;
}

export interface MachineInputDto extends EntityDto<number> {
  machineNr?: string;
  machineTypeSerial?: string;
}

export interface SensorInputDto extends EntityDto<number> {
  machineSensor?: string;
  waterTemp?: string;
  pump10: number;
  pump5: number;
  draInSensor: number;
  waterLevel?: string;
}

export interface TestEntityInputDto {
  id?: string;
  testName?: string;
  testDescription?: string;
}
