import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import * as actionCreators from "./../../store/actions/user"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const error = useSelector(state => state.user.login_error)
    const token = useSelector(state => state.user.token)

    if(error){
        console.log("Error:",error)
    }

    const dispatch = useDispatch()
    const onLogin = (email, password) => dispatch(actionCreators.LogIn({email,password}))

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if(!email || !password){
            return alert("Please Enter Correct Data.")
        }
        onLogin(email,password)
    }

    console.log("Token:", token)


    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={onSubmitHandler}>
                <input value={email} onChange={event => setEmail(event.target.value)} placeholder="email"/>
                <input value={password} onChange={event => setPassword(event.target.value)} placeholder="password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
