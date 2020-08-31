import React from "react";
import style from "./Login.module.scss";
import {setNameAction, setRoomAction} from "../../redux/loginReducer";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export const Login = () => {
    const loginState = useSelector(state => state.login)
    const dispatch = useDispatch()

    return (
        <div className={style.container}>
            <h1>Welcome to Chat!</h1>
            <form>
                <input placeholder="chat" type="text" maxLength={10} autoFocus={true}
                       onChange={event => dispatch(setRoomAction(event.target.value))}/>
                <input placeholder="nickname" type="text" maxLength={10}
                       onChange={event => dispatch(setNameAction(event.target.value))}/>
                <Link onClick={e => (!loginState.name || !loginState.room) && e.preventDefault()}
                      to={`/chat?name=${loginState.name}&room=${loginState.room}`}>
                    <button>Enter</button>
                </Link>
            </form>
        </div>
    )
}