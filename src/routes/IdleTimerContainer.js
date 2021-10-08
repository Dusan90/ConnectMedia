import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer'


export class IdleTimerContainer extends Component {

    constructor(props) {
        super(props)
        this.idleTimerRef = React.createRef(null)
    }

    onIdle = () => {
        if (window.location.pathname !== '/') {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('isLoged')
            window.location.reload();
        }

    }

    render() {

        return (
            <div>
                <IdleTimer timeout={3600 * 1000} onIdle={this.onIdle}></IdleTimer>
            </div>
        )
    }
}


export default IdleTimerContainer

