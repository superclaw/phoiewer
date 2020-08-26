import { Dispatch as TDispatch } from "redux";

export type TData = {
    failed?: boolean;
    message?: string;
    [n: string]: any;
};

export type TState<T> = {
  readonly [n: string]: {
    readonly [n in keyof T]: T[n];
  };
};

export type TReducerFunc<T> = (state: T, ...params: any[]) => T;

export type TActionReturns = {
  type: string;
  [n: string]: string | number | boolean | object | any[];
};

export type TAction = (...params: any[]) => TActionReturns;

export type TAsyncAction = (...params: any[]) => (dispatch: TDispatch<any>) => Promise<void>;
