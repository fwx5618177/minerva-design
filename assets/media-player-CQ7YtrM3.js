import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{At as r,Jn as i,Q as ee,Sn as te,Zn as ne,_n as re,et as ie,jt as ae,mn as oe,qn as se,rt as ce,st as a,xt as o}from"./angular-preview-DXAccp5O.js";import{B as le,R as ue,V as de,z as s}from"./ProgressIndicator-DMdtmsv7.js";import{t as c}from"./stylingHooks-PqiNJdev.js";import{ft as fe,pt as pe}from"./io5-nkQQnVMp.js";import{n as me,t as l}from"./mediaPlayer.module.scss-DYScZERc.js";import{l as he,n as u,t as d,u as f}from"./DocPage-CaAF1Q4O.js";var p,m,h,g,_,v;function y(){return(y=e((()=>{oe(),de(),fe(),me(),p=t(),m=n(),h=({name:e})=>(0,m.jsx)(`svg`,{viewBox:`0 0 24 24`,"aria-hidden":`true`,focusable:`false`,children:(0,m.jsx)(`path`,{d:o[e]})}),g=e=>Number.isFinite(e)&&e>0?e:0,_=e=>{let t=e.currentTarget.getBoundingClientRect();return t.width>0?Math.min(1,Math.max(0,(e.clientX-t.left)/t.width)):0},v=({src:e,type:t,mimeType:n,poster:oe,title:o,autoPlay:ue=!1,loop:de=!1,muted:s,defaultMuted:fe,preload:me=`metadata`,crossOrigin:he,startTime:u,playbackRates:d=te,skipSeconds:f=10,controls:v=!0,height:y,aspectRatio:ge=`16 / 9`,pictureInPicture:b=!1,onTimeUpdate:x,onEnded:S,onPlay:_e,onPause:C,onLoadedMetadata:w,onError:T,onRateChange:E,onVolumeChange:ve,"aria-label":D,className:O,style:k,ref:A})=>{let{t:j}=le(),M=ne(e,n,t),N=M===`video`,P=(0,p.useRef)(null),F=(0,p.useRef)(null),I=(0,p.useRef)(null),L=pe(),[R,z]=(0,p.useState)(!0),[B,V]=(0,p.useState)(!1),[H,U]=(0,p.useState)(!1),[W,G]=(0,p.useState)(!1),[K,q]=(0,p.useState)(0),[J,Y]=(0,p.useState)(0),[ye,be]=(0,p.useState)(0),[xe,Se]=(0,p.useState)(1),[X,Z]=(0,p.useState)(s??fe??!1),[Ce,we]=(0,p.useState)(1),[Te,Ee]=(0,p.useState)(!1),[De,Oe]=(0,p.useState)(!1),ke=L&&document.pictureInPictureEnabled===!0,[Q,Ae]=(0,p.useState)({src:e,mutedProp:s});(Q.src!==e||Q.mutedProp!==s)&&(Ae({src:e,mutedProp:s}),Q.src!==e&&(G(!1),V(!1),q(0),Y(0),be(0)),s!==void 0&&Q.mutedProp!==s&&Z(s)),(0,p.useEffect)(()=>{let e=()=>Ee(!!P.current&&document.fullscreenElement===P.current);return document.addEventListener(`fullscreenchange`,e),()=>document.removeEventListener(`fullscreenchange`,e)},[]),(0,p.useEffect)(()=>{let e=F.current;if(!e||!N)return;let t=()=>Oe(!0),n=()=>Oe(!1);return e.addEventListener(`enterpictureinpicture`,t),e.addEventListener(`leavepictureinpicture`,n),()=>{e.removeEventListener(`enterpictureinpicture`,t),e.removeEventListener(`leavepictureinpicture`,n)}},[N,v]);let je=(0,p.useCallback)(e=>{F.current=e},[]),Me=(0,p.useCallback)(()=>{let e=F.current;if(!e)return Promise.resolve();let t=e.play();return Promise.resolve(t).catch(()=>void 0)},[]),Ne=(0,p.useCallback)(()=>F.current?.pause(),[]),$=(0,p.useCallback)(e=>{let t=F.current;if(!t)return;let n=r(e,g(t.duration));t.currentTime=n,q(n)},[]);(0,p.useImperativeHandle)(A,()=>({play:Me,pause:Ne,seek:$,get element(){return F.current}}),[Me,Ne,$]);let Pe=()=>{let e=F.current;e&&(e.paused||e.ended?Me():e.pause())},Fe=()=>{let e=F.current;e&&(e.muted=!e.muted,Z(e.muted))},Ie=e=>{let t=F.current;t&&(t.volume=se(e),t.volume>0&&t.muted&&(t.muted=!1),Se(t.volume),Z(t.muted))},Le=()=>{let e=F.current;e&&(e.playbackRate=ae(e.playbackRate,d),we(e.playbackRate))},Re=()=>{let e=P.current;e&&N&&(document.fullscreenElement===e?document.exitFullscreen?.().catch(()=>void 0):e.requestFullscreen?e.requestFullscreen().catch(()=>void 0):F.current?.webkitEnterFullscreen?.())},ze=()=>{let e=F.current;if(!e)return;let t=document;t.pictureInPictureElement===e?t.exitPictureInPicture?.().catch(()=>void 0):e.requestPictureInPicture?.().catch(()=>void 0)},Be=e=>{if(!v)return;let t=e.target;if((e.key===` `||e.key===`Enter`)&&t.closest(`button`))return;let n=re(e.key,e),r=F.current;if(n&&r&&(n.type!==`fullscreen`||N))switch(e.preventDefault(),n.type){case`toggle`:Pe();break;case`seek`:$(r.currentTime+n.delta);break;case`volume`:Ie((r.muted?0:r.volume)+n.delta);break;case`mute`:Fe();break;case`fullscreen`:Re()}},Ve=e=>{if(J){if(e.type===`pointerdown`)e.currentTarget.setPointerCapture?.(e.pointerId);else if(!e.currentTarget.hasPointerCapture?.(e.pointerId))return;$(_(e)*J)}},He=e=>{if(e.type===`pointerdown`)e.currentTarget.setPointerCapture?.(e.pointerId);else if(!e.currentTarget.hasPointerCapture?.(e.pointerId))return;Ie(_(e))},Ue=e=>{let t=F.current;if(!t||!J)return;let n={ArrowLeft:-5,ArrowDown:-5,ArrowRight:5,ArrowUp:5,PageDown:-f||-10,PageUp:f||10},r;e.key in n?r=t.currentTime+n[e.key]:e.key===`Home`?r=0:e.key===`End`&&(r=J),r!==void 0&&(e.preventDefault(),e.stopPropagation(),$(r))},We=e=>{let t=F.current;if(!t)return;let n=t.muted?0:t.volume,r;e.key===`ArrowRight`||e.key===`ArrowUp`?r=n+.1:e.key===`ArrowLeft`||e.key===`ArrowDown`?r=n-.1:e.key===`Home`?r=0:e.key===`End`&&(r=1),r!==void 0&&(e.preventDefault(),e.stopPropagation(),Ie(r))},Ge=e=>{q(e.currentTime),be(ie(e.buffered,e.currentTime))},Ke={onPlay:()=>{z(!1),V(!1),_e?.()},onPause:()=>{z(!0),U(!1),C?.()},onPlaying:()=>U(!1),onWaiting:()=>U(!0),onCanPlay:()=>U(!1),onEnded:()=>{z(!0),V(!0),U(!1),S?.()},onLoadedMetadata:t=>{let n=t.currentTarget,i=g(n.duration);Y(i),G(!1),I.current!==e&&(I.current=e,u&&u>0&&(n.currentTime=r(u,i))),Ge(n),w?.({duration:i})},onDurationChange:e=>Y(g(e.currentTarget.duration)),onTimeUpdate:e=>{let t=e.currentTarget;Ge(t),x?.({currentTime:t.currentTime,duration:g(t.duration)})},onProgress:e=>Ge(e.currentTarget),onVolumeChange:e=>{let t=e.currentTarget;Se(t.volume),Z(t.muted),ve?.({volume:t.volume,muted:t.muted})},onRateChange:e=>{we(e.currentTarget.playbackRate),E?.(e.currentTarget.playbackRate)},onError:e=>{G(!0),U(!1),T?.(e.currentTarget.error)},ref:je,className:l.media,src:e,autoPlay:ue,loop:de,muted:X,preload:me,crossOrigin:he,...c(`media-player`,`media`)},qe=B?`ended`:R?`paused`:`playing`,Je={...k};N&&v&&(y===void 0?Je.aspectRatio=ge:Je.height=y);let Ye=N?(0,m.jsx)(`video`,{...Ke,poster:oe,playsInline:!0,onClick:v?Pe:void 0,onDoubleClick:v?Re:void 0,style:!v&&y!==void 0?{height:y,width:`auto`}:void 0}):(0,m.jsx)(`audio`,{...Ke});if(!v)return(0,m.jsx)(`div`,{className:a(l.mediaPlayer,l.bare,O),style:k,...c(`media-player`,`root`,{variant:M,status:qe}),children:Ye});let Xe=D??o??j(`mediaPlayer.label`),Ze=ee(K,J),Qe=ee(ye,J),$e=`${i(K,J)} / ${i(J)}`,et=X?0:xe,tt=H&&!W&&(0,m.jsx)(`span`,{className:l.spinner,role:`status`,"aria-label":j(`mediaPlayer.loading`),...c(`media-player`,`spinner`)});return(0,m.jsxs)(`div`,{ref:P,role:`group`,"aria-label":Xe,tabIndex:0,className:a(l.mediaPlayer,N?l.video:l.audio,qe===`playing`&&l.playing,O),style:Je,onKeyDown:Be,...c(`media-player`,`root`,{variant:M,status:qe,loading:H,invalid:W}),children:[Ye,o&&(0,m.jsx)(`div`,{className:l.title,...c(`media-player`,`title`),children:o}),N&&tt,W&&(0,m.jsx)(`div`,{className:l.error,role:`alert`,...c(`media-player`,`error`),children:j(`mediaPlayer.error`)}),(0,m.jsxs)(`div`,{className:l.controls,...c(`media-player`,`controls`),children:[(0,m.jsxs)(`div`,{className:a(l.slider,l.seek),role:`slider`,tabIndex:0,"aria-label":j(`mediaPlayer.seek`),"aria-valuemin":0,"aria-valuemax":Math.round(J),"aria-valuenow":Math.round(K),"aria-valuetext":j(`mediaPlayer.timeOf`,{current:i(K,J),duration:i(J)}),"aria-disabled":!J||void 0,style:{"--_mp-value":`${Ze*100}%`,"--_mp-buffered":`${Qe*100}%`},onPointerDown:Ve,onPointerMove:Ve,onKeyDown:Ue,...c(`media-player`,`seek`),children:[(0,m.jsx)(`span`,{className:l.track}),(0,m.jsx)(`span`,{className:l.buffered}),(0,m.jsx)(`span`,{className:l.fill}),(0,m.jsx)(`span`,{className:l.thumb})]}),(0,m.jsx)(`button`,{type:`button`,className:l.button,"aria-label":j(R?`mediaPlayer.play`:`mediaPlayer.pause`),disabled:W,onClick:Pe,...c(`media-player`,`button`),children:(0,m.jsx)(h,{name:R?`play`:`pause`})}),f>0&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`button`,{type:`button`,className:l.button,"aria-label":j(`mediaPlayer.skipBack`,{count:f}),disabled:W,onClick:()=>$(K-f),...c(`media-player`,`button`),children:(0,m.jsx)(h,{name:`skipBack`})}),(0,m.jsx)(`button`,{type:`button`,className:l.button,"aria-label":j(`mediaPlayer.skipForward`,{count:f}),disabled:W,onClick:()=>$(K+f),...c(`media-player`,`button`),children:(0,m.jsx)(h,{name:`skipForward`})})]}),!N&&tt,(0,m.jsx)(`span`,{className:l.time,...c(`media-player`,`time`),children:$e}),(0,m.jsx)(`span`,{className:l.spacer}),(0,m.jsx)(`button`,{type:`button`,className:l.button,"aria-label":j(X?`mediaPlayer.unmute`:`mediaPlayer.mute`),"aria-pressed":X,onClick:Fe,...c(`media-player`,`button`),children:(0,m.jsx)(h,{name:X||xe===0?`muted`:`volume`})}),(0,m.jsxs)(`div`,{className:a(l.slider,l.volume),role:`slider`,tabIndex:0,"aria-label":j(`mediaPlayer.volume`),"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(et*100),"aria-valuetext":`${Math.round(et*100)}%`,style:{"--_mp-value":`${et*100}%`},onPointerDown:He,onPointerMove:He,onKeyDown:We,...c(`media-player`,`volume`),children:[(0,m.jsx)(`span`,{className:l.track}),(0,m.jsx)(`span`,{className:l.fill}),(0,m.jsx)(`span`,{className:l.thumb})]}),d.length>1&&(0,m.jsx)(`button`,{type:`button`,className:a(l.button,l.rate),"aria-label":j(`mediaPlayer.playbackRate`,{rate:ce(Ce)}),onClick:Le,...c(`media-player`,`button`),children:ce(Ce)}),N&&b&&ke&&(0,m.jsx)(`button`,{type:`button`,className:l.button,"aria-label":j(De?`mediaPlayer.exitPictureInPicture`:`mediaPlayer.pictureInPicture`),"aria-pressed":De,onClick:ze,...c(`media-player`,`button`),children:(0,m.jsx)(h,{name:`pictureInPicture`})}),N&&(0,m.jsx)(`button`,{type:`button`,className:l.button,"aria-label":j(Te?`mediaPlayer.exitFullscreen`:`mediaPlayer.fullscreen`),onClick:Re,...c(`media-player`,`button`),children:(0,m.jsx)(h,{name:Te?`exitFullscreen`:`fullscreen`})})]})]})}})))()}function ge(){return(0,b.jsx)(`div`,{style:{maxWidth:480},children:(0,b.jsx)(v,{src:x,title:`T-Rex roar`,skipSeconds:0})})}var b,x;function S(){return(S=e((()=>{y(),b=n(),x=`https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3`})))()}function _e(){let[e,t]=(0,C.useState)(1);return(0,w.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:560},children:[(0,w.jsx)(v,{src:T,playbackRates:[1,1.5,2],skipSeconds:3,aspectRatio:`4 / 3`,onRateChange:t,"aria-label":`Flower, speed and skip`}),(0,w.jsxs)(`output`,{children:[`Speed: `,e,`×`]})]})}var C,w,T;function E(){return(E=e((()=>{C=t(),y(),w=n(),T=`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`})))()}function ve(){let e=(0,D.useRef)(null),[t,n]=(0,D.useState)(2),[r,i]=(0,D.useState)(`Not started`);return(0,O.jsxs)(`div`,{style:{display:`grid`,gap:12,maxWidth:560},children:[(0,O.jsx)(v,{ref:e,src:k,startTime:t,onLoadedMetadata:({duration:e})=>i(`Resumed at ${t}s of ${e.toFixed(1)}s`),onTimeUpdate:({currentTime:e,duration:t})=>i(`${Math.round(e/t*100)}% watched (${e.toFixed(1)}s)`),onPause:()=>n(Math.floor(e.current?.element?.currentTime??0)),onEnded:()=>i(`Finished`)}),(0,O.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,O.jsx)(s,{size:`small`,onClick:()=>e.current?.play(),children:`Play`}),(0,O.jsx)(s,{size:`small`,variant:`outline`,onClick:()=>e.current?.seek(0),children:`Restart`})]}),(0,O.jsxs)(`output`,{"aria-live":`polite`,children:[r,` · saved position: `,t,`s`]})]})}var D,O,k;function A(){return(A=e((()=>{D=t(),ue(),y(),O=n(),k=`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`})))()}function j(){return(0,M.jsx)(`div`,{style:{maxWidth:560},children:(0,M.jsx)(v,{src:N,title:`Flower`,pictureInPicture:!0})})}var M,N;function P(){return(P=e((()=>{y(),M=n(),N=`https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`})))()}var F;function I(){return(I=e((()=>{F=`import { MediaPlayer } from "minerva-design";

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
`})))()}var U,W,G;function K(){return(K=e((()=>{S(),E(),A(),P(),I(),R(),B(),H(),t(),u(),f(),U=n(),W=he(Object.assign({"./demos/audio.tsx":ge,"./demos/rates-skip.tsx":_e,"./demos/resume.tsx":ve,"./demos/video.tsx":j}),Object.assign({"./demos/audio.tsx":F,"./demos/rates-skip.tsx":L,"./demos/resume.tsx":z,"./demos/video.tsx":V})),G=()=>(0,U.jsx)(d,{id:`media-player`,demos:W})})))()}K();export{G as default};