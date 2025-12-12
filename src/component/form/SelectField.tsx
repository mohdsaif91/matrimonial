import { useState } from "react";
import { SelectFeildProps } from "../../types/form";
import ReactSelect from "react-select";

export function SelectField({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
}: SelectFeildProps) {
  const [search, setSearch] = useState("");

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#F0F3F8",
      borderRadius: "0.75rem", // rounded-xl
      borderColor: state.isFocused ? "#465dff" : "#E5E7EB", // focus/normal
      boxShadow: "none",
      minHeight: "42px",
      "&:hover": {
        borderColor: "#465dff",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#fff", // dropdown bg
      border: "1px solid #E5E7EB",
      borderRadius: "0.5rem",
      marginTop: "4px",
      zIndex: 9999,
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: 0,
      backgroundColor: "#fff",
      borderRadius: "0.5rem",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#465dff" // selected bg
        : state.isFocused
        ? "#E5E7EB" // hover bg
        : "#fff", // normal bg
      color: state.isSelected
        ? "#fff" // white text when selected
        : "#111827", // dark gray text
      fontSize: "14px",
      padding: "10px 12px",
      cursor: "pointer",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#111827", // selected value text color
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9ba6b7", // gray placeholder
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? "#465dff" : "#9ba6b7",
      "&:hover": {
        color: "#465dff",
      },
    }),
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <ReactSelect
        styles={customStyles}
        className="border-none outline-none w-full text-sm"
        classNamePrefix="rs"
        name={name}
        required={required}
        value={options.find((option) => option.value === value) || null}
        placeholder={`Select ${label}`}
        isClearable
        onChange={(item) => onChange(item && item.value)}
        options={options}
      />
    </div>
  );
}
