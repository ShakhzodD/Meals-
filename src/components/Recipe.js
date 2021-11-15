import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getMealById } from "../api";
import Loader from "./Loader";

export default function Recipe() {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);

  const handleRecipeShow = () => {
    setShowRecipe(!showRecipe);
  };

  useEffect(() => {
    getMealById(id).then(data => setRecipe(data.meals[0]));
  }, []);
  return (
    <>
      <button className="btn" onClick={goBack}>
        Go Back
      </button>

      {!recipe.idMeal ? (
        <Loader />
      ) : (
        <div className="recipe">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h1>{recipe.strMeal}</h1>
          <h4>
            <b>Category:</b> {recipe.strCategory}
          </h4>
          {recipe.strArea ? (
            <h4>
              <b>Area:</b> {recipe.strArea}
            </h4>
          ) : null}
          <p>{recipe.strInstructions}</p>
          <button className="btn" onClick={handleRecipeShow}>
            Show Recipe
          </button>
          {showRecipe ? (
            <table className="centred">
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Measure</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(recipe).map(key => {
                  if (key.includes("Ingredient") && recipe[key]) {
                    return (
                      <tr>
                        <td>{recipe[key]}</td>
                        <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          ) : null}

          {recipe.strYoutube ? (
            <div className="row">
              <h5>Video Recipe</h5>
              <iframe
                src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(
                  -11
                )}`}
                title={id}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
