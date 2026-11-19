const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/api.taro.mini.generated-94G5EKCU.js","assets/rolldown-runtime-B0Z9INg1.js","assets/api.uni.mini.generated-D4bX_1L-.js","assets/api.weapp.mini.generated-BJRTPr9H.js"])))=>i.map(i=>d[i]);
import{a as e,n as t,r as n}from"./rolldown-runtime-B0Z9INg1.js";import{i as r,r as i}from"./native-preview-BRFLbKzw.js";import{o as a,t as o}from"./react-vendor-DxNxqLAt.js";import{n as s,t as c}from"./angular-preview-DOigT0Hs.js";import{n as l,t as u}from"./useTranslation-hKxdULV5.js";import{i as d,n as f,r as p,t as m}from"./Radio-RepximZ5.js";import{n as h,t as g}from"./Alert-Bjsfsclc.js";import{n as ee,t as te}from"./Tag-CfzvQMS_.js";import{a as ne,n as _,o as v}from"./Select-I6y89_0c.js";import{n as y,t as b}from"./CodeBlock-DcYPNTGU.js";import{r as x,t as re}from"./Stack-NslbKtAY.js";import{c as S,d as C,f as w,i as T,l as E,o as D,r as O,s as k,u as A}from"./DemoBlock-CoZ9ZZJE.js";import{n as j,t as M}from"./DocPage-BpQ6pUEt.js";import{n as N,r as P,t as ie}from"./support-BxQEQ_0V.js";var F,I;function L(){return(L=t((()=>{F=[`react`,`wc`,`vue`,`angular`,`native`,`taro`,`weapp`,`uni`],I=[`stable`,`beta`,`planned`,`n/a`]})))()}function ae(){let{t:e}=l();return(0,R.jsxs)(`section`,{className:O.section,"aria-labelledby":`native-start`,children:[(0,R.jsx)(`h2`,{id:`native-start`,children:e(`docs.platform-support.quickStartTitle`)}),(0,R.jsx)(`p`,{className:O.prose,children:e(`docs.platform-support.quickStartText`)}),z.map(e=>(0,R.jsx)(b,{code:e.code,language:e.language,title:e.id},e.id))]})}var R,z;function B(){return(B=t((()=>{u(),y(),T(),R=i(),z=[{id:`angular`,language:`ts`,code:`import { Component } from '@angular/core';
import { MnButton, MnSwitch, MnModal, provideMinerva } from 'minerva-design/angular';
import 'minerva-design/style.css';

@Component({
  standalone: true,
  imports: [MnButton, MnSwitch, MnModal],
  template: '<button mnButton (click)="open = true">Save</button><mn-modal [(open)]="open" title="Saved" />',
})
export class Example { open = false; }

// app.config.ts (bootstrap providers)
export const appConfig = { providers: [provideMinerva()] };`},{id:`taro`,language:`tsx`,code:`import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { Button, Input, Switch, miniTokenClassNames } from 'minerva-design/taro';
import 'minerva-design/tokens.mini.css';
import 'minerva-design/taro/style.css';

export default function Example() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');
  const [checked, setChecked] = useState(false);
  return <View className={miniTokenClassNames()}>
    <Input value={name} onChange={setName} placeholder="Name" />
    <Switch checked={checked} onChange={setChecked} />
    <Button disabled={!name} onClick={() => setSaved(name)}>Save</Button>
    <Text>{saved}</Text>
  </View>;
}`},{id:`uni`,language:`html`,code:`<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input, Switch, miniTokenClassNames } from 'minerva-design/uni';
import 'minerva-design/tokens.mini.css';
import 'minerva-design/uni/style.css';
const name = ref('');
const saved = ref('');
const checked = ref(false);
<\/script>
<template>
  <view :class="miniTokenClassNames()">
    <Input v-model="name" placeholder="Name" />
    <Switch v-model:checked="checked" />
    <Button :disabled="!name" @click="saved = name">Save</Button>
    <text>{{ saved }}</text>
  </view>
</template>`},{id:`weapp`,language:`json`,code:`{
  "usingComponents": {
    "mn-button": "minerva-design/button/index",
    "mn-input": "minerva-design/input/index",
    "mn-switch": "minerva-design/switch/index"
  }
}`},{id:`weapp-events`,language:`html`,code:`<!-- After npm install and Build npm in WeChat DevTools -->
<view class="mn-root">
  <mn-input value="{{name}}" bind:change="onName" />
  <mn-switch checked="{{checked}}" bind:change="onChecked" />
  <mn-button label="Save" loading="{{saving}}" bind:click="onSave" />
</view>
<!-- app.wxss: @import "./miniprogram_npm/minerva-design/tokens.wxss"; -->`},{id:`weapp-page`,language:`js`,code:`Page({
  data: { name: '', checked: false, saving: false },
  onName(event) { this.setData({ name: event.detail.value }); },
  onChecked(event) { this.setData({ checked: event.detail.checked }); },
  onSave() { wx.showToast({ title: this.data.name || "Saved", icon: "none" }); }
});`}]})))()}function oe(){let{t:e}=l(),t=t=>e(`docs.platform-support.api.${t}`),[n,r]=(0,V.useState)(`taro`),[i,a]=(0,V.useState)(`Button`),[o,s]=(0,V.useState)(),[c,u]=(0,V.useState)(!1);(0,V.useEffect)(()=>{let e=!0;return U[n]().then(({default:t})=>{e&&s(t)}).catch(()=>{e&&u(!0)}),()=>{e=!1}},[n]);let d=o?.[i]?i:`Button`,f=o?.[d],p=`mn-${d.replace(/[A-Z]/g,(e,t)=>`${t?`-`:``}${e.toLowerCase()}`)}`,m=f?n===`weapp`?JSON.stringify({usingComponents:{[p]:f.entry}},null,2):`import { ${d} } from '${f.entry}';`:``;return(0,H.jsxs)(`section`,{className:O.section,"aria-labelledby":`mini-api`,children:[(0,H.jsx)(`h2`,{id:`mini-api`,children:t(`title`)}),(0,H.jsx)(`p`,{className:O.prose,children:t(`description`)}),(0,H.jsxs)(re,{direction:`row`,wrap:!0,gap:3,children:[(0,H.jsx)(_,{"aria-label":t(`platform`),style:{width:`min(100%, 240px)`},value:n,onChange:e=>{e!==n&&(r(e),s(void 0),u(!1))},children:Object.entries(W).map(([e,t])=>(0,H.jsx)(v,{value:e,children:t},e))}),(0,H.jsx)(_,{"aria-label":t(`component`),style:{width:`min(100%, 240px)`},value:d,disabled:!o,onChange:a,children:Object.keys(o??{}).sort().map(e=>(0,H.jsx)(v,{value:e,children:e},e))})]}),c?(0,H.jsx)(g,{color:`danger`,children:t(`error`)}):f?(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(`h3`,{children:[W[n],` · `,d]}),(0,H.jsx)(b,{code:m,language:n===`weapp`?`json`:`ts`}),n===`weapp`&&(0,H.jsx)(`p`,{className:O.prose,children:t(`weapp`)}),[`props`,`events`,`slots`,`methods`].map(n=>f[n].length>0&&(0,H.jsxs)(`div`,{className:O.apiBlock,children:[(0,H.jsx)(`h4`,{children:t(n)}),(0,H.jsx)(`div`,{className:O.tableWrapper,children:(0,H.jsxs)(w,{className:O.propsTable,"aria-label":t(n),children:[(0,H.jsx)(S,{children:(0,H.jsxs)(D,{children:[(0,H.jsx)(A,{scope:`col`,children:e(`doc.prop`)}),(0,H.jsx)(A,{scope:`col`,children:e(`doc.type`)}),(0,H.jsx)(A,{scope:`col`,children:e(`doc.default`)}),(0,H.jsx)(A,{scope:`col`,children:e(`doc.description`)})]})}),(0,H.jsx)(C,{children:f[n].map(t=>(0,H.jsxs)(D,{children:[(0,H.jsxs)(A,{scope:`row`,children:[(0,H.jsx)(`code`,{children:t.name}),t.required&&(0,H.jsx)(`span`,{className:O.required,children:e(`doc.required`)})]}),(0,H.jsx)(k,{children:(0,H.jsx)(`code`,{className:O.propType,children:t.type})}),(0,H.jsx)(k,{children:(0,H.jsx)(`code`,{children:t.default??`—`})}),(0,H.jsx)(k,{children:t.description??`—`})]},t.name))})]})})]},n))]}):(0,H.jsx)(`p`,{role:`status`,children:t(`loading`)})]})}var V,H,U,W;function G(){return(G=t((()=>{V=r(),u(),h(),ne(),x(),E(),y(),T(),H=i(),s(),U={taro:()=>c(()=>import(`./api.taro.mini.generated-94G5EKCU.js`),__vite__mapDeps([0,1])),uni:()=>c(()=>import(`./api.uni.mini.generated-D4bX_1L-.js`),__vite__mapDeps([2,1])),weapp:()=>c(()=>import(`./api.weapp.mini.generated-BJRTPr9H.js`),__vite__mapDeps([3,1]))},W={taro:`Taro`,uni:`uni-app`,weapp:`WeChat`}})))()}var se=n({default:()=>Q}),K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{E(),K=e(r(),1),u(),a(),f(),p(),ee(),N(),j(),B(),G(),T(),q=i(),J={stable:`success`,beta:`info`,planned:`neutral`,"n/a":`neutral`},Y={stable:`stable`,beta:`beta`,planned:`planned`,"n/a":`na`},X=[`all`,`toB`,`toC`],Z=({status:e,label:t})=>(0,q.jsx)(te,{size:`small`,color:J[e],variant:e===`n/a`?`outline`:`subtle`,children:t}),Q=()=>{let{t:e}=l(),t=(t,n)=>e(`docs.platform-support.${t}`,n),[n,r]=(0,K.useState)(`all`),i=(0,K.useMemo)(()=>ie(n===`all`?void 0:n),[n]),a=e=>t(`platforms.${e}.name`),s=e=>t(`status.${Y[e]}`),c=(0,q.jsxs)(`section`,{className:O.section,"aria-labelledby":`platforms`,children:[(0,q.jsx)(`h2`,{id:`platforms`,children:t(`platformsTitle`)}),(0,q.jsx)(`p`,{className:O.prose,children:t(`platformsText`)}),(0,q.jsx)(`div`,{className:O.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`platformsTitle`),children:(0,q.jsxs)(w,{className:O.propsTable,children:[(0,q.jsx)(S,{children:(0,q.jsxs)(D,{children:[(0,q.jsx)(A,{scope:`col`,children:t(`platform`)}),(0,q.jsx)(A,{scope:`col`,children:e(`doc.description`)}),(0,q.jsx)(A,{scope:`col`,children:t(`components`)})]})}),(0,q.jsx)(C,{children:F.map(e=>{let n=P(e);return(0,q.jsxs)(D,{children:[(0,q.jsx)(A,{scope:`row`,children:a(e)}),(0,q.jsx)(k,{children:t(`platforms.${e}.text`)}),(0,q.jsx)(k,{children:I.filter(e=>n[e]>0).map(e=>(0,q.jsxs)(`span`,{className:O.prose,children:[(0,q.jsx)(Z,{status:e,label:`${s(e)} · ${n[e]}`}),` `]},e))})]},e)})})]})}),(0,q.jsx)(`ul`,{className:O.prose,children:I.map(e=>(0,q.jsxs)(`li`,{children:[(0,q.jsx)(Z,{status:e,label:s(e)}),` `,t(`legend.${Y[e]}`)]},e))})]});return(0,q.jsxs)(M,{id:`platform-support`,intro:c,children:[(0,q.jsx)(ae,{}),(0,q.jsx)(oe,{}),(0,q.jsxs)(`section`,{className:O.section,"aria-labelledby":`matrix`,children:[(0,q.jsx)(`h2`,{id:`matrix`,children:t(`matrixTitle`)}),(0,q.jsx)(`p`,{className:O.prose,children:t(`matrixText`)}),(0,q.jsx)(d,{"aria-label":t(`track.label`),direction:`horizontal`,value:n,onChange:e=>r(e),children:X.map(e=>(0,q.jsx)(m,{value:e,label:t(`track.${e}`)},e))}),(0,q.jsx)(`p`,{className:O.prose,"aria-live":`polite`,children:t(`count`,{count:i.length})}),(0,q.jsx)(`div`,{className:O.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`matrixTitle`),children:(0,q.jsxs)(w,{className:O.propsTable,children:[(0,q.jsx)(S,{children:(0,q.jsxs)(D,{children:[(0,q.jsx)(A,{scope:`col`,children:t(`component`)}),(0,q.jsx)(A,{scope:`col`,children:t(`tracks`)}),F.map(e=>(0,q.jsx)(A,{scope:`col`,children:a(e)},e))]})}),(0,q.jsx)(C,{children:i.map(e=>(0,q.jsxs)(D,{children:[(0,q.jsxs)(A,{scope:`row`,children:[e.docs?(0,q.jsx)(o,{to:`/${e.docs}`,children:(0,q.jsx)(`code`,{className:O.propName,children:e.name})}):(0,q.jsx)(`code`,{className:O.propName,children:e.name}),e.tag&&(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(`br`,{}),(0,q.jsx)(`code`,{children:`<${e.tag}>`})]})]}),(0,q.jsx)(k,{children:e.tracks.map(e=>t(`track.${e}`)).join(`, `)}),F.map(n=>{let{status:r}=e.platforms[n];return(0,q.jsx)(k,{title:e.platforms[n].notes??(r===`n/a`?t(`notApplicable.${n===`react`?`react`:`wc`}`):void 0),children:(0,q.jsx)(Z,{status:r,label:s(r)})},n)})]},e.name))})]})})]}),(0,q.jsxs)(`section`,{className:O.section,"aria-labelledby":`contracts`,children:[(0,q.jsx)(`h2`,{id:`contracts`,children:t(`contractsTitle`)}),(0,q.jsx)(`p`,{className:O.prose,children:t(`contractsText`)}),(0,q.jsx)(`p`,{className:O.prose,children:t(`testsText`)})]})]})}})))()}export{se as n,L as r,$ as t};