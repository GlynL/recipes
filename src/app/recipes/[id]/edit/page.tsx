import RecipeForm from "@/app/components/recipeForm";
import { getRecipe, getIngredients, getMethod } from "@/app/data";
import { updateRecipe } from "@/app/lib/actions";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const EditRecipe = async ({ params }: Props) => {
  const recipe = await getRecipe(params.id);
  const ingredients = await getIngredients(params.id);
  const method = await getMethod(params.id);
  return (
    <div>
      <h2>Edit {recipe.title}</h2>
      <RecipeForm
        initialState={{ recipe, ingredients, method }}
        onSubmit={updateRecipe}
      />
    </div>
  );
};

export default EditRecipe;
