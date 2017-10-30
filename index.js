import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './app/root_saga';
import rootReducers from './app/root_reducer';
import App from './app/App';
import { AppContainer } from 'react-hot-loader';
import logger from 'redux-logger';

if (module.hot) module.hot.accept();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware, logger)
);

let sagaTask = sagaMiddleware.run(function* () {
  yield RootSaga();
});

// and react will render the whole stuff into the div with hot module stuff
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App/>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./app/root_reducer', () => {
    store.replaceReducer(require('./app/root_reducer').default);
  });

  // Enable Webpack hot module replacement for sagas
  module.hot.accept('./app/root_saga', () => {
    const getNewSagas = require('./app/root_saga').default;
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(function* () {
        yield getNewSagas();
      });
    });
  });

  // Enable Webpack hot module replacement for the app
  module.hot.accept('./app/App', () => {
    
    const NextApp = require('./app/App').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );

  });
}