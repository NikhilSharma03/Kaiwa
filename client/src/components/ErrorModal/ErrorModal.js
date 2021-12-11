import React from 'react'
import "./ErrorModal.css"

function ErrorModal({msg, clearHandler}) {
    return (
        <React.Fragment>
            <div className="modal__backdrop"></div>
            <div className="modal__box">
                <h1>Error</h1>
                <p>{msg ? msg : "Something went wrong"}</p>
                <button onClick={clearHandler}>Clear</button>
            </div>
        </React.Fragment>
    )
}

export default ErrorModal
