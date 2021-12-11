import React, { useEffect, useState } from 'react'
import { ChatRequest, GetMessageRequest } from "./../../kaiwapb/chat_pb"
import { ChatServiceClient } from "./../../kaiwapb/chat_grpc_web_pb"
import { useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import InputBox from '../../components/InputBox/InputBox'
import ErrorModal from '../../components/ErrorModal/ErrorModal'

function NewChat(props) {
    const [receiver, setReceiver] = useState("") 
    const [message, setMessage] = useState("") 
    const [error, setError] = useState(null)
    const token = useSelector(state => state.user.token)
    const email = useSelector(state => state.user.email)
    const navigate = useNavigate()
    
    const onSubmitHandler = (event) => {
        event.preventDefault()
        const request = new ChatRequest();
        request.setSender(email);
        request.setReceiver(receiver);
        request.setMessage(message);
        request.setToken(token);

        const client = new ChatServiceClient("http://localhost:8080", {}, {});
        client.sendMessage(request, {}, (err, ret) => {
            if(err){
                setError(err.message)
            } else {
                navigate('/chat', { replace: true })
            }
        });
    }

    if(!token){
        return <Navigate to="/login" />
    }

    return (
        <section className="signup__container">
            {error && <ErrorModal msg={error} clearHandler={() => {setError(null)}}/>}
            <header className="signup__header">
                <h1><Link to="/">Kaiwa</Link></h1>
                <Link className="signup__user--button" to="/logout">LogOut</Link>
            </header>
            <div className="signup__content">
                <h1>New Chat</h1>
                <form onSubmit={onSubmitHandler}>
                    <InputBox value={receiver} onChange={event => setReceiver(event.target.value)} placeholder="Contact Mail"/>
                    <InputBox value={message} onChange={event => setMessage(event.target.value)} placeholder="Message"/>
                    <button type="submit">Send</button>
                </form>
            </div>
            <div className="signup__footer"></div>
        </section>
    )
}

export default NewChat


