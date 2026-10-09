import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { ProjectWorkflow } from "../examples/ProjectWorkflow";
it("native host workflow changes theme, validates input, confirms creation and displays the saved table row", async () => {
  const user = userEvent.setup();
  const { container } = render(<ProjectWorkflow />);
  await user.click(screen.getByRole("button", { name: "Dark" }));
  expect(
    container.querySelector('[data-minerva="config-provider"]'),
  ).toHaveAttribute("data-theme", "dark");
  await user.click(screen.getByRole("button", { name: "Review project" }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Project name is required",
  );
  await user.type(container.querySelector("input")!, "Apollo");
  await user.click(screen.getByRole("combobox", { name: "Choose team" }));
  await user.click(screen.getByRole("option", { name: "Platform" }));
  await user.click(screen.getByRole("button", { name: "Review project" }));
  expect(screen.getByRole("alertdialog")).toHaveTextContent("Apollo");
  await user.click(screen.getByRole("button", { name: "Create project" }));
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("Project created");
  const row = screen.getAllByRole("row")[1];
  expect(within(row).getByText("Apollo")).toBeInTheDocument();
  expect(within(row).getByText("Platform")).toBeInTheDocument();
});
