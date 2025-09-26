import { AlertTriangleIcon, ShieldCheckIcon, Skull } from 'lucide-react';
import { useState, type ReactNode } from 'react';

interface Quartier {
  name: string;
};
type Level ={
  id: string,
  icon: ReactNode;
  count: number,
}


export const Quartier = () => {
  const quartier: Quartier[] =  [
    {name: "Sabotsy Namehana"} ,
    {name: "Sabotsy Namehana" },
    {name: "Sabotsy Namehana" },
    {name: "Sabotsy Namehana" },
  ]
  
  const level : Level[]=[
    { id: "dangerLevel", icon:<AlertTriangleIcon/>, count: 0},
    { id: "warninglevel", icon:<ShieldCheckIcon/>, count: 0},
    { id: "safeNumber", icon:<Skull/>, count: 0}
  ]
  const [count, setCount]= useState<number>(0);
  const handleClick = () => {
    setCount(count+1);
  };
  return (
    <div className='flex flex-col gap-5 h-screen w-screen justify-center items-center'>
        {quartier.map((quartier ,key ) =>(<div className='flex gap-5 flex-col border-4 border-gray-600 rounded-2xl m-2 p-4' key={key}>
          <h2 className='font-semibold text-3xl '>{quartier.name}</h2>
          <div className="flex gap-2 " onClick={handleClick}>
          {level.map((level ,key ) =>(<div id={level.id} className='flex cursor-pointer ' key={key}>{level.icon}: <p className='text-black'>{count}</p></div>))}
          </div>
        </div>))}
    </div>
  );
};
