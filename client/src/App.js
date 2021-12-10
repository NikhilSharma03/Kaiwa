import React, { useEffect } from "react";
import './App.css';
import { UserRequest } from "./kaiwapb/user_pb"
import { UserServiceClient } from "./kaiwapb/user_grpc_web_pb"

function App() {

  const SignUP = () => {
    const request = new UserRequest();
    request.setName("test");
    request.setPassword("test");
    request.setEmail("test@test.com");

    const client = new UserServiceClient("http://localhost:8080", {}, {});
    client.userSignUp(request, {}, (err, ret) => {
      console.log(err)
      console.log(ret)
    });
  }


  useEffect(() => {
    SignUP()
  }, [])
    
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
