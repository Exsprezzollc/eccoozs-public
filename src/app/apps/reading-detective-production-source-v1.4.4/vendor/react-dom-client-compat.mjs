import { __setRerender } from "./react-compat.mjs";
const ReactDOM = globalThis.ReactDOM;
if (!ReactDOM) throw new Error("Reading Detective QA runtime: ReactDOM base runtime missing");

export function createRoot(container) {
  let node = null;
  let scheduled = false;
  const renderNow = () => {
    scheduled = false;
    ReactDOM.render(globalThis.React?.cloneElement ? globalThis.React.cloneElement(node) : node, container);
  };
  __setRerender(() => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(renderNow);
  });
  return {
    render(nextNode) { node = nextNode; renderNow(); },
    unmount() { ReactDOM.unmountComponentAtNode(container); },
  };
}

export default { createRoot };
