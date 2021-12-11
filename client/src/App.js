import React, { useEffect } from "react";
import './App.css';
import { Route, Routes, Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat"
import SingleChat from "./pages/SingleChat/SingleChat"
import { useSelector, useDispatch } from "react-redux"
import * as actionCreators from "./store/actions/user"
import LogOut from "./pages/LogOut/LogOut";
import NewChat from "./pages/NewChat/NewChat";

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const onAutoLogin = () => dispatch(actionCreators.AutoLogin())

  useEffect(() => {
    onAutoLogin()
  }, [])

  return (
    <div className="App">
      <Routes>
        {token && <Route path="/chat/:id" element={<SingleChat />} />}
        {token && <Route path="/chat" element={<Chat />} />}
        {token && <Route path="/new_chat" element={<NewChat />} />}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
