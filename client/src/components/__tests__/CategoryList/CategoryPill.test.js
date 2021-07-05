import React from "react";
import { screen, render } from "@testing-library/react";
import CategoryPill from "../../CategoryList/CategoryPill";

const category = {
  cat_name: "test",
  cat_id: 1,
  selected: true,
};

test("displays title correctly", () => {
  render(<CategoryPill category={category} />);
  const root = screen.getByTestId(`category-pill-label${category.cat_id}`);
  expect(root.innerText).toBe(category.title);
});
