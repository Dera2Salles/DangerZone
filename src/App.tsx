import { Quartier } from './Quartier';
import type { DangerEntity } from './danger/danger.entity';
import Description from './Description';
import { useDangerContext } from './useDangerContext';
import { Accueil } from './Accueil';

const fakeData: DangerEntity[] = [
  {
    dangerLevel: {
      number: 43,
      isFingerPrint: true,
    },
    quartierName: 'TSARALALANA',
    safeLevel: {
      number: 43,
      isFingerPrint: false,
    },
    warningLevel: {
      number: 102,
      isFingerPrint: false,
    },
  },
  {
    dangerLevel: {
      number: 53,
      isFingerPrint: false,
    },
    quartierName: 'ITAOSY-UNIS',
    safeLevel: {
      number: 9,
      isFingerPrint: true,
    },
    warningLevel: {
      number: 132,
      isFingerPrint: false,
    },
  },

  {
    dangerLevel: {
      number: 153,
      isFingerPrint: false,
    },
    quartierName: 'ANDAVAMAMBA',
    safeLevel: {
      number: 19,
      isFingerPrint: false,
    },
    warningLevel: {
      number: 12,
      isFingerPrint: true,
    },
  },
];

const App = () => {
  const { list }   = useDangerContext();
  return (
    <div className=" bg-zinc-100 flex-wrap h-screen overflow-x-hidden">
      <div className="flex flex-wrap pt-10 items-center">
        <Accueil />
        <Description />
        <div className='flex flex-col i'>
        <h2 className='font-bold text-2xl text-center pt-10 m-4'>Quartier</h2>
        <div className='flex w-screen items-center justify-center flex-wrap flex-col lg:flex-row'>{fakeData.map((item, key) => (
        <Quartier item={item} key={key} />
        ))}</div>
        </div>
      </div>
    </div>
  );
};
export default App;
