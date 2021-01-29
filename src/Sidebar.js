import { Avatar} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import "./Sidebar.css";
import { useStateValue } from './StateProvider';
import { Button } from '@material-ui/core';
import {auth} from './firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

  function Sidebar() {
    const classes = useStyles();
    const [{ user } ] = useStateValue();
    

    return (
      <>
        <div className="sidebar">
          <div className="sidebar__profile">
            <div className="profile__background"></div>
            <div className="profile__image">
              <Avatar alt={user?.displayName}
                src={user?.photoURL} className={classes.large}  />
            </div>
            <h3 className="profile__name">{user.displayName}</h3>
            <h4 className="profile__sem">Sem-4</h4>
            <Button  onClick={()=> auth.signOut()}>Logout</Button>
          </div>
        </div>
      </>
    );
  }


export default Sidebar;
