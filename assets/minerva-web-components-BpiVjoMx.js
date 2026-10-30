import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{$t as t,At as n,B as r,Bt as i,C as a,Ct as o,D as s,Dt as c,Et as l,Ft as ee,H as te,Ht as ne,It as u,Jt as re,K as ie,Kt as ae,L as d,Lt as oe,M as se,Mt as ce,O as le,Ot as ue,Q as de,Qt as fe,R as pe,Rt as me,St as he,T as ge,Tt as _e,U as ve,Vt as ye,W as be,Wt as xe,X as Se,Xt as Ce,Z as we,Zt as Te,_t as Ee,a as De,dn as Oe,dt as ke,ft as Ae,h as je,i as Me,it as Ne,jt as Pe,lt as Fe,m as Ie,n as Le,nn as Re,nt as ze,on as Be,rn as Ve,s as He,st as Ue,t as We,tn as Ge,wt as Ke,x as qe,xt as Je,y as Ye,zt as Xe}from"./angular-preview-l4x8c_2r.js";import{A as f,D as p,E as m,I as h,_ as g,a as Ze,b as _,d as Qe,g as v,i as $e,j as y,m as et,p as tt,v as b,w as x,x as S}from"./minerva-web-components-Csj0uz1j.js";import{a as nt,c as rt,i as it,n as at,o as ot,r as st,s as ct,t as lt}from"./angular-preview-CuqFtkb7.js";import{i as ut,r as dt}from"./angular-preview-B5skLbni.js";import{$ as ft,$n as pt,A as mt,Ar as C,B as ht,C as gt,Cr as _t,D as vt,E as yt,Er as bt,F as xt,Fr as St,Ft as Ct,G as wt,Gn as w,H as Tt,Hn as Et,Ht as Dt,I as Ot,In as kt,It as At,J as jt,K as Mt,L as Nt,Lt as Pt,M as Ft,Mr as It,N as Lt,Nn as Rt,Nr as zt,O as Bt,On as Vt,Or as Ht,P as Ut,Pn as Wt,Pr as T,Q as Gt,Qn as Kt,R as qt,Rt as Jt,S as Yt,Sr as E,St as Xt,T as Zt,Tn as Qt,Tr as $t,U as en,Un as tn,V as nn,Vn as rn,Vt as an,W as on,Wn as sn,X as cn,Xn as ln,Xt as un,Y as dn,Yt as fn,Z as pn,Zn as mn,_ as hn,_r as gn,a as _n,ar as vn,at as yn,b as bn,bn as D,c as xn,cr as O,dn as k,dr as Sn,er as Cn,et as wn,fn as Tn,fr as En,g as Dn,gr as On,gt as kn,h as An,hn as jn,hr as A,ht as Mn,ir as Nn,j as Pn,jn as Fn,jr as In,k as Ln,kr as j,l as Rn,ln as zn,m as Bn,mn as Vn,mr as M,mt as Hn,o as Un,or as N,ot as Wn,p as Gn,pn as Kn,pr as P,pt as qn,q as Jn,qn as Yn,rr as Xn,s as Zn,sr as F,tr as Qn,u as $n,un as er,v as tr,vr as nr,w as rr,wn as ir,wr as ar,x as or,xn as I,xr as L,xt as sr,y as cr,yr as lr,z as ur,zn as dr}from"./minerva-web-components-C-nc289P.js";import{t as R}from"./minerva-web-components-D61_qRVd.js";import{K as fr,Sn as pr,_n as mr,q as hr,vn as gr,xn as _r}from"./minerva-web-components-wgIDfve0.js";import{_ as vr,a as yr,c as br,d as xr,f as Sr,g as Cr,h as wr,i as Tr,l as Er,m as Dr,n as Or,o as kr,p as Ar,r as jr,s as Mr,t as Nr,u as Pr}from"./minerva-web-components-C6ytsEeJ.js";var Fr,z;function Ir(){return(Ir=e((()=>{j(),N(),w(),$t(),L(),On(),A(),D(),At(),kr(),p(),_(),g(),u(),$e(),Fr={fromAttribute:e=>(e??``).split(/[\s,]+/).map(e=>parseInt(e,10)).filter(e=>!isNaN(e)&&e>0),toAttribute:e=>e.join(`,`)},z=class e extends P{constructor(...e){super(...e),this.current=1,this.total=0,this.pageSize=10,this.disabled=!1,this.showQuickJumper=!1,this.showSizeChanger=!1,this.pageSizeOptions=[10,20,50,100],this.showTotal=!1,this.size=`medium`,this.shape=`rounded`,this.variant=`solid`,this.simple=!1,this.hideEdges=!1,this.hideNumbers=!1,this.responsive=!1,this.jumpValue=``,this.simpleDraft=null,this.ripples=[],this.aria=new C(this),this.locale=new E(this),this.nextRippleId=0,this.restoreFocus=null,this.pagination=new yr(this,Je(this.paginationProps()),()=>!1),this.handleKeyDown=e=>{let t=e.key;(t===`ArrowLeft`||t===`ArrowRight`)&&le(this)===`rtl`&&(t=t===`ArrowLeft`?`ArrowRight`:`ArrowLeft`);let n=ae(t,this.current,this.totalPages);n!==null&&(e.preventDefault(),this.changePage(n,`active`))},this.handleJump=e=>{if(e.key!==`Enter`)return;e.preventDefault();let t=parseInt(this.jumpValue,10);!isNaN(t)&&t>=1&&t<=this.totalPages&&(this.changePage(t),this.jumpValue=``,e.target.value=``)},this.handleSizeChange=e=>{let t=e.target,n=parseInt(t.value,10);this.send({type:`SET_PAGE_SIZE`,pageSize:n}),this.pageSize!==n&&(t.value=String(this.pageSize))},this.commitSimpleDraft=()=>{let e=this.simpleDraft;if(e===null)return;this.simpleDraft=null;let t=parseInt(e,10);isNaN(t)||this.changePage(Math.min(Math.max(t,1),this.totalPages))}}static{this.tagName=`minerva-pagination`}static{this.styles=[M,h`
:host{
display: block;
}
`,I(Ct)]}paginationProps(){return{page:this.current,pageSize:this.pageSize,total:this.total,disabled:this.disabled,onChange:(e,t)=>this.request(e,t)}}send(e){this.pagination.sync(this.paginationProps()),this.pagination.send(e)}get totalPages(){return Ce(this.total,this.pageSize)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}request(e,t){let n={page:e,pageSize:t};return this.emit(`minerva-page-change`,n,{cancelable:!0})?(this.current=e,this.pageSize=t,!0):!1}changePage(e,t=`if-lost`){Ee(this.current,e,this.totalPages,this.disabled)&&(this.restoreFocus={mode:t,page:e},this.send({type:`GOTO`,page:e}))}willUpdate(t){O&&(t.has(`current`)||t.has(`total`))&&this.total>0&&this.current>this.totalPages&&F(e.tagName,`current (${this.current}) is greater than the number of pages (${this.totalPages}).`)}updated(){let e=this.restoreFocus;this.restoreFocus=null;let t=this.shadowRoot;if(!e||!t||e.page!==this.current)return;let n=t.activeElement,r=!n||n.disabled===!0;(e.mode===`active`||r)&&(t.querySelector(`[aria-current="page"]`)??t.querySelector(`button:not(:disabled), input`))?.focus()}handleItemClick(e,t,n){if(Ee(this.current,e,this.totalPages,this.disabled)){if(n.detail>0){let e=n.currentTarget.getBoundingClientRect();this.ripples=[...this.ripples,{x:n.clientX-e.left,y:n.clientY-e.top,id:this.nextRippleId++,itemKey:t}],clearTimeout(this.rippleTimer),this.rippleTimer=setTimeout(()=>this.ripples=[],1e3)}this.changePage(e)}}label(e,t){let n=this.labels,r=this.locale.t;switch(e){case`prev`:return n?.prev??r(`pagination.prev`);case`next`:return n?.next??r(`pagination.next`);case`jump-prev`:return n?.jumpPrev??r(`pagination.jumpPrev`);case`jump-next`:return n?.jumpNext??r(`pagination.jumpNext`);default:return n?.page?.(t)??r(`pagination.page`,{page:t})}}hookStates(){return{disabled:this.disabled,size:this.size,shape:this.shape,variant:this.variant}}renderItem(e){let{type:t,target:n,key:r}=e;if(t===`ellipsis`)return y`<span class="ellipsis" aria-hidden="true">…</span>`;let i=this.current,a=t===`page`&&n===i,o=this.disabled||(t===`prev`?i<=1:t===`next`&&i>=this.totalPages),s;switch(t){case`prev`:s=y`<slot name="prev-icon">${tn}</slot>`;break;case`next`:s=y`<slot name="next-icon">${Et}</slot>`;break;case`jump-prev`:case`jump-next`:s=y`<span class="jumpWrapper"
><slot
name=${t===`jump-prev`?`jump-prev-icon`:`jump-next-icon`}
>${pt}</slot
><span class="jumpHint" aria-hidden="true"
>${this.label(t,n)}</span
></span
>`;break;default:s=n}return this.itemRender&&(s=this.itemRender(n,t)),y`<button
type="button"
part=${gn(`item`,{current:a,disabled:o})}
data-key=${r}
class=${b({item:!0,active:a,disabled:o,prev:t===`prev`,next:t===`next`,jump:t===`jump-prev`||t===`jump-next`})}
?disabled=${o}
aria-label=${this.label(t,n)}
aria-current=${a?`page`:f}
@keydown=${this.handleKeyDown}
@click=${e=>this.handleItemClick(n,r,e)}
>
${s}
${this.ripples.filter(e=>e.itemKey===r).map(e=>y`<span
class="ripple"
style="left:${e.x}px;top:${e.y}px"
aria-hidden="true"
></span>`)}
</button>`}items(){return fe({page:this.current,totalPages:this.totalPages,siblingCount:this.siblingCount,boundaryCount:this.boundaryCount,hideEdges:this.hideEdges}).map(({key:e,kind:t,page:n})=>({key:e,type:t,target:n}))}renderPageList(){let e=this.current,t=t=>this.hideEdges?f:this.renderItem({key:t,type:t,target:t===`prev`?e-1:e+1});return this.simple?y`${t(`prev`)}
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
${t(`next`)}`:this.hideNumbers?y`${t(`prev`)}
<span class="counter" aria-live="polite"
>${e} / ${this.totalPages}</span
>
${t(`next`)}`:Ze(this.items(),e=>e.key,e=>this.renderItem(e))}render(){let e=this.locale.t,t=this.labels,n=this.total,r=this.pageSize,i=ee(this.current,r,n),a=this.pageSizeOptions.includes(r)?this.pageSizeOptions:[...this.pageSizeOptions,r].sort((e,t)=>e-t),o=n=>t?.pageSizeOption?.(n)??e(`pagination.pageSizeOption`,{size:n});return y`<nav
part="root"
aria-label=${this.aria.label??t?.nav??e(`pagination.nav`)}
class=${b({pagination:!0,disabled:this.disabled,small:this.size===`small`,large:this.size===`large`,circle:this.shape===`circle`,square:this.shape===`square`,[this.variant]:!0,responsive:this.responsive})}
>
${this.showTotal?y`<div
part="total"
class="total"
aria-live="polite"
aria-atomic="true"
>
${this.totalRender?this.totalRender(n,i):t?.total?.(n)??e(`pagination.total`,{total:n})}
</div>`:f}
${this.renderPageList()}
${this.showQuickJumper?y`<label part="jumper" class="jumper">
${t?.jumpTo??e(`pagination.jumpTo`)}
<input
.value=${this.jumpValue}
?disabled=${this.disabled}
inputmode="numeric"
aria-label=${t?.jumpToInput??e(`pagination.jumpToInput`)}
@input=${e=>this.jumpValue=e.target.value}
@keydown=${this.handleJump}
/>
</label>`:f}
${this.showSizeChanger?y`<div class="sizeChanger">
<select
part="size-changer"
?disabled=${this.disabled}
aria-label=${t?.pageSize??e(`pagination.pageSize`)}
@change=${this.handleSizeChange}
>
${a.map(e=>y`<option
value=${e}
.selected=${e===r}
>
${o(e)}
</option>`)}
</select>
</div>`:f}
</nav>`}},R([m({type:Number,reflect:!0})],z.prototype,`current`,void 0),R([m({type:Number})],z.prototype,`total`,void 0),R([m({type:Number,reflect:!0,attribute:`page-size`})],z.prototype,`pageSize`,void 0),R([m({type:Boolean,reflect:!0})],z.prototype,`disabled`,void 0),R([m({type:Boolean,attribute:`show-quick-jumper`})],z.prototype,`showQuickJumper`,void 0),R([m({type:Boolean,attribute:`show-size-changer`})],z.prototype,`showSizeChanger`,void 0),R([m({attribute:`page-size-options`,converter:Fr})],z.prototype,`pageSizeOptions`,void 0),R([m({type:Boolean,attribute:`show-total`})],z.prototype,`showTotal`,void 0),R([m({attribute:!1})],z.prototype,`totalRender`,void 0),R([m({attribute:!1})],z.prototype,`itemRender`,void 0),R([m({reflect:!0})],z.prototype,`size`,void 0),R([m({reflect:!0})],z.prototype,`shape`,void 0),R([m({reflect:!0})],z.prototype,`variant`,void 0),R([m({type:Boolean,reflect:!0})],z.prototype,`simple`,void 0),R([m({type:Number,attribute:`sibling-count`})],z.prototype,`siblingCount`,void 0),R([m({type:Number,attribute:`boundary-count`})],z.prototype,`boundaryCount`,void 0),R([m({type:Boolean,attribute:`hide-edges`})],z.prototype,`hideEdges`,void 0),R([m({type:Boolean,attribute:`hide-numbers`})],z.prototype,`hideNumbers`,void 0),R([m({type:Boolean,reflect:!0})],z.prototype,`responsive`,void 0),R([m({attribute:!1})],z.prototype,`labels`,void 0),R([x()],z.prototype,`jumpValue`,void 0),R([x()],z.prototype,`simpleDraft`,void 0),R([x()],z.prototype,`ripples`,void 0)})))()}function Lr(e,t,n,r){let i=t==null?{base:1}:typeof t==`number`?{base:t}:t,a={},o=1;for(let t of Rr){let n=i[t]??o;(!Number.isInteger(n)||n<1||n>12)&&(O&&F(e,`columns must be integers from 1 to 12 (got ${String(n)} for "${t}"); using ${o}.`),n=o),a[`--grid-columns-${t}`]=String(n),o=n}return a[`--grid-row-gap`]=_e(n),a[`--grid-column-gap`]=_e(r),a}var Rr,zr,Br,Vr;function Hr(){return(Hr=e((()=>{N(),A(),D(),_r(),Xt(),p(),_(),et(),Rr=[`base`,`sm`,`md`,`lg`],zr={fromAttribute(e){if(e===null)return;let t=e.trim();if(t.startsWith(`{`))try{return JSON.parse(t)}catch{return NaN}let n=t.split(/[\s,]+/).filter(Boolean).map(Number);if(n.length<=1)return n[0]??NaN;let[r,i,a,o]=n;return{base:r,sm:i,md:a,lg:o}},toAttribute(e){return e===void 0?null:typeof e==`number`?String(e):JSON.stringify(e)}},Br=class e extends P{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-responsive-grid`}static{this.styles=[M,h`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,I(sr)]}render(){let t=Lr(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return y`<div class="root" part="root" style=${v(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},R([m({converter:zr})],Br.prototype,`columns`,void 0),R([m({converter:pr})],Br.prototype,`gap`,void 0),R([m({attribute:`row-gap`,converter:pr})],Br.prototype,`rowGap`,void 0),R([m({attribute:`column-gap`,converter:pr})],Br.prototype,`columnGap`,void 0),Vr=class extends P{constructor(...e){super(...e),this.fullWidth=!1}static{this.tagName=`minerva-grid-item`}static{this.styles=[M,h`
:host{
display: block;
min-width: 0;
}
:host([full-width]){
grid-column: 1 / -1;
}
`]}render(){return y`<slot></slot>`}},R([m({type:Boolean,reflect:!0,attribute:`full-width`})],Vr.prototype,`fullWidth`,void 0)})))()}var B;function Ur(){return(Ur=e((()=>{j(),N(),L(),A(),D(),Tn(),Hn(),p(),_(),g(),Qe(),B=class e extends k{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.locale=new E(this),this.aria=new C(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-textarea`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,h`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,I(qn)]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}select(){this.textarea?.select()}getFormValue(){return this.value}getValidity(){let e=this.textarea;return e?{flags:Kn(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),O&&(t.has(`minLength`)||t.has(`maxLength`))&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&F(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let e=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return y`<textarea
      part="root"
      class=${b({textarea:!0,[this.variant]:!0,[this.size]:!0,invalid:e})}
      style="resize: none"
      .value=${tt(this.value)}
      name=${this.name||f}
      placeholder=${this.placeholder||f}
      rows=${this.rows??f}
      ?disabled=${this.isDisabled}
      ?readonly=${this.readOnly}
      ?required=${this.required}
      minlength=${this.minLength??f}
      maxlength=${this.maxLength??f}
      autocomplete=${this.autocomplete??f}
      wrap=${this.wrap??f}
      aria-label=${this.aria.label??f}
      aria-description=${this.aria.description??f}
      aria-invalid=${e?`true`:f}
      aria-required=${this.aria.attr(`aria-required`)??f}
      aria-readonly=${this.aria.attr(`aria-readonly`)??f}
      @input=${this.handleInput}
      @change=${this.handleChange}
    ></textarea>`}},R([m({attribute:!1})],B.prototype,`value`,void 0),R([m({attribute:`value`})],B.prototype,`defaultValue`,void 0),R([m({reflect:!0})],B.prototype,`variant`,void 0),R([m({reflect:!0})],B.prototype,`size`,void 0),R([m({type:Boolean,reflect:!0})],B.prototype,`invalid`,void 0),R([m()],B.prototype,`placeholder`,void 0),R([m({type:Boolean,reflect:!0,attribute:`readonly`})],B.prototype,`readOnly`,void 0),R([m({type:Number})],B.prototype,`rows`,void 0),R([m({type:Number,attribute:`minlength`})],B.prototype,`minLength`,void 0),R([m({type:Number,attribute:`maxlength`})],B.prototype,`maxLength`,void 0),R([m()],B.prototype,`autocomplete`,void 0),R([m()],B.prototype,`wrap`,void 0),R([S(`textarea`)],B.prototype,`textarea`,void 0)})))()}var Wr;function Gr(){return(Gr=e((()=>{j(),N(),w(),L(),A(),En(),D(),Wn(),p(),_(),g(),et(),Wr=class e extends P{constructor(...e){super(...e),this.variant=`spinner`,this.size=`medium`,this.color=`primary`,this.label=``,this.decorative=!1,this.full=!1,this.locale=new E(this),this.aria=new C(this),this.slots=new Sn(this)}static{this.tagName=`minerva-progress`}static{this.styles=[M,h`
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
`,I(yn)]}hookStates(){return{variant:this.variant===`dottedBar`?`dotted-bar`:this.variant,size:this.size,color:this.color}}updated(){O&&this.full&&this.width&&F(e.tagName,`width is ignored when full is set.`)}renderIndicator(){let e=this.size;switch(this.variant){case`bar`:return y`<div part="indicator" class="barContainer ${e}">
<div class="bar"></div>
</div>`;case`dottedBar`:return y`<div part="indicator" class="dottedBarContainer ${e}">
<div class="dottedBar"></div>
</div>`;case`wave`:return y`<div part="indicator" class="waveContainer ${e}">
<span class="wave" aria-hidden="true">${vn}</span>
</div>`;case`circle`:return y`<span
part="indicator"
class="circle ${e}"
aria-hidden="true"
>${Rt}</span
>`;case`spinner`:return y`<span
part="indicator"
class="spinner ${e}"
aria-hidden="true"
>${Vt}</span
>`;default:return f}}render(){let e=this.variant===`bar`||this.variant===`dottedBar`,t=!!this.label||this.slots.test(`label`),n=this.aria.label;return y`<div
part="root"
class=${b({progressIndicator:!0,[this.color]:!0,fullWidth:this.full,defaultWidth:!this.full&&!this.width&&e})}
style=${v({width:this.width&&!this.full?this.width:void 0})}
role=${this.decorative?f:`progressbar`}
aria-hidden=${this.decorative?`true`:f}
aria-label=${this.decorative?f:n??(t?f:this.locale.t(`common.loading`))}
aria-labelledby=${!this.decorative&&!n&&t?`label`:f}
>
${this.slots.test(`icon`)?y`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:f}
${this.renderIndicator()}
${t?y`<span id="label" part="label" class="label"
><slot name="label">${this.label}</slot></span
>`:f}
</div>`}},R([m({reflect:!0})],Wr.prototype,`variant`,void 0),R([m({reflect:!0})],Wr.prototype,`size`,void 0),R([m({reflect:!0})],Wr.prototype,`color`,void 0),R([m()],Wr.prototype,`label`,void 0),R([m({type:Boolean,reflect:!0})],Wr.prototype,`decorative`,void 0),R([m()],Wr.prototype,`width`,void 0),R([m({type:Boolean,reflect:!0})],Wr.prototype,`full`,void 0)})))()}var Kr;function qr(){return(qr=e((()=>{j(),w(),$t(),L(),A(),En(),D(),Cr(),Sr(),Pr(),Mr(),Dt(),Pt(),p(),_(),g(),Kr=class extends P{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.locale=new E(this),this.aria=new C(this),this.slots=new Sn(this),this.presence=new Jt(this,()=>this.panel),this.modal=new br(this),this.focusScope=new Ar(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new vr(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.triggerElement()],onFocusOutside:e=>e.preventDefault(),onEscapeKeyDown:()=>this.lastReason(`escape`),onPointerDownOutside:()=>this.lastReason(`outside`),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{let t=this.triggerElement();!e.defaultPrevented&&t&&e.composedPath().includes(t)&&this.requestOpenChange(!this.open,`trigger`)}}static{this.tagName=`minerva-modal`}static{this.styles=[M,xr,h`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,I(an)]}lastReason(e){this.reason=e}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(ar(this.overlay),ar(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),_t(this.panel),_t(this.overlay)}afterClose(){_t(this.panel),_t(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description;return y`<slot name="trigger"></slot> ${e?y`<div
part="overlay"
class="overlay"
popover="manual"
data-state=${t}
aria-hidden="true"
></div>
<div
part="content"
class=${b({content:!0,[this.size]:!0})}
popover="manual"
role=${this.dialogRole}
aria-modal="true"
aria-labelledby=${n?`title`:f}
aria-label=${n?f:this.aria.label??f}
aria-describedby=${r?`description`:f}
tabindex="-1"
data-state=${t}
>
${r?y`<p
id="description"
class="description"
part="description"
>
${r}
</p>`:f}
${n?y`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:f}
<div class="body" part="body"><slot></slot></div>
${this.slots.test(`footer`)?y`<div class="footer" part="footer">
<slot name="footer"></slot>
</div>`:f}
${this.hideCloseButton?f:y`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`modal.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${Kt}
</button>`}
</div>`:f}`}},R([m({type:Boolean,reflect:!0})],Kr.prototype,`open`,void 0),R([m()],Kr.prototype,`label`,void 0),R([m()],Kr.prototype,`description`,void 0),R([m({reflect:!0})],Kr.prototype,`size`,void 0),R([m({type:Boolean,attribute:`hide-close-button`})],Kr.prototype,`hideCloseButton`,void 0),R([m({attribute:`close-label`})],Kr.prototype,`closeLabel`,void 0),R([m({attribute:`dialog-role`})],Kr.prototype,`dialogRole`,void 0),R([S(`.content`)],Kr.prototype,`panel`,void 0),R([S(`.overlay`)],Kr.prototype,`overlay`,void 0)})))()}var Jr,Yr,Xr,V;function Zr(){return(Zr=e((()=>{j(),N(),w(),L(),On(),A(),D(),wn(),p(),_(),g(),ge(),u(),Jr=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],Yr=/^\d{4}-\d{2}-\d{2}$/,Xr={fromAttribute(e){let t=e?.trim().match(/^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/);return t?te(Number(t[1]),Number(t[2])-1,1):void 0},toAttribute(e){return e instanceof Date&&!Number.isNaN(e.getTime())?l(e).slice(0,7):null}},V=class e extends P{constructor(...e){super(...e),this.events=[],this.clickableEvents=!1,this.size=`medium`,this.disabled=!1,this.hideEvents=!1,this.focusedKey=``,this.pendingFocus=null,this.i18n=new E(this),this.aria=new C(this)}static{this.tagName=`minerva-month-calendar`}static{this.styles=[M,h`
:host{
display: block;


inline-size: 100%;
}
.navButton svg{
flex-shrink: 0;
}
`,I(ft)]}get displayed(){let e=this.month;return e instanceof Date&&!Number.isNaN(e.getTime())?xe(e):xe(new Date)}focus(e){this.renderRoot.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus(e)}goToMonth(e){let t=xe(e);l(t)!==l(this.displayed)&&(this.month=t,this.emit(`minerva-month-change`,{month:t}))}select(e){if(this.disabled)return;let t=l(e);t!==this.value&&(this.value=t,this.emit(`minerva-change`,{value:t})),Te(e,this.displayed)||this.goToMonth(e)}handleKeyDown(e,t){if(this.disabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let n=qe(e.key,this),r=(t.getDay()+6)%7,i;switch(n){case`ArrowLeft`:i=Ge(t,-1);break;case`ArrowRight`:i=Ge(t,1);break;case`ArrowUp`:i=Ge(t,-7);break;case`ArrowDown`:i=Ge(t,7);break;case`Home`:i=Ge(t,-r);break;case`End`:i=Ge(t,6-r);break;case`PageUp`:case`PageDown`:{let n=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),r=xe(t,n),a=Ge(xe(r,1),-1).getDate();i=te(r.getFullYear(),r.getMonth(),Math.min(t.getDate(),a));break}default:return}e.preventDefault(),this.pendingFocus=l(i),this.focusedKey=l(i),Te(i,this.displayed)||this.goToMonth(i)}willUpdate(t){O&&t.has(`value`)&&this.value&&!Yr.test(this.value)&&F(e.tagName,`value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`)}updated(){if(this.disabled||!this.pendingFocus)return;let e=this.renderRoot.querySelector(`[data-date="${this.pendingFocus}"]`);e&&(this.pendingFocus=null,e.focus())}hookStates(){return{disabled:this.disabled,size:this.size}}render(){let e=this.i18n.t,t=this.displayed,n=Ge(t,-((t.getDay()+6)%7)),r=Array.from({length:42},(e,t)=>Ge(n,t)),i=r.map(l),a=new Date,o=l(a),s=this.value||void 0,c=[this.focusedKey,s,Te(a,t)?o:``,l(t)].find(e=>e&&i.includes(e)),ee=this.events??[],te=new Map;for(let e of ee)te.set(e.date,(te.get(e.date)??0)+1);let ne=ee.filter(e=>e.date===s),u;try{u=new Intl.DateTimeFormat(this.locale??this.i18n.language,{year:`numeric`,month:`long`}).format(t)}catch{u=l(t).slice(0,7)}let re=this.disabled,{rangeStart:ie,rangeEnd:ae}=this,d=ie&&ae&&Yr.test(ie)&&Yr.test(ae)?[ie,ae].sort():void 0,oe=[`small`,`medium`,`large`].includes(this.size)?this.size:`medium`;return y`<section
part="root"
class="monthCalendar ${oe}"
aria-label=${this.aria.label??e(`monthCalendar.label`)}
>
<div class="toolbar">
<h2 id="heading" part="heading" class="heading" aria-live="polite">
${u}
</h2>
<div class="navigation">
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.previousMonthLabel??e(`monthCalendar.previousMonth`)}
?disabled=${re}
@click=${()=>this.goToMonth(xe(t,-1))}
>
${tn}
</button>
<button
type="button"
part="nav-button"
class="navButton"
?disabled=${re}
@click=${()=>this.goToMonth(new Date)}
>
${Fn} ${this.todayLabel??e(`monthCalendar.today`)}
</button>
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.nextMonthLabel??e(`monthCalendar.nextMonth`)}
?disabled=${re}
@click=${()=>this.goToMonth(xe(t,1))}
>
${Et}
</button>
</div>
</div>
<div
part="grid"
role="grid"
aria-labelledby="heading"
aria-disabled=${re?`true`:f}
class="grid"
>
<div role="row" class="week">
${Jr.map((t,n)=>y`<div role="columnheader" class="weekday">
${this.weekdayLabels?.[n]??e(`monthCalendar.weekdays.${t}`)}
</div>`)}
</div>
${Array.from({length:6},(n,i)=>y`<div role="row" class="week">
${r.slice(i*7,i*7+7).map(n=>{let r=l(n),i=te.get(r)??0,a=this.getDayLabel?this.getDayLabel(r,i):i?e(`monthCalendar.dayWithEvents`,{date:r,count:i}):r,ee=!!d&&r>=d[0]&&r<=d[1],ne={selected:s===r,today:r===o,outside:!Te(n,t),disabled:re};return y`<div
role="gridcell"
part=${gn(`day`,ne)}
class=${b({day:!0,inRange:ee,rangeStart:ee&&r===d?.[0],rangeEnd:ee&&r===d?.[1]})}
data-date=${r}
?data-outside=${ne.outside}
aria-label=${a}
aria-selected=${String(ne.selected)}
aria-current=${ne.today?`date`:f}
aria-disabled=${re?`true`:f}
tabindex=${!re&&r===c?`0`:`-1`}
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
${!this.hideEvents&&s?y`<section
part="events"
class="events"
aria-label=${this.getEventsLabel?this.getEventsLabel(s):e(`monthCalendar.eventsLabel`,{date:s})}
>
<h3 class="eventsHeading">${s}</h3>
${ne.length?y`<ul class="eventList">
${ne.map(e=>y`<li class="eventItem">
${this.clickableEvents?y`<button
type="button"
part="event"
class="eventButton"
?disabled=${re}
@click=${()=>this.emit(`minerva-event-click`,{event:e})}
>
${e.title}
</button>`:y`<span part="event">${e.title}</span>`}
</li>`)}
</ul>`:y`<p class="empty" part="empty">
${this.emptyEventsText??e(`monthCalendar.noEvents`)}
</p>`}
</section>`:f}
</section>`}},R([m({converter:Xr,reflect:!0})],V.prototype,`month`,void 0),R([m({reflect:!0})],V.prototype,`value`,void 0),R([m({attribute:!1})],V.prototype,`events`,void 0),R([m({type:Boolean,attribute:`clickable-events`})],V.prototype,`clickableEvents`,void 0),R([m({attribute:`range-start`,reflect:!0})],V.prototype,`rangeStart`,void 0),R([m({attribute:`range-end`,reflect:!0})],V.prototype,`rangeEnd`,void 0),R([m({reflect:!0})],V.prototype,`size`,void 0),R([m({type:Boolean,reflect:!0})],V.prototype,`disabled`,void 0),R([m({type:Boolean,attribute:`hide-events`})],V.prototype,`hideEvents`,void 0),R([m({attribute:`previous-month-label`})],V.prototype,`previousMonthLabel`,void 0),R([m({attribute:`next-month-label`})],V.prototype,`nextMonthLabel`,void 0),R([m({attribute:`today-label`})],V.prototype,`todayLabel`,void 0),R([m({attribute:`empty-events-text`})],V.prototype,`emptyEventsText`,void 0),R([m()],V.prototype,`locale`,void 0),R([m({attribute:!1})],V.prototype,`weekdayLabels`,void 0),R([m({attribute:!1})],V.prototype,`getDayLabel`,void 0),R([m({attribute:!1})],V.prototype,`getEventsLabel`,void 0),R([x()],V.prototype,`focusedKey`,void 0)})))()}function Qr(e,t,n){for(let r of e){if(r.id===t)return!0;if(r.children&&Qr(r.children,t,n))return n.add(r.id),!0}return!1}var $r,ei,ti;function ni(){return(ni=e((()=>{j(),N(),w(),$t(),L(),On(),A(),D(),fn(),Gt(),jr(),p(),_(),g(),$e(),$r=`.item`,ei=`.children`,ti=class e extends P{constructor(...e){super(...e),this.sections=[],this.collapsed=!1,this.wrapLabels=!1,this.expandedIds=[],this.explicitlyCollapsed=new Set,this.aria=new C(this),this.locale=new E(this),this.typeahead=new Tr(this),this.handleNavKeyDown=e=>{if(e.defaultPrevented)return;let t=e.composedPath()[0]?.closest?.($r);if(!t||!this.shadowRoot?.contains(t))return;let n=this.focusableItems(),r=n.indexOf(t),i;switch(this.logicalKey(e.key)){case`ArrowDown`:i=n[r+1];break;case`ArrowUp`:i=r>0?n[r-1]:void 0;break;case`Home`:i=n[0];break;case`End`:i=n[n.length-1];break;case`ArrowLeft`:if(t.getAttribute(`aria-expanded`)===`true`)return;i=t.closest(ei)?.parentElement?.querySelector(`:scope > ${$r}`);break;default:{if(e.altKey||e.ctrlKey||e.metaKey)return;let t=this.typeahead.search(e.key,n.map(e=>({text:e.querySelector(`.label`)?.textContent??``})),r);if(t===-1)return;i=n[t]}}i&&(e.preventDefault(),i.focus())}}static{this.tagName=`minerva-nav-tree`}static{this.styles=[M,h`
:host{
display: block;
}
`,I(pn)]}activeAncestors(){let e=new Set;for(let t of this.sections)Qr(t.items,this.activeId,e);return e}isExpanded(e,t){return this.expandedIds.includes(e)||!this.explicitlyCollapsed.has(e)&&t.has(e)}willUpdate(t){if(O&&t.has(`sections`)){let t=new Set,n=r=>{for(let i of r)t.has(i.id)&&F(e.tagName,`duplicate item id "${i.id}": ids must be unique.`),t.add(i.id),i.children&&n(i.children)};for(let e of this.sections??[])n(e.items??[])}}setItemExpanded(e,t){let n=new Set(this.expandedIds);t?n.add(e.id):n.delete(e.id);let r=Array.from(n),i={expandedIds:r,item:e,expanded:t};if(!this.emit(`minerva-expanded-change`,i,{cancelable:!0}))return;let a=new Set(this.explicitlyCollapsed);t?a.delete(e.id):a.add(e.id),this.explicitlyCollapsed=a,this.expandedIds=r}select(e,t){let n={value:e.id,item:e};this.emit(`minerva-select`,n,{cancelable:!0})||t?.preventDefault()}toggleItem(e){this.setItemExpanded(e,!this.isExpanded(e.id,this.activeAncestors())),this.select(e)}focusableItems(){return Array.from(this.shadowRoot?.querySelectorAll($r)??[]).filter(e=>!e.disabled&&e.getAttribute(`aria-disabled`)!==`true`)}logicalKey(e){return e!==`ArrowLeft`&&e!==`ArrowRight`||le(this)!==`rtl`?e:e===`ArrowLeft`?`ArrowRight`:`ArrowLeft`}renderSectionTitle(e){return y`<h2 part="group-label" class="sectionTitle">${e}</h2>`}renderContent(e,t){return y`<span part="icon" class="icon" aria-hidden="true"
>${e.icon??f}</span
><span class="copy"
><span part="label" class="label">${e.label}</span>${e.description?y`<small part="description" class="description"
>${e.description}</small
>`:f}</span
>${!this.collapsed&&(e.endContent||t)?y`<span class="trailing"
>${e.endContent?y`<span class="end">${e.endContent}</span>`:f}${t?y`<span class="chevron" aria-hidden="true"
>${rn}</span
>`:f}</span
>`:f}`}renderItem(t,n,r){let i=!!t.children?.length,a=t.id===this.activeId,o=r.has(t.id),s=i&&this.isExpanded(t.id,r),c=!!t.disabled,l={item:!0,nested:n>0,active:a,disabled:c},ee=Object.entries(l).filter(([,e])=>e).map(([e])=>e).join(` `),te=t.description?`${t.label} / ${t.description}`:t.label,ne=this.renderContent(t,i);if(i)return y`<div class="branch">
<button
part=${gn(`item`,{current:a,expanded:s,disabled:c})}
class=${b(l)}
type="button"
title=${te}
aria-expanded=${s?`true`:`false`}
data-id=${t.id}
?data-current=${a}
data-ancestor-active=${o?`true`:f}
?data-expanded=${s}
?disabled=${c}
@click=${()=>this.toggleItem(t)}
@keydown=${e=>{if(this.collapsed)return;let n=this.logicalKey(e.key);n===`ArrowRight`?(e.preventDefault(),s?e.currentTarget.parentElement?.querySelector(`${ei} ${$r}`)?.focus():this.setItemExpanded(t,!0)):n===`ArrowLeft`&&s&&(e.preventDefault(),this.setItemExpanded(t,!1))}}
>
${ne}
</button>
${s&&!this.collapsed?y`<div class="children">
${Ze(t.children??[],e=>e.id,e=>this.renderItem(e,n+1,r))}
</div>`:f}
</div>`;if(this.renderLink)return this.renderLink(t,ne,{active:a,ancestorActive:o,expanded:!1,depth:n,collapsed:this.collapsed,hasChildren:i,disabled:c,className:ee});let u=gn(`item`,{current:a,disabled:c});return c?y`<span
part=${u}
class=${b(l)}
title=${te}
data-id=${t.id}
?data-current=${a}
role="link"
aria-disabled="true"
>${ne}</span
>`:t.href===void 0?y`<button
part=${u}
class=${b(l)}
type="button"
title=${te}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:f}
@click=${()=>this.select(t)}
>
${ne}
</button>`:y`<a
part=${u}
class=${b(l)}
href=${un(e.tagName,t.href)??f}
title=${te}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:f}
@click=${e=>this.select(t,e)}
>${ne}</a
>`}render(){let e=this.activeAncestors(),t=this.getAttribute(`aria-labelledby`);return y`<nav
part="root"
class=${b({navTree:!0,collapsed:this.collapsed,wrapLabels:this.wrapLabels&&!this.collapsed})}
aria-label=${this.aria.label??(t?f:this.locale.t(`navTree.label`))}
@keydown=${this.handleNavKeyDown}
>
${Ze(this.sections??[],e=>e.id,t=>y`<section part="group" class="section">
${t.title?this.renderSectionTitle(t.title):f}
<div class="list">
${Ze(t.items,e=>e.id,t=>this.renderItem(t,0,e))}
</div>
</section>`)}
</nav>`}},R([m({attribute:!1})],ti.prototype,`sections`,void 0),R([m({attribute:`active-id`,reflect:!0})],ti.prototype,`activeId`,void 0),R([m({type:Boolean,reflect:!0})],ti.prototype,`collapsed`,void 0),R([m({type:Boolean,reflect:!0,attribute:`wrap-labels`})],ti.prototype,`wrapLabels`,void 0),R([m({attribute:!1})],ti.prototype,`expandedIds`,void 0),R([m({attribute:!1})],ti.prototype,`renderLink`,void 0),R([x()],ti.prototype,`explicitlyCollapsed`,void 0)})))()}var ri,H;function ii(){return(ii=e((()=>{j(),N(),w(),L(),A(),D(),Tn(),cn(),p(),_(),g(),u(),Qe(),ri={fromAttribute:e=>e===null||e.trim()===``||Number.isNaN(Number(e))?null:Number(e),toAttribute:e=>e===null?null:String(e)},H=class e extends k{constructor(...e){super(...e),this.value=null,this.defaultValue=null,this.step=1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.showStepper=!1,this.noEmpty=!1,this.placeholder=``,this.draft=``,this.locale=new E(this),this.aria=new C(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-number-input`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,h`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,I(dn)]}get resolvedPrecision(){return this.precision??t(this.step)}get locked(){return this.isDisabled||this.readOnly}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}stepUp(){this.value=this.stepped(this.step)}stepDown(){this.value=this.stepped(-this.step)}getFormValue(){return i(this.value,this.resolvedPrecision)}getValidity(){let{t:e}=this.locale,t=this.input,n=this.draft.trim();if(n&&n!==`-`&&n!==`.`){let r=Ve(n);return r===null?{flags:{badInput:!0},message:this.notANumberMessage??e(`numberInput.notANumber`),anchor:t}:this.min!==void 0&&r<this.min?{flags:{rangeUnderflow:!0},message:this.belowMinMessage??e(`validation.rangeUnderflow`,{min:this.min}),anchor:t}:this.max!==void 0&&r>this.max?{flags:{rangeOverflow:!0},message:this.aboveMaxMessage??e(`validation.rangeOverflow`,{max:this.max}),anchor:t}:{flags:{},message:``}}return this.required&&this.value===null?{flags:{valueMissing:!0},message:e(`validation.valueMissing`),anchor:t}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.draft=i(this.value,this.resolvedPrecision)}restoreFormState(e){typeof e==`string`&&(this.value=Ve(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)||t.has(`precision`)||t.has(`step`)){let e=Ve(this.draft);(e===null||e!==this.value)&&(this.draft=i(this.value,this.resolvedPrecision))}O&&(t.has(`min`)||t.has(`max`))&&this.min!==void 0&&this.max!==void 0&&this.min>this.max&&F(e.tagName,`min (${this.min}) is greater than max (${this.max}): every value is clamped.`)}stepped(e){let t=Ve(this.draft)??this.value??0;return Number(he(t+e,this.min,this.max).toFixed(this.resolvedPrecision))}commitValue(e){let t=this.resolvedPrecision,n=e===null?null:Number(e.toFixed(t));this.draft=i(n,t),n!==this.value&&(this.dirty=!0,this.value=n,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:n}))}commit(e){if(this.locked)return;let t=e.trim();if(t===``||t===`-`){this.noEmpty?this.commitValue(he(this.min??0,this.min,this.max)):this.commitValue(null);return}let n=Ve(t);if(n===null){this.draft=i(this.value,this.resolvedPrecision);return}this.commitValue(he(n,this.min,this.max))}adjust(e){this.locked||this.commitValue(this.stepped(e))}handleInput(){this.draft=String(this.input.value),this.emit(`minerva-input`,{value:Ve(this.draft)})}handleKeyDown(e){if(this.locked||e.defaultPrevented)return;let{key:t}=e;t===`ArrowUp`||t===`ArrowDown`?(e.preventDefault(),this.adjust(t===`ArrowUp`?this.step:-this.step)):t===`PageUp`||t===`PageDown`?(e.preventDefault(),this.adjust((t===`PageUp`?10:-10)*this.step)):t===`Home`&&this.min!==void 0?(e.preventDefault(),this.commitValue(this.min)):t===`End`&&this.max!==void 0?(e.preventDefault(),this.commitValue(this.max)):t===`Enter`&&this.input.blur()}handleBlur(){this.commit(String(this.input.value))}draftError(){let{t:e}=this.locale,t=this.draft.trim();if(!t||t===`-`||t===`.`)return;let n=Ve(t);if(n===null)return this.notANumberMessage??e(`numberInput.notANumber`);if(this.min!==void 0&&n<this.min)return this.belowMinMessage??e(`numberInput.belowMin`,{min:this.min});if(this.max!==void 0&&n>this.max)return this.aboveMaxMessage??e(`numberInput.aboveMax`,{max:this.max})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.draftError()!==void 0||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.locked,r=this.draftError(),i=r!==void 0,a=this.invalid||i||this.aria.attr(`aria-invalid`)===`true`,o=this.value??0;return y`<div
part="root"
class=${b({root:!0,[this.size]:!0,invalid:a,shake:i,disabled:t})}
title=${r??f}
>
<input
part="input"
class="field"
type="text"
inputmode="decimal"
role="spinbutton"
.value=${tt(this.draft)}
placeholder=${this.placeholder||f}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
aria-valuemin=${this.min??f}
aria-valuemax=${this.max??f}
aria-valuenow=${this.value??f}
aria-label=${this.aria.label??f}
aria-description=${this.aria.description??f}
aria-invalid=${a?`true`:f}
aria-required=${this.aria.attr(`aria-required`)??f}
@input=${this.handleInput}
@blur=${this.handleBlur}
@keydown=${this.handleKeyDown}
/>
${this.showStepper?y`<div class="stepper" part="stepper" aria-hidden="true">
<button
part="increment"
type="button"
class="step stepUp"
tabindex="-1"
?disabled=${n||this.max!==void 0&&o>=this.max}
aria-label=${this.incrementLabel??e(`numberInput.increment`)}
@click=${()=>this.adjust(this.step)}
>
${mn}
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
${rn}
</button>
</div>`:f}
</div>`}},R([m({attribute:!1})],H.prototype,`value`,void 0),R([m({attribute:`value`,converter:ri})],H.prototype,`defaultValue`,void 0),R([m({type:Number})],H.prototype,`min`,void 0),R([m({type:Number})],H.prototype,`max`,void 0),R([m({type:Number})],H.prototype,`step`,void 0),R([m({type:Number})],H.prototype,`precision`,void 0),R([m({reflect:!0})],H.prototype,`size`,void 0),R([m({type:Boolean,reflect:!0})],H.prototype,`invalid`,void 0),R([m({type:Boolean,reflect:!0,attribute:`readonly`})],H.prototype,`readOnly`,void 0),R([m({type:Boolean,attribute:`show-stepper`})],H.prototype,`showStepper`,void 0),R([m({type:Boolean,attribute:`no-empty`})],H.prototype,`noEmpty`,void 0),R([m()],H.prototype,`placeholder`,void 0),R([m({attribute:`increment-label`})],H.prototype,`incrementLabel`,void 0),R([m({attribute:`decrement-label`})],H.prototype,`decrementLabel`,void 0),R([m({attribute:`not-a-number-message`})],H.prototype,`notANumberMessage`,void 0),R([m({attribute:`below-min-message`})],H.prototype,`belowMinMessage`,void 0),R([m({attribute:`above-max-message`})],H.prototype,`aboveMaxMessage`,void 0),R([x()],H.prototype,`draft`,void 0),R([S(`input`)],H.prototype,`input`,void 0)})))()}var ai,oi,si,ci,li;function ui(){return(ui=e((()=>{j(),N(),A(),En(),D(),_r(),jt(),p(),_(),g(),et(),ai=class extends P{static{this.tagName=`minerva-page`}static{this.styles=[M,I(Jn),h`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.maxWidth===void 0||this.maxWidth===``?void 0:ue(this.maxWidth);return y`<div class="page" part="root" style=${v({maxWidth:e})}>
<slot></slot>
</div>`}},R([m({attribute:`max-width`,converter:pr})],ai.prototype,`maxWidth`,void 0),oi=class extends P{constructor(...e){super(...e),this.heading=``,this.description=``,this.slots=new Sn(this)}static{this.tagName=`minerva-page-header`}static{this.styles=[M,I(Jn),h`
:host{
display: block;
min-width: 0;
}
`]}updated(){O&&!this.heading&&!this.slots.test(`heading`)&&F(this.constructor.tagName,`set the heading attribute (or fill the heading slot): the heading names the region.`)}renderHeading(){let e=!!this.description||this.slots.test(`description`);return y`<div class="heading">
<h1 part="title"><slot name="heading">${this.heading}</slot></h1>
${e?y`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:f}
</div>`}renderActions(){return this.slots.test(`actions`)?y`<div class="actions" part="actions">
<slot name="actions"></slot>
</div>`:f}render(){return y`<header class="header" part="root">
${this.renderHeading()} ${this.renderActions()}
</header>`}},R([m()],oi.prototype,`heading`,void 0),R([m()],oi.prototype,`description`,void 0),si=class extends oi{static{this.tagName=`minerva-page-section`}static{this.styles=[M,I(Jn),h`
:host{
display: block;
min-width: 0;
}
.section ::slotted(minerva-tag),
.section ::slotted([data-component="tag"]){
align-self: flex-start;
}
`]}renderHeading(){let e=!!this.description||this.slots.test(`description`);return y`<div class="heading">
<h2 id="heading" part="title">
${this.slots.test(`icon`)?y`<span class="sectionIcon" part="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:f}<slot name="heading">${this.heading}</slot>
</h2>
${e?y`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:f}
</div>`}render(){return y`<section class="section" part="root" aria-labelledby="heading">
<div class="sectionHeader" part="header">
${this.renderHeading()} ${this.renderActions()}
</div>
<slot></slot>
</section>`}},ci=class extends P{constructor(...e){super(...e),this.nowrap=!1,this.density=`default`,this.aria=new C(this)}static{this.tagName=`minerva-toolbar`}static{this.styles=[M,I(Jn),h`
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
`]}render(){return y`<div
part="root"
role="group"
aria-label=${this.aria.label??f}
aria-description=${this.aria.description??f}
class=${b({toolbar:!0,compact:this.density===`compact`,nowrap:this.nowrap})}
>
<slot></slot>
</div>`}},R([m({type:Boolean,reflect:!0})],ci.prototype,`nowrap`,void 0),R([m({reflect:!0})],ci.prototype,`density`,void 0),li=class extends P{constructor(...e){super(...e),this.label=``,this.value=``,this.slots=new Sn(this)}static{this.tagName=`minerva-stat-card`}static{this.styles=[M,I(Jn),h`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.description!==void 0&&this.description!==null||this.slots.test(`description`);return y`<div class="statCard" part="root">
${this.slots.test(`icon`)?y`<span class="statIcon" part="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:f}
<div class="statContent">
<dl>
<dt part="label"><slot name="label">${this.label}</slot></dt>
<dd part="value"><slot name="value">${this.value}</slot></dd>
</dl>
${e?y`<p class="statDescription" part="description">
<slot name="description">${this.description}</slot>
</p>`:f}
</div>
</div>`}},R([m()],li.prototype,`label`,void 0),R([m()],li.prototype,`value`,void 0),R([m()],li.prototype,`description`,void 0)})))()}var di,fi,U;function pi(){return(pi=e((()=>{j(),N(),w(),$t(),L(),A(),En(),D(),jn(),Mt(),p(),_(),g(),di=(e,t)=>({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:e,[t]:!0}),fi=class e extends P{constructor(...e){super(...e),this.scrollState={overflow:!1,left:!1,right:!1,rtl:!1},this.aria=new C(this),this.locale=new E(this),this.slots=new Sn(this),this.focused=null,this.previousItems=null,this.movedWith=null,this.mutations=null,this.resize=null,this.handleFocusIn=e=>{let t=e.target;this.focused=t instanceof U&&this.items.includes(t)?t:null},this.handleSelect=e=>{let t=e.target;t instanceof U&&this.items.includes(t)&&!e.defaultPrevented&&queueMicrotask(()=>{e.defaultPrevented||(this.activeValue=t.value)})},this.measure=()=>{let e=this.viewport;if(!e)return;let t=le(this)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t},i=this.scrollState;(i.overflow!==r.overflow||i.left!==r.left||i.right!==r.right||i.rtl!==r.rtl)&&(this.scrollState=r)}}static{this.tagName=`minerva-page-tabs`}static{this.styles=[M,h`
:host{
display: block;
min-width: 0;
}
`,I(Vn),I(wt)]}get items(){return Array.from(this.children).filter(e=>e instanceof U)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`minerva-select`,this.handleSelect),typeof MutationObserver<`u`&&(this.mutations=new MutationObserver(()=>this.itemsChanged()),this.mutations.observe(this,{childList:!0,attributes:!0,attributeFilter:[`value`,`active`,`disabled`],subtree:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`minerva-select`,this.handleSelect),this.mutations?.disconnect(),this.mutations=null,this.resize?.disconnect(),this.resize=null}firstUpdated(){this.observeViewport()}reconnectedCallback(){super.reconnectedCallback(),this.observeViewport()}observeViewport(){this.resize||typeof ResizeObserver>`u`||(this.resize=new ResizeObserver(()=>this.revealActive()),this.resize.observe(this.viewport))}updated(t){O&&!this.aria.label&&F(e.tagName,`set aria-label (e.g. "Open pages") to name the navigation landmark.`),t.has(`activeValue`)&&this.itemsChanged();let n=this.movedWith;if(n){let e=n===`left`?this.leftButton:this.rightButton;if(e?.disabled){this.movedWith=null;let t=this.shadowRoot?.activeElement;(!t||t===e)&&(n===`left`?this.rightButton:this.leftButton)?.focus({preventScroll:!0})}}}itemsChanged(){let e=this.items;if(this.activeValue!==void 0)for(let t of e)t.active=t.value===this.activeValue;let t=JSON.stringify([this.activeValue,...e.map(e=>[e.value,e.active])]);t!==this.previousItems&&(this.previousItems=t,this.revealActive());let n=this.focused;if(n&&!n.isConnected){this.focused=null;let t=document.activeElement;(!t||t===document.body||!t.isConnected)&&e.find(e=>e.active)?.focus({preventScroll:!0})}}revealActive(){let e=this.viewport;if(!e)return;let t=this.items.find(e=>e.active),n=t?.surface;if(t&&!n&&t.updateComplete.then(()=>{t.surface&&this.revealActive()}),n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();r.width>t.width?e.scrollLeft+=r.left-t.left:r.left<t.left?e.scrollLeft-=t.left-r.left:r.right>t.right&&(e.scrollLeft+=r.right-t.right)}this.measure()}move(e){let t=this.viewport;t&&(this.movedWith=e<0?`left`:`right`,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),this.measure())}renderScrollButton(e){let t=e===`left`,n=t?this.scrollLeftLabel??this.locale.t(`pageTabs.scrollLeft`):this.scrollRightLabel??this.locale.t(`pageTabs.scrollRight`),r=t?!this.scrollState.left:!this.scrollState.right;return y`<button
type="button"
part="scroll-button"
class=${b({...di(r,`scroll`),[`scroll-${e}`]:!0})}
aria-label=${n}
?disabled=${r}
tabindex=${r?-1:0}
@click=${()=>this.move(t?-1:1)}
>
${t?tn:Et}
</button>`}render(){let{overflow:e,rtl:t}=this.scrollState,n=()=>this.renderScrollButton(`left`),r=()=>this.renderScrollButton(`right`);return y`<nav
part="root"
class="pageTabs"
aria-label=${this.aria.label??f}
>
${e?t?r():n():f}
<div part="viewport" class="viewport" @scroll=${this.measure}>
<div part="list" class="list">
<slot @slotchange=${()=>this.itemsChanged()}></slot>
</div>
</div>
${e?t?n():r():f}
${this.slots.test(`actions`)?y`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:f}
</nav>`}},R([m({reflect:!0,attribute:`active-value`})],fi.prototype,`activeValue`,void 0),R([m({attribute:`scroll-left-label`})],fi.prototype,`scrollLeftLabel`,void 0),R([m({attribute:`scroll-right-label`})],fi.prototype,`scrollRightLabel`,void 0),R([x()],fi.prototype,`scrollState`,void 0),R([S(`.viewport`)],fi.prototype,`viewport`,void 0),R([S(`.scroll-left`)],fi.prototype,`leftButton`,void 0),R([S(`.scroll-right`)],fi.prototype,`rightButton`,void 0),U=class e extends P{constructor(...e){super(...e),this.value=``,this.label=``,this.active=!1,this.disabled=!1,this.closable=!1,this.locale=new E(this),this.slots=new Sn(this)}static{this.tagName=`minerva-page-tab`}static{this.shadowRootOptions={...P.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,h`
:host{
display: contents;
}
.icon ::slotted(svg){
width: 16px;
height: 16px;
}
`,I(Vn),I(wt)]}get surface(){return this.wrapper??null}focus(e){this.trigger?.focus(e)}handleSelect(){this.disabled||this.emit(`minerva-select`,{value:this.value},{cancelable:!0})}handleClose(){this.emit(`minerva-close`,{value:this.value})}hookStates(){return{current:this.active,disabled:this.disabled}}updated(){O&&!this.label&&F(e.tagName,`set label to name the page.`)}render(){return y`<div
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
title=${this.label||f}
aria-current=${this.active?`page`:f}
?disabled=${this.disabled}
@click=${this.handleSelect}
>
${this.slots.test(`icon`)?y`<span part="icon" class="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:f}
<span part="label" class="label">${this.label}</span>
</button>
${this.closable||this.slots.test(`action`)?y`<span part="action" class="action"
><slot name="action"></slot>${this.closable?y`<button
type="button"
part="close-button"
class=${b(di(!1,`close`))}
aria-label=${this.closeLabel??this.locale.t(`pageTabs.close`,{label:this.label,defaultValue:`Close {{label}}`})}
@click=${this.handleClose}
>
${Kt}
</button>`:f}</span
>`:f}
</div>`}},R([m({reflect:!0})],U.prototype,`value`,void 0),R([m()],U.prototype,`label`,void 0),R([m({type:Boolean,reflect:!0})],U.prototype,`active`,void 0),R([m({type:Boolean,reflect:!0})],U.prototype,`disabled`,void 0),R([m({type:Boolean,reflect:!0})],U.prototype,`closable`,void 0),R([m({attribute:`close-label`})],U.prototype,`closeLabel`,void 0),R([S(`.trigger`)],U.prototype,`trigger`,void 0),R([S(`.pageTab`)],U.prototype,`wrapper`,void 0)})))()}function mi(e,t,n,r){let i=De(t).filter(t=>t===e||!r||!d(r,t)),a=i.indexOf(e);return a===-1?null:(n?i[a-1]:i[a+1])??null}var hi,gi,W;function _i(){return(_i=e((()=>{j(),N(),$t(),A(),D(),Cr(),Dr(),Sr(),Pr(),Mr(),Pt(),on(),p(),_(),ge(),hi=10,gi=5,W=class e extends P{constructor(...e){super(...e),this.open=!1,this.modal=!1,this.side=`bottom`,this.align=`center`,this.sideOffset=6,this.alignOffset=0,this.collisionPadding=8,this.matchAnchorWidth=!1,this.arrow=!1,this.label=``,this.anchorElement=null,this.anchor=``,this.aria=new C(this),this.presence=new Jt(this,()=>this.panel),this.modalController=new br(this),this.position=new wr(this,()=>({placement:je(this.side,this.align),offset:{mainAxis:this.sideOffset+(this.arrow?gi:0),crossAxis:this.alignOffset},matchAnchorWidth:this.matchAnchorWidth||!1,padding:this.collisionPadding,arrowElement:this.arrow?this.arrowEl??null:null,arrowSize:hi,onPosition:e=>{let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`)}})),this.layer=new vr(this,()=>({disableOutsidePointerEvents:this.modal,branches:()=>[this.triggerElement()],onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onFocusOutside:()=>(this.reason=`focus-outside`,!this.modal),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.focusScope=new Ar(this,()=>({trapped:this.modal,loop:this.modal,restoreFocus:this.triggerElement()??!0})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-popover-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)},this.handleKeyDown=e=>{let t=this.panel,n=this.triggerElement();if(this.modal||!t||!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||e.defaultPrevented)return;let r=e.shiftKey,i=We(document);if(!i||!d(t,i))return;let a=De(t);if(!(a.length===0||(r?i===t||i===a[0]:i===a[a.length-1])))return;e.preventDefault();let o=mi(n,this.tabContainer(),r,this.positioner)??n;this.requestOpenChange(!1,`tab`),this.open||o.focus()}}static{this.tagName=`minerva-popover`}static{this.styles=[M,xr,h`
:host{
display: contents;
}
`,I(en)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorTarget(){if(this.anchorElement)return this.anchorElement;if(this.anchor){let e=this.getRootNode().getElementById?.(this.anchor);if(e)return e}return this.triggerElement()??this}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}tabContainer(){return s().find(e=>e.element===this.positioner)?.parent??document.body}syncTrigger(){let e=this.triggerElement();e&&(e.setAttribute(`aria-haspopup`,`dialog`),e.setAttribute(`aria-expanded`,String(this.open)),e.setAttribute(`data-state`,this.open?`open`:`closed`))}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.deactivate(),_t(this.positioner)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}firstUpdated(){O&&!this.triggerElement()&&!this.anchor&&!this.anchorElement&&F(e.tagName,`no slot="trigger" element nor anchor: the panel is anchored to the element itself and nothing opens it.`)}deactivate(){this.focusScope.deactivate(),this.layer.deactivate(),this.modalController.deactivate()}updated(e){this.syncTrigger();let t=this.open||this.presence.present,n=this.positioner;if(t&&n&&!this.position.running){ar(n);let e=this.anchorTarget();e&&this.position.start(e,n)}e.has(`open`)&&(this.open&&n?(this.modal&&this.modalController.activate(this),this.layer.activate(n),this.focusScope.activate(n),this.emit(`minerva-after-open`)):this.open||this.deactivate()),this.wasPresent&&!t&&(this.position.end(),_t(n),this.emit(`minerva-after-close`)),this.wasPresent=t}hookStates(){let e=this.position.placement,{side:t,align:n}=Le(e);return{state:this.open?`open`:`closed`,side:t,align:n,placement:e}}render(){if(!(this.open||this.presence.present))return y`<slot name="trigger"></slot>`;let{side:e,align:t}=Le(this.position.placement),n=this.open?`open`:`closed`,r=this.label||this.aria.label,i=this.isConnected?le(this):`ltr`;return y`<slot name="trigger"></slot>
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
aria-modal=${this.modal?`true`:f}
aria-label=${r||f}
tabindex="-1"
dir=${i}
data-state=${n}
data-side=${e}
data-align=${t}
@keydown=${this.handleKeyDown}
>
<slot></slot>
${this.arrow?y`<span part="arrow" class="arrowWrapper" aria-hidden="true">
<svg
class="arrow"
width=${hi}
height=${gi}
viewBox="0 0 30 10"
preserveAspectRatio="none"
>
<polygon points="0,0 30,0 15,10"></polygon>
</svg>
</span>`:f}
</div>
</div>`}},R([m({type:Boolean,reflect:!0})],W.prototype,`open`,void 0),R([m({type:Boolean,reflect:!0})],W.prototype,`modal`,void 0),R([m({reflect:!0})],W.prototype,`side`,void 0),R([m({reflect:!0})],W.prototype,`align`,void 0),R([m({type:Number,attribute:`side-offset`})],W.prototype,`sideOffset`,void 0),R([m({type:Number,attribute:`align-offset`})],W.prototype,`alignOffset`,void 0),R([m({type:Number,attribute:`collision-padding`})],W.prototype,`collisionPadding`,void 0),R([m({attribute:`match-anchor-width`})],W.prototype,`matchAnchorWidth`,void 0),R([m({type:Boolean,reflect:!0})],W.prototype,`arrow`,void 0),R([m()],W.prototype,`label`,void 0),R([m({attribute:!1})],W.prototype,`anchorElement`,void 0),R([m()],W.prototype,`anchor`,void 0),R([S(`.positioner`)],W.prototype,`positioner`,void 0),R([S(`.content`)],W.prototype,`panel`,void 0),R([S(`[part=arrow]`)],W.prototype,`arrowEl`,void 0)})))()}var vi;function yi(){return(yi=e((()=>{vi=`minerva-prose{min-width:0;max-width:100%;color:var(--text-color,#1f2937);font-family:var(--font-family-sans,system-ui, -apple-system, "Segoe UI", sans-serif);font-size:var(--prose-font-size,var(--font-size-lg,1rem));font-weight:var(--font-weight-regular,400);font-style:normal;line-height:var(--line-height-relaxed,1.7);letter-spacing:0;overflow-wrap:anywhere}minerva-prose :where(h1,h2,h3,h4,h5,h6){color:inherit;font-family:inherit;font-style:inherit;font-weight:var(--font-weight-semibold,600);letter-spacing:0;background:0 0;border:0;margin:1.5em 0 .5em;padding:0;line-height:1.35}minerva-prose :where(h1){font-size:var(--font-size-3xl,1.75rem)}minerva-prose :where(h2){font-size:var(--font-size-2xl,1.375rem)}minerva-prose :where(h3){font-size:var(--font-size-xl,1.125rem)}minerva-prose :where(h4){font-size:var(--font-size-lg,1rem)}minerva-prose :where(h5,h6){font-size:var(--font-size-md,.875rem)}minerva-prose :where(h6){color:var(--text-muted-color,#6b7280)}minerva-prose :where(p,ul,ol,li,blockquote){font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;line-height:inherit;letter-spacing:inherit}minerva-prose :where(p){background:0 0;border:0;padding:0}minerva-prose :where(p,ul,ol,blockquote,pre,table,figure){margin:1em 0}minerva-prose>:first-child{margin-top:0}minerva-prose>:last-child{margin-bottom:0}minerva-prose :where(ul,ol){padding:0;padding-inline-start:1.5em}minerva-prose :where(li){margin:.25em 0}minerva-prose :where(li>ul,li>ol,li>p){margin-block:.25em}minerva-prose :where(blockquote){border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-code-bg,var(--control-color,#f6f7f9));color:inherit;border:1px solid #0000;padding:.5em 1em}minerva-prose :where(a){color:var(--primary-color-text,#1e4fbd);text-underline-offset:.18em;text-decoration:underline;text-decoration-thickness:1px}minerva-prose :where(a:hover){text-decoration-thickness:2px}minerva-prose :where(a:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:3px}minerva-prose :where(code,kbd,samp){font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);font-size:.875em}minerva-prose :where(code){border-radius:calc(var(--prose-radius,var(--radius-sm,4px)) - 1px);background:var(--prose-code-bg,var(--control-color,#f6f7f9));padding:.12em .3em}minerva-prose :where(pre){max-width:100%;padding:var(--space-4,1rem);border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-pre-bg,var(--surface-elevated-color,#fff));color:var(--text-color,#1f2937);font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);line-height:var(--line-height-base,1.5);white-space:pre;overflow-wrap:normal;tab-size:2;overflow-x:auto}minerva-prose :where(pre code){color:inherit;white-space:pre;background:0 0;border:0;border-radius:0;padding:0}minerva-prose :where(pre:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:2px}minerva-prose :where(.hljs-comment,.hljs-quote){color:var(--text-muted-color,#6b7280)}minerva-prose :where(.hljs-keyword,.hljs-selector-tag,.hljs-name,.hljs-tag,.hljs-attr,.hljs-attribute,.hljs-doctag){color:var(--primary-color-text,#1e4fbd)}minerva-prose :where(.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-regexp,.hljs-type,.hljs-literal){color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-number,.hljs-title,.hljs-section,.hljs-built_in,.hljs-meta,.hljs-variable){color:var(--warning-color-text,#b45309)}minerva-prose :where(.hljs-subst,.hljs-operator,.hljs-punctuation,.hljs-params){color:var(--text-color,#1f2937)}minerva-prose :where(.hljs-addition){background:var(--success-color-subtle,#e7f6ec);color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-deletion){background:var(--danger-color-subtle,#fcebeb);color:var(--danger-color-text,#b91c1c)}minerva-prose :where(.hljs-strong){font-weight:var(--font-weight-bold,700)}minerva-prose :where(.hljs-emphasis){font-style:italic}minerva-prose :where(mark){background:var(--warning-color-subtle,#fdf3e1);color:inherit}minerva-prose :where(img,video){max-width:100%;height:auto}minerva-prose :where(figure){max-width:100%}minerva-prose :where(figcaption){margin-top:var(--space-2,.5rem);font-size:var(--font-size-md,.875rem);color:var(--text-muted-color,#6b7280)}minerva-prose :where(table){border-collapse:collapse;width:100%;color:inherit;overflow-wrap:normal;display:table}minerva-prose :where(tr){background:0 0;border:0}minerva-prose :where(th,td){border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));text-align:start;vertical-align:top;white-space:normal;padding:.5em .75em}minerva-prose :where(th){background:var(--prose-code-bg,var(--control-color,#f6f7f9));font-weight:var(--font-weight-semibold,600)}minerva-prose :where(th>p,td>p){margin:0}minerva-prose :where(hr){background:var(--prose-border-color,var(--border-color,#d9dde3));border:0;height:1px;margin:1.5em 0;padding:0}@media (forced-colors:active){minerva-prose :where(hr){forced-color-adjust:none;background:canvastext}}minerva-prose :where(sub,sup){font-size:.75em;line-height:0}@media print{minerva-prose :where(pre){overflow:visible}minerva-prose :where(pre,pre code){white-space:pre-wrap;overflow-wrap:anywhere}minerva-prose :where(pre,blockquote,figure,img,tr){break-inside:avoid}}`})))()}function bi(){if(wi!==void 0)return wi;wi=null;try{if(typeof CSSStyleSheet<`u`&&`replaceSync`in CSSStyleSheet.prototype){let e=new CSSStyleSheet;e.replaceSync(vi),wi=e}}catch{wi=null}return wi}function xi(e){if(Ci.has(e))return;Ci.add(e);let t=bi();if(t&&`adoptedStyleSheets`in e)try{e.adoptedStyleSheets=[...e.adoptedStyleSheets,t];return}catch{}let n=e.nodeType===9?e:e.ownerDocument;if(!n)return;let r=e.nodeType===9?n.head??n.documentElement:e;if(r.querySelector?.(`#${Si}`))return;let i=n.createElement(`style`);i.id=Si,i.textContent=vi,r.appendChild(i)}var Si,Ci,wi,Ti;function Ei(){return(Ei=e((()=>{A(),yi(),p(),Si=`minerva-prose-styles`,Ci=new WeakSet,Ti=class extends P{static{this.tagName=`minerva-prose`}static{this.styles=[M,h`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback();let e=this.getRootNode();(e.nodeType===9||e.nodeType===11)&&xi(e)}render(){return y`<slot></slot>`}}})))()}var Di,G,Oi;function ki(){return(ki=e((()=>{zt(),j(),N(),w(),$t(),L(),nr(),A(),En(),D(),Tn(),Tt(),Nr(),p(),_(),g(),Di=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Home`,`End`]),G=class extends P{constructor(...e){super(...e),this.hostInternals=lr(this),this.ownedAria=new Set,this.value=``,this.checked=!1,this.disabled=!1,this.label=``,this.size=`medium`,this.color=`primary`,this.error=!1,this.helperText=``,this.errorMessage=``,this.slots=new Sn(this),this.ownsDescription=!1,this.handleClick=e=>{if(this.isDisabled){e.preventDefault(),e.stopImmediatePropagation();return}this.group||this.checked||(this.checked=!0,this.emit(`minerva-change`,{checked:!0,value:this.value}))},this.handleKeyDown=e=>{e.key===` `&&(e.preventDefault(),this.isDisabled||this.click())}}static{this.tagName=`minerva-radio`}static{this.styles=[M,h`
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
`,I(nn)]}get group(){let e=this.parentElement?.closest(`minerva-radio-group`);return e instanceof Oi?e:null}get isDisabled(){return this.disabled||!!this.group?.isDisabled}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick),this.addEventListener(`keydown`,this.handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.removeEventListener(`keydown`,this.handleKeyDown)}updated(){let e=this.isDisabled;Ht(this,this.hostInternals,{role:`radio`,ariaChecked:String(this.checked),ariaDisabled:e?`true`:null},this.ownedAria),this.group||T(this,`tabindex`,e?`-1`:`0`);let t=this.error?this.errorMessage:this.helperText;t&&(this.ownsDescription||!this.hasAttribute(`aria-description`))?(this.ownsDescription=!0,T(this,`aria-description`,t)):!t&&this.ownsDescription&&(this.ownsDescription=!1,T(this,`aria-description`,null))}hookStates(){let e=this.group;return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error,size:e?.size??this.size,color:e?.color??this.color}}render(){let e=this.group,t=e?.size??this.size,n=e?.color??this.color,r=this.error?this.errorMessage:this.helperText,i=!!this.label||this.slots.test(`[default]`);return y`<div
part="root"
class=${b({radioWrapper:!0,[t]:!0,[n]:!0,error:this.error})}
>
<span class=${b({radio:!0,disabled:this.isDisabled})}>
<input
type="radio"
class="input"
tabindex="-1"
aria-hidden="true"
inert
.checked=${this.checked}
/>
<span class="radioMark" part="control"></span>
${i?y`<span class="label" part="label"
>${this.label||y`<slot></slot>`}</span
>`:f}
</span>
${r?y`<div class="helperTextWrapper" aria-hidden="true">
${this.error&&this.errorMessage?y`<span class="errorIcon">${Wt}</span>`:f}
<span
part="helper-text"
class=${b({helperText:!0,errorText:this.error})}
>${r}</span
>
</div>`:f}
</div>`}},R([m()],G.prototype,`value`,void 0),R([m({type:Boolean,reflect:!0})],G.prototype,`checked`,void 0),R([m({type:Boolean,reflect:!0})],G.prototype,`disabled`,void 0),R([m()],G.prototype,`label`,void 0),R([m({reflect:!0})],G.prototype,`size`,void 0),R([m({reflect:!0})],G.prototype,`color`,void 0),R([m({type:Boolean,reflect:!0})],G.prototype,`error`,void 0),R([m({attribute:`helper-text`})],G.prototype,`helperText`,void 0),R([m({attribute:`error-message`})],G.prototype,`errorMessage`,void 0),Oi=class e extends k{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.label=``,this.helperText=``,this.error=!1,this.direction=`vertical`,this.locale=new E(this),this.aria=new C(this,()=>this.labels),this.roving=new Or(this,()=>({getItems:()=>this.radios,isItemDisabled:e=>this.isDisabled||e.disabled,orientation:`both`,dir:le(this),loop:!0})),this.observer=null,this.dirty=!1,this.rovingAttached=!1,this.settleQueued=!1,this.handleClick=e=>{let t=e.target?.closest?.(`minerva-radio`);t instanceof G&&t.group===this&&this.select(t)},this.handleKeyDown=e=>{if(!e.defaultPrevented||!Di.has(e.key))return;let t=this.roving.getActive();t instanceof G&&this.select(t)}}static{this.tagName=`minerva-radio-group`}static{this.dependencies=[G]}static{this.styles=[M,h`
:host{
display: block;
}
`,I(nn)]}get radios(){return Array.from(this.querySelectorAll(`minerva-radio`)).filter(e=>e instanceof G&&e.group===this)}focus(e){let t=this.radios;(t.find(e=>e.checked&&!e.disabled)??t.find(e=>!e.disabled))?.focus(e)}connectedCallback(){super.connectedCallback(),In(this)||this.attachRoving(),this.addEventListener(`click`,this.handleClick),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0}))}attachRoving(){this.rovingAttached||(this.rovingAttached=!0,this.roving.attach(this),this.addEventListener(`keydown`,this.handleKeyDown))}disconnectedCallback(){super.disconnectedCallback(),this.rovingAttached=!1,this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.observer?.disconnect(),this.observer=null}getFormValue(){return this.value===``?null:this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.radioMissing`),anchor:this.radios.find(e=>!e.disabled)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`?this.value=e:e===null&&(this.value=``)}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){super.updated(t);let n=this.radios,r;for(let e of n)e.checked=this.value!==``&&e.value===this.value,e.checked&&(r??=e),e.requestUpdate();this.syncRoving(n,r),O&&this.value!==``&&n.length>0&&!r&&F(e.tagName,`value "${this.value}" matches no <minerva-radio> of the group.`)}syncRoving(e,t){let n=[this,...e].find(In);if(n){this.settleQueued||(this.settleQueued=!0,It(n,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.attachRoving(),t&&!t.disabled&&!this.isDisabled?this.roving.setActive(t,{focus:!1}):this.roving.refresh();for(let t of e)(this.isDisabled||t.disabled)&&t.setAttribute(`tabindex`,`-1`)}select(e){this.isDisabled||e.disabled||e.value===this.value||(this.dirty=!0,this.value=e.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}hookStates(){return{disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,required:this.required,orientation:this.direction,size:this.size,color:this.color}}render(){let e=this.error||this.aria.attr(`aria-invalid`)===`true`,t=this.label,n=[this.helperText,this.aria.description].filter(Boolean).join(` `);return y`<div
part="root"
class=${b({radioGroupWrapper:!0,error:e})}
>
${t?y`<div id="label" part="label" class="groupLabel">${t}</div>`:f}
<div
part="list"
class=${b({radioGroup:!0,[this.direction]:!0})}
role="radiogroup"
aria-labelledby=${t?`label`:f}
aria-label=${t?f:this.aria.label??f}
aria-description=${n||f}
aria-required=${this.required?`true`:`false`}
aria-invalid=${e?`true`:`false`}
aria-disabled=${this.isDisabled?`true`:f}
>
<slot></slot>
</div>
${this.helperText?y`<div
part="helper-text"
aria-hidden="true"
class=${b({helperText:!0,errorText:e})}
>
${this.helperText}
</div>`:f}
</div>`}},R([m({attribute:!1})],Oi.prototype,`value`,void 0),R([m({attribute:`value`})],Oi.prototype,`defaultValue`,void 0),R([m()],Oi.prototype,`label`,void 0),R([m({attribute:`helper-text`})],Oi.prototype,`helperText`,void 0),R([m({type:Boolean,reflect:!0})],Oi.prototype,`error`,void 0),R([m({reflect:!0})],Oi.prototype,`direction`,void 0),R([m({reflect:!0})],Oi.prototype,`size`,void 0),R([m({reflect:!0})],Oi.prototype,`color`,void 0)})))()}var Ai,ji,Mi,Ni,Pi;function Fi(){return(Fi=e((()=>{j(),N(),w(),L(),On(),A(),D(),Tn(),kr(),ht(),p(),_(),g(),et(),ge(),u(),Ai={small:12,medium:16,large:20},ji=Array.from({length:5},(e,t)=>t),Mi=h`
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
`,Ni=class e extends k{constructor(...e){super(...e),this.value=0,this.defaultValue=0,this.max=10,this.size=`medium`,this.showValue=!1,this.interactive=!1,this.readOnly=!1,this.locale=new E(this),this.aria=new C(this,()=>this.labels),this.dirty=!1,this.rating=new yr(this,Pe(this.ratingProps()))}static{this.tagName=`minerva-rating`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,h`
:host{
display: inline-flex;
vertical-align: middle;
}
`,I(ur),Mi]}ratingProps(){return{value:this.value,max:this.max,readOnly:!this.isInteractive,onValueChange:e=>this.commit(e)}}send(e){this.rating.sync(this.ratingProps()),this.rating.send(e)}get isInteractive(){return this.interactive&&!this.readOnly&&!this.isDisabled}focus(e){this.root?.focus(e)}blur(){this.root?.blur()}getFormValue(){return String(this.value)}getValidity(){return this.required&&!(this.value>0)?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.root}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){if(typeof e==`string`&&e.trim()!==``){let t=Number(e);Number.isFinite(t)&&(this.value=t)}}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),O&&(t.has(`value`)||t.has(`max`))&&(this.value<0||this.value>this.max)&&F(e.tagName,`value (${this.value}) is outside 0..max (${this.max}).`),this.rating.sync(this.ratingProps())}commit(e){e!==this.value&&(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleStarClick(e,t){if(!this.isInteractive)return;let n=e.currentTarget.getBoundingClientRect(),r=e.clientX-n.left<n.width/2;this.send({type:`PICK`,index:t,half:r})}handleKeyDown(e){if(e.defaultPrevented||!this.isInteractive)return;let t=qe(e.key,this);Ke(t,this.value,this.max)!==null&&(e.preventDefault(),this.send({type:`KEY`,key:t}))}hookStates(){return{readonly:!this.isInteractive,size:this.size}}renderStar(e,t){let n=v({width:`${t}px`,height:`${t}px`,fontSize:`${t}px`}),r=gn(`star`,{fill:e});return e===`half`?y`<span part=${r} class="star half" style=${n}
><span class="halfBase">${Qt}</span
><span class="halfFill">${ir}</span></span
>`:y`<span
part=${r}
class=${b({star:!0,[e]:!0})}
style=${n}
>${Qt}</span
>`}render(){let e=this.isInteractive,{value:t,max:n}=this,r=this.rating.machine.project(this.rating.state,this.ratingProps()),i=ye(r,n),a=e=>i[e],o=Ai[this.size]??Ai.medium,s=this.aria.label??`${t.toFixed(1)} / ${n}`,c=y`<span class="stars" part="stars" aria-hidden="true">
${ji.map(t=>e?y`<button
type="button"
tabindex="-1"
class="starButton"
@click=${e=>this.handleStarClick(e,t)}
@mouseenter=${()=>this.send({type:`HOVER`,index:t})}
>
${this.renderStar(a(t),o)}
</button>`:this.renderStar(a(t),o))}
</span>`,l=this.showValue?y`<span class="value" part="value"
><strong>${t.toFixed(1)}</strong>${this.ratingCount===void 0?f:y`<span class="count" part="count"
>(${this.ratingCount.toLocaleString(`en-US`)})</span
>`}</span
>`:f,ee=b({rating:!0,[this.size]:!0,interactive:e});return e?y`<span
part="root"
class=${ee}
role="slider"
tabindex="0"
aria-label=${s}
aria-description=${this.aria.description??f}
aria-valuenow=${t}
aria-valuemin="0"
aria-valuemax=${n}
aria-required=${this.required?`true`:f}
@keydown=${this.handleKeyDown}
@mouseleave=${()=>this.send({type:`HOVER_END`})}
>${c}${l}</span
>`:y`<span
part="root"
class=${ee}
role="img"
aria-label=${s}
aria-description=${this.aria.description??f}
aria-disabled=${this.isDisabled?`true`:f}
>${c}${l}</span
>`}},R([m({attribute:!1})],Ni.prototype,`value`,void 0),R([m({type:Number,attribute:`value`})],Ni.prototype,`defaultValue`,void 0),R([m({type:Number})],Ni.prototype,`max`,void 0),R([m({reflect:!0})],Ni.prototype,`size`,void 0),R([m({type:Boolean,attribute:`show-value`})],Ni.prototype,`showValue`,void 0),R([m({type:Number,attribute:`rating-count`})],Ni.prototype,`ratingCount`,void 0),R([m({type:Boolean,reflect:!0})],Ni.prototype,`interactive`,void 0),R([m({type:Boolean,reflect:!0,attribute:`readonly`})],Ni.prototype,`readOnly`,void 0),R([S(`.rating`)],Ni.prototype,`root`,void 0),Pi=class extends P{constructor(...e){super(...e),this.dimensions=[],this.max=10,this.size=`medium`,this.interactive=!1,this.readOnly=!1,this.hideValue=!1}static{this.tagName=`minerva-rating-scale`}static{this.dependencies=[Ni]}static{this.styles=[M,h`
:host{
display: block;
}
`,I(ur)]}handleChange(e,t){e.stopPropagation();let{value:n}=e.detail;this.dimensions=this.dimensions.map(e=>e.key===t?{...e,value:n}:e),this.emit(`minerva-change`,{key:t,value:n,dimensions:this.dimensions})}hookStates(){return{readonly:!this.interactive||this.readOnly,size:this.size}}render(){return y`<div class="scale" part="root">
${this.dimensions.map(e=>y`<div class="scaleRow" part="row" title=${e.hint??f}>
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
</div>`}},R([m({attribute:!1})],Pi.prototype,`dimensions`,void 0),R([m({type:Number})],Pi.prototype,`max`,void 0),R([m({reflect:!0})],Pi.prototype,`size`,void 0),R([m({type:Boolean,reflect:!0})],Pi.prototype,`interactive`,void 0),R([m({type:Boolean,reflect:!0,attribute:`readonly`})],Pi.prototype,`readOnly`,void 0),R([m({type:Boolean,attribute:`hide-value`})],Pi.prototype,`hideValue`,void 0)})))()}var Ii,Li,Ri,zi,Bi;function Vi(){return(Vi=e((()=>{zt(),j(),N(),w(),nr(),A(),D(),qt(),p(),_(),Ii=0,Li=class e extends P{constructor(...e){super(...e),this.internals=lr(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.label=``,this.selected=!1,this.highlighted=!1}static{this.tagName=`minerva-option`}static{this.styles=[M,h`
:host{
display: block;
outline: none;
}
`,I(Nt)]}get text(){return this.textValue??(this.label||this.textContent?.trim()||``)}get displayLabel(){return this.label||this.textContent?.trim()||``}connectedCallback(){super.connectedCallback(),Ht(this,this.internals,{role:`option`},this.ownedAria)}updated(t){super.updated(t),Ht(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),T(this,`data-highlighted`,this.highlighted),T(this,`data-disabled`,this.disabled),T(this,`data-selected`,this.selected),O&&t.has(`value`)&&this.value===``&&this.isConnected&&F(e.tagName,`an option needs a non-empty "value" (the empty value means "nothing selected").`)}hookStates(){return{selected:this.selected,highlighted:this.highlighted,disabled:this.disabled}}render(){return y`<div
part="root"
class="item"
?data-selected=${this.selected}
?data-highlighted=${this.highlighted}
?data-disabled=${this.disabled}
>
<span class="itemText" part="label"><slot></slot></span>
${this.selected?y`<span class="itemIndicator" part="indicator" aria-hidden="true"
>${sn}</span
>`:f}
</div>`}},R([m({reflect:!0})],Li.prototype,`value`,void 0),R([m({type:Boolean,reflect:!0})],Li.prototype,`disabled`,void 0),R([m()],Li.prototype,`label`,void 0),R([m({attribute:`text-value`})],Li.prototype,`textValue`,void 0),R([m({type:Boolean,attribute:!1})],Li.prototype,`selected`,void 0),R([m({type:Boolean,attribute:!1})],Li.prototype,`highlighted`,void 0),Ri=class extends P{constructor(...e){super(...e),this.internals=lr(this),this.observer=null}static{this.tagName=`minerva-option-group`}static{this.styles=[M,h`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback(),Ht(this,this.internals,{role:`group`}),this.syncLabel(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.syncLabel()),this.observer.observe(this,{childList:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}syncLabel(){let e=this.querySelector(`:scope > minerva-select-label`);if(e){let t=St(e,`id`);t||(t=`minerva-select-label-${Ii++}`,T(e,`id`,t,this)),T(this,`aria-labelledby`,t)}else T(this,`aria-labelledby`,null)}render(){return y`<div part="root"><slot></slot></div>`}},zi=class extends P{static{this.tagName=`minerva-select-label`}static{this.styles=[M,h`
:host{
display: block;
}
`,I(Nt)]}render(){return y`<div class="label" part="root"><slot></slot></div>`}},Bi=class extends P{constructor(...e){super(...e),this.internals=lr(this)}static{this.tagName=`minerva-select-separator`}static{this.styles=[M,h`
:host{
display: block;
}
`,I(Nt)]}connectedCallback(){super.connectedCallback(),Ht(this,this.internals,{ariaHidden:`true`})}render(){return y`<div class="separator" part="root"></div>`}}})))()}var Hi,Ui,Wi,Gi,Ki,qi;function Ji(){return(Ji=e((()=>{j(),N(),w(),L(),On(),A(),D(),Pr(),Tn(),qt(),Vi(),p(),_(),g(),ge(),u(),Hi=10,Ui=e=>Array.isArray(e.options),Wi=e=>e.getAttribute(`aria-disabled`)===`true`,Gi=e=>e instanceof Li?e.value:e.dataset.value??``,Ki=e=>e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey,qi=class e extends k{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.highlighted=null,this.locale=new E(this),this.aria=new C(this,()=>this.labels),this.typeahead=we(),this.floating=new Er(this,()=>({anchor:()=>this.trigger,floating:()=>this.positioner,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,fitViewportHeight:!0,branches:()=>[this.trigger],onDismiss:()=>this.requestOpen(!1),returnFocusOnEscape:()=>this.trigger,focusable:!0,onPosition:()=>this.syncHookStates()})),this.openIntent=`selected`,this.scrollPending=!1,this.dirty=!1,this.observer=null}static{this.tagName=`minerva-select`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,xr,h`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,I(Nt)]}focus(e){this.trigger?.focus(e)}blur(){this.trigger?.blur()}show(){this.open=!0}hide(){this.open=!1}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:[`value`,`disabled`,`label`,`text-value`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.typeahead.reset()}get lightOptions(){return Array.from(this.querySelectorAll(`minerva-option`)).filter(e=>e instanceof Li)}get dataOptions(){return(this.options??[]).flatMap(e=>Ui(e)?e.options:[e])}get items(){return[...this.dataOptions.map(e=>({value:e.value,disabled:!!e.disabled,text:e.textValue??e.label,label:e.label})),...this.lightOptions.map(e=>({value:e.value,disabled:e.disabled,text:e.text,label:e.displayLabel}))]}getOptions(){let e=this.listbox;return e?[...Array.from(e.querySelectorAll(`[role=option]`)),...this.lightOptions]:[]}findOption(e){if(e!==null)return this.getOptions().find(t=>Gi(t)===e)}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.trigger}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}requestOpen(e){e!==this.open&&(e&&this.isDisabled||this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}openWith(e){this.openIntent=e,this.requestOpen(!0)}close(e){e&&this.trigger?.focus(),this.requestOpen(!1)}commitValue(e){e!==this.value&&(this.value=e,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}selectValue(e){this.commitValue(e),this.close(!0)}willUpdate(e){if(e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open){let e=this.openIntent;this.openIntent=`selected`;let t=this.items.filter(e=>!e.disabled),n=e===`last`?t[t.length-1]:e===`first`?t[0]:t.find(e=>e.value===this.value)??t[0];this.typeahead.reset(),this.scrollPending=!0,this.highlighted=n?.value??null}e.has(`open`)&&!this.open&&(this.highlighted=null)}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?Le(e):{side:void 0,align:void 0};return{state:this.open?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,required:this.required,size:this.size,side:t,align:n,placement:e}}updated(e){super.updated(e);for(let e of this.lightOptions)e.selected=e.value===this.value,e.highlighted=this.open&&e.value===this.highlighted;if(this.floating.sync(this.open),this.open&&this.listbox){if(e.has(`open`)||e.has(`highlighted`)){let e=this.findOption(this.highlighted)??this.listbox;e.getRootNode()===this.shadowRoot?this.shadowRoot?.activeElement!==e&&e.focus({preventScroll:!0}):document.activeElement!==e&&(e.hasAttribute(`tabindex`)||(e.tabIndex=-1),e.focus({preventScroll:!0}))}this.scrollPending&&(this.scrollPending=!1,this.findOption(this.highlighted)?.scrollIntoView?.({block:`nearest`}))}O&&this.checkOptions()}checkOptions(){let t=this.items;if(t.length===0)return;let n=new Set;for(let r of t)n.has(r.value)&&F(e.tagName,`several options have the value "${r.value}"; option values must be unique.`),n.add(r.value);this.value!==``&&!n.has(this.value)&&F(e.tagName,`value "${this.value}" does not match any option.`)}handleTriggerKeyDown(e){if(this.open)return;let{key:t}=e;if(Ki(e)&&(t!==` `||this.typeahead.getBuffer()!==``)){let n=this.items,r=this.typeahead.search(t,n,n.findIndex(e=>e.value===this.value));e.preventDefault(),r!==-1&&this.commitValue(n[r].value);return}let n={Enter:`selected`," ":`selected`,ArrowDown:`selected`,ArrowUp:this.value===``?`last`:`selected`,Home:`first`,End:`last`};t in n&&(e.preventDefault(),this.openWith(n[t]))}handleListboxKeyDown(e){let{key:t}=e;if(t===`Tab`){this.close(!0);return}let n=this.getOptions(),r=n.findIndex(e=>Gi(e)===this.highlighted),i=r===-1?void 0:n[r],a=()=>{i&&!Wi(i)&&this.selectValue(Gi(i))};if(t===`Enter`||t===`ArrowUp`&&e.altKey){e.preventDefault(),a();return}if(t===` `&&this.typeahead.getBuffer()===``){e.preventDefault(),a();return}if(e.ctrlKey||e.metaKey||e.altKey)return;let o=Ae({currentIndex:r,count:n.length,key:t,loop:!1,isDisabled:e=>Wi(n[e]),pageSize:Hi});if((o!==null||t.startsWith(`Arrow`)||t.startsWith(`Page`))&&e.preventDefault(),o===null&&Ki(e)){let i=this.typeahead.search(t,n.map(e=>({text:e instanceof Li?e.text:e.dataset.textValue??e.textContent??``,disabled:Wi(e)})),r);i!==-1&&(e.preventDefault(),this.scrollPending=!0,this.highlighted=Gi(n[i]));return}o!==null&&(this.typeahead.reset(),this.scrollPending=!0,this.highlighted=Gi(n[o]))}optionFromEvent(e){let t=this.getOptions();return e.composedPath().find(e=>t.includes(e))}handleListboxPointerMove(e){let t=this.optionFromEvent(e);if(!t||Wi(t))return;let n=Gi(t);this.highlighted!==n&&(this.scrollPending=!1,this.highlighted=n)}handleListboxClick(e){let t=this.optionFromEvent(e);t&&!Wi(t)&&this.selectValue(Gi(t))}renderDataOption(e){let t=e.value===this.value,n=this.highlighted===e.value,r=!!e.disabled;return y`<div
part=${gn(`item`,{selected:t,highlighted:n,disabled:r})}
class="item"
role="option"
tabindex="-1"
aria-selected=${String(t)}
aria-disabled=${e.disabled?`true`:f}
?data-selected=${t}
?data-highlighted=${n}
?data-disabled=${r}
data-value=${e.value}
data-text-value=${e.textValue??f}
>
<span class="itemText">${e.label}</span>
${t?y`<span class="itemIndicator" aria-hidden="true"
>${sn}</span
>`:f}
</div>`}renderDataOptions(){return(this.options??[]).map((e,t)=>{if(!Ui(e))return this.renderDataOption(e);let n=`group-label-${t}`;return y`<div role="group" aria-labelledby=${n}>
<div id=${n} class="label" part="group-label">${e.label}</div>
${e.options.map(e=>this.renderDataOption(e))}
</div>`})}render(){let e=this.isDisabled,t=this.value===``,n=t?void 0:this.items.find(e=>e.value===this.value),r=this.aria.label,{side:i,align:a}=Le(this.floating.position.placement);return y`<button
part="root"
type="button"
role="combobox"
aria-haspopup="listbox"
aria-expanded=${String(this.open)}
aria-controls=${this.open?`listbox`:f}
aria-autocomplete="none"
aria-label=${r??f}
aria-description=${this.aria.description??f}
aria-required=${this.required?`true`:f}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:f}
?disabled=${e}
data-state=${this.open?`open`:`closed`}
?data-placeholder=${t}
data-component="select"
class=${b({trigger:!0,[this.size]:!0,invalid:this.invalid})}
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
>${rn}</span
>
</button>
${this.open?y`<div class="positioner" popover="manual" data-side=${i}>
<div
id="listbox"
part="content"
role="listbox"
tabindex="-1"
aria-label=${r??f}
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
</div>`:f}`}},R([m({attribute:!1})],qi.prototype,`value`,void 0),R([m({attribute:`value`})],qi.prototype,`defaultValue`,void 0),R([m({attribute:!1})],qi.prototype,`options`,void 0),R([m({type:Boolean,reflect:!0})],qi.prototype,`open`,void 0),R([m()],qi.prototype,`placeholder`,void 0),R([m({reflect:!0})],qi.prototype,`size`,void 0),R([m({type:Boolean,reflect:!0})],qi.prototype,`invalid`,void 0),R([x()],qi.prototype,`highlighted`,void 0),R([S(`.trigger`)],qi.prototype,`trigger`,void 0),R([S(`.positioner`)],qi.prototype,`positioner`,void 0),R([S(`[role=listbox]`)],qi.prototype,`listbox`,void 0)})))()}var Yi,Xi,Zi,K,Qi;function $i(){return($i=e((()=>{j(),N(),L(),A(),D(),Ot(),p(),_(),g(),et(),Yi=e=>e==null||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Xi=e=>typeof e!=`number`&&!/^\d+(\.\d+)?$/.test(e)?e:`var(--space-${String(e).replace(`.`,`-`)})`,Zi=[M,h`

:host(:dir(rtl)) .animation-wave{
animation-direction: reverse;
}
`],K=class e extends P{constructor(...e){super(...e),this.variant=`text`,this.animation=`pulse`,this.loaded=!1,this.decorative=!1,this.lines=1,this.avatar=!1,this.avatarSize=`40`,this.avatarShape=`circle`,this.active=!1,this.paragraph=!1,this.heading=!1,this.locale=new E(this),this.aria=new C(this)}static{this.tagName=`minerva-skeleton`}static{this.styles=[...Zi,h`
:host{
display: block;
}
:host([decorative][variant="circular"]){
display: inline-block;
vertical-align: middle;
}
`,I(xt)]}hookStates(){return{variant:this.variant}}updated(t){O&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&F(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}block(e,t,n={}){return y`<div
part=${e}
class=${b({skeleton:!0,[`animation-${this.animation}`]:!0,...t})}
style=${v(n)}
></div>`}renderAvatar(){if(!this.avatar)return f;let e=Yi(this.avatarSize);return this.block(`avatar`,{avatar:!0,[`avatar-${this.avatarShape}`]:!0},{width:e,height:e})}renderTitle(){return this.heading?this.block(`title`,{title:!0}):f}renderParagraph(){return this.paragraph?y`<div class="paragraph">
${[`100%`,`100%`,`92%`,`60%`].map(e=>this.block(`line`,{},{width:e,height:`16px`}))}
</div>`:f}renderLines(){if(this.paragraph||this.heading)return f;let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return Array.from({length:e},()=>this.block(`line`,{[this.variant]:!0},{width:Yi(this.width),height:Yi(this.height),borderRadius:Yi(this.borderRadius)}))}render(){if(this.loaded)return y`<slot></slot>`;if(this.decorative){let e=this.variant===`circular`?Yi(this.size??this.width??`32`):void 0;return y`<span
part="root"
aria-hidden="true"
class=${b({skeleton:!0,decorative:!0,[this.variant]:!0,[`animation-${this.animation}`]:!0})}
style=${v({width:e??Yi(this.width),height:e??Yi(this.height),borderRadius:Yi(this.borderRadius)})}
></span>`}let e=this.variant===`card`?y`<div class=${b({card:!0,active:this.active})}>
${this.renderAvatar()}
<div class="cardContent">
${this.renderTitle()} ${this.renderParagraph()}
</div>
</div>`:y`${this.renderAvatar()}
<div class="content">
${this.renderTitle()} ${this.renderLines()}
${this.renderParagraph()}
</div>`;return y`<div
part="root"
role="status"
aria-busy="true"
aria-label=${this.aria.label??this.locale.t(`common.loading`)}
class=${b({skeletonRoot:!0,withAvatar:this.avatar})}
>
${e}
</div>`}},R([m({reflect:!0})],K.prototype,`variant`,void 0),R([m({reflect:!0})],K.prototype,`animation`,void 0),R([m({type:Boolean,reflect:!0})],K.prototype,`loaded`,void 0),R([m({type:Boolean,reflect:!0})],K.prototype,`decorative`,void 0),R([m()],K.prototype,`size`,void 0),R([m()],K.prototype,`width`,void 0),R([m()],K.prototype,`height`,void 0),R([m({attribute:`border-radius`})],K.prototype,`borderRadius`,void 0),R([m({type:Number})],K.prototype,`lines`,void 0),R([m({type:Boolean})],K.prototype,`avatar`,void 0),R([m({attribute:`avatar-size`})],K.prototype,`avatarSize`,void 0),R([m({attribute:`avatar-shape`})],K.prototype,`avatarShape`,void 0),R([m({type:Boolean})],K.prototype,`active`,void 0),R([m({type:Boolean})],K.prototype,`paragraph`,void 0),R([m({type:Boolean})],K.prototype,`heading`,void 0),Qi=class e extends P{constructor(...e){super(...e),this.lines=3,this.lineHeight=`1em`,this.gap=`2`,this.noShrinkLast=!1,this.animation=`pulse`}static{this.tagName=`minerva-skeleton-text`}static{this.styles=[...Zi,h`
:host{
display: block;
}
`,I(xt)]}updated(t){O&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&F(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}render(){let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return y`<div
part="root"
aria-hidden="true"
class="skeletonText"
style=${v({gap:Xi(this.gap)})}
>
${Array.from({length:e},(t,n)=>y`<span
part="line"
class="skeleton decorative text animation-${this.animation}"
style=${v({height:Yi(this.lineHeight),width:!this.noShrinkLast&&n===e-1?`70%`:`100%`})}
></span>`)}
</div>`}},R([m({type:Number})],Qi.prototype,`lines`,void 0),R([m({attribute:`line-height`})],Qi.prototype,`lineHeight`,void 0),R([m()],Qi.prototype,`gap`,void 0),R([m({type:Boolean,attribute:`no-shrink-last`})],Qi.prototype,`noShrinkLast`,void 0),R([m({reflect:!0})],Qi.prototype,`animation`,void 0)})))()}var ea,ta;function na(){return(na=e((()=>{N(),A(),En(),D(),_r(),Ut(),p(),_(),g(),et(),ea=320,ta=class e extends P{constructor(...e){super(...e),this.asideWidth=ea,this.collapseBelow=`md`,this.gap=6,this.slots=new Sn(this)}static{this.tagName=`minerva-split-layout`}static{this.styles=[M,h`
:host{
display: block;
min-width: 0;
}
`,I(Lt)]}get validAsideWidth(){return Number.isFinite(this.asideWidth)&&this.asideWidth>0}updated(){O&&!this.validAsideWidth&&F(e.tagName,`aside-width must be a finite positive number (got ${String(this.asideWidth)}); using ${ea}.`)}render(){let e=this.slots.test(`aside`),t=this.validAsideWidth?this.asideWidth:ea;return y`<div
class="root"
part="root"
style=${v({"--split-layout-aside-width":`${t}px`,"--split-layout-gap":_e(this.gap)})}
>
<div
class=${b({grid:!0,[this.collapseBelow]:!0,hasAside:e})}
>
<div class="main" part="main"><slot></slot></div>
${e?y`<div class="aside" part="aside">
<slot name="aside"></slot>
</div>`:f}
</div>
</div>`}},R([m({type:Number,attribute:`aside-width`})],ta.prototype,`asideWidth`,void 0),R([m({attribute:`collapse-below`,reflect:!0})],ta.prototype,`collapseBelow`,void 0),R([m({converter:pr})],ta.prototype,`gap`,void 0)})))()}var ra,ia,aa,oa,sa,ca,la,ua;function da(){return(da=e((()=>{j(),N(),A(),En(),D(),_r(),Ft(),p(),_(),g(),et(),ra={start:`flex-start`,center:`center`,end:`flex-end`,stretch:`stretch`,baseline:`baseline`},ia={start:`flex-start`,center:`center`,end:`flex-end`,between:`space-between`,around:`space-around`,evenly:`space-evenly`},aa=()=>typeof HTMLSlotElement<`u`&&typeof HTMLSlotElement.prototype.assign==`function`,oa=`minerva-stack-item-`,sa=e=>Array.from(e.childNodes).filter(e=>e.nodeType===1||e.nodeType===3&&!!e.textContent?.trim()),ca=class extends P{constructor(...e){super(...e),this.direction=`column`,this.wrap=!1,this.attached=!1,this.aria=new C(this),this.slots=new Sn(this),this.manualSlots=!1,this.fallbackSlotted=new Set}static{this.tagName=`minerva-stack`}static{this.styles=[M,h`
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
`,I(Pn)]}get resolvedDirection(){return this.direction}get resolvedAlign(){return this.align}createRenderRoot(){if(!this.shadowRoot){this.manualSlots=aa();let e=this.constructor;this.attachShadow({...e.shadowRootOptions,slotAssignment:this.manualSlots?`manual`:`named`})}return super.createRenderRoot()}renderSeparator(){let e=this.separator;return typeof e==`function`?e():e}get hasSeparator(){let e=this.separator;return e!=null&&e!==``}fallbackItems(){return Array.from(this.children).filter(e=>{let t=e.getAttribute(`slot`);return t===null||this.fallbackSlotted.has(e)&&t!==``})}releaseFallbackSlots(e=[]){for(let t of this.fallbackSlotted)e.includes(t)||(t.getAttribute(`slot`)?.startsWith(oa)&&t.removeAttribute(`slot`),this.fallbackSlotted.delete(t))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this.releaseFallbackSlots()}updated(){if(this.manualSlots){let e=sa(this),t=Array.from(this.renderRoot.querySelectorAll(`slot`));t.length===1?t[0].assign(...e):t.forEach((t,n)=>t.assign(e[n]))}else if(this.hasSeparator){let e=this.fallbackItems();e.forEach((e,t)=>{let n=`${oa}${t}`;this.fallbackSlotted.add(e),e.getAttribute(`slot`)!==n&&e.setAttribute(`slot`,n)}),this.releaseFallbackSlots(e)}else this.releaseFallbackSlots();O&&this.attached&&!this.aria.label&&F(this.constructor.tagName,`attached stacks are exposed as role="group": set aria-label (or aria-labelledby) to name the group.`)}renderItems(){return this.hasSeparator?this.manualSlots?Array.from({length:sa(this).length},(e,t)=>y`${t>0?this.renderSeparator():f}<slot></slot>`):y`${Array.from({length:this.fallbackItems().length},(e,t)=>y`${t>0?this.renderSeparator():f}<slot
name=${`${oa}${t}`}
></slot>`)}<slot></slot>`:y`<slot></slot>`}hookStates(){return{orientation:this.resolvedDirection.startsWith(`row`)?`horizontal`:`vertical`}}render(){this.slots;let e=this.resolvedDirection,t=this.resolvedAlign,n={};return this.gap!==void 0&&this.gap!==``&&!this.attached&&(n.gap=_e(this.gap)),t&&ra[t]&&(n.alignItems=ra[t]),this.justify&&ia[this.justify]&&(n.justifyContent=ia[this.justify]),y`<div
part="root"
class=${b({stack:!0,[e]:!0,wrap:this.wrap,attached:this.attached})}
style=${v(n)}
role=${this.attached?`group`:f}
aria-label=${this.attached?this.aria.label??f:f}
>
${this.renderItems()}
</div>`}},R([m({reflect:!0})],ca.prototype,`direction`,void 0),R([m({converter:pr})],ca.prototype,`gap`,void 0),R([m({reflect:!0})],ca.prototype,`align`,void 0),R([m({reflect:!0})],ca.prototype,`justify`,void 0),R([m({type:Boolean,reflect:!0})],ca.prototype,`wrap`,void 0),R([m({attribute:`separator`})],ca.prototype,`separator`,void 0),R([m({type:Boolean,reflect:!0})],ca.prototype,`attached`,void 0),la=class extends ca{static{this.tagName=`minerva-hstack`}constructor(){super(),this.direction=`row`}get resolvedDirection(){return`row`}hookStates(){return{}}get resolvedAlign(){return this.align??`center`}},ua=class extends ca{static{this.tagName=`minerva-vstack`}constructor(){super(),this.direction=`column`}get resolvedDirection(){return`column`}hookStates(){return{}}get resolvedAlign(){return this.align??`stretch`}}})))()}var fa;function pa(){return(pa=e((()=>{j(),N(),L(),On(),A(),D(),mt(),p(),_(),g(),$e(),fa=class e extends P{constructor(...e){super(...e),this.items=[],this.value=``,this.navigable=!1,this.locale=new E(this),this.aria=new C(this)}static{this.tagName=`minerva-steps`}static{this.styles=[M,h`
:host{
display: block;
}
`,I(Ln)]}select(e){e.disabled||e.value===this.value||this.emit(`minerva-change`,{value:e.value},{cancelable:!0})&&(this.value=e.value)}updated(){O&&this.value&&this.items.length&&!this.items.some(e=>e.value===this.value)&&F(e.tagName,`value "${this.value}" matches no step: no step is marked current.`)}hookStates(){return{readonly:!this.navigable}}render(){let e=this.items??[],t=e.findIndex(e=>e.value===this.value),n=!this.navigable;return y`<ol
part="root"
class="steps"
aria-label=${this.aria.label??this.locale.t(`steps.label`)}
>
${Ze(e,e=>e.value,(e,r)=>{let i=r===t,a=t>-1&&r<t,o=y`<span
part="indicator"
class="number"
aria-hidden="true"
>${r+1}</span
><span part="label" class="label">${e.label}</span>`,s=i?void 0:a?`complete`:`upcoming`;return y`<li
part=${gn(`item`,{current:i,disabled:!n&&!!e.disabled,status:s})}
class=${b({step:!0,current:i,complete:a})}
aria-current=${n&&i?`step`:f}
>
${n?y`<span part="button" class="button static"
>${o}</span
>`:y`<button
type="button"
part="button"
class="button"
?disabled=${!!e.disabled}
aria-current=${i?`step`:f}
@click=${()=>this.select(e)}
>
${o}
</button>`}
</li>`})}
</ol>`}},R([m({attribute:!1})],fa.prototype,`items`,void 0),R([m({reflect:!0})],fa.prototype,`value`,void 0),R([m({type:Boolean,reflect:!0})],fa.prototype,`navigable`,void 0)})))()}var ma,ha,q;function ga(){return(ga=e((()=>{j(),N(),L(),A(),En(),D(),Tn(),Bt(),p(),_(),g(),Qe(),ma=400,ha={start:`labelStart`,end:`labelEnd`,top:`labelTop`,bottom:`labelBottom`},q=class e extends k{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.value=`on`,this.label=``,this.offLabel=``,this.onLabel=``,this.variant=`slider`,this.size=`medium`,this.color=`primary`,this.shape=`round`,this.labelPlacement=`end`,this.iconPlacement=`start`,this.loading=!1,this.noRipple=!1,this.readOnly=!1,this.invalid=!1,this.rippleActive=!1,this.dirty=!1,this.locale=new E(this),this.aria=new C(this,()=>this.labels),this.slots=new Sn(this)}static{this.tagName=`minerva-switch`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,h`
:host{
display: inline-flex;
vertical-align: middle;
}
`,I(vt)]}get bilateral(){return!!this.offLabel&&!!this.onLabel}get segmented(){return this.variant===`segmented`&&this.bilateral}get blocked(){return this.isDisabled||this.loading||this.readOnly}focus(e){if(this.segmented){this.renderRoot.querySelector(`.segmentActive`)?.focus(e);return}this.input?.focus(e)}blur(){(this.shadowRoot?.activeElement)?.blur()}click(){this.input?.click()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(t){t.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked),O&&t.has(`variant`)&&this.variant===`segmented`&&!this.bilateral&&F(e.tagName,`variant="segmented" needs both off-label and on-label; rendering a slider.`)}handleChange(){if(this.blocked){this.input.checked=this.checked;return}this.dirty=!0,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value})}handleKeyDown(e){e.key===`Enter`&&(e.preventDefault(),!this.blocked&&this.input.click())}handleClick(e){if(this.readOnly){e.preventDefault();return}this.noRipple||this.blocked||(clearTimeout(this.rippleTimer),this.rippleActive=!0,this.rippleTimer=setTimeout(()=>this.rippleActive=!1,ma))}setState(e){this.blocked||e===this.checked||this.input.click()}hookStates(){return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,loading:this.loading,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape,variant:this.segmented?`segmented`:`slider`}}renderInput(e){let t=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return y`<input
part="input"
type="checkbox"
role=${e?f:`switch`}
class=${e?`hiddenInput`:``}
.checked=${tt(this.checked)}
?disabled=${this.isDisabled||this.loading}
?required=${this.required}
tabindex=${e?`-1`:f}
aria-hidden=${e?`true`:f}
aria-label=${e?f:this.aria.label??f}
aria-description=${e?f:this.aria.description??f}
aria-checked=${e?f:String(this.checked)}
aria-disabled=${!e&&(this.isDisabled||this.loading)?`true`:f}
aria-busy=${this.loading?`true`:f}
aria-invalid=${!e&&t?`true`:f}
aria-readonly=${!e&&this.readOnly?`true`:f}
aria-required=${!e&&this.required?`true`:f}
@change=${this.handleChange}
@click=${this.handleClick}
@keydown=${this.handleKeyDown}
/>`}render(){let e=this.blocked,t=this.isDisabled;if(this.segmented)return y`<span
part="root"
role="group"
aria-label=${this.aria.label??f}
aria-description=${this.aria.description??f}
aria-disabled=${e?`true`:f}
class=${b({segmented:!0,[this.size]:!0,[this.color]:!0,disabled:e})}
>
${this.renderInput(!0)}
${[!1,!0].map(t=>{let n=this.checked===t;return y`<button
part="segment"
type="button"
class=${b({segment:!0,segmentActive:n})}
?disabled=${e}
aria-pressed=${String(n)}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`})}
</span>`;let n=this.bilateral,r=this.slots.test(`icon`),i=b({switch:!0,[this.size]:!0,[ha[this.labelPlacement]]:!n,[this.color]:!0,checked:this.checked,checkedLarge:this.checked&&this.size===`large`,disabled:t,loading:this.loading,square:this.shape===`square`,ripple:!this.noRipple&&this.rippleActive,bilateral:n}),a=y`<span class="switchBase" part="control">
${this.renderInput(!1)}
<span class="track" part="track"></span>
<span class="thumb" part="thumb"
>${this.iconPlacement===`start`&&r?y`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:f}</span
>
${this.noRipple?f:y`<span class="rippleEffect"></span>`}
</span>`,o=this.iconPlacement===`end`&&r?y`<span class="icon" part="icon"><slot name="icon"></slot></span>`:f;if(n){let t=t=>y`<button
part="side"
type="button"
class=${b({side:!0,sideActive:this.checked===t})}
?disabled=${e}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`;return y`<span part="root" class=${i}
>${t(!1)}${a}${t(!0)}${o}</span
>`}let s=this.label||this.slots.test(`[default]`)?y`<span class="label" part="label"
>${this.label||y`<slot></slot>`}</span
>`:f,c=this.labelPlacement===`start`||this.labelPlacement===`top`;return y`<label part="root" class=${i}
>${c?s:f}${a}${o}${c?f:s}</label
>`}},R([m({attribute:!1})],q.prototype,`checked`,void 0),R([m({type:Boolean,attribute:`checked`,reflect:!0})],q.prototype,`defaultChecked`,void 0),R([m()],q.prototype,`value`,void 0),R([m()],q.prototype,`label`,void 0),R([m({attribute:`off-label`})],q.prototype,`offLabel`,void 0),R([m({attribute:`on-label`})],q.prototype,`onLabel`,void 0),R([m({reflect:!0})],q.prototype,`variant`,void 0),R([m({reflect:!0})],q.prototype,`size`,void 0),R([m({reflect:!0})],q.prototype,`color`,void 0),R([m({reflect:!0})],q.prototype,`shape`,void 0),R([m({attribute:`label-placement`,reflect:!0})],q.prototype,`labelPlacement`,void 0),R([m({attribute:`icon-placement`})],q.prototype,`iconPlacement`,void 0),R([m({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),R([m({type:Boolean,attribute:`no-ripple`})],q.prototype,`noRipple`,void 0),R([m({type:Boolean,reflect:!0,attribute:`readonly`})],q.prototype,`readOnly`,void 0),R([m({type:Boolean,reflect:!0})],q.prototype,`invalid`,void 0),R([x()],q.prototype,`rippleActive`,void 0),R([S(`input`)],q.prototype,`input`,void 0)})))()}var _a,va,ya,ba,xa;function Sa(){return(Sa=e((()=>{zt(),j(),N(),$t(),nr(),A(),D(),kr(),Nr(),yt(),p(),_(),g(),u(),_a=0,va=e=>e.parentElement?.closest(`minerva-tabs`)??null,ya=class e extends P{constructor(...e){super(...e),this.variant=`line`,this.color=`primary`,this.orientation=`horizontal`,this.activationMode=`automatic`,this.noLoop=!1,this.label=``,this.aria=new C(this),this.baseId=`minerva-tabs-${++_a}`,this.rovingKey=``,this.observer=null,this.settleQueued=!1,this.roving=new Or(this,()=>({getItems:()=>this.tabs,orientation:this.orientation,dir:le(this),loop:!this.noLoop})),this.machine=new yr(this,de(this.tabsProps()),()=>!1),this.handleKeyDownCapture=()=>this.ensureRoving(),this.handleFocusIn=e=>{let t=this.tabs.find(t=>t===e.target);t&&this.send({type:`FOCUS`,value:t.value,disabled:t.disabled})}}static{this.tagName=`minerva-tabs`}static{this.styles=[M,h`
:host{
display: block;
min-width: 0;
}
`,I(Zt)]}get tabs(){return Array.from(this.querySelectorAll(`minerva-tab`)).filter(e=>va(e)===this)}get panels(){return Array.from(this.querySelectorAll(`minerva-tab-panel`)).filter(e=>va(e)===this)}tabsProps(){return{value:this.value,activationMode:this.activationMode,onValueChange:e=>this.apply(e)}}send(e){this.machine.sync(this.tabsProps()),this.machine.send(e)}apply(e){this.emit(`minerva-change`,{value:e},{cancelable:!0})&&(this.value=e)}select(e){this.send({type:`SELECT`,value:e,disabled:!1})}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`value`,`disabled`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.rovingKey=``}updated(t){t.has(`value`)&&O&&this.value!==void 0&&this.tabs.length>0&&!this.tabs.some(e=>e.value===this.value)&&F(e.tagName,`value "${this.value}" does not match any <minerva-tab>.`),this.sync()}ensureRoving(){if(!this.tablist)return;let e=`${this.orientation}|${le(this)}|${this.noLoop}`;e!==this.rovingKey&&(this.rovingKey=e,this.roving.detach(),this.roving.attach(this.tablist))}sync(){if(!this.tablist)return;let e=this.tabs,t=this.panels,n=new Map;for(let t of e)n.set(t,t.id||`${this.baseId}-tab-${t.value}`),t.id||T(t,`id`,n.get(t),this);for(let e of t)n.set(e,e.id||`${this.baseId}-panel-${e.value}`),e.id||T(e,`id`,n.get(e),this);for(let r of e){let e=t.find(e=>e.value===r.value);r.sync(this,r.value===this.value,e&&n.get(e))}for(let r of t){let t=e.find(e=>e.value===r.value);r.sync(this,r.value===this.value,t&&n.get(t))}let r=[this,...e,...t].find(In);if(r){this.settleQueued||(this.settleQueued=!0,It(r,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.ensureRoving();let i=be(e,this.value);i?this.roving.setActive(i,{focus:!1}):this.roving.refresh()}hookStates(){return{orientation:this.orientation,variant:this.variant,color:this.color}}render(){return y`<div
part="root"
class=${b({tabs:!0,[this.color]:!0,vertical:this.orientation===`vertical`})}
data-orientation=${this.orientation}
@keydown=${{handleEvent:this.handleKeyDownCapture,capture:!0}}
>
<div
part="list"
role="tablist"
aria-label=${this.label||this.aria.label||f}
aria-orientation=${this.orientation}
data-orientation=${this.orientation}
class=${b({list:!0,[`${this.variant}List`]:!0,verticalList:this.orientation===`vertical`})}
@focusin=${this.handleFocusIn}
>
<slot name="tab" @slotchange=${()=>this.sync()}></slot>
</div>
<slot @slotchange=${()=>this.sync()}></slot>
</div>`}},R([m({reflect:!0})],ya.prototype,`value`,void 0),R([m({reflect:!0})],ya.prototype,`variant`,void 0),R([m({reflect:!0})],ya.prototype,`color`,void 0),R([m({reflect:!0})],ya.prototype,`orientation`,void 0),R([m({reflect:!0,attribute:`activation-mode`})],ya.prototype,`activationMode`,void 0),R([m({type:Boolean,reflect:!0,attribute:`no-loop`})],ya.prototype,`noLoop`,void 0),R([m()],ya.prototype,`label`,void 0),R([S(`[role="tablist"]`)],ya.prototype,`tablist`,void 0),ba=class extends P{constructor(...e){super(...e),this.internals=lr(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.selected=!1,this.group=null,this.handleMouseDown=e=>{if(this.disabled){e.preventDefault();return}e.button===0&&!e.ctrlKey?this.select():e.preventDefault()},this.handleKeyDown=e=>{e.defaultPrevented||this.disabled||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),this.select())},this.handleClick=e=>{!this.disabled&&e.detail===0&&this.select()}}static{this.tagName=`minerva-tab`}static{this.styles=[M,h`
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
`,I(Zt)]}sync(e,t,n){this.group=e,this.selected=t,T(this,`aria-controls`,n??null),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.hasAttribute(`slot`)||T(this,`slot`,`tab`),Ht(this,this.internals,{role:`tab`},this.ownedAria),this.addEventListener(`mousedown`,this.handleMouseDown),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`mousedown`,this.handleMouseDown),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.group=null}select(){(this.group??va(this))?.select(this.value)}updated(){Ht(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),T(this,`data-state`,this.selected?`active`:`inactive`),T(this,`data-disabled`,this.disabled);let e=this.group?.orientation??`horizontal`;T(this,`data-orientation`,e)}hookStates(){return{state:this.selected?`active`:`inactive`,disabled:this.disabled,orientation:this.group?.orientation??`horizontal`,variant:this.group?.variant??`line`,color:this.color}}render(){let e=this.group,t=e?.variant??`line`,n=e?.orientation===`vertical`;return y`<span
part="root"
class=${b({trigger:!0,[`${t}Trigger`]:!0,verticalTrigger:n,[this.color??``]:!!this.color,colored:!!this.color})}
data-state=${this.selected?`active`:`inactive`}
data-orientation=${e?.orientation??`horizontal`}
><slot></slot
></span>`}},R([m({reflect:!0})],ba.prototype,`value`,void 0),R([m({type:Boolean,reflect:!0})],ba.prototype,`disabled`,void 0),R([m({reflect:!0})],ba.prototype,`color`,void 0),R([m({type:Boolean,reflect:!0})],ba.prototype,`selected`,void 0),xa=class extends P{constructor(...e){super(...e),this.internals=lr(this),this.value=``,this.forceMount=!1,this.orientation=`horizontal`,this.selected=!1,this.stamped=[]}static{this.tagName=`minerva-tab-panel`}static{this.styles=[M,h`
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
`,I(Zt)]}get template(){return Array.from(this.children).find(e=>e instanceof HTMLTemplateElement)??null}syncContent(){if(In(this))return;let e=this.template;if(this.selected||this.forceMount){if(e&&!this.stamped.length){let t=this.ownerDocument.importNode(e.content,!0);this.stamped=Array.from(t.childNodes),e.after(t)}return}for(let e of this.stamped)e.parentNode?.removeChild(e);this.stamped=[]}sync(e,t,n){this.orientation=e.orientation,this.selected=t,T(this,`hidden`,!t),this.syncContent(),T(this,`data-state`,t?`active`:`inactive`),T(this,`data-orientation`,e.orientation),T(this,`aria-labelledby`,n??null),this.requestUpdate()}willUpdate(e){e.has(`forceMount`)&&this.hasUpdated&&this.syncContent()}connectedCallback(){super.connectedCallback(),Ht(this,this.internals,{role:`tabpanel`}),this.hasAttribute(`tabindex`)||T(this,`tabindex`,`0`)}hookStates(){return{state:this.selected?`active`:`inactive`,orientation:this.orientation}}render(){return y`<div
part="root"
class="panel"
data-orientation=${this.orientation}
?hidden=${!this.selected&&In(this)&&!!va(this)}
>
<slot></slot>
</div>`}},R([m({reflect:!0})],xa.prototype,`value`,void 0),R([m({type:Boolean,reflect:!0,attribute:`force-mount`})],xa.prototype,`forceMount`,void 0)})))()}var Ca,J;function wa(){return(wa=e((()=>{j(),N(),w(),L(),A(),En(),D(),rr(),p(),_(),g(),et(),$e(),Ca=600,J=class e extends P{constructor(...e){super(...e),this.color=`neutral`,this.variant=`subtle`,this.size=`medium`,this.shape=`rounded`,this.closable=!1,this.clickable=!1,this.toggle=!1,this.loading=!1,this.elevation=!1,this.disabled=!1,this.noRipple=!1,this.ripples=[],this.nextRippleId=0,this.rippleTimers=new Set,this.locale=new E(this),this.aria=new C(this),this.slots=new Sn(this)}static{this.tagName=`minerva-tag`}static{this.shadowRootOptions={...P.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,h`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
.closeIcon svg{
display: block;
}
`,I(gt)]}focus(e){(this.actionButton??this.closeButton)?.focus(e)}disconnectedCallback(){super.disconnectedCallback(),this.rippleTimers.forEach(clearTimeout),this.rippleTimers.clear(),this.ripples=[]}labelText(){return Array.from(this.childNodes).filter(e=>e.nodeType===3||e.nodeType===1&&!e.hasAttribute(`slot`)).map(e=>e.textContent??``).join(``).replace(/\s+/g,` `).trim()}get inactive(){return this.disabled||this.loading}handleClick(e){this.inactive||(this.addRipple(e),this.toggle&&(this.pressed=!this.pressed,this.emit(`minerva-change`,{pressed:this.pressed})))}handleClose(e){e.stopPropagation(),!this.disabled&&this.emit(`minerva-close`,{})}addRipple(e){if(this.noRipple)return;let t=e.currentTarget.parentElement;if(!t)return;let n=t.getBoundingClientRect(),r=e.detail===0,i=Math.max(n.width,n.height),a=i/2,o=this.nextRippleId++,s=r?n.width/2-a:e.clientX-n.left-a,c=r?n.height/2-a:e.clientY-n.top-a;this.ripples=[...this.ripples,{id:o,style:{width:`${i}px`,height:`${i}px`,left:`${s}px`,top:`${c}px`}}];let l=setTimeout(()=>{this.rippleTimers.delete(l),this.ripples=this.ripples.filter(e=>e.id!==o)},Ca);this.rippleTimers.add(l)}hookStates(){return{state:this.clickable&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){O&&(this.toggle||this.pressed!==void 0)&&!this.clickable&&F(e.tagName,`pressed / toggle require clickable: the tag is not a button otherwise.`)}render(){let e=this.toggle||this.pressed!==void 0,t=this.closable?this.labelText():``,n=this.closeLabel??(t?this.locale.t(`tag.closeWithLabel`,{label:t}):this.locale.t(`tag.close`)),r=y`${this.loading?y`<span
class="spinner"
part="spinner"
aria-hidden="true"
></span>`:y`${this.slots.test(`icon`)?y`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:f}${this.slots.test(`avatar`)?y`<span class="avatar" part="avatar"
><slot name="avatar"></slot
></span>`:f}`}<span class="content" part="label"><slot></slot></span>`;return y`<div
part="root"
class=${b({tag:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,[this.shape]:!0,clickable:this.clickable&&!this.inactive,pressed:this.clickable&&!!this.pressed,elevation:this.elevation,disabled:this.disabled,loading:this.loading})}
aria-busy=${this.loading?`true`:f}
data-component="tag"
>
${this.clickable?y`<button
type="button"
part="action"
class="action"
?disabled=${this.inactive}
aria-pressed=${e?String(!!this.pressed):f}
aria-label=${this.aria.label??f}
aria-description=${this.aria.description??f}
@click=${this.handleClick}
>
${r}
</button>`:r}
${this.closable&&!this.loading?y`<button
type="button"
part="close-button"
class="closeIcon"
?disabled=${this.disabled}
aria-label=${n}
title=${n}
@click=${this.handleClose}
>
<slot name="close-icon">${Kt}</slot>
</button>`:f}
${Ze(this.ripples,e=>e.id,e=>y`<span class="ripple" style=${v(e.style)}></span>`)}
</div>`}},R([m({reflect:!0})],J.prototype,`color`,void 0),R([m({reflect:!0})],J.prototype,`variant`,void 0),R([m({reflect:!0})],J.prototype,`size`,void 0),R([m({reflect:!0})],J.prototype,`shape`,void 0),R([m({type:Boolean,reflect:!0})],J.prototype,`closable`,void 0),R([m({type:Boolean,reflect:!0})],J.prototype,`clickable`,void 0),R([m({type:Boolean,reflect:!0})],J.prototype,`pressed`,void 0),R([m({type:Boolean,reflect:!0})],J.prototype,`toggle`,void 0),R([m({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),R([m({type:Boolean,reflect:!0})],J.prototype,`elevation`,void 0),R([m({type:Boolean,reflect:!0})],J.prototype,`disabled`,void 0),R([m({attribute:`close-label`})],J.prototype,`closeLabel`,void 0),R([m({type:Boolean,attribute:`no-ripple`})],J.prototype,`noRipple`,void 0),R([x()],J.prototype,`ripples`,void 0),R([S(`.action`)],J.prototype,`actionButton`,void 0),R([S(`.closeIcon`)],J.prototype,`closeButton`,void 0)})))()}function Ta(e,t){try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>typeof e==`string`)}catch{}return O&&F(Oa,`the ${t} attribute is not a JSON array of strings.`),null}function Ea(e,t){let n=(e??``).trim();return n?n.startsWith(`[`)?Ta(n,t)??[]:n.split(`,`).map(e=>e.trim()).filter(Boolean):[]}function Da(e){let t=(e??``).trim();return t?t.startsWith(`[`)?Ta(t,`separators`)??[...ce]:t.split(/\s+/):[]}var Oa,ka,Aa,ja,Y;function Ma(){return(Ma=e((()=>{j(),N(),w(),L(),On(),A(),D(),jn(),Pr(),er(),Tn(),rr(),Yt(),p(),_(),g(),ge(),u(),Qe(),$e(),Oa=`minerva-tag-input`,ka=`Enter`,Aa=[`\r
`,`
`,`\r`],ja=0,Y=class extends k{constructor(...e){super(...e),this._value=[],this.defaultValue=[],this.options=[],this.separators=[...ce],this.noCommitOnBlur=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.draft=``,this.requestedOpen=!1,this.highlight=0,this.listId=`minerva-tag-input-list-${ja++}`,this.locale=new E(this),this.aria=new C(this,()=>this.labels),this.floating=new Er(this,()=>({anchor:()=>this.combobox,floating:()=>this.list,branches:()=>[this],placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`exact`,onDismiss:()=>this.setOpen(!1)})),this.dirty=!1,this.composing=!1,this.navigating=!1,this.highlightKey=``}static{this.tagName=Oa}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,xr,h`
:host{
display: block;
min-width: 0;
}
`,I(gt),I(Vn),I(`.combobox { ${zn.replace(/@charset[^;]*;/g,``)} }`),I(or),h`

.combobox > .root{
flex-direction: row;
gap: 0;
}

.list{
inset: auto;
}
`]}get value(){return this._value}set value(e){this.dirty=!0,this.setValue(e)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}setValue(e){let t=this._value;this._value=Array.isArray(e)?e.map(String):typeof e==`string`?Ea(e,`value`):[],this.requestUpdate(`value`,t)}get blocked(){return this.isDisabled||this.readOnly}get isOpen(){return this.requestedOpen&&!this.blocked}get filtered(){let e=this.value,t=this.draft.trim(),n=[...new Set(this.options.map(e=>e.trim()).filter(Boolean))].filter(t=>!e.includes(t)),r=n.map(e=>({tag:e,label:e,filterValue:e}));t&&!e.includes(t)&&!n.includes(t)&&r.unshift({tag:t,label:this.createLabel?this.createLabel(t):this.locale.t(`tagInput.create`,{tag:t}),filterValue:t});let i=t.toLowerCase();return i?r.filter(e=>e.filterValue.toLowerCase().includes(i)):r}get enterCommits(){return this.separators.includes(ka)}get splitters(){return this.separators.filter(e=>e!==ka&&e!==``)}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.value)e.append(this.name,t);return e}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.setValue([...this.defaultValue]),this.draft=``,this.requestedOpen=!1,this.navigating=!1}restoreFormState(e){e instanceof FormData?this.value=e.getAll(this.name).filter(e=>typeof e==`string`):typeof e==`string`&&(this.value=[e])}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&this.setValue([...this.defaultValue]),this.blocked&&(this.requestedOpen=!1);let t=`${this.filtered.length}\u0000${this.draft}`;if(t!==this.highlightKey&&(this.highlightKey=t,this.highlight=0),O&&e.has(`value`)){let e=new Set,t=this.value.find(t=>e.size===e.add(t).size);t!==void 0&&F(Oa,`value contains the tag "${t}" more than once: tags are unique (removing one removes its position only).`)}}updated(e){super.updated(e),this.floating.sync(this.isOpen),this.input?.toggleAttribute(r,!this.isOpen&&this.draft!==``)}setOpen(e){e&&this.blocked||e!==this.requestedOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.requestedOpen=e)}setTags(e){this.value=e,this.emit(`minerva-change`,{value:[...e]})}setDraft(e){this.draft=e,this.input&&this.input.value!==e&&(this.input.value=e)}commitAll(e,t=``){if(this.blocked||this.composing)return;let n=this.value,r=[...n];for(let t of e){let e=t.trim();e&&!r.includes(e)&&r.push(e)}r.length!==n.length&&this.setTags(r),this.navigating=!1,this.setDraft(t)}commit(e){this.commitAll([e])}select(e){this.commit(e.tag),this.setOpen(!1)}removeAt(e){this.blocked||(this.setTags(this.value.filter((t,n)=>n!==e)),this.input?.focus())}handleInput(){let e=this.input.value;if(this.blocked){this.input.value=this.draft;return}this.navigating=!1;let t=this.splitters,r=this.composing||t.length===0?[e]:n(e,t);r.length>1?this.commitAll(r.slice(0,-1),r[r.length-1]):this.draft=e,this.setOpen(!0),this.emit(`minerva-input`,{value:this.draft})}handlePaste(e){if(this.blocked||this.composing)return;let t=e.clipboardData?.getData(`text`)??``,r=this.enterCommits?[...this.splitters,...Aa]:this.splitters;if(!r.some(e=>t.includes(e)))return;e.preventDefault();let i=this.draft,a=this.input.selectionStart??i.length,o=this.input.selectionEnd??i.length,s=i.slice(0,a)+t+i.slice(o);this.commitAll(n(s,r)),this.setOpen(!1)}handleKeyDown(e){if(this.blocked||this.composing||e.isComposing||e.keyCode===229)return;let t=this.filtered,n=t.length,r=this.isOpen,i=this.draft.trim(),a=this.value;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),this.navigating=!0,this.setOpen(!0),n>0){let t=e.key===`ArrowDown`?1:-1;this.highlight=(this.highlight+t+n)%n}break;case`Enter`:e.preventDefault(),this.enterCommits?!this.navigating&&(!i||a.includes(i))?this.commit(this.draft):r&&t[this.highlight]?this.select(t[this.highlight]):(this.commit(this.draft),this.setOpen(!1)):this.navigating&&r&&t[this.highlight]&&this.select(t[this.highlight]);break;case`Escape`:this.navigating=!1,this.setDraft(``),r&&!e.defaultPrevented&&(e.preventDefault(),this.setOpen(!1));break;case`Backspace`:this.draft===``&&a.length>0&&(e.preventDefault(),this.setTags(a.slice(0,-1)))}}handleFocus(){this.blocked||this.setOpen(!0)}handleBlur(){this.setOpen(!1),this.noCommitOnBlur||this.commit(this.draft)}clearAll(){this.setDraft(``),this.setTags([]),this.emit(`minerva-clear`),this.input?.focus()}renderTag(e,t){let n=this.isDisabled,r=this.removeLabel?this.removeLabel(e):this.locale.t(`tagInput.remove`,{tag:e});return y`<div
part="tag"
class=${b({tag:!0,neutral:!0,subtle:!0,large:!0,rounded:!0,disabled:n})}
data-component="tag"
>
<span class="content"><span class="label">${e}</span></span>
${this.readOnly?f:y`<button
part="remove-button"
type="button"
class="closeIcon"
aria-label=${r}
title=${r}
?disabled=${n}
@click=${e=>{e.stopPropagation(),this.removeAt(t)}}
>
${Kt}
</button>`}
</div>`}hookStates(){return{state:this.isOpen?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,readonly:this.readOnly,required:this.required,size:this.size}}renderList(e){let t=this.aria.label;return y`<ul
part="list"
id=${this.listId}
role="listbox"
popover="manual"
aria-label=${t??f}
class="list"
>
${e.length===0?y`<li class="empty" part="empty" role="presentation">
${this.emptyText??this.locale.t(`tagInput.empty`)}
</li>`:f}
${e.map((e,t)=>y`<li
part=${gn(`option`,{highlighted:t===this.highlight})}
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
</ul>`}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.value,r=this.isOpen,i=this.filtered,a=this.draft.trim(),o=r?i[this.highlight]:void 0,s=e=>e.preventDefault();return y`<div part="root" class="root">
${n.length>0?y`<div part="tags" class="values">
${Ze(n,(e,t)=>`${t}-${e}`,(e,t)=>this.renderTag(e,t))}
</div>`:f}
<div class="entry">
<div class="combobox">
<div
part="control"
class=${b({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
type="text"
role="combobox"
aria-label=${this.aria.label??f}
aria-description=${this.aria.description??f}
aria-expanded=${r?`true`:`false`}
aria-controls=${r?this.listId:f}
aria-autocomplete="list"
aria-activedescendant=${o?`${this.listId}-option-${this.highlight}`:f}
aria-invalid=${this.invalid?`true`:f}
aria-required=${this.required?`true`:f}
autocomplete="off"
spellcheck="false"
placeholder=${this.placeholder||f}
.value=${tt(this.draft)}
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
${r?this.renderList(i):f}
</div>
${this.readOnly?f:y`<button
part="add-button"
type="button"
class=${b({iconButton:!0,neutral:!0,"variant-ghost":!0,medium:!0,square:!0,disabled:t||!a||n.includes(a)})}
aria-label=${this.addLabel??e(`tagInput.add`)}
?disabled=${t||!a||n.includes(a)}
@mousedown=${s}
@click=${()=>{this.commit(this.draft),this.input?.focus()}}
>
${ln}
</button>
<button
part="clear-button"
type="button"
class=${b({iconButton:!0,neutral:!0,"variant-ghost":!0,medium:!0,square:!0,disabled:t||n.length===0})}
aria-label=${this.clearLabel??e(`tagInput.clear`)}
?disabled=${t||n.length===0}
@mousedown=${s}
@click=${this.clearAll}
>
${Kt}
</button>`}
</div>
</div>`}},R([m({attribute:!1})],Y.prototype,`value`,null),R([m({attribute:`value`,converter:{fromAttribute:e=>Ea(e,`value`)}})],Y.prototype,`defaultValue`,void 0),R([m({converter:{fromAttribute:e=>Ea(e,`options`)}})],Y.prototype,`options`,void 0),R([m({converter:{fromAttribute:Da}})],Y.prototype,`separators`,void 0),R([m({type:Boolean,attribute:`no-commit-on-blur`})],Y.prototype,`noCommitOnBlur`,void 0),R([m()],Y.prototype,`placeholder`,void 0),R([m({reflect:!0})],Y.prototype,`size`,void 0),R([m({type:Boolean,reflect:!0})],Y.prototype,`invalid`,void 0),R([m({type:Boolean,reflect:!0,attribute:`readonly`})],Y.prototype,`readOnly`,void 0),R([m({attribute:`empty-text`})],Y.prototype,`emptyText`,void 0),R([m({attribute:`add-label`})],Y.prototype,`addLabel`,void 0),R([m({attribute:`clear-label`})],Y.prototype,`clearLabel`,void 0),R([m({attribute:!1})],Y.prototype,`removeLabel`,void 0),R([m({attribute:!1})],Y.prototype,`createLabel`,void 0),R([x()],Y.prototype,`draft`,void 0),R([x()],Y.prototype,`requestedOpen`,void 0),R([x()],Y.prototype,`highlight`,void 0),R([S(`input.field`)],Y.prototype,`input`,void 0),R([S(`.combobox`)],Y.prototype,`combobox`,void 0),R([S(`.list`)],Y.prototype,`list`,void 0)})))()}var Na;function Pa(){return(Pa=e((()=>{j(),N(),w(),A(),D(),fn(),bn(),p(),_(),g(),u(),Na=class e extends P{constructor(...e){super(...e),this.variant=`default`,this.aria=new C(this)}static{this.tagName=`minerva-text-link`}static{this.shadowRootOptions={...P.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,h`
:host{
display: inline;
}
:host([variant="action"]){
display: block;
}
:host([variant="subtle"]){
display: inline-flex;
}
`,I(cr)]}focus(e){this.anchor?.focus(e)}blur(){this.anchor?.blur()}click(){this.anchor?.click()}hookStates(){return{variant:this.variant}}updated(){O&&!this.href&&F(e.tagName,`href is missing: without it the link is not focusable nor announced as a link (use a button for actions).`)}render(){return y`<a
part="root"
class=${b({textLink:!0,[this.variant]:!0})}
href=${un(e.tagName,this.href)??f}
target=${this.target??f}
rel=${Xe(this.target,this.rel)??f}
download=${this.download??f}
hreflang=${this.hreflang??f}
aria-label=${this.aria.label??f}
aria-description=${this.aria.description??f}
aria-current=${this.aria.attr(`aria-current`)??f}
><slot></slot>${this.variant===`subtle`?Et:f}</a
>`}},R([m({reflect:!0})],Na.prototype,`variant`,void 0),R([m()],Na.prototype,`href`,void 0),R([m()],Na.prototype,`target`,void 0),R([m()],Na.prototype,`rel`,void 0),R([m()],Na.prototype,`download`,void 0),R([m()],Na.prototype,`hreflang`,void 0),R([S(`a`)],Na.prototype,`anchor`,void 0)})))()}function Fa(){La=null}var Ia,La,Ra,za,Ba,Va,Ha;function Ua(){return(Ua=e((()=>{N(),$t(),L(),On(),A(),D(),tr(),p(),_(),ge(),u(),Ia=`(prefers-color-scheme: dark)`,La=null,Ra=()=>typeof window<`u`&&window.matchMedia?.(Ia).matches?`dark`:`light`,za=(e,t)=>{typeof document<`u`&&(document.cookie=t===null?`${e}=; path=/; max-age=0; SameSite=Lax`:pe(e,t))},Ba=class extends P{constructor(...e){super(...e),this.persist=!1,this.locale=new E(this),this.observer=null,this.media=null,this.onScheme=()=>this.onSystemChange()}static{this.styles=[M,h`
:host{
display: inline-flex;
vertical-align: middle;
}
`,I(hn)]}get config(){return bt(this,`minerva-config`)}onSystemChange(){this.requestUpdate()}connectedCallback(){if(super.connectedCallback(),typeof MutationObserver<`u`){this.observer=new MutationObserver(()=>this.requestUpdate());let e=this.config;this.observer.observe(e??document.documentElement,{attributes:!0,attributeFilter:e?[`theme`,`palette`,`data-theme`]:[`data-theme`,`data-palette`]})}typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(Ia),this.media.addEventListener?.(`change`,this.onScheme))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.media?.removeEventListener?.(`change`,this.onScheme),this.media=null}renderGroup(e,t,n){return y`<div part="root" class="group" role="group" aria-label=${e}>
${t.map(e=>y`<button
type="button"
part=${gn(`item`,{state:e.active?`active`:`inactive`})}
class="item"
data-state=${e.active?`active`:`inactive`}
aria-pressed=${e.active?`true`:`false`}
@click=${()=>n(e.value)}
>
${e.text}
</button>`)}
</div>`}},R([m({type:Boolean,reflect:!0})],Ba.prototype,`persist`,void 0),Va=class extends Ba{constructor(...e){super(...e),this.hideSystem=!1,this.select=e=>{e!==this.theme&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-theme-toggle`}get theme(){let e=this.config;if(e){let t=e.theme;return t===`github-dark`?`dark`:o(t)?t:null}if(La)return La;let t=this.persist?Ie(document.cookie,se):void 0;if(o(t))return t;let n=document.documentElement.getAttribute(`data-theme`);return o(n)?n:`system`}get resolvedTheme(){let e=this.config;if(e)return e.resolvedMode??Ra();let t=this.theme;return t===`light`||t===`dark`?t:Ra()}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist&&!La){let e=Ie(document.cookie,se);o(e)&&this.apply(e,!1)}}onSystemChange(){!this.config&&La===`system`&&this.apply(`system`,!1),super.onSystemChange()}apply(e,t=this.persist){let n=this.config;if(n){n.theme=e;return}La=e;let r=document.documentElement,i=e===`system`?Ra():e;r.setAttribute(`data-theme`,i),r.style.colorScheme=i,t&&za(`theme`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.theme,n=this.hideSystem?[`light`,`dark`]:[`light`,`dark`,`system`];return this.renderGroup(e(`themeToggle.label`,{theme:this.resolvedTheme}),n.map(n=>({value:n,text:this.labels?.[n]??e(`themeToggle.${n}`),active:t===n})),this.select)}},R([m({type:Boolean,reflect:!0,attribute:`hide-system`})],Va.prototype,`hideSystem`,void 0),R([m({attribute:!1})],Va.prototype,`labels`,void 0),Ha=class e extends Ba{constructor(...e){super(...e),this.palettes=[...Re],this.showDefault=!1,this.select=e=>{e!==this.palette&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-palette-toggle`}get palette(){let e=this.config,t=e?e.palette:document.documentElement.getAttribute(`data-palette`);return c(t)?t:null}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist){let e=Ie(document.cookie,Me);c(e)&&!this.palette&&this.apply(e,!1)}}willUpdate(){if(O){let t=(this.palettes??[]).filter(e=>!c(e));t.length&&F(e.tagName,`unknown palette(s) ${t.join(`, `)}: use ${Re.join(`, `)}.`)}}apply(e,t=this.persist){let n=this.config;if(n){n.palette=e??void 0;return}let r=document.documentElement;e?r.setAttribute(`data-palette`,e):r.removeAttribute(`data-palette`),t&&za(`palette`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.palette,n=this.showDefault?[null,...this.palettes.filter(c)]:this.palettes.filter(c);return this.renderGroup(e(`paletteToggle.label`,{palette:t??e(`paletteToggle.default`)}),n.map(n=>{let r=n??`default`;return{value:n,text:this.labels?.[r]??e(`paletteToggle.${r}`),active:t===n}}),this.select)}},R([m({converter:{fromAttribute:e=>(e??``).split(/[\s,]+/).filter(Boolean),toAttribute:e=>e.join(` `)}})],Ha.prototype,`palettes`,void 0),R([m({type:Boolean,reflect:!0,attribute:`show-default`})],Ha.prototype,`showDefault`,void 0),R([m({attribute:!1})],Ha.prototype,`labels`,void 0)})))()}var Wa,X;function Ga(){return(Ga=e((()=>{j(),N(),w(),L(),On(),A(),D(),jn(),Pr(),er(),Tn(),Dn(),Bn(),p(),_(),g(),ge(),u(),Qe(),Wa=(e,t,n=0,r=()=>!1)=>{let i=[];for(let a=n;a<n+e;a+=Math.max(1,t))i.push({value:a,disabled:r(a),label:String(a).padStart(2,`0`)});return i},X=class e extends k{constructor(...e){super(...e),this.name=`time-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.format=`HH:mm:ss`,this.use12Hours=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.hideSecond=!1,this.hourStep=1,this.minuteStep=1,this.secondStep=1,this.draft=null,this.locale=new E(this),this.aria=new C(this,()=>this.labels),this.floating=new Er(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.dirty=!1,this.focusPanelOnOpen=!1}static{this.tagName=`minerva-time-picker`}static{this.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[M,xr,h`
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
`,I(zn),I(Vn),I(An),I(Gn)]}get valueAsDate(){return Ne(this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get effectiveFormat(){return ze(this.format,!this.hideSecond)}get withSeconds(){return oe(this.effectiveFormat)}get interactive(){return!this.isDisabled&&!this.readOnly}getFormValue(){let e=this.valueAsDate;return e?me(e,this.withSeconds):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),O&&this.checkUsage(e)}checkUsage(t){let n=e.tagName;if(t.has(`value`)&&this.value&&!Ne(this.value)&&F(n,`value "${this.value}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`),t.has(`minTime`)||t.has(`maxTime`)){for(let[e,t]of[[`min-time`,this.minTime],[`max-time`,this.maxTime]])t&&!Ne(t)&&F(n,`${e} "${t}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`);let e=Ne(this.minTime),t=Ne(this.maxTime);e&&t&&ve(e)>ve(t)&&F(n,`min-time (${this.minTime}) is later than max-time (${this.maxTime}): no time can be selected.`)}}updated(e){super.updated(e);let t=this.open&&this.interactive;if(this.floating.sync(t),!t){this.focusPanelOnOpen=!1;return}(e.has(`open`)||e.has(`disabled`))&&(this.popup?.querySelectorAll(`[aria-selected="true"]`).forEach(e=>e.scrollIntoView?.({block:`nearest`})),this.focusPanelOnOpen&&this.focusFirstColumn())}focusFirstColumn(){this.popup?.querySelector(`[role="option"][tabindex="0"]`)?.focus()}requestOpenChange(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){this.value=e?me(e,this.withSeconds):``,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleTimeChange(e,t){let n=new Date(this.valueAsDate??ie());if(e===`hour`)n.setHours(t);else if(e===`minute`)n.setMinutes(t);else if(e===`second`)n.setSeconds(t);else{let e=n.getHours()%12;n.setHours(t===1?e+12:e)}this.draft=null,this.commit(n)}handleInput(e){let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t});let n=ke(t,this.effectiveFormat,{strict:!0,base:this.valueAsDate??void 0});n&&this.commit(n)}handleBlur(){let e=this.draft;if(e===null)return;let t=this.valueAsDate;if(e.trim()===``)t&&this.commit(null);else{let n=ke(e,this.effectiveFormat,{strict:!1,base:t??void 0});n&&n.getTime()!==t?.getTime()&&this.commit(n)}this.draft=null}handleClear(){this.draft=null,this.commit(null),this.emit(`minerva-clear`),this.input?.focus()}handleInputClick(){this.interactive&&(this.focusPanelOnOpen=!1,this.requestOpenChange(!this.open))}handleInputKeyDown(e){e.key===`ArrowDown`&&(e.preventDefault(),this.interactive&&(this.open?this.focusFirstColumn():(this.focusPanelOnOpen=!0,this.requestOpenChange(!0)||(this.focusPanelOnOpen=!1))))}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=De(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=De(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{d(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!d(this,e))??null}handleColumnKeyDown(e,t){let n=e.currentTarget,r=e.target,i=Array.from(n.querySelectorAll(`[role="option"]`)).filter(e=>e.getAttribute(`aria-disabled`)!==`true`),a=i.indexOf(r),o=this.popup?.querySelectorAll(`[role="listbox"]`),s=o?.length??0,c=e=>o?.[e]?.querySelector(`[tabindex="0"]`)?.focus();switch(qe(e.key,this)){case`ArrowDown`:e.preventDefault(),i[Math.min(i.length-1,a+1)]?.focus();break;case`ArrowUp`:e.preventDefault(),i[Math.max(0,a-1)]?.focus();break;case`Home`:e.preventDefault(),i[0]?.focus();break;case`End`:e.preventDefault(),i[i.length-1]?.focus();break;case`ArrowRight`:e.preventDefault(),c(Math.min(s-1,t+1));break;case`ArrowLeft`:e.preventDefault(),c(Math.max(0,t-1))}}pick(e,t){t.disabled||this.handleTimeChange(e.kind,e.toValue(t.value))}columns(e){let{t}=this.locale,n=this.use12Hours,r=Ne(this.minTime),i=Ne(this.maxTime),a=e.getHours(),o=e.getMinutes(),s=e.getSeconds(),c=a>=12,l=e=>n?e%12+(c?12:0):e,ee=Wa(n?12:24,this.hourStep,+!!n,e=>{let t=l(e);return!!(r&&t<r.getHours()||i&&t>i.getHours())}),te=Wa(60,this.minuteStep,0,e=>!!(r&&a===r.getHours()&&e<r.getMinutes()||i&&a===i.getHours()&&e>i.getMinutes())),ne=Wa(60,this.secondStep,0,e=>{let t=r&&a===r.getHours()&&o===r.getMinutes(),n=i&&a===i.getHours()&&o===i.getMinutes();return!!(t&&e<r.getSeconds()||n&&e>i.getSeconds())}),u=[{kind:`hour`,label:t(`timePicker.hours`),items:ee,selected:n?a%12||12:a,toValue:l},{kind:`minute`,label:t(`timePicker.minutes`),items:te,selected:o,toValue:e=>e}];return this.withSeconds&&u.push({kind:`second`,label:t(`timePicker.seconds`),items:ne,selected:s,toValue:e=>e}),n&&u.push({kind:`ampm`,label:t(`timePicker.period`),items:[{value:0,label:`AM`,disabled:!1},{value:1,label:`PM`,disabled:!1}],selected:+!!c,toValue:e=>e}),u}renderPanel(e,t){let n=e!==null,r=this.columns(e??ie());return y`<div
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
${r.map((e,t)=>{let r=e.items.find(e=>!e.disabled)?.value,i=e.items.some(t=>t.value===e.selected&&!t.disabled)?e.selected:r;return y`<div
part="column"
class="timeColumn"
role="listbox"
aria-label=${e.label}
tabindex="-1"
data-kind=${e.kind}
@keydown=${e=>this.handleColumnKeyDown(e,t)}
>
${e.items.map(t=>{let r=n&&t.value===e.selected;return y`<div
part=${gn(`item`,{selected:r,disabled:t.disabled})}
role="option"
aria-selected=${r?`true`:`false`}
aria-disabled=${t.disabled?`true`:f}
tabindex=${t.value===i?`0`:`-1`}
class=${b({timeUnit:!0,selected:r,disabled:t.disabled})}
@click=${()=>this.pick(e,t)}
@keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),this.pick(e,t))}}
>
${t.label}
</div>`})}
</div>`})}
</div>
</div>
</div>`}hookStates(){let e=this.open&&!this.isDisabled&&!this.readOnly,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?Le(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size,side:n,align:r,placement:t}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`timePicker.label`),a=this.draft??(r?Be(r,this.effectiveFormat):``),o=!this.hideClearButton&&!!r&&!t&&!n;return y`<div part="root" class="timePicker">
<div
part="control"
class=${b({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
.value=${tt(a)}
placeholder=${this.placeholder??e(`timePicker.placeholder`)}
?disabled=${t}
?readonly=${n}
?required=${this.required}
autocomplete="off"
aria-label=${i}
aria-description=${this.aria.description??f}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:f}
aria-readonly=${n?`true`:f}
@input=${this.handleInput}
@blur=${this.handleBlur}
@click=${this.handleInputClick}
@keydown=${this.handleInputKeyDown}
/>
<span class="addon end">
${o?y`<button
part="clear-button"
type="button"
class="iconButton neutral variant-ghost small circle clearButton"
aria-label=${e(`timePicker.clear`)}
@click=${this.handleClear}
>
${Kt}
</button>`:y`<span part="icon" class="clockIcon" aria-hidden="true"
>${Yn}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(r,i):f}`}},R([m({reflect:!0})],X.prototype,`name`,void 0),R([m({attribute:!1})],X.prototype,`value`,void 0),R([m({attribute:`value`})],X.prototype,`defaultValue`,void 0),R([m({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),R([m({reflect:!0})],X.prototype,`format`,void 0),R([m({type:Boolean,reflect:!0,attribute:`use-12-hours`})],X.prototype,`use12Hours`,void 0),R([m()],X.prototype,`placeholder`,void 0),R([m()],X.prototype,`label`,void 0),R([m({reflect:!0})],X.prototype,`size`,void 0),R([m({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),R([m({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),R([m({type:Boolean,reflect:!0,attribute:`hide-clear-button`})],X.prototype,`hideClearButton`,void 0),R([m({type:Boolean,reflect:!0,attribute:`hide-second`})],X.prototype,`hideSecond`,void 0),R([m({attribute:`min-time`})],X.prototype,`minTime`,void 0),R([m({attribute:`max-time`})],X.prototype,`maxTime`,void 0),R([m({type:Number,attribute:`hour-step`})],X.prototype,`hourStep`,void 0),R([m({type:Number,attribute:`minute-step`})],X.prototype,`minuteStep`,void 0),R([m({type:Number,attribute:`second-step`})],X.prototype,`secondStep`,void 0),R([x()],X.prototype,`draft`,void 0),R([S(`input`)],X.prototype,`input`,void 0),R([S(`.timePicker`)],X.prototype,`field`,void 0),R([S(`.popup`)],X.prototype,`popup`,void 0)})))()}function Ka(e){if(e===void 0)return;if(typeof e!=`string`)return e;if(!Xa())return;let t=document.getElementById(e)??void 0;return O&&!t&&F(`minerva-toast-region`,`toast(): no element with id "${e}"; the toast is shown in the default region.`),t}var qa,Ja,Ya,Xa,Za,Qa,$a,eo,to,no;function ro(){return(ro=e((()=>{N(),u(),qa=4e3,Ja=200,Ya=`minerva-toast-region`,Xa=()=>typeof window<`u`&&typeof document<`u`,Za=class{constructor(e={}){this.subscribe=e=>this.queue.subscribe(t=>e(t.toasts)),this.subscribeLifecycle=e=>this.queue.subscribeLifecycle(e),this.getSnapshot=()=>this.queue.getState().toasts,this.queue=Se({isClient:e.isClient??Xa,defaultDuration:qa,exitDuration:200})}push(e,t){return this.queue.add(e,{region:t})}update(e,t){this.queue.update(e,t)}dismiss(e,t=`dismiss`){this.queue.dismiss(e,t)}dismissAll(){this.queue.dismissAll()}pause(e){this.queue.pause(e)}resume(e){this.queue.resume(e)}peek(){return this.getSnapshot()}reset(){this.queue.reset()}},Qa=new Za,$a=`data-minerva-auto`,eo=new class{constructor(){this.regions=[],this.listeners=new Set,this.autoPending=!1,this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)})}changed(){for(let e of[...this.listeners])e()}ordered(){return this.regions.slice().sort((e,t)=>{let n=e.compareDocumentPosition(t);return n&Node.DOCUMENT_POSITION_DISCONNECTED?0:n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}get owner(){return this.ordered()[0]??null}register(e){if(!this.regions.includes(e)){if(this.regions.push(e),!e.hasAttribute(`data-minerva-auto`))for(let e of this.regions.filter(e=>e.hasAttribute($a)))e.remove();this.changed()}}unregister(e){let t=this.regions.indexOf(e);t<0||(this.regions.splice(t,1),this.changed())}regionOf(e){let t=e.region;return t&&this.regions.includes(t)?t:this.owner}ensureRegion(){this.autoPending||this.regions.length>0||!Xa()||(this.autoPending=!0,queueMicrotask(()=>{if(this.autoPending=!1,this.regions.length>0||!document.body||!Qa.getSnapshot().length)return;let e=document.createElement(`minerva-toast-region`);e.setAttribute(`data-minerva-auto`,``),document.body.append(e)}))}},to=(e,t)=>{let n=n=>{O&&!Xa()&&F(`minerva-toast-region`,`toast() called without a document (server side): the toast is ignored.`);let{region:r,...i}=n,a=Ka(r??t),o=e.push(i,a);return Xa()&&eo.ensureRegion(),o},r=(e=>n(e));return r.info=(e,t)=>n({...t,title:e,color:`info`}),r.success=(e,t)=>n({...t,title:e,color:`success`}),r.warning=(e,t)=>n({...t,title:e,color:`warning`}),r.danger=(e,t)=>n({...t,title:e,color:`danger`}),r.loading=(e,t)=>n({...t,title:e,loading:!0}),r.promise=(e,t,r)=>{let i=n({...r,title:t.loading,loading:!0,duration:0}),a=(e,t)=>n({...r,id:i,title:t,color:e,loading:!1});return e.then(e=>a(`success`,typeof t.success==`function`?t.success(e):t.success),e=>a(`danger`,typeof t.error==`function`?t.error(e):t.error)),e},r.update=(t,n)=>{let{region:r,...i}=n;e.update(t,i)},r.dismiss=t=>t===void 0?e.dismissAll():e.dismiss(t),r.region=t=>to(e,t),r},no=to(Qa)})))()}var io,ao,oo,so,co,lo,uo,fo,po;function mo(){return(mo=e((()=>{j(),N(),w(),$t(),L(),On(),A(),D(),Pr(),$n(),ro(),p(),_(),g(),et(),ge(),u(),$e(),io={info:kt,success:Qn,warning:Xn,danger:Nn},ao=[`top-right`,`top-left`,`top-center`,`bottom-right`,`bottom-left`,`bottom-center`],oo=[`F8`],so=`:scope > [part~="toast--open"]`,co=`:scope > [part~="close-button"]`,lo={fromAttribute:e=>e===null?oo:e.split(/[\s,+]+/).map(e=>e.trim()).filter(Boolean)},uo=0,fo=e=>{for(let t of eo.ordered())if(t instanceof po&&t.handleHotkey(e))return},po=class extends P{constructor(...e){super(...e),this.position=`top-right`,this.max=1/0,this.noPauseOnHover=!1,this.hotkey=oo,this.items=[],this.locale=new E(this),this.aria=new C(this),this.cleanups=[],this.returnFocus=null,this.refresh=()=>{if(!this.isConnected)return;let e=new Set,t=[],n=Qa.getSnapshot();for(let r=n.length-1;r>=0;--r){let i=n[r];e.has(i.id)||eo.regionOf(i)!==this||(e.add(i.id),t.unshift(i))}let r=Ue(t,this.max);if(r.length>0){for(let e of r)Qa.dismiss(e.id,`overflow`);return}let i=new Set(this.items.map(e=>e.id)),a=t.some(e=>!i.has(e.id));this.items=t,a&&this.raise()},this.raise=()=>{let e=this.viewport;e&&!d(e,We())&&(_t(e),ar(e))},this.onLifecycle=e=>{eo.regionOf(e.item)===this&&(e.type===`close`?this.emit(`minerva-close`,{id:e.item.id,reason:e.reason}):this.emit(`minerva-after-close`,{id:e.item.id}))},this.onViewportFocusIn=e=>{let t=e.relatedTarget,n=e.currentTarget;t&&!d(n,t)&&(this.returnFocus=t)},this.onViewportFocusOut=e=>{let t=e.currentTarget;d(t,e.relatedTarget)||t.removeAttribute(`tabindex`)}}static{this.tagName=Ya}static{this.styles=[M,xr,h`
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
`,I(Rn)]}get toast(){return this.boundApi??=to(Qa,this),this.boundApi}connectedCallback(){super.connectedCallback(),this.cleanups=[Qa.subscribe(()=>this.refresh()),eo.subscribe(()=>this.refresh()),Qa.subscribeLifecycle(this.onLifecycle)];let e=this.ownerDocument;e.addEventListener(`minerva-after-open`,this.raise),this.cleanups.push(()=>e.removeEventListener(`minerva-after-open`,this.raise)),uo++===0&&e.addEventListener(`keydown`,fo),this.cleanups.push(()=>{--uo===0&&e.removeEventListener(`keydown`,fo)}),eo.register(this),this.refresh(),this.hasUpdated&&ar(this.viewport)}disconnectedCallback(){super.disconnectedCallback();for(let e of this.cleanups)e();this.cleanups=[],eo.unregister(this),_t(this.viewport)}handleHotkey(e){let t=this.viewport;if(!t||!Fe(e,this.hotkey)||!t.querySelector(so))return!1;e.preventDefault();let n=We();return n&&n!==this.ownerDocument.body&&!d(t,n)&&(this.returnFocus=n),t.setAttribute(`tabindex`,`-1`),He(t),!0}focus(e){let t=this.viewport;t&&(t.setAttribute(`tabindex`,`-1`),t.focus(e))}willUpdate(e){O&&e.has(`position`)&&!ao.includes(this.position)&&F(`minerva-toast-region`,`invalid position "${this.position}" (expected ${ao.join(` | `)}).`)}firstUpdated(){ar(this.viewport)}updated(e){e.has(`max`)&&e.get(`max`)!==void 0&&queueMicrotask(()=>this.refresh())}moveFocusFrom(e){let t=this.viewport;if(!t)return;let n=Array.from(t.querySelectorAll(so)).filter(t=>t!==e),r=n.find(t=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??n[n.length-1];if(r){let e=r.querySelector(co)??De(r)[0];if(He(e))return}let i=this.returnFocus;i?.isConnected&&!d(t,i)&&He(i)||He(a(this))||(t.setAttribute(`tabindex`,`-1`),He(t,{preventScroll:!0}))}close(e,t,n){d(t,We())&&this.moveFocusFrom(t),Qa.dismiss(e.id,n)}pause(e){this.noPauseOnHover||Qa.pause(e.id)}resume(e){this.noPauseOnHover||Qa.resume(e.id)}renderIcon(e){if(e.icon===null)return f;let t=e.icon===void 0?e.loading?y`<div class="progressIndicator current" aria-hidden="true">
<span class="spinner small">${Vt}</span>
</div>`:io[e.color]:e.icon;return y`<span class="icon" part="icon" aria-hidden="true"
>${t}</span
>`}renderItem(e){let t=e.state===`closing`,n=e=>e.currentTarget.closest(`.toast`),r={state:t?`closed`:`open`,color:e.color,loading:e.loading};return y`<div
part=${gn(`toast`,r)}
class=${b({toast:!0,[e.color]:!0})}
data-state=${r.state}
role=${e.color===`danger`&&!e.loading?`alert`:`status`}
style=${v(e.duration>0?{"--toast-duration":`${e.duration}ms`}:{})}
@mouseenter=${()=>this.pause(e)}
@mouseleave=${()=>this.resume(e)}
@focusin=${()=>this.pause(e)}
@focusout=${t=>{d(n(t),t.relatedTarget)||this.resume(e)}}
@keydown=${r=>{r.key!==`Escape`||t||r.isComposing||(r.preventDefault(),r.stopPropagation(),this.close(e,n(r),`escape`))}}
>
${this.renderIcon(e)}
<div class="content">
${e.title?y`<div class="title" part="title">${e.title}</div>`:f}
${e.description?y`<div class="description" part="description">
${e.description}
</div>`:f}
</div>
${e.action?y`<button
type="button"
class="action"
part="action"
@click=${t=>{e.action?.onClick(),this.close(e,n(t),`action`)}}
>
${e.action.label}
</button>`:f}
${e.closable?y`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`toast.close`)}
@click=${t=>this.close(e,n(t),`close-button`)}
>
${Kt}
</button>`:f}
${e.duration>0&&!t?y`<span
class="progress"
part="progress"
aria-hidden="true"
></span>`:f}
</div>`}render(){let e=Oe(this.hotkey),t=this.aria.label??(e?this.locale.t(`toast.regionWithHotkey`,{hotkey:e}):this.locale.t(`toast.region`)),n=ao.includes(this.position)?this.position:`top-right`;return y`<div
part="root"
class=${b({viewport:!0,[n]:!0})}
popover="manual"
role="region"
aria-label=${t}
dir=${le(this)}
@focusin=${this.onViewportFocusIn}
@focusout=${this.onViewportFocusOut}
>
${Ze(this.items,e=>e.id,e=>this.renderItem(e))}
</div>`}},R([m({reflect:!0})],po.prototype,`position`,void 0),R([m({type:Number})],po.prototype,`max`,void 0),R([m({type:Boolean,attribute:`no-pause-on-hover`})],po.prototype,`noPauseOnHover`,void 0),R([m({attribute:`close-label`})],po.prototype,`closeLabel`,void 0),R([m({attribute:`hotkey`,converter:lo})],po.prototype,`hotkey`,void 0),R([x()],po.prototype,`items`,void 0),R([S(`.viewport`)],po.prototype,`viewport`,void 0)})))()}var ho,go,_o,vo,yo,bo,Z;function xo(){return(xo=e((()=>{j(),N(),$t(),A(),D(),Pr(),kn(),p(),_(),g(),ge(),ho=6,go=300,_o=200,vo=0,yo={fromAttribute(e){if(!e)return;let t=e.trim().split(/[\s,]+/).map(Number);return t.length===2&&t.every(Number.isFinite)?[t[0],t[1]]:void 0},toAttribute(e){return e?e.join(` `):null}},bo=class extends P{constructor(...e){super(...e),this.skipDelay=300,this.lastClosedAt=0}static{this.tagName=`minerva-tooltip-provider`}static{this.styles=[M,h`
:host{
display: contents;
}
`]}markClosed(){this.lastClosedAt=Date.now()}shouldSkipDelay(){return Date.now()-this.lastClosedAt<this.skipDelay}render(){return y`<slot></slot>`}},R([m({type:Number,attribute:`enter-delay`})],bo.prototype,`enterDelay`,void 0),R([m({type:Number,attribute:`leave-delay`})],bo.prototype,`leaveDelay`,void 0),R([m({type:Number,attribute:`skip-delay`})],bo.prototype,`skipDelay`,void 0),Z=class e extends P{constructor(...e){super(...e),this.content=``,this.open=!1,this.placement=`top`,this.color=`neutral`,this.variant=`solid`,this.shape=`default`,this.animation=`fade`,this.arrow=!1,this.disabled=!1,this.followCursor=!1,this.positioned=!1,this.aria=new C(this),this.grace=Ye({timeout:0}),this.cursor=null,this.described=null,this.describedPrev=null,this.floating=new Er(this,()=>{let e=this.placement,t=e.startsWith(`top`)||e.startsWith(`bottom`),n=this.arrow?ho:0,r=this.offset;return{placement:e,offset:r?{mainAxis:(t?r[1]:r[0])+n,crossAxis:t?r[0]:r[1]}:{mainAxis:8+n},arrowElement:this.arrow?this.arrowEl:null,autoUpdate:this.followCursor?{animationFrame:!0}:void 0,anchor:()=>this.anchor(),floating:()=>this.panel,branches:()=>[this.wrapper],dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,focusable:!1,onDismiss:()=>{this.clearTimers(),this.requestOpen(!1)},onPosition:e=>this.handlePosition(e)}}),this.handleMouseEnter=e=>{if(this.disabled)return;this.followCursor&&(this.cursor={x:e.clientX,y:e.clientY}),this.clearTimers();let t=this.resolvedEnterDelay;if(t<=0||this.provider()?.shouldSkipDelay()){this.requestOpen(!0);return}this.enterTimer=setTimeout(()=>this.requestOpen(!0),t)},this.handleMouseLeave=e=>{if(this.disabled)return;this.clearTimers();let t=this.panel?.getBoundingClientRect();if(this.open&&!this.followCursor&&t&&t.width>0&&t.height>0){this.grace.start({x:e.clientX,y:e.clientY},t,Le(this.currentPlacement).side),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),Math.max(this.resolvedLeaveDelay,go));return}this.scheduleHide()},this.handlePanelMouseEnter=()=>{this.disabled||this.clearTimers()},this.handlePanelMouseLeave=()=>{this.disabled||this.followCursor||this.scheduleHide()},this.handleDocumentPointerMove=e=>{if(!this.grace.getArea())return;let t=e.composedPath();this.wrapper&&t.includes(this.wrapper)||this.panel&&t.includes(this.panel)||this.grace.isInGraceArea({x:e.clientX,y:e.clientY})||(this.grace.clear(),this.scheduleHide())},this.handleDocumentMouseMove=e=>{this.cursor={x:e.clientX,y:e.clientY}},this.handleFocusIn=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!0))},this.handleFocusOut=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!1))},this.listening=!1,this.handleSlotChange=()=>this.requestUpdate()}static{this.tagName=`minerva-tooltip`}static{this.styles=[M,xr,h`
:host{
display: inline-flex;
}
`,I(Mn)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}get currentPlacement(){return this.positioned?this.floating.position.placement:this.placement}get visible(){return this.open&&!this.disabled}provider(){let e=bt(this,`minerva-tooltip-provider`);return e instanceof bo?e:null}get resolvedEnterDelay(){return this.enterDelay??this.provider()?.enterDelay??_o}get resolvedLeaveDelay(){return this.leaveDelay??this.provider()?.leaveDelay??vo}triggerElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}get text(){return this.aria.label||(this.content.trim()?this.content.trim():Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`content`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `))}anchor(){return this.followCursor&&this.cursor?{getBoundingClientRect:()=>{let{x:e,y:t}=this.cursor??{x:0,y:0};return DOMRect.fromRect({x:e,y:t,width:0,height:0})}}:this.wrapper}requestOpen(e){e!==this.open&&(e||this.provider()?.markClosed(),this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.grace.clear()}scheduleHide(){clearTimeout(this.leaveTimer),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),this.resolvedLeaveDelay)}handlePosition(e){let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`),this.positioned||=!0}inPanel(e){return!!this.panel&&e.composedPath().includes(this.panel)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`focusout`,this.handleFocusOut),this.listenDocument(!1),clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.restoreDescription()}listenDocument(e){e!==this.listening&&(this.listening=e,e?(document.addEventListener(`pointermove`,this.handleDocumentPointerMove),document.addEventListener(`mousemove`,this.handleDocumentMouseMove)):(document.removeEventListener(`pointermove`,this.handleDocumentPointerMove),document.removeEventListener(`mousemove`,this.handleDocumentMouseMove)))}firstUpdated(){O&&setTimeout(()=>this.checkUsage())}checkUsage(){if(!this.isConnected)return;this.text||F(e.tagName,`has no content: set the "content" attribute, aria-label or slot="content".`);let t=this.triggerElement();!this.disabled&&t&&De(t,{includeContainer:!0}).length===0&&F(e.tagName,`the trigger is not focusable, so keyboard users cannot reach the tooltip; wrap a button / link or add tabindex="0".`)}willUpdate(e){(e.has(`open`)||e.has(`disabled`))&&(!this.open||this.disabled)&&(this.positioned=!1,this.grace.clear())}updated(){let e=this.visible;this.floating.sync(e),this.listenDocument(e),this.syncDescription(e)}syncDescription(e){let t=e?this.text:``,n=t?this.triggerElement():null;if(this.described&&this.described!==n&&this.restoreDescription(),!n)return;this.described!==n&&(this.described=n,this.describedPrev=n.getAttribute(`aria-description`));let r=this.describedPrev?`${this.describedPrev} ${t}`:t;n.getAttribute(`aria-description`)!==r&&n.setAttribute(`aria-description`,r)}restoreDescription(){let e=this.described;e&&(this.describedPrev===null?e.removeAttribute(`aria-description`):e.setAttribute(`aria-description`,this.describedPrev),this.described=null,this.describedPrev=null)}hookStates(){let e=this.currentPlacement;return{state:this.visible?`open`:`closed`,disabled:this.disabled,color:this.color,variant:this.variant,shape:this.shape,...Le(e),placement:e}}render(){let e=this.visible,t=this.currentPlacement,n=e&&!this.triggerElement();return y`<div
class="tooltipTrigger"
part="trigger"
aria-describedby=${n?`tooltip`:f}
@mouseenter=${this.handleMouseEnter}
@mouseleave=${this.handleMouseLeave}
>
<slot @slotchange=${this.handleSlotChange}></slot>
</div>
${e?y`<div
id="tooltip"
part="content"
popover="manual"
role="tooltip"
dir=${le(this)}
aria-label=${this.aria.label??f}
data-placement=${t}
class=${b({tooltip:!0,[this.color]:!0,[this.variant]:!0,[this.shape]:!0,[`animation-${this.animation}`]:!0,followCursor:this.followCursor,arrow:this.arrow,show:this.positioned})}
@mouseenter=${this.handlePanelMouseEnter}
@mouseleave=${this.handlePanelMouseLeave}
>
<slot name="content" @slotchange=${this.handleSlotChange}
>${this.content}</slot
>${this.arrow?y`<div class="tooltipArrow" part="arrow"></div>`:f}
</div>`:f}`}},R([m()],Z.prototype,`content`,void 0),R([m({type:Boolean,reflect:!0})],Z.prototype,`open`,void 0),R([m({reflect:!0})],Z.prototype,`placement`,void 0),R([m({reflect:!0})],Z.prototype,`color`,void 0),R([m({reflect:!0})],Z.prototype,`variant`,void 0),R([m({reflect:!0})],Z.prototype,`shape`,void 0),R([m({reflect:!0})],Z.prototype,`animation`,void 0),R([m({type:Boolean,reflect:!0})],Z.prototype,`arrow`,void 0),R([m({type:Boolean,reflect:!0})],Z.prototype,`disabled`,void 0),R([m({type:Number,attribute:`enter-delay`})],Z.prototype,`enterDelay`,void 0),R([m({type:Number,attribute:`leave-delay`})],Z.prototype,`leaveDelay`,void 0),R([m({converter:yo})],Z.prototype,`offset`,void 0),R([m({type:Boolean,reflect:!0,attribute:`follow-cursor`})],Z.prototype,`followCursor`,void 0),R([S(`.tooltipTrigger`)],Z.prototype,`wrapper`,void 0),R([S(`[part=content]`)],Z.prototype,`panel`,void 0),R([S(`.tooltipArrow`)],Z.prototype,`arrowEl`,void 0),R([x()],Z.prototype,`positioned`,void 0)})))()}var So,Q;function Co(){return(Co=e((()=>{j(),N(),w(),L(),On(),A(),D(),jn(),Tn(),mr(),xn(),p(),_(),g(),u(),$e(),So=0,Q=class e extends k{constructor(...e){super(...e),this.label=``,this.items=[],this.accept=`*`,this.multiple=!1,this.replace=!1,this.loading=!1,this.removable=!1,this.retryable=!1,this.error=``,this.dragging=!1,this.uploadId=`upload-${So++}`,this.nextId=0,this.pendingRemoval=null,this.locale=new E(this),this.aria=new C(this,()=>this.labels)}static{this.tagName=`minerva-upload`}static{this.dependencies=[gr]}static{this.styles=[M,h`
:host{
display: block;
min-width: 0;
}
`,I(Vn),I(Zn),h`

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
`]}get files(){return this.items.flatMap(e=>e.file?[e.file]:[])}get resolvedMaxCount(){return this.maxCount??(this.multiple?50:1)}get existingCount(){return this.replace&&!this.multiple?0:this.items.length}get blocked(){return this.isDisabled||this.loading||this.existingCount>=this.resolvedMaxCount}focus(e){this.renderRoot.querySelector(`[part=select-button]`)?.focus(e)}showPicker(){this.blocked||this.input?.click()}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.files)e.append(this.name,t);return e}getValidity(){return this.required&&this.files.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.fileMissing`),anchor:this.renderRoot.querySelector(`[part=select-button]`)??null}:{flags:{},message:``}}resetFormValue(){this.items=[],this.error=``}restoreFormState(e){e instanceof FormData&&(this.items=e.getAll(this.name).filter(e=>e instanceof File).map(e=>this.toItem(e)))}willUpdate(t){O&&(t.has(`maxCount`)||t.has(`multiple`))&&!this.multiple&&this.maxCount!==void 0&&this.maxCount>1&&F(e.tagName,`max-count (${this.maxCount}) has no effect without multiple: one file is picked at a time.`)}updated(e){super.updated(e);let t=this.pendingRemoval;if(!t||this.items.some(e=>e.id===t.id))return;this.pendingRemoval=null;let n=t.nextId?Array.from(this.renderRoot.querySelectorAll(`[data-item-id]`)).find(e=>e.dataset.itemId===t.nextId)?.querySelector(`[part=remove-button]`):null;n?n.focus():this.focus()}toItem(e){return{id:`${this.uploadId}-${this.nextId++}`,name:e.name,status:`done`,file:e}}select(e){if(this.blocked||e.length===0)return;let{t}=this.locale,n=this.texts,r=this.resolvedMaxCount;if(!this.multiple&&e.length>1||e.length+this.existingCount>r){this.error=n?.tooMany?.(r)??t(`upload.tooMany`,{count:r});return}let i=e.find(e=>!ne(e,this.accept));if(i){this.error=n?.invalidType?.(i.name)??t(`upload.invalidType`,{name:i.name});return}let a=this.maxSize,o=a===void 0?void 0:e.find(e=>e.size>a);if(o){this.error=n?.tooLarge?.(o.name)??t(`upload.tooLarge`,{name:o.name});return}if(this.error=``,!this.emit(`minerva-files-selected`,{files:e},{cancelable:!0}))return;let s=e.map(e=>this.toItem(e));this.items=this.replace&&!this.multiple?s:[...this.items,...s],this.notifyChange()}notifyChange(){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.items})}removeItem(e){if(this.isDisabled)return;let t=this.items.indexOf(e),n=this.items[t+1]??this.items[t-1];this.pendingRemoval={id:e.id,nextId:n?.id},this.emit(`minerva-remove`,{item:e},{cancelable:!0})&&(this.items=this.items.filter(t=>t!==e),this.notifyChange())}retry(e){this.isDisabled||this.loading||this.emit(`minerva-retry`,{item:e})}handleInputChange(){let e=Array.from(this.input.files??[]);this.input.value=``,this.select(e)}handleDragOver(e){e.preventDefault(),this.blocked||(this.dragging=!0)}handleDragLeave(e){e.currentTarget.contains(e.relatedTarget)||(this.dragging=!1)}handleDrop(e){e.preventDefault(),this.dragging=!1,this.select(Array.from(e.dataTransfer?.files??[]))}statusText(e){let{t}=this.locale,n=this.texts;return e.status===`uploading`?n?.uploading??t(`upload.uploading`):e.status===`error`?e.error||(n?.failed??t(`upload.failed`)):n?.done??t(`upload.done`)}hookStates(){return{disabled:this.isDisabled,loading:this.loading,dragging:this.dragging&&!this.blocked}}render(){let{t:e}=this.locale,t=this.texts,n=this.blocked,r=this.isDisabled,i=this.label||this.aria.label;return y`<div
part="root"
class="upload"
role="group"
aria-labelledby=${this.label?`label`:f}
aria-label=${!this.label&&i?i:f}
aria-description=${this.aria.description??f}
aria-busy=${this.loading?`true`:`false`}
>
<span id="label" part="label" class="label">${this.label}</span>
<div
part="dropzone"
class=${b({dropzone:!0,dragging:this.dragging&&!n})}
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
<span slot="start">${Cn}</span>
${t?.select??e(`upload.select`)}
</minerva-button>
<input
type="file"
hidden
tabindex="-1"
aria-label=${i||f}
?disabled=${n}
accept=${this.accept}
?multiple=${this.multiple}
@change=${this.handleInputChange}
/>
</div>
${this.error?y`<div part="error" class="error" role="alert">
${this.error}
</div>`:f}
${this.items.length>0?y`<ul part="list" class="list">
${Ze(this.items,e=>e.id,n=>y`<li
part=${gn(`item`,{status:n.status})}
class="item"
data-item-id=${n.id}
>
${n.previewUrl?y`<img
src=${n.previewUrl}
alt=""
class="preview"
/>`:f}
<div class="info">
<span>${n.name}</span>
<span
role=${n.status===`error`?`alert`:`status`}
class=${b({status:!0,statusError:n.status===`error`})}
>${this.statusText(n)}</span
>
</div>
<div class="actions">
${n.status===`error`&&this.retryable?y`<button
part="retry-button"
type="button"
class=${b({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r||this.loading})}
aria-label=${t?.retry?.(n.name)??e(`upload.retry`,{name:n.name})}
?disabled=${r||this.loading}
@click=${()=>this.retry(n)}
>
${dr}
</button>`:f}
${this.removable?y`<button
part="remove-button"
type="button"
class=${b({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r})}
aria-label=${t?.remove?.(n.name)??e(`upload.remove`,{name:n.name})}
?disabled=${r}
@click=${()=>this.removeItem(n)}
>
${Kt}
</button>`:f}
</div>
</li>`)}
</ul>`:f}
</div>`}},R([m()],Q.prototype,`label`,void 0),R([m({attribute:!1})],Q.prototype,`items`,void 0),R([m()],Q.prototype,`accept`,void 0),R([m({type:Boolean,reflect:!0})],Q.prototype,`multiple`,void 0),R([m({type:Boolean})],Q.prototype,`replace`,void 0),R([m({type:Number,attribute:`max-count`})],Q.prototype,`maxCount`,void 0),R([m({type:Number,attribute:`max-size`})],Q.prototype,`maxSize`,void 0),R([m({type:Boolean,reflect:!0})],Q.prototype,`loading`,void 0),R([m({type:Boolean})],Q.prototype,`removable`,void 0),R([m({type:Boolean})],Q.prototype,`retryable`,void 0),R([m({attribute:!1})],Q.prototype,`texts`,void 0),R([x()],Q.prototype,`error`,void 0),R([x()],Q.prototype,`dragging`,void 0),R([S(`input[type=file]`)],Q.prototype,`input`,void 0)})))()}var $;function wo(){return(wo=e((()=>{j(),N(),w(),L(),A(),D(),Wn(),Un(),p(),_(),g(),et(),u(),$e(),$=class e extends P{constructor(...e){super(...e),this.items=[],this.itemPadding=8,this.overscan=5,this.loadMoreThreshold=100,this.highPerformance=!1,this.loading=!1,this.clickable=!1,this.scrollOffset=0,this.containerHeight=0,this.measuredHeight=0,this.focusedId=null,this.aria=new C(this),this.locale=new E(this),this.resizeObserver=null,this.measureObserver=null,this.lastScrollTop=0,this.loadingMore=!1}static{this.tagName=`minerva-virtual-list`}static{this.styles=[M,h`
:host{
display: block;
}
.wave{
display: inline-flex;
}
`,I(yn),I(_n)]}get scrollContainer(){return this.container??null}scrollToIndex(e){let t=this.container,n=this.rowHeight;t&&n&&(t.scrollTop=Math.max(0,e)*n,this.updateScroll(t.scrollTop))}get rowHeight(){return this.itemHeight?this.itemHeight:this.measuredHeight>0?this.measuredHeight+this.itemPadding*2:0}get needsMeasure(){return!this.itemHeight&&this.measuredHeight===0&&this.items.length>0}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.measureObserver?.disconnect(),this.measureObserver=null,this.cancelScheduled()}firstUpdated(){this.observeContainer()}reconnectedCallback(){super.reconnectedCallback(),this.observeContainer()}observeContainer(){let e=this.container;e&&(this.containerHeight=e.clientHeight,!(this.resizeObserver||typeof ResizeObserver>`u`)&&(this.resizeObserver=new ResizeObserver(e=>{for(let t of e)this.containerHeight=t.contentRect.height}),this.resizeObserver.observe(e)))}willUpdate(e){(e.has(`items`)||e.has(`loading`))&&(this.loadingMore=!1),this.focusedId!==null&&e.has(`items`)&&!this.items.some(e=>e.id===this.focusedId)&&(this.focusedId=null)}updated(){this.syncMeasure(),O&&this.items.length>0&&!this.renderItem&&F(e.tagName,`set the renderItem property (a function returning the content of a row); rows show the item id meanwhile.`),O&&this.maxHeight===void 0&&F(e.tagName,`set max-height (pixels): without a bounded height the list cannot scroll, so every row is rendered.`)}syncMeasure(){let e=this.needsMeasure?this.measureElement:void 0;if(!e){this.measureObserver?.disconnect(),this.measureObserver=null;return}let t=()=>{let t=e.offsetHeight;t>0&&(this.measuredHeight=t)};t(),!(this.measureObserver||typeof ResizeObserver>`u`)&&(this.measureObserver=new ResizeObserver(t),this.measureObserver.observe(e))}cancelScheduled(){this.raf!==void 0&&(cancelAnimationFrame(this.raf),this.raf=void 0),this.idle!==void 0&&(typeof cancelIdleCallback==`function`&&cancelIdleCallback(this.idle),this.idle=void 0)}schedule(e){if(!this.highPerformance){e();return}this.cancelScheduled(),this.raf=requestAnimationFrame(()=>{this.raf=void 0,typeof requestIdleCallback==`function`?this.idle=requestIdleCallback(()=>{this.idle=void 0,e()},{timeout:100}):e()})}updateScroll(e){this.scrollOffset=e}handleScroll(e){let{scrollTop:t,scrollHeight:n,clientHeight:r}=e.currentTarget,i=t>this.lastScrollTop;this.lastScrollTop=t,this.schedule(()=>{this.updateScroll(t),i&&!this.loadingMore&&!this.loading&&n-t-r<this.loadMoreThreshold&&n>r&&(this.loadingMore=!0,this.emit(`minerva-load-more`))})}visibleWindow(){let e=this.rowHeight;if(!e)return[];let{start:t,end:n}=re({scrollTop:this.scrollOffset,viewportHeight:this.containerHeight,itemHeight:e,itemCount:this.items.length,overscan:this.overscan}),r=[];for(let i=t;i<n;i++)r.push({index:i,start:i*e});if(this.focusedId!==null){let i=this.items.findIndex(e=>e.id===this.focusedId);if(i>=0&&(i<t||i>=n)){let n={index:i,start:i*e};i<t?r.unshift(n):r.push(n)}}return r}renderContent(e,t){return this.renderItem?this.renderItem(e,t):String(e.id)}activate(e,t){this.emit(`minerva-item-click`,{item:e,index:t})}handleRowKeyDown(e,t,n){e.composedPath()[0]===e.currentTarget&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.activate(t,n))}handleRowFocusOut(e){let t=e.currentTarget,n=e.relatedTarget;(!n||!t.contains(n))&&(this.focusedId=null)}hookStates(){return{loading:this.loading}}render(){let e=this.rowHeight,t=this.aria.label??f,n=this.visibleWindow(),r=this.items.length;return y`<div
class="virtualList"
part="root"
role="region"
tabindex="0"
aria-label=${t}
aria-busy=${this.loading?`true`:f}
style=${v({maxHeight:this.maxHeight===void 0?void 0:`${this.maxHeight}px`,overflow:`auto`,position:`relative`})}
@scroll=${this.handleScroll}
>
${this.needsMeasure?y`<div class="measureItem" aria-hidden="true">
${this.renderContent(this.items[0],0)}
</div>`:f}
<div
class="virtualListContent"
part="list"
role="list"
aria-label=${t}
style=${v({height:e?`${r*e}px`:`auto`,position:`relative`,willChange:`transform`})}
>
${Ze(n,e=>this.items[e.index].id,t=>{let n=this.items[t.index];return y`<div
part="item"
role="listitem"
class=${b({virtualListItem:!0,clickable:this.clickable})}
style=${v({position:`absolute`,top:`0`,transform:`translateY(${t.start}px)`,width:`100%`,height:`${e}px`,willChange:`transform`,padding:`${this.itemPadding}px`})}
tabindex=${this.clickable?`0`:f}
aria-setsize=${r}
aria-posinset=${t.index+1}
@click=${this.clickable?()=>this.activate(n,t.index):f}
@keydown=${this.clickable?e=>this.handleRowKeyDown(e,n,t.index):f}
@focusin=${()=>this.focusedId=n.id}
@focusout=${this.handleRowFocusOut}
>
${this.renderContent(n,t.index)}
</div>`})}
</div>
${this.loading?y`<div class="loadingWrapper" part="loading">
<div
class="progressIndicator primary"
role="progressbar"
aria-label=${this.locale.t(`common.loading`)}
>
<div class="waveContainer small">
<span class="wave" aria-hidden="true">${vn}</span>
</div>
</div>
</div>`:f}
</div>`}},R([m({attribute:!1})],$.prototype,`items`,void 0),R([m({attribute:!1})],$.prototype,`renderItem`,void 0),R([m({type:Number,attribute:`item-height`})],$.prototype,`itemHeight`,void 0),R([m({type:Number,attribute:`item-padding`})],$.prototype,`itemPadding`,void 0),R([m({type:Number})],$.prototype,`overscan`,void 0),R([m({type:Number,attribute:`max-height`})],$.prototype,`maxHeight`,void 0),R([m({type:Number,attribute:`load-more-threshold`})],$.prototype,`loadMoreThreshold`,void 0),R([m({type:Boolean,attribute:`high-performance`})],$.prototype,`highPerformance`,void 0),R([m({type:Boolean,reflect:!0})],$.prototype,`loading`,void 0),R([m({type:Boolean,reflect:!0})],$.prototype,`clickable`,void 0),R([x()],$.prototype,`scrollOffset`,void 0),R([x()],$.prototype,`containerHeight`,void 0),R([x()],$.prototype,`measuredHeight`,void 0),R([x()],$.prototype,`focusedId`,void 0),R([S(`.virtualList`)],$.prototype,`container`,void 0),R([S(`.measureItem`)],$.prototype,`measureElement`,void 0)})))()}var To,Eo,Do,Oo,ko,Ao;function jo(){return(jo=e((()=>{hr(),_(),ct(),st(),ot(),at(),To=class extends fr{engineOptions(){return{...this.options}}engineMounted(e){this.book&&e.setBook(this.book)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`book`)&&this.book&&e.setBook(this.book)}setBook(e){this.instance?.setBook(e)}applyDeltas(e){this.instance?.applyDeltas(e)}},R([m({attribute:!1})],To.prototype,`book`,void 0),Eo=class{reset(){this.previous=void 0}apply(e,t,n){let r=this.previous;if(this.previous=e,!e||e===r)return;let i=r?.length??0;if(r&&i>0&&e.length>=i&&e[0]===r[0]&&e[i-1]===r[i-1]){e.length>i&&t(e.slice(i));return}n(e)}},Do=class extends To{static{this.tagName=`minerva-depth-chart`}createEngine(e,t){return rt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`range`,e=>this.emit(`minerva-range-change`,{range:e}))]}setRange(e){this.instance?.setRange(e)}},R([m({attribute:!1})],Do.prototype,`options`,void 0),Oo=class extends To{static{this.tagName=`minerva-order-book`}get defaultHeight(){return 420}createEngine(e,t){return it(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`levelClick`,e=>this.emit(`minerva-level-click`,e))]}engineMounted(e){super.engineMounted(e),this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}syncEngine(e,t){super.syncEngine(e,t),t.has(`lastPrice`)&&this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}setLastPrice(e){this.instance?.setLastPrice(e)}},R([m({type:Number,attribute:`last-price`})],Oo.prototype,`lastPrice`,void 0),R([m({attribute:!1})],Oo.prototype,`options`,void 0),ko=class extends To{constructor(...e){super(...e),this.feed=new Eo}static{this.tagName=`minerva-order-book-heatmap`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),nt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e})),e.on(`follow`,e=>this.emit(`minerva-follow-change`,{follow:e}))]}feedTrades(e){let t=t=>e.addTrades(t);this.feed.apply(this.trades,t,t)}engineMounted(e){super.engineMounted(e),this.feedTrades(e)}syncEngine(e,t){super.syncEngine(e,t),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}resetView(){this.instance?.resetView()}getRenderer(){return this.instance?.getRenderer()??null}},R([m({attribute:!1})],ko.prototype,`trades`,void 0),R([m({attribute:!1})],ko.prototype,`options`,void 0),Ao=class extends fr{constructor(...e){super(...e),this.feed=new Eo}static{this.tagName=`minerva-time-and-sales`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),lt(e,t)}engineOptions(){return{...this.options}}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`tradeClick`,e=>this.emit(`minerva-trade-click`,e)),e.on(`pause`,e=>this.emit(`minerva-pause`,{paused:e}))]}feedTrades(e){this.feed.apply(this.trades,t=>e.addTrades(t),t=>e.setTrades(t))}engineMounted(e){this.feedTrades(e)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}setTrades(e){this.instance?.setTrades(e)}clear(){this.instance?.clear()}scrollToLatest(){this.instance?.scrollToLatest()}},R([m({attribute:!1})],Ao.prototype,`trades`,void 0),R([m({attribute:!1})],Ao.prototype,`options`,void 0)})))()}var Mo,No;function Po(){return(Po=e((()=>{hr(),_(),dt(),Mo={fromAttribute:e=>e===null?void 0:/^\d+$/.test(e)?Number(e):e},No=class extends fr{constructor(...e){super(...e),this.height=480,this.chartStyle=`candles`}static{this.tagName=`minerva-trading-chart`}createEngine(e,t){return ut(e,t)}engineOptions(){return{...this.options,bars:this.bars??this.options?.bars,symbol:this.symbol??this.options?.symbol,timeframe:this.timeframe??this.options?.timeframe,chartStyle:this.chartStyle,indicators:this.indicators??this.options?.indicators}}bindEngine(e){return[e.on(`crosshairMove`,e=>this.emit(`minerva-crosshair-move`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`visibleRangeChange`,e=>this.emit(`minerva-visible-range-change`,e)),e.on(`orderMove`,e=>this.emit(`minerva-order-move`,e)),e.on(`drawingsChange`,e=>this.emit(`minerva-drawings-change`,{drawings:e})),e.on(`drawingSelect`,e=>this.emit(`minerva-drawing-select`,{id:e})),e.on(`drawingToolChange`,e=>this.emit(`minerva-drawing-tool-change`,{tool:e})),e.on(`indicatorToggle`,e=>this.emit(`minerva-indicator-toggle`,e)),e.on(`historyRequest`,e=>this.emit(`minerva-history-request`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}updateBar(e){this.instance?.update(e)}appendBars(e){this.instance?.appendBars(e)}prependBars(e){this.instance?.prependBars(e)}setBars(e){this.instance?.setBars(e)}getBarCount(){return this.instance?.getBarCount()??0}getBar(e){return this.instance?.getBar(e)??null}scrollToRealtime(e){this.instance?.scrollToRealtime(e)}fitContent(){this.instance?.fitContent()}getVisibleRange(){return this.instance?.getVisibleRange()??null}setVisibleRange(e){this.instance?.setVisibleRange(e)}resetPriceScales(){this.instance?.resetPriceScales()}setDrawingTool(e){this.instance?.setDrawingTool(e)}getDrawings(){return this.instance?.getDrawings()??[]}removeDrawing(e){this.instance?.removeDrawing(e)}selectDrawing(e){this.instance?.selectDrawing(e)}setIndicatorVisible(e,t){this.instance?.setIndicatorVisible(e,t)}getRenderer(){return this.instance?.getRenderer()??null}},R([m()],No.prototype,`height`,void 0),R([m({attribute:!1})],No.prototype,`bars`,void 0),R([m()],No.prototype,`symbol`,void 0),R([m({converter:Mo})],No.prototype,`timeframe`,void 0),R([m({attribute:`chart-style`})],No.prototype,`chartStyle`,void 0),R([m({attribute:!1})],No.prototype,`indicators`,void 0),R([m({attribute:!1})],No.prototype,`options`,void 0)})))()}export{$i as $,Ha as A,H as At,ya as B,Ur as Bt,no as C,ai as Ct,X as D,li as Dt,eo as E,oi as Et,Y as F,Kr as Ft,fa as G,zr as Gt,Sa as H,Br as Ht,Ma as I,qr as It,ca as J,pa as K,Ir as Kt,wa as L,Gr as Lt,Ua as M,ti as Mt,Na as N,V as Nt,Ga as O,si as Ot,Pa as P,Zr as Pt,na as Q,J as R,Wr as Rt,$a as S,U as St,Za as T,ui as Tt,q as U,Lr as Ut,xa as V,Vr as Vt,ga as W,Hr as Wt,ua as X,da as Y,ta as Z,Ya as _,mi as _t,jo as a,Bi as at,Ja as b,fi as bt,wo as c,zi as ct,Co as d,Ni as dt,K as et,bo as f,Oi as ft,mo as g,Ti as gt,po as h,Ei as ht,Ao as i,Li as it,Va as j,ni as jt,Fa as k,ii as kt,$ as l,Pi as lt,xo as m,ki as mt,Po as n,qi as nt,Do as o,Vi as ot,Z as p,G as pt,la as q,z as qt,ko as r,Ji as rt,Oo as s,Ri as st,No as t,Qi as tt,Q as u,Fi as ut,Qa as v,_i as vt,qa as w,ci as wt,ro as x,pi as xt,to as y,W as yt,ba as z,B as zt};