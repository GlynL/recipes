import { useRef, useState } from 'react';
import styles from './page.module.css'

export type Ingredient = {
    id: number;
    value: string;
}

type Props = {
    ingredients: Ingredient[];
    addIngredient: () => void;
    removeIngredient: (id: number) => void;
    updateIngredient: (id: number, value: string) => void;
}

const Ingredients = ({ ingredients, addIngredient, removeIngredient, updateIngredient}: Props) => {
    return (
        <div>
            <h3>Ingredients</h3>
            <ul>
                {ingredients.map(ingredient => (
                    <Ingredient key={ingredient.id} ingredient={ingredient} removeIngredient={removeIngredient} updateIngredient={updateIngredient} />
                ))}
            </ul>
            <button type='button' onClick={addIngredient}>Add</button>
        </div>
    )
}

export default Ingredients;

const Ingredient = ({ ingredient,removeIngredient, updateIngredient }: { ingredient: Ingredient, removeIngredient: (id: number) => void, updateIngredient: (id: number, value: string) => void}) => {
    // const [isDisabled, setIsDisabled] = useState(true)
    return(
        <li>
            <input 
                type='text'
                value={ingredient.value}
                autoFocus
                onChange={(e) => updateIngredient(ingredient.id, e.target.value)}
                // onClick={() => setIsDisabled(!isDisabled)}
                // disabled={isDisabled}
                className={styles.listItem}>
            </input>
            <button type='button' onClick={() => removeIngredient(ingredient.id)}>remove</button>
        </li>
    )
}