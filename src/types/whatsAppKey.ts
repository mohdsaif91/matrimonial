export interface WhatsAppKeyProps {
  whatsapp_provider: string;
  name: string;
  token: string;
  phone_number: string;
  assigned_type: string;
  assigned_id: number;
  status: string;
  config: {
    setting: string;
  };
  id?: string;
}
