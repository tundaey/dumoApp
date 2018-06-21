import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './src/reducer'
import AuthContainer from './src/components/AuthContainer';
import SwitchNavigator from './src/components/SwitchNavigator'

const logger = createLogger()
const buildStore = () => {
    const store = createStore(
        reducer,
        applyMiddleware(logger, thunk)
    )

    return store
}

export const store = buildStore()

export default class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <SwitchNavigator/>
      </Provider>
    )
  }
}


