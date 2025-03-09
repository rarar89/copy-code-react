import { useEffect, RefObject } from 'react';
import { CopyCodeOptions } from '../types/CopyCodeOptions';
import { CopyIcon } from '../icons/CopyIcon';
import { CheckIcon } from '../icons/CheckIcon';

// Position classes mapping with standalone CSS (no Tailwind)
const positionClasses = {
  'top-right': 'react-code-copy-position-tr',
  'top-left': 'react-code-copy-position-tl',
  'bottom-right': 'react-code-copy-position-br',
  'bottom-left': 'react-code-copy-position-bl',
};

export const useCodeCopy = (
  options: CopyCodeOptions,
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
          background-color: rgb(50,58,80);
          border: 1px solid rgb(79,84,104);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          pointer-events: auto;
          color: currentColor;
          opacity: 0.8;
        }
        
        .react-code-copy-button:hover {
          background-color: rgb(79,84,104);
          border-color: rgb(86,90,105);
          opacity: 1;
        }
        
        .react-code-copy-button:focus {
          outline: none;
        }
        
        .react-code-copy-success {
          color:rgb(30, 218, 155);
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
    codeBlocks.forEach((codeBlock) => {
      // Skip if code block already has a copy button
      const parentPre = codeBlock.parentElement;
      if (!parentPre || parentPre.tagName !== 'PRE' || parentPre.querySelector('.react-code-copy-button')) {
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
      copyButton.innerHTML = CopyIcon;

      // Click handler to copy code
      const clickHandler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        
        let code = codeBlock.textContent || '';
        
        navigator.clipboard.writeText(code).then(() => {
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
              ${CheckIcon}
            </div>`;

          // Reset button after the timeout
          setTimeout(() => {
            copyButton.innerHTML = CopyIcon;
          }, copyMessageTimeout);
        }).catch(error => {
          console.error('Failed to copy code:', error);
          copyButton.innerHTML = `<div class="react-code-copy-fade-in" style="color: #ef4444;">Failed to copy!</div>`;
          
          setTimeout(() => {
            copyButton.innerHTML = CopyIcon;
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
    ref
  ]);
}; 