import React from 'react'
import "./Chat.css"
import Chat from "./Chat"
function Chats() {
    return (
        <div className="chats">
            <Chat
                name="Mark"
                message="YO what's up!"
                timestamp="40 seconds ago"
                profilePic="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQyMDA0NDgwMzUzNzcyNjA2/mark-zuckerberg_gettyimages-512304736jpg.jpg"
            />
        </div>
    )
}

export default Chats
