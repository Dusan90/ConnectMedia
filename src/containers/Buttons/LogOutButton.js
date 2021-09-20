import React from 'react'
import './Buttons.scss'

function LogOutButton({ label, colorization, handleClick, customStyles }) {
    return (
        <div className={`${colorization}`} onClick={handleClick} style={customStyles}>
            <p>{label}</p>
        </div>
    )
}

export default LogOutButton
