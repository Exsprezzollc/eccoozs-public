const BaseReact = globalThis.React;
if (!BaseReact) throw new Error("Reading Detective QA runtime: React base runtime missing");

const componentStores = new WeakMap();
const wrapperMap = new WeakMap();
let currentStore = null;
let hookIndex = 0;
let rerender = () => {};

function depsEqual(a, b) {
  if (a === undefined || b === undefined) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) if (!Object.is(a[i], b[i])) return false;
  return true;
}

function storeFor(component) {
  let store = componentStores.get(component);
  if (!store) {
    store = { hooks: [], pendingEffects: [] };
    componentStores.set(component, store);
  }
  return store;
}

export function __setRerender(fn) { rerender = fn; }

export function __wrapType(type) {
  if (typeof type !== "function") return type;
  if (type.__rdCompatWrapped) return type;
  const existing = wrapperMap.get(type);
  if (existing) return existing;
  function Wrapped(props) {
    const previousStore = currentStore;
    const previousIndex = hookIndex;
    const store = storeFor(Wrapped);
    currentStore = store;
    hookIndex = 0;
    let result;
    try { result = type(props); }
    finally {
      currentStore = previousStore;
      hookIndex = previousIndex;
      if (store.pendingEffects.length) {
        const effects = store.pendingEffects.splice(0);
        setTimeout(() => {
          for (const run of effects) {
            try { run(); } catch (error) { console.error(error); }
          }
        }, 0);
      }
    }
    return result;
  }
  Wrapped.__rdCompatWrapped = true;
  Wrapped.displayName = type.displayName || type.name || "ReadingDetectiveComponent";
  wrapperMap.set(type, Wrapped);
  return Wrapped;
}

function activeHook() {
  if (!currentStore) throw new Error("Hook called outside a Reading Detective component");
  const index = hookIndex++;
  return { store: currentStore, index };
}

export function useState(initialValue) {
  const { store, index } = activeHook();
  if (!(index in store.hooks)) {
    store.hooks[index] = typeof initialValue === "function" ? initialValue() : initialValue;
  }
  const setState = (value) => {
    const next = typeof value === "function" ? value(store.hooks[index]) : value;
    if (Object.is(next, store.hooks[index])) return;
    store.hooks[index] = next;
    queueMicrotask(() => rerender());
  };
  return [store.hooks[index], setState];
}

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);
  return [state, (action) => setState((current) => reducer(current, action))];
}

export function useRef(initialValue) {
  const { store, index } = activeHook();
  if (!(index in store.hooks)) store.hooks[index] = { current: initialValue };
  return store.hooks[index];
}

export function useMemo(factory, deps) {
  const { store, index } = activeHook();
  const previous = store.hooks[index];
  if (!previous || !depsEqual(previous.deps, deps)) {
    store.hooks[index] = { value: factory(), deps: deps ? [...deps] : undefined };
  }
  return store.hooks[index].value;
}

export function useEffect(effect, deps) {
  const { store, index } = activeHook();
  const previous = store.hooks[index];
  if (previous && depsEqual(previous.deps, deps)) return;
  store.hooks[index] = { deps: deps ? [...deps] : undefined, cleanup: previous?.cleanup };
  store.pendingEffects.push(() => {
    try { previous?.cleanup?.(); } catch (error) { console.error(error); }
    const cleanup = effect();
    store.hooks[index].cleanup = typeof cleanup === "function" ? cleanup : undefined;
  });
}

export function StrictMode(props) { return props.children ?? null; }

const ReactCompat = Object.assign({}, BaseReact, {
  useState,
  useReducer,
  useRef,
  useMemo,
  useEffect,
  StrictMode,
});

export default ReactCompat;
