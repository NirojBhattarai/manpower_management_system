import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { IoBookmark } from 'react-icons/io5';

interface ButtonProps {
  text?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  className?: string;
  type?: 'button' | 'submit';
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  loadingText?: string;
}
const ExtendedButton = ({
  text = '',
  variant = 'outline',
  className,
  type,
  isLoading,
  onClick,
  disabled,
  loadingText,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'hover:bg-none px-5 py-3 border-[1.5] border-primary-400 rounded-sm text-primary-400 hover:text-primary-400',
        {
          'opacity-80': isLoading,
        },
        className
      )}
      type={type || 'button'}
      variant={variant}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <span className="flex space-x-1">
          <Loader2 className="mr-1 animate-spin" /> {loadingText}
        </span>
      ) : (
        <>
          <span className="flex justify-center items-center gap-1">
            <IoBookmark />
            {text}
          </span>
        </>
      )}
    </Button>
  );
};

export default ExtendedButton;
