import {
  Typography,
  Button,
  Drawer,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import React, { useState } from "react";
import SocietySidebar from "./SocietySidebar";
import "./SocietyDefault.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Instagram, Facebook, LinkedIn, Email } from "@material-ui/icons";

function SocietyDefault() {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <SocietySidebar />
      </Drawer>
      <header
        class="jumbotron jumbotron-fluid"
        style={{
          backgroundImage: `url(https://mapio.net/images-p/55335209.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "100%",
          height: "100vh",
          margin: "0",
        }}
      >
        <div className="container-fluid m-0">
          <div className="row m-0">
            <div className="col-12" style={{ marginTop: "20%" }}>
              <Typography
                variant="h3"
                style={{ color: "white" }}
                align="center"
              >
                Connect with your college societies with{" "}
                <strong style={{ color: "yellowgreen" }}>nescii</strong>
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
                    outlineWidth: "0px",
                  }}
                  onClick={toggleDrawer(true)}
                >
                  <Typography variant="h5" style={{ fontWeight: "bolder" }}>
                    Explore Societies
                  </Typography>
                </Button>
              </center>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid p-2 m-0">
        <div className="row m-0">
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Junoon"
              src="https://lh3.googleusercontent.com/proxy/vsD9d97tUzWGGc7DmOOYkw2HKiNwpMAU6KcN0nk7dKQhnue2tzXj4XejYP-1J3UtjFJwyI-sfGDRW5F2HEZXScs4QHIMHoqF0tXbullnfBc"
            />
            <div class="overlay">
              <div class="text">
                <p>Photography Society</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Ashwamedh"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t31.0-8/20451656_568197123350883_5172117675625138101_o.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=SYEFrONi5b4AX_PD2Ba&_nc_ht=scontent.fdel17-1.fna&oh=7641c473ebad562ad2a6fa6f5fbf46ae&oe=6039FA83"
            />
            <div class="overlay">
              <div class="text">
                <p>Dramatics Society</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Mirage"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/16830904_1245365578865357_7797842803548726049_n.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_ohc=YptErFoMwVcAX_JTxN0&_nc_ht=scontent.fdel17-1.fna&oh=d4f02fd698bf2e3c51af9c4279f368de&oe=603CF2F1"
            />
            <div class="overlay">
              <div class="text">
                <p>Western Dance Society</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Crescendo"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/137379342_1596488520554365_3161804021312318443_o.jpg?_nc_cat=101&ccb=2&_nc_sid=09cbfe&_nc_ohc=MlIGAE0N-98AX9L0hox&_nc_ht=scontent.fdel17-1.fna&oh=8acf9809ceb5f099385b10c0892378e8&oe=603BF412"
            />
            <div class="overlay">
              <div class="text">
                <p>Music Society</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Quiz Club"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t31.0-8/12356886_1183961758298364_4974490214301537083_o.png?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=yKqiGJOWQ88AX-Kuyzq&_nc_ht=scontent.fdel17-1.fna&oh=7389926c711fac2654bfcb1f1a3b9852&oe=603BCD52"
            />
            <div class="overlay">
              <div class="text">
                <p>Quiz Club</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Capella"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/42970365_2125186841142328_9042163307892441088_o.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=DZ1oCosZudoAX-uOElL&_nc_ht=scontent.fdel17-1.fna&oh=e56c88f2ee6f8016c04f26a8fd2b873e&oe=603ADA00"
            />
            <div class="overlay">
              <div class="text">
                <p>Choroeography Society</p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row m-0">
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Debsoc"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/45683125_2447344512007300_6428125978232356864_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=Ay9Ja_74200AX94oVgb&_nc_ht=scontent.fdel17-1.fna&oh=090f1aa51fcb1530ae7482f12022e7cf&oe=6039EAF4"
            />
            <div class="overlay">
              <div class="text">
                <p>Debating Society</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Alliance"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/43664734_1834557049945844_3033140358662848512_n.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=Iz_0N2UWvRgAX_NB5yj&_nc_ht=scontent.fdel17-1.fna&oh=f708ba14a4cf6025c192db0a2590477c&oe=603CB439"
            />
            <div class="overlay">
              <div class="text">
                <p>Newspaper Society</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="FES"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/12122800_726979844112767_4974342825613770370_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=33zYQ0gdqV4AX916Eea&_nc_ht=scontent.fdel17-1.fna&oh=3a2eaaceacb6d63c0a54cdf95bbeda8f&oe=603C7437"
            />
            <div class="overlay">
              <div class="text">
                <p>Finance and Economics Society</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Enactus"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/106420272_3222463924441709_2138731017044847741_n.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_ohc=X4q2F58N7HkAX8oyNLJ&_nc_ht=scontent.fdel17-1.fna&oh=79d11accd2255472c70592ae48bc6a67&oe=603A2F45"
            />
            <div class="overlay">
              <div class="text">
                <p>Social Entrepreneurship Society</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="eCell"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t31.0-8/12232788_1018516614865630_3398755910562480406_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_ohc=9cya-E3V5d4AX9xj30v&_nc_ht=scontent.fdel17-1.fna&oh=9db589c5f60c7df106f2888871497547&oe=603AEB49"
            />
            <div class="overlay">
              <div class="text">
                <p>Entrepreneurial Society</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-6 mb-3 hover">
            <img
              className="img-fluid"
              alt="Bullethawk Racing"
              src="https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/402055_336580263048724_557784971_n.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=O4B-2rKFKT0AX87k93K&_nc_ht=scontent.fdel17-1.fna&oh=7c8f76a68c3c3577c645cf9462a95f3a&oe=60395AD2"
            />
            <div class="overlay">
              <div class="text">
                <p>Formula SAE Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ backgroundColor: "#16A596" }}>
        <div className="row">
          <div className="col-12">
            <br />
            <center>
              <Typography variant="h3">
                Benefits of Joining a Society
              </Typography>
            </center>
            <br />
          </div>
          <div className="offset-md-2 col-md-8 col-12">
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
            <br />
          </div>
        </div>
      </div>
      <footer>
        <div
          className="container-fluid p-3"
          style={{ backgroundColor: "yellowgreen" }}
        >
          <div className="row">
            <div className="col-4 my-auto">
              <Typography variant="h5">
                <a
                  href="/home"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  © <strong>nescii</strong>
                </a>
              </Typography>
            </div>
            <div className="col-4 my-auto">
              <Typography variant="h5">Made with ❤ by Team OOC</Typography>
            </div>
            <div className="col-4 my-auto">
              <Instagram style={{ fontSize: "3rem" }} />
              <Facebook style={{ fontSize: "3rem" }} />
              <LinkedIn style={{ fontSize: "3rem" }} />
              <Email style={{ fontSize: "3rem" }} />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default SocietyDefault;
