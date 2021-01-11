import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ApartmentIcon from "@material-ui/icons/Apartment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { NavLink } from "react-router-dom";

function Header() {
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
        <div className="header__option header__option--active">
          <Tooltip title="Home">
            <NavLink to="/home">
              <HomeIcon fontSize="large" />
            </NavLink>
          </Tooltip>
        </div>
        <div className="header__option">
          <Tooltip title="Societies">
            <NavLink to="/societies">
              <ApartmentIcon fontSize="large" />
            </NavLink>
          </Tooltip>
        </div>
        <div className="header__option">
          <Tooltip title="Resources">
            <NavLink to="/resources">
              <AssignmentIcon fontSize="large" />
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
