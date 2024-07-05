export interface SignupFormValues extends FormData {
  name: string;
  email: string;
  password: string;
  // avatar?: FileList | null;
}

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean
}