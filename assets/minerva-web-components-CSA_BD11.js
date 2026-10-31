import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{$n as t,Bn as n,Bt as r,Cn as i,Ct as a,Dn as o,En as s,Fn as c,Hn as l,Ht as ee,In as te,It as ne,Jn as re,Jt as ie,Kn as ae,Kt as oe,Ln as se,Mn as u,Nn as ce,Nt as le,On as ue,Ot as de,Pn as fe,Pt as pe,Q as me,Qn as he,Qt as ge,Rn as _e,Rt as ve,Sn as ye,Wn as be,Yn as xe,Z as Se,Zn as Ce,_n as we,_t as Te,an as Ee,bn as De,cn as Oe,dt as ke,en as Ae,et as je,ht as Me,jn as Ne,nr as Pe,pn as Fe,qn as Ie,qt as Le,rn as Re,rt as ze,sn as Be,sr as Ve,tt as He,ut as Ue,vn as We,wn as Ge,wt as Ke,xn as qe,xt as Je,yn as Ye,yt as Xe,zt as Ze}from"./angular-preview-CSWPEDZG.js";import{A as d,C as f,D as p,N as m,P as h,_ as Qe,b as g,c as $e,g as et,k as _,m as tt,s as nt,w as v,x as y,y as b,z as x}from"./minerva-web-components-DlAztivh.js";import{a as rt,c as it,d as at,f as ot,l as st,o as ct,s as lt,u as ut}from"./angular-preview-DXuT9H-w.js";import{a as dt,r as ft}from"./angular-preview-CPOhk_AS.js";import{$ as pt,$n as mt,A as ht,Ar as S,B as gt,C as _t,Cr as vt,D as yt,E as bt,Er as xt,F as St,Fr as Ct,Ft as wt,G as Tt,Gn as C,H as Et,Hn as Dt,Ht as Ot,I as kt,In as At,It as jt,J as Mt,K as Nt,L as Pt,Lt as Ft,M as It,Mr as Lt,N as Rt,Nn as zt,Nr as Bt,O as Vt,On as Ht,Or as Ut,P as Wt,Pn as Gt,Pr as w,Q as Kt,Qn as qt,R as Jt,Rt as Yt,S as Xt,Sr as T,St as Zt,T as Qt,Tn as $t,Tr as en,U as tn,Un as nn,V as rn,Vn as an,Vt as on,W as sn,Wn as cn,X as ln,Xn as un,Xt as dn,Y as fn,Yt as pn,Z as mn,Zn as hn,_ as gn,_r as _n,a as vn,ar as yn,at as bn,b as xn,bn as E,c as Sn,cr as D,dn as O,dr as Cn,er as wn,et as Tn,fn as En,fr as Dn,g as On,gr as kn,gt as An,h as jn,hn as Mn,hr as k,ht as Nn,ir as Pn,j as Fn,jn as In,jr as Ln,k as Rn,kr as A,l as zn,ln as Bn,m as Vn,mn as Hn,mr as j,mt as Un,o as Wn,or as M,ot as Gn,p as Kn,pn as qn,pr as N,pt as Jn,q as Yn,qn as Xn,rr as Zn,s as Qn,sr as P,tr as $n,u as er,un as tr,v as nr,vr as rr,w as ir,wn as ar,wr as or,x as sr,xn as F,xr as I,xt as cr,y as lr,yr as ur,z as dr,zn as fr}from"./minerva-web-components-Dlp910jJ.js";import{t as L}from"./minerva-web-components-D61_qRVd.js";import{Mn as pr,Nn as mr,On as hr,it as gr,kn as _r,rt as vr}from"./minerva-web-components-CyHo1dxl.js";import{_ as yr,a as br,c as xr,d as Sr,f as Cr,g as wr,h as Tr,i as Er,l as Dr,m as Or,n as kr,o as Ar,p as jr,r as Mr,s as Nr,t as Pr,u as Fr}from"./minerva-web-components-CDFSKyXU.js";var Ir,R;function Lr(){return(Lr=e((()=>{A(),M(),C(),en(),I(),kn(),k(),E(),jt(),Ar(),d(),f(),g(),u(),nt(),Ir={fromAttribute:e=>(e??``).split(/[\s,]+/).map(e=>parseInt(e,10)).filter(e=>!isNaN(e)&&e>0),toAttribute:e=>e.join(`,`)},R=class e extends N{constructor(...e){super(...e),this.current=1,this.total=0,this.pageSize=10,this.disabled=!1,this.showQuickJumper=!1,this.showSizeChanger=!1,this.pageSizeOptions=[10,20,50,100],this.showTotal=!1,this.size=`medium`,this.shape=`rounded`,this.variant=`solid`,this.simple=!1,this.hideEdges=!1,this.hideNumbers=!1,this.responsive=!1,this.jumpValue=``,this.simpleDraft=null,this.ripples=[],this.aria=new S(this),this.locale=new T(this),this.nextRippleId=0,this.restoreFocus=null,this.pagination=new br(this,we(this.paginationProps()),()=>!1),this.handleKeyDown=e=>{let t=e.key;(t===`ArrowLeft`||t===`ArrowRight`)&&Ke(this)===`rtl`&&(t=t===`ArrowLeft`?`ArrowRight`:`ArrowLeft`);let n=l(t,this.current,this.totalPages);n!==null&&(e.preventDefault(),this.changePage(n,`active`))},this.handleJump=e=>{if(e.key!==`Enter`)return;e.preventDefault();let t=parseInt(this.jumpValue,10);!isNaN(t)&&t>=1&&t<=this.totalPages&&(this.changePage(t),this.jumpValue=``,e.target.value=``)},this.handleSizeChange=e=>{let t=e.target,n=parseInt(t.value,10);this.send({type:`SET_PAGE_SIZE`,pageSize:n}),this.pageSize!==n&&(t.value=String(this.pageSize))},this.commitSimpleDraft=()=>{let e=this.simpleDraft;if(e===null)return;this.simpleDraft=null;let t=parseInt(e,10);isNaN(t)||this.changePage(Math.min(Math.max(t,1),this.totalPages))}}static{this.tagName=`minerva-pagination`}static{this.styles=[j,x`
:host{
display: block;
}
`,F(wt)]}paginationProps(){return{page:this.current,pageSize:this.pageSize,total:this.total,disabled:this.disabled,onChange:(e,t)=>this.request(e,t)}}send(e){this.pagination.sync(this.paginationProps()),this.pagination.send(e)}get totalPages(){return ae(this.total,this.pageSize)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}request(e,t){let n={page:e,pageSize:t};return this.emit(`minerva-page-change`,n,{cancelable:!0})?(this.current=e,this.pageSize=t,!0):!1}changePage(e,t=`if-lost`){Fe(this.current,e,this.totalPages,this.disabled)&&(this.restoreFocus={mode:t,page:e},this.send({type:`GOTO`,page:e}))}willUpdate(t){D&&(t.has(`current`)||t.has(`total`))&&this.total>0&&this.current>this.totalPages&&P(e.tagName,`current (${this.current}) is greater than the number of pages (${this.totalPages}).`)}updated(){let e=this.restoreFocus;this.restoreFocus=null;let t=this.shadowRoot;if(!e||!t||e.page!==this.current)return;let n=t.activeElement,r=!n||n.disabled===!0;(e.mode===`active`||r)&&(t.querySelector(`[aria-current="page"]`)??t.querySelector(`button:not(:disabled), input`))?.focus()}handleItemClick(e,t,n){if(Fe(this.current,e,this.totalPages,this.disabled)){if(n.detail>0){let e=n.currentTarget.getBoundingClientRect();this.ripples=[...this.ripples,{x:n.clientX-e.left,y:n.clientY-e.top,id:this.nextRippleId++,itemKey:t}],clearTimeout(this.rippleTimer),this.rippleTimer=setTimeout(()=>this.ripples=[],1e3)}this.changePage(e)}}label(e,t){let n=this.labels,r=this.locale.t;switch(e){case`prev`:return n?.prev??r(`pagination.prev`);case`next`:return n?.next??r(`pagination.next`);case`jump-prev`:return n?.jumpPrev??r(`pagination.jumpPrev`);case`jump-next`:return n?.jumpNext??r(`pagination.jumpNext`);default:return n?.page?.(t)??r(`pagination.page`,{page:t})}}hookStates(){return{disabled:this.disabled,size:this.size,shape:this.shape,variant:this.variant}}renderItem(e){let{type:t,target:n,key:r}=e;if(t===`ellipsis`)return h`<span class="ellipsis" aria-hidden="true">…</span>`;let i=this.current,a=t===`page`&&n===i,o=this.disabled||(t===`prev`?i<=1:t===`next`&&i>=this.totalPages),s;switch(t){case`prev`:s=h`<slot name="prev-icon">${nn}</slot>`;break;case`next`:s=h`<slot name="next-icon">${Dt}</slot>`;break;case`jump-prev`:case`jump-next`:s=h`<span class="jumpWrapper"
><slot
name=${t===`jump-prev`?`jump-prev-icon`:`jump-next-icon`}
>${mt}</slot
><span class="jumpHint" aria-hidden="true"
>${this.label(t,n)}</span
></span
>`;break;default:s=n}return this.itemRender&&(s=this.itemRender(n,t)),h`<button
type="button"
part=${_n(`item`,{current:a,disabled:o})}
data-key=${r}
class=${y({item:!0,active:a,disabled:o,prev:t===`prev`,next:t===`next`,jump:t===`jump-prev`||t===`jump-next`})}
?disabled=${o}
aria-label=${this.label(t,n)}
aria-current=${a?`page`:m}
@keydown=${this.handleKeyDown}
@click=${e=>this.handleItemClick(n,r,e)}
>
${s}
${this.ripples.filter(e=>e.itemKey===r).map(e=>h`<span
class="ripple"
style="left:${e.x}px;top:${e.y}px"
aria-hidden="true"
></span>`)}
</button>`}items(){return re({page:this.current,totalPages:this.totalPages,siblingCount:this.siblingCount,boundaryCount:this.boundaryCount,hideEdges:this.hideEdges}).map(({key:e,kind:t,page:n})=>({key:e,type:t,target:n}))}renderPageList(){let e=this.current,t=t=>this.hideEdges?m:this.renderItem({key:t,type:t,target:t===`prev`?e-1:e+1});return this.simple?h`${t(`prev`)}
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
${t(`next`)}`:this.hideNumbers?h`${t(`prev`)}
<span class="counter" aria-live="polite"
>${e} / ${this.totalPages}</span
>
${t(`next`)}`:$e(this.items(),e=>e.key,e=>this.renderItem(e))}render(){let e=this.locale.t,t=this.labels,n=this.total,r=this.pageSize,i=Ne(this.current,r,n),a=this.pageSizeOptions.includes(r)?this.pageSizeOptions:[...this.pageSizeOptions,r].sort((e,t)=>e-t),o=n=>t?.pageSizeOption?.(n)??e(`pagination.pageSizeOption`,{size:n});return h`<nav
part="root"
aria-label=${this.aria.label??t?.nav??e(`pagination.nav`)}
class=${y({pagination:!0,disabled:this.disabled,small:this.size===`small`,large:this.size===`large`,circle:this.shape===`circle`,square:this.shape===`square`,[this.variant]:!0,responsive:this.responsive})}
>
${this.showTotal?h`<div
part="total"
class="total"
aria-live="polite"
aria-atomic="true"
>
${this.totalRender?this.totalRender(n,i):t?.total?.(n)??e(`pagination.total`,{total:n})}
</div>`:m}
${this.renderPageList()}
${this.showQuickJumper?h`<label part="jumper" class="jumper">
${t?.jumpTo??e(`pagination.jumpTo`)}
<input
.value=${this.jumpValue}
?disabled=${this.disabled}
inputmode="numeric"
aria-label=${t?.jumpToInput??e(`pagination.jumpToInput`)}
@input=${e=>this.jumpValue=e.target.value}
@keydown=${this.handleJump}
/>
</label>`:m}
${this.showSizeChanger?h`<div class="sizeChanger">
<select
part="size-changer"
?disabled=${this.disabled}
aria-label=${t?.pageSize??e(`pagination.pageSize`)}
@change=${this.handleSizeChange}
>
${a.map(e=>h`<option
value=${e}
.selected=${e===r}
>
${o(e)}
</option>`)}
</select>
</div>`:m}
</nav>`}},L([_({type:Number,reflect:!0})],R.prototype,`current`,void 0),L([_({type:Number})],R.prototype,`total`,void 0),L([_({type:Number,reflect:!0,attribute:`page-size`})],R.prototype,`pageSize`,void 0),L([_({type:Boolean,reflect:!0})],R.prototype,`disabled`,void 0),L([_({type:Boolean,attribute:`show-quick-jumper`})],R.prototype,`showQuickJumper`,void 0),L([_({type:Boolean,attribute:`show-size-changer`})],R.prototype,`showSizeChanger`,void 0),L([_({attribute:`page-size-options`,converter:Ir})],R.prototype,`pageSizeOptions`,void 0),L([_({type:Boolean,attribute:`show-total`})],R.prototype,`showTotal`,void 0),L([_({attribute:!1})],R.prototype,`totalRender`,void 0),L([_({attribute:!1})],R.prototype,`itemRender`,void 0),L([_({reflect:!0})],R.prototype,`size`,void 0),L([_({reflect:!0})],R.prototype,`shape`,void 0),L([_({reflect:!0})],R.prototype,`variant`,void 0),L([_({type:Boolean,reflect:!0})],R.prototype,`simple`,void 0),L([_({type:Number,attribute:`sibling-count`})],R.prototype,`siblingCount`,void 0),L([_({type:Number,attribute:`boundary-count`})],R.prototype,`boundaryCount`,void 0),L([_({type:Boolean,attribute:`hide-edges`})],R.prototype,`hideEdges`,void 0),L([_({type:Boolean,attribute:`hide-numbers`})],R.prototype,`hideNumbers`,void 0),L([_({type:Boolean,reflect:!0})],R.prototype,`responsive`,void 0),L([_({attribute:!1})],R.prototype,`labels`,void 0),L([p()],R.prototype,`jumpValue`,void 0),L([p()],R.prototype,`simpleDraft`,void 0),L([p()],R.prototype,`ripples`,void 0)})))()}function Rr(e,t,n,r){let i=t==null?{base:1}:typeof t==`number`?{base:t}:t,a={},o=1;for(let t of zr){let n=i[t]??o;(!Number.isInteger(n)||n<1||n>12)&&(D&&P(e,`columns must be integers from 1 to 12 (got ${String(n)} for "${t}"); using ${o}.`),n=o),a[`--grid-columns-${t}`]=String(n),o=n}return a[`--grid-row-gap`]=qe(n),a[`--grid-column-gap`]=qe(r),a}var zr,Br,Vr,Hr;function Ur(){return(Ur=e((()=>{M(),k(),E(),pr(),Zt(),d(),f(),Qe(),zr=[`base`,`sm`,`md`,`lg`],Br={fromAttribute(e){if(e===null)return;let t=e.trim();if(t.startsWith(`{`))try{return JSON.parse(t)}catch{return NaN}let n=t.split(/[\s,]+/).filter(Boolean).map(Number);if(n.length<=1)return n[0]??NaN;let[r,i,a,o]=n;return{base:r,sm:i,md:a,lg:o}},toAttribute(e){return e===void 0?null:typeof e==`number`?String(e):JSON.stringify(e)}},Vr=class e extends N{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-responsive-grid`}static{this.styles=[j,x`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,F(cr)]}render(){let t=Rr(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return h`<div class="root" part="root" style=${b(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},L([_({converter:Br})],Vr.prototype,`columns`,void 0),L([_({converter:mr})],Vr.prototype,`gap`,void 0),L([_({attribute:`row-gap`,converter:mr})],Vr.prototype,`rowGap`,void 0),L([_({attribute:`column-gap`,converter:mr})],Vr.prototype,`columnGap`,void 0),Hr=class extends N{constructor(...e){super(...e),this.fullWidth=!1}static{this.tagName=`minerva-grid-item`}static{this.styles=[j,x`
:host{
display: block;
min-width: 0;
}
:host([full-width]){
grid-column: 1 / -1;
}
`]}render(){return h`<slot></slot>`}},L([_({type:Boolean,reflect:!0,attribute:`full-width`})],Hr.prototype,`fullWidth`,void 0)})))()}var z;function Wr(){return(Wr=e((()=>{A(),M(),I(),k(),E(),En(),Un(),d(),f(),g(),tt(),z=class e extends O{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-textarea`}static{this.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,x`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,F(Jn)]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}select(){this.textarea?.select()}getFormValue(){return this.value}getValidity(){let e=this.textarea;return e?{flags:qn(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),D&&(t.has(`minLength`)||t.has(`maxLength`))&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&P(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let e=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return h`<textarea
      part="root"
      class=${y({textarea:!0,[this.variant]:!0,[this.size]:!0,invalid:e})}
      style="resize: none"
      .value=${et(this.value)}
      name=${this.name||m}
      placeholder=${this.placeholder||m}
      rows=${this.rows??m}
      ?disabled=${this.isDisabled}
      ?readonly=${this.readOnly}
      ?required=${this.required}
      minlength=${this.minLength??m}
      maxlength=${this.maxLength??m}
      autocomplete=${this.autocomplete??m}
      wrap=${this.wrap??m}
      aria-label=${this.aria.label??m}
      aria-description=${this.aria.description??m}
      aria-invalid=${e?`true`:m}
      aria-required=${this.aria.attr(`aria-required`)??m}
      aria-readonly=${this.aria.attr(`aria-readonly`)??m}
      @input=${this.handleInput}
      @change=${this.handleChange}
    ></textarea>`}},L([_({attribute:!1})],z.prototype,`value`,void 0),L([_({attribute:`value`})],z.prototype,`defaultValue`,void 0),L([_({reflect:!0})],z.prototype,`variant`,void 0),L([_({reflect:!0})],z.prototype,`size`,void 0),L([_({type:Boolean,reflect:!0})],z.prototype,`invalid`,void 0),L([_()],z.prototype,`placeholder`,void 0),L([_({type:Boolean,reflect:!0,attribute:`readonly`})],z.prototype,`readOnly`,void 0),L([_({type:Number})],z.prototype,`rows`,void 0),L([_({type:Number,attribute:`minlength`})],z.prototype,`minLength`,void 0),L([_({type:Number,attribute:`maxlength`})],z.prototype,`maxLength`,void 0),L([_()],z.prototype,`autocomplete`,void 0),L([_()],z.prototype,`wrap`,void 0),L([v(`textarea`)],z.prototype,`textarea`,void 0)})))()}var Gr;function Kr(){return(Kr=e((()=>{A(),M(),C(),I(),k(),Dn(),E(),Gn(),d(),f(),g(),Qe(),Gr=class e extends N{constructor(...e){super(...e),this.variant=`spinner`,this.size=`medium`,this.color=`primary`,this.label=``,this.decorative=!1,this.full=!1,this.locale=new T(this),this.aria=new S(this),this.slots=new Cn(this)}static{this.tagName=`minerva-progress`}static{this.styles=[j,x`
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
`,F(bn)]}hookStates(){return{variant:this.variant===`dottedBar`?`dotted-bar`:this.variant,size:this.size,color:this.color}}updated(){D&&this.full&&this.width&&P(e.tagName,`width is ignored when full is set.`)}renderIndicator(){let e=this.size;switch(this.variant){case`bar`:return h`<div part="indicator" class="barContainer ${e}">
<div class="bar"></div>
</div>`;case`dottedBar`:return h`<div part="indicator" class="dottedBarContainer ${e}">
<div class="dottedBar"></div>
</div>`;case`wave`:return h`<div part="indicator" class="waveContainer ${e}">
<span class="wave" aria-hidden="true">${yn}</span>
</div>`;case`circle`:return h`<span
part="indicator"
class="circle ${e}"
aria-hidden="true"
>${zt}</span
>`;case`spinner`:return h`<span
part="indicator"
class="spinner ${e}"
aria-hidden="true"
>${Ht}</span
>`;default:return m}}render(){let e=this.variant===`bar`||this.variant===`dottedBar`,t=!!this.label||this.slots.test(`label`),n=this.aria.label;return h`<div
part="root"
class=${y({progressIndicator:!0,[this.color]:!0,fullWidth:this.full,defaultWidth:!this.full&&!this.width&&e})}
style=${b({width:this.width&&!this.full?this.width:void 0})}
role=${this.decorative?m:`progressbar`}
aria-hidden=${this.decorative?`true`:m}
aria-label=${this.decorative?m:n??(t?m:this.locale.t(`common.loading`))}
aria-labelledby=${!this.decorative&&!n&&t?`label`:m}
>
${this.slots.test(`icon`)?h`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:m}
${this.renderIndicator()}
${t?h`<span id="label" part="label" class="label"
><slot name="label">${this.label}</slot></span
>`:m}
</div>`}},L([_({reflect:!0})],Gr.prototype,`variant`,void 0),L([_({reflect:!0})],Gr.prototype,`size`,void 0),L([_({reflect:!0})],Gr.prototype,`color`,void 0),L([_()],Gr.prototype,`label`,void 0),L([_({type:Boolean,reflect:!0})],Gr.prototype,`decorative`,void 0),L([_()],Gr.prototype,`width`,void 0),L([_({type:Boolean,reflect:!0})],Gr.prototype,`full`,void 0)})))()}var qr;function Jr(){return(Jr=e((()=>{A(),C(),en(),I(),k(),Dn(),E(),wr(),Cr(),Fr(),Nr(),Ot(),Ft(),d(),f(),g(),qr=class extends N{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.locale=new T(this),this.aria=new S(this),this.slots=new Cn(this),this.presence=new Yt(this,()=>this.panel),this.modal=new xr(this),this.focusScope=new jr(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new yr(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.triggerElement()],onFocusOutside:e=>e.preventDefault(),onEscapeKeyDown:()=>this.lastReason(`escape`),onPointerDownOutside:()=>this.lastReason(`outside`),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{let t=this.triggerElement();!e.defaultPrevented&&t&&e.composedPath().includes(t)&&this.requestOpenChange(!this.open,`trigger`)}}static{this.tagName=`minerva-modal`}static{this.styles=[j,Sr,x`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,F(on)]}lastReason(e){this.reason=e}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(or(this.overlay),or(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),vt(this.panel),vt(this.overlay)}afterClose(){vt(this.panel),vt(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description;return h`<slot name="trigger"></slot> ${e?h`<div
part="overlay"
class="overlay"
popover="manual"
data-state=${t}
aria-hidden="true"
></div>
<div
part="content"
class=${y({content:!0,[this.size]:!0})}
popover="manual"
role=${this.dialogRole}
aria-modal="true"
aria-labelledby=${n?`title`:m}
aria-label=${n?m:this.aria.label??m}
aria-describedby=${r?`description`:m}
tabindex="-1"
data-state=${t}
>
${r?h`<p
id="description"
class="description"
part="description"
>
${r}
</p>`:m}
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
aria-label=${this.closeLabel??this.locale.t(`modal.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${qt}
</button>`}
</div>`:m}`}},L([_({type:Boolean,reflect:!0})],qr.prototype,`open`,void 0),L([_()],qr.prototype,`label`,void 0),L([_()],qr.prototype,`description`,void 0),L([_({reflect:!0})],qr.prototype,`size`,void 0),L([_({type:Boolean,attribute:`hide-close-button`})],qr.prototype,`hideCloseButton`,void 0),L([_({attribute:`close-label`})],qr.prototype,`closeLabel`,void 0),L([_({attribute:`dialog-role`})],qr.prototype,`dialogRole`,void 0),L([v(`.content`)],qr.prototype,`panel`,void 0),L([v(`.overlay`)],qr.prototype,`overlay`,void 0)})))()}var Yr,Xr,Zr,B;function Qr(){return(Qr=e((()=>{A(),M(),C(),I(),kn(),k(),E(),Tn(),d(),f(),g(),Je(),u(),Yr=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],Xr=/^\d{4}-\d{2}-\d{2}$/,Zr={fromAttribute(e){let t=e?.trim().match(/^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/);return t?ve(Number(t[1]),Number(t[2])-1,1):void 0},toAttribute(e){return e instanceof Date&&!Number.isNaN(e.getTime())?ye(e).slice(0,7):null}},B=class e extends N{constructor(...e){super(...e),this.events=[],this.clickableEvents=!1,this.size=`medium`,this.disabled=!1,this.hideEvents=!1,this.focusedKey=``,this.pendingFocus=null,this.i18n=new T(this),this.aria=new S(this)}static{this.tagName=`minerva-month-calendar`}static{this.styles=[j,x`
:host{
display: block;


inline-size: 100%;
}
.navButton svg{
flex-shrink: 0;
}
`,F(pt)]}get displayed(){let e=this.month;return e instanceof Date&&!Number.isNaN(e.getTime())?n(e):n(new Date)}focus(e){this.renderRoot.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus(e)}goToMonth(e){let t=n(e);ye(t)!==ye(this.displayed)&&(this.month=t,this.emit(`minerva-month-change`,{month:t}))}select(e){if(this.disabled)return;let t=ye(e);t!==this.value&&(this.value=t,this.emit(`minerva-change`,{value:t})),Ie(e,this.displayed)||this.goToMonth(e)}handleKeyDown(e,t){if(this.disabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let r=Te(e.key,this),i=(t.getDay()+6)%7,a;switch(r){case`ArrowLeft`:a=Ce(t,-1);break;case`ArrowRight`:a=Ce(t,1);break;case`ArrowUp`:a=Ce(t,-7);break;case`ArrowDown`:a=Ce(t,7);break;case`Home`:a=Ce(t,-i);break;case`End`:a=Ce(t,6-i);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=n(t,r),o=Ce(n(i,1),-1).getDate();a=ve(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),o));break}default:return}e.preventDefault(),this.pendingFocus=ye(a),this.focusedKey=ye(a),Ie(a,this.displayed)||this.goToMonth(a)}willUpdate(t){D&&t.has(`value`)&&this.value&&!Xr.test(this.value)&&P(e.tagName,`value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`)}updated(){if(this.disabled||!this.pendingFocus)return;let e=this.renderRoot.querySelector(`[data-date="${this.pendingFocus}"]`);e&&(this.pendingFocus=null,e.focus())}hookStates(){return{disabled:this.disabled,size:this.size}}render(){let e=this.i18n.t,t=this.displayed,r=Ce(t,-((t.getDay()+6)%7)),i=Array.from({length:42},(e,t)=>Ce(r,t)),a=i.map(ye),o=new Date,s=ye(o),c=this.value||void 0,l=[this.focusedKey,c,Ie(o,t)?s:``,ye(t)].find(e=>e&&a.includes(e)),ee=this.events??[],te=new Map;for(let e of ee)te.set(e.date,(te.get(e.date)??0)+1);let ne=ee.filter(e=>e.date===c),re;try{re=new Intl.DateTimeFormat(this.locale??this.i18n.language,{year:`numeric`,month:`long`}).format(t)}catch{re=ye(t).slice(0,7)}let ie=this.disabled,{rangeStart:ae,rangeEnd:oe}=this,se=ae&&oe&&Xr.test(ae)&&Xr.test(oe)?[ae,oe].sort():void 0,u=[`small`,`medium`,`large`].includes(this.size)?this.size:`medium`;return h`<section
part="root"
class="monthCalendar ${u}"
aria-label=${this.aria.label??e(`monthCalendar.label`)}
>
<div class="toolbar">
<h2 id="heading" part="heading" class="heading" aria-live="polite">
${re}
</h2>
<div class="navigation">
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.previousMonthLabel??e(`monthCalendar.previousMonth`)}
?disabled=${ie}
@click=${()=>this.goToMonth(n(t,-1))}
>
${nn}
</button>
<button
type="button"
part="nav-button"
class="navButton"
?disabled=${ie}
@click=${()=>this.goToMonth(new Date)}
>
${In} ${this.todayLabel??e(`monthCalendar.today`)}
</button>
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.nextMonthLabel??e(`monthCalendar.nextMonth`)}
?disabled=${ie}
@click=${()=>this.goToMonth(n(t,1))}
>
${Dt}
</button>
</div>
</div>
<div
part="grid"
role="grid"
aria-labelledby="heading"
aria-disabled=${ie?`true`:m}
class="grid"
>
<div role="row" class="week">
${Yr.map((t,n)=>h`<div role="columnheader" class="weekday">
${this.weekdayLabels?.[n]??e(`monthCalendar.weekdays.${t}`)}
</div>`)}
</div>
${Array.from({length:6},(n,r)=>h`<div role="row" class="week">
${i.slice(r*7,r*7+7).map(n=>{let r=ye(n),i=te.get(r)??0,a=this.getDayLabel?this.getDayLabel(r,i):i?e(`monthCalendar.dayWithEvents`,{date:r,count:i}):r,o=!!se&&r>=se[0]&&r<=se[1],ee={selected:c===r,today:r===s,outside:!Ie(n,t),disabled:ie};return h`<div
role="gridcell"
part=${_n(`day`,ee)}
class=${y({day:!0,inRange:o,rangeStart:o&&r===se?.[0],rangeEnd:o&&r===se?.[1]})}
data-date=${r}
?data-outside=${ee.outside}
aria-label=${a}
aria-selected=${String(ee.selected)}
aria-current=${ee.today?`date`:m}
aria-disabled=${ie?`true`:m}
tabindex=${!ie&&r===l?`0`:`-1`}
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
${!this.hideEvents&&c?h`<section
part="events"
class="events"
aria-label=${this.getEventsLabel?this.getEventsLabel(c):e(`monthCalendar.eventsLabel`,{date:c})}
>
<h3 class="eventsHeading">${c}</h3>
${ne.length?h`<ul class="eventList">
${ne.map(e=>h`<li class="eventItem">
${this.clickableEvents?h`<button
type="button"
part="event"
class="eventButton"
?disabled=${ie}
@click=${()=>this.emit(`minerva-event-click`,{event:e})}
>
${e.title}
</button>`:h`<span part="event">${e.title}</span>`}
</li>`)}
</ul>`:h`<p class="empty" part="empty">
${this.emptyEventsText??e(`monthCalendar.noEvents`)}
</p>`}
</section>`:m}
</section>`}},L([_({converter:Zr,reflect:!0})],B.prototype,`month`,void 0),L([_({reflect:!0})],B.prototype,`value`,void 0),L([_({attribute:!1})],B.prototype,`events`,void 0),L([_({type:Boolean,attribute:`clickable-events`})],B.prototype,`clickableEvents`,void 0),L([_({attribute:`range-start`,reflect:!0})],B.prototype,`rangeStart`,void 0),L([_({attribute:`range-end`,reflect:!0})],B.prototype,`rangeEnd`,void 0),L([_({reflect:!0})],B.prototype,`size`,void 0),L([_({type:Boolean,reflect:!0})],B.prototype,`disabled`,void 0),L([_({type:Boolean,attribute:`hide-events`})],B.prototype,`hideEvents`,void 0),L([_({attribute:`previous-month-label`})],B.prototype,`previousMonthLabel`,void 0),L([_({attribute:`next-month-label`})],B.prototype,`nextMonthLabel`,void 0),L([_({attribute:`today-label`})],B.prototype,`todayLabel`,void 0),L([_({attribute:`empty-events-text`})],B.prototype,`emptyEventsText`,void 0),L([_()],B.prototype,`locale`,void 0),L([_({attribute:!1})],B.prototype,`weekdayLabels`,void 0),L([_({attribute:!1})],B.prototype,`getDayLabel`,void 0),L([_({attribute:!1})],B.prototype,`getEventsLabel`,void 0),L([p()],B.prototype,`focusedKey`,void 0)})))()}function $r(e,t,n){for(let r of e){if(r.id===t)return!0;if(r.children&&$r(r.children,t,n))return n.add(r.id),!0}return!1}var ei,ti,ni;function ri(){return(ri=e((()=>{A(),M(),C(),en(),I(),kn(),k(),E(),pn(),Kt(),Mr(),d(),f(),g(),nt(),ei=`.item`,ti=`.children`,ni=class e extends N{constructor(...e){super(...e),this.sections=[],this.collapsed=!1,this.wrapLabels=!1,this.expandedIds=[],this.explicitlyCollapsed=new Set,this.aria=new S(this),this.locale=new T(this),this.typeahead=new Er(this),this.handleNavKeyDown=e=>{if(e.defaultPrevented)return;let t=e.composedPath()[0]?.closest?.(ei);if(!t||!this.shadowRoot?.contains(t))return;let n=this.focusableItems(),r=n.indexOf(t),i;switch(this.logicalKey(e.key)){case`ArrowDown`:i=n[r+1];break;case`ArrowUp`:i=r>0?n[r-1]:void 0;break;case`Home`:i=n[0];break;case`End`:i=n[n.length-1];break;case`ArrowLeft`:if(t.getAttribute(`aria-expanded`)===`true`)return;i=t.closest(ti)?.parentElement?.querySelector(`:scope > ${ei}`);break;default:{if(e.altKey||e.ctrlKey||e.metaKey)return;let t=this.typeahead.search(e.key,n.map(e=>({text:e.querySelector(`.label`)?.textContent??``})),r);if(t===-1)return;i=n[t]}}i&&(e.preventDefault(),i.focus())}}static{this.tagName=`minerva-nav-tree`}static{this.styles=[j,x`
:host{
display: block;
}
`,F(mn)]}activeAncestors(){let e=new Set;for(let t of this.sections)$r(t.items,this.activeId,e);return e}isExpanded(e,t){return this.expandedIds.includes(e)||!this.explicitlyCollapsed.has(e)&&t.has(e)}willUpdate(t){if(D&&t.has(`sections`)){let t=new Set,n=r=>{for(let i of r)t.has(i.id)&&P(e.tagName,`duplicate item id "${i.id}": ids must be unique.`),t.add(i.id),i.children&&n(i.children)};for(let e of this.sections??[])n(e.items??[])}}setItemExpanded(e,t){let n=new Set(this.expandedIds);t?n.add(e.id):n.delete(e.id);let r=Array.from(n),i={expandedIds:r,item:e,expanded:t};if(!this.emit(`minerva-expanded-change`,i,{cancelable:!0}))return;let a=new Set(this.explicitlyCollapsed);t?a.delete(e.id):a.add(e.id),this.explicitlyCollapsed=a,this.expandedIds=r}select(e,t){let n={value:e.id,item:e};this.emit(`minerva-select`,n,{cancelable:!0})||t?.preventDefault()}toggleItem(e){this.setItemExpanded(e,!this.isExpanded(e.id,this.activeAncestors())),this.select(e)}focusableItems(){return Array.from(this.shadowRoot?.querySelectorAll(ei)??[]).filter(e=>!e.disabled&&e.getAttribute(`aria-disabled`)!==`true`)}logicalKey(e){return e!==`ArrowLeft`&&e!==`ArrowRight`||Ke(this)!==`rtl`?e:e===`ArrowLeft`?`ArrowRight`:`ArrowLeft`}renderSectionTitle(e){return h`<h2 part="group-label" class="sectionTitle">${e}</h2>`}renderContent(e,t){return h`<span part="icon" class="icon" aria-hidden="true"
>${e.icon??m}</span
><span class="copy"
><span part="label" class="label">${e.label}</span>${e.description?h`<small part="description" class="description"
>${e.description}</small
>`:m}</span
>${!this.collapsed&&(e.endContent||t)?h`<span class="trailing"
>${e.endContent?h`<span class="end">${e.endContent}</span>`:m}${t?h`<span class="chevron" aria-hidden="true"
>${an}</span
>`:m}</span
>`:m}`}renderItem(t,n,r){let i=!!t.children?.length,a=t.id===this.activeId,o=r.has(t.id),s=i&&this.isExpanded(t.id,r),c=!!t.disabled,l={item:!0,nested:n>0,active:a,disabled:c},ee=Object.entries(l).filter(([,e])=>e).map(([e])=>e).join(` `),te=t.description?`${t.label} / ${t.description}`:t.label,ne=this.renderContent(t,i);if(i)return h`<div class="branch">
<button
part=${_n(`item`,{current:a,expanded:s,disabled:c})}
class=${y(l)}
type="button"
title=${te}
aria-expanded=${s?`true`:`false`}
data-id=${t.id}
?data-current=${a}
data-ancestor-active=${o?`true`:m}
?data-expanded=${s}
?disabled=${c}
@click=${()=>this.toggleItem(t)}
@keydown=${e=>{if(this.collapsed)return;let n=this.logicalKey(e.key);n===`ArrowRight`?(e.preventDefault(),s?e.currentTarget.parentElement?.querySelector(`${ti} ${ei}`)?.focus():this.setItemExpanded(t,!0)):n===`ArrowLeft`&&s&&(e.preventDefault(),this.setItemExpanded(t,!1))}}
>
${ne}
</button>
${s&&!this.collapsed?h`<div class="children">
${$e(t.children??[],e=>e.id,e=>this.renderItem(e,n+1,r))}
</div>`:m}
</div>`;if(this.renderLink)return this.renderLink(t,ne,{active:a,ancestorActive:o,expanded:!1,depth:n,collapsed:this.collapsed,hasChildren:i,disabled:c,className:ee});let re=_n(`item`,{current:a,disabled:c});return c?h`<span
part=${re}
class=${y(l)}
title=${te}
data-id=${t.id}
?data-current=${a}
role="link"
aria-disabled="true"
>${ne}</span
>`:t.href===void 0?h`<button
part=${re}
class=${y(l)}
type="button"
title=${te}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:m}
@click=${()=>this.select(t)}
>
${ne}
</button>`:h`<a
part=${re}
class=${y(l)}
href=${dn(e.tagName,t.href)??m}
title=${te}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:m}
@click=${e=>this.select(t,e)}
>${ne}</a
>`}render(){let e=this.activeAncestors(),t=this.getAttribute(`aria-labelledby`);return h`<nav
part="root"
class=${y({navTree:!0,collapsed:this.collapsed,wrapLabels:this.wrapLabels&&!this.collapsed})}
aria-label=${this.aria.label??(t?m:this.locale.t(`navTree.label`))}
@keydown=${this.handleNavKeyDown}
>
${$e(this.sections??[],e=>e.id,t=>h`<section part="group" class="section">
${t.title?this.renderSectionTitle(t.title):m}
<div class="list">
${$e(t.items,e=>e.id,t=>this.renderItem(t,0,e))}
</div>
</section>`)}
</nav>`}},L([_({attribute:!1})],ni.prototype,`sections`,void 0),L([_({attribute:`active-id`,reflect:!0})],ni.prototype,`activeId`,void 0),L([_({type:Boolean,reflect:!0})],ni.prototype,`collapsed`,void 0),L([_({type:Boolean,reflect:!0,attribute:`wrap-labels`})],ni.prototype,`wrapLabels`,void 0),L([_({attribute:!1})],ni.prototype,`expandedIds`,void 0),L([_({attribute:!1})],ni.prototype,`renderLink`,void 0),L([p()],ni.prototype,`explicitlyCollapsed`,void 0)})))()}var ii,V;function ai(){return(ai=e((()=>{A(),M(),C(),I(),k(),E(),En(),ln(),d(),f(),g(),u(),tt(),ii={fromAttribute:e=>e===null||e.trim()===``||Number.isNaN(Number(e))?null:Number(e),toAttribute:e=>e===null?null:String(e)},V=class e extends O{constructor(...e){super(...e),this.value=null,this.defaultValue=null,this.step=1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.showStepper=!1,this.noEmpty=!1,this.placeholder=``,this.draft=``,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-number-input`}static{this.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,x`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,F(fn)]}get resolvedPrecision(){return this.precision??xe(this.step)}get locked(){return this.isDisabled||this.readOnly}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}stepUp(){this.value=this.stepped(this.step)}stepDown(){this.value=this.stepped(-this.step)}getFormValue(){return te(this.value,this.resolvedPrecision)}getValidity(){let{t:e}=this.locale,n=this.input,r=this.draft.trim();if(r&&r!==`-`&&r!==`.`){let i=t(r);return i===null?{flags:{badInput:!0},message:this.notANumberMessage??e(`numberInput.notANumber`),anchor:n}:this.min!==void 0&&i<this.min?{flags:{rangeUnderflow:!0},message:this.belowMinMessage??e(`validation.rangeUnderflow`,{min:this.min}),anchor:n}:this.max!==void 0&&i>this.max?{flags:{rangeOverflow:!0},message:this.aboveMaxMessage??e(`validation.rangeOverflow`,{max:this.max}),anchor:n}:{flags:{},message:``}}return this.required&&this.value===null?{flags:{valueMissing:!0},message:e(`validation.valueMissing`),anchor:n}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.draft=te(this.value,this.resolvedPrecision)}restoreFormState(e){typeof e==`string`&&(this.value=t(e))}willUpdate(n){if(n.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),n.has(`value`)||n.has(`precision`)||n.has(`step`)){let e=t(this.draft);(e===null||e!==this.value)&&(this.draft=te(this.value,this.resolvedPrecision))}D&&(n.has(`min`)||n.has(`max`))&&this.min!==void 0&&this.max!==void 0&&this.min>this.max&&P(e.tagName,`min (${this.min}) is greater than max (${this.max}): every value is clamped.`)}stepped(e){let n=t(this.draft)??this.value??0;return Number(We(n+e,this.min,this.max).toFixed(this.resolvedPrecision))}commitValue(e){let t=this.resolvedPrecision,n=e===null?null:Number(e.toFixed(t));this.draft=te(n,t),n!==this.value&&(this.dirty=!0,this.value=n,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:n}))}commit(e){if(this.locked)return;let n=e.trim();if(n===``||n===`-`){this.noEmpty?this.commitValue(We(this.min??0,this.min,this.max)):this.commitValue(null);return}let r=t(n);if(r===null){this.draft=te(this.value,this.resolvedPrecision);return}this.commitValue(We(r,this.min,this.max))}adjust(e){this.locked||this.commitValue(this.stepped(e))}handleInput(){this.draft=String(this.input.value),this.emit(`minerva-input`,{value:t(this.draft)})}handleKeyDown(e){if(this.locked||e.defaultPrevented)return;let{key:t}=e;t===`ArrowUp`||t===`ArrowDown`?(e.preventDefault(),this.adjust(t===`ArrowUp`?this.step:-this.step)):t===`PageUp`||t===`PageDown`?(e.preventDefault(),this.adjust((t===`PageUp`?10:-10)*this.step)):t===`Home`&&this.min!==void 0?(e.preventDefault(),this.commitValue(this.min)):t===`End`&&this.max!==void 0?(e.preventDefault(),this.commitValue(this.max)):t===`Enter`&&this.input.blur()}handleBlur(){this.commit(String(this.input.value))}draftError(){let{t:e}=this.locale,n=this.draft.trim();if(!n||n===`-`||n===`.`)return;let r=t(n);if(r===null)return this.notANumberMessage??e(`numberInput.notANumber`);if(this.min!==void 0&&r<this.min)return this.belowMinMessage??e(`numberInput.belowMin`,{min:this.min});if(this.max!==void 0&&r>this.max)return this.aboveMaxMessage??e(`numberInput.aboveMax`,{max:this.max})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.draftError()!==void 0||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.locked,r=this.draftError(),i=r!==void 0,a=this.invalid||i||this.aria.attr(`aria-invalid`)===`true`,o=this.value??0;return h`<div
part="root"
class=${y({root:!0,[this.size]:!0,invalid:a,shake:i,disabled:t})}
title=${r??m}
>
<input
part="input"
class="field"
type="text"
inputmode="decimal"
role="spinbutton"
.value=${et(this.draft)}
placeholder=${this.placeholder||m}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
aria-valuemin=${this.min??m}
aria-valuemax=${this.max??m}
aria-valuenow=${this.value??m}
aria-label=${this.aria.label??m}
aria-description=${this.aria.description??m}
aria-invalid=${a?`true`:m}
aria-required=${this.aria.attr(`aria-required`)??m}
@input=${this.handleInput}
@blur=${this.handleBlur}
@keydown=${this.handleKeyDown}
/>
${this.showStepper?h`<div class="stepper" part="stepper" aria-hidden="true">
<button
part="increment"
type="button"
class="step stepUp"
tabindex="-1"
?disabled=${n||this.max!==void 0&&o>=this.max}
aria-label=${this.incrementLabel??e(`numberInput.increment`)}
@click=${()=>this.adjust(this.step)}
>
${hn}
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
${an}
</button>
</div>`:m}
</div>`}},L([_({attribute:!1})],V.prototype,`value`,void 0),L([_({attribute:`value`,converter:ii})],V.prototype,`defaultValue`,void 0),L([_({type:Number})],V.prototype,`min`,void 0),L([_({type:Number})],V.prototype,`max`,void 0),L([_({type:Number})],V.prototype,`step`,void 0),L([_({type:Number})],V.prototype,`precision`,void 0),L([_({reflect:!0})],V.prototype,`size`,void 0),L([_({type:Boolean,reflect:!0})],V.prototype,`invalid`,void 0),L([_({type:Boolean,reflect:!0,attribute:`readonly`})],V.prototype,`readOnly`,void 0),L([_({type:Boolean,attribute:`show-stepper`})],V.prototype,`showStepper`,void 0),L([_({type:Boolean,attribute:`no-empty`})],V.prototype,`noEmpty`,void 0),L([_()],V.prototype,`placeholder`,void 0),L([_({attribute:`increment-label`})],V.prototype,`incrementLabel`,void 0),L([_({attribute:`decrement-label`})],V.prototype,`decrementLabel`,void 0),L([_({attribute:`not-a-number-message`})],V.prototype,`notANumberMessage`,void 0),L([_({attribute:`below-min-message`})],V.prototype,`belowMinMessage`,void 0),L([_({attribute:`above-max-message`})],V.prototype,`aboveMaxMessage`,void 0),L([p()],V.prototype,`draft`,void 0),L([v(`input`)],V.prototype,`input`,void 0)})))()}var oi,si,ci,li,ui;function di(){return(di=e((()=>{A(),M(),k(),Dn(),E(),pr(),Mt(),d(),f(),g(),Qe(),oi=class extends N{static{this.tagName=`minerva-page`}static{this.styles=[j,F(Yn),x`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.maxWidth===void 0||this.maxWidth===``?void 0:Ge(this.maxWidth);return h`<div class="page" part="root" style=${b({maxWidth:e})}>
<slot></slot>
</div>`}},L([_({attribute:`max-width`,converter:mr})],oi.prototype,`maxWidth`,void 0),si=class extends N{constructor(...e){super(...e),this.heading=``,this.description=``,this.slots=new Cn(this)}static{this.tagName=`minerva-page-header`}static{this.styles=[j,F(Yn),x`
:host{
display: block;
min-width: 0;
}
`]}updated(){D&&!this.heading&&!this.slots.test(`heading`)&&P(this.constructor.tagName,`set the heading attribute (or fill the heading slot): the heading names the region.`)}renderHeading(){let e=!!this.description||this.slots.test(`description`);return h`<div class="heading">
<h1 part="title"><slot name="heading">${this.heading}</slot></h1>
${e?h`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:m}
</div>`}renderActions(){return this.slots.test(`actions`)?h`<div class="actions" part="actions">
<slot name="actions"></slot>
</div>`:m}render(){return h`<header class="header" part="root">
${this.renderHeading()} ${this.renderActions()}
</header>`}},L([_()],si.prototype,`heading`,void 0),L([_()],si.prototype,`description`,void 0),ci=class extends si{static{this.tagName=`minerva-page-section`}static{this.styles=[j,F(Yn),x`
:host{
display: block;
min-width: 0;
}
.section ::slotted(minerva-tag),
.section ::slotted([data-component="tag"]){
align-self: flex-start;
}
`]}renderHeading(){let e=!!this.description||this.slots.test(`description`);return h`<div class="heading">
<h2 id="heading" part="title">
${this.slots.test(`icon`)?h`<span class="sectionIcon" part="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:m}<slot name="heading">${this.heading}</slot>
</h2>
${e?h`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:m}
</div>`}render(){return h`<section class="section" part="root" aria-labelledby="heading">
<div class="sectionHeader" part="header">
${this.renderHeading()} ${this.renderActions()}
</div>
<slot></slot>
</section>`}},li=class extends N{constructor(...e){super(...e),this.nowrap=!1,this.density=`default`,this.aria=new S(this)}static{this.tagName=`minerva-toolbar`}static{this.styles=[j,F(Yn),x`
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
`]}render(){return h`<div
part="root"
role="group"
aria-label=${this.aria.label??m}
aria-description=${this.aria.description??m}
class=${y({toolbar:!0,compact:this.density===`compact`,nowrap:this.nowrap})}
>
<slot></slot>
</div>`}},L([_({type:Boolean,reflect:!0})],li.prototype,`nowrap`,void 0),L([_({reflect:!0})],li.prototype,`density`,void 0),ui=class extends N{constructor(...e){super(...e),this.label=``,this.value=``,this.slots=new Cn(this)}static{this.tagName=`minerva-stat-card`}static{this.styles=[j,F(Yn),x`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.description!==void 0&&this.description!==null||this.slots.test(`description`);return h`<div class="statCard" part="root">
${this.slots.test(`icon`)?h`<span class="statIcon" part="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:m}
<div class="statContent">
<dl>
<dt part="label"><slot name="label">${this.label}</slot></dt>
<dd part="value"><slot name="value">${this.value}</slot></dd>
</dl>
${e?h`<p class="statDescription" part="description">
<slot name="description">${this.description}</slot>
</p>`:m}
</div>
</div>`}},L([_()],ui.prototype,`label`,void 0),L([_()],ui.prototype,`value`,void 0),L([_()],ui.prototype,`description`,void 0)})))()}var fi,pi,H;function mi(){return(mi=e((()=>{A(),M(),C(),en(),I(),k(),Dn(),E(),Mn(),Nt(),d(),f(),g(),fi=(e,t)=>({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:e,[t]:!0}),pi=class e extends N{constructor(...e){super(...e),this.scrollState={overflow:!1,left:!1,right:!1,rtl:!1},this.aria=new S(this),this.locale=new T(this),this.slots=new Cn(this),this.focused=null,this.previousItems=null,this.movedWith=null,this.mutations=null,this.resize=null,this.handleFocusIn=e=>{let t=e.target;this.focused=t instanceof H&&this.items.includes(t)?t:null},this.handleSelect=e=>{let t=e.target;t instanceof H&&this.items.includes(t)&&!e.defaultPrevented&&queueMicrotask(()=>{e.defaultPrevented||(this.activeValue=t.value)})},this.measure=()=>{let e=this.viewport;if(!e)return;let t=Ke(this)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t},i=this.scrollState;(i.overflow!==r.overflow||i.left!==r.left||i.right!==r.right||i.rtl!==r.rtl)&&(this.scrollState=r)}}static{this.tagName=`minerva-page-tabs`}static{this.styles=[j,x`
:host{
display: block;
min-width: 0;
}
`,F(Hn),F(Tt)]}get items(){return Array.from(this.children).filter(e=>e instanceof H)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`minerva-select`,this.handleSelect),typeof MutationObserver<`u`&&(this.mutations=new MutationObserver(()=>this.itemsChanged()),this.mutations.observe(this,{childList:!0,attributes:!0,attributeFilter:[`value`,`active`,`disabled`],subtree:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`minerva-select`,this.handleSelect),this.mutations?.disconnect(),this.mutations=null,this.resize?.disconnect(),this.resize=null}firstUpdated(){this.observeViewport()}reconnectedCallback(){super.reconnectedCallback(),this.observeViewport()}observeViewport(){this.resize||typeof ResizeObserver>`u`||(this.resize=new ResizeObserver(()=>this.revealActive()),this.resize.observe(this.viewport))}updated(t){D&&!this.aria.label&&P(e.tagName,`set aria-label (e.g. "Open pages") to name the navigation landmark.`),t.has(`activeValue`)&&this.itemsChanged();let n=this.movedWith;if(n){let e=n===`left`?this.leftButton:this.rightButton;if(e?.disabled){this.movedWith=null;let t=this.shadowRoot?.activeElement;(!t||t===e)&&(n===`left`?this.rightButton:this.leftButton)?.focus({preventScroll:!0})}}}itemsChanged(){let e=this.items;if(this.activeValue!==void 0)for(let t of e)t.active=t.value===this.activeValue;let t=JSON.stringify([this.activeValue,...e.map(e=>[e.value,e.active])]);t!==this.previousItems&&(this.previousItems=t,this.revealActive());let n=this.focused;if(n&&!n.isConnected){this.focused=null;let t=document.activeElement;(!t||t===document.body||!t.isConnected)&&e.find(e=>e.active)?.focus({preventScroll:!0})}}revealActive(){let e=this.viewport;if(!e)return;let t=this.items.find(e=>e.active),n=t?.surface;if(t&&!n&&t.updateComplete.then(()=>{t.surface&&this.revealActive()}),n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();r.width>t.width?e.scrollLeft+=r.left-t.left:r.left<t.left?e.scrollLeft-=t.left-r.left:r.right>t.right&&(e.scrollLeft+=r.right-t.right)}this.measure()}move(e){let t=this.viewport;t&&(this.movedWith=e<0?`left`:`right`,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),this.measure())}renderScrollButton(e){let t=e===`left`,n=t?this.scrollLeftLabel??this.locale.t(`pageTabs.scrollLeft`):this.scrollRightLabel??this.locale.t(`pageTabs.scrollRight`),r=t?!this.scrollState.left:!this.scrollState.right;return h`<button
type="button"
part="scroll-button"
class=${y({...fi(r,`scroll`),[`scroll-${e}`]:!0})}
aria-label=${n}
?disabled=${r}
tabindex=${r?-1:0}
@click=${()=>this.move(t?-1:1)}
>
${t?nn:Dt}
</button>`}render(){let{overflow:e,rtl:t}=this.scrollState,n=()=>this.renderScrollButton(`left`),r=()=>this.renderScrollButton(`right`);return h`<nav
part="root"
class="pageTabs"
aria-label=${this.aria.label??m}
>
${e?t?r():n():m}
<div part="viewport" class="viewport" @scroll=${this.measure}>
<div part="list" class="list">
<slot @slotchange=${()=>this.itemsChanged()}></slot>
</div>
</div>
${e?t?n():r():m}
${this.slots.test(`actions`)?h`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:m}
</nav>`}},L([_({reflect:!0,attribute:`active-value`})],pi.prototype,`activeValue`,void 0),L([_({attribute:`scroll-left-label`})],pi.prototype,`scrollLeftLabel`,void 0),L([_({attribute:`scroll-right-label`})],pi.prototype,`scrollRightLabel`,void 0),L([p()],pi.prototype,`scrollState`,void 0),L([v(`.viewport`)],pi.prototype,`viewport`,void 0),L([v(`.scroll-left`)],pi.prototype,`leftButton`,void 0),L([v(`.scroll-right`)],pi.prototype,`rightButton`,void 0),H=class e extends N{constructor(...e){super(...e),this.value=``,this.label=``,this.active=!1,this.disabled=!1,this.closable=!1,this.locale=new T(this),this.slots=new Cn(this)}static{this.tagName=`minerva-page-tab`}static{this.shadowRootOptions={...N.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,x`
:host{
display: contents;
}
.icon ::slotted(svg){
width: 16px;
height: 16px;
}
`,F(Hn),F(Tt)]}get surface(){return this.wrapper??null}focus(e){this.trigger?.focus(e)}handleSelect(){this.disabled||this.emit(`minerva-select`,{value:this.value},{cancelable:!0})}handleClose(){this.emit(`minerva-close`,{value:this.value})}hookStates(){return{current:this.active,disabled:this.disabled}}updated(){D&&!this.label&&P(e.tagName,`set label to name the page.`)}render(){return h`<div
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
title=${this.label||m}
aria-current=${this.active?`page`:m}
?disabled=${this.disabled}
@click=${this.handleSelect}
>
${this.slots.test(`icon`)?h`<span part="icon" class="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:m}
<span part="label" class="label">${this.label}</span>
</button>
${this.closable||this.slots.test(`action`)?h`<span part="action" class="action"
><slot name="action"></slot>${this.closable?h`<button
type="button"
part="close-button"
class=${y(fi(!1,`close`))}
aria-label=${this.closeLabel??this.locale.t(`pageTabs.close`,{label:this.label,defaultValue:`Close {{label}}`})}
@click=${this.handleClose}
>
${qt}
</button>`:m}</span
>`:m}
</div>`}},L([_({reflect:!0})],H.prototype,`value`,void 0),L([_()],H.prototype,`label`,void 0),L([_({type:Boolean,reflect:!0})],H.prototype,`active`,void 0),L([_({type:Boolean,reflect:!0})],H.prototype,`disabled`,void 0),L([_({type:Boolean,reflect:!0})],H.prototype,`closable`,void 0),L([_({attribute:`close-label`})],H.prototype,`closeLabel`,void 0),L([v(`.trigger`)],H.prototype,`trigger`,void 0),L([v(`.pageTab`)],H.prototype,`wrapper`,void 0)})))()}function hi(e,t,n,r){let i=He(t).filter(t=>t===e||!r||!le(r,t)),a=i.indexOf(e);return a===-1?null:(n?i[a-1]:i[a+1])??null}var gi,_i,U;function vi(){return(vi=e((()=>{A(),M(),en(),k(),E(),wr(),Or(),Cr(),Fr(),Nr(),Ft(),sn(),d(),f(),Je(),gi=10,_i=5,U=class e extends N{constructor(...e){super(...e),this.open=!1,this.modal=!1,this.side=`bottom`,this.align=`center`,this.sideOffset=6,this.alignOffset=0,this.collisionPadding=8,this.matchAnchorWidth=!1,this.arrow=!1,this.label=``,this.anchorElement=null,this.anchor=``,this.aria=new S(this),this.presence=new Yt(this,()=>this.panel),this.modalController=new xr(this),this.position=new Tr(this,()=>({placement:ke(this.side,this.align),offset:{mainAxis:this.sideOffset+(this.arrow?_i:0),crossAxis:this.alignOffset},matchAnchorWidth:this.matchAnchorWidth||!1,padding:this.collisionPadding,arrowElement:this.arrow?this.arrowEl??null:null,arrowSize:gi,onPosition:e=>{let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`)}})),this.layer=new yr(this,()=>({disableOutsidePointerEvents:this.modal,branches:()=>[this.triggerElement()],onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onFocusOutside:()=>(this.reason=`focus-outside`,!this.modal),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.focusScope=new jr(this,()=>({trapped:this.modal,loop:this.modal,restoreFocus:this.triggerElement()??!0})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-popover-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)},this.handleKeyDown=e=>{let t=this.panel,n=this.triggerElement();if(this.modal||!t||!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||e.defaultPrevented)return;let r=e.shiftKey,i=Se(document);if(!i||!le(t,i))return;let a=He(t);if(!(a.length===0||(r?i===t||i===a[0]:i===a[a.length-1])))return;e.preventDefault();let o=hi(n,this.tabContainer(),r,this.positioner)??n;this.requestOpenChange(!1,`tab`),this.open||o.focus()}}static{this.tagName=`minerva-popover`}static{this.styles=[j,Sr,x`
:host{
display: contents;
}
`,F(tn)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorTarget(){if(this.anchorElement)return this.anchorElement;if(this.anchor){let e=this.getRootNode().getElementById?.(this.anchor);if(e)return e}return this.triggerElement()??this}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}tabContainer(){return a().find(e=>e.element===this.positioner)?.parent??document.body}syncTrigger(){let e=this.triggerElement();e&&(e.setAttribute(`aria-haspopup`,`dialog`),e.setAttribute(`aria-expanded`,String(this.open)),e.setAttribute(`data-state`,this.open?`open`:`closed`))}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.deactivate(),vt(this.positioner)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}firstUpdated(){D&&!this.triggerElement()&&!this.anchor&&!this.anchorElement&&P(e.tagName,`no slot="trigger" element nor anchor: the panel is anchored to the element itself and nothing opens it.`)}deactivate(){this.focusScope.deactivate(),this.layer.deactivate(),this.modalController.deactivate()}updated(e){this.syncTrigger();let t=this.open||this.presence.present,n=this.positioner;if(t&&n&&!this.position.running){or(n);let e=this.anchorTarget();e&&this.position.start(e,n)}e.has(`open`)&&(this.open&&n?(this.modal&&this.modalController.activate(this),this.layer.activate(n),this.focusScope.activate(n),this.emit(`minerva-after-open`)):this.open||this.deactivate()),this.wasPresent&&!t&&(this.position.end(),vt(n),this.emit(`minerva-after-close`)),this.wasPresent=t}hookStates(){let e=this.position.placement,{side:t,align:n}=me(e);return{state:this.open?`open`:`closed`,side:t,align:n,placement:e}}render(){if(!(this.open||this.presence.present))return h`<slot name="trigger"></slot>`;let{side:e,align:t}=me(this.position.placement),n=this.open?`open`:`closed`,r=this.label||this.aria.label,i=this.isConnected?Ke(this):`ltr`;return h`<slot name="trigger"></slot>
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
aria-modal=${this.modal?`true`:m}
aria-label=${r||m}
tabindex="-1"
dir=${i}
data-state=${n}
data-side=${e}
data-align=${t}
@keydown=${this.handleKeyDown}
>
<slot></slot>
${this.arrow?h`<span part="arrow" class="arrowWrapper" aria-hidden="true">
<svg
class="arrow"
width=${gi}
height=${_i}
viewBox="0 0 30 10"
preserveAspectRatio="none"
>
<polygon points="0,0 30,0 15,10"></polygon>
</svg>
</span>`:m}
</div>
</div>`}},L([_({type:Boolean,reflect:!0})],U.prototype,`open`,void 0),L([_({type:Boolean,reflect:!0})],U.prototype,`modal`,void 0),L([_({reflect:!0})],U.prototype,`side`,void 0),L([_({reflect:!0})],U.prototype,`align`,void 0),L([_({type:Number,attribute:`side-offset`})],U.prototype,`sideOffset`,void 0),L([_({type:Number,attribute:`align-offset`})],U.prototype,`alignOffset`,void 0),L([_({type:Number,attribute:`collision-padding`})],U.prototype,`collisionPadding`,void 0),L([_({attribute:`match-anchor-width`})],U.prototype,`matchAnchorWidth`,void 0),L([_({type:Boolean,reflect:!0})],U.prototype,`arrow`,void 0),L([_()],U.prototype,`label`,void 0),L([_({attribute:!1})],U.prototype,`anchorElement`,void 0),L([_()],U.prototype,`anchor`,void 0),L([v(`.positioner`)],U.prototype,`positioner`,void 0),L([v(`.content`)],U.prototype,`panel`,void 0),L([v(`[part=arrow]`)],U.prototype,`arrowEl`,void 0)})))()}var yi;function bi(){return(bi=e((()=>{yi=`minerva-prose{min-width:0;max-width:100%;color:var(--text-color,#1f2937);font-family:var(--font-family-sans,system-ui, -apple-system, "Segoe UI", sans-serif);font-size:var(--prose-font-size,var(--font-size-lg,1rem));font-weight:var(--font-weight-regular,400);font-style:normal;line-height:var(--line-height-relaxed,1.7);letter-spacing:0;overflow-wrap:anywhere}minerva-prose :where(h1,h2,h3,h4,h5,h6){color:inherit;font-family:inherit;font-style:inherit;font-weight:var(--font-weight-semibold,600);letter-spacing:0;background:0 0;border:0;margin:1.5em 0 .5em;padding:0;line-height:1.35}minerva-prose :where(h1){font-size:var(--font-size-3xl,1.75rem)}minerva-prose :where(h2){font-size:var(--font-size-2xl,1.375rem)}minerva-prose :where(h3){font-size:var(--font-size-xl,1.125rem)}minerva-prose :where(h4){font-size:var(--font-size-lg,1rem)}minerva-prose :where(h5,h6){font-size:var(--font-size-md,.875rem)}minerva-prose :where(h6){color:var(--text-muted-color,#6b7280)}minerva-prose :where(p,ul,ol,li,blockquote){font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;line-height:inherit;letter-spacing:inherit}minerva-prose :where(p){background:0 0;border:0;padding:0}minerva-prose :where(p,ul,ol,blockquote,pre,table,figure){margin:1em 0}minerva-prose>:first-child{margin-top:0}minerva-prose>:last-child{margin-bottom:0}minerva-prose :where(ul,ol){padding:0;padding-inline-start:1.5em}minerva-prose :where(li){margin:.25em 0}minerva-prose :where(li>ul,li>ol,li>p){margin-block:.25em}minerva-prose :where(blockquote){border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-code-bg,var(--control-color,#f6f7f9));color:inherit;border:1px solid #0000;padding:.5em 1em}minerva-prose :where(a){color:var(--primary-color-text,#1e4fbd);text-underline-offset:.18em;text-decoration:underline;text-decoration-thickness:1px}minerva-prose :where(a:hover){text-decoration-thickness:2px}minerva-prose :where(a:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:3px}minerva-prose :where(code,kbd,samp){font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);font-size:.875em}minerva-prose :where(code){border-radius:calc(var(--prose-radius,var(--radius-sm,4px)) - 1px);background:var(--prose-code-bg,var(--control-color,#f6f7f9));padding:.12em .3em}minerva-prose :where(pre){max-width:100%;padding:var(--space-4,1rem);border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-pre-bg,var(--surface-elevated-color,#fff));color:var(--text-color,#1f2937);font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);line-height:var(--line-height-base,1.5);white-space:pre;overflow-wrap:normal;tab-size:2;overflow-x:auto}minerva-prose :where(pre code){color:inherit;white-space:pre;background:0 0;border:0;border-radius:0;padding:0}minerva-prose :where(pre:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:2px}minerva-prose :where(.hljs-comment,.hljs-quote){color:var(--text-muted-color,#6b7280)}minerva-prose :where(.hljs-keyword,.hljs-selector-tag,.hljs-name,.hljs-tag,.hljs-attr,.hljs-attribute,.hljs-doctag){color:var(--primary-color-text,#1e4fbd)}minerva-prose :where(.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-regexp,.hljs-type,.hljs-literal){color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-number,.hljs-title,.hljs-section,.hljs-built_in,.hljs-meta,.hljs-variable){color:var(--warning-color-text,#b45309)}minerva-prose :where(.hljs-subst,.hljs-operator,.hljs-punctuation,.hljs-params){color:var(--text-color,#1f2937)}minerva-prose :where(.hljs-addition){background:var(--success-color-subtle,#e7f6ec);color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-deletion){background:var(--danger-color-subtle,#fcebeb);color:var(--danger-color-text,#b91c1c)}minerva-prose :where(.hljs-strong){font-weight:var(--font-weight-bold,700)}minerva-prose :where(.hljs-emphasis){font-style:italic}minerva-prose :where(mark){background:var(--warning-color-subtle,#fdf3e1);color:inherit}minerva-prose :where(img,video){max-width:100%;height:auto}minerva-prose :where(figure){max-width:100%}minerva-prose :where(figcaption){margin-top:var(--space-2,.5rem);font-size:var(--font-size-md,.875rem);color:var(--text-muted-color,#6b7280)}minerva-prose :where(table){border-collapse:collapse;width:100%;color:inherit;overflow-wrap:normal;display:table}minerva-prose :where(tr){background:0 0;border:0}minerva-prose :where(th,td){border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));text-align:start;vertical-align:top;white-space:normal;padding:.5em .75em}minerva-prose :where(th){background:var(--prose-code-bg,var(--control-color,#f6f7f9));font-weight:var(--font-weight-semibold,600)}minerva-prose :where(th>p,td>p){margin:0}minerva-prose :where(hr){background:var(--prose-border-color,var(--border-color,#d9dde3));border:0;height:1px;margin:1.5em 0;padding:0}@media (forced-colors:active){minerva-prose :where(hr){forced-color-adjust:none;background:canvastext}}minerva-prose :where(sub,sup){font-size:.75em;line-height:0}@media print{minerva-prose :where(pre){overflow:visible}minerva-prose :where(pre,pre code){white-space:pre-wrap;overflow-wrap:anywhere}minerva-prose :where(pre,blockquote,figure,img,tr){break-inside:avoid}}`})))()}function xi(){if(Ti!==void 0)return Ti;Ti=null;try{if(typeof CSSStyleSheet<`u`&&`replaceSync`in CSSStyleSheet.prototype){let e=new CSSStyleSheet;e.replaceSync(yi),Ti=e}}catch{Ti=null}return Ti}function Si(e){if(wi.has(e))return;wi.add(e);let t=xi();if(t&&`adoptedStyleSheets`in e)try{e.adoptedStyleSheets=[...e.adoptedStyleSheets,t];return}catch{}let n=e.nodeType===9?e:e.ownerDocument;if(!n)return;let r=e.nodeType===9?n.head??n.documentElement:e;if(r.querySelector?.(`#${Ci}`))return;let i=n.createElement(`style`);i.id=Ci,i.textContent=yi,r.appendChild(i)}var Ci,wi,Ti,Ei;function Di(){return(Di=e((()=>{k(),bi(),d(),Ci=`minerva-prose-styles`,wi=new WeakSet,Ei=class extends N{static{this.tagName=`minerva-prose`}static{this.styles=[j,x`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback();let e=this.getRootNode();(e.nodeType===9||e.nodeType===11)&&Si(e)}render(){return h`<slot></slot>`}}})))()}var Oi,W,ki;function Ai(){return(Ai=e((()=>{Bt(),A(),M(),C(),en(),I(),rr(),k(),Dn(),E(),En(),Et(),Pr(),d(),f(),g(),Oi=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Home`,`End`]),W=class extends N{constructor(...e){super(...e),this.hostInternals=ur(this),this.ownedAria=new Set,this.value=``,this.checked=!1,this.disabled=!1,this.label=``,this.size=`medium`,this.color=`primary`,this.error=!1,this.helperText=``,this.errorMessage=``,this.slots=new Cn(this),this.ownsDescription=!1,this.handleClick=e=>{if(this.isDisabled){e.preventDefault(),e.stopImmediatePropagation();return}this.group||this.checked||(this.checked=!0,this.emit(`minerva-change`,{checked:!0,value:this.value}))},this.handleKeyDown=e=>{e.key===` `&&(e.preventDefault(),this.isDisabled||this.click())}}static{this.tagName=`minerva-radio`}static{this.styles=[j,x`
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
`,F(rn)]}get group(){let e=this.parentElement?.closest(`minerva-radio-group`);return e instanceof ki?e:null}get isDisabled(){return this.disabled||!!this.group?.isDisabled}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick),this.addEventListener(`keydown`,this.handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.removeEventListener(`keydown`,this.handleKeyDown)}updated(){let e=this.isDisabled;Ut(this,this.hostInternals,{role:`radio`,ariaChecked:String(this.checked),ariaDisabled:e?`true`:null},this.ownedAria),this.group||w(this,`tabindex`,e?`-1`:`0`);let t=this.error?this.errorMessage:this.helperText;t&&(this.ownsDescription||!this.hasAttribute(`aria-description`))?(this.ownsDescription=!0,w(this,`aria-description`,t)):!t&&this.ownsDescription&&(this.ownsDescription=!1,w(this,`aria-description`,null))}hookStates(){let e=this.group;return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error,size:e?.size??this.size,color:e?.color??this.color}}render(){let e=this.group,t=e?.size??this.size,n=e?.color??this.color,r=this.error?this.errorMessage:this.helperText,i=!!this.label||this.slots.test(`[default]`);return h`<div
part="root"
class=${y({radioWrapper:!0,[t]:!0,[n]:!0,error:this.error})}
>
<span class=${y({radio:!0,disabled:this.isDisabled})}>
<input
type="radio"
class="input"
tabindex="-1"
aria-hidden="true"
inert
.checked=${this.checked}
/>
<span class="radioMark" part="control"></span>
${i?h`<span class="label" part="label"
>${this.label||h`<slot></slot>`}</span
>`:m}
</span>
${r?h`<div class="helperTextWrapper" aria-hidden="true">
${this.error&&this.errorMessage?h`<span class="errorIcon">${Gt}</span>`:m}
<span
part="helper-text"
class=${y({helperText:!0,errorText:this.error})}
>${r}</span
>
</div>`:m}
</div>`}},L([_()],W.prototype,`value`,void 0),L([_({type:Boolean,reflect:!0})],W.prototype,`checked`,void 0),L([_({type:Boolean,reflect:!0})],W.prototype,`disabled`,void 0),L([_()],W.prototype,`label`,void 0),L([_({reflect:!0})],W.prototype,`size`,void 0),L([_({reflect:!0})],W.prototype,`color`,void 0),L([_({type:Boolean,reflect:!0})],W.prototype,`error`,void 0),L([_({attribute:`helper-text`})],W.prototype,`helperText`,void 0),L([_({attribute:`error-message`})],W.prototype,`errorMessage`,void 0),ki=class e extends O{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.label=``,this.helperText=``,this.error=!1,this.direction=`vertical`,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.roving=new kr(this,()=>({getItems:()=>this.radios,isItemDisabled:e=>this.isDisabled||e.disabled,orientation:`both`,dir:Ke(this),loop:!0})),this.observer=null,this.dirty=!1,this.rovingAttached=!1,this.settleQueued=!1,this.handleClick=e=>{let t=e.target?.closest?.(`minerva-radio`);t instanceof W&&t.group===this&&this.select(t)},this.handleKeyDown=e=>{if(!e.defaultPrevented||!Oi.has(e.key))return;let t=this.roving.getActive();t instanceof W&&this.select(t)}}static{this.tagName=`minerva-radio-group`}static{this.dependencies=[W]}static{this.styles=[j,x`
:host{
display: block;
}
`,F(rn)]}get radios(){return Array.from(this.querySelectorAll(`minerva-radio`)).filter(e=>e instanceof W&&e.group===this)}focus(e){let t=this.radios;(t.find(e=>e.checked&&!e.disabled)??t.find(e=>!e.disabled))?.focus(e)}connectedCallback(){super.connectedCallback(),Ln(this)||this.attachRoving(),this.addEventListener(`click`,this.handleClick),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0}))}attachRoving(){this.rovingAttached||(this.rovingAttached=!0,this.roving.attach(this),this.addEventListener(`keydown`,this.handleKeyDown))}disconnectedCallback(){super.disconnectedCallback(),this.rovingAttached=!1,this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.observer?.disconnect(),this.observer=null}getFormValue(){return this.value===``?null:this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.radioMissing`),anchor:this.radios.find(e=>!e.disabled)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`?this.value=e:e===null&&(this.value=``)}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){super.updated(t);let n=this.radios,r;for(let e of n)e.checked=this.value!==``&&e.value===this.value,e.checked&&(r??=e),e.requestUpdate();this.syncRoving(n,r),D&&this.value!==``&&n.length>0&&!r&&P(e.tagName,`value "${this.value}" matches no <minerva-radio> of the group.`)}syncRoving(e,t){let n=[this,...e].find(Ln);if(n){this.settleQueued||(this.settleQueued=!0,Lt(n,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.attachRoving(),t&&!t.disabled&&!this.isDisabled?this.roving.setActive(t,{focus:!1}):this.roving.refresh();for(let t of e)(this.isDisabled||t.disabled)&&t.setAttribute(`tabindex`,`-1`)}select(e){this.isDisabled||e.disabled||e.value===this.value||(this.dirty=!0,this.value=e.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}hookStates(){return{disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,required:this.required,orientation:this.direction,size:this.size,color:this.color}}render(){let e=this.error||this.aria.attr(`aria-invalid`)===`true`,t=this.label,n=[this.helperText,this.aria.description].filter(Boolean).join(` `);return h`<div
part="root"
class=${y({radioGroupWrapper:!0,error:e})}
>
${t?h`<div id="label" part="label" class="groupLabel">${t}</div>`:m}
<div
part="list"
class=${y({radioGroup:!0,[this.direction]:!0})}
role="radiogroup"
aria-labelledby=${t?`label`:m}
aria-label=${t?m:this.aria.label??m}
aria-description=${n||m}
aria-required=${this.required?`true`:`false`}
aria-invalid=${e?`true`:`false`}
aria-disabled=${this.isDisabled?`true`:m}
>
<slot></slot>
</div>
${this.helperText?h`<div
part="helper-text"
aria-hidden="true"
class=${y({helperText:!0,errorText:e})}
>
${this.helperText}
</div>`:m}
</div>`}},L([_({attribute:!1})],ki.prototype,`value`,void 0),L([_({attribute:`value`})],ki.prototype,`defaultValue`,void 0),L([_()],ki.prototype,`label`,void 0),L([_({attribute:`helper-text`})],ki.prototype,`helperText`,void 0),L([_({type:Boolean,reflect:!0})],ki.prototype,`error`,void 0),L([_({reflect:!0})],ki.prototype,`direction`,void 0),L([_({reflect:!0})],ki.prototype,`size`,void 0),L([_({reflect:!0})],ki.prototype,`color`,void 0)})))()}var ji,Mi,Ni,Pi,Fi;function Ii(){return(Ii=e((()=>{A(),M(),C(),I(),kn(),k(),E(),En(),Ar(),gt(),d(),f(),g(),Qe(),Je(),u(),ji={small:12,medium:16,large:20},Mi=Array.from({length:5},(e,t)=>t),Ni=x`
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
`,Pi=class e extends O{constructor(...e){super(...e),this.value=0,this.defaultValue=0,this.max=10,this.size=`medium`,this.showValue=!1,this.interactive=!1,this.readOnly=!1,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.dirty=!1,this.rating=new br(this,o(this.ratingProps()))}static{this.tagName=`minerva-rating`}static{this.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,x`
:host{
display: inline-flex;
vertical-align: middle;
}
`,F(dr),Ni]}ratingProps(){return{value:this.value,max:this.max,readOnly:!this.isInteractive,onValueChange:e=>this.commit(e)}}send(e){this.rating.sync(this.ratingProps()),this.rating.send(e)}get isInteractive(){return this.interactive&&!this.readOnly&&!this.isDisabled}focus(e){this.root?.focus(e)}blur(){this.root?.blur()}getFormValue(){return String(this.value)}getValidity(){return this.required&&!(this.value>0)?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.root}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){if(typeof e==`string`&&e.trim()!==``){let t=Number(e);Number.isFinite(t)&&(this.value=t)}}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),D&&(t.has(`value`)||t.has(`max`))&&(this.value<0||this.value>this.max)&&P(e.tagName,`value (${this.value}) is outside 0..max (${this.max}).`),this.rating.sync(this.ratingProps())}commit(e){e!==this.value&&(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleStarClick(e,t){if(!this.isInteractive)return;let n=e.currentTarget.getBoundingClientRect(),r=e.clientX-n.left<n.width/2;this.send({type:`PICK`,index:t,half:r})}handleKeyDown(e){if(e.defaultPrevented||!this.isInteractive)return;let t=Te(e.key,this);De(t,this.value,this.max)!==null&&(e.preventDefault(),this.send({type:`KEY`,key:t}))}hookStates(){return{readonly:!this.isInteractive,size:this.size}}renderStar(e,t){let n=b({width:`${t}px`,height:`${t}px`,fontSize:`${t}px`}),r=_n(`star`,{fill:e});return e===`half`?h`<span part=${r} class="star half" style=${n}
><span class="halfBase">${$t}</span
><span class="halfFill">${ar}</span></span
>`:h`<span
part=${r}
class=${y({star:!0,[e]:!0})}
style=${n}
>${$t}</span
>`}render(){let e=this.isInteractive,{value:t,max:n}=this,r=this.rating.machine.project(this.rating.state,this.ratingProps()),i=se(r,n),a=e=>i[e],o=ji[this.size]??ji.medium,s=this.aria.label??`${t.toFixed(1)} / ${n}`,c=h`<span class="stars" part="stars" aria-hidden="true">
${Mi.map(t=>e?h`<button
type="button"
tabindex="-1"
class="starButton"
@click=${e=>this.handleStarClick(e,t)}
@mouseenter=${()=>this.send({type:`HOVER`,index:t})}
>
${this.renderStar(a(t),o)}
</button>`:this.renderStar(a(t),o))}
</span>`,l=this.showValue?h`<span class="value" part="value"
><strong>${t.toFixed(1)}</strong>${this.ratingCount===void 0?m:h`<span class="count" part="count"
>(${this.ratingCount.toLocaleString(`en-US`)})</span
>`}</span
>`:m,ee=y({rating:!0,[this.size]:!0,interactive:e});return e?h`<span
part="root"
class=${ee}
role="slider"
tabindex="0"
aria-label=${s}
aria-description=${this.aria.description??m}
aria-valuenow=${t}
aria-valuemin="0"
aria-valuemax=${n}
aria-required=${this.required?`true`:m}
@keydown=${this.handleKeyDown}
@mouseleave=${()=>this.send({type:`HOVER_END`})}
>${c}${l}</span
>`:h`<span
part="root"
class=${ee}
role="img"
aria-label=${s}
aria-description=${this.aria.description??m}
aria-disabled=${this.isDisabled?`true`:m}
>${c}${l}</span
>`}},L([_({attribute:!1})],Pi.prototype,`value`,void 0),L([_({type:Number,attribute:`value`})],Pi.prototype,`defaultValue`,void 0),L([_({type:Number})],Pi.prototype,`max`,void 0),L([_({reflect:!0})],Pi.prototype,`size`,void 0),L([_({type:Boolean,attribute:`show-value`})],Pi.prototype,`showValue`,void 0),L([_({type:Number,attribute:`rating-count`})],Pi.prototype,`ratingCount`,void 0),L([_({type:Boolean,reflect:!0})],Pi.prototype,`interactive`,void 0),L([_({type:Boolean,reflect:!0,attribute:`readonly`})],Pi.prototype,`readOnly`,void 0),L([v(`.rating`)],Pi.prototype,`root`,void 0),Fi=class extends N{constructor(...e){super(...e),this.dimensions=[],this.max=10,this.size=`medium`,this.interactive=!1,this.readOnly=!1,this.hideValue=!1}static{this.tagName=`minerva-rating-scale`}static{this.dependencies=[Pi]}static{this.styles=[j,x`
:host{
display: block;
}
`,F(dr)]}handleChange(e,t){e.stopPropagation();let{value:n}=e.detail;this.dimensions=this.dimensions.map(e=>e.key===t?{...e,value:n}:e),this.emit(`minerva-change`,{key:t,value:n,dimensions:this.dimensions})}hookStates(){return{readonly:!this.interactive||this.readOnly,size:this.size}}render(){return h`<div class="scale" part="root">
${this.dimensions.map(e=>h`<div class="scaleRow" part="row" title=${e.hint??m}>
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
</div>`}},L([_({attribute:!1})],Fi.prototype,`dimensions`,void 0),L([_({type:Number})],Fi.prototype,`max`,void 0),L([_({reflect:!0})],Fi.prototype,`size`,void 0),L([_({type:Boolean,reflect:!0})],Fi.prototype,`interactive`,void 0),L([_({type:Boolean,reflect:!0,attribute:`readonly`})],Fi.prototype,`readOnly`,void 0),L([_({type:Boolean,attribute:`hide-value`})],Fi.prototype,`hideValue`,void 0)})))()}var Li,Ri,zi,Bi,Vi;function Hi(){return(Hi=e((()=>{Bt(),A(),M(),C(),rr(),k(),E(),Jt(),d(),f(),Li=0,Ri=class e extends N{constructor(...e){super(...e),this.internals=ur(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.label=``,this.selected=!1,this.highlighted=!1}static{this.tagName=`minerva-option`}static{this.styles=[j,x`
:host{
display: block;
outline: none;
}
`,F(Pt)]}get text(){return this.textValue??(this.label||this.textContent?.trim()||``)}get displayLabel(){return this.label||this.textContent?.trim()||``}connectedCallback(){super.connectedCallback(),Ut(this,this.internals,{role:`option`},this.ownedAria)}updated(t){super.updated(t),Ut(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),w(this,`data-highlighted`,this.highlighted),w(this,`data-disabled`,this.disabled),w(this,`data-selected`,this.selected),D&&t.has(`value`)&&this.value===``&&this.isConnected&&P(e.tagName,`an option needs a non-empty "value" (the empty value means "nothing selected").`)}hookStates(){return{selected:this.selected,highlighted:this.highlighted,disabled:this.disabled}}render(){return h`<div
part="root"
class="item"
?data-selected=${this.selected}
?data-highlighted=${this.highlighted}
?data-disabled=${this.disabled}
>
<span class="itemText" part="label"><slot></slot></span>
${this.selected?h`<span class="itemIndicator" part="indicator" aria-hidden="true"
>${cn}</span
>`:m}
</div>`}},L([_({reflect:!0})],Ri.prototype,`value`,void 0),L([_({type:Boolean,reflect:!0})],Ri.prototype,`disabled`,void 0),L([_()],Ri.prototype,`label`,void 0),L([_({attribute:`text-value`})],Ri.prototype,`textValue`,void 0),L([_({type:Boolean,attribute:!1})],Ri.prototype,`selected`,void 0),L([_({type:Boolean,attribute:!1})],Ri.prototype,`highlighted`,void 0),zi=class extends N{constructor(...e){super(...e),this.internals=ur(this),this.observer=null}static{this.tagName=`minerva-option-group`}static{this.styles=[j,x`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback(),Ut(this,this.internals,{role:`group`}),this.syncLabel(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.syncLabel()),this.observer.observe(this,{childList:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}syncLabel(){let e=this.querySelector(`:scope > minerva-select-label`);if(e){let t=Ct(e,`id`);t||(t=`minerva-select-label-${Li++}`,w(e,`id`,t,this)),w(this,`aria-labelledby`,t)}else w(this,`aria-labelledby`,null)}render(){return h`<div part="root"><slot></slot></div>`}},Bi=class extends N{static{this.tagName=`minerva-select-label`}static{this.styles=[j,x`
:host{
display: block;
}
`,F(Pt)]}render(){return h`<div class="label" part="root"><slot></slot></div>`}},Vi=class extends N{constructor(...e){super(...e),this.internals=ur(this)}static{this.tagName=`minerva-select-separator`}static{this.styles=[j,x`
:host{
display: block;
}
`,F(Pt)]}connectedCallback(){super.connectedCallback(),Ut(this,this.internals,{ariaHidden:`true`})}render(){return h`<div class="separator" part="root"></div>`}}})))()}var Ui,Wi,Gi,Ki,qi,G;function Ji(){return(Ji=e((()=>{A(),M(),C(),I(),kn(),k(),E(),Fr(),En(),Jt(),Hi(),d(),f(),g(),Je(),u(),Ui=10,Wi=e=>Array.isArray(e.options),Gi=e=>e.getAttribute(`aria-disabled`)===`true`,Ki=e=>e instanceof Ri?e.value:e.dataset.value??``,qi=e=>e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey,G=class e extends O{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.highlighted=null,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.typeahead=Le(),this.floating=new Dr(this,()=>({anchor:()=>this.trigger,floating:()=>this.positioner,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,fitViewportHeight:!0,branches:()=>[this.trigger],onDismiss:()=>this.requestOpen(!1),returnFocusOnEscape:()=>this.trigger,focusable:!0,onPosition:()=>this.syncHookStates()})),this.openIntent=`selected`,this.scrollPending=!1,this.dirty=!1,this.observer=null}static{this.tagName=`minerva-select`}static{this.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,Sr,x`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,F(Pt)]}focus(e){this.trigger?.focus(e)}blur(){this.trigger?.blur()}show(){this.open=!0}hide(){this.open=!1}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:[`value`,`disabled`,`label`,`text-value`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.typeahead.reset()}get lightOptions(){return Array.from(this.querySelectorAll(`minerva-option`)).filter(e=>e instanceof Ri)}get dataOptions(){return(this.options??[]).flatMap(e=>Wi(e)?e.options:[e])}get items(){return[...this.dataOptions.map(e=>({value:e.value,disabled:!!e.disabled,text:e.textValue??e.label,label:e.label})),...this.lightOptions.map(e=>({value:e.value,disabled:e.disabled,text:e.text,label:e.displayLabel}))]}getOptions(){let e=this.listbox;return e?[...Array.from(e.querySelectorAll(`[role=option]`)),...this.lightOptions]:[]}findOption(e){if(e!==null)return this.getOptions().find(t=>Ki(t)===e)}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.trigger}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}requestOpen(e){e!==this.open&&(e&&this.isDisabled||this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}openWith(e){this.openIntent=e,this.requestOpen(!0)}close(e){e&&this.trigger?.focus(),this.requestOpen(!1)}commitValue(e){e!==this.value&&(this.value=e,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}selectValue(e){this.commitValue(e),this.close(!0)}willUpdate(e){if(e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open){let e=this.openIntent;this.openIntent=`selected`;let t=this.items.filter(e=>!e.disabled),n=e===`last`?t[t.length-1]:e===`first`?t[0]:t.find(e=>e.value===this.value)??t[0];this.typeahead.reset(),this.scrollPending=!0,this.highlighted=n?.value??null}e.has(`open`)&&!this.open&&(this.highlighted=null)}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?me(e):{side:void 0,align:void 0};return{state:this.open?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,required:this.required,size:this.size,side:t,align:n,placement:e}}updated(e){super.updated(e);for(let e of this.lightOptions)e.selected=e.value===this.value,e.highlighted=this.open&&e.value===this.highlighted;if(this.floating.sync(this.open),this.open&&this.listbox){if(e.has(`open`)||e.has(`highlighted`)){let e=this.findOption(this.highlighted)??this.listbox;e.getRootNode()===this.shadowRoot?this.shadowRoot?.activeElement!==e&&e.focus({preventScroll:!0}):document.activeElement!==e&&(e.hasAttribute(`tabindex`)||(e.tabIndex=-1),e.focus({preventScroll:!0}))}this.scrollPending&&(this.scrollPending=!1,this.findOption(this.highlighted)?.scrollIntoView?.({block:`nearest`}))}D&&this.checkOptions()}checkOptions(){let t=this.items;if(t.length===0)return;let n=new Set;for(let r of t)n.has(r.value)&&P(e.tagName,`several options have the value "${r.value}"; option values must be unique.`),n.add(r.value);this.value!==``&&!n.has(this.value)&&P(e.tagName,`value "${this.value}" does not match any option.`)}handleTriggerKeyDown(e){if(this.open)return;let{key:t}=e;if(qi(e)&&(t!==` `||this.typeahead.getBuffer()!==``)){let n=this.items,r=this.typeahead.search(t,n,n.findIndex(e=>e.value===this.value));e.preventDefault(),r!==-1&&this.commitValue(n[r].value);return}let n={Enter:`selected`," ":`selected`,ArrowDown:`selected`,ArrowUp:this.value===``?`last`:`selected`,Home:`first`,End:`last`};t in n&&(e.preventDefault(),this.openWith(n[t]))}handleListboxKeyDown(e){let{key:t}=e;if(t===`Tab`){this.close(!0);return}let n=this.getOptions(),r=n.findIndex(e=>Ki(e)===this.highlighted),i=r===-1?void 0:n[r],a=()=>{i&&!Gi(i)&&this.selectValue(Ki(i))};if(t===`Enter`||t===`ArrowUp`&&e.altKey){e.preventDefault(),a();return}if(t===` `&&this.typeahead.getBuffer()===``){e.preventDefault(),a();return}if(e.ctrlKey||e.metaKey||e.altKey)return;let o=Oe({currentIndex:r,count:n.length,key:t,loop:!1,isDisabled:e=>Gi(n[e]),pageSize:Ui});if((o!==null||t.startsWith(`Arrow`)||t.startsWith(`Page`))&&e.preventDefault(),o===null&&qi(e)){let i=this.typeahead.search(t,n.map(e=>({text:e instanceof Ri?e.text:e.dataset.textValue??e.textContent??``,disabled:Gi(e)})),r);i!==-1&&(e.preventDefault(),this.scrollPending=!0,this.highlighted=Ki(n[i]));return}o!==null&&(this.typeahead.reset(),this.scrollPending=!0,this.highlighted=Ki(n[o]))}optionFromEvent(e){let t=this.getOptions();return e.composedPath().find(e=>t.includes(e))}handleListboxPointerMove(e){let t=this.optionFromEvent(e);if(!t||Gi(t))return;let n=Ki(t);this.highlighted!==n&&(this.scrollPending=!1,this.highlighted=n)}handleListboxClick(e){let t=this.optionFromEvent(e);t&&!Gi(t)&&this.selectValue(Ki(t))}renderDataOption(e){let t=e.value===this.value,n=this.highlighted===e.value,r=!!e.disabled;return h`<div
part=${_n(`item`,{selected:t,highlighted:n,disabled:r})}
class="item"
role="option"
tabindex="-1"
aria-selected=${String(t)}
aria-disabled=${e.disabled?`true`:m}
?data-selected=${t}
?data-highlighted=${n}
?data-disabled=${r}
data-value=${e.value}
data-text-value=${e.textValue??m}
>
<span class="itemText">${e.label}</span>
${t?h`<span class="itemIndicator" aria-hidden="true"
>${cn}</span
>`:m}
</div>`}renderDataOptions(){return(this.options??[]).map((e,t)=>{if(!Wi(e))return this.renderDataOption(e);let n=`group-label-${t}`;return h`<div role="group" aria-labelledby=${n}>
<div id=${n} class="label" part="group-label">${e.label}</div>
${e.options.map(e=>this.renderDataOption(e))}
</div>`})}render(){let e=this.isDisabled,t=this.value===``,n=t?void 0:this.items.find(e=>e.value===this.value),r=this.aria.label,{side:i,align:a}=me(this.floating.position.placement);return h`<button
part="root"
type="button"
role="combobox"
aria-haspopup="listbox"
aria-expanded=${String(this.open)}
aria-controls=${this.open?`listbox`:m}
aria-autocomplete="none"
aria-label=${r??m}
aria-description=${this.aria.description??m}
aria-required=${this.required?`true`:m}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:m}
?disabled=${e}
data-state=${this.open?`open`:`closed`}
?data-placeholder=${t}
data-component="select"
class=${y({trigger:!0,[this.size]:!0,invalid:this.invalid})}
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
>${an}</span
>
</button>
${this.open?h`<div class="positioner" popover="manual" data-side=${i}>
<div
id="listbox"
part="content"
role="listbox"
tabindex="-1"
aria-label=${r??m}
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
</div>`:m}`}},L([_({attribute:!1})],G.prototype,`value`,void 0),L([_({attribute:`value`})],G.prototype,`defaultValue`,void 0),L([_({attribute:!1})],G.prototype,`options`,void 0),L([_({type:Boolean,reflect:!0})],G.prototype,`open`,void 0),L([_()],G.prototype,`placeholder`,void 0),L([_({reflect:!0})],G.prototype,`size`,void 0),L([_({type:Boolean,reflect:!0})],G.prototype,`invalid`,void 0),L([p()],G.prototype,`highlighted`,void 0),L([v(`.trigger`)],G.prototype,`trigger`,void 0),L([v(`.positioner`)],G.prototype,`positioner`,void 0),L([v(`[role=listbox]`)],G.prototype,`listbox`,void 0)})))()}var Yi,Xi,Zi,K,Qi;function $i(){return($i=e((()=>{A(),M(),I(),k(),E(),kt(),d(),f(),g(),Qe(),Yi=e=>e==null||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Xi=e=>typeof e!=`number`&&!/^\d+(\.\d+)?$/.test(e)?e:`var(--space-${String(e).replace(`.`,`-`)})`,Zi=[j,x`

:host(:dir(rtl)) .animation-wave{
animation-direction: reverse;
}
`],K=class e extends N{constructor(...e){super(...e),this.variant=`text`,this.animation=`pulse`,this.loaded=!1,this.decorative=!1,this.lines=1,this.avatar=!1,this.avatarSize=`40`,this.avatarShape=`circle`,this.active=!1,this.paragraph=!1,this.heading=!1,this.locale=new T(this),this.aria=new S(this)}static{this.tagName=`minerva-skeleton`}static{this.styles=[...Zi,x`
:host{
display: block;
}
:host([decorative][variant="circular"]){
display: inline-block;
vertical-align: middle;
}
`,F(St)]}hookStates(){return{variant:this.variant}}updated(t){D&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&P(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}block(e,t,n={}){return h`<div
part=${e}
class=${y({skeleton:!0,[`animation-${this.animation}`]:!0,...t})}
style=${b(n)}
></div>`}renderAvatar(){if(!this.avatar)return m;let e=Yi(this.avatarSize);return this.block(`avatar`,{avatar:!0,[`avatar-${this.avatarShape}`]:!0},{width:e,height:e})}renderTitle(){return this.heading?this.block(`title`,{title:!0}):m}renderParagraph(){return this.paragraph?h`<div class="paragraph">
${[`100%`,`100%`,`92%`,`60%`].map(e=>this.block(`line`,{},{width:e,height:`16px`}))}
</div>`:m}renderLines(){if(this.paragraph||this.heading)return m;let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return Array.from({length:e},()=>this.block(`line`,{[this.variant]:!0},{width:Yi(this.width),height:Yi(this.height),borderRadius:Yi(this.borderRadius)}))}render(){if(this.loaded)return h`<slot></slot>`;if(this.decorative){let e=this.variant===`circular`?Yi(this.size??this.width??`32`):void 0;return h`<span
part="root"
aria-hidden="true"
class=${y({skeleton:!0,decorative:!0,[this.variant]:!0,[`animation-${this.animation}`]:!0})}
style=${b({width:e??Yi(this.width),height:e??Yi(this.height),borderRadius:Yi(this.borderRadius)})}
></span>`}let e=this.variant===`card`?h`<div class=${y({card:!0,active:this.active})}>
${this.renderAvatar()}
<div class="cardContent">
${this.renderTitle()} ${this.renderParagraph()}
</div>
</div>`:h`${this.renderAvatar()}
<div class="content">
${this.renderTitle()} ${this.renderLines()}
${this.renderParagraph()}
</div>`;return h`<div
part="root"
role="status"
aria-busy="true"
aria-label=${this.aria.label??this.locale.t(`common.loading`)}
class=${y({skeletonRoot:!0,withAvatar:this.avatar})}
>
${e}
</div>`}},L([_({reflect:!0})],K.prototype,`variant`,void 0),L([_({reflect:!0})],K.prototype,`animation`,void 0),L([_({type:Boolean,reflect:!0})],K.prototype,`loaded`,void 0),L([_({type:Boolean,reflect:!0})],K.prototype,`decorative`,void 0),L([_()],K.prototype,`size`,void 0),L([_()],K.prototype,`width`,void 0),L([_()],K.prototype,`height`,void 0),L([_({attribute:`border-radius`})],K.prototype,`borderRadius`,void 0),L([_({type:Number})],K.prototype,`lines`,void 0),L([_({type:Boolean})],K.prototype,`avatar`,void 0),L([_({attribute:`avatar-size`})],K.prototype,`avatarSize`,void 0),L([_({attribute:`avatar-shape`})],K.prototype,`avatarShape`,void 0),L([_({type:Boolean})],K.prototype,`active`,void 0),L([_({type:Boolean})],K.prototype,`paragraph`,void 0),L([_({type:Boolean})],K.prototype,`heading`,void 0),Qi=class e extends N{constructor(...e){super(...e),this.lines=3,this.lineHeight=`1em`,this.gap=`2`,this.noShrinkLast=!1,this.animation=`pulse`}static{this.tagName=`minerva-skeleton-text`}static{this.styles=[...Zi,x`
:host{
display: block;
}
`,F(St)]}updated(t){D&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&P(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}render(){let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return h`<div
part="root"
aria-hidden="true"
class="skeletonText"
style=${b({gap:Xi(this.gap)})}
>
${Array.from({length:e},(t,n)=>h`<span
part="line"
class="skeleton decorative text animation-${this.animation}"
style=${b({height:Yi(this.lineHeight),width:!this.noShrinkLast&&n===e-1?`70%`:`100%`})}
></span>`)}
</div>`}},L([_({type:Number})],Qi.prototype,`lines`,void 0),L([_({attribute:`line-height`})],Qi.prototype,`lineHeight`,void 0),L([_()],Qi.prototype,`gap`,void 0),L([_({type:Boolean,attribute:`no-shrink-last`})],Qi.prototype,`noShrinkLast`,void 0),L([_({reflect:!0})],Qi.prototype,`animation`,void 0)})))()}var ea,ta;function na(){return(na=e((()=>{M(),k(),Dn(),E(),pr(),Wt(),d(),f(),g(),Qe(),ea=320,ta=class e extends N{constructor(...e){super(...e),this.asideWidth=ea,this.collapseBelow=`md`,this.gap=6,this.slots=new Cn(this)}static{this.tagName=`minerva-split-layout`}static{this.styles=[j,x`
:host{
display: block;
min-width: 0;
}
`,F(Rt)]}get validAsideWidth(){return Number.isFinite(this.asideWidth)&&this.asideWidth>0}updated(){D&&!this.validAsideWidth&&P(e.tagName,`aside-width must be a finite positive number (got ${String(this.asideWidth)}); using ${ea}.`)}render(){let e=this.slots.test(`aside`),t=this.validAsideWidth?this.asideWidth:ea;return h`<div
class="root"
part="root"
style=${b({"--split-layout-aside-width":`${t}px`,"--split-layout-gap":qe(this.gap)})}
>
<div
class=${y({grid:!0,[this.collapseBelow]:!0,hasAside:e})}
>
<div class="main" part="main"><slot></slot></div>
${e?h`<div class="aside" part="aside">
<slot name="aside"></slot>
</div>`:m}
</div>
</div>`}},L([_({type:Number,attribute:`aside-width`})],ta.prototype,`asideWidth`,void 0),L([_({attribute:`collapse-below`,reflect:!0})],ta.prototype,`collapseBelow`,void 0),L([_({converter:mr})],ta.prototype,`gap`,void 0)})))()}var ra,ia,aa,oa,sa,ca,la,ua;function da(){return(da=e((()=>{A(),M(),k(),Dn(),E(),pr(),It(),d(),f(),g(),Qe(),ra={start:`flex-start`,center:`center`,end:`flex-end`,stretch:`stretch`,baseline:`baseline`},ia={start:`flex-start`,center:`center`,end:`flex-end`,between:`space-between`,around:`space-around`,evenly:`space-evenly`},aa=()=>typeof HTMLSlotElement<`u`&&typeof HTMLSlotElement.prototype.assign==`function`,oa=`minerva-stack-item-`,sa=e=>Array.from(e.childNodes).filter(e=>e.nodeType===1||e.nodeType===3&&!!e.textContent?.trim()),ca=class extends N{constructor(...e){super(...e),this.direction=`column`,this.wrap=!1,this.attached=!1,this.aria=new S(this),this.slots=new Cn(this),this.manualSlots=!1,this.fallbackSlotted=new Set}static{this.tagName=`minerva-stack`}static{this.styles=[j,x`
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
`,F(Fn)]}get resolvedDirection(){return this.direction}get resolvedAlign(){return this.align}createRenderRoot(){if(!this.shadowRoot){this.manualSlots=aa();let e=this.constructor;this.attachShadow({...e.shadowRootOptions,slotAssignment:this.manualSlots?`manual`:`named`})}return super.createRenderRoot()}renderSeparator(){let e=this.separator;return typeof e==`function`?e():e}get hasSeparator(){let e=this.separator;return e!=null&&e!==``}fallbackItems(){return Array.from(this.children).filter(e=>{let t=e.getAttribute(`slot`);return t===null||this.fallbackSlotted.has(e)&&t!==``})}releaseFallbackSlots(e=[]){for(let t of this.fallbackSlotted)e.includes(t)||(t.getAttribute(`slot`)?.startsWith(oa)&&t.removeAttribute(`slot`),this.fallbackSlotted.delete(t))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this.releaseFallbackSlots()}updated(){if(this.manualSlots){let e=sa(this),t=Array.from(this.renderRoot.querySelectorAll(`slot`));t.length===1?t[0].assign(...e):t.forEach((t,n)=>t.assign(e[n]))}else if(this.hasSeparator){let e=this.fallbackItems();e.forEach((e,t)=>{let n=`${oa}${t}`;this.fallbackSlotted.add(e),e.getAttribute(`slot`)!==n&&e.setAttribute(`slot`,n)}),this.releaseFallbackSlots(e)}else this.releaseFallbackSlots();D&&this.attached&&!this.aria.label&&P(this.constructor.tagName,`attached stacks are exposed as role="group": set aria-label (or aria-labelledby) to name the group.`)}renderItems(){return this.hasSeparator?this.manualSlots?Array.from({length:sa(this).length},(e,t)=>h`${t>0?this.renderSeparator():m}<slot></slot>`):h`${Array.from({length:this.fallbackItems().length},(e,t)=>h`${t>0?this.renderSeparator():m}<slot
name=${`${oa}${t}`}
></slot>`)}<slot></slot>`:h`<slot></slot>`}hookStates(){return{orientation:this.resolvedDirection.startsWith(`row`)?`horizontal`:`vertical`}}render(){this.slots;let e=this.resolvedDirection,t=this.resolvedAlign,n={};return this.gap!==void 0&&this.gap!==``&&!this.attached&&(n.gap=qe(this.gap)),t&&ra[t]&&(n.alignItems=ra[t]),this.justify&&ia[this.justify]&&(n.justifyContent=ia[this.justify]),h`<div
part="root"
class=${y({stack:!0,[e]:!0,wrap:this.wrap,attached:this.attached})}
style=${b(n)}
role=${this.attached?`group`:m}
aria-label=${this.attached?this.aria.label??m:m}
>
${this.renderItems()}
</div>`}},L([_({reflect:!0})],ca.prototype,`direction`,void 0),L([_({converter:mr})],ca.prototype,`gap`,void 0),L([_({reflect:!0})],ca.prototype,`align`,void 0),L([_({reflect:!0})],ca.prototype,`justify`,void 0),L([_({type:Boolean,reflect:!0})],ca.prototype,`wrap`,void 0),L([_({attribute:`separator`})],ca.prototype,`separator`,void 0),L([_({type:Boolean,reflect:!0})],ca.prototype,`attached`,void 0),la=class extends ca{static{this.tagName=`minerva-hstack`}constructor(){super(),this.direction=`row`}get resolvedDirection(){return`row`}hookStates(){return{}}get resolvedAlign(){return this.align??`center`}},ua=class extends ca{static{this.tagName=`minerva-vstack`}constructor(){super(),this.direction=`column`}get resolvedDirection(){return`column`}hookStates(){return{}}get resolvedAlign(){return this.align??`stretch`}}})))()}var fa;function pa(){return(pa=e((()=>{A(),M(),I(),kn(),k(),E(),ht(),d(),f(),g(),nt(),fa=class e extends N{constructor(...e){super(...e),this.items=[],this.value=``,this.navigable=!1,this.locale=new T(this),this.aria=new S(this)}static{this.tagName=`minerva-steps`}static{this.styles=[j,x`
:host{
display: block;
}
`,F(Rn)]}select(e){e.disabled||e.value===this.value||this.emit(`minerva-change`,{value:e.value},{cancelable:!0})&&(this.value=e.value)}updated(){D&&this.value&&this.items.length&&!this.items.some(e=>e.value===this.value)&&P(e.tagName,`value "${this.value}" matches no step: no step is marked current.`)}hookStates(){return{readonly:!this.navigable}}render(){let e=this.items??[],t=e.findIndex(e=>e.value===this.value),n=!this.navigable;return h`<ol
part="root"
class="steps"
aria-label=${this.aria.label??this.locale.t(`steps.label`)}
>
${$e(e,e=>e.value,(e,r)=>{let i=r===t,a=t>-1&&r<t,o=h`<span
part="indicator"
class="number"
aria-hidden="true"
>${r+1}</span
><span part="label" class="label">${e.label}</span>`,s=i?void 0:a?`complete`:`upcoming`;return h`<li
part=${_n(`item`,{current:i,disabled:!n&&!!e.disabled,status:s})}
class=${y({step:!0,current:i,complete:a})}
aria-current=${n&&i?`step`:m}
>
${n?h`<span part="button" class="button static"
>${o}</span
>`:h`<button
type="button"
part="button"
class="button"
?disabled=${!!e.disabled}
aria-current=${i?`step`:m}
@click=${()=>this.select(e)}
>
${o}
</button>`}
</li>`})}
</ol>`}},L([_({attribute:!1})],fa.prototype,`items`,void 0),L([_({reflect:!0})],fa.prototype,`value`,void 0),L([_({type:Boolean,reflect:!0})],fa.prototype,`navigable`,void 0)})))()}var ma,ha,q;function ga(){return(ga=e((()=>{A(),M(),I(),k(),Dn(),E(),En(),Vt(),d(),f(),g(),tt(),ma=400,ha={start:`labelStart`,end:`labelEnd`,top:`labelTop`,bottom:`labelBottom`},q=class e extends O{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.value=`on`,this.label=``,this.offLabel=``,this.onLabel=``,this.variant=`slider`,this.size=`medium`,this.color=`primary`,this.shape=`round`,this.labelPlacement=`end`,this.iconPlacement=`start`,this.loading=!1,this.noRipple=!1,this.readOnly=!1,this.invalid=!1,this.rippleActive=!1,this.dirty=!1,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.slots=new Cn(this)}static{this.tagName=`minerva-switch`}static{this.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,x`
:host{
display: inline-flex;
vertical-align: middle;
}
`,F(yt)]}get bilateral(){return!!this.offLabel&&!!this.onLabel}get segmented(){return this.variant===`segmented`&&this.bilateral}get blocked(){return this.isDisabled||this.loading||this.readOnly}focus(e){if(this.segmented){this.renderRoot.querySelector(`.segmentActive`)?.focus(e);return}this.input?.focus(e)}blur(){(this.shadowRoot?.activeElement)?.blur()}click(){this.input?.click()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(t){t.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked),D&&t.has(`variant`)&&this.variant===`segmented`&&!this.bilateral&&P(e.tagName,`variant="segmented" needs both off-label and on-label; rendering a slider.`)}handleChange(){if(this.blocked){this.input.checked=this.checked;return}this.dirty=!0,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value})}handleKeyDown(e){e.key===`Enter`&&(e.preventDefault(),!this.blocked&&this.input.click())}handleClick(e){if(this.readOnly){e.preventDefault();return}this.noRipple||this.blocked||(clearTimeout(this.rippleTimer),this.rippleActive=!0,this.rippleTimer=setTimeout(()=>this.rippleActive=!1,ma))}setState(e){this.blocked||e===this.checked||this.input.click()}hookStates(){return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,loading:this.loading,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape,variant:this.segmented?`segmented`:`slider`}}renderInput(e){let t=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return h`<input
part="input"
type="checkbox"
role=${e?m:`switch`}
class=${e?`hiddenInput`:``}
.checked=${et(this.checked)}
?disabled=${this.isDisabled||this.loading}
?required=${this.required}
tabindex=${e?`-1`:m}
aria-hidden=${e?`true`:m}
aria-label=${e?m:this.aria.label??m}
aria-description=${e?m:this.aria.description??m}
aria-checked=${e?m:String(this.checked)}
aria-disabled=${!e&&(this.isDisabled||this.loading)?`true`:m}
aria-busy=${this.loading?`true`:m}
aria-invalid=${!e&&t?`true`:m}
aria-readonly=${!e&&this.readOnly?`true`:m}
aria-required=${!e&&this.required?`true`:m}
@change=${this.handleChange}
@click=${this.handleClick}
@keydown=${this.handleKeyDown}
/>`}render(){let e=this.blocked,t=this.isDisabled;if(this.segmented)return h`<span
part="root"
role="group"
aria-label=${this.aria.label??m}
aria-description=${this.aria.description??m}
aria-disabled=${e?`true`:m}
class=${y({segmented:!0,[this.size]:!0,[this.color]:!0,disabled:e})}
>
${this.renderInput(!0)}
${[!1,!0].map(t=>{let n=this.checked===t;return h`<button
part="segment"
type="button"
class=${y({segment:!0,segmentActive:n})}
?disabled=${e}
aria-pressed=${String(n)}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`})}
</span>`;let n=this.bilateral,r=this.slots.test(`icon`),i=y({switch:!0,[this.size]:!0,[ha[this.labelPlacement]]:!n,[this.color]:!0,checked:this.checked,checkedLarge:this.checked&&this.size===`large`,disabled:t,loading:this.loading,square:this.shape===`square`,ripple:!this.noRipple&&this.rippleActive,bilateral:n}),a=h`<span class="switchBase" part="control">
${this.renderInput(!1)}
<span class="track" part="track"></span>
<span class="thumb" part="thumb"
>${this.iconPlacement===`start`&&r?h`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:m}</span
>
${this.noRipple?m:h`<span class="rippleEffect"></span>`}
</span>`,o=this.iconPlacement===`end`&&r?h`<span class="icon" part="icon"><slot name="icon"></slot></span>`:m;if(n){let t=t=>h`<button
part="side"
type="button"
class=${y({side:!0,sideActive:this.checked===t})}
?disabled=${e}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`;return h`<span part="root" class=${i}
>${t(!1)}${a}${t(!0)}${o}</span
>`}let s=this.label||this.slots.test(`[default]`)?h`<span class="label" part="label"
>${this.label||h`<slot></slot>`}</span
>`:m,c=this.labelPlacement===`start`||this.labelPlacement===`top`;return h`<label part="root" class=${i}
>${c?s:m}${a}${o}${c?m:s}</label
>`}},L([_({attribute:!1})],q.prototype,`checked`,void 0),L([_({type:Boolean,attribute:`checked`,reflect:!0})],q.prototype,`defaultChecked`,void 0),L([_()],q.prototype,`value`,void 0),L([_()],q.prototype,`label`,void 0),L([_({attribute:`off-label`})],q.prototype,`offLabel`,void 0),L([_({attribute:`on-label`})],q.prototype,`onLabel`,void 0),L([_({reflect:!0})],q.prototype,`variant`,void 0),L([_({reflect:!0})],q.prototype,`size`,void 0),L([_({reflect:!0})],q.prototype,`color`,void 0),L([_({reflect:!0})],q.prototype,`shape`,void 0),L([_({attribute:`label-placement`,reflect:!0})],q.prototype,`labelPlacement`,void 0),L([_({attribute:`icon-placement`})],q.prototype,`iconPlacement`,void 0),L([_({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),L([_({type:Boolean,attribute:`no-ripple`})],q.prototype,`noRipple`,void 0),L([_({type:Boolean,reflect:!0,attribute:`readonly`})],q.prototype,`readOnly`,void 0),L([_({type:Boolean,reflect:!0})],q.prototype,`invalid`,void 0),L([p()],q.prototype,`rippleActive`,void 0),L([v(`input`)],q.prototype,`input`,void 0)})))()}var _a,va,ya,ba,xa;function Sa(){return(Sa=e((()=>{Bt(),A(),M(),en(),rr(),k(),E(),Ar(),Pr(),bt(),d(),f(),g(),u(),_a=0,va=e=>e.parentElement?.closest(`minerva-tabs`)??null,ya=class e extends N{constructor(...e){super(...e),this.variant=`line`,this.color=`primary`,this.orientation=`horizontal`,this.activationMode=`automatic`,this.noLoop=!1,this.label=``,this.aria=new S(this),this.baseId=`minerva-tabs-${++_a}`,this.rovingKey=``,this.observer=null,this.settleQueued=!1,this.roving=new kr(this,()=>({getItems:()=>this.tabs,orientation:this.orientation,dir:Ke(this),loop:!this.noLoop})),this.machine=new br(this,ie(this.tabsProps()),()=>!1),this.handleKeyDownCapture=()=>this.ensureRoving(),this.handleFocusIn=e=>{let t=this.tabs.find(t=>t===e.target);t&&this.send({type:`FOCUS`,value:t.value,disabled:t.disabled})}}static{this.tagName=`minerva-tabs`}static{this.styles=[j,x`
:host{
display: block;
min-width: 0;
}
`,F(Qt)]}get tabs(){return Array.from(this.querySelectorAll(`minerva-tab`)).filter(e=>va(e)===this)}get panels(){return Array.from(this.querySelectorAll(`minerva-tab-panel`)).filter(e=>va(e)===this)}tabsProps(){return{value:this.value,activationMode:this.activationMode,onValueChange:e=>this.apply(e)}}send(e){this.machine.sync(this.tabsProps()),this.machine.send(e)}apply(e){this.emit(`minerva-change`,{value:e},{cancelable:!0})&&(this.value=e)}select(e){this.send({type:`SELECT`,value:e,disabled:!1})}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`value`,`disabled`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.rovingKey=``}updated(t){t.has(`value`)&&D&&this.value!==void 0&&this.tabs.length>0&&!this.tabs.some(e=>e.value===this.value)&&P(e.tagName,`value "${this.value}" does not match any <minerva-tab>.`),this.sync()}ensureRoving(){if(!this.tablist)return;let e=`${this.orientation}|${Ke(this)}|${this.noLoop}`;e!==this.rovingKey&&(this.rovingKey=e,this.roving.detach(),this.roving.attach(this.tablist))}sync(){if(!this.tablist)return;let e=this.tabs,t=this.panels,n=new Map;for(let t of e)n.set(t,t.id||`${this.baseId}-tab-${t.value}`),t.id||w(t,`id`,n.get(t),this);for(let e of t)n.set(e,e.id||`${this.baseId}-panel-${e.value}`),e.id||w(e,`id`,n.get(e),this);for(let r of e){let e=t.find(e=>e.value===r.value);r.sync(this,r.value===this.value,e&&n.get(e))}for(let r of t){let t=e.find(e=>e.value===r.value);r.sync(this,r.value===this.value,t&&n.get(t))}let i=[this,...e,...t].find(Ln);if(i){this.settleQueued||(this.settleQueued=!0,Lt(i,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.ensureRoving();let a=r(e,this.value);a?this.roving.setActive(a,{focus:!1}):this.roving.refresh()}hookStates(){return{orientation:this.orientation,variant:this.variant,color:this.color}}render(){return h`<div
part="root"
class=${y({tabs:!0,[this.color]:!0,vertical:this.orientation===`vertical`})}
data-orientation=${this.orientation}
@keydown=${{handleEvent:this.handleKeyDownCapture,capture:!0}}
>
<div
part="list"
role="tablist"
aria-label=${this.label||this.aria.label||m}
aria-orientation=${this.orientation}
data-orientation=${this.orientation}
class=${y({list:!0,[`${this.variant}List`]:!0,verticalList:this.orientation===`vertical`})}
@focusin=${this.handleFocusIn}
>
<slot name="tab" @slotchange=${()=>this.sync()}></slot>
</div>
<slot @slotchange=${()=>this.sync()}></slot>
</div>`}},L([_({reflect:!0})],ya.prototype,`value`,void 0),L([_({reflect:!0})],ya.prototype,`variant`,void 0),L([_({reflect:!0})],ya.prototype,`color`,void 0),L([_({reflect:!0})],ya.prototype,`orientation`,void 0),L([_({reflect:!0,attribute:`activation-mode`})],ya.prototype,`activationMode`,void 0),L([_({type:Boolean,reflect:!0,attribute:`no-loop`})],ya.prototype,`noLoop`,void 0),L([_()],ya.prototype,`label`,void 0),L([v(`[role="tablist"]`)],ya.prototype,`tablist`,void 0),ba=class extends N{constructor(...e){super(...e),this.internals=ur(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.selected=!1,this.group=null,this.handleMouseDown=e=>{if(this.disabled){e.preventDefault();return}e.button===0&&!e.ctrlKey?this.select():e.preventDefault()},this.handleKeyDown=e=>{e.defaultPrevented||this.disabled||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),this.select())},this.handleClick=e=>{!this.disabled&&e.detail===0&&this.select()}}static{this.tagName=`minerva-tab`}static{this.styles=[j,x`
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
`,F(Qt)]}sync(e,t,n){this.group=e,this.selected=t,w(this,`aria-controls`,n??null),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.hasAttribute(`slot`)||w(this,`slot`,`tab`),Ut(this,this.internals,{role:`tab`},this.ownedAria),this.addEventListener(`mousedown`,this.handleMouseDown),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`mousedown`,this.handleMouseDown),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.group=null}select(){(this.group??va(this))?.select(this.value)}updated(){Ut(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),w(this,`data-state`,this.selected?`active`:`inactive`),w(this,`data-disabled`,this.disabled);let e=this.group?.orientation??`horizontal`;w(this,`data-orientation`,e)}hookStates(){return{state:this.selected?`active`:`inactive`,disabled:this.disabled,orientation:this.group?.orientation??`horizontal`,variant:this.group?.variant??`line`,color:this.color}}render(){let e=this.group,t=e?.variant??`line`,n=e?.orientation===`vertical`;return h`<span
part="root"
class=${y({trigger:!0,[`${t}Trigger`]:!0,verticalTrigger:n,[this.color??``]:!!this.color,colored:!!this.color})}
data-state=${this.selected?`active`:`inactive`}
data-orientation=${e?.orientation??`horizontal`}
><slot></slot
></span>`}},L([_({reflect:!0})],ba.prototype,`value`,void 0),L([_({type:Boolean,reflect:!0})],ba.prototype,`disabled`,void 0),L([_({reflect:!0})],ba.prototype,`color`,void 0),L([_({type:Boolean,reflect:!0})],ba.prototype,`selected`,void 0),xa=class extends N{constructor(...e){super(...e),this.internals=ur(this),this.value=``,this.forceMount=!1,this.orientation=`horizontal`,this.selected=!1,this.stamped=[]}static{this.tagName=`minerva-tab-panel`}static{this.styles=[j,x`
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
`,F(Qt)]}get template(){return Array.from(this.children).find(e=>e instanceof HTMLTemplateElement)??null}syncContent(){if(Ln(this))return;let e=this.template;if(this.selected||this.forceMount){if(e&&!this.stamped.length){let t=this.ownerDocument.importNode(e.content,!0);this.stamped=Array.from(t.childNodes),e.after(t)}return}for(let e of this.stamped)e.parentNode?.removeChild(e);this.stamped=[]}sync(e,t,n){this.orientation=e.orientation,this.selected=t,w(this,`hidden`,!t),this.syncContent(),w(this,`data-state`,t?`active`:`inactive`),w(this,`data-orientation`,e.orientation),w(this,`aria-labelledby`,n??null),this.requestUpdate()}willUpdate(e){e.has(`forceMount`)&&this.hasUpdated&&this.syncContent()}connectedCallback(){super.connectedCallback(),Ut(this,this.internals,{role:`tabpanel`}),this.hasAttribute(`tabindex`)||w(this,`tabindex`,`0`)}hookStates(){return{state:this.selected?`active`:`inactive`,orientation:this.orientation}}render(){return h`<div
part="root"
class="panel"
data-orientation=${this.orientation}
?hidden=${!this.selected&&Ln(this)&&!!va(this)}
>
<slot></slot>
</div>`}},L([_({reflect:!0})],xa.prototype,`value`,void 0),L([_({type:Boolean,reflect:!0,attribute:`force-mount`})],xa.prototype,`forceMount`,void 0)})))()}var Ca,J;function wa(){return(wa=e((()=>{A(),M(),C(),I(),k(),Dn(),E(),ir(),d(),f(),g(),Qe(),nt(),Ca=600,J=class e extends N{constructor(...e){super(...e),this.color=`neutral`,this.variant=`subtle`,this.size=`medium`,this.shape=`rounded`,this.closable=!1,this.clickable=!1,this.toggle=!1,this.loading=!1,this.elevation=!1,this.disabled=!1,this.noRipple=!1,this.ripples=[],this.nextRippleId=0,this.rippleTimers=new Set,this.locale=new T(this),this.aria=new S(this),this.slots=new Cn(this)}static{this.tagName=`minerva-tag`}static{this.shadowRootOptions={...N.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,x`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
.closeIcon svg{
display: block;
}
`,F(_t)]}focus(e){(this.actionButton??this.closeButton)?.focus(e)}disconnectedCallback(){super.disconnectedCallback(),this.rippleTimers.forEach(clearTimeout),this.rippleTimers.clear(),this.ripples=[]}labelText(){return Array.from(this.childNodes).filter(e=>e.nodeType===3||e.nodeType===1&&!e.hasAttribute(`slot`)).map(e=>e.textContent??``).join(``).replace(/\s+/g,` `).trim()}get inactive(){return this.disabled||this.loading}handleClick(e){this.inactive||(this.addRipple(e),this.toggle&&(this.pressed=!this.pressed,this.emit(`minerva-change`,{pressed:this.pressed})))}handleClose(e){e.stopPropagation(),!this.disabled&&this.emit(`minerva-close`,{})}addRipple(e){if(this.noRipple)return;let t=e.currentTarget.parentElement;if(!t)return;let n=t.getBoundingClientRect(),r=e.detail===0,i=Math.max(n.width,n.height),a=i/2,o=this.nextRippleId++,s=r?n.width/2-a:e.clientX-n.left-a,c=r?n.height/2-a:e.clientY-n.top-a;this.ripples=[...this.ripples,{id:o,style:{width:`${i}px`,height:`${i}px`,left:`${s}px`,top:`${c}px`}}];let l=setTimeout(()=>{this.rippleTimers.delete(l),this.ripples=this.ripples.filter(e=>e.id!==o)},Ca);this.rippleTimers.add(l)}hookStates(){return{state:this.clickable&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){D&&(this.toggle||this.pressed!==void 0)&&!this.clickable&&P(e.tagName,`pressed / toggle require clickable: the tag is not a button otherwise.`)}render(){let e=this.toggle||this.pressed!==void 0,t=this.closable?this.labelText():``,n=this.closeLabel??(t?this.locale.t(`tag.closeWithLabel`,{label:t}):this.locale.t(`tag.close`)),r=h`${this.loading?h`<span
class="spinner"
part="spinner"
aria-hidden="true"
></span>`:h`${this.slots.test(`icon`)?h`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:m}${this.slots.test(`avatar`)?h`<span class="avatar" part="avatar"
><slot name="avatar"></slot
></span>`:m}`}<span class="content" part="label"><slot></slot></span>`;return h`<div
part="root"
class=${y({tag:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,[this.shape]:!0,clickable:this.clickable&&!this.inactive,pressed:this.clickable&&!!this.pressed,elevation:this.elevation,disabled:this.disabled,loading:this.loading})}
aria-busy=${this.loading?`true`:m}
data-component="tag"
>
${this.clickable?h`<button
type="button"
part="action"
class="action"
?disabled=${this.inactive}
aria-pressed=${e?String(!!this.pressed):m}
aria-label=${this.aria.label??m}
aria-description=${this.aria.description??m}
@click=${this.handleClick}
>
${r}
</button>`:r}
${this.closable&&!this.loading?h`<button
type="button"
part="close-button"
class="closeIcon"
?disabled=${this.disabled}
aria-label=${n}
title=${n}
@click=${this.handleClose}
>
<slot name="close-icon">${qt}</slot>
</button>`:m}
${$e(this.ripples,e=>e.id,e=>h`<span class="ripple" style=${b(e.style)}></span>`)}
</div>`}},L([_({reflect:!0})],J.prototype,`color`,void 0),L([_({reflect:!0})],J.prototype,`variant`,void 0),L([_({reflect:!0})],J.prototype,`size`,void 0),L([_({reflect:!0})],J.prototype,`shape`,void 0),L([_({type:Boolean,reflect:!0})],J.prototype,`closable`,void 0),L([_({type:Boolean,reflect:!0})],J.prototype,`clickable`,void 0),L([_({type:Boolean,reflect:!0})],J.prototype,`pressed`,void 0),L([_({type:Boolean,reflect:!0})],J.prototype,`toggle`,void 0),L([_({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),L([_({type:Boolean,reflect:!0})],J.prototype,`elevation`,void 0),L([_({type:Boolean,reflect:!0})],J.prototype,`disabled`,void 0),L([_({attribute:`close-label`})],J.prototype,`closeLabel`,void 0),L([_({type:Boolean,attribute:`no-ripple`})],J.prototype,`noRipple`,void 0),L([p()],J.prototype,`ripples`,void 0),L([v(`.action`)],J.prototype,`actionButton`,void 0),L([v(`.closeIcon`)],J.prototype,`closeButton`,void 0)})))()}function Ta(e,t){try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>typeof e==`string`)}catch{}return D&&P(Oa,`the ${t} attribute is not a JSON array of strings.`),null}function Ea(e,t){let n=(e??``).trim();return n?n.startsWith(`[`)?Ta(n,t)??[]:n.split(`,`).map(e=>e.trim()).filter(Boolean):[]}function Da(e){let t=(e??``).trim();return t?t.startsWith(`[`)?Ta(t,`separators`)??[...ue]:t.split(/\s+/):[]}var Oa,ka,Aa,ja,Y;function Ma(){return(Ma=e((()=>{A(),M(),C(),I(),kn(),k(),E(),Mn(),Fr(),tr(),En(),ir(),Xt(),d(),f(),g(),Je(),u(),tt(),nt(),Oa=`minerva-tag-input`,ka=`Enter`,Aa=[`\r
`,`
`,`\r`],ja=0,Y=class extends O{constructor(...e){super(...e),this._value=[],this.defaultValue=[],this.options=[],this.separators=[...ue],this.noCommitOnBlur=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.draft=``,this.requestedOpen=!1,this.highlight=0,this.listId=`minerva-tag-input-list-${ja++}`,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.floating=new Dr(this,()=>({anchor:()=>this.combobox,floating:()=>this.list,branches:()=>[this],placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`exact`,onDismiss:()=>this.setOpen(!1)})),this.dirty=!1,this.composing=!1,this.navigating=!1,this.highlightKey=``}static{this.tagName=Oa}static{this.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,Sr,x`
:host{
display: block;
min-width: 0;
}
`,F(_t),F(Hn),F(`.combobox { ${Bn.replace(/@charset[^;]*;/g,``)} }`),F(sr),x`

.combobox > .root{
flex-direction: row;
gap: 0;
}

.list{
inset: auto;
}
`]}get value(){return this._value}set value(e){this.dirty=!0,this.setValue(e)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}setValue(e){let t=this._value;this._value=Array.isArray(e)?e.map(String):typeof e==`string`?Ea(e,`value`):[],this.requestUpdate(`value`,t)}get blocked(){return this.isDisabled||this.readOnly}get isOpen(){return this.requestedOpen&&!this.blocked}get filtered(){let e=this.value,t=this.draft.trim(),n=[...new Set(this.options.map(e=>e.trim()).filter(Boolean))].filter(t=>!e.includes(t)),r=n.map(e=>({tag:e,label:e,filterValue:e}));t&&!e.includes(t)&&!n.includes(t)&&r.unshift({tag:t,label:this.createLabel?this.createLabel(t):this.locale.t(`tagInput.create`,{tag:t}),filterValue:t});let i=t.toLowerCase();return i?r.filter(e=>e.filterValue.toLowerCase().includes(i)):r}get enterCommits(){return this.separators.includes(ka)}get splitters(){return this.separators.filter(e=>e!==ka&&e!==``)}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.value)e.append(this.name,t);return e}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.setValue([...this.defaultValue]),this.draft=``,this.requestedOpen=!1,this.navigating=!1}restoreFormState(e){e instanceof FormData?this.value=e.getAll(this.name).filter(e=>typeof e==`string`):typeof e==`string`&&(this.value=[e])}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&this.setValue([...this.defaultValue]),this.blocked&&(this.requestedOpen=!1);let t=`${this.filtered.length}\u0000${this.draft}`;if(t!==this.highlightKey&&(this.highlightKey=t,this.highlight=0),D&&e.has(`value`)){let e=new Set,t=this.value.find(t=>e.size===e.add(t).size);t!==void 0&&P(Oa,`value contains the tag "${t}" more than once: tags are unique (removing one removes its position only).`)}}updated(e){super.updated(e),this.floating.sync(this.isOpen),this.input?.toggleAttribute(ne,!this.isOpen&&this.draft!==``)}setOpen(e){e&&this.blocked||e!==this.requestedOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.requestedOpen=e)}setTags(e){this.value=e,this.emit(`minerva-change`,{value:[...e]})}setDraft(e){this.draft=e,this.input&&this.input.value!==e&&(this.input.value=e)}commitAll(e,t=``){if(this.blocked||this.composing)return;let n=this.value,r=[...n];for(let t of e){let e=t.trim();e&&!r.includes(e)&&r.push(e)}r.length!==n.length&&this.setTags(r),this.navigating=!1,this.setDraft(t)}commit(e){this.commitAll([e])}select(e){this.commit(e.tag),this.setOpen(!1)}removeAt(e){this.blocked||(this.setTags(this.value.filter((t,n)=>n!==e)),this.input?.focus())}handleInput(){let e=this.input.value;if(this.blocked){this.input.value=this.draft;return}this.navigating=!1;let t=this.splitters,n=this.composing||t.length===0?[e]:s(e,t);n.length>1?this.commitAll(n.slice(0,-1),n[n.length-1]):this.draft=e,this.setOpen(!0),this.emit(`minerva-input`,{value:this.draft})}handlePaste(e){if(this.blocked||this.composing)return;let t=e.clipboardData?.getData(`text`)??``,n=this.enterCommits?[...this.splitters,...Aa]:this.splitters;if(!n.some(e=>t.includes(e)))return;e.preventDefault();let r=this.draft,i=this.input.selectionStart??r.length,a=this.input.selectionEnd??r.length,o=r.slice(0,i)+t+r.slice(a);this.commitAll(s(o,n)),this.setOpen(!1)}handleKeyDown(e){if(this.blocked||this.composing||e.isComposing||e.keyCode===229)return;let t=this.filtered,n=t.length,r=this.isOpen,i=this.draft.trim(),a=this.value;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),this.navigating=!0,this.setOpen(!0),n>0){let t=e.key===`ArrowDown`?1:-1;this.highlight=(this.highlight+t+n)%n}break;case`Enter`:e.preventDefault(),this.enterCommits?!this.navigating&&(!i||a.includes(i))?this.commit(this.draft):r&&t[this.highlight]?this.select(t[this.highlight]):(this.commit(this.draft),this.setOpen(!1)):this.navigating&&r&&t[this.highlight]&&this.select(t[this.highlight]);break;case`Escape`:this.navigating=!1,this.setDraft(``),r&&!e.defaultPrevented&&(e.preventDefault(),this.setOpen(!1));break;case`Backspace`:this.draft===``&&a.length>0&&(e.preventDefault(),this.setTags(a.slice(0,-1)))}}handleFocus(){this.blocked||this.setOpen(!0)}handleBlur(){this.setOpen(!1),this.noCommitOnBlur||this.commit(this.draft)}clearAll(){this.setDraft(``),this.setTags([]),this.emit(`minerva-clear`),this.input?.focus()}renderTag(e,t){let n=this.isDisabled,r=this.removeLabel?this.removeLabel(e):this.locale.t(`tagInput.remove`,{tag:e});return h`<div
part="tag"
class=${y({tag:!0,neutral:!0,subtle:!0,large:!0,rounded:!0,disabled:n})}
data-component="tag"
>
<span class="content"><span class="label">${e}</span></span>
${this.readOnly?m:h`<button
part="remove-button"
type="button"
class="closeIcon"
aria-label=${r}
title=${r}
?disabled=${n}
@click=${e=>{e.stopPropagation(),this.removeAt(t)}}
>
${qt}
</button>`}
</div>`}hookStates(){return{state:this.isOpen?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,readonly:this.readOnly,required:this.required,size:this.size}}renderList(e){let t=this.aria.label;return h`<ul
part="list"
id=${this.listId}
role="listbox"
popover="manual"
aria-label=${t??m}
class="list"
>
${e.length===0?h`<li class="empty" part="empty" role="presentation">
${this.emptyText??this.locale.t(`tagInput.empty`)}
</li>`:m}
${e.map((e,t)=>h`<li
part=${_n(`option`,{highlighted:t===this.highlight})}
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
</ul>`}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.value,r=this.isOpen,i=this.filtered,a=this.draft.trim(),o=r?i[this.highlight]:void 0,s=e=>e.preventDefault();return h`<div part="root" class="root">
${n.length>0?h`<div part="tags" class="values">
${$e(n,(e,t)=>`${t}-${e}`,(e,t)=>this.renderTag(e,t))}
</div>`:m}
<div class="entry">
<div class="combobox">
<div
part="control"
class=${y({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
type="text"
role="combobox"
aria-label=${this.aria.label??m}
aria-description=${this.aria.description??m}
aria-expanded=${r?`true`:`false`}
aria-controls=${r?this.listId:m}
aria-autocomplete="list"
aria-activedescendant=${o?`${this.listId}-option-${this.highlight}`:m}
aria-invalid=${this.invalid?`true`:m}
aria-required=${this.required?`true`:m}
autocomplete="off"
spellcheck="false"
placeholder=${this.placeholder||m}
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
${r?this.renderList(i):m}
</div>
${this.readOnly?m:h`<button
part="add-button"
type="button"
class=${y({iconButton:!0,neutral:!0,"variant-ghost":!0,medium:!0,square:!0,disabled:t||!a||n.includes(a)})}
aria-label=${this.addLabel??e(`tagInput.add`)}
?disabled=${t||!a||n.includes(a)}
@mousedown=${s}
@click=${()=>{this.commit(this.draft),this.input?.focus()}}
>
${un}
</button>
<button
part="clear-button"
type="button"
class=${y({iconButton:!0,neutral:!0,"variant-ghost":!0,medium:!0,square:!0,disabled:t||n.length===0})}
aria-label=${this.clearLabel??e(`tagInput.clear`)}
?disabled=${t||n.length===0}
@mousedown=${s}
@click=${this.clearAll}
>
${qt}
</button>`}
</div>
</div>`}},L([_({attribute:!1})],Y.prototype,`value`,null),L([_({attribute:`value`,converter:{fromAttribute:e=>Ea(e,`value`)}})],Y.prototype,`defaultValue`,void 0),L([_({converter:{fromAttribute:e=>Ea(e,`options`)}})],Y.prototype,`options`,void 0),L([_({converter:{fromAttribute:Da}})],Y.prototype,`separators`,void 0),L([_({type:Boolean,attribute:`no-commit-on-blur`})],Y.prototype,`noCommitOnBlur`,void 0),L([_()],Y.prototype,`placeholder`,void 0),L([_({reflect:!0})],Y.prototype,`size`,void 0),L([_({type:Boolean,reflect:!0})],Y.prototype,`invalid`,void 0),L([_({type:Boolean,reflect:!0,attribute:`readonly`})],Y.prototype,`readOnly`,void 0),L([_({attribute:`empty-text`})],Y.prototype,`emptyText`,void 0),L([_({attribute:`add-label`})],Y.prototype,`addLabel`,void 0),L([_({attribute:`clear-label`})],Y.prototype,`clearLabel`,void 0),L([_({attribute:!1})],Y.prototype,`removeLabel`,void 0),L([_({attribute:!1})],Y.prototype,`createLabel`,void 0),L([p()],Y.prototype,`draft`,void 0),L([p()],Y.prototype,`requestedOpen`,void 0),L([p()],Y.prototype,`highlight`,void 0),L([v(`input.field`)],Y.prototype,`input`,void 0),L([v(`.combobox`)],Y.prototype,`combobox`,void 0),L([v(`.list`)],Y.prototype,`list`,void 0)})))()}var Na;function Pa(){return(Pa=e((()=>{A(),M(),C(),k(),E(),pn(),xn(),d(),f(),g(),u(),Na=class e extends N{constructor(...e){super(...e),this.variant=`default`,this.aria=new S(this)}static{this.tagName=`minerva-text-link`}static{this.shadowRootOptions={...N.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,x`
:host{
display: inline;
}
:host([variant="action"]){
display: block;
}
:host([variant="subtle"]){
display: inline-flex;
}
`,F(lr)]}focus(e){this.anchor?.focus(e)}blur(){this.anchor?.blur()}click(){this.anchor?.click()}hookStates(){return{variant:this.variant}}updated(){D&&!this.href&&P(e.tagName,`href is missing: without it the link is not focusable nor announced as a link (use a button for actions).`)}render(){return h`<a
part="root"
class=${y({textLink:!0,[this.variant]:!0})}
href=${dn(e.tagName,this.href)??m}
target=${this.target??m}
rel=${c(this.target,this.rel)??m}
download=${this.download??m}
hreflang=${this.hreflang??m}
aria-label=${this.aria.label??m}
aria-description=${this.aria.description??m}
aria-current=${this.aria.attr(`aria-current`)??m}
><slot></slot>${this.variant===`subtle`?Dt:m}</a
>`}},L([_({reflect:!0})],Na.prototype,`variant`,void 0),L([_()],Na.prototype,`href`,void 0),L([_()],Na.prototype,`target`,void 0),L([_()],Na.prototype,`rel`,void 0),L([_()],Na.prototype,`download`,void 0),L([_()],Na.prototype,`hreflang`,void 0),L([v(`a`)],Na.prototype,`anchor`,void 0)})))()}function Fa(){La=null}var Ia,La,Ra,za,Ba,Va,Ha;function Ua(){return(Ua=e((()=>{M(),en(),I(),kn(),k(),E(),nr(),d(),f(),Je(),u(),Ia=`(prefers-color-scheme: dark)`,La=null,Ra=()=>typeof window<`u`&&window.matchMedia?.(Ia).matches?`dark`:`light`,za=(e,t)=>{typeof document<`u`&&(document.cookie=t===null?`${e}=; path=/; max-age=0; SameSite=Lax`:pe(e,t))},Ba=class extends N{constructor(...e){super(...e),this.persist=!1,this.locale=new T(this),this.observer=null,this.media=null,this.onScheme=()=>this.onSystemChange()}static{this.styles=[j,x`
:host{
display: inline-flex;
vertical-align: middle;
}
`,F(gn)]}get config(){return xt(this,`minerva-config`)}onSystemChange(){this.requestUpdate()}connectedCallback(){if(super.connectedCallback(),typeof MutationObserver<`u`){this.observer=new MutationObserver(()=>this.requestUpdate());let e=this.config;this.observer.observe(e??document.documentElement,{attributes:!0,attributeFilter:e?[`theme`,`palette`,`data-theme`]:[`data-theme`,`data-palette`]})}typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(Ia),this.media.addEventListener?.(`change`,this.onScheme))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.media?.removeEventListener?.(`change`,this.onScheme),this.media=null}renderGroup(e,t,n){return h`<div part="root" class="group" role="group" aria-label=${e}>
${t.map(e=>h`<button
type="button"
part=${_n(`item`,{state:e.active?`active`:`inactive`})}
class="item"
data-state=${e.active?`active`:`inactive`}
aria-pressed=${e.active?`true`:`false`}
@click=${()=>n(e.value)}
>
${e.text}
</button>`)}
</div>`}},L([_({type:Boolean,reflect:!0})],Ba.prototype,`persist`,void 0),Va=class extends Ba{constructor(...e){super(...e),this.hideSystem=!1,this.select=e=>{e!==this.theme&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-theme-toggle`}get theme(){let e=this.config;if(e){let t=e.theme;return t===`github-dark`?`dark`:Ye(t)?t:null}if(La)return La;let t=this.persist?Ue(document.cookie,de):void 0;if(Ye(t))return t;let n=document.documentElement.getAttribute(`data-theme`);return Ye(n)?n:`system`}get resolvedTheme(){let e=this.config;if(e)return e.resolvedMode??Ra();let t=this.theme;return t===`light`||t===`dark`?t:Ra()}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist&&!La){let e=Ue(document.cookie,de);Ye(e)&&this.apply(e,!1)}}onSystemChange(){!this.config&&La===`system`&&this.apply(`system`,!1),super.onSystemChange()}apply(e,t=this.persist){let n=this.config;if(n){n.theme=e;return}La=e;let r=document.documentElement,i=e===`system`?Ra():e;r.setAttribute(`data-theme`,i),r.style.colorScheme=i,t&&za(`theme`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.theme,n=this.hideSystem?[`light`,`dark`]:[`light`,`dark`,`system`];return this.renderGroup(e(`themeToggle.label`,{theme:this.resolvedTheme}),n.map(n=>({value:n,text:this.labels?.[n]??e(`themeToggle.${n}`),active:t===n})),this.select)}},L([_({type:Boolean,reflect:!0,attribute:`hide-system`})],Va.prototype,`hideSystem`,void 0),L([_({attribute:!1})],Va.prototype,`labels`,void 0),Ha=class e extends Ba{constructor(...e){super(...e),this.palettes=[...he],this.showDefault=!1,this.select=e=>{e!==this.palette&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-palette-toggle`}get palette(){let e=this.config,t=e?e.palette:document.documentElement.getAttribute(`data-palette`);return i(t)?t:null}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist){let e=Ue(document.cookie,je);i(e)&&!this.palette&&this.apply(e,!1)}}willUpdate(){if(D){let t=(this.palettes??[]).filter(e=>!i(e));t.length&&P(e.tagName,`unknown palette(s) ${t.join(`, `)}: use ${he.join(`, `)}.`)}}apply(e,t=this.persist){let n=this.config;if(n){n.palette=e??void 0;return}let r=document.documentElement;e?r.setAttribute(`data-palette`,e):r.removeAttribute(`data-palette`),t&&za(`palette`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.palette,n=this.showDefault?[null,...this.palettes.filter(i)]:this.palettes.filter(i);return this.renderGroup(e(`paletteToggle.label`,{palette:t??e(`paletteToggle.default`)}),n.map(n=>{let r=n??`default`;return{value:n,text:this.labels?.[r]??e(`paletteToggle.${r}`),active:t===n}}),this.select)}},L([_({converter:{fromAttribute:e=>(e??``).split(/[\s,]+/).filter(Boolean),toAttribute:e=>e.join(` `)}})],Ha.prototype,`palettes`,void 0),L([_({type:Boolean,reflect:!0,attribute:`show-default`})],Ha.prototype,`showDefault`,void 0),L([_({attribute:!1})],Ha.prototype,`labels`,void 0)})))()}var Wa,X;function Ga(){return(Ga=e((()=>{A(),M(),C(),I(),kn(),k(),E(),Mn(),Fr(),tr(),En(),On(),Vn(),d(),f(),g(),Je(),u(),tt(),Wa=(e,t,n=0,r=()=>!1)=>{let i=[];for(let a=n;a<n+e;a+=Math.max(1,t))i.push({value:a,disabled:r(a),label:String(a).padStart(2,`0`)});return i},X=class e extends O{constructor(...e){super(...e),this.name=`time-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.format=`HH:mm:ss`,this.use12Hours=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.hideSecond=!1,this.hourStep=1,this.minuteStep=1,this.secondStep=1,this.draft=null,this.locale=new T(this),this.aria=new S(this,()=>this.labels),this.floating=new Dr(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.dirty=!1,this.focusPanelOnOpen=!1}static{this.tagName=`minerva-time-picker`}static{this.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[j,Sr,x`
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
`,F(Bn),F(Hn),F(jn),F(Kn)]}get valueAsDate(){return Ae(this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get effectiveFormat(){return ge(this.format,!this.hideSecond)}get withSeconds(){return ce(this.effectiveFormat)}get interactive(){return!this.isDisabled&&!this.readOnly}getFormValue(){let e=this.valueAsDate;return e?fe(e,this.withSeconds):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),D&&this.checkUsage(e)}checkUsage(t){let n=e.tagName;if(t.has(`value`)&&this.value&&!Ae(this.value)&&P(n,`value "${this.value}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`),t.has(`minTime`)||t.has(`maxTime`)){for(let[e,t]of[[`min-time`,this.minTime],[`max-time`,this.maxTime]])t&&!Ae(t)&&P(n,`${e} "${t}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`);let e=Ae(this.minTime),t=Ae(this.maxTime);e&&t&&Ze(e)>Ze(t)&&P(n,`min-time (${this.minTime}) is later than max-time (${this.maxTime}): no time can be selected.`)}}updated(e){super.updated(e);let t=this.open&&this.interactive;if(this.floating.sync(t),!t){this.focusPanelOnOpen=!1;return}(e.has(`open`)||e.has(`disabled`))&&(this.popup?.querySelectorAll(`[aria-selected="true"]`).forEach(e=>e.scrollIntoView?.({block:`nearest`})),this.focusPanelOnOpen&&this.focusFirstColumn())}focusFirstColumn(){this.popup?.querySelector(`[role="option"][tabindex="0"]`)?.focus()}requestOpenChange(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){this.value=e?fe(e,this.withSeconds):``,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleTimeChange(e,t){let n=new Date(this.valueAsDate??ee());if(e===`hour`)n.setHours(t);else if(e===`minute`)n.setMinutes(t);else if(e===`second`)n.setSeconds(t);else{let e=n.getHours()%12;n.setHours(t===1?e+12:e)}this.draft=null,this.commit(n)}handleInput(e){let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t});let n=Be(t,this.effectiveFormat,{strict:!0,base:this.valueAsDate??void 0});n&&this.commit(n)}handleBlur(){let e=this.draft;if(e===null)return;let t=this.valueAsDate;if(e.trim()===``)t&&this.commit(null);else{let n=Be(e,this.effectiveFormat,{strict:!1,base:t??void 0});n&&n.getTime()!==t?.getTime()&&this.commit(n)}this.draft=null}handleClear(){this.draft=null,this.commit(null),this.emit(`minerva-clear`),this.input?.focus()}handleInputClick(){this.interactive&&(this.focusPanelOnOpen=!1,this.requestOpenChange(!this.open))}handleInputKeyDown(e){e.key===`ArrowDown`&&(e.preventDefault(),this.interactive&&(this.open?this.focusFirstColumn():(this.focusPanelOnOpen=!0,this.requestOpenChange(!0)||(this.focusPanelOnOpen=!1))))}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=He(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=He(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{le(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!le(this,e))??null}handleColumnKeyDown(e,t){let n=e.currentTarget,r=e.target,i=Array.from(n.querySelectorAll(`[role="option"]`)).filter(e=>e.getAttribute(`aria-disabled`)!==`true`),a=i.indexOf(r),o=this.popup?.querySelectorAll(`[role="listbox"]`),s=o?.length??0,c=e=>o?.[e]?.querySelector(`[tabindex="0"]`)?.focus();switch(Te(e.key,this)){case`ArrowDown`:e.preventDefault(),i[Math.min(i.length-1,a+1)]?.focus();break;case`ArrowUp`:e.preventDefault(),i[Math.max(0,a-1)]?.focus();break;case`Home`:e.preventDefault(),i[0]?.focus();break;case`End`:e.preventDefault(),i[i.length-1]?.focus();break;case`ArrowRight`:e.preventDefault(),c(Math.min(s-1,t+1));break;case`ArrowLeft`:e.preventDefault(),c(Math.max(0,t-1))}}pick(e,t){t.disabled||this.handleTimeChange(e.kind,e.toValue(t.value))}columns(e){let{t}=this.locale,n=this.use12Hours,r=Ae(this.minTime),i=Ae(this.maxTime),a=e.getHours(),o=e.getMinutes(),s=e.getSeconds(),c=a>=12,l=e=>n?e%12+(c?12:0):e,ee=Wa(n?12:24,this.hourStep,+!!n,e=>{let t=l(e);return!!(r&&t<r.getHours()||i&&t>i.getHours())}),te=Wa(60,this.minuteStep,0,e=>!!(r&&a===r.getHours()&&e<r.getMinutes()||i&&a===i.getHours()&&e>i.getMinutes())),ne=Wa(60,this.secondStep,0,e=>{let t=r&&a===r.getHours()&&o===r.getMinutes(),n=i&&a===i.getHours()&&o===i.getMinutes();return!!(t&&e<r.getSeconds()||n&&e>i.getSeconds())}),re=[{kind:`hour`,label:t(`timePicker.hours`),items:ee,selected:n?a%12||12:a,toValue:l},{kind:`minute`,label:t(`timePicker.minutes`),items:te,selected:o,toValue:e=>e}];return this.withSeconds&&re.push({kind:`second`,label:t(`timePicker.seconds`),items:ne,selected:s,toValue:e=>e}),n&&re.push({kind:`ampm`,label:t(`timePicker.period`),items:[{value:0,label:`AM`,disabled:!1},{value:1,label:`PM`,disabled:!1}],selected:+!!c,toValue:e=>e}),re}renderPanel(e,t){let n=e!==null,r=this.columns(e??ee());return h`<div
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
${r.map((e,t)=>{let r=e.items.find(e=>!e.disabled)?.value,i=e.items.some(t=>t.value===e.selected&&!t.disabled)?e.selected:r;return h`<div
part="column"
class="timeColumn"
role="listbox"
aria-label=${e.label}
tabindex="-1"
data-kind=${e.kind}
@keydown=${e=>this.handleColumnKeyDown(e,t)}
>
${e.items.map(t=>{let r=n&&t.value===e.selected;return h`<div
part=${_n(`item`,{selected:r,disabled:t.disabled})}
role="option"
aria-selected=${r?`true`:`false`}
aria-disabled=${t.disabled?`true`:m}
tabindex=${t.value===i?`0`:`-1`}
class=${y({timeUnit:!0,selected:r,disabled:t.disabled})}
@click=${()=>this.pick(e,t)}
@keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),this.pick(e,t))}}
>
${t.label}
</div>`})}
</div>`})}
</div>
</div>
</div>`}hookStates(){let e=this.open&&!this.isDisabled&&!this.readOnly,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?me(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size,side:n,align:r,placement:t}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`timePicker.label`),a=this.draft??(r?Pe(r,this.effectiveFormat):``),o=!this.hideClearButton&&!!r&&!t&&!n;return h`<div part="root" class="timePicker">
<div
part="control"
class=${y({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
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
aria-label=${e(`timePicker.clear`)}
@click=${this.handleClear}
>
${qt}
</button>`:h`<span part="icon" class="clockIcon" aria-hidden="true"
>${Xn}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(r,i):m}`}},L([_({reflect:!0})],X.prototype,`name`,void 0),L([_({attribute:!1})],X.prototype,`value`,void 0),L([_({attribute:`value`})],X.prototype,`defaultValue`,void 0),L([_({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),L([_({reflect:!0})],X.prototype,`format`,void 0),L([_({type:Boolean,reflect:!0,attribute:`use-12-hours`})],X.prototype,`use12Hours`,void 0),L([_()],X.prototype,`placeholder`,void 0),L([_()],X.prototype,`label`,void 0),L([_({reflect:!0})],X.prototype,`size`,void 0),L([_({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),L([_({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),L([_({type:Boolean,reflect:!0,attribute:`hide-clear-button`})],X.prototype,`hideClearButton`,void 0),L([_({type:Boolean,reflect:!0,attribute:`hide-second`})],X.prototype,`hideSecond`,void 0),L([_({attribute:`min-time`})],X.prototype,`minTime`,void 0),L([_({attribute:`max-time`})],X.prototype,`maxTime`,void 0),L([_({type:Number,attribute:`hour-step`})],X.prototype,`hourStep`,void 0),L([_({type:Number,attribute:`minute-step`})],X.prototype,`minuteStep`,void 0),L([_({type:Number,attribute:`second-step`})],X.prototype,`secondStep`,void 0),L([p()],X.prototype,`draft`,void 0),L([v(`input`)],X.prototype,`input`,void 0),L([v(`.timePicker`)],X.prototype,`field`,void 0),L([v(`.popup`)],X.prototype,`popup`,void 0)})))()}function Ka(e){if(e===void 0)return;if(typeof e!=`string`)return e;if(!Xa())return;let t=document.getElementById(e)??void 0;return D&&!t&&P(`minerva-toast-region`,`toast(): no element with id "${e}"; the toast is shown in the default region.`),t}var qa,Ja,Ya,Xa,Za,Qa,$a,eo,to,no;function ro(){return(ro=e((()=>{M(),u(),qa=4e3,Ja=200,Ya=`minerva-toast-region`,Xa=()=>typeof window<`u`&&typeof document<`u`,Za=class{constructor(e={}){this.subscribe=e=>this.queue.subscribe(t=>e(t.toasts)),this.subscribeLifecycle=e=>this.queue.subscribeLifecycle(e),this.getSnapshot=()=>this.queue.getState().toasts,this.queue=oe({isClient:e.isClient??Xa,defaultDuration:qa,exitDuration:200})}push(e,t){return this.queue.add(e,{region:t})}update(e,t){this.queue.update(e,t)}dismiss(e,t=`dismiss`){this.queue.dismiss(e,t)}dismissAll(){this.queue.dismissAll()}pause(e){this.queue.pause(e)}resume(e){this.queue.resume(e)}peek(){return this.getSnapshot()}reset(){this.queue.reset()}},Qa=new Za,$a=`data-minerva-auto`,eo=new class{constructor(){this.regions=[],this.listeners=new Set,this.autoPending=!1,this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)})}changed(){for(let e of[...this.listeners])e()}ordered(){return this.regions.slice().sort((e,t)=>{let n=e.compareDocumentPosition(t);return n&Node.DOCUMENT_POSITION_DISCONNECTED?0:n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}get owner(){return this.ordered()[0]??null}register(e){if(!this.regions.includes(e)){if(this.regions.push(e),!e.hasAttribute(`data-minerva-auto`))for(let e of this.regions.filter(e=>e.hasAttribute($a)))e.remove();this.changed()}}unregister(e){let t=this.regions.indexOf(e);t<0||(this.regions.splice(t,1),this.changed())}regionOf(e){let t=e.region;return t&&this.regions.includes(t)?t:this.owner}ensureRegion(){this.autoPending||this.regions.length>0||!Xa()||(this.autoPending=!0,queueMicrotask(()=>{if(this.autoPending=!1,this.regions.length>0||!document.body||!Qa.getSnapshot().length)return;let e=document.createElement(`minerva-toast-region`);e.setAttribute(`data-minerva-auto`,``),document.body.append(e)}))}},to=(e,t)=>{let n=n=>{D&&!Xa()&&P(`minerva-toast-region`,`toast() called without a document (server side): the toast is ignored.`);let{region:r,...i}=n,a=Ka(r??t),o=e.push(i,a);return Xa()&&eo.ensureRegion(),o},r=(e=>n(e));return r.info=(e,t)=>n({...t,title:e,color:`info`}),r.success=(e,t)=>n({...t,title:e,color:`success`}),r.warning=(e,t)=>n({...t,title:e,color:`warning`}),r.danger=(e,t)=>n({...t,title:e,color:`danger`}),r.loading=(e,t)=>n({...t,title:e,loading:!0}),r.promise=(e,t,r)=>{let i=n({...r,title:t.loading,loading:!0,duration:0}),a=(e,t)=>n({...r,id:i,title:t,color:e,loading:!1});return e.then(e=>a(`success`,typeof t.success==`function`?t.success(e):t.success),e=>a(`danger`,typeof t.error==`function`?t.error(e):t.error)),e},r.update=(t,n)=>{let{region:r,...i}=n;e.update(t,i)},r.dismiss=t=>t===void 0?e.dismissAll():e.dismiss(t),r.region=t=>to(e,t),r},no=to(Qa)})))()}var io,ao,oo,so,co,lo,uo,fo,po;function mo(){return(mo=e((()=>{A(),M(),C(),en(),I(),kn(),k(),E(),Fr(),er(),ro(),d(),f(),g(),Qe(),Je(),u(),nt(),io={info:At,success:$n,warning:Zn,danger:Pn},ao=[`top-right`,`top-left`,`top-center`,`bottom-right`,`bottom-left`,`bottom-center`],oo=[`F8`],so=`:scope > [part~="toast--open"]`,co=`:scope > [part~="close-button"]`,lo={fromAttribute:e=>e===null?oo:e.split(/[\s,+]+/).map(e=>e.trim()).filter(Boolean)},uo=0,fo=e=>{for(let t of eo.ordered())if(t instanceof po&&t.handleHotkey(e))return},po=class extends N{constructor(...e){super(...e),this.position=`top-right`,this.max=1/0,this.noPauseOnHover=!1,this.hotkey=oo,this.items=[],this.locale=new T(this),this.aria=new S(this),this.cleanups=[],this.returnFocus=null,this.refresh=()=>{if(!this.isConnected)return;let e=new Set,t=[],n=Qa.getSnapshot();for(let r=n.length-1;r>=0;--r){let i=n[r];e.has(i.id)||eo.regionOf(i)!==this||(e.add(i.id),t.unshift(i))}let r=Re(t,this.max);if(r.length>0){for(let e of r)Qa.dismiss(e.id,`overflow`);return}let i=new Set(this.items.map(e=>e.id)),a=t.some(e=>!i.has(e.id));this.items=t,a&&this.raise()},this.raise=()=>{let e=this.viewport;e&&!le(e,Se())&&(vt(e),or(e))},this.onLifecycle=e=>{eo.regionOf(e.item)===this&&(e.type===`close`?this.emit(`minerva-close`,{id:e.item.id,reason:e.reason}):this.emit(`minerva-after-close`,{id:e.item.id}))},this.onViewportFocusIn=e=>{let t=e.relatedTarget,n=e.currentTarget;t&&!le(n,t)&&(this.returnFocus=t)},this.onViewportFocusOut=e=>{let t=e.currentTarget;le(t,e.relatedTarget)||t.removeAttribute(`tabindex`)}}static{this.tagName=Ya}static{this.styles=[j,Sr,x`
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
`,F(zn)]}get toast(){return this.boundApi??=to(Qa,this),this.boundApi}connectedCallback(){super.connectedCallback(),this.cleanups=[Qa.subscribe(()=>this.refresh()),eo.subscribe(()=>this.refresh()),Qa.subscribeLifecycle(this.onLifecycle)];let e=this.ownerDocument;e.addEventListener(`minerva-after-open`,this.raise),this.cleanups.push(()=>e.removeEventListener(`minerva-after-open`,this.raise)),uo++===0&&e.addEventListener(`keydown`,fo),this.cleanups.push(()=>{--uo===0&&e.removeEventListener(`keydown`,fo)}),eo.register(this),this.refresh(),this.hasUpdated&&or(this.viewport)}disconnectedCallback(){super.disconnectedCallback();for(let e of this.cleanups)e();this.cleanups=[],eo.unregister(this),vt(this.viewport)}handleHotkey(e){let t=this.viewport;if(!t||!Ee(e,this.hotkey)||!t.querySelector(so))return!1;e.preventDefault();let n=Se();return n&&n!==this.ownerDocument.body&&!le(t,n)&&(this.returnFocus=n),t.setAttribute(`tabindex`,`-1`),ze(t),!0}focus(e){let t=this.viewport;t&&(t.setAttribute(`tabindex`,`-1`),t.focus(e))}willUpdate(e){D&&e.has(`position`)&&!ao.includes(this.position)&&P(`minerva-toast-region`,`invalid position "${this.position}" (expected ${ao.join(` | `)}).`)}firstUpdated(){or(this.viewport)}updated(e){e.has(`max`)&&e.get(`max`)!==void 0&&queueMicrotask(()=>this.refresh())}moveFocusFrom(e){let t=this.viewport;if(!t)return;let n=Array.from(t.querySelectorAll(so)).filter(t=>t!==e),r=n.find(t=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??n[n.length-1];if(r){let e=r.querySelector(co)??He(r)[0];if(ze(e))return}let i=this.returnFocus;i?.isConnected&&!le(t,i)&&ze(i)||ze(Xe(this))||(t.setAttribute(`tabindex`,`-1`),ze(t,{preventScroll:!0}))}close(e,t,n){le(t,Se())&&this.moveFocusFrom(t),Qa.dismiss(e.id,n)}pause(e){this.noPauseOnHover||Qa.pause(e.id)}resume(e){this.noPauseOnHover||Qa.resume(e.id)}renderIcon(e){if(e.icon===null)return m;let t=e.icon===void 0?e.loading?h`<div class="progressIndicator current" aria-hidden="true">
<span class="spinner small">${Ht}</span>
</div>`:io[e.color]:e.icon;return h`<span class="icon" part="icon" aria-hidden="true"
>${t}</span
>`}renderItem(e){let t=e.state===`closing`,n=e=>e.currentTarget.closest(`.toast`),r={state:t?`closed`:`open`,color:e.color,loading:e.loading};return h`<div
part=${_n(`toast`,r)}
class=${y({toast:!0,[e.color]:!0})}
data-state=${r.state}
role=${e.color===`danger`&&!e.loading?`alert`:`status`}
style=${b(e.duration>0?{"--toast-duration":`${e.duration}ms`}:{})}
@mouseenter=${()=>this.pause(e)}
@mouseleave=${()=>this.resume(e)}
@focusin=${()=>this.pause(e)}
@focusout=${t=>{le(n(t),t.relatedTarget)||this.resume(e)}}
@keydown=${r=>{r.key!==`Escape`||t||r.isComposing||(r.preventDefault(),r.stopPropagation(),this.close(e,n(r),`escape`))}}
>
${this.renderIcon(e)}
<div class="content">
${e.title?h`<div class="title" part="title">${e.title}</div>`:m}
${e.description?h`<div class="description" part="description">
${e.description}
</div>`:m}
</div>
${e.action?h`<button
type="button"
class="action"
part="action"
@click=${t=>{e.action?.onClick(),this.close(e,n(t),`action`)}}
>
${e.action.label}
</button>`:m}
${e.closable?h`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`toast.close`)}
@click=${t=>this.close(e,n(t),`close-button`)}
>
${qt}
</button>`:m}
${e.duration>0&&!t?h`<span
class="progress"
part="progress"
aria-hidden="true"
></span>`:m}
</div>`}render(){let e=Ve(this.hotkey),t=this.aria.label??(e?this.locale.t(`toast.regionWithHotkey`,{hotkey:e}):this.locale.t(`toast.region`)),n=ao.includes(this.position)?this.position:`top-right`;return h`<div
part="root"
class=${y({viewport:!0,[n]:!0})}
popover="manual"
role="region"
aria-label=${t}
dir=${Ke(this)}
@focusin=${this.onViewportFocusIn}
@focusout=${this.onViewportFocusOut}
>
${$e(this.items,e=>e.id,e=>this.renderItem(e))}
</div>`}},L([_({reflect:!0})],po.prototype,`position`,void 0),L([_({type:Number})],po.prototype,`max`,void 0),L([_({type:Boolean,attribute:`no-pause-on-hover`})],po.prototype,`noPauseOnHover`,void 0),L([_({attribute:`close-label`})],po.prototype,`closeLabel`,void 0),L([_({attribute:`hotkey`,converter:lo})],po.prototype,`hotkey`,void 0),L([p()],po.prototype,`items`,void 0),L([v(`.viewport`)],po.prototype,`viewport`,void 0)})))()}var ho,go,_o,vo,yo,bo,Z;function xo(){return(xo=e((()=>{A(),M(),en(),k(),E(),Fr(),An(),d(),f(),g(),Je(),ho=6,go=300,_o=200,vo=0,yo={fromAttribute(e){if(!e)return;let t=e.trim().split(/[\s,]+/).map(Number);return t.length===2&&t.every(Number.isFinite)?[t[0],t[1]]:void 0},toAttribute(e){return e?e.join(` `):null}},bo=class extends N{constructor(...e){super(...e),this.skipDelay=300,this.lastClosedAt=0}static{this.tagName=`minerva-tooltip-provider`}static{this.styles=[j,x`
:host{
display: contents;
}
`]}markClosed(){this.lastClosedAt=Date.now()}shouldSkipDelay(){return Date.now()-this.lastClosedAt<this.skipDelay}render(){return h`<slot></slot>`}},L([_({type:Number,attribute:`enter-delay`})],bo.prototype,`enterDelay`,void 0),L([_({type:Number,attribute:`leave-delay`})],bo.prototype,`leaveDelay`,void 0),L([_({type:Number,attribute:`skip-delay`})],bo.prototype,`skipDelay`,void 0),Z=class e extends N{constructor(...e){super(...e),this.content=``,this.open=!1,this.placement=`top`,this.color=`neutral`,this.variant=`solid`,this.shape=`default`,this.animation=`fade`,this.arrow=!1,this.disabled=!1,this.followCursor=!1,this.positioned=!1,this.aria=new S(this),this.grace=Me({timeout:0}),this.cursor=null,this.described=null,this.describedPrev=null,this.floating=new Dr(this,()=>{let e=this.placement,t=e.startsWith(`top`)||e.startsWith(`bottom`),n=this.arrow?ho:0,r=this.offset;return{placement:e,offset:r?{mainAxis:(t?r[1]:r[0])+n,crossAxis:t?r[0]:r[1]}:{mainAxis:8+n},arrowElement:this.arrow?this.arrowEl:null,autoUpdate:this.followCursor?{animationFrame:!0}:void 0,anchor:()=>this.anchor(),floating:()=>this.panel,branches:()=>[this.wrapper],dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,focusable:!1,onDismiss:()=>{this.clearTimers(),this.requestOpen(!1)},onPosition:e=>this.handlePosition(e)}}),this.handleMouseEnter=e=>{if(this.disabled)return;this.followCursor&&(this.cursor={x:e.clientX,y:e.clientY}),this.clearTimers();let t=this.resolvedEnterDelay;if(t<=0||this.provider()?.shouldSkipDelay()){this.requestOpen(!0);return}this.enterTimer=setTimeout(()=>this.requestOpen(!0),t)},this.handleMouseLeave=e=>{if(this.disabled)return;this.clearTimers();let t=this.panel?.getBoundingClientRect();if(this.open&&!this.followCursor&&t&&t.width>0&&t.height>0){this.grace.start({x:e.clientX,y:e.clientY},t,me(this.currentPlacement).side),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),Math.max(this.resolvedLeaveDelay,go));return}this.scheduleHide()},this.handlePanelMouseEnter=()=>{this.disabled||this.clearTimers()},this.handlePanelMouseLeave=()=>{this.disabled||this.followCursor||this.scheduleHide()},this.handleDocumentPointerMove=e=>{if(!this.grace.getArea())return;let t=e.composedPath();this.wrapper&&t.includes(this.wrapper)||this.panel&&t.includes(this.panel)||this.grace.isInGraceArea({x:e.clientX,y:e.clientY})||(this.grace.clear(),this.scheduleHide())},this.handleDocumentMouseMove=e=>{this.cursor={x:e.clientX,y:e.clientY}},this.handleFocusIn=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!0))},this.handleFocusOut=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!1))},this.listening=!1,this.handleSlotChange=()=>this.requestUpdate()}static{this.tagName=`minerva-tooltip`}static{this.styles=[j,Sr,x`
:host{
display: inline-flex;
}
`,F(Nn)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}get currentPlacement(){return this.positioned?this.floating.position.placement:this.placement}get visible(){return this.open&&!this.disabled}provider(){let e=xt(this,`minerva-tooltip-provider`);return e instanceof bo?e:null}get resolvedEnterDelay(){return this.enterDelay??this.provider()?.enterDelay??_o}get resolvedLeaveDelay(){return this.leaveDelay??this.provider()?.leaveDelay??vo}triggerElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}get text(){return this.aria.label||(this.content.trim()?this.content.trim():Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`content`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `))}anchor(){return this.followCursor&&this.cursor?{getBoundingClientRect:()=>{let{x:e,y:t}=this.cursor??{x:0,y:0};return DOMRect.fromRect({x:e,y:t,width:0,height:0})}}:this.wrapper}requestOpen(e){e!==this.open&&(e||this.provider()?.markClosed(),this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.grace.clear()}scheduleHide(){clearTimeout(this.leaveTimer),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),this.resolvedLeaveDelay)}handlePosition(e){let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`),this.positioned||=!0}inPanel(e){return!!this.panel&&e.composedPath().includes(this.panel)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`focusout`,this.handleFocusOut),this.listenDocument(!1),clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.restoreDescription()}listenDocument(e){e!==this.listening&&(this.listening=e,e?(document.addEventListener(`pointermove`,this.handleDocumentPointerMove),document.addEventListener(`mousemove`,this.handleDocumentMouseMove)):(document.removeEventListener(`pointermove`,this.handleDocumentPointerMove),document.removeEventListener(`mousemove`,this.handleDocumentMouseMove)))}firstUpdated(){D&&setTimeout(()=>this.checkUsage())}checkUsage(){if(!this.isConnected)return;this.text||P(e.tagName,`has no content: set the "content" attribute, aria-label or slot="content".`);let t=this.triggerElement();!this.disabled&&t&&He(t,{includeContainer:!0}).length===0&&P(e.tagName,`the trigger is not focusable, so keyboard users cannot reach the tooltip; wrap a button / link or add tabindex="0".`)}willUpdate(e){(e.has(`open`)||e.has(`disabled`))&&(!this.open||this.disabled)&&(this.positioned=!1,this.grace.clear())}updated(){let e=this.visible;this.floating.sync(e),this.listenDocument(e),this.syncDescription(e)}syncDescription(e){let t=e?this.text:``,n=t?this.triggerElement():null;if(this.described&&this.described!==n&&this.restoreDescription(),!n)return;this.described!==n&&(this.described=n,this.describedPrev=n.getAttribute(`aria-description`));let r=this.describedPrev?`${this.describedPrev} ${t}`:t;n.getAttribute(`aria-description`)!==r&&n.setAttribute(`aria-description`,r)}restoreDescription(){let e=this.described;e&&(this.describedPrev===null?e.removeAttribute(`aria-description`):e.setAttribute(`aria-description`,this.describedPrev),this.described=null,this.describedPrev=null)}hookStates(){let e=this.currentPlacement;return{state:this.visible?`open`:`closed`,disabled:this.disabled,color:this.color,variant:this.variant,shape:this.shape,...me(e),placement:e}}render(){let e=this.visible,t=this.currentPlacement,n=e&&!this.triggerElement();return h`<div
class="tooltipTrigger"
part="trigger"
aria-describedby=${n?`tooltip`:m}
@mouseenter=${this.handleMouseEnter}
@mouseleave=${this.handleMouseLeave}
>
<slot @slotchange=${this.handleSlotChange}></slot>
</div>
${e?h`<div
id="tooltip"
part="content"
popover="manual"
role="tooltip"
dir=${Ke(this)}
aria-label=${this.aria.label??m}
data-placement=${t}
class=${y({tooltip:!0,[this.color]:!0,[this.variant]:!0,[this.shape]:!0,[`animation-${this.animation}`]:!0,followCursor:this.followCursor,arrow:this.arrow,show:this.positioned})}
@mouseenter=${this.handlePanelMouseEnter}
@mouseleave=${this.handlePanelMouseLeave}
>
<slot name="content" @slotchange=${this.handleSlotChange}
>${this.content}</slot
>${this.arrow?h`<div class="tooltipArrow" part="arrow"></div>`:m}
</div>`:m}`}},L([_()],Z.prototype,`content`,void 0),L([_({type:Boolean,reflect:!0})],Z.prototype,`open`,void 0),L([_({reflect:!0})],Z.prototype,`placement`,void 0),L([_({reflect:!0})],Z.prototype,`color`,void 0),L([_({reflect:!0})],Z.prototype,`variant`,void 0),L([_({reflect:!0})],Z.prototype,`shape`,void 0),L([_({reflect:!0})],Z.prototype,`animation`,void 0),L([_({type:Boolean,reflect:!0})],Z.prototype,`arrow`,void 0),L([_({type:Boolean,reflect:!0})],Z.prototype,`disabled`,void 0),L([_({type:Number,attribute:`enter-delay`})],Z.prototype,`enterDelay`,void 0),L([_({type:Number,attribute:`leave-delay`})],Z.prototype,`leaveDelay`,void 0),L([_({converter:yo})],Z.prototype,`offset`,void 0),L([_({type:Boolean,reflect:!0,attribute:`follow-cursor`})],Z.prototype,`followCursor`,void 0),L([v(`.tooltipTrigger`)],Z.prototype,`wrapper`,void 0),L([v(`[part=content]`)],Z.prototype,`panel`,void 0),L([v(`.tooltipArrow`)],Z.prototype,`arrowEl`,void 0),L([p()],Z.prototype,`positioned`,void 0)})))()}var So,Q;function Co(){return(Co=e((()=>{A(),M(),C(),I(),kn(),k(),E(),Mn(),En(),hr(),Sn(),d(),f(),g(),u(),nt(),So=0,Q=class e extends O{constructor(...e){super(...e),this.label=``,this.items=[],this.accept=`*`,this.multiple=!1,this.replace=!1,this.loading=!1,this.removable=!1,this.retryable=!1,this.error=``,this.dragging=!1,this.uploadId=`upload-${So++}`,this.nextId=0,this.pendingRemoval=null,this.locale=new T(this),this.aria=new S(this,()=>this.labels)}static{this.tagName=`minerva-upload`}static{this.dependencies=[_r]}static{this.styles=[j,x`
:host{
display: block;
min-width: 0;
}
`,F(Hn),F(Qn),x`

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
`]}get files(){return this.items.flatMap(e=>e.file?[e.file]:[])}get resolvedMaxCount(){return this.maxCount??(this.multiple?50:1)}get existingCount(){return this.replace&&!this.multiple?0:this.items.length}get blocked(){return this.isDisabled||this.loading||this.existingCount>=this.resolvedMaxCount}focus(e){this.renderRoot.querySelector(`[part=select-button]`)?.focus(e)}showPicker(){this.blocked||this.input?.click()}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.files)e.append(this.name,t);return e}getValidity(){return this.required&&this.files.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.fileMissing`),anchor:this.renderRoot.querySelector(`[part=select-button]`)??null}:{flags:{},message:``}}resetFormValue(){this.items=[],this.error=``}restoreFormState(e){e instanceof FormData&&(this.items=e.getAll(this.name).filter(e=>e instanceof File).map(e=>this.toItem(e)))}willUpdate(t){D&&(t.has(`maxCount`)||t.has(`multiple`))&&!this.multiple&&this.maxCount!==void 0&&this.maxCount>1&&P(e.tagName,`max-count (${this.maxCount}) has no effect without multiple: one file is picked at a time.`)}updated(e){super.updated(e);let t=this.pendingRemoval;if(!t||this.items.some(e=>e.id===t.id))return;this.pendingRemoval=null;let n=t.nextId?Array.from(this.renderRoot.querySelectorAll(`[data-item-id]`)).find(e=>e.dataset.itemId===t.nextId)?.querySelector(`[part=remove-button]`):null;n?n.focus():this.focus()}toItem(e){return{id:`${this.uploadId}-${this.nextId++}`,name:e.name,status:`done`,file:e}}select(e){if(this.blocked||e.length===0)return;let{t}=this.locale,n=this.texts,r=this.resolvedMaxCount;if(!this.multiple&&e.length>1||e.length+this.existingCount>r){this.error=n?.tooMany?.(r)??t(`upload.tooMany`,{count:r});return}let i=e.find(e=>!_e(e,this.accept));if(i){this.error=n?.invalidType?.(i.name)??t(`upload.invalidType`,{name:i.name});return}let a=this.maxSize,o=a===void 0?void 0:e.find(e=>e.size>a);if(o){this.error=n?.tooLarge?.(o.name)??t(`upload.tooLarge`,{name:o.name});return}if(this.error=``,!this.emit(`minerva-files-selected`,{files:e},{cancelable:!0}))return;let s=e.map(e=>this.toItem(e));this.items=this.replace&&!this.multiple?s:[...this.items,...s],this.notifyChange()}notifyChange(){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.items})}removeItem(e){if(this.isDisabled)return;let t=this.items.indexOf(e),n=this.items[t+1]??this.items[t-1];this.pendingRemoval={id:e.id,nextId:n?.id},this.emit(`minerva-remove`,{item:e},{cancelable:!0})&&(this.items=this.items.filter(t=>t!==e),this.notifyChange())}retry(e){this.isDisabled||this.loading||this.emit(`minerva-retry`,{item:e})}handleInputChange(){let e=Array.from(this.input.files??[]);this.input.value=``,this.select(e)}handleDragOver(e){e.preventDefault(),this.blocked||(this.dragging=!0)}handleDragLeave(e){e.currentTarget.contains(e.relatedTarget)||(this.dragging=!1)}handleDrop(e){e.preventDefault(),this.dragging=!1,this.select(Array.from(e.dataTransfer?.files??[]))}statusText(e){let{t}=this.locale,n=this.texts;return e.status===`uploading`?n?.uploading??t(`upload.uploading`):e.status===`error`?e.error||(n?.failed??t(`upload.failed`)):n?.done??t(`upload.done`)}hookStates(){return{disabled:this.isDisabled,loading:this.loading,dragging:this.dragging&&!this.blocked}}render(){let{t:e}=this.locale,t=this.texts,n=this.blocked,r=this.isDisabled,i=this.label||this.aria.label;return h`<div
part="root"
class="upload"
role="group"
aria-labelledby=${this.label?`label`:m}
aria-label=${!this.label&&i?i:m}
aria-description=${this.aria.description??m}
aria-busy=${this.loading?`true`:`false`}
>
<span id="label" part="label" class="label">${this.label}</span>
<div
part="dropzone"
class=${y({dropzone:!0,dragging:this.dragging&&!n})}
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
<span slot="start">${wn}</span>
${t?.select??e(`upload.select`)}
</minerva-button>
<input
type="file"
hidden
tabindex="-1"
aria-label=${i||m}
?disabled=${n}
accept=${this.accept}
?multiple=${this.multiple}
@change=${this.handleInputChange}
/>
</div>
${this.error?h`<div part="error" class="error" role="alert">
${this.error}
</div>`:m}
${this.items.length>0?h`<ul part="list" class="list">
${$e(this.items,e=>e.id,n=>h`<li
part=${_n(`item`,{status:n.status})}
class="item"
data-item-id=${n.id}
>
${n.previewUrl?h`<img
src=${n.previewUrl}
alt=""
class="preview"
/>`:m}
<div class="info">
<span>${n.name}</span>
<span
role=${n.status===`error`?`alert`:`status`}
class=${y({status:!0,statusError:n.status===`error`})}
>${this.statusText(n)}</span
>
</div>
<div class="actions">
${n.status===`error`&&this.retryable?h`<button
part="retry-button"
type="button"
class=${y({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r||this.loading})}
aria-label=${t?.retry?.(n.name)??e(`upload.retry`,{name:n.name})}
?disabled=${r||this.loading}
@click=${()=>this.retry(n)}
>
${fr}
</button>`:m}
${this.removable?h`<button
part="remove-button"
type="button"
class=${y({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r})}
aria-label=${t?.remove?.(n.name)??e(`upload.remove`,{name:n.name})}
?disabled=${r}
@click=${()=>this.removeItem(n)}
>
${qt}
</button>`:m}
</div>
</li>`)}
</ul>`:m}
</div>`}},L([_()],Q.prototype,`label`,void 0),L([_({attribute:!1})],Q.prototype,`items`,void 0),L([_()],Q.prototype,`accept`,void 0),L([_({type:Boolean,reflect:!0})],Q.prototype,`multiple`,void 0),L([_({type:Boolean})],Q.prototype,`replace`,void 0),L([_({type:Number,attribute:`max-count`})],Q.prototype,`maxCount`,void 0),L([_({type:Number,attribute:`max-size`})],Q.prototype,`maxSize`,void 0),L([_({type:Boolean,reflect:!0})],Q.prototype,`loading`,void 0),L([_({type:Boolean})],Q.prototype,`removable`,void 0),L([_({type:Boolean})],Q.prototype,`retryable`,void 0),L([_({attribute:!1})],Q.prototype,`texts`,void 0),L([p()],Q.prototype,`error`,void 0),L([p()],Q.prototype,`dragging`,void 0),L([v(`input[type=file]`)],Q.prototype,`input`,void 0)})))()}var $;function wo(){return(wo=e((()=>{A(),M(),C(),I(),k(),E(),Gn(),Wn(),d(),f(),g(),Qe(),u(),nt(),$=class e extends N{constructor(...e){super(...e),this.items=[],this.itemPadding=8,this.overscan=5,this.loadMoreThreshold=100,this.highPerformance=!1,this.loading=!1,this.clickable=!1,this.scrollOffset=0,this.containerHeight=0,this.measuredHeight=0,this.focusedId=null,this.aria=new S(this),this.locale=new T(this),this.resizeObserver=null,this.measureObserver=null,this.lastScrollTop=0,this.loadingMore=!1}static{this.tagName=`minerva-virtual-list`}static{this.styles=[j,x`
:host{
display: block;
}
.wave{
display: inline-flex;
}
`,F(bn),F(vn)]}get scrollContainer(){return this.container??null}scrollToIndex(e){let t=this.container,n=this.rowHeight;t&&n&&(t.scrollTop=Math.max(0,e)*n,this.updateScroll(t.scrollTop))}get rowHeight(){return this.itemHeight?this.itemHeight:this.measuredHeight>0?this.measuredHeight+this.itemPadding*2:0}get needsMeasure(){return!this.itemHeight&&this.measuredHeight===0&&this.items.length>0}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.measureObserver?.disconnect(),this.measureObserver=null,this.cancelScheduled()}firstUpdated(){this.observeContainer()}reconnectedCallback(){super.reconnectedCallback(),this.observeContainer()}observeContainer(){let e=this.container;e&&(this.containerHeight=e.clientHeight,!(this.resizeObserver||typeof ResizeObserver>`u`)&&(this.resizeObserver=new ResizeObserver(e=>{for(let t of e)this.containerHeight=t.contentRect.height}),this.resizeObserver.observe(e)))}willUpdate(e){(e.has(`items`)||e.has(`loading`))&&(this.loadingMore=!1),this.focusedId!==null&&e.has(`items`)&&!this.items.some(e=>e.id===this.focusedId)&&(this.focusedId=null)}updated(){this.syncMeasure(),D&&this.items.length>0&&!this.renderItem&&P(e.tagName,`set the renderItem property (a function returning the content of a row); rows show the item id meanwhile.`),D&&this.maxHeight===void 0&&P(e.tagName,`set max-height (pixels): without a bounded height the list cannot scroll, so every row is rendered.`)}syncMeasure(){let e=this.needsMeasure?this.measureElement:void 0;if(!e){this.measureObserver?.disconnect(),this.measureObserver=null;return}let t=()=>{let t=e.offsetHeight;t>0&&(this.measuredHeight=t)};t(),!(this.measureObserver||typeof ResizeObserver>`u`)&&(this.measureObserver=new ResizeObserver(t),this.measureObserver.observe(e))}cancelScheduled(){this.raf!==void 0&&(cancelAnimationFrame(this.raf),this.raf=void 0),this.idle!==void 0&&(typeof cancelIdleCallback==`function`&&cancelIdleCallback(this.idle),this.idle=void 0)}schedule(e){if(!this.highPerformance){e();return}this.cancelScheduled(),this.raf=requestAnimationFrame(()=>{this.raf=void 0,typeof requestIdleCallback==`function`?this.idle=requestIdleCallback(()=>{this.idle=void 0,e()},{timeout:100}):e()})}updateScroll(e){this.scrollOffset=e}handleScroll(e){let{scrollTop:t,scrollHeight:n,clientHeight:r}=e.currentTarget,i=t>this.lastScrollTop;this.lastScrollTop=t,this.schedule(()=>{this.updateScroll(t),i&&!this.loadingMore&&!this.loading&&n-t-r<this.loadMoreThreshold&&n>r&&(this.loadingMore=!0,this.emit(`minerva-load-more`))})}visibleWindow(){let e=this.rowHeight;if(!e)return[];let{start:t,end:n}=be({scrollTop:this.scrollOffset,viewportHeight:this.containerHeight,itemHeight:e,itemCount:this.items.length,overscan:this.overscan}),r=[];for(let i=t;i<n;i++)r.push({index:i,start:i*e});if(this.focusedId!==null){let i=this.items.findIndex(e=>e.id===this.focusedId);if(i>=0&&(i<t||i>=n)){let n={index:i,start:i*e};i<t?r.unshift(n):r.push(n)}}return r}renderContent(e,t){return this.renderItem?this.renderItem(e,t):String(e.id)}activate(e,t){this.emit(`minerva-item-click`,{item:e,index:t})}handleRowKeyDown(e,t,n){e.composedPath()[0]===e.currentTarget&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.activate(t,n))}handleRowFocusOut(e){let t=e.currentTarget,n=e.relatedTarget;(!n||!t.contains(n))&&(this.focusedId=null)}hookStates(){return{loading:this.loading}}render(){let e=this.rowHeight,t=this.aria.label??m,n=this.visibleWindow(),r=this.items.length;return h`<div
class="virtualList"
part="root"
role="region"
tabindex="0"
aria-label=${t}
aria-busy=${this.loading?`true`:m}
style=${b({maxHeight:this.maxHeight===void 0?void 0:`${this.maxHeight}px`,overflow:`auto`,position:`relative`})}
@scroll=${this.handleScroll}
>
${this.needsMeasure?h`<div class="measureItem" aria-hidden="true">
${this.renderContent(this.items[0],0)}
</div>`:m}
<div
class="virtualListContent"
part="list"
role="list"
aria-label=${t}
style=${b({height:e?`${r*e}px`:`auto`,position:`relative`,willChange:`transform`})}
>
${$e(n,e=>this.items[e.index].id,t=>{let n=this.items[t.index];return h`<div
part="item"
role="listitem"
class=${y({virtualListItem:!0,clickable:this.clickable})}
style=${b({position:`absolute`,top:`0`,transform:`translateY(${t.start}px)`,width:`100%`,height:`${e}px`,willChange:`transform`,padding:`${this.itemPadding}px`})}
tabindex=${this.clickable?`0`:m}
aria-setsize=${r}
aria-posinset=${t.index+1}
@click=${this.clickable?()=>this.activate(n,t.index):m}
@keydown=${this.clickable?e=>this.handleRowKeyDown(e,n,t.index):m}
@focusin=${()=>this.focusedId=n.id}
@focusout=${this.handleRowFocusOut}
>
${this.renderContent(n,t.index)}
</div>`})}
</div>
${this.loading?h`<div class="loadingWrapper" part="loading">
<div
class="progressIndicator primary"
role="progressbar"
aria-label=${this.locale.t(`common.loading`)}
>
<div class="waveContainer small">
<span class="wave" aria-hidden="true">${yn}</span>
</div>
</div>
</div>`:m}
</div>`}},L([_({attribute:!1})],$.prototype,`items`,void 0),L([_({attribute:!1})],$.prototype,`renderItem`,void 0),L([_({type:Number,attribute:`item-height`})],$.prototype,`itemHeight`,void 0),L([_({type:Number,attribute:`item-padding`})],$.prototype,`itemPadding`,void 0),L([_({type:Number})],$.prototype,`overscan`,void 0),L([_({type:Number,attribute:`max-height`})],$.prototype,`maxHeight`,void 0),L([_({type:Number,attribute:`load-more-threshold`})],$.prototype,`loadMoreThreshold`,void 0),L([_({type:Boolean,attribute:`high-performance`})],$.prototype,`highPerformance`,void 0),L([_({type:Boolean,reflect:!0})],$.prototype,`loading`,void 0),L([_({type:Boolean,reflect:!0})],$.prototype,`clickable`,void 0),L([p()],$.prototype,`scrollOffset`,void 0),L([p()],$.prototype,`containerHeight`,void 0),L([p()],$.prototype,`measuredHeight`,void 0),L([p()],$.prototype,`focusedId`,void 0),L([v(`.virtualList`)],$.prototype,`container`,void 0),L([v(`.measureItem`)],$.prototype,`measureElement`,void 0)})))()}var To,Eo,Do,Oo,ko,Ao;function jo(){return(jo=e((()=>{gr(),f(),at(),lt(),ut(),ct(),To=class extends vr{engineOptions(){return{...this.options}}engineMounted(e){this.book&&e.setBook(this.book)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`book`)&&this.book&&e.setBook(this.book)}setBook(e){this.instance?.setBook(e)}applyDeltas(e){this.instance?.applyDeltas(e)}},L([_({attribute:!1})],To.prototype,`book`,void 0),Eo=class{reset(){this.previous=void 0}apply(e,t,n){let r=this.previous;if(this.previous=e,!e||e===r)return;let i=r?.length??0;if(r&&i>0&&e.length>=i&&e[0]===r[0]&&e[i-1]===r[i-1]){e.length>i&&t(e.slice(i));return}n(e)}},Do=class extends To{static{this.tagName=`minerva-depth-chart`}createEngine(e,t){return ot(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`range`,e=>this.emit(`minerva-range-change`,{range:e}))]}setRange(e){this.instance?.setRange(e)}},L([_({attribute:!1})],Do.prototype,`options`,void 0),Oo=class extends To{static{this.tagName=`minerva-order-book`}get defaultHeight(){return 420}createEngine(e,t){return it(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`levelClick`,e=>this.emit(`minerva-level-click`,e))]}engineMounted(e){super.engineMounted(e),this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}syncEngine(e,t){super.syncEngine(e,t),t.has(`lastPrice`)&&this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}setLastPrice(e){this.instance?.setLastPrice(e)}},L([_({type:Number,attribute:`last-price`})],Oo.prototype,`lastPrice`,void 0),L([_({attribute:!1})],Oo.prototype,`options`,void 0),ko=class extends To{constructor(...e){super(...e),this.feed=new Eo}static{this.tagName=`minerva-order-book-heatmap`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),st(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e})),e.on(`follow`,e=>this.emit(`minerva-follow-change`,{follow:e}))]}feedTrades(e){let t=t=>e.addTrades(t);this.feed.apply(this.trades,t,t)}engineMounted(e){super.engineMounted(e),this.feedTrades(e)}syncEngine(e,t){super.syncEngine(e,t),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}resetView(){this.instance?.resetView()}getRenderer(){return this.instance?.getRenderer()??null}},L([_({attribute:!1})],ko.prototype,`trades`,void 0),L([_({attribute:!1})],ko.prototype,`options`,void 0),Ao=class extends vr{constructor(...e){super(...e),this.feed=new Eo}static{this.tagName=`minerva-time-and-sales`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),rt(e,t)}engineOptions(){return{...this.options}}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`tradeClick`,e=>this.emit(`minerva-trade-click`,e)),e.on(`pause`,e=>this.emit(`minerva-pause`,{paused:e}))]}feedTrades(e){this.feed.apply(this.trades,t=>e.addTrades(t),t=>e.setTrades(t))}engineMounted(e){this.feedTrades(e)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}setTrades(e){this.instance?.setTrades(e)}clear(){this.instance?.clear()}scrollToLatest(){this.instance?.scrollToLatest()}},L([_({attribute:!1})],Ao.prototype,`trades`,void 0),L([_({attribute:!1})],Ao.prototype,`options`,void 0)})))()}var Mo,No;function Po(){return(Po=e((()=>{gr(),f(),dt(),Mo={fromAttribute:e=>e===null?void 0:/^\d+$/.test(e)?Number(e):e},No=class extends vr{constructor(...e){super(...e),this.height=480,this.chartStyle=`candles`}static{this.tagName=`minerva-trading-chart`}createEngine(e,t){return ft(e,t)}engineOptions(){return{...this.options,bars:this.bars??this.options?.bars,symbol:this.symbol??this.options?.symbol,timeframe:this.timeframe??this.options?.timeframe,chartStyle:this.chartStyle,indicators:this.indicators??this.options?.indicators}}bindEngine(e){return[e.on(`crosshairMove`,e=>this.emit(`minerva-crosshair-move`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`visibleRangeChange`,e=>this.emit(`minerva-visible-range-change`,e)),e.on(`orderMove`,e=>this.emit(`minerva-order-move`,e)),e.on(`orderCreate`,e=>this.emit(`minerva-order-create`,e)),e.on(`orderCancel`,e=>this.emit(`minerva-order-cancel`,e)),e.on(`drawingsChange`,e=>this.emit(`minerva-drawings-change`,{drawings:e})),e.on(`drawingSelect`,e=>this.emit(`minerva-drawing-select`,{id:e})),e.on(`drawingToolChange`,e=>this.emit(`minerva-drawing-tool-change`,{tool:e})),e.on(`undoChange`,e=>this.emit(`minerva-undo-change`,e)),e.on(`replayChange`,e=>this.emit(`minerva-replay-change`,e)),e.on(`fullscreenChange`,e=>this.emit(`minerva-fullscreen-change`,{fullscreen:e})),e.on(`indicatorToggle`,e=>this.emit(`minerva-indicator-toggle`,e)),e.on(`historyRequest`,e=>this.emit(`minerva-history-request`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}updateBar(e){this.instance?.update(e)}appendBars(e){this.instance?.appendBars(e)}prependBars(e){this.instance?.prependBars(e)}setBars(e){this.instance?.setBars(e)}getBarCount(){return this.instance?.getBarCount()??0}getBar(e){return this.instance?.getBar(e)??null}scrollToRealtime(e){this.instance?.scrollToRealtime(e)}fitContent(){this.instance?.fitContent()}getVisibleRange(){return this.instance?.getVisibleRange()??null}setVisibleRange(e){this.instance?.setVisibleRange(e)}getVisibleTimeRange(){return this.instance?.getVisibleTimeRange()??null}setVisibleTimeRange(e){this.instance?.setVisibleTimeRange(e)}setCrosshair(e,t){this.instance?.setCrosshair(e,t)}setScaleMode(e){this.instance?.setScaleMode(e)}resetPriceScales(){this.instance?.resetPriceScales()}setDrawingTool(e){this.instance?.setDrawingTool(e)}getDrawings(){return this.instance?.getDrawings()??[]}removeDrawing(e){this.instance?.removeDrawing(e)}selectDrawing(e){this.instance?.selectDrawing(e)}updateDrawing(e,t){this.instance?.updateDrawing(e,t)}undo(){this.instance?.undo()}redo(){this.instance?.redo()}getUndoState(){return this.instance?.getUndoState()??{canUndo:!1,canRedo:!1}}startReplay(e){this.instance?.startReplay(e)}replayStep(e){this.instance?.replayStep(e)}replayPlay(e){this.instance?.replayPlay(e)}replayPause(){this.instance?.replayPause()}stopReplay(){this.instance?.stopReplay()}getReplayState(){return this.instance?.getReplayState()??null}toDataURL(e,t){return this.instance?.toDataURL(e,t)??``}toBlob(e,t){return this.instance?.toBlob(e,t)??Promise.resolve(null)}requestChartFullscreen(){return this.instance?.requestFullscreen()??Promise.resolve()}exitChartFullscreen(){return this.instance?.exitFullscreen()??Promise.resolve()}setIndicatorVisible(e,t){this.instance?.setIndicatorVisible(e,t)}getRenderer(){return this.instance?.getRenderer()??null}},L([_()],No.prototype,`height`,void 0),L([_({attribute:!1})],No.prototype,`bars`,void 0),L([_()],No.prototype,`symbol`,void 0),L([_({converter:Mo})],No.prototype,`timeframe`,void 0),L([_({attribute:`chart-style`})],No.prototype,`chartStyle`,void 0),L([_({attribute:!1})],No.prototype,`indicators`,void 0),L([_({attribute:!1})],No.prototype,`options`,void 0)})))()}export{$i as $,Ha as A,V as At,ya as B,Wr as Bt,no as C,oi as Ct,X as D,ui as Dt,eo as E,si as Et,Y as F,qr as Ft,fa as G,Br as Gt,Sa as H,Vr as Ht,Ma as I,Jr as It,ca as J,pa as K,Lr as Kt,wa as L,Kr as Lt,Ua as M,ni as Mt,Na as N,B as Nt,Ga as O,ci as Ot,Pa as P,Qr as Pt,na as Q,J as R,Gr as Rt,$a as S,H as St,Za as T,di as Tt,q as U,Rr as Ut,xa as V,Hr as Vt,ga as W,Ur as Wt,ua as X,da as Y,ta as Z,Ya as _,hi as _t,jo as a,Vi as at,Ja as b,pi as bt,wo as c,Bi as ct,Co as d,Pi as dt,K as et,bo as f,ki as ft,mo as g,Ei as gt,po as h,Di as ht,Ao as i,Ri as it,Va as j,ri as jt,Fa as k,ai as kt,$ as l,Fi as lt,xo as m,Ai as mt,Po as n,G as nt,Do as o,Hi as ot,Z as p,W as pt,la as q,R as qt,ko as r,Ji as rt,Oo as s,zi as st,No as t,Qi as tt,Q as u,Ii as ut,Qa as v,vi as vt,qa as w,li as wt,ro as x,mi as xt,to as y,U as yt,ba as z,z as zt};