import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("App initialization started...");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React render call completed.");
  } catch (err) {
    console.error("Critical rendering error:", err);
  }
} else {
  console.error("Critical error: Target container 'root' not found.");
}