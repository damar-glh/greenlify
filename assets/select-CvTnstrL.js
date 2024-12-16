import{c as ht,r as o,j as a,ac as gt,ad as vt,t as xt,ae as Re,V as L,af as St,P as j,E as P,ag as G,ah as Ee,ai as wt,aj as yt,ak as Ct,al as It,am as bt,an as Tt,y as be,ao as Nt,W as Pt,ap as Rt,aq as Et,w as _t,x as Ne,ar as jt,as as Mt,G as z,at as _e,au as At,Y as Ot}from"./index-Bjp6i5Kc.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=ht("FilterX",[["path",{d:"M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055",key:"1fi1da"}],["path",{d:"m22 3-5 5",key:"12jva0"}],["path",{d:"m17 3 5 5",key:"k36vhe"}]]);function Pe(t,[n,e]){return Math.min(e,Math.max(n,t))}var je=o.forwardRef((t,n)=>{const{children:e,...r}=t,s=o.Children.toArray(e),d=s.find(kt);if(d){const l=d.props.children,c=s.map(i=>i===d?o.Children.count(l)>1?o.Children.only(null):o.isValidElement(l)?l.props.children:null:i);return a.jsx(xe,{...r,ref:n,children:o.isValidElement(l)?o.cloneElement(l,void 0,c):null})}return a.jsx(xe,{...r,ref:n,children:e})});je.displayName="Slot";var xe=o.forwardRef((t,n)=>{const{children:e,...r}=t;if(o.isValidElement(e)){const s=Vt(e);return o.cloneElement(e,{...Lt(r,e.props),ref:n?gt(n,s):s})}return o.Children.count(e)>1?o.Children.only(null):null});xe.displayName="SlotClone";var Dt=({children:t})=>a.jsx(a.Fragment,{children:t});function kt(t){return o.isValidElement(t)&&t.type===Dt}function Lt(t,n){const e={...n};for(const r in n){const s=t[r],d=n[r];/^on[A-Z]/.test(r)?s&&d?e[r]=(...c)=>{d(...c),s(...c)}:s&&(e[r]=s):r==="style"?e[r]={...s,...d}:r==="className"&&(e[r]=[s,d].filter(Boolean).join(" "))}return{...t,...e}}function Vt(t){var r,s;let n=(r=Object.getOwnPropertyDescriptor(t.props,"ref"))==null?void 0:r.get,e=n&&"isReactWarning"in n&&n.isReactWarning;return e?t.ref:(n=(s=Object.getOwnPropertyDescriptor(t,"ref"))==null?void 0:s.get,e=n&&"isReactWarning"in n&&n.isReactWarning,e?t.props.ref:t.props.ref||t.ref)}var Bt=[" ","Enter","ArrowUp","ArrowDown"],Ht=[" ","Enter"],se="Select",[ce,de,Wt]=vt(se),[te,So]=xt(se,[Wt,Re]),ue=Re(),[Ft,Y]=te(se),[Ut,Kt]=te(se),Me=t=>{const{__scopeSelect:n,children:e,open:r,defaultOpen:s,onOpenChange:d,value:l,defaultValue:c,onValueChange:i,dir:f,name:v,autoComplete:w,disabled:T,required:N,form:b}=t,u=ue(n),[g,y]=o.useState(null),[p,h]=o.useState(null),[M,A]=o.useState(!1),oe=_t(f),[R=!1,D]=Ne({prop:r,defaultProp:s,onChange:d}),[U,X]=Ne({prop:l,defaultProp:c,onChange:i}),V=o.useRef(null),B=g?b||!!g.closest("form"):!0,[K,H]=o.useState(new Set),W=Array.from(K).map(E=>E.props.value).join(";");return a.jsx(jt,{...u,children:a.jsxs(Ft,{required:N,scope:n,trigger:g,onTriggerChange:y,valueNode:p,onValueNodeChange:h,valueNodeHasChildren:M,onValueNodeHasChildrenChange:A,contentId:be(),value:U,onValueChange:X,open:R,onOpenChange:D,dir:oe,triggerPointerDownPosRef:V,disabled:T,children:[a.jsx(ce.Provider,{scope:n,children:a.jsx(Ut,{scope:t.__scopeSelect,onNativeOptionAdd:o.useCallback(E=>{H(k=>new Set(k).add(E))},[]),onNativeOptionRemove:o.useCallback(E=>{H(k=>{const F=new Set(k);return F.delete(E),F})},[]),children:e})}),B?a.jsxs(nt,{"aria-hidden":!0,required:N,tabIndex:-1,name:v,autoComplete:w,value:U,onChange:E=>X(E.target.value),disabled:T,form:b,children:[U===void 0?a.jsx("option",{value:""}):null,Array.from(K)]},W):null]})})};Me.displayName=se;var Ae="SelectTrigger",Oe=o.forwardRef((t,n)=>{const{__scopeSelect:e,disabled:r=!1,...s}=t,d=ue(e),l=Y(Ae,e),c=l.disabled||r,i=L(n,l.onTriggerChange),f=de(e),v=o.useRef("touch"),[w,T,N]=rt(u=>{const g=f().filter(h=>!h.disabled),y=g.find(h=>h.value===l.value),p=st(g,u,y);p!==void 0&&l.onValueChange(p.value)}),b=u=>{c||(l.onOpenChange(!0),N()),u&&(l.triggerPointerDownPosRef.current={x:Math.round(u.pageX),y:Math.round(u.pageY)})};return a.jsx(St,{asChild:!0,...d,children:a.jsx(j.button,{type:"button",role:"combobox","aria-controls":l.contentId,"aria-expanded":l.open,"aria-required":l.required,"aria-autocomplete":"none",dir:l.dir,"data-state":l.open?"open":"closed",disabled:c,"data-disabled":c?"":void 0,"data-placeholder":ot(l.value)?"":void 0,...s,ref:i,onClick:P(s.onClick,u=>{u.currentTarget.focus(),v.current!=="mouse"&&b(u)}),onPointerDown:P(s.onPointerDown,u=>{v.current=u.pointerType;const g=u.target;g.hasPointerCapture(u.pointerId)&&g.releasePointerCapture(u.pointerId),u.button===0&&u.ctrlKey===!1&&u.pointerType==="mouse"&&(b(u),u.preventDefault())}),onKeyDown:P(s.onKeyDown,u=>{const g=w.current!=="";!(u.ctrlKey||u.altKey||u.metaKey)&&u.key.length===1&&T(u.key),!(g&&u.key===" ")&&Bt.includes(u.key)&&(b(),u.preventDefault())})})})});Oe.displayName=Ae;var De="SelectValue",ke=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:r,style:s,children:d,placeholder:l="",...c}=t,i=Y(De,e),{onValueNodeHasChildrenChange:f}=i,v=d!==void 0,w=L(n,i.onValueNodeChange);return G(()=>{f(v)},[f,v]),a.jsx(j.span,{...c,ref:w,style:{pointerEvents:"none"},children:ot(i.value)?a.jsx(a.Fragment,{children:l}):d})});ke.displayName=De;var $t="SelectIcon",Le=o.forwardRef((t,n)=>{const{__scopeSelect:e,children:r,...s}=t;return a.jsx(j.span,{"aria-hidden":!0,...s,ref:n,children:r||"▼"})});Le.displayName=$t;var Gt="SelectPortal",Ve=t=>a.jsx(Mt,{asChild:!0,...t});Ve.displayName=Gt;var Q="SelectContent",Be=o.forwardRef((t,n)=>{const e=Y(Q,t.__scopeSelect),[r,s]=o.useState();if(G(()=>{s(new DocumentFragment)},[]),!e.open){const d=r;return d?Ee.createPortal(a.jsx(He,{scope:t.__scopeSelect,children:a.jsx(ce.Slot,{scope:t.__scopeSelect,children:a.jsx("div",{children:t.children})})}),d):null}return a.jsx(We,{...t,ref:n})});Be.displayName=Q;var O=10,[He,q]=te(Q),zt="SelectContentImpl",We=o.forwardRef((t,n)=>{const{__scopeSelect:e,position:r="item-aligned",onCloseAutoFocus:s,onEscapeKeyDown:d,onPointerDownOutside:l,side:c,sideOffset:i,align:f,alignOffset:v,arrowPadding:w,collisionBoundary:T,collisionPadding:N,sticky:b,hideWhenDetached:u,avoidCollisions:g,...y}=t,p=Y(Q,e),[h,M]=o.useState(null),[A,oe]=o.useState(null),R=L(n,m=>M(m)),[D,U]=o.useState(null),[X,V]=o.useState(null),B=de(e),[K,H]=o.useState(!1),W=o.useRef(!1);o.useEffect(()=>{if(h)return wt(h)},[h]),yt();const E=o.useCallback(m=>{const[I,..._]=B().map(S=>S.ref.current),[C]=_.slice(-1),x=document.activeElement;for(const S of m)if(S===x||(S==null||S.scrollIntoView({block:"nearest"}),S===I&&A&&(A.scrollTop=0),S===C&&A&&(A.scrollTop=A.scrollHeight),S==null||S.focus(),document.activeElement!==x))return},[B,A]),k=o.useCallback(()=>E([D,h]),[E,D,h]);o.useEffect(()=>{K&&k()},[K,k]);const{onOpenChange:F,triggerPointerDownPosRef:$}=p;o.useEffect(()=>{if(h){let m={x:0,y:0};const I=C=>{var x,S;m={x:Math.abs(Math.round(C.pageX)-(((x=$.current)==null?void 0:x.x)??0)),y:Math.abs(Math.round(C.pageY)-(((S=$.current)==null?void 0:S.y)??0))}},_=C=>{m.x<=10&&m.y<=10?C.preventDefault():h.contains(C.target)||F(!1),document.removeEventListener("pointermove",I),$.current=null};return $.current!==null&&(document.addEventListener("pointermove",I),document.addEventListener("pointerup",_,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",I),document.removeEventListener("pointerup",_,{capture:!0})}}},[h,F,$]),o.useEffect(()=>{const m=()=>F(!1);return window.addEventListener("blur",m),window.addEventListener("resize",m),()=>{window.removeEventListener("blur",m),window.removeEventListener("resize",m)}},[F]);const[pe,ae]=rt(m=>{const I=B().filter(x=>!x.disabled),_=I.find(x=>x.ref.current===document.activeElement),C=st(I,m,_);C&&setTimeout(()=>C.ref.current.focus())}),fe=o.useCallback((m,I,_)=>{const C=!W.current&&!_;(p.value!==void 0&&p.value===I||C)&&(U(m),C&&(W.current=!0))},[p.value]),me=o.useCallback(()=>h==null?void 0:h.focus(),[h]),ee=o.useCallback((m,I,_)=>{const C=!W.current&&!_;(p.value!==void 0&&p.value===I||C)&&V(m)},[p.value]),le=r==="popper"?Se:Fe,ne=le===Se?{side:c,sideOffset:i,align:f,alignOffset:v,arrowPadding:w,collisionBoundary:T,collisionPadding:N,sticky:b,hideWhenDetached:u,avoidCollisions:g}:{};return a.jsx(He,{scope:e,content:h,viewport:A,onViewportChange:oe,itemRefCallback:fe,selectedItem:D,onItemLeave:me,itemTextRefCallback:ee,focusSelectedItem:k,selectedItemText:X,position:r,isPositioned:K,searchRef:pe,children:a.jsx(Ct,{as:je,allowPinchZoom:!0,children:a.jsx(It,{asChild:!0,trapped:p.open,onMountAutoFocus:m=>{m.preventDefault()},onUnmountAutoFocus:P(s,m=>{var I;(I=p.trigger)==null||I.focus({preventScroll:!0}),m.preventDefault()}),children:a.jsx(bt,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:d,onPointerDownOutside:l,onFocusOutside:m=>m.preventDefault(),onDismiss:()=>p.onOpenChange(!1),children:a.jsx(le,{role:"listbox",id:p.contentId,"data-state":p.open?"open":"closed",dir:p.dir,onContextMenu:m=>m.preventDefault(),...y,...ne,onPlaced:()=>H(!0),ref:R,style:{display:"flex",flexDirection:"column",outline:"none",...y.style},onKeyDown:P(y.onKeyDown,m=>{const I=m.ctrlKey||m.altKey||m.metaKey;if(m.key==="Tab"&&m.preventDefault(),!I&&m.key.length===1&&ae(m.key),["ArrowUp","ArrowDown","Home","End"].includes(m.key)){let C=B().filter(x=>!x.disabled).map(x=>x.ref.current);if(["ArrowUp","End"].includes(m.key)&&(C=C.slice().reverse()),["ArrowUp","ArrowDown"].includes(m.key)){const x=m.target,S=C.indexOf(x);C=C.slice(S+1)}setTimeout(()=>E(C)),m.preventDefault()}})})})})})})});We.displayName=zt;var Yt="SelectItemAlignedPosition",Fe=o.forwardRef((t,n)=>{const{__scopeSelect:e,onPlaced:r,...s}=t,d=Y(Q,e),l=q(Q,e),[c,i]=o.useState(null),[f,v]=o.useState(null),w=L(n,R=>v(R)),T=de(e),N=o.useRef(!1),b=o.useRef(!0),{viewport:u,selectedItem:g,selectedItemText:y,focusSelectedItem:p}=l,h=o.useCallback(()=>{if(d.trigger&&d.valueNode&&c&&f&&u&&g&&y){const R=d.trigger.getBoundingClientRect(),D=f.getBoundingClientRect(),U=d.valueNode.getBoundingClientRect(),X=y.getBoundingClientRect();if(d.dir!=="rtl"){const x=X.left-D.left,S=U.left-x,Z=R.left-S,J=R.width+Z,he=Math.max(J,D.width),ge=window.innerWidth-O,ve=Pe(S,[O,Math.max(O,ge-he)]);c.style.minWidth=J+"px",c.style.left=ve+"px"}else{const x=D.right-X.right,S=window.innerWidth-U.right-x,Z=window.innerWidth-R.right-S,J=R.width+Z,he=Math.max(J,D.width),ge=window.innerWidth-O,ve=Pe(S,[O,Math.max(O,ge-he)]);c.style.minWidth=J+"px",c.style.right=ve+"px"}const V=T(),B=window.innerHeight-O*2,K=u.scrollHeight,H=window.getComputedStyle(f),W=parseInt(H.borderTopWidth,10),E=parseInt(H.paddingTop,10),k=parseInt(H.borderBottomWidth,10),F=parseInt(H.paddingBottom,10),$=W+E+K+F+k,pe=Math.min(g.offsetHeight*5,$),ae=window.getComputedStyle(u),fe=parseInt(ae.paddingTop,10),me=parseInt(ae.paddingBottom,10),ee=R.top+R.height/2-O,le=B-ee,ne=g.offsetHeight/2,m=g.offsetTop+ne,I=W+E+m,_=$-I;if(I<=ee){const x=V.length>0&&g===V[V.length-1].ref.current;c.style.bottom="0px";const S=f.clientHeight-u.offsetTop-u.offsetHeight,Z=Math.max(le,ne+(x?me:0)+S+k),J=I+Z;c.style.height=J+"px"}else{const x=V.length>0&&g===V[0].ref.current;c.style.top="0px";const Z=Math.max(ee,W+u.offsetTop+(x?fe:0)+ne)+_;c.style.height=Z+"px",u.scrollTop=I-ee+u.offsetTop}c.style.margin=`${O}px 0`,c.style.minHeight=pe+"px",c.style.maxHeight=B+"px",r==null||r(),requestAnimationFrame(()=>N.current=!0)}},[T,d.trigger,d.valueNode,c,f,u,g,y,d.dir,r]);G(()=>h(),[h]);const[M,A]=o.useState();G(()=>{f&&A(window.getComputedStyle(f).zIndex)},[f]);const oe=o.useCallback(R=>{R&&b.current===!0&&(h(),p==null||p(),b.current=!1)},[h,p]);return a.jsx(Xt,{scope:e,contentWrapper:c,shouldExpandOnScrollRef:N,onScrollButtonChange:oe,children:a.jsx("div",{ref:i,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:M},children:a.jsx(j.div,{...s,ref:w,style:{boxSizing:"border-box",maxHeight:"100%",...s.style}})})})});Fe.displayName=Yt;var qt="SelectPopperPosition",Se=o.forwardRef((t,n)=>{const{__scopeSelect:e,align:r="start",collisionPadding:s=O,...d}=t,l=ue(e);return a.jsx(Tt,{...l,...d,ref:n,align:r,collisionPadding:s,style:{boxSizing:"border-box",...d.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});Se.displayName=qt;var[Xt,Te]=te(Q,{}),we="SelectViewport",Ue=o.forwardRef((t,n)=>{const{__scopeSelect:e,nonce:r,...s}=t,d=q(we,e),l=Te(we,e),c=L(n,d.onViewportChange),i=o.useRef(0);return a.jsxs(a.Fragment,{children:[a.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:r}),a.jsx(ce.Slot,{scope:e,children:a.jsx(j.div,{"data-radix-select-viewport":"",role:"presentation",...s,ref:c,style:{position:"relative",flex:1,overflow:"hidden auto",...s.style},onScroll:P(s.onScroll,f=>{const v=f.currentTarget,{contentWrapper:w,shouldExpandOnScrollRef:T}=l;if(T!=null&&T.current&&w){const N=Math.abs(i.current-v.scrollTop);if(N>0){const b=window.innerHeight-O*2,u=parseFloat(w.style.minHeight),g=parseFloat(w.style.height),y=Math.max(u,g);if(y<b){const p=y+N,h=Math.min(b,p),M=p-h;w.style.height=h+"px",w.style.bottom==="0px"&&(v.scrollTop=M>0?M:0,w.style.justifyContent="flex-end")}}}i.current=v.scrollTop})})})]})});Ue.displayName=we;var Ke="SelectGroup",[Zt,Jt]=te(Ke),Qt=o.forwardRef((t,n)=>{const{__scopeSelect:e,...r}=t,s=be();return a.jsx(Zt,{scope:e,id:s,children:a.jsx(j.div,{role:"group","aria-labelledby":s,...r,ref:n})})});Qt.displayName=Ke;var $e="SelectLabel",Ge=o.forwardRef((t,n)=>{const{__scopeSelect:e,...r}=t,s=Jt($e,e);return a.jsx(j.div,{id:s.id,...r,ref:n})});Ge.displayName=$e;var ie="SelectItem",[eo,ze]=te(ie),Ye=o.forwardRef((t,n)=>{const{__scopeSelect:e,value:r,disabled:s=!1,textValue:d,...l}=t,c=Y(ie,e),i=q(ie,e),f=c.value===r,[v,w]=o.useState(d??""),[T,N]=o.useState(!1),b=L(n,p=>{var h;return(h=i.itemRefCallback)==null?void 0:h.call(i,p,r,s)}),u=be(),g=o.useRef("touch"),y=()=>{s||(c.onValueChange(r),c.onOpenChange(!1))};if(r==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return a.jsx(eo,{scope:e,value:r,disabled:s,textId:u,isSelected:f,onItemTextChange:o.useCallback(p=>{w(h=>h||((p==null?void 0:p.textContent)??"").trim())},[]),children:a.jsx(ce.ItemSlot,{scope:e,value:r,disabled:s,textValue:v,children:a.jsx(j.div,{role:"option","aria-labelledby":u,"data-highlighted":T?"":void 0,"aria-selected":f&&T,"data-state":f?"checked":"unchecked","aria-disabled":s||void 0,"data-disabled":s?"":void 0,tabIndex:s?void 0:-1,...l,ref:b,onFocus:P(l.onFocus,()=>N(!0)),onBlur:P(l.onBlur,()=>N(!1)),onClick:P(l.onClick,()=>{g.current!=="mouse"&&y()}),onPointerUp:P(l.onPointerUp,()=>{g.current==="mouse"&&y()}),onPointerDown:P(l.onPointerDown,p=>{g.current=p.pointerType}),onPointerMove:P(l.onPointerMove,p=>{var h;g.current=p.pointerType,s?(h=i.onItemLeave)==null||h.call(i):g.current==="mouse"&&p.currentTarget.focus({preventScroll:!0})}),onPointerLeave:P(l.onPointerLeave,p=>{var h;p.currentTarget===document.activeElement&&((h=i.onItemLeave)==null||h.call(i))}),onKeyDown:P(l.onKeyDown,p=>{var M;((M=i.searchRef)==null?void 0:M.current)!==""&&p.key===" "||(Ht.includes(p.key)&&y(),p.key===" "&&p.preventDefault())})})})})});Ye.displayName=ie;var re="SelectItemText",qe=o.forwardRef((t,n)=>{const{__scopeSelect:e,className:r,style:s,...d}=t,l=Y(re,e),c=q(re,e),i=ze(re,e),f=Kt(re,e),[v,w]=o.useState(null),T=L(n,y=>w(y),i.onItemTextChange,y=>{var p;return(p=c.itemTextRefCallback)==null?void 0:p.call(c,y,i.value,i.disabled)}),N=v==null?void 0:v.textContent,b=o.useMemo(()=>a.jsx("option",{value:i.value,disabled:i.disabled,children:N},i.value),[i.disabled,i.value,N]),{onNativeOptionAdd:u,onNativeOptionRemove:g}=f;return G(()=>(u(b),()=>g(b)),[u,g,b]),a.jsxs(a.Fragment,{children:[a.jsx(j.span,{id:i.textId,...d,ref:T}),i.isSelected&&l.valueNode&&!l.valueNodeHasChildren?Ee.createPortal(d.children,l.valueNode):null]})});qe.displayName=re;var Xe="SelectItemIndicator",Ze=o.forwardRef((t,n)=>{const{__scopeSelect:e,...r}=t;return ze(Xe,e).isSelected?a.jsx(j.span,{"aria-hidden":!0,...r,ref:n}):null});Ze.displayName=Xe;var ye="SelectScrollUpButton",Je=o.forwardRef((t,n)=>{const e=q(ye,t.__scopeSelect),r=Te(ye,t.__scopeSelect),[s,d]=o.useState(!1),l=L(n,r.onScrollButtonChange);return G(()=>{if(e.viewport&&e.isPositioned){let c=function(){const f=i.scrollTop>0;d(f)};const i=e.viewport;return c(),i.addEventListener("scroll",c),()=>i.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),s?a.jsx(et,{...t,ref:l,onAutoScroll:()=>{const{viewport:c,selectedItem:i}=e;c&&i&&(c.scrollTop=c.scrollTop-i.offsetHeight)}}):null});Je.displayName=ye;var Ce="SelectScrollDownButton",Qe=o.forwardRef((t,n)=>{const e=q(Ce,t.__scopeSelect),r=Te(Ce,t.__scopeSelect),[s,d]=o.useState(!1),l=L(n,r.onScrollButtonChange);return G(()=>{if(e.viewport&&e.isPositioned){let c=function(){const f=i.scrollHeight-i.clientHeight,v=Math.ceil(i.scrollTop)<f;d(v)};const i=e.viewport;return c(),i.addEventListener("scroll",c),()=>i.removeEventListener("scroll",c)}},[e.viewport,e.isPositioned]),s?a.jsx(et,{...t,ref:l,onAutoScroll:()=>{const{viewport:c,selectedItem:i}=e;c&&i&&(c.scrollTop=c.scrollTop+i.offsetHeight)}}):null});Qe.displayName=Ce;var et=o.forwardRef((t,n)=>{const{__scopeSelect:e,onAutoScroll:r,...s}=t,d=q("SelectScrollButton",e),l=o.useRef(null),c=de(e),i=o.useCallback(()=>{l.current!==null&&(window.clearInterval(l.current),l.current=null)},[]);return o.useEffect(()=>()=>i(),[i]),G(()=>{var v;const f=c().find(w=>w.ref.current===document.activeElement);(v=f==null?void 0:f.ref.current)==null||v.scrollIntoView({block:"nearest"})},[c]),a.jsx(j.div,{"aria-hidden":!0,...s,ref:n,style:{flexShrink:0,...s.style},onPointerDown:P(s.onPointerDown,()=>{l.current===null&&(l.current=window.setInterval(r,50))}),onPointerMove:P(s.onPointerMove,()=>{var f;(f=d.onItemLeave)==null||f.call(d),l.current===null&&(l.current=window.setInterval(r,50))}),onPointerLeave:P(s.onPointerLeave,()=>{i()})})}),to="SelectSeparator",tt=o.forwardRef((t,n)=>{const{__scopeSelect:e,...r}=t;return a.jsx(j.div,{"aria-hidden":!0,...r,ref:n})});tt.displayName=to;var Ie="SelectArrow",oo=o.forwardRef((t,n)=>{const{__scopeSelect:e,...r}=t,s=ue(e),d=Y(Ie,e),l=q(Ie,e);return d.open&&l.position==="popper"?a.jsx(Nt,{...s,...r,ref:n}):null});oo.displayName=Ie;function ot(t){return t===""||t===void 0}var nt=o.forwardRef((t,n)=>{const{value:e,...r}=t,s=o.useRef(null),d=L(n,s),l=Pt(e);return o.useEffect(()=>{const c=s.current,i=window.HTMLSelectElement.prototype,v=Object.getOwnPropertyDescriptor(i,"value").set;if(l!==e&&v){const w=new Event("change",{bubbles:!0});v.call(c,e),c.dispatchEvent(w)}},[l,e]),a.jsx(Rt,{asChild:!0,children:a.jsx("select",{...r,ref:d,defaultValue:e})})});nt.displayName="BubbleSelect";function rt(t){const n=Et(t),e=o.useRef(""),r=o.useRef(0),s=o.useCallback(l=>{const c=e.current+l;n(c),function i(f){e.current=f,window.clearTimeout(r.current),f!==""&&(r.current=window.setTimeout(()=>i(""),1e3))}(c)},[n]),d=o.useCallback(()=>{e.current="",window.clearTimeout(r.current)},[]);return o.useEffect(()=>()=>window.clearTimeout(r.current),[]),[e,s,d]}function st(t,n,e){const s=n.length>1&&Array.from(n).every(f=>f===n[0])?n[0]:n,d=e?t.indexOf(e):-1;let l=no(t,Math.max(d,0));s.length===1&&(l=l.filter(f=>f!==e));const i=l.find(f=>f.textValue.toLowerCase().startsWith(s.toLowerCase()));return i!==e?i:void 0}function no(t,n){return t.map((e,r)=>t[(n+r)%t.length])}var ro=Me,at=Oe,so=ke,ao=Le,lo=Ve,lt=Be,io=Ue,it=Ge,ct=Ye,co=qe,uo=Ze,dt=Je,ut=Qe,pt=tt;const wo=ro,yo=so,po=o.forwardRef(({className:t,children:n,...e},r)=>a.jsxs(at,{ref:r,className:z("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",t),...e,children:[n,a.jsx(ao,{asChild:!0,children:a.jsx(_e,{className:"h-4 w-4 opacity-50"})})]}));po.displayName=at.displayName;const ft=o.forwardRef(({className:t,...n},e)=>a.jsx(dt,{ref:e,className:z("flex cursor-default items-center justify-center py-1",t),...n,children:a.jsx(At,{className:"h-4 w-4"})}));ft.displayName=dt.displayName;const mt=o.forwardRef(({className:t,...n},e)=>a.jsx(ut,{ref:e,className:z("flex cursor-default items-center justify-center py-1",t),...n,children:a.jsx(_e,{className:"h-4 w-4"})}));mt.displayName=ut.displayName;const fo=o.forwardRef(({className:t,children:n,position:e="popper",...r},s)=>a.jsx(lo,{children:a.jsxs(lt,{ref:s,className:z("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t),position:e,...r,children:[a.jsx(ft,{}),a.jsx(io,{className:z("p-1",e==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),children:n}),a.jsx(mt,{})]})}));fo.displayName=lt.displayName;const mo=o.forwardRef(({className:t,...n},e)=>a.jsx(it,{ref:e,className:z("px-2 py-1.5 text-sm font-semibold",t),...n}));mo.displayName=it.displayName;const ho=o.forwardRef(({className:t,children:n,...e},r)=>a.jsxs(ct,{ref:r,className:z("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t),...e,children:[a.jsx("span",{className:"absolute right-2 flex h-3.5 w-3.5 items-center justify-center",children:a.jsx(uo,{children:a.jsx(Ot,{className:"h-4 w-4"})})}),a.jsx(co,{children:n})]}));ho.displayName=ct.displayName;const go=o.forwardRef(({className:t,...n},e)=>a.jsx(pt,{ref:e,className:z("-mx-1 my-1 h-px bg-muted",t),...n}));go.displayName=pt.displayName;export{xo as F,wo as S,po as a,yo as b,fo as c,ho as d};
//# sourceMappingURL=select-CvTnstrL.js.map
