import React, {memo} from "react";
import style from "./Login.module.scss";
import {setNameAction, setRoomAction} from "../../redux/loginReducer";

function Login({history, loginState, dispatch}) {
    const loginHandler = (e) => {
        e.preventDefault()
        if (loginState.name && loginState.room) {
            history.push(`/chat?name=${loginState.name}&room=${loginState.room}`)
        }
    }

    const setNameHandler = (e) => {
        dispatch(setNameAction(e.target.value))
    }

    const setChatNameHandler = (e) => {
        dispatch(setRoomAction(e.target.value))
    }

    return (
        <div className={style.container}>
            <h1>Welcome to Chat!</h1>
            <form onSubmit={e => loginHandler(e)}>
                <div>
                    <input placeholder="user name" maxLength={20} autoFocus={true} onChange={setNameHandler}/>
                    <input placeholder="chat name" maxLength={20} onChange={setChatNameHandler}/>
                </div>
                <button type={'submit'}>Enter</button>
            </form>
        </div>
    )
}

export default memo(Login)