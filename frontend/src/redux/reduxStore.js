import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {appReducer} from "./appReducer";
import {loginReducer} from "./loginReducer";
import {chatReducer} from "./chatReducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    chat: chatReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : f => f
))
