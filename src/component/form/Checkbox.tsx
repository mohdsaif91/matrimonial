import { CheckboxProps } from "../../types/form";

const Checkbox = ({
  label,
  required,
  checked = false,
  onChange,
  id,
}: CheckboxProps) => {
  return (
    <div className="flex flex-row gap-1 align-middle items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
      />
      <div className="ml-2">
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 cursor-pointer"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
