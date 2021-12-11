import React from 'react'
import "./ChatContact.css"
import { Link } from 'react-router-dom'

function ChatContact({name, img, email}) {
    return (
        <Link to={"/chat/"+email} className="chat__user--container">
            <div className="chat__user">
                <div className="chat__user--img__container">
                    <img src={img} alt="profile" />
                </div>
                <h1>{name}</h1>
                <p>{email}</p>
            </div>
        </Link>
    )
}

export default ChatContact
