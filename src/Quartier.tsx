import { AlertTriangleIcon, ShieldCheckIcon, Skull } from 'lucide-react';
import type { DangerEntity } from './danger/danger.entity';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { useDangerContext } from './useDangerContext';

export const Quartier = ({ item }: { item: DangerEntity }) => {
  const { danger, warning, safe } = useDangerContext();
  const [dangerNumber, setDangerNumber] = useState<number>(
    item.dangerLevel.number,
  );
  const [warningNumber, setWarningNumber] = useState<number>(
    item.warningLevel.number,
  );
  const [safeNumber, setSafeNumber] = useState<number>(item.safeLevel.number); 

  const [activeLevel, setActiveLevel] = useState<
    'danger' | 'warning' | 'safe' | null
  >(
    item.dangerLevel.isFingerPrint
      ? 'danger'
      : item.warningLevel.isFingerPrint
      ? 'warning'
      : item.safeLevel.isFingerPrint
      ? 'safe'
      : null,
  );

  const handleLevelClick = async (level: 'danger' | 'warning' | 'safe') => {
    if (activeLevel === level) {
      setActiveLevel(null);

      switch (level) {
        case 'danger':
          setDangerNumber((prev) => prev - 1);
          break;
        case 'warning':
          setWarningNumber((prev) => prev - 1);
          break;
        case 'safe':
          setSafeNumber((prev) => prev - 1);
          break;
      }
    } else {

      if (activeLevel) {
        switch (activeLevel) {
          case 'danger':
            setDangerNumber((prev) => prev - 1);
            break;
          case 'warning':
            setWarningNumber((prev) => prev - 1);
            break;
          case 'safe':
            setSafeNumber((prev) => prev - 1);
            break;
        }
      }

      setActiveLevel(level);
      switch (level) {
        case 'danger':
          setDangerNumber((prev) => prev + 1);
          await danger(item.id as string);
          break;
        case 'warning':
          setWarningNumber((prev) => prev + 1);
          await warning(item.id as string);
          break;
        case 'safe':
          setSafeNumber((prev) => prev + 1);
          await safe(item.id as string);
          break;
      }
    }
  };

  const isButtonDisabled = (level: 'danger' | 'warning' | 'safe') => {
    return activeLevel !== null && activeLevel !== level;
  };

  return (
      <div className="flex lg:w-1/4 w-max flex-col gap-5 shadow-sm bg-white m-5 p-5 rounded-lg">
        <h2 className="font-semibold text-3xl">{item.quartierName}</h2>
        <div className="flex gap-2 text-white">
          <Button
            disabled={isButtonDisabled('safe')}
            onClick={() => handleLevelClick('safe')}
            className={`flex cursor-pointer ${
              activeLevel === 'safe' ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            <ShieldCheckIcon />: <p className="text-white">{safeNumber}</p>
          </Button>

          <Button
            disabled={isButtonDisabled('warning')}
            onClick={() => handleLevelClick('warning')}
            className={`flex cursor-pointer ${
              activeLevel === 'warning' ? 'bg-yellow-600' : 'bg-gray-600'
            }`}
          >
            <AlertTriangleIcon />: <p className="text-white">{warningNumber}</p>
          </Button>
          <Button
            disabled={isButtonDisabled('danger')}
            onClick={() => handleLevelClick('danger')}
            className={`flex cursor-pointer ${
              activeLevel === 'danger' ? 'bg-red-600' : 'bg-gray-600'
            }`}
          >
            <Skull />: <p className="text-white">{dangerNumber}</p>
          </Button>
        </div>
      </div>
  );
};
