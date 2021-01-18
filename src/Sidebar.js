import { Avatar, Button, Modal, TextField } from "@material-ui/core";
import React, { Component } from "react";
import "./Sidebar.css";
import cheerioModule from "cheerio";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      rollnum: "",
      password: "",
      captcha: "",
      captchaURL: "",
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({
      isOpen: true,
    });
  }

  handleClose() {
    this.setState({
      isOpen: false,
    });
  }

  componentDidMount() {
    var headers = new Headers();
    headers.append("Referer", "https://imsnsit.org/imsnsit/student.htm");
    fetch(
      "https://cors-anywhere.herokuapp.com/https://www.imsnsit.org/imsnsit/student_login.php",
      {
        method: "GET",
        headers: headers,
        redirect: "follow",
        credentials: "same-origin",
      }
    )
      .then((response) => {
        var cookie = response.headers.get("set-cookie");
        console.log(cookie);
        // ! headers.append("Cookie", cookie);
        return response;
      })
      .then((response) => response.text())
      .then((html) => {
        const $ = cheerioModule.load(html);
        this.setState({
          captchaURL:
            "https://imsnsit.org/imsnsit/" + $("#captchaimg").attr("src"),
        });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <>
        <Modal
          open={this.state.isOpen}
          onClose={this.handleClose}
          style={{
            display: "grid",
            placeItems: "center",
            overflowY: "scroll",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
            }}
          >
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();

                fetch(
                  "https://cors-anywhere.herokuapp.com/https://www.imsnsit.org/imsnsit/student_login.php",
                  {
                    method: "POST",
                    headers: {
                      Referer: "https://imsnsit.org/imsnsit/student.htm",
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: JSON.stringify({
                      f: "",
                      uid: this.state.rollnum,
                      pwd: this.state.password,
                      fy: "2020-21",
                      comp: "NETAJI SUBHAS UNIVERSITY OF TECHNOLOGY",
                      cap: this.state.captcha,
                      logintype: "student",
                    }),
                  }
                )
                  .then((response) => {
                    console.log(response.text());
                  })
                  .catch((error) => console.log("error", error));

                this.handleClose();
              }}
            >
              <div>
                <h1>
                  <center>Login</center>
                </h1>
                <TextField
                  color="secondary"
                  fullWidth
                  id="rollnum"
                  label="NSUT Roll Number"
                  required
                  value={this.state.rollnum}
                  onChange={(e) => {
                    this.setState({
                      rollnum: e.target.value,
                    });
                  }}
                />

                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  required
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({
                      password: e.target.value,
                    });
                  }}
                />
                <br />
                <br />
                <img
                  id="captchaImg"
                  src={this.state.captchaURL}
                  alt="captchaImg"
                />
                <TextField
                  color="secondary"
                  margin="normal"
                  fullWidth
                  id="captcha"
                  label="Enter Captcha"
                  required
                  value={this.state.captcha}
                  onChange={(e) => {
                    this.setState({
                      captcha: e.target.value,
                    });
                  }}
                />
                <br />
                <br />
                <center>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: "2rem" }}
                  >
                    Submit
                  </Button>
                </center>
              </div>
            </form>
          </div>
        </Modal>
        <div className="sidebar">
          <div className="sidebar__profile">
            <div className="profile__background"></div>
            <div className="profile__image">
              <Avatar className="large" />
            </div>
            <h3 className="profile__name">Vijay PAL</h3>
            <h4 className="profile__sem">Sem-4</h4>
          </div>
          <center>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginTop: "2rem" }}
              onClick={this.handleOpen}
            >
              Login
            </Button>
          </center>
        </div>
      </>
    );
  }
}

export default Sidebar;
