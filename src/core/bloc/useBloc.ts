import { useEffect, useMemo, useState } from 'react';
import type { Bloc } from './bloc';

/**
 * Hook to use a BLoC in a React component
 */
export function useBloc<E, S>(createBloc: () => Bloc<E, S>): {
  state: S;
  add: (event: E) => void;
} {
  // Memoize the BLoC instance to prevent recreation on every render
  const bloc = useMemo(createBloc, []);

  const [state, setState] = useState<S>(bloc.state);

  useEffect(() => {
    const unsubscribe = bloc.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      unsubscribe();
      bloc.dispose();
    };
  }, [bloc]);

  const add = (event: E) => {
    bloc.onEvent(event);
  };

  return { state, add };
}
