export interface CityProps {
  id: number;
  name: string;
  state_id: number;
  country_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CityProps {
  id: number;
  name: string;
  state_id: number;
  country_id: number;
  status: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  state: State;
  country: CountryProps;
}

export interface State {
  id: number;
  name: string;
  country_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CountryProps {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}
