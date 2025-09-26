import type { Result } from "@/core/Result";
import type { DangerEntity } from "./danger.entity";

export abstract class DangerRepository {
  abstract danger(id: string, fingerPrint: string): Promise<Result<void>>;
  abstract warning(id: string, fingerPrint: string): Promise<Result<void>>;
  abstract safe(id: string, fingerPrint: string): Promise<Result<void>>;
  abstract get(fingerPrint: string): Promise<Result<DangerEntity[]>>;
}
