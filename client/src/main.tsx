import React from 'react';

import ReactDOM from 'react-dom/client';
import GlobalStyle from './theme/GlobalStyle';
import { PodState } from './context/pods/podState';
import App from './App';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <PodState>
        <GlobalStyle />
        <App />
    </PodState>,
);
