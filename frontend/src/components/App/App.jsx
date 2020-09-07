import React, {useEffect} from "react";
import style from "./App.module.scss";
import {Chat} from "../Chat/Chat";
import {Login} from "../Login/Login";
import {BrowserRouter, Switch} from "react-router-dom";
import {Route} from "react-router";
import {Provider} from "react-redux";
import {store} from "../../redux/reduxStore";

export const App = () => {
    const catchAllUnhandledErrors = e => alert(e)

    useEffect(() => {
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
        return () => {
            window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
        }
    },[])

    window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
    return (
        <main className={style.container}>
            <Provider store={store}>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Switch>
                        <Route exact path={"/"} component={Login}/>
                        <Route path={"/chat"} component={Chat}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        </main>
    )
}
