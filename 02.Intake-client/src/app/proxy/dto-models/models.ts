import type { EntityDto } from '@abp/ng.core';

export interface CustomerDto extends EntityDto<number> {
  customerName?: string;
  customerPhone?: string;
}

export interface MachineDto extends EntityDto<number> {
  machineNr?: string;
  machineTypeSerial?: string;
}

export interface ProcessDto extends EntityDto<number> {
  customerId: number;
  customerName?: string;
  machineId: number;
  machineNr?: string;
  machineTypeSerial?: string;
  sensorId: number;
  sensorData?: string;
  processName?: string;
  startDate?: string;
  endDate?: string;
  processTime?: string;
  onlineFrom?: string;
}

export interface SensorDto extends EntityDto<number> {
  machineSensor?: string;
  waterTemp?: string;
  pump10: number;
  pump10Name?: string;
  pump5: number;
  pump5Name?: string;
  draInSensor: number;
  draInSensorName?: string;
  waterLevel?: string;
}

export interface SensorSearchDto extends EntityDto<number> {
  waterTemp?: string;
  pump10?: number;
  pump5?: number;
  draInSensor?: number;
  waterLevel?: string;
}

export interface TestEntityDto {
  id?: string;
  testName?: string;
  testDescription?: string;
}
