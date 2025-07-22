import React from 'react'

import BasicPropsPassing from './components/BasicPropsPassing';
import PropswithDifferentDataTypes from './components/PropsWithDifferentDataTypes';

const App = () => {
  return (
    <div>
      <BasicPropsPassing />
      <PropswithDifferentDataTypes />
    </div>
  )
}

export default App