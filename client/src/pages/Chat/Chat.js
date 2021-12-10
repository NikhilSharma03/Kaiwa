import React, { useEffect, useState } from 'react'
import { GetMessageRequest } from "./../../kaiwapb/chat_pb"
import { ChatServiceClient } from "./../../kaiwapb/chat_grpc_web_pb"

function Chat() {
    const [chat, setChat] = useState([])
    const [error, setError] = useState(null)
    const [contacts, setContacts] = useState([])
    
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
                    let people = new Set()

                    for(let item of data){
                        const sender = item[0]
                        const receiver = item[1]
                        const message = item[2]
                        const time = item[3]
                        chatData.push({sender, receiver, message, time})
                        people.add(sender)
                        people.add(receiver)
                    }
                    
                    setChat(chatData)
                    setContacts([...people])
                }
            }
        });
    }, [])

    console.log("Chats: ", chat)
    console.log("Contacts: ", contacts)
    
    return (
        <div>
            
        </div>
    )
}

export default Chat


