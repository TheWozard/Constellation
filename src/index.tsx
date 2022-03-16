import '@blueprintjs/core/lib/css/blueprint.css';
import App from 'App';
import 'assets/index.scss';
import { DrawerContextProvider } from 'context/DrawerContext';
import { GridContextProvider } from 'context/GridContext';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Hotkeys } from 'util/Hotkeys';

ReactDOM.render(
  <GridContextProvider>
    <DrawerContextProvider>
      <Hotkeys>
        <App />
      </Hotkeys>
    </DrawerContextProvider>
  </GridContextProvider>,
  document.getElementById('root')
);
