import React, { useMemo } from "react";
import { ICategory } from "interfaces";

interface ICategoryPillProps {
  category: ICategory;
  handleClick: () => void;
}

const CategoryPill: React.FC<ICategoryPillProps> = ({
  category,
  handleClick,
}) => {
  const pillName = useMemo(() => {
    return `cat_pill_${category.cat_id}`;
  }, [category.cat_id]);

  return (
    <span className="d-inline-block pe-1 pt-1">
      <input
        id={`checkbox${pillName}`}
        type="checkbox"
        className="btn-check"
        name={pillName}
        checked={category.selected}
        readOnly
      />
      <label
        className="btn btn-sm btn-outline-info"
        onClick={handleClick}
        htmlFor={pillName}
      >
        {category.cat_name}
      </label>
    </span>
  );
};

export default CategoryPill;
