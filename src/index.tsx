import { HotkeysProvider } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import App from 'App';
import 'assets/index.scss';
import { DrawerContextProvider } from 'context/DrawerContext';
import { GridContextProvider } from 'context/GridContext';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import reportWebVitals from 'reportWebVitals';
import { Hotkeys } from 'util/Hotkeys';

ReactDOM.render(
  <React.StrictMode>
    <GridContextProvider>
      <DrawerContextProvider>
        <HotkeysProvider>
          <Hotkeys>
            <App />
          </Hotkeys>
        </HotkeysProvider>
      </DrawerContextProvider>
    </GridContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
