import{r as u,R as S}from"./index-6d5aa60a.js";import{l as L,h as Y,s as re,V as M,j as H,y as _,a as q,o as R,X as N,I as J,u as F,A as O,N as B,e as ne,b as v,c as A,L as T,t as ae}from"./keyboard-af9e5da8.js";function K(e){var t;if(e.type)return e.type;let r=(t=e.as)!=null?t:"button";if(typeof r=="string"&&r.toLowerCase()==="button")return"button"}function le(e,t){let[r,n]=u.useState(()=>K(e));return L(()=>{n(K(e))},[e.type,e.as]),L(()=>{r||!t.current||t.current instanceof HTMLButtonElement&&!t.current.hasAttribute("type")&&n("button")},[r,t]),r}function se({onFocus:e}){let[t,r]=u.useState(!0);return t?S.createElement(Y,{as:"button",type:"button",features:re.Focusable,onFocus:n=>{n.preventDefault();let a,s=50;function o(){if(s--<=0){a&&cancelAnimationFrame(a);return}if(e()){r(!1),cancelAnimationFrame(a);return}a=requestAnimationFrame(o)}a=requestAnimationFrame(o)}}):null}const Q=u.createContext(null);function ue(){return{groups:new Map,get(e,t){var r;let n=this.groups.get(e);n||(n=new Map,this.groups.set(e,n));let a=(r=n.get(t))!=null?r:0;n.set(t,a+1);let s=Array.from(n.keys()).indexOf(t);function o(){let g=n.get(t);g>1?n.set(t,g-1):n.delete(t)}return[s,o]}}}function oe({children:e}){let t=u.useRef(ue());return u.createElement(Q.Provider,{value:t},e)}function Z(e){let t=u.useContext(Q);if(!t)throw new Error("You must wrap your component in a <StableCollection>");let r=ie(),[n,a]=t.current.get(e,r);return u.useEffect(()=>a,[]),n}function ie(){var e,t,r;let n=(r=(t=(e=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)==null?void 0:e.ReactCurrentOwner)==null?void 0:t.current)!=null?r:null;if(!n)return Symbol();let a=[],s=n;for(;s;)a.push(s.index),s=s.return;return"$."+a.join(".")}var ce=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(ce||{}),de=(e=>(e[e.Less=-1]="Less",e[e.Equal=0]="Equal",e[e.Greater=1]="Greater",e))(de||{}),pe=(e=>(e[e.SetSelectedIndex=0]="SetSelectedIndex",e[e.RegisterTab=1]="RegisterTab",e[e.UnregisterTab=2]="UnregisterTab",e[e.RegisterPanel=3]="RegisterPanel",e[e.UnregisterPanel=4]="UnregisterPanel",e))(pe||{});let fe={[0](e,t){var r;let n=O(e.tabs,c=>c.current),a=O(e.panels,c=>c.current),s=n.filter(c=>{var y;return!((y=c.current)!=null&&y.hasAttribute("disabled"))}),o={...e,tabs:n,panels:a};if(t.index<0||t.index>n.length-1){let c=F(Math.sign(t.index-e.selectedIndex),{[-1]:()=>1,[0]:()=>F(Math.sign(t.index),{[-1]:()=>0,[0]:()=>0,[1]:()=>1}),[1]:()=>0});return s.length===0?o:{...o,selectedIndex:F(c,{[0]:()=>n.indexOf(s[0]),[1]:()=>n.indexOf(s[s.length-1])})}}let g=n.slice(0,t.index),I=[...n.slice(t.index),...g].find(c=>s.includes(c));if(!I)return o;let b=(r=n.indexOf(I))!=null?r:e.selectedIndex;return b===-1&&(b=e.selectedIndex),{...o,selectedIndex:b}},[1](e,t){var r;if(e.tabs.includes(t.tab))return e;let n=e.tabs[e.selectedIndex],a=O([...e.tabs,t.tab],o=>o.current),s=(r=a.indexOf(n))!=null?r:e.selectedIndex;return s===-1&&(s=e.selectedIndex),{...e,tabs:a,selectedIndex:s}},[2](e,t){return{...e,tabs:e.tabs.filter(r=>r!==t.tab)}},[3](e,t){return e.panels.includes(t.panel)?e:{...e,panels:O([...e.panels,t.panel],r=>r.current)}},[4](e,t){return{...e,panels:e.panels.filter(r=>r!==t.panel)}}},j=u.createContext(null);j.displayName="TabsDataContext";function k(e){let t=u.useContext(j);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,k),r}return t}let z=u.createContext(null);z.displayName="TabsActionsContext";function V(e){let t=u.useContext(z);if(t===null){let r=new Error(`<${e} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,V),r}return t}function be(e,t){return F(t.type,fe,e,t)}let xe=u.Fragment,me=M(function(e,t){let{defaultIndex:r=0,vertical:n=!1,manual:a=!1,onChange:s,selectedIndex:o=null,...g}=e;const I=n?"vertical":"horizontal",b=a?"manual":"auto";let c=o!==null,y=_(t),[i,m]=u.useReducer(be,{selectedIndex:o??r,tabs:[],panels:[]}),p=u.useMemo(()=>({selectedIndex:i.selectedIndex}),[i.selectedIndex]),C=q(s||(()=>{})),D=q(i.tabs),f=u.useMemo(()=>({orientation:I,activation:b,...i}),[I,b,i]),x=R(d=>(m({type:1,tab:d}),()=>m({type:2,tab:d}))),P=R(d=>(m({type:3,panel:d}),()=>m({type:4,panel:d}))),$=R(d=>{w.current!==d&&C.current(d),c||m({type:0,index:d})}),w=q(c?e.selectedIndex:i.selectedIndex),W=u.useMemo(()=>({registerTab:x,registerPanel:P,change:$}),[]);L(()=>{m({type:0,index:o??r})},[o]),L(()=>{if(w.current===void 0||i.tabs.length<=0)return;let d=O(i.tabs,E=>E.current);d.some((E,l)=>i.tabs[l]!==E)&&$(d.indexOf(i.tabs[w.current]))});let G={ref:y};return S.createElement(oe,null,S.createElement(z.Provider,{value:W},S.createElement(j.Provider,{value:f},f.tabs.length<=0&&S.createElement(se,{onFocus:()=>{var d,E;for(let l of D.current)if(((d=l.current)==null?void 0:d.tabIndex)===0)return(E=l.current)==null||E.focus(),!0;return!1}}),N({ourProps:G,theirProps:g,slot:p,defaultTag:xe,name:"Tabs"}))))}),ge="div",ve=M(function(e,t){let{orientation:r,selectedIndex:n}=k("Tab.List"),a=_(t);return N({ourProps:{ref:a,role:"tablist","aria-orientation":r},theirProps:e,slot:{selectedIndex:n},defaultTag:ge,name:"Tabs.List"})}),Te="button",Ie=M(function(e,t){var r,n;let a=J(),{id:s=`headlessui-tabs-tab-${a}`,...o}=e,{orientation:g,activation:I,selectedIndex:b,tabs:c,panels:y}=k("Tab"),i=V("Tab"),m=k("Tab"),p=u.useRef(null),C=_(p,t);L(()=>i.registerTab(p),[i,p]);let D=Z("tabs"),f=c.indexOf(p);f===-1&&(f=D);let x=f===b,P=R(l=>{var h;let U=l();if(U===B.Success&&I==="auto"){let ee=(h=ne(p))==null?void 0:h.activeElement,X=m.tabs.findIndex(te=>te.current===ee);X!==-1&&i.change(X)}return U}),$=R(l=>{let h=c.map(U=>U.current).filter(Boolean);if(l.key===v.Space||l.key===v.Enter){l.preventDefault(),l.stopPropagation(),i.change(f);return}switch(l.key){case v.Home:case v.PageUp:return l.preventDefault(),l.stopPropagation(),P(()=>A(h,T.First));case v.End:case v.PageDown:return l.preventDefault(),l.stopPropagation(),P(()=>A(h,T.Last))}if(P(()=>F(g,{vertical(){return l.key===v.ArrowUp?A(h,T.Previous|T.WrapAround):l.key===v.ArrowDown?A(h,T.Next|T.WrapAround):B.Error},horizontal(){return l.key===v.ArrowLeft?A(h,T.Previous|T.WrapAround):l.key===v.ArrowRight?A(h,T.Next|T.WrapAround):B.Error}}))===B.Success)return l.preventDefault()}),w=u.useRef(!1),W=R(()=>{var l;w.current||(w.current=!0,(l=p.current)==null||l.focus(),i.change(f),ae(()=>{w.current=!1}))}),G=R(l=>{l.preventDefault()}),d=u.useMemo(()=>({selected:x}),[x]),E={ref:C,onKeyDown:$,onMouseDown:G,onClick:W,id:s,role:"tab",type:le(e,p),"aria-controls":(n=(r=y[f])==null?void 0:r.current)==null?void 0:n.id,"aria-selected":x,tabIndex:x?0:-1};return N({ourProps:E,theirProps:o,slot:d,defaultTag:Te,name:"Tabs.Tab"})}),he="div",ye=M(function(e,t){let{selectedIndex:r}=k("Tab.Panels"),n=_(t),a=u.useMemo(()=>({selectedIndex:r}),[r]);return N({ourProps:{ref:n},theirProps:e,slot:a,defaultTag:he,name:"Tabs.Panels"})}),Ee="div",Pe=H.RenderStrategy|H.Static,$e=M(function(e,t){var r,n,a,s;let o=J(),{id:g=`headlessui-tabs-panel-${o}`,tabIndex:I=0,...b}=e,{selectedIndex:c,tabs:y,panels:i}=k("Tab.Panel"),m=V("Tab.Panel"),p=u.useRef(null),C=_(p,t);L(()=>m.registerPanel(p),[m,p]);let D=Z("panels"),f=i.indexOf(p);f===-1&&(f=D);let x=f===c,P=u.useMemo(()=>({selected:x}),[x]),$={ref:C,id:g,role:"tabpanel","aria-labelledby":(n=(r=y[f])==null?void 0:r.current)==null?void 0:n.id,tabIndex:x?I:-1};return!x&&((a=b.unmount)==null||a)&&!((s=b.static)!=null&&s)?S.createElement(Y,{as:"span",...$}):N({ourProps:$,theirProps:b,slot:P,defaultTag:Ee,features:Pe,visible:x,name:"Tabs.Panel"})}),Ae=Object.assign(Ie,{Group:me,List:ve,Panels:ye,Panel:$e});export{Ae as X};
