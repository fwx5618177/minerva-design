const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/runtime-D4u77Ij7.js","assets/rolldown-runtime-B0Z9INg1.js","assets/angular-preview-DOigT0Hs.js","assets/angular-preview-DWCF6V6k.js","assets/angular-preview-CnZj6Zt4.js","assets/angular-preview-B_nhitXy.js","assets/angular-preview-C1kzjZIt.js","assets/angular-preview-DQY6HApY.js","assets/angular-preview-C5Jw8NN6.js","assets/angular-preview-D4TkZMvb.js","assets/angular-preview-CdLqM83v.js","assets/angular-preview-DTMx_46W.js","assets/angular-preview-D0iRGNuL.js","assets/angular-preview-rdQfm21A.js","assets/angular-preview-BZ7qgD9B.js","assets/angular-preview-DKTVr4S_.js","assets/angular-preview-Co5oqb_7.js","assets/angular-preview-B7Uzpk8P.js","assets/angular-preview-Yt0QzKy6.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{n as r,t as i}from"./angular-preview-DOigT0Hs.js";import{n as a,t as o}from"./useTranslation-CYNkwqnn.js";import{R as s,z as c}from"./ProgressIndicator-CLQ5GhV8.js";import{n as l,t as ee}from"./Alert-BtB13A7A.js";import{n as u,t as d}from"./CodeBlock-CY9IJrFy.js";import{n as f,t as te}from"./ConfigProvider-DFReerqR.js";import{n as ne,t as p}from"./LoadingState-C0j3wtCY.js";import{c as m,d as h,f as g,i as _,l as re,n as ie,o as ae,r as v,s as y,t as oe,u as b}from"./DemoBlock-CM6sOtLM.js";import{a as x,i as se}from"./frameworks-DOhwqzyA.js";import{n as ce,t as le}from"./ChartFrameworkFallback-CMuU5fIY.js";import{n as ue,t as de}from"./angular-api-BjRC7kef.js";function fe({example:e}){let{t}=a(),n=(0,S.useRef)(null),r=(0,S.useRef)(null),o=te(),s=(0,S.useRef)(o),l=(0,S.useMemo)(()=>({theme:o.theme??`system`,palette:o.palette??null,language:pe(o.locale?.language)}),[o.theme,o.palette,o.locale?.language]),u=(0,S.useRef)(l);(0,S.useEffect)(()=>{s.current=o,u.current=l},[o,l]);let[d,f]=(0,S.useState)(!1),[p,m]=(0,S.useState)(``),[h,g]=(0,S.useState)(0);return(0,S.useEffect)(()=>{let t=n.current;if(!t)return;let a=!1;return f(!1),m(``),i(()=>import(`./runtime-D4u77Ij7.js`).then(n=>n.mountAngularExample(t,e,u.current,{theme:e=>s.current.setTheme?.(e),palette:e=>s.current.setPalette?.(e)})),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])).then(e=>{if(a){e.destroy();return}r.current=e,e.update(u.current),f(!0)}).catch(e=>{a||m(e instanceof Error?e.message:String(e))}),()=>{a=!0,r.current?.destroy(),r.current=null}},[e,h]),(0,S.useEffect)(()=>{r.current?.update(l)},[l]),(0,C.jsxs)(`div`,{className:v.wcDemo,"data-angular-demo":``,"aria-busy":!d&&!p,children:[!d&&!p&&(0,C.jsx)(ne,{size:`small`,label:t(`doc.loading`)}),p&&(0,C.jsxs)(ee,{color:`danger`,title:t(`doc.previewError`),children:[(0,C.jsx)(`p`,{children:p}),(0,C.jsx)(c,{type:`button`,onClick:()=>g(e=>e+1),children:t(`doc.retry`)})]}),(0,C.jsx)(`div`,{ref:n,className:v.vueMount})]})}var S,C,w,pe;function me(){return(me=e((()=>{S=t(),f(),p(),l(),s(),o(),_(),C=n(),r(),w=[`en`,`zh`,`ja`,`fr`],pe=e=>w.find(t=>t===e)??`en`})))()}function he({names:e}){return(0,T.jsx)(T.Fragment,{children:e.map(e=>{let t=ge[e];return t?(0,T.jsxs)(`div`,{className:v.apiBlock,children:[(0,T.jsx)(`h3`,{className:v.apiTitle,id:`angular-api-${e}`,children:(0,T.jsx)(`code`,{children:e})}),t.description&&(0,T.jsx)(`p`,{children:t.description}),t.members.length>0?(0,T.jsx)(`div`,{className:v.tableWrapper,tabIndex:0,role:`region`,"aria-label":`${e} Angular API`,children:(0,T.jsxs)(g,{className:v.propsTable,children:[(0,T.jsx)(m,{children:(0,T.jsxs)(ae,{children:[(0,T.jsx)(b,{scope:`col`,children:`Name`}),(0,T.jsx)(b,{scope:`col`,children:`Kind`}),(0,T.jsx)(b,{scope:`col`,children:`Type`}),(0,T.jsx)(b,{scope:`col`,children:`Default`}),(0,T.jsx)(b,{scope:`col`,children:`Description`})]})}),(0,T.jsx)(h,{children:t.members.map(e=>(0,T.jsxs)(ae,{children:[(0,T.jsxs)(b,{scope:`row`,children:[(0,T.jsx)(`code`,{children:e.name}),e.required&&(0,T.jsx)(`span`,{className:v.required,children:`Required`})]}),(0,T.jsx)(y,{children:e.kind}),(0,T.jsx)(y,{children:(0,T.jsx)(`code`,{className:v.propType,children:e.type})}),(0,T.jsx)(y,{children:(0,T.jsx)(`code`,{children:e.default??`—`})}),(0,T.jsxs)(y,{children:[e.description,e.changeEvent&&(0,T.jsxs)(`p`,{children:[`Two-way binding: `,(0,T.jsxs)(`code`,{children:[`[(`,e.name,`)]`]}),`; emits `,(0,T.jsx)(`code`,{children:e.changeEvent}),`.`]})]})]},e.name))})]})}):(0,T.jsx)(`p`,{children:`Content is projected through the default slot. Native attributes and events can be placed on the host element.`})]},e):null})})}var T,ge;function _e(){return(_e=e((()=>{re(),ue(),_(),T=n(),ge=de})))()}function ve(e){return A(e)?e.$code:e instanceof Date?`new Date(${e.getFullYear()}, ${e.getMonth()}, ${e.getDate()})`:JSON.stringify(e,null,2).replace(/\[\n\s+((?:-?[\d.]+|"[^"\n]*")(?:,\n\s+(?:-?[\d.]+|"[^"\n]*"))*)\n\s*\]/g,(e,t)=>`[${t.replace(/,\n\s+/g,`, `)}]`)}function ye(e){let t=e.imports.join(`, `),n=e.monaco?`minerva-design/angular/monaco`:`minerva-design/angular`,r=Object.entries(e.state).map(([t,n])=>`  ${t}${e.stateTypes?.[t]?`: ${e.stateTypes[t]}`:``} = ${ve(n)};`).join(`
`),i=e.monaco?`
// engine.ts configures MonacoEnvironment.getWorker with bundled workers.
import { monaco } from "./engine";`:``,a=e.template.includes(`language()`),o=a?`${t}, injectMinerva`:t,s=[`Component`,...M(e,`@angular/core`)],c=M(e,`minerva-design/charts/core`),l=M(e,`minerva-design/icons/core`);return`import { ${s.join(`, `)} } from '@angular/core';\nimport { ${o} } from '${n}';${c.length?`\nimport { ${c.join(`, `)} } from 'minerva-design/charts/core';`:``}${l.length?`\nimport { ${l.join(`, `)} } from 'minerva-design/icons/core';`:``}${i}\n\n@Component({\n  selector: 'app-example',\n  imports: [${t}],\n  template: \`\n${e.template}\n  \`,\n})\nexport class Example {\n${a?`  readonly language = injectMinerva().language;
`:``}${r}${e.monaco?`
  readonly monaco = monaco;`:``}\n}\n`}var E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,be,xe,Se,Ce,we,K,Te,q,J,Ee,De,Y,X,Z;function Oe(){return(Oe=e((()=>{E=(e,t,n,r={},i)=>({id:e.toLowerCase().replace(/[^a-z0-9]+/g,`-`),title:e,description:i,imports:n.includes(`<mn-stack`)?[...new Set([...t,`MnStack`])]:t,template:n,state:r}),D=e=>`<mn-stack direction="row" wrap gap="3" align="center">${e}</mn-stack>`,O={button:[E(`Actions and feedback`,[`MnButton`],D(`<button mnButton (click)="count=count+1">Click me</button><output aria-live="polite">Clicked {{count}} times</output>`),{count:0}),E(`Variants and loading`,[`MnButton`],D(`<button mnButton variant="outline">Outline</button><button mnButton variant="ghost">Ghost</button><button mnButton color="danger">Delete</button><button mnButton loading loadingText="Saving">Save</button><button mnButton disabled>Disabled</button>`)),E(`Sizes and shapes`,[`MnButton`],D(`<button mnButton size="xsmall">XSmall</button><button mnButton size="small">Small</button><button mnButton size="medium">Medium</button><button mnButton size="large">Large</button><button mnButton size="xlarge">XLarge</button><button mnButton shape="square">Square</button><button mnButton shape="rounded">Rounded</button><button mnButton shape="circle" aria-label="Add">+</button><button mnButton borderRadius="none">No radius</button><button mnButton [borderRadius]="12">12px radius</button>`),{},`size controls density; shape and borderRadius choose preset or pixel radii. Icon-only buttons require an accessible name.`),E(`Template icons links and width`,[`MnButton`],`<ng-template #plus><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></ng-template><ng-template #arrow><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></ng-template>${D(`<button mnButton [startIcon]="plus" (click)="count=count+1">Add</button><button mnButton [endIcon]="arrow" variant="outline" (click)="count=count+1">Continue</button><a mnButton variant="link" href="#/button?framework=angular">Button documentation</a><output>{{count}} actions</output>`)}<button mnButton fullWidth (click)="count=0">Reset full-width action</button>`,{count:0},`startIcon/endIcon accept Angular TemplateRef content. Apply mnButton directly to a native anchor for navigation; fullWidth fills the available container.`),E(`Native form buttons`,[`MnButton`,`MnInput`],`<form (submit)="$event.preventDefault();result='Submitted '+title" (reset)="title='Draft';result='Reset'">${D(`<mn-input name="title" aria-label="Title" [(value)]="title"/><button mnButton color="neutral" variant="outline" (click)="result='Preview opened (form not submitted)'">Preview</button><button mnButton type="reset" color="neutral" variant="ghost">Reset</button><button mnButton type="submit">Save</button>`)}</form><output aria-live="polite">{{result}}</output>`,{title:`Draft`,result:`Nothing yet`},`mnButton defaults to type=button. Native submit and reset buttons retain form behavior; the reset handler also restores the controlled Angular model.`)],"icon-button":[E(`Toggle an action`,[`MnIconButton`],`<button mnIconButton label="Pin item" toggle [(pressed)]="pinned">★</button><output>{{pinned?'Pinned':'Unpinned'}}</output>`,{pinned:!1}),E(`Loading and disabled`,[`MnIconButton`],D(`<button mnIconButton label="Loading" loading>↻</button><button mnIconButton label="Delete" color="danger">×</button><button mnIconButton label="Unavailable" disabled>★</button>`))],divider:[E(`Labeled separator`,[`MnDivider`],`<p>Continue with your account</p><mn-divider>or</mn-divider><p>Create a new account</p>`),E(`Line styles`,[`MnDivider`],`<mn-divider variant="dashed">Dashed</mn-divider><mn-divider variant="dotted" align="left">Dotted</mn-divider>`)],card:[E(`Structured content`,[`MnCard`,`MnCardHeader`,`MnCardTitle`,`MnCardDescription`,`MnCardContent`,`MnCardFooter`,`MnButton`],`<article mnCard><mn-card-header><mn-card-title>Team workspace</mn-card-title><mn-card-description>Keep your project organized.</mn-card-description></mn-card-header><mn-card-content>12 projects · 8 members</mn-card-content><mn-card-footer><button mnButton (click)="joined=!joined">{{joined?'Joined':'Join workspace'}}</button></mn-card-footer></article>`,{joined:!1}),E(`Surface variants`,[`MnCard`],D(`<mn-card variant="outline">Outline card</mn-card><mn-card variant="elevated">Elevated card</mn-card><mn-card variant="filled">Filled card</mn-card>`))],"virtual-list":[E(`Windowed data`,[`MnVirtualList`],`<mn-virtual-list [items]="items" [height]="220" [itemHeight]="36"/>`,{items:Array.from({length:200},(e,t)=>`Record ${t+1}`)}),E(`Custom row template`,[`MnVirtualList`],`<mn-virtual-list [items]="items" [height]="160"><ng-template let-item let-i="index"><strong>{{i+1}}.</strong> {{item}}</ng-template></mn-virtual-list>`,{items:[`Design`,`Engineering`,`Research`,`Operations`,`Support`,`Finance`]})],checkbox:[E(`Selection`,[`MnCheckbox`],`<mn-checkbox label="Accept the terms" [(checked)]="accepted"/><output>{{accepted?'Accepted':'Not accepted'}}</output>`,{accepted:!1}),E(`States`,[`MnCheckbox`],D(`<mn-checkbox label="Selected" [checked]="true"/><mn-checkbox label="Mixed" indeterminate/><mn-checkbox label="Disabled" disabled/>`))],radio:[E(`Choose a plan`,[`MnRadioGroup`,`MnRadio`],`<mn-radio-group label="Plan" [(value)]="plan"><mn-radio value="free" label="Free"/><mn-radio value="pro" label="Pro"/><mn-radio value="enterprise" label="Enterprise" disabled/></mn-radio-group><output>Plan: {{plan}}</output>`,{plan:`free`}),E(`Individual options`,[`MnRadio`],D(`<mn-radio label="Selected" [checked]="true"/><mn-radio label="Unavailable" disabled/>`))],switch:[E(`Settings`,[`MnSwitch`],`<mn-switch label="Email notifications" [(checked)]="enabled"/><output>{{enabled?'Notifications on':'Notifications off'}}</output>`,{enabled:!0}),E(`Sizes and disabled`,[`MnSwitch`],D(`<mn-switch label="Small" size="small"/><mn-switch label="Large" size="large" [checked]="true"/><mn-switch label="Locked" disabled/>`))],"auto-complete":[E(`Search suggestions`,[`MnAutoComplete`],`<mn-auto-complete label="City" [options]="options" [(value)]="value"/><output>City: {{value}}</output>`,{options:[`London`,`Lisbon`,`Lima`,`Tokyo`].map(e=>({label:e,value:e})),value:``}),E(`Preselected suggestion`,[`MnAutoComplete`],`<mn-auto-complete label="Language" [options]="options" value="TypeScript"/>`,{options:[`TypeScript`,`JavaScript`,`Rust`].map(e=>({label:e,value:e}))})],cascader:[E(`Hierarchical selection`,[`MnCascader`],`<mn-cascader name="region" label="Region" [options]="options" [(value)]="value"/><output>{{value}}</output>`,{options:[{value:`europe`,label:`Europe`,children:[{value:`france`,label:`France`},{value:`spain`,label:`Spain`}]},{value:`asia`,label:`Asia`,children:[{value:`japan`,label:`Japan`}]}],value:[]}),E(`Disabled field`,[`MnCascader`],`<mn-cascader name="region" label="Locked region" [options]="options" disabled/>`,{options:[{value:`global`,label:`Global`}]})],"date-picker":[E(`Choose a date`,[`MnDatePicker`],`<mn-date-picker label="Meeting date" [(value)]="date"/><output>{{date || 'No date selected'}}</output>`,{date:null}),E(`Date range`,[`MnDatePicker`],`<mn-date-picker label="October booking" [(value)]="date" minDate="2026-10-10" maxDate="2026-10-20"/><output>{{date}}</output>`,{date:`2026-10-15`}),E(`Form field`,[`MnDatePicker`,`MnFormControl`,`MnFormLabel`,`MnFormHelperText`],`<mn-form-control required><mn-form-label>Birthday</mn-form-label><mn-date-picker [(value)]="date"/><mn-form-helper-text>Type YYYY-MM-DD or choose a day from the calendar.</mn-form-helper-text></mn-form-control>`,{date:null}),E(`Disabled and read-only dates`,[`MnDatePicker`],D(`<mn-date-picker label="Read-only date" defaultValue="2026-10-15" readOnly/><mn-date-picker label="Disabled date" defaultValue="2026-10-15" disabled/>`))],"time-picker":[E(`Choose a time`,[`MnTimePicker`],`<mn-time-picker label="Start time" [(value)]="time"/><output>{{time}}</output>`,{time:null}),E(`Disabled time`,[`MnTimePicker`],`<mn-time-picker label="Unavailable time" disabled/>`)],avatar:[E(`Initials and groups`,[`MnAvatar`,`MnAvatarGroup`],D(`<mn-avatar name="Ada Lovelace"/><mn-avatar name="Grace Hopper" shape="rounded"/><mn-avatar-group [items]="people" [max]="2"/>`),{people:[{name:`Ada Lovelace`},{name:`Grace Hopper`},{name:`Alan Turing`},{name:`Katherine Johnson`}]}),E(`Sizes`,[`MnAvatar`],D(`<mn-avatar name="Small" size="small"/><mn-avatar name="Medium"/><mn-avatar name="Large" size="large"/><mn-avatar name="Extra Large" size="xlarge"/>`))],badge:[E(`Counts and status`,[`MnBadge`],D(`<mn-badge [value]="12"/><mn-badge value="Active" color="success"/><mn-badge [value]="120" color="danger" attached><span style="padding:20px">Inbox</span></mn-badge>`)),E(`Subtle and outlined`,[`MnBadge`],D(`<mn-badge value="New" variant="subtle"/><mn-badge value="Review" variant="outline" color="warning"/>`))],tag:[E(`Toggle and remove`,[`MnTag`],`@if(visible){<mn-tag label="Design" clickable closable [(active)]="active" (removed)="visible=false"/>}<output>{{active?'Filter selected':'Filter not selected'}}</output><button type="button" (click)="visible=true">Restore tag</button>`,{active:!1,visible:!0}),E(`Semantic variants`,[`MnTag`],D(`<mn-tag label="Success" color="success"/><mn-tag label="Warning" color="warning" variant="outline"/><mn-tag label="Loading" loading/><mn-tag label="Disabled" disabled/>`))],empty:[E(`Actionable empty state`,[`MnEmpty`,`MnButton`],`<mn-empty title="No projects yet" description="Create your first project to get started."><button mnButton (click)="created=true">Create project</button></mn-empty><output>{{created?'Project created':''}}</output>`,{created:!1}),E(`Compact presentation`,[`MnEmpty`],`<mn-empty size="small" title="No matches" description="Try another search term."/>`)],tooltip:[E(`Shared tooltip delays`,[`MnTooltipProvider`,`MnTooltip`,`MnButton`],`<button mnButton variant="outline" (click)="disabled=!disabled">{{disabled?'Enable hints':'Disable hints'}}</button><mn-tooltip-provider [disabled]="disabled" [enterDelay]="500" [leaveDelay]="100" [skipDelay]="600">${D(`<mn-tooltip text="Save changes"><button mnButton>Save</button></mn-tooltip><mn-tooltip text="Export report"><button mnButton variant="outline">Export</button></mn-tooltip>`)}</mn-tooltip-provider>`,{disabled:!1},`Provider delays are shared between hints; the disabled scope closes active hints and cancels pending timers. Move between Save and Export to observe skipDelay.`),E(`Hover and focus`,[`MnTooltip`,`MnButton`],`<mn-tooltip text="Save your work before leaving"><button mnButton>Save</button></mn-tooltip>`),E(`Placement and tone`,[`MnTooltip`,`MnButton`],D(`<mn-tooltip text="An important action" color="warning" placement="top"><button mnButton variant="outline">Above</button></mn-tooltip><mn-tooltip text="More information" variant="subtle" shape="rounded"><button mnButton variant="ghost">Details</button></mn-tooltip>`))],alert:[E(`Expandable and dismissible`,[`MnAlert`],`<mn-alert title="Scheduled maintenance" description="The workspace will be unavailable for a few minutes tonight." color="warning" collapsible closable/>`),E(`Semantic colors`,[`MnAlert`],`<mn-alert title="Changes saved" color="success"/><mn-alert title="Connection interrupted" description="Check your network and try again." color="danger"/>`)],progress:[E(`Labeled loading`,[`MnProgressIndicator`],`<mn-progress label="Uploading files"/>`),E(`Indicator variants`,[`MnProgressIndicator`],D(`<mn-progress variant="bar" label="Preparing"/><mn-progress variant="circle" size="large"/><mn-progress variant="wave"/><mn-progress variant="dotted-bar"/>`)),E(`Determinate progress`,[`MnProgressIndicator`],D(`<mn-progress variant="bar" value="40" showValue label="Course progress"/><mn-progress variant="circle" size="large" color="success" value="75" showValue/>`))],skeleton:[E(`Content loading`,[`MnSkeleton`],`<mn-skeleton variant="card"/>`),E(`Text placeholders`,[`MnSkeletonText`,`MnSkeleton`],`<mn-skeleton-text [count]="4"/><mn-skeleton variant="rounded" [count]="1"/>`)],pagination:[E(`Page and page size`,[`MnPagination`],`<mn-pagination [total]="128" [(page)]="page" [(pageSize)]="pageSize" showSizeChanger showJumper/><output>Page {{page}} · {{pageSize}} per page</output>`,{page:1,pageSize:10}),E(`Simple pagination`,[`MnPagination`],`<mn-pagination [total]="65" simple/><mn-pagination [total]="100" disabled/>`)],box:[E(`Spacing and surfaces`,[`MnBox`],`<section mnBox p="6" bg="var(--surface-subtle-color)" rounded="12px">A padded section using theme tokens.</section>`),E(`Bounded content`,[`MnBox`],`<div mnBox p="4" maxW="320px" border="1px solid var(--border-color)">This container stays within a readable width.</div>`)],stack:[E(`Horizontal and vertical`,[`MnHStack`,`MnVStack`,`MnButton`],`<mn-vstack gap="4"><mn-hstack gap="2"><button mnButton>Save</button><button mnButton variant="outline">Cancel</button></mn-hstack><p>Rows and columns share spacing tokens.</p></mn-vstack>`),E(`Wrapping layout`,[`MnStack`,`MnTag`],`<mn-stack direction="row" wrap gap="2"><mn-tag label="Design"/><mn-tag label="Engineering"/><mn-tag label="Research"/></mn-stack>`)],"responsive-grid":[E(`Automatic columns`,[`MnResponsiveGrid`,`MnCard`],`<mn-responsive-grid minColumnWidth="160px"><mn-card>Design</mn-card><mn-card>Engineering</mn-card><mn-card>Research</mn-card></mn-responsive-grid>`),E(`Spanning a row`,[`MnResponsiveGrid`,`MnGridItem`,`MnCard`],`<mn-responsive-grid minColumnWidth="140px"><mn-grid-item fullWidth><mn-card>Full-width summary</mn-card></mn-grid-item><mn-card>Left</mn-card><mn-card>Right</mn-card></mn-responsive-grid>`)],"split-layout":[E(`Content and aside`,[`MnSplitLayout`],`<mn-split-layout><article><h3>Main content</h3><p>The primary reading area grows with its container.</p></article><aside mnAside>Related details and navigation.</aside></mn-split-layout>`),E(`Operational sidebar`,[`MnSplitLayout`,`MnCard`],`<mn-split-layout><mn-card>Project overview</mn-card><mn-card mnAside variant="filled">Status: Active</mn-card></mn-split-layout>`)],page:[E(`Structured screen`,[`MnPage`,`MnPageHeader`,`MnPageSection`,`MnStatCard`],`<mn-page><mn-page-header title="Overview" description="Your team's activity"/><mn-page-section title="Metrics" description="Updated just now" icon="★"><mn-stat-card label="Active projects" [value]="12" description="3 added this week"/></mn-page-section></mn-page>`),E(`Related actions`,[`MnToolbar`,`MnButton`],`<mn-toolbar aria-label="Project actions"><button mnButton (click)="result='Created'">Create</button><button mnButton variant="outline" (click)="result='Exported'">Export</button></mn-toolbar><output>{{result}}</output>`,{result:``})],"app-shell":[E(`Workspace navigation`,[`MnAppShell`,`MnNavTree`],`<div style="position:relative;isolation:isolate;transform:translateZ(0);height:360px;overflow:auto"><mn-app-shell title="Workspace"><ng-template><mn-nav-tree [items]="items"/></ng-template><p style="padding:24px">Open navigation to inspect the mobile drawer and keyboard focus behavior.</p></mn-app-shell></div>`,{items:[{id:`home`,label:`Overview`,href:`#overview`},{id:`projects`,label:`Projects`,href:`#projects`}]}),E(`Controlled navigation drawer`,[`MnButton`,`MnDrawer`],`<button mnButton (click)="open=true">Open navigation</button><mn-drawer title="Workspace" [(open)]="open" side="left"><nav><a href="#overview">Overview</a></nav></mn-drawer>`,{open:!1})],modal:[E(`Dialog actions`,[`MnButton`,`MnModal`,`MnModalBody`,`MnModalFooter`],`<button mnButton (click)="open=true">Edit profile</button><mn-modal title="Edit profile" description="Update your public information." [(open)]="open"><mn-modal-body>Changes are saved to your workspace.</mn-modal-body><mn-modal-footer><button mnButton (click)="saved=true;open=false">Save profile</button></mn-modal-footer></mn-modal><output>{{saved?'Profile saved':''}}</output>`,{open:!1,saved:!1}),E(`Dialog sizes`,[`MnButton`,`MnModal`],`<button mnButton variant="outline" (click)="open=true">Open large dialog</button><mn-modal title="Details" size="large" [(open)]="open">A wider content area.</mn-modal>`,{open:!1})],confirm:[E(`Queued confirmations`,[`MnConfirmProvider`,`MnButton`],`<mn-confirm-provider #confirmation="mnConfirmProvider"><button mnButton (click)="confirmation.confirm({title:'Delete draft?',description:'This is the first queued request.',color:'danger'});confirmation.confirm({title:'Archive project?',description:'The second request waits for the first.'})">Queue two confirmations</button></mn-confirm-provider>`),E(`Confirm a destructive action`,[`MnButton`,`MnConfirmDialog`],`<button mnButton color="danger" (click)="open=true">Delete project</button><mn-confirm-dialog title="Delete this project?" description="This action cannot be undone." color="danger" [(open)]="open" (confirm)="deleted=true;open=false"/><output>{{deleted?'Project deleted':''}}</output>`,{open:!1,deleted:!1}),E(`Controlled loading and recovery`,[`MnButton`,`MnConfirmDialog`],`<button mnButton (click)="open=true;loading=false;completed=false">Preview processing</button><mn-confirm-dialog title="Processing request" description="Confirm starts the caller-owned operation; complete it below." [(open)]="open" [loading]="loading" (confirm)="loading=true"><button mnButton variant="outline" [disabled]="!loading" (click)="loading=false;open=false;completed=true">Complete request</button></mn-confirm-dialog><output>{{completed?'Request completed':loading?'Processing':'Ready'}}</output>`,{open:!1,loading:!1,completed:!1},`The declarative dialog emits confirm; the owner sets loading and completes or retries its operation. This example uses Complete request as an explicit stand-in for the server response and can be reopened.`)],drawer:[E(`Side panel`,[`MnButton`,`MnDrawer`,`MnDrawerBody`,`MnDrawerFooter`],`<button mnButton (click)="open=true">Open details</button><mn-drawer title="Project details" description="Review the latest information" [(open)]="open"><mn-drawer-body>Updated today by your team.</mn-drawer-body><mn-drawer-footer><button mnButton (click)="open=false">Done</button></mn-drawer-footer></mn-drawer>`,{open:!1}),E(`Bottom sheet`,[`MnButton`,`MnDrawer`],`<button mnButton variant="outline" (click)="open=true">Open bottom sheet</button><mn-drawer title="Quick actions" side="bottom" [(open)]="open">Choose an action.</mn-drawer>`,{open:!1})],command:[E(`Search and run commands`,[`MnButton`,`MnCommandDialog`],`<button mnButton (click)="open=true">Open commands</button><mn-command-dialog [(open)]="open" [items]="items" (selected)="result=$event.label ?? ''"/><output>{{result}}</output>`,{open:!1,result:``,items:[{id:`new`,label:`Create project`,keywords:`add new`},{id:`search`,label:`Search files`},{id:`settings`,label:`Open settings`}]}),E(`Unavailable commands`,[`MnButton`,`MnCommandDialog`],`<button mnButton variant="outline" (click)="open=true">Workspace commands</button><mn-command-dialog title="Workspace" [(open)]="open" [items]="items"/>`,{open:!1,items:[{id:`view`,label:`View workspace`},{id:`delete`,label:`Delete workspace`,disabled:!0}]})],popover:[E(`Separate anchor and close action`,[`MnPopover`,`MnPopoverAnchor`,`MnPopoverClose`,`MnButton`],`<p [mnPopoverAnchor]="details">The panel is positioned relative to this text.</p><mn-popover #details="mnPopover" label="Open anchored panel" placement="top"><p>Projected content may close the popover.</p><button mnButton mnPopoverClose>Done</button></mn-popover>`),E(`Interactive content`,[`MnPopover`,`MnButton`],`<mn-popover label="Project details"><p>12 active members</p><button mnButton size="small" (click)="invited=true">Invite member</button><output>{{invited?'Invitation prepared':''}}</output></mn-popover>`,{invited:!1}),E(`Placement`,[`MnPopover`],`<mn-popover label="Show above" placement="top">A floating panel positioned above its trigger.</mn-popover>`),E(`Controlled open and disabled trigger`,[`MnPopover`,`MnPopoverClose`,`MnButton`],`${D(`<button mnButton variant="outline" (click)="open=!open">{{open?'Close from parent':'Open from parent'}}</button><button mnButton variant="ghost" (click)="disabled=!disabled">{{disabled?'Enable trigger':'Disable trigger'}}</button><output>Panel: {{open?'open':'closed'}} · Trigger: {{disabled?'disabled':'enabled'}}</output>`)}<mn-popover label="Controlled details" [(open)]="open" [disabled]="disabled" placement="bottom-end"><p>The parent owns visibility.</p><button mnButton mnPopoverClose>Close details</button></mn-popover>`,{open:!1,disabled:!1},`Bind [(open)] for parent control. MnPopover owns its native trigger; Angular does not expose React asChild. Use mnPopoverAnchor for a separate positioning element and mnPopoverClose for a projected close button. disabled applies to the built-in trigger.`)],menu:[E(`Named groups and radio choices`,[`MnMenu`],`<mn-menu label="Display density" [items]="items" [(radioValues)]="values"/><output>Density: {{values['density']}}</output>`,{values:{density:`comfortable`},items:[{id:`density`,type:`group`,label:`Density`,children:[{id:`comfortable`,type:`radio`,label:`Comfortable`},{id:`compact`,type:`radio`,label:`Compact`},{id:`unavailable`,type:`radio`,label:`Unavailable`,disabled:!0}]}]}),E(`Actions and selection`,[`MnMenu`],`<mn-menu label="Project actions" [items]="items" (selected)="result=$event.label ?? ''"/><output>{{result}}</output>`,{result:``,items:[{id:`edit`,label:`Edit`,icon:`✎`,shortcut:`⌘E`},{id:`duplicate`,label:`Duplicate`},{id:`sep`,type:`separator`},{id:`delete`,label:`Delete`,disabled:!0}]}),E(`Context menu and checked items`,[`MnContextMenu`],`<mn-context-menu label="Right-click here" [items]="items" (checkedChange)="items=$event.id==='show'?[{id:'show',label:'Show hidden files',checked:$event.checked},items[1]!]:[items[0]!,{id:'sort',label:'Sort by name',checked:$event.checked}]" (selected)="result=$event.label ?? ''"/><output>{{result}} · Hidden: {{items[0]!.checked}} · Sorted: {{items[1]!.checked}}</output>`,{result:``,items:[{id:`show`,label:`Show hidden files`,checked:!0},{id:`sort`,label:`Sort by name`,checked:!1}]}),E(`Nested actions and expanded state`,[`MnMenu`,`MnButton`],`<mn-menu label="File actions" [items]="items" [(expanded)]="expanded" (selected)="result=$event.label ?? ''"/><output>{{result || 'Choose a nested action'}} · Expanded: {{expanded.join(', ') || 'none'}}</output><button mnButton variant="ghost" (click)="expanded=[];result=''">Reset menu</button>`,{expanded:[],result:``,items:[{id:`export`,label:`Export`,children:[{id:`csv`,label:`CSV`},{id:`json`,label:`JSON`}]},{id:`restricted`,label:`Restricted`,disabled:!0}]},`children defines nested choices. expanded is a controlled list of open item IDs, and selected reports the leaf action; disabled choices stay unavailable to pointer and keyboard activation.`)],toast:[E(`Show and dismiss notifications`,[`MnButton`,`MnToastRegion`],`<button mnButton (click)="messages=[{id:'saved',title:'Changes saved',description:'Your workspace is up to date.',color:'success',action:'Undo'}]">Save changes</button><mn-toast-region [messages]="messages" (closed)="messages=[]" (action)="messages=[];result='Changes restored'"/><output>{{result}}</output>`,{messages:[],result:``}),E(`Error feedback`,[`MnButton`,`MnToastRegion`],`<button mnButton variant="outline" (click)="messages=[{id:'error',title:'Unable to sync',description:'Check your connection and try again.',color:'danger'}]">Simulate error</button><mn-toast-region [messages]="messages" (closed)="messages=[]"/>`,{messages:[]})],"page-tabs":[E(`Document navigation`,[`MnPageTabs`,`MnPageTab`],`<mn-page-tabs><mn-page-tab label="Overview" icon="▤" [current]="page==='overview'" (selected)="page='overview'"/><mn-page-tab label="Activity" [current]="page==='activity'" (selected)="page='activity'"/></mn-page-tabs><output>Current page: {{page}}</output>`,{page:`overview`}),E(`Unavailable page`,[`MnPageTabs`,`MnPageTab`],`<mn-page-tabs><mn-page-tab label="Current" current/><mn-page-tab label="Restricted" disabled/></mn-page-tabs>`)],"form-control":[E(`Labeled field with help`,[`MnFormControl`,`MnFormHelperText`,`MnInput`],`<mn-form-control label="Display name" required><mn-input [(value)]="value"/><mn-form-helper-text>Shown to your teammates.</mn-form-helper-text></mn-form-control><output>{{value}}</output>`,{value:``}),E(`Validation feedback`,[`MnFormControl`,`MnFormErrorMessage`,`MnInput`],`<mn-form-control label="Email" invalid required><mn-input value="invalid-address"/><mn-form-error-message>Enter a valid email address.</mn-form-error-message></mn-form-control>`)],"form-layout":[E(`Submit a form`,[`MnFormLayout`,`MnFormControl`,`MnInput`,`MnButton`],`<form mnFormLayout (submit)="$event.preventDefault();saved=true"><mn-form-control label="Project name" required><mn-input [(value)]="value" required/></mn-form-control><button mnButton type="submit">Create project</button></form><output>{{saved?'Created '+value:''}}</output>`,{value:`New project`,saved:!1}),E(`Settings form`,[`MnFormLayout`,`MnCheckbox`,`MnButton`],`<form mnFormLayout (submit)="$event.preventDefault();saved=true"><mn-checkbox label="Receive product updates" [(checked)]="enabled"/><button mnButton type="submit" variant="outline">Save preferences</button></form><output>{{saved?'Preferences saved':''}}</output>`,{enabled:!0,saved:!1})],input:[E(`Controlled value`,[`MnInput`],`<mn-input aria-label="Project name" placeholder="Enter a project name" [(value)]="value"/><output>{{value}}</output>`,{value:``}),E(`Affixes and states`,[`MnInput`],`<mn-input aria-label="Website" prefix="https://" suffix=".com" placeholder="your-site"/><mn-input aria-label="Invalid value" invalid value="Needs attention"/><mn-input aria-label="Disabled field" disabled value="Unavailable"/>`),E(`Clear password and character count`,[`MnInput`,`MnButton`],`<mn-stack gap="3"><mn-input aria-label="Search" [(value)]="search" clearable showCharCount [maxLength]="20" clearLabel="Clear search"/><mn-input aria-label="Password" type="password" [(value)]="password" autocomplete="new-password" showPasswordLabel="Show password" hidePasswordLabel="Hide password"/><output>Search: {{search || '(empty)'}}</output><button mnButton variant="outline" (click)="search='Minerva';password='secret-pass'">Reset inputs</button></mn-stack>`,{search:`Minerva`,password:`secret-pass`},`clearable updates the value model; showCharCount follows maxLength. Password visibility changes the native type while preserving the bound value.`),E(`Sizes variants and read only`,[`MnInput`],`<mn-stack gap="3"><mn-input aria-label="Small" size="small" placeholder="Small"/><mn-input aria-label="Medium" size="medium" placeholder="Medium"/><mn-input aria-label="Large" size="large" placeholder="Large"/><mn-input aria-label="Filled" variant="filled" placeholder="Filled"/><mn-input aria-label="Unstyled" variant="unstyled" placeholder="Unstyled"/><mn-input aria-label="Read-only account" readOnly value="account-42"/><mn-input aria-label="Disabled account" disabled value="Unavailable"/></mn-stack>`,{},`readOnly preserves focus and copying; disabled blocks editing and removes the control from form submission. Sizes and visual variants are independent.`),E(`Native validation and field context`,[`MnInput`,`MnButton`,`MnFormControl`,`MnFormLabel`,`MnFormHelperText`,`MnFormErrorMessage`],`<form #form (submit)="$event.preventDefault();result='Submitted '+email" (reset)="email='';attempted=false;result='Reset'"><mn-stack gap="3"><mn-form-control required [invalid]="attempted && !form.checkValidity()"><mn-form-label>Email</mn-form-label><mn-input name="email" type="email" [(value)]="email" required autocomplete="email" placeholder="you@example.com"/><mn-form-helper-text>Use an address where we can reach you.</mn-form-helper-text><mn-form-error-message>Enter a valid email address.</mn-form-error-message></mn-form-control>${D(`<button mnButton type="submit" (click)="attempted=true">Subscribe</button><button mnButton type="reset" variant="ghost">Reset</button>`)}</mn-stack></form><output aria-live="polite">{{result}}</output>`,{email:``,attempted:!1,result:`Not submitted`},`Native name/type/required attributes participate in browser validation and submission. MnFormControl links the label, helper/error text and invalid state to the inner input; submit/reset handlers keep the value model authoritative.`)],textarea:[E(`Message input`,[`MnTextarea`],`<textarea mnTextarea aria-label="Message" [(value)]="value" rows="4" placeholder="Write a message"></textarea><output>{{value.length}} characters</output>`,{value:``}),E(`Read-only content`,[`MnTextarea`],`<textarea mnTextarea aria-label="Terms" value="Your published message appears here." readOnly rows="3"></textarea>`)],"number-input":[E(`Quantity`,[`MnNumberInput`],`<mn-number-input aria-label="Quantity" [(value)]="value" [min]="0" [max]="20"/><output>Quantity: {{value}}</output>`,{value:3}),E(`Step and bounds`,[`MnNumberInput`],`<mn-number-input aria-label="Percentage" [value]="50" [step]="5" [min]="0" [max]="100"/><mn-number-input aria-label="Unavailable quantity" disabled [value]="10"/>`)],"json-field":[E(`Validate and format`,[`MnJsonField`],`<mn-json-field label="Configuration" [(value)]="value"/><pre>{{value}}</pre>`,{value:`{"name":"Minerva","enabled":true}`}),E(`Invalid JSON`,[`MnJsonField`],`<mn-json-field label="Invalid configuration" value="invalid JSON" required/>`)],"key-value-editor":[E(`Edit environment values`,[`MnKeyValueEditor`],`<mn-key-value-editor [(value)]="value"/><output>{{value.length}} entries</output>`,{value:[{key:`REGION`,value:`eu-west`},{key:`MODE`,value:`production`}]}),E(`Disabled data`,[`MnKeyValueEditor`],`<mn-key-value-editor [value]="value" disabled/>`,{value:[{key:`VERSION`,value:`1.0`}]})],"tag-input":[E(`Add and remove labels`,[`MnTagInput`],`<mn-tag-input aria-label="Labels" [(value)]="value"/><output>{{value.join(', ')}}</output>`,{value:[`Design`,`Frontend`]}),E(`Suggested labels`,[`MnTagInput`],`<mn-tag-input aria-label="Skills" [options]="options" [(value)]="value"/>`,{options:[`TypeScript`,`Angular`,`React`,`Vue`],value:[]})],"loading-state":[E(`Section loading`,[`MnLoadingState`],`<mn-loading-state label="Loading workspace…"/>`),E(`Presentation sizes`,[`MnLoadingState`],`<mn-loading-state size="small" label="Fetching records"/><mn-loading-state size="large" label="Preparing your report"/>`)],"text-link":[E(`Inline links`,[`MnTextLink`],`<p>Read the <a mnTextLink href="#installation">installation guide</a> to get started.</p>`),E(`Subtle and action links`,[`MnTextLink`],D(`<a mnTextLink variant="subtle" href="#details">View details →</a><a mnTextLink variant="action" href="#settings">Workspace settings</a>`))],"description-list":[E(`Record metadata`,[`MnDescriptionList`],`<mn-description-list [items]="items"/>`,{items:[{term:`Owner`,description:`Ada Lovelace`},{term:`Status`,description:`Active`},{term:`Created`,description:`October 2026`}]}),E(`Operational details`,[`MnDescriptionList`],`<mn-description-list [items]="items"/>`,{items:[{term:`Region`,description:`Europe`},{term:`Environment`,description:`Production`}]})],list:[E(`Operational rows`,[`MnList`,`MnListItem`,`MnButton`],`<ul mnList dividers><li mnListItem label="Design review" description="Today at 14:00" icon="◷"><button mnButton mnActions size="small" variant="ghost" (click)="result='Review opened'">Open</button></li><li mnListItem label="Release notes" description="Updated yesterday" icon="▤"></li></ul><output>{{result}}</output>`,{result:``}),E(`Compact list`,[`MnList`,`MnListItem`],`<ul mnList density="compact" bordered><li mnListItem label="Engineering"></li><li mnListItem label="Research"></li><li mnListItem label="Support"></li></ul>`)],"code-block":[E(`Copyable source`,[`MnCodeBlock`],`<mn-code-block [code]="code" language="typescript" showLineNumbers showLanguage copyable/>`,{code:`const message = "Hello, Minerva";
console.log(message);`}),E(`Plain text`,[`MnCodeBlock`],`<mn-code-block code="pnpm add minerva-design" language="shell"/>`),E(`Marks`,[`MnCodeBlock`],`<mn-code-block [code]="code" language="typescript" showLineNumbers clickableMarks [marks]="marks" (markClick)="note=$event.mark.title ?? ''"/><output aria-live="polite">{{note}}</output>`,{code:`const message = "Hello, Minerva";
console.log(message);`,marks:[{id:`a`,start:16,end:32,title:`A string literal`},{id:`b`,start:34,end:45,color:`info`,title:`A call`}],note:``},`marks highlights character ranges over the syntax colors; markClick reports the clicked mark.`)],prose:[E(`Semantic typography`,[`MnProse`],`<article mnProse><h2>A readable article</h2><p>Use semantic HTML for content that follows your theme.</p><ul><li>Clear headings</li><li>Comfortable spacing</li></ul><blockquote>Good interfaces make information easy to understand.</blockquote></article>`),E(`Code and tables`,[`MnProse`],`<article mnProse><h3>Configuration</h3><p>Set <code>theme="dark"</code> on your provider.</p><table><thead><tr><th>Option</th><th>Value</th></tr></thead><tbody><tr><td>Locale</td><td>English</td></tr></tbody></table></article>`)],"theme-palette":[E(`Theme mode`,[`MnThemeToggle`],`<mn-theme-toggle/>`),E(`Color palettes`,[`MnPaletteToggle`],`<mn-palette-toggle/>`)],table:[E(`Semantic composition and merged cells`,[`MnTableRoot`,`MnTableHead`,`MnTableBody`,`MnTableRow`,`MnTableHeader`,`MnTableCell`,`MnButton`],`<mn-table-root label="Project summary" variant="bordered" [scroll]="{x:480}"><thead mnTableHead><tr mnTableRow><th mnTableHeader scope="col" [sort]="order"><button mnButton variant="ghost" size="small" (click)="order=order==='ascending'?'descending':'ascending'">Project</button></th><th mnTableHeader scope="col">Action</th></tr></thead><tbody mnTableBody><tr mnTableRow [selected]="selected"><td mnTableCell>Minerva</td><td mnTableCell><button mnButton size="small" (click)="selected=!selected">{{selected?'Deselect':'Select'}}</button></td></tr><tr mnTableRow><td mnTableCell colspan="2">Custom content spans both columns.</td></tr></tbody></mn-table-root>`,{selected:!1,order:`ascending`},`Native table directives preserve colspan/rowspan and custom interactive headers. Bind sort to expose aria-sort and styling state; the owner applies its own data ordering for a custom table.`),E(`Sort and select rows`,[`MnDataTable`],`<mn-data-table caption="Team members" [columns]="columns" [rows]="rows" selectable [(selection)]="selection" [(sort)]="sort"/><output>{{selection.length}} selected · Sort: {{sort?.key || 'none'}} {{sort?.direction || ''}}</output>`,{columns:[{key:`name`,header:`Name`,sortable:!0},{key:`role`,header:`Role`}],rows:[{id:`1`,name:`Grace`,role:`Engineer`},{id:`2`,name:`Ada`,role:`Designer`},{id:`3`,name:`Alan`,role:`Researcher`}],selection:[],sort:null}),E(`Empty and error states`,[`MnDataTable`],`<mn-data-table caption="Empty results" [columns]="columns"/><mn-data-table caption="Network error" [columns]="columns" [error]="error" (retry)="error=''"/>`,{columns:[{key:`name`,header:`Name`}],error:`Unable to load records`}),E(`Density appearance and loading`,[`MnDataTable`,`MnButton`],`${D(`<button mnButton variant="outline" (click)="compact=!compact">Toggle density</button><button mnButton variant="outline" (click)="striped=!striped">Toggle stripes</button><button mnButton (click)="loading=!loading">{{loading?'Finish loading':'Reload'}}</button>`)}<mn-data-table caption="Project inventory" [columns]="columns" [rows]="rows" [size]="compact?'small':'large'" [variant]="striped?'striped':'bordered'" [loading]="loading"/><output>{{loading?'Loading records':compact?'Compact density':'Comfortable density'}}</output>`,{compact:!0,striped:!0,loading:!1,columns:[{key:`name`,header:`Project`},{key:`status`,header:`Status`}],rows:[{id:`one`,name:`Minerva`,status:`Active`}]},`size and variant style the same data; loading temporarily replaces rows. Reload/Finish loading lets you inspect and restore the loading state without a network dependency.`)],"nav-tree":[E(`Hierarchical navigation`,[`MnNavTree`],`<mn-nav-tree [items]="items" [(value)]="value" [expanded]="['projects']"/><output>Selected: {{value}}</output>`,{value:`overview`,items:[{id:`overview`,label:`Overview`,icon:`⌂`},{id:`projects`,label:`Projects`,children:[{id:`design`,label:`Design`,description:`Active project`},{id:`engineering`,label:`Engineering`}]}]}),E(`Disabled destinations`,[`MnNavTree`],`<mn-nav-tree label="Administration" [items]="items"/>`,{items:[{id:`settings`,label:`Settings`},{id:`billing`,label:`Billing`,disabled:!0}]})],tabs:[E(`Switch between panels`,[`MnTabs`,`MnTab`,`MnTabPanel`],`<mn-tabs [(value)]="value"><mn-tab value="overview">Overview</mn-tab><mn-tab value="activity">Activity</mn-tab><mn-tab value="restricted" disabled>Restricted</mn-tab><mn-tab-panel value="overview">Project overview and summary.</mn-tab-panel><mn-tab-panel value="activity">Recent updates from the team.</mn-tab-panel></mn-tabs>`,{value:`overview`}),E(`Vertical pill tabs`,[`MnTabs`,`MnTab`,`MnTabPanel`],`<mn-tabs value="general" orientation="vertical" variant="pills"><mn-tab value="general">General</mn-tab><mn-tab value="security">Security</mn-tab><mn-tab-panel value="general">General settings</mn-tab-panel><mn-tab-panel value="security">Security settings</mn-tab-panel></mn-tabs>`)],"html-preview":[E(`Sandboxed document`,[`MnHtmlPreview`],`<mn-html-preview title="Email preview" [html]="html" [height]="200"/>`,{html:`<h1>Welcome to Minerva</h1><p>Your workspace is ready.</p>`}),E(`Mobile viewport`,[`MnHtmlPreview`],`<mn-html-preview title="Mobile preview" viewport="mobile" [mobileWidth]="280" [height]="200" [html]="html"/>`,{html:`<h2>Monthly update</h2><p>A bounded preview of a mobile email.</p>`})],"monaco-code-editor":[{...E(`Edit source`,[`MnMonacoCodeEditor`],`<mn-monaco-code-editor label="HTML source" language="html" [(value)]="value" [monaco]="monaco" height="240px"/><output>{{value.length}} characters</output>`,{value:`<h1>Hello Minerva</h1>
<p>Edit this document.</p>`}),monaco:!0},{...E(`Read-only source`,[`MnMonacoCodeEditor`],`<mn-monaco-code-editor label="Published source" language="typescript" value="const version = 1;" [monaco]="monaco" [readOnly]="true" height="180px"/>`),monaco:!0}],steps:[E(`Move through a workflow`,[`MnSteps`],`<mn-steps [items]="items" [(current)]="current"/><output>Step {{current+1}} of {{items.length}}</output>`,{items:[{label:`Details`},{label:`Review`},{label:`Publish`}],current:0}),E(`Read-only progress`,[`MnSteps`],`<mn-steps [items]="items" [current]="1" readOnly/>`,{items:[{label:`Received`},{label:`Processing`},{label:`Completed`}]})],upload:[E(`Select local files`,[`MnUpload`],`<mn-upload label="Attachments" multiple (filesSelected)="count=$event.length"/><output>{{count}} files selected</output>`,{count:0}),E(`Restricted file types`,[`MnUpload`],`<mn-upload label="Images" accept="image/*"/><mn-upload label="Disabled upload" disabled/>`)],select:[E(`Choose a role`,[`MnSelect`,`MnSelectItem`],`<mn-select aria-label="Role" [(value)]="value"><mn-select-item value="designer">Designer</mn-select-item><mn-select-item value="engineer">Engineer</mn-select-item><mn-select-item value="admin" disabled>Administrator</mn-select-item></mn-select><output>Role: {{value}}</output>`,{value:`designer`}),E(`Grouped options`,[`MnSelect`,`MnSelectItem`,`MnSelectGroup`,`MnSelectLabel`,`MnSelectSeparator`],`<mn-select aria-label="Location"><mn-select-group><mn-select-label>Europe</mn-select-label><mn-select-item value="london">London</mn-select-item><mn-select-item value="paris">Paris</mn-select-item></mn-select-group><mn-select-separator/><mn-select-item value="tokyo">Tokyo</mn-select-item></mn-select>`)],rating:[E(`Rate an experience`,[`MnRating`],`<mn-rating [(value)]="value"/><output>{{value}} of 5</output>`,{value:3}),E(`Read-only rating`,[`MnRating`],`<mn-rating [value]="4" readOnly/>`)],"month-calendar":[E(`Pick a date and inspect events`,[`MnMonthCalendar`],`<mn-month-calendar [month]="month" [(value)]="value" [events]="events"/><output>Selected: {{value}}</output>`,{month:new Date(2026,9,1),value:`2026-10-09`,events:[{id:`review`,date:`2026-10-09`,title:`Design review`}]}),E(`Disabled calendar`,[`MnMonthCalendar`],`<mn-month-calendar [month]="month" disabled size="small"/>`,{month:new Date(2026,9,1)})],slider:[E(`Pick a value`,[`MnSlider`],`<mn-slider aria-label="Volume" [(value)]="volume" (changeEnd)="saved = $event" showValue tooltip/><output>Saved on release: {{saved}}</output>`,{volume:40,saved:40},`[(value)] follows the drag and the keys; (changeEnd) fires once on release (or after a key press): save there. Arrows step, PageUp / PageDown move by 10%, Home / End jump to the bounds.`),E(`Range and marks`,[`MnSlider`],`<mn-slider aria-label="Price" range [(value)]="price" [step]="10" [marks]="true" color="success"/><output>{{price}}</output>`,{price:[20,80]},`range selects [start, end] with two thumbs that cannot cross; [marks]="true" draws a tick per step.`),E(`Sizes, disabled and read-only`,[`MnSlider`],`<mn-slider aria-label="Small" size="small" [defaultValue]="30"/><mn-slider aria-label="Large" size="large" color="warning" [defaultValue]="70"/><mn-slider aria-label="Disabled" disabled [defaultValue]="40"/><mn-slider aria-label="Read only" readOnly [defaultValue]="60" showValue/>`)],"week-strip":[E(`Pick a day of the week`,[`MnWeekStrip`],`<mn-week-strip [(value)]="value" [markers]="markers" today="2026-10-07" aria-label="Study days"/><output>Selected: {{value}}</output>`,{value:`2026-10-07`,markers:{"2026-10-06":2,"2026-10-07":3,"2026-10-08":!0}},`value is the selected day ("YYYY-MM-DD"); markers show a count badge (a number) or a dot (true). Arrows, Home / End and PageUp / PageDown move through the days.`),E(`Week navigation`,[`MnWeekStrip`],`<mn-week-strip showNavigation [(week)]="week" [(value)]="value" firstDayOfWeek="0"/><output>Week of {{week?.toDateString()}}</output>`,{week:new Date(2026,9,7),value:null},`showNavigation adds previous / next week buttons; [(week)] holds the first day of the displayed week.`),E(`Sizes and disabled`,[`MnWeekStrip`],`<mn-week-strip size="small" today="2026-10-07"/><mn-week-strip size="large" today="2026-10-07"/><mn-week-strip disabled value="2026-10-07" today="2026-10-07"/>`)],"media-player":[E(`Video`,[`MnMediaPlayer`],`<mn-media-player src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" title="Flower" pictureInPicture/>`,void 0,`Custom controls on a <video>: play / pause, skip, seek bar (role=slider), time, mute and volume, speed, picture-in-picture and fullscreen. Focus the player: Space / K, arrows, M, F.`),E(`Audio`,[`MnMediaPlayer`],`<mn-media-player src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" title="T-Rex roar" [skipSeconds]="0"/>`,void 0,`The type is inferred from the file extension (or mimeType): audio renders a surface bar.`),E(`Resume and progress`,[`MnMediaPlayer`],`<mn-media-player #player src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" [startTime]="saved" (timeUpdate)="time = $event.currentTime" (paused)="saved = time"/><button type="button" (click)="player.seek(0)">Restart</button><output>{{ time.toFixed(1) }}s · saved {{ saved }}s</output>`,{saved:2,time:0},`startTime resumes once the metadata loads; (timeUpdate) reports the progress; play(), pause() and seek() are public methods.`),E(`Speeds and skip step`,[`MnMediaPlayer`],`<mn-media-player src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" [playbackRates]="[1, 1.5, 2]" [skipSeconds]="3" aspectRatio="4 / 3" (rateChange)="rate = $event"/><output>Speed: {{ rate }}×</output>`,{rate:1}),E(`Captions`,[`MnMediaPlayer`],`<mn-media-player src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" title="Flower" [tracks]="tracks" (trackChange)="choice = $event.track?.label ?? 'Off'"/><output>Captions: {{ choice }}</output>`,{choice:`default track`,tracks:[{src:`data:text/vtt,WEBVTT%0A%0A00%3A00.000%20--%3E%2000%3A02.500%0AA%20flower%20bud%20in%20the%20morning%20light%0A%0A00%3A02.500%20--%3E%2000%3A06.000%0AIts%20petals%20slowly%20unfold%0A`,srclang:`en`,label:`English`,default:!0},{src:`data:application/x-subrip,1%0A00%3A00%3A00%2C000%20--%3E%2000%3A00%3A02%2C500%0AUn%20bouton%20de%20fleur%20au%20matin%0A%0A2%0A00%3A00%3A02%2C500%20--%3E%2000%3A00%3A06%2C000%0ASes%20p%C3%A9tales%20s'ouvrent%20lentement%0A`,srclang:`fr`,label:`Français`}]},`[tracks] takes WebVTT or SRT files (data: URLs here); the player draws the cues and adds a captions menu (C toggles them). The choice is remembered; (trackChange) reports it. Cross-origin files need crossOrigin and CORS headers.`)],"dashboard-columns":[E(`Board with cards`,[`MnDashboardColumns`,`MnDashboardColumn`,`MnCard`,`MnButton`],`<mn-dashboard-columns aria-label="Sprint 12">@for (column of columns; track column.title; let i = $index) {<mn-dashboard-column [title]="column.title" [count]="column.tasks.length">@for (task of column.tasks; track task.id; let j = $index) {<mn-card padding="small">{{task.title}} @if (i < columns.length - 1) {<button mnButton size="small" variant="ghost" (click)="columns[i + 1].tasks.push(task); column.tasks.splice(j, 1)">Move to {{columns[i + 1].title}}</button>}</mn-card>}</mn-dashboard-column>}</mn-dashboard-columns>`,{columns:[{title:`To do`,tasks:[{id:1,title:`Write the onboarding guide`}]},{title:`Doing`,tasks:[{id:2,title:`Ship the billing page`}]},{title:`Done`,tasks:[{id:3,title:`Set up error tracking`}]}]},`Projected cards form the column's role=list (each gets role=listitem). Here cards move with their own actions and the data is updated; see Drag and drop for draggable boards.`),E(`Drag and drop`,[`MnDashboardColumns`,`MnDashboardColumn`,`MnDashboardCard`,`MnCard`],`<mn-dashboard-columns aria-label="Sprint 12" draggable (cardMove)="$any(lists)[$event.toColumn].splice($event.toIndex, 0, $any(lists)[$event.fromColumn].splice($event.fromIndex, 1)[0])">@for (column of columns; track column.key) {<mn-dashboard-column [title]="column.title" [value]="column.key" [count]="$any(lists)[column.key].length">@for (task of $any(lists)[column.key]; track task.id) {<mn-dashboard-card [value]="task.id" [label]="task.title"><mn-card padding="small">{{task.title}}</mn-card></mn-dashboard-card>}</mn-dashboard-column>}</mn-dashboard-columns>`,{columns:[{key:`todo`,title:`To do`},{key:`doing`,title:`Doing`},{key:`done`,title:`Done`}],lists:{todo:[{id:`guide`,title:`Write the onboarding guide`},{id:`contrast`,title:`Audit color contrast`}],doing:[{id:`billing`,title:`Ship the billing page`}],done:[{id:`errors`,title:`Set up error tracking`}]}},`draggable moves the mn-dashboard-card children of keyed columns (value) with the mouse, a touch long press or the keyboard (Space / Enter picks up and drops, the arrows move, Escape cancels). The board is controlled: (cardMove) reports { cardKey, fromColumn, fromIndex, toColumn, toIndex } and the app moves the card (here: remove it, then insert it at toIndex).`),E(`Colors, counts and actions`,[`MnDashboardColumns`,`MnDashboardColumn`,`MnCard`,`MnButton`],`<mn-dashboard-columns aria-label="Roadmap" [columnWidth]="220" fill><mn-dashboard-column title="Ready" color="info" [count]="1" description="Groomed and estimated"><button mnButton mnDashboardActions size="small" variant="ghost">Add</button><mn-card padding="small">Pricing page copy</mn-card></mn-dashboard-column><mn-dashboard-column title="Blocked" color="danger" [count]="1"><mn-card padding="small">SSO with Okta</mn-card></mn-dashboard-column><mn-dashboard-column title="Research" color="#7c3aed" [count]="0" empty="Nothing to research"/></mn-dashboard-columns>`,{},`color takes a theme color or any CSS color (the dot before the title); [mnDashboardActions], [mnDashboardEmpty] and [mnDashboardFooter] project header actions, empty content and a footer.`),E(`Fixed height`,[`MnDashboardColumns`,`MnDashboardColumn`,`MnCard`],`<mn-dashboard-columns aria-label="Support queue" [height]="280"><mn-dashboard-column title="Inbox" color="info" [count]="tickets.length">@for (ticket of tickets; track ticket) {<mn-card padding="small">{{ticket}}</mn-card>}</mn-dashboard-column><mn-dashboard-column title="Fixed" color="success" [count]="0"/></mn-dashboard-columns>`,{tickets:Array.from({length:10},(e,t)=>`Ticket ${t+1}`)},`height / maxHeight bound the board: each column body scrolls vertically while the board scrolls horizontally.`)],"answer-sheet":[E(`Jump between questions`,[`MnAnswerSheet`],`<mn-answer-sheet [items]="items" [(value)]="value"/><output>Current question: {{value}}</output>`,{value:`q6`,items:Array.from({length:12},(e,t)=>({key:`q${t+1}`,status:t<5?`answered`:`unanswered`}))},`[(value)] holds the key of the current question (aria-current=step). One tab stop: arrows and Home / End move the focus, Enter / Space select.`),E(`Sections, statuses and legend`,[`MnAnswerSheet`],`<mn-answer-sheet [items]="items" [groups]="groups" [(value)]="value" showSummary showLegend aria-label="Review questions"/>`,{value:`s3`,groups:[{key:`single`,title:`Single choice`},{key:`short`,title:`Short answer`}],items:[{key:`s1`,group:`single`,status:`correct`},{key:`s2`,group:`single`,status:`correct`},{key:`s3`,group:`single`,status:`wrong`,flagged:!0},{key:`s4`,group:`single`,status:`skipped`},{key:`a1`,group:`short`,status:`answered`},{key:`a2`,group:`short`},{key:`a3`,group:`short`,disabled:!0}]},`groups titles the sections; showSummary counts the answered questions and showLegend explains the statuses present.`),E(`Scroll layout, sizes and columns`,[`MnAnswerSheet`],`<mn-answer-sheet [items]="items" layout="scroll" size="small" aria-label="Scrolling sheet"/><mn-answer-sheet [items]="items" columns="5" aria-label="Five columns"/><mn-answer-sheet [items]="items" disabled aria-label="Disabled sheet"/>`,{items:Array.from({length:10},(e,t)=>({key:`q${t+1}`,status:t<4?`answered`:`unanswered`}))})],flashcard:[E(`Flip a study card`,[`MnFlashcard`],`<div style="max-width:420px"><mn-flashcard front="What is the capital of Australia?" back="Canberra" showHint/></div>`,{},`Click the card or press Enter / Space on it to flip it; the hidden face is inert and the back is announced politely.`),E(`Review with rating buttons`,[`MnFlashcard`,`MnButton`],`<div style="display:grid;gap:12px;max-width:420px"><mn-flashcard [(flipped)]="flipped" backLabel="Definition" [frontLabel]="'Card ' + (index + 1) + ' / ' + deck.length"><strong mnFront style="font-size:1.5rem">{{deck[index]?.front}}</strong><span mnBack>{{deck[index]?.back}}</span><div mnFooter style="display:flex;gap:8px">@if (flipped) { @for (rating of ratings; track rating) {<button mnButton size="small" [variant]="rating === 'Good' ? 'solid' : 'outline'" (click)="last = deck[index]?.front + ': ' + rating; flipped = false; index = (index + 1) % deck.length">{{rating}}</button>} } @else {<button mnButton size="small" (click)="flipped = true">Show answer</button>}</div></mn-flashcard><output>{{last || 'Flip the card, then rate it.'}}</output></div>`,{flipped:!1,index:0,last:``,ratings:[`Again`,`Hard`,`Good`,`Easy`],deck:[{front:`ephemeral`,back:`Lasting for a very short time`},{front:`ubiquitous`,back:`Present, appearing or found everywhere`},{front:`laconic`,back:`Using very few words`}]},`[(flipped)] holds the face; project the faces with [mnFront] / [mnBack] and the rating buttons with [mnFooter] (below the card, not flipped).`),E(`Axis, variants and disabled`,[`MnFlashcard`],`<div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr))"><mn-flashcard variant="outline" axis="x" front="outline · axis x" back="Flips vertically" [minHeight]="140"/><mn-flashcard variant="filled" size="small" front="filled · small" back="Less padding" [minHeight]="140"/><mn-flashcard disabled front="Disabled" back="Never shown" [minHeight]="140"/></div>`)],"segmented-control":[E(`Pick a view`,[`MnSegmentedControl`],`<mn-segmented-control aria-label="Calendar view" [options]="options" [(value)]="value"/><output>Showing the {{value}} view</output>`,{value:`week`,options:[{value:`day`,label:`Day`},{value:`week`,label:`Week`},{value:`month`,label:`Month`}]},`[(value)] holds the selected value; (change) reports user selections. One tab stop: the arrow keys move and select, Home / End jump to the ends.`),E(`Sizes, full width and colors`,[`MnSegmentedControl`],`<mn-segmented-control size="small" aria-label="Small" [options]="periods" defaultValue="Daily"/><mn-segmented-control size="large" color="primary" aria-label="Large" [options]="periods" defaultValue="Weekly"/><mn-segmented-control fullWidth aria-label="Full width" [options]="periods" defaultValue="Monthly"/>`,{periods:[`Daily`,`Weekly`,`Monthly`]}),E(`Change events and disabled segments`,[`MnSegmentedControl`],`<mn-segmented-control aria-label="Theme" [options]="themes" [(value)]="mode" (change)="changes = changes + 1"/><mn-segmented-control disabled aria-label="Theme (disabled)" [options]="themes" value="light"/><output>Theme: {{mode}} ({{changes}} changes)</output>`,{mode:`dark`,changes:0,themes:[{value:`light`,label:`Light`},{value:`dark`,label:`Dark`},{value:`system`,label:`System`,disabled:!0}]},`Disabled segments are skipped by the arrow keys; disabled blocks the whole control. The component is also a ControlValueAccessor (ngModel, formControl).`)]},O[`config-provider`]=[E(`Reactive nested configuration`,[`MnConfig`,`MnButton`,`MnThemeToggle`,`MnPaletteToggle`],`${D(`<button mnButton variant="outline" (click)="localTheme=localTheme==='dark'?'light':'dark'">Toggle scoped theme</button><button mnButton variant="ghost" (click)="localTheme='light';localPalette=null">Reset scope</button><output>Scope: {{localTheme}} / {{localPalette || 'default'}}</output>`)}<mn-config [theme]="localTheme" (themeChange)="localTheme=$event" [palette]="localPalette" (paletteChange)="localPalette=$event"><mn-stack gap="3"><mn-theme-toggle/><mn-palette-toggle/><button mnButton>Scoped button</button><mn-config theme="light" palette="tech"><button mnButton>Nested light tech button</button></mn-config></mn-stack></mn-config>`,{localTheme:`light`,localPalette:null},`MnConfig creates an inheritable subtree scope. themeChange/paletteChange write user toggles back to the parent; the inner explicit configuration remains independent. provideMinerva() supplies application-root defaults.`),E(`Scoped configuration`,[`MnConfig`,`MnButton`],`<mn-config theme="dark"><div style="padding:20px;background:var(--surface-color);color:var(--text-color)"><button mnButton>Dark scoped button</button></div></mn-config>`),E(`Local language`,[`MnConfig`,`MnEmpty`],`<mn-config locale="zh"><mn-empty title="暂无项目" description="创建你的第一个项目。"/></mn-config>`),E(`Brand color`,[`MnConfig`,`MnButton`],D(`<mn-config primaryColor="#4f46e5"><button mnButton>Indigo</button></mn-config><mn-config primaryColor="#4f46e5" theme="dark"><div style="padding:12px;background:var(--surface-color)"><button mnButton>Indigo, dark (#7b85f2)</button></div></mn-config><mn-config [primaryColor]="{ light: '#0d9488', dark: '#5eead4' }"><button mnButton variant="outline">Teal pair</button></mn-config>`),void 0,`primaryColor sets the brand color without changing the light / dark mode: a single color gets a derived dark value, { light, dark } sets both. It wins over the palette's primary; provideMinerva({ primaryColor }) sets it for the whole application.`)],k=(e,t,n,r,i)=>({...E(t,n,r,i),id:e}),A=e=>typeof e==`object`&&!!e&&typeof e.$code==`string`,j=(e,t)=>t?{$code:e,$imports:t}:{$code:e},M=(e,t)=>[...new Set(Object.values(e.state).flatMap(e=>A(e)?e.$imports?.[t]??[]:[]))],N=e=>Math.round(e*100)/100,P={en:[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],zh:[`周一`,`周二`,`周三`,`周四`,`周五`,`周六`,`周日`],ja:[`月`,`火`,`水`,`木`,`金`,`土`,`日`],fr:[`lun.`,`mar.`,`mer.`,`jeu.`,`ven.`,`sam.`,`dim.`]},F={en:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`],zh:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`],ja:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`],fr:[`janv.`,`févr.`,`mars`,`avr.`,`mai`,`juin`]},I={en:[`00:00`,`04:00`,`08:00`,`12:00`,`16:00`,`20:00`],zh:[`00:00`,`04:00`,`08:00`,`12:00`,`16:00`,`20:00`],ja:[`0:00`,`4:00`,`8:00`,`12:00`,`16:00`,`20:00`],fr:[`0 h`,`4 h`,`8 h`,`12 h`,`16 h`,`20 h`]},L=(e,t,n)=>Array.from({length:e},(e,r)=>{let i=t+n*r+8*Math.sin(r/4),a=i+4*Math.sin(r*1.9);return{x:r+1,open:N(i),y:N(a),high:N(Math.max(i,a)+1.5),low:N(Math.min(i,a)-1.5)}}),R=L(24,80,.8),z=(e,t,n)=>Array.from({length:16},(r,i)=>({x:N(e+6*Math.sin(n+i*2.3)),y:N(t+9*Math.cos(n+i*1.7))})),B=[[1,-.32,.12,.41,-.58],[-.32,1,-.44,-.61,.72],[.12,-.44,1,.35,-.27],[.41,-.61,.35,1,-.49],[-.58,.72,-.27,-.49,1]],V=[`0–4`,`4–8`,`8–12`,`12–16`,`16–20`,`20–24`],H={en:[`Beijing`,`Shanghai`,`Tokyo`,`Seoul`,`Singapore`,`Dubai`,`Sydney`,`London`,`Paris`,`Frankfurt`,`New York`,`Chicago`,`Los Angeles`,`São Paulo`],zh:[`北京`,`上海`,`东京`,`首尔`,`新加坡`,`迪拜`,`悉尼`,`伦敦`,`巴黎`,`法兰克福`,`纽约`,`芝加哥`,`洛杉矶`,`圣保罗`],ja:[`北京`,`上海`,`東京`,`ソウル`,`シンガポール`,`ドバイ`,`シドニー`,`ロンドン`,`パリ`,`フランクフルト`,`ニューヨーク`,`シカゴ`,`ロサンゼルス`,`サンパウロ`],fr:[`Pékin`,`Shanghai`,`Tokyo`,`Séoul`,`Singapour`,`Dubaï`,`Sydney`,`Londres`,`Paris`,`Francfort`,`New York`,`Chicago`,`Los Angeles`,`São Paulo`]},U={en:[`Asia`,`Oceania`,`Europe`,`Americas`],zh:[`亚洲`,`大洋洲`,`欧洲`,`美洲`],ja:[`アジア`,`オセアニア`,`ヨーロッパ`,`南北アメリカ`],fr:[`Asie`,`Océanie`,`Europe`,`Amériques`]},W=[[0,8],[0,9],[0,9],[0,6],[0,8],[0,7],[1,5],[2,9],[2,8],[2,7],[3,9],[3,6],[3,7],[3,5]],G=[[0,1,120],[0,2,40],[1,2,55],[2,3,60],[1,3,35],[1,4,30],[4,6,28],[2,6,14],[4,5,25],[5,7,42],[5,8,21],[5,9,20],[7,8,70],[7,9,50],[8,9,35],[7,10,80],[8,10,40],[9,11,14],[10,11,90],[10,12,85],[11,12,60],[12,2,28],[12,6,14],[10,13,21],[12,1,18],[0,9,12],[4,7,21]].map(([e,t,n])=>({source:`c${e}`,target:`c${t}`,value:n})),be={en:{jobs:[`Install dependencies`,`Lint`,`Type check`,`Unit tests`,`Build`,`E2E tests`,`Package`,`Deploy`],minutes:`{n} min`,critical:`Critical path`},zh:{jobs:[`安装依赖`,`代码检查`,`类型检查`,`单元测试`,`构建`,`端到端测试`,`打包`,`部署`],minutes:`{n} 分钟`,critical:`关键路径`},ja:{jobs:[`依存関係のインストール`,`Lint`,`型チェック`,`単体テスト`,`ビルド`,`E2E テスト`,`パッケージ化`,`デプロイ`],minutes:`{n} 分`,critical:`クリティカルパス`},fr:{jobs:[`Installer les dépendances`,`Analyse statique`,`Vérification des types`,`Tests unitaires`,`Compilation`,`Tests E2E`,`Empaquetage`,`Déploiement`],minutes:`{n} min`,critical:`Chemin critique`}},xe=[[0,1],[0,2],[0,3],[2,4],[4,5],[1,6],[3,6],[4,6],[6,7],[5,7]].map(([e,t])=>({source:`j${e}`,target:`j${t}`})),Se={en:{modules:[`Utilities`,`HTTP`,`Translations`,`UI components`,`Charts`,`API client`,`Authentication`,`State store`,`Router`,`Dashboard`,`Reports`,`Application`],layers:[`Shared`,`Core`,`Features`,`Application`],hint:`Click a module to highlight its dependencies`,selected:`Selected: `},zh:{modules:[`工具函数`,`HTTP`,`多语言`,`UI 组件`,`图表`,`API 客户端`,`认证`,`状态管理`,`路由`,`仪表盘`,`报表`,`应用`],layers:[`共享`,`核心`,`功能`,`应用`],hint:`点击一个模块以高亮其依赖`,selected:`已选择：`},ja:{modules:[`ユーティリティ`,`HTTP`,`翻訳`,`UI コンポーネント`,`チャート`,`API クライアント`,`認証`,`状態管理`,`ルーター`,`ダッシュボード`,`レポート`,`アプリ`],layers:[`共有`,`コア`,`機能`,`アプリ`],hint:`モジュールをクリックすると依存関係が強調表示されます`,selected:`選択中: `},fr:{modules:[`Utilitaires`,`HTTP`,`Traductions`,`Composants UI`,`Graphiques`,`Client API`,`Authentification`,`Gestion d'état`,`Routeur`,`Tableau de bord`,`Rapports`,`Application`],layers:[`Partagé`,`Cœur`,`Fonctionnalités`,`Application`],hint:`Cliquez sur un module pour mettre en évidence ses dépendances`,selected:`Sélection : `}},Ce=[[0,1],[1,5],[5,6],[5,7],[6,8],[0,4],[2,3],[3,9],[3,10],[4,9],[4,10],[5,9],[5,10],[7,9],[7,10],[8,11],[9,11],[10,11],[6,11],[2,11]].map(([e,t])=>({source:`m${e}`,target:`m${t}`})),we={en:{roles:[`Chief executive`,`Technology`,`Finance`,`Operations`,`Web team`,`Mobile team`,`Platform team`,`Accounting`,`Treasury`,`Customer support`,`Logistics`],departments:[`Executive`,`Engineering`,`Finance`,`Operations`],hint:`Click a manager to collapse or expand the team`,collapsed:`{name}: collapsed`,expanded:`{name}: expanded`},zh:{roles:[`首席执行官`,`技术`,`财务`,`运营`,`Web 团队`,`移动团队`,`平台团队`,`会计`,`资金管理`,`客户支持`,`物流`],departments:[`管理层`,`研发`,`财务`,`运营`],hint:`点击管理者以折叠或展开团队`,collapsed:`{name}：已折叠`,expanded:`{name}：已展开`},ja:{roles:[`最高経営責任者`,`技術`,`財務`,`運営`,`Web チーム`,`モバイルチーム`,`プラットフォームチーム`,`経理`,`資金管理`,`カスタマーサポート`,`物流`],departments:[`経営`,`エンジニアリング`,`財務`,`運営`],hint:`マネージャーをクリックするとチームを折りたたみ / 展開します`,collapsed:`{name}: 折りたたみ`,expanded:`{name}: 展開`},fr:{roles:[`Direction générale`,`Technique`,`Finance`,`Opérations`,`Équipe web`,`Équipe mobile`,`Équipe plateforme`,`Comptabilité`,`Trésorerie`,`Support client`,`Logistique`],departments:[`Direction`,`Ingénierie`,`Finance`,`Opérations`],hint:`Cliquez sur un responsable pour replier ou déplier l'équipe`,collapsed:`{name} : replié`,expanded:`{name} : déplié`}},K=[[-1,0],[0,1],[0,2],[0,3],[1,1],[1,1],[1,1],[2,2],[2,2],[3,3],[3,3]],Te={en:[`Product launch`,`Research`,`User interviews`,`Market analysis`,`Design`,`Prototype`,`Usability tests`,`Development`,`Web app`,`Mobile app`,`Marketing`,`Ad campaign`,`Press release`],zh:[`产品发布`,`调研`,`用户访谈`,`市场分析`,`设计`,`原型`,`可用性测试`,`开发`,`网页应用`,`移动应用`,`市场营销`,`广告投放`,`新闻稿`],ja:[`製品ローンチ`,`リサーチ`,`ユーザーインタビュー`,`市場分析`,`デザイン`,`プロトタイプ`,`ユーザビリティテスト`,`開発`,`Web アプリ`,`モバイルアプリ`,`マーケティング`,`広告キャンペーン`,`プレスリリース`],fr:[`Lancement produit`,`Recherche`,`Entretiens utilisateurs`,`Analyse du marché`,`Conception`,`Prototype`,`Tests d'utilisabilité`,`Développement`,`Application web`,`Application mobile`,`Marketing`,`Campagne publicitaire`,`Communiqué de presse`]},q=[-1,0,1,1,0,4,4,0,7,7,0,10,10],J=e=>q[e]<=0?e:J(q[e]),Ee={en:[`Design`,`Engineering`,`Product`,`Marketing`],zh:[`设计`,`研发`,`产品`,`市场`],ja:[`デザイン`,`エンジニアリング`,`プロダクト`,`マーケティング`],fr:[`Design`,`Ingénierie`,`Produit`,`Marketing`]},De={en:{regions:[`North`,`South`,`East`,`West`,`Center`],hint:`Hover a ribbon to compare both directions`,flow:`{source} → {target}: {value}k · back: {reverse}k`,group:`{name}: {value}k`},zh:{regions:[`北部`,`南部`,`东部`,`西部`,`中部`],hint:`悬停在流带上以比较两个方向`,flow:`{source} → {target}：{value} 千人 · 反向：{reverse} 千人`,group:`{name}：{value} 千人`},ja:{regions:[`北部`,`南部`,`東部`,`西部`,`中部`],hint:`リボンにカーソルを合わせると両方向を比較できます`,flow:`{source} → {target}: {value} 千人 · 逆方向: {reverse} 千人`,group:`{name}: {value} 千人`},fr:{regions:[`Nord`,`Sud`,`Est`,`Ouest`,`Centre`],hint:`Survolez un ruban pour comparer les deux sens`,flow:`{source} → {target} : {value} k · retour : {reverse} k`,group:`{name} : {value} k`}},Y=[[0,1,32],[1,0,18],[0,4,45],[4,0,22],[1,4,38],[4,1,30],[2,4,51],[4,2,26],[3,4,29],[4,3,35],[2,3,14],[3,2,21],[1,2,12],[2,1,9]],Object.assign(O,{charts:[k(`mixed-series`,`Bars and a line`,[`MnChart`],`@let t = labels[language()];
<mn-chart
  [series]="[
    { name: t.revenue, type: 'bar', data: revenue },
    { name: t.target, type: 'line', curve: 'smooth', data: target }
  ]"
  [xAxis]="{ type: 'category', categories: t.months }"
  [height]="300"
/>`,{revenue:[42,51,48,63,72,80],target:[45,50,55,60,65,70],labels:{en:{revenue:`Revenue`,target:`Target`,months:F.en},zh:{revenue:`收入`,target:`目标`,months:F.zh},ja:{revenue:`売上`,target:`目標`,months:F.ja},fr:{revenue:`Chiffre d'affaires`,target:`Objectif`,months:F.fr}}}),k(`events`,`Engine events`,[`MnChart`],`@let t = labels[language()];
<mn-chart
  [series]="[{ name: t.latency, data: latency }]"
  [xAxis]="{ type: 'category', categories: t.hours }"
  crosshair
  [height]="260"
  (hover)="readout = $event ? $event.xLabel + ' · ' + $event.items[0]?.y : ''"
  (pointClick)="readout = t.clicked + ' — ' + $event.xLabel + ' · ' + $event.items[0]?.y"
/>
<output aria-live="polite">{{ readout || t.hint }}</output>`,{readout:``,latency:[42,38,65,120,96,54],labels:{en:{latency:`Latency (ms)`,hint:`Hover or click a point`,clicked:`Clicked`,hours:I.en},zh:{latency:`延迟（毫秒）`,hint:`悬停或点击一个数据点`,clicked:`已点击`,hours:I.zh},ja:{latency:`レイテンシ（ms）`,hint:`ポイントにカーソルを合わせるかクリックします`,clicked:`クリック`,hours:I.ja},fr:{latency:`Latence (ms)`,hint:`Survolez ou cliquez sur un point`,clicked:`Cliqué`,hours:I.fr}}})],"line-chart":[k(`trend`,`Weekly trend`,[`MnLineChart`],`@let t = labels[language()];
<mn-line-chart
  [series]="[
    { name: t.thisWeek, data: thisWeek },
    { name: t.lastWeek, data: lastWeek }
  ]"
  curve="smooth"
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>`,{thisWeek:[820,932,901,934,1290,1330,1320],lastWeek:[620,732,701,834,1090,1130,1020],labels:{en:{thisWeek:`This week`,lastWeek:`Last week`,days:P.en},zh:{thisWeek:`本周`,lastWeek:`上周`,days:P.zh},ja:{thisWeek:`今週`,lastWeek:`先週`,days:P.ja},fr:{thisWeek:`Cette semaine`,lastWeek:`Semaine dernière`,days:P.fr}}}),k(`reset-zoom`,`Zoom and reset`,[`MnLineChart`,`MnButton`],`@let t = labels[language()];
<mn-line-chart
  #chart
  [series]="[{ name: t.sensor, data: sensor }]"
  crosshair
  [interaction]="{ zoom: 'x' }"
  [height]="260"
/>
<button mnButton variant="outline" size="small" (click)="chart.resetZoom()">{{ t.reset }}</button>`,{sensor:Array.from({length:120},(e,t)=>Math.round(50+30*Math.sin(t/10)+10*Math.sin(t/2))),labels:{en:{sensor:`Sensor`,reset:`Reset zoom`},zh:{sensor:`传感器`,reset:`重置缩放`},ja:{sensor:`センサー`,reset:`ズームをリセット`},fr:{sensor:`Capteur`,reset:`Réinitialiser le zoom`}}})],"area-chart":[k(`stacked`,`Stacked areas`,[`MnAreaChart`],`@let t = labels[language()];
<mn-area-chart
  [series]="[
    { name: t.organic, data: organic },
    { name: t.paid, data: paid },
    { name: t.referral, data: referral }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.months }"
  [height]="280"
/>`,{organic:[320,332,301,334,390,430],paid:[120,132,101,134,190,230],referral:[60,72,71,74,90,110],labels:{en:{organic:`Organic`,paid:`Paid`,referral:`Referral`,months:F.en},zh:{organic:`自然流量`,paid:`付费流量`,referral:`推荐流量`,months:F.zh},ja:{organic:`オーガニック`,paid:`有料`,referral:`参照元`,months:F.ja},fr:{organic:`Naturel`,paid:`Payant`,referral:`Référents`,months:F.fr}}}),k(`percent`,`100% stacked`,[`MnAreaChart`],`@let t = labels[language()];
<mn-area-chart
  [series]="[
    { name: t.solar, data: solar },
    { name: t.wind, data: wind },
    { name: t.hydro, data: hydro }
  ]"
  percent
  curve="linear"
  [xAxis]="{ type: 'category', categories: t.hours }"
  [height]="280"
/>`,{solar:[0,5,40,62,35,2],wind:[48,52,30,22,38,55],hydro:[30,30,28,26,28,30],labels:{en:{solar:`Solar`,wind:`Wind`,hydro:`Hydro`,hours:I.en},zh:{solar:`太阳能`,wind:`风能`,hydro:`水电`,hours:I.zh},ja:{solar:`太陽光`,wind:`風力`,hydro:`水力`,hours:I.ja},fr:{solar:`Solaire`,wind:`Éolien`,hydro:`Hydraulique`,hours:I.fr}}})],"bar-chart":[k(`grouped`,`Grouped bars with labels`,[`MnBarChart`],`@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.lastYear, data: lastYear },
    { name: t.thisYear, data: thisYear }
  ]"
  labels
  [xAxis]="{ type: 'category', categories: t.regions }"
  [height]="280"
/>`,{lastYear:[38,52,61,45],thisYear:[44,58,72,49],labels:{en:{lastYear:`2024`,thisYear:`2025`,regions:[`North`,`South`,`East`,`West`]},zh:{lastYear:`2024 年`,thisYear:`2025 年`,regions:[`华北`,`华南`,`华东`,`西部`]},ja:{lastYear:`2024年`,thisYear:`2025年`,regions:[`北部`,`南部`,`東部`,`西部`]},fr:{lastYear:`2024`,thisYear:`2025`,regions:[`Nord`,`Sud`,`Est`,`Ouest`]}}}),k(`stacked`,`Stacked bars`,[`MnBarChart`],`@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.desktop, data: desktop },
    { name: t.mobile, data: mobile },
    { name: t.tablet, data: tablet }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>`,{desktop:[320,302,341,374,390,210,180],mobile:[420,432,401,454,490,630,610],tablet:[80,72,71,84,90,130,120],labels:{en:{desktop:`Desktop`,mobile:`Mobile`,tablet:`Tablet`,days:P.en},zh:{desktop:`桌面端`,mobile:`移动端`,tablet:`平板`,days:P.zh},ja:{desktop:`デスクトップ`,mobile:`モバイル`,tablet:`タブレット`,days:P.ja},fr:{desktop:`Ordinateur`,mobile:`Mobile`,tablet:`Tablette`,days:P.fr}}})],"scatter-chart":[k(`clusters`,`Two clusters`,[`MnScatterChart`],`@let t = labels[language()];
<mn-scatter-chart
  [series]="[
    { name: t.teamA, data: teamA },
    { name: t.teamB, data: teamB }
  ]"
  [xAxis]="{ title: t.hours }"
  [yAxis]="{ title: t.score }"
  [height]="300"
/>`,{teamA:z(12,62,1),teamB:z(26,80,4),labels:{en:{teamA:`Team A`,teamB:`Team B`,hours:`Hours`,score:`Score`},zh:{teamA:`A 组`,teamB:`B 组`,hours:`小时`,score:`得分`},ja:{teamA:`チームA`,teamB:`チームB`,hours:`時間`,score:`スコア`},fr:{teamA:`Équipe A`,teamB:`Équipe B`,hours:`Heures`,score:`Score`}}}),k(`point-click`,`Clicked point`,[`MnScatterChart`],`@let t = labels[language()];
<mn-scatter-chart
  [series]="[{ name: t.cities, pointSize: 12, data: [
    { x: 20.5, y: 31, label: t.names[0] },
    { x: 10.9, y: 17, label: t.names[1] },
    { x: 6.8, y: 15, label: t.names[2] },
    { x: 4.9, y: 15, label: t.names[3] },
    { x: 4.8, y: 21, label: t.names[4] },
    { x: 5.2, y: 16, label: t.names[5] }
  ] }]"
  [xAxis]="{ title: t.density }"
  [yAxis]="{ title: t.rent }"
  [height]="280"
  (pointClick)="selected = $event.items[0]?.label + ': ' + $event.items[0]?.x + ' · ' + $event.items[0]?.y + ' €/m²'"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>`,{selected:``,labels:{en:{cities:`Cities`,density:`Density (k/km²)`,rent:`Rent (€/m²)`,hint:`Click a city`,names:[`Paris`,`Lyon`,`Lille`,`Nantes`,`Nice`,`Bordeaux`]},zh:{cities:`城市`,density:`人口密度（千人/km²）`,rent:`租金（欧元/m²）`,hint:`点击一个城市`,names:[`巴黎`,`里昂`,`里尔`,`南特`,`尼斯`,`波尔多`]},ja:{cities:`都市`,density:`人口密度（千人/km²）`,rent:`家賃（€/m²）`,hint:`都市をクリックします`,names:[`パリ`,`リヨン`,`リール`,`ナント`,`ニース`,`ボルドー`]},fr:{cities:`Villes`,density:`Densité (k/km²)`,rent:`Loyer (€/m²)`,hint:`Cliquez sur une ville`,names:[`Paris`,`Lyon`,`Lille`,`Nantes`,`Nice`,`Bordeaux`]}}})],"quadrant-chart":[k(`priorities`,`Priority matrix`,[`MnQuadrantChart`],`@let t = labels[language()];
<mn-quadrant-chart
  [points]="[
    { x: 2, y: 7.5, label: t.features[0] },
    { x: 7.5, y: 8.5, label: t.features[1] },
    { x: 6, y: 6.5, label: t.features[2] },
    { x: 3, y: 3, label: t.features[3] },
    { x: 4, y: 8, label: t.features[4] },
    { x: 8.5, y: 3.5, label: t.features[5] }
  ]"
  [quadrants]="{
    topLeft: { label: t.quickWins },
    topRight: { label: t.bigBets },
    bottomLeft: { label: t.fillIns },
    bottomRight: { label: t.timeSinks }
  }"
  [xLabel]="t.effort"
  [yLabel]="t.impact"
  [height]="340"
/>`,{labels:{en:{effort:`Effort`,impact:`Impact`,quickWins:`Quick wins`,bigBets:`Big bets`,fillIns:`Fill-ins`,timeSinks:`Time sinks`,features:[`Dark mode`,`SSO`,`Search`,`Export`,`Onboarding`,`Billing`]},zh:{effort:`投入`,impact:`影响`,quickWins:`速赢`,bigBets:`重点投入`,fillIns:`补充项`,timeSinks:`低效项`,features:[`深色模式`,`单点登录`,`搜索`,`导出`,`新手引导`,`计费`]},ja:{effort:`工数`,impact:`効果`,quickWins:`クイックウィン`,bigBets:`大型施策`,fillIns:`穴埋め`,timeSinks:`時間の浪費`,features:[`ダークモード`,`SSO`,`検索`,`エクスポート`,`オンボーディング`,`課金`]},fr:{effort:`Effort`,impact:`Impact`,quickWins:`Gains rapides`,bigBets:`Paris majeurs`,fillIns:`Bouche-trous`,timeSinks:`Pertes de temps`,features:[`Mode sombre`,`SSO`,`Recherche`,`Export`,`Accueil`,`Facturation`]}}}),k(`point-click`,`Clicked task and quadrant`,[`MnQuadrantChart`],`@let t = labels[language()];
<mn-quadrant-chart
  [points]="[
    { x: 9, y: 8.5, label: t.tasks[0] },
    { x: 2.5, y: 9, label: t.tasks[1] },
    { x: 8, y: 3, label: t.tasks[2] },
    { x: 2, y: 2.5, label: t.tasks[3] },
    { x: 6.5, y: 7, label: t.tasks[4] }
  ]"
  [quadrants]="{
    topLeft: { label: t.corners.topLeft },
    topRight: { label: t.corners.topRight },
    bottomLeft: { label: t.corners.bottomLeft },
    bottomRight: { label: t.corners.bottomRight }
  }"
  [xLabel]="t.urgency"
  [yLabel]="t.importance"
  reverseX
  [height]="320"
  (pointClick)="selected = $event.point.label ?? ''"
  (quadrantClick)="selected = t.corners[$event.quadrant]"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>`,{selected:``,labels:{en:{urgency:`Urgency`,importance:`Importance`,hint:`Click a task or a quadrant`,corners:{topLeft:`Do first`,topRight:`Schedule`,bottomLeft:`Delegate`,bottomRight:`Eliminate`},tasks:[`Bug fix`,`Roadmap`,`Email`,`Newsletter`,`Interview`]},zh:{urgency:`紧急程度`,importance:`重要程度`,hint:`点击任务或象限`,corners:{topLeft:`立即处理`,topRight:`计划安排`,bottomLeft:`委派他人`,bottomRight:`放弃`},tasks:[`修复缺陷`,`路线图`,`邮件`,`简报`,`面试`]},ja:{urgency:`緊急度`,importance:`重要度`,hint:`タスクまたは象限をクリックします`,corners:{topLeft:`すぐ実行`,topRight:`計画`,bottomLeft:`委任`,bottomRight:`削除`},tasks:[`バグ修正`,`ロードマップ`,`メール`,`ニュースレター`,`面接`]},fr:{urgency:`Urgence`,importance:`Importance`,hint:`Cliquez sur une tâche ou un quadrant`,corners:{topLeft:`À faire`,topRight:`À planifier`,bottomLeft:`À déléguer`,bottomRight:`À abandonner`},tasks:[`Correctif`,`Feuille de route`,`E-mails`,`Newsletter`,`Entretien`]}}}),k(`triage`,`Badges, counts and selection`,[`MnQuadrantChart`],`@let t = labels[language()];
<mn-quadrant-chart
  [points]="[
    { x: 9, y: 8.5, label: t.tasks[0] },
    { x: 7, y: 7, label: t.tasks[1] },
    { x: 2.5, y: 9, label: t.tasks[2] },
    { x: 8, y: 3, label: t.tasks[3] },
    { x: 2, y: 2.5, label: t.tasks[4] }
  ]"
  [quadrants]="{
    topLeft: { badge: 'Q1', label: t.corners[0], description: t.hints[0] },
    topRight: { badge: 'Q2', label: t.corners[1], description: t.hints[1] },
    bottomLeft: { badge: 'Q3', label: t.corners[2], description: t.hints[2] },
    bottomRight: { badge: 'Q4', label: t.corners[3], description: t.hints[3] }
  }"
  reverseX
  [showTicks]="false"
  showCounts
  [selectedIndex]="selected"
  [height]="360"
  (pointClick)="selected = $event.index"
/>
<output aria-live="polite">{{ selected < 0 ? t.hint : t.tasks[selected] }}</output>`,{selected:-1,labels:{en:{hint:`Click a task to select it`,corners:[`Do first`,`Schedule`,`Delegate`,`Eliminate`],hints:[`Do it now`,`Plan a time`,`Hand it off`,`Drop it`],tasks:[`Bug fix`,`Tax filing`,`Roadmap`,`Email`,`Newsletter`]},zh:{hint:`点击任务以选中`,corners:[`立即处理`,`计划安排`,`委派他人`,`放弃`],hints:[`立即做`,`安排时间`,`交给别人`,`不做`],tasks:[`修复缺陷`,`报税`,`路线图`,`邮件`,`简报`]},ja:{hint:`タスクをクリックして選択します`,corners:[`すぐ実行`,`計画`,`委任`,`削除`],hints:[`今すぐやる`,`時間を確保`,`人に任せる`,`やらない`],tasks:[`バグ修正`,`確定申告`,`ロードマップ`,`メール`,`ニュースレター`]},fr:{hint:`Cliquez sur une tâche pour la sélectionner`,corners:[`À faire`,`À planifier`,`À déléguer`,`À abandonner`],hints:[`Maintenant`,`Réserver un créneau`,`Confier`,`Laisser tomber`],tasks:[`Correctif`,`Impôts`,`Feuille de route`,`E-mails`,`Newsletter`]}}})],"quadrant-task-board":[k(`basic`,`Eisenhower task board`,[`MnQuadrantTaskBoard`],`@let t = labels[language()];
<!-- the + of a quadrant (or a click on its empty area) adds a task, the
     buttons above the active task edit or delete it, tasks move by drag and
     drop or Shift + arrows; the built-in texts follow the page language -->
<mn-quadrant-task-board
  [(points)]="tasks[language()]"
  [quadrants]="{
    topLeft: { label: t.doFirst, color: 'var(--danger-color, #ef4444)' },
    topRight: { label: t.schedule, color: 'var(--primary-color, #4f46e5)' },
    bottomLeft: { label: t.delegate, color: 'var(--warning-color, #f59e0b)' },
    bottomRight: { label: t.eliminate, color: 'var(--text-secondary-color, #64748b)' }
  }"
  [axisLabels]="{
    top: t.important,
    bottom: t.notImportant,
    left: t.urgent,
    right: t.notUrgent
  }"
  reverseX
  [showTicks]="false"
  [height]="360"
  [ariaLabel]="t.boardAria"
/>`,{tasks:j(`{
  en: [
    { x: 9, y: 8, label: "Fix login outage" },
    { x: 3, y: 8.5, label: "Quarterly planning" },
    { x: 8, y: 3, label: "Book travel" },
    { x: 2.5, y: 2, label: "Inbox zero" },
  ],
  zh: [
    { x: 9, y: 8, label: "修复登录故障" },
    { x: 3, y: 8.5, label: "季度规划" },
    { x: 8, y: 3, label: "预订差旅" },
    { x: 2.5, y: 2, label: "清空收件箱" },
  ],
  ja: [
    { x: 9, y: 8, label: "ログイン障害の修正" },
    { x: 3, y: 8.5, label: "四半期計画" },
    { x: 8, y: 3, label: "出張の予約" },
    { x: 2.5, y: 2, label: "受信トレイの整理" },
  ],
  fr: [
    { x: 9, y: 8, label: "Réparer la connexion" },
    { x: 3, y: 8.5, label: "Planification trimestrielle" },
    { x: 8, y: 3, label: "Réserver le voyage" },
    { x: 2.5, y: 2, label: "Boîte de réception vide" },
  ],
} as Record<"en" | "zh" | "ja" | "fr", QuadrantPoint[]>`,{"minerva-design/charts/core":[`QuadrantPoint`]}),labels:{en:{doFirst:`Do first`,schedule:`Schedule`,delegate:`Delegate`,eliminate:`Eliminate`,important:`Important`,notImportant:`Not important`,urgent:`Urgent`,notUrgent:`Not urgent`,boardAria:`Task matrix: drag tasks between quadrants`},zh:{doFirst:`立即做`,schedule:`计划做`,delegate:`委派`,eliminate:`删除`,important:`重要`,notImportant:`不重要`,urgent:`紧急`,notUrgent:`不紧急`,boardAria:`任务矩阵：在象限之间拖动任务`},ja:{doFirst:`すぐやる`,schedule:`計画する`,delegate:`任せる`,eliminate:`やめる`,important:`重要`,notImportant:`重要でない`,urgent:`緊急`,notUrgent:`緊急でない`,boardAria:`タスクマトリクス：象限の間でタスクをドラッグ`},fr:{doFirst:`À faire tout de suite`,schedule:`À planifier`,delegate:`À déléguer`,eliminate:`À abandonner`,important:`Important`,notImportant:`Pas important`,urgent:`Urgent`,notUrgent:`Pas urgent`,boardAria:`Matrice des tâches : faites glisser les tâches entre les quadrants`}}}),k(`custom-labels`,`Custom texts and change log`,[`MnQuadrantTaskBoard`],`@let t = labels[language()];
<mn-quadrant-task-board
  [points]="ideas"
  (pointsChange)="ideas = $event; changes = changes + 1"
  [labels]="t.board"
  [quadrants]="{
    topLeft: { label: t.quickWins },
    topRight: { label: t.bigBets },
    bottomLeft: { label: t.fillIns },
    bottomRight: { label: t.timeSinks }
  }"
  [xLabel]="t.effort"
  [yLabel]="t.impact"
  [showCounts]="false"
  [height]="320"
/>
<output aria-live="polite">{{ t.changes }} {{ changes }} · {{ ideas.length }}</output>`,{changes:0,ideas:j(`[
  { x: 2, y: 8, label: "Dark mode" },
  { x: 8, y: 8.5, label: "SSO" },
  { x: 3, y: 3, label: "Export" },
] as QuadrantPoint[]`,{"minerva-design/charts/core":[`QuadrantPoint`]}),labels:{en:{effort:`Effort`,impact:`Impact`,quickWins:`Quick wins`,bigBets:`Big bets`,fillIns:`Fill-ins`,timeSinks:`Time sinks`,changes:`Changes:`,board:{add:`Add idea`,edit:`Edit idea`,delete:`Drop idea`,name:`Idea`,deleteConfirm:`“{name}” leaves the backlog.`}},zh:{effort:`投入`,impact:`影响`,quickWins:`速赢`,bigBets:`重点投入`,fillIns:`补充项`,timeSinks:`低效项`,changes:`修改次数：`,board:{add:`添加想法`,edit:`编辑想法`,delete:`放弃想法`,name:`想法`,deleteConfirm:`“{name}”将移出待办池。`}},ja:{effort:`工数`,impact:`効果`,quickWins:`クイックウィン`,bigBets:`大型施策`,fillIns:`穴埋め`,timeSinks:`時間の浪費`,changes:`変更回数：`,board:{add:`アイデアを追加`,edit:`アイデアを編集`,delete:`アイデアを外す`,name:`アイデア`,deleteConfirm:`「{name}」をバックログから外します。`}},fr:{effort:`Effort`,impact:`Impact`,quickWins:`Gains rapides`,bigBets:`Paris majeurs`,fillIns:`Bouche-trous`,timeSinks:`Pertes de temps`,changes:`Modifications :`,board:{add:`Ajouter une idée`,edit:`Modifier l’idée`,delete:`Retirer l’idée`,name:`Idée`,deleteConfirm:`« {name} » quitte le backlog.`}}}})],"candlestick-chart":[k(`ohlc`,`Daily candles`,[`MnCandlestickChart`],`@let t = labels[language()];
<mn-candlestick-chart
  [series]="[{ name: t.price, data: candles }]"
  [xAxis]="{ title: t.day }"
  [yAxis]="{ zero: false }"
  [height]="300"
/>`,{candles:L(24,100,0),labels:{en:{price:`Price`,day:`Day`},zh:{price:`价格`,day:`天`},ja:{price:`価格`,day:`日`},fr:{price:`Cours`,day:`Jour`}}}),k(`moving-average`,`Moving average overlay`,[`MnCandlestickChart`],`@let t = labels[language()];
<mn-candlestick-chart
  [series]="[
    { name: t.price, data: candles },
    { name: t.average, type: 'line', curve: 'smooth', data: average }
  ]"
  [yAxis]="{ zero: false }"
  [height]="300"
/>`,{candles:R,average:R.map((e,t)=>{let n=R.slice(Math.max(0,t-4),t+1);return{x:e.x,y:N(n.reduce((e,t)=>e+t.y,0)/n.length)}}),labels:{en:{price:`Price`,average:`5-day average`},zh:{price:`价格`,average:`5 日均线`},ja:{price:`価格`,average:`5日移動平均`},fr:{price:`Cours`,average:`Moyenne 5 jours`}}})],"heatmap-chart":[k(`weekly-activity`,`Weekly activity`,[`MnHeatmapChart`],`@let t = labels[language()];
<mn-heatmap-chart
  [data]="cells[language()]"
  [xCategories]="hours"
  [yCategories]="t.rows"
  [name]="t.commits"
  [height]="300"
/>`,{hours:V,cells:Object.fromEntries(Object.entries(P).map(([e,t])=>[e,t.flatMap((e,t)=>V.map((n,r)=>({x:n,y:e,value:t<5&&r>1&&r<5?20+(t*7+r*5)%13:(t*3+r*2)%6})))])),labels:{en:{commits:`Commits`,rows:[...P.en].reverse()},zh:{commits:`提交数`,rows:[...P.zh].reverse()},ja:{commits:`コミット数`,rows:[...P.ja].reverse()},fr:{commits:`Commits`,rows:[...P.fr].reverse()}}}),k(`color-scale`,`Diverging color scale`,[`MnHeatmapChart`],`@let t = labels[language()];
<mn-heatmap-chart
  [data]="cells[language()]"
  [colorScale]="['#2563eb', '#f8fafc', '#dc2626']"
  [valueRange]="[-1, 1]"
  [name]="t.correlation"
  [radius]="4"
  [height]="320"
/>`,{cells:Object.fromEntries([[`en`,[`Price`,`Rating`,`Delivery`,`Returns`,`Sales`]],[`zh`,[`价格`,`评分`,`配送`,`退货`,`销量`]],[`ja`,[`価格`,`評価`,`配送`,`返品`,`売上`]],[`fr`,[`Prix`,`Note`,`Livraison`,`Retours`,`Ventes`]]].map(([e,t])=>[e,B.flatMap((e,n)=>e.map((e,r)=>({x:t[r],y:t[n],value:e})))])),labels:{en:{correlation:`Correlation`},zh:{correlation:`相关系数`},ja:{correlation:`相関係数`},fr:{correlation:`Corrélation`}}})],sparkline:[k(`kpi`,`KPI cards`,[`MnSparkline`],`@let t = labels[language()];
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px">
  <div style="display: grid; gap: 4px">
    <span>{{ t.orders }}</span><strong>1,284</strong>
    <mn-sparkline [data]="orders" [name]="t.orders" />
  </div>
  <div style="display: grid; gap: 4px">
    <span>{{ t.revenue }}</span><strong>€48.2k</strong>
    <mn-sparkline type="area" [data]="revenue" [name]="t.revenue" />
  </div>
  <div style="display: grid; gap: 4px">
    <span>{{ t.signups }}</span><strong>312</strong>
    <mn-sparkline type="bar" [data]="signups" [name]="t.signups" />
  </div>
</div>`,{orders:[32,41,38,52,49,61,58,70,66,74],revenue:[3.1,3.4,3.2,3.9,4.4,4.1,4.6,4.8,4.5,4.9],signups:[12,18,9,22,30,25,19,28,33,31],labels:{en:{orders:`Orders`,revenue:`Revenue`,signups:`Sign-ups`},zh:{orders:`订单`,revenue:`收入`,signups:`注册`},ja:{orders:`注文`,revenue:`売上`,signups:`登録`},fr:{orders:`Commandes`,revenue:`Chiffre d'affaires`,signups:`Inscriptions`}}}),k(`reference`,`Target line and hover`,[`MnSparkline`],`@let t = labels[language()];
<mn-sparkline
  [data]="latency"
  [reference]="200"
  [name]="t.latency"
  [height]="64"
  (hover)="hovered = $event?.items?.[0]?.y ?? null"
/>
<output aria-live="polite">{{
  hovered === null ? t.hint : t.latency + ': ' + hovered + ' ms (' + t.target + ')'
}}</output>`,{hovered:null,latency:[182,175,190,214,230,205,188,176,169,181,196,172],labels:{en:{latency:`p95 latency`,target:`target 200 ms`,hint:`Hover the line`},zh:{latency:`p95 延迟`,target:`目标 200 毫秒`,hint:`将指针悬停在折线上`},ja:{latency:`p95 レイテンシ`,target:`目標 200 ms`,hint:`線にカーソルを合わせます`},fr:{latency:`Latence p95`,target:`objectif 200 ms`,hint:`Survolez la courbe`}}})],"pie-chart":[k(`pie`,`Traffic sources`,[`MnPieChart`],`@let t = labels[language()];
<mn-pie-chart
  [data]="[
    { name: t[0], value: 1048 },
    { name: t[1], value: 735 },
    { name: t[2], value: 580 },
    { name: t[3], value: 484 },
    { name: t[4], value: 300 }
  ]"
  [height]="300"
/>`,{labels:{en:[`Search`,`Direct`,`Social`,`Email`,`Referral`],zh:[`搜索`,`直接访问`,`社交媒体`,`邮件`,`推荐`],ja:[`検索`,`ダイレクト`,`ソーシャル`,`メール`,`参照元`],fr:[`Recherche`,`Direct`,`Réseaux sociaux`,`E-mail`,`Référents`]}}),k(`donut`,`Donut with center texts`,[`MnDonutChart`],`@let t = labels[language()];
<mn-donut-chart
  [data]="[
    { name: t.plans[0], value: 2 },
    { name: t.plans[1], value: 18 },
    { name: t.plans[2], value: 46 },
    { name: t.plans[3], value: 34 }
  ]"
  centerValue="€100k"
  [centerLabel]="t.total"
  [height]="300"
  (itemClick)="selected = $event.name + ': €' + $event.value + 'k'"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>`,{selected:``,labels:{en:{total:`monthly revenue`,hint:`Click a slice`,plans:[`Free`,`Starter`,`Pro`,`Enterprise`]},zh:{total:`月收入`,hint:`点击一个扇区`,plans:[`免费版`,`入门版`,`专业版`,`企业版`]},ja:{total:`月間売上`,hint:`スライスをクリックします`,plans:[`無料`,`スターター`,`プロ`,`エンタープライズ`]},fr:{total:`revenu mensuel`,hint:`Cliquez sur une part`,plans:[`Gratuit`,`Starter`,`Pro`,`Entreprise`]}}})],"radar-chart":[k(`compare`,`Compare two series`,[`MnRadarChart`],`@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.axes[0], max: 100 },
    { name: t.axes[1], max: 100 },
    { name: t.axes[2], max: 100 },
    { name: t.axes[3], max: 100 },
    { name: t.axes[4], max: 100 }
  ]"
  [series]="[
    { name: t.current, values: [72, 85, 64, 90, 58] },
    { name: t.next, values: [88, 80, 78, 92, 81] }
  ]"
  [height]="320"
/>`,{labels:{en:{current:`Current model`,next:`Next model`,axes:[`Speed`,`Reliability`,`Comfort`,`Safety`,`Efficiency`]},zh:{current:`当前型号`,next:`新型号`,axes:[`速度`,`可靠性`,`舒适性`,`安全性`,`能效`]},ja:{current:`現行モデル`,next:`次期モデル`,axes:[`速度`,`信頼性`,`快適性`,`安全性`,`効率`]},fr:{current:`Modèle actuel`,next:`Nouveau modèle`,axes:[`Vitesse`,`Fiabilité`,`Confort`,`Sécurité`,`Efficacité`]}}}),k(`circle`,`Circular grid`,[`MnRadarChart`],`@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.skills[0], max: 10 },
    { name: t.skills[1], max: 10 },
    { name: t.skills[2], max: 10 },
    { name: t.skills[3], max: 10 },
    { name: t.skills[4], max: 10 },
    { name: t.skills[5], max: 10 }
  ]"
  [series]="[{ name: t.profile, values: [9, 6, 7, 8, 5, 6] }]"
  shape="circle"
  [levels]="5"
  [height]="320"
/>`,{labels:{en:{profile:`Profile`,skills:[`Frontend`,`Backend`,`Design`,`Testing`,`DevOps`,`Data`]},zh:{profile:`能力画像`,skills:[`前端`,`后端`,`设计`,`测试`,`运维`,`数据`]},ja:{profile:`プロフィール`,skills:[`フロントエンド`,`バックエンド`,`デザイン`,`テスト`,`DevOps`,`データ`]},fr:{profile:`Profil`,skills:[`Front-end`,`Back-end`,`Design`,`Tests`,`DevOps`,`Données`]}}})],"gauge-chart":[k(`bands`,`Colored bands`,[`MnGaugeChart`],`<mn-gauge-chart
  [value]="72"
  [label]="labels[language()]"
  [bands]="[
    { to: 60, color: 'var(--success-color, #16a34a)' },
    { to: 85, color: 'var(--warning-color, #f59e0b)' },
    { to: 100, color: 'var(--danger-color, #dc2626)' }
  ]"
/>`,{labels:{en:`CPU load`,zh:`CPU 负载`,ja:`CPU 負荷`,fr:`Charge CPU`}}),k(`needle`,`Needle and custom scale`,[`MnGaugeChart`],`<mn-gauge-chart
  [value]="128"
  [max]="200"
  [label]="labels[language()]"
  needle
  [sweep]="270"
  [thickness]="0.1"
  [height]="260"
/>`,{labels:{en:`Speed (km/h)`,zh:`速度（公里/小时）`,ja:`速度（km/h）`,fr:`Vitesse (km/h)`}})],"funnel-chart":[k(`conversion`,`Conversion funnel`,[`MnFunnelChart`],`@let t = labels[language()];
<mn-funnel-chart
  [data]="[
    { name: t[0], value: 12000 },
    { name: t[1], value: 4800 },
    { name: t[2], value: 2100 },
    { name: t[3], value: 860 }
  ]"
  [height]="300"
/>`,{labels:{en:[`Visits`,`Sign-ups`,`Trials`,`Purchases`],zh:[`访问`,`注册`,`试用`,`购买`],ja:[`訪問`,`登録`,`トライアル`,`購入`],fr:[`Visites`,`Inscriptions`,`Essais`,`Achats`]}}),k(`bars`,`Sorted bars`,[`MnFunnelChart`],`@let t = labels[language()];
<mn-funnel-chart
  [data]="[
    { name: t[0], value: 180 },
    { name: t[1], value: 940 },
    { name: t[2], value: 42 },
    { name: t[3], value: 410 },
    { name: t[4], value: 31 }
  ]"
  shape="bar"
  sort="descending"
  [height]="300"
/>`,{labels:{en:[`Interviews`,`Applications`,`Offers`,`Screenings`,`Hires`],zh:[`面试`,`申请`,`录用通知`,`筛选`,`入职`],ja:[`面接`,`応募`,`内定`,`書類選考`,`採用`],fr:[`Entretiens`,`Candidatures`,`Offres`,`Présélections`,`Embauches`]}})],"treemap-chart":[k(`nested`,`Nested nodes`,[`MnTreemapChart`],`@let t = labels[language()];
<mn-treemap-chart
  [data]="[
    { name: t.media, children: [
      { name: t.photos, value: 48 },
      { name: t.videos, value: 96 },
      { name: t.music, value: 22 }
    ] },
    { name: t.documents, children: [
      { name: t.work, value: 31 },
      { name: t.personal, value: 12 }
    ] },
    { name: t.apps, children: [
      { name: t.tools, value: 40 },
      { name: t.games, value: 64 }
    ] }
  ]"
  [height]="320"
/>`,{labels:{en:{media:`Media`,documents:`Documents`,apps:`Apps`,photos:`Photos`,videos:`Videos`,music:`Music`,work:`Work`,personal:`Personal`,tools:`Tools`,games:`Games`},zh:{media:`媒体`,documents:`文档`,apps:`应用`,photos:`照片`,videos:`视频`,music:`音乐`,work:`工作`,personal:`个人`,tools:`工具`,games:`游戏`},ja:{media:`メディア`,documents:`書類`,apps:`アプリ`,photos:`写真`,videos:`動画`,music:`音楽`,work:`仕事`,personal:`個人`,tools:`ツール`,games:`ゲーム`},fr:{media:`Médias`,documents:`Documents`,apps:`Applications`,photos:`Photos`,videos:`Vidéos`,music:`Musique`,work:`Travail`,personal:`Personnel`,tools:`Outils`,games:`Jeux`}}}),k(`flat`,`Flat list`,[`MnTreemapChart`],`@let t = labels[language()];
<mn-treemap-chart
  [data]="[
    { name: t[0], value: 4750 },
    { name: t[1], value: 745 },
    { name: t[2], value: 600 },
    { name: t[3], value: 440 },
    { name: t[4], value: 1460 },
    { name: t[5], value: 46 }
  ]"
  [gap]="4"
  [height]="300"
/>`,{labels:{en:[`Asia`,`Europe`,`North America`,`South America`,`Africa`,`Oceania`],zh:[`亚洲`,`欧洲`,`北美洲`,`南美洲`,`非洲`,`大洋洲`],ja:[`アジア`,`ヨーロッパ`,`北米`,`南米`,`アフリカ`,`オセアニア`],fr:[`Asie`,`Europe`,`Amérique du Nord`,`Amérique du Sud`,`Afrique`,`Océanie`]}})]}),Object.assign(O,{"horizontal-bar-chart":[k(`ranking`,`Most visited pages`,[`MnHorizontalBarChart`],`@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[{ name: t.views, data: [
    { x: t.pages[0], y: 48200 },
    { x: t.pages[1], y: 31900 },
    { x: t.pages[2], y: 27400 },
    { x: t.pages[3], y: 15800 },
    { x: t.pages[4], y: 9100 },
    { x: t.pages[5], y: 4300 }
  ] }]"
  [xAxis]="{ type: 'category' }"
  labels
  [height]="300"
/>`,{labels:{en:{views:`Page views`,pages:[`Home`,`Pricing`,`Documentation`,`Blog`,`Careers`,`Contact`]},zh:{views:`浏览量`,pages:[`首页`,`价格`,`文档`,`博客`,`招聘`,`联系我们`]},ja:{views:`ページビュー`,pages:[`ホーム`,`料金`,`ドキュメント`,`ブログ`,`採用情報`,`お問い合わせ`]},fr:{views:`Pages vues`,pages:[`Accueil`,`Tarifs`,`Documentation`,`Blog`,`Carrières`,`Contact`]}}}),k(`survey`,`Survey answers, 100 % stacked`,[`MnHorizontalBarChart`],`@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[
    { name: t.answers[0], data: [{ x: t.questions[0], y: 72 }, { x: t.questions[1], y: 58 }, { x: t.questions[2], y: 64 }, { x: t.questions[3], y: 81 }] },
    { name: t.answers[1], data: [{ x: t.questions[0], y: 18 }, { x: t.questions[1], y: 27 }, { x: t.questions[2], y: 21 }, { x: t.questions[3], y: 12 }] },
    { name: t.answers[2], data: [{ x: t.questions[0], y: 10 }, { x: t.questions[1], y: 15 }, { x: t.questions[2], y: 15 }, { x: t.questions[3], y: 7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [palette]="answerColors"
  stacked
  percent
  [height]="260"
/>`,{answerColors:[`var(--success-color, #16a34a)`,`var(--text-secondary-color, #9ca3af)`,`var(--danger-color, #dc2626)`],labels:{en:{answers:[`Agree`,`Neutral`,`Disagree`],questions:[`Easy to set up`,`Good documentation`,`Fast enough`,`Would recommend`]},zh:{answers:[`同意`,`中立`,`不同意`],questions:[`易于上手`,`文档完善`,`速度够快`,`愿意推荐`]},ja:{answers:[`そう思う`,`どちらでもない`,`そう思わない`],questions:[`導入が簡単`,`ドキュメントが充実`,`十分に速い`,`人に勧めたい`]},fr:{answers:[`D’accord`,`Neutre`,`Pas d’accord`],questions:[`Facile à installer`,`Bonne documentation`,`Assez rapide`,`Je recommande`]}}})],"range-area-chart":[k(`forecast`,`Forecast with an uncertainty band`,[`MnRangeAreaChart`],`@let t = labels[language()];
@let m = months[language()];
<mn-range-area-chart
  [series]="[
    { name: t.band, data: [{ x: m[5], y0: 158, y: 158 }, { x: m[6], y0: 159, y: 167 }, { x: m[7], y0: 161, y: 177 }, { x: m[8], y0: 160, y: 184 }, { x: m[9], y0: 162, y: 194 }, { x: m[10], y0: 165, y: 205 }, { x: m[11], y0: 166, y: 214 }] },
    { name: t.actual, type: 'line', data: [{ x: m[0], y: 120 }, { x: m[1], y: 132 }, { x: m[2], y: 128 }, { x: m[3], y: 141 }, { x: m[4], y: 150 }, { x: m[5], y: 158 }] },
    { name: t.forecast, type: 'line', lineWidth: 1, data: [{ x: m[5], y: 158 }, { x: m[6], y: 163 }, { x: m[7], y: 169 }, { x: m[8], y: 172 }, { x: m[9], y: 178 }, { x: m[10], y: 185 }, { x: m[11], y: 190 }] }
  ]"
  [xAxis]="{ type: 'category', categories: m }"
  [height]="300"
/>`,{labels:{en:{actual:`Actual`,forecast:`Forecast`,band:`80 % interval`},zh:{actual:`实际`,forecast:`预测`,band:`80% 置信区间`},ja:{actual:`実績`,forecast:`予測`,band:`80% 予測区間`},fr:{actual:`Réel`,forecast:`Prévision`,band:`Intervalle à 80 %`}},months:{en:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],zh:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`,`7月`,`8月`,`9月`,`10月`,`11月`,`12月`],ja:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`,`7月`,`8月`,`9月`,`10月`,`11月`,`12月`],fr:[`janv.`,`févr.`,`mars`,`avr.`,`mai`,`juin`,`juil.`,`août`,`sept.`,`oct.`,`nov.`,`déc.`]}}),k(`temperature`,`Daily temperature range`,[`MnRangeAreaChart`],`@let t = labels[language()];
@let d = days[language()];
<mn-range-area-chart
  [series]="[
    { name: t.range, data: [{ x: d[0], y0: 8, y: 16 }, { x: d[1], y0: 9, y: 18 }, { x: d[2], y0: 7, y: 15 }, { x: d[3], y0: 11, y: 21 }, { x: d[4], y0: 13, y: 24 }, { x: d[5], y0: 12, y: 22 }, { x: d[6], y0: 10, y: 19 }] },
    { name: t.mean, type: 'line', data: [{ x: d[0], y: 12 }, { x: d[1], y: 13.5 }, { x: d[2], y: 11 }, { x: d[3], y: 16 }, { x: d[4], y: 18.5 }, { x: d[5], y: 17 }, { x: d[6], y: 14.5 }] }
  ]"
  curve="linear"
  [xAxis]="{ type: 'category' }"
  [height]="280"
/>`,{labels:{en:{range:`Min – max`,mean:`Average`},zh:{range:`最低 – 最高`,mean:`平均`},ja:{range:`最低 – 最高`,mean:`平均`},fr:{range:`Min – max`,mean:`Moyenne`}},days:{en:[`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`,`Sun`],zh:[`周一`,`周二`,`周三`,`周四`,`周五`,`周六`,`周日`],ja:[`月`,`火`,`水`,`木`,`金`,`土`,`日`],fr:[`lun.`,`mar.`,`mer.`,`jeu.`,`ven.`,`sam.`,`dim.`]}})],"mixed-chart":[k(`revenue-growth`,`Revenue and growth on two axes`,[`MnMixedChart`],`@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.revenue, type: 'bar', data: [{ x: m[0], y: 182 }, { x: m[1], y: 196 }, { x: m[2], y: 214 }, { x: m[3], y: 205 }, { x: m[4], y: 238 }, { x: m[5], y: 261 }] },
    { name: t.growth, type: 'line', curve: 'smooth', yAxis: 'right', data: [{ x: m[0], y: 0 }, { x: m[1], y: 7.7 }, { x: m[2], y: 9.2 }, { x: m[3], y: -4.2 }, { x: m[4], y: 16.1 }, { x: m[5], y: 9.7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [height]="300"
/>`,{labels:{en:{revenue:`Revenue (k€)`,growth:`Growth`},zh:{revenue:`收入（千欧元）`,growth:`增长率`},ja:{revenue:`売上（千ユーロ）`,growth:`成長率`},fr:{revenue:`Chiffre d’affaires (k€)`,growth:`Croissance`}},months:{en:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`],zh:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`],ja:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`],fr:[`janv.`,`févr.`,`mars`,`avr.`,`mai`,`juin`]}}),k(`climate`,`Climate chart`,[`MnMixedChart`],`@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.rain, type: 'bar', color: 'var(--chart-series-2, #0ea5e9)', data: [{ x: m[0], y: 52 }, { x: m[1], y: 41 }, { x: m[2], y: 48 }, { x: m[3], y: 55 }, { x: m[4], y: 68 }, { x: m[5], y: 71 }, { x: m[6], y: 64 }, { x: m[7], y: 62 }, { x: m[8], y: 55 }, { x: m[9], y: 64 }, { x: m[10], y: 63 }, { x: m[11], y: 60 }] },
    { name: t.temperature, type: 'line', curve: 'smooth', yAxis: 'right', color: 'var(--chart-series-4, #ef4444)', data: [{ x: m[0], y: 3.5 }, { x: m[1], y: 4.2 }, { x: m[2], y: 7.6 }, { x: m[3], y: 10.7 }, { x: m[4], y: 14.5 }, { x: m[5], y: 17.6 }, { x: m[6], y: 19.8 }, { x: m[7], y: 19.6 }, { x: m[8], y: 16.4 }, { x: m[9], y: 12.3 }, { x: m[10], y: 7.6 }, { x: m[11], y: 4.4 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  crosshair
  [height]="300"
/>`,{labels:{en:{rain:`Precipitation (mm)`,temperature:`Temperature (°C)`},zh:{rain:`降水量（毫米）`,temperature:`气温（°C）`},ja:{rain:`降水量（mm）`,temperature:`気温（°C）`},fr:{rain:`Précipitations (mm)`,temperature:`Température (°C)`}},months:{en:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],zh:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`,`7月`,`8月`,`9月`,`10月`,`11月`,`12月`],ja:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`,`7月`,`8月`,`9月`,`10月`,`11月`,`12月`],fr:[`janv.`,`févr.`,`mars`,`avr.`,`mai`,`juin`,`juil.`,`août`,`sept.`,`oct.`,`nov.`,`déc.`]}})],"bubble-chart":[k(`countries`,`Wealth, health and population`,[`MnBubbleChart`],`@let t = labels[language()];
<mn-bubble-chart
  [series]="[{ name: t.life, showLabels: true, data: [
    { x: 34, y: 84.5, value: 124, label: t.names[0] },
    { x: 44, y: 82.5, value: 68, label: t.names[1] },
    { x: 12.6, y: 78.6, value: 1410, label: t.names[2] },
    { x: 9, y: 75.9, value: 216, label: t.names[3] },
    { x: 2.5, y: 70.8, value: 1430, label: t.names[4] },
    { x: 2.2, y: 53.6, value: 224, label: t.names[5] },
    { x: 52, y: 81.2, value: 84, label: t.names[6] },
    { x: 11.5, y: 75, value: 128, label: t.names[7] }
  ] }]"
  [xAxis]="{ title: t.gdp }"
  [yAxis]="{ title: t.life, min: 50 }"
  [maxSize]="64"
  [height]="320"
/>`,{labels:{en:{gdp:`GDP per capita (k$)`,life:`Life expectancy`,names:[`Japan`,`France`,`China`,`Brazil`,`India`,`Nigeria`,`Germany`,`Mexico`]},zh:{gdp:`人均 GDP（千美元）`,life:`预期寿命`,names:[`日本`,`法国`,`中国`,`巴西`,`印度`,`尼日利亚`,`德国`,`墨西哥`]},ja:{gdp:`1 人あたり GDP（千ドル）`,life:`平均寿命`,names:[`日本`,`フランス`,`中国`,`ブラジル`,`インド`,`ナイジェリア`,`ドイツ`,`メキシコ`]},fr:{gdp:`PIB par habitant (k$)`,life:`Espérance de vie`,names:[`Japon`,`France`,`Chine`,`Brésil`,`Inde`,`Nigeria`,`Allemagne`,`Mexique`]}}}),k(`portfolio`,`Portfolio risk and return`,[`MnBubbleChart`],`@let t = labels[language()];
<mn-bubble-chart
  [series]="[
    { name: t.assets[0], data: [{ x: 4, y: 3, value: 30 }] },
    { name: t.assets[1], data: [{ x: 15, y: 7, value: 25 }] },
    { name: t.assets[2], data: [{ x: 12, y: 6, value: 20 }] },
    { name: t.assets[3], data: [{ x: 28, y: 12, value: 15 }] },
    { name: t.assets[4], data: [{ x: 16, y: 4, value: 5 }] },
    { name: t.assets[5], data: [{ x: 45, y: 18, value: 5 }] }
  ]"
  [xAxis]="{ title: t.risk }"
  [yAxis]="{ title: t.return }"
  [height]="300"
  (pointClick)="selected = $event.items[0] ? $event.items[0].seriesName + ': ' + $event.items[0].value + ' %' : selected"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>`,{selected:``,labels:{en:{risk:`Risk (volatility %)`,return:`Expected return %`,hint:`Click a bubble`,assets:[`Bonds`,`Index fund`,`Real estate`,`Tech stocks`,`Gold`,`Start-ups`]},zh:{risk:`风险（波动率 %）`,return:`预期收益 %`,hint:`点击一个气泡`,assets:[`债券`,`指数基金`,`房地产`,`科技股`,`黄金`,`初创企业`]},ja:{risk:`リスク（ボラティリティ %）`,return:`期待リターン %`,hint:`バブルをクリックします`,assets:[`債券`,`インデックスファンド`,`不動産`,`ハイテク株`,`金`,`スタートアップ`]},fr:{risk:`Risque (volatilité %)`,return:`Rendement attendu %`,hint:`Cliquez sur une bulle`,assets:[`Obligations`,`Fonds indiciel`,`Immobilier`,`Actions tech`,`Or`,`Start-up`]}}})],"histogram-chart":[k(`latency`,`Response time distribution`,[`MnHistogramChart`],`@let t = labels[language()];
<mn-histogram-chart
  [values]="latency"
  [name]="t.requests"
  [xAxis]="{ title: t.ms }"
  [height]="300"
/>`,{latency:j(`Array.from({ length: 5000 }, (_, i) => Math.round(Math.exp(4.8 + 0.35 * Math.sqrt(-2 * Math.log(1 - (Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1))) * Math.cos(2 * Math.PI * (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1)))))`),labels:{en:{requests:`Requests`,ms:`Response time (ms)`},zh:{requests:`请求数`,ms:`响应时间（毫秒）`},ja:{requests:`リクエスト数`,ms:`応答時間（ms）`},fr:{requests:`Requêtes`,ms:`Temps de réponse (ms)`}}}),k(`binning`,`Binning rules`,[`MnHistogramChart`],`@let t = labels[language()];
<div style="display: flex; gap: 8px; align-items: center">
  <span>{{ t.bins }}</span>
  <button type="button" (click)="bins = 'sturges'">Sturges</button>
  <button type="button" (click)="bins = 10">10</button>
  <button type="button" (click)="bins = 40">40</button>
</div>
<mn-histogram-chart
  [values]="ages"
  [bins]="bins"
  [name]="t.count"
  [xAxis]="{ title: t.age }"
  [height]="280"
/>`,{bins:`sturges`,ages:j(`Array.from({ length: 2000 }, (_, i) => Math.round((i % 3 ? 42 : 22) + ((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) - 1) * (i % 3 ? 16 : 6)))`),labels:{en:{count:`Count`,bins:`Bins:`,age:`Age`},zh:{count:`人数`,bins:`分箱：`,age:`年龄`},ja:{count:`人数`,bins:`ビン：`,age:`年齢`},fr:{count:`Effectif`,bins:`Classes :`,age:`Âge`}}})],"boxplot-chart":[k(`services`,`Response times per service`,[`MnBoxPlotChart`],`@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.services[0], values: samples[0] },
    { x: t.services[1], values: samples[1] },
    { x: t.services[2], values: samples[2] },
    { x: t.services[3], values: samples[3] }
  ]"
  [name]="t.time"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ title: t.time }"
  [height]="300"
/>`,{samples:[[42,48,51,55,57,60,62,66,70,75,140],[120,135,150,160,168,175,190,210,230,380],[30,32,35,36,38,40,41,43,47,52],[60,75,88,96,105,118,126,140,160,190,260]],labels:{en:{time:`Response time (ms)`,services:[`Search`,`Checkout`,`Profile`,`Images`]},zh:{time:`响应时间（毫秒）`,services:[`搜索`,`结账`,`个人资料`,`图片`]},ja:{time:`応答時間（ms）`,services:[`検索`,`決済`,`プロフィール`,`画像`]},fr:{time:`Temps de réponse (ms)`,services:[`Recherche`,`Paiement`,`Profil`,`Images`]}}}),k(`horizontal`,`Horizontal boxes, min-max whiskers`,[`MnBoxPlotChart`],`@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.classes[0], values: scores[0] },
    { x: t.classes[1], values: scores[1] },
    { x: t.classes[2], values: scores[2] }
  ]"
  [name]="t.score"
  orientation="horizontal"
  whisker="minmax"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ min: 0, max: 100 }"
  [height]="240"
/>`,{scores:[[55,61,64,68,70,72,75,78,81,86,92],[40,52,58,63,66,71,73,77,84,95],[62,66,69,70,72,74,75,77,79,83]],labels:{en:{score:`Score`,classes:[`Class A`,`Class B`,`Class C`]},zh:{score:`分数`,classes:[`一班`,`二班`,`三班`]},ja:{score:`得点`,classes:[`A 組`,`B 組`,`C 組`]},fr:{score:`Note`,classes:[`Classe A`,`Classe B`,`Classe C`]}}})],"waterfall-chart":[k(`pnl`,`Profit and loss bridge`,[`MnWaterfallChart`],`@let s = steps[language()];
<mn-waterfall-chart
  [steps]="[
    { label: s[0], value: 420 },
    { label: s[1], value: -180 },
    { label: s[2], kind: 'subtotal' },
    { label: s[3], value: -130 },
    { label: s[4], value: 25 },
    { label: s[5], value: -34 },
    { label: s[6], kind: 'total' }
  ]"
  [height]="320"
/>`,{steps:{en:[`Revenue`,`Cost of sales`,`Gross profit`,`Operating costs`,`Other income`,`Taxes`,`Net income`],zh:[`营业收入`,`销售成本`,`毛利润`,`运营费用`,`其他收入`,`税费`,`净利润`],ja:[`売上高`,`売上原価`,`売上総利益`,`営業費用`,`その他収益`,`税金`,`純利益`],fr:[`Chiffre d’affaires`,`Coût des ventes`,`Marge brute`,`Charges d’exploitation`,`Autres produits`,`Impôts`,`Résultat net`]}}),k(`cash-flow`,`Cash flow from an opening balance`,[`MnWaterfallChart`],`@let t = labels[language()];
@let m = months[language()];
<mn-waterfall-chart
  [steps]="[
    { label: t.opening, value: 120 },
    { label: m[0], value: 18 },
    { label: m[1], value: -12 },
    { label: m[2], value: 25 },
    { label: m[3], value: -30 },
    { label: m[4], value: 14 },
    { label: m[5], value: 9 },
    { label: t.closing, kind: 'total' }
  ]"
  [labels]="false"
  orientation="horizontal"
  [height]="360"
/>`,{labels:{en:{opening:`Opening`,closing:`Closing`},zh:{opening:`期初`,closing:`期末`},ja:{opening:`期首`,closing:`期末`},fr:{opening:`Ouverture`,closing:`Clôture`}},months:{en:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`],zh:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`],ja:[`1月`,`2月`,`3月`,`4月`,`5月`,`6月`],fr:[`janv.`,`févr.`,`mars`,`avr.`,`mai`,`juin`]}})],"gantt-chart":[k(`project`,`Project plan by phase`,[`MnGanttChart`],`@let t = labels[language()];
<mn-gantt-chart
  [tasks]="[
    { name: t.tasks[0], group: t.phases[0], start: start, end: start + 6 * day, progress: 1 },
    { name: t.tasks[1], group: t.phases[0], start: start + 4 * day, end: start + 10 * day, progress: 1 },
    { name: t.tasks[2], group: t.phases[0], start: start + 8 * day, end: start + 16 * day, progress: 0.7 },
    { name: t.tasks[3], group: t.phases[1], start: start + 12 * day, end: start + 26 * day, progress: 0.4 },
    { name: t.tasks[4], group: t.phases[1], start: start + 12 * day, end: start + 28 * day, progress: 0.3 },
    { name: t.tasks[5], group: t.phases[2], start: start + 26 * day, end: start + 32 * day, progress: 0 },
    { name: t.tasks[6], start: start + 33 * day, milestone: true }
  ]"
  [progressName]="t.progress"
  [milestoneName]="t.milestones"
  [height]="320"
/>`,{day:864e5,start:17724096e5,labels:{en:{phases:[`Design`,`Build`,`Launch`],tasks:[`Research`,`Wireframes`,`Visual design`,`Frontend`,`Backend`,`Testing`,`Release`],progress:`Progress`,milestones:`Milestones`},zh:{phases:[`设计`,`开发`,`发布`],tasks:[`用户调研`,`线框图`,`视觉设计`,`前端`,`后端`,`测试`,`上线`],progress:`进度`,milestones:`里程碑`},ja:{phases:[`設計`,`開発`,`リリース`],tasks:[`リサーチ`,`ワイヤーフレーム`,`ビジュアルデザイン`,`フロントエンド`,`バックエンド`,`テスト`,`公開`],progress:`進捗`,milestones:`マイルストーン`},fr:{phases:[`Conception`,`Développement`,`Lancement`],tasks:[`Recherche`,`Maquettes`,`Design visuel`,`Front-end`,`Back-end`,`Tests`,`Mise en ligne`],progress:`Avancement`,milestones:`Jalons`}}}),k(`sprint`,`Sprint with a today line`,[`MnGanttChart`],`@let t = labels[language()];
<mn-gantt-chart
  [tasks]="[
    { name: t.tasks[0], start: start, end: start + 3 * day, progress: 1 },
    { name: t.tasks[1], start: start + day, end: start + 5 * day, progress: 0.8 },
    { name: t.tasks[2], start: start + 3 * day, end: start + 8 * day, progress: 0.5 },
    { name: t.tasks[3], start: start + 5 * day, end: start + 9 * day, progress: 0.1 },
    { name: t.tasks[4], start: start + 8 * day, end: start + 10 * day, progress: 0 }
  ]"
  [today]="start + 6.5 * day"
  [todayLabel]="t.today"
  [height]="260"
/>`,{day:864e5,start:1792368e6,labels:{en:{tasks:[`Login page`,`Password reset`,`Email templates`,`Audit log`,`Release notes`],today:`Today`},zh:{tasks:[`登录页`,`重置密码`,`邮件模板`,`审计日志`,`发布说明`],today:`今天`},ja:{tasks:[`ログイン画面`,`パスワード再設定`,`メールテンプレート`,`監査ログ`,`リリースノート`],today:`今日`},fr:{tasks:[`Page de connexion`,`Mot de passe oublié`,`Modèles d’e-mail`,`Journal d’audit`,`Notes de version`],today:`Aujourd’hui`}}}),k(`daily`,`Daily schedule in swimlanes`,[`MnGanttChart`],`@let t = labels[language()];
<mn-gantt-chart
  [tasks]="[
    { id: 'a', name: t.tasks[0], row: t.lanes[0], group: t.groups[0], start: day + 9 * hour, end: day + 9.5 * hour },
    { id: 'b', name: t.tasks[1], row: t.lanes[0], group: t.groups[0], start: day + 10 * hour, end: day + 12 * hour },
    { id: 'c', name: t.tasks[2], row: t.lanes[0], group: t.groups[1], start: day + 16 * hour, end: day + 17.5 * hour },
    { id: 'd', name: t.tasks[3], row: t.lanes[1], group: t.groups[0], start: day + 8 * hour, end: day + 8.75 * hour },
    { id: 'e', name: t.tasks[4], row: t.lanes[1], group: t.groups[0], start: day + 13.5 * hour, end: day + 15 * hour, progress: 0.6 },
    { id: 'f', name: t.tasks[5], row: t.lanes[1], group: t.groups[1], start: day + 20 * hour, end: day + 21 * hour },
    { id: 'g', name: t.tasks[6], row: t.lanes[2], group: t.groups[2], start: day + 12 * hour, end: day + 13 * hour },
    { id: 'h', name: t.tasks[7], row: t.lanes[2], group: t.groups[2], start: day + 18 * hour, end: day + 19.5 * hour },
    { id: 'i', name: t.tasks[8], row: t.lanes[2], group: t.groups[1], start: day + 21.25 * hour, end: day + 22 * hour }
  ]"
  [today]="day + 14.5 * hour"
  [todayLabel]="t.now"
  [height]="260"
/>`,{hour:36e5,day:j(`new Date(2026, 10, 2).getTime()`),labels:{en:{lanes:[`High`,`Medium`,`Low`],groups:[`Work`,`Study`,`Life`],tasks:[`Standup`,`Deep work`,`Mock exam`,`Email`,`Code review`,`Flashcards`,`Lunch`,`Gym`,`Reading`],now:`Now`},zh:{lanes:[`高`,`中`,`低`],groups:[`工作`,`学习`,`生活`],tasks:[`站会`,`专注工作`,`模拟考试`,`邮件`,`代码评审`,`背单词`,`午饭`,`健身`,`阅读`],now:`现在`},ja:{lanes:[`高`,`中`,`低`],groups:[`仕事`,`学習`,`生活`],tasks:[`朝会`,`集中作業`,`模擬試験`,`メール`,`コードレビュー`,`単語カード`,`昼食`,`ジム`,`読書`],now:`現在`},fr:{lanes:[`Haute`,`Moyenne`,`Basse`],groups:[`Travail`,`Études`,`Perso`],tasks:[`Point d’équipe`,`Travail de fond`,`Examen blanc`,`E-mails`,`Revue de code`,`Fiches`,`Déjeuner`,`Sport`,`Lecture`],now:`Maintenant`}}})],"calendar-heatmap":[k(`contributions`,`A year of contributions`,[`MnCalendarHeatmap`],`@let t = labels[language()];
<mn-calendar-heatmap [data]="days" [range]="2025" [locale]="t.locale" />`,{days:j(`Array.from({ length: 365 }, (_, i) => ({ date: Date.UTC(2025, 0, 1 + i), value: Math.floor((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) * (i % 7 < 5 ? 9 : 3)) }))`),labels:{en:{locale:`en-US`,unit:`contributions`},zh:{locale:`zh-CN`,unit:`次贡献`},ja:{locale:`ja-JP`,unit:`件のコントリビューション`},fr:{locale:`fr-FR`,unit:`contributions`}}}),k(`months`,`Monthly calendars`,[`MnCalendarHeatmap`],`@let t = labels[language()];
<mn-calendar-heatmap
  [data]="steps"
  [range]="['2026-01-01', '2026-06-30']"
  layout="months"
  [levels]="5"
  [thresholds]="[4000, 6000, 8000, 10000]"
  color="var(--success-color, #16a34a)"
  [locale]="t.locale"
  [height]="420"
/>`,{steps:j(`Array.from({ length: 181 }, (_, i) => ({ date: Date.UTC(2026, 0, 1 + i), value: Math.round(3000 + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) * 9000) }))`),labels:{en:{locale:`en-US`},zh:{locale:`zh-CN`},ja:{locale:`ja-JP`},fr:{locale:`fr-FR`}}})],"radial-bar-chart":[k(`activity`,`Activity rings`,[`MnRadialBarChart`],`@let t = labels[language()];
<mn-radial-bar-chart
  [data]="[
    { name: t.rings[0], value: 420, max: 500, color: '#ef4444' },
    { name: t.rings[1], value: 24, max: 30, color: '#22c55e' },
    { name: t.rings[2], value: 9, max: 12, color: '#06b6d4' }
  ]"
  [sweep]="360"
  centerValue="78 %"
  [centerLabel]="t.today"
/>`,{labels:{en:{rings:[`Move`,`Exercise`,`Stand`],today:`of today’s goals`},zh:{rings:[`活动`,`锻炼`,`站立`],today:`今日目标`},ja:{rings:[`ムーブ`,`エクササイズ`,`スタンド`],today:`今日の目標`},fr:{rings:[`Bouger`,`M’entraîner`,`Me lever`],today:`des objectifs du jour`}}}),k(`okr`,`Key results completion`,[`MnRadialBarChart`],`@let n = names[language()];
<mn-radial-bar-chart
  [data]="[
    { name: n[0], value: 92 },
    { name: n[1], value: 74 },
    { name: n[2], value: 61 },
    { name: n[3], value: 48 },
    { name: n[4], value: 35 }
  ]"
  [max]="100"
  [innerRadius]="0.2"
/>`,{names:{en:[`Revenue`,`New customers`,`Retention`,`NPS`,`Hiring`],zh:[`营收`,`新客户`,`留存率`,`净推荐值`,`招聘`],ja:[`売上`,`新規顧客`,`継続率`,`NPS`,`採用`],fr:[`Chiffre d’affaires`,`Nouveaux clients`,`Rétention`,`NPS`,`Recrutement`]}})],"bullet-chart":[k(`kpis`,`KPIs against targets`,[`MnBulletChart`],`@let t = labels[language()];
<mn-bullet-chart
  [data]="[
    { name: t.kpis[0], value: 270, target: 250, ranges: [150, 225, 300] },
    { name: t.kpis[1], value: 22.5, target: 26, ranges: [20, 25, 30] },
    { name: t.kpis[2], value: 1650, target: 2100, ranges: [1000, 2000, 2500] },
    { name: t.kpis[3], value: 4.4, target: 4.5, ranges: [3.5, 4.25, 5] }
  ]"
  [rangeLabels]="t.ranges"
/>`,{labels:{en:{kpis:[`Revenue (k€)`,`Profit (%)`,`Orders`,`Satisfaction`],ranges:[`Poor`,`Fair`,`Good`]},zh:{kpis:[`营收（千欧元）`,`利润率（%）`,`订单数`,`满意度`],ranges:[`差`,`一般`,`良好`]},ja:{kpis:[`売上（千ユーロ）`,`利益率（%）`,`注文数`,`満足度`],ranges:[`不良`,`普通`,`良好`]},fr:{kpis:[`Chiffre d’affaires (k€)`,`Marge (%)`,`Commandes`,`Satisfaction`],ranges:[`Faible`,`Correct`,`Bon`]}}}),k(`vertical`,`Vertical columns`,[`MnBulletChart`],`@let q = quarters[language()];
<mn-bullet-chart
  [data]="[
    { name: q[0], value: 82, target: 90 },
    { name: q[1], value: 95, target: 90 },
    { name: q[2], value: 71, target: 100 },
    { name: q[3], value: 104, target: 100 }
  ]"
  orientation="vertical"
  [ranges]="[60, 90, 120]"
  targetColor="var(--danger-color, #dc2626)"
/>`,{quarters:{en:[`Q1`,`Q2`,`Q3`,`Q4`],zh:[`第一季度`,`第二季度`,`第三季度`,`第四季度`],ja:[`第 1 四半期`,`第 2 四半期`,`第 3 四半期`,`第 4 四半期`],fr:[`T1`,`T2`,`T3`,`T4`]}})],"sunburst-chart":[k(`disk-usage`,`Disk usage`,[`MnSunburstChart`],`@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.folders[0], children: [{ name: t.files[0], value: 12 }, { name: t.files[1], value: 3 }] },
    { name: t.folders[1], children: [{ name: t.files[2], value: 46 }, { name: t.files[3], value: 21 }] },
    { name: t.folders[2], children: [{ name: t.files[4], value: 18 }, { name: t.files[5], value: 7 }] },
    { name: t.folders[3], children: [{ name: t.files[6], value: 9 }, { name: t.files[7], value: 32 }] }
  ]"
/>`,{labels:{en:{folders:[`Documents`,`Photos`,`Music`,`Apps`],files:[`Work`,`Taxes`,`2025`,`2026`,`Albums`,`Podcasts`,`Tools`,`Games`]},zh:{folders:[`文档`,`照片`,`音乐`,`应用`],files:[`工作`,`税务`,`2025`,`2026`,`专辑`,`播客`,`工具`,`游戏`]},ja:{folders:[`書類`,`写真`,`ミュージック`,`アプリ`],files:[`仕事`,`税金`,`2025`,`2026`,`アルバム`,`ポッドキャスト`,`ツール`,`ゲーム`]},fr:{folders:[`Documents`,`Photos`,`Musique`,`Applications`],files:[`Travail`,`Impôts`,`2025`,`2026`,`Albums`,`Podcasts`,`Outils`,`Jeux`]}}}),k(`drill-down`,`Drill-down breadcrumb`,[`MnSunburstChart`],`@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.teams[0], children: [{ name: t.groups[0], value: 18 }, { name: t.groups[1], value: 11 }, { name: t.groups[2], value: 14 }] },
    { name: t.teams[1], children: [{ name: t.groups[3], value: 16 }, { name: t.groups[4], value: 12 }] },
    { name: t.teams[2], children: [{ name: t.groups[5], value: 20 }, { name: t.groups[6], value: 8 }] }
  ]"
  [innerRadius]="0.32"
  (drillChange)="path = $event.path"
/>
<output aria-live="polite">{{ t.root }}@for (name of path; track $index) { › {{ name }} }</output>`,{path:[],labels:{en:{root:`Company`,teams:[`Engineering`,`Sales`,`Support`],groups:[`Web`,`Mobile`,`Platform`,`Europe`,`Asia`,`Tier 1`,`Tier 2`],hint:`Click a team`},zh:{root:`公司`,teams:[`研发`,`销售`,`客服`],groups:[`网页`,`移动端`,`平台`,`欧洲`,`亚洲`,`一线`,`二线`],hint:`点击一个团队`},ja:{root:`会社`,teams:[`エンジニアリング`,`営業`,`サポート`],groups:[`Web`,`モバイル`,`プラットフォーム`,`ヨーロッパ`,`アジア`,`一次対応`,`二次対応`],hint:`チームをクリックします`},fr:{root:`Entreprise`,teams:[`Ingénierie`,`Ventes`,`Support`],groups:[`Web`,`Mobile`,`Plateforme`,`Europe`,`Asie`,`Niveau 1`,`Niveau 2`],hint:`Cliquez sur une équipe`}}})],"sankey-chart":[k(`energy`,`Energy flows`,[`MnSankeyChart`],`@let n = names[language()];
<mn-sankey-chart
  [nodes]="[{ name: n[0] }, { name: n[1] }, { name: n[2] }, { name: n[3] }, { name: n[4] }, { name: n[5] }, { name: n[6] }, { name: n[7] }]"
  [links]="links"
/>`,{links:[{source:0,target:3,value:32},{source:1,target:3,value:48},{source:2,target:3,value:70},{source:3,target:4,value:52},{source:3,target:5,value:61},{source:3,target:6,value:22},{source:3,target:7,value:15}],names:{en:[`Solar`,`Wind`,`Gas`,`Grid`,`Homes`,`Industry`,`Transport`,`Losses`],zh:[`太阳能`,`风能`,`天然气`,`电网`,`居民`,`工业`,`交通`,`损耗`],ja:[`太陽光`,`風力`,`ガス`,`送電網`,`家庭`,`産業`,`運輸`,`損失`],fr:[`Solaire`,`Éolien`,`Gaz`,`Réseau`,`Foyers`,`Industrie`,`Transports`,`Pertes`]}}),k(`journey`,`User journey with drop-offs`,[`MnSankeyChart`],`@let s = steps[language()];
<mn-sankey-chart
  [nodes]="[{ name: s[0] }, { name: s[1] }, { name: s[2] }, { name: s[3] }, { name: s[4] }, { name: s[5], color: 'var(--text-secondary-color, #9ca3af)' }]"
  [links]="links"
  align="left"
  linkColor="source"
/>`,{links:[{source:0,target:1,value:420},{source:0,target:2,value:310},{source:0,target:5,value:270},{source:1,target:2,value:330},{source:1,target:5,value:90},{source:2,target:3,value:380},{source:2,target:5,value:260},{source:3,target:4,value:240},{source:3,target:5,value:140}],steps:{en:[`Home page`,`Search`,`Product page`,`Cart`,`Checkout`,`Left`],zh:[`首页`,`搜索`,`商品页`,`购物车`,`结账`,`离开`],ja:[`トップページ`,`検索`,`商品ページ`,`カート`,`購入手続き`,`離脱`],fr:[`Accueil`,`Recherche`,`Fiche produit`,`Panier`,`Paiement`,`Départ`]}})],"trading-chart":[k(`candles`,`Candles, moving averages and panes`,[`MnTradingChart`],`@let t = labels[language()];
<mn-trading-chart
  [bars]="bars"
  symbol="ACME"
  timeframe="1D"
  [indicators]="[
    { type: 'ma', period: 20 },
    { type: 'ma', period: 50 },
    { type: 'volume' },
    { type: 'rsi', period: 14 }
  ]"
  [options]="{ watermark: t.watermark }"
/>`,{bars:j(`(() => {
          const fraction = (value: number) => value - Math.floor(value);
          const round = (value: number) => Math.round(value * 100) / 100;
          let close = 100;
          return Array.from({ length: 240 }, (_, i) => {
            const open = close;
            close = round(open * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25));
            const spread = (open * fraction(Math.sin(i * 78.233) * 43758.5453)) / 60;
            return {
              time: Date.UTC(2025, 2, 3) + i * 86_400_000,
              open,
              high: round(Math.max(open, close) + spread),
              low: round(Math.min(open, close) - spread),
              close,
              volume: Math.round(1000 + fraction(Math.sin(i * 3.7) * 9999) * 4000),
            };
          });
        })()`),labels:{en:{watermark:`ACME · 1D`},zh:{watermark:`ACME · 日线`},ja:{watermark:`ACME · 日足`},fr:{watermark:`ACME · 1 J`}}}),k(`streaming`,`Real-time streaming`,[`MnTradingChart`],`@let t = labels[language()];
<mn-trading-chart
  [bars]="bars()"
  symbol="ACME"
  timeframe="1m"
  [indicators]="[{ type: 'ema', period: 9 }, { type: 'volume' }]"
  [options]="{ countdown: true, watermark: t.watermark }"
  [height]="400"
/>`,{bars:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  let close = 100;
  const BARS = Array.from({ length: 120 }, (_, i) => {
    const open = close;
    close = round(open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2);
    return {
      time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
      open,
      high: round(Math.max(open, close) + 0.1),
      low: round(Math.min(open, close) - 0.1),
      close,
      volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
    };
  });
  const bars = signal(BARS);
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    bars.update((list) => {
      const last = list[list.length - 1];
      const close = round(last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4);
      return tick % 10 === 0
        ? [...list, { time: last.time + 60_000, open: last.close, high: Math.max(last.close, close), low: Math.min(last.close, close), close, volume: 40 }]
        : [...list.slice(0, -1), { ...last, high: Math.max(last.high, close), low: Math.min(last.low, close), close, volume: last.volume + 25 }];
    });
  }, 500);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return bars;
})()`,{"@angular/core":[`DestroyRef`,`inject`,`signal`]}),labels:{en:{watermark:`ACME · 1m · live`},zh:{watermark:`ACME · 1 分钟 · 实时`},ja:{watermark:`ACME · 1 分足 · ライブ`},fr:{watermark:`ACME · 1 min · direct`}}})],"technical-indicators":[k(`bollinger`,`Bollinger bands from the pure functions`,[`MnRangeAreaChart`],`@let t = labels[language()];
<mn-range-area-chart
  [series]="[
    { name: t.band, opacity: 0.18, data: indicators.band },
    { name: t.close, type: 'line', data: indicators.close },
    { name: t.middle, type: 'line', lineWidth: 1, data: indicators.middle },
    { name: t.slow, type: 'line', lineWidth: 1, data: indicators.slow }
  ]"
  curve="linear"
  [xAxis]="{ type: 'time' }"
  crosshair
  [height]="320"
/>`,{indicators:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  let price = 100;
  const TIMES: number[] = [];
  const CLOSES = Array.from({ length: 200 }, (_, i) => {
    TIMES.push(Date.UTC(2025, 2, 3) + i * 86_400_000);
    price = round(price * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25));
    return price;
  });
  const bands = bollinger(CLOSES, 20, 2);
  const slow = ema(CLOSES, 50);
  const points = (values: ArrayLike<number>) =>
    TIMES.map((x, i) => ({ x, y: Number.isNaN(values[i]) ? null : round(values[i]) }));
  return {
    band: TIMES.map((x, i) =>
      Number.isNaN(bands.upper[i])
        ? { x, y: null }
        : { x, y0: round(bands.lower[i]), y: round(bands.upper[i]) },
    ),
    close: points(CLOSES),
    middle: points(bands.middle),
    slow: points(slow),
  };
})()`,{"minerva-design/charts/core":[`bollinger`,`ema`]}),labels:{en:{close:`Close`,band:`Bollinger (20, 2)`,middle:`SMA 20`,slow:`EMA 50`},zh:{close:`收盘价`,band:`布林带 (20, 2)`,middle:`SMA 20`,slow:`EMA 50`},ja:{close:`終値`,band:`ボリンジャーバンド (20, 2)`,middle:`SMA 20`,slow:`EMA 50`},fr:{close:`Clôture`,band:`Bollinger (20, 2)`,middle:`MMS 20`,slow:`MME 50`}}}),k(`panes`,`Indicator panes`,[`MnTradingChart`],`@let t = labels[language()];
<mn-trading-chart
  [bars]="bars"
  symbol="ACME"
  [indicators]="[
    { type: 'boll', period: 20, multiplier: 2 },
    { type: 'macd' },
    { type: 'rsi', period: 14 }
  ]"
  [height]="440"
/>
<output aria-live="polite">{{ t.macd }}: {{ last.macd }} / {{ last.signal }}</output>`,{bars:j(`(() => {
          const fraction = (value: number) => value - Math.floor(value);
          const round = (value: number) => Math.round(value * 100) / 100;
          let close = 100;
          return Array.from({ length: 240 }, (_, i) => {
            const open = close;
            close = round(open * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25));
            const spread = (open * fraction(Math.sin(i * 78.233) * 43758.5453)) / 60;
            return {
              time: Date.UTC(2025, 2, 3) + i * 86_400_000,
              open,
              high: round(Math.max(open, close) + spread),
              low: round(Math.min(open, close) - spread),
              close,
              volume: Math.round(1000 + fraction(Math.sin(i * 3.7) * 9999) * 4000),
            };
          });
        })()`),last:j(`(() => {
  const result = macd(this.bars.map((bar) => bar.close));
  const end = this.bars.length - 1;
  return {
    macd: result.macd[end].toFixed(2),
    signal: result.signal[end].toFixed(2),
  };
})()`,{"minerva-design/charts/core":[`macd`]}),labels:{en:{macd:`MACD (12, 26, 9)`},zh:{macd:`MACD 指标 (12, 26, 9)`},ja:{macd:`MACD (12, 26, 9)`},fr:{macd:`MACD (12, 26, 9)`}}})],"depth-chart":[k(`book`,`Cumulative depth`,[`MnDepthChart`],`@let t = labels[language()];
<mn-depth-chart [book]="book" (hover)="hovered = $event ? t.price + ' ' + $event.price + ' · ' + t.total + ' ' + $event.amount : ''" />
<output aria-live="polite">{{ hovered || t.hint }}</output>`,{hovered:``,book:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  return { bids: side(-1, 1), asks: side(1, 2) };
})()`),labels:{en:{price:`Price`,total:`Total`,hint:`Hover the curves`},zh:{price:`价格`,total:`累计`,hint:`将指针悬停在曲线上`},ja:{price:`価格`,total:`累計`,hint:`曲線にカーソルを合わせます`},fr:{price:`Prix`,total:`Cumul`,hint:`Survolez les courbes`}}}),k(`live`,`Live book`,[`MnDepthChart`],`<mn-depth-chart [book]="book()" [options]="{ range: 0.012 }" [height]="280" />`,{book:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  const book = signal({ bids: side(-1, 3), asks: side(1, 4) });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    book.set({ bids: side(-1, 3 + tick), asks: side(1, 4 + tick) });
  }, 1000);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return book;
})()`,{"@angular/core":[`DestroyRef`,`inject`,`signal`]})})],"order-book":[k(`ladder`,`Order book ladder`,[`MnOrderBook`],`@let t = labels[language()];
<mn-order-book
  [book]="book"
  [lastPrice]="100.02"
  [options]="{ largeOrderThreshold: 50 }"
  [height]="380"
  (levelClick)="clicked = t.price + ' ' + $event.price + ' · ' + t.size + ' ' + $event.size"
/>
<output aria-live="polite">{{ clicked || t.hint }}</output>`,{clicked:``,book:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  return { bids: side(-1, 1), asks: side(1, 2) };
})()`),labels:{en:{price:`Price`,size:`Size`,hint:`Click a row`},zh:{price:`价格`,size:`数量`,hint:`点击一行`},ja:{price:`価格`,size:`数量`,hint:`行をクリックします`},fr:{price:`Prix`,size:`Quantité`,hint:`Cliquez sur une ligne`}}}),k(`live`,`Live ladder`,[`MnOrderBook`],`<mn-order-book
  [book]="feed().book"
  [lastPrice]="feed().last"
  [options]="{ grouping: 0.1 }"
  [height]="380"
/>`,{feed:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  const feed = signal({ book: { bids: side(-1, 3), asks: side(1, 4) }, last: 100 });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    feed.set({
      book: { bids: side(-1, 3 + tick), asks: side(1, 4 + tick) },
      last: round(100 + Math.sin(tick / 5) / 20),
    });
  }, 1000);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})()`,{"@angular/core":[`DestroyRef`,`inject`,`signal`]})})],"order-book-heatmap":[k(`liquidity`,`Live liquidity heatmap`,[`MnOrderBookHeatmap`],`<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" />`,{feed:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})()`,{"@angular/core":[`DestroyRef`,`inject`,`signal`]})}),k(`red-up`,`Red-up colors, square-root scale`,[`MnOrderBookHeatmap`],`<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" [options]="{ colorConvention: 'red-up', colorScale: 'sqrt', profile: false }" />`,{feed:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})()`,{"@angular/core":[`DestroyRef`,`inject`,`signal`]})})],"time-and-sales":[k(`tape`,`Live tape`,[`MnTimeAndSales`],`<mn-time-and-sales [trades]="trades()" [options]="{ largeTradeThreshold: 20 }" [height]="320" />`,{trades:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // the trade of a tick: around 100, mostly small, sometimes large
  const trade = (tick: number) => ({
    time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
    price: round(100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20),
    size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
    side: fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45 ? ("buy" as const) : ("sell" as const),
  });
  const trades = signal(Array.from({ length: 40 }, (_, i) => trade(i)));
  const timer = setInterval(() => {
    trades.update((list) => [...list, trade(list.length)]);
  }, 250);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return trades;
})()`,{"@angular/core":[`DestroyRef`,`inject`,`signal`]})}),k(`large-trades`,`Aggregated tape, large trades`,[`MnTimeAndSales`],`@let t = labels[language()];
<mn-time-and-sales
  [trades]="trades"
  [options]="{ aggregate: true, minSize: 2, largeTradeThreshold: 25, columns: ['time', 'side', 'price', 'size'] }"
  [height]="300"
  (tradeClick)="clicked = $event.trade.price + ' × ' + $event.trade.size + ' ' + t.size + ' (' + $event.count + ')'"
/>
<output aria-live="polite">{{ clicked || t.hint }}</output>`,{clicked:``,trades:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // the trade of a tick: around 100, mostly small, sometimes large
  const trade = (tick: number) => ({
    time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
    price: round(100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20),
    size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
    side: fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45 ? ("buy" as const) : ("sell" as const),
  });
  return Array.from({ length: 2000 }, (_, i) => trade(i));
})()`),labels:{en:{hint:`Click a trade`,size:`lots`},zh:{hint:`点击一笔成交`,size:`手`},ja:{hint:`約定をクリックします`,size:`ロット`},fr:{hint:`Cliquez sur une transaction`,size:`lots`}}})],"scatter-3d-chart":[k(`clusters`,`Customer segments in 3D`,[`MnScatter3DChart`],`@let t = labels[language()];
<mn-scatter-3d-chart
  [series]="[
    { name: t.segments[0], data: clouds[0], pointSize: 5 },
    { name: t.segments[1], data: clouds[1], pointSize: 5 },
    { name: t.segments[2], data: clouds[2], pointSize: 5 }
  ]"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>`,{clouds:j(`(() => {
  const fraction = (value: number) => value - Math.floor(value);
  // a cloud of 400 customers around a center (age, income, spending),
  // generated deterministically, as columns
  const cloud = (age: number, income: number, spending: number, seed: number) => {
    const noise = (i: number, k: number) =>
      fraction(Math.sin((i + seed * 1000) * (12.9898 + k)) * 43758.5453) - 0.5;
    return {
      x: Array.from({ length: 400 }, (_, i) => age + noise(i, 0) * 12),
      y: Array.from({ length: 400 }, (_, i) => income + noise(i, 1) * 20),
      z: Array.from({ length: 400 }, (_, i) => spending + noise(i, 2) * 10),
    };
  };
  const CLOUDS = [cloud(22, 18, 9, 1), cloud(40, 62, 24, 2), cloud(70, 35, 15, 3)];
  return CLOUDS;
})()`),labels:{en:{segments:[`Students`,`Professionals`,`Retirees`],axes:[`Age`,`Income (k€)`,`Spending (k€)`]},zh:{segments:[`学生`,`职场人士`,`退休人员`],axes:[`年龄`,`收入（千欧元）`,`消费（千欧元）`]},ja:{segments:[`学生`,`社会人`,`退職者`],axes:[`年齢`,`収入（千ユーロ）`,`支出（千ユーロ）`]},fr:{segments:[`Étudiants`,`Actifs`,`Retraités`],axes:[`Âge`,`Revenu (k€)`,`Dépenses (k€)`]}}}),k(`trajectory`,`A trajectory colored by height`,[`MnLine3DChart`],`@let t = labels[language()];
<mn-line-3d-chart
  [series]="[{ name: t.path, data: path, colorBy: 'z', lineWidth: 3 }]"
  colorScale="turbo"
  [autoRotate]="true"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>`,{path:j(`(() => {
  // a climbing spiral of 600 points, as columns
  const t = Array.from({ length: 600 }, (_, i) => i / 30);
  const PATH = {
    x: t.map((a) => Math.cos(a) * (4 + a / 4)),
    y: t.map((a) => Math.sin(a) * (4 + a / 4)),
    z: t.map((a) => a / 2),
  };
  return PATH;
})()`),labels:{en:{path:`Flight path`,axes:[`East (km)`,`North (km)`,`Altitude (km)`]},zh:{path:`飞行轨迹`,axes:[`东（公里）`,`北（公里）`,`高度（公里）`]},ja:{path:`飛行経路`,axes:[`東（km）`,`北（km）`,`高度（km）`]},fr:{path:`Trajectoire`,axes:[`Est (km)`,`Nord (km)`,`Altitude (km)`]}}})],"surface-3d-chart":[k(`ripple`,`A ripple with contour lines`,[`MnSurface3DChart`],`@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: wave }]"
  [contours]="{ count: 10, floor: true }"
  colorScale="viridis"
  [zAxis]="{ title: t.height }"
  [height]="420"
/>`,{wave:j(`(() => {
  // z = sin(r) / r over a 60 × 60 grid from -10 to 10
  const N = 60;
  const WAVE = {
    rows: N,
    cols: N,
    x: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
    y: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
    z: Array.from({ length: N * N }, (_, k) => {
      const x = -10 + (20 * (k % N)) / (N - 1);
      const y = -10 + (20 * Math.floor(k / N)) / (N - 1);
      const r = Math.hypot(x, y) || 1e-6;
      return Math.sin(r) / r;
    }),
  };
  return WAVE;
})()`),labels:{en:{name:`Ripple`,height:`Height`},zh:{name:`波纹`,height:`高度`},ja:{name:`波紋`,height:`高さ`},fr:{name:`Onde`,height:`Hauteur`}}}),k(`terrain`,`Terrain with a wireframe`,[`MnSurface3DChart`],`@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: terrain }]"
  [wireframe]="{ step: 2 }"
  colorScale="terrain"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>`,{terrain:j(`(() => {
  // two hills and a valley on a 40 × 40 grid (heights in meters)
  const N = 40;
  const TERRAIN = {
    rows: N,
    cols: N,
    z: Array.from({ length: N * N }, (_, k) => {
      const x = (k % N) / 4;
      const y = Math.floor(k / N) / 4;
      return Math.round(
        900 * Math.exp(-((x - 3) ** 2 + (y - 4) ** 2) / 6) +
          600 * Math.exp(-((x - 7) ** 2 + (y - 7) ** 2) / 4) -
          200 * Math.exp(-((x - 6) ** 2 + (y - 2) ** 2) / 3) +
          300,
      );
    }),
  };
  return TERRAIN;
})()`),labels:{en:{name:`Terrain`,axes:[`East (km)`,`North (km)`,`Elevation (m)`]},zh:{name:`地形`,axes:[`东（公里）`,`北（公里）`,`海拔（米）`]},ja:{name:`地形`,axes:[`東（km）`,`北（km）`,`標高（m）`]},fr:{name:`Relief`,axes:[`Est (km)`,`Nord (km)`,`Altitude (m)`]}}})],"bar-3d-chart":[k(`sales`,`Sales by region and quarter`,[`MnBar3DChart`],`@let t = labels[language()];
<mn-bar-3d-chart
  [series]="[{ name: t.sales, colorBy: 'z', data: [
    { x: 0, y: 0, z: 120 }, { x: 0, y: 1, z: 135 }, { x: 0, y: 2, z: 150 }, { x: 0, y: 3, z: 180 },
    { x: 1, y: 0, z: 90 }, { x: 1, y: 1, z: 110 }, { x: 1, y: 2, z: 105 }, { x: 1, y: 3, z: 130 },
    { x: 2, y: 0, z: 160 }, { x: 2, y: 1, z: 170 }, { x: 2, y: 2, z: 190 }, { x: 2, y: 3, z: 220 },
    { x: 3, y: 0, z: 70 }, { x: 3, y: 1, z: 85 }, { x: 3, y: 2, z: 95 }, { x: 3, y: 3, z: 100 }
  ] }]"
  [xAxis]="{ categories: t.regions }"
  [yAxis]="{ categories: t.quarters }"
  [zAxis]="{ title: t.sales }"
  [height]="420"
/>`,{labels:{en:{sales:`Sales (k€)`,regions:[`North`,`South`,`East`,`West`],quarters:[`Q1`,`Q2`,`Q3`,`Q4`]},zh:{sales:`销售额（千欧元）`,regions:[`华北`,`华南`,`华东`,`华西`],quarters:[`第一季度`,`第二季度`,`第三季度`,`第四季度`]},ja:{sales:`売上（千ユーロ）`,regions:[`北部`,`南部`,`東部`,`西部`],quarters:[`第 1 四半期`,`第 2 四半期`,`第 3 四半期`,`第 4 四半期`]},fr:{sales:`Ventes (k€)`,regions:[`Nord`,`Sud`,`Est`,`Ouest`],quarters:[`T1`,`T2`,`T3`,`T4`]}}}),k(`stacked`,`Stacked channels`,[`MnBar3DChart`],`@let t = labels[language()];
<mn-bar-3d-chart
  [series]="[
    { name: t.channels[0], data: [
      { x: 0, y: 0, z: 40 }, { x: 0, y: 1, z: 38 }, { x: 0, y: 2, z: 35 },
      { x: 1, y: 0, z: 22 }, { x: 1, y: 1, z: 24 }, { x: 1, y: 2, z: 20 },
      { x: 2, y: 0, z: 15 }, { x: 2, y: 1, z: 14 }, { x: 2, y: 2, z: 12 }
    ] },
    { name: t.channels[1], data: [
      { x: 0, y: 0, z: 18 }, { x: 0, y: 1, z: 27 }, { x: 0, y: 2, z: 36 },
      { x: 1, y: 0, z: 9 }, { x: 1, y: 1, z: 14 }, { x: 1, y: 2, z: 21 },
      { x: 2, y: 0, z: 6 }, { x: 2, y: 1, z: 9 }, { x: 2, y: 2, z: 13 }
    ] }
  ]"
  [barWidth]="0.55"
  [xAxis]="{ categories: t.products }"
  [yAxis]="{ categories: t.years }"
  [height]="420"
/>`,{labels:{en:{channels:[`Stores`,`Online`],years:[`2023`,`2024`,`2025`],products:[`Shoes`,`Bags`,`Watches`]},zh:{channels:[`门店`,`线上`],years:[`2023`,`2024`,`2025`],products:[`鞋子`,`包袋`,`手表`]},ja:{channels:[`店舗`,`オンライン`],years:[`2023`,`2024`,`2025`],products:[`靴`,`バッグ`,`時計`]},fr:{channels:[`Magasins`,`En ligne`],years:[`2023`,`2024`,`2025`],products:[`Chaussures`,`Sacs`,`Montres`]}}})],"graph-chart":[k(`routes`,`Air routes between hubs`,[`MnGraphChart`],`<mn-graph-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  [nodeSize]="[10, 34]"
  [locale]="language()"
  [height]="440"
/>`,{cities:H,regions:U,hubs:W,edges:G,nodes:j(`computed(() =>
    this.cities[this.language()].map((label, i) => ({
      id: \`c\${i}\`,
      label,
      group: \`r\${this.hubs[i][0]}\`,
      value: this.hubs[i][1],
    })),
  )`,{"@angular/core":[`computed`]}),groups:j("computed(() =>\n    this.regions[this.language()].map((name, i) => ({ id: `r${i}`, name })),\n  )",{"@angular/core":[`computed`]})}),k(`circular`,`Circular layout and selection`,[`MnGraphChart`],`<mn-graph-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  layout="circular"
  edgeColor="source"
  [locale]="language()"
  [height]="440"
  (selectionChange)="selection.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>`,{selection:j(`signal<string[]>([])`,{"@angular/core":[`signal`]}),cities:H,regions:U,hubs:W,edges:G,labels:{en:{hint:`Click a city to see its routes`,selected:`Selected: `},zh:{hint:`点击一个城市查看其航线`,selected:`已选择：`},ja:{hint:`都市をクリックすると路線が表示されます`,selected:`選択中: `},fr:{hint:`Cliquez sur une ville pour voir ses liaisons`,selected:`Sélection : `}},nodes:j(`computed(() =>
    this.cities[this.language()].map((label, i) => ({
      id: \`c\${i}\`,
      label,
      group: \`r\${this.hubs[i][0]}\`,
    })),
  )`,{"@angular/core":[`computed`]}),groups:j("computed(() =>\n    this.regions[this.language()].map((name, i) => ({ id: `r${i}`, name })),\n  )",{"@angular/core":[`computed`]}),status:j(`computed(() => {
    const t = this.labels[this.language()];
    const names = this.cities[this.language()];
    const ids = this.selection();
    return ids.length
      ? t.selected + ids.map((id) => names[Number(id.slice(1))]).join(", ")
      : t.hint;
  })`,{"@angular/core":[`computed`]})})],"dependency-graph":[k(`pipeline`,`CI pipeline and critical path`,[`MnDependencyGraph`,`MnSwitch`],`@let t = text[language()];
<mn-switch [(checked)]="critical" [label]="t.critical" />
<mn-dependency-graph
  [nodes]="nodes()"
  [edges]="edges"
  direction="LR"
  edgeStyle="orthogonal"
  [criticalPath]="critical"
  [height]="380"
/>`,{critical:!0,text:be,minutes:[3,2,3,6,5,9,2,4],edges:xe,nodes:j(`computed(() => {
    const t = this.text[this.language()];
    return t.jobs.map((label, i) => ({
      id: \`j\${i}\`,
      label,
      subtitle: t.minutes.replace("{n}", String(this.minutes[i])),
      value: this.minutes[i],
    }));
  })`,{"@angular/core":[`computed`]})}),k(`modules`,`Module lineage`,[`MnDependencyGraph`],`<mn-dependency-graph
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  highlight="lineage"
  [locale]="language()"
  [height]="460"
  (selectionChange)="selection.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>`,{selection:j(`signal<string[]>([])`,{"@angular/core":[`signal`]}),text:Se,layer:[0,1,0,0,0,1,1,1,1,2,2,3],edges:Ce,nodes:j(`computed(() =>
    this.text[this.language()].modules.map((label, i) => ({
      id: \`m\${i}\`,
      label,
      group: \`l\${this.layer[i]}\`,
    })),
  )`,{"@angular/core":[`computed`]}),groups:j("computed(() =>\n    this.text[this.language()].layers.map((name, i) => ({ id: `l${i}`, name })),\n  )",{"@angular/core":[`computed`]}),status:j(`computed(() => {
    const t = this.text[this.language()];
    const ids = this.selection();
    return ids.length
      ? t.selected + ids.map((id) => t.modules[Number(id.slice(1))]).join(", ")
      : t.hint;
  })`,{"@angular/core":[`computed`]})})],"tree-chart":[k(`org`,`Org chart with collapsible teams`,[`MnTreeChart`],`<mn-tree-chart
  [nodes]="nodes()"
  [edges]="edges"
  [groups]="groups()"
  layout="org"
  [locale]="language()"
  [height]="460"
  (nodeToggle)="toggled.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>`,{toggled:j(`signal<{ id: string; collapsed: boolean } | null>(null)`,{"@angular/core":[`signal`]}),text:we,people:K,edges:K.flatMap(([e],t)=>e<0?[]:[{source:`p${e}`,target:`p${t}`}]),nodes:j(`computed(() =>
    this.text[this.language()].roles.map((label, i) => ({
      id: \`p\${i}\`,
      label,
      group: \`d\${this.people[i][1]}\`,
    })),
  )`,{"@angular/core":[`computed`]}),groups:j("computed(() =>\n    this.text[this.language()].departments.map((name, i) => ({ id: `d${i}`, name })),\n  )",{"@angular/core":[`computed`]}),status:j(`computed(() => {
    const t = this.text[this.language()];
    const toggled = this.toggled();
    return toggled
      ? (toggled.collapsed ? t.collapsed : t.expanded).replace(
          "{name}",
          t.roles[Number(toggled.id.slice(1))],
        )
      : t.hint;
  })`,{"@angular/core":[`computed`]})}),k(`mind-map`,`Mind map`,[`MnTreeChart`],`<mn-tree-chart
  [nodes]="nodes()"
  [edges]="edges"
  layout="mindmap"
  [legend]="false"
  [locale]="language()"
  [height]="420"
/>`,{topics:Te,branch:q.map((e,t)=>J(t)),edges:q.flatMap((e,t)=>e<0?[]:[{source:`t${e}`,target:`t${t}`}]),nodes:j(`computed(() =>
    this.topics[this.language()].map((label, i) => ({
      id: \`t\${i}\`,
      label,
      group: \`b\${this.branch[i]}\`,
    })),
  )`,{"@angular/core":[`computed`]})})],"chord-chart":[k(`teams`,`Messages between teams`,[`MnChordChart`],`<mn-chord-chart [groups]="teams[language()]" [matrix]="matrix" />`,{teams:Ee,matrix:[[0,42,28,14],[36,0,54,8],[30,48,0,22],[12,6,26,0]]}),k(`migration`,`Directed flows in both directions`,[`MnChordChart`],`<mn-chord-chart
  [groups]="text[language()].regions"
  [links]="links"
  directed
  ribbonColor="source"
  (hover)="hovered.set($event)"
/>
<output aria-live="polite">{{ status() }}</output>`,{hovered:j(`signal<import('minerva-design/charts/core').ShapeHoverEvent | null>(null)`,{"@angular/core":[`signal`]}),text:De,links:Y.map(([e,t,n])=>({source:e,target:t,value:n})),status:j(`computed(() => {
    const t = this.text[this.language()];
    const hovered = this.hovered();
    if (!hovered) return t.hint;
    if (hovered.source === undefined)
      return t.group
        .replace("{name}", hovered.name)
        .replace("{value}", String(hovered.value));
    return t.flow
      .replace("{source}", hovered.source)
      .replace("{target}", hovered.target ?? "")
      .replace("{value}", String(hovered.value))
      .replace("{reverse}", String(hovered.reverseValue ?? 0));
  })`,{"@angular/core":[`computed`]})})],"chart-performance":[k(`million`,`A million points`,[`MnLineChart`],`@let t = labels[language()];
<mn-line-chart
  [series]="[{ name: t.signal, data: samples }]"
  [interaction]="{ zoom: 'x' }"
  crosshair
  [height]="320"
/>`,{samples:j(`(() => {
  // a million samples as typed-array columns: no objects, no copies
  const COUNT = 1_000_000;
  const y = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    y[i] = 50 + 30 * Math.sin(i / 20_000) + 8 * Math.sin(i / 700) + 3 * Math.sin(i * 1.7);
  }
  const SAMPLES = { y };
  return SAMPLES;
})()`),labels:{en:{signal:`Sensor (1,000,000 samples)`},zh:{signal:`传感器（1,000,000 个采样点）`},ja:{signal:`センサー（1,000,000 サンプル）`},fr:{signal:`Capteur (1 000 000 d’échantillons)`}}}),k(`scatter`,`200,000 dots`,[`MnScatterChart`],`@let t = labels[language()];
<mn-scatter-chart
  [series]="[{ name: t.points, data: points, pointSize: 2, opacity: 0.4 }]"
  [height]="360"
/>`,{points:j(`(() => {
  // 200,000 points in two typed-array columns, generated deterministically
  const COUNT = 200_000;
  const x = new Float32Array(COUNT);
  const y = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const angle = (i * 2.399963) % (2 * Math.PI);
    const radius = Math.sqrt(i / COUNT) * 40;
    x[i] = 50 + radius * Math.cos(angle) + 6 * Math.sin(i * 0.37);
    y[i] = 50 + radius * Math.sin(angle) * 0.6 + 6 * Math.cos(i * 0.53);
  }
  const POINTS = { x, y };
  return POINTS;
})()`),labels:{en:{points:`Measurements (200,000 points)`},zh:{points:`测量值（200,000 个点）`},ja:{points:`測定値（200,000 点）`},fr:{points:`Mesures (200 000 points)`}}})]}),X=`minerva-design/icons/core`,Z=(...e)=>Object.fromEntries(e.map(e=>[e,j(e,{[X]:[e]})])),Object.assign(O,{icon:[E(`Named icons in buttons`,[`MnIcon`,`MnButton`],`<ng-template #download><mn-icon [icon]="downloadIcon" size="16" /></ng-template>
<ng-template #trash><mn-icon [icon]="trashIcon" size="16" /></ng-template>
<mn-stack direction="row" wrap gap="4" align="center">
  <mn-icon [icon]="homeIcon" />
  <mn-icon [icon]="searchIcon" />
  <mn-icon [icon]="settingsIcon" />
  <button mnButton [startIcon]="download">Download</button>
  <button mnButton color="danger" variant="outline" [startIcon]="trash">Delete</button>
  <mn-icon [icon]="bellIcon" size="32" title="Notifications" />
</mn-stack>`,Z(`homeIcon`,`searchIcon`,`settingsIcon`,`bellIcon`,`downloadIcon`,`trashIcon`),`Pass an icon constant of minerva-design/icons/core: only the icons used are bundled. Icons follow the text color and are hidden from assistive technologies unless they have a title (or aria-label).`),E(`Renderers`,[`MnIcon`],`<mn-stack direction="row" wrap gap="5">
  @for (renderer of renderers; track renderer) {
    <mn-stack gap="1" align="center">
      <mn-icon
        [icon]="settingsIcon"
        [size]="40"
        color="var(--primary-color)"
        [renderer]="renderer"
        (rendererChange)="drawn[renderer] = $event"
      />
      <code>{{ renderer }}</code>
      <small>{{ renderer === 'svg' ? 'SVG' : (drawn[renderer] ?? '…') }}</small>
    </mn-stack>
  }
</mn-stack>`,{...Z(`settingsIcon`),renderers:[`svg`,`auto`,`webgpu`,`webgl2`,`webgl`,`canvas2d`],drawn:{}},`renderer draws the icon on a canvas shared by every canvas icon of the page; rendererChange reports the backend that drew it (a forced backend that cannot start falls back to the next one, auto follows setDefaultIconRenderer). The canvas renderers load with the first canvas icon.`),E(`Icons by name`,[`MnDynamicIcon`,`MnStack`],`<ul mnStack gap="2" style="margin: 0; padding: 0; list-style: none">
  @for (service of services; track service.name) {
    <li style="display: flex; align-items: center; gap: 8px">
      <mn-dynamic-icon [name]="service.icon" [size]="18" />
      <span style="min-width: 80px">{{ service.name }}</span>
      <mn-dynamic-icon
        [name]="service.status"
        [size]="18"
        [color]="service.color"
        [title]="service.status"
      />
    </li>
  }
</ul>`,{services:[{name:`Storage`,icon:`database`,status:`check-circle`,color:`var(--success-color)`},{name:`Mail`,icon:`mail`,status:`alert-triangle`,color:`var(--warning-color)`},{name:`Payments`,icon:`credit-card`,status:`x-circle`,color:`var(--danger-color)`}]},`MnDynamicIcon resolves a built-in icon by name at runtime and renders nothing for unknown names. It bundles the whole set: prefer MnIcon with an icon constant when the icon is known.`)],"icon-canvas":[E(`Basic`,[`MnIconCanvas`],`<mn-stack gap="2">
  <mn-icon-canvas
    [items]="items"
    [height]="160"
    title="Six icons, three ways"
    (rendererChange)="drawn = $event"
  />
  <small role="status">{{ drawn ? 'Drawn with ' + drawn : '…' }}</small>
</mn-stack>`,{items:j(`(() => {
  const row = [homeIcon, searchIcon, mailIcon, bellIcon, userIcon, settingsIcon];
  return [
    ...row.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...row.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: 'var(--primary-color)',
      rotation: i * 15,
    })),
    ...row.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
})()`,{[X]:[`homeIcon`,`searchIcon`,`mailIcon`,`bellIcon`,`userIcon`,`settingsIcon`]}),drawn:``},`Many icons on one canvas, for dense pictures and animations. With renderer auto (the default) the backend follows setDefaultIconRenderer; rendererChange reports it.`),E(`Every backend`,[`MnIconCanvas`],`<mn-stack direction="row" wrap gap="4">
  @for (renderer of renderers; track renderer) {
    <figure style="margin: 0">
      <mn-icon-canvas
        [items]="items"
        [renderer]="renderer"
        [width]="256"
        [height]="160"
        [title]="'Icons drawn with ' + renderer"
        (rendererChange)="drawn[renderer] = $event"
      />
      <figcaption>
        <code>renderer="{{ renderer }}"</code>
        <small>{{
          !drawn[renderer]
            ? 'Starting…'
            : drawn[renderer] === renderer
              ? 'Drawn by ' + drawn[renderer]
              : 'Fell back to ' + drawn[renderer]
        }}</small>
      </figcaption>
    </figure>
  }
</mn-stack>`,{renderers:[`webgpu`,`webgl2`,`webgl`,`canvas2d`],items:j(`icons.slice(0, 40).map((icon, i) => ({
  icon,
  x: 8 + (i % 8) * 30,
  y: 8 + Math.floor(i / 8) * 30,
  size: 24,
}))`,{[X]:[`icons`]}),drawn:{}},`A forced backend that cannot start falls back to the next one (WebGPU, WebGL2, WebGL, Canvas2D); rendererChange tells which one drew.`)]});for(let[e,t]of Object.entries(O))for(let n of t){n.key=`${e}:${n.id}`,n.stateTypes={};for(let[e,t]of Object.entries(n.state))Array.isArray(t)&&t.length===0&&(n.stateTypes[e]=`string[]`);if(e===`table`&&Object.hasOwn(n.state,`sort`)&&(n.stateTypes.sort=`import('minerva-design/angular').TableSort | null`),e===`table`&&Object.hasOwn(n.state,`order`)&&(n.stateTypes.order=`'ascending' | 'descending'`),e===`config-provider`&&Object.hasOwn(n.state,`localTheme`)&&(n.stateTypes.localTheme=`import('minerva-design/angular').ConfigTheme`,n.stateTypes.localPalette=`'editorial' | 'tech' | 'graphite' | 'cool' | null`),e===`menu`&&(n.stateTypes.items=`import('minerva-design/angular').MenuItem[]`),e===`toast`&&(n.stateTypes.messages=`import('minerva-design/angular').ToastMessage[]`),e===`sparkline`&&Object.hasOwn(n.state,`hovered`)&&(n.stateTypes.hovered=`number | null`),e===`segmented-control`&&(Object.hasOwn(n.state,`value`)&&(n.stateTypes.value=`string | null | undefined`),Object.hasOwn(n.state,`theme`)&&(n.stateTypes.theme=`string | null | undefined`)),e===`slider`)for(let e of[`volume`,`saved`,`price`])Object.hasOwn(n.state,e)&&(n.stateTypes[e]=`import('minerva-design/angular').SliderValue`);e===`week-strip`&&(Object.hasOwn(n.state,`value`)&&(n.stateTypes.value=`string | null`),Object.hasOwn(n.state,`week`)&&(n.stateTypes.week=`Date | null`)),e===`answer-sheet`&&(Object.hasOwn(n.state,`value`)&&(n.stateTypes.value=`string | null`),n.stateTypes.items=`import('minerva-design/angular').AnswerSheetItem[]`,Object.hasOwn(n.state,`groups`)&&(n.stateTypes.groups=`import('minerva-design/angular').AnswerSheetGroup[]`)),e===`histogram-chart`&&Object.hasOwn(n.state,`bins`)&&(n.stateTypes.bins=`number | 'sturges'`),e===`icon`&&Object.hasOwn(n.state,`renderers`)&&(n.stateTypes.renderers=`import('minerva-design/angular').IconRenderer[]`,n.stateTypes.drawn=`Partial<Record<string, string>>`),e===`icon-canvas`&&Object.hasOwn(n.state,`renderers`)&&(n.stateTypes.renderers=`import('minerva-design/icons/core').IconRendererPreference[]`,n.stateTypes.drawn=`Partial<Record<string, string>>`)}})))()}function ke({meta:e,framework:t}){let{t:n}=a(),r=O[e.id]??[];if(!r.length&&t&&x(e))return(0,Q.jsx)(le,{meta:e,framework:t});let i=[...new Set(r.flatMap(e=>e.imports))],o=e.id===`monaco-code-editor`?`minerva-design/angular/monaco`:`minerva-design/angular`,s=x(e);return(0,Q.jsxs)(`div`,{"data-native-angular-section":``,children:[(0,Q.jsxs)(`section`,{className:v.section,"aria-labelledby":`angular-import`,children:[(0,Q.jsx)(`h2`,{id:`angular-import`,children:n(`doc.import`)}),(0,Q.jsx)(d,{code:`import { ${i.join(`, `)} } from '${o}';`,language:`ts`})]}),(0,Q.jsxs)(`section`,{className:v.section,"aria-labelledby":`angular-examples`,children:[(0,Q.jsx)(`h2`,{id:`angular-examples`,children:n(`doc.examples`)}),r.map(t=>(0,Q.jsx)(oe,{id:`angular-demo-${t.id}`,title:s?n(`docs.${e.id}.wc.demos.${t.id}.title`,{defaultValue:t.title}):t.title,description:s?n(`docs.${e.id}.wc.demos.${t.id}.description`,{defaultValue:t.description??``}):t.description,source:ye(t),language:`ts`,children:(0,Q.jsx)(fe,{example:t})},t.id))]}),(0,Q.jsxs)(`section`,{className:v.section,"aria-labelledby":`angular-api`,children:[(0,Q.jsx)(`h2`,{id:`angular-api`,children:`Angular API`}),(0,Q.jsx)(he,{names:i})]})]})}var Q;function $(){return($=e((()=>{o(),u(),se(),ie(),ce(),me(),_e(),Oe(),_(),Q=n()})))()}$();export{ke as default};