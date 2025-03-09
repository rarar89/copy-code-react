# Code Copy React

![Copy Code Demo](https://github.com/rarar89/copy-code-react/blob/main/images/copy-code-block.gif?raw=true)

A lightweight React library that automatically adds copy buttons to code blocks. Pass custom css classes to customize the button.


## Installation

```bash
npm install code-copy-react
```

## Usage

### Method 1: Using the CopyCode wrapper Component

The CopyCode component automatically adds copy buttons to all code blocks within it. This is the simplest way to add copy functionality to specific sections of your app.

```tsx
import { CopyCode } from 'code-copy-react';

function MyComponent() {
  return (
    <CopyCode>
      <div>
        <h3>Example code block:</h3>
        <pre>
          <code>
            {`function hello() {
              console.log("Hello, world!");
            }`}
          </code>
        </pre>
      </div>
    </CopyCode>
  );
}

```

You can also customize the appearance and behavior of the copy buttons:

```tsx
import { CopyCode } from 'code-copy-react';

function MyComponent() {
  return (
    <CopyCode 
      position="bottom-right" 
      copyMessage="Copied!" 
      highlightOnCopy={true}
    >
      {/* Your code blocks here */}
    </CopyCode>
  );
}
```

### Method 2: Using the Hook Directly

For more control, you can use the useCodeCopy hook directly in your components. This allows you to target specific sections of your app.

```tsx

import { useCodeCopy } from 'code-copy-react';
import { useRef } from 'react';

function MyComponent() {
  // Create a ref to limit the scope of code blocks that will get copy buttons
  const containerRef = useRef(null);
  
  // Apply the hook with custom options
  useCodeCopy(
    { 
      position: 'top-left',
      copyMessage: 'Copied!',
      highlightOnCopy: true 
    }, 
    containerRef
  );
  
  return (
    <div ref={containerRef}>
      <pre>
        <code>
          {`// This code block will have a copy button
function example() {
  return "Hello world!";
}`}
        </code>
      </pre>
    </div>
  );
}

```
Without a ref, the hook will apply to all code blocks in the document:

```tsx
import { useCodeCopy } from 'code-copy-react';

function MyComponent() {
  useCodeCopy({import { useCodeCopy } from 'code-copy-react';

function MyComponent() {
  // Add copy buttons to all code blocks in the document
  useCodeCopy({ 
    selector: 'code',
  });
  
  return (
    <div>
      {/* Your content */}
    </div>
  );
}
```

## Options
Both the CopyCode component and useCodeCopy hook accept the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| selector | string | 'pre code' | CSS selector for code blocks |
| position | string | 'top-right' | Position of the copy button. Options: 'top-right', 'top-left', 'bottom-right', 'bottom-left' |
| copyMessage | string | 'Copied' | Message to show after copying |
| copyMessageTimeout | number | 2000 | Time in milliseconds to show the success message |
| containerClassName | string | 'react-code-copy-button-container' | Class name for the button container |
| buttonClassName | string | 'react-code-copy-button' | Class name for the copy button |
| successClassName | string | 'react-code-copy-success' | Class name for success message |
| highlightOnCopy | boolean | false | Whether to highlight the code block when copied |

## License

MIT


