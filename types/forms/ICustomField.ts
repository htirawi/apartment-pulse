import React from 'react';

export interface ICustomFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  children?: (props: { field: any; meta: any }) => React.ReactNode;
  [key: string]: any;
}
