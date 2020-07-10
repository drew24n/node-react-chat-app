import React from "react";
import style from "./app.module.scss";
import Chat from "../Chat/Chat";
import Login from "../Login/Login";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../redux/redux-store";

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
