import { useRef, useState } from 'react';
import styles from './page.module.css'

export type MethodStep = {
    id: number;
    value: string;
}

type Props = {
    method: MethodStep[];
    addStep: () => void;
    updateStep: (id: number, value: string) => void;
    removeStep: (id: number) => void;
}

const Method = ({ method, addStep, updateStep, removeStep}: Props) => {
    return (
        <div>
            <h3>Method</h3>
            <ul>
                {method.map(step => (
                    <Step key={step.id} step={step} removeStep={removeStep} updateStep={updateStep} />
                ))}
            </ul>
            <button type='button' onClick={addStep}>Add</button>
        </div>
    )
}

export default Method;

const Step = ({  step,removeStep, updateStep }: { step: MethodStep, removeStep: (id: number) => void, updateStep: (id: number, value: string) => void}) => {
    // const [isDisabled, setIsDisabled] = useState(true)
    return(
        <li>
            <input 
                type='text'
                value={step.value}
                autoFocus
                onChange={(e) => updateStep(step.id, e.target.value)}
                // onClick={() => setIsDisabled(!isDisabled)}
                // disabled={isDisabled}
                className={styles.listItem}>
            </input>
            <button type='button' onClick={() => removeStep(step.id)}>remove</button>
        </li>
    )
}