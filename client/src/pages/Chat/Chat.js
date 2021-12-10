import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { GetMessageRequest } from "./../../kaiwapb/chat_pb"
import { ChatServiceClient } from "./../../kaiwapb/chat_grpc_web_pb"
import { Link, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import ErrorModal from '../../components/ErrorModal/ErrorModal'
import ChatContact from '../../components/ChatContact/ChatContact'
import ImgSrc from "./../../shared/ImgSrc"

function Chat() {
    const token = useSelector(state => state.user.token)
    const email = useSelector(state => state.user.email)
    const [error, setError] = useState(null)
    const [contacts, setContacts] = useState([])
    
    useEffect(() => {
        const request = new GetMessageRequest();
        request.setEmail(email);
        request.setToken(token);

        const client = new ChatServiceClient("http://localhost:8080", {}, {});
        client.getMessage(request, {}, (err, ret) => {
            if(err){
                setError(err.message)
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
                    let pdata = [...people].filter(item => item !== email)
                    setContacts(pdata)
                }
            }
        });
    }, [])

    if(!token){
        return <Navigate to="/login" />
    }
    
    return (
        <section className="chat__container">
            {error && <ErrorModal msg={error} clearHandler={() => setError(null)}/>}
            <header className="chat__header">
                <h1><Link to="/">Kaiwa</Link></h1>
                <Link className="chat__user--button" to="/logout">LogOut</Link>
            </header>
            <div className="chat__content">
                {contacts.length > 0 ? (<div className="chat__user--main">
                    {
                        contacts.map(item => {
                            return (
                                <ChatContact key={item} email={item} name={item.split("@")[0]} img={ImgSrc.ProfileImage[Math.floor(Math.random() * 12)]} />
                            )
                        })
                    }
                    </div>) : (<h1 className="chat__content--head">No Contacts</h1>)
                }           
            </div>
            <div className="chat__footer"></div>
        </section>
    )
}

export default Chat


