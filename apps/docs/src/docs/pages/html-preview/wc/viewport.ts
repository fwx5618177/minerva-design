// viewport="mobile" renders a fixed-width frame (mobile-width pixels).
type Preview = HTMLElement & { html: string; viewport: "desktop" | "mobile" };
type Toggle = HTMLElement & { active: boolean };

const newsletter = `<table width="100%" style="font-family: sans-serif">
  <tr><td style="background: #0f172a; color: white; padding: 16px">
    <strong>Minerva Weekly</strong></td></tr>
  <tr><td style="padding: 16px">
    <h2>Three layouts for dense dashboards</h2>
    <p>Split panes, responsive grids and sticky headers, compared.</p>
  </td></tr>
</table>`;

export function setup(root: HTMLElement) {
  const preview = root.querySelector<Preview>("#preview")!;
  const desktop = root.querySelector<Toggle>("#desktop")!;
  const mobile = root.querySelector<Toggle>("#mobile")!;
  preview.html = newsletter;
  const show = (viewport: Preview["viewport"]) => () => {
    preview.viewport = viewport;
    desktop.active = viewport === "desktop";
    mobile.active = viewport === "mobile";
  };
  const onDesktop = show("desktop");
  const onMobile = show("mobile");
  desktop.addEventListener("click", onDesktop);
  mobile.addEventListener("click", onMobile);
  return () => {
    desktop.removeEventListener("click", onDesktop);
    mobile.removeEventListener("click", onMobile);
  };
}
