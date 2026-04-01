// src/features/playground/preview/sandbox-template.ts

export const createSandboxHtml = (code: string, cssFiles: string[]): string => {
  const cssLinks = cssFiles
    .map((file) => `<link rel="stylesheet" href="${file}" />`)
    .join("\n");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://cdn.tailwindcss.com"></script>
  ${cssLinks}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { margin: 0; padding: 0; overflow: auto; }
    #root { width: 100%; min-height: 100vh; }
    #error { 
      padding: 20px; 
      background: #fee; 
      color: #c00;
      white-space: pre-wrap;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <div id="error" style="display: none;"></div>
  
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
    function showError(msg) {
      const errorDiv = document.getElementById('error');
      errorDiv.style.display = 'block';
      errorDiv.textContent = msg;
      window.parent.postMessage({ type: 'error', message: msg }, '*');
    }

    window.addEventListener('error', (e) => {
      showError('Error: ' + e.message + '\\nat line ' + e.lineno);
      e.preventDefault();
    });

    window.addEventListener('unhandledrejection', (e) => {
      showError('Unhandled rejection: ' + e.reason);
      e.preventDefault();
    });

    try {
      // Import React
      const React = await import('react');
      const ReactDOM = await import('react-dom/client');
      
      // Convert compiled code to data URL module
      const compiledCode = \`${code.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`;
      
      // Create blob URL for the module
      const blob = new Blob([compiledCode], { type: 'text/javascript' });
      const moduleUrl = URL.createObjectURL(blob);
      
      // Import the user's module
      const userModule = await import(moduleUrl);
      URL.revokeObjectURL(moduleUrl);
      
      // Get the App component
      const App = userModule.default || userModule.App;
      
      if (!App) {
        throw new Error('No default export found. Component must export default.');
      }

      if (typeof App !== 'function') {
        throw new Error('Default export must be a React component (function).');
      }

      // Render
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(App));
      
    } catch (error) {
      showError(error.message + '\\n\\nStack:\\n' + error.stack);
    }
  </script>
</body>
</html>
  `.trim();
};
