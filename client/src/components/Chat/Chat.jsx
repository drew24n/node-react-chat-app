import React, {memo, useEffect} from "react";
import * as queryString from "query-string";
import io from "socket.io-client";
import {setMessageAction, setMessagesAction, setOnlineUsers} from "../../redux/chatReducer";
import style from "./Chat.module.scss";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";
import Header from "./Header/Header";
import {setNameAction, setRoomAction} from "../../redux/loginReducer";
import messageSound from "../../assets/sounds/sound.mp3";

// const socket = io('localhost:5000')
const socket = io('https://node-socket-react-chat-app.herokuapp.com')

function Chat({state, dispatch, history}) {
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
    }, [history.location.search, history, dispatch])

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
    }, [dispatch, history.location.search])

    return (
        <div className={style.container}>
            <Header users={state.chat.onlineUsers} history={history} room={state.login.room}/>
            <Messages messages={state.chat.messages} name={state.login.name}/>
            <Input message={state.chat.message} socket={socket} setMessage={setMessageAction} dispatch={dispatch}/>
        </div>
    )
}

export default memo(Chat)
