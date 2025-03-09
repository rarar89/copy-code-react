'use client';

import { ReactNode, useRef } from 'react';
import { CopyCodeOptions } from '../types/CopyCodeOptions';
import { useCopyCode } from '../hooks/useCopyCode';

export interface CopyCodeWrapperProps extends CopyCodeOptions {
  children: ReactNode;
  className?: string;
}

export function CopyCode({ children, className = '', ...options }: CopyCodeWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useCopyCode(options, containerRef);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
} 