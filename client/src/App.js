import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat"
import SingleChat from "./pages/SingleChat/SingleChat"

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat/:id" element={<SingleChat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
