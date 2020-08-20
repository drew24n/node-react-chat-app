import React, {useEffect} from "react";
import style from "./Chat.module.scss";
import * as queryString from "query-string";
import io from "socket.io-client";
import {setMessage, setMessages} from "../../redux/chatReducer";
import {useDispatch, useSelector} from "react-redux";

let socket = io('localhost:5000')

const Chat = ({location}) => {
    const dispatch = useDispatch()
    const chatState = useSelector(state => state.chat)

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        socket.emit('join', {name, room}, () => {
        })

        console.log(socket)

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [location.search])

    useEffect(() => {
        socket.on('message', message => {
            dispatch(setMessages(message))
        }, [chatState.messages])
    })

    const sendMessage = (e) => {
        e.preventDefault()
        if (chatState.message) socket.emit('sendMessage', chatState.message, () => dispatch(setMessage('')))
    }

    return (
        <div className={style.container}>
            <h1>Chat</h1>
            <input type="text" value={chatState.message}
                   onChange={e => dispatch(setMessage(e.target.value))}
                   onKeyPress={e => e.key === 'Enter' && sendMessage(e)}
            />
        </div>
    )
}

export default Chat
