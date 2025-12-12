export interface SendProfileProps {
  data: AttachProfileProps;
}

interface AttachProfileItemProps {
  name: string;
  mobile: string;
  photo: string;
  email: string;
}

export interface AttachProfileProps {
  sendToName: string;
  sendToMobile: string;
  sendToPhoto: string;
  sendToEmail: string;
  attachProfileName: string;
  attachProfileMobile: string;
  attachProfilePhoto: string;
  attachProfileEmail: string;
  subject: string;
  from_client_id: string;
  to_client_id: string;
}

interface SelectedProfileData {
  id: number;
  items: Items;
  shared_profiles: SharedProfiles;
  client_documents: SharedDocument[];
}

export interface ItemField {
  field_id: number;
  field_name: string;
  display_name: string;
  value: string | number | boolean | null;
  field_type: "text" | "dropdown" | "textArea" | "datepicker" | "richText";
  required: boolean;
}

export interface Items {
  [key: string]: ItemField;
}

export interface SharedProfiles {
  shared_profile_id: number;
  shared_with_user_id: number | null;
  shared_by: number;
  shared_at: string;
  is_shared: boolean;
  shared_profile_name: string | null;
  shared_profile_age: number | null;
  shared_profile_email: string | null;
  shared_profile_phone: string | null;
  documents: SharedDocument[];
}
export interface SharedDocument {
  id: number;
  file_path: string;
  file_type: string;
  uploaded_at: string;
}
