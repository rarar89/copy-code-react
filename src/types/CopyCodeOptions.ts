export interface CopyCodeOptions {
  /** CSS selector for code blocks */
  selector?: string;
  /** Position of the copy button */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Text to show when copied */
  copyMessage?: string;
  /** How long to show success message (ms) */
  copyMessageTimeout?: number;
  /** Custom classes for container */
  containerClassName?: string;
  /** Custom classes for button */
  buttonClassName?: string;
  /** Class for success state */
  successClassName?: string;
  /** Whether to highlight the code block when copied */
  highlightOnCopy?: boolean;
}