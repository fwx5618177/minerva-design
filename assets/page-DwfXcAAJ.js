import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{K as r,W as i,X as a,et as o,z as s}from"./icons-BnhBUHMa.js";import{R as c,z as l}from"./ProgressIndicator-CXNTCbma.js";import{n as u,t as d}from"./Input-CczNyxGC.js";import{n as f,t as p}from"./Divider-C2hJ1H1j.js";import{n as m,t as h}from"./ResponsiveGrid-DZyHXIZ4.js";import{a as g,i as _,n as v,o as y,r as b,t as x}from"./Page-D7K14BNL.js";import{l as S,n as C,t as w,u as T}from"./DocPage--2U8TgOE.js";function E(){return(0,D.jsxs)(x,{maxWidth:720,style:{padding:0},children:[(0,D.jsx)(g,{title:`Books`,description:`Every title in the catalogue.`,actions:(0,D.jsx)(l,{children:`New book`})}),(0,D.jsx)(y,{title:`Recently added`,icon:(0,D.jsx)(i,{size:`1em`}),actions:(0,D.jsx)(l,{color:`neutral`,variant:`outline`,children:`View all`}),children:(0,D.jsx)(`p`,{style:{margin:0},children:`Section content`})})]})}var D;function O(){return(O=e((()=>{a(),c(),_(),D=n()})))()}function k(){return(0,A.jsxs)(m,{as:`section`,"aria-label":`Metrics`,columns:{base:1,sm:3},children:[(0,A.jsx)(b,{label:`Books`,value:`1,284`,icon:(0,A.jsx)(s,{size:`1em`})}),(0,A.jsx)(b,{label:`Readers`,value:`9.6k`,icon:(0,A.jsx)(r,{size:`1em`})}),(0,A.jsx)(b,{label:`Reviews`,value:0,icon:(0,A.jsx)(o,{size:`1em`}),description:`No reviews yet`})]})}var A;function j(){return(j=e((()=>{a(),h(),_(),A=n()})))()}function M(){return(0,N.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,N.jsxs)(v,{"aria-label":`Filters`,children:[(0,N.jsx)(d,{name:`query`,"aria-label":`Search books`,placeholder:`Search books`}),(0,N.jsx)(l,{color:`neutral`,variant:`outline`,children:`Reset`}),(0,N.jsx)(l,{children:`Apply`})]}),(0,N.jsxs)(v,{density:`compact`,wrap:!1,"aria-label":`Formatting`,children:[(0,N.jsx)(l,{size:`small`,color:`neutral`,variant:`outline`,children:`Bold`}),(0,N.jsx)(p,{orientation:`vertical`}),(0,N.jsx)(l,{size:`small`,color:`neutral`,variant:`outline`,children:`Italic`})]})]})}var N;function P(){return(P=e((()=>{c(),f(),u(),_(),N=n()})))()}var F;function I(){return(I=e((()=>{F=`import { BookOpenIcon } from "minerva-design/icons";
import { Button, Page, PageHeader, PageSection } from "minerva-design";

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
        icon={<BookOpenIcon size="1em" />}
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
`})))()}var L;function R(){return(R=e((()=>{L=`import { BookIcon, StarIcon, UsersIcon } from "minerva-design/icons";
import { ResponsiveGrid, StatCard } from "minerva-design";

export default function StatCardsDemo() {
  return (
    <ResponsiveGrid
      as="section"
      aria-label="Metrics"
      columns={{ base: 1, sm: 3 }}
    >
      <StatCard label="Books" value="1,284" icon={<BookIcon size="1em" />} />
      <StatCard label="Readers" value="9.6k" icon={<UsersIcon size="1em" />} />
      <StatCard
        label="Reviews"
        value={0}
        icon={<StarIcon size="1em" />}
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
`})))()}var V,H,U;function W(){return(W=e((()=>{O(),j(),P(),I(),R(),B(),t(),C(),T(),V=n(),H=S(Object.assign({"./demos/basic.tsx":E,"./demos/stat-cards.tsx":k,"./demos/toolbar.tsx":M}),Object.assign({"./demos/basic.tsx":F,"./demos/stat-cards.tsx":L,"./demos/toolbar.tsx":z})),U=()=>(0,V.jsx)(w,{id:`page`,demos:H})})))()}W();export{U as default};