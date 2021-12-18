import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import "./ChatScreen.css";

function ChatScreen() {
    const [input, setInput] = useState([""]);


    const [messages, setMessages] = useState([
        {
            name: 'Mark',
            image: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQyMDA0NDgwMzUzNzcyNjA2/mark-zuckerberg_gettyimages-512304736jpg.jpg',
            message: "What's up!",
        },
        {
            name: "Mark",
            image: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQyMDA0NDgwMzUzNzcyNjA2/mark-zuckerberg_gettyimages-512304736jpg.jpg",
            message: "Hows it going!"
        },
        {
            message: "Hi! How are you Mark!"
        },
    ]);

    const handleSend = e => {

        e.preventDefault();
        setMessages([...messages, { message: input }]);
        setInput('');

    };

    return (

        <div className="chatScreen">
            <p className="chatScreen__timestamp">You matched with Mark on 12/04/21</p>

            {
                messages.map(message => (
                    message.name ? (
                        <div className="chatScreen__message">
                            <Avatar className="chatScreen__image"
                                alt={message.name}
                                src={message.image}
                            />
                            <p className="chatScreen__text" align="left">{message.message}</p>
                        </div>) : (
                        <div className="chatScreen__message">
                            <p className="chatScreen__textUser" align="left">{message.message}</p>
                        </div>

                    )
                ))
            }
            <div>
                <form className="chatScreen__input">
                    <input className="chatScreen__inputField"
                        align="left"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="type a message..." type="text" />
                    <button onClick={handleSend} className="chatScreen__inputButton">SEND</button>
                </form>
            </div>

        </div>
    );

}

export default ChatScreen;
