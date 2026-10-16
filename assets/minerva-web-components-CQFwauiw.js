import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{$t as t,At as n,B as r,Bt as i,C as a,Ct as o,D as s,Dt as c,Et as l,Ft as ee,H as te,Ht as u,It as d,Jt as ne,K as re,Kt as ie,L as f,Lt as ae,M as oe,Mt as se,O as ce,Ot as le,Q as ue,Qt as de,R as fe,Rt as pe,St as me,T as he,Tt as ge,U as _e,Vt as ve,W as ye,Wt as be,X as xe,Xt as Se,Z as Ce,Zt as we,_t as Te,a as Ee,dn as De,dt as Oe,ft as ke,h as Ae,i as je,it as Me,jt as Ne,lt as Pe,m as Fe,n as Ie,nn as Le,nt as Re,on as ze,rn as Be,s as Ve,st as He,t as Ue,tn as We,wt as Ge,x as Ke,xt as qe,y as Je,zt as Ye}from"./angular-preview-l4x8c_2r.js";import{A as p,D as m,E as h,I as g,_,a as Xe,b as v,d as Ze,g as y,i as Qe,j as b,m as $e,p as et,v as x,w as S,x as C}from"./minerva-web-components-Csj0uz1j.js";import{$ as tt,$n as nt,A as rt,Ar as w,B as it,C as at,Cr as ot,D as st,E as ct,Er as lt,F as ut,Fr as dt,Ft as ft,G as pt,Gn as T,H as mt,Hn as ht,Ht as gt,I as _t,In as vt,It as yt,J as bt,K as xt,L as St,Lt as Ct,M as wt,Mr as Tt,N as Et,Nn as Dt,Nr as Ot,O as kt,On as At,Or as jt,P as Mt,Pn as Nt,Pr as E,Q as Pt,Qn as Ft,R as It,Rt as Lt,S as Rt,Sr as D,St as zt,T as Bt,Tn as Vt,Tr as Ht,U as Ut,Un as Wt,V as Gt,Vn as Kt,Vt as qt,W as Jt,Wn as Yt,X as Xt,Xn as Zt,Xt as Qt,Y as $t,Yt as en,Z as tn,Zn as nn,_ as rn,_r as an,a as on,ar as sn,at as cn,b as ln,bn as O,c as un,cr as k,dn as A,dr as dn,er as fn,et as pn,fn as mn,fr as hn,g as gn,gr as _n,gt as vn,h as yn,hn as bn,hr as j,ht as xn,ir as Sn,j as Cn,jn as wn,jr as Tn,k as En,kr as M,l as Dn,ln as On,m as kn,mn as An,mr as N,mt as jn,o as Mn,or as P,ot as Nn,p as Pn,pn as Fn,pr as F,pt as In,q as Ln,qn as Rn,rr as zn,s as Bn,sr as I,tr as Vn,u as Hn,un as Un,v as Wn,vr as Gn,w as Kn,wn as qn,wr as Jn,x as Yn,xn as L,xr as R,xt as Xn,y as Zn,yr as Qn,z as $n,zn as er}from"./minerva-web-components-B3AuthJ9.js";import{t as z}from"./minerva-web-components-D61_qRVd.js";import{At as tr,Dt as nr,Et as rr,jt as ir}from"./minerva-web-components-eBeBuwrB.js";import{_ as ar,a as or,c as sr,d as cr,f as lr,g as ur,h as dr,i as fr,l as pr,m as mr,n as hr,o as gr,p as _r,r as vr,s as yr,t as br,u as xr}from"./minerva-web-components-B7GiYB9L.js";var Sr,B;function Cr(){return(Cr=e((()=>{M(),P(),T(),Ht(),R(),_n(),j(),O(),yt(),gr(),m(),v(),_(),d(),Qe(),Sr={fromAttribute:e=>(e??``).split(/[\s,]+/).map(e=>parseInt(e,10)).filter(e=>!isNaN(e)&&e>0),toAttribute:e=>e.join(`,`)},B=class e extends F{constructor(...e){super(...e),this.current=1,this.total=0,this.pageSize=10,this.disabled=!1,this.showQuickJumper=!1,this.showSizeChanger=!1,this.pageSizeOptions=[10,20,50,100],this.showTotal=!1,this.size=`medium`,this.shape=`rounded`,this.variant=`solid`,this.simple=!1,this.hideEdges=!1,this.hideNumbers=!1,this.responsive=!1,this.jumpValue=``,this.simpleDraft=null,this.ripples=[],this.aria=new w(this),this.locale=new D(this),this.nextRippleId=0,this.restoreFocus=null,this.pagination=new or(this,qe(this.paginationProps()),()=>!1),this.handleKeyDown=e=>{let t=e.key;(t===`ArrowLeft`||t===`ArrowRight`)&&ce(this)===`rtl`&&(t=t===`ArrowLeft`?`ArrowRight`:`ArrowLeft`);let n=ie(t,this.current,this.totalPages);n!==null&&(e.preventDefault(),this.changePage(n,`active`))},this.handleJump=e=>{if(e.key!==`Enter`)return;e.preventDefault();let t=parseInt(this.jumpValue,10);!isNaN(t)&&t>=1&&t<=this.totalPages&&(this.changePage(t),this.jumpValue=``,e.target.value=``)},this.handleSizeChange=e=>{let t=e.target,n=parseInt(t.value,10);this.send({type:`SET_PAGE_SIZE`,pageSize:n}),this.pageSize!==n&&(t.value=String(this.pageSize))},this.commitSimpleDraft=()=>{let e=this.simpleDraft;if(e===null)return;this.simpleDraft=null;let t=parseInt(e,10);isNaN(t)||this.changePage(Math.min(Math.max(t,1),this.totalPages))}}static{this.tagName=`minerva-pagination`}static{this.styles=[N,g`
:host{
display: block;
}
`,L(ft)]}paginationProps(){return{page:this.current,pageSize:this.pageSize,total:this.total,disabled:this.disabled,onChange:(e,t)=>this.request(e,t)}}send(e){this.pagination.sync(this.paginationProps()),this.pagination.send(e)}get totalPages(){return Se(this.total,this.pageSize)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}request(e,t){let n={page:e,pageSize:t};return this.emit(`minerva-page-change`,n,{cancelable:!0})?(this.current=e,this.pageSize=t,!0):!1}changePage(e,t=`if-lost`){Te(this.current,e,this.totalPages,this.disabled)&&(this.restoreFocus={mode:t,page:e},this.send({type:`GOTO`,page:e}))}willUpdate(t){k&&(t.has(`current`)||t.has(`total`))&&this.total>0&&this.current>this.totalPages&&I(e.tagName,`current (${this.current}) is greater than the number of pages (${this.totalPages}).`)}updated(){let e=this.restoreFocus;this.restoreFocus=null;let t=this.shadowRoot;if(!e||!t||e.page!==this.current)return;let n=t.activeElement,r=!n||n.disabled===!0;(e.mode===`active`||r)&&(t.querySelector(`[aria-current="page"]`)??t.querySelector(`button:not(:disabled), input`))?.focus()}handleItemClick(e,t,n){if(Te(this.current,e,this.totalPages,this.disabled)){if(n.detail>0){let e=n.currentTarget.getBoundingClientRect();this.ripples=[...this.ripples,{x:n.clientX-e.left,y:n.clientY-e.top,id:this.nextRippleId++,itemKey:t}],clearTimeout(this.rippleTimer),this.rippleTimer=setTimeout(()=>this.ripples=[],1e3)}this.changePage(e)}}label(e,t){let n=this.labels,r=this.locale.t;switch(e){case`prev`:return n?.prev??r(`pagination.prev`);case`next`:return n?.next??r(`pagination.next`);case`jump-prev`:return n?.jumpPrev??r(`pagination.jumpPrev`);case`jump-next`:return n?.jumpNext??r(`pagination.jumpNext`);default:return n?.page?.(t)??r(`pagination.page`,{page:t})}}hookStates(){return{disabled:this.disabled,size:this.size,shape:this.shape,variant:this.variant}}renderItem(e){let{type:t,target:n,key:r}=e;if(t===`ellipsis`)return b`<span class="ellipsis" aria-hidden="true">…</span>`;let i=this.current,a=t===`page`&&n===i,o=this.disabled||(t===`prev`?i<=1:t===`next`&&i>=this.totalPages),s;switch(t){case`prev`:s=b`<slot name="prev-icon">${Wt}</slot>`;break;case`next`:s=b`<slot name="next-icon">${ht}</slot>`;break;case`jump-prev`:case`jump-next`:s=b`<span class="jumpWrapper"
><slot
name=${t===`jump-prev`?`jump-prev-icon`:`jump-next-icon`}
>${nt}</slot
><span class="jumpHint" aria-hidden="true"
>${this.label(t,n)}</span
></span
>`;break;default:s=n}return this.itemRender&&(s=this.itemRender(n,t)),b`<button
type="button"
part=${an(`item`,{current:a,disabled:o})}
data-key=${r}
class=${x({item:!0,active:a,disabled:o,prev:t===`prev`,next:t===`next`,jump:t===`jump-prev`||t===`jump-next`})}
?disabled=${o}
aria-label=${this.label(t,n)}
aria-current=${a?`page`:p}
@keydown=${this.handleKeyDown}
@click=${e=>this.handleItemClick(n,r,e)}
>
${s}
${this.ripples.filter(e=>e.itemKey===r).map(e=>b`<span
class="ripple"
style="left:${e.x}px;top:${e.y}px"
aria-hidden="true"
></span>`)}
</button>`}items(){return de({page:this.current,totalPages:this.totalPages,siblingCount:this.siblingCount,boundaryCount:this.boundaryCount,hideEdges:this.hideEdges}).map(({key:e,kind:t,page:n})=>({key:e,type:t,target:n}))}renderPageList(){let e=this.current,t=t=>this.hideEdges?p:this.renderItem({key:t,type:t,target:t===`prev`?e-1:e+1});return this.simple?b`${t(`prev`)}
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
${t(`next`)}`:Xe(this.items(),e=>e.key,e=>this.renderItem(e))}render(){let e=this.locale.t,t=this.labels,n=this.total,r=this.pageSize,i=ee(this.current,r,n),a=this.pageSizeOptions.includes(r)?this.pageSizeOptions:[...this.pageSizeOptions,r].sort((e,t)=>e-t),o=n=>t?.pageSizeOption?.(n)??e(`pagination.pageSizeOption`,{size:n});return b`<nav
part="root"
aria-label=${this.aria.label??t?.nav??e(`pagination.nav`)}
class=${x({pagination:!0,disabled:this.disabled,small:this.size===`small`,large:this.size===`large`,circle:this.shape===`circle`,square:this.shape===`square`,[this.variant]:!0,responsive:this.responsive})}
>
${this.showTotal?b`<div
part="total"
class="total"
aria-live="polite"
aria-atomic="true"
>
${this.totalRender?this.totalRender(n,i):t?.total?.(n)??e(`pagination.total`,{total:n})}
</div>`:p}
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
</label>`:p}
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
</div>`:p}
</nav>`}},z([h({type:Number,reflect:!0})],B.prototype,`current`,void 0),z([h({type:Number})],B.prototype,`total`,void 0),z([h({type:Number,reflect:!0,attribute:`page-size`})],B.prototype,`pageSize`,void 0),z([h({type:Boolean,reflect:!0})],B.prototype,`disabled`,void 0),z([h({type:Boolean,attribute:`show-quick-jumper`})],B.prototype,`showQuickJumper`,void 0),z([h({type:Boolean,attribute:`show-size-changer`})],B.prototype,`showSizeChanger`,void 0),z([h({attribute:`page-size-options`,converter:Sr})],B.prototype,`pageSizeOptions`,void 0),z([h({type:Boolean,attribute:`show-total`})],B.prototype,`showTotal`,void 0),z([h({attribute:!1})],B.prototype,`totalRender`,void 0),z([h({attribute:!1})],B.prototype,`itemRender`,void 0),z([h({reflect:!0})],B.prototype,`size`,void 0),z([h({reflect:!0})],B.prototype,`shape`,void 0),z([h({reflect:!0})],B.prototype,`variant`,void 0),z([h({type:Boolean,reflect:!0})],B.prototype,`simple`,void 0),z([h({type:Number,attribute:`sibling-count`})],B.prototype,`siblingCount`,void 0),z([h({type:Number,attribute:`boundary-count`})],B.prototype,`boundaryCount`,void 0),z([h({type:Boolean,attribute:`hide-edges`})],B.prototype,`hideEdges`,void 0),z([h({type:Boolean,attribute:`hide-numbers`})],B.prototype,`hideNumbers`,void 0),z([h({type:Boolean,reflect:!0})],B.prototype,`responsive`,void 0),z([h({attribute:!1})],B.prototype,`labels`,void 0),z([S()],B.prototype,`jumpValue`,void 0),z([S()],B.prototype,`simpleDraft`,void 0),z([S()],B.prototype,`ripples`,void 0)})))()}function wr(e,t,n,r){let i=t==null?{base:1}:typeof t==`number`?{base:t}:t,a={},o=1;for(let t of Tr){let n=i[t]??o;(!Number.isInteger(n)||n<1||n>12)&&(k&&I(e,`columns must be integers from 1 to 12 (got ${String(n)} for "${t}"); using ${o}.`),n=o),a[`--grid-columns-${t}`]=String(n),o=n}return a[`--grid-row-gap`]=ge(n),a[`--grid-column-gap`]=ge(r),a}var Tr,Er,Dr,Or;function kr(){return(kr=e((()=>{P(),j(),O(),tr(),zt(),m(),v(),$e(),Tr=[`base`,`sm`,`md`,`lg`],Er={fromAttribute(e){if(e===null)return;let t=e.trim();if(t.startsWith(`{`))try{return JSON.parse(t)}catch{return NaN}let n=t.split(/[\s,]+/).filter(Boolean).map(Number);if(n.length<=1)return n[0]??NaN;let[r,i,a,o]=n;return{base:r,sm:i,md:a,lg:o}},toAttribute(e){return e===void 0?null:typeof e==`number`?String(e):JSON.stringify(e)}},Dr=class e extends F{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-responsive-grid`}static{this.styles=[N,g`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,L(Xn)]}render(){let t=wr(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return b`<div class="root" part="root" style=${y(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},z([h({converter:Er})],Dr.prototype,`columns`,void 0),z([h({converter:ir})],Dr.prototype,`gap`,void 0),z([h({attribute:`row-gap`,converter:ir})],Dr.prototype,`rowGap`,void 0),z([h({attribute:`column-gap`,converter:ir})],Dr.prototype,`columnGap`,void 0),Or=class extends F{constructor(...e){super(...e),this.fullWidth=!1}static{this.tagName=`minerva-grid-item`}static{this.styles=[N,g`
:host{
display: block;
min-width: 0;
}
:host([full-width]){
grid-column: 1 / -1;
}
`]}render(){return b`<slot></slot>`}},z([h({type:Boolean,reflect:!0,attribute:`full-width`})],Or.prototype,`fullWidth`,void 0)})))()}var V;function Ar(){return(Ar=e((()=>{M(),P(),R(),j(),O(),mn(),jn(),m(),v(),_(),Ze(),V=class e extends A{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-textarea`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,g`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,L(In)]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}select(){this.textarea?.select()}getFormValue(){return this.value}getValidity(){let e=this.textarea;return e?{flags:Fn(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),k&&(t.has(`minLength`)||t.has(`maxLength`))&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&I(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let e=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return b`<textarea
      part="root"
      class=${x({textarea:!0,[this.variant]:!0,[this.size]:!0,invalid:e})}
      style="resize: none"
      .value=${et(this.value)}
      name=${this.name||p}
      placeholder=${this.placeholder||p}
      rows=${this.rows??p}
      ?disabled=${this.isDisabled}
      ?readonly=${this.readOnly}
      ?required=${this.required}
      minlength=${this.minLength??p}
      maxlength=${this.maxLength??p}
      autocomplete=${this.autocomplete??p}
      wrap=${this.wrap??p}
      aria-label=${this.aria.label??p}
      aria-description=${this.aria.description??p}
      aria-invalid=${e?`true`:p}
      aria-required=${this.aria.attr(`aria-required`)??p}
      aria-readonly=${this.aria.attr(`aria-readonly`)??p}
      @input=${this.handleInput}
      @change=${this.handleChange}
    ></textarea>`}},z([h({attribute:!1})],V.prototype,`value`,void 0),z([h({attribute:`value`})],V.prototype,`defaultValue`,void 0),z([h({reflect:!0})],V.prototype,`variant`,void 0),z([h({reflect:!0})],V.prototype,`size`,void 0),z([h({type:Boolean,reflect:!0})],V.prototype,`invalid`,void 0),z([h()],V.prototype,`placeholder`,void 0),z([h({type:Boolean,reflect:!0,attribute:`readonly`})],V.prototype,`readOnly`,void 0),z([h({type:Number})],V.prototype,`rows`,void 0),z([h({type:Number,attribute:`minlength`})],V.prototype,`minLength`,void 0),z([h({type:Number,attribute:`maxlength`})],V.prototype,`maxLength`,void 0),z([h()],V.prototype,`autocomplete`,void 0),z([h()],V.prototype,`wrap`,void 0),z([C(`textarea`)],V.prototype,`textarea`,void 0)})))()}var jr;function Mr(){return(Mr=e((()=>{M(),P(),T(),R(),j(),hn(),O(),Nn(),m(),v(),_(),$e(),jr=class e extends F{constructor(...e){super(...e),this.variant=`spinner`,this.size=`medium`,this.color=`primary`,this.label=``,this.decorative=!1,this.full=!1,this.locale=new D(this),this.aria=new w(this),this.slots=new dn(this)}static{this.tagName=`minerva-progress`}static{this.styles=[N,g`
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
.wave svg{
display: block;
}
`,L(cn)]}hookStates(){return{variant:this.variant===`dottedBar`?`dotted-bar`:this.variant,size:this.size,color:this.color}}updated(){k&&this.full&&this.width&&I(e.tagName,`width is ignored when full is set.`)}renderIndicator(){let e=this.size;switch(this.variant){case`bar`:return b`<div part="indicator" class="barContainer ${e}">
<div class="bar"></div>
</div>`;case`dottedBar`:return b`<div part="indicator" class="dottedBarContainer ${e}">
<div class="dottedBar"></div>
</div>`;case`wave`:return b`<div part="indicator" class="waveContainer ${e}">
<span class="wave" aria-hidden="true">${sn}</span>
</div>`;case`circle`:return b`<span
part="indicator"
class="circle ${e}"
aria-hidden="true"
>${Dt}</span
>`;case`spinner`:return b`<span
part="indicator"
class="spinner ${e}"
aria-hidden="true"
>${At}</span
>`;default:return p}}render(){let e=this.variant===`bar`||this.variant===`dottedBar`,t=!!this.label||this.slots.test(`label`),n=this.aria.label;return b`<div
part="root"
class=${x({progressIndicator:!0,[this.color]:!0,fullWidth:this.full,defaultWidth:!this.full&&!this.width&&e})}
style=${y({width:this.width&&!this.full?this.width:void 0})}
role=${this.decorative?p:`progressbar`}
aria-hidden=${this.decorative?`true`:p}
aria-label=${this.decorative?p:n??(t?p:this.locale.t(`common.loading`))}
aria-labelledby=${!this.decorative&&!n&&t?`label`:p}
>
${this.slots.test(`icon`)?b`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:p}
${this.renderIndicator()}
${t?b`<span id="label" part="label" class="label"
><slot name="label">${this.label}</slot></span
>`:p}
</div>`}},z([h({reflect:!0})],jr.prototype,`variant`,void 0),z([h({reflect:!0})],jr.prototype,`size`,void 0),z([h({reflect:!0})],jr.prototype,`color`,void 0),z([h()],jr.prototype,`label`,void 0),z([h({type:Boolean,reflect:!0})],jr.prototype,`decorative`,void 0),z([h()],jr.prototype,`width`,void 0),z([h({type:Boolean,reflect:!0})],jr.prototype,`full`,void 0)})))()}var Nr;function Pr(){return(Pr=e((()=>{M(),T(),Ht(),R(),j(),hn(),O(),ur(),lr(),xr(),yr(),gt(),Ct(),m(),v(),_(),Nr=class extends F{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.locale=new D(this),this.aria=new w(this),this.slots=new dn(this),this.presence=new Lt(this,()=>this.panel),this.modal=new sr(this),this.focusScope=new _r(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new ar(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.triggerElement()],onFocusOutside:e=>e.preventDefault(),onEscapeKeyDown:()=>this.lastReason(`escape`),onPointerDownOutside:()=>this.lastReason(`outside`),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{let t=this.triggerElement();!e.defaultPrevented&&t&&e.composedPath().includes(t)&&this.requestOpenChange(!this.open,`trigger`)}}static{this.tagName=`minerva-modal`}static{this.styles=[N,cr,g`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,L(qt)]}lastReason(e){this.reason=e}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(Jn(this.overlay),Jn(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),ot(this.panel),ot(this.overlay)}afterClose(){ot(this.panel),ot(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description;return b`<slot name="trigger"></slot> ${e?b`<div
part="overlay"
class="overlay"
popover="manual"
data-state=${t}
aria-hidden="true"
></div>
<div
part="content"
class=${x({content:!0,[this.size]:!0})}
popover="manual"
role=${this.dialogRole}
aria-modal="true"
aria-labelledby=${n?`title`:p}
aria-label=${n?p:this.aria.label??p}
aria-describedby=${r?`description`:p}
tabindex="-1"
data-state=${t}
>
${r?b`<p
id="description"
class="description"
part="description"
>
${r}
</p>`:p}
${n?b`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:p}
<div class="body" part="body"><slot></slot></div>
${this.slots.test(`footer`)?b`<div class="footer" part="footer">
<slot name="footer"></slot>
</div>`:p}
${this.hideCloseButton?p:b`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`modal.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${Ft}
</button>`}
</div>`:p}`}},z([h({type:Boolean,reflect:!0})],Nr.prototype,`open`,void 0),z([h()],Nr.prototype,`label`,void 0),z([h()],Nr.prototype,`description`,void 0),z([h({reflect:!0})],Nr.prototype,`size`,void 0),z([h({type:Boolean,attribute:`hide-close-button`})],Nr.prototype,`hideCloseButton`,void 0),z([h({attribute:`close-label`})],Nr.prototype,`closeLabel`,void 0),z([h({attribute:`dialog-role`})],Nr.prototype,`dialogRole`,void 0),z([C(`.content`)],Nr.prototype,`panel`,void 0),z([C(`.overlay`)],Nr.prototype,`overlay`,void 0)})))()}var Fr,Ir,Lr,H;function Rr(){return(Rr=e((()=>{M(),P(),T(),R(),_n(),j(),O(),pn(),m(),v(),_(),he(),d(),Fr=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],Ir=/^\d{4}-\d{2}-\d{2}$/,Lr={fromAttribute(e){let t=e?.trim().match(/^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/);return t?te(Number(t[1]),Number(t[2])-1,1):void 0},toAttribute(e){return e instanceof Date&&!Number.isNaN(e.getTime())?l(e).slice(0,7):null}},H=class e extends F{constructor(...e){super(...e),this.events=[],this.clickableEvents=!1,this.size=`medium`,this.disabled=!1,this.hideEvents=!1,this.focusedKey=``,this.pendingFocus=null,this.i18n=new D(this),this.aria=new w(this)}static{this.tagName=`minerva-month-calendar`}static{this.styles=[N,g`
:host{
display: block;


inline-size: 100%;
}
.navButton svg{
flex-shrink: 0;
}
`,L(tt)]}get displayed(){let e=this.month;return e instanceof Date&&!Number.isNaN(e.getTime())?be(e):be(new Date)}focus(e){this.renderRoot.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus(e)}goToMonth(e){let t=be(e);l(t)!==l(this.displayed)&&(this.month=t,this.emit(`minerva-month-change`,{month:t}))}select(e){if(this.disabled)return;let t=l(e);t!==this.value&&(this.value=t,this.emit(`minerva-change`,{value:t})),we(e,this.displayed)||this.goToMonth(e)}handleKeyDown(e,t){if(this.disabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=Ke(e.key,this),r=(t.getDay()+6)%7,i;switch(n){case`ArrowLeft`:i=We(t,-1);break;case`ArrowRight`:i=We(t,1);break;case`ArrowUp`:i=We(t,-7);break;case`ArrowDown`:i=We(t,7);break;case`Home`:i=We(t,-r);break;case`End`:i=We(t,6-r);break;case`PageUp`:case`PageDown`:{let n=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),r=be(t,n),a=We(be(r,1),-1).getDate();i=te(r.getFullYear(),r.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault(),this.pendingFocus=l(i),this.focusedKey=l(i),we(i,this.displayed)||this.goToMonth(i)}willUpdate(t){k&&t.has(`value`)&&this.value&&!Ir.test(this.value)&&I(e.tagName,`value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`)}updated(){if(this.disabled||!this.pendingFocus)return;let e=this.renderRoot.querySelector(`[data-date="${this.pendingFocus}"]`);e&&(this.pendingFocus=null,e.focus())}hookStates(){return{disabled:this.disabled,size:this.size}}render(){let e=this.i18n.t,t=this.displayed,n=We(t,-((t.getDay()+6)%7)),r=Array.from({length:42},(e,t)=>We(n,t)),i=r.map(l),a=new Date,o=l(a),s=this.value||void 0,c=[this.focusedKey,s,we(a,t)?o:``,l(t)].find(e=>e&&i.includes(e)),ee=this.events??[],te=new Map;for(let e of ee)te.set(e.date,(te.get(e.date)??0)+1);let u=ee.filter(e=>e.date===s),d;try{d=new Intl.DateTimeFormat(this.locale??this.i18n.language,{year:`numeric`,month:`long`}).format(t)}catch{d=l(t).slice(0,7)}let ne=this.disabled,{rangeStart:re,rangeEnd:ie}=this,f=re&&ie&&Ir.test(re)&&Ir.test(ie)?[re,ie].sort():void 0,ae=[`small`,`medium`,`large`].includes(this.size)?this.size:`medium`;return b`<section
part="root"
class="monthCalendar ${ae}"
aria-label=${this.aria.label??e(`monthCalendar.label`)}
>
<div class="toolbar">
<h2 id="heading" part="heading" class="heading" aria-live="polite">
${d}
</h2>
<div class="navigation">
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.previousMonthLabel??e(`monthCalendar.previousMonth`)}
?disabled=${ne}
@click=${()=>this.goToMonth(be(t,-1))}
>
${Wt}
</button>
<button
type="button"
part="nav-button"
class="navButton"
?disabled=${ne}
@click=${()=>this.goToMonth(new Date)}
>
${wn} ${this.todayLabel??e(`monthCalendar.today`)}
</button>
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.nextMonthLabel??e(`monthCalendar.nextMonth`)}
?disabled=${ne}
@click=${()=>this.goToMonth(be(t,1))}
>
${ht}
</button>
</div>
</div>
<div
part="grid"
role="grid"
aria-labelledby="heading"
aria-disabled=${ne?`true`:p}
class="grid"
>
<div role="row" class="week">
${Fr.map((t,n)=>b`<div role="columnheader" class="weekday">
${this.weekdayLabels?.[n]??e(`monthCalendar.weekdays.${t}`)}
</div>`)}
</div>
${Array.from({length:6},(n,i)=>b`<div role="row" class="week">
${r.slice(i*7,i*7+7).map(n=>{let r=l(n),i=te.get(r)??0,a=this.getDayLabel?this.getDayLabel(r,i):i?e(`monthCalendar.dayWithEvents`,{date:r,count:i}):r,ee=!!f&&r>=f[0]&&r<=f[1],u={selected:s===r,today:r===o,outside:!we(n,t),disabled:ne};return b`<div
role="gridcell"
part=${an(`day`,u)}
class=${x({day:!0,inRange:ee,rangeStart:ee&&r===f?.[0],rangeEnd:ee&&r===f?.[1]})}
data-date=${r}
?data-outside=${u.outside}
aria-label=${a}
aria-selected=${String(u.selected)}
aria-current=${u.today?`date`:p}
aria-disabled=${ne?`true`:p}
tabindex=${!ne&&r===c?`0`:`-1`}
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
${u.length?b`<ul class="eventList">
${u.map(e=>b`<li class="eventItem">
${this.clickableEvents?b`<button
type="button"
part="event"
class="eventButton"
?disabled=${ne}
@click=${()=>this.emit(`minerva-event-click`,{event:e})}
>
${e.title}
</button>`:b`<span part="event">${e.title}</span>`}
</li>`)}
</ul>`:b`<p class="empty" part="empty">
${this.emptyEventsText??e(`monthCalendar.noEvents`)}
</p>`}
</section>`:p}
</section>`}},z([h({converter:Lr,reflect:!0})],H.prototype,`month`,void 0),z([h({reflect:!0})],H.prototype,`value`,void 0),z([h({attribute:!1})],H.prototype,`events`,void 0),z([h({type:Boolean,attribute:`clickable-events`})],H.prototype,`clickableEvents`,void 0),z([h({attribute:`range-start`,reflect:!0})],H.prototype,`rangeStart`,void 0),z([h({attribute:`range-end`,reflect:!0})],H.prototype,`rangeEnd`,void 0),z([h({reflect:!0})],H.prototype,`size`,void 0),z([h({type:Boolean,reflect:!0})],H.prototype,`disabled`,void 0),z([h({type:Boolean,attribute:`hide-events`})],H.prototype,`hideEvents`,void 0),z([h({attribute:`previous-month-label`})],H.prototype,`previousMonthLabel`,void 0),z([h({attribute:`next-month-label`})],H.prototype,`nextMonthLabel`,void 0),z([h({attribute:`today-label`})],H.prototype,`todayLabel`,void 0),z([h({attribute:`empty-events-text`})],H.prototype,`emptyEventsText`,void 0),z([h()],H.prototype,`locale`,void 0),z([h({attribute:!1})],H.prototype,`weekdayLabels`,void 0),z([h({attribute:!1})],H.prototype,`getDayLabel`,void 0),z([h({attribute:!1})],H.prototype,`getEventsLabel`,void 0),z([S()],H.prototype,`focusedKey`,void 0)})))()}function zr(e,t,n){for(let r of e){if(r.id===t)return!0;if(r.children&&zr(r.children,t,n))return n.add(r.id),!0}return!1}var Br,Vr,Hr;function Ur(){return(Ur=e((()=>{M(),P(),T(),Ht(),R(),_n(),j(),O(),en(),Pt(),vr(),m(),v(),_(),Qe(),Br=`.item`,Vr=`.children`,Hr=class e extends F{constructor(...e){super(...e),this.sections=[],this.collapsed=!1,this.wrapLabels=!1,this.expandedIds=[],this.explicitlyCollapsed=new Set,this.aria=new w(this),this.locale=new D(this),this.typeahead=new fr(this),this.handleNavKeyDown=e=>{if(e.defaultPrevented)return;let t=e.composedPath()[0]?.closest?.(Br);if(!t||!this.shadowRoot?.contains(t))return;let n=this.focusableItems(),r=n.indexOf(t),i;switch(this.logicalKey(e.key)){case`ArrowDown`:i=n[r+1];break;case`ArrowUp`:i=r>0?n[r-1]:void 0;break;case`Home`:i=n[0];break;case`End`:i=n[n.length-1];break;case`ArrowLeft`:if(t.getAttribute(`aria-expanded`)===`true`)return;i=t.closest(Vr)?.parentElement?.querySelector(`:scope > ${Br}`);break;default:{if(e.altKey||e.ctrlKey||e.metaKey)return;let t=this.typeahead.search(e.key,n.map(e=>({text:e.querySelector(`.label`)?.textContent??``})),r);if(t===-1)return;i=n[t]}}i&&(e.preventDefault(),i.focus())}}static{this.tagName=`minerva-nav-tree`}static{this.styles=[N,g`
:host{
display: block;
}
`,L(tn)]}activeAncestors(){let e=new Set;for(let t of this.sections)zr(t.items,this.activeId,e);return e}isExpanded(e,t){return this.expandedIds.includes(e)||!this.explicitlyCollapsed.has(e)&&t.has(e)}willUpdate(t){if(k&&t.has(`sections`)){let t=new Set,n=r=>{for(let i of r)t.has(i.id)&&I(e.tagName,`duplicate item id "${i.id}": ids must be unique.`),t.add(i.id),i.children&&n(i.children)};for(let e of this.sections??[])n(e.items??[])}}setItemExpanded(e,t){let n=new Set(this.expandedIds);t?n.add(e.id):n.delete(e.id);let r=Array.from(n),i={expandedIds:r,item:e,expanded:t};if(!this.emit(`minerva-expanded-change`,i,{cancelable:!0}))return;let a=new Set(this.explicitlyCollapsed);t?a.delete(e.id):a.add(e.id),this.explicitlyCollapsed=a,this.expandedIds=r}select(e,t){let n={value:e.id,item:e};this.emit(`minerva-select`,n,{cancelable:!0})||t?.preventDefault()}toggleItem(e){this.setItemExpanded(e,!this.isExpanded(e.id,this.activeAncestors())),this.select(e)}focusableItems(){return Array.from(this.shadowRoot?.querySelectorAll(Br)??[]).filter(e=>!e.disabled&&e.getAttribute(`aria-disabled`)!==`true`)}logicalKey(e){return e!==`ArrowLeft`&&e!==`ArrowRight`||ce(this)!==`rtl`?e:e===`ArrowLeft`?`ArrowRight`:`ArrowLeft`}renderSectionTitle(e){return b`<h2 part="group-label" class="sectionTitle">${e}</h2>`}renderContent(e,t){return b`<span part="icon" class="icon" aria-hidden="true"
>${e.icon??p}</span
><span class="copy"
><span part="label" class="label">${e.label}</span>${e.description?b`<small part="description" class="description"
>${e.description}</small
>`:p}</span
>${!this.collapsed&&(e.endContent||t)?b`<span class="trailing"
>${e.endContent?b`<span class="end">${e.endContent}</span>`:p}${t?b`<span class="chevron" aria-hidden="true"
>${Kt}</span
>`:p}</span
>`:p}`}renderItem(t,n,r){let i=!!t.children?.length,a=t.id===this.activeId,o=r.has(t.id),s=i&&this.isExpanded(t.id,r),c=!!t.disabled,l={item:!0,nested:n>0,active:a,disabled:c},ee=Object.entries(l).filter(([,e])=>e).map(([e])=>e).join(` `),te=t.description?`${t.label} / ${t.description}`:t.label,u=this.renderContent(t,i);if(i)return b`<div class="branch">
<button
part=${an(`item`,{current:a,expanded:s,disabled:c})}
class=${x(l)}
type="button"
title=${te}
aria-expanded=${s?`true`:`false`}
data-id=${t.id}
?data-current=${a}
data-ancestor-active=${o?`true`:p}
?data-expanded=${s}
?disabled=${c}
@click=${()=>this.toggleItem(t)}
@keydown=${e=>{if(this.collapsed)return;let n=this.logicalKey(e.key);n===`ArrowRight`?(e.preventDefault(),s?e.currentTarget.parentElement?.querySelector(`${Vr} ${Br}`)?.focus():this.setItemExpanded(t,!0)):n===`ArrowLeft`&&s&&(e.preventDefault(),this.setItemExpanded(t,!1))}}
>
${u}
</button>
${s&&!this.collapsed?b`<div class="children">
${Xe(t.children??[],e=>e.id,e=>this.renderItem(e,n+1,r))}
</div>`:p}
</div>`;if(this.renderLink)return this.renderLink(t,u,{active:a,ancestorActive:o,expanded:!1,depth:n,collapsed:this.collapsed,hasChildren:i,disabled:c,className:ee});let d=an(`item`,{current:a,disabled:c});return c?b`<span
part=${d}
class=${x(l)}
title=${te}
data-id=${t.id}
?data-current=${a}
role="link"
aria-disabled="true"
>${u}</span
>`:t.href===void 0?b`<button
part=${d}
class=${x(l)}
type="button"
title=${te}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:p}
@click=${()=>this.select(t)}
>
${u}
</button>`:b`<a
part=${d}
class=${x(l)}
href=${Qt(e.tagName,t.href)??p}
title=${te}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:p}
@click=${e=>this.select(t,e)}
>${u}</a
>`}render(){let e=this.activeAncestors(),t=this.getAttribute(`aria-labelledby`);return b`<nav
part="root"
class=${x({navTree:!0,collapsed:this.collapsed,wrapLabels:this.wrapLabels&&!this.collapsed})}
aria-label=${this.aria.label??(t?p:this.locale.t(`navTree.label`))}
@keydown=${this.handleNavKeyDown}
>
${Xe(this.sections??[],e=>e.id,t=>b`<section part="group" class="section">
${t.title?this.renderSectionTitle(t.title):p}
<div class="list">
${Xe(t.items,e=>e.id,t=>this.renderItem(t,0,e))}
</div>
</section>`)}
</nav>`}},z([h({attribute:!1})],Hr.prototype,`sections`,void 0),z([h({attribute:`active-id`,reflect:!0})],Hr.prototype,`activeId`,void 0),z([h({type:Boolean,reflect:!0})],Hr.prototype,`collapsed`,void 0),z([h({type:Boolean,reflect:!0,attribute:`wrap-labels`})],Hr.prototype,`wrapLabels`,void 0),z([h({attribute:!1})],Hr.prototype,`expandedIds`,void 0),z([h({attribute:!1})],Hr.prototype,`renderLink`,void 0),z([S()],Hr.prototype,`explicitlyCollapsed`,void 0)})))()}var Wr,U;function Gr(){return(Gr=e((()=>{M(),P(),T(),R(),j(),O(),mn(),Xt(),m(),v(),_(),d(),Ze(),Wr={fromAttribute:e=>e===null||e.trim()===``||Number.isNaN(Number(e))?null:Number(e),toAttribute:e=>e===null?null:String(e)},U=class e extends A{constructor(...e){super(...e),this.value=null,this.defaultValue=null,this.step=1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.showStepper=!1,this.noEmpty=!1,this.placeholder=``,this.draft=``,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-number-input`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,g`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,L($t)]}get resolvedPrecision(){return this.precision??t(this.step)}get locked(){return this.isDisabled||this.readOnly}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}stepUp(){this.value=this.stepped(this.step)}stepDown(){this.value=this.stepped(-this.step)}getFormValue(){return i(this.value,this.resolvedPrecision)}getValidity(){let{t:e}=this.locale,t=this.input,n=this.draft.trim();if(n&&n!==`-`&&n!==`.`){let r=Be(n);return r===null?{flags:{badInput:!0},message:this.notANumberMessage??e(`numberInput.notANumber`),anchor:t}:this.min!==void 0&&r<this.min?{flags:{rangeUnderflow:!0},message:this.belowMinMessage??e(`validation.rangeUnderflow`,{min:this.min}),anchor:t}:this.max!==void 0&&r>this.max?{flags:{rangeOverflow:!0},message:this.aboveMaxMessage??e(`validation.rangeOverflow`,{max:this.max}),anchor:t}:{flags:{},message:``}}return this.required&&this.value===null?{flags:{valueMissing:!0},message:e(`validation.valueMissing`),anchor:t}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.draft=i(this.value,this.resolvedPrecision)}restoreFormState(e){typeof e==`string`&&(this.value=Be(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)||t.has(`precision`)||t.has(`step`)){let e=Be(this.draft);(e===null||e!==this.value)&&(this.draft=i(this.value,this.resolvedPrecision))}k&&(t.has(`min`)||t.has(`max`))&&this.min!==void 0&&this.max!==void 0&&this.min>this.max&&I(e.tagName,`min (${this.min}) is greater than max (${this.max}): every value is clamped.`)}stepped(e){let t=Be(this.draft)??this.value??0;return Number(me(t+e,this.min,this.max).toFixed(this.resolvedPrecision))}commitValue(e){let t=this.resolvedPrecision,n=e===null?null:Number(e.toFixed(t));this.draft=i(n,t),n!==this.value&&(this.dirty=!0,this.value=n,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:n}))}commit(e){if(this.locked)return;let t=e.trim();if(t===``||t===`-`){this.noEmpty?this.commitValue(me(this.min??0,this.min,this.max)):this.commitValue(null);return}let n=Be(t);if(n===null){this.draft=i(this.value,this.resolvedPrecision);return}this.commitValue(me(n,this.min,this.max))}adjust(e){this.locked||this.commitValue(this.stepped(e))}handleInput(){this.draft=String(this.input.value),this.emit(`minerva-input`,{value:Be(this.draft)})}handleKeyDown(e){if(this.locked||e.defaultPrevented)return;let{key:t}=e;t===`ArrowUp`||t===`ArrowDown`?(e.preventDefault(),this.adjust(t===`ArrowUp`?this.step:-this.step)):t===`PageUp`||t===`PageDown`?(e.preventDefault(),this.adjust((t===`PageUp`?10:-10)*this.step)):t===`Home`&&this.min!==void 0?(e.preventDefault(),this.commitValue(this.min)):t===`End`&&this.max!==void 0?(e.preventDefault(),this.commitValue(this.max)):t===`Enter`&&this.input.blur()}handleBlur(){this.commit(String(this.input.value))}draftError(){let{t:e}=this.locale,t=this.draft.trim();if(!t||t===`-`||t===`.`)return;let n=Be(t);if(n===null)return this.notANumberMessage??e(`numberInput.notANumber`);if(this.min!==void 0&&n<this.min)return this.belowMinMessage??e(`numberInput.belowMin`,{min:this.min});if(this.max!==void 0&&n>this.max)return this.aboveMaxMessage??e(`numberInput.aboveMax`,{max:this.max})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.draftError()!==void 0||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.locked,r=this.draftError(),i=r!==void 0,a=this.invalid||i||this.aria.attr(`aria-invalid`)===`true`,o=this.value??0;return b`<div
part="root"
class=${x({root:!0,[this.size]:!0,invalid:a,shake:i,disabled:t})}
title=${r??p}
>
<input
part="input"
class="field"
type="text"
inputmode="decimal"
role="spinbutton"
.value=${et(this.draft)}
placeholder=${this.placeholder||p}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
aria-valuemin=${this.min??p}
aria-valuemax=${this.max??p}
aria-valuenow=${this.value??p}
aria-label=${this.aria.label??p}
aria-description=${this.aria.description??p}
aria-invalid=${a?`true`:p}
aria-required=${this.aria.attr(`aria-required`)??p}
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
${nn}
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
${Kt}
</button>
</div>`:p}
</div>`}},z([h({attribute:!1})],U.prototype,`value`,void 0),z([h({attribute:`value`,converter:Wr})],U.prototype,`defaultValue`,void 0),z([h({type:Number})],U.prototype,`min`,void 0),z([h({type:Number})],U.prototype,`max`,void 0),z([h({type:Number})],U.prototype,`step`,void 0),z([h({type:Number})],U.prototype,`precision`,void 0),z([h({reflect:!0})],U.prototype,`size`,void 0),z([h({type:Boolean,reflect:!0})],U.prototype,`invalid`,void 0),z([h({type:Boolean,reflect:!0,attribute:`readonly`})],U.prototype,`readOnly`,void 0),z([h({type:Boolean,attribute:`show-stepper`})],U.prototype,`showStepper`,void 0),z([h({type:Boolean,attribute:`no-empty`})],U.prototype,`noEmpty`,void 0),z([h()],U.prototype,`placeholder`,void 0),z([h({attribute:`increment-label`})],U.prototype,`incrementLabel`,void 0),z([h({attribute:`decrement-label`})],U.prototype,`decrementLabel`,void 0),z([h({attribute:`not-a-number-message`})],U.prototype,`notANumberMessage`,void 0),z([h({attribute:`below-min-message`})],U.prototype,`belowMinMessage`,void 0),z([h({attribute:`above-max-message`})],U.prototype,`aboveMaxMessage`,void 0),z([S()],U.prototype,`draft`,void 0),z([C(`input`)],U.prototype,`input`,void 0)})))()}var Kr,qr,Jr,Yr,Xr;function Zr(){return(Zr=e((()=>{M(),P(),j(),hn(),O(),tr(),bt(),m(),v(),_(),$e(),Kr=class extends F{static{this.tagName=`minerva-page`}static{this.styles=[N,L(Ln),g`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.maxWidth===void 0||this.maxWidth===``?void 0:le(this.maxWidth);return b`<div class="page" part="root" style=${y({maxWidth:e})}>
<slot></slot>
</div>`}},z([h({attribute:`max-width`,converter:ir})],Kr.prototype,`maxWidth`,void 0),qr=class extends F{constructor(...e){super(...e),this.heading=``,this.description=``,this.slots=new dn(this)}static{this.tagName=`minerva-page-header`}static{this.styles=[N,L(Ln),g`
:host{
display: block;
min-width: 0;
}
`]}updated(){k&&!this.heading&&!this.slots.test(`heading`)&&I(this.constructor.tagName,`set the heading attribute (or fill the heading slot): the heading names the region.`)}renderHeading(){let e=!!this.description||this.slots.test(`description`);return b`<div class="heading">
<h1 part="title"><slot name="heading">${this.heading}</slot></h1>
${e?b`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:p}
</div>`}renderActions(){return this.slots.test(`actions`)?b`<div class="actions" part="actions">
<slot name="actions"></slot>
</div>`:p}render(){return b`<header class="header" part="root">
${this.renderHeading()} ${this.renderActions()}
</header>`}},z([h()],qr.prototype,`heading`,void 0),z([h()],qr.prototype,`description`,void 0),Jr=class extends qr{static{this.tagName=`minerva-page-section`}static{this.styles=[N,L(Ln),g`
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
></span>`:p}<slot name="heading">${this.heading}</slot>
</h2>
${e?b`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:p}
</div>`}render(){return b`<section class="section" part="root" aria-labelledby="heading">
<div class="sectionHeader" part="header">
${this.renderHeading()} ${this.renderActions()}
</div>
<slot></slot>
</section>`}},Yr=class extends F{constructor(...e){super(...e),this.nowrap=!1,this.density=`default`,this.aria=new w(this)}static{this.tagName=`minerva-toolbar`}static{this.styles=[N,L(Ln),g`
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
aria-label=${this.aria.label??p}
aria-description=${this.aria.description??p}
class=${x({toolbar:!0,compact:this.density===`compact`,nowrap:this.nowrap})}
>
<slot></slot>
</div>`}},z([h({type:Boolean,reflect:!0})],Yr.prototype,`nowrap`,void 0),z([h({reflect:!0})],Yr.prototype,`density`,void 0),Xr=class extends F{constructor(...e){super(...e),this.label=``,this.value=``,this.slots=new dn(this)}static{this.tagName=`minerva-stat-card`}static{this.styles=[N,L(Ln),g`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.description!==void 0&&this.description!==null||this.slots.test(`description`);return b`<div class="statCard" part="root">
${this.slots.test(`icon`)?b`<span class="statIcon" part="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:p}
<div class="statContent">
<dl>
<dt part="label"><slot name="label">${this.label}</slot></dt>
<dd part="value"><slot name="value">${this.value}</slot></dd>
</dl>
${e?b`<p class="statDescription" part="description">
<slot name="description">${this.description}</slot>
</p>`:p}
</div>
</div>`}},z([h()],Xr.prototype,`label`,void 0),z([h()],Xr.prototype,`value`,void 0),z([h()],Xr.prototype,`description`,void 0)})))()}var Qr,$r,ei;function ti(){return(ti=e((()=>{M(),P(),T(),Ht(),R(),j(),hn(),O(),bn(),xt(),m(),v(),_(),Qr=(e,t)=>({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:e,[t]:!0}),$r=class e extends F{constructor(...e){super(...e),this.scrollState={overflow:!1,left:!1,right:!1,rtl:!1},this.aria=new w(this),this.locale=new D(this),this.slots=new dn(this),this.focused=null,this.previousItems=null,this.movedWith=null,this.mutations=null,this.resize=null,this.handleFocusIn=e=>{let t=e.target;this.focused=t instanceof ei&&this.items.includes(t)?t:null},this.handleSelect=e=>{let t=e.target;t instanceof ei&&this.items.includes(t)&&!e.defaultPrevented&&queueMicrotask(()=>{e.defaultPrevented||(this.activeValue=t.value)})},this.measure=()=>{let e=this.viewport;if(!e)return;let t=ce(this)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t},i=this.scrollState;(i.overflow!==r.overflow||i.left!==r.left||i.right!==r.right||i.rtl!==r.rtl)&&(this.scrollState=r)}}static{this.tagName=`minerva-page-tabs`}static{this.styles=[N,g`
:host{
display: block;
min-width: 0;
}
`,L(An),L(pt)]}get items(){return Array.from(this.children).filter(e=>e instanceof ei)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`minerva-select`,this.handleSelect),typeof MutationObserver<`u`&&(this.mutations=new MutationObserver(()=>this.itemsChanged()),this.mutations.observe(this,{childList:!0,attributes:!0,attributeFilter:[`value`,`active`,`disabled`],subtree:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`minerva-select`,this.handleSelect),this.mutations?.disconnect(),this.mutations=null,this.resize?.disconnect(),this.resize=null}firstUpdated(){this.observeViewport()}reconnectedCallback(){super.reconnectedCallback(),this.observeViewport()}observeViewport(){this.resize||typeof ResizeObserver>`u`||(this.resize=new ResizeObserver(()=>this.revealActive()),this.resize.observe(this.viewport))}updated(t){k&&!this.aria.label&&I(e.tagName,`set aria-label (e.g. "Open pages") to name the navigation landmark.`),t.has(`activeValue`)&&this.itemsChanged();let n=this.movedWith;if(n){let e=n===`left`?this.leftButton:this.rightButton;if(e?.disabled){this.movedWith=null;let t=this.shadowRoot?.activeElement;(!t||t===e)&&(n===`left`?this.rightButton:this.leftButton)?.focus({preventScroll:!0})}}}itemsChanged(){let e=this.items;if(this.activeValue!==void 0)for(let t of e)t.active=t.value===this.activeValue;let t=JSON.stringify([this.activeValue,...e.map(e=>[e.value,e.active])]);t!==this.previousItems&&(this.previousItems=t,this.revealActive());let n=this.focused;if(n&&!n.isConnected){this.focused=null;let t=document.activeElement;(!t||t===document.body||!t.isConnected)&&e.find(e=>e.active)?.focus({preventScroll:!0})}}revealActive(){let e=this.viewport;if(!e)return;let t=this.items.find(e=>e.active),n=t?.surface;if(t&&!n&&t.updateComplete.then(()=>{t.surface&&this.revealActive()}),n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();r.width>t.width?e.scrollLeft+=r.left-t.left:r.left<t.left?e.scrollLeft-=t.left-r.left:r.right>t.right&&(e.scrollLeft+=r.right-t.right)}this.measure()}move(e){let t=this.viewport;t&&(this.movedWith=e<0?`left`:`right`,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),this.measure())}renderScrollButton(e){let t=e===`left`,n=t?this.scrollLeftLabel??this.locale.t(`pageTabs.scrollLeft`):this.scrollRightLabel??this.locale.t(`pageTabs.scrollRight`),r=t?!this.scrollState.left:!this.scrollState.right;return b`<button
type="button"
part="scroll-button"
class=${x({...Qr(r,`scroll`),[`scroll-${e}`]:!0})}
aria-label=${n}
?disabled=${r}
tabindex=${r?-1:0}
@click=${()=>this.move(t?-1:1)}
>
${t?Wt:ht}
</button>`}render(){let{overflow:e,rtl:t}=this.scrollState,n=()=>this.renderScrollButton(`left`),r=()=>this.renderScrollButton(`right`);return b`<nav
part="root"
class="pageTabs"
aria-label=${this.aria.label??p}
>
${e?t?r():n():p}
<div part="viewport" class="viewport" @scroll=${this.measure}>
<div part="list" class="list">
<slot @slotchange=${()=>this.itemsChanged()}></slot>
</div>
</div>
${e?t?n():r():p}
${this.slots.test(`actions`)?b`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:p}
</nav>`}},z([h({reflect:!0,attribute:`active-value`})],$r.prototype,`activeValue`,void 0),z([h({attribute:`scroll-left-label`})],$r.prototype,`scrollLeftLabel`,void 0),z([h({attribute:`scroll-right-label`})],$r.prototype,`scrollRightLabel`,void 0),z([S()],$r.prototype,`scrollState`,void 0),z([C(`.viewport`)],$r.prototype,`viewport`,void 0),z([C(`.scroll-left`)],$r.prototype,`leftButton`,void 0),z([C(`.scroll-right`)],$r.prototype,`rightButton`,void 0),ei=class e extends F{constructor(...e){super(...e),this.value=``,this.label=``,this.active=!1,this.disabled=!1,this.closable=!1,this.locale=new D(this),this.slots=new dn(this)}static{this.tagName=`minerva-page-tab`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,g`
:host{
display: contents;
}
.icon ::slotted(svg){
width: 16px;
height: 16px;
}
`,L(An),L(pt)]}get surface(){return this.wrapper??null}focus(e){this.trigger?.focus(e)}handleSelect(){this.disabled||this.emit(`minerva-select`,{value:this.value},{cancelable:!0})}handleClose(){this.emit(`minerva-close`,{value:this.value})}hookStates(){return{current:this.active,disabled:this.disabled}}updated(){k&&!this.label&&I(e.tagName,`set label to name the page.`)}render(){return b`<div
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
title=${this.label||p}
aria-current=${this.active?`page`:p}
?disabled=${this.disabled}
@click=${this.handleSelect}
>
${this.slots.test(`icon`)?b`<span part="icon" class="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:p}
<span part="label" class="label">${this.label}</span>
</button>
${this.closable||this.slots.test(`action`)?b`<span part="action" class="action"
><slot name="action"></slot>${this.closable?b`<button
type="button"
part="close-button"
class=${x(Qr(!1,`close`))}
aria-label=${this.closeLabel??this.locale.t(`pageTabs.close`,{label:this.label,defaultValue:`Close {{label}}`})}
@click=${this.handleClose}
>
${Ft}
</button>`:p}</span
>`:p}
</div>`}},z([h({reflect:!0})],ei.prototype,`value`,void 0),z([h()],ei.prototype,`label`,void 0),z([h({type:Boolean,reflect:!0})],ei.prototype,`active`,void 0),z([h({type:Boolean,reflect:!0})],ei.prototype,`disabled`,void 0),z([h({type:Boolean,reflect:!0})],ei.prototype,`closable`,void 0),z([h({attribute:`close-label`})],ei.prototype,`closeLabel`,void 0),z([C(`.trigger`)],ei.prototype,`trigger`,void 0),z([C(`.pageTab`)],ei.prototype,`wrapper`,void 0)})))()}function ni(e,t,n,r){let i=Ee(t).filter(t=>t===e||!r||!f(r,t)),a=i.indexOf(e);return a===-1?null:(n?i[a-1]:i[a+1])??null}var ri,ii,W;function ai(){return(ai=e((()=>{M(),P(),Ht(),j(),O(),ur(),mr(),lr(),xr(),yr(),Ct(),Jt(),m(),v(),he(),ri=10,ii=5,W=class e extends F{constructor(...e){super(...e),this.open=!1,this.modal=!1,this.side=`bottom`,this.align=`center`,this.sideOffset=6,this.alignOffset=0,this.collisionPadding=8,this.matchAnchorWidth=!1,this.arrow=!1,this.label=``,this.anchorElement=null,this.anchor=``,this.aria=new w(this),this.presence=new Lt(this,()=>this.panel),this.modalController=new sr(this),this.position=new dr(this,()=>({placement:Ae(this.side,this.align),offset:{mainAxis:this.sideOffset+(this.arrow?ii:0),crossAxis:this.alignOffset},matchAnchorWidth:this.matchAnchorWidth||!1,padding:this.collisionPadding,arrowElement:this.arrow?this.arrowEl??null:null,arrowSize:ri,onPosition:e=>{let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`)}})),this.layer=new ar(this,()=>({disableOutsidePointerEvents:this.modal,branches:()=>[this.triggerElement()],onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onFocusOutside:()=>(this.reason=`focus-outside`,!this.modal),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.focusScope=new _r(this,()=>({trapped:this.modal,loop:this.modal,restoreFocus:this.triggerElement()??!0})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-popover-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)},this.handleKeyDown=e=>{let t=this.panel,n=this.triggerElement();if(this.modal||!t||!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||e.defaultPrevented)return;let r=e.shiftKey,i=Ue(document);if(!i||!f(t,i))return;let a=Ee(t);if(!(a.length===0||(r?i===t||i===a[0]:i===a[a.length-1])))return;e.preventDefault();let o=ni(n,this.tabContainer(),r,this.positioner)??n;this.requestOpenChange(!1,`tab`),this.open||o.focus()}}static{this.tagName=`minerva-popover`}static{this.styles=[N,cr,g`
:host{
display: contents;
}
`,L(Ut)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorTarget(){if(this.anchorElement)return this.anchorElement;if(this.anchor){let e=this.getRootNode().getElementById?.(this.anchor);if(e)return e}return this.triggerElement()??this}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}tabContainer(){return s().find(e=>e.element===this.positioner)?.parent??document.body}syncTrigger(){let e=this.triggerElement();e&&(e.setAttribute(`aria-haspopup`,`dialog`),e.setAttribute(`aria-expanded`,String(this.open)),e.setAttribute(`data-state`,this.open?`open`:`closed`))}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.deactivate(),ot(this.positioner)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}firstUpdated(){k&&!this.triggerElement()&&!this.anchor&&!this.anchorElement&&I(e.tagName,`no slot="trigger" element nor anchor: the panel is anchored to the element itself and nothing opens it.`)}deactivate(){this.focusScope.deactivate(),this.layer.deactivate(),this.modalController.deactivate()}updated(e){this.syncTrigger();let t=this.open||this.presence.present,n=this.positioner;if(t&&n&&!this.position.running){Jn(n);let e=this.anchorTarget();e&&this.position.start(e,n)}e.has(`open`)&&(this.open&&n?(this.modal&&this.modalController.activate(this),this.layer.activate(n),this.focusScope.activate(n),this.emit(`minerva-after-open`)):this.open||this.deactivate()),this.wasPresent&&!t&&(this.position.end(),ot(n),this.emit(`minerva-after-close`)),this.wasPresent=t}hookStates(){let e=this.position.placement,{side:t,align:n}=Ie(e);return{state:this.open?`open`:`closed`,side:t,align:n,placement:e}}render(){if(!(this.open||this.presence.present))return b`<slot name="trigger"></slot>`;let{side:e,align:t}=Ie(this.position.placement),n=this.open?`open`:`closed`,r=this.label||this.aria.label,i=this.isConnected?ce(this):`ltr`;return b`<slot name="trigger"></slot>
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
aria-modal=${this.modal?`true`:p}
aria-label=${r||p}
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
width=${ri}
height=${ii}
viewBox="0 0 30 10"
preserveAspectRatio="none"
>
<polygon points="0,0 30,0 15,10"></polygon>
</svg>
</span>`:p}
</div>
</div>`}},z([h({type:Boolean,reflect:!0})],W.prototype,`open`,void 0),z([h({type:Boolean,reflect:!0})],W.prototype,`modal`,void 0),z([h({reflect:!0})],W.prototype,`side`,void 0),z([h({reflect:!0})],W.prototype,`align`,void 0),z([h({type:Number,attribute:`side-offset`})],W.prototype,`sideOffset`,void 0),z([h({type:Number,attribute:`align-offset`})],W.prototype,`alignOffset`,void 0),z([h({type:Number,attribute:`collision-padding`})],W.prototype,`collisionPadding`,void 0),z([h({attribute:`match-anchor-width`})],W.prototype,`matchAnchorWidth`,void 0),z([h({type:Boolean,reflect:!0})],W.prototype,`arrow`,void 0),z([h()],W.prototype,`label`,void 0),z([h({attribute:!1})],W.prototype,`anchorElement`,void 0),z([h()],W.prototype,`anchor`,void 0),z([C(`.positioner`)],W.prototype,`positioner`,void 0),z([C(`.content`)],W.prototype,`panel`,void 0),z([C(`[part=arrow]`)],W.prototype,`arrowEl`,void 0)})))()}var oi;function si(){return(si=e((()=>{oi=`minerva-prose{min-width:0;max-width:100%;color:var(--text-color,#1f2937);font-family:var(--font-family-sans,system-ui, -apple-system, "Segoe UI", sans-serif);font-size:var(--prose-font-size,var(--font-size-lg,1rem));font-weight:var(--font-weight-regular,400);font-style:normal;line-height:var(--line-height-relaxed,1.7);letter-spacing:0;overflow-wrap:anywhere}minerva-prose :where(h1,h2,h3,h4,h5,h6){color:inherit;font-family:inherit;font-style:inherit;font-weight:var(--font-weight-semibold,600);letter-spacing:0;background:0 0;border:0;margin:1.5em 0 .5em;padding:0;line-height:1.35}minerva-prose :where(h1){font-size:var(--font-size-3xl,1.75rem)}minerva-prose :where(h2){font-size:var(--font-size-2xl,1.375rem)}minerva-prose :where(h3){font-size:var(--font-size-xl,1.125rem)}minerva-prose :where(h4){font-size:var(--font-size-lg,1rem)}minerva-prose :where(h5,h6){font-size:var(--font-size-md,.875rem)}minerva-prose :where(h6){color:var(--text-muted-color,#6b7280)}minerva-prose :where(p,ul,ol,li,blockquote){font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;line-height:inherit;letter-spacing:inherit}minerva-prose :where(p){background:0 0;border:0;padding:0}minerva-prose :where(p,ul,ol,blockquote,pre,table,figure){margin:1em 0}minerva-prose>:first-child{margin-top:0}minerva-prose>:last-child{margin-bottom:0}minerva-prose :where(ul,ol){padding:0;padding-inline-start:1.5em}minerva-prose :where(li){margin:.25em 0}minerva-prose :where(li>ul,li>ol,li>p){margin-block:.25em}minerva-prose :where(blockquote){border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-code-bg,var(--control-color,#f6f7f9));color:inherit;border:1px solid #0000;padding:.5em 1em}minerva-prose :where(a){color:var(--primary-color-text,#1e4fbd);text-underline-offset:.18em;text-decoration:underline;text-decoration-thickness:1px}minerva-prose :where(a:hover){text-decoration-thickness:2px}minerva-prose :where(a:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:3px}minerva-prose :where(code,kbd,samp){font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);font-size:.875em}minerva-prose :where(code){border-radius:calc(var(--prose-radius,var(--radius-sm,4px)) - 1px);background:var(--prose-code-bg,var(--control-color,#f6f7f9));padding:.12em .3em}minerva-prose :where(pre){max-width:100%;padding:var(--space-4,1rem);border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-pre-bg,var(--surface-elevated-color,#fff));color:var(--text-color,#1f2937);font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);line-height:var(--line-height-base,1.5);white-space:pre;overflow-wrap:normal;tab-size:2;overflow-x:auto}minerva-prose :where(pre code){color:inherit;white-space:pre;background:0 0;border:0;border-radius:0;padding:0}minerva-prose :where(pre:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:2px}minerva-prose :where(.hljs-comment,.hljs-quote){color:var(--text-muted-color,#6b7280)}minerva-prose :where(.hljs-keyword,.hljs-selector-tag,.hljs-name,.hljs-tag,.hljs-attr,.hljs-attribute,.hljs-doctag){color:var(--primary-color-text,#1e4fbd)}minerva-prose :where(.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-regexp,.hljs-type,.hljs-literal){color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-number,.hljs-title,.hljs-section,.hljs-built_in,.hljs-meta,.hljs-variable){color:var(--warning-color-text,#b45309)}minerva-prose :where(.hljs-subst,.hljs-operator,.hljs-punctuation,.hljs-params){color:var(--text-color,#1f2937)}minerva-prose :where(.hljs-addition){background:var(--success-color-subtle,#e7f6ec);color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-deletion){background:var(--danger-color-subtle,#fcebeb);color:var(--danger-color-text,#b91c1c)}minerva-prose :where(.hljs-strong){font-weight:var(--font-weight-bold,700)}minerva-prose :where(.hljs-emphasis){font-style:italic}minerva-prose :where(mark){background:var(--warning-color-subtle,#fdf3e1);color:inherit}minerva-prose :where(img,video){max-width:100%;height:auto}minerva-prose :where(figure){max-width:100%}minerva-prose :where(figcaption){margin-top:var(--space-2,.5rem);font-size:var(--font-size-md,.875rem);color:var(--text-muted-color,#6b7280)}minerva-prose :where(table){border-collapse:collapse;width:100%;color:inherit;overflow-wrap:normal;display:table}minerva-prose :where(tr){background:0 0;border:0}minerva-prose :where(th,td){border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));text-align:start;vertical-align:top;white-space:normal;padding:.5em .75em}minerva-prose :where(th){background:var(--prose-code-bg,var(--control-color,#f6f7f9));font-weight:var(--font-weight-semibold,600)}minerva-prose :where(th>p,td>p){margin:0}minerva-prose :where(hr){background:var(--prose-border-color,var(--border-color,#d9dde3));border:0;height:1px;margin:1.5em 0;padding:0}@media (forced-colors:active){minerva-prose :where(hr){forced-color-adjust:none;background:canvastext}}minerva-prose :where(sub,sup){font-size:.75em;line-height:0}@media print{minerva-prose :where(pre){overflow:visible}minerva-prose :where(pre,pre code){white-space:pre-wrap;overflow-wrap:anywhere}minerva-prose :where(pre,blockquote,figure,img,tr){break-inside:avoid}}`})))()}function ci(){if(fi!==void 0)return fi;fi=null;try{if(typeof CSSStyleSheet<`u`&&`replaceSync`in CSSStyleSheet.prototype){let e=new CSSStyleSheet;e.replaceSync(oi),fi=e}}catch{fi=null}return fi}function li(e){if(di.has(e))return;di.add(e);let t=ci();if(t&&`adoptedStyleSheets`in e)try{e.adoptedStyleSheets=[...e.adoptedStyleSheets,t];return}catch{}let n=e.nodeType===9?e:e.ownerDocument;if(!n)return;let r=e.nodeType===9?n.head??n.documentElement:e;if(r.querySelector?.(`#${ui}`))return;let i=n.createElement(`style`);i.id=ui,i.textContent=oi,r.appendChild(i)}var ui,di,fi,pi;function mi(){return(mi=e((()=>{j(),si(),m(),ui=`minerva-prose-styles`,di=new WeakSet,pi=class extends F{static{this.tagName=`minerva-prose`}static{this.styles=[N,g`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback();let e=this.getRootNode();(e.nodeType===9||e.nodeType===11)&&li(e)}render(){return b`<slot></slot>`}}})))()}var hi,G,gi;function _i(){return(_i=e((()=>{Ot(),M(),P(),T(),Ht(),R(),Gn(),j(),hn(),O(),mn(),mt(),br(),m(),v(),_(),hi=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Home`,`End`]),G=class extends F{constructor(...e){super(...e),this.hostInternals=Qn(this),this.ownedAria=new Set,this.value=``,this.checked=!1,this.disabled=!1,this.label=``,this.size=`medium`,this.color=`primary`,this.error=!1,this.helperText=``,this.errorMessage=``,this.slots=new dn(this),this.ownsDescription=!1,this.handleClick=e=>{if(this.isDisabled){e.preventDefault(),e.stopImmediatePropagation();return}this.group||this.checked||(this.checked=!0,this.emit(`minerva-change`,{checked:!0,value:this.value}))},this.handleKeyDown=e=>{e.key===` `&&(e.preventDefault(),this.isDisabled||this.click())}}static{this.tagName=`minerva-radio`}static{this.styles=[N,g`
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
`,L(Gt)]}get group(){let e=this.parentElement?.closest(`minerva-radio-group`);return e instanceof gi?e:null}get isDisabled(){return this.disabled||!!this.group?.isDisabled}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick),this.addEventListener(`keydown`,this.handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.removeEventListener(`keydown`,this.handleKeyDown)}updated(){let e=this.isDisabled;jt(this,this.hostInternals,{role:`radio`,ariaChecked:String(this.checked),ariaDisabled:e?`true`:null},this.ownedAria),this.group||E(this,`tabindex`,e?`-1`:`0`);let t=this.error?this.errorMessage:this.helperText;t&&(this.ownsDescription||!this.hasAttribute(`aria-description`))?(this.ownsDescription=!0,E(this,`aria-description`,t)):!t&&this.ownsDescription&&(this.ownsDescription=!1,E(this,`aria-description`,null))}hookStates(){let e=this.group;return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error,size:e?.size??this.size,color:e?.color??this.color}}render(){let e=this.group,t=e?.size??this.size,n=e?.color??this.color,r=this.error?this.errorMessage:this.helperText,i=!!this.label||this.slots.test(`[default]`);return b`<div
part="root"
class=${x({radioWrapper:!0,[t]:!0,[n]:!0,error:this.error})}
>
<span class=${x({radio:!0,disabled:this.isDisabled})}>
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
>`:p}
</span>
${r?b`<div class="helperTextWrapper" aria-hidden="true">
${this.error&&this.errorMessage?b`<span class="errorIcon">${Nt}</span>`:p}
<span
part="helper-text"
class=${x({helperText:!0,errorText:this.error})}
>${r}</span
>
</div>`:p}
</div>`}},z([h()],G.prototype,`value`,void 0),z([h({type:Boolean,reflect:!0})],G.prototype,`checked`,void 0),z([h({type:Boolean,reflect:!0})],G.prototype,`disabled`,void 0),z([h()],G.prototype,`label`,void 0),z([h({reflect:!0})],G.prototype,`size`,void 0),z([h({reflect:!0})],G.prototype,`color`,void 0),z([h({type:Boolean,reflect:!0})],G.prototype,`error`,void 0),z([h({attribute:`helper-text`})],G.prototype,`helperText`,void 0),z([h({attribute:`error-message`})],G.prototype,`errorMessage`,void 0),gi=class e extends A{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.label=``,this.helperText=``,this.error=!1,this.direction=`vertical`,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.roving=new hr(this,()=>({getItems:()=>this.radios,isItemDisabled:e=>this.isDisabled||e.disabled,orientation:`both`,dir:ce(this),loop:!0})),this.observer=null,this.dirty=!1,this.rovingAttached=!1,this.settleQueued=!1,this.handleClick=e=>{let t=e.target?.closest?.(`minerva-radio`);t instanceof G&&t.group===this&&this.select(t)},this.handleKeyDown=e=>{if(!e.defaultPrevented||!hi.has(e.key))return;let t=this.roving.getActive();t instanceof G&&this.select(t)}}static{this.tagName=`minerva-radio-group`}static{this.dependencies=[G]}static{this.styles=[N,g`
:host{
display: block;
}
`,L(Gt)]}get radios(){return Array.from(this.querySelectorAll(`minerva-radio`)).filter(e=>e instanceof G&&e.group===this)}focus(e){let t=this.radios;(t.find(e=>e.checked&&!e.disabled)??t.find(e=>!e.disabled))?.focus(e)}connectedCallback(){super.connectedCallback(),Tn(this)||this.attachRoving(),this.addEventListener(`click`,this.handleClick),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0}))}attachRoving(){this.rovingAttached||(this.rovingAttached=!0,this.roving.attach(this),this.addEventListener(`keydown`,this.handleKeyDown))}disconnectedCallback(){super.disconnectedCallback(),this.rovingAttached=!1,this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.observer?.disconnect(),this.observer=null}getFormValue(){return this.value===``?null:this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.radioMissing`),anchor:this.radios.find(e=>!e.disabled)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`?this.value=e:e===null&&(this.value=``)}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){super.updated(t);let n=this.radios,r;for(let e of n)e.checked=this.value!==``&&e.value===this.value,e.checked&&(r??=e),e.requestUpdate();this.syncRoving(n,r),k&&this.value!==``&&n.length>0&&!r&&I(e.tagName,`value "${this.value}" matches no <minerva-radio> of the group.`)}syncRoving(e,t){let n=[this,...e].find(Tn);if(n){this.settleQueued||(this.settleQueued=!0,Tt(n,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.attachRoving(),t&&!t.disabled&&!this.isDisabled?this.roving.setActive(t,{focus:!1}):this.roving.refresh();for(let t of e)(this.isDisabled||t.disabled)&&t.setAttribute(`tabindex`,`-1`)}select(e){this.isDisabled||e.disabled||e.value===this.value||(this.dirty=!0,this.value=e.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}hookStates(){return{disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,required:this.required,orientation:this.direction,size:this.size,color:this.color}}render(){let e=this.error||this.aria.attr(`aria-invalid`)===`true`,t=this.label,n=[this.helperText,this.aria.description].filter(Boolean).join(` `);return b`<div
part="root"
class=${x({radioGroupWrapper:!0,error:e})}
>
${t?b`<div id="label" part="label" class="groupLabel">${t}</div>`:p}
<div
part="list"
class=${x({radioGroup:!0,[this.direction]:!0})}
role="radiogroup"
aria-labelledby=${t?`label`:p}
aria-label=${t?p:this.aria.label??p}
aria-description=${n||p}
aria-required=${this.required?`true`:`false`}
aria-invalid=${e?`true`:`false`}
aria-disabled=${this.isDisabled?`true`:p}
>
<slot></slot>
</div>
${this.helperText?b`<div
part="helper-text"
aria-hidden="true"
class=${x({helperText:!0,errorText:e})}
>
${this.helperText}
</div>`:p}
</div>`}},z([h({attribute:!1})],gi.prototype,`value`,void 0),z([h({attribute:`value`})],gi.prototype,`defaultValue`,void 0),z([h()],gi.prototype,`label`,void 0),z([h({attribute:`helper-text`})],gi.prototype,`helperText`,void 0),z([h({type:Boolean,reflect:!0})],gi.prototype,`error`,void 0),z([h({reflect:!0})],gi.prototype,`direction`,void 0),z([h({reflect:!0})],gi.prototype,`size`,void 0),z([h({reflect:!0})],gi.prototype,`color`,void 0)})))()}var vi,yi,bi,xi,Si;function Ci(){return(Ci=e((()=>{M(),P(),T(),R(),_n(),j(),O(),mn(),gr(),it(),m(),v(),_(),$e(),he(),d(),vi={small:12,medium:16,large:20},yi=Array.from({length:5},(e,t)=>t),bi=g`
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
`,xi=class e extends A{constructor(...e){super(...e),this.value=0,this.defaultValue=0,this.max=10,this.size=`medium`,this.showValue=!1,this.interactive=!1,this.readOnly=!1,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.dirty=!1,this.rating=new or(this,Ne(this.ratingProps()))}static{this.tagName=`minerva-rating`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,g`
:host{
display: inline-flex;
vertical-align: middle;
}
`,L($n),bi]}ratingProps(){return{value:this.value,max:this.max,readOnly:!this.isInteractive,onValueChange:e=>this.commit(e)}}send(e){this.rating.sync(this.ratingProps()),this.rating.send(e)}get isInteractive(){return this.interactive&&!this.readOnly&&!this.isDisabled}focus(e){this.root?.focus(e)}blur(){this.root?.blur()}getFormValue(){return String(this.value)}getValidity(){return this.required&&!(this.value>0)?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.root}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){if(typeof e==`string`&&e.trim()!==``){let t=Number(e);Number.isFinite(t)&&(this.value=t)}}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),k&&(t.has(`value`)||t.has(`max`))&&(this.value<0||this.value>this.max)&&I(e.tagName,`value (${this.value}) is outside 0..max (${this.max}).`),this.rating.sync(this.ratingProps())}commit(e){e!==this.value&&(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleStarClick(e,t){if(!this.isInteractive)return;let n=e.currentTarget.getBoundingClientRect(),r=e.clientX-n.left<n.width/2;this.send({type:`PICK`,index:t,half:r})}handleKeyDown(e){if(e.defaultPrevented||!this.isInteractive)return;let t=Ke(e.key,this);Ge(t,this.value,this.max)!==null&&(e.preventDefault(),this.send({type:`KEY`,key:t}))}hookStates(){return{readonly:!this.isInteractive,size:this.size}}renderStar(e,t){let n=y({width:`${t}px`,height:`${t}px`,fontSize:`${t}px`}),r=an(`star`,{fill:e});return e===`half`?b`<span part=${r} class="star half" style=${n}
><span class="halfBase">${Vt}</span
><span class="halfFill">${qn}</span></span
>`:b`<span
part=${r}
class=${x({star:!0,[e]:!0})}
style=${n}
>${Vt}</span
>`}render(){let e=this.isInteractive,{value:t,max:n}=this,r=this.rating.machine.project(this.rating.state,this.ratingProps()),i=ve(r,n),a=e=>i[e],o=vi[this.size]??vi.medium,s=this.aria.label??`${t.toFixed(1)} / ${n}`,c=b`<span class="stars" part="stars" aria-hidden="true">
${yi.map(t=>e?b`<button
type="button"
tabindex="-1"
class="starButton"
@click=${e=>this.handleStarClick(e,t)}
@mouseenter=${()=>this.send({type:`HOVER`,index:t})}
>
${this.renderStar(a(t),o)}
</button>`:this.renderStar(a(t),o))}
</span>`,l=this.showValue?b`<span class="value" part="value"
><strong>${t.toFixed(1)}</strong>${this.ratingCount===void 0?p:b`<span class="count" part="count"
>(${this.ratingCount.toLocaleString(`en-US`)})</span
>`}</span
>`:p,ee=x({rating:!0,[this.size]:!0,interactive:e});return e?b`<span
part="root"
class=${ee}
role="slider"
tabindex="0"
aria-label=${s}
aria-description=${this.aria.description??p}
aria-valuenow=${t}
aria-valuemin="0"
aria-valuemax=${n}
aria-required=${this.required?`true`:p}
@keydown=${this.handleKeyDown}
@mouseleave=${()=>this.send({type:`HOVER_END`})}
>${c}${l}</span
>`:b`<span
part="root"
class=${ee}
role="img"
aria-label=${s}
aria-description=${this.aria.description??p}
aria-disabled=${this.isDisabled?`true`:p}
>${c}${l}</span
>`}},z([h({attribute:!1})],xi.prototype,`value`,void 0),z([h({type:Number,attribute:`value`})],xi.prototype,`defaultValue`,void 0),z([h({type:Number})],xi.prototype,`max`,void 0),z([h({reflect:!0})],xi.prototype,`size`,void 0),z([h({type:Boolean,attribute:`show-value`})],xi.prototype,`showValue`,void 0),z([h({type:Number,attribute:`rating-count`})],xi.prototype,`ratingCount`,void 0),z([h({type:Boolean,reflect:!0})],xi.prototype,`interactive`,void 0),z([h({type:Boolean,reflect:!0,attribute:`readonly`})],xi.prototype,`readOnly`,void 0),z([C(`.rating`)],xi.prototype,`root`,void 0),Si=class extends F{constructor(...e){super(...e),this.dimensions=[],this.max=10,this.size=`medium`,this.interactive=!1,this.readOnly=!1,this.hideValue=!1}static{this.tagName=`minerva-rating-scale`}static{this.dependencies=[xi]}static{this.styles=[N,g`
:host{
display: block;
}
`,L($n)]}handleChange(e,t){e.stopPropagation();let{value:n}=e.detail;this.dimensions=this.dimensions.map(e=>e.key===t?{...e,value:n}:e),this.emit(`minerva-change`,{key:t,value:n,dimensions:this.dimensions})}hookStates(){return{readonly:!this.interactive||this.readOnly,size:this.size}}render(){return b`<div class="scale" part="root">
${this.dimensions.map(e=>b`<div class="scaleRow" part="row" title=${e.hint??p}>
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
</div>`}},z([h({attribute:!1})],Si.prototype,`dimensions`,void 0),z([h({type:Number})],Si.prototype,`max`,void 0),z([h({reflect:!0})],Si.prototype,`size`,void 0),z([h({type:Boolean,reflect:!0})],Si.prototype,`interactive`,void 0),z([h({type:Boolean,reflect:!0,attribute:`readonly`})],Si.prototype,`readOnly`,void 0),z([h({type:Boolean,attribute:`hide-value`})],Si.prototype,`hideValue`,void 0)})))()}var wi,Ti,Ei,Di,Oi;function ki(){return(ki=e((()=>{Ot(),M(),P(),T(),Gn(),j(),O(),It(),m(),v(),wi=0,Ti=class e extends F{constructor(...e){super(...e),this.internals=Qn(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.label=``,this.selected=!1,this.highlighted=!1}static{this.tagName=`minerva-option`}static{this.styles=[N,g`
:host{
display: block;
outline: none;
}
`,L(St)]}get text(){return this.textValue??(this.label||this.textContent?.trim()||``)}get displayLabel(){return this.label||this.textContent?.trim()||``}connectedCallback(){super.connectedCallback(),jt(this,this.internals,{role:`option`},this.ownedAria)}updated(t){super.updated(t),jt(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),E(this,`data-highlighted`,this.highlighted),E(this,`data-disabled`,this.disabled),E(this,`data-selected`,this.selected),k&&t.has(`value`)&&this.value===``&&this.isConnected&&I(e.tagName,`an option needs a non-empty "value" (the empty value means "nothing selected").`)}hookStates(){return{selected:this.selected,highlighted:this.highlighted,disabled:this.disabled}}render(){return b`<div
part="root"
class="item"
?data-selected=${this.selected}
?data-highlighted=${this.highlighted}
?data-disabled=${this.disabled}
>
<span class="itemText" part="label"><slot></slot></span>
${this.selected?b`<span class="itemIndicator" part="indicator" aria-hidden="true"
>${Yt}</span
>`:p}
</div>`}},z([h({reflect:!0})],Ti.prototype,`value`,void 0),z([h({type:Boolean,reflect:!0})],Ti.prototype,`disabled`,void 0),z([h()],Ti.prototype,`label`,void 0),z([h({attribute:`text-value`})],Ti.prototype,`textValue`,void 0),z([h({type:Boolean,attribute:!1})],Ti.prototype,`selected`,void 0),z([h({type:Boolean,attribute:!1})],Ti.prototype,`highlighted`,void 0),Ei=class extends F{constructor(...e){super(...e),this.internals=Qn(this),this.observer=null}static{this.tagName=`minerva-option-group`}static{this.styles=[N,g`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback(),jt(this,this.internals,{role:`group`}),this.syncLabel(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.syncLabel()),this.observer.observe(this,{childList:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}syncLabel(){let e=this.querySelector(`:scope > minerva-select-label`);if(e){let t=dt(e,`id`);t||(t=`minerva-select-label-${wi++}`,E(e,`id`,t,this)),E(this,`aria-labelledby`,t)}else E(this,`aria-labelledby`,null)}render(){return b`<div part="root"><slot></slot></div>`}},Di=class extends F{static{this.tagName=`minerva-select-label`}static{this.styles=[N,g`
:host{
display: block;
}
`,L(St)]}render(){return b`<div class="label" part="root"><slot></slot></div>`}},Oi=class extends F{constructor(...e){super(...e),this.internals=Qn(this)}static{this.tagName=`minerva-select-separator`}static{this.styles=[N,g`
:host{
display: block;
}
`,L(St)]}connectedCallback(){super.connectedCallback(),jt(this,this.internals,{ariaHidden:`true`})}render(){return b`<div class="separator" part="root"></div>`}}})))()}var Ai,ji,Mi,Ni,Pi,Fi;function Ii(){return(Ii=e((()=>{M(),P(),T(),R(),_n(),j(),O(),xr(),mn(),It(),ki(),m(),v(),_(),he(),d(),Ai=10,ji=e=>Array.isArray(e.options),Mi=e=>e.getAttribute(`aria-disabled`)===`true`,Ni=e=>e instanceof Ti?e.value:e.dataset.value??``,Pi=e=>e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey,Fi=class e extends A{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.highlighted=null,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.typeahead=Ce(),this.floating=new pr(this,()=>({anchor:()=>this.trigger,floating:()=>this.positioner,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,fitViewportHeight:!0,branches:()=>[this.trigger],onDismiss:()=>this.requestOpen(!1),returnFocusOnEscape:()=>this.trigger,focusable:!0,onPosition:()=>this.syncHookStates()})),this.openIntent=`selected`,this.scrollPending=!1,this.dirty=!1,this.observer=null}static{this.tagName=`minerva-select`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,cr,g`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,L(St)]}focus(e){this.trigger?.focus(e)}blur(){this.trigger?.blur()}show(){this.open=!0}hide(){this.open=!1}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:[`value`,`disabled`,`label`,`text-value`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.typeahead.reset()}get lightOptions(){return Array.from(this.querySelectorAll(`minerva-option`)).filter(e=>e instanceof Ti)}get dataOptions(){return(this.options??[]).flatMap(e=>ji(e)?e.options:[e])}get items(){return[...this.dataOptions.map(e=>({value:e.value,disabled:!!e.disabled,text:e.textValue??e.label,label:e.label})),...this.lightOptions.map(e=>({value:e.value,disabled:e.disabled,text:e.text,label:e.displayLabel}))]}getOptions(){let e=this.listbox;return e?[...Array.from(e.querySelectorAll(`[role=option]`)),...this.lightOptions]:[]}findOption(e){if(e!==null)return this.getOptions().find(t=>Ni(t)===e)}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.trigger}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}requestOpen(e){e!==this.open&&(e&&this.isDisabled||this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}openWith(e){this.openIntent=e,this.requestOpen(!0)}close(e){e&&this.trigger?.focus(),this.requestOpen(!1)}commitValue(e){e!==this.value&&(this.value=e,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}selectValue(e){this.commitValue(e),this.close(!0)}willUpdate(e){if(e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open){let e=this.openIntent;this.openIntent=`selected`;let t=this.items.filter(e=>!e.disabled),n=e===`last`?t[t.length-1]:e===`first`?t[0]:t.find(e=>e.value===this.value)??t[0];this.typeahead.reset(),this.scrollPending=!0,this.highlighted=n?.value??null}e.has(`open`)&&!this.open&&(this.highlighted=null)}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?Ie(e):{side:void 0,align:void 0};return{state:this.open?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,required:this.required,size:this.size,side:t,align:n,placement:e}}updated(e){super.updated(e);for(let e of this.lightOptions)e.selected=e.value===this.value,e.highlighted=this.open&&e.value===this.highlighted;if(this.floating.sync(this.open),this.open&&this.listbox){if(e.has(`open`)||e.has(`highlighted`)){let e=this.findOption(this.highlighted)??this.listbox;e.getRootNode()===this.shadowRoot?this.shadowRoot?.activeElement!==e&&e.focus({preventScroll:!0}):document.activeElement!==e&&(e.hasAttribute(`tabindex`)||(e.tabIndex=-1),e.focus({preventScroll:!0}))}this.scrollPending&&(this.scrollPending=!1,this.findOption(this.highlighted)?.scrollIntoView?.({block:`nearest`}))}k&&this.checkOptions()}checkOptions(){let t=this.items;if(t.length===0)return;let n=new Set;for(let r of t)n.has(r.value)&&I(e.tagName,`several options have the value "${r.value}"; option values must be unique.`),n.add(r.value);this.value!==``&&!n.has(this.value)&&I(e.tagName,`value "${this.value}" does not match any option.`)}handleTriggerKeyDown(e){if(this.open)return;let{key:t}=e;if(Pi(e)&&(t!==` `||this.typeahead.getBuffer()!==``)){let n=this.items,r=this.typeahead.search(t,n,n.findIndex(e=>e.value===this.value));e.preventDefault(),r!==-1&&this.commitValue(n[r].value);return}let n={Enter:`selected`," ":`selected`,ArrowDown:`selected`,ArrowUp:this.value===``?`last`:`selected`,Home:`first`,End:`last`};t in n&&(e.preventDefault(),this.openWith(n[t]))}handleListboxKeyDown(e){let{key:t}=e;if(t===`Tab`){this.close(!0);return}let n=this.getOptions(),r=n.findIndex(e=>Ni(e)===this.highlighted),i=r===-1?void 0:n[r],a=()=>{i&&!Mi(i)&&this.selectValue(Ni(i))};if(t===`Enter`||t===`ArrowUp`&&e.altKey){e.preventDefault(),a();return}if(t===` `&&this.typeahead.getBuffer()===``){e.preventDefault(),a();return}if(e.ctrlKey||e.metaKey||e.altKey)return;let o=ke({currentIndex:r,count:n.length,key:t,loop:!1,isDisabled:e=>Mi(n[e]),pageSize:Ai});if((o!==null||t.startsWith(`Arrow`)||t.startsWith(`Page`))&&e.preventDefault(),o===null&&Pi(e)){let i=this.typeahead.search(t,n.map(e=>({text:e instanceof Ti?e.text:e.dataset.textValue??e.textContent??``,disabled:Mi(e)})),r);i!==-1&&(e.preventDefault(),this.scrollPending=!0,this.highlighted=Ni(n[i]));return}o!==null&&(this.typeahead.reset(),this.scrollPending=!0,this.highlighted=Ni(n[o]))}optionFromEvent(e){let t=this.getOptions();return e.composedPath().find(e=>t.includes(e))}handleListboxPointerMove(e){let t=this.optionFromEvent(e);if(!t||Mi(t))return;let n=Ni(t);this.highlighted!==n&&(this.scrollPending=!1,this.highlighted=n)}handleListboxClick(e){let t=this.optionFromEvent(e);t&&!Mi(t)&&this.selectValue(Ni(t))}renderDataOption(e){let t=e.value===this.value,n=this.highlighted===e.value,r=!!e.disabled;return b`<div
part=${an(`item`,{selected:t,highlighted:n,disabled:r})}
class="item"
role="option"
tabindex="-1"
aria-selected=${String(t)}
aria-disabled=${e.disabled?`true`:p}
?data-selected=${t}
?data-highlighted=${n}
?data-disabled=${r}
data-value=${e.value}
data-text-value=${e.textValue??p}
>
<span class="itemText">${e.label}</span>
${t?b`<span class="itemIndicator" aria-hidden="true"
>${Yt}</span
>`:p}
</div>`}renderDataOptions(){return(this.options??[]).map((e,t)=>{if(!ji(e))return this.renderDataOption(e);let n=`group-label-${t}`;return b`<div role="group" aria-labelledby=${n}>
<div id=${n} class="label" part="group-label">${e.label}</div>
${e.options.map(e=>this.renderDataOption(e))}
</div>`})}render(){let e=this.isDisabled,t=this.value===``,n=t?void 0:this.items.find(e=>e.value===this.value),r=this.aria.label,{side:i,align:a}=Ie(this.floating.position.placement);return b`<button
part="root"
type="button"
role="combobox"
aria-haspopup="listbox"
aria-expanded=${String(this.open)}
aria-controls=${this.open?`listbox`:p}
aria-autocomplete="none"
aria-label=${r??p}
aria-description=${this.aria.description??p}
aria-required=${this.required?`true`:p}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:p}
?disabled=${e}
data-state=${this.open?`open`:`closed`}
?data-placeholder=${t}
data-component="select"
class=${x({trigger:!0,[this.size]:!0,invalid:this.invalid})}
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
>${Kt}</span
>
</button>
${this.open?b`<div class="positioner" popover="manual" data-side=${i}>
<div
id="listbox"
part="content"
role="listbox"
tabindex="-1"
aria-label=${r??p}
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
</div>`:p}`}},z([h({attribute:!1})],Fi.prototype,`value`,void 0),z([h({attribute:`value`})],Fi.prototype,`defaultValue`,void 0),z([h({attribute:!1})],Fi.prototype,`options`,void 0),z([h({type:Boolean,reflect:!0})],Fi.prototype,`open`,void 0),z([h()],Fi.prototype,`placeholder`,void 0),z([h({reflect:!0})],Fi.prototype,`size`,void 0),z([h({type:Boolean,reflect:!0})],Fi.prototype,`invalid`,void 0),z([S()],Fi.prototype,`highlighted`,void 0),z([C(`.trigger`)],Fi.prototype,`trigger`,void 0),z([C(`.positioner`)],Fi.prototype,`positioner`,void 0),z([C(`[role=listbox]`)],Fi.prototype,`listbox`,void 0)})))()}var Li,Ri,zi,K,Bi;function Vi(){return(Vi=e((()=>{M(),P(),R(),j(),O(),_t(),m(),v(),_(),$e(),Li=e=>e==null||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Ri=e=>typeof e!=`number`&&!/^\d+(\.\d+)?$/.test(e)?e:`var(--space-${String(e).replace(`.`,`-`)})`,zi=[N,g`

:host(:dir(rtl)) .animation-wave{
animation-direction: reverse;
}
`],K=class e extends F{constructor(...e){super(...e),this.variant=`text`,this.animation=`pulse`,this.loaded=!1,this.decorative=!1,this.lines=1,this.avatar=!1,this.avatarSize=`40`,this.avatarShape=`circle`,this.active=!1,this.paragraph=!1,this.heading=!1,this.locale=new D(this),this.aria=new w(this)}static{this.tagName=`minerva-skeleton`}static{this.styles=[...zi,g`
:host{
display: block;
}
:host([decorative][variant="circular"]){
display: inline-block;
vertical-align: middle;
}
`,L(ut)]}hookStates(){return{variant:this.variant}}updated(t){k&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&I(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}block(e,t,n={}){return b`<div
part=${e}
class=${x({skeleton:!0,[`animation-${this.animation}`]:!0,...t})}
style=${y(n)}
></div>`}renderAvatar(){if(!this.avatar)return p;let e=Li(this.avatarSize);return this.block(`avatar`,{avatar:!0,[`avatar-${this.avatarShape}`]:!0},{width:e,height:e})}renderTitle(){return this.heading?this.block(`title`,{title:!0}):p}renderParagraph(){return this.paragraph?b`<div class="paragraph">
${[`100%`,`100%`,`92%`,`60%`].map(e=>this.block(`line`,{},{width:e,height:`16px`}))}
</div>`:p}renderLines(){if(this.paragraph||this.heading)return p;let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return Array.from({length:e},()=>this.block(`line`,{[this.variant]:!0},{width:Li(this.width),height:Li(this.height),borderRadius:Li(this.borderRadius)}))}render(){if(this.loaded)return b`<slot></slot>`;if(this.decorative){let e=this.variant===`circular`?Li(this.size??this.width??`32`):void 0;return b`<span
part="root"
aria-hidden="true"
class=${x({skeleton:!0,decorative:!0,[this.variant]:!0,[`animation-${this.animation}`]:!0})}
style=${y({width:e??Li(this.width),height:e??Li(this.height),borderRadius:Li(this.borderRadius)})}
></span>`}let e=this.variant===`card`?b`<div class=${x({card:!0,active:this.active})}>
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
class=${x({skeletonRoot:!0,withAvatar:this.avatar})}
>
${e}
</div>`}},z([h({reflect:!0})],K.prototype,`variant`,void 0),z([h({reflect:!0})],K.prototype,`animation`,void 0),z([h({type:Boolean,reflect:!0})],K.prototype,`loaded`,void 0),z([h({type:Boolean,reflect:!0})],K.prototype,`decorative`,void 0),z([h()],K.prototype,`size`,void 0),z([h()],K.prototype,`width`,void 0),z([h()],K.prototype,`height`,void 0),z([h({attribute:`border-radius`})],K.prototype,`borderRadius`,void 0),z([h({type:Number})],K.prototype,`lines`,void 0),z([h({type:Boolean})],K.prototype,`avatar`,void 0),z([h({attribute:`avatar-size`})],K.prototype,`avatarSize`,void 0),z([h({attribute:`avatar-shape`})],K.prototype,`avatarShape`,void 0),z([h({type:Boolean})],K.prototype,`active`,void 0),z([h({type:Boolean})],K.prototype,`paragraph`,void 0),z([h({type:Boolean})],K.prototype,`heading`,void 0),Bi=class e extends F{constructor(...e){super(...e),this.lines=3,this.lineHeight=`1em`,this.gap=`2`,this.noShrinkLast=!1,this.animation=`pulse`}static{this.tagName=`minerva-skeleton-text`}static{this.styles=[...zi,g`
:host{
display: block;
}
`,L(ut)]}updated(t){k&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&I(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}render(){let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return b`<div
part="root"
aria-hidden="true"
class="skeletonText"
style=${y({gap:Ri(this.gap)})}
>
${Array.from({length:e},(t,n)=>b`<span
part="line"
class="skeleton decorative text animation-${this.animation}"
style=${y({height:Li(this.lineHeight),width:!this.noShrinkLast&&n===e-1?`70%`:`100%`})}
></span>`)}
</div>`}},z([h({type:Number})],Bi.prototype,`lines`,void 0),z([h({attribute:`line-height`})],Bi.prototype,`lineHeight`,void 0),z([h()],Bi.prototype,`gap`,void 0),z([h({type:Boolean,attribute:`no-shrink-last`})],Bi.prototype,`noShrinkLast`,void 0),z([h({reflect:!0})],Bi.prototype,`animation`,void 0)})))()}var Hi,Ui;function Wi(){return(Wi=e((()=>{P(),j(),hn(),O(),tr(),Mt(),m(),v(),_(),$e(),Hi=320,Ui=class e extends F{constructor(...e){super(...e),this.asideWidth=Hi,this.collapseBelow=`md`,this.gap=6,this.slots=new dn(this)}static{this.tagName=`minerva-split-layout`}static{this.styles=[N,g`
:host{
display: block;
min-width: 0;
}
`,L(Et)]}get validAsideWidth(){return Number.isFinite(this.asideWidth)&&this.asideWidth>0}updated(){k&&!this.validAsideWidth&&I(e.tagName,`aside-width must be a finite positive number (got ${String(this.asideWidth)}); using ${Hi}.`)}render(){let e=this.slots.test(`aside`),t=this.validAsideWidth?this.asideWidth:Hi;return b`<div
class="root"
part="root"
style=${y({"--split-layout-aside-width":`${t}px`,"--split-layout-gap":ge(this.gap)})}
>
<div
class=${x({grid:!0,[this.collapseBelow]:!0,hasAside:e})}
>
<div class="main" part="main"><slot></slot></div>
${e?b`<div class="aside" part="aside">
<slot name="aside"></slot>
</div>`:p}
</div>
</div>`}},z([h({type:Number,attribute:`aside-width`})],Ui.prototype,`asideWidth`,void 0),z([h({attribute:`collapse-below`,reflect:!0})],Ui.prototype,`collapseBelow`,void 0),z([h({converter:ir})],Ui.prototype,`gap`,void 0)})))()}var Gi,Ki,qi,Ji,Yi,Xi,Zi,Qi;function $i(){return($i=e((()=>{M(),P(),j(),hn(),O(),tr(),wt(),m(),v(),_(),$e(),Gi={start:`flex-start`,center:`center`,end:`flex-end`,stretch:`stretch`,baseline:`baseline`},Ki={start:`flex-start`,center:`center`,end:`flex-end`,between:`space-between`,around:`space-around`,evenly:`space-evenly`},qi=()=>typeof HTMLSlotElement<`u`&&typeof HTMLSlotElement.prototype.assign==`function`,Ji=`minerva-stack-item-`,Yi=e=>Array.from(e.childNodes).filter(e=>e.nodeType===1||e.nodeType===3&&!!e.textContent?.trim()),Xi=class extends F{constructor(...e){super(...e),this.direction=`column`,this.wrap=!1,this.attached=!1,this.aria=new w(this),this.slots=new dn(this),this.manualSlots=!1,this.fallbackSlotted=new Set}static{this.tagName=`minerva-stack`}static{this.styles=[N,g`
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
`,L(Cn)]}get resolvedDirection(){return this.direction}get resolvedAlign(){return this.align}createRenderRoot(){if(!this.shadowRoot){this.manualSlots=qi();let e=this.constructor;this.attachShadow({...e.shadowRootOptions,slotAssignment:this.manualSlots?`manual`:`named`})}return super.createRenderRoot()}renderSeparator(){let e=this.separator;return typeof e==`function`?e():e}get hasSeparator(){let e=this.separator;return e!=null&&e!==``}fallbackItems(){return Array.from(this.children).filter(e=>{let t=e.getAttribute(`slot`);return t===null||this.fallbackSlotted.has(e)&&t!==``})}releaseFallbackSlots(e=[]){for(let t of this.fallbackSlotted)e.includes(t)||(t.getAttribute(`slot`)?.startsWith(Ji)&&t.removeAttribute(`slot`),this.fallbackSlotted.delete(t))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this.releaseFallbackSlots()}updated(){if(this.manualSlots){let e=Yi(this),t=Array.from(this.renderRoot.querySelectorAll(`slot`));t.length===1?t[0].assign(...e):t.forEach((t,n)=>t.assign(e[n]))}else if(this.hasSeparator){let e=this.fallbackItems();e.forEach((e,t)=>{let n=`${Ji}${t}`;this.fallbackSlotted.add(e),e.getAttribute(`slot`)!==n&&e.setAttribute(`slot`,n)}),this.releaseFallbackSlots(e)}else this.releaseFallbackSlots();k&&this.attached&&!this.aria.label&&I(this.constructor.tagName,`attached stacks are exposed as role="group": set aria-label (or aria-labelledby) to name the group.`)}renderItems(){return this.hasSeparator?this.manualSlots?Array.from({length:Yi(this).length},(e,t)=>b`${t>0?this.renderSeparator():p}<slot></slot>`):b`${Array.from({length:this.fallbackItems().length},(e,t)=>b`${t>0?this.renderSeparator():p}<slot
name=${`${Ji}${t}`}
></slot>`)}<slot></slot>`:b`<slot></slot>`}hookStates(){return{orientation:this.resolvedDirection.startsWith(`row`)?`horizontal`:`vertical`}}render(){this.slots;let e=this.resolvedDirection,t=this.resolvedAlign,n={};return this.gap!==void 0&&this.gap!==``&&!this.attached&&(n.gap=ge(this.gap)),t&&Gi[t]&&(n.alignItems=Gi[t]),this.justify&&Ki[this.justify]&&(n.justifyContent=Ki[this.justify]),b`<div
part="root"
class=${x({stack:!0,[e]:!0,wrap:this.wrap,attached:this.attached})}
style=${y(n)}
role=${this.attached?`group`:p}
aria-label=${this.attached?this.aria.label??p:p}
>
${this.renderItems()}
</div>`}},z([h({reflect:!0})],Xi.prototype,`direction`,void 0),z([h({converter:ir})],Xi.prototype,`gap`,void 0),z([h({reflect:!0})],Xi.prototype,`align`,void 0),z([h({reflect:!0})],Xi.prototype,`justify`,void 0),z([h({type:Boolean,reflect:!0})],Xi.prototype,`wrap`,void 0),z([h({attribute:`separator`})],Xi.prototype,`separator`,void 0),z([h({type:Boolean,reflect:!0})],Xi.prototype,`attached`,void 0),Zi=class extends Xi{static{this.tagName=`minerva-hstack`}constructor(){super(),this.direction=`row`}get resolvedDirection(){return`row`}hookStates(){return{}}get resolvedAlign(){return this.align??`center`}},Qi=class extends Xi{static{this.tagName=`minerva-vstack`}constructor(){super(),this.direction=`column`}get resolvedDirection(){return`column`}hookStates(){return{}}get resolvedAlign(){return this.align??`stretch`}}})))()}var ea;function ta(){return(ta=e((()=>{M(),P(),R(),_n(),j(),O(),rt(),m(),v(),_(),Qe(),ea=class e extends F{constructor(...e){super(...e),this.items=[],this.value=``,this.navigable=!1,this.locale=new D(this),this.aria=new w(this)}static{this.tagName=`minerva-steps`}static{this.styles=[N,g`
:host{
display: block;
}
`,L(En)]}select(e){e.disabled||e.value===this.value||this.emit(`minerva-change`,{value:e.value},{cancelable:!0})&&(this.value=e.value)}updated(){k&&this.value&&this.items.length&&!this.items.some(e=>e.value===this.value)&&I(e.tagName,`value "${this.value}" matches no step: no step is marked current.`)}hookStates(){return{readonly:!this.navigable}}render(){let e=this.items??[],t=e.findIndex(e=>e.value===this.value),n=!this.navigable;return b`<ol
part="root"
class="steps"
aria-label=${this.aria.label??this.locale.t(`steps.label`)}
>
${Xe(e,e=>e.value,(e,r)=>{let i=r===t,a=t>-1&&r<t,o=b`<span
part="indicator"
class="number"
aria-hidden="true"
>${r+1}</span
><span part="label" class="label">${e.label}</span>`,s=i?void 0:a?`complete`:`upcoming`;return b`<li
part=${an(`item`,{current:i,disabled:!n&&!!e.disabled,status:s})}
class=${x({step:!0,current:i,complete:a})}
aria-current=${n&&i?`step`:p}
>
${n?b`<span part="button" class="button static"
>${o}</span
>`:b`<button
type="button"
part="button"
class="button"
?disabled=${!!e.disabled}
aria-current=${i?`step`:p}
@click=${()=>this.select(e)}
>
${o}
</button>`}
</li>`})}
</ol>`}},z([h({attribute:!1})],ea.prototype,`items`,void 0),z([h({reflect:!0})],ea.prototype,`value`,void 0),z([h({type:Boolean,reflect:!0})],ea.prototype,`navigable`,void 0)})))()}var na,ra,q;function ia(){return(ia=e((()=>{M(),P(),R(),j(),hn(),O(),mn(),kt(),m(),v(),_(),Ze(),na=400,ra={start:`labelStart`,end:`labelEnd`,top:`labelTop`,bottom:`labelBottom`},q=class e extends A{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.value=`on`,this.label=``,this.offLabel=``,this.onLabel=``,this.variant=`slider`,this.size=`medium`,this.color=`primary`,this.shape=`round`,this.labelPlacement=`end`,this.iconPlacement=`start`,this.loading=!1,this.noRipple=!1,this.readOnly=!1,this.invalid=!1,this.rippleActive=!1,this.dirty=!1,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.slots=new dn(this)}static{this.tagName=`minerva-switch`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,g`
:host{
display: inline-flex;
vertical-align: middle;
}
`,L(st)]}get bilateral(){return!!this.offLabel&&!!this.onLabel}get segmented(){return this.variant===`segmented`&&this.bilateral}get blocked(){return this.isDisabled||this.loading||this.readOnly}focus(e){if(this.segmented){this.renderRoot.querySelector(`.segmentActive`)?.focus(e);return}this.input?.focus(e)}blur(){(this.shadowRoot?.activeElement)?.blur()}click(){this.input?.click()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(t){t.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked),k&&t.has(`variant`)&&this.variant===`segmented`&&!this.bilateral&&I(e.tagName,`variant="segmented" needs both off-label and on-label; rendering a slider.`)}handleChange(){if(this.blocked){this.input.checked=this.checked;return}this.dirty=!0,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value})}handleKeyDown(e){e.key===`Enter`&&(e.preventDefault(),!this.blocked&&this.input.click())}handleClick(e){if(this.readOnly){e.preventDefault();return}this.noRipple||this.blocked||(clearTimeout(this.rippleTimer),this.rippleActive=!0,this.rippleTimer=setTimeout(()=>this.rippleActive=!1,na))}setState(e){this.blocked||e===this.checked||this.input.click()}hookStates(){return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,loading:this.loading,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape,variant:this.segmented?`segmented`:`slider`}}renderInput(e){let t=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return b`<input
part="input"
type="checkbox"
role=${e?p:`switch`}
class=${e?`hiddenInput`:``}
.checked=${et(this.checked)}
?disabled=${this.isDisabled||this.loading}
?required=${this.required}
tabindex=${e?`-1`:p}
aria-hidden=${e?`true`:p}
aria-label=${e?p:this.aria.label??p}
aria-description=${e?p:this.aria.description??p}
aria-checked=${e?p:String(this.checked)}
aria-disabled=${!e&&(this.isDisabled||this.loading)?`true`:p}
aria-busy=${this.loading?`true`:p}
aria-invalid=${!e&&t?`true`:p}
aria-readonly=${!e&&this.readOnly?`true`:p}
aria-required=${!e&&this.required?`true`:p}
@change=${this.handleChange}
@click=${this.handleClick}
@keydown=${this.handleKeyDown}
/>`}render(){let e=this.blocked,t=this.isDisabled;if(this.segmented)return b`<span
part="root"
role="group"
aria-label=${this.aria.label??p}
aria-description=${this.aria.description??p}
aria-disabled=${e?`true`:p}
class=${x({segmented:!0,[this.size]:!0,[this.color]:!0,disabled:e})}
>
${this.renderInput(!0)}
${[!1,!0].map(t=>{let n=this.checked===t;return b`<button
part="segment"
type="button"
class=${x({segment:!0,segmentActive:n})}
?disabled=${e}
aria-pressed=${String(n)}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`})}
</span>`;let n=this.bilateral,r=this.slots.test(`icon`),i=x({switch:!0,[this.size]:!0,[ra[this.labelPlacement]]:!n,[this.color]:!0,checked:this.checked,checkedLarge:this.checked&&this.size===`large`,disabled:t,loading:this.loading,square:this.shape===`square`,ripple:!this.noRipple&&this.rippleActive,bilateral:n}),a=b`<span class="switchBase" part="control">
${this.renderInput(!1)}
<span class="track" part="track"></span>
<span class="thumb" part="thumb"
>${this.iconPlacement===`start`&&r?b`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:p}</span
>
${this.noRipple?p:b`<span class="rippleEffect"></span>`}
</span>`,o=this.iconPlacement===`end`&&r?b`<span class="icon" part="icon"><slot name="icon"></slot></span>`:p;if(n){let t=t=>b`<button
part="side"
type="button"
class=${x({side:!0,sideActive:this.checked===t})}
?disabled=${e}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`;return b`<span part="root" class=${i}
>${t(!1)}${a}${t(!0)}${o}</span
>`}let s=this.label||this.slots.test(`[default]`)?b`<span class="label" part="label"
>${this.label||b`<slot></slot>`}</span
>`:p,c=this.labelPlacement===`start`||this.labelPlacement===`top`;return b`<label part="root" class=${i}
>${c?s:p}${a}${o}${c?p:s}</label
>`}},z([h({attribute:!1})],q.prototype,`checked`,void 0),z([h({type:Boolean,attribute:`checked`,reflect:!0})],q.prototype,`defaultChecked`,void 0),z([h()],q.prototype,`value`,void 0),z([h()],q.prototype,`label`,void 0),z([h({attribute:`off-label`})],q.prototype,`offLabel`,void 0),z([h({attribute:`on-label`})],q.prototype,`onLabel`,void 0),z([h({reflect:!0})],q.prototype,`variant`,void 0),z([h({reflect:!0})],q.prototype,`size`,void 0),z([h({reflect:!0})],q.prototype,`color`,void 0),z([h({reflect:!0})],q.prototype,`shape`,void 0),z([h({attribute:`label-placement`,reflect:!0})],q.prototype,`labelPlacement`,void 0),z([h({attribute:`icon-placement`})],q.prototype,`iconPlacement`,void 0),z([h({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),z([h({type:Boolean,attribute:`no-ripple`})],q.prototype,`noRipple`,void 0),z([h({type:Boolean,reflect:!0,attribute:`readonly`})],q.prototype,`readOnly`,void 0),z([h({type:Boolean,reflect:!0})],q.prototype,`invalid`,void 0),z([S()],q.prototype,`rippleActive`,void 0),z([C(`input`)],q.prototype,`input`,void 0)})))()}var aa,oa,sa,ca,la;function ua(){return(ua=e((()=>{Ot(),M(),P(),Ht(),Gn(),j(),O(),gr(),br(),ct(),m(),v(),_(),d(),aa=0,oa=e=>e.parentElement?.closest(`minerva-tabs`)??null,sa=class e extends F{constructor(...e){super(...e),this.variant=`line`,this.color=`primary`,this.orientation=`horizontal`,this.activationMode=`automatic`,this.noLoop=!1,this.label=``,this.aria=new w(this),this.baseId=`minerva-tabs-${++aa}`,this.rovingKey=``,this.observer=null,this.settleQueued=!1,this.roving=new hr(this,()=>({getItems:()=>this.tabs,orientation:this.orientation,dir:ce(this),loop:!this.noLoop})),this.machine=new or(this,ue(this.tabsProps()),()=>!1),this.handleKeyDownCapture=()=>this.ensureRoving(),this.handleFocusIn=e=>{let t=this.tabs.find(t=>t===e.target);t&&this.send({type:`FOCUS`,value:t.value,disabled:t.disabled})}}static{this.tagName=`minerva-tabs`}static{this.styles=[N,g`
:host{
display: block;
min-width: 0;
}
`,L(Bt)]}get tabs(){return Array.from(this.querySelectorAll(`minerva-tab`)).filter(e=>oa(e)===this)}get panels(){return Array.from(this.querySelectorAll(`minerva-tab-panel`)).filter(e=>oa(e)===this)}tabsProps(){return{value:this.value,activationMode:this.activationMode,onValueChange:e=>this.apply(e)}}send(e){this.machine.sync(this.tabsProps()),this.machine.send(e)}apply(e){this.emit(`minerva-change`,{value:e},{cancelable:!0})&&(this.value=e)}select(e){this.send({type:`SELECT`,value:e,disabled:!1})}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`value`,`disabled`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.rovingKey=``}updated(t){t.has(`value`)&&k&&this.value!==void 0&&this.tabs.length>0&&!this.tabs.some(e=>e.value===this.value)&&I(e.tagName,`value "${this.value}" does not match any <minerva-tab>.`),this.sync()}ensureRoving(){if(!this.tablist)return;let e=`${this.orientation}|${ce(this)}|${this.noLoop}`;e!==this.rovingKey&&(this.rovingKey=e,this.roving.detach(),this.roving.attach(this.tablist))}sync(){if(!this.tablist)return;let e=this.tabs,t=this.panels,n=new Map;for(let t of e)n.set(t,t.id||`${this.baseId}-tab-${t.value}`),t.id||E(t,`id`,n.get(t),this);for(let e of t)n.set(e,e.id||`${this.baseId}-panel-${e.value}`),e.id||E(e,`id`,n.get(e),this);for(let r of e){let e=t.find(e=>e.value===r.value);r.sync(this,r.value===this.value,e&&n.get(e))}for(let r of t){let t=e.find(e=>e.value===r.value);r.sync(this,r.value===this.value,t&&n.get(t))}let r=[this,...e,...t].find(Tn);if(r){this.settleQueued||(this.settleQueued=!0,Tt(r,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.ensureRoving();let i=ye(e,this.value);i?this.roving.setActive(i,{focus:!1}):this.roving.refresh()}hookStates(){return{orientation:this.orientation,variant:this.variant,color:this.color}}render(){return b`<div
part="root"
class=${x({tabs:!0,[this.color]:!0,vertical:this.orientation===`vertical`})}
data-orientation=${this.orientation}
@keydown=${{handleEvent:this.handleKeyDownCapture,capture:!0}}
>
<div
part="list"
role="tablist"
aria-label=${this.label||this.aria.label||p}
aria-orientation=${this.orientation}
data-orientation=${this.orientation}
class=${x({list:!0,[`${this.variant}List`]:!0,verticalList:this.orientation===`vertical`})}
@focusin=${this.handleFocusIn}
>
<slot name="tab" @slotchange=${()=>this.sync()}></slot>
</div>
<slot @slotchange=${()=>this.sync()}></slot>
</div>`}},z([h({reflect:!0})],sa.prototype,`value`,void 0),z([h({reflect:!0})],sa.prototype,`variant`,void 0),z([h({reflect:!0})],sa.prototype,`color`,void 0),z([h({reflect:!0})],sa.prototype,`orientation`,void 0),z([h({reflect:!0,attribute:`activation-mode`})],sa.prototype,`activationMode`,void 0),z([h({type:Boolean,reflect:!0,attribute:`no-loop`})],sa.prototype,`noLoop`,void 0),z([h()],sa.prototype,`label`,void 0),z([C(`[role="tablist"]`)],sa.prototype,`tablist`,void 0),ca=class extends F{constructor(...e){super(...e),this.internals=Qn(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.selected=!1,this.group=null,this.handleMouseDown=e=>{if(this.disabled){e.preventDefault();return}e.button===0&&!e.ctrlKey?this.select():e.preventDefault()},this.handleKeyDown=e=>{e.defaultPrevented||this.disabled||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),this.select())},this.handleClick=e=>{!this.disabled&&e.detail===0&&this.select()}}static{this.tagName=`minerva-tab`}static{this.styles=[N,g`
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
`,L(Bt)]}sync(e,t,n){this.group=e,this.selected=t,E(this,`aria-controls`,n??null),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.hasAttribute(`slot`)||E(this,`slot`,`tab`),jt(this,this.internals,{role:`tab`},this.ownedAria),this.addEventListener(`mousedown`,this.handleMouseDown),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`mousedown`,this.handleMouseDown),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.group=null}select(){(this.group??oa(this))?.select(this.value)}updated(){jt(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),E(this,`data-state`,this.selected?`active`:`inactive`),E(this,`data-disabled`,this.disabled);let e=this.group?.orientation??`horizontal`;E(this,`data-orientation`,e)}hookStates(){return{state:this.selected?`active`:`inactive`,disabled:this.disabled,orientation:this.group?.orientation??`horizontal`,variant:this.group?.variant??`line`,color:this.color}}render(){let e=this.group,t=e?.variant??`line`,n=e?.orientation===`vertical`;return b`<span
part="root"
class=${x({trigger:!0,[`${t}Trigger`]:!0,verticalTrigger:n,[this.color??``]:!!this.color,colored:!!this.color})}
data-state=${this.selected?`active`:`inactive`}
data-orientation=${e?.orientation??`horizontal`}
><slot></slot
></span>`}},z([h({reflect:!0})],ca.prototype,`value`,void 0),z([h({type:Boolean,reflect:!0})],ca.prototype,`disabled`,void 0),z([h({reflect:!0})],ca.prototype,`color`,void 0),z([h({type:Boolean,reflect:!0})],ca.prototype,`selected`,void 0),la=class extends F{constructor(...e){super(...e),this.internals=Qn(this),this.value=``,this.forceMount=!1,this.orientation=`horizontal`,this.selected=!1,this.stamped=[]}static{this.tagName=`minerva-tab-panel`}static{this.styles=[N,g`
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
`,L(Bt)]}get template(){return Array.from(this.children).find(e=>e instanceof HTMLTemplateElement)??null}syncContent(){if(Tn(this))return;let e=this.template;if(this.selected||this.forceMount){if(e&&!this.stamped.length){let t=this.ownerDocument.importNode(e.content,!0);this.stamped=Array.from(t.childNodes),e.after(t)}return}for(let e of this.stamped)e.parentNode?.removeChild(e);this.stamped=[]}sync(e,t,n){this.orientation=e.orientation,this.selected=t,E(this,`hidden`,!t),this.syncContent(),E(this,`data-state`,t?`active`:`inactive`),E(this,`data-orientation`,e.orientation),E(this,`aria-labelledby`,n??null),this.requestUpdate()}willUpdate(e){e.has(`forceMount`)&&this.hasUpdated&&this.syncContent()}connectedCallback(){super.connectedCallback(),jt(this,this.internals,{role:`tabpanel`}),this.hasAttribute(`tabindex`)||E(this,`tabindex`,`0`)}hookStates(){return{state:this.selected?`active`:`inactive`,orientation:this.orientation}}render(){return b`<div
part="root"
class="panel"
data-orientation=${this.orientation}
?hidden=${!this.selected&&Tn(this)&&!!oa(this)}
>
<slot></slot>
</div>`}},z([h({reflect:!0})],la.prototype,`value`,void 0),z([h({type:Boolean,reflect:!0,attribute:`force-mount`})],la.prototype,`forceMount`,void 0)})))()}var da,J;function fa(){return(fa=e((()=>{M(),P(),T(),R(),j(),hn(),O(),Kn(),m(),v(),_(),$e(),Qe(),da=600,J=class e extends F{constructor(...e){super(...e),this.color=`neutral`,this.variant=`subtle`,this.size=`medium`,this.shape=`rounded`,this.closable=!1,this.clickable=!1,this.toggle=!1,this.loading=!1,this.elevation=!1,this.disabled=!1,this.noRipple=!1,this.ripples=[],this.nextRippleId=0,this.rippleTimers=new Set,this.locale=new D(this),this.aria=new w(this),this.slots=new dn(this)}static{this.tagName=`minerva-tag`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,g`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
.closeIcon svg{
display: block;
}
`,L(at)]}focus(e){(this.actionButton??this.closeButton)?.focus(e)}disconnectedCallback(){super.disconnectedCallback(),this.rippleTimers.forEach(clearTimeout),this.rippleTimers.clear(),this.ripples=[]}labelText(){return Array.from(this.childNodes).filter(e=>e.nodeType===3||e.nodeType===1&&!e.hasAttribute(`slot`)).map(e=>e.textContent??``).join(``).replace(/\s+/g,` `).trim()}get inactive(){return this.disabled||this.loading}handleClick(e){this.inactive||(this.addRipple(e),this.toggle&&(this.pressed=!this.pressed,this.emit(`minerva-change`,{pressed:this.pressed})))}handleClose(e){e.stopPropagation(),!this.disabled&&this.emit(`minerva-close`,{})}addRipple(e){if(this.noRipple)return;let t=e.currentTarget.parentElement;if(!t)return;let n=t.getBoundingClientRect(),r=e.detail===0,i=Math.max(n.width,n.height),a=i/2,o=this.nextRippleId++,s=r?n.width/2-a:e.clientX-n.left-a,c=r?n.height/2-a:e.clientY-n.top-a;this.ripples=[...this.ripples,{id:o,style:{width:`${i}px`,height:`${i}px`,left:`${s}px`,top:`${c}px`}}];let l=setTimeout(()=>{this.rippleTimers.delete(l),this.ripples=this.ripples.filter(e=>e.id!==o)},da);this.rippleTimers.add(l)}hookStates(){return{state:this.clickable&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){k&&(this.toggle||this.pressed!==void 0)&&!this.clickable&&I(e.tagName,`pressed / toggle require clickable: the tag is not a button otherwise.`)}render(){let e=this.toggle||this.pressed!==void 0,t=this.closable?this.labelText():``,n=this.closeLabel??(t?this.locale.t(`tag.closeWithLabel`,{label:t}):this.locale.t(`tag.close`)),r=b`${this.loading?b`<span
class="spinner"
part="spinner"
aria-hidden="true"
></span>`:b`${this.slots.test(`icon`)?b`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:p}${this.slots.test(`avatar`)?b`<span class="avatar" part="avatar"
><slot name="avatar"></slot
></span>`:p}`}<span class="content" part="label"><slot></slot></span>`;return b`<div
part="root"
class=${x({tag:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,[this.shape]:!0,clickable:this.clickable&&!this.inactive,pressed:this.clickable&&!!this.pressed,elevation:this.elevation,disabled:this.disabled,loading:this.loading})}
aria-busy=${this.loading?`true`:p}
data-component="tag"
>
${this.clickable?b`<button
type="button"
part="action"
class="action"
?disabled=${this.inactive}
aria-pressed=${e?String(!!this.pressed):p}
aria-label=${this.aria.label??p}
aria-description=${this.aria.description??p}
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
<slot name="close-icon">${Ft}</slot>
</button>`:p}
${Xe(this.ripples,e=>e.id,e=>b`<span class="ripple" style=${y(e.style)}></span>`)}
</div>`}},z([h({reflect:!0})],J.prototype,`color`,void 0),z([h({reflect:!0})],J.prototype,`variant`,void 0),z([h({reflect:!0})],J.prototype,`size`,void 0),z([h({reflect:!0})],J.prototype,`shape`,void 0),z([h({type:Boolean,reflect:!0})],J.prototype,`closable`,void 0),z([h({type:Boolean,reflect:!0})],J.prototype,`clickable`,void 0),z([h({type:Boolean,reflect:!0})],J.prototype,`pressed`,void 0),z([h({type:Boolean,reflect:!0})],J.prototype,`toggle`,void 0),z([h({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),z([h({type:Boolean,reflect:!0})],J.prototype,`elevation`,void 0),z([h({type:Boolean,reflect:!0})],J.prototype,`disabled`,void 0),z([h({attribute:`close-label`})],J.prototype,`closeLabel`,void 0),z([h({type:Boolean,attribute:`no-ripple`})],J.prototype,`noRipple`,void 0),z([S()],J.prototype,`ripples`,void 0),z([C(`.action`)],J.prototype,`actionButton`,void 0),z([C(`.closeIcon`)],J.prototype,`closeButton`,void 0)})))()}function pa(e,t){try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>typeof e==`string`)}catch{}return k&&I(ga,`the ${t} attribute is not a JSON array of strings.`),null}function ma(e,t){let n=(e??``).trim();return n?n.startsWith(`[`)?pa(n,t)??[]:n.split(`,`).map(e=>e.trim()).filter(Boolean):[]}function ha(e){let t=(e??``).trim();return t?t.startsWith(`[`)?pa(t,`separators`)??[...se]:t.split(/\s+/):[]}var ga,_a,va,ya,Y;function ba(){return(ba=e((()=>{M(),P(),T(),R(),_n(),j(),O(),bn(),xr(),Un(),mn(),Kn(),Rt(),m(),v(),_(),he(),d(),Ze(),Qe(),ga=`minerva-tag-input`,_a=`Enter`,va=[`\r
`,`
`,`\r`],ya=0,Y=class extends A{constructor(...e){super(...e),this._value=[],this.defaultValue=[],this.options=[],this.separators=[...se],this.noCommitOnBlur=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.draft=``,this.requestedOpen=!1,this.highlight=0,this.listId=`minerva-tag-input-list-${ya++}`,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.floating=new pr(this,()=>({anchor:()=>this.combobox,floating:()=>this.list,branches:()=>[this],placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`exact`,onDismiss:()=>this.setOpen(!1)})),this.dirty=!1,this.composing=!1,this.navigating=!1,this.highlightKey=``}static{this.tagName=ga}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,cr,g`
:host{
display: block;
min-width: 0;
}
`,L(at),L(An),L(`.combobox { ${On.replace(/@charset[^;]*;/g,``)} }`),L(Yn),g`

.combobox > .root{
flex-direction: row;
gap: 0;
}

.list{
inset: auto;
}
`]}get value(){return this._value}set value(e){this.dirty=!0,this.setValue(e)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}setValue(e){let t=this._value;this._value=Array.isArray(e)?e.map(String):typeof e==`string`?ma(e,`value`):[],this.requestUpdate(`value`,t)}get blocked(){return this.isDisabled||this.readOnly}get isOpen(){return this.requestedOpen&&!this.blocked}get filtered(){let e=this.value,t=this.draft.trim(),n=[...new Set(this.options.map(e=>e.trim()).filter(Boolean))].filter(t=>!e.includes(t)),r=n.map(e=>({tag:e,label:e,filterValue:e}));t&&!e.includes(t)&&!n.includes(t)&&r.unshift({tag:t,label:this.createLabel?this.createLabel(t):this.locale.t(`tagInput.create`,{tag:t}),filterValue:t});let i=t.toLowerCase();return i?r.filter(e=>e.filterValue.toLowerCase().includes(i)):r}get enterCommits(){return this.separators.includes(_a)}get splitters(){return this.separators.filter(e=>e!==_a&&e!==``)}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.value)e.append(this.name,t);return e}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.setValue([...this.defaultValue]),this.draft=``,this.requestedOpen=!1,this.navigating=!1}restoreFormState(e){e instanceof FormData?this.value=e.getAll(this.name).filter(e=>typeof e==`string`):typeof e==`string`&&(this.value=[e])}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&this.setValue([...this.defaultValue]),this.blocked&&(this.requestedOpen=!1);let t=`${this.filtered.length}\u0000${this.draft}`;if(t!==this.highlightKey&&(this.highlightKey=t,this.highlight=0),k&&e.has(`value`)){let e=new Set,t=this.value.find(t=>e.size===e.add(t).size);t!==void 0&&I(ga,`value contains the tag "${t}" more than once: tags are unique (removing one removes its position only).`)}}updated(e){super.updated(e),this.floating.sync(this.isOpen),this.input?.toggleAttribute(r,!this.isOpen&&this.draft!==``)}setOpen(e){e&&this.blocked||e!==this.requestedOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.requestedOpen=e)}setTags(e){this.value=e,this.emit(`minerva-change`,{value:[...e]})}setDraft(e){this.draft=e,this.input&&this.input.value!==e&&(this.input.value=e)}commitAll(e,t=``){if(this.blocked||this.composing)return;let n=this.value,r=[...n];for(let t of e){let e=t.trim();e&&!r.includes(e)&&r.push(e)}r.length!==n.length&&this.setTags(r),this.navigating=!1,this.setDraft(t)}commit(e){this.commitAll([e])}select(e){this.commit(e.tag),this.setOpen(!1)}removeAt(e){this.blocked||(this.setTags(this.value.filter((t,n)=>n!==e)),this.input?.focus())}handleInput(){let e=this.input.value;if(this.blocked){this.input.value=this.draft;return}this.navigating=!1;let t=this.splitters,r=this.composing||t.length===0?[e]:n(e,t);r.length>1?this.commitAll(r.slice(0,-1),r[r.length-1]):this.draft=e,this.setOpen(!0),this.emit(`minerva-input`,{value:this.draft})}handlePaste(e){if(this.blocked||this.composing)return;let t=e.clipboardData?.getData(`text`)??``,r=this.enterCommits?[...this.splitters,...va]:this.splitters;if(!r.some(e=>t.includes(e)))return;e.preventDefault();let i=this.draft,a=this.input.selectionStart??i.length,o=this.input.selectionEnd??i.length,s=i.slice(0,a)+t+i.slice(o);this.commitAll(n(s,r)),this.setOpen(!1)}handleKeyDown(e){if(this.blocked||this.composing||e.isComposing||e.keyCode===229)return;let t=this.filtered,n=t.length,r=this.isOpen,i=this.draft.trim(),a=this.value;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),this.navigating=!0,this.setOpen(!0),n>0){let t=e.key===`ArrowDown`?1:-1;this.highlight=(this.highlight+t+n)%n}break;case`Enter`:e.preventDefault(),this.enterCommits?!this.navigating&&(!i||a.includes(i))?this.commit(this.draft):r&&t[this.highlight]?this.select(t[this.highlight]):(this.commit(this.draft),this.setOpen(!1)):this.navigating&&r&&t[this.highlight]&&this.select(t[this.highlight]);break;case`Escape`:this.navigating=!1,this.setDraft(``),r&&!e.defaultPrevented&&(e.preventDefault(),this.setOpen(!1));break;case`Backspace`:this.draft===``&&a.length>0&&(e.preventDefault(),this.setTags(a.slice(0,-1)))}}handleFocus(){this.blocked||this.setOpen(!0)}handleBlur(){this.setOpen(!1),this.noCommitOnBlur||this.commit(this.draft)}clearAll(){this.setDraft(``),this.setTags([]),this.emit(`minerva-clear`),this.input?.focus()}renderTag(e,t){let n=this.isDisabled,r=this.removeLabel?this.removeLabel(e):this.locale.t(`tagInput.remove`,{tag:e});return b`<div
part="tag"
class=${x({tag:!0,neutral:!0,subtle:!0,large:!0,rounded:!0,disabled:n})}
data-component="tag"
>
<span class="content"><span class="label">${e}</span></span>
${this.readOnly?p:b`<button
part="remove-button"
type="button"
class="closeIcon"
aria-label=${r}
title=${r}
?disabled=${n}
@click=${e=>{e.stopPropagation(),this.removeAt(t)}}
>
${Ft}
</button>`}
</div>`}hookStates(){return{state:this.isOpen?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,readonly:this.readOnly,required:this.required,size:this.size}}renderList(e){let t=this.aria.label;return b`<ul
part="list"
id=${this.listId}
role="listbox"
popover="manual"
aria-label=${t??p}
class="list"
>
${e.length===0?b`<li class="empty" part="empty" role="presentation">
${this.emptyText??this.locale.t(`tagInput.empty`)}
</li>`:p}
${e.map((e,t)=>b`<li
part=${an(`option`,{highlighted:t===this.highlight})}
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
${Xe(n,(e,t)=>`${t}-${e}`,(e,t)=>this.renderTag(e,t))}
</div>`:p}
<div class="entry">
<div class="combobox">
<div
part="control"
class=${x({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
type="text"
role="combobox"
aria-label=${this.aria.label??p}
aria-description=${this.aria.description??p}
aria-expanded=${r?`true`:`false`}
aria-controls=${r?this.listId:p}
aria-autocomplete="list"
aria-activedescendant=${o?`${this.listId}-option-${this.highlight}`:p}
aria-invalid=${this.invalid?`true`:p}
aria-required=${this.required?`true`:p}
autocomplete="off"
spellcheck="false"
placeholder=${this.placeholder||p}
.value=${et(this.draft)}
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
${r?this.renderList(i):p}
</div>
${this.readOnly?p:b`<button
part="add-button"
type="button"
class=${x({iconButton:!0,neutral:!0,"variant-ghost":!0,medium:!0,square:!0,disabled:t||!a||n.includes(a)})}
aria-label=${this.addLabel??e(`tagInput.add`)}
?disabled=${t||!a||n.includes(a)}
@mousedown=${s}
@click=${()=>{this.commit(this.draft),this.input?.focus()}}
>
${Zt}
</button>
<button
part="clear-button"
type="button"
class=${x({iconButton:!0,neutral:!0,"variant-ghost":!0,medium:!0,square:!0,disabled:t||n.length===0})}
aria-label=${this.clearLabel??e(`tagInput.clear`)}
?disabled=${t||n.length===0}
@mousedown=${s}
@click=${this.clearAll}
>
${Ft}
</button>`}
</div>
</div>`}},z([h({attribute:!1})],Y.prototype,`value`,null),z([h({attribute:`value`,converter:{fromAttribute:e=>ma(e,`value`)}})],Y.prototype,`defaultValue`,void 0),z([h({converter:{fromAttribute:e=>ma(e,`options`)}})],Y.prototype,`options`,void 0),z([h({converter:{fromAttribute:ha}})],Y.prototype,`separators`,void 0),z([h({type:Boolean,attribute:`no-commit-on-blur`})],Y.prototype,`noCommitOnBlur`,void 0),z([h()],Y.prototype,`placeholder`,void 0),z([h({reflect:!0})],Y.prototype,`size`,void 0),z([h({type:Boolean,reflect:!0})],Y.prototype,`invalid`,void 0),z([h({type:Boolean,reflect:!0,attribute:`readonly`})],Y.prototype,`readOnly`,void 0),z([h({attribute:`empty-text`})],Y.prototype,`emptyText`,void 0),z([h({attribute:`add-label`})],Y.prototype,`addLabel`,void 0),z([h({attribute:`clear-label`})],Y.prototype,`clearLabel`,void 0),z([h({attribute:!1})],Y.prototype,`removeLabel`,void 0),z([h({attribute:!1})],Y.prototype,`createLabel`,void 0),z([S()],Y.prototype,`draft`,void 0),z([S()],Y.prototype,`requestedOpen`,void 0),z([S()],Y.prototype,`highlight`,void 0),z([C(`input.field`)],Y.prototype,`input`,void 0),z([C(`.combobox`)],Y.prototype,`combobox`,void 0),z([C(`.list`)],Y.prototype,`list`,void 0)})))()}var xa;function Sa(){return(Sa=e((()=>{M(),P(),T(),j(),O(),en(),ln(),m(),v(),_(),d(),xa=class e extends F{constructor(...e){super(...e),this.variant=`default`,this.aria=new w(this)}static{this.tagName=`minerva-text-link`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,g`
:host{
display: inline;
}
:host([variant="action"]){
display: block;
}
:host([variant="subtle"]){
display: inline-flex;
}
`,L(Zn)]}focus(e){this.anchor?.focus(e)}blur(){this.anchor?.blur()}click(){this.anchor?.click()}hookStates(){return{variant:this.variant}}updated(){k&&!this.href&&I(e.tagName,`href is missing: without it the link is not focusable nor announced as a link (use a button for actions).`)}render(){return b`<a
part="root"
class=${x({textLink:!0,[this.variant]:!0})}
href=${Qt(e.tagName,this.href)??p}
target=${this.target??p}
rel=${Ye(this.target,this.rel)??p}
download=${this.download??p}
hreflang=${this.hreflang??p}
aria-label=${this.aria.label??p}
aria-description=${this.aria.description??p}
aria-current=${this.aria.attr(`aria-current`)??p}
><slot></slot>${this.variant===`subtle`?ht:p}</a
>`}},z([h({reflect:!0})],xa.prototype,`variant`,void 0),z([h()],xa.prototype,`href`,void 0),z([h()],xa.prototype,`target`,void 0),z([h()],xa.prototype,`rel`,void 0),z([h()],xa.prototype,`download`,void 0),z([h()],xa.prototype,`hreflang`,void 0),z([C(`a`)],xa.prototype,`anchor`,void 0)})))()}function Ca(){Ta=null}var wa,Ta,Ea,Da,Oa,ka,Aa;function ja(){return(ja=e((()=>{P(),Ht(),R(),_n(),j(),O(),Wn(),m(),v(),he(),d(),wa=`(prefers-color-scheme: dark)`,Ta=null,Ea=()=>typeof window<`u`&&window.matchMedia?.(wa).matches?`dark`:`light`,Da=(e,t)=>{typeof document<`u`&&(document.cookie=t===null?`${e}=; path=/; max-age=0; SameSite=Lax`:fe(e,t))},Oa=class extends F{constructor(...e){super(...e),this.persist=!1,this.locale=new D(this),this.observer=null,this.media=null,this.onScheme=()=>this.onSystemChange()}static{this.styles=[N,g`
:host{
display: inline-flex;
vertical-align: middle;
}
`,L(rn)]}get config(){return lt(this,`minerva-config`)}onSystemChange(){this.requestUpdate()}connectedCallback(){if(super.connectedCallback(),typeof MutationObserver<`u`){this.observer=new MutationObserver(()=>this.requestUpdate());let e=this.config;this.observer.observe(e??document.documentElement,{attributes:!0,attributeFilter:e?[`theme`,`palette`,`data-theme`]:[`data-theme`,`data-palette`]})}typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(wa),this.media.addEventListener?.(`change`,this.onScheme))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.media?.removeEventListener?.(`change`,this.onScheme),this.media=null}renderGroup(e,t,n){return b`<div part="root" class="group" role="group" aria-label=${e}>
${t.map(e=>b`<button
type="button"
part=${an(`item`,{state:e.active?`active`:`inactive`})}
class="item"
data-state=${e.active?`active`:`inactive`}
aria-pressed=${e.active?`true`:`false`}
@click=${()=>n(e.value)}
>
${e.text}
</button>`)}
</div>`}},z([h({type:Boolean,reflect:!0})],Oa.prototype,`persist`,void 0),ka=class extends Oa{constructor(...e){super(...e),this.hideSystem=!1,this.select=e=>{e!==this.theme&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-theme-toggle`}get theme(){let e=this.config;if(e){let t=e.theme;return t===`github-dark`?`dark`:o(t)?t:null}if(Ta)return Ta;let t=this.persist?Fe(document.cookie,oe):void 0;if(o(t))return t;let n=document.documentElement.getAttribute(`data-theme`);return o(n)?n:`system`}get resolvedTheme(){let e=this.config;if(e)return e.resolvedMode??Ea();let t=this.theme;return t===`light`||t===`dark`?t:Ea()}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist&&!Ta){let e=Fe(document.cookie,oe);o(e)&&this.apply(e,!1)}}onSystemChange(){!this.config&&Ta===`system`&&this.apply(`system`,!1),super.onSystemChange()}apply(e,t=this.persist){let n=this.config;if(n){n.theme=e;return}Ta=e;let r=document.documentElement,i=e===`system`?Ea():e;r.setAttribute(`data-theme`,i),r.style.colorScheme=i,t&&Da(`theme`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.theme,n=this.hideSystem?[`light`,`dark`]:[`light`,`dark`,`system`];return this.renderGroup(e(`themeToggle.label`,{theme:this.resolvedTheme}),n.map(n=>({value:n,text:this.labels?.[n]??e(`themeToggle.${n}`),active:t===n})),this.select)}},z([h({type:Boolean,reflect:!0,attribute:`hide-system`})],ka.prototype,`hideSystem`,void 0),z([h({attribute:!1})],ka.prototype,`labels`,void 0),Aa=class e extends Oa{constructor(...e){super(...e),this.palettes=[...Le],this.showDefault=!1,this.select=e=>{e!==this.palette&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-palette-toggle`}get palette(){let e=this.config,t=e?e.palette:document.documentElement.getAttribute(`data-palette`);return c(t)?t:null}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist){let e=Fe(document.cookie,je);c(e)&&!this.palette&&this.apply(e,!1)}}willUpdate(){if(k){let t=(this.palettes??[]).filter(e=>!c(e));t.length&&I(e.tagName,`unknown palette(s) ${t.join(`, `)}: use ${Le.join(`, `)}.`)}}apply(e,t=this.persist){let n=this.config;if(n){n.palette=e??void 0;return}let r=document.documentElement;e?r.setAttribute(`data-palette`,e):r.removeAttribute(`data-palette`),t&&Da(`palette`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.palette,n=this.showDefault?[null,...this.palettes.filter(c)]:this.palettes.filter(c);return this.renderGroup(e(`paletteToggle.label`,{palette:t??e(`paletteToggle.default`)}),n.map(n=>{let r=n??`default`;return{value:n,text:this.labels?.[r]??e(`paletteToggle.${r}`),active:t===n}}),this.select)}},z([h({converter:{fromAttribute:e=>(e??``).split(/[\s,]+/).filter(Boolean),toAttribute:e=>e.join(` `)}})],Aa.prototype,`palettes`,void 0),z([h({type:Boolean,reflect:!0,attribute:`show-default`})],Aa.prototype,`showDefault`,void 0),z([h({attribute:!1})],Aa.prototype,`labels`,void 0)})))()}var Ma,X;function Na(){return(Na=e((()=>{M(),P(),T(),R(),_n(),j(),O(),bn(),xr(),Un(),mn(),gn(),kn(),m(),v(),_(),he(),d(),Ze(),Ma=(e,t,n=0,r=()=>!1)=>{let i=[];for(let a=n;a<n+e;a+=Math.max(1,t))i.push({value:a,disabled:r(a),label:String(a).padStart(2,`0`)});return i},X=class e extends A{constructor(...e){super(...e),this.name=`time-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.format=`HH:mm:ss`,this.use12Hours=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.hideSecond=!1,this.hourStep=1,this.minuteStep=1,this.secondStep=1,this.draft=null,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.floating=new pr(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.dirty=!1,this.focusPanelOnOpen=!1}static{this.tagName=`minerva-time-picker`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,cr,g`
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
`,L(On),L(An),L(yn),L(Pn)]}get valueAsDate(){return Me(this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get effectiveFormat(){return Re(this.format,!this.hideSecond)}get withSeconds(){return ae(this.effectiveFormat)}get interactive(){return!this.isDisabled&&!this.readOnly}getFormValue(){let e=this.valueAsDate;return e?pe(e,this.withSeconds):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),k&&this.checkUsage(e)}checkUsage(t){let n=e.tagName;if(t.has(`value`)&&this.value&&!Me(this.value)&&I(n,`value "${this.value}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`),t.has(`minTime`)||t.has(`maxTime`)){for(let[e,t]of[[`min-time`,this.minTime],[`max-time`,this.maxTime]])t&&!Me(t)&&I(n,`${e} "${t}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`);let e=Me(this.minTime),t=Me(this.maxTime);e&&t&&_e(e)>_e(t)&&I(n,`min-time (${this.minTime}) is later than max-time (${this.maxTime}): no time can be selected.`)}}updated(e){super.updated(e);let t=this.open&&this.interactive;if(this.floating.sync(t),!t){this.focusPanelOnOpen=!1;return}(e.has(`open`)||e.has(`disabled`))&&(this.popup?.querySelectorAll(`[aria-selected="true"]`).forEach(e=>e.scrollIntoView?.({block:`nearest`})),this.focusPanelOnOpen&&this.focusFirstColumn())}focusFirstColumn(){this.popup?.querySelector(`[role="option"][tabindex="0"]`)?.focus()}requestOpenChange(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){this.value=e?pe(e,this.withSeconds):``,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleTimeChange(e,t){let n=new Date(this.valueAsDate??re());if(e===`hour`)n.setHours(t);else if(e===`minute`)n.setMinutes(t);else if(e===`second`)n.setSeconds(t);else{let e=n.getHours()%12;n.setHours(t===1?e+12:e)}this.draft=null,this.commit(n)}handleInput(e){let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t});let n=Oe(t,this.effectiveFormat,{strict:!0,base:this.valueAsDate??void 0});n&&this.commit(n)}handleBlur(){let e=this.draft;if(e===null)return;let t=this.valueAsDate;if(e.trim()===``)t&&this.commit(null);else{let n=Oe(e,this.effectiveFormat,{strict:!1,base:t??void 0});n&&n.getTime()!==t?.getTime()&&this.commit(n)}this.draft=null}handleClear(){this.draft=null,this.commit(null),this.emit(`minerva-clear`),this.input?.focus()}handleInputClick(){this.interactive&&(this.focusPanelOnOpen=!1,this.requestOpenChange(!this.open))}handleInputKeyDown(e){e.key===`ArrowDown`&&(e.preventDefault(),this.interactive&&(this.open?this.focusFirstColumn():(this.focusPanelOnOpen=!0,this.requestOpenChange(!0)||(this.focusPanelOnOpen=!1))))}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=Ee(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=Ee(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{f(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!f(this,e))??null}handleColumnKeyDown(e,t){let n=e.currentTarget,r=e.target,i=Array.from(n.querySelectorAll(`[role="option"]`)).filter(e=>e.getAttribute(`aria-disabled`)!==`true`),a=i.indexOf(r),o=this.popup?.querySelectorAll(`[role="listbox"]`),s=o?.length??0,c=e=>o?.[e]?.querySelector(`[tabindex="0"]`)?.focus();switch(Ke(e.key,this)){case`ArrowDown`:e.preventDefault(),i[Math.min(i.length-1,a+1)]?.focus();break;case`ArrowUp`:e.preventDefault(),i[Math.max(0,a-1)]?.focus();break;case`Home`:e.preventDefault(),i[0]?.focus();break;case`End`:e.preventDefault(),i[i.length-1]?.focus();break;case`ArrowRight`:e.preventDefault(),c(Math.min(s-1,t+1));break;case`ArrowLeft`:e.preventDefault(),c(Math.max(0,t-1))}}pick(e,t){t.disabled||this.handleTimeChange(e.kind,e.toValue(t.value))}columns(e){let{t}=this.locale,n=this.use12Hours,r=Me(this.minTime),i=Me(this.maxTime),a=e.getHours(),o=e.getMinutes(),s=e.getSeconds(),c=a>=12,l=e=>n?e%12+(c?12:0):e,ee=Ma(n?12:24,this.hourStep,+!!n,e=>{let t=l(e);return!!(r&&t<r.getHours()||i&&t>i.getHours())}),te=Ma(60,this.minuteStep,0,e=>!!(r&&a===r.getHours()&&e<r.getMinutes()||i&&a===i.getHours()&&e>i.getMinutes())),u=Ma(60,this.secondStep,0,e=>{let t=r&&a===r.getHours()&&o===r.getMinutes(),n=i&&a===i.getHours()&&o===i.getMinutes();return!!(t&&e<r.getSeconds()||n&&e>i.getSeconds())}),d=[{kind:`hour`,label:t(`timePicker.hours`),items:ee,selected:n?a%12||12:a,toValue:l},{kind:`minute`,label:t(`timePicker.minutes`),items:te,selected:o,toValue:e=>e}];return this.withSeconds&&d.push({kind:`second`,label:t(`timePicker.seconds`),items:u,selected:s,toValue:e=>e}),n&&d.push({kind:`ampm`,label:t(`timePicker.period`),items:[{value:0,label:`AM`,disabled:!1},{value:1,label:`PM`,disabled:!1}],selected:+!!c,toValue:e=>e}),d}renderPanel(e,t){let n=e!==null,r=this.columns(e??re());return b`<div
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
part=${an(`item`,{selected:r,disabled:t.disabled})}
role="option"
aria-selected=${r?`true`:`false`}
aria-disabled=${t.disabled?`true`:p}
tabindex=${t.value===i?`0`:`-1`}
class=${x({timeUnit:!0,selected:r,disabled:t.disabled})}
@click=${()=>this.pick(e,t)}
@keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),this.pick(e,t))}}
>
${t.label}
</div>`})}
</div>`})}
</div>
</div>
</div>`}hookStates(){let e=this.open&&!this.isDisabled&&!this.readOnly,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?Ie(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size,side:n,align:r,placement:t}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`timePicker.label`),a=this.draft??(r?ze(r,this.effectiveFormat):``),o=!this.hideClearButton&&!!r&&!t&&!n;return b`<div part="root" class="timePicker">
<div
part="control"
class=${x({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
.value=${et(a)}
placeholder=${this.placeholder??e(`timePicker.placeholder`)}
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
${o?b`<button
part="clear-button"
type="button"
class="iconButton neutral variant-ghost small circle clearButton"
aria-label=${e(`timePicker.clear`)}
@click=${this.handleClear}
>
${Ft}
</button>`:b`<span part="icon" class="clockIcon" aria-hidden="true"
>${Rn}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(r,i):p}`}},z([h({reflect:!0})],X.prototype,`name`,void 0),z([h({attribute:!1})],X.prototype,`value`,void 0),z([h({attribute:`value`})],X.prototype,`defaultValue`,void 0),z([h({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),z([h({reflect:!0})],X.prototype,`format`,void 0),z([h({type:Boolean,reflect:!0,attribute:`use-12-hours`})],X.prototype,`use12Hours`,void 0),z([h()],X.prototype,`placeholder`,void 0),z([h()],X.prototype,`label`,void 0),z([h({reflect:!0})],X.prototype,`size`,void 0),z([h({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),z([h({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),z([h({type:Boolean,reflect:!0,attribute:`hide-clear-button`})],X.prototype,`hideClearButton`,void 0),z([h({type:Boolean,reflect:!0,attribute:`hide-second`})],X.prototype,`hideSecond`,void 0),z([h({attribute:`min-time`})],X.prototype,`minTime`,void 0),z([h({attribute:`max-time`})],X.prototype,`maxTime`,void 0),z([h({type:Number,attribute:`hour-step`})],X.prototype,`hourStep`,void 0),z([h({type:Number,attribute:`minute-step`})],X.prototype,`minuteStep`,void 0),z([h({type:Number,attribute:`second-step`})],X.prototype,`secondStep`,void 0),z([S()],X.prototype,`draft`,void 0),z([C(`input`)],X.prototype,`input`,void 0),z([C(`.timePicker`)],X.prototype,`field`,void 0),z([C(`.popup`)],X.prototype,`popup`,void 0)})))()}function Pa(e){if(e===void 0)return;if(typeof e!=`string`)return e;if(!Ra())return;let t=document.getElementById(e)??void 0;return k&&!t&&I(`minerva-toast-region`,`toast(): no element with id "${e}"; the toast is shown in the default region.`),t}var Fa,Ia,La,Ra,za,Ba,Va,Ha,Ua,Wa;function Ga(){return(Ga=e((()=>{P(),d(),Fa=4e3,Ia=200,La=`minerva-toast-region`,Ra=()=>typeof window<`u`&&typeof document<`u`,za=class{constructor(e={}){this.subscribe=e=>this.queue.subscribe(t=>e(t.toasts)),this.subscribeLifecycle=e=>this.queue.subscribeLifecycle(e),this.getSnapshot=()=>this.queue.getState().toasts,this.queue=xe({isClient:e.isClient??Ra,defaultDuration:Fa,exitDuration:200})}push(e,t){return this.queue.add(e,{region:t})}update(e,t){this.queue.update(e,t)}dismiss(e,t=`dismiss`){this.queue.dismiss(e,t)}dismissAll(){this.queue.dismissAll()}pause(e){this.queue.pause(e)}resume(e){this.queue.resume(e)}peek(){return this.getSnapshot()}reset(){this.queue.reset()}},Ba=new za,Va=`data-minerva-auto`,Ha=new class{constructor(){this.regions=[],this.listeners=new Set,this.autoPending=!1,this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)})}changed(){for(let e of[...this.listeners])e()}ordered(){return this.regions.slice().sort((e,t)=>{let n=e.compareDocumentPosition(t);return n&Node.DOCUMENT_POSITION_DISCONNECTED?0:n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}get owner(){return this.ordered()[0]??null}register(e){if(!this.regions.includes(e)){if(this.regions.push(e),!e.hasAttribute(`data-minerva-auto`))for(let e of this.regions.filter(e=>e.hasAttribute(Va)))e.remove();this.changed()}}unregister(e){let t=this.regions.indexOf(e);t<0||(this.regions.splice(t,1),this.changed())}regionOf(e){let t=e.region;return t&&this.regions.includes(t)?t:this.owner}ensureRegion(){this.autoPending||this.regions.length>0||!Ra()||(this.autoPending=!0,queueMicrotask(()=>{if(this.autoPending=!1,this.regions.length>0||!document.body||!Ba.getSnapshot().length)return;let e=document.createElement(`minerva-toast-region`);e.setAttribute(`data-minerva-auto`,``),document.body.append(e)}))}},Ua=(e,t)=>{let n=n=>{k&&!Ra()&&I(`minerva-toast-region`,`toast() called without a document (server side): the toast is ignored.`);let{region:r,...i}=n,a=Pa(r??t),o=e.push(i,a);return Ra()&&Ha.ensureRegion(),o},r=(e=>n(e));return r.info=(e,t)=>n({...t,title:e,color:`info`}),r.success=(e,t)=>n({...t,title:e,color:`success`}),r.warning=(e,t)=>n({...t,title:e,color:`warning`}),r.danger=(e,t)=>n({...t,title:e,color:`danger`}),r.loading=(e,t)=>n({...t,title:e,loading:!0}),r.promise=(e,t,r)=>{let i=n({...r,title:t.loading,loading:!0,duration:0}),a=(e,t)=>n({...r,id:i,title:t,color:e,loading:!1});return e.then(e=>a(`success`,typeof t.success==`function`?t.success(e):t.success),e=>a(`danger`,typeof t.error==`function`?t.error(e):t.error)),e},r.update=(t,n)=>{let{region:r,...i}=n;e.update(t,i)},r.dismiss=t=>t===void 0?e.dismissAll():e.dismiss(t),r.region=t=>Ua(e,t),r},Wa=Ua(Ba)})))()}var Ka,qa,Ja,Ya,Xa,Za,Qa,$a,eo;function to(){return(to=e((()=>{M(),P(),T(),Ht(),R(),_n(),j(),O(),xr(),Hn(),Ga(),m(),v(),_(),$e(),he(),d(),Qe(),Ka={info:vt,success:Vn,warning:zn,danger:Sn},qa=[`top-right`,`top-left`,`top-center`,`bottom-right`,`bottom-left`,`bottom-center`],Ja=[`F8`],Ya=`:scope > [part~="toast--open"]`,Xa=`:scope > [part~="close-button"]`,Za={fromAttribute:e=>e===null?Ja:e.split(/[\s,+]+/).map(e=>e.trim()).filter(Boolean)},Qa=0,$a=e=>{for(let t of Ha.ordered())if(t instanceof eo&&t.handleHotkey(e))return},eo=class extends F{constructor(...e){super(...e),this.position=`top-right`,this.max=1/0,this.noPauseOnHover=!1,this.hotkey=Ja,this.items=[],this.locale=new D(this),this.aria=new w(this),this.cleanups=[],this.returnFocus=null,this.refresh=()=>{if(!this.isConnected)return;let e=new Set,t=[],n=Ba.getSnapshot();for(let r=n.length-1;r>=0;--r){let i=n[r];e.has(i.id)||Ha.regionOf(i)!==this||(e.add(i.id),t.unshift(i))}let r=He(t,this.max);if(r.length>0){for(let e of r)Ba.dismiss(e.id,`overflow`);return}let i=new Set(this.items.map(e=>e.id)),a=t.some(e=>!i.has(e.id));this.items=t,a&&this.raise()},this.raise=()=>{let e=this.viewport;e&&!f(e,Ue())&&(ot(e),Jn(e))},this.onLifecycle=e=>{Ha.regionOf(e.item)===this&&(e.type===`close`?this.emit(`minerva-close`,{id:e.item.id,reason:e.reason}):this.emit(`minerva-after-close`,{id:e.item.id}))},this.onViewportFocusIn=e=>{let t=e.relatedTarget,n=e.currentTarget;t&&!f(n,t)&&(this.returnFocus=t)},this.onViewportFocusOut=e=>{let t=e.currentTarget;f(t,e.relatedTarget)||t.removeAttribute(`tabindex`)}}static{this.tagName=La}static{this.styles=[N,cr,g`
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
`,L(Dn)]}get toast(){return this.boundApi??=Ua(Ba,this),this.boundApi}connectedCallback(){super.connectedCallback(),this.cleanups=[Ba.subscribe(()=>this.refresh()),Ha.subscribe(()=>this.refresh()),Ba.subscribeLifecycle(this.onLifecycle)];let e=this.ownerDocument;e.addEventListener(`minerva-after-open`,this.raise),this.cleanups.push(()=>e.removeEventListener(`minerva-after-open`,this.raise)),Qa++===0&&e.addEventListener(`keydown`,$a),this.cleanups.push(()=>{--Qa===0&&e.removeEventListener(`keydown`,$a)}),Ha.register(this),this.refresh(),this.hasUpdated&&Jn(this.viewport)}disconnectedCallback(){super.disconnectedCallback();for(let e of this.cleanups)e();this.cleanups=[],Ha.unregister(this),ot(this.viewport)}handleHotkey(e){let t=this.viewport;if(!t||!Pe(e,this.hotkey)||!t.querySelector(Ya))return!1;e.preventDefault();let n=Ue();return n&&n!==this.ownerDocument.body&&!f(t,n)&&(this.returnFocus=n),t.setAttribute(`tabindex`,`-1`),Ve(t),!0}focus(e){let t=this.viewport;t&&(t.setAttribute(`tabindex`,`-1`),t.focus(e))}willUpdate(e){k&&e.has(`position`)&&!qa.includes(this.position)&&I(`minerva-toast-region`,`invalid position "${this.position}" (expected ${qa.join(` | `)}).`)}firstUpdated(){Jn(this.viewport)}updated(e){e.has(`max`)&&e.get(`max`)!==void 0&&queueMicrotask(()=>this.refresh())}moveFocusFrom(e){let t=this.viewport;if(!t)return;let n=Array.from(t.querySelectorAll(Ya)).filter(t=>t!==e),r=n.find(t=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??n[n.length-1];if(r){let e=r.querySelector(Xa)??Ee(r)[0];if(Ve(e))return}let i=this.returnFocus;i?.isConnected&&!f(t,i)&&Ve(i)||Ve(a(this))||(t.setAttribute(`tabindex`,`-1`),Ve(t,{preventScroll:!0}))}close(e,t,n){f(t,Ue())&&this.moveFocusFrom(t),Ba.dismiss(e.id,n)}pause(e){this.noPauseOnHover||Ba.pause(e.id)}resume(e){this.noPauseOnHover||Ba.resume(e.id)}renderIcon(e){if(e.icon===null)return p;let t=e.icon===void 0?e.loading?b`<div class="progressIndicator current" aria-hidden="true">
<span class="spinner small">${At}</span>
</div>`:Ka[e.color]:e.icon;return b`<span class="icon" part="icon" aria-hidden="true"
>${t}</span
>`}renderItem(e){let t=e.state===`closing`,n=e=>e.currentTarget.closest(`.toast`),r={state:t?`closed`:`open`,color:e.color,loading:e.loading};return b`<div
part=${an(`toast`,r)}
class=${x({toast:!0,[e.color]:!0})}
data-state=${r.state}
role=${e.color===`danger`&&!e.loading?`alert`:`status`}
style=${y(e.duration>0?{"--toast-duration":`${e.duration}ms`}:{})}
@mouseenter=${()=>this.pause(e)}
@mouseleave=${()=>this.resume(e)}
@focusin=${()=>this.pause(e)}
@focusout=${t=>{f(n(t),t.relatedTarget)||this.resume(e)}}
@keydown=${r=>{r.key!==`Escape`||t||r.isComposing||(r.preventDefault(),r.stopPropagation(),this.close(e,n(r),`escape`))}}
>
${this.renderIcon(e)}
<div class="content">
${e.title?b`<div class="title" part="title">${e.title}</div>`:p}
${e.description?b`<div class="description" part="description">
${e.description}
</div>`:p}
</div>
${e.action?b`<button
type="button"
class="action"
part="action"
@click=${t=>{e.action?.onClick(),this.close(e,n(t),`action`)}}
>
${e.action.label}
</button>`:p}
${e.closable?b`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`toast.close`)}
@click=${t=>this.close(e,n(t),`close-button`)}
>
${Ft}
</button>`:p}
${e.duration>0&&!t?b`<span
class="progress"
part="progress"
aria-hidden="true"
></span>`:p}
</div>`}render(){let e=De(this.hotkey),t=this.aria.label??(e?this.locale.t(`toast.regionWithHotkey`,{hotkey:e}):this.locale.t(`toast.region`)),n=qa.includes(this.position)?this.position:`top-right`;return b`<div
part="root"
class=${x({viewport:!0,[n]:!0})}
popover="manual"
role="region"
aria-label=${t}
dir=${ce(this)}
@focusin=${this.onViewportFocusIn}
@focusout=${this.onViewportFocusOut}
>
${Xe(this.items,e=>e.id,e=>this.renderItem(e))}
</div>`}},z([h({reflect:!0})],eo.prototype,`position`,void 0),z([h({type:Number})],eo.prototype,`max`,void 0),z([h({type:Boolean,attribute:`no-pause-on-hover`})],eo.prototype,`noPauseOnHover`,void 0),z([h({attribute:`close-label`})],eo.prototype,`closeLabel`,void 0),z([h({attribute:`hotkey`,converter:Za})],eo.prototype,`hotkey`,void 0),z([S()],eo.prototype,`items`,void 0),z([C(`.viewport`)],eo.prototype,`viewport`,void 0)})))()}var no,ro,io,ao,oo,so,Z;function co(){return(co=e((()=>{M(),P(),Ht(),j(),O(),xr(),vn(),m(),v(),_(),he(),no=6,ro=300,io=200,ao=0,oo={fromAttribute(e){if(!e)return;let t=e.trim().split(/[\s,]+/).map(Number);return t.length===2&&t.every(Number.isFinite)?[t[0],t[1]]:void 0},toAttribute(e){return e?e.join(` `):null}},so=class extends F{constructor(...e){super(...e),this.skipDelay=300,this.lastClosedAt=0}static{this.tagName=`minerva-tooltip-provider`}static{this.styles=[N,g`
:host{
display: contents;
}
`]}markClosed(){this.lastClosedAt=Date.now()}shouldSkipDelay(){return Date.now()-this.lastClosedAt<this.skipDelay}render(){return b`<slot></slot>`}},z([h({type:Number,attribute:`enter-delay`})],so.prototype,`enterDelay`,void 0),z([h({type:Number,attribute:`leave-delay`})],so.prototype,`leaveDelay`,void 0),z([h({type:Number,attribute:`skip-delay`})],so.prototype,`skipDelay`,void 0),Z=class e extends F{constructor(...e){super(...e),this.content=``,this.open=!1,this.placement=`top`,this.color=`neutral`,this.variant=`solid`,this.shape=`default`,this.animation=`fade`,this.arrow=!1,this.disabled=!1,this.followCursor=!1,this.positioned=!1,this.aria=new w(this),this.grace=Je({timeout:0}),this.cursor=null,this.described=null,this.describedPrev=null,this.floating=new pr(this,()=>{let e=this.placement,t=e.startsWith(`top`)||e.startsWith(`bottom`),n=this.arrow?no:0,r=this.offset;return{placement:e,offset:r?{mainAxis:(t?r[1]:r[0])+n,crossAxis:t?r[0]:r[1]}:{mainAxis:8+n},arrowElement:this.arrow?this.arrowEl:null,autoUpdate:this.followCursor?{animationFrame:!0}:void 0,anchor:()=>this.anchor(),floating:()=>this.panel,branches:()=>[this.wrapper],dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,focusable:!1,onDismiss:()=>{this.clearTimers(),this.requestOpen(!1)},onPosition:e=>this.handlePosition(e)}}),this.handleMouseEnter=e=>{if(this.disabled)return;this.followCursor&&(this.cursor={x:e.clientX,y:e.clientY}),this.clearTimers();let t=this.resolvedEnterDelay;if(t<=0||this.provider()?.shouldSkipDelay()){this.requestOpen(!0);return}this.enterTimer=setTimeout(()=>this.requestOpen(!0),t)},this.handleMouseLeave=e=>{if(this.disabled)return;this.clearTimers();let t=this.panel?.getBoundingClientRect();if(this.open&&!this.followCursor&&t&&t.width>0&&t.height>0){this.grace.start({x:e.clientX,y:e.clientY},t,Ie(this.currentPlacement).side),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),Math.max(this.resolvedLeaveDelay,ro));return}this.scheduleHide()},this.handlePanelMouseEnter=()=>{this.disabled||this.clearTimers()},this.handlePanelMouseLeave=()=>{this.disabled||this.followCursor||this.scheduleHide()},this.handleDocumentPointerMove=e=>{if(!this.grace.getArea())return;let t=e.composedPath();this.wrapper&&t.includes(this.wrapper)||this.panel&&t.includes(this.panel)||this.grace.isInGraceArea({x:e.clientX,y:e.clientY})||(this.grace.clear(),this.scheduleHide())},this.handleDocumentMouseMove=e=>{this.cursor={x:e.clientX,y:e.clientY}},this.handleFocusIn=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!0))},this.handleFocusOut=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!1))},this.listening=!1,this.handleSlotChange=()=>this.requestUpdate()}static{this.tagName=`minerva-tooltip`}static{this.styles=[N,cr,g`
:host{
display: inline-flex;
}
`,L(xn)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}get currentPlacement(){return this.positioned?this.floating.position.placement:this.placement}get visible(){return this.open&&!this.disabled}provider(){let e=lt(this,`minerva-tooltip-provider`);return e instanceof so?e:null}get resolvedEnterDelay(){return this.enterDelay??this.provider()?.enterDelay??io}get resolvedLeaveDelay(){return this.leaveDelay??this.provider()?.leaveDelay??ao}triggerElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}get text(){return this.aria.label||(this.content.trim()?this.content.trim():Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`content`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `))}anchor(){return this.followCursor&&this.cursor?{getBoundingClientRect:()=>{let{x:e,y:t}=this.cursor??{x:0,y:0};return DOMRect.fromRect({x:e,y:t,width:0,height:0})}}:this.wrapper}requestOpen(e){e!==this.open&&(e||this.provider()?.markClosed(),this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.grace.clear()}scheduleHide(){clearTimeout(this.leaveTimer),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),this.resolvedLeaveDelay)}handlePosition(e){let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`),this.positioned||=!0}inPanel(e){return!!this.panel&&e.composedPath().includes(this.panel)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`focusout`,this.handleFocusOut),this.listenDocument(!1),clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.restoreDescription()}listenDocument(e){e!==this.listening&&(this.listening=e,e?(document.addEventListener(`pointermove`,this.handleDocumentPointerMove),document.addEventListener(`mousemove`,this.handleDocumentMouseMove)):(document.removeEventListener(`pointermove`,this.handleDocumentPointerMove),document.removeEventListener(`mousemove`,this.handleDocumentMouseMove)))}firstUpdated(){k&&setTimeout(()=>this.checkUsage())}checkUsage(){if(!this.isConnected)return;this.text||I(e.tagName,`has no content: set the "content" attribute, aria-label or slot="content".`);let t=this.triggerElement();!this.disabled&&t&&Ee(t,{includeContainer:!0}).length===0&&I(e.tagName,`the trigger is not focusable, so keyboard users cannot reach the tooltip; wrap a button / link or add tabindex="0".`)}willUpdate(e){(e.has(`open`)||e.has(`disabled`))&&(!this.open||this.disabled)&&(this.positioned=!1,this.grace.clear())}updated(){let e=this.visible;this.floating.sync(e),this.listenDocument(e),this.syncDescription(e)}syncDescription(e){let t=e?this.text:``,n=t?this.triggerElement():null;if(this.described&&this.described!==n&&this.restoreDescription(),!n)return;this.described!==n&&(this.described=n,this.describedPrev=n.getAttribute(`aria-description`));let r=this.describedPrev?`${this.describedPrev} ${t}`:t;n.getAttribute(`aria-description`)!==r&&n.setAttribute(`aria-description`,r)}restoreDescription(){let e=this.described;e&&(this.describedPrev===null?e.removeAttribute(`aria-description`):e.setAttribute(`aria-description`,this.describedPrev),this.described=null,this.describedPrev=null)}hookStates(){let e=this.currentPlacement;return{state:this.visible?`open`:`closed`,disabled:this.disabled,color:this.color,variant:this.variant,shape:this.shape,...Ie(e),placement:e}}render(){let e=this.visible,t=this.currentPlacement,n=e&&!this.triggerElement();return b`<div
class="tooltipTrigger"
part="trigger"
aria-describedby=${n?`tooltip`:p}
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
dir=${ce(this)}
aria-label=${this.aria.label??p}
data-placement=${t}
class=${x({tooltip:!0,[this.color]:!0,[this.variant]:!0,[this.shape]:!0,[`animation-${this.animation}`]:!0,followCursor:this.followCursor,arrow:this.arrow,show:this.positioned})}
@mouseenter=${this.handlePanelMouseEnter}
@mouseleave=${this.handlePanelMouseLeave}
>
<slot name="content" @slotchange=${this.handleSlotChange}
>${this.content}</slot
>${this.arrow?b`<div class="tooltipArrow" part="arrow"></div>`:p}
</div>`:p}`}},z([h()],Z.prototype,`content`,void 0),z([h({type:Boolean,reflect:!0})],Z.prototype,`open`,void 0),z([h({reflect:!0})],Z.prototype,`placement`,void 0),z([h({reflect:!0})],Z.prototype,`color`,void 0),z([h({reflect:!0})],Z.prototype,`variant`,void 0),z([h({reflect:!0})],Z.prototype,`shape`,void 0),z([h({reflect:!0})],Z.prototype,`animation`,void 0),z([h({type:Boolean,reflect:!0})],Z.prototype,`arrow`,void 0),z([h({type:Boolean,reflect:!0})],Z.prototype,`disabled`,void 0),z([h({type:Number,attribute:`enter-delay`})],Z.prototype,`enterDelay`,void 0),z([h({type:Number,attribute:`leave-delay`})],Z.prototype,`leaveDelay`,void 0),z([h({converter:oo})],Z.prototype,`offset`,void 0),z([h({type:Boolean,reflect:!0,attribute:`follow-cursor`})],Z.prototype,`followCursor`,void 0),z([C(`.tooltipTrigger`)],Z.prototype,`wrapper`,void 0),z([C(`[part=content]`)],Z.prototype,`panel`,void 0),z([C(`.tooltipArrow`)],Z.prototype,`arrowEl`,void 0),z([S()],Z.prototype,`positioned`,void 0)})))()}var lo,Q;function uo(){return(uo=e((()=>{M(),P(),T(),R(),_n(),j(),O(),bn(),mn(),rr(),un(),m(),v(),_(),d(),Qe(),lo=0,Q=class e extends A{constructor(...e){super(...e),this.label=``,this.items=[],this.accept=`*`,this.multiple=!1,this.replace=!1,this.loading=!1,this.removable=!1,this.retryable=!1,this.error=``,this.dragging=!1,this.uploadId=`upload-${lo++}`,this.nextId=0,this.pendingRemoval=null,this.locale=new D(this),this.aria=new w(this,()=>this.labels)}static{this.tagName=`minerva-upload`}static{this.dependencies=[nr]}static{this.styles=[N,g`
:host{
display: block;
min-width: 0;
}
`,L(An),L(Bn),g`

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
`]}get files(){return this.items.flatMap(e=>e.file?[e.file]:[])}get resolvedMaxCount(){return this.maxCount??(this.multiple?50:1)}get existingCount(){return this.replace&&!this.multiple?0:this.items.length}get blocked(){return this.isDisabled||this.loading||this.existingCount>=this.resolvedMaxCount}focus(e){this.renderRoot.querySelector(`[part=select-button]`)?.focus(e)}showPicker(){this.blocked||this.input?.click()}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.files)e.append(this.name,t);return e}getValidity(){return this.required&&this.files.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.fileMissing`),anchor:this.renderRoot.querySelector(`[part=select-button]`)??null}:{flags:{},message:``}}resetFormValue(){this.items=[],this.error=``}restoreFormState(e){e instanceof FormData&&(this.items=e.getAll(this.name).filter(e=>e instanceof File).map(e=>this.toItem(e)))}willUpdate(t){k&&(t.has(`maxCount`)||t.has(`multiple`))&&!this.multiple&&this.maxCount!==void 0&&this.maxCount>1&&I(e.tagName,`max-count (${this.maxCount}) has no effect without multiple: one file is picked at a time.`)}updated(e){super.updated(e);let t=this.pendingRemoval;if(!t||this.items.some(e=>e.id===t.id))return;this.pendingRemoval=null;let n=t.nextId?Array.from(this.renderRoot.querySelectorAll(`[data-item-id]`)).find(e=>e.dataset.itemId===t.nextId)?.querySelector(`[part=remove-button]`):null;n?n.focus():this.focus()}toItem(e){return{id:`${this.uploadId}-${this.nextId++}`,name:e.name,status:`done`,file:e}}select(e){if(this.blocked||e.length===0)return;let{t}=this.locale,n=this.texts,r=this.resolvedMaxCount;if(!this.multiple&&e.length>1||e.length+this.existingCount>r){this.error=n?.tooMany?.(r)??t(`upload.tooMany`,{count:r});return}let i=e.find(e=>!u(e,this.accept));if(i){this.error=n?.invalidType?.(i.name)??t(`upload.invalidType`,{name:i.name});return}let a=this.maxSize,o=a===void 0?void 0:e.find(e=>e.size>a);if(o){this.error=n?.tooLarge?.(o.name)??t(`upload.tooLarge`,{name:o.name});return}if(this.error=``,!this.emit(`minerva-files-selected`,{files:e},{cancelable:!0}))return;let s=e.map(e=>this.toItem(e));this.items=this.replace&&!this.multiple?s:[...this.items,...s],this.notifyChange()}notifyChange(){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.items})}removeItem(e){if(this.isDisabled)return;let t=this.items.indexOf(e),n=this.items[t+1]??this.items[t-1];this.pendingRemoval={id:e.id,nextId:n?.id},this.emit(`minerva-remove`,{item:e},{cancelable:!0})&&(this.items=this.items.filter(t=>t!==e),this.notifyChange())}retry(e){this.isDisabled||this.loading||this.emit(`minerva-retry`,{item:e})}handleInputChange(){let e=Array.from(this.input.files??[]);this.input.value=``,this.select(e)}handleDragOver(e){e.preventDefault(),this.blocked||(this.dragging=!0)}handleDragLeave(e){e.currentTarget.contains(e.relatedTarget)||(this.dragging=!1)}handleDrop(e){e.preventDefault(),this.dragging=!1,this.select(Array.from(e.dataTransfer?.files??[]))}statusText(e){let{t}=this.locale,n=this.texts;return e.status===`uploading`?n?.uploading??t(`upload.uploading`):e.status===`error`?e.error||(n?.failed??t(`upload.failed`)):n?.done??t(`upload.done`)}hookStates(){return{disabled:this.isDisabled,loading:this.loading,dragging:this.dragging&&!this.blocked}}render(){let{t:e}=this.locale,t=this.texts,n=this.blocked,r=this.isDisabled,i=this.label||this.aria.label;return b`<div
part="root"
class="upload"
role="group"
aria-labelledby=${this.label?`label`:p}
aria-label=${!this.label&&i?i:p}
aria-description=${this.aria.description??p}
aria-busy=${this.loading?`true`:`false`}
>
<span id="label" part="label" class="label">${this.label}</span>
<div
part="dropzone"
class=${x({dropzone:!0,dragging:this.dragging&&!n})}
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
<span slot="start">${fn}</span>
${t?.select??e(`upload.select`)}
</minerva-button>
<input
type="file"
hidden
tabindex="-1"
aria-label=${i||p}
?disabled=${n}
accept=${this.accept}
?multiple=${this.multiple}
@change=${this.handleInputChange}
/>
</div>
${this.error?b`<div part="error" class="error" role="alert">
${this.error}
</div>`:p}
${this.items.length>0?b`<ul part="list" class="list">
${Xe(this.items,e=>e.id,n=>b`<li
part=${an(`item`,{status:n.status})}
class="item"
data-item-id=${n.id}
>
${n.previewUrl?b`<img
src=${n.previewUrl}
alt=""
class="preview"
/>`:p}
<div class="info">
<span>${n.name}</span>
<span
role=${n.status===`error`?`alert`:`status`}
class=${x({status:!0,statusError:n.status===`error`})}
>${this.statusText(n)}</span
>
</div>
<div class="actions">
${n.status===`error`&&this.retryable?b`<button
part="retry-button"
type="button"
class=${x({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r||this.loading})}
aria-label=${t?.retry?.(n.name)??e(`upload.retry`,{name:n.name})}
?disabled=${r||this.loading}
@click=${()=>this.retry(n)}
>
${er}
</button>`:p}
${this.removable?b`<button
part="remove-button"
type="button"
class=${x({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r})}
aria-label=${t?.remove?.(n.name)??e(`upload.remove`,{name:n.name})}
?disabled=${r}
@click=${()=>this.removeItem(n)}
>
${Ft}
</button>`:p}
</div>
</li>`)}
</ul>`:p}
</div>`}},z([h()],Q.prototype,`label`,void 0),z([h({attribute:!1})],Q.prototype,`items`,void 0),z([h()],Q.prototype,`accept`,void 0),z([h({type:Boolean,reflect:!0})],Q.prototype,`multiple`,void 0),z([h({type:Boolean})],Q.prototype,`replace`,void 0),z([h({type:Number,attribute:`max-count`})],Q.prototype,`maxCount`,void 0),z([h({type:Number,attribute:`max-size`})],Q.prototype,`maxSize`,void 0),z([h({type:Boolean,reflect:!0})],Q.prototype,`loading`,void 0),z([h({type:Boolean})],Q.prototype,`removable`,void 0),z([h({type:Boolean})],Q.prototype,`retryable`,void 0),z([h({attribute:!1})],Q.prototype,`texts`,void 0),z([S()],Q.prototype,`error`,void 0),z([S()],Q.prototype,`dragging`,void 0),z([C(`input[type=file]`)],Q.prototype,`input`,void 0)})))()}var $;function fo(){return(fo=e((()=>{M(),P(),T(),R(),j(),O(),Nn(),Mn(),m(),v(),_(),$e(),d(),Qe(),$=class e extends F{constructor(...e){super(...e),this.items=[],this.itemPadding=8,this.overscan=5,this.loadMoreThreshold=100,this.highPerformance=!1,this.loading=!1,this.clickable=!1,this.scrollOffset=0,this.containerHeight=0,this.measuredHeight=0,this.focusedId=null,this.aria=new w(this),this.locale=new D(this),this.resizeObserver=null,this.measureObserver=null,this.lastScrollTop=0,this.loadingMore=!1}static{this.tagName=`minerva-virtual-list`}static{this.styles=[N,g`
:host{
display: block;
}
.wave{
display: inline-flex;
}
`,L(cn),L(on)]}get scrollContainer(){return this.container??null}scrollToIndex(e){let t=this.container,n=this.rowHeight;t&&n&&(t.scrollTop=Math.max(0,e)*n,this.updateScroll(t.scrollTop))}get rowHeight(){return this.itemHeight?this.itemHeight:this.measuredHeight>0?this.measuredHeight+this.itemPadding*2:0}get needsMeasure(){return!this.itemHeight&&this.measuredHeight===0&&this.items.length>0}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.measureObserver?.disconnect(),this.measureObserver=null,this.cancelScheduled()}firstUpdated(){this.observeContainer()}reconnectedCallback(){super.reconnectedCallback(),this.observeContainer()}observeContainer(){let e=this.container;e&&(this.containerHeight=e.clientHeight,!(this.resizeObserver||typeof ResizeObserver>`u`)&&(this.resizeObserver=new ResizeObserver(e=>{for(let t of e)this.containerHeight=t.contentRect.height}),this.resizeObserver.observe(e)))}willUpdate(e){(e.has(`items`)||e.has(`loading`))&&(this.loadingMore=!1),this.focusedId!==null&&e.has(`items`)&&!this.items.some(e=>e.id===this.focusedId)&&(this.focusedId=null)}updated(){this.syncMeasure(),k&&this.items.length>0&&!this.renderItem&&I(e.tagName,`set the renderItem property (a function returning the content of a row); rows show the item id meanwhile.`),k&&this.maxHeight===void 0&&I(e.tagName,`set max-height (pixels): without a bounded height the list cannot scroll, so every row is rendered.`)}syncMeasure(){let e=this.needsMeasure?this.measureElement:void 0;if(!e){this.measureObserver?.disconnect(),this.measureObserver=null;return}let t=()=>{let t=e.offsetHeight;t>0&&(this.measuredHeight=t)};t(),!(this.measureObserver||typeof ResizeObserver>`u`)&&(this.measureObserver=new ResizeObserver(t),this.measureObserver.observe(e))}cancelScheduled(){this.raf!==void 0&&(cancelAnimationFrame(this.raf),this.raf=void 0),this.idle!==void 0&&(typeof cancelIdleCallback==`function`&&cancelIdleCallback(this.idle),this.idle=void 0)}schedule(e){if(!this.highPerformance){e();return}this.cancelScheduled(),this.raf=requestAnimationFrame(()=>{this.raf=void 0,typeof requestIdleCallback==`function`?this.idle=requestIdleCallback(()=>{this.idle=void 0,e()},{timeout:100}):e()})}updateScroll(e){this.scrollOffset=e}handleScroll(e){let{scrollTop:t,scrollHeight:n,clientHeight:r}=e.currentTarget,i=t>this.lastScrollTop;this.lastScrollTop=t,this.schedule(()=>{this.updateScroll(t),i&&!this.loadingMore&&!this.loading&&n-t-r<this.loadMoreThreshold&&n>r&&(this.loadingMore=!0,this.emit(`minerva-load-more`))})}visibleWindow(){let e=this.rowHeight;if(!e)return[];let{start:t,end:n}=ne({scrollTop:this.scrollOffset,viewportHeight:this.containerHeight,itemHeight:e,itemCount:this.items.length,overscan:this.overscan}),r=[];for(let i=t;i<n;i++)r.push({index:i,start:i*e});if(this.focusedId!==null){let i=this.items.findIndex(e=>e.id===this.focusedId);if(i>=0&&(i<t||i>=n)){let n={index:i,start:i*e};i<t?r.unshift(n):r.push(n)}}return r}renderContent(e,t){return this.renderItem?this.renderItem(e,t):String(e.id)}activate(e,t){this.emit(`minerva-item-click`,{item:e,index:t})}handleRowKeyDown(e,t,n){e.composedPath()[0]===e.currentTarget&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.activate(t,n))}handleRowFocusOut(e){let t=e.currentTarget,n=e.relatedTarget;(!n||!t.contains(n))&&(this.focusedId=null)}hookStates(){return{loading:this.loading}}render(){let e=this.rowHeight,t=this.aria.label??p,n=this.visibleWindow(),r=this.items.length;return b`<div
class="virtualList"
part="root"
role="region"
tabindex="0"
aria-label=${t}
aria-busy=${this.loading?`true`:p}
style=${y({maxHeight:this.maxHeight===void 0?void 0:`${this.maxHeight}px`,overflow:`auto`,position:`relative`})}
@scroll=${this.handleScroll}
>
${this.needsMeasure?b`<div class="measureItem" aria-hidden="true">
${this.renderContent(this.items[0],0)}
</div>`:p}
<div
class="virtualListContent"
part="list"
role="list"
aria-label=${t}
style=${y({height:e?`${r*e}px`:`auto`,position:`relative`,willChange:`transform`})}
>
${Xe(n,e=>this.items[e.index].id,t=>{let n=this.items[t.index];return b`<div
part="item"
role="listitem"
class=${x({virtualListItem:!0,clickable:this.clickable})}
style=${y({position:`absolute`,top:`0`,transform:`translateY(${t.start}px)`,width:`100%`,height:`${e}px`,willChange:`transform`,padding:`${this.itemPadding}px`})}
tabindex=${this.clickable?`0`:p}
aria-setsize=${r}
aria-posinset=${t.index+1}
@click=${this.clickable?()=>this.activate(n,t.index):p}
@keydown=${this.clickable?e=>this.handleRowKeyDown(e,n,t.index):p}
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
<span class="wave" aria-hidden="true">${sn}</span>
</div>
</div>
</div>`:p}
</div>`}},z([h({attribute:!1})],$.prototype,`items`,void 0),z([h({attribute:!1})],$.prototype,`renderItem`,void 0),z([h({type:Number,attribute:`item-height`})],$.prototype,`itemHeight`,void 0),z([h({type:Number,attribute:`item-padding`})],$.prototype,`itemPadding`,void 0),z([h({type:Number})],$.prototype,`overscan`,void 0),z([h({type:Number,attribute:`max-height`})],$.prototype,`maxHeight`,void 0),z([h({type:Number,attribute:`load-more-threshold`})],$.prototype,`loadMoreThreshold`,void 0),z([h({type:Boolean,attribute:`high-performance`})],$.prototype,`highPerformance`,void 0),z([h({type:Boolean,reflect:!0})],$.prototype,`loading`,void 0),z([h({type:Boolean,reflect:!0})],$.prototype,`clickable`,void 0),z([S()],$.prototype,`scrollOffset`,void 0),z([S()],$.prototype,`containerHeight`,void 0),z([S()],$.prototype,`measuredHeight`,void 0),z([S()],$.prototype,`focusedId`,void 0),z([C(`.virtualList`)],$.prototype,`container`,void 0),z([C(`.measureItem`)],$.prototype,`measureElement`,void 0)})))()}export{ki as $,fa as A,Mr as At,Zi as B,B as Bt,Aa as C,U as Ct,Sa as D,Rr as Dt,xa as E,H as Et,ua as F,Dr as Ft,Wi as G,$i as H,q as I,wr as It,Bi as J,Vi as K,ia as L,kr as Lt,ca as M,V as Mt,sa as N,Ar as Nt,Y as O,Nr as Ot,la as P,Or as Pt,Oi as Q,ea as R,Er as Rt,Ca as S,Gr as St,ja as T,Hr as Tt,Qi as U,Xi as V,Ui as W,Ii as X,Fi as Y,Ti as Z,Fa as _,Yr as _t,so as a,gi as at,X as b,Xr as bt,eo as c,mi as ct,Ba as d,ai as dt,Ei as et,Ua as f,W as ft,Wa as g,Kr as gt,Va as h,ei as ht,uo as i,xi as it,J as j,jr as jt,ba as k,Pr as kt,to as l,pi as lt,Ga as m,ti as mt,$ as n,Si as nt,Z as o,G as ot,Ia as p,$r as pt,K as q,Q as r,Ci as rt,co as s,_i as st,fo as t,Di as tt,La as u,ni as ut,za as v,Zr as vt,ka as w,Ur as wt,Na as x,Jr as xt,Ha as y,qr as yt,ta as z,Cr as zt};