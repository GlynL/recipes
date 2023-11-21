import { Ingredient } from "@/app/models";
import React from "react";

type Props = {
  ingredients: Ingredient[];
};
const Ingredients = ({ ingredients }: Props) => {
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
