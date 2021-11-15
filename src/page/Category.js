import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getFilterCategory } from "../api";
import Loader from "../components/Loader";
import MealList from "../components/MealList";

export default function Category() {
  const { name } = useParams();
  const { goBack } = useHistory();
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    getFilterCategory(name).then(data => setMeals(data.meals));
  }, [name]);
  return <>{!meals.length ? <Loader /> : <MealList meals={meals} />}</>;
}
