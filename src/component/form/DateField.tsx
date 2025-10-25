import { DateFeildProps } from "../../types/form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DateTimePicker({
  label,
  value,
  onChange,
  dateFormat = "MM/dd/yyyy",
  required = false,
}: DateFeildProps) {
  const dateValue =
    typeof value === "string" && value ? new Date(value) : value || null;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex gap-2">
        <DatePicker
          dateFormat={dateFormat}
          required={required}
          className="rounded-xl px-3 py-2 bg-[#F0F3F8] outline-[#465dff] w-full"
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
