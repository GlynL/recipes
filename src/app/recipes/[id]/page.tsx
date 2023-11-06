'use client'
import { getRecipe } from '@/app/data';
import React from 'react';

type Props = {
    params: {
        id: string;
    }
}


const Recipe = ( { params } : Props) => {
    const recipe = getRecipe(params.id);
    if (!recipe) return null;
    return (
        <div>
            <h2>{recipe.title}</h2>
        </div>
    )
}

export default Recipe;