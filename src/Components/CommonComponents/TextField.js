import React from 'react'

const TextFieldCom = ({ type, name, value, onChange, className, index, placeholder, arialabel, id , style }) => {
    return (
        <input type={type} name={name} value={value} onChange={(e) => onChange(e, index)}
        style={style}  className={className} placeholder={placeholder} aria-label={arialabel} id={id}  />
    )
}

export default TextFieldCom