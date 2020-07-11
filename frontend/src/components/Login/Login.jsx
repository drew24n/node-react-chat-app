import React from "react";
import style from "./login.module.scss";
import {setNameAction, setRoomAction} from "../../redux/login-reducer";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Login = () => {
    const name = useSelector(state => state.login.name)
    const room = useSelector(state => state.login.room)
    const dispatch = useDispatch()

    return (
        <div className={style.container}>
            <h1>Login</h1>
            <div>
                <input placeholder="name" type="text" onChange={event => dispatch(setNameAction(event.target.value))}/>
                <input placeholder="room" type="text" onChange={event => dispatch(setRoomAction(event.target.value))}/>
                <Link onClick={e => (!name || !room) && e.preventDefault()} to={`/chat?name=${name}&room=${room}`}>
                    <button>Enter</button>
                </Link>
            </div>
        </div>
    )
}

export default Login