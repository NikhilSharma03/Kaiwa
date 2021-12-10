import React, { useState } from 'react'
import "./Login.css"
import { useSelector, useDispatch } from "react-redux"
import * as actionCreators from "./../../store/actions/user"
import { Link, Navigate } from "react-router-dom"
import InputBox from '../../components/InputBox/InputBox'
import ErrorModal from '../../components/ErrorModal/ErrorModal'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const error = useSelector(state => state.user.login_error)
    const token = useSelector(state => state.user.token)

    const dispatch = useDispatch()
    const onLogin = (email, password) => dispatch(actionCreators.LogIn({email,password}))
    const onErrorClear = () => dispatch(actionCreators.ClearLoginError())

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if(!email || !password){
            return alert("Please Enter Correct Data.")
        }
        onLogin(email,password)
    }

    const clearErrorHandler = () => {
        onErrorClear()
    }

    if(token){
        return <Navigate to="/chat" />
    }

    return (
        <section className="login__container">
            {error && <ErrorModal msg={error} clearHandler={clearErrorHandler}/>}
            <header className="login__header">
                <h1><Link to="/">Kaiwa</Link></h1>
                <Link className="login__user--button" to="/signup">SignUp</Link>
            </header>
            <div className="login__content">
                <h1>LogIn</h1>
                <form onSubmit={onSubmitHandler}>
                    <InputBox value={email} onChange={event => setEmail(event.target.value)} placeholder="Email"/>
                    <InputBox value={password} onChange={event => setPassword(event.target.value)} placeholder="Password"/>
                    <button type="submit">LogIn</button>
                </form>
            </div>
            <div className="login__footer"></div>
        </section>
    )
}

export default Login
