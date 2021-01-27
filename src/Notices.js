import Loading from "./Loading";
import React, { Component } from "react";
import {
  Button,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { fetchNotices } from "./redux/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    notices: state.notices,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNotices: () => {
    dispatch(fetchNotices());
  },
});

const RenderNotice = ({ notice }) => {
  if (notice) {
    return (
      <Paper
        elevation={2}
        style={{ marginBottom: "1rem", backgroundColor: "#FFFAF0" }}
      >
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={
              <Link href={notice.url} target="_blank" rel="noopener">
                {notice.title}
              </Link>
            }
            secondary={
              <>
                {notice.date} <br />
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {notice.publisher}
                </Typography>
              </>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="middle" component="li" />
      </Paper>
    );
  } else {
    return <div></div>;
  }
};

function DisplayNotices({ notices, isLoading, errMess }) {
  if (isLoading) {
    return (
      <center>
        <Loading type={"bubbles"} color={"#16A596"} />
      </center>
    );
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return notices.slice(0, 5).map((notice) => {
      return <RenderNotice notice={notice} key={notice.title} />;
    });
  }
}

class Notices extends Component {
  componentDidMount() {
    this.props.fetchNotices();
  }

  render() {
    return (
      <div className="notice" style={{ flex: 0.3 }}>
        <h1>
          <center>Notices</center>
        </h1>
        <List component="ul">
          <DisplayNotices
            notices={this.props.notices.notices}
            isLoading={this.props.notices.isLoading}
            errMess={this.props.notices.errMess}
          />
        </List>
        <center>
          <Button variant="contained" centerRipple={true}>
            <Link
              href="https://www.imsnsit.org/imsnsit/notifications.php"
              target="_blank"
              rel="noopener"
              color="inherit"
              variant="button"
            >
              See More
            </Link>
          </Button>
        </center>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Notices)
);
