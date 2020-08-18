import React from "react";
import style from "./App.module.scss";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import {Provider} from "react-redux";
import {store} from "./redux/reduxStore";

const App = () => {
    return (
        <main className={style.container}>
            <Provider store={store}>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Route exact path={"/"} component={Login}/>
                    <Route path={"/chat"} component={Chat}/>
                </BrowserRouter>
            </Provider>
        </main>
    )
}

export default App
