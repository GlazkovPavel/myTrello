export interface IModelWithStateInterface<T> {
  state: 'error' | 'ready' | 'pending';
  error?: unknown;
  data?: T;
}
