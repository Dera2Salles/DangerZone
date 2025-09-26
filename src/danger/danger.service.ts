import { ApiSource } from '@/core/constant';
import type { DangerEntity } from './danger.entity';
import type { AxiosInstance } from 'axios';

export abstract class DangerService {
  abstract danger(id: string, fingerPrint: string): Promise<void>;
  abstract warning(id: string, fingerPrint: string): Promise<void>;
  abstract safe(id: string, fingerPrint: string): Promise<void>;
  abstract get(fingerPrint: string): Promise<DangerEntity[]>;
}

export class DangerServiceImpl implements DangerService {
  constructor(private apiService: AxiosInstance) {}

  async danger(id: string, fingerPrint: string): Promise<void> {
    const response = await this.apiService.post(`${ApiSource.url}/danger`, {
      id,
      fingerPrint,
    });
    if (response.status != 200) throw new Error();
  }

  async warning(id: string, fingerPrint: string): Promise<void> {
    const response = await this.apiService.post(`${ApiSource.url}/warning`, {
      id,
      fingerPrint,
    });
    if (response.status != 200) throw new Error();
  }
  async safe(id: string, fingerPrint: string): Promise<void> {
    const response = await this.apiService.post(`${ApiSource.url}/safe`, {
      id,
      fingerPrint,
    });
    if (response.status != 200) throw new Error();
  }
  async get(fingerPrint: string): Promise<DangerEntity[]> {
    const response = await this.apiService.get(
      `${ApiSource.url}?fingerPrint=${fingerPrint}`,
    );
    if (response.status != 200) throw new Error();
    return response.data;
  }
}
