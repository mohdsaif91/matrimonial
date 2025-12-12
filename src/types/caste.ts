export interface CasteProps {
  religion_id: number;
  name: string;
  status: string;
}

export interface SubCasteProps {
  religion_id: number;
  cast_id: number;
  name: string;
  status: string;
}
