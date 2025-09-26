import { useDanger } from './useDanger';
import { DangerContext } from './useDangerContext';

export const DangerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dangerBloc = useDanger();
  return (
    <DangerContext.Provider value={dangerBloc}>
      {children}
    </DangerContext.Provider>
  );
};
