import React from "react";
import style from "./Messages.module.scss";

export const Messages = ({messages, name}) => {
    return (
        <div className={style.container}>
            {messages.map((m, index) => {
                return <div key={index}>
                    <span>{m.user}: </span>
                    {m.message}
                    <br/>
                </div>
            })}
        </div>
    )
}