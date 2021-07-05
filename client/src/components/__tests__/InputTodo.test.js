import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputTodo from "../InputTodo";

const testInput = "test input";
const setup = () => {
  const root = render(<InputTodo />);
  const descInput = screen.getByTestId("description-input");
  const button = screen.getByText("Add");
  const categoryInput = screen.getByTestId("category-input");

  return {
    descInput,
    categoryInput,
    button,
    root,
  };
};

test("input shows correct value", async () => {
  const { descInput } = setup();
  fireEvent.change(descInput, { target: { value: testInput } });
  expect(descInput.value).toBe(testInput);
});

test("button is being disabled when input is empty", () => {
  const { button } = setup();
  expect(button.classList.contains("disabled")).toBe(true);
});

test("button is being enabled when input is NOT empty", async () => {
  const { descInput, button } = setup();
  fireEvent.change(descInput, { target: { value: testInput } });
  expect(button.classList.contains("disabled")).toBe(false);
});

test("category list is on the screen", () => {
  setup();
  expect(screen.getByTestId("category-list")).not.toBeNull();
});

test("successfully adds new category on category input", async () => {
  const { categoryInput } = setup();
  fireEvent.change(categoryInput, { target: { value: "new category, " } });
  const pills = await screen.findAllByTestId("category-pill");
  expect(pills.length).toEqual(1);
});
