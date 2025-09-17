import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { IValidationSummaryProps } from '@/types/forms/IValidationSummary';

const ValidationSummary = ({ errors, touched, isValid }: IValidationSummaryProps) => {
  const errorCount = Object.values(errors).filter(error => error).length;
  const touchedCount = Object.values(touched).filter(t => t).length;

  if (touchedCount === 0) return null;

  return (
    <div className={`p-4 rounded-lg mb-6 ${isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      <div className="flex items-center">
        {isValid ? (
          <FaCheckCircle className="text-green-600 mr-2" />
        ) : (
          <FaExclamationTriangle className="text-red-600 mr-2" />
        )}
        <div>
          {isValid ? (
            <p className="text-green-800 font-medium">Form is ready to submit!</p>
          ) : (
            <div>
              <p className="text-red-800 font-medium">
                Please fix {errorCount} error{errorCount !== 1 ? 's' : ''} before submitting:
              </p>
              <ul className="text-red-700 text-sm mt-2 list-disc list-inside">
                {Object.entries(errors)
                  .filter(([_, error]) => error)
                  .map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationSummary;
