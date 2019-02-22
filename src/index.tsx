import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/root/app';

const store = createStore(rootReducer);
const mountNode = document.querySelector(`#root`);


ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>, 
    mountNode);
