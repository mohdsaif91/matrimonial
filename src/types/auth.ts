export interface Login {
  email: string;
  password: string;
}

export interface ResetPasswordProps {
  email: string;
  password: string;
  c_password: string;
  token: string;
}
