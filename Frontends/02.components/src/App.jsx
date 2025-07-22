import React from 'react'

import BasicFunctionalComponent from "./components/BasicFunctionalComponent";
import ComplexFunctionalComponent from './components/ComplexFunctionalComponent';
import FunctionalComponentLifecycle from './components/FunctionalComponentLifecycle';

const App = () => {
  return (
    <>
      <h1>App Work</h1>
      <BasicFunctionalComponent />
      <ComplexFunctionalComponent />
      <FunctionalComponentLifecycle />
    </>
  )
}

export default App