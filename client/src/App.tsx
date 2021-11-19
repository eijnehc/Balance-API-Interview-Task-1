import React, { FC } from 'react';
import styled from 'styled-components';

import { useUsersBalanceQuery } from './apis';

function App() {
  const { data, isLoading, error } = useUsersBalanceQuery();

  console.log(data);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
