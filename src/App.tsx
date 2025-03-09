import { CopyCode } from ".";


function App() {

  return (
    <div className="App" style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#333',
      lineHeight: 1.6
    }}>
      <h1 style={{ 
        borderBottom: '2px solid #eaeaea', 
        paddingBottom: '0.5rem',
        color: '#5a25eb'
      }}>
        React Code Copy Demo
      </h1>
      
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        A lightweight library that adds copy buttons to code blocks.
      </p>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#4b5563' }}>Using CodeCopyWrapper</h2>
        <p>This component adds copy buttons to all code blocks within it.</p>
        
        <CopyCode>
          <div style={{ 
            background: '#f9fafb', 
            padding: '1.5rem 0', 
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ marginTop: 0 }}>Example code blocks:</h3>
            
            <pre style={{ 
              background: '#1e293b', 
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto'
            }}>
              <code>
                {`function hello() {
  console.log("Hello, world!");
}`}
              </code>
            </pre>
            
            <pre style={{ 
              background: '#1e293b', 
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto',
              marginTop: '1.5rem'
            }}>
              <code>
                {`const styles = {
  color: "red",
  fontSize: "16px"
};`}
              </code>
            </pre>
          </div>
        </CopyCode>
      </section>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#4b5563' }}>Custom Position (Bottom-Right)</h2>
        <p>You can customize the position of the copy button.</p>
        
        <CopyCode position="bottom-right">
          <div style={{ 
            background: '#f9fafb', 
            padding: '1.5rem 0', 
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <pre style={{ 
              background: '#1e293b', 
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto'
            }}>
              <code>
                {`// Position: bottom-right
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};`}
              </code>
            </pre>
          </div>
        </CopyCode>
      </section>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#4b5563' }}>Custom Copy Message</h2>
        <p>Change the message that appears after copying.</p>
        
        <CopyCode 
          copyMessage="Copied to clipboard!" 
          copyMessageTimeout={3000}
        >
          <div style={{ 
            background: '#f9fafb', 
            padding: '1.5rem 0', 
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <pre style={{ 
              background: '#1e293b', 
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto'
            }}>
              <code>
                {`// Custom copy message (top-left position)
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`}
              </code>
            </pre>
          </div>
        </CopyCode>
      </section>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#4b5563' }}>Highlight on Copy</h2>
        <p>Briefly highlight the code block when copied.</p>
        
        <CopyCode 
          highlightOnCopy={true}
          copyMessage=""
          copyMessageTimeout={500}
        >
          <div style={{ 
            background: '#f9fafb', 
            padding: '1.5rem 0', 
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <pre style={{ 
              background: '#1e293b', 
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto'
            }}>
              <code>
                {`// This code block will flash when copied (bottom-left position)
const colors = {
  primary: '#5a25eb',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6'
};

export default colors;`}
              </code>
            </pre>
          </div>
        </CopyCode>
      </section>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#4b5563' }}>Custom CSS Classes</h2>
        <p>Apply custom CSS classes to the copy button.</p>
        <style>
          {`
            .custom-container {
              top: 20px;
              right: 20px;
            }
            .custom-button {
              border-radius: 12px;
              background-color:rgb(182, 53, 147);
            }
            .custom-success {
              color:rgb(240, 235, 255);
              font-size: 14px;
              font-weight: 600;
            }
          `}
        </style>
        <CopyCode 
          containerClassName="react-code-copy-button-container custom-container"
          buttonClassName="react-code-copy-button custom-button"
          successClassName="react-code-copy-success custom-success"
        >
          <div style={{ 
            background: '#f9fafb', 
            padding: '1.5rem 0', 
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(46, 35, 35, 0.05)'
          }}>
            <pre style={{ 
              background: '#1e293b', 
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto'
            }}>
              <code>
                {`// Custom CSS classes example
export function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return \`\${day}/\${month}/\${year}\`;
}`}
              </code>
            </pre>
          </div>
        </CopyCode>
      </section>
      
      <section>
        <h2 style={{ color: '#4b5563' }}>Code blocks outside the wrapper</h2>
        <p>These code blocks won't have copy buttons:</p>
        
        <div style={{ 
            background: '#f9fafb', 
            padding: '1.5rem 0', 
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <pre style={{ 
              background: '#1e293b', 
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '6px',
              overflow: 'auto'
            }}>
          <code>
            {`// This code block won't have a copy button
function Example() {
  return <div>Hello World</div>;
}`}
          </code>
        </pre>
        </div>
      </section>
      
      <footer style={{ 
        marginTop: '3rem', 
        paddingTop: '1rem', 
        borderTop: '1px solid #eaeaea',
        fontSize: '0.875rem',
        color: '#6b7280',
        textAlign: 'center'
      }}>
        React Code Copy Demo
      </footer>
    </div>
  );
}

export default App; 