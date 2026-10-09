import {
  TableRoot,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "minerva-design";
import apiData from "./api.generated.json";
import styles from "../components/docs.module.scss";
interface Member {
  name: string;
  kind: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  changeEvent?: string;
}
interface Entry {
  name: string;
  description: string;
  members: Member[];
}
const api = apiData as Record<string, Entry>;
export default function AngularApi({ names }: { names: readonly string[] }) {
  return (
    <>
      {names.map((name) => {
        const entry = api[name];
        if (!entry) return null;
        return (
          <div key={name} className={styles.apiBlock}>
            <h3 className={styles.apiTitle} id={`angular-api-${name}`}>
              <code>{name}</code>
            </h3>
            {entry.description && <p>{entry.description}</p>}
            {entry.members.length > 0 ? (
              <div
                className={styles.tableWrapper}
                tabIndex={0}
                role="region"
                aria-label={`${name} Angular API`}
              >
                <TableRoot className={styles.propsTable}>
                  <TableHead>
                    <TableRow>
                      <TableHeader scope="col">Name</TableHeader>
                      <TableHeader scope="col">Kind</TableHeader>
                      <TableHeader scope="col">Type</TableHeader>
                      <TableHeader scope="col">Default</TableHeader>
                      <TableHeader scope="col">Description</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entry.members.map((member) => (
                      <TableRow key={member.name}>
                        <TableHeader scope="row">
                          <code>{member.name}</code>
                          {member.required && (
                            <span className={styles.required}>Required</span>
                          )}
                        </TableHeader>
                        <TableCell>{member.kind}</TableCell>
                        <TableCell>
                          <code className={styles.propType}>{member.type}</code>
                        </TableCell>
                        <TableCell>
                          <code>{member.default ?? "—"}</code>
                        </TableCell>
                        <TableCell>
                          {member.description}
                          {member.changeEvent && (
                            <p>
                              Two-way binding: <code>[({member.name})]</code>;
                              emits <code>{member.changeEvent}</code>.
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableRoot>
              </div>
            ) : (
              <p>
                Content is projected through the default slot. Native attributes
                and events can be placed on the host element.
              </p>
            )}
          </div>
        );
      })}
    </>
  );
}
