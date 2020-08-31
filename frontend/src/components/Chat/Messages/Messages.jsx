import React from "react";
import style from "./Messages.module.scss";
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';

export const Messages = ({messages, name}) => {
    const myName = name.trim().toLowerCase()

    return (
        <ScrollToBottom className={style.container} behavior={'smooth'}>
            {messages.map((m, index) => {
                return (
                    <div style={myName !== m.user ? {margin: '20px 10px 20px auto'} : {margin: '20px auto 20px 10px'}}
                         key={index}>
                        <span style={myName !== m.user ? {color: 'red'} : {color: '#008800'}}>{m.user}: </span>
                        <span>{ReactEmoji.emojify(m.message)}</span>
                        <br/>
                    </div>
                )
            })}
        </ScrollToBottom>
    )
}