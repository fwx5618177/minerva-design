import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconButton } from "../IconButton";
import { Page, PageHeader, PageSection, StatCard } from ".";

describe("Page", () => {
  it("forwards ref, className and attributes and lets style override maxWidth", () => {
    const ref = createRef<HTMLDivElement>();
    const { rerender } = render(
      <Page
        ref={ref}
        className="consumer"
        id="page"
        maxWidth="60rem"
        data-testid="page"
      >
        x
      </Page>,
    );
    const page = screen.getByTestId("page");
    expect(ref.current).toBe(page);
    expect(page).toHaveClass("page", "consumer");
    expect(page).toHaveAttribute("id", "page");
    expect(page.style.maxWidth).toBe("60rem");
    rerender(
      <Page maxWidth="60rem" style={{ maxWidth: "40rem" }} data-testid="page">
        x
      </Page>,
    );
    expect(page.style.maxWidth).toBe("40rem");
  });

  it("applies no maxWidth when none is given", () => {
    render(<Page data-testid="page">x</Page>);
    expect(screen.getByTestId("page").style.maxWidth).toBe("");
  });

  it("bounds the width with a pixel number without forwarding it to the DOM", () => {
    const { container } = render(<Page maxWidth={960}>Profile</Page>);
    const page = container.firstElementChild as HTMLElement;
    expect(page.style.maxWidth).toBe("960px");
    expect(page.hasAttribute("maxwidth")).toBe(false);
  });
});

describe("PageHeader", () => {
  it("renders a banner header with an h1, description and actions", () => {
    const ref = createRef<HTMLElement>();
    render(
      <PageHeader
        ref={ref}
        title="Books"
        description="All titles"
        actions={<button type="button">New</button>}
        className="consumer"
      />,
    );
    const header = screen.getByRole("banner");
    expect(ref.current).toBe(header);
    expect(header).toHaveClass("header", "consumer");
    expect(
      screen.getByRole("heading", { level: 1, name: "Books" }),
    ).toBeInTheDocument();
    expect(screen.getByText("All titles").tagName).toBe("P");
    expect(
      screen.getByRole("button", { name: "New" }).parentElement,
    ).toHaveClass("actions");
  });

  it("omits the description and actions containers when not provided", () => {
    const { container } = render(<PageHeader title="Books" />);
    expect(container.querySelector("p")).toBeNull();
    expect(container.querySelector(".actions")).toBeNull();
    expect(container.querySelector("header")).not.toHaveAttribute("title");
  });

  it("renders semantic headings and an accessible non-submitting icon button", () => {
    const { container } = render(
      <PageHeader
        title="Accounts"
        description="Directory"
        actions={<IconButton ariaLabel="Refresh" icon="R" disabled />}
      />,
    );
    expect(container.querySelector("h1")?.textContent).toBe("Accounts");
    const button = screen.getByRole<HTMLButtonElement>("button", {
      name: "Refresh",
    });
    expect(button.type).toBe("button");
    expect(button).toBeDisabled();
  });
});

describe("PageSection", () => {
  it("is a region named by its h2 title", () => {
    render(
      <PageSection title="Recent reviews" description="Last 7 days">
        <p>Body</p>
      </PageSection>,
    );
    const region = screen.getByRole("region", { name: "Recent reviews" });
    expect(region.tagName).toBe("SECTION");
    expect(
      screen.getByRole("heading", { level: 2, name: "Recent reviews" }),
    ).toBeInTheDocument();
    expect(region).toHaveTextContent("Last 7 days");
    expect(region).toHaveTextContent("Body");
  });

  it("hides the decorative icon from assistive tech without changing the accessible name", () => {
    render(<PageSection title="Stats" icon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByRole("region", { name: "Stats" })).toBeInTheDocument();
  });

  it("gives each section a unique heading id", () => {
    render(
      <>
        <PageSection title="A" />
        <PageSection title="B" />
      </>,
    );
    const [a, b] = screen.getAllByRole("heading", { level: 2 });
    expect(a!.id).not.toBe("");
    expect(a!.id).not.toBe(b!.id);
    expect(screen.getByRole("region", { name: "B" })).toHaveAttribute(
      "aria-labelledby",
      b!.id,
    );
  });

  it("renders actions and forwards ref and attributes", () => {
    const ref = createRef<HTMLElement>();
    render(
      <PageSection
        ref={ref}
        title="T"
        actions={<button type="button">Edit</button>}
        className="consumer"
        data-owner="x"
      />,
    );
    const region = screen.getByRole("region", { name: "T" });
    expect(ref.current).toBe(region);
    expect(region).toHaveClass("section", "consumer");
    expect(region).toHaveAttribute("data-owner", "x");
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });
});

describe("StatCard", () => {
  it("renders a decorative icon and forwards ref and attributes", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <StatCard
        ref={ref}
        label="Reads"
        value="1.2k"
        icon={<svg data-testid="icon" />}
        className="consumer"
        data-testid="card"
      />,
    );
    const card = screen.getByTestId("card");
    expect(ref.current).toBe(card);
    expect(card).toHaveClass("statCard", "consumer");
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(card).not.toHaveAttribute("label");
  });

  it("omits the icon and description when not provided", () => {
    const { container } = render(<StatCard label="Reads" value={3} />);
    expect(container.querySelector(".statIcon")).toBeNull();
    expect(container.querySelector(".statDescription")).toBeNull();
  });

  it("separates a metric value from its explanatory text, including a real zero", () => {
    const { container } = render(
      <StatCard label="Articles" value={0} description="No drafts" />,
    );
    expect(container.querySelector("dt")?.textContent).toBe("Articles");
    expect(container.querySelector("dd")?.textContent).toBe("0");
    expect(container.querySelector(".statDescription")?.textContent).toBe(
      "No drafts",
    );
    expect(container.querySelector("[description]")).toBeNull();
  });
});

describe("optional slots (regression)", () => {
  it('renders 0 as real content inside its slot instead of a bare "0" text node', () => {
    const { container } = render(
      <PageHeader title="Books" description={0} actions={0} />,
    );
    expect(container.querySelector(".heading p")).toHaveTextContent("0");
    expect(container.querySelector(".actions")).toHaveTextContent("0");
    const header = container.querySelector("header")!;
    expect(
      Array.from(header.childNodes).every(
        (node) => node.nodeType === Node.ELEMENT_NODE,
      ),
    ).toBe(true);
  });

  it("omits wrappers for empty slots (false / null / empty string)", () => {
    const { container } = render(
      <PageSection title="Stats" icon={false} description="" actions={null} />,
    );
    expect(container.querySelector(".actions")).toBeNull();
    expect(container.querySelector(".heading p")).toBeNull();
    expect(container.querySelector("h2 span")).toBeNull();
  });
});
