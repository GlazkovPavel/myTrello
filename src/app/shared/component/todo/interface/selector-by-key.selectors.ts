import { Selector } from '@ngrx/store/src/models';

export function selectorByKey<T>(key: string): Selector<unknown, T> {
  return (state: unknown): T => {
    if (state !== null && state instanceof Object) {
      // tslint:disable-next-line:no-any
      return (state as any)[key] as T;
    }

    throw new Error(`not found reducer ${key}`);
  };
}
