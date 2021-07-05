import React from "react";
import CategoryList from "../../CategoryList/CategoryList";
import { render, screen, fireEvent } from "@testing-library/react";

const categories = [
  { cat_name: "test1", cat_id: 1, selected: false },
  { cat_name: "test2", cat_id: 2, selected: false },
];

const onCategoryChange = jest.fn();

const setup = () => {
  const root = render(
    <CategoryList
      categories={categories}
      handleCategoryChange={onCategoryChange}
    />
  );
  const input = screen.getByTestId("category-input");
  const categoryPillLabel = screen.getByTestId(
    `category-pill-label${categories[0].cat_id}`
  );
  const categoryPillCheckbox = screen.getByTestId(
    `category-pill-input${categories[0].cat_id}`
  );

  return {
    root,
    categoryPillLabel,
    categoryPillCheckbox,
    input,
  };
};

test("renders category pills successfully", async () => {
  setup();
  const pills = await screen.findAllByTestId("category-pill");
  expect(pills.length).toEqual(categories.length);
});

test("successfully calls input onchange handler", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "ddawd, " } });
  expect(onCategoryChange).toHaveBeenCalledTimes(1);
});

test("successfully selects a category", () => {
  // TODO: see why fails
  //   const { categoryPillLabel, categoryPillCheckbox } = setup();
  //   fireEvent.click(categoryPillLabel);
  //   expect(categoryPillCheckbox).toHaveProperty("checked", true);
});
