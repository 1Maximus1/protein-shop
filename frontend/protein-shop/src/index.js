import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './css/index.css';
import './css/global.css';
import './css/footer.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
