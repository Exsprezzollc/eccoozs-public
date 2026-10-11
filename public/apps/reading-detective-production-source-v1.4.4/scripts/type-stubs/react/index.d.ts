declare module "react" {
  export type CSSProperties = Record<string, string | number | undefined>;
  export type ChangeEvent<T = any> = { target: T };
  export type DragEvent<T = any> = {
    currentTarget: T;
    dataTransfer: { setData(type: string, data: string): void; getData(type: string): string };
    preventDefault(): void;
  };
  export type SetStateAction<S> = S | ((prevState: S) => S);
  export type Dispatch<A> = (value: A) => void;
  export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useRef<T = undefined>(initialValue?: T): { current: T | undefined };
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export const StrictMode: any;
  export function useReducer<R extends (state: any, action: any) => any>(reducer: R, initialState: Parameters<R>[0]): [Parameters<R>[0], Dispatch<Parameters<R>[1]>];
}

declare namespace JSX {
  interface IntrinsicElements { [elemName: string]: any }
}
