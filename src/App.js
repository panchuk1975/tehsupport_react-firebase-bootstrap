import React, { Component } from "react";
import fire from "./config/Fire";
import firebase from "firebase";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { FirebaseState } from "./context/fiebase/FirebaseState";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Loader } from "./components/Loader";
import { NavLink } from "react-router-dom";
import "./CSS/AppCommonStyle.scss";

const Home = React.lazy(() => import("./pages/Home"));
const AutoAgr = React.lazy(() => import("./pages/AutoAgr"));
const Agreg = React.lazy(() => import("./pages/Agreg"));
const Liquids = React.lazy(() => import("./pages/Liquids"));
const Exploutation = React.lazy(() => import("./pages/Exploutation"));
const CreateNew = React.lazy(() => import("./pages/CreateNew"));
const About = React.lazy(() => import("./components/About"));
const Help = React.lazy(() => import("./components/Help"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const Profile = React.lazy(() => import("./pages/Profile"));
const ForgotPassword = React.lazy(() => import("./components/ForgotPassword"));

let contentWidth = "25%";
let contentWidthNumber =
  7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
  3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
  7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
  6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
  0.1046586 * window.innerWidth +
  106.6952733;
contentWidth = `${contentWidthNumber}%`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }
  uiConfigLogin = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callBacks: {
      signInSuccess: () => false,
    },
  };
  uiConfigRegister = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callBacks: {
      signInSuccess: () => false,
    },
  };
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    this.authListener();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    contentWidth = `${
      7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
      3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
      7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
      6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
      0.1046586 * window.innerWidth +
      106.6952733
    }%`;
    return (
      <FirebaseState>
        <BrowserRouter>
          <div className="container pt-4">
            {this.state.user ? (
              <div className="appBackgroung">
                <Navbar />
                <Switch>
                  <Route
                    path={"/createnew"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <CreateNew />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/home"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Home
                            contentWidth={contentWidth}
                            windowWidth={window.innerWidth}
                          />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/autoagr"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <AutoAgr
                            contentWidth={contentWidth}
                            windowWidth={window.innerWidth}
                          />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/agr"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Agreg
                            contentWidth={contentWidth}
                            windowWidth={window.innerWidth}
                          />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/exploutation"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Exploutation
                            contentWidth={contentWidth}
                            windowWidth={window.innerWidth}
                          />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/liquids"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Liquids windowWidth={window.innerWidth} />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/profile"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Profile
                            contentWidth={contentWidth}
                            windowWidth={window.innerWidth}
                          />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/help"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Help windowWidth={window.innerWidth} />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Redirect from="/" to="/help" />
                </Switch>
              </div>
            ) : (
              <div>
                <Switch>
                  <Route
                    path={"/register"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <Register />
                          <div
                            style={{ width: contentWidth }}
                            className="firebaseAuthConteinerRegister"
                          >
                            <StyledFirebaseAuth
                              className="firebaseAuth"
                              uiConfig={this.uiConfigRegister}
                              firebaseAuth={firebase.auth()}
                            />
                          </div>
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/about"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <About contentWidth={contentWidthNumber} />
                        </React.Suspense>
                      );
                    }}
                  />
                  <Route
                    path={"/forgotpassword"}
                    render={() => {
                      return (
                        <React.Suspense
                          fallback={
                            <div>
                              <Loader />
                            </div>
                          }
                        >
                          <ForgotPassword />
                          <div
                            style={{ width: contentWidth }}
                            className="firebaseAuthConteinerLogin"
                          >
                            <h5>Forgot password? Use "Trouble signing in!"</h5>
                            <StyledFirebaseAuth
                              className="firebaseAuth"
                              uiConfig={this.uiConfigLogin}
                              firebaseAuth={firebase.auth()}
                            />
                            <div className="signup">
                           <p></p>
                           Return to:
                              <NavLink to={"/login"}>
                                <span>Login</span>
                              </NavLink>
                            </div>
                          </div>
                        </React.Suspense>
                      );
                    }}
                  />
                  <React.Suspense
                    fallback={
                      <div>
                        <Loader />
                      </div>
                    }
                  >
                    <Login />
                  </React.Suspense>
                </Switch>
              </div>
            )}
          </div>
        </BrowserRouter>
      </FirebaseState>
    );
  }
}

export default App;
