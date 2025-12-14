import ReactSelect from "react-select";

import { SearchableSelectProps } from "../../types/form";

export function DropDown({
  label,
  showLabel = true,
  name,
  options,
  required = false,
  value,
  onChange,
  searchable = true,
  onClick,
  sendLabel = false,
  loading = false,
  disabled = false,
}: SearchableSelectProps) {
  const getSelectedValue = () => {
    return options.find((option) => {
      return option.value === value;
    });
  };
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
      color: showLabel ? "#9ba6b7" : "#000", // gray placeholder
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? "#9ba6b7" : "#465dff",
      "&:hover": {
        color: "#000",
      },
    }),
  };
  return (
    <div className="flex flex-col gap-1">
      {showLabel && label && label !== "" && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <ReactSelect
        isDisabled={disabled}
        isLoading={loading}
        onFocus={onClick}
        isSearchable={searchable}
        styles={customStyles}
        className={`border-none outline-none w-full text-sm ${
          showLabel && "text-600"
        } placeholder:text-[#8c96a6]`}
        classNamePrefix="rs"
        name={name}
        required={required}
        value={getSelectedValue() || null}
        placeholder={`Select ${label}`}
        isClearable
        onChange={(item) => {
          const value: string = sendLabel ? item?.label : item?.value;
          onChange(item && value);
        }}
        options={options}
      />
    </div>
  );
}
