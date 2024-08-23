import Header from '@content/Header';
import { createRoot } from 'react-dom/client';
import Dashboard from '@content/Dashboard';

import './content.css';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('content.css');
document.head.appendChild(link);

if (document.location.pathname === '/') {
  const root = createRoot(document.body);
  root.render(<Dashboard />);
} else {
  const root = createRoot(document.querySelector('#header').parentNode);
  root.render(<Header />);
}
