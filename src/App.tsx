/* eslint-disable no-console */
import React, { ReactElement } from 'react';
//import env from './utils/environment';
import Soknaden from './pages/soknaden/soknaden';

function App() : ReactElement {

  return (
    <div className="App">
      <header className="App-header">
        <Soknaden />

      </header>
    </div>
  );
}

export default App;
