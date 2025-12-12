export interface PaymentProps {
  client_id: string;
  payment_type: string;
  payment_mode: string;
  expected_amount: number;
  received_amount: number;
  payment_date: string | Date;
  followup_date: string | Date;
  brief: string;
}

export interface PaymentRow {
  payment_type: string;
  expected_amount: string | number | null;
  received_payment: string | number | null;
  payment_mode: string | null;
  payment_date: string | null;
  brief: string | null;
  payment_followup_date: string | null;
}

export interface PaymentPopupResponseProps {
  tableArr: PaymentRow[];
  client_id: string;
}
