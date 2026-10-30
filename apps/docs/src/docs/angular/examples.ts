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
  "date-picker": [
    example(
      "Choose a date",
      ["MnDatePicker"],
      `<mn-date-picker label="Meeting date" [(value)]="date"/><output>{{date || 'No date selected'}}</output>`,
      { date: null },
    ),
    example(
      "Date range",
      ["MnDatePicker"],
      `<mn-date-picker label="October booking" [(value)]="date" minDate="2026-10-10" maxDate="2026-10-20"/><output>{{date}}</output>`,
      { date: "2026-10-15" },
    ),
    example(
      "Form field",
      ["MnDatePicker", "MnFormControl", "MnFormLabel", "MnFormHelperText"],
      `<mn-form-control required><mn-form-label>Birthday</mn-form-label><mn-date-picker [(value)]="date"/><mn-form-helper-text>Type YYYY-MM-DD or choose a day from the calendar.</mn-form-helper-text></mn-form-control>`,
      { date: null },
    ),
    example(
      "Disabled and read-only dates",
      ["MnDatePicker"],
      stack(
        `<mn-date-picker label="Read-only date" defaultValue="2026-10-15" readOnly/><mn-date-picker label="Disabled date" defaultValue="2026-10-15" disabled/>`,
      ),
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

// Chart examples: the ids (and translated titles / descriptions
// `docs.<page>.wc.demos.<id>`) of the Web Component demos of their page; the
// labels follow the language of the site (`language()`, set by the host).
const chart = (
  id: string,
  title: string,
  imports: string[],
  template: string,
  state: Record<string, unknown>,
): AngularExample => ({
  ...example(title, imports, template, state),
  id,
});

/** Modules a code field may import from (see `code`) */
export type CodeModule = "@angular/core" | "minerva-design/charts/core";
/**
 * A state field initialized by code instead of a JSON value (generated
 * data, a timer): written as is in the displayed source and in the compiled
 * example (strict TypeScript; `this` is the example, whose earlier fields
 * are set). `imports` lists the names it uses from `@angular/core`
 * (`signal`, `inject`, `DestroyRef`...) and `minerva-design/charts/core`.
 */
export interface CodeField {
  $code: string;
  $imports?: Partial<Record<CodeModule, string[]>>;
}
export const isCodeField = (value: unknown): value is CodeField =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as CodeField).$code === "string";
const code = (
  source: string,
  imports?: Partial<Record<CodeModule, string[]>>,
): CodeField =>
  imports ? { $code: source, $imports: imports } : { $code: source };
/** Names a code field of an example imports from `module` */
export const codeImports = (
  example: Pick<AngularExample, "state">,
  module: CodeModule,
): string[] => [
  ...new Set(
    Object.values(example.state).flatMap((value) =>
      isCodeField(value) ? (value.$imports?.[module] ?? []) : [],
    ),
  ),
];
const round2 = (value: number) => Math.round(value * 100) / 100;
const DAYS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
  fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};
const HOURS = {
  en: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  zh: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  ja: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  fr: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
};
const candles = (count: number, base: number, drift: number) =>
  Array.from({ length: count }, (_, i) => {
    const open = base + drift * i + 8 * Math.sin(i / 4);
    const close = open + 4 * Math.sin(i * 1.9);
    return {
      x: i + 1,
      open: round2(open),
      y: round2(close),
      high: round2(Math.max(open, close) + 1.5),
      low: round2(Math.min(open, close) - 1.5),
    };
  });
const trendCandles = candles(24, 80, 0.8);
const cluster = (cx: number, cy: number, seed: number) =>
  Array.from({ length: 16 }, (_, i) => ({
    x: round2(cx + 6 * Math.sin(seed + i * 2.3)),
    y: round2(cy + 9 * Math.cos(seed + i * 1.7)),
  }));
const CORRELATION = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];
const HEAT_HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

Object.assign(angularExamples, {
  charts: [
    chart(
      "mixed-series",
      "Bars and a line",
      ["MnChart"],
      `@let t = labels[language()];
<mn-chart
  [series]="[
    { name: t.revenue, type: 'bar', data: revenue },
    { name: t.target, type: 'line', curve: 'smooth', data: target }
  ]"
  [xAxis]="{ type: 'category', categories: t.months }"
  [height]="300"
/>`,
      {
        revenue: [42, 51, 48, 63, 72, 80],
        target: [45, 50, 55, 60, 65, 70],
        labels: {
          en: { revenue: "Revenue", target: "Target", months: MONTHS.en },
          zh: { revenue: "收入", target: "目标", months: MONTHS.zh },
          ja: { revenue: "売上", target: "目標", months: MONTHS.ja },
          fr: {
            revenue: "Chiffre d'affaires",
            target: "Objectif",
            months: MONTHS.fr,
          },
        },
      },
    ),
    chart(
      "events",
      "Engine events",
      ["MnChart"],
      `@let t = labels[language()];
<mn-chart
  [series]="[{ name: t.latency, data: latency }]"
  [xAxis]="{ type: 'category', categories: t.hours }"
  crosshair
  [height]="260"
  (hover)="readout = $event ? $event.xLabel + ' · ' + $event.items[0]?.y : ''"
  (pointClick)="readout = t.clicked + ' — ' + $event.xLabel + ' · ' + $event.items[0]?.y"
/>
<output aria-live="polite">{{ readout || t.hint }}</output>`,
      {
        readout: "",
        latency: [42, 38, 65, 120, 96, 54],
        labels: {
          en: {
            latency: "Latency (ms)",
            hint: "Hover or click a point",
            clicked: "Clicked",
            hours: HOURS.en,
          },
          zh: {
            latency: "延迟（毫秒）",
            hint: "悬停或点击一个数据点",
            clicked: "已点击",
            hours: HOURS.zh,
          },
          ja: {
            latency: "レイテンシ（ms）",
            hint: "ポイントにカーソルを合わせるかクリックします",
            clicked: "クリック",
            hours: HOURS.ja,
          },
          fr: {
            latency: "Latence (ms)",
            hint: "Survolez ou cliquez sur un point",
            clicked: "Cliqué",
            hours: HOURS.fr,
          },
        },
      },
    ),
  ],
  "line-chart": [
    chart(
      "trend",
      "Weekly trend",
      ["MnLineChart"],
      `@let t = labels[language()];
<mn-line-chart
  [series]="[
    { name: t.thisWeek, data: thisWeek },
    { name: t.lastWeek, data: lastWeek }
  ]"
  curve="smooth"
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>`,
      {
        thisWeek: [820, 932, 901, 934, 1290, 1330, 1320],
        lastWeek: [620, 732, 701, 834, 1090, 1130, 1020],
        labels: {
          en: { thisWeek: "This week", lastWeek: "Last week", days: DAYS.en },
          zh: { thisWeek: "本周", lastWeek: "上周", days: DAYS.zh },
          ja: { thisWeek: "今週", lastWeek: "先週", days: DAYS.ja },
          fr: {
            thisWeek: "Cette semaine",
            lastWeek: "Semaine dernière",
            days: DAYS.fr,
          },
        },
      },
    ),
    chart(
      "reset-zoom",
      "Zoom and reset",
      ["MnLineChart", "MnButton"],
      `@let t = labels[language()];
<mn-line-chart
  #chart
  [series]="[{ name: t.sensor, data: sensor }]"
  crosshair
  [interaction]="{ zoom: 'x' }"
  [height]="260"
/>
<button mnButton variant="outline" size="small" (click)="chart.resetZoom()">{{ t.reset }}</button>`,
      {
        sensor: Array.from({ length: 120 }, (_, i) =>
          Math.round(50 + 30 * Math.sin(i / 10) + 10 * Math.sin(i / 2)),
        ),
        labels: {
          en: { sensor: "Sensor", reset: "Reset zoom" },
          zh: { sensor: "传感器", reset: "重置缩放" },
          ja: { sensor: "センサー", reset: "ズームをリセット" },
          fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
        },
      },
    ),
  ],
  "area-chart": [
    chart(
      "stacked",
      "Stacked areas",
      ["MnAreaChart"],
      `@let t = labels[language()];
<mn-area-chart
  [series]="[
    { name: t.organic, data: organic },
    { name: t.paid, data: paid },
    { name: t.referral, data: referral }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.months }"
  [height]="280"
/>`,
      {
        organic: [320, 332, 301, 334, 390, 430],
        paid: [120, 132, 101, 134, 190, 230],
        referral: [60, 72, 71, 74, 90, 110],
        labels: {
          en: {
            organic: "Organic",
            paid: "Paid",
            referral: "Referral",
            months: MONTHS.en,
          },
          zh: {
            organic: "自然流量",
            paid: "付费流量",
            referral: "推荐流量",
            months: MONTHS.zh,
          },
          ja: {
            organic: "オーガニック",
            paid: "有料",
            referral: "参照元",
            months: MONTHS.ja,
          },
          fr: {
            organic: "Naturel",
            paid: "Payant",
            referral: "Référents",
            months: MONTHS.fr,
          },
        },
      },
    ),
    chart(
      "percent",
      "100% stacked",
      ["MnAreaChart"],
      `@let t = labels[language()];
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
/>`,
      {
        solar: [0, 5, 40, 62, 35, 2],
        wind: [48, 52, 30, 22, 38, 55],
        hydro: [30, 30, 28, 26, 28, 30],
        labels: {
          en: { solar: "Solar", wind: "Wind", hydro: "Hydro", hours: HOURS.en },
          zh: { solar: "太阳能", wind: "风能", hydro: "水电", hours: HOURS.zh },
          ja: { solar: "太陽光", wind: "風力", hydro: "水力", hours: HOURS.ja },
          fr: {
            solar: "Solaire",
            wind: "Éolien",
            hydro: "Hydraulique",
            hours: HOURS.fr,
          },
        },
      },
    ),
  ],
  "bar-chart": [
    chart(
      "grouped",
      "Grouped bars with labels",
      ["MnBarChart"],
      `@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.lastYear, data: lastYear },
    { name: t.thisYear, data: thisYear }
  ]"
  labels
  [xAxis]="{ type: 'category', categories: t.regions }"
  [height]="280"
/>`,
      {
        lastYear: [38, 52, 61, 45],
        thisYear: [44, 58, 72, 49],
        labels: {
          en: {
            lastYear: "2024",
            thisYear: "2025",
            regions: ["North", "South", "East", "West"],
          },
          zh: {
            lastYear: "2024 年",
            thisYear: "2025 年",
            regions: ["华北", "华南", "华东", "西部"],
          },
          ja: {
            lastYear: "2024年",
            thisYear: "2025年",
            regions: ["北部", "南部", "東部", "西部"],
          },
          fr: {
            lastYear: "2024",
            thisYear: "2025",
            regions: ["Nord", "Sud", "Est", "Ouest"],
          },
        },
      },
    ),
    chart(
      "stacked",
      "Stacked bars",
      ["MnBarChart"],
      `@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.desktop, data: desktop },
    { name: t.mobile, data: mobile },
    { name: t.tablet, data: tablet }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>`,
      {
        desktop: [320, 302, 341, 374, 390, 210, 180],
        mobile: [420, 432, 401, 454, 490, 630, 610],
        tablet: [80, 72, 71, 84, 90, 130, 120],
        labels: {
          en: {
            desktop: "Desktop",
            mobile: "Mobile",
            tablet: "Tablet",
            days: DAYS.en,
          },
          zh: {
            desktop: "桌面端",
            mobile: "移动端",
            tablet: "平板",
            days: DAYS.zh,
          },
          ja: {
            desktop: "デスクトップ",
            mobile: "モバイル",
            tablet: "タブレット",
            days: DAYS.ja,
          },
          fr: {
            desktop: "Ordinateur",
            mobile: "Mobile",
            tablet: "Tablette",
            days: DAYS.fr,
          },
        },
      },
    ),
  ],
  "scatter-chart": [
    chart(
      "clusters",
      "Two clusters",
      ["MnScatterChart"],
      `@let t = labels[language()];
<mn-scatter-chart
  [series]="[
    { name: t.teamA, data: teamA },
    { name: t.teamB, data: teamB }
  ]"
  [xAxis]="{ title: t.hours }"
  [yAxis]="{ title: t.score }"
  [height]="300"
/>`,
      {
        teamA: cluster(12, 62, 1),
        teamB: cluster(26, 80, 4),
        labels: {
          en: {
            teamA: "Team A",
            teamB: "Team B",
            hours: "Hours",
            score: "Score",
          },
          zh: { teamA: "A 组", teamB: "B 组", hours: "小时", score: "得分" },
          ja: {
            teamA: "チームA",
            teamB: "チームB",
            hours: "時間",
            score: "スコア",
          },
          fr: {
            teamA: "Équipe A",
            teamB: "Équipe B",
            hours: "Heures",
            score: "Score",
          },
        },
      },
    ),
    chart(
      "point-click",
      "Clicked point",
      ["MnScatterChart"],
      `@let t = labels[language()];
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
<output aria-live="polite">{{ selected || t.hint }}</output>`,
      {
        selected: "",
        labels: {
          en: {
            cities: "Cities",
            density: "Density (k/km²)",
            rent: "Rent (€/m²)",
            hint: "Click a city",
            names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
          },
          zh: {
            cities: "城市",
            density: "人口密度（千人/km²）",
            rent: "租金（欧元/m²）",
            hint: "点击一个城市",
            names: ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"],
          },
          ja: {
            cities: "都市",
            density: "人口密度（千人/km²）",
            rent: "家賃（€/m²）",
            hint: "都市をクリックします",
            names: ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"],
          },
          fr: {
            cities: "Villes",
            density: "Densité (k/km²)",
            rent: "Loyer (€/m²)",
            hint: "Cliquez sur une ville",
            names: ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"],
          },
        },
      },
    ),
  ],
  "quadrant-chart": [
    chart(
      "priorities",
      "Priority matrix",
      ["MnQuadrantChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: {
            effort: "Effort",
            impact: "Impact",
            quickWins: "Quick wins",
            bigBets: "Big bets",
            fillIns: "Fill-ins",
            timeSinks: "Time sinks",
            features: [
              "Dark mode",
              "SSO",
              "Search",
              "Export",
              "Onboarding",
              "Billing",
            ],
          },
          zh: {
            effort: "投入",
            impact: "影响",
            quickWins: "速赢",
            bigBets: "重点投入",
            fillIns: "补充项",
            timeSinks: "低效项",
            features: [
              "深色模式",
              "单点登录",
              "搜索",
              "导出",
              "新手引导",
              "计费",
            ],
          },
          ja: {
            effort: "工数",
            impact: "効果",
            quickWins: "クイックウィン",
            bigBets: "大型施策",
            fillIns: "穴埋め",
            timeSinks: "時間の浪費",
            features: [
              "ダークモード",
              "SSO",
              "検索",
              "エクスポート",
              "オンボーディング",
              "課金",
            ],
          },
          fr: {
            effort: "Effort",
            impact: "Impact",
            quickWins: "Gains rapides",
            bigBets: "Paris majeurs",
            fillIns: "Bouche-trous",
            timeSinks: "Pertes de temps",
            features: [
              "Mode sombre",
              "SSO",
              "Recherche",
              "Export",
              "Accueil",
              "Facturation",
            ],
          },
        },
      },
    ),
    chart(
      "point-click",
      "Clicked task and quadrant",
      ["MnQuadrantChart"],
      `@let t = labels[language()];
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
<output aria-live="polite">{{ selected || t.hint }}</output>`,
      {
        selected: "",
        labels: {
          en: {
            urgency: "Urgency",
            importance: "Importance",
            hint: "Click a task or a quadrant",
            corners: {
              topLeft: "Do first",
              topRight: "Schedule",
              bottomLeft: "Delegate",
              bottomRight: "Eliminate",
            },
            tasks: ["Bug fix", "Roadmap", "Email", "Newsletter", "Interview"],
          },
          zh: {
            urgency: "紧急程度",
            importance: "重要程度",
            hint: "点击任务或象限",
            corners: {
              topLeft: "立即处理",
              topRight: "计划安排",
              bottomLeft: "委派他人",
              bottomRight: "放弃",
            },
            tasks: ["修复缺陷", "路线图", "邮件", "简报", "面试"],
          },
          ja: {
            urgency: "緊急度",
            importance: "重要度",
            hint: "タスクまたは象限をクリックします",
            corners: {
              topLeft: "すぐ実行",
              topRight: "計画",
              bottomLeft: "委任",
              bottomRight: "削除",
            },
            tasks: [
              "バグ修正",
              "ロードマップ",
              "メール",
              "ニュースレター",
              "面接",
            ],
          },
          fr: {
            urgency: "Urgence",
            importance: "Importance",
            hint: "Cliquez sur une tâche ou un quadrant",
            corners: {
              topLeft: "À faire",
              topRight: "À planifier",
              bottomLeft: "À déléguer",
              bottomRight: "À abandonner",
            },
            tasks: [
              "Correctif",
              "Feuille de route",
              "E-mails",
              "Newsletter",
              "Entretien",
            ],
          },
        },
      },
    ),
  ],
  "candlestick-chart": [
    chart(
      "ohlc",
      "Daily candles",
      ["MnCandlestickChart"],
      `@let t = labels[language()];
<mn-candlestick-chart
  [series]="[{ name: t.price, data: candles }]"
  [xAxis]="{ title: t.day }"
  [yAxis]="{ zero: false }"
  [height]="300"
/>`,
      {
        candles: candles(24, 100, 0),
        labels: {
          en: { price: "Price", day: "Day" },
          zh: { price: "价格", day: "天" },
          ja: { price: "価格", day: "日" },
          fr: { price: "Cours", day: "Jour" },
        },
      },
    ),
    chart(
      "moving-average",
      "Moving average overlay",
      ["MnCandlestickChart"],
      `@let t = labels[language()];
<mn-candlestick-chart
  [series]="[
    { name: t.price, data: candles },
    { name: t.average, type: 'line', curve: 'smooth', data: average }
  ]"
  [yAxis]="{ zero: false }"
  [height]="300"
/>`,
      {
        candles: trendCandles,
        average: trendCandles.map((candle, i) => {
          const window = trendCandles.slice(Math.max(0, i - 4), i + 1);
          return {
            x: candle.x,
            y: round2(window.reduce((sum, c) => sum + c.y, 0) / window.length),
          };
        }),
        labels: {
          en: { price: "Price", average: "5-day average" },
          zh: { price: "价格", average: "5 日均线" },
          ja: { price: "価格", average: "5日移動平均" },
          fr: { price: "Cours", average: "Moyenne 5 jours" },
        },
      },
    ),
  ],
  "heatmap-chart": [
    chart(
      "weekly-activity",
      "Weekly activity",
      ["MnHeatmapChart"],
      `@let t = labels[language()];
<mn-heatmap-chart
  [data]="cells[language()]"
  [xCategories]="hours"
  [yCategories]="t.rows"
  [name]="t.commits"
  [height]="300"
/>`,
      {
        hours: HEAT_HOURS,
        cells: Object.fromEntries(
          Object.entries(DAYS).map(([language, days]) => [
            language,
            days.flatMap((day, d) =>
              HEAT_HOURS.map((hour, h) => ({
                x: hour,
                y: day,
                value:
                  d < 5 && h > 1 && h < 5
                    ? 20 + ((d * 7 + h * 5) % 13)
                    : (d * 3 + h * 2) % 6,
              })),
            ),
          ]),
        ),
        labels: {
          en: { commits: "Commits", rows: [...DAYS.en].reverse() },
          zh: { commits: "提交数", rows: [...DAYS.zh].reverse() },
          ja: { commits: "コミット数", rows: [...DAYS.ja].reverse() },
          fr: { commits: "Commits", rows: [...DAYS.fr].reverse() },
        },
      },
    ),
    chart(
      "color-scale",
      "Diverging color scale",
      ["MnHeatmapChart"],
      `@let t = labels[language()];
<mn-heatmap-chart
  [data]="cells[language()]"
  [colorScale]="['#2563eb', '#f8fafc', '#dc2626']"
  [valueRange]="[-1, 1]"
  [name]="t.correlation"
  [radius]="4"
  [height]="320"
/>`,
      {
        cells: Object.fromEntries(
          (
            [
              ["en", ["Price", "Rating", "Delivery", "Returns", "Sales"]],
              ["zh", ["价格", "评分", "配送", "退货", "销量"]],
              ["ja", ["価格", "評価", "配送", "返品", "売上"]],
              ["fr", ["Prix", "Note", "Livraison", "Retours", "Ventes"]],
            ] as const
          ).map(([language, metrics]) => [
            language,
            CORRELATION.flatMap((row, r) =>
              row.map((value, c) => ({ x: metrics[c], y: metrics[r], value })),
            ),
          ]),
        ),
        labels: {
          en: { correlation: "Correlation" },
          zh: { correlation: "相关系数" },
          ja: { correlation: "相関係数" },
          fr: { correlation: "Corrélation" },
        },
      },
    ),
  ],
  sparkline: [
    chart(
      "kpi",
      "KPI cards",
      ["MnSparkline"],
      `@let t = labels[language()];
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
</div>`,
      {
        orders: [32, 41, 38, 52, 49, 61, 58, 70, 66, 74],
        revenue: [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9],
        signups: [12, 18, 9, 22, 30, 25, 19, 28, 33, 31],
        labels: {
          en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
          zh: { orders: "订单", revenue: "收入", signups: "注册" },
          ja: { orders: "注文", revenue: "売上", signups: "登録" },
          fr: {
            orders: "Commandes",
            revenue: "Chiffre d'affaires",
            signups: "Inscriptions",
          },
        },
      },
    ),
    chart(
      "reference",
      "Target line and hover",
      ["MnSparkline"],
      `@let t = labels[language()];
<mn-sparkline
  [data]="latency"
  [reference]="200"
  [name]="t.latency"
  [height]="64"
  (hover)="hovered = $event?.items?.[0]?.y ?? null"
/>
<output aria-live="polite">{{
  hovered === null ? t.hint : t.latency + ': ' + hovered + ' ms (' + t.target + ')'
}}</output>`,
      {
        hovered: null,
        latency: [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172],
        labels: {
          en: {
            latency: "p95 latency",
            target: "target 200 ms",
            hint: "Hover the line",
          },
          zh: {
            latency: "p95 延迟",
            target: "目标 200 毫秒",
            hint: "将指针悬停在折线上",
          },
          ja: {
            latency: "p95 レイテンシ",
            target: "目標 200 ms",
            hint: "線にカーソルを合わせます",
          },
          fr: {
            latency: "Latence p95",
            target: "objectif 200 ms",
            hint: "Survolez la courbe",
          },
        },
      },
    ),
  ],
  "pie-chart": [
    chart(
      "pie",
      "Traffic sources",
      ["MnPieChart"],
      `@let t = labels[language()];
<mn-pie-chart
  [data]="[
    { name: t[0], value: 1048 },
    { name: t[1], value: 735 },
    { name: t[2], value: 580 },
    { name: t[3], value: 484 },
    { name: t[4], value: 300 }
  ]"
  [height]="300"
/>`,
      {
        labels: {
          en: ["Search", "Direct", "Social", "Email", "Referral"],
          zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
          ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
          fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
        },
      },
    ),
    chart(
      "donut",
      "Donut with center texts",
      ["MnDonutChart"],
      `@let t = labels[language()];
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
<output aria-live="polite">{{ selected || t.hint }}</output>`,
      {
        selected: "",
        labels: {
          en: {
            total: "monthly revenue",
            hint: "Click a slice",
            plans: ["Free", "Starter", "Pro", "Enterprise"],
          },
          zh: {
            total: "月收入",
            hint: "点击一个扇区",
            plans: ["免费版", "入门版", "专业版", "企业版"],
          },
          ja: {
            total: "月間売上",
            hint: "スライスをクリックします",
            plans: ["無料", "スターター", "プロ", "エンタープライズ"],
          },
          fr: {
            total: "revenu mensuel",
            hint: "Cliquez sur une part",
            plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
          },
        },
      },
    ),
  ],
  "radar-chart": [
    chart(
      "compare",
      "Compare two series",
      ["MnRadarChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: {
            current: "Current model",
            next: "Next model",
            axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
          },
          zh: {
            current: "当前型号",
            next: "新型号",
            axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
          },
          ja: {
            current: "現行モデル",
            next: "次期モデル",
            axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
          },
          fr: {
            current: "Modèle actuel",
            next: "Nouveau modèle",
            axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
          },
        },
      },
    ),
    chart(
      "circle",
      "Circular grid",
      ["MnRadarChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: {
            profile: "Profile",
            skills: [
              "Frontend",
              "Backend",
              "Design",
              "Testing",
              "DevOps",
              "Data",
            ],
          },
          zh: {
            profile: "能力画像",
            skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
          },
          ja: {
            profile: "プロフィール",
            skills: [
              "フロントエンド",
              "バックエンド",
              "デザイン",
              "テスト",
              "DevOps",
              "データ",
            ],
          },
          fr: {
            profile: "Profil",
            skills: [
              "Front-end",
              "Back-end",
              "Design",
              "Tests",
              "DevOps",
              "Données",
            ],
          },
        },
      },
    ),
  ],
  "gauge-chart": [
    chart(
      "bands",
      "Colored bands",
      ["MnGaugeChart"],
      `<mn-gauge-chart
  [value]="72"
  [label]="labels[language()]"
  [bands]="[
    { to: 60, color: 'var(--success-color, #16a34a)' },
    { to: 85, color: 'var(--warning-color, #f59e0b)' },
    { to: 100, color: 'var(--danger-color, #dc2626)' }
  ]"
/>`,
      {
        labels: {
          en: "CPU load",
          zh: "CPU 负载",
          ja: "CPU 負荷",
          fr: "Charge CPU",
        },
      },
    ),
    chart(
      "needle",
      "Needle and custom scale",
      ["MnGaugeChart"],
      `<mn-gauge-chart
  [value]="128"
  [max]="200"
  [label]="labels[language()]"
  needle
  [sweep]="270"
  [thickness]="0.1"
  [height]="260"
/>`,
      {
        labels: {
          en: "Speed (km/h)",
          zh: "速度（公里/小时）",
          ja: "速度（km/h）",
          fr: "Vitesse (km/h)",
        },
      },
    ),
  ],
  "funnel-chart": [
    chart(
      "conversion",
      "Conversion funnel",
      ["MnFunnelChart"],
      `@let t = labels[language()];
<mn-funnel-chart
  [data]="[
    { name: t[0], value: 12000 },
    { name: t[1], value: 4800 },
    { name: t[2], value: 2100 },
    { name: t[3], value: 860 }
  ]"
  [height]="300"
/>`,
      {
        labels: {
          en: ["Visits", "Sign-ups", "Trials", "Purchases"],
          zh: ["访问", "注册", "试用", "购买"],
          ja: ["訪問", "登録", "トライアル", "購入"],
          fr: ["Visites", "Inscriptions", "Essais", "Achats"],
        },
      },
    ),
    chart(
      "bars",
      "Sorted bars",
      ["MnFunnelChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
          zh: ["面试", "申请", "录用通知", "筛选", "入职"],
          ja: ["面接", "応募", "内定", "書類選考", "採用"],
          fr: [
            "Entretiens",
            "Candidatures",
            "Offres",
            "Présélections",
            "Embauches",
          ],
        },
      },
    ),
  ],
  "treemap-chart": [
    chart(
      "nested",
      "Nested nodes",
      ["MnTreemapChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: {
            media: "Media",
            documents: "Documents",
            apps: "Apps",
            photos: "Photos",
            videos: "Videos",
            music: "Music",
            work: "Work",
            personal: "Personal",
            tools: "Tools",
            games: "Games",
          },
          zh: {
            media: "媒体",
            documents: "文档",
            apps: "应用",
            photos: "照片",
            videos: "视频",
            music: "音乐",
            work: "工作",
            personal: "个人",
            tools: "工具",
            games: "游戏",
          },
          ja: {
            media: "メディア",
            documents: "書類",
            apps: "アプリ",
            photos: "写真",
            videos: "動画",
            music: "音楽",
            work: "仕事",
            personal: "個人",
            tools: "ツール",
            games: "ゲーム",
          },
          fr: {
            media: "Médias",
            documents: "Documents",
            apps: "Applications",
            photos: "Photos",
            videos: "Vidéos",
            music: "Musique",
            work: "Travail",
            personal: "Personnel",
            tools: "Outils",
            games: "Jeux",
          },
        },
      },
    ),
    chart(
      "flat",
      "Flat list",
      ["MnTreemapChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: [
            "Asia",
            "Europe",
            "North America",
            "South America",
            "Africa",
            "Oceania",
          ],
          zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
          ja: [
            "アジア",
            "ヨーロッパ",
            "北米",
            "南米",
            "アフリカ",
            "オセアニア",
          ],
          fr: [
            "Asie",
            "Europe",
            "Amérique du Nord",
            "Amérique du Sud",
            "Afrique",
            "Océanie",
          ],
        },
      },
    ),
  ],
});

// The extended chart set (statistics, hierarchies, finance, 3D, large data):
// same demo ids as the Web Component demos of each page.
Object.assign(angularExamples, {
  "horizontal-bar-chart": [
    chart(
      "ranking",
      "Most visited pages",
      ["MnHorizontalBarChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: {
            views: "Page views",
            pages: [
              "Home",
              "Pricing",
              "Documentation",
              "Blog",
              "Careers",
              "Contact",
            ],
          },
          zh: {
            views: "浏览量",
            pages: ["首页", "价格", "文档", "博客", "招聘", "联系我们"],
          },
          ja: {
            views: "ページビュー",
            pages: [
              "ホーム",
              "料金",
              "ドキュメント",
              "ブログ",
              "採用情報",
              "お問い合わせ",
            ],
          },
          fr: {
            views: "Pages vues",
            pages: [
              "Accueil",
              "Tarifs",
              "Documentation",
              "Blog",
              "Carrières",
              "Contact",
            ],
          },
        },
      },
    ),
    chart(
      "survey",
      "Survey answers, 100 % stacked",
      ["MnHorizontalBarChart"],
      `@let t = labels[language()];
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
/>`,
      {
        answerColors: [
          "var(--success-color, #16a34a)",
          "var(--text-secondary-color, #9ca3af)",
          "var(--danger-color, #dc2626)",
        ],
        labels: {
          en: {
            answers: ["Agree", "Neutral", "Disagree"],
            questions: [
              "Easy to set up",
              "Good documentation",
              "Fast enough",
              "Would recommend",
            ],
          },
          zh: {
            answers: ["同意", "中立", "不同意"],
            questions: ["易于上手", "文档完善", "速度够快", "愿意推荐"],
          },
          ja: {
            answers: ["そう思う", "どちらでもない", "そう思わない"],
            questions: [
              "導入が簡単",
              "ドキュメントが充実",
              "十分に速い",
              "人に勧めたい",
            ],
          },
          fr: {
            answers: ["D’accord", "Neutre", "Pas d’accord"],
            questions: [
              "Facile à installer",
              "Bonne documentation",
              "Assez rapide",
              "Je recommande",
            ],
          },
        },
      },
    ),
  ],
  "range-area-chart": [
    chart(
      "forecast",
      "Forecast with an uncertainty band",
      ["MnRangeAreaChart"],
      `@let t = labels[language()];
@let m = months[language()];
<mn-range-area-chart
  [series]="[
    { name: t.band, data: [{ x: m[5], y0: 158, y: 158 }, { x: m[6], y0: 159, y: 167 }, { x: m[7], y0: 161, y: 177 }, { x: m[8], y0: 160, y: 184 }, { x: m[9], y0: 162, y: 194 }, { x: m[10], y0: 165, y: 205 }, { x: m[11], y0: 166, y: 214 }] },
    { name: t.actual, type: 'line', data: [{ x: m[0], y: 120 }, { x: m[1], y: 132 }, { x: m[2], y: 128 }, { x: m[3], y: 141 }, { x: m[4], y: 150 }, { x: m[5], y: 158 }] },
    { name: t.forecast, type: 'line', lineWidth: 1, data: [{ x: m[5], y: 158 }, { x: m[6], y: 163 }, { x: m[7], y: 169 }, { x: m[8], y: 172 }, { x: m[9], y: 178 }, { x: m[10], y: 185 }, { x: m[11], y: 190 }] }
  ]"
  [xAxis]="{ type: 'category', categories: m }"
  [height]="300"
/>`,
      {
        labels: {
          en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
          zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
          ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
          fr: {
            actual: "Réel",
            forecast: "Prévision",
            band: "Intervalle à 80 %",
          },
        },
        months: {
          en: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          zh: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          ja: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          fr: [
            "janv.",
            "févr.",
            "mars",
            "avr.",
            "mai",
            "juin",
            "juil.",
            "août",
            "sept.",
            "oct.",
            "nov.",
            "déc.",
          ],
        },
      },
    ),
    chart(
      "temperature",
      "Daily temperature range",
      ["MnRangeAreaChart"],
      `@let t = labels[language()];
@let d = days[language()];
<mn-range-area-chart
  [series]="[
    { name: t.range, data: [{ x: d[0], y0: 8, y: 16 }, { x: d[1], y0: 9, y: 18 }, { x: d[2], y0: 7, y: 15 }, { x: d[3], y0: 11, y: 21 }, { x: d[4], y0: 13, y: 24 }, { x: d[5], y0: 12, y: 22 }, { x: d[6], y0: 10, y: 19 }] },
    { name: t.mean, type: 'line', data: [{ x: d[0], y: 12 }, { x: d[1], y: 13.5 }, { x: d[2], y: 11 }, { x: d[3], y: 16 }, { x: d[4], y: 18.5 }, { x: d[5], y: 17 }, { x: d[6], y: 14.5 }] }
  ]"
  curve="linear"
  [xAxis]="{ type: 'category' }"
  [height]="280"
/>`,
      {
        labels: {
          en: { range: "Min – max", mean: "Average" },
          zh: { range: "最低 – 最高", mean: "平均" },
          ja: { range: "最低 – 最高", mean: "平均" },
          fr: { range: "Min – max", mean: "Moyenne" },
        },
        days: {
          en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          ja: ["月", "火", "水", "木", "金", "土", "日"],
          fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
        },
      },
    ),
  ],
  "mixed-chart": [
    chart(
      "revenue-growth",
      "Revenue and growth on two axes",
      ["MnMixedChart"],
      `@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.revenue, type: 'bar', data: [{ x: m[0], y: 182 }, { x: m[1], y: 196 }, { x: m[2], y: 214 }, { x: m[3], y: 205 }, { x: m[4], y: 238 }, { x: m[5], y: 261 }] },
    { name: t.growth, type: 'line', curve: 'smooth', yAxis: 'right', data: [{ x: m[0], y: 0 }, { x: m[1], y: 7.7 }, { x: m[2], y: 9.2 }, { x: m[3], y: -4.2 }, { x: m[4], y: 16.1 }, { x: m[5], y: 9.7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [height]="300"
/>`,
      {
        labels: {
          en: { revenue: "Revenue (k€)", growth: "Growth" },
          zh: { revenue: "收入（千欧元）", growth: "增长率" },
          ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
          fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
        },
        months: {
          en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
          ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
          fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
        },
      },
    ),
    chart(
      "climate",
      "Climate chart",
      ["MnMixedChart"],
      `@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.rain, type: 'bar', color: 'var(--chart-series-2, #0ea5e9)', data: [{ x: m[0], y: 52 }, { x: m[1], y: 41 }, { x: m[2], y: 48 }, { x: m[3], y: 55 }, { x: m[4], y: 68 }, { x: m[5], y: 71 }, { x: m[6], y: 64 }, { x: m[7], y: 62 }, { x: m[8], y: 55 }, { x: m[9], y: 64 }, { x: m[10], y: 63 }, { x: m[11], y: 60 }] },
    { name: t.temperature, type: 'line', curve: 'smooth', yAxis: 'right', color: 'var(--chart-series-4, #ef4444)', data: [{ x: m[0], y: 3.5 }, { x: m[1], y: 4.2 }, { x: m[2], y: 7.6 }, { x: m[3], y: 10.7 }, { x: m[4], y: 14.5 }, { x: m[5], y: 17.6 }, { x: m[6], y: 19.8 }, { x: m[7], y: 19.6 }, { x: m[8], y: 16.4 }, { x: m[9], y: 12.3 }, { x: m[10], y: 7.6 }, { x: m[11], y: 4.4 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  crosshair
  [height]="300"
/>`,
      {
        labels: {
          en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
          zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
          ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
          fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
        },
        months: {
          en: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          zh: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          ja: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          fr: [
            "janv.",
            "févr.",
            "mars",
            "avr.",
            "mai",
            "juin",
            "juil.",
            "août",
            "sept.",
            "oct.",
            "nov.",
            "déc.",
          ],
        },
      },
    ),
  ],
  "bubble-chart": [
    chart(
      "countries",
      "Wealth, health and population",
      ["MnBubbleChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: {
            gdp: "GDP per capita (k$)",
            life: "Life expectancy",
            names: [
              "Japan",
              "France",
              "China",
              "Brazil",
              "India",
              "Nigeria",
              "Germany",
              "Mexico",
            ],
          },
          zh: {
            gdp: "人均 GDP（千美元）",
            life: "预期寿命",
            names: [
              "日本",
              "法国",
              "中国",
              "巴西",
              "印度",
              "尼日利亚",
              "德国",
              "墨西哥",
            ],
          },
          ja: {
            gdp: "1 人あたり GDP（千ドル）",
            life: "平均寿命",
            names: [
              "日本",
              "フランス",
              "中国",
              "ブラジル",
              "インド",
              "ナイジェリア",
              "ドイツ",
              "メキシコ",
            ],
          },
          fr: {
            gdp: "PIB par habitant (k$)",
            life: "Espérance de vie",
            names: [
              "Japon",
              "France",
              "Chine",
              "Brésil",
              "Inde",
              "Nigeria",
              "Allemagne",
              "Mexique",
            ],
          },
        },
      },
    ),
    chart(
      "portfolio",
      "Portfolio risk and return",
      ["MnBubbleChart"],
      `@let t = labels[language()];
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
<output aria-live="polite">{{ selected || t.hint }}</output>`,
      {
        selected: "",
        labels: {
          en: {
            risk: "Risk (volatility %)",
            return: "Expected return %",
            hint: "Click a bubble",
            assets: [
              "Bonds",
              "Index fund",
              "Real estate",
              "Tech stocks",
              "Gold",
              "Start-ups",
            ],
          },
          zh: {
            risk: "风险（波动率 %）",
            return: "预期收益 %",
            hint: "点击一个气泡",
            assets: [
              "债券",
              "指数基金",
              "房地产",
              "科技股",
              "黄金",
              "初创企业",
            ],
          },
          ja: {
            risk: "リスク（ボラティリティ %）",
            return: "期待リターン %",
            hint: "バブルをクリックします",
            assets: [
              "債券",
              "インデックスファンド",
              "不動産",
              "ハイテク株",
              "金",
              "スタートアップ",
            ],
          },
          fr: {
            risk: "Risque (volatilité %)",
            return: "Rendement attendu %",
            hint: "Cliquez sur une bulle",
            assets: [
              "Obligations",
              "Fonds indiciel",
              "Immobilier",
              "Actions tech",
              "Or",
              "Start-up",
            ],
          },
        },
      },
    ),
  ],
  "histogram-chart": [
    chart(
      "latency",
      "Response time distribution",
      ["MnHistogramChart"],
      `@let t = labels[language()];
<mn-histogram-chart
  [values]="latency"
  [name]="t.requests"
  [xAxis]="{ title: t.ms }"
  [height]="300"
/>`,
      {
        // 5,000 response times (ms), log-normal around 120 ms
        latency: code(
          "Array.from({ length: 5000 }, (_, i) => Math.round(Math.exp(4.8 + 0.35 * Math.sqrt(-2 * Math.log(1 - (Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1))) * Math.cos(2 * Math.PI * (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1)))))",
        ),
        labels: {
          en: { requests: "Requests", ms: "Response time (ms)" },
          zh: { requests: "请求数", ms: "响应时间（毫秒）" },
          ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
          fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
        },
      },
    ),
    chart(
      "binning",
      "Binning rules",
      ["MnHistogramChart"],
      `@let t = labels[language()];
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
/>`,
      {
        bins: "sturges",
        // ages of 2,000 customers: two groups (students, parents)
        ages: code(
          "Array.from({ length: 2000 }, (_, i) => Math.round((i % 3 ? 42 : 22) + ((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) - 1) * (i % 3 ? 16 : 6)))",
        ),
        labels: {
          en: { count: "Count", bins: "Bins:", age: "Age" },
          zh: { count: "人数", bins: "分箱：", age: "年龄" },
          ja: { count: "人数", bins: "ビン：", age: "年齢" },
          fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
        },
      },
    ),
  ],
  "boxplot-chart": [
    chart(
      "services",
      "Response times per service",
      ["MnBoxPlotChart"],
      `@let t = labels[language()];
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
/>`,
      {
        samples: [
          [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
          [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
          [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
          [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
        ],
        labels: {
          en: {
            time: "Response time (ms)",
            services: ["Search", "Checkout", "Profile", "Images"],
          },
          zh: {
            time: "响应时间（毫秒）",
            services: ["搜索", "结账", "个人资料", "图片"],
          },
          ja: {
            time: "応答時間（ms）",
            services: ["検索", "決済", "プロフィール", "画像"],
          },
          fr: {
            time: "Temps de réponse (ms)",
            services: ["Recherche", "Paiement", "Profil", "Images"],
          },
        },
      },
    ),
    chart(
      "horizontal",
      "Horizontal boxes, min-max whiskers",
      ["MnBoxPlotChart"],
      `@let t = labels[language()];
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
/>`,
      {
        scores: [
          [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
          [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
          [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
        ],
        labels: {
          en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
          zh: { score: "分数", classes: ["一班", "二班", "三班"] },
          ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
          fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
        },
      },
    ),
  ],
  "waterfall-chart": [
    chart(
      "pnl",
      "Profit and loss bridge",
      ["MnWaterfallChart"],
      `@let s = steps[language()];
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
/>`,
      {
        steps: {
          en: [
            "Revenue",
            "Cost of sales",
            "Gross profit",
            "Operating costs",
            "Other income",
            "Taxes",
            "Net income",
          ],
          zh: [
            "营业收入",
            "销售成本",
            "毛利润",
            "运营费用",
            "其他收入",
            "税费",
            "净利润",
          ],
          ja: [
            "売上高",
            "売上原価",
            "売上総利益",
            "営業費用",
            "その他収益",
            "税金",
            "純利益",
          ],
          fr: [
            "Chiffre d’affaires",
            "Coût des ventes",
            "Marge brute",
            "Charges d’exploitation",
            "Autres produits",
            "Impôts",
            "Résultat net",
          ],
        },
      },
    ),
    chart(
      "cash-flow",
      "Cash flow from an opening balance",
      ["MnWaterfallChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: { opening: "Opening", closing: "Closing" },
          zh: { opening: "期初", closing: "期末" },
          ja: { opening: "期首", closing: "期末" },
          fr: { opening: "Ouverture", closing: "Clôture" },
        },
        months: {
          en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
          ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
          fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
        },
      },
    ),
  ],
  "gantt-chart": [
    chart(
      "project",
      "Project plan by phase",
      ["MnGanttChart"],
      `@let t = labels[language()];
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
/>`,
      {
        day: 86400000,
        // 2026-03-02, UTC
        start: 1772409600000,
        labels: {
          en: {
            phases: ["Design", "Build", "Launch"],
            tasks: [
              "Research",
              "Wireframes",
              "Visual design",
              "Frontend",
              "Backend",
              "Testing",
              "Release",
            ],
            progress: "Progress",
            milestones: "Milestones",
          },
          zh: {
            phases: ["设计", "开发", "发布"],
            tasks: [
              "用户调研",
              "线框图",
              "视觉设计",
              "前端",
              "后端",
              "测试",
              "上线",
            ],
            progress: "进度",
            milestones: "里程碑",
          },
          ja: {
            phases: ["設計", "開発", "リリース"],
            tasks: [
              "リサーチ",
              "ワイヤーフレーム",
              "ビジュアルデザイン",
              "フロントエンド",
              "バックエンド",
              "テスト",
              "公開",
            ],
            progress: "進捗",
            milestones: "マイルストーン",
          },
          fr: {
            phases: ["Conception", "Développement", "Lancement"],
            tasks: [
              "Recherche",
              "Maquettes",
              "Design visuel",
              "Front-end",
              "Back-end",
              "Tests",
              "Mise en ligne",
            ],
            progress: "Avancement",
            milestones: "Jalons",
          },
        },
      },
    ),
    chart(
      "sprint",
      "Sprint with a today line",
      ["MnGanttChart"],
      `@let t = labels[language()];
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
/>`,
      {
        day: 86400000,
        // 2026-10-19, UTC
        start: 1792368000000,
        labels: {
          en: {
            tasks: [
              "Login page",
              "Password reset",
              "Email templates",
              "Audit log",
              "Release notes",
            ],
            today: "Today",
          },
          zh: {
            tasks: ["登录页", "重置密码", "邮件模板", "审计日志", "发布说明"],
            today: "今天",
          },
          ja: {
            tasks: [
              "ログイン画面",
              "パスワード再設定",
              "メールテンプレート",
              "監査ログ",
              "リリースノート",
            ],
            today: "今日",
          },
          fr: {
            tasks: [
              "Page de connexion",
              "Mot de passe oublié",
              "Modèles d’e-mail",
              "Journal d’audit",
              "Notes de version",
            ],
            today: "Aujourd’hui",
          },
        },
      },
    ),
  ],
  "calendar-heatmap": [
    chart(
      "contributions",
      "A year of contributions",
      ["MnCalendarHeatmap"],
      `@let t = labels[language()];
<mn-calendar-heatmap [data]="days" [range]="2025" [locale]="t.locale" />`,
      {
        // one value per day of 2025, busier on weekdays
        days: code(
          "Array.from({ length: 365 }, (_, i) => ({ date: Date.UTC(2025, 0, 1 + i), value: Math.floor((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) * (i % 7 < 5 ? 9 : 3)) }))",
        ),
        labels: {
          en: { locale: "en-US", unit: "contributions" },
          zh: { locale: "zh-CN", unit: "次贡献" },
          ja: { locale: "ja-JP", unit: "件のコントリビューション" },
          fr: { locale: "fr-FR", unit: "contributions" },
        },
      },
    ),
    chart(
      "months",
      "Monthly calendars",
      ["MnCalendarHeatmap"],
      `@let t = labels[language()];
<mn-calendar-heatmap
  [data]="steps"
  [range]="['2026-01-01', '2026-06-30']"
  layout="months"
  [levels]="5"
  [thresholds]="[4000, 6000, 8000, 10000]"
  color="var(--success-color, #16a34a)"
  [locale]="t.locale"
  [height]="420"
/>`,
      {
        // steps walked every day of the first half of 2026
        steps: code(
          "Array.from({ length: 181 }, (_, i) => ({ date: Date.UTC(2026, 0, 1 + i), value: Math.round(3000 + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) * 9000) }))",
        ),
        labels: {
          en: { locale: "en-US" },
          zh: { locale: "zh-CN" },
          ja: { locale: "ja-JP" },
          fr: { locale: "fr-FR" },
        },
      },
    ),
  ],
  "radial-bar-chart": [
    chart(
      "activity",
      "Activity rings",
      ["MnRadialBarChart"],
      `@let t = labels[language()];
<mn-radial-bar-chart
  [data]="[
    { name: t.rings[0], value: 420, max: 500, color: '#ef4444' },
    { name: t.rings[1], value: 24, max: 30, color: '#22c55e' },
    { name: t.rings[2], value: 9, max: 12, color: '#06b6d4' }
  ]"
  [sweep]="360"
  centerValue="78 %"
  [centerLabel]="t.today"
/>`,
      {
        labels: {
          en: {
            rings: ["Move", "Exercise", "Stand"],
            today: "of today’s goals",
          },
          zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
          ja: {
            rings: ["ムーブ", "エクササイズ", "スタンド"],
            today: "今日の目標",
          },
          fr: {
            rings: ["Bouger", "M’entraîner", "Me lever"],
            today: "des objectifs du jour",
          },
        },
      },
    ),
    chart(
      "okr",
      "Key results completion",
      ["MnRadialBarChart"],
      `@let n = names[language()];
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
/>`,
      {
        names: {
          en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
          zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
          ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
          fr: [
            "Chiffre d’affaires",
            "Nouveaux clients",
            "Rétention",
            "NPS",
            "Recrutement",
          ],
        },
      },
    ),
  ],
  "bullet-chart": [
    chart(
      "kpis",
      "KPIs against targets",
      ["MnBulletChart"],
      `@let t = labels[language()];
<mn-bullet-chart
  [data]="[
    { name: t.kpis[0], value: 270, target: 250, ranges: [150, 225, 300] },
    { name: t.kpis[1], value: 22.5, target: 26, ranges: [20, 25, 30] },
    { name: t.kpis[2], value: 1650, target: 2100, ranges: [1000, 2000, 2500] },
    { name: t.kpis[3], value: 4.4, target: 4.5, ranges: [3.5, 4.25, 5] }
  ]"
  [rangeLabels]="t.ranges"
/>`,
      {
        labels: {
          en: {
            kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
            ranges: ["Poor", "Fair", "Good"],
          },
          zh: {
            kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
            ranges: ["差", "一般", "良好"],
          },
          ja: {
            kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
            ranges: ["不良", "普通", "良好"],
          },
          fr: {
            kpis: [
              "Chiffre d’affaires (k€)",
              "Marge (%)",
              "Commandes",
              "Satisfaction",
            ],
            ranges: ["Faible", "Correct", "Bon"],
          },
        },
      },
    ),
    chart(
      "vertical",
      "Vertical columns",
      ["MnBulletChart"],
      `@let q = quarters[language()];
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
/>`,
      {
        quarters: {
          en: ["Q1", "Q2", "Q3", "Q4"],
          zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
          ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
          fr: ["T1", "T2", "T3", "T4"],
        },
      },
    ),
  ],
  "sunburst-chart": [
    chart(
      "disk-usage",
      "Disk usage",
      ["MnSunburstChart"],
      `@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.folders[0], children: [{ name: t.files[0], value: 12 }, { name: t.files[1], value: 3 }] },
    { name: t.folders[1], children: [{ name: t.files[2], value: 46 }, { name: t.files[3], value: 21 }] },
    { name: t.folders[2], children: [{ name: t.files[4], value: 18 }, { name: t.files[5], value: 7 }] },
    { name: t.folders[3], children: [{ name: t.files[6], value: 9 }, { name: t.files[7], value: 32 }] }
  ]"
/>`,
      {
        labels: {
          en: {
            folders: ["Documents", "Photos", "Music", "Apps"],
            files: [
              "Work",
              "Taxes",
              "2025",
              "2026",
              "Albums",
              "Podcasts",
              "Tools",
              "Games",
            ],
          },
          zh: {
            folders: ["文档", "照片", "音乐", "应用"],
            files: [
              "工作",
              "税务",
              "2025",
              "2026",
              "专辑",
              "播客",
              "工具",
              "游戏",
            ],
          },
          ja: {
            folders: ["書類", "写真", "ミュージック", "アプリ"],
            files: [
              "仕事",
              "税金",
              "2025",
              "2026",
              "アルバム",
              "ポッドキャスト",
              "ツール",
              "ゲーム",
            ],
          },
          fr: {
            folders: ["Documents", "Photos", "Musique", "Applications"],
            files: [
              "Travail",
              "Impôts",
              "2025",
              "2026",
              "Albums",
              "Podcasts",
              "Outils",
              "Jeux",
            ],
          },
        },
      },
    ),
    chart(
      "drill-down",
      "Drill-down breadcrumb",
      ["MnSunburstChart"],
      `@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.teams[0], children: [{ name: t.groups[0], value: 18 }, { name: t.groups[1], value: 11 }, { name: t.groups[2], value: 14 }] },
    { name: t.teams[1], children: [{ name: t.groups[3], value: 16 }, { name: t.groups[4], value: 12 }] },
    { name: t.teams[2], children: [{ name: t.groups[5], value: 20 }, { name: t.groups[6], value: 8 }] }
  ]"
  [innerRadius]="0.32"
  (drillChange)="path = $event.path"
/>
<output aria-live="polite">{{ t.root }}@for (name of path; track $index) { › {{ name }} }</output>`,
      {
        path: [],
        labels: {
          en: {
            root: "Company",
            teams: ["Engineering", "Sales", "Support"],
            groups: [
              "Web",
              "Mobile",
              "Platform",
              "Europe",
              "Asia",
              "Tier 1",
              "Tier 2",
            ],
            hint: "Click a team",
          },
          zh: {
            root: "公司",
            teams: ["研发", "销售", "客服"],
            groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
            hint: "点击一个团队",
          },
          ja: {
            root: "会社",
            teams: ["エンジニアリング", "営業", "サポート"],
            groups: [
              "Web",
              "モバイル",
              "プラットフォーム",
              "ヨーロッパ",
              "アジア",
              "一次対応",
              "二次対応",
            ],
            hint: "チームをクリックします",
          },
          fr: {
            root: "Entreprise",
            teams: ["Ingénierie", "Ventes", "Support"],
            groups: [
              "Web",
              "Mobile",
              "Plateforme",
              "Europe",
              "Asie",
              "Niveau 1",
              "Niveau 2",
            ],
            hint: "Cliquez sur une équipe",
          },
        },
      },
    ),
  ],
  "sankey-chart": [
    chart(
      "energy",
      "Energy flows",
      ["MnSankeyChart"],
      `@let n = names[language()];
<mn-sankey-chart
  [nodes]="[{ name: n[0] }, { name: n[1] }, { name: n[2] }, { name: n[3] }, { name: n[4] }, { name: n[5] }, { name: n[6] }, { name: n[7] }]"
  [links]="links"
/>`,
      {
        links: [
          { source: 0, target: 3, value: 32 },
          { source: 1, target: 3, value: 48 },
          { source: 2, target: 3, value: 70 },
          { source: 3, target: 4, value: 52 },
          { source: 3, target: 5, value: 61 },
          { source: 3, target: 6, value: 22 },
          { source: 3, target: 7, value: 15 },
        ],
        names: {
          en: [
            "Solar",
            "Wind",
            "Gas",
            "Grid",
            "Homes",
            "Industry",
            "Transport",
            "Losses",
          ],
          zh: [
            "太阳能",
            "风能",
            "天然气",
            "电网",
            "居民",
            "工业",
            "交通",
            "损耗",
          ],
          ja: [
            "太陽光",
            "風力",
            "ガス",
            "送電網",
            "家庭",
            "産業",
            "運輸",
            "損失",
          ],
          fr: [
            "Solaire",
            "Éolien",
            "Gaz",
            "Réseau",
            "Foyers",
            "Industrie",
            "Transports",
            "Pertes",
          ],
        },
      },
    ),
    chart(
      "journey",
      "User journey with drop-offs",
      ["MnSankeyChart"],
      `@let s = steps[language()];
<mn-sankey-chart
  [nodes]="[{ name: s[0] }, { name: s[1] }, { name: s[2] }, { name: s[3] }, { name: s[4] }, { name: s[5], color: 'var(--text-secondary-color, #9ca3af)' }]"
  [links]="links"
  align="left"
  linkColor="source"
/>`,
      {
        links: [
          { source: 0, target: 1, value: 420 },
          { source: 0, target: 2, value: 310 },
          { source: 0, target: 5, value: 270 },
          { source: 1, target: 2, value: 330 },
          { source: 1, target: 5, value: 90 },
          { source: 2, target: 3, value: 380 },
          { source: 2, target: 5, value: 260 },
          { source: 3, target: 4, value: 240 },
          { source: 3, target: 5, value: 140 },
        ],
        steps: {
          en: [
            "Home page",
            "Search",
            "Product page",
            "Cart",
            "Checkout",
            "Left",
          ],
          zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
          ja: [
            "トップページ",
            "検索",
            "商品ページ",
            "カート",
            "購入手続き",
            "離脱",
          ],
          fr: [
            "Accueil",
            "Recherche",
            "Fiche produit",
            "Panier",
            "Paiement",
            "Départ",
          ],
        },
      },
    ),
  ],
  "trading-chart": [
    chart(
      "candles",
      "Candles, moving averages and panes",
      ["MnTradingChart"],
      `@let t = labels[language()];
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
/>`,
      {
        // 240 daily bars: a random walk, generated deterministically
        bars: code(`(() => {
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
        })()`),
        labels: {
          en: { watermark: "ACME · 1D" },
          zh: { watermark: "ACME · 日线" },
          ja: { watermark: "ACME · 日足" },
          fr: { watermark: "ACME · 1 J" },
        },
      },
    ),
    chart(
      "streaming",
      "Real-time streaming",
      ["MnTradingChart"],
      `@let t = labels[language()];
<mn-trading-chart
  [bars]="bars()"
  symbol="ACME"
  timeframe="1m"
  [indicators]="[{ type: 'ema', period: 9 }, { type: 'volume' }]"
  [options]="{ countdown: true, watermark: t.watermark }"
  [height]="400"
/>`,
      {
        // one-minute bars; every 500 ms a tick moves the last close, every
        // 10th tick opens a bar (a component can also call update(bar))
        bars: code(
          `(() => {
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
})()`,
          { "@angular/core": ["DestroyRef", "inject", "signal"] },
        ),
        labels: {
          en: { watermark: "ACME · 1m · live" },
          zh: { watermark: "ACME · 1 分钟 · 实时" },
          ja: { watermark: "ACME · 1 分足 · ライブ" },
          fr: { watermark: "ACME · 1 min · direct" },
        },
      },
    ),
  ],
  "technical-indicators": [
    chart(
      "bollinger",
      "Bollinger bands from the pure functions",
      ["MnRangeAreaChart"],
      `@let t = labels[language()];
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
/>`,
      {
        // 200 daily closes and their indicators (bollinger, ema: pure
        // functions of minerva-design/charts/core)
        indicators: code(
          `(() => {
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
})()`,
          { "minerva-design/charts/core": ["bollinger", "ema"] },
        ),
        labels: {
          en: {
            close: "Close",
            band: "Bollinger (20, 2)",
            middle: "SMA 20",
            slow: "EMA 50",
          },
          zh: {
            close: "收盘价",
            band: "布林带 (20, 2)",
            middle: "SMA 20",
            slow: "EMA 50",
          },
          ja: {
            close: "終値",
            band: "ボリンジャーバンド (20, 2)",
            middle: "SMA 20",
            slow: "EMA 50",
          },
          fr: {
            close: "Clôture",
            band: "Bollinger (20, 2)",
            middle: "MMS 20",
            slow: "MME 50",
          },
        },
      },
    ),
    chart(
      "panes",
      "Indicator panes",
      ["MnTradingChart"],
      `@let t = labels[language()];
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
<output aria-live="polite">{{ t.macd }}: {{ last.macd }} / {{ last.signal }}</output>`,
      {
        // 240 daily bars: a random walk, generated deterministically
        bars: code(`(() => {
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
        })()`),
        // the last MACD values, from the pure macd() of minerva-design/charts/core
        last: code(
          `(() => {
  const result = macd(this.bars.map((bar) => bar.close));
  const end = this.bars.length - 1;
  return {
    macd: result.macd[end].toFixed(2),
    signal: result.signal[end].toFixed(2),
  };
})()`,
          { "minerva-design/charts/core": ["macd"] },
        ),
        labels: {
          en: { macd: "MACD (12, 26, 9)" },
          zh: { macd: "MACD 指标 (12, 26, 9)" },
          ja: { macd: "MACD (12, 26, 9)" },
          fr: { macd: "MACD (12, 26, 9)" },
        },
      },
    ),
  ],
  "depth-chart": [
    chart(
      "book",
      "Cumulative depth",
      ["MnDepthChart"],
      `@let t = labels[language()];
<mn-depth-chart [book]="book" (hover)="hovered = $event ? t.price + ' ' + $event.price + ' · ' + t.total + ' ' + $event.amount : ''" />
<output aria-live="polite">{{ hovered || t.hint }}</output>`,
      {
        hovered: "",
        book: code(`(() => {
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
})()`),
        labels: {
          en: { price: "Price", total: "Total", hint: "Hover the curves" },
          zh: { price: "价格", total: "累计", hint: "将指针悬停在曲线上" },
          ja: {
            price: "価格",
            total: "累計",
            hint: "曲線にカーソルを合わせます",
          },
          fr: { price: "Prix", total: "Cumul", hint: "Survolez les courbes" },
        },
      },
    ),
    chart(
      "live",
      "Live book",
      ["MnDepthChart"],
      `<mn-depth-chart [book]="book()" [options]="{ range: 0.012 }" [height]="280" />`,
      {
        // a new book every second (a component can stream applyDeltas instead)
        book: code(
          `(() => {
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
})()`,
          { "@angular/core": ["DestroyRef", "inject", "signal"] },
        ),
      },
    ),
  ],
  "order-book": [
    chart(
      "ladder",
      "Order book ladder",
      ["MnOrderBook"],
      `@let t = labels[language()];
<mn-order-book
  [book]="book"
  [lastPrice]="100.02"
  [options]="{ largeOrderThreshold: 50 }"
  [height]="380"
  (levelClick)="clicked = t.price + ' ' + $event.price + ' · ' + t.size + ' ' + $event.size"
/>
<output aria-live="polite">{{ clicked || t.hint }}</output>`,
      {
        clicked: "",
        book: code(`(() => {
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
})()`),
        labels: {
          en: { price: "Price", size: "Size", hint: "Click a row" },
          zh: { price: "价格", size: "数量", hint: "点击一行" },
          ja: { price: "価格", size: "数量", hint: "行をクリックします" },
          fr: {
            price: "Prix",
            size: "Quantité",
            hint: "Cliquez sur une ligne",
          },
        },
      },
    ),
    chart(
      "live",
      "Live ladder",
      ["MnOrderBook"],
      `<mn-order-book
  [book]="feed().book"
  [lastPrice]="feed().last"
  [options]="{ grouping: 0.1 }"
  [height]="380"
/>`,
      {
        // a new book and last price every second (a component can stream
        // applyDeltas instead)
        feed: code(
          `(() => {
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
})()`,
          { "@angular/core": ["DestroyRef", "inject", "signal"] },
        ),
      },
    ),
  ],
  "order-book-heatmap": [
    chart(
      "liquidity",
      "Live liquidity heatmap",
      ["MnOrderBookHeatmap"],
      `<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" />`,
      {
        // a new book (with its time) and a trade every 200 ms
        feed: code(
          `(() => {
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
})()`,
          { "@angular/core": ["DestroyRef", "inject", "signal"] },
        ),
      },
    ),
    chart(
      "red-up",
      "Red-up colors, square-root scale",
      ["MnOrderBookHeatmap"],
      `<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" [options]="{ colorConvention: 'red-up', colorScale: 'sqrt', profile: false }" />`,
      {
        // a new book (with its time) and a trade every 200 ms
        feed: code(
          `(() => {
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
})()`,
          { "@angular/core": ["DestroyRef", "inject", "signal"] },
        ),
      },
    ),
  ],
  "time-and-sales": [
    chart(
      "tape",
      "Live tape",
      ["MnTimeAndSales"],
      `<mn-time-and-sales [trades]="trades()" [options]="{ largeTradeThreshold: 20 }" [height]="320" />`,
      {
        // a trade every 250 ms: only the appended ones are added to the tape
        trades: code(
          `(() => {
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
})()`,
          { "@angular/core": ["DestroyRef", "inject", "signal"] },
        ),
      },
    ),
    chart(
      "large-trades",
      "Aggregated tape, large trades",
      ["MnTimeAndSales"],
      `@let t = labels[language()];
<mn-time-and-sales
  [trades]="trades"
  [options]="{ aggregate: true, minSize: 2, largeTradeThreshold: 25, columns: ['time', 'side', 'price', 'size'] }"
  [height]="300"
  (tradeClick)="clicked = $event.trade.price + ' × ' + $event.trade.size + ' ' + t.size + ' (' + $event.count + ')'"
/>
<output aria-live="polite">{{ clicked || t.hint }}</output>`,
      {
        clicked: "",
        // 2,000 trades around 100, generated deterministically
        trades: code(`(() => {
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
})()`),
        labels: {
          en: { hint: "Click a trade", size: "lots" },
          zh: { hint: "点击一笔成交", size: "手" },
          ja: { hint: "約定をクリックします", size: "ロット" },
          fr: { hint: "Cliquez sur une transaction", size: "lots" },
        },
      },
    ),
  ],
  "scatter-3d-chart": [
    chart(
      "clusters",
      "Customer segments in 3D",
      ["MnScatter3DChart"],
      `@let t = labels[language()];
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
/>`,
      {
        clouds: code(`(() => {
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
})()`),
        labels: {
          en: {
            segments: ["Students", "Professionals", "Retirees"],
            axes: ["Age", "Income (k€)", "Spending (k€)"],
          },
          zh: {
            segments: ["学生", "职场人士", "退休人员"],
            axes: ["年龄", "收入（千欧元）", "消费（千欧元）"],
          },
          ja: {
            segments: ["学生", "社会人", "退職者"],
            axes: ["年齢", "収入（千ユーロ）", "支出（千ユーロ）"],
          },
          fr: {
            segments: ["Étudiants", "Actifs", "Retraités"],
            axes: ["Âge", "Revenu (k€)", "Dépenses (k€)"],
          },
        },
      },
    ),
    chart(
      "trajectory",
      "A trajectory colored by height",
      ["MnLine3DChart"],
      `@let t = labels[language()];
<mn-line-3d-chart
  [series]="[{ name: t.path, data: path, colorBy: 'z', lineWidth: 3 }]"
  colorScale="turbo"
  [autoRotate]="true"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>`,
      {
        path: code(`(() => {
  // a climbing spiral of 600 points, as columns
  const t = Array.from({ length: 600 }, (_, i) => i / 30);
  const PATH = {
    x: t.map((a) => Math.cos(a) * (4 + a / 4)),
    y: t.map((a) => Math.sin(a) * (4 + a / 4)),
    z: t.map((a) => a / 2),
  };
  return PATH;
})()`),
        labels: {
          en: {
            path: "Flight path",
            axes: ["East (km)", "North (km)", "Altitude (km)"],
          },
          zh: {
            path: "飞行轨迹",
            axes: ["东（公里）", "北（公里）", "高度（公里）"],
          },
          ja: {
            path: "飛行経路",
            axes: ["東（km）", "北（km）", "高度（km）"],
          },
          fr: {
            path: "Trajectoire",
            axes: ["Est (km)", "Nord (km)", "Altitude (km)"],
          },
        },
      },
    ),
  ],
  "surface-3d-chart": [
    chart(
      "ripple",
      "A ripple with contour lines",
      ["MnSurface3DChart"],
      `@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: wave }]"
  [contours]="{ count: 10, floor: true }"
  colorScale="viridis"
  [zAxis]="{ title: t.height }"
  [height]="420"
/>`,
      {
        wave: code(`(() => {
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
})()`),
        labels: {
          en: { name: "Ripple", height: "Height" },
          zh: { name: "波纹", height: "高度" },
          ja: { name: "波紋", height: "高さ" },
          fr: { name: "Onde", height: "Hauteur" },
        },
      },
    ),
    chart(
      "terrain",
      "Terrain with a wireframe",
      ["MnSurface3DChart"],
      `@let t = labels[language()];
<mn-surface-3d-chart
  [series]="[{ name: t.name, data: terrain }]"
  [wireframe]="{ step: 2 }"
  colorScale="terrain"
  [xAxis]="{ title: t.axes[0] }"
  [yAxis]="{ title: t.axes[1] }"
  [zAxis]="{ title: t.axes[2] }"
  [height]="420"
/>`,
      {
        terrain: code(`(() => {
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
})()`),
        labels: {
          en: {
            name: "Terrain",
            axes: ["East (km)", "North (km)", "Elevation (m)"],
          },
          zh: {
            name: "地形",
            axes: ["东（公里）", "北（公里）", "海拔（米）"],
          },
          ja: { name: "地形", axes: ["東（km）", "北（km）", "標高（m）"] },
          fr: {
            name: "Relief",
            axes: ["Est (km)", "Nord (km)", "Altitude (m)"],
          },
        },
      },
    ),
  ],
  "bar-3d-chart": [
    chart(
      "sales",
      "Sales by region and quarter",
      ["MnBar3DChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: {
            sales: "Sales (k€)",
            regions: ["North", "South", "East", "West"],
            quarters: ["Q1", "Q2", "Q3", "Q4"],
          },
          zh: {
            sales: "销售额（千欧元）",
            regions: ["华北", "华南", "华东", "华西"],
            quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
          },
          ja: {
            sales: "売上（千ユーロ）",
            regions: ["北部", "南部", "東部", "西部"],
            quarters: [
              "第 1 四半期",
              "第 2 四半期",
              "第 3 四半期",
              "第 4 四半期",
            ],
          },
          fr: {
            sales: "Ventes (k€)",
            regions: ["Nord", "Sud", "Est", "Ouest"],
            quarters: ["T1", "T2", "T3", "T4"],
          },
        },
      },
    ),
    chart(
      "stacked",
      "Stacked channels",
      ["MnBar3DChart"],
      `@let t = labels[language()];
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
/>`,
      {
        labels: {
          en: {
            channels: ["Stores", "Online"],
            years: ["2023", "2024", "2025"],
            products: ["Shoes", "Bags", "Watches"],
          },
          zh: {
            channels: ["门店", "线上"],
            years: ["2023", "2024", "2025"],
            products: ["鞋子", "包袋", "手表"],
          },
          ja: {
            channels: ["店舗", "オンライン"],
            years: ["2023", "2024", "2025"],
            products: ["靴", "バッグ", "時計"],
          },
          fr: {
            channels: ["Magasins", "En ligne"],
            years: ["2023", "2024", "2025"],
            products: ["Chaussures", "Sacs", "Montres"],
          },
        },
      },
    ),
  ],
  "chart-performance": [
    chart(
      "million",
      "A million points",
      ["MnLineChart"],
      `@let t = labels[language()];
<mn-line-chart
  [series]="[{ name: t.signal, data: samples }]"
  [interaction]="{ zoom: 'x' }"
  crosshair
  [height]="320"
/>`,
      {
        samples: code(`(() => {
  // a million samples as typed-array columns: no objects, no copies
  const COUNT = 1_000_000;
  const y = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    y[i] = 50 + 30 * Math.sin(i / 20_000) + 8 * Math.sin(i / 700) + 3 * Math.sin(i * 1.7);
  }
  const SAMPLES = { y };
  return SAMPLES;
})()`),
        labels: {
          en: { signal: "Sensor (1,000,000 samples)" },
          zh: { signal: "传感器（1,000,000 个采样点）" },
          ja: { signal: "センサー（1,000,000 サンプル）" },
          fr: { signal: "Capteur (1 000 000 d’échantillons)" },
        },
      },
    ),
    chart(
      "scatter",
      "200,000 dots",
      ["MnScatterChart"],
      `@let t = labels[language()];
<mn-scatter-chart
  [series]="[{ name: t.points, data: points, pointSize: 2, opacity: 0.4 }]"
  [height]="360"
/>`,
      {
        points: code(`(() => {
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
})()`),
        labels: {
          en: { points: "Measurements (200,000 points)" },
          zh: { points: "测量值（200,000 个点）" },
          ja: { points: "測定値（200,000 点）" },
          fr: { points: "Mesures (200 000 points)" },
        },
      },
    ),
  ],
});

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
    if (page === "sparkline" && Object.hasOwn(item.state, "hovered"))
      item.stateTypes.hovered = "number | null";
    if (page === "histogram-chart" && Object.hasOwn(item.state, "bins"))
      item.stateTypes.bins = "number | 'sturges'";
  }
}

function expression(value: unknown): string {
  if (isCodeField(value)) return value.$code;
  return value instanceof Date
    ? `new Date(${value.getFullYear()}, ${value.getMonth()}, ${value.getDate()})`
    : JSON.stringify(value, null, 2).replace(
        // arrays of numbers / strings on one line
        /\[\n\s+((?:-?[\d.]+|"[^"\n]*")(?:,\n\s+(?:-?[\d.]+|"[^"\n]*"))*)\n\s*\]/g,
        (_, items: string) => `[${items.replace(/,\n\s+/g, ", ")}]`,
      );
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
  // templates localized with the language of the Minerva scope
  const localized = example.template.includes("language()");
  const imports = localized
    ? `${componentImports}, injectMinerva`
    : componentImports;
  const angularCore = ["Component", ...codeImports(example, "@angular/core")];
  const chartsCore = codeImports(example, "minerva-design/charts/core");
  return `import { ${angularCore.join(", ")} } from '@angular/core';\nimport { ${imports} } from '${packageName}';${chartsCore.length ? `\nimport { ${chartsCore.join(", ")} } from 'minerva-design/charts/core';` : ""}${engine}\n\n@Component({\n  selector: 'app-example',\n  imports: [${componentImports}],\n  template: \`\n${example.template}\n  \`,\n})\nexport class Example {\n${localized ? "  readonly language = injectMinerva().language;\n" : ""}${fields}${example.monaco ? "\n  readonly monaco = monaco;" : ""}\n}\n`;
}
