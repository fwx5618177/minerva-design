import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{_ as t,g as n,h as r,m as i}from"./native-preview-C-OsNMso.js";import{D as a,Dt as o,E as s,It as c,L as l,N as ee,O as te,Ot as ne,Pt as re,T as ie,Tt as ae,Ut as oe,Y as se,Yt as ce,Z as le,a as ue,b as de,c as fe,ct as pe,en as me,et as he,ft as ge,gt as _e,h as ve,in as ye,j as be,k as xe,ln as Se,mt as Ce,n as we,ot as Te,pt as Ee,rt as De,s as Oe,t as ke,tt as Ae,un as je,v as Me,vt as Ne,x as Pe,y as Fe,zt as Ie}from"./angular-preview-l4x8c_2r.js";import{A as u,B as Le,D as d,E as f,I as p,N as Re,_ as m,a as ze,b as h,d as Be,g,i as Ve,j as _,l as He,m as Ue,n as We,p as Ge,s as Ke,t as qe,u as Je,v,w as y,x as b,z as Ye}from"./minerva-web-components-Csj0uz1j.js";import{$ as Xe,$n as Ze,$t as Qe,An as $e,At as et,Bn as tt,Bt as nt,Cr as rt,Ct as it,Dn as at,Dr as x,Dt as ot,En as st,Er as ct,Et as lt,Fn as ut,Ft as dt,Gt as ft,Hn as pt,Ht as mt,In as ht,It as gt,Jn as _t,Jt as vt,Kn as yt,Kt as bt,Ln as xt,Lt as St,Mn as Ct,Mt as wt,Nn as Tt,On as Et,Or as S,Ot as Dt,Qt as Ot,Rn as kt,Rt as At,Sr as jt,St as Mt,Tn as Nt,Tr as Pt,Tt as Ft,Un as C,Ut as It,Vt as Lt,Wn as Rt,Wt as zt,Xn as Bt,Xt as Vt,Yn as Ht,Yt as Ut,Zt as Wt,_n as Gt,_r as Kt,_t as qt,an as Jt,ar as w,at as Yt,bn as Xt,br as T,bt as Zt,cn as Qt,cr as $t,ct as en,dn as tn,dr as E,dt as nn,en as rn,er as an,et as on,fn as sn,fr as D,ft as cn,gn as ln,gr as un,gt as dn,hn as fn,hr as pn,ht as mn,in as hn,ir as O,jt as gn,kt as _n,ln as vn,lr as k,lt as yn,mn as bn,mr as xn,mt as Sn,n as Cn,nn as wn,nt as Tn,on as En,or as A,ot as Dn,pn as On,pr as j,pt as kn,qn as An,qt as jn,rn as Mn,sn as Nn,sr as Pn,st as Fn,t as In,tn as Ln,tt as Rn,un as zn,ur as M,ut as Bn,vn as N,vr as Vn,vt as Hn,wn as Un,wr as Wn,wt as Gn,xn as Kn,xr as P,xt as qn,yn as F,yr as I,yt as Jn,zn as Yn,zt as Xn}from"./minerva-web-components-DwoXTEWW.js";import{t as L}from"./minerva-web-components-D61_qRVd.js";import{_ as Zn,c as Qn,d as $n,f as er,g as tr,h as nr,l as rr,m as ir,p as ar,s as or,u as sr}from"./minerva-web-components-Ct9UiXm3.js";import{At as cr,Bt as lr,It as ur,Lt as dr,Mt as fr,Nt as pr,Rt as mr,jt as hr,zt as gr}from"./minerva-web-components-CIVhdd2W.js";var _r,vr,R;function yr(){return(yr=e((()=>{$t(),x(),O(),C(),I(),j(),M(),N(),d(),h(),m(),Ue(),ie(),_r={info:Ct,success:Kn,warning:Tt,danger:an},vr=[`slideIn`,`fadeIn`,`bounce`,`zoom`],R=class e extends E{constructor(...e){super(...e),this.color=`info`,this.variant=`subtle`,this.size=`medium`,this.heading=``,this.hideIcon=!1,this.closable=!1,this.noAnimation=!1,this.animationName=`slideIn`,this.banner=!1,this.elevation=!1,this.square=!1,this.collapsible=!1,this.collapsed=!1,this.locale=new T(this),this.aria=new S(this),this.slots=new k(this)}static{this.tagName=`minerva-alert`}static{this.styles=[D,p`
:host{
display: block;
}
.icon svg,
.expandButton svg,
.closeButton svg{
display: block;
}
`,F(Pn)]}get hasHeading(){return!!this.heading||this.slots.test(`heading`)}handleExpand(){let e=this.collapsed;this.emit(`minerva-expanded-change`,{expanded:e},{cancelable:!0})&&(this.collapsed=!e)}handleClose(){let e=this.adjacentTabbable(),t=this.parentElement;this.emit(`minerva-close`,{},{cancelable:!0})&&(this.isFocusInsideOrLost()&&this.moveFocusOut(e,t),this.hidden=!0)}isFocusInsideOrLost(){let e=this.ownerDocument,t=ke(e);return!t||t===e.body||!t.isConnected||l(this,t)}adjacentTabbable(){let e=s(this.ownerDocument.body),t=e.map((e,t)=>l(this,e)?t:-1).filter(e=>e>=0);if(!t.length)return null;let n=e=>!l(this,e)&&Me(e);return e.slice(t[t.length-1]+1).find(n)??e.slice(0,t[0]).filter(n).pop()??null}moveFocusOut(e,t){let n=typeof this.returnFocus==`function`?this.returnFocus():this.returnFocus;n?.isConnected&&Oe(n)||e?.isConnected&&Oe(e)||this.focusContainer(t)}focusContainer(e){let t=this.ownerDocument;if(e?.isConnected){for(let n=e;n&&n!==t.body;n=n.parentElement)if(n.hasAttribute(`tabindex`)&&Oe(n))return;e!==t.body&&e!==t.documentElement&&(e.setAttribute(`tabindex`,`-1`),e.addEventListener(`blur`,()=>{e.getAttribute(`tabindex`)===`-1`&&e.removeAttribute(`tabindex`)},{once:!0}),Oe(e,{preventScroll:!0}))}}updated(){A&&this.collapsible&&!this.hasHeading&&w(e.tagName,`collapsible needs a heading (the toggle lives in the title): set heading or fill the heading slot.`)}hookStates(){return{state:this.collapsible&&this.hasHeading?this.collapsed?`closed`:`open`:void 0,size:this.size,variant:this.variant,color:this.color}}render(){let e=this.locale.t,t=this.hasHeading,n=this.collapsible&&t,r=!this.collapsed,i=this.slots.test(`[default]`),a=!this.noAnimation,o=this.borderRadius,s=this.alertRole??(this.color===`danger`||this.color===`warning`?`alert`:`status`);return _`<div
part="root"
class=${v({alert:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,withIcon:!this.hideIcon,withTitle:t,banner:this.banner,withAnimation:a,[`animation-${this.animationName}`]:a&&vr.includes(this.animationName),withElevation:this.elevation,rounded:!this.square,expanded:r,collapsible:n})}
style=${g({borderRadius:o==null||o===``?void 0:/^\d+(\.\d+)?$/.test(String(o))?`${o}px`:String(o)})}
role=${s}
aria-label=${this.aria.label??u}
>
${this.hideIcon?u:_`<span
part="icon"
class="icon"
role="img"
aria-label=${this.iconLabel??e(`alert.icon.${this.color}`)}
><slot name="icon">${_r[this.color]??_r.info}</slot></span
>`}
<div class="content">
${t?_`<div class="title" part="title">
<slot name="heading">${this.heading}</slot>
${n?_`<button
type="button"
part="trigger"
class="expandButton"
aria-label=${r?this.collapseLabel??e(`alert.collapse`):this.expandLabel??e(`alert.expand`)}
aria-expanded=${String(r)}
aria-controls=${r&&i?`message`:u}
@click=${this.handleExpand}
>
${r?Ht:Yn}
</button>`:u}
</div>`:u}
${i&&(!n||r)?_`<div id="message" class="message" part="description">
<slot></slot>
</div>`:u}
</div>
${this.slots.test(`action`)?_`<div class="action" part="action">
<slot name="action"></slot>
</div>`:u}
${this.closable?_`<button
type="button"
part="close-button"
class="closeButton"
aria-label=${this.closeLabel??e(`alert.close`)}
@click=${this.handleClose}
>
<slot name="close-icon">${Bt}</slot>
</button>`:u}
</div>`}},L([f({reflect:!0})],R.prototype,`color`,void 0),L([f({reflect:!0})],R.prototype,`variant`,void 0),L([f({reflect:!0})],R.prototype,`size`,void 0),L([f()],R.prototype,`heading`,void 0),L([f({type:Boolean,attribute:`hide-icon`})],R.prototype,`hideIcon`,void 0),L([f({type:Boolean,reflect:!0})],R.prototype,`closable`,void 0),L([f({type:Boolean,attribute:`no-animation`})],R.prototype,`noAnimation`,void 0),L([f({attribute:`animation-name`})],R.prototype,`animationName`,void 0),L([f({type:Boolean,reflect:!0})],R.prototype,`banner`,void 0),L([f({type:Boolean,reflect:!0})],R.prototype,`elevation`,void 0),L([f({type:Boolean,reflect:!0})],R.prototype,`square`,void 0),L([f({attribute:`border-radius`})],R.prototype,`borderRadius`,void 0),L([f({type:Boolean,reflect:!0})],R.prototype,`collapsible`,void 0),L([f({type:Boolean,reflect:!0})],R.prototype,`collapsed`,void 0),L([f({attribute:`close-label`})],R.prototype,`closeLabel`,void 0),L([f({attribute:`expand-label`})],R.prototype,`expandLabel`,void 0),L([f({attribute:`collapse-label`})],R.prototype,`collapseLabel`,void 0),L([f({attribute:`icon-label`})],R.prototype,`iconLabel`,void 0),L([f({attribute:`alert-role`})],R.prototype,`alertRole`,void 0),L([f({attribute:!1})],R.prototype,`returnFocus`,void 0)})))()}var br,xr,Sr,Cr,z;function wr(){return(wr=e((()=>{O(),C(),rt(),I(),j(),M(),N(),fn(),On(),tr(),er(),sr(),or(),d(),h(),m(),ie(),br=[`expanded`,`compact`,`floating`],xr=`(max-width: 768px)`,Sr=()=>typeof window<`u`&&typeof window.matchMedia==`function`?window.matchMedia(xr):null,Cr={iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,control:!0},z=class e extends E{constructor(...e){super(...e),this.brand=``,this.sidebarMode=`expanded`,this.noSkipLink=!1,this.collapsed=!1,this.mobile=!1,this.drawerOpen=!1,this.hovered=!1,this.keyboardFocus=!1,this.locale=new T(this),this.slots=new k(this),this.modal=new Qn(this),this.focusScope=new ar(this,()=>({trapped:!0,loop:!0,restoreFocus:!1})),this.layer=new Zn(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.headerToggle],onFocusOutside:e=>e.preventDefault(),onDismiss:()=>this.requestDrawer(!1)})),this.query=null,this.drawerActive=!1,this.handleMediaChange=()=>this.syncMobile()}static{this.tagName=`minerva-app-shell`}static{this.styles=[D,$n,p`
:host{
display: block;
}
`,F(sn),F(bn)]}openNavigation(){this.mobile&&(this.drawerOpen=!0)}closeNavigation(){this.drawerOpen=!1}expandNavigation(){this.sidebarMode=`expanded`}focusMain(){this.main?.focus()}connectedCallback(){super.connectedCallback(),this.query=Sr(),this.query?.addEventListener(`change`,this.handleMediaChange),this.syncMobile()}disconnectedCallback(){super.disconnectedCallback(),this.query?.removeEventListener(`change`,this.handleMediaChange),this.query=null,this.deactivateDrawer()}syncMobile(){let e=!!this.query?.matches;e!==this.mobile&&(this.mobile=e,this.hovered=!1,this.keyboardFocus=!1,this.drawerOpen=!1)}get mode(){return br.includes(this.sidebarMode)?this.sidebarMode:`expanded`}setMode(e){e!==this.mode&&this.emit(`minerva-sidebar-mode-change`,{mode:e},{cancelable:!0})&&(this.sidebarMode=e)}requestDrawer(e){e!==this.drawerOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.drawerOpen=e)}willUpdate(e){e.has(`navigationKey`)&&e.get(`navigationKey`)!==void 0&&(this.drawerOpen=!1),this.mobile||(this.drawerOpen=!1),this.collapsed=!this.mobile&&this.mode!==`expanded`&&(this.mode!==`floating`||!this.hovered&&!this.keyboardFocus)}updated(t){let n=this.mobile&&this.drawerOpen;n&&!this.drawerActive&&this.drawer?(this.drawerActive=!0,jt(this.overlay),jt(this.drawer),this.modal.activate(this),this.layer.activate(this.drawer),this.focusScope.activate(this.drawer)):!n&&this.drawerActive&&(this.deactivateDrawer(),this.headerToggle?.focus()),A&&t.has(`sidebarMode`)&&!br.includes(this.sidebarMode)&&w(e.tagName,`unknown sidebar-mode="${this.sidebarMode}" (expected ${br.join(`, `)}); using "expanded".`),A&&!this.slots.test(`navigation`)&&w(e.tagName,`put the navigation in the "navigation" slot (e.g. <nav slot="navigation">).`)}hookStates(){return{state:this.mobile&&this.drawerOpen?`open`:`closed`}}deactivateDrawer(){this.drawerActive&&(this.drawerActive=!1,this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate(),P(this.drawer),P(this.overlay))}label(e,t){return e??this.locale.t(`appShell.${t}`)}handleSkip(e){e.preventDefault(),this.focusMain()}handleSidebarFocusIn(e){let t=e.composedPath()[0],n;try{n=!!t?.matches?.(`:focus-visible`)}catch{n=!1}n&&(this.keyboardFocus=!0)}handleSidebarFocusOut(e){let t=e.relatedTarget;(!t||!this.sidebar||!l(this.sidebar,t))&&(this.keyboardFocus=!1)}renderHeaderToggle(){return this.mobile?_`<button
type="button"
class=${v(Cr)}
aria-label=${this.label(this.openNavigationLabel,`openNavigation`)}
aria-haspopup="dialog"
aria-expanded=${String(this.drawerOpen)}
aria-controls=${this.drawerOpen?`drawer`:u}
@click=${()=>this.requestDrawer(!this.drawerOpen)}
>
${Et}
</button>`:this.renderCollapseControl()}renderCollapseControl(){let e=this.mode!==`expanded`;return _`<button
type="button"
class=${v(Cr)}
aria-label=${e?this.label(this.expandLabel,`expand`):this.label(this.collapseLabel,`collapse`)}
aria-controls="sidebar"
aria-expanded=${String(!this.collapsed)}
@click=${()=>this.setMode(e?`expanded`:`compact`)}
>
${e?Et:at}
</button>`}renderSidebar(){let e=this.mode===`floating`,t=this.label(this.navigationLabel,`navigation`);return _`<aside
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
${this.slots.test(`brand-icon`)?_`<span class="brandIcon" aria-hidden="true"
><slot name="brand-icon"></slot
></span>`:u}
<span class="brandLabel"><slot name="brand">${this.brand}</slot></span>
</div>
<div class="navigation"><slot name="navigation"></slot></div>
<div class="sidebarActions">
${this.renderCollapseControl()}
<button
type="button"
class=${v(Cr)}
aria-pressed=${String(e)}
aria-label=${e?this.label(this.disableFloatingLabel,`disableFloating`):this.label(this.enableFloatingLabel,`enableFloating`)}
@click=${()=>this.setMode(e?`compact`:`floating`)}
>
${e?Un:$e}
</button>
</div>
</aside>`}renderDrawer(){let e=this.label(this.navigationLabel,`navigation`);return _`<div
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
${Bt}
</button>
</div>`}render(){let e=this.skipLink||this.locale.t(`appShell.skipToContent`);return _`<div
class="shell"
part="root"
data-sidebar-mode=${this.mode}
data-sidebar-expanded=${this.collapsed?u:`true`}
>
${this.noSkipLink?u:_`<a
class="skipLink"
part="skip-link"
href="#main"
@click=${this.handleSkip}
>${e}</a
>`}
${this.mobile?u:this.renderSidebar()}
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
${this.mobile&&this.drawerOpen?this.renderDrawer():u}`}},L([f()],z.prototype,`brand`,void 0),L([f({attribute:`sidebar-mode`,reflect:!0})],z.prototype,`sidebarMode`,void 0),L([f({attribute:`navigation-label`})],z.prototype,`navigationLabel`,void 0),L([f({attribute:`navigation-key`})],z.prototype,`navigationKey`,void 0),L([f({attribute:`skip-link`})],z.prototype,`skipLink`,void 0),L([f({type:Boolean,attribute:`no-skip-link`})],z.prototype,`noSkipLink`,void 0),L([f({attribute:`expand-label`})],z.prototype,`expandLabel`,void 0),L([f({attribute:`collapse-label`})],z.prototype,`collapseLabel`,void 0),L([f({attribute:`enable-floating-label`})],z.prototype,`enableFloatingLabel`,void 0),L([f({attribute:`disable-floating-label`})],z.prototype,`disableFloatingLabel`,void 0),L([f({attribute:`open-navigation-label`})],z.prototype,`openNavigationLabel`,void 0),L([f({attribute:`close-navigation-label`})],z.prototype,`closeNavigationLabel`,void 0),L([f({type:Boolean,reflect:!0})],z.prototype,`collapsed`,void 0),L([f({type:Boolean,reflect:!0})],z.prototype,`mobile`,void 0),L([y()],z.prototype,`drawerOpen`,void 0),L([y()],z.prototype,`hovered`,void 0),L([y()],z.prototype,`keyboardFocus`,void 0),L([b(`.header button`)],z.prototype,`headerToggle`,void 0),L([b(`.drawer`)],z.prototype,`drawer`,void 0),L([b(`.overlay`)],z.prototype,`overlay`,void 0),L([b(`main`)],z.prototype,`main`,void 0),L([b(`aside`)],z.prototype,`sidebar`,void 0)})))()}var Tr,B;function Er(){return(Er=e((()=>{x(),O(),C(),I(),xn(),j(),M(),N(),sr(),Qt(),En(),zn(),d(),h(),m(),Ue(),ie(),Be(),Tr={top:`top-start`,bottom:`bottom-start`,left:`left-start`,right:`right-start`},B=class e extends vn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.label=``,this.placeholder=``,this.mode=`basic`,this.size=`medium`,this.variant=`outline`,this.invalid=!1,this.readOnly=!1,this.loading=!1,this.placement=`bottom`,this.offset={x:0,y:4},this.noAnimation=!1,this.autoHighlight=!1,this.noFillOnSelect=!1,this.groupMode=`first`,this.focusedIndex=-1,this.hoveredIndex=-1,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.slots=new k(this),this.floating=new rr(this,()=>{let e=this.placement===`top`||this.placement===`bottom`,t=this.offset??{x:0,y:4};return{anchor:()=>this.container,floating:()=>this.popup,placement:Tr[this.placement]??`bottom-start`,offset:{mainAxis:e?t.y:t.x,crossAxis:e?t.x:t.y},matchAnchorWidth:`min`,branches:()=>[this.container],onEscapeKeyDown:e=>{(this.composing||e.isComposing)&&e.preventDefault()},onDismiss:()=>this.close(),returnFocusOnEscape:()=>this.input,onPosition:()=>this.syncHookStates()}}),this.composing=!1,this.dirty=!1}static{this.tagName=`minerva-autocomplete`}static{this.shadowRootOptions={...vn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,$n,F(Nn),F(Jt),p`
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
`]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}get blocked(){return this.isDisabled||this.readOnly}get shown(){return this.open&&!this.blocked}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.focusedIndex=-1}restoreFormState(e){typeof e==`string`&&(this.value=e)}get processedOptions(){let e=this.value,t=e.toLowerCase(),n=(this.options??[]).filter(n=>this.filterOption?this.filterOption(e,n):n.label.toLowerCase().includes(t));return this.sortOption?[...n].sort(this.sortOption):n}groupOptions(e){let t=this.groupBy;if(!t)return null;if(this.groupMode===`adjacent`){let n=[];for(let r of e){let e=t(r),i=n[n.length-1];i&&i[0]===e?i[1].push(r):n.push([e,[r]])}return n}let n=new Map;for(let r of e){let e=t(r),i=n.get(e);i?i.push(r):n.set(e,[r])}return Array.from(n.entries())}get navigableOptions(){let e=this.processedOptions,t=this.groupOptions(e);return t?t.flatMap(([,e])=>e):e}activeIndex(e){return this.focusedIndex>=0?this.focusedIndex:this.autoHighlight&&this.shown?e.findIndex(e=>!e.disabled):-1}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(){this.blocked||this.requestOpen(!0)}close(){this.requestOpen(!1),this.focusedIndex=-1}setText(e,t){e!==this.value&&(this.value=e,this.emit(`minerva-input`,{value:e}),t&&this.emit(`minerva-change`,{value:e}))}moveFocus(e){let t=this.navigableOptions,n=t.length;if(n===0)return;let r=this.activeIndex(t),i=r>=0?r:e===1?-1:n;for(let r=0;r<n;r+=1)if(i=(i+e+n)%n,!t[i].disabled){this.focusedIndex=i;return}}selectOption(e){e.disabled||(this.noFillOnSelect||this.setText(e.label,!0),this.close(),this.emit(`minerva-select`,{value:e.value,option:e}))}handleKeyDown(e){if(!(this.blocked||this.composing||e.isComposing||e.keyCode===229))switch(e.key){case`ArrowDown`:case`ArrowUp`:e.preventDefault(),this.open||this.openDropdown(),this.moveFocus(e.key===`ArrowDown`?1:-1);break;case`Enter`:{let t=this.navigableOptions,n=this.shown?t[this.activeIndex(t)]:void 0,r=this.value.trim();n?(e.preventDefault(),this.selectOption(n)):r&&(e.preventDefault(),this.emit(`minerva-submit`,{value:r}),this.close());break}case`Escape`:!this.shown&&!this.floating.isOpen&&this.value!==``&&(e.preventDefault(),this.setText(``,!0),this.focusedIndex=-1)}}handleInput(){this.setText(this.input.value,!1),this.focusedIndex=-1,this.openDropdown()}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleBlur(e){let t=e.relatedTarget;t&&(this.popup?.contains(t)||this.container?.contains(t))||this.close()}handleOptionClick(e){e.disabled||this.composing||(this.selectOption(e),this.input?.focus())}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),this.open&&this.blocked&&(this.open=!1,this.focusedIndex=-1)}hookStates(){let e=this.shown&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?we(e):{side:void 0,align:void 0};return{state:this.shown?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,loading:this.loading,side:t,align:n,placement:e}}updated(t){if(super.updated(t),this.floating.sync(this.shown),t.has(`focusedIndex`)&&this.focusedIndex>=0&&this.shadowRoot?.getElementById(`option-${this.focusedIndex}`)?.scrollIntoView?.({block:`nearest`}),A&&t.has(`options`)){let t=new Set;for(let n of this.options??[]){if(t.has(n.value)){w(e.tagName,`several options have the value "${n.value}"; option values must be unique.`);break}t.add(n.value)}}}renderOptionContent(e){return this.mode===`custom`&&this.renderOption?this.renderOption(e):_`<div class="basicOption">
${e.icon?_`<span class="icon">${e.icon}</span>`:u}
<div class="content">
<div class="label">${e.label}</div>
${e.description?_`<div class="description">${e.description}</div>`:u}
</div>
</div>`}renderOptionItem(e,t,n){let r=n===t,i=this.hoveredIndex===t||r,a=!!e.disabled;return _`<div
part=${pn(`item`,{highlighted:i,disabled:a})}
class=${v({optionItem:!0,disabled:a,highlight:!!e.highlight,active:i})}
style=${e.style?g(e.style):u}
role="option"
tabindex="-1"
id=${`option-${t}`}
aria-selected=${String(r)}
aria-disabled=${e.disabled?`true`:u}
@mousedown=${e=>e.preventDefault()}
@click=${()=>this.handleOptionClick(e)}
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),t.stopPropagation(),this.handleOptionClick(e))}}
@mouseenter=${()=>this.hoveredIndex=t}
@mouseleave=${()=>this.hoveredIndex=-1}
>
${this.renderOptionContent(e)}
</div>`}renderList(){let{t:e}=this.locale;if(this.loading)return _`<div role="presentation" class="loading" part="loading">
<span role="progressbar" aria-label=${e(`common.loading`)}
>${st}</span
>
</div>`;let t=this.processedOptions;if(t.length===0)return _`<div role="presentation" class="empty" part="empty">
${this.renderEmpty?.()||_`${Nt}<span>${e(`empty.description`)}</span>`}
</div>`;let n=this.groupOptions(t),r=n?n.flatMap(([,e])=>e):t,i=this.activeIndex(r);return n?n.map(([e,t])=>{let n=t.map(e=>this.renderOptionItem(e,r.indexOf(e),i));return e===``?n:_`<div class="optionGroup" role="group" aria-label=${e}>
<div class="groupLabel" part="group-label" aria-hidden="true">
${e}
</div>
${n}
</div>`}):t.map((e,t)=>this.renderOptionItem(e,t,i))}render(){let e=this.shown,t=this.isDisabled,n=e?this.navigableOptions:[],r=e?this.activeIndex(n):-1,i=e&&r>=0&&r<n.length?`option-${r}`:void 0,a=this.label?void 0:this.aria.label;return _`<div
part="root"
class="autoComplete"
@compositionstart=${()=>this.composing=!0}
@compositionend=${()=>this.composing=!1}
>
${this.label?_`<label for="input" class="label" part="label"
>${this.label}</label
>`:u}
<div
part="field"
class=${v({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?_`<span class="addon start"><slot name="prefix"></slot></span>`:u}
<input
id="input"
part="input"
class="field"
type="text"
role="combobox"
aria-autocomplete="list"
aria-expanded=${String(e)}
aria-controls=${e?`listbox`:u}
aria-activedescendant=${i??u}
aria-label=${a??u}
aria-description=${this.aria.description??u}
aria-required=${this.required?`true`:u}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:u}
data-minerva-escape-consumer=${!e&&this.value!==``?``:u}
autocomplete="off"
.value=${Ge(this.value)}
placeholder=${this.placeholder||u}
?disabled=${t}
?readonly=${this.readOnly}
@input=${this.handleInput}
@change=${this.handleChange}
@focus=${()=>this.openDropdown()}
@click=${()=>{this.open||this.openDropdown()}}
@blur=${this.handleBlur}
@keydown=${this.handleKeyDown}
/>
${this.slots.test(`suffix`)?_`<span class="addon end"><slot name="suffix"></slot></span>`:u}
</div>
${e?_`<div class="popup" part="content" popover="manual">
<div
class=${v({dropdown:!0,animated:!this.noAnimation})}
>
<div
class="optionList"
part="list"
role="listbox"
id="listbox"
aria-label=${this.label||a||u}
aria-busy=${this.loading?`true`:u}
>
${this.renderList()}
</div>
</div>
</div>`:u}
</div>`}},L([f({attribute:!1})],B.prototype,`value`,void 0),L([f({attribute:`value`})],B.prototype,`defaultValue`,void 0),L([f({attribute:!1})],B.prototype,`options`,void 0),L([f({type:Boolean,reflect:!0})],B.prototype,`open`,void 0),L([f()],B.prototype,`label`,void 0),L([f()],B.prototype,`placeholder`,void 0),L([f({reflect:!0})],B.prototype,`mode`,void 0),L([f({reflect:!0})],B.prototype,`size`,void 0),L([f({reflect:!0})],B.prototype,`variant`,void 0),L([f({type:Boolean,reflect:!0})],B.prototype,`invalid`,void 0),L([f({type:Boolean,reflect:!0,attribute:`readonly`})],B.prototype,`readOnly`,void 0),L([f({type:Boolean,reflect:!0})],B.prototype,`loading`,void 0),L([f({reflect:!0})],B.prototype,`placement`,void 0),L([f({attribute:!1})],B.prototype,`offset`,void 0),L([f({type:Boolean,attribute:`no-animation`})],B.prototype,`noAnimation`,void 0),L([f({type:Boolean,attribute:`auto-highlight`})],B.prototype,`autoHighlight`,void 0),L([f({type:Boolean,attribute:`no-fill-on-select`})],B.prototype,`noFillOnSelect`,void 0),L([f({attribute:`group-mode`})],B.prototype,`groupMode`,void 0),L([f({attribute:!1})],B.prototype,`filterOption`,void 0),L([f({attribute:!1})],B.prototype,`sortOption`,void 0),L([f({attribute:!1})],B.prototype,`groupBy`,void 0),L([f({attribute:!1})],B.prototype,`renderOption`,void 0),L([f({attribute:!1})],B.prototype,`renderEmpty`,void 0),L([y()],B.prototype,`focusedIndex`,void 0),L([y()],B.prototype,`hoveredIndex`,void 0),L([b(`input`)],B.prototype,`input`,void 0),L([b(`.autoComplete`)],B.prototype,`container`,void 0),L([b(`.popup`)],B.prototype,`popup`,void 0)})))()}function Dr(e){let t=e?.trim()??``;return t?kr.test(t[0])?t[0]:t.split(/\s+/).slice(0,2).map(e=>e[0].toUpperCase()).join(``):``}var Or,kr,Ar,jr,Mr;function Nr(){return(Nr=e((()=>{x(),O(),I(),j(),M(),N(),hn(),wn(),d(),h(),m(),Ue(),Or=[`xsmall`,`small`,`medium`,`large`,`xlarge`,`xxlarge`],kr=/[㐀-鿿豈-﫿]/,Ar={fromAttribute:e=>e&&/^\d+(\.\d+)?$/.test(e)?Number(e):e??`medium`,toAttribute:e=>String(e)},jr=class e extends E{constructor(...e){super(...e),this.name=``,this.shape=`circle`,this.size=`medium`,this.stacked=!1,this.locale=new T(this),this.aria=new S(this),this.slots=new k(this)}static{this.tagName=`minerva-avatar`}static{this.styles=[D,p`
:host{
display: inline-block;
flex-shrink: 0;
vertical-align: middle;
line-height: 0;
}
.avatarText{
line-height: 1;
}
`,F(Mn)]}hookStates(){return{size:typeof this.size==`number`?void 0:this.size,shape:this.shape}}updated(t){A&&t.has(`size`)&&typeof this.size!=`number`&&!Or.includes(this.size)&&w(e.tagName,`unknown size "${this.size}": use a preset (${Or.join(`, `)}) or a number of pixels.`)}render(){let e=!!this.src&&this.failedSrc!==this.src,t=this.aria.label??(this.name||this.locale.t(`avatar.default`)),n=typeof this.size==`number`,r=v({avatar:!0,[this.shape]:!0,[String(this.size)]:!n,stacked:this.stacked}),i=g(n?{"--avatar-size":`${this.size}px`,width:`${this.size}px`,height:`${this.size}px`}:{});if(e)return _`<span part="root" class=${r} style=${i}
><img
part="image"
class="avatarImg"
alt=${this.alt??t}
src=${this.src}
draggable="false"
@error=${()=>this.failedSrc=this.src}
/></span>`;let a=Dr(this.name),o=this.slots.test(`fallback`)?_`<slot name="fallback"></slot>`:a||_`<slot></slot>`;return _`<span
part="root"
role="img"
aria-label=${t}
class=${r}
style=${i}
><span part="fallback" class="avatarText" aria-hidden="true"
>${o}</span
></span
>`}},L([f()],jr.prototype,`src`,void 0),L([f()],jr.prototype,`name`,void 0),L([f()],jr.prototype,`alt`,void 0),L([f({reflect:!0})],jr.prototype,`shape`,void 0),L([f({reflect:!0,converter:Ar})],jr.prototype,`size`,void 0),L([f({type:Boolean,reflect:!0})],jr.prototype,`stacked`,void 0),L([y()],jr.prototype,`failedSrc`,void 0),Mr=class e extends E{constructor(...e){super(...e),this.locale=new T(this),this.aria=new S(this),this.slots=new k(this)}static{this.tagName=`minerva-avatar-group`}static{this.shadowRootOptions={...E.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[D,p`
:host{
display: flex;
}
.avatarGroup{
flex: 1 1 auto;
min-width: 0;
}
`,F(Ln)]}visibleAvatars(){let e=Array.from(this.children);return this.max===void 0||this.max===null?e:e.slice(0,Math.max(0,this.max))}updated(t){let n=this.visibleAvatars();Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,t)=>{let r=n[t];r&&typeof e.assign==`function`&&e.assign(r)}),A&&t.has(`max`)&&this.max!==void 0&&this.max!==null&&!(Number.isInteger(this.max)&&this.max>=0)&&w(e.tagName,`max must be a non-negative integer (got ${this.max}).`)}render(){this.slots;let e=this.children.length,t=this.visibleAvatars(),n=(Number(this.count)||0)+e-t.length,r=this.aria.label??(n>0?this.locale.t(`avatar.groupWithMore`,{count:n}):this.locale.t(`avatar.group`));return _`<div
part="root"
role="group"
class="avatarGroup"
aria-label=${r}
>
${t.map(()=>_`<div part="item" class="avatarGroupItem">
<slot data-item></slot>
</div>`)}
${n>0?_`<div part="count" class="count" aria-hidden="true">
+${n}
</div>`:u}
</div>`}},L([f({type:Number})],Mr.prototype,`count`,void 0),L([f({type:Number})],Mr.prototype,`max`,void 0)})))()}var Pr;function Fr(){return(Fr=e((()=>{x(),O(),I(),j(),M(),N(),rn(),d(),h(),m(),Ue(),Pr=class e extends E{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.position=`top-right`,this.dot=!1,this.badgeRole=`status`,this.locale=new T(this),this.aria=new S(this),this.slots=new k(this)}static{this.tagName=`minerva-badge`}static{this.styles=[D,p`
:host{
display: inline-flex;
vertical-align: middle;
}
`,F(Qe)]}hasElementChildren(){return Array.from(this.children).some(e=>!e.hasAttribute(`slot`)||e.getAttribute(`slot`)===``)}hookStates(){return{size:this.size,variant:this.variant,color:this.color}}updated(){A&&this.dot&&!this.aria.label&&![`presentation`,`none`].includes(this.badgeRole)&&w(e.tagName,`a dot badge has no text: set aria-label (e.g. "New messages") or badge-role="presentation".`)}render(){let e=this.slots.test(`[default]`),t=e&&!this.hasElementChildren(),n=this.content!==void 0&&this.content!==null||this.slots.test(`content`),r=!e||t&&!n,i=u;this.dot||(n?i=_`<slot name="content">${this.content}</slot>`:t?i=_`<slot></slot>`:e&&(i=this.locale.t(`badge.default`)));let a=_`<span
part=${r?`root`:`badge`}
class=${v({badge:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,standalone:r,[this.position]:!r,dot:this.dot})}
role=${this.badgeRole||u}
aria-label=${this.aria.label??u}
style=${g({borderRadius:this.borderRadius,borderWidth:this.borderWidth})}
>${this.slots.test(`icon`)?_`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:u}${i}</span
>`;return r?a:_`<div part="root" class="badgeWrapper">
<div class="content"><slot></slot></div>
${a}
</div>`}},L([f({reflect:!0})],Pr.prototype,`color`,void 0),L([f({reflect:!0})],Pr.prototype,`variant`,void 0),L([f({reflect:!0})],Pr.prototype,`size`,void 0),L([f()],Pr.prototype,`content`,void 0),L([f({reflect:!0})],Pr.prototype,`position`,void 0),L([f({type:Boolean,reflect:!0})],Pr.prototype,`dot`,void 0),L([f({attribute:`border-radius`})],Pr.prototype,`borderRadius`,void 0),L([f({attribute:`border-width`})],Pr.prototype,`borderWidth`,void 0),L([f({attribute:`badge-role`})],Pr.prototype,`badgeRole`,void 0)})))()}function Ir(e){return e.replace(/[;{}<>]/g,``)}var Lr;function Rr(){return(Rr=e((()=>{c(),Lr={fromAttribute:e=>{if(e===null)return;let t=e.trim();return/^-?\d+(\.\d+)?$/.test(t)?Number(t):t},toAttribute:e=>e===void 0?null:String(e)}})))()}var zr,Br,Vr,V,H;function Hr(){return(Hr=e((()=>{O(),j(),Rr(),d(),h(),zr={bg:`var(--surface-color)`,"bg.subtle":`var(--surface-subtle-color)`,"bg.muted":`var(--surface-muted-color)`,"bg.emphasis":`var(--surface-muted-color)`,"bg.canvas":`var(--canvas-color)`,"bg.elevated":`var(--surface-elevated-color)`},Br=[`none`,`sm`,`md`,`lg`,`xl`,`2xl`,`full`],Vr=[`sm`,`md`,`lg`,`xl`],V={converter:Lr},H=class e extends E{static{this.tagName=`minerva-box`}static{this.styles=[D,p`
:host{
display: block;
}
`]}declarations(){let e=[],t=(t,...n)=>{if(t!==void 0&&t!==``)for(let r of n)e.push([r,ae(t)])},n=(t,n)=>{t!==void 0&&t!==``&&e.push([n,ne(t)])};return t(this.p,`padding`),t(this.px,`padding-left`,`padding-right`),t(this.py,`padding-top`,`padding-bottom`),t(this.pt,`padding-top`),t(this.pr,`padding-right`),t(this.pb,`padding-bottom`),t(this.pl,`padding-left`),t(this.m,`margin`),t(this.mx,`margin-left`,`margin-right`),t(this.my,`margin-top`,`margin-bottom`),t(this.mt,`margin-top`),t(this.mr,`margin-right`),t(this.mb,`margin-bottom`),t(this.ml,`margin-left`),n(this.w,`width`),n(this.h,`height`),n(this.minW,`min-width`),n(this.minH,`min-height`),n(this.maxW,`max-width`),n(this.maxH,`max-height`),this.bg&&e.push([`background`,zr[this.bg]??this.bg]),this.rounded&&e.push([`border-radius`,Br.includes(this.rounded)?`var(--radius-${this.rounded})`:this.rounded]),this.boxShadow&&e.push([`box-shadow`,Vr.includes(this.boxShadow)?`var(--shadow-${this.boxShadow})`:this.boxShadow]),this.border&&e.push([`border`,this.border]),e}updated(){A&&this.bg?.startsWith(`bg.`)&&!(this.bg in zr)&&w(e.tagName,`unknown surface alias bg="${this.bg}" (expected one of ${Object.keys(zr).join(`, `)}).`)}render(){let e=this.declarations().map(([e,t])=>`${e}:${Ir(t)};`).join(``);return _`<style>
:host{${e}}
</style>
<slot></slot>`}},L([f(V)],H.prototype,`p`,void 0),L([f(V)],H.prototype,`px`,void 0),L([f(V)],H.prototype,`py`,void 0),L([f(V)],H.prototype,`pt`,void 0),L([f(V)],H.prototype,`pr`,void 0),L([f(V)],H.prototype,`pb`,void 0),L([f(V)],H.prototype,`pl`,void 0),L([f(V)],H.prototype,`m`,void 0),L([f(V)],H.prototype,`mx`,void 0),L([f(V)],H.prototype,`my`,void 0),L([f(V)],H.prototype,`mt`,void 0),L([f(V)],H.prototype,`mr`,void 0),L([f(V)],H.prototype,`mb`,void 0),L([f(V)],H.prototype,`ml`,void 0),L([f(V)],H.prototype,`w`,void 0),L([f(V)],H.prototype,`h`,void 0),L([f({converter:Lr,attribute:`min-w`})],H.prototype,`minW`,void 0),L([f({converter:Lr,attribute:`min-h`})],H.prototype,`minH`,void 0),L([f({converter:Lr,attribute:`max-w`})],H.prototype,`maxW`,void 0),L([f({converter:Lr,attribute:`max-h`})],H.prototype,`maxH`,void 0),L([f()],H.prototype,`bg`,void 0),L([f()],H.prototype,`rounded`,void 0),L([f({attribute:`box-shadow`})],H.prototype,`boxShadow`,void 0),L([f()],H.prototype,`border`,void 0)})))()}var Ur,U;function Wr(){return(Wr=e((()=>{x(),O(),un(),j(),M(),N(),Ot(),d(),h(),m(),Ue(),Ur=e=>`borderRadius${e.charAt(0).toUpperCase()}${e.slice(1)}`,U=class e extends E{constructor(...e){super(...e),this.color=`primary`,this.variant=`solid`,this.size=`medium`,this.disabled=!1,this.loading=!1,this.fullWidth=!1,this.active=!1,this.type=`button`,this.internals=Kt(this),this.aria=new S(this),this.slots=new k(this),this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-button`}static{this.formAssociated=!0}static{this.styles=[D,p`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
:host([full-width]){
display: flex;
width: 100%;
}
`,F(Wt)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0)}hookStates(){return{state:this.active?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){A&&this.shape===`circle`&&!this.aria.label&&(this.textContent?.trim()||w(e.tagName,`shape="circle" buttons usually only contain an icon: set aria-label to give them an accessible name.`))}render(){let e=this.borderRadius,t=typeof e==`number`||typeof e==`string`&&/^\d+(\.\d+)?$/.test(e),n=this.loading&&this.slots.test(`loading`),r=this.loading&&!n,i=_`<span
class="loadingSpinner"
part="spinner"
aria-hidden="true"
></span>`;return _`<button
part="root"
type="button"
class=${v({customButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape??``]:!!this.shape,[Ur(String(e??``))]:!!e&&!t,fullWidth:this.fullWidth,active:this.active,loading:this.loading})}
style=${g(t?{borderRadius:`${Number(e)}px`}:{})}
?disabled=${this.disabled}
aria-label=${this.aria.label??u}
aria-description=${this.aria.description??u}
aria-pressed=${this.aria.attr(`aria-pressed`)??u}
aria-expanded=${this.aria.attr(`aria-expanded`)??u}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??u}
aria-busy=${this.loading?`true`:u}
aria-disabled=${this.loading?`true`:u}
@click=${this.handleClick}
>
${n?_`${i}<span class="label" part="label"
><slot name="loading"></slot
></span>`:_`${this.loading?i:u}
${this.slots.test(`start`)?_`<span
class=${v({icon:!0,hidden:r})}
part="start-icon"
><slot name="start"></slot
></span>`:u}
<span class=${v({label:!0,hidden:r})} part="label"
><slot></slot
></span>
${this.slots.test(`end`)?_`<span
class=${v({icon:!0,hidden:r})}
part="end-icon"
><slot name="end"></slot
></span>`:u}`}
</button>`}},L([f({reflect:!0})],U.prototype,`color`,void 0),L([f({reflect:!0})],U.prototype,`variant`,void 0),L([f({reflect:!0})],U.prototype,`size`,void 0),L([f({reflect:!0})],U.prototype,`shape`,void 0),L([f({attribute:`border-radius`})],U.prototype,`borderRadius`,void 0),L([f({type:Boolean,reflect:!0})],U.prototype,`disabled`,void 0),L([f({type:Boolean,reflect:!0})],U.prototype,`loading`,void 0),L([f({type:Boolean,reflect:!0,attribute:`full-width`})],U.prototype,`fullWidth`,void 0),L([f({type:Boolean,reflect:!0})],U.prototype,`active`,void 0),L([f({reflect:!0})],U.prototype,`type`,void 0),L([b(`button`)],U.prototype,`button`,void 0)})))()}var Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti,ni,ri,ii;function ai(){return(ai=e((()=>{x(),O(),rt(),un(),j(),N(),Vt(),jn(),d(),h(),m(),c(),Ke(),Gr=[`div`,`article`,`section`,`a`,`button`],Kr=[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`],qr=[`none`,`small`,`medium`,`large`],Jr=`minerva-card-header, minerva-card-content, minerva-card-footer, minerva-card-title, minerva-card-description`,Yr=e=>e&&qr.includes(e)?`pad-${e}`:``,Xr=e=>{let t=e.parentElement??e.getRootNode().host;return!!(t?Wn(t,`minerva-card`):null)?.hasAttribute(`padding`)},Zr=class e extends E{constructor(...e){super(...e),this.variant=`default`,this.interactive=!1,this.as=`div`,this.disabled=!1,this.type=`button`,this.internals=Kt(this),this.aria=new S(this),this.syncParts=()=>{for(let e of Array.from(this.querySelectorAll(Jr)))e.requestUpdate()},this.blockDisabledClicks=e=>{this.tag===`button`&&this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-card`}static{this.formAssociated=!0}static{this.styles=[D,p`
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
`,F(Ut)]}get tag(){return Gr.includes(this.as)?this.as:`div`}focus(e){this.tag===`a`||this.tag===`button`?this.root?.focus(e):super.focus(e)}handleClick(e){if(this.tag!==`button`)return;if(this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}let t=this.internals?.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockDisabledClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockDisabledClicks,!0)}hookStates(){return{variant:this.variant,disabled:this.tag===`button`&&this.disabled}}updated(t){t.has(`padding`)&&this.syncParts(),A&&(this.as&&!Gr.includes(this.as)&&w(e.tagName,`unsupported as="${this.as}" (expected ${Gr.join(`, `)}); rendering a div.`),this.tag===`a`&&!this.href&&w(e.tagName,`as="a" needs an href to be a link (focusable, activatable with Enter).`),this.interactive&&this.tag!==`a`&&this.tag!==`button`&&w(e.tagName,`interactive cards should be links or buttons (as="a" with href, or as="button") so keyboard users can activate them.`))}render(){let t=this.tag,n=v({card:!0,[this.variant]:!0,padded:!!this.padding,[Yr(this.padding)]:!!Yr(this.padding),interactive:this.interactive}),r=this.aria.label??u,i=Je`<slot @slotchange=${this.syncParts}></slot>`;if(t===`a`)return Je`<a
part="root"
class=${n}
href=${vt(e.tagName,this.href)??u}
target=${this.target??u}
rel=${Ie(this.target,this.rel)??u}
download=${this.download??u}
aria-label=${r}
>${i}</a
>`;if(t===`button`)return Je`<button
part="root"
class=${n}
type="button"
?disabled=${this.disabled}
aria-label=${r}
aria-pressed=${this.aria.attr(`aria-pressed`)??u}
aria-expanded=${this.aria.attr(`aria-expanded`)??u}
@click=${this.handleClick}
>
${i}
</button>`;let a=He(t);return Je`<${a} part="root" class=${n}>${i}</${a}>`}},L([f({reflect:!0})],Zr.prototype,`variant`,void 0),L([f({reflect:!0})],Zr.prototype,`padding`,void 0),L([f({type:Boolean,reflect:!0})],Zr.prototype,`interactive`,void 0),L([f({reflect:!0})],Zr.prototype,`as`,void 0),L([f()],Zr.prototype,`href`,void 0),L([f()],Zr.prototype,`target`,void 0),L([f()],Zr.prototype,`rel`,void 0),L([f()],Zr.prototype,`download`,void 0),L([f({type:Boolean,reflect:!0})],Zr.prototype,`disabled`,void 0),L([f()],Zr.prototype,`type`,void 0),L([b(`[part=root]`)],Zr.prototype,`root`,void 0),Qr=p`
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
`,$r=class extends E{constructor(...e){super(...e),this.sectionClass=``}static{this.styles=[D,Qr]}layoutClasses(){let e=this.previousElementSibling?.localName,t=Yr(this.padding);return{[this.sectionClass]:!0,padded:Xr(this),afterHeader:e===`minerva-card-header`,afterContent:e===`minerva-card-content`,[t]:!!t}}render(){return Je`<div part="root" class=${v(this.layoutClasses())}>
<slot></slot>
</div>`}},L([f({reflect:!0})],$r.prototype,`padding`,void 0),ei=class extends $r{constructor(...e){super(...e),this.sectionClass=`cardHeader`}static{this.tagName=`minerva-card-header`}},ti=class extends $r{constructor(...e){super(...e),this.sectionClass=`cardContent`}static{this.tagName=`minerva-card-content`}static{this.styles=[D,Qr,p`
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
`]}layoutClasses(){let e=super.layoutClasses();return this.animation&&(e[this.animation]=!0),e}},L([f({reflect:!0})],ti.prototype,`animation`,void 0),ni=class extends $r{constructor(...e){super(...e),this.sectionClass=`cardFooter`}static{this.tagName=`minerva-card-footer`}},ri=class extends E{constructor(...e){super(...e),this.as=`h3`}static{this.tagName=`minerva-card-title`}static{this.styles=[D,p`
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
`]}render(){let e=He(Kr.includes(this.as)?this.as:`h3`);return Je`<${e}
part="root"
class=${v({cardTitle:!0,padded:Xr(this)})}
><slot></slot></${e}>`}},L([f({reflect:!0})],ri.prototype,`as`,void 0),ii=class extends E{static{this.tagName=`minerva-card-description`}static{this.styles=[D,p`
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
`]}render(){return Je`<p
part="root"
class=${v({cardDescription:!0,padded:Xr(this)})}
>
<slot></slot>
</p>`}}})))()}var oi,si,ci,li,ui,W;function di(){return(di=e((()=>{x(),O(),C(),I(),xn(),j(),N(),sr(),zn(),bt(),d(),h(),m(),ie(),c(),Be(),oi=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n]),si=e=>{let t=new Set;for(let n of e){if(t.has(n.value))return n.value;t.add(n.value);let e=n.children?si(n.children):void 0;if(e!==void 0)return e}},ci={fromAttribute(e){let t=e?.trim()??``;if(!t)return[];if(t.startsWith(`[`))try{let e=JSON.parse(t);if(Array.isArray(e))return e.filter(e=>typeof e==`string`||typeof e==`number`)}catch{}return t.split(`,`).map(e=>e.trim())},toAttribute(e){return JSON.stringify(e)}},li=`[role="option"]:not([aria-disabled="true"])`,ui=0,W=class e extends vn{constructor(...e){super(...e),this.options=[],this.value=[],this.defaultValue=[],this.open=!1,this.label=``,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.expandTrigger=`click`,this.showSearch=!1,this.maxLevel=6,this.width=240,this.expandedValues=[],this.searchValue=``,this.idPrefix=`minerva-cascader-${ui++}`,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.floating=new rr(this,()=>({anchor:()=>this.anchor,floating:()=>this.dropdown,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,branches:()=>[this.anchor],onDismiss:()=>this.closeDropdown(),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.pendingFocus=null,this.dirty=!1,this.widthApplied=!1}static{this.tagName=`minerva-cascader`}static{this.shadowRootOptions={...vn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,$n,p`
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
`,F(ft)]}get selectedOptions(){return _e(this.options,this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get displayText(){let e=this.selectedOptions,t=e.map(e=>String(e.label));return this.displayRender?this.displayRender(t,e):t.join(` / `)}getFormValue(){return this.displayText}syncFormState(){super.syncFormState(),this.internals&&!this.isDisabled&&this.internals.setFormValue(this.getFormValue(),JSON.stringify(this.value))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=[...this.defaultValue],this.open=!1}restoreFormState(e){if(typeof e==`string`)try{let t=JSON.parse(e);Array.isArray(t)&&(this.value=t)}catch{}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=!oi(this.value,this.defaultValue)||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=[...this.defaultValue]),e.has(`open`)&&(this.open?this.expandedValues=[...this.value]:(this.searchValue=``,this.pendingFocus=null)),A&&this.checkDev(e)}checkDev(t){if(t.has(`options`)){let t=si(this.options);t!==void 0&&w(e.tagName,`duplicate option value "${t}" among siblings: values must be unique within a level.`)}(t.has(`options`)||t.has(`value`))&&this.options.length>0&&this.value.length>0&&_e(this.options,this.value).length<this.value.length&&w(e.tagName,`value ${JSON.stringify(this.value)} is not a path of the options tree: it is shown partially (or not at all).`)}hookStates(){let e=this.open&&!this.isDisabled,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?we(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,side:n,align:r,placement:t}}updated(e){if(super.updated(e),e.has(`width`)){let e=this.width,t=e===void 0||e===``?``:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,n=t!==``&&t!==`240px`;(n||this.widthApplied)&&(this.style.width=n?t:``),this.widthApplied=n}this.floating.sync(this.open&&!this.isDisabled);let t=this.pendingFocus;if(t!==null&&this.open){let e=t===-1?this.columns().length-1:t;this.focusColumn(e)&&(this.pendingFocus=null)}}requestOpen(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}openDropdown(e=!1){this.isDisabled||this.readOnly||this.requestOpen(!0)&&(this.expandedValues=[...this.value],this.pendingFocus=e?-1:null)}closeDropdown(e=!1){this.requestOpen(!1)&&(this.searchValue=``,e&&this.input?.focus())}select(e){this.value=e.map(e=>e.value),this.emitChange(e),this.closeDropdown(!0)}emitChange(e){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:[...this.value],selectedOptions:e})}handleActivate(e,t){let n=e[e.length-1];if(n.disabled)return;let r=t>=this.maxLevel-1,i=!!n.children?.length,a=!!this.loadData&&!n.isLeaf&&!n.children;if(!r&&(i||a)){this.expandedValues=e.map(e=>e.value),a&&!n.loading&&this.loadData?.(e);return}this.select(e)}clear(e){e.stopPropagation(),this.value=[],this.searchValue=``,this.emitChange([]),this.emit(`minerva-clear`),this.input?.focus()}get expandedPath(){return _e(this.options,this.expandedValues)}columns(){let e=this.expandedPath,t=[this.options];for(let n=0;n<e.length&&n<this.maxLevel-1;n+=1){let r=e[n].children;if(!r?.length)break;t.push(r)}return t}columnId(e){return`${this.idPrefix}-column-${e}`}focusColumn(e){let t=this.dropdown?.querySelector(`[data-level="${e}"]`);if(!t)return!1;let n=t.querySelector(`[data-expanded]`)??t.querySelector(`[data-selected]`)??t.querySelector(li);return n?.focus(),!!n}canExpand(e,t){return t<this.maxLevel-1&&(!!e.children?.length||!e.isLeaf&&e.children===void 0)}pathTo(e,t){return[...this.expandedPath.slice(0,t),e]}get searching(){return this.showSearch&&this.searchValue!==``}searchResults(){if(!this.searching)return[];let{searchValue:e,filter:t}=this,n=e.toLowerCase();return ye(this.options).filter(({path:r})=>t?t(e,r):r.some(e=>String(e.label).toLowerCase().includes(n)))}focusFirstSearchResult(){this.dropdown?.querySelector(`[role="option"]`)?.focus()}handleSelectorClick(){this.isDisabled||this.readOnly||(this.open?this.showSearch||this.closeDropdown():this.openDropdown())}handleInput(e){let t=e.target.value;this.showSearch&&!this.readOnly&&(this.searchValue=t,this.emit(`minerva-input`,{value:t}),this.open||this.openDropdown())}handleInputKeyDown(e){switch(e.key){case`ArrowDown`:e.preventDefault(),this.open?this.searching?this.focusFirstSearchResult():(this.pendingFocus=-1,this.requestUpdate()):this.openDropdown(!0);break;case`Enter`:e.preventDefault(),this.open||this.openDropdown(!0);break;case` `:if(this.showSearch)break;e.preventDefault(),this.open||this.openDropdown(!0)}}handleFocusOut(e){let t=e.relatedTarget;this.open&&t&&(this.anchor&&l(this.anchor,t)||this.dropdown&&l(this.dropdown,t)||this.closeDropdown())}handleDropdownMouseDown(e){e.target.closest?.(`[role="option"]`)||e.preventDefault()}handleDropdownKeyDown(e){e.key===`Tab`&&this.closeDropdown()}handleOptionKeyDown(e,t,n){let r=e.currentTarget,i=Array.from(r.parentElement?.querySelectorAll(li)??[]),a=i.indexOf(r),o=e=>i[(e+i.length)%i.length]?.focus();switch(Pe(e.key,this)){case`ArrowDown`:e.preventDefault(),o(a+1);break;case`ArrowUp`:e.preventDefault(),o(a-1);break;case`Home`:e.preventDefault(),o(0);break;case`End`:e.preventDefault(),o(i.length-1);break;case`ArrowRight`:if(e.preventDefault(),t.disabled||!this.canExpand(t,n))break;this.pendingFocus=n+1,this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`Enter`:case` `:if(e.preventDefault(),t.disabled)break;this.canExpand(t,n)&&(this.pendingFocus=n+1),this.handleActivate(this.pathTo(t,n),n),this.requestUpdate();break;case`ArrowLeft`:e.preventDefault(),n===0?this.closeDropdown(!0):this.focusColumn(n-1)}}handleSearchKeyDown(e){let t=e.currentTarget,n=Array.from(t.querySelectorAll(`[role="option"]`)),r=n.indexOf(e.target);(e.key===`ArrowDown`||e.key===`ArrowUp`)&&(e.preventDefault(),n[(r+(e.key===`ArrowDown`?1:-1)+n.length)%n.length]?.focus())}renderSearchResults(){let e=this.searchResults();return _`<div
class="searchResults"
role="listbox"
aria-label=${this.label||this.aria.label||u}
tabindex="-1"
@keydown=${this.handleSearchKeyDown}
>
${e.length>0?e.map(({path:e})=>_`<div
class="searchOption"
part="item"
role="option"
aria-selected="false"
tabindex="0"
@keydown=${t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),this.select(e))}}
@click=${()=>this.select(e)}
>
${e.map(e=>e.label).join(` / `)}
</div>`):_`<div class="empty" role="status">
${this.locale.t(`cascader.noResults`)}
</div>`}
</div>`}renderPanel(){let{t:e}=this.locale,t=this.columns(),n=this.expandedPath,r=this.selectedOptions,i=this.label||this.aria.label||e(`cascader.options`);return _`<div class="panel">
${t.map((a,o)=>_`<ul
id=${this.columnId(o)}
data-level=${o}
class="column"
part="column"
role="listbox"
aria-label=${e(`cascader.level`,{label:i,level:o+1})}
>
${a.map(e=>{let i=n[o]?.value===e.value,a=r[o]?.value===e.value,s=this.canExpand(e,o)&&!(!e.children?.length&&e.isLeaf),c=i&&!(a&&o===r.length-1);return _`<li
?data-expanded=${c}
?data-selected=${a}
class=${v({option:!0,active:i||a,disabled:!!e.disabled,loading:!!e.loading})}
part=${pn(`item`,{selected:a,expanded:c,disabled:e.disabled,loading:e.loading})}
role="option"
aria-selected=${a?`true`:`false`}
aria-disabled=${e.disabled?`true`:u}
aria-busy=${e.loading?`true`:u}
aria-controls=${i&&o+1<t.length?this.columnId(o+1):u}
tabindex=${e.disabled?-1:0}
@keydown=${t=>this.handleOptionKeyDown(t,e,o)}
@click=${()=>{e.disabled||this.handleActivate(this.pathTo(e,o),o)}}
@mouseenter=${()=>{this.expandTrigger===`hover`&&!e.disabled&&e.children?.length&&o<this.maxLevel-1&&(this.expandedValues=this.pathTo(e,o).map(e=>e.value))}}
>
${this.optionRender?this.optionRender(e,o):_`<span class="label">${e.label}</span>${e.loading?_`<span
class="loadingIndicator"
aria-hidden="true"
>...</span
>`:s?_`<span class="expandIcon" aria-hidden="true"
>${tt}</span
>`:u}`}
</li>`})}
</ul>`)}
</div>`}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.open&&!t,r=!this.hideClearButton&&this.value.length>0&&!t&&!this.readOnly,i=this.searching?this.searchValue:this.displayText,a=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return _`<div
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
aria-autocomplete=${this.showSearch?`list`:u}
aria-label=${this.aria.label??(this.label||u)}
aria-description=${this.aria.description??u}
aria-invalid=${a?`true`:u}
aria-required=${this.required?`true`:u}
aria-readonly=${this.showSearch&&this.readOnly?`true`:u}
name=${this.name||u}
.value=${Ge(i)}
?readonly=${!this.showSearch||this.readOnly}
?disabled=${t}
?required=${this.required}
autocomplete="off"
placeholder=${this.placeholder??e(`cascader.placeholder`)}
@input=${this.handleInput}
@keydown=${this.handleInputKeyDown}
/>
</div>
${r?_`<button
type="button"
class="clearIcon"
part="clear-button"
aria-label=${e(`cascader.clear`)}
@click=${this.clear}
>
<span class="icon" aria-hidden="true">${Bt}</span>
</button>`:u}
<span
class=${v({arrow:!0,open:n})}
part="icon"
aria-hidden="true"
><span class="icon">${Yn}</span></span
>
</div>
</div>
${n?_`<div
class="dropdown"
part="content"
popover="manual"
@mousedown=${this.handleDropdownMouseDown}
@focusout=${this.handleFocusOut}
@keydown=${this.handleDropdownKeyDown}
>
${this.searching?this.renderSearchResults():this.renderPanel()}
</div>`:u}`}},L([f({attribute:!1})],W.prototype,`options`,void 0),L([f({attribute:!1})],W.prototype,`value`,void 0),L([f({attribute:`value`,converter:ci})],W.prototype,`defaultValue`,void 0),L([f({type:Boolean,reflect:!0})],W.prototype,`open`,void 0),L([f()],W.prototype,`label`,void 0),L([f()],W.prototype,`placeholder`,void 0),L([f({type:Boolean,reflect:!0})],W.prototype,`invalid`,void 0),L([f({type:Boolean,reflect:!0,attribute:`readonly`})],W.prototype,`readOnly`,void 0),L([f({type:Boolean,attribute:`hide-clear-button`})],W.prototype,`hideClearButton`,void 0),L([f({attribute:`expand-trigger`,reflect:!0})],W.prototype,`expandTrigger`,void 0),L([f({type:Boolean,attribute:`show-search`,reflect:!0})],W.prototype,`showSearch`,void 0),L([f({type:Number,attribute:`max-level`})],W.prototype,`maxLevel`,void 0),L([f()],W.prototype,`width`,void 0),L([f({attribute:!1})],W.prototype,`displayRender`,void 0),L([f({attribute:!1})],W.prototype,`filter`,void 0),L([f({attribute:!1})],W.prototype,`loadData`,void 0),L([f({attribute:!1})],W.prototype,`optionRender`,void 0),L([y()],W.prototype,`expandedValues`,void 0),L([y()],W.prototype,`searchValue`,void 0),L([b(`input`)],W.prototype,`input`,void 0),L([b(`.cascader`)],W.prototype,`anchor`,void 0),L([b(`.dropdown`)],W.prototype,`dropdown`,void 0)})))()}var fi,G;function pi(){return(pi=e((()=>{x(),O(),C(),I(),j(),M(),N(),zn(),zt(),d(),h(),m(),Be(),fi=e=>e.charAt(0).toUpperCase()+e.slice(1),G=class e extends vn{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.indeterminate=!1,this.value=`on`,this.label=``,this.shape=`square`,this.size=`medium`,this.color=`primary`,this.labelPlacement=`end`,this.error=!1,this.helperText=``,this.readOnly=!1,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.slots=new k(this),this.dirty=!1}static{this.tagName=`minerva-checkbox`}static{this.shadowRootOptions={...vn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,p`
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
`,F(It)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}click(){this.input?.click()}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(e){e.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked)}updated(t){super.updated(t),this.input&&(this.input.indeterminate=this.indeterminate),A&&!this.aria.label&&!this.label&&!this.textContent?.trim()&&w(e.tagName,`no label: set the label attribute, slot a label, or use aria-label / <label for>.`)}handleClick(e){this.readOnly&&e.preventDefault()}handleChange(){this.readOnly||(this.dirty=!0,this.input.indeterminate=this.indeterminate,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value}))}hookStates(){return{state:this.indeterminate?`indeterminate`:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape}}render(){let e=this.isDisabled,t=!!this.label||this.slots.test(`[default]`),n=[this.helperText,this.aria.description].filter(Boolean).join(` `),r=this.error||this.aria.attr(`aria-invalid`)===`true`;return _`<div
part="root"
class=${v({checkboxWrapper:!0,error:r})}
>
<label
class=${v({checkbox:!0,[this.size]:!0,[this.shape]:!0,[`label${fi(this.labelPlacement)}`]:!0,[`color${fi(this.color)}`]:this.color!==`primary`,disabled:e,error:r})}
>
<input
part="input"
type="checkbox"
class="input"
.checked=${Ge(this.checked)}
?disabled=${e}
?required=${this.required}
aria-checked=${this.indeterminate?`mixed`:u}
aria-label=${this.aria.label??u}
aria-description=${n||u}
aria-invalid=${r?`true`:u}
aria-readonly=${this.readOnly?`true`:u}
@click=${this.handleClick}
@change=${this.handleChange}
/>
<span class="checkmark" part="control"
>${this.checked&&!this.indeterminate?_`<slot name="icon"></slot>`:u}</span
>
${t?_`<span class="label" part="label"
>${this.label||_`<slot></slot>`}</span
>`:u}
</label>
${this.helperText?_`<div class="helperTextWrapper">
${r?_`<span class="errorIcon" aria-hidden="true"
>${Ct}</span
>`:u}
<span
part="helper-text"
class=${v({helperText:!0,errorText:r})}
>${this.helperText}</span
>
</div>`:u}
</div>`}},L([f({attribute:!1})],G.prototype,`checked`,void 0),L([f({type:Boolean,attribute:`checked`,reflect:!0})],G.prototype,`defaultChecked`,void 0),L([f({type:Boolean,reflect:!0})],G.prototype,`indeterminate`,void 0),L([f()],G.prototype,`value`,void 0),L([f()],G.prototype,`label`,void 0),L([f({reflect:!0})],G.prototype,`shape`,void 0),L([f({reflect:!0})],G.prototype,`size`,void 0),L([f({reflect:!0})],G.prototype,`color`,void 0),L([f({attribute:`label-placement`,reflect:!0})],G.prototype,`labelPlacement`,void 0),L([f({type:Boolean,reflect:!0})],G.prototype,`error`,void 0),L([f({attribute:`helper-text`})],G.prototype,`helperText`,void 0),L([f({type:Boolean,reflect:!0,attribute:`readonly`})],G.prototype,`readOnly`,void 0),L([b(`input`)],G.prototype,`input`,void 0)})))()}var mi,hi,gi;function _i(){return(_i=e((()=>{x(),O(),C(),I(),j(),M(),N(),On(),mt(),d(),h(),m(),Ue(),mi=2e3,hi=e=>e===void 0||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,gi=class e extends E{constructor(...e){super(...e),this.noWrap=!1,this.maxHeight=`24rem`,this.copyable=!1,this.status=`idle`,this.locale=new T(this),this.aria=new S(this),this.slots=new k(this)}static{this.tagName=`minerva-code-block`}static{this.styles=[D,p`
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
`,F(sn),F(Lt)]}get text(){return this.code??this.textContent??``}async copy(){let e=this.text,t=typeof navigator>`u`?void 0:navigator.clipboard,n=!1;if(typeof t?.writeText==`function`)try{await t.writeText(e),n=!0}catch{n=!1}return this.isConnected?(this.showStatus(n?`copied`:`failed`),this.emit(`minerva-copy`,{text:e,success:n}),n):n}showStatus(e){clearTimeout(this.timer),this.status=e,this.timer=setTimeout(()=>this.status=`idle`,mi)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timer),this.status=`idle`}updated(){A&&this.copyable&&!this.text.trim()&&w(e.tagName,`copyable is set but there is no text to copy (set code or the text content).`)}render(){this.slots;let e=this.locale.t,t=this.aria.label??e(`codeBlock.label`),n=hi(this.maxHeight),r=this.copyable||!!this.language,i=_`<pre
      part="region"
      role="region"
      tabindex="0"
      aria-label=${t}
      aria-description=${this.aria.description??u}
      data-wrap=${String(!this.noWrap)}
      class=${v({codeBlock:!0,copyable:r})}
      style=${g(r?{}:{maxHeight:n})}
    ><code
        part="code"
        class=${this.language?`language-${this.language}`:u}
        data-language=${this.language??u}
      >${this.text}</code></pre>`;if(!r)return i;let a=this.status,o=a===`copied`?e(`codeBlock.copied`):a===`failed`?e(`codeBlock.copyFailed`):``,s=o||e(`codeBlock.copy`),c=a===`failed`?`danger`:a===`copied`?`success`:`neutral`;return _`<div part="root" class="root" style=${g({maxHeight:n})}>
${i}
<div class="actions">
${this.language?_`<span part="language" class="language" aria-hidden="true"
>${this.language}</span
>`:u}
${this.copyable?_`<button
type="button"
part="copy-button"
class="iconButton ${c} variant-ghost small square"
aria-label=${s}
title=${s}
@click=${()=>void this.copy()}
>
${a===`copied`?pt:a===`failed`?Bt:ut}
</button>`:u}
</div>
${this.copyable?_`<span class="visuallyHidden" aria-live="polite"
>${o}</span
>`:u}
</div>`}},L([f()],gi.prototype,`code`,void 0),L([f({reflect:!0})],gi.prototype,`language`,void 0),L([f({type:Boolean,attribute:`no-wrap`,reflect:!0})],gi.prototype,`noWrap`,void 0),L([f({attribute:`max-height`})],gi.prototype,`maxHeight`,void 0),L([f({type:Boolean,reflect:!0})],gi.prototype,`copyable`,void 0),L([y()],gi.prototype,`status`,void 0)})))()}var vi,K;function yi(){return(yi=e((()=>{O(),rt(),I(),xn(),j(),N(),tr(),er(),sr(),or(),nt(),At(),dt(),d(),h(),ie(),c(),Be(),vi={fromAttribute:e=>e===null?void 0:e.split(`,`).map(e=>e.trim()).filter(Boolean),toAttribute:e=>Array.isArray(e)?e.join(`, `):e},K=class e extends E{constructor(...e){super(...e),this.open=!1,this.items=[],this.maxResults=12,this.query=``,this.activeIndex=0,this.locale=new T(this),this.presence=new gt(this,()=>this.panel),this.modal=new Qn(this),this.focusScope=new ar(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new Zn(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleShortcut=e=>{let t=De(this.shortcut);if(t.length===0)return;let n=e.composedPath()[0]??e.target;xe(n)&&!e.ctrlKey&&!e.metaKey&&!e.altKey||e.isComposing||t.some(t=>Te(e,t))&&(e.preventDefault(),e.stopPropagation(),this.requestOpenChange(!0,`shortcut`))}}static{this.tagName=`minerva-command-dialog`}static{this.styles=[D,$n,p`
:host{
display: contents;
}
`,F(Xn),F(St)]}show(){this.open=!0}hide(){this.open=!1}get results(){let e=Math.max(0,this.maxResults),t=(Array.isArray(this.items)?this.items:[]).filter(e=>!e.disabled),n=this.query.trim();if(!n)return t.slice(0,e);if(typeof this.filter==`function`)return this.filter(t,n).slice(0,e);let r=se(n);return t.filter(e=>se(he(e)).includes(r)).slice(0,e)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}select(e){this.emit(`minerva-select`,{value:e.id,item:e}),this.requestOpenChange(!1,`select`)}handleKeyDown(e){let t=this.results,n=Math.max(t.length-1,0),r={ArrowDown:e=>Math.min(e+1,n),ArrowUp:e=>Math.max(e-1,0),Home:()=>0,End:()=>n}[e.key];if(r&&(e.key.startsWith(`Arrow`)||!this.query)){e.preventDefault(),this.activeIndex=r(Math.min(this.activeIndex,n));return}let i=t[this.activeIndex];e.key===`Enter`&&i&&!e.isComposing&&(e.preventDefault(),this.select(i))}handleInput(e){this.query=e.target.value,this.activeIndex=0}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleShortcut,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleShortcut,!0),P(this.panel),P(this.overlay)}willUpdate(e){e.has(`open`)&&(this.presence.sync(this.open),this.open&&(this.query=``,this.activeIndex=0)),e.has(`items`)&&A&&this.checkItems();let t=this.results.length;this.activeIndex>0&&this.activeIndex>=t&&(this.activeIndex=Math.max(t-1,0))}checkItems(){if(!Array.isArray(this.items)){w(e.tagName,"`items` must be an array of { id, title, ... } objects.");return}let t=new Set;for(let n of this.items)t.has(n.id)&&w(e.tagName,`duplicate item id "${n.id}": ids identify the chosen command in minerva-select and must be unique.`),t.add(n.id)}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(jt(this.overlay),jt(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.open&&(e.has(`activeIndex`)||e.has(`query`))&&this.renderRoot.querySelector(`#option-${this.activeIndex}`)?.scrollIntoView?.({block:`nearest`}),this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}hookStates(){return{state:this.open?`open`:`closed`}}afterClose(){P(this.panel),P(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return u;let e=this.locale.t,t=this.open?`open`:`closed`,n=this.results,r=n[this.activeIndex]?`option-${this.activeIndex}`:void 0,i=this.placeholder??e(`command.placeholder`);return _`<div
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
${this.shortcutLabel?_`<kbd class="kbd">${this.shortcutLabel}</kbd>`:u}
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
aria-activedescendant=${r??u}
autocomplete="off"
spellcheck="false"
placeholder=${i}
.value=${Ge(this.query)}
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
${n.length===0?_`<div class="empty" part="empty">
${this.emptyText??e(`command.empty`)}
</div>`:n.map((e,t)=>{let n=t===this.activeIndex;return _`<button
id=${`option-${t}`}
part=${pn(`item`,{highlighted:n})}
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
><strong>${e.title}</strong>${e.description?_`<small>${e.description}</small>`:u}</span
>${e.group?_`<span class="group">${e.group}</span>`:u}
</button>`})}
</div>
</div>`}},L([f({type:Boolean,reflect:!0})],K.prototype,`open`,void 0),L([f({attribute:!1})],K.prototype,`items`,void 0),L([f()],K.prototype,`label`,void 0),L([f()],K.prototype,`description`,void 0),L([f()],K.prototype,`placeholder`,void 0),L([f({attribute:`empty-text`})],K.prototype,`emptyText`,void 0),L([f({attribute:`shortcut-label`})],K.prototype,`shortcutLabel`,void 0),L([f({converter:vi})],K.prototype,`shortcut`,void 0),L([f({type:Number,attribute:`max-results`})],K.prototype,`maxResults`,void 0),L([f({attribute:!1})],K.prototype,`filter`,void 0),L([f({attribute:`results-label`})],K.prototype,`resultsLabel`,void 0),L([f({attribute:`enter-label`})],K.prototype,`enterLabel`,void 0),L([y()],K.prototype,`query`,void 0),L([y()],K.prototype,`activeIndex`,void 0),L([b(`.content`)],K.prototype,`panel`,void 0),L([b(`.overlay`)],K.prototype,`overlay`,void 0)})))()}var bi,xi,Si;function Ci(){return(Ci=e((()=>{j(),d(),h(),ie(),c(),bi=`(prefers-color-scheme: dark)`,xi=`data-minerva-theme-scope`,Si=class extends E{constructor(...e){super(...e),this.root=!1,this.media=null,this.mode=null,this.onSchemeChange=()=>this.apply()}static{this.tagName=`minerva-config`}static{this.styles=p`
:host{
display: contents;
}
`}get resolvedMode(){return this.mode}connectedCallback(){super.connectedCallback(),typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(bi),this.media.addEventListener(`change`,this.onSchemeChange))}disconnectedCallback(){super.disconnectedCallback(),this.media?.removeEventListener(`change`,this.onSchemeChange),this.media=null,this.root&&this.clear(document.documentElement)}updated(e){e.has(`root`)&&e.get(`root`)!==void 0&&this.clear(e.get(`root`)?document.documentElement:this),this.apply()}target(){return this.root?document.documentElement:this}clear(e){for(let t of[`data-theme`,`data-palette`,xi,`lang`])(e!==this||t!==`lang`)&&e.removeAttribute(t);fe(e,null),de(e.style,{}),e.style.removeProperty(`color-scheme`)}apply(){let e=this.target(),t=(t,n)=>{n==null?e.removeAttribute(t):e.setAttribute(t,n)},n=this.theme,r=this.media?.matches?`dark`:`light`,i=n===`system`?r:n===`github-dark`?`dark`:n===`light`||n===`dark`?n:null,a=Ne(this.design)?this.design:void 0,s=o(this.palette)?this.palette:re(a),c=!!s&&n!==`github-dark`;t(`data-theme`,i),t(`data-palette`,c?s:null),this.root||t(xi,i!==null||c||a!==void 0||[this.density,this.radius,this.shadow,this.fontScale].some(Boolean)?``:null),i?e.style.colorScheme=i:e.style.removeProperty(`color-scheme`),de(e.style,n===`github-dark`&&je(n)?pe[n]:{}),fe(e,{preset:a,density:Se(this.density)?this.density:void 0,radius:me(this.radius)?this.radius:void 0,shadow:oe(this.shadow)?this.shadow:void 0,fontScale:ce(this.fontScale)?this.fontScale:void 0},{all:!this.root&&a!==void 0}),this.root&&this.locale&&(document.documentElement.lang=this.locale),i!==this.mode&&(this.mode=i,i&&this.emit(`minerva-theme-change`,{mode:i}))}render(){return _`<slot></slot>`}},L([f({reflect:!0})],Si.prototype,`theme`,void 0),L([f({reflect:!0})],Si.prototype,`palette`,void 0),L([f({reflect:!0})],Si.prototype,`design`,void 0),L([f({reflect:!0})],Si.prototype,`density`,void 0),L([f({reflect:!0})],Si.prototype,`radius`,void 0),L([f({reflect:!0})],Si.prototype,`shadow`,void 0),L([f({reflect:!0,attribute:`font-scale`})],Si.prototype,`fontScale`,void 0),L([f({reflect:!0})],Si.prototype,`locale`,void 0),L([f({type:Boolean,reflect:!0})],Si.prototype,`root`,void 0)})))()}var q;function wi(){return(wi=e((()=>{x(),O(),C(),rt(),I(),j(),M(),N(),tr(),er(),sr(),or(),Wr(),nt(),dt(),d(),h(),q=class e extends E{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.color=`primary`,this.loading=!1,this.confirmDisabled=!1,this.busy=!1,this.locale=new T(this),this.aria=new S(this),this.slots=new k(this),this.presence=new gt(this,()=>this.panel),this.modal=new Qn(this),this.focusScope=new ar(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new Zn(this,()=>({disableOutsidePointerEvents:!0,onFocusOutside:()=>!1,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestClose(this.reason)})),this.reason=`outside`,this.wasPresent=!1}static{this.tagName=`minerva-confirm-dialog`}static{this.dependencies=[U]}static{this.styles=[D,$n,p`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,F(Xn)]}show(){this.open=!0}hide(){this.open=!1}requestClose(e){return!this.open||!this.emit(`minerva-open-change`,{open:!1,reason:e},{cancelable:!0})?!1:(this.open=!1,e!==`confirm`&&this.emit(`minerva-cancel`,{reason:e}),!0)}async handleConfirm(){if(!this.open||this.loading||this.busy||this.confirmDisabled||!this.emit(`minerva-confirm`,void 0,{cancelable:!0}))return;let e=this.onConfirm?.();if(e&&typeof e.then==`function`){this.busy=!0;try{await e}catch{return}finally{this.busy=!1}}this.requestClose(`confirm`)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,color:this.color,loading:this.loading||this.busy}}updated(t){let n=this.open||this.presence.present;if(t.has(`open`)){let t=this.panel;this.open&&t?(A&&!this.label&&!this.slots.test(`header`)&&!this.aria.label&&w(e.tagName,"set `label` (or the `header` slot / aria-label) to give the alertdialog an accessible name."),jt(this.overlay),jt(t),this.modal.activate(this),this.layer.activate(t),this.focusInitial(t)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!n&&this.afterClose(),this.wasPresent=n}async focusInitial(e){let t=Array.from(e.querySelectorAll(`minerva-button`));await Promise.all(t.map(e=>e.updateComplete)),this.open&&this.panel===e&&(this.focusScope.activate(e),this.emit(`minerva-after-open`))}disconnectedCallback(){super.disconnectedCallback(),P(this.panel),P(this.overlay)}afterClose(){P(this.panel),P(this.overlay),this.emit(`minerva-after-close`)}render(){if(!(this.open||this.presence.present))return u;let e=this.open?`open`:`closed`,t=this.locale.t,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=this.loading||this.busy;return _`<div
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
aria-labelledby=${n?`title`:u}
aria-label=${n?u:this.aria.label??u}
aria-describedby=${r?`description`:u}
tabindex="-1"
data-state=${e}
>
${r?_`<p id="description" class="description" part="description">
${r}
</p>`:u}
${n?_`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:u}
<div class="body" part="body">
${this.slots.test(`[default]`)?_`<slot></slot>`:u}
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
${Bt}
</button>
</div>`}},L([f({type:Boolean,reflect:!0})],q.prototype,`open`,void 0),L([f()],q.prototype,`label`,void 0),L([f()],q.prototype,`description`,void 0),L([f({attribute:`confirm-label`})],q.prototype,`confirmLabel`,void 0),L([f({attribute:`cancel-label`})],q.prototype,`cancelLabel`,void 0),L([f({attribute:`close-label`})],q.prototype,`closeLabel`,void 0),L([f({reflect:!0})],q.prototype,`color`,void 0),L([f({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),L([f({type:Boolean,reflect:!0,attribute:`confirm-disabled`})],q.prototype,`confirmDisabled`,void 0),L([f({attribute:!1})],q.prototype,`onConfirm`,void 0),L([y()],q.prototype,`busy`,void 0),L([b(`.content`)],q.prototype,`panel`,void 0),L([b(`.overlay`)],q.prototype,`overlay`,void 0)})))()}function Ti(e){let t=Wn(e,Ai);if(!t)return null;let n=e.ownerDocument;return t===n.documentElement||t===n.body?null:t}function Ei(e,t){for(let n=e;n;n=Pt(n))if(n===t)return!0;return!1}function Di(e){return Mi.push(e),()=>{let t=Mi.lastIndexOf(e);t>=0&&Mi.splice(t,1)}}function Oi(e){let t=e?.isConnected===!0?Wn(e,Pi):null;if(t&&`confirmQueue`in t)return t.confirmQueue;let n=Mi[Mi.length-1];return n?n.confirmQueue:(Ni??=new ji(()=>document.body),Ni)}function ki(e){return t=>Ii({...t,host:t.host??e})}var Ai,ji,Mi,Ni,Pi,Fi,Ii;function Li(){return(Li=e((()=>{O(),rt(),I(),ln(),wi(),Ai=`minerva-config:not([root]), [data-minerva-theme-scope], [data-theme], [data-palette]`,ji=class{constructor(e){this.defaultContainer=e,this.requests=[],this.current=null,this.settles=new Set}enqueue(e){return Gt(q),new Promise(t=>{this.requests.push({options:e,resolve:t}),this.current||this.showNext()})}cancelAll(){let e=this.requests.splice(0);for(let t of e)t.resolve(!1);for(let e of[...this.settles])e(!1);this.current?.remove()}container(e){let t=typeof document>`u`?null:document,n=e.container;if(n)return n.isConnected?n:(A&&w(q.tagName,"confirm(): `container` is not connected to the document; the dialog is appended to document.body instead."),t.body);let r=e.host?.isConnected===!0?Ti(e.host):null,i=this.defaultContainer();return r&&!Ei(i,r)?r:i}showNext(){let e=this.requests.shift();if(!e){this.current=null;return}let{options:t,resolve:n}=e,r=this.container(t),i=document.createElement(q.tagName);i.label=t.title,t.description&&(i.description=t.description),t.confirmLabel&&(i.confirmLabel=t.confirmLabel),t.cancelLabel&&(i.cancelLabel=t.cancelLabel),t.closeLabel&&(i.closeLabel=t.closeLabel),t.color&&(i.color=t.color);let a=t.host;if(a?.isConnected&&!t.container){let e=Vn(a);e!==Vn(r)&&i.setAttribute(`lang`,e)}let o=!1,s=!1,c=e=>{o||(o=!0,this.settles.delete(c),n(e))};this.settles.add(c);let l=new MutationObserver(()=>{i.isConnected||ee()}),ee=()=>{s||(s=!0,l.disconnect(),c(!1),i.remove(),this.showNext())};i.addEventListener(`minerva-open-change`,e=>{let{open:t,reason:n}=e.detail;queueMicrotask(()=>{!t&&!e.defaultPrevented&&c(n===`confirm`)})}),i.addEventListener(`minerva-after-close`,ee,{once:!0}),this.current=i,r.append(i),l.observe(document,{childList:!0,subtree:!0}),i.open=!0}},Mi=[],Ni=null,Pi=`minerva-confirm-provider`,Fi=()=>(A&&w(q.tagName,`confirm() called without a document (server render): resolving false.`),Promise.resolve(!1)),Ii=e=>typeof document>`u`?Fi():Oi(e.host).enqueue(e)})))()}var Ri;function zi(){return(zi=e((()=>{j(),wi(),Li(),d(),Ri=class extends E{constructor(...e){super(...e),this.confirmQueue=new ji(()=>this),this.unregister=null,this.confirm=e=>this.confirmQueue.enqueue(e)}static{this.tagName=`minerva-confirm-provider`}static{this.dependencies=[q]}static{this.styles=p`
:host{
display: contents;
}
`}connectedCallback(){super.connectedCallback(),this.unregister=Di(this)}disconnectedCallback(){super.disconnectedCallback(),this.unregister?.(),this.unregister=null,this.confirmQueue.cancelAll()}render(){return _`<slot></slot>`}}})))()}var Bi,Vi,Hi,J,Ui;function Wi(){return(Wi=e((()=>{x(),O(),C(),I(),xn(),j(),N(),Ot(),wt(),gr(),d(),h(),m(),Ue(),c(),Be(),Ve(),Bi=e=>e===void 0?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Vi={ascend:`ascending`,descend:`descending`},Hi=48,J=class e extends E{constructor(...e){super(...e),this.columns=[],this.rows=[],this.loading=!1,this.loadingRows=5,this.sortState=null,this.manualSort=!1,this.selectable=!1,this.selectedRowKeys=[],this.size=`medium`,this.variant=`simple`,this.hoverable=!1,this.retryable=!1,this.overflowing=!1,this.aria=new S(this),this.locale=new T(this),this.resize=null,this.handlePageChange=e=>{let{page:t,pageSize:n}=e.detail;queueMicrotask(()=>{e.defaultPrevented||(this.pagination={...this.pagination,current:t,pageSize:n})})}}static{this.tagName=`minerva-data-table`}static{this.dependencies=[lr]}static{this.styles=[D,p`
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
`,F(Wt),F(gn)]}disconnectedCallback(){super.disconnectedCallback(),this.resize?.disconnect(),this.resize=null}keyOf(e,t){let n=this.rowKey;return typeof n==`function`?n(e,t):typeof n==`string`&&n?e[n]:t}entries(){return(this.rows??[]).map((e,t)=>({row:e,index:t,key:this.keyOf(e,t)}))}rowDisabled(e){return!!this.isRowDisabled?.(e)}willUpdate(t){if(A&&(t.has(`rows`)||t.has(`rowKey`))){let t=this.entries().map(e=>e.key);new Set(t).size!==t.length&&w(e.tagName,`rows have duplicate keys: set row-key to a unique field (or a function).`)}}updated(){this.observeOverflow();let e=this.shadowRoot?.querySelector(`minerva-pagination`);e&&this.pagination&&Object.assign(e,this.pagination)}observeOverflow(){let e=this.wrapper;if(!e){this.resize?.disconnect(),this.resize=null;return}let t=()=>{let t=e.scrollWidth>e.clientWidth||e.scrollHeight>e.clientHeight;t!==this.overflowing&&(this.overflowing=t)};t(),!this.resize&&typeof ResizeObserver<`u`&&(this.resize=new ResizeObserver(t),this.resize.observe(e),e.firstElementChild&&this.resize.observe(e.firstElementChild))}changeSort(e){let t=Ce(this.sortState,e);this.emit(`minerva-sort-change`,t,{cancelable:!0})&&(this.sortState=t)}commitSelection(e){let t=new Set(e),n={selectedRowKeys:e,selectedRows:this.entries().filter(e=>t.has(e.key)).map(e=>e.row)};if(!this.emit(`minerva-selection-change`,n,{cancelable:!0})){this.requestUpdate();return}this.selectedRowKeys=e}toggleRow(e,t){let n=this.selectedRowKeys;this.commitSelection(t?[...n.filter(t=>t!==e),e]:n.filter(t=>t!==e))}renderTable(){let e=this.columns??[],t=this.locale.t,n=Ee(e),r=this.selectable,i=r&&e[0]?.fixed===`left`,a=i?Hi:0,o=this.entries(),s=this.sortState,c=s?.order??null,l=c===null?void 0:e.find(e=>e.key===s?.key),ee=l?Ae(l):null,te=!this.manualSort&&ee?[...o].sort((e,t)=>c===`descend`?ee(t.row,e.row):ee(e.row,t.row)):o,ne=new Set(this.selectedRowKeys),re=o.filter(e=>!this.rowDisabled(e.row)),ie=re.length>0&&re.every(e=>ne.has(e.key)),ae=!ie&&o.some(e=>ne.has(e.key)),oe=()=>{let e=new Set(re.map(e=>e.key)),t=this.selectedRowKeys;this.commitSelection(ie?t.filter(t=>!e.has(t)):[...t,...re.map(e=>e.key).filter(e=>!ne.has(e))])},se=e=>{let t={textAlign:e.align},r=Bi(e.width);return r!==void 0&&(t.width=r,t.minWidth=r),e.fixed===`left`?t.left=`${(n.leftOffsets[e.key]??0)+a}px`:e.fixed===`right`&&(t.right=`${n.rightOffsets[e.key]??0}px`),t},ce=e=>e.fixed===`left`&&e.key===n.lastLeftFixedKey?`left`:e.fixed===`right`&&e.key===n.firstRightFixedKey?`right`:u,le=g({width:`${Hi}px`,minWidth:`${Hi}px`,...i?{left:`0px`}:{}}),ue=i?`left`:u,de=e.length+ +!!r,fe=e=>{if(!e.sortable)return _`<th
part="header-cell"
scope="col"
style=${g(se(e))}
data-ellipsis=${e.ellipsis?`true`:u}
data-fixed=${e.fixed??u}
data-fixed-edge=${ce(e)}
>
${e.header}
</th>`;let t=s?.key===e.key?s.order:null,n=t===`ascend`?Ht:t===`descend`?Yn:An,r=t?Vi[t]:`none`;return _`<th
part=${pn(`header-cell`,{sort:r})}
scope="col"
aria-sort=${r}
data-sort=${r}
style=${g(se(e))}
data-ellipsis=${e.ellipsis?`true`:u}
data-fixed=${e.fixed??u}
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
</th>`},pe;pe=this.loading?Array.from({length:this.loadingRows},()=>_`<tr part="row" aria-hidden="true">
${r?_`<td
part="cell"
class="selectionCell"
style=${le}
data-fixed=${ue}
></td>`:u}
${e.map(e=>_`<td
part="cell"
style=${g(se(e))}
data-fixed=${e.fixed??u}
data-fixed-edge=${ce(e)}
>
<span part="skeleton" class="skeleton"></span>
</td>`)}
</tr>`):o.length===0?_`<tr part="row">
<td part="empty" colspan=${de} class="empty">
<slot name="empty">${this.emptyText??t(`table.empty`)}</slot>
</td>
</tr>`:ze(te,e=>e.key,({row:n,index:i,key:a},o)=>{let s=r&&ne.has(a);return _`<tr
part=${pn(`row`,{selected:s})}
aria-selected=${s?`true`:u}
?data-selected=${s}
>
${r?_`<td
part="cell"
class="selectionCell"
style=${le}
data-fixed=${ue}
>
<input
type="checkbox"
part="checkbox"
class="checkbox"
.checked=${Ge(s)}
?disabled=${this.rowDisabled(n)}
aria-label=${t(`table.selectRow`,{row:this.getRowLabel?.(n,i)??String(a)})}
@change=${e=>this.toggleRow(a,e.target.checked)}
/>
</td>`:u}
${e.map(e=>_`<td
part="cell"
style=${g(se(e))}
data-ellipsis=${e.ellipsis?`true`:u}
data-fixed=${e.fixed??u}
data-fixed-edge=${ce(e)}
>
${e.render?e.render(n,o):n[e.key]}
</td>`)}
</tr>`});let me=Bi(this.scrollX),he=Bi(this.scrollY),ge=!!(me||he)||this.overflowing,_e=this.aria.label;return _`<div
part="viewport"
class=${v({wrapper:!0,wrapperBordered:this.variant===`bordered`,wrapperScrollY:!!he})}
role=${ge?`region`:u}
tabindex=${ge?0:u}
aria-label=${ge?_e??t(`table.scrollRegion`):u}
style=${g(he?{maxHeight:he,overflowY:`auto`}:{})}
>
<table
part="table"
class=${v({table:!0,[this.size]:!0,[this.variant]:!0,hoverable:this.hoverable,scrollX:!!me})}
style=${g(me?{minWidth:me}:{})}
aria-label=${_e??u}
aria-description=${this.aria.description??u}
>
<thead>
<tr part="row">
${r?_`<th
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
.checked=${Ge(ie)}
.indeterminate=${ae}
?disabled=${re.length===0||this.loading}
aria-label=${t(`table.selectAll`)}
@change=${oe}
/>
</th>`:u}
${e.map(fe)}
</tr>
</thead>
<tbody>
${pe}
</tbody>
</table>
</div>`}hookStates(){return{loading:this.loading,size:this.size,variant:this.variant}}render(){let e=!!this.error&&!this.loading;return _`<div
part="root"
class="dataTable"
aria-busy=${this.loading?`true`:u}
>
${e?_`<div part="error" class="error" role="alert">
<div class="errorTitle">
<slot name="error">${this.error}</slot>
</div>
${this.retryable?_`<button
type="button"
part="retry-button"
class="customButton neutral variant-outline small retry"
@click=${()=>this.emit(`minerva-retry`)}
>
<span class="label"
><span class="retryIcon" aria-hidden="true"
>${yt}</span
>${this.retryLabel??this.locale.t(`table.retry`)}</span
>
</button>`:u}
</div>`:_`${this.renderTable()}
${this.pagination?_`<minerva-pagination
part="pagination"
exportparts="root: pagination-root, item: pagination-item"
@minerva-page-change=${this.handlePageChange}
></minerva-pagination>`:u}`}
</div>`}},L([f({attribute:!1})],J.prototype,`columns`,void 0),L([f({attribute:!1})],J.prototype,`rows`,void 0),L([f({attribute:`row-key`})],J.prototype,`rowKey`,void 0),L([f({attribute:`empty-text`})],J.prototype,`emptyText`,void 0),L([f({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),L([f({type:Number,attribute:`loading-rows`})],J.prototype,`loadingRows`,void 0),L([f({attribute:!1})],J.prototype,`sortState`,void 0),L([f({type:Boolean,attribute:`manual-sort`})],J.prototype,`manualSort`,void 0),L([f({type:Boolean,reflect:!0})],J.prototype,`selectable`,void 0),L([f({attribute:!1})],J.prototype,`selectedRowKeys`,void 0),L([f({attribute:!1})],J.prototype,`isRowDisabled`,void 0),L([f({attribute:!1})],J.prototype,`getRowLabel`,void 0),L([f({reflect:!0})],J.prototype,`size`,void 0),L([f({reflect:!0})],J.prototype,`variant`,void 0),L([f({type:Boolean,reflect:!0})],J.prototype,`hoverable`,void 0),L([f({attribute:`scroll-x`})],J.prototype,`scrollX`,void 0),L([f({attribute:`scroll-y`})],J.prototype,`scrollY`,void 0),L([f({attribute:!1})],J.prototype,`pagination`,void 0),L([f()],J.prototype,`error`,void 0),L([f({type:Boolean})],J.prototype,`retryable`,void 0),L([f({attribute:`retry-label`})],J.prototype,`retryLabel`,void 0),L([y()],J.prototype,`overflowing`,void 0),L([b(`.wrapper`)],J.prototype,`wrapper`,void 0),Ui=class extends E{constructor(...e){super(...e),this.primary=``,this.monospace=!1,this.maxWidth=360,this.observer=null}static{this.tagName=`minerva-table-cell-content`}static{this.styles=[D,p`
:host{
display: block;
min-width: 0;
}
`,F(gn)]}hasSecondarySlot(){return Array.from(this.children).some(e=>e.getAttribute(`slot`)===`secondary`)}connectedCallback(){super.connectedCallback(),this.observer??=typeof MutationObserver>`u`?null:new MutationObserver(()=>this.requestUpdate()),this.observer?.observe(this,{childList:!0})}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}render(){let e=this.secondary!==void 0&&this.secondary!==null||this.hasSecondarySlot(),t=v({cellPrimary:!0,cellMono:this.monospace,cellStrong:e}),n=_`<slot>${this.primary}</slot>`;return _`<div
part="root"
class="cellContent"
style=${g({maxWidth:Bi(this.maxWidth)})}
>
${this.monospace?_`<code part="primary" class=${t}>${n}</code>`:_`<div part="primary" class=${t}>${n}</div>`}
${e?_`<div part="secondary" class="cellSecondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:u}
</div>`}},L([f()],Ui.prototype,`primary`,void 0),L([f()],Ui.prototype,`secondary`,void 0),L([f({type:Boolean,reflect:!0})],Ui.prototype,`monospace`,void 0),L([f({attribute:`max-width`})],Ui.prototype,`maxWidth`,void 0)})))()}var Gi,Ki;function qi(){return(qi=e((()=>{O(),j(),N(),et(),d(),h(),m(),Gi=class extends E{constructor(...e){super(...e),this.label=``}static{this.tagName=`minerva-description-item`}static{this.styles=[D,p`
:host{
display: contents;
}
`]}render(){return _`<slot></slot>`}},L([f({reflect:!0})],Gi.prototype,`label`,void 0),Ki=class e extends E{constructor(...e){super(...e),this.items=[],this.bordered=!1,this.striped=!1,this.observer=null}static{this.tagName=`minerva-description-list`}static{this.dependencies=[Gi]}static{this.shadowRootOptions={...E.shadowRootOptions,slotAssignment:`manual`}}static{this.styles=[D,p`
:host{
display: block;
}
`,F(_n)]}declarativeItems(){return Array.from(this.children).filter(e=>e.localName===Gi.tagName)}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,attributes:!0,subtree:!0,attributeFilter:[`label`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}updated(){let t=this.declarativeItems();if(Array.from(this.renderRoot.querySelectorAll(`slot[data-item]`)).forEach((e,n)=>{let r=t[n];r&&typeof e.assign==`function`&&e.assign(r)}),A){let t=Array.from(this.children).filter(e=>e.localName!==Gi.tagName);t.length&&w(e.tagName,`only <minerva-description-item> children are rendered (ignored: <${t[0].localName}>).`)}}render(){let e=this.declarativeItems();return _`<dl
part="root"
class=${v({descriptionList:!0,bordered:this.bordered,striped:this.striped})}
>
${(this.items??[]).map(e=>_`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description">${e.value}</dd>
</div>`)}
${e.map(e=>_`<div part="row" class="row">
<dt part="term">${e.label}</dt>
<dd part="description"><slot data-item></slot></dd>
</div>`)}
</dl>`}},L([f({attribute:!1})],Ki.prototype,`items`,void 0),L([f({type:Boolean,reflect:!0})],Ki.prototype,`bordered`,void 0),L([f({type:Boolean,reflect:!0})],Ki.prototype,`striped`,void 0)})))()}var Ji,Yi;function Xi(){return(Xi=e((()=>{O(),j(),M(),N(),Dt(),d(),h(),m(),Ue(),Ji=e=>typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Yi=class e extends E{constructor(...e){super(...e),this.variant=`solid`,this.orientation=`horizontal`,this.thickness=1,this.spacing=16,this.textAlign=`center`,this.elevation=!1,this.flexItem=!1,this.slots=new k(this)}static{this.tagName=`minerva-divider`}static{this.styles=[D,p`
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
`,F(ot)]}hookStates(){let e=this.orientation===`horizontal`&&this.slots.test(`[default]`);return{orientation:this.orientation,variant:this.variant,align:e?this.textAlign:void 0}}updated(){A&&this.orientation===`vertical`&&this.slots.test(`[default]`)&&w(e.tagName,`text is only rendered by horizontal dividers; it is ignored when orientation is vertical.`)}render(){let e=this.orientation===`horizontal`,t=e&&this.slots.test(`[default]`),n=this.textAlign,r={};if(this.thickness!=null&&!Number.isNaN(this.thickness)&&(r.borderWidth=`${this.thickness}px`,r[`--_divider-thickness`]=`${this.thickness}px`),this.length!=null&&this.length!==``&&(r[e?`width`:`height`]=Ji(this.length)),this.spacing!=null&&!Number.isNaN(this.spacing)){let t=`${this.spacing}px`;r.marginTop=e?t:`0`,r.marginBottom=e?t:`0`,r.marginLeft=e?`0`:t,r.marginRight=e?`0`:t}let i=v({divider:!0,[this.variant]:!0,[this.orientation]:!0,withText:t,[`text${n.charAt(0).toUpperCase()}${n.slice(1)}`]:t,elevation:this.elevation,flexItem:this.flexItem});return t?_`<div
part="root"
role="separator"
aria-orientation=${this.orientation}
class=${i}
style=${g(r)}
>
<span class="text" part="label"><slot></slot></span>
</div>`:_`<hr
part="root"
aria-orientation=${this.orientation}
class=${i}
style=${g(r)}
/>`}},L([f({reflect:!0})],Yi.prototype,`variant`,void 0),L([f({reflect:!0})],Yi.prototype,`orientation`,void 0),L([f({type:Number})],Yi.prototype,`thickness`,void 0),L([f()],Yi.prototype,`length`,void 0),L([f({type:Number})],Yi.prototype,`spacing`,void 0),L([f({attribute:`text-align`})],Yi.prototype,`textAlign`,void 0),L([f({type:Boolean,reflect:!0})],Yi.prototype,`elevation`,void 0),L([f({type:Boolean,reflect:!0,attribute:`flex-item`})],Yi.prototype,`flexItem`,void 0)})))()}var Zi,Y;function Qi(){return(Qi=e((()=>{x(),O(),C(),rt(),I(),j(),M(),N(),tr(),er(),sr(),or(),dt(),lt(),d(),h(),m(),Zi=[`left`,`right`,`top`,`bottom`],Y=class e extends E{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.side=`right`,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.nonModal=!1,this.locale=new T(this),this.aria=new S(this),this.slots=new k(this),this.presence=new gt(this,()=>this.panel),this.modal=new Qn(this),this.focusScope=new ar(this,()=>({trapped:!this.nonModal,loop:!0,restoreFocus:!0})),this.layer=new Zn(this,()=>({disableOutsidePointerEvents:!this.nonModal,branches:()=>[this.triggerElement()],onFocusOutside:()=>this.nonModal,onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-drawer-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)}}static{this.tagName=`minerva-drawer`}static{this.styles=[D,$n,p`
:host{
display: contents;
}
`,F(Ft)]}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(t){t.has(`open`)&&this.presence.sync(this.open),A&&t.has(`side`)&&!Zi.includes(this.side)&&w(e.tagName,`invalid side "${this.side}" (expected left, right, top or bottom).`)}hookStates(){return{state:this.open?`open`:`closed`,side:Zi.includes(this.side)?this.side:`right`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)||e.has(`nonModal`)&&this.open){let t=this.panel;this.open&&t?(e.has(`nonModal`)&&!e.has(`open`)&&(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate()),jt(this.overlay),jt(t),this.nonModal||this.modal.activate(this),this.layer.activate(t),this.focusScope.activate(t),e.has(`open`)&&this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),P(this.panel),P(this.overlay)}afterClose(){P(this.panel),P(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description,i=Zi.includes(this.side)?this.side:`right`;return _`<slot name="trigger"></slot> ${e?_`${this.nonModal?u:_`<div
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
aria-modal=${this.nonModal?u:`true`}
aria-labelledby=${n?`title`:u}
aria-label=${n?u:this.aria.label??u}
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
${n?_`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:u}
<div class="body" part="body"><slot></slot></div>
${this.slots.test(`footer`)?_`<div class="footer" part="footer">
<slot name="footer"></slot>
</div>`:u}
${this.hideCloseButton?u:_`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`drawer.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${Bt}
</button>`}
</div>`:u}`}},L([f({type:Boolean,reflect:!0})],Y.prototype,`open`,void 0),L([f()],Y.prototype,`label`,void 0),L([f()],Y.prototype,`description`,void 0),L([f({attribute:`hidden-description`})],Y.prototype,`hiddenDescription`,void 0),L([f({reflect:!0})],Y.prototype,`side`,void 0),L([f({reflect:!0})],Y.prototype,`size`,void 0),L([f({type:Boolean,attribute:`hide-close-button`})],Y.prototype,`hideCloseButton`,void 0),L([f({attribute:`close-label`})],Y.prototype,`closeLabel`,void 0),L([f({attribute:`dialog-role`})],Y.prototype,`dialogRole`,void 0),L([f({type:Boolean,reflect:!0,attribute:`non-modal`})],Y.prototype,`nonModal`,void 0),L([b(`.content`)],Y.prototype,`panel`,void 0),L([b(`.overlay`)],Y.prototype,`overlay`,void 0)})))()}var $i,ea,ta,na;function ra(){return(ra=e((()=>{x(),O(),I(),j(),M(),N(),Gn(),d(),h(),m(),Ue(),$i=Re`<svg class="defaultIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke="none" aria-hidden="true" focusable="false"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM5 5v9h4a3 3 0 0 0 6 0h4V5ZM5 16v3h14v-3h-2.54a5 5 0 0 1-8.92 0Z" /></svg>`,ea=Re`<svg class="defaultIcon" aria-hidden="true" focusable="false" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse style="fill: var(--surface-muted-color)" cx="32" cy="33" rx="32" ry="7" /><g fill-rule="nonzero" style="stroke: var(--border-strong-color)"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" /><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" style="fill: var(--surface-color)" /></g></g></svg>`,ta=e=>e&&/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,na=class e extends E{constructor(...e){super(...e),this.heading=``,this.hideDescription=!1,this.hideIcon=!1,this.useSvg=!1,this.showShadow=!1,this.locale=new T(this),this.aria=new S(this),this.slots=new k(this)}static{this.tagName=`minerva-empty`}static{this.styles=[D,p`
:host{
display: block;
}
`,F(it)]}hookStates(){return{size:this.size}}updated(){A&&this.hideDescription&&this.description&&w(e.tagName,`description is ignored while hide-description is set.`)}render(){let e=!!this.heading||this.slots.test(`heading`),t=this.slots.test(`description`),n=this.description??this.locale.t(`empty.description`),r=!this.hideDescription&&(t||n!==``),i=this.slots.test(`action`)||this.slots.test(`secondary-action`),a=this.aria.label;return _`<div
part="root"
class=${v({empty:!0,showShadow:this.showShadow,sized:!!this.size,[`size-${this.size}`]:!!this.size})}
style=${g({width:ta(this.width),height:ta(this.height)})}
role="status"
aria-label=${a??u}
aria-labelledby=${a?u:e?`title`:r?`description`:u}
aria-describedby=${e&&r?`description`:u}
>
${this.hideIcon?u:_`<div part="icon" class="iconWrapper">
<slot name="icon">${this.useSvg?ea:$i}</slot>
</div>`}
${e?_`<div id="title" part="title" class="title">
<slot name="heading">${this.heading}</slot>
</div>`:u}
${r?_`<div id="description" part="description" class="description">
<slot name="description">${n}</slot>
</div>`:u}
${i?_`<div part="actions" class="actions">
<slot name="action"></slot><slot name="secondary-action"></slot>
</div>`:u}
${this.slots.test(`[default]`)?_`<div part="footer" class="footer"><slot></slot></div>`:u}
</div>`}},L([f()],na.prototype,`heading`,void 0),L([f()],na.prototype,`description`,void 0),L([f({type:Boolean,attribute:`hide-description`})],na.prototype,`hideDescription`,void 0),L([f({type:Boolean,attribute:`hide-icon`})],na.prototype,`hideIcon`,void 0),L([f({reflect:!0})],na.prototype,`size`,void 0),L([f({type:Boolean,attribute:`use-svg`})],na.prototype,`useSvg`,void 0),L([f()],na.prototype,`width`,void 0),L([f()],na.prototype,`height`,void 0),L([f({type:Boolean,attribute:`show-shadow`})],na.prototype,`showShadow`,void 0)})))()}var ia,aa;function oa(){return(oa=e((()=>{O(),j(),M(),N(),Mt(),d(),h(),ia=e=>e.localName===`minerva-checkbox`||e.localName===`minerva-switch`||e instanceof HTMLInputElement&&(e.type===`checkbox`||e.type===`radio`),aa=class e extends E{constructor(...e){super(...e),this.label=``,this.helperText=``,this.errorMessage=``,this.invalid=!1,this.required=!1,this.disabled=!1,this.readOnly=!1,this.requiredIndicator=`*`,this.slots=new k(this),this.observer=null,this.control=null,this.saved=new Map}static{this.tagName=`minerva-form-control`}static{this.styles=[D,p`
:host{
display: block;
}
.label{
cursor: default;
}
`,F(qn)]}get controlElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.release()}updated(){this.sync()}get labelText(){return this.label?this.label:Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`label`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}slotText(e){return Array.from(this.children).filter(t=>t.getAttribute(`slot`)===e).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `)}get descriptionText(){return this.invalid?this.errorMessage||this.slotText(`error-message`):this.helperText||this.slotText(`helper-text`)}save(e,t){this.saved.has(e)||this.saved.set(e,t)}setAttr(e,t,n){let r=`@${t}`;if(n===null){if(!this.saved.has(r))return;let n=this.saved.get(r);this.saved.delete(r),n===null?e.removeAttribute(t):e.setAttribute(t,n);return}this.save(r,e.getAttribute(t)),e.getAttribute(t)!==n&&e.setAttribute(t,n)}setProp(e,t,n){let r=`.${t}`;if(!n){if(!this.saved.has(r))return;e[t]=this.saved.get(r),this.saved.delete(r);return}this.save(r,e[t]),e[t]=!0}propFor(e,t){return{invalid:[`invalid`,`error`],required:[`required`],disabled:[`disabled`],readOnly:[`readOnly`,`readonly`]}[t].find(t=>t in e&&typeof e[t]==`boolean`)??null}release(){let e=this.control;if(e){for(let[t,n]of this.saved)if(t.startsWith(`@`)){let r=t.slice(1);n===null?e.removeAttribute(r):e.setAttribute(r,n)}else e[t.slice(1)]=n;this.saved.clear(),this.control=null}}sync(){let t=this.controlElement;if(t!==this.control&&(this.release(),this.control=t),!t)return;let n=this.labelText,r=this.saved.has(`@aria-label`);n&&(r||!t.hasAttribute(`aria-label`))?this.setAttr(t,`aria-label`,n):n||this.setAttr(t,`aria-label`,null);let i=this.descriptionText;this.setAttr(t,`aria-description`,i||null);for(let e of[`invalid`,`required`,`disabled`,`readOnly`]){let n=this.propFor(t,e);n&&this.setProp(t,n,this[e])}if(this.setAttr(t,`aria-invalid`,this.invalid?`true`:null),this.setAttr(t,`aria-required`,this.required?`true`:null),this.setAttr(t,`aria-readonly`,this.readOnly?`true`:null),A&&this.children.length>0){let t=Array.from(this.children).filter(e=>!e.hasAttribute(`slot`));t.length>1&&w(e.tagName,`wraps ONE control, found ${t.length} elements in the default slot: only the first one is wired.`)}}handleLabelClick(e){let t=this.controlElement;t&&!this.disabled&&(e.preventDefault(),ia(t)?t.click():t.focus())}hookStates(){return{disabled:this.disabled,invalid:this.invalid,readonly:this.readOnly,required:this.required}}render(){let e=!!this.label||this.slots.test(`label`),t=!!this.helperText||this.slots.test(`helper-text`),n=!!this.errorMessage||this.slots.test(`error-message`);return _`<div class="root" part="root">
${e?_`<label
id="label"
class="label"
part="label"
@click=${this.handleLabelClick}
>${this.label||_`<slot name="label"></slot>`}${this.required?_`<span
class="required"
part="required-indicator"
aria-hidden="true"
>${this.requiredIndicator}</span
>`:u}</label
>`:u}
<slot @slotchange=${()=>this.sync()}></slot>
${!this.invalid&&t?_`<div id="helper" class="helper" part="helper-text">
${this.helperText||_`<slot name="helper-text"></slot>`}
</div>`:u}
${this.invalid&&n?_`<div
id="error"
class="error"
part="error-message"
role="alert"
>
${this.errorMessage||_`<slot name="error-message"></slot>`}
</div>`:u}
</div>`}},L([f()],aa.prototype,`label`,void 0),L([f({attribute:`helper-text`})],aa.prototype,`helperText`,void 0),L([f({attribute:`error-message`})],aa.prototype,`errorMessage`,void 0),L([f({type:Boolean,reflect:!0})],aa.prototype,`invalid`,void 0),L([f({type:Boolean,reflect:!0})],aa.prototype,`required`,void 0),L([f({type:Boolean,reflect:!0})],aa.prototype,`disabled`,void 0),L([f({type:Boolean,reflect:!0,attribute:`readonly`})],aa.prototype,`readOnly`,void 0),L([f({attribute:`required-indicator`})],aa.prototype,`requiredIndicator`,void 0)})))()}var sa;function ca(){return(ca=e((()=>{j(),N(),Rr(),Zt(),Hn(),dr(),d(),h(),Ue(),sa=class e extends E{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-form-layout`}static{this.styles=[D,p`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,F(Jn),F(qt)]}render(){let t=ur(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return _`<div class="root" part="root" style=${g(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},L([f({converter:mr})],sa.prototype,`columns`,void 0),L([f({converter:Lr})],sa.prototype,`gap`,void 0),L([f({attribute:`row-gap`,converter:Lr})],sa.prototype,`rowGap`,void 0),L([f({attribute:`column-gap`,converter:Lr})],sa.prototype,`columnGap`,void 0)})))()}function la(e){let t=``;if(e&&typeof window<`u`){let n=Le(window);n.isSupported&&(n.addHook(`uponSanitizeAttribute`,(e,t)=>{t.attrName===`src`&&(e.nodeName!==`IMG`||!/^data:image\/(?:png|jpeg|gif|webp|avif);base64,[a-z0-9+/=\s]+$/i.test(t.attrValue))&&(t.keepAttr=!1)}),n.sanitize(fa,da)===pa&&(t=n.sanitize(e,da)))}return`<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="${ua}"><meta name="referrer" content="no-referrer"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${t}</body></html>`}var ua,da,fa,pa;function ma(){return(ma=e((()=>{Ye(),ua=`default-src 'none'; script-src 'none'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; object-src 'none'; frame-src 'none'; font-src 'none'; media-src 'none'; form-action 'none'; base-uri 'none'`,da={ALLOWED_TAGS:`a abbr b bdi bdo blockquote br caption center code col colgroup dd del div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i img ins li ol p pre s section small span strong style sub sup table tbody td tfoot th thead tr u ul wbr`.split(` `),ALLOWED_ATTR:`alt title class style lang dir role width height align valign bgcolor border cellpadding cellspacing colspan rowspan scope src`.split(` `),ALLOW_DATA_ATTR:!1,ALLOW_ARIA_ATTR:!0,FORBID_TAGS:[`base`,`meta`,`link`,`script`,`form`,`input`,`button`,`iframe`,`object`,`embed`,`svg`,`math`],FORBID_ATTR:[`href`,`srcdoc`,`srcset`,`action`,`formaction`,`target`,`ping`,`id`,`name`],FORCE_BODY:!0,RETURN_TRUSTED_TYPE:!1},fa=`<p title="t" onclick="x()">ok</p><script>x()<\/script><img alt="a" src="https://x.invalid/p" onerror="x()">`,pa=`<p title="t">ok</p><img alt="a">`})))()}var ha;function ga(){return(ga=e((()=>{x(),O(),j(),N(),dn(),ma(),d(),h(),Ue(),qe(),ha=class e extends E{constructor(...e){super(...e),this.html=``,this.label=``,this.viewport=`desktop`,this.mobileWidth=375,this.height=600,this.doc=la(),this.aria=new S(this)}static{this.tagName=`minerva-html-preview`}static{this.styles=[D,p`
:host{
display: block;
}
`,F(mn)]}willUpdate(e){e.has(`html`)&&(this.doc=la(this.html))}updated(){A&&!this.label&&!this.aria.label&&w(e.tagName,`set label (or aria-label): the iframe needs a title for assistive technologies.`)}render(){let e=Number.isFinite(this.mobileWidth)&&this.mobileWidth>0?this.mobileWidth:375,t=Number.isFinite(this.height)&&this.height>0?this.height:600;return _`<div part="root" class="preview">
${We(this.doc,_`<iframe
part="frame"
class="frame"
title=${this.label||this.aria.label||``}
sandbox=""
referrerpolicy="no-referrer"
srcdoc=${this.doc}
style=${g({width:this.viewport===`mobile`?`${e}px`:`100%`,height:`${t}px`})}
></iframe>`)}
</div>`}},L([f()],ha.prototype,`html`,void 0),L([f()],ha.prototype,`label`,void 0),L([f({reflect:!0})],ha.prototype,`viewport`,void 0),L([f({type:Number,attribute:`mobile-width`})],ha.prototype,`mobileWidth`,void 0),L([f({type:Number})],ha.prototype,`height`,void 0),L([y()],ha.prototype,`doc`,void 0)})))()}var _a,va,X;function ya(){return(ya=e((()=>{x(),O(),C(),I(),un(),j(),N(),On(),sr(),Sn(),d(),h(),m(),_a=200,va=300,X=class e extends E{constructor(...e){super(...e),this.color=`neutral`,this.variant=`ghost`,this.size=`medium`,this.shape=`circle`,this.disabled=!1,this.loading=!1,this.toggle=!1,this.pressed=!1,this.tooltipPlacement=`top`,this.noTooltip=!1,this.type=`button`,this.tooltipOpen=!1,this.tooltipPositioned=!1,this.internals=Kt(this),this.aria=new S(this),this.locale=new T(this),this.floating=new rr(this,()=>({anchor:()=>this.button,floating:()=>this.tooltipElement,branches:()=>[this],placement:this.tooltipPlacement,offset:{mainAxis:8},dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,onDismiss:()=>this.hideTooltip(),onPosition:()=>{this.tooltipPositioned=!0}})),this.handlePointerEnter=()=>{if(!this.tooltipEnabled||this.tooltipOpen){this.clearTimers();return}this.clearTimers(),this.enterTimer=setTimeout(()=>this.showTooltip(),_a)},this.handlePointerLeave=()=>{this.clearTimers(),this.tooltipOpen&&(this.leaveTimer=setTimeout(()=>this.hideTooltip(),va))},this.blockInactiveClicks=e=>{(this.disabled||this.loading)&&(e.preventDefault(),e.stopImmediatePropagation())}}static{this.tagName=`minerva-icon-button`}static{this.formAssociated=!0}static{this.shadowRootOptions={...E.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,$n,p`
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
`,F(sn),F(kn)]}get form(){return this.internals?.form??null}focus(e){this.button?.focus(e)}blur(){this.button?.blur()}click(){this.button?.click()}get tooltipContent(){return this.tooltip||this.label||void 0}get tooltipEnabled(){return!this.noTooltip&&!!this.tooltipContent&&!this.disabled&&!this.loading}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer)}showTooltip(){this.tooltipEnabled&&(this.clearTimers(),this.tooltipOpen=!0)}hideTooltip(){this.clearTimers(),this.tooltipOpen=!1,this.tooltipPositioned=!1}handleClick(e){if(this.loading||this.disabled){e.preventDefault(),e.stopImmediatePropagation();return}if(this.toggle){let e=!this.pressed;this.emit(`minerva-pressed-change`,{pressed:e},{cancelable:!0})&&(this.pressed=e)}let t=this.form;t&&(this.type===`submit`?t.requestSubmit():this.type===`reset`&&t.reset())}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.blockInactiveClicks,!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.blockInactiveClicks,!0),this.clearTimers(),this.tooltipOpen=!1}hookStates(){return{state:this.toggle&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}willUpdate(e){(e.has(`disabled`)||e.has(`loading`)||e.has(`noTooltip`))&&!this.tooltipEnabled&&this.hideTooltip()}updated(){this.floating.sync(this.tooltipOpen&&this.tooltipEnabled),A&&!this.label&&!this.aria.label&&w(e.tagName,`icon buttons only contain an icon: set label (or aria-label) to give them an accessible name.`)}render(){let e=this.tooltipOpen&&this.tooltipEnabled;return _`<button
part="root"
type="button"
class=${v({iconButton:!0,[this.color]:!0,[`variant-${this.variant}`]:!0,[this.size]:!0,[this.shape]:!0,disabled:this.disabled,loading:this.loading,pressed:this.toggle&&this.pressed})}
?disabled=${this.disabled}
tabindex=${this.disabled?`-1`:`0`}
aria-label=${this.label??this.aria.label??this.locale.t(`iconButton.default`)}
aria-description=${this.aria.description??u}
aria-describedby=${e?`tooltip`:u}
aria-pressed=${this.toggle?String(this.pressed):u}
aria-expanded=${this.aria.attr(`aria-expanded`)??u}
aria-haspopup=${this.aria.attr(`aria-haspopup`)??u}
aria-busy=${this.loading?`true`:u}
aria-disabled=${this.loading&&!this.disabled?`true`:u}
@click=${this.handleClick}
@mouseenter=${this.handlePointerEnter}
@mouseleave=${this.handlePointerLeave}
@focus=${()=>this.showTooltip()}
@blur=${()=>this.hideTooltip()}
>
${this.loading?_`<span
class=${v({spinner:!0,[this.size]:!0})}
part="spinner"
role="progressbar"
aria-label=${this.locale.t(`common.loading`)}
>${st}</span
>`:_`<span class="glyph" part="icon" aria-hidden="true"
><slot></slot
></span>`}
</button>
${e?_`<div
id="tooltip"
part="tooltip"
role="tooltip"
popover="manual"
class=${v({tooltip:!0,neutral:!0,solid:!0,default:!0,"animation-fade":!0,show:this.tooltipPositioned})}
@mouseenter=${()=>this.clearTimers()}
@mouseleave=${this.handlePointerLeave}
>
${this.tooltipContent}
</div>`:u}`}},L([f()],X.prototype,`label`,void 0),L([f({reflect:!0})],X.prototype,`color`,void 0),L([f({reflect:!0})],X.prototype,`variant`,void 0),L([f({reflect:!0})],X.prototype,`size`,void 0),L([f({reflect:!0})],X.prototype,`shape`,void 0),L([f({type:Boolean,reflect:!0})],X.prototype,`disabled`,void 0),L([f({type:Boolean,reflect:!0})],X.prototype,`loading`,void 0),L([f({type:Boolean,reflect:!0})],X.prototype,`toggle`,void 0),L([f({type:Boolean,reflect:!0})],X.prototype,`pressed`,void 0),L([f()],X.prototype,`tooltip`,void 0),L([f({attribute:`tooltip-placement`})],X.prototype,`tooltipPlacement`,void 0),L([f({type:Boolean,attribute:`no-tooltip`})],X.prototype,`noTooltip`,void 0),L([f({reflect:!0})],X.prototype,`type`,void 0),L([y()],X.prototype,`tooltipOpen`,void 0),L([y()],X.prototype,`tooltipPositioned`,void 0),L([b(`button`)],X.prototype,`button`,void 0),L([b(`.tooltip`)],X.prototype,`tooltipElement`,void 0)})))()}var ba,Z;function xa(){return(xa=e((()=>{x(),O(),C(),I(),j(),M(),N(),Qt(),zn(),d(),h(),m(),Be(),ba=0,Z=class e extends vn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.type=`text`,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.clearable=!1,this.showCharCount=!1,this.passwordVisible=!1,this.countId=`minerva-input-count-${ba++}`,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.slots=new k(this),this.dirty=!1}static{this.tagName=`minerva-input`}static{this.shadowRootOptions={...vn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,p`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,F(Nn)]}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}select(){this.input?.select()}getFormValue(){return this.value}getValidity(){let e=this.input;return e?{flags:tn(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.passwordVisible=!1}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),A&&t.has(`maxLength`)&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&w(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=this.input.value,this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=this.input.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}clear(){this.value=``,this.input.value=``,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:``}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:``}),this.emit(`minerva-clear`),this.input.focus()}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.type===`password`,r=this.clearable&&this.value!==``&&!t&&!this.readOnly,i=this.passwordVisible?this.hidePasswordLabel??e(`input.hidePassword`):this.showPasswordLabel??e(`input.showPassword`),a=this.showCharCount?this.countId:void 0;return _`<div
part="root"
class=${v({root:!0,[this.variant]:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
${this.slots.test(`prefix`)?_`<span class="addon start" part="prefix"
><slot name="prefix"></slot
></span>`:u}
<input
part="input"
class="field"
.value=${Ge(this.value)}
type=${n&&this.passwordVisible?`text`:this.type}
name=${this.name||u}
placeholder=${this.placeholder||u}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
minlength=${this.minLength??u}
maxlength=${this.maxLength??u}
pattern=${this.pattern??u}
min=${this.min??u}
max=${this.max??u}
step=${this.step??u}
autocomplete=${this.autocomplete??u}
inputmode=${this.inputmode??u}
aria-label=${this.aria.label??u}
aria-description=${this.aria.description??u}
aria-describedby=${a??u}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:u}
@input=${this.handleInput}
@change=${this.handleChange}
/>
${r?_`<button
part="clear-button"
type="button"
class="action"
aria-label=${this.clearLabel??e(`input.clear`)}
@click=${this.clear}
>
${Bt}
</button>`:u}
${n?_`<button
part="password-toggle"
type="button"
class="action"
aria-label=${i}
?disabled=${t}
@click=${()=>this.passwordVisible=!this.passwordVisible}
>
${this.passwordVisible?Rt:Xt}
</button>`:u}
${this.showCharCount?_`<span id=${this.countId} class="count" part="count"
>${this.maxLength!=null&&this.maxLength>=0?`${this.value.length} / ${this.maxLength}`:this.value.length}</span
>`:u}
${this.slots.test(`suffix`)?_`<span class="addon end" part="suffix"
><slot name="suffix"></slot
></span>`:u}
</div>`}},L([f({attribute:!1})],Z.prototype,`value`,void 0),L([f({attribute:`value`})],Z.prototype,`defaultValue`,void 0),L([f({reflect:!0})],Z.prototype,`type`,void 0),L([f({reflect:!0})],Z.prototype,`variant`,void 0),L([f({reflect:!0})],Z.prototype,`size`,void 0),L([f({type:Boolean,reflect:!0})],Z.prototype,`invalid`,void 0),L([f()],Z.prototype,`placeholder`,void 0),L([f({type:Boolean,reflect:!0,attribute:`readonly`})],Z.prototype,`readOnly`,void 0),L([f({type:Number,attribute:`minlength`})],Z.prototype,`minLength`,void 0),L([f({type:Number,attribute:`maxlength`})],Z.prototype,`maxLength`,void 0),L([f()],Z.prototype,`pattern`,void 0),L([f()],Z.prototype,`min`,void 0),L([f()],Z.prototype,`max`,void 0),L([f()],Z.prototype,`step`,void 0),L([f()],Z.prototype,`autocomplete`,void 0),L([f()],Z.prototype,`inputmode`,void 0),L([f({type:Boolean,reflect:!0})],Z.prototype,`clearable`,void 0),L([f({attribute:`clear-label`})],Z.prototype,`clearLabel`,void 0),L([f({type:Boolean,attribute:`show-char-count`})],Z.prototype,`showCharCount`,void 0),L([f({attribute:`show-password-label`})],Z.prototype,`showPasswordLabel`,void 0),L([f({attribute:`hide-password-label`})],Z.prototype,`hidePasswordLabel`,void 0),L([y()],Z.prototype,`passwordVisible`,void 0),L([b(`input`)],Z.prototype,`input`,void 0)})))()}function Sa(e){if(!e.trim())return{status:`empty`};try{return JSON.parse(e),{status:`valid`}}catch(e){return{status:`invalid`,error:e instanceof Error?e.message:String(e)}}}function Ca(e,t){let a=Math.min(10,Math.max(0,Math.trunc(t)||0));if(a>0)return i(e,n(e,void 0,{tabSize:a,insertSpaces:!0,eol:`
`}));let o=r(e,!0),s=[];for(;o.getPosition()<e.length;){o.scan();let t=o.getTokenOffset();s.push(e.slice(t,t+o.getTokenLength()))}return s.join(``)}var Q;function wa(){return(wa=e((()=>{x(),O(),C(),I(),j(),N(),On(),zn(),cn(),Bn(),d(),h(),m(),Be(),t(),Q=class e extends vn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.rows=8,this.hideToolbar=!1,this.indent=2,this.invalid=!1,this.readOnly=!1,this.placeholder=``,this.focused=!1,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-json-field`}static{this.shadowRootOptions={...vn.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,p`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,F(nn),F(sn),F(yn),p`

.toolbar .iconButton{
min-height: 0;
}
.status > svg{
width: 16px;
height: 16px;
}
`]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}formatValue(){Sa(this.value).status===`valid`&&(this.value=Ca(this.value,this.indent))}getFormValue(){return this.value}getValidity(){let e=this.textarea,t=Sa(this.value);return t.status===`invalid`?{flags:{badInput:!0},message:`${this.invalidLabel??this.locale.t(`jsonField.invalid`)}: ${t.error}`,anchor:e}:this.required&&t.status===`empty`?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:e}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),A&&t.has(`indent`)&&(this.indent<0||this.indent>10)&&w(e.tagName,`indent (${this.indent}) is clamped to 0..10.`)}get locked(){return this.isDisabled||this.readOnly}formatNow(){if(this.locked||Sa(this.value).status!==`valid`)return;let e=Ca(this.value,this.indent);e!==this.value&&(this.dirty=!0,this.value=e,this.emit(`minerva-input`,{value:e}),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleInput(){this.locked||(this.dirty=!0,this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value}))}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){let e=!this.focused&&Sa(this.value).status===`invalid`;return{disabled:this.isDisabled,invalid:e||this.invalid,readonly:this.readOnly,required:this.required}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.focused?{status:`empty`}:Sa(this.value),r=n.status===`invalid`,i=r||this.invalid,a=this.locked||!this.value.trim(),o=n.status===`valid`?this.validLabel??e(`jsonField.valid`):n.status===`invalid`?`${this.invalidLabel??e(`jsonField.invalid`)}: ${n.error}`:``,s=[this.aria.description,r?o:void 0].filter(Boolean).join(` `);return _`<div class="root" part="root">
      ${this.hideToolbar?u:_`<div class="toolbar" part="toolbar">
              <button
                part="format-button"
                type="button"
                class=${v({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:a})}
                ?disabled=${a}
                tabindex=${a?`-1`:`0`}
                aria-label=${this.formatLabel??e(`jsonField.format`)}
                @click=${this.formatNow}
              >
                ${kt}
              </button>
            </div>`}
      <textarea
        part="input"
        class=${v({textarea:!0,outline:!0,medium:!0,invalid:i})}
        style="resize: none"
        rows=${this.rows}
        spellcheck="false"
        .value=${Ge(this.value)}
        name=${this.name||u}
        placeholder=${this.placeholder||u}
        ?disabled=${t}
        ?readonly=${this.readOnly}
        ?required=${this.required}
        aria-label=${this.aria.label??u}
        aria-description=${s||u}
        aria-invalid=${i?`true`:u}
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
        ${n.status===`valid`?_`${Ze}<span>${o}</span>`:n.status===`invalid`?_`${ht}<span>${o}</span>`:u}
      </div>
    </div>`}},L([f({attribute:!1})],Q.prototype,`value`,void 0),L([f({attribute:`value`})],Q.prototype,`defaultValue`,void 0),L([f({type:Number})],Q.prototype,`rows`,void 0),L([f({type:Boolean,attribute:`hide-toolbar`})],Q.prototype,`hideToolbar`,void 0),L([f({type:Number})],Q.prototype,`indent`,void 0),L([f({type:Boolean,reflect:!0})],Q.prototype,`invalid`,void 0),L([f({type:Boolean,reflect:!0,attribute:`readonly`})],Q.prototype,`readOnly`,void 0),L([f()],Q.prototype,`placeholder`,void 0),L([f({attribute:`format-label`})],Q.prototype,`formatLabel`,void 0),L([f({attribute:`valid-label`})],Q.prototype,`validLabel`,void 0),L([f({attribute:`invalid-label`})],Q.prototype,`invalidLabel`,void 0),L([y()],Q.prototype,`focused`,void 0),L([b(`textarea`)],Q.prototype,`textarea`,void 0)})))()}function Ta(e){if(!e)return[];try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>e&&typeof e==`object`).map(e=>({id:typeof e.id==`string`?e.id:``,key:String(e.key??``),value:String(e.value??``)}));if(t&&typeof t==`object`)return Object.entries(t).map(([e,t])=>({id:``,key:e,value:typeof t==`string`?t:JSON.stringify(t)}))}catch{}return[]}var Ea,Da;function Oa(){return(Oa=e((()=>{x(),O(),C(),I(),xn(),j(),N(),On(),zn(),Wr(),oa(),en(),pr(),d(),h(),Ve(),Ea=0,Da=class e extends vn{constructor(...e){super(...e),this.value=[],this.defaultValue=[],this.editorId=`kv-${Ea++}`,this.nextId=0,this.dirty=!1,this.pendingFocus=null,this.locale=new T(this),this.aria=new S(this,()=>this.labels)}static{this.tagName=`minerva-key-value-editor`}static{this.dependencies=[U,aa,fr]}static{this.styles=[D,p`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,F(sn),F(Fn),p`

.key{
--textarea-min-height: var(
--key-value-editor-control-height,
var(--control-height-sm)
);
}
`]}focus(e){(this.renderRoot.querySelector(`minerva-textarea`)??this.renderRoot.querySelector(`minerva-button`))?.focus(e)}getFormValue(){return JSON.stringify(this.value.map(({key:e,value:t})=>({key:e,value:t})))}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.renderRoot.querySelector(`minerva-button`)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=Ta(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)&&(this.value.some(e=>!e.id)&&(this.value=this.value.map(e=>e.id?e:{...e,id:this.newId()})),A)){let t=this.value.map(e=>e.id);new Set(t).size!==t.length&&w(e.tagName,`entries have duplicate ids: rows are tracked by id, make them unique.`)}}updated(e){super.updated(e);let t=this.pendingFocus;if(!t)return;this.pendingFocus=null;let n=e=>this.value.some(t=>t.id===e),r=e=>Array.from(this.renderRoot.querySelectorAll(`[data-entry-id]`)).find(t=>e!==void 0&&t.dataset.entryId===e)??null;if(t.kind===`add`){let e=n(t.id)?r(t.id)?.querySelector(`.key`):null;e&&e.updateComplete.then(()=>e.focus())}else n(t.id)||(r(t.nextId)?.querySelector(`.remove`)??this.renderRoot.querySelector(`minerva-button`))?.focus()}newId(){let e;do e=`${this.editorId}-${this.nextId++}`;while(this.value.some(t=>t.id===e));return e}commit(e){this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e})}add(){if(this.isDisabled)return;let e=this.newId();this.pendingFocus={kind:`add`,id:e},this.commit([...this.value,{id:e,key:``,value:``}])}removeEntry(e){if(this.isDisabled)return;let t=this.value.findIndex(t=>t.id===e),n=this.value[t+1]??this.value[t-1];this.pendingFocus={kind:`remove`,id:e,nextId:n?.id},this.commit(this.value.filter(t=>t.id!==e))}handleInput(e,t,n){if(e.stopPropagation(),this.isDisabled)return;let r=e.target.value;this.dirty=!0,this.value=this.value.map(e=>e.id===t?{...e,[n]:r}:e),this.emit(`minerva-input`,{value:this.value})}handleFieldChange(e){e.stopPropagation(),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}isRowInvalid(e){let t=this.errors?.[e.id];return!!(t?.key||t?.value)}renderField(e,t,n,r){let i=this.errors?.[e.id]?.[n];return _`<minerva-form-control
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
</minerva-form-control>`}hookStates(){return{disabled:this.isDisabled}}render(){let{t:e}=this.locale,t=this.keyLabel??e(`keyValueEditor.key`),n=this.valueLabel??e(`keyValueEditor.value`),r=this.removeLabel??e(`keyValueEditor.remove`),i=this.isDisabled,a=this.aria.label;return _`<div
class="root"
part="root"
role=${a?`group`:u}
aria-label=${a??u}
aria-description=${this.aria.description??u}
>
${ze(this.value,e=>e.id,(e,a)=>_`<div
class="row"
part=${pn(`row`,{invalid:this.isRowInvalid(e)})}
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
${Bt}
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
<span slot="start">${_t}</span>
<span>${this.addLabel??e(`keyValueEditor.add`)}</span>
</minerva-button>
</div>`}},L([f({attribute:!1})],Da.prototype,`value`,void 0),L([f({attribute:`value`,converter:{fromAttribute:e=>Ta(e)}})],Da.prototype,`defaultValue`,void 0),L([f({attribute:`key-label`})],Da.prototype,`keyLabel`,void 0),L([f({attribute:`value-label`})],Da.prototype,`valueLabel`,void 0),L([f({attribute:`add-label`})],Da.prototype,`addLabel`,void 0),L([f({attribute:`remove-label`})],Da.prototype,`removeLabel`,void 0),L([f({attribute:!1})],Da.prototype,`errors`,void 0)})))()}var ka,Aa;function ja(){return(ja=e((()=>{x(),O(),un(),j(),M(),N(),Dn(),d(),h(),m(),ka=class e extends E{constructor(...e){super(...e),this.density=`default`,this.bordered=!1,this.noDividers=!1,this.internals=Kt(this)}static{this.tagName=`minerva-list`}static{this.styles=[D,p`
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
`,F(Yt)]}connectedCallback(){super.connectedCallback(),ct(this,this.internals,{role:`list`})}updated(){if(A){let t=Array.from(this.children).find(e=>e.localName!==Aa.tagName);t&&w(e.tagName,`children should be <minerva-list-item> elements (found <${t.localName}>): other elements break the list semantics.`)}}render(){return _`<div
part="root"
class=${v({list:!0,compact:this.density===`compact`,comfortable:this.density===`comfortable`,bordered:this.bordered,dividers:!this.noDividers})}
>
<slot @slotchange=${()=>this.requestUpdate()}></slot>
</div>`}},L([f({reflect:!0})],ka.prototype,`density`,void 0),L([f({type:Boolean,reflect:!0})],ka.prototype,`bordered`,void 0),L([f({type:Boolean,reflect:!0,attribute:`no-dividers`})],ka.prototype,`noDividers`,void 0),Aa=class extends E{constructor(...e){super(...e),this.primary=``,this.secondary=``,this.internals=Kt(this),this.slots=new k(this)}static{this.tagName=`minerva-list-item`}static{this.styles=[D,F(Yt),p`
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
`]}connectedCallback(){super.connectedCallback(),ct(this,this.internals,{role:`listitem`})}render(){let e=this.secondary!==``||this.slots.test(`secondary`);return _`<div part="root" class="item">
${this.slots.test(`icon`)?_`<div part="icon" class="icon" aria-hidden="true">
<slot name="icon"></slot>
</div>`:u}
<div class="content">
<div part="label" class="primary"><slot>${this.primary}</slot></div>
${e?_`<div part="description" class="secondary">
<slot name="secondary">${this.secondary}</slot>
</div>`:u}
</div>
${this.slots.test(`actions`)?_`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:u}
</div>`}},L([f()],Aa.prototype,`primary`,void 0),L([f()],Aa.prototype,`secondary`,void 0)})))()}var Ma,Na;function Pa(){return(Pa=e((()=>{O(),I(),j(),N(),Tn(),cr(),d(),h(),m(),Ma=[`small`,`medium`,`large`],Na=class e extends E{constructor(...e){super(...e),this.size=`medium`,this.locale=new T(this)}static{this.tagName=`minerva-loading-state`}static{this.dependencies=[hr]}static{this.styles=[D,p`
:host{
display: block;
}
`,F(Rn)]}hookStates(){return{size:this.size}}updated(){A&&!Ma.includes(this.size)&&w(e.tagName,`unknown size "${this.size}" (expected ${Ma.join(`, `)}).`)}render(){return _`<div
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
</div>`}},L([f()],Na.prototype,`label`,void 0),L([f({reflect:!0})],Na.prototype,`size`,void 0)})))()}function Fa(e){let t=Array.from(e.childNodes).filter(e=>!Ka(e)&&(e.nodeType!==1||e.getAttribute(`slot`)!==`icon`));return t.every(e=>e.nodeType===3)?t.map(e=>e.textContent??``).join(``).trim():t.map(e=>e.cloneNode(!0))}function Ia(e){return{value:Ya(e,`value`)??Ja(e),label:Fa(e),textValue:Ya(e,`text-value`),shortcut:Ya(e,`shortcut`),disabled:Xa(e,`disabled`),closeOnSelect:Xa(e,`close-on-select`),element:e}}function La(e,t=`e`){let n=[],r=null;return Array.from(e.children).forEach((e,i)=>{let a=`${t}-${i}`;switch(e.localName!==Va.tagName&&(r=null),e.localName){case za.tagName:{let t=La(e,a),r=e.querySelector(`:scope > [slot='icon']`);n.push({key:Ya(e,`value`)||Ja(e),label:Fa(e),textValue:Ya(e,`text-value`),icon:r?r.cloneNode(!0):void 0,shortcut:Ya(e,`shortcut`),disabled:Xa(e,`disabled`),closeOnSelect:!Xa(e,`keep-open`)&&void 0,children:t.length?t:void 0,element:e});break}case Ba.tagName:n.push({type:`checkbox`,key:Ya(e,`value`)||Ja(e),label:Fa(e),textValue:Ya(e,`text-value`),shortcut:Ya(e,`shortcut`),disabled:Xa(e,`disabled`),checked:Xa(e,`checked`),closeOnSelect:Xa(e,`close-on-select`),element:e});break;case Va.tagName:{r||(r={type:`radio-group`,key:a,items:[]},n.push(r));let t=Ia(e);r.items.push(t),Xa(e,`checked`)&&(r.value=t.value);break}case Ua.tagName:n.push({type:`separator`,key:a});break;case Wa.tagName:n.push({type:`label`,key:a,label:Fa(e)});break;case Ha.tagName:{let t=Array.from(e.children),r=Ya(e,`label`);if(t.length>0&&t.every(e=>e.localName===Va.tagName)){let i=t.map(Ia);n.push({type:`radio-group`,key:a,label:r,items:i,value:i.find(e=>e.element?.hasAttribute(`checked`))?.value,closeOnSelect:Xa(e,`close-on-select`),element:e})}else n.push({type:`group`,key:a,label:r??``,items:La(e,a)});break}}}),n}var Ra,za,Ba,Va,Ha,Ua,Wa,Ga,Ka,qa,Ja,Ya,Xa;function Za(){return(Za=e((()=>{j(),d(),h(),Ra=p`
:host{
display: none !important;
}
`,za=class extends E{constructor(...e){super(...e),this.value=``,this.disabled=!1,this.shortcut=``,this.textValue=``,this.keepOpen=!1}static{this.tagName=`minerva-menu-item`}static{this.styles=Ra}},L([f({reflect:!0})],za.prototype,`value`,void 0),L([f({type:Boolean,reflect:!0})],za.prototype,`disabled`,void 0),L([f()],za.prototype,`shortcut`,void 0),L([f({attribute:`text-value`})],za.prototype,`textValue`,void 0),L([f({type:Boolean,attribute:`keep-open`})],za.prototype,`keepOpen`,void 0),Ba=class extends E{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-checkbox-item`}static{this.styles=Ra}},L([f({reflect:!0})],Ba.prototype,`value`,void 0),L([f({type:Boolean,reflect:!0})],Ba.prototype,`checked`,void 0),L([f({type:Boolean,reflect:!0})],Ba.prototype,`disabled`,void 0),L([f()],Ba.prototype,`shortcut`,void 0),L([f({attribute:`text-value`})],Ba.prototype,`textValue`,void 0),L([f({type:Boolean,attribute:`close-on-select`})],Ba.prototype,`closeOnSelect`,void 0),Va=class extends E{constructor(...e){super(...e),this.value=``,this.checked=!1,this.disabled=!1,this.shortcut=``,this.textValue=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-radio-item`}static{this.styles=Ra}},L([f({reflect:!0})],Va.prototype,`value`,void 0),L([f({type:Boolean,reflect:!0})],Va.prototype,`checked`,void 0),L([f({type:Boolean,reflect:!0})],Va.prototype,`disabled`,void 0),L([f()],Va.prototype,`shortcut`,void 0),L([f({attribute:`text-value`})],Va.prototype,`textValue`,void 0),L([f({type:Boolean,attribute:`close-on-select`})],Va.prototype,`closeOnSelect`,void 0),Ha=class extends E{constructor(...e){super(...e),this.label=``,this.closeOnSelect=!1}static{this.tagName=`minerva-menu-group`}static{this.styles=Ra}},L([f()],Ha.prototype,`label`,void 0),L([f({type:Boolean,attribute:`close-on-select`})],Ha.prototype,`closeOnSelect`,void 0),Ua=class extends E{static{this.tagName=`minerva-menu-separator`}static{this.styles=Ra}},Wa=class extends E{static{this.tagName=`minerva-menu-label`}static{this.styles=Ra}},Ga=[za.tagName,Ba.tagName,Va.tagName,Ha.tagName,Ua.tagName,Wa.tagName],Ka=e=>e.nodeType===1&&Ga.includes(e.localName),qa=e=>!!(e.nodeType===1?e:e.parentElement)?.closest(Ga.join(`,`)),Ja=e=>Array.from(e.childNodes).filter(e=>!Ka(e)).map(e=>e.textContent??``).join(``).trim(),Ya=(e,t)=>e.getAttribute(t)??void 0,Xa=(e,t)=>e.hasAttribute(t)})))()}var Qa,$a,eo,to,no,ro,io,ao,oo,so,co,lo;function uo(){return(uo=e((()=>{O(),C(),rt(),xn(),j(),N(),tr(),ir(),er(),sr(),or(),on(),Za(),d(),h(),m(),ie(),c(),Ve(),Qa=100,$a=`[data-minerva-menu-item]`,eo={mainAxis:4,crossAxis:-5},to=e=>e.hasAttribute(`data-disabled`),no=e=>e.dataset.textValue??e.querySelector(`.text`)?.textContent??e.textContent??``,ro=e=>e?Array.from(e.querySelectorAll($a)):[],io=e=>Oe(e,{preventScroll:!0}),ao=e=>typeof e==`string`?e:void 0,oo=e=>e.join(`/`),so=0,co=class{constructor(e,t,n){this.grace=Fe(),this.typeahead=le(),this.lastTypeahead=0,this.element=null,this.uid=null,this.path=[],this.position=new nr(e,()=>n===0?{placement:t.rootPlacement(),offset:t.rootOffset(),padding:8}:{placement:t.direction===`rtl`?`left-start`:`right-start`,offset:eo,padding:8}),this.layer=new Zn(e,()=>n===0?t.rootLayerOptions():t.subLayerOptions(n)),this.scope=new ar(e,()=>({trapped:n===0&&t.isModal,autoFocus:!1,restoreFocus:!1}))}clearTimer(){clearTimeout(this.openTimer),this.openTimer=void 0}},lo=class extends E{constructor(...e){super(...e),this.items=[],this.open=!1,this.size=`medium`,this.keepOpen=!1,this.disabled=!1,this.nonModal=!1,this.noLoop=!1,this.declarative=[],this.openPath=[],this.exiting=[],this.stored=new Map,this.levels=[],this.modalController=new Qn(this),this.observer=null,this.intent=`content`,this.subIntent=`none`,this.restoreOverride=void 0,this.reason=`outside`,this.direction=`ltr`,this.onPanelKeyDown=e=>{let t=e.currentTarget,n=this.panelDepth(t),r=this.levels[n],{key:i}=e;if(i===`Tab`){e.preventDefault(),this.closeWithTab(e.shiftKey);return}if(e.defaultPrevented||!r||e.altKey||e.ctrlKey||e.metaKey)return;let a=ro(t),o=e.composedPath()[0],s=a.find(e=>e===o)??null,c=s?a.indexOf(s):-1,l=this.direction===`rtl`,ee=l?`ArrowLeft`:`ArrowRight`,te=l?`ArrowRight`:`ArrowLeft`;if([`ArrowDown`,`ArrowUp`,`Home`,`End`].includes(i)){e.preventDefault(),r.typeahead.reset();let t=ge({currentIndex:c,count:a.length,key:i,orientation:`vertical`,loop:!this.noLoop,isDisabled:e=>to(a[e])});t!==null&&io(a[t]);return}if(i===ee&&s?.hasAttribute(`aria-haspopup`)){e.preventDefault(),to(s)||this.openSubmenu(n,s.dataset.uid??``,`first`);return}if(i===te&&n>0){e.preventDefault(),io(this.parentItem(n)),this.closeSubmenu(n);return}if(i.length===1){let t=Date.now();t-r.lastTypeahead>500&&r.typeahead.reset();let n=r.typeahead.getBuffer()!==``;if(i!==` `||n){r.lastTypeahead=t,e.preventDefault();let n=r.typeahead.search(i,a.map(e=>({text:no(e),disabled:to(e)})),c);n!==-1&&io(a[n]);return}}(i===`Enter`||i===` `)&&s&&(e.preventDefault(),to(s)||this.activateItem(s,`first`))},this.itemActions=new Map,this.highlightedItem=null,this.onPanelFocusIn=e=>{let t=e.composedPath()[0];t.matches?.($a)&&this.highlightItem(t,!0)},this.onPanelFocusOut=e=>{let t=e.composedPath()[0];t.matches?.($a)&&this.highlightItem(t,!1)}}static{this.styles=[D,$n,p`
:host{
display: contents;
}
`,F(Xe)]}onRootPointerDownOutside(e){}get isModal(){return!this.nonModal}get entries(){return this.items.length?this.items:this.declarative}show(){this.open=!0}hide(){this.open=!1}requestOpenChange(e,t){if(e===this.open)return!0;let n=this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0});return n&&(this.open=e,e||this.closeLevels()),n}openWith(e,t){this.intent=e,this.requestOpenChange(!0,t)}closeAll(e){this.requestOpenChange(!1,e)}closeWithTab(e){let t=this.restoreTarget(),n;if(t){let r=a().find(e=>e.element===this.levels[0]?.element)?.parent??document.body,i=ue(r).filter(e=>e===t||!l(this,e)||!this.isPanelNode(e)),o=i.indexOf(t);n=o===-1?t:i[e?o-1:o+1]??t}this.restoreOverride=n??void 0,this.requestOpenChange(!1,`tab`)&&io(n)}isPanelNode(e){return this.levels.some(t=>l(t.element,e))}level(e){return this.levels[e]??=new co(this,this,e),this.levels[e]}parentItem(e){let t=this.openPath[e-1];return t?this.renderRoot.querySelector(`[data-uid="${t}"]`)??null:null}rootLayerOptions(){return{disableOutsidePointerEvents:this.isModal,branches:()=>this.branches(),onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:e=>{this.reason=`outside`,this.onRootPointerDownOutside(e),!e.defaultPrevented&&(!this.isModal||e.button===2)&&(this.restoreOverride=null)},onFocusOutside:e=>(this.reason=`focus-outside`,!this.isModal||(e.preventDefault(),!1)),onDismiss:()=>this.closeAll(this.reason)}}subLayerOptions(e){return{parent:this.levels[e-1]?.element??void 0,branches:()=>[this.parentItem(e)],onEscapeKeyDown:()=>{io(this.parentItem(e))},onDismiss:()=>this.closeSubmenu(e)}}closeLevels(e=0,t=!0){for(let n=this.levels.length-1;n>=e;n--){let e=this.levels[n],r=e.element;r&&(e.clearTimer(),e.grace.clear(),e.typeahead.reset(),e.scope.deactivate(),e.layer.deactivate(),e.position.end(),t&&this.isConnected?this.exit(r,n,e.path):P(r),e.element=null,e.uid=null,n===0&&(this.modalController.deactivate(),this.scheduleRestore()))}}exit(e,t,n){if(e.setAttribute(`data-state`,`closed`),be(e)<=0){P(e);return}let r=++so,i=oo(n);this.exiting=[...this.exiting.filter(e=>oo(e.path)!==i),{id:r,depth:t,path:n}],ee(e).then(()=>{this.exiting.some(e=>e.id===r)&&(P(e),this.exiting=this.exiting.filter(e=>e.id!==r))})}clearExiting(){if(this.exiting.length!==0){for(let e of this.exiting)P(this.renderRoot.querySelector(`[data-panel-key="${oo(e.path)}"]`));this.exiting=[]}}scheduleRestore(){let e=this.restoreOverride;this.restoreOverride=void 0;let t=e===void 0?this.restoreTarget():e;t&&setTimeout(()=>{if(this.open||!t.isConnected)return;let e=ke(document);(!e||e===document.body||!e.isConnected||(this.shadowRoot?.contains(e)??!1))&&io(t)},0)}syncLevels(){let e=this.open&&!this.disabled?this.openPath.length+1:0;this.closeLevels(e);for(let t=0;t<e;t++){let e=t===0?``:this.openPath[t-1],n=this.renderRoot.querySelector(`[data-panel-key="${oo(this.openPath.slice(0,t))}"]`);if(!n)return;let r=this.level(t);if(r.element===n&&r.uid===e)continue;r.element&&this.closeLevels(t);let i=t===0?this.anchorElement():this.parentItem(t);if(!i)return;r.element=n,r.uid=e,r.path=this.openPath.slice(0,t),n.setAttribute(`data-state`,`open`),jt(n),r.position.start(i,n),t===0&&this.isModal&&this.modalController.activate(this),r.layer.activate(n),r.scope.activate(n);let a=t===0?this.intent:this.subIntent;t===0?this.intent=`content`:this.subIntent=`none`,this.focusIntent(n,a)}}focusIntent(e,t){if(t===`none`)return;let n=ro(e).filter(e=>!to(e));io((t===`first`?n[0]:t===`last`?n[n.length-1]:void 0)??e)}reanchor(){let e=this.levels[0],t=this.anchorElement();e?.element&&t&&e.position.start(t,e.element)}openSubmenu(e,t,n){if(this.openPath[e]===t&&this.levels[e+1]?.element){n===`first`&&io(ro(this.levels[e+1].element).find(e=>!to(e)));return}this.subIntent=n,this.openPath=[...this.openPath.slice(0,e),t]}closeSubmenu(e){this.openPath.length<e||(this.closeLevels(e),this.openPath=this.openPath.slice(0,e-1))}stateOf(e,t){return this.stored.has(e)?this.stored.get(e):t}isChecked(e){return e.element?e.element.hasAttribute(`checked`):this.stateOf(e.key,e.checked??e.defaultChecked??!1)}radioValue(e){return e.items.some(e=>e.element)?e.items.find(e=>e.element?.hasAttribute(`checked`))?.value:this.stateOf(e.key,e.value??e.defaultValue)}activateAction(e){this.emit(`minerva-select`,{value:e.key,item:e},{cancelable:!0})&&(e.closeOnSelect??!this.keepOpen)&&this.closeAll(`select`)}toggleCheckbox(e){let t=!this.isChecked(e);this.emit(`minerva-change`,{value:e.key,checked:t,item:e},{cancelable:!0})&&(e.element?e.element.toggleAttribute(`checked`,t):this.stored.set(e.key,t),this.requestUpdate()),e.closeOnSelect&&this.closeAll(`select`)}chooseRadio(e,t){let n=this.radioValue(e);if(t.value!==n&&this.emit(`minerva-change`,{value:t.value,group:e.key,item:t},{cancelable:!0})){if(t.element)for(let n of e.items)n.element?.toggleAttribute(`checked`,n===t);else this.stored.set(e.key,t.value);this.requestUpdate()}(e.closeOnSelect||t.closeOnSelect)&&this.closeAll(`select`)}panelDepth(e){return Number(e.dataset.level??0)}activateItem(e,t){this.itemActions.get(e.dataset.uid??``)?.(t)}highlightItem(e,t){t?this.highlightedItem=e.dataset.uid??null:this.highlightedItem===e.dataset.uid&&(this.highlightedItem=null),e.toggleAttribute(`data-highlighted`,t),e.setAttribute(`part`,pn(`item`,{state:e.dataset.state,highlighted:t,disabled:e.hasAttribute(`data-disabled`),expanded:e.hasAttribute(`data-expanded`)}))}onItemClick(e){let t=e.currentTarget;to(t)||this.activateItem(t,`none`)}onItemPointerMove(e){let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i||e.pointerType===`touch`||i.grace.isInGraceArea({x:e.clientX,y:e.clientY}))return;i.grace.clear();let a=ke(document);if(to(t)){a!==n&&io(n);return}a!==t&&io(t);let o=t.dataset.uid??``;t.hasAttribute(`aria-haspopup`)&&this.openPath[r]!==o&&i.openTimer===void 0&&(i.openTimer=setTimeout(()=>{i.openTimer=void 0,this.open&&this.openSubmenu(r,o,`none`)},100))}onItemPointerLeave(e){if(e.pointerType===`touch`)return;let t=e.currentTarget,n=t.closest(`[data-level]`);if(!n)return;let r=this.panelDepth(n),i=this.levels[r];if(!i)return;i.clearTimer();let a=this.levels[r+1]?.element;if(t.hasAttribute(`aria-haspopup`)&&this.openPath[r]===t.dataset.uid&&a){let t=a.getAttribute(`data-side`)??`right`;i.grace.start({x:e.clientX,y:e.clientY},a.getBoundingClientRect(),t);return}i.grace.isInGraceArea({x:e.clientX,y:e.clientY})||ke(document)===t&&io(n)}readEntries(){this.declarative=La(this)}connectedCallback(){super.connectedCallback(),this.readEntries(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(e=>{e.some(e=>qa(e.target)||Array.from(e.addedNodes).some(qa)||Array.from(e.removedNodes).some(e=>e.nodeType===1&&e.localName.startsWith(`minerva-menu-`)))&&this.readEntries()}),this.observer.observe(this,{subtree:!0,childList:!0,attributes:!0,characterData:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.closeLevels(0,!1),this.clearExiting()}willUpdate(e){if(e.has(`items`)&&(this.stored=new Map,A&&this.checkKeys(this.items)),e.has(`open`)&&this.open){let e=this.anchorElement(),t=e&&`nodeType`in e?e:this;this.direction=this.isConnected?te(t):`ltr`}e.has(`open`)&&!this.open&&(this.openPath=[]);let t=this.open&&!this.disabled?this.openPath.length+1:0,n=this.levels.findIndex((e,n)=>e.element!==null&&(n>=t||oo(e.path)!==oo(this.openPath.slice(0,n))));if(n!==-1&&this.closeLevels(n),this.exiting.length){let e=this.openKeys();this.exiting.some(t=>e.has(oo(t.path)))&&(this.exiting=this.exiting.filter(t=>!e.has(oo(t.path))))}}openKeys(){return!this.open||this.disabled?new Set:new Set([[],...this.openPath.map((e,t)=>this.openPath.slice(0,t+1))].map(oo))}checkKeys(e,t=new Set){for(let n of e)if(!(`type`in n&&n.type===`separator`)){if(`type`in n&&(n.type===`group`||n.type===`label`)){n.type===`group`&&this.checkKeys(n.items,t);continue}t.has(n.key)&&w(this.constructor.tagName,`duplicate item key "${n.key}": keys must be unique (checkbox / radio state and minerva-select values are keyed by it).`),t.add(n.key),!(`type`in n)&&n.children&&this.checkKeys(n.children,t)}}hookStates(){let e=this.levels[0]?.position.running?this.levels[0].position.placement:this.rootPlacement();return{state:this.open&&!this.disabled?`open`:`closed`,disabled:this.disabled,size:this.size,...we(e),placement:e}}updated(e){this.syncTrigger(),(e.has(`open`)||e.has(`openPath`)||e.has(`disabled`))&&this.syncLevels()}renderPanels(){let e=this.open&&!this.disabled;if(!e&&this.exiting.length===0)return u;this.itemActions.clear();let t=[];e&&(t.push({key:``,depth:0,path:[],state:`open`}),this.openPath.forEach((e,n)=>{let r=this.openPath.slice(0,n+1);t.push({key:oo(r),depth:n+1,path:r,state:`open`})}));let n=new Set(t.map(e=>e.key));for(let e of this.exiting){let r=oo(e.path);n.has(r)||(n.add(r),t.push({key:r,depth:e.depth,path:e.path,state:`closed`}))}return ze(t,e=>e.key,e=>this.renderPanelAt(e.depth,e.path,e.state))}renderPanelAt(e,t,n){let r=this.entries,i=e===0?this.rootLabel():void 0;for(let[e,n]of t.entries()){let t=this.findSubmenu(r,n,`${e}:`);if(!t)return u;r=t.children??[],i=ao(t.label)??t.textValue}return this.renderPanel(e,t.at(-1)??``,r,i,n,oo(t))}findSubmenu(e,t,n){for(let[r,i]of e.entries()){let e=`${n}${r}`;if(`type`in i){if(i.type===`group`){let n=this.findSubmenu(i.items,t,`${e}.`);if(n)return n}continue}if(i.children?.length&&e===t)return i}return null}renderPanel(e,t,n,r,i,a){let o=e===0?``:`item-${t}`;return _`<div
part="content"
id=${e===0?`menu`:`menu-${t}`}
class=${v({content:!0,small:this.size===`small`})}
popover="manual"
role="menu"
aria-orientation="vertical"
aria-label=${e===0?r??u:u}
aria-labelledby=${e>0?o:u}
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
</div>`}renderEntries(e,t,n){return e.map((e,r)=>{let i=`${n}${r}`;if(`type`in e)switch(e.type){case`separator`:return _`<div
role="separator"
aria-orientation="horizontal"
class="separator"
part="separator"
></div>`;case`label`:return _`<div class="label" part="label">${e.label}</div>`;case`group`:{let n=`label-${i.replace(/[:.]/g,`-`)}`;return _`<div
role="group"
part="group"
aria-labelledby=${n}
>
<div id=${n} class="label" part="label">${e.label}</div>
${this.renderEntries(e.items,t,`${i}.`)}
</div>`}case`checkbox`:return this.renderCheckbox(e,i);case`radio-group`:return this.renderRadioGroup(e,i)}return this.renderAction(e,t,i)})}renderItem(e){let{uid:t,disabled:n=!1,submenu:r}=e;this.itemActions.set(t,e.activate);let i=e.textValue??ao(e.label),a={state:e.checked===void 0?void 0:e.checked?`checked`:`unchecked`,highlighted:this.highlightedItem===t,disabled:n,expanded:r?.open};return _`<div
id=${`item-${t}`}
part=${pn(`item`,a)}
role=${e.role}
tabindex="-1"
class="item"
data-minerva-menu-item=""
data-uid=${t}
data-text-value=${i??u}
data-state=${a.state??u}
?data-highlighted=${a.highlighted}
?data-disabled=${n}
?data-expanded=${r?.open}
aria-disabled=${n?`true`:u}
aria-checked=${e.checked===void 0?u:String(e.checked)}
aria-haspopup=${r?`menu`:u}
aria-expanded=${r?String(r.open):u}
aria-controls=${r?.open?`menu-${t}`:u}
@click=${this.onItemClick}
@pointermove=${this.onItemPointerMove}
@pointerleave=${this.onItemPointerLeave}
>
${e.indicator??u}
${e.icon?_`<span class="icon" part="icon" aria-hidden="true"
>${e.icon}</span
>`:u}
<span class="text" part="item-label">${e.label}</span>
${e.shortcut?_`<span class="shortcut" part="shortcut">${e.shortcut}</span>`:u}
${e.trailing??u}
</div>`}renderAction(e,t,n){if(e.children?.length){let r=this.openPath[t]===n&&!e.disabled;return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,submenu:{open:r},trailing:_`<span class="chevron" aria-hidden="true"
>${tt}</span
>`,activate:e=>this.openSubmenu(t,n,e)})}return this.renderItem({uid:n,role:`menuitem`,label:e.label,textValue:e.textValue,icon:e.icon,shortcut:e.shortcut,disabled:e.disabled,activate:()=>this.activateAction(e)})}renderCheckbox(e,t){let n=this.isChecked(e);return this.renderItem({uid:t,role:`menuitemcheckbox`,label:e.label,textValue:e.textValue,shortcut:e.shortcut,disabled:e.disabled,checked:n,indicator:_`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${n?pt:u}</span
>`,activate:()=>this.toggleCheckbox(e)})}renderRadioGroup(e,t){let n=this.radioValue(e),r=`label-${t.replace(/[:.]/g,`-`)}`,i=e.label!=null&&e.label!==``;return _`<div
role="group"
part="group"
aria-labelledby=${i?r:u}
>
${i?_`<div id=${r} class="label" part="label">${e.label}</div>`:u}
${e.items.map((r,i)=>{let a=r.value===n;return this.renderItem({uid:`${t}.${i}`,role:`menuitemradio`,label:r.label,textValue:r.textValue,shortcut:r.shortcut,disabled:r.disabled,checked:a,indicator:_`<span
class="indicator"
part="item-indicator"
aria-hidden="true"
>${a?_`<span class="dot"></span>`:u}</span
>`,activate:()=>this.chooseRadio(e,r)})})}
</div>`}},L([f({attribute:!1})],lo.prototype,`items`,void 0),L([f({type:Boolean,reflect:!0})],lo.prototype,`open`,void 0),L([f({reflect:!0})],lo.prototype,`size`,void 0),L([f({type:Boolean,attribute:`keep-open`})],lo.prototype,`keepOpen`,void 0),L([f({type:Boolean,reflect:!0})],lo.prototype,`disabled`,void 0),L([f({type:Boolean,reflect:!0,attribute:`non-modal`})],lo.prototype,`nonModal`,void 0),L([f({type:Boolean,attribute:`no-loop`})],lo.prototype,`noLoop`,void 0),L([y()],lo.prototype,`declarative`,void 0),L([y()],lo.prototype,`openPath`,void 0),L([y()],lo.prototype,`exiting`,void 0)})))()}function fo(e,t,n){n===null?e.hasAttribute(t)&&e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}var po,mo;function ho(){return(ho=e((()=>{O(),Za(),uo(),d(),h(),ie(),po={mainAxis:6,crossAxis:0},mo=class e extends lo{constructor(...e){super(...e),this.side=`bottom`,this.align=`end`,this.disabledTrigger=null,this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.fromTrigger(e)))switch(e.key){case`Enter`:case` `:e.preventDefault(),this.open?this.requestOpenChange(!1,`trigger`):this.openWith(`first`,`keyboard`);break;case`ArrowDown`:e.preventDefault(),this.openWith(`first`,`keyboard`);break;case`ArrowUp`:e.preventDefault(),this.openWith(`last`,`keyboard`)}},this.handleClick=e=>{this.disabled||e.defaultPrevented||!this.fromTrigger(e)||(this.open?this.requestOpenChange(!1,`trigger`):this.openWith(e.detail===0?`first`:`content`,`trigger`))}}static{this.tagName=`minerva-menu`}static{this.dependencies=[za,Ba,Va,Ha,Ua,Wa]}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorElement(){return this.triggerElement()}rootPlacement(){return ve(this.side,this.align)}rootOffset(){return po}restoreTarget(){return this.triggerElement()}branches(){return[this.triggerElement()]}rootLabel(){let e=this.getAttribute(`aria-label`);if(e)return e;let t=this.triggerElement();return t?.getAttribute(`aria-label`)??(t?.textContent?.trim()||void 0)}syncTrigger(){let e=this.triggerElement();e&&(fo(e,`aria-haspopup`,`menu`),fo(e,`aria-expanded`,String(this.open)),fo(e,`data-state`,this.open?`open`:`closed`),fo(e,`data-disabled`,this.disabled?``:null),this.disabled&&!e.hasAttribute(`disabled`)?(e.setAttribute(`disabled`,``),this.disabledTrigger=e):!this.disabled&&this.disabledTrigger===e&&(e.removeAttribute(`disabled`),this.disabledTrigger=null))}fromTrigger(e){let t=this.triggerElement();return!!t&&e.composedPath().includes(t)}connectedCallback(){super.connectedCallback(),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick)}firstUpdated(t){super.firstUpdated(t),A&&!this.triggerElement()&&w(e.tagName,`no slot="trigger" element: nothing opens the menu (add e.g. <button slot="trigger">).`)}render(){return _`<slot name="trigger"></slot>${this.renderPanels()}`}},L([f({reflect:!0})],mo.prototype,`side`,void 0),L([f({reflect:!0})],mo.prototype,`align`,void 0)})))()}var go,_o,vo,yo,bo;function xo(){return(xo=e((()=>{rt(),Za(),uo(),ho(),d(),ie(),go=700,_o={mainAxis:2,crossAxis:0},vo={mainAxis:4,crossAxis:0},yo=(e,t,n)=>({contextElement:n,getBoundingClientRect:()=>({x:e,y:t,left:e,top:t,right:e,bottom:t,width:0,height:0})}),bo=class extends lo{constructor(...e){super(...e),this.position=null,this.restoreTo=null,this.areaPointerEvents=null,this.handleContextMenu=e=>{this.disabled||e.defaultPrevented||!this.inArea(e)||(e.preventDefault(),this.clearLongPress(),this.openAtPoint(e.clientX,e.clientY))},this.handleKeyDown=e=>{if(!(this.disabled||e.defaultPrevented||!this.inArea(e))&&(e.key===`ContextMenu`||e.shiftKey&&e.key===`F10`)){let t=this.area();if(!t)return;e.preventDefault();let n=te(t)===`rtl`;this.openAt({anchor:t,placement:n?`bottom-end`:`bottom-start`,offset:vo})}},this.handlePointerDown=e=>{if(this.disabled||e.pointerType!==`touch`||!this.inArea(e))return;this.clearLongPress();let{clientX:t,clientY:n}=e;this.longPress=setTimeout(()=>{this.longPress=void 0,this.openAtPoint(t,n)},700)},this.handleTouchEnd=e=>{e.pointerType===`touch`&&this.clearLongPress()}}static{this.tagName=`minerva-context-menu`}static{this.dependencies=[za,Ba,Va,Ha,Ua,Wa]}static{this.styles=[...lo.styles,p`
:host(:not([disabled])) ::slotted(*){
-webkit-touch-callout: none;
}
`]}area(){return Array.from(this.children).find(e=>!Ga.includes(e.localName))??null}anchorElement(){return this.position?.anchor??null}rootPlacement(){return this.position?.placement??`right-start`}rootOffset(){return this.position?.offset??_o}restoreTarget(){return this.restoreTo}branches(){return[]}rootLabel(){return this.getAttribute(`aria-label`)??void 0}onRootPointerDownOutside(e){let t=this.area(),n=e.composedPath()[0];e.button===2&&t&&n instanceof Node&&l(t,n)&&e.preventDefault()}syncTrigger(){let e=this.area();if(!e)return;fo(e,`data-state`,this.open?`open`:`closed`),fo(e,`data-disabled`,this.disabled?``:null);let t=this.open&&this.isModal&&!this.disabled;t&&this.areaPointerEvents===null?(this.areaPointerEvents=e.style.pointerEvents,e.style.pointerEvents=`auto`):!t&&this.areaPointerEvents!==null&&(e.style.pointerEvents=this.areaPointerEvents,this.areaPointerEvents=null)}openAt(e){let t=this.area();if(t){if(!this.open){let e=ke(document);this.restoreTo=e instanceof HTMLElement&&l(t,e)?e:t}if(this.position=e,this.open){this.reanchor();return}this.openWith(`first`,`contextmenu`)}}openAtPoint(e,t){let n=this.area();if(!n)return;let r=te(n)===`rtl`;this.openAt({anchor:yo(e,t,n),placement:r?`left-start`:`right-start`,offset:_o})}inArea(e){let t=this.area(),n=e.composedPath()[0];return!!t&&n instanceof Node&&l(t,n)}clearLongPress(){clearTimeout(this.longPress),this.longPress=void 0}connectedCallback(){super.connectedCallback(),this.addEventListener(`contextmenu`,this.handleContextMenu),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`pointerdown`,this.handlePointerDown),this.addEventListener(`pointermove`,this.handleTouchEnd),this.addEventListener(`pointerup`,this.handleTouchEnd),this.addEventListener(`pointercancel`,this.handleTouchEnd)}disconnectedCallback(){super.disconnectedCallback(),this.clearLongPress(),this.removeEventListener(`contextmenu`,this.handleContextMenu),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`pointerdown`,this.handlePointerDown),this.removeEventListener(`pointermove`,this.handleTouchEnd),this.removeEventListener(`pointerup`,this.handleTouchEnd),this.removeEventListener(`pointercancel`,this.handleTouchEnd)}render(){return _`<slot></slot>${this.renderPanels()}`}}})))()}function So(e){return Eo.add(e),!Do&&typeof MutationObserver<`u`&&(Do=new MutationObserver(()=>{for(let e of[...Eo])e()}),Do.observe(document.documentElement,{attributes:!0,attributeFilter:[`data-theme`],subtree:!0})),()=>{Eo.delete(e),Eo.size===0&&(Do?.disconnect(),Do=null)}}var Co,wo,To,Eo,Do,$;function Oo(){return(Oo=e((()=>{O(),C(),rt(),I(),j(),N(),zn(),Wr(),cr(),Cn(),d(),h(),Ue(),Be(),Co=(e,t)=>Number.isFinite(e)&&e>0?e:t,wo=e=>e===`dark`||e===`github-dark`?`dark`:e===`light`?`light`:void 0,To=e=>typeof e?.editor?.create==`function`,Eo=new Set,Do=null,$=class e extends vn{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.language=`plaintext`,this.label=``,this.height=420,this.minHeight=160,this.maxHeight=800,this.loadTimeout=1e4,this.status=`loading`,this.scopeTheme=`light`,this.locale=new T(this),this.editor=null,this.engine=null,this.container=null,this.subscriptions=[],this.applying=!1,this.edited=!1,this.dirty=!1,this.unobserveTheme=null,this.started=!1}static{this.tagName=`minerva-code-editor`}static{this.dependencies=[U,hr]}static{this.styles=[D,p`
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
`,F(In)]}get resolvedTheme(){return this.theme===`dark`||this.theme===`light`?this.theme:this.scopeTheme}focus(e){this.editor?this.editor.focus():this.fallback?.focus(e)}retry(){this.load()}getFormValue(){return this.value}getValidity(){return this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.fallback??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}connectedCallback(){super.connectedCallback(),this.syncScopeTheme(),this.unobserveTheme=So(()=>this.syncScopeTheme()),this.started&&this.load()}disconnectedCallback(){super.disconnectedCallback(),this.unobserveTheme?.(),this.unobserveTheme=null,this.teardown()}syncScopeTheme(){let e=Wn(this,`[data-theme]`);this.scopeTheme=wo(e?.getAttribute(`data-theme`))??`light`}get monacoTheme(){return this.resolvedTheme===`dark`?`vs-dark`:`vs`}teardown(){clearTimeout(this.timer),this.timer=void 0;for(let e of this.subscriptions)e.dispose();this.subscriptions=[];try{this.editor?.dispose()}catch{}this.editor=null,this.engine=null,this.container?.remove(),this.container=null}fail(){let e=this.status===`error`;this.teardown(),this.status=`error`,e||this.emit(`minerva-error`)}load(){this.teardown(),this.status=`loading`,this.isConnected&&(this.timer=setTimeout(()=>this.fail(),this.loadTimeout),this.monaco!==void 0&&this.mount())}mount(){let t=this.monaco;if(!To(t)){A&&w(e.tagName,'`monaco` is not a Monaco engine (expected `import * as monaco from "monaco-editor"`); showing the textarea fallback.'),this.fail();return}let n=document.createElement(`div`);n.slot=`editor`,n.setAttribute(`data-minerva-code-editor`,``),this.append(n),this.container=n;try{t.editor.setTheme(this.monacoTheme);let e=t.editor.create(n,{value:this.value,language:this.language,theme:this.monacoTheme,readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label,automaticLayout:!0,minimap:{enabled:!1},wordWrap:`on`,scrollBeyondLastLine:!1});this.editor=e,this.engine=t,this.subscriptions.push(e.onDidChangeModelContent(()=>this.handleEdit()),e.onDidBlurEditorText(()=>this.commit()))}catch{this.fail();return}clearTimeout(this.timer),this.timer=void 0,this.status=`mounted`}handleEdit(){let e=this.editor;e&&!this.applying&&(this.isDisabled||(this.value=e.getValue(),this.dirty=!0,this.edited=!0,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-input`,{value:this.value})))}commit(){this.edited&&(this.edited=!1,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}handleFallbackInput(e){this.isDisabled||(this.value=e.target.value,this.dirty=!0,this.edited=!0,this.emit(`minerva-input`,{value:this.value}))}applyValue(){let e=this.editor;if(e&&e.getValue()!==this.value){this.applying=!0;try{let t=e.getModel();this.isDisabled||!t?e.setValue(this.value):(e.executeEdits(``,[{range:t.getFullModelRange(),text:this.value,forceMoveMarkers:!0}]),e.pushUndoStop())}finally{this.applying=!1}}}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){if(super.updated(t),!this.started){this.started=!0,A&&!this.label&&w(e.tagName,`set label: it is the visible label and the accessible name of the editor.`),this.load();return}if(t.has(`monaco`)&&t.get(`monaco`)!==void 0){this.load();return}t.has(`monaco`)&&this.monaco!==void 0&&!this.editor&&(this.status===`loading`&&this.timer!==void 0?this.mount():this.status===`error`&&this.load());let n=this.editor,r=this.engine;if(n&&r)try{t.has(`value`)&&this.applyValue(),t.has(`language`)&&r.editor.setModelLanguage(n.getModel(),this.language),(t.has(`disabled`)||t.has(`formDisabled`)||t.has(`label`))&&n.updateOptions({readOnly:this.isDisabled,domReadOnly:this.isDisabled,ariaLabel:this.label}),(t.has(`theme`)||t.has(`scopeTheme`))&&r.editor.setTheme(this.monacoTheme)}catch{this.fail()}}hookStates(){return{disabled:this.isDisabled,loading:this.status===`loading`}}render(){let e=Co(this.minHeight,160),t=Math.max(e,Co(this.maxHeight,800)),n=Math.min(t,Math.max(e,Co(this.height,420))),r=this.locale.t,i=this.status;return _`<div
part="root"
class="root"
role="group"
aria-label=${this.label||u}
>
<label
part="label"
class="label"
for=${i===`error`?`fallback`:u}
@click=${()=>this.editor?.focus()}
>${this.label}</label
>
<div
part="surface"
class="surface"
style=${g({height:`${n}px`})}
aria-busy=${i===`loading`?`true`:`false`}
>
${i===`error`?_`<div part="error" class="error">
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
                      >${xt}</span
                    >
                    ${this.retryText??r(`monacoCodeEditor.retry`)}
                  </minerva-button>
                </div>
                <textarea
                  id="fallback"
                  part="fallback"
                  class="fallback"
                  aria-label=${this.label||u}
                  spellcheck="false"
                  .value=${Ge(this.value)}
                  ?disabled=${this.isDisabled}
                  @input=${this.handleFallbackInput}
                  @change=${()=>this.commit()}
                ></textarea>`:_`${i===`loading`?_`<div part="loading" class="loading" role="status">
<minerva-progress
size="small"
aria-label=${this.loadingLabel??r(`monacoCodeEditor.loading`)}
></minerva-progress>
</div>`:u}<slot name="editor"></slot>`}
</div>
</div>`}},L([f({attribute:!1})],$.prototype,`monaco`,void 0),L([f({attribute:!1})],$.prototype,`value`,void 0),L([f({attribute:`value`})],$.prototype,`defaultValue`,void 0),L([f({reflect:!0})],$.prototype,`language`,void 0),L([f()],$.prototype,`label`,void 0),L([f({type:Number})],$.prototype,`height`,void 0),L([f({type:Number,attribute:`min-height`})],$.prototype,`minHeight`,void 0),L([f({type:Number,attribute:`max-height`})],$.prototype,`maxHeight`,void 0),L([f({reflect:!0})],$.prototype,`theme`,void 0),L([f({type:Number,attribute:`load-timeout`})],$.prototype,`loadTimeout`,void 0),L([f({attribute:`unavailable-text`})],$.prototype,`unavailableText`,void 0),L([f({attribute:`retry-text`})],$.prototype,`retryText`,void 0),L([f({attribute:`retry-label`})],$.prototype,`retryLabel`,void 0),L([f({attribute:`loading-label`})],$.prototype,`loadingLabel`,void 0),L([y()],$.prototype,`status`,void 0),L([y()],$.prototype,`scopeTheme`,void 0),L([b(`textarea`)],$.prototype,`fallback`,void 0)})))()}export{Ri as $,Z as A,Pr as At,na as B,yr as Bt,Aa as C,ti as Ct,Oa as D,Hr as Dt,Da as E,H as Et,ga as F,B as Ft,Yi as G,Y as H,ca as I,Er as It,qi as J,Gi as K,sa as L,z as Lt,X as M,Mr as Mt,ya as N,jr as Nt,Q as O,Rr as Ot,ha as P,Nr as Pt,zi as Q,oa as R,wr as Rt,Na as S,ri as St,ja as T,U as Tt,Qi as U,ra as V,Xi as W,Ui as X,J as Y,Wi as Z,qa as _,$r as _t,bo as a,wi as at,La as b,Zr as bt,mo as c,K as ct,za as d,_i as dt,Ii as et,Ha as f,pi as ft,Ba as g,ni as gt,Ua as h,di as ht,go as i,q as it,xa as j,Fr as jt,wa as k,Lr as kt,Qa as l,yi as lt,Za as m,W as mt,Oo as n,Li as nt,ho as o,Ci as ot,Ga as p,G as pt,Ki as q,xo as r,ki as rt,fo as s,Si as st,$ as t,Ti as tt,uo as u,gi as ut,Va as v,ii as vt,ka as w,Wr as wt,Pa as x,ai as xt,Wa as y,ei as yt,aa as z,R as zt};