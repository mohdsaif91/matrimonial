export interface ClientModuleProps {
  id?: number;
  slug: string;
  name: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  client_forms?: any[];
}

export interface ClientModuleField {
  id: number;
  client_module_id: number;
  display_name: string;
  field_name: string;
  field_type: string;
  validation: string;
  required: number;
  view_in_pdf: number;
  status: string;
  div_css: string;
  created_at: string;
  updated_at: string;
}

export interface GetStatusProps {
  field_id: number;
  field_name: string;
  display_name: string;
  value: string;
  field_type: string;
  required: boolean;
}
