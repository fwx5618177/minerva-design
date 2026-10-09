import { fireEvent, render, screen } from "@testing-library/react-native";
import { Text, View } from "react-native";
import { expect, it, vi } from "vitest";
import * as N from "./index";
it("composes modal and drawer state with trigger and close actions", async () => {
  await render(
    <N.ModalRoot>
      <N.ModalTrigger>Open composed</N.ModalTrigger>
      <N.ModalContent title="Composed">
        <N.ModalBody>
          <Text>Body</Text>
        </N.ModalBody>
        <N.ModalClose>Done</N.ModalClose>
      </N.ModalContent>
    </N.ModalRoot>,
  );
  await fireEvent.press(screen.getByRole("button", { name: "Open composed" }));
  expect(screen.getByText("Body")).toBeTruthy();
  await fireEvent.press(screen.getByRole("button", { name: "Done" }));
});
it("renders semantic card parts, skeleton text and rating dimensions", async () => {
  const change = vi.fn();
  await render(
    <>
      <N.Card>
        <N.CardHeader>
          <N.CardTitle>Title</N.CardTitle>
          <N.CardDescription>Details</N.CardDescription>
        </N.CardHeader>
        <N.CardContent>
          <Text>Content</Text>
        </N.CardContent>
        <N.CardFooter>
          <Text>Footer</Text>
        </N.CardFooter>
      </N.Card>
      <N.SkeletonText lines={3} />
      <N.RatingScale
        dimensions={[{ key: "quality", label: "Quality" }]}
        onChange={change}
      />
    </>,
  );
  expect(screen.getByRole("header", { name: "Title" })).toBeTruthy();
  expect(screen.getByText("Quality")).toBeTruthy();
});
it("converts composed select options into selectable native rows", async () => {
  const change = vi.fn();
  await render(
    <N.Select label="Fruit" onChange={change}>
      <N.SelectGroup label="Fresh">
        <N.SelectItem value="apple">Apple</N.SelectItem>
        <N.SelectSeparator />
        <N.SelectItem value="pear" disabled>
          Pear
        </N.SelectItem>
      </N.SelectGroup>
    </N.Select>,
  );
  await fireEvent.press(screen.getByRole("combobox", { name: "Fruit" }));
  await fireEvent.press(screen.getByRole("radio", { name: "Apple" }));
  expect(change).toHaveBeenCalledWith("apple");
});
it("passes a script-free isolated document policy to the native HTML host", async () => {
  const documents: N.HtmlPreviewDocumentProps[] = [];
  function Host(props: N.HtmlPreviewDocumentProps) {
    documents.push(props);
    return <View testID="document-host" />;
  }
  await render(
    <N.HtmlPreview
      html="<h1>Hello</h1><script>alert(1)</script>"
      title="Preview"
      renderDocument={Host}
    />,
  );
  expect(screen.getByTestId("document-host")).toBeTruthy();
  expect(documents[0].javaScriptEnabled).toBe(false);
  expect(documents[0].source.html).toContain("default-src 'none'");
  expect(
    documents[0].onShouldStartLoadWithRequest({ url: "https://evil.example" }),
  ).toBe(false);
});
it("renders headings for grouped Select options", async () => {
  await render(
    <N.Select label="Grouped">
      <N.SelectGroup label="Europe">
        <N.SelectItem value="fr">France</N.SelectItem>
      </N.SelectGroup>
    </N.Select>,
  );
  await fireEvent.press(screen.getByRole("combobox", { name: "Grouped" }));
  expect(screen.getByRole("header", { name: "Europe" })).toBeTruthy();
});
