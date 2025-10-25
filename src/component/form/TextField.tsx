import { memo } from "react";
import { textFeildProps } from "../../types/form";

// Generic input field
export const TextField = memo(
  ({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    value,
    onChange,
    extraText,
  }: textFeildProps) => {
    return (
      <div className="flex flex-col gap-1">
        {label && label !== "" && (
          <label className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          type={type}
          name={name}
          placeholder={placeholder || label}
          required={required}
          value={value}
          onChange={onChange}
          className="rounded-xl w-full px-3 py-2 outline-[#465dff] bg-[#F0F3F8] text-[#333] placeholder:text-[#9ba6b7] placeholder:text-[14px]"
        />
        {extraText && extraText !== "" && (
          <span className="text-red-500"> {extraText}</span>
        )}
      </div>
    );
  }
);
