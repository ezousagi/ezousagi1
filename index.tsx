import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("System: React initializing...");

const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("System Error: Root element not found");
    return;
  }

  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log("System: Render triggered successfully");
  } catch (err) {
    console.error("System Error during render:", err);
  }
};

// DOMの読み込み完了を待ってから実行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}