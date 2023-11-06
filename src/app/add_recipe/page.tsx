'use client'
import React, { useRef, useState } from "react"
import Ingredients, { Ingredient } from "./ingredients"
import Method, { MethodStep } from "./method"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from 'uuid';

export type Recipe = {
    id: string;
    title: string
    ingredients: Ingredient[]
    method: MethodStep[]
}

const AddRecipe = () => {
    const route = useRouter()
    const [title, setTitle] = useState('')
    const ingredient = useRef<number>(0)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    function addIngredient() {
        setIngredients([...ingredients, {id: ingredient.current, value: ""  }])
        ingredient.current++
    }
    function removeIngredient(id: number) {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
    }
    function updateIngredient(id:number, value: string) {
        setIngredients(ingredients.map(ingredient => {
            if (ingredient.id === id) {
                return {
                    ...ingredient,
                    value
                }

            }
            return ingredient
        }))
    }

    const methodIdRef = useRef<number>(0)
    const [method, setMethod] = useState<MethodStep[]>([])
    function addStep() {
        setMethod([...method, {id: methodIdRef.current, value: ""  }])
        ingredient.current++
    }
    function removeStep(id: number) {
        setMethod(method.filter(step => step.id !== id))
    }
    function updateStep(id:number, value: string) {
        setMethod(method.map(step => {
            if (step.id === id) {
                return {
                    ...step,
                    value
                }

            }
            return step
        }))
    }
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        const recipe = { id: uuidv4(), title, ingredients, method }
        let storageRecipes = localStorage.getItem('recipes')
        let recipes = storageRecipes ? JSON.parse(storageRecipes) as Recipe[] : [] 
        recipes.push(recipe)
        localStorage.setItem('recipes', JSON.stringify(recipes))
        route.push('/')
    }

    return (
        <main>
            <h1>Add New Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Title</label>
                <input 
                    autoFocus
                    id='title'
                    name='title'
                    type='text'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New Recipe" />
                <Ingredients ingredients={ingredients} addIngredient={addIngredient} updateIngredient={updateIngredient} removeIngredient={removeIngredient} /> 
                <Method method={method} addStep={addStep} updateStep={updateStep} removeStep={removeStep} /> 
                <button>Save</button>



            </form>
        </main>
    )
}

export default AddRecipe
