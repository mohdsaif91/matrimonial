export interface DashboardProps {
  total_clients: number;
  last_30_days_clients: number;
  total_paid_profiles: number;
  last_30_days_paid_profiles: number;
  total_expired_memberships: number;
  total_nri_clients: number;

  total_tasks: number;
  urgent_tasks: number;
  todays_tasks: number;
  tasks_followup_today: number;

  total_leads: number;
  leads_followup_today: number;
  last_30_days_leads: number;

  clients_meetings: number;
  family_meetings: number;

  todays_birthdays: BirthdayItem[];
  todays_anniversaries: AnniversaryItem[];

  user_activity: UserActivity[];
  absent_users: AbsentUser[];
}

export interface BirthdayItem {
  client_id: number;
  client_name: string;
  mobile: string;
}

export interface AnniversaryItem {
  client_id: number;
  client_name: string;
  mobile: string;
}

export interface UserActivity {
  id: number;
  added_by: string;
  client_id: string;
  client_name: string;
  module: string;
  description: string;
  profile_id: string;
  action: string;
  created_at: string; // or Date if you convert
}

export interface AbsentUser {
  id: number;
  name: string;
  email: string;
  role: string;
}
