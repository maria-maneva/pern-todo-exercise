import React, { useState } from "react";
import CategoryPill from "./CategoryPill";
import { ICategory } from "interfaces";

interface ICategoryListProps {
  categories: ICategory[];
  handleCategoryChange: (categories: ICategory[]) => void;
}

const CategoryList: React.FC<ICategoryListProps> = ({
  categories,
  handleCategoryChange,
}) => {
  const [categoryField, setCategoryField] = useState("");

  const handleCategoryInput = (categoryInput: string) => {
    const newCategories = categoryInput.split(",");
    if (newCategories.length > 1) {
      const newCategory = {
        cat_id: categories.length + 1,
        cat_name: newCategories[0],
        selected: true,
      };
      handleCategoryChange([...categories, newCategory]);
      setCategoryField("");
    } else {
      setCategoryField(categoryInput);
    }
  };

  const handleCategoryToggle = (category: ICategory) => {
    handleCategoryChange(
      categories.map((c) => ({
        ...c,
        selected: c.cat_id === category.cat_id ? !c.selected : c.selected,
      }))
    );
  };

  return (
    <div className="mt-2 mb-2" data-testid="category-list">
      <h6>Select category</h6>
      <div>
        {categories.map((cat) => (
          <CategoryPill
            key={cat.cat_id}
            category={cat}
            handleClick={() => {
              handleCategoryToggle(cat);
            }}
          />
        ))}
        <input
          data-testid="category-input"
          type="text"
          style={{
            display: "inline",
            border: "none",
            outline: "none",
            minWidth: "250px",
          }}
          placeholder="Enter category divided by comma"
          value={categoryField}
          onChange={(e) => handleCategoryInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CategoryList;
