(function (global) {
  if (global.crypto && typeof global.crypto.randomUUID !== 'function') { global.crypto.randomUUID = function(){ return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c==='x'?r:(r&3|8);return v.toString(16);}); }; }
  var BaseReact = global.React;
  var BaseReactDOM = global.ReactDOM;
  if (!BaseReact || !BaseReactDOM) throw new Error('Reading Detective browser QA base React runtime missing');
  var componentStores = new WeakMap();
  var wrapperMap = new WeakMap();
  var currentStore = null;
  var hookIndex = 0;
  var rerender = function () {};
  function depsEqual(a,b){ if(a===undefined||b===undefined||a.length!==b.length)return false; for(var i=0;i<a.length;i++) if(!Object.is(a[i],b[i]))return false; return true; }
  function storeFor(component){ var s=componentStores.get(component); if(!s){s={hooks:[],pendingEffects:[]};componentStores.set(component,s);} return s; }
  function wrapType(type){
    if(typeof type!=='function') return type;
    if(type.__rdCompatWrapped) return type;
    var existing=wrapperMap.get(type); if(existing) return existing;
    function Wrapped(props){
      var prevStore=currentStore, prevIndex=hookIndex, store=storeFor(Wrapped); currentStore=store; hookIndex=0; var result;
      try{ result=type(props); } finally {
        currentStore=prevStore; hookIndex=prevIndex;
        if(store.pendingEffects.length){ var effects=store.pendingEffects.splice(0); setTimeout(function(){effects.forEach(function(run){try{run();}catch(e){console.error(e);}});},0); }
      }
      return result;
    }
    Wrapped.__rdCompatWrapped=true; wrapperMap.set(type,Wrapped); return Wrapped;
  }
  function activeHook(){ if(!currentStore) throw new Error('Hook called outside a Reading Detective component'); return {store:currentStore,index:hookIndex++}; }
  function useState(initial){ var h=activeHook(), store=h.store, index=h.index; if(!(index in store.hooks)) store.hooks[index]=typeof initial==='function'?initial():initial; function setState(value){var next=typeof value==='function'?value(store.hooks[index]):value;if(Object.is(next,store.hooks[index]))return;store.hooks[index]=next;queueMicrotask(rerender);} return [store.hooks[index],setState]; }
  function useReducer(reducer,initial){ var pair=useState(initial); return [pair[0],function(action){pair[1](function(current){return reducer(current,action);});}]; }
  function useRef(initial){ var h=activeHook(), store=h.store, index=h.index; if(!(index in store.hooks)) store.hooks[index]={current:initial}; return store.hooks[index]; }
  function useMemo(factory,deps){ var h=activeHook(), old=h.store.hooks[h.index]; if(!old||!depsEqual(old.deps,deps))h.store.hooks[h.index]={value:factory(),deps:deps?[].slice.call(deps):undefined}; return h.store.hooks[h.index].value; }
  function useEffect(effect,deps){ var h=activeHook(), old=h.store.hooks[h.index]; if(old&&depsEqual(old.deps,deps))return; h.store.hooks[h.index]={deps:deps?[].slice.call(deps):undefined,cleanup:old&&old.cleanup}; h.store.pendingEffects.push(function(){try{if(old&&old.cleanup)old.cleanup();}catch(e){console.error(e);} var cleanup=effect(); h.store.hooks[h.index].cleanup=typeof cleanup==='function'?cleanup:undefined;}); }
  function StrictMode(props){ return props.children || null; }
  var ReactCompat=Object.assign({},BaseReact,{useState:useState,useReducer:useReducer,useRef:useRef,useMemo:useMemo,useEffect:useEffect,StrictMode:StrictMode});
  function Fragment(props){ var values=Array.isArray(props.children)?props.children:[props.children]; return BaseReact.createElement.apply(BaseReact,['span',{style:{display:'contents'}}].concat(values)); }
  function jsx(type,props,key){ var next=key===undefined?props:Object.assign({},props,{key:key}); return BaseReact.createElement(wrapType(type),next); }
  function createRoot(container){ var node=null,scheduled=false; function renderNow(){scheduled=false;try{BaseReactDOM.unmountComponentAtNode(container);}catch(e){} var fresh=node&&BaseReact.cloneElement?BaseReact.cloneElement(node):node;BaseReactDOM.render(fresh,container);} rerender=function(){if(scheduled)return;scheduled=true;queueMicrotask(renderNow);}; return {render:function(next){node=next;renderNow();},unmount:function(){BaseReactDOM.unmountComponentAtNode(container);}}; }
  global.RDReactCompat=ReactCompat;
  global.RDReactJsxRuntime={Fragment:Fragment,jsx:jsx,jsxs:jsx};
  global.RDReactDOMClient={createRoot:createRoot};
})(globalThis);
