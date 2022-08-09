import { useState } from "react";
import './checkbox.css'

export default function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <div className="checkbox-frame">
        <span
          className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
          aria-hidden="true"
        />
      </div>
    </label>
  );
}
