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
  
  const [levels,setLevels] = useState<Level[]>([
    { id: "dangerLevel", icon:<AlertTriangleIcon/>, count: 0},
    { id: "warninglevel", icon:<ShieldCheckIcon/>, count: 0},
    { id: "safeNumber", icon:<Skull/>, count: 0}
  ])
  const handleClick = (id:string) => {
    setLevels(prev => prev.map(level => level.id === id ? {...level, count: level.count + 1} : level));
  };
  return (
    <div className='flex flex-col gap-5 h-screen w-screen justify-center items-center'>
        {quartier.map((quartier ,key ) =>(<div className='flex gap-5 flex-col border-4 border-gray-600 rounded-2xl m-2 p-4' key={key}>
          <h2 className='font-semibold text-3xl '>{quartier.name}</h2>
          <div className="flex gap-2 ">
          {levels.map((level ,key ) =>(<div onClick={()=>handleClick(level.id)} id={level.id} className='flex cursor-pointer ' key={key}>{level.icon}: <p className='text-black'>{level.count}</p></div>))}
          </div>
        </div>))}
    </div>
  );
};
