import * as React from 'react';
import { Hello } from "./components/hello";

function App() {
  return (
    <div className="App">
      <h1>App (render denne headeren)</h1>,
      <Hello compiler="TypeScript" framework="React" />,
    </div>
  );
}

export default App;
