import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MainIcon from '../../assets/img/Header/Frame.svg'
import User from '../../assets/img/Header/Group5378.svg'
import Bell from '../../assets/img/Header/Icons.svg'
import ArrowDown from '../../assets/img/Header/Vector.svg'
import LogOutButton from '../../containers/Buttons/LogOutButton'
import './Header.scss'

const Bars = ({ active }) => {
    return <div className='bars' style={{ visibility: !active && 'hidden' }}>
        <div className='firstBlueBar'></div>
        <div className='secondBlueBar'></div>
        <div className='whiteBar'></div>
    </div>
}

function Header() {
    const history = useHistory()
    const [isItClicked, setIsItClicked] = useState(false)
    const [isItClickedChangePass, setIsClickedChangePass] = useState(false)
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)
    const [currentPass, setCurrentPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [whoIsActive, setWhoIsActive] = useState('')

    const { pathname } = history.location




    const handleDropDown = () => {
        setIsItClicked(prevState => {
            return !prevState
        })
    }

    const handleChangePassShow = () => {
        setIsItClicked(false)
        setIsClickedChangePass(prevState => {
            return !prevState
        })
    }

    const handleHamburgerClick = () => {
        setIsHamburgerClicked(prevState => {
            return !prevState
        })
    }

    const hanldeLogOut = () => {
        sessionStorage.removeItem('token')
        window.location.reload();
    }

    const handleTabChange = (path) => {
        setWhoIsActive(path)
        history.push(`${path}`)
    }

    return (
        <div className='MainHeaderDiv'>
            <div className='IconDiv'><img src={MainIcon} alt="Icon" /></div>
            <div className='NavBarDiv' >
                <div className='cont'><p onClick={() => handleTabChange('/sites')} style={{ opacity: pathname === '/sites' ? '1' : '0.6' }}>Sites</p><Bars active={pathname === '/sites'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/posts')} style={{ opacity: pathname === '/posts' ? '1' : '0.6' }}>Posts</p><Bars active={pathname === '/posts'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/widgets')} style={{ opacity: pathname === '/widgets' ? '1' : '0.6' }}>Widgets</p><Bars active={pathname === '/widgets'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/stats')} style={{ opacity: pathname === '/stats' ? '1' : '0.6' }}>Stats</p><Bars active={pathname === '/stats'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/users')} style={{ opacity: pathname === '/users' ? '1' : '0.6' }}>Users</p><Bars active={pathname === '/users'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/categories')} style={{ opacity: pathname === '/categories' ? '1' : '0.6' }}>Categories</p><Bars active={pathname === '/categories'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/totals')} style={{ opacity: pathname === '/totals' ? '1' : '0.6' }}>Totals</p><Bars active={pathname === '/totals'} /></div>
            </div>
            <div className='UserDetailDiv'>
                <div className='col-1'>
                    <img className='bell' src={Bell} alt="bell" />
                    <div>
                        <p>nina.aralica@alo.rs</p>
                        <img src={User} alt="User" />
                        <img onClick={handleDropDown} src={ArrowDown} alt="arrow" className='arrowDown' style={{ marginRight: '12px' }} />
                    </div>
                </div>
            </div>
            <div className='dropDownDiv' style={{ display: !isItClicked && 'none' }}>
                <LogOutButton label={'Sign Out'} colorization={'outOFBlure'} handleClick={hanldeLogOut} />
                <LogOutButton label={'Change Password'} handleClick={handleChangePassShow} colorization={'outOFBlure Blured'} />
            </div>
            {isItClickedChangePass && <div className='dropDownDivChangePass'>
                <input type="password" placeholder='Current password' onChange={(e) => setCurrentPass(e.target.value)} />
                <input type="password" placeholder='New password' onChange={(e) => setNewPass(e.target.value)} />
                <div className='buttonsChangePass'>
                    <LogOutButton label={'Change Password'} colorization={'outOFBlure'} customStyles={{ width: '166px' }} />
                    <LogOutButton label={'Close'} colorization={'outOFBlure'} customStyles={{ width: '75px' }} handleClick={handleChangePassShow} />

                </div>
            </div>}
            <div className='shortScreenHamburger' onClick={handleHamburgerClick}>
                <div className='bars'>
                    <div className='firstBlueBar'></div>
                    <div className='secondBlueBar'></div>
                    <div className='whiteBar'></div>
                </div>
            </div>
            <div className='NavBarDivSmall' style={{ display: isHamburgerClicked && window.screen.width < 1350 ? 'flex' : 'none' }}>
                <div className='cont'><p onClick={() => handleTabChange('/sites')} style={{ opacity: pathname === '/sites' ? '1' : '0.6' }}>Sites</p><Bars active={pathname === '/sites'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/posts')} style={{ opacity: pathname === '/posts' ? '1' : '0.6' }}>Posts</p><Bars active={pathname === '/posts'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/widgets')} style={{ opacity: pathname === '/widgets' ? '1' : '0.6' }}>Widgets</p><Bars active={pathname === '/widgets'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/stats')} style={{ opacity: pathname === '/stats' ? '1' : '0.6' }}>Stats</p><Bars active={pathname === '/stats'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/users')} style={{ opacity: pathname === '/users' ? '1' : '0.6' }}>Users</p><Bars active={pathname === '/users'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/categories')} style={{ opacity: pathname === '/categories' ? '1' : '0.6' }}>Categories</p><Bars active={pathname === '/categories'} /></div>
                <div className='cont'><p onClick={() => handleTabChange('/totals')} style={{ opacity: pathname === '/totals' ? '1' : '0.6' }}>Totals</p><Bars active={pathname === '/totals'} /></div>
            </div>
        </div>
    )
}

export default Header
