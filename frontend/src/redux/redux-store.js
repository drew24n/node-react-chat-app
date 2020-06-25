import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    app: appReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : f => f
))
