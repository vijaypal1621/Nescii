import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import "./Sidebar.css";
import cheerioModule from "cheerio";

class Sidebar extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    var headers = new Headers();
    headers.append("Referer", "https://imsnsit.org/imsnsit/");
    headers.append(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36"
    );

    fetch(
      "https://cors-anywhere.herokuapp.com/https://imsnsit.org/imsnsit/student_login.php",
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        var cookie = response.headers["set-cookie"].split(";")[0];
        headers.append("Cookie", cookie);
        console.log(response.body);
      });
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__profile">
          <div className="profile__background"></div>
          <div className="profile__image">
            <Avatar className="large" />
          </div>
          <h3 className="profile__name">Vijay PAL</h3>
          <h4 className="profile__sem">Sem-4</h4>
        </div>
      </div>
    );
  }
}

export default Sidebar;
