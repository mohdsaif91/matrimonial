import { useState } from "react";
import { DateFeildProps } from "../../types/form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DateOfBirthField({ label, value, onChange }: DateFeildProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [dob, setDob] = useState<{
    year: string;
    month: string;
    day: string;
  }>({ year: "", month: "", day: "" });

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <DatePicker
          className="rounded-xl px-3 py-2 bg-[#F0F3F8] outline-[#465dff] w-[100%]"
          selected={startDate}
          onChange={(date) => date && onChange(date)}
        />
      </div>
    </div>
  );
}
