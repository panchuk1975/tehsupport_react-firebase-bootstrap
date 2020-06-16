import React, { Component } from "react";
import fire from "../config/Fire";
import { NavLink } from "react-router-dom";
import "../CSS/LogRegFormStyle.scss";

let contentWidth = "25%";
contentWidth = `${
  7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
  3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
  7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
  6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
  0.1046586 * window.innerWidth +
  106.6952733
}%`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fireErrors: "",
      formTitle: "",
      loginBtn: true,
      width: 0,
      height: 0,
    };
  }
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  login = (event) => {
    event.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        this.setState({ fireErrors: error.message });
      });
  };
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    let showPassword = () => {
      const pass_field = document.querySelector(".password");
      const show_btn = document.querySelector(".show");
      if (pass_field.type === "password") {
        pass_field.type = "text";
        show_btn.style.color = "#3498db";
        show_btn.textContent = "HIDE";
      } else {
        pass_field.type = "password";
        show_btn.style.color = "#222";
        show_btn.textContent = "SHOW";
      }
    };
    let errorNotification = this.state.fireErrors ? (
      <div className="Error" style={{ backgroundColor: "red" }}>
        {this.state.formTitle ||
          "Warning! Authorization Error! Check the data!"}
      </div>
    ) : null;
    contentWidth = `${
      7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
      3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
      7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
      6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
      0.1046586 * window.innerWidth +
      106.6952733
    }%`;
    return (
      <div className="bg-img">
        <div id="loginConteiner" className="content" style={{ width: contentWidth }}>
          <header>TEHSUPPORT</header>
          <form action="#" onSubmit={this.login}>
            <div className="field">
              <span className="fa fa-user"></span>
              <input
                type="email"
                className="email"
                placeholder="Email or Phone"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="field spase">
              <span className="fa fa-lock"></span>
              <input
                id="password"
                type="password"
                className="password"
                placeholder="Password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
                required
              />
              <span className="show" onClick={showPassword}>
                SHOW
              </span>
            </div>
            <div className="field spase">
              <input type="submit" value="LOGIN" />
            </div>
            <div className="signup">
              <NavLink to={"/about"}>
                <span>About! </span>
              </NavLink>
              Don't have any accounts?
              <NavLink to={"/register"}>
                <span> Signup!</span>
              </NavLink>
            </div>
            {errorNotification}
            <div className="signup">
            Forgot password?
              <NavLink to={"/forgotpassword"}>
                <span> Use form here!</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login = React.memo(Login);
