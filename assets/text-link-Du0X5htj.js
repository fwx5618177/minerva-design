import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./TextLink-3oh0lhjd.js";import{l as a,n as o,t as s,u as c}from"./DocPage-4JD4uRu8.js";function l(){return(0,u.jsx)(r,{asChild:!0,variant:`subtle`,children:(0,u.jsx)(d,{href:`#articles`,children:`Articles`})})}var u,d;function f(){return(f=e((()=>{i(),u=n(),d=({children:e,...t})=>(0,u.jsx)(`a`,{...t,children:e})})))()}function p(){return(0,m.jsxs)(`div`,{style:{display:`grid`,gap:16,width:320},children:[(0,m.jsxs)(`p`,{style:{margin:0},children:[`Read the `,(0,m.jsx)(r,{href:`#guide`,children:`community guide`}),` first.`]}),(0,m.jsx)(r,{href:`#all`,variant:`subtle`,children:`View all reviews`}),(0,m.jsxs)(`div`,{children:[(0,m.jsx)(r,{href:`#account`,variant:`action`,children:`Account settings`}),(0,m.jsx)(r,{href:`#security`,variant:`action`,children:`Security`})]})]})}var m;function h(){return(h=e((()=>{i(),m=n()})))()}var g;function _(){return(_=e((()=>{g=`import { TextLink } from "minerva-design";

// Stand-in for a router link component (e.g. react-router's <Link>)
const RouterLink = ({ children, ...props }: React.ComponentProps<"a">) => (
  <a {...props}>{children}</a>
);

export default function AsChildDemo() {
  return (
    <TextLink asChild variant="subtle">
      <RouterLink href="#articles">Articles</RouterLink>
    </TextLink>
  );
}
`})))()}var v;function y(){return(y=e((()=>{v=`import { TextLink } from "minerva-design";

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: 320 }}>
      <p style={{ margin: 0 }}>
        Read the <TextLink href="#guide">community guide</TextLink> first.
      </p>
      <TextLink href="#all" variant="subtle">
        View all reviews
      </TextLink>
      <div>
        <TextLink href="#account" variant="action">
          Account settings
        </TextLink>
        <TextLink href="#security" variant="action">
          Security
        </TextLink>
      </div>
    </div>
  );
}
`})))()}var b,x,S;function C(){return(C=e((()=>{f(),h(),_(),y(),t(),o(),c(),b=n(),x=a(Object.assign({"./demos/as-child.tsx":l,"./demos/variants.tsx":p}),Object.assign({"./demos/as-child.tsx":g,"./demos/variants.tsx":v})),S=()=>(0,b.jsx)(s,{id:`text-link`,demos:x})})))()}C();export{S as default};