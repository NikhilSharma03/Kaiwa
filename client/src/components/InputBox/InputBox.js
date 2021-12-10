import React from 'react'
import "./InputBox.css"

function InputBox({value, onChange, style, placeholder}) {
    return (
        <input value={value} 
            onChange={onChange} 
            style={{...style}} 
            placeholder={placeholder} 
            className="input__box" 
        />
    )
}

export default InputBox
