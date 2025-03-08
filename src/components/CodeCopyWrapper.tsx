import React, { ReactNode, useRef } from 'react';
import { CodeBlockCopyOptions } from '../types/codeCopy';
import { useCodeCopy } from '../hooks/useCodeCopy';

export interface CodeCopyWrapperProps extends CodeBlockCopyOptions {
  children: ReactNode;
  className?: string;
}

export const CodeCopyWrapper = ({
  children, 
  className = '',
  ...options
}: CodeCopyWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Use the hook with the ref
  useCodeCopy(options, wrapperRef);
  
  return (
    <div ref={wrapperRef} className={`react-code-copy-wrapper ${className}`}>
      {children}
    </div>
  );
}; 