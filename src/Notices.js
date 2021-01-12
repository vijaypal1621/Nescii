import cheerioModule from "cheerio";
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

function DisplayNotices({ notices }) {
  return notices.slice(0, 5).map((notice) => {
    return <RenderNotice notice={notice} />;
  });
}

class Notices extends Component {
  constructor() {
    super();
    this.state = { notices: [] };
  }

  componentDidMount() {
    const noticesArray = [];
    fetch(
      "https://cors-anywhere.herokuapp.com/https://www.imsnsit.org/imsnsit/notifications.php"
    )
      .then((response) => response.text())
      .then((html) => {
        const $ = cheerioModule.load(html);
        $("tr")
          .slice(4)
          .each((index, notice) => {
            if (notice.children.length !== 1) {
              const noticeObject = {
                url: $(notice).find("a").attr("href"),
                date: notice.firstChild.firstChild.firstChild.data.trim(),
                publisher: $(notice).find("b").text(),
                title: $(notice).find("a").text(),
              };
              noticesArray.push(noticeObject);
            }
          });
        return noticesArray;
      })
      .then((notices) => this.setState({ notices: notices }))
      .catch(() =>
        console.log(
          "Can’t access https://www.imsnsit.org/imsnsit/notifications.php response."
        )
      );
  }

  render() {
    return (
      <div className="notice" style={{ flex: 0.3 }}>
        <h1>
          <center>Notices</center>
        </h1>
        <List component="ul">
          <DisplayNotices notices={this.state.notices} />
        </List>
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
      </div>
    );
  }
}

export default Notices;
