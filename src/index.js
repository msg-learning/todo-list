// External
import React from 'react';
import ReactDOM from 'react-dom';

// Application
import App from './App';
import StateProvider from './reducers/StateProvider.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <StateProvider>
        <App />
    </StateProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
