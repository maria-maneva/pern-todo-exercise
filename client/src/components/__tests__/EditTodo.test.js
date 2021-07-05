import EditTodo from "./../EditTodo";
import { render, screen } from "@testing-library/react";
import React from "react";

const todo = {
  todo_id: 1,
  description: "test description",
  categories: [{ cat_id: 1, cat_name: "test_category" }],
};

const setup = () => {
  const root = render(<EditTodo todo={todo} />);
  const editListButton = screen.getByText("Edit");
  const editModal = screen.getByTestId(`edit-todo-modal${todo.todo_id}`);
  const title = screen.getByText("Edit Todo");
  const descriptionField = screen.getByTestId("edit-todo-field");
  const saveChangesButton = screen.getByText("Save Changes");
  const dismissButton = screen.getByText("Dismiss");
  const categoryList = screen.getByTestId("category-list");

  return {
    root,
    editListButton,
    editModal,
    title,
    descriptionField,
    saveChangesButton,
    dismissButton,
    categoryList,
  };
};

// TODO: https://stackoverflow.com/questions/54674305/react-bootstrap-modal-is-always-open-visible-on-page
// test("modal is opened on Edit Modal click", () => {
//   const { editListButton, editModal } = setup();
//   expect(editModal).toHaveStyle("display: none");
//   fireEvent.click(editListButton);
// });

test("all modal elements are rendered", () => {
  const {
    title,
    descriptionField,
    saveChangesButton,
    dismissButton,
    categoryList,
  } = setup();
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Edit Todo");
  expect(saveChangesButton).toBeInTheDocument();
  expect(saveChangesButton).toHaveTextContent("Save Changes");
  expect(descriptionField).toBeInTheDocument();
  expect(descriptionField).toHaveValue(todo.description);
  expect(dismissButton).toBeInTheDocument();
  expect(dismissButton).toHaveTextContent("Dismiss");
  expect(categoryList).toBeInTheDocument();
});
