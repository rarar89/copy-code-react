'use client';

import { useEffect, RefObject, ReactNode } from 'react';
import { CopyCodeOptions } from '../types/CopyCodeOptions';
import { CopyIcon } from '../icons/CopyIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { createRoot } from 'react-dom/client';

// Position classes mapping with standalone CSS (no Tailwind)
const positionClasses = {
  'top-right': 'copy-code-react-position-tr',
  'top-left': 'copy-code-react-position-tl',
  'bottom-right': 'copy-code-react-position-br',
  'bottom-left': 'copy-code-react-position-bl',
};

export const useCopyCode = (
  options: CopyCodeOptions,
  ref?: RefObject<HTMLElement | null>
) => {
  const {
    selector = 'pre code',
    position = 'top-right',
    copyMessage = 'Copied',
    copyMessageTimeout = 2000,
    containerClassName = 'copy-code-react-button-container',
    buttonClassName = 'copy-code-react-button',
    successClassName = 'copy-code-react-success',
    highlightOnCopy = false,
    customCopyIcon,
    customSuccessIcon,
  } = options;

  // Skip execution during SSR
  if (typeof window === 'undefined') {
    useEffect(() => {}, []);
    return;
  }

  useEffect(() => {
    // Use document as root element if no ref is provided
    const rootElement = ref?.current || document;

    // CSS for custom animations and positioning
    const style = document.createElement('style');
    if (!document.head.querySelector('#copy-code-react-styles')) {
      style.id = 'copy-code-react-styles';
      style.textContent = `
        .copy-code-react-wrapper pre {
          position: relative;
        }
        
        .copy-code-react-button-container {
          position: absolute;
          z-index: 100;
          pointer-events: auto;
        }
        
        .copy-code-react-position-tr {
          top: 8px;
          right: 8px;
        }
        
        .copy-code-react-position-tl {
          top: 8px;
          left: 8px;
        }
        
        .copy-code-react-position-br {
          bottom: 8px;
          right: 8px;
        }
        
        .copy-code-react-position-bl {
          bottom: 8px;
          left: 8px;
        }
        
        .copy-code-react-button {
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
        
        .copy-code-react-button:hover {
          background-color: rgb(79,84,104);
          border-color: rgb(86,90,105);
          opacity: 1;
        }
        
        .copy-code-react-button:focus {
          outline: none;
        }
        
        .copy-code-react-success {
          color:rgb(30, 218, 155);
        }
        
        @keyframes copy-code-react-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .copy-code-react-fade-in {
          animation: copy-code-react-fade-in 0.5s ease-in-out;
        }
        
        .copy-code-react-highlight {
          transition: filter 0.15s ease-in-out;
          -webkit-filter: invert(80%);
          filter: invert(80%);
        }
        
        .copy-code-react-flex {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `;
      document.head.appendChild(style);
    }

    // Find all code blocks within the root element
    const codeBlocks = rootElement.querySelectorAll(selector);

    // Array to keep track of buttons and roots for cleanup
    const cleanupFunctions: (() => void)[] = [];
    const rootsToCleanup: Array<{ root: ReturnType<typeof createRoot>, element: HTMLElement }> = [];

    // Add copy button to each code block
    codeBlocks.forEach((codeBlock) => {
      // Skip if code block already has a copy button
      const parentPre = codeBlock.parentElement;
      if (!parentPre || parentPre.tagName !== 'PRE' || parentPre.querySelector('.copy-code-react-button-element')) {
        return;
      }
      
      // Make sure the pre element has position relative for absolute positioning
      parentPre.style.position = 'relative';

      // Create container for the button
      const buttonContainer = document.createElement('div');
      buttonContainer.className = `${containerClassName} ${positionClasses[position]} copy-code-react-button-container-element`;

      // Create the copy button
      const copyButton = document.createElement('button');
      copyButton.className = `${buttonClassName} copy-code-react-button-element`;
      copyButton.setAttribute('aria-label', 'Copy code');
      
      // Create a container for React elements
      const iconContainer = document.createElement('div');
      copyButton.appendChild(iconContainer);
      
      // Render custom copy icon or default icon
      if (customCopyIcon) {
        const root = createRoot(iconContainer);
        root.render(customCopyIcon);
        rootsToCleanup.push({ root, element: iconContainer });
      } else {
        iconContainer.innerHTML = CopyIcon;
      }

      // Click handler to copy code
      const clickHandler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        
        let code = codeBlock.textContent || '';
        
        navigator.clipboard.writeText(code).then(() => {
          // Highlight the code block if requested
          if (highlightOnCopy && parentPre) {
            parentPre.classList.add('copy-code-react-highlight');
            setTimeout(() => {
              parentPre.classList.remove('copy-code-react-highlight');
            }, 400);
          }

          // Clear the icon container
          while (iconContainer.firstChild) {
            iconContainer.removeChild(iconContainer.firstChild);
          }
          
          // Create success container
          const successContainer = document.createElement('div');
          successContainer.className = `${successClassName} copy-code-react-flex copy-code-react-fade-in`;
          
          // Add copy message if provided
          if (copyMessage) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = copyMessage;
            successContainer.appendChild(messageDiv);
          }
          
          // Add success icon (custom or default)
          const successIconContainer = document.createElement('div');
          successContainer.appendChild(successIconContainer);
          
          if (customSuccessIcon) {
            const successRoot = createRoot(successIconContainer);
            successRoot.render(customSuccessIcon);
            rootsToCleanup.push({ root: successRoot, element: successIconContainer });
          } else {
            successIconContainer.innerHTML = CheckIcon;
          }
          
          // Replace the icon container with success container
          iconContainer.appendChild(successContainer);

          // Reset button after the timeout
          setTimeout(() => {
            // Clean up the success container
            while (iconContainer.firstChild) {
              iconContainer.removeChild(iconContainer.firstChild);
            }
            
            // Restore the original copy icon
            if (customCopyIcon) {
              const newRoot = createRoot(iconContainer);
              newRoot.render(customCopyIcon);
              rootsToCleanup.push({ root: newRoot, element: iconContainer });
            } else {
              iconContainer.innerHTML = CopyIcon;
            }
          }, copyMessageTimeout);
        }).catch(error => {
          console.error('Failed to copy code:', error);
          
          // Clear the icon container
          while (iconContainer.firstChild) {
            iconContainer.removeChild(iconContainer.firstChild);
          }
          
          // Show error message
          const errorDiv = document.createElement('div');
          errorDiv.className = 'copy-code-react-fade-in';
          errorDiv.style.color = '#ef4444';
          errorDiv.textContent = 'Failed to copy!';
          iconContainer.appendChild(errorDiv);
          
          setTimeout(() => {
            // Clean up the error message
            while (iconContainer.firstChild) {
              iconContainer.removeChild(iconContainer.firstChild);
            }
            
            // Restore the original copy icon
            if (customCopyIcon) {
              const newRoot = createRoot(iconContainer);
              newRoot.render(customCopyIcon);
              rootsToCleanup.push({ root: newRoot, element: iconContainer });
            } else {
              iconContainer.innerHTML = CopyIcon;
            }
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
      // Clean up event listeners
      cleanupFunctions.forEach(cleanup => cleanup());
      
      // Clean up React roots
      rootsToCleanup.forEach(({ root }) => {
        root.unmount();
      });
      
      // Remove button containers
      codeBlocks.forEach(codeBlock => {
        const parentPre = codeBlock.parentElement;
        if (parentPre) {
          const buttonContainer = parentPre.querySelector(`.copy-code-react-button-container`);
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
    customCopyIcon,
    customSuccessIcon,
    ref
  ]);
}; 