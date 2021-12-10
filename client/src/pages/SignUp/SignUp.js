import React, { useState } from 'react'
import "./SignUp.css"
import { useSelector, useDispatch } from "react-redux"
import * as actionCreators from "./../../store/actions/user"
import { Link, Navigate } from "react-router-dom"
import InputBox from '../../components/InputBox/InputBox'
import ErrorModal from '../../components/ErrorModal/ErrorModal'

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const error = useSelector(state => state.user.signup_error)
    const token = useSelector(state => state.user.token)

    const dispatch = useDispatch()
    const onSignUp = (email, password, name) => dispatch(actionCreators.SignUp({name,email,password}))
    const onErrorClear = () => dispatch(actionCreators.ClearSignUpError())

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if(!name || !email || !password){
            return alert("Please Enter Correct Data.")
        }
        onSignUp(email,password,name)
    }

    const clearErrorHandler = () => {
        onErrorClear()
    }

    if(token){
        return <Navigate to="/chat" />
    }
    
    return (
        <section className="signup__container">
            {error && <ErrorModal msg={error} clearHandler={clearErrorHandler}/>}
            <header className="signup__header">
                <h1><Link to="/">Kaiwa</Link></h1>
                <Link className="signup__user--button" to="/login">Login</Link>
            </header>
            <div className="signup__content">
                <h1>SignUP</h1>
                <form onSubmit={onSubmitHandler}>
                    <InputBox value={name} onChange={event => setName(event.target.value)} placeholder="Name"/>
                    <InputBox value={email} onChange={event => setEmail(event.target.value)} placeholder="Email"/>
                    <InputBox value={password} onChange={event => setPassword(event.target.value)} placeholder="Password"/>
                    <button type="submit">SignUp</button>
                </form>
            </div>
            <div className="signup__footer"></div>
        </section>
    )
}

export default SignUp
