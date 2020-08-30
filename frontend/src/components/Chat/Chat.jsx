import React, {useEffect} from "react";
import * as queryString from "query-string";
import io from "socket.io-client";
import {setMessageAction, setMessagesAction} from "../../redux/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import style from "./Chat.module.scss";
import {Input} from "./Input/Input";
import {Messages} from "./Messages/Messages";
import {Header} from "./Header/Header";
import {setNameAction, setRoomAction} from "../../redux/loginReducer";

export const socket = io('localhost:5000')

export const Chat = ({location}) => {
    const dispatch = useDispatch()
    const chatState = useSelector(state => state.chat)

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        dispatch(setNameAction(name))
        dispatch(setRoomAction(room))
        if (!socket.connected) {
            socket.connect()
        }
        socket.emit('join', {name, room}, error => {
            if (error) alert(error)
        })
        return () => {
            socket.disconnect(true)
            socket.off()
            dispatch(setNameAction(''))
            dispatch(setRoomAction(''))
        }
    }, [location.search, dispatch])

    useEffect(() => {
        socket.on('message', message => dispatch(setMessagesAction(message)))
    }, [dispatch])

    return (
        <div className={style.container}>
            <Header/>
            <Messages messages={chatState.messages} name={useSelector(state => state.login.name)}/>
            <Input message={chatState.message} socket={socket} setMessage={setMessageAction} dispatch={dispatch}/>
        </div>
    )
}
