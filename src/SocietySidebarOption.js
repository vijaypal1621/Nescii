import React from "react";
import "./SocietySidebarOption.css";
import { useHistory } from "react-router-dom";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";

function SocietySidebarOption({ url, id, title }) {
  const history = useHistory();

  const selectSociety = () => {
    if (id) {
      history.push(`/societies/${id}`);
    }
  };

  return (
    <div className="sidebarOption active__society" onClick={selectSociety}>
      <ListItem>
        <ListItemIcon>
          <img
            src={url}
            alt={title}
            width="60px"
            height="60px"
            style={{ borderRadius: "100%" }}
          />
        </ListItemIcon>
        <ListItemText style={{ marginLeft: "10px" }}>
          <Typography variant="h6">{title}</Typography>
        </ListItemText>
      </ListItem>
    </div>
  );
}

export default SocietySidebarOption;
