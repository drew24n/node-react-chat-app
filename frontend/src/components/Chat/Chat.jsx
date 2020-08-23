import React, {useEffect} from "react";
import * as queryString from "query-string";
import io from "socket.io-client";
import {setMessage, setMessages} from "../../redux/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import style from "./Chat.module.scss";
import {Input} from "./Input/Input";
import {Messages} from "./Messages/Messages";

let socket = io('localhost:5000')

export const Chat = ({location}) => {
    const dispatch = useDispatch()
    const chatState = useSelector(state => state.chat)

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        socket.emit('join', {name, room}, () => {
        })
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [location.search])

    useEffect(() => {
        socket.on('message', message => dispatch(setMessages(message)))
    }, [dispatch])

    return (
        <div className={style.container}>
            <h2>roomName</h2>
            <Messages/>
            <Input message={chatState.message} socket={socket} setMessage={setMessage} dispatch={dispatch}/>
        </div>
    )
}
