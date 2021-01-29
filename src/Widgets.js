import React from "react";
import Events from "./Events";
import WidgetAbout from "./WidgetAbout";

function Widgets({ society }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Events />
        </div>
        <div className="col-12">
          <WidgetAbout society={society} />
        </div>
      </div>
    </div>
  );
}

export default Widgets;
