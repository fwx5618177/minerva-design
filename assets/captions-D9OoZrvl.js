import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{$ as t,C as n,I as r,S as i,ct as a,h as o,rt as s,t as c,v as l}from"./vue.runtime.esm-bundler-osD-VXbQ.js";import{mn as u,t as d}from"./vue-Dz-vrkuc.js";var f,p,m,h,g,_;function v(){return(v=e((()=>{c(),d(),f={style:{display:`grid`,gap:`12px`,width:`100%`,"min-width":`0`,"max-width":`640px`}},p={"aria-live":`polite`},m=`media-player/sample.mp4`,h=`WEBVTT

00:00.000 --> 00:01.800
A locally hosted playback sample

00:01.800 --> 00:03.600
Video and audio share the <i>same player</i>

00:03.600 --> 00:06.000
Captions follow the playback position.
`,g=`1
00:00:00,000 --> 00:00:01,800
Un exemple de lecture hébergé localement

2
00:00:01,800 --> 00:00:03,600
La vidéo et l’audio partagent le même lecteur

3
00:00:03,600 --> 00:00:06,000
Les sous-titres suivent la lecture.
`,_=n({__name:`captions`,setup(e){let n=[{src:`data:text/vtt;charset=utf-8,${encodeURIComponent(h)}`,srclang:`en`,label:`English`,default:!0},{src:`data:application/x-subrip;charset=utf-8,${encodeURIComponent(g)}`,srclang:`fr`,label:`Français`}],c=t(null);return(e,t)=>(r(),l(`div`,f,[i(s(u),{poster:`media-player/poster.jpg`,src:m,title:`Video playback`,tracks:n,onTrackChange:t[0]||=e=>c.value=e.track?.label??`Off`}),o(`output`,p,` Captions: `+a(c.value??`default track`),1)]))}})})))()}var y;function b(){return(b=e((()=>{v(),y=_})))()}b();export{y as default};