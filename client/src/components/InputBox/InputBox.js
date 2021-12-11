import React from 'react'
import "./InputBox.css"

function InputBox({value, onChange, style, placeholder, type}) {
    return (
        <input value={value} 
            onChange={onChange} 
            style={{...style}} 
            placeholder={placeholder} 
            className="input__box" 
            type={type ? type : "text"}
        />
    )
}

export default InputBox
