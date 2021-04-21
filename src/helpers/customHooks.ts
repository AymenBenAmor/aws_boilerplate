import * as React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
// eslint-disable-next-line import/no-extraneous-dependencies
import Observable from 'zen-observable';

import { MessagesByChatRoomQuery } from '../API';

function useSafeDispatch<T>(dispatch: React.Dispatch<FetchingActions<T>>) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    val => {
      if (mounted.current) {
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
  | { status: PossibleActionType.LOADING; data: null; error: null }
  | { status: PossibleActionType.SUCCESS; data: T; error: null }
  | { status: PossibleActionType.ERROR; data: null; error: string }
  | { status: PossibleActionType.IDLE; data: null; error: null };

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
          error: null,
        };
      case PossibleActionType.LOADING:
        return {
          status: PossibleActionType.LOADING,
          data: null,
          error: null,
        };
      case PossibleActionType.SUCCESS:
        return {
          status: PossibleActionType.SUCCESS,
          data: action.payload,
          error: null,
        };
      case PossibleActionType.ERROR:
        return {
          status: PossibleActionType.ERROR,
          error: action.payload,
          data: null,
        };
      default:
        throw new Error('This should not happen');
    }
  }
  return asyncReducer;
}

export function useAsync<StateType>(): {
  data: StateType | null;
  status: PossibleActionType;
  run: (promise: Promise<StateType>) => Promise<StateType>;
  errorMessage: string | null;
} {
  const reducer = React.useCallback(createAsyncReducer<StateType>(), []);
  const [state, unsafeDispatch] = React.useReducer(reducer, {
    status: PossibleActionType.IDLE,
    data: null,
    error: null,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);
  const { data, status, error: errorMessage } = state;
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
    errorMessage,
  } as const;
}

type SubscriptionParams = {
  /* eslint-disable @typescript-eslint/no-explicit-any  */
  query: any;
  variables: any;
  key: string;
};

export function useListSubscription<ItemType>(
  queryConfig: SubscriptionParams,
  subscriptionConfig: SubscriptionParams,
): { data: ItemType[]; status: PossibleActionType } {
  const [data, setData] = React.useState<ItemType[]>([]);

  const stringifiedQueryConfig = JSON.stringify(queryConfig);
  const { run, status } = useAsync<any>();
  React.useEffect(() => {
    run(
      API.graphql(
        graphqlOperation(queryConfig.query, {
          ...queryConfig.variables,
        }),
      ) as Promise<GraphQLResult<MessagesByChatRoomQuery>>,
    ).then(result => {
      if (result?.data?.[queryConfig.key]?.items) {
        setData(result?.data[queryConfig.key].items as ItemType[]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedQueryConfig]);

  const stringifiedConfig = JSON.stringify(subscriptionConfig);
  React.useEffect(() => {
    let unsubscribe;
    const { query, key, variables } = subscriptionConfig;
    const observable = API.graphql(
      graphqlOperation(query, {
        variables,
      }),
    );
    if (observable instanceof Observable) {
      const sub = observable.subscribe({
        next: payload => {
          try {
            const {
              value: {
                data: { [key]: item },
              },
            }: {
              value: { data: { [key: string]: ItemType } };
            } = payload;

            setData(latestData => [...latestData, item]);
          } catch (error) {
            console.error(
              `${error.message} - Check the key property: the current value is ${key}`,
            );
          }
        },
      });
      unsubscribe = () => {
        sub.unsubscribe();
      };
    }
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringifiedConfig]);

  return { data, status };
}
