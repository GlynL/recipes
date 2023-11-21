"use client";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Ingredients from "../add_recipe/ingredients";
import Method from "../add_recipe/method";
import { Ingredient, Recipe, Step } from "../models";
import { v4 as uuidv4 } from "uuid";

type Props = {
  initialState?: { recipe: Recipe; ingredients: Ingredient[]; method: Step[] };
  onSubmit: (
    recipeId: string,
    prevState: any,
    formData: FormData,
  ) => Promise<{ message: string }>;
};

const RecipeForm = ({ initialState, onSubmit }: Props) => {
  const [recipe, setRecipe] = useState(
    initialState?.recipe || { id: uuidv4(), title: "" },
  );
  const onSubmitWithId = onSubmit.bind(null, recipe.id);
  const [state, formAction] = useFormState(onSubmitWithId, { message: null });
  const { pending } = useFormStatus();

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialState?.ingredients || [],
  );
  const [method, setMethod] = useState<Step[]>(initialState?.method || []);

  function addIngredient() {
    setIngredients([
      ...ingredients,
      { id: uuidv4(), recipe_id: recipe.id, value: "" },
    ]);
  }
  function removeIngredient(id: string) {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  }
  function updateIngredient(id: string, value: string) {
    setIngredients(
      ingredients.map((ingredient) => {
        if (ingredient.id === id) {
          return {
            ...ingredient,
            value,
          };
        }
        return ingredient;
      }),
    );
  }

  function addStep() {
    setMethod([...method, { id: uuidv4(), recipe_id: recipe.id, value: "" }]);
  }
  function removeStep(id: string) {
    setMethod(method.filter((step) => step.id !== id));
  }
  function updateStep(id: string, value: string) {
    setMethod(
      method.map((step) => {
        if (step.id === id) {
          return {
            ...step,
            value,
          };
        }
        return step;
      }),
    );
  }
  return (
    <form action={formAction}>
      <label htmlFor="title">Title</label>
      <input
        autoFocus
        id="title"
        name="title"
        type="text"
        required
        value={recipe.title}
        onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
        placeholder="New Recipe"
      />
      <Ingredients
        ingredients={ingredients}
        addIngredient={addIngredient}
        updateIngredient={updateIngredient}
        removeIngredient={removeIngredient}
      />
      <Method
        method={method}
        addStep={addStep}
        updateStep={updateStep}
        removeStep={removeStep}
      />
      <button disabled={pending}>Save</button>
      <p aria-live="polite" data-testid="message">
        {state?.message}
      </p>
    </form>
  );
};

export default RecipeForm;
