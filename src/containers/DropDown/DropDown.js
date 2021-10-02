import React from 'react'
import arrowDown from '../../assets/img/SecondHeader/arrowDown.svg'
// import '../../components/Home/Home.scss'
import './DropDown.scss'


function DropDown({ options, handleChangeOptions, handleAllOptions, label, isItOpen }) {



    return (
        <>
            <p className='mainInfoPtag' >{label} </p><img src={arrowDown} alt="arrow down" />
            {isItOpen && <div className='options'>
                <div onClick={() => handleAllOptions('All')}><p>{'All'}</p></div>
                {options?.map((el, i) => {
                    return <div key={i} onClick={() => handleChangeOptions(el)}><p>{el?.name ? el.name : 'No name'}</p></div>
                })}
            </div>}
        </>
    )
}

export default DropDown
