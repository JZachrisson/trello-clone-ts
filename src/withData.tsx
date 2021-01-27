import React, {
  PropsWithChildren,
  ComponentType,
  useState,
  useEffect,
} from 'react';
import { load } from './api';
import { AppState } from './AppStateContext';

export const withData = (
  WrappedComponent: ComponentType<PropsWithChildren<{ initialState: AppState }>>
) => {
  return ({ children }: PropsWithChildren<{}>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: undefined,
    });

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load();
          setInitialState(data);
        } catch (e) {
          setError(e);
        }
        setIsLoading(false);
      };
      fetchInitialState();
    }, []);

    if (isLoading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return (
      <WrappedComponent initialState={initialState}>
        {children}
      </WrappedComponent>
    );
  };
};
