import React, { Suspense } from 'react';
import { GlobalStyles } from "./components/styles/GlobalStyles";
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import { getHistory, configStore } from "./containers/configureStore";
import RoutesComponent from './containers/shared/routes/RoutesComponent';

const store = configStore();

function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <Provider store={store}>
            <ConnectedRouter history={getHistory()}>
              <RoutesComponent/>
            </ConnectedRouter>
          </Provider>
          <GlobalStyles />
      </Suspense>
  );
}

export default App;
