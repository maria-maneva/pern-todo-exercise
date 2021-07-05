import * as Utils from "./utils";

test("mapCategoriesByName should return array of strings for selected categories", () => {
  const result = Utils.mapCategoriesByName([
    { cat_name: "test1", cat_id: 1, selected: true },
    { cat_name: "test2", cat_id: 2, selected: false },
  ]);
  expect(result.length).toEqual(1);
  expect(result[0]).toEqual("test1");
});
