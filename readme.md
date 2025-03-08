# React Code Copy

A lightweight React library that automatically adds copy buttons to code blocks.

## Installation

```bash
npm install react-code-copy
```

## Usage

### Method 1: Using the CodeBlock Component

Use the CodeBlock component directly for more control over individual code blocks.

```jsx
import { CodeBlock } from 'react-code-copy';
function CodeExample() {
return (
  <CodeBlock
    language="javascript"
    position="top-right"
    highlightOnCopy={true}
  >
    {function hello() { console.log("Hello, world!");}}
  </CodeBlock>
);
}
```
### Method 2: Using the Hook Directly

For advanced use cases, you can use the hook directly:

```jsx
mport { useCodeBlockCopy } from 'react-code-copy';
function CustomCodeComponent() {
  useCodeBlockCopy({
    selector: '.my-custom-code',
    position: 'bottom-right',
    copyMessage: 'Copied to clipboard!',
    copyMessageTimeout: 3000,
  });
  return (
  <div>
    <pre>
      <code className="my-custom-code">
      // Your code here
      </code>
    </pre>
  </div>
  );
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| selector | string | 'pre code' | CSS selector for code blocks |
| position | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' | 'top-right' | Position of the copy button |
| copyMessage | string | 'Copied' | Text to show when copied |
| copyTimeout | number | 2000 | How long to show success message (ms) |
| buttonClassNames | string | 'p-2 bg-base-200 rounded-md hover:bg-base-300 transition-colors' | Custom classes for button |
| successClassName | string | 'text-green-500' | Class for success state |
| highlightOnCopy | boolean | false | Whether to highlight the code block when copied |
| includeLineNumbers | boolean | false | Whether to include line numbers in copied text |

## License

MIT


