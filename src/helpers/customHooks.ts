import * as React from 'react';

function useSafeDispatch<T>(dispatch: React.Dispatch<FetchingActions<T>>) {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    val => {
      if (mounted) {
        dispatch(val);
      }
    },
    [dispatch],
  );
}

export enum PossibleActionType {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

type FetchingActions<T> =
  | { type: PossibleActionType.LOADING }
  | { type: PossibleActionType.SUCCESS; payload: T }
  | { type: PossibleActionType.ERROR; payload: string }
  | { type: PossibleActionType.IDLE };

type FetchingStateType<T> =
  | { status: PossibleActionType.LOADING; data: null }
  | { status: PossibleActionType.SUCCESS; data: T }
  | { status: PossibleActionType.ERROR; data: string }
  | { status: PossibleActionType.IDLE; data: null };

function createAsyncReducer<T>() {
  function asyncReducer(
    state: FetchingStateType<T>,
    action: FetchingActions<T>,
  ): FetchingStateType<T> {
    switch (action.type) {
      case PossibleActionType.IDLE:
        return {
          status: PossibleActionType.IDLE,
          data: null,
        };
      case PossibleActionType.LOADING:
        return {
          status: PossibleActionType.LOADING,
          data: null,
        };
      case PossibleActionType.SUCCESS:
        return {
          status: PossibleActionType.SUCCESS,
          data: action.payload,
        };
      case PossibleActionType.ERROR:
        return {
          status: PossibleActionType.ERROR,
          data: action.payload,
        };
      default:
        throw new Error('This should not happen');
    }
  }
  return asyncReducer;
}

export function useAsync<StateType>(): {
  data: StateType | null | string;
  status: PossibleActionType;
  run: (promise: Promise<StateType>) => Promise<string | StateType>;
} {
  const reducer = React.useCallback(createAsyncReducer<StateType>(), []);
  const [state, unsafeDispatch] = React.useReducer(reducer, {
    status: PossibleActionType.IDLE,
    data: null,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);
  const { data, status } = state;
  const run = React.useCallback(
    promise => {
      dispatch({ type: PossibleActionType.LOADING });
      return promise.then(
        (response: StateType) => {
          dispatch({ type: PossibleActionType.SUCCESS, payload: response });
          return Promise.resolve(response);
        },
        (error: Error) => {
          dispatch({ type: PossibleActionType.ERROR });
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject(error);
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  return {
    status,
    data,
    run,
  } as const;
}
