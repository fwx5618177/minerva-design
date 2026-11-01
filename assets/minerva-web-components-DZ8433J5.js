import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{_ as t,g as n,h as r,m as i}from"./native-preview-C-OsNMso.js";import{$ as a,$n as o,$t as s,Bt as ee,Cn as te,Ct as c,D as ne,Dt as re,En as ie,Et as ae,Ft as l,Gn as oe,Hn as se,Ln as ce,Mn as le,O as ue,Pn as de,Qn as fe,Qt as pe,Tn as me,Tt as he,Vn as ge,X as _e,Yn as ve,Yt as ye,Z as be,_t as xe,at as Se,cr as Ce,dn as we,et as Te,fn as Ee,gn as De,gt as Oe,i as ke,in as Ae,jt as je,kt as Me,mn as Ne,nr as Pe,on as Fe,ot as Ie,pt as Le,qn as Re,qt as ze,r as Be,rt as Ve,sr as He,tn as Ue,un as We,vt as Ge,wn as Ke,wt as qe,yt as Je}from"./angular-preview-CDGnma-W.js";import{A as u,C as d,D as f,H as Ye,I as Xe,N as p,P as m,U as Ze,_ as Qe,a as $e,b as h,c as et,f as tt,g as nt,i as rt,k as g,m as it,p as at,r as ot,s as st,t as ct,u as lt,w as _,x as v,y,z as b}from"./minerva-web-components-DlAztivh.js";import{D as ut,E as dt,F as ft,I as pt,N as mt,T as ht,_ as gt,g as _t,h as vt,j as yt,k as bt,n as xt,t as St,x as Ct}from"./angular-preview-DXuT9H-w.js";import{n as wt,t as Tt}from"./angular-preview-zsUCIt1r.js";import{n as Et,t as Dt}from"./angular-preview-CPOhk_AS.js";import{n as Ot,t as kt}from"./minerva-web-components-Bt6x98fv.js";import{$t as At,An as jt,Ar as x,At as Mt,Bn as Nt,Bt as Pt,Cn as Ft,Cr as S,Ct as It,Dn as Lt,Dr as Rt,Dt as zt,En as Bt,Er as Vt,Et as Ht,Fn as Ut,Gn as C,Gt as Wt,Hn as Gt,Ht as Kt,Jn as qt,Jt,Kn as Yt,Kt as Xt,Ln as Zt,Lt as Qt,Mn as $t,Mt as en,Nr as tn,Nt as nn,On as rn,Or as an,Ot as on,Pn as sn,Pr as cn,Pt as ln,Qn as un,Qt as dn,Rn as fn,Rt as pn,Sn as mn,Sr as w,St as hn,Tr as gn,Tt as _n,Un as vn,Ut as yn,Vn as bn,Vt as xn,Wn as Sn,Wt as Cn,Xn as wn,Xt as Tn,Yn as En,Yt as Dn,Zn as On,Zt as kn,_n as An,_r as jn,_t as Mn,an as Nn,bn as T,br as Pn,bt as Fn,cn as In,cr as E,ct as Ln,d as Rn,dn as zn,dr as D,dt as Bn,en as Vn,f as Hn,fn as Un,fr as O,ft as Wn,gn as Gn,gr as Kn,gt as qn,hn as Jn,hr as k,ht as Yn,in as Xn,it as Zn,jn as Qn,jt as $n,kn as er,kr as A,kt as tr,ln as nr,lr as rr,lt as ir,mn as ar,mr as j,mt as or,n as sr,nn as cr,nr as lr,nt as ur,on as dr,or as M,pn as fr,pr as N,pt as pr,qt as mr,rn as hr,rt as gr,sn as _r,sr as P,st as vr,t as yr,tn as br,tr as xr,tt as Sr,un as Cr,ur as wr,ut as Tr,vn as Er,vr as Dr,vt as Or,wr as kr,wt as Ar,xn as F,xr as I,xt as jr,yn as Mr,yr as Nr,yt as Pr,zn as Fr,zt as Ir}from"./minerva-web-components-CjqKc8e8.js";import{t as L}from"./minerva-web-components-D61_qRVd.js";import{_ as Lr,c as Rr,d as zr,f as Br,g as Vr,h as Hr,l as Ur,m as Wr,p as Gr,s as Kr,u as qr}from"./minerva-web-components-C9hnRSho.js";import{Bt as Jr,Gt as Yr,Kt as Xr,Lt as Zr,Rt as Qr,Ut as $r,Wt as ei,qt as ti,zt as ni}from"./minerva-web-components-Bei_mXJb.js";var ri,ii,R;function ai(){return(ai=e((()=>{wr(),A(),M(),C(),I(),k(),O(),T(),u(),d(),h(),Qe(),c(),ri={info:sn,success:Ft,warning:Ut,danger:lr},ii=[`slideIn`,`fadeIn`,`bounce`,`zoom`],R=class e extends N{constructor(...e){super(...e),this.color=`info`,this.variant=`subtle`,this.size=`medium`,this.heading=``,this.hideIcon=!1,this.closable=!1,this.noAnimation=!1,this.animationName=`slideIn`,this.banner=!1,this.elevation=!1,this.square=!1,this.collapsible=!1,this.collapsed=!1,this.locale=new w(this),this.aria=new x(this),this.slots=new D(this)}static{this.tagName=`minerva-alert`}static{this.styles=[j,b`
:host{
display: block;
}
.icon svg,
.expandButton svg,
.closeButton svg{
display: block;
}
`,F(rr)]}get hasHeading(){return!!this.heading||this.slots.test(`heading`)}handleExpand(){let e=this.collapsed;this.emit(`minerva-expanded-change`,{expanded:e},{cancelable:!0})&&(this.collapsed=!e)}handleClose(){let e=this.adjacentTabbable(),t=this.parentElement;this.emit(`minerva-close`,{},{cancelable:!0})&&(this.isFocusInsideOrLost()&&this.moveFocusOut(e,t),this.hidden=!0)}isFocusInsideOrLost(){let e=this.ownerDocument,t=a(e);return!t||t===e.body||!t.isConnected||l(this,t)}adjacentTabbable(){let e=qe(this.ownerDocument.body),t=e.map((e,t)=>l(this,e)?t:-1).filter(e=>e>=0);if(!t.length)return null;let n=e=>!l(this,e)&&Oe(e);return e.slice(t[t.length-1]+1).find(n)??e.slice(0,t[0]).filter(n).pop()??null}moveFocusOut(e,t){let n=typeof this.returnFocus==`function`?this.returnFocus():this.returnFocus;n?.isConnected&&Se(n)||e?.isConnected&&Se(e)||this.focusContainer(t)}focusContainer(e){let t=this.ownerDocument;if(e?.isConnected){for(let n=e;n&&n!==t.body;n=n.parentElement)if(n.hasAttribute(`tabindex`)&&Se(n))return;e!==t.body&&e!==t.documentElement&&(e.setAttribute(`tabindex`,`-1`),e.addEventListener(`blur`,()=>{e.getAttribute(`tabindex`)===`-1`&&e.removeAttribute(`tabindex`)},{once:!0}),Se(e,{preventScroll:!0}))}}updated(){E&&this.collapsible&&!this.hasHeading&&P(e.tagName,`collapsible needs a heading (the toggle lives in the title): set heading or fill the heading slot.`)}hookStates(){return{state:this.collapsible&&this.hasHeading?this.collapsed?`closed`:`open`:void 0,size:this.size,variant:this.variant,color:this.color}}render(){let e=this.locale.t,t=this.hasHeading,n=this.collapsible&&t,r=!this.collapsed,i=this.slots.test(`[default]`),a=!this.noAnimation,o=this.borderRadius,s=this.alertRole??(this.color===`danger`||this.color===`warning`?`alert`:`status`);return m`<div
part="root"
class=${v({alert:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,withIcon:!this.hideIcon,withTitle:t,banner:this.banner,withAnimation:a,[`animation-${this.animationName}`]:a&&ii.includes(this.animationName),withElevation:this.elevation,rounded:!this.square,expanded:r,collapsible:n})}
style=${y({borderRadius:o==null||o===``?void 0:/^\d+(\.\d+)?$/.test(String(o))?`${o}px`:String(o)})}
role=${s}
aria-label=${this.aria.label??p}
>
${this.hideIcon?p:m`<span
part="icon"
class="icon"
role="img"
aria-label=${this.iconLabel??e(`alert.icon.${this.color}`)}
><slot name="icon">${ri[this.color]??ri.info}</slot></span
>`}
<div class="content">
${t?m`<div class="title" part="title">
<slot name="heading">${this.heading}</slot>
${n?m`<button
type="button"
part="trigger"
class="expandButton"
aria-label=${r?this.collapseLabel??e(`alert.collapse`):this.expandLabel??e(`alert.expand`)}
aria-expanded=${String(r)}
aria-controls=${r&&i?`message`:p}
@click=${this.handleExpand}
>
${r?On:bn}
</button>`:p}
</div>`:p}
${i&&(!n||r)?m`<div id="message" class="message" part="description">
<slot></slot>
</div>`:p}
</div>
${this.slots.test(`action`)?m`<div class="action" part="action">
<slot name="action"></slot>
</div>`:p}
${this.closable?m`<button
type="button"
part="close-button"
class="closeButton"
aria-label=${this.closeLabel??e(`alert.close`)}
@click=${this.handleClose}
>
<slot name="close-icon">${un}</slot>
</button>`:p}
</div>`}},L([g({reflect:!0})],R.prototype,`color`,void 0),L([g({reflect:!0})],R.prototype,`variant`,void 0),L([g({reflect:!0})],R.prototype,`size`,void 0),L([g()],R.prototype,`heading`,void 0),L([g({type:Boolean,attribute:`hide-icon`})],R.prototype,`hideIcon`,void 0),L([g({type:Boolean,reflect:!0})],R.prototype,`closable`,void 0),L([g({type:Boolean,attribute:`no-animation`})],R.prototype,`noAnimation`,void 0),L([g({attribute:`animation-name`})],R.prototype,`animationName`,void 0),L([g({type:Boolean,reflect:!0})],R.prototype,`banner`,void 0),L([g({type:Boolean,reflect:!0})],R.prototype,`elevation`,void 0),L([g({type:Boolean,reflect:!0})],R.prototype,`square`,void 0),L([g({attribute:`border-radius`})],R.prototype,`borderRadius`,void 0),L([g({type:Boolean,reflect:!0})],R.prototype,`collapsible`,void 0),L([g({type:Boolean,reflect:!0})],R.prototype,`collapsed`,void 0),L([g({attribute:`close-label`})],R.prototype,`closeLabel`,void 0),L([g({attribute:`expand-label`})],R.prototype,`expandLabel`,void 0),L([g({attribute:`collapse-label`})],R.prototype,`collapseLabel`,void 0),L([g({attribute:`icon-label`})],R.prototype,`iconLabel`,void 0),L([g({attribute:`alert-role`})],R.prototype,`alertRole`,void 0),L([g({attribute:!1})],R.prototype,`returnFocus`,void 0)})))()}var oi,si,ci,li,z;function ui(){return(ui=e((()=>{M(),C(),gn(),I(),k(),O(),T(),An(),Jn(),Vr(),Br(),qr(),Kr(),u(),d(),h(),c(),oi=[`expanded`,`compact`,`floating`],si=`(max-width: 768px)`,ci=()=>typeof window<`u`&&typeof window.matchMedia==`function`?window.matchMedia(si):null,li={iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,control:!0},z=class e extends N{constructor(...e){super(...e),this.brand=``,this.sidebarMode=`expanded`,this.noSkipLink=!1,this.collapsed=!1,this.mobile=!1,this.drawerOpen=!1,this.hovered=!1,this.keyboardFocus=!1,this.locale=new w(this),this.slots=new D(this),this.modal=new Rr(this),this.focusScope=new Gr(this,()=>({trapped:!0,loop:!0,restoreFocus:!1})),this.layer=new Lr(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.headerToggle],onFocusOutside:e=>e.preventDefault(),onDismiss:()=>this.requestDrawer(!1)})),this.query=null,this.drawerActive=!1,this.handleMediaChange=()=>this.syncMobile()}static{this.tagName=`minerva-app-shell`}static{this.styles=[j,zr,b`
:host{
display: block;
}
`,F(ar),F(Gn)]}openNavigation(){this.mobile&&(this.drawerOpen=!0)}closeNavigation(){this.drawerOpen=!1}expandNavigation(){this.sidebarMode=`expanded`}focusMain(){this.main?.focus()}connectedCallback(){super.connectedCallback(),this.query=ci(),this.query?.addEventListener(`change`,this.handleMediaChange),this.syncMobile()}disconnectedCallback(){super.disconnectedCallback(),this.query?.removeEventListener(`change`,this.handleMediaChange),this.query=null,this.deactivateDrawer()}syncMobile(){let e=!!this.query?.matches;e!==this.mobile&&(this.mobile=e,this.hovered=!1,this.keyboardFocus=!1,this.drawerOpen=!1)}get mode(){return oi.includes(this.sidebarMode)?this.sidebarMode:`expanded`}setMode(e){e!==this.mode&&this.emit(`minerva-sidebar-mode-change`,{mode:e},{cancelable:!0})&&(this.sidebarMode=e)}requestDrawer(e){e!==this.drawerOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.drawerOpen=e)}willUpdate(e){e.has(`navigationKey`)&&e.get(`navigationKey`)!==void 0&&(this.drawerOpen=!1),this.mobile||(this.drawerOpen=!1),this.collapsed=!this.mobile&&this.mode!==`expanded`&&(this.mode!==`floating`||!this.hovered&&!this.keyboardFocus)}updated(t){let n=this.mobile&&this.drawerOpen;n&&!this.drawerActive&&this.drawer?(this.drawerActive=!0,kr(this.overlay),kr(this.drawer),this.modal.activate(this),this.layer.activate(this.drawer),this.focusScope.activate(this.drawer)):!n&&this.drawerActive&&(this.deactivateDrawer(),this.headerToggle?.focus()),E&&t.has(`sidebarMode`)&&!oi.includes(this.sidebarMode)&&P(e.tagName,`unknown sidebar-mode="${this.sidebarMode}" (expected ${oi.join(`, `)}); using "expanded".`),E&&!this.slots.test(`navigation`)&&P(e.tagName,`put the navigation in the "navigation" slot (e.g. <nav slot="navigation">).`)}hookStates(){return{state:this.mobile&&this.drawerOpen?`open`:`closed`}}deactivateDrawer(){this.drawerActive&&(this.drawerActive=!1,this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate(),S(this.drawer),S(this.overlay))}label(e,t){return e??this.locale.t(`appShell.${t}`)}handleSkip(e){e.preventDefault(),this.focusMain()}handleSidebarFocusIn(e){let t=e.composedPath()[0],n;try{n=!!t?.matches?.(`:focus-visible`)}catch{n=!1}n&&(this.keyboardFocus=!0)}handleSidebarFocusOut(e){let t=e.relatedTarget;(!t||!this.sidebar||!l(this.sidebar,t))&&(this.keyboardFocus=!1)}renderHeaderToggle(){return this.mobile?m`<button
type="button"
class=${v(li)}
aria-label=${this.label(this.openNavigationLabel,`openNavigation`)}
aria-haspopup="dialog"
aria-expanded=${String(this.drawerOpen)}
aria-controls=${this.drawerOpen?`drawer`:p}
@click=${()=>this.requestDrawer(!this.drawerOpen)}
>
${jt}
</button>`:this.renderCollapseControl()}renderCollapseControl(){let e=this.mode!==`expanded`;return m`<button
type="button"
class=${v(li)}
aria-label=${e?this.label(this.expandLabel,`expand`):this.label(this.collapseLabel,`collapse`)}
aria-controls="sidebar"
aria-expanded=${String(!this.collapsed)}
@click=${()=>this.setMode(e?`expanded`:`compact`)}
>
${e?jt:er}
</button>`}renderSidebar(){let e=this.mode===`floating`,t=this.label(this.navigationLabel,`navigation`);return m`<aside
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
${this.slots.test(`brand-icon`)?m`<span class="brandIcon" aria-hidden="true"
><slot name="brand-icon"></slot
></span>`:p}
<span class="brandLabel"><slot name="brand">${this.brand}</slot></span>
</div>
<div class="navigation"><slot name="navigation"></slot></div>
<div class="sidebarActions">
${this.renderCollapseControl()}
<button
type="button"
class=${v(li)}
aria-pressed=${String(e)}
aria-label=${e?this.label(this.disableFloatingLabel,`disableFloating`):this.label(this.enableFloatingLabel,`enableFloating`)}
@click=${()=>this.setMode(e?`compact`:`floating`)}
>
${e?Bt:$t}
</button>
</div>
</aside>`}renderDrawer(){let e=this.label(this.navigationLabel,`navigation`);return m`<div
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
${un}
</button>
</div>`}render(){let e=this.skipLink||this.locale.t(`appShell.skipToContent`);return m`<div
class="shell"
part="root"
data-sidebar-mode=${this.mode}
data-sidebar-expanded=${this.collapsed?p:`true`}
>
${this.noSkipLink?p:m`<a
class="skipLink"
part="skip-link"
href="#main"
@click=${this.handleSkip}
>${e}</a
>`}
${this.mobile?p:this.renderSidebar()}
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
${this.mobile&&this.drawerOpen?this.renderDrawer():p}`}},L([g()],z.prototype,`brand`,void 0),L([g({attribute:`sidebar-mode`,reflect:!0})],z.prototype,`sidebarMode`,void 0),L([g({attribute:`navigation-label`})],z.prototype,`navigationLabel`,void 0),L([g({attribute:`navigation-key`})],z.prototype,`navigationKey`,void 0),L([g({attribute:`skip-link`})],z.prototype,`skipLink`,void 0),L([g({type:Boolean,attribute:`no-skip-link`})],z.prototype,`noSkipLink`,void 0),L([g({attribute:`expand-label`})],z.prototype,`expandLabel`,void 0),L([g({attribute:`collapse-label`})],z.prototype,`collapseLabel`,void 0),L([g({attribute:`enable-floating-label`})],z.prototype,`enableFloatingLabel`,void 0),L([g({attribute:`disable-floating-label`})],z.prototype,`disableFloatingLabel`,void 0),L([g({attribute:`open-navigation-label`})],z.prototype,`openNavigationLabel`,void 0),L([g({attribute:`close-navigation-label`})],z.prototype,`closeNavigationLabel`,void 0),L([g({type:Boolean,reflect:!0})],z.prototype,`collapsed`,void 0),L([g({type:Boolean,reflect:!0})],z.prototype,`mobile`,void 0),L([f()],z.prototype,`drawerOpen`,void 0),L([f()],z.prototype,`hovered`,void 0),L([f()],z.prototype,`keyboardFocus`,void 0),L([_(`.header button`)],z.prototype,`headerToggle`,void 0),L([_(`.drawer`)],z.prototype,`drawer`,void 0),L([_(`.overlay`)],z.prototype,`overlay`,void 0),L([_(`main`)],z.prototype,`main`,void 0),L([_(`aside`)],z.prototype,`sidebar`,void 0)})))()}var di,B;function fi(){return(fi=e((()=>{A(),M(),C(),I(),Kn(),k(),O(),T(),qr(),Cr(),In(),Un(),u(),d(),h(),Qe(),c(),it(),di={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},B=class e extends zn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.label=``,this.placeholder=``,this.mode=`basic`,this.size=`medium`,this.variant=`outline`,this.invalid=!1,this.readOnly=!1,this.loading=!1,this.placement=`bottom`,this.offset={x:0,y:4},this.noAnimation=!1,this.autoHighlight=!1,this.noFillOnSelect=!1,this.groupMode=`first`,this.focusedIndex=-1,this.hoveredIndex=-1,this.locale=new w(this),this.aria=new x(this,()=>this.labels),this.slots=new D(this),this.floating=new Ur(this,()=>{let e=this.placement===`top`||this.placement===`bottom`,t=this.offset??{x:0,y:4};return{anchor:()=>this.container,floating:()=>this.popup,placement:di[this.placement]??`bottom-start`,offset:{mainAxis:e?t.y:t.x,crossAxis:e?t.x:t.y},matchAnchorWidth:`min`,branches:()=>[this.container],onEscapeKeyDown:e=>{(this.composing||e.isComposing)&&e.preventDefault()},onDismiss:()=>this.close(),returnFocusOnEscape:()=>this.input,onPosition:()=>this.syncHookStates()}}),this.composing=!1,this.dirty=!1}static{this.tagName=`minerva-autocomplete`}static{this.shadowRootOptions={...zn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,zr,F(nr),F(_r),b`
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
`]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}get blocked(){return this.isDisabled||this.readOnly}get shown(){return this.open&&!this.blocked}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.focusedIndex=-1}restoreFormState(e){typeof e==`string`&&(this.value=e)}get processedOptions(){let e=this.value,t=e.toLowerCase(),n=(this.options??[]).filter(n=>this.filterOption?this.filterOption(e,n):n.label.toLowerCase().includes(t));return this.sortOption?[...n].sort(this.sortOption):n}groupOptions(e){let t=this.groupBy;if(!t)return null;if(this.groupMode===`adjacent`){let n=[];for(let r of e){let e=t(r),i=n[n.length-1];i&&i[0]===e?i[1].push(r):n.push([e,[r]])}return n}let n=new Map;for(let r of e){let e=t(r),i=n.get(e);i?i.push(r):n.set(e,[r])}return Array.from(n.entries())}get navigableOptions(){let e=this.processedOptions,t=this.groupOptions(e);return t?t.flatMap(([,e])=>e):e}activeIndex(e){return this.focusedIndex>=0?this.focusedIndex:this.autoHighlight&&this.shown?e.findIndex(e=>!e.disabled):-1}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(){this.blocked||this.requestOpen(!0)}close(){this.requestOpen(!1),this.focusedIndex=-1}setText(e,t){e!==this.value&&(this.value=e,this.emit(`minerva-input`,{value:e}),t&&this.emit(`minerva-change`,{value:e}))}moveFocus(e){let t=this.navigableOptions,n=t.length;if(n===0)return;let r=this.activeIndex(t),i=r>=0?r:e===1?-1:n;for(let r=0;r<n;r+=1)if(i=(i+e+n)%n,!t[i].disabled){this.focusedIndex=i;return}}selectOption(e){e.disabled||(this.noFillOnSelect||this.setText(e.label,!0),this.close(),this.emit(`minerva-select`,{value:e.value,option:e}))}handleKeyDown(e){if(!(this.blocked||this.composing||e.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:case`ArrowUp`:e.preventDefault(),this.open||this.openDropdown(),this.moveFocus(e.key===`ArrowDown`?1:-1);break;case`Enter`:{let t=this.navigableOptions,n=this.shown?t[this.activeIndex(t)]:void 0,r=this.value.trim();n?(e.preventDefault(),this.selectOption(n)):r&&(e.preventDefault(),this.emit(`minerva-submit`,{value:r}),this.close());break}case`Escape`:!this.shown&&!this.floating.isOpen&&this.value!==``&&(e.preventDefault(),this.setText(``,!0),this.focusedIndex=-1)}}handleInput(){this.setText(this.input.value,!1),this.focusedIndex=-1,this.openDropdown()}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleBlur(e){let t=e.relatedTarget;t&&(this.popup?.contains(t)||this.container?.contains(t))||this.close()}handleOptionClick(e){e.disabled||this.composing||(this.selectOption(e),this.input?.focus())}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),this.open&&this.blocked&&(this.open=!1,this.focusedIndex=-1)}hookStates(){let e=this.shown&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?Te(e):{side:void 0,align:void 0};return{state:this.shown?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,loading:this.loading,side:t,align:n,placement:e}}updated(t){if(super.updated(t),this.floating.sync(this.shown),t.has(`focusedIndex`)&&this.focusedIndex>=0&&this.shadowRoot?.getElementById(`option-${this.focusedIndex}`)?.scrollIntoView?.({block:`nearest`}),E&&t.has(`options`)){let t=new Set;for(let n of this.options??[]){if(t.has(n.value)){P(e.tagName,`several options have the value "${n.value}"; option values must be unique.`);break}t.add(n.value)}}}renderOptionContent(e){return this.mode===`custom`&&this.renderOption?this.renderOption(e):m`<div class="basicOption">
${e.icon?m`<span class="icon">${e.icon}</span>`:p}
<div class="content">
<div class="label">${e.label}</div>
${e.description?m`<div class="description">${e.description}</div>`:p}
</div>
</div>`}renderOptionItem(e,t,n){let r=n===t,i=this.hoveredIndex===t||r,a=!!e.disabled;return m`<div
part=${jn(`item`,{highlighted:i,disabled:a})}
class=${v({optionItem:!0,disabled:a,highlight:!!e.highlight,active:i})}
style=${e.style?y(e.style):p}
role="option"
tabindex="-1"
id=${`option-${t}`}
aria-selected=${String(r)}
aria-disabled=${e.disabled?`true`:p}
@mousedown=${e=>e.preventDefault()}
@click=${()=>this.handleOptionClick(e)}
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),t.stopPropagation(),this.handleOptionClick(e))}}
@mouseenter=${()=>this.hoveredIndex=t}
@mouseleave=${()=>this.hoveredIndex=-1}
>
${this.renderOptionContent(e)}
</div>`}renderList(){let{t:e}=this.locale;if(this.loading)return m`<div role="presentation" class="loading" part="loading">
<span role="progressbar" aria-label=${e(`common.loading`)}
>${rn}</span
>
</div>`;let t=this.processedOptions;if(t.length===0)return m`<div role="presentation" class="empty" part="empty">
${this.renderEmpty?.()||m`${Lt}<span>${e(`empty.description`)}</span>`}
</div>`;let n=this.groupOptions(t),r=n?n.flatMap(([,e])=>e):t,i=this.activeIndex(r);return n?n.map(([e,t])=>{let n=t.map(e=>this.renderOptionItem(e,r.indexOf(e),i));return e===``?n:m`<div class="optionGroup" role="group" aria-label=${e}>
<div class="groupLabel" part="group-label" aria-hidden="true">
${e}
</div>
${n}
</div>`}):t.map((e,t)=>this.renderOptionItem(e,t,i))}render(){let e=this.shown,t=this.isDisabled,n=e?this.navigableOptions:[],r=e?this.activeIndex(n):-1,i=e&&r>=0&&r<n.length?`option-${r}`:void 0,a=this.label?void 0:this.aria.label;return m`<div
part="root"
class="autoComplete"
@compositionstart=${()=>this.composing=!0}
@compositionend=${()=>this.composing=!1}
>
${this.label?m`<label for="input" class="label" part="label"
>${this.label}</label
>`:p}
<div
part="field"
class=${v({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?m`<span class="addon start"><slot name="prefix"></slot></span>`:p}
<input
id="input"
part="input"
class="field"
type="text"
role="combobox"
aria-autocomplete="list"
aria-expanded=${String(e)}
aria-controls=${e?`listbox`:p}
aria-activedescendant=${i??p}
aria-label=${a??p}
aria-description=${this.aria.description??p}
aria-required=${this.required?`true`:p}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:p}
data-minerva-escape-consumer=${!e&&this.value!==``?``:p}
autocomplete="off"
.value=${nt(this.value)}
placeholder=${this.placeholder||p}
?disabled=${t}
?readonly=${this.readOnly}
@input=${this.handleInput}
@change=${this.handleChange}
@focus=${()=>this.openDropdown()}
@click=${()=>{this.open||this.openDropdown()}}
@blur=${this.handleBlur}
@keydown=${this.handleKeyDown}
/>
${this.slots.test(`suffix`)?m`<span class="addon end"><slot name="suffix"></slot></span>`:p}
</div>
${e?m`<div class="popup" part="content" popover="manual">
<div
class=${v({dropdown:!0,animated:!this.noAnimation})}
>
<div
class="optionList"
part="list"
role="listbox"
id="listbox"
aria-label=${this.label||a||p}
aria-busy=${this.loading?`true`:p}
>
${this.renderList()}
</div>
</div>
</div>`:p}
</div>`}},L([g({attribute:!1})],B.prototype,`value`,void 0),L([g({attribute:`value`})],B.prototype,`defaultValue`,void 0),L([g({attribute:!1})],B.prototype,`options`,void 0),L([g({type:Boolean,reflect:!0})],B.prototype,`open`,void 0),L([g()],B.prototype,`label`,void 0),L([g()],B.prototype,`placeholder`,void 0),L([g({reflect:!0})],B.prototype,`mode`,void 0),L([g({reflect:!0})],B.prototype,`size`,void 0),L([g({reflect:!0})],B.prototype,`variant`,void 0),L([g({type:Boolean,reflect:!0})],B.prototype,`invalid`,void 0),L([g({type:Boolean,reflect:!0,attribute:`readonly`})],B.prototype,`readOnly`,void 0),L([g({type:Boolean,reflect:!0})],B.prototype,`loading`,void 0),L([g({reflect:!0})],B.prototype,`placement`,void 0),L([g({attribute:!1})],B.prototype,`offset`,void 0),L([g({type:Boolean,attribute:`no-animation`})],B.prototype,`noAnimation`,void 0),L([g({type:Boolean,attribute:`auto-highlight`})],B.prototype,`autoHighlight`,void 0),L([g({type:Boolean,attribute:`no-fill-on-select`})],B.prototype,`noFillOnSelect`,void 0),L([g({attribute:`group-mode`})],B.prototype,`groupMode`,void 0),L([g({attribute:!1})],B.prototype,`filterOption`,void 0),L([g({attribute:!1})],B.prototype,`sortOption`,void 0),L([g({attribute:!1})],B.prototype,`groupBy`,void 0),L([g({attribute:!1})],B.prototype,`renderOption`,void 0),L([g({attribute:!1})],B.prototype,`renderEmpty`,void 0),L([f()],B.prototype,`focusedIndex`,void 0),L([f()],B.prototype,`hoveredIndex`,void 0),L([_(`input`)],B.prototype,`input`,void 0),L([_(`.autoComplete`)],B.prototype,`container`,void 0),L([_(`.popup`)],B.prototype,`popup`,void 0)})))()}function pi(e){let t=e?.trim()??``;return t?hi.test(t[0])?t[0]:t.split(/\s+/).slice(0,2).map(e=>e[0].toUpperCase()).join(``):``}var mi,hi,gi,_i,vi;function yi(){return(yi=e((()=>{A(),M(),I(),k(),O(),T(),dr(),Xn(),u(),d(),h(),Qe(),mi=[`xsmall`,`small`,`medium`,`large`,`xlarge`,`xxlarge`],hi=/[㐀-鿿豈-﫿]/,gi={fromAttribute:e=>e&&/^\d+(\.\d+)?$/.test(e)?Number(e):e??`medium`,toAttribute:e=>String(e)},_i=class e extends N{constructor(...e){super(...e),this.name=``,this.shape=`circle`,this.size=`medium`,this.stacked=!1,this.locale=new w(this),this.aria=new x(this),this.slots=new D(this)}static{this.tagName=`minerva-avatar`}static{this.styles=[j,b`
:host{
display: inline-block;
flex-shrink: 0;
vertical-align: middle;
line-height: 0;
}
.avatarText{
line-height: 1;
}
`,F(Nn)]}hookStates(){return{size:typeof this.size==`number`?void 0:this.size,shape:this.shape}}updated(t){E&&t.has(`size`)&&typeof this.size!=`number`&&!mi.includes(this.size)&&P(e.tagName,`unknown size "${this.size}": use a preset (${mi.join(`, `)}) or a number of pixels.`)}render(){let e=!!this.src&&this.failedSrc!==this.src,t=this.aria.label??(this.name||this.locale.t(`avatar.default`)),n=typeof this.size==`number`,r=v({avatar:!0,[this.shape]:!0,[String(this.size)]:!n,stacked:this.stacked}),i=y(n?{"--avatar-size":`${this.size}px`,width:`${this.size}px`,height:`${this.size}px`}:{});if(e)return m`<span part="root" class=${r} style=${i}
><img
part="image"
class="avatarImg"
alt=${this.alt??t}
src=${this.src}
draggable="false"
@error=${()=>this.failedSrc=this.src}
/></span>`;let a=pi(this.name),o=this.slots.test(`fallback`)?m`<slot name="fallback"></slot>`:a||m`<slot></slot>`;return m`<span
part="root"
role="img"
aria-label=${t}
class=${r}
style=${i}
><span part="fallback" class="avatarText" aria-hidden="true"
>${o}</span
></span
>`}},L([g()],_i.prototype,`src`,void 0),L([g()],_i.prototype,`name`,void 0),L([g()],_i.prototype,`alt`,void 0),L([g({reflect:!0})],_i.prototype,`shape`,void 0),L([g({reflect:!0,converter:gi})],_i.prototype,`size`,void 0),L([g({type:Boolean,reflect:!0})],_i.prototype,`stacked`,void 0),L([f()],_i.prototype,`failedSrc`,void 0),vi=class e extends N{constructor(...e){super(...e),this.locale=new w(this),this.aria=new x(this),this.slots=new D(this)}static{this.tagName=`minerva-avatar-group`}static{this.shadowRootOptions={...N.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[j,b`
:host{
display: flex;
}
.avatarGroup{
flex: 1 1 auto;
min-width: 0;
}
`,F(hr)]}visibleAvatars(){let e=Array.from(this.children);return this.max===void 0||this.max===null?e:e.slice(0,Math.max(0,this.max))}updated(t){let n=this.visibleAvatars();Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,t)=>{let r=n[t];r&&typeof e.assign==`function`&&e.assign(r)}),E&&t.has(`max`)&&this.max!==void 0&&this.max!==null&&!(Number.isInteger(this.max)&&this.max>=0)&&P(e.tagName,`max must be a non-negative integer (got ${this.max}).`)}render(){this.slots;let e=this.children.length,t=this.visibleAvatars(),n=(Number(this.count)||0)+e-t.length,r=this.aria.label??(n>0?this.locale.t(`avatar.groupWithMore`,{count:n}):this.locale.t(`avatar.group`));return m`<div
part="root"
role="group"
class="avatarGroup"
aria-label=${r}
>
${t.map(()=>m`<div part="item" class="avatarGroupItem">
<slot data-item></slot>
</div>`)}
${n>0?m`<div part="count" class="count" aria-hidden="true">
+${n}
</div>`:p}
</div>`}},L([g({type:Number})],vi.prototype,`count`,void 0),L([g({type:Number})],vi.prototype,`max`,void 0)})))()}var bi;function xi(){return(xi=e((()=>{A(),M(),I(),k(),O(),T(),cr(),u(),d(),h(),Qe(),bi=class e extends N{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.position=`top-right`,this.dot=!1,this.badgeRole=`status`,this.locale=new w(this),this.aria=new x(this),this.slots=new D(this)}static{this.tagName=`minerva-badge`}static{this.styles=[j,b`
:host{
display: inline-flex;
vertical-align: middle;
}
`,F(br)]}hasElementChildren(){return Array.from(this.children).some(e=>!e.hasAttribute(`slot`)||e.getAttribute(`slot`)===``)}hookStates(){return{size:this.size,variant:this.variant,color:this.color}}updated(){E&&this.dot&&!this.aria.label&&![`presentation`,`none`].includes(this.badgeRole)&&P(e.tagName,`a dot badge has no text: set aria-label (e.g. "New messages") or badge-role="presentation".`)}render(){let e=this.slots.test(`[default]`),t=e&&!this.hasElementChildren(),n=this.content!==void 0&&this.content!==null||this.slots.test(`content`),r=!e||t&&!n,i=p;this.dot||(n?i=m`<slot name="content">${this.content}</slot>`:t?i=m`<slot></slot>`:e&&(i=this.locale.t(`badge.default`)));let a=m`<span
part=${r?`root`:`badge`}
class=${v({badge:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,standalone:r,[this.position]:!r,dot:this.dot})}
role=${this.badgeRole||p}
aria-label=${this.aria.label??p}
style=${y({borderRadius:this.borderRadius,borderWidth:this.borderWidth})}
>${this.slots.test(`icon`)?m`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:p}${i}</span
>`;return r?a:m`<div part="root" class="badgeWrapper">
<div class="content"><slot></slot></div>
${a}
</div>`}},L([g({reflect:!0})],bi.prototype,`color`,void 0),L([g({reflect:!0})],bi.prototype,`variant`,void 0),L([g({reflect:!0})],bi.prototype,`size`,void 0),L([g()],bi.prototype,`content`,void 0),L([g({reflect:!0})],bi.prototype,`position`,void 0),L([g({type:Boolean,reflect:!0})],bi.prototype,`dot`,void 0),L([g({attribute:`border-radius`})],bi.prototype,`borderRadius`,void 0),L([g({attribute:`border-width`})],bi.prototype,`borderWidth`,void 0),L([g({attribute:`badge-role`})],bi.prototype,`badgeRole`,void 0)})))()}function Si(e){return e.replace(/[;{}<>]/g,``)}var Ci;function wi(){return(wi=e((()=>{de(),Ci={fromAttribute:e=>{if(e===null)return;let t=e.trim();return/^-?\d+(\.\d+)?$/.test(t)?Number(t):t},toAttribute:e=>e===void 0?null:String(e)}})))()}var Ti,Ei,Di,V,H;function Oi(){return(Oi=e((()=>{M(),k(),wi(),u(),d(),Ti={bg:`var(--surface-color)`,"bg.subtle":`var(--surface-subtle-color)`,"bg.muted":`var(--surface-muted-color)`,"bg.emphasis":`var(--surface-muted-color)`,"bg.canvas":`var(--canvas-color)`,"bg.elevated":`var(--surface-elevated-color)`},Ei=[`none`,`sm`,`md`,`lg`,`xl`,`2xl`,`full`],Di=[`sm`,`md`,`lg`,`xl`],V={converter:Ci},H=class e extends N{static{this.tagName=`minerva-box`}static{this.styles=[j,b`
:host{
display: block;
}
`]}declarations(){let e=[],t=(t,...n)=>{if(t!==void 0&&t!==``)for(let r of n)e.push([r,te(t)])},n=(t,n)=>{t!==void 0&&t!==``&&e.push([n,ie(t)])};return t(this.p,`padding`),t(this.px,`padding-left`,`padding-right`),t(this.py,`padding-top`,`padding-bottom`),t(this.pt,`padding-top`),t(this.pr,`padding-right`),t(this.pb,`padding-bottom`),t(this.pl,`padding-left`),t(this.m,`margin`),t(this.mx,`margin-left`,`margin-right`),t(this.my,`margin-top`,`margin-bottom`),t(this.mt,`margin-top`),t(this.mr,`margin-right`),t(this.mb,`margin-bottom`),t(this.ml,`margin-left`),n(this.w,`width`),n(this.h,`height`),n(this.minW,`min-width`),n(this.minH,`min-height`),n(this.maxW,`max-width`),n(this.maxH,`max-height`),this.bg&&e.push([`background`,Ti[this.bg]??this.bg]),this.rounded&&e.push([`border-radius`,Ei.includes(this.rounded)?`var(--radius-${this.rounded})`:this.rounded]),this.boxShadow&&e.push([`box-shadow`,Di.includes(this.boxShadow)?`var(--shadow-${this.boxShadow})`:this.boxShadow]),this.border&&e.push([`border`,this.border]),e}updated(){E&&this.bg?.startsWith(`bg.`)&&!(this.bg in Ti)&&P(e.tagName,`unknown surface alias bg="${this.bg}" (expected one of ${Object.keys(Ti).join(`, `)}).`)}render(){let e=this.declarations().map(([e,t])=>`${e}:${Si(t)};`).join(``);return m`<style>
:host{${e}}
</style>
<slot></slot>`}},L([g(V)],H.prototype,`p`,void 0),L([g(V)],H.prototype,`px`,void 0),L([g(V)],H.prototype,`py`,void 0),L([g(V)],H.prototype,`pt`,void 0),L([g(V)],H.prototype,`pr`,void 0),L([g(V)],H.prototype,`pb`,void 0),L([g(V)],H.prototype,`pl`,void 0),L([g(V)],H.prototype,`m`,void 0),L([g(V)],H.prototype,`mx`,void 0),L([g(V)],H.prototype,`my`,void 0),L([g(V)],H.prototype,`mt`,void 0),L([g(V)],H.prototype,`mr`,void 0),L([g(V)],H.prototype,`mb`,void 0),L([g(V)],H.prototype,`ml`,void 0),L([g(V)],H.prototype,`w`,void 0),L([g(V)],H.prototype,`h`,void 0),L([g({converter:Ci,attribute:`min-w`})],H.prototype,`minW`,void 0),L([g({converter:Ci,attribute:`min-h`})],H.prototype,`minH`,void 0),L([g({converter:Ci,attribute:`max-w`})],H.prototype,`maxW`,void 0),L([g({converter:Ci,attribute:`max-h`})],H.prototype,`maxH`,void 0),L([g()],H.prototype,`bg`,void 0),L([g()],H.prototype,`rounded`,void 0),L([g({attribute:`box-shadow`})],H.prototype,`boxShadow`,void 0),L([g()],H.prototype,`border`,void 0)})))()}var ki,U;function Ai(){return(Ai=e((()=>{A(),M(),Dr(),k(),O(),T(),Vn(),u(),d(),h(),Qe(),ki=e=>`borderRadius${e.charAt(0).toUpperCase()}${e.slice(1)}`,U=class e extends N{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.disabled=!1,this.loading=!1,this.fullWidth=!1,this.active=!1,this.type=`button`,this.internals=Nr(this),this.aria=new x(this),this.slots=new D(this),this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-button`}static{this.formAssociated=!0}static{this.styles=[j,b`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
:host([full-width]){
display: flex;
width: 100%;
}
`,F(At)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0)}hookStates(){return{state:this.active?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){E&&this.shape===`circle`&&!this.aria.label&&(this.textContent?.trim()||P(e.tagName,`shape="circle" buttons usually only contain an icon: set aria-label to give them an accessible name.`))}render(){let e=this.borderRadius,t=typeof e==`number`||typeof e==`string`&&/^\d+(\.\d+)?$/.test(e),n=this.loading&&this.slots.test(`loading`),r=this.loading&&!n,i=m`<span
class="loadingSpinner"
part="spinner"
aria-hidden="true"
></span>`;return m`<button
part="root"
type="button"
class=${v({customButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape??``]:!!this.shape,[ki(String(e??``))]:!!e&&!t,fullWidth:this.fullWidth,active:this.active,loading:this.loading})}
style=${y(t?{borderRadius:`${Number(e)}px`}:{})}
?disabled=${this.disabled}
aria-label=${this.aria.label??p}
aria-description=${this.aria.description??p}
aria-pressed=${this.aria.attr(`aria-pressed`)??p}
aria-expanded=${this.aria.attr(`aria-expanded`)??p}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??p}
aria-busy=${this.loading?`true`:p}
aria-disabled=${this.loading?`true`:p}
@click=${this.handleClick}
>
${n?m`${i}<span class="label" part="label"
><slot name="loading"></slot
></span>`:m`${this.loading?i:p}
${this.slots.test(`start`)?m`<span
class=${v({icon:!0,hidden:r})}
part="start-icon"
><slot name="start"></slot
></span>`:p}
<span class=${v({label:!0,hidden:r})} part="label"
><slot></slot
></span>
${this.slots.test(`end`)?m`<span
class=${v({icon:!0,hidden:r})}
part="end-icon"
><slot name="end"></slot
></span>`:p}`}
</button>`}},L([g({reflect:!0})],U.prototype,`color`,void 0),L([g({reflect:!0})],U.prototype,`variant`,void 0),L([g({reflect:!0})],U.prototype,`size`,void 0),L([g({reflect:!0})],U.prototype,`shape`,void 0),L([g({attribute:`border-radius`})],U.prototype,`borderRadius`,void 0),L([g({type:Boolean,reflect:!0})],U.prototype,`disabled`,void 0),L([g({type:Boolean,reflect:!0})],U.prototype,`loading`,void 0),L([g({type:Boolean,reflect:!0,attribute:`full-width`})],U.prototype,`fullWidth`,void 0),L([g({type:Boolean,reflect:!0})],U.prototype,`active`,void 0),L([g({reflect:!0})],U.prototype,`type`,void 0),L([_(`button`)],U.prototype,`button`,void 0)})))()}var ji,Mi,Ni,Pi,Fi,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi;function Gi(){return(Gi=e((()=>{A(),M(),gn(),Dr(),k(),T(),dn(),Dn(),u(),d(),h(),de(),lt(),ji=[`div`,`article`,`section`,`a`,`button`],Mi=[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`],Ni=[`none`,`small`,`medium`,`large`],Pi=`minerva-card-header, minerva-card-content, minerva-card-footer, minerva-card-title, minerva-card-description`,Fi=e=>e&&Ni.includes(e)?`pad-${e}`:``,Ii=e=>{let t=e.parentElement??e.getRootNode().host;return!!(t?Vt(t,`minerva-card`):null)?.hasAttribute(`padding`)},Li=class e extends N{constructor(...e){super(...e),this.variant=`default`,this.interactive=!1,this.as=`div`,this.disabled=!1,this.type=`button`,this.internals=Nr(this),this.aria=new x(this),this.syncParts=()=>{for(let e of Array.from(this.querySelectorAll(Pi)))e.requestUpdate()},this.blockDisabledClicks=e=>{this.tag===`button`&&this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-card`}static{this.formAssociated=!0}static{this.styles=[j,b`
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
`,F(kn)]}get tag(){return ji.includes(this.as)?this.as:`div`}focus(e){this.tag===`a`||this.tag===`button`?this.root?.focus(e):super.focus(e)}handleClick(e){if(this.tag!==`button`)return;if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.internals?.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockDisabledClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockDisabledClicks,!0)}hookStates(){return{variant:this.variant,disabled:this.tag===`button`&&this.disabled}}updated(t){t.has(`padding`)&&this.syncParts(),E&&(this.as&&!ji.includes(this.as)&&P(e.tagName,`unsupported as="${this.as}" (expected ${ji.join(`, `)}); rendering a div.`),this.tag===`a`&&!this.href&&P(e.tagName,`as="a" needs an href to be a link (focusable, activatable with Enter).`),this.interactive&&this.tag!==`a`&&this.tag!==`button`&&P(e.tagName,`interactive cards should be links or buttons (as="a" with href, or as="button") so keyboard users can activate them.`))}render(){let t=this.tag,n=v({card:!0,[this.variant]:!0,padded:!!this.padding,[Fi(this.padding)]:!!Fi(this.padding),interactive:this.interactive}),r=this.aria.label??p,i=at`<slot @slotchange=${this.syncParts}></slot>`;if(t===`a`)return at`<a
part="root"
class=${n}
href=${Tn(e.tagName,this.href)??p}
target=${this.target??p}
rel=${ce(this.target,this.rel)??p}
download=${this.download??p}
aria-label=${r}
>${i}</a
>`;if(t===`button`)return at`<button
part="root"
class=${n}
type="button"
?disabled=${this.disabled}
aria-label=${r}
aria-pressed=${this.aria.attr(`aria-pressed`)??p}
aria-expanded=${this.aria.attr(`aria-expanded`)??p}
@click=${this.handleClick}
>
${i}
</button>`;let a=tt(t);return at`<${a} part="root" class=${n}>${i}</${a}>`}},L([g({reflect:!0})],Li.prototype,`variant`,void 0),L([g({reflect:!0})],Li.prototype,`padding`,void 0),L([g({type:Boolean,reflect:!0})],Li.prototype,`interactive`,void 0),L([g({reflect:!0})],Li.prototype,`as`,void 0),L([g()],Li.prototype,`href`,void 0),L([g()],Li.prototype,`target`,void 0),L([g()],Li.prototype,`rel`,void 0),L([g()],Li.prototype,`download`,void 0),L([g({type:Boolean,reflect:!0})],Li.prototype,`disabled`,void 0),L([g()],Li.prototype,`type`,void 0),L([_(`[part=root]`)],Li.prototype,`root`,void 0),Ri=b`
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
`,zi=class extends N{constructor(...e){super(...e),this.sectionClass=``}static{this.styles=[j,Ri]}layoutClasses(){let e=this.previousElementSibling?.localName,t=Fi(this.padding);return{[this.sectionClass]:!0,padded:Ii(this),afterHeader:e===`minerva-card-header`,afterContent:e===`minerva-card-content`,[t]:!!t}}render(){return at`<div part="root" class=${v(this.layoutClasses())}>
<slot></slot>
</div>`}},L([g({reflect:!0})],zi.prototype,`padding`,void 0),Bi=class extends zi{constructor(...e){super(...e),this.sectionClass=`cardHeader`}static{this.tagName=`minerva-card-header`}},Vi=class extends zi{constructor(...e){super(...e),this.sectionClass=`cardContent`}static{this.tagName=`minerva-card-content`}static{this.styles=[j,Ri,b`
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
`]}layoutClasses(){let e=super.layoutClasses();return this.animation&&(e[this.animation]=!0),e}},L([g({reflect:!0})],Vi.prototype,`animation`,void 0),Hi=class extends zi{constructor(...e){super(...e),this.sectionClass=`cardFooter`}static{this.tagName=`minerva-card-footer`}},Ui=class extends N{constructor(...e){super(...e),this.as=`h3`}static{this.tagName=`minerva-card-title`}static{this.styles=[j,b`
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
`]}render(){let e=tt(Mi.includes(this.as)?this.as:`h3`);return at`<${e}
part="root"
class=${v({cardTitle:!0,padded:Ii(this)})}
><slot></slot></${e}>`}},L([g({reflect:!0})],Ui.prototype,`as`,void 0),Wi=class extends N{static{this.tagName=`minerva-card-description`}static{this.styles=[j,b`
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
`]}render(){return at`<p
part="root"
class=${v({cardDescription:!0,padded:Ii(this)})}
>
<slot></slot>
</p>`}}})))()}var Ki,qi,Ji,Yi,Xi,W;function Zi(){return(Zi=e((()=>{A(),M(),C(),I(),Kn(),k(),T(),qr(),Un(),Jt(),u(),d(),h(),c(),de(),it(),Ki=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n]),qi=e=>{let t=new Set;for(let n of e){if(t.has(n.value))return n.value;t.add(n.value);let e=n.children?qi(n.children):void 0;if(e!==void 0)return e}},Ji={fromAttribute(e){let t=e?.trim()??``;if(!t)return[];if(t.startsWith(`[`))try{let e=JSON.parse(t);if(Array.isArray(e))return e.filter(e=>typeof e==`string`||typeof e==`number`)}catch{}return t.split(`,`).map(e=>e.trim())},toAttribute(e){return JSON.stringify(e)}},Yi=`[role="option"]:not([aria-disabled="true"])`,Xi=0,W=class e extends zn{constructor(...e){super(...e),this.options=[],this.value=[],this.defaultValue=[],this.open=!1,this.label=``,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.expandTrigger=`click`,this.showSearch=!1,this.maxLevel=6,this.width=240,this.expandedValues=[],this.searchValue=``,this.idPrefix=`minerva-cascader-${Xi++}`,this.locale=new w(this),this.aria=new x(this,()=>this.labels),this.floating=new Ur(this,()=>({anchor:()=>this.anchor,floating:()=>this.dropdown,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[this.anchor],onDismiss:()=>this.closeDropdown(),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.pendingFocus=null,this.dirty=!1,this.widthApplied=!1}static{this.tagName=`minerva-cascader`}static{this.shadowRootOptions={...zn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,zr,b`
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
`,F(mr)]}get selectedOptions(){return Ne(this.options,this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get displayText(){let e=this.selectedOptions,t=e.map(e=>String(e.label));return this.displayRender?this.displayRender(t,e):t.join(` / `)}getFormValue(){return this.displayText}syncFormState(){super.syncFormState(),this.internals&&!this.isDisabled&&this.internals.setFormValue(this.getFormValue(),JSON.stringify(this.value))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=[...this.defaultValue],this.open=!1}restoreFormState(e){if(typeof e==`string`)try{let t=JSON.parse(e);Array.isArray(t)&&(this.value=t)}catch{}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=!Ki(this.value,this.defaultValue)||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=[...this.defaultValue]),e.has(`open`)&&(this.open?this.expandedValues=[...this.value]:(this.searchValue=``,this.pendingFocus=null)),E&&this.checkDev(e)}checkDev(t){if(t.has(`options`)){let t=qi(this.options);t!==void 0&&P(e.tagName,`duplicate option value "${t}" among siblings: values must be unique within a level.`)}(t.has(`options`)||t.has(`value`))&&this.options.length>0&&this.value.length>0&&Ne(this.options,this.value).length<this.value.length&&P(e.tagName,`value ${JSON.stringify(this.value)} is not a path of the options tree: it is shown partially (or not at all).`)}hookStates(){let e=this.open&&!this.isDisabled,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?Te(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,side:n,align:r,placement:t}}updated(e){if(super.updated(e),e.has(`width`)){let e=this.width,t=e===void 0||e===``?``:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,n=t!==``&&t!==`240px`;(n||this.widthApplied)&&(this.style.width=n?t:``),this.widthApplied=n}this.floating.sync(this.open&&!this.isDisabled);let t=this.pendingFocus;if(t!==null&&this.open){let e=t===-1?this.columns().length-1:t;this.focusColumn(e)&&(this.pendingFocus=null)}}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(e=!1){this.isDisabled||this.readOnly||this.requestOpen(!0)&&(this.expandedValues=[...this.value],this.pendingFocus=e?-1:null)}closeDropdown(e=!1){this.requestOpen(!1)&&(this.searchValue=``,e&&this.input?.focus())}select(e){this.value=e.map(e=>e.value),this.emitChange(e),this.closeDropdown(!0)}emitChange(e){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:[...this.value],selectedOptions:e})}handleActivate(e,t){let n=e[e.length-1];if(n.disabled)return;let r=t>=this.maxLevel-1,i=!!n.children?.length,a=!!this.loadData&&!n.isLeaf&&!n.children;if(!r&&(i||a)){this.expandedValues=e.map(e=>e.value),a&&!n.loading&&this.loadData?.(e);return}this.select(e)}clear(e){e.stopPropagation(),this.value=[],this.searchValue=``,this.emitChange([]),this.emit(`minerva-clear`),this.input?.focus()}get expandedPath(){return Ne(this.options,this.expandedValues)}columns(){let e=this.expandedPath,t=[this.options];for(let n=0;n<e.length&&n<this.maxLevel-1;n+=1){let r=e[n].children;if(!r?.length)break;t.push(r)}return t}columnId(e){return`${this.idPrefix}-column-${e}`}focusColumn(e){let t=this.dropdown?.querySelector(`[data-level="${e}"]`);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(Yi);return n?.focus(),!!n}canExpand(e,t){return t<this.maxLevel-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0)}pathTo(e,t){return[...this.expandedPath.slice(0,t),e]}get searching(){return this.showSearch&&this.searchValue!==``}searchResults(){if(!this.searching)return[];let{searchValue:e,filter:t}=this,n=e.toLowerCase();return Pe(this.options).filter(({path:r})=>t?t(e,r):r.some(e=>String(e.label).toLowerCase().includes(n)))}focusFirstSearchResult(){this.dropdown?.querySelector(`[role="option"]`)?.focus()}handleSelectorClick(){this.isDisabled||this.readOnly||(this.open?this.showSearch||this.closeDropdown():this.openDropdown())}handleInput(e){let t=e.target.value;this.showSearch&&!this.readOnly&&(this.searchValue=t,this.emit(`minerva-input`,{value:t}),this.open||this.openDropdown())}handleInputKeyDown(e){switch(e.key){case`ArrowDown`:e.preventDefault(),this.open?this.searching?this.focusFirstSearchResult():(this.pendingFocus=-1,this.requestUpdate()):this.openDropdown(!0);break;case`Enter`:e.preventDefault(),this.open||this.openDropdown(!0);break;case` `:if(this.showSearch)break;e.preventDefault(),this.open||this.openDropdown(!0)}}handleFocusOut(e){let t=e.relatedTarget;this.open&&t&&(this.anchor&&l(this.anchor,t)||this.dropdown&&l(this.dropdown,t)||this.closeDropdown())}handleDropdownMouseDown(e){e.target.closest?.(`[role="option"]`)||e.preventDefault()}handleDropdownKeyDown(e){e.key===`Tab`&&this.closeDropdown()}handleOptionKeyDown(e,t,n){let r=e.currentTarget,i=Array.from(r.parentElement?.querySelectorAll(Yi)??[]),a=i.indexOf(r),o=e=>i[(e+i.length)%i.length]?.focus();switch(Je(e.key,this)){case`ArrowDown`:e.preventDefault(),o(a+1);break;case`ArrowUp`:e.preventDefault(),o(a-1);break;case`Home`:e.preventDefault(),o(0);break;case`End`:e.preventDefault(),o(i.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!this.canExpand(t,n))break;this.pendingFocus=n+1,this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;this.canExpand(t,n)&&(this.pendingFocus=n+1),this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`ArrowLeft`:e.preventDefault(),n===0?this.closeDropdown(!0):this.focusColumn(n-1)}}handleSearchKeyDown(e){let t=e.currentTarget,n=Array.from(t.querySelectorAll(`[role="option"]`)),r=n.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),n[(r+(e.key===`ArrowDown`?1:-1)+n.length)%n.length]?.focus())}renderSearchResults(){let e=this.searchResults();return m`<div
class="searchResults"
role="listbox"
aria-label=${this.label||this.aria.label||p}
tabindex="-1"
@keydown=${this.handleSearchKeyDown}
>
${e.length>0?e.map(({path:e})=>m`<div
class="searchOption"
part="item"
role="option"
aria-selected="false"
tabindex="0"
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),this.select(e))}}
@click=${()=>this.select(e)}
>
${e.map(e=>e.label).join(` / `)}
</div>`):m`<div class="empty" role="status">
${this.locale.t(`cascader.noResults`)}
</div>`}
</div>`}renderPanel(){let{t:e}=this.locale,t=this.columns(),n=this.expandedPath,r=this.selectedOptions,i=this.label||this.aria.label||e(`cascader.options`);return m`<div class="panel">
${t.map((a,o)=>m`<ul
id=${this.columnId(o)}
data-level=${o}
class="column"
part="column"
role="listbox"
aria-label=${e(`cascader.level`,{label:i,level:o+1})}
>
${a.map(e=>{let i=n[o]?.value===e.value,a=r[o]?.value===e.value,s=this.canExpand(e,o)&&!(!e.children?.length&&e.isLeaf),ee=i&&!(a&&o===r.length-1);return m`<li
?data-expanded=${ee}
?data-selected=${a}
class=${v({option:!0,active:i||a,disabled:!!e.disabled,loading:!!e.loading})}
part=${jn(`item`,{selected:a,expanded:ee,disabled:e.disabled,loading:e.loading})}
role="option"
aria-selected=${a?`true`:`false`}
aria-disabled=${e.disabled?`true`:p}
aria-busy=${e.loading?`true`:p}
aria-controls=${i&&o+1<t.length?this.columnId(o+1):p}
tabindex=${e.disabled?-1:0}
@keydown=${t=>this.handleOptionKeyDown(t,e,o)}
@click=${()=>{e.disabled||this.handleActivate(this.pathTo(e,o),o)}}
@mouseenter=${()=>{this.expandTrigger===`hover`&&!e.disabled&&e.children?.length&&o<this.maxLevel-1&&(this.expandedValues=this.pathTo(e,o).map(e=>e.value))}}
>
${this.optionRender?this.optionRender(e,o):m`<span class="label">${e.label}</span>${e.loading?m`<span
class="loadingIndicator"
aria-hidden="true"
>...</span
>`:s?m`<span class="expandIcon" aria-hidden="true"
>${Gt}</span
>`:p}`}
</li>`})}
</ul>`)}
</div>`}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.open&&!t,r=!this.hideClearButton&&this.value.length>0&&!t&&!this.readOnly,i=this.searching?this.searchValue:this.displayText,a=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return m`<div
class="cascader"
part="root"
@focusout=${this.handleFocusOut}
>
<div
class=${v({selector:!0,disabled:t,focused:n})}
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
aria-autocomplete=${this.showSearch?`list`:p}
aria-label=${this.aria.label??(this.label||p)}
aria-description=${this.aria.description??p}
aria-invalid=${a?`true`:p}
aria-required=${this.required?`true`:p}
aria-readonly=${this.showSearch&&this.readOnly?`true`:p}
name=${this.name||p}
.value=${nt(i)}
?readonly=${!this.showSearch||this.readOnly}
?disabled=${t}
?required=${this.required}
autocomplete="off"
placeholder=${this.placeholder??e(`cascader.placeholder`)}
@input=${this.handleInput}
@keydown=${this.handleInputKeyDown}
/>
</div>
${r?m`<button
type="button"
class="clearIcon"
part="clear-button"
aria-label=${e(`cascader.clear`)}
@click=${this.clear}
>
<span class="icon" aria-hidden="true">${un}</span>
</button>`:p}
<span
class=${v({arrow:!0,open:n})}
part="icon"
aria-hidden="true"
><span class="icon">${bn}</span></span
>
</div>
</div>
${n?m`<div
class="dropdown"
part="content"
popover="manual"
@mousedown=${this.handleDropdownMouseDown}
@focusout=${this.handleFocusOut}
@keydown=${this.handleDropdownKeyDown}
>
${this.searching?this.renderSearchResults():this.renderPanel()}
</div>`:p}`}},L([g({attribute:!1})],W.prototype,`options`,void 0),L([g({attribute:!1})],W.prototype,`value`,void 0),L([g({attribute:`value`,converter:Ji})],W.prototype,`defaultValue`,void 0),L([g({type:Boolean,reflect:!0})],W.prototype,`open`,void 0),L([g()],W.prototype,`label`,void 0),L([g()],W.prototype,`placeholder`,void 0),L([g({type:Boolean,reflect:!0})],W.prototype,`invalid`,void 0),L([g({type:Boolean,reflect:!0,attribute:`readonly`})],W.prototype,`readOnly`,void 0),L([g({type:Boolean,attribute:`hide-clear-button`})],W.prototype,`hideClearButton`,void 0),L([g({attribute:`expand-trigger`,reflect:!0})],W.prototype,`expandTrigger`,void 0),L([g({type:Boolean,attribute:`show-search`,reflect:!0})],W.prototype,`showSearch`,void 0),L([g({type:Number,attribute:`max-level`})],W.prototype,`maxLevel`,void 0),L([g()],W.prototype,`width`,void 0),L([g({attribute:!1})],W.prototype,`displayRender`,void 0),L([g({attribute:!1})],W.prototype,`filter`,void 0),L([g({attribute:!1})],W.prototype,`loadData`,void 0),L([g({attribute:!1})],W.prototype,`optionRender`,void 0),L([f()],W.prototype,`expandedValues`,void 0),L([f()],W.prototype,`searchValue`,void 0),L([_(`input`)],W.prototype,`input`,void 0),L([_(`.cascader`)],W.prototype,`anchor`,void 0),L([_(`.dropdown`)],W.prototype,`dropdown`,void 0)})))()}var Qi,$i;function ea(){return(ea=e((()=>{A(),M(),C(),I(),k(),O(),T(),Un(),Xt(),u(),d(),h(),it(),Qi=e=>e.charAt(0).toUpperCase()+e.slice(1),$i=class e extends zn{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.indeterminate=!1,this.value=`on`,this.label=``,this.shape=`square`,this.size=`medium`,this.color=`primary`,this.labelPlacement=`end`,this.error=!1,this.helperText=``,this.readOnly=!1,this.locale=new w(this),this.aria=new x(this,()=>this.labels),this.slots=new D(this),this.dirty=!1}static{this.tagName=`minerva-checkbox`}static{this.shadowRootOptions={...zn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,b`
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
`,F(Wt)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}click(){this.input?.click()}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(e){e.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked)}updated(t){super.updated(t),this.input&&(this.input.indeterminate=this.indeterminate),E&&!this.aria.label&&!this.label&&!this.textContent?.trim()&&P(e.tagName,`no label: set the label attribute, slot a label, or use aria-label / <label for>.`)}handleClick(e){this.readOnly&&e.preventDefault()}handleChange(){this.readOnly||(this.dirty=!0,this.input.indeterminate=this.indeterminate,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value}))}hookStates(){return{state:this.indeterminate?`indeterminate`:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape}}render(){let e=this.isDisabled,t=!!this.label||this.slots.test(`[default]`),n=[this.helperText,this.aria.description].filter(Boolean).join(` `),r=this.error||this.aria.attr(`aria-invalid`)===`true`;return m`<div
part="root"
class=${v({checkboxWrapper:!0,error:r})}
>
<label
class=${v({checkbox:!0,[this.size]:!0,[this.shape]:!0,[`label${Qi(this.labelPlacement)}`]:!0,[`color${Qi(this.color)}`]:this.color!==`primary`,disabled:e,error:r})}
>
<input
part="input"
type="checkbox"
class="input"
.checked=${nt(this.checked)}
?disabled=${e}
?required=${this.required}
aria-checked=${this.indeterminate?`mixed`:p}
aria-label=${this.aria.label??p}
aria-description=${n||p}
aria-invalid=${r?`true`:p}
aria-readonly=${this.readOnly?`true`:p}
@click=${this.handleClick}
@change=${this.handleChange}
/>
<span class="checkmark" part="control"
>${this.checked&&!this.indeterminate?m`<slot name="icon"></slot>`:p}</span
>
${t?m`<span class="label" part="label"
>${this.label||m`<slot></slot>`}</span
>`:p}
</label>
${this.helperText?m`<div class="helperTextWrapper">
${r?m`<span class="errorIcon" aria-hidden="true"
>${sn}</span
>`:p}
<span
part="helper-text"
class=${v({helperText:!0,errorText:r})}
>${this.helperText}</span
>
</div>`:p}
</div>`}},L([g({attribute:!1})],$i.prototype,`checked`,void 0),L([g({type:Boolean,attribute:`checked`,reflect:!0})],$i.prototype,`defaultChecked`,void 0),L([g({type:Boolean,reflect:!0})],$i.prototype,`indeterminate`,void 0),L([g()],$i.prototype,`value`,void 0),L([g()],$i.prototype,`label`,void 0),L([g({reflect:!0})],$i.prototype,`shape`,void 0),L([g({reflect:!0})],$i.prototype,`size`,void 0),L([g({reflect:!0})],$i.prototype,`color`,void 0),L([g({attribute:`label-placement`,reflect:!0})],$i.prototype,`labelPlacement`,void 0),L([g({type:Boolean,reflect:!0})],$i.prototype,`error`,void 0),L([g({attribute:`helper-text`})],$i.prototype,`helperText`,void 0),L([g({type:Boolean,reflect:!0,attribute:`readonly`})],$i.prototype,`readOnly`,void 0),L([_(`input`)],$i.prototype,`input`,void 0)})))()}var ta,na,ra;function ia(){return(ia=e((()=>{A(),M(),C(),I(),k(),O(),T(),Jn(),Cn(),u(),d(),h(),Qe(),ta=2e3,na=e=>e===void 0||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,ra=class e extends N{constructor(...e){super(...e),this.noWrap=!1,this.maxHeight=`24rem`,this.copyable=!1,this.status=`idle`,this.locale=new w(this),this.aria=new x(this),this.slots=new D(this)}static{this.tagName=`minerva-code-block`}static{this.styles=[j,b`
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
`,F(ar),F(yn)]}get text(){return this.code??this.textContent??``}async copy(){let e=this.text,t=typeof navigator>`u`?void 0:navigator.clipboard,n=!1;if(typeof t?.writeText==`function`)try{await t.writeText(e),n=!0}catch{n=!1}return this.isConnected?(this.showStatus(n?`copied`:`failed`),this.emit(`minerva-copy`,{text:e,success:n}),n):n}showStatus(e){clearTimeout(this.timer),this.status=e,this.timer=setTimeout(()=>this.status=`idle`,ta)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timer),this.status=`idle`}updated(){E&&this.copyable&&!this.text.trim()&&P(e.tagName,`copyable is set but there is no text to copy (set code or the text content).`)}render(){this.slots;let e=this.locale.t,t=this.aria.label??e(`codeBlock.label`),n=na(this.maxHeight),r=this.copyable||!!this.language,i=m`<pre
      part="region"
      role="region"
      tabindex="0"
      aria-label=${t}
      aria-description=${this.aria.description??p}
      data-wrap=${String(!this.noWrap)}
      class=${v({codeBlock:!0,copyable:r})}
      style=${y(r?{}:{maxHeight:n})}
    ><code
        part="code"
        class=${this.language?`language-${this.language}`:p}
        data-language=${this.language??p}
      >${this.text}</code></pre>`;if(!r)return i;let a=this.status,o=a===`copied`?e(`codeBlock.copied`):a===`failed`?e(`codeBlock.copyFailed`):``,s=o||e(`codeBlock.copy`),ee=a===`failed`?`danger`:a===`copied`?`success`:`neutral`;return m`<div part="root" class="root" style=${y({maxHeight:n})}>
${i}
<div class="actions">
${this.language?m`<span part="language" class="language" aria-hidden="true"
>${this.language}</span
>`:p}
${this.copyable?m`<button
type="button"
part="copy-button"
class="iconButton ${ee} variant-ghost small square"
aria-label=${s}
title=${s}
@click=${()=>void this.copy()}
>
${a===`copied`?Sn:a===`failed`?un:Zt}
</button>`:p}
</div>
${this.copyable?m`<span class="visuallyHidden" aria-live="polite"
>${o}</span
>`:p}
</div>`}},L([g()],ra.prototype,`code`,void 0),L([g({reflect:!0})],ra.prototype,`language`,void 0),L([g({type:Boolean,attribute:`no-wrap`,reflect:!0})],ra.prototype,`noWrap`,void 0),L([g({attribute:`max-height`})],ra.prototype,`maxHeight`,void 0),L([g({type:Boolean,reflect:!0})],ra.prototype,`copyable`,void 0),L([f()],ra.prototype,`status`,void 0)})))()}var aa,G;function oa(){return(oa=e((()=>{M(),gn(),I(),Kn(),k(),T(),Vr(),Br(),qr(),Kr(),Kt(),Pt(),Qt(),u(),d(),c(),de(),it(),aa={fromAttribute:e=>e===null?void 0:e.split(`,`).map(e=>e.trim()).filter(Boolean),toAttribute:e=>Array.isArray(e)?e.join(`, `):e},G=class e extends N{constructor(...e){super(...e),this.open=!1,this.items=[],this.maxResults=12,this.query=``,this.activeIndex=0,this.locale=new w(this),this.presence=new pn(this,()=>this.panel),this.modal=new Rr(this),this.focusScope=new Gr(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new Lr(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleShortcut=e=>{let t=Ue(this.shortcut);if(t.length===0)return;let n=e.composedPath()[0]??e.target;re(n)&&!e.ctrlKey&&!e.metaKey&&!e.altKey||e.isComposing||t.some(t=>Ae(e,t))&&(e.preventDefault(),e.stopPropagation(),this.requestOpenChange(!0,`shortcut`))}}static{this.tagName=`minerva-command-dialog`}static{this.styles=[j,zr,b`
:host{
display: contents;
}
`,F(xn),F(Ir)]}show(){this.open=!0}hide(){this.open=!1}get results(){let e=Math.max(0,this.maxResults),t=(Array.isArray(this.items)?this.items:[]).filter(e=>!e.disabled),n=this.query.trim();if(!n)return t.slice(0,e);if(typeof this.filter==`function`)return this.filter(t,n).slice(0,e);let r=ze(n);return t.filter(e=>ze(pe(e)).includes(r)).slice(0,e)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}select(e){this.emit(`minerva-select`,{value:e.id,item:e}),this.requestOpenChange(!1,`select`)}handleKeyDown(e){let t=this.results,n=Math.max(t.length-1,0),r={ArrowDown:e=>Math.min(e+1,n),ArrowUp:e=>Math.max(e-1,0),Home:()=>0,End:()=>n}[e.key];if(r&&(e.key.startsWith(`Arrow`)||!this.query)){e.preventDefault(),this.activeIndex=r(Math.min(this.activeIndex,n));return}let i=t[this.activeIndex];e.key===`Enter`&&i&&!e.isComposing&&(e.preventDefault(),this.select(i))}handleInput(e){this.query=e.target.value,this.activeIndex=0}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleShortcut,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleShortcut,!0),S(this.panel),S(this.overlay)}willUpdate(e){e.has(`open`)&&(this.presence.sync(this.open),this.open&&(this.query=``,this.activeIndex=0)),e.has(`items`)&&E&&this.checkItems();let t=this.results.length;this.activeIndex>0&&this.activeIndex>=t&&(this.activeIndex=Math.max(t-1,0))}checkItems(){if(!Array.isArray(this.items)){P(e.tagName,"`items` must be an array of { id, title, ... } objects.");return}let t=new Set;for(let n of this.items)t.has(n.id)&&P(e.tagName,`duplicate item id "${n.id}": ids identify the chosen command in minerva-select and must be unique.`),t.add(n.id)}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(kr(this.overlay),kr(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.open&&(e.has(`activeIndex`)||e.has(`query`))&&this.renderRoot.querySelector(`#option-${this.activeIndex}`)?.scrollIntoView?.({block:`nearest`}),this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}hookStates(){return{state:this.open?`open`:`closed`}}afterClose(){S(this.panel),S(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return p;let e=this.locale.t,t=this.open?`open`:`closed`,n=this.results,r=n[this.activeIndex]?`option-${this.activeIndex}`:void 0,i=this.placeholder??e(`command.placeholder`);return m`<div
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
${this.shortcutLabel?m`<kbd class="kbd">${this.shortcutLabel}</kbd>`:p}
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
aria-activedescendant=${r??p}
autocomplete="off"
spellcheck="false"
placeholder=${i}
.value=${nt(this.query)}
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
${n.length===0?m`<div class="empty" part="empty">
${this.emptyText??e(`command.empty`)}
</div>`:n.map((e,t)=>{let n=t===this.activeIndex;return m`<button
id=${`option-${t}`}
part=${jn(`item`,{highlighted:n})}
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
><strong>${e.title}</strong>${e.description?m`<small>${e.description}</small>`:p}</span
>${e.group?m`<span class="group">${e.group}</span>`:p}
</button>`})}
</div>
</div>`}},L([g({type:Boolean,reflect:!0})],G.prototype,`open`,void 0),L([g({attribute:!1})],G.prototype,`items`,void 0),L([g()],G.prototype,`label`,void 0),L([g()],G.prototype,`description`,void 0),L([g()],G.prototype,`placeholder`,void 0),L([g({attribute:`empty-text`})],G.prototype,`emptyText`,void 0),L([g({attribute:`shortcut-label`})],G.prototype,`shortcutLabel`,void 0),L([g({converter:aa})],G.prototype,`shortcut`,void 0),L([g({type:Number,attribute:`max-results`})],G.prototype,`maxResults`,void 0),L([g({attribute:!1})],G.prototype,`filter`,void 0),L([g({attribute:`results-label`})],G.prototype,`resultsLabel`,void 0),L([g({attribute:`enter-label`})],G.prototype,`enterLabel`,void 0),L([f()],G.prototype,`query`,void 0),L([f()],G.prototype,`activeIndex`,void 0),L([_(`.content`)],G.prototype,`panel`,void 0),L([_(`.overlay`)],G.prototype,`overlay`,void 0)})))()}var sa,ca,la;function ua(){return(ua=e((()=>{k(),u(),d(),c(),de(),sa=`(prefers-color-scheme: dark)`,ca=`data-minerva-theme-scope`,la=class extends N{constructor(...e){super(...e),this.root=!1,this.media=null,this.mode=null,this.onSchemeChange=()=>this.apply()}static{this.tagName=`minerva-config`}static{this.styles=b`
:host{
display: contents;
}
`}get resolvedMode(){return this.mode}connectedCallback(){super.connectedCallback(),typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(sa),this.media.addEventListener(`change`,this.onSchemeChange))}disconnectedCallback(){super.disconnectedCallback(),this.media?.removeEventListener(`change`,this.onSchemeChange),this.media=null,this.root&&this.clear(document.documentElement)}updated(e){e.has(`root`)&&e.get(`root`)!==void 0&&this.clear(e.get(`root`)?document.documentElement:this),this.apply()}target(){return this.root?document.documentElement:this}clear(e){for(let t of[`data-theme`,`data-palette`,ca,`lang`])(e!==this||t!==`lang`)&&e.removeAttribute(t);Ie(e,null),Ge(e.style,{}),e.style.removeProperty(`color-scheme`)}apply(){let e=this.target(),t=(t,n)=>{n==null?e.removeAttribute(t):e.setAttribute(t,n)},n=this.theme,r=this.media?.matches?`dark`:`light`,i=n===`system`?r:n===`github-dark`?`dark`:n===`light`||n===`dark`?n:null,a=De(this.design)?this.design:void 0,o=me(this.palette)?this.palette:le(a),s=!!o&&n!==`github-dark`;t(`data-theme`,i),t(`data-palette`,s?o:null),this.root||t(ca,i!==null||s||a!==void 0||[this.density,this.radius,this.shadow,this.fontScale].some(Boolean)?``:null),i?e.style.colorScheme=i:e.style.removeProperty(`color-scheme`),Ge(e.style,n===`github-dark`&&Ce(n)?Fe[n]:{}),Ie(e,{preset:a,density:He(this.density)?this.density:void 0,radius:fe(this.radius)?this.radius:void 0,shadow:ge(this.shadow)?this.shadow:void 0,fontScale:Re(this.fontScale)?this.fontScale:void 0},{all:!this.root&&a!==void 0}),this.root&&this.locale&&(document.documentElement.lang=this.locale),i!==this.mode&&(this.mode=i,i&&this.emit(`minerva-theme-change`,{mode:i}))}render(){return m`<slot></slot>`}},L([g({reflect:!0})],la.prototype,`theme`,void 0),L([g({reflect:!0})],la.prototype,`palette`,void 0),L([g({reflect:!0})],la.prototype,`design`,void 0),L([g({reflect:!0})],la.prototype,`density`,void 0),L([g({reflect:!0})],la.prototype,`radius`,void 0),L([g({reflect:!0})],la.prototype,`shadow`,void 0),L([g({reflect:!0,attribute:`font-scale`})],la.prototype,`fontScale`,void 0),L([g({reflect:!0})],la.prototype,`locale`,void 0),L([g({type:Boolean,reflect:!0})],la.prototype,`root`,void 0)})))()}var K;function da(){return(da=e((()=>{A(),M(),C(),gn(),I(),k(),O(),T(),Vr(),Br(),qr(),Kr(),Ai(),Kt(),Qt(),u(),d(),K=class e extends N{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.color=`primary`,this.loading=!1,this.confirmDisabled=!1,this.busy=!1,this.locale=new w(this),this.aria=new x(this),this.slots=new D(this),this.presence=new pn(this,()=>this.panel),this.modal=new Rr(this),this.focusScope=new Gr(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new Lr(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestClose(this.reason)})),this.reason=`outside`,this.wasPresent=!1}static{this.tagName=`minerva-confirm-dialog`}static{this.dependencies=[U]}static{this.styles=[j,zr,b`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,F(xn)]}show(){this.open=!0}hide(){this.open=!1}requestClose(e){return!this.open||!this.emit(`minerva-open-change`,{open:!1,reason:e},{cancelable:!0})?!1:(this.open=!1,e!==`confirm`&&this.emit(`minerva-cancel`,{reason:e}),!0)}async handleConfirm(){if(!this.open||this.loading||this.busy||this.confirmDisabled||!this.emit(`minerva-confirm`,void 0,{cancelable:!0}))return;let e=this.onConfirm?.();if(e&&typeof e.then==`function`){this.busy=!0;try{await e}catch{return}finally{this.busy=!1}}this.requestClose(`confirm`)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,color:this.color,loading:this.loading||this.busy}}updated(t){let n=this.open||this.presence.present;if(t.has(`open`)){let t=this.panel;this.open&&t?(E&&!this.label&&!this.slots.test(`header`)&&!this.aria.label&&P(e.tagName,"set `label` (or the `header` slot / aria-label) to give the alertdialog an accessible name."),kr(this.overlay),kr(t),this.modal.activate(this),this.layer.activate(t),this.focusInitial(t)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!n&&this.afterClose(),this.wasPresent=n}async focusInitial(e){let t=Array.from(e.querySelectorAll(`minerva-button`));await Promise.all(t.map(e=>e.updateComplete)),this.open&&this.panel===e&&(this.focusScope.activate(e),this.emit(`minerva-after-open`))}disconnectedCallback(){super.disconnectedCallback(),S(this.panel),S(this.overlay)}afterClose(){S(this.panel),S(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return p;let e=this.open?`open`:`closed`,t=this.locale.t,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=this.loading||this.busy;return m`<div
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
aria-labelledby=${n?`title`:p}
aria-label=${n?p:this.aria.label??p}
aria-describedby=${r?`description`:p}
tabindex="-1"
data-state=${e}
>
${r?m`<p id="description" class="description" part="description">
${r}
</p>`:p}
${n?m`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:p}
<div class="body" part="body">
${this.slots.test(`[default]`)?m`<slot></slot>`:p}
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
${un}
</button>
</div>`}},L([g({type:Boolean,reflect:!0})],K.prototype,`open`,void 0),L([g()],K.prototype,`label`,void 0),L([g()],K.prototype,`description`,void 0),L([g({attribute:`confirm-label`})],K.prototype,`confirmLabel`,void 0),L([g({attribute:`cancel-label`})],K.prototype,`cancelLabel`,void 0),L([g({attribute:`close-label`})],K.prototype,`closeLabel`,void 0),L([g({reflect:!0})],K.prototype,`color`,void 0),L([g({type:Boolean,reflect:!0})],K.prototype,`loading`,void 0),L([g({type:Boolean,reflect:!0,attribute:`confirm-disabled`})],K.prototype,`confirmDisabled`,void 0),L([g({attribute:!1})],K.prototype,`onConfirm`,void 0),L([f()],K.prototype,`busy`,void 0),L([_(`.content`)],K.prototype,`panel`,void 0),L([_(`.overlay`)],K.prototype,`overlay`,void 0)})))()}function fa(e){let t=Vt(e,_a);if(!t)return null;let n=e.ownerDocument;return t===n.documentElement||t===n.body?null:t}function pa(e,t){for(let n=e;n;n=Rt(n))if(n===t)return!0;return!1}function ma(e){return ya.push(e),()=>{let t=ya.lastIndexOf(e);t>=0&&ya.splice(t,1)}}function ha(e){let t=e?.isConnected===!0?Vt(e,xa):null;if(t&&`confirmQueue`in t)return t.confirmQueue;let n=ya[ya.length-1];return n?n.confirmQueue:(ba??=new va(()=>document.body),ba)}function ga(e){return t=>Ca({...t,host:t.host??e})}var _a,va,ya,ba,xa,Sa,Ca;function wa(){return(wa=e((()=>{M(),gn(),I(),Er(),da(),_a=`minerva-config:not([root]), [data-minerva-theme-scope], [data-theme], [data-palette]`,va=class{constructor(e){this.defaultContainer=e,this.requests=[],this.current=null,this.settles=new Set}enqueue(e){return Mr(K),new Promise(t=>{this.requests.push({options:e,resolve:t}),this.current||this.showNext()})}cancelAll(){let e=this.requests.splice(0);for(let t of e)t.resolve(!1);for(let e of[...this.settles])e(!1);this.current?.remove()}container(e){let t=typeof document>`u`?null:document,n=e.container;if(n)return n.isConnected?n:(E&&P(K.tagName,"confirm(): `container` is not connected to the document; the dialog is appended to document.body instead."),t.body);let r=e.host?.isConnected===!0?fa(e.host):null,i=this.defaultContainer();return r&&!pa(i,r)?r:i}showNext(){let e=this.requests.shift();if(!e){this.current=null;return}let{options:t,resolve:n}=e,r=this.container(t),i=document.createElement(K.tagName);i.label=t.title,t.description&&(i.description=t.description),t.confirmLabel&&(i.confirmLabel=t.confirmLabel),t.cancelLabel&&(i.cancelLabel=t.cancelLabel),t.closeLabel&&(i.closeLabel=t.closeLabel),t.color&&(i.color=t.color);let a=t.host;if(a?.isConnected&&!t.container){let e=Pn(a);e!==Pn(r)&&i.setAttribute(`lang`,e)}let o=!1,s=!1,ee=e=>{o||(o=!0,this.settles.delete(ee),n(e))};this.settles.add(ee);let te=new MutationObserver(()=>{i.isConnected||c()}),c=()=>{s||(s=!0,te.disconnect(),ee(!1),i.remove(),this.showNext())};i.addEventListener(`minerva-open-change`,e=>{let{open:t,reason:n}=e.detail;queueMicrotask(()=>{!t&&!e.defaultPrevented&&ee(n===`confirm`)})}),i.addEventListener(`minerva-after-close`,c,{once:!0}),this.current=i,r.append(i),te.observe(document,{childList:!0,subtree:!0}),i.open=!0}},ya=[],ba=null,xa=`minerva-confirm-provider`,Sa=()=>(E&&P(K.tagName,`confirm() called without a document (server render): resolving false.`),Promise.resolve(!1)),Ca=e=>typeof document>`u`?Sa():ha(e.host).enqueue(e)})))()}var Ta;function Ea(){return(Ea=e((()=>{k(),da(),wa(),u(),Ta=class extends N{constructor(...e){super(...e),this.confirmQueue=new va(()=>this),this.unregister=null,this.confirm=e=>this.confirmQueue.enqueue(e)}static{this.tagName=`minerva-confirm-provider`}static{this.dependencies=[K]}static{this.styles=b`
:host{
display: contents;
}
`}connectedCallback(){super.connectedCallback(),this.unregister=ma(this)}disconnectedCallback(){super.disconnectedCallback(),this.unregister?.(),this.unregister=null,this.confirmQueue.cancelAll()}render(){return m`<slot></slot>`}}})))()}var Da,Oa,ka,q,Aa;function ja(){return(ja=e((()=>{A(),M(),C(),I(),Kn(),k(),T(),Vn(),ln(),Xr(),u(),d(),h(),Qe(),de(),it(),st(),Da=e=>e===void 0?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Oa={ascend:`ascending`,descend:`descending`},ka=48,q=class e extends N{constructor(...e){super(...e),this.columns=[],this.rows=[],this.loading=!1,this.loadingRows=5,this.sortState=null,this.manualSort=!1,this.selectable=!1,this.selectedRowKeys=[],this.size=`medium`,this.variant=`simple`,this.hoverable=!1,this.retryable=!1,this.overflowing=!1,this.aria=new x(this),this.locale=new w(this),this.resize=null,this.handlePageChange=e=>{let{page:t,pageSize:n}=e.detail;queueMicrotask(()=>{e.defaultPrevented||(this.pagination={...this.pagination,current:t,pageSize:n})})}}static{this.tagName=`minerva-data-table`}static{this.dependencies=[ti]}static{this.styles=[j,b`
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
`,F(At),F(nn)]}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect(),this.resize=null}keyOf(e,t){let n=this.rowKey;return typeof n==`function`?n(e,t):typeof n==`string`&&n?e[n]:t}entries(){return(this.rows??[]).map((e,t)=>({row:e,index:t,key:this.keyOf(e,t)}))}rowDisabled(e){return!!this.isRowDisabled?.(e)}willUpdate(t){if(E&&(t.has(`rows`)||t.has(`rowKey`))){let t=this.entries().map(e=>e.key);new Set(t).size!==t.length&&P(e.tagName,`rows have duplicate keys: set row-key to a unique field (or a function).`)}}updated(){this.observeOverflow();let e=this.shadowRoot?.querySelector(`minerva-pagination`);e&&this.pagination&&Object.assign(e,this.pagination)}observeOverflow(){let e=this.wrapper;if(!e){this.resize?.disconnect(),this.resize=null;return}let t=()=>{let t=e.scrollWidth>e.clientWidth||e.scrollHeight>e.clientHeight;t!==this.overflowing&&(this.overflowing=t)};t(),!this.resize&&typeof ResizeObserver<`u`&&(this.resize=new ResizeObserver(t),this.resize.observe(e),e.firstElementChild&&this.resize.observe(e.firstElementChild))}changeSort(e){let t=Ee(this.sortState,e);this.emit(`minerva-sort-change`,t,{cancelable:!0})&&(this.sortState=t)}commitSelection(e){let t=new Set(e),n={selectedRowKeys:e,selectedRows:this.entries().filter(e=>t.has(e.key)).map(e=>e.row)};if(!this.emit(`minerva-selection-change`,n,{cancelable:!0})){this.requestUpdate();return}this.selectedRowKeys=e}toggleRow(e,t){let n=this.selectedRowKeys;this.commitSelection(t?[...n.filter(t=>t!==e),e]:n.filter(t=>t!==e))}renderTable(){let e=this.columns??[],t=this.locale.t,n=we(e),r=this.selectable,i=r&&e[0]?.fixed===`left`,a=i?ka:0,o=this.entries(),ee=this.sortState,te=ee?.order??null,c=te===null?void 0:e.find(e=>e.key===ee?.key),ne=c?s(c):null,re=!this.manualSort&&ne?[...o].sort((e,t)=>te===`descend`?ne(t.row,e.row):ne(e.row,t.row)):o,ie=new Set(this.selectedRowKeys),ae=o.filter(e=>!this.rowDisabled(e.row)),l=ae.length>0&&ae.every(e=>ie.has(e.key)),oe=!l&&o.some(e=>ie.has(e.key)),se=()=>{let e=new Set(ae.map(e=>e.key)),t=this.selectedRowKeys;this.commitSelection(l?t.filter(t=>!e.has(t)):[...t,...ae.map(e=>e.key).filter(e=>!ie.has(e))])},ce=e=>{let t={textAlign:e.align},r=Da(e.width);return r!==void 0&&(t.width=r,t.minWidth=r),e.fixed===`left`?t.left=`${(n.leftOffsets[e.key]??0)+a}px`:e.fixed===`right`&&(t.right=`${n.rightOffsets[e.key]??0}px`),t},le=e=>e.fixed===`left`&&e.key===n.lastLeftFixedKey?`left`:e.fixed===`right`&&e.key===n.firstRightFixedKey?`right`:p,ue=y({width:`${ka}px`,minWidth:`${ka}px`,...i?{left:`0px`}:{}}),de=i?`left`:p,fe=e.length+ +!!r,pe=e=>{if(!e.sortable)return m`<th
part="header-cell"
scope="col"
style=${y(ce(e))}
data-ellipsis=${e.ellipsis?`true`:p}
data-fixed=${e.fixed??p}
data-fixed-edge=${le(e)}
>
${e.header}
</th>`;let t=ee?.key===e.key?ee.order:null,n=t===`ascend`?On:t===`descend`?bn:En,r=t?Oa[t]:`none`;return m`<th
part=${jn(`header-cell`,{sort:r})}
scope="col"
aria-sort=${r}
data-sort=${r}
style=${y(ce(e))}
data-ellipsis=${e.ellipsis?`true`:p}
data-fixed=${e.fixed??p}
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
</th>`},me;me=this.loading?Array.from({length:this.loadingRows},()=>m`<tr part="row" aria-hidden="true">
${r?m`<td
part="cell"
class="selectionCell"
style=${ue}
data-fixed=${de}
></td>`:p}
${e.map(e=>m`<td
part="cell"
style=${y(ce(e))}
data-fixed=${e.fixed??p}
data-fixed-edge=${le(e)}
>
<span part="skeleton" class="skeleton"></span>
</td>`)}
</tr>`):o.length===0?m`<tr part="row">
<td part="empty" colspan=${fe} class="empty">
<slot name="empty">${this.emptyText??t(`table.empty`)}</slot>
</td>
</tr>`:et(re,e=>e.key,({row:n,index:i,key:a},o)=>{let s=r&&ie.has(a);return m`<tr
part=${jn(`row`,{selected:s})}
aria-selected=${s?`true`:p}
?data-selected=${s}
>
${r?m`<td
part="cell"
class="selectionCell"
style=${ue}
data-fixed=${de}
>
<input
type="checkbox"
part="checkbox"
class="checkbox"
.checked=${nt(s)}
?disabled=${this.rowDisabled(n)}
aria-label=${t(`table.selectRow`,{row:this.getRowLabel?.(n,i)??String(a)})}
@change=${e=>this.toggleRow(a,e.target.checked)}
/>
</td>`:p}
${e.map(e=>m`<td
part="cell"
style=${y(ce(e))}
data-ellipsis=${e.ellipsis?`true`:p}
data-fixed=${e.fixed??p}
data-fixed-edge=${le(e)}
>
${e.render?e.render(n,o):n[e.key]}
</td>`)}
</tr>`});let he=Da(this.scrollX),ge=Da(this.scrollY),_e=!!(he||ge)||this.overflowing,ve=this.aria.label;return m`<div
part="viewport"
class=${v({wrapper:!0,wrapperBordered:this.variant===`bordered`,wrapperScrollY:!!ge})}
role=${_e?`region`:p}
tabindex=${_e?0:p}
aria-label=${_e?ve??t(`table.scrollRegion`):p}
style=${y(ge?{maxHeight:ge,overflowY:`auto`}:{})}
>
<table
part="table"
class=${v({table:!0,[this.size]:!0,[this.variant]:!0,hoverable:this.hoverable,scrollX:!!he})}
style=${y(he?{minWidth:he}:{})}
aria-label=${ve??p}
aria-description=${this.aria.description??p}
>
<thead>
<tr part="row">
${r?m`<th
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
.checked=${nt(l)}
.indeterminate=${oe}
?disabled=${ae.length===0||this.loading}
aria-label=${t(`table.selectAll`)}
@change=${se}
/>
</th>`:p}
${e.map(pe)}
</tr>
</thead>
<tbody>
${me}
</tbody>
</table>
</div>`}hookStates(){return{loading:this.loading,size:this.size,variant:this.variant}}render(){let e=!!this.error&&!this.loading;return m`<div
part="root"
class="dataTable"
aria-busy=${this.loading?`true`:p}
>
${e?m`<div part="error" class="error" role="alert">
<div class="errorTitle">
<slot name="error">${this.error}</slot>
</div>
${this.retryable?m`<button
type="button"
part="retry-button"
class="customButton neutral variant-outline small retry"
@click=${()=>this.emit(`minerva-retry`)}
>
<span class="label"
><span class="retryIcon" aria-hidden="true"
>${qt}</span
>${this.retryLabel??this.locale.t(`table.retry`)}</span
>
</button>`:p}
</div>`:m`${this.renderTable()}
${this.pagination?m`<minerva-pagination
part="pagination"
exportparts="root: pagination-root, item: pagination-item"
@minerva-page-change=${this.handlePageChange}
></minerva-pagination>`:p}`}
</div>`}},L([g({attribute:!1})],q.prototype,`columns`,void 0),L([g({attribute:!1})],q.prototype,`rows`,void 0),L([g({attribute:`row-key`})],q.prototype,`rowKey`,void 0),L([g({attribute:`empty-text`})],q.prototype,`emptyText`,void 0),L([g({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),L([g({type:Number,attribute:`loading-rows`})],q.prototype,`loadingRows`,void 0),L([g({attribute:!1})],q.prototype,`sortState`,void 0),L([g({type:Boolean,attribute:`manual-sort`})],q.prototype,`manualSort`,void 0),L([g({type:Boolean,reflect:!0})],q.prototype,`selectable`,void 0),L([g({attribute:!1})],q.prototype,`selectedRowKeys`,void 0),L([g({attribute:!1})],q.prototype,`isRowDisabled`,void 0),L([g({attribute:!1})],q.prototype,`getRowLabel`,void 0),L([g({reflect:!0})],q.prototype,`size`,void 0),L([g({reflect:!0})],q.prototype,`variant`,void 0),L([g({type:Boolean,reflect:!0})],q.prototype,`hoverable`,void 0),L([g({attribute:`scroll-x`})],q.prototype,`scrollX`,void 0),L([g({attribute:`scroll-y`})],q.prototype,`scrollY`,void 0),L([g({attribute:!1})],q.prototype,`pagination`,void 0),L([g()],q.prototype,`error`,void 0),L([g({type:Boolean})],q.prototype,`retryable`,void 0),L([g({attribute:`retry-label`})],q.prototype,`retryLabel`,void 0),L([f()],q.prototype,`overflowing`,void 0),L([_(`.wrapper`)],q.prototype,`wrapper`,void 0),Aa=class extends N{constructor(...e){super(...e),this.primary=``,this.monospace=!1,this.maxWidth=360,this.observer=null}static{this.tagName=`minerva-table-cell-content`}static{this.styles=[j,b`
:host{
display: block;
min-width: 0;
}
`,F(nn)]}hasSecondarySlot(){return Array.from(this.children).some(e=>e.getAttribute(`slot`)===`secondary`)}connectedCallback(){super.connectedCallback(),this.observer??=typeof MutationObserver>`u`?null:new MutationObserver(()=>this.requestUpdate()),this.observer?.observe(this,{childList:!0})}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}render(){let e=this.secondary!==void 0&&this.secondary!==null||this.hasSecondarySlot(),t=v({cellPrimary:!0,cellMono:this.monospace,cellStrong:e}),n=m`<slot>${this.primary}</slot>`;return m`<div
part="root"
class="cellContent"
style=${y({maxWidth:Da(this.maxWidth)})}
>
${this.monospace?m`<code part="primary" class=${t}>${n}</code>`:m`<div part="primary" class=${t}>${n}</div>`}
${e?m`<div part="secondary" class="cellSecondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:p}
</div>`}},L([g()],Aa.prototype,`primary`,void 0),L([g()],Aa.prototype,`secondary`,void 0),L([g({type:Boolean,reflect:!0})],Aa.prototype,`monospace`,void 0),L([g({attribute:`max-width`})],Aa.prototype,`maxWidth`,void 0)})))()}var Ma,Na;function Pa(){return(Pa=e((()=>{M(),k(),T(),en(),u(),d(),h(),Ma=class extends N{constructor(...e){super(...e),this.label=``}static{this.tagName=`minerva-description-item`}static{this.styles=[j,b`
:host{
display: contents;
}
`]}render(){return m`<slot></slot>`}},L([g({reflect:!0})],Ma.prototype,`label`,void 0),Na=class e extends N{constructor(...e){super(...e),this.items=[],this.bordered=!1,this.striped=!1,this.observer=null}static{this.tagName=`minerva-description-list`}static{this.dependencies=[Ma]}static{this.shadowRootOptions={...N.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[j,b`
:host{
display: block;
}
`,F($n)]}declarativeItems(){return Array.from(this.children).filter(e=>e.localName===Ma.tagName)}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,attributes:!0,subtree:!0,attributeFilter:[`label`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}updated(){let t=this.declarativeItems();if(Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,n)=>{let r=t[n];r&&typeof e.assign==`function`&&e.assign(r)}),E){let t=Array.from(this.children).filter(e=>e.localName!==Ma.tagName);t.length&&P(e.tagName,`only <minerva-description-item> children are rendered (ignored: <${t[0].localName}>).`)}}render(){let e=this.declarativeItems();return m`<dl
part="root"
class=${v({descriptionList:!0,bordered:this.bordered,striped:this.striped})}
>
${(this.items??[]).map(e=>m`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description">${e.value}</dd>
</div>`)}
${e.map(e=>m`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description"><slot data-item></slot></dd>
</div>`)}
</dl>`}},L([g({attribute:!1})],Na.prototype,`items`,void 0),L([g({type:Boolean,reflect:!0})],Na.prototype,`bordered`,void 0),L([g({type:Boolean,reflect:!0})],Na.prototype,`striped`,void 0)})))()}var Fa,Ia;function La(){return(La=e((()=>{M(),k(),O(),T(),Mt(),u(),d(),h(),Qe(),Fa=e=>typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Ia=class e extends N{constructor(...e){super(...e),this.variant=`solid`,this.orientation=`horizontal`,this.thickness=1,this.spacing=16,this.textAlign=`center`,this.elevation=!1,this.flexItem=!1,this.slots=new D(this)}static{this.tagName=`minerva-divider`}static{this.styles=[j,b`
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
`,F(tr)]}hookStates(){let e=this.orientation===`horizontal`&&this.slots.test(`[default]`);return{orientation:this.orientation,variant:this.variant,align:e?this.textAlign:void 0}}updated(){E&&this.orientation===`vertical`&&this.slots.test(`[default]`)&&P(e.tagName,`text is only rendered by horizontal dividers; it is ignored when orientation is vertical.`)}render(){let e=this.orientation===`horizontal`,t=e&&this.slots.test(`[default]`),n=this.textAlign,r={};if(this.thickness!=null&&!Number.isNaN(this.thickness)&&(r.borderWidth=`${this.thickness}px`,r[`--_divider-thickness`]=`${this.thickness}px`),this.length!=null&&this.length!==``&&(r[e?`width`:`height`]=Fa(this.length)),this.spacing!=null&&!Number.isNaN(this.spacing)){let t=`${this.spacing}px`;r.marginTop=e?t:`0`,r.marginBottom=e?t:`0`,r.marginLeft=e?`0`:t,r.marginRight=e?`0`:t}let i=v({divider:!0,[this.variant]:!0,[this.orientation]:!0,withText:t,[`text${n.charAt(0).toUpperCase()}${n.slice(1)}`]:t,elevation:this.elevation,flexItem:this.flexItem});return t?m`<div
part="root"
role="separator"
aria-orientation=${this.orientation}
class=${i}
style=${y(r)}
>
<span class="text" part="label"><slot></slot></span>
</div>`:m`<hr
part="root"
aria-orientation=${this.orientation}
class=${i}
style=${y(r)}
/>`}},L([g({reflect:!0})],Ia.prototype,`variant`,void 0),L([g({reflect:!0})],Ia.prototype,`orientation`,void 0),L([g({type:Number})],Ia.prototype,`thickness`,void 0),L([g()],Ia.prototype,`length`,void 0),L([g({type:Number})],Ia.prototype,`spacing`,void 0),L([g({attribute:`text-align`})],Ia.prototype,`textAlign`,void 0),L([g({type:Boolean,reflect:!0})],Ia.prototype,`elevation`,void 0),L([g({type:Boolean,reflect:!0,attribute:`flex-item`})],Ia.prototype,`flexItem`,void 0)})))()}var Ra,za;function Ba(){return(Ba=e((()=>{A(),M(),C(),gn(),I(),k(),O(),T(),Vr(),Br(),qr(),Kr(),Qt(),on(),u(),d(),h(),Ra=[`left`,`right`,`top`,`bottom`],za=class e extends N{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.side=`right`,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.nonModal=!1,this.locale=new w(this),this.aria=new x(this),this.slots=new D(this),this.presence=new pn(this,()=>this.panel),this.modal=new Rr(this),this.focusScope=new Gr(this,()=>({trapped:!this.nonModal,loop:!0,restoreFocus:!0})),this.layer=new Lr(this,()=>({disableOutsidePointerEvents:!this.nonModal,branches:()=>[this.triggerElement()],onFocusOutside:()=>this.nonModal,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-drawer-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)}}static{this.tagName=`minerva-drawer`}static{this.styles=[j,zr,b`
:host{
display: contents;
}
`,F(zt)]}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(t){t.has(`open`)&&this.presence.sync(this.open),E&&t.has(`side`)&&!Ra.includes(this.side)&&P(e.tagName,`invalid side "${this.side}" (expected left, right, top or bottom).`)}hookStates(){return{state:this.open?`open`:`closed`,side:Ra.includes(this.side)?this.side:`right`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)||e.has(`nonModal`)&&this.open){let t=this.panel;this.open&&t?(e.has(`nonModal`)&&!e.has(`open`)&&(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate()),kr(this.overlay),kr(t),this.nonModal||this.modal.activate(this),this.layer.activate(t),this.focusScope.activate(t),e.has(`open`)&&this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),S(this.panel),S(this.overlay)}afterClose(){S(this.panel),S(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=Ra.includes(this.side)?this.side:`right`;return m`<slot name="trigger"></slot> ${e?m`${this.nonModal?p:m`<div
part="overlay"
class="overlay"
popover="manual"
data-state=${t}
aria-hidden="true"
></div>`}
<div
part="content"
class=${v({content:!0,[i]:!0,[this.size]:!0})}
popover="manual"
role=${this.dialogRole}
aria-modal=${this.nonModal?p:`true`}
aria-labelledby=${n?`title`:p}
aria-label=${n?p:this.aria.label??p}
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
${n?m`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:p}
<div class="body" part="body"><slot></slot></div>
${this.slots.test(`footer`)?m`<div class="footer" part="footer">
<slot name="footer"></slot>
</div>`:p}
${this.hideCloseButton?p:m`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`drawer.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${un}
</button>`}
</div>`:p}`}},L([g({type:Boolean,reflect:!0})],za.prototype,`open`,void 0),L([g()],za.prototype,`label`,void 0),L([g()],za.prototype,`description`,void 0),L([g({attribute:`hidden-description`})],za.prototype,`hiddenDescription`,void 0),L([g({reflect:!0})],za.prototype,`side`,void 0),L([g({reflect:!0})],za.prototype,`size`,void 0),L([g({type:Boolean,attribute:`hide-close-button`})],za.prototype,`hideCloseButton`,void 0),L([g({attribute:`close-label`})],za.prototype,`closeLabel`,void 0),L([g({attribute:`dialog-role`})],za.prototype,`dialogRole`,void 0),L([g({type:Boolean,reflect:!0,attribute:`non-modal`})],za.prototype,`nonModal`,void 0),L([_(`.content`)],za.prototype,`panel`,void 0),L([_(`.overlay`)],za.prototype,`overlay`,void 0)})))()}var Va,Ha,Ua,Wa;function Ga(){return(Ga=e((()=>{A(),M(),I(),k(),O(),T(),Ht(),u(),d(),h(),Qe(),Va=Xe`<svg class="defaultIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke="none" aria-hidden="true" focusable="false"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM5 5v9h4a3 3 0 0 0 6 0h4V5ZM5 16v3h14v-3h-2.54a5 5 0 0 1-8.92 0Z" /></svg>`,Ha=Xe`<svg class="defaultIcon" aria-hidden="true" focusable="false" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse style="fill: var(--surface-muted-color)" cx="32" cy="33" rx="32" ry="7" /><g fill-rule="nonzero" style="stroke: var(--border-strong-color)"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" /><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" style="fill: var(--surface-color)" /></g></g></svg>`,Ua=e=>e&&/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Wa=class e extends N{constructor(...e){super(...e),this.heading=``,this.hideDescription=!1,this.hideIcon=!1,this.useSvg=!1,this.showShadow=!1,this.locale=new w(this),this.aria=new x(this),this.slots=new D(this)}static{this.tagName=`minerva-empty`}static{this.styles=[j,b`
:host{
display: block;
}
`,F(_n)]}hookStates(){return{size:this.size}}updated(){E&&this.hideDescription&&this.description&&P(e.tagName,`description is ignored while hide-description is set.`)}render(){let e=!!this.heading||this.slots.test(`heading`),t=this.slots.test(`description`),n=this.description??this.locale.t(`empty.description`),r=!this.hideDescription&&(t||n!==``),i=this.slots.test(`action`)||this.slots.test(`secondary-action`),a=this.aria.label;return m`<div
part="root"
class=${v({empty:!0,showShadow:this.showShadow,sized:!!this.size,[`size-${this.size}`]:!!this.size})}
style=${y({width:Ua(this.width),height:Ua(this.height)})}
role="status"
aria-label=${a??p}
aria-labelledby=${a?p:e?`title`:r?`description`:p}
aria-describedby=${e&&r?`description`:p}
>
${this.hideIcon?p:m`<div part="icon" class="iconWrapper">
<slot name="icon">${this.useSvg?Ha:Va}</slot>
</div>`}
${e?m`<div id="title" part="title" class="title">
<slot name="heading">${this.heading}</slot>
</div>`:p}
${r?m`<div id="description" part="description" class="description">
<slot name="description">${n}</slot>
</div>`:p}
${i?m`<div part="actions" class="actions">
<slot name="action"></slot><slot name="secondary-action"></slot>
</div>`:p}
${this.slots.test(`[default]`)?m`<div part="footer" class="footer"><slot></slot></div>`:p}
</div>`}},L([g()],Wa.prototype,`heading`,void 0),L([g()],Wa.prototype,`description`,void 0),L([g({type:Boolean,attribute:`hide-description`})],Wa.prototype,`hideDescription`,void 0),L([g({type:Boolean,attribute:`hide-icon`})],Wa.prototype,`hideIcon`,void 0),L([g({reflect:!0})],Wa.prototype,`size`,void 0),L([g({type:Boolean,attribute:`use-svg`})],Wa.prototype,`useSvg`,void 0),L([g()],Wa.prototype,`width`,void 0),L([g()],Wa.prototype,`height`,void 0),L([g({type:Boolean,attribute:`show-shadow`})],Wa.prototype,`showShadow`,void 0)})))()}var Ka,qa;function Ja(){return(Ja=e((()=>{M(),k(),O(),T(),Ar(),u(),d(),Ka=e=>e.localName===`minerva-checkbox`||e.localName===`minerva-switch`||e instanceof HTMLInputElement&&(e.type===`checkbox`||e.type===`radio`),qa=class e extends N{constructor(...e){super(...e),this.label=``,this.helperText=``,this.errorMessage=``,this.invalid=!1,this.required=!1,this.disabled=!1,this.readOnly=!1,this.requiredIndicator=`*`,this.slots=new D(this),this.observer=null,this.control=null,this.saved=new Map}static{this.tagName=`minerva-form-control`}static{this.styles=[j,b`
:host{
display: block;
}
.label{
cursor: default;
}
`,F(It)]}get controlElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.release()}updated(){this.sync()}get labelText(){return this.label?this.label:Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`label`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}slotText(e){return Array.from(this.children).filter(t=>t.getAttribute(`slot`)===e).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}get descriptionText(){return this.invalid?this.errorMessage||this.slotText(`error-message`):this.helperText||this.slotText(`helper-text`)}save(e,t){this.saved.has(e)||this.saved.set(e,t)}setAttr(e,t,n){let r=`@${t}`;if(n===null){if(!this.saved.has(r))return;let n=this.saved.get(r);this.saved.delete(r),n===null?e.removeAttribute(t):e.setAttribute(t,n);return}this.save(r,e.getAttribute(t)),e.getAttribute(t)!==n&&e.setAttribute(t,n)}setProp(e,t,n){let r=`.${t}`;if(!n){if(!this.saved.has(r))return;e[t]=this.saved.get(r),this.saved.delete(r);return}this.save(r,e[t]),e[t]=!0}propFor(e,t){return{invalid:[`invalid`,`error`],required:[`required`],disabled:[`disabled`],readOnly:[`readOnly`,`readonly`]}[t].find(t=>t in e&&typeof e[t]==`boolean`)??null}release(){let e=this.control;if(e){for(let[t,n]of this.saved)if(t.startsWith(`@`)){let r=t.slice(1);n===null?e.removeAttribute(r):e.setAttribute(r,n)}else e[t.slice(1)]=n;this.saved.clear(),this.control=null}}sync(){let t=this.controlElement;if(t!==this.control&&(this.release(),this.control=t),!t)return;let n=this.labelText,r=this.saved.has(`@aria-label`);n&&(r||!t.hasAttribute(`aria-label`))?this.setAttr(t,`aria-label`,n):n||this.setAttr(t,`aria-label`,null);let i=this.descriptionText;this.setAttr(t,`aria-description`,i||null);for(let e of[`invalid`,`required`,`disabled`,`readOnly`]){let n=this.propFor(t,e);n&&this.setProp(t,n,this[e])}if(this.setAttr(t,`aria-invalid`,this.invalid?`true`:null),this.setAttr(t,`aria-required`,this.required?`true`:null),this.setAttr(t,`aria-readonly`,this.readOnly?`true`:null),E&&this.children.length>0){let t=Array.from(this.children).filter(e=>!e.hasAttribute(`slot`));t.length>1&&P(e.tagName,`wraps ONE control, found ${t.length} elements in the default slot: only the first one is wired.`)}}handleLabelClick(e){let t=this.controlElement;t&&!this.disabled&&(e.preventDefault(),Ka(t)?t.click():t.focus())}hookStates(){return{disabled:this.disabled,invalid:this.invalid,readonly:this.readOnly,required:this.required}}render(){let e=!!this.label||this.slots.test(`label`),t=!!this.helperText||this.slots.test(`helper-text`),n=!!this.errorMessage||this.slots.test(`error-message`);return m`<div class="root" part="root">
${e?m`<label
id="label"
class="label"
part="label"
@click=${this.handleLabelClick}
>${this.label||m`<slot name="label"></slot>`}${this.required?m`<span
class="required"
part="required-indicator"
aria-hidden="true"
>${this.requiredIndicator}</span
>`:p}</label
>`:p}
<slot @slotchange=${()=>this.sync()}></slot>
${!this.invalid&&t?m`<div id="helper" class="helper" part="helper-text">
${this.helperText||m`<slot name="helper-text"></slot>`}
</div>`:p}
${this.invalid&&n?m`<div
id="error"
class="error"
part="error-message"
role="alert"
>
${this.errorMessage||m`<slot name="error-message"></slot>`}
</div>`:p}
</div>`}},L([g()],qa.prototype,`label`,void 0),L([g({attribute:`helper-text`})],qa.prototype,`helperText`,void 0),L([g({attribute:`error-message`})],qa.prototype,`errorMessage`,void 0),L([g({type:Boolean,reflect:!0})],qa.prototype,`invalid`,void 0),L([g({type:Boolean,reflect:!0})],qa.prototype,`required`,void 0),L([g({type:Boolean,reflect:!0})],qa.prototype,`disabled`,void 0),L([g({type:Boolean,reflect:!0,attribute:`readonly`})],qa.prototype,`readOnly`,void 0),L([g({attribute:`required-indicator`})],qa.prototype,`requiredIndicator`,void 0)})))()}var Ya;function Xa(){return(Xa=e((()=>{k(),T(),wi(),hn(),Fn(),ei(),u(),d(),Qe(),Ya=class e extends N{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-form-layout`}static{this.styles=[j,b`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,F(jr),F(Pr)]}render(){let t=$r(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return m`<div class="root" part="root" style=${y(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},L([g({converter:Yr})],Ya.prototype,`columns`,void 0),L([g({converter:Ci})],Ya.prototype,`gap`,void 0),L([g({attribute:`row-gap`,converter:Ci})],Ya.prototype,`rowGap`,void 0),L([g({attribute:`column-gap`,converter:Ci})],Ya.prototype,`columnGap`,void 0)})))()}function Za(e){let t=``;if(e&&typeof window<`u`){let n=Ze(window);n.isSupported&&(n.addHook(`uponSanitizeAttribute`,(e,t)=>{t.attrName===`src`&&(e.nodeName!==`IMG`||!/^data:image\/(?:png|jpeg|gif|webp|avif);base64,[a-z0-9+/=\s]+$/i.test(t.attrValue))&&(t.keepAttr=!1)}),n.sanitize(eo,$a)===to&&(t=n.sanitize(e,$a)))}return`<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="${Qa}"><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${t}</body></html>`}var Qa,$a,eo,to;function no(){return(no=e((()=>{Ye(),Qa=`default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; object-src 'none'; frame-src 'none'; font-src 'none'; media-src 'none'; form-action 'none'; base-uri 'none'`,$a={ALLOWED_TAGS:`a abbr b bdi bdo blockquote br caption center code col colgroup dd del div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i img ins li ol p pre s section small span strong style sub sup table tbody td tfoot th thead tr u ul wbr`.split(` `),ALLOWED_ATTR:`alt title class style lang dir role width height align valign bgcolor border cellpadding cellspacing colspan rowspan scope src`.split(` `),ALLOW_DATA_ATTR:!1,ALLOW_ARIA_ATTR:!0,FORBID_TAGS:[`base`,`meta`,`link`,`script`,`form`,`input`,`button`,`iframe`,`object`,`embed`,`svg`,`math`],FORBID_ATTR:[`href`,`srcdoc`,`srcset`,`action`,`formaction`,`target`,`ping`,`id`,`name`],FORCE_BODY:!0,RETURN_TRUSTED_TYPE:!1},eo=`<p title="t" onclick="x()">ok</p><script>x()<\/script><img alt="a" src="https://x.invalid/p" onerror="x()">`,to=`<p title="t">ok</p><img alt="a">`})))()}var ro;function io(){return(io=e((()=>{A(),M(),k(),T(),Or(),no(),u(),d(),Qe(),rt(),ro=class e extends N{constructor(...e){super(...e),this.html=``,this.label=``,this.viewport=`desktop`,this.mobileWidth=375,this.height=600,this.doc=Za(),this.aria=new x(this)}static{this.tagName=`minerva-html-preview`}static{this.styles=[j,b`
:host{
display: block;
}
`,F(Mn)]}willUpdate(e){e.has(`html`)&&(this.doc=Za(this.html))}updated(){E&&!this.label&&!this.aria.label&&P(e.tagName,`set label (or aria-label): the iframe needs a title for assistive technologies.`)}render(){let e=Number.isFinite(this.mobileWidth)&&this.mobileWidth>0?this.mobileWidth:375,t=Number.isFinite(this.height)&&this.height>0?this.height:600;return m`<div part="root" class="preview">
${$e(this.doc,m`<iframe
part="frame"
class="frame"
title=${this.label||this.aria.label||``}
sandbox=""
referrerpolicy="no-referrer"
srcdoc=${this.doc}
style=${y({width:this.viewport===`mobile`?`${e}px`:`100%`,height:`${t}px`})}
></iframe>`)}
</div>`}},L([g()],ro.prototype,`html`,void 0),L([g()],ro.prototype,`label`,void 0),L([g({reflect:!0})],ro.prototype,`viewport`,void 0),L([g({type:Number,attribute:`mobile-width`})],ro.prototype,`mobileWidth`,void 0),L([g({type:Number})],ro.prototype,`height`,void 0),L([f()],ro.prototype,`doc`,void 0)})))()}var ao,oo,J;function so(){return(so=e((()=>{A(),M(),C(),I(),Dr(),k(),T(),Jn(),qr(),qn(),u(),d(),h(),ao=200,oo=300,J=class e extends N{constructor(...e){super(...e),this.color=`neutral`,this.variant=`ghost`,this.size=`medium`,this.shape=`circle`,this.disabled=!1,this.loading=!1,this.toggle=!1,this.pressed=!1,this.tooltipPlacement=`top`,this.noTooltip=!1,this.type=`button`,this.tooltipOpen=!1,this.tooltipPositioned=!1,this.internals=Nr(this),this.aria=new x(this),this.locale=new w(this),this.floating=new Ur(this,()=>({anchor:()=>this.button,floating:()=>this.tooltipElement,branches:()=>[this],placement:this.tooltipPlacement,offset:{mainAxis:8},dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,onDismiss:()=>this.hideTooltip(),onPosition:()=>{this.tooltipPositioned=!0}})),this.handlePointerEnter=()=>{if(!this.tooltipEnabled||this.tooltipOpen){this.clearTimers();return}this.clearTimers(),this.enterTimer=setTimeout(()=>this.showTooltip(),ao)},this.handlePointerLeave=()=>{this.clearTimers(),this.tooltipOpen&&(this.leaveTimer=setTimeout(()=>this.hideTooltip(),oo))},this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-icon-button`}static{this.formAssociated=!0}static{this.shadowRootOptions={...N.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,zr,b`
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
`,F(ar),F(Yn)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}get tooltipContent(){return this.tooltip||this.label||void 0}get tooltipEnabled(){return!this.noTooltip&&!!this.tooltipContent&&!this.disabled&&!this.loading}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer)}showTooltip(){this.tooltipEnabled&&(this.clearTimers(),this.tooltipOpen=!0)}hideTooltip(){this.clearTimers(),this.tooltipOpen=!1,this.tooltipPositioned=!1}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}if(this.toggle){let e=!this.pressed;this.emit(`minerva-pressed-change`,{pressed:e},{cancelable:!0})&&(this.pressed=e)}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0),this.clearTimers(),this.tooltipOpen=!1}hookStates(){return{state:this.toggle&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}willUpdate(e){(e.has(`disabled`)||e.has(`loading`)||e.has(`noTooltip`))&&!this.tooltipEnabled&&this.hideTooltip()}updated(){this.floating.sync(this.tooltipOpen&&this.tooltipEnabled),E&&!this.label&&!this.aria.label&&P(e.tagName,`icon buttons only contain an icon: set label (or aria-label) to give them an accessible name.`)}render(){let e=this.tooltipOpen&&this.tooltipEnabled;return m`<button
part="root"
type="button"
class=${v({iconButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape]:!0,disabled:this.disabled,loading:this.loading,pressed:this.toggle&&this.pressed})}
?disabled=${this.disabled}
tabindex=${this.disabled?`-1`:`0`}
aria-label=${this.label??this.aria.label??this.locale.t(`iconButton.default`)}
aria-description=${this.aria.description??p}
aria-describedby=${e?`tooltip`:p}
aria-pressed=${this.toggle?String(this.pressed):p}
aria-expanded=${this.aria.attr(`aria-expanded`)??p}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??p}
aria-busy=${this.loading?`true`:p}
aria-disabled=${this.loading&&!this.disabled?`true`:p}
@click=${this.handleClick}
@mouseenter=${this.handlePointerEnter}
@mouseleave=${this.handlePointerLeave}
@focus=${()=>this.showTooltip()}
@blur=${()=>this.hideTooltip()}
>
${this.loading?m`<span
class=${v({spinner:!0,[this.size]:!0})}
part="spinner"
role="progressbar"
aria-label=${this.locale.t(`common.loading`)}
>${rn}</span
>`:m`<span class="glyph" part="icon" aria-hidden="true"
><slot></slot
></span>`}
</button>
${e?m`<div
id="tooltip"
part="tooltip"
role="tooltip"
popover="manual"
class=${v({tooltip:!0,neutral:!0,solid:!0,default:!0,"animation-fade":!0,show:this.tooltipPositioned})}
@mouseenter=${()=>this.clearTimers()}
@mouseleave=${this.handlePointerLeave}
>
${this.tooltipContent}
</div>`:p}`}},L([g()],J.prototype,`label`,void 0),L([g({reflect:!0})],J.prototype,`color`,void 0),L([g({reflect:!0})],J.prototype,`variant`,void 0),L([g({reflect:!0})],J.prototype,`size`,void 0),L([g({reflect:!0})],J.prototype,`shape`,void 0),L([g({type:Boolean,reflect:!0})],J.prototype,`disabled`,void 0),L([g({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),L([g({type:Boolean,reflect:!0})],J.prototype,`toggle`,void 0),L([g({type:Boolean,reflect:!0})],J.prototype,`pressed`,void 0),L([g()],J.prototype,`tooltip`,void 0),L([g({attribute:`tooltip-placement`})],J.prototype,`tooltipPlacement`,void 0),L([g({type:Boolean,attribute:`no-tooltip`})],J.prototype,`noTooltip`,void 0),L([g({reflect:!0})],J.prototype,`type`,void 0),L([f()],J.prototype,`tooltipOpen`,void 0),L([f()],J.prototype,`tooltipPositioned`,void 0),L([_(`button`)],J.prototype,`button`,void 0),L([_(`.tooltip`)],J.prototype,`tooltipElement`,void 0)})))()}var co,Y;function lo(){return(lo=e((()=>{A(),M(),C(),I(),k(),O(),T(),Cr(),Un(),u(),d(),h(),it(),co=0,Y=class e extends zn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.type=`text`,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.clearable=!1,this.showCharCount=!1,this.passwordVisible=!1,this.countId=`minerva-input-count-${co++}`,this.locale=new w(this),this.aria=new x(this,()=>this.labels),this.slots=new D(this),this.dirty=!1}static{this.tagName=`minerva-input`}static{this.shadowRootOptions={...zn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,b`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,F(nr)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}select(){this.input?.select()}getFormValue(){return this.value}getValidity(){let e=this.input;return e?{flags:fr(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.passwordVisible=!1}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),E&&t.has(`maxLength`)&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&P(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=this.input.value,this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}clear(){this.value=``,this.input.value=``,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:``}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:``}),this.emit(`minerva-clear`),this.input.focus()}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.type===`password`,r=this.clearable&&this.value!==``&&!t&&!this.readOnly,i=this.passwordVisible?this.hidePasswordLabel??e(`input.hidePassword`):this.showPasswordLabel??e(`input.showPassword`),a=this.showCharCount?this.countId:void 0;return m`<div
part="root"
class=${v({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?m`<span class="addon start" part="prefix"
><slot name="prefix"></slot
></span>`:p}
<input
part="input"
class="field"
.value=${nt(this.value)}
type=${n&&this.passwordVisible?`text`:this.type}
name=${this.name||p}
placeholder=${this.placeholder||p}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
minlength=${this.minLength??p}
maxlength=${this.maxLength??p}
pattern=${this.pattern??p}
min=${this.min??p}
max=${this.max??p}
step=${this.step??p}
autocomplete=${this.autocomplete??p}
inputmode=${this.inputmode??p}
aria-label=${this.aria.label??p}
aria-description=${this.aria.description??p}
aria-describedby=${a??p}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:p}
@input=${this.handleInput}
@change=${this.handleChange}
/>
${r?m`<button
part="clear-button"
type="button"
class="action"
aria-label=${this.clearLabel??e(`input.clear`)}
@click=${this.clear}
>
${un}
</button>`:p}
${n?m`<button
part="password-toggle"
type="button"
class="action"
aria-label=${i}
?disabled=${t}
@click=${()=>this.passwordVisible=!this.passwordVisible}
>
${this.passwordVisible?Yt:mn}
</button>`:p}
${this.showCharCount?m`<span id=${this.countId} class="count" part="count"
>${this.maxLength!=null&&this.maxLength>=0?`${this.value.length} / ${this.maxLength}`:this.value.length}</span
>`:p}
${this.slots.test(`suffix`)?m`<span class="addon end" part="suffix"
><slot name="suffix"></slot
></span>`:p}
</div>`}},L([g({attribute:!1})],Y.prototype,`value`,void 0),L([g({attribute:`value`})],Y.prototype,`defaultValue`,void 0),L([g({reflect:!0})],Y.prototype,`type`,void 0),L([g({reflect:!0})],Y.prototype,`variant`,void 0),L([g({reflect:!0})],Y.prototype,`size`,void 0),L([g({type:Boolean,reflect:!0})],Y.prototype,`invalid`,void 0),L([g()],Y.prototype,`placeholder`,void 0),L([g({type:Boolean,reflect:!0,attribute:`readonly`})],Y.prototype,`readOnly`,void 0),L([g({type:Number,attribute:`minlength`})],Y.prototype,`minLength`,void 0),L([g({type:Number,attribute:`maxlength`})],Y.prototype,`maxLength`,void 0),L([g()],Y.prototype,`pattern`,void 0),L([g()],Y.prototype,`min`,void 0),L([g()],Y.prototype,`max`,void 0),L([g()],Y.prototype,`step`,void 0),L([g()],Y.prototype,`autocomplete`,void 0),L([g()],Y.prototype,`inputmode`,void 0),L([g({type:Boolean,reflect:!0})],Y.prototype,`clearable`,void 0),L([g({attribute:`clear-label`})],Y.prototype,`clearLabel`,void 0),L([g({type:Boolean,attribute:`show-char-count`})],Y.prototype,`showCharCount`,void 0),L([g({attribute:`show-password-label`})],Y.prototype,`showPasswordLabel`,void 0),L([g({attribute:`hide-password-label`})],Y.prototype,`hidePasswordLabel`,void 0),L([f()],Y.prototype,`passwordVisible`,void 0),L([_(`input`)],Y.prototype,`input`,void 0)})))()}function uo(e){if(!e.trim())return{status:`empty`};try{return JSON.parse(e),{status:`valid`}}catch(e){return{status:`invalid`,error:e instanceof Error?e.message:String(e)}}}function fo(e,t){let a=Math.min(10,Math.max(0,Math.trunc(t)||0));if(a>0)return i(e,n(e,void 0,{tabSize:a,insertSpaces:!0,eol:`
`}));let o=r(e,!0),s=[];for(;o.getPosition()<e.length;){o.scan();let t=o.getTokenOffset();s.push(e.slice(t,t+o.getTokenLength()))}return s.join(``)}var po;function mo(){return(mo=e((()=>{A(),M(),C(),I(),k(),T(),Jn(),Un(),or(),Wn(),u(),d(),h(),it(),t(),po=class e extends zn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.rows=8,this.hideToolbar=!1,this.indent=2,this.invalid=!1,this.readOnly=!1,this.placeholder=``,this.focused=!1,this.locale=new w(this),this.aria=new x(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-json-field`}static{this.shadowRootOptions={...zn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,b`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,F(pr),F(ar),F(Bn),b`

.toolbar .iconButton{
min-height: 0;
}
.status > svg{
width: 16px;
height: 16px;
}
`]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}formatValue(){uo(this.value).status===`valid`&&(this.value=fo(this.value,this.indent))}getFormValue(){return this.value}getValidity(){let e=this.textarea,t=uo(this.value);return t.status===`invalid`?{flags:{badInput:!0},message:`${this.invalidLabel??this.locale.t(`jsonField.invalid`)}: ${t.error}`,anchor:e}:this.required&&t.status===`empty`?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:e}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),E&&t.has(`indent`)&&(this.indent<0||this.indent>10)&&P(e.tagName,`indent (${this.indent}) is clamped to 0..10.`)}get locked(){return this.isDisabled||this.readOnly}formatNow(){if(this.locked||uo(this.value).status!==`valid`)return;let e=fo(this.value,this.indent);e!==this.value&&(this.dirty=!0,this.value=e,this.emit(`minerva-input`,{value:e}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleInput(){this.locked||(this.dirty=!0,this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value}))}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){let e=!this.focused&&uo(this.value).status===`invalid`;return{disabled:this.isDisabled,invalid:e||this.invalid,readonly:this.readOnly,required:this.required}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.focused?{status:`empty`}:uo(this.value),r=n.status===`invalid`,i=r||this.invalid,a=this.locked||!this.value.trim(),o=n.status===`valid`?this.validLabel??e(`jsonField.valid`):n.status===`invalid`?`${this.invalidLabel??e(`jsonField.invalid`)}: ${n.error}`:``,s=[this.aria.description,r?o:void 0].filter(Boolean).join(` `);return m`<div class="root" part="root">
      ${this.hideToolbar?p:m`<div class="toolbar" part="toolbar">
              <button
                part="format-button"
                type="button"
                class=${v({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:a})}
                ?disabled=${a}
                tabindex=${a?`-1`:`0`}
                aria-label=${this.formatLabel??e(`jsonField.format`)}
                @click=${this.formatNow}
              >
                ${Nt}
              </button>
            </div>`}
      <textarea
        part="input"
        class=${v({textarea:!0,outline:!0,medium:!0,invalid:i})}
        style="resize: none"
        rows=${this.rows}
        spellcheck="false"
        .value=${nt(this.value)}
        name=${this.name||p}
        placeholder=${this.placeholder||p}
        ?disabled=${t}
        ?readonly=${this.readOnly}
        ?required=${this.required}
        aria-label=${this.aria.label??p}
        aria-description=${s||p}
        aria-invalid=${i?`true`:p}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @focus=${()=>this.focused=!0}
        @blur=${()=>this.focused=!1}
      ></textarea>
      <div
        part="status"
        role="status"
        aria-live="polite"
        class=${v({status:!0,statusInvalid:r})}
      >
        ${n.status===`valid`?m`${xr}<span>${o}</span>`:n.status===`invalid`?m`${fn}<span>${o}</span>`:p}
      </div>
    </div>`}},L([g({attribute:!1})],po.prototype,`value`,void 0),L([g({attribute:`value`})],po.prototype,`defaultValue`,void 0),L([g({type:Number})],po.prototype,`rows`,void 0),L([g({type:Boolean,attribute:`hide-toolbar`})],po.prototype,`hideToolbar`,void 0),L([g({type:Number})],po.prototype,`indent`,void 0),L([g({type:Boolean,reflect:!0})],po.prototype,`invalid`,void 0),L([g({type:Boolean,reflect:!0,attribute:`readonly`})],po.prototype,`readOnly`,void 0),L([g()],po.prototype,`placeholder`,void 0),L([g({attribute:`format-label`})],po.prototype,`formatLabel`,void 0),L([g({attribute:`valid-label`})],po.prototype,`validLabel`,void 0),L([g({attribute:`invalid-label`})],po.prototype,`invalidLabel`,void 0),L([f()],po.prototype,`focused`,void 0),L([_(`textarea`)],po.prototype,`textarea`,void 0)})))()}function ho(e){if(!e)return[];try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>e&&typeof e==`object`).map(e=>({id:typeof e.id==`string`?e.id:``,key:String(e.key??``),value:String(e.value??``)}));if(t&&typeof t==`object`)return Object.entries(t).map(([e,t])=>({id:``,key:e,value:typeof t==`string`?t:JSON.stringify(t)}))}catch{}return[]}var go,_o;function vo(){return(vo=e((()=>{A(),M(),C(),I(),Kn(),k(),T(),Jn(),Un(),Ai(),Ja(),Tr(),Jr(),u(),d(),st(),go=0,_o=class e extends zn{constructor(...e){super(...e),this.value=[],this.defaultValue=[],this.editorId=`kv-${go++}`,this.nextId=0,this.dirty=!1,this.pendingFocus=null,this.locale=new w(this),this.aria=new x(this,()=>this.labels)}static{this.tagName=`minerva-key-value-editor`}static{this.dependencies=[U,qa,ni]}static{this.styles=[j,b`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,F(ar),F(ir),b`

.key{
--textarea-min-height: var(
--key-value-editor-control-height,
var(--control-height-sm)
);
}
`]}focus(e){(this.renderRoot.querySelector(`minerva-textarea`)??this.renderRoot.querySelector(`minerva-button`))?.focus(e)}getFormValue(){return JSON.stringify(this.value.map(({key:e,value:t})=>({key:e,value:t})))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.renderRoot.querySelector(`minerva-button`)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=ho(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)&&(this.value.some(e=>!e.id)&&(this.value=this.value.map(e=>e.id?e:{...e,id:this.newId()})),E)){let t=this.value.map(e=>e.id);new Set(t).size!==t.length&&P(e.tagName,`entries have duplicate ids: rows are tracked by id, make them unique.`)}}updated(e){super.updated(e);let t=this.pendingFocus;if(!t)return;this.pendingFocus=null;let n=e=>this.value.some(t=>t.id===e),r=e=>Array.from(this.renderRoot.querySelectorAll(`[data-entry-id]`)).find(t=>e!==void 0&&t.dataset.entryId===e)??null;if(t.kind===`add`){let e=n(t.id)?r(t.id)?.querySelector(`.key`):null;e&&e.updateComplete.then(()=>e.focus())}else n(t.id)||(r(t.nextId)?.querySelector(`.remove`)??this.renderRoot.querySelector(`minerva-button`))?.focus()}newId(){let e;do e=`${this.editorId}-${this.nextId++}`;while(this.value.some(t=>t.id===e));return e}commit(e){this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e})}add(){if(this.isDisabled)return;let e=this.newId();this.pendingFocus={kind:`add`,id:e},this.commit([...this.value,{id:e,key:``,value:``}])}removeEntry(e){if(this.isDisabled)return;let t=this.value.findIndex(t=>t.id===e),n=this.value[t+1]??this.value[t-1];this.pendingFocus={kind:`remove`,id:e,nextId:n?.id},this.commit(this.value.filter(t=>t.id!==e))}handleInput(e,t,n){if(e.stopPropagation(),this.isDisabled)return;let r=e.target.value;this.dirty=!0,this.value=this.value.map(e=>e.id===t?{...e,[n]:r}:e),this.emit(`minerva-input`,{value:this.value})}handleFieldChange(e){e.stopPropagation(),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}isRowInvalid(e){let t=this.errors?.[e.id];return!!(t?.key||t?.value)}renderField(e,t,n,r){let i=this.errors?.[e.id]?.[n];return m`<minerva-form-control
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
</minerva-form-control>`}hookStates(){return{disabled:this.isDisabled}}render(){let{t:e}=this.locale,t=this.keyLabel??e(`keyValueEditor.key`),n=this.valueLabel??e(`keyValueEditor.value`),r=this.removeLabel??e(`keyValueEditor.remove`),i=this.isDisabled,a=this.aria.label;return m`<div
class="root"
part="root"
role=${a?`group`:p}
aria-label=${a??p}
aria-description=${this.aria.description??p}
>
${et(this.value,e=>e.id,(e,a)=>m`<div
class="row"
part=${jn(`row`,{invalid:this.isRowInvalid(e)})}
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
${un}
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
<span slot="start">${wn}</span>
<span>${this.addLabel??e(`keyValueEditor.add`)}</span>
</minerva-button>
</div>`}},L([g({attribute:!1})],_o.prototype,`value`,void 0),L([g({attribute:`value`,converter:{fromAttribute:e=>ho(e)}})],_o.prototype,`defaultValue`,void 0),L([g({attribute:`key-label`})],_o.prototype,`keyLabel`,void 0),L([g({attribute:`value-label`})],_o.prototype,`valueLabel`,void 0),L([g({attribute:`add-label`})],_o.prototype,`addLabel`,void 0),L([g({attribute:`remove-label`})],_o.prototype,`removeLabel`,void 0),L([g({attribute:!1})],_o.prototype,`errors`,void 0)})))()}var yo,bo;function xo(){return(xo=e((()=>{A(),M(),Dr(),k(),O(),T(),Ln(),u(),d(),h(),yo=class e extends N{constructor(...e){super(...e),this.density=`default`,this.bordered=!1,this.noDividers=!1,this.internals=Nr(this)}static{this.tagName=`minerva-list`}static{this.styles=[j,b`
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
`,F(vr)]}connectedCallback(){super.connectedCallback(),an(this,this.internals,{role:`list`})}updated(){if(E){let t=Array.from(this.children).find(e=>e.localName!==bo.tagName);t&&P(e.tagName,`children should be <minerva-list-item> elements (found <${t.localName}>): other elements break the list semantics.`)}}render(){return m`<div
part="root"
class=${v({list:!0,compact:this.density===`compact`,comfortable:this.density===`comfortable`,bordered:this.bordered,dividers:!this.noDividers})}
>
<slot @slotchange=${()=>this.requestUpdate()}></slot>
</div>`}},L([g({reflect:!0})],yo.prototype,`density`,void 0),L([g({type:Boolean,reflect:!0})],yo.prototype,`bordered`,void 0),L([g({type:Boolean,reflect:!0,attribute:`no-dividers`})],yo.prototype,`noDividers`,void 0),bo=class extends N{constructor(...e){super(...e),this.primary=``,this.secondary=``,this.internals=Nr(this),this.slots=new D(this)}static{this.tagName=`minerva-list-item`}static{this.styles=[j,F(vr),b`
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
`]}connectedCallback(){super.connectedCallback(),an(this,this.internals,{role:`listitem`})}render(){let e=this.secondary!==``||this.slots.test(`secondary`);return m`<div part="root" class="item">
${this.slots.test(`icon`)?m`<div part="icon" class="icon" aria-hidden="true">
<slot name="icon"></slot>
</div>`:p}
<div class="content">
<div part="label" class="primary"><slot>${this.primary}</slot></div>
${e?m`<div part="description" class="secondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:p}
</div>
${this.slots.test(`actions`)?m`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:p}
</div>`}},L([g()],bo.prototype,`primary`,void 0),L([g()],bo.prototype,`secondary`,void 0)})))()}var So,Co;function wo(){return(wo=e((()=>{M(),I(),k(),T(),Zn(),Zr(),u(),d(),h(),So=[`small`,`medium`,`large`],Co=class e extends N{constructor(...e){super(...e),this.size=`medium`,this.locale=new w(this)}static{this.tagName=`minerva-loading-state`}static{this.dependencies=[Qr]}static{this.styles=[j,b`
:host{
display: block;
}
`,F(gr)]}hookStates(){return{size:this.size}}updated(){E&&!So.includes(this.size)&&P(e.tagName,`unknown size "${this.size}" (expected ${So.join(`, `)}).`)}render(){return m`<div
part="root"
class=${v({loadingState:!0,[this.size]:!0})}
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
</div>`}},L([g()],Co.prototype,`label`,void 0),L([g({reflect:!0})],Co.prototype,`size`,void 0)})))()}function To(e){let t=Array.from(e.childNodes).filter(e=>!Io(e)&&(e.nodeType!==1||e.getAttribute(`slot`)!==`icon`));return t.every(e=>e.nodeType===3)?t.map(e=>e.textContent??``).join(``).trim():t.map(e=>e.cloneNode(!0))}function Eo(e){return{value:zo(e,`value`)??Ro(e),label:To(e),textValue:zo(e,`text-value`),shortcut:zo(e,`shortcut`),disabled:Bo(e,`disabled`),closeOnSelect:Bo(e,`close-on-select`),element:e}}function Do(e,t=`e`){let n=[],r=null;return Array.from(e.children).forEach((e,i)=>{let a=`${t}-${i}`;switch(e.localName!==jo.tagName&&(r=null),e.localName){case ko.tagName:{let t=Do(e,a),r=e.querySelector(`:scope > [slot='icon']`);n.push({key:zo(e,`value`)||Ro(e),label:To(e),textValue:zo(e,`text-value`),icon:r?r.cloneNode(!0):void 0,shortcut:zo(e,`shortcut`),disabled:Bo(e,`disabled`),closeOnSelect:!Bo(e,`keep-open`)&&void 0,children:t.length?t:void 0,element:e});break}case Ao.tagName:n.push({type:`checkbox`,key:zo(e,`value`)||Ro(e),label:To(e),textValue:zo(e,`text-value`),shortcut:zo(e,`shortcut`),disabled:Bo(e,`disabled`),checked:Bo(e,`checked`),closeOnSelect:Bo(e,`close-on-select`),element:e});break;case jo.tagName:{r||(r={type:`radio-group`,key:a,items:[]},n.push(r));let t=Eo(e);r.items.push(t),Bo(e,`checked`)&&(r.value=t.value);break}case No.tagName:n.push({type:`separator`,key:a});break;case Po.tagName:n.push({type:`label`,key:a,label:To(e)});break;case Mo.tagName:{let t=Array.from(e.children),r=zo(e,`label`);if(t.length>0&&t.every(e=>e.localName===jo.tagName)){let i=t.map(Eo);n.push({type:`radio-group`,key:a,label:r,items:i,value:i.find(e=>e.element?.hasAttribute(`checked`))?.value,closeOnSelect:Bo(e,`close-on-select`),element:e})}else n.push({type:`group`,key:a,label:r??``,items:Do(e,a)});break}}}),n}var Oo,ko,Ao,jo,Mo,No,Po,Fo,Io,Lo,Ro,zo,Bo;function Vo(){return(Vo=e((()=>{k(),u(),d(),Oo=b`
:host{
display: none !important;
}
`,ko=class extends N{constructor(...e){super(...e),this.value=``,this.disabled=!1,this.shortcut=``,this.textValue=``,this.keepOpen=!1}static{this.tagName=`minerva-menu-item`}static{this.styles=Oo}},L([g({reflect:!0})],ko.prototype,`value`,void 0),L([g({type:Boolean,reflect:!0})],ko.prototype,`disabled`,void 0),L([g()],ko.prototype,`shortcut`,void 0),L([g({attribute:`text-value`})],ko.prototype,`textValue`,void 0),L([g({type:Boolean,attribute:`keep-open`})],ko.prototype,`keepOpen`,void 0),Ao=class extends N{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-checkbox-item`}static{this.styles=Oo}},L([g({reflect:!0})],Ao.prototype,`value`,void 0),L([g({type:Boolean,reflect:!0})],Ao.prototype,`checked`,void 0),L([g({type:Boolean,reflect:!0})],Ao.prototype,`disabled`,void 0),L([g()],Ao.prototype,`shortcut`,void 0),L([g({attribute:`text-value`})],Ao.prototype,`textValue`,void 0),L([g({type:Boolean,attribute:`close-on-select`})],Ao.prototype,`closeOnSelect`,void 0),jo=class extends N{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-radio-item`}static{this.styles=Oo}},L([g({reflect:!0})],jo.prototype,`value`,void 0),L([g({type:Boolean,reflect:!0})],jo.prototype,`checked`,void 0),L([g({type:Boolean,reflect:!0})],jo.prototype,`disabled`,void 0),L([g()],jo.prototype,`shortcut`,void 0),L([g({attribute:`text-value`})],jo.prototype,`textValue`,void 0),L([g({type:Boolean,attribute:`close-on-select`})],jo.prototype,`closeOnSelect`,void 0),Mo=class extends N{constructor(...e){super(...e),this.label=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-group`}static{this.styles=Oo}},L([g()],Mo.prototype,`label`,void 0),L([g({type:Boolean,attribute:`close-on-select`})],Mo.prototype,`closeOnSelect`,void 0),No=class extends N{static{this.tagName=`minerva-menu-separator`}static{this.styles=Oo}},Po=class extends N{static{this.tagName=`minerva-menu-label`}static{this.styles=Oo}},Fo=[ko.tagName,Ao.tagName,jo.tagName,Mo.tagName,No.tagName,Po.tagName],Io=e=>e.nodeType===1&&Fo.includes(e.localName),Lo=e=>!!(e.nodeType===1?e:e.parentElement)?.closest(Fo.join(`,`)),Ro=e=>Array.from(e.childNodes).filter(e=>!Io(e)).map(e=>e.textContent??``).join(``).trim(),zo=(e,t)=>e.getAttribute(t)??void 0,Bo=(e,t)=>e.hasAttribute(t)})))()}var Ho,Uo,Wo,Go,Ko,qo,Jo,Yo,Xo,Zo,Qo,$o;function es(){return(es=e((()=>{M(),C(),gn(),Kn(),k(),T(),Vr(),Wr(),Br(),qr(),Kr(),ur(),Vo(),u(),d(),h(),c(),de(),st(),Ho=100,Uo=`[data-minerva-menu-item]`,Wo={mainAxis:4,crossAxis:-5},Go=e=>e.hasAttribute(`data-disabled`),Ko=e=>e.dataset.textValue??e.querySelector(`.text`)?.textContent??e.textContent??``,qo=e=>e?Array.from(e.querySelectorAll(Uo)):[],Jo=e=>Se(e,{preventScroll:!0}),Yo=e=>typeof e==`string`?e:void 0,Xo=e=>e.join(`/`),Zo=0,Qo=class{constructor(e,t,n){this.grace=xe(),this.typeahead=ye(),this.lastTypeahead=0,this.element=null,this.uid=null,this.path=[],this.position=new Hr(e,()=>n===0?{placement:t.rootPlacement(),offset:t.rootOffset(),padding:8}:{placement:t.direction===`rtl`?`left-start`:`right-start`,offset:Wo,padding:8}),this.layer=new Lr(e,()=>n===0?t.rootLayerOptions():t.subLayerOptions(n)),this.scope=new Gr(e,()=>({trapped:n===0&&t.isModal,autoFocus:!1,restoreFocus:!1}))}clearTimer(){clearTimeout(this.openTimer),this.openTimer=void 0}},$o=class extends N{constructor(...e){super(...e),this.items=[],this.open=!1,this.size=`medium`,this.keepOpen=!1,this.disabled=!1,this.nonModal=!1,this.noLoop=!1,this.declarative=[],this.openPath=[],this.exiting=[],this.stored=new Map,this.levels=[],this.modalController=new Rr(this),this.observer=null,this.intent=`content`,this.subIntent=`none`,this.restoreOverride=void 0,this.reason=`outside`,this.direction=`ltr`,this.onPanelKeyDown=e=>{let t=e.currentTarget,n=this.panelDepth(t),r=this.levels[n],{key:i}=e;if(i===`Tab`){e.preventDefault(),this.closeWithTab(e.shiftKey);return}if(e.defaultPrevented||!r||e.altKey||e.ctrlKey||e.metaKey)return;let a=qo(t),o=e.composedPath()[0],s=a.find(e=>e===o)??null,ee=s?a.indexOf(s):-1,te=this.direction===`rtl`,c=te?`ArrowLeft`:`ArrowRight`,ne=te?`ArrowRight`:`ArrowLeft`;if([`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(i)){e.preventDefault(),r.typeahead.reset();let t=We({currentIndex:ee,count:a.length,key:i,orientation:`vertical`,loop:!this.noLoop,isDisabled:e=>Go(a[e])});t!==null&&Jo(a[t]);return}if(i===c&&s?.hasAttribute(`aria-haspopup`)){e.preventDefault(),Go(s)||this.openSubmenu(n,s.dataset.uid??``,`first`);return}if(i===ne&&n>0){e.preventDefault(),Jo(this.parentItem(n)),this.closeSubmenu(n);return}if(i.length===1){let t=Date.now();t-r.lastTypeahead>500&&r.typeahead.reset();let n=r.typeahead.getBuffer()!==``;if(i!==` `||n){r.lastTypeahead=t,e.preventDefault();let n=r.typeahead.search(i,a.map(e=>({text:Ko(e),disabled:Go(e)})),ee);n!==-1&&Jo(a[n]);return}}(i===`Enter`||i===` `)&&s&&(e.preventDefault(),Go(s)||this.activateItem(s,`first`))},this.itemActions=new Map,this.highlightedItem=null,this.onPanelFocusIn=e=>{let t=e.composedPath()[0];t.matches?.(Uo)&&this.highlightItem(t,!0)},this.onPanelFocusOut=e=>{let t=e.composedPath()[0];t.matches?.(Uo)&&this.highlightItem(t,!1)}}static{this.styles=[j,zr,b`
:host{
display: contents;
}
`,F(Sr)]}onRootPointerDownOutside(e){}get isModal(){return!this.nonModal}get entries(){return this.items.length?this.items:this.declarative}show(){this.open=!0}hide(){this.open=!1}requestOpenChange(e,t){if(e===this.open)return!0;let n=this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0});return n&&(this.open=e,e||this.closeLevels()),n}openWith(e,t){this.intent=e,this.requestOpenChange(!0,t)}closeAll(e){this.requestOpenChange(!1,e)}closeWithTab(e){let t=this.restoreTarget(),n;if(t){let r=he().find(e=>e.element===this.levels[0]?.element)?.parent??document.body,i=Ve(r).filter(e=>e===t||!l(this,e)||!this.isPanelNode(e)),a=i.indexOf(t);n=a===-1?t:i[e?a-1:a+1]??t}this.restoreOverride=n??void 0,this.requestOpenChange(!1,`tab`)&&Jo(n)}isPanelNode(e){return this.levels.some(t=>l(t.element,e))}level(e){return this.levels[e]??=new Qo(this,this,e),this.levels[e]}parentItem(e){let t=this.openPath[e-1];return t?this.renderRoot.querySelector(`[data-uid="${t}"]`)??null:null}rootLayerOptions(){return{disableOutsidePointerEvents:this.isModal,branches:()=>this.branches(),onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:e=>{this.reason=`outside`,this.onRootPointerDownOutside(e),!e.defaultPrevented&&(!this.isModal||e.button===2)&&(this.restoreOverride=null)},onFocusOutside:e=>(this.reason=`focus-outside`,!this.isModal||(e.preventDefault(),!1)),onDismiss:()=>this.closeAll(this.reason)}}subLayerOptions(e){return{parent:this.levels[e-1]?.element??void 0,branches:()=>[this.parentItem(e)],onEscapeKeyDown:()=>{Jo(this.parentItem(e))},onDismiss:()=>this.closeSubmenu(e)}}closeLevels(e=0,t=!0){for(let n=this.levels.length-1;n>=e;n--){let e=this.levels[n],r=e.element;r&&(e.clearTimer(),e.grace.clear(),e.typeahead.reset(),e.scope.deactivate(),e.layer.deactivate(),e.position.end(),t&&this.isConnected?this.exit(r,n,e.path):S(r),e.element=null,e.uid=null,n===0&&(this.modalController.deactivate(),this.scheduleRestore()))}}exit(e,t,n){if(e.setAttribute(`data-state`,`closed`),Me(e)<=0){S(e);return}let r=++Zo,i=Xo(n);this.exiting=[...this.exiting.filter(e=>Xo(e.path)!==i),{id:r,depth:t,path:n}],je(e).then(()=>{this.exiting.some(e=>e.id===r)&&(S(e),this.exiting=this.exiting.filter(e=>e.id!==r))})}clearExiting(){if(this.exiting.length!==0){for(let e of this.exiting)S(this.renderRoot.querySelector(`[data-panel-key="${Xo(e.path)}"]`));this.exiting=[]}}scheduleRestore(){let e=this.restoreOverride;this.restoreOverride=void 0;let t=e===void 0?this.restoreTarget():e;t&&setTimeout(()=>{if(this.open||!t.isConnected)return;let e=a(document);(!e||e===document.body||!e.isConnected||(this.shadowRoot?.contains(e)??!1))&&Jo(t)},0)}syncLevels(){let e=this.open&&!this.disabled?this.openPath.length+1:0;this.closeLevels(e);for(let t=0;t<e;t++){let e=t===0?``:this.openPath[t-1],n=this.renderRoot.querySelector(`[data-panel-key="${Xo(this.openPath.slice(0,t))}"]`);if(!n)return;let r=this.level(t);if(r.element===n&&r.uid===e)continue;r.element&&this.closeLevels(t);let i=t===0?this.anchorElement():this.parentItem(t);if(!i)return;r.element=n,r.uid=e,r.path=this.openPath.slice(0,t),n.setAttribute(`data-state`,`open`),kr(n),r.position.start(i,n),t===0&&this.isModal&&this.modalController.activate(this),r.layer.activate(n),r.scope.activate(n);let a=t===0?this.intent:this.subIntent;t===0?this.intent=`content`:this.subIntent=`none`,this.focusIntent(n,a)}}focusIntent(e,t){if(t===`none`)return;let n=qo(e).filter(e=>!Go(e));Jo((t===`first`?n[0]:t===`last`?n[n.length-1]:void 0)??e)}reanchor(){let e=this.levels[0],t=this.anchorElement();e?.element&&t&&e.position.start(t,e.element)}openSubmenu(e,t,n){if(this.openPath[e]===t&&this.levels[e+1]?.element){n===`first`&&Jo(qo(this.levels[e+1].element).find(e=>!Go(e)));return}this.subIntent=n,this.openPath=[...this.openPath.slice(0,e),t]}closeSubmenu(e){this.openPath.length<e||(this.closeLevels(e),this.openPath=this.openPath.slice(0,e-1))}stateOf(e,t){return this.stored.has(e)?this.stored.get(e):t}isChecked(e){return e.element?e.element.hasAttribute(`checked`):this.stateOf(e.key,e.checked??e.defaultChecked??!1)}radioValue(e){return e.items.some(e=>e.element)?e.items.find(e=>e.element?.hasAttribute(`checked`))?.value:this.stateOf(e.key,e.value??e.defaultValue)}activateAction(e){this.emit(`minerva-select`,{value:e.key,item:e},{cancelable:!0})&&(e.closeOnSelect??!this.keepOpen)&&this.closeAll(`select`)}toggleCheckbox(e){let t=!this.isChecked(e);this.emit(`minerva-change`,{value:e.key,checked:t,item:e},{cancelable:!0})&&(e.element?e.element.toggleAttribute(`checked`,t):this.stored.set(e.key,t),this.requestUpdate()),e.closeOnSelect&&this.closeAll(`select`)}chooseRadio(e,t){let n=this.radioValue(e);if(t.value!==n&&this.emit(`minerva-change`,{value:t.value,group:e.key,item:t},{cancelable:!0})){if(t.element)for(let n of e.items)n.element?.toggleAttribute(`checked`,n===t);else this.stored.set(e.key,t.value);this.requestUpdate()}(e.closeOnSelect||t.closeOnSelect)&&this.closeAll(`select`)}panelDepth(e){return Number(e.dataset.level??0)}activateItem(e,t){this.itemActions.get(e.dataset.uid??``)?.(t)}highlightItem(e,t){t?this.highlightedItem=e.dataset.uid??null:this.highlightedItem===e.dataset.uid&&(this.highlightedItem=null),e.toggleAttribute(`data-highlighted`,t),e.setAttribute(`part`,jn(`item`,{state:e.dataset.state,highlighted:t,disabled:e.hasAttribute(`data-disabled`),expanded:e.hasAttribute(`data-expanded`)}))}onItemClick(e){let t=e.currentTarget;Go(t)||this.activateItem(t,`none`)}onItemPointerMove(e){let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i||e.pointerType===`touch`||i.grace.isInGraceArea({x:e.clientX,y:e.clientY}))return;i.grace.clear();let o=a(document);if(Go(t)){o!==n&&Jo(n);return}o!==t&&Jo(t);let s=t.dataset.uid??``;t.hasAttribute(`aria-haspopup`)&&this.openPath[r]!==s&&i.openTimer===void 0&&(i.openTimer=setTimeout(()=>{i.openTimer=void 0,this.open&&this.openSubmenu(r,s,`none`)},100))}onItemPointerLeave(e){if(e.pointerType===`touch`)return;let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i)return;i.clearTimer();let o=this.levels[r+1]?.element;if(t.hasAttribute(`aria-haspopup`)&&this.openPath[r]===t.dataset.uid&&o){let t=o.getAttribute(`data-side`)??`right`;i.grace.start({x:e.clientX,y:e.clientY},o.getBoundingClientRect(),t);return}i.grace.isInGraceArea({x:e.clientX,y:e.clientY})||a(document)===t&&Jo(n)}readEntries(){this.declarative=Do(this)}connectedCallback(){super.connectedCallback(),this.readEntries(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(e=>{e.some(e=>Lo(e.target)||Array.from(e.addedNodes).some(Lo)||Array.from(e.removedNodes).some(e=>e.nodeType===1&&e.localName.startsWith(`minerva-menu-`)))&&this.readEntries()}),this.observer.observe(this,{subtree:!0,childList:!0,attributes:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.closeLevels(0,!1),this.clearExiting()}willUpdate(e){if(e.has(`items`)&&(this.stored=new Map,E&&this.checkKeys(this.items)),e.has(`open`)&&this.open){let e=this.anchorElement(),t=e&&`nodeType`in e?e:this;this.direction=this.isConnected?ae(t):`ltr`}e.has(`open`)&&!this.open&&(this.openPath=[]);let t=this.open&&!this.disabled?this.openPath.length+1:0,n=this.levels.findIndex((e,n)=>e.element!==null&&(n>=t||Xo(e.path)!==Xo(this.openPath.slice(0,n))));if(n!==-1&&this.closeLevels(n),this.exiting.length){let e=this.openKeys();this.exiting.some(t=>e.has(Xo(t.path)))&&(this.exiting=this.exiting.filter(t=>!e.has(Xo(t.path))))}}openKeys(){return!this.open||this.disabled?new Set:new Set([[],...this.openPath.map((e,t)=>this.openPath.slice(0,t+1))].map(Xo))}checkKeys(e,t=new Set){for(let n of e)if(!(`type`in n&&n.type===`separator`)){if(`type`in n&&(n.type===`group`||n.type===`label`)){n.type===`group`&&this.checkKeys(n.items,t);continue}t.has(n.key)&&P(this.constructor.tagName,`duplicate item key "${n.key}": keys must be unique (checkbox / radio state and minerva-select values are keyed by it).`),t.add(n.key),!(`type`in n)&&n.children&&this.checkKeys(n.children,t)}}hookStates(){let e=this.levels[0]?.position.running?this.levels[0].position.placement:this.rootPlacement();return{state:this.open&&!this.disabled?`open`:`closed`,disabled:this.disabled,size:this.size,...Te(e),placement:e}}updated(e){this.syncTrigger(),(e.has(`open`)||e.has(`openPath`)||e.has(`disabled`))&&this.syncLevels()}renderPanels(){let e=this.open&&!this.disabled;if(!e&&this.exiting.length===0)return p;this.itemActions.clear();let t=[];e&&(t.push({key:``,depth:0,path:[],state:`open`}),this.openPath.forEach((e,n)=>{let r=this.openPath.slice(0,n+1);t.push({key:Xo(r),depth:n+1,path:r,state:`open`})}));let n=new Set(t.map(e=>e.key));for(let e of this.exiting){let r=Xo(e.path);n.has(r)||(n.add(r),t.push({key:r,depth:e.depth,path:e.path,state:`closed`}))}return et(t,e=>e.key,e=>this.renderPanelAt(e.depth,e.path,e.state))}renderPanelAt(e,t,n){let r=this.entries,i=e===0?this.rootLabel():void 0;for(let[e,n]of t.entries()){let t=this.findSubmenu(r,n,`${e}:`);if(!t)return p;r=t.children??[],i=Yo(t.label)??t.textValue}return this.renderPanel(e,t.at(-1)??``,r,i,n,Xo(t))}findSubmenu(e,t,n){for(let[r,i]of e.entries()){let e=`${n}${r}`;if(`type`in i){if(i.type===`group`){let n=this.findSubmenu(i.items,t,`${e}.`);if(n)return n}continue}if(i.children?.length&&e===t)return i}return null}renderPanel(e,t,n,r,i,a){let o=e===0?``:`item-${t}`;return m`<div
part="content"
id=${e===0?`menu`:`menu-${t}`}
class=${v({content:!0,small:this.size===`small`})}
popover="manual"
role="menu"
aria-orientation="vertical"
aria-label=${e===0?r??p:p}
aria-labelledby=${e>0?o:p}
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
</div>`}renderEntries(e,t,n){return e.map((e,r)=>{let i=`${n}${r}`;if(`type`in e)switch(e.type){case`separator`:return m`<div
role="separator"
aria-orientation="horizontal"
class="separator"
part="separator"
></div>`;case`label`:return m`<div class="label" part="label">${e.label}</div>`;case`group`:{let n=`label-${i.replace(/[:.]/g,`-`)}`;return m`<div
role="group"
part="group"
aria-labelledby=${n}
>
<div id=${n} class="label" part="label">${e.label}</div>
${this.renderEntries(e.items,t,`${i}.`)}
</div>`}case`checkbox`:return this.renderCheckbox(e,i);case`radio-group`:return this.renderRadioGroup(e,i)}return this.renderAction(e,t,i)})}renderItem(e){let{uid:t,disabled:n=!1,submenu:r}=e;this.itemActions.set(t,e.activate);let i=e.textValue??Yo(e.label),a={state:e.checked===void 0?void 0:e.checked?`checked`:`unchecked`,highlighted:this.highlightedItem===t,disabled:n,expanded:r?.open};return m`<div
id=${`item-${t}`}
part=${jn(`item`,a)}
role=${e.role}
tabindex="-1"
class="item"
data-minerva-menu-item=""
data-uid=${t}
data-text-value=${i??p}
data-state=${a.state??p}
?data-highlighted=${a.highlighted}
?data-disabled=${n}
?data-expanded=${r?.open}
aria-disabled=${n?`true`:p}
aria-checked=${e.checked===void 0?p:String(e.checked)}
aria-haspopup=${r?`menu`:p}
aria-expanded=${r?String(r.open):p}
aria-controls=${r?.open?`menu-${t}`:p}
@click=${this.onItemClick}
@pointermove=${this.onItemPointerMove}
@pointerleave=${this.onItemPointerLeave}
>
${e.indicator??p}
${e.icon?m`<span class="icon" part="icon" aria-hidden="true"
>${e.icon}</span
>`:p}
<span class="text" part="item-label">${e.label}</span>
${e.shortcut?m`<span class="shortcut" part="shortcut">${e.shortcut}</span>`:p}
${e.trailing??p}
</div>`}renderAction(e,t,n){if(e.children?.length){let r=this.openPath[t]===n&&!e.disabled;return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,submenu:{open:r},trailing:m`<span class="chevron" aria-hidden="true"
>${Gt}</span
>`,activate:e=>this.openSubmenu(t,n,e)})}return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,activate:()=>this.activateAction(e)})}renderCheckbox(e,t){let n=this.isChecked(e);return this.renderItem({uid:t,role:`menuitemcheckbox`,label:e.label,textValue:e.textValue,shortcut:e.shortcut,disabled:e.disabled,checked:n,indicator:m`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${n?Sn:p}</span
>`,activate:()=>this.toggleCheckbox(e)})}renderRadioGroup(e,t){let n=this.radioValue(e),r=`label-${t.replace(/[:.]/g,`-`)}`,i=e.label!=null&&e.label!==``;return m`<div
role="group"
part="group"
aria-labelledby=${i?r:p}
>
${i?m`<div id=${r} class="label" part="label">${e.label}</div>`:p}
${e.items.map((r,i)=>{let a=r.value===n;return this.renderItem({uid:`${t}.${i}`,role:`menuitemradio`,label:r.label,textValue:r.textValue,shortcut:r.shortcut,disabled:r.disabled,checked:a,indicator:m`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${a?m`<span class="dot"></span>`:p}</span
>`,activate:()=>this.chooseRadio(e,r)})})}
</div>`}},L([g({attribute:!1})],$o.prototype,`items`,void 0),L([g({type:Boolean,reflect:!0})],$o.prototype,`open`,void 0),L([g({reflect:!0})],$o.prototype,`size`,void 0),L([g({type:Boolean,attribute:`keep-open`})],$o.prototype,`keepOpen`,void 0),L([g({type:Boolean,reflect:!0})],$o.prototype,`disabled`,void 0),L([g({type:Boolean,reflect:!0,attribute:`non-modal`})],$o.prototype,`nonModal`,void 0),L([g({type:Boolean,attribute:`no-loop`})],$o.prototype,`noLoop`,void 0),L([f()],$o.prototype,`declarative`,void 0),L([f()],$o.prototype,`openPath`,void 0),L([f()],$o.prototype,`exiting`,void 0)})))()}function ts(e,t,n){n===null?e.hasAttribute(t)&&e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}var ns,rs;function is(){return(is=e((()=>{M(),Vo(),es(),u(),d(),c(),ns={mainAxis:6,crossAxis:0},rs=class e extends $o{constructor(...e){super(...e),this.side=`bottom`,this.align=`end`,this.disabledTrigger=null,this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.fromTrigger(e)))switch(e.key){case`Enter`:case` `:e.preventDefault(),this.open?this.requestOpenChange(!1,`trigger`):this.openWith(`first`,`keyboard`);break;case`ArrowDown`:e.preventDefault(),this.openWith(`first`,`keyboard`);break;case`ArrowUp`:e.preventDefault(),this.openWith(`last`,`keyboard`)}},this.handleClick=e=>{this.disabled||e.defaultPrevented||!this.fromTrigger(e)||(this.open?this.requestOpenChange(!1,`trigger`):this.openWith(e.detail===0?`first`:`content`,`trigger`))}}static{this.tagName=`minerva-menu`}static{this.dependencies=[ko,Ao,jo,Mo,No,Po]}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorElement(){return this.triggerElement()}rootPlacement(){return Le(this.side,this.align)}rootOffset(){return ns}restoreTarget(){return this.triggerElement()}branches(){return[this.triggerElement()]}rootLabel(){let e=this.getAttribute(`aria-label`);if(e)return e;let t=this.triggerElement();return t?.getAttribute(`aria-label`)??(t?.textContent?.trim()||void 0)}syncTrigger(){let e=this.triggerElement();e&&(ts(e,`aria-haspopup`,`menu`),ts(e,`aria-expanded`,String(this.open)),ts(e,`data-state`,this.open?`open`:`closed`),ts(e,`data-disabled`,this.disabled?``:null),this.disabled&&!e.hasAttribute(`disabled`)?(e.setAttribute(`disabled`,``),this.disabledTrigger=e):!this.disabled&&this.disabledTrigger===e&&(e.removeAttribute(`disabled`),this.disabledTrigger=null))}fromTrigger(e){let t=this.triggerElement();return!!t&&e.composedPath().includes(t)}connectedCallback(){super.connectedCallback(),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick)}firstUpdated(t){super.firstUpdated(t),E&&!this.triggerElement()&&P(e.tagName,`no slot="trigger" element: nothing opens the menu (add e.g. <button slot="trigger">).`)}render(){return m`<slot name="trigger"></slot>${this.renderPanels()}`}},L([g({reflect:!0})],rs.prototype,`side`,void 0),L([g({reflect:!0})],rs.prototype,`align`,void 0)})))()}var as,os,ss,cs,ls;function us(){return(us=e((()=>{gn(),Vo(),es(),is(),u(),c(),as=700,os={mainAxis:2,crossAxis:0},ss={mainAxis:4,crossAxis:0},cs=(e,t,n)=>({contextElement:n,getBoundingClientRect:()=>({x:e,y:t,left:e,top:t,right:e,bottom:t,width:0,height:0})}),ls=class extends $o{constructor(...e){super(...e),this.position=null,this.restoreTo=null,this.areaPointerEvents=null,this.handleContextMenu=e=>{this.disabled||e.defaultPrevented||!this.inArea(e)||(e.preventDefault(),this.clearLongPress(),this.openAtPoint(e.clientX,e.clientY))},this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.inArea(e))&&(e.key===`ContextMenu`||e.shiftKey&&e.key===`F10`)){let t=this.area();if(!t)return;e.preventDefault();let n=ae(t)===`rtl`;this.openAt({anchor:t,placement:n?`bottom-end`:`bottom-start`,offset:ss})}},this.handlePointerDown=e=>{if(this.disabled||e.pointerType!==`touch`||!this.inArea(e))return;this.clearLongPress();let{clientX:t,clientY:n}=e;this.longPress=setTimeout(()=>{this.longPress=void 0,this.openAtPoint(t,n)},700)},this.handleTouchEnd=e=>{e.pointerType===`touch`&&this.clearLongPress()}}static{this.tagName=`minerva-context-menu`}static{this.dependencies=[ko,Ao,jo,Mo,No,Po]}static{this.styles=[...$o.styles,b`
:host(:not([disabled])) ::slotted(*){
-webkit-touch-callout: none;
}
`]}area(){return Array.from(this.children).find(e=>!Fo.includes(e.localName))??null}anchorElement(){return this.position?.anchor??null}rootPlacement(){return this.position?.placement??`right-start`}rootOffset(){return this.position?.offset??os}restoreTarget(){return this.restoreTo}branches(){return[]}rootLabel(){return this.getAttribute(`aria-label`)??void 0}onRootPointerDownOutside(e){let t=this.area(),n=e.composedPath()[0];e.button===2&&t&&n instanceof Node&&l(t,n)&&e.preventDefault()}syncTrigger(){let e=this.area();if(!e)return;ts(e,`data-state`,this.open?`open`:`closed`),ts(e,`data-disabled`,this.disabled?``:null);let t=this.open&&this.isModal&&!this.disabled;t&&this.areaPointerEvents===null?(this.areaPointerEvents=e.style.pointerEvents,e.style.pointerEvents=`auto`):!t&&this.areaPointerEvents!==null&&(e.style.pointerEvents=this.areaPointerEvents,this.areaPointerEvents=null)}openAt(e){let t=this.area();if(t){if(!this.open){let e=a(document);this.restoreTo=e instanceof HTMLElement&&l(t,e)?e:t}if(this.position=e,this.open){this.reanchor();return}this.openWith(`first`,`contextmenu`)}}openAtPoint(e,t){let n=this.area();if(!n)return;let r=ae(n)===`rtl`;this.openAt({anchor:cs(e,t,n),placement:r?`left-start`:`right-start`,offset:os})}inArea(e){let t=this.area(),n=e.composedPath()[0];return!!t&&n instanceof Node&&l(t,n)}clearLongPress(){clearTimeout(this.longPress),this.longPress=void 0}connectedCallback(){super.connectedCallback(),this.addEventListener(`contextmenu`,this.handleContextMenu),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`pointerdown`,this.handlePointerDown),this.addEventListener(`pointermove`,this.handleTouchEnd),this.addEventListener(`pointerup`,this.handleTouchEnd),this.addEventListener(`pointercancel`,this.handleTouchEnd)}disconnectedCallback(){super.disconnectedCallback(),this.clearLongPress(),this.removeEventListener(`contextmenu`,this.handleContextMenu),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`pointerdown`,this.handlePointerDown),this.removeEventListener(`pointermove`,this.handleTouchEnd),this.removeEventListener(`pointerup`,this.handleTouchEnd),this.removeEventListener(`pointercancel`,this.handleTouchEnd)}render(){return m`<slot></slot>${this.renderPanels()}`}}})))()}var ds,X;function fs(){return(fs=e((()=>{A(),C(),I(),k(),T(),Jn(),qr(),Cr(),Un(),Hn(),u(),d(),h(),c(),de(),it(),ds=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],X=class extends zn{constructor(...e){super(...e),this.name=`date-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.draft=null,this.month=se(new Date),this.focusedKey=``,this.dirty=!1,this.pendingFocus=!1,this.i18n=new w(this),this.aria=new x(this,()=>this.labels),this.floating=new Ur(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0}))}static{this.tagName=`minerva-date-picker`}static{this.shadowRootOptions={...zn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,zr,b`
:host{
display: inline-block;
vertical-align: middle;
}
.datePicker .root{
width: 100%;
}
`,F(nr),F(ar),F(Rn)]}get valueAsDate(){return oe(this.value||``,!0)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}get interactive(){return!this.isDisabled&&!this.readOnly}allowed(e){return!!oe(e,!0)&&(!this.minDate||e>=this.minDate)&&(!this.maxDate||e<=this.maxDate)}getFormValue(){return this.valueAsDate?Ke(this.valueAsDate):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.i18n.t(`validation.valueMissing`),anchor:this.input}:this.valueAsDate&&!this.allowed(this.value)?{flags:{customError:!0},message:[this.minDate,this.maxDate].filter(Boolean).join(` – `),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue,this.open=!1}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open&&(this.month=se(this.valueAsDate??new Date),this.focusedKey=Ke(this.valueAsDate??new Date))}updated(e){super.updated(e),this.floating.sync(this.open&&this.interactive),this.open&&this.pendingFocus&&(this.popup?.querySelector(`[data-date="${this.focusedKey}"]`)?.focus(),this.pendingFocus=!1)}requestOpenChange(e){if(e&&!this.interactive)return!1;if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){!this.interactive||e&&!this.allowed(e)||(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleInput(e){if(!this.interactive)return;let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t}),(!t||this.allowed(t))&&(this.commit(t),t&&(this.month=se(oe(t))))}handleBlur(){if(this.draft===null)return;let e=oe(this.draft.trim(),!1),t=e?Ke(e):``;this.draft.trim()?e&&this.allowed(t)&&t!==this.value&&(this.commit(t),this.month=se(e)):this.value&&this.commit(``),this.draft=null}handleClear(){this.interactive&&(this.draft=null,this.commit(``),this.emit(`minerva-clear`),this.input?.focus())}handleInputClick(){this.requestOpenChange(!this.open)}handleInputKeyDown(e){e.key===`ArrowDown`&&this.interactive&&(e.preventDefault(),this.pendingFocus=!0,this.open?this.requestUpdate():this.requestOpenChange(!0)||(this.pendingFocus=!1))}select(e){this.interactive&&this.allowed(Ke(e))&&(this.draft=null,this.commit(Ke(e)),this.requestOpenChange(!1),this.input?.focus())}handleDayKeyDown(e,t){if(!this.interactive)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=Je(e.key,this),r=(t.getDay()+6)%7,i;switch(n){case`ArrowLeft`:i=o(t,-1);break;case`ArrowRight`:i=o(t,1);break;case`ArrowUp`:i=o(t,-7);break;case`ArrowDown`:i=o(t,7);break;case`Home`:i=o(t,-r);break;case`End`:i=o(t,6-r);break;case`PageUp`:case`PageDown`:{let r=se(t,(n===`PageUp`?-1:1)*(e.shiftKey?12:1));i=ee(r.getFullYear(),r.getMonth(),Math.min(t.getDate(),o(se(r,1),-1).getDate()));break}default:return}e.preventDefault(),this.focusedKey=Ke(i),this.month=se(i),this.pendingFocus=!0}renderPanel(e){let t=this.i18n.t,n=se(this.month),r=o(n,-((n.getDay()+6)%7)),i=Array.from({length:42},(e,t)=>o(r,t)),a=i.map(Ke).includes(this.focusedKey)?this.focusedKey:Ke(n),s;try{s=new Intl.DateTimeFormat(this.locale??this.i18n.language,{month:`long`,year:`numeric`}).format(n)}catch{s=Ke(n).slice(0,7)}return m`<div
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
<h2 id="heading" class="heading" aria-live="polite">${s}</h2>
<div class="navGroup">
<button
type="button"
class="navButton"
aria-label=${t(`monthCalendar.previousMonth`)}
@click=${()=>{this.month=se(n,-1)}}
>
${vn}
</button>
<button
type="button"
class="navButton"
aria-label=${t(`monthCalendar.nextMonth`)}
@click=${()=>{this.month=se(n,1)}}
>
${Gt}
</button>
</div>
</div>
<div class="grid" role="grid" aria-labelledby="heading">
<div class="week" role="row">
${ds.map(e=>m`<div class="weekday" role="columnheader">${t(`monthCalendar.weekdays.${e}`)}</div>`)}
</div>
${Array.from({length:6},(e,t)=>m`<div class="week" role="row">
${i.slice(t*7,t*7+7).map(e=>{let t=Ke(e);return m`<div
part="day"
class="day"
role="gridcell"
data-date=${t}
?data-outside=${!ve(e,n)}
aria-label=${t}
aria-selected=${String(t===this.value)}
aria-disabled=${this.allowed(t)?p:`true`}
aria-current=${t===Ke(new Date)?`date`:p}
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
${!this.hideClearButton&&this.value?m`<button
class="footerButton"
type="button"
@click=${()=>{this.handleClear(),this.requestOpenChange(!1)}}
>
${t(`datePicker.clear`)}
</button>`:p}
<button
class="footerButton"
type="button"
?disabled=${!this.allowed(Ke(new Date))}
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
</div>`}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?Te(e):{side:void 0,align:void 0};return{placement:e,side:t,align:n,state:this.open&&this.interactive?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size}}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=Ve(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=Ve(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{l(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!l(this,e))??null}render(){let{t:e}=this.i18n,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`datePicker.label`),a=this.draft??(r?Ke(r):``),o=!this.hideClearButton&&!!r&&!t&&!n;return m`<div part="root" class="datePicker">
<div
part="control"
class=${v({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
.value=${nt(a)}
placeholder=${this.placeholder??e(`datePicker.placeholder`)}
?disabled=${t}
?readonly=${n}
?required=${this.required}
autocomplete="off"
aria-label=${i}
aria-description=${this.aria.description??p}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:p}
aria-readonly=${n?`true`:p}
@input=${this.handleInput}
@blur=${this.handleBlur}
@click=${this.handleInputClick}
@keydown=${this.handleInputKeyDown}
/>
<span class="addon end">
${o?m`<button
part="clear-button"
type="button"
class="iconButton neutral variant-ghost small circle clearButton"
aria-label=${e(`datePicker.clear`)}
@click=${this.handleClear}
>
${un}
</button>`:m`<span part="icon" class="calendarIcon" aria-hidden="true"
>${Qn}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(i):p}`}},L([g({reflect:!0})],X.prototype,`name`,void 0),L([g({attribute:!1})],X.prototype,`value`,void 0),L([g({attribute:`value`})],X.prototype,`defaultValue`,void 0),L([g({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),L([g()],X.prototype,`label`,void 0),L([g()],X.prototype,`placeholder`,void 0),L([g()],X.prototype,`locale`,void 0),L([g({reflect:!0})],X.prototype,`size`,void 0),L([g({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),L([g({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),L([g({type:Boolean,attribute:`hide-clear-button`})],X.prototype,`hideClearButton`,void 0),L([g({attribute:`min-date`})],X.prototype,`minDate`,void 0),L([g({attribute:`max-date`})],X.prototype,`maxDate`,void 0),L([f()],X.prototype,`draft`,void 0),L([f()],X.prototype,`month`,void 0),L([f()],X.prototype,`focusedKey`,void 0),L([_(`input`)],X.prototype,`input`,void 0),L([_(`.datePicker`)],X.prototype,`field`,void 0),L([_(`.popup`)],X.prototype,`popup`,void 0)})))()}var ps,ms;function hs(){return(hs=e((()=>{k(),u(),d(),Qe(),ps=e=>typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,ms=class extends N{constructor(...e){super(...e),this.engine=null,this.offs=[]}static{this.styles=[j,b`
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
`]}get instance(){return this.engine}get defaultHeight(){return 320}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.mountEngine()}disconnectedCallback(){super.disconnectedCallback(),this.unmountEngine()}updated(e){if(super.updated(e),!this.engine){this.mountEngine();return}if([...e.keys()].every(e=>e===`height`))return;if(this.syncEngine){this.syncEngine(this.engine,e);return}let t=this.engineOptions();t&&this.engine.setOptions(t)}mountEngine(){if(this.engine||!this.isConnected)return;let e=this.renderRoot.querySelector(`[part=surface]`),t=e?this.engineOptions():null;if(!e||!t)return;let n=this.createEngine(e,t);this.engine=n,this.offs=this.bindEngine?.(n)??[],this.engineMounted?.(n)}unmountEngine(){for(let e of this.offs)e();this.offs=[],this.engine?.destroy(),this.engine=null}render(){return m`<div
part="root"
class="root"
style=${y({height:ps(this.height??this.defaultHeight)})}
>
<div part="surface" class="surface"></div>
</div>`}},L([g()],ms.prototype,`height`,void 0)})))()}var gs,_s,vs,ys,bs;function xs(){return(xs=e((()=>{hs(),d(),Et(),gs=class extends ms{constructor(...e){super(...e),this.height=400}createEngine(e,t){return Dt(e,t)}engineOptions(){return this.series?{...this.options,series:this.typed(this.series)}:null}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-point-click`,e)),e.on(`camera`,e=>this.emit(`minerva-camera-change`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}resetCamera(){this.instance?.resetCamera()}getCamera(){return this.instance?.getCamera()??null}setCamera(e){this.instance?.setCamera(e)}getRenderer(){return this.instance?.getRenderer()??null}},L([g()],gs.prototype,`height`,void 0),L([g({attribute:!1})],gs.prototype,`series`,void 0),L([g({attribute:!1})],gs.prototype,`options`,void 0),_s=class extends gs{static{this.tagName=`minerva-scatter-3d-chart`}typed(e){return e.map(e=>({...e,type:`scatter`}))}},vs=class extends gs{static{this.tagName=`minerva-line-3d-chart`}typed(e){return e.map(e=>({...e,type:`line`}))}},ys=class extends gs{static{this.tagName=`minerva-surface-3d-chart`}typed(e){return e.map(e=>({...e,type:`surface`,wireframe:e.wireframe??this.wireframe,contours:e.contours??this.contours}))}},L([g({attribute:!1})],ys.prototype,`wireframe`,void 0),L([g({attribute:!1})],ys.prototype,`contours`,void 0),bs=class extends gs{constructor(...e){super(...e),this.barWidth=.7}static{this.tagName=`minerva-bar-3d-chart`}typed(e){return e.map(e=>({...e,type:`bar`,barWidth:e.barWidth??this.barWidth}))}},L([g({type:Number,attribute:`bar-width`})],bs.prototype,`barWidth`,void 0)})))()}var Ss,Cs;function ws(){return(ws=e((()=>{hs(),d(),pt(),Ss=class extends ms{constructor(...e){super(...e),this.height=320}createEngine(e,t){return ft(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.pointClicked(e)),e.on(`plotClick`,e=>this.plotClicked(e)),e.on(`zoom`,e=>this.emit(`minerva-zoom`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e})),e.on(`drag`,e=>this.pointDragged?.(e)),e.on(`drop`,e=>this.pointDropped?.(e))]}pointClicked(e){this.emit(`minerva-point-click`,e)}plotClicked(e){this.emit(`minerva-plot-click`,e)}resetZoom(){this.instance?.resetZoom()}getView(){return this.instance?.getView()??null}setView(e){this.instance?.setView(e)}getRenderer(){return this.instance?.getRenderer()??null}},L([g()],Ss.prototype,`height`,void 0),Cs=class extends Ss{static{this.tagName=`minerva-chart`}engineOptions(){return this.options??null}},L([g({attribute:!1})],Cs.prototype,`options`,void 0)})))()}var Ts;function Es(){return(Es=e((()=>{Ts=(e,t,n,r)=>e.map(e=>{let i=e.type??t;return{...e,type:i,...n!==void 0&&i===t?{stack:e.stack??n}:{},...r!==void 0&&(i===`line`||i===`area`)?{curve:e.curve??r}:{}}})})))()}var Ds,Os,ks,As,js,Ms,Ns,Ps,Fs,Z;function Is(){return(Is=e((()=>{ws(),Es(),d(),ht(),Ds=class extends Ss{stackMode(){return this.options?.stackMode}engineOptions(){let e=this.series??this.options?.series;return e?{...this.options,series:this.typed(e),stackMode:this.stackMode()}:null}},L([g({attribute:!1})],Ds.prototype,`series`,void 0),L([g({attribute:!1})],Ds.prototype,`options`,void 0),Os=class extends Ds{constructor(...e){super(...e),this.area=!1,this.curve=`linear`,this.stacked=!1,this.percent=!1}static{this.tagName=`minerva-line-chart`}typed(e){return Ts(e,this.area?`area`:`line`,this.stacked||this.percent?`stack`:void 0,this.curve)}stackMode(){return this.percent?`percent`:super.stackMode()}},L([g({type:Boolean})],Os.prototype,`area`,void 0),L([g()],Os.prototype,`curve`,void 0),L([g({type:Boolean})],Os.prototype,`stacked`,void 0),L([g({type:Boolean})],Os.prototype,`percent`,void 0),ks=class extends Ds{constructor(...e){super(...e),this.curve=`smooth`,this.stacked=!1,this.percent=!1}static{this.tagName=`minerva-area-chart`}typed(e){return Ts(e,`area`,this.stacked||this.percent?`stack`:void 0,this.curve)}stackMode(){return this.percent?`percent`:super.stackMode()}},L([g()],ks.prototype,`curve`,void 0),L([g({type:Boolean})],ks.prototype,`stacked`,void 0),L([g({type:Boolean})],ks.prototype,`percent`,void 0),As=class extends Ds{constructor(...e){super(...e),this.stacked=!1,this.percent=!1,this.labels=!1}static{this.tagName=`minerva-bar-chart`}typed(e){return Ts(e,`bar`,this.stacked||this.percent?`stack`:void 0).map(e=>this.labels&&e.type===`bar`?{...e,showLabels:e.showLabels??!0}:e)}stackMode(){return this.percent?`percent`:super.stackMode()}},L([g({type:Boolean})],As.prototype,`stacked`,void 0),L([g({type:Boolean})],As.prototype,`percent`,void 0),L([g({type:Boolean})],As.prototype,`labels`,void 0),js=class extends Ds{static{this.tagName=`minerva-scatter-chart`}typed(e){return Ts(e,`scatter`)}},Ms=class extends Ds{static{this.tagName=`minerva-candlestick-chart`}typed(e){return Ts(e,`candlestick`)}},Ns=class extends Ss{constructor(...e){super(...e),this.colorScale=`sequential`}static{this.tagName=`minerva-heatmap-chart`}engineOptions(){return this.data?yt({data:this.data,xCategories:this.xCategories,yCategories:this.yCategories,colorScale:this.colorScale,valueRange:this.valueRange,colorMidpoint:this.colorMidpoint,name:this.valueName,radius:this.radius,format:this.format},this.options):null}},L([g({attribute:!1})],Ns.prototype,`data`,void 0),L([g({attribute:!1})],Ns.prototype,`xCategories`,void 0),L([g({attribute:!1})],Ns.prototype,`yCategories`,void 0),L([g({attribute:`color-scale`})],Ns.prototype,`colorScale`,void 0),L([g({attribute:!1})],Ns.prototype,`valueRange`,void 0),L([g({type:Number,attribute:`color-midpoint`})],Ns.prototype,`colorMidpoint`,void 0),L([g({attribute:`value-name`})],Ns.prototype,`valueName`,void 0),L([g({type:Number})],Ns.prototype,`radius`,void 0),L([g({attribute:!1})],Ns.prototype,`format`,void 0),L([g({attribute:!1})],Ns.prototype,`options`,void 0),Ps=class extends Ss{constructor(...e){super(...e),this.height=48,this.type=`line`,this.curve=`smooth`}static{this.tagName=`minerva-sparkline`}engineOptions(){return this.data?bt({data:this.data,type:this.type,color:this.color,curve:this.curve,name:this.valueName,reference:this.reference,format:this.format},this.options):null}},L([g()],Ps.prototype,`height`,void 0),L([g({attribute:!1})],Ps.prototype,`data`,void 0),L([g()],Ps.prototype,`type`,void 0),L([g()],Ps.prototype,`color`,void 0),L([g()],Ps.prototype,`curve`,void 0),L([g({type:Number})],Ps.prototype,`reference`,void 0),L([g({attribute:`value-name`})],Ps.prototype,`valueName`,void 0),L([g({attribute:!1})],Ps.prototype,`format`,void 0),L([g({attribute:!1})],Ps.prototype,`options`,void 0),Fs=400,Z=class extends Ss{constructor(...e){super(...e),this.reverseX=!1,this.hideTicks=!1,this.hideLabels=!1,this.pointSize=12,this.dragPoints=!1,this.lastClick=null}static{this.tagName=`minerva-quadrant-chart`}geometry(){return{xDomain:this.xDomain,yDomain:this.yDomain,xSplit:this.xSplit,ySplit:this.ySplit,reverseX:this.reverseX}}engineOptions(){return this.points?Ct({...this.geometry(),points:this.points,quadrants:this.quadrants,xLabel:this.xLabel,yLabel:this.yLabel,axisLabels:this.axisLabels,showTicks:!this.hideTicks,showLabels:!this.hideLabels,pointSize:this.pointSize,draggable:this.dragPoints},this.options):null}pointClicked(e){let t=e.items[0]?.index,n=t===void 0?void 0:this.points?.[t];if(!n||t===void 0)return;let r=Date.now(),i=this.lastClick,a=i?.index===t&&r-i.time<Fs;this.lastClick=a?null:{index:t,time:r},this.emit(`minerva-point-click`,{point:n,index:t}),a&&this.emit(`minerva-point-double-click`,{point:n,index:t})}plotClicked(e){this.emit(`minerva-quadrant-click`,{quadrant:mt(this.geometry(),e.x,e.y),x:e.x,y:e.y})}dropDetail(e){let t=e.item.index,n=this.points?.[t];return n?{point:n,index:t,x:e.x,y:e.y,quadrant:mt(this.geometry(),e.x,e.y)}:null}pointDragged(e){let t=this.dropDetail(e);t&&this.emit(`minerva-point-drag`,t)}pointDropped(e){let t=this.dropDetail(e);t&&this.emit(`minerva-point-drop`,t)}},L([g({attribute:!1})],Z.prototype,`points`,void 0),L([g({attribute:!1})],Z.prototype,`quadrants`,void 0),L([g({attribute:`x-label`})],Z.prototype,`xLabel`,void 0),L([g({attribute:`y-label`})],Z.prototype,`yLabel`,void 0),L([g({attribute:!1})],Z.prototype,`axisLabels`,void 0),L([g({attribute:!1})],Z.prototype,`xDomain`,void 0),L([g({attribute:!1})],Z.prototype,`yDomain`,void 0),L([g({type:Number,attribute:`x-split`})],Z.prototype,`xSplit`,void 0),L([g({type:Number,attribute:`y-split`})],Z.prototype,`ySplit`,void 0),L([g({type:Boolean,attribute:`reverse-x`})],Z.prototype,`reverseX`,void 0),L([g({type:Boolean,attribute:`hide-ticks`})],Z.prototype,`hideTicks`,void 0),L([g({type:Boolean,attribute:`hide-labels`})],Z.prototype,`hideLabels`,void 0),L([g({type:Number,attribute:`point-size`})],Z.prototype,`pointSize`,void 0),L([g({type:Boolean,attribute:`drag-points`})],Z.prototype,`dragPoints`,void 0),L([g({attribute:!1})],Z.prototype,`options`,void 0)})))()}var Ls,Rs,zs,Bs,Vs,Hs,Us,Ws;function Gs(){return(Gs=e((()=>{hs(),d(),wt(),Ls=class extends ms{createEngine(e,t){return Tt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`toggle`,e=>this.emit(`minerva-toggle`,e))]}toggle(e){this.instance?.toggle(e)}},Rs=class extends Ls{static{this.tagName=`minerva-shape-chart`}get defaultHeight(){return this.options?.type===`gauge`?240:320}engineOptions(){return this.options??null}},L([g({attribute:!1})],Rs.prototype,`options`,void 0),zs=class extends Ls{constructor(...e){super(...e),this.innerRadius=0,this.rose=!1}static{this.tagName=`minerva-pie-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`pie`,data:e,innerRadius:this.innerRadius,rose:this.rose||this.options?.rose,labels:this.labels??this.options?.labels,centerValue:this.centerValue??this.options?.centerValue,centerLabel:this.centerLabel??this.options?.centerLabel}:null}},L([g({attribute:!1})],zs.prototype,`data`,void 0),L([g({type:Number,attribute:`inner-radius`})],zs.prototype,`innerRadius`,void 0),L([g({type:Boolean})],zs.prototype,`rose`,void 0),L([g()],zs.prototype,`labels`,void 0),L([g({attribute:`center-value`})],zs.prototype,`centerValue`,void 0),L([g({attribute:`center-label`})],zs.prototype,`centerLabel`,void 0),L([g({attribute:!1})],zs.prototype,`options`,void 0),Bs=class extends zs{constructor(...e){super(...e),this.innerRadius=.62}static{this.tagName=`minerva-donut-chart`}},L([g({type:Number,attribute:`inner-radius`})],Bs.prototype,`innerRadius`,void 0),Vs=class extends Ls{constructor(...e){super(...e),this.shape=`polygon`,this.levels=4}static{this.tagName=`minerva-radar-chart`}engineOptions(){let e=this.indicators??this.options?.indicators,t=this.series??this.options?.series;return!e||!t?null:{...this.options,type:`radar`,indicators:e,series:t,shape:this.shape,levels:this.levels}}},L([g({attribute:!1})],Vs.prototype,`indicators`,void 0),L([g({attribute:!1})],Vs.prototype,`series`,void 0),L([g()],Vs.prototype,`shape`,void 0),L([g({type:Number})],Vs.prototype,`levels`,void 0),L([g({attribute:!1})],Vs.prototype,`options`,void 0),Hs=class extends Ls{constructor(...e){super(...e),this.value=0,this.min=0,this.max=100,this.needle=!1}static{this.tagName=`minerva-gauge-chart`}get defaultHeight(){return 240}engineOptions(){return{...this.options,type:`gauge`,value:this.value,min:this.min,max:this.max,label:this.label??this.options?.label,needle:this.needle||this.options?.needle,bands:this.bands??this.options?.bands}}},L([g({type:Number})],Hs.prototype,`value`,void 0),L([g({type:Number})],Hs.prototype,`min`,void 0),L([g({type:Number})],Hs.prototype,`max`,void 0),L([g()],Hs.prototype,`label`,void 0),L([g({type:Boolean})],Hs.prototype,`needle`,void 0),L([g({attribute:!1})],Hs.prototype,`bands`,void 0),L([g({attribute:!1})],Hs.prototype,`options`,void 0),Us=class extends Ls{constructor(...e){super(...e),this.sort=`none`,this.shape=`trapezoid`,this.hideConversion=!1}static{this.tagName=`minerva-funnel-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`funnel`,data:e,sort:this.sort,shape:this.shape,conversion:!this.hideConversion&&this.options?.conversion}:null}},L([g({attribute:!1})],Us.prototype,`data`,void 0),L([g()],Us.prototype,`sort`,void 0),L([g()],Us.prototype,`shape`,void 0),L([g({type:Boolean,attribute:`hide-conversion`})],Us.prototype,`hideConversion`,void 0),L([g({attribute:!1})],Us.prototype,`options`,void 0),Ws=class extends Ls{constructor(...e){super(...e),this.gap=2,this.hideHeaders=!1}static{this.tagName=`minerva-treemap-chart`}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`treemap`,data:e,gap:this.gap,headers:!this.hideHeaders&&this.options?.headers}:null}},L([g({attribute:!1})],Ws.prototype,`data`,void 0),L([g({type:Number})],Ws.prototype,`gap`,void 0),L([g({type:Boolean,attribute:`hide-headers`})],Ws.prototype,`hideHeaders`,void 0),L([g({attribute:!1})],Ws.prototype,`options`,void 0)})))()}var Ks,qs,Js,Ys,Xs,Zs,Qs,$s,ec,tc;function nc(){return(nc=e((()=>{ws(),Es(),Is(),d(),ht(),Ks=class extends As{static{this.tagName=`minerva-horizontal-bar-chart`}engineOptions(){let e=super.engineOptions();return e&&{...e,orientation:`horizontal`}}},qs=class extends Ds{constructor(...e){super(...e),this.curve=`smooth`}static{this.tagName=`minerva-range-area-chart`}typed(e){return Ts(e,`area`,void 0,this.curve).map(e=>e.type===`area`?{...e,lineWidth:e.lineWidth??1.5}:e)}},L([g()],qs.prototype,`curve`,void 0),Js=class extends Ds{static{this.tagName=`minerva-mixed-chart`}typed(e){return Ts(e,`line`)}},Ys=class extends Ds{constructor(...e){super(...e),this.minSize=6,this.maxSize=48}static{this.tagName=`minerva-bubble-chart`}typed(e){return gt(e,{minSize:this.minSize,maxSize:this.maxSize,maxValue:this.maxValue})}},L([g({type:Number,attribute:`min-size`})],Ys.prototype,`minSize`,void 0),L([g({type:Number,attribute:`max-size`})],Ys.prototype,`maxSize`,void 0),L([g({type:Number,attribute:`max-value`})],Ys.prototype,`maxValue`,void 0),Xs={fromAttribute:e=>e===null?void 0:/^\d+$/.test(e)?Number(e):e},Zs=class extends Ss{constructor(...e){super(...e),this.bins=`auto`,this.nice=!0}static{this.tagName=`minerva-histogram-chart`}engineOptions(){return this.values?{...this.options,series:[vt(this.values,{bins:this.bins,domain:this.domain,nice:this.nice,name:this.valueName,color:this.color,format:this.formatBin}),...this.series??[]]}:null}},L([g({attribute:!1})],Zs.prototype,`values`,void 0),L([g({converter:Xs})],Zs.prototype,`bins`,void 0),L([g({attribute:!1})],Zs.prototype,`domain`,void 0),L([g({attribute:!1})],Zs.prototype,`nice`,void 0),L([g({attribute:`value-name`})],Zs.prototype,`valueName`,void 0),L([g()],Zs.prototype,`color`,void 0),L([g({attribute:!1})],Zs.prototype,`formatBin`,void 0),L([g({attribute:!1})],Zs.prototype,`series`,void 0),L([g({attribute:!1})],Zs.prototype,`options`,void 0),Qs={fromAttribute:e=>e===null?void 0:e===`minmax`?e:Number(e)},$s=class extends Ss{constructor(...e){super(...e),this.whisker=1.5,this.outlierShape=`hollow`,this.outlierSize=7,this.orientation=`vertical`}static{this.tagName=`minerva-box-plot-chart`}engineOptions(){return!this.groups?.length&&!this.series?null:{...this.options,orientation:this.orientation,series:Ts([...this.groups?.length?[{id:`boxplot`,name:this.valueName??`Values`,data:ut(this.groups,{whisker:this.whisker})}]:[],...this.series??[]],`boxplot`).map(e=>e.type===`boxplot`?{...e,outlierShape:e.outlierShape??this.outlierShape,outlierSize:e.outlierSize??this.outlierSize}:e)}}},L([g({attribute:!1})],$s.prototype,`groups`,void 0),L([g({attribute:!1})],$s.prototype,`series`,void 0),L([g({attribute:`value-name`})],$s.prototype,`valueName`,void 0),L([g({converter:Qs})],$s.prototype,`whisker`,void 0),L([g({attribute:`outlier-shape`})],$s.prototype,`outlierShape`,void 0),L([g({type:Number,attribute:`outlier-size`})],$s.prototype,`outlierSize`,void 0),L([g()],$s.prototype,`orientation`,void 0),L([g({attribute:!1})],$s.prototype,`options`,void 0),ec=class extends Ss{constructor(...e){super(...e),this.start=0,this.hideLabels=!1,this.hideConnectors=!1,this.orientation=`vertical`}static{this.tagName=`minerva-waterfall-chart`}engineOptions(){return this.steps?{...this.options,orientation:this.orientation,series:[dt(this.steps,{name:this.valueName,upColor:this.upColor,downColor:this.downColor,totalColor:this.totalColor,start:this.start,labels:!this.hideLabels,format:this.format,connector:this.hideConnectors?!1:this.connector??!0,locale:this.options?.locale})]}:null}},L([g({attribute:!1})],ec.prototype,`steps`,void 0),L([g({attribute:`value-name`})],ec.prototype,`valueName`,void 0),L([g({attribute:`up-color`})],ec.prototype,`upColor`,void 0),L([g({attribute:`down-color`})],ec.prototype,`downColor`,void 0),L([g({attribute:`total-color`})],ec.prototype,`totalColor`,void 0),L([g({type:Number})],ec.prototype,`start`,void 0),L([g({type:Boolean,attribute:`hide-labels`})],ec.prototype,`hideLabels`,void 0),L([g({attribute:!1})],ec.prototype,`format`,void 0),L([g({type:Boolean,attribute:`hide-connectors`})],ec.prototype,`hideConnectors`,void 0),L([g({attribute:!1})],ec.prototype,`connector`,void 0),L([g()],ec.prototype,`orientation`,void 0),L([g({attribute:!1})],ec.prototype,`options`,void 0),tc=class extends Ss{constructor(...e){super(...e),this.hideDependencyArrows=!1,this.today=!1,this.mountedAt=Date.now()}static{this.tagName=`minerva-gantt-chart`}engineOptions(){if(!this.tasks)return null;let e=_t(this.tasks,{colors:this.colors,taskName:this.taskName,progressName:this.progressName,milestoneName:this.milestoneName,formatProgress:this.formatProgress,dependenciesName:this.dependenciesName,dependencyArrows:!this.hideDependencyArrows,dependencyColor:this.dependencyColor,locale:this.options?.locale}),t=this.today,n=t===!1?null:t===!0?this.mountedAt:t instanceof Date?t.getTime():t,r=n===null?[]:[{type:`line`,axis:`y`,value:n,color:`var(--danger-color, #dc2626)`,dash:[4,3],label:this.todayLabel}],i=this.options??{};return{...i,series:e.series,orientation:`horizontal`,xAxis:{type:`category`,categories:e.categories,...i.xAxis},yAxis:{type:`time`,min:e.domain[0],max:e.domain[1],...i.yAxis},annotations:[...i.annotations??[],...r],dependencies:e.dependencies,interaction:i.interaction??{zoom:`y`},legend:i.legend??e.series.length>1}}},L([g({attribute:!1})],tc.prototype,`tasks`,void 0),L([g({attribute:!1})],tc.prototype,`colors`,void 0),L([g({attribute:`task-name`})],tc.prototype,`taskName`,void 0),L([g({attribute:`progress-name`})],tc.prototype,`progressName`,void 0),L([g({attribute:`milestone-name`})],tc.prototype,`milestoneName`,void 0),L([g({attribute:`dependencies-name`})],tc.prototype,`dependenciesName`,void 0),L([g({type:Boolean,attribute:`hide-dependency-arrows`})],tc.prototype,`hideDependencyArrows`,void 0),L([g({attribute:`dependency-color`})],tc.prototype,`dependencyColor`,void 0),L([g({attribute:!1})],tc.prototype,`formatProgress`,void 0),L([g({attribute:!1})],tc.prototype,`today`,void 0),L([g({attribute:`today-label`})],tc.prototype,`todayLabel`,void 0),L([g({attribute:!1})],tc.prototype,`options`,void 0)})))()}var rc,ic,ac,oc,sc,cc,lc,uc,dc;function fc(){return(fc=e((()=>{Gs(),d(),rc=class extends Ls{constructor(...e){super(...e),this.align=`justify`,this.linkColor=`gradient`,this.hideLabels=!1}static{this.tagName=`minerva-sankey-chart`}get defaultHeight(){return 360}engineOptions(){let e=this.links??this.options?.links;return e?{...this.options,type:`sankey`,nodes:this.nodes??this.options?.nodes,links:e,align:this.align,linkColor:this.linkColor,labels:!this.hideLabels&&this.options?.labels}:null}},L([g({attribute:!1})],rc.prototype,`nodes`,void 0),L([g({attribute:!1})],rc.prototype,`links`,void 0),L([g()],rc.prototype,`align`,void 0),L([g({attribute:`link-color`})],rc.prototype,`linkColor`,void 0),L([g({type:Boolean,attribute:`hide-labels`})],rc.prototype,`hideLabels`,void 0),L([g({attribute:!1})],rc.prototype,`options`,void 0),ic=class extends Ls{constructor(...e){super(...e),this.innerRadius=.26,this.labels=`auto`,this.noDrill=!1}static{this.tagName=`minerva-sunburst-chart`}get defaultHeight(){return 360}bindEngine(e){return[...super.bindEngine(e),e.on(`drill`,e=>this.emit(`minerva-drill`,e))]}drill(e){this.instance?.drill(e)}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`sunburst`,data:e,innerRadius:this.innerRadius,labels:this.labels,drill:!this.noDrill&&this.options?.drill,drillPath:this.drillPath??this.options?.drillPath}:null}},L([g({attribute:!1})],ic.prototype,`data`,void 0),L([g({type:Number,attribute:`inner-radius`})],ic.prototype,`innerRadius`,void 0),L([g()],ic.prototype,`labels`,void 0),L([g({type:Boolean,attribute:`no-drill`})],ic.prototype,`noDrill`,void 0),L([g({attribute:!1})],ic.prototype,`drillPath`,void 0),L([g({attribute:!1})],ic.prototype,`options`,void 0),ac=class extends Ls{constructor(...e){super(...e),this.innerRadius=.3,this.sweep=270}static{this.tagName=`minerva-radial-bar-chart`}get defaultHeight(){return 300}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`radialBar`,data:e,max:this.max??this.options?.max,innerRadius:this.innerRadius,sweep:this.sweep,centerValue:this.centerValue??this.options?.centerValue,centerLabel:this.centerLabel??this.options?.centerLabel}:null}},L([g({attribute:!1})],ac.prototype,`data`,void 0),L([g({type:Number})],ac.prototype,`max`,void 0),L([g({type:Number,attribute:`inner-radius`})],ac.prototype,`innerRadius`,void 0),L([g({type:Number})],ac.prototype,`sweep`,void 0),L([g({attribute:`center-value`})],ac.prototype,`centerValue`,void 0),L([g({attribute:`center-label`})],ac.prototype,`centerLabel`,void 0),L([g({attribute:!1})],ac.prototype,`options`,void 0),oc=e=>(e instanceof Date?e:new Date(e)).getFullYear(),sc=e=>(e instanceof Date?e:new Date(e)).getTime(),cc=e=>{if(!Array.isArray(e))return 1;let[t,n]=e,r=oc(t),i=oc(n),a=(sc(n)-sc(t))/864e5+1;return i>r&&a>371?i-r+1:1},lc=class extends Ls{constructor(...e){super(...e),this.layout=`weeks`,this.levels=4}static{this.tagName=`minerva-calendar-heatmap`}get defaultHeight(){if(this.layout===`months`)return 560;let e=this.options?.legend===!1?0:34;return cc(this.range??this.options?.range)*120+e+16}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`calendarHeatmap`,data:e,range:this.range??this.options?.range,layout:this.layout,locale:this.locale??this.options?.locale,color:this.color??this.options?.color,levels:this.levels}:null}},L([g({attribute:!1})],lc.prototype,`data`,void 0),L([g({attribute:!1})],lc.prototype,`range`,void 0),L([g()],lc.prototype,`layout`,void 0),L([g()],lc.prototype,`locale`,void 0),L([g()],lc.prototype,`color`,void 0),L([g({type:Number})],lc.prototype,`levels`,void 0),L([g({attribute:!1})],lc.prototype,`options`,void 0),uc=class extends Ls{constructor(...e){super(...e),this.orientation=`horizontal`}static{this.tagName=`minerva-bullet-chart`}get defaultHeight(){if(this.orientation===`vertical`)return 320;let e=(this.data??this.options?.data??[]).length;return Math.max(96,e*64+16)+(this.options?.legend?34:0)}engineOptions(){let e=this.data??this.options?.data;return e?{...this.options,type:`bullet`,data:e,orientation:this.orientation,ranges:this.ranges??this.options?.ranges,rangeLabels:this.rangeLabels??this.options?.rangeLabels,targetColor:this.targetColor??this.options?.targetColor}:null}},L([g({attribute:!1})],uc.prototype,`data`,void 0),L([g()],uc.prototype,`orientation`,void 0),L([g({attribute:!1})],uc.prototype,`ranges`,void 0),L([g({attribute:!1})],uc.prototype,`rangeLabels`,void 0),L([g({attribute:`target-color`})],uc.prototype,`targetColor`,void 0),L([g({attribute:!1})],uc.prototype,`options`,void 0),dc=class extends Ls{constructor(...e){super(...e),this.directed=!1,this.ribbonColor=`gradient`,this.labels=`auto`}static{this.tagName=`minerva-chord-chart`}get defaultHeight(){return 420}engineOptions(){let e=this.links??this.options?.links,t=this.matrix??this.options?.matrix;return!e&&!t?null:{...this.options,type:`chord`,groups:this.groups??this.options?.groups,matrix:t,links:e,directed:this.directed||this.options?.directed,ribbonColor:this.ribbonColor,labels:this.labels,tickFormat:this.tickFormat??this.options?.tickFormat}}},L([g({attribute:!1})],dc.prototype,`groups`,void 0),L([g({attribute:!1})],dc.prototype,`matrix`,void 0),L([g({attribute:!1})],dc.prototype,`links`,void 0),L([g({type:Boolean})],dc.prototype,`directed`,void 0),L([g({attribute:`ribbon-color`})],dc.prototype,`ribbonColor`,void 0),L([g()],dc.prototype,`labels`,void 0),L([g({attribute:!1})],dc.prototype,`tickFormat`,void 0),L([g({attribute:!1})],dc.prototype,`options`,void 0)})))()}function pc(e){return _c.add(e),!vc&&typeof MutationObserver<`u`&&(vc=new MutationObserver(()=>{for(let e of[..._c])e()}),vc.observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`],subtree:!0})),()=>{_c.delete(e),_c.size===0&&(vc?.disconnect(),vc=null)}}var mc,hc,gc,_c,vc,Q;function yc(){return(yc=e((()=>{M(),C(),gn(),I(),k(),T(),Un(),Ai(),Zr(),sr(),u(),d(),Qe(),it(),mc=(e,t)=>Number.isFinite(e)&&e>0?e:t,hc=e=>e===`dark`||e===`github-dark`?`dark`:e===`light`?`light`:void 0,gc=e=>typeof e?.editor?.create==`function`,_c=new Set,vc=null,Q=class e extends zn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.language=`plaintext`,this.label=``,this.height=420,this.minHeight=160,this.maxHeight=800,this.loadTimeout=1e4,this.status=`loading`,this.scopeTheme=`light`,this.locale=new w(this),this.editor=null,this.engine=null,this.container=null,this.subscriptions=[],this.applying=!1,this.edited=!1,this.dirty=!1,this.unobserveTheme=null,this.started=!1}static{this.tagName=`minerva-code-editor`}static{this.dependencies=[U,Qr]}static{this.styles=[j,b`
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
`,F(yr)]}get resolvedTheme(){return this.theme===`dark`||this.theme===`light`?this.theme:this.scopeTheme}focus(e){this.editor?this.editor.focus():this.fallback?.focus(e)}retry(){this.load()}getFormValue(){return this.value}getValidity(){return this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.fallback??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}connectedCallback(){super.connectedCallback(),this.syncScopeTheme(),this.unobserveTheme=pc(()=>this.syncScopeTheme()),this.started&&this.load()}disconnectedCallback(){super.disconnectedCallback(),this.unobserveTheme?.(),this.unobserveTheme=null,this.teardown()}syncScopeTheme(){let e=Vt(this,`[data-theme]`);this.scopeTheme=hc(e?.getAttribute(`data-theme`))??`light`}get monacoTheme(){return this.resolvedTheme===`dark`?`vs-dark`:`vs`}teardown(){clearTimeout(this.timer),this.timer=void 0;for(let e of this.subscriptions)e.dispose();this.subscriptions=[];try{this.editor?.dispose()}catch{}this.editor=null,this.engine=null,this.container?.remove(),this.container=null}fail(){let e=this.status===`error`;this.teardown(),this.status=`error`,e||this.emit(`minerva-error`)}load(){this.teardown(),this.status=`loading`,this.isConnected&&(this.timer=setTimeout(()=>this.fail(),this.loadTimeout),this.monaco!==void 0&&this.mount())}mount(){let t=this.monaco;if(!gc(t)){E&&P(e.tagName,'`monaco` is not a Monaco engine (expected `import * as monaco from "monaco-editor"`); showing the textarea fallback.'),this.fail();return}let n=document.createElement(`div`);n.slot=`editor`,n.setAttribute(`data-minerva-code-editor`,``),this.append(n),this.container=n;try{t.editor.setTheme(this.monacoTheme);let e=t.editor.create(n,{value:this.value,language:this.language,theme:this.monacoTheme,readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label,automaticLayout:!0,minimap:{enabled:!1},wordWrap:`on`,scrollBeyondLastLine:!1});this.editor=e,this.engine=t,this.subscriptions.push(e.onDidChangeModelContent(()=>this.handleEdit()),e.onDidBlurEditorText(()=>this.commit()))}catch{this.fail();return}clearTimeout(this.timer),this.timer=void 0,this.status=`mounted`}handleEdit(){let e=this.editor;e&&!this.applying&&(this.isDisabled||(this.value=e.getValue(),this.dirty=!0,this.edited=!0,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:this.value})))}commit(){this.edited&&(this.edited=!1,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}handleFallbackInput(e){this.isDisabled||(this.value=e.target.value,this.dirty=!0,this.edited=!0,this.emit(`minerva-input`,{value:this.value}))}applyValue(){let e=this.editor;if(e&&e.getValue()!==this.value){this.applying=!0;try{let t=e.getModel();this.isDisabled||!t?e.setValue(this.value):(e.executeEdits(``,[{range:t.getFullModelRange(),text:this.value,forceMoveMarkers:!0}]),e.pushUndoStop())}finally{this.applying=!1}}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){if(super.updated(t),!this.started){this.started=!0,E&&!this.label&&P(e.tagName,`set label: it is the visible label and the accessible name of the editor.`),this.load();return}if(t.has(`monaco`)&&t.get(`monaco`)!==void 0){this.load();return}t.has(`monaco`)&&this.monaco!==void 0&&!this.editor&&(this.status===`loading`&&this.timer!==void 0?this.mount():this.status===`error`&&this.load());let n=this.editor,r=this.engine;if(n&&r)try{t.has(`value`)&&this.applyValue(),t.has(`language`)&&r.editor.setModelLanguage(n.getModel(),this.language),(t.has(`disabled`)||t.has(`formDisabled`)||t.has(`label`))&&n.updateOptions({readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label}),(t.has(`theme`)||t.has(`scopeTheme`))&&r.editor.setTheme(this.monacoTheme)}catch{this.fail()}}hookStates(){return{disabled:this.isDisabled,loading:this.status===`loading`}}render(){let e=mc(this.minHeight,160),t=Math.max(e,mc(this.maxHeight,800)),n=Math.min(t,Math.max(e,mc(this.height,420))),r=this.locale.t,i=this.status;return m`<div
part="root"
class="root"
role="group"
aria-label=${this.label||p}
>
<label
part="label"
class="label"
for=${i===`error`?`fallback`:p}
@click=${()=>this.editor?.focus()}
>${this.label}</label
>
<div
part="surface"
class="surface"
style=${y({height:`${n}px`})}
aria-busy=${i===`loading`?`true`:`false`}
>
${i===`error`?m`<div part="error" class="error">
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
                      >${Fr}</span
                    >
                    ${this.retryText??r(`monacoCodeEditor.retry`)}
                  </minerva-button>
                </div>
                <textarea
                  id="fallback"
                  part="fallback"
                  class="fallback"
                  aria-label=${this.label||p}
                  spellcheck="false"
                  .value=${nt(this.value)}
                  ?disabled=${this.isDisabled}
                  @input=${this.handleFallbackInput}
                  @change=${()=>this.commit()}
                ></textarea>`:m`${i===`loading`?m`<div part="loading" class="loading" role="status">
<minerva-progress
size="small"
aria-label=${this.loadingLabel??r(`monacoCodeEditor.loading`)}
></minerva-progress>
</div>`:p}<slot name="editor"></slot>`}
</div>
</div>`}},L([g({attribute:!1})],Q.prototype,`monaco`,void 0),L([g({attribute:!1})],Q.prototype,`value`,void 0),L([g({attribute:`value`})],Q.prototype,`defaultValue`,void 0),L([g({reflect:!0})],Q.prototype,`language`,void 0),L([g()],Q.prototype,`label`,void 0),L([g({type:Number})],Q.prototype,`height`,void 0),L([g({type:Number,attribute:`min-height`})],Q.prototype,`minHeight`,void 0),L([g({type:Number,attribute:`max-height`})],Q.prototype,`maxHeight`,void 0),L([g({reflect:!0})],Q.prototype,`theme`,void 0),L([g({type:Number,attribute:`load-timeout`})],Q.prototype,`loadTimeout`,void 0),L([g({attribute:`unavailable-text`})],Q.prototype,`unavailableText`,void 0),L([g({attribute:`retry-text`})],Q.prototype,`retryText`,void 0),L([g({attribute:`retry-label`})],Q.prototype,`retryLabel`,void 0),L([g({attribute:`loading-label`})],Q.prototype,`loadingLabel`,void 0),L([f()],Q.prototype,`status`,void 0),L([f()],Q.prototype,`scopeTheme`,void 0),L([_(`textarea`)],Q.prototype,`fallback`,void 0)})))()}var bc,xc,Sc,Cc,$,wc,Tc,Ec;function Dc(){return(Dc=e((()=>{hs(),d(),St(),bc=e=>{if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},xc=(e,t)=>{let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&e[n]===t[n])},Sc=(e,t)=>e===t?!0:Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):bc(e)&&bc(t)&&xc(e,t),Cc=(e,t)=>{let n=Object.keys(e);return n.length===Object.keys(t).length&&n.every(n=>Object.prototype.hasOwnProperty.call(t,n)&&Sc(e[n],t[n]))},$=class extends ms{constructor(...e){super(...e),this.height=480,this.edgeColor=`neutral`,this.arrowStyle=`open`,this.previous=null}createEngine(e,t){return this.previous=t,xt(e,t)}engineOptions(){return!this.nodes||!this.edges?null:{...this.options,nodes:this.nodes,edges:this.edges,groups:this.groups,...this.layoutOptions(),nodeShape:this.nodeShape??this.options?.nodeShape,edgeStyle:this.edgeStyle??this.options?.edgeStyle,edgeColor:this.edgeColor,arrowStyle:this.arrowStyle,highlight:this.highlight??this.options?.highlight,locale:this.locale??this.options?.locale,selected:this.selected??this.options?.selected}}syncEngine(e){let t=this.engineOptions();!t||this.previous&&Cc(this.previous,t)||(this.previous=t,e.setOptions(t))}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-item-click`,e)),e.on(`select`,e=>this.emit(`minerva-selection-change`,{ids:e.ids})),e.on(`toggle`,e=>this.emit(`minerva-toggle`,e)),e.on(`groupToggle`,e=>this.emit(`minerva-group-toggle`,e)),e.on(`layoutEnd`,e=>this.emit(`minerva-layout-end`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}fit(e){this.instance?.fit(e)}focusNode(e,t){this.instance?.focusNode(e,t)}setData(e){this.instance?.setData(e)}select(e){this.instance?.select(e)}getSelection(){return this.instance?.getSelection()??[]}expand(e){this.instance?.expand(e)}collapse(e){this.instance?.collapse(e)}toggle(e){this.instance?.toggle(e)}getPositions(){return this.instance?.getPositions()??{}}relayout(){this.instance?.relayout()}getRenderer(){return this.instance?.getRenderer()??null}},L([g()],$.prototype,`height`,void 0),L([g({attribute:!1})],$.prototype,`nodes`,void 0),L([g({attribute:!1})],$.prototype,`edges`,void 0),L([g({attribute:!1})],$.prototype,`groups`,void 0),L([g({attribute:`node-shape`})],$.prototype,`nodeShape`,void 0),L([g({attribute:`edge-style`})],$.prototype,`edgeStyle`,void 0),L([g({attribute:`edge-color`})],$.prototype,`edgeColor`,void 0),L([g({attribute:`arrow-style`})],$.prototype,`arrowStyle`,void 0),L([g()],$.prototype,`highlight`,void 0),L([g()],$.prototype,`locale`,void 0),L([g({attribute:!1})],$.prototype,`selected`,void 0),L([g({attribute:!1})],$.prototype,`options`,void 0),wc=class extends ${constructor(...e){super(...e),this.layout=`force`}static{this.tagName=`minerva-graph-chart`}layoutOptions(){return{layout:this.layout,direction:this.direction??this.options?.direction,force:this.options?.force,circular:this.options?.circular,dag:this.options?.dag,tree:this.options?.tree}}},L([g()],wc.prototype,`layout`,void 0),L([g()],wc.prototype,`direction`,void 0),Tc=class extends ${constructor(...e){super(...e),this.direction=`TB`}static{this.tagName=`minerva-dependency-graph`}layoutOptions(){let e=this.options?.dag,t=this.criticalPath;return{layout:`dag`,direction:this.direction,dag:t===void 0?e:{...e,criticalPath:t}}}},L([g()],Tc.prototype,`direction`,void 0),L([g({type:Boolean,attribute:`critical-path`})],Tc.prototype,`criticalPath`,void 0),Ec=class extends ${constructor(...e){super(...e),this.layout=`tree`,this.direction=`LR`}static{this.tagName=`minerva-tree-chart`}layoutOptions(){return{layout:this.layout,direction:this.layout===`tree`?this.direction:void 0,tree:this.options?.tree}}},L([g()],Ec.prototype,`layout`,void 0),L([g()],Ec.prototype,`direction`,void 0)})))()}var Oc,kc,Ac;function jc(){return(jc=e((()=>{tn(),_e(),Oc=new Set(be),kc=e=>e&&Oc.has(e)?e:null,Ac=class{constructor(e,t){this.kind=null,this.host=e,this.changed=t}get current(){return this.kind}report(e){this.kind!==e&&(this.kind=e,cn(this.host,`data-renderer`,e),this.changed(e))}clear(){this.kind&&(this.kind=null,cn(this.host,`data-renderer`,null))}}})))()}var Mc,Nc,Pc,Fc;function Ic(){return(Ic=e((()=>{M(),k(),jc(),u(),d(),Qe(),ct(),Ot(),ke(),Mc=24,Nc=2,Pc=(e,t)=>typeof e==`number`&&Number.isFinite(e)&&e>0?e:t,Fc=class e extends N{constructor(...e){super(...e),this.size=24,this.color=`currentColor`,this.strokeWidth=2,this.absoluteStrokeWidth=!1,this.renderer=`svg`,this.surface=null,this.surfaceCanvas=null,this.drawn=new Ac(this,e=>this.emit(`minerva-renderer-change`,{renderer:e}))}static{this.tagName=`minerva-icon`}static{this.styles=[j,b`
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
`]}getRenderer(){return this.drawn.current}definition(){if(this.icon)return this.icon;if(!this.name)return;let t=Be(this.name);return!t&&E&&P(e.tagName,`unknown icon name "${this.name}": nothing is rendered (see icons of minerva-design/icons/core).`),t}disconnectedCallback(){super.disconnectedCallback(),this.releaseSurface()}updated(e){super.updated(e),this.syncSurface()}syncSurface(){let e=this.renderRoot.querySelector(`canvas[part=icon]`),t=this.definition(),n=kc(this.renderer);if(!this.isConnected||!e||!t||!n){this.releaseSurface();return}this.surfaceCanvas!==e&&this.releaseSurface();let r=Pc(this.size,Mc),i=Pc(this.strokeWidth,Nc),a={icon:t,size:r,color:this.color||`currentColor`,strokeWidth:this.absoluteStrokeWidth?i*24/r:i,renderer:n,onRendererChange:e=>this.drawn.report(e)};this.surface?this.surface.update(a):(this.surface=kt(e,a),this.surfaceCanvas=e)}releaseSurface(){this.surface?.destroy(),this.surface=null,this.surfaceCanvas=null,this.drawn.clear()}render(){let e=this.definition();if(!e)return p;let t=Pc(this.size,Mc),n=this.label||void 0;if(kc(this.renderer))return m`<canvas
part="icon"
data-icon=${e.name}
role=${ot(n&&`img`)}
aria-label=${ot(n)}
aria-hidden=${ot(n?void 0:`true`)}
style=${y({width:`${t}px`,height:`${t}px`})}
></canvas>`;let r=this.absoluteStrokeWidth?`non-scaling-stroke`:void 0;return m`<svg
part="icon"
xmlns="http://www.w3.org/2000/svg"
width=${t}
height=${t}
viewBox="0 0 24 24"
fill="none"
stroke=${this.color||`currentColor`}
stroke-width=${Pc(this.strokeWidth,Nc)}
stroke-linecap="round"
stroke-linejoin="round"
data-icon=${e.name}
role=${ot(n&&`img`)}
aria-label=${ot(n)}
aria-hidden=${ot(n?void 0:`true`)}
>
${n?Xe`<title>${n}</title>`:p}
${e.paths.map((t,n)=>Xe`<path d=${t} stroke=${ot(e.colors?.[n])} vector-effect=${ot(r)}></path>`)}
</svg>`}},L([g()],Fc.prototype,`name`,void 0),L([g({attribute:!1})],Fc.prototype,`icon`,void 0),L([g({type:Number})],Fc.prototype,`size`,void 0),L([g()],Fc.prototype,`color`,void 0),L([g({type:Number,attribute:`stroke-width`})],Fc.prototype,`strokeWidth`,void 0),L([g({type:Boolean,attribute:`absolute-stroke-width`})],Fc.prototype,`absoluteStrokeWidth`,void 0),L([g()],Fc.prototype,`label`,void 0),L([g()],Fc.prototype,`renderer`,void 0)})))()}var Lc,Rc,zc,Bc,Vc;function Hc(){return(Hc=e((()=>{k(),jc(),u(),d(),Qe(),ct(),ne(),Lc=e=>typeof e==`number`&&Number.isFinite(e)&&e>0?e:void 0,Rc=(e,t)=>typeof e==`number`?Number.isFinite(e)&&e>=0?`${e}px`:t:e?.trim()||t,zc={fromAttribute:e=>e===null?void 0:/^\s*\d+(\.\d+)?\s*$/.test(e)?Number(e):e,toAttribute:e=>e===void 0?null:String(e)},Bc=[`renderer`,`pixelRatio`],Vc=class extends N{constructor(...e){super(...e),this.items=[],this.renderer=`auto`,this.width=`100%`,this.height=240,this.controller=null,this.drawn=new Ac(this,e=>this.emit(`minerva-renderer-change`,{renderer:e}))}static{this.tagName=`minerva-icon-canvas`}static{this.styles=[j,b`
:host{
display: block;
position: relative;
}
.surface{
position: relative;
max-width: 100%;
}
`]}get canvas(){return this.controller?.canvas??null}getRenderer(){return this.controller?.renderer??null}async ready(){if(await this.updateComplete,!this.controller)throw Error(`<minerva-icon-canvas> is not connected`);return this.controller.ready()}settings(){return{renderer:kc(this.renderer)??`auto`,pixelRatio:Lc(this.pixelRatio)}}disconnectedCallback(){super.disconnectedCallback(),this.controller?.destroy(),this.controller=null,this.drawn.clear()}updated(e){if(super.updated(e),!this.controller){this.mount();return}e.has(`items`)&&this.controller.setItems(this.items??[]),Bc.some(t=>e.has(t))&&this.controller.setOptions(this.settings())}mount(){if(this.controller||!this.isConnected)return;let e=this.renderRoot.querySelector(`[part=surface]`);e&&(this.controller=ue(e,{...this.settings(),items:this.items??[],onRendererChange:e=>this.drawn.report(e)}))}render(){let e=this.label||void 0;return m`<div
part="surface"
class="surface"
role=${ot(e&&`img`)}
aria-label=${ot(e)}
aria-hidden=${ot(e?void 0:`true`)}
style=${y({width:Rc(this.width,`100%`),height:Rc(this.height,`240px`)})}
></div>`}},L([g({attribute:!1})],Vc.prototype,`items`,void 0),L([g()],Vc.prototype,`renderer`,void 0),L([g({converter:zc})],Vc.prototype,`width`,void 0),L([g({converter:zc})],Vc.prototype,`height`,void 0),L([g({type:Number,attribute:`pixel-ratio`})],Vc.prototype,`pixelRatio`,void 0),L([g()],Vc.prototype,`label`,void 0)})))()}export{gs as $,q as $t,Vs as A,H as An,_o as At,As as B,fi as Bn,Xa as Bt,Zs as C,Bi as Cn,Po as Ct,$s as D,Vi as Dn,bo as Dt,Js as E,Ui as En,Co as Et,zs as F,xi as Fn,lo as Ft,Ns as G,Ga as Gt,Ps as H,ui as Hn,Ja as Ht,Bs as I,vi as In,J as It,Cs as J,La as Jt,Ms as K,za as Kt,Us as L,_i as Ln,so as Lt,Ls as M,wi as Mn,po as Mt,Gs as N,Ci as Nn,mo as Nt,ec as O,Ai as On,yo as Ot,Hs as P,bi as Pn,Y as Pt,bs as Q,Pa as Qt,Z as R,yi as Rn,ro as Rt,qs as S,Wi as Sn,jo as St,Ys as T,Gi as Tn,wo as Tt,Is as U,R as Un,qa as Ut,js as V,z as Vn,Ya as Vt,Os as W,ai as Wn,Wa as Wt,ws as X,Ma as Xt,Ss as Y,Ia as Yt,_s as Z,Na as Zt,lc as _,$i as _n,Fo as _t,$ as a,fa as an,X as at,tc as b,Hi as bn,Ao as bt,wc as c,K as cn,as as ct,Q as d,la as dn,ts as dt,Aa as en,xs as et,yc as f,G as fn,rs as ft,fc as g,ea as gn,Mo as gt,ic as h,ia as hn,ko as ht,Fc as i,Ca as in,hs as it,Ws as j,Oi as jn,vo as jt,Rs as k,U as kn,xo as kt,Cc as l,da as ln,ls as lt,dc as m,ra as mn,es as mt,Hc as n,Ea as nn,ys as nt,Ec as o,wa as on,fs as ot,ac as p,oa as pn,Ho as pt,ks as q,Ba as qt,Ic as r,Ta as rn,ms as rt,Dc as s,ga as sn,us as st,Vc as t,ja as tn,vs as tt,Tc as u,ua as un,is as ut,rc as v,W as vn,Vo as vt,nc as w,Li as wn,Do as wt,Ks as x,zi as xn,Lo as xt,uc as y,Zi as yn,No as yt,Ds as z,B as zn,io as zt};