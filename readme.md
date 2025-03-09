# Code Copy React

<p align="center">
  <img src="https://github.com/rarar89/copy-code-react/blob/main/images/copy-code-block.gif?raw=true" alt="Copy Code Demo" />
</p>

A lightweight React library that automatically adds copy buttons to code blocks. Pass custom css classes to customize the button.


## Installation

Install using pnpm, npm or yarn

```bash
pnpm install code-copy-react
```

```bash
npm install code-copy-react
```

```bash
yarn add code-copy-react
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

CopyCode component also works with dangerouslySetInnerHTML:

```tsx
import { CopyCode } from 'code-copy-react';

function MyComponent() {
  return (
    <CopyCode>
      <div dangerouslySetInnerHTML={{ __html: '<pre><code>console.log("Hello, world!");</code></pre>' }} />
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
      copyMessage: 'Code Copied!',
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

## Development

### Running the Demo

To see the library in action and explore example implementations:

```bash
# Clone the repository
git clone https://github.com/rarar89/copy-code-react.git
cd copy-code-react

# Install dependencies
npm install

# Start the development server
npm run dev
```

The development server will start, and you can view the examples at `http://localhost:5173` (or the port shown in your terminal).

### Example Implementations

The repository includes several example implementations in the demo app (`src/App.tsx`). These examples showcase different configurations and use cases for the library.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT


