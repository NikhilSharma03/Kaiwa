import React, { useEffect, useState } from 'react'
import "./SingleChat.css"
import { ChatRequest, GetMessageRequest } from "./../../kaiwapb/chat_pb"
import { ChatServiceClient } from "./../../kaiwapb/chat_grpc_web_pb"
import { useSelector } from "react-redux"
import ErrorModal from '../../components/ErrorModal/ErrorModal'
import { Link, Navigate, useParams } from "react-router-dom"

function SingleChat(props) {
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState("") 
    const [error, setError] = useState(null)
    const token = useSelector(state => state.user.token)
    const email = useSelector(state => state.user.email)
    const receiver = useParams().id;
    
    useEffect(() => {
        const request = new GetMessageRequest();
        request.setEmail(email);
        request.setToken(token);

        const client = new ChatServiceClient("http://localhost:8080", {}, {});
        client.getMessage(request, {}, (err, ret) => {
            if(err){
                setError(err)
            } else {
                const data = ret.array[0]
                if(data.length > 0){
                    let chatData = []
                    for(let item of data){
                        const sender = item[0]
                        const receiver = item[1]
                        const message = item[2]
                        const time = item[3]
                        chatData.push({sender, receiver, message, time})
                    }
                    let singleChat = []
                    for(let item of chatData){
                        if(item.sender === receiver || item.receiver === receiver){
                            singleChat.push(item)
                        }
                    }
                    singleChat.sort(function(a,b){
                        let aDate = a.time.split(" ")[0]
                        let aTime = a.time.split(" ")[1].split(".")[0]
                        let bDate = b.time.split(" ")[0]
                        let bTime = b.time.split(" ")[1].split(".")[0]

                        let aT = aDate+" "+aTime
                        let bT = bDate+" "+bTime
                        console.log(aT, bT)
                        return new Date(aT) - new Date(bT);
                    });

                    setChat(singleChat)
                }
            }
        });
    }, [])


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
                setError(err)
            } else {
                const sender = ret.array[0]
                const receiver = ret.array[1]
                const message = ret.array[2]
                const time = ret.array[3]
                let newChatData = [...chat]
                newChatData.push({sender, receiver, message, time})
                setChat(newChatData)
                setMessage("")
            }
        });
    }


    if(!token){
        return <Navigate to="/login" />
    }
    
    return (
        <section className="singlechat__container">
            {error && <ErrorModal msg={error} clearHandler={() => setError(null)}/>}
            <header className="singlechat__header">
                <h1><Link to="/">Kaiwa</Link></h1>
                <Link className="singlechat__user--button" to="/logout">LogOut</Link>
            </header>
            <div className="singlechat__content">
                <div className="singlechat__item--container">
                    {
                        chat.length > 0 ? chat.map(item => {
                            if(item.sender === email){
                                return (<div key={Math.random()} className="singlechat__item--right"><h1 >{item.message}</h1></div>)
                            } else if(item.sender === receiver){
                                return (<div key={Math.random()} className="singlechat__item--left"><h1 >{item.message}</h1></div>)
                            }
                        }) : <h1 className="singlechat__item--head">No Chat</h1>
                    }
                </div>
                <form className="singlechat__item--msgbox" onSubmit={onSubmitHandler}>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter Message"/>
                    <button type="submit">Send</button>
                </form>
            </div>
            <div className="singlechat__footer"></div>
        </section>
    )
}

export default SingleChat


