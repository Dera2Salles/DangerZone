import { Quartier } from './Quartier';
import type { DangerEntity } from './danger/danger.entity';
import Description from './Description';

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
  return (
    <div className=" bg-zinc-100 h-screen overflow-x-hidden">
      <div className="flex flex-col pt-10">
        <Description />
        {fakeData.map((item) => (
          <Quartier item={item} />
        ))}
      </div>
    </div>
  );
};
export default App;
