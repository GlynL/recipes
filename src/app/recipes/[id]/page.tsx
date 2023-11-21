import { getIngredients, getMethod, getRecipe } from "@/app/data";
import React from "react";
import Ingredients from "./ingredients";
import Method from "./method";
import { Link } from "@/app/components/basic";

type Props = {
  params: {
    id: string;
  };
};

const Recipe = async ({ params }: Props) => {
  const recipe = await getRecipe(params.id);
  const ingredients = await getIngredients(params.id);
  const method = await getMethod(params.id);
  if (!recipe) return null;
  return (
    <div>
      <h2>{recipe.title}</h2>
      <Ingredients ingredients={ingredients} />
      <Method method={method} />
      <Link href={`/recipes/${params.id}/edit`}>Edit</Link>
    </div>
  );
};

export default Recipe;
