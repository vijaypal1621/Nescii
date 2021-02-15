import React, { useState, useEffect } from "react";
import "./Header.css";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar, Tooltip, IconButton, Drawer } from "@material-ui/core";
import ApartmentIcon from "@material-ui/icons/Apartment";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { auth } from "./firebase";
import Notices from "./Notices";
import Sidebar from "./Sidebar";

function Header() {
  const [current, setCurrent] = useState("home");
  const [menu, setMenu] = useState(null);
  const [profile, setProfile] = useState(false);
  const [notices, setNotices] = useState(false);

  const toggleProfileDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setProfile(open);
  };

  const toggleNoticesDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setNotices(open);
  };

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  const [{ user }] = useStateValue();

  useEffect(() => {
    const currentPage = document.getElementById(current);
    currentPage.classList.add("header__option--active");
  }, [current]);

  return (
    <>
      <Drawer
        anchor="bottom"
        open={profile}
        onClick={toggleProfileDrawer(false)}
        onClose={toggleProfileDrawer(false)}
      >
        <Sidebar />
      </Drawer>
      <Drawer
        anchor="top"
        open={notices}
        onClick={toggleNoticesDrawer(false)}
        onClose={toggleNoticesDrawer(false)}
      >
        <Notices />
      </Drawer>

      <div className="header row">
        <div className="header__left col-6 order-1 order-md-1 col-md-4">
          <img
            src="https://drive.google.com/thumbnail?id=1lol0E4WlbCtPf4ZsczNcL8COq4srRSdo"
            alt="nescii"
            style={{ borderRadius: "10%" }}
          />
          <h2 style={{ marginLeft: "5px" }}>nescii</h2>
        </div>
        <div className="header__center col-12 order-2 order-md-2 col-md-4">
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
                <AssignmentIcon
                  style={{ color: " #16a596" }}
                  fontSize="large"
                />
              </NavLink>
            </Tooltip>
          </div>
          <IconButton
            className="header__option d-block d-md-none"
            onClick={handleClick}
          >
            <MenuIcon style={{ color: " #16a596" }} fontSize="large" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={menu}
            keepMounted
            open={Boolean(menu)}
            onClose={handleClose}
          >
            <MenuItem onClick={toggleProfileDrawer(true)}>Profile</MenuItem>
            <MenuItem onClick={toggleNoticesDrawer(true)}>Notices</MenuItem>
            <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
          </Menu>
        </div>
        <div className="header__right col-6 order-1 order-md-3 col-md-4">
          <div className="header__info">
            <Avatar src={user?.photoURL} alt={user?.displayName} />
            <h4 className="d-none d-md-block">{user?.displayName}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
