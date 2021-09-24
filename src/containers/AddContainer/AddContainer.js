import React from 'react'
import './AddContainer.scss'

function AddContainer({ children }) {
    return (
        <div className='mainAddContainer'>
            {children}
        </div>
    )
}

export default AddContainer
