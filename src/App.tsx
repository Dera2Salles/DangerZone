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
];

const App = () => {
  return (
    <div className=" bg-zinc-100 h-full overflow-x-hidden">
      <Description />
      {fakeData.map((item) => (
        <Quartier item={item} />
      ))}
    </div>
  );
};
export default App;
