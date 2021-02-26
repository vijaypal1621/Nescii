import React, { useState, useEffect } from "react";
import SocietyMessageSender from "./SocietyMessageSender";
import SocietyPost from "./SocietyPost";
import Widgets from "./Widgets";
import { useParams } from "react-router-dom";
import SocietySidebar from "./SocietySidebar";
import { Button, Drawer } from "@material-ui/core";
import Events from "./Events";
import WidgetAbout from "./WidgetAbout";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocPosts } from "./redux/ActionCreators";
import Loading from "./Loading";
import { AnimatedList } from "react-animated-list";

function DisplaySocPosts({ socPosts, isLoading, errMess }) {
  if (isLoading) {
    return (
      <center>
        <Loading type={"spinningBubbles"} color={"#16A596"} />
      </center>
    );
  } else if (errMess) {
    return (
      <center>
        <h4>{errMess}</h4>
      </center>
    );
  } else {
    return (
      <AnimatedList initialAnimationDuration={2000}>
        {socPosts?.map(({ post, id }) => {
          return (
            <SocietyPost
              key={id}
              uid={post?.uid}
              username={post?.username}
              postId={id}
              likes={post?.likes}
              message={post?.message}
              profilePic={post?.profilePic}
              timestamp={post?.timestamp}
              images={post?.images}
              video={post?.video}
            />
          );
        })}
      </AnimatedList>
    );
  }
}

function SocietyChat() {
  const socPosts = useSelector((state) => state.socPosts);
  const dispatch = useDispatch();
  const { societyId } = useParams();
  const [socs, setSocs] = useState(false);
  const [about, setAbout] = useState(false);
  const [events, setEvents] = useState(false);

  const toggleAboutDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAbout(open);
  };

  const toggleEventsDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setEvents(open);
  };

  const toggleSocDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSocs(open);
  };

  //    1. changes URL with useHistory() Hook
  //    2. connects to databse using useEffect() and listens to the state changes using useState() hhok
  //    3. Uses URL by useParams(roomId) to fetch room details from the database!
  //    4. useHistory() and useParams() are from react-router-dom
  //    5. useEffect() and useState() are fom react;

  useEffect(() => {
    if (societyId) {
      dispatch(fetchSocPosts(societyId));
    }
  }, [societyId]);

  return (
    <>
      <Drawer
        anchor="left"
        open={socs}
        onClick={toggleSocDrawer(false)}
        onClose={toggleSocDrawer(false)}
      >
        <SocietySidebar />
      </Drawer>
      <Drawer
        anchor="top"
        open={about}
        onClick={toggleAboutDrawer(false)}
        onClose={toggleAboutDrawer(false)}
      >
        <WidgetAbout society={socPosts.societyDetails} />
      </Drawer>
      <Drawer
        anchor="right"
        open={events}
        onClick={toggleEventsDrawer(false)}
        onClose={toggleEventsDrawer(false)}
      >
        <Events />
      </Drawer>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 d-block d-md-none pt-3">
            <center>
              <Button
                onClick={toggleSocDrawer(true)}
                variant="contained"
                color="primary"
              >
                Societies
              </Button>
            </center>
          </div>
          <div className="col-4 d-block d-md-none pt-3">
            <center>
              <Button
                variant="contained"
                onClick={toggleAboutDrawer(true)}
                color="primary"
              >
                About
              </Button>
            </center>
          </div>
          <div className="col-4 d-block d-md-none pt-3">
            <center>
              <Button
                variant="contained"
                onClick={toggleEventsDrawer(true)}
                color="primary"
              >
                Events
              </Button>
            </center>
          </div>
          <div className="col-2 d-md-block d-none p-0">
            <SocietySidebar />
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12">
                <SocietyMessageSender
                  title={socPosts.societyDetails?.title}
                  imageURL={socPosts.societyDetails?.imageURL}
                />
              </div>
              <div className="col-12">
                <DisplaySocPosts
                  socPosts={socPosts.socPosts}
                  isLoading={socPosts.isLoading}
                  errMess={socPosts.errMess}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 d-none d-md-block" style={{border:"3px solid #00af91" , borderRadius:"10px"}}>
            <Widgets society={socPosts?.societyDetails} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SocietyChat;
