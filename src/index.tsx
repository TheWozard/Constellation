import '@blueprintjs/core/lib/css/blueprint.css';
import App from 'App';
import 'assets/index.scss';
import { DrawerContextProvider } from 'context/DrawerContext';
import { BoardContextProvider } from 'context/BoardContext';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Hotkeys } from 'util/Hotkeys';

ReactDOM.render(
  <BoardContextProvider>
    <DrawerContextProvider>
      <Hotkeys>
        <App />
      </Hotkeys>
    </DrawerContextProvider>
  </BoardContextProvider>,
  document.getElementById('root')
);
