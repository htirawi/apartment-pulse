export interface IValidationSummaryProps {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
}
