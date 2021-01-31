import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function WidgetAbout({ society }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">About</Typography>
        <br />
        <div className="row">
          <div className="col-auto">
            <i class="fas fa-theater-masks fa-5x"></i>
          </div>
          <div className="col">
            <Typography paragraph>{!society ? "" : society.about}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WidgetAbout;
