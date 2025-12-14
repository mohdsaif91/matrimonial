import DatePicker from "react-datepicker";
import { TimeFeildProps } from "../../types/form";

import "react-datepicker/dist/react-datepicker.css";
import { parseTimeStringToDate } from "../../util/ClientUtils";
import { TimerIcon } from "lucide-react";

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
      <div className="relative gap-2">
        <TimerIcon className="absolute z-99 left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
        <DatePicker
          name={name}
          selected={value && value}
          onChange={(date) => onChange(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5} // intervals in minutes
          timeCaption="Time"
          dateFormat="h:mm aa" // 12-hour format
          className="border pl-10 rounded-lg px-3 py-2 w-full"
          placeholderText="Select time"
        />
      </div>
    </div>
  );
}
