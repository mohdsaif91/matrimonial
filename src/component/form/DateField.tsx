import { useState } from "react";
import { DateFeildProps } from "../../types/form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DateOfBirthField({
  label,
  value,
  onChange,
  required = false,
}: DateFeildProps) {
  const dateValue =
    typeof value === "string" && value ? new Date(value) : value || null;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <DatePicker
          required={required}
          className="rounded-xl px-3 py-2 bg-[#F0F3F8] outline-[#465dff] w-[100%]"
          selected={dateValue}
          onChange={(date) => date && onChange(date)}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={50}
        />
      </div>
    </div>
  );
}
