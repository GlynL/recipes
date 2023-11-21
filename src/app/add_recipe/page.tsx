import React from "react";
import RecipeForm from "../components/recipeForm";
import { createRecipe } from "../lib/actions";

const AddRecipe = () => {
  return (
    <main>
      <h2>Add New Recipe</h2>
      <RecipeForm onSubmit={createRecipe} />
    </main>
  );
};

export default AddRecipe;
