import { Search } from "lucide-react";

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | "clientFormBtn" | "none";
  loading?: boolean;
}

export interface textFeildProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface DateFeildProps {
  label: string;
  value: string;
  onChange: (val: Date | string) => void;
}
export interface SelectFeildProps {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export interface CheckboxProps {
  label: string;
  required?: boolean;
  onChange: (value: boolean) => void;
  checked: boolean;
  value: number;
}

export interface SearchableSelectProps {
  label: string;
  name: string;
  options: RelOptions[];
  required?: boolean;
  value: string | number | boolean;
  onChange: (value: string | number) => void;
  searchable: boolean;
  onClick?: () => void;
  loading?: boolean;
}

export interface RelOptions {
  label: string;
  value: string | number;
}

export interface FormSchema {
  [key: string]: Field;
}

export interface Field {
  value?: string | number | boolean;
  type:
    | "text"
    | "textarea"
    | "select"
    | "date"
    | "time"
    | "dob"
    | "checkbox"
    | "searchabelSelect";
  name: string;
  label: string;
  required?: boolean;
  options?:
    | RelOptions[]
    | { label: string; value: string | number }[]
    | string[];
}

export interface staticClientFormTab {
  id: number;
  name: string;
}

export interface ClientFormItem {
  client_module_id: number;
  display_name: string;
  field_name: string;
  validation: string;
  required: boolean;
  view_in_pdf: boolean;
  status: boolean; // restricts values
  div_css: string;
  field_type: string;
}
