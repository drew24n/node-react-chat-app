import {combineReducers, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {loginReducer} from "./loginReducer";
import {chatReducer} from "./chatReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    chat: chatReducer
})

export const store = createStore(rootReducer, compose(composeWithDevTools() ? composeWithDevTools() : f => f))