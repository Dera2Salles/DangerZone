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
  const [safeNumber, setSafeNumber] = useState<number>(item.safeLevel.number); // Correction: item.safeLevel.number

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

  // Fonction pour gérer le clic sur un niveau
  const handleLevelClick = (level: 'danger' | 'warning' | 'safe') => {
    if (activeLevel === level) {
      // Déselectionner le niveau actuel
      setActiveLevel(null);
      // Décrémenter le compteur du niveau désélectionné
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
      // Si un niveau était déjà sélectionné, le décrémenter d'abord
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

      // Sélectionner le nouveau niveau et l'incrémenter
      setActiveLevel(level);
      switch (level) {
        case 'danger':
          setDangerNumber((prev) => prev + 1);
          break;
        case 'warning':
          setWarningNumber((prev) => prev + 1);
          break;
        case 'safe':
          setSafeNumber((prev) => prev + 1);
          break;
      }
    }
  };

  // Vérifier si un bouton est désactivé (un autre niveau est déjà sélectionné)
  const isButtonDisabled = (level: 'danger' | 'warning' | 'safe') => {
    return activeLevel !== null && activeLevel !== level;
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div className="flex gap-5 flex-col border-4 border-gray-600 rounded-2xl m-2 p-4">
        <h2 className="font-semibold text-3xl">{item.quartierName}</h2>
        <div className="flex gap-2 text-white">
          {/* Bouton Safe */}
          <Button
            disabled={isButtonDisabled('safe')}
            onClick={() => handleLevelClick('safe')}
            className={`flex cursor-pointer ${
              activeLevel === 'safe' ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            <ShieldCheckIcon />: <p className="text-white">{safeNumber}</p>
          </Button>

          {/* Bouton Warning */}
          <Button
            disabled={isButtonDisabled('warning')}
            onClick={() => handleLevelClick('warning')}
            className={`flex cursor-pointer ${
              activeLevel === 'warning' ? 'bg-yellow-600' : 'bg-gray-600'
            }`}
          >
            <AlertTriangleIcon />: <p className="text-white">{warningNumber}</p>
          </Button>

          {/* Bouton Danger */}
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
    </div>
  );
};
