import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{$n as t,$t as n,A as r,An as i,Bn as a,Ct as o,F as s,Fn as c,Gt as l,H as u,Ht as d,J as ee,M as te,Mn as ne,N as re,Nn as ie,O as ae,Pn as oe,Pt as f,Qn as se,Qt as ce,Rn as le,Rt as ue,S as de,St as fe,T as pe,U as me,Un as he,V as p,Vn as ge,Vt as _e,W as ve,Wt as ye,X as be,Y as xe,Yt as Se,Zn as Ce,_ as we,_n as Te,a as Ee,b as De,bn as Oe,c as ke,dn as Ae,dr as je,gn as Me,h as Ne,hn as Pe,hr as m,ht as Fe,in as Ie,ir as Le,jn as Re,kn as ze,mn as Be,mt as Ve,nn as He,nt as Ue,o as We,on as Ge,or as Ke,pr as qe,q as Je,qn as Ye,qt as Xe,r as Ze,rn as Qe,rr as $e,rt as et,sr as tt,u as nt,un as rt,vn as it,vt as at,wn as h,xt as ot,y as st,yn as ct,yt as lt,zn as ut,zt as dt}from"./angular-preview-BdNkX8l5.js";import{A as g,C as _,D as v,N as y,P as b,_ as ft,b as x,c as pt,g as mt,k as S,m as ht,s as gt,w as C,x as w,y as T,z as E}from"./minerva-web-components-DlAztivh.js";import{a as _t,c as vt,d as yt,f as bt,l as xt,o as St,s as Ct,u as wt}from"./angular-preview-Cqoe2qDv.js";import{a as Tt,r as Et}from"./angular-preview-CHdKY9M8.js";import{$ as Dt,$n as Ot,A as kt,Ar as At,At as jt,B as Mt,Br as Nt,C as Pt,Cn as Ft,D as It,Dn as Lt,Dr as D,Dt as Rt,E as zt,En as Bt,Er as Vt,F as Ht,Fn as O,Fr as k,Ft as Ut,G as Wt,Gn as Gt,Gr as Kt,H as qt,Hn as Jt,Hr as Yt,I as Xt,Ir as A,It as Zt,J as Qt,Jn as $t,Jr as j,K as en,Kr as tn,L as nn,Lr as rn,M as an,Mr as on,N as sn,Nr as cn,O as ln,On as un,Or as M,Ot as dn,P as fn,Pn as N,Q as pn,Qt as mn,R as hn,Rn as gn,Rr as _n,S as vn,Sr as P,T as yn,Tn as F,Tr as bn,U as xn,Ur as I,V as Sn,W as Cn,Wr as L,X as wn,Xn as Tn,Xt as En,Y as Dn,Yr as On,Yt as kn,Z as An,Zt as jn,_ as Mn,_r as Nn,ar as R,at as Pn,br as z,bt as Fn,ct as In,d as Ln,dr as Rn,dt as zn,et as Bn,f as Vn,fr as Hn,ft as Un,g as Wn,h as Gn,hr as Kn,ir as qn,j as Jn,jr as Yn,k as Xn,kn as Zn,kr as B,kt as Qn,ln as $n,lt as er,m as tr,mr as nr,mt as rr,nn as ir,nr as ar,nt as or,ot as sr,p as cr,pr as lr,pt as ur,q as dr,qn as fr,qr as pr,rr as mr,sr as hr,st as gr,tn as _r,tr as vr,tt as yr,un as br,ur as xr,ut as Sr,v as Cr,vr as wr,w as Tr,wn as Er,x as Dr,xr as V,yr as Or,yt as kr,z as Ar,zn as jr,zr as Mr}from"./minerva-web-components-B9q4ucXg.js";import{t as H}from"./minerva-web-components-D61_qRVd.js";import{Hn as Nr,Rn as Pr,Un as Fr,it as Ir,rt as Lr,zn as Rr}from"./minerva-web-components-fbbvGD7A.js";var zr;function Br(){return(Br=e((()=>{p(),zr=class{constructor(e,t){this.options=t,this.layer=null,e.addController(this)}activate(e){if(this.layer?.element===e){this.layer.update(this.options());return}this.deactivate(),this.layer=Ne(e,this.options())}deactivate(){this.layer?.destroy(),this.layer=null}get active(){return this.layer!==null}hostDisconnected(){this.deactivate()}}})))()}var Vr;function Hr(){return(Hr=e((()=>{p(),Vr=class{constructor(e,t){this.host=e,this.options=t,this.stop=null,this.placement=`bottom`,e.addController(this)}start(e,t){this.end(),t.style.position=`fixed`,t.style.left=`-9999px`,t.style.top=`-9999px`;let{arrowSize:n,onPosition:r,...i}=this.options();this.stop=ee(e,t,i,e=>{ve(t,e,{arrowSize:n});let{side:i,align:a}=s(e.placement);t.dataset.side=i,t.dataset.align=a,t.dataset.placement=e.placement,e.placement!==this.placement&&(this.placement=e.placement,this.host.requestUpdate()),r?.(e)})}end(){this.stop?.(),this.stop=null}get running(){return this.stop!==null}hostDisconnected(){this.end()}}})))()}var Ur;function Wr(){return(Wr=e((()=>{p(),Ur=class{constructor(e,t){this.options=t,this.scope=null,this.container=null,e.addController(this)}activate(e){this.scope&&this.container===e||(this.deactivate(),this.container=e,this.scope=re(e,this.options()),this.scope.activate())}deactivate(){let e=this.container,t=e?u(document):null;e&&t&&Ze(e,t)&&t.blur?.(),this.scope?.deactivate(),this.scope=null,this.container=null}get active(){return this.scope!==null}hostDisconnected(){this.deactivate()}}})))()}var Gr,Kr;function qr(){return(qr=e((()=>{Mr(),Br(),Hr(),Wr(),g(),p(),Gr=class{constructor(e,t){this.options=t,this.shown=null,e.addController(this),this.position=new Vr(e,()=>{let{anchor:e,floating:t,branches:n,onDismiss:r,...i}=this.options();return i}),this.layer=new zr(e,()=>{let e=this.options();return{branches:e.branches,onEscapeKeyDown:t=>{if(e.onEscapeKeyDown?.(t),t.defaultPrevented)return;let n=this.shown,r=u(document);n&&r&&Ze(n,r)&&e.returnFocusOnEscape?.()?.focus()},onPointerDownOutside:()=>e.dismissOnPointerDownOutside??!0,onFocusOutside:()=>e.dismissOnFocusOutside??!0,onDismiss:e.onDismiss}}),this.scope=new Ur(e,()=>({autoFocus:!1,restoreFocus:!1}))}sync(e){let t=this.options(),n=e?t.floating():null,r=e?t.anchor():null;if(!n||!r){this.close();return}this.shown!==n&&(this.close(),this.shown=n,_n(n),this.position.start(r,n),this.layer.activate(n),t.focusable&&this.scope.activate(n))}reposition(){let e=this.options(),t=this.shown,n=e.anchor();t&&n&&this.position.start(n,t)}get isOpen(){return this.shown!==null}close(){this.shown&&=(this.scope.deactivate(),this.layer.deactivate(),this.position.end(),rn(this.shown),null)}hostDisconnected(){this.close()}},Kr=E`
[popover]{
margin: 0;
inset: auto;
width: auto;
height: auto;
padding: 0;
border: 0;
color: inherit;
background: none;
overflow: visible;
text-align: start;
text-indent: 0;
text-transform: none;
white-space: normal;
letter-spacing: normal;
word-spacing: normal;
font-style: normal;
font-weight: var(--font-weight-regular,400);
line-height: var(--line-height-base,1.5);
visibility: visible;
cursor: auto;
}
`})))()}var Jr;function Yr(){return(Yr=e((()=>{p(),Jr=class{constructor(e){this.restoreScroll=null,this.restoreHidden=null,e.addController(this)}activate(e,t={}){this.restoreHidden||=((t.lockScroll??!0)&&(this.restoreScroll=st()),We(e))}deactivate(){this.restoreScroll?.(),this.restoreScroll=null,this.restoreHidden?.(),this.restoreHidden=null}get active(){return this.restoreHidden!==null}hostDisconnected(){this.deactivate()}}})))()}var Xr;function Zr(){return(Zr=e((()=>{Xr=class{constructor(e,t,n=()=>!0){this.host=e,this.send=e=>{this.machine.send(e)},this.machine=t,this.shouldUpdate=n,e.addController(this)}get state(){return this.machine.getState()}sync(e){this.machine.setProps(e)}hostConnected(){this.unsubscribe??=this.machine.subscribe((e,t)=>{this.shouldUpdate(e,t)&&this.host.requestUpdate()})}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}}})))()}var Qr,U;function $r(){return($r=e((()=>{I(),z(),R(),Mr(),k(),At(),B(),N(),En(),Zr(),g(),_(),x(),h(),gt(),Qr={fromAttribute:e=>(e??``).split(/[\s,]+/).map(e=>parseInt(e,10)).filter(e=>!isNaN(e)&&e>0),toAttribute:e=>e.join(`,`)},U=class e extends D{constructor(...e){super(...e),this.current=1,this.total=0,this.pageSize=10,this.disabled=!1,this.showQuickJumper=!1,this.showSizeChanger=!1,this.pageSizeOptions=[10,20,50,100],this.showTotal=!1,this.size=`medium`,this.shape=`rounded`,this.variant=`solid`,this.simple=!1,this.hideEdges=!1,this.hideNumbers=!1,this.responsive=!1,this.jumpValue=``,this.simpleDraft=null,this.ripples=[],this.aria=new L(this),this.locale=new A(this),this.nextRippleId=0,this.restoreFocus=null,this.pagination=new Xr(this,c(this.paginationProps()),()=>!1),this.handleKeyDown=e=>{let t=e.key;(t===`ArrowLeft`||t===`ArrowRight`)&&ae(this)===`rtl`&&(t=t===`ArrowLeft`?`ArrowRight`:`ArrowLeft`);let n=Be(t,this.current,this.totalPages);n!==null&&(e.preventDefault(),this.changePage(n,`active`))},this.handleJump=e=>{if(e.key!==`Enter`)return;e.preventDefault();let t=parseInt(this.jumpValue,10);!isNaN(t)&&t>=1&&t<=this.totalPages&&(this.changePage(t),this.jumpValue=``,e.target.value=``)},this.handleSizeChange=e=>{let t=e.target,n=parseInt(t.value,10);this.send({type:`SET_PAGE_SIZE`,pageSize:n}),this.pageSize!==n&&(t.value=String(this.pageSize))},this.commitSimpleDraft=()=>{let e=this.simpleDraft;if(e===null)return;this.simpleDraft=null;let t=parseInt(e,10);isNaN(t)||this.changePage(Math.min(Math.max(t,1),this.totalPages))}}static{this.tagName=`minerva-pagination`}static{this.styles=[M,E`
:host{
display: block;
}
`,O(kn)]}paginationProps(){return{page:this.current,pageSize:this.pageSize,total:this.total,disabled:this.disabled,onChange:(e,t)=>this.request(e,t)}}send(e){this.pagination.sync(this.paginationProps()),this.pagination.send(e)}get totalPages(){return ne(this.total,this.pageSize)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}request(e,t){let n={page:e,pageSize:t};return this.emit(`minerva-page-change`,n,{cancelable:!0})?(this.current=e,this.pageSize=t,!0):!1}changePage(e,t=`if-lost`){Ge(this.current,e,this.totalPages,this.disabled)&&(this.restoreFocus={mode:t,page:e},this.send({type:`GOTO`,page:e}))}willUpdate(t){P&&(t.has(`current`)||t.has(`total`))&&this.total>0&&this.current>this.totalPages&&V(e.tagName,`current (${this.current}) is greater than the number of pages (${this.totalPages}).`)}updated(){let e=this.restoreFocus;this.restoreFocus=null;let t=this.shadowRoot;if(!e||!t||e.page!==this.current)return;let n=t.activeElement,r=!n||n.disabled===!0;(e.mode===`active`||r)&&(t.querySelector(`[aria-current="page"]`)??t.querySelector(`button:not(:disabled), input`))?.focus()}handleItemClick(e,t,n){if(Ge(this.current,e,this.totalPages,this.disabled)){if(n.detail>0){let e=n.currentTarget.getBoundingClientRect();this.ripples=[...this.ripples,{x:n.clientX-e.left,y:n.clientY-e.top,id:this.nextRippleId++,itemKey:t}],clearTimeout(this.rippleTimer),this.rippleTimer=setTimeout(()=>this.ripples=[],1e3)}this.changePage(e)}}label(e,t){let n=this.labels,r=this.locale.t;switch(e){case`prev`:return n?.prev??r(`pagination.prev`);case`next`:return n?.next??r(`pagination.next`);case`jump-prev`:return n?.jumpPrev??r(`pagination.jumpPrev`);case`jump-next`:return n?.jumpNext??r(`pagination.jumpNext`);default:return n?.page?.(t)??r(`pagination.page`,{page:t})}}hookStates(){return{disabled:this.disabled,size:this.size,shape:this.shape,variant:this.variant}}renderItem(e){let{type:t,target:n,key:r}=e;if(t===`ellipsis`)return b`<span class="ellipsis" aria-hidden="true">…</span>`;let i=this.current,a=t===`page`&&n===i,o=this.disabled||(t===`prev`?i<=1:t===`next`&&i>=this.totalPages),s;switch(t){case`prev`:s=b`<slot name="prev-icon">${mr}</slot>`;break;case`next`:s=b`<slot name="next-icon">${ar}</slot>`;break;case`jump-prev`:case`jump-next`:s=b`<span class="jumpWrapper"
><slot
name=${t===`jump-prev`?`jump-prev-icon`:`jump-next-icon`}
>${lr}</slot
><span class="jumpHint" aria-hidden="true"
>${this.label(t,n)}</span
></span
>`;break;default:s=n}return this.itemRender&&(s=this.itemRender(n,t)),b`<button
type="button"
part=${Yn(`item`,{current:a,disabled:o})}
data-key=${r}
class=${w({item:!0,active:a,disabled:o,prev:t===`prev`,next:t===`next`,jump:t===`jump-prev`||t===`jump-next`})}
?disabled=${o}
aria-label=${this.label(t,n)}
aria-current=${a?`page`:y}
@keydown=${this.handleKeyDown}
@click=${e=>this.handleItemClick(n,r,e)}
>
${s}
${this.ripples.filter(e=>e.itemKey===r).map(e=>b`<span
class="ripple"
style="left:${e.x}px;top:${e.y}px"
aria-hidden="true"
></span>`)}
</button>`}items(){return he({page:this.current,totalPages:this.totalPages,siblingCount:this.siblingCount,boundaryCount:this.boundaryCount,hideEdges:this.hideEdges}).map(({key:e,kind:t,page:n})=>({key:e,type:t,target:n}))}renderPageList(){let e=this.current,t=t=>this.hideEdges?y:this.renderItem({key:t,type:t,target:t===`prev`?e-1:e+1});return this.simple?b`${t(`prev`)}
<div class="simpleInput">
<input
part="simple-input"
.value=${this.simpleDraft??String(e)}
?disabled=${this.disabled}
aria-label=${this.labels?.currentPage??this.locale.t(`pagination.currentPage`)}
inputmode="numeric"
@input=${e=>this.simpleDraft=e.target.value}
@keydown=${e=>{e.key===`Enter`&&(e.preventDefault(),this.commitSimpleDraft())}}
@blur=${this.commitSimpleDraft}
/>
<span class="simpleDivider" aria-hidden="true">/</span>
<span>${this.totalPages}</span>
</div>
${t(`next`)}`:this.hideNumbers?b`${t(`prev`)}
<span class="counter" aria-live="polite"
>${e} / ${this.totalPages}</span
>
${t(`next`)}`:pt(this.items(),e=>e.key,e=>this.renderItem(e))}render(){let e=this.locale.t,t=this.labels,n=this.total,r=this.pageSize,i=Ke(this.current,r,n),a=this.pageSizeOptions.includes(r)?this.pageSizeOptions:[...this.pageSizeOptions,r].sort((e,t)=>e-t),o=n=>t?.pageSizeOption?.(n)??e(`pagination.pageSizeOption`,{size:n});return b`<nav
part="root"
aria-label=${this.aria.label??t?.nav??e(`pagination.nav`)}
class=${w({pagination:!0,disabled:this.disabled,small:this.size===`small`,large:this.size===`large`,circle:this.shape===`circle`,square:this.shape===`square`,[this.variant]:!0,responsive:this.responsive})}
>
${this.showTotal?b`<div
part="total"
class="total"
aria-live="polite"
aria-atomic="true"
>
${this.totalRender?this.totalRender(n,i):t?.total?.(n)??e(`pagination.total`,{total:n})}
</div>`:y}
${this.renderPageList()}
${this.showQuickJumper?b`<label part="jumper" class="jumper">
${t?.jumpTo??e(`pagination.jumpTo`)}
<input
.value=${this.jumpValue}
?disabled=${this.disabled}
inputmode="numeric"
aria-label=${t?.jumpToInput??e(`pagination.jumpToInput`)}
@input=${e=>this.jumpValue=e.target.value}
@keydown=${this.handleJump}
/>
</label>`:y}
${this.showSizeChanger?b`<div class="sizeChanger">
<select
part="size-changer"
?disabled=${this.disabled}
aria-label=${t?.pageSize??e(`pagination.pageSize`)}
@change=${this.handleSizeChange}
>
${a.map(e=>b`<option
value=${e}
.selected=${e===r}
>
${o(e)}
</option>`)}
</select>
</div>`:y}
</nav>`}},H([S({type:Number,reflect:!0})],U.prototype,`current`,void 0),H([S({type:Number})],U.prototype,`total`,void 0),H([S({type:Number,reflect:!0,attribute:`page-size`})],U.prototype,`pageSize`,void 0),H([S({type:Boolean,reflect:!0})],U.prototype,`disabled`,void 0),H([S({type:Boolean,attribute:`show-quick-jumper`})],U.prototype,`showQuickJumper`,void 0),H([S({type:Boolean,attribute:`show-size-changer`})],U.prototype,`showSizeChanger`,void 0),H([S({attribute:`page-size-options`,converter:Qr})],U.prototype,`pageSizeOptions`,void 0),H([S({type:Boolean,attribute:`show-total`})],U.prototype,`showTotal`,void 0),H([S({attribute:!1})],U.prototype,`totalRender`,void 0),H([S({attribute:!1})],U.prototype,`itemRender`,void 0),H([S({reflect:!0})],U.prototype,`size`,void 0),H([S({reflect:!0})],U.prototype,`shape`,void 0),H([S({reflect:!0})],U.prototype,`variant`,void 0),H([S({type:Boolean,reflect:!0})],U.prototype,`simple`,void 0),H([S({type:Number,attribute:`sibling-count`})],U.prototype,`siblingCount`,void 0),H([S({type:Number,attribute:`boundary-count`})],U.prototype,`boundaryCount`,void 0),H([S({type:Boolean,attribute:`hide-edges`})],U.prototype,`hideEdges`,void 0),H([S({type:Boolean,attribute:`hide-numbers`})],U.prototype,`hideNumbers`,void 0),H([S({type:Boolean,reflect:!0})],U.prototype,`responsive`,void 0),H([S({attribute:!1})],U.prototype,`labels`,void 0),H([v()],U.prototype,`jumpValue`,void 0),H([v()],U.prototype,`simpleDraft`,void 0),H([v()],U.prototype,`ripples`,void 0)})))()}function ei(e,t,n,r){let i=t==null?{base:1}:typeof t==`number`?{base:t}:t,a={},o=1;for(let t of ti){let n=i[t]??o;(!Number.isInteger(n)||n<1||n>12)&&(P&&V(e,`columns must be integers from 1 to 12 (got ${String(n)} for "${t}"); using ${o}.`),n=o),a[`--grid-columns-${t}`]=String(n),o=n}return a[`--grid-row-gap`]=_e(n),a[`--grid-column-gap`]=_e(r),a}var ti,ni,ri,ii;function ai(){return(ai=e((()=>{z(),B(),N(),Nr(),Zt(),g(),_(),ft(),ti=[`base`,`sm`,`md`,`lg`],ni={fromAttribute(e){if(e===null)return;let t=e.trim();if(t.startsWith(`{`))try{return JSON.parse(t)}catch{return NaN}let n=t.split(/[\s,]+/).filter(Boolean).map(Number);if(n.length<=1)return n[0]??NaN;let[r,i,a,o]=n;return{base:r,sm:i,md:a,lg:o}},toAttribute(e){return e===void 0?null:typeof e==`number`?String(e):JSON.stringify(e)}},ri=class e extends D{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-responsive-grid`}static{this.styles=[M,E`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,O(Ut)]}render(){let t=ei(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return b`<div class="root" part="root" style=${T(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},H([S({converter:ni})],ri.prototype,`columns`,void 0),H([S({converter:Fr})],ri.prototype,`gap`,void 0),H([S({attribute:`row-gap`,converter:Fr})],ri.prototype,`rowGap`,void 0),H([S({attribute:`column-gap`,converter:Fr})],ri.prototype,`columnGap`,void 0),ii=class extends D{constructor(...e){super(...e),this.fullWidth=!1}static{this.tagName=`minerva-grid-item`}static{this.styles=[M,E`
:host{
display: block;
min-width: 0;
}
:host([full-width]){
grid-column: 1 / -1;
}
`]}render(){return b`<slot></slot>`}},H([S({type:Boolean,reflect:!0,attribute:`full-width`})],ii.prototype,`fullWidth`,void 0)})))()}var oi;function si(){return(si=e((()=>{I(),z(),k(),B(),N(),Bt(),dn(),g(),_(),x(),ht(),oi=class e extends F{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.locale=new A(this),this.aria=new L(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-textarea`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,E`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,O(Rt)]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}select(){this.textarea?.select()}getFormValue(){return this.value}getValidity(){let e=this.textarea;return e?{flags:Lt(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),P&&(t.has(`minLength`)||t.has(`maxLength`))&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&V(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let e=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return b`<textarea
      part="root"
      class=${w({textarea:!0,[this.variant]:!0,[this.size]:!0,invalid:e})}
      style="resize: none"
      .value=${mt(this.value)}
      name=${this.name||y}
      placeholder=${this.placeholder||y}
      rows=${this.rows??y}
      ?disabled=${this.isDisabled}
      ?readonly=${this.readOnly}
      ?required=${this.required}
      minlength=${this.minLength??y}
      maxlength=${this.maxLength??y}
      autocomplete=${this.autocomplete??y}
      wrap=${this.wrap??y}
      aria-label=${this.aria.label??y}
      aria-description=${this.aria.description??y}
      aria-invalid=${e?`true`:y}
      aria-required=${this.aria.attr(`aria-required`)??y}
      aria-readonly=${this.aria.attr(`aria-readonly`)??y}
      @input=${this.handleInput}
      @change=${this.handleChange}
    ></textarea>`}},H([S({attribute:!1})],oi.prototype,`value`,void 0),H([S({attribute:`value`})],oi.prototype,`defaultValue`,void 0),H([S({reflect:!0})],oi.prototype,`variant`,void 0),H([S({reflect:!0})],oi.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],oi.prototype,`invalid`,void 0),H([S()],oi.prototype,`placeholder`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],oi.prototype,`readOnly`,void 0),H([S({type:Number})],oi.prototype,`rows`,void 0),H([S({type:Number,attribute:`minlength`})],oi.prototype,`minLength`,void 0),H([S({type:Number,attribute:`maxlength`})],oi.prototype,`maxLength`,void 0),H([S()],oi.prototype,`autocomplete`,void 0),H([S()],oi.prototype,`wrap`,void 0),H([C(`textarea`)],oi.prototype,`textarea`,void 0)})))()}var ci,li;function ui(){return(ui=e((()=>{I(),z(),R(),k(),B(),Vt(),N(),Fn(),g(),_(),x(),ft(),ci=(e,t)=>`${Math.round(e/t*100)}%`,li=class e extends D{constructor(...e){super(...e),this.variant=`spinner`,this.size=`medium`,this.color=`primary`,this.max=100,this.showValue=!1,this.label=``,this.decorative=!1,this.full=!1,this.locale=new A(this),this.aria=new L(this),this.slots=new bn(this)}static{this.tagName=`minerva-progress`}static{this.styles=[M,E`
:host{
display: inline-flex;
vertical-align: middle;
max-width: 100%;
}
:host([full]){
display: flex;
width: 100%;
}

.spinner,
.circle,
.wave{
display: inline-flex;
}
.spinner svg,
.circle svg,
.wave svg,
svg.ring{
display: block;
}
`,O(kr)]}hookStates(){return{variant:this.variant===`dottedBar`?`dotted-bar`:this.variant,size:this.size,color:this.color}}updated(){P&&this.full&&this.width&&V(e.tagName,`width is ignored when full is set.`)}determinate(){let{value:e,variant:t}=this;if(typeof e!=`number`||t!==`bar`&&t!==`circle`)return null;let n=Number.isFinite(this.max)&&this.max>0?this.max:100;return{value:Math.min(Math.max(Number.isNaN(e)?0:e,0),n),max:n}}renderIndicator(e){let t=this.size,n=e?e.value/e.max*100:0;switch(this.variant){case`bar`:return b`<div part="indicator" class="barContainer ${t}">
<div
class=${e?`bar determinate`:`bar`}
style=${T({width:e?`${n}%`:void 0})}
></div>
</div>`;case`dottedBar`:return b`<div part="indicator" class="dottedBarContainer ${t}">
<div class="dottedBar"></div>
</div>`;case`wave`:return b`<div part="indicator" class="waveContainer ${t}">
<span class="wave" aria-hidden="true">${Or}</span>
</div>`;case`circle`:return e?b`<svg
part="indicator"
class="ring ${t}"
viewBox="0 0 24 24"
width="1em"
height="1em"
aria-hidden="true"
focusable="false"
>
<circle class="ringTrack" cx="12" cy="12" r="10"></circle>
<circle
class="ringArc"
cx="12"
cy="12"
r="10"
pathLength="100"
stroke-dasharray="${n} 100"
></circle>
</svg>`:b`<span
part="indicator"
class="circle ${t}"
aria-hidden="true"
>${fr}</span
>`;case`spinner`:return b`<span
part="indicator"
class="spinner ${t}"
aria-hidden="true"
>${Jt}</span
>`;default:return y}}render(){let e=this.variant===`bar`||this.variant===`dottedBar`,t=!!this.label||this.slots.test(`label`),n=this.aria.label,r=this.determinate(),i=r?(this.format??ci)(r.value,r.max):``;return b`<div
part="root"
class=${w({progressIndicator:!0,[this.color]:!0,fullWidth:this.full,defaultWidth:!this.full&&!this.width&&e})}
style=${T({width:this.width&&!this.full?this.width:void 0})}
role=${this.decorative?y:`progressbar`}
aria-hidden=${this.decorative?`true`:y}
aria-label=${this.decorative?y:n??(t?y:this.locale.t(r?`progress.label`:`common.loading`))}
aria-valuemin=${!this.decorative&&r?0:y}
aria-valuemax=${!this.decorative&&r?r.max:y}
aria-valuenow=${!this.decorative&&r?r.value:y}
aria-valuetext=${!this.decorative&&r&&this.format?String(i):y}
aria-labelledby=${!this.decorative&&!n&&t?`label`:y}
>
${this.slots.test(`icon`)?b`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:y}
${this.renderIndicator(r)}
${r&&this.showValue?b`<span part="value" class="value" aria-hidden="true"
>${i}</span
>`:y}
${t?b`<span id="label" part="label" class="label"
><slot name="label">${this.label}</slot></span
>`:y}
</div>`}},H([S({reflect:!0})],li.prototype,`variant`,void 0),H([S({reflect:!0})],li.prototype,`size`,void 0),H([S({reflect:!0})],li.prototype,`color`,void 0),H([S({type:Number})],li.prototype,`value`,void 0),H([S({type:Number})],li.prototype,`max`,void 0),H([S({type:Boolean,attribute:`show-value`})],li.prototype,`showValue`,void 0),H([S({attribute:!1})],li.prototype,`format`,void 0),H([S()],li.prototype,`label`,void 0),H([S({type:Boolean,reflect:!0})],li.prototype,`decorative`,void 0),H([S()],li.prototype,`width`,void 0),H([S({type:Boolean,reflect:!0})],li.prototype,`full`,void 0)})))()}var di;function fi(){return(fi=e((()=>{I(),R(),Mr(),k(),B(),Vt(),N(),Br(),Wr(),qr(),Yr(),ir(),jn(),g(),_(),x(),di=class extends D{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.locale=new A(this),this.aria=new L(this),this.slots=new bn(this),this.presence=new mn(this,()=>this.panel),this.modal=new Jr(this),this.focusScope=new Ur(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new zr(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.triggerElement()],onFocusOutside:e=>e.preventDefault(),onEscapeKeyDown:()=>this.lastReason(`escape`),onPointerDownOutside:()=>this.lastReason(`outside`),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{let t=this.triggerElement();!e.defaultPrevented&&t&&e.composedPath().includes(t)&&this.requestOpenChange(!this.open,`trigger`)}}static{this.tagName=`minerva-modal`}static{this.styles=[M,Kr,E`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,O(_r)]}lastReason(e){this.reason=e}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(_n(this.overlay),_n(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),rn(this.panel),rn(this.overlay)}afterClose(){rn(this.panel),rn(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description;return b`<slot name="trigger"></slot> ${e?b`<div
part="overlay"
class="overlay"
popover="manual"
data-state=${t}
aria-hidden="true"
></div>
<div
part="content"
class=${w({content:!0,[this.size]:!0})}
popover="manual"
role=${this.dialogRole}
aria-modal="true"
aria-labelledby=${n?`title`:y}
aria-label=${n?y:this.aria.label??y}
aria-describedby=${r?`description`:y}
tabindex="-1"
data-state=${t}
>
${r?b`<p
id="description"
class="description"
part="description"
>
${r}
</p>`:y}
${n?b`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:y}
<div class="body" part="body"><slot></slot></div>
${this.slots.test(`footer`)?b`<div class="footer" part="footer">
<slot name="footer"></slot>
</div>`:y}
${this.hideCloseButton?y:b`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`modal.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${Hn}
</button>`}
</div>`:y}`}},H([S({type:Boolean,reflect:!0})],di.prototype,`open`,void 0),H([S()],di.prototype,`label`,void 0),H([S()],di.prototype,`description`,void 0),H([S({reflect:!0})],di.prototype,`size`,void 0),H([S({type:Boolean,attribute:`hide-close-button`})],di.prototype,`hideCloseButton`,void 0),H([S({attribute:`close-label`})],di.prototype,`closeLabel`,void 0),H([S({attribute:`dialog-role`})],di.prototype,`dialogRole`,void 0),H([C(`.content`)],di.prototype,`panel`,void 0),H([C(`.overlay`)],di.prototype,`overlay`,void 0)})))()}var pi,mi,hi,W;function gi(){return(gi=e((()=>{I(),z(),R(),k(),At(),B(),N(),rr(),g(),_(),x(),p(),h(),pi=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],mi=/^\d{4}-\d{2}-\d{2}$/,hi={fromAttribute(e){let t=e?.trim().match(/^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/);return t?o(Number(t[1]),Number(t[2])-1,1):void 0},toAttribute(e){return e instanceof Date&&!Number.isNaN(e.getTime())?f(e).slice(0,7):null}},W=class e extends D{constructor(...e){super(...e),this.events=[],this.clickableEvents=!1,this.size=`medium`,this.disabled=!1,this.hideEvents=!1,this.focusedKey=``,this.pendingFocus=null,this.i18n=new A(this),this.aria=new L(this)}static{this.tagName=`minerva-month-calendar`}static{this.styles=[M,E`
:host{
display: block;


inline-size: 100%;
}
.navButton svg{
flex-shrink: 0;
}
`,O(ur)]}get displayed(){let e=this.month;return e instanceof Date&&!Number.isNaN(e.getTime())?et(e):et(new Date)}focus(e){this.renderRoot.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus(e)}goToMonth(e){let t=et(e);f(t)!==f(this.displayed)&&(this.month=t,this.emit(`minerva-month-change`,{month:t}))}select(e){if(this.disabled)return;let t=f(e);t!==this.value&&(this.value=t,this.emit(`minerva-change`,{value:t})),dt(e,this.displayed)||this.goToMonth(e)}handleKeyDown(e,t){if(this.disabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=we(e.key,this),r=(t.getDay()+6)%7,i;switch(n){case`ArrowLeft`:i=m(t,-1);break;case`ArrowRight`:i=m(t,1);break;case`ArrowUp`:i=m(t,-7);break;case`ArrowDown`:i=m(t,7);break;case`Home`:i=m(t,-r);break;case`End`:i=m(t,6-r);break;case`PageUp`:case`PageDown`:{let n=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),r=et(t,n),a=m(et(r,1),-1).getDate();i=o(r.getFullYear(),r.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault(),this.pendingFocus=f(i),this.focusedKey=f(i),dt(i,this.displayed)||this.goToMonth(i)}willUpdate(t){P&&t.has(`value`)&&this.value&&!mi.test(this.value)&&V(e.tagName,`value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`)}updated(){if(this.disabled||!this.pendingFocus)return;let e=this.renderRoot.querySelector(`[data-date="${this.pendingFocus}"]`);e&&(this.pendingFocus=null,e.focus())}hookStates(){return{disabled:this.disabled,size:this.size}}render(){let e=this.i18n.t,t=this.displayed,n=m(t,-((t.getDay()+6)%7)),r=Array.from({length:42},(e,t)=>m(n,t)),i=r.map(f),a=new Date,o=f(a),s=this.value||void 0,c=[this.focusedKey,s,dt(a,t)?o:``,f(t)].find(e=>e&&i.includes(e)),l=this.events??[],u=new Map;for(let e of l)u.set(e.date,(u.get(e.date)??0)+1);let d=l.filter(e=>e.date===s),ee;try{ee=new Intl.DateTimeFormat(this.locale??this.i18n.language,{year:`numeric`,month:`long`}).format(t)}catch{ee=f(t).slice(0,7)}let te=this.disabled,{rangeStart:ne,rangeEnd:re}=this,ie=ne&&re&&mi.test(ne)&&mi.test(re)?[ne,re].sort():void 0,ae=[`small`,`medium`,`large`].includes(this.size)?this.size:`medium`;return b`<section
part="root"
class="monthCalendar ${ae}"
aria-label=${this.aria.label??e(`monthCalendar.label`)}
>
<div class="toolbar">
<h2 id="heading" part="heading" class="heading" aria-live="polite">
${ee}
</h2>
<div class="navigation">
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.previousMonthLabel??e(`monthCalendar.previousMonth`)}
?disabled=${te}
@click=${()=>this.goToMonth(et(t,-1))}
>
${mr}
</button>
<button
type="button"
part="nav-button"
class="navButton"
?disabled=${te}
@click=${()=>this.goToMonth(new Date)}
>
${Gt} ${this.todayLabel??e(`monthCalendar.today`)}
</button>
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.nextMonthLabel??e(`monthCalendar.nextMonth`)}
?disabled=${te}
@click=${()=>this.goToMonth(et(t,1))}
>
${ar}
</button>
</div>
</div>
<div
part="grid"
role="grid"
aria-labelledby="heading"
aria-disabled=${te?`true`:y}
class="grid"
>
<div role="row" class="week">
${pi.map((t,n)=>b`<div role="columnheader" class="weekday">
${this.weekdayLabels?.[n]??e(`monthCalendar.weekdays.${t}`)}
</div>`)}
</div>
${Array.from({length:6},(n,i)=>b`<div role="row" class="week">
${r.slice(i*7,i*7+7).map(n=>{let r=f(n),i=u.get(r)??0,a=this.getDayLabel?this.getDayLabel(r,i):i?e(`monthCalendar.dayWithEvents`,{date:r,count:i}):r,l=!!ie&&r>=ie[0]&&r<=ie[1],d={selected:s===r,today:r===o,outside:!dt(n,t),disabled:te};return b`<div
role="gridcell"
part=${Yn(`day`,d)}
class=${w({day:!0,inRange:l,rangeStart:l&&r===ie?.[0],rangeEnd:l&&r===ie?.[1]})}
data-date=${r}
?data-outside=${d.outside}
aria-label=${a}
aria-selected=${String(d.selected)}
aria-current=${d.today?`date`:y}
aria-disabled=${te?`true`:y}
tabindex=${!te&&r===c?`0`:`-1`}
@focus=${()=>this.focusedKey=r}
@click=${()=>this.select(n)}
@keydown=${e=>this.handleKeyDown(e,n)}
>
<span class="dayNumber">${n.getDate()}</span>
<span
class=${i?`count hasEvents`:`count`}
aria-hidden="true"
>${i?i>99?`99+`:i:` `}</span
>
</div>`})}
</div>`)}
</div>
${!this.hideEvents&&s?b`<section
part="events"
class="events"
aria-label=${this.getEventsLabel?this.getEventsLabel(s):e(`monthCalendar.eventsLabel`,{date:s})}
>
<h3 class="eventsHeading">${s}</h3>
${d.length?b`<ul class="eventList">
${d.map(e=>b`<li class="eventItem">
${this.clickableEvents?b`<button
type="button"
part="event"
class="eventButton"
?disabled=${te}
@click=${()=>this.emit(`minerva-event-click`,{event:e})}
>
${e.title}
</button>`:b`<span part="event">${e.title}</span>`}
</li>`)}
</ul>`:b`<p class="empty" part="empty">
${this.emptyEventsText??e(`monthCalendar.noEvents`)}
</p>`}
</section>`:y}
</section>`}},H([S({converter:hi,reflect:!0})],W.prototype,`month`,void 0),H([S({reflect:!0})],W.prototype,`value`,void 0),H([S({attribute:!1})],W.prototype,`events`,void 0),H([S({type:Boolean,attribute:`clickable-events`})],W.prototype,`clickableEvents`,void 0),H([S({attribute:`range-start`,reflect:!0})],W.prototype,`rangeStart`,void 0),H([S({attribute:`range-end`,reflect:!0})],W.prototype,`rangeEnd`,void 0),H([S({reflect:!0})],W.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],W.prototype,`disabled`,void 0),H([S({type:Boolean,attribute:`hide-events`})],W.prototype,`hideEvents`,void 0),H([S({attribute:`previous-month-label`})],W.prototype,`previousMonthLabel`,void 0),H([S({attribute:`next-month-label`})],W.prototype,`nextMonthLabel`,void 0),H([S({attribute:`today-label`})],W.prototype,`todayLabel`,void 0),H([S({attribute:`empty-events-text`})],W.prototype,`emptyEventsText`,void 0),H([S()],W.prototype,`locale`,void 0),H([S({attribute:!1})],W.prototype,`weekdayLabels`,void 0),H([S({attribute:!1})],W.prototype,`getDayLabel`,void 0),H([S({attribute:!1})],W.prototype,`getEventsLabel`,void 0),H([v()],W.prototype,`focusedKey`,void 0)})))()}var _i;function vi(){return(vi=e((()=>{h(),_i=class{constructor(e,t={}){this.typeahead=ce(t),e.addController(this)}search(e,t,n){return this.typeahead.search(e,t,n)}reset(){this.typeahead.reset()}hostDisconnected(){this.typeahead.reset()}}})))()}function yi(e,t,n){for(let r of e){if(r.id===t)return!0;if(r.children&&yi(r.children,t,n))return n.add(r.id),!0}return!1}var bi,xi,Si;function Ci(){return(Ci=e((()=>{I(),z(),R(),Mr(),k(),At(),B(),N(),$n(),Un(),vi(),g(),_(),x(),gt(),bi=`.item`,xi=`.children`,Si=class e extends D{constructor(...e){super(...e),this.sections=[],this.collapsed=!1,this.wrapLabels=!1,this.expandedIds=[],this.explicitlyCollapsed=new Set,this.aria=new L(this),this.locale=new A(this),this.typeahead=new _i(this),this.handleNavKeyDown=e=>{if(e.defaultPrevented)return;let t=e.composedPath()[0]?.closest?.(bi);if(!t||!this.shadowRoot?.contains(t))return;let n=this.focusableItems(),r=n.indexOf(t),i;switch(this.logicalKey(e.key)){case`ArrowDown`:i=n[r+1];break;case`ArrowUp`:i=r>0?n[r-1]:void 0;break;case`Home`:i=n[0];break;case`End`:i=n[n.length-1];break;case`ArrowLeft`:if(t.getAttribute(`aria-expanded`)===`true`)return;i=t.closest(xi)?.parentElement?.querySelector(`:scope > ${bi}`);break;default:{if(e.altKey||e.ctrlKey||e.metaKey)return;let t=this.typeahead.search(e.key,n.map(e=>({text:e.querySelector(`.label`)?.textContent??``})),r);if(t===-1)return;i=n[t]}}i&&(e.preventDefault(),i.focus())}}static{this.tagName=`minerva-nav-tree`}static{this.styles=[M,E`
:host{
display: block;
}
`,O(zn)]}activeAncestors(){let e=new Set;for(let t of this.sections)yi(t.items,this.activeId,e);return e}isExpanded(e,t){return this.expandedIds.includes(e)||!this.explicitlyCollapsed.has(e)&&t.has(e)}willUpdate(t){if(P&&t.has(`sections`)){let t=new Set,n=r=>{for(let i of r)t.has(i.id)&&V(e.tagName,`duplicate item id "${i.id}": ids must be unique.`),t.add(i.id),i.children&&n(i.children)};for(let e of this.sections??[])n(e.items??[])}}setItemExpanded(e,t){let n=new Set(this.expandedIds);t?n.add(e.id):n.delete(e.id);let r=Array.from(n),i={expandedIds:r,item:e,expanded:t};if(!this.emit(`minerva-expanded-change`,i,{cancelable:!0}))return;let a=new Set(this.explicitlyCollapsed);t?a.delete(e.id):a.add(e.id),this.explicitlyCollapsed=a,this.expandedIds=r}select(e,t){let n={value:e.id,item:e};this.emit(`minerva-select`,n,{cancelable:!0})||t?.preventDefault()}toggleItem(e){this.setItemExpanded(e,!this.isExpanded(e.id,this.activeAncestors())),this.select(e)}focusableItems(){return Array.from(this.shadowRoot?.querySelectorAll(bi)??[]).filter(e=>!e.disabled&&e.getAttribute(`aria-disabled`)!==`true`)}logicalKey(e){return e!==`ArrowLeft`&&e!==`ArrowRight`||ae(this)!==`rtl`?e:e===`ArrowLeft`?`ArrowRight`:`ArrowLeft`}renderSectionTitle(e){return b`<h2 part="group-label" class="sectionTitle">${e}</h2>`}renderContent(e,t){return b`<span part="icon" class="icon" aria-hidden="true"
>${e.icon??y}</span
><span class="copy"
><span part="label" class="label">${e.label}</span>${e.description?b`<small part="description" class="description"
>${e.description}</small
>`:y}</span
>${!this.collapsed&&(e.endContent||t)?b`<span class="trailing"
>${e.endContent?b`<span class="end">${e.endContent}</span>`:y}${t?b`<span class="chevron" aria-hidden="true"
>${vr}</span
>`:y}</span
>`:y}`}renderItem(t,n,r){let i=!!t.children?.length,a=t.id===this.activeId,o=r.has(t.id),s=i&&this.isExpanded(t.id,r),c=!!t.disabled,l={item:!0,nested:n>0,active:a,disabled:c},u=Object.entries(l).filter(([,e])=>e).map(([e])=>e).join(` `),d=t.description?`${t.label} / ${t.description}`:t.label,ee=this.renderContent(t,i);if(i)return b`<div class="branch">
<button
part=${Yn(`item`,{current:a,expanded:s,disabled:c})}
class=${w(l)}
type="button"
title=${d}
aria-expanded=${s?`true`:`false`}
data-id=${t.id}
?data-current=${a}
data-ancestor-active=${o?`true`:y}
?data-expanded=${s}
?disabled=${c}
@click=${()=>this.toggleItem(t)}
@keydown=${e=>{if(this.collapsed)return;let n=this.logicalKey(e.key);n===`ArrowRight`?(e.preventDefault(),s?e.currentTarget.parentElement?.querySelector(`${xi} ${bi}`)?.focus():this.setItemExpanded(t,!0)):n===`ArrowLeft`&&s&&(e.preventDefault(),this.setItemExpanded(t,!1))}}
>
${ee}
</button>
${s&&!this.collapsed?b`<div class="children">
${pt(t.children??[],e=>e.id,e=>this.renderItem(e,n+1,r))}
</div>`:y}
</div>`;if(this.renderLink)return this.renderLink(t,ee,{active:a,ancestorActive:o,expanded:!1,depth:n,collapsed:this.collapsed,hasChildren:i,disabled:c,className:u});let te=Yn(`item`,{current:a,disabled:c});return c?b`<span
part=${te}
class=${w(l)}
title=${d}
data-id=${t.id}
?data-current=${a}
role="link"
aria-disabled="true"
>${ee}</span
>`:t.href===void 0?b`<button
part=${te}
class=${w(l)}
type="button"
title=${d}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:y}
@click=${()=>this.select(t)}
>
${ee}
</button>`:b`<a
part=${te}
class=${w(l)}
href=${br(e.tagName,t.href)??y}
title=${d}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:y}
@click=${e=>this.select(t,e)}
>${ee}</a
>`}render(){let e=this.activeAncestors(),t=this.getAttribute(`aria-labelledby`);return b`<nav
part="root"
class=${w({navTree:!0,collapsed:this.collapsed,wrapLabels:this.wrapLabels&&!this.collapsed})}
aria-label=${this.aria.label??(t?y:this.locale.t(`navTree.label`))}
@keydown=${this.handleNavKeyDown}
>
${pt(this.sections??[],e=>e.id,t=>b`<section part="group" class="section">
${t.title?this.renderSectionTitle(t.title):y}
<div class="list">
${pt(t.items,e=>e.id,t=>this.renderItem(t,0,e))}
</div>
</section>`)}
</nav>`}},H([S({attribute:!1})],Si.prototype,`sections`,void 0),H([S({attribute:`active-id`,reflect:!0})],Si.prototype,`activeId`,void 0),H([S({type:Boolean,reflect:!0})],Si.prototype,`collapsed`,void 0),H([S({type:Boolean,reflect:!0,attribute:`wrap-labels`})],Si.prototype,`wrapLabels`,void 0),H([S({attribute:!1})],Si.prototype,`expandedIds`,void 0),H([S({attribute:!1})],Si.prototype,`renderLink`,void 0),H([v()],Si.prototype,`explicitlyCollapsed`,void 0)})))()}var wi,G;function Ti(){return(Ti=e((()=>{I(),z(),R(),k(),B(),N(),Bt(),Sr(),g(),_(),x(),h(),ht(),wi={fromAttribute:e=>e===null||e.trim()===``||Number.isNaN(Number(e))?null:Number(e),toAttribute:e=>e===null?null:String(e)},G=class e extends F{constructor(...e){super(...e),this.value=null,this.defaultValue=null,this.step=1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.showStepper=!1,this.noEmpty=!1,this.placeholder=``,this.draft=``,this.locale=new A(this),this.aria=new L(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-number-input`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,E`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,O(er)]}get resolvedPrecision(){return this.precision??fe(this.step)}get locked(){return this.isDisabled||this.readOnly}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}stepUp(){this.value=this.stepped(this.step)}stepDown(){this.value=this.stepped(-this.step)}getFormValue(){return lt(this.value,this.resolvedPrecision)}getValidity(){let{t:e}=this.locale,t=this.input,n=this.draft.trim();if(n&&n!==`-`&&n!==`.`){let r=d(n);return r===null?{flags:{badInput:!0},message:this.notANumberMessage??e(`numberInput.notANumber`),anchor:t}:this.min!==void 0&&r<this.min?{flags:{rangeUnderflow:!0},message:this.belowMinMessage??e(`validation.rangeUnderflow`,{min:this.min}),anchor:t}:this.max!==void 0&&r>this.max?{flags:{rangeOverflow:!0},message:this.aboveMaxMessage??e(`validation.rangeOverflow`,{max:this.max}),anchor:t}:{flags:{},message:``}}return this.required&&this.value===null?{flags:{valueMissing:!0},message:e(`validation.valueMissing`),anchor:t}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.draft=lt(this.value,this.resolvedPrecision)}restoreFormState(e){typeof e==`string`&&(this.value=d(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)||t.has(`precision`)||t.has(`step`)){let e=d(this.draft);(e===null||e!==this.value)&&(this.draft=lt(this.value,this.resolvedPrecision))}P&&(t.has(`min`)||t.has(`max`))&&this.min!==void 0&&this.max!==void 0&&this.min>this.max&&V(e.tagName,`min (${this.min}) is greater than max (${this.max}): every value is clamped.`)}stepped(e){let t=d(this.draft)??this.value??0;return Number(Ye(t+e,this.min,this.max).toFixed(this.resolvedPrecision))}commitValue(e){let t=this.resolvedPrecision,n=e===null?null:Number(e.toFixed(t));this.draft=lt(n,t),n!==this.value&&(this.dirty=!0,this.value=n,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:n}))}commit(e){if(this.locked)return;let t=e.trim();if(t===``||t===`-`){this.noEmpty?this.commitValue(Ye(this.min??0,this.min,this.max)):this.commitValue(null);return}let n=d(t);if(n===null){this.draft=lt(this.value,this.resolvedPrecision);return}this.commitValue(Ye(n,this.min,this.max))}adjust(e){this.locked||this.commitValue(this.stepped(e))}handleInput(){this.draft=String(this.input.value),this.emit(`minerva-input`,{value:d(this.draft)})}handleKeyDown(e){if(this.locked||e.defaultPrevented)return;let{key:t}=e;t===`ArrowUp`||t===`ArrowDown`?(e.preventDefault(),this.adjust(t===`ArrowUp`?this.step:-this.step)):t===`PageUp`||t===`PageDown`?(e.preventDefault(),this.adjust((t===`PageUp`?10:-10)*this.step)):t===`Home`&&this.min!==void 0?(e.preventDefault(),this.commitValue(this.min)):t===`End`&&this.max!==void 0?(e.preventDefault(),this.commitValue(this.max)):t===`Enter`&&this.input.blur()}handleBlur(){this.commit(String(this.input.value))}draftError(){let{t:e}=this.locale,t=this.draft.trim();if(!t||t===`-`||t===`.`)return;let n=d(t);if(n===null)return this.notANumberMessage??e(`numberInput.notANumber`);if(this.min!==void 0&&n<this.min)return this.belowMinMessage??e(`numberInput.belowMin`,{min:this.min});if(this.max!==void 0&&n>this.max)return this.aboveMaxMessage??e(`numberInput.aboveMax`,{max:this.max})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.draftError()!==void 0||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.locked,r=this.draftError(),i=r!==void 0,a=this.invalid||i||this.aria.attr(`aria-invalid`)===`true`,o=this.value??0;return b`<div
part="root"
class=${w({root:!0,[this.size]:!0,invalid:a,shake:i,disabled:t})}
title=${r??y}
>
<input
part="input"
class="field"
type="text"
inputmode="decimal"
role="spinbutton"
.value=${mt(this.draft)}
placeholder=${this.placeholder||y}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
aria-valuemin=${this.min??y}
aria-valuemax=${this.max??y}
aria-valuenow=${this.value??y}
aria-label=${this.aria.label??y}
aria-description=${this.aria.description??y}
aria-invalid=${a?`true`:y}
aria-required=${this.aria.attr(`aria-required`)??y}
@input=${this.handleInput}
@blur=${this.handleBlur}
@keydown=${this.handleKeyDown}
/>
${this.showStepper?b`<div class="stepper" part="stepper" aria-hidden="true">
<button
part="increment"
type="button"
class="step stepUp"
tabindex="-1"
?disabled=${n||this.max!==void 0&&o>=this.max}
aria-label=${this.incrementLabel??e(`numberInput.increment`)}
@click=${()=>this.adjust(this.step)}
>
${Rn}
</button>
<button
part="decrement"
type="button"
class="step stepDown"
tabindex="-1"
?disabled=${n||this.min!==void 0&&o<=this.min}
aria-label=${this.decrementLabel??e(`numberInput.decrement`)}
@click=${()=>this.adjust(-this.step)}
>
${vr}
</button>
</div>`:y}
</div>`}},H([S({attribute:!1})],G.prototype,`value`,void 0),H([S({attribute:`value`,converter:wi})],G.prototype,`defaultValue`,void 0),H([S({type:Number})],G.prototype,`min`,void 0),H([S({type:Number})],G.prototype,`max`,void 0),H([S({type:Number})],G.prototype,`step`,void 0),H([S({type:Number})],G.prototype,`precision`,void 0),H([S({reflect:!0})],G.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],G.prototype,`invalid`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],G.prototype,`readOnly`,void 0),H([S({type:Boolean,attribute:`show-stepper`})],G.prototype,`showStepper`,void 0),H([S({type:Boolean,attribute:`no-empty`})],G.prototype,`noEmpty`,void 0),H([S()],G.prototype,`placeholder`,void 0),H([S({attribute:`increment-label`})],G.prototype,`incrementLabel`,void 0),H([S({attribute:`decrement-label`})],G.prototype,`decrementLabel`,void 0),H([S({attribute:`not-a-number-message`})],G.prototype,`notANumberMessage`,void 0),H([S({attribute:`below-min-message`})],G.prototype,`belowMinMessage`,void 0),H([S({attribute:`above-max-message`})],G.prototype,`aboveMaxMessage`,void 0),H([v()],G.prototype,`draft`,void 0),H([C(`input`)],G.prototype,`input`,void 0)})))()}var Ei,Di,Oi,ki,Ai;function ji(){return(ji=e((()=>{I(),z(),B(),Vt(),N(),Nr(),In(),g(),_(),x(),ft(),Ei=class extends D{static{this.tagName=`minerva-page`}static{this.styles=[M,O(gr),E`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.maxWidth===void 0||this.maxWidth===``?void 0:ye(this.maxWidth);return b`<div class="page" part="root" style=${T({maxWidth:e})}>
<slot></slot>
</div>`}},H([S({attribute:`max-width`,converter:Fr})],Ei.prototype,`maxWidth`,void 0),Di=class extends D{constructor(...e){super(...e),this.heading=``,this.description=``,this.slots=new bn(this)}static{this.tagName=`minerva-page-header`}static{this.styles=[M,O(gr),E`
:host{
display: block;
min-width: 0;
}
`]}updated(){P&&!this.heading&&!this.slots.test(`heading`)&&V(this.constructor.tagName,`set the heading attribute (or fill the heading slot): the heading names the region.`)}renderHeading(){let e=!!this.description||this.slots.test(`description`);return b`<div class="heading">
<h1 part="title"><slot name="heading">${this.heading}</slot></h1>
${e?b`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:y}
</div>`}renderActions(){return this.slots.test(`actions`)?b`<div class="actions" part="actions">
<slot name="actions"></slot>
</div>`:y}render(){return b`<header class="header" part="root">
${this.renderHeading()} ${this.renderActions()}
</header>`}},H([S()],Di.prototype,`heading`,void 0),H([S()],Di.prototype,`description`,void 0),Oi=class extends Di{static{this.tagName=`minerva-page-section`}static{this.styles=[M,O(gr),E`
:host{
display: block;
min-width: 0;
}
.section ::slotted(minerva-tag),
.section ::slotted([data-component="tag"]){
align-self: flex-start;
}
`]}renderHeading(){let e=!!this.description||this.slots.test(`description`);return b`<div class="heading">
<h2 id="heading" part="title">
${this.slots.test(`icon`)?b`<span class="sectionIcon" part="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:y}<slot name="heading">${this.heading}</slot>
</h2>
${e?b`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:y}
</div>`}render(){return b`<section class="section" part="root" aria-labelledby="heading">
<div class="sectionHeader" part="header">
${this.renderHeading()} ${this.renderActions()}
</div>
<slot></slot>
</section>`}},ki=class extends D{constructor(...e){super(...e),this.nowrap=!1,this.density=`default`,this.aria=new L(this)}static{this.tagName=`minerva-toolbar`}static{this.styles=[M,O(gr),E`
:host{
display: block;
min-width: 0;
max-width: 100%;
}
.toolbar ::slotted(*){
max-width: 100%;
min-width: 0;
}
.toolbar ::slotted(minerva-input),
.toolbar ::slotted([data-component="input"]){
flex: 1 1 16rem;
}
.toolbar ::slotted(minerva-select),
.toolbar ::slotted([data-component="select"]){
width: auto;
flex: 0 1 12rem;
}
.nowrap ::slotted(minerva-select),
.nowrap ::slotted([data-component="select"]){
width: 12rem;
}
.compact ::slotted(minerva-divider[orientation="vertical"]),
.compact ::slotted(hr[aria-orientation="vertical"]),
.compact ::slotted([role="separator"][aria-orientation="vertical"]){
height: var(--space-5);
align-self: center;
flex: 0 0 auto;
}
`]}render(){return b`<div
part="root"
role="group"
aria-label=${this.aria.label??y}
aria-description=${this.aria.description??y}
class=${w({toolbar:!0,compact:this.density===`compact`,nowrap:this.nowrap})}
>
<slot></slot>
</div>`}},H([S({type:Boolean,reflect:!0})],ki.prototype,`nowrap`,void 0),H([S({reflect:!0})],ki.prototype,`density`,void 0),Ai=class extends D{constructor(...e){super(...e),this.label=``,this.value=``,this.slots=new bn(this)}static{this.tagName=`minerva-stat-card`}static{this.styles=[M,O(gr),E`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.description!==void 0&&this.description!==null||this.slots.test(`description`);return b`<div class="statCard" part="root">
${this.slots.test(`icon`)?b`<span class="statIcon" part="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:y}
<div class="statContent">
<dl>
<dt part="label"><slot name="label">${this.label}</slot></dt>
<dd part="value"><slot name="value">${this.value}</slot></dd>
</dl>
${e?b`<p class="statDescription" part="description">
<slot name="description">${this.description}</slot>
</p>`:y}
</div>
</div>`}},H([S()],Ai.prototype,`label`,void 0),H([S()],Ai.prototype,`value`,void 0),H([S()],Ai.prototype,`description`,void 0)})))()}var Mi,Ni,Pi;function Fi(){return(Fi=e((()=>{I(),z(),R(),Mr(),k(),B(),Vt(),N(),Zn(),sr(),g(),_(),x(),Mi=(e,t)=>({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:e,[t]:!0}),Ni=class e extends D{constructor(...e){super(...e),this.scrollState={overflow:!1,left:!1,right:!1,rtl:!1},this.aria=new L(this),this.locale=new A(this),this.slots=new bn(this),this.focused=null,this.previousItems=null,this.movedWith=null,this.mutations=null,this.resize=null,this.handleFocusIn=e=>{let t=e.target;this.focused=t instanceof Pi&&this.items.includes(t)?t:null},this.handleSelect=e=>{let t=e.target;t instanceof Pi&&this.items.includes(t)&&!e.defaultPrevented&&queueMicrotask(()=>{e.defaultPrevented||(this.activeValue=t.value)})},this.measure=()=>{let e=this.viewport;if(!e)return;let t=ae(this)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t},i=this.scrollState;(i.overflow!==r.overflow||i.left!==r.left||i.right!==r.right||i.rtl!==r.rtl)&&(this.scrollState=r)}}static{this.tagName=`minerva-page-tabs`}static{this.styles=[M,E`
:host{
display: block;
min-width: 0;
}
`,O(un),O(Pn)]}get items(){return Array.from(this.children).filter(e=>e instanceof Pi)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`minerva-select`,this.handleSelect),typeof MutationObserver<`u`&&(this.mutations=new MutationObserver(()=>this.itemsChanged()),this.mutations.observe(this,{childList:!0,attributes:!0,attributeFilter:[`value`,`active`,`disabled`],subtree:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`minerva-select`,this.handleSelect),this.mutations?.disconnect(),this.mutations=null,this.resize?.disconnect(),this.resize=null}firstUpdated(){this.observeViewport()}reconnectedCallback(){super.reconnectedCallback(),this.observeViewport()}observeViewport(){this.resize||typeof ResizeObserver>`u`||(this.resize=new ResizeObserver(()=>this.revealActive()),this.resize.observe(this.viewport))}updated(t){P&&!this.aria.label&&V(e.tagName,`set aria-label (e.g. "Open pages") to name the navigation landmark.`),t.has(`activeValue`)&&this.itemsChanged();let n=this.movedWith;if(n){let e=n===`left`?this.leftButton:this.rightButton;if(e?.disabled){this.movedWith=null;let t=this.shadowRoot?.activeElement;(!t||t===e)&&(n===`left`?this.rightButton:this.leftButton)?.focus({preventScroll:!0})}}}itemsChanged(){let e=this.items;if(this.activeValue!==void 0)for(let t of e)t.active=t.value===this.activeValue;let t=JSON.stringify([this.activeValue,...e.map(e=>[e.value,e.active])]);t!==this.previousItems&&(this.previousItems=t,this.revealActive());let n=this.focused;if(n&&!n.isConnected){this.focused=null;let t=document.activeElement;(!t||t===document.body||!t.isConnected)&&e.find(e=>e.active)?.focus({preventScroll:!0})}}revealActive(){let e=this.viewport;if(!e)return;let t=this.items.find(e=>e.active),n=t?.surface;if(t&&!n&&t.updateComplete.then(()=>{t.surface&&this.revealActive()}),n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();r.width>t.width?e.scrollLeft+=r.left-t.left:r.left<t.left?e.scrollLeft-=t.left-r.left:r.right>t.right&&(e.scrollLeft+=r.right-t.right)}this.measure()}move(e){let t=this.viewport;t&&(this.movedWith=e<0?`left`:`right`,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),this.measure())}renderScrollButton(e){let t=e===`left`,n=t?this.scrollLeftLabel??this.locale.t(`pageTabs.scrollLeft`):this.scrollRightLabel??this.locale.t(`pageTabs.scrollRight`),r=t?!this.scrollState.left:!this.scrollState.right;return b`<button
type="button"
part="scroll-button"
class=${w({...Mi(r,`scroll`),[`scroll-${e}`]:!0})}
aria-label=${n}
?disabled=${r}
tabindex=${r?-1:0}
@click=${()=>this.move(t?-1:1)}
>
${t?mr:ar}
</button>`}render(){let{overflow:e,rtl:t}=this.scrollState,n=()=>this.renderScrollButton(`left`),r=()=>this.renderScrollButton(`right`);return b`<nav
part="root"
class="pageTabs"
aria-label=${this.aria.label??y}
>
${e?t?r():n():y}
<div part="viewport" class="viewport" @scroll=${this.measure}>
<div part="list" class="list">
<slot @slotchange=${()=>this.itemsChanged()}></slot>
</div>
</div>
${e?t?n():r():y}
${this.slots.test(`actions`)?b`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:y}
</nav>`}},H([S({reflect:!0,attribute:`active-value`})],Ni.prototype,`activeValue`,void 0),H([S({attribute:`scroll-left-label`})],Ni.prototype,`scrollLeftLabel`,void 0),H([S({attribute:`scroll-right-label`})],Ni.prototype,`scrollRightLabel`,void 0),H([v()],Ni.prototype,`scrollState`,void 0),H([C(`.viewport`)],Ni.prototype,`viewport`,void 0),H([C(`.scroll-left`)],Ni.prototype,`leftButton`,void 0),H([C(`.scroll-right`)],Ni.prototype,`rightButton`,void 0),Pi=class e extends D{constructor(...e){super(...e),this.value=``,this.label=``,this.active=!1,this.disabled=!1,this.closable=!1,this.locale=new A(this),this.slots=new bn(this)}static{this.tagName=`minerva-page-tab`}static{this.shadowRootOptions={...D.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,E`
:host{
display: contents;
}
.icon ::slotted(svg){
width: 16px;
height: 16px;
}
`,O(un),O(Pn)]}get surface(){return this.wrapper??null}focus(e){this.trigger?.focus(e)}handleSelect(){this.disabled||this.emit(`minerva-select`,{value:this.value},{cancelable:!0})}handleClose(){this.emit(`minerva-close`,{value:this.value})}hookStates(){return{current:this.active,disabled:this.disabled}}updated(){P&&!this.label&&V(e.tagName,`set label to name the page.`)}render(){return b`<div
part="root"
class="pageTab"
data-value=${this.value}
?data-current=${this.active}
?data-disabled=${this.disabled}
>
<button
type="button"
part="trigger"
class="trigger"
title=${this.label||y}
aria-current=${this.active?`page`:y}
?disabled=${this.disabled}
@click=${this.handleSelect}
>
${this.slots.test(`icon`)?b`<span part="icon" class="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:y}
<span part="label" class="label">${this.label}</span>
</button>
${this.closable||this.slots.test(`action`)?b`<span part="action" class="action"
><slot name="action"></slot>${this.closable?b`<button
type="button"
part="close-button"
class=${w(Mi(!1,`close`))}
aria-label=${this.closeLabel??this.locale.t(`pageTabs.close`,{label:this.label,defaultValue:`Close {{label}}`})}
@click=${this.handleClose}
>
${Hn}
</button>`:y}</span
>`:y}
</div>`}},H([S({reflect:!0})],Pi.prototype,`value`,void 0),H([S()],Pi.prototype,`label`,void 0),H([S({type:Boolean,reflect:!0})],Pi.prototype,`active`,void 0),H([S({type:Boolean,reflect:!0})],Pi.prototype,`disabled`,void 0),H([S({type:Boolean,reflect:!0})],Pi.prototype,`closable`,void 0),H([S({attribute:`close-label`})],Pi.prototype,`closeLabel`,void 0),H([C(`.trigger`)],Pi.prototype,`trigger`,void 0),H([C(`.pageTab`)],Pi.prototype,`wrapper`,void 0)})))()}function Ii(e,t,n,r){let i=de(t).filter(t=>t===e||!r||!Ze(r,t)),a=i.indexOf(e);return a===-1?null:(n?i[a-1]:i[a+1])??null}var Li,Ri,K;function zi(){return(zi=e((()=>{I(),z(),Mr(),B(),N(),Br(),Hr(),Wr(),qr(),Yr(),jn(),or(),g(),_(),p(),Li=10,Ri=5,K=class e extends D{constructor(...e){super(...e),this.open=!1,this.modal=!1,this.side=`bottom`,this.align=`center`,this.sideOffset=6,this.alignOffset=0,this.collisionPadding=8,this.matchAnchorWidth=!1,this.arrow=!1,this.label=``,this.anchorElement=null,this.anchor=``,this.aria=new L(this),this.presence=new mn(this,()=>this.panel),this.modalController=new Jr(this),this.position=new Vr(this,()=>({placement:me(this.side,this.align),offset:{mainAxis:this.sideOffset+(this.arrow?Ri:0),crossAxis:this.alignOffset},matchAnchorWidth:this.matchAnchorWidth||!1,padding:this.collisionPadding,arrowElement:this.arrow?this.arrowEl??null:null,arrowSize:Li,onPosition:e=>{let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`)}})),this.layer=new zr(this,()=>({disableOutsidePointerEvents:this.modal,branches:()=>[this.triggerElement()],onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onFocusOutside:()=>(this.reason=`focus-outside`,!this.modal),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.focusScope=new Ur(this,()=>({trapped:this.modal,loop:this.modal,restoreFocus:this.triggerElement()??!0})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-popover-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)},this.handleKeyDown=e=>{let t=this.panel,n=this.triggerElement();if(this.modal||!t||!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||e.defaultPrevented)return;let r=e.shiftKey,i=u(document);if(!i||!Ze(t,i))return;let a=de(t);if(!(a.length===0||(r?i===t||i===a[0]:i===a[a.length-1])))return;e.preventDefault();let o=Ii(n,this.tabContainer(),r,this.positioner)??n;this.requestOpenChange(!1,`tab`),this.open||o.focus()}}static{this.tagName=`minerva-popover`}static{this.styles=[M,Kr,E`
:host{
display: contents;
}
`,O(yr)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorTarget(){if(this.anchorElement)return this.anchorElement;if(this.anchor){let e=this.getRootNode().getElementById?.(this.anchor);if(e)return e}return this.triggerElement()??this}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}tabContainer(){return Ee().find(e=>e.element===this.positioner)?.parent??document.body}syncTrigger(){let e=this.triggerElement();e&&(e.setAttribute(`aria-haspopup`,`dialog`),e.setAttribute(`aria-expanded`,String(this.open)),e.setAttribute(`data-state`,this.open?`open`:`closed`))}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.deactivate(),rn(this.positioner)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}firstUpdated(){P&&!this.triggerElement()&&!this.anchor&&!this.anchorElement&&V(e.tagName,`no slot="trigger" element nor anchor: the panel is anchored to the element itself and nothing opens it.`)}deactivate(){this.focusScope.deactivate(),this.layer.deactivate(),this.modalController.deactivate()}updated(e){this.syncTrigger();let t=this.open||this.presence.present,n=this.positioner;if(t&&n&&!this.position.running){_n(n);let e=this.anchorTarget();e&&this.position.start(e,n)}e.has(`open`)&&(this.open&&n?(this.modal&&this.modalController.activate(this),this.layer.activate(n),this.focusScope.activate(n),this.emit(`minerva-after-open`)):this.open||this.deactivate()),this.wasPresent&&!t&&(this.position.end(),rn(n),this.emit(`minerva-after-close`)),this.wasPresent=t}hookStates(){let e=this.position.placement,{side:t,align:n}=s(e);return{state:this.open?`open`:`closed`,side:t,align:n,placement:e}}render(){if(!(this.open||this.presence.present))return b`<slot name="trigger"></slot>`;let{side:e,align:t}=s(this.position.placement),n=this.open?`open`:`closed`,r=this.label||this.aria.label,i=this.isConnected?ae(this):`ltr`;return b`<slot name="trigger"></slot>
<div
class="positioner"
popover="manual"
data-side=${e}
data-align=${t}
>
<div
part="content"
class="content"
role="dialog"
aria-modal=${this.modal?`true`:y}
aria-label=${r||y}
tabindex="-1"
dir=${i}
data-state=${n}
data-side=${e}
data-align=${t}
@keydown=${this.handleKeyDown}
>
<slot></slot>
${this.arrow?b`<span part="arrow" class="arrowWrapper" aria-hidden="true">
<svg
class="arrow"
width=${Li}
height=${Ri}
viewBox="0 0 30 10"
preserveAspectRatio="none"
>
<polygon points="0,0 30,0 15,10"></polygon>
</svg>
</span>`:y}
</div>
</div>`}},H([S({type:Boolean,reflect:!0})],K.prototype,`open`,void 0),H([S({type:Boolean,reflect:!0})],K.prototype,`modal`,void 0),H([S({reflect:!0})],K.prototype,`side`,void 0),H([S({reflect:!0})],K.prototype,`align`,void 0),H([S({type:Number,attribute:`side-offset`})],K.prototype,`sideOffset`,void 0),H([S({type:Number,attribute:`align-offset`})],K.prototype,`alignOffset`,void 0),H([S({type:Number,attribute:`collision-padding`})],K.prototype,`collisionPadding`,void 0),H([S({attribute:`match-anchor-width`})],K.prototype,`matchAnchorWidth`,void 0),H([S({type:Boolean,reflect:!0})],K.prototype,`arrow`,void 0),H([S()],K.prototype,`label`,void 0),H([S({attribute:!1})],K.prototype,`anchorElement`,void 0),H([S()],K.prototype,`anchor`,void 0),H([C(`.positioner`)],K.prototype,`positioner`,void 0),H([C(`.content`)],K.prototype,`panel`,void 0),H([C(`[part=arrow]`)],K.prototype,`arrowEl`,void 0)})))()}var Bi;function Vi(){return(Vi=e((()=>{Bi=`minerva-prose{min-width:0;max-width:100%;color:var(--text-color,#1f2937);font-family:var(--font-family-sans,system-ui, -apple-system, "Segoe UI", sans-serif);font-size:var(--prose-font-size,var(--font-size-lg,1rem));font-weight:var(--font-weight-regular,400);font-style:normal;line-height:var(--line-height-relaxed,1.7);letter-spacing:0;overflow-wrap:anywhere}minerva-prose :where(h1,h2,h3,h4,h5,h6){color:inherit;font-family:inherit;font-style:inherit;font-weight:var(--font-weight-semibold,600);letter-spacing:0;background:0 0;border:0;margin:1.5em 0 .5em;padding:0;line-height:1.35}minerva-prose :where(h1){font-size:var(--font-size-3xl,1.75rem)}minerva-prose :where(h2){font-size:var(--font-size-2xl,1.375rem)}minerva-prose :where(h3){font-size:var(--font-size-xl,1.125rem)}minerva-prose :where(h4){font-size:var(--font-size-lg,1rem)}minerva-prose :where(h5,h6){font-size:var(--font-size-md,.875rem)}minerva-prose :where(h6){color:var(--text-muted-color,#6b7280)}minerva-prose :where(p,ul,ol,li,blockquote){font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;line-height:inherit;letter-spacing:inherit}minerva-prose :where(p){background:0 0;border:0;padding:0}minerva-prose :where(p,ul,ol,blockquote,pre,table,figure){margin:1em 0}minerva-prose>:first-child{margin-top:0}minerva-prose>:last-child{margin-bottom:0}minerva-prose :where(ul,ol){padding:0;padding-inline-start:1.5em}minerva-prose :where(li){margin:.25em 0}minerva-prose :where(li>ul,li>ol,li>p){margin-block:.25em}minerva-prose :where(blockquote){border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-code-bg,var(--control-color,#f6f7f9));color:inherit;border:1px solid #0000;padding:.5em 1em}minerva-prose :where(a){color:var(--primary-color-text,#1e4fbd);text-underline-offset:.18em;text-decoration:underline;text-decoration-thickness:1px}minerva-prose :where(a:hover){text-decoration-thickness:2px}minerva-prose :where(a:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:3px}minerva-prose :where(code,kbd,samp){font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);font-size:.875em}minerva-prose :where(code){border-radius:calc(var(--prose-radius,var(--radius-sm,4px)) - 1px);background:var(--prose-code-bg,var(--control-color,#f6f7f9));padding:.12em .3em}minerva-prose :where(pre){max-width:100%;padding:var(--space-4,1rem);border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-pre-bg,var(--surface-elevated-color,#fff));color:var(--text-color,#1f2937);font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);line-height:var(--line-height-base,1.5);white-space:pre;overflow-wrap:normal;tab-size:2;overflow-x:auto}minerva-prose :where(pre code){color:inherit;white-space:pre;background:0 0;border:0;border-radius:0;padding:0}minerva-prose :where(pre:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:2px}minerva-prose :where(.hljs-comment,.hljs-quote){color:var(--text-muted-color,#6b7280)}minerva-prose :where(.hljs-keyword,.hljs-selector-tag,.hljs-name,.hljs-tag,.hljs-attr,.hljs-attribute,.hljs-doctag){color:var(--primary-color-text,#1e4fbd)}minerva-prose :where(.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-regexp,.hljs-type,.hljs-literal){color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-number,.hljs-title,.hljs-section,.hljs-built_in,.hljs-meta,.hljs-variable){color:var(--warning-color-text,#b45309)}minerva-prose :where(.hljs-subst,.hljs-operator,.hljs-punctuation,.hljs-params){color:var(--text-color,#1f2937)}minerva-prose :where(.hljs-addition){background:var(--success-color-subtle,#e7f6ec);color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-deletion){background:var(--danger-color-subtle,#fcebeb);color:var(--danger-color-text,#b91c1c)}minerva-prose :where(.hljs-strong){font-weight:var(--font-weight-bold,700)}minerva-prose :where(.hljs-emphasis){font-style:italic}minerva-prose :where(mark){background:var(--warning-color-subtle,#fdf3e1);color:inherit}minerva-prose :where(img,video){max-width:100%;height:auto}minerva-prose :where(figure){max-width:100%}minerva-prose :where(figcaption){margin-top:var(--space-2,.5rem);font-size:var(--font-size-md,.875rem);color:var(--text-muted-color,#6b7280)}minerva-prose :where(table){border-collapse:collapse;width:100%;color:inherit;overflow-wrap:normal;display:table}minerva-prose :where(tr){background:0 0;border:0}minerva-prose :where(th,td){border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));text-align:start;vertical-align:top;white-space:normal;padding:.5em .75em}minerva-prose :where(th){background:var(--prose-code-bg,var(--control-color,#f6f7f9));font-weight:var(--font-weight-semibold,600)}minerva-prose :where(th>p,td>p){margin:0}minerva-prose :where(hr){background:var(--prose-border-color,var(--border-color,#d9dde3));border:0;height:1px;margin:1.5em 0;padding:0}@media (forced-colors:active){minerva-prose :where(hr){forced-color-adjust:none;background:canvastext}}minerva-prose :where(sub,sup){font-size:.75em;line-height:0}@media print{minerva-prose :where(pre){overflow:visible}minerva-prose :where(pre,pre code){white-space:pre-wrap;overflow-wrap:anywhere}minerva-prose :where(pre,blockquote,figure,img,tr){break-inside:avoid}}`})))()}function Hi(){if(Ki!==void 0)return Ki;Ki=null;try{if(typeof CSSStyleSheet<`u`&&`replaceSync`in CSSStyleSheet.prototype){let e=new CSSStyleSheet;e.replaceSync(Bi),Ki=e}}catch{Ki=null}return Ki}function Ui(e){if(Gi.has(e))return;Gi.add(e);let t=Hi();if(t&&`adoptedStyleSheets`in e)try{e.adoptedStyleSheets=[...e.adoptedStyleSheets,t];return}catch{}let n=e.nodeType===9?e:e.ownerDocument;if(!n)return;let r=e.nodeType===9?n.head??n.documentElement:e;if(r.querySelector?.(`#${Wi}`))return;let i=n.createElement(`style`);i.id=Wi,i.textContent=Bi,r.appendChild(i)}var Wi,Gi,Ki,qi;function Ji(){return(Ji=e((()=>{B(),Vi(),g(),Wi=`minerva-prose-styles`,Gi=new WeakSet,qi=class extends D{static{this.tagName=`minerva-prose`}static{this.styles=[M,E`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback();let e=this.getRootNode();(e.nodeType===9||e.nodeType===11)&&Ui(e)}render(){return b`<slot></slot>`}}})))()}var Yi;function Xi(){return(Xi=e((()=>{p(),Yi=class{constructor(e,t){this.options=t,this.roving=null,this.container=null,e.addController(this)}attach(e){this.container===e&&this.roving||(this.detach(),this.container=e,this.roving=nt(e,this.options()))}detach(){this.roving?.destroy(),this.roving=null,this.container=null}refresh(){this.roving?.refresh()}setActive(e,t){this.roving?.setActive(e,t)}getActive(){return this.roving?.getActive()??null}hostDisconnected(){this.detach()}}})))()}var Zi,Qi,$i;function ea(){return(ea=e((()=>{pr(),I(),z(),R(),Mr(),k(),on(),B(),Vt(),N(),Bt(),Bn(),Xi(),g(),_(),x(),Zi=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Home`,`End`]),Qi=class extends D{constructor(...e){super(...e),this.hostInternals=cn(this),this.ownedAria=new Set,this.value=``,this.checked=!1,this.disabled=!1,this.label=``,this.size=`medium`,this.color=`primary`,this.error=!1,this.helperText=``,this.errorMessage=``,this.slots=new bn(this),this.ownsDescription=!1,this.handleClick=e=>{if(this.isDisabled){e.preventDefault(),e.stopImmediatePropagation();return}this.group||this.checked||(this.checked=!0,this.emit(`minerva-change`,{checked:!0,value:this.value}))},this.handleKeyDown=e=>{e.key===` `&&(e.preventDefault(),this.isDisabled||this.click())}}static{this.tagName=`minerva-radio`}static{this.styles=[M,E`
:host{
display: inline-flex;
outline: none;
vertical-align: middle;
}
.input{
pointer-events: none;
}
:host(:focus-visible) .radioMark{
box-shadow: 0 0 0 3px var(--focus-ring-color);
}
@media (forced-colors: active){
:host(:focus-visible) .radioMark{
outline: 2px solid Highlight;
outline-offset: 2px;
}
}
`,O(Dt)]}get group(){let e=this.parentElement?.closest(`minerva-radio-group`);return e instanceof $i?e:null}get isDisabled(){return this.disabled||!!this.group?.isDisabled}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick),this.addEventListener(`keydown`,this.handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.removeEventListener(`keydown`,this.handleKeyDown)}updated(){let e=this.isDisabled;Yt(this,this.hostInternals,{role:`radio`,ariaChecked:String(this.checked),ariaDisabled:e?`true`:null},this.ownedAria),this.group||j(this,`tabindex`,e?`-1`:`0`);let t=this.error?this.errorMessage:this.helperText;t&&(this.ownsDescription||!this.hasAttribute(`aria-description`))?(this.ownsDescription=!0,j(this,`aria-description`,t)):!t&&this.ownsDescription&&(this.ownsDescription=!1,j(this,`aria-description`,null))}hookStates(){let e=this.group;return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error,size:e?.size??this.size,color:e?.color??this.color}}render(){let e=this.group,t=e?.size??this.size,n=e?.color??this.color,r=this.error?this.errorMessage:this.helperText,i=!!this.label||this.slots.test(`[default]`);return b`<div
part="root"
class=${w({radioWrapper:!0,[t]:!0,[n]:!0,error:this.error})}
>
<span class=${w({radio:!0,disabled:this.isDisabled})}>
<input
type="radio"
class="input"
tabindex="-1"
aria-hidden="true"
inert
.checked=${this.checked}
/>
<span class="radioMark" part="control"></span>
${i?b`<span class="label" part="label"
>${this.label||b`<slot></slot>`}</span
>`:y}
</span>
${r?b`<div class="helperTextWrapper" aria-hidden="true">
${this.error&&this.errorMessage?b`<span class="errorIcon">${$t}</span>`:y}
<span
part="helper-text"
class=${w({helperText:!0,errorText:this.error})}
>${r}</span
>
</div>`:y}
</div>`}},H([S()],Qi.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0})],Qi.prototype,`checked`,void 0),H([S({type:Boolean,reflect:!0})],Qi.prototype,`disabled`,void 0),H([S()],Qi.prototype,`label`,void 0),H([S({reflect:!0})],Qi.prototype,`size`,void 0),H([S({reflect:!0})],Qi.prototype,`color`,void 0),H([S({type:Boolean,reflect:!0})],Qi.prototype,`error`,void 0),H([S({attribute:`helper-text`})],Qi.prototype,`helperText`,void 0),H([S({attribute:`error-message`})],Qi.prototype,`errorMessage`,void 0),$i=class e extends F{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.label=``,this.helperText=``,this.error=!1,this.direction=`vertical`,this.locale=new A(this),this.aria=new L(this,()=>this.labels),this.roving=new Yi(this,()=>({getItems:()=>this.radios,isItemDisabled:e=>this.isDisabled||e.disabled,orientation:`both`,dir:ae(this),loop:!0})),this.observer=null,this.dirty=!1,this.rovingAttached=!1,this.settleQueued=!1,this.handleClick=e=>{let t=e.target?.closest?.(`minerva-radio`);t instanceof Qi&&t.group===this&&this.select(t)},this.handleKeyDown=e=>{if(!e.defaultPrevented||!Zi.has(e.key))return;let t=this.roving.getActive();t instanceof Qi&&this.select(t)}}static{this.tagName=`minerva-radio-group`}static{this.dependencies=[Qi]}static{this.styles=[M,E`
:host{
display: block;
}
`,O(Dt)]}get radios(){return Array.from(this.querySelectorAll(`minerva-radio`)).filter(e=>e instanceof Qi&&e.group===this)}focus(e){let t=this.radios;(t.find(e=>e.checked&&!e.disabled)??t.find(e=>!e.disabled))?.focus(e)}connectedCallback(){super.connectedCallback(),Kt(this)||this.attachRoving(),this.addEventListener(`click`,this.handleClick),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0}))}attachRoving(){this.rovingAttached||(this.rovingAttached=!0,this.roving.attach(this),this.addEventListener(`keydown`,this.handleKeyDown))}disconnectedCallback(){super.disconnectedCallback(),this.rovingAttached=!1,this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.observer?.disconnect(),this.observer=null}getFormValue(){return this.value===``?null:this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.radioMissing`),anchor:this.radios.find(e=>!e.disabled)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`?this.value=e:e===null&&(this.value=``)}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){super.updated(t);let n=this.radios,r;for(let e of n)e.checked=this.value!==``&&e.value===this.value,e.checked&&(r??=e),e.requestUpdate();this.syncRoving(n,r),P&&this.value!==``&&n.length>0&&!r&&V(e.tagName,`value "${this.value}" matches no <minerva-radio> of the group.`)}syncRoving(e,t){let n=[this,...e].find(Kt);if(n){this.settleQueued||(this.settleQueued=!0,tn(n,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.attachRoving(),t&&!t.disabled&&!this.isDisabled?this.roving.setActive(t,{focus:!1}):this.roving.refresh();for(let t of e)(this.isDisabled||t.disabled)&&t.setAttribute(`tabindex`,`-1`)}select(e){this.isDisabled||e.disabled||e.value===this.value||(this.dirty=!0,this.value=e.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}hookStates(){return{disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,required:this.required,orientation:this.direction,size:this.size,color:this.color}}render(){let e=this.error||this.aria.attr(`aria-invalid`)===`true`,t=this.label,n=[this.helperText,this.aria.description].filter(Boolean).join(` `);return b`<div
part="root"
class=${w({radioGroupWrapper:!0,error:e})}
>
${t?b`<div id="label" part="label" class="groupLabel">${t}</div>`:y}
<div
part="list"
class=${w({radioGroup:!0,[this.direction]:!0})}
role="radiogroup"
aria-labelledby=${t?`label`:y}
aria-label=${t?y:this.aria.label??y}
aria-description=${n||y}
aria-required=${this.required?`true`:`false`}
aria-invalid=${e?`true`:`false`}
aria-disabled=${this.isDisabled?`true`:y}
>
<slot></slot>
</div>
${this.helperText?b`<div
part="helper-text"
aria-hidden="true"
class=${w({helperText:!0,errorText:e})}
>
${this.helperText}
</div>`:y}
</div>`}},H([S({attribute:!1})],$i.prototype,`value`,void 0),H([S({attribute:`value`})],$i.prototype,`defaultValue`,void 0),H([S()],$i.prototype,`label`,void 0),H([S({attribute:`helper-text`})],$i.prototype,`helperText`,void 0),H([S({type:Boolean,reflect:!0})],$i.prototype,`error`,void 0),H([S({reflect:!0})],$i.prototype,`direction`,void 0),H([S({reflect:!0})],$i.prototype,`size`,void 0),H([S({reflect:!0})],$i.prototype,`color`,void 0)})))()}var ta,na,ra,ia,aa;function oa(){return(oa=e((()=>{I(),z(),R(),k(),At(),B(),N(),Bt(),Zr(),pn(),g(),_(),x(),ft(),p(),h(),ta={small:12,medium:16,large:20},na=Array.from({length:5},(e,t)=>t),ra=E`
.star svg{
display: block;
width: 100%;
height: 100%;
stroke-width: 1.5;
}
.full svg,
.halfFill svg{
fill: currentColor;
}
`,ia=class e extends F{constructor(...e){super(...e),this.value=0,this.defaultValue=0,this.max=10,this.size=`medium`,this.showValue=!1,this.interactive=!1,this.readOnly=!1,this.locale=new A(this),this.aria=new L(this,()=>this.labels),this.dirty=!1,this.rating=new Xr(this,je(this.ratingProps()))}static{this.tagName=`minerva-rating`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,E`
:host{
display: inline-flex;
vertical-align: middle;
}
`,O(An),ra]}ratingProps(){return{value:this.value,max:this.max,readOnly:!this.isInteractive,onValueChange:e=>this.commit(e)}}send(e){this.rating.sync(this.ratingProps()),this.rating.send(e)}get isInteractive(){return this.interactive&&!this.readOnly&&!this.isDisabled}focus(e){this.root?.focus(e)}blur(){this.root?.blur()}getFormValue(){return String(this.value)}getValidity(){return this.required&&!(this.value>0)?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.root}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){if(typeof e==`string`&&e.trim()!==``){let t=Number(e);Number.isFinite(t)&&(this.value=t)}}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),P&&(t.has(`value`)||t.has(`max`))&&(this.value<0||this.value>this.max)&&V(e.tagName,`value (${this.value}) is outside 0..max (${this.max}).`),this.rating.sync(this.ratingProps())}commit(e){e!==this.value&&(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleStarClick(e,t){if(!this.isInteractive)return;let n=e.currentTarget.getBoundingClientRect(),r=e.clientX-n.left<n.width/2;this.send({type:`PICK`,index:t,half:r})}handleKeyDown(e){if(e.defaultPrevented||!this.isInteractive)return;let t=we(e.key,this);Xe(t,this.value,this.max)!==null&&(e.preventDefault(),this.send({type:`KEY`,key:t}))}hookStates(){return{readonly:!this.isInteractive,size:this.size}}renderStar(e,t){let n=T({width:`${t}px`,height:`${t}px`,fontSize:`${t}px`}),r=Yn(`star`,{fill:e});return e===`half`?b`<span part=${r} class="star half" style=${n}
><span class="halfBase">${jr}</span
><span class="halfFill">${gn}</span></span
>`:b`<span
part=${r}
class=${w({star:!0,[e]:!0})}
style=${n}
>${jr}</span
>`}render(){let e=this.isInteractive,{value:t,max:r}=this,i=this.rating.machine.project(this.rating.state,this.ratingProps()),a=n(i,r),o=e=>a[e],s=ta[this.size]??ta.medium,c=this.aria.label??`${t.toFixed(1)} / ${r}`,l=b`<span class="stars" part="stars" aria-hidden="true">
${na.map(t=>e?b`<button
type="button"
tabindex="-1"
class="starButton"
@click=${e=>this.handleStarClick(e,t)}
@mouseenter=${()=>this.send({type:`HOVER`,index:t})}
>
${this.renderStar(o(t),s)}
</button>`:this.renderStar(o(t),s))}
</span>`,u=this.showValue?b`<span class="value" part="value"
><strong>${t.toFixed(1)}</strong>${this.ratingCount===void 0?y:b`<span class="count" part="count"
>(${this.ratingCount.toLocaleString(`en-US`)})</span
>`}</span
>`:y,d=w({rating:!0,[this.size]:!0,interactive:e});return e?b`<span
part="root"
class=${d}
role="slider"
tabindex="0"
aria-label=${c}
aria-description=${this.aria.description??y}
aria-valuenow=${t}
aria-valuemin="0"
aria-valuemax=${r}
aria-required=${this.required?`true`:y}
@keydown=${this.handleKeyDown}
@mouseleave=${()=>this.send({type:`HOVER_END`})}
>${l}${u}</span
>`:b`<span
part="root"
class=${d}
role="img"
aria-label=${c}
aria-description=${this.aria.description??y}
aria-disabled=${this.isDisabled?`true`:y}
>${l}${u}</span
>`}},H([S({attribute:!1})],ia.prototype,`value`,void 0),H([S({type:Number,attribute:`value`})],ia.prototype,`defaultValue`,void 0),H([S({type:Number})],ia.prototype,`max`,void 0),H([S({reflect:!0})],ia.prototype,`size`,void 0),H([S({type:Boolean,attribute:`show-value`})],ia.prototype,`showValue`,void 0),H([S({type:Number,attribute:`rating-count`})],ia.prototype,`ratingCount`,void 0),H([S({type:Boolean,reflect:!0})],ia.prototype,`interactive`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],ia.prototype,`readOnly`,void 0),H([C(`.rating`)],ia.prototype,`root`,void 0),aa=class extends D{constructor(...e){super(...e),this.dimensions=[],this.max=10,this.size=`medium`,this.interactive=!1,this.readOnly=!1,this.hideValue=!1}static{this.tagName=`minerva-rating-scale`}static{this.dependencies=[ia]}static{this.styles=[M,E`
:host{
display: block;
}
`,O(An)]}handleChange(e,t){e.stopPropagation();let{value:n}=e.detail;this.dimensions=this.dimensions.map(e=>e.key===t?{...e,value:n}:e),this.emit(`minerva-change`,{key:t,value:n,dimensions:this.dimensions})}hookStates(){return{readonly:!this.interactive||this.readOnly,size:this.size}}render(){return b`<div class="scale" part="root">
${this.dimensions.map(e=>b`<div class="scaleRow" part="row" title=${e.hint??y}>
<span class="scaleLabel" part="label">${e.label}</span>
<minerva-rating
.value=${e.value}
.max=${this.max}
.size=${this.size}
?show-value=${!this.hideValue}
?interactive=${this.interactive}
?readonly=${this.readOnly}
aria-label=${`${e.label} ${e.value.toFixed(1)} / ${this.max}`}
@minerva-change=${t=>this.handleChange(t,e.key)}
></minerva-rating>
</div>`)}
</div>`}},H([S({attribute:!1})],aa.prototype,`dimensions`,void 0),H([S({type:Number})],aa.prototype,`max`,void 0),H([S({reflect:!0})],aa.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],aa.prototype,`interactive`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],aa.prototype,`readOnly`,void 0),H([S({type:Boolean,attribute:`hide-value`})],aa.prototype,`hideValue`,void 0)})))()}var sa,ca,la,ua,da;function fa(){return(fa=e((()=>{I(),z(),k(),At(),B(),N(),Bt(),wn(),g(),_(),ft(),p(),h(),sa=[`small`,`medium`,`large`],ca=[`neutral`,`primary`],la={fromAttribute(e){let t=e?.trim()??``;if(!t)return[];if(t.startsWith(`[`))try{let e=JSON.parse(t);if(Array.isArray(e))return e}catch{}return t.split(`,`).map(e=>e.trim()).filter(Boolean)}},ua=e=>typeof e==`string`?{value:e}:e,da=class e extends F{constructor(...e){super(...e),this.options=[],this.value=``,this.defaultValue=``,this.size=`medium`,this.color=`neutral`,this.fullWidth=!1,this.locale=new A(this),this.aria=new L(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-segmented-control`}static{this.styles=[M,E`
:host{
display: inline-block;
max-inline-size: 100%;
vertical-align: middle;
}
:host([full-width]){
display: block;
}
`,O(Dn)]}get items(){return(Array.isArray(this.options)?this.options:[]).map(ua)}get segments(){return Array.from(this.renderRoot.querySelectorAll(`[role="radio"]`))}focus(e){this.renderRoot.querySelector(`[role="radio"][tabindex="0"]`)?.focus(e)}getFormValue(){return this.value===``?null:this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.radioMissing`),anchor:this.segments[0]??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`?this.value=e:e===null&&(this.value=``)}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),P&&(t.has(`value`)||t.has(`options`))&&this.value!==``&&this.items.length>0&&!this.items.some(e=>e.value===this.value)&&V(e.tagName,`value "${this.value}" matches no option: nothing is selected.`)}isItemDisabled(e){return this.isDisabled||!!this.items[e]?.disabled}select(e){if(this.isItemDisabled(e))return;let t=this.items[e].value;t!==this.value&&(this.dirty=!0,this.value=t,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:t}))}handleKeyDown(e,t){if(this.isDisabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=qe({currentIndex:t,count:this.items.length,key:e.key,orientation:`both`,dir:ae(this),isDisabled:e=>this.isItemDisabled(e)});n!==null&&(e.preventDefault(),this.select(n),this.segments[n]?.focus())}hookStates(){return{disabled:this.isDisabled,size:sa.includes(this.size)?this.size:`medium`,color:ca.includes(this.color)?this.color:`neutral`}}render(){let e=this.items,t=this.isDisabled,{size:n,color:r}=this.hookStates(),i=e.findIndex(e=>e.value===this.value),a=i>=0&&!this.isItemDisabled(i)?i:e.findIndex((e,t)=>!this.isItemDisabled(t)),o=[`segmentedControl`,n,r,this.fullWidth?`fullWidth`:``,t?`disabled`:``].filter(Boolean).join(` `);return b`<div
part="root"
role="radiogroup"
class=${o}
aria-label=${this.aria.label??y}
aria-description=${this.aria.description??y}
aria-required=${this.required?`true`:y}
aria-disabled=${t?`true`:y}
style=${T({"--_segmented-control-count":String(Math.max(e.length,1)),"--_segmented-control-index":String(Math.max(i,0))})}
>
<span
part="indicator"
class="indicator"
?hidden=${i<0}
aria-hidden="true"
></span>
${e.map((e,n)=>{let r={selected:n===i,disabled:this.isItemDisabled(n)},o=e.icon!==void 0&&e.icon!==null,s=e.label??(o?void 0:e.value);return b`<div
role="radio"
part=${Yn(`item`,r)}
class="item"
data-value=${e.value}
aria-checked=${String(r.selected)}
aria-disabled=${r.disabled?`true`:y}
aria-label=${e[`aria-label`]??y}
tabindex=${!t&&n===a?`0`:`-1`}
@click=${()=>this.select(n)}
@keydown=${e=>this.handleKeyDown(e,n)}
>
${o?b`<span part="icon" class="icon" aria-hidden="true"
>${e.icon}</span
>`:y}${s==null?y:b`<span part="label" class="label">${s}</span>`}
</div>`})}
</div>`}},H([S({converter:la})],da.prototype,`options`,void 0),H([S({attribute:!1})],da.prototype,`value`,void 0),H([S({attribute:`value`})],da.prototype,`defaultValue`,void 0),H([S({reflect:!0})],da.prototype,`size`,void 0),H([S({reflect:!0})],da.prototype,`color`,void 0),H([S({type:Boolean,attribute:`full-width`,reflect:!0})],da.prototype,`fullWidth`,void 0)})))()}var pa,ma,ha,ga,_a;function va(){return(va=e((()=>{pr(),I(),z(),R(),on(),B(),N(),Qt(),g(),_(),pa=0,ma=class e extends D{constructor(...e){super(...e),this.internals=cn(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.label=``,this.selected=!1,this.highlighted=!1}static{this.tagName=`minerva-option`}static{this.styles=[M,E`
:host{
display: block;
outline: none;
}
`,O(dr)]}get text(){return this.textValue??(this.label||this.textContent?.trim()||``)}get displayLabel(){return this.label||this.textContent?.trim()||``}connectedCallback(){super.connectedCallback(),Yt(this,this.internals,{role:`option`},this.ownedAria)}updated(t){super.updated(t),Yt(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),j(this,`data-highlighted`,this.highlighted),j(this,`data-disabled`,this.disabled),j(this,`data-selected`,this.selected),P&&t.has(`value`)&&this.value===``&&this.isConnected&&V(e.tagName,`an option needs a non-empty "value" (the empty value means "nothing selected").`)}hookStates(){return{selected:this.selected,highlighted:this.highlighted,disabled:this.disabled}}render(){return b`<div
part="root"
class="item"
?data-selected=${this.selected}
?data-highlighted=${this.highlighted}
?data-disabled=${this.disabled}
>
<span class="itemText" part="label"><slot></slot></span>
${this.selected?b`<span class="itemIndicator" part="indicator" aria-hidden="true"
>${qn}</span
>`:y}
</div>`}},H([S({reflect:!0})],ma.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0})],ma.prototype,`disabled`,void 0),H([S()],ma.prototype,`label`,void 0),H([S({attribute:`text-value`})],ma.prototype,`textValue`,void 0),H([S({type:Boolean,attribute:!1})],ma.prototype,`selected`,void 0),H([S({type:Boolean,attribute:!1})],ma.prototype,`highlighted`,void 0),ha=class extends D{constructor(...e){super(...e),this.internals=cn(this),this.observer=null}static{this.tagName=`minerva-option-group`}static{this.styles=[M,E`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback(),Yt(this,this.internals,{role:`group`}),this.syncLabel(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.syncLabel()),this.observer.observe(this,{childList:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}syncLabel(){let e=this.querySelector(`:scope > minerva-select-label`);if(e){let t=On(e,`id`);t||(t=`minerva-select-label-${pa++}`,j(e,`id`,t,this)),j(this,`aria-labelledby`,t)}else j(this,`aria-labelledby`,null)}render(){return b`<div part="root"><slot></slot></div>`}},ga=class extends D{static{this.tagName=`minerva-select-label`}static{this.styles=[M,E`
:host{
display: block;
}
`,O(dr)]}render(){return b`<div class="label" part="root"><slot></slot></div>`}},_a=class extends D{constructor(...e){super(...e),this.internals=cn(this)}static{this.tagName=`minerva-select-separator`}static{this.styles=[M,E`
:host{
display: block;
}
`,O(dr)]}connectedCallback(){super.connectedCallback(),Yt(this,this.internals,{ariaHidden:`true`})}render(){return b`<div class="separator" part="root"></div>`}}})))()}var ya,ba,xa,Sa,Ca,wa;function Ta(){return(Ta=e((()=>{I(),z(),R(),k(),At(),B(),N(),qr(),Bt(),Qt(),va(),g(),_(),x(),p(),h(),ya=10,ba=e=>Array.isArray(e.options),xa=e=>e.getAttribute(`aria-disabled`)===`true`,Sa=e=>e instanceof ma?e.value:e.dataset.value??``,Ca=e=>e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey,wa=class e extends F{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.highlighted=null,this.locale=new A(this),this.aria=new L(this,()=>this.labels),this.typeahead=ce(),this.floating=new Gr(this,()=>({anchor:()=>this.trigger,floating:()=>this.positioner,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,fitViewportHeight:!0,branches:()=>[this.trigger],onDismiss:()=>this.requestOpen(!1),returnFocusOnEscape:()=>this.trigger,focusable:!0,onPosition:()=>this.syncHookStates()})),this.openIntent=`selected`,this.scrollPending=!1,this.dirty=!1,this.observer=null}static{this.tagName=`minerva-select`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,Kr,E`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,O(dr)]}focus(e){this.trigger?.focus(e)}blur(){this.trigger?.blur()}show(){this.open=!0}hide(){this.open=!1}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:[`value`,`disabled`,`label`,`text-value`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.typeahead.reset()}get lightOptions(){return Array.from(this.querySelectorAll(`minerva-option`)).filter(e=>e instanceof ma)}get dataOptions(){return(this.options??[]).flatMap(e=>ba(e)?e.options:[e])}get items(){return[...this.dataOptions.map(e=>({value:e.value,disabled:!!e.disabled,text:e.textValue??e.label,label:e.label})),...this.lightOptions.map(e=>({value:e.value,disabled:e.disabled,text:e.text,label:e.displayLabel}))]}getOptions(){let e=this.listbox;return e?[...Array.from(e.querySelectorAll(`[role=option]`)),...this.lightOptions]:[]}findOption(e){if(e!==null)return this.getOptions().find(t=>Sa(t)===e)}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.trigger}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}requestOpen(e){e!==this.open&&(e&&this.isDisabled||this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}openWith(e){this.openIntent=e,this.requestOpen(!0)}close(e){e&&this.trigger?.focus(),this.requestOpen(!1)}commitValue(e){e!==this.value&&(this.value=e,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}selectValue(e){this.commitValue(e),this.close(!0)}willUpdate(e){if(e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open){let e=this.openIntent;this.openIntent=`selected`;let t=this.items.filter(e=>!e.disabled),n=e===`last`?t[t.length-1]:e===`first`?t[0]:t.find(e=>e.value===this.value)??t[0];this.typeahead.reset(),this.scrollPending=!0,this.highlighted=n?.value??null}e.has(`open`)&&!this.open&&(this.highlighted=null)}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?s(e):{side:void 0,align:void 0};return{state:this.open?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,required:this.required,size:this.size,side:t,align:n,placement:e}}updated(e){super.updated(e);for(let e of this.lightOptions)e.selected=e.value===this.value,e.highlighted=this.open&&e.value===this.highlighted;if(this.floating.sync(this.open),this.open&&this.listbox){if(e.has(`open`)||e.has(`highlighted`)){let e=this.findOption(this.highlighted)??this.listbox;e.getRootNode()===this.shadowRoot?this.shadowRoot?.activeElement!==e&&e.focus({preventScroll:!0}):document.activeElement!==e&&(e.hasAttribute(`tabindex`)||(e.tabIndex=-1),e.focus({preventScroll:!0}))}this.scrollPending&&(this.scrollPending=!1,this.findOption(this.highlighted)?.scrollIntoView?.({block:`nearest`}))}P&&this.checkOptions()}checkOptions(){let t=this.items;if(t.length===0)return;let n=new Set;for(let r of t)n.has(r.value)&&V(e.tagName,`several options have the value "${r.value}"; option values must be unique.`),n.add(r.value);this.value!==``&&!n.has(this.value)&&V(e.tagName,`value "${this.value}" does not match any option.`)}handleTriggerKeyDown(e){if(this.open)return;let{key:t}=e;if(Ca(e)&&(t!==` `||this.typeahead.getBuffer()!==``)){let n=this.items,r=this.typeahead.search(t,n,n.findIndex(e=>e.value===this.value));e.preventDefault(),r!==-1&&this.commitValue(n[r].value);return}let n={Enter:`selected`," ":`selected`,ArrowDown:`selected`,ArrowUp:this.value===``?`last`:`selected`,Home:`first`,End:`last`};t in n&&(e.preventDefault(),this.openWith(n[t]))}handleListboxKeyDown(e){let{key:t}=e;if(t===`Tab`){this.close(!0);return}let n=this.getOptions(),r=n.findIndex(e=>Sa(e)===this.highlighted),i=r===-1?void 0:n[r],a=()=>{i&&!xa(i)&&this.selectValue(Sa(i))};if(t===`Enter`||t===`ArrowUp`&&e.altKey){e.preventDefault(),a();return}if(t===` `&&this.typeahead.getBuffer()===``){e.preventDefault(),a();return}if(e.ctrlKey||e.metaKey||e.altKey)return;let o=qe({currentIndex:r,count:n.length,key:t,loop:!1,isDisabled:e=>xa(n[e]),pageSize:ya});if((o!==null||t.startsWith(`Arrow`)||t.startsWith(`Page`))&&e.preventDefault(),o===null&&Ca(e)){let i=this.typeahead.search(t,n.map(e=>({text:e instanceof ma?e.text:e.dataset.textValue??e.textContent??``,disabled:xa(e)})),r);i!==-1&&(e.preventDefault(),this.scrollPending=!0,this.highlighted=Sa(n[i]));return}o!==null&&(this.typeahead.reset(),this.scrollPending=!0,this.highlighted=Sa(n[o]))}optionFromEvent(e){let t=this.getOptions();return e.composedPath().find(e=>t.includes(e))}handleListboxPointerMove(e){let t=this.optionFromEvent(e);if(!t||xa(t))return;let n=Sa(t);this.highlighted!==n&&(this.scrollPending=!1,this.highlighted=n)}handleListboxClick(e){let t=this.optionFromEvent(e);t&&!xa(t)&&this.selectValue(Sa(t))}renderDataOption(e){let t=e.value===this.value,n=this.highlighted===e.value,r=!!e.disabled;return b`<div
part=${Yn(`item`,{selected:t,highlighted:n,disabled:r})}
class="item"
role="option"
tabindex="-1"
aria-selected=${String(t)}
aria-disabled=${e.disabled?`true`:y}
?data-selected=${t}
?data-highlighted=${n}
?data-disabled=${r}
data-value=${e.value}
data-text-value=${e.textValue??y}
>
<span class="itemText">${e.label}</span>
${t?b`<span class="itemIndicator" aria-hidden="true"
>${qn}</span
>`:y}
</div>`}renderDataOptions(){return(this.options??[]).map((e,t)=>{if(!ba(e))return this.renderDataOption(e);let n=`group-label-${t}`;return b`<div role="group" aria-labelledby=${n}>
<div id=${n} class="label" part="group-label">${e.label}</div>
${e.options.map(e=>this.renderDataOption(e))}
</div>`})}render(){let e=this.isDisabled,t=this.value===``,n=t?void 0:this.items.find(e=>e.value===this.value),r=this.aria.label,{side:i,align:a}=s(this.floating.position.placement);return b`<button
part="root"
type="button"
role="combobox"
aria-haspopup="listbox"
aria-expanded=${String(this.open)}
aria-controls=${this.open?`listbox`:y}
aria-autocomplete="none"
aria-label=${r??y}
aria-description=${this.aria.description??y}
aria-required=${this.required?`true`:y}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:y}
?disabled=${e}
data-state=${this.open?`open`:`closed`}
?data-placeholder=${t}
data-component="select"
class=${w({trigger:!0,[this.size]:!0,invalid:this.invalid})}
@click=${()=>this.requestOpen(!this.open)}
@keydown=${this.handleTriggerKeyDown}
@keyup=${e=>{e.key===` `&&e.preventDefault()}}
>
<span class="value" part="value"
><span
>${t?this.placeholder:n?.label??this.value}</span
></span
>
<span class="icon" part="icon" aria-hidden="true"
>${vr}</span
>
</button>
${this.open?b`<div class="positioner" popover="manual" data-side=${i}>
<div
id="listbox"
part="content"
role="listbox"
tabindex="-1"
aria-label=${r??y}
data-state="open"
data-side=${i}
data-align=${a}
class="content"
@keydown=${this.handleListboxKeyDown}
@pointermove=${this.handleListboxPointerMove}
@click=${this.handleListboxClick}
>
${this.renderDataOptions()}
<slot></slot>
</div>
</div>`:y}`}},H([S({attribute:!1})],wa.prototype,`value`,void 0),H([S({attribute:`value`})],wa.prototype,`defaultValue`,void 0),H([S({attribute:!1})],wa.prototype,`options`,void 0),H([S({type:Boolean,reflect:!0})],wa.prototype,`open`,void 0),H([S()],wa.prototype,`placeholder`,void 0),H([S({reflect:!0})],wa.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],wa.prototype,`invalid`,void 0),H([v()],wa.prototype,`highlighted`,void 0),H([C(`.trigger`)],wa.prototype,`trigger`,void 0),H([C(`.positioner`)],wa.prototype,`positioner`,void 0),H([C(`[role=listbox]`)],wa.prototype,`listbox`,void 0)})))()}var Ea,Da,Oa,ka,Aa;function ja(){return(ja=e((()=>{I(),z(),k(),B(),N(),en(),g(),_(),x(),ft(),Ea=e=>e==null||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Da=e=>typeof e!=`number`&&!/^\d+(\.\d+)?$/.test(e)?e:`var(--space-${String(e).replace(`.`,`-`)})`,Oa=[M,E`

:host(:dir(rtl)) .animation-wave{
animation-direction: reverse;
}
`],ka=class e extends D{constructor(...e){super(...e),this.variant=`text`,this.animation=`pulse`,this.loaded=!1,this.decorative=!1,this.lines=1,this.avatar=!1,this.avatarSize=`40`,this.avatarShape=`circle`,this.active=!1,this.paragraph=!1,this.heading=!1,this.locale=new A(this),this.aria=new L(this)}static{this.tagName=`minerva-skeleton`}static{this.styles=[...Oa,E`
:host{
display: block;
}
:host([decorative][variant="circular"]){
display: inline-block;
vertical-align: middle;
}
`,O(Wt)]}hookStates(){return{variant:this.variant}}updated(t){P&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&V(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}block(e,t,n={}){return b`<div
part=${e}
class=${w({skeleton:!0,[`animation-${this.animation}`]:!0,...t})}
style=${T(n)}
></div>`}renderAvatar(){if(!this.avatar)return y;let e=Ea(this.avatarSize);return this.block(`avatar`,{avatar:!0,[`avatar-${this.avatarShape}`]:!0},{width:e,height:e})}renderTitle(){return this.heading?this.block(`title`,{title:!0}):y}renderParagraph(){return this.paragraph?b`<div class="paragraph">
${[`100%`,`100%`,`92%`,`60%`].map(e=>this.block(`line`,{},{width:e,height:`16px`}))}
</div>`:y}renderLines(){if(this.paragraph||this.heading)return y;let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return Array.from({length:e},()=>this.block(`line`,{[this.variant]:!0},{width:Ea(this.width),height:Ea(this.height),borderRadius:Ea(this.borderRadius)}))}render(){if(this.loaded)return b`<slot></slot>`;if(this.decorative){let e=this.variant===`circular`?Ea(this.size??this.width??`32`):void 0;return b`<span
part="root"
aria-hidden="true"
class=${w({skeleton:!0,decorative:!0,[this.variant]:!0,[`animation-${this.animation}`]:!0})}
style=${T({width:e??Ea(this.width),height:e??Ea(this.height),borderRadius:Ea(this.borderRadius)})}
></span>`}let e=this.variant===`card`?b`<div class=${w({card:!0,active:this.active})}>
${this.renderAvatar()}
<div class="cardContent">
${this.renderTitle()} ${this.renderParagraph()}
</div>
</div>`:b`${this.renderAvatar()}
<div class="content">
${this.renderTitle()} ${this.renderLines()}
${this.renderParagraph()}
</div>`;return b`<div
part="root"
role="status"
aria-busy="true"
aria-label=${this.aria.label??this.locale.t(`common.loading`)}
class=${w({skeletonRoot:!0,withAvatar:this.avatar})}
>
${e}
</div>`}},H([S({reflect:!0})],ka.prototype,`variant`,void 0),H([S({reflect:!0})],ka.prototype,`animation`,void 0),H([S({type:Boolean,reflect:!0})],ka.prototype,`loaded`,void 0),H([S({type:Boolean,reflect:!0})],ka.prototype,`decorative`,void 0),H([S()],ka.prototype,`size`,void 0),H([S()],ka.prototype,`width`,void 0),H([S()],ka.prototype,`height`,void 0),H([S({attribute:`border-radius`})],ka.prototype,`borderRadius`,void 0),H([S({type:Number})],ka.prototype,`lines`,void 0),H([S({type:Boolean})],ka.prototype,`avatar`,void 0),H([S({attribute:`avatar-size`})],ka.prototype,`avatarSize`,void 0),H([S({attribute:`avatar-shape`})],ka.prototype,`avatarShape`,void 0),H([S({type:Boolean})],ka.prototype,`active`,void 0),H([S({type:Boolean})],ka.prototype,`paragraph`,void 0),H([S({type:Boolean})],ka.prototype,`heading`,void 0),Aa=class e extends D{constructor(...e){super(...e),this.lines=3,this.lineHeight=`1em`,this.gap=`2`,this.noShrinkLast=!1,this.animation=`pulse`}static{this.tagName=`minerva-skeleton-text`}static{this.styles=[...Oa,E`
:host{
display: block;
}
`,O(Wt)]}updated(t){P&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&V(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}render(){let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return b`<div
part="root"
aria-hidden="true"
class="skeletonText"
style=${T({gap:Da(this.gap)})}
>
${Array.from({length:e},(t,n)=>b`<span
part="line"
class="skeleton decorative text animation-${this.animation}"
style=${T({height:Ea(this.lineHeight),width:!this.noShrinkLast&&n===e-1?`70%`:`100%`})}
></span>`)}
</div>`}},H([S({type:Number})],Aa.prototype,`lines`,void 0),H([S({attribute:`line-height`})],Aa.prototype,`lineHeight`,void 0),H([S()],Aa.prototype,`gap`,void 0),H([S({type:Boolean,attribute:`no-shrink-last`})],Aa.prototype,`noShrinkLast`,void 0),H([S({reflect:!0})],Aa.prototype,`animation`,void 0)})))()}var Ma,Na,Pa,Fa,q;function Ia(){return(Ia=e((()=>{I(),k(),At(),B(),N(),Bt(),Cn(),g(),_(),x(),ft(),p(),h(),Ma={fromAttribute(e){if(e===null||e.trim()===``)return;let t=e.split(`,`).map(e=>Number(e.trim()));return t.length>=2?[t[0],t[1]]:t[0]},toAttribute(e){return e===void 0?null:Array.isArray(e)?e.join(`,`):String(e)}},Na={fromAttribute(e){if(e===null)return 1;let t=Number(e);return e.trim()===``||!Number.isFinite(t)?null:t},toAttribute(e){return e===null?`null`:String(e)}},Pa={fromAttribute(e){if(e===null)return!1;let t=e.trim();if(t.startsWith(`[`))try{return JSON.parse(t)}catch{return!1}return t!==`false`}},Fa=e=>String(e),q=class extends F{constructor(...e){super(...e),this.value=void 0,this.defaultValue=void 0,this.range=!1,this.min=0,this.max=100,this.step=1,this.marks=!1,this.snapToMarks=!1,this.readOnly=!1,this.invalid=!1,this.size=`medium`,this.color=`primary`,this.showValue=!1,this.tooltip=!1,this.orientation=`horizontal`,this.formatValue=void 0,this.getAriaValueText=void 0,this.dragging=null,this.dirty=!1,this.locale=new A(this),this.aria=new L(this,()=>this.labels)}static{this.tagName=`minerva-slider`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,E`
:host{
display: block;
}
:host([orientation="vertical"]){
display: inline-block;
}
`,O(xn)]}get scale(){return{min:this.min,max:this.max,step:this.step,marks:se(this.marks,this.min,this.max,this.step),snapToMarks:this.snapToMarks}}get resolvedValue(){return a(this.value,this.range,this.scale)}get blocked(){return this.isDisabled||this.readOnly}focus(e){this.renderRoot.querySelector(`[role="slider"]`)?.focus(e)}blur(){(this.shadowRoot?.activeElement)?.blur()}getFormValue(){let e=this.resolvedValue;if(!Array.isArray(e))return String(e);if(!this.name)return null;let t=new FormData;for(let n of e)t.append(this.name,String(n));return t}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){if(typeof e==`string`)this.value=Number(e);else if(e instanceof FormData&&this.name){let[t,n]=e.getAll(this.name).map(Number);this.value=[t,n]}}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&(this.value=this.defaultValue)}format(e){return(this.formatValue??Fa)(e)}setValue(e){return!l(e,this.resolvedValue)&&(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-change`,{value:e}),!0)}commit(){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change-end`,{value:this.resolvedValue})}valueAtPointer(e){let t=this.control.getBoundingClientRect(),n;return this.orientation===`vertical`?n=t.height?(t.bottom-e.clientY)/t.height:0:(n=t.width?(e.clientX-t.left)/t.width:0,ae(this)===`rtl`&&(n=1-n)),Ie(n,this.scale)}handlePointerDown(e){if(this.blocked||e.button!==0)return;e.preventDefault();let t=this.valueAtPointer(e),n=e.target.closest(`[data-index]`)?.dataset.index,r=n===void 0?Pe(this.resolvedValue,t):Number(n);e.currentTarget.setPointerCapture?.(e.pointerId),this.dragging=r,this.renderRoot.querySelector(`[data-index="${r}"]`)?.focus(),n===void 0&&this.setValue(it(this.resolvedValue,r,t))}handlePointerMove(e){this.dragging!==null&&this.setValue(it(this.resolvedValue,this.dragging,this.valueAtPointer(e)))}handlePointerEnd(e){if(this.dragging===null)return;let t=e.currentTarget;t.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),this.dragging=null,this.commit()}handleKeyDown(e,t){if(this.blocked)return;let n=this.orientation===`vertical`?e.key:we(e.key,this),r=ie(this.resolvedValue),i=Ae(n,r[t],this.scale);i!==null&&(e.preventDefault(),this.setValue(it(this.resolvedValue,t,i))&&this.commit())}hookStates(){return{disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,dragging:this.dragging!==null,size:this.size,color:this.color,orientation:this.orientation,variant:this.range?`range`:`single`}}labelOf(e){let t=this.aria.label;if(!this.range)return t;let n=this.locale.t(e===0?`slider.minimum`:`slider.maximum`);return t?`${t} ${n}`:n}render(){let e=this.resolvedValue,t=ie(e),{min:n,max:r,orientation:a}=this,o=a===`vertical`,s=se(this.marks,n,r,this.step),c=this.isDisabled,l=this.invalid||this.aria.attr(`aria-invalid`)===`true`,u=e=>i(e,n,r),d=e=>T(o?{bottom:`${e}%`}:{"inset-inline-start":`${e}%`}),ee=this.range?u(t[0]):0,te=u(t[t.length-1]),ne=T(o?{bottom:`${ee}%`,height:`${te-ee}%`}:{"inset-inline-start":`${ee}%`,width:`${te-ee}%`});return b`<div
part="root"
class=${w({slider:!0,[this.size]:!0,[this.color]:!0,vertical:o,labelled:s.some(e=>e.label),disabled:c,readOnly:this.readOnly,dragging:this.dragging!==null})}
>
<div
part="control"
class="control"
@pointerdown=${this.handlePointerDown}
@pointermove=${this.handlePointerMove}
@pointerup=${this.handlePointerEnd}
@pointercancel=${this.handlePointerEnd}
>
<span part="rail" class="rail"></span>
<span part="range" class="range" style=${ne}></span>
${s.map(t=>{let i=tt(t.value,e);return b`<span
part=${Yn(`mark`,{state:i?`active`:`inactive`})}
class=${w({mark:!0,markActive:i})}
style=${d(u(t.value))}
aria-hidden="true"
>${t.label?b`<span
part="mark-label"
class=${w({markLabel:!0,markLabelStart:t.value<=n,markLabelEnd:t.value>=r})}
>${t.label}</span
>`:y}</span
>`})}
${t.map((e,i)=>{let o=this.dragging===i;return b`<span
part=${Yn(`thumb`,{dragging:o,disabled:c})}
class=${w({thumb:!0,thumbDragging:o})}
style=${d(u(e))}
data-index=${i}
role="slider"
tabindex=${c?`-1`:`0`}
aria-label=${this.labelOf(i)??y}
aria-description=${this.aria.description??y}
aria-valuemin=${String(this.range&&i===1?t[0]:n)}
aria-valuemax=${String(this.range&&i===0?t[1]:r)}
aria-valuenow=${String(e)}
aria-valuetext=${this.getAriaValueText?this.getAriaValueText(e,i):this.format(e)}
aria-orientation=${a}
aria-disabled=${c?`true`:y}
aria-readonly=${this.readOnly?`true`:y}
aria-invalid=${l?`true`:y}
@keydown=${e=>this.handleKeyDown(e,i)}
>${this.tooltip?b`<span part="tooltip" class="tooltip" aria-hidden="true"
>${this.format(e)}</span
>`:y}</span
>`})}
</div>
${this.showValue?b`<span part="value" class="value" aria-hidden="true"
>${t.map(e=>this.format(e)).join(` – `)}</span
>`:y}
</div>`}},H([S({attribute:!1})],q.prototype,`value`,void 0),H([S({attribute:`value`,converter:Ma})],q.prototype,`defaultValue`,void 0),H([S({type:Boolean,reflect:!0})],q.prototype,`range`,void 0),H([S({type:Number})],q.prototype,`min`,void 0),H([S({type:Number})],q.prototype,`max`,void 0),H([S({converter:Na})],q.prototype,`step`,void 0),H([S({converter:Pa})],q.prototype,`marks`,void 0),H([S({type:Boolean,attribute:`snap-to-marks`})],q.prototype,`snapToMarks`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],q.prototype,`readOnly`,void 0),H([S({type:Boolean,reflect:!0})],q.prototype,`invalid`,void 0),H([S({reflect:!0})],q.prototype,`size`,void 0),H([S({reflect:!0})],q.prototype,`color`,void 0),H([S({type:Boolean,attribute:`show-value`})],q.prototype,`showValue`,void 0),H([S({type:Boolean})],q.prototype,`tooltip`,void 0),H([S({reflect:!0})],q.prototype,`orientation`,void 0),H([S({attribute:!1})],q.prototype,`formatValue`,void 0),H([S({attribute:!1})],q.prototype,`getAriaValueText`,void 0),H([v()],q.prototype,`dragging`,void 0),H([C(`.control`)],q.prototype,`control`,void 0)})))()}var La,Ra;function za(){return(za=e((()=>{z(),B(),Vt(),N(),Nr(),qt(),g(),_(),x(),ft(),La=320,Ra=class e extends D{constructor(...e){super(...e),this.asideWidth=La,this.collapseBelow=`md`,this.gap=6,this.slots=new bn(this)}static{this.tagName=`minerva-split-layout`}static{this.styles=[M,E`
:host{
display: block;
min-width: 0;
}
`,O(Sn)]}get validAsideWidth(){return Number.isFinite(this.asideWidth)&&this.asideWidth>0}updated(){P&&!this.validAsideWidth&&V(e.tagName,`aside-width must be a finite positive number (got ${String(this.asideWidth)}); using ${La}.`)}render(){let e=this.slots.test(`aside`),t=this.validAsideWidth?this.asideWidth:La;return b`<div
class="root"
part="root"
style=${T({"--split-layout-aside-width":`${t}px`,"--split-layout-gap":_e(this.gap)})}
>
<div
class=${w({grid:!0,[this.collapseBelow]:!0,hasAside:e})}
>
<div class="main" part="main"><slot></slot></div>
${e?b`<div class="aside" part="aside">
<slot name="aside"></slot>
</div>`:y}
</div>
</div>`}},H([S({type:Number,attribute:`aside-width`})],Ra.prototype,`asideWidth`,void 0),H([S({attribute:`collapse-below`,reflect:!0})],Ra.prototype,`collapseBelow`,void 0),H([S({converter:Fr})],Ra.prototype,`gap`,void 0)})))()}var Ba,Va,Ha,Ua,Wa,Ga,Ka,qa;function Ja(){return(Ja=e((()=>{I(),z(),B(),Vt(),N(),Nr(),Mt(),g(),_(),x(),ft(),Ba={start:`flex-start`,center:`center`,end:`flex-end`,stretch:`stretch`,baseline:`baseline`},Va={start:`flex-start`,center:`center`,end:`flex-end`,between:`space-between`,around:`space-around`,evenly:`space-evenly`},Ha=()=>typeof HTMLSlotElement<`u`&&typeof HTMLSlotElement.prototype.assign==`function`,Ua=`minerva-stack-item-`,Wa=e=>Array.from(e.childNodes).filter(e=>e.nodeType===1||e.nodeType===3&&!!e.textContent?.trim()),Ga=class extends D{constructor(...e){super(...e),this.direction=`column`,this.wrap=!1,this.attached=!1,this.aria=new L(this),this.slots=new bn(this),this.manualSlots=!1,this.fallbackSlotted=new Set}static{this.tagName=`minerva-stack`}static{this.styles=[M,E`
:host{
display: block;
min-width: 0;
}

.attached ::slotted(*){
position: relative;
margin: 0;
}
.attached ::slotted(:hover),
.attached ::slotted(:focus-visible),
.attached ::slotted(:focus-within){
z-index: 1;
}
.attached.row ::slotted(:not(:first-child)){
margin-inline-start: -1px;
}
.attached.row-reverse ::slotted(:not(:first-child)){
margin-inline-end: -1px;
}
.attached.row ::slotted(:not(:first-child)),
.attached.row-reverse ::slotted(:not(:last-child)){
border-start-start-radius: 0;
border-end-start-radius: 0;
}
.attached.row ::slotted(:not(:last-child)),
.attached.row-reverse ::slotted(:not(:first-child)){
border-start-end-radius: 0;
border-end-end-radius: 0;
}
.attached.column ::slotted(:not(:first-child)){
margin-block-start: -1px;
}
.attached.column-reverse ::slotted(:not(:first-child)){
margin-block-end: -1px;
}
.attached.column ::slotted(:not(:first-child)),
.attached.column-reverse ::slotted(:not(:last-child)){
border-start-start-radius: 0;
border-start-end-radius: 0;
}
.attached.column ::slotted(:not(:last-child)),
.attached.column-reverse ::slotted(:not(:first-child)){
border-end-start-radius: 0;
border-end-end-radius: 0;
}
`,O(Ar)]}get resolvedDirection(){return this.direction}get resolvedAlign(){return this.align}createRenderRoot(){if(!this.shadowRoot){this.manualSlots=Ha();let e=this.constructor;this.attachShadow({...e.shadowRootOptions,slotAssignment:this.manualSlots?`manual`:`named`})}return super.createRenderRoot()}renderSeparator(){let e=this.separator;return typeof e==`function`?e():e}get hasSeparator(){let e=this.separator;return e!=null&&e!==``}fallbackItems(){return Array.from(this.children).filter(e=>{let t=e.getAttribute(`slot`);return t===null||this.fallbackSlotted.has(e)&&t!==``})}releaseFallbackSlots(e=[]){for(let t of this.fallbackSlotted)e.includes(t)||(t.getAttribute(`slot`)?.startsWith(Ua)&&t.removeAttribute(`slot`),this.fallbackSlotted.delete(t))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this.releaseFallbackSlots()}updated(){if(this.manualSlots){let e=Wa(this),t=Array.from(this.renderRoot.querySelectorAll(`slot`));t.length===1?t[0].assign(...e):t.forEach((t,n)=>t.assign(e[n]))}else if(this.hasSeparator){let e=this.fallbackItems();e.forEach((e,t)=>{let n=`${Ua}${t}`;this.fallbackSlotted.add(e),e.getAttribute(`slot`)!==n&&e.setAttribute(`slot`,n)}),this.releaseFallbackSlots(e)}else this.releaseFallbackSlots();P&&this.attached&&!this.aria.label&&V(this.constructor.tagName,`attached stacks are exposed as role="group": set aria-label (or aria-labelledby) to name the group.`)}renderItems(){return this.hasSeparator?this.manualSlots?Array.from({length:Wa(this).length},(e,t)=>b`${t>0?this.renderSeparator():y}<slot></slot>`):b`${Array.from({length:this.fallbackItems().length},(e,t)=>b`${t>0?this.renderSeparator():y}<slot
name=${`${Ua}${t}`}
></slot>`)}<slot></slot>`:b`<slot></slot>`}hookStates(){return{orientation:this.resolvedDirection.startsWith(`row`)?`horizontal`:`vertical`}}render(){this.slots;let e=this.resolvedDirection,t=this.resolvedAlign,n={};return this.gap!==void 0&&this.gap!==``&&!this.attached&&(n.gap=_e(this.gap)),t&&Ba[t]&&(n.alignItems=Ba[t]),this.justify&&Va[this.justify]&&(n.justifyContent=Va[this.justify]),b`<div
part="root"
class=${w({stack:!0,[e]:!0,wrap:this.wrap,attached:this.attached})}
style=${T(n)}
role=${this.attached?`group`:y}
aria-label=${this.attached?this.aria.label??y:y}
>
${this.renderItems()}
</div>`}},H([S({reflect:!0})],Ga.prototype,`direction`,void 0),H([S({converter:Fr})],Ga.prototype,`gap`,void 0),H([S({reflect:!0})],Ga.prototype,`align`,void 0),H([S({reflect:!0})],Ga.prototype,`justify`,void 0),H([S({type:Boolean,reflect:!0})],Ga.prototype,`wrap`,void 0),H([S({attribute:`separator`})],Ga.prototype,`separator`,void 0),H([S({type:Boolean,reflect:!0})],Ga.prototype,`attached`,void 0),Ka=class extends Ga{static{this.tagName=`minerva-hstack`}constructor(){super(),this.direction=`row`}get resolvedDirection(){return`row`}hookStates(){return{}}get resolvedAlign(){return this.align??`center`}},qa=class extends Ga{static{this.tagName=`minerva-vstack`}constructor(){super(),this.direction=`column`}get resolvedDirection(){return`column`}hookStates(){return{}}get resolvedAlign(){return this.align??`stretch`}}})))()}var Ya;function Xa(){return(Xa=e((()=>{I(),z(),k(),At(),B(),N(),hn(),g(),_(),x(),gt(),Ya=class e extends D{constructor(...e){super(...e),this.items=[],this.value=``,this.navigable=!1,this.locale=new A(this),this.aria=new L(this)}static{this.tagName=`minerva-steps`}static{this.styles=[M,E`
:host{
display: block;
}
`,O(nn)]}select(e){e.disabled||e.value===this.value||this.emit(`minerva-change`,{value:e.value},{cancelable:!0})&&(this.value=e.value)}updated(){P&&this.value&&this.items.length&&!this.items.some(e=>e.value===this.value)&&V(e.tagName,`value "${this.value}" matches no step: no step is marked current.`)}hookStates(){return{readonly:!this.navigable}}render(){let e=this.items??[],t=e.findIndex(e=>e.value===this.value),n=!this.navigable;return b`<ol
part="root"
class="steps"
aria-label=${this.aria.label??this.locale.t(`steps.label`)}
>
${pt(e,e=>e.value,(e,r)=>{let i=r===t,a=t>-1&&r<t,o=b`<span
part="indicator"
class="number"
aria-hidden="true"
>${r+1}</span
><span part="label" class="label">${e.label}</span>`,s=i?void 0:a?`complete`:`upcoming`;return b`<li
part=${Yn(`item`,{current:i,disabled:!n&&!!e.disabled,status:s})}
class=${w({step:!0,current:i,complete:a})}
aria-current=${n&&i?`step`:y}
>
${n?b`<span part="button" class="button static"
>${o}</span
>`:b`<button
type="button"
part="button"
class="button"
?disabled=${!!e.disabled}
aria-current=${i?`step`:y}
@click=${()=>this.select(e)}
>
${o}
</button>`}
</li>`})}
</ol>`}},H([S({attribute:!1})],Ya.prototype,`items`,void 0),H([S({reflect:!0})],Ya.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0})],Ya.prototype,`navigable`,void 0)})))()}var Za,Qa,J;function $a(){return($a=e((()=>{I(),z(),k(),B(),Vt(),N(),Bt(),Xt(),g(),_(),x(),ht(),Za=400,Qa={start:`labelStart`,end:`labelEnd`,top:`labelTop`,bottom:`labelBottom`},J=class e extends F{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.value=`on`,this.label=``,this.offLabel=``,this.onLabel=``,this.variant=`slider`,this.size=`medium`,this.color=`primary`,this.shape=`round`,this.labelPlacement=`end`,this.iconPlacement=`start`,this.loading=!1,this.noRipple=!1,this.readOnly=!1,this.invalid=!1,this.rippleActive=!1,this.dirty=!1,this.locale=new A(this),this.aria=new L(this,()=>this.labels),this.slots=new bn(this)}static{this.tagName=`minerva-switch`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,E`
:host{
display: inline-flex;
vertical-align: middle;
}
`,O(Ht)]}get bilateral(){return!!this.offLabel&&!!this.onLabel}get segmented(){return this.variant===`segmented`&&this.bilateral}get blocked(){return this.isDisabled||this.loading||this.readOnly}focus(e){if(this.segmented){this.renderRoot.querySelector(`.segmentActive`)?.focus(e);return}this.input?.focus(e)}blur(){(this.shadowRoot?.activeElement)?.blur()}click(){this.input?.click()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(t){t.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked),P&&t.has(`variant`)&&this.variant===`segmented`&&!this.bilateral&&V(e.tagName,`variant="segmented" needs both off-label and on-label; rendering a slider.`)}handleChange(){if(this.blocked){this.input.checked=this.checked;return}this.dirty=!0,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value})}handleKeyDown(e){e.key===`Enter`&&(e.preventDefault(),!this.blocked&&this.input.click())}handleClick(e){if(this.readOnly){e.preventDefault();return}this.noRipple||this.blocked||(clearTimeout(this.rippleTimer),this.rippleActive=!0,this.rippleTimer=setTimeout(()=>this.rippleActive=!1,Za))}setState(e){this.blocked||e===this.checked||this.input.click()}hookStates(){return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,loading:this.loading,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape,variant:this.segmented?`segmented`:`slider`}}renderInput(e){let t=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return b`<input
part="input"
type="checkbox"
role=${e?y:`switch`}
class=${e?`hiddenInput`:``}
.checked=${mt(this.checked)}
?disabled=${this.isDisabled||this.loading}
?required=${this.required}
tabindex=${e?`-1`:y}
aria-hidden=${e?`true`:y}
aria-label=${e?y:this.aria.label??y}
aria-description=${e?y:this.aria.description??y}
aria-checked=${e?y:String(this.checked)}
aria-disabled=${!e&&(this.isDisabled||this.loading)?`true`:y}
aria-busy=${this.loading?`true`:y}
aria-invalid=${!e&&t?`true`:y}
aria-readonly=${!e&&this.readOnly?`true`:y}
aria-required=${!e&&this.required?`true`:y}
@change=${this.handleChange}
@click=${this.handleClick}
@keydown=${this.handleKeyDown}
/>`}render(){let e=this.blocked,t=this.isDisabled;if(this.segmented)return b`<span
part="root"
role="group"
aria-label=${this.aria.label??y}
aria-description=${this.aria.description??y}
aria-disabled=${e?`true`:y}
class=${w({segmented:!0,[this.size]:!0,[this.color]:!0,disabled:e})}
>
${this.renderInput(!0)}
${[!1,!0].map(t=>{let n=this.checked===t;return b`<button
part="segment"
type="button"
class=${w({segment:!0,segmentActive:n})}
?disabled=${e}
aria-pressed=${String(n)}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`})}
</span>`;let n=this.bilateral,r=this.slots.test(`icon`),i=w({switch:!0,[this.size]:!0,[Qa[this.labelPlacement]]:!n,[this.color]:!0,checked:this.checked,checkedLarge:this.checked&&this.size===`large`,disabled:t,loading:this.loading,square:this.shape===`square`,ripple:!this.noRipple&&this.rippleActive,bilateral:n}),a=b`<span class="switchBase" part="control">
${this.renderInput(!1)}
<span class="track" part="track"></span>
<span class="thumb" part="thumb"
>${this.iconPlacement===`start`&&r?b`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:y}</span
>
${this.noRipple?y:b`<span class="rippleEffect"></span>`}
</span>`,o=this.iconPlacement===`end`&&r?b`<span class="icon" part="icon"><slot name="icon"></slot></span>`:y;if(n){let t=t=>b`<button
part="side"
type="button"
class=${w({side:!0,sideActive:this.checked===t})}
?disabled=${e}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`;return b`<span part="root" class=${i}
>${t(!1)}${a}${t(!0)}${o}</span
>`}let s=this.label||this.slots.test(`[default]`)?b`<span class="label" part="label"
>${this.label||b`<slot></slot>`}</span
>`:y,c=this.labelPlacement===`start`||this.labelPlacement===`top`;return b`<label part="root" class=${i}
>${c?s:y}${a}${o}${c?y:s}</label
>`}},H([S({attribute:!1})],J.prototype,`checked`,void 0),H([S({type:Boolean,attribute:`checked`,reflect:!0})],J.prototype,`defaultChecked`,void 0),H([S()],J.prototype,`value`,void 0),H([S()],J.prototype,`label`,void 0),H([S({attribute:`off-label`})],J.prototype,`offLabel`,void 0),H([S({attribute:`on-label`})],J.prototype,`onLabel`,void 0),H([S({reflect:!0})],J.prototype,`variant`,void 0),H([S({reflect:!0})],J.prototype,`size`,void 0),H([S({reflect:!0})],J.prototype,`color`,void 0),H([S({reflect:!0})],J.prototype,`shape`,void 0),H([S({attribute:`label-placement`,reflect:!0})],J.prototype,`labelPlacement`,void 0),H([S({attribute:`icon-placement`})],J.prototype,`iconPlacement`,void 0),H([S({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),H([S({type:Boolean,attribute:`no-ripple`})],J.prototype,`noRipple`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],J.prototype,`readOnly`,void 0),H([S({type:Boolean,reflect:!0})],J.prototype,`invalid`,void 0),H([v()],J.prototype,`rippleActive`,void 0),H([C(`input`)],J.prototype,`input`,void 0)})))()}var eo,to,no,ro,io;function ao(){return(ao=e((()=>{pr(),I(),z(),Mr(),on(),B(),N(),Zr(),Xi(),fn(),g(),_(),x(),h(),eo=0,to=e=>e.parentElement?.closest(`minerva-tabs`)??null,no=class e extends D{constructor(...e){super(...e),this.variant=`line`,this.color=`primary`,this.orientation=`horizontal`,this.activationMode=`automatic`,this.noLoop=!1,this.label=``,this.aria=new L(this),this.baseId=`minerva-tabs-${++eo}`,this.rovingKey=``,this.observer=null,this.settleQueued=!1,this.roving=new Yi(this,()=>({getItems:()=>this.tabs,orientation:this.orientation,dir:ae(this),loop:!this.noLoop})),this.machine=new Xr(this,at(this.tabsProps()),()=>!1),this.handleKeyDownCapture=()=>this.ensureRoving(),this.handleFocusIn=e=>{let t=this.tabs.find(t=>t===e.target);t&&this.send({type:`FOCUS`,value:t.value,disabled:t.disabled})}}static{this.tagName=`minerva-tabs`}static{this.styles=[M,E`
:host{
display: block;
min-width: 0;
}
`,O(sn)]}get tabs(){return Array.from(this.querySelectorAll(`minerva-tab`)).filter(e=>to(e)===this)}get panels(){return Array.from(this.querySelectorAll(`minerva-tab-panel`)).filter(e=>to(e)===this)}tabsProps(){return{value:this.value,activationMode:this.activationMode,onValueChange:e=>this.apply(e)}}send(e){this.machine.sync(this.tabsProps()),this.machine.send(e)}apply(e){this.emit(`minerva-change`,{value:e},{cancelable:!0})&&(this.value=e)}select(e){this.send({type:`SELECT`,value:e,disabled:!1})}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`value`,`disabled`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.rovingKey=``}updated(t){t.has(`value`)&&P&&this.value!==void 0&&this.tabs.length>0&&!this.tabs.some(e=>e.value===this.value)&&V(e.tagName,`value "${this.value}" does not match any <minerva-tab>.`),this.sync()}ensureRoving(){if(!this.tablist)return;let e=`${this.orientation}|${ae(this)}|${this.noLoop}`;e!==this.rovingKey&&(this.rovingKey=e,this.roving.detach(),this.roving.attach(this.tablist))}sync(){if(!this.tablist)return;let e=this.tabs,t=this.panels,n=new Map;for(let t of e)n.set(t,t.id||`${this.baseId}-tab-${t.value}`),t.id||j(t,`id`,n.get(t),this);for(let e of t)n.set(e,e.id||`${this.baseId}-panel-${e.value}`),e.id||j(e,`id`,n.get(e),this);for(let r of e){let e=t.find(e=>e.value===r.value);r.sync(this,r.value===this.value,e&&n.get(e))}for(let r of t){let t=e.find(e=>e.value===r.value);r.sync(this,r.value===this.value,t&&n.get(t))}let r=[this,...e,...t].find(Kt);if(r){this.settleQueued||(this.settleQueued=!0,tn(r,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.ensureRoving();let i=ot(e,this.value);i?this.roving.setActive(i,{focus:!1}):this.roving.refresh()}hookStates(){return{orientation:this.orientation,variant:this.variant,color:this.color}}render(){return b`<div
part="root"
class=${w({tabs:!0,[this.color]:!0,vertical:this.orientation===`vertical`})}
data-orientation=${this.orientation}
@keydown=${{handleEvent:this.handleKeyDownCapture,capture:!0}}
>
<div
part="list"
role="tablist"
aria-label=${this.label||this.aria.label||y}
aria-orientation=${this.orientation}
data-orientation=${this.orientation}
class=${w({list:!0,[`${this.variant}List`]:!0,verticalList:this.orientation===`vertical`})}
@focusin=${this.handleFocusIn}
>
<slot name="tab" @slotchange=${()=>this.sync()}></slot>
</div>
<slot @slotchange=${()=>this.sync()}></slot>
</div>`}},H([S({reflect:!0})],no.prototype,`value`,void 0),H([S({reflect:!0})],no.prototype,`variant`,void 0),H([S({reflect:!0})],no.prototype,`color`,void 0),H([S({reflect:!0})],no.prototype,`orientation`,void 0),H([S({reflect:!0,attribute:`activation-mode`})],no.prototype,`activationMode`,void 0),H([S({type:Boolean,reflect:!0,attribute:`no-loop`})],no.prototype,`noLoop`,void 0),H([S()],no.prototype,`label`,void 0),H([C(`[role="tablist"]`)],no.prototype,`tablist`,void 0),ro=class extends D{constructor(...e){super(...e),this.internals=cn(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.selected=!1,this.group=null,this.handleMouseDown=e=>{if(this.disabled){e.preventDefault();return}e.button===0&&!e.ctrlKey?this.select():e.preventDefault()},this.handleKeyDown=e=>{e.defaultPrevented||this.disabled||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),this.select())},this.handleClick=e=>{!this.disabled&&e.detail===0&&this.select()}}static{this.tagName=`minerva-tab`}static{this.styles=[M,E`
:host{
display: inline-flex;
flex: 0 0 auto;
min-width: 0;
max-width: 100%;
outline: none;
}
:host([disabled]){
pointer-events: none;
}
.trigger{
width: 100%;
}
.verticalTrigger{
justify-content: flex-start;
}
:host(:focus-visible) .trigger{
outline: var(--focus-ring-width) solid var(--tabs-accent);
outline-offset: -2px;
}
:host([disabled]) .trigger{
opacity: 0.5;
cursor: not-allowed;
}
`,O(sn)]}sync(e,t,n){this.group=e,this.selected=t,j(this,`aria-controls`,n??null),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.hasAttribute(`slot`)||j(this,`slot`,`tab`),Yt(this,this.internals,{role:`tab`},this.ownedAria),this.addEventListener(`mousedown`,this.handleMouseDown),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`mousedown`,this.handleMouseDown),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.group=null}select(){(this.group??to(this))?.select(this.value)}updated(){Yt(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),j(this,`data-state`,this.selected?`active`:`inactive`),j(this,`data-disabled`,this.disabled);let e=this.group?.orientation??`horizontal`;j(this,`data-orientation`,e)}hookStates(){return{state:this.selected?`active`:`inactive`,disabled:this.disabled,orientation:this.group?.orientation??`horizontal`,variant:this.group?.variant??`line`,color:this.color}}render(){let e=this.group,t=e?.variant??`line`,n=e?.orientation===`vertical`;return b`<span
part="root"
class=${w({trigger:!0,[`${t}Trigger`]:!0,verticalTrigger:n,[this.color??``]:!!this.color,colored:!!this.color})}
data-state=${this.selected?`active`:`inactive`}
data-orientation=${e?.orientation??`horizontal`}
><slot></slot
></span>`}},H([S({reflect:!0})],ro.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0})],ro.prototype,`disabled`,void 0),H([S({reflect:!0})],ro.prototype,`color`,void 0),H([S({type:Boolean,reflect:!0})],ro.prototype,`selected`,void 0),io=class extends D{constructor(...e){super(...e),this.internals=cn(this),this.value=``,this.forceMount=!1,this.orientation=`horizontal`,this.selected=!1,this.stamped=[]}static{this.tagName=`minerva-tab-panel`}static{this.styles=[M,E`
:host{
display: block;
flex: 1;
min-width: 0;
outline: none;
}
:host(:focus-visible) .panel{
outline: var(--focus-ring-width) solid var(--primary-color);
outline-offset: var(--focus-ring-offset);
}
`,O(sn)]}get template(){return Array.from(this.children).find(e=>e instanceof HTMLTemplateElement)??null}syncContent(){if(Kt(this))return;let e=this.template;if(this.selected||this.forceMount){if(e&&!this.stamped.length){let t=this.ownerDocument.importNode(e.content,!0);this.stamped=Array.from(t.childNodes),e.after(t)}return}for(let e of this.stamped)e.parentNode?.removeChild(e);this.stamped=[]}sync(e,t,n){this.orientation=e.orientation,this.selected=t,j(this,`hidden`,!t),this.syncContent(),j(this,`data-state`,t?`active`:`inactive`),j(this,`data-orientation`,e.orientation),j(this,`aria-labelledby`,n??null),this.requestUpdate()}willUpdate(e){e.has(`forceMount`)&&this.hasUpdated&&this.syncContent()}connectedCallback(){super.connectedCallback(),Yt(this,this.internals,{role:`tabpanel`}),this.hasAttribute(`tabindex`)||j(this,`tabindex`,`0`)}hookStates(){return{state:this.selected?`active`:`inactive`,orientation:this.orientation}}render(){return b`<div
part="root"
class="panel"
data-orientation=${this.orientation}
?hidden=${!this.selected&&Kt(this)&&!!to(this)}
>
<slot></slot>
</div>`}},H([S({reflect:!0})],io.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0,attribute:`force-mount`})],io.prototype,`forceMount`,void 0)})))()}var oo,Y;function so(){return(so=e((()=>{I(),z(),R(),k(),B(),Vt(),N(),an(),g(),_(),x(),ft(),gt(),oo=600,Y=class e extends D{constructor(...e){super(...e),this.color=`neutral`,this.variant=`subtle`,this.size=`medium`,this.shape=`rounded`,this.closable=!1,this.clickable=!1,this.toggle=!1,this.loading=!1,this.elevation=!1,this.disabled=!1,this.noRipple=!1,this.ripples=[],this.nextRippleId=0,this.rippleTimers=new Set,this.locale=new A(this),this.aria=new L(this),this.slots=new bn(this)}static{this.tagName=`minerva-tag`}static{this.shadowRootOptions={...D.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,E`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
.closeIcon svg{
display: block;
}
`,O(Jn)]}focus(e){(this.actionButton??this.closeButton)?.focus(e)}disconnectedCallback(){super.disconnectedCallback(),this.rippleTimers.forEach(clearTimeout),this.rippleTimers.clear(),this.ripples=[]}labelText(){return Array.from(this.childNodes).filter(e=>e.nodeType===3||e.nodeType===1&&!e.hasAttribute(`slot`)).map(e=>e.textContent??``).join(``).replace(/\s+/g,` `).trim()}get inactive(){return this.disabled||this.loading}handleClick(e){this.inactive||(this.addRipple(e),this.toggle&&(this.pressed=!this.pressed,this.emit(`minerva-change`,{pressed:this.pressed})))}handleClose(e){e.stopPropagation(),!this.disabled&&this.emit(`minerva-close`,{})}addRipple(e){if(this.noRipple)return;let t=e.currentTarget.parentElement;if(!t)return;let n=t.getBoundingClientRect(),r=e.detail===0,i=Math.max(n.width,n.height),a=i/2,o=this.nextRippleId++,s=r?n.width/2-a:e.clientX-n.left-a,c=r?n.height/2-a:e.clientY-n.top-a;this.ripples=[...this.ripples,{id:o,style:{width:`${i}px`,height:`${i}px`,left:`${s}px`,top:`${c}px`}}];let l=setTimeout(()=>{this.rippleTimers.delete(l),this.ripples=this.ripples.filter(e=>e.id!==o)},oo);this.rippleTimers.add(l)}hookStates(){return{state:this.clickable&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){P&&(this.toggle||this.pressed!==void 0)&&!this.clickable&&V(e.tagName,`pressed / toggle require clickable: the tag is not a button otherwise.`)}render(){let e=this.toggle||this.pressed!==void 0,t=this.closable?this.labelText():``,n=this.closeLabel??(t?this.locale.t(`tag.closeWithLabel`,{label:t}):this.locale.t(`tag.close`)),r=b`${this.loading?b`<span
class="spinner"
part="spinner"
aria-hidden="true"
></span>`:b`${this.slots.test(`icon`)?b`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:y}${this.slots.test(`avatar`)?b`<span class="avatar" part="avatar"
><slot name="avatar"></slot
></span>`:y}`}<span class="content" part="label"><slot></slot></span>`;return b`<div
part="root"
class=${w({tag:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,[this.shape]:!0,clickable:this.clickable&&!this.inactive,pressed:this.clickable&&!!this.pressed,elevation:this.elevation,disabled:this.disabled,loading:this.loading})}
aria-busy=${this.loading?`true`:y}
data-component="tag"
>
${this.clickable?b`<button
type="button"
part="action"
class="action"
?disabled=${this.inactive}
aria-pressed=${e?String(!!this.pressed):y}
aria-label=${this.aria.label??y}
aria-description=${this.aria.description??y}
@click=${this.handleClick}
>
${r}
</button>`:r}
${this.closable&&!this.loading?b`<button
type="button"
part="close-button"
class="closeIcon"
?disabled=${this.disabled}
aria-label=${n}
title=${n}
@click=${this.handleClose}
>
<slot name="close-icon">${Hn}</slot>
</button>`:y}
${pt(this.ripples,e=>e.id,e=>b`<span class="ripple" style=${T(e.style)}></span>`)}
</div>`}},H([S({reflect:!0})],Y.prototype,`color`,void 0),H([S({reflect:!0})],Y.prototype,`variant`,void 0),H([S({reflect:!0})],Y.prototype,`size`,void 0),H([S({reflect:!0})],Y.prototype,`shape`,void 0),H([S({type:Boolean,reflect:!0})],Y.prototype,`closable`,void 0),H([S({type:Boolean,reflect:!0})],Y.prototype,`clickable`,void 0),H([S({type:Boolean,reflect:!0})],Y.prototype,`pressed`,void 0),H([S({type:Boolean,reflect:!0})],Y.prototype,`toggle`,void 0),H([S({type:Boolean,reflect:!0})],Y.prototype,`loading`,void 0),H([S({type:Boolean,reflect:!0})],Y.prototype,`elevation`,void 0),H([S({type:Boolean,reflect:!0})],Y.prototype,`disabled`,void 0),H([S({attribute:`close-label`})],Y.prototype,`closeLabel`,void 0),H([S({type:Boolean,attribute:`no-ripple`})],Y.prototype,`noRipple`,void 0),H([v()],Y.prototype,`ripples`,void 0),H([C(`.action`)],Y.prototype,`actionButton`,void 0),H([C(`.closeIcon`)],Y.prototype,`closeButton`,void 0)})))()}function co(e,t){try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>typeof e==`string`)}catch{}return P&&V(fo,`the ${t} attribute is not a JSON array of strings.`),null}function lo(e,t){let n=(e??``).trim();return n?n.startsWith(`[`)?co(n,t)??[]:n.split(`,`).map(e=>e.trim()).filter(Boolean):[]}function uo(e){let t=(e??``).trim();return t?t.startsWith(`[`)?co(t,`separators`)??[...ct]:t.split(/\s+/):[]}var fo,po,mo,ho,X;function go(){return(go=e((()=>{I(),z(),R(),k(),At(),B(),N(),Zn(),qr(),Er(),Bt(),an(),kt(),g(),_(),x(),p(),h(),ht(),gt(),fo=`minerva-tag-input`,po=`Enter`,mo=[`\r
`,`
`,`\r`],ho=0,X=class extends F{constructor(...e){super(...e),this._value=[],this.defaultValue=[],this.options=[],this.separators=[...ct],this.noCommitOnBlur=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.draft=``,this.requestedOpen=!1,this.highlight=0,this.listId=`minerva-tag-input-list-${ho++}`,this.locale=new A(this),this.aria=new L(this,()=>this.labels),this.floating=new Gr(this,()=>({anchor:()=>this.combobox,floating:()=>this.list,branches:()=>[this],placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`exact`,onDismiss:()=>this.setOpen(!1)})),this.dirty=!1,this.composing=!1,this.navigating=!1,this.highlightKey=``}static{this.tagName=fo}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,Kr,E`
:host{
display: block;
min-width: 0;
}
`,O(Jn),O(un),O(`.combobox { ${Ft.replace(/@charset[^;]*;/g,``)} }`),O(Xn),E`

.combobox > .root{
flex-direction: row;
gap: 0;
}

.list{
inset: auto;
}
`]}get value(){return this._value}set value(e){this.dirty=!0,this.setValue(e)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}setValue(e){let t=this._value;this._value=Array.isArray(e)?e.map(String):typeof e==`string`?lo(e,`value`):[],this.requestUpdate(`value`,t)}get blocked(){return this.isDisabled||this.readOnly}get isOpen(){return this.requestedOpen&&!this.blocked}get filtered(){let e=this.value,t=this.draft.trim(),n=[...new Set(this.options.map(e=>e.trim()).filter(Boolean))].filter(t=>!e.includes(t)),r=n.map(e=>({tag:e,label:e,filterValue:e}));t&&!e.includes(t)&&!n.includes(t)&&r.unshift({tag:t,label:this.createLabel?this.createLabel(t):this.locale.t(`tagInput.create`,{tag:t}),filterValue:t});let i=t.toLowerCase();return i?r.filter(e=>e.filterValue.toLowerCase().includes(i)):r}get enterCommits(){return this.separators.includes(po)}get splitters(){return this.separators.filter(e=>e!==po&&e!==``)}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.value)e.append(this.name,t);return e}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.setValue([...this.defaultValue]),this.draft=``,this.requestedOpen=!1,this.navigating=!1}restoreFormState(e){e instanceof FormData?this.value=e.getAll(this.name).filter(e=>typeof e==`string`):typeof e==`string`&&(this.value=[e])}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&this.setValue([...this.defaultValue]),this.blocked&&(this.requestedOpen=!1);let t=`${this.filtered.length}\u0000${this.draft}`;if(t!==this.highlightKey&&(this.highlightKey=t,this.highlight=0),P&&e.has(`value`)){let e=new Set,t=this.value.find(t=>e.size===e.add(t).size);t!==void 0&&V(fo,`value contains the tag "${t}" more than once: tags are unique (removing one removes its position only).`)}}updated(e){super.updated(e),this.floating.sync(this.isOpen),this.input?.toggleAttribute(De,!this.isOpen&&this.draft!==``)}setOpen(e){e&&this.blocked||e!==this.requestedOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.requestedOpen=e)}setTags(e){this.value=e,this.emit(`minerva-change`,{value:[...e]})}setDraft(e){this.draft=e,this.input&&this.input.value!==e&&(this.input.value=e)}commitAll(e,t=``){if(this.blocked||this.composing)return;let n=this.value,r=[...n];for(let t of e){let e=t.trim();e&&!r.includes(e)&&r.push(e)}r.length!==n.length&&this.setTags(r),this.navigating=!1,this.setDraft(t)}commit(e){this.commitAll([e])}select(e){this.commit(e.tag),this.setOpen(!1)}removeAt(e){this.blocked||(this.setTags(this.value.filter((t,n)=>n!==e)),this.input?.focus())}handleInput(){let e=this.input.value;if(this.blocked){this.input.value=this.draft;return}this.navigating=!1;let t=this.splitters,n=this.composing||t.length===0?[e]:Me(e,t);n.length>1?this.commitAll(n.slice(0,-1),n[n.length-1]):this.draft=e,this.setOpen(!0),this.emit(`minerva-input`,{value:this.draft})}handlePaste(e){if(this.blocked||this.composing)return;let t=e.clipboardData?.getData(`text`)??``,n=this.enterCommits?[...this.splitters,...mo]:this.splitters;if(!n.some(e=>t.includes(e)))return;e.preventDefault();let r=this.draft,i=this.input.selectionStart??r.length,a=this.input.selectionEnd??r.length,o=r.slice(0,i)+t+r.slice(a);this.commitAll(Me(o,n)),this.setOpen(!1)}handleKeyDown(e){if(this.blocked||this.composing||e.isComposing||e.keyCode===229)return;let t=this.filtered,n=t.length,r=this.isOpen,i=this.draft.trim(),a=this.value;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),this.navigating=!0,this.setOpen(!0),n>0){let t=e.key===`ArrowDown`?1:-1;this.highlight=(this.highlight+t+n)%n}break;case`Enter`:e.preventDefault(),this.enterCommits?!this.navigating&&(!i||a.includes(i))?this.commit(this.draft):r&&t[this.highlight]?this.select(t[this.highlight]):(this.commit(this.draft),this.setOpen(!1)):this.navigating&&r&&t[this.highlight]&&this.select(t[this.highlight]);break;case`Escape`:this.navigating=!1,this.setDraft(``),r&&!e.defaultPrevented&&(e.preventDefault(),this.setOpen(!1));break;case`Backspace`:this.draft===``&&a.length>0&&(e.preventDefault(),this.setTags(a.slice(0,-1)))}}handleFocus(){this.blocked||this.setOpen(!0)}handleBlur(){this.setOpen(!1),this.noCommitOnBlur||this.commit(this.draft)}clearAll(){this.setDraft(``),this.setTags([]),this.emit(`minerva-clear`),this.input?.focus()}renderTag(e,t){let n=this.isDisabled,r=this.removeLabel?this.removeLabel(e):this.locale.t(`tagInput.remove`,{tag:e});return b`<div
part="tag"
class=${w({tag:!0,neutral:!0,subtle:!0,large:!0,rounded:!0,disabled:n})}
data-component="tag"
>
<span class="content"><span class="label">${e}</span></span>
${this.readOnly?y:b`<button
part="remove-button"
type="button"
class="closeIcon"
aria-label=${r}
title=${r}
?disabled=${n}
@click=${e=>{e.stopPropagation(),this.removeAt(t)}}
>
${Hn}
</button>`}
</div>`}hookStates(){return{state:this.isOpen?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,readonly:this.readOnly,required:this.required,size:this.size}}renderList(e){let t=this.aria.label;return b`<ul
part="list"
id=${this.listId}
role="listbox"
popover="manual"
aria-label=${t??y}
class="list"
>
${e.length===0?b`<li class="empty" part="empty" role="presentation">
${this.emptyText??this.locale.t(`tagInput.empty`)}
</li>`:y}
${e.map((e,t)=>b`<li
part=${Yn(`option`,{highlighted:t===this.highlight})}
id=${`${this.listId}-option-${t}`}
role="option"
aria-selected=${t===this.highlight?`true`:`false`}
tabindex="-1"
class="option"
?data-highlighted=${t===this.highlight}
@mousedown=${t=>{t.preventDefault(),this.select(e)}}
@mouseenter=${()=>this.highlight=t}
>
${e.label}
</li>`)}
</ul>`}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.value,r=this.isOpen,i=this.filtered,a=this.draft.trim(),o=r?i[this.highlight]:void 0,s=e=>e.preventDefault();return b`<div part="root" class="root">
${n.length>0?b`<div part="tags" class="values">
${pt(n,(e,t)=>`${t}-${e}`,(e,t)=>this.renderTag(e,t))}
</div>`:y}
<div class="entry">
<div class="combobox">
<div
part="control"
class=${w({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
type="text"
role="combobox"
aria-label=${this.aria.label??y}
aria-description=${this.aria.description??y}
aria-expanded=${r?`true`:`false`}
aria-controls=${r?this.listId:y}
aria-autocomplete="list"
aria-activedescendant=${o?`${this.listId}-option-${this.highlight}`:y}
aria-invalid=${this.invalid?`true`:y}
aria-required=${this.required?`true`:y}
autocomplete="off"
spellcheck="false"
placeholder=${this.placeholder||y}
.value=${mt(this.draft)}
?disabled=${t}
?readonly=${this.readOnly}
@input=${this.handleInput}
@focus=${this.handleFocus}
@click=${this.handleFocus}
@blur=${this.handleBlur}
@compositionstart=${()=>this.composing=!0}
@compositionend=${()=>this.composing=!1}
@keydown=${this.handleKeyDown}
@paste=${this.handlePaste}
/>
</div>
${r?this.renderList(i):y}
</div>
${this.readOnly?y:b`<button
part="add-button"
type="button"
class=${w({iconButton:!0,neutral:!0,"variant-ghost":!0,medium:!0,square:!0,disabled:t||!a||n.includes(a)})}
aria-label=${this.addLabel??e(`tagInput.add`)}
?disabled=${t||!a||n.includes(a)}
@mousedown=${s}
@click=${()=>{this.commit(this.draft),this.input?.focus()}}
>
${xr}
</button>
<button
part="clear-button"
type="button"
class=${w({iconButton:!0,neutral:!0,"variant-ghost":!0,medium:!0,square:!0,disabled:t||n.length===0})}
aria-label=${this.clearLabel??e(`tagInput.clear`)}
?disabled=${t||n.length===0}
@mousedown=${s}
@click=${this.clearAll}
>
${Hn}
</button>`}
</div>
</div>`}},H([S({attribute:!1})],X.prototype,`value`,null),H([S({attribute:`value`,converter:{fromAttribute:e=>lo(e,`value`)}})],X.prototype,`defaultValue`,void 0),H([S({converter:{fromAttribute:e=>lo(e,`options`)}})],X.prototype,`options`,void 0),H([S({converter:{fromAttribute:uo}})],X.prototype,`separators`,void 0),H([S({type:Boolean,attribute:`no-commit-on-blur`})],X.prototype,`noCommitOnBlur`,void 0),H([S()],X.prototype,`placeholder`,void 0),H([S({reflect:!0})],X.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),H([S({attribute:`empty-text`})],X.prototype,`emptyText`,void 0),H([S({attribute:`add-label`})],X.prototype,`addLabel`,void 0),H([S({attribute:`clear-label`})],X.prototype,`clearLabel`,void 0),H([S({attribute:!1})],X.prototype,`removeLabel`,void 0),H([S({attribute:!1})],X.prototype,`createLabel`,void 0),H([v()],X.prototype,`draft`,void 0),H([v()],X.prototype,`requestedOpen`,void 0),H([v()],X.prototype,`highlight`,void 0),H([C(`input.field`)],X.prototype,`input`,void 0),H([C(`.combobox`)],X.prototype,`combobox`,void 0),H([C(`.list`)],X.prototype,`list`,void 0)})))()}var _o;function vo(){return(vo=e((()=>{I(),z(),R(),B(),N(),$n(),ln(),g(),_(),x(),h(),_o=class e extends D{constructor(...e){super(...e),this.variant=`default`,this.aria=new L(this)}static{this.tagName=`minerva-text-link`}static{this.shadowRootOptions={...D.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,E`
:host{
display: inline;
}
:host([variant="action"]){
display: block;
}
:host([variant="subtle"]){
display: inline-flex;
}
`,O(It)]}focus(e){this.anchor?.focus(e)}blur(){this.anchor?.blur()}click(){this.anchor?.click()}hookStates(){return{variant:this.variant}}updated(){P&&!this.href&&V(e.tagName,`href is missing: without it the link is not focusable nor announced as a link (use a button for actions).`)}render(){return b`<a
part="root"
class=${w({textLink:!0,[this.variant]:!0})}
href=${br(e.tagName,this.href)??y}
target=${this.target??y}
rel=${ze(this.target,this.rel)??y}
download=${this.download??y}
hreflang=${this.hreflang??y}
aria-label=${this.aria.label??y}
aria-description=${this.aria.description??y}
aria-current=${this.aria.attr(`aria-current`)??y}
><slot></slot>${this.variant===`subtle`?ar:y}</a
>`}},H([S({reflect:!0})],_o.prototype,`variant`,void 0),H([S()],_o.prototype,`href`,void 0),H([S()],_o.prototype,`target`,void 0),H([S()],_o.prototype,`rel`,void 0),H([S()],_o.prototype,`download`,void 0),H([S()],_o.prototype,`hreflang`,void 0),H([C(`a`)],_o.prototype,`anchor`,void 0)})))()}function yo(){xo=null}var bo,xo,So,Co,wo,To,Eo;function Do(){return(Do=e((()=>{z(),Mr(),k(),At(),B(),N(),zt(),g(),_(),p(),h(),bo=`(prefers-color-scheme: dark)`,xo=null,So=()=>typeof window<`u`&&window.matchMedia?.(bo).matches?`dark`:`light`,Co=(e,t)=>{typeof document<`u`&&(document.cookie=t===null?`${e}=; path=/; max-age=0; SameSite=Lax`:Je(e,t))},wo=class extends D{constructor(...e){super(...e),this.persist=!1,this.locale=new A(this),this.observer=null,this.media=null,this.onScheme=()=>this.onSystemChange()}static{this.styles=[M,E`
:host{
display: inline-flex;
vertical-align: middle;
}
`,O(yn)]}get config(){return Nt(this,`minerva-config`)}onSystemChange(){this.requestUpdate()}connectedCallback(){if(super.connectedCallback(),typeof MutationObserver<`u`){this.observer=new MutationObserver(()=>this.requestUpdate());let e=this.config;this.observer.observe(e??document.documentElement,{attributes:!0,attributeFilter:e?[`theme`,`palette`,`data-theme`]:[`data-theme`,`data-palette`]})}typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(bo),this.media.addEventListener?.(`change`,this.onScheme))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.media?.removeEventListener?.(`change`,this.onScheme),this.media=null}renderGroup(e,t,n){return b`<div part="root" class="group" role="group" aria-label=${e}>
${t.map(e=>b`<button
type="button"
part=${Yn(`item`,{state:e.active?`active`:`inactive`})}
class="item"
data-state=${e.active?`active`:`inactive`}
aria-pressed=${e.active?`true`:`false`}
@click=${()=>n(e.value)}
>
${e.text}
</button>`)}
</div>`}},H([S({type:Boolean,reflect:!0})],wo.prototype,`persist`,void 0),To=class extends wo{constructor(...e){super(...e),this.hideSystem=!1,this.select=e=>{e!==this.theme&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-theme-toggle`}get theme(){let e=this.config;if(e){let t=e.theme;return t===`github-dark`?`dark`:Qe(t)?t:null}if(xo)return xo;let t=this.persist?xe(document.cookie,pe):void 0;if(Qe(t))return t;let n=document.documentElement.getAttribute(`data-theme`);return Qe(n)?n:`system`}get resolvedTheme(){let e=this.config;if(e)return e.resolvedMode??So();let t=this.theme;return t===`light`||t===`dark`?t:So()}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist&&!xo){let e=xe(document.cookie,pe);Qe(e)&&this.apply(e,!1)}}onSystemChange(){!this.config&&xo===`system`&&this.apply(`system`,!1),super.onSystemChange()}apply(e,t=this.persist){let n=this.config;if(n){n.theme=e;return}xo=e;let r=document.documentElement,i=e===`system`?So():e;r.setAttribute(`data-theme`,i),r.style.colorScheme=i,t&&Co(`theme`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.theme,n=this.hideSystem?[`light`,`dark`]:[`light`,`dark`,`system`];return this.renderGroup(e(`themeToggle.label`,{theme:this.resolvedTheme}),n.map(n=>({value:n,text:this.labels?.[n]??e(`themeToggle.${n}`),active:t===n})),this.select)}},H([S({type:Boolean,reflect:!0,attribute:`hide-system`})],To.prototype,`hideSystem`,void 0),H([S({attribute:!1})],To.prototype,`labels`,void 0),Eo=class e extends wo{constructor(...e){super(...e),this.palettes=[...Le],this.showDefault=!1,this.select=e=>{e!==this.palette&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-palette-toggle`}get palette(){let e=this.config,t=e?e.palette:document.documentElement.getAttribute(`data-palette`);return rt(t)?t:null}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist){let e=xe(document.cookie,r);rt(e)&&!this.palette&&this.apply(e,!1)}}willUpdate(){if(P){let t=(this.palettes??[]).filter(e=>!rt(e));t.length&&V(e.tagName,`unknown palette(s) ${t.join(`, `)}: use ${Le.join(`, `)}.`)}}apply(e,t=this.persist){let n=this.config;if(n){n.palette=e??void 0;return}let r=document.documentElement;e?r.setAttribute(`data-palette`,e):r.removeAttribute(`data-palette`),t&&Co(`palette`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.palette,n=this.showDefault?[null,...this.palettes.filter(rt)]:this.palettes.filter(rt);return this.renderGroup(e(`paletteToggle.label`,{palette:t??e(`paletteToggle.default`)}),n.map(n=>{let r=n??`default`;return{value:n,text:this.labels?.[r]??e(`paletteToggle.${r}`),active:t===n}}),this.select)}},H([S({converter:{fromAttribute:e=>(e??``).split(/[\s,]+/).filter(Boolean),toAttribute:e=>e.join(` `)}})],Eo.prototype,`palettes`,void 0),H([S({type:Boolean,reflect:!0,attribute:`show-default`})],Eo.prototype,`showDefault`,void 0),H([S({attribute:!1})],Eo.prototype,`labels`,void 0)})))()}var Oo,Z;function ko(){return(ko=e((()=>{I(),z(),R(),k(),At(),B(),N(),Zn(),qr(),Er(),Bt(),Tr(),vn(),g(),_(),x(),p(),h(),ht(),Oo=(e,t,n=0,r=()=>!1)=>{let i=[];for(let a=n;a<n+e;a+=Math.max(1,t))i.push({value:a,disabled:r(a),label:String(a).padStart(2,`0`)});return i},Z=class e extends F{constructor(...e){super(...e),this.name=`time-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.format=`HH:mm:ss`,this.use12Hours=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.hideSecond=!1,this.hourStep=1,this.minuteStep=1,this.secondStep=1,this.draft=null,this.locale=new A(this),this.aria=new L(this,()=>this.labels),this.floating=new Gr(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.dirty=!1,this.focusPanelOnOpen=!1}static{this.tagName=`minerva-time-picker`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,Kr,E`
:host{
display: inline-block;
vertical-align: middle;
}
.timePicker{
display: block;
}
.timePicker .root{
width: 100%;
}
`,O(Ft),O(un),O(Pt),O(Dr)]}get valueAsDate(){return Se(this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get effectiveFormat(){return Re(this.format,!this.hideSecond)}get withSeconds(){return He(this.effectiveFormat)}get interactive(){return!this.isDisabled&&!this.readOnly}getFormValue(){let e=this.valueAsDate;return e?ut(e,this.withSeconds):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),P&&this.checkUsage(e)}checkUsage(n){let r=e.tagName;if(n.has(`value`)&&this.value&&!Se(this.value)&&V(r,`value "${this.value}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`),n.has(`minTime`)||n.has(`maxTime`)){for(let[e,t]of[[`min-time`,this.minTime],[`max-time`,this.maxTime]])t&&!Se(t)&&V(r,`${e} "${t}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`);let e=Se(this.minTime),n=Se(this.maxTime);e&&n&&t(e)>t(n)&&V(r,`min-time (${this.minTime}) is later than max-time (${this.maxTime}): no time can be selected.`)}}updated(e){super.updated(e);let t=this.open&&this.interactive;if(this.floating.sync(t),!t){this.focusPanelOnOpen=!1;return}(e.has(`open`)||e.has(`disabled`))&&(this.popup?.querySelectorAll(`[aria-selected="true"]`).forEach(e=>e.scrollIntoView?.({block:`nearest`})),this.focusPanelOnOpen&&this.focusFirstColumn())}focusFirstColumn(){this.popup?.querySelector(`[role="option"][tabindex="0"]`)?.focus()}requestOpenChange(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){this.value=e?ut(e,this.withSeconds):``,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleTimeChange(e,t){let n=new Date(this.valueAsDate??Ce());if(e===`hour`)n.setHours(t);else if(e===`minute`)n.setMinutes(t);else if(e===`second`)n.setSeconds(t);else{let e=n.getHours()%12;n.setHours(t===1?e+12:e)}this.draft=null,this.commit(n)}handleInput(e){let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t});let n=le(t,this.effectiveFormat,{strict:!0,base:this.valueAsDate??void 0});n&&this.commit(n)}handleBlur(){let e=this.draft;if(e===null)return;let t=this.valueAsDate;if(e.trim()===``)t&&this.commit(null);else{let n=le(e,this.effectiveFormat,{strict:!1,base:t??void 0});n&&n.getTime()!==t?.getTime()&&this.commit(n)}this.draft=null}handleClear(){this.draft=null,this.commit(null),this.emit(`minerva-clear`),this.input?.focus()}handleInputClick(){this.interactive&&(this.focusPanelOnOpen=!1,this.requestOpenChange(!this.open))}handleInputKeyDown(e){e.key===`ArrowDown`&&(e.preventDefault(),this.interactive&&(this.open?this.focusFirstColumn():(this.focusPanelOnOpen=!0,this.requestOpenChange(!0)||(this.focusPanelOnOpen=!1))))}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=de(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=de(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{Ze(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!Ze(this,e))??null}handleColumnKeyDown(e,t){let n=e.currentTarget,r=e.target,i=Array.from(n.querySelectorAll(`[role="option"]`)).filter(e=>e.getAttribute(`aria-disabled`)!==`true`),a=i.indexOf(r),o=this.popup?.querySelectorAll(`[role="listbox"]`),s=o?.length??0,c=e=>o?.[e]?.querySelector(`[tabindex="0"]`)?.focus();switch(we(e.key,this)){case`ArrowDown`:e.preventDefault(),i[Math.min(i.length-1,a+1)]?.focus();break;case`ArrowUp`:e.preventDefault(),i[Math.max(0,a-1)]?.focus();break;case`Home`:e.preventDefault(),i[0]?.focus();break;case`End`:e.preventDefault(),i[i.length-1]?.focus();break;case`ArrowRight`:e.preventDefault(),c(Math.min(s-1,t+1));break;case`ArrowLeft`:e.preventDefault(),c(Math.max(0,t-1))}}pick(e,t){t.disabled||this.handleTimeChange(e.kind,e.toValue(t.value))}columns(e){let{t}=this.locale,n=this.use12Hours,r=Se(this.minTime),i=Se(this.maxTime),a=e.getHours(),o=e.getMinutes(),s=e.getSeconds(),c=a>=12,l=e=>n?e%12+(c?12:0):e,u=Oo(n?12:24,this.hourStep,+!!n,e=>{let t=l(e);return!!(r&&t<r.getHours()||i&&t>i.getHours())}),d=Oo(60,this.minuteStep,0,e=>!!(r&&a===r.getHours()&&e<r.getMinutes()||i&&a===i.getHours()&&e>i.getMinutes())),ee=Oo(60,this.secondStep,0,e=>{let t=r&&a===r.getHours()&&o===r.getMinutes(),n=i&&a===i.getHours()&&o===i.getMinutes();return!!(t&&e<r.getSeconds()||n&&e>i.getSeconds())}),te=[{kind:`hour`,label:t(`timePicker.hours`),items:u,selected:n?a%12||12:a,toValue:l},{kind:`minute`,label:t(`timePicker.minutes`),items:d,selected:o,toValue:e=>e}];return this.withSeconds&&te.push({kind:`second`,label:t(`timePicker.seconds`),items:ee,selected:s,toValue:e=>e}),n&&te.push({kind:`ampm`,label:t(`timePicker.period`),items:[{value:0,label:`AM`,disabled:!1},{value:1,label:`PM`,disabled:!1}],selected:+!!c,toValue:e=>e}),te}renderPanel(e,t){let n=e!==null,r=this.columns(e??Ce());return b`<div
part="content"
class="popup"
popover="manual"
role="dialog"
tabindex="-1"
aria-label=${t}
@keydown=${this.handlePanelKeyDown}
>
<div class="timePickerPanel">
<div class="timeColumns">
${r.map((e,t)=>{let r=e.items.find(e=>!e.disabled)?.value,i=e.items.some(t=>t.value===e.selected&&!t.disabled)?e.selected:r;return b`<div
part="column"
class="timeColumn"
role="listbox"
aria-label=${e.label}
tabindex="-1"
data-kind=${e.kind}
@keydown=${e=>this.handleColumnKeyDown(e,t)}
>
${e.items.map(t=>{let r=n&&t.value===e.selected;return b`<div
part=${Yn(`item`,{selected:r,disabled:t.disabled})}
role="option"
aria-selected=${r?`true`:`false`}
aria-disabled=${t.disabled?`true`:y}
tabindex=${t.value===i?`0`:`-1`}
class=${w({timeUnit:!0,selected:r,disabled:t.disabled})}
@click=${()=>this.pick(e,t)}
@keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),this.pick(e,t))}}
>
${t.label}
</div>`})}
</div>`})}
</div>
</div>
</div>`}hookStates(){let e=this.open&&!this.isDisabled&&!this.readOnly,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?s(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size,side:n,align:r,placement:t}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`timePicker.label`),a=this.draft??(r?$e(r,this.effectiveFormat):``),o=!this.hideClearButton&&!!r&&!t&&!n;return b`<div part="root" class="timePicker">
<div
part="control"
class=${w({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
.value=${mt(a)}
placeholder=${this.placeholder??e(`timePicker.placeholder`)}
?disabled=${t}
?readonly=${n}
?required=${this.required}
autocomplete="off"
aria-label=${i}
aria-description=${this.aria.description??y}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:y}
aria-readonly=${n?`true`:y}
@input=${this.handleInput}
@blur=${this.handleBlur}
@click=${this.handleInputClick}
@keydown=${this.handleInputKeyDown}
/>
<span class="addon end">
${o?b`<button
part="clear-button"
type="button"
class="iconButton neutral variant-ghost small circle clearButton"
aria-label=${e(`timePicker.clear`)}
@click=${this.handleClear}
>
${Hn}
</button>`:b`<span part="icon" class="clockIcon" aria-hidden="true"
>${hr}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(r,i):y}`}},H([S({reflect:!0})],Z.prototype,`name`,void 0),H([S({attribute:!1})],Z.prototype,`value`,void 0),H([S({attribute:`value`})],Z.prototype,`defaultValue`,void 0),H([S({type:Boolean,reflect:!0})],Z.prototype,`open`,void 0),H([S({reflect:!0})],Z.prototype,`format`,void 0),H([S({type:Boolean,reflect:!0,attribute:`use-12-hours`})],Z.prototype,`use12Hours`,void 0),H([S()],Z.prototype,`placeholder`,void 0),H([S()],Z.prototype,`label`,void 0),H([S({reflect:!0})],Z.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],Z.prototype,`invalid`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],Z.prototype,`readOnly`,void 0),H([S({type:Boolean,reflect:!0,attribute:`hide-clear-button`})],Z.prototype,`hideClearButton`,void 0),H([S({type:Boolean,reflect:!0,attribute:`hide-second`})],Z.prototype,`hideSecond`,void 0),H([S({attribute:`min-time`})],Z.prototype,`minTime`,void 0),H([S({attribute:`max-time`})],Z.prototype,`maxTime`,void 0),H([S({type:Number,attribute:`hour-step`})],Z.prototype,`hourStep`,void 0),H([S({type:Number,attribute:`minute-step`})],Z.prototype,`minuteStep`,void 0),H([S({type:Number,attribute:`second-step`})],Z.prototype,`secondStep`,void 0),H([v()],Z.prototype,`draft`,void 0),H([C(`input`)],Z.prototype,`input`,void 0),H([C(`.timePicker`)],Z.prototype,`field`,void 0),H([C(`.popup`)],Z.prototype,`popup`,void 0)})))()}function Ao(e){if(e===void 0)return;if(typeof e!=`string`)return e;if(!Po())return;let t=document.getElementById(e)??void 0;return P&&!t&&V(`minerva-toast-region`,`toast(): no element with id "${e}"; the toast is shown in the default region.`),t}var jo,Mo,No,Po,Fo,Io,Lo,Ro,zo,Bo;function Vo(){return(Vo=e((()=>{z(),h(),jo=4e3,Mo=200,No=`minerva-toast-region`,Po=()=>typeof window<`u`&&typeof document<`u`,Fo=class{constructor(e={}){this.subscribe=e=>this.queue.subscribe(t=>e(t.toasts)),this.subscribeLifecycle=e=>this.queue.subscribeLifecycle(e),this.getSnapshot=()=>this.queue.getState().toasts,this.queue=ue({isClient:e.isClient??Po,defaultDuration:jo,exitDuration:200})}push(e,t){return this.queue.add(e,{region:t})}update(e,t){this.queue.update(e,t)}dismiss(e,t=`dismiss`){this.queue.dismiss(e,t)}dismissAll(){this.queue.dismissAll()}pause(e){this.queue.pause(e)}resume(e){this.queue.resume(e)}peek(){return this.getSnapshot()}reset(){this.queue.reset()}},Io=new Fo,Lo=`data-minerva-auto`,Ro=new class{constructor(){this.regions=[],this.listeners=new Set,this.autoPending=!1,this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)})}changed(){for(let e of[...this.listeners])e()}ordered(){return this.regions.slice().sort((e,t)=>{let n=e.compareDocumentPosition(t);return n&Node.DOCUMENT_POSITION_DISCONNECTED?0:n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}get owner(){return this.ordered()[0]??null}register(e){if(!this.regions.includes(e)){if(this.regions.push(e),!e.hasAttribute(`data-minerva-auto`))for(let e of this.regions.filter(e=>e.hasAttribute(Lo)))e.remove();this.changed()}}unregister(e){let t=this.regions.indexOf(e);t<0||(this.regions.splice(t,1),this.changed())}regionOf(e){let t=e.region;return t&&this.regions.includes(t)?t:this.owner}ensureRegion(){this.autoPending||this.regions.length>0||!Po()||(this.autoPending=!0,queueMicrotask(()=>{if(this.autoPending=!1,this.regions.length>0||!document.body||!Io.getSnapshot().length)return;let e=document.createElement(`minerva-toast-region`);e.setAttribute(`data-minerva-auto`,``),document.body.append(e)}))}},zo=(e,t)=>{let n=n=>{P&&!Po()&&V(`minerva-toast-region`,`toast() called without a document (server side): the toast is ignored.`);let{region:r,...i}=n,a=Ao(r??t),o=e.push(i,a);return Po()&&Ro.ensureRegion(),o},r=(e=>n(e));return r.info=(e,t)=>n({...t,title:e,color:`info`}),r.success=(e,t)=>n({...t,title:e,color:`success`}),r.warning=(e,t)=>n({...t,title:e,color:`warning`}),r.danger=(e,t)=>n({...t,title:e,color:`danger`}),r.loading=(e,t)=>n({...t,title:e,loading:!0}),r.promise=(e,t,r)=>{let i=n({...r,title:t.loading,loading:!0,duration:0}),a=(e,t)=>n({...r,id:i,title:t,color:e,loading:!1});return e.then(e=>a(`success`,typeof t.success==`function`?t.success(e):t.success),e=>a(`danger`,typeof t.error==`function`?t.error(e):t.error)),e},r.update=(t,n)=>{let{region:r,...i}=n;e.update(t,i)},r.dismiss=t=>t===void 0?e.dismissAll():e.dismiss(t),r.region=t=>zo(e,t),r},Bo=zo(Io)})))()}var Ho,Uo,Wo,Go,Ko,qo,Jo,Yo,Xo;function Zo(){return(Zo=e((()=>{I(),z(),R(),Mr(),k(),At(),B(),N(),qr(),Cr(),Vo(),g(),_(),x(),ft(),p(),h(),gt(),Ho={info:Tn,success:Kn,warning:Nn,danger:wr},Uo=[`top-right`,`top-left`,`top-center`,`bottom-right`,`bottom-left`,`bottom-center`],Wo=[`F8`],Go=`:scope > [part~="toast--open"]`,Ko=`:scope > [part~="close-button"]`,qo={fromAttribute:e=>e===null?Wo:e.split(/[\s,+]+/).map(e=>e.trim()).filter(Boolean)},Jo=0,Yo=e=>{for(let t of Ro.ordered())if(t instanceof Xo&&t.handleHotkey(e))return},Xo=class extends D{constructor(...e){super(...e),this.position=`top-right`,this.max=1/0,this.noPauseOnHover=!1,this.hotkey=Wo,this.items=[],this.locale=new A(this),this.aria=new L(this),this.cleanups=[],this.returnFocus=null,this.refresh=()=>{if(!this.isConnected)return;let e=new Set,t=[],n=Io.getSnapshot();for(let r=n.length-1;r>=0;--r){let i=n[r];e.has(i.id)||Ro.regionOf(i)!==this||(e.add(i.id),t.unshift(i))}let r=Ue(t,this.max);if(r.length>0){for(let e of r)Io.dismiss(e.id,`overflow`);return}let i=new Set(this.items.map(e=>e.id)),a=t.some(e=>!i.has(e.id));this.items=t,a&&this.raise()},this.raise=()=>{let e=this.viewport;e&&!Ze(e,u())&&(rn(e),_n(e))},this.onLifecycle=e=>{Ro.regionOf(e.item)===this&&(e.type===`close`?this.emit(`minerva-close`,{id:e.item.id,reason:e.reason}):this.emit(`minerva-after-close`,{id:e.item.id}))},this.onViewportFocusIn=e=>{let t=e.relatedTarget,n=e.currentTarget;t&&!Ze(n,t)&&(this.returnFocus=t)},this.onViewportFocusOut=e=>{let t=e.currentTarget;Ze(t,e.relatedTarget)||t.removeAttribute(`tabindex`)}}static{this.tagName=No}static{this.styles=[M,Kr,E`
:host{
display: contents;
}


.progressIndicator{
display: inline-flex;
width: 100%;
height: 100%;
color: currentColor;
}
.spinner{
display: inline-flex;
width: 100%;
height: 100%;
animation: spin 1s linear infinite;
}
@keyframes spin{
to{
transform: rotate(360deg);
}
}
@media (prefers-reduced-motion: reduce){
.spinner{
animation-duration: 2s;
}
}
`,O(Mn)]}get toast(){return this.boundApi??=zo(Io,this),this.boundApi}connectedCallback(){super.connectedCallback(),this.cleanups=[Io.subscribe(()=>this.refresh()),Ro.subscribe(()=>this.refresh()),Io.subscribeLifecycle(this.onLifecycle)];let e=this.ownerDocument;e.addEventListener(`minerva-after-open`,this.raise),this.cleanups.push(()=>e.removeEventListener(`minerva-after-open`,this.raise)),Jo++===0&&e.addEventListener(`keydown`,Yo),this.cleanups.push(()=>{--Jo===0&&e.removeEventListener(`keydown`,Yo)}),Ro.register(this),this.refresh(),this.hasUpdated&&_n(this.viewport)}disconnectedCallback(){super.disconnectedCallback();for(let e of this.cleanups)e();this.cleanups=[],Ro.unregister(this),rn(this.viewport)}handleHotkey(e){let t=this.viewport;if(!t||!Oe(e,this.hotkey)||!t.querySelector(Go))return!1;e.preventDefault();let n=u();return n&&n!==this.ownerDocument.body&&!Ze(t,n)&&(this.returnFocus=n),t.setAttribute(`tabindex`,`-1`),ke(t),!0}focus(e){let t=this.viewport;t&&(t.setAttribute(`tabindex`,`-1`),t.focus(e))}willUpdate(e){P&&e.has(`position`)&&!Uo.includes(this.position)&&V(`minerva-toast-region`,`invalid position "${this.position}" (expected ${Uo.join(` | `)}).`)}firstUpdated(){_n(this.viewport)}updated(e){e.has(`max`)&&e.get(`max`)!==void 0&&queueMicrotask(()=>this.refresh())}moveFocusFrom(e){let t=this.viewport;if(!t)return;let n=Array.from(t.querySelectorAll(Go)).filter(t=>t!==e),r=n.find(t=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??n[n.length-1];if(r){let e=r.querySelector(Ko)??de(r)[0];if(ke(e))return}let i=this.returnFocus;i?.isConnected&&!Ze(t,i)&&ke(i)||ke(be(this))||(t.setAttribute(`tabindex`,`-1`),ke(t,{preventScroll:!0}))}close(e,t,n){Ze(t,u())&&this.moveFocusFrom(t),Io.dismiss(e.id,n)}pause(e){this.noPauseOnHover||Io.pause(e.id)}resume(e){this.noPauseOnHover||Io.resume(e.id)}renderIcon(e){if(e.icon===null)return y;let t=e.icon===void 0?e.loading?b`<div class="progressIndicator current" aria-hidden="true">
<span class="spinner small">${Jt}</span>
</div>`:Ho[e.color]:e.icon;return b`<span class="icon" part="icon" aria-hidden="true"
>${t}</span
>`}renderItem(e){let t=e.state===`closing`,n=e=>e.currentTarget.closest(`.toast`),r={state:t?`closed`:`open`,color:e.color,loading:e.loading};return b`<div
part=${Yn(`toast`,r)}
class=${w({toast:!0,[e.color]:!0})}
data-state=${r.state}
role=${e.color===`danger`&&!e.loading?`alert`:`status`}
style=${T(e.duration>0?{"--toast-duration":`${e.duration}ms`}:{})}
@mouseenter=${()=>this.pause(e)}
@mouseleave=${()=>this.resume(e)}
@focusin=${()=>this.pause(e)}
@focusout=${t=>{Ze(n(t),t.relatedTarget)||this.resume(e)}}
@keydown=${r=>{r.key!==`Escape`||t||r.isComposing||(r.preventDefault(),r.stopPropagation(),this.close(e,n(r),`escape`))}}
>
${this.renderIcon(e)}
<div class="content">
${e.title?b`<div class="title" part="title">${e.title}</div>`:y}
${e.description?b`<div class="description" part="description">
${e.description}
</div>`:y}
</div>
${e.action?b`<button
type="button"
class="action"
part="action"
@click=${t=>{e.action?.onClick(),this.close(e,n(t),`action`)}}
>
${e.action.label}
</button>`:y}
${e.closable?b`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`toast.close`)}
@click=${t=>this.close(e,n(t),`close-button`)}
>
${Hn}
</button>`:y}
${e.duration>0&&!t?b`<span
class="progress"
part="progress"
aria-hidden="true"
></span>`:y}
</div>`}render(){let e=Te(this.hotkey),t=this.aria.label??(e?this.locale.t(`toast.regionWithHotkey`,{hotkey:e}):this.locale.t(`toast.region`)),n=Uo.includes(this.position)?this.position:`top-right`;return b`<div
part="root"
class=${w({viewport:!0,[n]:!0})}
popover="manual"
role="region"
aria-label=${t}
dir=${ae(this)}
@focusin=${this.onViewportFocusIn}
@focusout=${this.onViewportFocusOut}
>
${pt(this.items,e=>e.id,e=>this.renderItem(e))}
</div>`}},H([S({reflect:!0})],Xo.prototype,`position`,void 0),H([S({type:Number})],Xo.prototype,`max`,void 0),H([S({type:Boolean,attribute:`no-pause-on-hover`})],Xo.prototype,`noPauseOnHover`,void 0),H([S({attribute:`close-label`})],Xo.prototype,`closeLabel`,void 0),H([S({attribute:`hotkey`,converter:qo})],Xo.prototype,`hotkey`,void 0),H([v()],Xo.prototype,`items`,void 0),H([C(`.viewport`)],Xo.prototype,`viewport`,void 0)})))()}var Qo,$o,es,ts,ns,rs,Q;function is(){return(is=e((()=>{I(),z(),Mr(),B(),N(),qr(),jt(),g(),_(),x(),p(),Qo=6,$o=300,es=200,ts=0,ns={fromAttribute(e){if(!e)return;let t=e.trim().split(/[\s,]+/).map(Number);return t.length===2&&t.every(Number.isFinite)?[t[0],t[1]]:void 0},toAttribute(e){return e?e.join(` `):null}},rs=class extends D{constructor(...e){super(...e),this.skipDelay=300,this.lastClosedAt=0}static{this.tagName=`minerva-tooltip-provider`}static{this.styles=[M,E`
:host{
display: contents;
}
`]}markClosed(){this.lastClosedAt=Date.now()}shouldSkipDelay(){return Date.now()-this.lastClosedAt<this.skipDelay}render(){return b`<slot></slot>`}},H([S({type:Number,attribute:`enter-delay`})],rs.prototype,`enterDelay`,void 0),H([S({type:Number,attribute:`leave-delay`})],rs.prototype,`leaveDelay`,void 0),H([S({type:Number,attribute:`skip-delay`})],rs.prototype,`skipDelay`,void 0),Q=class e extends D{constructor(...e){super(...e),this.content=``,this.open=!1,this.placement=`top`,this.color=`neutral`,this.variant=`solid`,this.shape=`default`,this.animation=`fade`,this.arrow=!1,this.disabled=!1,this.followCursor=!1,this.positioned=!1,this.aria=new L(this),this.grace=te({timeout:0}),this.cursor=null,this.described=null,this.describedPrev=null,this.floating=new Gr(this,()=>{let e=this.placement,t=e.startsWith(`top`)||e.startsWith(`bottom`),n=this.arrow?Qo:0,r=this.offset;return{placement:e,offset:r?{mainAxis:(t?r[1]:r[0])+n,crossAxis:t?r[0]:r[1]}:{mainAxis:8+n},arrowElement:this.arrow?this.arrowEl:null,autoUpdate:this.followCursor?{animationFrame:!0}:void 0,anchor:()=>this.anchor(),floating:()=>this.panel,branches:()=>[this.wrapper],dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,focusable:!1,onDismiss:()=>{this.clearTimers(),this.requestOpen(!1)},onPosition:e=>this.handlePosition(e)}}),this.handleMouseEnter=e=>{if(this.disabled)return;this.followCursor&&(this.cursor={x:e.clientX,y:e.clientY}),this.clearTimers();let t=this.resolvedEnterDelay;if(t<=0||this.provider()?.shouldSkipDelay()){this.requestOpen(!0);return}this.enterTimer=setTimeout(()=>this.requestOpen(!0),t)},this.handleMouseLeave=e=>{if(this.disabled)return;this.clearTimers();let t=this.panel?.getBoundingClientRect();if(this.open&&!this.followCursor&&t&&t.width>0&&t.height>0){this.grace.start({x:e.clientX,y:e.clientY},t,s(this.currentPlacement).side),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),Math.max(this.resolvedLeaveDelay,$o));return}this.scheduleHide()},this.handlePanelMouseEnter=()=>{this.disabled||this.clearTimers()},this.handlePanelMouseLeave=()=>{this.disabled||this.followCursor||this.scheduleHide()},this.handleDocumentPointerMove=e=>{if(!this.grace.getArea())return;let t=e.composedPath();this.wrapper&&t.includes(this.wrapper)||this.panel&&t.includes(this.panel)||this.grace.isInGraceArea({x:e.clientX,y:e.clientY})||(this.grace.clear(),this.scheduleHide())},this.handleDocumentMouseMove=e=>{this.cursor={x:e.clientX,y:e.clientY}},this.handleFocusIn=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!0))},this.handleFocusOut=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!1))},this.listening=!1,this.handleSlotChange=()=>this.requestUpdate()}static{this.tagName=`minerva-tooltip`}static{this.styles=[M,Kr,E`
:host{
display: inline-flex;
}
`,O(Qn)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}get currentPlacement(){return this.positioned?this.floating.position.placement:this.placement}get visible(){return this.open&&!this.disabled}provider(){let e=Nt(this,`minerva-tooltip-provider`);return e instanceof rs?e:null}get resolvedEnterDelay(){return this.enterDelay??this.provider()?.enterDelay??es}get resolvedLeaveDelay(){return this.leaveDelay??this.provider()?.leaveDelay??ts}triggerElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}get text(){return this.aria.label||(this.content.trim()?this.content.trim():Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`content`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `))}anchor(){return this.followCursor&&this.cursor?{getBoundingClientRect:()=>{let{x:e,y:t}=this.cursor??{x:0,y:0};return DOMRect.fromRect({x:e,y:t,width:0,height:0})}}:this.wrapper}requestOpen(e){e!==this.open&&(e||this.provider()?.markClosed(),this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.grace.clear()}scheduleHide(){clearTimeout(this.leaveTimer),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),this.resolvedLeaveDelay)}handlePosition(e){let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`),this.positioned||=!0}inPanel(e){return!!this.panel&&e.composedPath().includes(this.panel)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`focusout`,this.handleFocusOut),this.listenDocument(!1),clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.restoreDescription()}listenDocument(e){e!==this.listening&&(this.listening=e,e?(document.addEventListener(`pointermove`,this.handleDocumentPointerMove),document.addEventListener(`mousemove`,this.handleDocumentMouseMove)):(document.removeEventListener(`pointermove`,this.handleDocumentPointerMove),document.removeEventListener(`mousemove`,this.handleDocumentMouseMove)))}firstUpdated(){P&&setTimeout(()=>this.checkUsage())}checkUsage(){if(!this.isConnected)return;this.text||V(e.tagName,`has no content: set the "content" attribute, aria-label or slot="content".`);let t=this.triggerElement();!this.disabled&&t&&de(t,{includeContainer:!0}).length===0&&V(e.tagName,`the trigger is not focusable, so keyboard users cannot reach the tooltip; wrap a button / link or add tabindex="0".`)}willUpdate(e){(e.has(`open`)||e.has(`disabled`))&&(!this.open||this.disabled)&&(this.positioned=!1,this.grace.clear())}updated(){let e=this.visible;this.floating.sync(e),this.listenDocument(e),this.syncDescription(e)}syncDescription(e){let t=e?this.text:``,n=t?this.triggerElement():null;if(this.described&&this.described!==n&&this.restoreDescription(),!n)return;this.described!==n&&(this.described=n,this.describedPrev=n.getAttribute(`aria-description`));let r=this.describedPrev?`${this.describedPrev} ${t}`:t;n.getAttribute(`aria-description`)!==r&&n.setAttribute(`aria-description`,r)}restoreDescription(){let e=this.described;e&&(this.describedPrev===null?e.removeAttribute(`aria-description`):e.setAttribute(`aria-description`,this.describedPrev),this.described=null,this.describedPrev=null)}hookStates(){let e=this.currentPlacement;return{state:this.visible?`open`:`closed`,disabled:this.disabled,color:this.color,variant:this.variant,shape:this.shape,...s(e),placement:e}}render(){let e=this.visible,t=this.currentPlacement,n=e&&!this.triggerElement();return b`<div
class="tooltipTrigger"
part="trigger"
aria-describedby=${n?`tooltip`:y}
@mouseenter=${this.handleMouseEnter}
@mouseleave=${this.handleMouseLeave}
>
<slot @slotchange=${this.handleSlotChange}></slot>
</div>
${e?b`<div
id="tooltip"
part="content"
popover="manual"
role="tooltip"
dir=${ae(this)}
aria-label=${this.aria.label??y}
data-placement=${t}
class=${w({tooltip:!0,[this.color]:!0,[this.variant]:!0,[this.shape]:!0,[`animation-${this.animation}`]:!0,followCursor:this.followCursor,arrow:this.arrow,show:this.positioned})}
@mouseenter=${this.handlePanelMouseEnter}
@mouseleave=${this.handlePanelMouseLeave}
>
<slot name="content" @slotchange=${this.handleSlotChange}
>${this.content}</slot
>${this.arrow?b`<div class="tooltipArrow" part="arrow"></div>`:y}
</div>`:y}`}},H([S()],Q.prototype,`content`,void 0),H([S({type:Boolean,reflect:!0})],Q.prototype,`open`,void 0),H([S({reflect:!0})],Q.prototype,`placement`,void 0),H([S({reflect:!0})],Q.prototype,`color`,void 0),H([S({reflect:!0})],Q.prototype,`variant`,void 0),H([S({reflect:!0})],Q.prototype,`shape`,void 0),H([S({reflect:!0})],Q.prototype,`animation`,void 0),H([S({type:Boolean,reflect:!0})],Q.prototype,`arrow`,void 0),H([S({type:Boolean,reflect:!0})],Q.prototype,`disabled`,void 0),H([S({type:Number,attribute:`enter-delay`})],Q.prototype,`enterDelay`,void 0),H([S({type:Number,attribute:`leave-delay`})],Q.prototype,`leaveDelay`,void 0),H([S({converter:ns})],Q.prototype,`offset`,void 0),H([S({type:Boolean,reflect:!0,attribute:`follow-cursor`})],Q.prototype,`followCursor`,void 0),H([C(`.tooltipTrigger`)],Q.prototype,`wrapper`,void 0),H([C(`[part=content]`)],Q.prototype,`panel`,void 0),H([C(`.tooltipArrow`)],Q.prototype,`arrowEl`,void 0),H([v()],Q.prototype,`positioned`,void 0)})))()}var as,os;function ss(){return(ss=e((()=>{I(),z(),R(),k(),At(),B(),N(),Zn(),Bt(),Pr(),Wn(),g(),_(),x(),h(),gt(),as=0,os=class e extends F{constructor(...e){super(...e),this.label=``,this.items=[],this.accept=`*`,this.multiple=!1,this.replace=!1,this.loading=!1,this.removable=!1,this.retryable=!1,this.error=``,this.dragging=!1,this.uploadId=`upload-${as++}`,this.nextId=0,this.pendingRemoval=null,this.locale=new A(this),this.aria=new L(this,()=>this.labels)}static{this.tagName=`minerva-upload`}static{this.dependencies=[Rr]}static{this.styles=[M,E`
:host{
display: block;
min-width: 0;
}
`,O(un),O(Gn),E`

.error{
display: flex;
align-items: center;
gap: var(--space-2);
padding: var(--space-3) var(--space-4);
border: 1px solid var(--danger-color);
border-radius: var(--radius-md);
background: var(--danger-color-subtle);
color: var(--danger-color-text,var(--danger-color));
}
`]}get files(){return this.items.flatMap(e=>e.file?[e.file]:[])}get resolvedMaxCount(){return this.maxCount??(this.multiple?50:1)}get existingCount(){return this.replace&&!this.multiple?0:this.items.length}get blocked(){return this.isDisabled||this.loading||this.existingCount>=this.resolvedMaxCount}focus(e){this.renderRoot.querySelector(`[part=select-button]`)?.focus(e)}showPicker(){this.blocked||this.input?.click()}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.files)e.append(this.name,t);return e}getValidity(){return this.required&&this.files.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.fileMissing`),anchor:this.renderRoot.querySelector(`[part=select-button]`)??null}:{flags:{},message:``}}resetFormValue(){this.items=[],this.error=``}restoreFormState(e){e instanceof FormData&&(this.items=e.getAll(this.name).filter(e=>e instanceof File).map(e=>this.toItem(e)))}willUpdate(t){P&&(t.has(`maxCount`)||t.has(`multiple`))&&!this.multiple&&this.maxCount!==void 0&&this.maxCount>1&&V(e.tagName,`max-count (${this.maxCount}) has no effect without multiple: one file is picked at a time.`)}updated(e){super.updated(e);let t=this.pendingRemoval;if(!t||this.items.some(e=>e.id===t.id))return;this.pendingRemoval=null;let n=t.nextId?Array.from(this.renderRoot.querySelectorAll(`[data-item-id]`)).find(e=>e.dataset.itemId===t.nextId)?.querySelector(`[part=remove-button]`):null;n?n.focus():this.focus()}toItem(e){return{id:`${this.uploadId}-${this.nextId++}`,name:e.name,status:`done`,file:e}}select(e){if(this.blocked||e.length===0)return;let{t}=this.locale,n=this.texts,r=this.resolvedMaxCount;if(!this.multiple&&e.length>1||e.length+this.existingCount>r){this.error=n?.tooMany?.(r)??t(`upload.tooMany`,{count:r});return}let i=e.find(e=>!oe(e,this.accept));if(i){this.error=n?.invalidType?.(i.name)??t(`upload.invalidType`,{name:i.name});return}let a=this.maxSize,o=a===void 0?void 0:e.find(e=>e.size>a);if(o){this.error=n?.tooLarge?.(o.name)??t(`upload.tooLarge`,{name:o.name});return}if(this.error=``,!this.emit(`minerva-files-selected`,{files:e},{cancelable:!0}))return;let s=e.map(e=>this.toItem(e));this.items=this.replace&&!this.multiple?s:[...this.items,...s],this.notifyChange()}notifyChange(){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.items})}removeItem(e){if(this.isDisabled)return;let t=this.items.indexOf(e),n=this.items[t+1]??this.items[t-1];this.pendingRemoval={id:e.id,nextId:n?.id},this.emit(`minerva-remove`,{item:e},{cancelable:!0})&&(this.items=this.items.filter(t=>t!==e),this.notifyChange())}retry(e){this.isDisabled||this.loading||this.emit(`minerva-retry`,{item:e})}handleInputChange(){let e=Array.from(this.input.files??[]);this.input.value=``,this.select(e)}handleDragOver(e){e.preventDefault(),this.blocked||(this.dragging=!0)}handleDragLeave(e){e.currentTarget.contains(e.relatedTarget)||(this.dragging=!1)}handleDrop(e){e.preventDefault(),this.dragging=!1,this.select(Array.from(e.dataTransfer?.files??[]))}statusText(e){let{t}=this.locale,n=this.texts;return e.status===`uploading`?n?.uploading??t(`upload.uploading`):e.status===`error`?e.error||(n?.failed??t(`upload.failed`)):n?.done??t(`upload.done`)}hookStates(){return{disabled:this.isDisabled,loading:this.loading,dragging:this.dragging&&!this.blocked}}render(){let{t:e}=this.locale,t=this.texts,n=this.blocked,r=this.isDisabled,i=this.label||this.aria.label;return b`<div
part="root"
class="upload"
role="group"
aria-labelledby=${this.label?`label`:y}
aria-label=${!this.label&&i?i:y}
aria-description=${this.aria.description??y}
aria-busy=${this.loading?`true`:`false`}
>
<span id="label" part="label" class="label">${this.label}</span>
<div
part="dropzone"
class=${w({dropzone:!0,dragging:this.dragging&&!n})}
@dragover=${this.handleDragOver}
@dragleave=${this.handleDragLeave}
@drop=${this.handleDrop}
>
<minerva-button
part="select-button"
variant="outline"
?disabled=${n}
?loading=${this.loading}
@click=${()=>this.input.click()}
>
<span slot="start">${nr}</span>
${t?.select??e(`upload.select`)}
</minerva-button>
<input
type="file"
hidden
tabindex="-1"
aria-label=${i||y}
?disabled=${n}
accept=${this.accept}
?multiple=${this.multiple}
@change=${this.handleInputChange}
/>
</div>
${this.error?b`<div part="error" class="error" role="alert">
${this.error}
</div>`:y}
${this.items.length>0?b`<ul part="list" class="list">
${pt(this.items,e=>e.id,n=>b`<li
part=${Yn(`item`,{status:n.status})}
class="item"
data-item-id=${n.id}
>
${n.previewUrl?b`<img
src=${n.previewUrl}
alt=""
class="preview"
/>`:y}
<div class="info">
<span>${n.name}</span>
<span
role=${n.status===`error`?`alert`:`status`}
class=${w({status:!0,statusError:n.status===`error`})}
>${this.statusText(n)}</span
>
</div>
<div class="actions">
${n.status===`error`&&this.retryable?b`<button
part="retry-button"
type="button"
class=${w({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r||this.loading})}
aria-label=${t?.retry?.(n.name)??e(`upload.retry`,{name:n.name})}
?disabled=${r||this.loading}
@click=${()=>this.retry(n)}
>
${Ot}
</button>`:y}
${this.removable?b`<button
part="remove-button"
type="button"
class=${w({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r})}
aria-label=${t?.remove?.(n.name)??e(`upload.remove`,{name:n.name})}
?disabled=${r}
@click=${()=>this.removeItem(n)}
>
${Hn}
</button>`:y}
</div>
</li>`)}
</ul>`:y}
</div>`}},H([S()],os.prototype,`label`,void 0),H([S({attribute:!1})],os.prototype,`items`,void 0),H([S()],os.prototype,`accept`,void 0),H([S({type:Boolean,reflect:!0})],os.prototype,`multiple`,void 0),H([S({type:Boolean})],os.prototype,`replace`,void 0),H([S({type:Number,attribute:`max-count`})],os.prototype,`maxCount`,void 0),H([S({type:Number,attribute:`max-size`})],os.prototype,`maxSize`,void 0),H([S({type:Boolean,reflect:!0})],os.prototype,`loading`,void 0),H([S({type:Boolean})],os.prototype,`removable`,void 0),H([S({type:Boolean})],os.prototype,`retryable`,void 0),H([S({attribute:!1})],os.prototype,`texts`,void 0),H([v()],os.prototype,`error`,void 0),H([v()],os.prototype,`dragging`,void 0),H([C(`input[type=file]`)],os.prototype,`input`,void 0)})))()}var $;function cs(){return(cs=e((()=>{I(),z(),R(),k(),B(),N(),Fn(),tr(),g(),_(),x(),ft(),h(),gt(),$=class e extends D{constructor(...e){super(...e),this.items=[],this.itemPadding=8,this.overscan=5,this.loadMoreThreshold=100,this.highPerformance=!1,this.loading=!1,this.clickable=!1,this.scrollOffset=0,this.containerHeight=0,this.measuredHeight=0,this.focusedId=null,this.aria=new L(this),this.locale=new A(this),this.resizeObserver=null,this.measureObserver=null,this.lastScrollTop=0,this.loadingMore=!1}static{this.tagName=`minerva-virtual-list`}static{this.styles=[M,E`
:host{
display: block;
}
.wave{
display: inline-flex;
}
`,O(kr),O(cr)]}get scrollContainer(){return this.container??null}scrollToIndex(e){let t=this.container,n=this.rowHeight;t&&n&&(t.scrollTop=Math.max(0,e)*n,this.updateScroll(t.scrollTop))}get rowHeight(){return this.itemHeight?this.itemHeight:this.measuredHeight>0?this.measuredHeight+this.itemPadding*2:0}get needsMeasure(){return!this.itemHeight&&this.measuredHeight===0&&this.items.length>0}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.measureObserver?.disconnect(),this.measureObserver=null,this.cancelScheduled()}firstUpdated(){this.observeContainer()}reconnectedCallback(){super.reconnectedCallback(),this.observeContainer()}observeContainer(){let e=this.container;e&&(this.containerHeight=e.clientHeight,!(this.resizeObserver||typeof ResizeObserver>`u`)&&(this.resizeObserver=new ResizeObserver(e=>{for(let t of e)this.containerHeight=t.contentRect.height}),this.resizeObserver.observe(e)))}willUpdate(e){(e.has(`items`)||e.has(`loading`))&&(this.loadingMore=!1),this.focusedId!==null&&e.has(`items`)&&!this.items.some(e=>e.id===this.focusedId)&&(this.focusedId=null)}updated(){this.syncMeasure(),P&&this.items.length>0&&!this.renderItem&&V(e.tagName,`set the renderItem property (a function returning the content of a row); rows show the item id meanwhile.`),P&&this.maxHeight===void 0&&V(e.tagName,`set max-height (pixels): without a bounded height the list cannot scroll, so every row is rendered.`)}syncMeasure(){let e=this.needsMeasure?this.measureElement:void 0;if(!e){this.measureObserver?.disconnect(),this.measureObserver=null;return}let t=()=>{let t=e.offsetHeight;t>0&&(this.measuredHeight=t)};t(),!(this.measureObserver||typeof ResizeObserver>`u`)&&(this.measureObserver=new ResizeObserver(t),this.measureObserver.observe(e))}cancelScheduled(){this.raf!==void 0&&(cancelAnimationFrame(this.raf),this.raf=void 0),this.idle!==void 0&&(typeof cancelIdleCallback==`function`&&cancelIdleCallback(this.idle),this.idle=void 0)}schedule(e){if(!this.highPerformance){e();return}this.cancelScheduled(),this.raf=requestAnimationFrame(()=>{this.raf=void 0,typeof requestIdleCallback==`function`?this.idle=requestIdleCallback(()=>{this.idle=void 0,e()},{timeout:100}):e()})}updateScroll(e){this.scrollOffset=e}handleScroll(e){let{scrollTop:t,scrollHeight:n,clientHeight:r}=e.currentTarget,i=t>this.lastScrollTop;this.lastScrollTop=t,this.schedule(()=>{this.updateScroll(t),i&&!this.loadingMore&&!this.loading&&n-t-r<this.loadMoreThreshold&&n>r&&(this.loadingMore=!0,this.emit(`minerva-load-more`))})}visibleWindow(){let e=this.rowHeight;if(!e)return[];let{start:t,end:n}=ge({scrollTop:this.scrollOffset,viewportHeight:this.containerHeight,itemHeight:e,itemCount:this.items.length,overscan:this.overscan}),r=[];for(let i=t;i<n;i++)r.push({index:i,start:i*e});if(this.focusedId!==null){let i=this.items.findIndex(e=>e.id===this.focusedId);if(i>=0&&(i<t||i>=n)){let n={index:i,start:i*e};i<t?r.unshift(n):r.push(n)}}return r}renderContent(e,t){return this.renderItem?this.renderItem(e,t):String(e.id)}activate(e,t){this.emit(`minerva-item-click`,{item:e,index:t})}handleRowKeyDown(e,t,n){e.composedPath()[0]===e.currentTarget&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.activate(t,n))}handleRowFocusOut(e){let t=e.currentTarget,n=e.relatedTarget;(!n||!t.contains(n))&&(this.focusedId=null)}hookStates(){return{loading:this.loading}}render(){let e=this.rowHeight,t=this.aria.label??y,n=this.visibleWindow(),r=this.items.length;return b`<div
class="virtualList"
part="root"
role="region"
tabindex="0"
aria-label=${t}
aria-busy=${this.loading?`true`:y}
style=${T({maxHeight:this.maxHeight===void 0?void 0:`${this.maxHeight}px`,overflow:`auto`,position:`relative`})}
@scroll=${this.handleScroll}
>
${this.needsMeasure?b`<div class="measureItem" aria-hidden="true">
${this.renderContent(this.items[0],0)}
</div>`:y}
<div
class="virtualListContent"
part="list"
role="list"
aria-label=${t}
style=${T({height:e?`${r*e}px`:`auto`,position:`relative`,willChange:`transform`})}
>
${pt(n,e=>this.items[e.index].id,t=>{let n=this.items[t.index];return b`<div
part="item"
role="listitem"
class=${w({virtualListItem:!0,clickable:this.clickable})}
style=${T({position:`absolute`,top:`0`,transform:`translateY(${t.start}px)`,width:`100%`,height:`${e}px`,willChange:`transform`,padding:`${this.itemPadding}px`})}
tabindex=${this.clickable?`0`:y}
aria-setsize=${r}
aria-posinset=${t.index+1}
@click=${this.clickable?()=>this.activate(n,t.index):y}
@keydown=${this.clickable?e=>this.handleRowKeyDown(e,n,t.index):y}
@focusin=${()=>this.focusedId=n.id}
@focusout=${this.handleRowFocusOut}
>
${this.renderContent(n,t.index)}
</div>`})}
</div>
${this.loading?b`<div class="loadingWrapper" part="loading">
<div
class="progressIndicator primary"
role="progressbar"
aria-label=${this.locale.t(`common.loading`)}
>
<div class="waveContainer small">
<span class="wave" aria-hidden="true">${Or}</span>
</div>
</div>
</div>`:y}
</div>`}},H([S({attribute:!1})],$.prototype,`items`,void 0),H([S({attribute:!1})],$.prototype,`renderItem`,void 0),H([S({type:Number,attribute:`item-height`})],$.prototype,`itemHeight`,void 0),H([S({type:Number,attribute:`item-padding`})],$.prototype,`itemPadding`,void 0),H([S({type:Number})],$.prototype,`overscan`,void 0),H([S({type:Number,attribute:`max-height`})],$.prototype,`maxHeight`,void 0),H([S({type:Number,attribute:`load-more-threshold`})],$.prototype,`loadMoreThreshold`,void 0),H([S({type:Boolean,attribute:`high-performance`})],$.prototype,`highPerformance`,void 0),H([S({type:Boolean,reflect:!0})],$.prototype,`loading`,void 0),H([S({type:Boolean,reflect:!0})],$.prototype,`clickable`,void 0),H([v()],$.prototype,`scrollOffset`,void 0),H([v()],$.prototype,`containerHeight`,void 0),H([v()],$.prototype,`measuredHeight`,void 0),H([v()],$.prototype,`focusedId`,void 0),H([C(`.virtualList`)],$.prototype,`container`,void 0),H([C(`.measureItem`)],$.prototype,`measureElement`,void 0)})))()}var ls,us,ds,fs,ps;function ms(){return(ms=e((()=>{I(),z(),R(),k(),At(),B(),N(),Vn(),g(),_(),p(),h(),ls=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],us=/^\d{4}-\d{2}-\d{2}$/,ds={fromAttribute(e){return Ve(e?.trim()??``)??void 0},toAttribute(e){return e instanceof Date&&!Number.isNaN(e.getTime())?f(e):null}},fs=e=>typeof e==`number`&&Number.isFinite(e)&&e>0?Math.floor(e):0,ps=class e extends D{constructor(...e){super(...e),this.firstDayOfWeek=1,this.showNavigation=!1,this.disabled=!1,this.size=`medium`,this.focusedKey=``,this.pendingFocus=null,this.i18n=new A(this),this.aria=new L(this)}static{this.tagName=`minerva-week-strip`}static{this.styles=[M,E`
:host{
display: block;
inline-size: 100%;
}
.navButton svg{
flex-shrink: 0;
}
`,O(Ln)]}get todayKey(){return this.today&&Ve(this.today)?this.today:f(new Date)}get start(){let e=this.week,t=e instanceof Date&&!Number.isNaN(e.getTime())?e:Ve(this.value??``)??Ve(this.todayKey)??new Date;return Fe(t,this.firstDayOfWeek)}focus(e){this.renderRoot.querySelector(`[role="option"][tabindex="0"]`)?.focus(e)}goToWeek(e){let t=Fe(e,this.firstDayOfWeek);f(t)!==f(this.start)&&(this.week=t,this.emit(`minerva-week-change`,{week:t}))}select(e){if(this.disabled)return;let t=f(e);this.goToWeek(e),t!==this.value&&(this.value=t,this.emit(`minerva-change`,{value:t}))}handleKeyDown(e,t){if(this.disabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=this.start,r;switch(we(e.key,this)){case`ArrowLeft`:r=m(t,-1);break;case`ArrowRight`:r=m(t,1);break;case`Home`:r=n;break;case`End`:r=m(n,6);break;case`PageUp`:r=m(t,-7);break;case`PageDown`:r=m(t,7);break;default:return}e.preventDefault(),this.pendingFocus=f(r),this.focusedKey=f(r),this.goToWeek(r)}willUpdate(t){if(!t.has(`value`))return;P&&this.value&&!us.test(this.value)&&V(e.tagName,`value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`);let n=Ve(this.value??``);if(n&&!t.has(`week`)){let e=Fe(n,this.firstDayOfWeek);f(e)!==f(this.start)&&(this.week=e)}}updated(){if(this.disabled||!this.pendingFocus)return;let e=this.renderRoot.querySelector(`[data-date="${this.pendingFocus}"]`);e&&(this.pendingFocus=null,e.focus())}hookStates(){return{disabled:this.disabled,size:this.size}}heading(e,t,n){try{let r=new Intl.DateTimeFormat(n,{year:`numeric`,month:`long`});return e.getMonth()===t.getMonth()?r.format(e):`${new Intl.DateTimeFormat(n,{month:`long`,...e.getFullYear()!==t.getFullYear()&&{year:`numeric`}}).format(e)} – ${r.format(t)}`}catch{return f(e).slice(0,7)}}render(){let e=this.i18n.t,t=this.start,n=Array.from({length:7},(e,n)=>m(t,n)),r=n.map(f),i=this.todayKey,a=this.value||void 0,o=[this.focusedKey,a,i].find(e=>e&&r.includes(e))??r[0],s=this.disabled,c=[`small`,`medium`,`large`].includes(this.size)?this.size:`medium`,l=this.locale??this.i18n.language,u;try{let e=new Intl.DateTimeFormat(l,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`});u=t=>e.format(t)}catch{u=f}let d=(t,n)=>{let r=this.markers?.[t];if(this.getDayLabel)return this.getDayLabel(t,r);let i=u(n),a=fs(r);return a?e(`weekStrip.dayWithMarkers`,{date:i,count:a}):r===!0?e(`weekStrip.dayMarked`,{date:i}):i};return b`<div part="root" class="weekStrip ${c}">
${this.showNavigation?b`<div class="toolbar">
<button
type="button"
part="nav-button"
class="navButton"
aria-label=${this.previousWeekLabel??e(`weekStrip.previousWeek`)}
?disabled=${s}
@click=${()=>this.goToWeek(m(t,-7))}
>
${mr}
</button>
<span part="heading" class="heading" aria-live="polite"
>${this.heading(t,n[6],l)}</span
>
<button
type="button"
part="nav-button"
class="navButton"
aria-label=${this.nextWeekLabel??e(`weekStrip.nextWeek`)}
?disabled=${s}
@click=${()=>this.goToWeek(m(t,7))}
>
${ar}
</button>
</div>`:y}
<div
part="list"
role="listbox"
aria-label=${this.aria.label??e(`weekStrip.label`)}
aria-orientation="horizontal"
aria-disabled=${s?`true`:y}
class="days"
>
${n.map(t=>{let n=f(t),r=this.markers?.[n],c=fs(r),l=(t.getDay()+6)%7,u={selected:a===n,today:n===i,disabled:s},ee=c?`marker count`:r===!0?`marker dot`:`marker`;return b`<div
role="option"
part=${Yn(`day`,u)}
class="day"
data-date=${n}
aria-label=${d(n,t)}
aria-selected=${String(u.selected)}
aria-current=${u.today?`date`:y}
aria-disabled=${s?`true`:y}
tabindex=${!s&&n===o?`0`:`-1`}
@focus=${()=>this.focusedKey=n}
@click=${()=>this.select(t)}
@keydown=${e=>this.handleKeyDown(e,t)}
>
<span class="weekday" aria-hidden="true"
>${this.weekdayLabels?.[l]??e(`monthCalendar.weekdays.${ls[l]}`)}</span
>
<span class="dayNumber" aria-hidden="true">${t.getDate()}</span>
<span part="indicator" class=${ee} aria-hidden="true"
>${c?c>99?`99+`:c:``}</span
>
</div>`})}
</div>
</div>`}},H([S({reflect:!0})],ps.prototype,`value`,void 0),H([S({converter:ds,reflect:!0})],ps.prototype,`week`,void 0),H([S({type:Number,attribute:`first-day-of-week`})],ps.prototype,`firstDayOfWeek`,void 0),H([S()],ps.prototype,`today`,void 0),H([S({attribute:!1})],ps.prototype,`markers`,void 0),H([S({type:Boolean,attribute:`show-navigation`,reflect:!0})],ps.prototype,`showNavigation`,void 0),H([S({attribute:`previous-week-label`})],ps.prototype,`previousWeekLabel`,void 0),H([S({attribute:`next-week-label`})],ps.prototype,`nextWeekLabel`,void 0),H([S()],ps.prototype,`locale`,void 0),H([S({type:Boolean,reflect:!0})],ps.prototype,`disabled`,void 0),H([S({reflect:!0})],ps.prototype,`size`,void 0),H([S({attribute:!1})],ps.prototype,`weekdayLabels`,void 0),H([S({attribute:!1})],ps.prototype,`getDayLabel`,void 0),H([v()],ps.prototype,`focusedKey`,void 0)})))()}var hs,gs,_s,vs,ys,bs;function xs(){return(xs=e((()=>{Ir(),_(),yt(),Ct(),wt(),St(),hs=class extends Lr{engineOptions(){return{...this.options}}engineMounted(e){this.book&&e.setBook(this.book)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`book`)&&this.book&&e.setBook(this.book)}setBook(e){this.instance?.setBook(e)}applyDeltas(e){this.instance?.applyDeltas(e)}},H([S({attribute:!1})],hs.prototype,`book`,void 0),gs=class{reset(){this.previous=void 0}apply(e,t,n){let r=this.previous;if(this.previous=e,!e||e===r)return;let i=r?.length??0;if(r&&i>0&&e.length>=i&&e[0]===r[0]&&e[i-1]===r[i-1]){e.length>i&&t(e.slice(i));return}n(e)}},_s=class extends hs{static{this.tagName=`minerva-depth-chart`}createEngine(e,t){return bt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`range`,e=>this.emit(`minerva-range-change`,{range:e}))]}setRange(e){this.instance?.setRange(e)}},H([S({attribute:!1})],_s.prototype,`options`,void 0),vs=class extends hs{static{this.tagName=`minerva-order-book`}get defaultHeight(){return 420}createEngine(e,t){return vt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`levelClick`,e=>this.emit(`minerva-level-click`,e))]}engineMounted(e){super.engineMounted(e),this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}syncEngine(e,t){super.syncEngine(e,t),t.has(`lastPrice`)&&this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}setLastPrice(e){this.instance?.setLastPrice(e)}},H([S({type:Number,attribute:`last-price`})],vs.prototype,`lastPrice`,void 0),H([S({attribute:!1})],vs.prototype,`options`,void 0),ys=class extends hs{constructor(...e){super(...e),this.feed=new gs}static{this.tagName=`minerva-order-book-heatmap`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),xt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e})),e.on(`follow`,e=>this.emit(`minerva-follow-change`,{follow:e}))]}feedTrades(e){let t=t=>e.addTrades(t);this.feed.apply(this.trades,t,t)}engineMounted(e){super.engineMounted(e),this.feedTrades(e)}syncEngine(e,t){super.syncEngine(e,t),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}resetView(){this.instance?.resetView()}getRenderer(){return this.instance?.getRenderer()??null}},H([S({attribute:!1})],ys.prototype,`trades`,void 0),H([S({attribute:!1})],ys.prototype,`options`,void 0),bs=class extends Lr{constructor(...e){super(...e),this.feed=new gs}static{this.tagName=`minerva-time-and-sales`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),_t(e,t)}engineOptions(){return{...this.options}}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`tradeClick`,e=>this.emit(`minerva-trade-click`,e)),e.on(`pause`,e=>this.emit(`minerva-pause`,{paused:e}))]}feedTrades(e){this.feed.apply(this.trades,t=>e.addTrades(t),t=>e.setTrades(t))}engineMounted(e){this.feedTrades(e)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}setTrades(e){this.instance?.setTrades(e)}clear(){this.instance?.clear()}scrollToLatest(){this.instance?.scrollToLatest()}},H([S({attribute:!1})],bs.prototype,`trades`,void 0),H([S({attribute:!1})],bs.prototype,`options`,void 0)})))()}var Ss,Cs;function ws(){return(ws=e((()=>{Ir(),_(),Tt(),Ss={fromAttribute:e=>e===null?void 0:/^\d+$/.test(e)?Number(e):e},Cs=class extends Lr{constructor(...e){super(...e),this.height=480,this.chartStyle=`candles`}static{this.tagName=`minerva-trading-chart`}createEngine(e,t){return Et(e,t)}engineOptions(){return{...this.options,bars:this.bars??this.options?.bars,symbol:this.symbol??this.options?.symbol,timeframe:this.timeframe??this.options?.timeframe,chartStyle:this.chartStyle,indicators:this.indicators??this.options?.indicators}}bindEngine(e){return[e.on(`crosshairMove`,e=>this.emit(`minerva-crosshair-move`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`visibleRangeChange`,e=>this.emit(`minerva-visible-range-change`,e)),e.on(`orderMove`,e=>this.emit(`minerva-order-move`,e)),e.on(`orderCreate`,e=>this.emit(`minerva-order-create`,e)),e.on(`orderCancel`,e=>this.emit(`minerva-order-cancel`,e)),e.on(`drawingsChange`,e=>this.emit(`minerva-drawings-change`,{drawings:e})),e.on(`drawingSelect`,e=>this.emit(`minerva-drawing-select`,{id:e})),e.on(`drawingToolChange`,e=>this.emit(`minerva-drawing-tool-change`,{tool:e})),e.on(`undoChange`,e=>this.emit(`minerva-undo-change`,e)),e.on(`replayChange`,e=>this.emit(`minerva-replay-change`,e)),e.on(`fullscreenChange`,e=>this.emit(`minerva-fullscreen-change`,{fullscreen:e})),e.on(`indicatorToggle`,e=>this.emit(`minerva-indicator-toggle`,e)),e.on(`historyRequest`,e=>this.emit(`minerva-history-request`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}updateBar(e){this.instance?.update(e)}appendBars(e){this.instance?.appendBars(e)}prependBars(e){this.instance?.prependBars(e)}setBars(e){this.instance?.setBars(e)}getBarCount(){return this.instance?.getBarCount()??0}getBar(e){return this.instance?.getBar(e)??null}scrollToRealtime(e){this.instance?.scrollToRealtime(e)}fitContent(){this.instance?.fitContent()}getVisibleRange(){return this.instance?.getVisibleRange()??null}setVisibleRange(e){this.instance?.setVisibleRange(e)}getVisibleTimeRange(){return this.instance?.getVisibleTimeRange()??null}setVisibleTimeRange(e){this.instance?.setVisibleTimeRange(e)}setCrosshair(e,t){this.instance?.setCrosshair(e,t)}setScaleMode(e){this.instance?.setScaleMode(e)}resetPriceScales(){this.instance?.resetPriceScales()}setDrawingTool(e){this.instance?.setDrawingTool(e)}getDrawings(){return this.instance?.getDrawings()??[]}removeDrawing(e){this.instance?.removeDrawing(e)}selectDrawing(e){this.instance?.selectDrawing(e)}updateDrawing(e,t){this.instance?.updateDrawing(e,t)}undo(){this.instance?.undo()}redo(){this.instance?.redo()}getUndoState(){return this.instance?.getUndoState()??{canUndo:!1,canRedo:!1}}startReplay(e){this.instance?.startReplay(e)}replayStep(e){this.instance?.replayStep(e)}replayPlay(e){this.instance?.replayPlay(e)}replayPause(){this.instance?.replayPause()}stopReplay(){this.instance?.stopReplay()}getReplayState(){return this.instance?.getReplayState()??null}toDataURL(e,t){return this.instance?.toDataURL(e,t)??``}toBlob(e,t){return this.instance?.toBlob(e,t)??Promise.resolve(null)}requestChartFullscreen(){return this.instance?.requestFullscreen()??Promise.resolve()}exitChartFullscreen(){return this.instance?.exitFullscreen()??Promise.resolve()}setIndicatorVisible(e,t){this.instance?.setIndicatorVisible(e,t)}getRenderer(){return this.instance?.getRenderer()??null}},H([S()],Cs.prototype,`height`,void 0),H([S({attribute:!1})],Cs.prototype,`bars`,void 0),H([S()],Cs.prototype,`symbol`,void 0),H([S({converter:Ss})],Cs.prototype,`timeframe`,void 0),H([S({attribute:`chart-style`})],Cs.prototype,`chartStyle`,void 0),H([S({attribute:!1})],Cs.prototype,`indicators`,void 0),H([S({attribute:!1})],Cs.prototype,`options`,void 0)})))()}export{Ra as $,ei as $t,ko as A,Pi as At,Y as B,Si as Bt,Vo as C,Ji as Ct,Fo as D,K as Dt,jo as E,zi as Et,_o as F,Ai as Ft,J as G,di as Gt,no as H,_i as Ht,vo as I,Oi as It,Xa as J,ui as Jt,$a as K,fi as Kt,X as L,Ti as Lt,Eo as M,ki as Mt,To as N,ji as Nt,Ro as O,Ni as Ot,Do as P,Di as Pt,qa as Q,ri as Qt,go as R,G as Rt,Mo as S,Yi as St,Bo as T,Ii as Tt,io as U,W as Ut,ro as V,vi as Vt,ao as W,gi as Wt,Ga as X,si as Xt,Ka as Y,oi as Yt,Ja as Z,ii as Zt,Xo as _,ia as _t,xs as a,Jr as an,Aa as at,Io as b,ea as bt,ps as c,Kr as cn,ma as ct,$ as d,Hr as dn,ha as dt,ai as en,za as et,os as f,Vr as fn,ga as ft,is as g,oa as gt,Q as h,aa as ht,bs as i,Yr as in,ka as it,yo as j,Ei as jt,Z as k,Fi as kt,ms as l,Wr as ln,_a as lt,rs as m,zr as mn,da as mt,ws as n,$r as nn,Ia as nt,_s as o,Gr as on,wa as ot,ss as p,Br as pn,fa as pt,Ya as q,li as qt,ys as r,U as rn,ja as rt,vs as s,qr as sn,Ta as st,Cs as t,ni as tn,q as tt,cs as u,Ur as un,va as ut,Zo as v,$i as vt,Lo as w,qi as wt,zo as x,Xi as xt,No as y,Qi as yt,so as z,Ci as zt};