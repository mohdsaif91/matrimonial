import React from "react";
import { CheckboxProps } from "../../types/form";

const Checkbox = ({
  label,
  required,
  checked,
  onChange,
  value,
}: CheckboxProps) => {
  return (
    <div className="flex flex-row gap-1 align-middle items-center">
      <input
        type="checkbox"
        checked={value === 1}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <div className="ml-2">
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
