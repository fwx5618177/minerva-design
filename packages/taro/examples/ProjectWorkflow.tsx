import { useState } from "react";
import {
  AppShell,
  Button,
  ConfigProvider,
  ConfirmDialog,
  DataTable,
  FormControl,
  Input,
  NumberInput,
  Page,
  PageHeader,
  Select,
  Stack,
  ThemeToggle,
  ToastProvider,
  useToast,
} from "../src";
function ProjectForm() {
  const [name, setName] = useState(""),
    [team, setTeam] = useState(""),
    [seats, setSeats] = useState<number | null>(1),
    [invalid, setInvalid] = useState(false),
    [review, setReview] = useState(false),
    [projects, setProjects] = useState<
      { id: string; name: string; team: string; seats: number }[]
    >([]);
  const toast = useToast();
  return (
    <AppShell brand="Minerva projects" headerActions={<ThemeToggle />}>
      <Page>
        <PageHeader
          title="Create a project"
          description="Native Taro controls sharing Minerva design tokens"
        />
        <Stack gap={4}>
          <FormControl
            label="Project name"
            required
            invalid={invalid && !name.trim()}
            errorMessage="Project name is required"
          >
            <Input aria-label="Project name" value={name} onChange={setName} />
          </FormControl>
          <FormControl label="Team">
            <Select
              value={team}
              onChange={setTeam}
              placeholder="Choose team"
              options={[
                { value: "Platform", label: "Platform" },
                { value: "Design", label: "Design" },
              ]}
            />
          </FormControl>
          <FormControl label="Seats">
            <NumberInput
              showStepper
              value={seats}
              min={1}
              max={20}
              onChange={setSeats}
            />
          </FormControl>
          <Button
            onClick={() => {
              setInvalid(true);
              if (name.trim()) setReview(true);
            }}
          >
            Review project
          </Button>
          <ConfirmDialog
            open={review}
            title="Create project?"
            description={`${name} · ${team || "Unassigned"} · ${seats ?? 1} seats`}
            confirmLabel="Create project"
            onOpenChange={setReview}
            onConfirm={() => {
              setProjects((rows) => [
                ...rows,
                {
                  id: String(rows.length + 1),
                  name: name.trim(),
                  team: team || "Unassigned",
                  seats: seats ?? 1,
                },
              ]);
              setReview(false);
              toast.success("Project created", { duration: 0 });
            }}
          />
          <DataTable
            columns={[
              { key: "name", header: "Project", sortable: true },
              { key: "team", header: "Team" },
              { key: "seats", header: "Seats" },
            ]}
            data={projects}
            rowKey={(project) => project.id}
            emptyText="No projects yet"
          />
        </Stack>
      </Page>
    </AppShell>
  );
}
/** Reusable host workflow for native devices, H5 E2E and renderer integration tests. */
export function ProjectWorkflow() {
  return (
    <ConfigProvider theme="light">
      <ToastProvider>
        <ProjectForm />
      </ToastProvider>
    </ConfigProvider>
  );
}
