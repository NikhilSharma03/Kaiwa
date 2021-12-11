import React, { useEffect } from 'react'
import { Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import * as actionCreators from "./../../store/actions/user"

function LogOut() {
    const dispatch = useDispatch()
    const onLogOut = () => dispatch(actionCreators.LogOutHandler())

    useEffect(() => {
        onLogOut()
    },[])

    return (
        <Navigate to="/" />
    )
}

export default LogOut
