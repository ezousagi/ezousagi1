import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("System: Starting initialization...");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    console.log("System: Root created, rendering App...");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("System: Render complete.");
  } catch (err) {
    console.error("System Error during mount:", err);
    const log = document.getElementById('error-console');
    if (log) {
      log.style.display = 'block';
      log.textContent += '\nMount Error: ' + (err instanceof Error ? err.message : String(err));
    }
  }
} else {
  console.error("System Error: Element with ID 'root' not found.");
}