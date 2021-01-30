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
import HelpIcon from '@material-ui/icons/Help';
import MenuIcon from '@material-ui/icons/Menu';
import { UncontrolledDropdown,DropdownToggle,DropdownMenu,  DropdownItem, ButtonDropdown,} from 'reactstrap';
import { NavLink } from "react-router-dom";
import {useStateValue} from './StateProvider';


function Header() {
  const [current, setCurrent] = useState("home");
  const [{user}] = useStateValue();
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    const currentPage = document.getElementById(current);
    currentPage.classList.add("header__option--active");
  }, [current]);
  return (
    <div className="header row">
      <div className="header__left col-6 order-1 order-md-1 col-md-4">
        <Avatar src={user?.photoURL} alt={user?.displayName}/>
        <h2>nescii</h2>
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
              <AssignmentIcon style={{ color: " #16a596" }} fontSize="large" />
            </NavLink>
          </Tooltip>
        </div>
        <div className="header__option d-block d-md-none" id="resources">
          <Tooltip title="Resources">
            <NavLink
              to="/resources"
              onClick={() => {
                const currentPage = document.getElementById(current);
                currentPage.classList.remove("header__option--active");
                setCurrent("resources");
              }}
            >
              <MenuIcon style={{ color: " #16a596" }} fontSize="large" />
            </NavLink>
          </Tooltip>
        </div>
        
      </div>
      <div className="header__right col-6 order-1 order-md-3 col-md-4">
        <div className="header__info">
          <Avatar src={user?.photoURL} alt={user?.displayName}/>
          <h4 className="d-none d-md-block">{user?.displayName}</h4>
        </div>
      </div>
    </div>
  );
}

export default Header;


