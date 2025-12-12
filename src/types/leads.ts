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
  created_by?: string;
  status: string;
  id?: string;
  task_id?: string;
}

export interface LeadFilterFormProps {
  // filters: Record<string, any>;
  // onChange: (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => void;
  setFilterData: (e: any) => void;
  filterData: any;
  onSearch?: (f: any) => void;
  assigneTo: LabelValueProps[];
  onReset: () => void;
  country: LabelValueProps[];
  state: LabelValueProps[];
  city: LabelValueProps[];
}

export interface LeadProps {
  lead_id: string | number;
  comment: string;
  followup_required: string;
  planned_followup_date: string;
  created_date: string;
  lead_status: string;
  task_id?: string;
}
