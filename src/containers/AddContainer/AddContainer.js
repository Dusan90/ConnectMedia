import React from 'react'
import './AddContainer.scss'

function AddContainer({ children, errorMessage }) {
    return (
        <>
            <div className='mainAddContainer'>
                {children}
            </div>
            {errorMessage && <p style={{ color: 'red', marginLeft: '35px' }}>{errorMessage}</p>}
        </>
    )
}

export default AddContainer
