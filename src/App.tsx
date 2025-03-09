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
      
      <section>
        <h2 style={{ color: '#4b5563' }}>Code blocks outside the wrapper</h2>
        <p>These code blocks won't have copy buttons:</p>
        
        <pre style={{ 
          background: '#f3f4f6', 
          color: '#374151',
          padding: '1rem',
          borderRadius: '6px',
          overflow: 'auto',
          border: '1px solid #e5e7eb'
        }}>
          <code>
            {`// This code block won't have a copy button
function Example() {
  return <div>Hello World</div>;
}`}
          </code>
        </pre>
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