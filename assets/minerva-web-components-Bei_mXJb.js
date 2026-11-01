import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{$ as t,$n as n,An as r,At as i,Bn as a,Bt as o,Cn as s,Ct as c,En as ee,Et as l,Fn as te,Ft as u,Hn as d,Ht as ne,In as re,It as ie,Jn as ae,Jt as oe,Kn as se,Ln as ce,Nn as le,On as ue,Pn as f,Rn as de,Rt as fe,Sn as pe,Tn as me,Tt as he,Vt as ge,Wn as _e,Wt as ve,Xn as ye,Xt as be,Yn as xe,Yt as Se,Zn as Ce,_t as we,an as Te,at as Ee,bn as De,en as Oe,er as ke,et as Ae,ft as je,hn as Me,ir as Ne,kn as Pe,ln as Fe,lr as Ie,nn as Le,nt as Re,pt as ze,rt as Be,sn as Ve,tr as He,un as Ue,wn as We,xn as Ge,xt as Ke,yn as qe,yt as Je,zn as Ye}from"./angular-preview-CDGnma-W.js";import{A as p,C as m,D as h,N as g,P as _,_ as Xe,b as v,c as Ze,g as Qe,k as y,m as $e,s as et,w as b,x,y as S,z as C}from"./minerva-web-components-DlAztivh.js";import{a as tt,c as nt,d as rt,f as it,l as at,o as ot,s as st,u as ct}from"./angular-preview-DXuT9H-w.js";import{a as lt,r as ut}from"./angular-preview-CPOhk_AS.js";import{$ as dt,$n as ft,A as pt,Ar as w,B as mt,C as ht,Cr as gt,D as _t,E as vt,Er as yt,F as bt,Fr as xt,Ft as St,G as Ct,Gn as T,H as wt,Hn as Tt,Ht as Et,I as Dt,In as Ot,It as kt,J as At,K as jt,L as Mt,Lt as Nt,M as Pt,Mr as Ft,N as It,Nn as Lt,Nr as Rt,O as zt,On as Bt,Or as Vt,P as Ht,Pn as Ut,Pr as E,Q as Wt,Qn as Gt,R as Kt,Rt as qt,S as Jt,Sr as D,St as Yt,T as Xt,Tn as Zt,Tr as Qt,U as $t,Un as en,V as tn,Vn as nn,Vt as rn,W as an,Wn as on,X as sn,Xn as cn,Xt as ln,Y as un,Yt as dn,Z as fn,Zn as pn,_ as mn,_r as hn,a as gn,ar as _n,at as vn,b as yn,bn as O,c as bn,cr as k,dn as A,dr as xn,er as Sn,et as Cn,fn as wn,fr as Tn,g as En,gr as Dn,gt as On,h as kn,hn as An,hr as j,ht as jn,ir as Mn,j as Nn,jn as Pn,jr as Fn,k as In,kr as M,l as Ln,ln as Rn,m as zn,mn as Bn,mr as N,mt as Vn,o as Hn,or as P,ot as Un,p as Wn,pn as Gn,pr as F,pt as Kn,q as qn,qn as Jn,rr as Yn,s as Xn,sr as I,tr as Zn,u as Qn,un as $n,v as er,vr as tr,w as nr,wn as rr,wr as ir,x as ar,xn as L,xr as R,xt as or,y as sr,yr as cr,z as lr,zn as ur}from"./minerva-web-components-CjqKc8e8.js";import{t as z}from"./minerva-web-components-D61_qRVd.js";import{Mn as dr,Nn as fr,On as pr,it as mr,kn as hr,rt as gr}from"./minerva-web-components-DZ8433J5.js";import{_ as _r,a as vr,c as yr,d as br,f as xr,g as Sr,h as Cr,i as wr,l as Tr,m as Er,n as Dr,o as Or,p as kr,r as Ar,s as jr,t as Mr,u as Nr}from"./minerva-web-components-C9hnRSho.js";var Pr,B;function Fr(){return(Fr=e((()=>{M(),P(),T(),Qt(),R(),Dn(),j(),O(),kt(),Or(),p(),m(),v(),f(),et(),Pr={fromAttribute:e=>(e??``).split(/[\s,]+/).map(e=>parseInt(e,10)).filter(e=>!isNaN(e)&&e>0),toAttribute:e=>e.join(`,`)},B=class e extends F{constructor(...e){super(...e),this.current=1,this.total=0,this.pageSize=10,this.disabled=!1,this.showQuickJumper=!1,this.showSizeChanger=!1,this.pageSizeOptions=[10,20,50,100],this.showTotal=!1,this.size=`medium`,this.shape=`rounded`,this.variant=`solid`,this.simple=!1,this.hideEdges=!1,this.hideNumbers=!1,this.responsive=!1,this.jumpValue=``,this.simpleDraft=null,this.ripples=[],this.aria=new w(this),this.locale=new D(this),this.nextRippleId=0,this.restoreFocus=null,this.pagination=new vr(this,qe(this.paginationProps()),()=>!1),this.handleKeyDown=e=>{let t=e.key;(t===`ArrowLeft`||t===`ArrowRight`)&&l(this)===`rtl`&&(t=t===`ArrowLeft`?`ArrowRight`:`ArrowLeft`);let n=_e(t,this.current,this.totalPages);n!==null&&(e.preventDefault(),this.changePage(n,`active`))},this.handleJump=e=>{if(e.key!==`Enter`)return;e.preventDefault();let t=parseInt(this.jumpValue,10);!isNaN(t)&&t>=1&&t<=this.totalPages&&(this.changePage(t),this.jumpValue=``,e.target.value=``)},this.handleSizeChange=e=>{let t=e.target,n=parseInt(t.value,10);this.send({type:`SET_PAGE_SIZE`,pageSize:n}),this.pageSize!==n&&(t.value=String(this.pageSize))},this.commitSimpleDraft=()=>{let e=this.simpleDraft;if(e===null)return;this.simpleDraft=null;let t=parseInt(e,10);isNaN(t)||this.changePage(Math.min(Math.max(t,1),this.totalPages))}}static{this.tagName=`minerva-pagination`}static{this.styles=[N,C`
:host{
display: block;
}
`,L(St)]}paginationProps(){return{page:this.current,pageSize:this.pageSize,total:this.total,disabled:this.disabled,onChange:(e,t)=>this.request(e,t)}}send(e){this.pagination.sync(this.paginationProps()),this.pagination.send(e)}get totalPages(){return ae(this.total,this.pageSize)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}request(e,t){let n={page:e,pageSize:t};return this.emit(`minerva-page-change`,n,{cancelable:!0})?(this.current=e,this.pageSize=t,!0):!1}changePage(e,t=`if-lost`){Me(this.current,e,this.totalPages,this.disabled)&&(this.restoreFocus={mode:t,page:e},this.send({type:`GOTO`,page:e}))}willUpdate(t){k&&(t.has(`current`)||t.has(`total`))&&this.total>0&&this.current>this.totalPages&&I(e.tagName,`current (${this.current}) is greater than the number of pages (${this.totalPages}).`)}updated(){let e=this.restoreFocus;this.restoreFocus=null;let t=this.shadowRoot;if(!e||!t||e.page!==this.current)return;let n=t.activeElement,r=!n||n.disabled===!0;(e.mode===`active`||r)&&(t.querySelector(`[aria-current="page"]`)??t.querySelector(`button:not(:disabled), input`))?.focus()}handleItemClick(e,t,n){if(Me(this.current,e,this.totalPages,this.disabled)){if(n.detail>0){let e=n.currentTarget.getBoundingClientRect();this.ripples=[...this.ripples,{x:n.clientX-e.left,y:n.clientY-e.top,id:this.nextRippleId++,itemKey:t}],clearTimeout(this.rippleTimer),this.rippleTimer=setTimeout(()=>this.ripples=[],1e3)}this.changePage(e)}}label(e,t){let n=this.labels,r=this.locale.t;switch(e){case`prev`:return n?.prev??r(`pagination.prev`);case`next`:return n?.next??r(`pagination.next`);case`jump-prev`:return n?.jumpPrev??r(`pagination.jumpPrev`);case`jump-next`:return n?.jumpNext??r(`pagination.jumpNext`);default:return n?.page?.(t)??r(`pagination.page`,{page:t})}}hookStates(){return{disabled:this.disabled,size:this.size,shape:this.shape,variant:this.variant}}renderItem(e){let{type:t,target:n,key:r}=e;if(t===`ellipsis`)return _`<span class="ellipsis" aria-hidden="true">…</span>`;let i=this.current,a=t===`page`&&n===i,o=this.disabled||(t===`prev`?i<=1:t===`next`&&i>=this.totalPages),s;switch(t){case`prev`:s=_`<slot name="prev-icon">${en}</slot>`;break;case`next`:s=_`<slot name="next-icon">${Tt}</slot>`;break;case`jump-prev`:case`jump-next`:s=_`<span class="jumpWrapper"
><slot
name=${t===`jump-prev`?`jump-prev-icon`:`jump-next-icon`}
>${ft}</slot
><span class="jumpHint" aria-hidden="true"
>${this.label(t,n)}</span
></span
>`;break;default:s=n}return this.itemRender&&(s=this.itemRender(n,t)),_`<button
type="button"
part=${hn(`item`,{current:a,disabled:o})}
data-key=${r}
class=${x({item:!0,active:a,disabled:o,prev:t===`prev`,next:t===`next`,jump:t===`jump-prev`||t===`jump-next`})}
?disabled=${o}
aria-label=${this.label(t,n)}
aria-current=${a?`page`:g}
@keydown=${this.handleKeyDown}
@click=${e=>this.handleItemClick(n,r,e)}
>
${s}
${this.ripples.filter(e=>e.itemKey===r).map(e=>_`<span
class="ripple"
style="left:${e.x}px;top:${e.y}px"
aria-hidden="true"
></span>`)}
</button>`}items(){return ye({page:this.current,totalPages:this.totalPages,siblingCount:this.siblingCount,boundaryCount:this.boundaryCount,hideEdges:this.hideEdges}).map(({key:e,kind:t,page:n})=>({key:e,type:t,target:n}))}renderPageList(){let e=this.current,t=t=>this.hideEdges?g:this.renderItem({key:t,type:t,target:t===`prev`?e-1:e+1});return this.simple?_`${t(`prev`)}
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
${t(`next`)}`:this.hideNumbers?_`${t(`prev`)}
<span class="counter" aria-live="polite"
>${e} / ${this.totalPages}</span
>
${t(`next`)}`:Ze(this.items(),e=>e.key,e=>this.renderItem(e))}render(){let e=this.locale.t,t=this.labels,n=this.total,r=this.pageSize,i=le(this.current,r,n),a=this.pageSizeOptions.includes(r)?this.pageSizeOptions:[...this.pageSizeOptions,r].sort((e,t)=>e-t),o=n=>t?.pageSizeOption?.(n)??e(`pagination.pageSizeOption`,{size:n});return _`<nav
part="root"
aria-label=${this.aria.label??t?.nav??e(`pagination.nav`)}
class=${x({pagination:!0,disabled:this.disabled,small:this.size===`small`,large:this.size===`large`,circle:this.shape===`circle`,square:this.shape===`square`,[this.variant]:!0,responsive:this.responsive})}
>
${this.showTotal?_`<div
part="total"
class="total"
aria-live="polite"
aria-atomic="true"
>
${this.totalRender?this.totalRender(n,i):t?.total?.(n)??e(`pagination.total`,{total:n})}
</div>`:g}
${this.renderPageList()}
${this.showQuickJumper?_`<label part="jumper" class="jumper">
${t?.jumpTo??e(`pagination.jumpTo`)}
<input
.value=${this.jumpValue}
?disabled=${this.disabled}
inputmode="numeric"
aria-label=${t?.jumpToInput??e(`pagination.jumpToInput`)}
@input=${e=>this.jumpValue=e.target.value}
@keydown=${this.handleJump}
/>
</label>`:g}
${this.showSizeChanger?_`<div class="sizeChanger">
<select
part="size-changer"
?disabled=${this.disabled}
aria-label=${t?.pageSize??e(`pagination.pageSize`)}
@change=${this.handleSizeChange}
>
${a.map(e=>_`<option
value=${e}
.selected=${e===r}
>
${o(e)}
</option>`)}
</select>
</div>`:g}
</nav>`}},z([y({type:Number,reflect:!0})],B.prototype,`current`,void 0),z([y({type:Number})],B.prototype,`total`,void 0),z([y({type:Number,reflect:!0,attribute:`page-size`})],B.prototype,`pageSize`,void 0),z([y({type:Boolean,reflect:!0})],B.prototype,`disabled`,void 0),z([y({type:Boolean,attribute:`show-quick-jumper`})],B.prototype,`showQuickJumper`,void 0),z([y({type:Boolean,attribute:`show-size-changer`})],B.prototype,`showSizeChanger`,void 0),z([y({attribute:`page-size-options`,converter:Pr})],B.prototype,`pageSizeOptions`,void 0),z([y({type:Boolean,attribute:`show-total`})],B.prototype,`showTotal`,void 0),z([y({attribute:!1})],B.prototype,`totalRender`,void 0),z([y({attribute:!1})],B.prototype,`itemRender`,void 0),z([y({reflect:!0})],B.prototype,`size`,void 0),z([y({reflect:!0})],B.prototype,`shape`,void 0),z([y({reflect:!0})],B.prototype,`variant`,void 0),z([y({type:Boolean,reflect:!0})],B.prototype,`simple`,void 0),z([y({type:Number,attribute:`sibling-count`})],B.prototype,`siblingCount`,void 0),z([y({type:Number,attribute:`boundary-count`})],B.prototype,`boundaryCount`,void 0),z([y({type:Boolean,attribute:`hide-edges`})],B.prototype,`hideEdges`,void 0),z([y({type:Boolean,attribute:`hide-numbers`})],B.prototype,`hideNumbers`,void 0),z([y({type:Boolean,reflect:!0})],B.prototype,`responsive`,void 0),z([y({attribute:!1})],B.prototype,`labels`,void 0),z([h()],B.prototype,`jumpValue`,void 0),z([h()],B.prototype,`simpleDraft`,void 0),z([h()],B.prototype,`ripples`,void 0)})))()}function Ir(e,t,n,r){let i=t==null?{base:1}:typeof t==`number`?{base:t}:t,a={},o=1;for(let t of Lr){let n=i[t]??o;(!Number.isInteger(n)||n<1||n>12)&&(k&&I(e,`columns must be integers from 1 to 12 (got ${String(n)} for "${t}"); using ${o}.`),n=o),a[`--grid-columns-${t}`]=String(n),o=n}return a[`--grid-row-gap`]=s(n),a[`--grid-column-gap`]=s(r),a}var Lr,Rr,zr,Br;function Vr(){return(Vr=e((()=>{P(),j(),O(),dr(),Yt(),p(),m(),Xe(),Lr=[`base`,`sm`,`md`,`lg`],Rr={fromAttribute(e){if(e===null)return;let t=e.trim();if(t.startsWith(`{`))try{return JSON.parse(t)}catch{return NaN}let n=t.split(/[\s,]+/).filter(Boolean).map(Number);if(n.length<=1)return n[0]??NaN;let[r,i,a,o]=n;return{base:r,sm:i,md:a,lg:o}},toAttribute(e){return e===void 0?null:typeof e==`number`?String(e):JSON.stringify(e)}},zr=class e extends F{constructor(...e){super(...e),this.columns=1,this.gap=4}static{this.tagName=`minerva-responsive-grid`}static{this.styles=[N,C`
:host{
display: block;
min-width: 0;
}
.layout ::slotted(*){
min-width: 0;
}
`,L(or)]}render(){let t=Ir(e.tagName,this.columns,this.rowGap??this.gap,this.columnGap??this.gap);return _`<div class="root" part="root" style=${S(t)}>
<div class="layout" part="layout"><slot></slot></div>
</div>`}},z([y({converter:Rr})],zr.prototype,`columns`,void 0),z([y({converter:fr})],zr.prototype,`gap`,void 0),z([y({attribute:`row-gap`,converter:fr})],zr.prototype,`rowGap`,void 0),z([y({attribute:`column-gap`,converter:fr})],zr.prototype,`columnGap`,void 0),Br=class extends F{constructor(...e){super(...e),this.fullWidth=!1}static{this.tagName=`minerva-grid-item`}static{this.styles=[N,C`
:host{
display: block;
min-width: 0;
}
:host([full-width]){
grid-column: 1 / -1;
}
`]}render(){return _`<slot></slot>`}},z([y({type:Boolean,reflect:!0,attribute:`full-width`})],Br.prototype,`fullWidth`,void 0)})))()}var V;function Hr(){return(Hr=e((()=>{M(),P(),R(),j(),O(),wn(),Vn(),p(),m(),v(),$e(),V=class e extends A{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.variant=`outline`,this.size=`medium`,this.invalid=!1,this.placeholder=``,this.readOnly=!1,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-textarea`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,C`
:host{
display: block;
width: 100%;
min-width: 0;
}
`,L(Kn)]}focus(e){this.textarea?.focus(e)}blur(){this.textarea?.blur()}select(){this.textarea?.select()}getFormValue(){return this.value}getValidity(){let e=this.textarea;return e?{flags:Gn(e.validity),message:e.validationMessage,anchor:e}:this.required&&!this.value?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`)}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(t){t.has(`value`)&&t.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),k&&(t.has(`minLength`)||t.has(`maxLength`))&&this.minLength!==void 0&&this.maxLength!==void 0&&this.minLength>this.maxLength&&I(e.tagName,`minlength (${this.minLength}) is greater than maxlength (${this.maxLength}): no value can be valid.`)}handleInput(){this.value=String(this.textarea.value),this.emit(`minerva-input`,{value:this.value})}handleChange(){this.value=String(this.textarea.value),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,variant:this.variant}}render(){let e=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return _`<textarea
      part="root"
      class=${x({textarea:!0,[this.variant]:!0,[this.size]:!0,invalid:e})}
      style="resize: none"
      .value=${Qe(this.value)}
      name=${this.name||g}
      placeholder=${this.placeholder||g}
      rows=${this.rows??g}
      ?disabled=${this.isDisabled}
      ?readonly=${this.readOnly}
      ?required=${this.required}
      minlength=${this.minLength??g}
      maxlength=${this.maxLength??g}
      autocomplete=${this.autocomplete??g}
      wrap=${this.wrap??g}
      aria-label=${this.aria.label??g}
      aria-description=${this.aria.description??g}
      aria-invalid=${e?`true`:g}
      aria-required=${this.aria.attr(`aria-required`)??g}
      aria-readonly=${this.aria.attr(`aria-readonly`)??g}
      @input=${this.handleInput}
      @change=${this.handleChange}
    ></textarea>`}},z([y({attribute:!1})],V.prototype,`value`,void 0),z([y({attribute:`value`})],V.prototype,`defaultValue`,void 0),z([y({reflect:!0})],V.prototype,`variant`,void 0),z([y({reflect:!0})],V.prototype,`size`,void 0),z([y({type:Boolean,reflect:!0})],V.prototype,`invalid`,void 0),z([y()],V.prototype,`placeholder`,void 0),z([y({type:Boolean,reflect:!0,attribute:`readonly`})],V.prototype,`readOnly`,void 0),z([y({type:Number})],V.prototype,`rows`,void 0),z([y({type:Number,attribute:`minlength`})],V.prototype,`minLength`,void 0),z([y({type:Number,attribute:`maxlength`})],V.prototype,`maxLength`,void 0),z([y()],V.prototype,`autocomplete`,void 0),z([y()],V.prototype,`wrap`,void 0),z([b(`textarea`)],V.prototype,`textarea`,void 0)})))()}var Ur;function Wr(){return(Wr=e((()=>{M(),P(),T(),R(),j(),Tn(),O(),Un(),p(),m(),v(),Xe(),Ur=class e extends F{constructor(...e){super(...e),this.variant=`spinner`,this.size=`medium`,this.color=`primary`,this.label=``,this.decorative=!1,this.full=!1,this.locale=new D(this),this.aria=new w(this),this.slots=new xn(this)}static{this.tagName=`minerva-progress`}static{this.styles=[N,C`
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
`,L(vn)]}hookStates(){return{variant:this.variant===`dottedBar`?`dotted-bar`:this.variant,size:this.size,color:this.color}}updated(){k&&this.full&&this.width&&I(e.tagName,`width is ignored when full is set.`)}renderIndicator(){let e=this.size;switch(this.variant){case`bar`:return _`<div part="indicator" class="barContainer ${e}">
<div class="bar"></div>
</div>`;case`dottedBar`:return _`<div part="indicator" class="dottedBarContainer ${e}">
<div class="dottedBar"></div>
</div>`;case`wave`:return _`<div part="indicator" class="waveContainer ${e}">
<span class="wave" aria-hidden="true">${_n}</span>
</div>`;case`circle`:return _`<span
part="indicator"
class="circle ${e}"
aria-hidden="true"
>${Lt}</span
>`;case`spinner`:return _`<span
part="indicator"
class="spinner ${e}"
aria-hidden="true"
>${Bt}</span
>`;default:return g}}render(){let e=this.variant===`bar`||this.variant===`dottedBar`,t=!!this.label||this.slots.test(`label`),n=this.aria.label;return _`<div
part="root"
class=${x({progressIndicator:!0,[this.color]:!0,fullWidth:this.full,defaultWidth:!this.full&&!this.width&&e})}
style=${S({width:this.width&&!this.full?this.width:void 0})}
role=${this.decorative?g:`progressbar`}
aria-hidden=${this.decorative?`true`:g}
aria-label=${this.decorative?g:n??(t?g:this.locale.t(`common.loading`))}
aria-labelledby=${!this.decorative&&!n&&t?`label`:g}
>
${this.slots.test(`icon`)?_`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:g}
${this.renderIndicator()}
${t?_`<span id="label" part="label" class="label"
><slot name="label">${this.label}</slot></span
>`:g}
</div>`}},z([y({reflect:!0})],Ur.prototype,`variant`,void 0),z([y({reflect:!0})],Ur.prototype,`size`,void 0),z([y({reflect:!0})],Ur.prototype,`color`,void 0),z([y()],Ur.prototype,`label`,void 0),z([y({type:Boolean,reflect:!0})],Ur.prototype,`decorative`,void 0),z([y()],Ur.prototype,`width`,void 0),z([y({type:Boolean,reflect:!0})],Ur.prototype,`full`,void 0)})))()}var Gr;function Kr(){return(Kr=e((()=>{M(),T(),Qt(),R(),j(),Tn(),O(),Sr(),xr(),Nr(),jr(),Et(),Nt(),p(),m(),v(),Gr=class extends F{constructor(...e){super(...e),this.open=!1,this.label=``,this.description=``,this.size=`medium`,this.hideCloseButton=!1,this.dialogRole=`dialog`,this.locale=new D(this),this.aria=new w(this),this.slots=new xn(this),this.presence=new qt(this,()=>this.panel),this.modal=new yr(this),this.focusScope=new kr(this,()=>({trapped:!0,loop:!0,restoreFocus:!0})),this.layer=new _r(this,()=>({disableOutsidePointerEvents:!0,branches:()=>[this.triggerElement()],onFocusOutside:e=>e.preventDefault(),onEscapeKeyDown:()=>this.lastReason(`escape`),onPointerDownOutside:()=>this.lastReason(`outside`),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{let t=this.triggerElement();!e.defaultPrevented&&t&&e.composedPath().includes(t)&&this.requestOpenChange(!this.open,`trigger`)}}static{this.tagName=`minerva-modal`}static{this.styles=[N,br,C`
:host{
display: contents;
}
.content .body{
flex: 1 1 auto;
}
`,L(rn)]}lastReason(e){this.reason=e}show(){this.open=!0}hide(){this.open=!1}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}hookStates(){return{state:this.open?`open`:`closed`,size:this.size}}updated(e){let t=this.open||this.presence.present;if(e.has(`open`)){let e=this.panel;this.open&&e?(ir(this.overlay),ir(e),this.modal.activate(this),this.layer.activate(e),this.focusScope.activate(e),this.emit(`minerva-after-open`)):this.open||(this.focusScope.deactivate(),this.layer.deactivate(),this.modal.deactivate())}this.wasPresent&&!t&&this.afterClose(),this.wasPresent=t}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),gt(this.panel),gt(this.overlay)}afterClose(){gt(this.panel),gt(this.overlay),this.emit(`minerva-after-close`)}render(){let e=this.open||this.presence.present,t=this.open?`open`:`closed`,n=!!this.label||this.slots.test(`header`),r=this.description||this.aria.description;return _`<slot name="trigger"></slot> ${e?_`<div
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
aria-labelledby=${n?`title`:g}
aria-label=${n?g:this.aria.label??g}
aria-describedby=${r?`description`:g}
tabindex="-1"
data-state=${t}
>
${r?_`<p
id="description"
class="description"
part="description"
>
${r}
</p>`:g}
${n?_`<div id="title" class="header" part="header">
<slot name="header">${this.label}</slot>
</div>`:g}
<div class="body" part="body"><slot></slot></div>
${this.slots.test(`footer`)?_`<div class="footer" part="footer">
<slot name="footer"></slot>
</div>`:g}
${this.hideCloseButton?g:_`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`modal.close`)}
@click=${()=>this.requestOpenChange(!1,`close-button`)}
>
${Gt}
</button>`}
</div>`:g}`}},z([y({type:Boolean,reflect:!0})],Gr.prototype,`open`,void 0),z([y()],Gr.prototype,`label`,void 0),z([y()],Gr.prototype,`description`,void 0),z([y({reflect:!0})],Gr.prototype,`size`,void 0),z([y({type:Boolean,attribute:`hide-close-button`})],Gr.prototype,`hideCloseButton`,void 0),z([y({attribute:`close-label`})],Gr.prototype,`closeLabel`,void 0),z([y({attribute:`dialog-role`})],Gr.prototype,`dialogRole`,void 0),z([b(`.content`)],Gr.prototype,`panel`,void 0),z([b(`.overlay`)],Gr.prototype,`overlay`,void 0)})))()}var qr,Jr,Yr,H;function Xr(){return(Xr=e((()=>{M(),P(),T(),R(),Dn(),j(),O(),Cn(),p(),m(),v(),c(),f(),qr=[`mon`,`tue`,`wed`,`thu`,`fri`,`sat`,`sun`],Jr=/^\d{4}-\d{2}-\d{2}$/,Yr={fromAttribute(e){let t=e?.trim().match(/^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/);return t?o(Number(t[1]),Number(t[2])-1,1):void 0},toAttribute(e){return e instanceof Date&&!Number.isNaN(e.getTime())?We(e).slice(0,7):null}},H=class e extends F{constructor(...e){super(...e),this.events=[],this.clickableEvents=!1,this.size=`medium`,this.disabled=!1,this.hideEvents=!1,this.focusedKey=``,this.pendingFocus=null,this.i18n=new D(this),this.aria=new w(this)}static{this.tagName=`minerva-month-calendar`}static{this.styles=[N,C`
:host{
display: block;


inline-size: 100%;
}
.navButton svg{
flex-shrink: 0;
}
`,L(dt)]}get displayed(){let e=this.month;return e instanceof Date&&!Number.isNaN(e.getTime())?d(e):d(new Date)}focus(e){this.renderRoot.querySelector(`[role="gridcell"][tabindex="0"]`)?.focus(e)}goToMonth(e){let t=d(e);We(t)!==We(this.displayed)&&(this.month=t,this.emit(`minerva-month-change`,{month:t}))}select(e){if(this.disabled)return;let t=We(e);t!==this.value&&(this.value=t,this.emit(`minerva-change`,{value:t})),xe(e,this.displayed)||this.goToMonth(e)}handleKeyDown(e,t){if(this.disabled)return;if(e.key===`Enter`||e.key===` `){e.preventDefault(),e.repeat||this.select(t);return}let r=Je(e.key,this),i=(t.getDay()+6)%7,a;switch(r){case`ArrowLeft`:a=n(t,-1);break;case`ArrowRight`:a=n(t,1);break;case`ArrowUp`:a=n(t,-7);break;case`ArrowDown`:a=n(t,7);break;case`Home`:a=n(t,-i);break;case`End`:a=n(t,6-i);break;case`PageUp`:case`PageDown`:{let r=(e.key===`PageUp`?-1:1)*(e.shiftKey?12:1),i=d(t,r),s=n(d(i,1),-1).getDate();a=o(i.getFullYear(),i.getMonth(),Math.min(t.getDate(),s));break}default:return}e.preventDefault(),this.pendingFocus=We(a),this.focusedKey=We(a),xe(a,this.displayed)||this.goToMonth(a)}willUpdate(t){k&&t.has(`value`)&&this.value&&!Jr.test(this.value)&&I(e.tagName,`value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`)}updated(){if(this.disabled||!this.pendingFocus)return;let e=this.renderRoot.querySelector(`[data-date="${this.pendingFocus}"]`);e&&(this.pendingFocus=null,e.focus())}hookStates(){return{disabled:this.disabled,size:this.size}}render(){let e=this.i18n.t,t=this.displayed,r=n(t,-((t.getDay()+6)%7)),i=Array.from({length:42},(e,t)=>n(r,t)),a=i.map(We),o=new Date,s=We(o),c=this.value||void 0,ee=[this.focusedKey,c,xe(o,t)?s:``,We(t)].find(e=>e&&a.includes(e)),l=this.events??[],te=new Map;for(let e of l)te.set(e.date,(te.get(e.date)??0)+1);let u=l.filter(e=>e.date===c),ne;try{ne=new Intl.DateTimeFormat(this.locale??this.i18n.language,{year:`numeric`,month:`long`}).format(t)}catch{ne=We(t).slice(0,7)}let re=this.disabled,{rangeStart:ie,rangeEnd:ae}=this,oe=ie&&ae&&Jr.test(ie)&&Jr.test(ae)?[ie,ae].sort():void 0,se=[`small`,`medium`,`large`].includes(this.size)?this.size:`medium`;return _`<section
part="root"
class="monthCalendar ${se}"
aria-label=${this.aria.label??e(`monthCalendar.label`)}
>
<div class="toolbar">
<h2 id="heading" part="heading" class="heading" aria-live="polite">
${ne}
</h2>
<div class="navigation">
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.previousMonthLabel??e(`monthCalendar.previousMonth`)}
?disabled=${re}
@click=${()=>this.goToMonth(d(t,-1))}
>
${en}
</button>
<button
type="button"
part="nav-button"
class="navButton"
?disabled=${re}
@click=${()=>this.goToMonth(new Date)}
>
${Pn} ${this.todayLabel??e(`monthCalendar.today`)}
</button>
<button
type="button"
part="nav-button"
class="navButton iconButton"
aria-label=${this.nextMonthLabel??e(`monthCalendar.nextMonth`)}
?disabled=${re}
@click=${()=>this.goToMonth(d(t,1))}
>
${Tt}
</button>
</div>
</div>
<div
part="grid"
role="grid"
aria-labelledby="heading"
aria-disabled=${re?`true`:g}
class="grid"
>
<div role="row" class="week">
${qr.map((t,n)=>_`<div role="columnheader" class="weekday">
${this.weekdayLabels?.[n]??e(`monthCalendar.weekdays.${t}`)}
</div>`)}
</div>
${Array.from({length:6},(n,r)=>_`<div role="row" class="week">
${i.slice(r*7,r*7+7).map(n=>{let r=We(n),i=te.get(r)??0,a=this.getDayLabel?this.getDayLabel(r,i):i?e(`monthCalendar.dayWithEvents`,{date:r,count:i}):r,o=!!oe&&r>=oe[0]&&r<=oe[1],l={selected:c===r,today:r===s,outside:!xe(n,t),disabled:re};return _`<div
role="gridcell"
part=${hn(`day`,l)}
class=${x({day:!0,inRange:o,rangeStart:o&&r===oe?.[0],rangeEnd:o&&r===oe?.[1]})}
data-date=${r}
?data-outside=${l.outside}
aria-label=${a}
aria-selected=${String(l.selected)}
aria-current=${l.today?`date`:g}
aria-disabled=${re?`true`:g}
tabindex=${!re&&r===ee?`0`:`-1`}
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
${!this.hideEvents&&c?_`<section
part="events"
class="events"
aria-label=${this.getEventsLabel?this.getEventsLabel(c):e(`monthCalendar.eventsLabel`,{date:c})}
>
<h3 class="eventsHeading">${c}</h3>
${u.length?_`<ul class="eventList">
${u.map(e=>_`<li class="eventItem">
${this.clickableEvents?_`<button
type="button"
part="event"
class="eventButton"
?disabled=${re}
@click=${()=>this.emit(`minerva-event-click`,{event:e})}
>
${e.title}
</button>`:_`<span part="event">${e.title}</span>`}
</li>`)}
</ul>`:_`<p class="empty" part="empty">
${this.emptyEventsText??e(`monthCalendar.noEvents`)}
</p>`}
</section>`:g}
</section>`}},z([y({converter:Yr,reflect:!0})],H.prototype,`month`,void 0),z([y({reflect:!0})],H.prototype,`value`,void 0),z([y({attribute:!1})],H.prototype,`events`,void 0),z([y({type:Boolean,attribute:`clickable-events`})],H.prototype,`clickableEvents`,void 0),z([y({attribute:`range-start`,reflect:!0})],H.prototype,`rangeStart`,void 0),z([y({attribute:`range-end`,reflect:!0})],H.prototype,`rangeEnd`,void 0),z([y({reflect:!0})],H.prototype,`size`,void 0),z([y({type:Boolean,reflect:!0})],H.prototype,`disabled`,void 0),z([y({type:Boolean,attribute:`hide-events`})],H.prototype,`hideEvents`,void 0),z([y({attribute:`previous-month-label`})],H.prototype,`previousMonthLabel`,void 0),z([y({attribute:`next-month-label`})],H.prototype,`nextMonthLabel`,void 0),z([y({attribute:`today-label`})],H.prototype,`todayLabel`,void 0),z([y({attribute:`empty-events-text`})],H.prototype,`emptyEventsText`,void 0),z([y()],H.prototype,`locale`,void 0),z([y({attribute:!1})],H.prototype,`weekdayLabels`,void 0),z([y({attribute:!1})],H.prototype,`getDayLabel`,void 0),z([y({attribute:!1})],H.prototype,`getEventsLabel`,void 0),z([h()],H.prototype,`focusedKey`,void 0)})))()}function Zr(e,t,n){for(let r of e){if(r.id===t)return!0;if(r.children&&Zr(r.children,t,n))return n.add(r.id),!0}return!1}var Qr,$r,ei;function ti(){return(ti=e((()=>{M(),P(),T(),Qt(),R(),Dn(),j(),O(),dn(),Wt(),Ar(),p(),m(),v(),et(),Qr=`.item`,$r=`.children`,ei=class e extends F{constructor(...e){super(...e),this.sections=[],this.collapsed=!1,this.wrapLabels=!1,this.expandedIds=[],this.explicitlyCollapsed=new Set,this.aria=new w(this),this.locale=new D(this),this.typeahead=new wr(this),this.handleNavKeyDown=e=>{if(e.defaultPrevented)return;let t=e.composedPath()[0]?.closest?.(Qr);if(!t||!this.shadowRoot?.contains(t))return;let n=this.focusableItems(),r=n.indexOf(t),i;switch(this.logicalKey(e.key)){case`ArrowDown`:i=n[r+1];break;case`ArrowUp`:i=r>0?n[r-1]:void 0;break;case`Home`:i=n[0];break;case`End`:i=n[n.length-1];break;case`ArrowLeft`:if(t.getAttribute(`aria-expanded`)===`true`)return;i=t.closest($r)?.parentElement?.querySelector(`:scope > ${Qr}`);break;default:{if(e.altKey||e.ctrlKey||e.metaKey)return;let t=this.typeahead.search(e.key,n.map(e=>({text:e.querySelector(`.label`)?.textContent??``})),r);if(t===-1)return;i=n[t]}}i&&(e.preventDefault(),i.focus())}}static{this.tagName=`minerva-nav-tree`}static{this.styles=[N,C`
:host{
display: block;
}
`,L(fn)]}activeAncestors(){let e=new Set;for(let t of this.sections)Zr(t.items,this.activeId,e);return e}isExpanded(e,t){return this.expandedIds.includes(e)||!this.explicitlyCollapsed.has(e)&&t.has(e)}willUpdate(t){if(k&&t.has(`sections`)){let t=new Set,n=r=>{for(let i of r)t.has(i.id)&&I(e.tagName,`duplicate item id "${i.id}": ids must be unique.`),t.add(i.id),i.children&&n(i.children)};for(let e of this.sections??[])n(e.items??[])}}setItemExpanded(e,t){let n=new Set(this.expandedIds);t?n.add(e.id):n.delete(e.id);let r=Array.from(n),i={expandedIds:r,item:e,expanded:t};if(!this.emit(`minerva-expanded-change`,i,{cancelable:!0}))return;let a=new Set(this.explicitlyCollapsed);t?a.delete(e.id):a.add(e.id),this.explicitlyCollapsed=a,this.expandedIds=r}select(e,t){let n={value:e.id,item:e};this.emit(`minerva-select`,n,{cancelable:!0})||t?.preventDefault()}toggleItem(e){this.setItemExpanded(e,!this.isExpanded(e.id,this.activeAncestors())),this.select(e)}focusableItems(){return Array.from(this.shadowRoot?.querySelectorAll(Qr)??[]).filter(e=>!e.disabled&&e.getAttribute(`aria-disabled`)!==`true`)}logicalKey(e){return e!==`ArrowLeft`&&e!==`ArrowRight`||l(this)!==`rtl`?e:e===`ArrowLeft`?`ArrowRight`:`ArrowLeft`}renderSectionTitle(e){return _`<h2 part="group-label" class="sectionTitle">${e}</h2>`}renderContent(e,t){return _`<span part="icon" class="icon" aria-hidden="true"
>${e.icon??g}</span
><span class="copy"
><span part="label" class="label">${e.label}</span>${e.description?_`<small part="description" class="description"
>${e.description}</small
>`:g}</span
>${!this.collapsed&&(e.endContent||t)?_`<span class="trailing"
>${e.endContent?_`<span class="end">${e.endContent}</span>`:g}${t?_`<span class="chevron" aria-hidden="true"
>${nn}</span
>`:g}</span
>`:g}`}renderItem(t,n,r){let i=!!t.children?.length,a=t.id===this.activeId,o=r.has(t.id),s=i&&this.isExpanded(t.id,r),c=!!t.disabled,ee={item:!0,nested:n>0,active:a,disabled:c},l=Object.entries(ee).filter(([,e])=>e).map(([e])=>e).join(` `),te=t.description?`${t.label} / ${t.description}`:t.label,u=this.renderContent(t,i);if(i)return _`<div class="branch">
<button
part=${hn(`item`,{current:a,expanded:s,disabled:c})}
class=${x(ee)}
type="button"
title=${te}
aria-expanded=${s?`true`:`false`}
data-id=${t.id}
?data-current=${a}
data-ancestor-active=${o?`true`:g}
?data-expanded=${s}
?disabled=${c}
@click=${()=>this.toggleItem(t)}
@keydown=${e=>{if(this.collapsed)return;let n=this.logicalKey(e.key);n===`ArrowRight`?(e.preventDefault(),s?e.currentTarget.parentElement?.querySelector(`${$r} ${Qr}`)?.focus():this.setItemExpanded(t,!0)):n===`ArrowLeft`&&s&&(e.preventDefault(),this.setItemExpanded(t,!1))}}
>
${u}
</button>
${s&&!this.collapsed?_`<div class="children">
${Ze(t.children??[],e=>e.id,e=>this.renderItem(e,n+1,r))}
</div>`:g}
</div>`;if(this.renderLink)return this.renderLink(t,u,{active:a,ancestorActive:o,expanded:!1,depth:n,collapsed:this.collapsed,hasChildren:i,disabled:c,className:l});let d=hn(`item`,{current:a,disabled:c});return c?_`<span
part=${d}
class=${x(ee)}
title=${te}
data-id=${t.id}
?data-current=${a}
role="link"
aria-disabled="true"
>${u}</span
>`:t.href===void 0?_`<button
part=${d}
class=${x(ee)}
type="button"
title=${te}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:g}
@click=${()=>this.select(t)}
>
${u}
</button>`:_`<a
part=${d}
class=${x(ee)}
href=${ln(e.tagName,t.href)??g}
title=${te}
data-id=${t.id}
?data-current=${a}
aria-current=${a?`page`:g}
@click=${e=>this.select(t,e)}
>${u}</a
>`}render(){let e=this.activeAncestors(),t=this.getAttribute(`aria-labelledby`);return _`<nav
part="root"
class=${x({navTree:!0,collapsed:this.collapsed,wrapLabels:this.wrapLabels&&!this.collapsed})}
aria-label=${this.aria.label??(t?g:this.locale.t(`navTree.label`))}
@keydown=${this.handleNavKeyDown}
>
${Ze(this.sections??[],e=>e.id,t=>_`<section part="group" class="section">
${t.title?this.renderSectionTitle(t.title):g}
<div class="list">
${Ze(t.items,e=>e.id,t=>this.renderItem(t,0,e))}
</div>
</section>`)}
</nav>`}},z([y({attribute:!1})],ei.prototype,`sections`,void 0),z([y({attribute:`active-id`,reflect:!0})],ei.prototype,`activeId`,void 0),z([y({type:Boolean,reflect:!0})],ei.prototype,`collapsed`,void 0),z([y({type:Boolean,reflect:!0,attribute:`wrap-labels`})],ei.prototype,`wrapLabels`,void 0),z([y({attribute:!1})],ei.prototype,`expandedIds`,void 0),z([y({attribute:!1})],ei.prototype,`renderLink`,void 0),z([h()],ei.prototype,`explicitlyCollapsed`,void 0)})))()}var ni,U;function ri(){return(ri=e((()=>{M(),P(),T(),R(),j(),O(),wn(),sn(),p(),m(),v(),f(),$e(),ni={fromAttribute:e=>e===null||e.trim()===``||Number.isNaN(Number(e))?null:Number(e),toAttribute:e=>e===null?null:String(e)},U=class e extends A{constructor(...e){super(...e),this.value=null,this.defaultValue=null,this.step=1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.showStepper=!1,this.noEmpty=!1,this.placeholder=``,this.draft=``,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.dirty=!1}static{this.tagName=`minerva-number-input`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,C`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,L(un)]}get resolvedPrecision(){return this.precision??Ce(this.step)}get locked(){return this.isDisabled||this.readOnly}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}stepUp(){this.value=this.stepped(this.step)}stepDown(){this.value=this.stepped(-this.step)}getFormValue(){return de(this.value,this.resolvedPrecision)}getValidity(){let{t:e}=this.locale,t=this.input,n=this.draft.trim();if(n&&n!==`-`&&n!==`.`){let r=He(n);return r===null?{flags:{badInput:!0},message:this.notANumberMessage??e(`numberInput.notANumber`),anchor:t}:this.min!==void 0&&r<this.min?{flags:{rangeUnderflow:!0},message:this.belowMinMessage??e(`validation.rangeUnderflow`,{min:this.min}),anchor:t}:this.max!==void 0&&r>this.max?{flags:{rangeOverflow:!0},message:this.aboveMaxMessage??e(`validation.rangeOverflow`,{max:this.max}),anchor:t}:{flags:{},message:``}}return this.required&&this.value===null?{flags:{valueMissing:!0},message:e(`validation.valueMissing`),anchor:t}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue,this.draft=de(this.value,this.resolvedPrecision)}restoreFormState(e){typeof e==`string`&&(this.value=He(e))}willUpdate(t){if(t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),t.has(`value`)||t.has(`precision`)||t.has(`step`)){let e=He(this.draft);(e===null||e!==this.value)&&(this.draft=de(this.value,this.resolvedPrecision))}k&&(t.has(`min`)||t.has(`max`))&&this.min!==void 0&&this.max!==void 0&&this.min>this.max&&I(e.tagName,`min (${this.min}) is greater than max (${this.max}): every value is clamped.`)}stepped(e){let t=He(this.draft)??this.value??0;return Number(De(t+e,this.min,this.max).toFixed(this.resolvedPrecision))}commitValue(e){let t=this.resolvedPrecision,n=e===null?null:Number(e.toFixed(t));this.draft=de(n,t),n!==this.value&&(this.dirty=!0,this.value=n,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:n}))}commit(e){if(this.locked)return;let t=e.trim();if(t===``||t===`-`){this.noEmpty?this.commitValue(De(this.min??0,this.min,this.max)):this.commitValue(null);return}let n=He(t);if(n===null){this.draft=de(this.value,this.resolvedPrecision);return}this.commitValue(De(n,this.min,this.max))}adjust(e){this.locked||this.commitValue(this.stepped(e))}handleInput(){this.draft=String(this.input.value),this.emit(`minerva-input`,{value:He(this.draft)})}handleKeyDown(e){if(this.locked||e.defaultPrevented)return;let{key:t}=e;t===`ArrowUp`||t===`ArrowDown`?(e.preventDefault(),this.adjust(t===`ArrowUp`?this.step:-this.step)):t===`PageUp`||t===`PageDown`?(e.preventDefault(),this.adjust((t===`PageUp`?10:-10)*this.step)):t===`Home`&&this.min!==void 0?(e.preventDefault(),this.commitValue(this.min)):t===`End`&&this.max!==void 0?(e.preventDefault(),this.commitValue(this.max)):t===`Enter`&&this.input.blur()}handleBlur(){this.commit(String(this.input.value))}draftError(){let{t:e}=this.locale,t=this.draft.trim();if(!t||t===`-`||t===`.`)return;let n=He(t);if(n===null)return this.notANumberMessage??e(`numberInput.notANumber`);if(this.min!==void 0&&n<this.min)return this.belowMinMessage??e(`numberInput.belowMin`,{min:this.min});if(this.max!==void 0&&n>this.max)return this.aboveMaxMessage??e(`numberInput.aboveMax`,{max:this.max})}hookStates(){return{disabled:this.isDisabled,invalid:this.invalid||this.draftError()!==void 0||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.locked,r=this.draftError(),i=r!==void 0,a=this.invalid||i||this.aria.attr(`aria-invalid`)===`true`,o=this.value??0;return _`<div
part="root"
class=${x({root:!0,[this.size]:!0,invalid:a,shake:i,disabled:t})}
title=${r??g}
>
<input
part="input"
class="field"
type="text"
inputmode="decimal"
role="spinbutton"
.value=${Qe(this.draft)}
placeholder=${this.placeholder||g}
?disabled=${t}
?readonly=${this.readOnly}
?required=${this.required}
aria-valuemin=${this.min??g}
aria-valuemax=${this.max??g}
aria-valuenow=${this.value??g}
aria-label=${this.aria.label??g}
aria-description=${this.aria.description??g}
aria-invalid=${a?`true`:g}
aria-required=${this.aria.attr(`aria-required`)??g}
@input=${this.handleInput}
@blur=${this.handleBlur}
@keydown=${this.handleKeyDown}
/>
${this.showStepper?_`<div class="stepper" part="stepper" aria-hidden="true">
<button
part="increment"
type="button"
class="step stepUp"
tabindex="-1"
?disabled=${n||this.max!==void 0&&o>=this.max}
aria-label=${this.incrementLabel??e(`numberInput.increment`)}
@click=${()=>this.adjust(this.step)}
>
${pn}
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
${nn}
</button>
</div>`:g}
</div>`}},z([y({attribute:!1})],U.prototype,`value`,void 0),z([y({attribute:`value`,converter:ni})],U.prototype,`defaultValue`,void 0),z([y({type:Number})],U.prototype,`min`,void 0),z([y({type:Number})],U.prototype,`max`,void 0),z([y({type:Number})],U.prototype,`step`,void 0),z([y({type:Number})],U.prototype,`precision`,void 0),z([y({reflect:!0})],U.prototype,`size`,void 0),z([y({type:Boolean,reflect:!0})],U.prototype,`invalid`,void 0),z([y({type:Boolean,reflect:!0,attribute:`readonly`})],U.prototype,`readOnly`,void 0),z([y({type:Boolean,attribute:`show-stepper`})],U.prototype,`showStepper`,void 0),z([y({type:Boolean,attribute:`no-empty`})],U.prototype,`noEmpty`,void 0),z([y()],U.prototype,`placeholder`,void 0),z([y({attribute:`increment-label`})],U.prototype,`incrementLabel`,void 0),z([y({attribute:`decrement-label`})],U.prototype,`decrementLabel`,void 0),z([y({attribute:`not-a-number-message`})],U.prototype,`notANumberMessage`,void 0),z([y({attribute:`below-min-message`})],U.prototype,`belowMinMessage`,void 0),z([y({attribute:`above-max-message`})],U.prototype,`aboveMaxMessage`,void 0),z([h()],U.prototype,`draft`,void 0),z([b(`input`)],U.prototype,`input`,void 0)})))()}var ii,ai,oi,si,ci;function li(){return(li=e((()=>{M(),P(),j(),Tn(),O(),dr(),At(),p(),m(),v(),Xe(),ii=class extends F{static{this.tagName=`minerva-page`}static{this.styles=[N,L(qn),C`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.maxWidth===void 0||this.maxWidth===``?void 0:ee(this.maxWidth);return _`<div class="page" part="root" style=${S({maxWidth:e})}>
<slot></slot>
</div>`}},z([y({attribute:`max-width`,converter:fr})],ii.prototype,`maxWidth`,void 0),ai=class extends F{constructor(...e){super(...e),this.heading=``,this.description=``,this.slots=new xn(this)}static{this.tagName=`minerva-page-header`}static{this.styles=[N,L(qn),C`
:host{
display: block;
min-width: 0;
}
`]}updated(){k&&!this.heading&&!this.slots.test(`heading`)&&I(this.constructor.tagName,`set the heading attribute (or fill the heading slot): the heading names the region.`)}renderHeading(){let e=!!this.description||this.slots.test(`description`);return _`<div class="heading">
<h1 part="title"><slot name="heading">${this.heading}</slot></h1>
${e?_`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:g}
</div>`}renderActions(){return this.slots.test(`actions`)?_`<div class="actions" part="actions">
<slot name="actions"></slot>
</div>`:g}render(){return _`<header class="header" part="root">
${this.renderHeading()} ${this.renderActions()}
</header>`}},z([y()],ai.prototype,`heading`,void 0),z([y()],ai.prototype,`description`,void 0),oi=class extends ai{static{this.tagName=`minerva-page-section`}static{this.styles=[N,L(qn),C`
:host{
display: block;
min-width: 0;
}
.section ::slotted(minerva-tag),
.section ::slotted([data-component="tag"]){
align-self: flex-start;
}
`]}renderHeading(){let e=!!this.description||this.slots.test(`description`);return _`<div class="heading">
<h2 id="heading" part="title">
${this.slots.test(`icon`)?_`<span class="sectionIcon" part="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:g}<slot name="heading">${this.heading}</slot>
</h2>
${e?_`<p part="description">
<slot name="description">${this.description}</slot>
</p>`:g}
</div>`}render(){return _`<section class="section" part="root" aria-labelledby="heading">
<div class="sectionHeader" part="header">
${this.renderHeading()} ${this.renderActions()}
</div>
<slot></slot>
</section>`}},si=class extends F{constructor(...e){super(...e),this.nowrap=!1,this.density=`default`,this.aria=new w(this)}static{this.tagName=`minerva-toolbar`}static{this.styles=[N,L(qn),C`
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
`]}render(){return _`<div
part="root"
role="group"
aria-label=${this.aria.label??g}
aria-description=${this.aria.description??g}
class=${x({toolbar:!0,compact:this.density===`compact`,nowrap:this.nowrap})}
>
<slot></slot>
</div>`}},z([y({type:Boolean,reflect:!0})],si.prototype,`nowrap`,void 0),z([y({reflect:!0})],si.prototype,`density`,void 0),ci=class extends F{constructor(...e){super(...e),this.label=``,this.value=``,this.slots=new xn(this)}static{this.tagName=`minerva-stat-card`}static{this.styles=[N,L(qn),C`
:host{
display: block;
min-width: 0;
}
`]}render(){let e=this.description!==void 0&&this.description!==null||this.slots.test(`description`);return _`<div class="statCard" part="root">
${this.slots.test(`icon`)?_`<span class="statIcon" part="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:g}
<div class="statContent">
<dl>
<dt part="label"><slot name="label">${this.label}</slot></dt>
<dd part="value"><slot name="value">${this.value}</slot></dd>
</dl>
${e?_`<p class="statDescription" part="description">
<slot name="description">${this.description}</slot>
</p>`:g}
</div>
</div>`}},z([y()],ci.prototype,`label`,void 0),z([y()],ci.prototype,`value`,void 0),z([y()],ci.prototype,`description`,void 0)})))()}var ui,di,fi;function pi(){return(pi=e((()=>{M(),P(),T(),Qt(),R(),j(),Tn(),O(),An(),jt(),p(),m(),v(),ui=(e,t)=>({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:e,[t]:!0}),di=class e extends F{constructor(...e){super(...e),this.scrollState={overflow:!1,left:!1,right:!1,rtl:!1},this.aria=new w(this),this.locale=new D(this),this.slots=new xn(this),this.focused=null,this.previousItems=null,this.movedWith=null,this.mutations=null,this.resize=null,this.handleFocusIn=e=>{let t=e.target;this.focused=t instanceof fi&&this.items.includes(t)?t:null},this.handleSelect=e=>{let t=e.target;t instanceof fi&&this.items.includes(t)&&!e.defaultPrevented&&queueMicrotask(()=>{e.defaultPrevented||(this.activeValue=t.value)})},this.measure=()=>{let e=this.viewport;if(!e)return;let t=l(this)===`rtl`,n=e.scrollWidth-e.clientWidth,r={overflow:e.scrollWidth>e.clientWidth+1,left:t?e.scrollLeft>-n+1:e.scrollLeft>1,right:t?e.scrollLeft<-1:e.scrollLeft<n-1,rtl:t},i=this.scrollState;(i.overflow!==r.overflow||i.left!==r.left||i.right!==r.right||i.rtl!==r.rtl)&&(this.scrollState=r)}}static{this.tagName=`minerva-page-tabs`}static{this.styles=[N,C`
:host{
display: block;
min-width: 0;
}
`,L(Bn),L(Ct)]}get items(){return Array.from(this.children).filter(e=>e instanceof fi)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`minerva-select`,this.handleSelect),typeof MutationObserver<`u`&&(this.mutations=new MutationObserver(()=>this.itemsChanged()),this.mutations.observe(this,{childList:!0,attributes:!0,attributeFilter:[`value`,`active`,`disabled`],subtree:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`minerva-select`,this.handleSelect),this.mutations?.disconnect(),this.mutations=null,this.resize?.disconnect(),this.resize=null}firstUpdated(){this.observeViewport()}reconnectedCallback(){super.reconnectedCallback(),this.observeViewport()}observeViewport(){this.resize||typeof ResizeObserver>`u`||(this.resize=new ResizeObserver(()=>this.revealActive()),this.resize.observe(this.viewport))}updated(t){k&&!this.aria.label&&I(e.tagName,`set aria-label (e.g. "Open pages") to name the navigation landmark.`),t.has(`activeValue`)&&this.itemsChanged();let n=this.movedWith;if(n){let e=n===`left`?this.leftButton:this.rightButton;if(e?.disabled){this.movedWith=null;let t=this.shadowRoot?.activeElement;(!t||t===e)&&(n===`left`?this.rightButton:this.leftButton)?.focus({preventScroll:!0})}}}itemsChanged(){let e=this.items;if(this.activeValue!==void 0)for(let t of e)t.active=t.value===this.activeValue;let t=JSON.stringify([this.activeValue,...e.map(e=>[e.value,e.active])]);t!==this.previousItems&&(this.previousItems=t,this.revealActive());let n=this.focused;if(n&&!n.isConnected){this.focused=null;let t=document.activeElement;(!t||t===document.body||!t.isConnected)&&e.find(e=>e.active)?.focus({preventScroll:!0})}}revealActive(){let e=this.viewport;if(!e)return;let t=this.items.find(e=>e.active),n=t?.surface;if(t&&!n&&t.updateComplete.then(()=>{t.surface&&this.revealActive()}),n){let t=e.getBoundingClientRect(),r=n.getBoundingClientRect();r.width>t.width?e.scrollLeft+=r.left-t.left:r.left<t.left?e.scrollLeft-=t.left-r.left:r.right>t.right&&(e.scrollLeft+=r.right-t.right)}this.measure()}move(e){let t=this.viewport;t&&(this.movedWith=e<0?`left`:`right`,t.scrollLeft+=e*Math.max(1,t.clientWidth*.8),this.measure())}renderScrollButton(e){let t=e===`left`,n=t?this.scrollLeftLabel??this.locale.t(`pageTabs.scrollLeft`):this.scrollRightLabel??this.locale.t(`pageTabs.scrollRight`),r=t?!this.scrollState.left:!this.scrollState.right;return _`<button
type="button"
part="scroll-button"
class=${x({...ui(r,`scroll`),[`scroll-${e}`]:!0})}
aria-label=${n}
?disabled=${r}
tabindex=${r?-1:0}
@click=${()=>this.move(t?-1:1)}
>
${t?en:Tt}
</button>`}render(){let{overflow:e,rtl:t}=this.scrollState,n=()=>this.renderScrollButton(`left`),r=()=>this.renderScrollButton(`right`);return _`<nav
part="root"
class="pageTabs"
aria-label=${this.aria.label??g}
>
${e?t?r():n():g}
<div part="viewport" class="viewport" @scroll=${this.measure}>
<div part="list" class="list">
<slot @slotchange=${()=>this.itemsChanged()}></slot>
</div>
</div>
${e?t?n():r():g}
${this.slots.test(`actions`)?_`<div part="actions" class="actions">
<slot name="actions"></slot>
</div>`:g}
</nav>`}},z([y({reflect:!0,attribute:`active-value`})],di.prototype,`activeValue`,void 0),z([y({attribute:`scroll-left-label`})],di.prototype,`scrollLeftLabel`,void 0),z([y({attribute:`scroll-right-label`})],di.prototype,`scrollRightLabel`,void 0),z([h()],di.prototype,`scrollState`,void 0),z([b(`.viewport`)],di.prototype,`viewport`,void 0),z([b(`.scroll-left`)],di.prototype,`leftButton`,void 0),z([b(`.scroll-right`)],di.prototype,`rightButton`,void 0),fi=class e extends F{constructor(...e){super(...e),this.value=``,this.label=``,this.active=!1,this.disabled=!1,this.closable=!1,this.locale=new D(this),this.slots=new xn(this)}static{this.tagName=`minerva-page-tab`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,C`
:host{
display: contents;
}
.icon ::slotted(svg){
width: 16px;
height: 16px;
}
`,L(Bn),L(Ct)]}get surface(){return this.wrapper??null}focus(e){this.trigger?.focus(e)}handleSelect(){this.disabled||this.emit(`minerva-select`,{value:this.value},{cancelable:!0})}handleClose(){this.emit(`minerva-close`,{value:this.value})}hookStates(){return{current:this.active,disabled:this.disabled}}updated(){k&&!this.label&&I(e.tagName,`set label to name the page.`)}render(){return _`<div
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
title=${this.label||g}
aria-current=${this.active?`page`:g}
?disabled=${this.disabled}
@click=${this.handleSelect}
>
${this.slots.test(`icon`)?_`<span part="icon" class="icon" aria-hidden="true"
><slot name="icon"></slot
></span>`:g}
<span part="label" class="label">${this.label}</span>
</button>
${this.closable||this.slots.test(`action`)?_`<span part="action" class="action"
><slot name="action"></slot>${this.closable?_`<button
type="button"
part="close-button"
class=${x(ui(!1,`close`))}
aria-label=${this.closeLabel??this.locale.t(`pageTabs.close`,{label:this.label,defaultValue:`Close {{label}}`})}
@click=${this.handleClose}
>
${Gt}
</button>`:g}</span
>`:g}
</div>`}},z([y({reflect:!0})],fi.prototype,`value`,void 0),z([y()],fi.prototype,`label`,void 0),z([y({type:Boolean,reflect:!0})],fi.prototype,`active`,void 0),z([y({type:Boolean,reflect:!0})],fi.prototype,`disabled`,void 0),z([y({type:Boolean,reflect:!0})],fi.prototype,`closable`,void 0),z([y({attribute:`close-label`})],fi.prototype,`closeLabel`,void 0),z([b(`.trigger`)],fi.prototype,`trigger`,void 0),z([b(`.pageTab`)],fi.prototype,`wrapper`,void 0)})))()}function mi(e,t,n,r){let i=Be(t).filter(t=>t===e||!r||!u(r,t)),a=i.indexOf(e);return a===-1?null:(n?i[a-1]:i[a+1])??null}var hi,gi,W;function _i(){return(_i=e((()=>{M(),P(),Qt(),j(),O(),Sr(),Er(),xr(),Nr(),jr(),Nt(),an(),p(),m(),c(),hi=10,gi=5,W=class e extends F{constructor(...e){super(...e),this.open=!1,this.modal=!1,this.side=`bottom`,this.align=`center`,this.sideOffset=6,this.alignOffset=0,this.collisionPadding=8,this.matchAnchorWidth=!1,this.arrow=!1,this.label=``,this.anchorElement=null,this.anchor=``,this.aria=new w(this),this.presence=new qt(this,()=>this.panel),this.modalController=new yr(this),this.position=new Cr(this,()=>({placement:ze(this.side,this.align),offset:{mainAxis:this.sideOffset+(this.arrow?gi:0),crossAxis:this.alignOffset},matchAnchorWidth:this.matchAnchorWidth||!1,padding:this.collisionPadding,arrowElement:this.arrow?this.arrowEl??null:null,arrowSize:hi,onPosition:e=>{let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`)}})),this.layer=new _r(this,()=>({disableOutsidePointerEvents:this.modal,branches:()=>[this.triggerElement()],onEscapeKeyDown:()=>{this.reason=`escape`},onPointerDownOutside:()=>{this.reason=`outside`},onFocusOutside:()=>(this.reason=`focus-outside`,!this.modal),onDismiss:()=>this.requestOpenChange(!1,this.reason)})),this.focusScope=new kr(this,()=>({trapped:this.modal,loop:this.modal,restoreFocus:this.triggerElement()??!0})),this.reason=`outside`,this.wasPresent=!1,this.handleClick=e=>{if(e.defaultPrevented)return;let t=e.composedPath(),n=this.triggerElement();if(n&&t.includes(n)){this.requestOpenChange(!this.open,`trigger`);return}let r=t.find(e=>e instanceof Element&&e.hasAttribute(`data-popover-close`));r&&this.contains(r)&&this.requestOpenChange(!1,`close-slot`)},this.handleKeyDown=e=>{let n=this.panel,r=this.triggerElement();if(this.modal||!n||!r||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey||e.defaultPrevented)return;let i=e.shiftKey,a=t(document);if(!a||!u(n,a))return;let o=Be(n);if(!(o.length===0||(i?a===n||a===o[0]:a===o[o.length-1])))return;e.preventDefault();let s=mi(r,this.tabContainer(),i,this.positioner)??r;this.requestOpenChange(!1,`tab`),this.open||s.focus()}}static{this.tagName=`minerva-popover`}static{this.styles=[N,br,C`
:host{
display: contents;
}
`,L($t)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}triggerElement(){return this.querySelector(`:scope > [slot='trigger']`)}anchorTarget(){if(this.anchorElement)return this.anchorElement;if(this.anchor){let e=this.getRootNode().getElementById?.(this.anchor);if(e)return e}return this.triggerElement()??this}requestOpenChange(e,t){e!==this.open&&this.emit(`minerva-open-change`,{open:e,reason:t},{cancelable:!0})&&(this.open=e)}tabContainer(){return he().find(e=>e.element===this.positioner)?.parent??document.body}syncTrigger(){let e=this.triggerElement();e&&(e.setAttribute(`aria-haspopup`,`dialog`),e.setAttribute(`aria-expanded`,String(this.open)),e.setAttribute(`data-state`,this.open?`open`:`closed`))}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.deactivate(),gt(this.positioner)}willUpdate(e){e.has(`open`)&&this.presence.sync(this.open)}firstUpdated(){k&&!this.triggerElement()&&!this.anchor&&!this.anchorElement&&I(e.tagName,`no slot="trigger" element nor anchor: the panel is anchored to the element itself and nothing opens it.`)}deactivate(){this.focusScope.deactivate(),this.layer.deactivate(),this.modalController.deactivate()}updated(e){this.syncTrigger();let t=this.open||this.presence.present,n=this.positioner;if(t&&n&&!this.position.running){ir(n);let e=this.anchorTarget();e&&this.position.start(e,n)}e.has(`open`)&&(this.open&&n?(this.modal&&this.modalController.activate(this),this.layer.activate(n),this.focusScope.activate(n),this.emit(`minerva-after-open`)):this.open||this.deactivate()),this.wasPresent&&!t&&(this.position.end(),gt(n),this.emit(`minerva-after-close`)),this.wasPresent=t}hookStates(){let e=this.position.placement,{side:t,align:n}=Ae(e);return{state:this.open?`open`:`closed`,side:t,align:n,placement:e}}render(){if(!(this.open||this.presence.present))return _`<slot name="trigger"></slot>`;let{side:e,align:t}=Ae(this.position.placement),n=this.open?`open`:`closed`,r=this.label||this.aria.label,i=this.isConnected?l(this):`ltr`;return _`<slot name="trigger"></slot>
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
aria-modal=${this.modal?`true`:g}
aria-label=${r||g}
tabindex="-1"
dir=${i}
data-state=${n}
data-side=${e}
data-align=${t}
@keydown=${this.handleKeyDown}
>
<slot></slot>
${this.arrow?_`<span part="arrow" class="arrowWrapper" aria-hidden="true">
<svg
class="arrow"
width=${hi}
height=${gi}
viewBox="0 0 30 10"
preserveAspectRatio="none"
>
<polygon points="0,0 30,0 15,10"></polygon>
</svg>
</span>`:g}
</div>
</div>`}},z([y({type:Boolean,reflect:!0})],W.prototype,`open`,void 0),z([y({type:Boolean,reflect:!0})],W.prototype,`modal`,void 0),z([y({reflect:!0})],W.prototype,`side`,void 0),z([y({reflect:!0})],W.prototype,`align`,void 0),z([y({type:Number,attribute:`side-offset`})],W.prototype,`sideOffset`,void 0),z([y({type:Number,attribute:`align-offset`})],W.prototype,`alignOffset`,void 0),z([y({type:Number,attribute:`collision-padding`})],W.prototype,`collisionPadding`,void 0),z([y({attribute:`match-anchor-width`})],W.prototype,`matchAnchorWidth`,void 0),z([y({type:Boolean,reflect:!0})],W.prototype,`arrow`,void 0),z([y()],W.prototype,`label`,void 0),z([y({attribute:!1})],W.prototype,`anchorElement`,void 0),z([y()],W.prototype,`anchor`,void 0),z([b(`.positioner`)],W.prototype,`positioner`,void 0),z([b(`.content`)],W.prototype,`panel`,void 0),z([b(`[part=arrow]`)],W.prototype,`arrowEl`,void 0)})))()}var vi;function yi(){return(yi=e((()=>{vi=`minerva-prose{min-width:0;max-width:100%;color:var(--text-color,#1f2937);font-family:var(--font-family-sans,system-ui, -apple-system, "Segoe UI", sans-serif);font-size:var(--prose-font-size,var(--font-size-lg,1rem));font-weight:var(--font-weight-regular,400);font-style:normal;line-height:var(--line-height-relaxed,1.7);letter-spacing:0;overflow-wrap:anywhere}minerva-prose :where(h1,h2,h3,h4,h5,h6){color:inherit;font-family:inherit;font-style:inherit;font-weight:var(--font-weight-semibold,600);letter-spacing:0;background:0 0;border:0;margin:1.5em 0 .5em;padding:0;line-height:1.35}minerva-prose :where(h1){font-size:var(--font-size-3xl,1.75rem)}minerva-prose :where(h2){font-size:var(--font-size-2xl,1.375rem)}minerva-prose :where(h3){font-size:var(--font-size-xl,1.125rem)}minerva-prose :where(h4){font-size:var(--font-size-lg,1rem)}minerva-prose :where(h5,h6){font-size:var(--font-size-md,.875rem)}minerva-prose :where(h6){color:var(--text-muted-color,#6b7280)}minerva-prose :where(p,ul,ol,li,blockquote){font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;line-height:inherit;letter-spacing:inherit}minerva-prose :where(p){background:0 0;border:0;padding:0}minerva-prose :where(p,ul,ol,blockquote,pre,table,figure){margin:1em 0}minerva-prose>:first-child{margin-top:0}minerva-prose>:last-child{margin-bottom:0}minerva-prose :where(ul,ol){padding:0;padding-inline-start:1.5em}minerva-prose :where(li){margin:.25em 0}minerva-prose :where(li>ul,li>ol,li>p){margin-block:.25em}minerva-prose :where(blockquote){border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-code-bg,var(--control-color,#f6f7f9));color:inherit;border:1px solid #0000;padding:.5em 1em}minerva-prose :where(a){color:var(--primary-color-text,#1e4fbd);text-underline-offset:.18em;text-decoration:underline;text-decoration-thickness:1px}minerva-prose :where(a:hover){text-decoration-thickness:2px}minerva-prose :where(a:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:3px}minerva-prose :where(code,kbd,samp){font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);font-size:.875em}minerva-prose :where(code){border-radius:calc(var(--prose-radius,var(--radius-sm,4px)) - 1px);background:var(--prose-code-bg,var(--control-color,#f6f7f9));padding:.12em .3em}minerva-prose :where(pre){max-width:100%;padding:var(--space-4,1rem);border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));border-radius:var(--prose-radius,var(--radius-sm,4px));background:var(--prose-pre-bg,var(--surface-elevated-color,#fff));color:var(--text-color,#1f2937);font-family:var(--font-family-mono,ui-monospace, Menlo, Consolas, monospace);line-height:var(--line-height-base,1.5);white-space:pre;overflow-wrap:normal;tab-size:2;overflow-x:auto}minerva-prose :where(pre code){color:inherit;white-space:pre;background:0 0;border:0;border-radius:0;padding:0}minerva-prose :where(pre:focus-visible){outline:2px solid var(--primary-color,#2563eb);outline-offset:2px}minerva-prose :where(.hljs-comment,.hljs-quote){color:var(--text-muted-color,#6b7280)}minerva-prose :where(.hljs-keyword,.hljs-selector-tag,.hljs-name,.hljs-tag,.hljs-attr,.hljs-attribute,.hljs-doctag){color:var(--primary-color-text,#1e4fbd)}minerva-prose :where(.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-regexp,.hljs-type,.hljs-literal){color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-number,.hljs-title,.hljs-section,.hljs-built_in,.hljs-meta,.hljs-variable){color:var(--warning-color-text,#b45309)}minerva-prose :where(.hljs-subst,.hljs-operator,.hljs-punctuation,.hljs-params){color:var(--text-color,#1f2937)}minerva-prose :where(.hljs-addition){background:var(--success-color-subtle,#e7f6ec);color:var(--success-color-text,#15803d)}minerva-prose :where(.hljs-deletion){background:var(--danger-color-subtle,#fcebeb);color:var(--danger-color-text,#b91c1c)}minerva-prose :where(.hljs-strong){font-weight:var(--font-weight-bold,700)}minerva-prose :where(.hljs-emphasis){font-style:italic}minerva-prose :where(mark){background:var(--warning-color-subtle,#fdf3e1);color:inherit}minerva-prose :where(img,video){max-width:100%;height:auto}minerva-prose :where(figure){max-width:100%}minerva-prose :where(figcaption){margin-top:var(--space-2,.5rem);font-size:var(--font-size-md,.875rem);color:var(--text-muted-color,#6b7280)}minerva-prose :where(table){border-collapse:collapse;width:100%;color:inherit;overflow-wrap:normal;display:table}minerva-prose :where(tr){background:0 0;border:0}minerva-prose :where(th,td){border:1px solid var(--prose-border-color,var(--border-color,#d9dde3));text-align:start;vertical-align:top;white-space:normal;padding:.5em .75em}minerva-prose :where(th){background:var(--prose-code-bg,var(--control-color,#f6f7f9));font-weight:var(--font-weight-semibold,600)}minerva-prose :where(th>p,td>p){margin:0}minerva-prose :where(hr){background:var(--prose-border-color,var(--border-color,#d9dde3));border:0;height:1px;margin:1.5em 0;padding:0}@media (forced-colors:active){minerva-prose :where(hr){forced-color-adjust:none;background:canvastext}}minerva-prose :where(sub,sup){font-size:.75em;line-height:0}@media print{minerva-prose :where(pre){overflow:visible}minerva-prose :where(pre,pre code){white-space:pre-wrap;overflow-wrap:anywhere}minerva-prose :where(pre,blockquote,figure,img,tr){break-inside:avoid}}`})))()}function bi(){if(wi!==void 0)return wi;wi=null;try{if(typeof CSSStyleSheet<`u`&&`replaceSync`in CSSStyleSheet.prototype){let e=new CSSStyleSheet;e.replaceSync(vi),wi=e}}catch{wi=null}return wi}function xi(e){if(Ci.has(e))return;Ci.add(e);let t=bi();if(t&&`adoptedStyleSheets`in e)try{e.adoptedStyleSheets=[...e.adoptedStyleSheets,t];return}catch{}let n=e.nodeType===9?e:e.ownerDocument;if(!n)return;let r=e.nodeType===9?n.head??n.documentElement:e;if(r.querySelector?.(`#${Si}`))return;let i=n.createElement(`style`);i.id=Si,i.textContent=vi,r.appendChild(i)}var Si,Ci,wi,Ti;function Ei(){return(Ei=e((()=>{j(),yi(),p(),Si=`minerva-prose-styles`,Ci=new WeakSet,Ti=class extends F{static{this.tagName=`minerva-prose`}static{this.styles=[N,C`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback();let e=this.getRootNode();(e.nodeType===9||e.nodeType===11)&&xi(e)}render(){return _`<slot></slot>`}}})))()}var Di,G,Oi;function ki(){return(ki=e((()=>{Rt(),M(),P(),T(),Qt(),R(),tr(),j(),Tn(),O(),wn(),wt(),Mr(),p(),m(),v(),Di=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Home`,`End`]),G=class extends F{constructor(...e){super(...e),this.hostInternals=cr(this),this.ownedAria=new Set,this.value=``,this.checked=!1,this.disabled=!1,this.label=``,this.size=`medium`,this.color=`primary`,this.error=!1,this.helperText=``,this.errorMessage=``,this.slots=new xn(this),this.ownsDescription=!1,this.handleClick=e=>{if(this.isDisabled){e.preventDefault(),e.stopImmediatePropagation();return}this.group||this.checked||(this.checked=!0,this.emit(`minerva-change`,{checked:!0,value:this.value}))},this.handleKeyDown=e=>{e.key===` `&&(e.preventDefault(),this.isDisabled||this.click())}}static{this.tagName=`minerva-radio`}static{this.styles=[N,C`
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
`,L(tn)]}get group(){let e=this.parentElement?.closest(`minerva-radio-group`);return e instanceof Oi?e:null}get isDisabled(){return this.disabled||!!this.group?.isDisabled}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this.handleClick),this.addEventListener(`keydown`,this.handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this.handleClick),this.removeEventListener(`keydown`,this.handleKeyDown)}updated(){let e=this.isDisabled;Vt(this,this.hostInternals,{role:`radio`,ariaChecked:String(this.checked),ariaDisabled:e?`true`:null},this.ownedAria),this.group||E(this,`tabindex`,e?`-1`:`0`);let t=this.error?this.errorMessage:this.helperText;t&&(this.ownsDescription||!this.hasAttribute(`aria-description`))?(this.ownsDescription=!0,E(this,`aria-description`,t)):!t&&this.ownsDescription&&(this.ownsDescription=!1,E(this,`aria-description`,null))}hookStates(){let e=this.group;return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,invalid:this.error,size:e?.size??this.size,color:e?.color??this.color}}render(){let e=this.group,t=e?.size??this.size,n=e?.color??this.color,r=this.error?this.errorMessage:this.helperText,i=!!this.label||this.slots.test(`[default]`);return _`<div
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
${i?_`<span class="label" part="label"
>${this.label||_`<slot></slot>`}</span
>`:g}
</span>
${r?_`<div class="helperTextWrapper" aria-hidden="true">
${this.error&&this.errorMessage?_`<span class="errorIcon">${Ut}</span>`:g}
<span
part="helper-text"
class=${x({helperText:!0,errorText:this.error})}
>${r}</span
>
</div>`:g}
</div>`}},z([y()],G.prototype,`value`,void 0),z([y({type:Boolean,reflect:!0})],G.prototype,`checked`,void 0),z([y({type:Boolean,reflect:!0})],G.prototype,`disabled`,void 0),z([y()],G.prototype,`label`,void 0),z([y({reflect:!0})],G.prototype,`size`,void 0),z([y({reflect:!0})],G.prototype,`color`,void 0),z([y({type:Boolean,reflect:!0})],G.prototype,`error`,void 0),z([y({attribute:`helper-text`})],G.prototype,`helperText`,void 0),z([y({attribute:`error-message`})],G.prototype,`errorMessage`,void 0),Oi=class e extends A{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.label=``,this.helperText=``,this.error=!1,this.direction=`vertical`,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.roving=new Dr(this,()=>({getItems:()=>this.radios,isItemDisabled:e=>this.isDisabled||e.disabled,orientation:`both`,dir:l(this),loop:!0})),this.observer=null,this.dirty=!1,this.rovingAttached=!1,this.settleQueued=!1,this.handleClick=e=>{let t=e.target?.closest?.(`minerva-radio`);t instanceof G&&t.group===this&&this.select(t)},this.handleKeyDown=e=>{if(!e.defaultPrevented||!Di.has(e.key))return;let t=this.roving.getActive();t instanceof G&&this.select(t)}}static{this.tagName=`minerva-radio-group`}static{this.dependencies=[G]}static{this.styles=[N,C`
:host{
display: block;
}
`,L(tn)]}get radios(){return Array.from(this.querySelectorAll(`minerva-radio`)).filter(e=>e instanceof G&&e.group===this)}focus(e){let t=this.radios;(t.find(e=>e.checked&&!e.disabled)??t.find(e=>!e.disabled))?.focus(e)}connectedCallback(){super.connectedCallback(),Fn(this)||this.attachRoving(),this.addEventListener(`click`,this.handleClick),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0}))}attachRoving(){this.rovingAttached||(this.rovingAttached=!0,this.roving.attach(this),this.addEventListener(`keydown`,this.handleKeyDown))}disconnectedCallback(){super.disconnectedCallback(),this.rovingAttached=!1,this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.observer?.disconnect(),this.observer=null}getFormValue(){return this.value===``?null:this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.radioMissing`),anchor:this.radios.find(e=>!e.disabled)??null}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`?this.value=e:e===null&&(this.value=``)}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue)}updated(t){super.updated(t);let n=this.radios,r;for(let e of n)e.checked=this.value!==``&&e.value===this.value,e.checked&&(r??=e),e.requestUpdate();this.syncRoving(n,r),k&&this.value!==``&&n.length>0&&!r&&I(e.tagName,`value "${this.value}" matches no <minerva-radio> of the group.`)}syncRoving(e,t){let n=[this,...e].find(Fn);if(n){this.settleQueued||(this.settleQueued=!0,Ft(n,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.attachRoving(),t&&!t.disabled&&!this.isDisabled?this.roving.setActive(t,{focus:!1}):this.roving.refresh();for(let t of e)(this.isDisabled||t.disabled)&&t.setAttribute(`tabindex`,`-1`)}select(e){this.isDisabled||e.disabled||e.value===this.value||(this.dirty=!0,this.value=e.value,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value}))}hookStates(){return{disabled:this.isDisabled,invalid:this.error||this.aria.attr(`aria-invalid`)===`true`,required:this.required,orientation:this.direction,size:this.size,color:this.color}}render(){let e=this.error||this.aria.attr(`aria-invalid`)===`true`,t=this.label,n=[this.helperText,this.aria.description].filter(Boolean).join(` `);return _`<div
part="root"
class=${x({radioGroupWrapper:!0,error:e})}
>
${t?_`<div id="label" part="label" class="groupLabel">${t}</div>`:g}
<div
part="list"
class=${x({radioGroup:!0,[this.direction]:!0})}
role="radiogroup"
aria-labelledby=${t?`label`:g}
aria-label=${t?g:this.aria.label??g}
aria-description=${n||g}
aria-required=${this.required?`true`:`false`}
aria-invalid=${e?`true`:`false`}
aria-disabled=${this.isDisabled?`true`:g}
>
<slot></slot>
</div>
${this.helperText?_`<div
part="helper-text"
aria-hidden="true"
class=${x({helperText:!0,errorText:e})}
>
${this.helperText}
</div>`:g}
</div>`}},z([y({attribute:!1})],Oi.prototype,`value`,void 0),z([y({attribute:`value`})],Oi.prototype,`defaultValue`,void 0),z([y()],Oi.prototype,`label`,void 0),z([y({attribute:`helper-text`})],Oi.prototype,`helperText`,void 0),z([y({type:Boolean,reflect:!0})],Oi.prototype,`error`,void 0),z([y({reflect:!0})],Oi.prototype,`direction`,void 0),z([y({reflect:!0})],Oi.prototype,`size`,void 0),z([y({reflect:!0})],Oi.prototype,`color`,void 0)})))()}var Ai,ji,Mi,Ni,Pi;function Fi(){return(Fi=e((()=>{M(),P(),T(),R(),Dn(),j(),O(),wn(),Or(),mt(),p(),m(),v(),Xe(),c(),f(),Ai={small:12,medium:16,large:20},ji=Array.from({length:5},(e,t)=>t),Mi=C`
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
`,Ni=class e extends A{constructor(...e){super(...e),this.value=0,this.defaultValue=0,this.max=10,this.size=`medium`,this.showValue=!1,this.interactive=!1,this.readOnly=!1,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.dirty=!1,this.rating=new vr(this,Pe(this.ratingProps()))}static{this.tagName=`minerva-rating`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,C`
:host{
display: inline-flex;
vertical-align: middle;
}
`,L(lr),Mi]}ratingProps(){return{value:this.value,max:this.max,readOnly:!this.isInteractive,onValueChange:e=>this.commit(e)}}send(e){this.rating.sync(this.ratingProps()),this.rating.send(e)}get isInteractive(){return this.interactive&&!this.readOnly&&!this.isDisabled}focus(e){this.root?.focus(e)}blur(){this.root?.blur()}getFormValue(){return String(this.value)}getValidity(){return this.required&&!(this.value>0)?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.root}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){if(typeof e==`string`&&e.trim()!==``){let t=Number(e);Number.isFinite(t)&&(this.value=t)}}willUpdate(t){t.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),k&&(t.has(`value`)||t.has(`max`))&&(this.value<0||this.value>this.max)&&I(e.tagName,`value (${this.value}) is outside 0..max (${this.max}).`),this.rating.sync(this.ratingProps())}commit(e){e!==this.value&&(this.dirty=!0,this.value=e,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}handleStarClick(e,t){if(!this.isInteractive)return;let n=e.currentTarget.getBoundingClientRect(),r=e.clientX-n.left<n.width/2;this.send({type:`PICK`,index:t,half:r})}handleKeyDown(e){if(e.defaultPrevented||!this.isInteractive)return;let t=Je(e.key,this);pe(t,this.value,this.max)!==null&&(e.preventDefault(),this.send({type:`KEY`,key:t}))}hookStates(){return{readonly:!this.isInteractive,size:this.size}}renderStar(e,t){let n=S({width:`${t}px`,height:`${t}px`,fontSize:`${t}px`}),r=hn(`star`,{fill:e});return e===`half`?_`<span part=${r} class="star half" style=${n}
><span class="halfBase">${Zt}</span
><span class="halfFill">${rr}</span></span
>`:_`<span
part=${r}
class=${x({star:!0,[e]:!0})}
style=${n}
>${Zt}</span
>`}render(){let e=this.isInteractive,{value:t,max:n}=this,r=this.rating.machine.project(this.rating.state,this.ratingProps()),i=Ye(r,n),a=e=>i[e],o=Ai[this.size]??Ai.medium,s=this.aria.label??`${t.toFixed(1)} / ${n}`,c=_`<span class="stars" part="stars" aria-hidden="true">
${ji.map(t=>e?_`<button
type="button"
tabindex="-1"
class="starButton"
@click=${e=>this.handleStarClick(e,t)}
@mouseenter=${()=>this.send({type:`HOVER`,index:t})}
>
${this.renderStar(a(t),o)}
</button>`:this.renderStar(a(t),o))}
</span>`,ee=this.showValue?_`<span class="value" part="value"
><strong>${t.toFixed(1)}</strong>${this.ratingCount===void 0?g:_`<span class="count" part="count"
>(${this.ratingCount.toLocaleString(`en-US`)})</span
>`}</span
>`:g,l=x({rating:!0,[this.size]:!0,interactive:e});return e?_`<span
part="root"
class=${l}
role="slider"
tabindex="0"
aria-label=${s}
aria-description=${this.aria.description??g}
aria-valuenow=${t}
aria-valuemin="0"
aria-valuemax=${n}
aria-required=${this.required?`true`:g}
@keydown=${this.handleKeyDown}
@mouseleave=${()=>this.send({type:`HOVER_END`})}
>${c}${ee}</span
>`:_`<span
part="root"
class=${l}
role="img"
aria-label=${s}
aria-description=${this.aria.description??g}
aria-disabled=${this.isDisabled?`true`:g}
>${c}${ee}</span
>`}},z([y({attribute:!1})],Ni.prototype,`value`,void 0),z([y({type:Number,attribute:`value`})],Ni.prototype,`defaultValue`,void 0),z([y({type:Number})],Ni.prototype,`max`,void 0),z([y({reflect:!0})],Ni.prototype,`size`,void 0),z([y({type:Boolean,attribute:`show-value`})],Ni.prototype,`showValue`,void 0),z([y({type:Number,attribute:`rating-count`})],Ni.prototype,`ratingCount`,void 0),z([y({type:Boolean,reflect:!0})],Ni.prototype,`interactive`,void 0),z([y({type:Boolean,reflect:!0,attribute:`readonly`})],Ni.prototype,`readOnly`,void 0),z([b(`.rating`)],Ni.prototype,`root`,void 0),Pi=class extends F{constructor(...e){super(...e),this.dimensions=[],this.max=10,this.size=`medium`,this.interactive=!1,this.readOnly=!1,this.hideValue=!1}static{this.tagName=`minerva-rating-scale`}static{this.dependencies=[Ni]}static{this.styles=[N,C`
:host{
display: block;
}
`,L(lr)]}handleChange(e,t){e.stopPropagation();let{value:n}=e.detail;this.dimensions=this.dimensions.map(e=>e.key===t?{...e,value:n}:e),this.emit(`minerva-change`,{key:t,value:n,dimensions:this.dimensions})}hookStates(){return{readonly:!this.interactive||this.readOnly,size:this.size}}render(){return _`<div class="scale" part="root">
${this.dimensions.map(e=>_`<div class="scaleRow" part="row" title=${e.hint??g}>
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
</div>`}},z([y({attribute:!1})],Pi.prototype,`dimensions`,void 0),z([y({type:Number})],Pi.prototype,`max`,void 0),z([y({reflect:!0})],Pi.prototype,`size`,void 0),z([y({type:Boolean,reflect:!0})],Pi.prototype,`interactive`,void 0),z([y({type:Boolean,reflect:!0,attribute:`readonly`})],Pi.prototype,`readOnly`,void 0),z([y({type:Boolean,attribute:`hide-value`})],Pi.prototype,`hideValue`,void 0)})))()}var Ii,Li,Ri,zi,Bi;function Vi(){return(Vi=e((()=>{Rt(),M(),P(),T(),tr(),j(),O(),Kt(),p(),m(),Ii=0,Li=class e extends F{constructor(...e){super(...e),this.internals=cr(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.label=``,this.selected=!1,this.highlighted=!1}static{this.tagName=`minerva-option`}static{this.styles=[N,C`
:host{
display: block;
outline: none;
}
`,L(Mt)]}get text(){return this.textValue??(this.label||this.textContent?.trim()||``)}get displayLabel(){return this.label||this.textContent?.trim()||``}connectedCallback(){super.connectedCallback(),Vt(this,this.internals,{role:`option`},this.ownedAria)}updated(t){super.updated(t),Vt(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),E(this,`data-highlighted`,this.highlighted),E(this,`data-disabled`,this.disabled),E(this,`data-selected`,this.selected),k&&t.has(`value`)&&this.value===``&&this.isConnected&&I(e.tagName,`an option needs a non-empty "value" (the empty value means "nothing selected").`)}hookStates(){return{selected:this.selected,highlighted:this.highlighted,disabled:this.disabled}}render(){return _`<div
part="root"
class="item"
?data-selected=${this.selected}
?data-highlighted=${this.highlighted}
?data-disabled=${this.disabled}
>
<span class="itemText" part="label"><slot></slot></span>
${this.selected?_`<span class="itemIndicator" part="indicator" aria-hidden="true"
>${on}</span
>`:g}
</div>`}},z([y({reflect:!0})],Li.prototype,`value`,void 0),z([y({type:Boolean,reflect:!0})],Li.prototype,`disabled`,void 0),z([y()],Li.prototype,`label`,void 0),z([y({attribute:`text-value`})],Li.prototype,`textValue`,void 0),z([y({type:Boolean,attribute:!1})],Li.prototype,`selected`,void 0),z([y({type:Boolean,attribute:!1})],Li.prototype,`highlighted`,void 0),Ri=class extends F{constructor(...e){super(...e),this.internals=cr(this),this.observer=null}static{this.tagName=`minerva-option-group`}static{this.styles=[N,C`
:host{
display: block;
}
`]}connectedCallback(){super.connectedCallback(),Vt(this,this.internals,{role:`group`}),this.syncLabel(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.syncLabel()),this.observer.observe(this,{childList:!0}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null}syncLabel(){let e=this.querySelector(`:scope > minerva-select-label`);if(e){let t=xt(e,`id`);t||(t=`minerva-select-label-${Ii++}`,E(e,`id`,t,this)),E(this,`aria-labelledby`,t)}else E(this,`aria-labelledby`,null)}render(){return _`<div part="root"><slot></slot></div>`}},zi=class extends F{static{this.tagName=`minerva-select-label`}static{this.styles=[N,C`
:host{
display: block;
}
`,L(Mt)]}render(){return _`<div class="label" part="root"><slot></slot></div>`}},Bi=class extends F{constructor(...e){super(...e),this.internals=cr(this)}static{this.tagName=`minerva-select-separator`}static{this.styles=[N,C`
:host{
display: block;
}
`,L(Mt)]}connectedCallback(){super.connectedCallback(),Vt(this,this.internals,{ariaHidden:`true`})}render(){return _`<div class="separator" part="root"></div>`}}})))()}var Hi,Ui,Wi,Gi,Ki,qi;function Ji(){return(Ji=e((()=>{M(),P(),T(),R(),Dn(),j(),O(),Nr(),wn(),Kt(),Vi(),p(),m(),v(),c(),f(),Hi=10,Ui=e=>Array.isArray(e.options),Wi=e=>e.getAttribute(`aria-disabled`)===`true`,Gi=e=>e instanceof Li?e.value:e.dataset.value??``,Ki=e=>e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey,qi=class e extends A{constructor(...e){super(...e),this.value=``,this.defaultValue=``,this.options=[],this.open=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.highlighted=null,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.typeahead=Se(),this.floating=new Tr(this,()=>({anchor:()=>this.trigger,floating:()=>this.positioner,placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`min`,fitViewportHeight:!0,branches:()=>[this.trigger],onDismiss:()=>this.requestOpen(!1),returnFocusOnEscape:()=>this.trigger,focusable:!0,onPosition:()=>this.syncHookStates()})),this.openIntent=`selected`,this.scrollPending=!1,this.dirty=!1,this.observer=null}static{this.tagName=`minerva-select`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,br,C`
:host{
display: inline-flex;
width: 100%;
min-width: 0;
vertical-align: middle;
}
`,L(Mt)]}focus(e){this.trigger?.focus(e)}blur(){this.trigger?.blur()}show(){this.open=!0}hide(){this.open=!1}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.requestUpdate()),this.observer.observe(this,{childList:!0,subtree:!0,characterData:!0,attributes:!0,attributeFilter:[`value`,`disabled`,`label`,`text-value`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.typeahead.reset()}get lightOptions(){return Array.from(this.querySelectorAll(`minerva-option`)).filter(e=>e instanceof Li)}get dataOptions(){return(this.options??[]).flatMap(e=>Ui(e)?e.options:[e])}get items(){return[...this.dataOptions.map(e=>({value:e.value,disabled:!!e.disabled,text:e.textValue??e.label,label:e.label})),...this.lightOptions.map(e=>({value:e.value,disabled:e.disabled,text:e.text,label:e.displayLabel}))]}getOptions(){let e=this.listbox;return e?[...Array.from(e.querySelectorAll(`[role=option]`)),...this.lightOptions]:[]}findOption(e){if(e!==null)return this.getOptions().find(t=>Gi(t)===e)}getFormValue(){return this.value}getValidity(){return this.required&&this.value===``?{flags:{valueMissing:!0},message:this.locale.t(`validation.selectMissing`),anchor:this.trigger}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}requestOpen(e){e!==this.open&&(e&&this.isDisabled||this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}openWith(e){this.openIntent=e,this.requestOpen(!0)}close(e){e&&this.trigger?.focus(),this.requestOpen(!1)}commitValue(e){e!==this.value&&(this.value=e,this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:e}))}selectValue(e){this.commitValue(e),this.close(!0)}willUpdate(e){if(e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),e.has(`open`)&&this.open){let e=this.openIntent;this.openIntent=`selected`;let t=this.items.filter(e=>!e.disabled),n=e===`last`?t[t.length-1]:e===`first`?t[0]:t.find(e=>e.value===this.value)??t[0];this.typeahead.reset(),this.scrollPending=!0,this.highlighted=n?.value??null}e.has(`open`)&&!this.open&&(this.highlighted=null)}hookStates(){let e=this.open&&this.floating.isOpen?this.floating.position.placement:void 0,{side:t,align:n}=e?Ae(e):{side:void 0,align:void 0};return{state:this.open?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,required:this.required,size:this.size,side:t,align:n,placement:e}}updated(e){super.updated(e);for(let e of this.lightOptions)e.selected=e.value===this.value,e.highlighted=this.open&&e.value===this.highlighted;if(this.floating.sync(this.open),this.open&&this.listbox){if(e.has(`open`)||e.has(`highlighted`)){let e=this.findOption(this.highlighted)??this.listbox;e.getRootNode()===this.shadowRoot?this.shadowRoot?.activeElement!==e&&e.focus({preventScroll:!0}):document.activeElement!==e&&(e.hasAttribute(`tabindex`)||(e.tabIndex=-1),e.focus({preventScroll:!0}))}this.scrollPending&&(this.scrollPending=!1,this.findOption(this.highlighted)?.scrollIntoView?.({block:`nearest`}))}k&&this.checkOptions()}checkOptions(){let t=this.items;if(t.length===0)return;let n=new Set;for(let r of t)n.has(r.value)&&I(e.tagName,`several options have the value "${r.value}"; option values must be unique.`),n.add(r.value);this.value!==``&&!n.has(this.value)&&I(e.tagName,`value "${this.value}" does not match any option.`)}handleTriggerKeyDown(e){if(this.open)return;let{key:t}=e;if(Ki(e)&&(t!==` `||this.typeahead.getBuffer()!==``)){let n=this.items,r=this.typeahead.search(t,n,n.findIndex(e=>e.value===this.value));e.preventDefault(),r!==-1&&this.commitValue(n[r].value);return}let n={Enter:`selected`," ":`selected`,ArrowDown:`selected`,ArrowUp:this.value===``?`last`:`selected`,Home:`first`,End:`last`};t in n&&(e.preventDefault(),this.openWith(n[t]))}handleListboxKeyDown(e){let{key:t}=e;if(t===`Tab`){this.close(!0);return}let n=this.getOptions(),r=n.findIndex(e=>Gi(e)===this.highlighted),i=r===-1?void 0:n[r],a=()=>{i&&!Wi(i)&&this.selectValue(Gi(i))};if(t===`Enter`||t===`ArrowUp`&&e.altKey){e.preventDefault(),a();return}if(t===` `&&this.typeahead.getBuffer()===``){e.preventDefault(),a();return}if(e.ctrlKey||e.metaKey||e.altKey)return;let o=Ue({currentIndex:r,count:n.length,key:t,loop:!1,isDisabled:e=>Wi(n[e]),pageSize:Hi});if((o!==null||t.startsWith(`Arrow`)||t.startsWith(`Page`))&&e.preventDefault(),o===null&&Ki(e)){let i=this.typeahead.search(t,n.map(e=>({text:e instanceof Li?e.text:e.dataset.textValue??e.textContent??``,disabled:Wi(e)})),r);i!==-1&&(e.preventDefault(),this.scrollPending=!0,this.highlighted=Gi(n[i]));return}o!==null&&(this.typeahead.reset(),this.scrollPending=!0,this.highlighted=Gi(n[o]))}optionFromEvent(e){let t=this.getOptions();return e.composedPath().find(e=>t.includes(e))}handleListboxPointerMove(e){let t=this.optionFromEvent(e);if(!t||Wi(t))return;let n=Gi(t);this.highlighted!==n&&(this.scrollPending=!1,this.highlighted=n)}handleListboxClick(e){let t=this.optionFromEvent(e);t&&!Wi(t)&&this.selectValue(Gi(t))}renderDataOption(e){let t=e.value===this.value,n=this.highlighted===e.value,r=!!e.disabled;return _`<div
part=${hn(`item`,{selected:t,highlighted:n,disabled:r})}
class="item"
role="option"
tabindex="-1"
aria-selected=${String(t)}
aria-disabled=${e.disabled?`true`:g}
?data-selected=${t}
?data-highlighted=${n}
?data-disabled=${r}
data-value=${e.value}
data-text-value=${e.textValue??g}
>
<span class="itemText">${e.label}</span>
${t?_`<span class="itemIndicator" aria-hidden="true"
>${on}</span
>`:g}
</div>`}renderDataOptions(){return(this.options??[]).map((e,t)=>{if(!Ui(e))return this.renderDataOption(e);let n=`group-label-${t}`;return _`<div role="group" aria-labelledby=${n}>
<div id=${n} class="label" part="group-label">${e.label}</div>
${e.options.map(e=>this.renderDataOption(e))}
</div>`})}render(){let e=this.isDisabled,t=this.value===``,n=t?void 0:this.items.find(e=>e.value===this.value),r=this.aria.label,{side:i,align:a}=Ae(this.floating.position.placement);return _`<button
part="root"
type="button"
role="combobox"
aria-haspopup="listbox"
aria-expanded=${String(this.open)}
aria-controls=${this.open?`listbox`:g}
aria-autocomplete="none"
aria-label=${r??g}
aria-description=${this.aria.description??g}
aria-required=${this.required?`true`:g}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:g}
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
>${nn}</span
>
</button>
${this.open?_`<div class="positioner" popover="manual" data-side=${i}>
<div
id="listbox"
part="content"
role="listbox"
tabindex="-1"
aria-label=${r??g}
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
</div>`:g}`}},z([y({attribute:!1})],qi.prototype,`value`,void 0),z([y({attribute:`value`})],qi.prototype,`defaultValue`,void 0),z([y({attribute:!1})],qi.prototype,`options`,void 0),z([y({type:Boolean,reflect:!0})],qi.prototype,`open`,void 0),z([y()],qi.prototype,`placeholder`,void 0),z([y({reflect:!0})],qi.prototype,`size`,void 0),z([y({type:Boolean,reflect:!0})],qi.prototype,`invalid`,void 0),z([h()],qi.prototype,`highlighted`,void 0),z([b(`.trigger`)],qi.prototype,`trigger`,void 0),z([b(`.positioner`)],qi.prototype,`positioner`,void 0),z([b(`[role=listbox]`)],qi.prototype,`listbox`,void 0)})))()}var Yi,Xi,Zi,K,Qi;function $i(){return($i=e((()=>{M(),P(),R(),j(),O(),Dt(),p(),m(),v(),Xe(),Yi=e=>e==null||e===``?void 0:typeof e==`number`||/^\d+(\.\d+)?$/.test(e)?`${e}px`:e,Xi=e=>typeof e!=`number`&&!/^\d+(\.\d+)?$/.test(e)?e:`var(--space-${String(e).replace(`.`,`-`)})`,Zi=[N,C`

:host(:dir(rtl)) .animation-wave{
animation-direction: reverse;
}
`],K=class e extends F{constructor(...e){super(...e),this.variant=`text`,this.animation=`pulse`,this.loaded=!1,this.decorative=!1,this.lines=1,this.avatar=!1,this.avatarSize=`40`,this.avatarShape=`circle`,this.active=!1,this.paragraph=!1,this.heading=!1,this.locale=new D(this),this.aria=new w(this)}static{this.tagName=`minerva-skeleton`}static{this.styles=[...Zi,C`
:host{
display: block;
}
:host([decorative][variant="circular"]){
display: inline-block;
vertical-align: middle;
}
`,L(bt)]}hookStates(){return{variant:this.variant}}updated(t){k&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&I(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}block(e,t,n={}){return _`<div
part=${e}
class=${x({skeleton:!0,[`animation-${this.animation}`]:!0,...t})}
style=${S(n)}
></div>`}renderAvatar(){if(!this.avatar)return g;let e=Yi(this.avatarSize);return this.block(`avatar`,{avatar:!0,[`avatar-${this.avatarShape}`]:!0},{width:e,height:e})}renderTitle(){return this.heading?this.block(`title`,{title:!0}):g}renderParagraph(){return this.paragraph?_`<div class="paragraph">
${[`100%`,`100%`,`92%`,`60%`].map(e=>this.block(`line`,{},{width:e,height:`16px`}))}
</div>`:g}renderLines(){if(this.paragraph||this.heading)return g;let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return Array.from({length:e},()=>this.block(`line`,{[this.variant]:!0},{width:Yi(this.width),height:Yi(this.height),borderRadius:Yi(this.borderRadius)}))}render(){if(this.loaded)return _`<slot></slot>`;if(this.decorative){let e=this.variant===`circular`?Yi(this.size??this.width??`32`):void 0;return _`<span
part="root"
aria-hidden="true"
class=${x({skeleton:!0,decorative:!0,[this.variant]:!0,[`animation-${this.animation}`]:!0})}
style=${S({width:e??Yi(this.width),height:e??Yi(this.height),borderRadius:Yi(this.borderRadius)})}
></span>`}let e=this.variant===`card`?_`<div class=${x({card:!0,active:this.active})}>
${this.renderAvatar()}
<div class="cardContent">
${this.renderTitle()} ${this.renderParagraph()}
</div>
</div>`:_`${this.renderAvatar()}
<div class="content">
${this.renderTitle()} ${this.renderLines()}
${this.renderParagraph()}
</div>`;return _`<div
part="root"
role="status"
aria-busy="true"
aria-label=${this.aria.label??this.locale.t(`common.loading`)}
class=${x({skeletonRoot:!0,withAvatar:this.avatar})}
>
${e}
</div>`}},z([y({reflect:!0})],K.prototype,`variant`,void 0),z([y({reflect:!0})],K.prototype,`animation`,void 0),z([y({type:Boolean,reflect:!0})],K.prototype,`loaded`,void 0),z([y({type:Boolean,reflect:!0})],K.prototype,`decorative`,void 0),z([y()],K.prototype,`size`,void 0),z([y()],K.prototype,`width`,void 0),z([y()],K.prototype,`height`,void 0),z([y({attribute:`border-radius`})],K.prototype,`borderRadius`,void 0),z([y({type:Number})],K.prototype,`lines`,void 0),z([y({type:Boolean})],K.prototype,`avatar`,void 0),z([y({attribute:`avatar-size`})],K.prototype,`avatarSize`,void 0),z([y({attribute:`avatar-shape`})],K.prototype,`avatarShape`,void 0),z([y({type:Boolean})],K.prototype,`active`,void 0),z([y({type:Boolean})],K.prototype,`paragraph`,void 0),z([y({type:Boolean})],K.prototype,`heading`,void 0),Qi=class e extends F{constructor(...e){super(...e),this.lines=3,this.lineHeight=`1em`,this.gap=`2`,this.noShrinkLast=!1,this.animation=`pulse`}static{this.tagName=`minerva-skeleton-text`}static{this.styles=[...Zi,C`
:host{
display: block;
}
`,L(bt)]}updated(t){k&&t.has(`lines`)&&!(Number.isInteger(this.lines)&&this.lines>=0)&&I(e.tagName,`lines must be a non-negative integer (got ${this.lines}).`)}render(){let e=Number.isFinite(this.lines)?Math.max(0,Math.floor(this.lines)):0;return _`<div
part="root"
aria-hidden="true"
class="skeletonText"
style=${S({gap:Xi(this.gap)})}
>
${Array.from({length:e},(t,n)=>_`<span
part="line"
class="skeleton decorative text animation-${this.animation}"
style=${S({height:Yi(this.lineHeight),width:!this.noShrinkLast&&n===e-1?`70%`:`100%`})}
></span>`)}
</div>`}},z([y({type:Number})],Qi.prototype,`lines`,void 0),z([y({attribute:`line-height`})],Qi.prototype,`lineHeight`,void 0),z([y()],Qi.prototype,`gap`,void 0),z([y({type:Boolean,attribute:`no-shrink-last`})],Qi.prototype,`noShrinkLast`,void 0),z([y({reflect:!0})],Qi.prototype,`animation`,void 0)})))()}var ea,ta;function na(){return(na=e((()=>{P(),j(),Tn(),O(),dr(),Ht(),p(),m(),v(),Xe(),ea=320,ta=class e extends F{constructor(...e){super(...e),this.asideWidth=ea,this.collapseBelow=`md`,this.gap=6,this.slots=new xn(this)}static{this.tagName=`minerva-split-layout`}static{this.styles=[N,C`
:host{
display: block;
min-width: 0;
}
`,L(It)]}get validAsideWidth(){return Number.isFinite(this.asideWidth)&&this.asideWidth>0}updated(){k&&!this.validAsideWidth&&I(e.tagName,`aside-width must be a finite positive number (got ${String(this.asideWidth)}); using ${ea}.`)}render(){let e=this.slots.test(`aside`),t=this.validAsideWidth?this.asideWidth:ea;return _`<div
class="root"
part="root"
style=${S({"--split-layout-aside-width":`${t}px`,"--split-layout-gap":s(this.gap)})}
>
<div
class=${x({grid:!0,[this.collapseBelow]:!0,hasAside:e})}
>
<div class="main" part="main"><slot></slot></div>
${e?_`<div class="aside" part="aside">
<slot name="aside"></slot>
</div>`:g}
</div>
</div>`}},z([y({type:Number,attribute:`aside-width`})],ta.prototype,`asideWidth`,void 0),z([y({attribute:`collapse-below`,reflect:!0})],ta.prototype,`collapseBelow`,void 0),z([y({converter:fr})],ta.prototype,`gap`,void 0)})))()}var ra,ia,aa,oa,sa,ca,la,ua;function da(){return(da=e((()=>{M(),P(),j(),Tn(),O(),dr(),Pt(),p(),m(),v(),Xe(),ra={start:`flex-start`,center:`center`,end:`flex-end`,stretch:`stretch`,baseline:`baseline`},ia={start:`flex-start`,center:`center`,end:`flex-end`,between:`space-between`,around:`space-around`,evenly:`space-evenly`},aa=()=>typeof HTMLSlotElement<`u`&&typeof HTMLSlotElement.prototype.assign==`function`,oa=`minerva-stack-item-`,sa=e=>Array.from(e.childNodes).filter(e=>e.nodeType===1||e.nodeType===3&&!!e.textContent?.trim()),ca=class extends F{constructor(...e){super(...e),this.direction=`column`,this.wrap=!1,this.attached=!1,this.aria=new w(this),this.slots=new xn(this),this.manualSlots=!1,this.fallbackSlotted=new Set}static{this.tagName=`minerva-stack`}static{this.styles=[N,C`
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
`,L(Nn)]}get resolvedDirection(){return this.direction}get resolvedAlign(){return this.align}createRenderRoot(){if(!this.shadowRoot){this.manualSlots=aa();let e=this.constructor;this.attachShadow({...e.shadowRootOptions,slotAssignment:this.manualSlots?`manual`:`named`})}return super.createRenderRoot()}renderSeparator(){let e=this.separator;return typeof e==`function`?e():e}get hasSeparator(){let e=this.separator;return e!=null&&e!==``}fallbackItems(){return Array.from(this.children).filter(e=>{let t=e.getAttribute(`slot`);return t===null||this.fallbackSlotted.has(e)&&t!==``})}releaseFallbackSlots(e=[]){for(let t of this.fallbackSlotted)e.includes(t)||(t.getAttribute(`slot`)?.startsWith(oa)&&t.removeAttribute(`slot`),this.fallbackSlotted.delete(t))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this.releaseFallbackSlots()}updated(){if(this.manualSlots){let e=sa(this),t=Array.from(this.renderRoot.querySelectorAll(`slot`));t.length===1?t[0].assign(...e):t.forEach((t,n)=>t.assign(e[n]))}else if(this.hasSeparator){let e=this.fallbackItems();e.forEach((e,t)=>{let n=`${oa}${t}`;this.fallbackSlotted.add(e),e.getAttribute(`slot`)!==n&&e.setAttribute(`slot`,n)}),this.releaseFallbackSlots(e)}else this.releaseFallbackSlots();k&&this.attached&&!this.aria.label&&I(this.constructor.tagName,`attached stacks are exposed as role="group": set aria-label (or aria-labelledby) to name the group.`)}renderItems(){return this.hasSeparator?this.manualSlots?Array.from({length:sa(this).length},(e,t)=>_`${t>0?this.renderSeparator():g}<slot></slot>`):_`${Array.from({length:this.fallbackItems().length},(e,t)=>_`${t>0?this.renderSeparator():g}<slot
name=${`${oa}${t}`}
></slot>`)}<slot></slot>`:_`<slot></slot>`}hookStates(){return{orientation:this.resolvedDirection.startsWith(`row`)?`horizontal`:`vertical`}}render(){this.slots;let e=this.resolvedDirection,t=this.resolvedAlign,n={};return this.gap!==void 0&&this.gap!==``&&!this.attached&&(n.gap=s(this.gap)),t&&ra[t]&&(n.alignItems=ra[t]),this.justify&&ia[this.justify]&&(n.justifyContent=ia[this.justify]),_`<div
part="root"
class=${x({stack:!0,[e]:!0,wrap:this.wrap,attached:this.attached})}
style=${S(n)}
role=${this.attached?`group`:g}
aria-label=${this.attached?this.aria.label??g:g}
>
${this.renderItems()}
</div>`}},z([y({reflect:!0})],ca.prototype,`direction`,void 0),z([y({converter:fr})],ca.prototype,`gap`,void 0),z([y({reflect:!0})],ca.prototype,`align`,void 0),z([y({reflect:!0})],ca.prototype,`justify`,void 0),z([y({type:Boolean,reflect:!0})],ca.prototype,`wrap`,void 0),z([y({attribute:`separator`})],ca.prototype,`separator`,void 0),z([y({type:Boolean,reflect:!0})],ca.prototype,`attached`,void 0),la=class extends ca{static{this.tagName=`minerva-hstack`}constructor(){super(),this.direction=`row`}get resolvedDirection(){return`row`}hookStates(){return{}}get resolvedAlign(){return this.align??`center`}},ua=class extends ca{static{this.tagName=`minerva-vstack`}constructor(){super(),this.direction=`column`}get resolvedDirection(){return`column`}hookStates(){return{}}get resolvedAlign(){return this.align??`stretch`}}})))()}var fa;function pa(){return(pa=e((()=>{M(),P(),R(),Dn(),j(),O(),pt(),p(),m(),v(),et(),fa=class e extends F{constructor(...e){super(...e),this.items=[],this.value=``,this.navigable=!1,this.locale=new D(this),this.aria=new w(this)}static{this.tagName=`minerva-steps`}static{this.styles=[N,C`
:host{
display: block;
}
`,L(In)]}select(e){e.disabled||e.value===this.value||this.emit(`minerva-change`,{value:e.value},{cancelable:!0})&&(this.value=e.value)}updated(){k&&this.value&&this.items.length&&!this.items.some(e=>e.value===this.value)&&I(e.tagName,`value "${this.value}" matches no step: no step is marked current.`)}hookStates(){return{readonly:!this.navigable}}render(){let e=this.items??[],t=e.findIndex(e=>e.value===this.value),n=!this.navigable;return _`<ol
part="root"
class="steps"
aria-label=${this.aria.label??this.locale.t(`steps.label`)}
>
${Ze(e,e=>e.value,(e,r)=>{let i=r===t,a=t>-1&&r<t,o=_`<span
part="indicator"
class="number"
aria-hidden="true"
>${r+1}</span
><span part="label" class="label">${e.label}</span>`,s=i?void 0:a?`complete`:`upcoming`;return _`<li
part=${hn(`item`,{current:i,disabled:!n&&!!e.disabled,status:s})}
class=${x({step:!0,current:i,complete:a})}
aria-current=${n&&i?`step`:g}
>
${n?_`<span part="button" class="button static"
>${o}</span
>`:_`<button
type="button"
part="button"
class="button"
?disabled=${!!e.disabled}
aria-current=${i?`step`:g}
@click=${()=>this.select(e)}
>
${o}
</button>`}
</li>`})}
</ol>`}},z([y({attribute:!1})],fa.prototype,`items`,void 0),z([y({reflect:!0})],fa.prototype,`value`,void 0),z([y({type:Boolean,reflect:!0})],fa.prototype,`navigable`,void 0)})))()}var ma,ha,q;function ga(){return(ga=e((()=>{M(),P(),R(),j(),Tn(),O(),wn(),zt(),p(),m(),v(),$e(),ma=400,ha={start:`labelStart`,end:`labelEnd`,top:`labelTop`,bottom:`labelBottom`},q=class e extends A{constructor(...e){super(...e),this.checked=!1,this.defaultChecked=!1,this.value=`on`,this.label=``,this.offLabel=``,this.onLabel=``,this.variant=`slider`,this.size=`medium`,this.color=`primary`,this.shape=`round`,this.labelPlacement=`end`,this.iconPlacement=`start`,this.loading=!1,this.noRipple=!1,this.readOnly=!1,this.invalid=!1,this.rippleActive=!1,this.dirty=!1,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.slots=new xn(this)}static{this.tagName=`minerva-switch`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,C`
:host{
display: inline-flex;
vertical-align: middle;
}
`,L(_t)]}get bilateral(){return!!this.offLabel&&!!this.onLabel}get segmented(){return this.variant===`segmented`&&this.bilateral}get blocked(){return this.isDisabled||this.loading||this.readOnly}focus(e){if(this.segmented){this.renderRoot.querySelector(`.segmentActive`)?.focus(e);return}this.input?.focus(e)}blur(){(this.shadowRoot?.activeElement)?.blur()}click(){this.input?.click()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.rippleTimer)}getFormValue(){return this.checked?this.value:null}getValidity(){return this.required&&!this.checked?{flags:{valueMissing:!0},message:this.locale.t(`validation.checkMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.checked=this.defaultChecked}restoreFormState(e){this.checked=e!=null&&e!==``}willUpdate(t){t.has(`defaultChecked`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`checked`))&&(this.checked=this.defaultChecked),k&&t.has(`variant`)&&this.variant===`segmented`&&!this.bilateral&&I(e.tagName,`variant="segmented" needs both off-label and on-label; rendering a slider.`)}handleChange(){if(this.blocked){this.input.checked=this.checked;return}this.dirty=!0,this.checked=this.input.checked,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{checked:this.checked,value:this.value})}handleKeyDown(e){e.key===`Enter`&&(e.preventDefault(),!this.blocked&&this.input.click())}handleClick(e){if(this.readOnly){e.preventDefault();return}this.noRipple||this.blocked||(clearTimeout(this.rippleTimer),this.rippleActive=!0,this.rippleTimer=setTimeout(()=>this.rippleActive=!1,ma))}setState(e){this.blocked||e===this.checked||this.input.click()}hookStates(){return{state:this.checked?`checked`:`unchecked`,disabled:this.isDisabled,loading:this.loading,invalid:this.invalid||this.aria.attr(`aria-invalid`)===`true`,readonly:this.readOnly,required:this.required,size:this.size,color:this.color,shape:this.shape,variant:this.segmented?`segmented`:`slider`}}renderInput(e){let t=this.invalid||this.aria.attr(`aria-invalid`)===`true`;return _`<input
part="input"
type="checkbox"
role=${e?g:`switch`}
class=${e?`hiddenInput`:``}
.checked=${Qe(this.checked)}
?disabled=${this.isDisabled||this.loading}
?required=${this.required}
tabindex=${e?`-1`:g}
aria-hidden=${e?`true`:g}
aria-label=${e?g:this.aria.label??g}
aria-description=${e?g:this.aria.description??g}
aria-checked=${e?g:String(this.checked)}
aria-disabled=${!e&&(this.isDisabled||this.loading)?`true`:g}
aria-busy=${this.loading?`true`:g}
aria-invalid=${!e&&t?`true`:g}
aria-readonly=${!e&&this.readOnly?`true`:g}
aria-required=${!e&&this.required?`true`:g}
@change=${this.handleChange}
@click=${this.handleClick}
@keydown=${this.handleKeyDown}
/>`}render(){let e=this.blocked,t=this.isDisabled;if(this.segmented)return _`<span
part="root"
role="group"
aria-label=${this.aria.label??g}
aria-description=${this.aria.description??g}
aria-disabled=${e?`true`:g}
class=${x({segmented:!0,[this.size]:!0,[this.color]:!0,disabled:e})}
>
${this.renderInput(!0)}
${[!1,!0].map(t=>{let n=this.checked===t;return _`<button
part="segment"
type="button"
class=${x({segment:!0,segmentActive:n})}
?disabled=${e}
aria-pressed=${String(n)}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`})}
</span>`;let n=this.bilateral,r=this.slots.test(`icon`),i=x({switch:!0,[this.size]:!0,[ha[this.labelPlacement]]:!n,[this.color]:!0,checked:this.checked,checkedLarge:this.checked&&this.size===`large`,disabled:t,loading:this.loading,square:this.shape===`square`,ripple:!this.noRipple&&this.rippleActive,bilateral:n}),a=_`<span class="switchBase" part="control">
${this.renderInput(!1)}
<span class="track" part="track"></span>
<span class="thumb" part="thumb"
>${this.iconPlacement===`start`&&r?_`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:g}</span
>
${this.noRipple?g:_`<span class="rippleEffect"></span>`}
</span>`,o=this.iconPlacement===`end`&&r?_`<span class="icon" part="icon"><slot name="icon"></slot></span>`:g;if(n){let t=t=>_`<button
part="side"
type="button"
class=${x({side:!0,sideActive:this.checked===t})}
?disabled=${e}
@click=${()=>this.setState(t)}
>
${t?this.onLabel:this.offLabel}
</button>`;return _`<span part="root" class=${i}
>${t(!1)}${a}${t(!0)}${o}</span
>`}let s=this.label||this.slots.test(`[default]`)?_`<span class="label" part="label"
>${this.label||_`<slot></slot>`}</span
>`:g,c=this.labelPlacement===`start`||this.labelPlacement===`top`;return _`<label part="root" class=${i}
>${c?s:g}${a}${o}${c?g:s}</label
>`}},z([y({attribute:!1})],q.prototype,`checked`,void 0),z([y({type:Boolean,attribute:`checked`,reflect:!0})],q.prototype,`defaultChecked`,void 0),z([y()],q.prototype,`value`,void 0),z([y()],q.prototype,`label`,void 0),z([y({attribute:`off-label`})],q.prototype,`offLabel`,void 0),z([y({attribute:`on-label`})],q.prototype,`onLabel`,void 0),z([y({reflect:!0})],q.prototype,`variant`,void 0),z([y({reflect:!0})],q.prototype,`size`,void 0),z([y({reflect:!0})],q.prototype,`color`,void 0),z([y({reflect:!0})],q.prototype,`shape`,void 0),z([y({attribute:`label-placement`,reflect:!0})],q.prototype,`labelPlacement`,void 0),z([y({attribute:`icon-placement`})],q.prototype,`iconPlacement`,void 0),z([y({type:Boolean,reflect:!0})],q.prototype,`loading`,void 0),z([y({type:Boolean,attribute:`no-ripple`})],q.prototype,`noRipple`,void 0),z([y({type:Boolean,reflect:!0,attribute:`readonly`})],q.prototype,`readOnly`,void 0),z([y({type:Boolean,reflect:!0})],q.prototype,`invalid`,void 0),z([h()],q.prototype,`rippleActive`,void 0),z([b(`input`)],q.prototype,`input`,void 0)})))()}var _a,va,ya,ba,xa;function Sa(){return(Sa=e((()=>{Rt(),M(),P(),Qt(),tr(),j(),O(),Or(),Mr(),vt(),p(),m(),v(),f(),_a=0,va=e=>e.parentElement?.closest(`minerva-tabs`)??null,ya=class e extends F{constructor(...e){super(...e),this.variant=`line`,this.color=`primary`,this.orientation=`horizontal`,this.activationMode=`automatic`,this.noLoop=!1,this.label=``,this.aria=new w(this),this.baseId=`minerva-tabs-${++_a}`,this.rovingKey=``,this.observer=null,this.settleQueued=!1,this.roving=new Dr(this,()=>({getItems:()=>this.tabs,orientation:this.orientation,dir:l(this),loop:!this.noLoop})),this.machine=new vr(this,be(this.tabsProps()),()=>!1),this.handleKeyDownCapture=()=>this.ensureRoving(),this.handleFocusIn=e=>{let t=this.tabs.find(t=>t===e.target);t&&this.send({type:`FOCUS`,value:t.value,disabled:t.disabled})}}static{this.tagName=`minerva-tabs`}static{this.styles=[N,C`
:host{
display: block;
min-width: 0;
}
`,L(Xt)]}get tabs(){return Array.from(this.querySelectorAll(`minerva-tab`)).filter(e=>va(e)===this)}get panels(){return Array.from(this.querySelectorAll(`minerva-tab-panel`)).filter(e=>va(e)===this)}tabsProps(){return{value:this.value,activationMode:this.activationMode,onValueChange:e=>this.apply(e)}}send(e){this.machine.sync(this.tabsProps()),this.machine.send(e)}apply(e){this.emit(`minerva-change`,{value:e},{cancelable:!0})&&(this.value=e)}select(e){this.send({type:`SELECT`,value:e,disabled:!1})}connectedCallback(){super.connectedCallback(),typeof MutationObserver<`u`&&(this.observer=new MutationObserver(()=>this.sync()),this.observer.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`value`,`disabled`]}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.rovingKey=``}updated(t){t.has(`value`)&&k&&this.value!==void 0&&this.tabs.length>0&&!this.tabs.some(e=>e.value===this.value)&&I(e.tagName,`value "${this.value}" does not match any <minerva-tab>.`),this.sync()}ensureRoving(){if(!this.tablist)return;let e=`${this.orientation}|${l(this)}|${this.noLoop}`;e!==this.rovingKey&&(this.rovingKey=e,this.roving.detach(),this.roving.attach(this.tablist))}sync(){if(!this.tablist)return;let e=this.tabs,t=this.panels,n=new Map;for(let t of e)n.set(t,t.id||`${this.baseId}-tab-${t.value}`),t.id||E(t,`id`,n.get(t),this);for(let e of t)n.set(e,e.id||`${this.baseId}-panel-${e.value}`),e.id||E(e,`id`,n.get(e),this);for(let r of e){let e=t.find(e=>e.value===r.value);r.sync(this,r.value===this.value,e&&n.get(e))}for(let r of t){let t=e.find(e=>e.value===r.value);r.sync(this,r.value===this.value,t&&n.get(t))}let r=[this,...e,...t].find(Fn);if(r){this.settleQueued||(this.settleQueued=!0,Ft(r,()=>{this.settleQueued=!1,this.requestUpdate()}));return}this.ensureRoving();let i=ne(e,this.value);i?this.roving.setActive(i,{focus:!1}):this.roving.refresh()}hookStates(){return{orientation:this.orientation,variant:this.variant,color:this.color}}render(){return _`<div
part="root"
class=${x({tabs:!0,[this.color]:!0,vertical:this.orientation===`vertical`})}
data-orientation=${this.orientation}
@keydown=${{handleEvent:this.handleKeyDownCapture,capture:!0}}
>
<div
part="list"
role="tablist"
aria-label=${this.label||this.aria.label||g}
aria-orientation=${this.orientation}
data-orientation=${this.orientation}
class=${x({list:!0,[`${this.variant}List`]:!0,verticalList:this.orientation===`vertical`})}
@focusin=${this.handleFocusIn}
>
<slot name="tab" @slotchange=${()=>this.sync()}></slot>
</div>
<slot @slotchange=${()=>this.sync()}></slot>
</div>`}},z([y({reflect:!0})],ya.prototype,`value`,void 0),z([y({reflect:!0})],ya.prototype,`variant`,void 0),z([y({reflect:!0})],ya.prototype,`color`,void 0),z([y({reflect:!0})],ya.prototype,`orientation`,void 0),z([y({reflect:!0,attribute:`activation-mode`})],ya.prototype,`activationMode`,void 0),z([y({type:Boolean,reflect:!0,attribute:`no-loop`})],ya.prototype,`noLoop`,void 0),z([y()],ya.prototype,`label`,void 0),z([b(`[role="tablist"]`)],ya.prototype,`tablist`,void 0),ba=class extends F{constructor(...e){super(...e),this.internals=cr(this),this.ownedAria=new Set,this.value=``,this.disabled=!1,this.selected=!1,this.group=null,this.handleMouseDown=e=>{if(this.disabled){e.preventDefault();return}e.button===0&&!e.ctrlKey?this.select():e.preventDefault()},this.handleKeyDown=e=>{e.defaultPrevented||this.disabled||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),this.select())},this.handleClick=e=>{!this.disabled&&e.detail===0&&this.select()}}static{this.tagName=`minerva-tab`}static{this.styles=[N,C`
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
`,L(Xt)]}sync(e,t,n){this.group=e,this.selected=t,E(this,`aria-controls`,n??null),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.hasAttribute(`slot`)||E(this,`slot`,`tab`),Vt(this,this.internals,{role:`tab`},this.ownedAria),this.addEventListener(`mousedown`,this.handleMouseDown),this.addEventListener(`keydown`,this.handleKeyDown),this.addEventListener(`click`,this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`mousedown`,this.handleMouseDown),this.removeEventListener(`keydown`,this.handleKeyDown),this.removeEventListener(`click`,this.handleClick),this.group=null}select(){(this.group??va(this))?.select(this.value)}updated(){Vt(this,this.internals,{ariaSelected:String(this.selected),ariaDisabled:this.disabled?`true`:null},this.ownedAria),E(this,`data-state`,this.selected?`active`:`inactive`),E(this,`data-disabled`,this.disabled);let e=this.group?.orientation??`horizontal`;E(this,`data-orientation`,e)}hookStates(){return{state:this.selected?`active`:`inactive`,disabled:this.disabled,orientation:this.group?.orientation??`horizontal`,variant:this.group?.variant??`line`,color:this.color}}render(){let e=this.group,t=e?.variant??`line`,n=e?.orientation===`vertical`;return _`<span
part="root"
class=${x({trigger:!0,[`${t}Trigger`]:!0,verticalTrigger:n,[this.color??``]:!!this.color,colored:!!this.color})}
data-state=${this.selected?`active`:`inactive`}
data-orientation=${e?.orientation??`horizontal`}
><slot></slot
></span>`}},z([y({reflect:!0})],ba.prototype,`value`,void 0),z([y({type:Boolean,reflect:!0})],ba.prototype,`disabled`,void 0),z([y({reflect:!0})],ba.prototype,`color`,void 0),z([y({type:Boolean,reflect:!0})],ba.prototype,`selected`,void 0),xa=class extends F{constructor(...e){super(...e),this.internals=cr(this),this.value=``,this.forceMount=!1,this.orientation=`horizontal`,this.selected=!1,this.stamped=[]}static{this.tagName=`minerva-tab-panel`}static{this.styles=[N,C`
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
`,L(Xt)]}get template(){return Array.from(this.children).find(e=>e instanceof HTMLTemplateElement)??null}syncContent(){if(Fn(this))return;let e=this.template;if(this.selected||this.forceMount){if(e&&!this.stamped.length){let t=this.ownerDocument.importNode(e.content,!0);this.stamped=Array.from(t.childNodes),e.after(t)}return}for(let e of this.stamped)e.parentNode?.removeChild(e);this.stamped=[]}sync(e,t,n){this.orientation=e.orientation,this.selected=t,E(this,`hidden`,!t),this.syncContent(),E(this,`data-state`,t?`active`:`inactive`),E(this,`data-orientation`,e.orientation),E(this,`aria-labelledby`,n??null),this.requestUpdate()}willUpdate(e){e.has(`forceMount`)&&this.hasUpdated&&this.syncContent()}connectedCallback(){super.connectedCallback(),Vt(this,this.internals,{role:`tabpanel`}),this.hasAttribute(`tabindex`)||E(this,`tabindex`,`0`)}hookStates(){return{state:this.selected?`active`:`inactive`,orientation:this.orientation}}render(){return _`<div
part="root"
class="panel"
data-orientation=${this.orientation}
?hidden=${!this.selected&&Fn(this)&&!!va(this)}
>
<slot></slot>
</div>`}},z([y({reflect:!0})],xa.prototype,`value`,void 0),z([y({type:Boolean,reflect:!0,attribute:`force-mount`})],xa.prototype,`forceMount`,void 0)})))()}var Ca,J;function wa(){return(wa=e((()=>{M(),P(),T(),R(),j(),Tn(),O(),nr(),p(),m(),v(),Xe(),et(),Ca=600,J=class e extends F{constructor(...e){super(...e),this.color=`neutral`,this.variant=`subtle`,this.size=`medium`,this.shape=`rounded`,this.closable=!1,this.clickable=!1,this.toggle=!1,this.loading=!1,this.elevation=!1,this.disabled=!1,this.noRipple=!1,this.ripples=[],this.nextRippleId=0,this.rippleTimers=new Set,this.locale=new D(this),this.aria=new w(this),this.slots=new xn(this)}static{this.tagName=`minerva-tag`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,C`
:host{
display: inline-flex;
max-width: 100%;
vertical-align: middle;
}
.closeIcon svg{
display: block;
}
`,L(ht)]}focus(e){(this.actionButton??this.closeButton)?.focus(e)}disconnectedCallback(){super.disconnectedCallback(),this.rippleTimers.forEach(clearTimeout),this.rippleTimers.clear(),this.ripples=[]}labelText(){return Array.from(this.childNodes).filter(e=>e.nodeType===3||e.nodeType===1&&!e.hasAttribute(`slot`)).map(e=>e.textContent??``).join(``).replace(/\s+/g,` `).trim()}get inactive(){return this.disabled||this.loading}handleClick(e){this.inactive||(this.addRipple(e),this.toggle&&(this.pressed=!this.pressed,this.emit(`minerva-change`,{pressed:this.pressed})))}handleClose(e){e.stopPropagation(),!this.disabled&&this.emit(`minerva-close`,{})}addRipple(e){if(this.noRipple)return;let t=e.currentTarget.parentElement;if(!t)return;let n=t.getBoundingClientRect(),r=e.detail===0,i=Math.max(n.width,n.height),a=i/2,o=this.nextRippleId++,s=r?n.width/2-a:e.clientX-n.left-a,c=r?n.height/2-a:e.clientY-n.top-a;this.ripples=[...this.ripples,{id:o,style:{width:`${i}px`,height:`${i}px`,left:`${s}px`,top:`${c}px`}}];let ee=setTimeout(()=>{this.rippleTimers.delete(ee),this.ripples=this.ripples.filter(e=>e.id!==o)},Ca);this.rippleTimers.add(ee)}hookStates(){return{state:this.clickable&&this.pressed?`active`:`inactive`,disabled:this.disabled,loading:this.loading,size:this.size,variant:this.variant,color:this.color,shape:this.shape}}updated(){k&&(this.toggle||this.pressed!==void 0)&&!this.clickable&&I(e.tagName,`pressed / toggle require clickable: the tag is not a button otherwise.`)}render(){let e=this.toggle||this.pressed!==void 0,t=this.closable?this.labelText():``,n=this.closeLabel??(t?this.locale.t(`tag.closeWithLabel`,{label:t}):this.locale.t(`tag.close`)),r=_`${this.loading?_`<span
class="spinner"
part="spinner"
aria-hidden="true"
></span>`:_`${this.slots.test(`icon`)?_`<span class="icon" part="icon"
><slot name="icon"></slot
></span>`:g}${this.slots.test(`avatar`)?_`<span class="avatar" part="avatar"
><slot name="avatar"></slot
></span>`:g}`}<span class="content" part="label"><slot></slot></span>`;return _`<div
part="root"
class=${x({tag:!0,[this.color]:!0,[this.variant]:!0,[this.size]:!0,[this.shape]:!0,clickable:this.clickable&&!this.inactive,pressed:this.clickable&&!!this.pressed,elevation:this.elevation,disabled:this.disabled,loading:this.loading})}
aria-busy=${this.loading?`true`:g}
data-component="tag"
>
${this.clickable?_`<button
type="button"
part="action"
class="action"
?disabled=${this.inactive}
aria-pressed=${e?String(!!this.pressed):g}
aria-label=${this.aria.label??g}
aria-description=${this.aria.description??g}
@click=${this.handleClick}
>
${r}
</button>`:r}
${this.closable&&!this.loading?_`<button
type="button"
part="close-button"
class="closeIcon"
?disabled=${this.disabled}
aria-label=${n}
title=${n}
@click=${this.handleClose}
>
<slot name="close-icon">${Gt}</slot>
</button>`:g}
${Ze(this.ripples,e=>e.id,e=>_`<span class="ripple" style=${S(e.style)}></span>`)}
</div>`}},z([y({reflect:!0})],J.prototype,`color`,void 0),z([y({reflect:!0})],J.prototype,`variant`,void 0),z([y({reflect:!0})],J.prototype,`size`,void 0),z([y({reflect:!0})],J.prototype,`shape`,void 0),z([y({type:Boolean,reflect:!0})],J.prototype,`closable`,void 0),z([y({type:Boolean,reflect:!0})],J.prototype,`clickable`,void 0),z([y({type:Boolean,reflect:!0})],J.prototype,`pressed`,void 0),z([y({type:Boolean,reflect:!0})],J.prototype,`toggle`,void 0),z([y({type:Boolean,reflect:!0})],J.prototype,`loading`,void 0),z([y({type:Boolean,reflect:!0})],J.prototype,`elevation`,void 0),z([y({type:Boolean,reflect:!0})],J.prototype,`disabled`,void 0),z([y({attribute:`close-label`})],J.prototype,`closeLabel`,void 0),z([y({type:Boolean,attribute:`no-ripple`})],J.prototype,`noRipple`,void 0),z([h()],J.prototype,`ripples`,void 0),z([b(`.action`)],J.prototype,`actionButton`,void 0),z([b(`.closeIcon`)],J.prototype,`closeButton`,void 0)})))()}function Ta(e,t){try{let t=JSON.parse(e);if(Array.isArray(t))return t.filter(e=>typeof e==`string`)}catch{}return k&&I(Oa,`the ${t} attribute is not a JSON array of strings.`),null}function Ea(e,t){let n=(e??``).trim();return n?n.startsWith(`[`)?Ta(n,t)??[]:n.split(`,`).map(e=>e.trim()).filter(Boolean):[]}function Da(e){let t=(e??``).trim();return t?t.startsWith(`[`)?Ta(t,`separators`)??[...r]:t.split(/\s+/):[]}var Oa,ka,Aa,ja,Y;function Ma(){return(Ma=e((()=>{M(),P(),T(),R(),Dn(),j(),O(),An(),Nr(),$n(),wn(),nr(),Jt(),p(),m(),v(),c(),f(),$e(),et(),Oa=`minerva-tag-input`,ka=`Enter`,Aa=[`\r
`,`
`,`\r`],ja=0,Y=class extends A{constructor(...e){super(...e),this._value=[],this.defaultValue=[],this.options=[],this.separators=[...r],this.noCommitOnBlur=!1,this.placeholder=``,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.draft=``,this.requestedOpen=!1,this.highlight=0,this.listId=`minerva-tag-input-list-${ja++}`,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.floating=new Tr(this,()=>({anchor:()=>this.combobox,floating:()=>this.list,branches:()=>[this],placement:`bottom-start`,offset:{mainAxis:4},matchAnchorWidth:`exact`,onDismiss:()=>this.setOpen(!1)})),this.dirty=!1,this.composing=!1,this.navigating=!1,this.highlightKey=``}static{this.tagName=Oa}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,br,C`
:host{
display: block;
min-width: 0;
}
`,L(ht),L(Bn),L(`.combobox { ${Rn.replace(/@charset[^;]*;/g,``)} }`),L(ar),C`

.combobox > .root{
flex-direction: row;
gap: 0;
}

.list{
inset: auto;
}
`]}get value(){return this._value}set value(e){this.dirty=!0,this.setValue(e)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}setValue(e){let t=this._value;this._value=Array.isArray(e)?e.map(String):typeof e==`string`?Ea(e,`value`):[],this.requestUpdate(`value`,t)}get blocked(){return this.isDisabled||this.readOnly}get isOpen(){return this.requestedOpen&&!this.blocked}get filtered(){let e=this.value,t=this.draft.trim(),n=[...new Set(this.options.map(e=>e.trim()).filter(Boolean))].filter(t=>!e.includes(t)),r=n.map(e=>({tag:e,label:e,filterValue:e}));t&&!e.includes(t)&&!n.includes(t)&&r.unshift({tag:t,label:this.createLabel?this.createLabel(t):this.locale.t(`tagInput.create`,{tag:t}),filterValue:t});let i=t.toLowerCase();return i?r.filter(e=>e.filterValue.toLowerCase().includes(i)):r}get enterCommits(){return this.separators.includes(ka)}get splitters(){return this.separators.filter(e=>e!==ka&&e!==``)}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.value)e.append(this.name,t);return e}getValidity(){return this.required&&this.value.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.setValue([...this.defaultValue]),this.draft=``,this.requestedOpen=!1,this.navigating=!1}restoreFormState(e){e instanceof FormData?this.value=e.getAll(this.name).filter(e=>typeof e==`string`):typeof e==`string`&&(this.value=[e])}willUpdate(e){e.has(`defaultValue`)&&!this.dirty&&this.setValue([...this.defaultValue]),this.blocked&&(this.requestedOpen=!1);let t=`${this.filtered.length}\u0000${this.draft}`;if(t!==this.highlightKey&&(this.highlightKey=t,this.highlight=0),k&&e.has(`value`)){let e=new Set,t=this.value.find(t=>e.size===e.add(t).size);t!==void 0&&I(Oa,`value contains the tag "${t}" more than once: tags are unique (removing one removes its position only).`)}}updated(e){super.updated(e),this.floating.sync(this.isOpen),this.input?.toggleAttribute(fe,!this.isOpen&&this.draft!==``)}setOpen(e){e&&this.blocked||e!==this.requestedOpen&&this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.requestedOpen=e)}setTags(e){this.value=e,this.emit(`minerva-change`,{value:[...e]})}setDraft(e){this.draft=e,this.input&&this.input.value!==e&&(this.input.value=e)}commitAll(e,t=``){if(this.blocked||this.composing)return;let n=this.value,r=[...n];for(let t of e){let e=t.trim();e&&!r.includes(e)&&r.push(e)}r.length!==n.length&&this.setTags(r),this.navigating=!1,this.setDraft(t)}commit(e){this.commitAll([e])}select(e){this.commit(e.tag),this.setOpen(!1)}removeAt(e){this.blocked||(this.setTags(this.value.filter((t,n)=>n!==e)),this.input?.focus())}handleInput(){let e=this.input.value;if(this.blocked){this.input.value=this.draft;return}this.navigating=!1;let t=this.splitters,n=this.composing||t.length===0?[e]:ue(e,t);n.length>1?this.commitAll(n.slice(0,-1),n[n.length-1]):this.draft=e,this.setOpen(!0),this.emit(`minerva-input`,{value:this.draft})}handlePaste(e){if(this.blocked||this.composing)return;let t=e.clipboardData?.getData(`text`)??``,n=this.enterCommits?[...this.splitters,...Aa]:this.splitters;if(!n.some(e=>t.includes(e)))return;e.preventDefault();let r=this.draft,i=this.input.selectionStart??r.length,a=this.input.selectionEnd??r.length,o=r.slice(0,i)+t+r.slice(a);this.commitAll(ue(o,n)),this.setOpen(!1)}handleKeyDown(e){if(this.blocked||this.composing||e.isComposing||e.keyCode===229)return;let t=this.filtered,n=t.length,r=this.isOpen,i=this.draft.trim(),a=this.value;switch(e.key){case`ArrowDown`:case`ArrowUp`:if(e.preventDefault(),this.navigating=!0,this.setOpen(!0),n>0){let t=e.key===`ArrowDown`?1:-1;this.highlight=(this.highlight+t+n)%n}break;case`Enter`:e.preventDefault(),this.enterCommits?!this.navigating&&(!i||a.includes(i))?this.commit(this.draft):r&&t[this.highlight]?this.select(t[this.highlight]):(this.commit(this.draft),this.setOpen(!1)):this.navigating&&r&&t[this.highlight]&&this.select(t[this.highlight]);break;case`Escape`:this.navigating=!1,this.setDraft(``),r&&!e.defaultPrevented&&(e.preventDefault(),this.setOpen(!1));break;case`Backspace`:this.draft===``&&a.length>0&&(e.preventDefault(),this.setTags(a.slice(0,-1)))}}handleFocus(){this.blocked||this.setOpen(!0)}handleBlur(){this.setOpen(!1),this.noCommitOnBlur||this.commit(this.draft)}clearAll(){this.setDraft(``),this.setTags([]),this.emit(`minerva-clear`),this.input?.focus()}renderTag(e,t){let n=this.isDisabled,r=this.removeLabel?this.removeLabel(e):this.locale.t(`tagInput.remove`,{tag:e});return _`<div
part="tag"
class=${x({tag:!0,neutral:!0,subtle:!0,large:!0,rounded:!0,disabled:n})}
data-component="tag"
>
<span class="content"><span class="label">${e}</span></span>
${this.readOnly?g:_`<button
part="remove-button"
type="button"
class="closeIcon"
aria-label=${r}
title=${r}
?disabled=${n}
@click=${e=>{e.stopPropagation(),this.removeAt(t)}}
>
${Gt}
</button>`}
</div>`}hookStates(){return{state:this.isOpen?`open`:`closed`,disabled:this.isDisabled,invalid:this.invalid,readonly:this.readOnly,required:this.required,size:this.size}}renderList(e){let t=this.aria.label;return _`<ul
part="list"
id=${this.listId}
role="listbox"
popover="manual"
aria-label=${t??g}
class="list"
>
${e.length===0?_`<li class="empty" part="empty" role="presentation">
${this.emptyText??this.locale.t(`tagInput.empty`)}
</li>`:g}
${e.map((e,t)=>_`<li
part=${hn(`option`,{highlighted:t===this.highlight})}
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
</ul>`}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.value,r=this.isOpen,i=this.filtered,a=this.draft.trim(),o=r?i[this.highlight]:void 0,s=e=>e.preventDefault();return _`<div part="root" class="root">
${n.length>0?_`<div part="tags" class="values">
${Ze(n,(e,t)=>`${t}-${e}`,(e,t)=>this.renderTag(e,t))}
</div>`:g}
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
aria-label=${this.aria.label??g}
aria-description=${this.aria.description??g}
aria-expanded=${r?`true`:`false`}
aria-controls=${r?this.listId:g}
aria-autocomplete="list"
aria-activedescendant=${o?`${this.listId}-option-${this.highlight}`:g}
aria-invalid=${this.invalid?`true`:g}
aria-required=${this.required?`true`:g}
autocomplete="off"
spellcheck="false"
placeholder=${this.placeholder||g}
.value=${Qe(this.draft)}
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
${r?this.renderList(i):g}
</div>
${this.readOnly?g:_`<button
part="add-button"
type="button"
class=${x({iconButton:!0,neutral:!0,"variant-ghost":!0,medium:!0,square:!0,disabled:t||!a||n.includes(a)})}
aria-label=${this.addLabel??e(`tagInput.add`)}
?disabled=${t||!a||n.includes(a)}
@mousedown=${s}
@click=${()=>{this.commit(this.draft),this.input?.focus()}}
>
${cn}
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
${Gt}
</button>`}
</div>
</div>`}},z([y({attribute:!1})],Y.prototype,`value`,null),z([y({attribute:`value`,converter:{fromAttribute:e=>Ea(e,`value`)}})],Y.prototype,`defaultValue`,void 0),z([y({converter:{fromAttribute:e=>Ea(e,`options`)}})],Y.prototype,`options`,void 0),z([y({converter:{fromAttribute:Da}})],Y.prototype,`separators`,void 0),z([y({type:Boolean,attribute:`no-commit-on-blur`})],Y.prototype,`noCommitOnBlur`,void 0),z([y()],Y.prototype,`placeholder`,void 0),z([y({reflect:!0})],Y.prototype,`size`,void 0),z([y({type:Boolean,reflect:!0})],Y.prototype,`invalid`,void 0),z([y({type:Boolean,reflect:!0,attribute:`readonly`})],Y.prototype,`readOnly`,void 0),z([y({attribute:`empty-text`})],Y.prototype,`emptyText`,void 0),z([y({attribute:`add-label`})],Y.prototype,`addLabel`,void 0),z([y({attribute:`clear-label`})],Y.prototype,`clearLabel`,void 0),z([y({attribute:!1})],Y.prototype,`removeLabel`,void 0),z([y({attribute:!1})],Y.prototype,`createLabel`,void 0),z([h()],Y.prototype,`draft`,void 0),z([h()],Y.prototype,`requestedOpen`,void 0),z([h()],Y.prototype,`highlight`,void 0),z([b(`input.field`)],Y.prototype,`input`,void 0),z([b(`.combobox`)],Y.prototype,`combobox`,void 0),z([b(`.list`)],Y.prototype,`list`,void 0)})))()}var Na;function Pa(){return(Pa=e((()=>{M(),P(),T(),j(),O(),dn(),yn(),p(),m(),v(),f(),Na=class e extends F{constructor(...e){super(...e),this.variant=`default`,this.aria=new w(this)}static{this.tagName=`minerva-text-link`}static{this.shadowRootOptions={...F.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,C`
:host{
display: inline;
}
:host([variant="action"]){
display: block;
}
:host([variant="subtle"]){
display: inline-flex;
}
`,L(sr)]}focus(e){this.anchor?.focus(e)}blur(){this.anchor?.blur()}click(){this.anchor?.click()}hookStates(){return{variant:this.variant}}updated(){k&&!this.href&&I(e.tagName,`href is missing: without it the link is not focusable nor announced as a link (use a button for actions).`)}render(){return _`<a
part="root"
class=${x({textLink:!0,[this.variant]:!0})}
href=${ln(e.tagName,this.href)??g}
target=${this.target??g}
rel=${ce(this.target,this.rel)??g}
download=${this.download??g}
hreflang=${this.hreflang??g}
aria-label=${this.aria.label??g}
aria-description=${this.aria.description??g}
aria-current=${this.aria.attr(`aria-current`)??g}
><slot></slot>${this.variant===`subtle`?Tt:g}</a
>`}},z([y({reflect:!0})],Na.prototype,`variant`,void 0),z([y()],Na.prototype,`href`,void 0),z([y()],Na.prototype,`target`,void 0),z([y()],Na.prototype,`rel`,void 0),z([y()],Na.prototype,`download`,void 0),z([y()],Na.prototype,`hreflang`,void 0),z([b(`a`)],Na.prototype,`anchor`,void 0)})))()}function Fa(){La=null}var Ia,La,Ra,za,Ba,Va,Ha;function Ua(){return(Ua=e((()=>{P(),Qt(),R(),Dn(),j(),O(),er(),p(),m(),c(),f(),Ia=`(prefers-color-scheme: dark)`,La=null,Ra=()=>typeof window<`u`&&window.matchMedia?.(Ia).matches?`dark`:`light`,za=(e,t)=>{typeof document<`u`&&(document.cookie=t===null?`${e}=; path=/; max-age=0; SameSite=Lax`:ie(e,t))},Ba=class extends F{constructor(...e){super(...e),this.persist=!1,this.locale=new D(this),this.observer=null,this.media=null,this.onScheme=()=>this.onSystemChange()}static{this.styles=[N,C`
:host{
display: inline-flex;
vertical-align: middle;
}
`,L(mn)]}get config(){return yt(this,`minerva-config`)}onSystemChange(){this.requestUpdate()}connectedCallback(){if(super.connectedCallback(),typeof MutationObserver<`u`){this.observer=new MutationObserver(()=>this.requestUpdate());let e=this.config;this.observer.observe(e??document.documentElement,{attributes:!0,attributeFilter:e?[`theme`,`palette`,`data-theme`]:[`data-theme`,`data-palette`]})}typeof window<`u`&&window.matchMedia&&(this.media=window.matchMedia(Ia),this.media.addEventListener?.(`change`,this.onScheme))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.observer=null,this.media?.removeEventListener?.(`change`,this.onScheme),this.media=null}renderGroup(e,t,n){return _`<div part="root" class="group" role="group" aria-label=${e}>
${t.map(e=>_`<button
type="button"
part=${hn(`item`,{state:e.active?`active`:`inactive`})}
class="item"
data-state=${e.active?`active`:`inactive`}
aria-pressed=${e.active?`true`:`false`}
@click=${()=>n(e.value)}
>
${e.text}
</button>`)}
</div>`}},z([y({type:Boolean,reflect:!0})],Ba.prototype,`persist`,void 0),Va=class extends Ba{constructor(...e){super(...e),this.hideSystem=!1,this.select=e=>{e!==this.theme&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-theme-toggle`}get theme(){let e=this.config;if(e){let t=e.theme;return t===`github-dark`?`dark`:Ge(t)?t:null}if(La)return La;let t=this.persist?je(document.cookie,i):void 0;if(Ge(t))return t;let n=document.documentElement.getAttribute(`data-theme`);return Ge(n)?n:`system`}get resolvedTheme(){let e=this.config;if(e)return e.resolvedMode??Ra();let t=this.theme;return t===`light`||t===`dark`?t:Ra()}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist&&!La){let e=je(document.cookie,i);Ge(e)&&this.apply(e,!1)}}onSystemChange(){!this.config&&La===`system`&&this.apply(`system`,!1),super.onSystemChange()}apply(e,t=this.persist){let n=this.config;if(n){n.theme=e;return}La=e;let r=document.documentElement,i=e===`system`?Ra():e;r.setAttribute(`data-theme`,i),r.style.colorScheme=i,t&&za(`theme`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.theme,n=this.hideSystem?[`light`,`dark`]:[`light`,`dark`,`system`];return this.renderGroup(e(`themeToggle.label`,{theme:this.resolvedTheme}),n.map(n=>({value:n,text:this.labels?.[n]??e(`themeToggle.${n}`),active:t===n})),this.select)}},z([y({type:Boolean,reflect:!0,attribute:`hide-system`})],Va.prototype,`hideSystem`,void 0),z([y({attribute:!1})],Va.prototype,`labels`,void 0),Ha=class e extends Ba{constructor(...e){super(...e),this.palettes=[...ke],this.showDefault=!1,this.select=e=>{e!==this.palette&&this.emit(`minerva-change`,{value:e},{cancelable:!0})&&this.apply(e)}}static{this.tagName=`minerva-palette-toggle`}get palette(){let e=this.config,t=e?e.palette:document.documentElement.getAttribute(`data-palette`);return me(t)?t:null}connectedCallback(){if(super.connectedCallback(),!this.config&&this.persist){let e=je(document.cookie,Re);me(e)&&!this.palette&&this.apply(e,!1)}}willUpdate(){if(k){let t=(this.palettes??[]).filter(e=>!me(e));t.length&&I(e.tagName,`unknown palette(s) ${t.join(`, `)}: use ${ke.join(`, `)}.`)}}apply(e,t=this.persist){let n=this.config;if(n){n.palette=e??void 0;return}let r=document.documentElement;e?r.setAttribute(`data-palette`,e):r.removeAttribute(`data-palette`),t&&za(`palette`,e),this.requestUpdate()}render(){let e=this.locale.t,t=this.palette,n=this.showDefault?[null,...this.palettes.filter(me)]:this.palettes.filter(me);return this.renderGroup(e(`paletteToggle.label`,{palette:t??e(`paletteToggle.default`)}),n.map(n=>{let r=n??`default`;return{value:n,text:this.labels?.[r]??e(`paletteToggle.${r}`),active:t===n}}),this.select)}},z([y({converter:{fromAttribute:e=>(e??``).split(/[\s,]+/).filter(Boolean),toAttribute:e=>e.join(` `)}})],Ha.prototype,`palettes`,void 0),z([y({type:Boolean,reflect:!0,attribute:`show-default`})],Ha.prototype,`showDefault`,void 0),z([y({attribute:!1})],Ha.prototype,`labels`,void 0)})))()}var Wa,X;function Ga(){return(Ga=e((()=>{M(),P(),T(),R(),Dn(),j(),O(),An(),Nr(),$n(),wn(),En(),zn(),p(),m(),v(),c(),f(),$e(),Wa=(e,t,n=0,r=()=>!1)=>{let i=[];for(let a=n;a<n+e;a+=Math.max(1,t))i.push({value:a,disabled:r(a),label:String(a).padStart(2,`0`)});return i},X=class e extends A{constructor(...e){super(...e),this.name=`time-picker`,this.value=``,this.defaultValue=``,this.open=!1,this.format=`HH:mm:ss`,this.use12Hours=!1,this.size=`medium`,this.invalid=!1,this.readOnly=!1,this.hideClearButton=!1,this.hideSecond=!1,this.hourStep=1,this.minuteStep=1,this.secondStep=1,this.draft=null,this.locale=new D(this),this.aria=new w(this,()=>this.labels),this.floating=new Tr(this,()=>({anchor:()=>this.input,floating:()=>this.popup,placement:`bottom-start`,branches:()=>[this.field],onDismiss:()=>this.requestOpenChange(!1),returnFocusOnEscape:()=>this.input,focusable:!0,onPosition:()=>this.syncHookStates()})),this.dirty=!1,this.focusPanelOnOpen=!1}static{this.tagName=`minerva-time-picker`}static{this.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0}}static{this.styles=[N,br,C`
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
`,L(Rn),L(Bn),L(kn),L(Wn)]}get valueAsDate(){return Le(this.value)}focus(e){this.input?.focus(e)}blur(){this.input?.blur()}show(){this.open=!0}hide(){this.open=!1}get effectiveFormat(){return Oe(this.format,!this.hideSecond)}get withSeconds(){return te(this.effectiveFormat)}get interactive(){return!this.isDisabled&&!this.readOnly}getFormValue(){let e=this.valueAsDate;return e?re(e,this.withSeconds):``}getValidity(){return this.required&&!this.valueAsDate?{flags:{valueMissing:!0},message:this.locale.t(`validation.valueMissing`),anchor:this.input}:{flags:{},message:``}}resetFormValue(){this.dirty=!1,this.draft=null,this.value=this.defaultValue}restoreFormState(e){typeof e==`string`&&(this.value=e)}willUpdate(e){e.has(`value`)&&e.get(`value`)!==void 0&&(this.dirty=this.value!==this.defaultValue||this.dirty),e.has(`defaultValue`)&&!this.dirty&&(this.hasUpdated||this.hasAttribute(`value`))&&(this.value=this.defaultValue),k&&this.checkUsage(e)}checkUsage(t){let n=e.tagName;if(t.has(`value`)&&this.value&&!Le(this.value)&&I(n,`value "${this.value}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`),t.has(`minTime`)||t.has(`maxTime`)){for(let[e,t]of[[`min-time`,this.minTime],[`max-time`,this.maxTime]])t&&!Le(t)&&I(n,`${e} "${t}" is not a valid time: use 24-hour "HH:mm" or "HH:mm:ss".`);let e=Le(this.minTime),t=Le(this.maxTime);e&&t&&ge(e)>ge(t)&&I(n,`min-time (${this.minTime}) is later than max-time (${this.maxTime}): no time can be selected.`)}}updated(e){super.updated(e);let t=this.open&&this.interactive;if(this.floating.sync(t),!t){this.focusPanelOnOpen=!1;return}(e.has(`open`)||e.has(`disabled`))&&(this.popup?.querySelectorAll(`[aria-selected="true"]`).forEach(e=>e.scrollIntoView?.({block:`nearest`})),this.focusPanelOnOpen&&this.focusFirstColumn())}focusFirstColumn(){this.popup?.querySelector(`[role="option"][tabindex="0"]`)?.focus()}requestOpenChange(e){if(e===this.open)return!0;let t=this.emit(`minerva-open-change`,{open:e},{cancelable:!0});return t&&(this.open=e),t}commit(e){this.value=e?re(e,this.withSeconds):``,this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.value})}handleTimeChange(e,t){let n=new Date(this.valueAsDate??ve());if(e===`hour`)n.setHours(t);else if(e===`minute`)n.setMinutes(t);else if(e===`second`)n.setSeconds(t);else{let e=n.getHours()%12;n.setHours(t===1?e+12:e)}this.draft=null,this.commit(n)}handleInput(e){let t=e.target.value;this.draft=t,this.emit(`minerva-input`,{value:t});let n=Fe(t,this.effectiveFormat,{strict:!0,base:this.valueAsDate??void 0});n&&this.commit(n)}handleBlur(){let e=this.draft;if(e===null)return;let t=this.valueAsDate;if(e.trim()===``)t&&this.commit(null);else{let n=Fe(e,this.effectiveFormat,{strict:!1,base:t??void 0});n&&n.getTime()!==t?.getTime()&&this.commit(n)}this.draft=null}handleClear(){this.draft=null,this.commit(null),this.emit(`minerva-clear`),this.input?.focus()}handleInputClick(){this.interactive&&(this.focusPanelOnOpen=!1,this.requestOpenChange(!this.open))}handleInputKeyDown(e){e.key===`ArrowDown`&&(e.preventDefault(),this.interactive&&(this.open?this.focusFirstColumn():(this.focusPanelOnOpen=!0,this.requestOpenChange(!0)||(this.focusPanelOnOpen=!1))))}handlePanelKeyDown(e){let t=e.currentTarget,n=this.input;if(!n||e.key!==`Tab`||e.altKey||e.ctrlKey||e.metaKey)return;let r=this.shadowRoot?.activeElement??null;if(!r||!t.contains(r))return;let i=Be(t);(i.length===0||(e.shiftKey?r===t||r===i[0]:r===i[i.length-1]))&&(e.preventDefault(),(e.shiftKey?n:this.shadowRoot?.querySelector(`.clearButton`)??this.tabbableAfter()??n).focus(),this.requestOpenChange(!1))}tabbableAfter(){let e=Be(this.ownerDocument.body),t=-1;return e.forEach((e,n)=>{u(this,e)&&(t=n)}),t===-1?e.find(e=>!!(this.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))??null:e.slice(t+1).find(e=>!u(this,e))??null}handleColumnKeyDown(e,t){let n=e.currentTarget,r=e.target,i=Array.from(n.querySelectorAll(`[role="option"]`)).filter(e=>e.getAttribute(`aria-disabled`)!==`true`),a=i.indexOf(r),o=this.popup?.querySelectorAll(`[role="listbox"]`),s=o?.length??0,c=e=>o?.[e]?.querySelector(`[tabindex="0"]`)?.focus();switch(Je(e.key,this)){case`ArrowDown`:e.preventDefault(),i[Math.min(i.length-1,a+1)]?.focus();break;case`ArrowUp`:e.preventDefault(),i[Math.max(0,a-1)]?.focus();break;case`Home`:e.preventDefault(),i[0]?.focus();break;case`End`:e.preventDefault(),i[i.length-1]?.focus();break;case`ArrowRight`:e.preventDefault(),c(Math.min(s-1,t+1));break;case`ArrowLeft`:e.preventDefault(),c(Math.max(0,t-1))}}pick(e,t){t.disabled||this.handleTimeChange(e.kind,e.toValue(t.value))}columns(e){let{t}=this.locale,n=this.use12Hours,r=Le(this.minTime),i=Le(this.maxTime),a=e.getHours(),o=e.getMinutes(),s=e.getSeconds(),c=a>=12,ee=e=>n?e%12+(c?12:0):e,l=Wa(n?12:24,this.hourStep,+!!n,e=>{let t=ee(e);return!!(r&&t<r.getHours()||i&&t>i.getHours())}),te=Wa(60,this.minuteStep,0,e=>!!(r&&a===r.getHours()&&e<r.getMinutes()||i&&a===i.getHours()&&e>i.getMinutes())),u=Wa(60,this.secondStep,0,e=>{let t=r&&a===r.getHours()&&o===r.getMinutes(),n=i&&a===i.getHours()&&o===i.getMinutes();return!!(t&&e<r.getSeconds()||n&&e>i.getSeconds())}),d=[{kind:`hour`,label:t(`timePicker.hours`),items:l,selected:n?a%12||12:a,toValue:ee},{kind:`minute`,label:t(`timePicker.minutes`),items:te,selected:o,toValue:e=>e}];return this.withSeconds&&d.push({kind:`second`,label:t(`timePicker.seconds`),items:u,selected:s,toValue:e=>e}),n&&d.push({kind:`ampm`,label:t(`timePicker.period`),items:[{value:0,label:`AM`,disabled:!1},{value:1,label:`PM`,disabled:!1}],selected:+!!c,toValue:e=>e}),d}renderPanel(e,t){let n=e!==null,r=this.columns(e??ve());return _`<div
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
${r.map((e,t)=>{let r=e.items.find(e=>!e.disabled)?.value,i=e.items.some(t=>t.value===e.selected&&!t.disabled)?e.selected:r;return _`<div
part="column"
class="timeColumn"
role="listbox"
aria-label=${e.label}
tabindex="-1"
data-kind=${e.kind}
@keydown=${e=>this.handleColumnKeyDown(e,t)}
>
${e.items.map(t=>{let r=n&&t.value===e.selected;return _`<div
part=${hn(`item`,{selected:r,disabled:t.disabled})}
role="option"
aria-selected=${r?`true`:`false`}
aria-disabled=${t.disabled?`true`:g}
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
</div>`}hookStates(){let e=this.open&&!this.isDisabled&&!this.readOnly,t=e&&this.floating.isOpen?this.floating.position.placement:void 0,{side:n,align:r}=t?Ae(t):{side:void 0,align:void 0};return{state:e?`open`:`closed`,disabled:this.isDisabled,readonly:this.readOnly,invalid:this.invalid,size:this.size,side:n,align:r,placement:t}}render(){let{t:e}=this.locale,t=this.isDisabled,n=this.readOnly,r=this.valueAsDate,i=this.label||this.aria.label||e(`timePicker.label`),a=this.draft??(r?Ne(r,this.effectiveFormat):``),o=!this.hideClearButton&&!!r&&!t&&!n;return _`<div part="root" class="timePicker">
<div
part="control"
class=${x({root:!0,outline:!0,[this.size]:!0,invalid:this.invalid,disabled:t})}
data-component="input"
>
<input
part="input"
class="field"
.value=${Qe(a)}
placeholder=${this.placeholder??e(`timePicker.placeholder`)}
?disabled=${t}
?readonly=${n}
?required=${this.required}
autocomplete="off"
aria-label=${i}
aria-description=${this.aria.description??g}
aria-invalid=${this.invalid||this.aria.attr(`aria-invalid`)===`true`?`true`:g}
aria-readonly=${n?`true`:g}
@input=${this.handleInput}
@blur=${this.handleBlur}
@click=${this.handleInputClick}
@keydown=${this.handleInputKeyDown}
/>
<span class="addon end">
${o?_`<button
part="clear-button"
type="button"
class="iconButton neutral variant-ghost small circle clearButton"
aria-label=${e(`timePicker.clear`)}
@click=${this.handleClear}
>
${Gt}
</button>`:_`<span part="icon" class="clockIcon" aria-hidden="true"
>${Jn}</span
>`}
</span>
</div>
</div>
${this.open&&!t&&!n?this.renderPanel(r,i):g}`}},z([y({reflect:!0})],X.prototype,`name`,void 0),z([y({attribute:!1})],X.prototype,`value`,void 0),z([y({attribute:`value`})],X.prototype,`defaultValue`,void 0),z([y({type:Boolean,reflect:!0})],X.prototype,`open`,void 0),z([y({reflect:!0})],X.prototype,`format`,void 0),z([y({type:Boolean,reflect:!0,attribute:`use-12-hours`})],X.prototype,`use12Hours`,void 0),z([y()],X.prototype,`placeholder`,void 0),z([y()],X.prototype,`label`,void 0),z([y({reflect:!0})],X.prototype,`size`,void 0),z([y({type:Boolean,reflect:!0})],X.prototype,`invalid`,void 0),z([y({type:Boolean,reflect:!0,attribute:`readonly`})],X.prototype,`readOnly`,void 0),z([y({type:Boolean,reflect:!0,attribute:`hide-clear-button`})],X.prototype,`hideClearButton`,void 0),z([y({type:Boolean,reflect:!0,attribute:`hide-second`})],X.prototype,`hideSecond`,void 0),z([y({attribute:`min-time`})],X.prototype,`minTime`,void 0),z([y({attribute:`max-time`})],X.prototype,`maxTime`,void 0),z([y({type:Number,attribute:`hour-step`})],X.prototype,`hourStep`,void 0),z([y({type:Number,attribute:`minute-step`})],X.prototype,`minuteStep`,void 0),z([y({type:Number,attribute:`second-step`})],X.prototype,`secondStep`,void 0),z([h()],X.prototype,`draft`,void 0),z([b(`input`)],X.prototype,`input`,void 0),z([b(`.timePicker`)],X.prototype,`field`,void 0),z([b(`.popup`)],X.prototype,`popup`,void 0)})))()}function Ka(e){if(e===void 0)return;if(typeof e!=`string`)return e;if(!Xa())return;let t=document.getElementById(e)??void 0;return k&&!t&&I(`minerva-toast-region`,`toast(): no element with id "${e}"; the toast is shown in the default region.`),t}var qa,Ja,Ya,Xa,Za,Qa,$a,eo,to,no;function ro(){return(ro=e((()=>{P(),f(),qa=4e3,Ja=200,Ya=`minerva-toast-region`,Xa=()=>typeof window<`u`&&typeof document<`u`,Za=class{constructor(e={}){this.subscribe=e=>this.queue.subscribe(t=>e(t.toasts)),this.subscribeLifecycle=e=>this.queue.subscribeLifecycle(e),this.getSnapshot=()=>this.queue.getState().toasts,this.queue=oe({isClient:e.isClient??Xa,defaultDuration:qa,exitDuration:200})}push(e,t){return this.queue.add(e,{region:t})}update(e,t){this.queue.update(e,t)}dismiss(e,t=`dismiss`){this.queue.dismiss(e,t)}dismissAll(){this.queue.dismissAll()}pause(e){this.queue.pause(e)}resume(e){this.queue.resume(e)}peek(){return this.getSnapshot()}reset(){this.queue.reset()}},Qa=new Za,$a=`data-minerva-auto`,eo=new class{constructor(){this.regions=[],this.listeners=new Set,this.autoPending=!1,this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)})}changed(){for(let e of[...this.listeners])e()}ordered(){return this.regions.slice().sort((e,t)=>{let n=e.compareDocumentPosition(t);return n&Node.DOCUMENT_POSITION_DISCONNECTED?0:n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}get owner(){return this.ordered()[0]??null}register(e){if(!this.regions.includes(e)){if(this.regions.push(e),!e.hasAttribute(`data-minerva-auto`))for(let e of this.regions.filter(e=>e.hasAttribute($a)))e.remove();this.changed()}}unregister(e){let t=this.regions.indexOf(e);t<0||(this.regions.splice(t,1),this.changed())}regionOf(e){let t=e.region;return t&&this.regions.includes(t)?t:this.owner}ensureRegion(){this.autoPending||this.regions.length>0||!Xa()||(this.autoPending=!0,queueMicrotask(()=>{if(this.autoPending=!1,this.regions.length>0||!document.body||!Qa.getSnapshot().length)return;let e=document.createElement(`minerva-toast-region`);e.setAttribute(`data-minerva-auto`,``),document.body.append(e)}))}},to=(e,t)=>{let n=n=>{k&&!Xa()&&I(`minerva-toast-region`,`toast() called without a document (server side): the toast is ignored.`);let{region:r,...i}=n,a=Ka(r??t),o=e.push(i,a);return Xa()&&eo.ensureRegion(),o},r=(e=>n(e));return r.info=(e,t)=>n({...t,title:e,color:`info`}),r.success=(e,t)=>n({...t,title:e,color:`success`}),r.warning=(e,t)=>n({...t,title:e,color:`warning`}),r.danger=(e,t)=>n({...t,title:e,color:`danger`}),r.loading=(e,t)=>n({...t,title:e,loading:!0}),r.promise=(e,t,r)=>{let i=n({...r,title:t.loading,loading:!0,duration:0}),a=(e,t)=>n({...r,id:i,title:t,color:e,loading:!1});return e.then(e=>a(`success`,typeof t.success==`function`?t.success(e):t.success),e=>a(`danger`,typeof t.error==`function`?t.error(e):t.error)),e},r.update=(t,n)=>{let{region:r,...i}=n;e.update(t,i)},r.dismiss=t=>t===void 0?e.dismissAll():e.dismiss(t),r.region=t=>to(e,t),r},no=to(Qa)})))()}var io,ao,oo,so,co,lo,uo,fo,po;function mo(){return(mo=e((()=>{M(),P(),T(),Qt(),R(),Dn(),j(),O(),Nr(),Qn(),ro(),p(),m(),v(),Xe(),c(),f(),et(),io={info:Ot,success:Zn,warning:Yn,danger:Mn},ao=[`top-right`,`top-left`,`top-center`,`bottom-right`,`bottom-left`,`bottom-center`],oo=[`F8`],so=`:scope > [part~="toast--open"]`,co=`:scope > [part~="close-button"]`,lo={fromAttribute:e=>e===null?oo:e.split(/[\s,+]+/).map(e=>e.trim()).filter(Boolean)},uo=0,fo=e=>{for(let t of eo.ordered())if(t instanceof po&&t.handleHotkey(e))return},po=class extends F{constructor(...e){super(...e),this.position=`top-right`,this.max=1/0,this.noPauseOnHover=!1,this.hotkey=oo,this.items=[],this.locale=new D(this),this.aria=new w(this),this.cleanups=[],this.returnFocus=null,this.refresh=()=>{if(!this.isConnected)return;let e=new Set,t=[],n=Qa.getSnapshot();for(let r=n.length-1;r>=0;--r){let i=n[r];e.has(i.id)||eo.regionOf(i)!==this||(e.add(i.id),t.unshift(i))}let r=Te(t,this.max);if(r.length>0){for(let e of r)Qa.dismiss(e.id,`overflow`);return}let i=new Set(this.items.map(e=>e.id)),a=t.some(e=>!i.has(e.id));this.items=t,a&&this.raise()},this.raise=()=>{let e=this.viewport;e&&!u(e,t())&&(gt(e),ir(e))},this.onLifecycle=e=>{eo.regionOf(e.item)===this&&(e.type===`close`?this.emit(`minerva-close`,{id:e.item.id,reason:e.reason}):this.emit(`minerva-after-close`,{id:e.item.id}))},this.onViewportFocusIn=e=>{let t=e.relatedTarget,n=e.currentTarget;t&&!u(n,t)&&(this.returnFocus=t)},this.onViewportFocusOut=e=>{let t=e.currentTarget;u(t,e.relatedTarget)||t.removeAttribute(`tabindex`)}}static{this.tagName=Ya}static{this.styles=[N,br,C`
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
`,L(Ln)]}get toast(){return this.boundApi??=to(Qa,this),this.boundApi}connectedCallback(){super.connectedCallback(),this.cleanups=[Qa.subscribe(()=>this.refresh()),eo.subscribe(()=>this.refresh()),Qa.subscribeLifecycle(this.onLifecycle)];let e=this.ownerDocument;e.addEventListener(`minerva-after-open`,this.raise),this.cleanups.push(()=>e.removeEventListener(`minerva-after-open`,this.raise)),uo++===0&&e.addEventListener(`keydown`,fo),this.cleanups.push(()=>{--uo===0&&e.removeEventListener(`keydown`,fo)}),eo.register(this),this.refresh(),this.hasUpdated&&ir(this.viewport)}disconnectedCallback(){super.disconnectedCallback();for(let e of this.cleanups)e();this.cleanups=[],eo.unregister(this),gt(this.viewport)}handleHotkey(e){let n=this.viewport;if(!n||!Ve(e,this.hotkey)||!n.querySelector(so))return!1;e.preventDefault();let r=t();return r&&r!==this.ownerDocument.body&&!u(n,r)&&(this.returnFocus=r),n.setAttribute(`tabindex`,`-1`),Ee(n),!0}focus(e){let t=this.viewport;t&&(t.setAttribute(`tabindex`,`-1`),t.focus(e))}willUpdate(e){k&&e.has(`position`)&&!ao.includes(this.position)&&I(`minerva-toast-region`,`invalid position "${this.position}" (expected ${ao.join(` | `)}).`)}firstUpdated(){ir(this.viewport)}updated(e){e.has(`max`)&&e.get(`max`)!==void 0&&queueMicrotask(()=>this.refresh())}moveFocusFrom(e){let t=this.viewport;if(!t)return;let n=Array.from(t.querySelectorAll(so)).filter(t=>t!==e),r=n.find(t=>e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING)??n[n.length-1];if(r){let e=r.querySelector(co)??Be(r)[0];if(Ee(e))return}let i=this.returnFocus;i?.isConnected&&!u(t,i)&&Ee(i)||Ee(Ke(this))||(t.setAttribute(`tabindex`,`-1`),Ee(t,{preventScroll:!0}))}close(e,n,r){u(n,t())&&this.moveFocusFrom(n),Qa.dismiss(e.id,r)}pause(e){this.noPauseOnHover||Qa.pause(e.id)}resume(e){this.noPauseOnHover||Qa.resume(e.id)}renderIcon(e){if(e.icon===null)return g;let t=e.icon===void 0?e.loading?_`<div class="progressIndicator current" aria-hidden="true">
<span class="spinner small">${Bt}</span>
</div>`:io[e.color]:e.icon;return _`<span class="icon" part="icon" aria-hidden="true"
>${t}</span
>`}renderItem(e){let t=e.state===`closing`,n=e=>e.currentTarget.closest(`.toast`),r={state:t?`closed`:`open`,color:e.color,loading:e.loading};return _`<div
part=${hn(`toast`,r)}
class=${x({toast:!0,[e.color]:!0})}
data-state=${r.state}
role=${e.color===`danger`&&!e.loading?`alert`:`status`}
style=${S(e.duration>0?{"--toast-duration":`${e.duration}ms`}:{})}
@mouseenter=${()=>this.pause(e)}
@mouseleave=${()=>this.resume(e)}
@focusin=${()=>this.pause(e)}
@focusout=${t=>{u(n(t),t.relatedTarget)||this.resume(e)}}
@keydown=${r=>{r.key!==`Escape`||t||r.isComposing||(r.preventDefault(),r.stopPropagation(),this.close(e,n(r),`escape`))}}
>
${this.renderIcon(e)}
<div class="content">
${e.title?_`<div class="title" part="title">${e.title}</div>`:g}
${e.description?_`<div class="description" part="description">
${e.description}
</div>`:g}
</div>
${e.action?_`<button
type="button"
class="action"
part="action"
@click=${t=>{e.action?.onClick(),this.close(e,n(t),`action`)}}
>
${e.action.label}
</button>`:g}
${e.closable?_`<button
type="button"
class="close"
part="close-button"
aria-label=${this.closeLabel??this.locale.t(`toast.close`)}
@click=${t=>this.close(e,n(t),`close-button`)}
>
${Gt}
</button>`:g}
${e.duration>0&&!t?_`<span
class="progress"
part="progress"
aria-hidden="true"
></span>`:g}
</div>`}render(){let e=Ie(this.hotkey),t=this.aria.label??(e?this.locale.t(`toast.regionWithHotkey`,{hotkey:e}):this.locale.t(`toast.region`)),n=ao.includes(this.position)?this.position:`top-right`;return _`<div
part="root"
class=${x({viewport:!0,[n]:!0})}
popover="manual"
role="region"
aria-label=${t}
dir=${l(this)}
@focusin=${this.onViewportFocusIn}
@focusout=${this.onViewportFocusOut}
>
${Ze(this.items,e=>e.id,e=>this.renderItem(e))}
</div>`}},z([y({reflect:!0})],po.prototype,`position`,void 0),z([y({type:Number})],po.prototype,`max`,void 0),z([y({type:Boolean,attribute:`no-pause-on-hover`})],po.prototype,`noPauseOnHover`,void 0),z([y({attribute:`close-label`})],po.prototype,`closeLabel`,void 0),z([y({attribute:`hotkey`,converter:lo})],po.prototype,`hotkey`,void 0),z([h()],po.prototype,`items`,void 0),z([b(`.viewport`)],po.prototype,`viewport`,void 0)})))()}var ho,go,_o,vo,yo,bo,Z;function xo(){return(xo=e((()=>{M(),P(),Qt(),j(),O(),Nr(),On(),p(),m(),v(),c(),ho=6,go=300,_o=200,vo=0,yo={fromAttribute(e){if(!e)return;let t=e.trim().split(/[\s,]+/).map(Number);return t.length===2&&t.every(Number.isFinite)?[t[0],t[1]]:void 0},toAttribute(e){return e?e.join(` `):null}},bo=class extends F{constructor(...e){super(...e),this.skipDelay=300,this.lastClosedAt=0}static{this.tagName=`minerva-tooltip-provider`}static{this.styles=[N,C`
:host{
display: contents;
}
`]}markClosed(){this.lastClosedAt=Date.now()}shouldSkipDelay(){return Date.now()-this.lastClosedAt<this.skipDelay}render(){return _`<slot></slot>`}},z([y({type:Number,attribute:`enter-delay`})],bo.prototype,`enterDelay`,void 0),z([y({type:Number,attribute:`leave-delay`})],bo.prototype,`leaveDelay`,void 0),z([y({type:Number,attribute:`skip-delay`})],bo.prototype,`skipDelay`,void 0),Z=class e extends F{constructor(...e){super(...e),this.content=``,this.open=!1,this.placement=`top`,this.color=`neutral`,this.variant=`solid`,this.shape=`default`,this.animation=`fade`,this.arrow=!1,this.disabled=!1,this.followCursor=!1,this.positioned=!1,this.aria=new w(this),this.grace=we({timeout:0}),this.cursor=null,this.described=null,this.describedPrev=null,this.floating=new Tr(this,()=>{let e=this.placement,t=e.startsWith(`top`)||e.startsWith(`bottom`),n=this.arrow?ho:0,r=this.offset;return{placement:e,offset:r?{mainAxis:(t?r[1]:r[0])+n,crossAxis:t?r[0]:r[1]}:{mainAxis:8+n},arrowElement:this.arrow?this.arrowEl:null,autoUpdate:this.followCursor?{animationFrame:!0}:void 0,anchor:()=>this.anchor(),floating:()=>this.panel,branches:()=>[this.wrapper],dismissOnPointerDownOutside:!1,dismissOnFocusOutside:!1,focusable:!1,onDismiss:()=>{this.clearTimers(),this.requestOpen(!1)},onPosition:e=>this.handlePosition(e)}}),this.handleMouseEnter=e=>{if(this.disabled)return;this.followCursor&&(this.cursor={x:e.clientX,y:e.clientY}),this.clearTimers();let t=this.resolvedEnterDelay;if(t<=0||this.provider()?.shouldSkipDelay()){this.requestOpen(!0);return}this.enterTimer=setTimeout(()=>this.requestOpen(!0),t)},this.handleMouseLeave=e=>{if(this.disabled)return;this.clearTimers();let t=this.panel?.getBoundingClientRect();if(this.open&&!this.followCursor&&t&&t.width>0&&t.height>0){this.grace.start({x:e.clientX,y:e.clientY},t,Ae(this.currentPlacement).side),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),Math.max(this.resolvedLeaveDelay,go));return}this.scheduleHide()},this.handlePanelMouseEnter=()=>{this.disabled||this.clearTimers()},this.handlePanelMouseLeave=()=>{this.disabled||this.followCursor||this.scheduleHide()},this.handleDocumentPointerMove=e=>{if(!this.grace.getArea())return;let t=e.composedPath();this.wrapper&&t.includes(this.wrapper)||this.panel&&t.includes(this.panel)||this.grace.isInGraceArea({x:e.clientX,y:e.clientY})||(this.grace.clear(),this.scheduleHide())},this.handleDocumentMouseMove=e=>{this.cursor={x:e.clientX,y:e.clientY}},this.handleFocusIn=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!0))},this.handleFocusOut=e=>{this.disabled||this.inPanel(e)||(this.clearTimers(),this.requestOpen(!1))},this.listening=!1,this.handleSlotChange=()=>this.requestUpdate()}static{this.tagName=`minerva-tooltip`}static{this.styles=[N,br,C`
:host{
display: inline-flex;
}
`,L(jn)]}show(){this.open=!0}hide(){this.open=!1}toggle(){this.open=!this.open}get currentPlacement(){return this.positioned?this.floating.position.placement:this.placement}get visible(){return this.open&&!this.disabled}provider(){let e=yt(this,`minerva-tooltip-provider`);return e instanceof bo?e:null}get resolvedEnterDelay(){return this.enterDelay??this.provider()?.enterDelay??_o}get resolvedLeaveDelay(){return this.leaveDelay??this.provider()?.leaveDelay??vo}triggerElement(){return Array.from(this.children).find(e=>!e.hasAttribute(`slot`))??null}get text(){return this.aria.label||(this.content.trim()?this.content.trim():Array.from(this.children).filter(e=>e.getAttribute(`slot`)===`content`).map(e=>e.textContent?.trim()??``).filter(Boolean).join(` `))}anchor(){return this.followCursor&&this.cursor?{getBoundingClientRect:()=>{let{x:e,y:t}=this.cursor??{x:0,y:0};return DOMRect.fromRect({x:e,y:t,width:0,height:0})}}:this.wrapper}requestOpen(e){e!==this.open&&(e||this.provider()?.markClosed(),this.emit(`minerva-open-change`,{open:e},{cancelable:!0})&&(this.open=e))}clearTimers(){clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.grace.clear()}scheduleHide(){clearTimeout(this.leaveTimer),this.leaveTimer=setTimeout(()=>this.requestOpen(!1),this.resolvedLeaveDelay)}handlePosition(e){let t=this.arrowEl;t&&(t.style.left=e.arrow.x==null?``:`${e.arrow.x}px`,t.style.top=e.arrow.y==null?``:`${e.arrow.y}px`),this.positioned||=!0}inPanel(e){return!!this.panel&&e.composedPath().includes(this.panel)}connectedCallback(){super.connectedCallback(),this.addEventListener(`focusin`,this.handleFocusIn),this.addEventListener(`focusout`,this.handleFocusOut)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`focusin`,this.handleFocusIn),this.removeEventListener(`focusout`,this.handleFocusOut),this.listenDocument(!1),clearTimeout(this.enterTimer),clearTimeout(this.leaveTimer),this.restoreDescription()}listenDocument(e){e!==this.listening&&(this.listening=e,e?(document.addEventListener(`pointermove`,this.handleDocumentPointerMove),document.addEventListener(`mousemove`,this.handleDocumentMouseMove)):(document.removeEventListener(`pointermove`,this.handleDocumentPointerMove),document.removeEventListener(`mousemove`,this.handleDocumentMouseMove)))}firstUpdated(){k&&setTimeout(()=>this.checkUsage())}checkUsage(){if(!this.isConnected)return;this.text||I(e.tagName,`has no content: set the "content" attribute, aria-label or slot="content".`);let t=this.triggerElement();!this.disabled&&t&&Be(t,{includeContainer:!0}).length===0&&I(e.tagName,`the trigger is not focusable, so keyboard users cannot reach the tooltip; wrap a button / link or add tabindex="0".`)}willUpdate(e){(e.has(`open`)||e.has(`disabled`))&&(!this.open||this.disabled)&&(this.positioned=!1,this.grace.clear())}updated(){let e=this.visible;this.floating.sync(e),this.listenDocument(e),this.syncDescription(e)}syncDescription(e){let t=e?this.text:``,n=t?this.triggerElement():null;if(this.described&&this.described!==n&&this.restoreDescription(),!n)return;this.described!==n&&(this.described=n,this.describedPrev=n.getAttribute(`aria-description`));let r=this.describedPrev?`${this.describedPrev} ${t}`:t;n.getAttribute(`aria-description`)!==r&&n.setAttribute(`aria-description`,r)}restoreDescription(){let e=this.described;e&&(this.describedPrev===null?e.removeAttribute(`aria-description`):e.setAttribute(`aria-description`,this.describedPrev),this.described=null,this.describedPrev=null)}hookStates(){let e=this.currentPlacement;return{state:this.visible?`open`:`closed`,disabled:this.disabled,color:this.color,variant:this.variant,shape:this.shape,...Ae(e),placement:e}}render(){let e=this.visible,t=this.currentPlacement,n=e&&!this.triggerElement();return _`<div
class="tooltipTrigger"
part="trigger"
aria-describedby=${n?`tooltip`:g}
@mouseenter=${this.handleMouseEnter}
@mouseleave=${this.handleMouseLeave}
>
<slot @slotchange=${this.handleSlotChange}></slot>
</div>
${e?_`<div
id="tooltip"
part="content"
popover="manual"
role="tooltip"
dir=${l(this)}
aria-label=${this.aria.label??g}
data-placement=${t}
class=${x({tooltip:!0,[this.color]:!0,[this.variant]:!0,[this.shape]:!0,[`animation-${this.animation}`]:!0,followCursor:this.followCursor,arrow:this.arrow,show:this.positioned})}
@mouseenter=${this.handlePanelMouseEnter}
@mouseleave=${this.handlePanelMouseLeave}
>
<slot name="content" @slotchange=${this.handleSlotChange}
>${this.content}</slot
>${this.arrow?_`<div class="tooltipArrow" part="arrow"></div>`:g}
</div>`:g}`}},z([y()],Z.prototype,`content`,void 0),z([y({type:Boolean,reflect:!0})],Z.prototype,`open`,void 0),z([y({reflect:!0})],Z.prototype,`placement`,void 0),z([y({reflect:!0})],Z.prototype,`color`,void 0),z([y({reflect:!0})],Z.prototype,`variant`,void 0),z([y({reflect:!0})],Z.prototype,`shape`,void 0),z([y({reflect:!0})],Z.prototype,`animation`,void 0),z([y({type:Boolean,reflect:!0})],Z.prototype,`arrow`,void 0),z([y({type:Boolean,reflect:!0})],Z.prototype,`disabled`,void 0),z([y({type:Number,attribute:`enter-delay`})],Z.prototype,`enterDelay`,void 0),z([y({type:Number,attribute:`leave-delay`})],Z.prototype,`leaveDelay`,void 0),z([y({converter:yo})],Z.prototype,`offset`,void 0),z([y({type:Boolean,reflect:!0,attribute:`follow-cursor`})],Z.prototype,`followCursor`,void 0),z([b(`.tooltipTrigger`)],Z.prototype,`wrapper`,void 0),z([b(`[part=content]`)],Z.prototype,`panel`,void 0),z([b(`.tooltipArrow`)],Z.prototype,`arrowEl`,void 0),z([h()],Z.prototype,`positioned`,void 0)})))()}var So,Q;function Co(){return(Co=e((()=>{M(),P(),T(),R(),Dn(),j(),O(),An(),wn(),pr(),bn(),p(),m(),v(),f(),et(),So=0,Q=class e extends A{constructor(...e){super(...e),this.label=``,this.items=[],this.accept=`*`,this.multiple=!1,this.replace=!1,this.loading=!1,this.removable=!1,this.retryable=!1,this.error=``,this.dragging=!1,this.uploadId=`upload-${So++}`,this.nextId=0,this.pendingRemoval=null,this.locale=new D(this),this.aria=new w(this,()=>this.labels)}static{this.tagName=`minerva-upload`}static{this.dependencies=[hr]}static{this.styles=[N,C`
:host{
display: block;
min-width: 0;
}
`,L(Bn),L(Xn),C`

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
`]}get files(){return this.items.flatMap(e=>e.file?[e.file]:[])}get resolvedMaxCount(){return this.maxCount??(this.multiple?50:1)}get existingCount(){return this.replace&&!this.multiple?0:this.items.length}get blocked(){return this.isDisabled||this.loading||this.existingCount>=this.resolvedMaxCount}focus(e){this.renderRoot.querySelector(`[part=select-button]`)?.focus(e)}showPicker(){this.blocked||this.input?.click()}getFormValue(){if(!this.name)return null;let e=new FormData;for(let t of this.files)e.append(this.name,t);return e}getValidity(){return this.required&&this.files.length===0?{flags:{valueMissing:!0},message:this.locale.t(`validation.fileMissing`),anchor:this.renderRoot.querySelector(`[part=select-button]`)??null}:{flags:{},message:``}}resetFormValue(){this.items=[],this.error=``}restoreFormState(e){e instanceof FormData&&(this.items=e.getAll(this.name).filter(e=>e instanceof File).map(e=>this.toItem(e)))}willUpdate(t){k&&(t.has(`maxCount`)||t.has(`multiple`))&&!this.multiple&&this.maxCount!==void 0&&this.maxCount>1&&I(e.tagName,`max-count (${this.maxCount}) has no effect without multiple: one file is picked at a time.`)}updated(e){super.updated(e);let t=this.pendingRemoval;if(!t||this.items.some(e=>e.id===t.id))return;this.pendingRemoval=null;let n=t.nextId?Array.from(this.renderRoot.querySelectorAll(`[data-item-id]`)).find(e=>e.dataset.itemId===t.nextId)?.querySelector(`[part=remove-button]`):null;n?n.focus():this.focus()}toItem(e){return{id:`${this.uploadId}-${this.nextId++}`,name:e.name,status:`done`,file:e}}select(e){if(this.blocked||e.length===0)return;let{t}=this.locale,n=this.texts,r=this.resolvedMaxCount;if(!this.multiple&&e.length>1||e.length+this.existingCount>r){this.error=n?.tooMany?.(r)??t(`upload.tooMany`,{count:r});return}let i=e.find(e=>!a(e,this.accept));if(i){this.error=n?.invalidType?.(i.name)??t(`upload.invalidType`,{name:i.name});return}let o=this.maxSize,s=o===void 0?void 0:e.find(e=>e.size>o);if(s){this.error=n?.tooLarge?.(s.name)??t(`upload.tooLarge`,{name:s.name});return}if(this.error=``,!this.emit(`minerva-files-selected`,{files:e},{cancelable:!0}))return;let c=e.map(e=>this.toItem(e));this.items=this.replace&&!this.multiple?c:[...this.items,...c],this.notifyChange()}notifyChange(){this.dispatchEvent(new Event(`change`,{bubbles:!0})),this.emit(`minerva-change`,{value:this.items})}removeItem(e){if(this.isDisabled)return;let t=this.items.indexOf(e),n=this.items[t+1]??this.items[t-1];this.pendingRemoval={id:e.id,nextId:n?.id},this.emit(`minerva-remove`,{item:e},{cancelable:!0})&&(this.items=this.items.filter(t=>t!==e),this.notifyChange())}retry(e){this.isDisabled||this.loading||this.emit(`minerva-retry`,{item:e})}handleInputChange(){let e=Array.from(this.input.files??[]);this.input.value=``,this.select(e)}handleDragOver(e){e.preventDefault(),this.blocked||(this.dragging=!0)}handleDragLeave(e){e.currentTarget.contains(e.relatedTarget)||(this.dragging=!1)}handleDrop(e){e.preventDefault(),this.dragging=!1,this.select(Array.from(e.dataTransfer?.files??[]))}statusText(e){let{t}=this.locale,n=this.texts;return e.status===`uploading`?n?.uploading??t(`upload.uploading`):e.status===`error`?e.error||(n?.failed??t(`upload.failed`)):n?.done??t(`upload.done`)}hookStates(){return{disabled:this.isDisabled,loading:this.loading,dragging:this.dragging&&!this.blocked}}render(){let{t:e}=this.locale,t=this.texts,n=this.blocked,r=this.isDisabled,i=this.label||this.aria.label;return _`<div
part="root"
class="upload"
role="group"
aria-labelledby=${this.label?`label`:g}
aria-label=${!this.label&&i?i:g}
aria-description=${this.aria.description??g}
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
<span slot="start">${Sn}</span>
${t?.select??e(`upload.select`)}
</minerva-button>
<input
type="file"
hidden
tabindex="-1"
aria-label=${i||g}
?disabled=${n}
accept=${this.accept}
?multiple=${this.multiple}
@change=${this.handleInputChange}
/>
</div>
${this.error?_`<div part="error" class="error" role="alert">
${this.error}
</div>`:g}
${this.items.length>0?_`<ul part="list" class="list">
${Ze(this.items,e=>e.id,n=>_`<li
part=${hn(`item`,{status:n.status})}
class="item"
data-item-id=${n.id}
>
${n.previewUrl?_`<img
src=${n.previewUrl}
alt=""
class="preview"
/>`:g}
<div class="info">
<span>${n.name}</span>
<span
role=${n.status===`error`?`alert`:`status`}
class=${x({status:!0,statusError:n.status===`error`})}
>${this.statusText(n)}</span
>
</div>
<div class="actions">
${n.status===`error`&&this.retryable?_`<button
part="retry-button"
type="button"
class=${x({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r||this.loading})}
aria-label=${t?.retry?.(n.name)??e(`upload.retry`,{name:n.name})}
?disabled=${r||this.loading}
@click=${()=>this.retry(n)}
>
${ur}
</button>`:g}
${this.removable?_`<button
part="remove-button"
type="button"
class=${x({iconButton:!0,neutral:!0,"variant-ghost":!0,small:!0,square:!0,disabled:r})}
aria-label=${t?.remove?.(n.name)??e(`upload.remove`,{name:n.name})}
?disabled=${r}
@click=${()=>this.removeItem(n)}
>
${Gt}
</button>`:g}
</div>
</li>`)}
</ul>`:g}
</div>`}},z([y()],Q.prototype,`label`,void 0),z([y({attribute:!1})],Q.prototype,`items`,void 0),z([y()],Q.prototype,`accept`,void 0),z([y({type:Boolean,reflect:!0})],Q.prototype,`multiple`,void 0),z([y({type:Boolean})],Q.prototype,`replace`,void 0),z([y({type:Number,attribute:`max-count`})],Q.prototype,`maxCount`,void 0),z([y({type:Number,attribute:`max-size`})],Q.prototype,`maxSize`,void 0),z([y({type:Boolean,reflect:!0})],Q.prototype,`loading`,void 0),z([y({type:Boolean})],Q.prototype,`removable`,void 0),z([y({type:Boolean})],Q.prototype,`retryable`,void 0),z([y({attribute:!1})],Q.prototype,`texts`,void 0),z([h()],Q.prototype,`error`,void 0),z([h()],Q.prototype,`dragging`,void 0),z([b(`input[type=file]`)],Q.prototype,`input`,void 0)})))()}var $;function wo(){return(wo=e((()=>{M(),P(),T(),R(),j(),O(),Un(),Hn(),p(),m(),v(),Xe(),f(),et(),$=class e extends F{constructor(...e){super(...e),this.items=[],this.itemPadding=8,this.overscan=5,this.loadMoreThreshold=100,this.highPerformance=!1,this.loading=!1,this.clickable=!1,this.scrollOffset=0,this.containerHeight=0,this.measuredHeight=0,this.focusedId=null,this.aria=new w(this),this.locale=new D(this),this.resizeObserver=null,this.measureObserver=null,this.lastScrollTop=0,this.loadingMore=!1}static{this.tagName=`minerva-virtual-list`}static{this.styles=[N,C`
:host{
display: block;
}
.wave{
display: inline-flex;
}
`,L(vn),L(gn)]}get scrollContainer(){return this.container??null}scrollToIndex(e){let t=this.container,n=this.rowHeight;t&&n&&(t.scrollTop=Math.max(0,e)*n,this.updateScroll(t.scrollTop))}get rowHeight(){return this.itemHeight?this.itemHeight:this.measuredHeight>0?this.measuredHeight+this.itemPadding*2:0}get needsMeasure(){return!this.itemHeight&&this.measuredHeight===0&&this.items.length>0}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.measureObserver?.disconnect(),this.measureObserver=null,this.cancelScheduled()}firstUpdated(){this.observeContainer()}reconnectedCallback(){super.reconnectedCallback(),this.observeContainer()}observeContainer(){let e=this.container;e&&(this.containerHeight=e.clientHeight,!(this.resizeObserver||typeof ResizeObserver>`u`)&&(this.resizeObserver=new ResizeObserver(e=>{for(let t of e)this.containerHeight=t.contentRect.height}),this.resizeObserver.observe(e)))}willUpdate(e){(e.has(`items`)||e.has(`loading`))&&(this.loadingMore=!1),this.focusedId!==null&&e.has(`items`)&&!this.items.some(e=>e.id===this.focusedId)&&(this.focusedId=null)}updated(){this.syncMeasure(),k&&this.items.length>0&&!this.renderItem&&I(e.tagName,`set the renderItem property (a function returning the content of a row); rows show the item id meanwhile.`),k&&this.maxHeight===void 0&&I(e.tagName,`set max-height (pixels): without a bounded height the list cannot scroll, so every row is rendered.`)}syncMeasure(){let e=this.needsMeasure?this.measureElement:void 0;if(!e){this.measureObserver?.disconnect(),this.measureObserver=null;return}let t=()=>{let t=e.offsetHeight;t>0&&(this.measuredHeight=t)};t(),!(this.measureObserver||typeof ResizeObserver>`u`)&&(this.measureObserver=new ResizeObserver(t),this.measureObserver.observe(e))}cancelScheduled(){this.raf!==void 0&&(cancelAnimationFrame(this.raf),this.raf=void 0),this.idle!==void 0&&(typeof cancelIdleCallback==`function`&&cancelIdleCallback(this.idle),this.idle=void 0)}schedule(e){if(!this.highPerformance){e();return}this.cancelScheduled(),this.raf=requestAnimationFrame(()=>{this.raf=void 0,typeof requestIdleCallback==`function`?this.idle=requestIdleCallback(()=>{this.idle=void 0,e()},{timeout:100}):e()})}updateScroll(e){this.scrollOffset=e}handleScroll(e){let{scrollTop:t,scrollHeight:n,clientHeight:r}=e.currentTarget,i=t>this.lastScrollTop;this.lastScrollTop=t,this.schedule(()=>{this.updateScroll(t),i&&!this.loadingMore&&!this.loading&&n-t-r<this.loadMoreThreshold&&n>r&&(this.loadingMore=!0,this.emit(`minerva-load-more`))})}visibleWindow(){let e=this.rowHeight;if(!e)return[];let{start:t,end:n}=se({scrollTop:this.scrollOffset,viewportHeight:this.containerHeight,itemHeight:e,itemCount:this.items.length,overscan:this.overscan}),r=[];for(let i=t;i<n;i++)r.push({index:i,start:i*e});if(this.focusedId!==null){let i=this.items.findIndex(e=>e.id===this.focusedId);if(i>=0&&(i<t||i>=n)){let n={index:i,start:i*e};i<t?r.unshift(n):r.push(n)}}return r}renderContent(e,t){return this.renderItem?this.renderItem(e,t):String(e.id)}activate(e,t){this.emit(`minerva-item-click`,{item:e,index:t})}handleRowKeyDown(e,t,n){e.composedPath()[0]===e.currentTarget&&(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.activate(t,n))}handleRowFocusOut(e){let t=e.currentTarget,n=e.relatedTarget;(!n||!t.contains(n))&&(this.focusedId=null)}hookStates(){return{loading:this.loading}}render(){let e=this.rowHeight,t=this.aria.label??g,n=this.visibleWindow(),r=this.items.length;return _`<div
class="virtualList"
part="root"
role="region"
tabindex="0"
aria-label=${t}
aria-busy=${this.loading?`true`:g}
style=${S({maxHeight:this.maxHeight===void 0?void 0:`${this.maxHeight}px`,overflow:`auto`,position:`relative`})}
@scroll=${this.handleScroll}
>
${this.needsMeasure?_`<div class="measureItem" aria-hidden="true">
${this.renderContent(this.items[0],0)}
</div>`:g}
<div
class="virtualListContent"
part="list"
role="list"
aria-label=${t}
style=${S({height:e?`${r*e}px`:`auto`,position:`relative`,willChange:`transform`})}
>
${Ze(n,e=>this.items[e.index].id,t=>{let n=this.items[t.index];return _`<div
part="item"
role="listitem"
class=${x({virtualListItem:!0,clickable:this.clickable})}
style=${S({position:`absolute`,top:`0`,transform:`translateY(${t.start}px)`,width:`100%`,height:`${e}px`,willChange:`transform`,padding:`${this.itemPadding}px`})}
tabindex=${this.clickable?`0`:g}
aria-setsize=${r}
aria-posinset=${t.index+1}
@click=${this.clickable?()=>this.activate(n,t.index):g}
@keydown=${this.clickable?e=>this.handleRowKeyDown(e,n,t.index):g}
@focusin=${()=>this.focusedId=n.id}
@focusout=${this.handleRowFocusOut}
>
${this.renderContent(n,t.index)}
</div>`})}
</div>
${this.loading?_`<div class="loadingWrapper" part="loading">
<div
class="progressIndicator primary"
role="progressbar"
aria-label=${this.locale.t(`common.loading`)}
>
<div class="waveContainer small">
<span class="wave" aria-hidden="true">${_n}</span>
</div>
</div>
</div>`:g}
</div>`}},z([y({attribute:!1})],$.prototype,`items`,void 0),z([y({attribute:!1})],$.prototype,`renderItem`,void 0),z([y({type:Number,attribute:`item-height`})],$.prototype,`itemHeight`,void 0),z([y({type:Number,attribute:`item-padding`})],$.prototype,`itemPadding`,void 0),z([y({type:Number})],$.prototype,`overscan`,void 0),z([y({type:Number,attribute:`max-height`})],$.prototype,`maxHeight`,void 0),z([y({type:Number,attribute:`load-more-threshold`})],$.prototype,`loadMoreThreshold`,void 0),z([y({type:Boolean,attribute:`high-performance`})],$.prototype,`highPerformance`,void 0),z([y({type:Boolean,reflect:!0})],$.prototype,`loading`,void 0),z([y({type:Boolean,reflect:!0})],$.prototype,`clickable`,void 0),z([h()],$.prototype,`scrollOffset`,void 0),z([h()],$.prototype,`containerHeight`,void 0),z([h()],$.prototype,`measuredHeight`,void 0),z([h()],$.prototype,`focusedId`,void 0),z([b(`.virtualList`)],$.prototype,`container`,void 0),z([b(`.measureItem`)],$.prototype,`measureElement`,void 0)})))()}var To,Eo,Do,Oo,ko,Ao;function jo(){return(jo=e((()=>{mr(),m(),rt(),st(),ct(),ot(),To=class extends gr{engineOptions(){return{...this.options}}engineMounted(e){this.book&&e.setBook(this.book)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`book`)&&this.book&&e.setBook(this.book)}setBook(e){this.instance?.setBook(e)}applyDeltas(e){this.instance?.applyDeltas(e)}},z([y({attribute:!1})],To.prototype,`book`,void 0),Eo=class{reset(){this.previous=void 0}apply(e,t,n){let r=this.previous;if(this.previous=e,!e||e===r)return;let i=r?.length??0;if(r&&i>0&&e.length>=i&&e[0]===r[0]&&e[i-1]===r[i-1]){e.length>i&&t(e.slice(i));return}n(e)}},Do=class extends To{static{this.tagName=`minerva-depth-chart`}createEngine(e,t){return it(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`range`,e=>this.emit(`minerva-range-change`,{range:e}))]}setRange(e){this.instance?.setRange(e)}},z([y({attribute:!1})],Do.prototype,`options`,void 0),Oo=class extends To{static{this.tagName=`minerva-order-book`}get defaultHeight(){return 420}createEngine(e,t){return nt(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`levelClick`,e=>this.emit(`minerva-level-click`,e))]}engineMounted(e){super.engineMounted(e),this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}syncEngine(e,t){super.syncEngine(e,t),t.has(`lastPrice`)&&this.lastPrice!==void 0&&e.setLastPrice(this.lastPrice)}setLastPrice(e){this.instance?.setLastPrice(e)}},z([y({type:Number,attribute:`last-price`})],Oo.prototype,`lastPrice`,void 0),z([y({attribute:!1})],Oo.prototype,`options`,void 0),ko=class extends To{constructor(...e){super(...e),this.feed=new Eo}static{this.tagName=`minerva-order-book-heatmap`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),at(e,t)}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e})),e.on(`follow`,e=>this.emit(`minerva-follow-change`,{follow:e}))]}feedTrades(e){let t=t=>e.addTrades(t);this.feed.apply(this.trades,t,t)}engineMounted(e){super.engineMounted(e),this.feedTrades(e)}syncEngine(e,t){super.syncEngine(e,t),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}resetView(){this.instance?.resetView()}getRenderer(){return this.instance?.getRenderer()??null}},z([y({attribute:!1})],ko.prototype,`trades`,void 0),z([y({attribute:!1})],ko.prototype,`options`,void 0),Ao=class extends gr{constructor(...e){super(...e),this.feed=new Eo}static{this.tagName=`minerva-time-and-sales`}get defaultHeight(){return 360}createEngine(e,t){return this.feed.reset(),tt(e,t)}engineOptions(){return{...this.options}}bindEngine(e){return[e.on(`hover`,e=>this.emit(`minerva-hover`,e)),e.on(`tradeClick`,e=>this.emit(`minerva-trade-click`,e)),e.on(`pause`,e=>this.emit(`minerva-pause`,{paused:e}))]}feedTrades(e){this.feed.apply(this.trades,t=>e.addTrades(t),t=>e.setTrades(t))}engineMounted(e){this.feedTrades(e)}syncEngine(e,t){t.has(`options`)&&e.setOptions(this.engineOptions()),t.has(`trades`)&&this.feedTrades(e)}addTrades(e){this.instance?.addTrades(e)}setTrades(e){this.instance?.setTrades(e)}clear(){this.instance?.clear()}scrollToLatest(){this.instance?.scrollToLatest()}},z([y({attribute:!1})],Ao.prototype,`trades`,void 0),z([y({attribute:!1})],Ao.prototype,`options`,void 0)})))()}var Mo,No;function Po(){return(Po=e((()=>{mr(),m(),lt(),Mo={fromAttribute:e=>e===null?void 0:/^\d+$/.test(e)?Number(e):e},No=class extends gr{constructor(...e){super(...e),this.height=480,this.chartStyle=`candles`}static{this.tagName=`minerva-trading-chart`}createEngine(e,t){return ut(e,t)}engineOptions(){return{...this.options,bars:this.bars??this.options?.bars,symbol:this.symbol??this.options?.symbol,timeframe:this.timeframe??this.options?.timeframe,chartStyle:this.chartStyle,indicators:this.indicators??this.options?.indicators}}bindEngine(e){return[e.on(`crosshairMove`,e=>this.emit(`minerva-crosshair-move`,e)),e.on(`click`,e=>this.emit(`minerva-click`,e)),e.on(`visibleRangeChange`,e=>this.emit(`minerva-visible-range-change`,e)),e.on(`orderMove`,e=>this.emit(`minerva-order-move`,e)),e.on(`orderCreate`,e=>this.emit(`minerva-order-create`,e)),e.on(`orderCancel`,e=>this.emit(`minerva-order-cancel`,e)),e.on(`drawingsChange`,e=>this.emit(`minerva-drawings-change`,{drawings:e})),e.on(`drawingSelect`,e=>this.emit(`minerva-drawing-select`,{id:e})),e.on(`drawingToolChange`,e=>this.emit(`minerva-drawing-tool-change`,{tool:e})),e.on(`undoChange`,e=>this.emit(`minerva-undo-change`,e)),e.on(`replayChange`,e=>this.emit(`minerva-replay-change`,e)),e.on(`fullscreenChange`,e=>this.emit(`minerva-fullscreen-change`,{fullscreen:e})),e.on(`indicatorToggle`,e=>this.emit(`minerva-indicator-toggle`,e)),e.on(`historyRequest`,e=>this.emit(`minerva-history-request`,e)),e.on(`renderer`,e=>this.emit(`minerva-renderer-change`,{renderer:e}))]}updateBar(e){this.instance?.update(e)}appendBars(e){this.instance?.appendBars(e)}prependBars(e){this.instance?.prependBars(e)}setBars(e){this.instance?.setBars(e)}getBarCount(){return this.instance?.getBarCount()??0}getBar(e){return this.instance?.getBar(e)??null}scrollToRealtime(e){this.instance?.scrollToRealtime(e)}fitContent(){this.instance?.fitContent()}getVisibleRange(){return this.instance?.getVisibleRange()??null}setVisibleRange(e){this.instance?.setVisibleRange(e)}getVisibleTimeRange(){return this.instance?.getVisibleTimeRange()??null}setVisibleTimeRange(e){this.instance?.setVisibleTimeRange(e)}setCrosshair(e,t){this.instance?.setCrosshair(e,t)}setScaleMode(e){this.instance?.setScaleMode(e)}resetPriceScales(){this.instance?.resetPriceScales()}setDrawingTool(e){this.instance?.setDrawingTool(e)}getDrawings(){return this.instance?.getDrawings()??[]}removeDrawing(e){this.instance?.removeDrawing(e)}selectDrawing(e){this.instance?.selectDrawing(e)}updateDrawing(e,t){this.instance?.updateDrawing(e,t)}undo(){this.instance?.undo()}redo(){this.instance?.redo()}getUndoState(){return this.instance?.getUndoState()??{canUndo:!1,canRedo:!1}}startReplay(e){this.instance?.startReplay(e)}replayStep(e){this.instance?.replayStep(e)}replayPlay(e){this.instance?.replayPlay(e)}replayPause(){this.instance?.replayPause()}stopReplay(){this.instance?.stopReplay()}getReplayState(){return this.instance?.getReplayState()??null}toDataURL(e,t){return this.instance?.toDataURL(e,t)??``}toBlob(e,t){return this.instance?.toBlob(e,t)??Promise.resolve(null)}requestChartFullscreen(){return this.instance?.requestFullscreen()??Promise.resolve()}exitChartFullscreen(){return this.instance?.exitFullscreen()??Promise.resolve()}setIndicatorVisible(e,t){this.instance?.setIndicatorVisible(e,t)}getRenderer(){return this.instance?.getRenderer()??null}},z([y()],No.prototype,`height`,void 0),z([y({attribute:!1})],No.prototype,`bars`,void 0),z([y()],No.prototype,`symbol`,void 0),z([y({converter:Mo})],No.prototype,`timeframe`,void 0),z([y({attribute:`chart-style`})],No.prototype,`chartStyle`,void 0),z([y({attribute:!1})],No.prototype,`indicators`,void 0),z([y({attribute:!1})],No.prototype,`options`,void 0)})))()}export{$i as $,Ha as A,U as At,ya as B,Hr as Bt,no as C,ii as Ct,X as D,ci as Dt,eo as E,ai as Et,Y as F,Gr as Ft,fa as G,Rr as Gt,Sa as H,zr as Ht,Ma as I,Kr as It,ca as J,pa as K,Fr as Kt,wa as L,Wr as Lt,Ua as M,ei as Mt,Na as N,H as Nt,Ga as O,oi as Ot,Pa as P,Xr as Pt,na as Q,J as R,Ur as Rt,$a as S,fi as St,Za as T,li as Tt,q as U,Ir as Ut,xa as V,Br as Vt,ga as W,Vr as Wt,ua as X,da as Y,ta as Z,Ya as _,mi as _t,jo as a,Bi as at,Ja as b,di as bt,wo as c,zi as ct,Co as d,Ni as dt,K as et,bo as f,Oi as ft,mo as g,Ti as gt,po as h,Ei as ht,Ao as i,Li as it,Va as j,ti as jt,Fa as k,ri as kt,$ as l,Pi as lt,xo as m,ki as mt,Po as n,qi as nt,Do as o,Vi as ot,Z as p,G as pt,la as q,B as qt,ko as r,Ji as rt,Oo as s,Ri as st,No as t,Qi as tt,Q as u,Fi as ut,Qa as v,_i as vt,qa as w,si as wt,ro as x,pi as xt,to as y,W as yt,ba as z,V as zt};