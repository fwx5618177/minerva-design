const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/api.taro.mini.generated-ChnB4WZo.js","assets/rolldown-runtime-B0Z9INg1.js","assets/api.uni.mini.generated-GqkHnLis.js","assets/api.weapp.mini.generated-oY2MI-n0.js"])))=>i.map(i=>d[i]);
import{a as e,n as t,r as n}from"./rolldown-runtime-B0Z9INg1.js";import{i as r,r as i}from"./native-preview-BRFLbKzw.js";import{o as a,t as o}from"./react-vendor-CVmG4vV9.js";import{n as s,t as c}from"./angular-preview-DOigT0Hs.js";import{n as l,t as u}from"./useTranslation-Dn-CFiHX.js";import{i as d,n as f,r as p,t as m}from"./Radio-L-_0EAus.js";import{n as ee,t as te}from"./Alert-DYH-oD8D.js";import{n as ne,t as re}from"./Tag-D6SUzaZT.js";import{n as h,t as g}from"./CodeBlock-6TfAiMiG.js";import{r as _,t as ie}from"./Stack-B3Kr9X_e.js";import{a as v,c as y,d as b,f as x,i as S,l as C,r as w,s as T,u as E}from"./DemoBlock-Ev3eU-vB.js";import{i as ae,o as D,t as O}from"./Select-CRoh0AwC.js";import{n as k,t as A}from"./DocPage-BNEhhzRL.js";import{n as j,r as M,t as N}from"./support-CRcsZuZZ.js";var P,F;function I(){return(I=t((()=>{P=[`react`,`wc`,`vue`,`angular`,`native`,`taro`,`weapp`,`uni`],F=[`stable`,`beta`,`planned`,`n/a`]})))()}function oe(){let{t:e}=l();return(0,L.jsxs)(`section`,{className:w.section,"aria-labelledby":`native-start`,children:[(0,L.jsx)(`h2`,{id:`native-start`,children:e(`docs.platform-support.quickStartTitle`)}),(0,L.jsx)(`p`,{className:w.prose,children:e(`docs.platform-support.quickStartText`)}),R.map(e=>(0,L.jsx)(g,{code:e.code,language:e.language,title:e.id},e.id))]})}var L,R;function z(){return(z=t((()=>{u(),h(),S(),L=i(),R=[{id:`angular`,language:`ts`,code:`import { Component } from '@angular/core';
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
});`}]})))()}function se(){let{t:e}=l(),t=t=>e(`docs.platform-support.api.${t}`),[n,r]=(0,B.useState)(`taro`),[i,a]=(0,B.useState)(`Button`),[o,s]=(0,B.useState)(),[c,u]=(0,B.useState)(!1);(0,B.useEffect)(()=>{let e=!0;return H[n]().then(({default:t})=>{e&&s(t)}).catch(()=>{e&&u(!0)}),()=>{e=!1}},[n]);let d=o?.[i]?i:`Button`,f=o?.[d],p=`mn-${d.replace(/[A-Z]/g,(e,t)=>`${t?`-`:``}${e.toLowerCase()}`)}`,m=f?n===`weapp`?JSON.stringify({usingComponents:{[p]:f.entry}},null,2):`import { ${d} } from '${f.entry}';`:``;return(0,V.jsxs)(`section`,{className:w.section,"aria-labelledby":`mini-api`,children:[(0,V.jsx)(`h2`,{id:`mini-api`,children:t(`title`)}),(0,V.jsx)(`p`,{className:w.prose,children:t(`description`)}),(0,V.jsxs)(ie,{direction:`row`,wrap:!0,gap:3,children:[(0,V.jsx)(D,{"aria-label":t(`platform`),style:{width:`min(100%, 240px)`},value:n,onChange:e=>{e!==n&&(r(e),s(void 0),u(!1))},children:Object.entries(U).map(([e,t])=>(0,V.jsx)(O,{value:e,children:t},e))}),(0,V.jsx)(D,{"aria-label":t(`component`),style:{width:`min(100%, 240px)`},value:d,disabled:!o,onChange:a,children:Object.keys(o??{}).sort().map(e=>(0,V.jsx)(O,{value:e,children:e},e))})]}),c?(0,V.jsx)(te,{color:`danger`,children:t(`error`)}):f?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(`h3`,{children:[U[n],` · `,d]}),(0,V.jsx)(g,{code:m,language:n===`weapp`?`json`:`ts`}),n===`weapp`&&(0,V.jsx)(`p`,{className:w.prose,children:t(`weapp`)}),[`props`,`events`,`slots`,`methods`].map(n=>f[n].length>0&&(0,V.jsxs)(`div`,{className:w.apiBlock,children:[(0,V.jsx)(`h4`,{children:t(n)}),(0,V.jsx)(`div`,{className:w.tableWrapper,children:(0,V.jsxs)(C,{className:w.propsTable,"aria-label":t(n),children:[(0,V.jsx)(x,{children:(0,V.jsxs)(b,{children:[(0,V.jsx)(v,{scope:`col`,children:e(`doc.prop`)}),(0,V.jsx)(v,{scope:`col`,children:e(`doc.type`)}),(0,V.jsx)(v,{scope:`col`,children:e(`doc.default`)}),(0,V.jsx)(v,{scope:`col`,children:e(`doc.description`)})]})}),(0,V.jsx)(T,{children:f[n].map(t=>(0,V.jsxs)(b,{children:[(0,V.jsxs)(v,{scope:`row`,children:[(0,V.jsx)(`code`,{children:t.name}),t.required&&(0,V.jsx)(`span`,{className:w.required,children:e(`doc.required`)})]}),(0,V.jsx)(E,{children:(0,V.jsx)(`code`,{className:w.propType,children:t.type})}),(0,V.jsx)(E,{children:(0,V.jsx)(`code`,{children:t.default??`—`})}),(0,V.jsx)(E,{children:t.description??`—`})]},t.name))})]})})]},n))]}):(0,V.jsx)(`p`,{role:`status`,children:t(`loading`)})]})}var B,V,H,U;function W(){return(W=t((()=>{B=r(),u(),ee(),ae(),_(),y(),h(),S(),V=i(),s(),H={taro:()=>c(()=>import(`./api.taro.mini.generated-ChnB4WZo.js`),__vite__mapDeps([0,1])),uni:()=>c(()=>import(`./api.uni.mini.generated-GqkHnLis.js`),__vite__mapDeps([2,1])),weapp:()=>c(()=>import(`./api.weapp.mini.generated-oY2MI-n0.js`),__vite__mapDeps([3,1]))},U={taro:`Taro`,uni:`uni-app`,weapp:`WeChat`}})))()}var G=n({default:()=>Q}),K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{y(),K=e(r(),1),u(),a(),f(),p(),ne(),j(),k(),z(),W(),S(),q=i(),J={stable:`success`,beta:`info`,planned:`neutral`,"n/a":`neutral`},Y={stable:`stable`,beta:`beta`,planned:`planned`,"n/a":`na`},X=[`all`,`toB`,`toC`],Z=({status:e,label:t})=>(0,q.jsx)(re,{size:`small`,color:J[e],variant:e===`n/a`?`outline`:`subtle`,children:t}),Q=()=>{let{t:e}=l(),t=(t,n)=>e(`docs.platform-support.${t}`,n),[n,r]=(0,K.useState)(`all`),i=(0,K.useMemo)(()=>N(n===`all`?void 0:n),[n]),a=e=>t(`platforms.${e}.name`),s=e=>t(`status.${Y[e]}`),c=(0,q.jsxs)(`section`,{className:w.section,"aria-labelledby":`platforms`,children:[(0,q.jsx)(`h2`,{id:`platforms`,children:t(`platformsTitle`)}),(0,q.jsx)(`p`,{className:w.prose,children:t(`platformsText`)}),(0,q.jsx)(`div`,{className:w.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`platformsTitle`),children:(0,q.jsxs)(C,{className:w.propsTable,children:[(0,q.jsx)(x,{children:(0,q.jsxs)(b,{children:[(0,q.jsx)(v,{scope:`col`,children:t(`platform`)}),(0,q.jsx)(v,{scope:`col`,children:e(`doc.description`)}),(0,q.jsx)(v,{scope:`col`,children:t(`components`)})]})}),(0,q.jsx)(T,{children:P.map(e=>{let n=M(e);return(0,q.jsxs)(b,{children:[(0,q.jsx)(v,{scope:`row`,children:a(e)}),(0,q.jsx)(E,{children:t(`platforms.${e}.text`)}),(0,q.jsx)(E,{children:F.filter(e=>n[e]>0).map(e=>(0,q.jsxs)(`span`,{className:w.prose,children:[(0,q.jsx)(Z,{status:e,label:`${s(e)} · ${n[e]}`}),` `]},e))})]},e)})})]})}),(0,q.jsx)(`ul`,{className:w.prose,children:F.map(e=>(0,q.jsxs)(`li`,{children:[(0,q.jsx)(Z,{status:e,label:s(e)}),` `,t(`legend.${Y[e]}`)]},e))})]});return(0,q.jsxs)(A,{id:`platform-support`,intro:c,children:[(0,q.jsx)(oe,{}),(0,q.jsx)(se,{}),(0,q.jsxs)(`section`,{className:w.section,"aria-labelledby":`matrix`,children:[(0,q.jsx)(`h2`,{id:`matrix`,children:t(`matrixTitle`)}),(0,q.jsx)(`p`,{className:w.prose,children:t(`matrixText`)}),(0,q.jsx)(d,{"aria-label":t(`track.label`),direction:`horizontal`,value:n,onChange:e=>r(e),children:X.map(e=>(0,q.jsx)(m,{value:e,label:t(`track.${e}`)},e))}),(0,q.jsx)(`p`,{className:w.prose,"aria-live":`polite`,children:t(`count`,{count:i.length})}),(0,q.jsx)(`div`,{className:w.tableWrapper,tabIndex:0,role:`region`,"aria-label":t(`matrixTitle`),children:(0,q.jsxs)(C,{className:w.propsTable,children:[(0,q.jsx)(x,{children:(0,q.jsxs)(b,{children:[(0,q.jsx)(v,{scope:`col`,children:t(`component`)}),(0,q.jsx)(v,{scope:`col`,children:t(`tracks`)}),P.map(e=>(0,q.jsx)(v,{scope:`col`,children:a(e)},e))]})}),(0,q.jsx)(T,{children:i.map(e=>(0,q.jsxs)(b,{children:[(0,q.jsxs)(v,{scope:`row`,children:[e.docs?(0,q.jsx)(o,{to:`/${e.docs}`,children:(0,q.jsx)(`code`,{className:w.propName,children:e.name})}):(0,q.jsx)(`code`,{className:w.propName,children:e.name}),e.tag&&(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(`br`,{}),(0,q.jsx)(`code`,{children:`<${e.tag}>`})]})]}),(0,q.jsx)(E,{children:e.tracks.map(e=>t(`track.${e}`)).join(`, `)}),P.map(n=>{let{status:r}=e.platforms[n];return(0,q.jsx)(E,{title:e.platforms[n].notes??(r===`n/a`?t(`notApplicable.${n===`react`?`react`:`wc`}`):void 0),children:(0,q.jsx)(Z,{status:r,label:s(r)})},n)})]},e.name))})]})})]}),(0,q.jsxs)(`section`,{className:w.section,"aria-labelledby":`contracts`,children:[(0,q.jsx)(`h2`,{id:`contracts`,children:t(`contractsTitle`)}),(0,q.jsx)(`p`,{className:w.prose,children:t(`contractsText`)}),(0,q.jsx)(`p`,{className:w.prose,children:t(`testsText`)})]})]})}})))()}export{G as n,I as r,$ as t};