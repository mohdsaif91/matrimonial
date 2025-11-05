import DatePicker from "react-datepicker";
import { TimeFeildProps } from "../../types/form";

import "react-datepicker/dist/react-datepicker.css";
import { parseTimeStringToDate } from "../../util/ClientUtils";

export default function TimePickerExample({
  label,
  required = false,
  onChange,
  value = new Date(),
  name,
  showLabel = true,
}: TimeFeildProps) {
  // const timeValue = parseTimeStringToDate(value);
  return (
    <div className="flex flex-col gap-1">
      {showLabel && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        <DatePicker
          name={name}
          selected={value && value}
          onChange={(date) => onChange(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5} // intervals in minutes
          timeCaption="Time"
          dateFormat="h:mm aa" // 12-hour format
          className="border rounded-lg px-3 py-2 w-full"
          placeholderText="Select time"
        />
      </div>
    </div>
  );
}
