import { AlertTriangleIcon, ShieldCheckIcon, Skull } from 'lucide-react';
import type { DangerEntity } from './danger/danger.entity';
import { useState } from 'react';
import { Button } from './components/ui/button';

export const Quartier = ({ item }: { item: DangerEntity }) => {
  const [dangerNumber, setDangerNumber] = useState<number>(
    item.dangerLevel.number,
  );
  const [warningNumber, setWarningNumber] = useState<number>(
    item.warningLevel.number,
  );
  const [safeNumber, setSafeNumber] = useState<number>(
    item.warningLevel.number,
  );

  const [isDangerCliked, setisDangerNumberClicked] = useState<boolean>(
    item.dangerLevel.isFingerPrint,
  );

  const [isWarningCliked, setisWarningClicked] = useState<boolean>(false);
  const [isSafeCliked, setisSafeClicked] = useState<boolean>(
    item.safeLevel.isFingerPrint,
  );

  return (
    <div className="flex flex-col gap-5 h-screen w-screen justify-center items-center">
      <div className="flex gap-5 flex-col border-4 border-gray-600 rounded-2xl m-2 p-4">
        <h2 className="font-semibold text-3xl ">{item.quartierName}</h2>
        <div className="flex gap-2 ">
          <Button
            disabled={item.dangerLevel.isFingerPrint}
            onClick={
              isSafeCliked || item.safeLevel.isFingerPrint
                ? () => {
                    setSafeNumber((value) => value - 1);
                    setisSafeClicked((value) => !value);
                  }
                : () => {
                    setSafeNumber((value) => value + 1);
                    setisSafeClicked((value) => !value);
                  }
            }
            className="flex cursor-pointer "
          >
            <ShieldCheckIcon />: <p className="text-black">{safeNumber}</p>
          </Button>
          <Button
            disabled={item.dangerLevel.isFingerPrint}
            onClick={
              isWarningCliked
                ? () => {
                    setWarningNumber((value) => value - 1);
                    setisWarningClicked((value) => !value);
                  }
                : () => {
                    setWarningNumber((value) => value + 1);
                    setisWarningClicked((value) => !value);
                  }
            }
            className="flex cursor-pointer "
          >
            <AlertTriangleIcon />: <p className="text-black">{warningNumber}</p>
          </Button>
          <Button
            disabled={
              item.safeLevel.isFingerPrint || item.warningLevel.isFingerPrint
            }
            onClick={
              isDangerCliked
                ? () => {
                    setDangerNumber((value) => value - 1);
                    setisDangerNumberClicked((value) => !value);
                  }
                : () => {
                    setDangerNumber((value) => value + 1);
                    setisDangerNumberClicked((value) => !value);
                  }
            }
            className="flex cursor-pointer "
          >
            <Skull />: <p className="text-black">{dangerNumber}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
