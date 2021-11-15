import React from "react";
import CategoryItem from "./CategoryItem";

export default function CategoryList({ catalog = [] }) {
  return (
    <div className="list">
      {catalog.length ? (
        catalog.map(el => <CategoryItem key={el.idCategory} {...el} />)
      ) : (
        <h4 className="list-h3">Mahsulot Topilmadi</h4>
      )}
    </div>
  );
}
