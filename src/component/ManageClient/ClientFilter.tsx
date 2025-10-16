import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown } from "lucide-react";
import { clientFiltersProps, FormFilterProps } from "../../types/client";

export default function ClientFilterForm({ onSubmit }: clientFiltersProps) {
  const [filters, setFilters] = useState<FormFilterProps>({
    profileId: "",
    leadId: "",
    clientName: "",
    clientMobile: "",
    clientEmail: "",
    gender: "",
    religion: "",
    caste: "",
    occupation: "",
    maritalStatus: "",
    fromDate: null as Date | null,
    toDate: null as Date | null,
  });

  const handleChange = (name: string, value: string | Date | null) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(filters);
  };

  const handleReset = () => {
    setFilters({
      profileId: "",
      leadId: "",
      clientName: "",
      clientMobile: "",
      clientEmail: "",
      gender: "",
      religion: "",
      caste: "",
      occupation: "",
      maritalStatus: "",
      fromDate: null,
      toDate: null,
    });
  };

  const Dropdown = ({
    label,
    name,
    options,
  }: {
    label: string;
    name: string;
    options: string[];
  }) => (
    <div className="relative">
      <select
        className="appearance-none w-full px-3 py-2 rounded-xl bg-[#F0F3F8] text-gray-700 outline-[#465dff]"
        value={filters[name as keyof typeof filters] as string}
        onChange={(e) => handleChange(name, e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );

  const TextField = ({ label, name }: { label: string; name: string }) => (
    <input
      type="text"
      placeholder={label}
      value={filters[name as keyof typeof filters] as string}
      onChange={(e) => handleChange(name, e.target.value)}
      className="rounded-xl px-3 py-2 bg-[#F0F3F8] text-gray-700 outline-[#465dff] w-full"
    />
  );

  const DateField = ({
    label,
    name,
  }: {
    label: string;
    name: "fromDate" | "toDate";
  }) => (
    <DatePicker
      placeholderText={label}
      selected={filters[name]}
      onChange={(date) => handleChange(name, date)}
      className="rounded-xl px-3 py-2 bg-[#F0F3F8] text-gray-700 outline-[#465dff] w-full"
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={50}
    />
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-3 bg-white p-4 rounded-lg shadow-sm"
    >
      <TextField label="Profile Id" name="profileId" />
      <TextField label="Lead Id" name="leadId" />
      <TextField label="Client Name" name="clientName" />
      <TextField label="Client Mobile" name="clientMobile" />
      <TextField label="Client Email" name="clientEmail" />
      <Dropdown
        label="Gender"
        name="gender"
        options={["Male", "Female", "Other"]}
      />
      <Dropdown
        label="Religion"
        name="religion"
        options={["Hindu", "Muslim", "Christian"]}
      />
      <Dropdown
        label="Caste"
        name="caste"
        options={["Brahmin", "Rajput", "Other"]}
      />
      <Dropdown
        label="Occupation"
        name="occupation"
        options={["Working", "Not Working"]}
      />
      <Dropdown
        label="Marital Status"
        name="maritalStatus"
        options={["Single", "Married"]}
      />
      <DateField label="From Registration Date" name="fromDate" />
      <DateField label="To Registration Date" name="toDate" />

      <div className="flex items-center gap-2 col-span-full justify-center md:justify-end mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-[#1d253b] text-white rounded-xl hover:bg-[#465dff]"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-[#c62828] text-white rounded-xl hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
