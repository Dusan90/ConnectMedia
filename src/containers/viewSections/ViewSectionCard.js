import React from 'react'
import './viewSections.scss'
import x from '../../assets/img/Header/x.svg'

function ViewSectionCard({ label, description, customStyle, customDescriptionStyle }) {
    return (
        <div className='mainSectionCardDiv' style={customDescriptionStyle}>
            <div className='clipedDiv' dangerouslySetInnerHTML={{ __html: label }} style={customStyle} ></div>
            <div className='nonCliped' dangerouslySetInnerHTML={{ __html: description }}></div>
            <img src={x} alt="x" className='deleteButton' />
        </div>
    )
}

export default ViewSectionCard
