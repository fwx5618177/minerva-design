import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{V as i,X as a}from"./icons-BnhBUHMa.js";import{Nn as o,it as s}from"./angular-preview-Bvv51cL-.js";import{B as c,V as l}from"./ProgressIndicator-CXNTCbma.js";import{t as u}from"./stylingHooks-PqiNJdev.js";import{n as d,t as f}from"./Avatar-BgWWYRQR.js";import{n as p,t as m}from"./avatarGroup.module.scss-DCe_jWly.js";import{l as h,n as g,t as _,u as v}from"./DocPage--2U8TgOE.js";var y,b,x;function S(){return(S=t((()=>{o(),l(),m(),y=e(n(),1),b=r(),x=y.memo(({count:e,max:t,className:n=``,children:r,"aria-label":i,ref:a,...o})=>{let{t:l}=c(),d=y.Children.toArray(r),f=t===void 0?d:d.slice(0,t),m=(e??0)+d.length-f.length;return(0,b.jsxs)(`div`,{ref:a,role:`group`,className:s(p.avatarGroup,n),"aria-label":i??(m>0?l(`avatar.groupWithMore`,{count:m}):l(`avatar.group`)),...o,...u(`avatar-group`,`root`),children:[f.map((e,t)=>(0,b.jsx)(`div`,{className:p.avatarGroupItem,...u(`avatar-group`,`item`),children:e},y.isValidElement(e)?e.key??t:t)),m>0?(0,b.jsxs)(`div`,{className:p.count,"aria-hidden":`true`,...u(`avatar-group`,`count`),children:[`+`,m]}):null]})})})))()}function C(){return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(d,{src:`https://randomuser.me/api/portraits/women/44.jpg`,name:`Emma Wilson`}),(0,w.jsx)(d,{name:`Liam Chen`}),(0,w.jsx)(d,{src:`data:image/png;base64,broken`,name:`Noah Park`}),(0,w.jsx)(d,{})]})}var w;function T(){return(T=t((()=>{f(),w=r()})))()}function E(){return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(d,{name:`Ada Lovelace`,size:`xsmall`}),(0,D.jsx)(d,{name:`张三`,size:40}),(0,D.jsx)(d,{src:`data:image/png;base64,broken`,name:`Grace Hopper`}),(0,D.jsx)(d,{"aria-label":`Guest`,children:(0,D.jsx)(i,{size:`1em`,"aria-hidden":!0})}),(0,D.jsx)(d,{name:`VIP`,fallback:`★`,shape:`rounded`,size:`xlarge`}),(0,D.jsxs)(x,{max:2,children:[(0,D.jsx)(d,{name:`Olivia`,stacked:!0}),(0,D.jsx)(d,{name:`James`,stacked:!0}),(0,D.jsx)(d,{name:`Sophia`,stacked:!0}),(0,D.jsx)(d,{name:`Lucas`,stacked:!0})]})]})}var D;function O(){return(O=t((()=>{a(),f(),S(),D=r()})))()}function k(){return(0,A.jsx)(x,{count:5,children:j.map(e=>(0,A.jsx)(d,{name:e.name,src:e.src,stacked:!0},e.name))})}var A,j;function M(){return(M=t((()=>{f(),S(),A=r(),j=[{name:`Olivia`,src:`https://randomuser.me/api/portraits/women/68.jpg`},{name:`James`,src:`https://randomuser.me/api/portraits/men/75.jpg`},{name:`Sophia`},{name:`Lucas`}]})))()}function N(){return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(d,{shape:`circle`,name:`Circle`}),(0,P.jsx)(d,{shape:`rounded`,name:`Rounded`}),(0,P.jsx)(d,{shape:`square`,name:`Square`}),(0,P.jsx)(d,{shape:`rounded`,src:`https://randomuser.me/api/portraits/men/32.jpg`,name:`Noah Martin`})]})}var P;function F(){return(F=t((()=>{f(),P=r()})))()}function I(){return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(d,{size:`small`,name:`Small`}),(0,L.jsx)(d,{size:`medium`,name:`Medium`}),(0,L.jsx)(d,{size:`large`,name:`Large`})]})}var L;function R(){return(R=t((()=>{f(),L=r()})))()}var z;function B(){return(B=t((()=>{z=`import { Avatar } from "minerva-design";

export default function BasicDemo() {
  return (
    <>
      <Avatar
        src="https://randomuser.me/api/portraits/women/44.jpg"
        name="Emma Wilson"
      />
      <Avatar name="Liam Chen" />
      {/* The image cannot be decoded, so the initial is shown instead */}
      <Avatar src="data:image/png;base64,broken" name="Noah Park" />
      <Avatar />
    </>
  );
}
`})))()}var V;function H(){return(H=t((()=>{V=`import { UserIcon } from "minerva-design/icons";
import { Avatar, AvatarGroup } from "minerva-design";

export default function FallbackDemo() {
  return (
    <>
      <Avatar name="Ada Lovelace" size="xsmall" />
      <Avatar name="张三" size={40} />
      <Avatar src="data:image/png;base64,broken" name="Grace Hopper" />
      <Avatar aria-label="Guest">
        <UserIcon size="1em" aria-hidden />
      </Avatar>
      <Avatar name="VIP" fallback="★" shape="rounded" size="xlarge" />
      <AvatarGroup max={2}>
        <Avatar name="Olivia" stacked />
        <Avatar name="James" stacked />
        <Avatar name="Sophia" stacked />
        <Avatar name="Lucas" stacked />
      </AvatarGroup>
    </>
  );
}
`})))()}var U;function W(){return(W=t((()=>{U=`import { Avatar, AvatarGroup } from "minerva-design";

const people = [
  { name: "Olivia", src: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "James", src: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Sophia" },
  { name: "Lucas" },
];

export default function GroupDemo() {
  return (
    <AvatarGroup count={5}>
      {people.map((person) => (
        <Avatar key={person.name} name={person.name} src={person.src} stacked />
      ))}
    </AvatarGroup>
  );
}
`})))()}var G;function K(){return(K=t((()=>{G=`import { Avatar } from "minerva-design";

export default function ShapesDemo() {
  return (
    <>
      <Avatar shape="circle" name="Circle" />
      <Avatar shape="rounded" name="Rounded" />
      <Avatar shape="square" name="Square" />
      <Avatar
        shape="rounded"
        src="https://randomuser.me/api/portraits/men/32.jpg"
        name="Noah Martin"
      />
    </>
  );
}
`})))()}var q;function J(){return(J=t((()=>{q=`import { Avatar } from "minerva-design";

export default function SizesDemo() {
  return (
    <>
      <Avatar size="small" name="Small" />
      <Avatar size="medium" name="Medium" />
      <Avatar size="large" name="Large" />
    </>
  );
}
`})))()}var Y,X,Z;function Q(){return(Q=t((()=>{T(),O(),M(),F(),R(),B(),H(),W(),K(),J(),n(),g(),v(),Y=r(),X=h(Object.assign({"./demos/basic.tsx":C,"./demos/fallback.tsx":E,"./demos/group.tsx":k,"./demos/shapes.tsx":N,"./demos/sizes.tsx":I}),Object.assign({"./demos/basic.tsx":z,"./demos/fallback.tsx":V,"./demos/group.tsx":U,"./demos/shapes.tsx":G,"./demos/sizes.tsx":q})),Z=()=>(0,Y.jsx)(_,{id:`avatar`,demos:X})})))()}Q();export{Z as default};