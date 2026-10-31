import{a as e,n as t}from"./rolldown-runtime-B0Z9INg1.js";import{i as n,r}from"./native-preview-BRFLbKzw.js";import{It as i,ut as a}from"./angular-preview-l4x8c_2r.js";import{B as o,V as s}from"./ProgressIndicator-BMZ0rR7D.js";import{t as c}from"./stylingHooks-PqiNJdev.js";import{n as l,t as u}from"./Avatar-DD2T57eG.js";import{n as d,t as f}from"./avatarGroup.module.scss-CVUVoyda.js";import{l as p,n as m,t as h,u as g}from"./DocPage-4JD4uRu8.js";import{D as _,w as v}from"./lu-BxR8fmLv.js";var y,b,x;function S(){return(S=t((()=>{i(),s(),f(),y=e(n(),1),b=r(),x=y.memo(({count:e,max:t,className:n=``,children:r,"aria-label":i,ref:s,...l})=>{let{t:u}=o(),f=y.Children.toArray(r),p=t===void 0?f:f.slice(0,t),m=(e??0)+f.length-p.length;return(0,b.jsxs)(`div`,{ref:s,role:`group`,className:a(d.avatarGroup,n),"aria-label":i??(m>0?u(`avatar.groupWithMore`,{count:m}):u(`avatar.group`)),...l,...c(`avatar-group`,`root`),children:[p.map((e,t)=>(0,b.jsx)(`div`,{className:d.avatarGroupItem,...c(`avatar-group`,`item`),children:e},y.isValidElement(e)?e.key??t:t)),m>0?(0,b.jsxs)(`div`,{className:d.count,"aria-hidden":`true`,...c(`avatar-group`,`count`),children:[`+`,m]}):null]})})})))()}function C(){return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(l,{src:`https://randomuser.me/api/portraits/women/44.jpg`,name:`Emma Wilson`}),(0,w.jsx)(l,{name:`Liam Chen`}),(0,w.jsx)(l,{src:`data:image/png;base64,broken`,name:`Noah Park`}),(0,w.jsx)(l,{})]})}var w;function T(){return(T=t((()=>{u(),w=r()})))()}function E(){return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(l,{name:`Ada Lovelace`,size:`xsmall`}),(0,D.jsx)(l,{name:`张三`,size:40}),(0,D.jsx)(l,{src:`data:image/png;base64,broken`,name:`Grace Hopper`}),(0,D.jsx)(l,{"aria-label":`Guest`,children:(0,D.jsx)(v,{"aria-hidden":!0})}),(0,D.jsx)(l,{name:`VIP`,fallback:`★`,shape:`rounded`,size:`xlarge`}),(0,D.jsxs)(x,{max:2,children:[(0,D.jsx)(l,{name:`Olivia`,stacked:!0}),(0,D.jsx)(l,{name:`James`,stacked:!0}),(0,D.jsx)(l,{name:`Sophia`,stacked:!0}),(0,D.jsx)(l,{name:`Lucas`,stacked:!0})]})]})}var D;function O(){return(O=t((()=>{u(),S(),_(),D=r()})))()}function k(){return(0,A.jsx)(x,{count:5,children:j.map(e=>(0,A.jsx)(l,{name:e.name,src:e.src,stacked:!0},e.name))})}var A,j;function M(){return(M=t((()=>{u(),S(),A=r(),j=[{name:`Olivia`,src:`https://randomuser.me/api/portraits/women/68.jpg`},{name:`James`,src:`https://randomuser.me/api/portraits/men/75.jpg`},{name:`Sophia`},{name:`Lucas`}]})))()}function N(){return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(l,{shape:`circle`,name:`Circle`}),(0,P.jsx)(l,{shape:`rounded`,name:`Rounded`}),(0,P.jsx)(l,{shape:`square`,name:`Square`}),(0,P.jsx)(l,{shape:`rounded`,src:`https://randomuser.me/api/portraits/men/32.jpg`,name:`Noah Martin`})]})}var P;function F(){return(F=t((()=>{u(),P=r()})))()}function I(){return(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(l,{size:`small`,name:`Small`}),(0,L.jsx)(l,{size:`medium`,name:`Medium`}),(0,L.jsx)(l,{size:`large`,name:`Large`})]})}var L;function R(){return(R=t((()=>{u(),L=r()})))()}var z;function B(){return(B=t((()=>{z=`import { Avatar } from "minerva-design";

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
`})))()}var V;function H(){return(H=t((()=>{V=`import { Avatar, AvatarGroup } from "minerva-design";
import { LuUser } from "react-icons/lu";

export default function FallbackDemo() {
  return (
    <>
      <Avatar name="Ada Lovelace" size="xsmall" />
      <Avatar name="张三" size={40} />
      <Avatar src="data:image/png;base64,broken" name="Grace Hopper" />
      <Avatar aria-label="Guest">
        <LuUser aria-hidden />
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
`})))()}var Y,X,Z;function Q(){return(Q=t((()=>{T(),O(),M(),F(),R(),B(),H(),W(),K(),J(),n(),m(),g(),Y=r(),X=p(Object.assign({"./demos/basic.tsx":C,"./demos/fallback.tsx":E,"./demos/group.tsx":k,"./demos/shapes.tsx":N,"./demos/sizes.tsx":I}),Object.assign({"./demos/basic.tsx":z,"./demos/fallback.tsx":V,"./demos/group.tsx":U,"./demos/shapes.tsx":G,"./demos/sizes.tsx":q})),Z=()=>(0,Y.jsx)(h,{id:`avatar`,demos:X})})))()}Q();export{Z as default};