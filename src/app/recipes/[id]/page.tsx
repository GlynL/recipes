import { getIngredients, getRecipe } from '@/app/data';
import React from 'react';

type Props = {
    params: {
        id: string;
    }
}


const Recipe = async ( { params } : Props) => {
    const recipe = await getRecipe(params.id);
    const ingredients = await getIngredients(params.id)
    if (!recipe) return null;
    return (
        <div>
            <h2>{recipe.title}</h2>
            <div>
                <h3>Ingredients</h3>
                <ul>
                    {ingredients.map(ingredient => (
                        <li key={ingredient.id}>{ingredient.value}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Recipe;