import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { it, expect } from "vitest";
import * as C from "./index";
it("authored native Card, Page and Stack sections retain slot structure", () => {
  const w = mount(
    defineComponent({
      components: { ...C },
      template:
        '<Page><PageHeader title="Dashboard"/><PageSection><HStack><Card><CardHeader><CardTitle>Revenue</CardTitle><CardDescription>Monthly</CardDescription></CardHeader><CardContent>100</CardContent><CardFooter>Updated</CardFooter></Card><VStack><StatCard label="Users" :value="12"/><Toolbar>Actions</Toolbar></VStack></HStack></PageSection></Page>',
    }),
  );
  expect(w.find(".mn-card-header").text()).toBe("RevenueMonthly");
  expect(w.find(".mn-card-content").text()).toBe("100");
  expect(w.find(".mn-card-footer").text()).toBe("Updated");
  expect(w.find(".mn-page-title").text()).toBe("Dashboard");
  expect(w.findAll(".mn-stack")[0]!.attributes("style")).toContain(
    "flex-direction: row",
  );
  expect(w.findAll(".mn-stack")[1]!.attributes("style")).toContain(
    "flex-direction: column",
  );
});
it("native table compound sections preserve row/cell hierarchy and rich cell content", () => {
  const w = mount(
    defineComponent({
      components: { ...C },
      template:
        '<TableRoot variant="bordered"><TableHead><TableRow><TableHeader>Name</TableHeader></TableRow></TableHead><TableBody><TableRow><TableCell><TableCellContent primary="Ada" secondary="Engineer" monospace/></TableCell></TableRow></TableBody></TableRoot>',
    }),
  );
  expect(w.find(".mn-table").classes()).toContain("mn-table-bordered");
  expect(w.findAll(".mn-table-row")).toHaveLength(2);
  expect(w.find(".mn-table-body .mn-table-cell").text()).toBe("AdaEngineer");
  expect(w.find(".mn-code").text()).toBe("Ada");
});
it("form compound messages follow invalid and required state", async () => {
  const w = mount(
    defineComponent({
      components: { ...C },
      data: () => ({ invalid: false }),
      template:
        '<FormControl required :invalid="invalid"><FormLabel>Name</FormLabel><Input/><FormHelperText>Help</FormHelperText><FormErrorMessage>Error</FormErrorMessage></FormControl>',
    }),
  );
  expect(w.find(".mn-form-label").text()).toBe("Name*");
  expect(w.text()).toContain("Help");
  expect(w.text()).not.toContain("Error");
  await w.setData({ invalid: true });
  expect(w.text()).toContain("Error");
  expect(w.text()).not.toContain("Help");
});
it("RatingScale routes the chosen dimension key and ListItem retains leading/trailing slots", async () => {
  const w = mount(C.RatingScale, {
    props: {
      dimensions: [{ key: "quality", label: "Quality", value: 4 }],
      onChange: () => {},
      max: 10,
    },
  });
  await w.findAll(".mn-rating-target-right")[3]!.trigger("click");
  expect(w.emitted("change")).toEqual([["quality", 8]]);
  const item = mount(C.ListItem, {
    props: { title: "Ada", description: "Engineer" },
    slots: { leading: "A", trailing: "More", default: "Detail" },
  });
  expect(item.text()).toBe("AAdaEngineerDetailMore");
});
