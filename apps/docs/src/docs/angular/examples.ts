/** Authored native Angular examples. Templates are trusted source shipped with the
 * docs; the runtime never compiles user input. The displayed source is generated
 * from these exact templates and initial values. */
export interface AngularExample {
  id: string;
  key?: string;
  stateTypes?: Record<string, string>;
  title: string;
  description?: string;
  imports: readonly string[];
  template: string;
  state: Record<string, unknown>;
  monaco?: boolean;
}
const example = (
  title: string,
  imports: string[],
  template: string,
  state: Record<string, unknown> = {},
  description?: string,
): AngularExample => ({
  id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  title,
  description,
  imports: template.includes("<mn-stack")
    ? [...new Set([...imports, "MnStack"])]
    : imports,
  template,
  state,
});
const stack = (content: string) =>
  `<mn-stack direction="row" wrap gap="3" align="center">${content}</mn-stack>`;
export const angularExamples: Record<string, readonly AngularExample[]> = {
  button: [
    example(
      "Actions and feedback",
      ["MnButton"],
      stack(
        `<button mnButton (click)="count=count+1">Click me</button><output aria-live="polite">Clicked {{count}} times</output>`,
      ),
      { count: 0 },
    ),
    example(
      "Variants and loading",
      ["MnButton"],
      stack(
        `<button mnButton variant="outline">Outline</button><button mnButton variant="ghost">Ghost</button><button mnButton color="danger">Delete</button><button mnButton loading loadingText="Saving">Save</button><button mnButton disabled>Disabled</button>`,
      ),
    ),
    example(
      "Sizes and shapes",
      ["MnButton"],
      stack(
        `<button mnButton size="xsmall">XSmall</button><button mnButton size="small">Small</button><button mnButton size="medium">Medium</button><button mnButton size="large">Large</button><button mnButton size="xlarge">XLarge</button><button mnButton shape="square">Square</button><button mnButton shape="rounded">Rounded</button><button mnButton shape="circle" aria-label="Add">+</button><button mnButton borderRadius="none">No radius</button><button mnButton [borderRadius]="12">12px radius</button>`,
      ),
      {},
      "size controls density; shape and borderRadius choose preset or pixel radii. Icon-only buttons require an accessible name.",
    ),
    example(
      "Template icons links and width",
      ["MnButton"],
      `<ng-template #plus><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></ng-template><ng-template #arrow><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></ng-template>${stack(`<button mnButton [startIcon]="plus" (click)="count=count+1">Add</button><button mnButton [endIcon]="arrow" variant="outline" (click)="count=count+1">Continue</button><a mnButton variant="link" href="#/button?framework=angular">Button documentation</a><output>{{count}} actions</output>`)}<button mnButton fullWidth (click)="count=0">Reset full-width action</button>`,
      { count: 0 },
      "startIcon/endIcon accept Angular TemplateRef content. Apply mnButton directly to a native anchor for navigation; fullWidth fills the available container.",
    ),
    example(
      "Native form buttons",
      ["MnButton", "MnInput"],
      `<form (submit)="$event.preventDefault();result='Submitted '+title" (reset)="title='Draft';result='Reset'">${stack(`<mn-input name="title" aria-label="Title" [(value)]="title"/><button mnButton color="neutral" variant="outline" (click)="result='Preview opened (form not submitted)'">Preview</button><button mnButton type="reset" color="neutral" variant="ghost">Reset</button><button mnButton type="submit">Save</button>`)}</form><output aria-live="polite">{{result}}</output>`,
      { title: "Draft", result: "Nothing yet" },
      "mnButton defaults to type=button. Native submit and reset buttons retain form behavior; the reset handler also restores the controlled Angular model.",
    ),
  ],
  "icon-button": [
    example(
      "Toggle an action",
      ["MnIconButton"],
      `<button mnIconButton label="Pin item" toggle [(pressed)]="pinned">★</button><output>{{pinned?'Pinned':'Unpinned'}}</output>`,
      { pinned: false },
    ),
    example(
      "Loading and disabled",
      ["MnIconButton"],
      stack(
        `<button mnIconButton label="Loading" loading>↻</button><button mnIconButton label="Delete" color="danger">×</button><button mnIconButton label="Unavailable" disabled>★</button>`,
      ),
    ),
  ],
  divider: [
    example(
      "Labeled separator",
      ["MnDivider"],
      `<p>Continue with your account</p><mn-divider>or</mn-divider><p>Create a new account</p>`,
    ),
    example(
      "Line styles",
      ["MnDivider"],
      `<mn-divider variant="dashed">Dashed</mn-divider><mn-divider variant="dotted" align="left">Dotted</mn-divider>`,
    ),
  ],
  card: [
    example(
      "Structured content",
      [
        "MnCard",
        "MnCardHeader",
        "MnCardTitle",
        "MnCardDescription",
        "MnCardContent",
        "MnCardFooter",
        "MnButton",
      ],
      `<article mnCard><mn-card-header><mn-card-title>Team workspace</mn-card-title><mn-card-description>Keep your project organized.</mn-card-description></mn-card-header><mn-card-content>12 projects · 8 members</mn-card-content><mn-card-footer><button mnButton (click)="joined=!joined">{{joined?'Joined':'Join workspace'}}</button></mn-card-footer></article>`,
      { joined: false },
    ),
    example(
      "Surface variants",
      ["MnCard"],
      stack(
        `<mn-card variant="outline">Outline card</mn-card><mn-card variant="elevated">Elevated card</mn-card><mn-card variant="filled">Filled card</mn-card>`,
      ),
    ),
  ],
  "virtual-list": [
    example(
      "Windowed data",
      ["MnVirtualList"],
      `<mn-virtual-list [items]="items" [height]="220" [itemHeight]="36"/>`,
      { items: Array.from({ length: 200 }, (_, i) => `Record ${i + 1}`) },
    ),
    example(
      "Custom row template",
      ["MnVirtualList"],
      `<mn-virtual-list [items]="items" [height]="160"><ng-template let-item let-i="index"><strong>{{i+1}}.</strong> {{item}}</ng-template></mn-virtual-list>`,
      {
        items: [
          "Design",
          "Engineering",
          "Research",
          "Operations",
          "Support",
          "Finance",
        ],
      },
    ),
  ],
  checkbox: [
    example(
      "Selection",
      ["MnCheckbox"],
      `<mn-checkbox label="Accept the terms" [(checked)]="accepted"/><output>{{accepted?'Accepted':'Not accepted'}}</output>`,
      { accepted: false },
    ),
    example(
      "States",
      ["MnCheckbox"],
      stack(
        `<mn-checkbox label="Selected" [checked]="true"/><mn-checkbox label="Mixed" indeterminate/><mn-checkbox label="Disabled" disabled/>`,
      ),
    ),
  ],
  radio: [
    example(
      "Choose a plan",
      ["MnRadioGroup", "MnRadio"],
      `<mn-radio-group label="Plan" [(value)]="plan"><mn-radio value="free" label="Free"/><mn-radio value="pro" label="Pro"/><mn-radio value="enterprise" label="Enterprise" disabled/></mn-radio-group><output>Plan: {{plan}}</output>`,
      { plan: "free" },
    ),
    example(
      "Individual options",
      ["MnRadio"],
      stack(
        `<mn-radio label="Selected" [checked]="true"/><mn-radio label="Unavailable" disabled/>`,
      ),
    ),
  ],
  switch: [
    example(
      "Settings",
      ["MnSwitch"],
      `<mn-switch label="Email notifications" [(checked)]="enabled"/><output>{{enabled?'Notifications on':'Notifications off'}}</output>`,
      { enabled: true },
    ),
    example(
      "Sizes and disabled",
      ["MnSwitch"],
      stack(
        `<mn-switch label="Small" size="small"/><mn-switch label="Large" size="large" [checked]="true"/><mn-switch label="Locked" disabled/>`,
      ),
    ),
  ],
  "auto-complete": [
    example(
      "Search suggestions",
      ["MnAutoComplete"],
      `<mn-auto-complete label="City" [options]="options" [(value)]="value"/><output>City: {{value}}</output>`,
      {
        options: ["London", "Lisbon", "Lima", "Tokyo"].map((label) => ({
          label,
          value: label,
        })),
        value: "",
      },
    ),
    example(
      "Preselected suggestion",
      ["MnAutoComplete"],
      `<mn-auto-complete label="Language" [options]="options" value="TypeScript"/>`,
      {
        options: ["TypeScript", "JavaScript", "Rust"].map((label) => ({
          label,
          value: label,
        })),
      },
    ),
  ],
  cascader: [
    example(
      "Hierarchical selection",
      ["MnCascader"],
      `<mn-cascader name="region" label="Region" [options]="options" [(value)]="value"/><output>{{value}}</output>`,
      {
        options: [
          {
            value: "europe",
            label: "Europe",
            children: [
              { value: "france", label: "France" },
              { value: "spain", label: "Spain" },
            ],
          },
          {
            value: "asia",
            label: "Asia",
            children: [{ value: "japan", label: "Japan" }],
          },
        ],
        value: [],
      },
    ),
    example(
      "Disabled field",
      ["MnCascader"],
      `<mn-cascader name="region" label="Locked region" [options]="options" disabled/>`,
      { options: [{ value: "global", label: "Global" }] },
    ),
  ],
  "time-picker": [
    example(
      "Choose a time",
      ["MnTimePicker"],
      `<mn-time-picker label="Start time" [(value)]="time"/><output>{{time}}</output>`,
      { time: null },
    ),
    example(
      "Disabled time",
      ["MnTimePicker"],
      `<mn-time-picker label="Unavailable time" disabled/>`,
    ),
  ],
  avatar: [
    example(
      "Initials and groups",
      ["MnAvatar", "MnAvatarGroup"],
      stack(
        `<mn-avatar name="Ada Lovelace"/><mn-avatar name="Grace Hopper" shape="rounded"/><mn-avatar-group [items]="people" [max]="2"/>`,
      ),
      {
        people: [
          { name: "Ada Lovelace" },
          { name: "Grace Hopper" },
          { name: "Alan Turing" },
          { name: "Katherine Johnson" },
        ],
      },
    ),
    example(
      "Sizes",
      ["MnAvatar"],
      stack(
        `<mn-avatar name="Small" size="small"/><mn-avatar name="Medium"/><mn-avatar name="Large" size="large"/><mn-avatar name="Extra Large" size="xlarge"/>`,
      ),
    ),
  ],
  badge: [
    example(
      "Counts and status",
      ["MnBadge"],
      stack(
        `<mn-badge [value]="12"/><mn-badge value="Active" color="success"/><mn-badge [value]="120" color="danger" attached><span style="padding:20px">Inbox</span></mn-badge>`,
      ),
    ),
    example(
      "Subtle and outlined",
      ["MnBadge"],
      stack(
        `<mn-badge value="New" variant="subtle"/><mn-badge value="Review" variant="outline" color="warning"/>`,
      ),
    ),
  ],
  tag: [
    example(
      "Toggle and remove",
      ["MnTag"],
      `@if(visible){<mn-tag label="Design" clickable closable [(active)]="active" (removed)="visible=false"/>}<output>{{active?'Filter selected':'Filter not selected'}}</output><button type="button" (click)="visible=true">Restore tag</button>`,
      { active: false, visible: true },
    ),
    example(
      "Semantic variants",
      ["MnTag"],
      stack(
        `<mn-tag label="Success" color="success"/><mn-tag label="Warning" color="warning" variant="outline"/><mn-tag label="Loading" loading/><mn-tag label="Disabled" disabled/>`,
      ),
    ),
  ],
  empty: [
    example(
      "Actionable empty state",
      ["MnEmpty", "MnButton"],
      `<mn-empty title="No projects yet" description="Create your first project to get started."><button mnButton (click)="created=true">Create project</button></mn-empty><output>{{created?'Project created':''}}</output>`,
      { created: false },
    ),
    example(
      "Compact presentation",
      ["MnEmpty"],
      `<mn-empty size="small" title="No matches" description="Try another search term."/>`,
    ),
  ],
  tooltip: [
    example(
      "Shared tooltip delays",
      ["MnTooltipProvider", "MnTooltip", "MnButton"],
      `<button mnButton variant="outline" (click)="disabled=!disabled">{{disabled?'Enable hints':'Disable hints'}}</button><mn-tooltip-provider [disabled]="disabled" [enterDelay]="500" [leaveDelay]="100" [skipDelay]="600">${stack(`<mn-tooltip text="Save changes"><button mnButton>Save</button></mn-tooltip><mn-tooltip text="Export report"><button mnButton variant="outline">Export</button></mn-tooltip>`)}</mn-tooltip-provider>`,
      { disabled: false },
      "Provider delays are shared between hints; the disabled scope closes active hints and cancels pending timers. Move between Save and Export to observe skipDelay.",
    ),
    example(
      "Hover and focus",
      ["MnTooltip", "MnButton"],
      `<mn-tooltip text="Save your work before leaving"><button mnButton>Save</button></mn-tooltip>`,
    ),
    example(
      "Placement and tone",
      ["MnTooltip", "MnButton"],
      stack(
        `<mn-tooltip text="An important action" color="warning" placement="top"><button mnButton variant="outline">Above</button></mn-tooltip><mn-tooltip text="More information" variant="subtle" shape="rounded"><button mnButton variant="ghost">Details</button></mn-tooltip>`,
      ),
    ),
  ],
  alert: [
    example(
      "Expandable and dismissible",
      ["MnAlert"],
      `<mn-alert title="Scheduled maintenance" description="The workspace will be unavailable for a few minutes tonight." color="warning" collapsible closable/>`,
    ),
    example(
      "Semantic colors",
      ["MnAlert"],
      `<mn-alert title="Changes saved" color="success"/><mn-alert title="Connection interrupted" description="Check your network and try again." color="danger"/>`,
    ),
  ],
  progress: [
    example(
      "Labeled loading",
      ["MnProgressIndicator"],
      `<mn-progress label="Uploading files"/>`,
    ),
    example(
      "Indicator variants",
      ["MnProgressIndicator"],
      stack(
        `<mn-progress variant="bar" label="Preparing"/><mn-progress variant="circle" size="large"/><mn-progress variant="wave"/><mn-progress variant="dotted-bar"/>`,
      ),
    ),
  ],
  skeleton: [
    example("Content loading", ["MnSkeleton"], `<mn-skeleton variant="card"/>`),
    example(
      "Text placeholders",
      ["MnSkeletonText", "MnSkeleton"],
      `<mn-skeleton-text [count]="4"/><mn-skeleton variant="rounded" [count]="1"/>`,
    ),
  ],
  pagination: [
    example(
      "Page and page size",
      ["MnPagination"],
      `<mn-pagination [total]="128" [(page)]="page" [(pageSize)]="pageSize" showSizeChanger showJumper/><output>Page {{page}} · {{pageSize}} per page</output>`,
      { page: 1, pageSize: 10 },
    ),
    example(
      "Simple pagination",
      ["MnPagination"],
      `<mn-pagination [total]="65" simple/><mn-pagination [total]="100" disabled/>`,
    ),
  ],
  box: [
    example(
      "Spacing and surfaces",
      ["MnBox"],
      `<section mnBox p="6" bg="var(--surface-subtle-color)" rounded="12px">A padded section using theme tokens.</section>`,
    ),
    example(
      "Bounded content",
      ["MnBox"],
      `<div mnBox p="4" maxW="320px" border="1px solid var(--border-color)">This container stays within a readable width.</div>`,
    ),
  ],
  stack: [
    example(
      "Horizontal and vertical",
      ["MnHStack", "MnVStack", "MnButton"],
      `<mn-vstack gap="4"><mn-hstack gap="2"><button mnButton>Save</button><button mnButton variant="outline">Cancel</button></mn-hstack><p>Rows and columns share spacing tokens.</p></mn-vstack>`,
    ),
    example(
      "Wrapping layout",
      ["MnStack", "MnTag"],
      `<mn-stack direction="row" wrap gap="2"><mn-tag label="Design"/><mn-tag label="Engineering"/><mn-tag label="Research"/></mn-stack>`,
    ),
  ],
  "responsive-grid": [
    example(
      "Automatic columns",
      ["MnResponsiveGrid", "MnCard"],
      `<mn-responsive-grid minColumnWidth="160px"><mn-card>Design</mn-card><mn-card>Engineering</mn-card><mn-card>Research</mn-card></mn-responsive-grid>`,
    ),
    example(
      "Spanning a row",
      ["MnResponsiveGrid", "MnGridItem", "MnCard"],
      `<mn-responsive-grid minColumnWidth="140px"><mn-grid-item fullWidth><mn-card>Full-width summary</mn-card></mn-grid-item><mn-card>Left</mn-card><mn-card>Right</mn-card></mn-responsive-grid>`,
    ),
  ],
  "split-layout": [
    example(
      "Content and aside",
      ["MnSplitLayout"],
      `<mn-split-layout><article><h3>Main content</h3><p>The primary reading area grows with its container.</p></article><aside mnAside>Related details and navigation.</aside></mn-split-layout>`,
    ),
    example(
      "Operational sidebar",
      ["MnSplitLayout", "MnCard"],
      `<mn-split-layout><mn-card>Project overview</mn-card><mn-card mnAside variant="filled">Status: Active</mn-card></mn-split-layout>`,
    ),
  ],
  page: [
    example(
      "Structured screen",
      ["MnPage", "MnPageHeader", "MnPageSection", "MnStatCard"],
      `<mn-page><mn-page-header title="Overview" description="Your team's activity"/><mn-page-section title="Metrics" description="Updated just now" icon="★"><mn-stat-card label="Active projects" [value]="12" description="3 added this week"/></mn-page-section></mn-page>`,
    ),
    example(
      "Related actions",
      ["MnToolbar", "MnButton"],
      `<mn-toolbar aria-label="Project actions"><button mnButton (click)="result='Created'">Create</button><button mnButton variant="outline" (click)="result='Exported'">Export</button></mn-toolbar><output>{{result}}</output>`,
      { result: "" },
    ),
  ],
  "app-shell": [
    example(
      "Workspace navigation",
      ["MnAppShell", "MnNavTree"],
      `<div style="position:relative;isolation:isolate;transform:translateZ(0);height:360px;overflow:auto"><mn-app-shell title="Workspace"><ng-template><mn-nav-tree [items]="items"/></ng-template><p style="padding:24px">Open navigation to inspect the mobile drawer and keyboard focus behavior.</p></mn-app-shell></div>`,
      {
        items: [
          { id: "home", label: "Overview", href: "#overview" },
          { id: "projects", label: "Projects", href: "#projects" },
        ],
      },
    ),
    example(
      "Controlled navigation drawer",
      ["MnButton", "MnDrawer"],
      `<button mnButton (click)="open=true">Open navigation</button><mn-drawer title="Workspace" [(open)]="open" side="left"><nav><a href="#overview">Overview</a></nav></mn-drawer>`,
      { open: false },
    ),
  ],
  modal: [
    example(
      "Dialog actions",
      ["MnButton", "MnModal", "MnModalBody", "MnModalFooter"],
      `<button mnButton (click)="open=true">Edit profile</button><mn-modal title="Edit profile" description="Update your public information." [(open)]="open"><mn-modal-body>Changes are saved to your workspace.</mn-modal-body><mn-modal-footer><button mnButton (click)="saved=true;open=false">Save profile</button></mn-modal-footer></mn-modal><output>{{saved?'Profile saved':''}}</output>`,
      { open: false, saved: false },
    ),
    example(
      "Dialog sizes",
      ["MnButton", "MnModal"],
      `<button mnButton variant="outline" (click)="open=true">Open large dialog</button><mn-modal title="Details" size="large" [(open)]="open">A wider content area.</mn-modal>`,
      { open: false },
    ),
  ],
  confirm: [
    example(
      "Queued confirmations",
      ["MnConfirmProvider", "MnButton"],
      `<mn-confirm-provider #confirmation="mnConfirmProvider"><button mnButton (click)="confirmation.confirm({title:'Delete draft?',description:'This is the first queued request.',color:'danger'});confirmation.confirm({title:'Archive project?',description:'The second request waits for the first.'})">Queue two confirmations</button></mn-confirm-provider>`,
    ),
    example(
      "Confirm a destructive action",
      ["MnButton", "MnConfirmDialog"],
      `<button mnButton color="danger" (click)="open=true">Delete project</button><mn-confirm-dialog title="Delete this project?" description="This action cannot be undone." color="danger" [(open)]="open" (confirm)="deleted=true;open=false"/><output>{{deleted?'Project deleted':''}}</output>`,
      { open: false, deleted: false },
    ),
    example(
      "Controlled loading and recovery",
      ["MnButton", "MnConfirmDialog"],
      `<button mnButton (click)="open=true;loading=false;completed=false">Preview processing</button><mn-confirm-dialog title="Processing request" description="Confirm starts the caller-owned operation; complete it below." [(open)]="open" [loading]="loading" (confirm)="loading=true"><button mnButton variant="outline" [disabled]="!loading" (click)="loading=false;open=false;completed=true">Complete request</button></mn-confirm-dialog><output>{{completed?'Request completed':loading?'Processing':'Ready'}}</output>`,
      { open: false, loading: false, completed: false },
      "The declarative dialog emits confirm; the owner sets loading and completes or retries its operation. This example uses Complete request as an explicit stand-in for the server response and can be reopened.",
    ),
  ],
  drawer: [
    example(
      "Side panel",
      ["MnButton", "MnDrawer", "MnDrawerBody", "MnDrawerFooter"],
      `<button mnButton (click)="open=true">Open details</button><mn-drawer title="Project details" description="Review the latest information" [(open)]="open"><mn-drawer-body>Updated today by your team.</mn-drawer-body><mn-drawer-footer><button mnButton (click)="open=false">Done</button></mn-drawer-footer></mn-drawer>`,
      { open: false },
    ),
    example(
      "Bottom sheet",
      ["MnButton", "MnDrawer"],
      `<button mnButton variant="outline" (click)="open=true">Open bottom sheet</button><mn-drawer title="Quick actions" side="bottom" [(open)]="open">Choose an action.</mn-drawer>`,
      { open: false },
    ),
  ],
  command: [
    example(
      "Search and run commands",
      ["MnButton", "MnCommandDialog"],
      `<button mnButton (click)="open=true">Open commands</button><mn-command-dialog [(open)]="open" [items]="items" (selected)="result=$event.label ?? ''"/><output>{{result}}</output>`,
      {
        open: false,
        result: "",
        items: [
          { id: "new", label: "Create project", keywords: "add new" },
          { id: "search", label: "Search files" },
          { id: "settings", label: "Open settings" },
        ],
      },
    ),
    example(
      "Unavailable commands",
      ["MnButton", "MnCommandDialog"],
      `<button mnButton variant="outline" (click)="open=true">Workspace commands</button><mn-command-dialog title="Workspace" [(open)]="open" [items]="items"/>`,
      {
        open: false,
        items: [
          { id: "view", label: "View workspace" },
          { id: "delete", label: "Delete workspace", disabled: true },
        ],
      },
    ),
  ],
  popover: [
    example(
      "Separate anchor and close action",
      ["MnPopover", "MnPopoverAnchor", "MnPopoverClose", "MnButton"],
      `<p [mnPopoverAnchor]="details">The panel is positioned relative to this text.</p><mn-popover #details="mnPopover" label="Open anchored panel" placement="top"><p>Projected content may close the popover.</p><button mnButton mnPopoverClose>Done</button></mn-popover>`,
    ),
    example(
      "Interactive content",
      ["MnPopover", "MnButton"],
      `<mn-popover label="Project details"><p>12 active members</p><button mnButton size="small" (click)="invited=true">Invite member</button><output>{{invited?'Invitation prepared':''}}</output></mn-popover>`,
      { invited: false },
    ),
    example(
      "Placement",
      ["MnPopover"],
      `<mn-popover label="Show above" placement="top">A floating panel positioned above its trigger.</mn-popover>`,
    ),
    example(
      "Controlled open and disabled trigger",
      ["MnPopover", "MnPopoverClose", "MnButton"],
      `${stack(`<button mnButton variant="outline" (click)="open=!open">{{open?'Close from parent':'Open from parent'}}</button><button mnButton variant="ghost" (click)="disabled=!disabled">{{disabled?'Enable trigger':'Disable trigger'}}</button><output>Panel: {{open?'open':'closed'}} · Trigger: {{disabled?'disabled':'enabled'}}</output>`)}<mn-popover label="Controlled details" [(open)]="open" [disabled]="disabled" placement="bottom-end"><p>The parent owns visibility.</p><button mnButton mnPopoverClose>Close details</button></mn-popover>`,
      { open: false, disabled: false },
      "Bind [(open)] for parent control. MnPopover owns its native trigger; Angular does not expose React asChild. Use mnPopoverAnchor for a separate positioning element and mnPopoverClose for a projected close button. disabled applies to the built-in trigger.",
    ),
  ],
  menu: [
    example(
      "Named groups and radio choices",
      ["MnMenu"],
      `<mn-menu label="Display density" [items]="items" [(radioValues)]="values"/><output>Density: {{values['density']}}</output>`,
      {
        values: { density: "comfortable" },
        items: [
          {
            id: "density",
            type: "group",
            label: "Density",
            children: [
              { id: "comfortable", type: "radio", label: "Comfortable" },
              { id: "compact", type: "radio", label: "Compact" },
              {
                id: "unavailable",
                type: "radio",
                label: "Unavailable",
                disabled: true,
              },
            ],
          },
        ],
      },
    ),
    example(
      "Actions and selection",
      ["MnMenu"],
      `<mn-menu label="Project actions" [items]="items" (selected)="result=$event.label ?? ''"/><output>{{result}}</output>`,
      {
        result: "",
        items: [
          { id: "edit", label: "Edit", icon: "✎", shortcut: "⌘E" },
          { id: "duplicate", label: "Duplicate" },
          { id: "sep", type: "separator" },
          { id: "delete", label: "Delete", disabled: true },
        ],
      },
    ),
    example(
      "Context menu and checked items",
      ["MnContextMenu"],
      `<mn-context-menu label="Right-click here" [items]="items" (checkedChange)="items=$event.id==='show'?[{id:'show',label:'Show hidden files',checked:$event.checked},items[1]!]:[items[0]!,{id:'sort',label:'Sort by name',checked:$event.checked}]" (selected)="result=$event.label ?? ''"/><output>{{result}} · Hidden: {{items[0]!.checked}} · Sorted: {{items[1]!.checked}}</output>`,
      {
        result: "",
        items: [
          { id: "show", label: "Show hidden files", checked: true },
          { id: "sort", label: "Sort by name", checked: false },
        ],
      },
    ),
    example(
      "Nested actions and expanded state",
      ["MnMenu", "MnButton"],
      `<mn-menu label="File actions" [items]="items" [(expanded)]="expanded" (selected)="result=$event.label ?? ''"/><output>{{result || 'Choose a nested action'}} · Expanded: {{expanded.join(', ') || 'none'}}</output><button mnButton variant="ghost" (click)="expanded=[];result=''">Reset menu</button>`,
      {
        expanded: [],
        result: "",
        items: [
          {
            id: "export",
            label: "Export",
            children: [
              { id: "csv", label: "CSV" },
              { id: "json", label: "JSON" },
            ],
          },
          { id: "restricted", label: "Restricted", disabled: true },
        ],
      },
      "children defines nested choices. expanded is a controlled list of open item IDs, and selected reports the leaf action; disabled choices stay unavailable to pointer and keyboard activation.",
    ),
  ],
  toast: [
    example(
      "Show and dismiss notifications",
      ["MnButton", "MnToastRegion"],
      `<button mnButton (click)="messages=[{id:'saved',title:'Changes saved',description:'Your workspace is up to date.',color:'success',action:'Undo'}]">Save changes</button><mn-toast-region [messages]="messages" (closed)="messages=[]" (action)="messages=[];result='Changes restored'"/><output>{{result}}</output>`,
      { messages: [], result: "" },
    ),
    example(
      "Error feedback",
      ["MnButton", "MnToastRegion"],
      `<button mnButton variant="outline" (click)="messages=[{id:'error',title:'Unable to sync',description:'Check your connection and try again.',color:'danger'}]">Simulate error</button><mn-toast-region [messages]="messages" (closed)="messages=[]"/>`,
      { messages: [] },
    ),
  ],
  "page-tabs": [
    example(
      "Document navigation",
      ["MnPageTabs", "MnPageTab"],
      `<mn-page-tabs><mn-page-tab label="Overview" icon="▤" [current]="page==='overview'" (selected)="page='overview'"/><mn-page-tab label="Activity" [current]="page==='activity'" (selected)="page='activity'"/></mn-page-tabs><output>Current page: {{page}}</output>`,
      { page: "overview" },
    ),
    example(
      "Unavailable page",
      ["MnPageTabs", "MnPageTab"],
      `<mn-page-tabs><mn-page-tab label="Current" current/><mn-page-tab label="Restricted" disabled/></mn-page-tabs>`,
    ),
  ],
  "form-control": [
    example(
      "Labeled field with help",
      ["MnFormControl", "MnFormHelperText", "MnInput"],
      `<mn-form-control label="Display name" required><mn-input [(value)]="value"/><mn-form-helper-text>Shown to your teammates.</mn-form-helper-text></mn-form-control><output>{{value}}</output>`,
      { value: "" },
    ),
    example(
      "Validation feedback",
      ["MnFormControl", "MnFormErrorMessage", "MnInput"],
      `<mn-form-control label="Email" invalid required><mn-input value="invalid-address"/><mn-form-error-message>Enter a valid email address.</mn-form-error-message></mn-form-control>`,
    ),
  ],
  "form-layout": [
    example(
      "Submit a form",
      ["MnFormLayout", "MnFormControl", "MnInput", "MnButton"],
      `<form mnFormLayout (submit)="$event.preventDefault();saved=true"><mn-form-control label="Project name" required><mn-input [(value)]="value" required/></mn-form-control><button mnButton type="submit">Create project</button></form><output>{{saved?'Created '+value:''}}</output>`,
      { value: "New project", saved: false },
    ),
    example(
      "Settings form",
      ["MnFormLayout", "MnCheckbox", "MnButton"],
      `<form mnFormLayout (submit)="$event.preventDefault();saved=true"><mn-checkbox label="Receive product updates" [(checked)]="enabled"/><button mnButton type="submit" variant="outline">Save preferences</button></form><output>{{saved?'Preferences saved':''}}</output>`,
      { enabled: true, saved: false },
    ),
  ],
  input: [
    example(
      "Controlled value",
      ["MnInput"],
      `<mn-input aria-label="Project name" placeholder="Enter a project name" [(value)]="value"/><output>{{value}}</output>`,
      { value: "" },
    ),
    example(
      "Affixes and states",
      ["MnInput"],
      `<mn-input aria-label="Website" prefix="https://" suffix=".com" placeholder="your-site"/><mn-input aria-label="Invalid value" invalid value="Needs attention"/><mn-input aria-label="Disabled field" disabled value="Unavailable"/>`,
    ),
    example(
      "Clear password and character count",
      ["MnInput", "MnButton"],
      `<mn-stack gap="3"><mn-input aria-label="Search" [(value)]="search" clearable showCharCount [maxLength]="20" clearLabel="Clear search"/><mn-input aria-label="Password" type="password" [(value)]="password" autocomplete="new-password" showPasswordLabel="Show password" hidePasswordLabel="Hide password"/><output>Search: {{search || '(empty)'}}</output><button mnButton variant="outline" (click)="search='Minerva';password='secret-pass'">Reset inputs</button></mn-stack>`,
      { search: "Minerva", password: "secret-pass" },
      "clearable updates the value model; showCharCount follows maxLength. Password visibility changes the native type while preserving the bound value.",
    ),
    example(
      "Sizes variants and read only",
      ["MnInput"],
      `<mn-stack gap="3"><mn-input aria-label="Small" size="small" placeholder="Small"/><mn-input aria-label="Medium" size="medium" placeholder="Medium"/><mn-input aria-label="Large" size="large" placeholder="Large"/><mn-input aria-label="Filled" variant="filled" placeholder="Filled"/><mn-input aria-label="Unstyled" variant="unstyled" placeholder="Unstyled"/><mn-input aria-label="Read-only account" readOnly value="account-42"/><mn-input aria-label="Disabled account" disabled value="Unavailable"/></mn-stack>`,
      {},
      "readOnly preserves focus and copying; disabled blocks editing and removes the control from form submission. Sizes and visual variants are independent.",
    ),
    example(
      "Native validation and field context",
      [
        "MnInput",
        "MnButton",
        "MnFormControl",
        "MnFormLabel",
        "MnFormHelperText",
        "MnFormErrorMessage",
      ],
      `<form #form (submit)="$event.preventDefault();result='Submitted '+email" (reset)="email='';attempted=false;result='Reset'"><mn-stack gap="3"><mn-form-control required [invalid]="attempted && !form.checkValidity()"><mn-form-label>Email</mn-form-label><mn-input name="email" type="email" [(value)]="email" required autocomplete="email" placeholder="you@example.com"/><mn-form-helper-text>Use an address where we can reach you.</mn-form-helper-text><mn-form-error-message>Enter a valid email address.</mn-form-error-message></mn-form-control>${stack(`<button mnButton type="submit" (click)="attempted=true">Subscribe</button><button mnButton type="reset" variant="ghost">Reset</button>`)}</mn-stack></form><output aria-live="polite">{{result}}</output>`,
      { email: "", attempted: false, result: "Not submitted" },
      "Native name/type/required attributes participate in browser validation and submission. MnFormControl links the label, helper/error text and invalid state to the inner input; submit/reset handlers keep the value model authoritative.",
    ),
  ],
  textarea: [
    example(
      "Message input",
      ["MnTextarea"],
      `<textarea mnTextarea aria-label="Message" [(value)]="value" rows="4" placeholder="Write a message"></textarea><output>{{value.length}} characters</output>`,
      { value: "" },
    ),
    example(
      "Read-only content",
      ["MnTextarea"],
      `<textarea mnTextarea aria-label="Terms" value="Your published message appears here." readOnly rows="3"></textarea>`,
    ),
  ],
  "number-input": [
    example(
      "Quantity",
      ["MnNumberInput"],
      `<mn-number-input aria-label="Quantity" [(value)]="value" [min]="0" [max]="20"/><output>Quantity: {{value}}</output>`,
      { value: 3 },
    ),
    example(
      "Step and bounds",
      ["MnNumberInput"],
      `<mn-number-input aria-label="Percentage" [value]="50" [step]="5" [min]="0" [max]="100"/><mn-number-input aria-label="Unavailable quantity" disabled [value]="10"/>`,
    ),
  ],
  "json-field": [
    example(
      "Validate and format",
      ["MnJsonField"],
      `<mn-json-field label="Configuration" [(value)]="value"/><pre>{{value}}</pre>`,
      { value: '{"name":"Minerva","enabled":true}' },
    ),
    example(
      "Invalid JSON",
      ["MnJsonField"],
      `<mn-json-field label="Invalid configuration" value="invalid JSON" required/>`,
    ),
  ],
  "key-value-editor": [
    example(
      "Edit environment values",
      ["MnKeyValueEditor"],
      `<mn-key-value-editor [(value)]="value"/><output>{{value.length}} entries</output>`,
      {
        value: [
          { key: "REGION", value: "eu-west" },
          { key: "MODE", value: "production" },
        ],
      },
    ),
    example(
      "Disabled data",
      ["MnKeyValueEditor"],
      `<mn-key-value-editor [value]="value" disabled/>`,
      { value: [{ key: "VERSION", value: "1.0" }] },
    ),
  ],
  "tag-input": [
    example(
      "Add and remove labels",
      ["MnTagInput"],
      `<mn-tag-input aria-label="Labels" [(value)]="value"/><output>{{value.join(', ')}}</output>`,
      { value: ["Design", "Frontend"] },
    ),
    example(
      "Suggested labels",
      ["MnTagInput"],
      `<mn-tag-input aria-label="Skills" [options]="options" [(value)]="value"/>`,
      { options: ["TypeScript", "Angular", "React", "Vue"], value: [] },
    ),
  ],
  "loading-state": [
    example(
      "Section loading",
      ["MnLoadingState"],
      `<mn-loading-state label="Loading workspace…"/>`,
    ),
    example(
      "Presentation sizes",
      ["MnLoadingState"],
      `<mn-loading-state size="small" label="Fetching records"/><mn-loading-state size="large" label="Preparing your report"/>`,
    ),
  ],
  "text-link": [
    example(
      "Inline links",
      ["MnTextLink"],
      `<p>Read the <a mnTextLink href="#installation">installation guide</a> to get started.</p>`,
    ),
    example(
      "Subtle and action links",
      ["MnTextLink"],
      stack(
        `<a mnTextLink variant="subtle" href="#details">View details →</a><a mnTextLink variant="action" href="#settings">Workspace settings</a>`,
      ),
    ),
  ],
  "description-list": [
    example(
      "Record metadata",
      ["MnDescriptionList"],
      `<mn-description-list [items]="items"/>`,
      {
        items: [
          { term: "Owner", description: "Ada Lovelace" },
          { term: "Status", description: "Active" },
          { term: "Created", description: "October 2026" },
        ],
      },
    ),
    example(
      "Operational details",
      ["MnDescriptionList"],
      `<mn-description-list [items]="items"/>`,
      {
        items: [
          { term: "Region", description: "Europe" },
          { term: "Environment", description: "Production" },
        ],
      },
    ),
  ],
  list: [
    example(
      "Operational rows",
      ["MnList", "MnListItem", "MnButton"],
      `<ul mnList dividers><li mnListItem label="Design review" description="Today at 14:00" icon="◷"><button mnButton mnActions size="small" variant="ghost" (click)="result='Review opened'">Open</button></li><li mnListItem label="Release notes" description="Updated yesterday" icon="▤"></li></ul><output>{{result}}</output>`,
      { result: "" },
    ),
    example(
      "Compact list",
      ["MnList", "MnListItem"],
      `<ul mnList density="compact" bordered><li mnListItem label="Engineering"></li><li mnListItem label="Research"></li><li mnListItem label="Support"></li></ul>`,
    ),
  ],
  "code-block": [
    example(
      "Copyable source",
      ["MnCodeBlock"],
      `<mn-code-block [code]="code" language="typescript" copyable/>`,
      { code: 'const message = "Hello, Minerva";\nconsole.log(message);' },
    ),
    example(
      "Plain text",
      ["MnCodeBlock"],
      `<mn-code-block code="pnpm add minerva-design" language="shell"/>`,
    ),
  ],
  prose: [
    example(
      "Semantic typography",
      ["MnProse"],
      `<article mnProse><h2>A readable article</h2><p>Use semantic HTML for content that follows your theme.</p><ul><li>Clear headings</li><li>Comfortable spacing</li></ul><blockquote>Good interfaces make information easy to understand.</blockquote></article>`,
    ),
    example(
      "Code and tables",
      ["MnProse"],
      `<article mnProse><h3>Configuration</h3><p>Set <code>theme="dark"</code> on your provider.</p><table><thead><tr><th>Option</th><th>Value</th></tr></thead><tbody><tr><td>Locale</td><td>English</td></tr></tbody></table></article>`,
    ),
  ],
  "theme-palette": [
    example("Theme mode", ["MnThemeToggle"], `<mn-theme-toggle/>`),
    example("Color palettes", ["MnPaletteToggle"], `<mn-palette-toggle/>`),
  ],
  table: [
    example(
      "Semantic composition and merged cells",
      [
        "MnTableRoot",
        "MnTableHead",
        "MnTableBody",
        "MnTableRow",
        "MnTableHeader",
        "MnTableCell",
        "MnButton",
      ],
      `<mn-table-root label="Project summary" variant="bordered" [scroll]="{x:480}"><thead mnTableHead><tr mnTableRow><th mnTableHeader scope="col" [sort]="order"><button mnButton variant="ghost" size="small" (click)="order=order==='ascending'?'descending':'ascending'">Project</button></th><th mnTableHeader scope="col">Action</th></tr></thead><tbody mnTableBody><tr mnTableRow [selected]="selected"><td mnTableCell>Minerva</td><td mnTableCell><button mnButton size="small" (click)="selected=!selected">{{selected?'Deselect':'Select'}}</button></td></tr><tr mnTableRow><td mnTableCell colspan="2">Custom content spans both columns.</td></tr></tbody></mn-table-root>`,
      { selected: false, order: "ascending" },
      "Native table directives preserve colspan/rowspan and custom interactive headers. Bind sort to expose aria-sort and styling state; the owner applies its own data ordering for a custom table.",
    ),
    example(
      "Sort and select rows",
      ["MnDataTable"],
      `<mn-data-table caption="Team members" [columns]="columns" [rows]="rows" selectable [(selection)]="selection" [(sort)]="sort"/><output>{{selection.length}} selected · Sort: {{sort?.key || 'none'}} {{sort?.direction || ''}}</output>`,
      {
        columns: [
          { key: "name", header: "Name", sortable: true },
          { key: "role", header: "Role" },
        ],
        rows: [
          { id: "1", name: "Grace", role: "Engineer" },
          { id: "2", name: "Ada", role: "Designer" },
          { id: "3", name: "Alan", role: "Researcher" },
        ],
        selection: [],
        sort: null,
      },
    ),
    example(
      "Empty and error states",
      ["MnDataTable"],
      `<mn-data-table caption="Empty results" [columns]="columns"/><mn-data-table caption="Network error" [columns]="columns" [error]="error" (retry)="error=''"/>`,
      {
        columns: [{ key: "name", header: "Name" }],
        error: "Unable to load records",
      },
    ),
    example(
      "Density appearance and loading",
      ["MnDataTable", "MnButton"],
      `${stack(`<button mnButton variant="outline" (click)="compact=!compact">Toggle density</button><button mnButton variant="outline" (click)="striped=!striped">Toggle stripes</button><button mnButton (click)="loading=!loading">{{loading?'Finish loading':'Reload'}}</button>`)}<mn-data-table caption="Project inventory" [columns]="columns" [rows]="rows" [size]="compact?'small':'large'" [variant]="striped?'striped':'bordered'" [loading]="loading"/><output>{{loading?'Loading records':compact?'Compact density':'Comfortable density'}}</output>`,
      {
        compact: true,
        striped: true,
        loading: false,
        columns: [
          { key: "name", header: "Project" },
          { key: "status", header: "Status" },
        ],
        rows: [{ id: "one", name: "Minerva", status: "Active" }],
      },
      "size and variant style the same data; loading temporarily replaces rows. Reload/Finish loading lets you inspect and restore the loading state without a network dependency.",
    ),
  ],
  "nav-tree": [
    example(
      "Hierarchical navigation",
      ["MnNavTree"],
      `<mn-nav-tree [items]="items" [(value)]="value" [expanded]="['projects']"/><output>Selected: {{value}}</output>`,
      {
        value: "overview",
        items: [
          { id: "overview", label: "Overview", icon: "⌂" },
          {
            id: "projects",
            label: "Projects",
            children: [
              { id: "design", label: "Design", description: "Active project" },
              { id: "engineering", label: "Engineering" },
            ],
          },
        ],
      },
    ),
    example(
      "Disabled destinations",
      ["MnNavTree"],
      `<mn-nav-tree label="Administration" [items]="items"/>`,
      {
        items: [
          { id: "settings", label: "Settings" },
          { id: "billing", label: "Billing", disabled: true },
        ],
      },
    ),
  ],
  tabs: [
    example(
      "Switch between panels",
      ["MnTabs", "MnTab", "MnTabPanel"],
      `<mn-tabs [(value)]="value"><mn-tab value="overview">Overview</mn-tab><mn-tab value="activity">Activity</mn-tab><mn-tab value="restricted" disabled>Restricted</mn-tab><mn-tab-panel value="overview">Project overview and summary.</mn-tab-panel><mn-tab-panel value="activity">Recent updates from the team.</mn-tab-panel></mn-tabs>`,
      { value: "overview" },
    ),
    example(
      "Vertical pill tabs",
      ["MnTabs", "MnTab", "MnTabPanel"],
      `<mn-tabs value="general" orientation="vertical" variant="pills"><mn-tab value="general">General</mn-tab><mn-tab value="security">Security</mn-tab><mn-tab-panel value="general">General settings</mn-tab-panel><mn-tab-panel value="security">Security settings</mn-tab-panel></mn-tabs>`,
    ),
  ],
  "html-preview": [
    example(
      "Sandboxed document",
      ["MnHtmlPreview"],
      `<mn-html-preview title="Email preview" [html]="html" [height]="200"/>`,
      { html: "<h1>Welcome to Minerva</h1><p>Your workspace is ready.</p>" },
    ),
    example(
      "Mobile viewport",
      ["MnHtmlPreview"],
      `<mn-html-preview title="Mobile preview" viewport="mobile" [mobileWidth]="280" [height]="200" [html]="html"/>`,
      {
        html: "<h2>Monthly update</h2><p>A bounded preview of a mobile email.</p>",
      },
    ),
  ],
  "monaco-code-editor": [
    {
      ...example(
        "Edit source",
        ["MnMonacoCodeEditor"],
        `<mn-monaco-code-editor label="HTML source" language="html" [(value)]="value" [monaco]="monaco" height="240px"/><output>{{value.length}} characters</output>`,
        { value: "<h1>Hello Minerva</h1>\n<p>Edit this document.</p>" },
      ),
      monaco: true,
    },
    {
      ...example(
        "Read-only source",
        ["MnMonacoCodeEditor"],
        `<mn-monaco-code-editor label="Published source" language="typescript" value="const version = 1;" [monaco]="monaco" [readOnly]="true" height="180px"/>`,
      ),
      monaco: true,
    },
  ],
  steps: [
    example(
      "Move through a workflow",
      ["MnSteps"],
      `<mn-steps [items]="items" [(current)]="current"/><output>Step {{current+1}} of {{items.length}}</output>`,
      {
        items: [
          { label: "Details" },
          { label: "Review" },
          { label: "Publish" },
        ],
        current: 0,
      },
    ),
    example(
      "Read-only progress",
      ["MnSteps"],
      `<mn-steps [items]="items" [current]="1" readOnly/>`,
      {
        items: [
          { label: "Received" },
          { label: "Processing" },
          { label: "Completed" },
        ],
      },
    ),
  ],
  upload: [
    example(
      "Select local files",
      ["MnUpload"],
      `<mn-upload label="Attachments" multiple (filesSelected)="count=$event.length"/><output>{{count}} files selected</output>`,
      { count: 0 },
    ),
    example(
      "Restricted file types",
      ["MnUpload"],
      `<mn-upload label="Images" accept="image/*"/><mn-upload label="Disabled upload" disabled/>`,
    ),
  ],
  select: [
    example(
      "Choose a role",
      ["MnSelect", "MnSelectItem"],
      `<mn-select aria-label="Role" [(value)]="value"><mn-select-item value="designer">Designer</mn-select-item><mn-select-item value="engineer">Engineer</mn-select-item><mn-select-item value="admin" disabled>Administrator</mn-select-item></mn-select><output>Role: {{value}}</output>`,
      { value: "designer" },
    ),
    example(
      "Grouped options",
      [
        "MnSelect",
        "MnSelectItem",
        "MnSelectGroup",
        "MnSelectLabel",
        "MnSelectSeparator",
      ],
      `<mn-select aria-label="Location"><mn-select-group><mn-select-label>Europe</mn-select-label><mn-select-item value="london">London</mn-select-item><mn-select-item value="paris">Paris</mn-select-item></mn-select-group><mn-select-separator/><mn-select-item value="tokyo">Tokyo</mn-select-item></mn-select>`,
    ),
  ],
  rating: [
    example(
      "Rate an experience",
      ["MnRating"],
      `<mn-rating [(value)]="value"/><output>{{value}} of 5</output>`,
      { value: 3 },
    ),
    example(
      "Read-only rating",
      ["MnRating"],
      `<mn-rating [value]="4" readOnly/>`,
    ),
  ],
  "month-calendar": [
    example(
      "Pick a date and inspect events",
      ["MnMonthCalendar"],
      `<mn-month-calendar [month]="month" [(value)]="value" [events]="events"/><output>Selected: {{value}}</output>`,
      {
        month: new Date(2026, 9, 1),
        value: "2026-10-09",
        events: [{ id: "review", date: "2026-10-09", title: "Design review" }],
      },
    ),
    example(
      "Disabled calendar",
      ["MnMonthCalendar"],
      `<mn-month-calendar [month]="month" disabled size="small"/>`,
      { month: new Date(2026, 9, 1) },
    ),
  ],
};
angularExamples["config-provider"] = [
  example(
    "Reactive nested configuration",
    ["MnConfig", "MnButton", "MnThemeToggle", "MnPaletteToggle"],
    `${stack(`<button mnButton variant="outline" (click)="localTheme=localTheme==='dark'?'light':'dark'">Toggle scoped theme</button><button mnButton variant="ghost" (click)="localTheme='light';localPalette=null">Reset scope</button><output>Scope: {{localTheme}} / {{localPalette || 'default'}}</output>`)}<mn-config [theme]="localTheme" (themeChange)="localTheme=$event" [palette]="localPalette" (paletteChange)="localPalette=$event"><mn-stack gap="3"><mn-theme-toggle/><mn-palette-toggle/><button mnButton>Scoped button</button><mn-config theme="light" palette="tech"><button mnButton>Nested light tech button</button></mn-config></mn-stack></mn-config>`,
    { localTheme: "light", localPalette: null },
    "MnConfig creates an inheritable subtree scope. themeChange/paletteChange write user toggles back to the parent; the inner explicit configuration remains independent. provideMinerva() supplies application-root defaults.",
  ),
  example(
    "Scoped configuration",
    ["MnConfig", "MnButton"],
    `<mn-config theme="dark"><div style="padding:20px;background:var(--surface-color);color:var(--text-color)"><button mnButton>Dark scoped button</button></div></mn-config>`,
  ),
  example(
    "Local language",
    ["MnConfig", "MnEmpty"],
    `<mn-config locale="zh"><mn-empty title="暂无项目" description="创建你的第一个项目。"/></mn-config>`,
  ),
];

// Field types are shared by the displayed source and strict AOT compilation.
for (const [page, examples] of Object.entries(angularExamples)) {
  for (const item of examples) {
    item.key = `${page}:${item.id}`;
    item.stateTypes = {};
    for (const [key, value] of Object.entries(item.state)) {
      if (Array.isArray(value) && value.length === 0)
        item.stateTypes[key] = "string[]";
    }
    if (page === "table" && Object.hasOwn(item.state, "sort"))
      item.stateTypes.sort =
        "import('minerva-design/angular').TableSort | null";
    if (page === "table" && Object.hasOwn(item.state, "order"))
      item.stateTypes.order = "'ascending' | 'descending'";
    if (page === "config-provider" && Object.hasOwn(item.state, "localTheme")) {
      item.stateTypes.localTheme =
        "import('minerva-design/angular').ConfigTheme";
      item.stateTypes.localPalette =
        "'editorial' | 'tech' | 'graphite' | 'cool' | null";
    }
    if (page === "menu")
      item.stateTypes.items = "import('minerva-design/angular').MenuItem[]";
    if (page === "toast")
      item.stateTypes.messages =
        "import('minerva-design/angular').ToastMessage[]";
  }
}

function expression(value: unknown): string {
  return value instanceof Date
    ? `new Date(${value.getFullYear()}, ${value.getMonth()}, ${value.getDate()})`
    : JSON.stringify(value, null, 2);
}
export function angularSource(example: AngularExample): string {
  const componentImports = example.imports.join(", ");
  const packageName = example.monaco
    ? "minerva-design/angular/monaco"
    : "minerva-design/angular";
  const fields = Object.entries(example.state)
    .map(
      ([key, value]) =>
        `  ${key}${example.stateTypes?.[key] ? `: ${example.stateTypes[key]}` : ""} = ${expression(value)};`,
    )
    .join("\n");
  const engine = example.monaco
    ? '\n// engine.ts configures MonacoEnvironment.getWorker with bundled workers.\nimport { monaco } from "./engine";'
    : "";
  return `import { Component } from '@angular/core';\nimport { ${componentImports} } from '${packageName}';${engine}\n\n@Component({\n  selector: 'app-example',\n  imports: [${componentImports}],\n  template: \`\n${example.template}\n  \`,\n})\nexport class Example {\n${fields}${example.monaco ? "\n  readonly monaco = monaco;" : ""}\n}\n`;
}
