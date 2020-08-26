import React from "react";
import style from "./Header.module.scss";
import {Link} from "react-router-dom";
import {setNameAction, setRoomAction} from "../../../redux/loginReducer";
import {socket} from "../Chat";

export const Header = ({room, dispatch}) => {
    return (
        <div className={style.container}>
            <h2>Room: <br/>{room}</h2>
            <Link to={`/`} onClick={() => {
                dispatch(setNameAction(''))
                dispatch(setRoomAction(''))
                socket.emit('disconnect')
                socket.off()
            }}>
                <button>Quit</button>
            </Link>
        </div>
    )
}
