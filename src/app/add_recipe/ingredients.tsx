import { Ingredient } from "../models";
import styles from "./page.module.css";

type Props = {
  ingredients: Ingredient[];
  addIngredient: () => void;
  removeIngredient: (id: string) => void;
  updateIngredient: (id: string, value: string) => void;
};

const Ingredients = ({
  ingredients,
  addIngredient,
  removeIngredient,
  updateIngredient,
}: Props) => {
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            ingredient={ingredient}
            removeIngredient={removeIngredient}
            updateIngredient={updateIngredient}
          />
        ))}
      </ul>
      <button type="button" onClick={addIngredient}>
        Add
      </button>
    </div>
  );
};

export default Ingredients;

const Ingredient = ({
  ingredient,
  removeIngredient,
  updateIngredient,
}: {
  ingredient: Ingredient;
  removeIngredient: (id: string) => void;
  updateIngredient: (id: string, value: string) => void;
}) => {
  return (
    <li>
      <input
        type="text"
        value={ingredient.value}
        autoFocus
        name="ingredient"
        onChange={(e) => updateIngredient(ingredient.id, e.target.value)}
        className={styles.listItem}
      ></input>
      <button type="button" onClick={() => removeIngredient(ingredient.id)}>
        remove
      </button>
    </li>
  );
};
