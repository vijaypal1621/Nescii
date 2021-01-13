import React, { useState, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ApartmentIcon from "@material-ui/icons/Apartment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { NavLink } from "react-router-dom";

function Header() {
  const [current, setCurrent] = useState("home");
  useEffect(() => {
    const currentPage = document.getElementById(current);
    currentPage.classList.add("header__option--active");
  }, [current]);
  return (
    <div className="header">
      <div className="header__left">
        <h2>nescii</h2>
        <div className="header__input">
          <SearchIcon />
          <input placeholder="Search nescii..." type="text" />
        </div>
      </div>
      <div className="header__center">
        <div className="header__option" id="home">
          <Tooltip title="Home">
            <NavLink
              to="/home"
              onClick={() => {
                const currentPage = document.getElementById(current);
                currentPage.classList.remove("header__option--active");
                setCurrent("home");
              }}
            >
              <HomeIcon style={{ color: " #16a596" }} fontSize="large" />
            </NavLink>
          </Tooltip>
        </div>
        <div className="header__option" id="societies">
          <Tooltip title="Societies">
            <NavLink
              to="/societies"
              onClick={() => {
                const currentPage = document.getElementById(current);
                currentPage.classList.remove("header__option--active");
                setCurrent("societies");
              }}
            >
              <ApartmentIcon style={{ color: " #16a596" }} fontSize="large" />
            </NavLink>
          </Tooltip>
        </div>
        <div className="header__option" id="resources">
          <Tooltip title="Resources">
            <NavLink
              to="/resources"
              onClick={() => {
                const currentPage = document.getElementById(current);
                currentPage.classList.remove("header__option--active");
                setCurrent("resources");
              }}
            >
              <AssignmentIcon style={{ color: " #16a596" }} fontSize="large" />
            </NavLink>
          </Tooltip>
        </div>
      </div>
      <div className="header__right">
        <div className="header__info">
          <Avatar />
          <h4>Vijay Pal</h4>
        </div>
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <ForumIcon />
        </IconButton>
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
