import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{_ as t,g as n,h as r,m as i}from"./native-preview-BE7t9d_r.js";import{$ as a,An as o,At as s,Bn as ee,Bt as te,D as ne,Et as re,Fn as ie,Ft as ae,Ht as oe,Ln as se,O as ce,On as le,Pt as ue,Qn as de,Rt as fe,St as pe,Tt as me,Wn as he,X as ge,Xn as _e,Xt as ve,Yn as ye,Z as be,Zn as xe,_n as Se,ar as Ce,at as we,cn as Te,ct as Ee,dr as De,dt as Oe,er as ke,gn as Ae,hr as je,i as Me,jn as Ne,kt as Pe,lr as Fe,mr as Ie,nt as Le,on as Re,or as ze,pr as Be,pt as Ve,qn as He,r as Ue,rr as We,rt as Ge,sn as Ke,sr as qe,st as Je,tr as Ye,ut as Xe,vn as Ze,wt as Qe,yn as $e,zn as et}from"./angular-preview-Cf5Zqhiw.js";import{A as c,C as l,D as u,H as tt,I as nt,N as d,P as f,U as rt,_ as p,a as it,b as m,c as at,f as ot,g as st,i as ct,k as h,m as lt,p as ut,r as dt,s as ft,t as pt,u as mt,w as g,x as _,y as v,z as y}from"./minerva-web-components-DlAztivh.js";import{D as ht,E as gt,F as _t,I as vt,N as yt,T as bt,_ as xt,g as St,h as Ct,j as wt,k as Tt,n as Et,t as Dt,x as Ot}from"./angular-preview-DXuT9H-w.js";import{n as kt,t as At}from"./angular-preview-zsUCIt1r.js";import{n as jt,t as Mt}from"./angular-preview-CPOhk_AS.js";import{n as Nt,t as Pt}from"./minerva-web-components-DCIxNQ3U.js";import{$n as Ft,$t as It,An as Lt,Ar as Rt,At as zt,Bn as Bt,Bt as Vt,Cn as b,Cr as x,Ct as Ht,Dr as Ut,Dt as Wt,Er as Gt,Et as Kt,Fr as qt,Ft as Jt,Gn as Yt,Gt as Xt,Hn as Zt,Ht as Qt,In as $t,Ir as en,It as tn,Jn as nn,Jt as rn,Kn as an,Kt as on,Ln as sn,Mn as cn,Mr as S,Mt as ln,Nn as un,Nt as dn,On as fn,Or as pn,Ot as mn,Pn as hn,Pt as gn,Qn as _n,Qt as vn,Sn as C,Sr as yn,St as bn,Tn as xn,Tr as w,Tt as Sn,Un as Cn,Ut as wn,Vn as Tn,Vt as En,Wn as Dn,Wt as On,Xn as kn,Xt as An,Yt as jn,Zn as Mn,Zt as Nn,_n as Pn,_r as T,_t as Fn,an as In,at as Ln,bn as Rn,br as zn,bt as Bn,cn as Vn,cr as E,dn as Hn,dr as Un,dt as Wn,en as Gn,er as Kn,fn as qn,fr as Jn,ft as Yn,gn as Xn,gr as D,gt as Zn,hn as Qn,hr as O,ht as $n,in as er,ir as tr,it as nr,jn as rr,jr as k,jt as ir,kn as ar,kr as or,kt as sr,ln as cr,lr as A,lt as lr,m as ur,mn as dr,mr as fr,mt as pr,n as mr,nn as hr,on as gr,ot as _r,p as vr,pn as yr,pr as j,pt as br,qn as M,qt as xr,rn as Sr,rr as Cr,rt as wr,sn as Tr,t as Er,tn as Dr,un as Or,ur as N,ut as kr,vn as Ar,vr as jr,vt as Mr,wn as Nr,wr as P,wt as Pr,xn as Fr,xr as Ir,xt as Lr,yn as Rr,yr as zr,yt as Br,zn as Vr,zt as Hr}from"./minerva-web-components-d8v6GepP.js";import{t as F}from"./minerva-web-components-D61_qRVd.js";import{$t as Ur,Gt as Wr,Kt as Gr,Qt as Kr,Ut as qr,Wt as Jr,Xt as Yr,Yt as Xr,Zt as Zr,an as Qr,cn as $r,en as ei,in as ti,ln as ni,nn as ri,on as ii,rn as ai,sn as oi,tn as si,un as ci}from"./minerva-web-components-DFgRbLFX.js";var li,ui,I;function di(){return(di=e((()=>{Jn(),k(),E(),M(),x(),T(),fr(),C(),c(),l(),m(),p(),re(),li={info:$t,success:xn,warning:sn,danger:tr},ui=[`slideIn`,`fadeIn`,`bounce`,`zoom`],I=class e extends O{constructor(...e){super(...e),this.color=`info`,this.variant=`subtle`,this.size=`medium`,this.heading=``,this.hideIcon=!1,this.closable=!1,this.noAnimation=!1,this.animationName=`slideIn`,this.banner=!1,this.elevation=!1,this.square=!1,this.collapsible=!1,this.collapsed=!1,this.locale=new P(this),this.aria=new S(this),this.slots=new j(this)}static{this.tagName=`minerva-alert`}static{this.styles=[D,y`
:host{
display: block;
}
.icon svg,
.expandButton svg,
.closeButton svg{
display: block;
}
`,b(Un)]}get hasHeading(){return!!this.heading||this.slots.test(`heading`)}handleExpand(){let e=this.collapsed;this.emit(`minerva-expanded-change`,{expanded:e},{cancelable:!0})&&(this.collapsed=!e)}handleClose(){let e=this.adjacentTabbable(),t=this.parentElement;this.emit(`minerva-close`,{},{cancelable:!0})&&(this.isFocusInsideOrLost()&&this.moveFocusOut(e,t),this.hidden=!0)}isFocusInsideOrLost(){let e=this.ownerDocument,t=fe(e);return!t||t===e.body||!t.isConnected||Ve(this,t)}adjacentTabbable(){let e=Je(this.ownerDocument.body),t=e.map((e,t)=>Ve(this,e)?t:-1).filter(e=>e>=0);if(!t.length)return null;let n=e=>!Ve(this,e)&&Pe(e);return e.slice(t[t.length-1]+1).find(n)??e.slice(0,t[0]).filter(n).pop()??null}moveFocusOut(e,t){let n=typeof this.returnFocus==`function`?this.returnFocus():this.returnFocus;n?.isConnected&&Xe(n)||e?.isConnected&&Xe(e)||this.focusContainer(t)}focusContainer(e){let t=this.ownerDocument;if(e?.isConnected){for(let n=e;n&&n!==t.body;n=n.parentElement)if(n.hasAttribute(`tabindex`)&&Xe(n))return;e!==t.body&&e!==t.documentElement&&(e.setAttribute(`tabindex`,`-1`),e.addEventListener(`blur`,()=>{e.getAttribute(`tabindex`)===`-1`&&e.removeAttribute(`tabindex`)},{once:!0}),Xe(e,{preventScroll:!0}))}}updated(){N&&this.collapsible&&!this.hasHeading&&A(e.tagName,`collapsible needs a heading (the toggle lives in the title): set heading or fill the heading slot.`)}hookStates(){return{state:this.collapsible&&this.hasHeading?this.collapsed?`closed`:`open`:void 0,size:this.size,variant:this.variant,color:this.color}}render(){let e=this.locale.t,t=this.hasHeading,n=this.collapsible&&t,r=!this.collapsed,i=this.slots.test(`[default]`),a=!this.noAnimation,o=this.borderRadius,s=this.alertRole??(this.color===`danger`||this.color===`warning`?`alert`:`status`);return f`<div
part="root"
class=${_({alert:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,withIcon:!this.hideIcon,withTitle:t,banner:this.banner,withAnimation:a,[`animation-${this.animationName}`]:a&&ui.includes(this.animationName),withElevation:this.elevation,rounded:!this.square,expanded:r,collapsible:n})}
style=${v({borderRadius:o==null||o===``?void 0:/^\d+(\.\d+)?$/.test(String(o))?`${o}px`:String(o)})}
role=${s}
aria-label=${this.aria.label??d}
>
${this.hideIcon?d:f`<span
part="icon"
class="icon"
role="img"
aria-label=${this.iconLabel??e(`alert.icon.${this.color}`)}
><slot name="icon">${li[this.color]??li.info}</slot></span
>`}
<div class="content">
${t?f`<div class="title" part="title">
<slot name="heading">${this.heading}</slot>
${n?f`<button
type="button"
part="trigger"
class="expandButton"
aria-label=${r?this.collapseLabel??e(`alert.collapse`):this.expandLabel??e(`alert.expand`)}
aria-expanded=${String(r)}
aria-controls=${r&&i?`message`:d}
@click=${this.handleExpand}
>
${r?Ft:Cn}
</button>`:d}
</div>`:d}
${i&&(!n||r)?f`<div id="message" class="message" part="description">
<slot></slot>
</div>`:d}
</div>
${this.slots.test(`action`)?f`<div class="action" part="action">
<slot name="action"></slot>
</div>`:d}
${this.closable?f`<button
type="button"
part="close-button"
class="closeButton"
aria-label=${this.closeLabel??e(`alert.close`)}
@click=${this.handleClose}
>
<slot name="close-icon">${Kn}</slot>
</button>`:d}
</div>`}},F([h({reflect:!0})],I.prototype,`color`,void 0),F([h({reflect:!0})],I.prototype,`variant`,void 0),F([h({reflect:!0})],I.prototype,`size`,void 0),F([h()],I.prototype,`heading`,void 0),F([h({type:Boolean,attribute:`hide-icon`})],I.prototype,`hideIcon`,void 0),F([h({type:Boolean,reflect:!0})],I.prototype,`closable`,void 0),F([h({type:Boolean,attribute:`no-animation`})],I.prototype,`noAnimation`,void 0),F([h({attribute:`animation-name`})],I.prototype,`animationName`,void 0),F([h({type:Boolean,reflect:!0})],I.prototype,`banner`,void 0),F([h({type:Boolean,reflect:!0})],I.prototype,`elevation`,void 0),F([h({type:Boolean,reflect:!0})],I.prototype,`square`,void 0),F([h({attribute:`border-radius`})],I.prototype,`borderRadius`,void 0),F([h({type:Boolean,reflect:!0})],I.prototype,`collapsible`,void 0),F([h({type:Boolean,reflect:!0})],I.prototype,`collapsed`,void 0),F([h({attribute:`close-label`})],I.prototype,`closeLabel`,void 0),F([h({attribute:`expand-label`})],I.prototype,`expandLabel`,void 0),F([h({attribute:`collapse-label`})],I.prototype,`collapseLabel`,void 0),F([h({attribute:`icon-label`})],I.prototype,`iconLabel`,void 0),F([h({attribute:`alert-role`})],I.prototype,`alertRole`,void 0),F([h({attribute:!1})],I.prototype,`returnFocus`,void 0)})))()}var fi,pi,mi,hi,L;function gi(){return(gi=e((()=>{E(),M(),Ut(),x(),T(),fr(),C(),Rr(),Pn(),ni(),Qr(),ai(),ei(),c(),l(),m(),re(),fi=[`expanded`,`compact`,`floating`],pi=`(max-width: 768px)`,mi=()=>typeof window<`u`&&typeof window.matchMedia==`function`?window.matchMedia(pi):null,hi={iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,control:!0},L=class e extends O{constructor(...e){super(...e),this.brand=``,this.sidebarMode=`expanded`,this.noSkipLink=!1,this.collapsed=!1,this.mobile=!1,this.drawerOpen=!1,this.hovered=!1,this.keyboardFocus=!1,this.locale=new P(this),this.slots=new j(this),this.modal=new si(this),this.focusScope=new ii(this,()=>({trapped:!0,loop:!0,restoreFocus:!1})),this.layer=new ci(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.headerToggle],onFocusOutside:e=>e.preventDefault(),onDismiss:()=>this.requestDrawer(!1)})),this.query=null,this.drawerActive=!1,this.handleMediaChange=()=>this.syncMobile()}static{this.tagName=`minerva-app-shell`}static{this.styles=[D,ti,y`
:host{
display: block;
}
`,b(Xn),b(Ar)]}openNavigation(){this.mobile&&(this.drawerOpen=!0)}closeNavigation(){this.drawerOpen=!1}expandNavigation(){this.sidebarMode=`expanded`}focusMain(){this.main?.focus()}connectedCallback(){super.connectedCallback(),this.query=mi(),this.query?.addEventListener(`change`,this.handleMediaChange),this.syncMobile()}disconnectedCallback(){super.disconnectedCallback(),this.query?.removeEventListener(`change`,this.handleMediaChange),this.query=null,this.deactivateDrawer()}syncMobile(){let e=!!this.query?.matches;e!==this.mobile&&(this.mobile=e,this.hovered=!1,this.keyboardFocus=!1,this.drawerOpen=!1)}get mode(){return fi.includes(this.sidebarMode)?this.sidebarMode:`expanded`}setMode(e){e!==this.mode&&this.emit(`minerva-sidebar-mode-change`,{mode:e},{cancelable:!0})&&(this.sidebarMode=e)}requestDrawer(e){e!==this.drawerOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.drawerOpen=e)}willUpdate(e){e.has(`navigationKey`)&&e.get(`navigationKey`)!==void 0&&(this.drawerOpen=!1),this.mobile||(this.drawerOpen=!1),this.collapsed=!this.mobile&&this.mode!==`expanded`&&(this.mode!==`floating`||!this.hovered&&!this.keyboardFocus)}updated(t){let n=this.mobile&&this.drawerOpen;n&&!this.drawerActive&&this.drawer?(this.drawerActive=!0,Gt(this.overlay),Gt(this.drawer),this.modal.activate(this),this.layer.activate(this.drawer),this.focusScope.activate(this.drawer)):!n&&this.drawerActive&&(this.deactivateDrawer(),this.headerToggle?.focus()),N&&t.has(`sidebarMode`)&&!fi.includes(this.sidebarMode)&&A(e.tagName,`unknown sidebar-mode="${this.sidebarMode}" (expected ${fi.join(`, `)}); using "expanded".`),N&&!this.slots.test(`navigation`)&&A(e.tagName,`put the navigation in the "navigation" slot (e.g. <nav slot="navigation">).`)}hookStates(){return{state:this.mobile&&this.drawerOpen?`open`:`closed`}}deactivateDrawer(){this.drawerActive&&(this.drawerActive=!1,this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate(),w(this.drawer),w(this.overlay))}label(e,t){return e??this.locale.t(`appShell.${t}`)}handleSkip(e){e.preventDefault(),this.focusMain()}handleSidebarFocusIn(e){let t=e.composedPath()[0],n;try{n=!!t?.matches?.(`:focus-visible`)}catch{n=!1}n&&(this.keyboardFocus=!0)}handleSidebarFocusOut(e){let t=e.relatedTarget;(!t||!this.sidebar||!Ve(this.sidebar,t))&&(this.keyboardFocus=!1)}renderHeaderToggle(){return this.mobile?f`<button
type="button"
class=${_(hi)}
aria-label=${this.label(this.openNavigationLabel,`openNavigation`)}
aria-haspopup="dialog"
aria-expanded=${String(this.drawerOpen)}
aria-controls=${this.drawerOpen?`drawer`:d}
@click=${()=>this.requestDrawer(!this.drawerOpen)}
>
${cn}
</button>`:this.renderCollapseControl()}renderCollapseControl(){let e=this.mode!==`expanded`;return f`<button
type="button"
class=${_(hi)}
aria-label=${e?this.label(this.expandLabel,`expand`):this.label(this.collapseLabel,`collapse`)}
aria-controls="sidebar"
aria-expanded=${String(!this.collapsed)}
@click=${()=>this.setMode(e?`expanded`:`compact`)}
>
${e?cn:rr}
</button>`}renderSidebar(){let e=this.mode===`floating`,t=this.label(this.navigationLabel,`navigation`);return f`<aside
id="sidebar"
class="sidebar"
part="sidebar"
aria-label=${t}
@mouseenter=${()=>this.hovered=!0}
@mouseleave=${()=>this.hovered=!1}
@focusin=${this.handleSidebarFocusIn}
@focusout=${this.handleSidebarFocusOut}
@keydown=${e=>{e.key===`Tab`&&(this.keyboardFocus=!0)}}
@pointerdown=${()=>this.keyboardFocus=!1}
>
<div class="brand">
${this.slots.test(`brand-icon`)?f`<span class="brandIcon" aria-hidden="true"
><slot name="brand-icon"></slot
></span>`:d}
<span class="brandLabel"><slot name="brand">${this.brand}</slot></span>
</div>
<div class="navigation"><slot name="navigation"></slot></div>
<div class="sidebarActions">
${this.renderCollapseControl()}
<button
type="button"
class=${_(hi)}
aria-pressed=${String(e)}
aria-label=${e?this.label(this.disableFloatingLabel,`disableFloating`):this.label(this.enableFloatingLabel,`enableFloating`)}
@click=${()=>this.setMode(e?`compact`:`floating`)}
>
${e?fn:hn}
</button>
</div>
</aside>`}renderDrawer(){let e=this.label(this.navigationLabel,`navigation`);return f`<div
class="overlay"
part="overlay"
popover="manual"
aria-hidden="true"
></div>
<div
id="drawer"
class="drawer"
part="content"
popover="manual"
role="dialog"
aria-modal="true"
aria-labelledby="drawer-title"
tabindex="-1"
>
<h2 id="drawer-title" class="drawerHeader">${e}</h2>
<div class="drawerBody"><slot name="navigation"></slot></div>
<button
type="button"
class="drawerClose"
part="close-button"
aria-label=${this.label(this.closeNavigationLabel,`closeNavigation`)}
@click=${()=>this.requestDrawer(!1)}
>
${Kn}
</button>
</div>`}render(){let e=this.skipLink||this.locale.t(`appShell.skipToContent`);return f`<div
class="shell"
part="root"
data-sidebar-mode=${this.mode}
data-sidebar-expanded=${this.collapsed?d:`true`}
>
${this.noSkipLink?d:f`<a
class="skipLink"
part="skip-link"
href="#main"
@click=${this.handleSkip}
>${e}</a
>`}
${this.mobile?d:this.renderSidebar()}
<div class="workspace">
<header class="header" part="header">
${this.renderHeaderToggle()}
<div class="headerActions">
<slot name="header-actions"></slot>
</div>
</header>
<slot name="page-navigation"></slot>
<main id="main" class="content" part="main" tabindex="-1">
<slot></slot>
</main>
</div>
</div>
${this.mobile&&this.drawerOpen?this.renderDrawer():d}`}},F([h()],L.prototype,`brand`,void 0),F([h({attribute:`sidebar-mode`,reflect:!0})],L.prototype,`sidebarMode`,void 0),F([h({attribute:`navigation-label`})],L.prototype,`navigationLabel`,void 0),F([h({attribute:`navigation-key`})],L.prototype,`navigationKey`,void 0),F([h({attribute:`skip-link`})],L.prototype,`skipLink`,void 0),F([h({type:Boolean,attribute:`no-skip-link`})],L.prototype,`noSkipLink`,void 0),F([h({attribute:`expand-label`})],L.prototype,`expandLabel`,void 0),F([h({attribute:`collapse-label`})],L.prototype,`collapseLabel`,void 0),F([h({attribute:`enable-floating-label`})],L.prototype,`enableFloatingLabel`,void 0),F([h({attribute:`disable-floating-label`})],L.prototype,`disableFloatingLabel`,void 0),F([h({attribute:`open-navigation-label`})],L.prototype,`openNavigationLabel`,void 0),F([h({attribute:`close-navigation-label`})],L.prototype,`closeNavigationLabel`,void 0),F([h({type:Boolean,reflect:!0})],L.prototype,`collapsed`,void 0),F([h({type:Boolean,reflect:!0})],L.prototype,`mobile`,void 0),F([u()],L.prototype,`drawerOpen`,void 0),F([u()],L.prototype,`hovered`,void 0),F([u()],L.prototype,`keyboardFocus`,void 0),F([g(`.header button`)],L.prototype,`headerToggle`,void 0),F([g(`.drawer`)],L.prototype,`drawer`,void 0),F([g(`.overlay`)],L.prototype,`overlay`,void 0),F([g(`main`)],L.prototype,`main`,void 0),F([g(`aside`)],L.prototype,`sidebar`,void 0)})))()}var _i,R;function vi(){return(vi=e((()=>{k(),E(),M(),x(),jr(),T(),fr(),C(),ai(),qn(),Or(),dr(),c(),l(),m(),p(),re(),lt(),_i={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},R=class e extends yr{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.label=``,this.placeholder=``,this.mode=`basic`,this.size=`medium`,this.variant=`outline`,this.invalid=!1,this.readOnly=!1,this.loading=!1,this.placement=`bottom`,this.offset={x:0,y:4},this.noAnimation=!1,this.autoHighlight=!1,this.noFillOnSelect=!1,this.groupMode=`first`,this.focusedIndex=-1,this.hoveredIndex=-1,this.locale=new P(this),this.aria=new S(this,()=>this.labels),this.slots=new j(this),this.floating=new ri(this,()=>{let e=this.placement===`top`||this.placement===`bottom`,t=this.offset??{x:0,y:4};return{anchor:()=>this.container,floating:()=>this.popup,placement:_i[this.placement]??`bottom-start`,offset:{mainAxis:e?t.y:t.x,crossAxis:e?t.x:t.y},matchAnchorWidth:`min`,branches:()=>[this.container],onEscapeKeyDown:e=>{(this.composing||e.isComposing)&&e.preventDefault()},onDismiss:()=>this.close(),returnFocusOnEscape:()=>this.input,onPosition:()=>this.syncHookStates()}}),this.composing=!1,this.dirty=!1}static{this.tagName=`minerva-autocomplete`}static{this.shadowRootOptions={...yr.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,ti,b(Hn),b(cr),y`
:host{
display: block;
width: 100%;
}

.optionItem.disabled:not(.active):not(.highlight){
background-color: transparent;
}
.popup .dropdown .optionList .loading svg{
font-size: 1.5em;
animation: minerva-autocomplete-spin 1s linear infinite;
}
.empty svg{
display: block;
margin: 0 auto var(--space-2);
font-size: 40px;
color: var(--text-muted-color);
}
@keyframes minerva-autocomplete-spin{
to{
transform: rotate(360deg);
}
}
@media (prefers-reduced-motion: reduce){
.popup .dropdown .optionList .loading svg{
animation: none;
}
}
`]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}get blocked(){return this.isDisabled||this.readOnly}get shown(){return this.open&&!this.blocked}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.focusedIndex=-1}restoreFormState(e){typeof e==`string`&&(this.value=e)}get processedOptions(){let e=this.value,t=e.toLowerCase(),n=(this.options??[]).filter(n=>this.filterOption?this.filterOption(e,n):n.label.toLowerCase().includes(t));return this.sortOption?[...n].sort(this.sortOption):n}groupOptions(e){let t=this.groupBy;if(!t)return null;if(this.groupMode===`adjacent`){let n=[];for(let r of e){let e=t(r),i=n[n.length-1];i&&i[0]===e?i[1].push(r):n.push([e,[r]])}return n}let n=new Map;for(let r of e){let e=t(r),i=n.get(e);i?i.push(r):n.set(e,[r])}return Array.from(n.entries())}get navigableOptions(){let e=this.processedOptions,t=this.groupOptions(e);return t?t.flatMap(([,e])=>e):e}activeIndex(e){return this.focusedIndex>=0?this.focusedIndex:this.autoHighlight&&this.shown?e.findIndex(e=>!e.disabled):-1}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(){this.blocked||this.requestOpen(!0)}close(){this.requestOpen(!1),this.focusedIndex=-1}setText(e,t){e!==this.value&&(this.value=e,this.emit(`minerva-input`,{value:e}),t&&this.emit(`minerva-change`,{value:e}))}moveFocus(e){let t=this.navigableOptions,n=t.length;if(n===0)return;let r=this.activeIndex(t),i=r>=0?r:e===1?-1:n;for(let r=0;r<n;r+=1)if(i=(i+e+n)%n,!t[i].disabled){this.focusedIndex=i;return}}selectOption(e){e.disabled||(this.noFillOnSelect||this.setText(e.label,!0),this.close(),this.emit(`minerva-select`,{value:e.value,option:e}))}handleKeyDown(e){if(!(this.blocked||this.composing||e.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:case`ArrowUp`:e.preventDefault(),this.open||this.openDropdown(),this.moveFocus(e.key===`ArrowDown`?1:-1);break;case`Enter`:{let t=this.navigableOptions,n=this.shown?t[this.activeIndex(t)]:void 0,r=this.value.trim();n?(e.preventDefault(),this.selectOption(n)):r&&(e.preventDefault(),this.emit(`minerva-submit`,{value:r}),this.close());break}case`Escape`:!this.shown&&!this.floating.isOpen&&this.value!==``&&(e.preventDefault(),this.setText(``,!0),this.focusedIndex=-1)}}handleInput(){this.setText(this.input.value,!1),this.focusedIndex=-1,this.openDropdown()}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleBlur(e){let t=e.relatedTarget;t&&(this.popup?.contains(t)||this.container?.contains(t))||this.close()}handleOptionClick(e){e.disabled||this.composing||(this.selectOption(e),this.input?.focus())}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),this.open&&this.blocked&&(this.open=!1,this.focusedIndex=-1)}hookStates(){let e=this.shown&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?we(e):{side:void 0,align:void 0};return{state:this.shown?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,loading:this.loading,side:t,align:n,placement:e}}updated(t){if(super.updated(t),this.floating.sync(this.shown),t.has(`focusedIndex`)&&this.focusedIndex>=0&&this.shadowRoot?.getElementById(`option-${this.focusedIndex}`)?.scrollIntoView?.({block:`nearest`}),N&&t.has(`options`)){let t=new Set;for(let n of this.options??[]){if(t.has(n.value)){A(e.tagName,`several options have the value "${n.value}"; option values must be unique.`);break}t.add(n.value)}}}renderOptionContent(e){return this.mode===`custom`&&this.renderOption?this.renderOption(e):f`<div class="basicOption">
${e.icon?f`<span class="icon">${e.icon}</span>`:d}
<div class="content">
<div class="label">${e.label}</div>
${e.description?f`<div class="description">${e.description}</div>`:d}
</div>
</div>`}renderOptionItem(e,t,n){let r=n===t,i=this.hoveredIndex===t||r,a=!!e.disabled;return f`<div
part=${zr(`item`,{highlighted:i,disabled:a})}
class=${_({optionItem:!0,disabled:a,highlight:!!e.highlight,active:i})}
style=${e.style?v(e.style):d}
role="option"
tabindex="-1"
id=${`option-${t}`}
aria-selected=${String(r)}
aria-disabled=${e.disabled?`true`:d}
@mousedown=${e=>e.preventDefault()}
@click=${()=>this.handleOptionClick(e)}
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),t.stopPropagation(),this.handleOptionClick(e))}}
@mouseenter=${()=>this.hoveredIndex=t}
@mouseleave=${()=>this.hoveredIndex=-1}
>
${this.renderOptionContent(e)}
</div>`}renderList(){let{t:e}=this.locale;if(this.loading)return f`<div role="presentation" class="loading" part="loading">
<span role="progressbar" aria-label=${e(`common.loading`)}
>${Lt}</span
>
</div>`;let t=this.processedOptions;if(t.length===0)return f`<div role="presentation" class="empty" part="empty">
${this.renderEmpty?.()||f`${ar}<span>${e(`empty.description`)}</span>`}
</div>`;let n=this.groupOptions(t),r=n?n.flatMap(([,e])=>e):t,i=this.activeIndex(r);return n?n.map(([e,t])=>{let n=t.map(e=>this.renderOptionItem(e,r.indexOf(e),i));return e===``?n:f`<div class="optionGroup" role="group" aria-label=${e}>
<div class="groupLabel" part="group-label" aria-hidden="true">
${e}
</div>
${n}
</div>`}):t.map((e,t)=>this.renderOptionItem(e,t,i))}render(){let e=this.shown,t=this.isDisabled,n=e?this.navigableOptions:[],r=e?this.activeIndex(n):-1,i=e&&r>=0&&r<n.length?`option-${r}`:void 0,a=this.label?void 0:this.aria.label;return f`<div
part="root"
class="autoComplete"
@compositionstart=${()=>this.composing=!0}
@compositionend=${()=>this.composing=!1}
>
${this.label?f`<label for="input" class="label" part="label"
>${this.label}</label
>`:d}
<div
part="field"
class=${_({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?f`<span class="addon start"><slot name="prefix"></slot></span>`:d}
<input
id="input"
part="input"
class="field"
type="text"
role="combobox"
aria-autocomplete="list"
aria-expanded=${String(e)}
aria-controls=${e?`listbox`:d}
aria-activedescendant=${i??d}
aria-label=${a??d}
aria-description=${this.aria.description??d}
aria-required=${this.required?`true`:d}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:d}
data-minerva-escape-consumer=${!e&&this.value!==``?``:d}
autocomplete="off"
.value=${st(this.value)}
placeholder=${this.placeholder||d}
?disabled=${t}
?readonly=${this.readOnly}
@input=${this.handleInput}
@change=${this.handleChange}
@focus=${()=>this.openDropdown()}
@click=${()=>{this.open||this.openDropdown()}}
@blur=${this.handleBlur}
@keydown=${this.handleKeyDown}
/>
${this.slots.test(`suffix`)?f`<span class="addon end"><slot name="suffix"></slot></span>`:d}
</div>
${e?f`<div class="popup" part="content" popover="manual">
<div
class=${_({dropdown:!0,animated:!this.noAnimation})}
>
<div
class="optionList"
part="list"
role="listbox"
id="listbox"
aria-label=${this.label||a||d}
aria-busy=${this.loading?`true`:d}
>
${this.renderList()}
</div>
</div>
</div>`:d}
</div>`}},F([h({attribute:!1})],R.prototype,`value`,void 0),F([h({attribute:`value`})],R.prototype,`defaultValue`,void 0),F([h({attribute:!1})],R.prototype,`options`,void 0),F([h({type:Boolean,reflect:!0})],R.prototype,`open`,void 0),F([h()],R.prototype,`label`,void 0),F([h()],R.prototype,`placeholder`,void 0),F([h({reflect:!0})],R.prototype,`mode`,void 0),F([h({reflect:!0})],R.prototype,`size`,void 0),F([h({reflect:!0})],R.prototype,`variant`,void 0),F([h({type:Boolean,reflect:!0})],R.prototype,`invalid`,void 0),F([h({type:Boolean,reflect:!0,attribute:`readonly`})],R.prototype,`readOnly`,void 0),F([h({type:Boolean,reflect:!0})],R.prototype,`loading`,void 0),F([h({reflect:!0})],R.prototype,`placement`,void 0),F([h({attribute:!1})],R.prototype,`offset`,void 0),F([h({type:Boolean,attribute:`no-animation`})],R.prototype,`noAnimation`,void 0),F([h({type:Boolean,attribute:`auto-highlight`})],R.prototype,`autoHighlight`,void 0),F([h({type:Boolean,attribute:`no-fill-on-select`})],R.prototype,`noFillOnSelect`,void 0),F([h({attribute:`group-mode`})],R.prototype,`groupMode`,void 0),F([h({attribute:!1})],R.prototype,`filterOption`,void 0),F([h({attribute:!1})],R.prototype,`sortOption`,void 0),F([h({attribute:!1})],R.prototype,`groupBy`,void 0),F([h({attribute:!1})],R.prototype,`renderOption`,void 0),F([h({attribute:!1})],R.prototype,`renderEmpty`,void 0),F([u()],R.prototype,`focusedIndex`,void 0),F([u()],R.prototype,`hoveredIndex`,void 0),F([g(`input`)],R.prototype,`input`,void 0),F([g(`.autoComplete`)],R.prototype,`container`,void 0),F([g(`.popup`)],R.prototype,`popup`,void 0)})))()}function yi(e){let t=e?.trim()??``;return t?xi.test(t[0])?t[0]:t.split(/\s+/).slice(0,2).map(e=>e[0].toUpperCase()).join(``):``}var bi,xi,Si,Ci,wi;function Ti(){return(Ti=e((()=>{k(),E(),x(),T(),fr(),C(),Vn(),gr(),c(),l(),m(),p(),bi=[`xsmall`,`small`,`medium`,`large`,`xlarge`,`xxlarge`],xi=/[㐀-鿿豈-﫿]/,Si={fromAttribute:e=>e&&/^\d+(\.\d+)?$/.test(e)?Number(e):e??`medium`,toAttribute:e=>String(e)},Ci=class e extends O{constructor(...e){super(...e),this.name=``,this.shape=`circle`,this.size=`medium`,this.stacked=!1,this.locale=new P(this),this.aria=new S(this),this.slots=new j(this)}static{this.tagName=`minerva-avatar`}static{this.styles=[D,y`
:host{
display: inline-block;
flex-shrink: 0;
vertical-align: middle;
line-height: 0;
}
.avatarText{
line-height: 1;
}
`,b(Tr)]}hookStates(){return{size:typeof this.size==`number`?void 0:this.size,shape:this.shape}}updated(t){N&&t.has(`size`)&&typeof this.size!=`number`&&!bi.includes(this.size)&&A(e.tagName,`unknown size "${this.size}": use a preset (${bi.join(`, `)}) or a number of pixels.`)}render(){let e=!!this.src&&this.failedSrc!==this.src,t=this.aria.label??(this.name||this.locale.t(`avatar.default`)),n=typeof this.size==`number`,r=_({avatar:!0,[this.shape]:!0,[String(this.size)]:!n,stacked:this.stacked}),i=v(n?{"--avatar-size":`${this.size}px`,width:`${this.size}px`,height:`${this.size}px`}:{});if(e)return f`<span part="root" class=${r} style=${i}
><img
part="image"
class="avatarImg"
alt=${this.alt??t}
src=${this.src}
draggable="false"
@error=${()=>this.failedSrc=this.src}
/></span>`;let a=yi(this.name),o=this.slots.test(`fallback`)?f`<slot name="fallback"></slot>`:a||f`<slot></slot>`;return f`<span
part="root"
role="img"
aria-label=${t}
class=${r}
style=${i}
><span part="fallback" class="avatarText" aria-hidden="true"
>${o}</span
></span
>`}},F([h()],Ci.prototype,`src`,void 0),F([h()],Ci.prototype,`name`,void 0),F([h()],Ci.prototype,`alt`,void 0),F([h({reflect:!0})],Ci.prototype,`shape`,void 0),F([h({reflect:!0,converter:Si})],Ci.prototype,`size`,void 0),F([h({type:Boolean,reflect:!0})],Ci.prototype,`stacked`,void 0),F([u()],Ci.prototype,`failedSrc`,void 0),wi=class e extends O{constructor(...e){super(...e),this.locale=new P(this),this.aria=new S(this),this.slots=new j(this)}static{this.tagName=`minerva-avatar-group`}static{this.shadowRootOptions={...O.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[D,y`
:host{
display: flex;
}
.avatarGroup{
flex: 1 1 auto;
min-width: 0;
}
`,b(In)]}visibleAvatars(){let e=Array.from(this.children);return this.max===void 0||this.max===null?e:e.slice(0,Math.max(0,this.max))}updated(t){let n=this.visibleAvatars();Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,t)=>{let r=n[t];r&&typeof e.assign==`function`&&e.assign(r)}),N&&t.has(`max`)&&this.max!==void 0&&this.max!==null&&!(Number.isInteger(this.max)&&this.max>=0)&&A(e.tagName,`max must be a non-negative integer (got ${this.max}).`)}render(){this.slots;let e=this.children.length,t=this.visibleAvatars(),n=(Number(this.count)||0)+e-t.length,r=this.aria.label??(n>0?this.locale.t(`avatar.groupWithMore`,{count:n}):this.locale.t(`avatar.group`));return f`<div
part="root"
role="group"
class="avatarGroup"
aria-label=${r}
>
${t.map(()=>f`<div part="item" class="avatarGroupItem">
<slot data-item></slot>
</div>`)}
${n>0?f`<div part="count" class="count" aria-hidden="true">
+${n}
</div>`:d}
</div>`}},F([h({type:Number})],wi.prototype,`count`,void 0),F([h({type:Number})],wi.prototype,`max`,void 0)})))()}var Ei;function Di(){return(Di=e((()=>{k(),E(),x(),T(),fr(),C(),er(),c(),l(),m(),p(),Ei=class e extends O{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.position=`top-right`,this.dot=!1,this.badgeRole=`status`,this.locale=new P(this),this.aria=new S(this),this.slots=new j(this)}static{this.tagName=`minerva-badge`}static{this.styles=[D,y`
:host{
display: inline-flex;
vertical-align: middle;
}
`,b(Sr)]}hasElementChildren(){return Array.from(this.children).some(e=>!e.hasAttribute(`slot`)||e.getAttribute(`slot`)===``)}hookStates(){return{size:this.size,variant:this.variant,color:this.color}}updated(){N&&this.dot&&!this.aria.label&&![`presentation`,`none`].includes(this.badgeRole)&&A(e.tagName,`a dot badge has no text: set aria-label (e.g. "New messages") or badge-role="presentation".`)}render(){let e=this.slots.test(`[default]`),t=e&&!this.hasElementChildren(),n=this.content!==void 0&&this.content!==null||this.slots.test(`content`),r=!e||t&&!n,i=d;this.dot||(n?i=f`<slot name="content">${this.content}</slot>`:t?i=f`<slot></slot>`:e&&(i=this.locale.t(`badge.default`)));let a=f`<span
part=${r?`root`:`badge`}
class=${_({badge:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,standalone:r,[this.position]:!r,dot:this.dot})}
role=${this.badgeRole||d}
aria-label=${this.aria.label??d}
style=${v({borderRadius:this.borderRadius,borderWidth:this.borderWidth})}
>${this.slots.test(`icon`)?f`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:d}${i}</span
>`;return r?a:f`<div part="root" class="badgeWrapper">
<div class="content"><slot></slot></div>
${a}
</div>`}},F([h({reflect:!0})],Ei.prototype,`color`,void 0),F([h({reflect:!0})],Ei.prototype,`variant`,void 0),F([h({reflect:!0})],Ei.prototype,`size`,void 0),F([h()],Ei.prototype,`content`,void 0),F([h({reflect:!0})],Ei.prototype,`position`,void 0),F([h({type:Boolean,reflect:!0})],Ei.prototype,`dot`,void 0),F([h({attribute:`border-radius`})],Ei.prototype,`borderRadius`,void 0),F([h({attribute:`border-width`})],Ei.prototype,`borderWidth`,void 0),F([h({attribute:`badge-role`})],Ei.prototype,`badgeRole`,void 0)})))()}function Oi(e){return e.replace(/[;{}<>]/g,``)}var ki;function Ai(){return(Ai=e((()=>{he(),ki={fromAttribute:e=>{if(e===null)return;let t=e.trim();return/^-?\d+(\.\d+)?$/.test(t)?Number(t):t},toAttribute:e=>e===void 0?null:String(e)}})))()}var ji,Mi,Ni,z,B;function Pi(){return(Pi=e((()=>{E(),T(),Ai(),c(),l(),ji={bg:`var(--surface-color)`,"bg.subtle":`var(--surface-subtle-color)`,"bg.muted":`var(--surface-muted-color)`,"bg.emphasis":`var(--surface-muted-color)`,"bg.canvas":`var(--canvas-color)`,"bg.elevated":`var(--surface-elevated-color)`},Mi=[`none`,`sm`,`md`,`lg`,`xl`,`2xl`,`full`],Ni=[`sm`,`md`,`lg`,`xl`],z={converter:ki},B=class e extends O{static{this.tagName=`minerva-box`}static{this.styles=[D,y`
:host{
display: block;
}
`]}declarations(){let e=[],t=(t,...n)=>{if(t!==void 0&&t!==``)for(let r of n)e.push([r,He(t)])},n=(t,n)=>{t!==void 0&&t!==``&&e.push([n,Te(t)])};return t(this.p,`padding`),t(this.px,`padding-left`,`padding-right`),t(this.py,`padding-top`,`padding-bottom`),t(this.pt,`padding-top`),t(this.pr,`padding-right`),t(this.pb,`padding-bottom`),t(this.pl,`padding-left`),t(this.m,`margin`),t(this.mx,`margin-left`,`margin-right`),t(this.my,`margin-top`,`margin-bottom`),t(this.mt,`margin-top`),t(this.mr,`margin-right`),t(this.mb,`margin-bottom`),t(this.ml,`margin-left`),n(this.w,`width`),n(this.h,`height`),n(this.minW,`min-width`),n(this.minH,`min-height`),n(this.maxW,`max-width`),n(this.maxH,`max-height`),this.bg&&e.push([`background`,ji[this.bg]??this.bg]),this.rounded&&e.push([`border-radius`,Mi.includes(this.rounded)?`var(--radius-${this.rounded})`:this.rounded]),this.boxShadow&&e.push([`box-shadow`,Ni.includes(this.boxShadow)?`var(--shadow-${this.boxShadow})`:this.boxShadow]),this.border&&e.push([`border`,this.border]),e}updated(){N&&this.bg?.startsWith(`bg.`)&&!(this.bg in ji)&&A(e.tagName,`unknown surface alias bg="${this.bg}" (expected one of ${Object.keys(ji).join(`, `)}).`)}render(){let e=this.declarations().map(([e,t])=>`${e}:${Oi(t)};`).join(``);return f`<style>
:host{${e}}
</style>
<slot></slot>`}},F([h(z)],B.prototype,`p`,void 0),F([h(z)],B.prototype,`px`,void 0),F([h(z)],B.prototype,`py`,void 0),F([h(z)],B.prototype,`pt`,void 0),F([h(z)],B.prototype,`pr`,void 0),F([h(z)],B.prototype,`pb`,void 0),F([h(z)],B.prototype,`pl`,void 0),F([h(z)],B.prototype,`m`,void 0),F([h(z)],B.prototype,`mx`,void 0),F([h(z)],B.prototype,`my`,void 0),F([h(z)],B.prototype,`mt`,void 0),F([h(z)],B.prototype,`mr`,void 0),F([h(z)],B.prototype,`mb`,void 0),F([h(z)],B.prototype,`ml`,void 0),F([h(z)],B.prototype,`w`,void 0),F([h(z)],B.prototype,`h`,void 0),F([h({converter:ki,attribute:`min-w`})],B.prototype,`minW`,void 0),F([h({converter:ki,attribute:`min-h`})],B.prototype,`minH`,void 0),F([h({converter:ki,attribute:`max-w`})],B.prototype,`maxW`,void 0),F([h({converter:ki,attribute:`max-h`})],B.prototype,`maxH`,void 0),F([h()],B.prototype,`bg`,void 0),F([h()],B.prototype,`rounded`,void 0),F([h({attribute:`box-shadow`})],B.prototype,`boxShadow`,void 0),F([h()],B.prototype,`border`,void 0)})))()}var Fi,V;function Ii(){return(Ii=e((()=>{k(),E(),zn(),T(),fr(),C(),hr(),c(),l(),m(),p(),Fi=e=>`borderRadius${e.charAt(0).toUpperCase()}${e.slice(1)}`,V=class e extends O{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.disabled=!1,this.loading=!1,this.fullWidth=!1,this.active=!1,this.type=`button`,this.internals=Ir(this),this.aria=new S(this),this.slots=new j(this),this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-button`}static{this.formAssociated=!0}static{this.styles=[D,y`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
:host([full-width]){
display: flex;
width: 100%;
}
`,b(Dr)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0)}hookStates(){return{state:this.active?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){N&&this.shape===`circle`&&!this.aria.label&&(this.textContent?.trim()||A(e.tagName,`shape="circle" buttons usually only contain an icon: set aria-label to give them an accessible name.`))}render(){let e=this.borderRadius,t=typeof e==`number`||typeof e==`string`&&/^\d+(\.\d+)?$/.test(e),n=this.loading&&this.slots.test(`loading`),r=this.loading&&!n,i=f`<span
class="loadingSpinner"
part="spinner"
aria-hidden="true"
></span>`;return f`<button
part="root"
type="button"
class=${_({customButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape??``]:!!this.shape,[Fi(String(e??``))]:!!e&&!t,fullWidth:this.fullWidth,active:this.active,loading:this.loading})}
style=${v(t?{borderRadius:`${Number(e)}px`}:{})}
?disabled=${this.disabled}
aria-label=${this.aria.label??d}
aria-description=${this.aria.description??d}
aria-pressed=${this.aria.attr(`aria-pressed`)??d}
aria-expanded=${this.aria.attr(`aria-expanded`)??d}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??d}
aria-busy=${this.loading?`true`:d}
aria-disabled=${this.loading?`true`:d}
@click=${this.handleClick}
>
${n?f`${i}<span class="label" part="label"
><slot name="loading"></slot
></span>`:f`${this.loading?i:d}
${this.slots.test(`start`)?f`<span
class=${_({icon:!0,hidden:r})}
part="start-icon"
><slot name="start"></slot
></span>`:d}
<span class=${_({label:!0,hidden:r})} part="label"
><slot></slot
></span>
${this.slots.test(`end`)?f`<span
class=${_({icon:!0,hidden:r})}
part="end-icon"
><slot name="end"></slot
></span>`:d}`}
</button>`}},F([h({reflect:!0})],V.prototype,`color`,void 0),F([h({reflect:!0})],V.prototype,`variant`,void 0),F([h({reflect:!0})],V.prototype,`size`,void 0),F([h({reflect:!0})],V.prototype,`shape`,void 0),F([h({attribute:`border-radius`})],V.prototype,`borderRadius`,void 0),F([h({type:Boolean,reflect:!0})],V.prototype,`disabled`,void 0),F([h({type:Boolean,reflect:!0})],V.prototype,`loading`,void 0),F([h({type:Boolean,reflect:!0,attribute:`full-width`})],V.prototype,`fullWidth`,void 0),F([h({type:Boolean,reflect:!0})],V.prototype,`active`,void 0),F([h({reflect:!0})],V.prototype,`type`,void 0),F([g(`button`)],V.prototype,`button`,void 0)})))()}var Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,Xi;function Zi(){return(Zi=e((()=>{k(),E(),Ut(),zn(),T(),C(),Gn(),Nn(),c(),l(),m(),he(),mt(),Li=[`div`,`article`,`section`,`a`,`button`],Ri=[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`],zi=[`none`,`small`,`medium`,`large`],Bi=`minerva-card-header, minerva-card-content, minerva-card-footer, minerva-card-title, minerva-card-description`,Vi=e=>e&&zi.includes(e)?`pad-${e}`:``,Hi=e=>{let t=e.parentElement??e.getRootNode().host;return!!(t?pn(t,`minerva-card`):null)?.hasAttribute(`padding`)},Ui=class e extends O{constructor(...e){super(...e),this.variant=`default`,this.interactive=!1,this.as=`div`,this.disabled=!1,this.type=`button`,this.internals=Ir(this),this.aria=new S(this),this.syncParts=()=>{for(let e of Array.from(this.querySelectorAll(Bi)))e.requestUpdate()},this.blockDisabledClicks=e=>{this.tag===`button`&&this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-card`}static{this.formAssociated=!0}static{this.styles=[D,y`
:host{
display: block;
min-width: 0;
}
.card ::slotted(minerva-card-content){
flex: 1;
}
a.card,
button.card{
width: 100%;
box-sizing: border-box;
}
button.card{
margin: 0;
padding: 0;
}
`,b(It)]}get tag(){return Li.includes(this.as)?this.as:`div`}focus(e){this.tag===`a`||this.tag===`button`?this.root?.focus(e):super.focus(e)}handleClick(e){if(this.tag!==`button`)return;if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.internals?.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockDisabledClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockDisabledClicks,!0)}hookStates(){return{variant:this.variant,disabled:this.tag===`button`&&this.disabled}}updated(t){t.has(`padding`)&&this.syncParts(),N&&(this.as&&!Li.includes(this.as)&&A(e.tagName,`unsupported as="${this.as}" (expected ${Li.join(`, `)}); rendering a div.`),this.tag===`a`&&!this.href&&A(e.tagName,`as="a" needs an href to be a link (focusable, activatable with Enter).`),this.interactive&&this.tag!==`a`&&this.tag!==`button`&&A(e.tagName,`interactive cards should be links or buttons (as="a" with href, or as="button") so keyboard users can activate them.`))}render(){let t=this.tag,n=_({card:!0,[this.variant]:!0,padded:!!this.padding,[Vi(this.padding)]:!!Vi(this.padding),interactive:this.interactive}),r=this.aria.label??d,i=ut`<slot @slotchange=${this.syncParts}></slot>`;if(t===`a`)return ut`<a
part="root"
class=${n}
href=${vn(e.tagName,this.href)??d}
target=${this.target??d}
rel=${ye(this.target,this.rel)??d}
download=${this.download??d}
aria-label=${r}
>${i}</a
>`;if(t===`button`)return ut`<button
part="root"
class=${n}
type="button"
?disabled=${this.disabled}
aria-label=${r}
aria-pressed=${this.aria.attr(`aria-pressed`)??d}
aria-expanded=${this.aria.attr(`aria-expanded`)??d}
@click=${this.handleClick}
>
${i}
</button>`;let a=ot(t);return ut`<${a} part="root" class=${n}>${i}</${a}>`}},F([h({reflect:!0})],Ui.prototype,`variant`,void 0),F([h({reflect:!0})],Ui.prototype,`padding`,void 0),F([h({type:Boolean,reflect:!0})],Ui.prototype,`interactive`,void 0),F([h({reflect:!0})],Ui.prototype,`as`,void 0),F([h()],Ui.prototype,`href`,void 0),F([h()],Ui.prototype,`target`,void 0),F([h()],Ui.prototype,`rel`,void 0),F([h()],Ui.prototype,`download`,void 0),F([h({type:Boolean,reflect:!0})],Ui.prototype,`disabled`,void 0),F([h()],Ui.prototype,`type`,void 0),F([g(`[part=root]`)],Ui.prototype,`root`,void 0),Wi=y`
:host{
display: block;
min-width: 0;
}
.cardHeader{
padding: var(--card-padding,var(--space-4));
position: relative;
background-color: var(--card-header-bg-color,var(--surface-muted-color));
}

.cardHeader::after{
content: "";
position: absolute;
inset-inline: 0;
bottom: 0;
height: 1px;
background-color: var(--card-border-color,var(--border-color));
pointer-events: none;
}
.cardContent{
padding: var(--card-padding,var(--space-4));
flex: 1;
background-color: var(--card-bg-color-content,var(--surface-color));
min-width: 0;
overflow-wrap: anywhere;
}
.cardFooter{
padding: var(--card-padding,var(--space-4));
background-color: color-mix(
in srgb,
var(--surface-muted-color) 60%,
transparent
);
position: relative;
text-align: end;
}
.cardFooter::before{
content: "";
position: absolute;
inset-inline: 0;
top: 0;
height: 1px;
background-color: var(--card-border-color,var(--border-color));
pointer-events: none;
}
@media (forced-colors: active){
.cardHeader::after,
.cardFooter::before{
forced-color-adjust: none;
background-color: CanvasText;
}
}
.padded{
padding: 0;
border: 0;
background-color: transparent;
text-align: start;
white-space: normal;
overflow: visible;
}
.padded.cardHeader::after,
.padded.cardFooter::before{
content: none;
}
.padded.cardContent.afterHeader{
margin-top: var(--space-3);
}
.padded.cardFooter.afterContent,
.padded.cardFooter.afterHeader{
margin-top: var(--space-4);
padding-top: var(--space-4);
}
.padded.cardFooter.afterContent::before,
.padded.cardFooter.afterHeader::before{
content: "";
}
.pad-none{
padding: 0;
}
.pad-small{
padding: var(--space-3);
}
.pad-medium{
padding: var(--space-5);
}
.pad-large{
padding: var(--space-8);
}
`,Gi=class extends O{constructor(...e){super(...e),this.sectionClass=``}static{this.styles=[D,Wi]}layoutClasses(){let e=this.previousElementSibling?.localName,t=Vi(this.padding);return{[this.sectionClass]:!0,padded:Hi(this),afterHeader:e===`minerva-card-header`,afterContent:e===`minerva-card-content`,[t]:!!t}}render(){return ut`<div part="root" class=${_(this.layoutClasses())}>
<slot></slot>
</div>`}},F([h({reflect:!0})],Gi.prototype,`padding`,void 0),Ki=class extends Gi{constructor(...e){super(...e),this.sectionClass=`cardHeader`}static{this.tagName=`minerva-card-header`}},qi=class extends Gi{constructor(...e){super(...e),this.sectionClass=`cardContent`}static{this.tagName=`minerva-card-content`}static{this.styles=[D,Wi,y`
:host{
display: flex;
flex-direction: column;
}
.fadeIn{
animation: fadeIn 1s ease-in-out;
}
.slideIn{
animation: slideIn 1s ease-in-out;
}
.zoomIn{
animation: zoomIn 1s ease-in-out;
}
@keyframes fadeIn{
0%{
opacity: 0;
}
100%{
opacity: 1;
}
}
@keyframes slideIn{
0%{
transform: translateX(-100%);
}
100%{
transform: translateX(0);
}
}
@keyframes zoomIn{
0%{
transform: scale(0);
}
100%{
transform: scale(1);
}
}
@media (prefers-reduced-motion: reduce){
.fadeIn,
.slideIn,
.zoomIn{
animation: none;
}
}
`]}layoutClasses(){let e=super.layoutClasses();return this.animation&&(e[this.animation]=!0),e}},F([h({reflect:!0})],qi.prototype,`animation`,void 0),Ji=class extends Gi{constructor(...e){super(...e),this.sectionClass=`cardFooter`}static{this.tagName=`minerva-card-footer`}},Yi=class extends O{constructor(...e){super(...e),this.as=`h3`}static{this.tagName=`minerva-card-title`}static{this.styles=[D,y`
:host{
display: block;
min-width: 0;
}
.cardTitle{
font-size: var(--card-title-font-size,1.25rem);
font-weight: var(--font-weight-bold);
color: var(--text-color);
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}
.cardTitle.padded{
margin: 0;
font-family: var(--font-family-sans);
font-size: var(--card-title-font-size,var(--font-size-lg));
font-weight: var(--font-weight-semibold);
line-height: var(--line-height-tight);
white-space: normal;
}
`]}render(){let e=ot(Ri.includes(this.as)?this.as:`h3`);return ut`<${e}
part="root"
class=${_({cardTitle:!0,padded:Hi(this)})}
><slot></slot></${e}>`}},F([h({reflect:!0})],Yi.prototype,`as`,void 0),Xi=class extends O{static{this.tagName=`minerva-card-description`}static{this.styles=[D,y`
:host{
display: block;
min-width: 0;
}
.cardDescription{
font-size: var(--font-size-md);
color: var(--text-secondary-color);
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}
.cardDescription.padded{
margin: var(--space-1) 0 0;
font-family: var(--font-family-sans);
line-height: var(--line-height-base);
white-space: normal;
}
`]}render(){return ut`<p
part="root"
class=${_({cardDescription:!0,padded:Hi(this)})}
>
<slot></slot>
</p>`}}})))()}var Qi,$i,ea,ta,na,H;function ra(){return(ra=e((()=>{k(),E(),M(),x(),jr(),T(),C(),ai(),dr(),An(),c(),l(),m(),re(),he(),lt(),Qi=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n]),$i=e=>{let t=new Set;for(let n of e){if(t.has(n.value))return n.value;t.add(n.value);let e=n.children?$i(n.children):void 0;if(e!==void 0)return e}},ea={fromAttribute(e){let t=e?.trim()??``;if(!t)return[];if(t.startsWith(`[`))try{let e=JSON.parse(t);if(Array.isArray(e))return e.filter(e=>typeof e==`string`||typeof e==`number`)}catch{}return t.split(`,`).map(e=>e.trim())},toAttribute(e){return JSON.stringify(e)}},ta=`[role="option"]:not([aria-disabled="true"])`,na=0,H=class e extends yr{constructor(...e){super(...e),this.options=[],this.value=[],this.defaultValue=[],this.open=!1,this.label=``,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.expandTrigger=`click`,this.showSearch=!1,this.maxLevel=6,this.width=240,this.expandedValues=[],this.searchValue=``,this.idPrefix=`minerva-cascader-${na++}`,this.locale=new P(this),this.aria=new S(this,()=>this.labels),this.floating=new ri(this,()=>({anchor:()=>this.anchor,floating:()=>this.dropdown,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[this.anchor],onDismiss:()=>this.closeDropdown(),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.pendingFocus=null,this.dirty=!1,this.widthApplied=!1}static{this.tagName=`minerva-cascader`}static{this.shadowRootOptions={...yr.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,ti,y`
:host{
display: inline-block;
width: 240px;
vertical-align: middle;
}
.cascader{
width: 100%;
}

.input{
--_input-pad-x: var(--input-padding-x,var(--control-padding-x-sm));
position: relative;
display: inline-flex;
align-items: center;
width: 100%;
min-width: 0;
min-height: var(--input-height,var(--control-height-md));
background: transparent;
border: 1px solid transparent;
border-radius: var(--input-radius,var(--radius-lg));
color: var(--text-color);
}
.input[data-disabled]{
background-color: var(--surface-subtle-color);
opacity: 0.6;
}
.field{
flex: 1;
align-self: stretch;
min-width: 0;
border: none;
outline: none;
background: transparent;
padding: 0 var(--_input-pad-x);
font: inherit;
color: inherit;
}
.field::placeholder{
color: var(--text-muted-color);
}
.field:disabled{
cursor: not-allowed;
}
.clearIcon svg,
.arrow svg{
display: block;
}
.expandIcon{
display: inline-flex;
}
:host(:dir(rtl)) .expandIcon{
transform: scaleX(-1);
}
`,b(jn)]}get selectedOptions(){return Ke(this.options,this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get displayText(){let e=this.selectedOptions,t=e.map(e=>String(e.label));return this.displayRender?this.displayRender(t,e):t.join(` / `)}getFormValue(){return this.displayText}syncFormState(){super.syncFormState(),this.internals&&!this.isDisabled&&this.internals.setFormValue(this.getFormValue(),JSON.stringify(this.value))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=[...this.defaultValue],this.open=!1}restoreFormState(e){if(typeof e==`string`)try{let t=JSON.parse(e);Array.isArray(t)&&(this.value=t)}catch{}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=!Qi(this.value,this.defaultValue)||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=[...this.defaultValue]),e.has(`open`)&&(this.open?this.expandedValues=[...this.value]:(this.searchValue=``,this.pendingFocus=null)),N&&this.checkDev(e)}checkDev(t){if(t.has(`options`)){let t=$i(this.options);t!==void 0&&A(e.tagName,`duplicate option value "${t}" among siblings: values must be unique within a level.`)}(t.has(`options`)||t.has(`value`))&&this.options.length>0&&this.value.length>0&&Ke(this.options,this.value).length<this.value.length&&A(e.tagName,`value ${JSON.stringify(this.value)} is not a path of the options tree: it is shown partially (or not at all).`)}hookStates(){let e=this.open&&!this.isDisabled,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?we(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,side:n,align:r,placement:t}}updated(e){if(super.updated(e),e.has(`width`)){let e=this.width,t=e===void 0||e===``?``:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,n=t!==``&&t!==`240px`;(n||this.widthApplied)&&(this.style.width=n?t:``),this.widthApplied=n}this.floating.sync(this.open&&!this.isDisabled);let t=this.pendingFocus;if(t!==null&&this.open){let e=t===-1?this.columns().length-1:t;this.focusColumn(e)&&(this.pendingFocus=null)}}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(e=!1){this.isDisabled||this.readOnly||this.requestOpen(!0)&&(this.expandedValues=[...this.value],this.pendingFocus=e?-1:null)}closeDropdown(e=!1){this.requestOpen(!1)&&(this.searchValue=``,e&&this.input?.focus())}select(e){this.value=e.map(e=>e.value),this.emitChange(e),this.closeDropdown(!0)}emitChange(e){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:[...this.value],selectedOptions:e})}handleActivate(e,t){let n=e[e.length-1];if(n.disabled)return;let r=t>=this.maxLevel-1,i=!!n.children?.length,a=!!this.loadData&&!n.isLeaf&&!n.children;if(!r&&(i||a)){this.expandedValues=e.map(e=>e.value),a&&!n.loading&&this.loadData?.(e);return}this.select(e)}clear(e){e.stopPropagation(),this.value=[],this.searchValue=``,this.emitChange([]),this.emit(`minerva-clear`),this.input?.focus()}get expandedPath(){return Ke(this.options,this.expandedValues)}columns(){let e=this.expandedPath,t=[this.options];for(let n=0;n<e.length&&n<this.maxLevel-1;n+=1){let r=e[n].children;if(!r?.length)break;t.push(r)}return t}columnId(e){return`${this.idPrefix}-column-${e}`}focusColumn(e){let t=this.dropdown?.querySelector(`[data-level="${e}"]`);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(ta);return n?.focus(),!!n}canExpand(e,t){return t<this.maxLevel-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0)}pathTo(e,t){return[...this.expandedPath.slice(0,t),e]}get searching(){return this.showSearch&&this.searchValue!==``}searchResults(){if(!this.searching)return[];let{searchValue:e,filter:t}=this,n=e.toLowerCase();return Ze(this.options).filter(({path:r})=>t?t(e,r):r.some(e=>String(e.label).toLowerCase().includes(n)))}focusFirstSearchResult(){this.dropdown?.querySelector(`[role="option"]`)?.focus()}handleSelectorClick(){this.isDisabled||this.readOnly||(this.open?this.showSearch||this.closeDropdown():this.openDropdown())}handleInput(e){let t=e.target.value;this.showSearch&&!this.readOnly&&(this.searchValue=t,this.emit(`minerva-input`,{value:t}),this.open||this.openDropdown())}handleInputKeyDown(e){switch(e.key){case`ArrowDown`:e.preventDefault(),this.open?this.searching?this.focusFirstSearchResult():(this.pendingFocus=-1,this.requestUpdate()):this.openDropdown(!0);break;case`Enter`:e.preventDefault(),this.open||this.openDropdown(!0);break;case` `:if(this.showSearch)break;e.preventDefault(),this.open||this.openDropdown(!0)}}handleFocusOut(e){let t=e.relatedTarget;this.open&&t&&(this.anchor&&Ve(this.anchor,t)||this.dropdown&&Ve(this.dropdown,t)||this.closeDropdown())}handleDropdownMouseDown(e){e.target.closest?.(`[role="option"]`)||e.preventDefault()}handleDropdownKeyDown(e){e.key===`Tab`&&this.closeDropdown()}handleOptionKeyDown(e,t,n){let r=e.currentTarget,i=Array.from(r.parentElement?.querySelectorAll(ta)??[]),a=i.indexOf(r),o=e=>i[(e+i.length)%i.length]?.focus();switch(Qe(e.key,this)){case`ArrowDown`:e.preventDefault(),o(a+1);break;case`ArrowUp`:e.preventDefault(),o(a-1);break;case`Home`:e.preventDefault(),o(0);break;case`End`:e.preventDefault(),o(i.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!this.canExpand(t,n))break;this.pendingFocus=n+1,this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;this.canExpand(t,n)&&(this.pendingFocus=n+1),this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`ArrowLeft`:e.preventDefault(),n===0?this.closeDropdown(!0):this.focusColumn(n-1)}}handleSearchKeyDown(e){let t=e.currentTarget,n=Array.from(t.querySelectorAll(`[role="option"]`)),r=n.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),n[(r+(e.key===`ArrowDown`?1:-1)+n.length)%n.length]?.focus())}renderSearchResults(){let e=this.searchResults();return f`<div
class="searchResults"
role="listbox"
aria-label=${this.label||this.aria.label||d}
tabindex="-1"
@keydown=${this.handleSearchKeyDown}
>
${e.length>0?e.map(({path:e})=>f`<div
class="searchOption"
part="item"
role="option"
aria-selected="false"
tabindex="0"
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),this.select(e))}}
@click=${()=>this.select(e)}
>
${e.map(e=>e.label).join(` / `)}
</div>`):f`<div class="empty" role="status">
${this.locale.t(`cascader.noResults`)}
</div>`}
</div>`}renderPanel(){let{t:e}=this.locale,t=this.columns(),n=this.expandedPath,r=this.selectedOptions,i=this.label||this.aria.label||e(`cascader.options`);return f`<div class="panel">
${t.map((a,o)=>f`<ul
id=${this.columnId(o)}
data-level=${o}
class="column"
part="column"
role="listbox"
aria-label=${e(`cascader.level`,{label:i,level:o+1})}
>
${a.map(e=>{let i=n[o]?.value===e.value,a=r[o]?.value===e.value,s=this.canExpand(e,o)&&!(!e.children?.length&&e.isLeaf),ee=i&&!(a&&o===r.length-1);return f`<li
?data-expanded=${ee}
?data-selected=${a}
class=${_({option:!0,active:i||a,disabled:!!e.disabled,loading:!!e.loading})}
part=${zr(`item`,{selected:a,expanded:ee,disabled:e.disabled,loading:e.loading})}
role="option"
aria-selected=${a?`true`:`false`}
aria-disabled=${e.disabled?`true`:d}
aria-busy=${e.loading?`true`:d}
aria-controls=${i&&o+1<t.length?this.columnId(o+1):d}
tabindex=${e.disabled?-1:0}
@keydown=${t=>this.handleOptionKeyDown(t,e,o)}
@click=${()=>{e.disabled||this.handleActivate(this.pathTo(e,o),o)}}
@mouseenter=${()=>{this.expandTrigger===`hover`&&!e.disabled&&e.children?.length&&o<this.maxLevel-1&&(this.expandedValues=this.pathTo(e,o).map(e=>e.value))}}
>
${this.optionRender?this.optionRender(e,o):f`<span class="label">${e.label}</span>${e.loading?f`<span
class="loadingIndicator"
aria-hidden="true"
>...</span
>`:s?f`<span class="expandIcon" aria-hidden="true"
>${Dn}</span
>`:d}`}
</li>`})}
</ul>`)}
</div>`}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.open&&!t,r=!this.hideClearButton&&this.value.length>0&&!t&&!this.readOnly,i=this.searching?this.searchValue:this.displayText,a=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return f`<div
class="cascader"
part="root"
@focusout=${this.handleFocusOut}
>
<div
class=${_({selector:!0,disabled:t,focused:n})}
part="control"
@click=${this.handleSelectorClick}
>
<div class="input" data-component="input" ?data-disabled=${t}>
<input
part="input"
class="field"
role="combobox"
aria-haspopup="listbox"
aria-expanded=${n?`true`:`false`}
aria-autocomplete=${this.showSearch?`list`:d}
aria-label=${this.aria.label??(this.label||d)}
aria-description=${this.aria.description??d}
aria-invalid=${a?`true`:d}
aria-required=${this.required?`true`:d}
aria-readonly=${this.showSearch&&this.readOnly?`true`:d}
name=${this.name||d}
.value=${st(i)}
?readonly=${!this.showSearch||this.readOnly}
?disabled=${t}
?required=${this.required}
autocomplete="off"
placeholder=${this.placeholder??e(`cascader.placeholder`)}
@input=${this.handleInput}
@keydown=${this.handleInputKeyDown}
/>
</div>
${r?f`<button
type="button"
class="clearIcon"
part="clear-button"
aria-label=${e(`cascader.clear`)}
@click=${this.clear}
>
<span class="icon" aria-hidden="true">${Kn}</span>
</button>`:d}
<span
class=${_({arrow:!0,open:n})}
part="icon"
aria-hidden="true"
><span class="icon">${Cn}</span></span
>
</div>
</div>
${n?f`<div
class="dropdown"
part="content"
popover="manual"
@mousedown=${this.handleDropdownMouseDown}
@focusout=${this.handleFocusOut}
@keydown=${this.handleDropdownKeyDown}
>
${this.searching?this.renderSearchResults():this.renderPanel()}
</div>`:d}`}},F([h({attribute:!1})],H.prototype,`options`,void 0),F([h({attribute:!1})],H.prototype,`value`,void 0),F([h({attribute:`value`,converter:ea})],H.prototype,`defaultValue`,void 0),F([h({type:Boolean,reflect:!0})],H.prototype,`open`,void 0),F([h()],H.prototype,`label`,void 0),F([h()],H.prototype,`placeholder`,void 0),F([h({type:Boolean,reflect:!0})],H.prototype,`invalid`,void 0),F([h({type:Boolean,reflect:!0,attribute:`readonly`})],H.prototype,`readOnly`,void 0),F([h({type:Boolean,attribute:`hide-clear-button`})],H.prototype,`hideClearButton`,void 0),F([h({attribute:`expand-trigger`,reflect:!0})],H.prototype,`expandTrigger`,void 0),F([h({type:Boolean,attribute:`show-search`,reflect:!0})],H.prototype,`showSearch`,void 0),F([h({type:Number,attribute:`max-level`})],H.prototype,`maxLevel`,void 0),F([h()],H.prototype,`width`,void 0),F([h({attribute:!1})],H.prototype,`displayRender`,void 0),F([h({attribute:!1})],H.prototype,`filter`,void 0),F([h({attribute:!1})],H.prototype,`loadData`,void 0),F([h({attribute:!1})],H.prototype,`optionRender`,void 0),F([u()],H.prototype,`expandedValues`,void 0),F([u()],H.prototype,`searchValue`,void 0),F([g(`input`)],H.prototype,`input`,void 0),F([g(`.cascader`)],H.prototype,`anchor`,void 0),F([g(`.dropdown`)],H.prototype,`dropdown`,void 0)})))()}var ia,U;function aa(){return(aa=e((()=>{k(),E(),M(),x(),T(),fr(),C(),dr(),rn(),c(),l(),m(),lt(),ia=e=>e.charAt(0).toUpperCase()+e.slice(1),U=class e extends yr{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.indeterminate=!1,this.value=`on`,this.label=``,this.shape=`square`,this.size=`medium`,this.color=`primary`,this.labelPlacement=`end`,this.error=!1,this.helperText=``,this.readOnly=!1,this.locale=new P(this),this.aria=new S(this,()=>this.labels),this.slots=new j(this),this.dirty=!1}static{this.tagName=`minerva-checkbox`}static{this.shadowRootOptions={...yr.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,y`
:host{
display: inline-flex;
vertical-align: middle;
}
.checkmark ::slotted(*){
position: relative;
z-index: 1;
display: inline-flex;
color: var(--checkbox-checkmark-color,var(--text-inverse-color));
}
`,b(xr)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}click(){this.input?.click()}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(e){e.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked)}updated(t){super.updated(t),this.input&&(this.input.indeterminate=this.indeterminate),N&&!this.aria.label&&!this.label&&!this.textContent?.trim()&&A(e.tagName,`no label: set the label attribute, slot a label, or use aria-label / <label for>.`)}handleClick(e){this.readOnly&&e.preventDefault()}handleChange(){this.readOnly||(this.dirty=!0,this.input.indeterminate=this.indeterminate,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value}))}hookStates(){return{state:this.indeterminate?`indeterminate`:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape}}render(){let e=this.isDisabled,t=!!this.label||this.slots.test(`[default]`),n=[this.helperText,this.aria.description].filter(Boolean).join(` `),r=this.error||this.aria.attr(`aria-invalid`)===`true`;return f`<div
part="root"
class=${_({checkboxWrapper:!0,error:r})}
>
<label
class=${_({checkbox:!0,[this.size]:!0,[this.shape]:!0,[`label${ia(this.labelPlacement)}`]:!0,[`color${ia(this.color)}`]:this.color!==`primary`,disabled:e,error:r})}
>
<input
part="input"
type="checkbox"
class="input"
.checked=${st(this.checked)}
?disabled=${e}
?required=${this.required}
aria-checked=${this.indeterminate?`mixed`:d}
aria-label=${this.aria.label??d}
aria-description=${n||d}
aria-invalid=${r?`true`:d}
aria-readonly=${this.readOnly?`true`:d}
@click=${this.handleClick}
@change=${this.handleChange}
/>
<span class="checkmark" part="control"
>${this.checked&&!this.indeterminate?f`<slot name="icon"></slot>`:d}</span
>
${t?f`<span class="label" part="label"
>${this.label||f`<slot></slot>`}</span
>`:d}
</label>
${this.helperText?f`<div class="helperTextWrapper">
${r?f`<span class="errorIcon" aria-hidden="true"
>${$t}</span
>`:d}
<span
part="helper-text"
class=${_({helperText:!0,errorText:r})}
>${this.helperText}</span
>
</div>`:d}
</div>`}},F([h({attribute:!1})],U.prototype,`checked`,void 0),F([h({type:Boolean,attribute:`checked`,reflect:!0})],U.prototype,`defaultChecked`,void 0),F([h({type:Boolean,reflect:!0})],U.prototype,`indeterminate`,void 0),F([h()],U.prototype,`value`,void 0),F([h()],U.prototype,`label`,void 0),F([h({reflect:!0})],U.prototype,`shape`,void 0),F([h({reflect:!0})],U.prototype,`size`,void 0),F([h({reflect:!0})],U.prototype,`color`,void 0),F([h({attribute:`label-placement`,reflect:!0})],U.prototype,`labelPlacement`,void 0),F([h({type:Boolean,reflect:!0})],U.prototype,`error`,void 0),F([h({attribute:`helper-text`})],U.prototype,`helperText`,void 0),F([h({type:Boolean,reflect:!0,attribute:`readonly`})],U.prototype,`readOnly`,void 0),F([g(`input`)],U.prototype,`input`,void 0)})))()}var oa,sa,ca;function la(){return(la=e((()=>{k(),E(),M(),x(),T(),fr(),C(),Pn(),on(),c(),l(),m(),p(),oa=2e3,sa=e=>e===void 0||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,ca=class e extends O{constructor(...e){super(...e),this.noWrap=!1,this.maxHeight=`24rem`,this.copyable=!1,this.status=`idle`,this.locale=new P(this),this.aria=new S(this),this.slots=new j(this)}static{this.tagName=`minerva-code-block`}static{this.styles=[D,y`
:host{
display: block;
min-width: 0;
max-width: 100%;
}
.actions{
align-items: center;
gap: var(--space-2);
}
.language{
color: var(--text-muted-color);
font-family: var(--font-family-mono);
font-size: var(--font-size-xs);
line-height: 1;
user-select: none;
}
.iconButton svg{
width: 16px;
height: 16px;
}
`,b(Xn),b(Xt)]}get text(){return this.code??this.textContent??``}async copy(){let e=this.text,t=typeof navigator>`u`?void 0:navigator.clipboard,n=!1;if(typeof t?.writeText==`function`)try{await t.writeText(e),n=!0}catch{n=!1}return this.isConnected?(this.showStatus(n?`copied`:`failed`),this.emit(`minerva-copy`,{text:e,success:n}),n):n}showStatus(e){clearTimeout(this.timer),this.status=e,this.timer=setTimeout(()=>this.status=`idle`,oa)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timer),this.status=`idle`}updated(){N&&this.copyable&&!this.text.trim()&&A(e.tagName,`copyable is set but there is no text to copy (set code or the text content).`)}render(){this.slots;let e=this.locale.t,t=this.aria.label??e(`codeBlock.label`),n=sa(this.maxHeight),r=this.copyable||!!this.language,i=f`<pre
      part="region"
      role="region"
      tabindex="0"
      aria-label=${t}
      aria-description=${this.aria.description??d}
      data-wrap=${String(!this.noWrap)}
      class=${_({codeBlock:!0,copyable:r})}
      style=${v(r?{}:{maxHeight:n})}
    ><code
        part="code"
        class=${this.language?`language-${this.language}`:d}
        data-language=${this.language??d}
      >${this.text}</code></pre>`;if(!r)return i;let a=this.status,o=a===`copied`?e(`codeBlock.copied`):a===`failed`?e(`codeBlock.copyFailed`):``,s=o||e(`codeBlock.copy`),ee=a===`failed`?`danger`:a===`copied`?`success`:`neutral`;return f`<div part="root" class="root" style=${v({maxHeight:n})}>
${i}
<div class="actions">
${this.language?f`<span part="language" class="language" aria-hidden="true"
>${this.language}</span
>`:d}
${this.copyable?f`<button
type="button"
part="copy-button"
class="iconButton ${ee} variant-ghost small square"
aria-label=${s}
title=${s}
@click=${()=>void this.copy()}
>
${a===`copied`?an:a===`failed`?Kn:Vr}
</button>`:d}
</div>
${this.copyable?f`<span class="visuallyHidden" aria-live="polite"
>${o}</span
>`:d}
</div>`}},F([h()],ca.prototype,`code`,void 0),F([h({reflect:!0})],ca.prototype,`language`,void 0),F([h({type:Boolean,attribute:`no-wrap`,reflect:!0})],ca.prototype,`noWrap`,void 0),F([h({attribute:`max-height`})],ca.prototype,`maxHeight`,void 0),F([h({type:Boolean,reflect:!0})],ca.prototype,`copyable`,void 0),F([u()],ca.prototype,`status`,void 0)})))()}var ua,W;function da(){return(da=e((()=>{E(),Ut(),x(),jr(),T(),C(),ni(),Qr(),ai(),ei(),On(),Qt(),Hr(),c(),l(),re(),he(),lt(),ua={fromAttribute:e=>e===null?void 0:e.split(`,`).map(e=>e.trim()).filter(Boolean),toAttribute:e=>Array.isArray(e)?e.join(`, `):e},W=class e extends O{constructor(...e){super(...e),this.open=!1,this.items=[],this.maxResults=12,this.query=``,this.activeIndex=0,this.locale=new P(this),this.presence=new Vt(this,()=>this.panel),this.modal=new si(this),this.focusScope=new ii(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new ci(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleShortcut=e=>{let t=Ae(this.shortcut);if(t.length===0)return;let n=e.composedPath()[0]??e.target;me(n)&&!e.ctrlKey&&!e.metaKey&&!e.altKey||e.isComposing||t.some(t=>oe(e,t))&&(e.preventDefault(),e.stopPropagation(),this.requestOpenChange(!0,`shortcut`))}}static{this.tagName=`minerva-command-dialog`}static{this.styles=[D,ti,y`
:host{
display: contents;
}
`,b(wn),b(En)]}show(){this.open=!0}hide(){this.open=!1}get results(){let e=Math.max(0,this.maxResults),t=(Array.isArray(this.items)?this.items:[]).filter(e=>!e.disabled),n=this.query.trim();if(!n)return t.slice(0,e);if(typeof this.filter==`function`)return this.filter(t,n).slice(0,e);let r=et(n);return t.filter(e=>et(Fe(e)).includes(r)).slice(0,e)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}select(e){this.emit(`minerva-select`,{value:e.id,item:e}),this.requestOpenChange(!1,`select`)}handleKeyDown(e){let t=this.results,n=Math.max(t.length-1,0),r={ArrowDown:e=>Math.min(e+1,n),ArrowUp:e=>Math.max(e-1,0),Home:()=>0,End:()=>n}[e.key];if(r&&(e.key.startsWith(`Arrow`)||!this.query)){e.preventDefault(),this.activeIndex=r(Math.min(this.activeIndex,n));return}let i=t[this.activeIndex];e.key===`Enter`&&i&&!e.isComposing&&(e.preventDefault(),this.select(i))}handleInput(e){this.query=e.target.value,this.activeIndex=0}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleShortcut,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleShortcut,!0),w(this.panel),w(this.overlay)}willUpdate(e){e.has(`open`)&&(this.presence.sync(this.open),this.open&&(this.query=``,this.activeIndex=0)),e.has(`items`)&&N&&this.checkItems();let t=this.results.length;this.activeIndex>0&&this.activeIndex>=t&&(this.activeIndex=Math.max(t-1,0))}checkItems(){if(!Array.isArray(this.items)){A(e.tagName,"`items` must be an array of { id, title, ... } objects.");return}let t=new Set;for(let n of this.items)t.has(n.id)&&A(e.tagName,`duplicate item id "${n.id}": ids identify the chosen command in minerva-select and must be unique.`),t.add(n.id)}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(Gt(this.overlay),Gt(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.open&&(e.has(`activeIndex`)||e.has(`query`))&&this.renderRoot.querySelector(`#option-${this.activeIndex}`)?.scrollIntoView?.({block:`nearest`}),this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}hookStates(){return{state:this.open?`open`:`closed`}}afterClose(){w(this.panel),w(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return d;let e=this.locale.t,t=this.open?`open`:`closed`,n=this.results,r=n[this.activeIndex]?`option-${this.activeIndex}`:void 0,i=this.placeholder??e(`command.placeholder`);return f`<div
part="overlay"
class="overlay"
popover="manual"
data-state=${t}
aria-hidden="true"
></div>
<div
part="content"
class="content large dialog"
popover="manual"
role="dialog"
aria-modal="true"
aria-labelledby="title"
aria-describedby="description"
tabindex="-1"
data-state=${t}
>
<p id="description" class="description" part="description">
${this.description??e(`command.description`)}
</p>
<div id="title" class="header" part="header">
<span>${this.label??e(`command.title`)}</span>
${this.shortcutLabel?f`<kbd class="kbd">${this.shortcutLabel}</kbd>`:d}
</div>
<div class="search" part="search">
<span class="searchIcon" aria-hidden="true">⌕</span>
<input
part="input"
class="input"
type="text"
role="combobox"
aria-label=${i}
aria-autocomplete="list"
aria-expanded="true"
aria-controls="results"
aria-activedescendant=${r??d}
autocomplete="off"
spellcheck="false"
placeholder=${i}
.value=${st(this.query)}
@input=${this.handleInput}
@keydown=${this.handleKeyDown}
/>
<kbd class="enterHint" aria-hidden="true"
>${this.enterLabel??e(`command.enter`)}</kbd
>
</div>
<div
id="results"
part="list"
class="results"
role="listbox"
aria-label=${this.resultsLabel??e(`command.results`)}
>
${n.length===0?f`<div class="empty" part="empty">
${this.emptyText??e(`command.empty`)}
</div>`:n.map((e,t)=>{let n=t===this.activeIndex;return f`<button
id=${`option-${t}`}
part=${zr(`item`,{highlighted:n})}
type="button"
role="option"
tabindex="-1"
aria-selected=${n?`true`:`false`}
?data-highlighted=${n}
class="item"
@mouseenter=${()=>this.activeIndex=t}
@click=${()=>this.select(e)}
>
<span class="copy"
><strong>${e.title}</strong>${e.description?f`<small>${e.description}</small>`:d}</span
>${e.group?f`<span class="group">${e.group}</span>`:d}
</button>`})}
</div>
</div>`}},F([h({type:Boolean,reflect:!0})],W.prototype,`open`,void 0),F([h({attribute:!1})],W.prototype,`items`,void 0),F([h()],W.prototype,`label`,void 0),F([h()],W.prototype,`description`,void 0),F([h()],W.prototype,`placeholder`,void 0),F([h({attribute:`empty-text`})],W.prototype,`emptyText`,void 0),F([h({attribute:`shortcut-label`})],W.prototype,`shortcutLabel`,void 0),F([h({converter:ua})],W.prototype,`shortcut`,void 0),F([h({type:Number,attribute:`max-results`})],W.prototype,`maxResults`,void 0),F([h({attribute:!1})],W.prototype,`filter`,void 0),F([h({attribute:`results-label`})],W.prototype,`resultsLabel`,void 0),F([h({attribute:`enter-label`})],W.prototype,`enterLabel`,void 0),F([u()],W.prototype,`query`,void 0),F([u()],W.prototype,`activeIndex`,void 0),F([g(`.content`)],W.prototype,`panel`,void 0),F([g(`.overlay`)],W.prototype,`overlay`,void 0)})))()}var fa,pa,ma;function ha(){return(ha=e((()=>{E(),T(),c(),l(),re(),he(),fa=`(prefers-color-scheme: dark)`,pa=`data-minerva-theme-scope`,ma=class e extends O{constructor(...e){super(...e),this.root=!1,this.media=null,this.mode=null,this.onSchemeChange=()=>this.apply()}static{this.tagName=`minerva-config`}static{this.styles=y`
:host{
display: contents;
}
`}get resolvedMode(){return this.mode}connectedCallback(){super.connectedCallback(),typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(fa),this.media.addEventListener(`change`,this.onSchemeChange))}disconnectedCallback(){super.disconnectedCallback(),this.media?.removeEventListener(`change`,this.onSchemeChange),this.media=null,this.root&&this.clear(document.documentElement)}updated(e){e.has(`root`)&&e.get(`root`)!==void 0&&this.clear(e.get(`root`)?document.documentElement:this),this.apply()}target(){return this.root?document.documentElement:this}clear(e){for(let t of[`data-theme`,`data-palette`,pa,`lang`])(e!==this||t!==`lang`)&&e.removeAttribute(t);Le(e,null),te(e.style,{}),e.style.removeProperty(`color-scheme`)}apply(){let t=this.target(),n=(e,n)=>{n==null?t.removeAttribute(e):t.setAttribute(e,n)},r=this.theme,i=this.media?.matches?`dark`:`light`,a=r===`system`?i:r===`github-dark`?`dark`:r===`light`||r===`dark`?r:null,s=We(this.design)?this.design:void 0,ne=ee(this.palette)?this.palette:le(s),re=!!ne&&r!==`github-dark`,ae=ze(this.primaryColor);N&&ae===void 0&&A(e.tagName,ie(this.primaryColor)),n(`data-theme`,a),n(`data-palette`,re?ne:null);let oe=!this.root&&(a!==null||re||s!==void 0||[this.density,this.radius,this.shadow,this.fontScale].some(Boolean));this.root||n(pa,oe?``:null),a?t.style.colorScheme=a:t.style.removeProperty(`color-scheme`);let ce=r===`github-dark`&&Se(r)?Re[r]:void 0,ue=a??(!oe&&t.parentElement?.closest(`[data-theme]`)?.getAttribute(`data-theme`)===`dark`?`dark`:`light`);te(t.style,{...ce,...ae?Ge(ae,ue,re?je[ne][ue]:ce):void 0}),Le(t,{preset:s,density:o(this.density)?this.density:void 0,radius:se(this.radius)?this.radius:void 0,shadow:qe(this.shadow)?this.shadow:void 0,fontScale:de(this.fontScale)?this.fontScale:void 0},{all:!this.root&&s!==void 0}),this.root&&this.locale&&(document.documentElement.lang=this.locale),a!==this.mode&&(this.mode=a,a&&this.emit(`minerva-theme-change`,{mode:a}))}render(){return f`<slot></slot>`}},F([h({reflect:!0})],ma.prototype,`theme`,void 0),F([h({reflect:!0})],ma.prototype,`palette`,void 0),F([h({reflect:!0})],ma.prototype,`design`,void 0),F([h({reflect:!0})],ma.prototype,`density`,void 0),F([h({reflect:!0})],ma.prototype,`radius`,void 0),F([h({reflect:!0})],ma.prototype,`shadow`,void 0),F([h({reflect:!0,attribute:`font-scale`})],ma.prototype,`fontScale`,void 0),F([h({attribute:`primary-color`})],ma.prototype,`primaryColor`,void 0),F([h({reflect:!0})],ma.prototype,`locale`,void 0),F([h({type:Boolean,reflect:!0})],ma.prototype,`root`,void 0)})))()}var G;function ga(){return(ga=e((()=>{k(),E(),M(),Ut(),x(),T(),fr(),C(),ni(),Qr(),ai(),ei(),Ii(),On(),Hr(),c(),l(),G=class e extends O{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.color=`primary`,this.loading=!1,this.confirmDisabled=!1,this.busy=!1,this.locale=new P(this),this.aria=new S(this),this.slots=new j(this),this.presence=new Vt(this,()=>this.panel),this.modal=new si(this),this.focusScope=new ii(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new ci(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestClose(this.reason)})),this.reason=`outside`,this.wasPresent=!1}static{this.tagName=`minerva-confirm-dialog`}static{this.dependencies=[V]}static{this.styles=[D,ti,y`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,b(wn)]}show(){this.open=!0}hide(){this.open=!1}requestClose(e){return!this.open||!this.emit(`minerva-open-change`,{open:!1,reason:e},{cancelable:!0})?!1:(this.open=!1,e!==`confirm`&&this.emit(`minerva-cancel`,{reason:e}),!0)}async handleConfirm(){if(!this.open||this.loading||this.busy||this.confirmDisabled||!this.emit(`minerva-confirm`,void 0,{cancelable:!0}))return;let e=this.onConfirm?.();if(e&&typeof e.then==`function`){this.busy=!0;try{await e}catch{return}finally{this.busy=!1}}this.requestClose(`confirm`)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,color:this.color,loading:this.loading||this.busy}}updated(t){let n=this.open||this.presence.present;if(t.has(`open`)){let t=this.panel;this.open&&t?(N&&!this.label&&!this.slots.test(`header`)&&!this.aria.label&&A(e.tagName,"set `label` (or the `header` slot / aria-label) to give the alertdialog an accessible name."),Gt(this.overlay),Gt(t),this.modal.activate(this),this.layer.activate(t),this.focusInitial(t)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!n&&this.afterClose(),this.wasPresent=n}async focusInitial(e){let t=Array.from(e.querySelectorAll(`minerva-button`));await Promise.all(t.map(e=>e.updateComplete)),this.open&&this.panel===e&&(this.focusScope.activate(e),this.emit(`minerva-after-open`))}disconnectedCallback(){super.disconnectedCallback(),w(this.panel),w(this.overlay)}afterClose(){w(this.panel),w(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return d;let e=this.open?`open`:`closed`,t=this.locale.t,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=this.loading||this.busy;return f`<div
part="overlay"
class="overlay"
popover="manual"
data-state=${e}
aria-hidden="true"
></div>
<div
part="content"
class="content small"
popover="manual"
role="alertdialog"
aria-modal="true"
aria-labelledby=${n?`title`:d}
aria-label=${n?d:this.aria.label??d}
aria-describedby=${r?`description`:d}
tabindex="-1"
data-state=${e}
>
${r?f`<p id="description" class="description" part="description">
${r}
</p>`:d}
${n?f`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:d}
<div class="body" part="body">
${this.slots.test(`[default]`)?f`<slot></slot>`:d}
</div>
<div class="footer" part="footer">
<minerva-button
part="cancel-button"
type="button"
color="neutral"
variant="outline"
?disabled=${i}
@click=${()=>this.requestClose(`cancel-button`)}
>${this.cancelLabel??t(`confirm.cancel`)}</minerva-button
>
<minerva-button
part="confirm-button"
type="button"
color=${this.color}
variant="solid"
?loading=${i}
?disabled=${this.confirmDisabled}
@click=${()=>void this.handleConfirm()}
>${this.confirmLabel??(this.color===`danger`?t(`confirm.delete`):t(`confirm.confirm`))}</minerva-button
>
</div>
<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??t(`modal.close`)}
@click=${()=>this.requestClose(`close-button`)}
>
${Kn}
</button>
</div>`}},F([h({type:Boolean,reflect:!0})],G.prototype,`open`,void 0),F([h()],G.prototype,`label`,void 0),F([h()],G.prototype,`description`,void 0),F([h({attribute:`confirm-label`})],G.prototype,`confirmLabel`,void 0),F([h({attribute:`cancel-label`})],G.prototype,`cancelLabel`,void 0),F([h({attribute:`close-label`})],G.prototype,`closeLabel`,void 0),F([h({reflect:!0})],G.prototype,`color`,void 0),F([h({type:Boolean,reflect:!0})],G.prototype,`loading`,void 0),F([h({type:Boolean,reflect:!0,attribute:`confirm-disabled`})],G.prototype,`confirmDisabled`,void 0),F([h({attribute:!1})],G.prototype,`onConfirm`,void 0),F([u()],G.prototype,`busy`,void 0),F([g(`.content`)],G.prototype,`panel`,void 0),F([g(`.overlay`)],G.prototype,`overlay`,void 0)})))()}function _a(e){let t=pn(e,Sa);if(!t)return null;let n=e.ownerDocument;return t===n.documentElement||t===n.body?null:t}function va(e,t){for(let n=e;n;n=or(n))if(n===t)return!0;return!1}function ya(e){return wa.push(e),()=>{let t=wa.lastIndexOf(e);t>=0&&wa.splice(t,1)}}function ba(e){let t=e?.isConnected===!0?pn(e,Ea):null;if(t&&`confirmQueue`in t)return t.confirmQueue;let n=wa[wa.length-1];return n?n.confirmQueue:(Ta??=new Ca(()=>document.body),Ta)}function xa(e){return t=>Oa({...t,host:t.host??e})}var Sa,Ca,wa,Ta,Ea,Da,Oa;function ka(){return(ka=e((()=>{E(),Ut(),x(),Rn(),ga(),Sa=`minerva-config:not([root]), [data-minerva-theme-scope], [data-theme], [data-palette]`,Ca=class{constructor(e){this.defaultContainer=e,this.requests=[],this.current=null,this.settles=new Set}enqueue(e){return Fr(G),new Promise(t=>{this.requests.push({options:e,resolve:t}),this.current||this.showNext()})}cancelAll(){let e=this.requests.splice(0);for(let t of e)t.resolve(!1);for(let e of[...this.settles])e(!1);this.current?.remove()}container(e){let t=typeof document>`u`?null:document,n=e.container;if(n)return n.isConnected?n:(N&&A(G.tagName,"confirm(): `container` is not connected to the document; the dialog is appended to document.body instead."),t.body);let r=e.host?.isConnected===!0?_a(e.host):null,i=this.defaultContainer();return r&&!va(i,r)?r:i}showNext(){let e=this.requests.shift();if(!e){this.current=null;return}let{options:t,resolve:n}=e,r=this.container(t),i=document.createElement(G.tagName);i.label=t.title,t.description&&(i.description=t.description),t.confirmLabel&&(i.confirmLabel=t.confirmLabel),t.cancelLabel&&(i.cancelLabel=t.cancelLabel),t.closeLabel&&(i.closeLabel=t.closeLabel),t.color&&(i.color=t.color);let a=t.host;if(a?.isConnected&&!t.container){let e=yn(a);e!==yn(r)&&i.setAttribute(`lang`,e)}let o=!1,s=!1,ee=e=>{o||(o=!0,this.settles.delete(ee),n(e))};this.settles.add(ee);let te=new MutationObserver(()=>{i.isConnected||ne()}),ne=()=>{s||(s=!0,te.disconnect(),ee(!1),i.remove(),this.showNext())};i.addEventListener(`minerva-open-change`,e=>{let{open:t,reason:n}=e.detail;queueMicrotask(()=>{!t&&!e.defaultPrevented&&ee(n===`confirm`)})}),i.addEventListener(`minerva-after-close`,ne,{once:!0}),this.current=i,r.append(i),te.observe(document,{childList:!0,subtree:!0}),i.open=!0}},wa=[],Ta=null,Ea=`minerva-confirm-provider`,Da=()=>(N&&A(G.tagName,`confirm() called without a document (server render): resolving false.`),Promise.resolve(!1)),Oa=e=>typeof document>`u`?Da():ba(e.host).enqueue(e)})))()}var Aa;function ja(){return(ja=e((()=>{T(),ga(),ka(),c(),Aa=class extends O{constructor(...e){super(...e),this.confirmQueue=new Ca(()=>this),this.unregister=null,this.confirm=e=>this.confirmQueue.enqueue(e)}static{this.tagName=`minerva-confirm-provider`}static{this.dependencies=[G]}static{this.styles=y`
:host{
display: contents;
}
`}connectedCallback(){super.connectedCallback(),this.unregister=ya(this)}disconnectedCallback(){super.disconnectedCallback(),this.unregister?.(),this.unregister=null,this.confirmQueue.cancelAll()}render(){return f`<slot></slot>`}}})))()}var Ma,Na,Pa,K,Fa;function Ia(){return(Ia=e((()=>{k(),E(),M(),x(),jr(),T(),C(),hr(),tn(),Kr(),c(),l(),m(),p(),he(),lt(),ft(),Ma=e=>e===void 0?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Na={ascend:`ascending`,descend:`descending`},Pa=48,K=class e extends O{constructor(...e){super(...e),this.columns=[],this.rows=[],this.loading=!1,this.loadingRows=5,this.sortState=null,this.manualSort=!1,this.selectable=!1,this.selectedRowKeys=[],this.size=`medium`,this.variant=`simple`,this.hoverable=!1,this.retryable=!1,this.overflowing=!1,this.aria=new S(this),this.locale=new P(this),this.resize=null,this.handlePageChange=e=>{let{page:t,pageSize:n}=e.detail;queueMicrotask(()=>{e.defaultPrevented||(this.pagination={...this.pagination,current:t,pageSize:n})})}}static{this.tagName=`minerva-data-table`}static{this.dependencies=[Ur]}static{this.styles=[D,y`
:host{
display: block;
min-width: 0;
}
.retry{
align-self: center;
}
.sortIcon{
display: inline-flex;
}
`,b(Dr),b(Jt)]}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect(),this.resize=null}keyOf(e,t){let n=this.rowKey;return typeof n==`function`?n(e,t):typeof n==`string`&&n?e[n]:t}entries(){return(this.rows??[]).map((e,t)=>({row:e,index:t,key:this.keyOf(e,t)}))}rowDisabled(e){return!!this.isRowDisabled?.(e)}willUpdate(t){if(N&&(t.has(`rows`)||t.has(`rowKey`))){let t=this.entries().map(e=>e.key);new Set(t).size!==t.length&&A(e.tagName,`rows have duplicate keys: set row-key to a unique field (or a function).`)}}updated(){this.observeOverflow();let e=this.shadowRoot?.querySelector(`minerva-pagination`);e&&this.pagination&&Object.assign(e,this.pagination)}observeOverflow(){let e=this.wrapper;if(!e){this.resize?.disconnect(),this.resize=null;return}let t=()=>{let t=e.scrollWidth>e.clientWidth||e.scrollHeight>e.clientHeight;t!==this.overflowing&&(this.overflowing=t)};t(),!this.resize&&typeof ResizeObserver<`u`&&(this.resize=new ResizeObserver(t),this.resize.observe(e),e.firstElementChild&&this.resize.observe(e.firstElementChild))}changeSort(e){let t=xe(this.sortState,e);this.emit(`minerva-sort-change`,t,{cancelable:!0})&&(this.sortState=t)}commitSelection(e){let t=new Set(e),n={selectedRowKeys:e,selectedRows:this.entries().filter(e=>t.has(e.key)).map(e=>e.row)};if(!this.emit(`minerva-selection-change`,n,{cancelable:!0})){this.requestUpdate();return}this.selectedRowKeys=e}toggleRow(e,t){let n=this.selectedRowKeys;this.commitSelection(t?[...n.filter(t=>t!==e),e]:n.filter(t=>t!==e))}renderTable(){let e=this.columns??[],t=this.locale.t,n=_e(e),r=this.selectable,i=r&&e[0]?.fixed===`left`,a=i?Pa:0,o=this.entries(),s=this.sortState,ee=s?.order??null,te=ee===null?void 0:e.find(e=>e.key===s?.key),ne=te?Ye(te):null,re=!this.manualSort&&ne?[...o].sort((e,t)=>ee===`descend`?ne(t.row,e.row):ne(e.row,t.row)):o,ie=new Set(this.selectedRowKeys),ae=o.filter(e=>!this.rowDisabled(e.row)),oe=ae.length>0&&ae.every(e=>ie.has(e.key)),se=!oe&&o.some(e=>ie.has(e.key)),ce=()=>{let e=new Set(ae.map(e=>e.key)),t=this.selectedRowKeys;this.commitSelection(oe?t.filter(t=>!e.has(t)):[...t,...ae.map(e=>e.key).filter(e=>!ie.has(e))])},le=e=>{let t={textAlign:e.align},r=Ma(e.width);return r!==void 0&&(t.width=r,t.minWidth=r),e.fixed===`left`?t.left=`${(n.leftOffsets[e.key]??0)+a}px`:e.fixed===`right`&&(t.right=`${n.rightOffsets[e.key]??0}px`),t},ue=e=>e.fixed===`left`&&e.key===n.lastLeftFixedKey?`left`:e.fixed===`right`&&e.key===n.firstRightFixedKey?`right`:d,de=v({width:`${Pa}px`,minWidth:`${Pa}px`,...i?{left:`0px`}:{}}),fe=i?`left`:d,pe=e.length+ +!!r,me=e=>{if(!e.sortable)return f`<th
part="header-cell"
scope="col"
style=${v(le(e))}
data-ellipsis=${e.ellipsis?`true`:d}
data-fixed=${e.fixed??d}
data-fixed-edge=${ue(e)}
>
${e.header}
</th>`;let t=s?.key===e.key?s.order:null,n=t===`ascend`?Ft:t===`descend`?Cn:Mn,r=t?Na[t]:`none`;return f`<th
part=${zr(`header-cell`,{sort:r})}
scope="col"
aria-sort=${r}
data-sort=${r}
style=${v(le(e))}
data-ellipsis=${e.ellipsis?`true`:d}
data-fixed=${e.fixed??d}
data-fixed-edge=${ue(e)}
>
<button
type="button"
part="sort-button"
class="sortButton"
@click=${()=>this.changeSort(e.key)}
>
<span class="sortLabel">${e.header}</span
><span class="sortIcon" aria-hidden="true">${n}</span>
</button>
</th>`},he;he=this.loading?Array.from({length:this.loadingRows},()=>f`<tr part="row" aria-hidden="true">
${r?f`<td
part="cell"
class="selectionCell"
style=${de}
data-fixed=${fe}
></td>`:d}
${e.map(e=>f`<td
part="cell"
style=${v(le(e))}
data-fixed=${e.fixed??d}
data-fixed-edge=${ue(e)}
>
<span part="skeleton" class="skeleton"></span>
</td>`)}
</tr>`):o.length===0?f`<tr part="row">
<td part="empty" colspan=${pe} class="empty">
<slot name="empty">${this.emptyText??t(`table.empty`)}</slot>
</td>
</tr>`:at(re,e=>e.key,({row:n,index:i,key:a},o)=>{let s=r&&ie.has(a);return f`<tr
part=${zr(`row`,{selected:s})}
aria-selected=${s?`true`:d}
?data-selected=${s}
>
${r?f`<td
part="cell"
class="selectionCell"
style=${de}
data-fixed=${fe}
>
<input
type="checkbox"
part="checkbox"
class="checkbox"
.checked=${st(s)}
?disabled=${this.rowDisabled(n)}
aria-label=${t(`table.selectRow`,{row:this.getRowLabel?.(n,i)??String(a)})}
@change=${e=>this.toggleRow(a,e.target.checked)}
/>
</td>`:d}
${e.map(e=>f`<td
part="cell"
style=${v(le(e))}
data-ellipsis=${e.ellipsis?`true`:d}
data-fixed=${e.fixed??d}
data-fixed-edge=${ue(e)}
>
${e.render?e.render(n,o):n[e.key]}
</td>`)}
</tr>`});let ge=Ma(this.scrollX),ve=Ma(this.scrollY),ye=!!(ge||ve)||this.overflowing,be=this.aria.label;return f`<div
part="viewport"
class=${_({wrapper:!0,wrapperBordered:this.variant===`bordered`,wrapperScrollY:!!ve})}
role=${ye?`region`:d}
tabindex=${ye?0:d}
aria-label=${ye?be??t(`table.scrollRegion`):d}
style=${v(ve?{maxHeight:ve,overflowY:`auto`}:{})}
>
<table
part="table"
class=${_({table:!0,[this.size]:!0,[this.variant]:!0,hoverable:this.hoverable,scrollX:!!ge})}
style=${v(ge?{minWidth:ge}:{})}
aria-label=${be??d}
aria-description=${this.aria.description??d}
>
<thead>
<tr part="row">
${r?f`<th
part="header-cell"
scope="col"
class="selectionCell"
style=${de}
data-fixed=${fe}
>
<input
type="checkbox"
part="checkbox"
class="checkbox"
.checked=${st(oe)}
.indeterminate=${se}
?disabled=${ae.length===0||this.loading}
aria-label=${t(`table.selectAll`)}
@change=${ce}
/>
</th>`:d}
${e.map(me)}
</tr>
</thead>
<tbody>
${he}
</tbody>
</table>
</div>`}hookStates(){return{loading:this.loading,size:this.size,variant:this.variant}}render(){let e=!!this.error&&!this.loading;return f`<div
part="root"
class="dataTable"
aria-busy=${this.loading?`true`:d}
>
${e?f`<div part="error" class="error" role="alert">
<div class="errorTitle">
<slot name="error">${this.error}</slot>
</div>
${this.retryable?f`<button
type="button"
part="retry-button"
class="customButton neutral variant-outline small retry"
@click=${()=>this.emit(`minerva-retry`)}
>
<span class="label"
><span class="retryIcon" aria-hidden="true"
>${kn}</span
>${this.retryLabel??this.locale.t(`table.retry`)}</span
>
</button>`:d}
</div>`:f`${this.renderTable()}
${this.pagination?f`<minerva-pagination
part="pagination"
exportparts="root: pagination-root, item: pagination-item"
@minerva-page-change=${this.handlePageChange}
></minerva-pagination>`:d}`}
</div>`}},F([h({attribute:!1})],K.prototype,`columns`,void 0),F([h({attribute:!1})],K.prototype,`rows`,void 0),F([h({attribute:`row-key`})],K.prototype,`rowKey`,void 0),F([h({attribute:`empty-text`})],K.prototype,`emptyText`,void 0),F([h({type:Boolean,reflect:!0})],K.prototype,`loading`,void 0),F([h({type:Number,attribute:`loading-rows`})],K.prototype,`loadingRows`,void 0),F([h({attribute:!1})],K.prototype,`sortState`,void 0),F([h({type:Boolean,attribute:`manual-sort`})],K.prototype,`manualSort`,void 0),F([h({type:Boolean,reflect:!0})],K.prototype,`selectable`,void 0),F([h({attribute:!1})],K.prototype,`selectedRowKeys`,void 0),F([h({attribute:!1})],K.prototype,`isRowDisabled`,void 0),F([h({attribute:!1})],K.prototype,`getRowLabel`,void 0),F([h({reflect:!0})],K.prototype,`size`,void 0),F([h({reflect:!0})],K.prototype,`variant`,void 0),F([h({type:Boolean,reflect:!0})],K.prototype,`hoverable`,void 0),F([h({attribute:`scroll-x`})],K.prototype,`scrollX`,void 0),F([h({attribute:`scroll-y`})],K.prototype,`scrollY`,void 0),F([h({attribute:!1})],K.prototype,`pagination`,void 0),F([h()],K.prototype,`error`,void 0),F([h({type:Boolean})],K.prototype,`retryable`,void 0),F([h({attribute:`retry-label`})],K.prototype,`retryLabel`,void 0),F([u()],K.prototype,`overflowing`,void 0),F([g(`.wrapper`)],K.prototype,`wrapper`,void 0),Fa=class extends O{constructor(...e){super(...e),this.primary=``,this.monospace=!1,this.maxWidth=360,this.observer=null}static{this.tagName=`minerva-table-cell-content`}static{this.styles=[D,y`
:host{
display: block;
min-width: 0;
}
`,b(Jt)]}hasSecondarySlot(){return Array.from(this.children).some(e=>e.getAttribute(`slot`)===`secondary`)}connectedCallback(){super.connectedCallback(),this.observer??=typeof MutationObserver>`u`?null:new MutationObserver(()=>this.requestUpdate()),this.observer?.observe(this,{childList:!0})}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}render(){let e=this.secondary!==void 0&&this.secondary!==null||this.hasSecondarySlot(),t=_({cellPrimary:!0,cellMono:this.monospace,cellStrong:e}),n=f`<slot>${this.primary}</slot>`;return f`<div
part="root"
class="cellContent"
style=${v({maxWidth:Ma(this.maxWidth)})}
>
${this.monospace?f`<code part="primary" class=${t}>${n}</code>`:f`<div part="primary" class=${t}>${n}</div>`}
${e?f`<div part="secondary" class="cellSecondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:d}
</div>`}},F([h()],Fa.prototype,`primary`,void 0),F([h()],Fa.prototype,`secondary`,void 0),F([h({type:Boolean,reflect:!0})],Fa.prototype,`monospace`,void 0),F([h({attribute:`max-width`})],Fa.prototype,`maxWidth`,void 0)})))()}var La,Ra;function za(){return(za=e((()=>{E(),T(),C(),gn(),c(),l(),m(),La=class extends O{constructor(...e){super(...e),this.label=``}static{this.tagName=`minerva-description-item`}static{this.styles=[D,y`
:host{
display: contents;
}
`]}render(){return f`<slot></slot>`}},F([h({reflect:!0})],La.prototype,`label`,void 0),Ra=class e extends O{constructor(...e){super(...e),this.items=[],this.bordered=!1,this.striped=!1,this.observer=null}static{this.tagName=`minerva-description-list`}static{this.dependencies=[La]}static{this.shadowRootOptions={...O.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[D,y`
:host{
display: block;
}
`,b(dn)]}declarativeItems(){return Array.from(this.children).filter(e=>e.localName===La.tagName)}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,attributes:!0,subtree:!0,attributeFilter:[`label`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}updated(){let t=this.declarativeItems();if(Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,n)=>{let r=t[n];r&&typeof e.assign==`function`&&e.assign(r)}),N){let t=Array.from(this.children).filter(e=>e.localName!==La.tagName);t.length&&A(e.tagName,`only <minerva-description-item> children are rendered (ignored: <${t[0].localName}>).`)}}render(){let e=this.declarativeItems();return f`<dl
part="root"
class=${_({descriptionList:!0,bordered:this.bordered,striped:this.striped})}
>
${(this.items??[]).map(e=>f`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description">${e.value}</dd>
</div>`)}
${e.map(e=>f`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description"><slot data-item></slot></dd>
</div>`)}
</dl>`}},F([h({attribute:!1})],Ra.prototype,`items`,void 0),F([h({type:Boolean,reflect:!0})],Ra.prototype,`bordered`,void 0),F([h({type:Boolean,reflect:!0})],Ra.prototype,`striped`,void 0)})))()}var Ba,Va;function Ha(){return(Ha=e((()=>{E(),T(),fr(),C(),ln(),c(),l(),m(),p(),Ba=e=>typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Va=class e extends O{constructor(...e){super(...e),this.variant=`solid`,this.orientation=`horizontal`,this.thickness=1,this.spacing=16,this.textAlign=`center`,this.elevation=!1,this.flexItem=!1,this.slots=new j(this)}static{this.tagName=`minerva-divider`}static{this.styles=[D,y`
:host{
display: block;
width: 100%;
}
:host([orientation="vertical"]){
display: inline-flex;
width: auto;
vertical-align: middle;
}
:host([orientation="vertical"][flex-item]){
align-self: stretch;
}
`,b(ir)]}hookStates(){let e=this.orientation===`horizontal`&&this.slots.test(`[default]`);return{orientation:this.orientation,variant:this.variant,align:e?this.textAlign:void 0}}updated(){N&&this.orientation===`vertical`&&this.slots.test(`[default]`)&&A(e.tagName,`text is only rendered by horizontal dividers; it is ignored when orientation is vertical.`)}render(){let e=this.orientation===`horizontal`,t=e&&this.slots.test(`[default]`),n=this.textAlign,r={};if(this.thickness!=null&&!Number.isNaN(this.thickness)&&(r.borderWidth=`${this.thickness}px`,r[`--_divider-thickness`]=`${this.thickness}px`),this.length!=null&&this.length!==``&&(r[e?`width`:`height`]=Ba(this.length)),this.spacing!=null&&!Number.isNaN(this.spacing)){let t=`${this.spacing}px`;r.marginTop=e?t:`0`,r.marginBottom=e?t:`0`,r.marginLeft=e?`0`:t,r.marginRight=e?`0`:t}let i=_({divider:!0,[this.variant]:!0,[this.orientation]:!0,withText:t,[`text${n.charAt(0).toUpperCase()}${n.slice(1)}`]:t,elevation:this.elevation,flexItem:this.flexItem});return t?f`<div
part="root"
role="separator"
aria-orientation=${this.orientation}
class=${i}
style=${v(r)}
>
<span class="text" part="label"><slot></slot></span>
</div>`:f`<hr
part="root"
aria-orientation=${this.orientation}
class=${i}
style=${v(r)}
/>`}},F([h({reflect:!0})],Va.prototype,`variant`,void 0),F([h({reflect:!0})],Va.prototype,`orientation`,void 0),F([h({type:Number})],Va.prototype,`thickness`,void 0),F([h()],Va.prototype,`length`,void 0),F([h({type:Number})],Va.prototype,`spacing`,void 0),F([h({attribute:`text-align`})],Va.prototype,`textAlign`,void 0),F([h({type:Boolean,reflect:!0})],Va.prototype,`elevation`,void 0),F([h({type:Boolean,reflect:!0,attribute:`flex-item`})],Va.prototype,`flexItem`,void 0)})))()}var Ua,Wa;function Ga(){return(Ga=e((()=>{k(),E(),M(),Ut(),x(),T(),fr(),C(),ni(),Qr(),ai(),ei(),Hr(),zt(),c(),l(),m(),Ua=[`left`,`right`,`top`,`bottom`],Wa=class e extends O{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.side=`right`,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.nonModal=!1,this.locale=new P(this),this.aria=new S(this),this.slots=new j(this),this.presence=new Vt(this,()=>this.panel),this.modal=new si(this),this.focusScope=new ii(this,()=>({trapped:!this.nonModal,loop:!0,restoreFocus:!0})),this.layer=new ci(this,()=>({disableOutsidePointerEvents:!this.nonModal,branches:()=>[this.triggerElement()],onFocusOutside:()=>this.nonModal,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-drawer-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)}}static{this.tagName=`minerva-drawer`}static{this.styles=[D,ti,y`
:host{
display: contents;
}
`,b(sr)]}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(t){t.has(`open`)&&this.presence.sync(this.open),N&&t.has(`side`)&&!Ua.includes(this.side)&&A(e.tagName,`invalid side "${this.side}" (expected left, right, top or bottom).`)}hookStates(){return{state:this.open?`open`:`closed`,side:Ua.includes(this.side)?this.side:`right`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)||e.has(`nonModal`)&&this.open){let t=this.panel;this.open&&t?(e.has(`nonModal`)&&!e.has(`open`)&&(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate()),Gt(this.overlay),Gt(t),this.nonModal||this.modal.activate(this),this.layer.activate(t),this.focusScope.activate(t),e.has(`open`)&&this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),w(this.panel),w(this.overlay)}afterClose(){w(this.panel),w(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=Ua.includes(this.side)?this.side:`right`;return f`<slot name="trigger"></slot> ${e?f`${this.nonModal?d:f`<div
part="overlay"
class="overlay"
popover="manual"
data-state=${t}
aria-hidden="true"
></div>`}
<div
part="content"
class=${_({content:!0,[i]:!0,[this.size]:!0})}
popover="manual"
role=${this.dialogRole}
aria-modal=${this.nonModal?d:`true`}
aria-labelledby=${n?`title`:d}
aria-label=${n?d:this.aria.label??d}
aria-describedby="description"
tabindex="-1"
data-state=${t}
>
<p
id="description"
part="description"
class=${r?`description`:`visuallyHidden`}
>
${r||this.hiddenDescription||this.locale.t(`drawer.description`)}
</p>
${n?f`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:d}
<div class="body" part="body"><slot></slot></div>
${this.slots.test(`footer`)?f`<div class="footer" part="footer">
<slot name="footer"></slot>
</div>`:d}
${this.hideCloseButton?d:f`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`drawer.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${Kn}
</button>`}
</div>`:d}`}},F([h({type:Boolean,reflect:!0})],Wa.prototype,`open`,void 0),F([h()],Wa.prototype,`label`,void 0),F([h()],Wa.prototype,`description`,void 0),F([h({attribute:`hidden-description`})],Wa.prototype,`hiddenDescription`,void 0),F([h({reflect:!0})],Wa.prototype,`side`,void 0),F([h({reflect:!0})],Wa.prototype,`size`,void 0),F([h({type:Boolean,attribute:`hide-close-button`})],Wa.prototype,`hideCloseButton`,void 0),F([h({attribute:`close-label`})],Wa.prototype,`closeLabel`,void 0),F([h({attribute:`dialog-role`})],Wa.prototype,`dialogRole`,void 0),F([h({type:Boolean,reflect:!0,attribute:`non-modal`})],Wa.prototype,`nonModal`,void 0),F([g(`.content`)],Wa.prototype,`panel`,void 0),F([g(`.overlay`)],Wa.prototype,`overlay`,void 0)})))()}var Ka,qa,Ja,Ya;function Xa(){return(Xa=e((()=>{k(),E(),x(),T(),fr(),C(),mn(),c(),l(),m(),p(),Ka=nt`<svg class="defaultIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke="none" aria-hidden="true" focusable="false"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM5 5v9h4a3 3 0 0 0 6 0h4V5ZM5 16v3h14v-3h-2.54a5 5 0 0 1-8.92 0Z" /></svg>`,qa=nt`<svg class="defaultIcon" aria-hidden="true" focusable="false" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse style="fill: var(--surface-muted-color)" cx="32" cy="33" rx="32" ry="7" /><g fill-rule="nonzero" style="stroke: var(--border-strong-color)"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" /><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" style="fill: var(--surface-color)" /></g></g></svg>`,Ja=e=>e&&/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Ya=class e extends O{constructor(...e){super(...e),this.heading=``,this.hideDescription=!1,this.hideIcon=!1,this.useSvg=!1,this.showShadow=!1,this.locale=new P(this),this.aria=new S(this),this.slots=new j(this)}static{this.tagName=`minerva-empty`}static{this.styles=[D,y`
:host{
display: block;
}
`,b(Wt)]}hookStates(){return{size:this.size}}updated(){N&&this.hideDescription&&this.description&&A(e.tagName,`description is ignored while hide-description is set.`)}render(){let e=!!this.heading||this.slots.test(`heading`),t=this.slots.test(`description`),n=this.description??this.locale.t(`empty.description`),r=!this.hideDescription&&(t||n!==``),i=this.slots.test(`action`)||this.slots.test(`secondary-action`),a=this.aria.label;return f`<div
part="root"
class=${_({empty:!0,showShadow:this.showShadow,sized:!!this.size,[`size-${this.size}`]:!!this.size})}
style=${v({width:Ja(this.width),height:Ja(this.height)})}
role="status"
aria-label=${a??d}
aria-labelledby=${a?d:e?`title`:r?`description`:d}
aria-describedby=${e&&r?`description`:d}
>
${this.hideIcon?d:f`<div part="icon" class="iconWrapper">
<slot name="icon">${this.useSvg?qa:Ka}</slot>
</div>`}
${e?f`<div id="title" part="title" class="title">
<slot name="heading">${this.heading}</slot>
</div>`:d}
${r?f`<div id="description" part="description" class="description">
<slot name="description">${n}</slot>
</div>`:d}
${i?f`<div part="actions" class="actions">
<slot name="action"></slot><slot name="secondary-action"></slot>
</div>`:d}
${this.slots.test(`[default]`)?f`<div part="footer" class="footer"><slot></slot></div>`:d}
</div>`}},F([h()],Ya.prototype,`heading`,void 0),F([h()],Ya.prototype,`description`,void 0),F([h({type:Boolean,attribute:`hide-description`})],Ya.prototype,`hideDescription`,void 0),F([h({type:Boolean,attribute:`hide-icon`})],Ya.prototype,`hideIcon`,void 0),F([h({reflect:!0})],Ya.prototype,`size`,void 0),F([h({type:Boolean,attribute:`use-svg`})],Ya.prototype,`useSvg`,void 0),F([h()],Ya.prototype,`width`,void 0),F([h()],Ya.prototype,`height`,void 0),F([h({type:Boolean,attribute:`show-shadow`})],Ya.prototype,`showShadow`,void 0)})))()}var Za,Qa;function $a(){return($a=e((()=>{E(),T(),fr(),C(),Kt(),c(),l(),Za=e=>e.localName===`minerva-checkbox`||e.localName===`minerva-switch`||e instanceof HTMLInputElement&&(e.type===`checkbox`||e.type===`radio`),Qa=class e extends O{constructor(...e){super(...e),this.label=``,this.helperText=``,this.errorMessage=``,this.invalid=!1,this.required=!1,this.disabled=!1,this.readOnly=!1,this.requiredIndicator=`*`,this.slots=new j(this),this.observer=null,this.control=null,this.saved=new Map}static{this.tagName=`minerva-form-control`}static{this.styles=[D,y`
:host{
display: block;
}
.label{
cursor: default;
}
`,b(Sn)]}get controlElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.release()}updated(){this.sync()}get labelText(){return this.label?this.label:Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`label`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}slotText(e){return Array.from(this.children).filter(t=>t.getAttribute(`slot`)===e).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}get descriptionText(){return this.invalid?this.errorMessage||this.slotText(`error-message`):this.helperText||this.slotText(`helper-text`)}save(e,t){this.saved.has(e)||this.saved.set(e,t)}setAttr(e,t,n){let r=`@${t}`;if(n===null){if(!this.saved.has(r))return;let n=this.saved.get(r);this.saved.delete(r),n===null?e.removeAttribute(t):e.setAttribute(t,n);return}this.save(r,e.getAttribute(t)),e.getAttribute(t)!==n&&e.setAttribute(t,n)}setProp(e,t,n){let r=`.${t}`;if(!n){if(!this.saved.has(r))return;e[t]=this.saved.get(r),this.saved.delete(r);return}this.save(r,e[t]),e[t]=!0}propFor(e,t){return{invalid:[`invalid`,`error`],required:[`required`],disabled:[`disabled`],readOnly:[`readOnly`,`readonly`]}[t].find(t=>t in e&&typeof e[t]==`boolean`)??null}release(){let e=this.control;if(e){for(let[t,n]of this.saved)if(t.startsWith(`@`)){let r=t.slice(1);n===null?e.removeAttribute(r):e.setAttribute(r,n)}else e[t.slice(1)]=n;this.saved.clear(),this.control=null}}sync(){let t=this.controlElement;if(t!==this.control&&(this.release(),this.control=t),!t)return;let n=this.labelText,r=this.saved.has(`@aria-label`);n&&(r||!t.hasAttribute(`aria-label`))?this.setAttr(t,`aria-label`,n):n||this.setAttr(t,`aria-label`,null);let i=this.descriptionText;this.setAttr(t,`aria-description`,i||null);for(let e of[`invalid`,`required`,`disabled`,`readOnly`]){let n=this.propFor(t,e);n&&this.setProp(t,n,this[e])}if(this.setAttr(t,`aria-invalid`,this.invalid?`true`:null),this.setAttr(t,`aria-required`,this.required?`true`:null),this.setAttr(t,`aria-readonly`,this.readOnly?`true`:null),N&&this.children.length>0){let t=Array.from(this.children).filter(e=>!e.hasAttribute(`slot`));t.length>1&&A(e.tagName,`wraps ONE control, found ${t.length} elements in the default slot: only the first one is wired.`)}}handleLabelClick(e){let t=this.controlElement;t&&!this.disabled&&(e.preventDefault(),Za(t)?t.click():t.focus())}hookStates(){return{disabled:this.disabled,invalid:this.invalid,readonly:this.readOnly,required:this.required}}render(){let e=!!this.label||this.slots.test(`label`),t=!!this.helperText||this.slots.test(`helper-text`),n=!!this.errorMessage||this.slots.test(`error-message`);return f`<div class="root" part="root">
${e?f`<label
id="label"
class="label"
part="label"
@click=${this.handleLabelClick}
>${this.label||f`<slot name="label"></slot>`}${this.required?f`<span
class="required"
part="required-indicator"
aria-hidden="true"
>${this.requiredIndicator}</span
>`:d}</label
>`:d}
<slot @slotchange=${()=>this.sync()}></slot>
${!this.invalid&&t?f`<div id="helper" class="helper" part="helper-text">
${this.helperText||f`<slot name="helper-text"></slot>`}
</div>`:d}
${this.invalid&&n?f`<div
id="error"
class="error"
part="error-message"
role="alert"
>
${this.errorMessage||f`<slot name="error-message"></slot>`}
</div>`:d}
</div>`}},F([h()],Qa.prototype,`label`,void 0),F([h({attribute:`helper-text`})],Qa.prototype,`helperText`,void 0),F([h({attribute:`error-message`})],Qa.prototype,`errorMessage`,void 0),F([h({type:Boolean,reflect:!0})],Qa.prototype,`invalid`,void 0),F([h({type:Boolean,reflect:!0})],Qa.prototype,`required`,void 0),F([h({type:Boolean,reflect:!0})],Qa.prototype,`disabled`,void 0),F([h({type:Boolean,reflect:!0,attribute:`readonly`})],Qa.prototype,`readOnly`,void 0),F([h({attribute:`required-indicator`})],Qa.prototype,`requiredIndicator`,void 0)})))()}var eo;function to(){return(to=e((()=>{T(),C(),Ai(),Pr(),bn(),Yr(),c(),l(),p(),eo=class e extends O{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-form-layout`}static{this.styles=[D,y`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,b(Ht),b(Lr)]}render(){let t=Xr(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return f`<div class="root" part="root" style=${v(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},F([h({converter:Zr})],eo.prototype,`columns`,void 0),F([h({converter:ki})],eo.prototype,`gap`,void 0),F([h({attribute:`row-gap`,converter:ki})],eo.prototype,`rowGap`,void 0),F([h({attribute:`column-gap`,converter:ki})],eo.prototype,`columnGap`,void 0)})))()}function no(e){let t=``;if(e&&typeof window<`u`){let n=rt(window);n.isSupported&&(n.addHook(`uponSanitizeAttribute`,(e,t)=>{t.attrName===`src`&&(e.nodeName!==`IMG`||!/^data:image\/(?:png|jpeg|gif|webp|avif);base64,[a-z0-9+/=\s]+$/i.test(t.attrValue))&&(t.keepAttr=!1)}),n.sanitize(ao,io)===oo&&(t=n.sanitize(e,io)))}return`<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="${ro}"><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${t}</body></html>`}var ro,io,ao,oo;function so(){return(so=e((()=>{tt(),ro=`default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; object-src 'none'; frame-src 'none'; font-src 'none'; media-src 'none'; form-action 'none'; base-uri 'none'`,io={ALLOWED_TAGS:`a abbr b bdi bdo blockquote br caption center code col colgroup dd del div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i img ins li ol p pre s section small span strong style sub sup table tbody td tfoot th thead tr u ul wbr`.split(` `),ALLOWED_ATTR:`alt title class style lang dir role width height align valign bgcolor border cellpadding cellspacing colspan rowspan scope src`.split(` `),ALLOW_DATA_ATTR:!1,ALLOW_ARIA_ATTR:!0,FORBID_TAGS:[`base`,`meta`,`link`,`script`,`form`,`input`,`button`,`iframe`,`object`,`embed`,`svg`,`math`],FORBID_ATTR:[`href`,`srcdoc`,`srcset`,`action`,`formaction`,`target`,`ping`,`id`,`name`],FORCE_BODY:!0,RETURN_TRUSTED_TYPE:!1},ao=`<p title="t" onclick="x()">ok</p><script>x()<\/script><img alt="a" src="https://x.invalid/p" onerror="x()">`,oo=`<p title="t">ok</p><img alt="a">`})))()}var co;function lo(){return(lo=e((()=>{k(),E(),T(),C(),Bn(),so(),c(),l(),p(),ct(),co=class e extends O{constructor(...e){super(...e),this.html=``,this.label=``,this.viewport=`desktop`,this.mobileWidth=375,this.height=600,this.doc=no(),this.aria=new S(this)}static{this.tagName=`minerva-html-preview`}static{this.styles=[D,y`
:host{
display: block;
}
`,b(Br)]}willUpdate(e){e.has(`html`)&&(this.doc=no(this.html))}updated(){N&&!this.label&&!this.aria.label&&A(e.tagName,`set label (or aria-label): the iframe needs a title for assistive technologies.`)}render(){let e=Number.isFinite(this.mobileWidth)&&this.mobileWidth>0?this.mobileWidth:375,t=Number.isFinite(this.height)&&this.height>0?this.height:600;return f`<div part="root" class="preview">
${it(this.doc,f`<iframe
part="frame"
class="frame"
title=${this.label||this.aria.label||``}
sandbox=""
referrerpolicy="no-referrer"
srcdoc=${this.doc}
style=${v({width:this.viewport===`mobile`?`${e}px`:`100%`,height:`${t}px`})}
></iframe>`)}
</div>`}},F([h()],co.prototype,`html`,void 0),F([h()],co.prototype,`label`,void 0),F([h({reflect:!0})],co.prototype,`viewport`,void 0),F([h({type:Number,attribute:`mobile-width`})],co.prototype,`mobileWidth`,void 0),F([h({type:Number})],co.prototype,`height`,void 0),F([u()],co.prototype,`doc`,void 0)})))()}var uo,fo,q;function po(){return(po=e((()=>{k(),E(),M(),x(),zn(),T(),C(),Pn(),ai(),Mr(),c(),l(),m(),uo=200,fo=300,q=class e extends O{constructor(...e){super(...e),this.color=`neutral`,this.variant=`ghost`,this.size=`medium`,this.shape=`circle`,this.disabled=!1,this.loading=!1,this.toggle=!1,this.pressed=!1,this.tooltipPlacement=`top`,this.noTooltip=!1,this.type=`button`,this.tooltipOpen=!1,this.tooltipPositioned=!1,this.internals=Ir(this),this.aria=new S(this),this.locale=new P(this),this.floating=new ri(this,()=>({anchor:()=>this.button,floating:()=>this.tooltipElement,branches:()=>[this],placement:this.tooltipPlacement,offset:{mainAxis:8},dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,onDismiss:()=>this.hideTooltip(),onPosition:()=>{this.tooltipPositioned=!0}})),this.handlePointerEnter=()=>{if(!this.tooltipEnabled||this.tooltipOpen){this.clearTimers();return}this.clearTimers(),this.enterTimer=setTimeout(()=>this.showTooltip(),uo)},this.handlePointerLeave=()=>{this.clearTimers(),this.tooltipOpen&&(this.leaveTimer=setTimeout(()=>this.hideTooltip(),fo))},this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-icon-button`}static{this.formAssociated=!0}static{this.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,ti,y`
:host{
display: inline-flex;
vertical-align: middle;
}
.spinner{
display: inline-flex;
align-items: center;
justify-content: center;
color: currentColor;
}
.spinner svg{
animation: minerva-icon-button-spin 1s linear infinite;
}
.spinner.xsmall{
font-size: var(--progress-size,12px);
}
.spinner.small{
font-size: var(--progress-size,16px);
}
.spinner.medium{
font-size: var(--progress-size,24px);
}
.spinner.large{
font-size: var(--progress-size,32px);
}
@keyframes minerva-icon-button-spin{
to{
transform: rotate(360deg);
}
}
@media (prefers-reduced-motion: reduce){
.spinner svg{
animation: none;
}
}
`,b(Xn),b(Fn)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}get tooltipContent(){return this.tooltip||this.label||void 0}get tooltipEnabled(){return!this.noTooltip&&!!this.tooltipContent&&!this.disabled&&!this.loading}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer)}showTooltip(){this.tooltipEnabled&&(this.clearTimers(),this.tooltipOpen=!0)}hideTooltip(){this.clearTimers(),this.tooltipOpen=!1,this.tooltipPositioned=!1}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}if(this.toggle){let e=!this.pressed;this.emit(`minerva-pressed-change`,{pressed:e},{cancelable:!0})&&(this.pressed=e)}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0),this.clearTimers(),this.tooltipOpen=!1}hookStates(){return{state:this.toggle&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}willUpdate(e){(e.has(`disabled`)||e.has(`loading`)||e.has(`noTooltip`))&&!this.tooltipEnabled&&this.hideTooltip()}updated(){this.floating.sync(this.tooltipOpen&&this.tooltipEnabled),N&&!this.label&&!this.aria.label&&A(e.tagName,`icon buttons only contain an icon: set label (or aria-label) to give them an accessible name.`)}render(){let e=this.tooltipOpen&&this.tooltipEnabled;return f`<button
part="root"
type="button"
class=${_({iconButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape]:!0,disabled:this.disabled,loading:this.loading,pressed:this.toggle&&this.pressed})}
?disabled=${this.disabled}
tabindex=${this.disabled?`-1`:`0`}
aria-label=${this.label??this.aria.label??this.locale.t(`iconButton.default`)}
aria-description=${this.aria.description??d}
aria-describedby=${e?`tooltip`:d}
aria-pressed=${this.toggle?String(this.pressed):d}
aria-expanded=${this.aria.attr(`aria-expanded`)??d}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??d}
aria-busy=${this.loading?`true`:d}
aria-disabled=${this.loading&&!this.disabled?`true`:d}
@click=${this.handleClick}
@mouseenter=${this.handlePointerEnter}
@mouseleave=${this.handlePointerLeave}
@focus=${()=>this.showTooltip()}
@blur=${()=>this.hideTooltip()}
>
${this.loading?f`<span
class=${_({spinner:!0,[this.size]:!0})}
part="spinner"
role="progressbar"
aria-label=${this.locale.t(`common.loading`)}
>${Lt}</span
>`:f`<span class="glyph" part="icon" aria-hidden="true"
><slot></slot
></span>`}
</button>
${e?f`<div
id="tooltip"
part="tooltip"
role="tooltip"
popover="manual"
class=${_({tooltip:!0,neutral:!0,solid:!0,default:!0,"animation-fade":!0,show:this.tooltipPositioned})}
@mouseenter=${()=>this.clearTimers()}
@mouseleave=${this.handlePointerLeave}
>
${this.tooltipContent}
</div>`:d}`}},F([h()],q.prototype,`label`,void 0),F([h({reflect:!0})],q.prototype,`color`,void 0),F([h({reflect:!0})],q.prototype,`variant`,void 0),F([h({reflect:!0})],q.prototype,`size`,void 0),F([h({reflect:!0})],q.prototype,`shape`,void 0),F([h({type:Boolean,reflect:!0})],q.prototype,`disabled`,void 0),F([h({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),F([h({type:Boolean,reflect:!0})],q.prototype,`toggle`,void 0),F([h({type:Boolean,reflect:!0})],q.prototype,`pressed`,void 0),F([h()],q.prototype,`tooltip`,void 0),F([h({attribute:`tooltip-placement`})],q.prototype,`tooltipPlacement`,void 0),F([h({type:Boolean,attribute:`no-tooltip`})],q.prototype,`noTooltip`,void 0),F([h({reflect:!0})],q.prototype,`type`,void 0),F([u()],q.prototype,`tooltipOpen`,void 0),F([u()],q.prototype,`tooltipPositioned`,void 0),F([g(`button`)],q.prototype,`button`,void 0),F([g(`.tooltip`)],q.prototype,`tooltipElement`,void 0)})))()}var mo,J;function ho(){return(ho=e((()=>{k(),E(),M(),x(),T(),fr(),C(),qn(),dr(),c(),l(),m(),lt(),mo=0,J=class e extends yr{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.type=`text`,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.clearable=!1,this.showCharCount=!1,this.passwordVisible=!1,this.countId=`minerva-input-count-${mo++}`,this.locale=new P(this),this.aria=new S(this,()=>this.labels),this.slots=new j(this),this.dirty=!1}static{this.tagName=`minerva-input`}static{this.shadowRootOptions={...yr.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,y`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,b(Hn)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}select(){this.input?.select()}getFormValue(){return this.value}getValidity(){let e=this.input;return e?{flags:Qn(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.passwordVisible=!1}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),N&&t.has(`maxLength`)&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&A(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=this.input.value,this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}clear(){this.value=``,this.input.value=``,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:``}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:``}),this.emit(`minerva-clear`),this.input.focus()}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.type===`password`,r=this.clearable&&this.value!==``&&!t&&!this.readOnly,i=this.passwordVisible?this.hidePasswordLabel??e(`input.hidePassword`):this.showPasswordLabel??e(`input.showPassword`),a=this.showCharCount?this.countId:void 0;return f`<div
part="root"
class=${_({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?f`<span class="addon start" part="prefix"
><slot name="prefix"></slot
></span>`:d}
<input
part="input"
class="field"
.value=${st(this.value)}
type=${n&&this.passwordVisible?`text`:this.type}
name=${this.name||d}
placeholder=${this.placeholder||d}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
minlength=${this.minLength??d}
maxlength=${this.maxLength??d}
pattern=${this.pattern??d}
min=${this.min??d}
max=${this.max??d}
step=${this.step??d}
autocomplete=${this.autocomplete??d}
inputmode=${this.inputmode??d}
aria-label=${this.aria.label??d}
aria-description=${this.aria.description??d}
aria-describedby=${a??d}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:d}
@input=${this.handleInput}
@change=${this.handleChange}
/>
${r?f`<button
part="clear-button"
type="button"
class="action"
aria-label=${this.clearLabel??e(`input.clear`)}
@click=${this.clear}
>
${Kn}
</button>`:d}
${n?f`<button
part="password-toggle"
type="button"
class="action"
aria-label=${i}
?disabled=${t}
@click=${()=>this.passwordVisible=!this.passwordVisible}
>
${this.passwordVisible?nn:Nr}
</button>`:d}
${this.showCharCount?f`<span id=${this.countId} class="count" part="count"
>${this.maxLength!=null&&this.maxLength>=0?`${this.value.length} / ${this.maxLength}`:this.value.length}</span
>`:d}
${this.slots.test(`suffix`)?f`<span class="addon end" part="suffix"
><slot name="suffix"></slot
></span>`:d}
</div>`}},F([h({attribute:!1})],J.prototype,`value`,void 0),F([h({attribute:`value`})],J.prototype,`defaultValue`,void 0),F([h({reflect:!0})],J.prototype,`type`,void 0),F([h({reflect:!0})],J.prototype,`variant`,void 0),F([h({reflect:!0})],J.prototype,`size`,void 0),F([h({type:Boolean,reflect:!0})],J.prototype,`invalid`,void 0),F([h()],J.prototype,`placeholder`,void 0),F([h({type:Boolean,reflect:!0,attribute:`readonly`})],J.prototype,`readOnly`,void 0),F([h({type:Number,attribute:`minlength`})],J.prototype,`minLength`,void 0),F([h({type:Number,attribute:`maxlength`})],J.prototype,`maxLength`,void 0),F([h()],J.prototype,`pattern`,void 0),F([h()],J.prototype,`min`,void 0),F([h()],J.prototype,`max`,void 0),F([h()],J.prototype,`step`,void 0),F([h()],J.prototype,`autocomplete`,void 0),F([h()],J.prototype,`inputmode`,void 0),F([h({type:Boolean,reflect:!0})],J.prototype,`clearable`,void 0),F([h({attribute:`clear-label`})],J.prototype,`clearLabel`,void 0),F([h({type:Boolean,attribute:`show-char-count`})],J.prototype,`showCharCount`,void 0),F([h({attribute:`show-password-label`})],J.prototype,`showPasswordLabel`,void 0),F([h({attribute:`hide-password-label`})],J.prototype,`hidePasswordLabel`,void 0),F([u()],J.prototype,`passwordVisible`,void 0),F([g(`input`)],J.prototype,`input`,void 0)})))()}function go(e){if(!e.trim())return{status:`empty`};try{return JSON.parse(e),{status:`valid`}}catch(e){return{status:`invalid`,error:e instanceof Error?e.message:String(e)}}}function _o(e,t){let a=Math.min(10,Math.max(0,Math.trunc(t)||0));if(a>0)return i(e,n(e,void 0,{tabSize:a,insertSpaces:!0,eol:`
`}));let o=r(e,!0),s=[];for(;o.getPosition()<e.length;){o.scan();let t=o.getTokenOffset();s.push(e.slice(t,t+o.getTokenLength()))}return s.join(``)}var Y;function vo(){return(vo=e((()=>{k(),E(),M(),x(),T(),C(),Pn(),dr(),Zn(),pr(),c(),l(),m(),lt(),t(),Y=class e extends yr{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.rows=8,this.hideToolbar=!1,this.indent=2,this.invalid=!1,this.readOnly=!1,this.placeholder=``,this.focused=!1,this.locale=new P(this),this.aria=new S(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-json-field`}static{this.shadowRootOptions={...yr.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,y`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,b($n),b(Xn),b(br),y`

.toolbar .iconButton{
min-height: 0;
}
.status > svg{
width: 16px;
height: 16px;
}
`]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}formatValue(){go(this.value).status===`valid`&&(this.value=_o(this.value,this.indent))}getFormValue(){return this.value}getValidity(){let e=this.textarea,t=go(this.value);return t.status===`invalid`?{flags:{badInput:!0},message:`${this.invalidLabel??this.locale.t(`jsonField.invalid`)}: ${t.error}`,anchor:e}:this.required&&t.status===`empty`?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:e}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),N&&t.has(`indent`)&&(this.indent<0||this.indent>10)&&A(e.tagName,`indent (${this.indent}) is clamped to 0..10.`)}get locked(){return this.isDisabled||this.readOnly}formatNow(){if(this.locked||go(this.value).status!==`valid`)return;let e=_o(this.value,this.indent);e!==this.value&&(this.dirty=!0,this.value=e,this.emit(`minerva-input`,{value:e}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleInput(){this.locked||(this.dirty=!0,this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value}))}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){let e=!this.focused&&go(this.value).status===`invalid`;return{disabled:this.isDisabled,invalid:e||this.invalid,readonly:this.readOnly,required:this.required}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.focused?{status:`empty`}:go(this.value),r=n.status===`invalid`,i=r||this.invalid,a=this.locked||!this.value.trim(),o=n.status===`valid`?this.validLabel??e(`jsonField.valid`):n.status===`invalid`?`${this.invalidLabel??e(`jsonField.invalid`)}: ${n.error}`:``,s=[this.aria.description,r?o:void 0].filter(Boolean).join(` `);return f`<div class="root" part="root">
      ${this.hideToolbar?d:f`<div class="toolbar" part="toolbar">
              <button
                part="format-button"
                type="button"
                class=${_({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:a})}
                ?disabled=${a}
                tabindex=${a?`-1`:`0`}
                aria-label=${this.formatLabel??e(`jsonField.format`)}
                @click=${this.formatNow}
              >
                ${Zt}
              </button>
            </div>`}
      <textarea
        part="input"
        class=${_({textarea:!0,outline:!0,medium:!0,invalid:i})}
        style="resize: none"
        rows=${this.rows}
        spellcheck="false"
        .value=${st(this.value)}
        name=${this.name||d}
        placeholder=${this.placeholder||d}
        ?disabled=${t}
        ?readonly=${this.readOnly}
        ?required=${this.required}
        aria-label=${this.aria.label??d}
        aria-description=${s||d}
        aria-invalid=${i?`true`:d}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @focus=${()=>this.focused=!0}
        @blur=${()=>this.focused=!1}
      ></textarea>
      <div
        part="status"
        role="status"
        aria-live="polite"
        class=${_({status:!0,statusInvalid:r})}
      >
        ${n.status===`valid`?f`${Cr}<span>${o}</span>`:n.status===`invalid`?f`${Bt}<span>${o}</span>`:d}
      </div>
    </div>`}},F([h({attribute:!1})],Y.prototype,`value`,void 0),F([h({attribute:`value`})],Y.prototype,`defaultValue`,void 0),F([h({type:Number})],Y.prototype,`rows`,void 0),F([h({type:Boolean,attribute:`hide-toolbar`})],Y.prototype,`hideToolbar`,void 0),F([h({type:Number})],Y.prototype,`indent`,void 0),F([h({type:Boolean,reflect:!0})],Y.prototype,`invalid`,void 0),F([h({type:Boolean,reflect:!0,attribute:`readonly`})],Y.prototype,`readOnly`,void 0),F([h()],Y.prototype,`placeholder`,void 0),F([h({attribute:`format-label`})],Y.prototype,`formatLabel`,void 0),F([h({attribute:`valid-label`})],Y.prototype,`validLabel`,void 0),F([h({attribute:`invalid-label`})],Y.prototype,`invalidLabel`,void 0),F([u()],Y.prototype,`focused`,void 0),F([g(`textarea`)],Y.prototype,`textarea`,void 0)})))()}function yo(e){if(!e)return[];try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>e&&typeof e==`object`).map(e=>({id:typeof e.id==`string`?e.id:``,key:String(e.key??``),value:String(e.value??``)}));if(t&&typeof t==`object`)return Object.entries(t).map(([e,t])=>({id:``,key:e,value:typeof t==`string`?t:JSON.stringify(t)}))}catch{}return[]}var bo,xo;function So(){return(So=e((()=>{k(),E(),M(),x(),jr(),T(),C(),Pn(),dr(),Ii(),$a(),Yn(),Gr(),c(),l(),ft(),bo=0,xo=class e extends yr{constructor(...e){super(...e),this.value=[],this.defaultValue=[],this.editorId=`kv-${bo++}`,this.nextId=0,this.dirty=!1,this.pendingFocus=null,this.locale=new P(this),this.aria=new S(this,()=>this.labels)}static{this.tagName=`minerva-key-value-editor`}static{this.dependencies=[V,Qa,Wr]}static{this.styles=[D,y`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,b(Xn),b(Wn),y`

.key{
--textarea-min-height: var(
--key-value-editor-control-height,
var(--control-height-sm)
);
}
`]}focus(e){(this.renderRoot.querySelector(`minerva-textarea`)??this.renderRoot.querySelector(`minerva-button`))?.focus(e)}getFormValue(){return JSON.stringify(this.value.map(({key:e,value:t})=>({key:e,value:t})))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.renderRoot.querySelector(`minerva-button`)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=yo(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)&&(this.value.some(e=>!e.id)&&(this.value=this.value.map(e=>e.id?e:{...e,id:this.newId()})),N)){let t=this.value.map(e=>e.id);new Set(t).size!==t.length&&A(e.tagName,`entries have duplicate ids: rows are tracked by id, make them unique.`)}}updated(e){super.updated(e);let t=this.pendingFocus;if(!t)return;this.pendingFocus=null;let n=e=>this.value.some(t=>t.id===e),r=e=>Array.from(this.renderRoot.querySelectorAll(`[data-entry-id]`)).find(t=>e!==void 0&&t.dataset.entryId===e)??null;if(t.kind===`add`){let e=n(t.id)?r(t.id)?.querySelector(`.key`):null;e&&e.updateComplete.then(()=>e.focus())}else n(t.id)||(r(t.nextId)?.querySelector(`.remove`)??this.renderRoot.querySelector(`minerva-button`))?.focus()}newId(){let e;do e=`${this.editorId}-${this.nextId++}`;while(this.value.some(t=>t.id===e));return e}commit(e){this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e})}add(){if(this.isDisabled)return;let e=this.newId();this.pendingFocus={kind:`add`,id:e},this.commit([...this.value,{id:e,key:``,value:``}])}removeEntry(e){if(this.isDisabled)return;let t=this.value.findIndex(t=>t.id===e),n=this.value[t+1]??this.value[t-1];this.pendingFocus={kind:`remove`,id:e,nextId:n?.id},this.commit(this.value.filter(t=>t.id!==e))}handleInput(e,t,n){if(e.stopPropagation(),this.isDisabled)return;let r=e.target.value;this.dirty=!0,this.value=this.value.map(e=>e.id===t?{...e,[n]:r}:e),this.emit(`minerva-input`,{value:this.value})}handleFieldChange(e){e.stopPropagation(),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}isRowInvalid(e){let t=this.errors?.[e.id];return!!(t?.key||t?.value)}renderField(e,t,n,r){let i=this.errors?.[e.id]?.[n];return f`<minerva-form-control
?disabled=${this.isDisabled}
?invalid=${!!i}
error-message=${i??``}
>
<span slot="label"
>${r}<span class="srOnly"> ${t+1}</span></span
>
<minerva-textarea
class=${n===`key`?`key`:``}
size="small"
rows=${n===`key`?1:2}
.value=${e[n]}
@minerva-input=${t=>this.handleInput(t,e.id,n)}
@minerva-change=${this.handleFieldChange}
></minerva-textarea>
</minerva-form-control>`}hookStates(){return{disabled:this.isDisabled}}render(){let{t:e}=this.locale,t=this.keyLabel??e(`keyValueEditor.key`),n=this.valueLabel??e(`keyValueEditor.value`),r=this.removeLabel??e(`keyValueEditor.remove`),i=this.isDisabled,a=this.aria.label;return f`<div
class="root"
part="root"
role=${a?`group`:d}
aria-label=${a??d}
aria-description=${this.aria.description??d}
>
${at(this.value,e=>e.id,(e,a)=>f`<div
class="row"
part=${zr(`row`,{invalid:this.isRowInvalid(e)})}
data-entry-id=${e.id}
>
${this.renderField(e,a,`key`,t)}
${this.renderField(e,a,`value`,n)}
<button
part="remove-button"
type="button"
class="remove iconButton neutral variant-ghost small square ${i?`disabled`:``}"
aria-label=${`${r} ${a+1}`}
?disabled=${i}
@click=${()=>this.removeEntry(e.id)}
>
${Kn}
</button>
</div>`)}
<minerva-button
part="add-button"
class="add"
color="neutral"
variant="outline"
size="small"
?disabled=${i}
@click=${this.add}
>
<span slot="start">${_n}</span>
<span>${this.addLabel??e(`keyValueEditor.add`)}</span>
</minerva-button>
</div>`}},F([h({attribute:!1})],xo.prototype,`value`,void 0),F([h({attribute:`value`,converter:{fromAttribute:e=>yo(e)}})],xo.prototype,`defaultValue`,void 0),F([h({attribute:`key-label`})],xo.prototype,`keyLabel`,void 0),F([h({attribute:`value-label`})],xo.prototype,`valueLabel`,void 0),F([h({attribute:`add-label`})],xo.prototype,`addLabel`,void 0),F([h({attribute:`remove-label`})],xo.prototype,`removeLabel`,void 0),F([h({attribute:!1})],xo.prototype,`errors`,void 0)})))()}var Co,wo;function To(){return(To=e((()=>{k(),E(),zn(),T(),fr(),C(),kr(),c(),l(),m(),Co=class e extends O{constructor(...e){super(...e),this.density=`default`,this.bordered=!1,this.noDividers=!1,this.internals=Ir(this)}static{this.tagName=`minerva-list`}static{this.styles=[D,y`
:host{
display: block;

--_minerva-list-item-min-height: initial;
--_minerva-list-item-padding-y: initial;
}
:host([density="compact"]){
--_minerva-list-item-min-height: calc(
2 * var(--row-padding-y) + 1.5rem
);
--_minerva-list-item-padding-y: var(--row-padding-y);
}
:host([density="comfortable"]){
--_minerva-list-item-min-height: calc(
2 * var(--row-padding-y) + 3.5rem
);
--_minerva-list-item-padding-y: calc(
var(--row-padding-y) + var(--space-2)
);
}

:host([bordered]) ::slotted(minerva-list-item){
transition: background-color var(--transition-fast);
}
:host([bordered]) ::slotted(minerva-list-item:hover),
:host([bordered]) ::slotted(minerva-list-item:focus-within){
background-color: var(
--list-item-hover-background,
var(--surface-subtle-color)
);
}

::slotted(minerva-list-item){
--_list-divider: 0;
}
:host(:not([no-dividers]))
::slotted(minerva-list-item:not(:first-child)){
--_list-divider: 1;
}
`,b(lr)]}connectedCallback(){super.connectedCallback(),Rt(this,this.internals,{role:`list`})}updated(){if(N){let t=Array.from(this.children).find(e=>e.localName!==wo.tagName);t&&A(e.tagName,`children should be <minerva-list-item> elements (found <${t.localName}>): other elements break the list semantics.`)}}render(){return f`<div
part="root"
class=${_({list:!0,compact:this.density===`compact`,comfortable:this.density===`comfortable`,bordered:this.bordered,dividers:!this.noDividers})}
>
<slot @slotchange=${()=>this.requestUpdate()}></slot>
</div>`}},F([h({reflect:!0})],Co.prototype,`density`,void 0),F([h({type:Boolean,reflect:!0})],Co.prototype,`bordered`,void 0),F([h({type:Boolean,reflect:!0,attribute:`no-dividers`})],Co.prototype,`noDividers`,void 0),wo=class extends O{constructor(...e){super(...e),this.primary=``,this.secondary=``,this.internals=Ir(this),this.slots=new j(this)}static{this.tagName=`minerva-list-item`}static{this.styles=[D,b(lr),y`
:host{
display: block;
}

.item{
min-height: var(
--list-item-min-height,
var(
--_minerva-list-item-min-height,
calc(2 * var(--row-padding-y) + 2.5rem)
)
);
padding-block: var(
--list-item-padding-y,
var(
--_minerva-list-item-padding-y,
calc(var(--row-padding-y) + var(--space-1))
)
);
}
`]}connectedCallback(){super.connectedCallback(),Rt(this,this.internals,{role:`listitem`})}render(){let e=this.secondary!==``||this.slots.test(`secondary`);return f`<div part="root" class="item">
${this.slots.test(`icon`)?f`<div part="icon" class="icon" aria-hidden="true">
<slot name="icon"></slot>
</div>`:d}
<div class="content">
<div part="label" class="primary"><slot>${this.primary}</slot></div>
${e?f`<div part="description" class="secondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:d}
</div>
${this.slots.test(`actions`)?f`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:d}
</div>`}},F([h()],wo.prototype,`primary`,void 0),F([h()],wo.prototype,`secondary`,void 0)})))()}var Eo,Do;function Oo(){return(Oo=e((()=>{E(),x(),T(),C(),_r(),Jr(),c(),l(),m(),Eo=[`small`,`medium`,`large`],Do=class e extends O{constructor(...e){super(...e),this.size=`medium`,this.locale=new P(this)}static{this.tagName=`minerva-loading-state`}static{this.dependencies=[qr]}static{this.styles=[D,y`
:host{
display: block;
}
`,b(Ln)]}hookStates(){return{size:this.size}}updated(){N&&!Eo.includes(this.size)&&A(e.tagName,`unknown size "${this.size}" (expected ${Eo.join(`, `)}).`)}render(){return f`<div
part="root"
class=${_({loadingState:!0,[this.size]:!0})}
role="status"
aria-live="polite"
aria-atomic="true"
>
<minerva-progress
part="spinner"
class="indicator"
color="current"
decorative
></minerva-progress>
<span part="label" class="label"
><slot>${this.label??this.locale.t(`loadingState.label`)}</slot></span
>
</div>`}},F([h()],Do.prototype,`label`,void 0),F([h({reflect:!0})],Do.prototype,`size`,void 0)})))()}function ko(e){let t=Array.from(e.childNodes).filter(e=>!Bo(e)&&(e.nodeType!==1||e.getAttribute(`slot`)!==`icon`));return t.every(e=>e.nodeType===3)?t.map(e=>e.textContent??``).join(``).trim():t.map(e=>e.cloneNode(!0))}function Ao(e){return{value:Uo(e,`value`)??Ho(e),label:ko(e),textValue:Uo(e,`text-value`),shortcut:Uo(e,`shortcut`),disabled:Wo(e,`disabled`),closeOnSelect:Wo(e,`close-on-select`),element:e}}function jo(e,t=`e`){let n=[],r=null;return Array.from(e.children).forEach((e,i)=>{let a=`${t}-${i}`;switch(e.localName!==Fo.tagName&&(r=null),e.localName){case No.tagName:{let t=jo(e,a),r=e.querySelector(`:scope > [slot='icon']`);n.push({key:Uo(e,`value`)||Ho(e),label:ko(e),textValue:Uo(e,`text-value`),icon:r?r.cloneNode(!0):void 0,shortcut:Uo(e,`shortcut`),disabled:Wo(e,`disabled`),closeOnSelect:!Wo(e,`keep-open`)&&void 0,children:t.length?t:void 0,element:e});break}case Po.tagName:n.push({type:`checkbox`,key:Uo(e,`value`)||Ho(e),label:ko(e),textValue:Uo(e,`text-value`),shortcut:Uo(e,`shortcut`),disabled:Wo(e,`disabled`),checked:Wo(e,`checked`),closeOnSelect:Wo(e,`close-on-select`),element:e});break;case Fo.tagName:{r||(r={type:`radio-group`,key:a,items:[]},n.push(r));let t=Ao(e);r.items.push(t),Wo(e,`checked`)&&(r.value=t.value);break}case Lo.tagName:n.push({type:`separator`,key:a});break;case Ro.tagName:n.push({type:`label`,key:a,label:ko(e)});break;case Io.tagName:{let t=Array.from(e.children),r=Uo(e,`label`);if(t.length>0&&t.every(e=>e.localName===Fo.tagName)){let i=t.map(Ao);n.push({type:`radio-group`,key:a,label:r,items:i,value:i.find(e=>e.element?.hasAttribute(`checked`))?.value,closeOnSelect:Wo(e,`close-on-select`),element:e})}else n.push({type:`group`,key:a,label:r??``,items:jo(e,a)});break}}}),n}var Mo,No,Po,Fo,Io,Lo,Ro,zo,Bo,Vo,Ho,Uo,Wo;function Go(){return(Go=e((()=>{T(),c(),l(),Mo=y`
:host{
display: none !important;
}
`,No=class extends O{constructor(...e){super(...e),this.value=``,this.disabled=!1,this.shortcut=``,this.textValue=``,this.keepOpen=!1}static{this.tagName=`minerva-menu-item`}static{this.styles=Mo}},F([h({reflect:!0})],No.prototype,`value`,void 0),F([h({type:Boolean,reflect:!0})],No.prototype,`disabled`,void 0),F([h()],No.prototype,`shortcut`,void 0),F([h({attribute:`text-value`})],No.prototype,`textValue`,void 0),F([h({type:Boolean,attribute:`keep-open`})],No.prototype,`keepOpen`,void 0),Po=class extends O{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-checkbox-item`}static{this.styles=Mo}},F([h({reflect:!0})],Po.prototype,`value`,void 0),F([h({type:Boolean,reflect:!0})],Po.prototype,`checked`,void 0),F([h({type:Boolean,reflect:!0})],Po.prototype,`disabled`,void 0),F([h()],Po.prototype,`shortcut`,void 0),F([h({attribute:`text-value`})],Po.prototype,`textValue`,void 0),F([h({type:Boolean,attribute:`close-on-select`})],Po.prototype,`closeOnSelect`,void 0),Fo=class extends O{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-radio-item`}static{this.styles=Mo}},F([h({reflect:!0})],Fo.prototype,`value`,void 0),F([h({type:Boolean,reflect:!0})],Fo.prototype,`checked`,void 0),F([h({type:Boolean,reflect:!0})],Fo.prototype,`disabled`,void 0),F([h()],Fo.prototype,`shortcut`,void 0),F([h({attribute:`text-value`})],Fo.prototype,`textValue`,void 0),F([h({type:Boolean,attribute:`close-on-select`})],Fo.prototype,`closeOnSelect`,void 0),Io=class extends O{constructor(...e){super(...e),this.label=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-group`}static{this.styles=Mo}},F([h()],Io.prototype,`label`,void 0),F([h({type:Boolean,attribute:`close-on-select`})],Io.prototype,`closeOnSelect`,void 0),Lo=class extends O{static{this.tagName=`minerva-menu-separator`}static{this.styles=Mo}},Ro=class extends O{static{this.tagName=`minerva-menu-label`}static{this.styles=Mo}},zo=[No.tagName,Po.tagName,Fo.tagName,Io.tagName,Lo.tagName,Ro.tagName],Bo=e=>e.nodeType===1&&zo.includes(e.localName),Vo=e=>!!(e.nodeType===1?e:e.parentElement)?.closest(zo.join(`,`)),Ho=e=>Array.from(e.childNodes).filter(e=>!Bo(e)).map(e=>e.textContent??``).join(``).trim(),Uo=(e,t)=>e.getAttribute(t)??void 0,Wo=(e,t)=>e.hasAttribute(t)})))()}var Ko,qo,Jo,Yo,Xo,Zo,Qo,$o,es,ts,ns,rs;function is(){return(is=e((()=>{E(),M(),Ut(),jr(),T(),C(),ni(),oi(),Qr(),ai(),ei(),nr(),Go(),c(),l(),m(),re(),he(),ft(),Ko=100,qo=`[data-minerva-menu-item]`,Jo={mainAxis:4,crossAxis:-5},Yo=e=>e.hasAttribute(`data-disabled`),Xo=e=>e.dataset.textValue??e.querySelector(`.text`)?.textContent??e.textContent??``,Zo=e=>e?Array.from(e.querySelectorAll(qo)):[],Qo=e=>Xe(e,{preventScroll:!0}),$o=e=>typeof e==`string`?e:void 0,es=e=>e.join(`/`),ts=0,ns=class{constructor(e,t,n){this.grace=s(),this.typeahead=Ce(),this.lastTypeahead=0,this.element=null,this.uid=null,this.path=[],this.position=new $r(e,()=>n===0?{placement:t.rootPlacement(),offset:t.rootOffset(),padding:8}:{placement:t.direction===`rtl`?`left-start`:`right-start`,offset:Jo,padding:8}),this.layer=new ci(e,()=>n===0?t.rootLayerOptions():t.subLayerOptions(n)),this.scope=new ii(e,()=>({trapped:n===0&&t.isModal,autoFocus:!1,restoreFocus:!1}))}clearTimer(){clearTimeout(this.openTimer),this.openTimer=void 0}},rs=class extends O{constructor(...e){super(...e),this.items=[],this.open=!1,this.size=`medium`,this.keepOpen=!1,this.disabled=!1,this.nonModal=!1,this.noLoop=!1,this.declarative=[],this.openPath=[],this.exiting=[],this.stored=new Map,this.levels=[],this.modalController=new si(this),this.observer=null,this.intent=`content`,this.subIntent=`none`,this.restoreOverride=void 0,this.reason=`outside`,this.direction=`ltr`,this.onPanelKeyDown=e=>{let t=e.currentTarget,n=this.panelDepth(t),r=this.levels[n],{key:i}=e;if(i===`Tab`){e.preventDefault(),this.closeWithTab(e.shiftKey);return}if(e.defaultPrevented||!r||e.altKey||e.ctrlKey||e.metaKey)return;let a=Zo(t),o=e.composedPath()[0],s=a.find(e=>e===o)??null,ee=s?a.indexOf(s):-1,te=this.direction===`rtl`,ne=te?`ArrowLeft`:`ArrowRight`,re=te?`ArrowRight`:`ArrowLeft`;if([`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(i)){e.preventDefault(),r.typeahead.reset();let t=ke({currentIndex:ee,count:a.length,key:i,orientation:`vertical`,loop:!this.noLoop,isDisabled:e=>Yo(a[e])});t!==null&&Qo(a[t]);return}if(i===ne&&s?.hasAttribute(`aria-haspopup`)){e.preventDefault(),Yo(s)||this.openSubmenu(n,s.dataset.uid??``,`first`);return}if(i===re&&n>0){e.preventDefault(),Qo(this.parentItem(n)),this.closeSubmenu(n);return}if(i.length===1){let t=Date.now();t-r.lastTypeahead>500&&r.typeahead.reset();let n=r.typeahead.getBuffer()!==``;if(i!==` `||n){r.lastTypeahead=t,e.preventDefault();let n=r.typeahead.search(i,a.map(e=>({text:Xo(e),disabled:Yo(e)})),ee);n!==-1&&Qo(a[n]);return}}(i===`Enter`||i===` `)&&s&&(e.preventDefault(),Yo(s)||this.activateItem(s,`first`))},this.itemActions=new Map,this.highlightedItem=null,this.onPanelFocusIn=e=>{let t=e.composedPath()[0];t.matches?.(qo)&&this.highlightItem(t,!0)},this.onPanelFocusOut=e=>{let t=e.composedPath()[0];t.matches?.(qo)&&this.highlightItem(t,!1)}}static{this.styles=[D,ti,y`
:host{
display: contents;
}
`,b(wr)]}onRootPointerDownOutside(e){}get isModal(){return!this.nonModal}get entries(){return this.items.length?this.items:this.declarative}show(){this.open=!0}hide(){this.open=!1}requestOpenChange(e,t){if(e===this.open)return!0;let n=this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0});return n&&(this.open=e,e||this.closeLevels()),n}openWith(e,t){this.intent=e,this.requestOpenChange(!0,t)}closeAll(e){this.requestOpenChange(!1,e)}closeWithTab(e){let t=this.restoreTarget(),n;if(t){let r=a().find(e=>e.element===this.levels[0]?.element)?.parent??document.body,i=Ee(r).filter(e=>e===t||!Ve(this,e)||!this.isPanelNode(e)),o=i.indexOf(t);n=o===-1?t:i[e?o-1:o+1]??t}this.restoreOverride=n??void 0,this.requestOpenChange(!1,`tab`)&&Qo(n)}isPanelNode(e){return this.levels.some(t=>Ve(t.element,e))}level(e){return this.levels[e]??=new ns(this,this,e),this.levels[e]}parentItem(e){let t=this.openPath[e-1];return t?this.renderRoot.querySelector(`[data-uid="${t}"]`)??null:null}rootLayerOptions(){return{disableOutsidePointerEvents:this.isModal,branches:()=>this.branches(),onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:e=>{this.reason=`outside`,this.onRootPointerDownOutside(e),!e.defaultPrevented&&(!this.isModal||e.button===2)&&(this.restoreOverride=null)},onFocusOutside:e=>(this.reason=`focus-outside`,!this.isModal||(e.preventDefault(),!1)),onDismiss:()=>this.closeAll(this.reason)}}subLayerOptions(e){return{parent:this.levels[e-1]?.element??void 0,branches:()=>[this.parentItem(e)],onEscapeKeyDown:()=>{Qo(this.parentItem(e))},onDismiss:()=>this.closeSubmenu(e)}}closeLevels(e=0,t=!0){for(let n=this.levels.length-1;n>=e;n--){let e=this.levels[n],r=e.element;r&&(e.clearTimer(),e.grace.clear(),e.typeahead.reset(),e.scope.deactivate(),e.layer.deactivate(),e.position.end(),t&&this.isConnected?this.exit(r,n,e.path):w(r),e.element=null,e.uid=null,n===0&&(this.modalController.deactivate(),this.scheduleRestore()))}}exit(e,t,n){if(e.setAttribute(`data-state`,`closed`),ue(e)<=0){w(e);return}let r=++ts,i=es(n);this.exiting=[...this.exiting.filter(e=>es(e.path)!==i),{id:r,depth:t,path:n}],pe(e).then(()=>{this.exiting.some(e=>e.id===r)&&(w(e),this.exiting=this.exiting.filter(e=>e.id!==r))})}clearExiting(){if(this.exiting.length!==0){for(let e of this.exiting)w(this.renderRoot.querySelector(`[data-panel-key="${es(e.path)}"]`));this.exiting=[]}}scheduleRestore(){let e=this.restoreOverride;this.restoreOverride=void 0;let t=e===void 0?this.restoreTarget():e;t&&setTimeout(()=>{if(this.open||!t.isConnected)return;let e=fe(document);(!e||e===document.body||!e.isConnected||(this.shadowRoot?.contains(e)??!1))&&Qo(t)},0)}syncLevels(){let e=this.open&&!this.disabled?this.openPath.length+1:0;this.closeLevels(e);for(let t=0;t<e;t++){let e=t===0?``:this.openPath[t-1],n=this.renderRoot.querySelector(`[data-panel-key="${es(this.openPath.slice(0,t))}"]`);if(!n)return;let r=this.level(t);if(r.element===n&&r.uid===e)continue;r.element&&this.closeLevels(t);let i=t===0?this.anchorElement():this.parentItem(t);if(!i)return;r.element=n,r.uid=e,r.path=this.openPath.slice(0,t),n.setAttribute(`data-state`,`open`),Gt(n),r.position.start(i,n),t===0&&this.isModal&&this.modalController.activate(this),r.layer.activate(n),r.scope.activate(n);let a=t===0?this.intent:this.subIntent;t===0?this.intent=`content`:this.subIntent=`none`,this.focusIntent(n,a)}}focusIntent(e,t){if(t===`none`)return;let n=Zo(e).filter(e=>!Yo(e));Qo((t===`first`?n[0]:t===`last`?n[n.length-1]:void 0)??e)}reanchor(){let e=this.levels[0],t=this.anchorElement();e?.element&&t&&e.position.start(t,e.element)}openSubmenu(e,t,n){if(this.openPath[e]===t&&this.levels[e+1]?.element){n===`first`&&Qo(Zo(this.levels[e+1].element).find(e=>!Yo(e)));return}this.subIntent=n,this.openPath=[...this.openPath.slice(0,e),t]}closeSubmenu(e){this.openPath.length<e||(this.closeLevels(e),this.openPath=this.openPath.slice(0,e-1))}stateOf(e,t){return this.stored.has(e)?this.stored.get(e):t}isChecked(e){return e.element?e.element.hasAttribute(`checked`):this.stateOf(e.key,e.checked??e.defaultChecked??!1)}radioValue(e){return e.items.some(e=>e.element)?e.items.find(e=>e.element?.hasAttribute(`checked`))?.value:this.stateOf(e.key,e.value??e.defaultValue)}activateAction(e){this.emit(`minerva-select`,{value:e.key,item:e},{cancelable:!0})&&(e.closeOnSelect??!this.keepOpen)&&this.closeAll(`select`)}toggleCheckbox(e){let t=!this.isChecked(e);this.emit(`minerva-change`,{value:e.key,checked:t,item:e},{cancelable:!0})&&(e.element?e.element.toggleAttribute(`checked`,t):this.stored.set(e.key,t),this.requestUpdate()),e.closeOnSelect&&this.closeAll(`select`)}chooseRadio(e,t){let n=this.radioValue(e);if(t.value!==n&&this.emit(`minerva-change`,{value:t.value,group:e.key,item:t},{cancelable:!0})){if(t.element)for(let n of e.items)n.element?.toggleAttribute(`checked`,n===t);else this.stored.set(e.key,t.value);this.requestUpdate()}(e.closeOnSelect||t.closeOnSelect)&&this.closeAll(`select`)}panelDepth(e){return Number(e.dataset.level??0)}activateItem(e,t){this.itemActions.get(e.dataset.uid??``)?.(t)}highlightItem(e,t){t?this.highlightedItem=e.dataset.uid??null:this.highlightedItem===e.dataset.uid&&(this.highlightedItem=null),e.toggleAttribute(`data-highlighted`,t),e.setAttribute(`part`,zr(`item`,{state:e.dataset.state,highlighted:t,disabled:e.hasAttribute(`data-disabled`),expanded:e.hasAttribute(`data-expanded`)}))}onItemClick(e){let t=e.currentTarget;Yo(t)||this.activateItem(t,`none`)}onItemPointerMove(e){let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i||e.pointerType===`touch`||i.grace.isInGraceArea({x:e.clientX,y:e.clientY}))return;i.grace.clear();let a=fe(document);if(Yo(t)){a!==n&&Qo(n);return}a!==t&&Qo(t);let o=t.dataset.uid??``;t.hasAttribute(`aria-haspopup`)&&this.openPath[r]!==o&&i.openTimer===void 0&&(i.openTimer=setTimeout(()=>{i.openTimer=void 0,this.open&&this.openSubmenu(r,o,`none`)},100))}onItemPointerLeave(e){if(e.pointerType===`touch`)return;let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i)return;i.clearTimer();let a=this.levels[r+1]?.element;if(t.hasAttribute(`aria-haspopup`)&&this.openPath[r]===t.dataset.uid&&a){let t=a.getAttribute(`data-side`)??`right`;i.grace.start({x:e.clientX,y:e.clientY},a.getBoundingClientRect(),t);return}i.grace.isInGraceArea({x:e.clientX,y:e.clientY})||fe(document)===t&&Qo(n)}readEntries(){this.declarative=jo(this)}connectedCallback(){super.connectedCallback(),this.readEntries(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(e=>{e.some(e=>Vo(e.target)||Array.from(e.addedNodes).some(Vo)||Array.from(e.removedNodes).some(e=>e.nodeType===1&&e.localName.startsWith(`minerva-menu-`)))&&this.readEntries()}),this.observer.observe(this,{subtree:!0,childList:!0,attributes:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.closeLevels(0,!1),this.clearExiting()}willUpdate(e){if(e.has(`items`)&&(this.stored=new Map,N&&this.checkKeys(this.items)),e.has(`open`)&&this.open){let e=this.anchorElement(),t=e&&`nodeType`in e?e:this;this.direction=this.isConnected?ae(t):`ltr`}e.has(`open`)&&!this.open&&(this.openPath=[]);let t=this.open&&!this.disabled?this.openPath.length+1:0,n=this.levels.findIndex((e,n)=>e.element!==null&&(n>=t||es(e.path)!==es(this.openPath.slice(0,n))));if(n!==-1&&this.closeLevels(n),this.exiting.length){let e=this.openKeys();this.exiting.some(t=>e.has(es(t.path)))&&(this.exiting=this.exiting.filter(t=>!e.has(es(t.path))))}}openKeys(){return!this.open||this.disabled?new Set:new Set([[],...this.openPath.map((e,t)=>this.openPath.slice(0,t+1))].map(es))}checkKeys(e,t=new Set){for(let n of e)if(!(`type`in n&&n.type===`separator`)){if(`type`in n&&(n.type===`group`||n.type===`label`)){n.type===`group`&&this.checkKeys(n.items,t);continue}t.has(n.key)&&A(this.constructor.tagName,`duplicate item key "${n.key}": keys must be unique (checkbox / radio state and minerva-select values are keyed by it).`),t.add(n.key),!(`type`in n)&&n.children&&this.checkKeys(n.children,t)}}hookStates(){let e=this.levels[0]?.position.running?this.levels[0].position.placement:this.rootPlacement();return{state:this.open&&!this.disabled?`open`:`closed`,disabled:this.disabled,size:this.size,...we(e),placement:e}}updated(e){this.syncTrigger(),(e.has(`open`)||e.has(`openPath`)||e.has(`disabled`))&&this.syncLevels()}renderPanels(){let e=this.open&&!this.disabled;if(!e&&this.exiting.length===0)return d;this.itemActions.clear();let t=[];e&&(t.push({key:``,depth:0,path:[],state:`open`}),this.openPath.forEach((e,n)=>{let r=this.openPath.slice(0,n+1);t.push({key:es(r),depth:n+1,path:r,state:`open`})}));let n=new Set(t.map(e=>e.key));for(let e of this.exiting){let r=es(e.path);n.has(r)||(n.add(r),t.push({key:r,depth:e.depth,path:e.path,state:`closed`}))}return at(t,e=>e.key,e=>this.renderPanelAt(e.depth,e.path,e.state))}renderPanelAt(e,t,n){let r=this.entries,i=e===0?this.rootLabel():void 0;for(let[e,n]of t.entries()){let t=this.findSubmenu(r,n,`${e}:`);if(!t)return d;r=t.children??[],i=$o(t.label)??t.textValue}return this.renderPanel(e,t.at(-1)??``,r,i,n,es(t))}findSubmenu(e,t,n){for(let[r,i]of e.entries()){let e=`${n}${r}`;if(`type`in i){if(i.type===`group`){let n=this.findSubmenu(i.items,t,`${e}.`);if(n)return n}continue}if(i.children?.length&&e===t)return i}return null}renderPanel(e,t,n,r,i,a){let o=e===0?``:`item-${t}`;return f`<div
part="content"
id=${e===0?`menu`:`menu-${t}`}
class=${_({content:!0,small:this.size===`small`})}
popover="manual"
role="menu"
aria-orientation="vertical"
aria-label=${e===0?r??d:d}
aria-labelledby=${e>0?o:d}
tabindex="-1"
dir=${this.direction}
data-state=${i}
data-level=${e}
data-panel-key=${a}
@keydown=${this.onPanelKeyDown}
@focusin=${this.onPanelFocusIn}
@focusout=${this.onPanelFocusOut}
>
${this.renderEntries(n,e,`${e}:`)}
</div>`}renderEntries(e,t,n){return e.map((e,r)=>{let i=`${n}${r}`;if(`type`in e)switch(e.type){case`separator`:return f`<div
role="separator"
aria-orientation="horizontal"
class="separator"
part="separator"
></div>`;case`label`:return f`<div class="label" part="label">${e.label}</div>`;case`group`:{let n=`label-${i.replace(/[:.]/g,`-`)}`;return f`<div
role="group"
part="group"
aria-labelledby=${n}
>
<div id=${n} class="label" part="label">${e.label}</div>
${this.renderEntries(e.items,t,`${i}.`)}
</div>`}case`checkbox`:return this.renderCheckbox(e,i);case`radio-group`:return this.renderRadioGroup(e,i)}return this.renderAction(e,t,i)})}renderItem(e){let{uid:t,disabled:n=!1,submenu:r}=e;this.itemActions.set(t,e.activate);let i=e.textValue??$o(e.label),a={state:e.checked===void 0?void 0:e.checked?`checked`:`unchecked`,highlighted:this.highlightedItem===t,disabled:n,expanded:r?.open};return f`<div
id=${`item-${t}`}
part=${zr(`item`,a)}
role=${e.role}
tabindex="-1"
class="item"
data-minerva-menu-item=""
data-uid=${t}
data-text-value=${i??d}
data-state=${a.state??d}
?data-highlighted=${a.highlighted}
?data-disabled=${n}
?data-expanded=${r?.open}
aria-disabled=${n?`true`:d}
aria-checked=${e.checked===void 0?d:String(e.checked)}
aria-haspopup=${r?`menu`:d}
aria-expanded=${r?String(r.open):d}
aria-controls=${r?.open?`menu-${t}`:d}
@click=${this.onItemClick}
@pointermove=${this.onItemPointerMove}
@pointerleave=${this.onItemPointerLeave}
>
${e.indicator??d}
${e.icon?f`<span class="icon" part="icon" aria-hidden="true"
>${e.icon}</span
>`:d}
<span class="text" part="item-label">${e.label}</span>
${e.shortcut?f`<span class="shortcut" part="shortcut">${e.shortcut}</span>`:d}
${e.trailing??d}
</div>`}renderAction(e,t,n){if(e.children?.length){let r=this.openPath[t]===n&&!e.disabled;return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,submenu:{open:r},trailing:f`<span class="chevron" aria-hidden="true"
>${Dn}</span
>`,activate:e=>this.openSubmenu(t,n,e)})}return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,activate:()=>this.activateAction(e)})}renderCheckbox(e,t){let n=this.isChecked(e);return this.renderItem({uid:t,role:`menuitemcheckbox`,label:e.label,textValue:e.textValue,shortcut:e.shortcut,disabled:e.disabled,checked:n,indicator:f`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${n?an:d}</span
>`,activate:()=>this.toggleCheckbox(e)})}renderRadioGroup(e,t){let n=this.radioValue(e),r=`label-${t.replace(/[:.]/g,`-`)}`,i=e.label!=null&&e.label!==``;return f`<div
role="group"
part="group"
aria-labelledby=${i?r:d}
>
${i?f`<div id=${r} class="label" part="label">${e.label}</div>`:d}
${e.items.map((r,i)=>{let a=r.value===n;return this.renderItem({uid:`${t}.${i}`,role:`menuitemradio`,label:r.label,textValue:r.textValue,shortcut:r.shortcut,disabled:r.disabled,checked:a,indicator:f`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${a?f`<span class="dot"></span>`:d}</span
>`,activate:()=>this.chooseRadio(e,r)})})}
</div>`}},F([h({attribute:!1})],rs.prototype,`items`,void 0),F([h({type:Boolean,reflect:!0})],rs.prototype,`open`,void 0),F([h({reflect:!0})],rs.prototype,`size`,void 0),F([h({type:Boolean,attribute:`keep-open`})],rs.prototype,`keepOpen`,void 0),F([h({type:Boolean,reflect:!0})],rs.prototype,`disabled`,void 0),F([h({type:Boolean,reflect:!0,attribute:`non-modal`})],rs.prototype,`nonModal`,void 0),F([h({type:Boolean,attribute:`no-loop`})],rs.prototype,`noLoop`,void 0),F([u()],rs.prototype,`declarative`,void 0),F([u()],rs.prototype,`openPath`,void 0),F([u()],rs.prototype,`exiting`,void 0)})))()}function as(e,t,n){n===null?e.hasAttribute(t)&&e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}var os,ss;function cs(){return(cs=e((()=>{E(),Go(),is(),c(),l(),re(),os={mainAxis:6,crossAxis:0},ss=class e extends rs{constructor(...e){super(...e),this.side=`bottom`,this.align=`end`,this.disabledTrigger=null,this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.fromTrigger(e)))switch(e.key){case`Enter`:case` `:e.preventDefault(),this.open?this.requestOpenChange(!1,`trigger`):this.openWith(`first`,`keyboard`);break;case`ArrowDown`:e.preventDefault(),this.openWith(`first`,`keyboard`);break;case`ArrowUp`:e.preventDefault(),this.openWith(`last`,`keyboard`)}},this.handleClick=e=>{this.disabled||e.defaultPrevented||!this.fromTrigger(e)||(this.open?this.requestOpenChange(!1,`trigger`):this.openWith(e.detail===0?`first`:`content`,`trigger`))}}static{this.tagName=`minerva-menu`}static{this.dependencies=[No,Po,Fo,Io,Lo,Ro]}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorElement(){return this.triggerElement()}rootPlacement(){return Oe(this.side,this.align)}rootOffset(){return os}restoreTarget(){return this.triggerElement()}branches(){return[this.triggerElement()]}rootLabel(){let e=this.getAttribute(`aria-label`);if(e)return e;let t=this.triggerElement();return t?.getAttribute(`aria-label`)??(t?.textContent?.trim()||void 0)}syncTrigger(){let e=this.triggerElement();e&&(as(e,`aria-haspopup`,`menu`),as(e,`aria-expanded`,String(this.open)),as(e,`data-state`,this.open?`open`:`closed`),as(e,`data-disabled`,this.disabled?``:null),this.disabled&&!e.hasAttribute(`disabled`)?(e.setAttribute(`disabled`,``),this.disabledTrigger=e):!this.disabled&&this.disabledTrigger===e&&(e.removeAttribute(`disabled`),this.disabledTrigger=null))}fromTrigger(e){let t=this.triggerElement();return!!t&&e.composedPath().includes(t)}connectedCallback(){super.connectedCallback(),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick)}firstUpdated(t){super.firstUpdated(t),N&&!this.triggerElement()&&A(e.tagName,`no slot="trigger" element: nothing opens the menu (add e.g. <button slot="trigger">).`)}render(){return f`<slot name="trigger"></slot>${this.renderPanels()}`}},F([h({reflect:!0})],ss.prototype,`side`,void 0),F([h({reflect:!0})],ss.prototype,`align`,void 0)})))()}var ls,us,ds,fs,ps;function ms(){return(ms=e((()=>{Ut(),Go(),is(),cs(),c(),re(),ls=700,us={mainAxis:2,crossAxis:0},ds={mainAxis:4,crossAxis:0},fs=(e,t,n)=>({contextElement:n,getBoundingClientRect:()=>({x:e,y:t,left:e,top:t,right:e,bottom:t,width:0,height:0})}),ps=class extends rs{constructor(...e){super(...e),this.position=null,this.restoreTo=null,this.areaPointerEvents=null,this.handleContextMenu=e=>{this.disabled||e.defaultPrevented||!this.inArea(e)||(e.preventDefault(),this.clearLongPress(),this.openAtPoint(e.clientX,e.clientY))},this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.inArea(e))&&(e.key===`ContextMenu`||e.shiftKey&&e.key===`F10`)){let t=this.area();if(!t)return;e.preventDefault();let n=ae(t)===`rtl`;this.openAt({anchor:t,placement:n?`bottom-end`:`bottom-start`,offset:ds})}},this.handlePointerDown=e=>{if(this.disabled||e.pointerType!==`touch`||!this.inArea(e))return;this.clearLongPress();let{clientX:t,clientY:n}=e;this.longPress=setTimeout(()=>{this.longPress=void 0,this.openAtPoint(t,n)},700)},this.handleTouchEnd=e=>{e.pointerType===`touch`&&this.clearLongPress()}}static{this.tagName=`minerva-context-menu`}static{this.dependencies=[No,Po,Fo,Io,Lo,Ro]}static{this.styles=[...rs.styles,y`
:host(:not([disabled])) ::slotted(*){
-webkit-touch-callout: none;
}
`]}area(){return Array.from(this.children).find(e=>!zo.includes(e.localName))??null}anchorElement(){return this.position?.anchor??null}rootPlacement(){return this.position?.placement??`right-start`}rootOffset(){return this.position?.offset??us}restoreTarget(){return this.restoreTo}branches(){return[]}rootLabel(){return this.getAttribute(`aria-label`)??void 0}onRootPointerDownOutside(e){let t=this.area(),n=e.composedPath()[0];e.button===2&&t&&n instanceof Node&&Ve(t,n)&&e.preventDefault()}syncTrigger(){let e=this.area();if(!e)return;as(e,`data-state`,this.open?`open`:`closed`),as(e,`data-disabled`,this.disabled?``:null);let t=this.open&&this.isModal&&!this.disabled;t&&this.areaPointerEvents===null?(this.areaPointerEvents=e.style.pointerEvents,e.style.pointerEvents=`auto`):!t&&this.areaPointerEvents!==null&&(e.style.pointerEvents=this.areaPointerEvents,this.areaPointerEvents=null)}openAt(e){let t=this.area();if(t){if(!this.open){let e=fe(document);this.restoreTo=e instanceof HTMLElement&&Ve(t,e)?e:t}if(this.position=e,this.open){this.reanchor();return}this.openWith(`first`,`contextmenu`)}}openAtPoint(e,t){let n=this.area();if(!n)return;let r=ae(n)===`rtl`;this.openAt({anchor:fs(e,t,n),placement:r?`left-start`:`right-start`,offset:us})}inArea(e){let t=this.area(),n=e.composedPath()[0];return!!t&&n instanceof Node&&Ve(t,n)}clearLongPress(){clearTimeout(this.longPress),this.longPress=void 0}connectedCallback(){super.connectedCallback(),this.addEventListener(`contextmenu`,this.handleContextMenu),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`pointerdown`,this.handlePointerDown),this.addEventListener(`pointermove`,this.handleTouchEnd),this.addEventListener(`pointerup`,this.handleTouchEnd),this.addEventListener(`pointercancel`,this.handleTouchEnd)}disconnectedCallback(){super.disconnectedCallback(),this.clearLongPress(),this.removeEventListener(`contextmenu`,this.handleContextMenu),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`pointerdown`,this.handlePointerDown),this.removeEventListener(`pointermove`,this.handleTouchEnd),this.removeEventListener(`pointerup`,this.handleTouchEnd),this.removeEventListener(`pointercancel`,this.handleTouchEnd)}render(){return f`<slot></slot>${this.renderPanels()}`}}})))()}var hs,X;function gs(){return(gs=e((()=>{k(),M(),x(),T(),C(),Pn(),ai(),qn(),dr(),ur(),c(),l(),m(),re(),he(),lt(),hs=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],X=class extends yr{constructor(...e){super(...e),this.name=`date-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.draft=null,this.month=Be(new Date),this.focusedKey=``,this.dirty=!1,this.pendingFocus=!1,this.i18n=new P(this),this.aria=new S(this,()=>this.labels),this.floating=new ri(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0}))}static{this.tagName=`minerva-date-picker`}static{this.shadowRootOptions={...yr.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,ti,y`
:host{
display: inline-block;
vertical-align: middle;
}
.datePicker .root{
width: 100%;
}
`,b(Hn),b(Xn),b(vr)]}get valueAsDate(){return ve(this.value||``,!0)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}get interactive(){return!this.isDisabled&&!this.readOnly}allowed(e){return!!ve(e,!0)&&(!this.minDate||e>=this.minDate)&&(!this.maxDate||e<=this.maxDate)}getFormValue(){return this.valueAsDate?Ie(this.valueAsDate):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.i18n.t(`validation.valueMissing`),anchor:this.input}:this.valueAsDate&&!this.allowed(this.value)?{flags:{customError:!0},message:[this.minDate,this.maxDate].filter(Boolean).join(` – `),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue,this.open=!1}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open&&(this.month=Be(this.valueAsDate??new Date),this.focusedKey=Ie(this.valueAsDate??new Date))}updated(e){super.updated(e),this.floating.sync(this.open&&this.interactive),this.open&&this.pendingFocus&&(this.popup?.querySelector(`[data-date="${this.focusedKey}"]`)?.focus(),this.pendingFocus=!1)}requestOpenChange(e){if(e&&!this.interactive)return!1;if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){!this.interactive||e&&!this.allowed(e)||(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleInput(e){if(!this.interactive)return;let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t}),(!t||this.allowed(t))&&(this.commit(t),t&&(this.month=Be(ve(t))))}handleBlur(){if(this.draft===null)return;let e=ve(this.draft.trim(),!1),t=e?Ie(e):``;this.draft.trim()?e&&this.allowed(t)&&t!==this.value&&(this.commit(t),this.month=Be(e)):this.value&&this.commit(``),this.draft=null}handleClear(){this.interactive&&(this.draft=null,this.commit(``),this.emit(`minerva-clear`),this.input?.focus())}handleInputClick(){this.requestOpenChange(!this.open)}handleInputKeyDown(e){e.key===`ArrowDown`&&this.interactive&&(e.preventDefault(),this.pendingFocus=!0,this.open?this.requestUpdate():this.requestOpenChange(!0)||(this.pendingFocus=!1))}select(e){this.interactive&&this.allowed(Ie(e))&&(this.draft=null,this.commit(Ie(e)),this.requestOpenChange(!1),this.input?.focus())}handleDayKeyDown(e,t){if(!this.interactive)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=Qe(e.key,this),r=(t.getDay()+6)%7,i;switch(n){case`ArrowLeft`:i=Ne(t,-1);break;case`ArrowRight`:i=Ne(t,1);break;case`ArrowUp`:i=Ne(t,-7);break;case`ArrowDown`:i=Ne(t,7);break;case`Home`:i=Ne(t,-r);break;case`End`:i=Ne(t,6-r);break;case`PageUp`:case`PageDown`:{let r=Be(t,(n===`PageUp`?-1:1)*(e.shiftKey?12:1));i=De(r.getFullYear(),r.getMonth(),Math.min(t.getDate(),Ne(Be(r,1),-1).getDate()));break}default:return}e.preventDefault(),this.focusedKey=Ie(i),this.month=Be(i),this.pendingFocus=!0}renderPanel(e){let t=this.i18n.t,n=Be(this.month),r=Ne(n,-((n.getDay()+6)%7)),i=Array.from({length:42},(e,t)=>Ne(r,t)),a=i.map(Ie).includes(this.focusedKey)?this.focusedKey:Ie(n),o;try{o=new Intl.DateTimeFormat(this.locale??this.i18n.language,{month:`long`,year:`numeric`}).format(n)}catch{o=Ie(n).slice(0,7)}return f`<div
part="content"
class="popup"
popover="manual"
role="dialog"
tabindex="-1"
aria-label=${e}
@keydown=${this.handlePanelKeyDown}
>
<div class="panel">
<div class="header">
<h2 id="heading" class="heading" aria-live="polite">${o}</h2>
<div class="navGroup">
<button
type="button"
class="navButton"
aria-label=${t(`monthCalendar.previousMonth`)}
@click=${()=>{this.month=Be(n,-1)}}
>
${Yt}
</button>
<button
type="button"
class="navButton"
aria-label=${t(`monthCalendar.nextMonth`)}
@click=${()=>{this.month=Be(n,1)}}
>
${Dn}
</button>
</div>
</div>
<div class="grid" role="grid" aria-labelledby="heading">
<div class="week" role="row">
${hs.map(e=>f`<div class="weekday" role="columnheader">${t(`monthCalendar.weekdays.${e}`)}</div>`)}
</div>
${Array.from({length:6},(e,t)=>f`<div class="week" role="row">
${i.slice(t*7,t*7+7).map(e=>{let t=Ie(e);return f`<div
part="day"
class="day"
role="gridcell"
data-date=${t}
?data-outside=${!$e(e,n)}
aria-label=${t}
aria-selected=${String(t===this.value)}
aria-disabled=${this.allowed(t)?d:`true`}
aria-current=${t===Ie(new Date)?`date`:d}
tabindex=${t===a&&this.allowed(t)?`0`:`-1`}
@focus=${()=>{this.focusedKey=t}}
@click=${()=>this.select(e)}
@keydown=${t=>this.handleDayKeyDown(t,e)}
>
${e.getDate()}
</div>`})}
</div>`)}
</div>
<div class="footer">
${!this.hideClearButton&&this.value?f`<button
class="footerButton"
type="button"
@click=${()=>{this.handleClear(),this.requestOpenChange(!1)}}
>
${t(`datePicker.clear`)}
</button>`:d}
<button
class="footerButton"
type="button"
?disabled=${!this.allowed(Ie(new Date))}
@click=${()=>this.select(new Date)}
>
${t(`monthCalendar.today`)}</button
><button
class="footerButton"
type="button"
@click=${()=>{this.requestOpenChange(!1),this.input?.focus()}}
>
${t(`modal.close`)}
</button>
</div>
</div>
</div>`}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?we(e):{side:void 0,align:void 0};return{placement:e,side:t,align:n,state:this.open&&this.interactive?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size}}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=Ee(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=Ee(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{Ve(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!Ve(this,e))??null}render(){let{t:e}=this.i18n,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`datePicker.label`),a=this.draft??(r?Ie(r):``),o=!this.hideClearButton&&!!r&&!t&&!n;return f`<div part="root" class="datePicker">
<div
part="control"
class=${_({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
.value=${st(a)}
placeholder=${this.placeholder??e(`datePicker.placeholder`)}
?disabled=${t}
?readonly=${n}
?required=${this.required}
autocomplete="off"
aria-label=${i}
aria-description=${this.aria.description??d}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:d}
aria-readonly=${n?`true`:d}
@input=${this.handleInput}
@blur=${this.handleBlur}
@click=${this.handleInputClick}
@keydown=${this.handleInputKeyDown}
/>
<span class="addon end">
${o?f`<button
part="clear-button"
type="button"
class="iconButton neutral variant-ghost small circle clearButton"
aria-label=${e(`datePicker.clear`)}
@click=${this.handleClear}
>
${Kn}
</button>`:f`<span part="icon" class="calendarIcon" aria-hidden="true"
>${un}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(i):d}`}},F([h({reflect:!0})],X.prototype,`name`,void 0),F([h({attribute:!1})],X.prototype,`value`,void 0),F([h({attribute:`value`})],X.prototype,`defaultValue`,void 0),F([h({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),F([h()],X.prototype,`label`,void 0),F([h()],X.prototype,`placeholder`,void 0),F([h()],X.prototype,`locale`,void 0),F([h({reflect:!0})],X.prototype,`size`,void 0),F([h({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),F([h({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),F([h({type:Boolean,attribute:`hide-clear-button`})],X.prototype,`hideClearButton`,void 0),F([h({attribute:`min-date`})],X.prototype,`minDate`,void 0),F([h({attribute:`max-date`})],X.prototype,`maxDate`,void 0),F([u()],X.prototype,`draft`,void 0),F([u()],X.prototype,`month`,void 0),F([u()],X.prototype,`focusedKey`,void 0),F([g(`input`)],X.prototype,`input`,void 0),F([g(`.datePicker`)],X.prototype,`field`,void 0),F([g(`.popup`)],X.prototype,`popup`,void 0)})))()}var _s,vs;function ys(){return(ys=e((()=>{T(),c(),l(),p(),_s=e=>typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,vs=class extends O{constructor(...e){super(...e),this.engine=null,this.offs=[]}static{this.styles=[D,y`
:host{
display: block;
width: 100%;
}
.root{
position: relative;
width: 100%;
}
.surface{
position: absolute;
inset: 0;
}
`]}get instance(){return this.engine}get defaultHeight(){return 320}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.mountEngine()}disconnectedCallback(){super.disconnectedCallback(),this.unmountEngine()}updated(e){if(super.updated(e),!this.engine){this.mountEngine();return}if([...e.keys()].every(e=>e===`height`))return;if(this.syncEngine){this.syncEngine(this.engine,e);return}let t=this.engineOptions();t&&this.engine.setOptions(t)}mountEngine(){if(this.engine||!this.isConnected)return;let e=this.renderRoot.querySelector(`[part=surface]`),t=e?this.engineOptions():null;if(!e||!t)return;let n=this.createEngine(e,t);this.engine=n,this.offs=this.bindEngine?.(n)??[],this.engineMounted?.(n)}unmountEngine(){for(let e of this.offs)e();this.offs=[],this.engine?.destroy(),this.engine=null}render(){return f`<div
part="root"
class="root"
style=${v({height:_s(this.height??this.defaultHeight)})}
>
<div part="surface" class="surface"></div>
</div>`}},F([h()],vs.prototype,`height`,void 0)})))()}var bs,xs,Ss,Cs,ws;function Ts(){return(Ts=e((()=>{ys(),l(),jt(),bs=class extends vs{constructor(...e){super(...e),this.height=400}createEngine(e,t){return Mt(e,t)}engineOptions(){return this.series?{...this.options,series:this.typed(this.series)}:null}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-point-click`,e)),e.on(`camera`,e=>this.emit(`minerva-camera-change`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}resetCamera(){this.instance?.resetCamera()}getCamera(){return this.instance?.getCamera()??null}setCamera(e){this.instance?.setCamera(e)}getRenderer(){return this.instance?.getRenderer()??null}},F([h()],bs.prototype,`height`,void 0),F([h({attribute:!1})],bs.prototype,`series`,void 0),F([h({attribute:!1})],bs.prototype,`options`,void 0),xs=class extends bs{static{this.tagName=`minerva-scatter-3d-chart`}typed(e){return e.map(e=>({...e,type:`scatter`}))}},Ss=class extends bs{static{this.tagName=`minerva-line-3d-chart`}typed(e){return e.map(e=>({...e,type:`line`}))}},Cs=class extends bs{static{this.tagName=`minerva-surface-3d-chart`}typed(e){return e.map(e=>({...e,type:`surface`,wireframe:e.wireframe??this.wireframe,contours:e.contours??this.contours}))}},F([h({attribute:!1})],Cs.prototype,`wireframe`,void 0),F([h({attribute:!1})],Cs.prototype,`contours`,void 0),ws=class extends bs{constructor(...e){super(...e),this.barWidth=.7}static{this.tagName=`minerva-bar-3d-chart`}typed(e){return e.map(e=>({...e,type:`bar`,barWidth:e.barWidth??this.barWidth}))}},F([h({type:Number,attribute:`bar-width`})],ws.prototype,`barWidth`,void 0)})))()}var Es,Ds;function Os(){return(Os=e((()=>{ys(),l(),vt(),Es=class extends vs{constructor(...e){super(...e),this.height=320}createEngine(e,t){return _t(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.pointClicked(e)),e.on(`plotClick`,e=>this.plotClicked(e)),e.on(`zoom`,e=>this.emit(`minerva-zoom`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e})),e.on(`drag`,e=>this.pointDragged?.(e)),e.on(`drop`,e=>this.pointDropped?.(e))]}pointClicked(e){this.emit(`minerva-point-click`,e)}plotClicked(e){this.emit(`minerva-plot-click`,e)}resetZoom(){this.instance?.resetZoom()}getView(){return this.instance?.getView()??null}setView(e){this.instance?.setView(e)}getRenderer(){return this.instance?.getRenderer()??null}},F([h()],Es.prototype,`height`,void 0),Ds=class extends Es{static{this.tagName=`minerva-chart`}engineOptions(){return this.options??null}},F([h({attribute:!1})],Ds.prototype,`options`,void 0)})))()}var ks;function As(){return(As=e((()=>{ks=(e,t,n,r)=>e.map(e=>{let i=e.type??t;return{...e,type:i,...n!==void 0&&i===t?{stack:e.stack??n}:{},...r!==void 0&&(i===`line`||i===`area`)?{curve:e.curve??r}:{}}})})))()}var js,Ms,Ns,Ps,Fs,Is,Ls,Rs,zs,Z;function Bs(){return(Bs=e((()=>{Os(),As(),l(),bt(),js=class extends Es{stackMode(){return this.options?.stackMode}engineOptions(){let e=this.series??this.options?.series;return e?{...this.options,series:this.typed(e),stackMode:this.stackMode()}:null}},F([h({attribute:!1})],js.prototype,`series`,void 0),F([h({attribute:!1})],js.prototype,`options`,void 0),Ms=class extends js{constructor(...e){super(...e),this.area=!1,this.curve=`linear`,this.stacked=!1,this.percent=!1}static{this.tagName=`minerva-line-chart`}typed(e){return ks(e,this.area?`area`:`line`,this.stacked||this.percent?`stack`:void 0,this.curve)}stackMode(){return this.percent?`percent`:super.stackMode()}},F([h({type:Boolean})],Ms.prototype,`area`,void 0),F([h()],Ms.prototype,`curve`,void 0),F([h({type:Boolean})],Ms.prototype,`stacked`,void 0),F([h({type:Boolean})],Ms.prototype,`percent`,void 0),Ns=class extends js{constructor(...e){super(...e),this.curve=`smooth`,this.stacked=!1,this.percent=!1}static{this.tagName=`minerva-area-chart`}typed(e){return ks(e,`area`,this.stacked||this.percent?`stack`:void 0,this.curve)}stackMode(){return this.percent?`percent`:super.stackMode()}},F([h()],Ns.prototype,`curve`,void 0),F([h({type:Boolean})],Ns.prototype,`stacked`,void 0),F([h({type:Boolean})],Ns.prototype,`percent`,void 0),Ps=class extends js{constructor(...e){super(...e),this.stacked=!1,this.percent=!1,this.labels=!1}static{this.tagName=`minerva-bar-chart`}typed(e){return ks(e,`bar`,this.stacked||this.percent?`stack`:void 0).map(e=>this.labels&&e.type===`bar`?{...e,showLabels:e.showLabels??!0}:e)}stackMode(){return this.percent?`percent`:super.stackMode()}},F([h({type:Boolean})],Ps.prototype,`stacked`,void 0),F([h({type:Boolean})],Ps.prototype,`percent`,void 0),F([h({type:Boolean})],Ps.prototype,`labels`,void 0),Fs=class extends js{static{this.tagName=`minerva-scatter-chart`}typed(e){return ks(e,`scatter`)}},Is=class extends js{static{this.tagName=`minerva-candlestick-chart`}typed(e){return ks(e,`candlestick`)}},Ls=class extends Es{constructor(...e){super(...e),this.colorScale=`sequential`}static{this.tagName=`minerva-heatmap-chart`}engineOptions(){return this.data?wt({data:this.data,xCategories:this.xCategories,yCategories:this.yCategories,colorScale:this.colorScale,valueRange:this.valueRange,colorMidpoint:this.colorMidpoint,name:this.valueName,radius:this.radius,format:this.format},this.options):null}},F([h({attribute:!1})],Ls.prototype,`data`,void 0),F([h({attribute:!1})],Ls.prototype,`xCategories`,void 0),F([h({attribute:!1})],Ls.prototype,`yCategories`,void 0),F([h({attribute:`color-scale`})],Ls.prototype,`colorScale`,void 0),F([h({attribute:!1})],Ls.prototype,`valueRange`,void 0),F([h({type:Number,attribute:`color-midpoint`})],Ls.prototype,`colorMidpoint`,void 0),F([h({attribute:`value-name`})],Ls.prototype,`valueName`,void 0),F([h({type:Number})],Ls.prototype,`radius`,void 0),F([h({attribute:!1})],Ls.prototype,`format`,void 0),F([h({attribute:!1})],Ls.prototype,`options`,void 0),Rs=class extends Es{constructor(...e){super(...e),this.height=48,this.type=`line`,this.curve=`smooth`}static{this.tagName=`minerva-sparkline`}engineOptions(){return this.data?Tt({data:this.data,type:this.type,color:this.color,curve:this.curve,name:this.valueName,reference:this.reference,format:this.format},this.options):null}},F([h()],Rs.prototype,`height`,void 0),F([h({attribute:!1})],Rs.prototype,`data`,void 0),F([h()],Rs.prototype,`type`,void 0),F([h()],Rs.prototype,`color`,void 0),F([h()],Rs.prototype,`curve`,void 0),F([h({type:Number})],Rs.prototype,`reference`,void 0),F([h({attribute:`value-name`})],Rs.prototype,`valueName`,void 0),F([h({attribute:!1})],Rs.prototype,`format`,void 0),F([h({attribute:!1})],Rs.prototype,`options`,void 0),zs=400,Z=class extends Es{constructor(...e){super(...e),this.reverseX=!1,this.hideTicks=!1,this.hideLabels=!1,this.pointSize=12,this.dragPoints=!1,this.lastClick=null}static{this.tagName=`minerva-quadrant-chart`}geometry(){return{xDomain:this.xDomain,yDomain:this.yDomain,xSplit:this.xSplit,ySplit:this.ySplit,reverseX:this.reverseX}}engineOptions(){return this.points?Ot({...this.geometry(),points:this.points,quadrants:this.quadrants,xLabel:this.xLabel,yLabel:this.yLabel,axisLabels:this.axisLabels,showTicks:!this.hideTicks,showLabels:!this.hideLabels,pointSize:this.pointSize,draggable:this.dragPoints},this.options):null}pointClicked(e){let t=e.items[0]?.index,n=t===void 0?void 0:this.points?.[t];if(!n||t===void 0)return;let r=Date.now(),i=this.lastClick,a=i?.index===t&&r-i.time<zs;this.lastClick=a?null:{index:t,time:r},this.emit(`minerva-point-click`,{point:n,index:t}),a&&this.emit(`minerva-point-double-click`,{point:n,index:t})}plotClicked(e){this.emit(`minerva-quadrant-click`,{quadrant:yt(this.geometry(),e.x,e.y),x:e.x,y:e.y})}dropDetail(e){let t=e.item.index,n=this.points?.[t];return n?{point:n,index:t,x:e.x,y:e.y,quadrant:yt(this.geometry(),e.x,e.y)}:null}pointDragged(e){let t=this.dropDetail(e);t&&this.emit(`minerva-point-drag`,t)}pointDropped(e){let t=this.dropDetail(e);t&&this.emit(`minerva-point-drop`,t)}},F([h({attribute:!1})],Z.prototype,`points`,void 0),F([h({attribute:!1})],Z.prototype,`quadrants`,void 0),F([h({attribute:`x-label`})],Z.prototype,`xLabel`,void 0),F([h({attribute:`y-label`})],Z.prototype,`yLabel`,void 0),F([h({attribute:!1})],Z.prototype,`axisLabels`,void 0),F([h({attribute:!1})],Z.prototype,`xDomain`,void 0),F([h({attribute:!1})],Z.prototype,`yDomain`,void 0),F([h({type:Number,attribute:`x-split`})],Z.prototype,`xSplit`,void 0),F([h({type:Number,attribute:`y-split`})],Z.prototype,`ySplit`,void 0),F([h({type:Boolean,attribute:`reverse-x`})],Z.prototype,`reverseX`,void 0),F([h({type:Boolean,attribute:`hide-ticks`})],Z.prototype,`hideTicks`,void 0),F([h({type:Boolean,attribute:`hide-labels`})],Z.prototype,`hideLabels`,void 0),F([h({type:Number,attribute:`point-size`})],Z.prototype,`pointSize`,void 0),F([h({type:Boolean,attribute:`drag-points`})],Z.prototype,`dragPoints`,void 0),F([h({attribute:!1})],Z.prototype,`options`,void 0)})))()}var Vs,Hs,Us,Ws,Gs,Ks,qs,Js;function Ys(){return(Ys=e((()=>{ys(),l(),kt(),Vs=class extends vs{createEngine(e,t){return At(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`toggle`,e=>this.emit(`minerva-toggle`,e))]}toggle(e){this.instance?.toggle(e)}},Hs=class extends Vs{static{this.tagName=`minerva-shape-chart`}get defaultHeight(){return this.options?.type===`gauge`?240:320}engineOptions(){return this.options??null}},F([h({attribute:!1})],Hs.prototype,`options`,void 0),Us=class extends Vs{constructor(...e){super(...e),this.innerRadius=0,this.rose=!1}static{this.tagName=`minerva-pie-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`pie`,data:e,innerRadius:this.innerRadius,rose:this.rose||this.options?.rose,labels:this.labels??this.options?.labels,centerValue:this.centerValue??this.options?.centerValue,centerLabel:this.centerLabel??this.options?.centerLabel}:null}},F([h({attribute:!1})],Us.prototype,`data`,void 0),F([h({type:Number,attribute:`inner-radius`})],Us.prototype,`innerRadius`,void 0),F([h({type:Boolean})],Us.prototype,`rose`,void 0),F([h()],Us.prototype,`labels`,void 0),F([h({attribute:`center-value`})],Us.prototype,`centerValue`,void 0),F([h({attribute:`center-label`})],Us.prototype,`centerLabel`,void 0),F([h({attribute:!1})],Us.prototype,`options`,void 0),Ws=class extends Us{constructor(...e){super(...e),this.innerRadius=.62}static{this.tagName=`minerva-donut-chart`}},F([h({type:Number,attribute:`inner-radius`})],Ws.prototype,`innerRadius`,void 0),Gs=class extends Vs{constructor(...e){super(...e),this.shape=`polygon`,this.levels=4}static{this.tagName=`minerva-radar-chart`}engineOptions(){let e=this.indicators??this.options?.indicators,t=this.series??this.options?.series;return!e||!t?null:{...this.options,type:`radar`,indicators:e,series:t,shape:this.shape,levels:this.levels}}},F([h({attribute:!1})],Gs.prototype,`indicators`,void 0),F([h({attribute:!1})],Gs.prototype,`series`,void 0),F([h()],Gs.prototype,`shape`,void 0),F([h({type:Number})],Gs.prototype,`levels`,void 0),F([h({attribute:!1})],Gs.prototype,`options`,void 0),Ks=class extends Vs{constructor(...e){super(...e),this.value=0,this.min=0,this.max=100,this.needle=!1}static{this.tagName=`minerva-gauge-chart`}get defaultHeight(){return 240}engineOptions(){return{...this.options,type:`gauge`,value:this.value,min:this.min,max:this.max,label:this.label??this.options?.label,needle:this.needle||this.options?.needle,bands:this.bands??this.options?.bands}}},F([h({type:Number})],Ks.prototype,`value`,void 0),F([h({type:Number})],Ks.prototype,`min`,void 0),F([h({type:Number})],Ks.prototype,`max`,void 0),F([h()],Ks.prototype,`label`,void 0),F([h({type:Boolean})],Ks.prototype,`needle`,void 0),F([h({attribute:!1})],Ks.prototype,`bands`,void 0),F([h({attribute:!1})],Ks.prototype,`options`,void 0),qs=class extends Vs{constructor(...e){super(...e),this.sort=`none`,this.shape=`trapezoid`,this.hideConversion=!1}static{this.tagName=`minerva-funnel-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`funnel`,data:e,sort:this.sort,shape:this.shape,conversion:!this.hideConversion&&this.options?.conversion}:null}},F([h({attribute:!1})],qs.prototype,`data`,void 0),F([h()],qs.prototype,`sort`,void 0),F([h()],qs.prototype,`shape`,void 0),F([h({type:Boolean,attribute:`hide-conversion`})],qs.prototype,`hideConversion`,void 0),F([h({attribute:!1})],qs.prototype,`options`,void 0),Js=class extends Vs{constructor(...e){super(...e),this.gap=2,this.hideHeaders=!1}static{this.tagName=`minerva-treemap-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`treemap`,data:e,gap:this.gap,headers:!this.hideHeaders&&this.options?.headers}:null}},F([h({attribute:!1})],Js.prototype,`data`,void 0),F([h({type:Number})],Js.prototype,`gap`,void 0),F([h({type:Boolean,attribute:`hide-headers`})],Js.prototype,`hideHeaders`,void 0),F([h({attribute:!1})],Js.prototype,`options`,void 0)})))()}var Xs,Zs,Qs,$s,ec,tc,nc,rc,ic,ac;function oc(){return(oc=e((()=>{Os(),As(),Bs(),l(),bt(),Xs=class extends Ps{static{this.tagName=`minerva-horizontal-bar-chart`}engineOptions(){let e=super.engineOptions();return e&&{...e,orientation:`horizontal`}}},Zs=class extends js{constructor(...e){super(...e),this.curve=`smooth`}static{this.tagName=`minerva-range-area-chart`}typed(e){return ks(e,`area`,void 0,this.curve).map(e=>e.type===`area`?{...e,lineWidth:e.lineWidth??1.5}:e)}},F([h()],Zs.prototype,`curve`,void 0),Qs=class extends js{static{this.tagName=`minerva-mixed-chart`}typed(e){return ks(e,`line`)}},$s=class extends js{constructor(...e){super(...e),this.minSize=6,this.maxSize=48}static{this.tagName=`minerva-bubble-chart`}typed(e){return xt(e,{minSize:this.minSize,maxSize:this.maxSize,maxValue:this.maxValue})}},F([h({type:Number,attribute:`min-size`})],$s.prototype,`minSize`,void 0),F([h({type:Number,attribute:`max-size`})],$s.prototype,`maxSize`,void 0),F([h({type:Number,attribute:`max-value`})],$s.prototype,`maxValue`,void 0),ec={fromAttribute:e=>e===null?void 0:/^\d+$/.test(e)?Number(e):e},tc=class extends Es{constructor(...e){super(...e),this.bins=`auto`,this.nice=!0}static{this.tagName=`minerva-histogram-chart`}engineOptions(){return this.values?{...this.options,series:[Ct(this.values,{bins:this.bins,domain:this.domain,nice:this.nice,name:this.valueName,color:this.color,format:this.formatBin}),...this.series??[]]}:null}},F([h({attribute:!1})],tc.prototype,`values`,void 0),F([h({converter:ec})],tc.prototype,`bins`,void 0),F([h({attribute:!1})],tc.prototype,`domain`,void 0),F([h({attribute:!1})],tc.prototype,`nice`,void 0),F([h({attribute:`value-name`})],tc.prototype,`valueName`,void 0),F([h()],tc.prototype,`color`,void 0),F([h({attribute:!1})],tc.prototype,`formatBin`,void 0),F([h({attribute:!1})],tc.prototype,`series`,void 0),F([h({attribute:!1})],tc.prototype,`options`,void 0),nc={fromAttribute:e=>e===null?void 0:e===`minmax`?e:Number(e)},rc=class extends Es{constructor(...e){super(...e),this.whisker=1.5,this.outlierShape=`hollow`,this.outlierSize=7,this.orientation=`vertical`}static{this.tagName=`minerva-box-plot-chart`}engineOptions(){return!this.groups?.length&&!this.series?null:{...this.options,orientation:this.orientation,series:ks([...this.groups?.length?[{id:`boxplot`,name:this.valueName??`Values`,data:ht(this.groups,{whisker:this.whisker})}]:[],...this.series??[]],`boxplot`).map(e=>e.type===`boxplot`?{...e,outlierShape:e.outlierShape??this.outlierShape,outlierSize:e.outlierSize??this.outlierSize}:e)}}},F([h({attribute:!1})],rc.prototype,`groups`,void 0),F([h({attribute:!1})],rc.prototype,`series`,void 0),F([h({attribute:`value-name`})],rc.prototype,`valueName`,void 0),F([h({converter:nc})],rc.prototype,`whisker`,void 0),F([h({attribute:`outlier-shape`})],rc.prototype,`outlierShape`,void 0),F([h({type:Number,attribute:`outlier-size`})],rc.prototype,`outlierSize`,void 0),F([h()],rc.prototype,`orientation`,void 0),F([h({attribute:!1})],rc.prototype,`options`,void 0),ic=class extends Es{constructor(...e){super(...e),this.start=0,this.hideLabels=!1,this.hideConnectors=!1,this.orientation=`vertical`}static{this.tagName=`minerva-waterfall-chart`}engineOptions(){return this.steps?{...this.options,orientation:this.orientation,series:[gt(this.steps,{name:this.valueName,upColor:this.upColor,downColor:this.downColor,totalColor:this.totalColor,start:this.start,labels:!this.hideLabels,format:this.format,connector:this.hideConnectors?!1:this.connector??!0,locale:this.options?.locale})]}:null}},F([h({attribute:!1})],ic.prototype,`steps`,void 0),F([h({attribute:`value-name`})],ic.prototype,`valueName`,void 0),F([h({attribute:`up-color`})],ic.prototype,`upColor`,void 0),F([h({attribute:`down-color`})],ic.prototype,`downColor`,void 0),F([h({attribute:`total-color`})],ic.prototype,`totalColor`,void 0),F([h({type:Number})],ic.prototype,`start`,void 0),F([h({type:Boolean,attribute:`hide-labels`})],ic.prototype,`hideLabels`,void 0),F([h({attribute:!1})],ic.prototype,`format`,void 0),F([h({type:Boolean,attribute:`hide-connectors`})],ic.prototype,`hideConnectors`,void 0),F([h({attribute:!1})],ic.prototype,`connector`,void 0),F([h()],ic.prototype,`orientation`,void 0),F([h({attribute:!1})],ic.prototype,`options`,void 0),ac=class extends Es{constructor(...e){super(...e),this.hideDependencyArrows=!1,this.today=!1,this.mountedAt=Date.now()}static{this.tagName=`minerva-gantt-chart`}engineOptions(){if(!this.tasks)return null;let e=St(this.tasks,{colors:this.colors,taskName:this.taskName,progressName:this.progressName,milestoneName:this.milestoneName,formatProgress:this.formatProgress,dependenciesName:this.dependenciesName,dependencyArrows:!this.hideDependencyArrows,dependencyColor:this.dependencyColor,locale:this.options?.locale}),t=this.today,n=t===!1?null:t===!0?this.mountedAt:t instanceof Date?t.getTime():t,r=n===null?[]:[{type:`line`,axis:`y`,value:n,color:`var(--danger-color, #dc2626)`,dash:[4,3],label:this.todayLabel}],i=this.options??{};return{...i,series:e.series,orientation:`horizontal`,xAxis:{type:`category`,categories:e.categories,...i.xAxis},yAxis:{type:`time`,min:e.domain[0],max:e.domain[1],...i.yAxis},annotations:[...i.annotations??[],...r],dependencies:e.dependencies,interaction:i.interaction??{zoom:`y`},legend:i.legend??e.series.length>1}}},F([h({attribute:!1})],ac.prototype,`tasks`,void 0),F([h({attribute:!1})],ac.prototype,`colors`,void 0),F([h({attribute:`task-name`})],ac.prototype,`taskName`,void 0),F([h({attribute:`progress-name`})],ac.prototype,`progressName`,void 0),F([h({attribute:`milestone-name`})],ac.prototype,`milestoneName`,void 0),F([h({attribute:`dependencies-name`})],ac.prototype,`dependenciesName`,void 0),F([h({type:Boolean,attribute:`hide-dependency-arrows`})],ac.prototype,`hideDependencyArrows`,void 0),F([h({attribute:`dependency-color`})],ac.prototype,`dependencyColor`,void 0),F([h({attribute:!1})],ac.prototype,`formatProgress`,void 0),F([h({attribute:!1})],ac.prototype,`today`,void 0),F([h({attribute:`today-label`})],ac.prototype,`todayLabel`,void 0),F([h({attribute:!1})],ac.prototype,`options`,void 0)})))()}var sc,cc,lc,uc,dc,fc,pc,mc,hc;function gc(){return(gc=e((()=>{Ys(),l(),sc=class extends Vs{constructor(...e){super(...e),this.align=`justify`,this.linkColor=`gradient`,this.hideLabels=!1}static{this.tagName=`minerva-sankey-chart`}get defaultHeight(){return 360}engineOptions(){let e=this.links??this.options?.links;return e?{...this.options,type:`sankey`,nodes:this.nodes??this.options?.nodes,links:e,align:this.align,linkColor:this.linkColor,labels:!this.hideLabels&&this.options?.labels}:null}},F([h({attribute:!1})],sc.prototype,`nodes`,void 0),F([h({attribute:!1})],sc.prototype,`links`,void 0),F([h()],sc.prototype,`align`,void 0),F([h({attribute:`link-color`})],sc.prototype,`linkColor`,void 0),F([h({type:Boolean,attribute:`hide-labels`})],sc.prototype,`hideLabels`,void 0),F([h({attribute:!1})],sc.prototype,`options`,void 0),cc=class extends Vs{constructor(...e){super(...e),this.innerRadius=.26,this.labels=`auto`,this.noDrill=!1}static{this.tagName=`minerva-sunburst-chart`}get defaultHeight(){return 360}bindEngine(e){return[...super.bindEngine(e),e.on(`drill`,e=>this.emit(`minerva-drill`,e))]}drill(e){this.instance?.drill(e)}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`sunburst`,data:e,innerRadius:this.innerRadius,labels:this.labels,drill:!this.noDrill&&this.options?.drill,drillPath:this.drillPath??this.options?.drillPath}:null}},F([h({attribute:!1})],cc.prototype,`data`,void 0),F([h({type:Number,attribute:`inner-radius`})],cc.prototype,`innerRadius`,void 0),F([h()],cc.prototype,`labels`,void 0),F([h({type:Boolean,attribute:`no-drill`})],cc.prototype,`noDrill`,void 0),F([h({attribute:!1})],cc.prototype,`drillPath`,void 0),F([h({attribute:!1})],cc.prototype,`options`,void 0),lc=class extends Vs{constructor(...e){super(...e),this.innerRadius=.3,this.sweep=270}static{this.tagName=`minerva-radial-bar-chart`}get defaultHeight(){return 300}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`radialBar`,data:e,max:this.max??this.options?.max,innerRadius:this.innerRadius,sweep:this.sweep,centerValue:this.centerValue??this.options?.centerValue,centerLabel:this.centerLabel??this.options?.centerLabel}:null}},F([h({attribute:!1})],lc.prototype,`data`,void 0),F([h({type:Number})],lc.prototype,`max`,void 0),F([h({type:Number,attribute:`inner-radius`})],lc.prototype,`innerRadius`,void 0),F([h({type:Number})],lc.prototype,`sweep`,void 0),F([h({attribute:`center-value`})],lc.prototype,`centerValue`,void 0),F([h({attribute:`center-label`})],lc.prototype,`centerLabel`,void 0),F([h({attribute:!1})],lc.prototype,`options`,void 0),uc=e=>(e instanceof Date?e:new Date(e)).getFullYear(),dc=e=>(e instanceof Date?e:new Date(e)).getTime(),fc=e=>{if(!Array.isArray(e))return 1;let[t,n]=e,r=uc(t),i=uc(n),a=(dc(n)-dc(t))/864e5+1;return i>r&&a>371?i-r+1:1},pc=class extends Vs{constructor(...e){super(...e),this.layout=`weeks`,this.levels=4}static{this.tagName=`minerva-calendar-heatmap`}get defaultHeight(){if(this.layout===`months`)return 560;let e=this.options?.legend===!1?0:34;return fc(this.range??this.options?.range)*120+e+16}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`calendarHeatmap`,data:e,range:this.range??this.options?.range,layout:this.layout,locale:this.locale??this.options?.locale,color:this.color??this.options?.color,levels:this.levels}:null}},F([h({attribute:!1})],pc.prototype,`data`,void 0),F([h({attribute:!1})],pc.prototype,`range`,void 0),F([h()],pc.prototype,`layout`,void 0),F([h()],pc.prototype,`locale`,void 0),F([h()],pc.prototype,`color`,void 0),F([h({type:Number})],pc.prototype,`levels`,void 0),F([h({attribute:!1})],pc.prototype,`options`,void 0),mc=class extends Vs{constructor(...e){super(...e),this.orientation=`horizontal`}static{this.tagName=`minerva-bullet-chart`}get defaultHeight(){if(this.orientation===`vertical`)return 320;let e=(this.data??this.options?.data??[]).length;return Math.max(96,e*64+16)+(this.options?.legend?34:0)}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`bullet`,data:e,orientation:this.orientation,ranges:this.ranges??this.options?.ranges,rangeLabels:this.rangeLabels??this.options?.rangeLabels,targetColor:this.targetColor??this.options?.targetColor}:null}},F([h({attribute:!1})],mc.prototype,`data`,void 0),F([h()],mc.prototype,`orientation`,void 0),F([h({attribute:!1})],mc.prototype,`ranges`,void 0),F([h({attribute:!1})],mc.prototype,`rangeLabels`,void 0),F([h({attribute:`target-color`})],mc.prototype,`targetColor`,void 0),F([h({attribute:!1})],mc.prototype,`options`,void 0),hc=class extends Vs{constructor(...e){super(...e),this.directed=!1,this.ribbonColor=`gradient`,this.labels=`auto`}static{this.tagName=`minerva-chord-chart`}get defaultHeight(){return 420}engineOptions(){let e=this.links??this.options?.links,t=this.matrix??this.options?.matrix;return!e&&!t?null:{...this.options,type:`chord`,groups:this.groups??this.options?.groups,matrix:t,links:e,directed:this.directed||this.options?.directed,ribbonColor:this.ribbonColor,labels:this.labels,tickFormat:this.tickFormat??this.options?.tickFormat}}},F([h({attribute:!1})],hc.prototype,`groups`,void 0),F([h({attribute:!1})],hc.prototype,`matrix`,void 0),F([h({attribute:!1})],hc.prototype,`links`,void 0),F([h({type:Boolean})],hc.prototype,`directed`,void 0),F([h({attribute:`ribbon-color`})],hc.prototype,`ribbonColor`,void 0),F([h()],hc.prototype,`labels`,void 0),F([h({attribute:!1})],hc.prototype,`tickFormat`,void 0),F([h({attribute:!1})],hc.prototype,`options`,void 0)})))()}function _c(e){return xc.add(e),!Sc&&typeof MutationObserver<`u`&&(Sc=new MutationObserver(()=>{for(let e of[...xc])e()}),Sc.observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`],subtree:!0})),()=>{xc.delete(e),xc.size===0&&(Sc?.disconnect(),Sc=null)}}var vc,yc,bc,xc,Sc,Q;function Cc(){return(Cc=e((()=>{E(),M(),Ut(),x(),T(),C(),dr(),Ii(),Jr(),mr(),c(),l(),p(),lt(),vc=(e,t)=>Number.isFinite(e)&&e>0?e:t,yc=e=>e===`dark`||e===`github-dark`?`dark`:e===`light`?`light`:void 0,bc=e=>typeof e?.editor?.create==`function`,xc=new Set,Sc=null,Q=class e extends yr{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.language=`plaintext`,this.label=``,this.height=420,this.minHeight=160,this.maxHeight=800,this.loadTimeout=1e4,this.status=`loading`,this.scopeTheme=`light`,this.locale=new P(this),this.editor=null,this.engine=null,this.container=null,this.subscriptions=[],this.applying=!1,this.edited=!1,this.dirty=!1,this.unobserveTheme=null,this.started=!1}static{this.tagName=`minerva-code-editor`}static{this.dependencies=[V,qr]}static{this.styles=[D,y`
:host{
display: block;
min-width: 0;
}
::slotted([slot="editor"]){
flex: 1;
min-height: 0;
width: 100%;
}
.label{
cursor: default;
}
`,b(Er)]}get resolvedTheme(){return this.theme===`dark`||this.theme===`light`?this.theme:this.scopeTheme}focus(e){this.editor?this.editor.focus():this.fallback?.focus(e)}retry(){this.load()}getFormValue(){return this.value}getValidity(){return this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.fallback??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}connectedCallback(){super.connectedCallback(),this.syncScopeTheme(),this.unobserveTheme=_c(()=>this.syncScopeTheme()),this.started&&this.load()}disconnectedCallback(){super.disconnectedCallback(),this.unobserveTheme?.(),this.unobserveTheme=null,this.teardown()}syncScopeTheme(){let e=pn(this,`[data-theme]`);this.scopeTheme=yc(e?.getAttribute(`data-theme`))??`light`}get monacoTheme(){return this.resolvedTheme===`dark`?`vs-dark`:`vs`}teardown(){clearTimeout(this.timer),this.timer=void 0;for(let e of this.subscriptions)e.dispose();this.subscriptions=[];try{this.editor?.dispose()}catch{}this.editor=null,this.engine=null,this.container?.remove(),this.container=null}fail(){let e=this.status===`error`;this.teardown(),this.status=`error`,e||this.emit(`minerva-error`)}load(){this.teardown(),this.status=`loading`,this.isConnected&&(this.timer=setTimeout(()=>this.fail(),this.loadTimeout),this.monaco!==void 0&&this.mount())}mount(){let t=this.monaco;if(!bc(t)){N&&A(e.tagName,'`monaco` is not a Monaco engine (expected `import * as monaco from "monaco-editor"`); showing the textarea fallback.'),this.fail();return}let n=document.createElement(`div`);n.slot=`editor`,n.setAttribute(`data-minerva-code-editor`,``),this.append(n),this.container=n;try{t.editor.setTheme(this.monacoTheme);let e=t.editor.create(n,{value:this.value,language:this.language,theme:this.monacoTheme,readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label,automaticLayout:!0,minimap:{enabled:!1},wordWrap:`on`,scrollBeyondLastLine:!1});this.editor=e,this.engine=t,this.subscriptions.push(e.onDidChangeModelContent(()=>this.handleEdit()),e.onDidBlurEditorText(()=>this.commit()))}catch{this.fail();return}clearTimeout(this.timer),this.timer=void 0,this.status=`mounted`}handleEdit(){let e=this.editor;e&&!this.applying&&(this.isDisabled||(this.value=e.getValue(),this.dirty=!0,this.edited=!0,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:this.value})))}commit(){this.edited&&(this.edited=!1,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}handleFallbackInput(e){this.isDisabled||(this.value=e.target.value,this.dirty=!0,this.edited=!0,this.emit(`minerva-input`,{value:this.value}))}applyValue(){let e=this.editor;if(e&&e.getValue()!==this.value){this.applying=!0;try{let t=e.getModel();this.isDisabled||!t?e.setValue(this.value):(e.executeEdits(``,[{range:t.getFullModelRange(),text:this.value,forceMoveMarkers:!0}]),e.pushUndoStop())}finally{this.applying=!1}}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){if(super.updated(t),!this.started){this.started=!0,N&&!this.label&&A(e.tagName,`set label: it is the visible label and the accessible name of the editor.`),this.load();return}if(t.has(`monaco`)&&t.get(`monaco`)!==void 0){this.load();return}t.has(`monaco`)&&this.monaco!==void 0&&!this.editor&&(this.status===`loading`&&this.timer!==void 0?this.mount():this.status===`error`&&this.load());let n=this.editor,r=this.engine;if(n&&r)try{t.has(`value`)&&this.applyValue(),t.has(`language`)&&r.editor.setModelLanguage(n.getModel(),this.language),(t.has(`disabled`)||t.has(`formDisabled`)||t.has(`label`))&&n.updateOptions({readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label}),(t.has(`theme`)||t.has(`scopeTheme`))&&r.editor.setTheme(this.monacoTheme)}catch{this.fail()}}hookStates(){return{disabled:this.isDisabled,loading:this.status===`loading`}}render(){let e=vc(this.minHeight,160),t=Math.max(e,vc(this.maxHeight,800)),n=Math.min(t,Math.max(e,vc(this.height,420))),r=this.locale.t,i=this.status;return f`<div
part="root"
class="root"
role="group"
aria-label=${this.label||d}
>
<label
part="label"
class="label"
for=${i===`error`?`fallback`:d}
@click=${()=>this.editor?.focus()}
>${this.label}</label
>
<div
part="surface"
class="surface"
style=${v({height:`${n}px`})}
aria-busy=${i===`loading`?`true`:`false`}
>
${i===`error`?f`<div part="error" class="error">
                  <div class="message" role="alert">
                    ${this.unavailableText??r(`monacoCodeEditor.unavailable`)}
                  </div>
                  <minerva-button
                    part="retry-button"
                    color="neutral"
                    variant="outline"
                    size="small"
                    aria-label=${this.retryLabel??r(`monacoCodeEditor.retryLabel`)}
                    @click=${()=>this.retry()}
                  >
                    <span slot="start" class="retryIcon" aria-hidden="true"
                      >${Tn}</span
                    >
                    ${this.retryText??r(`monacoCodeEditor.retry`)}
                  </minerva-button>
                </div>
                <textarea
                  id="fallback"
                  part="fallback"
                  class="fallback"
                  aria-label=${this.label||d}
                  spellcheck="false"
                  .value=${st(this.value)}
                  ?disabled=${this.isDisabled}
                  @input=${this.handleFallbackInput}
                  @change=${()=>this.commit()}
                ></textarea>`:f`${i===`loading`?f`<div part="loading" class="loading" role="status">
<minerva-progress
size="small"
aria-label=${this.loadingLabel??r(`monacoCodeEditor.loading`)}
></minerva-progress>
</div>`:d}<slot name="editor"></slot>`}
</div>
</div>`}},F([h({attribute:!1})],Q.prototype,`monaco`,void 0),F([h({attribute:!1})],Q.prototype,`value`,void 0),F([h({attribute:`value`})],Q.prototype,`defaultValue`,void 0),F([h({reflect:!0})],Q.prototype,`language`,void 0),F([h()],Q.prototype,`label`,void 0),F([h({type:Number})],Q.prototype,`height`,void 0),F([h({type:Number,attribute:`min-height`})],Q.prototype,`minHeight`,void 0),F([h({type:Number,attribute:`max-height`})],Q.prototype,`maxHeight`,void 0),F([h({reflect:!0})],Q.prototype,`theme`,void 0),F([h({type:Number,attribute:`load-timeout`})],Q.prototype,`loadTimeout`,void 0),F([h({attribute:`unavailable-text`})],Q.prototype,`unavailableText`,void 0),F([h({attribute:`retry-text`})],Q.prototype,`retryText`,void 0),F([h({attribute:`retry-label`})],Q.prototype,`retryLabel`,void 0),F([h({attribute:`loading-label`})],Q.prototype,`loadingLabel`,void 0),F([u()],Q.prototype,`status`,void 0),F([u()],Q.prototype,`scopeTheme`,void 0),F([g(`textarea`)],Q.prototype,`fallback`,void 0)})))()}var wc,Tc,Ec,Dc,$,Oc,kc,Ac;function jc(){return(jc=e((()=>{ys(),l(),Dt(),wc=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},Tc=(e,t)=>{let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&e[n]===t[n])},Ec=(e,t)=>e===t?!0:Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):wc(e)&&wc(t)&&Tc(e,t),Dc=(e,t)=>{let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&Ec(e[n],t[n]))},$=class extends vs{constructor(...e){super(...e),this.height=480,this.edgeColor=`neutral`,this.arrowStyle=`open`,this.previous=null}createEngine(e,t){return this.previous=t,Et(e,t)}engineOptions(){return!this.nodes||!this.edges?null:{...this.options,nodes:this.nodes,edges:this.edges,groups:this.groups,...this.layoutOptions(),nodeShape:this.nodeShape??this.options?.nodeShape,edgeStyle:this.edgeStyle??this.options?.edgeStyle,edgeColor:this.edgeColor,arrowStyle:this.arrowStyle,highlight:this.highlight??this.options?.highlight,locale:this.locale??this.options?.locale,selected:this.selected??this.options?.selected}}syncEngine(e){let t=this.engineOptions();!t||this.previous&&Dc(this.previous,t)||(this.previous=t,e.setOptions(t))}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-item-click`,e)),e.on(`select`,e=>this.emit(`minerva-selection-change`,{ids:e.ids})),e.on(`toggle`,e=>this.emit(`minerva-toggle`,e)),e.on(`groupToggle`,e=>this.emit(`minerva-group-toggle`,e)),e.on(`layoutEnd`,e=>this.emit(`minerva-layout-end`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}fit(e){this.instance?.fit(e)}focusNode(e,t){this.instance?.focusNode(e,t)}setData(e){this.instance?.setData(e)}select(e){this.instance?.select(e)}getSelection(){return this.instance?.getSelection()??[]}expand(e){this.instance?.expand(e)}collapse(e){this.instance?.collapse(e)}toggle(e){this.instance?.toggle(e)}getPositions(){return this.instance?.getPositions()??{}}relayout(){this.instance?.relayout()}getRenderer(){return this.instance?.getRenderer()??null}},F([h()],$.prototype,`height`,void 0),F([h({attribute:!1})],$.prototype,`nodes`,void 0),F([h({attribute:!1})],$.prototype,`edges`,void 0),F([h({attribute:!1})],$.prototype,`groups`,void 0),F([h({attribute:`node-shape`})],$.prototype,`nodeShape`,void 0),F([h({attribute:`edge-style`})],$.prototype,`edgeStyle`,void 0),F([h({attribute:`edge-color`})],$.prototype,`edgeColor`,void 0),F([h({attribute:`arrow-style`})],$.prototype,`arrowStyle`,void 0),F([h()],$.prototype,`highlight`,void 0),F([h()],$.prototype,`locale`,void 0),F([h({attribute:!1})],$.prototype,`selected`,void 0),F([h({attribute:!1})],$.prototype,`options`,void 0),Oc=class extends ${constructor(...e){super(...e),this.layout=`force`}static{this.tagName=`minerva-graph-chart`}layoutOptions(){return{layout:this.layout,direction:this.direction??this.options?.direction,force:this.options?.force,circular:this.options?.circular,dag:this.options?.dag,tree:this.options?.tree}}},F([h()],Oc.prototype,`layout`,void 0),F([h()],Oc.prototype,`direction`,void 0),kc=class extends ${constructor(...e){super(...e),this.direction=`TB`}static{this.tagName=`minerva-dependency-graph`}layoutOptions(){let e=this.options?.dag,t=this.criticalPath;return{layout:`dag`,direction:this.direction,dag:t===void 0?e:{...e,criticalPath:t}}}},F([h()],kc.prototype,`direction`,void 0),F([h({type:Boolean,attribute:`critical-path`})],kc.prototype,`criticalPath`,void 0),Ac=class extends ${constructor(...e){super(...e),this.layout=`tree`,this.direction=`LR`}static{this.tagName=`minerva-tree-chart`}layoutOptions(){return{layout:this.layout,direction:this.layout===`tree`?this.direction:void 0,tree:this.options?.tree}}},F([h()],Ac.prototype,`layout`,void 0),F([h()],Ac.prototype,`direction`,void 0)})))()}var Mc,Nc,Pc;function Fc(){return(Fc=e((()=>{qt(),ge(),Mc=new Set(be),Nc=e=>e&&Mc.has(e)?e:null,Pc=class{constructor(e,t){this.kind=null,this.host=e,this.changed=t}get current(){return this.kind}report(e){this.kind!==e&&(this.kind=e,en(this.host,`data-renderer`,e),this.changed(e))}clear(){this.kind&&(this.kind=null,en(this.host,`data-renderer`,null))}}})))()}var Ic,Lc,Rc,zc;function Bc(){return(Bc=e((()=>{E(),T(),Fc(),c(),l(),p(),pt(),Nt(),Me(),Ic=24,Lc=2,Rc=(e,t)=>typeof e==`number`&&Number.isFinite(e)&&e>0?e:t,zc=class e extends O{constructor(...e){super(...e),this.size=24,this.color=`currentColor`,this.strokeWidth=2,this.absoluteStrokeWidth=!1,this.renderer=`svg`,this.surface=null,this.surfaceCanvas=null,this.drawn=new Pc(this,e=>this.emit(`minerva-renderer-change`,{renderer:e}))}static{this.tagName=`minerva-icon`}static{this.styles=[D,y`
:host{
display: inline-flex;
flex: none;
align-items: center;
justify-content: center;
vertical-align: middle;
line-height: 0;
}
svg,
canvas{
display: block;
}
`]}getRenderer(){return this.drawn.current}definition(){if(this.icon)return this.icon;if(!this.name)return;let t=Ue(this.name);return!t&&N&&A(e.tagName,`unknown icon name "${this.name}": nothing is rendered (see icons of minerva-design/icons/core).`),t}disconnectedCallback(){super.disconnectedCallback(),this.releaseSurface()}updated(e){super.updated(e),this.syncSurface()}syncSurface(){let e=this.renderRoot.querySelector(`canvas[part=icon]`),t=this.definition(),n=Nc(this.renderer);if(!this.isConnected||!e||!t||!n){this.releaseSurface();return}this.surfaceCanvas!==e&&this.releaseSurface();let r=Rc(this.size,Ic),i=Rc(this.strokeWidth,Lc),a={icon:t,size:r,color:this.color||`currentColor`,strokeWidth:this.absoluteStrokeWidth?i*24/r:i,renderer:n,onRendererChange:e=>this.drawn.report(e)};this.surface?this.surface.update(a):(this.surface=Pt(e,a),this.surfaceCanvas=e)}releaseSurface(){this.surface?.destroy(),this.surface=null,this.surfaceCanvas=null,this.drawn.clear()}render(){let e=this.definition();if(!e)return d;let t=Rc(this.size,Ic),n=this.label||void 0;if(Nc(this.renderer))return f`<canvas
part="icon"
data-icon=${e.name}
role=${dt(n&&`img`)}
aria-label=${dt(n)}
aria-hidden=${dt(n?void 0:`true`)}
style=${v({width:`${t}px`,height:`${t}px`})}
></canvas>`;let r=this.absoluteStrokeWidth?`non-scaling-stroke`:void 0;return f`<svg
part="icon"
xmlns="http://www.w3.org/2000/svg"
width=${t}
height=${t}
viewBox="0 0 24 24"
fill="none"
stroke=${this.color||`currentColor`}
stroke-width=${Rc(this.strokeWidth,Lc)}
stroke-linecap="round"
stroke-linejoin="round"
data-icon=${e.name}
role=${dt(n&&`img`)}
aria-label=${dt(n)}
aria-hidden=${dt(n?void 0:`true`)}
>
${n?nt`<title>${n}</title>`:d}
${e.paths.map((t,n)=>nt`<path d=${t} stroke=${dt(e.colors?.[n])} vector-effect=${dt(r)}></path>`)}
</svg>`}},F([h()],zc.prototype,`name`,void 0),F([h({attribute:!1})],zc.prototype,`icon`,void 0),F([h({type:Number})],zc.prototype,`size`,void 0),F([h()],zc.prototype,`color`,void 0),F([h({type:Number,attribute:`stroke-width`})],zc.prototype,`strokeWidth`,void 0),F([h({type:Boolean,attribute:`absolute-stroke-width`})],zc.prototype,`absoluteStrokeWidth`,void 0),F([h()],zc.prototype,`label`,void 0),F([h()],zc.prototype,`renderer`,void 0)})))()}var Vc,Hc,Uc,Wc,Gc;function Kc(){return(Kc=e((()=>{T(),Fc(),c(),l(),p(),pt(),ne(),Vc=e=>typeof e==`number`&&Number.isFinite(e)&&e>0?e:void 0,Hc=(e,t)=>typeof e==`number`?Number.isFinite(e)&&e>=0?`${e}px`:t:e?.trim()||t,Uc={fromAttribute:e=>e===null?void 0:/^\s*\d+(\.\d+)?\s*$/.test(e)?Number(e):e,toAttribute:e=>e===void 0?null:String(e)},Wc=[`renderer`,`pixelRatio`],Gc=class extends O{constructor(...e){super(...e),this.items=[],this.renderer=`auto`,this.width=`100%`,this.height=240,this.controller=null,this.drawn=new Pc(this,e=>this.emit(`minerva-renderer-change`,{renderer:e}))}static{this.tagName=`minerva-icon-canvas`}static{this.styles=[D,y`
:host{
display: block;
position: relative;
}
.surface{
position: relative;
max-width: 100%;
}
`]}get canvas(){return this.controller?.canvas??null}getRenderer(){return this.controller?.renderer??null}async ready(){if(await this.updateComplete,!this.controller)throw Error(`<minerva-icon-canvas> is not connected`);return this.controller.ready()}settings(){return{renderer:Nc(this.renderer)??`auto`,pixelRatio:Vc(this.pixelRatio)}}disconnectedCallback(){super.disconnectedCallback(),this.controller?.destroy(),this.controller=null,this.drawn.clear()}updated(e){if(super.updated(e),!this.controller){this.mount();return}e.has(`items`)&&this.controller.setItems(this.items??[]),Wc.some(t=>e.has(t))&&this.controller.setOptions(this.settings())}mount(){if(this.controller||!this.isConnected)return;let e=this.renderRoot.querySelector(`[part=surface]`);e&&(this.controller=ce(e,{...this.settings(),items:this.items??[],onRendererChange:e=>this.drawn.report(e)}))}render(){let e=this.label||void 0;return f`<div
part="surface"
class="surface"
role=${dt(e&&`img`)}
aria-label=${dt(e)}
aria-hidden=${dt(e?void 0:`true`)}
style=${v({width:Hc(this.width,`100%`),height:Hc(this.height,`240px`)})}
></div>`}},F([h({attribute:!1})],Gc.prototype,`items`,void 0),F([h()],Gc.prototype,`renderer`,void 0),F([h({converter:Uc})],Gc.prototype,`width`,void 0),F([h({converter:Uc})],Gc.prototype,`height`,void 0),F([h({type:Number,attribute:`pixel-ratio`})],Gc.prototype,`pixelRatio`,void 0),F([h()],Gc.prototype,`label`,void 0)})))()}export{bs as $,K as $t,Gs as A,B as An,xo as At,Ps as B,vi as Bn,to as Bt,tc as C,Ki as Cn,Ro as Ct,rc as D,qi as Dn,wo as Dt,Qs as E,Yi as En,Do as Et,Us as F,Di as Fn,ho as Ft,Ls as G,Xa as Gt,Rs as H,gi as Hn,$a as Ht,Ws as I,wi as In,q as It,Ds as J,Ha as Jt,Is as K,Wa as Kt,qs as L,Ci as Ln,po as Lt,Vs as M,Ai as Mn,Y as Mt,Ys as N,ki as Nn,vo as Nt,ic as O,Ii as On,Co as Ot,Ks as P,Ei as Pn,J as Pt,ws as Q,za as Qt,Z as R,Ti as Rn,co as Rt,Zs as S,Xi as Sn,Fo as St,$s as T,Zi as Tn,Oo as Tt,Bs as U,I as Un,Qa as Ut,Fs as V,L as Vn,eo as Vt,Ms as W,di as Wn,Ya as Wt,Os as X,La as Xt,Es as Y,Va as Yt,xs as Z,Ra as Zt,pc as _,U as _n,zo as _t,$ as a,_a as an,X as at,ac as b,Ji as bn,Po as bt,Oc as c,G as cn,ls as ct,Q as d,ma as dn,as as dt,Fa as en,Ts as et,Cc as f,W as fn,ss as ft,gc as g,aa as gn,Io as gt,cc as h,la as hn,No as ht,zc as i,Oa as in,ys as it,Js as j,Pi as jn,So as jt,Hs as k,V as kn,To as kt,Dc as l,ga as ln,ps as lt,hc as m,ca as mn,is as mt,Kc as n,ja as nn,Cs as nt,Ac as o,ka as on,gs as ot,lc as p,da as pn,Ko as pt,Ns as q,Ga as qt,Bc as r,Aa as rn,vs as rt,jc as s,xa as sn,ms as st,Gc as t,Ia as tn,Ss as tt,kc as u,ha as un,cs as ut,sc as v,H as vn,Go as vt,oc as w,Ui as wn,jo as wt,Xs as x,Gi as xn,Vo as xt,mc as y,ra as yn,Lo as yt,js as z,R as zn,lo as zt};