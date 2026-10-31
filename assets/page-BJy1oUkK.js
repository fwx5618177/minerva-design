import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{R as r,z as i}from"./ProgressIndicator-BMZ0rR7D.js";import{n as a,t as o}from"./Input-BNZ0fzl-.js";import{n as s,t as c}from"./Divider-COWcQ-Oi.js";import{n as l,t as u}from"./ResponsiveGrid-BNPVBS0V.js";import{a as d,i as f,n as p,o as m,r as h,t as g}from"./Page-E4GdR-Un.js";import{l as _,n as v,t as y,u as b}from"./DocPage-CfPUO8JU.js";import{D as x,S,T as C,n as w,t as T}from"./lu-BxR8fmLv.js";function E(){return(0,D.jsxs)(g,{maxWidth:720,style:{padding:0},children:[(0,D.jsx)(d,{title:`Books`,description:`Every title in the catalogue.`,actions:(0,D.jsx)(i,{children:`New book`})}),(0,D.jsx)(m,{title:`Recently added`,icon:(0,D.jsx)(w,{}),actions:(0,D.jsx)(i,{color:`neutral`,variant:`outline`,children:`View all`}),children:(0,D.jsx)(`p`,{style:{margin:0},children:`Section content`})})]})}var D;function O(){return(O=e((()=>{r(),f(),x(),D=n()})))()}function k(){return(0,A.jsxs)(l,{as:`section`,"aria-label":`Metrics`,columns:{base:1,sm:3},children:[(0,A.jsx)(h,{label:`Books`,value:`1,284`,icon:(0,A.jsx)(T,{})}),(0,A.jsx)(h,{label:`Readers`,value:`9.6k`,icon:(0,A.jsx)(C,{})}),(0,A.jsx)(h,{label:`Reviews`,value:0,icon:(0,A.jsx)(S,{}),description:`No reviews yet`})]})}var A;function j(){return(j=e((()=>{u(),f(),x(),A=n()})))()}function M(){return(0,N.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,N.jsxs)(p,{"aria-label":`Filters`,children:[(0,N.jsx)(a,{name:`query`,"aria-label":`Search books`,placeholder:`Search books`}),(0,N.jsx)(i,{color:`neutral`,variant:`outline`,children:`Reset`}),(0,N.jsx)(i,{children:`Apply`})]}),(0,N.jsxs)(p,{density:`compact`,wrap:!1,"aria-label":`Formatting`,children:[(0,N.jsx)(i,{size:`small`,color:`neutral`,variant:`outline`,children:`Bold`}),(0,N.jsx)(c,{orientation:`vertical`}),(0,N.jsx)(i,{size:`small`,color:`neutral`,variant:`outline`,children:`Italic`})]})]})}var N;function P(){return(P=e((()=>{r(),s(),o(),f(),N=n()})))()}var F;function I(){return(I=e((()=>{F=`import { Button, Page, PageHeader, PageSection } from "minerva-design";
import { LuBookOpen } from "react-icons/lu";

export default function BasicDemo() {
  return (
    <Page maxWidth={720} style={{ padding: 0 }}>
      <PageHeader
        title="Books"
        description="Every title in the catalogue."
        actions={<Button>New book</Button>}
      />
      <PageSection
        title="Recently added"
        icon={<LuBookOpen />}
        actions={
          <Button color="neutral" variant="outline">
            View all
          </Button>
        }
      >
        <p style={{ margin: 0 }}>Section content</p>
      </PageSection>
    </Page>
  );
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { ResponsiveGrid, StatCard } from "minerva-design";
import { LuBook, LuStar, LuUsers } from "react-icons/lu";

export default function StatCardsDemo() {
  return (
    <ResponsiveGrid
      as="section"
      aria-label="Metrics"
      columns={{ base: 1, sm: 3 }}
    >
      <StatCard label="Books" value="1,284" icon={<LuBook />} />
      <StatCard label="Readers" value="9.6k" icon={<LuUsers />} />
      <StatCard
        label="Reviews"
        value={0}
        icon={<LuStar />}
        description="No reviews yet"
      />
    </ResponsiveGrid>
  );
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { Button, Divider, Input, Toolbar } from "minerva-design";

export default function ToolbarDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Toolbar aria-label="Filters">
        <Input
          name="query"
          aria-label="Search books"
          placeholder="Search books"
        />
        <Button color="neutral" variant="outline">
          Reset
        </Button>
        <Button>Apply</Button>
      </Toolbar>
      <Toolbar density="compact" wrap={false} aria-label="Formatting">
        <Button size="small" color="neutral" variant="outline">
          Bold
        </Button>
        <Divider orientation="vertical" />
        <Button size="small" color="neutral" variant="outline">
          Italic
        </Button>
      </Toolbar>
    </div>
  );
}
`})))()}var V,H,U;function W(){return(W=e((()=>{O(),j(),P(),I(),R(),B(),t(),v(),b(),V=n(),H=_(Object.assign({"./demos/basic.tsx":E,"./demos/stat-cards.tsx":k,"./demos/toolbar.tsx":M}),Object.assign({"./demos/basic.tsx":F,"./demos/stat-cards.tsx":L,"./demos/toolbar.tsx":z})),U=()=>(0,V.jsx)(y,{id:`page`,demos:H})})))()}W();export{U as default};