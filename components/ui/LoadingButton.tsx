import Spinner from '@/components/Spinner';
import { ILoadingButtonProps } from '@/types/forms/ILoadingButton';

const LoadingButton = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  variant = 'primary',
  size = 'md',
  disabled,
  className = '',
  ...props
}: ILoadingButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={classes}
    >
      {loading && (
        <div className="mr-2 h-4 w-4">
          <Spinner loading={true} />
        </div>
      )}
      {loading ? loadingText : children}
    </button>
  );
};

export default LoadingButton;
