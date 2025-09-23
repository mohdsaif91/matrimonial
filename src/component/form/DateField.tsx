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

  const years = Array.from({ length: 80 }, (_, i) => String(2025 - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <DatePicker
          className="rounded-xl px-3 py-2 bg-[#F0F3F8] outline-[#465dff] w-[100%]"
          selected={startDate}
          onChange={(date) => onChange(date)}
        />
        {/* <select
          value={dob.year}
          onChange={(e) => onChange({ ...dob, year: e.target.value })}
          className="rounded-xl px-3 py-2 bg-[#F0F3F8] outline-[#465dff]"
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={dob.month}
          onChange={(e) => onChange({ ...dob, month: e.target.value })}
          className="rounded-xl px-3 py-2 bg-[#F0F3F8] outline-[#465dff]"
        >
          <option value="">Month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={dob.day}
          onChange={(e) => onChange({ ...dob, day: e.target.value })}
          className="rounded-xl px-3 py-2 bg-[#F0F3F8] outline-[#465dff]"
        >
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
}
