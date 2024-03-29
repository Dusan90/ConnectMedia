import React, { Component } from "react";
import "./Login.scss";
import mainImage from "../../assets/img/Header/widget4media_Negativ-1.png";
import LogOutButton from "../../containers/Buttons/LogOutButton";
import { connect } from "react-redux";
import { LoginActionRequest } from "../../store/actions/LoginAction";
import { v4 as uuidv4 } from "uuid";
import history from "../../routes/History";
import { NotificationManager } from "react-notifications";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
    };
  }

  componentDidMount() {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const emailValue = rememberMe
      ? localStorage.getItem("emailValue")
      : localStorage.removeItem("emailValue");
    this.setState({ email: emailValue, rememberMe });
    if (!sessionStorage.getItem("token")) {
      sessionStorage.setItem("token", uuidv4());
      window.location.reload();
    }
  }

  componentDidUpdate(prevProps) {
    const { login } = this.props;
    const { data, loading, error, errorData } = login;

    if (prevProps.login !== login && !loading && !error && data) {
      if (this.state.rememberMe) {
        localStorage.setItem("emailValue", `${this.state.email}`);
      }
      this.setState({ mail: "", password: "" });
      history.push("/sites");
    } else if (prevProps.login !== login && error && errorData) {
      NotificationManager.error(`${errorData.data.message}`, "Failed", 2000);
    }
  }

  handleSubmit = () => {
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(
        LoginActionRequest({
          mail: email,
          password,
        })
      );
    }
  };

  handleInputLogin = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckBox = (e) => {
    this.setState({ rememberMe: e.target.checked });
    localStorage.setItem("rememberMe", e.target.checked);
  };

  render() {
    return (
      <>
        <div className="loginHeader">
          <img src={mainImage} alt="mainImage" />
        </div>
        <h1>Welcome</h1>
        <p className="underH1ptag">to ContentExchange Back Office</p>
        <div className="loginInfoDiv">
          <p className="mainPunchLine">Login or sign up now.</p>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => this.handleInputLogin(e)}
            value={this.state.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter yout password"
            onChange={(e) => this.handleInputLogin(e)}
            value={this.state.password}
          />
          <div className="buttonAndATagDiv">
            <LogOutButton
              label={"Sign in"}
              handleClick={this.handleSubmit}
              colorization={"outOFBlure"}
              customStyles={{
                width: "106px",
                height: "55px",
                background: "#7BEFFF",
              }}
            />
            <a href="#">Forgot password</a>
          </div>
          <div className="checkbox-rememberMe">
            <input
              type="checkbox"
              checked={this.state.rememberMe}
              onChange={this.handleCheckBox}
            />
            <p>Remember me</p>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { LoginReducer } = state;
  const { login } = LoginReducer;
  return {
    login,
  };
};

export default connect(mapStateToProps, null)(Login);
