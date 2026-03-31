// src/features/playground/preview/PreviewSandbox.tsx
"use client";

import { useMemo } from "react";

type Props = {
  code: string;
  cssFiles?: string[];
};

export const PreviewSandbox = ({ code, cssFiles = [] }: Props) => {
  const srcDoc = useMemo(() => {
    const escapedCode = code
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$/g, "\\$");

    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    ${cssFiles.map((href) => `<link rel="stylesheet" href="${href}" />`).join("\n    ")}
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { margin: 0; padding: 0; overflow: auto; background: #010313; }
      #root { width: 100%; min-height: 100vh; }
      #error { 
        padding: 20px; 
        background: #fee; 
        color: #c00;
        white-space: pre-wrap;
        font-family: monospace;
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <div id="error"></div>

    <script>
      function reportError(err) {
        console.error('❌ Error:', err);
        const errorDiv = document.getElementById('error');
        if (errorDiv) {
          errorDiv.style.display = 'block';
          errorDiv.textContent = 'Error: ' + (err.message || String(err)) + '\\n\\n' + (err.stack || '');
        }
        
        parent.postMessage(
          {
            type: 'runtime-error',
            message: err.message || String(err),
            stack: err.stack || '',
          },
          '*'
        );
      }

      window.addEventListener('error', (e) => {
        reportError(e.error || new Error(e.message));
        e.preventDefault();
      });

      window.addEventListener('unhandledrejection', (e) => {
        reportError(e.reason);
        e.preventDefault();
      });
      
      console.log('🚀 Preview iframe loaded');
    </script>

    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@19.2.0",
        "react/": "https://esm.sh/react@19.2.0/",
        "react/jsx-runtime": "https://esm.sh/react@19.2.0/jsx-runtime",
        "react/jsx-dev-runtime": "https://esm.sh/react@19.2.0/jsx-dev-runtime",
        "react-dom": "https://esm.sh/react-dom@19.2.0",
        "react-dom/client": "https://esm.sh/react-dom@19.2.0/client"
      }
    }
    </script>

    <script type="module">
      try {
        console.log('📦 Loading compiled code...');
        
        const code = \`${escapedCode}\`;
        console.log('📝 Code length:', code.length);
        console.log('📝 First 300 chars:', code.substring(0, 300));
        
        // Create blob URL for the module
        const blob = new Blob([code], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        
        console.log('🔗 Module URL created:', url);
        
        // Import the module
        const module = await import(url);
        URL.revokeObjectURL(url);
        
        console.log('📦 Module loaded:', Object.keys(module));
        
        // Get React and ReactDOM
        const React = await import('react');
        const ReactDOM = await import('react-dom/client');
        
        console.log('⚛️ React loaded');
        
        // Get the App component
        const App = module.default || module.App;
        
        if (!App) {
          throw new Error('No App component found. Module exports: ' + Object.keys(module).join(', '));
        }
        
        console.log('✅ App component found:', typeof App);

        // Render
        const rootElement = document.getElementById('root');
        if (!rootElement) {
          throw new Error('Root element not found');
        }
        
        const root = ReactDOM.createRoot(rootElement);
        root.render(React.createElement(App));
        
        console.log('✅ Component rendered successfully');
        
        parent.postMessage({ type: 'success' }, '*');
      } catch (err) {
        console.error('❌ Preview error:', err);
        reportError(err);
      }
    </script>
  </body>
</html>
`;
  }, [code, cssFiles]);

  return (
    <iframe
      sandbox="allow-scripts allow-same-origin"
      srcDoc={srcDoc}
      className="w-full h-full border-none bg-black"
      title="preview"
    />
  );
};
