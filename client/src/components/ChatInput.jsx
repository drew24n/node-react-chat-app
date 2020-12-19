import React from "react";
import style from "../styles/ChatInput.module.scss";

function ChatInput({message, setMessage, dispatch, socket}) {
    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => dispatch(setMessage('')))
        }
    }

    return (
        <div className={style.container}>
            <textarea value={message} onChange={e => dispatch(setMessage(e.target.value))} autoFocus={true}
                      placeholder={'Type a message...'} onKeyPress={e => e.key === 'Enter' && sendMessage(e)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default ChatInput