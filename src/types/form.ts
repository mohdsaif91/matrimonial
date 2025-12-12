import { Search } from "lucide-react";
import React from "react";
import { ContentEditableEvent } from "react-simple-wysiwyg";

export interface ButtonProps {
  text: string | React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

export interface textFeildProps {
  labelPosition?: string;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string | number;
  onChange: (value: string | number) => void;
  extraText?: string;
  showLabel?: boolean;
  disabled?: boolean;
}

export interface DateFeildProps {
  label: string;
  value: string | Date;
  onChange: (val: Date | string) => void;
  required: boolean;
  dateFormat?: string;
  showLabel?: boolean;
  showYear?: boolean;
}

export interface TimeFeildProps {
  label: string;
  value: string | Date;
  onChange: (val: Date | string) => void;
  required: boolean;
  name: string;
  showLabel: boolean;
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
  id?: string;
}

export interface SearchableSelectProps {
  label: string;
  name: string;
  options: RelOptions[];
  required?: boolean;
  value: string | number | boolean;
  onChange: (value: string | number | null) => void;
  searchable?: boolean;
  onClick?: () => void;
  loading?: boolean;
  placeholder?: string;
  sendLabel?: boolean;
  showLabel?: boolean;
  disabled?: boolean;
}

export interface ImageFieldProps {
  label: string;
  name: string;
  onChange: (value: any) => void;
  required: boolean;
  multiple?: boolean;
  formatType?: string;
  showLabel?: boolean;
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
  id?: number;
  client_module_id: number;
  display_name: string;
  field_name: string;
  validation: string;
  required: boolean;
  view_in_pdf: boolean;
  status: boolean; // restricts values
  div_css: string;
  field_type: string;
  show_in_advance_search: boolean;
  show_in_common: boolean;
}

export interface RichTextProps {
  label: string;
  value: string;
  onChange: (e: ContentEditableEvent | string) => void;
  required: boolean;
}

export interface LabelValueProps {
  label: string;
  value: string | number;
}
