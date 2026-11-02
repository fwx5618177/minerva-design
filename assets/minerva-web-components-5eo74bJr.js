import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{_ as t,g as n,h as r,m as i}from"./native-preview-BE7t9d_r.js";import{$ as a,At as o,Bn as s,Cn as c,Ct as l,D as u,Dn as ee,E as te,Et as ne,F as re,Gt as ie,H as ae,I as oe,Jn as se,Jt as ce,K as le,Kt as ue,L as de,Lt as fe,Mn as pe,N as me,O as he,Pn as ge,Q as _e,R as ve,Sn as ye,T as be,Tn as xe,U as Se,Un as Ce,Ut as we,W as Te,Xn as Ee,Xt as De,Yn as Oe,Z as ke,Zn as Ae,_n as je,a as Me,at as Ne,c as Pe,cn as Fe,d as Ie,er as Le,et as Re,fn as ze,ft as Be,gt as Ve,in as He,jn as Ue,jt as We,kt as Ge,l as Ke,m as qe,mn as Je,nn as Ye,nt as Xe,o as Ze,on as Qe,pn as $e,pt as et,q as tt,qn as nt,qt as rt,r as it,rn as at,rt as ot,t as st,ut as ct,v as lt,vn as ut,wn as dt,wt as ft,xt as pt,yt as mt,zt as ht}from"./angular-preview-DXAccp5O.js";import{A as d,C as f,D as p,H as gt,I as _t,N as m,P as h,U as vt,_ as g,a as yt,b as _,c as bt,f as xt,g as St,i as Ct,k as v,m as wt,p as Tt,r as Et,s as Dt,t as Ot,u as kt,w as y,x as b,y as x,z as S}from"./minerva-web-components-DlAztivh.js";import{I as At,L as jt,N as Mt,O as Nt,R as Pt,S as Ft,_ as It,b as Lt,g as Rt,j as zt,n as Bt,p as Vt,t as Ht,v as Ut}from"./angular-preview-0SNwh-J1.js";import{n as Wt,t as Gt}from"./angular-preview-CTFF7nBd.js";import{n as Kt,t as qt}from"./angular-preview-BKYVHA80.js";import{D as Jt,O as Yt,X as Xt,Z as Zt,i as Qt,r as $t}from"./angular-preview-DKTVr4S_.js";import{n as en,t as tn}from"./minerva-web-components-DjN88vms.js";import{$n as nn,$t as rn,An as an,Ar as on,At as sn,Bn as cn,Br as ln,Bt as un,Cn as dn,Cr as fn,Ct as pn,Dn as mn,Dr as C,Dt as hn,En as gn,Er as w,Et as _n,Fn as T,Fr as E,Ft as vn,Gn as yn,Gt as bn,Hn as xn,Hr as Sn,Ht as Cn,In as wn,Ir as D,It as Tn,Jn as En,Jr as Dn,Jt as On,Kn as kn,Kt as An,Ln as jn,Lr as O,Lt as Mn,Mn as Nn,Mr as Pn,Mt as Fn,Nn as In,Nr as Ln,Nt as Rn,On as zn,Or as k,Ot as Bn,Pn as A,Pr as Vn,Pt as Hn,Qn as Un,Qt as Wn,Rr as Gn,Rt as Kn,Sn as qn,Sr as j,St as Jn,Tn as Yn,Tr as M,Tt as Xn,Un as Zn,Ur as N,Ut as Qn,Vn as $n,Vr as er,Vt as tr,Wn as nr,Wr as P,Wt as rr,Yn as ir,Zn as ar,Zt as or,_n as sr,_t as cr,a as lr,an as ur,ar as dr,b as fr,bn as pr,br as F,c as mr,cn as hr,cr as gr,dn as _r,dr as vr,en as yr,er as br,fn as xr,fr as Sr,gn as Cr,gr as wr,gt as Tr,hn as Er,hr as Dr,ht as Or,in as kr,ir as Ar,it as jr,jn as Mr,jr as Nr,jt as Pr,kn as Fr,kr as I,kt as Ir,l as Lr,ln as Rr,lr as zr,mn as Br,n as Vr,nn as Hr,nr as Ur,o as Wr,on as Gr,or as Kr,pn as qr,qr as Jr,qt as Yr,rn as Xr,rr as Zr,rt as Qr,s as $r,sn as ei,t as ti,tn as ni,tr as ri,u as ii,un as ai,ur as oi,vn as si,vt as ci,wn as li,wr as ui,wt as di,xn as fi,xr as L,xt as pi,y as mi,yn as hi,zr as gi,zt as _i}from"./minerva-web-components-NBv7MRrv.js";import{t as R}from"./minerva-web-components-D61_qRVd.js";import{$t as vi,Jt as yi,Xt as bi,Yt as xi,an as Si,cn as Ci,dn as wi,en as Ti,fn as Ei,in as Di,ln as Oi,mn as ki,nn as Ai,on as ji,pn as Mi,qt as Ni,rn as Pi,sn as Fi,tn as Ii,un as Li}from"./minerva-web-components-C9HHELE5.js";var Ri,zi,z;function Bi(){return(Bi=e((()=>{ui(),N(),F(),dr(),E(),I(),w(),A(),d(),f(),_(),g(),he(),Ri={info:En,success:jn,warning:ir,danger:wr},zi=[`slideIn`,`fadeIn`,`bounce`,`zoom`],z=class e extends C{constructor(...e){super(...e),this.color=`info`,this.variant=`subtle`,this.size=`medium`,this.heading=``,this.hideIcon=!1,this.closable=!1,this.noAnimation=!1,this.animationName=`slideIn`,this.banner=!1,this.elevation=!1,this.square=!1,this.collapsible=!1,this.collapsed=!1,this.locale=new D(this),this.aria=new P(this),this.slots=new M(this)}static{this.tagName=`minerva-alert`}static{this.styles=[k,S`
:host{
display: block;
}
.icon svg,
.expandButton svg,
.closeButton svg{
display: block;
}
`,T(fn)]}get hasHeading(){return!!this.heading||this.slots.test(`heading`)}handleExpand(){let e=this.collapsed;this.emit(`minerva-expanded-change`,{expanded:e},{cancelable:!0})&&(this.collapsed=!e)}handleClose(){let e=this.adjacentTabbable(),t=this.parentElement;this.emit(`minerva-close`,{},{cancelable:!0})&&(this.isFocusInsideOrLost()&&this.moveFocusOut(e,t),this.hidden=!0)}isFocusInsideOrLost(){let e=this.ownerDocument,t=Se(e);return!t||t===e.body||!t.isConnected||qe(this,t)}adjacentTabbable(){let e=Pe(this.ownerDocument.body),t=e.map((e,t)=>qe(this,e)?t:-1).filter(e=>e>=0);if(!t.length)return null;let n=e=>!qe(this,e)&&me(e);return e.slice(t[t.length-1]+1).find(n)??e.slice(0,t[0]).filter(n).pop()??null}moveFocusOut(e,t){let n=typeof this.returnFocus==`function`?this.returnFocus():this.returnFocus;n?.isConnected&&Ie(n)||e?.isConnected&&Ie(e)||this.focusContainer(t)}focusContainer(e){let t=this.ownerDocument;if(e?.isConnected){for(let n=e;n&&n!==t.body;n=n.parentElement)if(n.hasAttribute(`tabindex`)&&Ie(n))return;e!==t.body&&e!==t.documentElement&&(e.setAttribute(`tabindex`,`-1`),e.addEventListener(`blur`,()=>{e.getAttribute(`tabindex`)===`-1`&&e.removeAttribute(`tabindex`)},{once:!0}),Ie(e,{preventScroll:!0}))}}updated(){j&&this.collapsible&&!this.hasHeading&&L(e.tagName,`collapsible needs a heading (the toggle lives in the title): set heading or fill the heading slot.`)}hookStates(){return{state:this.collapsible&&this.hasHeading?this.collapsed?`closed`:`open`:void 0,size:this.size,variant:this.variant,color:this.color}}render(){let e=this.locale.t,t=this.hasHeading,n=this.collapsible&&t,r=!this.collapsed,i=this.slots.test(`[default]`),a=!this.noAnimation,o=this.borderRadius,s=this.alertRole??(this.color===`danger`||this.color===`warning`?`alert`:`status`);return h`<div
part="root"
class=${b({alert:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,withIcon:!this.hideIcon,withTitle:t,banner:this.banner,withAnimation:a,[`animation-${this.animationName}`]:a&&zi.includes(this.animationName),withElevation:this.elevation,rounded:!this.square,expanded:r,collapsible:n})}
style=${x({borderRadius:o==null||o===``?void 0:/^\d+(\.\d+)?$/.test(String(o))?`${o}px`:String(o)})}
role=${s}
aria-label=${this.aria.label??m}
>
${this.hideIcon?m:h`<span
part="icon"
class="icon"
role="img"
aria-label=${this.iconLabel??e(`alert.icon.${this.color}`)}
><slot name="icon">${Ri[this.color]??Ri.info}</slot></span
>`}
<div class="content">
${t?h`<div class="title" part="title">
<slot name="heading">${this.heading}</slot>
${n?h`<button
type="button"
part="trigger"
class="expandButton"
aria-label=${r?this.collapseLabel??e(`alert.collapse`):this.expandLabel??e(`alert.expand`)}
aria-expanded=${String(r)}
aria-controls=${r&&i?`message`:m}
@click=${this.handleExpand}
>
${r?vr:ri}
</button>`:m}
</div>`:m}
${i&&(!n||r)?h`<div id="message" class="message" part="description">
<slot></slot>
</div>`:m}
</div>
${this.slots.test(`action`)?h`<div class="action" part="action">
<slot name="action"></slot>
</div>`:m}
${this.closable?h`<button
type="button"
part="close-button"
class="closeButton"
aria-label=${this.closeLabel??e(`alert.close`)}
@click=${this.handleClose}
>
<slot name="close-icon">${Sr}</slot>
</button>`:m}
</div>`}},R([v({reflect:!0})],z.prototype,`color`,void 0),R([v({reflect:!0})],z.prototype,`variant`,void 0),R([v({reflect:!0})],z.prototype,`size`,void 0),R([v()],z.prototype,`heading`,void 0),R([v({type:Boolean,attribute:`hide-icon`})],z.prototype,`hideIcon`,void 0),R([v({type:Boolean,reflect:!0})],z.prototype,`closable`,void 0),R([v({type:Boolean,attribute:`no-animation`})],z.prototype,`noAnimation`,void 0),R([v({attribute:`animation-name`})],z.prototype,`animationName`,void 0),R([v({type:Boolean,reflect:!0})],z.prototype,`banner`,void 0),R([v({type:Boolean,reflect:!0})],z.prototype,`elevation`,void 0),R([v({type:Boolean,reflect:!0})],z.prototype,`square`,void 0),R([v({attribute:`border-radius`})],z.prototype,`borderRadius`,void 0),R([v({type:Boolean,reflect:!0})],z.prototype,`collapsible`,void 0),R([v({type:Boolean,reflect:!0})],z.prototype,`collapsed`,void 0),R([v({attribute:`close-label`})],z.prototype,`closeLabel`,void 0),R([v({attribute:`expand-label`})],z.prototype,`expandLabel`,void 0),R([v({attribute:`collapse-label`})],z.prototype,`collapseLabel`,void 0),R([v({attribute:`icon-label`})],z.prototype,`iconLabel`,void 0),R([v({attribute:`alert-role`})],z.prototype,`alertRole`,void 0),R([v({attribute:!1})],z.prototype,`returnFocus`,void 0)})))()}var Vi,Hi,Ui,Wi,B;function Gi(){return(Gi=e((()=>{F(),dr(),gi(),E(),I(),w(),A(),Mr(),Fr(),Mi(),Oi(),Fi(),Di(),d(),f(),_(),he(),Vi=[`expanded`,`compact`,`floating`],Hi=`(max-width: 768px)`,Ui=()=>typeof window<`u`&&typeof window.matchMedia==`function`?window.matchMedia(Hi):null,Wi={iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,control:!0},B=class e extends C{constructor(...e){super(...e),this.brand=``,this.sidebarMode=`expanded`,this.noSkipLink=!1,this.collapsed=!1,this.mobile=!1,this.drawerOpen=!1,this.hovered=!1,this.keyboardFocus=!1,this.locale=new D(this),this.slots=new M(this),this.modal=new Si(this),this.focusScope=new Li(this,()=>({trapped:!0,loop:!0,restoreFocus:!1})),this.layer=new ki(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.headerToggle],onFocusOutside:e=>e.preventDefault(),onDismiss:()=>this.requestDrawer(!1)})),this.query=null,this.drawerActive=!1,this.handleMediaChange=()=>this.syncMobile()}static{this.tagName=`minerva-app-shell`}static{this.styles=[k,Ci,S`
:host{
display: block;
}
`,T(zn),T(an)]}openNavigation(){this.mobile&&(this.drawerOpen=!0)}closeNavigation(){this.drawerOpen=!1}expandNavigation(){this.sidebarMode=`expanded`}focusMain(){this.main?.focus()}connectedCallback(){super.connectedCallback(),this.query=Ui(),this.query?.addEventListener(`change`,this.handleMediaChange),this.syncMobile()}disconnectedCallback(){super.disconnectedCallback(),this.query?.removeEventListener(`change`,this.handleMediaChange),this.query=null,this.deactivateDrawer()}syncMobile(){let e=!!this.query?.matches;e!==this.mobile&&(this.mobile=e,this.hovered=!1,this.keyboardFocus=!1,this.drawerOpen=!1)}get mode(){return Vi.includes(this.sidebarMode)?this.sidebarMode:`expanded`}setMode(e){e!==this.mode&&this.emit(`minerva-sidebar-mode-change`,{mode:e},{cancelable:!0})&&(this.sidebarMode=e)}requestDrawer(e){e!==this.drawerOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.drawerOpen=e)}willUpdate(e){e.has(`navigationKey`)&&e.get(`navigationKey`)!==void 0&&(this.drawerOpen=!1),this.mobile||(this.drawerOpen=!1),this.collapsed=!this.mobile&&this.mode!==`expanded`&&(this.mode!==`floating`||!this.hovered&&!this.keyboardFocus)}updated(t){let n=this.mobile&&this.drawerOpen;n&&!this.drawerActive&&this.drawer?(this.drawerActive=!0,Gn(this.overlay),Gn(this.drawer),this.modal.activate(this),this.layer.activate(this.drawer),this.focusScope.activate(this.drawer)):!n&&this.drawerActive&&(this.deactivateDrawer(),this.headerToggle?.focus()),j&&t.has(`sidebarMode`)&&!Vi.includes(this.sidebarMode)&&L(e.tagName,`unknown sidebar-mode="${this.sidebarMode}" (expected ${Vi.join(`, `)}); using "expanded".`),j&&!this.slots.test(`navigation`)&&L(e.tagName,`put the navigation in the "navigation" slot (e.g. <nav slot="navigation">).`)}hookStates(){return{state:this.mobile&&this.drawerOpen?`open`:`closed`}}deactivateDrawer(){this.drawerActive&&(this.drawerActive=!1,this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate(),O(this.drawer),O(this.overlay))}label(e,t){return e??this.locale.t(`appShell.${t}`)}handleSkip(e){e.preventDefault(),this.focusMain()}handleSidebarFocusIn(e){let t=e.composedPath()[0],n;try{n=!!t?.matches?.(`:focus-visible`)}catch{n=!1}n&&(this.keyboardFocus=!0)}handleSidebarFocusOut(e){let t=e.relatedTarget;(!t||!this.sidebar||!qe(this.sidebar,t))&&(this.keyboardFocus=!1)}renderHeaderToggle(){return this.mobile?h`<button
type="button"
class=${b(Wi)}
aria-label=${this.label(this.openNavigationLabel,`openNavigation`)}
aria-haspopup="dialog"
aria-expanded=${String(this.drawerOpen)}
aria-controls=${this.drawerOpen?`drawer`:m}
@click=${()=>this.requestDrawer(!this.drawerOpen)}
>
${nr}
</button>`:this.renderCollapseControl()}renderCollapseControl(){let e=this.mode!==`expanded`;return h`<button
type="button"
class=${b(Wi)}
aria-label=${e?this.label(this.expandLabel,`expand`):this.label(this.collapseLabel,`collapse`)}
aria-controls="sidebar"
aria-expanded=${String(!this.collapsed)}
@click=${()=>this.setMode(e?`expanded`:`compact`)}
>
${e?nr:Zn}
</button>`}renderSidebar(){let e=this.mode===`floating`,t=this.label(this.navigationLabel,`navigation`);return h`<aside
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
${this.slots.test(`brand-icon`)?h`<span class="brandIcon" aria-hidden="true"
><slot name="brand-icon"></slot
></span>`:m}
<span class="brandLabel"><slot name="brand">${this.brand}</slot></span>
</div>
<div class="navigation"><slot name="navigation"></slot></div>
<div class="sidebarActions">
${this.renderCollapseControl()}
<button
type="button"
class=${b(Wi)}
aria-pressed=${String(e)}
aria-label=${e?this.label(this.disableFloatingLabel,`disableFloating`):this.label(this.enableFloatingLabel,`enableFloating`)}
@click=${()=>this.setMode(e?`compact`:`floating`)}
>
${e?cn:kn}
</button>
</div>
</aside>`}renderDrawer(){let e=this.label(this.navigationLabel,`navigation`);return h`<div
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
${Sr}
</button>
</div>`}render(){let e=this.skipLink||this.locale.t(`appShell.skipToContent`);return h`<div
class="shell"
part="root"
data-sidebar-mode=${this.mode}
data-sidebar-expanded=${this.collapsed?m:`true`}
>
${this.noSkipLink?m:h`<a
class="skipLink"
part="skip-link"
href="#main"
@click=${this.handleSkip}
>${e}</a
>`}
${this.mobile?m:this.renderSidebar()}
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
${this.mobile&&this.drawerOpen?this.renderDrawer():m}`}},R([v()],B.prototype,`brand`,void 0),R([v({attribute:`sidebar-mode`,reflect:!0})],B.prototype,`sidebarMode`,void 0),R([v({attribute:`navigation-label`})],B.prototype,`navigationLabel`,void 0),R([v({attribute:`navigation-key`})],B.prototype,`navigationKey`,void 0),R([v({attribute:`skip-link`})],B.prototype,`skipLink`,void 0),R([v({type:Boolean,attribute:`no-skip-link`})],B.prototype,`noSkipLink`,void 0),R([v({attribute:`expand-label`})],B.prototype,`expandLabel`,void 0),R([v({attribute:`collapse-label`})],B.prototype,`collapseLabel`,void 0),R([v({attribute:`enable-floating-label`})],B.prototype,`enableFloatingLabel`,void 0),R([v({attribute:`disable-floating-label`})],B.prototype,`disableFloatingLabel`,void 0),R([v({attribute:`open-navigation-label`})],B.prototype,`openNavigationLabel`,void 0),R([v({attribute:`close-navigation-label`})],B.prototype,`closeNavigationLabel`,void 0),R([v({type:Boolean,reflect:!0})],B.prototype,`collapsed`,void 0),R([v({type:Boolean,reflect:!0})],B.prototype,`mobile`,void 0),R([p()],B.prototype,`drawerOpen`,void 0),R([p()],B.prototype,`hovered`,void 0),R([p()],B.prototype,`keyboardFocus`,void 0),R([y(`.header button`)],B.prototype,`headerToggle`,void 0),R([y(`.drawer`)],B.prototype,`drawer`,void 0),R([y(`.overlay`)],B.prototype,`overlay`,void 0),R([y(`main`)],B.prototype,`main`,void 0),R([y(`aside`)],B.prototype,`sidebar`,void 0)})))()}var Ki,V;function qi(){return(qi=e((()=>{N(),F(),dr(),E(),on(),I(),w(),A(),Fi(),li(),qn(),gn(),d(),f(),_(),g(),he(),wt(),Ki={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},V=class e extends Yn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.label=``,this.placeholder=``,this.mode=`basic`,this.size=`medium`,this.variant=`outline`,this.invalid=!1,this.readOnly=!1,this.loading=!1,this.placement=`bottom`,this.offset={x:0,y:4},this.noAnimation=!1,this.autoHighlight=!1,this.noFillOnSelect=!1,this.groupMode=`first`,this.focusedIndex=-1,this.hoveredIndex=-1,this.locale=new D(this),this.aria=new P(this,()=>this.labels),this.slots=new M(this),this.floating=new ji(this,()=>{let e=this.placement===`top`||this.placement===`bottom`,t=this.offset??{x:0,y:4};return{anchor:()=>this.container,floating:()=>this.popup,placement:Ki[this.placement]??`bottom-start`,offset:{mainAxis:e?t.y:t.x,crossAxis:e?t.x:t.y},matchAnchorWidth:`min`,branches:()=>[this.container],onEscapeKeyDown:e=>{(this.composing||e.isComposing)&&e.preventDefault()},onDismiss:()=>this.close(),returnFocusOnEscape:()=>this.input,onPosition:()=>this.syncHookStates()}}),this.composing=!1,this.dirty=!1}static{this.tagName=`minerva-autocomplete`}static{this.shadowRootOptions={...Yn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[k,Ci,T(dn),T(fi),S`
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
`]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}get blocked(){return this.isDisabled||this.readOnly}get shown(){return this.open&&!this.blocked}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.focusedIndex=-1}restoreFormState(e){typeof e==`string`&&(this.value=e)}get processedOptions(){let e=this.value,t=e.toLowerCase(),n=(this.options??[]).filter(n=>this.filterOption?this.filterOption(e,n):n.label.toLowerCase().includes(t));return this.sortOption?[...n].sort(this.sortOption):n}groupOptions(e){let t=this.groupBy;if(!t)return null;if(this.groupMode===`adjacent`){let n=[];for(let r of e){let e=t(r),i=n[n.length-1];i&&i[0]===e?i[1].push(r):n.push([e,[r]])}return n}let n=new Map;for(let r of e){let e=t(r),i=n.get(e);i?i.push(r):n.set(e,[r])}return Array.from(n.entries())}get navigableOptions(){let e=this.processedOptions,t=this.groupOptions(e);return t?t.flatMap(([,e])=>e):e}activeIndex(e){return this.focusedIndex>=0?this.focusedIndex:this.autoHighlight&&this.shown?e.findIndex(e=>!e.disabled):-1}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(){this.blocked||this.requestOpen(!0)}close(){this.requestOpen(!1),this.focusedIndex=-1}setText(e,t){e!==this.value&&(this.value=e,this.emit(`minerva-input`,{value:e}),t&&this.emit(`minerva-change`,{value:e}))}moveFocus(e){let t=this.navigableOptions,n=t.length;if(n===0)return;let r=this.activeIndex(t),i=r>=0?r:e===1?-1:n;for(let r=0;r<n;r+=1)if(i=(i+e+n)%n,!t[i].disabled){this.focusedIndex=i;return}}selectOption(e){e.disabled||(this.noFillOnSelect||this.setText(e.label,!0),this.close(),this.emit(`minerva-select`,{value:e.value,option:e}))}handleKeyDown(e){if(!(this.blocked||this.composing||e.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:case`ArrowUp`:e.preventDefault(),this.open||this.openDropdown(),this.moveFocus(e.key===`ArrowDown`?1:-1);break;case`Enter`:{let t=this.navigableOptions,n=this.shown?t[this.activeIndex(t)]:void 0,r=this.value.trim();n?(e.preventDefault(),this.selectOption(n)):r&&(e.preventDefault(),this.emit(`minerva-submit`,{value:r}),this.close());break}case`Escape`:!this.shown&&!this.floating.isOpen&&this.value!==``&&(e.preventDefault(),this.setText(``,!0),this.focusedIndex=-1)}}handleInput(){this.setText(this.input.value,!1),this.focusedIndex=-1,this.openDropdown()}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleBlur(e){let t=e.relatedTarget;t&&(this.popup?.contains(t)||this.container?.contains(t))||this.close()}handleOptionClick(e){e.disabled||this.composing||(this.selectOption(e),this.input?.focus())}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),this.open&&this.blocked&&(this.open=!1,this.focusedIndex=-1)}hookStates(){let e=this.shown&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?oe(e):{side:void 0,align:void 0};return{state:this.shown?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,loading:this.loading,side:t,align:n,placement:e}}updated(t){if(super.updated(t),this.floating.sync(this.shown),t.has(`focusedIndex`)&&this.focusedIndex>=0&&this.shadowRoot?.getElementById(`option-${this.focusedIndex}`)?.scrollIntoView?.({block:`nearest`}),j&&t.has(`options`)){let t=new Set;for(let n of this.options??[]){if(t.has(n.value)){L(e.tagName,`several options have the value "${n.value}"; option values must be unique.`);break}t.add(n.value)}}}renderOptionContent(e){return this.mode===`custom`&&this.renderOption?this.renderOption(e):h`<div class="basicOption">
${e.icon?h`<span class="icon">${e.icon}</span>`:m}
<div class="content">
<div class="label">${e.label}</div>
${e.description?h`<div class="description">${e.description}</div>`:m}
</div>
</div>`}renderOptionItem(e,t,n){let r=n===t,i=this.hoveredIndex===t||r,a=!!e.disabled;return h`<div
part=${Nr(`item`,{highlighted:i,disabled:a})}
class=${b({optionItem:!0,disabled:a,highlight:!!e.highlight,active:i})}
style=${e.style?x(e.style):m}
role="option"
tabindex="-1"
id=${`option-${t}`}
aria-selected=${String(r)}
aria-disabled=${e.disabled?`true`:m}
@mousedown=${e=>e.preventDefault()}
@click=${()=>this.handleOptionClick(e)}
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),t.stopPropagation(),this.handleOptionClick(e))}}
@mouseenter=${()=>this.hoveredIndex=t}
@mouseleave=${()=>this.hoveredIndex=-1}
>
${this.renderOptionContent(e)}
</div>`}renderList(){let{t:e}=this.locale;if(this.loading)return h`<div role="presentation" class="loading" part="loading">
<span role="progressbar" aria-label=${e(`common.loading`)}
>${xn}</span
>
</div>`;let t=this.processedOptions;if(t.length===0)return h`<div role="presentation" class="empty" part="empty">
${this.renderEmpty?.()||h`${$n}<span>${e(`empty.description`)}</span>`}
</div>`;let n=this.groupOptions(t),r=n?n.flatMap(([,e])=>e):t,i=this.activeIndex(r);return n?n.map(([e,t])=>{let n=t.map(e=>this.renderOptionItem(e,r.indexOf(e),i));return e===``?n:h`<div class="optionGroup" role="group" aria-label=${e}>
<div class="groupLabel" part="group-label" aria-hidden="true">
${e}
</div>
${n}
</div>`}):t.map((e,t)=>this.renderOptionItem(e,t,i))}render(){let e=this.shown,t=this.isDisabled,n=e?this.navigableOptions:[],r=e?this.activeIndex(n):-1,i=e&&r>=0&&r<n.length?`option-${r}`:void 0,a=this.label?void 0:this.aria.label;return h`<div
part="root"
class="autoComplete"
@compositionstart=${()=>this.composing=!0}
@compositionend=${()=>this.composing=!1}
>
${this.label?h`<label for="input" class="label" part="label"
>${this.label}</label
>`:m}
<div
part="field"
class=${b({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?h`<span class="addon start"><slot name="prefix"></slot></span>`:m}
<input
id="input"
part="input"
class="field"
type="text"
role="combobox"
aria-autocomplete="list"
aria-expanded=${String(e)}
aria-controls=${e?`listbox`:m}
aria-activedescendant=${i??m}
aria-label=${a??m}
aria-description=${this.aria.description??m}
aria-required=${this.required?`true`:m}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:m}
data-minerva-escape-consumer=${!e&&this.value!==``?``:m}
autocomplete="off"
.value=${St(this.value)}
placeholder=${this.placeholder||m}
?disabled=${t}
?readonly=${this.readOnly}
@input=${this.handleInput}
@change=${this.handleChange}
@focus=${()=>this.openDropdown()}
@click=${()=>{this.open||this.openDropdown()}}
@blur=${this.handleBlur}
@keydown=${this.handleKeyDown}
/>
${this.slots.test(`suffix`)?h`<span class="addon end"><slot name="suffix"></slot></span>`:m}
</div>
${e?h`<div class="popup" part="content" popover="manual">
<div
class=${b({dropdown:!0,animated:!this.noAnimation})}
>
<div
class="optionList"
part="list"
role="listbox"
id="listbox"
aria-label=${this.label||a||m}
aria-busy=${this.loading?`true`:m}
>
${this.renderList()}
</div>
</div>
</div>`:m}
</div>`}},R([v({attribute:!1})],V.prototype,`value`,void 0),R([v({attribute:`value`})],V.prototype,`defaultValue`,void 0),R([v({attribute:!1})],V.prototype,`options`,void 0),R([v({type:Boolean,reflect:!0})],V.prototype,`open`,void 0),R([v()],V.prototype,`label`,void 0),R([v()],V.prototype,`placeholder`,void 0),R([v({reflect:!0})],V.prototype,`mode`,void 0),R([v({reflect:!0})],V.prototype,`size`,void 0),R([v({reflect:!0})],V.prototype,`variant`,void 0),R([v({type:Boolean,reflect:!0})],V.prototype,`invalid`,void 0),R([v({type:Boolean,reflect:!0,attribute:`readonly`})],V.prototype,`readOnly`,void 0),R([v({type:Boolean,reflect:!0})],V.prototype,`loading`,void 0),R([v({reflect:!0})],V.prototype,`placement`,void 0),R([v({attribute:!1})],V.prototype,`offset`,void 0),R([v({type:Boolean,attribute:`no-animation`})],V.prototype,`noAnimation`,void 0),R([v({type:Boolean,attribute:`auto-highlight`})],V.prototype,`autoHighlight`,void 0),R([v({type:Boolean,attribute:`no-fill-on-select`})],V.prototype,`noFillOnSelect`,void 0),R([v({attribute:`group-mode`})],V.prototype,`groupMode`,void 0),R([v({attribute:!1})],V.prototype,`filterOption`,void 0),R([v({attribute:!1})],V.prototype,`sortOption`,void 0),R([v({attribute:!1})],V.prototype,`groupBy`,void 0),R([v({attribute:!1})],V.prototype,`renderOption`,void 0),R([v({attribute:!1})],V.prototype,`renderEmpty`,void 0),R([p()],V.prototype,`focusedIndex`,void 0),R([p()],V.prototype,`hoveredIndex`,void 0),R([y(`input`)],V.prototype,`input`,void 0),R([y(`.autoComplete`)],V.prototype,`container`,void 0),R([y(`.popup`)],V.prototype,`popup`,void 0)})))()}function Ji(e){let t=e?.trim()??``;return t?Xi.test(t[0])?t[0]:t.split(/\s+/).slice(0,2).map(e=>e[0].toUpperCase()).join(``):``}var Yi,Xi,Zi,Qi,$i;function ea(){return(ea=e((()=>{N(),F(),E(),I(),w(),A(),pr(),si(),d(),f(),_(),g(),Yi=[`xsmall`,`small`,`medium`,`large`,`xlarge`,`xxlarge`],Xi=/[㐀-鿿豈-﫿]/,Zi={fromAttribute:e=>e&&/^\d+(\.\d+)?$/.test(e)?Number(e):e??`medium`,toAttribute:e=>String(e)},Qi=class e extends C{constructor(...e){super(...e),this.name=``,this.shape=`circle`,this.size=`medium`,this.stacked=!1,this.locale=new D(this),this.aria=new P(this),this.slots=new M(this)}static{this.tagName=`minerva-avatar`}static{this.styles=[k,S`
:host{
display: inline-block;
flex-shrink: 0;
vertical-align: middle;
line-height: 0;
}
.avatarText{
line-height: 1;
}
`,T(hi)]}hookStates(){return{size:typeof this.size==`number`?void 0:this.size,shape:this.shape}}updated(t){j&&t.has(`size`)&&typeof this.size!=`number`&&!Yi.includes(this.size)&&L(e.tagName,`unknown size "${this.size}": use a preset (${Yi.join(`, `)}) or a number of pixels.`)}render(){let e=!!this.src&&this.failedSrc!==this.src,t=this.aria.label??(this.name||this.locale.t(`avatar.default`)),n=typeof this.size==`number`,r=b({avatar:!0,[this.shape]:!0,[String(this.size)]:!n,stacked:this.stacked}),i=x(n?{"--avatar-size":`${this.size}px`,width:`${this.size}px`,height:`${this.size}px`}:{});if(e)return h`<span part="root" class=${r} style=${i}
><img
part="image"
class="avatarImg"
alt=${this.alt??t}
src=${this.src}
draggable="false"
@error=${()=>this.failedSrc=this.src}
/></span>`;let a=Ji(this.name),o=this.slots.test(`fallback`)?h`<slot name="fallback"></slot>`:a||h`<slot></slot>`;return h`<span
part="root"
role="img"
aria-label=${t}
class=${r}
style=${i}
><span part="fallback" class="avatarText" aria-hidden="true"
>${o}</span
></span
>`}},R([v()],Qi.prototype,`src`,void 0),R([v()],Qi.prototype,`name`,void 0),R([v()],Qi.prototype,`alt`,void 0),R([v({reflect:!0})],Qi.prototype,`shape`,void 0),R([v({reflect:!0,converter:Zi})],Qi.prototype,`size`,void 0),R([v({type:Boolean,reflect:!0})],Qi.prototype,`stacked`,void 0),R([p()],Qi.prototype,`failedSrc`,void 0),$i=class e extends C{constructor(...e){super(...e),this.locale=new D(this),this.aria=new P(this),this.slots=new M(this)}static{this.tagName=`minerva-avatar-group`}static{this.shadowRootOptions={...C.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[k,S`
:host{
display: flex;
}
.avatarGroup{
flex: 1 1 auto;
min-width: 0;
}
`,T(sr)]}visibleAvatars(){let e=Array.from(this.children);return this.max===void 0||this.max===null?e:e.slice(0,Math.max(0,this.max))}updated(t){let n=this.visibleAvatars();Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,t)=>{let r=n[t];r&&typeof e.assign==`function`&&e.assign(r)}),j&&t.has(`max`)&&this.max!==void 0&&this.max!==null&&!(Number.isInteger(this.max)&&this.max>=0)&&L(e.tagName,`max must be a non-negative integer (got ${this.max}).`)}render(){this.slots;let e=this.children.length,t=this.visibleAvatars(),n=(Number(this.count)||0)+e-t.length,r=this.aria.label??(n>0?this.locale.t(`avatar.groupWithMore`,{count:n}):this.locale.t(`avatar.group`));return h`<div
part="root"
role="group"
class="avatarGroup"
aria-label=${r}
>
${t.map(()=>h`<div part="item" class="avatarGroupItem">
<slot data-item></slot>
</div>`)}
${n>0?h`<div part="count" class="count" aria-hidden="true">
+${n}
</div>`:m}
</div>`}},R([v({type:Number})],$i.prototype,`count`,void 0),R([v({type:Number})],$i.prototype,`max`,void 0)})))()}var ta;function na(){return(na=e((()=>{N(),F(),E(),I(),w(),A(),Cr(),d(),f(),_(),g(),ta=class e extends C{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.position=`top-right`,this.dot=!1,this.badgeRole=`status`,this.locale=new D(this),this.aria=new P(this),this.slots=new M(this)}static{this.tagName=`minerva-badge`}static{this.styles=[k,S`
:host{
display: inline-flex;
vertical-align: middle;
}
`,T(Er)]}hasElementChildren(){return Array.from(this.children).some(e=>!e.hasAttribute(`slot`)||e.getAttribute(`slot`)===``)}hookStates(){return{size:this.size,variant:this.variant,color:this.color}}updated(){j&&this.dot&&!this.aria.label&&![`presentation`,`none`].includes(this.badgeRole)&&L(e.tagName,`a dot badge has no text: set aria-label (e.g. "New messages") or badge-role="presentation".`)}render(){let e=this.slots.test(`[default]`),t=e&&!this.hasElementChildren(),n=this.content!==void 0&&this.content!==null||this.slots.test(`content`),r=!e||t&&!n,i=m;this.dot||(n?i=h`<slot name="content">${this.content}</slot>`:t?i=h`<slot></slot>`:e&&(i=this.locale.t(`badge.default`)));let a=h`<span
part=${r?`root`:`badge`}
class=${b({badge:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,standalone:r,[this.position]:!r,dot:this.dot})}
role=${this.badgeRole||m}
aria-label=${this.aria.label??m}
style=${x({borderRadius:this.borderRadius,borderWidth:this.borderWidth})}
>${this.slots.test(`icon`)?h`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:m}${i}</span
>`;return r?a:h`<div part="root" class="badgeWrapper">
<div class="content"><slot></slot></div>
${a}
</div>`}},R([v({reflect:!0})],ta.prototype,`color`,void 0),R([v({reflect:!0})],ta.prototype,`variant`,void 0),R([v({reflect:!0})],ta.prototype,`size`,void 0),R([v()],ta.prototype,`content`,void 0),R([v({reflect:!0})],ta.prototype,`position`,void 0),R([v({type:Boolean,reflect:!0})],ta.prototype,`dot`,void 0),R([v({attribute:`border-radius`})],ta.prototype,`borderRadius`,void 0),R([v({attribute:`border-width`})],ta.prototype,`borderWidth`,void 0),R([v({attribute:`badge-role`})],ta.prototype,`badgeRole`,void 0)})))()}function ra(e){return e.replace(/[;{}<>]/g,``)}var ia;function aa(){return(aa=e((()=>{Je(),ia={fromAttribute:e=>{if(e===null)return;let t=e.trim();return/^-?\d+(\.\d+)?$/.test(t)?Number(t):t},toAttribute:e=>e===void 0?null:String(e)}})))()}var oa,sa,ca,H,U;function la(){return(la=e((()=>{F(),I(),aa(),d(),f(),oa={bg:`var(--surface-color)`,"bg.subtle":`var(--surface-subtle-color)`,"bg.muted":`var(--surface-muted-color)`,"bg.emphasis":`var(--surface-muted-color)`,"bg.canvas":`var(--canvas-color)`,"bg.elevated":`var(--surface-elevated-color)`},sa=[`none`,`sm`,`md`,`lg`,`xl`,`2xl`,`full`],ca=[`sm`,`md`,`lg`,`xl`],H={converter:ia},U=class e extends C{static{this.tagName=`minerva-box`}static{this.styles=[k,S`
:host{
display: block;
}
`]}declarations(){let e=[],t=(t,...n)=>{if(t!==void 0&&t!==``)for(let r of n)e.push([r,we(t)])},n=(t,n)=>{t!==void 0&&t!==``&&e.push([n,ne(t)])};return t(this.p,`padding`),t(this.px,`padding-left`,`padding-right`),t(this.py,`padding-top`,`padding-bottom`),t(this.pt,`padding-top`),t(this.pr,`padding-right`),t(this.pb,`padding-bottom`),t(this.pl,`padding-left`),t(this.m,`margin`),t(this.mx,`margin-left`,`margin-right`),t(this.my,`margin-top`,`margin-bottom`),t(this.mt,`margin-top`),t(this.mr,`margin-right`),t(this.mb,`margin-bottom`),t(this.ml,`margin-left`),n(this.w,`width`),n(this.h,`height`),n(this.minW,`min-width`),n(this.minH,`min-height`),n(this.maxW,`max-width`),n(this.maxH,`max-height`),this.bg&&e.push([`background`,oa[this.bg]??this.bg]),this.rounded&&e.push([`border-radius`,sa.includes(this.rounded)?`var(--radius-${this.rounded})`:this.rounded]),this.boxShadow&&e.push([`box-shadow`,ca.includes(this.boxShadow)?`var(--shadow-${this.boxShadow})`:this.boxShadow]),this.border&&e.push([`border`,this.border]),e}updated(){j&&this.bg?.startsWith(`bg.`)&&!(this.bg in oa)&&L(e.tagName,`unknown surface alias bg="${this.bg}" (expected one of ${Object.keys(oa).join(`, `)}).`)}render(){let e=this.declarations().map(([e,t])=>`${e}:${ra(t)};`).join(``);return h`<style>
:host{${e}}
</style>
<slot></slot>`}},R([v(H)],U.prototype,`p`,void 0),R([v(H)],U.prototype,`px`,void 0),R([v(H)],U.prototype,`py`,void 0),R([v(H)],U.prototype,`pt`,void 0),R([v(H)],U.prototype,`pr`,void 0),R([v(H)],U.prototype,`pb`,void 0),R([v(H)],U.prototype,`pl`,void 0),R([v(H)],U.prototype,`m`,void 0),R([v(H)],U.prototype,`mx`,void 0),R([v(H)],U.prototype,`my`,void 0),R([v(H)],U.prototype,`mt`,void 0),R([v(H)],U.prototype,`mr`,void 0),R([v(H)],U.prototype,`mb`,void 0),R([v(H)],U.prototype,`ml`,void 0),R([v(H)],U.prototype,`w`,void 0),R([v(H)],U.prototype,`h`,void 0),R([v({converter:ia,attribute:`min-w`})],U.prototype,`minW`,void 0),R([v({converter:ia,attribute:`min-h`})],U.prototype,`minH`,void 0),R([v({converter:ia,attribute:`max-w`})],U.prototype,`maxW`,void 0),R([v({converter:ia,attribute:`max-h`})],U.prototype,`maxH`,void 0),R([v()],U.prototype,`bg`,void 0),R([v()],U.prototype,`rounded`,void 0),R([v({attribute:`box-shadow`})],U.prototype,`boxShadow`,void 0),R([v()],U.prototype,`border`,void 0)})))()}var ua,da;function fa(){return(fa=e((()=>{N(),F(),Pn(),I(),w(),A(),Br(),d(),f(),_(),g(),ua=e=>`borderRadius${e.charAt(0).toUpperCase()}${e.slice(1)}`,da=class e extends C{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.disabled=!1,this.loading=!1,this.fullWidth=!1,this.active=!1,this.type=`button`,this.internals=Ln(this),this.aria=new P(this),this.slots=new M(this),this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-button`}static{this.formAssociated=!0}static{this.styles=[k,S`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
:host([full-width]){
display: flex;
width: 100%;
}
`,T(qr)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0)}hookStates(){return{state:this.active?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){j&&this.shape===`circle`&&!this.aria.label&&(this.textContent?.trim()||L(e.tagName,`shape="circle" buttons usually only contain an icon: set aria-label to give them an accessible name.`))}render(){let e=this.borderRadius,t=typeof e==`number`||typeof e==`string`&&/^\d+(\.\d+)?$/.test(e),n=this.loading&&this.slots.test(`loading`),r=this.loading&&!n,i=h`<span
class="loadingSpinner"
part="spinner"
aria-hidden="true"
></span>`;return h`<button
part="root"
type="button"
class=${b({customButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape??``]:!!this.shape,[ua(String(e??``))]:!!e&&!t,fullWidth:this.fullWidth,active:this.active,loading:this.loading})}
style=${x(t?{borderRadius:`${Number(e)}px`}:{})}
?disabled=${this.disabled}
aria-label=${this.aria.label??m}
aria-description=${this.aria.description??m}
aria-pressed=${this.aria.attr(`aria-pressed`)??m}
aria-expanded=${this.aria.attr(`aria-expanded`)??m}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??m}
aria-busy=${this.loading?`true`:m}
aria-disabled=${this.loading?`true`:m}
@click=${this.handleClick}
>
${n?h`${i}<span class="label" part="label"
><slot name="loading"></slot
></span>`:h`${this.loading?i:m}
${this.slots.test(`start`)?h`<span
class=${b({icon:!0,hidden:r})}
part="start-icon"
><slot name="start"></slot
></span>`:m}
<span class=${b({label:!0,hidden:r})} part="label"
><slot></slot
></span>
${this.slots.test(`end`)?h`<span
class=${b({icon:!0,hidden:r})}
part="end-icon"
><slot name="end"></slot
></span>`:m}`}
</button>`}},R([v({reflect:!0})],da.prototype,`color`,void 0),R([v({reflect:!0})],da.prototype,`variant`,void 0),R([v({reflect:!0})],da.prototype,`size`,void 0),R([v({reflect:!0})],da.prototype,`shape`,void 0),R([v({attribute:`border-radius`})],da.prototype,`borderRadius`,void 0),R([v({type:Boolean,reflect:!0})],da.prototype,`disabled`,void 0),R([v({type:Boolean,reflect:!0})],da.prototype,`loading`,void 0),R([v({type:Boolean,reflect:!0,attribute:`full-width`})],da.prototype,`fullWidth`,void 0),R([v({type:Boolean,reflect:!0})],da.prototype,`active`,void 0),R([v({reflect:!0})],da.prototype,`type`,void 0),R([y(`button`)],da.prototype,`button`,void 0)})))()}var pa,ma,ha,ga,_a,va,ya,ba,xa,Sa,Ca,wa,Ta,Ea;function Da(){return(Da=e((()=>{N(),F(),gi(),Pn(),I(),A(),xr(),Rr(),d(),f(),_(),Je(),kt(),pa=[`div`,`article`,`section`,`a`,`button`],ma=[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`],ha=[`none`,`small`,`medium`,`large`],ga=`minerva-card-header, minerva-card-content, minerva-card-footer, minerva-card-title, minerva-card-description`,_a=e=>e&&ha.includes(e)?`pad-${e}`:``,va=e=>{let t=e.parentElement??e.getRootNode().host;return!!(t?ln(t,`minerva-card`):null)?.hasAttribute(`padding`)},ya=class e extends C{constructor(...e){super(...e),this.variant=`default`,this.interactive=!1,this.as=`div`,this.disabled=!1,this.type=`button`,this.internals=Ln(this),this.aria=new P(this),this.syncParts=()=>{for(let e of Array.from(this.querySelectorAll(ga)))e.requestUpdate()},this.blockDisabledClicks=e=>{this.tag===`button`&&this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-card`}static{this.formAssociated=!0}static{this.styles=[k,S`
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
`,T(_r)]}get tag(){return pa.includes(this.as)?this.as:`div`}focus(e){this.tag===`a`||this.tag===`button`?this.root?.focus(e):super.focus(e)}handleClick(e){if(this.tag!==`button`)return;if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.internals?.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockDisabledClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockDisabledClicks,!0)}hookStates(){return{variant:this.variant,disabled:this.tag===`button`&&this.disabled}}updated(t){t.has(`padding`)&&this.syncParts(),j&&(this.as&&!pa.includes(this.as)&&L(e.tagName,`unsupported as="${this.as}" (expected ${pa.join(`, `)}); rendering a div.`),this.tag===`a`&&!this.href&&L(e.tagName,`as="a" needs an href to be a link (focusable, activatable with Enter).`),this.interactive&&this.tag!==`a`&&this.tag!==`button`&&L(e.tagName,`interactive cards should be links or buttons (as="a" with href, or as="button") so keyboard users can activate them.`))}render(){let t=this.tag,n=b({card:!0,[this.variant]:!0,padded:!!this.padding,[_a(this.padding)]:!!_a(this.padding),interactive:this.interactive}),r=this.aria.label??m,i=Tt`<slot @slotchange=${this.syncParts}></slot>`;if(t===`a`)return Tt`<a
part="root"
class=${n}
href=${ai(e.tagName,this.href)??m}
target=${this.target??m}
rel=${ut(this.target,this.rel)??m}
download=${this.download??m}
aria-label=${r}
>${i}</a
>`;if(t===`button`)return Tt`<button
part="root"
class=${n}
type="button"
?disabled=${this.disabled}
aria-label=${r}
aria-pressed=${this.aria.attr(`aria-pressed`)??m}
aria-expanded=${this.aria.attr(`aria-expanded`)??m}
@click=${this.handleClick}
>
${i}
</button>`;let a=xt(t);return Tt`<${a} part="root" class=${n}>${i}</${a}>`}},R([v({reflect:!0})],ya.prototype,`variant`,void 0),R([v({reflect:!0})],ya.prototype,`padding`,void 0),R([v({type:Boolean,reflect:!0})],ya.prototype,`interactive`,void 0),R([v({reflect:!0})],ya.prototype,`as`,void 0),R([v()],ya.prototype,`href`,void 0),R([v()],ya.prototype,`target`,void 0),R([v()],ya.prototype,`rel`,void 0),R([v()],ya.prototype,`download`,void 0),R([v({type:Boolean,reflect:!0})],ya.prototype,`disabled`,void 0),R([v()],ya.prototype,`type`,void 0),R([y(`[part=root]`)],ya.prototype,`root`,void 0),ba=S`
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
`,xa=class extends C{constructor(...e){super(...e),this.sectionClass=``}static{this.styles=[k,ba]}layoutClasses(){let e=this.previousElementSibling?.localName,t=_a(this.padding);return{[this.sectionClass]:!0,padded:va(this),afterHeader:e===`minerva-card-header`,afterContent:e===`minerva-card-content`,[t]:!!t}}render(){return Tt`<div part="root" class=${b(this.layoutClasses())}>
<slot></slot>
</div>`}},R([v({reflect:!0})],xa.prototype,`padding`,void 0),Sa=class extends xa{constructor(...e){super(...e),this.sectionClass=`cardHeader`}static{this.tagName=`minerva-card-header`}},Ca=class extends xa{constructor(...e){super(...e),this.sectionClass=`cardContent`}static{this.tagName=`minerva-card-content`}static{this.styles=[k,ba,S`
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
`]}layoutClasses(){let e=super.layoutClasses();return this.animation&&(e[this.animation]=!0),e}},R([v({reflect:!0})],Ca.prototype,`animation`,void 0),wa=class extends xa{constructor(...e){super(...e),this.sectionClass=`cardFooter`}static{this.tagName=`minerva-card-footer`}},Ta=class extends C{constructor(...e){super(...e),this.as=`h3`}static{this.tagName=`minerva-card-title`}static{this.styles=[k,S`
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
`]}render(){let e=xt(ma.includes(this.as)?this.as:`h3`);return Tt`<${e}
part="root"
class=${b({cardTitle:!0,padded:va(this)})}
><slot></slot></${e}>`}},R([v({reflect:!0})],Ta.prototype,`as`,void 0),Ea=class extends C{static{this.tagName=`minerva-card-description`}static{this.styles=[k,S`
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
`]}render(){return Tt`<p
part="root"
class=${b({cardDescription:!0,padded:va(this)})}
>
<slot></slot>
</p>`}}})))()}var Oa,ka,Aa,ja,Ma,W;function Na(){return(Na=e((()=>{N(),F(),dr(),E(),on(),I(),A(),Fi(),gn(),hr(),d(),f(),_(),he(),Je(),wt(),Oa=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n]),ka=e=>{let t=new Set;for(let n of e){if(t.has(n.value))return n.value;t.add(n.value);let e=n.children?ka(n.children):void 0;if(e!==void 0)return e}},Aa={fromAttribute(e){let t=e?.trim()??``;if(!t)return[];if(t.startsWith(`[`))try{let e=JSON.parse(t);if(Array.isArray(e))return e.filter(e=>typeof e==`string`||typeof e==`number`)}catch{}return t.split(`,`).map(e=>e.trim())},toAttribute(e){return JSON.stringify(e)}},ja=`[role="option"]:not([aria-disabled="true"])`,Ma=0,W=class e extends Yn{constructor(...e){super(...e),this.options=[],this.value=[],this.defaultValue=[],this.open=!1,this.label=``,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.expandTrigger=`click`,this.showSearch=!1,this.maxLevel=6,this.width=240,this.expandedValues=[],this.searchValue=``,this.idPrefix=`minerva-cascader-${Ma++}`,this.locale=new D(this),this.aria=new P(this,()=>this.labels),this.floating=new ji(this,()=>({anchor:()=>this.anchor,floating:()=>this.dropdown,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[this.anchor],onDismiss:()=>this.closeDropdown(),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.pendingFocus=null,this.dirty=!1,this.widthApplied=!1}static{this.tagName=`minerva-cascader`}static{this.shadowRootOptions={...Yn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[k,Ci,S`
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
`,T(ei)]}get selectedOptions(){return Ce(this.options,this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get displayText(){let e=this.selectedOptions,t=e.map(e=>String(e.label));return this.displayRender?this.displayRender(t,e):t.join(` / `)}getFormValue(){return this.displayText}syncFormState(){super.syncFormState(),this.internals&&!this.isDisabled&&this.internals.setFormValue(this.getFormValue(),JSON.stringify(this.value))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=[...this.defaultValue],this.open=!1}restoreFormState(e){if(typeof e==`string`)try{let t=JSON.parse(e);Array.isArray(t)&&(this.value=t)}catch{}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=!Oa(this.value,this.defaultValue)||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=[...this.defaultValue]),e.has(`open`)&&(this.open?this.expandedValues=[...this.value]:(this.searchValue=``,this.pendingFocus=null)),j&&this.checkDev(e)}checkDev(t){if(t.has(`options`)){let t=ka(this.options);t!==void 0&&L(e.tagName,`duplicate option value "${t}" among siblings: values must be unique within a level.`)}(t.has(`options`)||t.has(`value`))&&this.options.length>0&&this.value.length>0&&Ce(this.options,this.value).length<this.value.length&&L(e.tagName,`value ${JSON.stringify(this.value)} is not a path of the options tree: it is shown partially (or not at all).`)}hookStates(){let e=this.open&&!this.isDisabled,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?oe(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,side:n,align:r,placement:t}}updated(e){if(super.updated(e),e.has(`width`)){let e=this.width,t=e===void 0||e===``?``:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,n=t!==``&&t!==`240px`;(n||this.widthApplied)&&(this.style.width=n?t:``),this.widthApplied=n}this.floating.sync(this.open&&!this.isDisabled);let t=this.pendingFocus;if(t!==null&&this.open){let e=t===-1?this.columns().length-1:t;this.focusColumn(e)&&(this.pendingFocus=null)}}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(e=!1){this.isDisabled||this.readOnly||this.requestOpen(!0)&&(this.expandedValues=[...this.value],this.pendingFocus=e?-1:null)}closeDropdown(e=!1){this.requestOpen(!1)&&(this.searchValue=``,e&&this.input?.focus())}select(e){this.value=e.map(e=>e.value),this.emitChange(e),this.closeDropdown(!0)}emitChange(e){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:[...this.value],selectedOptions:e})}handleActivate(e,t){let n=e[e.length-1];if(n.disabled)return;let r=t>=this.maxLevel-1,i=!!n.children?.length,a=!!this.loadData&&!n.isLeaf&&!n.children;if(!r&&(i||a)){this.expandedValues=e.map(e=>e.value),a&&!n.loading&&this.loadData?.(e);return}this.select(e)}clear(e){e.stopPropagation(),this.value=[],this.searchValue=``,this.emitChange([]),this.emit(`minerva-clear`),this.input?.focus()}get expandedPath(){return Ce(this.options,this.expandedValues)}columns(){let e=this.expandedPath,t=[this.options];for(let n=0;n<e.length&&n<this.maxLevel-1;n+=1){let r=e[n].children;if(!r?.length)break;t.push(r)}return t}columnId(e){return`${this.idPrefix}-column-${e}`}focusColumn(e){let t=this.dropdown?.querySelector(`[data-level="${e}"]`);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(ja);return n?.focus(),!!n}canExpand(e,t){return t<this.maxLevel-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0)}pathTo(e,t){return[...this.expandedPath.slice(0,t),e]}get searching(){return this.showSearch&&this.searchValue!==``}searchResults(){if(!this.searching)return[];let{searchValue:e,filter:t}=this,n=e.toLowerCase();return Ye(this.options).filter(({path:r})=>t?t(e,r):r.some(e=>String(e.label).toLowerCase().includes(n)))}focusFirstSearchResult(){this.dropdown?.querySelector(`[role="option"]`)?.focus()}handleSelectorClick(){this.isDisabled||this.readOnly||(this.open?this.showSearch||this.closeDropdown():this.openDropdown())}handleInput(e){let t=e.target.value;this.showSearch&&!this.readOnly&&(this.searchValue=t,this.emit(`minerva-input`,{value:t}),this.open||this.openDropdown())}handleInputKeyDown(e){switch(e.key){case`ArrowDown`:e.preventDefault(),this.open?this.searching?this.focusFirstSearchResult():(this.pendingFocus=-1,this.requestUpdate()):this.openDropdown(!0);break;case`Enter`:e.preventDefault(),this.open||this.openDropdown(!0);break;case` `:if(this.showSearch)break;e.preventDefault(),this.open||this.openDropdown(!0)}}handleFocusOut(e){let t=e.relatedTarget;this.open&&t&&(this.anchor&&qe(this.anchor,t)||this.dropdown&&qe(this.dropdown,t)||this.closeDropdown())}handleDropdownMouseDown(e){e.target.closest?.(`[role="option"]`)||e.preventDefault()}handleDropdownKeyDown(e){e.key===`Tab`&&this.closeDropdown()}handleOptionKeyDown(e,t,n){let r=e.currentTarget,i=Array.from(r.parentElement?.querySelectorAll(ja)??[]),a=i.indexOf(r),o=e=>i[(e+i.length)%i.length]?.focus();switch(de(e.key,this)){case`ArrowDown`:e.preventDefault(),o(a+1);break;case`ArrowUp`:e.preventDefault(),o(a-1);break;case`Home`:e.preventDefault(),o(0);break;case`End`:e.preventDefault(),o(i.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!this.canExpand(t,n))break;this.pendingFocus=n+1,this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;this.canExpand(t,n)&&(this.pendingFocus=n+1),this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`ArrowLeft`:e.preventDefault(),n===0?this.closeDropdown(!0):this.focusColumn(n-1)}}handleSearchKeyDown(e){let t=e.currentTarget,n=Array.from(t.querySelectorAll(`[role="option"]`)),r=n.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),n[(r+(e.key===`ArrowDown`?1:-1)+n.length)%n.length]?.focus())}renderSearchResults(){let e=this.searchResults();return h`<div
class="searchResults"
role="listbox"
aria-label=${this.label||this.aria.label||m}
tabindex="-1"
@keydown=${this.handleSearchKeyDown}
>
${e.length>0?e.map(({path:e})=>h`<div
class="searchOption"
part="item"
role="option"
aria-selected="false"
tabindex="0"
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),this.select(e))}}
@click=${()=>this.select(e)}
>
${e.map(e=>e.label).join(` / `)}
</div>`):h`<div class="empty" role="status">
${this.locale.t(`cascader.noResults`)}
</div>`}
</div>`}renderPanel(){let{t:e}=this.locale,t=this.columns(),n=this.expandedPath,r=this.selectedOptions,i=this.label||this.aria.label||e(`cascader.options`);return h`<div class="panel">
${t.map((a,o)=>h`<ul
id=${this.columnId(o)}
data-level=${o}
class="column"
part="column"
role="listbox"
aria-label=${e(`cascader.level`,{label:i,level:o+1})}
>
${a.map(e=>{let i=n[o]?.value===e.value,a=r[o]?.value===e.value,s=this.canExpand(e,o)&&!(!e.children?.length&&e.isLeaf),c=i&&!(a&&o===r.length-1);return h`<li
?data-expanded=${c}
?data-selected=${a}
class=${b({option:!0,active:i||a,disabled:!!e.disabled,loading:!!e.loading})}
part=${Nr(`item`,{selected:a,expanded:c,disabled:e.disabled,loading:e.loading})}
role="option"
aria-selected=${a?`true`:`false`}
aria-disabled=${e.disabled?`true`:m}
aria-busy=${e.loading?`true`:m}
aria-controls=${i&&o+1<t.length?this.columnId(o+1):m}
tabindex=${e.disabled?-1:0}
@keydown=${t=>this.handleOptionKeyDown(t,e,o)}
@click=${()=>{e.disabled||this.handleActivate(this.pathTo(e,o),o)}}
@mouseenter=${()=>{this.expandTrigger===`hover`&&!e.disabled&&e.children?.length&&o<this.maxLevel-1&&(this.expandedValues=this.pathTo(e,o).map(e=>e.value))}}
>
${this.optionRender?this.optionRender(e,o):h`<span class="label">${e.label}</span>${e.loading?h`<span
class="loadingIndicator"
aria-hidden="true"
>...</span
>`:s?h`<span class="expandIcon" aria-hidden="true"
>${Ur}</span
>`:m}`}
</li>`})}
</ul>`)}
</div>`}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.open&&!t,r=!this.hideClearButton&&this.value.length>0&&!t&&!this.readOnly,i=this.searching?this.searchValue:this.displayText,a=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return h`<div
class="cascader"
part="root"
@focusout=${this.handleFocusOut}
>
<div
class=${b({selector:!0,disabled:t,focused:n})}
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
aria-autocomplete=${this.showSearch?`list`:m}
aria-label=${this.aria.label??(this.label||m)}
aria-description=${this.aria.description??m}
aria-invalid=${a?`true`:m}
aria-required=${this.required?`true`:m}
aria-readonly=${this.showSearch&&this.readOnly?`true`:m}
name=${this.name||m}
.value=${St(i)}
?readonly=${!this.showSearch||this.readOnly}
?disabled=${t}
?required=${this.required}
autocomplete="off"
placeholder=${this.placeholder??e(`cascader.placeholder`)}
@input=${this.handleInput}
@keydown=${this.handleInputKeyDown}
/>
</div>
${r?h`<button
type="button"
class="clearIcon"
part="clear-button"
aria-label=${e(`cascader.clear`)}
@click=${this.clear}
>
<span class="icon" aria-hidden="true">${Sr}</span>
</button>`:m}
<span
class=${b({arrow:!0,open:n})}
part="icon"
aria-hidden="true"
><span class="icon">${ri}</span></span
>
</div>
</div>
${n?h`<div
class="dropdown"
part="content"
popover="manual"
@mousedown=${this.handleDropdownMouseDown}
@focusout=${this.handleFocusOut}
@keydown=${this.handleDropdownKeyDown}
>
${this.searching?this.renderSearchResults():this.renderPanel()}
</div>`:m}`}},R([v({attribute:!1})],W.prototype,`options`,void 0),R([v({attribute:!1})],W.prototype,`value`,void 0),R([v({attribute:`value`,converter:Aa})],W.prototype,`defaultValue`,void 0),R([v({type:Boolean,reflect:!0})],W.prototype,`open`,void 0),R([v()],W.prototype,`label`,void 0),R([v()],W.prototype,`placeholder`,void 0),R([v({type:Boolean,reflect:!0})],W.prototype,`invalid`,void 0),R([v({type:Boolean,reflect:!0,attribute:`readonly`})],W.prototype,`readOnly`,void 0),R([v({type:Boolean,attribute:`hide-clear-button`})],W.prototype,`hideClearButton`,void 0),R([v({attribute:`expand-trigger`,reflect:!0})],W.prototype,`expandTrigger`,void 0),R([v({type:Boolean,attribute:`show-search`,reflect:!0})],W.prototype,`showSearch`,void 0),R([v({type:Number,attribute:`max-level`})],W.prototype,`maxLevel`,void 0),R([v()],W.prototype,`width`,void 0),R([v({attribute:!1})],W.prototype,`displayRender`,void 0),R([v({attribute:!1})],W.prototype,`filter`,void 0),R([v({attribute:!1})],W.prototype,`loadData`,void 0),R([v({attribute:!1})],W.prototype,`optionRender`,void 0),R([p()],W.prototype,`expandedValues`,void 0),R([p()],W.prototype,`searchValue`,void 0),R([y(`input`)],W.prototype,`input`,void 0),R([y(`.cascader`)],W.prototype,`anchor`,void 0),R([y(`.dropdown`)],W.prototype,`dropdown`,void 0)})))()}var Pa,Fa;function Ia(){return(Ia=e((()=>{N(),F(),dr(),E(),I(),w(),A(),gn(),Gr(),d(),f(),_(),wt(),Pa=e=>e.charAt(0).toUpperCase()+e.slice(1),Fa=class e extends Yn{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.indeterminate=!1,this.value=`on`,this.label=``,this.shape=`square`,this.size=`medium`,this.color=`primary`,this.labelPlacement=`end`,this.error=!1,this.helperText=``,this.readOnly=!1,this.locale=new D(this),this.aria=new P(this,()=>this.labels),this.slots=new M(this),this.dirty=!1}static{this.tagName=`minerva-checkbox`}static{this.shadowRootOptions={...Yn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[k,S`
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
`,T(ur)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}click(){this.input?.click()}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(e){e.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked)}updated(t){super.updated(t),this.input&&(this.input.indeterminate=this.indeterminate),j&&!this.aria.label&&!this.label&&!this.textContent?.trim()&&L(e.tagName,`no label: set the label attribute, slot a label, or use aria-label / <label for>.`)}handleClick(e){this.readOnly&&e.preventDefault()}handleChange(){this.readOnly||(this.dirty=!0,this.input.indeterminate=this.indeterminate,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value}))}hookStates(){return{state:this.indeterminate?`indeterminate`:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape}}render(){let e=this.isDisabled,t=!!this.label||this.slots.test(`[default]`),n=[this.helperText,this.aria.description].filter(Boolean).join(` `),r=this.error||this.aria.attr(`aria-invalid`)===`true`;return h`<div
part="root"
class=${b({checkboxWrapper:!0,error:r})}
>
<label
class=${b({checkbox:!0,[this.size]:!0,[this.shape]:!0,[`label${Pa(this.labelPlacement)}`]:!0,[`color${Pa(this.color)}`]:this.color!==`primary`,disabled:e,error:r})}
>
<input
part="input"
type="checkbox"
class="input"
.checked=${St(this.checked)}
?disabled=${e}
?required=${this.required}
aria-checked=${this.indeterminate?`mixed`:m}
aria-label=${this.aria.label??m}
aria-description=${n||m}
aria-invalid=${r?`true`:m}
aria-readonly=${this.readOnly?`true`:m}
@click=${this.handleClick}
@change=${this.handleChange}
/>
<span class="checkmark" part="control"
>${this.checked&&!this.indeterminate?h`<slot name="icon"></slot>`:m}</span
>
${t?h`<span class="label" part="label"
>${this.label||h`<slot></slot>`}</span
>`:m}
</label>
${this.helperText?h`<div class="helperTextWrapper">
${r?h`<span class="errorIcon" aria-hidden="true"
>${En}</span
>`:m}
<span
part="helper-text"
class=${b({helperText:!0,errorText:r})}
>${this.helperText}</span
>
</div>`:m}
</div>`}},R([v({attribute:!1})],Fa.prototype,`checked`,void 0),R([v({type:Boolean,attribute:`checked`,reflect:!0})],Fa.prototype,`defaultChecked`,void 0),R([v({type:Boolean,reflect:!0})],Fa.prototype,`indeterminate`,void 0),R([v()],Fa.prototype,`value`,void 0),R([v()],Fa.prototype,`label`,void 0),R([v({reflect:!0})],Fa.prototype,`shape`,void 0),R([v({reflect:!0})],Fa.prototype,`size`,void 0),R([v({reflect:!0})],Fa.prototype,`color`,void 0),R([v({attribute:`label-placement`,reflect:!0})],Fa.prototype,`labelPlacement`,void 0),R([v({type:Boolean,reflect:!0})],Fa.prototype,`error`,void 0),R([v({attribute:`helper-text`})],Fa.prototype,`helperText`,void 0),R([v({type:Boolean,reflect:!0,attribute:`readonly`})],Fa.prototype,`readOnly`,void 0),R([y(`input`)],Fa.prototype,`input`,void 0)})))()}function La(e,t,n){if(!t&&!n)return e;let r=t?s(e,t):[{type:null,text:e}];if(!n)return Ba(r);let i=He(r),a=e.endsWith(`
`);return i.map((e,t)=>h`<span class="line"
><span
class="lineNumber"
part="line-number"
aria-hidden="true"
data-line=${t+1}
></span
>${Ba(e)}</span
>${t<i.length-1||a?`
`:m}`)}var Ra,za,Ba,Va;function Ha(){return(Ha=e((()=>{N(),F(),dr(),E(),I(),w(),A(),Fr(),kr(),d(),f(),_(),g(),Je(),Ra=2e3,za=e=>e===void 0||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Ba=e=>e.map(({type:e,text:t})=>e?h`<span class=${`token-${e}`}>${t}</span>`:t),Va=class e extends C{constructor(...e){super(...e),this.noHighlight=!1,this.showLineNumbers=!1,this.showLanguage=!1,this.noWrap=!1,this.maxHeight=`24rem`,this.copyable=!1,this.status=`idle`,this.locale=new D(this),this.aria=new P(this),this.slots=new M(this)}static{this.tagName=`minerva-code-block`}static{this.styles=[k,S`
:host{
display: block;
min-width: 0;
max-width: 100%;
}
.iconButton svg{
width: 16px;
height: 16px;
}
`,T(zn),T(Xr)]}get text(){return this.code??this.textContent??``}async copy(){let e=this.text,t=typeof navigator>`u`?void 0:navigator.clipboard,n=!1;if(typeof t?.writeText==`function`)try{await t.writeText(e),n=!0}catch{n=!1}return this.isConnected?(this.showStatus(n?`copied`:`failed`),this.emit(`minerva-copy`,{text:e,success:n}),n):n}showStatus(e){clearTimeout(this.timer),this.status=e,this.timer=setTimeout(()=>this.status=`idle`,Ra)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timer),this.status=`idle`}updated(){j&&this.copyable&&!this.text.trim()&&L(e.tagName,`copyable is set but there is no text to copy (set code or the text content).`)}render(){this.slots;let e=this.locale.t,t=this.aria.label??e(`codeBlock.label`),n=za(this.maxHeight),r=this.text,i=this.language?.trim()||void 0,a=this.showLanguage&&i?tt(i):``,o=this.copyable||!!a,s=this.showLineNumbers?r.replace(/\n$/,``).split(`
`).length:0,c=h`<pre
      part="region"
      role="region"
      tabindex="0"
      aria-label=${t}
      aria-description=${this.aria.description??m}
      data-wrap=${String(!this.noWrap)}
      class=${b({codeBlock:!0,copyable:this.copyable,labeled:!!a})}
      style=${x(o?{}:{maxHeight:n})}
    ><code
        part="code"
        class=${i?`language-${i}`:m}
        data-language=${i??m}
        style=${s?`--code-line-digits:${Math.max(String(s).length,2)}`:m}
      >${La(r,this.noHighlight?void 0:i,this.showLineNumbers)}</code></pre>`;if(!o)return c;let l=this.status,u=l===`copied`?e(`codeBlock.copied`):l===`failed`?e(`codeBlock.copyFailed`):``,ee=u||e(`codeBlock.copy`),te=l===`failed`?`danger`:l===`copied`?`success`:`neutral`;return h`<div part="root" class="root" style=${x({maxHeight:n})}>
${c}
<div class="actions">
${a?h`<span part="language" class="language" aria-hidden="true"
>${a}</span
>`:m}
${this.copyable?h`<button
type="button"
part="copy-button"
class="iconButton ${te} variant-ghost small square"
aria-label=${ee}
title=${ee}
@click=${()=>void this.copy()}
>
${l===`copied`?Ar:l===`failed`?Sr:ar}
</button>`:m}
</div>
${this.copyable?h`<span class="visuallyHidden" aria-live="polite"
>${u}</span
>`:m}
</div>`}},R([v()],Va.prototype,`code`,void 0),R([v({reflect:!0})],Va.prototype,`language`,void 0),R([v({type:Boolean,attribute:`no-highlight`,reflect:!0})],Va.prototype,`noHighlight`,void 0),R([v({type:Boolean,attribute:`show-line-numbers`,reflect:!0})],Va.prototype,`showLineNumbers`,void 0),R([v({type:Boolean,attribute:`show-language`,reflect:!0})],Va.prototype,`showLanguage`,void 0),R([v({type:Boolean,attribute:`no-wrap`,reflect:!0})],Va.prototype,`noWrap`,void 0),R([v({attribute:`max-height`})],Va.prototype,`maxHeight`,void 0),R([v({type:Boolean,reflect:!0})],Va.prototype,`copyable`,void 0),R([p()],Va.prototype,`status`,void 0)})))()}var Ua,G;function Wa(){return(Wa=e((()=>{F(),gi(),E(),on(),I(),A(),Mi(),Oi(),Fi(),Di(),Hr(),yr(),or(),d(),f(),he(),Je(),wt(),Ua={fromAttribute:e=>e===null?void 0:e.split(`,`).map(e=>e.trim()).filter(Boolean),toAttribute:e=>Array.isArray(e)?e.join(`, `):e},G=class e extends C{constructor(...e){super(...e),this.open=!1,this.items=[],this.maxResults=12,this.query=``,this.activeIndex=0,this.locale=new D(this),this.presence=new Wn(this,()=>this.panel),this.modal=new Si(this),this.focusScope=new Li(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new ki(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleShortcut=e=>{let t=at(this.shortcut);if(t.length===0)return;let n=e.composedPath()[0]??e.target;u(n)&&!e.ctrlKey&&!e.metaKey&&!e.altKey||e.isComposing||t.some(t=>Fe(e,t))&&(e.preventDefault(),e.stopPropagation(),this.requestOpenChange(!0,`shortcut`))}}static{this.tagName=`minerva-command-dialog`}static{this.styles=[k,Ci,S`
:host{
display: contents;
}
`,T(ni),T(rn)]}show(){this.open=!0}hide(){this.open=!1}get results(){let e=Math.max(0,this.maxResults),t=(Array.isArray(this.items)?this.items:[]).filter(e=>!e.disabled),n=this.query.trim();if(!n)return t.slice(0,e);if(typeof this.filter==`function`)return this.filter(t,n).slice(0,e);let r=Ue(n);return t.filter(e=>Ue(c(e)).includes(r)).slice(0,e)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}select(e){this.emit(`minerva-select`,{value:e.id,item:e}),this.requestOpenChange(!1,`select`)}handleKeyDown(e){let t=this.results,n=Math.max(t.length-1,0),r={ArrowDown:e=>Math.min(e+1,n),ArrowUp:e=>Math.max(e-1,0),Home:()=>0,End:()=>n}[e.key];if(r&&(e.key.startsWith(`Arrow`)||!this.query)){e.preventDefault(),this.activeIndex=r(Math.min(this.activeIndex,n));return}let i=t[this.activeIndex];e.key===`Enter`&&i&&!e.isComposing&&(e.preventDefault(),this.select(i))}handleInput(e){this.query=e.target.value,this.activeIndex=0}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleShortcut,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleShortcut,!0),O(this.panel),O(this.overlay)}willUpdate(e){e.has(`open`)&&(this.presence.sync(this.open),this.open&&(this.query=``,this.activeIndex=0)),e.has(`items`)&&j&&this.checkItems();let t=this.results.length;this.activeIndex>0&&this.activeIndex>=t&&(this.activeIndex=Math.max(t-1,0))}checkItems(){if(!Array.isArray(this.items)){L(e.tagName,"`items` must be an array of { id, title, ... } objects.");return}let t=new Set;for(let n of this.items)t.has(n.id)&&L(e.tagName,`duplicate item id "${n.id}": ids identify the chosen command in minerva-select and must be unique.`),t.add(n.id)}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(Gn(this.overlay),Gn(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.open&&(e.has(`activeIndex`)||e.has(`query`))&&this.renderRoot.querySelector(`#option-${this.activeIndex}`)?.scrollIntoView?.({block:`nearest`}),this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}hookStates(){return{state:this.open?`open`:`closed`}}afterClose(){O(this.panel),O(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return m;let e=this.locale.t,t=this.open?`open`:`closed`,n=this.results,r=n[this.activeIndex]?`option-${this.activeIndex}`:void 0,i=this.placeholder??e(`command.placeholder`);return h`<div
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
${this.shortcutLabel?h`<kbd class="kbd">${this.shortcutLabel}</kbd>`:m}
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
aria-activedescendant=${r??m}
autocomplete="off"
spellcheck="false"
placeholder=${i}
.value=${St(this.query)}
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
${n.length===0?h`<div class="empty" part="empty">
${this.emptyText??e(`command.empty`)}
</div>`:n.map((e,t)=>{let n=t===this.activeIndex;return h`<button
id=${`option-${t}`}
part=${Nr(`item`,{highlighted:n})}
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
><strong>${e.title}</strong>${e.description?h`<small>${e.description}</small>`:m}</span
>${e.group?h`<span class="group">${e.group}</span>`:m}
</button>`})}
</div>
</div>`}},R([v({type:Boolean,reflect:!0})],G.prototype,`open`,void 0),R([v({attribute:!1})],G.prototype,`items`,void 0),R([v()],G.prototype,`label`,void 0),R([v()],G.prototype,`description`,void 0),R([v()],G.prototype,`placeholder`,void 0),R([v({attribute:`empty-text`})],G.prototype,`emptyText`,void 0),R([v({attribute:`shortcut-label`})],G.prototype,`shortcutLabel`,void 0),R([v({converter:Ua})],G.prototype,`shortcut`,void 0),R([v({type:Number,attribute:`max-results`})],G.prototype,`maxResults`,void 0),R([v({attribute:!1})],G.prototype,`filter`,void 0),R([v({attribute:`results-label`})],G.prototype,`resultsLabel`,void 0),R([v({attribute:`enter-label`})],G.prototype,`enterLabel`,void 0),R([p()],G.prototype,`query`,void 0),R([p()],G.prototype,`activeIndex`,void 0),R([y(`.content`)],G.prototype,`panel`,void 0),R([y(`.overlay`)],G.prototype,`overlay`,void 0)})))()}var Ga,Ka,qa;function Ja(){return(Ja=e((()=>{F(),I(),d(),f(),he(),Je(),Ga=`(prefers-color-scheme: dark)`,Ka=`data-minerva-theme-scope`,qa=class e extends C{constructor(...e){super(...e),this.root=!1,this.media=null,this.mode=null,this.onSchemeChange=()=>this.apply()}static{this.tagName=`minerva-config`}static{this.styles=S`
:host{
display: contents;
}
`}get resolvedMode(){return this.mode}connectedCallback(){super.connectedCallback(),typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(Ga),this.media.addEventListener(`change`,this.onSchemeChange))}disconnectedCallback(){super.disconnectedCallback(),this.media?.removeEventListener(`change`,this.onSchemeChange),this.media=null,this.root&&this.clear(document.documentElement)}updated(e){e.has(`root`)&&e.get(`root`)!==void 0&&this.clear(e.get(`root`)?document.documentElement:this),this.apply()}target(){return this.root?document.documentElement:this}clear(e){for(let t of[`data-theme`,`data-palette`,Ka,`lang`])(e!==this||t!==`lang`)&&e.removeAttribute(t);le(e,null),Te(e.style,{}),e.style.removeProperty(`color-scheme`)}apply(){let t=this.target(),n=(e,n)=>{n==null?t.removeAttribute(e):t.setAttribute(e,n)},r=this.theme,i=this.media?.matches?`dark`:`light`,a=r===`system`?i:r===`github-dark`?`dark`:r===`light`||r===`dark`?r:null,o=ee(this.design)?this.design:void 0,s=Qe(this.palette)?this.palette:De(o),c=!!s&&r!==`github-dark`,l=ce(this.primaryColor);j&&l===void 0&&L(e.tagName,Ee(this.primaryColor)),n(`data-theme`,a),n(`data-palette`,c?s:null);let u=!this.root&&(a!==null||c||o!==void 0||[this.density,this.radius,this.shadow,this.fontScale].some(Boolean));this.root||n(Ka,u?``:null),a?t.style.colorScheme=a:t.style.removeProperty(`color-scheme`);let te=r===`github-dark`&&et(r)?pe[r]:void 0,ne=a??(!u&&t.parentElement?.closest(`[data-theme]`)?.getAttribute(`data-theme`)===`dark`?`dark`:`light`);Te(t.style,{...te,...l?it(l,ne,c?ht[s][ne]:te):void 0}),le(t,{preset:o,density:dt(this.density)?this.density:void 0,radius:ge(this.radius)?this.radius:void 0,shadow:ze(this.shadow)?this.shadow:void 0,fontScale:ie(this.fontScale)?this.fontScale:void 0},{all:!this.root&&o!==void 0}),this.root&&this.locale&&(document.documentElement.lang=this.locale),a!==this.mode&&(this.mode=a,a&&this.emit(`minerva-theme-change`,{mode:a}))}render(){return h`<slot></slot>`}},R([v({reflect:!0})],qa.prototype,`theme`,void 0),R([v({reflect:!0})],qa.prototype,`palette`,void 0),R([v({reflect:!0})],qa.prototype,`design`,void 0),R([v({reflect:!0})],qa.prototype,`density`,void 0),R([v({reflect:!0})],qa.prototype,`radius`,void 0),R([v({reflect:!0})],qa.prototype,`shadow`,void 0),R([v({reflect:!0,attribute:`font-scale`})],qa.prototype,`fontScale`,void 0),R([v({attribute:`primary-color`})],qa.prototype,`primaryColor`,void 0),R([v({reflect:!0})],qa.prototype,`locale`,void 0),R([v({type:Boolean,reflect:!0})],qa.prototype,`root`,void 0)})))()}var K;function Ya(){return(Ya=e((()=>{N(),F(),dr(),gi(),E(),I(),w(),A(),Mi(),Oi(),Fi(),Di(),fa(),Hr(),or(),d(),f(),K=class e extends C{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.color=`primary`,this.loading=!1,this.confirmDisabled=!1,this.busy=!1,this.locale=new D(this),this.aria=new P(this),this.slots=new M(this),this.presence=new Wn(this,()=>this.panel),this.modal=new Si(this),this.focusScope=new Li(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new ki(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestClose(this.reason)})),this.reason=`outside`,this.wasPresent=!1}static{this.tagName=`minerva-confirm-dialog`}static{this.dependencies=[da]}static{this.styles=[k,Ci,S`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,T(ni)]}show(){this.open=!0}hide(){this.open=!1}requestClose(e){return!this.open||!this.emit(`minerva-open-change`,{open:!1,reason:e},{cancelable:!0})?!1:(this.open=!1,e!==`confirm`&&this.emit(`minerva-cancel`,{reason:e}),!0)}async handleConfirm(){if(!this.open||this.loading||this.busy||this.confirmDisabled||!this.emit(`minerva-confirm`,void 0,{cancelable:!0}))return;let e=this.onConfirm?.();if(e&&typeof e.then==`function`){this.busy=!0;try{await e}catch{return}finally{this.busy=!1}}this.requestClose(`confirm`)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,color:this.color,loading:this.loading||this.busy}}updated(t){let n=this.open||this.presence.present;if(t.has(`open`)){let t=this.panel;this.open&&t?(j&&!this.label&&!this.slots.test(`header`)&&!this.aria.label&&L(e.tagName,"set `label` (or the `header` slot / aria-label) to give the alertdialog an accessible name."),Gn(this.overlay),Gn(t),this.modal.activate(this),this.layer.activate(t),this.focusInitial(t)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!n&&this.afterClose(),this.wasPresent=n}async focusInitial(e){let t=Array.from(e.querySelectorAll(`minerva-button`));await Promise.all(t.map(e=>e.updateComplete)),this.open&&this.panel===e&&(this.focusScope.activate(e),this.emit(`minerva-after-open`))}disconnectedCallback(){super.disconnectedCallback(),O(this.panel),O(this.overlay)}afterClose(){O(this.panel),O(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return m;let e=this.open?`open`:`closed`,t=this.locale.t,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=this.loading||this.busy;return h`<div
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
aria-labelledby=${n?`title`:m}
aria-label=${n?m:this.aria.label??m}
aria-describedby=${r?`description`:m}
tabindex="-1"
data-state=${e}
>
${r?h`<p id="description" class="description" part="description">
${r}
</p>`:m}
${n?h`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:m}
<div class="body" part="body">
${this.slots.test(`[default]`)?h`<slot></slot>`:m}
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
${Sr}
</button>
</div>`}},R([v({type:Boolean,reflect:!0})],K.prototype,`open`,void 0),R([v()],K.prototype,`label`,void 0),R([v()],K.prototype,`description`,void 0),R([v({attribute:`confirm-label`})],K.prototype,`confirmLabel`,void 0),R([v({attribute:`cancel-label`})],K.prototype,`cancelLabel`,void 0),R([v({attribute:`close-label`})],K.prototype,`closeLabel`,void 0),R([v({reflect:!0})],K.prototype,`color`,void 0),R([v({type:Boolean,reflect:!0})],K.prototype,`loading`,void 0),R([v({type:Boolean,reflect:!0,attribute:`confirm-disabled`})],K.prototype,`confirmDisabled`,void 0),R([v({attribute:!1})],K.prototype,`onConfirm`,void 0),R([p()],K.prototype,`busy`,void 0),R([y(`.content`)],K.prototype,`panel`,void 0),R([y(`.overlay`)],K.prototype,`overlay`,void 0)})))()}function Xa(e){let t=ln(e,to);if(!t)return null;let n=e.ownerDocument;return t===n.documentElement||t===n.body?null:t}function Za(e,t){for(let n=e;n;n=er(n))if(n===t)return!0;return!1}function Qa(e){return ro.push(e),()=>{let t=ro.lastIndexOf(e);t>=0&&ro.splice(t,1)}}function $a(e){let t=e?.isConnected===!0?ln(e,ao):null;if(t&&`confirmQueue`in t)return t.confirmQueue;let n=ro[ro.length-1];return n?n.confirmQueue:(io??=new no(()=>document.body),io)}function eo(e){return t=>so({...t,host:t.host??e})}var to,no,ro,io,ao,oo,so;function co(){return(co=e((()=>{F(),gi(),E(),Nn(),Ya(),to=`minerva-config:not([root]), [data-minerva-theme-scope], [data-theme], [data-palette]`,no=class{constructor(e){this.defaultContainer=e,this.requests=[],this.current=null,this.settles=new Set}enqueue(e){return In(K),new Promise(t=>{this.requests.push({options:e,resolve:t}),this.current||this.showNext()})}cancelAll(){let e=this.requests.splice(0);for(let t of e)t.resolve(!1);for(let e of[...this.settles])e(!1);this.current?.remove()}container(e){let t=typeof document>`u`?null:document,n=e.container;if(n)return n.isConnected?n:(j&&L(K.tagName,"confirm(): `container` is not connected to the document; the dialog is appended to document.body instead."),t.body);let r=e.host?.isConnected===!0?Xa(e.host):null,i=this.defaultContainer();return r&&!Za(i,r)?r:i}showNext(){let e=this.requests.shift();if(!e){this.current=null;return}let{options:t,resolve:n}=e,r=this.container(t),i=document.createElement(K.tagName);i.label=t.title,t.description&&(i.description=t.description),t.confirmLabel&&(i.confirmLabel=t.confirmLabel),t.cancelLabel&&(i.cancelLabel=t.cancelLabel),t.closeLabel&&(i.closeLabel=t.closeLabel),t.color&&(i.color=t.color);let a=t.host;if(a?.isConnected&&!t.container){let e=Vn(a);e!==Vn(r)&&i.setAttribute(`lang`,e)}let o=!1,s=!1,c=e=>{o||(o=!0,this.settles.delete(c),n(e))};this.settles.add(c);let l=new MutationObserver(()=>{i.isConnected||u()}),u=()=>{s||(s=!0,l.disconnect(),c(!1),i.remove(),this.showNext())};i.addEventListener(`minerva-open-change`,e=>{let{open:t,reason:n}=e.detail;queueMicrotask(()=>{!t&&!e.defaultPrevented&&c(n===`confirm`)})}),i.addEventListener(`minerva-after-close`,u,{once:!0}),this.current=i,r.append(i),l.observe(document,{childList:!0,subtree:!0}),i.open=!0}},ro=[],io=null,ao=`minerva-confirm-provider`,oo=()=>(j&&L(K.tagName,`confirm() called without a document (server render): resolving false.`),Promise.resolve(!1)),so=e=>typeof document>`u`?oo():$a(e.host).enqueue(e)})))()}var lo;function uo(){return(uo=e((()=>{I(),Ya(),co(),d(),lo=class extends C{constructor(...e){super(...e),this.confirmQueue=new no(()=>this),this.unregister=null,this.confirm=e=>this.confirmQueue.enqueue(e)}static{this.tagName=`minerva-confirm-provider`}static{this.dependencies=[K]}static{this.styles=S`
:host{
display: contents;
}
`}connectedCallback(){super.connectedCallback(),this.unregister=Qa(this)}disconnectedCallback(){super.disconnectedCallback(),this.unregister?.(),this.unregister=null,this.confirmQueue.cancelAll()}render(){return h`<slot></slot>`}}})))()}var fo,po,mo,q,ho;function go(){return(go=e((()=>{N(),F(),dr(),E(),on(),I(),A(),Br(),On(),Ai(),d(),f(),_(),g(),Je(),wt(),Dt(),fo=e=>e===void 0?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,po={ascend:`ascending`,descend:`descending`},mo=48,q=class e extends C{constructor(...e){super(...e),this.columns=[],this.rows=[],this.loading=!1,this.loadingRows=5,this.sortState=null,this.manualSort=!1,this.selectable=!1,this.selectedRowKeys=[],this.size=`medium`,this.variant=`simple`,this.hoverable=!1,this.retryable=!1,this.overflowing=!1,this.aria=new P(this),this.locale=new D(this),this.resize=null,this.handlePageChange=e=>{let{page:t,pageSize:n}=e.detail;queueMicrotask(()=>{e.defaultPrevented||(this.pagination={...this.pagination,current:t,pageSize:n})})}}static{this.tagName=`minerva-data-table`}static{this.dependencies=[Pi]}static{this.styles=[k,S`
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
`,T(qr),T(Yr)]}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect(),this.resize=null}keyOf(e,t){let n=this.rowKey;return typeof n==`function`?n(e,t):typeof n==`string`&&n?e[n]:t}entries(){return(this.rows??[]).map((e,t)=>({row:e,index:t,key:this.keyOf(e,t)}))}rowDisabled(e){return!!this.isRowDisabled?.(e)}willUpdate(t){if(j&&(t.has(`rows`)||t.has(`rowKey`))){let t=this.entries().map(e=>e.key);new Set(t).size!==t.length&&L(e.tagName,`rows have duplicate keys: set row-key to a unique field (or a function).`)}}updated(){this.observeOverflow();let e=this.shadowRoot?.querySelector(`minerva-pagination`);e&&this.pagination&&Object.assign(e,this.pagination)}observeOverflow(){let e=this.wrapper;if(!e){this.resize?.disconnect(),this.resize=null;return}let t=()=>{let t=e.scrollWidth>e.clientWidth||e.scrollHeight>e.clientHeight;t!==this.overflowing&&(this.overflowing=t)};t(),!this.resize&&typeof ResizeObserver<`u`&&(this.resize=new ResizeObserver(t),this.resize.observe(e),e.firstElementChild&&this.resize.observe(e.firstElementChild))}changeSort(e){let t=l(this.sortState,e);this.emit(`minerva-sort-change`,t,{cancelable:!0})&&(this.sortState=t)}commitSelection(e){let t=new Set(e),n={selectedRowKeys:e,selectedRows:this.entries().filter(e=>t.has(e.key)).map(e=>e.row)};if(!this.emit(`minerva-selection-change`,n,{cancelable:!0})){this.requestUpdate();return}this.selectedRowKeys=e}toggleRow(e,t){let n=this.selectedRowKeys;this.commitSelection(t?[...n.filter(t=>t!==e),e]:n.filter(t=>t!==e))}renderTable(){let e=this.columns??[],t=this.locale.t,n=a(e),r=this.selectable,i=r&&e[0]?.fixed===`left`,o=i?mo:0,s=this.entries(),c=this.sortState,l=c?.order??null,u=l===null?void 0:e.find(e=>e.key===c?.key),ee=u?Xe(u):null,te=!this.manualSort&&ee?[...s].sort((e,t)=>l===`descend`?ee(t.row,e.row):ee(e.row,t.row)):s,ne=new Set(this.selectedRowKeys),re=s.filter(e=>!this.rowDisabled(e.row)),ie=re.length>0&&re.every(e=>ne.has(e.key)),ae=!ie&&s.some(e=>ne.has(e.key)),oe=()=>{let e=new Set(re.map(e=>e.key)),t=this.selectedRowKeys;this.commitSelection(ie?t.filter(t=>!e.has(t)):[...t,...re.map(e=>e.key).filter(e=>!ne.has(e))])},se=e=>{let t={textAlign:e.align},r=fo(e.width);return r!==void 0&&(t.width=r,t.minWidth=r),e.fixed===`left`?t.left=`${(n.leftOffsets[e.key]??0)+o}px`:e.fixed===`right`&&(t.right=`${n.rightOffsets[e.key]??0}px`),t},ce=e=>e.fixed===`left`&&e.key===n.lastLeftFixedKey?`left`:e.fixed===`right`&&e.key===n.firstRightFixedKey?`right`:m,le=x({width:`${mo}px`,minWidth:`${mo}px`,...i?{left:`0px`}:{}}),ue=i?`left`:m,de=e.length+ +!!r,fe=e=>{if(!e.sortable)return h`<th
part="header-cell"
scope="col"
style=${x(se(e))}
data-ellipsis=${e.ellipsis?`true`:m}
data-fixed=${e.fixed??m}
data-fixed-edge=${ce(e)}
>
${e.header}
</th>`;let t=c?.key===e.key?c.order:null,n=t===`ascend`?vr:t===`descend`?ri:zr,r=t?po[t]:`none`;return h`<th
part=${Nr(`header-cell`,{sort:r})}
scope="col"
aria-sort=${r}
data-sort=${r}
style=${x(se(e))}
data-ellipsis=${e.ellipsis?`true`:m}
data-fixed=${e.fixed??m}
data-fixed-edge=${ce(e)}
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
</th>`},pe;pe=this.loading?Array.from({length:this.loadingRows},()=>h`<tr part="row" aria-hidden="true">
${r?h`<td
part="cell"
class="selectionCell"
style=${le}
data-fixed=${ue}
></td>`:m}
${e.map(e=>h`<td
part="cell"
style=${x(se(e))}
data-fixed=${e.fixed??m}
data-fixed-edge=${ce(e)}
>
<span part="skeleton" class="skeleton"></span>
</td>`)}
</tr>`):s.length===0?h`<tr part="row">
<td part="empty" colspan=${de} class="empty">
<slot name="empty">${this.emptyText??t(`table.empty`)}</slot>
</td>
</tr>`:bt(te,e=>e.key,({row:n,index:i,key:a},o)=>{let s=r&&ne.has(a);return h`<tr
part=${Nr(`row`,{selected:s})}
aria-selected=${s?`true`:m}
?data-selected=${s}
>
${r?h`<td
part="cell"
class="selectionCell"
style=${le}
data-fixed=${ue}
>
<input
type="checkbox"
part="checkbox"
class="checkbox"
.checked=${St(s)}
?disabled=${this.rowDisabled(n)}
aria-label=${t(`table.selectRow`,{row:this.getRowLabel?.(n,i)??String(a)})}
@change=${e=>this.toggleRow(a,e.target.checked)}
/>
</td>`:m}
${e.map(e=>h`<td
part="cell"
style=${x(se(e))}
data-ellipsis=${e.ellipsis?`true`:m}
data-fixed=${e.fixed??m}
data-fixed-edge=${ce(e)}
>
${e.render?e.render(n,o):n[e.key]}
</td>`)}
</tr>`});let me=fo(this.scrollX),he=fo(this.scrollY),ge=!!(me||he)||this.overflowing,_e=this.aria.label;return h`<div
part="viewport"
class=${b({wrapper:!0,wrapperBordered:this.variant===`bordered`,wrapperScrollY:!!he})}
role=${ge?`region`:m}
tabindex=${ge?0:m}
aria-label=${ge?_e??t(`table.scrollRegion`):m}
style=${x(he?{maxHeight:he,overflowY:`auto`}:{})}
>
<table
part="table"
class=${b({table:!0,[this.size]:!0,[this.variant]:!0,hoverable:this.hoverable,scrollX:!!me})}
style=${x(me?{minWidth:me}:{})}
aria-label=${_e??m}
aria-description=${this.aria.description??m}
>
<thead>
<tr part="row">
${r?h`<th
part="header-cell"
scope="col"
class="selectionCell"
style=${le}
data-fixed=${ue}
>
<input
type="checkbox"
part="checkbox"
class="checkbox"
.checked=${St(ie)}
.indeterminate=${ae}
?disabled=${re.length===0||this.loading}
aria-label=${t(`table.selectAll`)}
@change=${oe}
/>
</th>`:m}
${e.map(fe)}
</tr>
</thead>
<tbody>
${pe}
</tbody>
</table>
</div>`}hookStates(){return{loading:this.loading,size:this.size,variant:this.variant}}render(){let e=!!this.error&&!this.loading;return h`<div
part="root"
class="dataTable"
aria-busy=${this.loading?`true`:m}
>
${e?h`<div part="error" class="error" role="alert">
<div class="errorTitle">
<slot name="error">${this.error}</slot>
</div>
${this.retryable?h`<button
type="button"
part="retry-button"
class="customButton neutral variant-outline small retry"
@click=${()=>this.emit(`minerva-retry`)}
>
<span class="label"
><span class="retryIcon" aria-hidden="true"
>${gr}</span
>${this.retryLabel??this.locale.t(`table.retry`)}</span
>
</button>`:m}
</div>`:h`${this.renderTable()}
${this.pagination?h`<minerva-pagination
part="pagination"
exportparts="root: pagination-root, item: pagination-item"
@minerva-page-change=${this.handlePageChange}
></minerva-pagination>`:m}`}
</div>`}},R([v({attribute:!1})],q.prototype,`columns`,void 0),R([v({attribute:!1})],q.prototype,`rows`,void 0),R([v({attribute:`row-key`})],q.prototype,`rowKey`,void 0),R([v({attribute:`empty-text`})],q.prototype,`emptyText`,void 0),R([v({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),R([v({type:Number,attribute:`loading-rows`})],q.prototype,`loadingRows`,void 0),R([v({attribute:!1})],q.prototype,`sortState`,void 0),R([v({type:Boolean,attribute:`manual-sort`})],q.prototype,`manualSort`,void 0),R([v({type:Boolean,reflect:!0})],q.prototype,`selectable`,void 0),R([v({attribute:!1})],q.prototype,`selectedRowKeys`,void 0),R([v({attribute:!1})],q.prototype,`isRowDisabled`,void 0),R([v({attribute:!1})],q.prototype,`getRowLabel`,void 0),R([v({reflect:!0})],q.prototype,`size`,void 0),R([v({reflect:!0})],q.prototype,`variant`,void 0),R([v({type:Boolean,reflect:!0})],q.prototype,`hoverable`,void 0),R([v({attribute:`scroll-x`})],q.prototype,`scrollX`,void 0),R([v({attribute:`scroll-y`})],q.prototype,`scrollY`,void 0),R([v({attribute:!1})],q.prototype,`pagination`,void 0),R([v()],q.prototype,`error`,void 0),R([v({type:Boolean})],q.prototype,`retryable`,void 0),R([v({attribute:`retry-label`})],q.prototype,`retryLabel`,void 0),R([p()],q.prototype,`overflowing`,void 0),R([y(`.wrapper`)],q.prototype,`wrapper`,void 0),ho=class extends C{constructor(...e){super(...e),this.primary=``,this.monospace=!1,this.maxWidth=360,this.observer=null}static{this.tagName=`minerva-table-cell-content`}static{this.styles=[k,S`
:host{
display: block;
min-width: 0;
}
`,T(Yr)]}hasSecondarySlot(){return Array.from(this.children).some(e=>e.getAttribute(`slot`)===`secondary`)}connectedCallback(){super.connectedCallback(),this.observer??=typeof MutationObserver>`u`?null:new MutationObserver(()=>this.requestUpdate()),this.observer?.observe(this,{childList:!0})}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}render(){let e=this.secondary!==void 0&&this.secondary!==null||this.hasSecondarySlot(),t=b({cellPrimary:!0,cellMono:this.monospace,cellStrong:e}),n=h`<slot>${this.primary}</slot>`;return h`<div
part="root"
class="cellContent"
style=${x({maxWidth:fo(this.maxWidth)})}
>
${this.monospace?h`<code part="primary" class=${t}>${n}</code>`:h`<div part="primary" class=${t}>${n}</div>`}
${e?h`<div part="secondary" class="cellSecondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:m}
</div>`}},R([v()],ho.prototype,`primary`,void 0),R([v()],ho.prototype,`secondary`,void 0),R([v({type:Boolean,reflect:!0})],ho.prototype,`monospace`,void 0),R([v({attribute:`max-width`})],ho.prototype,`maxWidth`,void 0)})))()}var _o,vo;function yo(){return(yo=e((()=>{F(),I(),A(),An(),d(),f(),_(),_o=class extends C{constructor(...e){super(...e),this.label=``}static{this.tagName=`minerva-description-item`}static{this.styles=[k,S`
:host{
display: contents;
}
`]}render(){return h`<slot></slot>`}},R([v({reflect:!0})],_o.prototype,`label`,void 0),vo=class e extends C{constructor(...e){super(...e),this.items=[],this.bordered=!1,this.striped=!1,this.observer=null}static{this.tagName=`minerva-description-list`}static{this.dependencies=[_o]}static{this.shadowRootOptions={...C.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[k,S`
:host{
display: block;
}
`,T(bn)]}declarativeItems(){return Array.from(this.children).filter(e=>e.localName===_o.tagName)}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,attributes:!0,subtree:!0,attributeFilter:[`label`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}updated(){let t=this.declarativeItems();if(Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,n)=>{let r=t[n];r&&typeof e.assign==`function`&&e.assign(r)}),j){let t=Array.from(this.children).filter(e=>e.localName!==_o.tagName);t.length&&L(e.tagName,`only <minerva-description-item> children are rendered (ignored: <${t[0].localName}>).`)}}render(){let e=this.declarativeItems();return h`<dl
part="root"
class=${b({descriptionList:!0,bordered:this.bordered,striped:this.striped})}
>
${(this.items??[]).map(e=>h`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description">${e.value}</dd>
</div>`)}
${e.map(e=>h`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description"><slot data-item></slot></dd>
</div>`)}
</dl>`}},R([v({attribute:!1})],vo.prototype,`items`,void 0),R([v({type:Boolean,reflect:!0})],vo.prototype,`bordered`,void 0),R([v({type:Boolean,reflect:!0})],vo.prototype,`striped`,void 0)})))()}var bo,xo;function So(){return(So=e((()=>{F(),I(),w(),A(),rr(),d(),f(),_(),g(),bo=e=>typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,xo=class e extends C{constructor(...e){super(...e),this.variant=`solid`,this.orientation=`horizontal`,this.thickness=1,this.spacing=16,this.textAlign=`center`,this.elevation=!1,this.flexItem=!1,this.slots=new M(this)}static{this.tagName=`minerva-divider`}static{this.styles=[k,S`
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
`,T(Qn)]}hookStates(){let e=this.orientation===`horizontal`&&this.slots.test(`[default]`);return{orientation:this.orientation,variant:this.variant,align:e?this.textAlign:void 0}}updated(){j&&this.orientation===`vertical`&&this.slots.test(`[default]`)&&L(e.tagName,`text is only rendered by horizontal dividers; it is ignored when orientation is vertical.`)}render(){let e=this.orientation===`horizontal`,t=e&&this.slots.test(`[default]`),n=this.textAlign,r={};if(this.thickness!=null&&!Number.isNaN(this.thickness)&&(r.borderWidth=`${this.thickness}px`,r[`--_divider-thickness`]=`${this.thickness}px`),this.length!=null&&this.length!==``&&(r[e?`width`:`height`]=bo(this.length)),this.spacing!=null&&!Number.isNaN(this.spacing)){let t=`${this.spacing}px`;r.marginTop=e?t:`0`,r.marginBottom=e?t:`0`,r.marginLeft=e?`0`:t,r.marginRight=e?`0`:t}let i=b({divider:!0,[this.variant]:!0,[this.orientation]:!0,withText:t,[`text${n.charAt(0).toUpperCase()}${n.slice(1)}`]:t,elevation:this.elevation,flexItem:this.flexItem});return t?h`<div
part="root"
role="separator"
aria-orientation=${this.orientation}
class=${i}
style=${x(r)}
>
<span class="text" part="label"><slot></slot></span>
</div>`:h`<hr
part="root"
aria-orientation=${this.orientation}
class=${i}
style=${x(r)}
/>`}},R([v({reflect:!0})],xo.prototype,`variant`,void 0),R([v({reflect:!0})],xo.prototype,`orientation`,void 0),R([v({type:Number})],xo.prototype,`thickness`,void 0),R([v()],xo.prototype,`length`,void 0),R([v({type:Number})],xo.prototype,`spacing`,void 0),R([v({attribute:`text-align`})],xo.prototype,`textAlign`,void 0),R([v({type:Boolean,reflect:!0})],xo.prototype,`elevation`,void 0),R([v({type:Boolean,reflect:!0,attribute:`flex-item`})],xo.prototype,`flexItem`,void 0)})))()}var Co,wo;function To(){return(To=e((()=>{N(),F(),dr(),gi(),E(),I(),w(),A(),Mi(),Oi(),Fi(),Di(),or(),Cn(),d(),f(),_(),Co=[`left`,`right`,`top`,`bottom`],wo=class e extends C{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.side=`right`,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.nonModal=!1,this.locale=new D(this),this.aria=new P(this),this.slots=new M(this),this.presence=new Wn(this,()=>this.panel),this.modal=new Si(this),this.focusScope=new Li(this,()=>({trapped:!this.nonModal,loop:!0,restoreFocus:!0})),this.layer=new ki(this,()=>({disableOutsidePointerEvents:!this.nonModal,branches:()=>[this.triggerElement()],onFocusOutside:()=>this.nonModal,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-drawer-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)}}static{this.tagName=`minerva-drawer`}static{this.styles=[k,Ci,S`
:host{
display: contents;
}
`,T(tr)]}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(t){t.has(`open`)&&this.presence.sync(this.open),j&&t.has(`side`)&&!Co.includes(this.side)&&L(e.tagName,`invalid side "${this.side}" (expected left, right, top or bottom).`)}hookStates(){return{state:this.open?`open`:`closed`,side:Co.includes(this.side)?this.side:`right`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)||e.has(`nonModal`)&&this.open){let t=this.panel;this.open&&t?(e.has(`nonModal`)&&!e.has(`open`)&&(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate()),Gn(this.overlay),Gn(t),this.nonModal||this.modal.activate(this),this.layer.activate(t),this.focusScope.activate(t),e.has(`open`)&&this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),O(this.panel),O(this.overlay)}afterClose(){O(this.panel),O(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=Co.includes(this.side)?this.side:`right`;return h`<slot name="trigger"></slot> ${e?h`${this.nonModal?m:h`<div
part="overlay"
class="overlay"
popover="manual"
data-state=${t}
aria-hidden="true"
></div>`}
<div
part="content"
class=${b({content:!0,[i]:!0,[this.size]:!0})}
popover="manual"
role=${this.dialogRole}
aria-modal=${this.nonModal?m:`true`}
aria-labelledby=${n?`title`:m}
aria-label=${n?m:this.aria.label??m}
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
${n?h`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:m}
<div class="body" part="body"><slot></slot></div>
${this.slots.test(`footer`)?h`<div class="footer" part="footer">
<slot name="footer"></slot>
</div>`:m}
${this.hideCloseButton?m:h`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`drawer.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${Sr}
</button>`}
</div>`:m}`}},R([v({type:Boolean,reflect:!0})],wo.prototype,`open`,void 0),R([v()],wo.prototype,`label`,void 0),R([v()],wo.prototype,`description`,void 0),R([v({attribute:`hidden-description`})],wo.prototype,`hiddenDescription`,void 0),R([v({reflect:!0})],wo.prototype,`side`,void 0),R([v({reflect:!0})],wo.prototype,`size`,void 0),R([v({type:Boolean,attribute:`hide-close-button`})],wo.prototype,`hideCloseButton`,void 0),R([v({attribute:`close-label`})],wo.prototype,`closeLabel`,void 0),R([v({attribute:`dialog-role`})],wo.prototype,`dialogRole`,void 0),R([v({type:Boolean,reflect:!0,attribute:`non-modal`})],wo.prototype,`nonModal`,void 0),R([y(`.content`)],wo.prototype,`panel`,void 0),R([y(`.overlay`)],wo.prototype,`overlay`,void 0)})))()}var Eo,Do,Oo,ko;function Ao(){return(Ao=e((()=>{N(),F(),E(),I(),w(),A(),un(),d(),f(),_(),g(),Eo=_t`<svg class="defaultIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke="none" aria-hidden="true" focusable="false"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM5 5v9h4a3 3 0 0 0 6 0h4V5ZM5 16v3h14v-3h-2.54a5 5 0 0 1-8.92 0Z" /></svg>`,Do=_t`<svg class="defaultIcon" aria-hidden="true" focusable="false" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse style="fill: var(--surface-muted-color)" cx="32" cy="33" rx="32" ry="7" /><g fill-rule="nonzero" style="stroke: var(--border-strong-color)"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" /><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" style="fill: var(--surface-color)" /></g></g></svg>`,Oo=e=>e&&/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,ko=class e extends C{constructor(...e){super(...e),this.heading=``,this.hideDescription=!1,this.hideIcon=!1,this.useSvg=!1,this.showShadow=!1,this.locale=new D(this),this.aria=new P(this),this.slots=new M(this)}static{this.tagName=`minerva-empty`}static{this.styles=[k,S`
:host{
display: block;
}
`,T(_i)]}hookStates(){return{size:this.size}}updated(){j&&this.hideDescription&&this.description&&L(e.tagName,`description is ignored while hide-description is set.`)}render(){let e=!!this.heading||this.slots.test(`heading`),t=this.slots.test(`description`),n=this.description??this.locale.t(`empty.description`),r=!this.hideDescription&&(t||n!==``),i=this.slots.test(`action`)||this.slots.test(`secondary-action`),a=this.aria.label;return h`<div
part="root"
class=${b({empty:!0,showShadow:this.showShadow,sized:!!this.size,[`size-${this.size}`]:!!this.size})}
style=${x({width:Oo(this.width),height:Oo(this.height)})}
role="status"
aria-label=${a??m}
aria-labelledby=${a?m:e?`title`:r?`description`:m}
aria-describedby=${e&&r?`description`:m}
>
${this.hideIcon?m:h`<div part="icon" class="iconWrapper">
<slot name="icon">${this.useSvg?Do:Eo}</slot>
</div>`}
${e?h`<div id="title" part="title" class="title">
<slot name="heading">${this.heading}</slot>
</div>`:m}
${r?h`<div id="description" part="description" class="description">
<slot name="description">${n}</slot>
</div>`:m}
${i?h`<div part="actions" class="actions">
<slot name="action"></slot><slot name="secondary-action"></slot>
</div>`:m}
${this.slots.test(`[default]`)?h`<div part="footer" class="footer"><slot></slot></div>`:m}
</div>`}},R([v()],ko.prototype,`heading`,void 0),R([v()],ko.prototype,`description`,void 0),R([v({type:Boolean,attribute:`hide-description`})],ko.prototype,`hideDescription`,void 0),R([v({type:Boolean,attribute:`hide-icon`})],ko.prototype,`hideIcon`,void 0),R([v({reflect:!0})],ko.prototype,`size`,void 0),R([v({type:Boolean,attribute:`use-svg`})],ko.prototype,`useSvg`,void 0),R([v()],ko.prototype,`width`,void 0),R([v()],ko.prototype,`height`,void 0),R([v({type:Boolean,attribute:`show-shadow`})],ko.prototype,`showShadow`,void 0)})))()}var jo,Mo;function No(){return(No=e((()=>{F(),I(),w(),A(),Kn(),d(),f(),jo=e=>e.localName===`minerva-checkbox`||e.localName===`minerva-switch`||e instanceof HTMLInputElement&&(e.type===`checkbox`||e.type===`radio`),Mo=class e extends C{constructor(...e){super(...e),this.label=``,this.helperText=``,this.errorMessage=``,this.invalid=!1,this.required=!1,this.disabled=!1,this.readOnly=!1,this.requiredIndicator=`*`,this.slots=new M(this),this.observer=null,this.control=null,this.saved=new Map}static{this.tagName=`minerva-form-control`}static{this.styles=[k,S`
:host{
display: block;
}
.label{
cursor: default;
}
`,T(Mn)]}get controlElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.release()}updated(){this.sync()}get labelText(){return this.label?this.label:Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`label`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}slotText(e){return Array.from(this.children).filter(t=>t.getAttribute(`slot`)===e).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}get descriptionText(){return this.invalid?this.errorMessage||this.slotText(`error-message`):this.helperText||this.slotText(`helper-text`)}save(e,t){this.saved.has(e)||this.saved.set(e,t)}setAttr(e,t,n){let r=`@${t}`;if(n===null){if(!this.saved.has(r))return;let n=this.saved.get(r);this.saved.delete(r),n===null?e.removeAttribute(t):e.setAttribute(t,n);return}this.save(r,e.getAttribute(t)),e.getAttribute(t)!==n&&e.setAttribute(t,n)}setProp(e,t,n){let r=`.${t}`;if(!n){if(!this.saved.has(r))return;e[t]=this.saved.get(r),this.saved.delete(r);return}this.save(r,e[t]),e[t]=!0}propFor(e,t){return{invalid:[`invalid`,`error`],required:[`required`],disabled:[`disabled`],readOnly:[`readOnly`,`readonly`]}[t].find(t=>t in e&&typeof e[t]==`boolean`)??null}release(){let e=this.control;if(e){for(let[t,n]of this.saved)if(t.startsWith(`@`)){let r=t.slice(1);n===null?e.removeAttribute(r):e.setAttribute(r,n)}else e[t.slice(1)]=n;this.saved.clear(),this.control=null}}sync(){let t=this.controlElement;if(t!==this.control&&(this.release(),this.control=t),!t)return;let n=this.labelText,r=this.saved.has(`@aria-label`);n&&(r||!t.hasAttribute(`aria-label`))?this.setAttr(t,`aria-label`,n):n||this.setAttr(t,`aria-label`,null);let i=this.descriptionText;this.setAttr(t,`aria-description`,i||null);for(let e of[`invalid`,`required`,`disabled`,`readOnly`]){let n=this.propFor(t,e);n&&this.setProp(t,n,this[e])}if(this.setAttr(t,`aria-invalid`,this.invalid?`true`:null),this.setAttr(t,`aria-required`,this.required?`true`:null),this.setAttr(t,`aria-readonly`,this.readOnly?`true`:null),j&&this.children.length>0){let t=Array.from(this.children).filter(e=>!e.hasAttribute(`slot`));t.length>1&&L(e.tagName,`wraps ONE control, found ${t.length} elements in the default slot: only the first one is wired.`)}}handleLabelClick(e){let t=this.controlElement;t&&!this.disabled&&(e.preventDefault(),jo(t)?t.click():t.focus())}hookStates(){return{disabled:this.disabled,invalid:this.invalid,readonly:this.readOnly,required:this.required}}render(){let e=!!this.label||this.slots.test(`label`),t=!!this.helperText||this.slots.test(`helper-text`),n=!!this.errorMessage||this.slots.test(`error-message`);return h`<div class="root" part="root">
${e?h`<label
id="label"
class="label"
part="label"
@click=${this.handleLabelClick}
>${this.label||h`<slot name="label"></slot>`}${this.required?h`<span
class="required"
part="required-indicator"
aria-hidden="true"
>${this.requiredIndicator}</span
>`:m}</label
>`:m}
<slot @slotchange=${()=>this.sync()}></slot>
${!this.invalid&&t?h`<div id="helper" class="helper" part="helper-text">
${this.helperText||h`<slot name="helper-text"></slot>`}
</div>`:m}
${this.invalid&&n?h`<div
id="error"
class="error"
part="error-message"
role="alert"
>
${this.errorMessage||h`<slot name="error-message"></slot>`}
</div>`:m}
</div>`}},R([v()],Mo.prototype,`label`,void 0),R([v({attribute:`helper-text`})],Mo.prototype,`helperText`,void 0),R([v({attribute:`error-message`})],Mo.prototype,`errorMessage`,void 0),R([v({type:Boolean,reflect:!0})],Mo.prototype,`invalid`,void 0),R([v({type:Boolean,reflect:!0})],Mo.prototype,`required`,void 0),R([v({type:Boolean,reflect:!0})],Mo.prototype,`disabled`,void 0),R([v({type:Boolean,reflect:!0,attribute:`readonly`})],Mo.prototype,`readOnly`,void 0),R([v({attribute:`required-indicator`})],Mo.prototype,`requiredIndicator`,void 0)})))()}var Po;function Fo(){return(Fo=e((()=>{I(),A(),aa(),Tn(),Hn(),Ti(),d(),f(),g(),Po=class e extends C{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-form-layout`}static{this.styles=[k,S`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,T(vn),T(Rn)]}render(){let t=vi(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return h`<div class="root" part="root" style=${x(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},R([v({converter:Ii})],Po.prototype,`columns`,void 0),R([v({converter:ia})],Po.prototype,`gap`,void 0),R([v({attribute:`row-gap`,converter:ia})],Po.prototype,`rowGap`,void 0),R([v({attribute:`column-gap`,converter:ia})],Po.prototype,`columnGap`,void 0)})))()}function Io(e){let t=``;if(e&&typeof window<`u`){let n=vt(window);n.isSupported&&(n.addHook(`uponSanitizeAttribute`,(e,t)=>{t.attrName===`src`&&(e.nodeName!==`IMG`||!/^data:image\/(?:png|jpeg|gif|webp|avif);base64,[a-z0-9+/=\s]+$/i.test(t.attrValue))&&(t.keepAttr=!1)}),n.sanitize(zo,Ro)===Bo&&(t=n.sanitize(e,Ro)))}return`<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="${Lo}"><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${t}</body></html>`}var Lo,Ro,zo,Bo;function Vo(){return(Vo=e((()=>{gt(),Lo=`default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; object-src 'none'; frame-src 'none'; font-src 'none'; media-src 'none'; form-action 'none'; base-uri 'none'`,Ro={ALLOWED_TAGS:`a abbr b bdi bdo blockquote br caption center code col colgroup dd del div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i img ins li ol p pre s section small span strong style sub sup table tbody td tfoot th thead tr u ul wbr`.split(` `),ALLOWED_ATTR:`alt title class style lang dir role width height align valign bgcolor border cellpadding cellspacing colspan rowspan scope src`.split(` `),ALLOW_DATA_ATTR:!1,ALLOW_ARIA_ATTR:!0,FORBID_TAGS:[`base`,`meta`,`link`,`script`,`form`,`input`,`button`,`iframe`,`object`,`embed`,`svg`,`math`],FORBID_ATTR:[`href`,`srcdoc`,`srcset`,`action`,`formaction`,`target`,`ping`,`id`,`name`],FORCE_BODY:!0,RETURN_TRUSTED_TYPE:!1},zo=`<p title="t" onclick="x()">ok</p><script>x()<\/script><img alt="a" src="https://x.invalid/p" onerror="x()">`,Bo=`<p title="t">ok</p><img alt="a">`})))()}var Ho;function Uo(){return(Uo=e((()=>{N(),F(),I(),A(),Fn(),Vo(),d(),f(),g(),Ct(),Ho=class e extends C{constructor(...e){super(...e),this.html=``,this.label=``,this.viewport=`desktop`,this.mobileWidth=375,this.height=600,this.doc=Io(),this.aria=new P(this)}static{this.tagName=`minerva-html-preview`}static{this.styles=[k,S`
:host{
display: block;
}
`,T(Pr)]}willUpdate(e){e.has(`html`)&&(this.doc=Io(this.html))}updated(){j&&!this.label&&!this.aria.label&&L(e.tagName,`set label (or aria-label): the iframe needs a title for assistive technologies.`)}render(){let e=Number.isFinite(this.mobileWidth)&&this.mobileWidth>0?this.mobileWidth:375,t=Number.isFinite(this.height)&&this.height>0?this.height:600;return h`<div part="root" class="preview">
${yt(this.doc,h`<iframe
part="frame"
class="frame"
title=${this.label||this.aria.label||``}
sandbox=""
referrerpolicy="no-referrer"
srcdoc=${this.doc}
style=${x({width:this.viewport===`mobile`?`${e}px`:`100%`,height:`${t}px`})}
></iframe>`)}
</div>`}},R([v()],Ho.prototype,`html`,void 0),R([v()],Ho.prototype,`label`,void 0),R([v({reflect:!0})],Ho.prototype,`viewport`,void 0),R([v({type:Number,attribute:`mobile-width`})],Ho.prototype,`mobileWidth`,void 0),R([v({type:Number})],Ho.prototype,`height`,void 0),R([p()],Ho.prototype,`doc`,void 0)})))()}var Wo,Go,J;function Ko(){return(Ko=e((()=>{N(),F(),dr(),E(),Pn(),I(),A(),Fr(),Fi(),sn(),d(),f(),_(),Wo=200,Go=300,J=class e extends C{constructor(...e){super(...e),this.color=`neutral`,this.variant=`ghost`,this.size=`medium`,this.shape=`circle`,this.disabled=!1,this.loading=!1,this.toggle=!1,this.pressed=!1,this.tooltipPlacement=`top`,this.noTooltip=!1,this.type=`button`,this.tooltipOpen=!1,this.tooltipPositioned=!1,this.internals=Ln(this),this.aria=new P(this),this.locale=new D(this),this.floating=new ji(this,()=>({anchor:()=>this.button,floating:()=>this.tooltipElement,branches:()=>[this],placement:this.tooltipPlacement,offset:{mainAxis:8},dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,onDismiss:()=>this.hideTooltip(),onPosition:()=>{this.tooltipPositioned=!0}})),this.handlePointerEnter=()=>{if(!this.tooltipEnabled||this.tooltipOpen){this.clearTimers();return}this.clearTimers(),this.enterTimer=setTimeout(()=>this.showTooltip(),Wo)},this.handlePointerLeave=()=>{this.clearTimers(),this.tooltipOpen&&(this.leaveTimer=setTimeout(()=>this.hideTooltip(),Go))},this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-icon-button`}static{this.formAssociated=!0}static{this.shadowRootOptions={...C.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[k,Ci,S`
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
`,T(zn),T(Ir)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}get tooltipContent(){return this.tooltip||this.label||void 0}get tooltipEnabled(){return!this.noTooltip&&!!this.tooltipContent&&!this.disabled&&!this.loading}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer)}showTooltip(){this.tooltipEnabled&&(this.clearTimers(),this.tooltipOpen=!0)}hideTooltip(){this.clearTimers(),this.tooltipOpen=!1,this.tooltipPositioned=!1}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}if(this.toggle){let e=!this.pressed;this.emit(`minerva-pressed-change`,{pressed:e},{cancelable:!0})&&(this.pressed=e)}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0),this.clearTimers(),this.tooltipOpen=!1}hookStates(){return{state:this.toggle&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}willUpdate(e){(e.has(`disabled`)||e.has(`loading`)||e.has(`noTooltip`))&&!this.tooltipEnabled&&this.hideTooltip()}updated(){this.floating.sync(this.tooltipOpen&&this.tooltipEnabled),j&&!this.label&&!this.aria.label&&L(e.tagName,`icon buttons only contain an icon: set label (or aria-label) to give them an accessible name.`)}render(){let e=this.tooltipOpen&&this.tooltipEnabled;return h`<button
part="root"
type="button"
class=${b({iconButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape]:!0,disabled:this.disabled,loading:this.loading,pressed:this.toggle&&this.pressed})}
?disabled=${this.disabled}
tabindex=${this.disabled?`-1`:`0`}
aria-label=${this.label??this.aria.label??this.locale.t(`iconButton.default`)}
aria-description=${this.aria.description??m}
aria-describedby=${e?`tooltip`:m}
aria-pressed=${this.toggle?String(this.pressed):m}
aria-expanded=${this.aria.attr(`aria-expanded`)??m}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??m}
aria-busy=${this.loading?`true`:m}
aria-disabled=${this.loading&&!this.disabled?`true`:m}
@click=${this.handleClick}
@mouseenter=${this.handlePointerEnter}
@mouseleave=${this.handlePointerLeave}
@focus=${()=>this.showTooltip()}
@blur=${()=>this.hideTooltip()}
>
${this.loading?h`<span
class=${b({spinner:!0,[this.size]:!0})}
part="spinner"
role="progressbar"
aria-label=${this.locale.t(`common.loading`)}
>${xn}</span
>`:h`<span class="glyph" part="icon" aria-hidden="true"
><slot></slot
></span>`}
</button>
${e?h`<div
id="tooltip"
part="tooltip"
role="tooltip"
popover="manual"
class=${b({tooltip:!0,neutral:!0,solid:!0,default:!0,"animation-fade":!0,show:this.tooltipPositioned})}
@mouseenter=${()=>this.clearTimers()}
@mouseleave=${this.handlePointerLeave}
>
${this.tooltipContent}
</div>`:m}`}},R([v()],J.prototype,`label`,void 0),R([v({reflect:!0})],J.prototype,`color`,void 0),R([v({reflect:!0})],J.prototype,`variant`,void 0),R([v({reflect:!0})],J.prototype,`size`,void 0),R([v({reflect:!0})],J.prototype,`shape`,void 0),R([v({type:Boolean,reflect:!0})],J.prototype,`disabled`,void 0),R([v({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),R([v({type:Boolean,reflect:!0})],J.prototype,`toggle`,void 0),R([v({type:Boolean,reflect:!0})],J.prototype,`pressed`,void 0),R([v()],J.prototype,`tooltip`,void 0),R([v({attribute:`tooltip-placement`})],J.prototype,`tooltipPlacement`,void 0),R([v({type:Boolean,attribute:`no-tooltip`})],J.prototype,`noTooltip`,void 0),R([v({reflect:!0})],J.prototype,`type`,void 0),R([p()],J.prototype,`tooltipOpen`,void 0),R([p()],J.prototype,`tooltipPositioned`,void 0),R([y(`button`)],J.prototype,`button`,void 0),R([y(`.tooltip`)],J.prototype,`tooltipElement`,void 0)})))()}var qo,Y;function Jo(){return(Jo=e((()=>{N(),F(),dr(),E(),I(),w(),A(),li(),gn(),d(),f(),_(),wt(),qo=0,Y=class e extends Yn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.type=`text`,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.clearable=!1,this.showCharCount=!1,this.passwordVisible=!1,this.countId=`minerva-input-count-${qo++}`,this.locale=new D(this),this.aria=new P(this,()=>this.labels),this.slots=new M(this),this.dirty=!1}static{this.tagName=`minerva-input`}static{this.shadowRootOptions={...Yn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[k,S`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,T(dn)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}select(){this.input?.select()}getFormValue(){return this.value}getValidity(){let e=this.input;return e?{flags:mn(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.passwordVisible=!1}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),j&&t.has(`maxLength`)&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&L(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=this.input.value,this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}clear(){this.value=``,this.input.value=``,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:``}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:``}),this.emit(`minerva-clear`),this.input.focus()}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.type===`password`,r=this.clearable&&this.value!==``&&!t&&!this.readOnly,i=this.passwordVisible?this.hidePasswordLabel??e(`input.hidePassword`):this.showPasswordLabel??e(`input.showPassword`),a=this.showCharCount?this.countId:void 0;return h`<div
part="root"
class=${b({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?h`<span class="addon start" part="prefix"
><slot name="prefix"></slot
></span>`:m}
<input
part="input"
class="field"
.value=${St(this.value)}
type=${n&&this.passwordVisible?`text`:this.type}
name=${this.name||m}
placeholder=${this.placeholder||m}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
minlength=${this.minLength??m}
maxlength=${this.maxLength??m}
pattern=${this.pattern??m}
min=${this.min??m}
max=${this.max??m}
step=${this.step??m}
autocomplete=${this.autocomplete??m}
inputmode=${this.inputmode??m}
aria-label=${this.aria.label??m}
aria-description=${this.aria.description??m}
aria-describedby=${a??m}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:m}
@input=${this.handleInput}
@change=${this.handleChange}
/>
${r?h`<button
part="clear-button"
type="button"
class="action"
aria-label=${this.clearLabel??e(`input.clear`)}
@click=${this.clear}
>
${Sr}
</button>`:m}
${n?h`<button
part="password-toggle"
type="button"
class="action"
aria-label=${i}
?disabled=${t}
@click=${()=>this.passwordVisible=!this.passwordVisible}
>
${this.passwordVisible?Kr:wn}
</button>`:m}
${this.showCharCount?h`<span id=${this.countId} class="count" part="count"
>${this.maxLength!=null&&this.maxLength>=0?`${this.value.length} / ${this.maxLength}`:this.value.length}</span
>`:m}
${this.slots.test(`suffix`)?h`<span class="addon end" part="suffix"
><slot name="suffix"></slot
></span>`:m}
</div>`}},R([v({attribute:!1})],Y.prototype,`value`,void 0),R([v({attribute:`value`})],Y.prototype,`defaultValue`,void 0),R([v({reflect:!0})],Y.prototype,`type`,void 0),R([v({reflect:!0})],Y.prototype,`variant`,void 0),R([v({reflect:!0})],Y.prototype,`size`,void 0),R([v({type:Boolean,reflect:!0})],Y.prototype,`invalid`,void 0),R([v()],Y.prototype,`placeholder`,void 0),R([v({type:Boolean,reflect:!0,attribute:`readonly`})],Y.prototype,`readOnly`,void 0),R([v({type:Number,attribute:`minlength`})],Y.prototype,`minLength`,void 0),R([v({type:Number,attribute:`maxlength`})],Y.prototype,`maxLength`,void 0),R([v()],Y.prototype,`pattern`,void 0),R([v()],Y.prototype,`min`,void 0),R([v()],Y.prototype,`max`,void 0),R([v()],Y.prototype,`step`,void 0),R([v()],Y.prototype,`autocomplete`,void 0),R([v()],Y.prototype,`inputmode`,void 0),R([v({type:Boolean,reflect:!0})],Y.prototype,`clearable`,void 0),R([v({attribute:`clear-label`})],Y.prototype,`clearLabel`,void 0),R([v({type:Boolean,attribute:`show-char-count`})],Y.prototype,`showCharCount`,void 0),R([v({attribute:`show-password-label`})],Y.prototype,`showPasswordLabel`,void 0),R([v({attribute:`hide-password-label`})],Y.prototype,`hidePasswordLabel`,void 0),R([p()],Y.prototype,`passwordVisible`,void 0),R([y(`input`)],Y.prototype,`input`,void 0)})))()}function Yo(e){if(!e.trim())return{status:`empty`};try{return JSON.parse(e),{status:`valid`}}catch(e){return{status:`invalid`,error:e instanceof Error?e.message:String(e)}}}function Xo(e,t){let a=Math.min(10,Math.max(0,Math.trunc(t)||0));if(a>0)return i(e,n(e,void 0,{tabSize:a,insertSpaces:!0,eol:`
`}));let o=r(e,!0),s=[];for(;o.getPosition()<e.length;){o.scan();let t=o.getTokenOffset();s.push(e.slice(t,t+o.getTokenLength()))}return s.join(``)}var Zo;function Qo(){return(Qo=e((()=>{N(),F(),dr(),E(),I(),A(),Fr(),gn(),Bn(),_n(),d(),f(),_(),wt(),t(),Zo=class e extends Yn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.rows=8,this.hideToolbar=!1,this.indent=2,this.invalid=!1,this.readOnly=!1,this.placeholder=``,this.focused=!1,this.locale=new D(this),this.aria=new P(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-json-field`}static{this.shadowRootOptions={...Yn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[k,S`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,T(hn),T(zn),T(Xn),S`

.toolbar .iconButton{
min-height: 0;
}
.status > svg{
width: 16px;
height: 16px;
}
`]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}formatValue(){Yo(this.value).status===`valid`&&(this.value=Xo(this.value,this.indent))}getFormValue(){return this.value}getValidity(){let e=this.textarea,t=Yo(this.value);return t.status===`invalid`?{flags:{badInput:!0},message:`${this.invalidLabel??this.locale.t(`jsonField.invalid`)}: ${t.error}`,anchor:e}:this.required&&t.status===`empty`?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:e}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),j&&t.has(`indent`)&&(this.indent<0||this.indent>10)&&L(e.tagName,`indent (${this.indent}) is clamped to 0..10.`)}get locked(){return this.isDisabled||this.readOnly}formatNow(){if(this.locked||Yo(this.value).status!==`valid`)return;let e=Xo(this.value,this.indent);e!==this.value&&(this.dirty=!0,this.value=e,this.emit(`minerva-input`,{value:e}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleInput(){this.locked||(this.dirty=!0,this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value}))}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){let e=!this.focused&&Yo(this.value).status===`invalid`;return{disabled:this.isDisabled,invalid:e||this.invalid,readonly:this.readOnly,required:this.required}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.focused?{status:`empty`}:Yo(this.value),r=n.status===`invalid`,i=r||this.invalid,a=this.locked||!this.value.trim(),o=n.status===`valid`?this.validLabel??e(`jsonField.valid`):n.status===`invalid`?`${this.invalidLabel??e(`jsonField.invalid`)}: ${n.error}`:``,s=[this.aria.description,r?o:void 0].filter(Boolean).join(` `);return h`<div class="root" part="root">
      ${this.hideToolbar?m:h`<div class="toolbar" part="toolbar">
              <button
                part="format-button"
                type="button"
                class=${b({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:a})}
                ?disabled=${a}
                tabindex=${a?`-1`:`0`}
                aria-label=${this.formatLabel??e(`jsonField.format`)}
                @click=${this.formatNow}
              >
                ${br}
              </button>
            </div>`}
      <textarea
        part="input"
        class=${b({textarea:!0,outline:!0,medium:!0,invalid:i})}
        style="resize: none"
        rows=${this.rows}
        spellcheck="false"
        .value=${St(this.value)}
        name=${this.name||m}
        placeholder=${this.placeholder||m}
        ?disabled=${t}
        ?readonly=${this.readOnly}
        ?required=${this.required}
        aria-label=${this.aria.label??m}
        aria-description=${s||m}
        aria-invalid=${i?`true`:m}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @focus=${()=>this.focused=!0}
        @blur=${()=>this.focused=!1}
      ></textarea>
      <div
        part="status"
        role="status"
        aria-live="polite"
        class=${b({status:!0,statusInvalid:r})}
      >
        ${n.status===`valid`?h`${Dr}<span>${o}</span>`:n.status===`invalid`?h`${Un}<span>${o}</span>`:m}
      </div>
    </div>`}},R([v({attribute:!1})],Zo.prototype,`value`,void 0),R([v({attribute:`value`})],Zo.prototype,`defaultValue`,void 0),R([v({type:Number})],Zo.prototype,`rows`,void 0),R([v({type:Boolean,attribute:`hide-toolbar`})],Zo.prototype,`hideToolbar`,void 0),R([v({type:Number})],Zo.prototype,`indent`,void 0),R([v({type:Boolean,reflect:!0})],Zo.prototype,`invalid`,void 0),R([v({type:Boolean,reflect:!0,attribute:`readonly`})],Zo.prototype,`readOnly`,void 0),R([v()],Zo.prototype,`placeholder`,void 0),R([v({attribute:`format-label`})],Zo.prototype,`formatLabel`,void 0),R([v({attribute:`valid-label`})],Zo.prototype,`validLabel`,void 0),R([v({attribute:`invalid-label`})],Zo.prototype,`invalidLabel`,void 0),R([p()],Zo.prototype,`focused`,void 0),R([y(`textarea`)],Zo.prototype,`textarea`,void 0)})))()}function $o(e){if(!e)return[];try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>e&&typeof e==`object`).map(e=>({id:typeof e.id==`string`?e.id:``,key:String(e.key??``),value:String(e.value??``)}));if(t&&typeof t==`object`)return Object.entries(t).map(([e,t])=>({id:``,key:e,value:typeof t==`string`?t:JSON.stringify(t)}))}catch{}return[]}var es,ts;function ns(){return(ns=e((()=>{N(),F(),dr(),E(),on(),I(),A(),Fr(),gn(),fa(),No(),di(),bi(),d(),f(),Dt(),es=0,ts=class e extends Yn{constructor(...e){super(...e),this.value=[],this.defaultValue=[],this.editorId=`kv-${es++}`,this.nextId=0,this.dirty=!1,this.pendingFocus=null,this.locale=new D(this),this.aria=new P(this,()=>this.labels)}static{this.tagName=`minerva-key-value-editor`}static{this.dependencies=[da,Mo,xi]}static{this.styles=[k,S`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,T(zn),T(pn),S`

.key{
--textarea-min-height: var(
--key-value-editor-control-height,
var(--control-height-sm)
);
}
`]}focus(e){(this.renderRoot.querySelector(`minerva-textarea`)??this.renderRoot.querySelector(`minerva-button`))?.focus(e)}getFormValue(){return JSON.stringify(this.value.map(({key:e,value:t})=>({key:e,value:t})))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.renderRoot.querySelector(`minerva-button`)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=$o(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)&&(this.value.some(e=>!e.id)&&(this.value=this.value.map(e=>e.id?e:{...e,id:this.newId()})),j)){let t=this.value.map(e=>e.id);new Set(t).size!==t.length&&L(e.tagName,`entries have duplicate ids: rows are tracked by id, make them unique.`)}}updated(e){super.updated(e);let t=this.pendingFocus;if(!t)return;this.pendingFocus=null;let n=e=>this.value.some(t=>t.id===e),r=e=>Array.from(this.renderRoot.querySelectorAll(`[data-entry-id]`)).find(t=>e!==void 0&&t.dataset.entryId===e)??null;if(t.kind===`add`){let e=n(t.id)?r(t.id)?.querySelector(`.key`):null;e&&e.updateComplete.then(()=>e.focus())}else n(t.id)||(r(t.nextId)?.querySelector(`.remove`)??this.renderRoot.querySelector(`minerva-button`))?.focus()}newId(){let e;do e=`${this.editorId}-${this.nextId++}`;while(this.value.some(t=>t.id===e));return e}commit(e){this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e})}add(){if(this.isDisabled)return;let e=this.newId();this.pendingFocus={kind:`add`,id:e},this.commit([...this.value,{id:e,key:``,value:``}])}removeEntry(e){if(this.isDisabled)return;let t=this.value.findIndex(t=>t.id===e),n=this.value[t+1]??this.value[t-1];this.pendingFocus={kind:`remove`,id:e,nextId:n?.id},this.commit(this.value.filter(t=>t.id!==e))}handleInput(e,t,n){if(e.stopPropagation(),this.isDisabled)return;let r=e.target.value;this.dirty=!0,this.value=this.value.map(e=>e.id===t?{...e,[n]:r}:e),this.emit(`minerva-input`,{value:this.value})}handleFieldChange(e){e.stopPropagation(),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}isRowInvalid(e){let t=this.errors?.[e.id];return!!(t?.key||t?.value)}renderField(e,t,n,r){let i=this.errors?.[e.id]?.[n];return h`<minerva-form-control
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
</minerva-form-control>`}hookStates(){return{disabled:this.isDisabled}}render(){let{t:e}=this.locale,t=this.keyLabel??e(`keyValueEditor.key`),n=this.valueLabel??e(`keyValueEditor.value`),r=this.removeLabel??e(`keyValueEditor.remove`),i=this.isDisabled,a=this.aria.label;return h`<div
class="root"
part="root"
role=${a?`group`:m}
aria-label=${a??m}
aria-description=${this.aria.description??m}
>
${bt(this.value,e=>e.id,(e,a)=>h`<div
class="row"
part=${Nr(`row`,{invalid:this.isRowInvalid(e)})}
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
${Sr}
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
<span slot="start">${oi}</span>
<span>${this.addLabel??e(`keyValueEditor.add`)}</span>
</minerva-button>
</div>`}},R([v({attribute:!1})],ts.prototype,`value`,void 0),R([v({attribute:`value`,converter:{fromAttribute:e=>$o(e)}})],ts.prototype,`defaultValue`,void 0),R([v({attribute:`key-label`})],ts.prototype,`keyLabel`,void 0),R([v({attribute:`value-label`})],ts.prototype,`valueLabel`,void 0),R([v({attribute:`add-label`})],ts.prototype,`addLabel`,void 0),R([v({attribute:`remove-label`})],ts.prototype,`removeLabel`,void 0),R([v({attribute:!1})],ts.prototype,`errors`,void 0)})))()}var rs,is;function as(){return(as=e((()=>{N(),F(),Pn(),I(),w(),A(),Jn(),d(),f(),_(),rs=class e extends C{constructor(...e){super(...e),this.density=`default`,this.bordered=!1,this.noDividers=!1,this.internals=Ln(this)}static{this.tagName=`minerva-list`}static{this.styles=[k,S`
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
`,T(pi)]}connectedCallback(){super.connectedCallback(),Sn(this,this.internals,{role:`list`})}updated(){if(j){let t=Array.from(this.children).find(e=>e.localName!==is.tagName);t&&L(e.tagName,`children should be <minerva-list-item> elements (found <${t.localName}>): other elements break the list semantics.`)}}render(){return h`<div
part="root"
class=${b({list:!0,compact:this.density===`compact`,comfortable:this.density===`comfortable`,bordered:this.bordered,dividers:!this.noDividers})}
>
<slot @slotchange=${()=>this.requestUpdate()}></slot>
</div>`}},R([v({reflect:!0})],rs.prototype,`density`,void 0),R([v({type:Boolean,reflect:!0})],rs.prototype,`bordered`,void 0),R([v({type:Boolean,reflect:!0,attribute:`no-dividers`})],rs.prototype,`noDividers`,void 0),is=class extends C{constructor(...e){super(...e),this.primary=``,this.secondary=``,this.internals=Ln(this),this.slots=new M(this)}static{this.tagName=`minerva-list-item`}static{this.styles=[k,T(pi),S`
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
`]}connectedCallback(){super.connectedCallback(),Sn(this,this.internals,{role:`listitem`})}render(){let e=this.secondary!==``||this.slots.test(`secondary`);return h`<div part="root" class="item">
${this.slots.test(`icon`)?h`<div part="icon" class="icon" aria-hidden="true">
<slot name="icon"></slot>
</div>`:m}
<div class="content">
<div part="label" class="primary"><slot>${this.primary}</slot></div>
${e?h`<div part="description" class="secondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:m}
</div>
${this.slots.test(`actions`)?h`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:m}
</div>`}},R([v()],is.prototype,`primary`,void 0),R([v()],is.prototype,`secondary`,void 0)})))()}var os,ss;function cs(){return(cs=e((()=>{F(),E(),I(),A(),ci(),yi(),d(),f(),_(),os=[`small`,`medium`,`large`],ss=class e extends C{constructor(...e){super(...e),this.size=`medium`,this.locale=new D(this)}static{this.tagName=`minerva-loading-state`}static{this.dependencies=[Ni]}static{this.styles=[k,S`
:host{
display: block;
}
`,T(cr)]}hookStates(){return{size:this.size}}updated(){j&&!os.includes(this.size)&&L(e.tagName,`unknown size "${this.size}" (expected ${os.join(`, `)}).`)}render(){return h`<div
part="root"
class=${b({loadingState:!0,[this.size]:!0})}
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
</div>`}},R([v()],ss.prototype,`label`,void 0),R([v({reflect:!0})],ss.prototype,`size`,void 0)})))()}function ls(e){let t=Array.from(e.childNodes).filter(e=>!bs(e)&&(e.nodeType!==1||e.getAttribute(`slot`)!==`icon`));return t.every(e=>e.nodeType===3)?t.map(e=>e.textContent??``).join(``).trim():t.map(e=>e.cloneNode(!0))}function us(e){return{value:Cs(e,`value`)??Ss(e),label:ls(e),textValue:Cs(e,`text-value`),shortcut:Cs(e,`shortcut`),disabled:ws(e,`disabled`),closeOnSelect:ws(e,`close-on-select`),element:e}}function ds(e,t=`e`){let n=[],r=null;return Array.from(e.children).forEach((e,i)=>{let a=`${t}-${i}`;switch(e.localName!==hs.tagName&&(r=null),e.localName){case ps.tagName:{let t=ds(e,a),r=e.querySelector(`:scope > [slot='icon']`);n.push({key:Cs(e,`value`)||Ss(e),label:ls(e),textValue:Cs(e,`text-value`),icon:r?r.cloneNode(!0):void 0,shortcut:Cs(e,`shortcut`),disabled:ws(e,`disabled`),closeOnSelect:!ws(e,`keep-open`)&&void 0,children:t.length?t:void 0,element:e});break}case ms.tagName:n.push({type:`checkbox`,key:Cs(e,`value`)||Ss(e),label:ls(e),textValue:Cs(e,`text-value`),shortcut:Cs(e,`shortcut`),disabled:ws(e,`disabled`),checked:ws(e,`checked`),closeOnSelect:ws(e,`close-on-select`),element:e});break;case hs.tagName:{r||(r={type:`radio-group`,key:a,items:[]},n.push(r));let t=us(e);r.items.push(t),ws(e,`checked`)&&(r.value=t.value);break}case _s.tagName:n.push({type:`separator`,key:a});break;case vs.tagName:n.push({type:`label`,key:a,label:ls(e)});break;case gs.tagName:{let t=Array.from(e.children),r=Cs(e,`label`);if(t.length>0&&t.every(e=>e.localName===hs.tagName)){let i=t.map(us);n.push({type:`radio-group`,key:a,label:r,items:i,value:i.find(e=>e.element?.hasAttribute(`checked`))?.value,closeOnSelect:ws(e,`close-on-select`),element:e})}else n.push({type:`group`,key:a,label:r??``,items:ds(e,a)});break}}}),n}var fs,ps,ms,hs,gs,_s,vs,ys,bs,xs,Ss,Cs,ws;function Ts(){return(Ts=e((()=>{I(),d(),f(),fs=S`
:host{
display: none !important;
}
`,ps=class extends C{constructor(...e){super(...e),this.value=``,this.disabled=!1,this.shortcut=``,this.textValue=``,this.keepOpen=!1}static{this.tagName=`minerva-menu-item`}static{this.styles=fs}},R([v({reflect:!0})],ps.prototype,`value`,void 0),R([v({type:Boolean,reflect:!0})],ps.prototype,`disabled`,void 0),R([v()],ps.prototype,`shortcut`,void 0),R([v({attribute:`text-value`})],ps.prototype,`textValue`,void 0),R([v({type:Boolean,attribute:`keep-open`})],ps.prototype,`keepOpen`,void 0),ms=class extends C{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-checkbox-item`}static{this.styles=fs}},R([v({reflect:!0})],ms.prototype,`value`,void 0),R([v({type:Boolean,reflect:!0})],ms.prototype,`checked`,void 0),R([v({type:Boolean,reflect:!0})],ms.prototype,`disabled`,void 0),R([v()],ms.prototype,`shortcut`,void 0),R([v({attribute:`text-value`})],ms.prototype,`textValue`,void 0),R([v({type:Boolean,attribute:`close-on-select`})],ms.prototype,`closeOnSelect`,void 0),hs=class extends C{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-radio-item`}static{this.styles=fs}},R([v({reflect:!0})],hs.prototype,`value`,void 0),R([v({type:Boolean,reflect:!0})],hs.prototype,`checked`,void 0),R([v({type:Boolean,reflect:!0})],hs.prototype,`disabled`,void 0),R([v()],hs.prototype,`shortcut`,void 0),R([v({attribute:`text-value`})],hs.prototype,`textValue`,void 0),R([v({type:Boolean,attribute:`close-on-select`})],hs.prototype,`closeOnSelect`,void 0),gs=class extends C{constructor(...e){super(...e),this.label=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-group`}static{this.styles=fs}},R([v()],gs.prototype,`label`,void 0),R([v({type:Boolean,attribute:`close-on-select`})],gs.prototype,`closeOnSelect`,void 0),_s=class extends C{static{this.tagName=`minerva-menu-separator`}static{this.styles=fs}},vs=class extends C{static{this.tagName=`minerva-menu-label`}static{this.styles=fs}},ys=[ps.tagName,ms.tagName,hs.tagName,gs.tagName,_s.tagName,vs.tagName],bs=e=>e.nodeType===1&&ys.includes(e.localName),xs=e=>!!(e.nodeType===1?e:e.parentElement)?.closest(ys.join(`,`)),Ss=e=>Array.from(e.childNodes).filter(e=>!bs(e)).map(e=>e.textContent??``).join(``).trim(),Cs=(e,t)=>e.getAttribute(t)??void 0,ws=(e,t)=>e.hasAttribute(t)})))()}var Es,Ds,Os,ks,As,js,Ms,Ns,Ps,Fs,Is,Ls;function Rs(){return(Rs=e((()=>{F(),dr(),gi(),on(),I(),A(),Mi(),wi(),Oi(),Fi(),Di(),Tr(),Ts(),d(),f(),_(),he(),Je(),Dt(),Es=100,Ds=`[data-minerva-menu-item]`,Os={mainAxis:4,crossAxis:-5},ks=e=>e.hasAttribute(`data-disabled`),As=e=>e.dataset.textValue??e.querySelector(`.text`)?.textContent??e.textContent??``,js=e=>e?Array.from(e.querySelectorAll(Ds)):[],Ms=e=>Ie(e,{preventScroll:!0}),Ns=e=>typeof e==`string`?e:void 0,Ps=e=>e.join(`/`),Fs=0,Is=class{constructor(e,t,n){this.grace=be(),this.typeahead=Oe(),this.lastTypeahead=0,this.element=null,this.uid=null,this.path=[],this.position=new Ei(e,()=>n===0?{placement:t.rootPlacement(),offset:t.rootOffset(),padding:8}:{placement:t.direction===`rtl`?`left-start`:`right-start`,offset:Os,padding:8}),this.layer=new ki(e,()=>n===0?t.rootLayerOptions():t.subLayerOptions(n)),this.scope=new Li(e,()=>({trapped:n===0&&t.isModal,autoFocus:!1,restoreFocus:!1}))}clearTimer(){clearTimeout(this.openTimer),this.openTimer=void 0}},Ls=class extends C{constructor(...e){super(...e),this.items=[],this.open=!1,this.size=`medium`,this.keepOpen=!1,this.disabled=!1,this.nonModal=!1,this.noLoop=!1,this.declarative=[],this.openPath=[],this.exiting=[],this.stored=new Map,this.levels=[],this.modalController=new Si(this),this.observer=null,this.intent=`content`,this.subIntent=`none`,this.restoreOverride=void 0,this.reason=`outside`,this.direction=`ltr`,this.onPanelKeyDown=e=>{let t=e.currentTarget,n=this.panelDepth(t),r=this.levels[n],{key:i}=e;if(i===`Tab`){e.preventDefault(),this.closeWithTab(e.shiftKey);return}if(e.defaultPrevented||!r||e.altKey||e.ctrlKey||e.metaKey)return;let a=js(t),o=e.composedPath()[0],s=a.find(e=>e===o)??null,c=s?a.indexOf(s):-1,l=this.direction===`rtl`,u=l?`ArrowLeft`:`ArrowRight`,ee=l?`ArrowRight`:`ArrowLeft`;if([`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(i)){e.preventDefault(),r.typeahead.reset();let t=rt({currentIndex:c,count:a.length,key:i,orientation:`vertical`,loop:!this.noLoop,isDisabled:e=>ks(a[e])});t!==null&&Ms(a[t]);return}if(i===u&&s?.hasAttribute(`aria-haspopup`)){e.preventDefault(),ks(s)||this.openSubmenu(n,s.dataset.uid??``,`first`);return}if(i===ee&&n>0){e.preventDefault(),Ms(this.parentItem(n)),this.closeSubmenu(n);return}if(i.length===1){let t=Date.now();t-r.lastTypeahead>500&&r.typeahead.reset();let n=r.typeahead.getBuffer()!==``;if(i!==` `||n){r.lastTypeahead=t,e.preventDefault();let n=r.typeahead.search(i,a.map(e=>({text:As(e),disabled:ks(e)})),c);n!==-1&&Ms(a[n]);return}}(i===`Enter`||i===` `)&&s&&(e.preventDefault(),ks(s)||this.activateItem(s,`first`))},this.itemActions=new Map,this.highlightedItem=null,this.onPanelFocusIn=e=>{let t=e.composedPath()[0];t.matches?.(Ds)&&this.highlightItem(t,!0)},this.onPanelFocusOut=e=>{let t=e.composedPath()[0];t.matches?.(Ds)&&this.highlightItem(t,!1)}}static{this.styles=[k,Ci,S`
:host{
display: contents;
}
`,T(Or)]}onRootPointerDownOutside(e){}get isModal(){return!this.nonModal}get entries(){return this.items.length?this.items:this.declarative}show(){this.open=!0}hide(){this.open=!1}requestOpenChange(e,t){if(e===this.open)return!0;let n=this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0});return n&&(this.open=e,e||this.closeLevels()),n}openWith(e,t){this.intent=e,this.requestOpenChange(!0,t)}closeAll(e){this.requestOpenChange(!1,e)}closeWithTab(e){let t=this.restoreTarget(),n;if(t){let r=st().find(e=>e.element===this.levels[0]?.element)?.parent??document.body,i=Ke(r).filter(e=>e===t||!qe(this,e)||!this.isPanelNode(e)),a=i.indexOf(t);n=a===-1?t:i[e?a-1:a+1]??t}this.restoreOverride=n??void 0,this.requestOpenChange(!1,`tab`)&&Ms(n)}isPanelNode(e){return this.levels.some(t=>qe(t.element,e))}level(e){return this.levels[e]??=new Is(this,this,e),this.levels[e]}parentItem(e){let t=this.openPath[e-1];return t?this.renderRoot.querySelector(`[data-uid="${t}"]`)??null:null}rootLayerOptions(){return{disableOutsidePointerEvents:this.isModal,branches:()=>this.branches(),onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:e=>{this.reason=`outside`,this.onRootPointerDownOutside(e),!e.defaultPrevented&&(!this.isModal||e.button===2)&&(this.restoreOverride=null)},onFocusOutside:e=>(this.reason=`focus-outside`,!this.isModal||(e.preventDefault(),!1)),onDismiss:()=>this.closeAll(this.reason)}}subLayerOptions(e){return{parent:this.levels[e-1]?.element??void 0,branches:()=>[this.parentItem(e)],onEscapeKeyDown:()=>{Ms(this.parentItem(e))},onDismiss:()=>this.closeSubmenu(e)}}closeLevels(e=0,t=!0){for(let n=this.levels.length-1;n>=e;n--){let e=this.levels[n],r=e.element;r&&(e.clearTimer(),e.grace.clear(),e.typeahead.reset(),e.scope.deactivate(),e.layer.deactivate(),e.position.end(),t&&this.isConnected?this.exit(r,n,e.path):O(r),e.element=null,e.uid=null,n===0&&(this.modalController.deactivate(),this.scheduleRestore()))}}exit(e,t,n){if(e.setAttribute(`data-state`,`closed`),te(e)<=0){O(e);return}let r=++Fs,i=Ps(n);this.exiting=[...this.exiting.filter(e=>Ps(e.path)!==i),{id:r,depth:t,path:n}],re(e).then(()=>{this.exiting.some(e=>e.id===r)&&(O(e),this.exiting=this.exiting.filter(e=>e.id!==r))})}clearExiting(){if(this.exiting.length!==0){for(let e of this.exiting)O(this.renderRoot.querySelector(`[data-panel-key="${Ps(e.path)}"]`));this.exiting=[]}}scheduleRestore(){let e=this.restoreOverride;this.restoreOverride=void 0;let t=e===void 0?this.restoreTarget():e;t&&setTimeout(()=>{if(this.open||!t.isConnected)return;let e=Se(document);(!e||e===document.body||!e.isConnected||(this.shadowRoot?.contains(e)??!1))&&Ms(t)},0)}syncLevels(){let e=this.open&&!this.disabled?this.openPath.length+1:0;this.closeLevels(e);for(let t=0;t<e;t++){let e=t===0?``:this.openPath[t-1],n=this.renderRoot.querySelector(`[data-panel-key="${Ps(this.openPath.slice(0,t))}"]`);if(!n)return;let r=this.level(t);if(r.element===n&&r.uid===e)continue;r.element&&this.closeLevels(t);let i=t===0?this.anchorElement():this.parentItem(t);if(!i)return;r.element=n,r.uid=e,r.path=this.openPath.slice(0,t),n.setAttribute(`data-state`,`open`),Gn(n),r.position.start(i,n),t===0&&this.isModal&&this.modalController.activate(this),r.layer.activate(n),r.scope.activate(n);let a=t===0?this.intent:this.subIntent;t===0?this.intent=`content`:this.subIntent=`none`,this.focusIntent(n,a)}}focusIntent(e,t){if(t===`none`)return;let n=js(e).filter(e=>!ks(e));Ms((t===`first`?n[0]:t===`last`?n[n.length-1]:void 0)??e)}reanchor(){let e=this.levels[0],t=this.anchorElement();e?.element&&t&&e.position.start(t,e.element)}openSubmenu(e,t,n){if(this.openPath[e]===t&&this.levels[e+1]?.element){n===`first`&&Ms(js(this.levels[e+1].element).find(e=>!ks(e)));return}this.subIntent=n,this.openPath=[...this.openPath.slice(0,e),t]}closeSubmenu(e){this.openPath.length<e||(this.closeLevels(e),this.openPath=this.openPath.slice(0,e-1))}stateOf(e,t){return this.stored.has(e)?this.stored.get(e):t}isChecked(e){return e.element?e.element.hasAttribute(`checked`):this.stateOf(e.key,e.checked??e.defaultChecked??!1)}radioValue(e){return e.items.some(e=>e.element)?e.items.find(e=>e.element?.hasAttribute(`checked`))?.value:this.stateOf(e.key,e.value??e.defaultValue)}activateAction(e){this.emit(`minerva-select`,{value:e.key,item:e},{cancelable:!0})&&(e.closeOnSelect??!this.keepOpen)&&this.closeAll(`select`)}toggleCheckbox(e){let t=!this.isChecked(e);this.emit(`minerva-change`,{value:e.key,checked:t,item:e},{cancelable:!0})&&(e.element?e.element.toggleAttribute(`checked`,t):this.stored.set(e.key,t),this.requestUpdate()),e.closeOnSelect&&this.closeAll(`select`)}chooseRadio(e,t){let n=this.radioValue(e);if(t.value!==n&&this.emit(`minerva-change`,{value:t.value,group:e.key,item:t},{cancelable:!0})){if(t.element)for(let n of e.items)n.element?.toggleAttribute(`checked`,n===t);else this.stored.set(e.key,t.value);this.requestUpdate()}(e.closeOnSelect||t.closeOnSelect)&&this.closeAll(`select`)}panelDepth(e){return Number(e.dataset.level??0)}activateItem(e,t){this.itemActions.get(e.dataset.uid??``)?.(t)}highlightItem(e,t){t?this.highlightedItem=e.dataset.uid??null:this.highlightedItem===e.dataset.uid&&(this.highlightedItem=null),e.toggleAttribute(`data-highlighted`,t),e.setAttribute(`part`,Nr(`item`,{state:e.dataset.state,highlighted:t,disabled:e.hasAttribute(`data-disabled`),expanded:e.hasAttribute(`data-expanded`)}))}onItemClick(e){let t=e.currentTarget;ks(t)||this.activateItem(t,`none`)}onItemPointerMove(e){let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i||e.pointerType===`touch`||i.grace.isInGraceArea({x:e.clientX,y:e.clientY}))return;i.grace.clear();let a=Se(document);if(ks(t)){a!==n&&Ms(n);return}a!==t&&Ms(t);let o=t.dataset.uid??``;t.hasAttribute(`aria-haspopup`)&&this.openPath[r]!==o&&i.openTimer===void 0&&(i.openTimer=setTimeout(()=>{i.openTimer=void 0,this.open&&this.openSubmenu(r,o,`none`)},100))}onItemPointerLeave(e){if(e.pointerType===`touch`)return;let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i)return;i.clearTimer();let a=this.levels[r+1]?.element;if(t.hasAttribute(`aria-haspopup`)&&this.openPath[r]===t.dataset.uid&&a){let t=a.getAttribute(`data-side`)??`right`;i.grace.start({x:e.clientX,y:e.clientY},a.getBoundingClientRect(),t);return}i.grace.isInGraceArea({x:e.clientX,y:e.clientY})||Se(document)===t&&Ms(n)}readEntries(){this.declarative=ds(this)}connectedCallback(){super.connectedCallback(),this.readEntries(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(e=>{e.some(e=>xs(e.target)||Array.from(e.addedNodes).some(xs)||Array.from(e.removedNodes).some(e=>e.nodeType===1&&e.localName.startsWith(`minerva-menu-`)))&&this.readEntries()}),this.observer.observe(this,{subtree:!0,childList:!0,attributes:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.closeLevels(0,!1),this.clearExiting()}willUpdate(e){if(e.has(`items`)&&(this.stored=new Map,j&&this.checkKeys(this.items)),e.has(`open`)&&this.open){let e=this.anchorElement(),t=e&&`nodeType`in e?e:this;this.direction=this.isConnected?Ze(t):`ltr`}e.has(`open`)&&!this.open&&(this.openPath=[]);let t=this.open&&!this.disabled?this.openPath.length+1:0,n=this.levels.findIndex((e,n)=>e.element!==null&&(n>=t||Ps(e.path)!==Ps(this.openPath.slice(0,n))));if(n!==-1&&this.closeLevels(n),this.exiting.length){let e=this.openKeys();this.exiting.some(t=>e.has(Ps(t.path)))&&(this.exiting=this.exiting.filter(t=>!e.has(Ps(t.path))))}}openKeys(){return!this.open||this.disabled?new Set:new Set([[],...this.openPath.map((e,t)=>this.openPath.slice(0,t+1))].map(Ps))}checkKeys(e,t=new Set){for(let n of e)if(!(`type`in n&&n.type===`separator`)){if(`type`in n&&(n.type===`group`||n.type===`label`)){n.type===`group`&&this.checkKeys(n.items,t);continue}t.has(n.key)&&L(this.constructor.tagName,`duplicate item key "${n.key}": keys must be unique (checkbox / radio state and minerva-select values are keyed by it).`),t.add(n.key),!(`type`in n)&&n.children&&this.checkKeys(n.children,t)}}hookStates(){let e=this.levels[0]?.position.running?this.levels[0].position.placement:this.rootPlacement();return{state:this.open&&!this.disabled?`open`:`closed`,disabled:this.disabled,size:this.size,...oe(e),placement:e}}updated(e){this.syncTrigger(),(e.has(`open`)||e.has(`openPath`)||e.has(`disabled`))&&this.syncLevels()}renderPanels(){let e=this.open&&!this.disabled;if(!e&&this.exiting.length===0)return m;this.itemActions.clear();let t=[];e&&(t.push({key:``,depth:0,path:[],state:`open`}),this.openPath.forEach((e,n)=>{let r=this.openPath.slice(0,n+1);t.push({key:Ps(r),depth:n+1,path:r,state:`open`})}));let n=new Set(t.map(e=>e.key));for(let e of this.exiting){let r=Ps(e.path);n.has(r)||(n.add(r),t.push({key:r,depth:e.depth,path:e.path,state:`closed`}))}return bt(t,e=>e.key,e=>this.renderPanelAt(e.depth,e.path,e.state))}renderPanelAt(e,t,n){let r=this.entries,i=e===0?this.rootLabel():void 0;for(let[e,n]of t.entries()){let t=this.findSubmenu(r,n,`${e}:`);if(!t)return m;r=t.children??[],i=Ns(t.label)??t.textValue}return this.renderPanel(e,t.at(-1)??``,r,i,n,Ps(t))}findSubmenu(e,t,n){for(let[r,i]of e.entries()){let e=`${n}${r}`;if(`type`in i){if(i.type===`group`){let n=this.findSubmenu(i.items,t,`${e}.`);if(n)return n}continue}if(i.children?.length&&e===t)return i}return null}renderPanel(e,t,n,r,i,a){let o=e===0?``:`item-${t}`;return h`<div
part="content"
id=${e===0?`menu`:`menu-${t}`}
class=${b({content:!0,small:this.size===`small`})}
popover="manual"
role="menu"
aria-orientation="vertical"
aria-label=${e===0?r??m:m}
aria-labelledby=${e>0?o:m}
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
</div>`}renderEntries(e,t,n){return e.map((e,r)=>{let i=`${n}${r}`;if(`type`in e)switch(e.type){case`separator`:return h`<div
role="separator"
aria-orientation="horizontal"
class="separator"
part="separator"
></div>`;case`label`:return h`<div class="label" part="label">${e.label}</div>`;case`group`:{let n=`label-${i.replace(/[:.]/g,`-`)}`;return h`<div
role="group"
part="group"
aria-labelledby=${n}
>
<div id=${n} class="label" part="label">${e.label}</div>
${this.renderEntries(e.items,t,`${i}.`)}
</div>`}case`checkbox`:return this.renderCheckbox(e,i);case`radio-group`:return this.renderRadioGroup(e,i)}return this.renderAction(e,t,i)})}renderItem(e){let{uid:t,disabled:n=!1,submenu:r}=e;this.itemActions.set(t,e.activate);let i=e.textValue??Ns(e.label),a={state:e.checked===void 0?void 0:e.checked?`checked`:`unchecked`,highlighted:this.highlightedItem===t,disabled:n,expanded:r?.open};return h`<div
id=${`item-${t}`}
part=${Nr(`item`,a)}
role=${e.role}
tabindex="-1"
class="item"
data-minerva-menu-item=""
data-uid=${t}
data-text-value=${i??m}
data-state=${a.state??m}
?data-highlighted=${a.highlighted}
?data-disabled=${n}
?data-expanded=${r?.open}
aria-disabled=${n?`true`:m}
aria-checked=${e.checked===void 0?m:String(e.checked)}
aria-haspopup=${r?`menu`:m}
aria-expanded=${r?String(r.open):m}
aria-controls=${r?.open?`menu-${t}`:m}
@click=${this.onItemClick}
@pointermove=${this.onItemPointerMove}
@pointerleave=${this.onItemPointerLeave}
>
${e.indicator??m}
${e.icon?h`<span class="icon" part="icon" aria-hidden="true"
>${e.icon}</span
>`:m}
<span class="text" part="item-label">${e.label}</span>
${e.shortcut?h`<span class="shortcut" part="shortcut">${e.shortcut}</span>`:m}
${e.trailing??m}
</div>`}renderAction(e,t,n){if(e.children?.length){let r=this.openPath[t]===n&&!e.disabled;return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,submenu:{open:r},trailing:h`<span class="chevron" aria-hidden="true"
>${Ur}</span
>`,activate:e=>this.openSubmenu(t,n,e)})}return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,activate:()=>this.activateAction(e)})}renderCheckbox(e,t){let n=this.isChecked(e);return this.renderItem({uid:t,role:`menuitemcheckbox`,label:e.label,textValue:e.textValue,shortcut:e.shortcut,disabled:e.disabled,checked:n,indicator:h`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${n?Ar:m}</span
>`,activate:()=>this.toggleCheckbox(e)})}renderRadioGroup(e,t){let n=this.radioValue(e),r=`label-${t.replace(/[:.]/g,`-`)}`,i=e.label!=null&&e.label!==``;return h`<div
role="group"
part="group"
aria-labelledby=${i?r:m}
>
${i?h`<div id=${r} class="label" part="label">${e.label}</div>`:m}
${e.items.map((r,i)=>{let a=r.value===n;return this.renderItem({uid:`${t}.${i}`,role:`menuitemradio`,label:r.label,textValue:r.textValue,shortcut:r.shortcut,disabled:r.disabled,checked:a,indicator:h`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${a?h`<span class="dot"></span>`:m}</span
>`,activate:()=>this.chooseRadio(e,r)})})}
</div>`}},R([v({attribute:!1})],Ls.prototype,`items`,void 0),R([v({type:Boolean,reflect:!0})],Ls.prototype,`open`,void 0),R([v({reflect:!0})],Ls.prototype,`size`,void 0),R([v({type:Boolean,attribute:`keep-open`})],Ls.prototype,`keepOpen`,void 0),R([v({type:Boolean,reflect:!0})],Ls.prototype,`disabled`,void 0),R([v({type:Boolean,reflect:!0,attribute:`non-modal`})],Ls.prototype,`nonModal`,void 0),R([v({type:Boolean,attribute:`no-loop`})],Ls.prototype,`noLoop`,void 0),R([p()],Ls.prototype,`declarative`,void 0),R([p()],Ls.prototype,`openPath`,void 0),R([p()],Ls.prototype,`exiting`,void 0)})))()}function zs(e,t,n){n===null?e.hasAttribute(t)&&e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}var Bs,Vs;function Hs(){return(Hs=e((()=>{F(),Ts(),Rs(),d(),f(),he(),Bs={mainAxis:6,crossAxis:0},Vs=class e extends Ls{constructor(...e){super(...e),this.side=`bottom`,this.align=`end`,this.disabledTrigger=null,this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.fromTrigger(e)))switch(e.key){case`Enter`:case` `:e.preventDefault(),this.open?this.requestOpenChange(!1,`trigger`):this.openWith(`first`,`keyboard`);break;case`ArrowDown`:e.preventDefault(),this.openWith(`first`,`keyboard`);break;case`ArrowUp`:e.preventDefault(),this.openWith(`last`,`keyboard`)}},this.handleClick=e=>{this.disabled||e.defaultPrevented||!this.fromTrigger(e)||(this.open?this.requestOpenChange(!1,`trigger`):this.openWith(e.detail===0?`first`:`content`,`trigger`))}}static{this.tagName=`minerva-menu`}static{this.dependencies=[ps,ms,hs,gs,_s,vs]}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorElement(){return this.triggerElement()}rootPlacement(){return ve(this.side,this.align)}rootOffset(){return Bs}restoreTarget(){return this.triggerElement()}branches(){return[this.triggerElement()]}rootLabel(){let e=this.getAttribute(`aria-label`);if(e)return e;let t=this.triggerElement();return t?.getAttribute(`aria-label`)??(t?.textContent?.trim()||void 0)}syncTrigger(){let e=this.triggerElement();e&&(zs(e,`aria-haspopup`,`menu`),zs(e,`aria-expanded`,String(this.open)),zs(e,`data-state`,this.open?`open`:`closed`),zs(e,`data-disabled`,this.disabled?``:null),this.disabled&&!e.hasAttribute(`disabled`)?(e.setAttribute(`disabled`,``),this.disabledTrigger=e):!this.disabled&&this.disabledTrigger===e&&(e.removeAttribute(`disabled`),this.disabledTrigger=null))}fromTrigger(e){let t=this.triggerElement();return!!t&&e.composedPath().includes(t)}connectedCallback(){super.connectedCallback(),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick)}firstUpdated(t){super.firstUpdated(t),j&&!this.triggerElement()&&L(e.tagName,`no slot="trigger" element: nothing opens the menu (add e.g. <button slot="trigger">).`)}render(){return h`<slot name="trigger"></slot>${this.renderPanels()}`}},R([v({reflect:!0})],Vs.prototype,`side`,void 0),R([v({reflect:!0})],Vs.prototype,`align`,void 0)})))()}var Us,Ws,Gs,Ks,qs;function Js(){return(Js=e((()=>{gi(),Ts(),Rs(),Hs(),d(),he(),Us=700,Ws={mainAxis:2,crossAxis:0},Gs={mainAxis:4,crossAxis:0},Ks=(e,t,n)=>({contextElement:n,getBoundingClientRect:()=>({x:e,y:t,left:e,top:t,right:e,bottom:t,width:0,height:0})}),qs=class extends Ls{constructor(...e){super(...e),this.position=null,this.restoreTo=null,this.areaPointerEvents=null,this.handleContextMenu=e=>{this.disabled||e.defaultPrevented||!this.inArea(e)||(e.preventDefault(),this.clearLongPress(),this.openAtPoint(e.clientX,e.clientY))},this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.inArea(e))&&(e.key===`ContextMenu`||e.shiftKey&&e.key===`F10`)){let t=this.area();if(!t)return;e.preventDefault();let n=Ze(t)===`rtl`;this.openAt({anchor:t,placement:n?`bottom-end`:`bottom-start`,offset:Gs})}},this.handlePointerDown=e=>{if(this.disabled||e.pointerType!==`touch`||!this.inArea(e))return;this.clearLongPress();let{clientX:t,clientY:n}=e;this.longPress=setTimeout(()=>{this.longPress=void 0,this.openAtPoint(t,n)},700)},this.handleTouchEnd=e=>{e.pointerType===`touch`&&this.clearLongPress()}}static{this.tagName=`minerva-context-menu`}static{this.dependencies=[ps,ms,hs,gs,_s,vs]}static{this.styles=[...Ls.styles,S`
:host(:not([disabled])) ::slotted(*){
-webkit-touch-callout: none;
}
`]}area(){return Array.from(this.children).find(e=>!ys.includes(e.localName))??null}anchorElement(){return this.position?.anchor??null}rootPlacement(){return this.position?.placement??`right-start`}rootOffset(){return this.position?.offset??Ws}restoreTarget(){return this.restoreTo}branches(){return[]}rootLabel(){return this.getAttribute(`aria-label`)??void 0}onRootPointerDownOutside(e){let t=this.area(),n=e.composedPath()[0];e.button===2&&t&&n instanceof Node&&qe(t,n)&&e.preventDefault()}syncTrigger(){let e=this.area();if(!e)return;zs(e,`data-state`,this.open?`open`:`closed`),zs(e,`data-disabled`,this.disabled?``:null);let t=this.open&&this.isModal&&!this.disabled;t&&this.areaPointerEvents===null?(this.areaPointerEvents=e.style.pointerEvents,e.style.pointerEvents=`auto`):!t&&this.areaPointerEvents!==null&&(e.style.pointerEvents=this.areaPointerEvents,this.areaPointerEvents=null)}openAt(e){let t=this.area();if(t){if(!this.open){let e=Se(document);this.restoreTo=e instanceof HTMLElement&&qe(t,e)?e:t}if(this.position=e,this.open){this.reanchor();return}this.openWith(`first`,`contextmenu`)}}openAtPoint(e,t){let n=this.area();if(!n)return;let r=Ze(n)===`rtl`;this.openAt({anchor:Ks(e,t,n),placement:r?`left-start`:`right-start`,offset:Ws})}inArea(e){let t=this.area(),n=e.composedPath()[0];return!!t&&n instanceof Node&&qe(t,n)}clearLongPress(){clearTimeout(this.longPress),this.longPress=void 0}connectedCallback(){super.connectedCallback(),this.addEventListener(`contextmenu`,this.handleContextMenu),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`pointerdown`,this.handlePointerDown),this.addEventListener(`pointermove`,this.handleTouchEnd),this.addEventListener(`pointerup`,this.handleTouchEnd),this.addEventListener(`pointercancel`,this.handleTouchEnd)}disconnectedCallback(){super.disconnectedCallback(),this.clearLongPress(),this.removeEventListener(`contextmenu`,this.handleContextMenu),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`pointerdown`,this.handlePointerDown),this.removeEventListener(`pointermove`,this.handleTouchEnd),this.removeEventListener(`pointerup`,this.handleTouchEnd),this.removeEventListener(`pointercancel`,this.handleTouchEnd)}render(){return h`<slot></slot>${this.renderPanels()}`}}})))()}var Ys,Xs,Zs;function Qs(){return(Qs=e((()=>{N(),E(),on(),I(),A(),jr(),d(),f(),_(),g(),he(),Je(),Ys={ArrowLeft:`previous`,ArrowRight:`next`,ArrowUp:`up`,ArrowDown:`down`,Home:`first`,End:`last`},Xs=0,Zs=class extends C{constructor(...e){super(...e),this.items=[],this.size=`medium`,this.layout=`wrap`,this.showLegend=!1,this.showSummary=!1,this.disabled=!1,this.focusedKey=``,this.pendingFocus=null,this.baseId=`mn-answer-sheet-${++Xs}`,this.i18n=new D(this),this.aria=new P(this),this.revealed=``}static{this.tagName=`minerva-answer-sheet`}static{this.styles=[k,S`
:host{
display: block;
inline-size: 100%;
min-inline-size: 0;
}
`,T(Qr)]}focus(e){this.renderRoot.querySelector(`[data-key][tabindex="0"]`)?.focus(e)}pills(){return Array.from(this.renderRoot.querySelectorAll(`[data-key]`))}select(e){this.disabled||e.disabled||e.key!==this.value&&(this.value=e.key,this.emit(`minerva-change`,{value:e.key}))}get gridColumns(){return this.layout!==`scroll`&&this.columns&&this.columns>0?Math.floor(this.columns):void 0}handleKeyDown(e,t,n){if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let r=Ys[de(e.key,this)];if(!r)return;e.preventDefault();let i=this.gridColumns,a;if((r===`up`||r===`down`)&&!i){if(this.layout===`scroll`)return;a=lt(this.pills(),e.currentTarget,r===`down`?1:-1)?.dataset.key}else{let e=ft(this.items,this.groups),t=mt(e,n,r,i);t!==null&&(a=e.flatMap(e=>e.entries)[t]?.item.key)}a&&(this.pendingFocus=a,a===this.focusedKey?this.focusPending():this.focusedKey=a)}focusPending(){let e=this.pendingFocus;e&&(this.pendingFocus=null,this.pills().find(t=>t.dataset.key===e)?.focus())}updated(){this.focusPending(),this.revealCurrent()}revealCurrent(){let e=this.layout===`scroll`&&this.value?this.pills().find(e=>e.dataset.key===this.value):void 0,t=e?`${this.value}`:``;t!==this.revealed&&(this.revealed=t,e?.parentElement&&Me(e.parentElement,e))}hookStates(){return{disabled:this.disabled,size:this.size===`small`?`small`:`medium`,layout:this.layout===`scroll`?`scroll`:`wrap`}}render(){let e=this.i18n.t,t=Array.isArray(this.items)?this.items:[],n=ft(t,this.groups),r=n.flatMap(e=>e.entries.map(e=>e.item.key)),i=this.value||void 0,a=[this.focusedKey,i].find(e=>e&&r.includes(e))??r[0],{size:o,layout:s}=this.hookStates(),c=this.gridColumns,l=this.showLegend?Be(t):[],u=(t,n,r)=>this.getItemLabel?this.getItemLabel(t,n):e(t.flagged?`answerSheet.itemFlagged`:`answerSheet.item`,{number:t.label??n+1,status:e(`answerSheet.status.${r}`)});return h`<nav
part="root"
class=${b({answerSheet:!0,[o]:!0,scroll:s===`scroll`})}
aria-label=${this.aria.label??e(`answerSheet.label`)}
>
${this.showSummary?h`<p part="total" class="summary">
${e(`answerSheet.summary`,Ne(t))}
</p>`:m}
${n.map((e,t)=>{let n=e.title?`${this.baseId}-group-${t}`:void 0;return h`<div
part="group"
class="section"
role=${n?`group`:m}
aria-labelledby=${n??m}
>
${n?h`<div part="group-label" class="sectionTitle" id=${n}>
${e.title}
</div>`:m}
<div
part="grid"
class=${c?`grid columns`:`grid`}
style=${x(c?{gridTemplateColumns:`repeat(${c}, minmax(0, 1fr))`}:{})}
>
${e.entries.map(({item:e,index:t,status:n,label:r})=>{let o=i===e.key,s=this.disabled||!!e.disabled;return h`<button
type="button"
part=${Nr(`item`,{current:o,disabled:s,flagged:!!e.flagged,status:n})}
class="item ${n}"
data-key=${e.key}
aria-label=${u(e,t,n)}
aria-current=${o?`step`:m}
aria-disabled=${s?`true`:m}
tabindex=${e.key===a?`0`:`-1`}
@focus=${()=>this.focusedKey=e.key}
@click=${()=>this.select(e)}
@keydown=${n=>this.handleKeyDown(n,e,t)}
>
${r}${e.flagged?h`<span
part="indicator"
class="flag"
aria-hidden="true"
></span>`:m}
</button>`})}
</div>
</div>`})}
${l.length?h`<ul part="legend" class="legend">
${l.map(t=>h`<li part="legend-item" class="legendItem">
<span class="swatch ${t}" aria-hidden="true"></span
>${e(`answerSheet.legend.${t}`)}
</li>`)}
</ul>`:m}
</nav>`}},R([v({attribute:!1})],Zs.prototype,`items`,void 0),R([v({attribute:!1})],Zs.prototype,`groups`,void 0),R([v({reflect:!0})],Zs.prototype,`value`,void 0),R([v({reflect:!0})],Zs.prototype,`size`,void 0),R([v({reflect:!0})],Zs.prototype,`layout`,void 0),R([v({type:Number})],Zs.prototype,`columns`,void 0),R([v({type:Boolean,attribute:`show-legend`,reflect:!0})],Zs.prototype,`showLegend`,void 0),R([v({type:Boolean,attribute:`show-summary`,reflect:!0})],Zs.prototype,`showSummary`,void 0),R([v({type:Boolean,reflect:!0})],Zs.prototype,`disabled`,void 0),R([v({attribute:!1})],Zs.prototype,`getItemLabel`,void 0),R([p()],Zs.prototype,`focusedKey`,void 0)})))()}var $s,X;function ec(){return(ec=e((()=>{N(),dr(),E(),I(),A(),Fr(),Fi(),li(),gn(),fr(),d(),f(),_(),he(),Je(),wt(),$s=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],X=class extends Yn{constructor(...e){super(...e),this.name=`date-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.draft=null,this.month=fe(new Date),this.focusedKey=``,this.dirty=!1,this.pendingFocus=!1,this.i18n=new D(this),this.aria=new P(this,()=>this.labels),this.floating=new ji(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0}))}static{this.tagName=`minerva-date-picker`}static{this.shadowRootOptions={...Yn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[k,Ci,S`
:host{
display: inline-block;
vertical-align: middle;
}
.datePicker .root{
width: 100%;
}
`,T(dn),T(zn),T(mi)]}get valueAsDate(){return Ve(this.value||``,!0)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}get interactive(){return!this.isDisabled&&!this.readOnly}allowed(e){return!!Ve(e,!0)&&(!this.minDate||e>=this.minDate)&&(!this.maxDate||e<=this.maxDate)}getFormValue(){return this.valueAsDate?Le(this.valueAsDate):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.i18n.t(`validation.valueMissing`),anchor:this.input}:this.valueAsDate&&!this.allowed(this.value)?{flags:{customError:!0},message:[this.minDate,this.maxDate].filter(Boolean).join(` – `),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue,this.open=!1}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open&&(this.month=fe(this.valueAsDate??new Date),this.focusedKey=Le(this.valueAsDate??new Date))}updated(e){super.updated(e),this.floating.sync(this.open&&this.interactive),this.open&&this.pendingFocus&&(this.popup?.querySelector(`[data-date="${this.focusedKey}"]`)?.focus(),this.pendingFocus=!1)}requestOpenChange(e){if(e&&!this.interactive)return!1;if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){!this.interactive||e&&!this.allowed(e)||(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleInput(e){if(!this.interactive)return;let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t}),(!t||this.allowed(t))&&(this.commit(t),t&&(this.month=fe(Ve(t))))}handleBlur(){if(this.draft===null)return;let e=Ve(this.draft.trim(),!1),t=e?Le(e):``;this.draft.trim()?e&&this.allowed(t)&&t!==this.value&&(this.commit(t),this.month=fe(e)):this.value&&this.commit(``),this.draft=null}handleClear(){this.interactive&&(this.draft=null,this.commit(``),this.emit(`minerva-clear`),this.input?.focus())}handleInputClick(){this.requestOpenChange(!this.open)}handleInputKeyDown(e){e.key===`ArrowDown`&&this.interactive&&(e.preventDefault(),this.pendingFocus=!0,this.open?this.requestUpdate():this.requestOpenChange(!0)||(this.pendingFocus=!1))}select(e){this.interactive&&this.allowed(Le(e))&&(this.draft=null,this.commit(Le(e)),this.requestOpenChange(!1),this.input?.focus())}handleDayKeyDown(e,t){if(!this.interactive)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=de(e.key,this),r=(t.getDay()+6)%7,i;switch(n){case`ArrowLeft`:i=ke(t,-1);break;case`ArrowRight`:i=ke(t,1);break;case`ArrowUp`:i=ke(t,-7);break;case`ArrowDown`:i=ke(t,7);break;case`Home`:i=ke(t,-r);break;case`End`:i=ke(t,6-r);break;case`PageUp`:case`PageDown`:{let r=fe(t,(n===`PageUp`?-1:1)*(e.shiftKey?12:1));i=Ge(r.getFullYear(),r.getMonth(),Math.min(t.getDate(),ke(fe(r,1),-1).getDate()));break}default:return}e.preventDefault(),this.focusedKey=Le(i),this.month=fe(i),this.pendingFocus=!0}renderPanel(e){let t=this.i18n.t,n=fe(this.month),r=ke(n,-((n.getDay()+6)%7)),i=Array.from({length:42},(e,t)=>ke(r,t)),a=i.map(Le).includes(this.focusedKey)?this.focusedKey:Le(n),o;try{o=new Intl.DateTimeFormat(this.locale??this.i18n.language,{month:`long`,year:`numeric`}).format(n)}catch{o=Le(n).slice(0,7)}return h`<div
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
@click=${()=>{this.month=fe(n,-1)}}
>
${Zr}
</button>
<button
type="button"
class="navButton"
aria-label=${t(`monthCalendar.nextMonth`)}
@click=${()=>{this.month=fe(n,1)}}
>
${Ur}
</button>
</div>
</div>
<div class="grid" role="grid" aria-labelledby="heading">
<div class="week" role="row">
${$s.map(e=>h`<div class="weekday" role="columnheader">${t(`monthCalendar.weekdays.${e}`)}</div>`)}
</div>
${Array.from({length:6},(e,t)=>h`<div class="week" role="row">
${i.slice(t*7,t*7+7).map(e=>{let t=Le(e);return h`<div
part="day"
class="day"
role="gridcell"
data-date=${t}
?data-outside=${!ct(e,n)}
aria-label=${t}
aria-selected=${String(t===this.value)}
aria-disabled=${this.allowed(t)?m:`true`}
aria-current=${t===Le(new Date)?`date`:m}
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
${!this.hideClearButton&&this.value?h`<button
class="footerButton"
type="button"
@click=${()=>{this.handleClear(),this.requestOpenChange(!1)}}
>
${t(`datePicker.clear`)}
</button>`:m}
<button
class="footerButton"
type="button"
?disabled=${!this.allowed(Le(new Date))}
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
</div>`}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?oe(e):{side:void 0,align:void 0};return{placement:e,side:t,align:n,state:this.open&&this.interactive?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size}}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=Ke(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=Ke(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{qe(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!qe(this,e))??null}render(){let{t:e}=this.i18n,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`datePicker.label`),a=this.draft??(r?Le(r):``),o=!this.hideClearButton&&!!r&&!t&&!n;return h`<div part="root" class="datePicker">
<div
part="control"
class=${b({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
.value=${St(a)}
placeholder=${this.placeholder??e(`datePicker.placeholder`)}
?disabled=${t}
?readonly=${n}
?required=${this.required}
autocomplete="off"
aria-label=${i}
aria-description=${this.aria.description??m}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:m}
aria-readonly=${n?`true`:m}
@input=${this.handleInput}
@blur=${this.handleBlur}
@click=${this.handleInputClick}
@keydown=${this.handleInputKeyDown}
/>
<span class="addon end">
${o?h`<button
part="clear-button"
type="button"
class="iconButton neutral variant-ghost small circle clearButton"
aria-label=${e(`datePicker.clear`)}
@click=${this.handleClear}
>
${Sr}
</button>`:h`<span part="icon" class="calendarIcon" aria-hidden="true"
>${yn}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(i):m}`}},R([v({reflect:!0})],X.prototype,`name`,void 0),R([v({attribute:!1})],X.prototype,`value`,void 0),R([v({attribute:`value`})],X.prototype,`defaultValue`,void 0),R([v({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),R([v()],X.prototype,`label`,void 0),R([v()],X.prototype,`placeholder`,void 0),R([v()],X.prototype,`locale`,void 0),R([v({reflect:!0})],X.prototype,`size`,void 0),R([v({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),R([v({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),R([v({type:Boolean,attribute:`hide-clear-button`})],X.prototype,`hideClearButton`,void 0),R([v({attribute:`min-date`})],X.prototype,`minDate`,void 0),R([v({attribute:`max-date`})],X.prototype,`maxDate`,void 0),R([p()],X.prototype,`draft`,void 0),R([p()],X.prototype,`month`,void 0),R([p()],X.prototype,`focusedKey`,void 0),R([y(`input`)],X.prototype,`input`,void 0),R([y(`.datePicker`)],X.prototype,`field`,void 0),R([y(`.popup`)],X.prototype,`popup`,void 0)})))()}var tc,nc,rc,Z;function ic(){return(ic=e((()=>{N(),E(),I(),w(),A(),ii(),d(),f(),Je(),tc=e=>h`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
${_t`<path d=${pt[e]}></path>`}
</svg>`,nc=e=>Number.isFinite(e)&&e>0?e:0,rc=e=>{let t=e.currentTarget.getBoundingClientRect();return t.width>0?Math.min(1,Math.max(0,(e.clientX-t.left)/t.width)):0},Z=class extends C{constructor(...e){super(...e),this.autoPlay=!1,this.loop=!1,this.muted=!1,this.preload=`metadata`,this.playbackRates=ye,this.skipSeconds=10,this.noControls=!1,this.aspectRatio=`16 / 9`,this.pictureInPicture=!1,this.paused=!0,this.ended=!1,this.loading=!1,this.failed=!1,this.currentTime=0,this.duration=0,this.buffered=0,this.volume=1,this.rate=1,this.fullscreen=!1,this.pip=!1,this.detached=!1,this.startApplied=!1,this.resumeAt=null,this.i18n=new D(this),this.aria=new P(this),this.slots=new M(this),this.onFullscreenChange=()=>{this.fullscreen=document.fullscreenElement===this},this.dragSeek=e=>{this.duration&&this.drag(e,e=>this.seek(e*this.duration))},this.dragVolume=e=>this.drag(e,e=>this.changeVolume(e)),this.onMediaPlay=()=>{this.paused=!1,this.ended=!1,this.emit(`minerva-play`)},this.onMediaPause=()=>{this.paused=!0,this.loading=!1,this.emit(`minerva-pause`)},this.onMediaEnded=()=>{this.paused=!0,this.ended=!0,this.loading=!1,this.emit(`minerva-ended`)},this.onWaiting=()=>{this.loading=!0},this.onReady=()=>{this.loading=!1},this.onProgress=e=>this.syncTime(e.currentTarget),this.onDurationChange=e=>{this.duration=nc(e.currentTarget.duration)},this.onLoadedMetadata=e=>{let t=e.currentTarget,n=nc(t.duration);if(this.duration=n,this.failed=!1,!this.startApplied){this.startApplied=!0;let e=this.resumeAt??this.startTime;this.resumeAt=null,e&&e>0&&(t.currentTime=o(e,n))}this.syncTime(t),this.emit(`minerva-loaded-metadata`,{duration:n})},this.onTimeUpdate=e=>{let t=e.currentTarget;this.syncTime(t),this.emit(`minerva-time-update`,{currentTime:t.currentTime,duration:nc(t.duration)})},this.onVolumeChange=e=>{let t=e.currentTarget;this.volume=t.volume,this.muted=t.muted,this.emit(`minerva-volume-change`,{volume:t.volume,muted:t.muted})},this.onRateChange=e=>{let t=e.currentTarget;this.rate=t.playbackRate,this.emit(`minerva-rate-change`,{rate:t.playbackRate})},this.onMediaError=e=>{this.failed=!0,this.loading=!1,this.emit(`minerva-error`,{error:e.currentTarget.error})}}static{this.tagName=`minerva-media-player`}static{this.styles=[k,S`
:host{
display: block;
inline-size: 100%;
}
:host(:fullscreen) .mediaPlayer{
block-size: 100%;
aspect-ratio: auto;
border-radius: 0;
}
`,T(Lr)]}get element(){return this.renderRoot?.querySelector?.(`audio, video`)??null}play(){let e=this.element;return e?Promise.resolve(e.play()).catch(()=>void 0):Promise.resolve()}pause(){this.element?.pause()}seek(e){let t=this.element;if(!t)return;let n=o(e,nc(t.duration));t.currentTime=n,this.currentTime=n}connectedCallback(){super.connectedCallback(),this.detached=!1,document.addEventListener(`fullscreenchange`,this.onFullscreenChange)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`fullscreenchange`,this.onFullscreenChange);let e=this.element;e&&this.startApplied&&(this.resumeAt=e.currentTime,this.startApplied=!1),this.detached=!0}willUpdate(e){e.has(`src`)&&e.get(`src`)!==void 0&&(this.startApplied=!1,this.resumeAt=null,this.failed=!1,this.ended=!1,this.currentTime=0,this.duration=0,this.buffered=0)}updated(e){super.updated(e),e.has(`detached`)&&this.detached&&this.element?.load?.()}get mediaType(){return Ae(this.src,this.mimeType,this.type)}hookStates(){return{variant:this.mediaType,status:this.ended?`ended`:this.paused?`paused`:`playing`,loading:this.loading&&!this.noControls,invalid:this.failed&&!this.noControls}}toggle(){let e=this.element;e&&(e.paused||e.ended?this.play():e.pause())}toggleMute(){let e=this.element;e&&(e.muted=!e.muted,this.muted=e.muted)}changeVolume(e){let t=this.element;t&&(t.volume=nt(e),t.volume>0&&t.muted&&(t.muted=!1),this.volume=t.volume,this.muted=t.muted)}cycleRate(){let e=this.element;e&&(e.playbackRate=We(e.playbackRate,this.playbackRates),this.rate=e.playbackRate)}toggleFullscreen(){this.mediaType===`video`&&(document.fullscreenElement===this?document.exitFullscreen?.().catch(()=>void 0):typeof this.requestFullscreen==`function`?this.requestFullscreen().catch(()=>void 0):this.element?.webkitEnterFullscreen?.())}togglePip(){let e=this.element;if(!e)return;let t=document;t.pictureInPictureElement===e?t.exitPictureInPicture?.().catch(()=>void 0):e.requestPictureInPicture?.().catch(()=>void 0)}handleKeyDown(e){let t=e.target;if((e.key===` `||e.key===`Enter`)&&t.closest?.(`button`))return;let n=je(e.key,e),r=this.element;if(n&&r&&(n.type!==`fullscreen`||this.mediaType===`video`))switch(e.preventDefault(),n.type){case`toggle`:this.toggle();break;case`seek`:this.seek(r.currentTime+n.delta);break;case`volume`:this.changeVolume((r.muted?0:r.volume)+n.delta);break;case`mute`:this.toggleMute();break;case`fullscreen`:this.toggleFullscreen()}}drag(e,t){let n=e.currentTarget;if(e.type===`pointerdown`)n.setPointerCapture?.(e.pointerId);else if(!n.hasPointerCapture?.(e.pointerId))return;t(rc(e))}seekKeys(e){let t=this.element;if(!t||!this.duration)return;let n=this.skipSeconds||10,r={ArrowLeft:-5,ArrowDown:-5,ArrowRight:5,ArrowUp:5,PageDown:-n,PageUp:n},i;e.key in r?i=t.currentTime+r[e.key]:e.key===`Home`?i=0:e.key===`End`&&(i=this.duration),i!==void 0&&(e.preventDefault(),e.stopPropagation(),this.seek(i))}volumeKeys(e){let t=this.element;if(!t)return;let n=t.muted?0:t.volume,r;e.key===`ArrowRight`||e.key===`ArrowUp`?r=n+.1:e.key===`ArrowLeft`||e.key===`ArrowDown`?r=n-.1:e.key===`Home`?r=0:e.key===`End`&&(r=1),r!==void 0&&(e.preventDefault(),e.stopPropagation(),this.changeVolume(r))}syncTime(e){this.currentTime=e.currentTime,this.buffered=Re(e.buffered,e.currentTime)}get cssHeight(){let e=String(this.height??``).trim();return/^\d+(\.\d+)?$/.test(e)?`${e}px`:e}renderMedia(e){let t=!this.noControls,n=this.detached?void 0:this.src;return e?h`<video
part="media"
class="media"
src=${n??m}
poster=${this.poster??m}
preload=${this.preload}
crossorigin=${this.crossOrigin??m}
style=${!t&&this.height?`height:${this.cssHeight};width:auto`:m}
?autoplay=${this.autoPlay}
?loop=${this.loop}
.muted=${this.muted}
playsinline
@play=${this.onMediaPlay}
@pause=${this.onMediaPause}
@ended=${this.onMediaEnded}
@playing=${this.onReady}
@canplay=${this.onReady}
@waiting=${this.onWaiting}
@loadedmetadata=${this.onLoadedMetadata}
@durationchange=${this.onDurationChange}
@timeupdate=${this.onTimeUpdate}
@progress=${this.onProgress}
@volumechange=${this.onVolumeChange}
@ratechange=${this.onRateChange}
@error=${this.onMediaError}
@enterpictureinpicture=${()=>this.pip=!0}
@leavepictureinpicture=${()=>this.pip=!1}
@click=${t?()=>this.toggle():m}
@dblclick=${t?()=>this.toggleFullscreen():m}
></video>`:h`<audio
part="media"
class="media"
src=${n??m}
preload=${this.preload}
crossorigin=${this.crossOrigin??m}
?autoplay=${this.autoPlay}
?loop=${this.loop}
.muted=${this.muted}
@play=${this.onMediaPlay}
@pause=${this.onMediaPause}
@ended=${this.onMediaEnded}
@playing=${this.onReady}
@canplay=${this.onReady}
@waiting=${this.onWaiting}
@loadedmetadata=${this.onLoadedMetadata}
@durationchange=${this.onDurationChange}
@timeupdate=${this.onTimeUpdate}
@progress=${this.onProgress}
@volumechange=${this.onVolumeChange}
@ratechange=${this.onRateChange}
@error=${this.onMediaError}
></audio>`}button(e,t,n,r={}){return h`<button
type="button"
part="button"
class=${r.extra?`button ${r.extra}`:`button`}
aria-label=${e}
aria-pressed=${r.pressed===void 0?m:String(r.pressed)}
?disabled=${r.disabled??!1}
@click=${n}
>
${t}
</button>`}render(){let e=this.i18n.t,t=this.mediaType===`video`;if(this.noControls)return h`<div part="root" class="mediaPlayer bare">
${this.renderMedia(t)}
</div>`;let{currentTime:n,duration:r,paused:i,failed:a,rate:o,muted:s}=this,c=s?0:this.volume,l=this.skipSeconds,u=!i&&!this.ended,ee=this.slots.test(`heading`)&&this.querySelector(`[slot="heading"]`)?.textContent?.trim()||``,te=typeof document<`u`&&document.pictureInPictureEnabled===!0,ne=t?this.height?`height:${this.cssHeight}`:`aspect-ratio:${this.aspectRatio}`:m,re=this.loading&&!a?h`<span
part="spinner"
class="spinner"
role="status"
aria-label=${e(`mediaPlayer.loading`)}
></span>`:m,ie=Math.round(c*100);return h`<div
part="root"
class="mediaPlayer ${t?`video`:`audio`}${u?` playing`:``}"
role="group"
tabindex="0"
aria-label=${this.aria.label??(ee||e(`mediaPlayer.label`))}
style=${ne}
@keydown=${this.handleKeyDown}
>
${this.renderMedia(t)}
<div part="title" class="title" ?hidden=${!this.slots.test(`heading`)}>
<slot name="heading"></slot>
</div>
${t?re:m}
${a?h`<div part="error" class="error" role="alert">
${e(`mediaPlayer.error`)}
</div>`:m}
<div part="controls" class="controls">
<div
part="seek"
class="slider seek"
role="slider"
tabindex="0"
aria-label=${e(`mediaPlayer.seek`)}
aria-valuemin="0"
aria-valuemax=${Math.round(r)}
aria-valuenow=${Math.round(n)}
aria-valuetext=${e(`mediaPlayer.timeOf`,{current:se(n,r),duration:se(r)})}
aria-disabled=${r?m:`true`}
style="--_mp-value:${_e(n,r)*100}%;--_mp-buffered:${_e(this.buffered,r)*100}%"
@pointerdown=${this.dragSeek}
@pointermove=${this.dragSeek}
@keydown=${this.seekKeys}
>
<span class="track"></span><span class="buffered"></span
><span class="fill"></span><span class="thumb"></span>
</div>
${this.button(e(i?`mediaPlayer.play`:`mediaPlayer.pause`),tc(i?`play`:`pause`),()=>this.toggle(),{disabled:a})}
${l>0?h`${this.button(e(`mediaPlayer.skipBack`,{count:l}),tc(`skipBack`),()=>this.seek(this.currentTime-l),{disabled:a})}${this.button(e(`mediaPlayer.skipForward`,{count:l}),tc(`skipForward`),()=>this.seek(this.currentTime+l),{disabled:a})}`:m}
${t?m:re}
<span part="time" class="time"
>${se(n,r)} /
${se(r)}</span
>
<span class="spacer"></span>
${this.button(e(s?`mediaPlayer.unmute`:`mediaPlayer.mute`),tc(s||this.volume===0?`muted`:`volume`),()=>this.toggleMute(),{pressed:s})}
<div
part="volume"
class="slider volume"
role="slider"
tabindex="0"
aria-label=${e(`mediaPlayer.volume`)}
aria-valuemin="0"
aria-valuemax="100"
aria-valuenow=${ie}
aria-valuetext="${ie}%"
style="--_mp-value:${c*100}%"
@pointerdown=${this.dragVolume}
@pointermove=${this.dragVolume}
@keydown=${this.volumeKeys}
>
<span class="track"></span><span class="fill"></span
><span class="thumb"></span>
</div>
${this.playbackRates.length>1?this.button(e(`mediaPlayer.playbackRate`,{rate:ot(o)}),ot(o),()=>this.cycleRate(),{extra:`rate`}):m}
${t&&this.pictureInPicture&&te?this.button(this.pip?e(`mediaPlayer.exitPictureInPicture`):e(`mediaPlayer.pictureInPicture`),tc(`pictureInPicture`),()=>this.togglePip(),{pressed:this.pip}):m}
${t?this.button(this.fullscreen?e(`mediaPlayer.exitFullscreen`):e(`mediaPlayer.fullscreen`),tc(this.fullscreen?`exitFullscreen`:`fullscreen`),()=>this.toggleFullscreen()):m}
</div>
</div>`}},R([v()],Z.prototype,`src`,void 0),R([v({reflect:!0})],Z.prototype,`type`,void 0),R([v({attribute:`mime-type`})],Z.prototype,`mimeType`,void 0),R([v()],Z.prototype,`poster`,void 0),R([v({type:Boolean,attribute:`autoplay`})],Z.prototype,`autoPlay`,void 0),R([v({type:Boolean})],Z.prototype,`loop`,void 0),R([v({type:Boolean})],Z.prototype,`muted`,void 0),R([v()],Z.prototype,`preload`,void 0),R([v({attribute:`crossorigin`})],Z.prototype,`crossOrigin`,void 0),R([v({type:Number,attribute:`start-time`})],Z.prototype,`startTime`,void 0),R([v({attribute:!1})],Z.prototype,`playbackRates`,void 0),R([v({type:Number,attribute:`skip-seconds`})],Z.prototype,`skipSeconds`,void 0),R([v({type:Boolean,attribute:`no-controls`,reflect:!0})],Z.prototype,`noControls`,void 0),R([v()],Z.prototype,`height`,void 0),R([v({attribute:`aspect-ratio`})],Z.prototype,`aspectRatio`,void 0),R([v({type:Boolean,attribute:`picture-in-picture`})],Z.prototype,`pictureInPicture`,void 0),R([p()],Z.prototype,`paused`,void 0),R([p()],Z.prototype,`ended`,void 0),R([p()],Z.prototype,`loading`,void 0),R([p()],Z.prototype,`failed`,void 0),R([p()],Z.prototype,`currentTime`,void 0),R([p()],Z.prototype,`duration`,void 0),R([p()],Z.prototype,`buffered`,void 0),R([p()],Z.prototype,`volume`,void 0),R([p()],Z.prototype,`rate`,void 0),R([p()],Z.prototype,`fullscreen`,void 0),R([p()],Z.prototype,`pip`,void 0),R([p()],Z.prototype,`detached`,void 0)})))()}var ac,oc,sc;function cc(){return(cc=e((()=>{N(),E(),I(),w(),A(),mr(),d(),f(),he(),ac=[`elevated`,`outline`,`filled`],oc=[`small`,`medium`,`large`],sc=class extends C{constructor(...e){super(...e),this.showHint=!1,this.flipped=!1,this.flipOnClick=!0,this.disabled=!1,this.axis=`y`,this.variant=`elevated`,this.size=`medium`,this.minHeight=`12rem`,this.i18n=new D(this),this.aria=new P(this),this.slots=new M(this)}static{this.tagName=`minerva-flashcard`}static{this.styles=[k,S`
:host{
display: block;
}
`,T($r)]}focus(e){this.renderRoot.querySelector(`[part="card"]`)?.focus(e)}toggle(){if(!this.flipOnClick||this.disabled)return;let e=!this.flipped;this.emit(`minerva-flipped-change`,{flipped:e},{cancelable:!0})&&(this.flipped=e)}handleClick(e){ae(e,e.currentTarget)||this.toggle()}handleKeyDown(e){e.target===e.currentTarget&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),e.repeat||this.toggle())}get safeVariant(){return ac.includes(this.variant)?this.variant:`elevated`}get safeSize(){return oc.includes(this.size)?this.size:`medium`}hookStates(){return{state:this.flipped?`active`:`inactive`,disabled:this.disabled,variant:this.safeVariant,size:this.safeSize}}render(){let e=this.i18n.t,t=this.flipped,n=this.disabled,r=this.frontLabel??e(`flashcard.frontLabel`),i=this.backLabel??e(`flashcard.backLabel`),a=(t?i:r)||e(t?`flashcard.backLabel`:`flashcard.frontLabel`),o=this.aria.label??e(`flashcard.label`,{face:a}),s=this.hint??e(`flashcard.hint`),c=typeof this.minHeight==`number`||/^\d+(\.\d+)?$/.test(String(this.minHeight))?`${this.minHeight}px`:this.minHeight,l=[`flashcard`,this.safeVariant,this.safeSize,this.axis===`x`?`axisX`:``,t?`flipped`:``,n?`disabled`:``].filter(Boolean).join(` `),u=this.flipOnClick;return h`<div
part="root"
class=${l}
style=${`--flashcard-min-height: ${c}`}
>
<div
part="card"
class="card ${u?`interactive`:``}"
role=${u?`button`:`group`}
tabindex=${u?n?-1:0:m}
aria-pressed=${u?String(t):m}
aria-disabled=${u&&n?`true`:m}
aria-label=${o}
aria-describedby=${t?`back-content`:`front-content`}
@click=${this.handleClick}
@keydown=${this.handleKeyDown}
>
<div class="inner">
<div
part="front"
class="face front"
aria-hidden=${t?`true`:m}
?inert=${t}
>
${r?h`<span part="label" class="label">${r}</span>`:m}
<div id="front-content" class="content">
<slot name="front">${this.front??m}</slot>
</div>
${this.showHint&&u&&s?h`<span part="hint" class="hint">${s}</span>`:m}
</div>
<div
part="back"
class="face back"
aria-hidden=${t?m:`true`}
?inert=${!t}
aria-live="polite"
aria-atomic="true"
>
${i?h`<span part="label" class="label">${i}</span>`:m}
<div id="back-content" class="content">
<slot name="back">${this.back??m}</slot>
</div>
</div>
</div>
</div>
${this.slots.test(`footer`)?h`<div part="footer" class="footer">
<slot name="footer"></slot>
</div>`:m}
</div>`}},R([v()],sc.prototype,`front`,void 0),R([v()],sc.prototype,`back`,void 0),R([v({attribute:`front-label`})],sc.prototype,`frontLabel`,void 0),R([v({attribute:`back-label`})],sc.prototype,`backLabel`,void 0),R([v()],sc.prototype,`hint`,void 0),R([v({type:Boolean,attribute:`show-hint`,reflect:!0})],sc.prototype,`showHint`,void 0),R([v({type:Boolean,reflect:!0})],sc.prototype,`flipped`,void 0),R([v({attribute:`flip-on-click`,converter:{fromAttribute:e=>e!==`false`}})],sc.prototype,`flipOnClick`,void 0),R([v({type:Boolean,reflect:!0})],sc.prototype,`disabled`,void 0),R([v({reflect:!0})],sc.prototype,`axis`,void 0),R([v({reflect:!0})],sc.prototype,`variant`,void 0),R([v({reflect:!0})],sc.prototype,`size`,void 0),R([v({attribute:`min-height`})],sc.prototype,`minHeight`,void 0)})))()}var lc,uc,dc;function fc(){return(fc=e((()=>{N(),E(),I(),w(),A(),Wr(),d(),f(),g(),Je(),lc={fromAttribute(e){let t=e?.trim();if(t)return/^-?\d+(\.\d+)?$/.test(t)?Number(t):t},toAttribute(e){return e==null?null:String(e)}},uc=class extends C{constructor(...e){super(...e),this.columnWidth=`18rem`,this.fill=!1,this.gap=`0.75rem`,this.i18n=new D(this),this.aria=new P(this)}static{this.tagName=`minerva-kanban-board`}static{this.styles=[k,S`
:host{
display: block;
min-inline-size: 0;
max-inline-size: 100%;
}
`,T(lr)]}focus(e){this.renderRoot.querySelector(`.board`)?.focus(e)}render(){let e={},t=ue(this.columnWidth),n=ue(this.gap),r=ue(this.height),i=ue(this.maxHeight);return t&&t!==`18rem`&&(e[`--kanban-column-width`]=t),n&&n!==`0.75rem`&&(e[`--kanban-gap`]=n),r&&(e.height=r),i&&(e[`max-height`]=i),h`<div
part="root"
class="board ${this.fill?`fill`:``}"
role="region"
tabindex="0"
aria-label=${this.aria.label??this.i18n.t(`kanban.label`)}
style=${x(e)}
>
<slot></slot>
</div>`}},R([v({attribute:`column-width`,converter:lc})],uc.prototype,`columnWidth`,void 0),R([v({type:Boolean,reflect:!0})],uc.prototype,`fill`,void 0),R([v({converter:lc})],uc.prototype,`gap`,void 0),R([v({converter:lc})],uc.prototype,`height`,void 0),R([v({attribute:`max-height`,converter:lc})],uc.prototype,`maxHeight`,void 0),dc=class extends C{constructor(...e){super(...e),this.heading=``,this.description=``,this.i18n=new D(this),this.aria=new P(this),this.slots=new M(this),this.listItems=new Set}static{this.tagName=`minerva-kanban-column`}static{this.styles=[k,S`

:host{
display: flex;
flex: var(--_kanban-grow,0) 0 var(--kanban-column-width,18rem);
flex-direction: column;
box-sizing: border-box;
inline-size: var(--kanban-column-width,18rem);
min-inline-size: 0;
min-block-size: 0;
max-block-size: 100%;
scroll-snap-align: start;
}
section.column{
flex: 1 1 auto;
inline-size: auto;
min-block-size: 0;
}
.list ::slotted(*){
flex: none;
min-inline-size: 0;
}
`,T(lr)]}disconnectedCallback(){super.disconnectedCallback(),this.releaseItems(new Set)}releaseItems(e){for(let t of this.listItems)e.has(t)||(t.getAttribute(`role`)===`listitem`&&t.removeAttribute(`role`),this.listItems.delete(t))}syncItems(){let e=this.renderRoot.querySelector(`.list > slot:not([name])`),t=new Set(e?e.assignedElements():[]);this.releaseItems(t);for(let e of t)e.hasAttribute(`role`)||(e.setAttribute(`role`,`listitem`),this.listItems.add(e))}updated(){this.syncItems()}hookStates(){return{color:xe(this.color).scheme}}render(){let e=this.i18n.t,t=$e(this.count),{scheme:n,custom:r}=xe(this.color),i=this.heading.trim(),a=this.aria.label??(i?t===void 0?i:e(`kanban.columnLabel`,{title:i,count:t}):void 0),o=this.slots.test(`[default]`),s=!!this.description||this.slots.test(`description`);return h`<section
part="root"
class="column ${n??``}"
role="group"
aria-label=${a??m}
aria-labelledby=${a===void 0?t===void 0?`title`:`title count`:m}
style=${x(r?{"--kanban-column-color":r}:{})}
>
<div part="header" class="header">
${n||r?h`<span
part="indicator"
class="indicator"
aria-hidden="true"
></span>`:m}
<span part="title" class="title" id="title"
><slot name="heading">${this.heading}</slot></span
>
${t===void 0?m:h`<span
part="count"
class="count"
id="count"
aria-hidden=${a===void 0?m:`true`}
>${t}</span
>`}
${this.slots.test(`actions`)?h`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:m}
</div>
${s?h`<p part="description" class="description">
<slot name="description">${this.description}</slot>
</p>`:m}
${o?h`<div part="list" class="list" role="list">
<slot @slotchange=${this.syncItems}></slot>
</div>`:h`<div part="empty" class="empty">
<slot name="empty">${this.emptyText??e(`kanban.empty`)}</slot>
</div>`}
${this.slots.test(`footer`)?h`<div part="footer" class="footer">
<slot name="footer"></slot>
</div>`:m}
</section>`}},R([v()],dc.prototype,`heading`,void 0),R([v({type:Number})],dc.prototype,`count`,void 0),R([v({reflect:!0})],dc.prototype,`color`,void 0),R([v()],dc.prototype,`description`,void 0),R([v({attribute:`empty-text`})],dc.prototype,`emptyText`,void 0)})))()}var pc,mc;function hc(){return(hc=e((()=>{I(),d(),f(),g(),pc=e=>typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,mc=class extends C{constructor(...e){super(...e),this.engine=null,this.offs=[]}static{this.styles=[k,S`
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
`]}get instance(){return this.engine}get defaultHeight(){return 320}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.mountEngine()}disconnectedCallback(){super.disconnectedCallback(),this.unmountEngine()}updated(e){if(super.updated(e),!this.engine){this.mountEngine();return}if([...e.keys()].every(e=>e===`height`))return;if(this.syncEngine){this.syncEngine(this.engine,e);return}let t=this.engineOptions();t&&this.engine.setOptions(t)}mountEngine(){if(this.engine||!this.isConnected)return;let e=this.renderRoot.querySelector(`[part=surface]`),t=e?this.engineOptions():null;if(!e||!t)return;let n=this.createEngine(e,t);this.engine=n,this.offs=this.bindEngine?.(n)??[],this.engineMounted?.(n)}unmountEngine(){for(let e of this.offs)e();this.offs=[],this.engine?.destroy(),this.engine=null}render(){return h`<div
part="root"
class="root"
style=${x({height:pc(this.height??this.defaultHeight)})}
>
<div part="surface" class="surface"></div>
</div>`}},R([v()],mc.prototype,`height`,void 0)})))()}var gc,_c,vc,yc,bc;function xc(){return(xc=e((()=>{hc(),f(),Kt(),gc=class extends mc{constructor(...e){super(...e),this.height=400}createEngine(e,t){return qt(e,t)}engineOptions(){return this.series?{...this.options,series:this.typed(this.series)}:null}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-point-click`,e)),e.on(`camera`,e=>this.emit(`minerva-camera-change`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}resetCamera(){this.instance?.resetCamera()}getCamera(){return this.instance?.getCamera()??null}setCamera(e){this.instance?.setCamera(e)}getRenderer(){return this.instance?.getRenderer()??null}},R([v()],gc.prototype,`height`,void 0),R([v({attribute:!1})],gc.prototype,`series`,void 0),R([v({attribute:!1})],gc.prototype,`options`,void 0),_c=class extends gc{static{this.tagName=`minerva-scatter-3d-chart`}typed(e){return e.map(e=>({...e,type:`scatter`}))}},vc=class extends gc{static{this.tagName=`minerva-line-3d-chart`}typed(e){return e.map(e=>({...e,type:`line`}))}},yc=class extends gc{static{this.tagName=`minerva-surface-3d-chart`}typed(e){return e.map(e=>({...e,type:`surface`,wireframe:e.wireframe??this.wireframe,contours:e.contours??this.contours}))}},R([v({attribute:!1})],yc.prototype,`wireframe`,void 0),R([v({attribute:!1})],yc.prototype,`contours`,void 0),bc=class extends gc{constructor(...e){super(...e),this.barWidth=.7}static{this.tagName=`minerva-bar-3d-chart`}typed(e){return e.map(e=>({...e,type:`bar`,barWidth:e.barWidth??this.barWidth}))}},R([v({type:Number,attribute:`bar-width`})],bc.prototype,`barWidth`,void 0)})))()}var Sc,Cc;function wc(){return(wc=e((()=>{hc(),f(),Pt(),Sc=class extends mc{constructor(...e){super(...e),this.height=320}createEngine(e,t){return jt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.pointClicked(e)),e.on(`plotClick`,e=>this.plotClicked(e)),e.on(`zoom`,e=>this.emit(`minerva-zoom`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e})),e.on(`drag`,e=>this.pointDragged?.(e)),e.on(`drop`,e=>this.pointDropped?.(e))]}pointClicked(e){this.emit(`minerva-point-click`,e)}plotClicked(e){this.emit(`minerva-plot-click`,e)}resetZoom(){this.instance?.resetZoom()}getView(){return this.instance?.getView()??null}setView(e){this.instance?.setView(e)}getRenderer(){return this.instance?.getRenderer()??null}},R([v()],Sc.prototype,`height`,void 0),Cc=class extends Sc{static{this.tagName=`minerva-chart`}engineOptions(){return this.options??null}},R([v({attribute:!1})],Cc.prototype,`options`,void 0)})))()}var Tc;function Ec(){return(Ec=e((()=>{Tc=(e,t,n,r)=>e.map(e=>{let i=e.type??t;return{...e,type:i,...n!==void 0&&i===t?{stack:e.stack??n}:{},...r!==void 0&&(i===`line`||i===`area`)?{curve:e.curve??r}:{}}})})))()}var Dc,Oc,kc,Ac,jc,Mc,Nc,Pc,Fc,Q;function Ic(){return(Ic=e((()=>{wc(),Ec(),f(),Nt(),Dc=class extends Sc{stackMode(){return this.options?.stackMode}engineOptions(){let e=this.series??this.options?.series;return e?{...this.options,series:this.typed(e),stackMode:this.stackMode()}:null}},R([v({attribute:!1})],Dc.prototype,`series`,void 0),R([v({attribute:!1})],Dc.prototype,`options`,void 0),Oc=class extends Dc{constructor(...e){super(...e),this.area=!1,this.curve=`linear`,this.stacked=!1,this.percent=!1}static{this.tagName=`minerva-line-chart`}typed(e){return Tc(e,this.area?`area`:`line`,this.stacked||this.percent?`stack`:void 0,this.curve)}stackMode(){return this.percent?`percent`:super.stackMode()}},R([v({type:Boolean})],Oc.prototype,`area`,void 0),R([v()],Oc.prototype,`curve`,void 0),R([v({type:Boolean})],Oc.prototype,`stacked`,void 0),R([v({type:Boolean})],Oc.prototype,`percent`,void 0),kc=class extends Dc{constructor(...e){super(...e),this.curve=`smooth`,this.stacked=!1,this.percent=!1}static{this.tagName=`minerva-area-chart`}typed(e){return Tc(e,`area`,this.stacked||this.percent?`stack`:void 0,this.curve)}stackMode(){return this.percent?`percent`:super.stackMode()}},R([v()],kc.prototype,`curve`,void 0),R([v({type:Boolean})],kc.prototype,`stacked`,void 0),R([v({type:Boolean})],kc.prototype,`percent`,void 0),Ac=class extends Dc{constructor(...e){super(...e),this.stacked=!1,this.percent=!1,this.labels=!1}static{this.tagName=`minerva-bar-chart`}typed(e){return Tc(e,`bar`,this.stacked||this.percent?`stack`:void 0).map(e=>this.labels&&e.type===`bar`?{...e,showLabels:e.showLabels??!0}:e)}stackMode(){return this.percent?`percent`:super.stackMode()}},R([v({type:Boolean})],Ac.prototype,`stacked`,void 0),R([v({type:Boolean})],Ac.prototype,`percent`,void 0),R([v({type:Boolean})],Ac.prototype,`labels`,void 0),jc=class extends Dc{static{this.tagName=`minerva-scatter-chart`}typed(e){return Tc(e,`scatter`)}},Mc=class extends Dc{static{this.tagName=`minerva-candlestick-chart`}typed(e){return Tc(e,`candlestick`)}},Nc=class extends Sc{constructor(...e){super(...e),this.colorScale=`sequential`}static{this.tagName=`minerva-heatmap-chart`}engineOptions(){return this.data?Mt({data:this.data,xCategories:this.xCategories,yCategories:this.yCategories,colorScale:this.colorScale,valueRange:this.valueRange,colorMidpoint:this.colorMidpoint,name:this.valueName,radius:this.radius,format:this.format},this.options):null}},R([v({attribute:!1})],Nc.prototype,`data`,void 0),R([v({attribute:!1})],Nc.prototype,`xCategories`,void 0),R([v({attribute:!1})],Nc.prototype,`yCategories`,void 0),R([v({attribute:`color-scale`})],Nc.prototype,`colorScale`,void 0),R([v({attribute:!1})],Nc.prototype,`valueRange`,void 0),R([v({type:Number,attribute:`color-midpoint`})],Nc.prototype,`colorMidpoint`,void 0),R([v({attribute:`value-name`})],Nc.prototype,`valueName`,void 0),R([v({type:Number})],Nc.prototype,`radius`,void 0),R([v({attribute:!1})],Nc.prototype,`format`,void 0),R([v({attribute:!1})],Nc.prototype,`options`,void 0),Pc=class extends Sc{constructor(...e){super(...e),this.height=48,this.type=`line`,this.curve=`smooth`}static{this.tagName=`minerva-sparkline`}engineOptions(){return this.data?zt({data:this.data,type:this.type,color:this.color,curve:this.curve,name:this.valueName,reference:this.reference,format:this.format},this.options):null}},R([v()],Pc.prototype,`height`,void 0),R([v({attribute:!1})],Pc.prototype,`data`,void 0),R([v()],Pc.prototype,`type`,void 0),R([v()],Pc.prototype,`color`,void 0),R([v()],Pc.prototype,`curve`,void 0),R([v({type:Number})],Pc.prototype,`reference`,void 0),R([v({attribute:`value-name`})],Pc.prototype,`valueName`,void 0),R([v({attribute:!1})],Pc.prototype,`format`,void 0),R([v({attribute:!1})],Pc.prototype,`options`,void 0),Fc=400,Q=class extends Sc{constructor(...e){super(...e),this.reverseX=!1,this.hideTicks=!1,this.hideLabels=!1,this.pointSize=12,this.dragPoints=!1,this.showCounts=!1,this.lastClick=null}static{this.tagName=`minerva-quadrant-chart`}geometry(){return{xDomain:this.xDomain,yDomain:this.yDomain,xSplit:this.xSplit,ySplit:this.ySplit,reverseX:this.reverseX}}engineOptions(){return this.points?At({...this.geometry(),points:this.points,quadrants:this.quadrants,xLabel:this.xLabel,yLabel:this.yLabel,axisLabels:this.axisLabels,showTicks:!this.hideTicks,showLabels:!this.hideLabels,pointSize:this.pointSize,draggable:this.dragPoints,showCounts:this.showCounts,selectedIndex:this.selectedIndex,selectedIndices:this.selectedIndices},this.options):null}pointClicked(e){let t=e.items[0]?.index,n=t===void 0?void 0:this.points?.[t];if(!n||t===void 0)return;let r=Date.now(),i=this.lastClick,a=i?.index===t&&r-i.time<Fc;this.lastClick=a?null:{index:t,time:r},this.emit(`minerva-point-click`,{point:n,index:t}),a&&this.emit(`minerva-point-double-click`,{point:n,index:t})}plotClicked(e){this.emit(`minerva-quadrant-click`,{quadrant:Ft(this.geometry(),e.x,e.y),x:e.x,y:e.y})}dropDetail(e){let t=e.item.index,n=this.points?.[t];return n?{point:n,index:t,x:e.x,y:e.y,quadrant:Ft(this.geometry(),e.x,e.y)}:null}pointDragged(e){let t=this.dropDetail(e);t&&this.emit(`minerva-point-drag`,t)}pointDropped(e){let t=this.dropDetail(e);t&&this.emit(`minerva-point-drop`,t)}},R([v({attribute:!1})],Q.prototype,`points`,void 0),R([v({attribute:!1})],Q.prototype,`quadrants`,void 0),R([v({attribute:`x-label`})],Q.prototype,`xLabel`,void 0),R([v({attribute:`y-label`})],Q.prototype,`yLabel`,void 0),R([v({attribute:!1})],Q.prototype,`axisLabels`,void 0),R([v({attribute:!1})],Q.prototype,`xDomain`,void 0),R([v({attribute:!1})],Q.prototype,`yDomain`,void 0),R([v({type:Number,attribute:`x-split`})],Q.prototype,`xSplit`,void 0),R([v({type:Number,attribute:`y-split`})],Q.prototype,`ySplit`,void 0),R([v({type:Boolean,attribute:`reverse-x`})],Q.prototype,`reverseX`,void 0),R([v({type:Boolean,attribute:`hide-ticks`})],Q.prototype,`hideTicks`,void 0),R([v({type:Boolean,attribute:`hide-labels`})],Q.prototype,`hideLabels`,void 0),R([v({type:Number,attribute:`point-size`})],Q.prototype,`pointSize`,void 0),R([v({type:Boolean,attribute:`drag-points`})],Q.prototype,`dragPoints`,void 0),R([v({type:Boolean,attribute:`show-counts`})],Q.prototype,`showCounts`,void 0),R([v({type:Number,attribute:`selected-index`})],Q.prototype,`selectedIndex`,void 0),R([v({attribute:!1})],Q.prototype,`selectedIndices`,void 0),R([v({attribute:!1})],Q.prototype,`options`,void 0)})))()}var Lc,Rc,zc,Bc,Vc,Hc,Uc,Wc;function Gc(){return(Gc=e((()=>{hc(),f(),Wt(),Lc=class extends mc{createEngine(e,t){return Gt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`toggle`,e=>this.emit(`minerva-toggle`,e))]}toggle(e){this.instance?.toggle(e)}},Rc=class extends Lc{static{this.tagName=`minerva-shape-chart`}get defaultHeight(){return this.options?.type===`gauge`?240:320}engineOptions(){return this.options??null}},R([v({attribute:!1})],Rc.prototype,`options`,void 0),zc=class extends Lc{constructor(...e){super(...e),this.innerRadius=0,this.rose=!1}static{this.tagName=`minerva-pie-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`pie`,data:e,innerRadius:this.innerRadius,rose:this.rose||this.options?.rose,labels:this.labels??this.options?.labels,centerValue:this.centerValue??this.options?.centerValue,centerLabel:this.centerLabel??this.options?.centerLabel}:null}},R([v({attribute:!1})],zc.prototype,`data`,void 0),R([v({type:Number,attribute:`inner-radius`})],zc.prototype,`innerRadius`,void 0),R([v({type:Boolean})],zc.prototype,`rose`,void 0),R([v()],zc.prototype,`labels`,void 0),R([v({attribute:`center-value`})],zc.prototype,`centerValue`,void 0),R([v({attribute:`center-label`})],zc.prototype,`centerLabel`,void 0),R([v({attribute:!1})],zc.prototype,`options`,void 0),Bc=class extends zc{constructor(...e){super(...e),this.innerRadius=.62}static{this.tagName=`minerva-donut-chart`}},R([v({type:Number,attribute:`inner-radius`})],Bc.prototype,`innerRadius`,void 0),Vc=class extends Lc{constructor(...e){super(...e),this.shape=`polygon`,this.levels=4}static{this.tagName=`minerva-radar-chart`}engineOptions(){let e=this.indicators??this.options?.indicators,t=this.series??this.options?.series;return!e||!t?null:{...this.options,type:`radar`,indicators:e,series:t,shape:this.shape,levels:this.levels}}},R([v({attribute:!1})],Vc.prototype,`indicators`,void 0),R([v({attribute:!1})],Vc.prototype,`series`,void 0),R([v()],Vc.prototype,`shape`,void 0),R([v({type:Number})],Vc.prototype,`levels`,void 0),R([v({attribute:!1})],Vc.prototype,`options`,void 0),Hc=class extends Lc{constructor(...e){super(...e),this.value=0,this.min=0,this.max=100,this.needle=!1}static{this.tagName=`minerva-gauge-chart`}get defaultHeight(){return 240}engineOptions(){return{...this.options,type:`gauge`,value:this.value,min:this.min,max:this.max,label:this.label??this.options?.label,needle:this.needle||this.options?.needle,bands:this.bands??this.options?.bands}}},R([v({type:Number})],Hc.prototype,`value`,void 0),R([v({type:Number})],Hc.prototype,`min`,void 0),R([v({type:Number})],Hc.prototype,`max`,void 0),R([v()],Hc.prototype,`label`,void 0),R([v({type:Boolean})],Hc.prototype,`needle`,void 0),R([v({attribute:!1})],Hc.prototype,`bands`,void 0),R([v({attribute:!1})],Hc.prototype,`options`,void 0),Uc=class extends Lc{constructor(...e){super(...e),this.sort=`none`,this.shape=`trapezoid`,this.hideConversion=!1}static{this.tagName=`minerva-funnel-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`funnel`,data:e,sort:this.sort,shape:this.shape,conversion:!this.hideConversion&&this.options?.conversion}:null}},R([v({attribute:!1})],Uc.prototype,`data`,void 0),R([v()],Uc.prototype,`sort`,void 0),R([v()],Uc.prototype,`shape`,void 0),R([v({type:Boolean,attribute:`hide-conversion`})],Uc.prototype,`hideConversion`,void 0),R([v({attribute:!1})],Uc.prototype,`options`,void 0),Wc=class extends Lc{constructor(...e){super(...e),this.gap=2,this.hideHeaders=!1}static{this.tagName=`minerva-treemap-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`treemap`,data:e,gap:this.gap,headers:!this.hideHeaders&&this.options?.headers}:null}},R([v({attribute:!1})],Wc.prototype,`data`,void 0),R([v({type:Number})],Wc.prototype,`gap`,void 0),R([v({type:Boolean,attribute:`hide-headers`})],Wc.prototype,`hideHeaders`,void 0),R([v({attribute:!1})],Wc.prototype,`options`,void 0)})))()}var Kc,qc,Jc,Yc,Xc,Zc,Qc,$c,el,tl;function nl(){return(nl=e((()=>{wc(),Ec(),Ic(),f(),Nt(),Kc=class extends Ac{static{this.tagName=`minerva-horizontal-bar-chart`}engineOptions(){let e=super.engineOptions();return e&&{...e,orientation:`horizontal`}}},qc=class extends Dc{constructor(...e){super(...e),this.curve=`smooth`}static{this.tagName=`minerva-range-area-chart`}typed(e){return Tc(e,`area`,void 0,this.curve).map(e=>e.type===`area`?{...e,lineWidth:e.lineWidth??1.5}:e)}},R([v()],qc.prototype,`curve`,void 0),Jc=class extends Dc{static{this.tagName=`minerva-mixed-chart`}typed(e){return Tc(e,`line`)}},Yc=class extends Dc{constructor(...e){super(...e),this.minSize=6,this.maxSize=48}static{this.tagName=`minerva-bubble-chart`}typed(e){return It(e,{minSize:this.minSize,maxSize:this.maxSize,maxValue:this.maxValue})}},R([v({type:Number,attribute:`min-size`})],Yc.prototype,`minSize`,void 0),R([v({type:Number,attribute:`max-size`})],Yc.prototype,`maxSize`,void 0),R([v({type:Number,attribute:`max-value`})],Yc.prototype,`maxValue`,void 0),Xc={fromAttribute:e=>e===null?void 0:/^\d+$/.test(e)?Number(e):e},Zc=class extends Sc{constructor(...e){super(...e),this.bins=`auto`,this.nice=!0}static{this.tagName=`minerva-histogram-chart`}engineOptions(){return this.values?{...this.options,series:[Vt(this.values,{bins:this.bins,domain:this.domain,nice:this.nice,name:this.valueName,color:this.color,format:this.formatBin}),...this.series??[]]}:null}},R([v({attribute:!1})],Zc.prototype,`values`,void 0),R([v({converter:Xc})],Zc.prototype,`bins`,void 0),R([v({attribute:!1})],Zc.prototype,`domain`,void 0),R([v({attribute:!1})],Zc.prototype,`nice`,void 0),R([v({attribute:`value-name`})],Zc.prototype,`valueName`,void 0),R([v()],Zc.prototype,`color`,void 0),R([v({attribute:!1})],Zc.prototype,`formatBin`,void 0),R([v({attribute:!1})],Zc.prototype,`series`,void 0),R([v({attribute:!1})],Zc.prototype,`options`,void 0),Qc={fromAttribute:e=>e===null?void 0:e===`minmax`?e:Number(e)},$c=class extends Sc{constructor(...e){super(...e),this.whisker=1.5,this.outlierShape=`hollow`,this.outlierSize=7,this.orientation=`vertical`}static{this.tagName=`minerva-box-plot-chart`}engineOptions(){return!this.groups?.length&&!this.series?null:{...this.options,orientation:this.orientation,series:Tc([...this.groups?.length?[{id:`boxplot`,name:this.valueName??`Values`,data:Lt(this.groups,{whisker:this.whisker})}]:[],...this.series??[]],`boxplot`).map(e=>e.type===`boxplot`?{...e,outlierShape:e.outlierShape??this.outlierShape,outlierSize:e.outlierSize??this.outlierSize}:e)}}},R([v({attribute:!1})],$c.prototype,`groups`,void 0),R([v({attribute:!1})],$c.prototype,`series`,void 0),R([v({attribute:`value-name`})],$c.prototype,`valueName`,void 0),R([v({converter:Qc})],$c.prototype,`whisker`,void 0),R([v({attribute:`outlier-shape`})],$c.prototype,`outlierShape`,void 0),R([v({type:Number,attribute:`outlier-size`})],$c.prototype,`outlierSize`,void 0),R([v()],$c.prototype,`orientation`,void 0),R([v({attribute:!1})],$c.prototype,`options`,void 0),el=class extends Sc{constructor(...e){super(...e),this.start=0,this.hideLabels=!1,this.hideConnectors=!1,this.orientation=`vertical`}static{this.tagName=`minerva-waterfall-chart`}engineOptions(){return this.steps?{...this.options,orientation:this.orientation,series:[Rt(this.steps,{name:this.valueName,upColor:this.upColor,downColor:this.downColor,totalColor:this.totalColor,start:this.start,labels:!this.hideLabels,format:this.format,connector:this.hideConnectors?!1:this.connector??!0,locale:this.options?.locale})]}:null}},R([v({attribute:!1})],el.prototype,`steps`,void 0),R([v({attribute:`value-name`})],el.prototype,`valueName`,void 0),R([v({attribute:`up-color`})],el.prototype,`upColor`,void 0),R([v({attribute:`down-color`})],el.prototype,`downColor`,void 0),R([v({attribute:`total-color`})],el.prototype,`totalColor`,void 0),R([v({type:Number})],el.prototype,`start`,void 0),R([v({type:Boolean,attribute:`hide-labels`})],el.prototype,`hideLabels`,void 0),R([v({attribute:!1})],el.prototype,`format`,void 0),R([v({type:Boolean,attribute:`hide-connectors`})],el.prototype,`hideConnectors`,void 0),R([v({attribute:!1})],el.prototype,`connector`,void 0),R([v()],el.prototype,`orientation`,void 0),R([v({attribute:!1})],el.prototype,`options`,void 0),tl=class extends Sc{constructor(...e){super(...e),this.hideDependencyArrows=!1,this.barLabels=`auto`,this.today=!1,this.mountedAt=Date.now()}static{this.tagName=`minerva-gantt-chart`}engineOptions(){if(!this.tasks)return null;let e=Ut(this.tasks,{colors:this.colors,taskName:this.taskName,progressName:this.progressName,milestoneName:this.milestoneName,formatProgress:this.formatProgress,dependenciesName:this.dependenciesName,dependencyArrows:!this.hideDependencyArrows,dependencyColor:this.dependencyColor,barLabels:this.barLabels,locale:this.options?.locale}),t=this.today,n=t===!1?null:t===!0?this.mountedAt:t instanceof Date?t.getTime():t,r=n===null?[]:[{type:`line`,axis:`y`,value:n,color:`var(--danger-color, #dc2626)`,dash:[4,3],label:this.todayLabel}],i=this.options??{};return{...i,series:e.series,orientation:`horizontal`,xAxis:{type:`category`,categories:e.categories,...i.xAxis},yAxis:{type:`time`,min:e.domain[0],max:e.domain[1],...i.yAxis},annotations:[...i.annotations??[],...r],dependencies:e.dependencies,interaction:i.interaction??{zoom:`y`},legend:i.legend??e.series.length>1}}},R([v({attribute:!1})],tl.prototype,`tasks`,void 0),R([v({attribute:!1})],tl.prototype,`colors`,void 0),R([v({attribute:`task-name`})],tl.prototype,`taskName`,void 0),R([v({attribute:`progress-name`})],tl.prototype,`progressName`,void 0),R([v({attribute:`milestone-name`})],tl.prototype,`milestoneName`,void 0),R([v({attribute:`dependencies-name`})],tl.prototype,`dependenciesName`,void 0),R([v({type:Boolean,attribute:`hide-dependency-arrows`})],tl.prototype,`hideDependencyArrows`,void 0),R([v({attribute:`dependency-color`})],tl.prototype,`dependencyColor`,void 0),R([v({attribute:`bar-labels`,converter:{fromAttribute:e=>e===null||e===`auto`?void 0:e===`false`?!1:e!==`inside`||`inside`}})],tl.prototype,`barLabels`,void 0),R([v({attribute:!1})],tl.prototype,`formatProgress`,void 0),R([v({attribute:!1})],tl.prototype,`today`,void 0),R([v({attribute:`today-label`})],tl.prototype,`todayLabel`,void 0),R([v({attribute:!1})],tl.prototype,`options`,void 0)})))()}var rl,il,al,ol,sl,cl,ll,ul,dl;function fl(){return(fl=e((()=>{Gc(),f(),rl=class extends Lc{constructor(...e){super(...e),this.align=`justify`,this.linkColor=`gradient`,this.hideLabels=!1}static{this.tagName=`minerva-sankey-chart`}get defaultHeight(){return 360}engineOptions(){let e=this.links??this.options?.links;return e?{...this.options,type:`sankey`,nodes:this.nodes??this.options?.nodes,links:e,align:this.align,linkColor:this.linkColor,labels:!this.hideLabels&&this.options?.labels}:null}},R([v({attribute:!1})],rl.prototype,`nodes`,void 0),R([v({attribute:!1})],rl.prototype,`links`,void 0),R([v()],rl.prototype,`align`,void 0),R([v({attribute:`link-color`})],rl.prototype,`linkColor`,void 0),R([v({type:Boolean,attribute:`hide-labels`})],rl.prototype,`hideLabels`,void 0),R([v({attribute:!1})],rl.prototype,`options`,void 0),il=class extends Lc{constructor(...e){super(...e),this.innerRadius=.26,this.labels=`auto`,this.noDrill=!1}static{this.tagName=`minerva-sunburst-chart`}get defaultHeight(){return 360}bindEngine(e){return[...super.bindEngine(e),e.on(`drill`,e=>this.emit(`minerva-drill`,e))]}drill(e){this.instance?.drill(e)}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`sunburst`,data:e,innerRadius:this.innerRadius,labels:this.labels,drill:!this.noDrill&&this.options?.drill,drillPath:this.drillPath??this.options?.drillPath}:null}},R([v({attribute:!1})],il.prototype,`data`,void 0),R([v({type:Number,attribute:`inner-radius`})],il.prototype,`innerRadius`,void 0),R([v()],il.prototype,`labels`,void 0),R([v({type:Boolean,attribute:`no-drill`})],il.prototype,`noDrill`,void 0),R([v({attribute:!1})],il.prototype,`drillPath`,void 0),R([v({attribute:!1})],il.prototype,`options`,void 0),al=class extends Lc{constructor(...e){super(...e),this.innerRadius=.3,this.sweep=270}static{this.tagName=`minerva-radial-bar-chart`}get defaultHeight(){return 300}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`radialBar`,data:e,max:this.max??this.options?.max,innerRadius:this.innerRadius,sweep:this.sweep,centerValue:this.centerValue??this.options?.centerValue,centerLabel:this.centerLabel??this.options?.centerLabel}:null}},R([v({attribute:!1})],al.prototype,`data`,void 0),R([v({type:Number})],al.prototype,`max`,void 0),R([v({type:Number,attribute:`inner-radius`})],al.prototype,`innerRadius`,void 0),R([v({type:Number})],al.prototype,`sweep`,void 0),R([v({attribute:`center-value`})],al.prototype,`centerValue`,void 0),R([v({attribute:`center-label`})],al.prototype,`centerLabel`,void 0),R([v({attribute:!1})],al.prototype,`options`,void 0),ol=e=>(e instanceof Date?e:new Date(e)).getFullYear(),sl=e=>(e instanceof Date?e:new Date(e)).getTime(),cl=e=>{if(!Array.isArray(e))return 1;let[t,n]=e,r=ol(t),i=ol(n),a=(sl(n)-sl(t))/864e5+1;return i>r&&a>371?i-r+1:1},ll=class extends Lc{constructor(...e){super(...e),this.layout=`weeks`,this.levels=4}static{this.tagName=`minerva-calendar-heatmap`}get defaultHeight(){if(this.layout===`months`)return 560;let e=this.options?.legend===!1?0:34;return cl(this.range??this.options?.range)*120+e+16}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`calendarHeatmap`,data:e,range:this.range??this.options?.range,layout:this.layout,locale:this.locale??this.options?.locale,color:this.color??this.options?.color,levels:this.levels}:null}},R([v({attribute:!1})],ll.prototype,`data`,void 0),R([v({attribute:!1})],ll.prototype,`range`,void 0),R([v()],ll.prototype,`layout`,void 0),R([v()],ll.prototype,`locale`,void 0),R([v()],ll.prototype,`color`,void 0),R([v({type:Number})],ll.prototype,`levels`,void 0),R([v({attribute:!1})],ll.prototype,`options`,void 0),ul=class extends Lc{constructor(...e){super(...e),this.orientation=`horizontal`}static{this.tagName=`minerva-bullet-chart`}get defaultHeight(){if(this.orientation===`vertical`)return 320;let e=(this.data??this.options?.data??[]).length;return Math.max(96,e*64+16)+(this.options?.legend?34:0)}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`bullet`,data:e,orientation:this.orientation,ranges:this.ranges??this.options?.ranges,rangeLabels:this.rangeLabels??this.options?.rangeLabels,targetColor:this.targetColor??this.options?.targetColor}:null}},R([v({attribute:!1})],ul.prototype,`data`,void 0),R([v()],ul.prototype,`orientation`,void 0),R([v({attribute:!1})],ul.prototype,`ranges`,void 0),R([v({attribute:!1})],ul.prototype,`rangeLabels`,void 0),R([v({attribute:`target-color`})],ul.prototype,`targetColor`,void 0),R([v({attribute:!1})],ul.prototype,`options`,void 0),dl=class extends Lc{constructor(...e){super(...e),this.directed=!1,this.ribbonColor=`gradient`,this.labels=`auto`}static{this.tagName=`minerva-chord-chart`}get defaultHeight(){return 420}engineOptions(){let e=this.links??this.options?.links,t=this.matrix??this.options?.matrix;return!e&&!t?null:{...this.options,type:`chord`,groups:this.groups??this.options?.groups,matrix:t,links:e,directed:this.directed||this.options?.directed,ribbonColor:this.ribbonColor,labels:this.labels,tickFormat:this.tickFormat??this.options?.tickFormat}}},R([v({attribute:!1})],dl.prototype,`groups`,void 0),R([v({attribute:!1})],dl.prototype,`matrix`,void 0),R([v({attribute:!1})],dl.prototype,`links`,void 0),R([v({type:Boolean})],dl.prototype,`directed`,void 0),R([v({attribute:`ribbon-color`})],dl.prototype,`ribbonColor`,void 0),R([v()],dl.prototype,`labels`,void 0),R([v({attribute:!1})],dl.prototype,`tickFormat`,void 0),R([v({attribute:!1})],dl.prototype,`options`,void 0)})))()}function pl(e){return _l.add(e),!vl&&typeof MutationObserver<`u`&&(vl=new MutationObserver(()=>{for(let e of[..._l])e()}),vl.observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`],subtree:!0})),()=>{_l.delete(e),_l.size===0&&(vl?.disconnect(),vl=null)}}var ml,hl,gl,_l,vl,$;function yl(){return(yl=e((()=>{F(),dr(),gi(),E(),I(),A(),gn(),fa(),yi(),Vr(),d(),f(),g(),wt(),ml=(e,t)=>Number.isFinite(e)&&e>0?e:t,hl=e=>e===`dark`||e===`github-dark`?`dark`:e===`light`?`light`:void 0,gl=e=>typeof e?.editor?.create==`function`,_l=new Set,vl=null,$=class e extends Yn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.language=`plaintext`,this.label=``,this.height=420,this.minHeight=160,this.maxHeight=800,this.loadTimeout=1e4,this.status=`loading`,this.scopeTheme=`light`,this.locale=new D(this),this.editor=null,this.engine=null,this.container=null,this.subscriptions=[],this.applying=!1,this.edited=!1,this.dirty=!1,this.unobserveTheme=null,this.started=!1}static{this.tagName=`minerva-code-editor`}static{this.dependencies=[da,Ni]}static{this.styles=[k,S`
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
`,T(ti)]}get resolvedTheme(){return this.theme===`dark`||this.theme===`light`?this.theme:this.scopeTheme}focus(e){this.editor?this.editor.focus():this.fallback?.focus(e)}retry(){this.load()}getFormValue(){return this.value}getValidity(){return this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.fallback??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}connectedCallback(){super.connectedCallback(),this.syncScopeTheme(),this.unobserveTheme=pl(()=>this.syncScopeTheme()),this.started&&this.load()}disconnectedCallback(){super.disconnectedCallback(),this.unobserveTheme?.(),this.unobserveTheme=null,this.teardown()}syncScopeTheme(){let e=ln(this,`[data-theme]`);this.scopeTheme=hl(e?.getAttribute(`data-theme`))??`light`}get monacoTheme(){return this.resolvedTheme===`dark`?`vs-dark`:`vs`}teardown(){clearTimeout(this.timer),this.timer=void 0;for(let e of this.subscriptions)e.dispose();this.subscriptions=[];try{this.editor?.dispose()}catch{}this.editor=null,this.engine=null,this.container?.remove(),this.container=null}fail(){let e=this.status===`error`;this.teardown(),this.status=`error`,e||this.emit(`minerva-error`)}load(){this.teardown(),this.status=`loading`,this.isConnected&&(this.timer=setTimeout(()=>this.fail(),this.loadTimeout),this.monaco!==void 0&&this.mount())}mount(){let t=this.monaco;if(!gl(t)){j&&L(e.tagName,'`monaco` is not a Monaco engine (expected `import * as monaco from "monaco-editor"`); showing the textarea fallback.'),this.fail();return}let n=document.createElement(`div`);n.slot=`editor`,n.setAttribute(`data-minerva-code-editor`,``),this.append(n),this.container=n;try{t.editor.setTheme(this.monacoTheme);let e=t.editor.create(n,{value:this.value,language:this.language,theme:this.monacoTheme,readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label,automaticLayout:!0,minimap:{enabled:!1},wordWrap:`on`,scrollBeyondLastLine:!1});this.editor=e,this.engine=t,this.subscriptions.push(e.onDidChangeModelContent(()=>this.handleEdit()),e.onDidBlurEditorText(()=>this.commit()))}catch{this.fail();return}clearTimeout(this.timer),this.timer=void 0,this.status=`mounted`}handleEdit(){let e=this.editor;e&&!this.applying&&(this.isDisabled||(this.value=e.getValue(),this.dirty=!0,this.edited=!0,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:this.value})))}commit(){this.edited&&(this.edited=!1,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}handleFallbackInput(e){this.isDisabled||(this.value=e.target.value,this.dirty=!0,this.edited=!0,this.emit(`minerva-input`,{value:this.value}))}applyValue(){let e=this.editor;if(e&&e.getValue()!==this.value){this.applying=!0;try{let t=e.getModel();this.isDisabled||!t?e.setValue(this.value):(e.executeEdits(``,[{range:t.getFullModelRange(),text:this.value,forceMoveMarkers:!0}]),e.pushUndoStop())}finally{this.applying=!1}}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){if(super.updated(t),!this.started){this.started=!0,j&&!this.label&&L(e.tagName,`set label: it is the visible label and the accessible name of the editor.`),this.load();return}if(t.has(`monaco`)&&t.get(`monaco`)!==void 0){this.load();return}t.has(`monaco`)&&this.monaco!==void 0&&!this.editor&&(this.status===`loading`&&this.timer!==void 0?this.mount():this.status===`error`&&this.load());let n=this.editor,r=this.engine;if(n&&r)try{t.has(`value`)&&this.applyValue(),t.has(`language`)&&r.editor.setModelLanguage(n.getModel(),this.language),(t.has(`disabled`)||t.has(`formDisabled`)||t.has(`label`))&&n.updateOptions({readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label}),(t.has(`theme`)||t.has(`scopeTheme`))&&r.editor.setTheme(this.monacoTheme)}catch{this.fail()}}hookStates(){return{disabled:this.isDisabled,loading:this.status===`loading`}}render(){let e=ml(this.minHeight,160),t=Math.max(e,ml(this.maxHeight,800)),n=Math.min(t,Math.max(e,ml(this.height,420))),r=this.locale.t,i=this.status;return h`<div
part="root"
class="root"
role="group"
aria-label=${this.label||m}
>
<label
part="label"
class="label"
for=${i===`error`?`fallback`:m}
@click=${()=>this.editor?.focus()}
>${this.label}</label
>
<div
part="surface"
class="surface"
style=${x({height:`${n}px`})}
aria-busy=${i===`loading`?`true`:`false`}
>
${i===`error`?h`<div part="error" class="error">
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
                      >${nn}</span
                    >
                    ${this.retryText??r(`monacoCodeEditor.retry`)}
                  </minerva-button>
                </div>
                <textarea
                  id="fallback"
                  part="fallback"
                  class="fallback"
                  aria-label=${this.label||m}
                  spellcheck="false"
                  .value=${St(this.value)}
                  ?disabled=${this.isDisabled}
                  @input=${this.handleFallbackInput}
                  @change=${()=>this.commit()}
                ></textarea>`:h`${i===`loading`?h`<div part="loading" class="loading" role="status">
<minerva-progress
size="small"
aria-label=${this.loadingLabel??r(`monacoCodeEditor.loading`)}
></minerva-progress>
</div>`:m}<slot name="editor"></slot>`}
</div>
</div>`}},R([v({attribute:!1})],$.prototype,`monaco`,void 0),R([v({attribute:!1})],$.prototype,`value`,void 0),R([v({attribute:`value`})],$.prototype,`defaultValue`,void 0),R([v({reflect:!0})],$.prototype,`language`,void 0),R([v()],$.prototype,`label`,void 0),R([v({type:Number})],$.prototype,`height`,void 0),R([v({type:Number,attribute:`min-height`})],$.prototype,`minHeight`,void 0),R([v({type:Number,attribute:`max-height`})],$.prototype,`maxHeight`,void 0),R([v({reflect:!0})],$.prototype,`theme`,void 0),R([v({type:Number,attribute:`load-timeout`})],$.prototype,`loadTimeout`,void 0),R([v({attribute:`unavailable-text`})],$.prototype,`unavailableText`,void 0),R([v({attribute:`retry-text`})],$.prototype,`retryText`,void 0),R([v({attribute:`retry-label`})],$.prototype,`retryLabel`,void 0),R([v({attribute:`loading-label`})],$.prototype,`loadingLabel`,void 0),R([p()],$.prototype,`status`,void 0),R([p()],$.prototype,`scopeTheme`,void 0),R([y(`textarea`)],$.prototype,`fallback`,void 0)})))()}var bl,xl,Sl,Cl,wl,Tl,El,Dl;function Ol(){return(Ol=e((()=>{hc(),f(),Ht(),bl=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},xl=(e,t)=>{let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&e[n]===t[n])},Sl=(e,t)=>e===t?!0:Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):bl(e)&&bl(t)&&xl(e,t),Cl=(e,t)=>{let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&Sl(e[n],t[n]))},wl=class extends mc{constructor(...e){super(...e),this.height=480,this.edgeColor=`neutral`,this.arrowStyle=`open`,this.previous=null}createEngine(e,t){return this.previous=t,Bt(e,t)}engineOptions(){return!this.nodes||!this.edges?null:{...this.options,nodes:this.nodes,edges:this.edges,groups:this.groups,...this.layoutOptions(),nodeShape:this.nodeShape??this.options?.nodeShape,edgeStyle:this.edgeStyle??this.options?.edgeStyle,edgeColor:this.edgeColor,arrowStyle:this.arrowStyle,highlight:this.highlight??this.options?.highlight,locale:this.locale??this.options?.locale,selected:this.selected??this.options?.selected}}syncEngine(e){let t=this.engineOptions();!t||this.previous&&Cl(this.previous,t)||(this.previous=t,e.setOptions(t))}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-item-click`,e)),e.on(`select`,e=>this.emit(`minerva-selection-change`,{ids:e.ids})),e.on(`toggle`,e=>this.emit(`minerva-toggle`,e)),e.on(`groupToggle`,e=>this.emit(`minerva-group-toggle`,e)),e.on(`layoutEnd`,e=>this.emit(`minerva-layout-end`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}fit(e){this.instance?.fit(e)}focusNode(e,t){this.instance?.focusNode(e,t)}setData(e){this.instance?.setData(e)}select(e){this.instance?.select(e)}getSelection(){return this.instance?.getSelection()??[]}expand(e){this.instance?.expand(e)}collapse(e){this.instance?.collapse(e)}toggle(e){this.instance?.toggle(e)}getPositions(){return this.instance?.getPositions()??{}}relayout(){this.instance?.relayout()}getRenderer(){return this.instance?.getRenderer()??null}},R([v()],wl.prototype,`height`,void 0),R([v({attribute:!1})],wl.prototype,`nodes`,void 0),R([v({attribute:!1})],wl.prototype,`edges`,void 0),R([v({attribute:!1})],wl.prototype,`groups`,void 0),R([v({attribute:`node-shape`})],wl.prototype,`nodeShape`,void 0),R([v({attribute:`edge-style`})],wl.prototype,`edgeStyle`,void 0),R([v({attribute:`edge-color`})],wl.prototype,`edgeColor`,void 0),R([v({attribute:`arrow-style`})],wl.prototype,`arrowStyle`,void 0),R([v()],wl.prototype,`highlight`,void 0),R([v()],wl.prototype,`locale`,void 0),R([v({attribute:!1})],wl.prototype,`selected`,void 0),R([v({attribute:!1})],wl.prototype,`options`,void 0),Tl=class extends wl{constructor(...e){super(...e),this.layout=`force`}static{this.tagName=`minerva-graph-chart`}layoutOptions(){return{layout:this.layout,direction:this.direction??this.options?.direction,force:this.options?.force,circular:this.options?.circular,dag:this.options?.dag,tree:this.options?.tree}}},R([v()],Tl.prototype,`layout`,void 0),R([v()],Tl.prototype,`direction`,void 0),El=class extends wl{constructor(...e){super(...e),this.direction=`TB`}static{this.tagName=`minerva-dependency-graph`}layoutOptions(){let e=this.options?.dag,t=this.criticalPath;return{layout:`dag`,direction:this.direction,dag:t===void 0?e:{...e,criticalPath:t}}}},R([v()],El.prototype,`direction`,void 0),R([v({type:Boolean,attribute:`critical-path`})],El.prototype,`criticalPath`,void 0),Dl=class extends wl{constructor(...e){super(...e),this.layout=`tree`,this.direction=`LR`}static{this.tagName=`minerva-tree-chart`}layoutOptions(){return{layout:this.layout,direction:this.layout===`tree`?this.direction:void 0,tree:this.options?.tree}}},R([v()],Dl.prototype,`layout`,void 0),R([v()],Dl.prototype,`direction`,void 0)})))()}var kl,Al,jl;function Ml(){return(Ml=e((()=>{Jr(),Xt(),kl=new Set(Zt),Al=e=>e&&kl.has(e)?e:null,jl=class{constructor(e,t){this.kind=null,this.host=e,this.changed=t}get current(){return this.kind}report(e){this.kind!==e&&(this.kind=e,Dn(this.host,`data-renderer`,e),this.changed(e))}clear(){this.kind&&(this.kind=null,Dn(this.host,`data-renderer`,null))}}})))()}var Nl,Pl,Fl,Il;function Ll(){return(Ll=e((()=>{F(),I(),Ml(),d(),f(),g(),Ot(),en(),Qt(),Nl=24,Pl=2,Fl=(e,t)=>typeof e==`number`&&Number.isFinite(e)&&e>0?e:t,Il=class e extends C{constructor(...e){super(...e),this.size=24,this.color=`currentColor`,this.strokeWidth=2,this.absoluteStrokeWidth=!1,this.renderer=`svg`,this.surface=null,this.surfaceCanvas=null,this.drawn=new jl(this,e=>this.emit(`minerva-renderer-change`,{renderer:e}))}static{this.tagName=`minerva-icon`}static{this.styles=[k,S`
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
`]}getRenderer(){return this.drawn.current}definition(){if(this.icon)return this.icon;if(!this.name)return;let t=$t(this.name);return!t&&j&&L(e.tagName,`unknown icon name "${this.name}": nothing is rendered (see icons of minerva-design/icons/core).`),t}disconnectedCallback(){super.disconnectedCallback(),this.releaseSurface()}updated(e){super.updated(e),this.syncSurface()}syncSurface(){let e=this.renderRoot.querySelector(`canvas[part=icon]`),t=this.definition(),n=Al(this.renderer);if(!this.isConnected||!e||!t||!n){this.releaseSurface();return}this.surfaceCanvas!==e&&this.releaseSurface();let r=Fl(this.size,Nl),i=Fl(this.strokeWidth,Pl),a={icon:t,size:r,color:this.color||`currentColor`,strokeWidth:this.absoluteStrokeWidth?i*24/r:i,renderer:n,onRendererChange:e=>this.drawn.report(e)};this.surface?this.surface.update(a):(this.surface=tn(e,a),this.surfaceCanvas=e)}releaseSurface(){this.surface?.destroy(),this.surface=null,this.surfaceCanvas=null,this.drawn.clear()}render(){let e=this.definition();if(!e)return m;let t=Fl(this.size,Nl),n=this.label||void 0;if(Al(this.renderer))return h`<canvas
part="icon"
data-icon=${e.name}
role=${Et(n&&`img`)}
aria-label=${Et(n)}
aria-hidden=${Et(n?void 0:`true`)}
style=${x({width:`${t}px`,height:`${t}px`})}
></canvas>`;let r=this.absoluteStrokeWidth?`non-scaling-stroke`:void 0;return h`<svg
part="icon"
xmlns="http://www.w3.org/2000/svg"
width=${t}
height=${t}
viewBox="0 0 24 24"
fill="none"
stroke=${this.color||`currentColor`}
stroke-width=${Fl(this.strokeWidth,Pl)}
stroke-linecap="round"
stroke-linejoin="round"
data-icon=${e.name}
role=${Et(n&&`img`)}
aria-label=${Et(n)}
aria-hidden=${Et(n?void 0:`true`)}
>
${n?_t`<title>${n}</title>`:m}
${e.paths.map((t,n)=>_t`<path d=${t} stroke=${Et(e.colors?.[n])} vector-effect=${Et(r)}></path>`)}
</svg>`}},R([v()],Il.prototype,`name`,void 0),R([v({attribute:!1})],Il.prototype,`icon`,void 0),R([v({type:Number})],Il.prototype,`size`,void 0),R([v()],Il.prototype,`color`,void 0),R([v({type:Number,attribute:`stroke-width`})],Il.prototype,`strokeWidth`,void 0),R([v({type:Boolean,attribute:`absolute-stroke-width`})],Il.prototype,`absoluteStrokeWidth`,void 0),R([v()],Il.prototype,`label`,void 0),R([v()],Il.prototype,`renderer`,void 0)})))()}var Rl,zl,Bl,Vl,Hl;function Ul(){return(Ul=e((()=>{I(),Ml(),d(),f(),g(),Ot(),Jt(),Rl=e=>typeof e==`number`&&Number.isFinite(e)&&e>0?e:void 0,zl=(e,t)=>typeof e==`number`?Number.isFinite(e)&&e>=0?`${e}px`:t:e?.trim()||t,Bl={fromAttribute:e=>e===null?void 0:/^\s*\d+(\.\d+)?\s*$/.test(e)?Number(e):e,toAttribute:e=>e===void 0?null:String(e)},Vl=[`renderer`,`pixelRatio`],Hl=class extends C{constructor(...e){super(...e),this.items=[],this.renderer=`auto`,this.width=`100%`,this.height=240,this.controller=null,this.drawn=new jl(this,e=>this.emit(`minerva-renderer-change`,{renderer:e}))}static{this.tagName=`minerva-icon-canvas`}static{this.styles=[k,S`
:host{
display: block;
position: relative;
}
.surface{
position: relative;
max-width: 100%;
}
`]}get canvas(){return this.controller?.canvas??null}getRenderer(){return this.controller?.renderer??null}async ready(){if(await this.updateComplete,!this.controller)throw Error(`<minerva-icon-canvas> is not connected`);return this.controller.ready()}settings(){return{renderer:Al(this.renderer)??`auto`,pixelRatio:Rl(this.pixelRatio)}}disconnectedCallback(){super.disconnectedCallback(),this.controller?.destroy(),this.controller=null,this.drawn.clear()}updated(e){if(super.updated(e),!this.controller){this.mount();return}e.has(`items`)&&this.controller.setItems(this.items??[]),Vl.some(t=>e.has(t))&&this.controller.setOptions(this.settings())}mount(){if(this.controller||!this.isConnected)return;let e=this.renderRoot.querySelector(`[part=surface]`);e&&(this.controller=Yt(e,{...this.settings(),items:this.items??[],onRendererChange:e=>this.drawn.report(e)}))}render(){let e=this.label||void 0;return h`<div
part="surface"
class="surface"
role=${Et(e&&`img`)}
aria-label=${Et(e)}
aria-hidden=${Et(e?void 0:`true`)}
style=${x({width:zl(this.width,`100%`),height:zl(this.height,`240px`)})}
></div>`}},R([v({attribute:!1})],Hl.prototype,`items`,void 0),R([v()],Hl.prototype,`renderer`,void 0),R([v({converter:Bl})],Hl.prototype,`width`,void 0),R([v({converter:Bl})],Hl.prototype,`height`,void 0),R([v({type:Number,attribute:`pixel-ratio`})],Hl.prototype,`pixelRatio`,void 0),R([v()],Hl.prototype,`label`,void 0)})))()}export{gc as $,Bi as $n,ko as $t,Vc as A,xa as An,xs as At,Ac as B,la as Bn,ns as Bt,Zc as C,Va as Cn,Rs as Ct,$c as D,W as Dn,Ts as Dt,Jc as E,Fa as En,ys as Et,zc as F,Ta as Fn,ss as Ft,Nc as G,$i as Gn,J as Gt,Pc as H,ia as Hn,Qo as Ht,Bc as I,Ca as In,is as It,Cc as J,V as Jn,Uo as Jt,Mc as K,Qi as Kn,Ko as Kt,Uc as L,fa as Ln,rs as Lt,Lc as M,Sa as Mn,vs as Mt,Gc as N,ya as Nn,ds as Nt,el as O,Na as On,_s as Ot,Hc as P,Da as Pn,cs as Pt,bc as Q,z as Qn,Mo as Qt,Q as R,da as Rn,as as Rt,qc as S,Wa as Sn,Es as St,Yc as T,Ia as Tn,gs as Tt,Ic as U,ta as Un,Y as Ut,jc as V,aa as Vn,Zo as Vt,Oc as W,na as Wn,Jo as Wt,wc as X,B as Xn,Po as Xt,Sc as Y,qi as Yn,Fo as Yt,_c as Z,Gi as Zn,No as Zt,ll as _,K as _n,Us as _t,wl as a,_o as an,dc as at,tl as b,qa as bn,zs as bt,Tl as c,q as cn,sc as ct,$ as d,uo as dn,ic as dt,Ao as en,xc as et,yl as f,lo as fn,X as ft,fl as g,eo as gn,Js as gt,il as h,co as hn,Zs as ht,Il as i,xo as in,hc as it,Wc as j,Ea as jn,hs as jt,Rc as k,wa as kn,ms as kt,Cl as l,ho as ln,cc as lt,dl as m,Xa as mn,Qs as mt,Ul as n,To as nn,yc as nt,Dl as o,vo as on,fc as ot,al as p,so as pn,ec as pt,kc as q,ea as qn,Ho as qt,Ll as r,So as rn,mc as rt,Ol as s,yo as sn,uc as st,Hl as t,wo as tn,vc as tt,El as u,go as un,Z as ut,rl as v,Ya as vn,qs as vt,nl as w,Ha as wn,ps as wt,Kc as x,G as xn,Vs as xt,ul as y,Ja as yn,Hs as yt,Dc as z,U as zn,ts as zt};