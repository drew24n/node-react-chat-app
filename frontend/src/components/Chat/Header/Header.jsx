import React from "react";
import style from "./Header.module.scss";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const Header = ({users}) => {
    const loginState = useSelector(state => state.login)

    return (
        <div className={style.container}>
            <div>
                <h2>Chat: {loginState.room}</h2>
                <Link to={`/`}>
                    <button>Quit</button>
                </Link>
            </div>
            <div className={style.online}>
                <span>Online users:</span>
                {users.map(user => <p className={style.userItem} key={user.id}>{user.name}</p>)}
            </div>
        </div>
    )
}