import React from "react";
import "../../../styles/Input.css";

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  required,
  label,
  className,
}) => (
  <div className="mb-4">
    <input
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default Input;
