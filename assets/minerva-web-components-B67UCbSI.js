import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{_ as t,g as n,h as r,m as i}from"./native-preview-C-OsNMso.js";import{D as a,Dt as o,E as s,Et as c,H as ee,It as te,L as ne,N as re,O as ie,Ot as ae,Pt as oe,T as se,Tt as ce,Ut as le,Wt as ue,Y as de,Yt as fe,Z as pe,Zt as me,a as he,b as ge,c as _e,ct as ve,en as ye,et as be,ft as xe,gt as Se,h as Ce,in as we,j as Te,k as Ee,ln as De,mt as Oe,n as ke,ot as Ae,pt as je,qt as Me,rt as Ne,s as Pe,t as Fe,tn as Ie,tt as Le,un as Re,v as ze,vt as Be,x as Ve,y as He,zt as Ue}from"./angular-preview-l4x8c_2r.js";import{A as l,B as We,D as u,E as d,I as f,N as Ge,_ as p,a as Ke,b as m,d as qe,g as h,i as Je,j as g,l as Ye,m as Xe,n as Ze,p as Qe,s as $e,t as et,u as tt,v as _,w as v,x as y,z as nt}from"./minerva-web-components-Csj0uz1j.js";import{A as rt,E as it,F as at,M as ot,O as st,P as ct,T as lt,_ as ut,b as dt,g as ft,h as pt,n as mt,t as ht,w as gt}from"./angular-preview-CI0B6PFx.js";import{n as _t,t as vt}from"./angular-preview-5GnFm1kW.js";import{n as yt,t as bt}from"./angular-preview-BoauqfM1.js";import{$t as xt,An as St,Ar as b,At as Ct,Bn as wt,Bt as Tt,Cn as Et,Cr as x,Ct as Dt,Dn as Ot,Dr as kt,Dt as At,En as jt,Er as Mt,Et as Nt,Fn as Pt,Gn as S,Gt as Ft,Hn as It,Ht as Lt,Jn as Rt,Jt as zt,Kn as Bt,Kt as Vt,Ln as Ht,Lt as Ut,Mn as Wt,Mt as Gt,Nt as Kt,On as qt,Or as Jt,Ot as Yt,Pn as Xt,Pt as Zt,Qn as Qt,Qt as $t,Rn as en,Rt as tn,Sn as nn,Sr as C,St as rn,Tr as an,Tt as on,Un as sn,Ut as cn,Vn as ln,Vt as un,Wn as dn,Wt as fn,Xn as pn,Xt as mn,Yn as hn,Yt as gn,Zn as _n,Zt as vn,_n as yn,_r as bn,_t as xn,an as Sn,bn as w,br as Cn,bt as wn,cn as Tn,cr as T,ct as En,d as Dn,dn as On,dr as E,dt as kn,en as An,f as jn,fn as Mn,fr as D,ft as Nn,gn as Pn,gr as Fn,gt as In,hn as Ln,hr as O,ht as Rn,in as zn,it as Bn,jn as Vn,jt as Hn,kn as Un,kr as k,kt as Wn,ln as Gn,lr as Kn,lt as qn,mn as Jn,mr as A,mt as Yn,n as Xn,nn as Zn,nr as Qn,nt as $n,on as er,or as j,pn as tr,pr as M,pt as nr,qt as rr,rn as ir,rt as ar,sn as or,sr as N,st as sr,t as cr,tn as lr,tr as ur,tt as dr,un as fr,ur as pr,ut as mr,vn as hr,vr as gr,vt as _r,wr as vr,wt as yr,xn as P,xr as F,xt as br,yn as xr,yr as Sr,yt as Cr,zn as wr,zt as Tr}from"./minerva-web-components-D0VRgADK.js";import{t as I}from"./minerva-web-components-D61_qRVd.js";import{_ as Er,c as Dr,d as Or,f as kr,g as Ar,h as jr,l as Mr,m as Nr,p as Pr,s as Fr,u as Ir}from"./minerva-web-components-CxmyLSbm.js";import{Bt as Lr,Gt as Rr,Kt as zr,Lt as Br,Rt as Vr,Ut as Hr,Wt as Ur,qt as Wr,zt as Gr}from"./minerva-web-components-BAkJLLYJ.js";var Kr,qr,L;function Jr(){return(Jr=e((()=>{pr(),k(),j(),S(),F(),O(),D(),w(),u(),m(),p(),Xe(),se(),Kr={info:Xt,success:Et,warning:Pt,danger:Qn},qr=[`slideIn`,`fadeIn`,`bounce`,`zoom`],L=class e extends M{constructor(...e){super(...e),this.color=`info`,this.variant=`subtle`,this.size=`medium`,this.heading=``,this.hideIcon=!1,this.closable=!1,this.noAnimation=!1,this.animationName=`slideIn`,this.banner=!1,this.elevation=!1,this.square=!1,this.collapsible=!1,this.collapsed=!1,this.locale=new C(this),this.aria=new b(this),this.slots=new E(this)}static{this.tagName=`minerva-alert`}static{this.styles=[A,f`
:host{
display: block;
}
.icon svg,
.expandButton svg,
.closeButton svg{
display: block;
}
`,P(Kn)]}get hasHeading(){return!!this.heading||this.slots.test(`heading`)}handleExpand(){let e=this.collapsed;this.emit(`minerva-expanded-change`,{expanded:e},{cancelable:!0})&&(this.collapsed=!e)}handleClose(){let e=this.adjacentTabbable(),t=this.parentElement;this.emit(`minerva-close`,{},{cancelable:!0})&&(this.isFocusInsideOrLost()&&this.moveFocusOut(e,t),this.hidden=!0)}isFocusInsideOrLost(){let e=this.ownerDocument,t=Fe(e);return!t||t===e.body||!t.isConnected||ne(this,t)}adjacentTabbable(){let e=s(this.ownerDocument.body),t=e.map((e,t)=>ne(this,e)?t:-1).filter(e=>e>=0);if(!t.length)return null;let n=e=>!ne(this,e)&&ze(e);return e.slice(t[t.length-1]+1).find(n)??e.slice(0,t[0]).filter(n).pop()??null}moveFocusOut(e,t){let n=typeof this.returnFocus==`function`?this.returnFocus():this.returnFocus;n?.isConnected&&Pe(n)||e?.isConnected&&Pe(e)||this.focusContainer(t)}focusContainer(e){let t=this.ownerDocument;if(e?.isConnected){for(let n=e;n&&n!==t.body;n=n.parentElement)if(n.hasAttribute(`tabindex`)&&Pe(n))return;e!==t.body&&e!==t.documentElement&&(e.setAttribute(`tabindex`,`-1`),e.addEventListener(`blur`,()=>{e.getAttribute(`tabindex`)===`-1`&&e.removeAttribute(`tabindex`)},{once:!0}),Pe(e,{preventScroll:!0}))}}updated(){T&&this.collapsible&&!this.hasHeading&&N(e.tagName,`collapsible needs a heading (the toggle lives in the title): set heading or fill the heading slot.`)}hookStates(){return{state:this.collapsible&&this.hasHeading?this.collapsed?`closed`:`open`:void 0,size:this.size,variant:this.variant,color:this.color}}render(){let e=this.locale.t,t=this.hasHeading,n=this.collapsible&&t,r=!this.collapsed,i=this.slots.test(`[default]`),a=!this.noAnimation,o=this.borderRadius,s=this.alertRole??(this.color===`danger`||this.color===`warning`?`alert`:`status`);return g`<div
part="root"
class=${_({alert:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,withIcon:!this.hideIcon,withTitle:t,banner:this.banner,withAnimation:a,[`animation-${this.animationName}`]:a&&qr.includes(this.animationName),withElevation:this.elevation,rounded:!this.square,expanded:r,collapsible:n})}
style=${h({borderRadius:o==null||o===``?void 0:/^\d+(\.\d+)?$/.test(String(o))?`${o}px`:String(o)})}
role=${s}
aria-label=${this.aria.label??l}
>
${this.hideIcon?l:g`<span
part="icon"
class="icon"
role="img"
aria-label=${this.iconLabel??e(`alert.icon.${this.color}`)}
><slot name="icon">${Kr[this.color]??Kr.info}</slot></span
>`}
<div class="content">
${t?g`<div class="title" part="title">
<slot name="heading">${this.heading}</slot>
${n?g`<button
type="button"
part="trigger"
class="expandButton"
aria-label=${r?this.collapseLabel??e(`alert.collapse`):this.expandLabel??e(`alert.expand`)}
aria-expanded=${String(r)}
aria-controls=${r&&i?`message`:l}
@click=${this.handleExpand}
>
${r?_n:ln}
</button>`:l}
</div>`:l}
${i&&(!n||r)?g`<div id="message" class="message" part="description">
<slot></slot>
</div>`:l}
</div>
${this.slots.test(`action`)?g`<div class="action" part="action">
<slot name="action"></slot>
</div>`:l}
${this.closable?g`<button
type="button"
part="close-button"
class="closeButton"
aria-label=${this.closeLabel??e(`alert.close`)}
@click=${this.handleClose}
>
<slot name="close-icon">${Qt}</slot>
</button>`:l}
</div>`}},I([d({reflect:!0})],L.prototype,`color`,void 0),I([d({reflect:!0})],L.prototype,`variant`,void 0),I([d({reflect:!0})],L.prototype,`size`,void 0),I([d()],L.prototype,`heading`,void 0),I([d({type:Boolean,attribute:`hide-icon`})],L.prototype,`hideIcon`,void 0),I([d({type:Boolean,reflect:!0})],L.prototype,`closable`,void 0),I([d({type:Boolean,attribute:`no-animation`})],L.prototype,`noAnimation`,void 0),I([d({attribute:`animation-name`})],L.prototype,`animationName`,void 0),I([d({type:Boolean,reflect:!0})],L.prototype,`banner`,void 0),I([d({type:Boolean,reflect:!0})],L.prototype,`elevation`,void 0),I([d({type:Boolean,reflect:!0})],L.prototype,`square`,void 0),I([d({attribute:`border-radius`})],L.prototype,`borderRadius`,void 0),I([d({type:Boolean,reflect:!0})],L.prototype,`collapsible`,void 0),I([d({type:Boolean,reflect:!0})],L.prototype,`collapsed`,void 0),I([d({attribute:`close-label`})],L.prototype,`closeLabel`,void 0),I([d({attribute:`expand-label`})],L.prototype,`expandLabel`,void 0),I([d({attribute:`collapse-label`})],L.prototype,`collapseLabel`,void 0),I([d({attribute:`icon-label`})],L.prototype,`iconLabel`,void 0),I([d({attribute:`alert-role`})],L.prototype,`alertRole`,void 0),I([d({attribute:!1})],L.prototype,`returnFocus`,void 0)})))()}var Yr,Xr,Zr,Qr,R;function $r(){return($r=e((()=>{j(),S(),an(),F(),O(),D(),w(),yn(),Ln(),Ar(),kr(),Ir(),Fr(),u(),m(),p(),se(),Yr=[`expanded`,`compact`,`floating`],Xr=`(max-width: 768px)`,Zr=()=>typeof window<`u`&&typeof window.matchMedia==`function`?window.matchMedia(Xr):null,Qr={iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,control:!0},R=class e extends M{constructor(...e){super(...e),this.brand=``,this.sidebarMode=`expanded`,this.noSkipLink=!1,this.collapsed=!1,this.mobile=!1,this.drawerOpen=!1,this.hovered=!1,this.keyboardFocus=!1,this.locale=new C(this),this.slots=new E(this),this.modal=new Dr(this),this.focusScope=new Pr(this,()=>({trapped:!0,loop:!0,restoreFocus:!1})),this.layer=new Er(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.headerToggle],onFocusOutside:e=>e.preventDefault(),onDismiss:()=>this.requestDrawer(!1)})),this.query=null,this.drawerActive=!1,this.handleMediaChange=()=>this.syncMobile()}static{this.tagName=`minerva-app-shell`}static{this.styles=[A,Or,f`
:host{
display: block;
}
`,P(Jn),P(Pn)]}openNavigation(){this.mobile&&(this.drawerOpen=!0)}closeNavigation(){this.drawerOpen=!1}expandNavigation(){this.sidebarMode=`expanded`}focusMain(){this.main?.focus()}connectedCallback(){super.connectedCallback(),this.query=Zr(),this.query?.addEventListener(`change`,this.handleMediaChange),this.syncMobile()}disconnectedCallback(){super.disconnectedCallback(),this.query?.removeEventListener(`change`,this.handleMediaChange),this.query=null,this.deactivateDrawer()}syncMobile(){let e=!!this.query?.matches;e!==this.mobile&&(this.mobile=e,this.hovered=!1,this.keyboardFocus=!1,this.drawerOpen=!1)}get mode(){return Yr.includes(this.sidebarMode)?this.sidebarMode:`expanded`}setMode(e){e!==this.mode&&this.emit(`minerva-sidebar-mode-change`,{mode:e},{cancelable:!0})&&(this.sidebarMode=e)}requestDrawer(e){e!==this.drawerOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.drawerOpen=e)}willUpdate(e){e.has(`navigationKey`)&&e.get(`navigationKey`)!==void 0&&(this.drawerOpen=!1),this.mobile||(this.drawerOpen=!1),this.collapsed=!this.mobile&&this.mode!==`expanded`&&(this.mode!==`floating`||!this.hovered&&!this.keyboardFocus)}updated(t){let n=this.mobile&&this.drawerOpen;n&&!this.drawerActive&&this.drawer?(this.drawerActive=!0,vr(this.overlay),vr(this.drawer),this.modal.activate(this),this.layer.activate(this.drawer),this.focusScope.activate(this.drawer)):!n&&this.drawerActive&&(this.deactivateDrawer(),this.headerToggle?.focus()),T&&t.has(`sidebarMode`)&&!Yr.includes(this.sidebarMode)&&N(e.tagName,`unknown sidebar-mode="${this.sidebarMode}" (expected ${Yr.join(`, `)}); using "expanded".`),T&&!this.slots.test(`navigation`)&&N(e.tagName,`put the navigation in the "navigation" slot (e.g. <nav slot="navigation">).`)}hookStates(){return{state:this.mobile&&this.drawerOpen?`open`:`closed`}}deactivateDrawer(){this.drawerActive&&(this.drawerActive=!1,this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate(),x(this.drawer),x(this.overlay))}label(e,t){return e??this.locale.t(`appShell.${t}`)}handleSkip(e){e.preventDefault(),this.focusMain()}handleSidebarFocusIn(e){let t=e.composedPath()[0],n;try{n=!!t?.matches?.(`:focus-visible`)}catch{n=!1}n&&(this.keyboardFocus=!0)}handleSidebarFocusOut(e){let t=e.relatedTarget;(!t||!this.sidebar||!ne(this.sidebar,t))&&(this.keyboardFocus=!1)}renderHeaderToggle(){return this.mobile?g`<button
type="button"
class=${_(Qr)}
aria-label=${this.label(this.openNavigationLabel,`openNavigation`)}
aria-haspopup="dialog"
aria-expanded=${String(this.drawerOpen)}
aria-controls=${this.drawerOpen?`drawer`:l}
@click=${()=>this.requestDrawer(!this.drawerOpen)}
>
${St}
</button>`:this.renderCollapseControl()}renderCollapseControl(){let e=this.mode!==`expanded`;return g`<button
type="button"
class=${_(Qr)}
aria-label=${e?this.label(this.expandLabel,`expand`):this.label(this.collapseLabel,`collapse`)}
aria-controls="sidebar"
aria-expanded=${String(!this.collapsed)}
@click=${()=>this.setMode(e?`expanded`:`compact`)}
>
${e?St:Un}
</button>`}renderSidebar(){let e=this.mode===`floating`,t=this.label(this.navigationLabel,`navigation`);return g`<aside
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
${this.slots.test(`brand-icon`)?g`<span class="brandIcon" aria-hidden="true"
><slot name="brand-icon"></slot
></span>`:l}
<span class="brandLabel"><slot name="brand">${this.brand}</slot></span>
</div>
<div class="navigation"><slot name="navigation"></slot></div>
<div class="sidebarActions">
${this.renderCollapseControl()}
<button
type="button"
class=${_(Qr)}
aria-pressed=${String(e)}
aria-label=${e?this.label(this.disableFloatingLabel,`disableFloating`):this.label(this.enableFloatingLabel,`enableFloating`)}
@click=${()=>this.setMode(e?`compact`:`floating`)}
>
${e?jt:Wt}
</button>
</div>
</aside>`}renderDrawer(){let e=this.label(this.navigationLabel,`navigation`);return g`<div
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
${Qt}
</button>
</div>`}render(){let e=this.skipLink||this.locale.t(`appShell.skipToContent`);return g`<div
class="shell"
part="root"
data-sidebar-mode=${this.mode}
data-sidebar-expanded=${this.collapsed?l:`true`}
>
${this.noSkipLink?l:g`<a
class="skipLink"
part="skip-link"
href="#main"
@click=${this.handleSkip}
>${e}</a
>`}
${this.mobile?l:this.renderSidebar()}
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
${this.mobile&&this.drawerOpen?this.renderDrawer():l}`}},I([d()],R.prototype,`brand`,void 0),I([d({attribute:`sidebar-mode`,reflect:!0})],R.prototype,`sidebarMode`,void 0),I([d({attribute:`navigation-label`})],R.prototype,`navigationLabel`,void 0),I([d({attribute:`navigation-key`})],R.prototype,`navigationKey`,void 0),I([d({attribute:`skip-link`})],R.prototype,`skipLink`,void 0),I([d({type:Boolean,attribute:`no-skip-link`})],R.prototype,`noSkipLink`,void 0),I([d({attribute:`expand-label`})],R.prototype,`expandLabel`,void 0),I([d({attribute:`collapse-label`})],R.prototype,`collapseLabel`,void 0),I([d({attribute:`enable-floating-label`})],R.prototype,`enableFloatingLabel`,void 0),I([d({attribute:`disable-floating-label`})],R.prototype,`disableFloatingLabel`,void 0),I([d({attribute:`open-navigation-label`})],R.prototype,`openNavigationLabel`,void 0),I([d({attribute:`close-navigation-label`})],R.prototype,`closeNavigationLabel`,void 0),I([d({type:Boolean,reflect:!0})],R.prototype,`collapsed`,void 0),I([d({type:Boolean,reflect:!0})],R.prototype,`mobile`,void 0),I([v()],R.prototype,`drawerOpen`,void 0),I([v()],R.prototype,`hovered`,void 0),I([v()],R.prototype,`keyboardFocus`,void 0),I([y(`.header button`)],R.prototype,`headerToggle`,void 0),I([y(`.drawer`)],R.prototype,`drawer`,void 0),I([y(`.overlay`)],R.prototype,`overlay`,void 0),I([y(`main`)],R.prototype,`main`,void 0),I([y(`aside`)],R.prototype,`sidebar`,void 0)})))()}var ei,z;function ti(){return(ti=e((()=>{k(),j(),S(),F(),Fn(),O(),D(),w(),Ir(),fr(),Tn(),Mn(),u(),m(),p(),Xe(),se(),qe(),ei={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},z=class e extends On{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.label=``,this.placeholder=``,this.mode=`basic`,this.size=`medium`,this.variant=`outline`,this.invalid=!1,this.readOnly=!1,this.loading=!1,this.placement=`bottom`,this.offset={x:0,y:4},this.noAnimation=!1,this.autoHighlight=!1,this.noFillOnSelect=!1,this.groupMode=`first`,this.focusedIndex=-1,this.hoveredIndex=-1,this.locale=new C(this),this.aria=new b(this,()=>this.labels),this.slots=new E(this),this.floating=new Mr(this,()=>{let e=this.placement===`top`||this.placement===`bottom`,t=this.offset??{x:0,y:4};return{anchor:()=>this.container,floating:()=>this.popup,placement:ei[this.placement]??`bottom-start`,offset:{mainAxis:e?t.y:t.x,crossAxis:e?t.x:t.y},matchAnchorWidth:`min`,branches:()=>[this.container],onEscapeKeyDown:e=>{(this.composing||e.isComposing)&&e.preventDefault()},onDismiss:()=>this.close(),returnFocusOnEscape:()=>this.input,onPosition:()=>this.syncHookStates()}}),this.composing=!1,this.dirty=!1}static{this.tagName=`minerva-autocomplete`}static{this.shadowRootOptions={...On.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[A,Or,P(Gn),P(or),f`
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
`]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}get blocked(){return this.isDisabled||this.readOnly}get shown(){return this.open&&!this.blocked}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.focusedIndex=-1}restoreFormState(e){typeof e==`string`&&(this.value=e)}get processedOptions(){let e=this.value,t=e.toLowerCase(),n=(this.options??[]).filter(n=>this.filterOption?this.filterOption(e,n):n.label.toLowerCase().includes(t));return this.sortOption?[...n].sort(this.sortOption):n}groupOptions(e){let t=this.groupBy;if(!t)return null;if(this.groupMode===`adjacent`){let n=[];for(let r of e){let e=t(r),i=n[n.length-1];i&&i[0]===e?i[1].push(r):n.push([e,[r]])}return n}let n=new Map;for(let r of e){let e=t(r),i=n.get(e);i?i.push(r):n.set(e,[r])}return Array.from(n.entries())}get navigableOptions(){let e=this.processedOptions,t=this.groupOptions(e);return t?t.flatMap(([,e])=>e):e}activeIndex(e){return this.focusedIndex>=0?this.focusedIndex:this.autoHighlight&&this.shown?e.findIndex(e=>!e.disabled):-1}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(){this.blocked||this.requestOpen(!0)}close(){this.requestOpen(!1),this.focusedIndex=-1}setText(e,t){e!==this.value&&(this.value=e,this.emit(`minerva-input`,{value:e}),t&&this.emit(`minerva-change`,{value:e}))}moveFocus(e){let t=this.navigableOptions,n=t.length;if(n===0)return;let r=this.activeIndex(t),i=r>=0?r:e===1?-1:n;for(let r=0;r<n;r+=1)if(i=(i+e+n)%n,!t[i].disabled){this.focusedIndex=i;return}}selectOption(e){e.disabled||(this.noFillOnSelect||this.setText(e.label,!0),this.close(),this.emit(`minerva-select`,{value:e.value,option:e}))}handleKeyDown(e){if(!(this.blocked||this.composing||e.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:case`ArrowUp`:e.preventDefault(),this.open||this.openDropdown(),this.moveFocus(e.key===`ArrowDown`?1:-1);break;case`Enter`:{let t=this.navigableOptions,n=this.shown?t[this.activeIndex(t)]:void 0,r=this.value.trim();n?(e.preventDefault(),this.selectOption(n)):r&&(e.preventDefault(),this.emit(`minerva-submit`,{value:r}),this.close());break}case`Escape`:!this.shown&&!this.floating.isOpen&&this.value!==``&&(e.preventDefault(),this.setText(``,!0),this.focusedIndex=-1)}}handleInput(){this.setText(this.input.value,!1),this.focusedIndex=-1,this.openDropdown()}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleBlur(e){let t=e.relatedTarget;t&&(this.popup?.contains(t)||this.container?.contains(t))||this.close()}handleOptionClick(e){e.disabled||this.composing||(this.selectOption(e),this.input?.focus())}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),this.open&&this.blocked&&(this.open=!1,this.focusedIndex=-1)}hookStates(){let e=this.shown&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?ke(e):{side:void 0,align:void 0};return{state:this.shown?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,loading:this.loading,side:t,align:n,placement:e}}updated(t){if(super.updated(t),this.floating.sync(this.shown),t.has(`focusedIndex`)&&this.focusedIndex>=0&&this.shadowRoot?.getElementById(`option-${this.focusedIndex}`)?.scrollIntoView?.({block:`nearest`}),T&&t.has(`options`)){let t=new Set;for(let n of this.options??[]){if(t.has(n.value)){N(e.tagName,`several options have the value "${n.value}"; option values must be unique.`);break}t.add(n.value)}}}renderOptionContent(e){return this.mode===`custom`&&this.renderOption?this.renderOption(e):g`<div class="basicOption">
${e.icon?g`<span class="icon">${e.icon}</span>`:l}
<div class="content">
<div class="label">${e.label}</div>
${e.description?g`<div class="description">${e.description}</div>`:l}
</div>
</div>`}renderOptionItem(e,t,n){let r=n===t,i=this.hoveredIndex===t||r,a=!!e.disabled;return g`<div
part=${bn(`item`,{highlighted:i,disabled:a})}
class=${_({optionItem:!0,disabled:a,highlight:!!e.highlight,active:i})}
style=${e.style?h(e.style):l}
role="option"
tabindex="-1"
id=${`option-${t}`}
aria-selected=${String(r)}
aria-disabled=${e.disabled?`true`:l}
@mousedown=${e=>e.preventDefault()}
@click=${()=>this.handleOptionClick(e)}
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),t.stopPropagation(),this.handleOptionClick(e))}}
@mouseenter=${()=>this.hoveredIndex=t}
@mouseleave=${()=>this.hoveredIndex=-1}
>
${this.renderOptionContent(e)}
</div>`}renderList(){let{t:e}=this.locale;if(this.loading)return g`<div role="presentation" class="loading" part="loading">
<span role="progressbar" aria-label=${e(`common.loading`)}
>${qt}</span
>
</div>`;let t=this.processedOptions;if(t.length===0)return g`<div role="presentation" class="empty" part="empty">
${this.renderEmpty?.()||g`${Ot}<span>${e(`empty.description`)}</span>`}
</div>`;let n=this.groupOptions(t),r=n?n.flatMap(([,e])=>e):t,i=this.activeIndex(r);return n?n.map(([e,t])=>{let n=t.map(e=>this.renderOptionItem(e,r.indexOf(e),i));return e===``?n:g`<div class="optionGroup" role="group" aria-label=${e}>
<div class="groupLabel" part="group-label" aria-hidden="true">
${e}
</div>
${n}
</div>`}):t.map((e,t)=>this.renderOptionItem(e,t,i))}render(){let e=this.shown,t=this.isDisabled,n=e?this.navigableOptions:[],r=e?this.activeIndex(n):-1,i=e&&r>=0&&r<n.length?`option-${r}`:void 0,a=this.label?void 0:this.aria.label;return g`<div
part="root"
class="autoComplete"
@compositionstart=${()=>this.composing=!0}
@compositionend=${()=>this.composing=!1}
>
${this.label?g`<label for="input" class="label" part="label"
>${this.label}</label
>`:l}
<div
part="field"
class=${_({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?g`<span class="addon start"><slot name="prefix"></slot></span>`:l}
<input
id="input"
part="input"
class="field"
type="text"
role="combobox"
aria-autocomplete="list"
aria-expanded=${String(e)}
aria-controls=${e?`listbox`:l}
aria-activedescendant=${i??l}
aria-label=${a??l}
aria-description=${this.aria.description??l}
aria-required=${this.required?`true`:l}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:l}
data-minerva-escape-consumer=${!e&&this.value!==``?``:l}
autocomplete="off"
.value=${Qe(this.value)}
placeholder=${this.placeholder||l}
?disabled=${t}
?readonly=${this.readOnly}
@input=${this.handleInput}
@change=${this.handleChange}
@focus=${()=>this.openDropdown()}
@click=${()=>{this.open||this.openDropdown()}}
@blur=${this.handleBlur}
@keydown=${this.handleKeyDown}
/>
${this.slots.test(`suffix`)?g`<span class="addon end"><slot name="suffix"></slot></span>`:l}
</div>
${e?g`<div class="popup" part="content" popover="manual">
<div
class=${_({dropdown:!0,animated:!this.noAnimation})}
>
<div
class="optionList"
part="list"
role="listbox"
id="listbox"
aria-label=${this.label||a||l}
aria-busy=${this.loading?`true`:l}
>
${this.renderList()}
</div>
</div>
</div>`:l}
</div>`}},I([d({attribute:!1})],z.prototype,`value`,void 0),I([d({attribute:`value`})],z.prototype,`defaultValue`,void 0),I([d({attribute:!1})],z.prototype,`options`,void 0),I([d({type:Boolean,reflect:!0})],z.prototype,`open`,void 0),I([d()],z.prototype,`label`,void 0),I([d()],z.prototype,`placeholder`,void 0),I([d({reflect:!0})],z.prototype,`mode`,void 0),I([d({reflect:!0})],z.prototype,`size`,void 0),I([d({reflect:!0})],z.prototype,`variant`,void 0),I([d({type:Boolean,reflect:!0})],z.prototype,`invalid`,void 0),I([d({type:Boolean,reflect:!0,attribute:`readonly`})],z.prototype,`readOnly`,void 0),I([d({type:Boolean,reflect:!0})],z.prototype,`loading`,void 0),I([d({reflect:!0})],z.prototype,`placement`,void 0),I([d({attribute:!1})],z.prototype,`offset`,void 0),I([d({type:Boolean,attribute:`no-animation`})],z.prototype,`noAnimation`,void 0),I([d({type:Boolean,attribute:`auto-highlight`})],z.prototype,`autoHighlight`,void 0),I([d({type:Boolean,attribute:`no-fill-on-select`})],z.prototype,`noFillOnSelect`,void 0),I([d({attribute:`group-mode`})],z.prototype,`groupMode`,void 0),I([d({attribute:!1})],z.prototype,`filterOption`,void 0),I([d({attribute:!1})],z.prototype,`sortOption`,void 0),I([d({attribute:!1})],z.prototype,`groupBy`,void 0),I([d({attribute:!1})],z.prototype,`renderOption`,void 0),I([d({attribute:!1})],z.prototype,`renderEmpty`,void 0),I([v()],z.prototype,`focusedIndex`,void 0),I([v()],z.prototype,`hoveredIndex`,void 0),I([y(`input`)],z.prototype,`input`,void 0),I([y(`.autoComplete`)],z.prototype,`container`,void 0),I([y(`.popup`)],z.prototype,`popup`,void 0)})))()}function ni(e){let t=e?.trim()??``;return t?ii.test(t[0])?t[0]:t.split(/\s+/).slice(0,2).map(e=>e[0].toUpperCase()).join(``):``}var ri,ii,ai,oi,si;function ci(){return(ci=e((()=>{k(),j(),F(),O(),D(),w(),er(),zn(),u(),m(),p(),Xe(),ri=[`xsmall`,`small`,`medium`,`large`,`xlarge`,`xxlarge`],ii=/[㐀-鿿豈-﫿]/,ai={fromAttribute:e=>e&&/^\d+(\.\d+)?$/.test(e)?Number(e):e??`medium`,toAttribute:e=>String(e)},oi=class e extends M{constructor(...e){super(...e),this.name=``,this.shape=`circle`,this.size=`medium`,this.stacked=!1,this.locale=new C(this),this.aria=new b(this),this.slots=new E(this)}static{this.tagName=`minerva-avatar`}static{this.styles=[A,f`
:host{
display: inline-block;
flex-shrink: 0;
vertical-align: middle;
line-height: 0;
}
.avatarText{
line-height: 1;
}
`,P(Sn)]}hookStates(){return{size:typeof this.size==`number`?void 0:this.size,shape:this.shape}}updated(t){T&&t.has(`size`)&&typeof this.size!=`number`&&!ri.includes(this.size)&&N(e.tagName,`unknown size "${this.size}": use a preset (${ri.join(`, `)}) or a number of pixels.`)}render(){let e=!!this.src&&this.failedSrc!==this.src,t=this.aria.label??(this.name||this.locale.t(`avatar.default`)),n=typeof this.size==`number`,r=_({avatar:!0,[this.shape]:!0,[String(this.size)]:!n,stacked:this.stacked}),i=h(n?{"--avatar-size":`${this.size}px`,width:`${this.size}px`,height:`${this.size}px`}:{});if(e)return g`<span part="root" class=${r} style=${i}
><img
part="image"
class="avatarImg"
alt=${this.alt??t}
src=${this.src}
draggable="false"
@error=${()=>this.failedSrc=this.src}
/></span>`;let a=ni(this.name),o=this.slots.test(`fallback`)?g`<slot name="fallback"></slot>`:a||g`<slot></slot>`;return g`<span
part="root"
role="img"
aria-label=${t}
class=${r}
style=${i}
><span part="fallback" class="avatarText" aria-hidden="true"
>${o}</span
></span
>`}},I([d()],oi.prototype,`src`,void 0),I([d()],oi.prototype,`name`,void 0),I([d()],oi.prototype,`alt`,void 0),I([d({reflect:!0})],oi.prototype,`shape`,void 0),I([d({reflect:!0,converter:ai})],oi.prototype,`size`,void 0),I([d({type:Boolean,reflect:!0})],oi.prototype,`stacked`,void 0),I([v()],oi.prototype,`failedSrc`,void 0),si=class e extends M{constructor(...e){super(...e),this.locale=new C(this),this.aria=new b(this),this.slots=new E(this)}static{this.tagName=`minerva-avatar-group`}static{this.shadowRootOptions={...M.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[A,f`
:host{
display: flex;
}
.avatarGroup{
flex: 1 1 auto;
min-width: 0;
}
`,P(ir)]}visibleAvatars(){let e=Array.from(this.children);return this.max===void 0||this.max===null?e:e.slice(0,Math.max(0,this.max))}updated(t){let n=this.visibleAvatars();Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,t)=>{let r=n[t];r&&typeof e.assign==`function`&&e.assign(r)}),T&&t.has(`max`)&&this.max!==void 0&&this.max!==null&&!(Number.isInteger(this.max)&&this.max>=0)&&N(e.tagName,`max must be a non-negative integer (got ${this.max}).`)}render(){this.slots;let e=this.children.length,t=this.visibleAvatars(),n=(Number(this.count)||0)+e-t.length,r=this.aria.label??(n>0?this.locale.t(`avatar.groupWithMore`,{count:n}):this.locale.t(`avatar.group`));return g`<div
part="root"
role="group"
class="avatarGroup"
aria-label=${r}
>
${t.map(()=>g`<div part="item" class="avatarGroupItem">
<slot data-item></slot>
</div>`)}
${n>0?g`<div part="count" class="count" aria-hidden="true">
+${n}
</div>`:l}
</div>`}},I([d({type:Number})],si.prototype,`count`,void 0),I([d({type:Number})],si.prototype,`max`,void 0)})))()}var li;function ui(){return(ui=e((()=>{k(),j(),F(),O(),D(),w(),Zn(),u(),m(),p(),Xe(),li=class e extends M{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.position=`top-right`,this.dot=!1,this.badgeRole=`status`,this.locale=new C(this),this.aria=new b(this),this.slots=new E(this)}static{this.tagName=`minerva-badge`}static{this.styles=[A,f`
:host{
display: inline-flex;
vertical-align: middle;
}
`,P(lr)]}hasElementChildren(){return Array.from(this.children).some(e=>!e.hasAttribute(`slot`)||e.getAttribute(`slot`)===``)}hookStates(){return{size:this.size,variant:this.variant,color:this.color}}updated(){T&&this.dot&&!this.aria.label&&![`presentation`,`none`].includes(this.badgeRole)&&N(e.tagName,`a dot badge has no text: set aria-label (e.g. "New messages") or badge-role="presentation".`)}render(){let e=this.slots.test(`[default]`),t=e&&!this.hasElementChildren(),n=this.content!==void 0&&this.content!==null||this.slots.test(`content`),r=!e||t&&!n,i=l;this.dot||(n?i=g`<slot name="content">${this.content}</slot>`:t?i=g`<slot></slot>`:e&&(i=this.locale.t(`badge.default`)));let a=g`<span
part=${r?`root`:`badge`}
class=${_({badge:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,standalone:r,[this.position]:!r,dot:this.dot})}
role=${this.badgeRole||l}
aria-label=${this.aria.label??l}
style=${h({borderRadius:this.borderRadius,borderWidth:this.borderWidth})}
>${this.slots.test(`icon`)?g`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:l}${i}</span
>`;return r?a:g`<div part="root" class="badgeWrapper">
<div class="content"><slot></slot></div>
${a}
</div>`}},I([d({reflect:!0})],li.prototype,`color`,void 0),I([d({reflect:!0})],li.prototype,`variant`,void 0),I([d({reflect:!0})],li.prototype,`size`,void 0),I([d()],li.prototype,`content`,void 0),I([d({reflect:!0})],li.prototype,`position`,void 0),I([d({type:Boolean,reflect:!0})],li.prototype,`dot`,void 0),I([d({attribute:`border-radius`})],li.prototype,`borderRadius`,void 0),I([d({attribute:`border-width`})],li.prototype,`borderWidth`,void 0),I([d({attribute:`badge-role`})],li.prototype,`badgeRole`,void 0)})))()}function di(e){return e.replace(/[;{}<>]/g,``)}var fi;function pi(){return(pi=e((()=>{te(),fi={fromAttribute:e=>{if(e===null)return;let t=e.trim();return/^-?\d+(\.\d+)?$/.test(t)?Number(t):t},toAttribute:e=>e===void 0?null:String(e)}})))()}var mi,hi,gi,B,V;function _i(){return(_i=e((()=>{j(),O(),pi(),u(),m(),mi={bg:`var(--surface-color)`,"bg.subtle":`var(--surface-subtle-color)`,"bg.muted":`var(--surface-muted-color)`,"bg.emphasis":`var(--surface-muted-color)`,"bg.canvas":`var(--canvas-color)`,"bg.elevated":`var(--surface-elevated-color)`},hi=[`none`,`sm`,`md`,`lg`,`xl`,`2xl`,`full`],gi=[`sm`,`md`,`lg`,`xl`],B={converter:fi},V=class e extends M{static{this.tagName=`minerva-box`}static{this.styles=[A,f`
:host{
display: block;
}
`]}declarations(){let e=[],t=(t,...n)=>{if(t!==void 0&&t!==``)for(let r of n)e.push([r,ce(t)])},n=(t,n)=>{t!==void 0&&t!==``&&e.push([n,ae(t)])};return t(this.p,`padding`),t(this.px,`padding-left`,`padding-right`),t(this.py,`padding-top`,`padding-bottom`),t(this.pt,`padding-top`),t(this.pr,`padding-right`),t(this.pb,`padding-bottom`),t(this.pl,`padding-left`),t(this.m,`margin`),t(this.mx,`margin-left`,`margin-right`),t(this.my,`margin-top`,`margin-bottom`),t(this.mt,`margin-top`),t(this.mr,`margin-right`),t(this.mb,`margin-bottom`),t(this.ml,`margin-left`),n(this.w,`width`),n(this.h,`height`),n(this.minW,`min-width`),n(this.minH,`min-height`),n(this.maxW,`max-width`),n(this.maxH,`max-height`),this.bg&&e.push([`background`,mi[this.bg]??this.bg]),this.rounded&&e.push([`border-radius`,hi.includes(this.rounded)?`var(--radius-${this.rounded})`:this.rounded]),this.boxShadow&&e.push([`box-shadow`,gi.includes(this.boxShadow)?`var(--shadow-${this.boxShadow})`:this.boxShadow]),this.border&&e.push([`border`,this.border]),e}updated(){T&&this.bg?.startsWith(`bg.`)&&!(this.bg in mi)&&N(e.tagName,`unknown surface alias bg="${this.bg}" (expected one of ${Object.keys(mi).join(`, `)}).`)}render(){let e=this.declarations().map(([e,t])=>`${e}:${di(t)};`).join(``);return g`<style>
:host{${e}}
</style>
<slot></slot>`}},I([d(B)],V.prototype,`p`,void 0),I([d(B)],V.prototype,`px`,void 0),I([d(B)],V.prototype,`py`,void 0),I([d(B)],V.prototype,`pt`,void 0),I([d(B)],V.prototype,`pr`,void 0),I([d(B)],V.prototype,`pb`,void 0),I([d(B)],V.prototype,`pl`,void 0),I([d(B)],V.prototype,`m`,void 0),I([d(B)],V.prototype,`mx`,void 0),I([d(B)],V.prototype,`my`,void 0),I([d(B)],V.prototype,`mt`,void 0),I([d(B)],V.prototype,`mr`,void 0),I([d(B)],V.prototype,`mb`,void 0),I([d(B)],V.prototype,`ml`,void 0),I([d(B)],V.prototype,`w`,void 0),I([d(B)],V.prototype,`h`,void 0),I([d({converter:fi,attribute:`min-w`})],V.prototype,`minW`,void 0),I([d({converter:fi,attribute:`min-h`})],V.prototype,`minH`,void 0),I([d({converter:fi,attribute:`max-w`})],V.prototype,`maxW`,void 0),I([d({converter:fi,attribute:`max-h`})],V.prototype,`maxH`,void 0),I([d()],V.prototype,`bg`,void 0),I([d()],V.prototype,`rounded`,void 0),I([d({attribute:`box-shadow`})],V.prototype,`boxShadow`,void 0),I([d()],V.prototype,`border`,void 0)})))()}var vi,H;function yi(){return(yi=e((()=>{k(),j(),gr(),O(),D(),w(),An(),u(),m(),p(),Xe(),vi=e=>`borderRadius${e.charAt(0).toUpperCase()}${e.slice(1)}`,H=class e extends M{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.disabled=!1,this.loading=!1,this.fullWidth=!1,this.active=!1,this.type=`button`,this.internals=Sr(this),this.aria=new b(this),this.slots=new E(this),this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-button`}static{this.formAssociated=!0}static{this.styles=[A,f`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
:host([full-width]){
display: flex;
width: 100%;
}
`,P(xt)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0)}hookStates(){return{state:this.active?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){T&&this.shape===`circle`&&!this.aria.label&&(this.textContent?.trim()||N(e.tagName,`shape="circle" buttons usually only contain an icon: set aria-label to give them an accessible name.`))}render(){let e=this.borderRadius,t=typeof e==`number`||typeof e==`string`&&/^\d+(\.\d+)?$/.test(e),n=this.loading&&this.slots.test(`loading`),r=this.loading&&!n,i=g`<span
class="loadingSpinner"
part="spinner"
aria-hidden="true"
></span>`;return g`<button
part="root"
type="button"
class=${_({customButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape??``]:!!this.shape,[vi(String(e??``))]:!!e&&!t,fullWidth:this.fullWidth,active:this.active,loading:this.loading})}
style=${h(t?{borderRadius:`${Number(e)}px`}:{})}
?disabled=${this.disabled}
aria-label=${this.aria.label??l}
aria-description=${this.aria.description??l}
aria-pressed=${this.aria.attr(`aria-pressed`)??l}
aria-expanded=${this.aria.attr(`aria-expanded`)??l}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??l}
aria-busy=${this.loading?`true`:l}
aria-disabled=${this.loading?`true`:l}
@click=${this.handleClick}
>
${n?g`${i}<span class="label" part="label"
><slot name="loading"></slot
></span>`:g`${this.loading?i:l}
${this.slots.test(`start`)?g`<span
class=${_({icon:!0,hidden:r})}
part="start-icon"
><slot name="start"></slot
></span>`:l}
<span class=${_({label:!0,hidden:r})} part="label"
><slot></slot
></span>
${this.slots.test(`end`)?g`<span
class=${_({icon:!0,hidden:r})}
part="end-icon"
><slot name="end"></slot
></span>`:l}`}
</button>`}},I([d({reflect:!0})],H.prototype,`color`,void 0),I([d({reflect:!0})],H.prototype,`variant`,void 0),I([d({reflect:!0})],H.prototype,`size`,void 0),I([d({reflect:!0})],H.prototype,`shape`,void 0),I([d({attribute:`border-radius`})],H.prototype,`borderRadius`,void 0),I([d({type:Boolean,reflect:!0})],H.prototype,`disabled`,void 0),I([d({type:Boolean,reflect:!0})],H.prototype,`loading`,void 0),I([d({type:Boolean,reflect:!0,attribute:`full-width`})],H.prototype,`fullWidth`,void 0),I([d({type:Boolean,reflect:!0})],H.prototype,`active`,void 0),I([d({reflect:!0})],H.prototype,`type`,void 0),I([y(`button`)],H.prototype,`button`,void 0)})))()}var bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi,Ni;function Pi(){return(Pi=e((()=>{k(),j(),an(),gr(),O(),w(),$t(),gn(),u(),m(),p(),te(),$e(),bi=[`div`,`article`,`section`,`a`,`button`],xi=[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`],Si=[`none`,`small`,`medium`,`large`],Ci=`minerva-card-header, minerva-card-content, minerva-card-footer, minerva-card-title, minerva-card-description`,wi=e=>e&&Si.includes(e)?`pad-${e}`:``,Ti=e=>{let t=e.parentElement??e.getRootNode().host;return!!(t?Mt(t,`minerva-card`):null)?.hasAttribute(`padding`)},Ei=class e extends M{constructor(...e){super(...e),this.variant=`default`,this.interactive=!1,this.as=`div`,this.disabled=!1,this.type=`button`,this.internals=Sr(this),this.aria=new b(this),this.syncParts=()=>{for(let e of Array.from(this.querySelectorAll(Ci)))e.requestUpdate()},this.blockDisabledClicks=e=>{this.tag===`button`&&this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-card`}static{this.formAssociated=!0}static{this.styles=[A,f`
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
`,P(vn)]}get tag(){return bi.includes(this.as)?this.as:`div`}focus(e){this.tag===`a`||this.tag===`button`?this.root?.focus(e):super.focus(e)}handleClick(e){if(this.tag!==`button`)return;if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.internals?.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockDisabledClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockDisabledClicks,!0)}hookStates(){return{variant:this.variant,disabled:this.tag===`button`&&this.disabled}}updated(t){t.has(`padding`)&&this.syncParts(),T&&(this.as&&!bi.includes(this.as)&&N(e.tagName,`unsupported as="${this.as}" (expected ${bi.join(`, `)}); rendering a div.`),this.tag===`a`&&!this.href&&N(e.tagName,`as="a" needs an href to be a link (focusable, activatable with Enter).`),this.interactive&&this.tag!==`a`&&this.tag!==`button`&&N(e.tagName,`interactive cards should be links or buttons (as="a" with href, or as="button") so keyboard users can activate them.`))}render(){let t=this.tag,n=_({card:!0,[this.variant]:!0,padded:!!this.padding,[wi(this.padding)]:!!wi(this.padding),interactive:this.interactive}),r=this.aria.label??l,i=tt`<slot @slotchange=${this.syncParts}></slot>`;if(t===`a`)return tt`<a
part="root"
class=${n}
href=${mn(e.tagName,this.href)??l}
target=${this.target??l}
rel=${Ue(this.target,this.rel)??l}
download=${this.download??l}
aria-label=${r}
>${i}</a
>`;if(t===`button`)return tt`<button
part="root"
class=${n}
type="button"
?disabled=${this.disabled}
aria-label=${r}
aria-pressed=${this.aria.attr(`aria-pressed`)??l}
aria-expanded=${this.aria.attr(`aria-expanded`)??l}
@click=${this.handleClick}
>
${i}
</button>`;let a=Ye(t);return tt`<${a} part="root" class=${n}>${i}</${a}>`}},I([d({reflect:!0})],Ei.prototype,`variant`,void 0),I([d({reflect:!0})],Ei.prototype,`padding`,void 0),I([d({type:Boolean,reflect:!0})],Ei.prototype,`interactive`,void 0),I([d({reflect:!0})],Ei.prototype,`as`,void 0),I([d()],Ei.prototype,`href`,void 0),I([d()],Ei.prototype,`target`,void 0),I([d()],Ei.prototype,`rel`,void 0),I([d()],Ei.prototype,`download`,void 0),I([d({type:Boolean,reflect:!0})],Ei.prototype,`disabled`,void 0),I([d()],Ei.prototype,`type`,void 0),I([y(`[part=root]`)],Ei.prototype,`root`,void 0),Di=f`
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
`,Oi=class extends M{constructor(...e){super(...e),this.sectionClass=``}static{this.styles=[A,Di]}layoutClasses(){let e=this.previousElementSibling?.localName,t=wi(this.padding);return{[this.sectionClass]:!0,padded:Ti(this),afterHeader:e===`minerva-card-header`,afterContent:e===`minerva-card-content`,[t]:!!t}}render(){return tt`<div part="root" class=${_(this.layoutClasses())}>
<slot></slot>
</div>`}},I([d({reflect:!0})],Oi.prototype,`padding`,void 0),ki=class extends Oi{constructor(...e){super(...e),this.sectionClass=`cardHeader`}static{this.tagName=`minerva-card-header`}},Ai=class extends Oi{constructor(...e){super(...e),this.sectionClass=`cardContent`}static{this.tagName=`minerva-card-content`}static{this.styles=[A,Di,f`
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
`]}layoutClasses(){let e=super.layoutClasses();return this.animation&&(e[this.animation]=!0),e}},I([d({reflect:!0})],Ai.prototype,`animation`,void 0),ji=class extends Oi{constructor(...e){super(...e),this.sectionClass=`cardFooter`}static{this.tagName=`minerva-card-footer`}},Mi=class extends M{constructor(...e){super(...e),this.as=`h3`}static{this.tagName=`minerva-card-title`}static{this.styles=[A,f`
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
`]}render(){let e=Ye(xi.includes(this.as)?this.as:`h3`);return tt`<${e}
part="root"
class=${_({cardTitle:!0,padded:Ti(this)})}
><slot></slot></${e}>`}},I([d({reflect:!0})],Mi.prototype,`as`,void 0),Ni=class extends M{static{this.tagName=`minerva-card-description`}static{this.styles=[A,f`
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
`]}render(){return tt`<p
part="root"
class=${_({cardDescription:!0,padded:Ti(this)})}
>
<slot></slot>
</p>`}}})))()}var Fi,Ii,Li,Ri,zi,U;function Bi(){return(Bi=e((()=>{k(),j(),S(),F(),Fn(),O(),w(),Ir(),Mn(),zt(),u(),m(),p(),se(),te(),qe(),Fi=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n]),Ii=e=>{let t=new Set;for(let n of e){if(t.has(n.value))return n.value;t.add(n.value);let e=n.children?Ii(n.children):void 0;if(e!==void 0)return e}},Li={fromAttribute(e){let t=e?.trim()??``;if(!t)return[];if(t.startsWith(`[`))try{let e=JSON.parse(t);if(Array.isArray(e))return e.filter(e=>typeof e==`string`||typeof e==`number`)}catch{}return t.split(`,`).map(e=>e.trim())},toAttribute(e){return JSON.stringify(e)}},Ri=`[role="option"]:not([aria-disabled="true"])`,zi=0,U=class e extends On{constructor(...e){super(...e),this.options=[],this.value=[],this.defaultValue=[],this.open=!1,this.label=``,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.expandTrigger=`click`,this.showSearch=!1,this.maxLevel=6,this.width=240,this.expandedValues=[],this.searchValue=``,this.idPrefix=`minerva-cascader-${zi++}`,this.locale=new C(this),this.aria=new b(this,()=>this.labels),this.floating=new Mr(this,()=>({anchor:()=>this.anchor,floating:()=>this.dropdown,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[this.anchor],onDismiss:()=>this.closeDropdown(),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.pendingFocus=null,this.dirty=!1,this.widthApplied=!1}static{this.tagName=`minerva-cascader`}static{this.shadowRootOptions={...On.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[A,Or,f`
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
`,P(rr)]}get selectedOptions(){return Se(this.options,this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get displayText(){let e=this.selectedOptions,t=e.map(e=>String(e.label));return this.displayRender?this.displayRender(t,e):t.join(` / `)}getFormValue(){return this.displayText}syncFormState(){super.syncFormState(),this.internals&&!this.isDisabled&&this.internals.setFormValue(this.getFormValue(),JSON.stringify(this.value))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=[...this.defaultValue],this.open=!1}restoreFormState(e){if(typeof e==`string`)try{let t=JSON.parse(e);Array.isArray(t)&&(this.value=t)}catch{}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=!Fi(this.value,this.defaultValue)||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=[...this.defaultValue]),e.has(`open`)&&(this.open?this.expandedValues=[...this.value]:(this.searchValue=``,this.pendingFocus=null)),T&&this.checkDev(e)}checkDev(t){if(t.has(`options`)){let t=Ii(this.options);t!==void 0&&N(e.tagName,`duplicate option value "${t}" among siblings: values must be unique within a level.`)}(t.has(`options`)||t.has(`value`))&&this.options.length>0&&this.value.length>0&&Se(this.options,this.value).length<this.value.length&&N(e.tagName,`value ${JSON.stringify(this.value)} is not a path of the options tree: it is shown partially (or not at all).`)}hookStates(){let e=this.open&&!this.isDisabled,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?ke(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,side:n,align:r,placement:t}}updated(e){if(super.updated(e),e.has(`width`)){let e=this.width,t=e===void 0||e===``?``:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,n=t!==``&&t!==`240px`;(n||this.widthApplied)&&(this.style.width=n?t:``),this.widthApplied=n}this.floating.sync(this.open&&!this.isDisabled);let t=this.pendingFocus;if(t!==null&&this.open){let e=t===-1?this.columns().length-1:t;this.focusColumn(e)&&(this.pendingFocus=null)}}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(e=!1){this.isDisabled||this.readOnly||this.requestOpen(!0)&&(this.expandedValues=[...this.value],this.pendingFocus=e?-1:null)}closeDropdown(e=!1){this.requestOpen(!1)&&(this.searchValue=``,e&&this.input?.focus())}select(e){this.value=e.map(e=>e.value),this.emitChange(e),this.closeDropdown(!0)}emitChange(e){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:[...this.value],selectedOptions:e})}handleActivate(e,t){let n=e[e.length-1];if(n.disabled)return;let r=t>=this.maxLevel-1,i=!!n.children?.length,a=!!this.loadData&&!n.isLeaf&&!n.children;if(!r&&(i||a)){this.expandedValues=e.map(e=>e.value),a&&!n.loading&&this.loadData?.(e);return}this.select(e)}clear(e){e.stopPropagation(),this.value=[],this.searchValue=``,this.emitChange([]),this.emit(`minerva-clear`),this.input?.focus()}get expandedPath(){return Se(this.options,this.expandedValues)}columns(){let e=this.expandedPath,t=[this.options];for(let n=0;n<e.length&&n<this.maxLevel-1;n+=1){let r=e[n].children;if(!r?.length)break;t.push(r)}return t}columnId(e){return`${this.idPrefix}-column-${e}`}focusColumn(e){let t=this.dropdown?.querySelector(`[data-level="${e}"]`);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(Ri);return n?.focus(),!!n}canExpand(e,t){return t<this.maxLevel-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0)}pathTo(e,t){return[...this.expandedPath.slice(0,t),e]}get searching(){return this.showSearch&&this.searchValue!==``}searchResults(){if(!this.searching)return[];let{searchValue:e,filter:t}=this,n=e.toLowerCase();return we(this.options).filter(({path:r})=>t?t(e,r):r.some(e=>String(e.label).toLowerCase().includes(n)))}focusFirstSearchResult(){this.dropdown?.querySelector(`[role="option"]`)?.focus()}handleSelectorClick(){this.isDisabled||this.readOnly||(this.open?this.showSearch||this.closeDropdown():this.openDropdown())}handleInput(e){let t=e.target.value;this.showSearch&&!this.readOnly&&(this.searchValue=t,this.emit(`minerva-input`,{value:t}),this.open||this.openDropdown())}handleInputKeyDown(e){switch(e.key){case`ArrowDown`:e.preventDefault(),this.open?this.searching?this.focusFirstSearchResult():(this.pendingFocus=-1,this.requestUpdate()):this.openDropdown(!0);break;case`Enter`:e.preventDefault(),this.open||this.openDropdown(!0);break;case` `:if(this.showSearch)break;e.preventDefault(),this.open||this.openDropdown(!0)}}handleFocusOut(e){let t=e.relatedTarget;this.open&&t&&(this.anchor&&ne(this.anchor,t)||this.dropdown&&ne(this.dropdown,t)||this.closeDropdown())}handleDropdownMouseDown(e){e.target.closest?.(`[role="option"]`)||e.preventDefault()}handleDropdownKeyDown(e){e.key===`Tab`&&this.closeDropdown()}handleOptionKeyDown(e,t,n){let r=e.currentTarget,i=Array.from(r.parentElement?.querySelectorAll(Ri)??[]),a=i.indexOf(r),o=e=>i[(e+i.length)%i.length]?.focus();switch(Ve(e.key,this)){case`ArrowDown`:e.preventDefault(),o(a+1);break;case`ArrowUp`:e.preventDefault(),o(a-1);break;case`Home`:e.preventDefault(),o(0);break;case`End`:e.preventDefault(),o(i.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!this.canExpand(t,n))break;this.pendingFocus=n+1,this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;this.canExpand(t,n)&&(this.pendingFocus=n+1),this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`ArrowLeft`:e.preventDefault(),n===0?this.closeDropdown(!0):this.focusColumn(n-1)}}handleSearchKeyDown(e){let t=e.currentTarget,n=Array.from(t.querySelectorAll(`[role="option"]`)),r=n.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),n[(r+(e.key===`ArrowDown`?1:-1)+n.length)%n.length]?.focus())}renderSearchResults(){let e=this.searchResults();return g`<div
class="searchResults"
role="listbox"
aria-label=${this.label||this.aria.label||l}
tabindex="-1"
@keydown=${this.handleSearchKeyDown}
>
${e.length>0?e.map(({path:e})=>g`<div
class="searchOption"
part="item"
role="option"
aria-selected="false"
tabindex="0"
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),this.select(e))}}
@click=${()=>this.select(e)}
>
${e.map(e=>e.label).join(` / `)}
</div>`):g`<div class="empty" role="status">
${this.locale.t(`cascader.noResults`)}
</div>`}
</div>`}renderPanel(){let{t:e}=this.locale,t=this.columns(),n=this.expandedPath,r=this.selectedOptions,i=this.label||this.aria.label||e(`cascader.options`);return g`<div class="panel">
${t.map((a,o)=>g`<ul
id=${this.columnId(o)}
data-level=${o}
class="column"
part="column"
role="listbox"
aria-label=${e(`cascader.level`,{label:i,level:o+1})}
>
${a.map(e=>{let i=n[o]?.value===e.value,a=r[o]?.value===e.value,s=this.canExpand(e,o)&&!(!e.children?.length&&e.isLeaf),c=i&&!(a&&o===r.length-1);return g`<li
?data-expanded=${c}
?data-selected=${a}
class=${_({option:!0,active:i||a,disabled:!!e.disabled,loading:!!e.loading})}
part=${bn(`item`,{selected:a,expanded:c,disabled:e.disabled,loading:e.loading})}
role="option"
aria-selected=${a?`true`:`false`}
aria-disabled=${e.disabled?`true`:l}
aria-busy=${e.loading?`true`:l}
aria-controls=${i&&o+1<t.length?this.columnId(o+1):l}
tabindex=${e.disabled?-1:0}
@keydown=${t=>this.handleOptionKeyDown(t,e,o)}
@click=${()=>{e.disabled||this.handleActivate(this.pathTo(e,o),o)}}
@mouseenter=${()=>{this.expandTrigger===`hover`&&!e.disabled&&e.children?.length&&o<this.maxLevel-1&&(this.expandedValues=this.pathTo(e,o).map(e=>e.value))}}
>
${this.optionRender?this.optionRender(e,o):g`<span class="label">${e.label}</span>${e.loading?g`<span
class="loadingIndicator"
aria-hidden="true"
>...</span
>`:s?g`<span class="expandIcon" aria-hidden="true"
>${It}</span
>`:l}`}
</li>`})}
</ul>`)}
</div>`}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.open&&!t,r=!this.hideClearButton&&this.value.length>0&&!t&&!this.readOnly,i=this.searching?this.searchValue:this.displayText,a=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return g`<div
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
aria-autocomplete=${this.showSearch?`list`:l}
aria-label=${this.aria.label??(this.label||l)}
aria-description=${this.aria.description??l}
aria-invalid=${a?`true`:l}
aria-required=${this.required?`true`:l}
aria-readonly=${this.showSearch&&this.readOnly?`true`:l}
name=${this.name||l}
.value=${Qe(i)}
?readonly=${!this.showSearch||this.readOnly}
?disabled=${t}
?required=${this.required}
autocomplete="off"
placeholder=${this.placeholder??e(`cascader.placeholder`)}
@input=${this.handleInput}
@keydown=${this.handleInputKeyDown}
/>
</div>
${r?g`<button
type="button"
class="clearIcon"
part="clear-button"
aria-label=${e(`cascader.clear`)}
@click=${this.clear}
>
<span class="icon" aria-hidden="true">${Qt}</span>
</button>`:l}
<span
class=${_({arrow:!0,open:n})}
part="icon"
aria-hidden="true"
><span class="icon">${ln}</span></span
>
</div>
</div>
${n?g`<div
class="dropdown"
part="content"
popover="manual"
@mousedown=${this.handleDropdownMouseDown}
@focusout=${this.handleFocusOut}
@keydown=${this.handleDropdownKeyDown}
>
${this.searching?this.renderSearchResults():this.renderPanel()}
</div>`:l}`}},I([d({attribute:!1})],U.prototype,`options`,void 0),I([d({attribute:!1})],U.prototype,`value`,void 0),I([d({attribute:`value`,converter:Li})],U.prototype,`defaultValue`,void 0),I([d({type:Boolean,reflect:!0})],U.prototype,`open`,void 0),I([d()],U.prototype,`label`,void 0),I([d()],U.prototype,`placeholder`,void 0),I([d({type:Boolean,reflect:!0})],U.prototype,`invalid`,void 0),I([d({type:Boolean,reflect:!0,attribute:`readonly`})],U.prototype,`readOnly`,void 0),I([d({type:Boolean,attribute:`hide-clear-button`})],U.prototype,`hideClearButton`,void 0),I([d({attribute:`expand-trigger`,reflect:!0})],U.prototype,`expandTrigger`,void 0),I([d({type:Boolean,attribute:`show-search`,reflect:!0})],U.prototype,`showSearch`,void 0),I([d({type:Number,attribute:`max-level`})],U.prototype,`maxLevel`,void 0),I([d()],U.prototype,`width`,void 0),I([d({attribute:!1})],U.prototype,`displayRender`,void 0),I([d({attribute:!1})],U.prototype,`filter`,void 0),I([d({attribute:!1})],U.prototype,`loadData`,void 0),I([d({attribute:!1})],U.prototype,`optionRender`,void 0),I([v()],U.prototype,`expandedValues`,void 0),I([v()],U.prototype,`searchValue`,void 0),I([y(`input`)],U.prototype,`input`,void 0),I([y(`.cascader`)],U.prototype,`anchor`,void 0),I([y(`.dropdown`)],U.prototype,`dropdown`,void 0)})))()}var Vi,W;function Hi(){return(Hi=e((()=>{k(),j(),S(),F(),O(),D(),w(),Mn(),Vt(),u(),m(),p(),qe(),Vi=e=>e.charAt(0).toUpperCase()+e.slice(1),W=class e extends On{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.indeterminate=!1,this.value=`on`,this.label=``,this.shape=`square`,this.size=`medium`,this.color=`primary`,this.labelPlacement=`end`,this.error=!1,this.helperText=``,this.readOnly=!1,this.locale=new C(this),this.aria=new b(this,()=>this.labels),this.slots=new E(this),this.dirty=!1}static{this.tagName=`minerva-checkbox`}static{this.shadowRootOptions={...On.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[A,f`
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
`,P(Ft)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}click(){this.input?.click()}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(e){e.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked)}updated(t){super.updated(t),this.input&&(this.input.indeterminate=this.indeterminate),T&&!this.aria.label&&!this.label&&!this.textContent?.trim()&&N(e.tagName,`no label: set the label attribute, slot a label, or use aria-label / <label for>.`)}handleClick(e){this.readOnly&&e.preventDefault()}handleChange(){this.readOnly||(this.dirty=!0,this.input.indeterminate=this.indeterminate,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value}))}hookStates(){return{state:this.indeterminate?`indeterminate`:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape}}render(){let e=this.isDisabled,t=!!this.label||this.slots.test(`[default]`),n=[this.helperText,this.aria.description].filter(Boolean).join(` `),r=this.error||this.aria.attr(`aria-invalid`)===`true`;return g`<div
part="root"
class=${_({checkboxWrapper:!0,error:r})}
>
<label
class=${_({checkbox:!0,[this.size]:!0,[this.shape]:!0,[`label${Vi(this.labelPlacement)}`]:!0,[`color${Vi(this.color)}`]:this.color!==`primary`,disabled:e,error:r})}
>
<input
part="input"
type="checkbox"
class="input"
.checked=${Qe(this.checked)}
?disabled=${e}
?required=${this.required}
aria-checked=${this.indeterminate?`mixed`:l}
aria-label=${this.aria.label??l}
aria-description=${n||l}
aria-invalid=${r?`true`:l}
aria-readonly=${this.readOnly?`true`:l}
@click=${this.handleClick}
@change=${this.handleChange}
/>
<span class="checkmark" part="control"
>${this.checked&&!this.indeterminate?g`<slot name="icon"></slot>`:l}</span
>
${t?g`<span class="label" part="label"
>${this.label||g`<slot></slot>`}</span
>`:l}
</label>
${this.helperText?g`<div class="helperTextWrapper">
${r?g`<span class="errorIcon" aria-hidden="true"
>${Xt}</span
>`:l}
<span
part="helper-text"
class=${_({helperText:!0,errorText:r})}
>${this.helperText}</span
>
</div>`:l}
</div>`}},I([d({attribute:!1})],W.prototype,`checked`,void 0),I([d({type:Boolean,attribute:`checked`,reflect:!0})],W.prototype,`defaultChecked`,void 0),I([d({type:Boolean,reflect:!0})],W.prototype,`indeterminate`,void 0),I([d()],W.prototype,`value`,void 0),I([d()],W.prototype,`label`,void 0),I([d({reflect:!0})],W.prototype,`shape`,void 0),I([d({reflect:!0})],W.prototype,`size`,void 0),I([d({reflect:!0})],W.prototype,`color`,void 0),I([d({attribute:`label-placement`,reflect:!0})],W.prototype,`labelPlacement`,void 0),I([d({type:Boolean,reflect:!0})],W.prototype,`error`,void 0),I([d({attribute:`helper-text`})],W.prototype,`helperText`,void 0),I([d({type:Boolean,reflect:!0,attribute:`readonly`})],W.prototype,`readOnly`,void 0),I([y(`input`)],W.prototype,`input`,void 0)})))()}var Ui,Wi,Gi;function Ki(){return(Ki=e((()=>{k(),j(),S(),F(),O(),D(),w(),Ln(),fn(),u(),m(),p(),Xe(),Ui=2e3,Wi=e=>e===void 0||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Gi=class e extends M{constructor(...e){super(...e),this.noWrap=!1,this.maxHeight=`24rem`,this.copyable=!1,this.status=`idle`,this.locale=new C(this),this.aria=new b(this),this.slots=new E(this)}static{this.tagName=`minerva-code-block`}static{this.styles=[A,f`
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
`,P(Jn),P(cn)]}get text(){return this.code??this.textContent??``}async copy(){let e=this.text,t=typeof navigator>`u`?void 0:navigator.clipboard,n=!1;if(typeof t?.writeText==`function`)try{await t.writeText(e),n=!0}catch{n=!1}return this.isConnected?(this.showStatus(n?`copied`:`failed`),this.emit(`minerva-copy`,{text:e,success:n}),n):n}showStatus(e){clearTimeout(this.timer),this.status=e,this.timer=setTimeout(()=>this.status=`idle`,Ui)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timer),this.status=`idle`}updated(){T&&this.copyable&&!this.text.trim()&&N(e.tagName,`copyable is set but there is no text to copy (set code or the text content).`)}render(){this.slots;let e=this.locale.t,t=this.aria.label??e(`codeBlock.label`),n=Wi(this.maxHeight),r=this.copyable||!!this.language,i=g`<pre
      part="region"
      role="region"
      tabindex="0"
      aria-label=${t}
      aria-description=${this.aria.description??l}
      data-wrap=${String(!this.noWrap)}
      class=${_({codeBlock:!0,copyable:r})}
      style=${h(r?{}:{maxHeight:n})}
    ><code
        part="code"
        class=${this.language?`language-${this.language}`:l}
        data-language=${this.language??l}
      >${this.text}</code></pre>`;if(!r)return i;let a=this.status,o=a===`copied`?e(`codeBlock.copied`):a===`failed`?e(`codeBlock.copyFailed`):``,s=o||e(`codeBlock.copy`),c=a===`failed`?`danger`:a===`copied`?`success`:`neutral`;return g`<div part="root" class="root" style=${h({maxHeight:n})}>
${i}
<div class="actions">
${this.language?g`<span part="language" class="language" aria-hidden="true"
>${this.language}</span
>`:l}
${this.copyable?g`<button
type="button"
part="copy-button"
class="iconButton ${c} variant-ghost small square"
aria-label=${s}
title=${s}
@click=${()=>void this.copy()}
>
${a===`copied`?dn:a===`failed`?Qt:Ht}
</button>`:l}
</div>
${this.copyable?g`<span class="visuallyHidden" aria-live="polite"
>${o}</span
>`:l}
</div>`}},I([d()],Gi.prototype,`code`,void 0),I([d({reflect:!0})],Gi.prototype,`language`,void 0),I([d({type:Boolean,attribute:`no-wrap`,reflect:!0})],Gi.prototype,`noWrap`,void 0),I([d({attribute:`max-height`})],Gi.prototype,`maxHeight`,void 0),I([d({type:Boolean,reflect:!0})],Gi.prototype,`copyable`,void 0),I([v()],Gi.prototype,`status`,void 0)})))()}var qi,G;function Ji(){return(Ji=e((()=>{j(),an(),F(),Fn(),O(),w(),Ar(),kr(),Ir(),Fr(),Lt(),Tt(),Ut(),u(),m(),se(),te(),qe(),qi={fromAttribute:e=>e===null?void 0:e.split(`,`).map(e=>e.trim()).filter(Boolean),toAttribute:e=>Array.isArray(e)?e.join(`, `):e},G=class e extends M{constructor(...e){super(...e),this.open=!1,this.items=[],this.maxResults=12,this.query=``,this.activeIndex=0,this.locale=new C(this),this.presence=new tn(this,()=>this.panel),this.modal=new Dr(this),this.focusScope=new Pr(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new Er(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleShortcut=e=>{let t=Ne(this.shortcut);if(t.length===0)return;let n=e.composedPath()[0]??e.target;Ee(n)&&!e.ctrlKey&&!e.metaKey&&!e.altKey||e.isComposing||t.some(t=>Ae(e,t))&&(e.preventDefault(),e.stopPropagation(),this.requestOpenChange(!0,`shortcut`))}}static{this.tagName=`minerva-command-dialog`}static{this.styles=[A,Or,f`
:host{
display: contents;
}
`,P(un),P(Tr)]}show(){this.open=!0}hide(){this.open=!1}get results(){let e=Math.max(0,this.maxResults),t=(Array.isArray(this.items)?this.items:[]).filter(e=>!e.disabled),n=this.query.trim();if(!n)return t.slice(0,e);if(typeof this.filter==`function`)return this.filter(t,n).slice(0,e);let r=de(n);return t.filter(e=>de(be(e)).includes(r)).slice(0,e)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}select(e){this.emit(`minerva-select`,{value:e.id,item:e}),this.requestOpenChange(!1,`select`)}handleKeyDown(e){let t=this.results,n=Math.max(t.length-1,0),r={ArrowDown:e=>Math.min(e+1,n),ArrowUp:e=>Math.max(e-1,0),Home:()=>0,End:()=>n}[e.key];if(r&&(e.key.startsWith(`Arrow`)||!this.query)){e.preventDefault(),this.activeIndex=r(Math.min(this.activeIndex,n));return}let i=t[this.activeIndex];e.key===`Enter`&&i&&!e.isComposing&&(e.preventDefault(),this.select(i))}handleInput(e){this.query=e.target.value,this.activeIndex=0}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleShortcut,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleShortcut,!0),x(this.panel),x(this.overlay)}willUpdate(e){e.has(`open`)&&(this.presence.sync(this.open),this.open&&(this.query=``,this.activeIndex=0)),e.has(`items`)&&T&&this.checkItems();let t=this.results.length;this.activeIndex>0&&this.activeIndex>=t&&(this.activeIndex=Math.max(t-1,0))}checkItems(){if(!Array.isArray(this.items)){N(e.tagName,"`items` must be an array of { id, title, ... } objects.");return}let t=new Set;for(let n of this.items)t.has(n.id)&&N(e.tagName,`duplicate item id "${n.id}": ids identify the chosen command in minerva-select and must be unique.`),t.add(n.id)}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(vr(this.overlay),vr(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.open&&(e.has(`activeIndex`)||e.has(`query`))&&this.renderRoot.querySelector(`#option-${this.activeIndex}`)?.scrollIntoView?.({block:`nearest`}),this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}hookStates(){return{state:this.open?`open`:`closed`}}afterClose(){x(this.panel),x(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return l;let e=this.locale.t,t=this.open?`open`:`closed`,n=this.results,r=n[this.activeIndex]?`option-${this.activeIndex}`:void 0,i=this.placeholder??e(`command.placeholder`);return g`<div
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
${this.shortcutLabel?g`<kbd class="kbd">${this.shortcutLabel}</kbd>`:l}
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
aria-activedescendant=${r??l}
autocomplete="off"
spellcheck="false"
placeholder=${i}
.value=${Qe(this.query)}
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
${n.length===0?g`<div class="empty" part="empty">
${this.emptyText??e(`command.empty`)}
</div>`:n.map((e,t)=>{let n=t===this.activeIndex;return g`<button
id=${`option-${t}`}
part=${bn(`item`,{highlighted:n})}
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
><strong>${e.title}</strong>${e.description?g`<small>${e.description}</small>`:l}</span
>${e.group?g`<span class="group">${e.group}</span>`:l}
</button>`})}
</div>
</div>`}},I([d({type:Boolean,reflect:!0})],G.prototype,`open`,void 0),I([d({attribute:!1})],G.prototype,`items`,void 0),I([d()],G.prototype,`label`,void 0),I([d()],G.prototype,`description`,void 0),I([d()],G.prototype,`placeholder`,void 0),I([d({attribute:`empty-text`})],G.prototype,`emptyText`,void 0),I([d({attribute:`shortcut-label`})],G.prototype,`shortcutLabel`,void 0),I([d({converter:qi})],G.prototype,`shortcut`,void 0),I([d({type:Number,attribute:`max-results`})],G.prototype,`maxResults`,void 0),I([d({attribute:!1})],G.prototype,`filter`,void 0),I([d({attribute:`results-label`})],G.prototype,`resultsLabel`,void 0),I([d({attribute:`enter-label`})],G.prototype,`enterLabel`,void 0),I([v()],G.prototype,`query`,void 0),I([v()],G.prototype,`activeIndex`,void 0),I([y(`.content`)],G.prototype,`panel`,void 0),I([y(`.overlay`)],G.prototype,`overlay`,void 0)})))()}var Yi,Xi,Zi;function Qi(){return(Qi=e((()=>{O(),u(),m(),se(),te(),Yi=`(prefers-color-scheme: dark)`,Xi=`data-minerva-theme-scope`,Zi=class extends M{constructor(...e){super(...e),this.root=!1,this.media=null,this.mode=null,this.onSchemeChange=()=>this.apply()}static{this.tagName=`minerva-config`}static{this.styles=f`
:host{
display: contents;
}
`}get resolvedMode(){return this.mode}connectedCallback(){super.connectedCallback(),typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(Yi),this.media.addEventListener(`change`,this.onSchemeChange))}disconnectedCallback(){super.disconnectedCallback(),this.media?.removeEventListener(`change`,this.onSchemeChange),this.media=null,this.root&&this.clear(document.documentElement)}updated(e){e.has(`root`)&&e.get(`root`)!==void 0&&this.clear(e.get(`root`)?document.documentElement:this),this.apply()}target(){return this.root?document.documentElement:this}clear(e){for(let t of[`data-theme`,`data-palette`,Xi,`lang`])(e!==this||t!==`lang`)&&e.removeAttribute(t);_e(e,null),ge(e.style,{}),e.style.removeProperty(`color-scheme`)}apply(){let e=this.target(),t=(t,n)=>{n==null?e.removeAttribute(t):e.setAttribute(t,n)},n=this.theme,r=this.media?.matches?`dark`:`light`,i=n===`system`?r:n===`github-dark`?`dark`:n===`light`||n===`dark`?n:null,a=Be(this.design)?this.design:void 0,s=o(this.palette)?this.palette:oe(a),c=!!s&&n!==`github-dark`;t(`data-theme`,i),t(`data-palette`,c?s:null),this.root||t(Xi,i!==null||c||a!==void 0||[this.density,this.radius,this.shadow,this.fontScale].some(Boolean)?``:null),i?e.style.colorScheme=i:e.style.removeProperty(`color-scheme`),ge(e.style,n===`github-dark`&&Re(n)?ve[n]:{}),_e(e,{preset:a,density:De(this.density)?this.density:void 0,radius:ye(this.radius)?this.radius:void 0,shadow:le(this.shadow)?this.shadow:void 0,fontScale:fe(this.fontScale)?this.fontScale:void 0},{all:!this.root&&a!==void 0}),this.root&&this.locale&&(document.documentElement.lang=this.locale),i!==this.mode&&(this.mode=i,i&&this.emit(`minerva-theme-change`,{mode:i}))}render(){return g`<slot></slot>`}},I([d({reflect:!0})],Zi.prototype,`theme`,void 0),I([d({reflect:!0})],Zi.prototype,`palette`,void 0),I([d({reflect:!0})],Zi.prototype,`design`,void 0),I([d({reflect:!0})],Zi.prototype,`density`,void 0),I([d({reflect:!0})],Zi.prototype,`radius`,void 0),I([d({reflect:!0})],Zi.prototype,`shadow`,void 0),I([d({reflect:!0,attribute:`font-scale`})],Zi.prototype,`fontScale`,void 0),I([d({reflect:!0})],Zi.prototype,`locale`,void 0),I([d({type:Boolean,reflect:!0})],Zi.prototype,`root`,void 0)})))()}var K;function $i(){return($i=e((()=>{k(),j(),S(),an(),F(),O(),D(),w(),Ar(),kr(),Ir(),Fr(),yi(),Lt(),Ut(),u(),m(),K=class e extends M{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.color=`primary`,this.loading=!1,this.confirmDisabled=!1,this.busy=!1,this.locale=new C(this),this.aria=new b(this),this.slots=new E(this),this.presence=new tn(this,()=>this.panel),this.modal=new Dr(this),this.focusScope=new Pr(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new Er(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestClose(this.reason)})),this.reason=`outside`,this.wasPresent=!1}static{this.tagName=`minerva-confirm-dialog`}static{this.dependencies=[H]}static{this.styles=[A,Or,f`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,P(un)]}show(){this.open=!0}hide(){this.open=!1}requestClose(e){return!this.open||!this.emit(`minerva-open-change`,{open:!1,reason:e},{cancelable:!0})?!1:(this.open=!1,e!==`confirm`&&this.emit(`minerva-cancel`,{reason:e}),!0)}async handleConfirm(){if(!this.open||this.loading||this.busy||this.confirmDisabled||!this.emit(`minerva-confirm`,void 0,{cancelable:!0}))return;let e=this.onConfirm?.();if(e&&typeof e.then==`function`){this.busy=!0;try{await e}catch{return}finally{this.busy=!1}}this.requestClose(`confirm`)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,color:this.color,loading:this.loading||this.busy}}updated(t){let n=this.open||this.presence.present;if(t.has(`open`)){let t=this.panel;this.open&&t?(T&&!this.label&&!this.slots.test(`header`)&&!this.aria.label&&N(e.tagName,"set `label` (or the `header` slot / aria-label) to give the alertdialog an accessible name."),vr(this.overlay),vr(t),this.modal.activate(this),this.layer.activate(t),this.focusInitial(t)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!n&&this.afterClose(),this.wasPresent=n}async focusInitial(e){let t=Array.from(e.querySelectorAll(`minerva-button`));await Promise.all(t.map(e=>e.updateComplete)),this.open&&this.panel===e&&(this.focusScope.activate(e),this.emit(`minerva-after-open`))}disconnectedCallback(){super.disconnectedCallback(),x(this.panel),x(this.overlay)}afterClose(){x(this.panel),x(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return l;let e=this.open?`open`:`closed`,t=this.locale.t,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=this.loading||this.busy;return g`<div
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
aria-labelledby=${n?`title`:l}
aria-label=${n?l:this.aria.label??l}
aria-describedby=${r?`description`:l}
tabindex="-1"
data-state=${e}
>
${r?g`<p id="description" class="description" part="description">
${r}
</p>`:l}
${n?g`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:l}
<div class="body" part="body">
${this.slots.test(`[default]`)?g`<slot></slot>`:l}
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
${Qt}
</button>
</div>`}},I([d({type:Boolean,reflect:!0})],K.prototype,`open`,void 0),I([d()],K.prototype,`label`,void 0),I([d()],K.prototype,`description`,void 0),I([d({attribute:`confirm-label`})],K.prototype,`confirmLabel`,void 0),I([d({attribute:`cancel-label`})],K.prototype,`cancelLabel`,void 0),I([d({attribute:`close-label`})],K.prototype,`closeLabel`,void 0),I([d({reflect:!0})],K.prototype,`color`,void 0),I([d({type:Boolean,reflect:!0})],K.prototype,`loading`,void 0),I([d({type:Boolean,reflect:!0,attribute:`confirm-disabled`})],K.prototype,`confirmDisabled`,void 0),I([d({attribute:!1})],K.prototype,`onConfirm`,void 0),I([v()],K.prototype,`busy`,void 0),I([y(`.content`)],K.prototype,`panel`,void 0),I([y(`.overlay`)],K.prototype,`overlay`,void 0)})))()}function ea(e){let t=Mt(e,aa);if(!t)return null;let n=e.ownerDocument;return t===n.documentElement||t===n.body?null:t}function ta(e,t){for(let n=e;n;n=kt(n))if(n===t)return!0;return!1}function na(e){return sa.push(e),()=>{let t=sa.lastIndexOf(e);t>=0&&sa.splice(t,1)}}function ra(e){let t=e?.isConnected===!0?Mt(e,la):null;if(t&&`confirmQueue`in t)return t.confirmQueue;let n=sa[sa.length-1];return n?n.confirmQueue:(ca??=new oa(()=>document.body),ca)}function ia(e){return t=>da({...t,host:t.host??e})}var aa,oa,sa,ca,la,ua,da;function fa(){return(fa=e((()=>{j(),an(),F(),hr(),$i(),aa=`minerva-config:not([root]), [data-minerva-theme-scope], [data-theme], [data-palette]`,oa=class{constructor(e){this.defaultContainer=e,this.requests=[],this.current=null,this.settles=new Set}enqueue(e){return xr(K),new Promise(t=>{this.requests.push({options:e,resolve:t}),this.current||this.showNext()})}cancelAll(){let e=this.requests.splice(0);for(let t of e)t.resolve(!1);for(let e of[...this.settles])e(!1);this.current?.remove()}container(e){let t=typeof document>`u`?null:document,n=e.container;if(n)return n.isConnected?n:(T&&N(K.tagName,"confirm(): `container` is not connected to the document; the dialog is appended to document.body instead."),t.body);let r=e.host?.isConnected===!0?ea(e.host):null,i=this.defaultContainer();return r&&!ta(i,r)?r:i}showNext(){let e=this.requests.shift();if(!e){this.current=null;return}let{options:t,resolve:n}=e,r=this.container(t),i=document.createElement(K.tagName);i.label=t.title,t.description&&(i.description=t.description),t.confirmLabel&&(i.confirmLabel=t.confirmLabel),t.cancelLabel&&(i.cancelLabel=t.cancelLabel),t.closeLabel&&(i.closeLabel=t.closeLabel),t.color&&(i.color=t.color);let a=t.host;if(a?.isConnected&&!t.container){let e=Cn(a);e!==Cn(r)&&i.setAttribute(`lang`,e)}let o=!1,s=!1,c=e=>{o||(o=!0,this.settles.delete(c),n(e))};this.settles.add(c);let ee=new MutationObserver(()=>{i.isConnected||te()}),te=()=>{s||(s=!0,ee.disconnect(),c(!1),i.remove(),this.showNext())};i.addEventListener(`minerva-open-change`,e=>{let{open:t,reason:n}=e.detail;queueMicrotask(()=>{!t&&!e.defaultPrevented&&c(n===`confirm`)})}),i.addEventListener(`minerva-after-close`,te,{once:!0}),this.current=i,r.append(i),ee.observe(document,{childList:!0,subtree:!0}),i.open=!0}},sa=[],ca=null,la=`minerva-confirm-provider`,ua=()=>(T&&N(K.tagName,`confirm() called without a document (server render): resolving false.`),Promise.resolve(!1)),da=e=>typeof document>`u`?ua():ra(e.host).enqueue(e)})))()}var pa;function ma(){return(ma=e((()=>{O(),$i(),fa(),u(),pa=class extends M{constructor(...e){super(...e),this.confirmQueue=new oa(()=>this),this.unregister=null,this.confirm=e=>this.confirmQueue.enqueue(e)}static{this.tagName=`minerva-confirm-provider`}static{this.dependencies=[K]}static{this.styles=f`
:host{
display: contents;
}
`}connectedCallback(){super.connectedCallback(),this.unregister=na(this)}disconnectedCallback(){super.disconnectedCallback(),this.unregister?.(),this.unregister=null,this.confirmQueue.cancelAll()}render(){return g`<slot></slot>`}}})))()}var ha,ga,_a,q,va;function ya(){return(ya=e((()=>{k(),j(),S(),F(),Fn(),O(),w(),An(),Zt(),zr(),u(),m(),p(),Xe(),te(),qe(),Je(),ha=e=>e===void 0?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,ga={ascend:`ascending`,descend:`descending`},_a=48,q=class e extends M{constructor(...e){super(...e),this.columns=[],this.rows=[],this.loading=!1,this.loadingRows=5,this.sortState=null,this.manualSort=!1,this.selectable=!1,this.selectedRowKeys=[],this.size=`medium`,this.variant=`simple`,this.hoverable=!1,this.retryable=!1,this.overflowing=!1,this.aria=new b(this),this.locale=new C(this),this.resize=null,this.handlePageChange=e=>{let{page:t,pageSize:n}=e.detail;queueMicrotask(()=>{e.defaultPrevented||(this.pagination={...this.pagination,current:t,pageSize:n})})}}static{this.tagName=`minerva-data-table`}static{this.dependencies=[Wr]}static{this.styles=[A,f`
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
`,P(xt),P(Kt)]}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect(),this.resize=null}keyOf(e,t){let n=this.rowKey;return typeof n==`function`?n(e,t):typeof n==`string`&&n?e[n]:t}entries(){return(this.rows??[]).map((e,t)=>({row:e,index:t,key:this.keyOf(e,t)}))}rowDisabled(e){return!!this.isRowDisabled?.(e)}willUpdate(t){if(T&&(t.has(`rows`)||t.has(`rowKey`))){let t=this.entries().map(e=>e.key);new Set(t).size!==t.length&&N(e.tagName,`rows have duplicate keys: set row-key to a unique field (or a function).`)}}updated(){this.observeOverflow();let e=this.shadowRoot?.querySelector(`minerva-pagination`);e&&this.pagination&&Object.assign(e,this.pagination)}observeOverflow(){let e=this.wrapper;if(!e){this.resize?.disconnect(),this.resize=null;return}let t=()=>{let t=e.scrollWidth>e.clientWidth||e.scrollHeight>e.clientHeight;t!==this.overflowing&&(this.overflowing=t)};t(),!this.resize&&typeof ResizeObserver<`u`&&(this.resize=new ResizeObserver(t),this.resize.observe(e),e.firstElementChild&&this.resize.observe(e.firstElementChild))}changeSort(e){let t=Oe(this.sortState,e);this.emit(`minerva-sort-change`,t,{cancelable:!0})&&(this.sortState=t)}commitSelection(e){let t=new Set(e),n={selectedRowKeys:e,selectedRows:this.entries().filter(e=>t.has(e.key)).map(e=>e.row)};if(!this.emit(`minerva-selection-change`,n,{cancelable:!0})){this.requestUpdate();return}this.selectedRowKeys=e}toggleRow(e,t){let n=this.selectedRowKeys;this.commitSelection(t?[...n.filter(t=>t!==e),e]:n.filter(t=>t!==e))}renderTable(){let e=this.columns??[],t=this.locale.t,n=je(e),r=this.selectable,i=r&&e[0]?.fixed===`left`,a=i?_a:0,o=this.entries(),s=this.sortState,c=s?.order??null,ee=c===null?void 0:e.find(e=>e.key===s?.key),te=ee?Le(ee):null,ne=!this.manualSort&&te?[...o].sort((e,t)=>c===`descend`?te(t.row,e.row):te(e.row,t.row)):o,re=new Set(this.selectedRowKeys),ie=o.filter(e=>!this.rowDisabled(e.row)),ae=ie.length>0&&ie.every(e=>re.has(e.key)),oe=!ae&&o.some(e=>re.has(e.key)),se=()=>{let e=new Set(ie.map(e=>e.key)),t=this.selectedRowKeys;this.commitSelection(ae?t.filter(t=>!e.has(t)):[...t,...ie.map(e=>e.key).filter(e=>!re.has(e))])},ce=e=>{let t={textAlign:e.align},r=ha(e.width);return r!==void 0&&(t.width=r,t.minWidth=r),e.fixed===`left`?t.left=`${(n.leftOffsets[e.key]??0)+a}px`:e.fixed===`right`&&(t.right=`${n.rightOffsets[e.key]??0}px`),t},le=e=>e.fixed===`left`&&e.key===n.lastLeftFixedKey?`left`:e.fixed===`right`&&e.key===n.firstRightFixedKey?`right`:l,ue=h({width:`${_a}px`,minWidth:`${_a}px`,...i?{left:`0px`}:{}}),de=i?`left`:l,fe=e.length+ +!!r,pe=e=>{if(!e.sortable)return g`<th
part="header-cell"
scope="col"
style=${h(ce(e))}
data-ellipsis=${e.ellipsis?`true`:l}
data-fixed=${e.fixed??l}
data-fixed-edge=${le(e)}
>
${e.header}
</th>`;let t=s?.key===e.key?s.order:null,n=t===`ascend`?_n:t===`descend`?ln:hn,r=t?ga[t]:`none`;return g`<th
part=${bn(`header-cell`,{sort:r})}
scope="col"
aria-sort=${r}
data-sort=${r}
style=${h(ce(e))}
data-ellipsis=${e.ellipsis?`true`:l}
data-fixed=${e.fixed??l}
data-fixed-edge=${le(e)}
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
</th>`},me;me=this.loading?Array.from({length:this.loadingRows},()=>g`<tr part="row" aria-hidden="true">
${r?g`<td
part="cell"
class="selectionCell"
style=${ue}
data-fixed=${de}
></td>`:l}
${e.map(e=>g`<td
part="cell"
style=${h(ce(e))}
data-fixed=${e.fixed??l}
data-fixed-edge=${le(e)}
>
<span part="skeleton" class="skeleton"></span>
</td>`)}
</tr>`):o.length===0?g`<tr part="row">
<td part="empty" colspan=${fe} class="empty">
<slot name="empty">${this.emptyText??t(`table.empty`)}</slot>
</td>
</tr>`:Ke(ne,e=>e.key,({row:n,index:i,key:a},o)=>{let s=r&&re.has(a);return g`<tr
part=${bn(`row`,{selected:s})}
aria-selected=${s?`true`:l}
?data-selected=${s}
>
${r?g`<td
part="cell"
class="selectionCell"
style=${ue}
data-fixed=${de}
>
<input
type="checkbox"
part="checkbox"
class="checkbox"
.checked=${Qe(s)}
?disabled=${this.rowDisabled(n)}
aria-label=${t(`table.selectRow`,{row:this.getRowLabel?.(n,i)??String(a)})}
@change=${e=>this.toggleRow(a,e.target.checked)}
/>
</td>`:l}
${e.map(e=>g`<td
part="cell"
style=${h(ce(e))}
data-ellipsis=${e.ellipsis?`true`:l}
data-fixed=${e.fixed??l}
data-fixed-edge=${le(e)}
>
${e.render?e.render(n,o):n[e.key]}
</td>`)}
</tr>`});let he=ha(this.scrollX),ge=ha(this.scrollY),_e=!!(he||ge)||this.overflowing,ve=this.aria.label;return g`<div
part="viewport"
class=${_({wrapper:!0,wrapperBordered:this.variant===`bordered`,wrapperScrollY:!!ge})}
role=${_e?`region`:l}
tabindex=${_e?0:l}
aria-label=${_e?ve??t(`table.scrollRegion`):l}
style=${h(ge?{maxHeight:ge,overflowY:`auto`}:{})}
>
<table
part="table"
class=${_({table:!0,[this.size]:!0,[this.variant]:!0,hoverable:this.hoverable,scrollX:!!he})}
style=${h(he?{minWidth:he}:{})}
aria-label=${ve??l}
aria-description=${this.aria.description??l}
>
<thead>
<tr part="row">
${r?g`<th
part="header-cell"
scope="col"
class="selectionCell"
style=${ue}
data-fixed=${de}
>
<input
type="checkbox"
part="checkbox"
class="checkbox"
.checked=${Qe(ae)}
.indeterminate=${oe}
?disabled=${ie.length===0||this.loading}
aria-label=${t(`table.selectAll`)}
@change=${se}
/>
</th>`:l}
${e.map(pe)}
</tr>
</thead>
<tbody>
${me}
</tbody>
</table>
</div>`}hookStates(){return{loading:this.loading,size:this.size,variant:this.variant}}render(){let e=!!this.error&&!this.loading;return g`<div
part="root"
class="dataTable"
aria-busy=${this.loading?`true`:l}
>
${e?g`<div part="error" class="error" role="alert">
<div class="errorTitle">
<slot name="error">${this.error}</slot>
</div>
${this.retryable?g`<button
type="button"
part="retry-button"
class="customButton neutral variant-outline small retry"
@click=${()=>this.emit(`minerva-retry`)}
>
<span class="label"
><span class="retryIcon" aria-hidden="true"
>${Rt}</span
>${this.retryLabel??this.locale.t(`table.retry`)}</span
>
</button>`:l}
</div>`:g`${this.renderTable()}
${this.pagination?g`<minerva-pagination
part="pagination"
exportparts="root: pagination-root, item: pagination-item"
@minerva-page-change=${this.handlePageChange}
></minerva-pagination>`:l}`}
</div>`}},I([d({attribute:!1})],q.prototype,`columns`,void 0),I([d({attribute:!1})],q.prototype,`rows`,void 0),I([d({attribute:`row-key`})],q.prototype,`rowKey`,void 0),I([d({attribute:`empty-text`})],q.prototype,`emptyText`,void 0),I([d({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),I([d({type:Number,attribute:`loading-rows`})],q.prototype,`loadingRows`,void 0),I([d({attribute:!1})],q.prototype,`sortState`,void 0),I([d({type:Boolean,attribute:`manual-sort`})],q.prototype,`manualSort`,void 0),I([d({type:Boolean,reflect:!0})],q.prototype,`selectable`,void 0),I([d({attribute:!1})],q.prototype,`selectedRowKeys`,void 0),I([d({attribute:!1})],q.prototype,`isRowDisabled`,void 0),I([d({attribute:!1})],q.prototype,`getRowLabel`,void 0),I([d({reflect:!0})],q.prototype,`size`,void 0),I([d({reflect:!0})],q.prototype,`variant`,void 0),I([d({type:Boolean,reflect:!0})],q.prototype,`hoverable`,void 0),I([d({attribute:`scroll-x`})],q.prototype,`scrollX`,void 0),I([d({attribute:`scroll-y`})],q.prototype,`scrollY`,void 0),I([d({attribute:!1})],q.prototype,`pagination`,void 0),I([d()],q.prototype,`error`,void 0),I([d({type:Boolean})],q.prototype,`retryable`,void 0),I([d({attribute:`retry-label`})],q.prototype,`retryLabel`,void 0),I([v()],q.prototype,`overflowing`,void 0),I([y(`.wrapper`)],q.prototype,`wrapper`,void 0),va=class extends M{constructor(...e){super(...e),this.primary=``,this.monospace=!1,this.maxWidth=360,this.observer=null}static{this.tagName=`minerva-table-cell-content`}static{this.styles=[A,f`
:host{
display: block;
min-width: 0;
}
`,P(Kt)]}hasSecondarySlot(){return Array.from(this.children).some(e=>e.getAttribute(`slot`)===`secondary`)}connectedCallback(){super.connectedCallback(),this.observer??=typeof MutationObserver>`u`?null:new MutationObserver(()=>this.requestUpdate()),this.observer?.observe(this,{childList:!0})}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}render(){let e=this.secondary!==void 0&&this.secondary!==null||this.hasSecondarySlot(),t=_({cellPrimary:!0,cellMono:this.monospace,cellStrong:e}),n=g`<slot>${this.primary}</slot>`;return g`<div
part="root"
class="cellContent"
style=${h({maxWidth:ha(this.maxWidth)})}
>
${this.monospace?g`<code part="primary" class=${t}>${n}</code>`:g`<div part="primary" class=${t}>${n}</div>`}
${e?g`<div part="secondary" class="cellSecondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:l}
</div>`}},I([d()],va.prototype,`primary`,void 0),I([d()],va.prototype,`secondary`,void 0),I([d({type:Boolean,reflect:!0})],va.prototype,`monospace`,void 0),I([d({attribute:`max-width`})],va.prototype,`maxWidth`,void 0)})))()}var ba,xa;function Sa(){return(Sa=e((()=>{j(),O(),w(),Gt(),u(),m(),p(),ba=class extends M{constructor(...e){super(...e),this.label=``}static{this.tagName=`minerva-description-item`}static{this.styles=[A,f`
:host{
display: contents;
}
`]}render(){return g`<slot></slot>`}},I([d({reflect:!0})],ba.prototype,`label`,void 0),xa=class e extends M{constructor(...e){super(...e),this.items=[],this.bordered=!1,this.striped=!1,this.observer=null}static{this.tagName=`minerva-description-list`}static{this.dependencies=[ba]}static{this.shadowRootOptions={...M.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[A,f`
:host{
display: block;
}
`,P(Hn)]}declarativeItems(){return Array.from(this.children).filter(e=>e.localName===ba.tagName)}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,attributes:!0,subtree:!0,attributeFilter:[`label`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}updated(){let t=this.declarativeItems();if(Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,n)=>{let r=t[n];r&&typeof e.assign==`function`&&e.assign(r)}),T){let t=Array.from(this.children).filter(e=>e.localName!==ba.tagName);t.length&&N(e.tagName,`only <minerva-description-item> children are rendered (ignored: <${t[0].localName}>).`)}}render(){let e=this.declarativeItems();return g`<dl
part="root"
class=${_({descriptionList:!0,bordered:this.bordered,striped:this.striped})}
>
${(this.items??[]).map(e=>g`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description">${e.value}</dd>
</div>`)}
${e.map(e=>g`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description"><slot data-item></slot></dd>
</div>`)}
</dl>`}},I([d({attribute:!1})],xa.prototype,`items`,void 0),I([d({type:Boolean,reflect:!0})],xa.prototype,`bordered`,void 0),I([d({type:Boolean,reflect:!0})],xa.prototype,`striped`,void 0)})))()}var Ca,wa;function Ta(){return(Ta=e((()=>{j(),O(),D(),w(),Ct(),u(),m(),p(),Xe(),Ca=e=>typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,wa=class e extends M{constructor(...e){super(...e),this.variant=`solid`,this.orientation=`horizontal`,this.thickness=1,this.spacing=16,this.textAlign=`center`,this.elevation=!1,this.flexItem=!1,this.slots=new E(this)}static{this.tagName=`minerva-divider`}static{this.styles=[A,f`
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
`,P(Wn)]}hookStates(){let e=this.orientation===`horizontal`&&this.slots.test(`[default]`);return{orientation:this.orientation,variant:this.variant,align:e?this.textAlign:void 0}}updated(){T&&this.orientation===`vertical`&&this.slots.test(`[default]`)&&N(e.tagName,`text is only rendered by horizontal dividers; it is ignored when orientation is vertical.`)}render(){let e=this.orientation===`horizontal`,t=e&&this.slots.test(`[default]`),n=this.textAlign,r={};if(this.thickness!=null&&!Number.isNaN(this.thickness)&&(r.borderWidth=`${this.thickness}px`,r[`--_divider-thickness`]=`${this.thickness}px`),this.length!=null&&this.length!==``&&(r[e?`width`:`height`]=Ca(this.length)),this.spacing!=null&&!Number.isNaN(this.spacing)){let t=`${this.spacing}px`;r.marginTop=e?t:`0`,r.marginBottom=e?t:`0`,r.marginLeft=e?`0`:t,r.marginRight=e?`0`:t}let i=_({divider:!0,[this.variant]:!0,[this.orientation]:!0,withText:t,[`text${n.charAt(0).toUpperCase()}${n.slice(1)}`]:t,elevation:this.elevation,flexItem:this.flexItem});return t?g`<div
part="root"
role="separator"
aria-orientation=${this.orientation}
class=${i}
style=${h(r)}
>
<span class="text" part="label"><slot></slot></span>
</div>`:g`<hr
part="root"
aria-orientation=${this.orientation}
class=${i}
style=${h(r)}
/>`}},I([d({reflect:!0})],wa.prototype,`variant`,void 0),I([d({reflect:!0})],wa.prototype,`orientation`,void 0),I([d({type:Number})],wa.prototype,`thickness`,void 0),I([d()],wa.prototype,`length`,void 0),I([d({type:Number})],wa.prototype,`spacing`,void 0),I([d({attribute:`text-align`})],wa.prototype,`textAlign`,void 0),I([d({type:Boolean,reflect:!0})],wa.prototype,`elevation`,void 0),I([d({type:Boolean,reflect:!0,attribute:`flex-item`})],wa.prototype,`flexItem`,void 0)})))()}var Ea,Da;function Oa(){return(Oa=e((()=>{k(),j(),S(),an(),F(),O(),D(),w(),Ar(),kr(),Ir(),Fr(),Ut(),Yt(),u(),m(),p(),Ea=[`left`,`right`,`top`,`bottom`],Da=class e extends M{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.side=`right`,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.nonModal=!1,this.locale=new C(this),this.aria=new b(this),this.slots=new E(this),this.presence=new tn(this,()=>this.panel),this.modal=new Dr(this),this.focusScope=new Pr(this,()=>({trapped:!this.nonModal,loop:!0,restoreFocus:!0})),this.layer=new Er(this,()=>({disableOutsidePointerEvents:!this.nonModal,branches:()=>[this.triggerElement()],onFocusOutside:()=>this.nonModal,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-drawer-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)}}static{this.tagName=`minerva-drawer`}static{this.styles=[A,Or,f`
:host{
display: contents;
}
`,P(At)]}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(t){t.has(`open`)&&this.presence.sync(this.open),T&&t.has(`side`)&&!Ea.includes(this.side)&&N(e.tagName,`invalid side "${this.side}" (expected left, right, top or bottom).`)}hookStates(){return{state:this.open?`open`:`closed`,side:Ea.includes(this.side)?this.side:`right`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)||e.has(`nonModal`)&&this.open){let t=this.panel;this.open&&t?(e.has(`nonModal`)&&!e.has(`open`)&&(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate()),vr(this.overlay),vr(t),this.nonModal||this.modal.activate(this),this.layer.activate(t),this.focusScope.activate(t),e.has(`open`)&&this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),x(this.panel),x(this.overlay)}afterClose(){x(this.panel),x(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=Ea.includes(this.side)?this.side:`right`;return g`<slot name="trigger"></slot> ${e?g`${this.nonModal?l:g`<div
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
aria-modal=${this.nonModal?l:`true`}
aria-labelledby=${n?`title`:l}
aria-label=${n?l:this.aria.label??l}
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
${n?g`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:l}
<div class="body" part="body"><slot></slot></div>
${this.slots.test(`footer`)?g`<div class="footer" part="footer">
<slot name="footer"></slot>
</div>`:l}
${this.hideCloseButton?l:g`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`drawer.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${Qt}
</button>`}
</div>`:l}`}},I([d({type:Boolean,reflect:!0})],Da.prototype,`open`,void 0),I([d()],Da.prototype,`label`,void 0),I([d()],Da.prototype,`description`,void 0),I([d({attribute:`hidden-description`})],Da.prototype,`hiddenDescription`,void 0),I([d({reflect:!0})],Da.prototype,`side`,void 0),I([d({reflect:!0})],Da.prototype,`size`,void 0),I([d({type:Boolean,attribute:`hide-close-button`})],Da.prototype,`hideCloseButton`,void 0),I([d({attribute:`close-label`})],Da.prototype,`closeLabel`,void 0),I([d({attribute:`dialog-role`})],Da.prototype,`dialogRole`,void 0),I([d({type:Boolean,reflect:!0,attribute:`non-modal`})],Da.prototype,`nonModal`,void 0),I([y(`.content`)],Da.prototype,`panel`,void 0),I([y(`.overlay`)],Da.prototype,`overlay`,void 0)})))()}var ka,Aa,ja,Ma;function Na(){return(Na=e((()=>{k(),j(),F(),O(),D(),w(),Nt(),u(),m(),p(),Xe(),ka=Ge`<svg class="defaultIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke="none" aria-hidden="true" focusable="false"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM5 5v9h4a3 3 0 0 0 6 0h4V5ZM5 16v3h14v-3h-2.54a5 5 0 0 1-8.92 0Z" /></svg>`,Aa=Ge`<svg class="defaultIcon" aria-hidden="true" focusable="false" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse style="fill: var(--surface-muted-color)" cx="32" cy="33" rx="32" ry="7" /><g fill-rule="nonzero" style="stroke: var(--border-strong-color)"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" /><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" style="fill: var(--surface-color)" /></g></g></svg>`,ja=e=>e&&/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Ma=class e extends M{constructor(...e){super(...e),this.heading=``,this.hideDescription=!1,this.hideIcon=!1,this.useSvg=!1,this.showShadow=!1,this.locale=new C(this),this.aria=new b(this),this.slots=new E(this)}static{this.tagName=`minerva-empty`}static{this.styles=[A,f`
:host{
display: block;
}
`,P(on)]}hookStates(){return{size:this.size}}updated(){T&&this.hideDescription&&this.description&&N(e.tagName,`description is ignored while hide-description is set.`)}render(){let e=!!this.heading||this.slots.test(`heading`),t=this.slots.test(`description`),n=this.description??this.locale.t(`empty.description`),r=!this.hideDescription&&(t||n!==``),i=this.slots.test(`action`)||this.slots.test(`secondary-action`),a=this.aria.label;return g`<div
part="root"
class=${_({empty:!0,showShadow:this.showShadow,sized:!!this.size,[`size-${this.size}`]:!!this.size})}
style=${h({width:ja(this.width),height:ja(this.height)})}
role="status"
aria-label=${a??l}
aria-labelledby=${a?l:e?`title`:r?`description`:l}
aria-describedby=${e&&r?`description`:l}
>
${this.hideIcon?l:g`<div part="icon" class="iconWrapper">
<slot name="icon">${this.useSvg?Aa:ka}</slot>
</div>`}
${e?g`<div id="title" part="title" class="title">
<slot name="heading">${this.heading}</slot>
</div>`:l}
${r?g`<div id="description" part="description" class="description">
<slot name="description">${n}</slot>
</div>`:l}
${i?g`<div part="actions" class="actions">
<slot name="action"></slot><slot name="secondary-action"></slot>
</div>`:l}
${this.slots.test(`[default]`)?g`<div part="footer" class="footer"><slot></slot></div>`:l}
</div>`}},I([d()],Ma.prototype,`heading`,void 0),I([d()],Ma.prototype,`description`,void 0),I([d({type:Boolean,attribute:`hide-description`})],Ma.prototype,`hideDescription`,void 0),I([d({type:Boolean,attribute:`hide-icon`})],Ma.prototype,`hideIcon`,void 0),I([d({reflect:!0})],Ma.prototype,`size`,void 0),I([d({type:Boolean,attribute:`use-svg`})],Ma.prototype,`useSvg`,void 0),I([d()],Ma.prototype,`width`,void 0),I([d()],Ma.prototype,`height`,void 0),I([d({type:Boolean,attribute:`show-shadow`})],Ma.prototype,`showShadow`,void 0)})))()}var Pa,Fa;function Ia(){return(Ia=e((()=>{j(),O(),D(),w(),yr(),u(),m(),Pa=e=>e.localName===`minerva-checkbox`||e.localName===`minerva-switch`||e instanceof HTMLInputElement&&(e.type===`checkbox`||e.type===`radio`),Fa=class e extends M{constructor(...e){super(...e),this.label=``,this.helperText=``,this.errorMessage=``,this.invalid=!1,this.required=!1,this.disabled=!1,this.readOnly=!1,this.requiredIndicator=`*`,this.slots=new E(this),this.observer=null,this.control=null,this.saved=new Map}static{this.tagName=`minerva-form-control`}static{this.styles=[A,f`
:host{
display: block;
}
.label{
cursor: default;
}
`,P(Dt)]}get controlElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.release()}updated(){this.sync()}get labelText(){return this.label?this.label:Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`label`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}slotText(e){return Array.from(this.children).filter(t=>t.getAttribute(`slot`)===e).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}get descriptionText(){return this.invalid?this.errorMessage||this.slotText(`error-message`):this.helperText||this.slotText(`helper-text`)}save(e,t){this.saved.has(e)||this.saved.set(e,t)}setAttr(e,t,n){let r=`@${t}`;if(n===null){if(!this.saved.has(r))return;let n=this.saved.get(r);this.saved.delete(r),n===null?e.removeAttribute(t):e.setAttribute(t,n);return}this.save(r,e.getAttribute(t)),e.getAttribute(t)!==n&&e.setAttribute(t,n)}setProp(e,t,n){let r=`.${t}`;if(!n){if(!this.saved.has(r))return;e[t]=this.saved.get(r),this.saved.delete(r);return}this.save(r,e[t]),e[t]=!0}propFor(e,t){return{invalid:[`invalid`,`error`],required:[`required`],disabled:[`disabled`],readOnly:[`readOnly`,`readonly`]}[t].find(t=>t in e&&typeof e[t]==`boolean`)??null}release(){let e=this.control;if(e){for(let[t,n]of this.saved)if(t.startsWith(`@`)){let r=t.slice(1);n===null?e.removeAttribute(r):e.setAttribute(r,n)}else e[t.slice(1)]=n;this.saved.clear(),this.control=null}}sync(){let t=this.controlElement;if(t!==this.control&&(this.release(),this.control=t),!t)return;let n=this.labelText,r=this.saved.has(`@aria-label`);n&&(r||!t.hasAttribute(`aria-label`))?this.setAttr(t,`aria-label`,n):n||this.setAttr(t,`aria-label`,null);let i=this.descriptionText;this.setAttr(t,`aria-description`,i||null);for(let e of[`invalid`,`required`,`disabled`,`readOnly`]){let n=this.propFor(t,e);n&&this.setProp(t,n,this[e])}if(this.setAttr(t,`aria-invalid`,this.invalid?`true`:null),this.setAttr(t,`aria-required`,this.required?`true`:null),this.setAttr(t,`aria-readonly`,this.readOnly?`true`:null),T&&this.children.length>0){let t=Array.from(this.children).filter(e=>!e.hasAttribute(`slot`));t.length>1&&N(e.tagName,`wraps ONE control, found ${t.length} elements in the default slot: only the first one is wired.`)}}handleLabelClick(e){let t=this.controlElement;t&&!this.disabled&&(e.preventDefault(),Pa(t)?t.click():t.focus())}hookStates(){return{disabled:this.disabled,invalid:this.invalid,readonly:this.readOnly,required:this.required}}render(){let e=!!this.label||this.slots.test(`label`),t=!!this.helperText||this.slots.test(`helper-text`),n=!!this.errorMessage||this.slots.test(`error-message`);return g`<div class="root" part="root">
${e?g`<label
id="label"
class="label"
part="label"
@click=${this.handleLabelClick}
>${this.label||g`<slot name="label"></slot>`}${this.required?g`<span
class="required"
part="required-indicator"
aria-hidden="true"
>${this.requiredIndicator}</span
>`:l}</label
>`:l}
<slot @slotchange=${()=>this.sync()}></slot>
${!this.invalid&&t?g`<div id="helper" class="helper" part="helper-text">
${this.helperText||g`<slot name="helper-text"></slot>`}
</div>`:l}
${this.invalid&&n?g`<div
id="error"
class="error"
part="error-message"
role="alert"
>
${this.errorMessage||g`<slot name="error-message"></slot>`}
</div>`:l}
</div>`}},I([d()],Fa.prototype,`label`,void 0),I([d({attribute:`helper-text`})],Fa.prototype,`helperText`,void 0),I([d({attribute:`error-message`})],Fa.prototype,`errorMessage`,void 0),I([d({type:Boolean,reflect:!0})],Fa.prototype,`invalid`,void 0),I([d({type:Boolean,reflect:!0})],Fa.prototype,`required`,void 0),I([d({type:Boolean,reflect:!0})],Fa.prototype,`disabled`,void 0),I([d({type:Boolean,reflect:!0,attribute:`readonly`})],Fa.prototype,`readOnly`,void 0),I([d({attribute:`required-indicator`})],Fa.prototype,`requiredIndicator`,void 0)})))()}var La;function Ra(){return(Ra=e((()=>{O(),w(),pi(),rn(),wn(),Ur(),u(),m(),Xe(),La=class e extends M{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-form-layout`}static{this.styles=[A,f`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,P(br),P(Cr)]}render(){let t=Hr(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return g`<div class="root" part="root" style=${h(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},I([d({converter:Rr})],La.prototype,`columns`,void 0),I([d({converter:fi})],La.prototype,`gap`,void 0),I([d({attribute:`row-gap`,converter:fi})],La.prototype,`rowGap`,void 0),I([d({attribute:`column-gap`,converter:fi})],La.prototype,`columnGap`,void 0)})))()}function za(e){let t=``;if(e&&typeof window<`u`){let n=We(window);n.isSupported&&(n.addHook(`uponSanitizeAttribute`,(e,t)=>{t.attrName===`src`&&(e.nodeName!==`IMG`||!/^data:image\/(?:png|jpeg|gif|webp|avif);base64,[a-z0-9+/=\s]+$/i.test(t.attrValue))&&(t.keepAttr=!1)}),n.sanitize(Ha,Va)===Ua&&(t=n.sanitize(e,Va)))}return`<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="${Ba}"><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${t}</body></html>`}var Ba,Va,Ha,Ua;function Wa(){return(Wa=e((()=>{nt(),Ba=`default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; object-src 'none'; frame-src 'none'; font-src 'none'; media-src 'none'; form-action 'none'; base-uri 'none'`,Va={ALLOWED_TAGS:`a abbr b bdi bdo blockquote br caption center code col colgroup dd del div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i img ins li ol p pre s section small span strong style sub sup table tbody td tfoot th thead tr u ul wbr`.split(` `),ALLOWED_ATTR:`alt title class style lang dir role width height align valign bgcolor border cellpadding cellspacing colspan rowspan scope src`.split(` `),ALLOW_DATA_ATTR:!1,ALLOW_ARIA_ATTR:!0,FORBID_TAGS:[`base`,`meta`,`link`,`script`,`form`,`input`,`button`,`iframe`,`object`,`embed`,`svg`,`math`],FORBID_ATTR:[`href`,`srcdoc`,`srcset`,`action`,`formaction`,`target`,`ping`,`id`,`name`],FORCE_BODY:!0,RETURN_TRUSTED_TYPE:!1},Ha=`<p title="t" onclick="x()">ok</p><script>x()<\/script><img alt="a" src="https://x.invalid/p" onerror="x()">`,Ua=`<p title="t">ok</p><img alt="a">`})))()}var Ga;function Ka(){return(Ka=e((()=>{k(),j(),O(),w(),_r(),Wa(),u(),m(),Xe(),et(),Ga=class e extends M{constructor(...e){super(...e),this.html=``,this.label=``,this.viewport=`desktop`,this.mobileWidth=375,this.height=600,this.doc=za(),this.aria=new b(this)}static{this.tagName=`minerva-html-preview`}static{this.styles=[A,f`
:host{
display: block;
}
`,P(xn)]}willUpdate(e){e.has(`html`)&&(this.doc=za(this.html))}updated(){T&&!this.label&&!this.aria.label&&N(e.tagName,`set label (or aria-label): the iframe needs a title for assistive technologies.`)}render(){let e=Number.isFinite(this.mobileWidth)&&this.mobileWidth>0?this.mobileWidth:375,t=Number.isFinite(this.height)&&this.height>0?this.height:600;return g`<div part="root" class="preview">
${Ze(this.doc,g`<iframe
part="frame"
class="frame"
title=${this.label||this.aria.label||``}
sandbox=""
referrerpolicy="no-referrer"
srcdoc=${this.doc}
style=${h({width:this.viewport===`mobile`?`${e}px`:`100%`,height:`${t}px`})}
></iframe>`)}
</div>`}},I([d()],Ga.prototype,`html`,void 0),I([d()],Ga.prototype,`label`,void 0),I([d({reflect:!0})],Ga.prototype,`viewport`,void 0),I([d({type:Number,attribute:`mobile-width`})],Ga.prototype,`mobileWidth`,void 0),I([d({type:Number})],Ga.prototype,`height`,void 0),I([v()],Ga.prototype,`doc`,void 0)})))()}var qa,Ja,J;function Ya(){return(Ya=e((()=>{k(),j(),S(),F(),gr(),O(),w(),Ln(),Ir(),In(),u(),m(),p(),qa=200,Ja=300,J=class e extends M{constructor(...e){super(...e),this.color=`neutral`,this.variant=`ghost`,this.size=`medium`,this.shape=`circle`,this.disabled=!1,this.loading=!1,this.toggle=!1,this.pressed=!1,this.tooltipPlacement=`top`,this.noTooltip=!1,this.type=`button`,this.tooltipOpen=!1,this.tooltipPositioned=!1,this.internals=Sr(this),this.aria=new b(this),this.locale=new C(this),this.floating=new Mr(this,()=>({anchor:()=>this.button,floating:()=>this.tooltipElement,branches:()=>[this],placement:this.tooltipPlacement,offset:{mainAxis:8},dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,onDismiss:()=>this.hideTooltip(),onPosition:()=>{this.tooltipPositioned=!0}})),this.handlePointerEnter=()=>{if(!this.tooltipEnabled||this.tooltipOpen){this.clearTimers();return}this.clearTimers(),this.enterTimer=setTimeout(()=>this.showTooltip(),qa)},this.handlePointerLeave=()=>{this.clearTimers(),this.tooltipOpen&&(this.leaveTimer=setTimeout(()=>this.hideTooltip(),Ja))},this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-icon-button`}static{this.formAssociated=!0}static{this.shadowRootOptions={...M.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[A,Or,f`
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
`,P(Jn),P(Rn)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}get tooltipContent(){return this.tooltip||this.label||void 0}get tooltipEnabled(){return!this.noTooltip&&!!this.tooltipContent&&!this.disabled&&!this.loading}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer)}showTooltip(){this.tooltipEnabled&&(this.clearTimers(),this.tooltipOpen=!0)}hideTooltip(){this.clearTimers(),this.tooltipOpen=!1,this.tooltipPositioned=!1}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}if(this.toggle){let e=!this.pressed;this.emit(`minerva-pressed-change`,{pressed:e},{cancelable:!0})&&(this.pressed=e)}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0),this.clearTimers(),this.tooltipOpen=!1}hookStates(){return{state:this.toggle&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}willUpdate(e){(e.has(`disabled`)||e.has(`loading`)||e.has(`noTooltip`))&&!this.tooltipEnabled&&this.hideTooltip()}updated(){this.floating.sync(this.tooltipOpen&&this.tooltipEnabled),T&&!this.label&&!this.aria.label&&N(e.tagName,`icon buttons only contain an icon: set label (or aria-label) to give them an accessible name.`)}render(){let e=this.tooltipOpen&&this.tooltipEnabled;return g`<button
part="root"
type="button"
class=${_({iconButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape]:!0,disabled:this.disabled,loading:this.loading,pressed:this.toggle&&this.pressed})}
?disabled=${this.disabled}
tabindex=${this.disabled?`-1`:`0`}
aria-label=${this.label??this.aria.label??this.locale.t(`iconButton.default`)}
aria-description=${this.aria.description??l}
aria-describedby=${e?`tooltip`:l}
aria-pressed=${this.toggle?String(this.pressed):l}
aria-expanded=${this.aria.attr(`aria-expanded`)??l}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??l}
aria-busy=${this.loading?`true`:l}
aria-disabled=${this.loading&&!this.disabled?`true`:l}
@click=${this.handleClick}
@mouseenter=${this.handlePointerEnter}
@mouseleave=${this.handlePointerLeave}
@focus=${()=>this.showTooltip()}
@blur=${()=>this.hideTooltip()}
>
${this.loading?g`<span
class=${_({spinner:!0,[this.size]:!0})}
part="spinner"
role="progressbar"
aria-label=${this.locale.t(`common.loading`)}
>${qt}</span
>`:g`<span class="glyph" part="icon" aria-hidden="true"
><slot></slot
></span>`}
</button>
${e?g`<div
id="tooltip"
part="tooltip"
role="tooltip"
popover="manual"
class=${_({tooltip:!0,neutral:!0,solid:!0,default:!0,"animation-fade":!0,show:this.tooltipPositioned})}
@mouseenter=${()=>this.clearTimers()}
@mouseleave=${this.handlePointerLeave}
>
${this.tooltipContent}
</div>`:l}`}},I([d()],J.prototype,`label`,void 0),I([d({reflect:!0})],J.prototype,`color`,void 0),I([d({reflect:!0})],J.prototype,`variant`,void 0),I([d({reflect:!0})],J.prototype,`size`,void 0),I([d({reflect:!0})],J.prototype,`shape`,void 0),I([d({type:Boolean,reflect:!0})],J.prototype,`disabled`,void 0),I([d({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),I([d({type:Boolean,reflect:!0})],J.prototype,`toggle`,void 0),I([d({type:Boolean,reflect:!0})],J.prototype,`pressed`,void 0),I([d()],J.prototype,`tooltip`,void 0),I([d({attribute:`tooltip-placement`})],J.prototype,`tooltipPlacement`,void 0),I([d({type:Boolean,attribute:`no-tooltip`})],J.prototype,`noTooltip`,void 0),I([d({reflect:!0})],J.prototype,`type`,void 0),I([v()],J.prototype,`tooltipOpen`,void 0),I([v()],J.prototype,`tooltipPositioned`,void 0),I([y(`button`)],J.prototype,`button`,void 0),I([y(`.tooltip`)],J.prototype,`tooltipElement`,void 0)})))()}var Xa,Y;function Za(){return(Za=e((()=>{k(),j(),S(),F(),O(),D(),w(),fr(),Mn(),u(),m(),p(),qe(),Xa=0,Y=class e extends On{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.type=`text`,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.clearable=!1,this.showCharCount=!1,this.passwordVisible=!1,this.countId=`minerva-input-count-${Xa++}`,this.locale=new C(this),this.aria=new b(this,()=>this.labels),this.slots=new E(this),this.dirty=!1}static{this.tagName=`minerva-input`}static{this.shadowRootOptions={...On.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[A,f`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,P(Gn)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}select(){this.input?.select()}getFormValue(){return this.value}getValidity(){let e=this.input;return e?{flags:tr(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.passwordVisible=!1}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),T&&t.has(`maxLength`)&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&N(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=this.input.value,this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}clear(){this.value=``,this.input.value=``,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:``}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:``}),this.emit(`minerva-clear`),this.input.focus()}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.type===`password`,r=this.clearable&&this.value!==``&&!t&&!this.readOnly,i=this.passwordVisible?this.hidePasswordLabel??e(`input.hidePassword`):this.showPasswordLabel??e(`input.showPassword`),a=this.showCharCount?this.countId:void 0;return g`<div
part="root"
class=${_({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?g`<span class="addon start" part="prefix"
><slot name="prefix"></slot
></span>`:l}
<input
part="input"
class="field"
.value=${Qe(this.value)}
type=${n&&this.passwordVisible?`text`:this.type}
name=${this.name||l}
placeholder=${this.placeholder||l}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
minlength=${this.minLength??l}
maxlength=${this.maxLength??l}
pattern=${this.pattern??l}
min=${this.min??l}
max=${this.max??l}
step=${this.step??l}
autocomplete=${this.autocomplete??l}
inputmode=${this.inputmode??l}
aria-label=${this.aria.label??l}
aria-description=${this.aria.description??l}
aria-describedby=${a??l}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:l}
@input=${this.handleInput}
@change=${this.handleChange}
/>
${r?g`<button
part="clear-button"
type="button"
class="action"
aria-label=${this.clearLabel??e(`input.clear`)}
@click=${this.clear}
>
${Qt}
</button>`:l}
${n?g`<button
part="password-toggle"
type="button"
class="action"
aria-label=${i}
?disabled=${t}
@click=${()=>this.passwordVisible=!this.passwordVisible}
>
${this.passwordVisible?Bt:nn}
</button>`:l}
${this.showCharCount?g`<span id=${this.countId} class="count" part="count"
>${this.maxLength!=null&&this.maxLength>=0?`${this.value.length} / ${this.maxLength}`:this.value.length}</span
>`:l}
${this.slots.test(`suffix`)?g`<span class="addon end" part="suffix"
><slot name="suffix"></slot
></span>`:l}
</div>`}},I([d({attribute:!1})],Y.prototype,`value`,void 0),I([d({attribute:`value`})],Y.prototype,`defaultValue`,void 0),I([d({reflect:!0})],Y.prototype,`type`,void 0),I([d({reflect:!0})],Y.prototype,`variant`,void 0),I([d({reflect:!0})],Y.prototype,`size`,void 0),I([d({type:Boolean,reflect:!0})],Y.prototype,`invalid`,void 0),I([d()],Y.prototype,`placeholder`,void 0),I([d({type:Boolean,reflect:!0,attribute:`readonly`})],Y.prototype,`readOnly`,void 0),I([d({type:Number,attribute:`minlength`})],Y.prototype,`minLength`,void 0),I([d({type:Number,attribute:`maxlength`})],Y.prototype,`maxLength`,void 0),I([d()],Y.prototype,`pattern`,void 0),I([d()],Y.prototype,`min`,void 0),I([d()],Y.prototype,`max`,void 0),I([d()],Y.prototype,`step`,void 0),I([d()],Y.prototype,`autocomplete`,void 0),I([d()],Y.prototype,`inputmode`,void 0),I([d({type:Boolean,reflect:!0})],Y.prototype,`clearable`,void 0),I([d({attribute:`clear-label`})],Y.prototype,`clearLabel`,void 0),I([d({type:Boolean,attribute:`show-char-count`})],Y.prototype,`showCharCount`,void 0),I([d({attribute:`show-password-label`})],Y.prototype,`showPasswordLabel`,void 0),I([d({attribute:`hide-password-label`})],Y.prototype,`hidePasswordLabel`,void 0),I([v()],Y.prototype,`passwordVisible`,void 0),I([y(`input`)],Y.prototype,`input`,void 0)})))()}function Qa(e){if(!e.trim())return{status:`empty`};try{return JSON.parse(e),{status:`valid`}}catch(e){return{status:`invalid`,error:e instanceof Error?e.message:String(e)}}}function $a(e,t){let a=Math.min(10,Math.max(0,Math.trunc(t)||0));if(a>0)return i(e,n(e,void 0,{tabSize:a,insertSpaces:!0,eol:`
`}));let o=r(e,!0),s=[];for(;o.getPosition()<e.length;){o.scan();let t=o.getTokenOffset();s.push(e.slice(t,t+o.getTokenLength()))}return s.join(``)}var eo;function to(){return(to=e((()=>{k(),j(),S(),F(),O(),w(),Ln(),Mn(),Yn(),Nn(),u(),m(),p(),qe(),t(),eo=class e extends On{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.rows=8,this.hideToolbar=!1,this.indent=2,this.invalid=!1,this.readOnly=!1,this.placeholder=``,this.focused=!1,this.locale=new C(this),this.aria=new b(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-json-field`}static{this.shadowRootOptions={...On.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[A,f`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,P(nr),P(Jn),P(kn),f`

.toolbar .iconButton{
min-height: 0;
}
.status > svg{
width: 16px;
height: 16px;
}
`]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}formatValue(){Qa(this.value).status===`valid`&&(this.value=$a(this.value,this.indent))}getFormValue(){return this.value}getValidity(){let e=this.textarea,t=Qa(this.value);return t.status===`invalid`?{flags:{badInput:!0},message:`${this.invalidLabel??this.locale.t(`jsonField.invalid`)}: ${t.error}`,anchor:e}:this.required&&t.status===`empty`?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:e}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),T&&t.has(`indent`)&&(this.indent<0||this.indent>10)&&N(e.tagName,`indent (${this.indent}) is clamped to 0..10.`)}get locked(){return this.isDisabled||this.readOnly}formatNow(){if(this.locked||Qa(this.value).status!==`valid`)return;let e=$a(this.value,this.indent);e!==this.value&&(this.dirty=!0,this.value=e,this.emit(`minerva-input`,{value:e}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleInput(){this.locked||(this.dirty=!0,this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value}))}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){let e=!this.focused&&Qa(this.value).status===`invalid`;return{disabled:this.isDisabled,invalid:e||this.invalid,readonly:this.readOnly,required:this.required}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.focused?{status:`empty`}:Qa(this.value),r=n.status===`invalid`,i=r||this.invalid,a=this.locked||!this.value.trim(),o=n.status===`valid`?this.validLabel??e(`jsonField.valid`):n.status===`invalid`?`${this.invalidLabel??e(`jsonField.invalid`)}: ${n.error}`:``,s=[this.aria.description,r?o:void 0].filter(Boolean).join(` `);return g`<div class="root" part="root">
      ${this.hideToolbar?l:g`<div class="toolbar" part="toolbar">
              <button
                part="format-button"
                type="button"
                class=${_({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:a})}
                ?disabled=${a}
                tabindex=${a?`-1`:`0`}
                aria-label=${this.formatLabel??e(`jsonField.format`)}
                @click=${this.formatNow}
              >
                ${wt}
              </button>
            </div>`}
      <textarea
        part="input"
        class=${_({textarea:!0,outline:!0,medium:!0,invalid:i})}
        style="resize: none"
        rows=${this.rows}
        spellcheck="false"
        .value=${Qe(this.value)}
        name=${this.name||l}
        placeholder=${this.placeholder||l}
        ?disabled=${t}
        ?readonly=${this.readOnly}
        ?required=${this.required}
        aria-label=${this.aria.label??l}
        aria-description=${s||l}
        aria-invalid=${i?`true`:l}
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
        ${n.status===`valid`?g`${ur}<span>${o}</span>`:n.status===`invalid`?g`${en}<span>${o}</span>`:l}
      </div>
    </div>`}},I([d({attribute:!1})],eo.prototype,`value`,void 0),I([d({attribute:`value`})],eo.prototype,`defaultValue`,void 0),I([d({type:Number})],eo.prototype,`rows`,void 0),I([d({type:Boolean,attribute:`hide-toolbar`})],eo.prototype,`hideToolbar`,void 0),I([d({type:Number})],eo.prototype,`indent`,void 0),I([d({type:Boolean,reflect:!0})],eo.prototype,`invalid`,void 0),I([d({type:Boolean,reflect:!0,attribute:`readonly`})],eo.prototype,`readOnly`,void 0),I([d()],eo.prototype,`placeholder`,void 0),I([d({attribute:`format-label`})],eo.prototype,`formatLabel`,void 0),I([d({attribute:`valid-label`})],eo.prototype,`validLabel`,void 0),I([d({attribute:`invalid-label`})],eo.prototype,`invalidLabel`,void 0),I([v()],eo.prototype,`focused`,void 0),I([y(`textarea`)],eo.prototype,`textarea`,void 0)})))()}function no(e){if(!e)return[];try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>e&&typeof e==`object`).map(e=>({id:typeof e.id==`string`?e.id:``,key:String(e.key??``),value:String(e.value??``)}));if(t&&typeof t==`object`)return Object.entries(t).map(([e,t])=>({id:``,key:e,value:typeof t==`string`?t:JSON.stringify(t)}))}catch{}return[]}var ro,io;function ao(){return(ao=e((()=>{k(),j(),S(),F(),Fn(),O(),w(),Ln(),Mn(),yi(),Ia(),mr(),Lr(),u(),m(),Je(),ro=0,io=class e extends On{constructor(...e){super(...e),this.value=[],this.defaultValue=[],this.editorId=`kv-${ro++}`,this.nextId=0,this.dirty=!1,this.pendingFocus=null,this.locale=new C(this),this.aria=new b(this,()=>this.labels)}static{this.tagName=`minerva-key-value-editor`}static{this.dependencies=[H,Fa,Gr]}static{this.styles=[A,f`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,P(Jn),P(qn),f`

.key{
--textarea-min-height: var(
--key-value-editor-control-height,
var(--control-height-sm)
);
}
`]}focus(e){(this.renderRoot.querySelector(`minerva-textarea`)??this.renderRoot.querySelector(`minerva-button`))?.focus(e)}getFormValue(){return JSON.stringify(this.value.map(({key:e,value:t})=>({key:e,value:t})))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.renderRoot.querySelector(`minerva-button`)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=no(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)&&(this.value.some(e=>!e.id)&&(this.value=this.value.map(e=>e.id?e:{...e,id:this.newId()})),T)){let t=this.value.map(e=>e.id);new Set(t).size!==t.length&&N(e.tagName,`entries have duplicate ids: rows are tracked by id, make them unique.`)}}updated(e){super.updated(e);let t=this.pendingFocus;if(!t)return;this.pendingFocus=null;let n=e=>this.value.some(t=>t.id===e),r=e=>Array.from(this.renderRoot.querySelectorAll(`[data-entry-id]`)).find(t=>e!==void 0&&t.dataset.entryId===e)??null;if(t.kind===`add`){let e=n(t.id)?r(t.id)?.querySelector(`.key`):null;e&&e.updateComplete.then(()=>e.focus())}else n(t.id)||(r(t.nextId)?.querySelector(`.remove`)??this.renderRoot.querySelector(`minerva-button`))?.focus()}newId(){let e;do e=`${this.editorId}-${this.nextId++}`;while(this.value.some(t=>t.id===e));return e}commit(e){this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e})}add(){if(this.isDisabled)return;let e=this.newId();this.pendingFocus={kind:`add`,id:e},this.commit([...this.value,{id:e,key:``,value:``}])}removeEntry(e){if(this.isDisabled)return;let t=this.value.findIndex(t=>t.id===e),n=this.value[t+1]??this.value[t-1];this.pendingFocus={kind:`remove`,id:e,nextId:n?.id},this.commit(this.value.filter(t=>t.id!==e))}handleInput(e,t,n){if(e.stopPropagation(),this.isDisabled)return;let r=e.target.value;this.dirty=!0,this.value=this.value.map(e=>e.id===t?{...e,[n]:r}:e),this.emit(`minerva-input`,{value:this.value})}handleFieldChange(e){e.stopPropagation(),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}isRowInvalid(e){let t=this.errors?.[e.id];return!!(t?.key||t?.value)}renderField(e,t,n,r){let i=this.errors?.[e.id]?.[n];return g`<minerva-form-control
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
</minerva-form-control>`}hookStates(){return{disabled:this.isDisabled}}render(){let{t:e}=this.locale,t=this.keyLabel??e(`keyValueEditor.key`),n=this.valueLabel??e(`keyValueEditor.value`),r=this.removeLabel??e(`keyValueEditor.remove`),i=this.isDisabled,a=this.aria.label;return g`<div
class="root"
part="root"
role=${a?`group`:l}
aria-label=${a??l}
aria-description=${this.aria.description??l}
>
${Ke(this.value,e=>e.id,(e,a)=>g`<div
class="row"
part=${bn(`row`,{invalid:this.isRowInvalid(e)})}
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
${Qt}
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
<span slot="start">${pn}</span>
<span>${this.addLabel??e(`keyValueEditor.add`)}</span>
</minerva-button>
</div>`}},I([d({attribute:!1})],io.prototype,`value`,void 0),I([d({attribute:`value`,converter:{fromAttribute:e=>no(e)}})],io.prototype,`defaultValue`,void 0),I([d({attribute:`key-label`})],io.prototype,`keyLabel`,void 0),I([d({attribute:`value-label`})],io.prototype,`valueLabel`,void 0),I([d({attribute:`add-label`})],io.prototype,`addLabel`,void 0),I([d({attribute:`remove-label`})],io.prototype,`removeLabel`,void 0),I([d({attribute:!1})],io.prototype,`errors`,void 0)})))()}var oo,so;function co(){return(co=e((()=>{k(),j(),gr(),O(),D(),w(),En(),u(),m(),p(),oo=class e extends M{constructor(...e){super(...e),this.density=`default`,this.bordered=!1,this.noDividers=!1,this.internals=Sr(this)}static{this.tagName=`minerva-list`}static{this.styles=[A,f`
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
`,P(sr)]}connectedCallback(){super.connectedCallback(),Jt(this,this.internals,{role:`list`})}updated(){if(T){let t=Array.from(this.children).find(e=>e.localName!==so.tagName);t&&N(e.tagName,`children should be <minerva-list-item> elements (found <${t.localName}>): other elements break the list semantics.`)}}render(){return g`<div
part="root"
class=${_({list:!0,compact:this.density===`compact`,comfortable:this.density===`comfortable`,bordered:this.bordered,dividers:!this.noDividers})}
>
<slot @slotchange=${()=>this.requestUpdate()}></slot>
</div>`}},I([d({reflect:!0})],oo.prototype,`density`,void 0),I([d({type:Boolean,reflect:!0})],oo.prototype,`bordered`,void 0),I([d({type:Boolean,reflect:!0,attribute:`no-dividers`})],oo.prototype,`noDividers`,void 0),so=class extends M{constructor(...e){super(...e),this.primary=``,this.secondary=``,this.internals=Sr(this),this.slots=new E(this)}static{this.tagName=`minerva-list-item`}static{this.styles=[A,P(sr),f`
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
`]}connectedCallback(){super.connectedCallback(),Jt(this,this.internals,{role:`listitem`})}render(){let e=this.secondary!==``||this.slots.test(`secondary`);return g`<div part="root" class="item">
${this.slots.test(`icon`)?g`<div part="icon" class="icon" aria-hidden="true">
<slot name="icon"></slot>
</div>`:l}
<div class="content">
<div part="label" class="primary"><slot>${this.primary}</slot></div>
${e?g`<div part="description" class="secondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:l}
</div>
${this.slots.test(`actions`)?g`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:l}
</div>`}},I([d()],so.prototype,`primary`,void 0),I([d()],so.prototype,`secondary`,void 0)})))()}var lo,uo;function fo(){return(fo=e((()=>{j(),F(),O(),w(),Bn(),Br(),u(),m(),p(),lo=[`small`,`medium`,`large`],uo=class e extends M{constructor(...e){super(...e),this.size=`medium`,this.locale=new C(this)}static{this.tagName=`minerva-loading-state`}static{this.dependencies=[Vr]}static{this.styles=[A,f`
:host{
display: block;
}
`,P(ar)]}hookStates(){return{size:this.size}}updated(){T&&!lo.includes(this.size)&&N(e.tagName,`unknown size "${this.size}" (expected ${lo.join(`, `)}).`)}render(){return g`<div
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
</div>`}},I([d()],uo.prototype,`label`,void 0),I([d({reflect:!0})],uo.prototype,`size`,void 0)})))()}function po(e){let t=Array.from(e.childNodes).filter(e=>!wo(e)&&(e.nodeType!==1||e.getAttribute(`slot`)!==`icon`));return t.every(e=>e.nodeType===3)?t.map(e=>e.textContent??``).join(``).trim():t.map(e=>e.cloneNode(!0))}function mo(e){return{value:Do(e,`value`)??Eo(e),label:po(e),textValue:Do(e,`text-value`),shortcut:Do(e,`shortcut`),disabled:Oo(e,`disabled`),closeOnSelect:Oo(e,`close-on-select`),element:e}}function ho(e,t=`e`){let n=[],r=null;return Array.from(e.children).forEach((e,i)=>{let a=`${t}-${i}`;switch(e.localName!==yo.tagName&&(r=null),e.localName){case _o.tagName:{let t=ho(e,a),r=e.querySelector(`:scope > [slot='icon']`);n.push({key:Do(e,`value`)||Eo(e),label:po(e),textValue:Do(e,`text-value`),icon:r?r.cloneNode(!0):void 0,shortcut:Do(e,`shortcut`),disabled:Oo(e,`disabled`),closeOnSelect:!Oo(e,`keep-open`)&&void 0,children:t.length?t:void 0,element:e});break}case vo.tagName:n.push({type:`checkbox`,key:Do(e,`value`)||Eo(e),label:po(e),textValue:Do(e,`text-value`),shortcut:Do(e,`shortcut`),disabled:Oo(e,`disabled`),checked:Oo(e,`checked`),closeOnSelect:Oo(e,`close-on-select`),element:e});break;case yo.tagName:{r||(r={type:`radio-group`,key:a,items:[]},n.push(r));let t=mo(e);r.items.push(t),Oo(e,`checked`)&&(r.value=t.value);break}case xo.tagName:n.push({type:`separator`,key:a});break;case So.tagName:n.push({type:`label`,key:a,label:po(e)});break;case bo.tagName:{let t=Array.from(e.children),r=Do(e,`label`);if(t.length>0&&t.every(e=>e.localName===yo.tagName)){let i=t.map(mo);n.push({type:`radio-group`,key:a,label:r,items:i,value:i.find(e=>e.element?.hasAttribute(`checked`))?.value,closeOnSelect:Oo(e,`close-on-select`),element:e})}else n.push({type:`group`,key:a,label:r??``,items:ho(e,a)});break}}}),n}var go,_o,vo,yo,bo,xo,So,Co,wo,To,Eo,Do,Oo;function ko(){return(ko=e((()=>{O(),u(),m(),go=f`
:host{
display: none !important;
}
`,_o=class extends M{constructor(...e){super(...e),this.value=``,this.disabled=!1,this.shortcut=``,this.textValue=``,this.keepOpen=!1}static{this.tagName=`minerva-menu-item`}static{this.styles=go}},I([d({reflect:!0})],_o.prototype,`value`,void 0),I([d({type:Boolean,reflect:!0})],_o.prototype,`disabled`,void 0),I([d()],_o.prototype,`shortcut`,void 0),I([d({attribute:`text-value`})],_o.prototype,`textValue`,void 0),I([d({type:Boolean,attribute:`keep-open`})],_o.prototype,`keepOpen`,void 0),vo=class extends M{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-checkbox-item`}static{this.styles=go}},I([d({reflect:!0})],vo.prototype,`value`,void 0),I([d({type:Boolean,reflect:!0})],vo.prototype,`checked`,void 0),I([d({type:Boolean,reflect:!0})],vo.prototype,`disabled`,void 0),I([d()],vo.prototype,`shortcut`,void 0),I([d({attribute:`text-value`})],vo.prototype,`textValue`,void 0),I([d({type:Boolean,attribute:`close-on-select`})],vo.prototype,`closeOnSelect`,void 0),yo=class extends M{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-radio-item`}static{this.styles=go}},I([d({reflect:!0})],yo.prototype,`value`,void 0),I([d({type:Boolean,reflect:!0})],yo.prototype,`checked`,void 0),I([d({type:Boolean,reflect:!0})],yo.prototype,`disabled`,void 0),I([d()],yo.prototype,`shortcut`,void 0),I([d({attribute:`text-value`})],yo.prototype,`textValue`,void 0),I([d({type:Boolean,attribute:`close-on-select`})],yo.prototype,`closeOnSelect`,void 0),bo=class extends M{constructor(...e){super(...e),this.label=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-group`}static{this.styles=go}},I([d()],bo.prototype,`label`,void 0),I([d({type:Boolean,attribute:`close-on-select`})],bo.prototype,`closeOnSelect`,void 0),xo=class extends M{static{this.tagName=`minerva-menu-separator`}static{this.styles=go}},So=class extends M{static{this.tagName=`minerva-menu-label`}static{this.styles=go}},Co=[_o.tagName,vo.tagName,yo.tagName,bo.tagName,xo.tagName,So.tagName],wo=e=>e.nodeType===1&&Co.includes(e.localName),To=e=>!!(e.nodeType===1?e:e.parentElement)?.closest(Co.join(`,`)),Eo=e=>Array.from(e.childNodes).filter(e=>!wo(e)).map(e=>e.textContent??``).join(``).trim(),Do=(e,t)=>e.getAttribute(t)??void 0,Oo=(e,t)=>e.hasAttribute(t)})))()}var Ao,jo,Mo,No,Po,Fo,Io,Lo,Ro,zo,Bo,Vo;function Ho(){return(Ho=e((()=>{j(),S(),an(),Fn(),O(),w(),Ar(),Nr(),kr(),Ir(),Fr(),$n(),ko(),u(),m(),p(),se(),te(),Je(),Ao=100,jo=`[data-minerva-menu-item]`,Mo={mainAxis:4,crossAxis:-5},No=e=>e.hasAttribute(`data-disabled`),Po=e=>e.dataset.textValue??e.querySelector(`.text`)?.textContent??e.textContent??``,Fo=e=>e?Array.from(e.querySelectorAll(jo)):[],Io=e=>Pe(e,{preventScroll:!0}),Lo=e=>typeof e==`string`?e:void 0,Ro=e=>e.join(`/`),zo=0,Bo=class{constructor(e,t,n){this.grace=He(),this.typeahead=pe(),this.lastTypeahead=0,this.element=null,this.uid=null,this.path=[],this.position=new jr(e,()=>n===0?{placement:t.rootPlacement(),offset:t.rootOffset(),padding:8}:{placement:t.direction===`rtl`?`left-start`:`right-start`,offset:Mo,padding:8}),this.layer=new Er(e,()=>n===0?t.rootLayerOptions():t.subLayerOptions(n)),this.scope=new Pr(e,()=>({trapped:n===0&&t.isModal,autoFocus:!1,restoreFocus:!1}))}clearTimer(){clearTimeout(this.openTimer),this.openTimer=void 0}},Vo=class extends M{constructor(...e){super(...e),this.items=[],this.open=!1,this.size=`medium`,this.keepOpen=!1,this.disabled=!1,this.nonModal=!1,this.noLoop=!1,this.declarative=[],this.openPath=[],this.exiting=[],this.stored=new Map,this.levels=[],this.modalController=new Dr(this),this.observer=null,this.intent=`content`,this.subIntent=`none`,this.restoreOverride=void 0,this.reason=`outside`,this.direction=`ltr`,this.onPanelKeyDown=e=>{let t=e.currentTarget,n=this.panelDepth(t),r=this.levels[n],{key:i}=e;if(i===`Tab`){e.preventDefault(),this.closeWithTab(e.shiftKey);return}if(e.defaultPrevented||!r||e.altKey||e.ctrlKey||e.metaKey)return;let a=Fo(t),o=e.composedPath()[0],s=a.find(e=>e===o)??null,c=s?a.indexOf(s):-1,ee=this.direction===`rtl`,te=ee?`ArrowLeft`:`ArrowRight`,ne=ee?`ArrowRight`:`ArrowLeft`;if([`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(i)){e.preventDefault(),r.typeahead.reset();let t=xe({currentIndex:c,count:a.length,key:i,orientation:`vertical`,loop:!this.noLoop,isDisabled:e=>No(a[e])});t!==null&&Io(a[t]);return}if(i===te&&s?.hasAttribute(`aria-haspopup`)){e.preventDefault(),No(s)||this.openSubmenu(n,s.dataset.uid??``,`first`);return}if(i===ne&&n>0){e.preventDefault(),Io(this.parentItem(n)),this.closeSubmenu(n);return}if(i.length===1){let t=Date.now();t-r.lastTypeahead>500&&r.typeahead.reset();let n=r.typeahead.getBuffer()!==``;if(i!==` `||n){r.lastTypeahead=t,e.preventDefault();let n=r.typeahead.search(i,a.map(e=>({text:Po(e),disabled:No(e)})),c);n!==-1&&Io(a[n]);return}}(i===`Enter`||i===` `)&&s&&(e.preventDefault(),No(s)||this.activateItem(s,`first`))},this.itemActions=new Map,this.highlightedItem=null,this.onPanelFocusIn=e=>{let t=e.composedPath()[0];t.matches?.(jo)&&this.highlightItem(t,!0)},this.onPanelFocusOut=e=>{let t=e.composedPath()[0];t.matches?.(jo)&&this.highlightItem(t,!1)}}static{this.styles=[A,Or,f`
:host{
display: contents;
}
`,P(dr)]}onRootPointerDownOutside(e){}get isModal(){return!this.nonModal}get entries(){return this.items.length?this.items:this.declarative}show(){this.open=!0}hide(){this.open=!1}requestOpenChange(e,t){if(e===this.open)return!0;let n=this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0});return n&&(this.open=e,e||this.closeLevels()),n}openWith(e,t){this.intent=e,this.requestOpenChange(!0,t)}closeAll(e){this.requestOpenChange(!1,e)}closeWithTab(e){let t=this.restoreTarget(),n;if(t){let r=a().find(e=>e.element===this.levels[0]?.element)?.parent??document.body,i=he(r).filter(e=>e===t||!ne(this,e)||!this.isPanelNode(e)),o=i.indexOf(t);n=o===-1?t:i[e?o-1:o+1]??t}this.restoreOverride=n??void 0,this.requestOpenChange(!1,`tab`)&&Io(n)}isPanelNode(e){return this.levels.some(t=>ne(t.element,e))}level(e){return this.levels[e]??=new Bo(this,this,e),this.levels[e]}parentItem(e){let t=this.openPath[e-1];return t?this.renderRoot.querySelector(`[data-uid="${t}"]`)??null:null}rootLayerOptions(){return{disableOutsidePointerEvents:this.isModal,branches:()=>this.branches(),onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:e=>{this.reason=`outside`,this.onRootPointerDownOutside(e),!e.defaultPrevented&&(!this.isModal||e.button===2)&&(this.restoreOverride=null)},onFocusOutside:e=>(this.reason=`focus-outside`,!this.isModal||(e.preventDefault(),!1)),onDismiss:()=>this.closeAll(this.reason)}}subLayerOptions(e){return{parent:this.levels[e-1]?.element??void 0,branches:()=>[this.parentItem(e)],onEscapeKeyDown:()=>{Io(this.parentItem(e))},onDismiss:()=>this.closeSubmenu(e)}}closeLevels(e=0,t=!0){for(let n=this.levels.length-1;n>=e;n--){let e=this.levels[n],r=e.element;r&&(e.clearTimer(),e.grace.clear(),e.typeahead.reset(),e.scope.deactivate(),e.layer.deactivate(),e.position.end(),t&&this.isConnected?this.exit(r,n,e.path):x(r),e.element=null,e.uid=null,n===0&&(this.modalController.deactivate(),this.scheduleRestore()))}}exit(e,t,n){if(e.setAttribute(`data-state`,`closed`),Te(e)<=0){x(e);return}let r=++zo,i=Ro(n);this.exiting=[...this.exiting.filter(e=>Ro(e.path)!==i),{id:r,depth:t,path:n}],re(e).then(()=>{this.exiting.some(e=>e.id===r)&&(x(e),this.exiting=this.exiting.filter(e=>e.id!==r))})}clearExiting(){if(this.exiting.length!==0){for(let e of this.exiting)x(this.renderRoot.querySelector(`[data-panel-key="${Ro(e.path)}"]`));this.exiting=[]}}scheduleRestore(){let e=this.restoreOverride;this.restoreOverride=void 0;let t=e===void 0?this.restoreTarget():e;t&&setTimeout(()=>{if(this.open||!t.isConnected)return;let e=Fe(document);(!e||e===document.body||!e.isConnected||(this.shadowRoot?.contains(e)??!1))&&Io(t)},0)}syncLevels(){let e=this.open&&!this.disabled?this.openPath.length+1:0;this.closeLevels(e);for(let t=0;t<e;t++){let e=t===0?``:this.openPath[t-1],n=this.renderRoot.querySelector(`[data-panel-key="${Ro(this.openPath.slice(0,t))}"]`);if(!n)return;let r=this.level(t);if(r.element===n&&r.uid===e)continue;r.element&&this.closeLevels(t);let i=t===0?this.anchorElement():this.parentItem(t);if(!i)return;r.element=n,r.uid=e,r.path=this.openPath.slice(0,t),n.setAttribute(`data-state`,`open`),vr(n),r.position.start(i,n),t===0&&this.isModal&&this.modalController.activate(this),r.layer.activate(n),r.scope.activate(n);let a=t===0?this.intent:this.subIntent;t===0?this.intent=`content`:this.subIntent=`none`,this.focusIntent(n,a)}}focusIntent(e,t){if(t===`none`)return;let n=Fo(e).filter(e=>!No(e));Io((t===`first`?n[0]:t===`last`?n[n.length-1]:void 0)??e)}reanchor(){let e=this.levels[0],t=this.anchorElement();e?.element&&t&&e.position.start(t,e.element)}openSubmenu(e,t,n){if(this.openPath[e]===t&&this.levels[e+1]?.element){n===`first`&&Io(Fo(this.levels[e+1].element).find(e=>!No(e)));return}this.subIntent=n,this.openPath=[...this.openPath.slice(0,e),t]}closeSubmenu(e){this.openPath.length<e||(this.closeLevels(e),this.openPath=this.openPath.slice(0,e-1))}stateOf(e,t){return this.stored.has(e)?this.stored.get(e):t}isChecked(e){return e.element?e.element.hasAttribute(`checked`):this.stateOf(e.key,e.checked??e.defaultChecked??!1)}radioValue(e){return e.items.some(e=>e.element)?e.items.find(e=>e.element?.hasAttribute(`checked`))?.value:this.stateOf(e.key,e.value??e.defaultValue)}activateAction(e){this.emit(`minerva-select`,{value:e.key,item:e},{cancelable:!0})&&(e.closeOnSelect??!this.keepOpen)&&this.closeAll(`select`)}toggleCheckbox(e){let t=!this.isChecked(e);this.emit(`minerva-change`,{value:e.key,checked:t,item:e},{cancelable:!0})&&(e.element?e.element.toggleAttribute(`checked`,t):this.stored.set(e.key,t),this.requestUpdate()),e.closeOnSelect&&this.closeAll(`select`)}chooseRadio(e,t){let n=this.radioValue(e);if(t.value!==n&&this.emit(`minerva-change`,{value:t.value,group:e.key,item:t},{cancelable:!0})){if(t.element)for(let n of e.items)n.element?.toggleAttribute(`checked`,n===t);else this.stored.set(e.key,t.value);this.requestUpdate()}(e.closeOnSelect||t.closeOnSelect)&&this.closeAll(`select`)}panelDepth(e){return Number(e.dataset.level??0)}activateItem(e,t){this.itemActions.get(e.dataset.uid??``)?.(t)}highlightItem(e,t){t?this.highlightedItem=e.dataset.uid??null:this.highlightedItem===e.dataset.uid&&(this.highlightedItem=null),e.toggleAttribute(`data-highlighted`,t),e.setAttribute(`part`,bn(`item`,{state:e.dataset.state,highlighted:t,disabled:e.hasAttribute(`data-disabled`),expanded:e.hasAttribute(`data-expanded`)}))}onItemClick(e){let t=e.currentTarget;No(t)||this.activateItem(t,`none`)}onItemPointerMove(e){let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i||e.pointerType===`touch`||i.grace.isInGraceArea({x:e.clientX,y:e.clientY}))return;i.grace.clear();let a=Fe(document);if(No(t)){a!==n&&Io(n);return}a!==t&&Io(t);let o=t.dataset.uid??``;t.hasAttribute(`aria-haspopup`)&&this.openPath[r]!==o&&i.openTimer===void 0&&(i.openTimer=setTimeout(()=>{i.openTimer=void 0,this.open&&this.openSubmenu(r,o,`none`)},100))}onItemPointerLeave(e){if(e.pointerType===`touch`)return;let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i)return;i.clearTimer();let a=this.levels[r+1]?.element;if(t.hasAttribute(`aria-haspopup`)&&this.openPath[r]===t.dataset.uid&&a){let t=a.getAttribute(`data-side`)??`right`;i.grace.start({x:e.clientX,y:e.clientY},a.getBoundingClientRect(),t);return}i.grace.isInGraceArea({x:e.clientX,y:e.clientY})||Fe(document)===t&&Io(n)}readEntries(){this.declarative=ho(this)}connectedCallback(){super.connectedCallback(),this.readEntries(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(e=>{e.some(e=>To(e.target)||Array.from(e.addedNodes).some(To)||Array.from(e.removedNodes).some(e=>e.nodeType===1&&e.localName.startsWith(`minerva-menu-`)))&&this.readEntries()}),this.observer.observe(this,{subtree:!0,childList:!0,attributes:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.closeLevels(0,!1),this.clearExiting()}willUpdate(e){if(e.has(`items`)&&(this.stored=new Map,T&&this.checkKeys(this.items)),e.has(`open`)&&this.open){let e=this.anchorElement(),t=e&&`nodeType`in e?e:this;this.direction=this.isConnected?ie(t):`ltr`}e.has(`open`)&&!this.open&&(this.openPath=[]);let t=this.open&&!this.disabled?this.openPath.length+1:0,n=this.levels.findIndex((e,n)=>e.element!==null&&(n>=t||Ro(e.path)!==Ro(this.openPath.slice(0,n))));if(n!==-1&&this.closeLevels(n),this.exiting.length){let e=this.openKeys();this.exiting.some(t=>e.has(Ro(t.path)))&&(this.exiting=this.exiting.filter(t=>!e.has(Ro(t.path))))}}openKeys(){return!this.open||this.disabled?new Set:new Set([[],...this.openPath.map((e,t)=>this.openPath.slice(0,t+1))].map(Ro))}checkKeys(e,t=new Set){for(let n of e)if(!(`type`in n&&n.type===`separator`)){if(`type`in n&&(n.type===`group`||n.type===`label`)){n.type===`group`&&this.checkKeys(n.items,t);continue}t.has(n.key)&&N(this.constructor.tagName,`duplicate item key "${n.key}": keys must be unique (checkbox / radio state and minerva-select values are keyed by it).`),t.add(n.key),!(`type`in n)&&n.children&&this.checkKeys(n.children,t)}}hookStates(){let e=this.levels[0]?.position.running?this.levels[0].position.placement:this.rootPlacement();return{state:this.open&&!this.disabled?`open`:`closed`,disabled:this.disabled,size:this.size,...ke(e),placement:e}}updated(e){this.syncTrigger(),(e.has(`open`)||e.has(`openPath`)||e.has(`disabled`))&&this.syncLevels()}renderPanels(){let e=this.open&&!this.disabled;if(!e&&this.exiting.length===0)return l;this.itemActions.clear();let t=[];e&&(t.push({key:``,depth:0,path:[],state:`open`}),this.openPath.forEach((e,n)=>{let r=this.openPath.slice(0,n+1);t.push({key:Ro(r),depth:n+1,path:r,state:`open`})}));let n=new Set(t.map(e=>e.key));for(let e of this.exiting){let r=Ro(e.path);n.has(r)||(n.add(r),t.push({key:r,depth:e.depth,path:e.path,state:`closed`}))}return Ke(t,e=>e.key,e=>this.renderPanelAt(e.depth,e.path,e.state))}renderPanelAt(e,t,n){let r=this.entries,i=e===0?this.rootLabel():void 0;for(let[e,n]of t.entries()){let t=this.findSubmenu(r,n,`${e}:`);if(!t)return l;r=t.children??[],i=Lo(t.label)??t.textValue}return this.renderPanel(e,t.at(-1)??``,r,i,n,Ro(t))}findSubmenu(e,t,n){for(let[r,i]of e.entries()){let e=`${n}${r}`;if(`type`in i){if(i.type===`group`){let n=this.findSubmenu(i.items,t,`${e}.`);if(n)return n}continue}if(i.children?.length&&e===t)return i}return null}renderPanel(e,t,n,r,i,a){let o=e===0?``:`item-${t}`;return g`<div
part="content"
id=${e===0?`menu`:`menu-${t}`}
class=${_({content:!0,small:this.size===`small`})}
popover="manual"
role="menu"
aria-orientation="vertical"
aria-label=${e===0?r??l:l}
aria-labelledby=${e>0?o:l}
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
</div>`}renderEntries(e,t,n){return e.map((e,r)=>{let i=`${n}${r}`;if(`type`in e)switch(e.type){case`separator`:return g`<div
role="separator"
aria-orientation="horizontal"
class="separator"
part="separator"
></div>`;case`label`:return g`<div class="label" part="label">${e.label}</div>`;case`group`:{let n=`label-${i.replace(/[:.]/g,`-`)}`;return g`<div
role="group"
part="group"
aria-labelledby=${n}
>
<div id=${n} class="label" part="label">${e.label}</div>
${this.renderEntries(e.items,t,`${i}.`)}
</div>`}case`checkbox`:return this.renderCheckbox(e,i);case`radio-group`:return this.renderRadioGroup(e,i)}return this.renderAction(e,t,i)})}renderItem(e){let{uid:t,disabled:n=!1,submenu:r}=e;this.itemActions.set(t,e.activate);let i=e.textValue??Lo(e.label),a={state:e.checked===void 0?void 0:e.checked?`checked`:`unchecked`,highlighted:this.highlightedItem===t,disabled:n,expanded:r?.open};return g`<div
id=${`item-${t}`}
part=${bn(`item`,a)}
role=${e.role}
tabindex="-1"
class="item"
data-minerva-menu-item=""
data-uid=${t}
data-text-value=${i??l}
data-state=${a.state??l}
?data-highlighted=${a.highlighted}
?data-disabled=${n}
?data-expanded=${r?.open}
aria-disabled=${n?`true`:l}
aria-checked=${e.checked===void 0?l:String(e.checked)}
aria-haspopup=${r?`menu`:l}
aria-expanded=${r?String(r.open):l}
aria-controls=${r?.open?`menu-${t}`:l}
@click=${this.onItemClick}
@pointermove=${this.onItemPointerMove}
@pointerleave=${this.onItemPointerLeave}
>
${e.indicator??l}
${e.icon?g`<span class="icon" part="icon" aria-hidden="true"
>${e.icon}</span
>`:l}
<span class="text" part="item-label">${e.label}</span>
${e.shortcut?g`<span class="shortcut" part="shortcut">${e.shortcut}</span>`:l}
${e.trailing??l}
</div>`}renderAction(e,t,n){if(e.children?.length){let r=this.openPath[t]===n&&!e.disabled;return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,submenu:{open:r},trailing:g`<span class="chevron" aria-hidden="true"
>${It}</span
>`,activate:e=>this.openSubmenu(t,n,e)})}return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,activate:()=>this.activateAction(e)})}renderCheckbox(e,t){let n=this.isChecked(e);return this.renderItem({uid:t,role:`menuitemcheckbox`,label:e.label,textValue:e.textValue,shortcut:e.shortcut,disabled:e.disabled,checked:n,indicator:g`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${n?dn:l}</span
>`,activate:()=>this.toggleCheckbox(e)})}renderRadioGroup(e,t){let n=this.radioValue(e),r=`label-${t.replace(/[:.]/g,`-`)}`,i=e.label!=null&&e.label!==``;return g`<div
role="group"
part="group"
aria-labelledby=${i?r:l}
>
${i?g`<div id=${r} class="label" part="label">${e.label}</div>`:l}
${e.items.map((r,i)=>{let a=r.value===n;return this.renderItem({uid:`${t}.${i}`,role:`menuitemradio`,label:r.label,textValue:r.textValue,shortcut:r.shortcut,disabled:r.disabled,checked:a,indicator:g`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${a?g`<span class="dot"></span>`:l}</span
>`,activate:()=>this.chooseRadio(e,r)})})}
</div>`}},I([d({attribute:!1})],Vo.prototype,`items`,void 0),I([d({type:Boolean,reflect:!0})],Vo.prototype,`open`,void 0),I([d({reflect:!0})],Vo.prototype,`size`,void 0),I([d({type:Boolean,attribute:`keep-open`})],Vo.prototype,`keepOpen`,void 0),I([d({type:Boolean,reflect:!0})],Vo.prototype,`disabled`,void 0),I([d({type:Boolean,reflect:!0,attribute:`non-modal`})],Vo.prototype,`nonModal`,void 0),I([d({type:Boolean,attribute:`no-loop`})],Vo.prototype,`noLoop`,void 0),I([v()],Vo.prototype,`declarative`,void 0),I([v()],Vo.prototype,`openPath`,void 0),I([v()],Vo.prototype,`exiting`,void 0)})))()}function Uo(e,t,n){n===null?e.hasAttribute(t)&&e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}var Wo,Go;function Ko(){return(Ko=e((()=>{j(),ko(),Ho(),u(),m(),se(),Wo={mainAxis:6,crossAxis:0},Go=class e extends Vo{constructor(...e){super(...e),this.side=`bottom`,this.align=`end`,this.disabledTrigger=null,this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.fromTrigger(e)))switch(e.key){case`Enter`:case` `:e.preventDefault(),this.open?this.requestOpenChange(!1,`trigger`):this.openWith(`first`,`keyboard`);break;case`ArrowDown`:e.preventDefault(),this.openWith(`first`,`keyboard`);break;case`ArrowUp`:e.preventDefault(),this.openWith(`last`,`keyboard`)}},this.handleClick=e=>{this.disabled||e.defaultPrevented||!this.fromTrigger(e)||(this.open?this.requestOpenChange(!1,`trigger`):this.openWith(e.detail===0?`first`:`content`,`trigger`))}}static{this.tagName=`minerva-menu`}static{this.dependencies=[_o,vo,yo,bo,xo,So]}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorElement(){return this.triggerElement()}rootPlacement(){return Ce(this.side,this.align)}rootOffset(){return Wo}restoreTarget(){return this.triggerElement()}branches(){return[this.triggerElement()]}rootLabel(){let e=this.getAttribute(`aria-label`);if(e)return e;let t=this.triggerElement();return t?.getAttribute(`aria-label`)??(t?.textContent?.trim()||void 0)}syncTrigger(){let e=this.triggerElement();e&&(Uo(e,`aria-haspopup`,`menu`),Uo(e,`aria-expanded`,String(this.open)),Uo(e,`data-state`,this.open?`open`:`closed`),Uo(e,`data-disabled`,this.disabled?``:null),this.disabled&&!e.hasAttribute(`disabled`)?(e.setAttribute(`disabled`,``),this.disabledTrigger=e):!this.disabled&&this.disabledTrigger===e&&(e.removeAttribute(`disabled`),this.disabledTrigger=null))}fromTrigger(e){let t=this.triggerElement();return!!t&&e.composedPath().includes(t)}connectedCallback(){super.connectedCallback(),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick)}firstUpdated(t){super.firstUpdated(t),T&&!this.triggerElement()&&N(e.tagName,`no slot="trigger" element: nothing opens the menu (add e.g. <button slot="trigger">).`)}render(){return g`<slot name="trigger"></slot>${this.renderPanels()}`}},I([d({reflect:!0})],Go.prototype,`side`,void 0),I([d({reflect:!0})],Go.prototype,`align`,void 0)})))()}var qo,Jo,Yo,Xo,Zo;function Qo(){return(Qo=e((()=>{an(),ko(),Ho(),Ko(),u(),se(),qo=700,Jo={mainAxis:2,crossAxis:0},Yo={mainAxis:4,crossAxis:0},Xo=(e,t,n)=>({contextElement:n,getBoundingClientRect:()=>({x:e,y:t,left:e,top:t,right:e,bottom:t,width:0,height:0})}),Zo=class extends Vo{constructor(...e){super(...e),this.position=null,this.restoreTo=null,this.areaPointerEvents=null,this.handleContextMenu=e=>{this.disabled||e.defaultPrevented||!this.inArea(e)||(e.preventDefault(),this.clearLongPress(),this.openAtPoint(e.clientX,e.clientY))},this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.inArea(e))&&(e.key===`ContextMenu`||e.shiftKey&&e.key===`F10`)){let t=this.area();if(!t)return;e.preventDefault();let n=ie(t)===`rtl`;this.openAt({anchor:t,placement:n?`bottom-end`:`bottom-start`,offset:Yo})}},this.handlePointerDown=e=>{if(this.disabled||e.pointerType!==`touch`||!this.inArea(e))return;this.clearLongPress();let{clientX:t,clientY:n}=e;this.longPress=setTimeout(()=>{this.longPress=void 0,this.openAtPoint(t,n)},700)},this.handleTouchEnd=e=>{e.pointerType===`touch`&&this.clearLongPress()}}static{this.tagName=`minerva-context-menu`}static{this.dependencies=[_o,vo,yo,bo,xo,So]}static{this.styles=[...Vo.styles,f`
:host(:not([disabled])) ::slotted(*){
-webkit-touch-callout: none;
}
`]}area(){return Array.from(this.children).find(e=>!Co.includes(e.localName))??null}anchorElement(){return this.position?.anchor??null}rootPlacement(){return this.position?.placement??`right-start`}rootOffset(){return this.position?.offset??Jo}restoreTarget(){return this.restoreTo}branches(){return[]}rootLabel(){return this.getAttribute(`aria-label`)??void 0}onRootPointerDownOutside(e){let t=this.area(),n=e.composedPath()[0];e.button===2&&t&&n instanceof Node&&ne(t,n)&&e.preventDefault()}syncTrigger(){let e=this.area();if(!e)return;Uo(e,`data-state`,this.open?`open`:`closed`),Uo(e,`data-disabled`,this.disabled?``:null);let t=this.open&&this.isModal&&!this.disabled;t&&this.areaPointerEvents===null?(this.areaPointerEvents=e.style.pointerEvents,e.style.pointerEvents=`auto`):!t&&this.areaPointerEvents!==null&&(e.style.pointerEvents=this.areaPointerEvents,this.areaPointerEvents=null)}openAt(e){let t=this.area();if(t){if(!this.open){let e=Fe(document);this.restoreTo=e instanceof HTMLElement&&ne(t,e)?e:t}if(this.position=e,this.open){this.reanchor();return}this.openWith(`first`,`contextmenu`)}}openAtPoint(e,t){let n=this.area();if(!n)return;let r=ie(n)===`rtl`;this.openAt({anchor:Xo(e,t,n),placement:r?`left-start`:`right-start`,offset:Jo})}inArea(e){let t=this.area(),n=e.composedPath()[0];return!!t&&n instanceof Node&&ne(t,n)}clearLongPress(){clearTimeout(this.longPress),this.longPress=void 0}connectedCallback(){super.connectedCallback(),this.addEventListener(`contextmenu`,this.handleContextMenu),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`pointerdown`,this.handlePointerDown),this.addEventListener(`pointermove`,this.handleTouchEnd),this.addEventListener(`pointerup`,this.handleTouchEnd),this.addEventListener(`pointercancel`,this.handleTouchEnd)}disconnectedCallback(){super.disconnectedCallback(),this.clearLongPress(),this.removeEventListener(`contextmenu`,this.handleContextMenu),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`pointerdown`,this.handlePointerDown),this.removeEventListener(`pointermove`,this.handleTouchEnd),this.removeEventListener(`pointerup`,this.handleTouchEnd),this.removeEventListener(`pointercancel`,this.handleTouchEnd)}render(){return g`<slot></slot>${this.renderPanels()}`}}})))()}var $o,X;function es(){return(es=e((()=>{k(),S(),F(),O(),w(),Ln(),Ir(),fr(),Mn(),jn(),u(),m(),p(),se(),te(),qe(),$o=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],X=class extends On{constructor(...e){super(...e),this.name=`date-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.draft=null,this.month=ue(new Date),this.focusedKey=``,this.dirty=!1,this.pendingFocus=!1,this.i18n=new C(this),this.aria=new b(this,()=>this.labels),this.floating=new Mr(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0}))}static{this.tagName=`minerva-date-picker`}static{this.shadowRootOptions={...On.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[A,Or,f`
:host{
display: inline-block;
vertical-align: middle;
}
.datePicker .root{
width: 100%;
}
`,P(Gn),P(Jn),P(Dn)]}get valueAsDate(){return Me(this.value||``,!0)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}get interactive(){return!this.isDisabled&&!this.readOnly}allowed(e){return!!Me(e,!0)&&(!this.minDate||e>=this.minDate)&&(!this.maxDate||e<=this.maxDate)}getFormValue(){return this.valueAsDate?c(this.valueAsDate):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.i18n.t(`validation.valueMissing`),anchor:this.input}:this.valueAsDate&&!this.allowed(this.value)?{flags:{customError:!0},message:[this.minDate,this.maxDate].filter(Boolean).join(` – `),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue,this.open=!1}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open&&(this.month=ue(this.valueAsDate??new Date),this.focusedKey=c(this.valueAsDate??new Date))}updated(e){super.updated(e),this.floating.sync(this.open&&this.interactive),this.open&&this.pendingFocus&&(this.popup?.querySelector(`[data-date="${this.focusedKey}"]`)?.focus(),this.pendingFocus=!1)}requestOpenChange(e){if(e&&!this.interactive)return!1;if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){!this.interactive||e&&!this.allowed(e)||(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleInput(e){if(!this.interactive)return;let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t}),(!t||this.allowed(t))&&(this.commit(t),t&&(this.month=ue(Me(t))))}handleBlur(){if(this.draft===null)return;let e=Me(this.draft.trim(),!1),t=e?c(e):``;this.draft.trim()?e&&this.allowed(t)&&t!==this.value&&(this.commit(t),this.month=ue(e)):this.value&&this.commit(``),this.draft=null}handleClear(){this.interactive&&(this.draft=null,this.commit(``),this.emit(`minerva-clear`),this.input?.focus())}handleInputClick(){this.requestOpenChange(!this.open)}handleInputKeyDown(e){e.key===`ArrowDown`&&this.interactive&&(e.preventDefault(),this.pendingFocus=!0,this.open?this.requestUpdate():this.requestOpenChange(!0)||(this.pendingFocus=!1))}select(e){this.interactive&&this.allowed(c(e))&&(this.draft=null,this.commit(c(e)),this.requestOpenChange(!1),this.input?.focus())}handleDayKeyDown(e,t){if(!this.interactive)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=Ve(e.key,this),r=(t.getDay()+6)%7,i;switch(n){case`ArrowLeft`:i=Ie(t,-1);break;case`ArrowRight`:i=Ie(t,1);break;case`ArrowUp`:i=Ie(t,-7);break;case`ArrowDown`:i=Ie(t,7);break;case`Home`:i=Ie(t,-r);break;case`End`:i=Ie(t,6-r);break;case`PageUp`:case`PageDown`:{let r=ue(t,(n===`PageUp`?-1:1)*(e.shiftKey?12:1));i=ee(r.getFullYear(),r.getMonth(),Math.min(t.getDate(),Ie(ue(r,1),-1).getDate()));break}default:return}e.preventDefault(),this.focusedKey=c(i),this.month=ue(i),this.pendingFocus=!0}renderPanel(e){let t=this.i18n.t,n=ue(this.month),r=Ie(n,-((n.getDay()+6)%7)),i=Array.from({length:42},(e,t)=>Ie(r,t)),a=i.map(c).includes(this.focusedKey)?this.focusedKey:c(n),o;try{o=new Intl.DateTimeFormat(this.locale??this.i18n.language,{month:`long`,year:`numeric`}).format(n)}catch{o=c(n).slice(0,7)}return g`<div
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
@click=${()=>{this.month=ue(n,-1)}}
>
${sn}
</button>
<button
type="button"
class="navButton"
aria-label=${t(`monthCalendar.nextMonth`)}
@click=${()=>{this.month=ue(n,1)}}
>
${It}
</button>
</div>
</div>
<div class="grid" role="grid" aria-labelledby="heading">
<div class="week" role="row">
${$o.map(e=>g`<div class="weekday" role="columnheader">${t(`monthCalendar.weekdays.${e}`)}</div>`)}
</div>
${Array.from({length:6},(e,t)=>g`<div class="week" role="row">
${i.slice(t*7,t*7+7).map(e=>{let t=c(e);return g`<div
part="day"
class="day"
role="gridcell"
data-date=${t}
?data-outside=${!me(e,n)}
aria-label=${t}
aria-selected=${String(t===this.value)}
aria-disabled=${this.allowed(t)?l:`true`}
aria-current=${t===c(new Date)?`date`:l}
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
${!this.hideClearButton&&this.value?g`<button
class="footerButton"
type="button"
@click=${()=>{this.handleClear(),this.requestOpenChange(!1)}}
>
${t(`datePicker.clear`)}
</button>`:l}
<button
class="footerButton"
type="button"
?disabled=${!this.allowed(c(new Date))}
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
</div>`}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?ke(e):{side:void 0,align:void 0};return{placement:e,side:t,align:n,state:this.open&&this.interactive?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size}}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=he(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=he(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{ne(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!ne(this,e))??null}render(){let{t:e}=this.i18n,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`datePicker.label`),a=this.draft??(r?c(r):``),o=!this.hideClearButton&&!!r&&!t&&!n;return g`<div part="root" class="datePicker">
<div
part="control"
class=${_({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
.value=${Qe(a)}
placeholder=${this.placeholder??e(`datePicker.placeholder`)}
?disabled=${t}
?readonly=${n}
?required=${this.required}
autocomplete="off"
aria-label=${i}
aria-description=${this.aria.description??l}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:l}
aria-readonly=${n?`true`:l}
@input=${this.handleInput}
@blur=${this.handleBlur}
@click=${this.handleInputClick}
@keydown=${this.handleInputKeyDown}
/>
<span class="addon end">
${o?g`<button
part="clear-button"
type="button"
class="iconButton neutral variant-ghost small circle clearButton"
aria-label=${e(`datePicker.clear`)}
@click=${this.handleClear}
>
${Qt}
</button>`:g`<span part="icon" class="calendarIcon" aria-hidden="true"
>${Vn}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(i):l}`}},I([d({reflect:!0})],X.prototype,`name`,void 0),I([d({attribute:!1})],X.prototype,`value`,void 0),I([d({attribute:`value`})],X.prototype,`defaultValue`,void 0),I([d({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),I([d()],X.prototype,`label`,void 0),I([d()],X.prototype,`placeholder`,void 0),I([d()],X.prototype,`locale`,void 0),I([d({reflect:!0})],X.prototype,`size`,void 0),I([d({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),I([d({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),I([d({type:Boolean,attribute:`hide-clear-button`})],X.prototype,`hideClearButton`,void 0),I([d({attribute:`min-date`})],X.prototype,`minDate`,void 0),I([d({attribute:`max-date`})],X.prototype,`maxDate`,void 0),I([v()],X.prototype,`draft`,void 0),I([v()],X.prototype,`month`,void 0),I([v()],X.prototype,`focusedKey`,void 0),I([y(`input`)],X.prototype,`input`,void 0),I([y(`.datePicker`)],X.prototype,`field`,void 0),I([y(`.popup`)],X.prototype,`popup`,void 0)})))()}var ts,ns;function rs(){return(rs=e((()=>{O(),u(),m(),Xe(),ts=e=>typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,ns=class extends M{constructor(...e){super(...e),this.engine=null,this.offs=[]}static{this.styles=[A,f`
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
`]}get instance(){return this.engine}get defaultHeight(){return 320}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.mountEngine()}disconnectedCallback(){super.disconnectedCallback(),this.unmountEngine()}updated(e){if(super.updated(e),!this.engine){this.mountEngine();return}if([...e.keys()].every(e=>e===`height`))return;if(this.syncEngine){this.syncEngine(this.engine,e);return}let t=this.engineOptions();t&&this.engine.setOptions(t)}mountEngine(){if(this.engine||!this.isConnected)return;let e=this.renderRoot.querySelector(`[part=surface]`),t=e?this.engineOptions():null;if(!e||!t)return;let n=this.createEngine(e,t);this.engine=n,this.offs=this.bindEngine?.(n)??[],this.engineMounted?.(n)}unmountEngine(){for(let e of this.offs)e();this.offs=[],this.engine?.destroy(),this.engine=null}render(){return g`<div
part="root"
class="root"
style=${h({height:ts(this.height??this.defaultHeight)})}
>
<div part="surface" class="surface"></div>
</div>`}},I([d()],ns.prototype,`height`,void 0)})))()}var is,as,os,ss,cs;function ls(){return(ls=e((()=>{rs(),m(),yt(),is=class extends ns{constructor(...e){super(...e),this.height=400}createEngine(e,t){return bt(e,t)}engineOptions(){return this.series?{...this.options,series:this.typed(this.series)}:null}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-point-click`,e)),e.on(`camera`,e=>this.emit(`minerva-camera-change`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}resetCamera(){this.instance?.resetCamera()}getCamera(){return this.instance?.getCamera()??null}setCamera(e){this.instance?.setCamera(e)}getRenderer(){return this.instance?.getRenderer()??null}},I([d()],is.prototype,`height`,void 0),I([d({attribute:!1})],is.prototype,`series`,void 0),I([d({attribute:!1})],is.prototype,`options`,void 0),as=class extends is{static{this.tagName=`minerva-scatter-3d-chart`}typed(e){return e.map(e=>({...e,type:`scatter`}))}},os=class extends is{static{this.tagName=`minerva-line-3d-chart`}typed(e){return e.map(e=>({...e,type:`line`}))}},ss=class extends is{static{this.tagName=`minerva-surface-3d-chart`}typed(e){return e.map(e=>({...e,type:`surface`,wireframe:e.wireframe??this.wireframe,contours:e.contours??this.contours}))}},I([d({attribute:!1})],ss.prototype,`wireframe`,void 0),I([d({attribute:!1})],ss.prototype,`contours`,void 0),cs=class extends is{constructor(...e){super(...e),this.barWidth=.7}static{this.tagName=`minerva-bar-3d-chart`}typed(e){return e.map(e=>({...e,type:`bar`,barWidth:e.barWidth??this.barWidth}))}},I([d({type:Number,attribute:`bar-width`})],cs.prototype,`barWidth`,void 0)})))()}var us,ds;function fs(){return(fs=e((()=>{rs(),m(),at(),us=class extends ns{constructor(...e){super(...e),this.height=320}createEngine(e,t){return ct(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.pointClicked(e)),e.on(`plotClick`,e=>this.plotClicked(e)),e.on(`zoom`,e=>this.emit(`minerva-zoom`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e})),e.on(`drop`,e=>this.pointDropped?.(e))]}pointClicked(e){this.emit(`minerva-point-click`,e)}plotClicked(e){this.emit(`minerva-plot-click`,e)}resetZoom(){this.instance?.resetZoom()}getView(){return this.instance?.getView()??null}setView(e){this.instance?.setView(e)}getRenderer(){return this.instance?.getRenderer()??null}},I([d()],us.prototype,`height`,void 0),ds=class extends us{static{this.tagName=`minerva-chart`}engineOptions(){return this.options??null}},I([d({attribute:!1})],ds.prototype,`options`,void 0)})))()}var ps;function ms(){return(ms=e((()=>{ps=(e,t,n,r)=>e.map(e=>{let i=e.type??t;return{...e,type:i,...n!==void 0&&i===t?{stack:e.stack??n}:{},...r!==void 0&&(i===`line`||i===`area`)?{curve:e.curve??r}:{}}})})))()}var hs,gs,_s,vs,ys,bs,xs,Ss,Z;function Cs(){return(Cs=e((()=>{fs(),ms(),m(),gt(),hs=class extends us{stackMode(){return this.options?.stackMode}engineOptions(){let e=this.series??this.options?.series;return e?{...this.options,series:this.typed(e),stackMode:this.stackMode()}:null}},I([d({attribute:!1})],hs.prototype,`series`,void 0),I([d({attribute:!1})],hs.prototype,`options`,void 0),gs=class extends hs{constructor(...e){super(...e),this.area=!1,this.curve=`linear`,this.stacked=!1,this.percent=!1}static{this.tagName=`minerva-line-chart`}typed(e){return ps(e,this.area?`area`:`line`,this.stacked||this.percent?`stack`:void 0,this.curve)}stackMode(){return this.percent?`percent`:super.stackMode()}},I([d({type:Boolean})],gs.prototype,`area`,void 0),I([d()],gs.prototype,`curve`,void 0),I([d({type:Boolean})],gs.prototype,`stacked`,void 0),I([d({type:Boolean})],gs.prototype,`percent`,void 0),_s=class extends hs{constructor(...e){super(...e),this.curve=`smooth`,this.stacked=!1,this.percent=!1}static{this.tagName=`minerva-area-chart`}typed(e){return ps(e,`area`,this.stacked||this.percent?`stack`:void 0,this.curve)}stackMode(){return this.percent?`percent`:super.stackMode()}},I([d()],_s.prototype,`curve`,void 0),I([d({type:Boolean})],_s.prototype,`stacked`,void 0),I([d({type:Boolean})],_s.prototype,`percent`,void 0),vs=class extends hs{constructor(...e){super(...e),this.stacked=!1,this.percent=!1,this.labels=!1}static{this.tagName=`minerva-bar-chart`}typed(e){return ps(e,`bar`,this.stacked||this.percent?`stack`:void 0).map(e=>this.labels&&e.type===`bar`?{...e,showLabels:e.showLabels??!0}:e)}stackMode(){return this.percent?`percent`:super.stackMode()}},I([d({type:Boolean})],vs.prototype,`stacked`,void 0),I([d({type:Boolean})],vs.prototype,`percent`,void 0),I([d({type:Boolean})],vs.prototype,`labels`,void 0),ys=class extends hs{static{this.tagName=`minerva-scatter-chart`}typed(e){return ps(e,`scatter`)}},bs=class extends hs{static{this.tagName=`minerva-candlestick-chart`}typed(e){return ps(e,`candlestick`)}},xs=class extends us{constructor(...e){super(...e),this.colorScale=`sequential`}static{this.tagName=`minerva-heatmap-chart`}engineOptions(){return this.data?rt({data:this.data,xCategories:this.xCategories,yCategories:this.yCategories,colorScale:this.colorScale,valueRange:this.valueRange,colorMidpoint:this.colorMidpoint,name:this.valueName,radius:this.radius,format:this.format},this.options):null}},I([d({attribute:!1})],xs.prototype,`data`,void 0),I([d({attribute:!1})],xs.prototype,`xCategories`,void 0),I([d({attribute:!1})],xs.prototype,`yCategories`,void 0),I([d({attribute:`color-scale`})],xs.prototype,`colorScale`,void 0),I([d({attribute:!1})],xs.prototype,`valueRange`,void 0),I([d({type:Number,attribute:`color-midpoint`})],xs.prototype,`colorMidpoint`,void 0),I([d({attribute:`value-name`})],xs.prototype,`valueName`,void 0),I([d({type:Number})],xs.prototype,`radius`,void 0),I([d({attribute:!1})],xs.prototype,`format`,void 0),I([d({attribute:!1})],xs.prototype,`options`,void 0),Ss=class extends us{constructor(...e){super(...e),this.height=48,this.type=`line`,this.curve=`smooth`}static{this.tagName=`minerva-sparkline`}engineOptions(){return this.data?st({data:this.data,type:this.type,color:this.color,curve:this.curve,name:this.valueName,reference:this.reference,format:this.format},this.options):null}},I([d()],Ss.prototype,`height`,void 0),I([d({attribute:!1})],Ss.prototype,`data`,void 0),I([d()],Ss.prototype,`type`,void 0),I([d()],Ss.prototype,`color`,void 0),I([d()],Ss.prototype,`curve`,void 0),I([d({type:Number})],Ss.prototype,`reference`,void 0),I([d({attribute:`value-name`})],Ss.prototype,`valueName`,void 0),I([d({attribute:!1})],Ss.prototype,`format`,void 0),I([d({attribute:!1})],Ss.prototype,`options`,void 0),Z=class extends us{constructor(...e){super(...e),this.reverseX=!1,this.hideTicks=!1,this.hideLabels=!1,this.pointSize=12,this.dragPoints=!1}static{this.tagName=`minerva-quadrant-chart`}geometry(){return{xDomain:this.xDomain,yDomain:this.yDomain,xSplit:this.xSplit,ySplit:this.ySplit,reverseX:this.reverseX}}engineOptions(){return this.points?dt({...this.geometry(),points:this.points,quadrants:this.quadrants,xLabel:this.xLabel,yLabel:this.yLabel,axisLabels:this.axisLabels,showTicks:!this.hideTicks,showLabels:!this.hideLabels,pointSize:this.pointSize,draggable:this.dragPoints},this.options):null}pointClicked(e){let t=e.items[0]?.index,n=t===void 0?void 0:this.points?.[t];n&&this.emit(`minerva-point-click`,{point:n,index:t})}plotClicked(e){this.emit(`minerva-quadrant-click`,{quadrant:ot(this.geometry(),e.x,e.y),x:e.x,y:e.y})}pointDropped(e){let t=e.item.index,n=this.points?.[t];n&&this.emit(`minerva-point-drop`,{point:n,index:t,x:e.x,y:e.y,quadrant:ot(this.geometry(),e.x,e.y)})}},I([d({attribute:!1})],Z.prototype,`points`,void 0),I([d({attribute:!1})],Z.prototype,`quadrants`,void 0),I([d({attribute:`x-label`})],Z.prototype,`xLabel`,void 0),I([d({attribute:`y-label`})],Z.prototype,`yLabel`,void 0),I([d({attribute:!1})],Z.prototype,`axisLabels`,void 0),I([d({attribute:!1})],Z.prototype,`xDomain`,void 0),I([d({attribute:!1})],Z.prototype,`yDomain`,void 0),I([d({type:Number,attribute:`x-split`})],Z.prototype,`xSplit`,void 0),I([d({type:Number,attribute:`y-split`})],Z.prototype,`ySplit`,void 0),I([d({type:Boolean,attribute:`reverse-x`})],Z.prototype,`reverseX`,void 0),I([d({type:Boolean,attribute:`hide-ticks`})],Z.prototype,`hideTicks`,void 0),I([d({type:Boolean,attribute:`hide-labels`})],Z.prototype,`hideLabels`,void 0),I([d({type:Number,attribute:`point-size`})],Z.prototype,`pointSize`,void 0),I([d({type:Boolean,attribute:`drag-points`})],Z.prototype,`dragPoints`,void 0),I([d({attribute:!1})],Z.prototype,`options`,void 0)})))()}var ws,Ts,Es,Ds,Os,ks,As,js;function Ms(){return(Ms=e((()=>{rs(),m(),_t(),ws=class extends ns{createEngine(e,t){return vt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`toggle`,e=>this.emit(`minerva-toggle`,e))]}toggle(e){this.instance?.toggle(e)}},Ts=class extends ws{static{this.tagName=`minerva-shape-chart`}get defaultHeight(){return this.options?.type===`gauge`?240:320}engineOptions(){return this.options??null}},I([d({attribute:!1})],Ts.prototype,`options`,void 0),Es=class extends ws{constructor(...e){super(...e),this.innerRadius=0,this.rose=!1}static{this.tagName=`minerva-pie-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`pie`,data:e,innerRadius:this.innerRadius,rose:this.rose||this.options?.rose,labels:this.labels??this.options?.labels,centerValue:this.centerValue??this.options?.centerValue,centerLabel:this.centerLabel??this.options?.centerLabel}:null}},I([d({attribute:!1})],Es.prototype,`data`,void 0),I([d({type:Number,attribute:`inner-radius`})],Es.prototype,`innerRadius`,void 0),I([d({type:Boolean})],Es.prototype,`rose`,void 0),I([d()],Es.prototype,`labels`,void 0),I([d({attribute:`center-value`})],Es.prototype,`centerValue`,void 0),I([d({attribute:`center-label`})],Es.prototype,`centerLabel`,void 0),I([d({attribute:!1})],Es.prototype,`options`,void 0),Ds=class extends Es{constructor(...e){super(...e),this.innerRadius=.62}static{this.tagName=`minerva-donut-chart`}},I([d({type:Number,attribute:`inner-radius`})],Ds.prototype,`innerRadius`,void 0),Os=class extends ws{constructor(...e){super(...e),this.shape=`polygon`,this.levels=4}static{this.tagName=`minerva-radar-chart`}engineOptions(){let e=this.indicators??this.options?.indicators,t=this.series??this.options?.series;return!e||!t?null:{...this.options,type:`radar`,indicators:e,series:t,shape:this.shape,levels:this.levels}}},I([d({attribute:!1})],Os.prototype,`indicators`,void 0),I([d({attribute:!1})],Os.prototype,`series`,void 0),I([d()],Os.prototype,`shape`,void 0),I([d({type:Number})],Os.prototype,`levels`,void 0),I([d({attribute:!1})],Os.prototype,`options`,void 0),ks=class extends ws{constructor(...e){super(...e),this.value=0,this.min=0,this.max=100,this.needle=!1}static{this.tagName=`minerva-gauge-chart`}get defaultHeight(){return 240}engineOptions(){return{...this.options,type:`gauge`,value:this.value,min:this.min,max:this.max,label:this.label??this.options?.label,needle:this.needle||this.options?.needle,bands:this.bands??this.options?.bands}}},I([d({type:Number})],ks.prototype,`value`,void 0),I([d({type:Number})],ks.prototype,`min`,void 0),I([d({type:Number})],ks.prototype,`max`,void 0),I([d()],ks.prototype,`label`,void 0),I([d({type:Boolean})],ks.prototype,`needle`,void 0),I([d({attribute:!1})],ks.prototype,`bands`,void 0),I([d({attribute:!1})],ks.prototype,`options`,void 0),As=class extends ws{constructor(...e){super(...e),this.sort=`none`,this.shape=`trapezoid`,this.hideConversion=!1}static{this.tagName=`minerva-funnel-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`funnel`,data:e,sort:this.sort,shape:this.shape,conversion:!this.hideConversion&&this.options?.conversion}:null}},I([d({attribute:!1})],As.prototype,`data`,void 0),I([d()],As.prototype,`sort`,void 0),I([d()],As.prototype,`shape`,void 0),I([d({type:Boolean,attribute:`hide-conversion`})],As.prototype,`hideConversion`,void 0),I([d({attribute:!1})],As.prototype,`options`,void 0),js=class extends ws{constructor(...e){super(...e),this.gap=2,this.hideHeaders=!1}static{this.tagName=`minerva-treemap-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`treemap`,data:e,gap:this.gap,headers:!this.hideHeaders&&this.options?.headers}:null}},I([d({attribute:!1})],js.prototype,`data`,void 0),I([d({type:Number})],js.prototype,`gap`,void 0),I([d({type:Boolean,attribute:`hide-headers`})],js.prototype,`hideHeaders`,void 0),I([d({attribute:!1})],js.prototype,`options`,void 0)})))()}var Ns,Ps,Fs,Is,Ls,Rs,zs,Bs,Vs,Hs;function Us(){return(Us=e((()=>{fs(),ms(),Cs(),m(),gt(),Ns=class extends vs{static{this.tagName=`minerva-horizontal-bar-chart`}engineOptions(){let e=super.engineOptions();return e&&{...e,orientation:`horizontal`}}},Ps=class extends hs{constructor(...e){super(...e),this.curve=`smooth`}static{this.tagName=`minerva-range-area-chart`}typed(e){return ps(e,`area`,void 0,this.curve).map(e=>e.type===`area`?{...e,lineWidth:e.lineWidth??1.5}:e)}},I([d()],Ps.prototype,`curve`,void 0),Fs=class extends hs{static{this.tagName=`minerva-mixed-chart`}typed(e){return ps(e,`line`)}},Is=class extends hs{constructor(...e){super(...e),this.minSize=6,this.maxSize=48}static{this.tagName=`minerva-bubble-chart`}typed(e){return ut(e,{minSize:this.minSize,maxSize:this.maxSize,maxValue:this.maxValue})}},I([d({type:Number,attribute:`min-size`})],Is.prototype,`minSize`,void 0),I([d({type:Number,attribute:`max-size`})],Is.prototype,`maxSize`,void 0),I([d({type:Number,attribute:`max-value`})],Is.prototype,`maxValue`,void 0),Ls={fromAttribute:e=>e===null?void 0:/^\d+$/.test(e)?Number(e):e},Rs=class extends us{constructor(...e){super(...e),this.bins=`auto`,this.nice=!0}static{this.tagName=`minerva-histogram-chart`}engineOptions(){return this.values?{...this.options,series:[pt(this.values,{bins:this.bins,domain:this.domain,nice:this.nice,name:this.valueName,color:this.color,format:this.formatBin}),...this.series??[]]}:null}},I([d({attribute:!1})],Rs.prototype,`values`,void 0),I([d({converter:Ls})],Rs.prototype,`bins`,void 0),I([d({attribute:!1})],Rs.prototype,`domain`,void 0),I([d({attribute:!1})],Rs.prototype,`nice`,void 0),I([d({attribute:`value-name`})],Rs.prototype,`valueName`,void 0),I([d()],Rs.prototype,`color`,void 0),I([d({attribute:!1})],Rs.prototype,`formatBin`,void 0),I([d({attribute:!1})],Rs.prototype,`series`,void 0),I([d({attribute:!1})],Rs.prototype,`options`,void 0),zs={fromAttribute:e=>e===null?void 0:e===`minmax`?e:Number(e)},Bs=class extends us{constructor(...e){super(...e),this.whisker=1.5,this.outlierShape=`hollow`,this.outlierSize=7,this.orientation=`vertical`}static{this.tagName=`minerva-box-plot-chart`}engineOptions(){return!this.groups?.length&&!this.series?null:{...this.options,orientation:this.orientation,series:ps([...this.groups?.length?[{id:`boxplot`,name:this.valueName??`Values`,data:it(this.groups,{whisker:this.whisker})}]:[],...this.series??[]],`boxplot`).map(e=>e.type===`boxplot`?{...e,outlierShape:e.outlierShape??this.outlierShape,outlierSize:e.outlierSize??this.outlierSize}:e)}}},I([d({attribute:!1})],Bs.prototype,`groups`,void 0),I([d({attribute:!1})],Bs.prototype,`series`,void 0),I([d({attribute:`value-name`})],Bs.prototype,`valueName`,void 0),I([d({converter:zs})],Bs.prototype,`whisker`,void 0),I([d({attribute:`outlier-shape`})],Bs.prototype,`outlierShape`,void 0),I([d({type:Number,attribute:`outlier-size`})],Bs.prototype,`outlierSize`,void 0),I([d()],Bs.prototype,`orientation`,void 0),I([d({attribute:!1})],Bs.prototype,`options`,void 0),Vs=class extends us{constructor(...e){super(...e),this.start=0,this.hideLabels=!1,this.hideConnectors=!1,this.orientation=`vertical`}static{this.tagName=`minerva-waterfall-chart`}engineOptions(){return this.steps?{...this.options,orientation:this.orientation,series:[lt(this.steps,{name:this.valueName,upColor:this.upColor,downColor:this.downColor,totalColor:this.totalColor,start:this.start,labels:!this.hideLabels,format:this.format,connector:this.hideConnectors?!1:this.connector??!0,locale:this.options?.locale})]}:null}},I([d({attribute:!1})],Vs.prototype,`steps`,void 0),I([d({attribute:`value-name`})],Vs.prototype,`valueName`,void 0),I([d({attribute:`up-color`})],Vs.prototype,`upColor`,void 0),I([d({attribute:`down-color`})],Vs.prototype,`downColor`,void 0),I([d({attribute:`total-color`})],Vs.prototype,`totalColor`,void 0),I([d({type:Number})],Vs.prototype,`start`,void 0),I([d({type:Boolean,attribute:`hide-labels`})],Vs.prototype,`hideLabels`,void 0),I([d({attribute:!1})],Vs.prototype,`format`,void 0),I([d({type:Boolean,attribute:`hide-connectors`})],Vs.prototype,`hideConnectors`,void 0),I([d({attribute:!1})],Vs.prototype,`connector`,void 0),I([d()],Vs.prototype,`orientation`,void 0),I([d({attribute:!1})],Vs.prototype,`options`,void 0),Hs=class extends us{constructor(...e){super(...e),this.hideDependencyArrows=!1,this.today=!1,this.mountedAt=Date.now()}static{this.tagName=`minerva-gantt-chart`}engineOptions(){if(!this.tasks)return null;let e=ft(this.tasks,{colors:this.colors,taskName:this.taskName,progressName:this.progressName,milestoneName:this.milestoneName,formatProgress:this.formatProgress,dependenciesName:this.dependenciesName,dependencyArrows:!this.hideDependencyArrows,dependencyColor:this.dependencyColor,locale:this.options?.locale}),t=this.today,n=t===!1?null:t===!0?this.mountedAt:t instanceof Date?t.getTime():t,r=n===null?[]:[{type:`line`,axis:`y`,value:n,color:`var(--danger-color, #dc2626)`,dash:[4,3],label:this.todayLabel}],i=this.options??{};return{...i,series:e.series,orientation:`horizontal`,xAxis:{type:`category`,categories:e.categories,...i.xAxis},yAxis:{type:`time`,min:e.domain[0],max:e.domain[1],...i.yAxis},annotations:[...i.annotations??[],...r],dependencies:e.dependencies,interaction:i.interaction??{zoom:`y`},legend:i.legend??e.series.length>1}}},I([d({attribute:!1})],Hs.prototype,`tasks`,void 0),I([d({attribute:!1})],Hs.prototype,`colors`,void 0),I([d({attribute:`task-name`})],Hs.prototype,`taskName`,void 0),I([d({attribute:`progress-name`})],Hs.prototype,`progressName`,void 0),I([d({attribute:`milestone-name`})],Hs.prototype,`milestoneName`,void 0),I([d({attribute:`dependencies-name`})],Hs.prototype,`dependenciesName`,void 0),I([d({type:Boolean,attribute:`hide-dependency-arrows`})],Hs.prototype,`hideDependencyArrows`,void 0),I([d({attribute:`dependency-color`})],Hs.prototype,`dependencyColor`,void 0),I([d({attribute:!1})],Hs.prototype,`formatProgress`,void 0),I([d({attribute:!1})],Hs.prototype,`today`,void 0),I([d({attribute:`today-label`})],Hs.prototype,`todayLabel`,void 0),I([d({attribute:!1})],Hs.prototype,`options`,void 0)})))()}var Ws,Gs,Ks,qs,Js,Ys,Xs,Zs,Qs;function $s(){return($s=e((()=>{Ms(),m(),Ws=class extends ws{constructor(...e){super(...e),this.align=`justify`,this.linkColor=`gradient`,this.hideLabels=!1}static{this.tagName=`minerva-sankey-chart`}get defaultHeight(){return 360}engineOptions(){let e=this.links??this.options?.links;return e?{...this.options,type:`sankey`,nodes:this.nodes??this.options?.nodes,links:e,align:this.align,linkColor:this.linkColor,labels:!this.hideLabels&&this.options?.labels}:null}},I([d({attribute:!1})],Ws.prototype,`nodes`,void 0),I([d({attribute:!1})],Ws.prototype,`links`,void 0),I([d()],Ws.prototype,`align`,void 0),I([d({attribute:`link-color`})],Ws.prototype,`linkColor`,void 0),I([d({type:Boolean,attribute:`hide-labels`})],Ws.prototype,`hideLabels`,void 0),I([d({attribute:!1})],Ws.prototype,`options`,void 0),Gs=class extends ws{constructor(...e){super(...e),this.innerRadius=.26,this.labels=`auto`,this.noDrill=!1}static{this.tagName=`minerva-sunburst-chart`}get defaultHeight(){return 360}bindEngine(e){return[...super.bindEngine(e),e.on(`drill`,e=>this.emit(`minerva-drill`,e))]}drill(e){this.instance?.drill(e)}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`sunburst`,data:e,innerRadius:this.innerRadius,labels:this.labels,drill:!this.noDrill&&this.options?.drill,drillPath:this.drillPath??this.options?.drillPath}:null}},I([d({attribute:!1})],Gs.prototype,`data`,void 0),I([d({type:Number,attribute:`inner-radius`})],Gs.prototype,`innerRadius`,void 0),I([d()],Gs.prototype,`labels`,void 0),I([d({type:Boolean,attribute:`no-drill`})],Gs.prototype,`noDrill`,void 0),I([d({attribute:!1})],Gs.prototype,`drillPath`,void 0),I([d({attribute:!1})],Gs.prototype,`options`,void 0),Ks=class extends ws{constructor(...e){super(...e),this.innerRadius=.3,this.sweep=270}static{this.tagName=`minerva-radial-bar-chart`}get defaultHeight(){return 300}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`radialBar`,data:e,max:this.max??this.options?.max,innerRadius:this.innerRadius,sweep:this.sweep,centerValue:this.centerValue??this.options?.centerValue,centerLabel:this.centerLabel??this.options?.centerLabel}:null}},I([d({attribute:!1})],Ks.prototype,`data`,void 0),I([d({type:Number})],Ks.prototype,`max`,void 0),I([d({type:Number,attribute:`inner-radius`})],Ks.prototype,`innerRadius`,void 0),I([d({type:Number})],Ks.prototype,`sweep`,void 0),I([d({attribute:`center-value`})],Ks.prototype,`centerValue`,void 0),I([d({attribute:`center-label`})],Ks.prototype,`centerLabel`,void 0),I([d({attribute:!1})],Ks.prototype,`options`,void 0),qs=e=>(e instanceof Date?e:new Date(e)).getFullYear(),Js=e=>(e instanceof Date?e:new Date(e)).getTime(),Ys=e=>{if(!Array.isArray(e))return 1;let[t,n]=e,r=qs(t),i=qs(n),a=(Js(n)-Js(t))/864e5+1;return i>r&&a>371?i-r+1:1},Xs=class extends ws{constructor(...e){super(...e),this.layout=`weeks`,this.levels=4}static{this.tagName=`minerva-calendar-heatmap`}get defaultHeight(){if(this.layout===`months`)return 560;let e=this.options?.legend===!1?0:34;return Ys(this.range??this.options?.range)*120+e+16}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`calendarHeatmap`,data:e,range:this.range??this.options?.range,layout:this.layout,locale:this.locale??this.options?.locale,color:this.color??this.options?.color,levels:this.levels}:null}},I([d({attribute:!1})],Xs.prototype,`data`,void 0),I([d({attribute:!1})],Xs.prototype,`range`,void 0),I([d()],Xs.prototype,`layout`,void 0),I([d()],Xs.prototype,`locale`,void 0),I([d()],Xs.prototype,`color`,void 0),I([d({type:Number})],Xs.prototype,`levels`,void 0),I([d({attribute:!1})],Xs.prototype,`options`,void 0),Zs=class extends ws{constructor(...e){super(...e),this.orientation=`horizontal`}static{this.tagName=`minerva-bullet-chart`}get defaultHeight(){if(this.orientation===`vertical`)return 320;let e=(this.data??this.options?.data??[]).length;return Math.max(96,e*64+16)+(this.options?.legend?34:0)}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`bullet`,data:e,orientation:this.orientation,ranges:this.ranges??this.options?.ranges,rangeLabels:this.rangeLabels??this.options?.rangeLabels,targetColor:this.targetColor??this.options?.targetColor}:null}},I([d({attribute:!1})],Zs.prototype,`data`,void 0),I([d()],Zs.prototype,`orientation`,void 0),I([d({attribute:!1})],Zs.prototype,`ranges`,void 0),I([d({attribute:!1})],Zs.prototype,`rangeLabels`,void 0),I([d({attribute:`target-color`})],Zs.prototype,`targetColor`,void 0),I([d({attribute:!1})],Zs.prototype,`options`,void 0),Qs=class extends ws{constructor(...e){super(...e),this.directed=!1,this.ribbonColor=`gradient`,this.labels=`auto`}static{this.tagName=`minerva-chord-chart`}get defaultHeight(){return 420}engineOptions(){let e=this.links??this.options?.links,t=this.matrix??this.options?.matrix;return!e&&!t?null:{...this.options,type:`chord`,groups:this.groups??this.options?.groups,matrix:t,links:e,directed:this.directed||this.options?.directed,ribbonColor:this.ribbonColor,labels:this.labels,tickFormat:this.tickFormat??this.options?.tickFormat}}},I([d({attribute:!1})],Qs.prototype,`groups`,void 0),I([d({attribute:!1})],Qs.prototype,`matrix`,void 0),I([d({attribute:!1})],Qs.prototype,`links`,void 0),I([d({type:Boolean})],Qs.prototype,`directed`,void 0),I([d({attribute:`ribbon-color`})],Qs.prototype,`ribbonColor`,void 0),I([d()],Qs.prototype,`labels`,void 0),I([d({attribute:!1})],Qs.prototype,`tickFormat`,void 0),I([d({attribute:!1})],Qs.prototype,`options`,void 0)})))()}function ec(e){return ic.add(e),!ac&&typeof MutationObserver<`u`&&(ac=new MutationObserver(()=>{for(let e of[...ic])e()}),ac.observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`],subtree:!0})),()=>{ic.delete(e),ic.size===0&&(ac?.disconnect(),ac=null)}}var tc,nc,rc,ic,ac,Q;function oc(){return(oc=e((()=>{j(),S(),an(),F(),O(),w(),Mn(),yi(),Br(),Xn(),u(),m(),Xe(),qe(),tc=(e,t)=>Number.isFinite(e)&&e>0?e:t,nc=e=>e===`dark`||e===`github-dark`?`dark`:e===`light`?`light`:void 0,rc=e=>typeof e?.editor?.create==`function`,ic=new Set,ac=null,Q=class e extends On{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.language=`plaintext`,this.label=``,this.height=420,this.minHeight=160,this.maxHeight=800,this.loadTimeout=1e4,this.status=`loading`,this.scopeTheme=`light`,this.locale=new C(this),this.editor=null,this.engine=null,this.container=null,this.subscriptions=[],this.applying=!1,this.edited=!1,this.dirty=!1,this.unobserveTheme=null,this.started=!1}static{this.tagName=`minerva-code-editor`}static{this.dependencies=[H,Vr]}static{this.styles=[A,f`
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
`,P(cr)]}get resolvedTheme(){return this.theme===`dark`||this.theme===`light`?this.theme:this.scopeTheme}focus(e){this.editor?this.editor.focus():this.fallback?.focus(e)}retry(){this.load()}getFormValue(){return this.value}getValidity(){return this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.fallback??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}connectedCallback(){super.connectedCallback(),this.syncScopeTheme(),this.unobserveTheme=ec(()=>this.syncScopeTheme()),this.started&&this.load()}disconnectedCallback(){super.disconnectedCallback(),this.unobserveTheme?.(),this.unobserveTheme=null,this.teardown()}syncScopeTheme(){let e=Mt(this,`[data-theme]`);this.scopeTheme=nc(e?.getAttribute(`data-theme`))??`light`}get monacoTheme(){return this.resolvedTheme===`dark`?`vs-dark`:`vs`}teardown(){clearTimeout(this.timer),this.timer=void 0;for(let e of this.subscriptions)e.dispose();this.subscriptions=[];try{this.editor?.dispose()}catch{}this.editor=null,this.engine=null,this.container?.remove(),this.container=null}fail(){let e=this.status===`error`;this.teardown(),this.status=`error`,e||this.emit(`minerva-error`)}load(){this.teardown(),this.status=`loading`,this.isConnected&&(this.timer=setTimeout(()=>this.fail(),this.loadTimeout),this.monaco!==void 0&&this.mount())}mount(){let t=this.monaco;if(!rc(t)){T&&N(e.tagName,'`monaco` is not a Monaco engine (expected `import * as monaco from "monaco-editor"`); showing the textarea fallback.'),this.fail();return}let n=document.createElement(`div`);n.slot=`editor`,n.setAttribute(`data-minerva-code-editor`,``),this.append(n),this.container=n;try{t.editor.setTheme(this.monacoTheme);let e=t.editor.create(n,{value:this.value,language:this.language,theme:this.monacoTheme,readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label,automaticLayout:!0,minimap:{enabled:!1},wordWrap:`on`,scrollBeyondLastLine:!1});this.editor=e,this.engine=t,this.subscriptions.push(e.onDidChangeModelContent(()=>this.handleEdit()),e.onDidBlurEditorText(()=>this.commit()))}catch{this.fail();return}clearTimeout(this.timer),this.timer=void 0,this.status=`mounted`}handleEdit(){let e=this.editor;e&&!this.applying&&(this.isDisabled||(this.value=e.getValue(),this.dirty=!0,this.edited=!0,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:this.value})))}commit(){this.edited&&(this.edited=!1,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}handleFallbackInput(e){this.isDisabled||(this.value=e.target.value,this.dirty=!0,this.edited=!0,this.emit(`minerva-input`,{value:this.value}))}applyValue(){let e=this.editor;if(e&&e.getValue()!==this.value){this.applying=!0;try{let t=e.getModel();this.isDisabled||!t?e.setValue(this.value):(e.executeEdits(``,[{range:t.getFullModelRange(),text:this.value,forceMoveMarkers:!0}]),e.pushUndoStop())}finally{this.applying=!1}}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){if(super.updated(t),!this.started){this.started=!0,T&&!this.label&&N(e.tagName,`set label: it is the visible label and the accessible name of the editor.`),this.load();return}if(t.has(`monaco`)&&t.get(`monaco`)!==void 0){this.load();return}t.has(`monaco`)&&this.monaco!==void 0&&!this.editor&&(this.status===`loading`&&this.timer!==void 0?this.mount():this.status===`error`&&this.load());let n=this.editor,r=this.engine;if(n&&r)try{t.has(`value`)&&this.applyValue(),t.has(`language`)&&r.editor.setModelLanguage(n.getModel(),this.language),(t.has(`disabled`)||t.has(`formDisabled`)||t.has(`label`))&&n.updateOptions({readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label}),(t.has(`theme`)||t.has(`scopeTheme`))&&r.editor.setTheme(this.monacoTheme)}catch{this.fail()}}hookStates(){return{disabled:this.isDisabled,loading:this.status===`loading`}}render(){let e=tc(this.minHeight,160),t=Math.max(e,tc(this.maxHeight,800)),n=Math.min(t,Math.max(e,tc(this.height,420))),r=this.locale.t,i=this.status;return g`<div
part="root"
class="root"
role="group"
aria-label=${this.label||l}
>
<label
part="label"
class="label"
for=${i===`error`?`fallback`:l}
@click=${()=>this.editor?.focus()}
>${this.label}</label
>
<div
part="surface"
class="surface"
style=${h({height:`${n}px`})}
aria-busy=${i===`loading`?`true`:`false`}
>
${i===`error`?g`<div part="error" class="error">
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
                      >${wr}</span
                    >
                    ${this.retryText??r(`monacoCodeEditor.retry`)}
                  </minerva-button>
                </div>
                <textarea
                  id="fallback"
                  part="fallback"
                  class="fallback"
                  aria-label=${this.label||l}
                  spellcheck="false"
                  .value=${Qe(this.value)}
                  ?disabled=${this.isDisabled}
                  @input=${this.handleFallbackInput}
                  @change=${()=>this.commit()}
                ></textarea>`:g`${i===`loading`?g`<div part="loading" class="loading" role="status">
<minerva-progress
size="small"
aria-label=${this.loadingLabel??r(`monacoCodeEditor.loading`)}
></minerva-progress>
</div>`:l}<slot name="editor"></slot>`}
</div>
</div>`}},I([d({attribute:!1})],Q.prototype,`monaco`,void 0),I([d({attribute:!1})],Q.prototype,`value`,void 0),I([d({attribute:`value`})],Q.prototype,`defaultValue`,void 0),I([d({reflect:!0})],Q.prototype,`language`,void 0),I([d()],Q.prototype,`label`,void 0),I([d({type:Number})],Q.prototype,`height`,void 0),I([d({type:Number,attribute:`min-height`})],Q.prototype,`minHeight`,void 0),I([d({type:Number,attribute:`max-height`})],Q.prototype,`maxHeight`,void 0),I([d({reflect:!0})],Q.prototype,`theme`,void 0),I([d({type:Number,attribute:`load-timeout`})],Q.prototype,`loadTimeout`,void 0),I([d({attribute:`unavailable-text`})],Q.prototype,`unavailableText`,void 0),I([d({attribute:`retry-text`})],Q.prototype,`retryText`,void 0),I([d({attribute:`retry-label`})],Q.prototype,`retryLabel`,void 0),I([d({attribute:`loading-label`})],Q.prototype,`loadingLabel`,void 0),I([v()],Q.prototype,`status`,void 0),I([v()],Q.prototype,`scopeTheme`,void 0),I([y(`textarea`)],Q.prototype,`fallback`,void 0)})))()}var sc,cc,lc,uc,$,dc,fc,pc;function mc(){return(mc=e((()=>{rs(),m(),ht(),sc=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},cc=(e,t)=>{let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&e[n]===t[n])},lc=(e,t)=>e===t?!0:Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):sc(e)&&sc(t)&&cc(e,t),uc=(e,t)=>{let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&lc(e[n],t[n]))},$=class extends ns{constructor(...e){super(...e),this.height=480,this.edgeColor=`neutral`,this.arrowStyle=`open`,this.previous=null}createEngine(e,t){return this.previous=t,mt(e,t)}engineOptions(){return!this.nodes||!this.edges?null:{...this.options,nodes:this.nodes,edges:this.edges,groups:this.groups,...this.layoutOptions(),nodeShape:this.nodeShape??this.options?.nodeShape,edgeStyle:this.edgeStyle??this.options?.edgeStyle,edgeColor:this.edgeColor,arrowStyle:this.arrowStyle,highlight:this.highlight??this.options?.highlight,locale:this.locale??this.options?.locale,selected:this.selected??this.options?.selected}}syncEngine(e){let t=this.engineOptions();!t||this.previous&&uc(this.previous,t)||(this.previous=t,e.setOptions(t))}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-item-click`,e)),e.on(`select`,e=>this.emit(`minerva-selection-change`,{ids:e.ids})),e.on(`toggle`,e=>this.emit(`minerva-toggle`,e)),e.on(`groupToggle`,e=>this.emit(`minerva-group-toggle`,e)),e.on(`layoutEnd`,e=>this.emit(`minerva-layout-end`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}fit(e){this.instance?.fit(e)}focusNode(e,t){this.instance?.focusNode(e,t)}setData(e){this.instance?.setData(e)}select(e){this.instance?.select(e)}getSelection(){return this.instance?.getSelection()??[]}expand(e){this.instance?.expand(e)}collapse(e){this.instance?.collapse(e)}toggle(e){this.instance?.toggle(e)}getPositions(){return this.instance?.getPositions()??{}}relayout(){this.instance?.relayout()}getRenderer(){return this.instance?.getRenderer()??null}},I([d()],$.prototype,`height`,void 0),I([d({attribute:!1})],$.prototype,`nodes`,void 0),I([d({attribute:!1})],$.prototype,`edges`,void 0),I([d({attribute:!1})],$.prototype,`groups`,void 0),I([d({attribute:`node-shape`})],$.prototype,`nodeShape`,void 0),I([d({attribute:`edge-style`})],$.prototype,`edgeStyle`,void 0),I([d({attribute:`edge-color`})],$.prototype,`edgeColor`,void 0),I([d({attribute:`arrow-style`})],$.prototype,`arrowStyle`,void 0),I([d()],$.prototype,`highlight`,void 0),I([d()],$.prototype,`locale`,void 0),I([d({attribute:!1})],$.prototype,`selected`,void 0),I([d({attribute:!1})],$.prototype,`options`,void 0),dc=class extends ${constructor(...e){super(...e),this.layout=`force`}static{this.tagName=`minerva-graph-chart`}layoutOptions(){return{layout:this.layout,direction:this.direction??this.options?.direction,force:this.options?.force,circular:this.options?.circular,dag:this.options?.dag,tree:this.options?.tree}}},I([d()],dc.prototype,`layout`,void 0),I([d()],dc.prototype,`direction`,void 0),fc=class extends ${constructor(...e){super(...e),this.direction=`TB`}static{this.tagName=`minerva-dependency-graph`}layoutOptions(){let e=this.options?.dag,t=this.criticalPath;return{layout:`dag`,direction:this.direction,dag:t===void 0?e:{...e,criticalPath:t}}}},I([d()],fc.prototype,`direction`,void 0),I([d({type:Boolean,attribute:`critical-path`})],fc.prototype,`criticalPath`,void 0),pc=class extends ${constructor(...e){super(...e),this.layout=`tree`,this.direction=`LR`}static{this.tagName=`minerva-tree-chart`}layoutOptions(){return{layout:this.layout,direction:this.layout===`tree`?this.direction:void 0,tree:this.options?.tree}}},I([d()],pc.prototype,`layout`,void 0),I([d()],pc.prototype,`direction`,void 0)})))()}export{ns as $,pa as $t,ks as A,li as An,Y as At,gs as B,Jr as Bn,Ma as Bt,Bs as C,Ai as Cn,so as Ct,js as D,_i as Dn,ao as Dt,Os as E,V as En,io as Et,vs as F,z as Fn,Ka as Ft,us as G,wa as Gt,bs as H,Da as Ht,ys as I,ti as In,Ra as It,cs as J,Sa as Jt,fs as K,ba as Kt,Z as L,R as Ln,La as Lt,Ds as M,si as Mn,J as Mt,As as N,oi as Nn,Ya as Nt,ws as O,pi as On,eo as Ot,hs as P,ci as Pn,Ga as Pt,ss as Q,ma as Qt,Ss as R,$r as Rn,Ia as Rt,Fs as S,Mi as Sn,uo as St,Ts as T,H as Tn,co as Tt,_s as U,Oa as Ut,xs as V,Na as Vt,ds as W,Ta as Wt,ls as X,va as Xt,is as Y,q as Yt,os as Z,ya as Zt,Ns as _,Oi as _n,To as _t,uc as a,$i as an,Zo as at,Us as b,Ei as bn,ho as bt,oc as c,G as cn,Go as ct,Gs as d,Ki as dn,_o as dt,da as en,rs as et,$s as f,Hi as fn,bo as ft,Hs as g,ji as gn,vo as gt,Zs as h,Bi as hn,xo as ht,dc as i,K as in,qo as it,Es as j,ui as jn,Za as jt,Ms as k,fi as kn,to as kt,Ks as l,Ji as ln,Ao as lt,Ws as m,U as mn,ko as mt,pc as n,fa as nn,es as nt,fc as o,Qi as on,Ko as ot,Xs as p,W as pn,Co as pt,as as q,xa as qt,mc as r,ia as rn,Qo as rt,Q as s,Zi as sn,Uo as st,$ as t,ea as tn,X as tt,Qs as u,Gi as un,Ho as ut,Ps as v,Ni as vn,yo as vt,Vs as w,yi as wn,oo as wt,Is as x,Pi as xn,fo as xt,Rs as y,ki as yn,So as yt,Cs as z,L as zn,Fa as zt};