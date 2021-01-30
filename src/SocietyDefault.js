import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Button,
  Drawer,
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SocietySidebar from "./SocietySidebar";

function SocietyDefault() {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    // <div
    //   role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    // >
      <SocietySidebar />
    //  {/* </div> */}
  );

  return (
    <>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      <div
        class="jumbotron jumbotron-fluid"
        style={{
          backgroundImage: `url(https://mapio.net/images-p/55335209.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          style={{ color: "white", marginTop: "20%" }}
          align="center"
        >
          Connect with your college societies with <strong>nescii</strong>
        </Typography>
        <center>
          <Button
            variant="contained"
            className="mt-3"
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
              padding: "0.8rem 3rem",
              textTransform: "none",
            }}
            onClick={toggleDrawer("left", true)}
          >
            <Typography variant="h5" style={{ fontWeight: "bolder" }}>
              Explore Societies
            </Typography>
          </Button>
        </center>
        {/* <div className="col-5">
              <Typography paragraph className="lead" style={{ color: "white" }}>
                <strong>nescii</strong> is a great way to keep in touch with the
                societies of NSUT. It keeps you updated about society events and
                meetings. Follow your favourite societies and never miss an
                update!
              </Typography>
            </div> */}
      </div>
      {/* <div className="container">
        <div className="row">
          <div className="col-12">
            <center>
              <Typography variant="h3">
                Benefits of Joining a Society
              </Typography>
            </center>
          </div>
          <div className="col-12">
            <Accordion style={{ backgroundColor: "#fffaf0" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontSize: "25px" }}>
                  Know yourself
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph style={{ fontSize: "20px" }}>
                  With various student organizations such as academic, sports,
                  or non-academic, you can know yourself, your potential and
                  passion. Find out what you are good at by becoming a part of a
                  couple of student organizations. Understand your strengths,
                  weaknesses, interests, and goals. Learn how to handle
                  challenging situations and test your knowledge. Knowing about
                  yourself can certainly prove beneficial in your future career.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "#fffaf0" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontSize: "25px" }}>
                  Increased social opportunities
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph style={{ fontSize: "20px" }}>
                  Being a part of a student organization gives you multiple
                  opportunities to grow your connections. Meeting new people and
                  establishing relationships will help you in the future. Since
                  you are part of the same club, you will meet people with
                  common interests, making it easier to understand them. It
                  would provide you with a whole new opportunity to build some
                  valuable connections. Most clubs or societies host alumni
                  meetups and panel discussions by experts which might lead to
                  potential employment opportunities.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "#fffaf0" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontSize: "25px" }}>
                  Develop membership and soft skills
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph style={{ fontSize: "20px" }}>
                  Acquiring people skills is imperative to a bright future.
                  While participating in multiple activities, you can learn how
                  to effectively interact with others. Broaden your skillset
                  such as work ethics, time management, and communication, and
                  enhance those you already possess. Leading an organization can
                  make you a confident leader. Even if you are just a member,
                  you can demonstrate many qualities including teamwork and
                  dedication.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "#fffaf0" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontSize: "25px" }}>
                  Well-balanced experience
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph style={{ fontSize: "20px" }}>
                  While focusing solely on academics can help you score all A’s,
                  these lectures and assignments will also put you under stress.
                  Maintaining a well-balanced experience in college will enhance
                  your academic performance. Take a break from studies and join
                  a club or two that matches your interests. A different
                  environment with like-minded people and fun activities will
                  give you that much-needed change while keeping you healthy.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{ backgroundColor: "#fffaf0" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ fontSize: "25px" }}>
                  Letting your prospective employers know
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph style={{ fontSize: "20px" }}>
                  Being an active member of student clubs and societies is a
                  great way to impress your employers. Your participation will
                  reflect your interest and knowledge in extra-curricular
                  activities thereby making you an all-rounder. You can present
                  your leadership, communication, interpersonal and other skills
                  and the experience you have acquired on your resume and during
                  interviews. Be specific and include concrete examples such as
                  organized an event, led the recruitment campaign and others.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div> 
  </div>*/}
    </>
  );
}

export default SocietyDefault;
