import { useEffect, RefObject } from 'react';
import { CodeBlockCopyOptions } from '../types/codeCopy';

// Position classes mapping with standalone CSS (no Tailwind)
const positionClasses = {
  'top-right': 'react-code-copy-position-tr',
  'top-left': 'react-code-copy-position-tl',
  'bottom-right': 'react-code-copy-position-br',
  'bottom-left': 'react-code-copy-position-bl',
};

export const useCodeCopy = (
  options: CodeBlockCopyOptions,
  ref?: RefObject<HTMLElement | null>
) => {
  const {
    selector = 'pre code',
    position = 'top-right',
    copyMessage = 'Copied',
    copyMessageTimeout = 2000,
    containerClassName = 'react-code-copy-button-container',
    buttonClassName = 'react-code-copy-button',
    successClassName = 'react-code-copy-success',
    highlightOnCopy = false,
    includeLineNumbers = false,
  } = options;

  useEffect(() => {
    // Use document as root element if no ref is provided
    const rootElement = ref?.current || document;

    // CSS for custom animations and positioning
    const style = document.createElement('style');
    if (!document.head.querySelector('#react-code-copy-styles')) {
      style.id = 'react-code-copy-styles';
      style.textContent = `
        .react-code-copy-wrapper pre {
          position: relative;
        }
        
        .react-code-copy-button-container {
          position: absolute;
          z-index: 100;
          pointer-events: auto;
        }
        
        .react-code-copy-position-tr {
          top: 8px;
          right: 8px;
        }
        
        .react-code-copy-position-tl {
          top: 8px;
          left: 8px;
        }
        
        .react-code-copy-position-br {
          bottom: 8px;
          right: 8px;
        }
        
        .react-code-copy-position-bl {
          bottom: 8px;
          left: 8px;
        }
        
        .react-code-copy-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          background-color: rgba(200, 200, 200, 0.2);
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          pointer-events: auto;
        }
        
        .react-code-copy-button:hover {
          background-color: rgba(200, 200, 200, 0.4);
        }
        
        .react-code-copy-success {
          color: #10b981;
        }
        
        @keyframes react-code-copy-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .react-code-copy-fade-in {
          animation: react-code-copy-fade-in 0.5s ease-in-out;
        }
        
        .react-code-copy-highlight {
          transition: background-color 0.3s ease;
          background-color: rgba(80, 80, 80, 0.2) !important;
        }
        
        .react-code-copy-flex {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `;
      document.head.appendChild(style);
    }

    // Find all code blocks within the root element
    const codeBlocks = rootElement.querySelectorAll(selector);

    // Array to keep track of buttons for cleanup
    const cleanupFunctions: (() => void)[] = [];

    // Add copy button to each code block
    codeBlocks.forEach((codeBlock, index) => {
      // Skip if code block already has a copy button
      const parentPre = codeBlock.parentElement;
      if (!parentPre || parentPre.tagName !== 'PRE' || parentPre.querySelector('.react-code-copy-button')) {
        console.log(`Skipping code block ${index}: no parent pre or already has button`);
        return;
      }
      
      // Make sure the pre element has position relative for absolute positioning
      parentPre.style.position = 'relative';

      // Create container for the button
      const buttonContainer = document.createElement('div');
      buttonContainer.className = `${containerClassName} ${positionClasses[position]}`;

      // Create the copy button
      const copyButton = document.createElement('button');
      copyButton.className = `${buttonClassName}`;
      copyButton.setAttribute('aria-label', 'Copy code');
      copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>`;

      // Click handler to copy code
      const clickHandler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Copy button clicked!');
        
        let code = codeBlock.textContent || '';
        
        // If we don't want line numbers, remove them
        if (!includeLineNumbers) {
          // This assumes line numbers are in a span with a class like 'line-number'
          const tempEl = document.createElement('div');
          tempEl.innerHTML = codeBlock.innerHTML;
          const lineNumbers = tempEl.querySelectorAll('.line-number');
          lineNumbers.forEach(el => el.remove());
          code = tempEl.textContent || '';
        }
        
        navigator.clipboard.writeText(code).then(() => {
          console.log('Code copied to clipboard');
          // Highlight the code block if requested
          if (highlightOnCopy && parentPre) {
            parentPre.classList.add('react-code-copy-highlight');
            setTimeout(() => {
              parentPre.classList.remove('react-code-copy-highlight');
            }, copyMessageTimeout);
          }

          // Change button to show success with green check icon
          copyButton.innerHTML = `<div class="react-code-copy-flex react-code-copy-fade-in">
              <div class="${successClassName}">${copyMessage}</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
            </div>`;

          // Reset button after the timeout
          setTimeout(() => {
            copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="react-code-copy-fade-in">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>`;
          }, copyMessageTimeout);
        }).catch(error => {
          console.error('Failed to copy code:', error);
          copyButton.innerHTML = `<div class="react-code-copy-fade-in" style="color: #ef4444;">Failed to copy!</div>`;
          
          setTimeout(() => {
            copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="react-code-copy-fade-in">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            `;
          }, copyMessageTimeout);
        });
      };

      copyButton.addEventListener('click', clickHandler);
      cleanupFunctions.push(() => copyButton.removeEventListener('click', clickHandler));

      // Add button to container
      buttonContainer.appendChild(copyButton);

      // Add the button container to the pre element
      parentPre.appendChild(buttonContainer);
    });

    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
      // Only remove styles if this is the last instance using the hook
      codeBlocks.forEach(codeBlock => {
        const parentPre = codeBlock.parentElement;
        if (parentPre) {
          const buttonContainer = parentPre.querySelector(`.${containerClassName}`);
          if (buttonContainer) {
            parentPre.removeChild(buttonContainer);
          }
        }
      });
    };
  }, [
    selector,
    position,
    copyMessage,
    copyMessageTimeout,
    buttonClassName,
    containerClassName,
    successClassName,
    highlightOnCopy,
    includeLineNumbers,
    ref
  ]);
}; 