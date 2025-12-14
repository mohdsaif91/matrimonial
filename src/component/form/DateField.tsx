import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";

import { DateFeildProps } from "../../types/form";

import "react-datepicker/dist/react-datepicker.css";

export function DateTimePicker({
  label,
  value,
  onChange,
  dateFormat = "dd/MM/yyyy",
  required = false,
  showLabel = true,
  showYear = false,
}: DateFeildProps) {
  const dateValue = value ? new Date(value) : undefined;
  return (
    <div className="flex flex-col gap-1 w-full">
      {showLabel && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <Calendar className="absolute z-99 left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
        <DatePicker
          placeholderText={label}
          dateFormat={dateFormat}
          required={required}
          showYearPicker={showYear}
          className={`rounded-xl pl-10 pr-3 py-2 bg-[#F0F3F8] outline-[#465dff] w-full ${
            showLabel ? "" : "placeholder:text"
          }`}
          selected={
            dateValue instanceof Date && !isNaN(dateValue.getTime())
              ? dateValue
              : undefined
          }
          onChange={(date) => date && onChange(date)}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={50}
        />
      </div>
    </div>
  );
}
