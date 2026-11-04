import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{$ as r,F as i,It as ee,Kt as te,Mn as a,Vt as ne,Zt as re,bt as ie,c as ae,dn as oe,in as se,ir as ce,ot as le,pr as ue,qn as de,rt as o,tn as fe,ur as pe,vt as s,yn as me}from"./angular-preview-B7Uzpk8P.js";import{B as he,R as ge,V as c,z as _e}from"./ProgressIndicator-CLQ5GhV8.js";import{t as l}from"./stylingHooks-PqiNJdev.js";import{ft as ve,pt as ye}from"./io5-BsjRfO9T.js";import{n as u,t as d}from"./mediaPlayer.module.scss-VjQLUVAn.js";import{l as f,n as be,t as p,u as m}from"./DocPage-B3QbO8Wp.js";var h,g,xe,Se,Ce,_,v,we,y;function b(){return(b=e((()=>{a(),c(),ve(),u(),h=t(),g=n(),i(),xe=[],Se=()=>{try{return typeof window>`u`?null:window.localStorage}catch{return null}},Ce=e=>(window.addEventListener(`storage`,e),()=>window.removeEventListener(`storage`,e)),_=({name:e})=>(0,g.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,focusable:`false`,children:(0,g.jsx)(`path`,{d:ce[e]})}),v=e=>Number.isFinite(e)&&e>0?e:0,we=e=>{let t=e.currentTarget.getBoundingClientRect();return t.width>0?Math.min(1,Math.max(0,(e.clientX-t.left)/t.width)):0},y=({src:e,type:t,mimeType:n,poster:i,title:a,autoPlay:ce=!1,loop:ge=!1,muted:c,defaultMuted:_e,preload:ve=`metadata`,crossOrigin:u,startTime:f,playbackRates:be=te,skipSeconds:p=10,controls:m=!0,height:y,aspectRatio:b=`16 / 9`,pictureInPicture:Te=!1,tracks:x=xe,onTimeUpdate:Ee,onEnded:De,onPlay:Oe,onPause:ke,onLoadedMetadata:S,onError:Ae,onRateChange:C,onVolumeChange:je,onTrackChange:Me,"aria-label":Ne,className:w,style:T,ref:Pe})=>{let{t:E}=he(),D=ie(e,n,t),O=D===`video`,k=(0,h.useRef)(null),A=(0,h.useRef)(null),Fe=(0,h.useRef)(null),j=ye(),[M,N]=(0,h.useState)(!0),[Ie,P]=(0,h.useState)(!1),[F,I]=(0,h.useState)(!1),[L,R]=(0,h.useState)(!1),[z,B]=(0,h.useState)(0),[V,H]=(0,h.useState)(0),[Le,U]=(0,h.useState)(0),[W,G]=(0,h.useState)(1),[K,q]=(0,h.useState)(c??_e??!1),[Re,ze]=(0,h.useState)(1),[Be,Ve]=(0,h.useState)(!1),[He,Ue]=(0,h.useState)(!1),We=j&&document.pictureInPictureEnabled===!0,[J,Ge]=(0,h.useState)({src:e,mutedProp:c});(J.src!==e||J.mutedProp!==c)&&(Ge({src:e,mutedProp:c}),J.src!==e&&(R(!1),P(!1),B(0),H(0),U(0)),c!==void 0&&J.mutedProp!==c&&q(c)),(0,h.useEffect)(()=>{let e=()=>Ve(!!k.current&&document.fullscreenElement===k.current);return document.addEventListener(`fullscreenchange`,e),()=>document.removeEventListener(`fullscreenchange`,e)},[]);let Ke=(0,h.useSyncExternalStore)(Ce,()=>ue(Se()),()=>null),[Y,qe]=(0,h.useState)(null),Je=Y?Y.pref:Ke,Ye=Y?x[Y.index]:void 0,X=Y&&Ye&&pe(Ye)===Je?Y.index:oe(x,Je),[Xe,Ze]=(0,h.useState)(``),[Z,Q]=(0,h.useState)(!1),Qe=(0,h.useRef)(-1),$e=(0,h.useRef)(null),et=(0,h.useRef)(null),tt=JSON.stringify(x.map(e=>e.src)),nt=(0,h.useMemo)(()=>JSON.parse(tt).map(e=>({src:e,label:``})),[tt]);(0,h.useEffect)(()=>{let e=A.current;if(e&&m)return ae(e,nt,X,Ze,{crossOrigin:u})},[nt,X,u,m,O]),(0,h.useEffect)(()=>{if(!Z)return;let e=et.current;e?.querySelector(`[aria-checked="true"]`)?.focus({preventScroll:!0});let t=t=>{e?.contains(t.target)||Q(!1)};return document.addEventListener(`pointerdown`,t),()=>document.removeEventListener(`pointerdown`,t)},[Z]);let rt=e=>{if(e===X)return;let t=x[e]??null;X>=0&&(Qe.current=X),qe({pref:pe(t),index:e}),ne(Se(),t),Me?.({index:t?e:-1,track:t})},it=e=>{Q(!1),e&&$e.current?.focus()},at=e=>{e.stopPropagation();let t=Array.from(e.currentTarget.querySelectorAll(`[role="menuitemradio"]`)),n=t.indexOf(document.activeElement),r=-1;if(e.key===`ArrowDown`)r=(n+1)%t.length;else if(e.key===`ArrowUp`)r=(n-1+t.length)%t.length;else if(e.key===`Home`)r=0;else if(e.key===`End`)r=t.length-1;else if(e.key===`Escape`){e.preventDefault(),it(!0);return}else if(e.key===`Tab`){Q(!1);return}r>=0&&(e.preventDefault(),t[r]?.focus())};(0,h.useEffect)(()=>{let e=A.current;if(!e||!O)return;let t=()=>Ue(!0),n=()=>Ue(!1);return e.addEventListener(`enterpictureinpicture`,t),e.addEventListener(`leavepictureinpicture`,n),()=>{e.removeEventListener(`enterpictureinpicture`,t),e.removeEventListener(`leavepictureinpicture`,n)}},[O,m]);let ot=(0,h.useCallback)(e=>{A.current=e},[]),st=(0,h.useCallback)(()=>{let e=A.current;if(!e)return Promise.resolve();let t=e.play();return Promise.resolve(t).catch(()=>void 0)},[]),ct=(0,h.useCallback)(()=>A.current?.pause(),[]),$=(0,h.useCallback)(e=>{let t=A.current;if(!t)return;let n=fe(e,v(t.duration));t.currentTime=n,B(n)},[]);(0,h.useImperativeHandle)(Pe,()=>({play:st,pause:ct,seek:$,get element(){return A.current}}),[st,ct,$]);let lt=()=>{let e=A.current;e&&(e.paused||e.ended?st():e.pause())},ut=()=>{let e=A.current;e&&(e.muted=!e.muted,q(e.muted))},dt=e=>{let t=A.current;t&&(t.volume=se(e),t.volume>0&&t.muted&&(t.muted=!1),G(t.volume),q(t.muted))},ft=()=>{let e=A.current;e&&(e.playbackRate=ee(e.playbackRate,be),ze(e.playbackRate))},pt=()=>{let e=k.current;e&&O&&(document.fullscreenElement===e?document.exitFullscreen?.().catch(()=>void 0):e.requestFullscreen?e.requestFullscreen().catch(()=>void 0):A.current?.webkitEnterFullscreen?.())},mt=()=>{let e=A.current;if(!e)return;let t=document;t.pictureInPictureElement===e?t.exitPictureInPicture?.().catch(()=>void 0):e.requestPictureInPicture?.().catch(()=>void 0)},ht=e=>{if(!m)return;let t=e.target;if((e.key===` `||e.key===`Enter`)&&t.closest(`button`))return;let n=de(e.key,e),r=A.current;if(n&&r&&(n.type!==`fullscreen`||O)){if(n.type===`captions`){let t=le(x,X,Qe.current);if(t===null)return;e.preventDefault(),rt(t);return}switch(e.preventDefault(),n.type){case`toggle`:lt();break;case`seek`:$(r.currentTime+n.delta);break;case`volume`:dt((r.muted?0:r.volume)+n.delta);break;case`mute`:ut();break;case`fullscreen`:pt()}}},gt=e=>{if(V){if(e.type===`pointerdown`)e.currentTarget.setPointerCapture?.(e.pointerId);else if(!e.currentTarget.hasPointerCapture?.(e.pointerId))return;$(we(e)*V)}},_t=e=>{if(e.type===`pointerdown`)e.currentTarget.setPointerCapture?.(e.pointerId);else if(!e.currentTarget.hasPointerCapture?.(e.pointerId))return;dt(we(e))},vt=e=>{let t=A.current;if(!t||!V)return;let n={ArrowLeft:-5,ArrowDown:-5,ArrowRight:5,ArrowUp:5,PageDown:-p||-10,PageUp:p||10},r;e.key in n?r=t.currentTime+n[e.key]:e.key===`Home`?r=0:e.key===`End`&&(r=V),r!==void 0&&(e.preventDefault(),e.stopPropagation(),$(r))},yt=e=>{let t=A.current;if(!t)return;let n=t.muted?0:t.volume,r;e.key===`ArrowRight`||e.key===`ArrowUp`?r=n+.1:e.key===`ArrowLeft`||e.key===`ArrowDown`?r=n-.1:e.key===`Home`?r=0:e.key===`End`&&(r=1),r!==void 0&&(e.preventDefault(),e.stopPropagation(),dt(r))},bt=e=>{B(e.currentTime),U(me(e.buffered,e.currentTime))},xt={onPlay:()=>{N(!1),P(!1),Oe?.()},onPause:()=>{N(!0),I(!1),ke?.()},onPlaying:()=>I(!1),onWaiting:()=>I(!0),onCanPlay:()=>I(!1),onEnded:()=>{N(!0),P(!0),I(!1),De?.()},onLoadedMetadata:t=>{let n=t.currentTarget,r=v(n.duration);H(r),R(!1),Fe.current!==e&&(Fe.current=e,f&&f>0&&(n.currentTime=fe(f,r))),bt(n),S?.({duration:r})},onDurationChange:e=>H(v(e.currentTarget.duration)),onTimeUpdate:e=>{let t=e.currentTarget;bt(t),Ee?.({currentTime:t.currentTime,duration:v(t.duration)})},onProgress:e=>bt(e.currentTarget),onVolumeChange:e=>{let t=e.currentTarget;G(t.volume),q(t.muted),je?.({volume:t.volume,muted:t.muted})},onRateChange:e=>{ze(e.currentTarget.playbackRate),C?.(e.currentTarget.playbackRate)},onError:e=>{R(!0),I(!1),Ae?.(e.currentTarget.error)},ref:ot,className:d.media,src:e,autoPlay:ce,loop:ge,muted:K,preload:ve,crossOrigin:u,...l(`media-player`,`media`)},St=Ie?`ended`:M?`paused`:`playing`,Ct={...T};O&&m&&(y===void 0?Ct.aspectRatio=b:Ct.height=y);let wt=x.map((e,t)=>(0,g.jsx)(`track`,{kind:e.kind??`subtitles`,src:e.src,srcLang:e.srclang,label:e.label,default:!m&&t===X||void 0},`${t}:${e.src}`)),Tt=O?(0,g.jsx)(`video`,{...xt,poster:i,playsInline:!0,onClick:m?lt:void 0,onDoubleClick:m?pt:void 0,style:!m&&y!==void 0?{height:y,width:`auto`}:void 0,children:wt}):(0,g.jsx)(`audio`,{...xt,children:wt});if(!m)return(0,g.jsx)(`div`,{className:o(d.mediaPlayer,d.bare,w),style:T,...l(`media-player`,`root`,{variant:D,status:St}),children:Tt});let Et=Ne??a??E(`mediaPlayer.label`),Dt=re(z,V),Ot=re(Le,V),kt=`${s(z,V)} / ${s(V)}`,At=K?0:W,jt=F&&!L&&(0,g.jsx)(`span`,{className:d.spinner,role:`status`,"aria-label":E(`mediaPlayer.loading`),...l(`media-player`,`spinner`)});return(0,g.jsxs)(`div`,{ref:k,role:`group`,"aria-label":Et,tabIndex:0,className:o(d.mediaPlayer,O?d.video:d.audio,St===`playing`&&d.playing,w),style:Ct,onKeyDown:ht,...l(`media-player`,`root`,{variant:D,status:St,loading:F,invalid:L}),children:[Tt,a&&(0,g.jsx)(`div`,{className:d.title,...l(`media-player`,`title`),children:a}),O&&jt,(O?Xe!==``:X>=0)&&(0,g.jsx)(`div`,{className:d.captions,...l(`media-player`,`captions`),children:Xe&&(0,g.jsx)(`span`,{className:d.cue,children:Xe})}),L&&(0,g.jsx)(`div`,{className:d.error,role:`alert`,...l(`media-player`,`error`),children:E(`mediaPlayer.error`)}),(0,g.jsxs)(`div`,{className:d.controls,...l(`media-player`,`controls`),children:[(0,g.jsxs)(`div`,{className:o(d.slider,d.seek),role:`slider`,tabIndex:0,"aria-label":E(`mediaPlayer.seek`),"aria-valuemin":0,"aria-valuemax":Math.round(V),"aria-valuenow":Math.round(z),"aria-valuetext":E(`mediaPlayer.timeOf`,{current:s(z,V),duration:s(V)}),"aria-disabled":!V||void 0,style:{"--_mp-value":`${Dt*100}%`,"--_mp-buffered":`${Ot*100}%`},onPointerDown:gt,onPointerMove:gt,onKeyDown:vt,...l(`media-player`,`seek`),children:[(0,g.jsx)(`span`,{className:d.track}),(0,g.jsx)(`span`,{className:d.buffered}),(0,g.jsx)(`span`,{className:d.fill}),(0,g.jsx)(`span`,{className:d.thumb})]}),(0,g.jsx)(`button`,{type:`button`,className:d.button,"aria-label":E(M?`mediaPlayer.play`:`mediaPlayer.pause`),disabled:L,onClick:lt,...l(`media-player`,`button`),children:(0,g.jsx)(_,{name:M?`play`:`pause`})}),p>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(`button`,{type:`button`,className:d.button,"aria-label":E(`mediaPlayer.skipBack`,{count:p}),disabled:L,onClick:()=>$(z-p),...l(`media-player`,`button`),children:(0,g.jsx)(_,{name:`skipBack`})}),(0,g.jsx)(`button`,{type:`button`,className:d.button,"aria-label":E(`mediaPlayer.skipForward`,{count:p}),disabled:L,onClick:()=>$(z+p),...l(`media-player`,`button`),children:(0,g.jsx)(_,{name:`skipForward`})})]}),!O&&jt,(0,g.jsx)(`span`,{className:d.time,...l(`media-player`,`time`),children:kt}),(0,g.jsx)(`span`,{className:d.spacer}),(0,g.jsx)(`button`,{type:`button`,className:d.button,"aria-label":E(K?`mediaPlayer.unmute`:`mediaPlayer.mute`),"aria-pressed":K,onClick:ut,...l(`media-player`,`button`),children:(0,g.jsx)(_,{name:K||W===0?`muted`:`volume`})}),(0,g.jsxs)(`div`,{className:o(d.slider,d.volume),role:`slider`,tabIndex:0,"aria-label":E(`mediaPlayer.volume`),"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(At*100),"aria-valuetext":`${Math.round(At*100)}%`,style:{"--_mp-value":`${At*100}%`},onPointerDown:_t,onPointerMove:_t,onKeyDown:yt,...l(`media-player`,`volume`),children:[(0,g.jsx)(`span`,{className:d.track}),(0,g.jsx)(`span`,{className:d.fill}),(0,g.jsx)(`span`,{className:d.thumb})]}),be.length>1&&(0,g.jsx)(`button`,{type:`button`,className:o(d.button,d.rate),"aria-label":E(`mediaPlayer.playbackRate`,{rate:r(Re)}),onClick:ft,...l(`media-player`,`button`),children:r(Re)}),x.length>0&&(0,g.jsxs)(`span`,{ref:et,className:d.captionsControl,onBlur:e=>{let t=e.relatedTarget;t&&!e.currentTarget.contains(t)&&Q(!1)},children:[(0,g.jsx)(`button`,{ref:$e,type:`button`,className:o(d.button,X>=0&&d.captionsOn),"aria-label":E(`mediaPlayer.captions`),"aria-haspopup":`menu`,"aria-expanded":Z,onClick:()=>Q(e=>!e),...l(`media-player`,`button`),children:(0,g.jsx)(_,{name:`captions`})}),Z&&(0,g.jsx)(`div`,{role:`menu`,tabIndex:-1,"aria-label":E(`mediaPlayer.captions`),className:d.captionsMenu,onKeyDown:at,...l(`media-player`,`captions-menu`),children:[-1,...x.keys()].map(e=>(0,g.jsx)(`button`,{type:`button`,role:`menuitemradio`,"aria-checked":e===X,tabIndex:e===X?0:-1,className:d.captionsOption,onClick:()=>{rt(e),it(!0)},children:e<0?E(`mediaPlayer.captionsOff`):x[e]?.label},e))})]}),O&&Te&&We&&(0,g.jsx)(`button`,{type:`button`,className:d.button,"aria-label":E(He?`mediaPlayer.exitPictureInPicture`:`mediaPlayer.pictureInPicture`),"aria-pressed":He,onClick:mt,...l(`media-player`,`button`),children:(0,g.jsx)(_,{name:`pictureInPicture`})}),O&&(0,g.jsx)(`button`,{type:`button`,className:d.button,"aria-label":E(Be?`mediaPlayer.exitFullscreen`:`mediaPlayer.fullscreen`),onClick:pt,...l(`media-player`,`button`),children:(0,g.jsx)(_,{name:Be?`exitFullscreen`:`fullscreen`})})]})]})}})))()}function Te(){return(0,x.jsx)(`div`,{style:{maxWidth:480},children:(0,x.jsx)(y,{src:Ee,title:`T-Rex roar`,skipSeconds:0})})}var x,Ee;function De(){return(De=e((()=>{b(),x=n(),Ee=`https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3`})))()}function Oe(){let[e,t]=(0,ke.useState)(null);return(0,S.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:560},children:[(0,S.jsx)(y,{src:Ae,title:`Flower`,tracks:C,onTrackChange:({track:e})=>t(e?.label??`Off`)}),(0,S.jsx)(y,{src:`https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3`,title:`Audio with the same captions`,skipSeconds:0,tracks:C}),(0,S.jsx)(`output`,{"aria-live":`polite`,children:e?`Captions: ${e}`:`Captions: default track`})]})}var ke,S,Ae,C;function je(){return(je=e((()=>{ke=t(),b(),S=n(),Ae=`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`,C=[{src:`data:text/vtt;charset=utf-8,WEBVTT%0A%0A00%3A00.000%20--%3E%2000%3A01.800%0AA%20flower%20bud%20in%20the%20morning%20light%0A%0A00%3A01.800%20--%3E%2000%3A03.600%0AIts%20petals%20slowly%20%3Ci%3Eunfold%3C%2Fi%3E%0A%0A00%3A03.600%20--%3E%2000%3A06.000%0A%E2%80%A6and%20the%20bloom%20opens%20to%20the%20bees.%0A`,srclang:`en`,label:`English`,kind:`subtitles`,default:!0},{src:`data:application/x-subrip;charset=utf-8,1%0A00%3A00%3A00%2C000%20--%3E%2000%3A00%3A01%2C800%0AUn%20bouton%20de%20fleur%20dans%20la%20lumi%C3%A8re%20du%20matin%0A%0A2%0A00%3A00%3A01%2C800%20--%3E%2000%3A00%3A03%2C600%0ASes%20p%C3%A9tales%20s'ouvrent%20lentement%0A%0A3%0A00%3A00%3A03%2C600%20--%3E%2000%3A00%3A06%2C000%0A%E2%80%A6et%20la%20fleur%20s'offre%20aux%20abeilles.%0A`,srclang:`fr`,label:`Français`}]})))()}function Me(){let[e,t]=(0,Ne.useState)(1);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:560},children:[(0,w.jsx)(y,{src:T,playbackRates:[1,1.5,2],skipSeconds:3,aspectRatio:`4 / 3`,onRateChange:t,"aria-label":`Flower, speed and skip`}),(0,w.jsxs)(`output`,{children:[`Speed: `,e,`×`]})]})}var Ne,w,T;function Pe(){return(Pe=e((()=>{Ne=t(),b(),w=n(),T=`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`})))()}function E(){let e=(0,D.useRef)(null),[t,n]=(0,D.useState)(2),[r,i]=(0,D.useState)(`Not started`);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:560},children:[(0,O.jsx)(y,{ref:e,src:k,startTime:t,onLoadedMetadata:({duration:e})=>i(`Resumed at ${t}s of ${e.toFixed(1)}s`),onTimeUpdate:({currentTime:e,duration:t})=>i(`${Math.round(e/t*100)}% watched (${e.toFixed(1)}s)`),onPause:()=>n(Math.floor(e.current?.element?.currentTime??0)),onEnded:()=>i(`Finished`)}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,O.jsx)(_e,{size:`small`,onClick:()=>e.current?.play(),children:`Play`}),(0,O.jsx)(_e,{size:`small`,variant:`outline`,onClick:()=>e.current?.seek(0),children:`Restart`})]}),(0,O.jsxs)(`output`,{"aria-live":`polite`,children:[r,` · saved position: `,t,`s`]})]})}var D,O,k;function A(){return(A=e((()=>{D=t(),ge(),b(),O=n(),k=`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`})))()}function Fe(){return(0,j.jsx)(`div`,{style:{maxWidth:560},children:(0,j.jsx)(y,{src:M,title:`Flower`,pictureInPicture:!0})})}var j,M;function N(){return(N=e((()=>{b(),j=n(),M=`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`})))()}var Ie;function P(){return(P=e((()=>{Ie=`import { MediaPlayer } from "minerva-design";

// CC0 sample from MDN's interactive examples
const ROAR =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

export default function AudioDemo() {
  return (
    <div style={{ maxWidth: 480 }}>
      <MediaPlayer src={ROAR} title="T-Rex roar" skipSeconds={0} />
    </div>
  );
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { useState } from "react";
import { MediaPlayer, type MediaPlayerTrack } from "minerva-design";

// CC0 sample from MDN's interactive examples
const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

// Caption files are usually served next to the video (cross-origin ones need
// crossOrigin="anonymous" on the player and CORS headers on their server).
// Inline data: URLs keep this demo self-contained.
const ENGLISH_VTT = \`WEBVTT

00:00.000 --> 00:01.800
A flower bud in the morning light

00:01.800 --> 00:03.600
Its petals slowly <i>unfold</i>

00:03.600 --> 00:06.000
…and the bloom opens to the bees.
\`;

const FRENCH_SRT = \`1
00:00:00,000 --> 00:00:01,800
Un bouton de fleur dans la lumière du matin

2
00:00:01,800 --> 00:00:03,600
Ses pétales s'ouvrent lentement

3
00:00:03,600 --> 00:00:06,000
…et la fleur s'offre aux abeilles.
\`;

const tracks: MediaPlayerTrack[] = [
  {
    src: \`data:text/vtt;charset=utf-8,\${encodeURIComponent(ENGLISH_VTT)}\`,
    srclang: "en",
    label: "English",
    kind: "subtitles",
    default: true,
  },
  {
    src: \`data:application/x-subrip;charset=utf-8,\${encodeURIComponent(FRENCH_SRT)}\`,
    srclang: "fr",
    label: "Français",
  },
];

export default function CaptionsDemo() {
  const [choice, setChoice] = useState<string | null>(null);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MediaPlayer
        src={FLOWER}
        title="Flower"
        tracks={tracks}
        onTrackChange={({ track }) => setChoice(track?.label ?? "Off")}
      />
      <MediaPlayer
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
        title="Audio with the same captions"
        skipSeconds={0}
        tracks={tracks}
      />
      <output aria-live="polite">
        {choice ? \`Captions: \${choice}\` : "Captions: default track"}
      </output>
    </div>
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { useState } from "react";
import { MediaPlayer } from "minerva-design";

const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function RatesSkipDemo() {
  const [rate, setRate] = useState(1);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MediaPlayer
        src={FLOWER}
        playbackRates={[1, 1.5, 2]}
        skipSeconds={3}
        aspectRatio="4 / 3"
        onRateChange={setRate}
        aria-label="Flower, speed and skip"
      />
      <output>Speed: {rate}×</output>
    </div>
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { useRef, useState } from "react";
import { Button, MediaPlayer, type MediaPlayerHandle } from "minerva-design";

const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function ResumeDemo() {
  const player = useRef<MediaPlayerHandle>(null);
  // e.g. the position saved by the last session
  const [saved, setSaved] = useState(2);
  const [progress, setProgress] = useState("Not started");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MediaPlayer
        ref={player}
        src={FLOWER}
        startTime={saved}
        onLoadedMetadata={({ duration }) =>
          setProgress(\`Resumed at \${saved}s of \${duration.toFixed(1)}s\`)
        }
        onTimeUpdate={({ currentTime, duration }) =>
          setProgress(
            \`\${Math.round((currentTime / duration) * 100)}% watched (\${currentTime.toFixed(1)}s)\`,
          )
        }
        onPause={() =>
          setSaved(Math.floor(player.current?.element?.currentTime ?? 0))
        }
        onEnded={() => setProgress("Finished")}
      />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button size="small" onClick={() => player.current?.play()}>
          Play
        </Button>
        <Button
          size="small"
          variant="outline"
          onClick={() => player.current?.seek(0)}
        >
          Restart
        </Button>
      </div>
      <output aria-live="polite">
        {progress} · saved position: {saved}s
      </output>
    </div>
  );
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { MediaPlayer } from "minerva-design";

// CC0 sample from MDN's interactive examples
const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function VideoDemo() {
  return (
    <div style={{ maxWidth: 560 }}>
      <MediaPlayer src={FLOWER} title="Flower" pictureInPicture />
    </div>
  );
}
`})))()}var Le,U,W;function G(){return(G=e((()=>{De(),je(),Pe(),A(),N(),P(),I(),R(),B(),H(),t(),be(),m(),Le=n(),U=f(Object.assign({"./demos/audio.tsx":Te,"./demos/captions.tsx":Oe,"./demos/rates-skip.tsx":Me,"./demos/resume.tsx":E,"./demos/video.tsx":Fe}),Object.assign({"./demos/audio.tsx":Ie,"./demos/captions.tsx":F,"./demos/rates-skip.tsx":L,"./demos/resume.tsx":z,"./demos/video.tsx":V})),W=()=>(0,Le.jsx)(p,{id:`media-player`,demos:U})})))()}G();export{W as default};