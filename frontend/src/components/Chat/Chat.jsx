import React, {useEffect} from "react";
import * as queryString from "query-string";
import io from "socket.io-client";
import {setMessageAction, setMessagesAction, setOnlineUsers} from "../../redux/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import style from "./Chat.module.scss";
import {Input} from "./Input/Input";
import {Messages} from "./Messages/Messages";
import {Header} from "./Header/Header";
import {setNameAction, setRoomAction} from "../../redux/loginReducer";
import messageSound from "../../assets/sounds/sound.mp3";

// export const socket = io('localhost:5000')
export const socket = io('https://node-socket-react-chat-app.herokuapp.com/')

export const Chat = ({location, history}) => {
    const dispatch = useDispatch()
    const chatState = useSelector(state => state.chat)
    const loginState = useSelector(state => state.login)

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
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
    }, [location.search, history, dispatch])

    useEffect(() => {
        socket.on('message', message => {
            let sound = new Audio(messageSound)
            const {name} = queryString.parse(location.search)
            dispatch(setMessagesAction(message))
            if (message.user !== name && message.user !== 'system message') sound.play().then(r => r)
        })
        socket.on('roomInfo', ({users}) => dispatch(setOnlineUsers(users)))
    }, [dispatch, location.search])

    return (
        <div className={style.container}>
            <Header users={chatState.onlineUsers}/>
            <Messages messages={chatState.messages} name={loginState.name}/>
            <Input message={chatState.message} socket={socket} setMessage={setMessageAction} dispatch={dispatch}/>
        </div>
    )
}
