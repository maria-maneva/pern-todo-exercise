import { apiUrl } from "config";

export const getCategories = async () => {
  try {
    const response = await fetch(`${apiUrl}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getTodos = async () => {
  try {
    const response = await fetch(`${apiUrl}/todos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error.message);
  }
};
