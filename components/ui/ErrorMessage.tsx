import { IErrorMessageProps } from '@/types/forms/IErrorMessage';

const ErrorMessage = ({ message, className = '' }: IErrorMessageProps) => {
  if (!message) return null;

  return (
    <div className={`text-red-600 text-sm mt-1 ${className}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;
