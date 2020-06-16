import React, { Component } from "react";
import "../CSS/LogRegFormStyle.scss";

class ForgotPassword extends Component {
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
    return <div className="bg-img"></div>;
  }
}

export default ForgotPassword = React.memo(ForgotPassword);
