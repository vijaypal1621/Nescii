import React from "react";
import { Card, CardContent, Grow, Typography } from "@material-ui/core";

function WidgetAbout({ society }) {
  return (
    <Grow in={true} timeout={1000}>
      <Card>
        <CardContent>
          <Typography variant="h4">About</Typography>
          <br />
          <div className="row">
            <div className="col-auto my-auto">
              <i class="fas fa-theater-masks fa-5x"></i>
            </div>
            <div className="col my-auto">
              <Typography paragraph>{!society ? "" : society.about}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grow>
  );
}

export default WidgetAbout;
