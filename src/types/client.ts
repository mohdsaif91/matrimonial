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

export interface ClientData {
  client_id: number;
  modules: Module[];
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
}

export type FieldType =
  | "text"
  | "textArea"
  | "dropdown"
  | "datepicker"
  | "checkbox"
  | "radio";
