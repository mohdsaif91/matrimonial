import { textFeildProps } from "../../types/form";

const TextArea = ({
  label,
  name,
  placeholder,
  required = false,
  value,
  onChange,
  showLabel = true,
}: textFeildProps) => {
  return (
    <div className="flex-1 flex-col gap-1">
      {showLabel && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        rows={6}
        name={name}
        placeholder={placeholder || label}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl w-full px-3 py-2 outline-[#465dff] bg-[#F0F3F8] text-[#333] placeholder:text-[#9ba6b7] placeholder:text-[14px]"
      />
    </div>
  );
};

export default TextArea;
