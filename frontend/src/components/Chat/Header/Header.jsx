import React from "react";
import style from "./Header.module.scss";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const Header = () => {
    const loginState = useSelector(state => state.login)

    return (
        <div className={style.container}>
            <h2>Room: {loginState.room}</h2>
            <Link to={`/`}>
                <button>Quit</button>
            </Link>
        </div>
    )
}