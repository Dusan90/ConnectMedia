import React, { Component } from 'react'
import './Login.scss'
import mainImage from '../../assets/img/Header/mainPic.svg'
import LogOutButton from '../../containers/Buttons/LogOutButton'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <>
                <div className='loginHeader'>
                    <img src={mainImage} alt="mainImage" />
                </div>
                <h1>Welcome</h1>
                <p className='underH1ptag'>to ContentExchange Back Office</p>
                <div className='loginInfoDiv'>
                    <p className='mainPunchLine'>Login or sign up now.</p>
                    <input type='email' placeholder='nina.aralica@alo.rs' onChange={(e) => this.setState({ email: e.target.value })} />
                    <input type="password" placeholder='...........' onChange={(e) => this.setState({ password: e.target.value })} />
                    <div className='buttonAndATagDiv'>
                        <LogOutButton label={'Sing in'} colorization={'outOFBlure'} customStyles={{ width: '106px', height: "55px", background: '#7BEFFF' }} />
                        <a href="#">Forgot password</a>
                    </div>
                </div>
            </>
        )
    }
}

export default Login
