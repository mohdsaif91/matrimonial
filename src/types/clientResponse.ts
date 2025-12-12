export interface ClientDetailsResponseProps {
  client_id: number | null;
  shortlist_count: number | null;
  form_data: ClientFormData | null;
}

export interface ClientFormData {
  lead_id: string;
  sourced_from: string;
  profile_handled: string;
  profile_created: string;
  profile_visited: string;
  client_type: string;
  client_verification: string;
  name_of_the_contact_person: string;
  relation_with_member: string;
  whatsapp_number: string;
  mobile_number: string;
  contact_person_email: string;
  client_name: string;
  client_mobile: string;
  client_email: string;
  profile_comment: string;
  gender: string;
  marital_status: string;
  details: string;
  religion: string;
  caste: string;
  sub_caste: string;
  date_of_birth: string;
  time_of_birth: string;
  birth_of_place: string;
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
  open_for_other_caste: string;
  open_for_divorcee: string;
  health_screening_consent: string;
  eye_sight: string;
  believes_in_patri: string;
  native_town: string;
  native_state: string;
  willing_to_go_abroad: string;
  open_for_other_state: string;
  hobbies: string;
  nri_status: string;
  visa: string;
  disability: string;
  client_notes: string;
  schooling_and_additional_qualification: string;
  premium_college: string;
  residence: string;
  complete_residence_address: string;
  earn_in_currency: string;
  personal_income: string;
  occupation: string;
  occupation_details: string;
  ocupation_address: string;
  highest_qualification: string;
  father_name: string;
  fathers_occupation: string;
  fathers_qualification: string;
  father_occupation_details: string;
  father_and_mother_anniversary_date: string;
  mothers_name: string;
  mothers_occupation: string;
  mothers_qualification: string;
  mother_occupation_details: string;
  family_type: string;
  annual_family_income: string;
  from_marriage_budget: string;
  to_marriage_budget: string;
  vehicle_details: string;
  extended_family_details: string;
  do_you_have_any_siblings: string;
  father_is_alive: string;
  mother_is_alive: string;
  house_status: string;
  residing_country: string;
  residential_state: string;
  residential_city: string;
  fathers_mobile_number: string;
  mothers_mobile_number: string;
  package_type: string;
  membership_profile_status: string;
  registration_date: string;
  expiry_date: string;
  member_status: string;
  member_status_change_comment: string;
  registration_amount: string;
  registration_received_amount: string;
  registration_payment_mode: string;
  registration_payment_date: string;
  registration_brief: string;
  closure_amount: string;
  closure_received_amount: string;
  closure_payment_mode: string;
  closure_payment_date: string;
  closure_brief: string;
  other_amount: string;
  other_received_amount: string;
  other_payment_mode: string;
  other_payment_date: string;
  other_brief: string;
}

export interface ShortlistedClientProps {
  shortlisted_client_id: number;
  status: string;
  form_values: ClientFormData; // ✅ reuse previously created form interface
}

export interface ShortlistItemProps {
  client_id: number;
  shortlisted_by: number;
  shortlisted_by_user_name: string;
  shortlist_count: number;
  shortlisted_clients: ShortlistedClientProps[];
}

export interface ClientResponseProps {
  client_id: number | string;
  profile_id: number | string;
  response_status: string;
  client_remark: string;
  staff_remark: string;
  added_by: number | string;
  added_by_user_type: string;
  profile_documents?: ClientPhotoProps[];
  client_documents?: ClientPhotoProps[];
  client?: ClientProps;
  profile?: ClientProps;
  id?: string;
}

interface ClientProps {
  id: number | string;
  name: string;
}

interface ClientPhotoProps {
  file_path: string;
  id: number | string;
  type: string;
}
