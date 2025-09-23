export interface OccupationProps {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SubOccupationProps {
  id: number;
  occupation_id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}
