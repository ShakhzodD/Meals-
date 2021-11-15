import React, { useState, useEffect } from "react";
import { getAllCategories } from "../api";
import Loader from "../components/Loader";
import CategoryList from "../components/CategoryList";
import Search from "../components/Search";
import { useLocation, useHistory } from "react-router-dom";

export default function Home() {
  const [catalog, setCatalog] = useState([]);
  const [filterCatalog, setFilterCatalog] = useState([]);

  const { pathname, search } = useLocation();
  const { push } = useHistory();

  const handleSearch = str => {
    setFilterCatalog(
      catalog.filter(item =>
        item.strCategory.toLowerCase().includes(str.toLowerCase())
      )
    );
    push({
      pathname,
      search: `?search=${str}`,
    });
  };

  useEffect(() => {
    getAllCategories().then(data => {
      setCatalog(data.categories);
      setFilterCatalog(
        search
          ? data.categories.filter(item =>
              item.strCategory
                .toLowerCase()
                .includes(search.split("=")[1].toLowerCase())
            )
          : data.categories
      );
    });
  }, [search]);
  return (
    <>
      <Search cb={handleSearch} />
      {!catalog.length ? <Loader /> : <CategoryList catalog={filterCatalog} />}
    </>
  );
}
