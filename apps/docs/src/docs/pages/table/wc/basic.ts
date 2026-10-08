// `columns` and `rows` are JS properties. A cell `render` function returns a
// string or a DOM node — here a two-line <minerva-table-cell-content>.
type Service = { id: string; name: string; image: string; replicas: number };
type Column = {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  width?: number;
  render?: (row: Service) => string | Node;
};

export function setup(root: HTMLElement) {
  const table = root.querySelector<
    HTMLElement & { columns: Column[]; rows: Service[] }
  >("#services")!;
  table.columns = [
    {
      key: "name",
      header: "Service",
      render: (row) => {
        const cell = document.createElement("minerva-table-cell-content");
        cell.setAttribute("primary", row.name);
        cell.setAttribute("secondary", row.id);
        return cell;
      },
    },
    { key: "image", header: "Image" },
    { key: "replicas", header: "Replicas", align: "right", width: 120 },
  ];
  table.rows = [
    { id: "svc-01", name: "API gateway", image: "nginx:1.27", replicas: 3 },
    { id: "svc-02", name: "Auth", image: "keycloak:25", replicas: 2 },
    { id: "svc-03", name: "Billing", image: "billing:4.2.0", replicas: 1 },
    { id: "svc-04", name: "Search", image: "opensearch:2.15", replicas: 5 },
  ];
}
