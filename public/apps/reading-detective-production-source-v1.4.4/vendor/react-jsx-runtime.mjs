import React, { __wrapType } from "./react-compat.mjs";

export function Fragment({ children }) {
  const values = Array.isArray(children) ? children : [children];
  return React.createElement("span", { style: { display: "contents" } }, ...values);
}

export function jsx(type, props, key) {
  const next = key === undefined ? props : { ...props, key };
  return React.createElement(__wrapType(type), next);
}

export const jsxs = jsx;
