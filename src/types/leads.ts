import { LabelValueProps } from "./form";

export interface LeadsProps {
  lead_name: string;
  contact_person_name: string;
  relation_with_lead: string;
  phone: string;
  alternate_phone: string;
  email: string;
  country_id: number;
  state_id: number;
  city_id: number;
  address: string;
  looking_for: string;
  budget_from: string;
  budget_to: string;
  other_details: string;
  profile_source_id: number;
  assign_to: number;
  status: string;
  id?: string;
}

export interface LeadFilterFormProps {
  filters: Record<string, any>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSearch: () => void;
  onReset: () => void;
  country: LabelValueProps[];
  state: LabelValueProps[];
  city: LabelValueProps[];
}
