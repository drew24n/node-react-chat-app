import React from "react";
import style from "./Login.module.scss";
import {setNameAction, setRoomAction} from "../../redux/loginReducer";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export const Login = () => {
    const name = useSelector(state => state.login.name)
    const room = useSelector(state => state.login.room)
    const dispatch = useDispatch()

    return (
        <div className={style.container}>
            <h1>Welcome to Chat!</h1>
            <div>
                <input placeholder="user name" type="text" autoFocus={true} maxLength={10}
                       onChange={event => dispatch(setNameAction(event.target.value))}/>
                <input placeholder="room name" type="text" maxLength={10}
                       onChange={event => dispatch(setRoomAction(event.target.value))}/>
                <Link onClick={e => (!name || !room || name.length > 10 || room.length > 10) && e.preventDefault()}
                      to={`/chat?name=${name}&room=${room}`}>
                    <button>Enter</button>
                </Link>
            </div>
        </div>
    )
}