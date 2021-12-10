import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { GetMessageRequest } from "./../../kaiwapb/chat_pb"
import { ChatServiceClient } from "./../../kaiwapb/chat_grpc_web_pb"
import { Link, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function Chat() {
    const token = useSelector(state => state.user.token)
    const [error, setError] = useState(null)
    const [contacts, setContacts] = useState([])
    
    useEffect(() => {
        const request = new GetMessageRequest();
        request.setEmail("test@test.com");
        request.setToken("test@test.com");

        const client = new ChatServiceClient("http://localhost:8080", {}, {});
        client.getMessage(request, {}, (err, ret) => {
            if(err){
                setError(err)
            } else {
                const data = ret.array[0]
                if(data.length > 0){
                    let people = new Set()
                    for(let item of data){
                        const sender = item[0]
                        const receiver = item[1]
                        people.add(sender)
                        people.add(receiver)
                    }
                    setContacts([...people])
                }
            }
        });
    }, [])

    if(!token){
        return <Navigate to="/login" />
    }

    console.log("Contacts: ", contacts)
    
    return (
        <section className="chat__container">
            <header className="chat__header">
                <h1><Link to="/">Kaiwa</Link></h1>
                <Link className="chat__user--button" to="/logout">LogOut</Link>
            </header>
            <div className="chat__content">
                
            </div>
            <div className="chat__footer"></div>
        </section>
    )
}

export default Chat


