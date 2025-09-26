export interface DangerEntity {
  id?: string;
  quartierName: string;

  dangerLevel: {
    number: number;
    isFingerPrint: boolean;
  };
  warningLevel: {
    number: number;
    isFingerPrint: boolean;
  };
  safeLevel: {
    number: number;
    isFingerPrint: boolean;
  };
}
