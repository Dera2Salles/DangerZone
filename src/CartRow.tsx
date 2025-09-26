import { AlertTriangleIcon, ShieldCheckIcon, Skull } from 'lucide-react';

interface Quartier {
  name: string;
  dangerLevel: number;
  warninglevel: number;
  safeNumber: number;
}

export const Quartier = () => {
  return (
    <div className="w-full md:w-1/2 bg-card  text-card-foreground items-center justify-between  flex flex-col gap-10 rounded-4xl border-4 py-5 px-5 shadow-2xs">
      <p className='font-semibold text-3xl'>Sabotsy Namehana</p>
      <div className=" flex">
        <Skull className=" text-red-600" />
        <AlertTriangleIcon className="text-yellow-500" />
        <ShieldCheckIcon className="text-green-500" />
      </div>
    </div>
  );
};
