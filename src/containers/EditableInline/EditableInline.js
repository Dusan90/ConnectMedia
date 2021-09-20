import React, { useState } from 'react'
import DropDown from '../DropDown/DropDown'
import trash from '../../assets/img/SecondHeader/Icons3.svg'

import './EditableInline.scss'

const options = ['test', 'test2', 'test3']

function EditableInline({ state, handleEditableInlineStatus, handleEditableInlineDropDown }) {
    const [isItOpen, setIsItOpen] = useState(false)
    const [whichIsIn, setWhichIsIn] = useState('Categories')

    const handleChangeOptions = (value) => {
        handleEditableInlineDropDown(value)
        setWhichIsIn(value)
        setIsItOpen(false)
    }

    const changeAppirence = () => {
        setIsItOpen(prevProps => {
            return !prevProps
        })
    }
    return (
        <div className='mainEditable'>
            <div className='howMuchInfo'>
                <div className='section1'>
                    <div className='infocva'>
                        <p>Selected:</p>
                        <p>{state.checkboxList.length}</p>
                    </div>
                    <div onClick={changeAppirence} className='dropDownDiv'>
                        <DropDown label={whichIsIn} options={options} handleChangeOptions={handleChangeOptions} isItOpen={isItOpen} />
                    </div>
                </div>
                <div className='sectionWithTrash'>
                    <div className='col1' onClick={() => handleEditableInlineStatus('NOTRASH')}><p>NO TRASH</p></div>
                    <div className='col2' onClick={() => handleEditableInlineStatus('PUBLISHED')}><p>PUBLISHED</p></div>
                    <div className='col3' onClick={() => handleEditableInlineStatus('DRAFT')}><p>DRAFT</p></div>
                    <div className='col4' onClick={() => handleEditableInlineStatus('ERROR')}><p>ERROR</p></div>

                    <div className='trashDiv' onClick={() => handleEditableInlineStatus('TRASH')}><img src={trash} alt="trash" /></div>
                </div>
            </div>
        </div>
    )
}

export default EditableInline
