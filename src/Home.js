import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Notices from "./Notices";

function Home() {
  return (
    <div
      className="home row"
      style={{ backgroundColor: "#00af91", margin: "0" }}
    >
      <div className="d-none d-md-block pr-0 col-md-3 col-xl-2 pt-3">
        <Sidebar />
      </div>
      <div className="col-12 col-sm-12 col-md-6 col-xl-6 ">
        <Feed />
      </div>
      <div className="d-none d-md-block pl-0 col-md-3 col-xl-4">
        <Notices />
      </div>
    </div>
  );
}

export default Home;
