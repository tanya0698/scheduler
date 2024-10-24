import{r as a,R as v,c as Je,w as Te}from"./index-6d5aa60a.js";import{t as se,a as N,d as Ze,F as et,o as b,l as I,e as je,V as R,y as D,f as re,u as F,c as ae,L as Q,h as Se,s as Pe,X as x,S as U,N as tt,T as nt,g as xe,I as X,j as Fe,b as rt,w as H,i as ot}from"./keyboard-af9e5da8.js";function oe(){let e=[],t=[],n={enqueue(r){t.push(r)},addEventListener(r,o,i,l){return r.addEventListener(o,i,l),n.add(()=>r.removeEventListener(o,i,l))},requestAnimationFrame(...r){let o=requestAnimationFrame(...r);return n.add(()=>cancelAnimationFrame(o))},nextFrame(...r){return n.requestAnimationFrame(()=>n.requestAnimationFrame(...r))},setTimeout(...r){let o=setTimeout(...r);return n.add(()=>clearTimeout(o))},microTask(...r){let o={current:!0};return se(()=>{o.current&&r[0]()}),n.add(()=>{o.current=!1})},add(r){return e.push(r),()=>{let o=e.indexOf(r);if(o>=0){let[i]=e.splice(o,1);i()}}},dispose(){for(let r of e.splice(0))r()},async workQueue(){for(let r of t.splice(0))await r()},style(r,o,i){let l=r.style.getPropertyValue(o);return Object.assign(r.style,{[o]:i}),this.add(()=>{Object.assign(r.style,{[o]:l})})}};return n}function Oe(){let[e]=a.useState(oe);return a.useEffect(()=>()=>e.dispose(),[e]),e}function be(e,t,n){let r=N(t);a.useEffect(()=>{function o(i){r.current(i)}return document.addEventListener(e,o,n),()=>document.removeEventListener(e,o,n)},[e,n])}function lt(e,t,n=!0){let r=a.useRef(!1);a.useEffect(()=>{requestAnimationFrame(()=>{r.current=n})},[n]);function o(l,u){if(!r.current||l.defaultPrevented)return;let s=function d(h){return typeof h=="function"?d(h()):Array.isArray(h)||h instanceof Set?h:[h]}(e),c=u(l);if(c!==null&&c.getRootNode().contains(c)){for(let d of s){if(d===null)continue;let h=d instanceof HTMLElement?d:d.current;if(h!=null&&h.contains(c)||l.composed&&l.composedPath().includes(h))return}return!Ze(c,et.Loose)&&c.tabIndex!==-1&&l.preventDefault(),t(l,c)}}let i=a.useRef(null);be("mousedown",l=>{var u,s;r.current&&(i.current=((s=(u=l.composedPath)==null?void 0:u.call(l))==null?void 0:s[0])||l.target)},!0),be("click",l=>{!i.current||(o(l,()=>i.current),i.current=null)},!0),be("blur",l=>o(l,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function it(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(t==null?void 0:t.getAttribute("disabled"))==="";return r&&at(n)?!1:r}function at(e){if(!e)return!1;let t=e.previousElementSibling;for(;t!==null;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}let ke=a.createContext(null);ke.displayName="OpenClosedContext";var P=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(P||{});function Ae(){return a.useContext(ke)}function ut({value:e,children:t}){return v.createElement(ke.Provider,{value:e},t)}function Ve(e,t){let n=a.useRef([]),r=b(e);a.useEffect(()=>{let o=[...n.current];for(let[i,l]of t.entries())if(n.current[i]!==l){let u=r(t,o);return n.current=t,u}},[r,...t])}function st(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function ct(e,t,n){let r=N(t);a.useEffect(()=>{function o(i){r.current(i)}return window.addEventListener(e,o,n),()=>window.removeEventListener(e,o,n)},[e,n])}var ne=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(ne||{});function dt(){let e=a.useRef(0);return ct("keydown",t=>{t.key==="Tab"&&(e.current=t.shiftKey?1:0)},!0),e}function ce(){let e=a.useRef(!1);return I(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function de(...e){return a.useMemo(()=>je(...e),[...e])}function Me(e,t,n,r){let o=N(n);a.useEffect(()=>{e=e??window;function i(l){o.current(l)}return e.addEventListener(t,i,r),()=>e.removeEventListener(t,i,r)},[e,t,r])}let ft="div";var qe=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(qe||{});let te=Object.assign(R(function(e,t){let n=a.useRef(null),r=D(n,t),{initialFocus:o,containers:i,features:l=30,...u}=e;re()||(l=1);let s=de(n);pt({ownerDocument:s},Boolean(l&16));let c=mt({ownerDocument:s,container:n,initialFocus:o},Boolean(l&2));vt({ownerDocument:s,container:n,containers:i,previousActiveElement:c},Boolean(l&8));let d=dt(),h=b(g=>{let p=n.current;p&&(E=>E())(()=>{F(d.current,{[ne.Forwards]:()=>{ae(p,Q.First,{skipElements:[g.relatedTarget]})},[ne.Backwards]:()=>{ae(p,Q.Last,{skipElements:[g.relatedTarget]})}})})}),$=Oe(),m=a.useRef(!1),f={ref:r,onKeyDown(g){g.key=="Tab"&&(m.current=!0,$.requestAnimationFrame(()=>{m.current=!1}))},onBlur(g){let p=new Set(i==null?void 0:i.current);p.add(n);let E=g.relatedTarget;E instanceof HTMLElement&&E.dataset.headlessuiFocusGuard!=="true"&&(Ue(p,E)||(m.current?ae(n.current,F(d.current,{[ne.Forwards]:()=>Q.Next,[ne.Backwards]:()=>Q.Previous})|Q.WrapAround,{relativeTo:g.target}):g.target instanceof HTMLElement&&U(g.target)))}};return v.createElement(v.Fragment,null,Boolean(l&4)&&v.createElement(Se,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:h,features:Pe.Focusable}),x({ourProps:f,theirProps:u,defaultTag:ft,name:"FocusTrap"}),Boolean(l&4)&&v.createElement(Se,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:h,features:Pe.Focusable}))}),{features:qe});function pt({ownerDocument:e},t){let n=a.useRef(null);Me(e==null?void 0:e.defaultView,"focusout",o=>{!t||n.current||(n.current=o.target)},!0),Ve(()=>{t||((e==null?void 0:e.activeElement)===(e==null?void 0:e.body)&&U(n.current),n.current=null)},[t]);let r=a.useRef(!1);a.useEffect(()=>(r.current=!1,()=>{r.current=!0,se(()=>{!r.current||(U(n.current),n.current=null)})}),[])}function mt({ownerDocument:e,container:t,initialFocus:n},r){let o=a.useRef(null),i=ce();return Ve(()=>{if(!r)return;let l=t.current;!l||se(()=>{if(!i.current)return;let u=e==null?void 0:e.activeElement;if(n!=null&&n.current){if((n==null?void 0:n.current)===u){o.current=u;return}}else if(l.contains(u)){o.current=u;return}n!=null&&n.current?U(n.current):ae(l,Q.First)===tt.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),o.current=e==null?void 0:e.activeElement})},[r]),o}function vt({ownerDocument:e,container:t,containers:n,previousActiveElement:r},o){let i=ce();Me(e==null?void 0:e.defaultView,"focus",l=>{if(!o||!i.current)return;let u=new Set(n==null?void 0:n.current);u.add(t);let s=r.current;if(!s)return;let c=l.target;c&&c instanceof HTMLElement?Ue(u,c)?(r.current=c,U(c)):(l.preventDefault(),l.stopPropagation(),U(s)):U(r.current)},!0)}function Ue(e,t){var n;for(let r of e)if((n=r.current)!=null&&n.contains(t))return!0;return!1}let K=new Set,M=new Map;function Ne(e){e.setAttribute("aria-hidden","true"),e.inert=!0}function Ie(e){let t=M.get(e);!t||(t["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",t["aria-hidden"]),e.inert=t.inert)}function ht(e,t=!0){I(()=>{if(!t||!e.current)return;let n=e.current,r=je(n);if(r){K.add(n);for(let o of M.keys())o.contains(n)&&(Ie(o),M.delete(o));return r.querySelectorAll("body > *").forEach(o=>{if(o instanceof HTMLElement){for(let i of K)if(o.contains(i))return;K.size===1&&(M.set(o,{"aria-hidden":o.getAttribute("aria-hidden"),inert:o.inert}),Ne(o))}}),()=>{if(K.delete(n),K.size>0)r.querySelectorAll("body > *").forEach(o=>{if(o instanceof HTMLElement&&!M.has(o)){for(let i of K)if(o.contains(i))return;M.set(o,{"aria-hidden":o.getAttribute("aria-hidden"),inert:o.inert}),Ne(o)}});else for(let o of M.keys())Ie(o),M.delete(o)}}},[t])}let We=a.createContext(!1);function gt(){return a.useContext(We)}function Ce(e){return v.createElement(We.Provider,{value:e.force},e.children)}function Et(e){let t=gt(),n=a.useContext(Ye),r=de(e),[o,i]=a.useState(()=>{if(!t&&n!==null||xe.isServer)return null;let l=r==null?void 0:r.getElementById("headlessui-portal-root");if(l)return l;if(r===null)return null;let u=r.createElement("div");return u.setAttribute("id","headlessui-portal-root"),r.body.appendChild(u)});return a.useEffect(()=>{o!==null&&(r!=null&&r.body.contains(o)||r==null||r.body.appendChild(o))},[o,r]),a.useEffect(()=>{t||n!==null&&i(n.current)},[n,i,t]),o}let bt=a.Fragment,wt=R(function(e,t){let n=e,r=a.useRef(null),o=D(nt(d=>{r.current=d}),t),i=de(r),l=Et(r),[u]=a.useState(()=>{var d;return xe.isServer?null:(d=i==null?void 0:i.createElement("div"))!=null?d:null}),s=re(),c=a.useRef(!1);return I(()=>{if(c.current=!1,!(!l||!u))return l.contains(u)||(u.setAttribute("data-headlessui-portal",""),l.appendChild(u)),()=>{c.current=!0,se(()=>{var d;!c.current||!l||!u||(u instanceof Node&&l.contains(u)&&l.removeChild(u),l.childNodes.length<=0&&((d=l.parentElement)==null||d.removeChild(l)))})}},[l,u]),s?!l||!u?null:Je.createPortal(x({ourProps:{ref:o},theirProps:n,defaultTag:bt,name:"Portal"}),u):null}),$t=a.Fragment,Ye=a.createContext(null),yt=R(function(e,t){let{target:n,...r}=e,o={ref:D(t)};return v.createElement(Ye.Provider,{value:n},x({ourProps:o,theirProps:r,defaultTag:$t,name:"Popover.Group"}))}),Re=Object.assign(wt,{Group:yt}),_e=a.createContext(null);function Ge(){let e=a.useContext(_e);if(e===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,Ge),t}return e}function Tt(){let[e,t]=a.useState([]);return[e.length>0?e.join(" "):void 0,a.useMemo(()=>function(n){let r=b(i=>(t(l=>[...l,i]),()=>t(l=>{let u=l.slice(),s=u.indexOf(i);return s!==-1&&u.splice(s,1),u}))),o=a.useMemo(()=>({register:r,slot:n.slot,name:n.name,props:n.props}),[r,n.slot,n.name,n.props]);return v.createElement(_e.Provider,{value:o},n.children)},[t])]}let St="p",Pt=R(function(e,t){let n=X(),{id:r=`headlessui-description-${n}`,...o}=e,i=Ge(),l=D(t);I(()=>i.register(r),[r,i.register]);let u={ref:l,...i.props,id:r};return x({ourProps:u,theirProps:o,slot:i.slot||{},defaultTag:St,name:i.name||"Description"})}),He=a.createContext(()=>{});He.displayName="StackContext";var Le=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(Le||{});function Ft(){return a.useContext(He)}function Ct({children:e,onUpdate:t,type:n,element:r,enabled:o}){let i=Ft(),l=b((...u)=>{t==null||t(...u),i(...u)});return I(()=>{let u=o===void 0||o===!0;return u&&l(0,n,r),()=>{u&&l(1,n,r)}},[l,n,r,o]),v.createElement(He.Provider,{value:l},e)}function Rt(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}const Lt=typeof Object.is=="function"?Object.is:Rt,{useState:Dt,useEffect:xt,useLayoutEffect:Ot,useDebugValue:kt}=Te;function At(e,t,n){const r=t(),[{inst:o},i]=Dt({inst:{value:r,getSnapshot:t}});return Ot(()=>{o.value=r,o.getSnapshot=t,we(o)&&i({inst:o})},[e,r,t]),xt(()=>(we(o)&&i({inst:o}),e(()=>{we(o)&&i({inst:o})})),[e]),kt(r),r}function we(e){const t=e.getSnapshot,n=e.value;try{const r=t();return!Lt(n,r)}catch{return!0}}function Mt(e,t,n){return t()}const Ht=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Nt=!Ht,It=Nt?Mt:At,Bt="useSyncExternalStore"in Te?(e=>e.useSyncExternalStore)(Te):It;function jt(e){return Bt(e.subscribe,e.getSnapshot,e.getSnapshot)}function Vt(e,t){let n=e(),r=new Set;return{getSnapshot(){return n},subscribe(o){return r.add(o),()=>r.delete(o)},dispatch(o,...i){let l=t[o].call(n,...i);l&&(n=l,r.forEach(u=>u()))}}}function qt(){let e;return{before({doc:t}){var n;let r=t.documentElement;e=((n=t.defaultView)!=null?n:window).innerWidth-r.clientWidth},after({doc:t,d:n}){let r=t.documentElement,o=r.clientWidth-r.offsetWidth,i=e-o;n.style(r,"paddingRight",`${i}px`)}}}function Ut(){if(!st())return{};let e;return{before(){e=window.pageYOffset},after({doc:t,d:n,meta:r}){function o(l){return r.containers.flatMap(u=>u()).some(u=>u.contains(l))}n.style(t.body,"marginTop",`-${e}px`),window.scrollTo(0,0);let i=null;n.addEventListener(t,"click",l=>{if(l.target instanceof HTMLElement)try{let u=l.target.closest("a");if(!u)return;let{hash:s}=new URL(u.href),c=t.querySelector(s);c&&!o(c)&&(i=c)}catch{}},!0),n.addEventListener(t,"touchmove",l=>{l.target instanceof HTMLElement&&!o(l.target)&&l.preventDefault()},{passive:!1}),n.add(()=>{window.scrollTo(0,window.pageYOffset+e),i&&i.isConnected&&(i.scrollIntoView({block:"nearest"}),i=null)})}}}function Wt(){return{before({doc:e,d:t}){t.style(e.documentElement,"overflow","hidden")}}}function Yt(e){let t={};for(let n of e)Object.assign(t,n(t));return t}let q=Vt(()=>new Map,{PUSH(e,t){var n;let r=(n=this.get(e))!=null?n:{doc:e,count:0,d:oe(),meta:new Set};return r.count++,r.meta.add(t),this.set(e,r),this},POP(e,t){let n=this.get(e);return n&&(n.count--,n.meta.delete(t)),this},SCROLL_PREVENT({doc:e,d:t,meta:n}){let r={doc:e,d:t,meta:Yt(n)},o=[Ut(),qt(),Wt()];o.forEach(({before:i})=>i==null?void 0:i(r)),o.forEach(({after:i})=>i==null?void 0:i(r))},SCROLL_ALLOW({d:e}){e.dispose()},TEARDOWN({doc:e}){this.delete(e)}});q.subscribe(()=>{let e=q.getSnapshot(),t=new Map;for(let[n]of e)t.set(n,n.documentElement.style.overflow);for(let n of e.values()){let r=t.get(n.doc)==="hidden",o=n.count!==0;(o&&!r||!o&&r)&&q.dispatch(n.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",n),n.count===0&&q.dispatch("TEARDOWN",n)}});function _t(e,t,n){let r=jt(q),o=e?r.get(e):void 0,i=o?o.count>0:!1;return I(()=>{if(!(!e||!t))return q.dispatch("PUSH",e,n),()=>q.dispatch("POP",e,n)},[t,e]),i}var Gt=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Gt||{}),Kt=(e=>(e[e.SetTitleId=0]="SetTitleId",e))(Kt||{});let Qt={[0](e,t){return e.titleId===t.id?e:{...e,titleId:t.id}}},ue=a.createContext(null);ue.displayName="DialogContext";function le(e){let t=a.useContext(ue);if(t===null){let n=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,le),n}return t}function Xt(e,t,n=()=>[document.body]){_t(e,t,r=>{var o;return{containers:[...(o=r.containers)!=null?o:[],n]}})}function zt(e,t){return F(t.type,Qt,e,t)}let Jt="div",Zt=Fe.RenderStrategy|Fe.Static,en=R(function(e,t){let n=X(),{id:r=`headlessui-dialog-${n}`,open:o,onClose:i,initialFocus:l,__demoMode:u=!1,...s}=e,[c,d]=a.useState(0),h=Ae();o===void 0&&h!==null&&(o=(h&P.Open)===P.Open);let $=a.useRef(new Set),m=a.useRef(null),f=D(m,t),g=a.useRef(null),p=de(m),E=e.hasOwnProperty("open")||h!==null,C=e.hasOwnProperty("onClose");if(!E&&!C)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!E)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!C)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(typeof o!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${o}`);if(typeof i!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${i}`);let y=o?0:1,[w,z]=a.useReducer(zt,{titleId:null,descriptionId:null,panelRef:a.createRef()}),O=b(()=>i(!1)),B=b(T=>z({type:0,id:T})),k=re()?u?!1:y===0:!1,A=c>1,J=a.useContext(ue)!==null,W=A?"parent":"leaf",Y=h!==null?(h&P.Closing)===P.Closing:!1,Z=(()=>!A||Y?!1:k)();ht(m,Z);let ie=b(()=>{var T,G;return[...Array.from((T=p==null?void 0:p.querySelectorAll("html > *, body > *, [data-headlessui-portal]"))!=null?T:[]).filter(S=>!(S===document.body||S===document.head||!(S instanceof HTMLElement)||S.contains(g.current)||w.panelRef.current&&S.contains(w.panelRef.current))),(G=w.panelRef.current)!=null?G:m.current]}),j=(()=>!(!k||A))();lt(()=>ie(),O,j);let ve=(()=>!(A||y!==0))();Me(p==null?void 0:p.defaultView,"keydown",T=>{!ve||T.defaultPrevented||T.key===rt.Escape&&(T.preventDefault(),T.stopPropagation(),O())});let he=(()=>!(Y||y!==0||J))();Xt(p,he,ie),a.useEffect(()=>{if(y!==0||!m.current)return;let T=new IntersectionObserver(G=>{for(let S of G)S.boundingClientRect.x===0&&S.boundingClientRect.y===0&&S.boundingClientRect.width===0&&S.boundingClientRect.height===0&&O()});return T.observe(m.current),()=>T.disconnect()},[y,m,O]);let[_,ee]=Tt(),ge=a.useMemo(()=>[{dialogState:y,close:O,setTitleId:B},w],[y,w,O,B]),L=a.useMemo(()=>({open:y===0}),[y]),ze={ref:f,id:r,role:"dialog","aria-modal":y===0?!0:void 0,"aria-labelledby":w.titleId,"aria-describedby":_};return v.createElement(Ct,{type:"Dialog",enabled:y===0,element:m,onUpdate:b((T,G,S)=>{G==="Dialog"&&F(T,{[Le.Add](){$.current.add(S),d(Ee=>Ee+1)},[Le.Remove](){$.current.add(S),d(Ee=>Ee-1)}})})},v.createElement(Ce,{force:!0},v.createElement(Re,null,v.createElement(ue.Provider,{value:ge},v.createElement(Re.Group,{target:m},v.createElement(Ce,{force:!1},v.createElement(ee,{slot:L,name:"Dialog.Description"},v.createElement(te,{initialFocus:l,containers:$,features:k?F(W,{parent:te.features.RestoreFocus,leaf:te.features.All&~te.features.FocusLock}):te.features.None},x({ourProps:ze,theirProps:s,slot:L,defaultTag:Jt,features:Zt,visible:y===0,name:"Dialog"})))))))),v.createElement(Se,{features:Pe.Hidden,ref:g}))}),tn="div",nn=R(function(e,t){let n=X(),{id:r=`headlessui-dialog-overlay-${n}`,...o}=e,[{dialogState:i,close:l}]=le("Dialog.Overlay"),u=D(t),s=b(d=>{if(d.target===d.currentTarget){if(it(d.currentTarget))return d.preventDefault();d.preventDefault(),d.stopPropagation(),l()}}),c=a.useMemo(()=>({open:i===0}),[i]);return x({ourProps:{ref:u,id:r,"aria-hidden":!0,onClick:s},theirProps:o,slot:c,defaultTag:tn,name:"Dialog.Overlay"})}),rn="div",on=R(function(e,t){let n=X(),{id:r=`headlessui-dialog-backdrop-${n}`,...o}=e,[{dialogState:i},l]=le("Dialog.Backdrop"),u=D(t);a.useEffect(()=>{if(l.panelRef.current===null)throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.")},[l.panelRef]);let s=a.useMemo(()=>({open:i===0}),[i]);return v.createElement(Ce,{force:!0},v.createElement(Re,null,x({ourProps:{ref:u,id:r,"aria-hidden":!0},theirProps:o,slot:s,defaultTag:rn,name:"Dialog.Backdrop"})))}),ln="div",an=R(function(e,t){let n=X(),{id:r=`headlessui-dialog-panel-${n}`,...o}=e,[{dialogState:i},l]=le("Dialog.Panel"),u=D(t,l.panelRef),s=a.useMemo(()=>({open:i===0}),[i]),c=b(d=>{d.stopPropagation()});return x({ourProps:{ref:u,id:r,onClick:c},theirProps:o,slot:s,defaultTag:ln,name:"Dialog.Panel"})}),un="h2",sn=R(function(e,t){let n=X(),{id:r=`headlessui-dialog-title-${n}`,...o}=e,[{dialogState:i,setTitleId:l}]=le("Dialog.Title"),u=D(t);a.useEffect(()=>(l(r),()=>l(null)),[r,l]);let s=a.useMemo(()=>({open:i===0}),[i]);return x({ourProps:{ref:u,id:r},theirProps:o,slot:s,defaultTag:un,name:"Dialog.Title"})}),Pn=Object.assign(en,{Backdrop:on,Panel:an,Overlay:nn,Title:sn,Description:Pt});function cn(e=0){let[t,n]=a.useState(e),r=a.useCallback(u=>n(s=>s|u),[t]),o=a.useCallback(u=>Boolean(t&u),[t]),i=a.useCallback(u=>n(s=>s&~u),[n]),l=a.useCallback(u=>n(s=>s^u),[n]);return{flags:t,addFlag:r,hasFlag:o,removeFlag:i,toggleFlag:l}}function dn(e){let t={called:!1};return(...n)=>{if(!t.called)return t.called=!0,e(...n)}}function $e(e,...t){e&&t.length>0&&e.classList.add(...t)}function ye(e,...t){e&&t.length>0&&e.classList.remove(...t)}function fn(e,t){let n=oe();if(!e)return n.dispose;let{transitionDuration:r,transitionDelay:o}=getComputedStyle(e),[i,l]=[r,o].map(u=>{let[s=0]=u.split(",").filter(Boolean).map(c=>c.includes("ms")?parseFloat(c):parseFloat(c)*1e3).sort((c,d)=>d-c);return s});if(i+l!==0){let u=n.addEventListener(e,"transitionend",s=>{s.target===s.currentTarget&&(t(),u())})}else t();return n.add(()=>t()),n.dispose}function pn(e,t,n,r){let o=n?"enter":"leave",i=oe(),l=r!==void 0?dn(r):()=>{};o==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let u=F(o,{enter:()=>t.enter,leave:()=>t.leave}),s=F(o,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),c=F(o,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return ye(e,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),$e(e,...u,...c),i.nextFrame(()=>{ye(e,...c),$e(e,...s),fn(e,()=>(ye(e,...u),$e(e,...t.entered),l()))}),i.dispose}function mn({container:e,direction:t,classes:n,onStart:r,onStop:o}){let i=ce(),l=Oe(),u=N(t);I(()=>{let s=oe();l.add(s.dispose);let c=e.current;if(c&&u.current!=="idle"&&i.current)return s.dispose(),r.current(u.current),s.add(pn(c,n.current,u.current==="enter",()=>{s.dispose(),o.current(u.current)})),s.dispose},[t])}function V(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let fe=a.createContext(null);fe.displayName="TransitionContext";var vn=(e=>(e.Visible="visible",e.Hidden="hidden",e))(vn||{});function hn(){let e=a.useContext(fe);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function gn(){let e=a.useContext(pe);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let pe=a.createContext(null);pe.displayName="NestingContext";function me(e){return"children"in e?me(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function Ke(e,t){let n=N(e),r=a.useRef([]),o=ce(),i=Oe(),l=b((m,f=H.Hidden)=>{let g=r.current.findIndex(({el:p})=>p===m);g!==-1&&(F(f,{[H.Unmount](){r.current.splice(g,1)},[H.Hidden](){r.current[g].state="hidden"}}),i.microTask(()=>{var p;!me(r)&&o.current&&((p=n.current)==null||p.call(n))}))}),u=b(m=>{let f=r.current.find(({el:g})=>g===m);return f?f.state!=="visible"&&(f.state="visible"):r.current.push({el:m,state:"visible"}),()=>l(m,H.Unmount)}),s=a.useRef([]),c=a.useRef(Promise.resolve()),d=a.useRef({enter:[],leave:[],idle:[]}),h=b((m,f,g)=>{s.current.splice(0),t&&(t.chains.current[f]=t.chains.current[f].filter(([p])=>p!==m)),t==null||t.chains.current[f].push([m,new Promise(p=>{s.current.push(p)})]),t==null||t.chains.current[f].push([m,new Promise(p=>{Promise.all(d.current[f].map(([E,C])=>C)).then(()=>p())})]),f==="enter"?c.current=c.current.then(()=>t==null?void 0:t.wait.current).then(()=>g(f)):g(f)}),$=b((m,f,g)=>{Promise.all(d.current[f].splice(0).map(([p,E])=>E)).then(()=>{var p;(p=s.current.shift())==null||p()}).then(()=>g(f))});return a.useMemo(()=>({children:r,register:u,unregister:l,onStart:h,onStop:$,wait:c,chains:d}),[u,l,r,h,$,d,c])}function En(){}let bn=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function Be(e){var t;let n={};for(let r of bn)n[r]=(t=e[r])!=null?t:En;return n}function wn(e){let t=a.useRef(Be(e));return a.useEffect(()=>{t.current=Be(e)},[e]),t}let $n="div",Qe=Fe.RenderStrategy,Xe=R(function(e,t){let{beforeEnter:n,afterEnter:r,beforeLeave:o,afterLeave:i,enter:l,enterFrom:u,enterTo:s,entered:c,leave:d,leaveFrom:h,leaveTo:$,...m}=e,f=a.useRef(null),g=D(f,t),p=m.unmount?H.Unmount:H.Hidden,{show:E,appear:C,initial:y}=hn(),[w,z]=a.useState(E?"visible":"hidden"),O=gn(),{register:B,unregister:k}=O,A=a.useRef(null);a.useEffect(()=>B(f),[B,f]),a.useEffect(()=>{if(p===H.Hidden&&f.current){if(E&&w!=="visible"){z("visible");return}return F(w,{hidden:()=>k(f),visible:()=>B(f)})}},[w,f,B,k,E,p]);let J=N({enter:V(l),enterFrom:V(u),enterTo:V(s),entered:V(c),leave:V(d),leaveFrom:V(h),leaveTo:V($)}),W=wn({beforeEnter:n,afterEnter:r,beforeLeave:o,afterLeave:i}),Y=re();a.useEffect(()=>{if(Y&&w==="visible"&&f.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[f,w,Y]);let Z=y&&!C,ie=(()=>!Y||Z||A.current===E?"idle":E?"enter":"leave")(),j=cn(0),ve=b(L=>F(L,{enter:()=>{j.addFlag(P.Opening),W.current.beforeEnter()},leave:()=>{j.addFlag(P.Closing),W.current.beforeLeave()},idle:()=>{}})),he=b(L=>F(L,{enter:()=>{j.removeFlag(P.Opening),W.current.afterEnter()},leave:()=>{j.removeFlag(P.Closing),W.current.afterLeave()},idle:()=>{}})),_=Ke(()=>{z("hidden"),k(f)},O);mn({container:f,classes:J,direction:ie,onStart:N(L=>{_.onStart(f,L,ve)}),onStop:N(L=>{_.onStop(f,L,he),L==="leave"&&!me(_)&&(z("hidden"),k(f))})}),a.useEffect(()=>{!Z||(p===H.Hidden?A.current=null:A.current=E)},[E,Z,w]);let ee=m,ge={ref:g};return C&&E&&xe.isServer&&(ee={...ee,className:ot(m.className,...J.current.enter,...J.current.enterFrom)}),v.createElement(pe.Provider,{value:_},v.createElement(ut,{value:F(w,{visible:P.Open,hidden:P.Closed})|j.flags},x({ourProps:ge,theirProps:ee,defaultTag:$n,features:Qe,visible:w==="visible",name:"Transition.Child"})))}),De=R(function(e,t){let{show:n,appear:r=!1,unmount:o,...i}=e,l=a.useRef(null),u=D(l,t);re();let s=Ae();if(n===void 0&&s!==null&&(n=(s&P.Open)===P.Open),![!0,!1].includes(n))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[c,d]=a.useState(n?"visible":"hidden"),h=Ke(()=>{d("hidden")}),[$,m]=a.useState(!0),f=a.useRef([n]);I(()=>{$!==!1&&f.current[f.current.length-1]!==n&&(f.current.push(n),m(!1))},[f,n]);let g=a.useMemo(()=>({show:n,appear:r,initial:$}),[n,r,$]);a.useEffect(()=>{if(n)d("visible");else if(!me(h))d("hidden");else{let E=l.current;if(!E)return;let C=E.getBoundingClientRect();C.x===0&&C.y===0&&C.width===0&&C.height===0&&d("hidden")}},[n,h]);let p={unmount:o};return v.createElement(pe.Provider,{value:h},v.createElement(fe.Provider,{value:g},x({ourProps:{...p,as:a.Fragment,children:v.createElement(Xe,{ref:u,...p,...i})},theirProps:{},defaultTag:a.Fragment,features:Qe,visible:c==="visible",name:"Transition"})))}),yn=R(function(e,t){let n=a.useContext(fe)!==null,r=Ae()!==null;return v.createElement(v.Fragment,null,!n&&r?v.createElement(De,{ref:t,...e}):v.createElement(Xe,{ref:t,...e}))}),Fn=Object.assign(De,{Child:yn,Root:De});export{Fn as Y,Pn as y};
