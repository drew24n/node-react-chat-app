import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import 'normalize.css';
import {store} from "./redux/redux";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
    , document.getElementById('root')
)

serviceWorker.register()
