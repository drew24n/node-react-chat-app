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
                <input placeholder="name" type="text" autoFocus={true}
                       onChange={event => dispatch(setNameAction(event.target.value))}/>
                <input placeholder="room" type="text" onChange={event => dispatch(setRoomAction(event.target.value))}/>
                <Link onClick={e => (!name || !room || name.length > 10 || room.length > 10) && e.preventDefault()}
                      to={`/chat?name=${name}&room=${room}`}>
                    <button onClick={() => {
                        if (name.length > 10 || room.length > 10) alert('user name or room name can`t exceed 10 symbols')
                    }}>Enter
                    </button>
                </Link>
            </div>
        </div>
    )
}