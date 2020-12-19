import React from "react";
import style from "../styles/ChatTopSection.module.scss";

function ChatTopSection({users, history, room}) {
    return (
        <div className={style.container}>
            <div className={style.firstSection}>
                <h2>Chat: {room}</h2>
                <button onClick={() => history.push('/')}>Quit</button>
            </div>
            <div className={style.secondSection}>
                <span>Online users:</span>
                {users.map(user => <p key={user.id}>{user.name}</p>)}
            </div>
        </div>
    )
}

export default ChatTopSection