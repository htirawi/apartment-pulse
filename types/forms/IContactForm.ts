export interface IContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface IContactFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  as?: string;
  rows?: number;
}
