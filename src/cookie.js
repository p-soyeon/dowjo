import React, { Component } from "react";
import cookie from "react-cookies";

class R085_cookieSave extends Component {
  componentDidMount() {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60);
    cookie.save("userid", "react200", {
      path: "/",
      expires,
      // secure : true,
      // httpOnly : true
    });

    setTimeout(function () {
      alert(cookie.load("userid"));
    }, 1000);
  }

  render() {
    return (
      <>
        <h3>react-cookies Load</h3>
      </>
    );
  }
}
