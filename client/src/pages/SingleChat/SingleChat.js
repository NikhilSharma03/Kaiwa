import React, { useEffect, useState } from 'react'
import { ChatRequest, GetMessageRequest } from "./../../kaiwapb/chat_pb"
import { ChatServiceClient } from "./../../kaiwapb/chat_grpc_web_pb"

function SingleChat() {
    const [chat, setChat] = useState([])
    const [sender, setSender] = useState("") 
    const [receiver, setReceiver] = useState("") 
    const [message, setMessage] = useState("") 
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const request = new GetMessageRequest();
        request.setEmail("test@test.com");

        const client = new ChatServiceClient("http://localhost:8080", {}, {});
        client.getMessage(request, {}, (err, ret) => {
            if(err){
                console.log(err)
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
                    setChat(chatData)
                }
            }
        });
    }, [])

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const request = new ChatRequest();
        request.setSender("test@test.com");
        request.setReceiver("test@2.com");
        request.setMessage("Hello 3");
        request.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjE2MzkxMzY5MTksImlkIjoiNjFiMzI4ZjJjZGJmMjEyNDZkODA0M2YxIn0.H7pWlWugjA4oQcqACjqfSmIxCEq_QuN8Q45WyfhaMg0");

        const client = new ChatServiceClient("http://localhost:8080", {}, {});
        client.sendMessage(request, {}, (err, ret) => {
            if(err){
                console.log(err)
            } else {
                console.log(ret)
            }
        });
    }

    console.log(chat)
    
    return (
        <div>
            <h1>SingleCHat</h1>
            <form onSubmit={onSubmitHandler}>
                <input value={sender} onChange={(e) => setSender(e.target.value)} placeholder="sender"/>
                <input value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="receiver"/>
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="message"/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default SingleChat


