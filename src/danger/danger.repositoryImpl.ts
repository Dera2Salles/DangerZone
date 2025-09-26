import { failure, success, type Result } from '@/core/Result';
import { DangerRepository } from './danger.repository';
import type { DangerService } from './danger.service';
import type { DangerEntity } from './danger.entity';

export class DangerRepositoryImpl implements DangerRepository {
  constructor(private service: DangerService) {}

  async danger(id: string, fingerPrint: string): Promise<Result<void>> {
    try {
      await this.service.danger(id, fingerPrint);
      return success(undefined);
    } catch (error) {
      console.error(error);
      return failure(new Error());
    }
  }

  async warning(id: string, fingerPrint: string): Promise<Result<void>> {
    try {
      await this.service.warning(id, fingerPrint);
      return success(undefined);
    } catch (error) {
      console.error(error);
      return failure(new Error());
    }
  }

  async safe(id: string, fingerPrint: string): Promise<Result<void>> {
    try {
      await this.service.safe(id, fingerPrint);
      return success(undefined);
    } catch (error) {
      console.error(error);
      return failure(new Error());
    }
  }

  async get(fingerPrint: string): Promise<Result<DangerEntity[]>> {
    try {
      const result = await this.service.get(fingerPrint);
      return success(result);
    } catch (error) {
      console.log(error);
      return failure(new Error());
    }
  }
}
