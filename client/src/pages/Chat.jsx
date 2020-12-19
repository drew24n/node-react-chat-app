import React, {useEffect, useMemo} from "react";
import * as queryString from "query-string";
import io from "socket.io-client";
import {setMessageAction, setMessagesAction, setOnlineUsers} from "../redux/chatReducer";
import style from "../styles/Chat.module.scss";
import Input from "../components/ChatInput";
import Messages from "../components/ChatMessages";
import Header from "../components/ChatTopSection";
import {setNameAction, setRoomAction} from "../redux/loginReducer";
import messageSound from "../assets/sounds/alert.mp3";

function Chat({state, dispatch, history}) {
    const socket = useMemo(() => {
        return process.env.NODE_ENV === 'development'
            ? io(process.env.REACT_APP_DEV)
            : io(process.env.REACT_APP_PROD)
    }, [])

    useEffect(() => {
        const {name, room} = queryString.parse(history.location.search)
        dispatch(setNameAction(name))
        dispatch(setRoomAction(room))
        if (!socket.connected) {
            socket.connect()
        }
        socket.emit('join', {name, room}, error => {
            if (error) {
                history.push('/')
                alert(error)
            }
        })
        return () => {
            socket.disconnect(true)
            socket.off()
            dispatch(setNameAction(''))
            dispatch(setRoomAction(''))
        }
    }, [history.location.search, history, dispatch, socket])

    useEffect(() => {
        socket.on('message', async message => {
            const sound = new Audio(messageSound)
            const {name} = queryString.parse(history.location.search)
            dispatch(setMessagesAction(message))
            if (message.user !== name && message.user !== 'system message') {
                await sound.play()
            }
        })
        socket.on('roomInfo', ({users}) => dispatch(setOnlineUsers(users)))
    }, [dispatch, history.location.search, socket])

    return (
        <div className={style.container}>
            <Header users={state.chat.onlineUsers} history={history} room={state.login.room}/>
            <Messages messages={state.chat.messages} name={state.login.name}/>
            <Input message={state.chat.message} socket={socket} setMessage={setMessageAction} dispatch={dispatch}/>
        </div>
    )
}

export default Chat
