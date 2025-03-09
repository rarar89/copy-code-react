import { ReactNode, useRef } from 'react';
import { CopyCodeOptions } from '../types/CopyCodeOptions';
import { useCodeCopy } from '../hooks/useCopyCode';

export interface CopyCodeWrapperProps extends CopyCodeOptions {
  children: ReactNode;
  className?: string;
}

export const CopyCode = ({
  children, 
  className = '',
  ...options
}: CopyCodeWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Use the hook with the ref
  useCodeCopy(options, wrapperRef);
  
  return (
    <div ref={wrapperRef} className={`react-code-copy-wrapper ${className}`}>
      {children}
    </div>
  );
}; 