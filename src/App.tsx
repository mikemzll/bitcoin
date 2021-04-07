import React from 'react';
import { StoreContext } from 'storeon/react';
import store from './store/index';
import AppCore from './modules/core/components/AppCore/AppCore';

import './App.css';

function App() {
  return (
    <StoreContext.Provider value={store}>
      <AppCore />
    </StoreContext.Provider>
  );
}

export default App;
