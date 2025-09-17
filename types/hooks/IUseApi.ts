export interface IUseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface IUseApiReturn<T> extends IUseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}
