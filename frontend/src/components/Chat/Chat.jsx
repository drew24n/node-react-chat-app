import React, {useEffect} from "react";
import style from "./Chat.module.scss";
import * as queryString from "query-string";
import io from "socket.io-client";

const Chat = ({location}) => {
    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        let socket = io('localhost:5000')
        socket.emit('join', {name, room}, () => {})

        console.log(socket)

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [location.search])

    return (
        <div className={style.container}>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat
