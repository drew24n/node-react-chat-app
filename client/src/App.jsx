import React, {useEffect} from "react";
import style from "./styles/App.module.scss";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import {Switch, Route, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const history = useHistory()

    useEffect(() => {
        window.addEventListener("unhandledrejection", e => alert(e))
    }, [])

    return (
        <div className={style.container}>
            <Switch>
                <Route exact path={"/"} render={() => <Login loginState={state.login} dispatch={dispatch} history={history}/>}/>
                <Route path={"/chat"} render={() => <Chat state={state} dispatch={dispatch} history={history}/>}/>
            </Switch>
        </div>
    )
}

export default App
