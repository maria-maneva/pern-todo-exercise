import { ICategory } from "interfaces";

export const mapCategoriesByName = (categories: ICategory[]) =>
  categories
    .filter((c) => c.cat_name !== " ")
    .filter((c) => c.selected)
    .map((c) => c.cat_name);
