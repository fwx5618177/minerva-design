import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{At as t,Bn as n,C as r,Cn as i,Ct as a,Dt as o,E as s,En as c,Et as l,F as u,Ft as d,G as f,Gt as p,H as ee,Ht as te,In as ne,Jt as re,K as ie,Kn as ae,L as oe,Lt as se,M as ce,Mn as m,Mt as le,N as ue,Nt as de,O as fe,Ot as pe,Pn as me,Pt as he,Q as ge,Qn as _e,Rn as ve,Rt as ye,St as be,Tn as xe,U as Se,Un as Ce,Vn as we,Y as Te,Yn as Ee,Yt as De,Zn as Oe,_n as ke,_t as Ae,an as je,at as Me,b as Ne,cr as Pe,ct as Fe,d as Ie,dr as Le,dt as Re,et as ze,fr as Be,g as Ve,gn as He,gt as Ue,hn as We,hr as Ge,ht as h,i as Ke,kt as qe,ln as Je,lr as Ye,nn as Xe,nt as Ze,o as Qe,or as $e,p as et,pt as tt,q as nt,qt as rt,rr as it,u as at,ut as ot,v as st,w as ct,xn as lt,z as ut,zn as dt}from"./angular-preview-B7Uzpk8P.js";import{A as g,C as _,D as v,N as y,P as b,_ as ft,b as x,c as pt,g as mt,k as S,m as ht,s as gt,w as C,x as w,y as T,z as E}from"./minerva-web-components-DlAztivh.js";import{E as _t,M as vt,T as yt,a as bt,c as xt,i as St,n as Ct,o as wt,r as Tt,s as Et,t as Dt,x as Ot}from"./angular-preview-BrYDyM0M.js";import{E as kt,a as At,c as jt,d as Mt,f as Nt,i as Pt,k as Ft,l as It,n as Lt,o as Rt,p as zt,r as Bt,s as Vt,t as Ht,u as Ut}from"./angular-preview-CF5RJLp8.js";import{a as Wt,r as Gt}from"./angular-preview-DUwkAChw.js";import{$ as Kt,$t as qt,A as Jt,An as Yt,Ar as D,At as Xt,B as Zt,Bn as Qt,Br as $t,C as en,Cr as O,D as tn,Dn as k,Dr as nn,E as rn,En as an,F as on,Fr as sn,G as cn,Gr as A,H as ln,Hr as un,I as dn,In as j,J as fn,Jr as pn,K as mn,Kr as M,L as hn,Ln as N,Lr as P,Lt as gn,M as _n,Mr as vn,Mt as yn,N as bn,Nr as xn,O as Sn,On as Cn,Or as wn,P as Tn,Pr as En,Q as Dn,Qn as On,Qt as kn,R as An,Rr as F,Rt as jn,Sr as I,St as Mn,T as Nn,Tn as Pn,U as Fn,V as In,Vn as Ln,Vr as Rn,W as zn,Wn as Bn,Wr as Vn,X as Hn,Xn as Un,Xr as L,Y as Wn,Yn as Gn,Yr as Kn,Z as qn,Zr as Jn,Zt as Yn,_ as Xn,_r as Zn,ar as Qn,b as $n,br as er,ct as tr,dn as nr,dt as rr,en as ir,et as ar,fn as or,fr as sr,ft as cr,g as lr,gr as ur,gt as dr,h as fr,hr as pr,ht as mr,in as hr,ir as gr,it as _r,j as vr,jn as yr,jr as R,jt as br,k as xr,kn as Sr,kr as z,kt as Cr,lr as wr,lt as Tr,m as Er,mr as Dr,mt as Or,n as kr,nt as Ar,or as jr,p as Mr,pr as Nr,pt as Pr,q as Fr,qn as Ir,qr as Lr,rn as Rr,rr as zr,rt as Br,sr as B,st as Vr,t as Hr,tr as Ur,tt as Wr,ut as Gr,v as Kr,w as qr,wr as V,xr as Jr,xt as Yr,y as Xr,yr as Zr,z as Qr,zr as $r}from"./minerva-web-components-DDITEc7N.js";import{t as H}from"./minerva-web-components-D61_qRVd.js";import{Bn as ei,Gt as ti,Jt as ni,Kt as ri,U as ii,Un as ai,W as oi,Wn as si,at as ci,it as li,qt as ui,z as di,zn as fi}from"./minerva-web-components-DbByVyhY.js";var pi;function mi(){return(mi=e((()=>{u(),pi=class{constructor(e,t){this.options=t,this.layer=null,e.addController(this)}activate(e){if(this.layer?.element===e){this.layer.update(this.options());return}this.deactivate(),this.layer=at(e,this.options())}deactivate(){this.layer?.destroy(),this.layer=null}get active(){return this.layer!==null}hostDisconnected(){this.deactivate()}}})))()}var hi;function gi(){return(gi=e((()=>{u(),hi=class{constructor(e,t){this.host=e,this.options=t,this.stop=null,this.placement=`bottom`,e.addController(this)}start(e,t){this.end(),t.style.position=`fixed`,t.style.left=`-9999px`,t.style.top=`-9999px`;let{arrowSize:n,onPosition:r,...i}=this.options();this.stop=ue(e,t,i,e=>{ge(t,e,{arrowSize:n});let{side:i,align:a}=Se(e.placement);t.dataset.side=i,t.dataset.align=a,t.dataset.placement=e.placement,e.placement!==this.placement&&(this.placement=e.placement,this.host.requestUpdate()),r?.(e)})}end(){this.stop?.(),this.stop=null}get running(){return this.stop!==null}hostDisconnected(){this.end()}}})))()}var _i;function vi(){return(vi=e((()=>{u(),_i=class{constructor(e,t){this.options=t,this.scope=null,this.container=null,e.addController(this)}activate(e){this.scope&&this.container===e||(this.deactivate(),this.container=e,this.scope=st(e,this.options()),this.scope.activate())}deactivate(){let e=this.container,t=e?Ie(document):null;e&&t&&oe(e,t)&&t.blur?.(),this.scope?.deactivate(),this.scope=null,this.container=null}get active(){return this.scope!==null}hostDisconnected(){this.deactivate()}}})))()}var yi,bi;function xi(){return(xi=e((()=>{Rn(),mi(),gi(),vi(),g(),u(),yi=class{constructor(e,t){this.options=t,this.shown=null,e.addController(this),this.position=new hi(e,()=>{let{anchor:e,floating:t,branches:n,onDismiss:r,...i}=this.options();return i}),this.layer=new pi(e,()=>{let e=this.options();return{branches:e.branches,onEscapeKeyDown:t=>{if(e.onEscapeKeyDown?.(t),t.defaultPrevented)return;let n=this.shown,r=Ie(document);n&&r&&oe(n,r)&&e.returnFocusOnEscape?.()?.focus()},onPointerDownOutside:()=>e.dismissOnPointerDownOutside??!0,onFocusOutside:()=>e.dismissOnFocusOutside??!0,onDismiss:e.onDismiss}}),this.scope=new _i(e,()=>({autoFocus:!1,restoreFocus:!1}))}sync(e){let t=this.options(),n=e?t.floating():null,r=e?t.anchor():null;if(!n||!r){this.close();return}this.shown!==n&&(this.close(),this.shown=n,$t(n),this.position.start(r,n),this.layer.activate(n),t.focusable&&this.scope.activate(n))}reposition(){let e=this.options(),t=this.shown,n=e.anchor();t&&n&&this.position.start(n,t)}get isOpen(){return this.shown!==null}close(){this.shown&&=(this.scope.deactivate(),this.layer.deactivate(),this.position.end(),$r(this.shown),null)}hostDisconnected(){this.close()}},bi=E`
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
`})))()}var Si;function Ci(){return(Ci=e((()=>{u(),Si=class{constructor(e){this.restoreScroll=null,this.restoreHidden=null,e.addController(this)}activate(e,t={}){this.restoreHidden||=((t.lockScroll??!0)&&(this.restoreScroll=ct()),s(e))}deactivate(){this.restoreScroll?.(),this.restoreScroll=null,this.restoreHidden?.(),this.restoreHidden=null}get active(){return this.restoreHidden!==null}hostDisconnected(){this.deactivate()}}})))()}var wi;function Ti(){return(Ti=e((()=>{wi=class{constructor(e,t,n=()=>!0){this.host=e,this.send=e=>{this.machine.send(e)},this.machine=t,this.shouldUpdate=n,e.addController(this)}get state(){return this.machine.getState()}sync(e){this.machine.setProps(e)}hostConnected(){this.unsubscribe??=this.machine.subscribe((e,t)=>{this.shouldUpdate(e,t)&&this.host.requestUpdate()})}hostDisconnected(){this.unsubscribe?.(),this.unsubscribe=void 0}}})))()}var Ei,U;function Di(){return(Di=e((()=>{A(),I(),B(),Rn(),P(),vn(),R(),j(),kn(),Ti(),g(),_(),x(),m(),gt(),Ei={fromAttribute:e=>(e??``).split(/[\s,]+/).map(e=>parseInt(e,10)).filter(e=>!isNaN(e)&&e>0),toAttribute:e=>e.join(`,`)},U=class e extends z{constructor(...e){super(...e),this.current=1,this.total=0,this.pageSize=10,this.disabled=!1,this.showQuickJumper=!1,this.showSizeChanger=!1,this.pageSizeOptions=[10,20,50,100],this.showTotal=!1,this.size=`medium`,this.shape=`rounded`,this.variant=`solid`,this.simple=!1,this.hideEdges=!1,this.hideNumbers=!1,this.responsive=!1,this.jumpValue=``,this.simpleDraft=null,this.ripples=[],this.aria=new M(this),this.locale=new F(this),this.nextRippleId=0,this.restoreFocus=null,this.pagination=new wi(this,d(this.paginationProps()),()=>!1),this.handleKeyDown=e=>{let t=e.key;(t===`ArrowLeft`||t===`ArrowRight`)&&ie(this)===`rtl`&&(t=t===`ArrowLeft`?`ArrowRight`:`ArrowLeft`);let n=pe(t,this.current,this.totalPages);n!==null&&(e.preventDefault(),this.changePage(n,`active`))},this.handleJump=e=>{if(e.key!==`Enter`)return;e.preventDefault();let t=parseInt(this.jumpValue,10);!isNaN(t)&&t>=1&&t<=this.totalPages&&(this.changePage(t),this.jumpValue=``,e.target.value=``)},this.handleSizeChange=e=>{let t=e.target,n=parseInt(t.value,10);this.send({type:`SET_PAGE_SIZE`,pageSize:n}),this.pageSize!==n&&(t.value=String(this.pageSize))},this.commitSimpleDraft=()=>{let e=this.simpleDraft;if(e===null)return;this.simpleDraft=null;let t=parseInt(e,10);isNaN(t)||this.changePage(Math.min(Math.max(t,1),this.totalPages))}}static{this.tagName=`minerva-pagination`}static{this.styles=[D,E`
:host{
display: block;
}
`,N(Yn)]}paginationProps(){return{page:this.current,pageSize:this.pageSize,total:this.total,disabled:this.disabled,onChange:(e,t)=>this.request(e,t)}}send(e){this.pagination.sync(this.paginationProps()),this.pagination.send(e)}get totalPages(){return n(this.total,this.pageSize)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}request(e,t){let n={page:e,pageSize:t};return this.emit(`minerva-page-change`,n,{cancelable:!0})?(this.current=e,this.pageSize=t,!0):!1}changePage(e,t=`if-lost`){ve(this.current,e,this.totalPages,this.disabled)&&(this.restoreFocus={mode:t,page:e},this.send({type:`GOTO`,page:e}))}willUpdate(t){V&&(t.has(`current`)||t.has(`total`))&&this.total>0&&this.current>this.totalPages&&O(e.tagName,`current (${this.current}) is greater than the number of pages (${this.totalPages}).`)}updated(){let e=this.restoreFocus;this.restoreFocus=null;let t=this.shadowRoot;if(!e||!t||e.page!==this.current)return;let n=t.activeElement,r=!n||n.disabled===!0;(e.mode===`active`||r)&&(t.querySelector(`[aria-current="page"]`)??t.querySelector(`button:not(:disabled), input`))?.focus()}handleItemClick(e,t,n){if(ve(this.current,e,this.totalPages,this.disabled)){if(n.detail>0){let e=n.currentTarget.getBoundingClientRect();this.ripples=[...this.ripples,{x:n.clientX-e.left,y:n.clientY-e.top,id:this.nextRippleId++,itemKey:t}],clearTimeout(this.rippleTimer),this.rippleTimer=setTimeout(()=>this.ripples=[],1e3)}this.changePage(e)}}label(e,t){let n=this.labels,r=this.locale.t;switch(e){case`prev`:return n?.prev??r(`pagination.prev`);case`next`:return n?.next??r(`pagination.next`);case`jump-prev`:return n?.jumpPrev??r(`pagination.jumpPrev`);case`jump-next`:return n?.jumpNext??r(`pagination.jumpNext`);default:return n?.page?.(t)??r(`pagination.page`,{page:t})}}hookStates(){return{disabled:this.disabled,size:this.size,shape:this.shape,variant:this.variant}}renderItem(e){let{type:t,target:n,key:r}=e;if(t===`ellipsis`)return b`<span class="ellipsis" aria-hidden="true">…</span>`;let i=this.current,a=t===`page`&&n===i,o=this.disabled||(t===`prev`?i<=1:t===`next`&&i>=this.totalPages),s;switch(t){case`prev`:s=b`<slot name="prev-icon">${Qn}</slot>`;break;case`next`:s=b`<slot name="next-icon">${gr}</slot>`;break;case`jump-prev`:case`jump-next`:s=b`<span class="jumpWrapper"
><slot
name=${t===`jump-prev`?`jump-prev-icon`:`jump-next-icon`}
>${pr}</slot
><span class="jumpHint" aria-hidden="true"
>${this.label(t,n)}</span
></span
>`;break;default:s=n}return this.itemRender&&(s=this.itemRender(n,t)),b`<button
type="button"
part=${xn(`item`,{current:a,disabled:o})}
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
</button>`}items(){return le({page:this.current,totalPages:this.totalPages,siblingCount:this.siblingCount,boundaryCount:this.boundaryCount,hideEdges:this.hideEdges}).map(({key:e,kind:t,page:n})=>({key:e,type:t,target:n}))}renderPageList(){let e=this.current,t=t=>this.hideEdges?y:this.renderItem({key:t,type:t,target:t===`prev`?e-1:e+1});return this.simple?b`${t(`prev`)}
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
${t(`next`)}`:pt(this.items(),e=>e.key,e=>this.renderItem(e))}render(){let e=this.locale.t,t=this.labels,n=this.total,r=this.pageSize,i=Ze(this.current,r,n),a=this.pageSizeOptions.includes(r)?this.pageSizeOptions:[...this.pageSizeOptions,r].sort((e,t)=>e-t),o=n=>t?.pageSizeOption?.(n)??e(`pagination.pageSizeOption`,{size:n});return b`<nav
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
</nav>`}},H([S({type:Number,reflect:!0})],U.prototype,`current`,void 0),H([S({type:Number})],U.prototype,`total`,void 0),H([S({type:Number,reflect:!0,attribute:`page-size`})],U.prototype,`pageSize`,void 0),H([S({type:Boolean,reflect:!0})],U.prototype,`disabled`,void 0),H([S({type:Boolean,attribute:`show-quick-jumper`})],U.prototype,`showQuickJumper`,void 0),H([S({type:Boolean,attribute:`show-size-changer`})],U.prototype,`showSizeChanger`,void 0),H([S({attribute:`page-size-options`,converter:Ei})],U.prototype,`pageSizeOptions`,void 0),H([S({type:Boolean,attribute:`show-total`})],U.prototype,`showTotal`,void 0),H([S({attribute:!1})],U.prototype,`totalRender`,void 0),H([S({attribute:!1})],U.prototype,`itemRender`,void 0),H([S({reflect:!0})],U.prototype,`size`,void 0),H([S({reflect:!0})],U.prototype,`shape`,void 0),H([S({reflect:!0})],U.prototype,`variant`,void 0),H([S({type:Boolean,reflect:!0})],U.prototype,`simple`,void 0),H([S({type:Number,attribute:`sibling-count`})],U.prototype,`siblingCount`,void 0),H([S({type:Number,attribute:`boundary-count`})],U.prototype,`boundaryCount`,void 0),H([S({type:Boolean,attribute:`hide-edges`})],U.prototype,`hideEdges`,void 0),H([S({type:Boolean,attribute:`hide-numbers`})],U.prototype,`hideNumbers`,void 0),H([S({type:Boolean,reflect:!0})],U.prototype,`responsive`,void 0),H([S({attribute:!1})],U.prototype,`labels`,void 0),H([v()],U.prototype,`jumpValue`,void 0),H([v()],U.prototype,`simpleDraft`,void 0),H([v()],U.prototype,`ripples`,void 0)})))()}function Oi(e,t,n,r){let i=t==null?{base:1}:typeof t==`number`?{base:t}:t,a={},o=1;for(let t of ki){let n=i[t]??o;(!Number.isInteger(n)||n<1||n>12)&&(V&&O(e,`columns must be integers from 1 to 12 (got ${String(n)} for "${t}"); using ${o}.`),n=o),a[`--grid-columns-${t}`]=String(n),o=n}return a[`--grid-row-gap`]=$e(n),a[`--grid-column-gap`]=$e(r),a}var ki,Ai,ji,Mi;function Ni(){return(Ni=e((()=>{I(),R(),j(),ai(),jn(),g(),_(),ft(),ki=[`base`,`sm`,`md`,`lg`],Ai={fromAttribute(e){if(e===null)return;let t=e.trim();if(t.startsWith(`{`))try{return JSON.parse(t)}catch{return NaN}let n=t.split(/[\s,]+/).filter(Boolean).map(Number);if(n.length<=1)return n[0]??NaN;let[r,i,a,o]=n;return{base:r,sm:i,md:a,lg:o}},toAttribute(e){return e===void 0?null:typeof e==`number`?String(e):JSON.stringify(e)}},ji=class e extends z{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-responsive-grid`}static{this.styles=[D,E`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,N(gn)]}render(){let t=Oi(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return b`<div class="root" part="root" style=${T(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},H([S({converter:Ai})],ji.prototype,`columns`,void 0),H([S({converter:si})],ji.prototype,`gap`,void 0),H([S({attribute:`row-gap`,converter:si})],ji.prototype,`rowGap`,void 0),H([S({attribute:`column-gap`,converter:si})],ji.prototype,`columnGap`,void 0),Mi=class extends z{constructor(...e){super(...e),this.fullWidth=!1}static{this.tagName=`minerva-grid-item`}static{this.styles=[D,E`
:host{
display: block;
min-width: 0;
}
:host([full-width]){
grid-column: 1 / -1;
}
`]}render(){return b`<slot></slot>`}},H([S({type:Boolean,reflect:!0,attribute:`full-width`})],Mi.prototype,`fullWidth`,void 0)})))()}var Pi;function Fi(){return(Fi=e((()=>{A(),I(),P(),R(),j(),Cn(),Xt(),g(),_(),x(),ht(),Pi=class e extends k{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.locale=new F(this),this.aria=new M(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-textarea`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,E`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,N(Cr)]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}select(){this.textarea?.select()}getFormValue(){return this.value}getValidity(){let e=this.textarea;return e?{flags:Sr(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),V&&(t.has(`minLength`)||t.has(`maxLength`))&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&O(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let e=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return b`<textarea
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
    ></textarea>`}},H([S({attribute:!1})],Pi.prototype,`value`,void 0),H([S({attribute:`value`})],Pi.prototype,`defaultValue`,void 0),H([S({reflect:!0})],Pi.prototype,`variant`,void 0),H([S({reflect:!0})],Pi.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],Pi.prototype,`invalid`,void 0),H([S()],Pi.prototype,`placeholder`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],Pi.prototype,`readOnly`,void 0),H([S({type:Number})],Pi.prototype,`rows`,void 0),H([S({type:Number,attribute:`minlength`})],Pi.prototype,`minLength`,void 0),H([S({type:Number,attribute:`maxlength`})],Pi.prototype,`maxLength`,void 0),H([S()],Pi.prototype,`autocomplete`,void 0),H([S()],Pi.prototype,`wrap`,void 0),H([C(`textarea`)],Pi.prototype,`textarea`,void 0)})))()}var Ii,Li;function Ri(){return(Ri=e((()=>{A(),I(),B(),P(),R(),wn(),j(),Mn(),g(),_(),x(),ft(),Ii=(e,t)=>`${Math.round(e/t*100)}%`,Li=class e extends z{constructor(...e){super(...e),this.variant=`spinner`,this.size=`medium`,this.color=`primary`,this.max=100,this.showValue=!1,this.label=``,this.decorative=!1,this.full=!1,this.locale=new F(this),this.aria=new M(this),this.slots=new nn(this)}static{this.tagName=`minerva-progress`}static{this.styles=[D,E`
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
`,N(Yr)]}hookStates(){return{variant:this.variant===`dottedBar`?`dotted-bar`:this.variant,size:this.size,color:this.color}}updated(){V&&this.full&&this.width&&O(e.tagName,`width is ignored when full is set.`)}determinate(){let{value:e,variant:t}=this;if(typeof e!=`number`||t!==`bar`&&t!==`circle`)return null;let n=Number.isFinite(this.max)&&this.max>0?this.max:100;return{value:Math.min(Math.max(Number.isNaN(e)?0:e,0),n),max:n}}renderIndicator(e){let t=this.size,n=e?e.value/e.max*100:0;switch(this.variant){case`bar`:return b`<div part="indicator" class="barContainer ${t}">
<div
class=${e?`bar determinate`:`bar`}
style=${T({width:e?`${n}%`:void 0})}
></div>
</div>`;case`dottedBar`:return b`<div part="indicator" class="dottedBarContainer ${t}">
<div class="dottedBar"></div>
</div>`;case`wave`:return b`<div part="indicator" class="waveContainer ${t}">
<span class="wave" aria-hidden="true">${Jr}</span>
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
>${Gn}</span
>`;case`spinner`:return b`<span
part="indicator"
class="spinner ${t}"
aria-hidden="true"
>${Bn}</span
>`;default:return y}}render(){let e=this.variant===`bar`||this.variant===`dottedBar`,t=!!this.label||this.slots.test(`label`),n=this.aria.label,r=this.determinate(),i=r?(this.format??Ii)(r.value,r.max):``;return b`<div
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
</div>`}},H([S({reflect:!0})],Li.prototype,`variant`,void 0),H([S({reflect:!0})],Li.prototype,`size`,void 0),H([S({reflect:!0})],Li.prototype,`color`,void 0),H([S({type:Number})],Li.prototype,`value`,void 0),H([S({type:Number})],Li.prototype,`max`,void 0),H([S({type:Boolean,attribute:`show-value`})],Li.prototype,`showValue`,void 0),H([S({attribute:!1})],Li.prototype,`format`,void 0),H([S()],Li.prototype,`label`,void 0),H([S({type:Boolean,reflect:!0})],Li.prototype,`decorative`,void 0),H([S()],Li.prototype,`width`,void 0),H([S({type:Boolean,reflect:!0})],Li.prototype,`full`,void 0)})))()}var zi;function Bi(){return(Bi=e((()=>{A(),B(),Rn(),P(),R(),wn(),j(),mi(),vi(),xi(),Ci(),hr(),qt(),g(),_(),x(),zi=class extends z{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.locale=new F(this),this.aria=new M(this),this.slots=new nn(this),this.presence=new ir(this,()=>this.panel),this.modal=new Si(this),this.focusScope=new _i(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new pi(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.triggerElement()],onFocusOutside:e=>e.preventDefault(),onEscapeKeyDown:()=>this.lastReason(`escape`),onPointerDownOutside:()=>this.lastReason(`outside`),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{let t=this.triggerElement();!e.defaultPrevented&&t&&e.composedPath().includes(t)&&this.requestOpenChange(!this.open,`trigger`)}}static{this.tagName=`minerva-modal`}static{this.styles=[D,bi,E`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,N(Rr)]}lastReason(e){this.reason=e}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?($t(this.overlay),$t(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),$r(this.panel),$r(this.overlay)}afterClose(){$r(this.panel),$r(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description;return b`<slot name="trigger"></slot> ${e?b`<div
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
${Dr}
</button>`}
</div>`:y}`}},H([S({type:Boolean,reflect:!0})],zi.prototype,`open`,void 0),H([S()],zi.prototype,`label`,void 0),H([S()],zi.prototype,`description`,void 0),H([S({reflect:!0})],zi.prototype,`size`,void 0),H([S({type:Boolean,attribute:`hide-close-button`})],zi.prototype,`hideCloseButton`,void 0),H([S({attribute:`close-label`})],zi.prototype,`closeLabel`,void 0),H([S({attribute:`dialog-role`})],zi.prototype,`dialogRole`,void 0),H([C(`.content`)],zi.prototype,`panel`,void 0),H([C(`.overlay`)],zi.prototype,`overlay`,void 0)})))()}var Vi,Hi,Ui,W;function Wi(){return(Wi=e((()=>{A(),I(),B(),P(),vn(),R(),j(),dr(),g(),_(),x(),u(),m(),Vi=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],Hi=/^\d{4}-\d{2}-\d{2}$/,Ui={fromAttribute(e){let t=e?.trim().match(/^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/);return t?rt(Number(t[1]),Number(t[2])-1,1):void 0},toAttribute(e){return e instanceof Date&&!Number.isNaN(e.getTime())?h(e).slice(0,7):null}},W=class e extends z{constructor(...e){super(...e),this.events=[],this.clickableEvents=!1,this.size=`medium`,this.disabled=!1,this.hideEvents=!1,this.focusedKey=``,this.pendingFocus=null,this.i18n=new F(this),this.aria=new M(this)}static{this.tagName=`minerva-month-calendar`}static{this.styles=[D,E`
:host{
display: block;


inline-size: 100%;
}
.navButton svg{
flex-shrink: 0;
}
`,N(mr)]}get displayed(){let e=this.month;return e instanceof Date&&!Number.isNaN(e.getTime())?De(e):De(new Date)}focus(e){this.renderRoot.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus(e)}goToMonth(e){let t=De(e);h(t)!==h(this.displayed)&&(this.month=t,this.emit(`minerva-month-change`,{month:t}))}select(e){if(this.disabled)return;let t=h(e);t!==this.value&&(this.value=t,this.emit(`minerva-change`,{value:t})),tt(e,this.displayed)||this.goToMonth(e)}handleKeyDown(e,t){if(this.disabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=f(e.key,this),r=(t.getDay()+6)%7,i;switch(n){case`ArrowLeft`:i=p(t,-1);break;case`ArrowRight`:i=p(t,1);break;case`ArrowUp`:i=p(t,-7);break;case`ArrowDown`:i=p(t,7);break;case`Home`:i=p(t,-r);break;case`End`:i=p(t,6-r);break;case`PageUp`:case`PageDown`:{let n=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),r=De(t,n),a=p(De(r,1),-1).getDate();i=rt(r.getFullYear(),r.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault(),this.pendingFocus=h(i),this.focusedKey=h(i),tt(i,this.displayed)||this.goToMonth(i)}willUpdate(t){V&&t.has(`value`)&&this.value&&!Hi.test(this.value)&&O(e.tagName,`value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`)}updated(){if(this.disabled||!this.pendingFocus)return;let e=this.renderRoot.querySelector(`[data-date="${this.pendingFocus}"]`);e&&(this.pendingFocus=null,e.focus())}hookStates(){return{disabled:this.disabled,size:this.size}}render(){let e=this.i18n.t,t=this.displayed,n=p(t,-((t.getDay()+6)%7)),r=Array.from({length:42},(e,t)=>p(n,t)),i=r.map(h),a=new Date,o=h(a),s=this.value||void 0,c=[this.focusedKey,s,tt(a,t)?o:``,h(t)].find(e=>e&&i.includes(e)),l=this.events??[],u=new Map;for(let e of l)u.set(e.date,(u.get(e.date)??0)+1);let d=l.filter(e=>e.date===s),f;try{f=new Intl.DateTimeFormat(this.locale??this.i18n.language,{year:`numeric`,month:`long`}).format(t)}catch{f=h(t).slice(0,7)}let ee=this.disabled,{rangeStart:te,rangeEnd:ne}=this,re=te&&ne&&Hi.test(te)&&Hi.test(ne)?[te,ne].sort():void 0,ie=[`small`,`medium`,`large`].includes(this.size)?this.size:`medium`;return b`<section
part="root"
class="monthCalendar ${ie}"
aria-label=${this.aria.label??e(`monthCalendar.label`)}
>
<div class="toolbar">
<h2 id="heading" part="heading" class="heading" aria-live="polite">
${f}
</h2>
<div class="navigation">
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.previousMonthLabel??e(`monthCalendar.previousMonth`)}
?disabled=${ee}
@click=${()=>this.goToMonth(De(t,-1))}
>
${Qn}
</button>
<button
type="button"
part="nav-button"
class="navButton"
?disabled=${ee}
@click=${()=>this.goToMonth(new Date)}
>
${Ir} ${this.todayLabel??e(`monthCalendar.today`)}
</button>
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.nextMonthLabel??e(`monthCalendar.nextMonth`)}
?disabled=${ee}
@click=${()=>this.goToMonth(De(t,1))}
>
${gr}
</button>
</div>
</div>
<div
part="grid"
role="grid"
aria-labelledby="heading"
aria-disabled=${ee?`true`:y}
class="grid"
>
<div role="row" class="week">
${Vi.map((t,n)=>b`<div role="columnheader" class="weekday">
${this.weekdayLabels?.[n]??e(`monthCalendar.weekdays.${t}`)}
</div>`)}
</div>
${Array.from({length:6},(n,i)=>b`<div role="row" class="week">
${r.slice(i*7,i*7+7).map(n=>{let r=h(n),i=u.get(r)??0,a=this.getDayLabel?this.getDayLabel(r,i):i?e(`monthCalendar.dayWithEvents`,{date:r,count:i}):r,l=!!re&&r>=re[0]&&r<=re[1],d={selected:s===r,today:r===o,outside:!tt(n,t),disabled:ee};return b`<div
role="gridcell"
part=${xn(`day`,d)}
class=${w({day:!0,inRange:l,rangeStart:l&&r===re?.[0],rangeEnd:l&&r===re?.[1]})}
data-date=${r}
?data-outside=${d.outside}
aria-label=${a}
aria-selected=${String(d.selected)}
aria-current=${d.today?`date`:y}
aria-disabled=${ee?`true`:y}
tabindex=${!ee&&r===c?`0`:`-1`}
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
?disabled=${ee}
@click=${()=>this.emit(`minerva-event-click`,{event:e})}
>
${e.title}
</button>`:b`<span part="event">${e.title}</span>`}
</li>`)}
</ul>`:b`<p class="empty" part="empty">
${this.emptyEventsText??e(`monthCalendar.noEvents`)}
</p>`}
</section>`:y}
</section>`}},H([S({converter:Ui,reflect:!0})],W.prototype,`month`,void 0),H([S({reflect:!0})],W.prototype,`value`,void 0),H([S({attribute:!1})],W.prototype,`events`,void 0),H([S({type:Boolean,attribute:`clickable-events`})],W.prototype,`clickableEvents`,void 0),H([S({attribute:`range-start`,reflect:!0})],W.prototype,`rangeStart`,void 0),H([S({attribute:`range-end`,reflect:!0})],W.prototype,`rangeEnd`,void 0),H([S({reflect:!0})],W.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],W.prototype,`disabled`,void 0),H([S({type:Boolean,attribute:`hide-events`})],W.prototype,`hideEvents`,void 0),H([S({attribute:`previous-month-label`})],W.prototype,`previousMonthLabel`,void 0),H([S({attribute:`next-month-label`})],W.prototype,`nextMonthLabel`,void 0),H([S({attribute:`today-label`})],W.prototype,`todayLabel`,void 0),H([S({attribute:`empty-events-text`})],W.prototype,`emptyEventsText`,void 0),H([S()],W.prototype,`locale`,void 0),H([S({attribute:!1})],W.prototype,`weekdayLabels`,void 0),H([S({attribute:!1})],W.prototype,`getDayLabel`,void 0),H([S({attribute:!1})],W.prototype,`getEventsLabel`,void 0),H([v()],W.prototype,`focusedKey`,void 0)})))()}var Gi;function Ki(){return(Ki=e((()=>{m(),Gi=class{constructor(e,t={}){this.typeahead=Be(t),e.addController(this)}search(e,t,n){return this.typeahead.search(e,t,n)}reset(){this.typeahead.reset()}hostDisconnected(){this.typeahead.reset()}}})))()}function qi(e,t,n){for(let r of e){if(r.id===t)return!0;if(r.children&&qi(r.children,t,n))return n.add(r.id),!0}return!1}var Ji,Yi,Xi;function Zi(){return(Zi=e((()=>{A(),I(),B(),Rn(),P(),vn(),R(),j(),nr(),Or(),Ki(),g(),_(),x(),gt(),Ji=`.item`,Yi=`.children`,Xi=class e extends z{constructor(...e){super(...e),this.sections=[],this.collapsed=!1,this.wrapLabels=!1,this.expandedIds=[],this.explicitlyCollapsed=new Set,this.aria=new M(this),this.locale=new F(this),this.typeahead=new Gi(this),this.handleNavKeyDown=e=>{if(e.defaultPrevented)return;let t=e.composedPath()[0]?.closest?.(Ji);if(!t||!this.shadowRoot?.contains(t))return;let n=this.focusableItems(),r=n.indexOf(t),i;switch(this.logicalKey(e.key)){case`ArrowDown`:i=n[r+1];break;case`ArrowUp`:i=r>0?n[r-1]:void 0;break;case`Home`:i=n[0];break;case`End`:i=n[n.length-1];break;case`ArrowLeft`:if(t.getAttribute(`aria-expanded`)===`true`)return;i=t.closest(Yi)?.parentElement?.querySelector(`:scope > ${Ji}`);break;default:{if(e.altKey||e.ctrlKey||e.metaKey)return;let t=this.typeahead.search(e.key,n.map(e=>({text:e.querySelector(`.label`)?.textContent??``})),r);if(t===-1)return;i=n[t]}}i&&(e.preventDefault(),i.focus())}}static{this.tagName=`minerva-nav-tree`}static{this.styles=[D,E`
:host{
display: block;
}
`,N(Pr)]}activeAncestors(){let e=new Set;for(let t of this.sections)qi(t.items,this.activeId,e);return e}isExpanded(e,t){return this.expandedIds.includes(e)||!this.explicitlyCollapsed.has(e)&&t.has(e)}willUpdate(t){if(V&&t.has(`sections`)){let t=new Set,n=r=>{for(let i of r)t.has(i.id)&&O(e.tagName,`duplicate item id "${i.id}": ids must be unique.`),t.add(i.id),i.children&&n(i.children)};for(let e of this.sections??[])n(e.items??[])}}setItemExpanded(e,t){let n=new Set(this.expandedIds);t?n.add(e.id):n.delete(e.id);let r=Array.from(n),i={expandedIds:r,item:e,expanded:t};if(!this.emit(`minerva-expanded-change`,i,{cancelable:!0}))return;let a=new Set(this.explicitlyCollapsed);t?a.delete(e.id):a.add(e.id),this.explicitlyCollapsed=a,this.expandedIds=r}select(e,t){let n={value:e.id,item:e};this.emit(`minerva-select`,n,{cancelable:!0})||t?.preventDefault()}toggleItem(e){this.setItemExpanded(e,!this.isExpanded(e.id,this.activeAncestors())),this.select(e)}focusableItems(){return Array.from(this.shadowRoot?.querySelectorAll(Ji)??[]).filter(e=>!e.disabled&&e.getAttribute(`aria-disabled`)!==`true`)}logicalKey(e){return e!==`ArrowLeft`&&e!==`ArrowRight`||ie(this)!==`rtl`?e:e===`ArrowLeft`?`ArrowRight`:`ArrowLeft`}renderSectionTitle(e){return b`<h2 part="group-label" class="sectionTitle">${e}</h2>`}renderContent(e,t){return b`<span part="icon" class="icon" aria-hidden="true"
>${e.icon??y}</span
><span class="copy"
><span part="label" class="label">${e.label}</span>${e.description?b`<small part="description" class="description"
>${e.description}</small
>`:y}</span
>${!this.collapsed&&(e.endContent||t)?b`<span class="trailing"
>${e.endContent?b`<span class="end">${e.endContent}</span>`:y}${t?b`<span class="chevron" aria-hidden="true"
>${zr}</span
>`:y}</span
>`:y}`}renderItem(t,n,r){let i=!!t.children?.length,a=t.id===this.activeId,o=r.has(t.id),s=i&&this.isExpanded(t.id,r),c=!!t.disabled,l={item:!0,nested:n>0,active:a,disabled:c},u=Object.entries(l).filter(([,e])=>e).map(([e])=>e).join(` `),d=t.description?`${t.label} / ${t.description}`:t.label,f=this.renderContent(t,i);if(i)return b`<div class="branch">
<button
part=${xn(`item`,{current:a,expanded:s,disabled:c})}
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
@keydown=${e=>{if(this.collapsed)return;let n=this.logicalKey(e.key);n===`ArrowRight`?(e.preventDefault(),s?e.currentTarget.parentElement?.querySelector(`${Yi} ${Ji}`)?.focus():this.setItemExpanded(t,!0)):n===`ArrowLeft`&&s&&(e.preventDefault(),this.setItemExpanded(t,!1))}}
>
${f}
</button>
${s&&!this.collapsed?b`<div class="children">
${pt(t.children??[],e=>e.id,e=>this.renderItem(e,n+1,r))}
</div>`:y}
</div>`;if(this.renderLink)return this.renderLink(t,f,{active:a,ancestorActive:o,expanded:!1,depth:n,collapsed:this.collapsed,hasChildren:i,disabled:c,className:u});let p=xn(`item`,{current:a,disabled:c});return c?b`<span
part=${p}
class=${w(l)}
title=${d}
data-id=${t.id}
?data-current=${a}
role="link"
aria-disabled="true"
>${f}</span
>`:t.href===void 0?b`<button
part=${p}
class=${w(l)}
type="button"
title=${d}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:y}
@click=${()=>this.select(t)}
>
${f}
</button>`:b`<a
part=${p}
class=${w(l)}
href=${or(e.tagName,t.href)??y}
title=${d}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:y}
@click=${e=>this.select(t,e)}
>${f}</a
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
</nav>`}},H([S({attribute:!1})],Xi.prototype,`sections`,void 0),H([S({attribute:`active-id`,reflect:!0})],Xi.prototype,`activeId`,void 0),H([S({type:Boolean,reflect:!0})],Xi.prototype,`collapsed`,void 0),H([S({type:Boolean,reflect:!0,attribute:`wrap-labels`})],Xi.prototype,`wrapLabels`,void 0),H([S({attribute:!1})],Xi.prototype,`expandedIds`,void 0),H([S({attribute:!1})],Xi.prototype,`renderLink`,void 0),H([v()],Xi.prototype,`explicitlyCollapsed`,void 0)})))()}var Qi,G;function $i(){return($i=e((()=>{A(),I(),B(),P(),R(),j(),Cn(),cr(),g(),_(),x(),m(),ht(),Qi={fromAttribute:e=>e===null||e.trim()===``||Number.isNaN(Number(e))?null:Number(e),toAttribute:e=>e===null?null:String(e)},G=class e extends k{constructor(...e){super(...e),this.value=null,this.defaultValue=null,this.step=1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.showStepper=!1,this.noEmpty=!1,this.placeholder=``,this.draft=``,this.locale=new F(this),this.aria=new M(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-number-input`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,E`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,N(rr)]}get resolvedPrecision(){return this.precision??je(this.step)}get locked(){return this.isDisabled||this.readOnly}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}stepUp(){this.value=this.stepped(this.step)}stepDown(){this.value=this.stepped(-this.step)}getFormValue(){return ze(this.value,this.resolvedPrecision)}getValidity(){let{t:e}=this.locale,t=this.input,n=this.draft.trim();if(n&&n!==`-`&&n!==`.`){let r=lt(n);return r===null?{flags:{badInput:!0},message:this.notANumberMessage??e(`numberInput.notANumber`),anchor:t}:this.min!==void 0&&r<this.min?{flags:{rangeUnderflow:!0},message:this.belowMinMessage??e(`validation.rangeUnderflow`,{min:this.min}),anchor:t}:this.max!==void 0&&r>this.max?{flags:{rangeOverflow:!0},message:this.aboveMaxMessage??e(`validation.rangeOverflow`,{max:this.max}),anchor:t}:{flags:{},message:``}}return this.required&&this.value===null?{flags:{valueMissing:!0},message:e(`validation.valueMissing`),anchor:t}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.draft=ze(this.value,this.resolvedPrecision)}restoreFormState(e){typeof e==`string`&&(this.value=lt(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)||t.has(`precision`)||t.has(`step`)){let e=lt(this.draft);(e===null||e!==this.value)&&(this.draft=ze(this.value,this.resolvedPrecision))}V&&(t.has(`min`)||t.has(`max`))&&this.min!==void 0&&this.max!==void 0&&this.min>this.max&&O(e.tagName,`min (${this.min}) is greater than max (${this.max}): every value is clamped.`)}stepped(e){let t=lt(this.draft)??this.value??0;return Number(se(t+e,this.min,this.max).toFixed(this.resolvedPrecision))}commitValue(e){let t=this.resolvedPrecision,n=e===null?null:Number(e.toFixed(t));this.draft=ze(n,t),n!==this.value&&(this.dirty=!0,this.value=n,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:n}))}commit(e){if(this.locked)return;let t=e.trim();if(t===``||t===`-`){this.noEmpty?this.commitValue(se(this.min??0,this.min,this.max)):this.commitValue(null);return}let n=lt(t);if(n===null){this.draft=ze(this.value,this.resolvedPrecision);return}this.commitValue(se(n,this.min,this.max))}adjust(e){this.locked||this.commitValue(this.stepped(e))}handleInput(){this.draft=String(this.input.value),this.emit(`minerva-input`,{value:lt(this.draft)})}handleKeyDown(e){if(this.locked||e.defaultPrevented)return;let{key:t}=e;t===`ArrowUp`||t===`ArrowDown`?(e.preventDefault(),this.adjust(t===`ArrowUp`?this.step:-this.step)):t===`PageUp`||t===`PageDown`?(e.preventDefault(),this.adjust((t===`PageUp`?10:-10)*this.step)):t===`Home`&&this.min!==void 0?(e.preventDefault(),this.commitValue(this.min)):t===`End`&&this.max!==void 0?(e.preventDefault(),this.commitValue(this.max)):t===`Enter`&&this.input.blur()}handleBlur(){this.commit(String(this.input.value))}draftError(){let{t:e}=this.locale,t=this.draft.trim();if(!t||t===`-`||t===`.`)return;let n=lt(t);if(n===null)return this.notANumberMessage??e(`numberInput.notANumber`);if(this.min!==void 0&&n<this.min)return this.belowMinMessage??e(`numberInput.belowMin`,{min:this.min});if(this.max!==void 0&&n>this.max)return this.aboveMaxMessage??e(`numberInput.aboveMax`,{max:this.max})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.draftError()!==void 0||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.locked,r=this.draftError(),i=r!==void 0,a=this.invalid||i||this.aria.attr(`aria-invalid`)===`true`,o=this.value??0;return b`<div
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
${Nr}
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
${zr}
</button>
</div>`:y}
</div>`}},H([S({attribute:!1})],G.prototype,`value`,void 0),H([S({attribute:`value`,converter:Qi})],G.prototype,`defaultValue`,void 0),H([S({type:Number})],G.prototype,`min`,void 0),H([S({type:Number})],G.prototype,`max`,void 0),H([S({type:Number})],G.prototype,`step`,void 0),H([S({type:Number})],G.prototype,`precision`,void 0),H([S({reflect:!0})],G.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],G.prototype,`invalid`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],G.prototype,`readOnly`,void 0),H([S({type:Boolean,attribute:`show-stepper`})],G.prototype,`showStepper`,void 0),H([S({type:Boolean,attribute:`no-empty`})],G.prototype,`noEmpty`,void 0),H([S()],G.prototype,`placeholder`,void 0),H([S({attribute:`increment-label`})],G.prototype,`incrementLabel`,void 0),H([S({attribute:`decrement-label`})],G.prototype,`decrementLabel`,void 0),H([S({attribute:`not-a-number-message`})],G.prototype,`notANumberMessage`,void 0),H([S({attribute:`below-min-message`})],G.prototype,`belowMinMessage`,void 0),H([S({attribute:`above-max-message`})],G.prototype,`aboveMaxMessage`,void 0),H([v()],G.prototype,`draft`,void 0),H([C(`input`)],G.prototype,`input`,void 0)})))()}var ea,ta,na,ra,ia;function aa(){return(aa=e((()=>{A(),I(),R(),wn(),j(),ai(),Gr(),g(),_(),x(),ft(),ea=class extends z{static{this.tagName=`minerva-page`}static{this.styles=[D,N(Tr),E`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.maxWidth===void 0||this.maxWidth===``?void 0:Ee(this.maxWidth);return b`<div class="page" part="root" style=${T({maxWidth:e})}>
<slot></slot>
</div>`}},H([S({attribute:`max-width`,converter:si})],ea.prototype,`maxWidth`,void 0),ta=class extends z{constructor(...e){super(...e),this.heading=``,this.description=``,this.slots=new nn(this)}static{this.tagName=`minerva-page-header`}static{this.styles=[D,N(Tr),E`
:host{
display: block;
min-width: 0;
}
`]}updated(){V&&!this.heading&&!this.slots.test(`heading`)&&O(this.constructor.tagName,`set the heading attribute (or fill the heading slot): the heading names the region.`)}renderHeading(){let e=!!this.description||this.slots.test(`description`);return b`<div class="heading">
<h1 part="title"><slot name="heading">${this.heading}</slot></h1>
${e?b`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:y}
</div>`}renderActions(){return this.slots.test(`actions`)?b`<div class="actions" part="actions">
<slot name="actions"></slot>
</div>`:y}render(){return b`<header class="header" part="root">
${this.renderHeading()} ${this.renderActions()}
</header>`}},H([S()],ta.prototype,`heading`,void 0),H([S()],ta.prototype,`description`,void 0),na=class extends ta{static{this.tagName=`minerva-page-section`}static{this.styles=[D,N(Tr),E`
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
</section>`}},ra=class extends z{constructor(...e){super(...e),this.nowrap=!1,this.density=`default`,this.aria=new M(this)}static{this.tagName=`minerva-toolbar`}static{this.styles=[D,N(Tr),E`
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
</div>`}},H([S({type:Boolean,reflect:!0})],ra.prototype,`nowrap`,void 0),H([S({reflect:!0})],ra.prototype,`density`,void 0),ia=class extends z{constructor(...e){super(...e),this.label=``,this.value=``,this.slots=new nn(this)}static{this.tagName=`minerva-stat-card`}static{this.styles=[D,N(Tr),E`
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
</div>`}},H([S()],ia.prototype,`label`,void 0),H([S()],ia.prototype,`value`,void 0),H([S()],ia.prototype,`description`,void 0)})))()}var oa,sa,ca;function la(){return(la=e((()=>{A(),I(),B(),Rn(),P(),R(),wn(),j(),yr(),tr(),g(),_(),x(),oa=(e,t)=>({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:e,[t]:!0}),sa=class e extends z{constructor(...e){super(...e),this.scrollState={overflow:!1,left:!1,right:!1,rtl:!1},this.aria=new M(this),this.locale=new F(this),this.slots=new nn(this),this.focused=null,this.previousItems=null,this.movedWith=null,this.mutations=null,this.resize=null,this.handleFocusIn=e=>{let t=e.target;this.focused=t instanceof ca&&this.items.includes(t)?t:null},this.handleSelect=e=>{let t=e.target;t instanceof ca&&this.items.includes(t)&&!e.defaultPrevented&&queueMicrotask(()=>{e.defaultPrevented||(this.activeValue=t.value)})},this.measure=()=>{let e=this.viewport;if(!e)return;let t=ie(this)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t},i=this.scrollState;(i.overflow!==r.overflow||i.left!==r.left||i.right!==r.right||i.rtl!==r.rtl)&&(this.scrollState=r)}}static{this.tagName=`minerva-page-tabs`}static{this.styles=[D,E`
:host{
display: block;
min-width: 0;
}
`,N(Yt),N(Vr)]}get items(){return Array.from(this.children).filter(e=>e instanceof ca)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`minerva-select`,this.handleSelect),typeof MutationObserver<`u`&&(this.mutations=new MutationObserver(()=>this.itemsChanged()),this.mutations.observe(this,{childList:!0,attributes:!0,attributeFilter:[`value`,`active`,`disabled`],subtree:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`minerva-select`,this.handleSelect),this.mutations?.disconnect(),this.mutations=null,this.resize?.disconnect(),this.resize=null}firstUpdated(){this.observeViewport()}reconnectedCallback(){super.reconnectedCallback(),this.observeViewport()}observeViewport(){this.resize||typeof ResizeObserver>`u`||(this.resize=new ResizeObserver(()=>this.revealActive()),this.resize.observe(this.viewport))}updated(t){V&&!this.aria.label&&O(e.tagName,`set aria-label (e.g. "Open pages") to name the navigation landmark.`),t.has(`activeValue`)&&this.itemsChanged();let n=this.movedWith;if(n){let e=n===`left`?this.leftButton:this.rightButton;if(e?.disabled){this.movedWith=null;let t=this.shadowRoot?.activeElement;(!t||t===e)&&(n===`left`?this.rightButton:this.leftButton)?.focus({preventScroll:!0})}}}itemsChanged(){let e=this.items;if(this.activeValue!==void 0)for(let t of e)t.active=t.value===this.activeValue;let t=JSON.stringify([this.activeValue,...e.map(e=>[e.value,e.active])]);t!==this.previousItems&&(this.previousItems=t,this.revealActive());let n=this.focused;if(n&&!n.isConnected){this.focused=null;let t=document.activeElement;(!t||t===document.body||!t.isConnected)&&e.find(e=>e.active)?.focus({preventScroll:!0})}}revealActive(){let e=this.viewport;if(!e)return;let t=this.items.find(e=>e.active),n=t?.surface;if(t&&!n&&t.updateComplete.then(()=>{t.surface&&this.revealActive()}),n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();r.width>t.width?e.scrollLeft+=r.left-t.left:r.left<t.left?e.scrollLeft-=t.left-r.left:r.right>t.right&&(e.scrollLeft+=r.right-t.right)}this.measure()}move(e){let t=this.viewport;t&&(this.movedWith=e<0?`left`:`right`,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),this.measure())}renderScrollButton(e){let t=e===`left`,n=t?this.scrollLeftLabel??this.locale.t(`pageTabs.scrollLeft`):this.scrollRightLabel??this.locale.t(`pageTabs.scrollRight`),r=t?!this.scrollState.left:!this.scrollState.right;return b`<button
type="button"
part="scroll-button"
class=${w({...oa(r,`scroll`),[`scroll-${e}`]:!0})}
aria-label=${n}
?disabled=${r}
tabindex=${r?-1:0}
@click=${()=>this.move(t?-1:1)}
>
${t?Qn:gr}
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
</nav>`}},H([S({reflect:!0,attribute:`active-value`})],sa.prototype,`activeValue`,void 0),H([S({attribute:`scroll-left-label`})],sa.prototype,`scrollLeftLabel`,void 0),H([S({attribute:`scroll-right-label`})],sa.prototype,`scrollRightLabel`,void 0),H([v()],sa.prototype,`scrollState`,void 0),H([C(`.viewport`)],sa.prototype,`viewport`,void 0),H([C(`.scroll-left`)],sa.prototype,`leftButton`,void 0),H([C(`.scroll-right`)],sa.prototype,`rightButton`,void 0),ca=class e extends z{constructor(...e){super(...e),this.value=``,this.label=``,this.active=!1,this.disabled=!1,this.closable=!1,this.locale=new F(this),this.slots=new nn(this)}static{this.tagName=`minerva-page-tab`}static{this.shadowRootOptions={...z.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,E`
:host{
display: contents;
}
.icon ::slotted(svg){
width: 16px;
height: 16px;
}
`,N(Yt),N(Vr)]}get surface(){return this.wrapper??null}focus(e){this.trigger?.focus(e)}handleSelect(){this.disabled||this.emit(`minerva-select`,{value:this.value},{cancelable:!0})}handleClose(){this.emit(`minerva-close`,{value:this.value})}hookStates(){return{current:this.active,disabled:this.disabled}}updated(){V&&!this.label&&O(e.tagName,`set label to name the page.`)}render(){return b`<div
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
class=${w(oa(!1,`close`))}
aria-label=${this.closeLabel??this.locale.t(`pageTabs.close`,{label:this.label,defaultValue:`Close {{label}}`})}
@click=${this.handleClose}
>
${Dr}
</button>`:y}</span
>`:y}
</div>`}},H([S({reflect:!0})],ca.prototype,`value`,void 0),H([S()],ca.prototype,`label`,void 0),H([S({type:Boolean,reflect:!0})],ca.prototype,`active`,void 0),H([S({type:Boolean,reflect:!0})],ca.prototype,`disabled`,void 0),H([S({type:Boolean,reflect:!0})],ca.prototype,`closable`,void 0),H([S({attribute:`close-label`})],ca.prototype,`closeLabel`,void 0),H([C(`.trigger`)],ca.prototype,`trigger`,void 0),H([C(`.pageTab`)],ca.prototype,`wrapper`,void 0)})))()}function ua(e,t,n,r){let i=Ke(t).filter(t=>t===e||!r||!oe(r,t)),a=i.indexOf(e);return a===-1?null:(n?i[a-1]:i[a+1])??null}var da,fa,pa;function ma(){return(ma=e((()=>{A(),I(),Rn(),R(),j(),mi(),gi(),vi(),xi(),Ci(),qt(),_r(),g(),_(),u(),da=10,fa=5,pa=class e extends z{constructor(...e){super(...e),this.open=!1,this.modal=!1,this.side=`bottom`,this.align=`center`,this.sideOffset=6,this.alignOffset=0,this.collisionPadding=8,this.matchAnchorWidth=!1,this.arrow=!1,this.label=``,this.anchorElement=null,this.anchor=``,this.aria=new M(this),this.presence=new ir(this,()=>this.panel),this.modalController=new Si(this),this.position=new hi(this,()=>({placement:ut(this.side,this.align),offset:{mainAxis:this.sideOffset+(this.arrow?fa:0),crossAxis:this.alignOffset},matchAnchorWidth:this.matchAnchorWidth||!1,padding:this.collisionPadding,arrowElement:this.arrow?this.arrowEl??null:null,arrowSize:da,onPosition:e=>{let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`)}})),this.layer=new pi(this,()=>({disableOutsidePointerEvents:this.modal,branches:()=>[this.triggerElement()],onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onFocusOutside:()=>(this.reason=`focus-outside`,!this.modal),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.focusScope=new _i(this,()=>({trapped:this.modal,loop:this.modal,restoreFocus:this.triggerElement()??!0})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-popover-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)},this.handleKeyDown=e=>{let t=this.panel,n=this.triggerElement();if(this.modal||!t||!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||e.defaultPrevented)return;let r=e.shiftKey,i=Ie(document);if(!i||!oe(t,i))return;let a=Ke(t);if(!(a.length===0||(r?i===t||i===a[0]:i===a[a.length-1])))return;e.preventDefault();let o=ua(n,this.tabContainer(),r,this.positioner)??n;this.requestOpenChange(!1,`tab`),this.open||o.focus()}}static{this.tagName=`minerva-popover`}static{this.styles=[D,bi,E`
:host{
display: contents;
}
`,N(Br)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorTarget(){if(this.anchorElement)return this.anchorElement;if(this.anchor){let e=this.getRootNode().getElementById?.(this.anchor);if(e)return e}return this.triggerElement()??this}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}tabContainer(){return Ve().find(e=>e.element===this.positioner)?.parent??document.body}syncTrigger(){let e=this.triggerElement();e&&(e.setAttribute(`aria-haspopup`,`dialog`),e.setAttribute(`aria-expanded`,String(this.open)),e.setAttribute(`data-state`,this.open?`open`:`closed`))}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.deactivate(),$r(this.positioner)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}firstUpdated(){V&&!this.triggerElement()&&!this.anchor&&!this.anchorElement&&O(e.tagName,`no slot="trigger" element nor anchor: the panel is anchored to the element itself and nothing opens it.`)}deactivate(){this.focusScope.deactivate(),this.layer.deactivate(),this.modalController.deactivate()}updated(e){this.syncTrigger();let t=this.open||this.presence.present,n=this.positioner;if(t&&n&&!this.position.running){$t(n);let e=this.anchorTarget();e&&this.position.start(e,n)}e.has(`open`)&&(this.open&&n?(this.modal&&this.modalController.activate(this),this.layer.activate(n),this.focusScope.activate(n),this.emit(`minerva-after-open`)):this.open||this.deactivate()),this.wasPresent&&!t&&(this.position.end(),$r(n),this.emit(`minerva-after-close`)),this.wasPresent=t}hookStates(){let e=this.position.placement,{side:t,align:n}=Se(e);return{state:this.open?`open`:`closed`,side:t,align:n,placement:e}}render(){if(!(this.open||this.presence.present))return b`<slot name="trigger"></slot>`;let{side:e,align:t}=Se(this.position.placement),n=this.open?`open`:`closed`,r=this.label||this.aria.label,i=this.isConnected?ie(this):`ltr`;return b`<slot name="trigger"></slot>
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
width=${da}
height=${fa}
viewBox="0 0 30 10"
preserveAspectRatio="none"
>
<polygon points="0,0 30,0 15,10"></polygon>
</svg>
</span>`:y}
</div>
</div>`}},H([S({type:Boolean,reflect:!0})],pa.prototype,`open`,void 0),H([S({type:Boolean,reflect:!0})],pa.prototype,`modal`,void 0),H([S({reflect:!0})],pa.prototype,`side`,void 0),H([S({reflect:!0})],pa.prototype,`align`,void 0),H([S({type:Number,attribute:`side-offset`})],pa.prototype,`sideOffset`,void 0),H([S({type:Number,attribute:`align-offset`})],pa.prototype,`alignOffset`,void 0),H([S({type:Number,attribute:`collision-padding`})],pa.prototype,`collisionPadding`,void 0),H([S({attribute:`match-anchor-width`})],pa.prototype,`matchAnchorWidth`,void 0),H([S({type:Boolean,reflect:!0})],pa.prototype,`arrow`,void 0),H([S()],pa.prototype,`label`,void 0),H([S({attribute:!1})],pa.prototype,`anchorElement`,void 0),H([S()],pa.prototype,`anchor`,void 0),H([C(`.positioner`)],pa.prototype,`positioner`,void 0),H([C(`.content`)],pa.prototype,`panel`,void 0),H([C(`[part=arrow]`)],pa.prototype,`arrowEl`,void 0)})))()}var ha;function ga(){return(ga=e((()=>{ha=`minerva-prose{min-width:0;max-width:100%;color:var(--text-color,#1f2937);font-family:var(--font-family-sans,system-ui, -apple-system, "Segoe UI", sans-serif);font-size:var(--prose-font-size,var(--font-size-lg,1rem));font-weight:var(--font-weight-regular,400);font-style:normal;line-height:var(--line-height-relaxed,1.7);letter-spacing:0;overflow-wrap:anywhere}minerva-prose :where(h1,h2,h3,h4,h5,h6){color:inherit;font-family:inherit;font-style:inherit;font-weight:var(--font-weight-semibold,600);letter-spacing:0;background:0 0;border:0;margin:1.5em 0 .5em;padding:0;line-height:1.35}minerva-prose :where(h1){font-size:var(--font-size-3xl,1.75rem)}minerva-prose :where(h2){font-size:var(--font-size-2xl,1.375rem)}minerva-prose :where(h3){font-size:var(--font-size-xl,1.125rem)}minerva-prose :where(h4){font-size:var(--font-size-lg,1rem)}minerva-prose :where(h5,h6){font-size:var(--font-size-md,.875rem)}minerva-prose :where(h6){color:var(--text-muted-color,#6b7280)}minerva-prose :where(p,ul,ol,li,blockquote){font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;line-height:inherit;letter-spacing:inherit}minerva-prose :where(p){background:0 0;border:0;padding:0}minerva-prose :where(p,ul,ol,blockquote,pre,table,figure){margin:1em 0}minerva-prose>:first-child{margin-top:0}minerva-prose>:last-child{margin-bottom:0}minerva-prose :where(ul,ol){padding:0;padding-inline-start:1.5em}minerva-prose :where(li){margin:.25em 0}minerva-prose :where(li>ul,li>ol,li>p){margin-block:.25em}minerva-prose :where(blockquote){border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-code-bg,var(--control-color,#f6f7f9));color:inherit;border:1px solid #0000;padding:.5em 1em}minerva-prose :where(a){color:var(--primary-color-text,#1e4fbd);text-underline-offset:.18em;text-decoration:underline;text-decoration-thickness:1px}minerva-prose :where(a:hover){text-decoration-thickness:2px}minerva-prose :where(a:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:3px}minerva-prose :where(code,kbd,samp){font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);font-size:.875em}minerva-prose :where(code){border-radius:calc(var(--prose-radius,var(--radius-sm,4px)) - 1px);background:var(--prose-code-bg,var(--control-color,#f6f7f9));padding:.12em .3em}minerva-prose :where(pre){max-width:100%;padding:var(--space-4,1rem);border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-pre-bg,var(--surface-elevated-color,#fff));color:var(--text-color,#1f2937);font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);line-height:var(--line-height-base,1.5);white-space:pre;overflow-wrap:normal;tab-size:2;overflow-x:auto}minerva-prose :where(pre code){color:inherit;white-space:pre;background:0 0;border:0;border-radius:0;padding:0}minerva-prose :where(pre:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:2px}minerva-prose :where(.hljs-comment,.hljs-quote){color:var(--text-muted-color,#6b7280)}minerva-prose :where(.hljs-keyword,.hljs-selector-tag,.hljs-name,.hljs-tag,.hljs-attr,.hljs-attribute,.hljs-doctag){color:var(--primary-color-text,#1e4fbd)}minerva-prose :where(.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-regexp,.hljs-type,.hljs-literal){color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-number,.hljs-title,.hljs-section,.hljs-built_in,.hljs-meta,.hljs-variable){color:var(--warning-color-text,#b45309)}minerva-prose :where(.hljs-subst,.hljs-operator,.hljs-punctuation,.hljs-params){color:var(--text-color,#1f2937)}minerva-prose :where(.hljs-addition){background:var(--success-color-subtle,#e7f6ec);color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-deletion){background:var(--danger-color-subtle,#fcebeb);color:var(--danger-color-text,#b91c1c)}minerva-prose :where(.hljs-strong){font-weight:var(--font-weight-bold,700)}minerva-prose :where(.hljs-emphasis){font-style:italic}minerva-prose :where(mark){background:var(--warning-color-subtle,#fdf3e1);color:inherit}minerva-prose :where(img,video){max-width:100%;height:auto}minerva-prose :where(figure){max-width:100%}minerva-prose :where(figcaption){margin-top:var(--space-2,.5rem);font-size:var(--font-size-md,.875rem);color:var(--text-muted-color,#6b7280)}minerva-prose :where(table){border-collapse:collapse;width:100%;color:inherit;overflow-wrap:normal;display:table}minerva-prose :where(tr){background:0 0;border:0}minerva-prose :where(th,td){border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));text-align:start;vertical-align:top;white-space:normal;padding:.5em .75em}minerva-prose :where(th){background:var(--prose-code-bg,var(--control-color,#f6f7f9));font-weight:var(--font-weight-semibold,600)}minerva-prose :where(th>p,td>p){margin:0}minerva-prose :where(hr){background:var(--prose-border-color,var(--border-color,#d9dde3));border:0;height:1px;margin:1.5em 0;padding:0}@media (forced-colors:active){minerva-prose :where(hr){forced-color-adjust:none;background:canvastext}}minerva-prose :where(sub,sup){font-size:.75em;line-height:0}@media print{minerva-prose :where(pre){overflow:visible}minerva-prose :where(pre,pre code){white-space:pre-wrap;overflow-wrap:anywhere}minerva-prose :where(pre,blockquote,figure,img,tr){break-inside:avoid}}`})))()}function _a(){if(xa!==void 0)return xa;xa=null;try{if(typeof CSSStyleSheet<`u`&&`replaceSync`in CSSStyleSheet.prototype){let e=new CSSStyleSheet;e.replaceSync(ha),xa=e}}catch{xa=null}return xa}function va(e){if(ba.has(e))return;ba.add(e);let t=_a();if(t&&`adoptedStyleSheets`in e)try{e.adoptedStyleSheets=[...e.adoptedStyleSheets,t];return}catch{}let n=e.nodeType===9?e:e.ownerDocument;if(!n)return;let r=e.nodeType===9?n.head??n.documentElement:e;if(r.querySelector?.(`#${ya}`))return;let i=n.createElement(`style`);i.id=ya,i.textContent=ha,r.appendChild(i)}var ya,ba,xa,Sa;function Ca(){return(Ca=e((()=>{R(),ga(),g(),ya=`minerva-prose-styles`,ba=new WeakSet,Sa=class extends z{static{this.tagName=`minerva-prose`}static{this.styles=[D,E`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback();let e=this.getRootNode();(e.nodeType===9||e.nodeType===11)&&va(e)}render(){return b`<slot></slot>`}}})))()}var wa;function Ta(){return(Ta=e((()=>{u(),wa=class{constructor(e,t){this.options=t,this.roving=null,this.container=null,e.addController(this)}attach(e){this.container===e&&this.roving||(this.detach(),this.container=e,this.roving=et(e,this.options()))}detach(){this.roving?.destroy(),this.roving=null,this.container=null}refresh(){this.roving?.refresh()}setActive(e,t){this.roving?.setActive(e,t)}getActive(){return this.roving?.getActive()??null}hostDisconnected(){this.detach()}}})))()}var Ea,Da,Oa;function ka(){return(ka=e((()=>{Kn(),A(),I(),B(),Rn(),P(),En(),R(),wn(),j(),Cn(),Ar(),Ta(),g(),_(),x(),Ea=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Home`,`End`]),Da=class extends z{constructor(...e){super(...e),this.hostInternals=sn(this),this.ownedAria=new Set,this.value=``,this.checked=!1,this.disabled=!1,this.label=``,this.size=`medium`,this.color=`primary`,this.error=!1,this.helperText=``,this.errorMessage=``,this.slots=new nn(this),this.ownsDescription=!1,this.handleClick=e=>{if(this.isDisabled){e.preventDefault(),e.stopImmediatePropagation();return}this.group||this.checked||(this.checked=!0,this.emit(`minerva-change`,{checked:!0,value:this.value}))},this.handleKeyDown=e=>{e.key===` `&&(e.preventDefault(),this.isDisabled||this.click())}}static{this.tagName=`minerva-radio`}static{this.styles=[D,E`
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
`,N(Wr)]}get group(){let e=this.parentElement?.closest(`minerva-radio-group`);return e instanceof Oa?e:null}get isDisabled(){return this.disabled||!!this.group?.isDisabled}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick),this.addEventListener(`keydown`,this.handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.removeEventListener(`keydown`,this.handleKeyDown)}updated(){let e=this.isDisabled;Vn(this,this.hostInternals,{role:`radio`,ariaChecked:String(this.checked),ariaDisabled:e?`true`:null},this.ownedAria),this.group||L(this,`tabindex`,e?`-1`:`0`);let t=this.error?this.errorMessage:this.helperText;t&&(this.ownsDescription||!this.hasAttribute(`aria-description`))?(this.ownsDescription=!0,L(this,`aria-description`,t)):!t&&this.ownsDescription&&(this.ownsDescription=!1,L(this,`aria-description`,null))}hookStates(){let e=this.group;return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error,size:e?.size??this.size,color:e?.color??this.color}}render(){let e=this.group,t=e?.size??this.size,n=e?.color??this.color,r=this.error?this.errorMessage:this.helperText,i=!!this.label||this.slots.test(`[default]`);return b`<div
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
${this.error&&this.errorMessage?b`<span class="errorIcon">${Un}</span>`:y}
<span
part="helper-text"
class=${w({helperText:!0,errorText:this.error})}
>${r}</span
>
</div>`:y}
</div>`}},H([S()],Da.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0})],Da.prototype,`checked`,void 0),H([S({type:Boolean,reflect:!0})],Da.prototype,`disabled`,void 0),H([S()],Da.prototype,`label`,void 0),H([S({reflect:!0})],Da.prototype,`size`,void 0),H([S({reflect:!0})],Da.prototype,`color`,void 0),H([S({type:Boolean,reflect:!0})],Da.prototype,`error`,void 0),H([S({attribute:`helper-text`})],Da.prototype,`helperText`,void 0),H([S({attribute:`error-message`})],Da.prototype,`errorMessage`,void 0),Oa=class e extends k{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.label=``,this.helperText=``,this.error=!1,this.direction=`vertical`,this.locale=new F(this),this.aria=new M(this,()=>this.labels),this.roving=new wa(this,()=>({getItems:()=>this.radios,isItemDisabled:e=>this.isDisabled||e.disabled,orientation:`both`,dir:ie(this),loop:!0})),this.observer=null,this.dirty=!1,this.rovingAttached=!1,this.settleQueued=!1,this.handleClick=e=>{let t=e.target?.closest?.(`minerva-radio`);t instanceof Da&&t.group===this&&this.select(t)},this.handleKeyDown=e=>{if(!e.defaultPrevented||!Ea.has(e.key))return;let t=this.roving.getActive();t instanceof Da&&this.select(t)}}static{this.tagName=`minerva-radio-group`}static{this.dependencies=[Da]}static{this.styles=[D,E`
:host{
display: block;
}
`,N(Wr)]}get radios(){return Array.from(this.querySelectorAll(`minerva-radio`)).filter(e=>e instanceof Da&&e.group===this)}focus(e){let t=this.radios;(t.find(e=>e.checked&&!e.disabled)??t.find(e=>!e.disabled))?.focus(e)}connectedCallback(){super.connectedCallback(),Lr(this)||this.attachRoving(),this.addEventListener(`click`,this.handleClick),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0}))}attachRoving(){this.rovingAttached||(this.rovingAttached=!0,this.roving.attach(this),this.addEventListener(`keydown`,this.handleKeyDown))}disconnectedCallback(){super.disconnectedCallback(),this.rovingAttached=!1,this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.observer?.disconnect(),this.observer=null}getFormValue(){return this.value===``?null:this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.radioMissing`),anchor:this.radios.find(e=>!e.disabled)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`?this.value=e:e===null&&(this.value=``)}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){super.updated(t);let n=this.radios,r;for(let e of n)e.checked=this.value!==``&&e.value===this.value,e.checked&&(r??=e),e.requestUpdate();this.syncRoving(n,r),V&&this.value!==``&&n.length>0&&!r&&O(e.tagName,`value "${this.value}" matches no <minerva-radio> of the group.`)}syncRoving(e,t){let n=[this,...e].find(Lr);if(n){this.settleQueued||(this.settleQueued=!0,pn(n,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.attachRoving(),t&&!t.disabled&&!this.isDisabled?this.roving.setActive(t,{focus:!1}):this.roving.refresh();for(let t of e)(this.isDisabled||t.disabled)&&t.setAttribute(`tabindex`,`-1`)}select(e){this.isDisabled||e.disabled||e.value===this.value||(this.dirty=!0,this.value=e.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}hookStates(){return{disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,required:this.required,orientation:this.direction,size:this.size,color:this.color}}render(){let e=this.error||this.aria.attr(`aria-invalid`)===`true`,t=this.label,n=[this.helperText,this.aria.description].filter(Boolean).join(` `);return b`<div
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
</div>`}},H([S({attribute:!1})],Oa.prototype,`value`,void 0),H([S({attribute:`value`})],Oa.prototype,`defaultValue`,void 0),H([S()],Oa.prototype,`label`,void 0),H([S({attribute:`helper-text`})],Oa.prototype,`helperText`,void 0),H([S({type:Boolean,reflect:!0})],Oa.prototype,`error`,void 0),H([S({reflect:!0})],Oa.prototype,`direction`,void 0),H([S({reflect:!0})],Oa.prototype,`size`,void 0),H([S({reflect:!0})],Oa.prototype,`color`,void 0)})))()}var Aa,ja,Ma,Na,Pa;function Fa(){return(Fa=e((()=>{A(),I(),B(),P(),vn(),R(),j(),Cn(),Ti(),ar(),g(),_(),x(),ft(),u(),m(),Aa={small:12,medium:16,large:20},ja=Array.from({length:5},(e,t)=>t),Ma=E`
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
`,Na=class e extends k{constructor(...e){super(...e),this.value=0,this.defaultValue=0,this.max=10,this.size=`medium`,this.showValue=!1,this.interactive=!1,this.readOnly=!1,this.locale=new F(this),this.aria=new M(this,()=>this.labels),this.dirty=!1,this.rating=new wi(this,re(this.ratingProps()))}static{this.tagName=`minerva-rating`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,E`
:host{
display: inline-flex;
vertical-align: middle;
}
`,N(Kt),Ma]}ratingProps(){return{value:this.value,max:this.max,readOnly:!this.isInteractive,onValueChange:e=>this.commit(e)}}send(e){this.rating.sync(this.ratingProps()),this.rating.send(e)}get isInteractive(){return this.interactive&&!this.readOnly&&!this.isDisabled}focus(e){this.root?.focus(e)}blur(){this.root?.blur()}getFormValue(){return String(this.value)}getValidity(){return this.required&&!(this.value>0)?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.root}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){if(typeof e==`string`&&e.trim()!==``){let t=Number(e);Number.isFinite(t)&&(this.value=t)}}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),V&&(t.has(`value`)||t.has(`max`))&&(this.value<0||this.value>this.max)&&O(e.tagName,`value (${this.value}) is outside 0..max (${this.max}).`),this.rating.sync(this.ratingProps())}commit(e){e!==this.value&&(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleStarClick(e,t){if(!this.isInteractive)return;let n=e.currentTarget.getBoundingClientRect(),r=e.clientX-n.left<n.width/2;this.send({type:`PICK`,index:t,half:r})}handleKeyDown(e){if(e.defaultPrevented||!this.isInteractive)return;let t=f(e.key,this);l(t,this.value,this.max)!==null&&(e.preventDefault(),this.send({type:`KEY`,key:t}))}hookStates(){return{readonly:!this.isInteractive,size:this.size}}renderStar(e,t){let n=T({width:`${t}px`,height:`${t}px`,fontSize:`${t}px`}),r=xn(`star`,{fill:e});return e===`half`?b`<span part=${r} class="star half" style=${n}
><span class="halfBase">${Ln}</span
><span class="halfFill">${Qt}</span></span
>`:b`<span
part=${r}
class=${w({star:!0,[e]:!0})}
style=${n}
>${Ln}</span
>`}render(){let e=this.isInteractive,{value:t,max:n}=this,r=this.rating.machine.project(this.rating.state,this.ratingProps()),i=Me(r,n),a=e=>i[e],o=Aa[this.size]??Aa.medium,s=this.aria.label??`${t.toFixed(1)} / ${n}`,c=b`<span class="stars" part="stars" aria-hidden="true">
${ja.map(t=>e?b`<button
type="button"
tabindex="-1"
class="starButton"
@click=${e=>this.handleStarClick(e,t)}
@mouseenter=${()=>this.send({type:`HOVER`,index:t})}
>
${this.renderStar(a(t),o)}
</button>`:this.renderStar(a(t),o))}
</span>`,l=this.showValue?b`<span class="value" part="value"
><strong>${t.toFixed(1)}</strong>${this.ratingCount===void 0?y:b`<span class="count" part="count"
>(${this.ratingCount.toLocaleString(`en-US`)})</span
>`}</span
>`:y,u=w({rating:!0,[this.size]:!0,interactive:e});return e?b`<span
part="root"
class=${u}
role="slider"
tabindex="0"
aria-label=${s}
aria-description=${this.aria.description??y}
aria-valuenow=${t}
aria-valuemin="0"
aria-valuemax=${n}
aria-required=${this.required?`true`:y}
@keydown=${this.handleKeyDown}
@mouseleave=${()=>this.send({type:`HOVER_END`})}
>${c}${l}</span
>`:b`<span
part="root"
class=${u}
role="img"
aria-label=${s}
aria-description=${this.aria.description??y}
aria-disabled=${this.isDisabled?`true`:y}
>${c}${l}</span
>`}},H([S({attribute:!1})],Na.prototype,`value`,void 0),H([S({type:Number,attribute:`value`})],Na.prototype,`defaultValue`,void 0),H([S({type:Number})],Na.prototype,`max`,void 0),H([S({reflect:!0})],Na.prototype,`size`,void 0),H([S({type:Boolean,attribute:`show-value`})],Na.prototype,`showValue`,void 0),H([S({type:Number,attribute:`rating-count`})],Na.prototype,`ratingCount`,void 0),H([S({type:Boolean,reflect:!0})],Na.prototype,`interactive`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],Na.prototype,`readOnly`,void 0),H([C(`.rating`)],Na.prototype,`root`,void 0),Pa=class extends z{constructor(...e){super(...e),this.dimensions=[],this.max=10,this.size=`medium`,this.interactive=!1,this.readOnly=!1,this.hideValue=!1}static{this.tagName=`minerva-rating-scale`}static{this.dependencies=[Na]}static{this.styles=[D,E`
:host{
display: block;
}
`,N(Kt)]}handleChange(e,t){e.stopPropagation();let{value:n}=e.detail;this.dimensions=this.dimensions.map(e=>e.key===t?{...e,value:n}:e),this.emit(`minerva-change`,{key:t,value:n,dimensions:this.dimensions})}hookStates(){return{readonly:!this.interactive||this.readOnly,size:this.size}}render(){return b`<div class="scale" part="root">
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
</div>`}},H([S({attribute:!1})],Pa.prototype,`dimensions`,void 0),H([S({type:Number})],Pa.prototype,`max`,void 0),H([S({reflect:!0})],Pa.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],Pa.prototype,`interactive`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],Pa.prototype,`readOnly`,void 0),H([S({type:Boolean,attribute:`hide-value`})],Pa.prototype,`hideValue`,void 0)})))()}var Ia,La,Ra,za,Ba;function Va(){return(Va=e((()=>{A(),I(),P(),vn(),R(),j(),Cn(),Dn(),g(),_(),ft(),u(),m(),Ia=[`small`,`medium`,`large`],La=[`neutral`,`primary`],Ra={fromAttribute(e){let t=e?.trim()??``;if(!t)return[];if(t.startsWith(`[`))try{let e=JSON.parse(t);if(Array.isArray(e))return e}catch{}return t.split(`,`).map(e=>e.trim()).filter(Boolean)}},za=e=>typeof e==`string`?{value:e}:e,Ba=class e extends k{constructor(...e){super(...e),this.options=[],this.value=``,this.defaultValue=``,this.size=`medium`,this.color=`neutral`,this.fullWidth=!1,this.locale=new F(this),this.aria=new M(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-segmented-control`}static{this.styles=[D,E`
:host{
display: inline-block;
max-inline-size: 100%;
vertical-align: middle;
}
:host([full-width]){
display: block;
}
`,N(qn)]}get items(){return(Array.isArray(this.options)?this.options:[]).map(za)}get segments(){return Array.from(this.renderRoot.querySelectorAll(`[role="radio"]`))}focus(e){this.renderRoot.querySelector(`[role="radio"][tabindex="0"]`)?.focus(e)}getFormValue(){return this.value===``?null:this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.radioMissing`),anchor:this.segments[0]??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`?this.value=e:e===null&&(this.value=``)}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),V&&(t.has(`value`)||t.has(`options`))&&this.value!==``&&this.items.length>0&&!this.items.some(e=>e.value===this.value)&&O(e.tagName,`value "${this.value}" matches no option: nothing is selected.`)}isItemDisabled(e){return this.isDisabled||!!this.items[e]?.disabled}select(e){if(this.isItemDisabled(e))return;let t=this.items[e].value;t!==this.value&&(this.dirty=!0,this.value=t,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:t}))}handleKeyDown(e,t){if(this.isDisabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=te({currentIndex:t,count:this.items.length,key:e.key,orientation:`both`,dir:ie(this),isDisabled:e=>this.isItemDisabled(e)});n!==null&&(e.preventDefault(),this.select(n),this.segments[n]?.focus())}hookStates(){return{disabled:this.isDisabled,size:Ia.includes(this.size)?this.size:`medium`,color:La.includes(this.color)?this.color:`neutral`}}render(){let e=this.items,t=this.isDisabled,{size:n,color:r}=this.hookStates(),i=e.findIndex(e=>e.value===this.value),a=i>=0&&!this.isItemDisabled(i)?i:e.findIndex((e,t)=>!this.isItemDisabled(t)),o=[`segmentedControl`,n,r,this.fullWidth?`fullWidth`:``,t?`disabled`:``].filter(Boolean).join(` `);return b`<div
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
part=${xn(`item`,r)}
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
</div>`}},H([S({converter:Ra})],Ba.prototype,`options`,void 0),H([S({attribute:!1})],Ba.prototype,`value`,void 0),H([S({attribute:`value`})],Ba.prototype,`defaultValue`,void 0),H([S({reflect:!0})],Ba.prototype,`size`,void 0),H([S({reflect:!0})],Ba.prototype,`color`,void 0),H([S({type:Boolean,attribute:`full-width`,reflect:!0})],Ba.prototype,`fullWidth`,void 0)})))()}var Ha,Ua,Wa,Ga,Ka;function qa(){return(qa=e((()=>{Kn(),A(),I(),B(),En(),R(),j(),Hn(),g(),_(),Ha=0,Ua=class e extends z{constructor(...e){super(...e),this.internals=sn(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.label=``,this.selected=!1,this.highlighted=!1}static{this.tagName=`minerva-option`}static{this.styles=[D,E`
:host{
display: block;
outline: none;
}
`,N(Wn)]}get text(){return this.textValue??(this.label||this.textContent?.trim()||``)}get displayLabel(){return this.label||this.textContent?.trim()||``}connectedCallback(){super.connectedCallback(),Vn(this,this.internals,{role:`option`},this.ownedAria)}updated(t){super.updated(t),Vn(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),L(this,`data-highlighted`,this.highlighted),L(this,`data-disabled`,this.disabled),L(this,`data-selected`,this.selected),V&&t.has(`value`)&&this.value===``&&this.isConnected&&O(e.tagName,`an option needs a non-empty "value" (the empty value means "nothing selected").`)}hookStates(){return{selected:this.selected,highlighted:this.highlighted,disabled:this.disabled}}render(){return b`<div
part="root"
class="item"
?data-selected=${this.selected}
?data-highlighted=${this.highlighted}
?data-disabled=${this.disabled}
>
<span class="itemText" part="label"><slot></slot></span>
${this.selected?b`<span class="itemIndicator" part="indicator" aria-hidden="true"
>${jr}</span
>`:y}
</div>`}},H([S({reflect:!0})],Ua.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0})],Ua.prototype,`disabled`,void 0),H([S()],Ua.prototype,`label`,void 0),H([S({attribute:`text-value`})],Ua.prototype,`textValue`,void 0),H([S({type:Boolean,attribute:!1})],Ua.prototype,`selected`,void 0),H([S({type:Boolean,attribute:!1})],Ua.prototype,`highlighted`,void 0),Wa=class extends z{constructor(...e){super(...e),this.internals=sn(this),this.observer=null}static{this.tagName=`minerva-option-group`}static{this.styles=[D,E`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback(),Vn(this,this.internals,{role:`group`}),this.syncLabel(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.syncLabel()),this.observer.observe(this,{childList:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}syncLabel(){let e=this.querySelector(`:scope > minerva-select-label`);if(e){let t=Jn(e,`id`);t||(t=`minerva-select-label-${Ha++}`,L(e,`id`,t,this)),L(this,`aria-labelledby`,t)}else L(this,`aria-labelledby`,null)}render(){return b`<div part="root"><slot></slot></div>`}},Ga=class extends z{static{this.tagName=`minerva-select-label`}static{this.styles=[D,E`
:host{
display: block;
}
`,N(Wn)]}render(){return b`<div class="label" part="root"><slot></slot></div>`}},Ka=class extends z{constructor(...e){super(...e),this.internals=sn(this)}static{this.tagName=`minerva-select-separator`}static{this.styles=[D,E`
:host{
display: block;
}
`,N(Wn)]}connectedCallback(){super.connectedCallback(),Vn(this,this.internals,{ariaHidden:`true`})}render(){return b`<div class="separator" part="root"></div>`}}})))()}var Ja,Ya,Xa,Za,Qa,$a;function eo(){return(eo=e((()=>{A(),I(),B(),P(),vn(),R(),j(),xi(),Cn(),Hn(),qa(),g(),_(),x(),u(),m(),Ja=10,Ya=e=>Array.isArray(e.options),Xa=e=>e.getAttribute(`aria-disabled`)===`true`,Za=e=>e instanceof Ua?e.value:e.dataset.value??``,Qa=e=>e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey,$a=class e extends k{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.highlighted=null,this.locale=new F(this),this.aria=new M(this,()=>this.labels),this.typeahead=Be(),this.floating=new yi(this,()=>({anchor:()=>this.trigger,floating:()=>this.positioner,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,fitViewportHeight:!0,branches:()=>[this.trigger],onDismiss:()=>this.requestOpen(!1),returnFocusOnEscape:()=>this.trigger,focusable:!0,onPosition:()=>this.syncHookStates()})),this.openIntent=`selected`,this.scrollPending=!1,this.dirty=!1,this.observer=null}static{this.tagName=`minerva-select`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,bi,E`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,N(Wn)]}focus(e){this.trigger?.focus(e)}blur(){this.trigger?.blur()}show(){this.open=!0}hide(){this.open=!1}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:[`value`,`disabled`,`label`,`text-value`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.typeahead.reset()}get lightOptions(){return Array.from(this.querySelectorAll(`minerva-option`)).filter(e=>e instanceof Ua)}get dataOptions(){return(this.options??[]).flatMap(e=>Ya(e)?e.options:[e])}get items(){return[...this.dataOptions.map(e=>({value:e.value,disabled:!!e.disabled,text:e.textValue??e.label,label:e.label})),...this.lightOptions.map(e=>({value:e.value,disabled:e.disabled,text:e.text,label:e.displayLabel}))]}getOptions(){let e=this.listbox;return e?[...Array.from(e.querySelectorAll(`[role=option]`)),...this.lightOptions]:[]}findOption(e){if(e!==null)return this.getOptions().find(t=>Za(t)===e)}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.trigger}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}requestOpen(e){e!==this.open&&(e&&this.isDisabled||this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}openWith(e){this.openIntent=e,this.requestOpen(!0)}close(e){e&&this.trigger?.focus(),this.requestOpen(!1)}commitValue(e){e!==this.value&&(this.value=e,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}selectValue(e){this.commitValue(e),this.close(!0)}willUpdate(e){if(e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open){let e=this.openIntent;this.openIntent=`selected`;let t=this.items.filter(e=>!e.disabled),n=e===`last`?t[t.length-1]:e===`first`?t[0]:t.find(e=>e.value===this.value)??t[0];this.typeahead.reset(),this.scrollPending=!0,this.highlighted=n?.value??null}e.has(`open`)&&!this.open&&(this.highlighted=null)}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?Se(e):{side:void 0,align:void 0};return{state:this.open?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,required:this.required,size:this.size,side:t,align:n,placement:e}}updated(e){super.updated(e);for(let e of this.lightOptions)e.selected=e.value===this.value,e.highlighted=this.open&&e.value===this.highlighted;if(this.floating.sync(this.open),this.open&&this.listbox){if(e.has(`open`)||e.has(`highlighted`)){let e=this.findOption(this.highlighted)??this.listbox;e.getRootNode()===this.shadowRoot?this.shadowRoot?.activeElement!==e&&e.focus({preventScroll:!0}):document.activeElement!==e&&(e.hasAttribute(`tabindex`)||(e.tabIndex=-1),e.focus({preventScroll:!0}))}this.scrollPending&&(this.scrollPending=!1,this.findOption(this.highlighted)?.scrollIntoView?.({block:`nearest`}))}V&&this.checkOptions()}checkOptions(){let t=this.items;if(t.length===0)return;let n=new Set;for(let r of t)n.has(r.value)&&O(e.tagName,`several options have the value "${r.value}"; option values must be unique.`),n.add(r.value);this.value!==``&&!n.has(this.value)&&O(e.tagName,`value "${this.value}" does not match any option.`)}handleTriggerKeyDown(e){if(this.open)return;let{key:t}=e;if(Qa(e)&&(t!==` `||this.typeahead.getBuffer()!==``)){let n=this.items,r=this.typeahead.search(t,n,n.findIndex(e=>e.value===this.value));e.preventDefault(),r!==-1&&this.commitValue(n[r].value);return}let n={Enter:`selected`," ":`selected`,ArrowDown:`selected`,ArrowUp:this.value===``?`last`:`selected`,Home:`first`,End:`last`};t in n&&(e.preventDefault(),this.openWith(n[t]))}handleListboxKeyDown(e){let{key:t}=e;if(t===`Tab`){this.close(!0);return}let n=this.getOptions(),r=n.findIndex(e=>Za(e)===this.highlighted),i=r===-1?void 0:n[r],a=()=>{i&&!Xa(i)&&this.selectValue(Za(i))};if(t===`Enter`||t===`ArrowUp`&&e.altKey){e.preventDefault(),a();return}if(t===` `&&this.typeahead.getBuffer()===``){e.preventDefault(),a();return}if(e.ctrlKey||e.metaKey||e.altKey)return;let o=te({currentIndex:r,count:n.length,key:t,loop:!1,isDisabled:e=>Xa(n[e]),pageSize:Ja});if((o!==null||t.startsWith(`Arrow`)||t.startsWith(`Page`))&&e.preventDefault(),o===null&&Qa(e)){let i=this.typeahead.search(t,n.map(e=>({text:e instanceof Ua?e.text:e.dataset.textValue??e.textContent??``,disabled:Xa(e)})),r);i!==-1&&(e.preventDefault(),this.scrollPending=!0,this.highlighted=Za(n[i]));return}o!==null&&(this.typeahead.reset(),this.scrollPending=!0,this.highlighted=Za(n[o]))}optionFromEvent(e){let t=this.getOptions();return e.composedPath().find(e=>t.includes(e))}handleListboxPointerMove(e){let t=this.optionFromEvent(e);if(!t||Xa(t))return;let n=Za(t);this.highlighted!==n&&(this.scrollPending=!1,this.highlighted=n)}handleListboxClick(e){let t=this.optionFromEvent(e);t&&!Xa(t)&&this.selectValue(Za(t))}renderDataOption(e){let t=e.value===this.value,n=this.highlighted===e.value,r=!!e.disabled;return b`<div
part=${xn(`item`,{selected:t,highlighted:n,disabled:r})}
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
>${jr}</span
>`:y}
</div>`}renderDataOptions(){return(this.options??[]).map((e,t)=>{if(!Ya(e))return this.renderDataOption(e);let n=`group-label-${t}`;return b`<div role="group" aria-labelledby=${n}>
<div id=${n} class="label" part="group-label">${e.label}</div>
${e.options.map(e=>this.renderDataOption(e))}
</div>`})}render(){let e=this.isDisabled,t=this.value===``,n=t?void 0:this.items.find(e=>e.value===this.value),r=this.aria.label,{side:i,align:a}=Se(this.floating.position.placement);return b`<button
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
>${zr}</span
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
</div>`:y}`}},H([S({attribute:!1})],$a.prototype,`value`,void 0),H([S({attribute:`value`})],$a.prototype,`defaultValue`,void 0),H([S({attribute:!1})],$a.prototype,`options`,void 0),H([S({type:Boolean,reflect:!0})],$a.prototype,`open`,void 0),H([S()],$a.prototype,`placeholder`,void 0),H([S({reflect:!0})],$a.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],$a.prototype,`invalid`,void 0),H([v()],$a.prototype,`highlighted`,void 0),H([C(`.trigger`)],$a.prototype,`trigger`,void 0),H([C(`.positioner`)],$a.prototype,`positioner`,void 0),H([C(`[role=listbox]`)],$a.prototype,`listbox`,void 0)})))()}var to,no,ro,io,ao;function oo(){return(oo=e((()=>{A(),I(),P(),R(),j(),fn(),g(),_(),x(),ft(),to=e=>e==null||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,no=e=>typeof e!=`number`&&!/^\d+(\.\d+)?$/.test(e)?e:`var(--space-${String(e).replace(`.`,`-`)})`,ro=[D,E`

:host(:dir(rtl)) .animation-wave{
animation-direction: reverse;
}
`],io=class e extends z{constructor(...e){super(...e),this.variant=`text`,this.animation=`pulse`,this.loaded=!1,this.decorative=!1,this.lines=1,this.avatar=!1,this.avatarSize=`40`,this.avatarShape=`circle`,this.active=!1,this.paragraph=!1,this.heading=!1,this.locale=new F(this),this.aria=new M(this)}static{this.tagName=`minerva-skeleton`}static{this.styles=[...ro,E`
:host{
display: block;
}
:host([decorative][variant="circular"]){
display: inline-block;
vertical-align: middle;
}
`,N(Fr)]}hookStates(){return{variant:this.variant}}updated(t){V&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&O(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}block(e,t,n={}){return b`<div
part=${e}
class=${w({skeleton:!0,[`animation-${this.animation}`]:!0,...t})}
style=${T(n)}
></div>`}renderAvatar(){if(!this.avatar)return y;let e=to(this.avatarSize);return this.block(`avatar`,{avatar:!0,[`avatar-${this.avatarShape}`]:!0},{width:e,height:e})}renderTitle(){return this.heading?this.block(`title`,{title:!0}):y}renderParagraph(){return this.paragraph?b`<div class="paragraph">
${[`100%`,`100%`,`92%`,`60%`].map(e=>this.block(`line`,{},{width:e,height:`16px`}))}
</div>`:y}renderLines(){if(this.paragraph||this.heading)return y;let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return Array.from({length:e},()=>this.block(`line`,{[this.variant]:!0},{width:to(this.width),height:to(this.height),borderRadius:to(this.borderRadius)}))}render(){if(this.loaded)return b`<slot></slot>`;if(this.decorative){let e=this.variant===`circular`?to(this.size??this.width??`32`):void 0;return b`<span
part="root"
aria-hidden="true"
class=${w({skeleton:!0,decorative:!0,[this.variant]:!0,[`animation-${this.animation}`]:!0})}
style=${T({width:e??to(this.width),height:e??to(this.height),borderRadius:to(this.borderRadius)})}
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
</div>`}},H([S({reflect:!0})],io.prototype,`variant`,void 0),H([S({reflect:!0})],io.prototype,`animation`,void 0),H([S({type:Boolean,reflect:!0})],io.prototype,`loaded`,void 0),H([S({type:Boolean,reflect:!0})],io.prototype,`decorative`,void 0),H([S()],io.prototype,`size`,void 0),H([S()],io.prototype,`width`,void 0),H([S()],io.prototype,`height`,void 0),H([S({attribute:`border-radius`})],io.prototype,`borderRadius`,void 0),H([S({type:Number})],io.prototype,`lines`,void 0),H([S({type:Boolean})],io.prototype,`avatar`,void 0),H([S({attribute:`avatar-size`})],io.prototype,`avatarSize`,void 0),H([S({attribute:`avatar-shape`})],io.prototype,`avatarShape`,void 0),H([S({type:Boolean})],io.prototype,`active`,void 0),H([S({type:Boolean})],io.prototype,`paragraph`,void 0),H([S({type:Boolean})],io.prototype,`heading`,void 0),ao=class e extends z{constructor(...e){super(...e),this.lines=3,this.lineHeight=`1em`,this.gap=`2`,this.noShrinkLast=!1,this.animation=`pulse`}static{this.tagName=`minerva-skeleton-text`}static{this.styles=[...ro,E`
:host{
display: block;
}
`,N(Fr)]}updated(t){V&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&O(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}render(){let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return b`<div
part="root"
aria-hidden="true"
class="skeletonText"
style=${T({gap:no(this.gap)})}
>
${Array.from({length:e},(t,n)=>b`<span
part="line"
class="skeleton decorative text animation-${this.animation}"
style=${T({height:to(this.lineHeight),width:!this.noShrinkLast&&n===e-1?`70%`:`100%`})}
></span>`)}
</div>`}},H([S({type:Number})],ao.prototype,`lines`,void 0),H([S({attribute:`line-height`})],ao.prototype,`lineHeight`,void 0),H([S()],ao.prototype,`gap`,void 0),H([S({type:Boolean,attribute:`no-shrink-last`})],ao.prototype,`noShrinkLast`,void 0),H([S({reflect:!0})],ao.prototype,`animation`,void 0)})))()}var so,co,lo,uo,K;function fo(){return(fo=e((()=>{A(),P(),vn(),R(),j(),Cn(),mn(),g(),_(),x(),ft(),u(),m(),so={fromAttribute(e){if(e===null||e.trim()===``)return;let t=e.split(`,`).map(e=>Number(e.trim()));return t.length>=2?[t[0],t[1]]:t[0]},toAttribute(e){return e===void 0?null:Array.isArray(e)?e.join(`,`):String(e)}},co={fromAttribute(e){if(e===null)return 1;let t=Number(e);return e.trim()===``||!Number.isFinite(t)?null:t},toAttribute(e){return e===null?`null`:String(e)}},lo={fromAttribute(e){if(e===null)return!1;let t=e.trim();if(t.startsWith(`[`))try{return JSON.parse(t)}catch{return!1}return t!==`false`}},uo=e=>String(e),K=class extends k{constructor(...e){super(...e),this.value=void 0,this.defaultValue=void 0,this.range=!1,this.min=0,this.max=100,this.step=1,this.marks=!1,this.snapToMarks=!1,this.readOnly=!1,this.invalid=!1,this.size=`medium`,this.color=`primary`,this.showValue=!1,this.tooltip=!1,this.orientation=`horizontal`,this.formatValue=void 0,this.getAriaValueText=void 0,this.dragging=null,this.dirty=!1,this.locale=new F(this),this.aria=new M(this,()=>this.labels)}static{this.tagName=`minerva-slider`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,E`
:host{
display: block;
}
:host([orientation="vertical"]){
display: inline-block;
}
`,N(cn)]}get scale(){return{min:this.min,max:this.max,step:this.step,marks:Fe(this.marks,this.min,this.max,this.step),snapToMarks:this.snapToMarks}}get resolvedValue(){return qe(this.value,this.range,this.scale)}get blocked(){return this.isDisabled||this.readOnly}focus(e){this.renderRoot.querySelector(`[role="slider"]`)?.focus(e)}blur(){(this.shadowRoot?.activeElement)?.blur()}getFormValue(){let e=this.resolvedValue;if(!Array.isArray(e))return String(e);if(!this.name)return null;let t=new FormData;for(let n of e)t.append(this.name,String(n));return t}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){if(typeof e==`string`)this.value=Number(e);else if(e instanceof FormData&&this.name){let[t,n]=e.getAll(this.name).map(Number);this.value=[t,n]}}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&(this.value=this.defaultValue)}format(e){return(this.formatValue??uo)(e)}setValue(e){return!a(e,this.resolvedValue)&&(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.emit(`minerva-change`,{value:e}),!0)}commit(){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change-end`,{value:this.resolvedValue})}valueAtPointer(e){let t=this.control.getBoundingClientRect(),n;return this.orientation===`vertical`?n=t.height?(t.bottom-e.clientY)/t.height:0:(n=t.width?(e.clientX-t.left)/t.width:0,ie(this)===`rtl`&&(n=1-n)),ne(n,this.scale)}handlePointerDown(e){if(this.blocked||e.button!==0)return;e.preventDefault();let t=this.valueAtPointer(e),n=e.target.closest(`[data-index]`)?.dataset.index,r=n===void 0?Ue(this.resolvedValue,t):Number(n);e.currentTarget.setPointerCapture?.(e.pointerId),this.dragging=r,this.renderRoot.querySelector(`[data-index="${r}"]`)?.focus(),n===void 0&&this.setValue(ot(this.resolvedValue,r,t))}handlePointerMove(e){this.dragging!==null&&this.setValue(ot(this.resolvedValue,this.dragging,this.valueAtPointer(e)))}handlePointerEnd(e){if(this.dragging===null)return;let t=e.currentTarget;t.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId),this.dragging=null,this.commit()}handleKeyDown(e,t){if(this.blocked)return;let n=this.orientation===`vertical`?e.key:f(e.key,this),r=de(this.resolvedValue),i=o(n,r[t],this.scale);i!==null&&(e.preventDefault(),this.setValue(ot(this.resolvedValue,t,i))&&this.commit())}hookStates(){return{disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,dragging:this.dragging!==null,size:this.size,color:this.color,orientation:this.orientation,variant:this.range?`range`:`single`}}labelOf(e){let t=this.aria.label;if(!this.range)return t;let n=this.locale.t(e===0?`slider.minimum`:`slider.maximum`);return t?`${t} ${n}`:n}render(){let e=this.resolvedValue,t=de(e),{min:n,max:r,orientation:i}=this,a=i===`vertical`,o=Fe(this.marks,n,r,this.step),s=this.isDisabled,c=this.invalid||this.aria.attr(`aria-invalid`)===`true`,l=e=>dt(e,n,r),u=e=>T(a?{bottom:`${e}%`}:{"inset-inline-start":`${e}%`}),d=this.range?l(t[0]):0,f=l(t[t.length-1]),p=T(a?{bottom:`${d}%`,height:`${f-d}%`}:{"inset-inline-start":`${d}%`,width:`${f-d}%`});return b`<div
part="root"
class=${w({slider:!0,[this.size]:!0,[this.color]:!0,vertical:a,labelled:o.some(e=>e.label),disabled:s,readOnly:this.readOnly,dragging:this.dragging!==null})}
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
<span part="range" class="range" style=${p}></span>
${o.map(t=>{let i=ye(t.value,e);return b`<span
part=${xn(`mark`,{state:i?`active`:`inactive`})}
class=${w({mark:!0,markActive:i})}
style=${u(l(t.value))}
aria-hidden="true"
>${t.label?b`<span
part="mark-label"
class=${w({markLabel:!0,markLabelStart:t.value<=n,markLabelEnd:t.value>=r})}
>${t.label}</span
>`:y}</span
>`})}
${t.map((e,a)=>{let o=this.dragging===a;return b`<span
part=${xn(`thumb`,{dragging:o,disabled:s})}
class=${w({thumb:!0,thumbDragging:o})}
style=${u(l(e))}
data-index=${a}
role="slider"
tabindex=${s?`-1`:`0`}
aria-label=${this.labelOf(a)??y}
aria-description=${this.aria.description??y}
aria-valuemin=${String(this.range&&a===1?t[0]:n)}
aria-valuemax=${String(this.range&&a===0?t[1]:r)}
aria-valuenow=${String(e)}
aria-valuetext=${this.getAriaValueText?this.getAriaValueText(e,a):this.format(e)}
aria-orientation=${i}
aria-disabled=${s?`true`:y}
aria-readonly=${this.readOnly?`true`:y}
aria-invalid=${c?`true`:y}
@keydown=${e=>this.handleKeyDown(e,a)}
>${this.tooltip?b`<span part="tooltip" class="tooltip" aria-hidden="true"
>${this.format(e)}</span
>`:y}</span
>`})}
</div>
${this.showValue?b`<span part="value" class="value" aria-hidden="true"
>${t.map(e=>this.format(e)).join(` – `)}</span
>`:y}
</div>`}},H([S({attribute:!1})],K.prototype,`value`,void 0),H([S({attribute:`value`,converter:so})],K.prototype,`defaultValue`,void 0),H([S({type:Boolean,reflect:!0})],K.prototype,`range`,void 0),H([S({type:Number})],K.prototype,`min`,void 0),H([S({type:Number})],K.prototype,`max`,void 0),H([S({converter:co})],K.prototype,`step`,void 0),H([S({converter:lo})],K.prototype,`marks`,void 0),H([S({type:Boolean,attribute:`snap-to-marks`})],K.prototype,`snapToMarks`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],K.prototype,`readOnly`,void 0),H([S({type:Boolean,reflect:!0})],K.prototype,`invalid`,void 0),H([S({reflect:!0})],K.prototype,`size`,void 0),H([S({reflect:!0})],K.prototype,`color`,void 0),H([S({type:Boolean,attribute:`show-value`})],K.prototype,`showValue`,void 0),H([S({type:Boolean})],K.prototype,`tooltip`,void 0),H([S({reflect:!0})],K.prototype,`orientation`,void 0),H([S({attribute:!1})],K.prototype,`formatValue`,void 0),H([S({attribute:!1})],K.prototype,`getAriaValueText`,void 0),H([v()],K.prototype,`dragging`,void 0),H([C(`.control`)],K.prototype,`control`,void 0)})))()}var po,mo;function ho(){return(ho=e((()=>{I(),R(),wn(),j(),ai(),zn(),g(),_(),x(),ft(),po=320,mo=class e extends z{constructor(...e){super(...e),this.asideWidth=po,this.collapseBelow=`md`,this.gap=6,this.slots=new nn(this)}static{this.tagName=`minerva-split-layout`}static{this.styles=[D,E`
:host{
display: block;
min-width: 0;
}
`,N(Fn)]}get validAsideWidth(){return Number.isFinite(this.asideWidth)&&this.asideWidth>0}updated(){V&&!this.validAsideWidth&&O(e.tagName,`aside-width must be a finite positive number (got ${String(this.asideWidth)}); using ${po}.`)}render(){let e=this.slots.test(`aside`),t=this.validAsideWidth?this.asideWidth:po;return b`<div
class="root"
part="root"
style=${T({"--split-layout-aside-width":`${t}px`,"--split-layout-gap":$e(this.gap)})}
>
<div
class=${w({grid:!0,[this.collapseBelow]:!0,hasAside:e})}
>
<div class="main" part="main"><slot></slot></div>
${e?b`<div class="aside" part="aside">
<slot name="aside"></slot>
</div>`:y}
</div>
</div>`}},H([S({type:Number,attribute:`aside-width`})],mo.prototype,`asideWidth`,void 0),H([S({attribute:`collapse-below`,reflect:!0})],mo.prototype,`collapseBelow`,void 0),H([S({converter:si})],mo.prototype,`gap`,void 0)})))()}var go,_o,vo,yo,bo,xo,So,Co;function wo(){return(wo=e((()=>{A(),I(),R(),wn(),j(),ai(),ln(),g(),_(),x(),ft(),go={start:`flex-start`,center:`center`,end:`flex-end`,stretch:`stretch`,baseline:`baseline`},_o={start:`flex-start`,center:`center`,end:`flex-end`,between:`space-between`,around:`space-around`,evenly:`space-evenly`},vo=()=>typeof HTMLSlotElement<`u`&&typeof HTMLSlotElement.prototype.assign==`function`,yo=`minerva-stack-item-`,bo=e=>Array.from(e.childNodes).filter(e=>e.nodeType===1||e.nodeType===3&&!!e.textContent?.trim()),xo=class extends z{constructor(...e){super(...e),this.direction=`column`,this.wrap=!1,this.attached=!1,this.aria=new M(this),this.slots=new nn(this),this.manualSlots=!1,this.fallbackSlotted=new Set}static{this.tagName=`minerva-stack`}static{this.styles=[D,E`
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
`,N(In)]}get resolvedDirection(){return this.direction}get resolvedAlign(){return this.align}createRenderRoot(){if(!this.shadowRoot){this.manualSlots=vo();let e=this.constructor;this.attachShadow({...e.shadowRootOptions,slotAssignment:this.manualSlots?`manual`:`named`})}return super.createRenderRoot()}renderSeparator(){let e=this.separator;return typeof e==`function`?e():e}get hasSeparator(){let e=this.separator;return e!=null&&e!==``}fallbackItems(){return Array.from(this.children).filter(e=>{let t=e.getAttribute(`slot`);return t===null||this.fallbackSlotted.has(e)&&t!==``})}releaseFallbackSlots(e=[]){for(let t of this.fallbackSlotted)e.includes(t)||(t.getAttribute(`slot`)?.startsWith(yo)&&t.removeAttribute(`slot`),this.fallbackSlotted.delete(t))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this.releaseFallbackSlots()}updated(){if(this.manualSlots){let e=bo(this),t=Array.from(this.renderRoot.querySelectorAll(`slot`));t.length===1?t[0].assign(...e):t.forEach((t,n)=>t.assign(e[n]))}else if(this.hasSeparator){let e=this.fallbackItems();e.forEach((e,t)=>{let n=`${yo}${t}`;this.fallbackSlotted.add(e),e.getAttribute(`slot`)!==n&&e.setAttribute(`slot`,n)}),this.releaseFallbackSlots(e)}else this.releaseFallbackSlots();V&&this.attached&&!this.aria.label&&O(this.constructor.tagName,`attached stacks are exposed as role="group": set aria-label (or aria-labelledby) to name the group.`)}renderItems(){return this.hasSeparator?this.manualSlots?Array.from({length:bo(this).length},(e,t)=>b`${t>0?this.renderSeparator():y}<slot></slot>`):b`${Array.from({length:this.fallbackItems().length},(e,t)=>b`${t>0?this.renderSeparator():y}<slot
name=${`${yo}${t}`}
></slot>`)}<slot></slot>`:b`<slot></slot>`}hookStates(){return{orientation:this.resolvedDirection.startsWith(`row`)?`horizontal`:`vertical`}}render(){this.slots;let e=this.resolvedDirection,t=this.resolvedAlign,n={};return this.gap!==void 0&&this.gap!==``&&!this.attached&&(n.gap=$e(this.gap)),t&&go[t]&&(n.alignItems=go[t]),this.justify&&_o[this.justify]&&(n.justifyContent=_o[this.justify]),b`<div
part="root"
class=${w({stack:!0,[e]:!0,wrap:this.wrap,attached:this.attached})}
style=${T(n)}
role=${this.attached?`group`:y}
aria-label=${this.attached?this.aria.label??y:y}
>
${this.renderItems()}
</div>`}},H([S({reflect:!0})],xo.prototype,`direction`,void 0),H([S({converter:si})],xo.prototype,`gap`,void 0),H([S({reflect:!0})],xo.prototype,`align`,void 0),H([S({reflect:!0})],xo.prototype,`justify`,void 0),H([S({type:Boolean,reflect:!0})],xo.prototype,`wrap`,void 0),H([S({attribute:`separator`})],xo.prototype,`separator`,void 0),H([S({type:Boolean,reflect:!0})],xo.prototype,`attached`,void 0),So=class extends xo{static{this.tagName=`minerva-hstack`}constructor(){super(),this.direction=`row`}get resolvedDirection(){return`row`}hookStates(){return{}}get resolvedAlign(){return this.align??`center`}},Co=class extends xo{static{this.tagName=`minerva-vstack`}constructor(){super(),this.direction=`column`}get resolvedDirection(){return`column`}hookStates(){return{}}get resolvedAlign(){return this.align??`stretch`}}})))()}var To;function Eo(){return(Eo=e((()=>{A(),I(),P(),vn(),R(),j(),Zt(),g(),_(),x(),gt(),To=class e extends z{constructor(...e){super(...e),this.items=[],this.value=``,this.navigable=!1,this.locale=new F(this),this.aria=new M(this)}static{this.tagName=`minerva-steps`}static{this.styles=[D,E`
:host{
display: block;
}
`,N(Qr)]}select(e){e.disabled||e.value===this.value||this.emit(`minerva-change`,{value:e.value},{cancelable:!0})&&(this.value=e.value)}updated(){V&&this.value&&this.items.length&&!this.items.some(e=>e.value===this.value)&&O(e.tagName,`value "${this.value}" matches no step: no step is marked current.`)}hookStates(){return{readonly:!this.navigable}}render(){let e=this.items??[],t=e.findIndex(e=>e.value===this.value),n=!this.navigable;return b`<ol
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
part=${xn(`item`,{current:i,disabled:!n&&!!e.disabled,status:s})}
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
</ol>`}},H([S({attribute:!1})],To.prototype,`items`,void 0),H([S({reflect:!0})],To.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0})],To.prototype,`navigable`,void 0)})))()}var Do,Oo,q;function ko(){return(ko=e((()=>{A(),I(),P(),R(),wn(),j(),Cn(),An(),g(),_(),x(),ht(),Do=400,Oo={start:`labelStart`,end:`labelEnd`,top:`labelTop`,bottom:`labelBottom`},q=class e extends k{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.value=`on`,this.label=``,this.offLabel=``,this.onLabel=``,this.variant=`slider`,this.size=`medium`,this.color=`primary`,this.shape=`round`,this.labelPlacement=`end`,this.iconPlacement=`start`,this.loading=!1,this.noRipple=!1,this.readOnly=!1,this.invalid=!1,this.rippleActive=!1,this.dirty=!1,this.locale=new F(this),this.aria=new M(this,()=>this.labels),this.slots=new nn(this)}static{this.tagName=`minerva-switch`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,E`
:host{
display: inline-flex;
vertical-align: middle;
}
`,N(hn)]}get bilateral(){return!!this.offLabel&&!!this.onLabel}get segmented(){return this.variant===`segmented`&&this.bilateral}get blocked(){return this.isDisabled||this.loading||this.readOnly}focus(e){if(this.segmented){this.renderRoot.querySelector(`.segmentActive`)?.focus(e);return}this.input?.focus(e)}blur(){(this.shadowRoot?.activeElement)?.blur()}click(){this.input?.click()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(t){t.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked),V&&t.has(`variant`)&&this.variant===`segmented`&&!this.bilateral&&O(e.tagName,`variant="segmented" needs both off-label and on-label; rendering a slider.`)}handleChange(){if(this.blocked){this.input.checked=this.checked;return}this.dirty=!0,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value})}handleKeyDown(e){e.key===`Enter`&&(e.preventDefault(),!this.blocked&&this.input.click())}handleClick(e){if(this.readOnly){e.preventDefault();return}this.noRipple||this.blocked||(clearTimeout(this.rippleTimer),this.rippleActive=!0,this.rippleTimer=setTimeout(()=>this.rippleActive=!1,Do))}setState(e){this.blocked||e===this.checked||this.input.click()}hookStates(){return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,loading:this.loading,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape,variant:this.segmented?`segmented`:`slider`}}renderInput(e){let t=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return b`<input
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
</span>`;let n=this.bilateral,r=this.slots.test(`icon`),i=w({switch:!0,[this.size]:!0,[Oo[this.labelPlacement]]:!n,[this.color]:!0,checked:this.checked,checkedLarge:this.checked&&this.size===`large`,disabled:t,loading:this.loading,square:this.shape===`square`,ripple:!this.noRipple&&this.rippleActive,bilateral:n}),a=b`<span class="switchBase" part="control">
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
>`}},H([S({attribute:!1})],q.prototype,`checked`,void 0),H([S({type:Boolean,attribute:`checked`,reflect:!0})],q.prototype,`defaultChecked`,void 0),H([S()],q.prototype,`value`,void 0),H([S()],q.prototype,`label`,void 0),H([S({attribute:`off-label`})],q.prototype,`offLabel`,void 0),H([S({attribute:`on-label`})],q.prototype,`onLabel`,void 0),H([S({reflect:!0})],q.prototype,`variant`,void 0),H([S({reflect:!0})],q.prototype,`size`,void 0),H([S({reflect:!0})],q.prototype,`color`,void 0),H([S({reflect:!0})],q.prototype,`shape`,void 0),H([S({attribute:`label-placement`,reflect:!0})],q.prototype,`labelPlacement`,void 0),H([S({attribute:`icon-placement`})],q.prototype,`iconPlacement`,void 0),H([S({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),H([S({type:Boolean,attribute:`no-ripple`})],q.prototype,`noRipple`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],q.prototype,`readOnly`,void 0),H([S({type:Boolean,reflect:!0})],q.prototype,`invalid`,void 0),H([v()],q.prototype,`rippleActive`,void 0),H([C(`input`)],q.prototype,`input`,void 0)})))()}var Ao,jo,Mo,No,Po;function Fo(){return(Fo=e((()=>{Kn(),A(),I(),Rn(),En(),R(),j(),Ti(),Ta(),dn(),g(),_(),x(),m(),Ao=0,jo=e=>e.parentElement?.closest(`minerva-tabs`)??null,Mo=class e extends z{constructor(...e){super(...e),this.variant=`line`,this.color=`primary`,this.orientation=`horizontal`,this.activationMode=`automatic`,this.noLoop=!1,this.label=``,this.aria=new M(this),this.baseId=`minerva-tabs-${++Ao}`,this.rovingKey=``,this.observer=null,this.settleQueued=!1,this.roving=new wa(this,()=>({getItems:()=>this.tabs,orientation:this.orientation,dir:ie(this),loop:!this.noLoop})),this.machine=new wi(this,ae(this.tabsProps()),()=>!1),this.handleKeyDownCapture=()=>this.ensureRoving(),this.handleFocusIn=e=>{let t=this.tabs.find(t=>t===e.target);t&&this.send({type:`FOCUS`,value:t.value,disabled:t.disabled})}}static{this.tagName=`minerva-tabs`}static{this.styles=[D,E`
:host{
display: block;
min-width: 0;
}
`,N(on)]}get tabs(){return Array.from(this.querySelectorAll(`minerva-tab`)).filter(e=>jo(e)===this)}get panels(){return Array.from(this.querySelectorAll(`minerva-tab-panel`)).filter(e=>jo(e)===this)}tabsProps(){return{value:this.value,activationMode:this.activationMode,onValueChange:e=>this.apply(e)}}send(e){this.machine.sync(this.tabsProps()),this.machine.send(e)}apply(e){this.emit(`minerva-change`,{value:e},{cancelable:!0})&&(this.value=e)}select(e){this.send({type:`SELECT`,value:e,disabled:!1})}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`value`,`disabled`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.rovingKey=``}updated(t){t.has(`value`)&&V&&this.value!==void 0&&this.tabs.length>0&&!this.tabs.some(e=>e.value===this.value)&&O(e.tagName,`value "${this.value}" does not match any <minerva-tab>.`),this.sync()}ensureRoving(){if(!this.tablist)return;let e=`${this.orientation}|${ie(this)}|${this.noLoop}`;e!==this.rovingKey&&(this.rovingKey=e,this.roving.detach(),this.roving.attach(this.tablist))}sync(){if(!this.tablist)return;let e=this.tabs,t=this.panels,n=new Map;for(let t of e)n.set(t,t.id||`${this.baseId}-tab-${t.value}`),t.id||L(t,`id`,n.get(t),this);for(let e of t)n.set(e,e.id||`${this.baseId}-panel-${e.value}`),e.id||L(e,`id`,n.get(e),this);for(let r of e){let e=t.find(e=>e.value===r.value);r.sync(this,r.value===this.value,e&&n.get(e))}for(let r of t){let t=e.find(e=>e.value===r.value);r.sync(this,r.value===this.value,t&&n.get(t))}let r=[this,...e,...t].find(Lr);if(r){this.settleQueued||(this.settleQueued=!0,pn(r,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.ensureRoving();let i=c(e,this.value);i?this.roving.setActive(i,{focus:!1}):this.roving.refresh()}hookStates(){return{orientation:this.orientation,variant:this.variant,color:this.color}}render(){return b`<div
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
</div>`}},H([S({reflect:!0})],Mo.prototype,`value`,void 0),H([S({reflect:!0})],Mo.prototype,`variant`,void 0),H([S({reflect:!0})],Mo.prototype,`color`,void 0),H([S({reflect:!0})],Mo.prototype,`orientation`,void 0),H([S({reflect:!0,attribute:`activation-mode`})],Mo.prototype,`activationMode`,void 0),H([S({type:Boolean,reflect:!0,attribute:`no-loop`})],Mo.prototype,`noLoop`,void 0),H([S()],Mo.prototype,`label`,void 0),H([C(`[role="tablist"]`)],Mo.prototype,`tablist`,void 0),No=class extends z{constructor(...e){super(...e),this.internals=sn(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.selected=!1,this.group=null,this.handleMouseDown=e=>{if(this.disabled){e.preventDefault();return}e.button===0&&!e.ctrlKey?this.select():e.preventDefault()},this.handleKeyDown=e=>{e.defaultPrevented||this.disabled||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),this.select())},this.handleClick=e=>{!this.disabled&&e.detail===0&&this.select()}}static{this.tagName=`minerva-tab`}static{this.styles=[D,E`
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
`,N(on)]}sync(e,t,n){this.group=e,this.selected=t,L(this,`aria-controls`,n??null),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.hasAttribute(`slot`)||L(this,`slot`,`tab`),Vn(this,this.internals,{role:`tab`},this.ownedAria),this.addEventListener(`mousedown`,this.handleMouseDown),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`mousedown`,this.handleMouseDown),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.group=null}select(){(this.group??jo(this))?.select(this.value)}updated(){Vn(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),L(this,`data-state`,this.selected?`active`:`inactive`),L(this,`data-disabled`,this.disabled);let e=this.group?.orientation??`horizontal`;L(this,`data-orientation`,e)}hookStates(){return{state:this.selected?`active`:`inactive`,disabled:this.disabled,orientation:this.group?.orientation??`horizontal`,variant:this.group?.variant??`line`,color:this.color}}render(){let e=this.group,t=e?.variant??`line`,n=e?.orientation===`vertical`;return b`<span
part="root"
class=${w({trigger:!0,[`${t}Trigger`]:!0,verticalTrigger:n,[this.color??``]:!!this.color,colored:!!this.color})}
data-state=${this.selected?`active`:`inactive`}
data-orientation=${e?.orientation??`horizontal`}
><slot></slot
></span>`}},H([S({reflect:!0})],No.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0})],No.prototype,`disabled`,void 0),H([S({reflect:!0})],No.prototype,`color`,void 0),H([S({type:Boolean,reflect:!0})],No.prototype,`selected`,void 0),Po=class extends z{constructor(...e){super(...e),this.internals=sn(this),this.value=``,this.forceMount=!1,this.orientation=`horizontal`,this.selected=!1,this.stamped=[]}static{this.tagName=`minerva-tab-panel`}static{this.styles=[D,E`
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
`,N(on)]}get template(){return Array.from(this.children).find(e=>e instanceof HTMLTemplateElement)??null}syncContent(){if(Lr(this))return;let e=this.template;if(this.selected||this.forceMount){if(e&&!this.stamped.length){let t=this.ownerDocument.importNode(e.content,!0);this.stamped=Array.from(t.childNodes),e.after(t)}return}for(let e of this.stamped)e.parentNode?.removeChild(e);this.stamped=[]}sync(e,t,n){this.orientation=e.orientation,this.selected=t,L(this,`hidden`,!t),this.syncContent(),L(this,`data-state`,t?`active`:`inactive`),L(this,`data-orientation`,e.orientation),L(this,`aria-labelledby`,n??null),this.requestUpdate()}willUpdate(e){e.has(`forceMount`)&&this.hasUpdated&&this.syncContent()}connectedCallback(){super.connectedCallback(),Vn(this,this.internals,{role:`tabpanel`}),this.hasAttribute(`tabindex`)||L(this,`tabindex`,`0`)}hookStates(){return{state:this.selected?`active`:`inactive`,orientation:this.orientation}}render(){return b`<div
part="root"
class="panel"
data-orientation=${this.orientation}
?hidden=${!this.selected&&Lr(this)&&!!jo(this)}
>
<slot></slot>
</div>`}},H([S({reflect:!0})],Po.prototype,`value`,void 0),H([S({type:Boolean,reflect:!0,attribute:`force-mount`})],Po.prototype,`forceMount`,void 0)})))()}var Io,J;function Lo(){return(Lo=e((()=>{A(),I(),B(),P(),R(),wn(),j(),Tn(),g(),_(),x(),ft(),gt(),Io=600,J=class e extends z{constructor(...e){super(...e),this.color=`neutral`,this.variant=`subtle`,this.size=`medium`,this.shape=`rounded`,this.closable=!1,this.clickable=!1,this.toggle=!1,this.loading=!1,this.elevation=!1,this.disabled=!1,this.noRipple=!1,this.ripples=[],this.nextRippleId=0,this.rippleTimers=new Set,this.locale=new F(this),this.aria=new M(this),this.slots=new nn(this)}static{this.tagName=`minerva-tag`}static{this.shadowRootOptions={...z.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,E`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
.closeIcon svg{
display: block;
}
`,N(bn)]}focus(e){(this.actionButton??this.closeButton)?.focus(e)}disconnectedCallback(){super.disconnectedCallback(),this.rippleTimers.forEach(clearTimeout),this.rippleTimers.clear(),this.ripples=[]}labelText(){return Array.from(this.childNodes).filter(e=>e.nodeType===3||e.nodeType===1&&!e.hasAttribute(`slot`)).map(e=>e.textContent??``).join(``).replace(/\s+/g,` `).trim()}get inactive(){return this.disabled||this.loading}handleClick(e){this.inactive||(this.addRipple(e),this.toggle&&(this.pressed=!this.pressed,this.emit(`minerva-change`,{pressed:this.pressed})))}handleClose(e){e.stopPropagation(),!this.disabled&&this.emit(`minerva-close`,{})}addRipple(e){if(this.noRipple)return;let t=e.currentTarget.parentElement;if(!t)return;let n=t.getBoundingClientRect(),r=e.detail===0,i=Math.max(n.width,n.height),a=i/2,o=this.nextRippleId++,s=r?n.width/2-a:e.clientX-n.left-a,c=r?n.height/2-a:e.clientY-n.top-a;this.ripples=[...this.ripples,{id:o,style:{width:`${i}px`,height:`${i}px`,left:`${s}px`,top:`${c}px`}}];let l=setTimeout(()=>{this.rippleTimers.delete(l),this.ripples=this.ripples.filter(e=>e.id!==o)},Io);this.rippleTimers.add(l)}hookStates(){return{state:this.clickable&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){V&&(this.toggle||this.pressed!==void 0)&&!this.clickable&&O(e.tagName,`pressed / toggle require clickable: the tag is not a button otherwise.`)}render(){let e=this.toggle||this.pressed!==void 0,t=this.closable?this.labelText():``,n=this.closeLabel??(t?this.locale.t(`tag.closeWithLabel`,{label:t}):this.locale.t(`tag.close`)),r=b`${this.loading?b`<span
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
<slot name="close-icon">${Dr}</slot>
</button>`:y}
${pt(this.ripples,e=>e.id,e=>b`<span class="ripple" style=${T(e.style)}></span>`)}
</div>`}},H([S({reflect:!0})],J.prototype,`color`,void 0),H([S({reflect:!0})],J.prototype,`variant`,void 0),H([S({reflect:!0})],J.prototype,`size`,void 0),H([S({reflect:!0})],J.prototype,`shape`,void 0),H([S({type:Boolean,reflect:!0})],J.prototype,`closable`,void 0),H([S({type:Boolean,reflect:!0})],J.prototype,`clickable`,void 0),H([S({type:Boolean,reflect:!0})],J.prototype,`pressed`,void 0),H([S({type:Boolean,reflect:!0})],J.prototype,`toggle`,void 0),H([S({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),H([S({type:Boolean,reflect:!0})],J.prototype,`elevation`,void 0),H([S({type:Boolean,reflect:!0})],J.prototype,`disabled`,void 0),H([S({attribute:`close-label`})],J.prototype,`closeLabel`,void 0),H([S({type:Boolean,attribute:`no-ripple`})],J.prototype,`noRipple`,void 0),H([v()],J.prototype,`ripples`,void 0),H([C(`.action`)],J.prototype,`actionButton`,void 0),H([C(`.closeIcon`)],J.prototype,`closeButton`,void 0)})))()}function Ro(e,t){try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>typeof e==`string`)}catch{}return V&&O(Vo,`the ${t} attribute is not a JSON array of strings.`),null}function zo(e,t){let n=(e??``).trim();return n?n.startsWith(`[`)?Ro(n,t)??[]:n.split(`,`).map(e=>e.trim()).filter(Boolean):[]}function Bo(e){let t=(e??``).trim();return t?t.startsWith(`[`)?Ro(t,`separators`)??[...Re]:t.split(/\s+/):[]}var Vo,Ho,Uo,Wo,Y;function Go(){return(Go=e((()=>{A(),I(),B(),P(),vn(),R(),j(),yr(),xi(),an(),Cn(),Tn(),_n(),g(),_(),x(),u(),m(),ht(),gt(),Vo=`minerva-tag-input`,Ho=`Enter`,Uo=[`\r
`,`
`,`\r`],Wo=0,Y=class extends k{constructor(...e){super(...e),this._value=[],this.defaultValue=[],this.options=[],this.separators=[...Re],this.noCommitOnBlur=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.draft=``,this.requestedOpen=!1,this.highlight=0,this.listId=`minerva-tag-input-list-${Wo++}`,this.locale=new F(this),this.aria=new M(this,()=>this.labels),this.floating=new yi(this,()=>({anchor:()=>this.combobox,floating:()=>this.list,branches:()=>[this],placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`exact`,onDismiss:()=>this.setOpen(!1)})),this.dirty=!1,this.composing=!1,this.navigating=!1,this.highlightKey=``}static{this.tagName=Vo}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,bi,E`
:host{
display: block;
min-width: 0;
}
`,N(bn),N(Yt),N(`.combobox { ${Pn.replace(/@charset[^;]*;/g,``)} }`),N(vr),E`

.combobox > .root{
flex-direction: row;
gap: 0;
}

.list{
inset: auto;
}
`]}get value(){return this._value}set value(e){this.dirty=!0,this.setValue(e)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}setValue(e){let t=this._value;this._value=Array.isArray(e)?e.map(String):typeof e==`string`?zo(e,`value`):[],this.requestUpdate(`value`,t)}get blocked(){return this.isDisabled||this.readOnly}get isOpen(){return this.requestedOpen&&!this.blocked}get filtered(){let e=this.value,t=this.draft.trim(),n=[...new Set(this.options.map(e=>e.trim()).filter(Boolean))].filter(t=>!e.includes(t)),r=n.map(e=>({tag:e,label:e,filterValue:e}));t&&!e.includes(t)&&!n.includes(t)&&r.unshift({tag:t,label:this.createLabel?this.createLabel(t):this.locale.t(`tagInput.create`,{tag:t}),filterValue:t});let i=t.toLowerCase();return i?r.filter(e=>e.filterValue.toLowerCase().includes(i)):r}get enterCommits(){return this.separators.includes(Ho)}get splitters(){return this.separators.filter(e=>e!==Ho&&e!==``)}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.value)e.append(this.name,t);return e}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.setValue([...this.defaultValue]),this.draft=``,this.requestedOpen=!1,this.navigating=!1}restoreFormState(e){e instanceof FormData?this.value=e.getAll(this.name).filter(e=>typeof e==`string`):typeof e==`string`&&(this.value=[e])}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&this.setValue([...this.defaultValue]),this.blocked&&(this.requestedOpen=!1);let t=`${this.filtered.length}\u0000${this.draft}`;if(t!==this.highlightKey&&(this.highlightKey=t,this.highlight=0),V&&e.has(`value`)){let e=new Set,t=this.value.find(t=>e.size===e.add(t).size);t!==void 0&&O(Vo,`value contains the tag "${t}" more than once: tags are unique (removing one removes its position only).`)}}updated(e){super.updated(e),this.floating.sync(this.isOpen),this.input?.toggleAttribute(Te,!this.isOpen&&this.draft!==``)}setOpen(e){e&&this.blocked||e!==this.requestedOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.requestedOpen=e)}setTags(e){this.value=e,this.emit(`minerva-change`,{value:[...e]})}setDraft(e){this.draft=e,this.input&&this.input.value!==e&&(this.input.value=e)}commitAll(e,t=``){if(this.blocked||this.composing)return;let n=this.value,r=[...n];for(let t of e){let e=t.trim();e&&!r.includes(e)&&r.push(e)}r.length!==n.length&&this.setTags(r),this.navigating=!1,this.setDraft(t)}commit(e){this.commitAll([e])}select(e){this.commit(e.tag),this.setOpen(!1)}removeAt(e){this.blocked||(this.setTags(this.value.filter((t,n)=>n!==e)),this.input?.focus())}handleInput(){let e=this.input.value;if(this.blocked){this.input.value=this.draft;return}this.navigating=!1;let t=this.splitters,n=this.composing||t.length===0?[e]:Ae(e,t);n.length>1?this.commitAll(n.slice(0,-1),n[n.length-1]):this.draft=e,this.setOpen(!0),this.emit(`minerva-input`,{value:this.draft})}handlePaste(e){if(this.blocked||this.composing)return;let t=e.clipboardData?.getData(`text`)??``,n=this.enterCommits?[...this.splitters,...Uo]:this.splitters;if(!n.some(e=>t.includes(e)))return;e.preventDefault();let r=this.draft,i=this.input.selectionStart??r.length,a=this.input.selectionEnd??r.length,o=r.slice(0,i)+t+r.slice(a);this.commitAll(Ae(o,n)),this.setOpen(!1)}handleKeyDown(e){if(this.blocked||this.composing||e.isComposing||e.keyCode===229)return;let t=this.filtered,n=t.length,r=this.isOpen,i=this.draft.trim(),a=this.value;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),this.navigating=!0,this.setOpen(!0),n>0){let t=e.key===`ArrowDown`?1:-1;this.highlight=(this.highlight+t+n)%n}break;case`Enter`:e.preventDefault(),this.enterCommits?!this.navigating&&(!i||a.includes(i))?this.commit(this.draft):r&&t[this.highlight]?this.select(t[this.highlight]):(this.commit(this.draft),this.setOpen(!1)):this.navigating&&r&&t[this.highlight]&&this.select(t[this.highlight]);break;case`Escape`:this.navigating=!1,this.setDraft(``),r&&!e.defaultPrevented&&(e.preventDefault(),this.setOpen(!1));break;case`Backspace`:this.draft===``&&a.length>0&&(e.preventDefault(),this.setTags(a.slice(0,-1)))}}handleFocus(){this.blocked||this.setOpen(!0)}handleBlur(){this.setOpen(!1),this.noCommitOnBlur||this.commit(this.draft)}clearAll(){this.setDraft(``),this.setTags([]),this.emit(`minerva-clear`),this.input?.focus()}renderTag(e,t){let n=this.isDisabled,r=this.removeLabel?this.removeLabel(e):this.locale.t(`tagInput.remove`,{tag:e});return b`<div
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
${Dr}
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
part=${xn(`option`,{highlighted:t===this.highlight})}
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
${sr}
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
${Dr}
</button>`}
</div>
</div>`}},H([S({attribute:!1})],Y.prototype,`value`,null),H([S({attribute:`value`,converter:{fromAttribute:e=>zo(e,`value`)}})],Y.prototype,`defaultValue`,void 0),H([S({converter:{fromAttribute:e=>zo(e,`options`)}})],Y.prototype,`options`,void 0),H([S({converter:{fromAttribute:Bo}})],Y.prototype,`separators`,void 0),H([S({type:Boolean,attribute:`no-commit-on-blur`})],Y.prototype,`noCommitOnBlur`,void 0),H([S()],Y.prototype,`placeholder`,void 0),H([S({reflect:!0})],Y.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],Y.prototype,`invalid`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],Y.prototype,`readOnly`,void 0),H([S({attribute:`empty-text`})],Y.prototype,`emptyText`,void 0),H([S({attribute:`add-label`})],Y.prototype,`addLabel`,void 0),H([S({attribute:`clear-label`})],Y.prototype,`clearLabel`,void 0),H([S({attribute:!1})],Y.prototype,`removeLabel`,void 0),H([S({attribute:!1})],Y.prototype,`createLabel`,void 0),H([v()],Y.prototype,`draft`,void 0),H([v()],Y.prototype,`requestedOpen`,void 0),H([v()],Y.prototype,`highlight`,void 0),H([C(`input.field`)],Y.prototype,`input`,void 0),H([C(`.combobox`)],Y.prototype,`combobox`,void 0),H([C(`.list`)],Y.prototype,`list`,void 0)})))()}var Ko;function qo(){return(qo=e((()=>{A(),I(),B(),R(),j(),nr(),Jt(),g(),_(),x(),m(),Ko=class e extends z{constructor(...e){super(...e),this.variant=`default`,this.aria=new M(this)}static{this.tagName=`minerva-text-link`}static{this.shadowRootOptions={...z.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,E`
:host{
display: inline;
}
:host([variant="action"]){
display: block;
}
:host([variant="subtle"]){
display: inline-flex;
}
`,N(xr)]}focus(e){this.anchor?.focus(e)}blur(){this.anchor?.blur()}click(){this.anchor?.click()}hookStates(){return{variant:this.variant}}updated(){V&&!this.href&&O(e.tagName,`href is missing: without it the link is not focusable nor announced as a link (use a button for actions).`)}render(){return b`<a
part="root"
class=${w({textLink:!0,[this.variant]:!0})}
href=${or(e.tagName,this.href)??y}
target=${this.target??y}
rel=${we(this.target,this.rel)??y}
download=${this.download??y}
hreflang=${this.hreflang??y}
aria-label=${this.aria.label??y}
aria-description=${this.aria.description??y}
aria-current=${this.aria.attr(`aria-current`)??y}
><slot></slot>${this.variant===`subtle`?gr:y}</a
>`}},H([S({reflect:!0})],Ko.prototype,`variant`,void 0),H([S()],Ko.prototype,`href`,void 0),H([S()],Ko.prototype,`target`,void 0),H([S()],Ko.prototype,`rel`,void 0),H([S()],Ko.prototype,`download`,void 0),H([S()],Ko.prototype,`hreflang`,void 0),H([C(`a`)],Ko.prototype,`anchor`,void 0)})))()}function Jo(){Xo=null}var Yo,Xo,Zo,Qo,$o,es,ts;function ns(){return(ns=e((()=>{I(),Rn(),P(),vn(),R(),j(),Sn(),g(),_(),u(),m(),Yo=`(prefers-color-scheme: dark)`,Xo=null,Zo=()=>typeof window<`u`&&window.matchMedia?.(Yo).matches?`dark`:`light`,Qo=(e,t)=>{typeof document<`u`&&(document.cookie=t===null?`${e}=; path=/; max-age=0; SameSite=Lax`:ce(e,t))},$o=class extends z{constructor(...e){super(...e),this.persist=!1,this.locale=new F(this),this.observer=null,this.media=null,this.onScheme=()=>this.onSystemChange()}static{this.styles=[D,E`
:host{
display: inline-flex;
vertical-align: middle;
}
`,N(tn)]}get config(){return un(this,`minerva-config`)}onSystemChange(){this.requestUpdate()}connectedCallback(){if(super.connectedCallback(),typeof MutationObserver<`u`){this.observer=new MutationObserver(()=>this.requestUpdate());let e=this.config;this.observer.observe(e??document.documentElement,{attributes:!0,attributeFilter:e?[`theme`,`palette`,`data-theme`]:[`data-theme`,`data-palette`]})}typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(Yo),this.media.addEventListener?.(`change`,this.onScheme))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.media?.removeEventListener?.(`change`,this.onScheme),this.media=null}renderGroup(e,t,n){return b`<div part="root" class="group" role="group" aria-label=${e}>
${t.map(e=>b`<button
type="button"
part=${xn(`item`,{state:e.active?`active`:`inactive`})}
class="item"
data-state=${e.active?`active`:`inactive`}
aria-pressed=${e.active?`true`:`false`}
@click=${()=>n(e.value)}
>
${e.text}
</button>`)}
</div>`}},H([S({type:Boolean,reflect:!0})],$o.prototype,`persist`,void 0),es=class extends $o{constructor(...e){super(...e),this.hideSystem=!1,this.select=e=>{e!==this.theme&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-theme-toggle`}get theme(){let e=this.config;if(e){let t=e.theme;return t===`github-dark`?`dark`:He(t)?t:null}if(Xo)return Xo;let t=this.persist?nt(document.cookie,fe):void 0;if(He(t))return t;let n=document.documentElement.getAttribute(`data-theme`);return He(n)?n:`system`}get resolvedTheme(){let e=this.config;if(e)return e.resolvedMode??Zo();let t=this.theme;return t===`light`||t===`dark`?t:Zo()}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist&&!Xo){let e=nt(document.cookie,fe);He(e)&&this.apply(e,!1)}}onSystemChange(){!this.config&&Xo===`system`&&this.apply(`system`,!1),super.onSystemChange()}apply(e,t=this.persist){let n=this.config;if(n){n.theme=e;return}Xo=e;let r=document.documentElement,i=e===`system`?Zo():e;r.setAttribute(`data-theme`,i),r.style.colorScheme=i,t&&Qo(`theme`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.theme,n=this.hideSystem?[`light`,`dark`]:[`light`,`dark`,`system`];return this.renderGroup(e(`themeToggle.label`,{theme:this.resolvedTheme}),n.map(n=>({value:n,text:this.labels?.[n]??e(`themeToggle.${n}`),active:t===n})),this.select)}},H([S({type:Boolean,reflect:!0,attribute:`hide-system`})],es.prototype,`hideSystem`,void 0),H([S({attribute:!1})],es.prototype,`labels`,void 0),ts=class e extends $o{constructor(...e){super(...e),this.palettes=[...Pe],this.showDefault=!1,this.select=e=>{e!==this.palette&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-palette-toggle`}get palette(){let e=this.config,t=e?e.palette:document.documentElement.getAttribute(`data-palette`);return i(t)?t:null}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist){let e=nt(document.cookie,ee);i(e)&&!this.palette&&this.apply(e,!1)}}willUpdate(){if(V){let t=(this.palettes??[]).filter(e=>!i(e));t.length&&O(e.tagName,`unknown palette(s) ${t.join(`, `)}: use ${Pe.join(`, `)}.`)}}apply(e,t=this.persist){let n=this.config;if(n){n.palette=e??void 0;return}let r=document.documentElement;e?r.setAttribute(`data-palette`,e):r.removeAttribute(`data-palette`),t&&Qo(`palette`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.palette,n=this.showDefault?[null,...this.palettes.filter(i)]:this.palettes.filter(i);return this.renderGroup(e(`paletteToggle.label`,{palette:t??e(`paletteToggle.default`)}),n.map(n=>{let r=n??`default`;return{value:n,text:this.labels?.[r]??e(`paletteToggle.${r}`),active:t===n}}),this.select)}},H([S({converter:{fromAttribute:e=>(e??``).split(/[\s,]+/).filter(Boolean),toAttribute:e=>e.join(` `)}})],ts.prototype,`palettes`,void 0),H([S({type:Boolean,reflect:!0,attribute:`show-default`})],ts.prototype,`showDefault`,void 0),H([S({attribute:!1})],ts.prototype,`labels`,void 0)})))()}var rs,X;function is(){return(is=e((()=>{A(),I(),B(),P(),vn(),R(),j(),yr(),xi(),an(),Cn(),rn(),qr(),g(),_(),x(),u(),m(),ht(),rs=(e,t,n=0,r=()=>!1)=>{let i=[];for(let a=n;a<n+e;a+=Math.max(1,t))i.push({value:a,disabled:r(a),label:String(a).padStart(2,`0`)});return i},X=class e extends k{constructor(...e){super(...e),this.name=`time-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.format=`HH:mm:ss`,this.use12Hours=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.hideSecond=!1,this.hourStep=1,this.minuteStep=1,this.secondStep=1,this.draft=null,this.locale=new F(this),this.aria=new M(this,()=>this.labels),this.floating=new yi(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.dirty=!1,this.focusPanelOnOpen=!1}static{this.tagName=`minerva-time-picker`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[D,bi,E`
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
`,N(Pn),N(Yt),N(Nn),N(en)]}get valueAsDate(){return We(this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get effectiveFormat(){return xe(this.format,!this.hideSecond)}get withSeconds(){return ke(this.effectiveFormat)}get interactive(){return!this.isDisabled&&!this.readOnly}getFormValue(){let e=this.valueAsDate;return e?Ce(e,this.withSeconds):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),V&&this.checkUsage(e)}checkUsage(t){let n=e.tagName;if(t.has(`value`)&&this.value&&!We(this.value)&&O(n,`value "${this.value}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`),t.has(`minTime`)||t.has(`maxTime`)){for(let[e,t]of[[`min-time`,this.minTime],[`max-time`,this.maxTime]])t&&!We(t)&&O(n,`${e} "${t}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`);let e=We(this.minTime),t=We(this.maxTime);e&&t&&Ye(e)>Ye(t)&&O(n,`min-time (${this.minTime}) is later than max-time (${this.maxTime}): no time can be selected.`)}}updated(e){super.updated(e);let t=this.open&&this.interactive;if(this.floating.sync(t),!t){this.focusPanelOnOpen=!1;return}(e.has(`open`)||e.has(`disabled`))&&(this.popup?.querySelectorAll(`[aria-selected="true"]`).forEach(e=>e.scrollIntoView?.({block:`nearest`})),this.focusPanelOnOpen&&this.focusFirstColumn())}focusFirstColumn(){this.popup?.querySelector(`[role="option"][tabindex="0"]`)?.focus()}requestOpenChange(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){this.value=e?Ce(e,this.withSeconds):``,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleTimeChange(e,t){let n=new Date(this.valueAsDate??Oe());if(e===`hour`)n.setHours(t);else if(e===`minute`)n.setMinutes(t);else if(e===`second`)n.setSeconds(t);else{let e=n.getHours()%12;n.setHours(t===1?e+12:e)}this.draft=null,this.commit(n)}handleInput(e){let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t});let n=Je(t,this.effectiveFormat,{strict:!0,base:this.valueAsDate??void 0});n&&this.commit(n)}handleBlur(){let e=this.draft;if(e===null)return;let t=this.valueAsDate;if(e.trim()===``)t&&this.commit(null);else{let n=Je(e,this.effectiveFormat,{strict:!1,base:t??void 0});n&&n.getTime()!==t?.getTime()&&this.commit(n)}this.draft=null}handleClear(){this.draft=null,this.commit(null),this.emit(`minerva-clear`),this.input?.focus()}handleInputClick(){this.interactive&&(this.focusPanelOnOpen=!1,this.requestOpenChange(!this.open))}handleInputKeyDown(e){e.key===`ArrowDown`&&(e.preventDefault(),this.interactive&&(this.open?this.focusFirstColumn():(this.focusPanelOnOpen=!0,this.requestOpenChange(!0)||(this.focusPanelOnOpen=!1))))}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=Ke(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=Ke(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{oe(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!oe(this,e))??null}handleColumnKeyDown(e,t){let n=e.currentTarget,r=e.target,i=Array.from(n.querySelectorAll(`[role="option"]`)).filter(e=>e.getAttribute(`aria-disabled`)!==`true`),a=i.indexOf(r),o=this.popup?.querySelectorAll(`[role="listbox"]`),s=o?.length??0,c=e=>o?.[e]?.querySelector(`[tabindex="0"]`)?.focus();switch(f(e.key,this)){case`ArrowDown`:e.preventDefault(),i[Math.min(i.length-1,a+1)]?.focus();break;case`ArrowUp`:e.preventDefault(),i[Math.max(0,a-1)]?.focus();break;case`Home`:e.preventDefault(),i[0]?.focus();break;case`End`:e.preventDefault(),i[i.length-1]?.focus();break;case`ArrowRight`:e.preventDefault(),c(Math.min(s-1,t+1));break;case`ArrowLeft`:e.preventDefault(),c(Math.max(0,t-1))}}pick(e,t){t.disabled||this.handleTimeChange(e.kind,e.toValue(t.value))}columns(e){let{t}=this.locale,n=this.use12Hours,r=We(this.minTime),i=We(this.maxTime),a=e.getHours(),o=e.getMinutes(),s=e.getSeconds(),c=a>=12,l=e=>n?e%12+(c?12:0):e,u=rs(n?12:24,this.hourStep,+!!n,e=>{let t=l(e);return!!(r&&t<r.getHours()||i&&t>i.getHours())}),d=rs(60,this.minuteStep,0,e=>!!(r&&a===r.getHours()&&e<r.getMinutes()||i&&a===i.getHours()&&e>i.getMinutes())),f=rs(60,this.secondStep,0,e=>{let t=r&&a===r.getHours()&&o===r.getMinutes(),n=i&&a===i.getHours()&&o===i.getMinutes();return!!(t&&e<r.getSeconds()||n&&e>i.getSeconds())}),p=[{kind:`hour`,label:t(`timePicker.hours`),items:u,selected:n?a%12||12:a,toValue:l},{kind:`minute`,label:t(`timePicker.minutes`),items:d,selected:o,toValue:e=>e}];return this.withSeconds&&p.push({kind:`second`,label:t(`timePicker.seconds`),items:f,selected:s,toValue:e=>e}),n&&p.push({kind:`ampm`,label:t(`timePicker.period`),items:[{value:0,label:`AM`,disabled:!1},{value:1,label:`PM`,disabled:!1}],selected:+!!c,toValue:e=>e}),p}renderPanel(e,t){let n=e!==null,r=this.columns(e??Oe());return b`<div
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
part=${xn(`item`,{selected:r,disabled:t.disabled})}
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
</div>`}hookStates(){let e=this.open&&!this.isDisabled&&!this.readOnly,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?Se(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size,side:n,align:r,placement:t}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`timePicker.label`),a=this.draft??(r?me(r,this.effectiveFormat):``),o=!this.hideClearButton&&!!r&&!t&&!n;return b`<div part="root" class="timePicker">
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
${Dr}
</button>`:b`<span part="icon" class="clockIcon" aria-hidden="true"
>${wr}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(r,i):y}`}},H([S({reflect:!0})],X.prototype,`name`,void 0),H([S({attribute:!1})],X.prototype,`value`,void 0),H([S({attribute:`value`})],X.prototype,`defaultValue`,void 0),H([S({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),H([S({reflect:!0})],X.prototype,`format`,void 0),H([S({type:Boolean,reflect:!0,attribute:`use-12-hours`})],X.prototype,`use12Hours`,void 0),H([S()],X.prototype,`placeholder`,void 0),H([S()],X.prototype,`label`,void 0),H([S({reflect:!0})],X.prototype,`size`,void 0),H([S({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),H([S({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),H([S({type:Boolean,reflect:!0,attribute:`hide-clear-button`})],X.prototype,`hideClearButton`,void 0),H([S({type:Boolean,reflect:!0,attribute:`hide-second`})],X.prototype,`hideSecond`,void 0),H([S({attribute:`min-time`})],X.prototype,`minTime`,void 0),H([S({attribute:`max-time`})],X.prototype,`maxTime`,void 0),H([S({type:Number,attribute:`hour-step`})],X.prototype,`hourStep`,void 0),H([S({type:Number,attribute:`minute-step`})],X.prototype,`minuteStep`,void 0),H([S({type:Number,attribute:`second-step`})],X.prototype,`secondStep`,void 0),H([v()],X.prototype,`draft`,void 0),H([C(`input`)],X.prototype,`input`,void 0),H([C(`.timePicker`)],X.prototype,`field`,void 0),H([C(`.popup`)],X.prototype,`popup`,void 0)})))()}function as(e){if(e===void 0)return;if(typeof e!=`string`)return e;if(!ls())return;let t=document.getElementById(e)??void 0;return V&&!t&&O(`minerva-toast-region`,`toast(): no element with id "${e}"; the toast is shown in the default region.`),t}var os,ss,cs,ls,us,ds,fs,ps,ms,hs;function gs(){return(gs=e((()=>{I(),m(),os=4e3,ss=200,cs=`minerva-toast-region`,ls=()=>typeof window<`u`&&typeof document<`u`,us=class{constructor(e={}){this.subscribe=e=>this.queue.subscribe(t=>e(t.toasts)),this.subscribeLifecycle=e=>this.queue.subscribeLifecycle(e),this.getSnapshot=()=>this.queue.getState().toasts,this.queue=it({isClient:e.isClient??ls,defaultDuration:os,exitDuration:200})}push(e,t){return this.queue.add(e,{region:t})}update(e,t){this.queue.update(e,t)}dismiss(e,t=`dismiss`){this.queue.dismiss(e,t)}dismissAll(){this.queue.dismissAll()}pause(e){this.queue.pause(e)}resume(e){this.queue.resume(e)}peek(){return this.getSnapshot()}reset(){this.queue.reset()}},ds=new us,fs=`data-minerva-auto`,ps=new class{constructor(){this.regions=[],this.listeners=new Set,this.autoPending=!1,this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)})}changed(){for(let e of[...this.listeners])e()}ordered(){return this.regions.slice().sort((e,t)=>{let n=e.compareDocumentPosition(t);return n&Node.DOCUMENT_POSITION_DISCONNECTED?0:n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}get owner(){return this.ordered()[0]??null}register(e){if(!this.regions.includes(e)){if(this.regions.push(e),!e.hasAttribute(`data-minerva-auto`))for(let e of this.regions.filter(e=>e.hasAttribute(fs)))e.remove();this.changed()}}unregister(e){let t=this.regions.indexOf(e);t<0||(this.regions.splice(t,1),this.changed())}regionOf(e){let t=e.region;return t&&this.regions.includes(t)?t:this.owner}ensureRegion(){this.autoPending||this.regions.length>0||!ls()||(this.autoPending=!0,queueMicrotask(()=>{if(this.autoPending=!1,this.regions.length>0||!document.body||!ds.getSnapshot().length)return;let e=document.createElement(`minerva-toast-region`);e.setAttribute(`data-minerva-auto`,``),document.body.append(e)}))}},ms=(e,t)=>{let n=n=>{V&&!ls()&&O(`minerva-toast-region`,`toast() called without a document (server side): the toast is ignored.`);let{region:r,...i}=n,a=as(r??t),o=e.push(i,a);return ls()&&ps.ensureRegion(),o},r=(e=>n(e));return r.info=(e,t)=>n({...t,title:e,color:`info`}),r.success=(e,t)=>n({...t,title:e,color:`success`}),r.warning=(e,t)=>n({...t,title:e,color:`warning`}),r.danger=(e,t)=>n({...t,title:e,color:`danger`}),r.loading=(e,t)=>n({...t,title:e,loading:!0}),r.promise=(e,t,r)=>{let i=n({...r,title:t.loading,loading:!0,duration:0}),a=(e,t)=>n({...r,id:i,title:t,color:e,loading:!1});return e.then(e=>a(`success`,typeof t.success==`function`?t.success(e):t.success),e=>a(`danger`,typeof t.error==`function`?t.error(e):t.error)),e},r.update=(t,n)=>{let{region:r,...i}=n;e.update(t,i)},r.dismiss=t=>t===void 0?e.dismissAll():e.dismiss(t),r.region=t=>ms(e,t),r},hs=ms(ds)})))()}var _s,vs,ys,bs,xs,Ss,Cs,ws,Ts;function Es(){return(Es=e((()=>{A(),I(),B(),Rn(),P(),vn(),R(),j(),xi(),$n(),gs(),g(),_(),x(),ft(),u(),m(),gt(),_s={info:On,success:Zn,warning:Zr,danger:er},vs=[`top-right`,`top-left`,`top-center`,`bottom-right`,`bottom-left`,`bottom-center`],ys=[`F8`],bs=`:scope > [part~="toast--open"]`,xs=`:scope > [part~="close-button"]`,Ss={fromAttribute:e=>e===null?ys:e.split(/[\s,+]+/).map(e=>e.trim()).filter(Boolean)},Cs=0,ws=e=>{for(let t of ps.ordered())if(t instanceof Ts&&t.handleHotkey(e))return},Ts=class extends z{constructor(...e){super(...e),this.position=`top-right`,this.max=1/0,this.noPauseOnHover=!1,this.hotkey=ys,this.items=[],this.locale=new F(this),this.aria=new M(this),this.cleanups=[],this.returnFocus=null,this.refresh=()=>{if(!this.isConnected)return;let e=new Set,t=[],n=ds.getSnapshot();for(let r=n.length-1;r>=0;--r){let i=n[r];e.has(i.id)||ps.regionOf(i)!==this||(e.add(i.id),t.unshift(i))}let r=_e(t,this.max);if(r.length>0){for(let e of r)ds.dismiss(e.id,`overflow`);return}let i=new Set(this.items.map(e=>e.id)),a=t.some(e=>!i.has(e.id));this.items=t,a&&this.raise()},this.raise=()=>{let e=this.viewport;e&&!oe(e,Ie())&&($r(e),$t(e))},this.onLifecycle=e=>{ps.regionOf(e.item)===this&&(e.type===`close`?this.emit(`minerva-close`,{id:e.item.id,reason:e.reason}):this.emit(`minerva-after-close`,{id:e.item.id}))},this.onViewportFocusIn=e=>{let t=e.relatedTarget,n=e.currentTarget;t&&!oe(n,t)&&(this.returnFocus=t)},this.onViewportFocusOut=e=>{let t=e.currentTarget;oe(t,e.relatedTarget)||t.removeAttribute(`tabindex`)}}static{this.tagName=cs}static{this.styles=[D,bi,E`
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
`,N(Xr)]}get toast(){return this.boundApi??=ms(ds,this),this.boundApi}connectedCallback(){super.connectedCallback(),this.cleanups=[ds.subscribe(()=>this.refresh()),ps.subscribe(()=>this.refresh()),ds.subscribeLifecycle(this.onLifecycle)];let e=this.ownerDocument;e.addEventListener(`minerva-after-open`,this.raise),this.cleanups.push(()=>e.removeEventListener(`minerva-after-open`,this.raise)),Cs++===0&&e.addEventListener(`keydown`,ws),this.cleanups.push(()=>{--Cs===0&&e.removeEventListener(`keydown`,ws)}),ps.register(this),this.refresh(),this.hasUpdated&&$t(this.viewport)}disconnectedCallback(){super.disconnectedCallback();for(let e of this.cleanups)e();this.cleanups=[],ps.unregister(this),$r(this.viewport)}handleHotkey(e){let t=this.viewport;if(!t||!Le(e,this.hotkey)||!t.querySelector(bs))return!1;e.preventDefault();let n=Ie();return n&&n!==this.ownerDocument.body&&!oe(t,n)&&(this.returnFocus=n),t.setAttribute(`tabindex`,`-1`),r(t),!0}focus(e){let t=this.viewport;t&&(t.setAttribute(`tabindex`,`-1`),t.focus(e))}willUpdate(e){V&&e.has(`position`)&&!vs.includes(this.position)&&O(`minerva-toast-region`,`invalid position "${this.position}" (expected ${vs.join(` | `)}).`)}firstUpdated(){$t(this.viewport)}updated(e){e.has(`max`)&&e.get(`max`)!==void 0&&queueMicrotask(()=>this.refresh())}moveFocusFrom(e){let t=this.viewport;if(!t)return;let n=Array.from(t.querySelectorAll(bs)).filter(t=>t!==e),i=n.find(t=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??n[n.length-1];if(i){let e=i.querySelector(xs)??Ke(i)[0];if(r(e))return}let a=this.returnFocus;a?.isConnected&&!oe(t,a)&&r(a)||r(Qe(this))||(t.setAttribute(`tabindex`,`-1`),r(t,{preventScroll:!0}))}close(e,t,n){oe(t,Ie())&&this.moveFocusFrom(t),ds.dismiss(e.id,n)}pause(e){this.noPauseOnHover||ds.pause(e.id)}resume(e){this.noPauseOnHover||ds.resume(e.id)}renderIcon(e){if(e.icon===null)return y;let t=e.icon===void 0?e.loading?b`<div class="progressIndicator current" aria-hidden="true">
<span class="spinner small">${Bn}</span>
</div>`:_s[e.color]:e.icon;return b`<span class="icon" part="icon" aria-hidden="true"
>${t}</span
>`}renderItem(e){let t=e.state===`closing`,n=e=>e.currentTarget.closest(`.toast`),r={state:t?`closed`:`open`,color:e.color,loading:e.loading};return b`<div
part=${xn(`toast`,r)}
class=${w({toast:!0,[e.color]:!0})}
data-state=${r.state}
role=${e.color===`danger`&&!e.loading?`alert`:`status`}
style=${T(e.duration>0?{"--toast-duration":`${e.duration}ms`}:{})}
@mouseenter=${()=>this.pause(e)}
@mouseleave=${()=>this.resume(e)}
@focusin=${()=>this.pause(e)}
@focusout=${t=>{oe(n(t),t.relatedTarget)||this.resume(e)}}
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
${Dr}
</button>`:y}
${e.duration>0&&!t?b`<span
class="progress"
part="progress"
aria-hidden="true"
></span>`:y}
</div>`}render(){let e=Ge(this.hotkey),t=this.aria.label??(e?this.locale.t(`toast.regionWithHotkey`,{hotkey:e}):this.locale.t(`toast.region`)),n=vs.includes(this.position)?this.position:`top-right`;return b`<div
part="root"
class=${w({viewport:!0,[n]:!0})}
popover="manual"
role="region"
aria-label=${t}
dir=${ie(this)}
@focusin=${this.onViewportFocusIn}
@focusout=${this.onViewportFocusOut}
>
${pt(this.items,e=>e.id,e=>this.renderItem(e))}
</div>`}},H([S({reflect:!0})],Ts.prototype,`position`,void 0),H([S({type:Number})],Ts.prototype,`max`,void 0),H([S({type:Boolean,attribute:`no-pause-on-hover`})],Ts.prototype,`noPauseOnHover`,void 0),H([S({attribute:`close-label`})],Ts.prototype,`closeLabel`,void 0),H([S({attribute:`hotkey`,converter:Ss})],Ts.prototype,`hotkey`,void 0),H([v()],Ts.prototype,`items`,void 0),H([C(`.viewport`)],Ts.prototype,`viewport`,void 0)})))()}var Ds,Os,ks,As,js,Ms,Z;function Ns(){return(Ns=e((()=>{A(),I(),Rn(),R(),j(),xi(),yn(),g(),_(),x(),u(),Ds=6,Os=300,ks=200,As=0,js={fromAttribute(e){if(!e)return;let t=e.trim().split(/[\s,]+/).map(Number);return t.length===2&&t.every(Number.isFinite)?[t[0],t[1]]:void 0},toAttribute(e){return e?e.join(` `):null}},Ms=class extends z{constructor(...e){super(...e),this.skipDelay=300,this.lastClosedAt=0}static{this.tagName=`minerva-tooltip-provider`}static{this.styles=[D,E`
:host{
display: contents;
}
`]}markClosed(){this.lastClosedAt=Date.now()}shouldSkipDelay(){return Date.now()-this.lastClosedAt<this.skipDelay}render(){return b`<slot></slot>`}},H([S({type:Number,attribute:`enter-delay`})],Ms.prototype,`enterDelay`,void 0),H([S({type:Number,attribute:`leave-delay`})],Ms.prototype,`leaveDelay`,void 0),H([S({type:Number,attribute:`skip-delay`})],Ms.prototype,`skipDelay`,void 0),Z=class e extends z{constructor(...e){super(...e),this.content=``,this.open=!1,this.placement=`top`,this.color=`neutral`,this.variant=`solid`,this.shape=`default`,this.animation=`fade`,this.arrow=!1,this.disabled=!1,this.followCursor=!1,this.positioned=!1,this.aria=new M(this),this.grace=Ne({timeout:0}),this.cursor=null,this.described=null,this.describedPrev=null,this.floating=new yi(this,()=>{let e=this.placement,t=e.startsWith(`top`)||e.startsWith(`bottom`),n=this.arrow?Ds:0,r=this.offset;return{placement:e,offset:r?{mainAxis:(t?r[1]:r[0])+n,crossAxis:t?r[0]:r[1]}:{mainAxis:8+n},arrowElement:this.arrow?this.arrowEl:null,autoUpdate:this.followCursor?{animationFrame:!0}:void 0,anchor:()=>this.anchor(),floating:()=>this.panel,branches:()=>[this.wrapper],dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,focusable:!1,onDismiss:()=>{this.clearTimers(),this.requestOpen(!1)},onPosition:e=>this.handlePosition(e)}}),this.handleMouseEnter=e=>{if(this.disabled)return;this.followCursor&&(this.cursor={x:e.clientX,y:e.clientY}),this.clearTimers();let t=this.resolvedEnterDelay;if(t<=0||this.provider()?.shouldSkipDelay()){this.requestOpen(!0);return}this.enterTimer=setTimeout(()=>this.requestOpen(!0),t)},this.handleMouseLeave=e=>{if(this.disabled)return;this.clearTimers();let t=this.panel?.getBoundingClientRect();if(this.open&&!this.followCursor&&t&&t.width>0&&t.height>0){this.grace.start({x:e.clientX,y:e.clientY},t,Se(this.currentPlacement).side),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),Math.max(this.resolvedLeaveDelay,Os));return}this.scheduleHide()},this.handlePanelMouseEnter=()=>{this.disabled||this.clearTimers()},this.handlePanelMouseLeave=()=>{this.disabled||this.followCursor||this.scheduleHide()},this.handleDocumentPointerMove=e=>{if(!this.grace.getArea())return;let t=e.composedPath();this.wrapper&&t.includes(this.wrapper)||this.panel&&t.includes(this.panel)||this.grace.isInGraceArea({x:e.clientX,y:e.clientY})||(this.grace.clear(),this.scheduleHide())},this.handleDocumentMouseMove=e=>{this.cursor={x:e.clientX,y:e.clientY}},this.handleFocusIn=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!0))},this.handleFocusOut=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!1))},this.listening=!1,this.handleSlotChange=()=>this.requestUpdate()}static{this.tagName=`minerva-tooltip`}static{this.styles=[D,bi,E`
:host{
display: inline-flex;
}
`,N(br)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}get currentPlacement(){return this.positioned?this.floating.position.placement:this.placement}get visible(){return this.open&&!this.disabled}provider(){let e=un(this,`minerva-tooltip-provider`);return e instanceof Ms?e:null}get resolvedEnterDelay(){return this.enterDelay??this.provider()?.enterDelay??ks}get resolvedLeaveDelay(){return this.leaveDelay??this.provider()?.leaveDelay??As}triggerElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}get text(){return this.aria.label||(this.content.trim()?this.content.trim():Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`content`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `))}anchor(){return this.followCursor&&this.cursor?{getBoundingClientRect:()=>{let{x:e,y:t}=this.cursor??{x:0,y:0};return DOMRect.fromRect({x:e,y:t,width:0,height:0})}}:this.wrapper}requestOpen(e){e!==this.open&&(e||this.provider()?.markClosed(),this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.grace.clear()}scheduleHide(){clearTimeout(this.leaveTimer),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),this.resolvedLeaveDelay)}handlePosition(e){let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`),this.positioned||=!0}inPanel(e){return!!this.panel&&e.composedPath().includes(this.panel)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`focusout`,this.handleFocusOut),this.listenDocument(!1),clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.restoreDescription()}listenDocument(e){e!==this.listening&&(this.listening=e,e?(document.addEventListener(`pointermove`,this.handleDocumentPointerMove),document.addEventListener(`mousemove`,this.handleDocumentMouseMove)):(document.removeEventListener(`pointermove`,this.handleDocumentPointerMove),document.removeEventListener(`mousemove`,this.handleDocumentMouseMove)))}firstUpdated(){V&&setTimeout(()=>this.checkUsage())}checkUsage(){if(!this.isConnected)return;this.text||O(e.tagName,`has no content: set the "content" attribute, aria-label or slot="content".`);let t=this.triggerElement();!this.disabled&&t&&Ke(t,{includeContainer:!0}).length===0&&O(e.tagName,`the trigger is not focusable, so keyboard users cannot reach the tooltip; wrap a button / link or add tabindex="0".`)}willUpdate(e){(e.has(`open`)||e.has(`disabled`))&&(!this.open||this.disabled)&&(this.positioned=!1,this.grace.clear())}updated(){let e=this.visible;this.floating.sync(e),this.listenDocument(e),this.syncDescription(e)}syncDescription(e){let t=e?this.text:``,n=t?this.triggerElement():null;if(this.described&&this.described!==n&&this.restoreDescription(),!n)return;this.described!==n&&(this.described=n,this.describedPrev=n.getAttribute(`aria-description`));let r=this.describedPrev?`${this.describedPrev} ${t}`:t;n.getAttribute(`aria-description`)!==r&&n.setAttribute(`aria-description`,r)}restoreDescription(){let e=this.described;e&&(this.describedPrev===null?e.removeAttribute(`aria-description`):e.setAttribute(`aria-description`,this.describedPrev),this.described=null,this.describedPrev=null)}hookStates(){let e=this.currentPlacement;return{state:this.visible?`open`:`closed`,disabled:this.disabled,color:this.color,variant:this.variant,shape:this.shape,...Se(e),placement:e}}render(){let e=this.visible,t=this.currentPlacement,n=e&&!this.triggerElement();return b`<div
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
dir=${ie(this)}
aria-label=${this.aria.label??y}
data-placement=${t}
class=${w({tooltip:!0,[this.color]:!0,[this.variant]:!0,[this.shape]:!0,[`animation-${this.animation}`]:!0,followCursor:this.followCursor,arrow:this.arrow,show:this.positioned})}
@mouseenter=${this.handlePanelMouseEnter}
@mouseleave=${this.handlePanelMouseLeave}
>
<slot name="content" @slotchange=${this.handleSlotChange}
>${this.content}</slot
>${this.arrow?b`<div class="tooltipArrow" part="arrow"></div>`:y}
</div>`:y}`}},H([S()],Z.prototype,`content`,void 0),H([S({type:Boolean,reflect:!0})],Z.prototype,`open`,void 0),H([S({reflect:!0})],Z.prototype,`placement`,void 0),H([S({reflect:!0})],Z.prototype,`color`,void 0),H([S({reflect:!0})],Z.prototype,`variant`,void 0),H([S({reflect:!0})],Z.prototype,`shape`,void 0),H([S({reflect:!0})],Z.prototype,`animation`,void 0),H([S({type:Boolean,reflect:!0})],Z.prototype,`arrow`,void 0),H([S({type:Boolean,reflect:!0})],Z.prototype,`disabled`,void 0),H([S({type:Number,attribute:`enter-delay`})],Z.prototype,`enterDelay`,void 0),H([S({type:Number,attribute:`leave-delay`})],Z.prototype,`leaveDelay`,void 0),H([S({converter:js})],Z.prototype,`offset`,void 0),H([S({type:Boolean,reflect:!0,attribute:`follow-cursor`})],Z.prototype,`followCursor`,void 0),H([C(`.tooltipTrigger`)],Z.prototype,`wrapper`,void 0),H([C(`[part=content]`)],Z.prototype,`panel`,void 0),H([C(`.tooltipArrow`)],Z.prototype,`arrowEl`,void 0),H([v()],Z.prototype,`positioned`,void 0)})))()}var Ps,Fs;function Is(){return(Is=e((()=>{A(),I(),B(),P(),vn(),R(),j(),yr(),Cn(),fi(),Kr(),g(),_(),x(),m(),gt(),Ps=0,Fs=class e extends k{constructor(...e){super(...e),this.label=``,this.items=[],this.accept=`*`,this.multiple=!1,this.replace=!1,this.loading=!1,this.removable=!1,this.retryable=!1,this.error=``,this.dragging=!1,this.uploadId=`upload-${Ps++}`,this.nextId=0,this.pendingRemoval=null,this.locale=new F(this),this.aria=new M(this,()=>this.labels)}static{this.tagName=`minerva-upload`}static{this.dependencies=[ei]}static{this.styles=[D,E`
:host{
display: block;
min-width: 0;
}
`,N(Yt),N(Xn),E`

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
`]}get files(){return this.items.flatMap(e=>e.file?[e.file]:[])}get resolvedMaxCount(){return this.maxCount??(this.multiple?50:1)}get existingCount(){return this.replace&&!this.multiple?0:this.items.length}get blocked(){return this.isDisabled||this.loading||this.existingCount>=this.resolvedMaxCount}focus(e){this.renderRoot.querySelector(`[part=select-button]`)?.focus(e)}showPicker(){this.blocked||this.input?.click()}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.files)e.append(this.name,t);return e}getValidity(){return this.required&&this.files.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.fileMissing`),anchor:this.renderRoot.querySelector(`[part=select-button]`)??null}:{flags:{},message:``}}resetFormValue(){this.items=[],this.error=``}restoreFormState(e){e instanceof FormData&&(this.items=e.getAll(this.name).filter(e=>e instanceof File).map(e=>this.toItem(e)))}willUpdate(t){V&&(t.has(`maxCount`)||t.has(`multiple`))&&!this.multiple&&this.maxCount!==void 0&&this.maxCount>1&&O(e.tagName,`max-count (${this.maxCount}) has no effect without multiple: one file is picked at a time.`)}updated(e){super.updated(e);let t=this.pendingRemoval;if(!t||this.items.some(e=>e.id===t.id))return;this.pendingRemoval=null;let n=t.nextId?Array.from(this.renderRoot.querySelectorAll(`[data-item-id]`)).find(e=>e.dataset.itemId===t.nextId)?.querySelector(`[part=remove-button]`):null;n?n.focus():this.focus()}toItem(e){return{id:`${this.uploadId}-${this.nextId++}`,name:e.name,status:`done`,file:e}}select(e){if(this.blocked||e.length===0)return;let{t}=this.locale,n=this.texts,r=this.resolvedMaxCount;if(!this.multiple&&e.length>1||e.length+this.existingCount>r){this.error=n?.tooMany?.(r)??t(`upload.tooMany`,{count:r});return}let i=e.find(e=>!he(e,this.accept));if(i){this.error=n?.invalidType?.(i.name)??t(`upload.invalidType`,{name:i.name});return}let a=this.maxSize,o=a===void 0?void 0:e.find(e=>e.size>a);if(o){this.error=n?.tooLarge?.(o.name)??t(`upload.tooLarge`,{name:o.name});return}if(this.error=``,!this.emit(`minerva-files-selected`,{files:e},{cancelable:!0}))return;let s=e.map(e=>this.toItem(e));this.items=this.replace&&!this.multiple?s:[...this.items,...s],this.notifyChange()}notifyChange(){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.items})}removeItem(e){if(this.isDisabled)return;let t=this.items.indexOf(e),n=this.items[t+1]??this.items[t-1];this.pendingRemoval={id:e.id,nextId:n?.id},this.emit(`minerva-remove`,{item:e},{cancelable:!0})&&(this.items=this.items.filter(t=>t!==e),this.notifyChange())}retry(e){this.isDisabled||this.loading||this.emit(`minerva-retry`,{item:e})}handleInputChange(){let e=Array.from(this.input.files??[]);this.input.value=``,this.select(e)}handleDragOver(e){e.preventDefault(),this.blocked||(this.dragging=!0)}handleDragLeave(e){e.currentTarget.contains(e.relatedTarget)||(this.dragging=!1)}handleDrop(e){e.preventDefault(),this.dragging=!1,this.select(Array.from(e.dataTransfer?.files??[]))}statusText(e){let{t}=this.locale,n=this.texts;return e.status===`uploading`?n?.uploading??t(`upload.uploading`):e.status===`error`?e.error||(n?.failed??t(`upload.failed`)):n?.done??t(`upload.done`)}hookStates(){return{disabled:this.isDisabled,loading:this.loading,dragging:this.dragging&&!this.blocked}}render(){let{t:e}=this.locale,t=this.texts,n=this.blocked,r=this.isDisabled,i=this.label||this.aria.label;return b`<div
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
<span slot="start">${ur}</span>
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
part=${xn(`item`,{status:n.status})}
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
${Ur}
</button>`:y}
${this.removable?b`<button
part="remove-button"
type="button"
class=${w({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r})}
aria-label=${t?.remove?.(n.name)??e(`upload.remove`,{name:n.name})}
?disabled=${r}
@click=${()=>this.removeItem(n)}
>
${Dr}
</button>`:y}
</div>
</li>`)}
</ul>`:y}
</div>`}},H([S()],Fs.prototype,`label`,void 0),H([S({attribute:!1})],Fs.prototype,`items`,void 0),H([S()],Fs.prototype,`accept`,void 0),H([S({type:Boolean,reflect:!0})],Fs.prototype,`multiple`,void 0),H([S({type:Boolean})],Fs.prototype,`replace`,void 0),H([S({type:Number,attribute:`max-count`})],Fs.prototype,`maxCount`,void 0),H([S({type:Number,attribute:`max-size`})],Fs.prototype,`maxSize`,void 0),H([S({type:Boolean,reflect:!0})],Fs.prototype,`loading`,void 0),H([S({type:Boolean})],Fs.prototype,`removable`,void 0),H([S({type:Boolean})],Fs.prototype,`retryable`,void 0),H([S({attribute:!1})],Fs.prototype,`texts`,void 0),H([v()],Fs.prototype,`error`,void 0),H([v()],Fs.prototype,`dragging`,void 0),H([C(`input[type=file]`)],Fs.prototype,`input`,void 0)})))()}var Q;function Ls(){return(Ls=e((()=>{A(),I(),B(),P(),R(),j(),Mn(),lr(),g(),_(),x(),ft(),m(),gt(),Q=class e extends z{constructor(...e){super(...e),this.items=[],this.itemPadding=8,this.overscan=5,this.loadMoreThreshold=100,this.highPerformance=!1,this.loading=!1,this.clickable=!1,this.scrollOffset=0,this.containerHeight=0,this.measuredHeight=0,this.focusedId=null,this.aria=new M(this),this.locale=new F(this),this.resizeObserver=null,this.measureObserver=null,this.lastScrollTop=0,this.loadingMore=!1}static{this.tagName=`minerva-virtual-list`}static{this.styles=[D,E`
:host{
display: block;
}
.wave{
display: inline-flex;
}
`,N(Yr),N(fr)]}get scrollContainer(){return this.container??null}scrollToIndex(e){let t=this.container,n=this.rowHeight;t&&n&&(t.scrollTop=Math.max(0,e)*n,this.updateScroll(t.scrollTop))}get rowHeight(){return this.itemHeight?this.itemHeight:this.measuredHeight>0?this.measuredHeight+this.itemPadding*2:0}get needsMeasure(){return!this.itemHeight&&this.measuredHeight===0&&this.items.length>0}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.measureObserver?.disconnect(),this.measureObserver=null,this.cancelScheduled()}firstUpdated(){this.observeContainer()}reconnectedCallback(){super.reconnectedCallback(),this.observeContainer()}observeContainer(){let e=this.container;e&&(this.containerHeight=e.clientHeight,!(this.resizeObserver||typeof ResizeObserver>`u`)&&(this.resizeObserver=new ResizeObserver(e=>{for(let t of e)this.containerHeight=t.contentRect.height}),this.resizeObserver.observe(e)))}willUpdate(e){(e.has(`items`)||e.has(`loading`))&&(this.loadingMore=!1),this.focusedId!==null&&e.has(`items`)&&!this.items.some(e=>e.id===this.focusedId)&&(this.focusedId=null)}updated(){this.syncMeasure(),V&&this.items.length>0&&!this.renderItem&&O(e.tagName,`set the renderItem property (a function returning the content of a row); rows show the item id meanwhile.`),V&&this.maxHeight===void 0&&O(e.tagName,`set max-height (pixels): without a bounded height the list cannot scroll, so every row is rendered.`)}syncMeasure(){let e=this.needsMeasure?this.measureElement:void 0;if(!e){this.measureObserver?.disconnect(),this.measureObserver=null;return}let t=()=>{let t=e.offsetHeight;t>0&&(this.measuredHeight=t)};t(),!(this.measureObserver||typeof ResizeObserver>`u`)&&(this.measureObserver=new ResizeObserver(t),this.measureObserver.observe(e))}cancelScheduled(){this.raf!==void 0&&(cancelAnimationFrame(this.raf),this.raf=void 0),this.idle!==void 0&&(typeof cancelIdleCallback==`function`&&cancelIdleCallback(this.idle),this.idle=void 0)}schedule(e){if(!this.highPerformance){e();return}this.cancelScheduled(),this.raf=requestAnimationFrame(()=>{this.raf=void 0,typeof requestIdleCallback==`function`?this.idle=requestIdleCallback(()=>{this.idle=void 0,e()},{timeout:100}):e()})}updateScroll(e){this.scrollOffset=e}handleScroll(e){let{scrollTop:t,scrollHeight:n,clientHeight:r}=e.currentTarget,i=t>this.lastScrollTop;this.lastScrollTop=t,this.schedule(()=>{this.updateScroll(t),i&&!this.loadingMore&&!this.loading&&n-t-r<this.loadMoreThreshold&&n>r&&(this.loadingMore=!0,this.emit(`minerva-load-more`))})}visibleWindow(){let e=this.rowHeight;if(!e)return[];let{start:n,end:r}=t({scrollTop:this.scrollOffset,viewportHeight:this.containerHeight,itemHeight:e,itemCount:this.items.length,overscan:this.overscan}),i=[];for(let t=n;t<r;t++)i.push({index:t,start:t*e});if(this.focusedId!==null){let t=this.items.findIndex(e=>e.id===this.focusedId);if(t>=0&&(t<n||t>=r)){let r={index:t,start:t*e};t<n?i.unshift(r):i.push(r)}}return i}renderContent(e,t){return this.renderItem?this.renderItem(e,t):String(e.id)}activate(e,t){this.emit(`minerva-item-click`,{item:e,index:t})}handleRowKeyDown(e,t,n){e.composedPath()[0]===e.currentTarget&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.activate(t,n))}handleRowFocusOut(e){let t=e.currentTarget,n=e.relatedTarget;(!n||!t.contains(n))&&(this.focusedId=null)}hookStates(){return{loading:this.loading}}render(){let e=this.rowHeight,t=this.aria.label??y,n=this.visibleWindow(),r=this.items.length;return b`<div
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
<span class="wave" aria-hidden="true">${Jr}</span>
</div>
</div>
</div>`:y}
</div>`}},H([S({attribute:!1})],Q.prototype,`items`,void 0),H([S({attribute:!1})],Q.prototype,`renderItem`,void 0),H([S({type:Number,attribute:`item-height`})],Q.prototype,`itemHeight`,void 0),H([S({type:Number,attribute:`item-padding`})],Q.prototype,`itemPadding`,void 0),H([S({type:Number})],Q.prototype,`overscan`,void 0),H([S({type:Number,attribute:`max-height`})],Q.prototype,`maxHeight`,void 0),H([S({type:Number,attribute:`load-more-threshold`})],Q.prototype,`loadMoreThreshold`,void 0),H([S({type:Boolean,attribute:`high-performance`})],Q.prototype,`highPerformance`,void 0),H([S({type:Boolean,reflect:!0})],Q.prototype,`loading`,void 0),H([S({type:Boolean,reflect:!0})],Q.prototype,`clickable`,void 0),H([v()],Q.prototype,`scrollOffset`,void 0),H([v()],Q.prototype,`containerHeight`,void 0),H([v()],Q.prototype,`measuredHeight`,void 0),H([v()],Q.prototype,`focusedId`,void 0),H([C(`.virtualList`)],Q.prototype,`container`,void 0),H([C(`.measureItem`)],Q.prototype,`measureElement`,void 0)})))()}var Rs,zs,Bs,Vs,Hs;function Us(){return(Us=e((()=>{A(),I(),B(),P(),vn(),R(),j(),Er(),g(),_(),u(),m(),Rs=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],zs=/^\d{4}-\d{2}-\d{2}$/,Bs={fromAttribute(e){return Xe(e?.trim()??``)??void 0},toAttribute(e){return e instanceof Date&&!Number.isNaN(e.getTime())?h(e):null}},Vs=e=>typeof e==`number`&&Number.isFinite(e)&&e>0?Math.floor(e):0,Hs=class e extends z{constructor(...e){super(...e),this.firstDayOfWeek=1,this.showNavigation=!1,this.disabled=!1,this.size=`medium`,this.focusedKey=``,this.pendingFocus=null,this.i18n=new F(this),this.aria=new M(this)}static{this.tagName=`minerva-week-strip`}static{this.styles=[D,E`
:host{
display: block;
inline-size: 100%;
}
.navButton svg{
flex-shrink: 0;
}
`,N(Mr)]}get todayKey(){return this.today&&Xe(this.today)?this.today:h(new Date)}get start(){let e=this.week,t=e instanceof Date&&!Number.isNaN(e.getTime())?e:Xe(this.value??``)??Xe(this.todayKey)??new Date;return be(t,this.firstDayOfWeek)}focus(e){this.renderRoot.querySelector(`[role="option"][tabindex="0"]`)?.focus(e)}goToWeek(e){let t=be(e,this.firstDayOfWeek);h(t)!==h(this.start)&&(this.week=t,this.emit(`minerva-week-change`,{week:t}))}select(e){if(this.disabled)return;let t=h(e);this.goToWeek(e),t!==this.value&&(this.value=t,this.emit(`minerva-change`,{value:t}))}handleKeyDown(e,t){if(this.disabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=this.start,r;switch(f(e.key,this)){case`ArrowLeft`:r=p(t,-1);break;case`ArrowRight`:r=p(t,1);break;case`Home`:r=n;break;case`End`:r=p(n,6);break;case`PageUp`:r=p(t,-7);break;case`PageDown`:r=p(t,7);break;default:return}e.preventDefault(),this.pendingFocus=h(r),this.focusedKey=h(r),this.goToWeek(r)}willUpdate(t){if(!t.has(`value`))return;V&&this.value&&!zs.test(this.value)&&O(e.tagName,`value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`);let n=Xe(this.value??``);if(n&&!t.has(`week`)){let e=be(n,this.firstDayOfWeek);h(e)!==h(this.start)&&(this.week=e)}}updated(){if(this.disabled||!this.pendingFocus)return;let e=this.renderRoot.querySelector(`[data-date="${this.pendingFocus}"]`);e&&(this.pendingFocus=null,e.focus())}hookStates(){return{disabled:this.disabled,size:this.size}}heading(e,t,n){try{let r=new Intl.DateTimeFormat(n,{year:`numeric`,month:`long`});return e.getMonth()===t.getMonth()?r.format(e):`${new Intl.DateTimeFormat(n,{month:`long`,...e.getFullYear()!==t.getFullYear()&&{year:`numeric`}}).format(e)} – ${r.format(t)}`}catch{return h(e).slice(0,7)}}render(){let e=this.i18n.t,t=this.start,n=Array.from({length:7},(e,n)=>p(t,n)),r=n.map(h),i=this.todayKey,a=this.value||void 0,o=[this.focusedKey,a,i].find(e=>e&&r.includes(e))??r[0],s=this.disabled,c=[`small`,`medium`,`large`].includes(this.size)?this.size:`medium`,l=this.locale??this.i18n.language,u;try{let e=new Intl.DateTimeFormat(l,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`});u=t=>e.format(t)}catch{u=h}let d=(t,n)=>{let r=this.markers?.[t];if(this.getDayLabel)return this.getDayLabel(t,r);let i=u(n),a=Vs(r);return a?e(`weekStrip.dayWithMarkers`,{date:i,count:a}):r===!0?e(`weekStrip.dayMarked`,{date:i}):i};return b`<div part="root" class="weekStrip ${c}">
${this.showNavigation?b`<div class="toolbar">
<button
type="button"
part="nav-button"
class="navButton"
aria-label=${this.previousWeekLabel??e(`weekStrip.previousWeek`)}
?disabled=${s}
@click=${()=>this.goToWeek(p(t,-7))}
>
${Qn}
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
@click=${()=>this.goToWeek(p(t,7))}
>
${gr}
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
${n.map(t=>{let n=h(t),r=this.markers?.[n],c=Vs(r),l=(t.getDay()+6)%7,u={selected:a===n,today:n===i,disabled:s},f=c?`marker count`:r===!0?`marker dot`:`marker`;return b`<div
role="option"
part=${xn(`day`,u)}
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
>${this.weekdayLabels?.[l]??e(`monthCalendar.weekdays.${Rs[l]}`)}</span
>
<span class="dayNumber" aria-hidden="true">${t.getDate()}</span>
<span part="indicator" class=${f} aria-hidden="true"
>${c?c>99?`99+`:c:``}</span
>
</div>`})}
</div>
</div>`}},H([S({reflect:!0})],Hs.prototype,`value`,void 0),H([S({converter:Bs,reflect:!0})],Hs.prototype,`week`,void 0),H([S({type:Number,attribute:`first-day-of-week`})],Hs.prototype,`firstDayOfWeek`,void 0),H([S()],Hs.prototype,`today`,void 0),H([S({attribute:!1})],Hs.prototype,`markers`,void 0),H([S({type:Boolean,attribute:`show-navigation`,reflect:!0})],Hs.prototype,`showNavigation`,void 0),H([S({attribute:`previous-week-label`})],Hs.prototype,`previousWeekLabel`,void 0),H([S({attribute:`next-week-label`})],Hs.prototype,`nextWeekLabel`,void 0),H([S()],Hs.prototype,`locale`,void 0),H([S({type:Boolean,reflect:!0})],Hs.prototype,`disabled`,void 0),H([S({reflect:!0})],Hs.prototype,`size`,void 0),H([S({attribute:!1})],Hs.prototype,`weekdayLabels`,void 0),H([S({attribute:!1})],Hs.prototype,`getDayLabel`,void 0),H([v()],Hs.prototype,`focusedKey`,void 0)})))()}var Ws,Gs,Ks,qs,Js,Ys;function Xs(){return(Xs=e((()=>{li(),_(),Et(),Tt(),wt(),Ct(),Ws=class extends ci{engineOptions(){return{...this.options}}engineMounted(e){this.book&&e.setBook(this.book)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`book`)&&this.book&&e.setBook(this.book)}setBook(e){this.instance?.setBook(e)}applyDeltas(e){this.instance?.applyDeltas(e)}},H([S({attribute:!1})],Ws.prototype,`book`,void 0),Gs=class{reset(){this.previous=void 0}apply(e,t,n){let r=this.previous;if(this.previous=e,!e||e===r)return;let i=r?.length??0;if(r&&i>0&&e.length>=i&&e[0]===r[0]&&e[i-1]===r[i-1]){e.length>i&&t(e.slice(i));return}n(e)}},Ks=class extends Ws{static{this.tagName=`minerva-depth-chart`}createEngine(e,t){return xt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`range`,e=>this.emit(`minerva-range-change`,{range:e}))]}setRange(e){this.instance?.setRange(e)}},H([S({attribute:!1})],Ks.prototype,`options`,void 0),qs=class extends Ws{static{this.tagName=`minerva-order-book`}get defaultHeight(){return 420}createEngine(e,t){return St(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`levelClick`,e=>this.emit(`minerva-level-click`,e))]}engineMounted(e){super.engineMounted(e),this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}syncEngine(e,t){super.syncEngine(e,t),t.has(`lastPrice`)&&this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}setLastPrice(e){this.instance?.setLastPrice(e)}},H([S({type:Number,attribute:`last-price`})],qs.prototype,`lastPrice`,void 0),H([S({attribute:!1})],qs.prototype,`options`,void 0),Js=class extends Ws{constructor(...e){super(...e),this.feed=new Gs}static{this.tagName=`minerva-order-book-heatmap`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),bt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e})),e.on(`follow`,e=>this.emit(`minerva-follow-change`,{follow:e}))]}feedTrades(e){let t=t=>e.addTrades(t);this.feed.apply(this.trades,t,t)}engineMounted(e){super.engineMounted(e),this.feedTrades(e)}syncEngine(e,t){super.syncEngine(e,t),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}resetView(){this.instance?.resetView()}getRenderer(){return this.instance?.getRenderer()??null}},H([S({attribute:!1})],Js.prototype,`trades`,void 0),H([S({attribute:!1})],Js.prototype,`options`,void 0),Ys=class extends ci{constructor(...e){super(...e),this.feed=new Gs}static{this.tagName=`minerva-time-and-sales`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),Dt(e,t)}engineOptions(){return{...this.options}}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`tradeClick`,e=>this.emit(`minerva-trade-click`,e)),e.on(`pause`,e=>this.emit(`minerva-pause`,{paused:e}))]}feedTrades(e){this.feed.apply(this.trades,t=>e.addTrades(t),t=>e.setTrades(t))}engineMounted(e){this.feedTrades(e)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}setTrades(e){this.instance?.setTrades(e)}clear(){this.instance?.clear()}scrollToLatest(){this.instance?.scrollToLatest()}},H([S({attribute:!1})],Ys.prototype,`trades`,void 0),H([S({attribute:!1})],Ys.prototype,`options`,void 0)})))()}function Zs(){let e=document.activeElement;for(;e?.shadowRoot?.activeElement;)e=e.shadowRoot.activeElement;return e instanceof HTMLElement?e:null}var Qs,$s,ec,tc,nc,$;function rc(){return(rc=e((()=>{A(),P(),R(),j(),fi(),ni(),ri(),ii(),kr(),g(),_(),ft(),kt(),Vt(),_t(),Qs=[`minerva-input`,`minerva-change`,`minerva-clear`,`minerva-point-drop`,`minerva-quadrant-click`,`minerva-point-double-click`,`input`,`change`],$s=e=>e.stopPropagation(),ec=10,tc=()=>({x:0,y:0,width:0,height:0}),nc=(e,t=16)=>b`<svg
width=${t}
height=${t}
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
stroke-width="1.8"
stroke-linecap="round"
stroke-linejoin="round"
aria-hidden="true"
>
<path d=${It[e]}></path>
</svg>`,$=class extends z{constructor(...e){super(...e),this.reverseX=!1,this.hideTicks=!1,this.hideLabels=!1,this.hideCounts=!1,this.pointSize=12,this.noAccessiblePoints=!1,this.panel=null,this.selection=null,this.lastPointer=null,this.returnFocus=null,this.placed=null,this.listening=!1,this.i18n=new F(this),this.aria=new M(this),this.chartOptions=null,this.close=()=>{this.panel=null;let e=this.returnFocus;this.returnFocus=null,e?.isConnected&&e.focus()},this.removeTask=()=>{let e=this.shownPanel;e?.kind===`delete`&&this.tasks[e.index]&&(this.change(Pt(this.tasks,e.index)),this.selection=Mt(this.selection,e.index)),this.close()},this.onOutsidePointerDown=e=>{let t=this.panelElement;t&&e.composedPath().includes(t)||(this.returnFocus=null,this.panel=null)},this.onPanelKeydown=e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),this.close())},this.trackPointer={capture:!0,handleEvent:e=>{let t=this.boardElement;if(!t)return;let n=t.getBoundingClientRect();this.lastPointer={x:e.clientX-n.left,y:e.clientY-n.top,width:0,height:0}}},this.onPointClick=e=>{this.selection=e.detail.index},this.onPointDoubleClick=e=>this.edit(e.detail.index),this.onQuadrantClick=e=>{let{quadrant:t,x:n,y:r}=e.detail;this.add(t,this.lastPointer?{...this.lastPointer}:tc(),{x:n,y:r})},this.onPointDrop=e=>{let{index:t,x:n,y:r}=e.detail;this.change(Bt(this.tasks,t,{x:n,y:r})),this.selection=t},this.onSubmit=e=>{e.preventDefault(),this.save()},this.onNameKeydown=e=>{e.key!==`Enter`||e.isComposing||(e.preventDefault(),this.save())}}static{this.tagName=`minerva-quadrant-task-board`}static{this.dependencies=[oi,ui,ti,ei]}static{this.styles=[D,E`
:host{
display: block;

width: 100%;
min-inline-size: 0;
}

.board[data-panel] minerva-quadrant-chart::part(point-card){
display: none;
}
`,N(Hr)]}createRenderRoot(){let e=super.createRenderRoot();for(let t of Qs)e.addEventListener(t,$s);return e}disconnectedCallback(){super.disconnectedCallback(),this.listenOutside(!1)}get language(){return this.locale??this.i18n.language}get tasks(){return this.points??[]}get chart(){return this.renderRoot.querySelector(oi.tagName)}get boardElement(){return this.renderRoot.querySelector(`[part=root]`)}get panelElement(){return this.renderRoot.querySelector(`[part=panel]`)}get shownPanel(){let e=this.panel;if(!e)return null;let t=this.tasks;return(e.kind===`draft`?e.draft.index===null||t[e.draft.index]:t[e.index])?e:null}geometry(){return{xDomain:this.xDomain,yDomain:this.yDomain,xSplit:this.xSplit,ySplit:this.ySplit,reverseX:this.reverseX}}quadrantTitle(e){return this.quadrants?.[e]?.label||Ot(this.language)[e]}engineOptions(e,t){let n=this.chartOptions;if(n&&n.options===this.options&&n.locale===e&&n.ariaLabel===t)return n.value;let r={...this.options,locale:e,...t?{ariaLabel:t}:{}};return this.chartOptions={options:this.options,locale:e,ariaLabel:t,value:r},r}boxOf(e){let t=this.boardElement;if(!e||!t)return null;let n=t.getBoundingClientRect(),r=e.getBoundingClientRect();return{x:r.left-n.left,y:r.top-n.top,width:r.width,height:r.height}}pointBox(e){let t=this.chart,n=this.tasks[e],r=n?t?.instance?.toPixel(n.x,n.y):null,i=r?this.boxOf(t?.shadowRoot?.querySelector(`[part=surface]`)):null;return r&&i?{x:i.x+r.x-ec,y:i.y+r.y-ec,width:20,height:20}:this.lastPointer?{...this.lastPointer}:tc()}change(e){this.emit(`minerva-points-change`,{points:e})}open(e){this.panel||(this.returnFocus=Zs()),this.panel=e}add(e,t,n){this.open({kind:`draft`,draft:Nt(this.geometry(),e,n),anchor:t})}edit(e){if(e===null)return;let t=Lt(this.geometry(),this.tasks,e);t&&this.open({kind:`draft`,draft:t,anchor:this.pointBox(e)})}confirmRemove(e){e!==null&&this.open({kind:`delete`,index:e,anchor:this.pointBox(e)})}setDraft(e){let t=this.panel;t?.kind===`draft`&&(this.panel={...t,draft:{...t.draft,...e}})}save(){let e=this.shownPanel,t=zt(this.geometry(),this.tasks,e?.kind===`draft`?e.draft:null);t&&(this.change(t.points),this.selection=t.index,this.close())}updated(e){super.updated(e);let t=this.shownPanel;if(this.listenOutside(t!==null),!t){this.placed=null;return}let n=this.placed;if(n?.anchor===t.anchor&&n.kind===t.kind)return;let r={anchor:t.anchor,kind:t.kind};this.placed=r,this.placePanel(),this.settlePanel(r)}async settlePanel(e){let t=this.panelElement;t&&(await Promise.all(Array.from(t.querySelectorAll(`*`),e=>e.updateComplete)),this.placed===e&&this.panelElement===t&&(this.placePanel(),t.querySelector(`[data-autofocus]`)?.focus({preventScroll:!0})))}placePanel(){let e=this.panelElement,t=this.boardElement,n=this.shownPanel?.anchor;if(!e||!t||!n)return;let r=Rt(n,{width:e.offsetWidth,height:e.offsetHeight},{width:t.clientWidth,height:t.clientHeight});e.style.left=`${r.x}px`,e.style.top=`${r.y}px`,e.style.transformOrigin=`${r.origin.x}px ${r.origin.y}px`,e.dataset.placement=r.placement}listenOutside(e){e!==this.listening&&(this.listening=e,e?document.addEventListener(`pointerdown`,this.onOutsidePointerDown,!0):document.removeEventListener(`pointerdown`,this.onOutsidePointerDown,!0))}renderHeader(e,t,n,r){let i=this.quadrants?.[e]?.badge;return b`<div
slot=${di[e]}
class="header"
data-corner=${e}
>
${i?b`<span class="badge">${i}</span>`:y}
<span class="title">${this.quadrantTitle(e)}</span>
${t===void 0?y:b`<span class="count">${t}</span>`}
<minerva-icon-button
class="add"
size="xsmall"
variant="ghost"
label=${`${n} · ${this.quadrantTitle(e)}`}
aria-expanded=${r?`true`:`false`}
@click=${t=>this.add(e,this.boxOf(t.currentTarget)??tc())}
>${nc(`add`)}</minerva-icon-button
>
</div>`}renderDraftPanel(e,t,n){return b`<div
part="panel"
class="panel"
role="dialog"
aria-labelledby="panel-title"
data-quadrant-task-panel=${e.index===null?`add`:`edit`}
@keydown=${this.onPanelKeydown}
>
<form class="form" @submit=${this.onSubmit}>
<h3 id="panel-title" class="panelTitle">
${e.index===null?t.add:t.edit}
</h3>
<label class="field">
<span>${t.name}</span>
<minerva-input
required
size="small"
data-autofocus
aria-label=${t.name}
.value=${e.label}
@minerva-input=${e=>this.setDraft({label:e.detail.value})}
@keydown=${this.onNameKeydown}
></minerva-input>
</label>
<fieldset class="quadrants">
<legend>${t.quadrant}</legend>
<div class="quadrantGrid">
${Ft.map(t=>b`<label class="quadrant" data-corner=${t}>
<input
type="radio"
name="quadrant"
value=${t}
.checked=${e.quadrant===t}
@change=${()=>this.setDraft({quadrant:t})}
/>
<span
class="swatch"
style=${T({background:At(this.quadrants,t)})}
aria-hidden="true"
></span>
<span class="quadrantName"
>${this.quadrantTitle(t)}</span
>
</label>`)}
</div>
</fieldset>
<div class="footer">
<minerva-button
size="small"
color="neutral"
variant="ghost"
@click=${this.close}
>${t.cancel}</minerva-button
>
<minerva-button
size="small"
type="submit"
?disabled=${!jt(e,n)}
>${t.save}</minerva-button
>
</div>
</form>
</div>`}renderDeletePanel(e,t,n){return b`<div
part="panel"
class="panel"
role="alertdialog"
aria-labelledby="panel-title"
aria-describedby="panel-text"
data-quadrant-task-panel="delete"
@keydown=${this.onPanelKeydown}
>
<h3 id="panel-title" class="panelTitle">${t.delete}</h3>
<p id="panel-text" class="panelText">
${Ut(t,n[e])}
</p>
<div class="footer">
<minerva-button
size="small"
color="neutral"
variant="ghost"
data-autofocus
@click=${this.close}
>${t.cancel}</minerva-button
>
<minerva-button size="small" color="danger" @click=${this.removeTask}
>${t.confirmDelete}</minerva-button
>
</div>
</div>`}render(){let e=this.tasks,t=this.language,n=Ht(t,this.labels),r=yt({...this.geometry(),points:e}),i=this.shownPanel,a=i?.kind===`draft`&&i.draft.index===null?i.draft.quadrant:null,o=this.selectedIndex===void 0?this.selection:this.selectedIndex,s=this.aria.label;return b`<div
part="root"
class="board"
data-panel=${i?.kind??y}
@pointerdown=${this.trackPointer}
>
<minerva-quadrant-chart
part="chart"
drag-points
.points=${e}
.quadrants=${this.quadrants}
.xLabel=${this.xLabel}
.yLabel=${this.yLabel}
.axisLabels=${this.axisLabels}
.xDomain=${this.xDomain}
.yDomain=${this.yDomain}
.xSplit=${this.xSplit}
.ySplit=${this.ySplit}
.reverseX=${this.reverseX}
.hideTicks=${this.hideTicks}
.hideLabels=${this.hideLabels}
.pointSize=${this.pointSize}
.selectedIndex=${o}
.noAccessiblePoints=${this.noAccessiblePoints}
.height=${this.height}
.options=${this.engineOptions(t,s)}
@minerva-point-click=${this.onPointClick}
@minerva-point-double-click=${this.onPointDoubleClick}
@minerva-quadrant-click=${this.onQuadrantClick}
@minerva-point-drop=${this.onPointDrop}
>
${Ft.map(e=>this.renderHeader(e,this.hideCounts?void 0:vt(!0,r[e].points,t),n.add,a===e))}
<div
slot="point-actions"
role="toolbar"
class="cardActions"
aria-label=${n.actions}
@pointerdown=${$s}
>
<minerva-icon-button
size="xsmall"
variant="ghost"
label=${n.edit}
data-action="edit"
@click=${()=>this.edit(this.chart?.activeIndex??null)}
>${nc(`edit`,14)}</minerva-icon-button
>
<minerva-icon-button
size="xsmall"
variant="ghost"
color="danger"
label=${n.delete}
data-action="delete"
@click=${()=>this.confirmRemove(this.chart?.activeIndex??null)}
>${nc(`delete`,14)}</minerva-icon-button
>
</div>
</minerva-quadrant-chart>
${i?.kind===`draft`?this.renderDraftPanel(i.draft,n,e):i?.kind===`delete`?this.renderDeletePanel(i.index,n,e):y}
</div>`}},H([S({attribute:!1})],$.prototype,`points`,void 0),H([S({attribute:!1})],$.prototype,`labels`,void 0),H([S({attribute:!1})],$.prototype,`quadrants`,void 0),H([S({attribute:`x-label`})],$.prototype,`xLabel`,void 0),H([S({attribute:`y-label`})],$.prototype,`yLabel`,void 0),H([S({attribute:!1})],$.prototype,`axisLabels`,void 0),H([S({attribute:!1})],$.prototype,`xDomain`,void 0),H([S({attribute:!1})],$.prototype,`yDomain`,void 0),H([S({type:Number,attribute:`x-split`})],$.prototype,`xSplit`,void 0),H([S({type:Number,attribute:`y-split`})],$.prototype,`ySplit`,void 0),H([S({type:Boolean,attribute:`reverse-x`})],$.prototype,`reverseX`,void 0),H([S({type:Boolean,attribute:`hide-ticks`})],$.prototype,`hideTicks`,void 0),H([S({type:Boolean,attribute:`hide-labels`})],$.prototype,`hideLabels`,void 0),H([S({type:Boolean,attribute:`hide-counts`})],$.prototype,`hideCounts`,void 0),H([S({type:Number,attribute:`point-size`})],$.prototype,`pointSize`,void 0),H([S({type:Number,attribute:`selected-index`})],$.prototype,`selectedIndex`,void 0),H([S()],$.prototype,`height`,void 0),H([S()],$.prototype,`locale`,void 0),H([S({type:Boolean,attribute:`no-accessible-points`})],$.prototype,`noAccessiblePoints`,void 0),H([S({attribute:!1})],$.prototype,`options`,void 0),H([v()],$.prototype,`panel`,void 0),H([v()],$.prototype,`selection`,void 0)})))()}var ic,ac;function oc(){return(oc=e((()=>{li(),_(),Wt(),ic={fromAttribute:e=>e===null?void 0:/^\d+$/.test(e)?Number(e):e},ac=class extends ci{constructor(...e){super(...e),this.height=480,this.chartStyle=`candles`}static{this.tagName=`minerva-trading-chart`}createEngine(e,t){return Gt(e,t)}engineOptions(){return{...this.options,bars:this.bars??this.options?.bars,symbol:this.symbol??this.options?.symbol,timeframe:this.timeframe??this.options?.timeframe,chartStyle:this.chartStyle,indicators:this.indicators??this.options?.indicators}}bindEngine(e){return[e.on(`crosshairMove`,e=>this.emit(`minerva-crosshair-move`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`visibleRangeChange`,e=>this.emit(`minerva-visible-range-change`,e)),e.on(`orderMove`,e=>this.emit(`minerva-order-move`,e)),e.on(`orderCreate`,e=>this.emit(`minerva-order-create`,e)),e.on(`orderCancel`,e=>this.emit(`minerva-order-cancel`,e)),e.on(`drawingsChange`,e=>this.emit(`minerva-drawings-change`,{drawings:e})),e.on(`drawingSelect`,e=>this.emit(`minerva-drawing-select`,{id:e})),e.on(`drawingToolChange`,e=>this.emit(`minerva-drawing-tool-change`,{tool:e})),e.on(`undoChange`,e=>this.emit(`minerva-undo-change`,e)),e.on(`replayChange`,e=>this.emit(`minerva-replay-change`,e)),e.on(`fullscreenChange`,e=>this.emit(`minerva-fullscreen-change`,{fullscreen:e})),e.on(`indicatorToggle`,e=>this.emit(`minerva-indicator-toggle`,e)),e.on(`historyRequest`,e=>this.emit(`minerva-history-request`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}updateBar(e){this.instance?.update(e)}appendBars(e){this.instance?.appendBars(e)}prependBars(e){this.instance?.prependBars(e)}setBars(e){this.instance?.setBars(e)}getBarCount(){return this.instance?.getBarCount()??0}getBar(e){return this.instance?.getBar(e)??null}scrollToRealtime(e){this.instance?.scrollToRealtime(e)}fitContent(){this.instance?.fitContent()}getVisibleRange(){return this.instance?.getVisibleRange()??null}setVisibleRange(e){this.instance?.setVisibleRange(e)}getVisibleTimeRange(){return this.instance?.getVisibleTimeRange()??null}setVisibleTimeRange(e){this.instance?.setVisibleTimeRange(e)}setCrosshair(e,t){this.instance?.setCrosshair(e,t)}setScaleMode(e){this.instance?.setScaleMode(e)}resetPriceScales(){this.instance?.resetPriceScales()}setDrawingTool(e){this.instance?.setDrawingTool(e)}getDrawings(){return this.instance?.getDrawings()??[]}removeDrawing(e){this.instance?.removeDrawing(e)}selectDrawing(e){this.instance?.selectDrawing(e)}updateDrawing(e,t){this.instance?.updateDrawing(e,t)}undo(){this.instance?.undo()}redo(){this.instance?.redo()}getUndoState(){return this.instance?.getUndoState()??{canUndo:!1,canRedo:!1}}startReplay(e){this.instance?.startReplay(e)}replayStep(e){this.instance?.replayStep(e)}replayPlay(e){this.instance?.replayPlay(e)}replayPause(){this.instance?.replayPause()}stopReplay(){this.instance?.stopReplay()}getReplayState(){return this.instance?.getReplayState()??null}toDataURL(e,t){return this.instance?.toDataURL(e,t)??``}toBlob(e,t){return this.instance?.toBlob(e,t)??Promise.resolve(null)}requestChartFullscreen(){return this.instance?.requestFullscreen()??Promise.resolve()}exitChartFullscreen(){return this.instance?.exitFullscreen()??Promise.resolve()}setIndicatorVisible(e,t){this.instance?.setIndicatorVisible(e,t)}getRenderer(){return this.instance?.getRenderer()??null}},H([S()],ac.prototype,`height`,void 0),H([S({attribute:!1})],ac.prototype,`bars`,void 0),H([S()],ac.prototype,`symbol`,void 0),H([S({converter:ic})],ac.prototype,`timeframe`,void 0),H([S({attribute:`chart-style`})],ac.prototype,`chartStyle`,void 0),H([S({attribute:!1})],ac.prototype,`indicators`,void 0),H([S({attribute:!1})],ac.prototype,`options`,void 0)})))()}export{wo as $,Mi as $t,ps as A,sa as At,Go as B,G as Bt,ms as C,Ta as Ct,hs as D,ua as Dt,fs as E,Sa as Et,es as F,aa as Ft,Po as G,W as Gt,J as H,Xi as Ht,ns as I,ta as It,ko as J,Bi as Jt,Fo as K,Wi as Kt,Ko as L,ia as Lt,is as M,ca as Mt,Jo as N,ea as Nt,os as O,ma as Ot,ts as P,ra as Pt,xo as Q,Fi as Qt,qo as R,na as Rt,ds as S,ka as St,gs as T,Ca as Tt,No as U,Ki as Ut,Lo as V,Zi as Vt,Mo as W,Gi as Wt,Eo as X,Ri as Xt,To as Y,Li as Yt,So as Z,Pi as Zt,Z as _,Pa as _t,Js as a,U as an,oo as at,Es as b,Oa as bt,Ks as c,yi as cn,$a as ct,Us as d,vi as dn,Ka as dt,ji as en,Co as et,Ls as f,_i as fn,qa as ft,Ms as g,pi as gn,Ba as gt,Is as h,mi as hn,Va as ht,rc as i,Di as in,fo as it,X as j,la as jt,us as k,pa as kt,qs as l,xi as ln,eo as lt,Fs as m,hi as mn,Ga as mt,oc as n,Ni as nn,ho as nt,Ys as o,Ci as on,io as ot,Q as p,gi as pn,Wa as pt,q,zi as qt,$ as r,Ai as rn,K as rt,Xs as s,Si as sn,ao as st,ac as t,Oi as tn,mo as tt,Hs as u,bi as un,Ua as ut,Ns as v,Fa as vt,ss as w,wa as wt,cs as x,Da as xt,Ts as y,Na as yt,Y as z,$i as zt};