'use client'
import React, { useRef, useState } from "react"
import Ingredients from "./ingredients"
import Method, { MethodStep } from "./method"
import { createRecipe } from "../lib/actions"
import { useFormState, useFormStatus } from "react-dom"
import { Ingredient } from "../models"
import {v4 as uuidv4} from 'uuid';

export type UnsavedIngredient = Omit<Ingredient, 'recipe_id'>

export type UnsavedRecipe = {
    id: string;
    title: string
    ingredients: UnsavedIngredient[]
    method: MethodStep[]
}

const AddRecipe = () => {
    const [state, formAction ] = useFormState(createRecipe, { message: null})
    const { pending } = useFormStatus()
    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState<UnsavedIngredient[]>([])
    function addIngredient() {
        setIngredients([...ingredients, {id: uuidv4(), value: ""  }])
    }
    function removeIngredient(id: string) {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
    }
    function updateIngredient(id:string, value: string) {
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

    return (
        <main>
            <h1>Add New Recipe</h1>
            <form action={formAction}>
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
                <button disabled={pending}>Save</button>
                <p aria-live="polite" data-testid='message'>
                    {state?.message}
                </p>
            </form>
        </main>
    )
}

export default AddRecipe
