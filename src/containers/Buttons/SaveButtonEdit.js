import React from 'react'
import './Buttons.scss'

function SaveButtonEdit({ labeltext, colorization, customStyle, handleButtonActive }) {
    return (
        <div onClick={handleButtonActive} className={`${colorization}`} style={customStyle && customStyle}>
            <p>{labeltext}</p>
        </div>
    )
}

export default SaveButtonEdit
