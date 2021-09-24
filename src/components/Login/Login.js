import React, { Component } from 'react'
import './Login.scss'
import mainImage from '../../assets/img/Header/mainPic.svg'
import LogOutButton from '../../containers/Buttons/LogOutButton'
import { connect } from 'react-redux'
import { LoginActionRequest } from '../../store/actions/LoginAction'
import { v4 as uuidv4 } from 'uuid'
import history from '../../routes/History'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidUpdate(prevProps) {
        const { login } = this.props
        const { data, loading, error, errorData } = login;

        if (!prevProps.login !== login && !loading && !error && data) {
            history.push('/sites')
        }
    }

    handleSubmit = () => {
        const { email, password } = this.state
        if (email && password) {
            sessionStorage.setItem('token', uuidv4())
        }
        this.props.dispatch(LoginActionRequest({
            mail: email,
            password
        }))
    }

    render() {
        const { error, errorData, data, loading } = this.props.login
        return (
            <>
                <div className='loginHeader'>
                    <img src={mainImage} alt="mainImage" />
                </div>
                <h1>Welcome</h1>
                <p className='underH1ptag'>to ContentExchange Back Office</p>
                <div className='loginInfoDiv'>
                    <p className='mainPunchLine'>Login or sign up now.</p>
                    {error && errorData && <p style={{ color: 'red' }}>{errorData.data.message}</p>}
                    <input type='email' placeholder='nina.aralica@alo.rs' onChange={(e) => this.setState({ email: e.target.value })} />
                    <input type="password" placeholder='...........' onChange={(e) => this.setState({ password: e.target.value })} />
                    <div className='buttonAndATagDiv'>
                        <LogOutButton label={'Sing in'} handleClick={this.handleSubmit} colorization={'outOFBlure'} customStyles={{ width: '106px', height: "55px", background: '#7BEFFF' }} />
                        <a href="#">Forgot password</a>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { LoginReducer } = state;
    const { login } = LoginReducer
    return {
        login

    }
}

export default connect(mapStateToProps, null)(Login)
