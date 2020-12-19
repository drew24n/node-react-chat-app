import React from "react";
import style from "../styles/ChatMessages.module.scss";
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';

function ChatMessages({messages, name}) {
    const myName = name.trim().toLowerCase()

    return (
        <ScrollToBottom className={style.container}>
            {messages.map((m, index) => {
                return (
                    <div className={style.dialogItem} key={index}
                         style={myName !== m.user
                             ? {margin: '20px 10px 20px auto'}
                             : {margin: '20px auto 20px 10px'}}
                    >
                        <span className={style.userName}
                            style={myName !== m.user
                            ? {color: 'red'}
                            : {color: 'green'}}
                        >{m.user}: </span>
                        <span>{ReactEmoji.emojify(m.message)}</span>
                        <br/>
                    </div>
                )
            })}
        </ScrollToBottom>
    )
}

export default ChatMessages