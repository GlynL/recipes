import { Step } from "@/app/models";
import React from "react";

type Props = {
  method: Step[];
};
const Method = ({ method }: Props) => {
  return (
    <div>
      <h3>Method</h3>
      <ol>
        {method.map((step) => (
          <li key={step.id}>{step.value}</li>
        ))}
      </ol>
    </div>
  );
};

export default Method;
