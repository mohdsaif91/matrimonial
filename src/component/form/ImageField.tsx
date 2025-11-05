import { memo } from "react";
import { ImageFieldProps, textFeildProps } from "../../types/form";

// Generic input field
export const ImageField = memo(
  ({
    label,
    name,
    required = false,
    onChange,
    multiple = false,
    formatType,
    showLabel = true,
  }: ImageFieldProps) => {
    return (
      <div className="flex flex-col gap-1">
        {showLabel && (
          <label className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          accept={formatType}
          type="file"
          multiple={multiple}
          name={name}
          required={required}
          onChange={(e) =>
            onChange(
              multiple ? e.target.files : e.target.files && e.target.files[0]
            )
          }
          className="rounded-xl w-full px-3 py-2 outline-[#465dff] bg-[#F0F3F8] text-[#333] placeholder:text-[#9ba6b7] placeholder:text-[14px]"
        />
      </div>
    );
  }
);
