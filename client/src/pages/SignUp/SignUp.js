import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import * as actionCreators from "./../../store/actions/user"

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const error = useSelector(state => state.user.signup_error)
    const token = useSelector(state => state.user.token)

    if(error){
        console.log("Error:",error)
    }

    const dispatch = useDispatch()
    const onSignUp = (email, password, name) => dispatch(actionCreators.SignUp({name,email,password}))

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if(!name || !email || !password){
            return alert("Please Enter Correct Data.")
        }
        onSignUp(email,password,name)
    }

    console.log("Token:", token)


    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={onSubmitHandler}>
                <input value={name} onChange={event => setName(event.target.value)} placeholder="name"/>
                <input value={email} onChange={event => setEmail(event.target.value)} placeholder="email"/>
                <input value={password} onChange={event => setPassword(event.target.value)} placeholder="password"/>
                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}

export default SignUp
