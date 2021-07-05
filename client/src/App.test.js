import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import renderer from "react-test-renderer";

test("renders main container", () => {
  render(<App />);
  const root = screen.getByTestId("main-container");
  expect(root).toBeInTheDocument();
});

test("renders input form", () => {
  render(<App />);
  const inputForm = screen.getByTestId("input-form");
  expect(inputForm).toBeInTheDocument();
});

test("renders  todos list", () => {
  render(<App />);

  const todosList = screen.getByTestId("list-todos");
  expect(todosList).toBeInTheDocument();
});

test("renders correctly", () => {
  const view = renderer.create(<App />).toJSON();
  expect(view).toMatchSnapshot();
});
