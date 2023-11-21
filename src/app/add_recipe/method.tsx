import { Step } from "../models";
import styles from "./page.module.css";

type Props = {
  method: Step[];
  addStep: () => void;
  updateStep: (id: string, value: string) => void;
  removeStep: (id: string) => void;
};

const Method = ({ method, addStep, updateStep, removeStep }: Props) => {
  return (
    <div>
      <h3>Method</h3>
      <ul>
        {method.map((step) => (
          <Step
            key={step.id}
            step={step}
            removeStep={removeStep}
            updateStep={updateStep}
          />
        ))}
      </ul>
      <button type="button" onClick={addStep}>
        Add
      </button>
    </div>
  );
};

export default Method;

const Step = ({
  step,
  removeStep,
  updateStep,
}: {
  step: Step;
  removeStep: (id: string) => void;
  updateStep: (id: string, value: string) => void;
}) => {
  return (
    <li>
      <input
        name="step"
        type="text"
        value={step.value}
        autoFocus
        onChange={(e) => updateStep(step.id, e.target.value)}
        className={styles.listItem}
      ></input>
      <button type="button" onClick={() => removeStep(step.id)}>
        remove
      </button>
    </li>
  );
};
