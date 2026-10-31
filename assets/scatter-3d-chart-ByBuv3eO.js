import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./useTranslation-Dn-CFiHX.js";import{R as a,z as o}from"./ProgressIndicator-BMZ0rR7D.js";import{i as s,n as c,r as l,t as u}from"./Radio-L-_0EAus.js";import{n as d,t as f}from"./Switch-CHbzff3y.js";import{r as p,t as m}from"./ConfigProvider-DxH0x8eF.js";import{i as h,r as ee}from"./Stack-B3Kr9X_e.js";import{l as te,n as ne,t as re,u as ie}from"./DocPage-BNEhhzRL.js";import{a as g,i as _,r as ae}from"./three-d-BJri8njm.js";function oe(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[t,n]=(0,v.useState)(!0),[i,a]=(0,v.useState)(`perspective`),o=(0,v.useMemo)(()=>[{name:e(`backbone1`),data:se,pointSize:9},{name:e(`backbone2`),data:ce,pointSize:9},{name:e(`basePairs`),data:le,pointSize:5,color:`var(--text-secondary-color, #94a3b8)`}],[e]),c=(0,v.useMemo)(()=>({elevation:12,zoom:1.15,projection:i}),[i]);return(0,y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,y.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:16},children:[(0,y.jsx)(f,{size:`small`,checked:t,label:e(`autoRotate`),onChange:n}),(0,y.jsxs)(s,{"aria-label":e(`projection`),direction:`horizontal`,size:`small`,value:i,onChange:e=>a(e),children:[(0,y.jsx)(u,{value:`perspective`,label:e(`perspective`)}),(0,y.jsx)(u,{value:`orthographic`,label:e(`orthographic`)})]})]}),(0,y.jsx)(g,{series:o,autoRotate:t?24:!1,aspect:[.5,.5,1],box:!1,camera:c,height:420,ariaLabel:e(`helixAria`)})]})}var v,y,se,ce,le;function ue(){return(ue=e((()=>{v=t(),i(),c(),l(),d(),_(),y=n(),se=[],ce=[],le=[];for(let e=0;e<=240;e++){let t=e/6,n=t/10*Math.PI*2,r=t*.34;if(se.push([Math.cos(n),Math.sin(n),r]),ce.push([Math.cos(n+2.4),Math.sin(n+2.4),r]),e%6==0)for(let e=1;e<8;e++){let t=n+2.4*e/8,i=1-.25*Math.sin(Math.PI*e/8);le.push([i*Math.cos(t),i*Math.sin(t),r])}}})))()}function de(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function fe(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,b.useRef)(null),[n,i]=(0,b.useState)(null),a=(0,b.useMemo)(()=>[{name:e(`roll`),data:{x:me,y:he,z:ge,value:_e},pointSize:4,format:e=>e.toFixed(2)}],[e]);return(0,x.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,x.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8},children:[Object.keys(ve).map(n=>(0,x.jsx)(o,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t.current?.setCamera({...ve[n],zoom:1,pan:[0,0]}),children:e(`views.${n}`)},n)),(0,x.jsx)(o,{size:`small`,color:`neutral`,variant:`outline`,onClick:()=>t.current?.resetCamera(),children:e(`views.reset`)})]}),(0,x.jsx)(g,{ref:t,series:a,colorScale:`spectral`,colorBar:{title:e(`position`)},aspect:[1,1,1],onCameraChange:i,height:420,ariaLabel:e(`rollAria`)}),(0,x.jsx)(`p`,{"aria-live":`polite`,style:{margin:0,color:`var(--text-secondary-color)`},children:n?e(`cameraState`,{azimuth:Math.round(n.azimuth),elevation:Math.round(n.elevation),zoom:n.zoom.toFixed(2)}):e(`cameraHint`)})]})}var b,x,S,pe,me,he,ge,_e,ve;function ye(){return(ye=e((()=>{b=t(),i(),a(),_(),x=n(),S=4e3,pe=de(21),me=new Float64Array(S),he=new Float64Array(S),ge=new Float64Array(S),_e=new Float64Array(S);for(let e=0;e<S;e++){let t=1.5*Math.PI*(1+2*pe());me[e]=t*Math.cos(t),he[e]=pe()*21,ge[e]=t*Math.sin(t),_e[e]=t}ve={front:{azimuth:0,elevation:0},side:{azimuth:90,elevation:0},top:{azimuth:0,elevation:89}}})))()}function be(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function xe(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,Se.useMemo)(()=>we.map(({key:t},n)=>({name:e(`species.${t}`),data:Ee[n]??[],pointSize:8})),[e]);return(0,Ce.jsx)(g,{series:t,xAxis:{title:e(`sepalLength`)},yAxis:{title:e(`sepalWidth`)},zAxis:{title:e(`petalLength`)},height:420,ariaLabel:e(`clustersAria`)})}var Se,Ce,we,Te,C,w,Ee;function De(){return(De=e((()=>{Se=t(),i(),_(),Ce=n(),we=[{key:`setosa`,mean:[5,3.4,1.5],spread:[.35,.38,.17]},{key:`versicolor`,mean:[5.9,2.8,4.3],spread:[.52,.31,.47]},{key:`virginica`,mean:[6.6,3,5.6],spread:[.64,.32,.55]}],Te=be(11),C=()=>Math.sqrt(-2*Math.log(1-Te()))*Math.cos(2*Math.PI*Te()),w=e=>Math.round(e*10)/10,Ee=we.map(({mean:e,spread:t})=>Array.from({length:60},()=>[w(e[0]+C()*t[0]),w(e[1]+C()*t[1]),w(e[2]+C()*t[2])]))})))()}function Oe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ke(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,Ae.useMemo)(()=>{let t=Ne.map((t,n)=>e(`sensorLabel`,{id:n+1,humidity:t}));return[{name:e(`sensors`),data:{x:D,y:O,z:k,value:A,size:Me,label:t},colorBy:`value`,format:t=>e(`celsius`,{value:t})}]},[e]);return(0,je.jsx)(g,{series:t,aspect:[40,24,9],xAxis:{title:e(`lengthM`)},yAxis:{title:e(`widthM`)},zAxis:{title:e(`heightM`)},colorScale:`coolwarm`,colorBar:{title:e(`temperature`),format:t=>e(`celsius`,{value:t})},camera:{azimuth:25,elevation:28},height:420,ariaLabel:e(`sensorsAria`)})}var Ae,je,T,E,D,O,k,A,Me,Ne;function Pe(){return(Pe=e((()=>{Ae=t(),i(),_(),je=n(),T=300,E=Oe(5),D=new Float64Array(T),O=new Float64Array(T),k=new Float64Array(T),A=new Float64Array(T),Me=new Float64Array(T),Ne=[];for(let e=0;e<T;e++){D[e]=Math.round(E()*400)/10,O[e]=Math.round(E()*240)/10,k[e]=Math.round((.5+E()*8.5)*10)/10;let t=Math.hypot(D[e]-30,O[e]-6,k[e]-1.5);A[e]=Math.round((14+k[e]*.9+9*Math.exp(-(t*t)/60)+E())*10)/10;let n=Math.round(70-A[e]*1.2+E()*8);Ne.push(n),Me[e]=4+(n-35)/4}})))()}function Fe(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ie(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[n,i]=(0,j.useState)(null),a=(0,j.useMemo)(()=>n?ze(n,5):[],[n]),o=(0,j.useMemo)(()=>new Intl.NumberFormat(t.language,{minimumFractionDigits:2,maximumFractionDigits:2}),[t.language]),s=(0,j.useMemo)(()=>new Intl.NumberFormat(t.language,{style:`percent`}),[t.language]),c=t=>e(`docLabel`,{topic:e(`topics.${t.topic}`),n:t.n}),l=(0,j.useMemo)(()=>N.map(t=>F.filter(e=>e.topic===t).map(n=>({x:n.x,y:n.y,z:n.z,label:e(`docLabel`,{topic:e(`topics.${t}`),n:n.n})}))),[e]),u=(0,j.useMemo)(()=>{let t=N.map((t,r)=>({id:t,name:e(`topics.${t}`),data:l[r],pointSize:5,opacity:n?.35:.9}));return n?[...t,{id:`neighbours`,name:e(`neighbours`),color:`var(--danger-color, #dc2626)`,pointSize:10,data:[n,...a.map(e=>e.doc)].map(t=>({x:t.x,y:t.y,z:t.z,label:e(`docLabel`,{topic:e(`topics.${t.topic}`),n:t.n})}))}]:t},[e,l,n,a]);return(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,M.jsx)(g,{series:u,xAxis:{title:e(`component`,{n:1,variance:s.format(P[0])})},yAxis:{title:e(`component`,{n:2,variance:s.format(P[1])})},zAxis:{title:e(`component`,{n:3,variance:s.format(P[2])})},aspect:[1,1,.7],camera:{azimuth:30,elevation:22},height:460,ariaLabel:e(`embeddingsAria`),onPointClick:e=>{if(e.seriesId===`neighbours`)return e.index===0?i(null):i(a[e.index-1].doc);let t=e.seriesId;i(F[N.indexOf(t)*Re+e.index])}}),(0,M.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:n?e(`neighboursOf`,{doc:c(n),list:new Intl.ListFormat(t.language).format(a.map(t=>e(`neighbourItem`,{doc:c(t.doc),distance:o.format(t.distance)})))}):e(`embeddingsHint`)})]})}var j,M,N,Le,P,Re,F,ze;function Be(){return(Be=e((()=>{j=t(),i(),_(),M=n(),N=[`sports`,`politics`,`technology`,`health`,`finance`,`travel`],Le={sports:[-3.2,1.6,.4],politics:[2.6,2.4,-.8],technology:[1.4,-2.6,1.6],health:[-1.8,-1.8,-1.4],finance:[3.4,-.4,.2],travel:[-2.4,2.8,-2.2]},P=[.41,.23,.12],Re=100,F=(()=>{let e=Fe(17),t=()=>Math.sqrt(-2*Math.log(1-e()))*Math.cos(2*Math.PI*e());return N.flatMap(e=>Array.from({length:Re},(n,r)=>{let[i,a,o]=Le[e];return{topic:e,n:r+1,x:i+t()*.75,y:a+t()*.6,z:o+t()*.5}}))})(),ze=(e,t)=>F.filter(t=>t!==e).map(t=>({doc:t,distance:Math.hypot(t.x-e.x,t.y-e.y,t.z-e.z)})).sort((e,t)=>e.distance-t.distance).slice(0,t)})))()}function Ve(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function He(e){let t=e/100,n=e=>Math.max(0,Math.min(255,e)),r=t<=66?255:329.698727446*(t-60)**-.1332047592,i=t<=66?99.4708025861*Math.log(t)-161.1195681661:288.1221695283*(t-60)**-.0755148492,a=t>=66?255:t<=19?0:138.5177312231*Math.log(t-10)-305.0447927307;return[n(r),n(i),n(a)]}function Ue([e,t,n],r){let i=Math.max(0,Math.min(1,r));return Math.round(e*i)<<16|Math.round(t*i)<<8|Math.round(n*i)}function We(){let e=Ve(7),t=()=>Math.sqrt(-2*Math.log(1-e()))*Math.cos(2*Math.PI*e()),n=t=>(e()<.5?-t:t)*Math.log(1-e()),r=(t,n)=>t+(n-t)*e(),i=(e,t)=>{for(;;){let n=e();if(t(n))return n}},a=(e,t,n)=>e<1.6?0:Math.exp(-(((t-.2)/.14)**2))*Math.exp(-Math.abs(n)/.2)*Math.min(1,(e-1.6)/1.5)*.95,o=(e,t,n,r,i,a,o,s)=>{e.x[t]=n,e.y[t]=r,e.z[t]=i,e.size[t]=a,e.color[t]=Ue(He(o),s)},s=(e,t,n,r,i,s,c,l)=>{let u=a(n,Ye(n,r),i);o(e,t,n*Math.cos(r),n*Math.sin(r),i,s,c*(1-.5*u),l*(1-u))},c=L(16e4),l=25*Math.PI/180;for(let t=0;t<16e4;t++){let n=-.42*Math.log(e()*e()),i=2*e()-1,a=2*Math.PI*e(),s=Math.sqrt(1-i*i),u=n*s*Math.cos(a),d=n*s*Math.sin(a);t%2==0&&(u*=2.1,d*=.75),o(c,t,u*Math.cos(l)-d*Math.sin(l),u*Math.sin(l)+d*Math.cos(l),n*i*.55,1.1,r(3e3,4600),r(.4,.85))}let u=L(48e4);for(let t=0;t<48e4;t++){let a=i(()=>-3*Math.log(e()*e()),e=>e>=.6&&e<=16),o=i(()=>2*Math.PI*e(),t=>e()<=.5+.5*Math.exp(-((Ye(a,t)/.7)**2))),c=n(.18+a*.012),l=e()<.01;s(u,t,a,o,c,l?2:1,l?r(3200,4200):r(3800,6500),l?.9:r(.3,.7))}let d=L(26e4),f={x:0,y:0,spread:0,left:0};for(let i=0;i<26e4;i++){let a=3+12.5*e()**.8,o;if(i%20<9){if(f.left<=0){let n=t()*(.3+.025*a),o=z(i%2,a)+n/(a*Math.sin(R))+t()*.04;f={x:a*Math.cos(o),y:a*Math.sin(o),spread:r(.12,.45),left:20+Math.floor(e()*120)}}f.left--;let n=f.x+t()*f.spread,s=f.y+t()*f.spread;a=Math.hypot(n,s),o=Math.atan2(s,n)}else{let e=t()*(.4+.03*a);o=z(i%2,a)+e/(a*Math.sin(R))+t()*.03}let c=e()<.04;s(d,i,a,o,n(.06),c?2.4:1.2,9e3+21e3*e()**1.5,c?1:r(.4,.8))}let p=L(4e4),m=[255,70,150],h=[255,130,190];for(let n=0;n<500;n++){let i=3.2+10.5*e()**.85,a=-.1+t()*.35,o=z(n%2,i)+a/(i*Math.sin(R)),s=i*Math.cos(o),c=i*Math.sin(o),l=r(.04,.12);for(let i=0;i<80;i++){let a=n*80+i,o=e();p.x[a]=s+t()*l,p.y[a]=c+t()*l,p.z[a]=t()*l*.4,p.size[a]=1.8,p.color[a]=Ue([m[0]+(h[0]-m[0])*o,m[1]+(h[1]-m[1])*o,m[2]+(h[2]-m[2])*o],r(.5,1))}}let ee=L(6e4);for(let t=0;t<6e4;t++){let n=i(()=>-4.5*Math.log(e()*e()),e=>e<=22),a=2*e()-1,s=2*Math.PI*e(),c=Math.sqrt(1-a*a);o(ee,t,n*c*Math.cos(s),n*c*Math.sin(s),n*a*.8,1.1,r(3800,5600),r(.2,.45))}return{bulge:c,disk:u,young:d,nebulae:p,halo:ee}}function Ge(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[t,n]=(0,Ke.useState)(1),i=(0,Ke.useMemo)(()=>We(),[]),a=(0,Ke.useMemo)(()=>{let t={pointStyle:`glow`,blend:`additive`};return[{...t,name:e(`galaxy.bulge`),color:`#ffc477`,data:i.bulge,opacity:.11},{...t,name:e(`galaxy.disk`),color:`#ffe2b8`,data:i.disk,opacity:.08},{...t,name:e(`galaxy.arms`),color:`#9cc4ff`,data:i.young,opacity:.1},{...t,name:e(`galaxy.nebulae`),color:`#ff6aa9`,data:i.nebulae,opacity:.14},{...t,name:e(`galaxy.halo`),color:`#c9a77f`,data:i.halo,opacity:.5}]},[e,i]),o=t=>e(`kiloparsecs`,{value:t.toFixed(1)});return(0,I.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,I.jsx)(s,{"aria-label":e(`exposure`),direction:`horizontal`,size:`small`,value:String(t),onChange:e=>n(Number(e)),children:Ze.map(t=>(0,I.jsx)(u,{value:String(t),label:e(`exposureValue`,{value:t})},t))}),(0,I.jsx)(g,{series:a,box:!1,aspect:[1,1,.35],xAxis:{min:-16,max:16,format:o},yAxis:{min:-16,max:16,format:o},zAxis:{min:-5.6,max:5.6,format:o},camera:{azimuth:20,elevation:34,zoom:1.75,fov:28},autoRotate:4,exposure:t,height:500,style:Xe,ariaLabel:e(`galaxyAria`)})]})}var Ke,I,L,R,qe,Je,z,Ye,Xe,Ze;function Qe(){return(Qe=e((()=>{Ke=t(),i(),c(),l(),_(),I=n(),L=e=>({x:new Float32Array(e),y:new Float32Array(e),z:new Float32Array(e),size:new Float32Array(e),color:new Uint32Array(e)}),R=16*Math.PI/180,qe=1/Math.tan(R),Je=2.2,z=(e,t)=>e*Math.PI+Math.log(t/Je)*qe,Ye=(e,t)=>{let n=(t-z(0,e))%Math.PI;return n>Math.PI/2&&(n-=Math.PI),n<-Math.PI/2&&(n+=Math.PI),n*e*Math.sin(R)},Xe={background:`radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)`,borderRadius:12,"--surface-color":`#05070f`,"--surface-elevated-color":`#111729`,"--text-color":`#e6e9f2`,"--text-secondary-color":`#9aa3b8`,"--border-color":`#2a3247`},Ze=[.5,1,2,4]})))()}function $e(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function et(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[n,i]=(0,B.useState)(!0),[a,o]=(0,B.useState)(`height`),[c,l]=(0,B.useState)(null),d=(0,B.useMemo)(()=>({meters:new Intl.NumberFormat(t.language,{style:`unit`,unit:`meter`,maximumFractionDigits:2}),percent:new Intl.NumberFormat(t.language,{style:`percent`}),integer:new Intl.NumberFormat(t.language)}),[t.language]),p=(0,B.useMemo)(()=>[{name:e(`lidarReturns`),data:{x:H.x,y:H.y,z:H.z,value:a===`height`?H.z:H.intensity},colorBy:`value`,pointStyle:`disc`,pointSize:2.5}],[e,a]);return(0,V.jsx)(m,{theme:n?`dark`:`light`,children:(0,V.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`,padding:12,borderRadius:8,border:`1px solid var(--border-color)`,background:`var(--background-color)`,color:`var(--text-color)`},children:[(0,V.jsxs)(h,{gap:16,wrap:!0,align:`center`,children:[(0,V.jsxs)(s,{"aria-label":e(`lidarColor`),direction:`horizontal`,value:a,onChange:e=>o(e),children:[(0,V.jsx)(u,{value:`height`,label:e(`lidarModes.height`)}),(0,V.jsx)(u,{value:`intensity`,label:e(`lidarModes.intensity`)})]}),(0,V.jsx)(f,{size:`small`,checked:n,onChange:i,label:e(`darkTheme`)})]}),(0,V.jsx)(g,{series:p,aspect:[60,16,12],xAxis:{title:e(`lengthM`)},yAxis:{title:e(`widthM`)},zAxis:{title:e(`heightM`)},colorScale:a===`height`?`turbo`:`inferno`,colorBar:{title:e(`lidarModes.${a}`),format:e=>a===`height`?d.meters.format(e):d.percent.format(e)},tooltip:!1,camera:{azimuth:-30,elevation:30,zoom:1.1},height:440,ariaLabel:e(`lidarAria`),onHover:e=>l(e?e.index:null)},n?`dark`:`light`),(0,V.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:c===null?e(`lidarSummary`,{points:d.integer.format(H.x.length)}):e(`lidarHover`,{height:d.meters.format(H.z[c]),intensity:d.percent.format(H.intensity[c])})})]})})}var B,V,tt,H;function nt(){return(nt=e((()=>{B=t(),i(),p(),ee(),c(),l(),d(),_(),V=n(),tt=()=>{let e=$e(42),t=[],n=[],r=[],i=[],a=(a,o,s,c)=>{t.push(a),n.push(o),r.push(s+(e()-.5)*.04),i.push(Math.min(1,Math.max(0,c+(e()-.5)*.1)))};for(let t=0;t<5200;t++){let t=e()*60,n=-7+e()*14,r=Math.abs(n)>4,i=Math.abs(n)<.12&&t%6<3;a(t,n,r?.15:0,i?.9:r?.35:.15)}for(let t=0;t<4200;t++){let n=e()*60,r=e()*12,i=t%2?1:-1,o=n%4>1&&n%4<3&&r%3.5>1&&r%3.5<2.6;a(n,i*(8+e()*.08),r,o?.08:.45)}for(let t=0;t<6;t++){let n=6+t%3*20+(t>2?10:0),r=t>2?5.5:-5.5;for(let t=0;t<60;t++){let t=e()*Math.PI*2;a(n+Math.cos(t)*.2,r+Math.sin(t)*.2,e()*2.6,.4)}for(let t=0;t<320;t++){let t=e()*Math.PI*2,i=Math.acos(2*e()-1),o=1.6+e()*.6;a(n+o*Math.sin(i)*Math.cos(t),r+o*Math.sin(i)*Math.sin(t),4+o*.8*Math.cos(i),.55)}}for(let t=0;t<5;t++){let n=4+t*12+t%2*3,r=t%2?3:-3;for(let i=0;i<300;i++){let o=e(),s=e(),c=i%3;a(n+(o-.5)*4.4,c===1?r+(t%2?-.9:.9):r+(s-.5)*1.8,c===0?1.45:.3+s*1.1,.7)}}for(let t=0;t<4;t++)for(let n=0;n<80;n++)a(10+t*14,t%2?6.5:-6.5,e()*7,.8);return{x:Float32Array.from(t),y:Float32Array.from(n),z:Float32Array.from(r),intensity:Float32Array.from(i)}},H=tt()})))()}function rt(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function it(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[n,i]=(0,U.useState)(`NOVA`),[a,o]=(0,U.useState)(!1),s=(0,U.useMemo)(()=>({percent:new Intl.NumberFormat(t.language,{style:`percent`,maximumFractionDigits:1}),cap:new Intl.NumberFormat(t.language,{style:`currency`,currency:`USD`,notation:`compact`,maximumFractionDigits:1}),decimal:new Intl.NumberFormat(t.language,{minimumFractionDigits:2,maximumFractionDigits:2})}),[t.language]),c=(0,U.useMemo)(()=>G.map(([t])=>({id:t,name:e(`sectors.${t}`),data:ot.filter(e=>e.sector===t).map(t=>({x:t.volatility,y:t.beta,z:t.ret,size:(5+Math.log10(t.cap/1e9)*5)*(t.ticker===n?1.6:1),label:e(`stockLabel`,{ticker:t.ticker,cap:s.cap.format(t.cap)})})),opacity:.85})),[e,s,n]),l=ot.find(e=>e.ticker===n),u=e=>({title:e,format:e=>s.percent.format(e)});return(0,W.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,W.jsx)(f,{size:`small`,checked:a,label:e(`orthographicView`),onChange:o}),(0,W.jsx)(g,{series:c,xAxis:u(e(`annualVolatility`)),yAxis:{title:e(`beta`)},zAxis:u(e(`annualReturn`)),camera:{azimuth:28,elevation:20,projection:a?`orthographic`:`perspective`},height:460,ariaLabel:e(`portfolioAria`),onPointClick:e=>{let t=G.findIndex(([t])=>t===e.seriesId),r=G[t]?.[1][e.index];i(r===n?null:r??null)}}),(0,W.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:l?e(`stockReadout`,{ticker:l.ticker,sector:e(`sectors.${l.sector}`),ret:s.percent.format(l.ret),volatility:s.percent.format(l.volatility),beta:s.decimal.format(l.beta),sharpe:s.decimal.format((l.ret-at)/l.volatility),cap:s.cap.format(l.cap)}):e(`portfolioHint`)})]})}var U,W,G,at,ot;function st(){return(st=e((()=>{U=t(),i(),d(),_(),W=n(),G=[[`technology`,[`NOVA`,`QBIT`,`LUMN`,`SYNK`,`DATA`,`CHIP`,`CLDX`,`ORBI`],.34,1.3,.16],[`healthcare`,[`GENE`,`MEDX`,`CURA`,`VITL`,`BIOM`,`PULS`,`THRX`,`NEUR`],.26,.8,.09],[`energy`,[`PETR`,`SOLR`,`WNDY`,`GRID`,`FUEL`,`HYDR`,`VOLT`,`CRUD`],.31,1,.07],[`financials`,[`BANK`,`LEND`,`PAYX`,`INSR`,`FUND`,`COIN`,`TRST`,`BRKR`],.24,1.1,.1],[`consumer`,[`SHOP`,`MEAL`,`WEAR`,`HOME`,`PETS`,`TOYS`,`BREW`,`TRVL`],.21,.9,.08]],at=.035,ot=(()=>{let e=rt(2024);return G.flatMap(([t,n,r,i,a])=>n.map(n=>{let o=r*(.7+e()*.6);return{ticker:n,sector:t,volatility:o,beta:Math.round(i*(.7+e()*.6)*100)/100,ret:a+(o-r)*.4+(e()-.5)*.08,cap:10**(9.5+e()*2.7)}}))})()})))()}function ct(e){let t=e;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function lt(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[t,n]=(0,ut.useState)(`auto`),[i,a]=(0,ut.useState)(null),o=(0,ut.useMemo)(()=>[{name:e(`knot`),data:{x:pt,y:mt,z:ht},colorBy:`z`,pointSize:2}],[e]),c=e(`starting`);if(i){let n=e(`renderers.${i}`);c=t===`auto`||t===i?e(`rendererInUse`,{backend:n}):e(`rendererFallback`,{requested:e(`renderers.${t}`),backend:n})}return(0,K.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,K.jsx)(s,{"aria-label":e(`renderer`),direction:`horizontal`,size:`small`,value:t,onChange:e=>{n(e),a(null)},children:dt.map(t=>(0,K.jsx)(u,{value:t,label:e(`renderers.${t}`)},t))}),(0,K.jsx)(g,{series:o,renderer:t,onRendererChange:a,colorScale:`turbo`,aspect:[1,1,.45],height:400,ariaLabel:e(`knotAria`)}),(0,K.jsx)(`p`,{role:`status`,style:{margin:0,color:`var(--text-secondary-color)`},children:c})]})}var ut,K,dt,q,ft,pt,mt,ht;function gt(){return(gt=e((()=>{ut=t(),i(),c(),l(),_(),K=n(),dt=[`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`],q=2e5,ft=ct(9),pt=new Float32Array(q),mt=new Float32Array(q),ht=new Float32Array(q);for(let e=0;e<q;e++){let t=ft()*Math.PI*2,n=2+Math.cos(7*t),r=.18*Math.sqrt(-2*Math.log(1-ft())),i=ft()*Math.PI*2;pt[e]=n*Math.cos(3*t)+r*Math.cos(i),mt[e]=n*Math.sin(3*t)+r*Math.sin(i),ht[e]=Math.sin(7*t)+r*Math.cos(i+1)}})))()}function _t(){let{t:e,i18n:t}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),[n,i]=(0,J.useState)(!0),[a,o]=(0,J.useState)(0),[s,c]=(0,J.useState)(null);(0,J.useEffect)(()=>{if(!n)return;let e=window.setInterval(()=>o(e=>e+1),100);return()=>window.clearInterval(e)},[n]);let l=(0,J.useMemo)(()=>({km:new Intl.NumberFormat(t.language,{style:`unit`,unit:`kilometer`,maximumFractionDigits:0}),speed:new Intl.NumberFormat(t.language,{style:`unit`,unit:`kilometer-per-second`,maximumFractionDigits:1}),hours:new Intl.NumberFormat(t.language,{style:`unit`,unit:`hour`,maximumFractionDigits:1}),clock:new Intl.DateTimeFormat(t.language,{hour:`2-digit`,minute:`2-digit`,timeZone:`UTC`,timeZoneName:`short`})}),[t.language]),u=(0,J.useMemo)(()=>St.map(t=>Array.from({length:t.planes*t.perPlane},(n,r)=>e(`satName`,{shell:e(`shells.${t.id}`),n:r+1}))),[e]),d=(0,J.useMemo)(()=>{let t=a*bt;return[{id:`earth`,name:e(`earth`),data:Et,color:`var(--info-color, #0ea5e9)`,pointStyle:`disc`,pointSize:3,opacity:.45},...St.map((n,r)=>({id:n.id,name:e(`shells.${n.id}`),data:{...Tt(n,t),label:u[r]},pointSize:6}))]},[e,a,u]),p=e=>({title:e,min:-44,max:Dt});return(0,Y.jsxs)(`div`,{style:{display:`grid`,gap:12,width:`100%`},children:[(0,Y.jsxs)(h,{gap:16,wrap:!0,align:`center`,children:[(0,Y.jsx)(f,{size:`small`,checked:n,label:e(`play`),onChange:i}),(0,Y.jsx)(`span`,{style:{color:`var(--text-secondary-color)`},children:l.clock.format(xt+a*bt*1e3)})]}),(0,Y.jsx)(g,{series:d,aspect:[1,1,1],xAxis:p(e(`thousandKm`)),yAxis:p(e(`thousandKm`)),zAxis:p(e(`thousandKm`)),camera:{azimuth:35,elevation:25},height:460,ariaLabel:e(`satellitesAria`),onHover:e=>c(St.find(t=>t.id===e?.seriesId)??null)}),(0,Y.jsx)(`output`,{"aria-live":`polite`,style:{color:`var(--text-secondary-color)`},children:s?e(`satHover`,{shell:e(`shells.${s.id}`),altitude:l.km.format(s.altitude),speed:l.speed.format(Math.sqrt(yt/Ct(s))),period:l.hours.format(2*Math.PI/wt(s)/3600)}):e(`satellitesHint`)})]})}var J,Y,vt,yt,bt,xt,St,Ct,wt,Tt,Et,Dt;function Ot(){return(Ot=e((()=>{J=t(),i(),ee(),d(),_(),Y=n(),vt=6371,yt=398600,bt=60,xt=Date.UTC(2026,9,31),St=[{id:`broadband`,altitude:550,inclination:53,planes:6,perPlane:12},{id:`imaging`,altitude:700,inclination:97.6,planes:4,perPlane:8},{id:`navigation`,altitude:20200,inclination:55,planes:6,perPlane:4},{id:`geostationary`,altitude:35786,inclination:0,planes:1,perPlane:12}],Ct=e=>vt+e.altitude,wt=e=>Math.sqrt(yt/Ct(e)**3),Tt=(e,t)=>{let n=e.planes*e.perPlane,r=new Float32Array(n),i=new Float32Array(n),a=new Float32Array(n),o=Ct(e)/1e3,s=e.inclination*Math.PI/180;for(let n=0;n<e.planes;n++){let c=2*Math.PI*n/e.planes;for(let l=0;l<e.perPlane;l++){let u=2*Math.PI*(l+n/e.planes)/e.perPlane+wt(e)*t,d=n*e.perPlane+l;r[d]=o*(Math.cos(c)*Math.cos(u)-Math.sin(c)*Math.sin(u)*Math.cos(s)),i[d]=o*(Math.sin(c)*Math.cos(u)+Math.cos(c)*Math.sin(u)*Math.cos(s)),a[d]=o*Math.sin(u)*Math.sin(s)}}return{x:r,y:i,z:a}},Et=(()=>{let e=vt/1e3,t=new Float32Array(500),n=new Float32Array(500),r=new Float32Array(500);for(let i=0;i<500;i++){let a=1-2*(i+.5)/500,o=i*Math.PI*(3-Math.sqrt(5)),s=Math.sqrt(1-a*a);t[i]=e*s*Math.cos(o),n[i]=e*s*Math.sin(o),r[i]=e*a}return{x:t,y:n,z:r}})(),Dt=44})))()}function kt(){let{t:e}=r(`common`,{keyPrefix:`docs.scatter-3d-chart.data`}),t=(0,At.useMemo)(()=>[{name:e(`trajectory`),data:{x:Mt,y:Nt,z:Pt,value:Ft},lineWidth:1.5,format:t=>e(`seconds`,{value:t.toFixed(2)})}],[e]);return(0,jt.jsx)(ae,{series:t,colorScale:`plasma`,colorBar:{title:e(`time`),format:t=>e(`seconds`,{value:t})},camera:{azimuth:20,elevation:18},height:440,ariaLabel:e(`lorenzAria`)})}var At,jt,X,Z,Mt,Nt,Pt,Ft,Q,$;function It(){return(It=e((()=>{At=t(),i(),_(),jt=n(),X=12e3,Z=.006,Mt=new Float64Array(X),Nt=new Float64Array(X),Pt=new Float64Array(X),Ft=new Float64Array(X),Q=e=>[10*(e[1]-e[0]),e[0]*(28-e[2])-e[1],e[0]*e[1]-8/3*e[2]],$=[1,1,1];for(let e=0;e<X;e++){let t=Q($),n=Q([$[0]+t[0]*Z/2,$[1]+t[1]*Z/2,$[2]+t[2]*Z/2]),r=Q([$[0]+n[0]*Z/2,$[1]+n[1]*Z/2,$[2]+n[2]*Z/2]),i=Q([$[0]+r[0]*Z,$[1]+r[1]*Z,$[2]+r[2]*Z]);$=[$[0]+(t[0]+2*n[0]+2*r[0]+i[0])*Z/6,$[1]+(t[1]+2*n[1]+2*r[1]+i[1])*Z/6,$[2]+(t[2]+2*n[2]+2*r[2]+i[2])*Z/6],Mt[e]=$[0],Nt[e]=$[1],Pt[e]=$[2],Ft[e]=e*Z}})))()}var Lt;function Rt(){return(Rt=e((()=>{Lt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import {
  Scatter3DChart,
  type Chart3DProjection,
  type Scatter3DSeries,
} from "minerva-design/charts";

// A DNA double helix: two backbones and the base pairs between them
const TURNS = 4;
const STEPS = 10 * TURNS;
const strandA: [number, number, number][] = [];
const strandB: [number, number, number][] = [];
const pairs: [number, number, number][] = [];
for (let i = 0; i <= STEPS * 6; i++) {
  const t = i / 6;
  const angle = (t / 10) * Math.PI * 2;
  const z = t * 0.34;
  strandA.push([Math.cos(angle), Math.sin(angle), z]);
  strandB.push([Math.cos(angle + 2.4), Math.sin(angle + 2.4), z]);
  if (i % 6 === 0) {
    for (let k = 1; k < 8; k++) {
      const a = angle + (2.4 * k) / 8;
      const r = 1 - 0.25 * Math.sin((Math.PI * k) / 8);
      pairs.push([r * Math.cos(a), r * Math.sin(a), z]);
    }
  }
}

export default function AutoRotateDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [rotate, setRotate] = useState(true);
  const [projection, setProjection] =
    useState<Chart3DProjection>("perspective");

  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("backbone1"), data: strandA, pointSize: 9 },
      { name: t("backbone2"), data: strandB, pointSize: 9 },
      {
        name: t("basePairs"),
        data: pairs,
        pointSize: 5,
        color: "var(--text-secondary-color, #94a3b8)",
      },
    ],
    [t],
  );
  const camera = useMemo(
    () => ({ elevation: 12, zoom: 1.15, projection }),
    [projection],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <Switch
          size="small"
          checked={rotate}
          label={t("autoRotate")}
          onChange={setRotate}
        />
        <RadioGroup
          aria-label={t("projection")}
          direction="horizontal"
          size="small"
          value={projection}
          onChange={(value) => setProjection(value as Chart3DProjection)}
        >
          <Radio value="perspective" label={t("perspective")} />
          <Radio value="orthographic" label={t("orthographic")} />
        </RadioGroup>
      </div>
      <Scatter3DChart
        series={series}
        autoRotate={rotate ? 24 : false}
        aspect={[0.5, 0.5, 1]}
        box={false}
        camera={camera}
        height={420}
        ariaLabel={t("helixAria")}
      />
    </div>
  );
}
`})))()}var zt;function Bt(){return(Bt=e((()=>{zt=`import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  Scatter3DChart,
  type Chart3DCameraState,
  type Chart3DHandle,
  type Scatter3DSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A "Swiss roll": a sheet rolled up in 3D, colored by its position along
// the roll (the classic test set of manifold learning)
const COUNT = 4000;
const random = mulberry32(21);
const x = new Float64Array(COUNT);
const y = new Float64Array(COUNT);
const z = new Float64Array(COUNT);
const along = new Float64Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const t = 1.5 * Math.PI * (1 + 2 * random());
  x[i] = t * Math.cos(t);
  y[i] = random() * 21;
  z[i] = t * Math.sin(t);
  along[i] = t;
}

const VIEWS = {
  front: { azimuth: 0, elevation: 0 },
  side: { azimuth: 90, elevation: 0 },
  top: { azimuth: 0, elevation: 89 },
} as const;

export default function CameraDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const chart = useRef<Chart3DHandle>(null);
  const [camera, setCamera] = useState<Chart3DCameraState | null>(null);

  const series = useMemo(
    (): Scatter3DSeries[] => [
      {
        name: t("roll"),
        data: { x, y, z, value: along },
        pointSize: 4,
        format: (value) => value.toFixed(2),
      },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(Object.keys(VIEWS) as (keyof typeof VIEWS)[]).map((view) => (
          <Button
            key={view}
            size="small"
            color="neutral"
            variant="outline"
            onClick={() =>
              chart.current?.setCamera({ ...VIEWS[view], zoom: 1, pan: [0, 0] })
            }
          >
            {t(\`views.\${view}\`)}
          </Button>
        ))}
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => chart.current?.resetCamera()}
        >
          {t("views.reset")}
        </Button>
      </div>
      <Scatter3DChart
        ref={chart}
        series={series}
        colorScale="spectral"
        colorBar={{ title: t("position") }}
        aspect={[1, 1, 1]}
        onCameraChange={setCamera}
        height={420}
        ariaLabel={t("rollAria")}
      />
      <p
        aria-live="polite"
        style={{ margin: 0, color: "var(--text-secondary-color)" }}
      >
        {camera
          ? t("cameraState", {
              azimuth: Math.round(camera.azimuth),
              elevation: Math.round(camera.elevation),
              zoom: camera.zoom.toFixed(2),
            })
          : t("cameraHint")}
      </p>
    </div>
  );
}
`})))()}var Vt;function Ht(){return(Ht=e((()=>{Vt=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Three flower species measured on three features (an iris-like data set):
// mean and spread of the sepal length, sepal width and petal length, in cm
const SPECIES = [
  { key: "setosa", mean: [5.0, 3.4, 1.5], spread: [0.35, 0.38, 0.17] },
  { key: "versicolor", mean: [5.9, 2.8, 4.3], spread: [0.52, 0.31, 0.47] },
  { key: "virginica", mean: [6.6, 3.0, 5.6], spread: [0.64, 0.32, 0.55] },
] as const;

const random = mulberry32(11);
// Box-Muller transform: normally distributed samples
const normal = () =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
const round = (value: number) => Math.round(value * 10) / 10;
const flowers = SPECIES.map(({ mean, spread }) =>
  Array.from(
    { length: 60 },
    () =>
      [
        round(mean[0] + normal() * spread[0]),
        round(mean[1] + normal() * spread[1]),
        round(mean[2] + normal() * spread[2]),
      ] as const,
  ),
);

export default function ClustersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo(
    (): Scatter3DSeries[] =>
      SPECIES.map(({ key }, i) => ({
        name: t(\`species.\${key}\`),
        data: flowers[i] ?? [],
        pointSize: 8,
      })),
    [t],
  );

  return (
    <Scatter3DChart
      series={series}
      xAxis={{ title: t("sepalLength") }}
      yAxis={{ title: t("sepalWidth") }}
      zAxis={{ title: t("petalLength") }}
      height={420}
      ariaLabel={t("clustersAria")}
    />
  );
}
`})))()}var Ut;function Wt(){return(Wt=e((()=>{Ut=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 300 sensors in a 40 × 24 × 9 m warehouse: warmer under the roof and
// around a heater; the dot size shows the relative humidity
const COUNT = 300;
const random = mulberry32(5);
const x = new Float64Array(COUNT);
const y = new Float64Array(COUNT);
const z = new Float64Array(COUNT);
const temperature = new Float64Array(COUNT);
const size = new Float64Array(COUNT);
const humidity: number[] = [];
for (let i = 0; i < COUNT; i++) {
  x[i] = Math.round(random() * 400) / 10;
  y[i] = Math.round(random() * 240) / 10;
  z[i] = Math.round((0.5 + random() * 8.5) * 10) / 10;
  const heater = Math.hypot(x[i]! - 30, y[i]! - 6, z[i]! - 1.5);
  temperature[i] =
    Math.round(
      (14 + z[i]! * 0.9 + 9 * Math.exp(-(heater * heater) / 60) + random()) *
        10,
    ) / 10;
  const rh = Math.round(70 - temperature[i]! * 1.2 + random() * 8);
  humidity.push(rh);
  size[i] = 4 + (rh - 35) / 4;
}

export default function ColorByValueDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo((): Scatter3DSeries[] => {
    const label = humidity.map((rh, i) =>
      t("sensorLabel", { id: i + 1, humidity: rh }),
    );
    return [
      {
        name: t("sensors"),
        data: { x, y, z, value: temperature, size, label },
        colorBy: "value",
        format: (value) => t("celsius", { value }),
      },
    ];
  }, [t]);

  return (
    <Scatter3DChart
      series={series}
      aspect={[40, 24, 9]}
      xAxis={{ title: t("lengthM") }}
      yAxis={{ title: t("widthM") }}
      zAxis={{ title: t("heightM") }}
      colorScale="coolwarm"
      colorBar={{
        title: t("temperature"),
        format: (value) => t("celsius", { value }),
      }}
      camera={{ azimuth: 25, elevation: 28 }}
      height={420}
      ariaLabel={t("sensorsAria")}
    />
  );
}
`})))()}var Gt;function Kt(){return(Kt=e((()=>{Gt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TOPICS = [
  "sports",
  "politics",
  "technology",
  "health",
  "finance",
  "travel",
] as const;
type Topic = (typeof TOPICS)[number];

// center of each topic in the space of the first three principal components
const CENTERS: Record<Topic, [number, number, number]> = {
  sports: [-3.2, 1.6, 0.4],
  politics: [2.6, 2.4, -0.8],
  technology: [1.4, -2.6, 1.6],
  health: [-1.8, -1.8, -1.4],
  finance: [3.4, -0.4, 0.2],
  travel: [-2.4, 2.8, -2.2],
};
// share of the variance explained by each component
const VARIANCE = [0.41, 0.23, 0.12];
const PER_TOPIC = 100;

interface Doc {
  topic: Topic;
  n: number;
  x: number;
  y: number;
  z: number;
}

// 600 article embeddings projected on 3 components, 100 per topic
const DOCS: Doc[] = (() => {
  const random = mulberry32(17);
  const gauss = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  return TOPICS.flatMap((topic) =>
    Array.from({ length: PER_TOPIC }, (_, n) => {
      const [cx, cy, cz] = CENTERS[topic];
      return {
        topic,
        n: n + 1,
        x: cx + gauss() * 0.75,
        y: cy + gauss() * 0.6,
        z: cz + gauss() * 0.5,
      };
    }),
  );
})();

/** The k documents closest to \`doc\` (Euclidean distance) */
const nearest = (doc: Doc, k: number) =>
  DOCS.filter((other) => other !== doc)
    .map((other) => ({
      doc: other,
      distance: Math.hypot(other.x - doc.x, other.y - doc.y, other.z - doc.z),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);

export default function EmbeddingsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [picked, setPicked] = useState<Doc | null>(null);
  const neighbours = useMemo(
    () => (picked ? nearest(picked, 5) : []),
    [picked],
  );
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );
  const title = (doc: Doc) =>
    t("docLabel", { topic: t(\`topics.\${doc.topic}\`), n: doc.n });

  const topicData = useMemo(
    () =>
      TOPICS.map((topic) =>
        DOCS.filter((doc) => doc.topic === topic).map((doc) => ({
          x: doc.x,
          y: doc.y,
          z: doc.z,
          label: t("docLabel", { topic: t(\`topics.\${topic}\`), n: doc.n }),
        })),
      ),
    [t],
  );

  const series = useMemo((): Scatter3DSeries[] => {
    const topics = TOPICS.map((topic, i): Scatter3DSeries => ({
      id: topic,
      name: t(\`topics.\${topic}\`),
      data: topicData[i]!,
      pointSize: 5,
      opacity: picked ? 0.35 : 0.9,
    }));
    if (!picked) return topics;
    // the picked article and its neighbours, drawn on top in a larger size
    return [
      ...topics,
      {
        id: "neighbours",
        name: t("neighbours"),
        color: "var(--danger-color, #dc2626)",
        pointSize: 10,
        data: [picked, ...neighbours.map((item) => item.doc)].map((doc) => ({
          x: doc.x,
          y: doc.y,
          z: doc.z,
          label: t("docLabel", { topic: t(\`topics.\${doc.topic}\`), n: doc.n }),
        })),
      },
    ];
  }, [t, topicData, picked, neighbours]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Scatter3DChart
        series={series}
        xAxis={{
          title: t("component", {
            n: 1,
            variance: percent.format(VARIANCE[0]),
          }),
        }}
        yAxis={{
          title: t("component", {
            n: 2,
            variance: percent.format(VARIANCE[1]),
          }),
        }}
        zAxis={{
          title: t("component", {
            n: 3,
            variance: percent.format(VARIANCE[2]),
          }),
        }}
        aspect={[1, 1, 0.7]}
        camera={{ azimuth: 30, elevation: 22 }}
        height={460}
        ariaLabel={t("embeddingsAria")}
        onPointClick={(event) => {
          if (event.seriesId === "neighbours") {
            if (event.index === 0) return setPicked(null);
            return setPicked(neighbours[event.index - 1]!.doc);
          }
          const topic = event.seriesId as Topic;
          setPicked(DOCS[TOPICS.indexOf(topic) * PER_TOPIC + event.index]!);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {picked
          ? t("neighboursOf", {
              doc: title(picked),
              list: new Intl.ListFormat(i18n.language).format(
                neighbours.map((item) =>
                  t("neighbourItem", {
                    doc: title(item.doc),
                    distance: decimal.format(item.distance),
                  }),
                ),
              ),
            })
          : t("embeddingsHint")}
      </output>
    </div>
  );
}
`})))()}var qt;function Jt(){return(Jt=e((()=>{qt=`import { useMemo, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Color of a black body at \`kelvin\` (0-255 channels, Tanner Helland's fit) */
function blackbody(kelvin: number): [number, number, number] {
  const t = kelvin / 100;
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g =
    t <= 66
      ? 99.4708025861 * Math.log(t) - 161.1195681661
      : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b =
    t >= 66
      ? 255
      : t <= 19
        ? 0
        : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [clamp(r), clamp(g), clamp(b)];
}

/** \`0xRRGGBB\` of a color scaled by a brightness (additive light) */
function rgb([r, g, b]: [number, number, number], brightness: number) {
  const k = Math.max(0, Math.min(1, brightness));
  return (
    (Math.round(r * k) << 16) | (Math.round(g * k) << 8) | Math.round(b * k)
  );
}

interface Population {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  size: Float32Array;
  color: Uint32Array;
}

const population = (count: number): Population => ({
  x: new Float32Array(count),
  y: new Float32Array(count),
  z: new Float32Array(count),
  size: new Float32Array(count),
  color: new Uint32Array(count),
});

/** Two logarithmic arms (kpc): pitch angle and radius where they start */
const PITCH = (16 * Math.PI) / 180;
const WIND = 1 / Math.tan(PITCH);
const ARM_START = 2.2;
/** Angle of arm \`k\` (0 or 1) at radius \`r\` */
const armAngle = (k: number, r: number) =>
  k * Math.PI + Math.log(r / ARM_START) * WIND;
/**
 * Signed distance (kpc) to the nearest arm across it; positive on the
 * inner (concave) side, where the dust lanes lie
 */
const armOffset = (r: number, angle: number) => {
  let d = (angle - armAngle(0, r)) % Math.PI;
  if (d > Math.PI / 2) d -= Math.PI;
  if (d < -Math.PI / 2) d += Math.PI;
  return d * r * Math.sin(PITCH);
};

/**
 * A barred spiral galaxy of 1,000,000 stars (deterministic): a warm bulge,
 * an old disk, young blue stars and pink HII regions along two logarithmic
 * arms, dust lanes on the inner edge of the arms, and a faint halo.
 */
function galaxy() {
  const random = mulberry32(7);
  const normal = () =>
    Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  // two-sided exponential (thin disk heights)
  const laplace = (h: number) =>
    (random() < 0.5 ? -h : h) * Math.log(1 - random());
  const between = (a: number, b: number) => a + (b - a) * random();
  /** Draws until \`accept\` takes the value (rejection sampling) */
  const sample = (draw: () => number, accept: (value: number) => boolean) => {
    for (;;) {
      const value = draw();
      if (accept(value)) return value;
    }
  };
  /** Dust absorption (0-1) at a radius, offset to the arm and height */
  const dust = (r: number, offset: number, z: number) =>
    r < 1.6
      ? 0
      : Math.exp(-(((offset - 0.2) / 0.14) ** 2)) *
        Math.exp(-Math.abs(z) / 0.2) *
        Math.min(1, (r - 1.6) / 1.5) *
        0.95;
  const place = (
    p: Population,
    i: number,
    x: number,
    y: number,
    z: number,
    size: number,
    kelvin: number,
    brightness: number,
  ) => {
    p.x[i] = x;
    p.y[i] = y;
    p.z[i] = z;
    p.size[i] = size;
    p.color[i] = rgb(blackbody(kelvin), brightness);
  };
  /** A disk star: dimmed and reddened inside a dust lane */
  const diskStar = (
    p: Population,
    i: number,
    r: number,
    angle: number,
    z: number,
    size: number,
    kelvin: number,
    brightness: number,
  ) => {
    const a = dust(r, armOffset(r, angle), z);
    place(
      p,
      i,
      r * Math.cos(angle),
      r * Math.sin(angle),
      z,
      size,
      kelvin * (1 - 0.5 * a),
      brightness * (1 - a),
    );
  };

  // bulge and bar: old K / G stars
  const bulge = population(160_000);
  const bar = (25 * Math.PI) / 180;
  for (let i = 0; i < 160_000; i++) {
    const r = -0.42 * Math.log(random() * random());
    const u = 2 * random() - 1;
    const phi = 2 * Math.PI * random();
    const s = Math.sqrt(1 - u * u);
    let x = r * s * Math.cos(phi);
    let y = r * s * Math.sin(phi);
    if (i % 2 === 0) {
      // the bar: stretched along its axis
      x *= 2.1;
      y *= 0.75;
    }
    place(
      bulge,
      i,
      x * Math.cos(bar) - y * Math.sin(bar),
      x * Math.sin(bar) + y * Math.cos(bar),
      r * u * 0.55,
      1.1,
      between(3000, 4600),
      between(0.4, 0.85),
    );
  }

  // old disk: exponential, slightly crowded on the arms
  const disk = population(480_000);
  for (let i = 0; i < 480_000; i++) {
    const r = sample(
      () => -3 * Math.log(random() * random()),
      (v) => v >= 0.6 && v <= 16,
    );
    const angle = sample(
      () => 2 * Math.PI * random(),
      (a) => random() <= 0.5 + 0.5 * Math.exp(-((armOffset(r, a) / 0.7) ** 2)),
    );
    const z = laplace(0.18 + r * 0.012);
    const giant = random() < 0.01;
    diskStar(
      disk,
      i,
      r,
      angle,
      z,
      giant ? 2 : 1,
      giant ? between(3200, 4200) : between(3800, 6500),
      giant ? 0.9 : between(0.3, 0.7),
    );
  }

  // young stars along the arms: blue-white, a very thin disk, mostly in
  // associations (knots) strung along the arms
  const young = population(260_000);
  let knot = { x: 0, y: 0, spread: 0, left: 0 };
  for (let i = 0; i < 260_000; i++) {
    let r = ARM_START + 0.8 + 12.5 * random() ** 0.8;
    let angle: number;
    if (i % 20 < 9) {
      if (knot.left <= 0) {
        const across = normal() * (0.3 + 0.025 * r);
        const center =
          armAngle(i % 2, r) + across / (r * Math.sin(PITCH)) + normal() * 0.04;
        knot = {
          x: r * Math.cos(center),
          y: r * Math.sin(center),
          spread: between(0.12, 0.45),
          left: 20 + Math.floor(random() * 120),
        };
      }
      knot.left--;
      const kx = knot.x + normal() * knot.spread;
      const ky = knot.y + normal() * knot.spread;
      r = Math.hypot(kx, ky);
      angle = Math.atan2(ky, kx);
    } else {
      const across = normal() * (0.4 + 0.03 * r);
      angle =
        armAngle(i % 2, r) + across / (r * Math.sin(PITCH)) + normal() * 0.03;
    }
    const bright = random() < 0.04;
    diskStar(
      young,
      i,
      r,
      angle,
      laplace(0.06),
      bright ? 2.4 : 1.2,
      9000 + 21000 * random() ** 1.5,
      bright ? 1 : between(0.4, 0.8),
    );
  }

  // HII regions: pink clumps just outside the dust lanes
  const nebulae = population(40_000);
  const pink: [number, number, number] = [255, 70, 150];
  const rose: [number, number, number] = [255, 130, 190];
  for (let c = 0; c < 500; c++) {
    const r = 3.2 + 10.5 * random() ** 0.85;
    const across = -0.1 + normal() * 0.35;
    const center = armAngle(c % 2, r) + across / (r * Math.sin(PITCH));
    const cx = r * Math.cos(center);
    const cy = r * Math.sin(center);
    const spread = between(0.04, 0.12);
    for (let k = 0; k < 80; k++) {
      const i = c * 80 + k;
      const mix = random();
      nebulae.x[i] = cx + normal() * spread;
      nebulae.y[i] = cy + normal() * spread;
      nebulae.z[i] = normal() * spread * 0.4;
      nebulae.size[i] = 1.8;
      nebulae.color[i] = rgb(
        [
          pink[0] + (rose[0] - pink[0]) * mix,
          pink[1] + (rose[1] - pink[1]) * mix,
          pink[2] + (rose[2] - pink[2]) * mix,
        ],
        between(0.5, 1),
      );
    }
  }

  // halo: a faint sphere of old stars
  const halo = population(60_000);
  for (let i = 0; i < 60_000; i++) {
    const r = sample(
      () => -4.5 * Math.log(random() * random()),
      (v) => v <= 22,
    );
    const u = 2 * random() - 1;
    const phi = 2 * Math.PI * random();
    const s = Math.sqrt(1 - u * u);
    place(
      halo,
      i,
      r * s * Math.cos(phi),
      r * s * Math.sin(phi),
      r * u * 0.8,
      1.1,
      between(3800, 5600),
      between(0.2, 0.45),
    );
  }

  return { bulge, disk, young, nebulae, halo };
}

/** Night-sky colors of the chart (its theme reads these variables) */
const SPACE = {
  background: "radial-gradient(ellipse at 50% 45%, #0e1430 0%, #05070f 70%)",
  borderRadius: 12,
  "--surface-color": "#05070f",
  "--surface-elevated-color": "#111729",
  "--text-color": "#e6e9f2",
  "--text-secondary-color": "#9aa3b8",
  "--border-color": "#2a3247",
} as CSSProperties;

/** Exposures offered (the light of the additive stars, tone mapped) */
const EXPOSURES = [0.5, 1, 2, 4] as const;

export default function GalaxyDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [exposure, setExposure] = useState(1);
  // ~150 ms: generated once, when the demo mounts
  const stars = useMemo(() => galaxy(), []);
  const series = useMemo((): Scatter3DSeries[] => {
    const common = {
      pointStyle: "glow",
      blend: "additive",
    } as const;
    return [
      {
        ...common,
        name: t("galaxy.bulge"),
        color: "#ffc477",
        data: stars.bulge,
        opacity: 0.11,
      },
      {
        ...common,
        name: t("galaxy.disk"),
        color: "#ffe2b8",
        data: stars.disk,
        opacity: 0.08,
      },
      {
        ...common,
        name: t("galaxy.arms"),
        color: "#9cc4ff",
        data: stars.young,
        opacity: 0.1,
      },
      {
        ...common,
        name: t("galaxy.nebulae"),
        color: "#ff6aa9",
        data: stars.nebulae,
        opacity: 0.14,
      },
      {
        ...common,
        name: t("galaxy.halo"),
        color: "#c9a77f",
        data: stars.halo,
        opacity: 0.5,
      },
    ];
  }, [t, stars]);

  const kpc = (value: number) => t("kiloparsecs", { value: value.toFixed(1) });
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("exposure")}
        direction="horizontal"
        size="small"
        value={String(exposure)}
        onChange={(value) => setExposure(Number(value))}
      >
        {EXPOSURES.map((value) => (
          <Radio
            key={value}
            value={String(value)}
            label={t("exposureValue", { value })}
          />
        ))}
      </RadioGroup>
      <Scatter3DChart
        series={series}
        box={false}
        aspect={[1, 1, 0.35]}
        xAxis={{ min: -16, max: 16, format: kpc }}
        yAxis={{ min: -16, max: 16, format: kpc }}
        zAxis={{ min: -5.6, max: 5.6, format: kpc }}
        camera={{ azimuth: 20, elevation: 34, zoom: 1.75, fov: 28 }}
        autoRotate={4}
        exposure={exposure}
        height={500}
        style={SPACE}
        ariaLabel={t("galaxyAria")}
      />
    </div>
  );
}
`})))()}var Yt;function Xt(){return(Xt=e((()=>{Yt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ConfigProvider,
  HStack,
  Radio,
  RadioGroup,
  Switch,
} from "minerva-design";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type ColorMode = "height" | "intensity";

// A 60 m street scanned by a lidar: road with lane markings, sidewalks,
// facades with windows, trees, parked cars and lamp posts (~13k returns).
// Intensity is the strength of the return: markings and metal reflect most.
const scan = () => {
  const random = mulberry32(42);
  const xs: number[] = [];
  const ys: number[] = [];
  const zs: number[] = [];
  const intensity: number[] = [];
  const add = (x: number, y: number, z: number, i: number) => {
    xs.push(x);
    ys.push(y);
    zs.push(z + (random() - 0.5) * 0.04);
    intensity.push(Math.min(1, Math.max(0, i + (random() - 0.5) * 0.1)));
  };
  // ground: road, lane markings and raised sidewalks
  for (let n = 0; n < 5200; n++) {
    const x = random() * 60;
    const y = -7 + random() * 14;
    const sidewalk = Math.abs(y) > 4;
    const marking = Math.abs(y) < 0.12 && x % 6 < 3;
    add(x, y, sidewalk ? 0.15 : 0, marking ? 0.9 : sidewalk ? 0.35 : 0.15);
  }
  // facades on both sides, glass windows return little light
  for (let n = 0; n < 4200; n++) {
    const x = random() * 60;
    const z = random() * 12;
    const side = n % 2 ? 1 : -1;
    const window = x % 4 > 1 && x % 4 < 3 && z % 3.5 > 1 && z % 3.5 < 2.6;
    add(x, side * (8 + random() * 0.08), z, window ? 0.08 : 0.45);
  }
  // trees: trunk and a round canopy
  for (let tree = 0; tree < 6; tree++) {
    const cx = 6 + (tree % 3) * 20 + (tree > 2 ? 10 : 0);
    const cy = tree > 2 ? 5.5 : -5.5;
    for (let n = 0; n < 60; n++) {
      const a = random() * Math.PI * 2;
      add(cx + Math.cos(a) * 0.2, cy + Math.sin(a) * 0.2, random() * 2.6, 0.4);
    }
    for (let n = 0; n < 320; n++) {
      const a = random() * Math.PI * 2;
      const b = Math.acos(2 * random() - 1);
      const r = 1.6 + random() * 0.6;
      add(
        cx + r * Math.sin(b) * Math.cos(a),
        cy + r * Math.sin(b) * Math.sin(a),
        4 + r * 0.8 * Math.cos(b),
        0.55,
      );
    }
  }
  // parked cars: the visible top and sides of a box
  for (let car = 0; car < 5; car++) {
    const cx = 4 + car * 12 + (car % 2) * 3;
    const cy = car % 2 ? 3 : -3;
    for (let n = 0; n < 300; n++) {
      const u = random();
      const v = random();
      const face = n % 3;
      const x = cx + (u - 0.5) * 4.4;
      const y = face === 1 ? cy + (car % 2 ? -0.9 : 0.9) : cy + (v - 0.5) * 1.8;
      const z = face === 0 ? 1.45 : 0.3 + v * 1.1;
      add(x, y, z, 0.7);
    }
  }
  // lamp posts
  for (let post = 0; post < 4; post++) {
    for (let n = 0; n < 80; n++) {
      add(10 + post * 14, post % 2 ? 6.5 : -6.5, random() * 7, 0.8);
    }
  }
  return {
    x: Float32Array.from(xs),
    y: Float32Array.from(ys),
    z: Float32Array.from(zs),
    intensity: Float32Array.from(intensity),
  };
};
const CLOUD = scan();

export default function LidarDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [dark, setDark] = useState(true);
  const [mode, setMode] = useState<ColorMode>("height");
  const [hovered, setHovered] = useState<number | null>(null);
  const formats = useMemo(
    () => ({
      meters: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "meter",
        maximumFractionDigits: 2,
      }),
      percent: new Intl.NumberFormat(i18n.language, { style: "percent" }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );

  const series = useMemo(
    (): Scatter3DSeries[] => [
      {
        name: t("lidarReturns"),
        data: {
          x: CLOUD.x,
          y: CLOUD.y,
          z: CLOUD.z,
          value: mode === "height" ? CLOUD.z : CLOUD.intensity,
        },
        colorBy: "value",
        pointStyle: "disc",
        pointSize: 2.5,
      },
    ],
    [t, mode],
  );

  return (
    <ConfigProvider theme={dark ? "dark" : "light"}>
      <div
        style={{
          display: "grid",
          gap: 12,
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <HStack gap={16} wrap align="center">
          <RadioGroup
            aria-label={t("lidarColor")}
            direction="horizontal"
            value={mode}
            onChange={(value) => setMode(value as ColorMode)}
          >
            <Radio value="height" label={t("lidarModes.height")} />
            <Radio value="intensity" label={t("lidarModes.intensity")} />
          </RadioGroup>
          <Switch
            size="small"
            checked={dark}
            onChange={setDark}
            label={t("darkTheme")}
          />
        </HStack>
        <Scatter3DChart
          // the chart reads the theme of its scope when it is created
          key={dark ? "dark" : "light"}
          series={series}
          aspect={[60, 16, 12]}
          xAxis={{ title: t("lengthM") }}
          yAxis={{ title: t("widthM") }}
          zAxis={{ title: t("heightM") }}
          colorScale={mode === "height" ? "turbo" : "inferno"}
          colorBar={{
            title: t(\`lidarModes.\${mode}\`),
            format: (value) =>
              mode === "height"
                ? formats.meters.format(value)
                : formats.percent.format(value),
          }}
          tooltip={false}
          camera={{ azimuth: -30, elevation: 30, zoom: 1.1 }}
          height={440}
          ariaLabel={t("lidarAria")}
          onHover={(event) => setHovered(event ? event.index : null)}
        />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {hovered === null
            ? t("lidarSummary", {
                points: formats.integer.format(CLOUD.x.length),
              })
            : t("lidarHover", {
                height: formats.meters.format(CLOUD.z[hovered]!),
                intensity: formats.percent.format(CLOUD.intensity[hovered]!),
              })}
        </output>
      </div>
    </ConfigProvider>
  );
}
`})))()}var Zt;function Qt(){return(Qt=e((()=>{Zt=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Sector =
  "technology" | "healthcare" | "energy" | "financials" | "consumer";

// fictional tickers, with the typical volatility, beta and return of the sector
const SECTORS: [Sector, string[], number, number, number][] = [
  [
    "technology",
    ["NOVA", "QBIT", "LUMN", "SYNK", "DATA", "CHIP", "CLDX", "ORBI"],
    0.34,
    1.3,
    0.16,
  ],
  [
    "healthcare",
    ["GENE", "MEDX", "CURA", "VITL", "BIOM", "PULS", "THRX", "NEUR"],
    0.26,
    0.8,
    0.09,
  ],
  [
    "energy",
    ["PETR", "SOLR", "WNDY", "GRID", "FUEL", "HYDR", "VOLT", "CRUD"],
    0.31,
    1.0,
    0.07,
  ],
  [
    "financials",
    ["BANK", "LEND", "PAYX", "INSR", "FUND", "COIN", "TRST", "BRKR"],
    0.24,
    1.1,
    0.1,
  ],
  [
    "consumer",
    ["SHOP", "MEAL", "WEAR", "HOME", "PETS", "TOYS", "BREW", "TRVL"],
    0.21,
    0.9,
    0.08,
  ],
];
const RISK_FREE = 0.035;

interface Stock {
  ticker: string;
  sector: Sector;
  volatility: number;
  beta: number;
  ret: number;
  cap: number; // market capitalization, USD
}

const STOCKS: Stock[] = (() => {
  const random = mulberry32(2024);
  return SECTORS.flatMap(([sector, tickers, vol, beta, ret]) =>
    tickers.map((ticker) => {
      const volatility = vol * (0.7 + random() * 0.6);
      return {
        ticker,
        sector,
        volatility,
        beta: Math.round(beta * (0.7 + random() * 0.6) * 100) / 100,
        // riskier names of a sector earn a little more on average
        ret: ret + (volatility - vol) * 0.4 + (random() - 0.5) * 0.08,
        cap: 10 ** (9.5 + random() * 2.7),
      };
    }),
  );
})();

export default function PortfolioRiskDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [pinned, setPinned] = useState<string | null>("NOVA");
  const [orthographic, setOrthographic] = useState(false);
  const formats = useMemo(
    () => ({
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      cap: new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      decimal: new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    }),
    [i18n.language],
  );

  const series = useMemo(
    (): Scatter3DSeries[] =>
      SECTORS.map(([sector]) => ({
        id: sector,
        name: t(\`sectors.\${sector}\`),
        data: STOCKS.filter((stock) => stock.sector === sector).map(
          (stock) => ({
            x: stock.volatility,
            y: stock.beta,
            z: stock.ret,
            // dot size follows the market capitalization (log scale)
            size:
              (5 + Math.log10(stock.cap / 1e9) * 5) *
              (stock.ticker === pinned ? 1.6 : 1),
            label: t("stockLabel", {
              ticker: stock.ticker,
              cap: formats.cap.format(stock.cap),
            }),
          }),
        ),
        opacity: 0.85,
      })),
    [t, formats, pinned],
  );

  const stock = STOCKS.find((item) => item.ticker === pinned);
  const percentAxis = (title: string) => ({
    title,
    format: (value: number) => formats.percent.format(value),
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={orthographic}
        label={t("orthographicView")}
        onChange={setOrthographic}
      />
      <Scatter3DChart
        series={series}
        xAxis={percentAxis(t("annualVolatility"))}
        yAxis={{ title: t("beta") }}
        zAxis={percentAxis(t("annualReturn"))}
        camera={{
          azimuth: 28,
          elevation: 20,
          projection: orthographic ? "orthographic" : "perspective",
        }}
        height={460}
        ariaLabel={t("portfolioAria")}
        onPointClick={(event) => {
          const sector = SECTORS.findIndex(([id]) => id === event.seriesId);
          const ticker = SECTORS[sector]?.[1][event.index];
          setPinned(ticker === pinned ? null : (ticker ?? null));
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {stock
          ? t("stockReadout", {
              ticker: stock.ticker,
              sector: t(\`sectors.\${stock.sector}\`),
              ret: formats.percent.format(stock.ret),
              volatility: formats.percent.format(stock.volatility),
              beta: formats.decimal.format(stock.beta),
              sharpe: formats.decimal.format(
                (stock.ret - RISK_FREE) / stock.volatility,
              ),
              cap: formats.cap.format(stock.cap),
            })
          : t("portfolioHint")}
      </output>
    </div>
  );
}
`})))()}var $t;function en(){return(en=e((()=>{$t=`import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  Scatter3DChart,
  type ChartRendererKind,
  type ChartRendererPreference,
  type Scatter3DSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PREFERENCES: ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

// 200,000 points scattered around a (3, 7) torus knot
const COUNT = 200_000;
const random = mulberry32(9);
const x = new Float32Array(COUNT);
const y = new Float32Array(COUNT);
const z = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const t = random() * Math.PI * 2;
  const r = 2 + Math.cos(7 * t);
  const spread = 0.18 * Math.sqrt(-2 * Math.log(1 - random()));
  const a = random() * Math.PI * 2;
  x[i] = r * Math.cos(3 * t) + spread * Math.cos(a);
  y[i] = r * Math.sin(3 * t) + spread * Math.sin(a);
  z[i] = Math.sin(7 * t) + spread * Math.cos(a + 1);
}

export default function RendererDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [preference, setPreference] = useState<ChartRendererPreference>("auto");
  const [actual, setActual] = useState<ChartRendererKind | null>(null);

  const series = useMemo(
    (): Scatter3DSeries[] => [
      { name: t("knot"), data: { x, y, z }, colorBy: "z", pointSize: 2 },
    ],
    [t],
  );

  let status = t("starting");
  if (actual) {
    const backend = t(\`renderers.\${actual}\`);
    status =
      preference === "auto" || preference === actual
        ? t("rendererInUse", { backend })
        : t("rendererFallback", {
            requested: t(\`renderers.\${preference}\`),
            backend,
          });
  }

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("renderer")}
        direction="horizontal"
        size="small"
        value={preference}
        onChange={(value) => {
          setPreference(value as ChartRendererPreference);
          setActual(null);
        }}
      >
        {PREFERENCES.map((kind) => (
          <Radio key={kind} value={kind} label={t(\`renderers.\${kind}\`)} />
        ))}
      </RadioGroup>
      <Scatter3DChart
        series={series}
        renderer={preference}
        onRendererChange={setActual}
        colorScale="turbo"
        aspect={[1, 1, 0.45]}
        height={400}
        ariaLabel={t("knotAria")}
      />
      <p
        role="status"
        style={{ margin: 0, color: "var(--text-secondary-color)" }}
      >
        {status}
      </p>
    </div>
  );
}
`})))()}var tn;function nn(){return(nn=e((()=>{tn=`import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Switch } from "minerva-design";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

const EARTH_RADIUS = 6371; // km
const MU = 398600; // km³/s², gravitational parameter of the Earth
const STEP_SECONDS = 60; // simulated time per tick
const EPOCH = Date.UTC(2026, 9, 31);

interface Shell {
  id: "broadband" | "imaging" | "navigation" | "geostationary";
  altitude: number; // km
  inclination: number; // degrees
  planes: number;
  perPlane: number;
}

const SHELLS: Shell[] = [
  {
    id: "broadband",
    altitude: 550,
    inclination: 53,
    planes: 6,
    perPlane: 12,
  },
  { id: "imaging", altitude: 700, inclination: 97.6, planes: 4, perPlane: 8 },
  {
    id: "navigation",
    altitude: 20200,
    inclination: 55,
    planes: 6,
    perPlane: 4,
  },
  {
    id: "geostationary",
    altitude: 35786,
    inclination: 0,
    planes: 1,
    perPlane: 12,
  },
];

const radiusOf = (shell: Shell) => EARTH_RADIUS + shell.altitude;
const motionOf = (shell: Shell) => Math.sqrt(MU / radiusOf(shell) ** 3); // rad/s

/** Positions (thousands of km) of the satellites of a shell at time \`seconds\` */
const positions = (shell: Shell, seconds: number) => {
  const count = shell.planes * shell.perPlane;
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const z = new Float32Array(count);
  const r = radiusOf(shell) / 1000;
  const inc = (shell.inclination * Math.PI) / 180;
  for (let p = 0; p < shell.planes; p++) {
    const node = (2 * Math.PI * p) / shell.planes; // right ascension of the plane
    for (let s = 0; s < shell.perPlane; s++) {
      // neighboring planes are phased so the satellites do not line up
      const u =
        (2 * Math.PI * (s + p / shell.planes)) / shell.perPlane +
        motionOf(shell) * seconds;
      const i = p * shell.perPlane + s;
      x[i] =
        r *
        (Math.cos(node) * Math.cos(u) -
          Math.sin(node) * Math.sin(u) * Math.cos(inc));
      y[i] =
        r *
        (Math.sin(node) * Math.cos(u) +
          Math.cos(node) * Math.sin(u) * Math.cos(inc));
      z[i] = r * Math.sin(u) * Math.sin(inc);
    }
  }
  return { x, y, z };
};

// the Earth: 500 points spread evenly on a sphere (Fibonacci lattice)
const EARTH = (() => {
  const count = 500;
  const r = EARTH_RADIUS / 1000;
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const z = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const h = 1 - (2 * (i + 0.5)) / count;
    const a = i * Math.PI * (3 - Math.sqrt(5));
    const ring = Math.sqrt(1 - h * h);
    x[i] = r * ring * Math.cos(a);
    y[i] = r * ring * Math.sin(a);
    z[i] = r * h;
  }
  return { x, y, z };
})();

const LIMIT = 44; // thousands of km

export default function SatellitesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [playing, setPlaying] = useState(true);
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState<Shell | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setTick((n) => n + 1), 100);
    return () => window.clearInterval(timer);
  }, [playing]);

  const formats = useMemo(
    () => ({
      km: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "kilometer",
        maximumFractionDigits: 0,
      }),
      speed: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "kilometer-per-second",
        maximumFractionDigits: 1,
      }),
      hours: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "hour",
        maximumFractionDigits: 1,
      }),
      clock: new Intl.DateTimeFormat(i18n.language, {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
      }),
    }),
    [i18n.language],
  );
  const labels = useMemo(
    () =>
      SHELLS.map((shell) =>
        Array.from({ length: shell.planes * shell.perPlane }, (_, i) =>
          t("satName", { shell: t(\`shells.\${shell.id}\`), n: i + 1 }),
        ),
      ),
    [t],
  );

  const series = useMemo((): Scatter3DSeries[] => {
    const seconds = tick * STEP_SECONDS;
    return [
      {
        id: "earth",
        name: t("earth"),
        data: EARTH,
        color: "var(--info-color, #0ea5e9)",
        pointStyle: "disc",
        pointSize: 3,
        opacity: 0.45,
      },
      ...SHELLS.map((shell, i): Scatter3DSeries => ({
        id: shell.id,
        name: t(\`shells.\${shell.id}\`),
        data: { ...positions(shell, seconds), label: labels[i] },
        pointSize: 6,
      })),
    ];
  }, [t, tick, labels]);

  const axis = (title: string) => ({ title, min: -LIMIT, max: LIMIT });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} wrap align="center">
        <Switch
          size="small"
          checked={playing}
          label={t("play")}
          onChange={setPlaying}
        />
        <span style={{ color: "var(--text-secondary-color)" }}>
          {formats.clock.format(EPOCH + tick * STEP_SECONDS * 1000)}
        </span>
      </HStack>
      <Scatter3DChart
        series={series}
        aspect={[1, 1, 1]}
        xAxis={axis(t("thousandKm"))}
        yAxis={axis(t("thousandKm"))}
        zAxis={axis(t("thousandKm"))}
        camera={{ azimuth: 35, elevation: 25 }}
        height={460}
        ariaLabel={t("satellitesAria")}
        onHover={(event) =>
          setHovered(
            SHELLS.find((shell) => shell.id === event?.seriesId) ?? null,
          )
        }
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {hovered
          ? t("satHover", {
              shell: t(\`shells.\${hovered.id}\`),
              altitude: formats.km.format(hovered.altitude),
              speed: formats.speed.format(Math.sqrt(MU / radiusOf(hovered))),
              period: formats.hours.format(
                (2 * Math.PI) / motionOf(hovered) / 3600,
              ),
            })
          : t("satellitesHint")}
      </output>
    </div>
  );
}
`})))()}var rn;function an(){return(an=e((()=>{rn=`import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Line3DChart, type Line3DSeries } from "minerva-design/charts";

// The Lorenz attractor (σ = 10, ρ = 28, β = 8/3), integrated with RK4
const STEPS = 12_000;
const DT = 0.006;
const x = new Float64Array(STEPS);
const y = new Float64Array(STEPS);
const z = new Float64Array(STEPS);
const time = new Float64Array(STEPS);
const derivative = (p: readonly [number, number, number]) =>
  [
    10 * (p[1] - p[0]),
    p[0] * (28 - p[2]) - p[1],
    p[0] * p[1] - (8 / 3) * p[2],
  ] as const;
let p: [number, number, number] = [1, 1, 1];
for (let i = 0; i < STEPS; i++) {
  const k1 = derivative(p);
  const k2 = derivative([
    p[0] + (k1[0] * DT) / 2,
    p[1] + (k1[1] * DT) / 2,
    p[2] + (k1[2] * DT) / 2,
  ]);
  const k3 = derivative([
    p[0] + (k2[0] * DT) / 2,
    p[1] + (k2[1] * DT) / 2,
    p[2] + (k2[2] * DT) / 2,
  ]);
  const k4 = derivative([
    p[0] + k3[0] * DT,
    p[1] + k3[1] * DT,
    p[2] + k3[2] * DT,
  ]);
  p = [
    p[0] + ((k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) * DT) / 6,
    p[1] + ((k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) * DT) / 6,
    p[2] + ((k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) * DT) / 6,
  ];
  x[i] = p[0];
  y[i] = p[1];
  z[i] = p[2];
  time[i] = i * DT;
}

export default function TrajectoryDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo(
    (): Line3DSeries[] => [
      {
        name: t("trajectory"),
        data: { x, y, z, value: time },
        lineWidth: 1.5,
        format: (value) => t("seconds", { value: value.toFixed(2) }),
      },
    ],
    [t],
  );

  return (
    <Line3DChart
      series={series}
      colorScale="plasma"
      colorBar={{
        title: t("time"),
        format: (value) => t("seconds", { value }),
      }}
      camera={{ azimuth: 20, elevation: 18 }}
      height={440}
      ariaLabel={t("lorenzAria")}
    />
  );
}
`})))()}var on,sn,cn;function ln(){return(ln=e((()=>{ue(),ye(),De(),Pe(),Be(),Qe(),nt(),st(),gt(),Ot(),It(),Rt(),Bt(),Ht(),Wt(),Kt(),Jt(),Xt(),Qt(),en(),nn(),an(),t(),ne(),ie(),on=n(),sn=te(Object.assign({"./demos/auto-rotate.tsx":oe,"./demos/camera.tsx":fe,"./demos/clusters.tsx":xe,"./demos/color-by-value.tsx":ke,"./demos/embeddings.tsx":Ie,"./demos/galaxy.tsx":Ge,"./demos/lidar.tsx":et,"./demos/portfolio-risk.tsx":it,"./demos/renderer.tsx":lt,"./demos/satellites.tsx":_t,"./demos/trajectory.tsx":kt}),Object.assign({"./demos/auto-rotate.tsx":Lt,"./demos/camera.tsx":zt,"./demos/clusters.tsx":Vt,"./demos/color-by-value.tsx":Ut,"./demos/embeddings.tsx":Gt,"./demos/galaxy.tsx":qt,"./demos/lidar.tsx":Yt,"./demos/portfolio-risk.tsx":Zt,"./demos/renderer.tsx":$t,"./demos/satellites.tsx":tn,"./demos/trajectory.tsx":rn})),cn=()=>(0,on.jsx)(re,{id:`scatter-3d-chart`,demos:sn})})))()}ln();export{cn as default};