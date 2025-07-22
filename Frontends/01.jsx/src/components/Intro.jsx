import React from 'react'

const Intro = () => {
  const element = <h1 style={{ color: 'blue' }}>Hello, This is an Intro JSX</h1>;
  const name = 'John';
  const user = { firstName: 'John', lastName: 'Doe' };
  const cal = 2 + 2 - 1 * (4 / 2) + (4 * 5) - 3;

  return (
    <div>
      {element}
      <h1>Hello, {name}</h1>
      <h3>Welcome, {user.firstName} {user.lastName} !</h3>
      <p>Calculation Result: {cal}</p>
    </div>
  )
}

export default Intro