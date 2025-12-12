interface DOB {
  year: string;
  month: string;
  day: string;
}

export interface Client {
  profile_id: string;
  lead_id: string;
  name: string;
  email: string;
  mobile: string;
  gender: "male" | "female" | "other" | string;
  marital_status: string;
  open_for_divorce: boolean;
  occupation_id: number;
  profile_visited: number;
  sourced_from_id: number;
  profile_handled_by: number;
  profile_created_by: number;
  membership_profile: string;
  premium_college: string;
  active: boolean;
  client_type: string;
  client_verification: string;
  religion_id: number;
  cast_id: number;
  sub_caste_id: number;
  country: string;
  state: string;
  city: string;
  native_town: string;
  native_state: string;
  contact_person_name: string;
  contact_person_address: string;
  whatsapp_number: string;
  contact_person_email: string;
  date_of_birth: string; // ISO date string (e.g. "1995-06-15")
  time_of_birth: string; // "HH:mm:ss"
  birth_place: string;
  astrologically: string;
  gotra: string;
  height: string;
  weight: string;
  complexion: string;
  personality: string;
  drinking_habits: string;
  eating_habits: string;
  smoking_habits: string;
  partner_preferences: string;
  open_for_other_caste: boolean;
  open_for_other_state: boolean;
  health_screening_consent: boolean;
  eye_sight: string;
  believes_in_patri: boolean;
  willing_to_go_abroad: boolean;
  nri_status: boolean;
  visa: string;
  disability: boolean;
  hobbies: string;
  profile_comment: string;
  details: string;
  client_notes: string;
}

export interface FormSubmitItemProps {
  field_id: number;
  value: string;
}
export interface FormSubmitProps {
  form_fields: FormSubmitItemProps[];
  client_id: number;
}
export interface UpdateFormSubmitProps {
  clientData: FormSubmitProps;
  id: number;
}

export interface ImageSubmitProps {
  client_id: number;
  type: string | string[];
  file: any;
}

export interface clientFiltersProps {
  onSubmit: (items: FormFilterProps) => void;
}

export interface FormFilterProps {
  profileId: string;
  leadId: string;
  clientName: string;
  clientMobile: string;
  clientEmail: string;
  gender: string;
  religion: string;
  caste: string;
  occupation: string;
  maritalStatus: string;
  fromDate: Date | null;
  toDate: Date | null;
}

export interface ClientDocumentsProps {
  file_path: string;
  file_type: string;
  id: number;
  uploaded_at: string;
}

export interface ClientData {
  client_id: number;
  id?: number;
  modules: Module[];
  client_documents: ClientDocumentsProps[];
  shared_profiles: SharedProfile[];
  items?: ClientItems;
  client_profile_id: string;
}

export interface SearchClientDataProps {
  client_id: number;
  id?: number;
  forms: any[];
  documents: ClientDocumentsProps[];
}

export interface Module {
  module_id: number;
  module_name: string;
  module_slug: string;
  fields: Field[];
}

export interface Field {
  field_name: string;
  display_name: string;
  value: string | number | boolean | null;
  field_type: FieldType;
  required: boolean;
  field_id?: number | string;
}

export type FieldType =
  | "text"
  | "textArea"
  | "dropdown"
  | "datepicker"
  | "checkbox"
  | "radio";

export interface ClientModuleField {
  id: number;
  client_module_id: number;
  display_name: string;
  field_name: string;
  field_type: string; // e.g., "text", "image", "dropdown", etc.
  validation: string; // could be "none", "email", "number", etc.
  required: number; // 0 or 1
  view_in_pdf: number; // 0 or 1
  status: string; // e.g., "active", "inactive"
  div_css: string;
  options: string | null; // can contain JSON or comma-separated values
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface AdvanceSearchProps {
  onSubmit: (arr: any[]) => void;
  onReset: () => void;
  clientFormModuleData: any[];
  handleChangeMethod: (arr: any) => void;
  filters: any;
  formValues: any;
}

export interface SendProfileProps {
  from_client_id: number | string;
  to_client_id: number | string;
}

export interface ClientField {
  field_id: number;
  field_name: string;
  display_name: string;
  value: string | number | boolean | null;
  field_type: "text" | "dropdown" | "textArea" | "datepicker" | "richText";
  required: boolean;
}

export interface ClientItems {
  [key: string]: ClientField; // Dynamic keys for all form fields
}

export interface ClientDataProps {
  id: number;
  items: ClientItems;
}

export interface SharedProfile {
  shared_profile_id: number;
  shared_with_user_id: number | null;
  shared_at: string; // ISO datetime string
  documents: SharedDocument[];
}

export interface SharedDocument {
  id: number;
  file_path: string;
  file_type: "main_photo" | "profile_photo" | "bio_data"; // restrict to known values
  uploaded_at: string; // ISO datetime string
}

export interface CommonFilterProps {
  filters: any[];
}

interface ItemsProps {
  items: ClientItems;
}

export interface ClientDetailsprops {
  data: ClientData;
  onClose: () => void;
}

export interface FieldItem {
  field_id: number;
  field_name: string;
  display_name: string;
  value: string | number | boolean | null;
  field_type: "text" | "dropdown" | "textArea" | "richText" | "datepicker";
  required: boolean;
}

export interface Items {
  [key: string]: FieldItem;
}

export interface SharedDocument {
  id: number;
  file_path: string;
  file_type: string;
  uploaded_at: string;
}

export interface SharedProfile {
  shared_profile_id: number;
  shared_with_user_id: number | null;
  shared_by: number;
  shared_at: string;
  is_shared: boolean;
  shared_profile_name: string;
  shared_profile_age: number;
  documents: SharedDocument[];
}

export interface ClientProfileResponse {
  id: number;
  items: Items;
  shared_profiles: SharedProfile[];
}
