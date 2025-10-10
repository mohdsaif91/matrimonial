export interface ModuleProps {
  slug_key: string;
  name: string;
  permission: string[];
  id?: number;
}

export interface UpdateModuleProps {
  created_at: string;
  id: number;
  name: string;
  permission: string;
  slug: string;
  updated_at: string;
}

export interface ClientForm {
  id: number;
  client_module_id: number;
  display_name: string;
  field_name: string;
  field_type: string; // e.g. "text" | "dropdown" | "textArea" | "datepicker"
  validation: string;
  required: number; // 0 or 1 (could be boolean if backend changes)
  view_in_pdf: number; // 0 or 1
  status: string;
  div_css: string;
  options: string | null;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  value?: "";
}

export interface ClientModule {
  id: number;
  slug: string;
  name: string;
  status: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  client_forms: ClientForm[];
}

export type ClientModulesResponse = ClientModule[];

export interface FormValuesProps {
  id: number;
  value: string;
}
