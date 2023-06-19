import React from 'react';

import ReactDOM from 'react-dom/client';
import GlobalStyle from './theme/GlobalStyle';
import { NotificationState } from './context/notificationsContext/notificationState';
import { LogsState } from './context/logsContext/logsState';
import { TracesState } from './context/tracesContext/tracesState';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <BrowserRouter>
        <NotificationState>
            <LogsState>
                <TracesState>
                    <GlobalStyle />
                    <App />
                </TracesState>
            </LogsState>
        </NotificationState>
    </BrowserRouter>,
);
