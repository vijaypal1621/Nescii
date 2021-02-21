import {
  Typography,
  Button,
  Drawer,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fade,
  Grow,
} from "@material-ui/core";
import React, { useState,useEffect } from "react";
import SocietySidebar from "./SocietySidebar";
import "./SocietyDefault.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Instagram, Facebook, LinkedIn, Email } from "@material-ui/icons";
import { useInView } from "react-intersection-observer";
import {db} from './firebase';
// swiperjs
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFlip,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Zoom,
  EffectFade,
  EffectCube,
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/effect-cube/effect-cube.less";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/zoom/zoom.scss";
SwiperCore.use([EffectFade,Autoplay ,Navigation, Pagination, Scrollbar, A11y, Zoom]);


function SocietyDefault() {
  const [state, setState] = useState(false);
  const [ref, socsInView, entry] = useInView({
    /* Optional options */
    threshold: 0.4,
  });
  const [ref2, InView, entry2] = useInView({
    /* Optional options */
    threshold: 0.4,
  });
  const [ref3, frontInView, entry3] = useInView({
    /* Optional options */
    threshold: 0.4,
  });
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // run this code ONCE when society sidebar component loads
    db.collection("societies").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          category: doc.data().category,
          imageURL: doc.data().imageURL,
        }))
      )
    );
  }, []); //whenever name inside the "[]" changes

  return (
    <>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <SocietySidebar />
      </Drawer>
      <Swiper
          effect="fade"
          navigation
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="col-12"
        >
        <SwiperSlide>
          <Fade in={frontInView}>
          <header
          class="jumbotron jumbotron-fluid"
          ref={ref3}
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
        </Fade>
        </SwiperSlide>
        <SwiperSlide>
        <Fade in={InView}>
        <header
          ref={ref2}
          class="jumbotron jumbotron-fluid"
          style={{
            backgroundImage: `url(https://mispronouncedname.files.wordpress.com/2013/05/image009.jpg)`,
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
                  Never miss a society meeting with reminders to help you secure
                  that <strong style={{ color: "magenta" }}>POR</strong>
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
      </Fade>
        </SwiperSlide>
        
        </Swiper>


      
      
      <Grow in={socsInView} {...(socsInView ? { timeout: 1000 } : {})}>
        <div className="container-fluid p-2 m-0" ref={ref}>
          <div className="row m-0">
            {channels.map(({category,imageURL})=>{
              return (
                <div className="col-md-2 col-6 mb-3 hover">
              <img
                className="img-fluid"
                alt="Junoon"
                src={imageURL}
              />
              <div class="overlay">
                <div class="text">
                  <p>{category}</p>
                </div>
              </div>
            </div>
              )

            })}
            
          </div>
        </div>
      </Grow>
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
            <div className="col-md-4 col-12 my-auto p-2">
              <center>
                <Typography variant="h5">
                  <a
                    href="/home"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    © <strong>nescii</strong>
                  </a>
                </Typography>
              </center>
            </div>
            <div className="col-md-4 col-12 my-auto  p-2">
              <center>
                <Typography variant="h5">Made with ❤ by Team OOC</Typography>
              </center>
            </div>
            <div className="col-md-4 col-12 my-auto  p-2">
              <center>
                <Instagram style={{ fontSize: "3rem" }} />
                <Facebook style={{ fontSize: "3rem" }} />
                <LinkedIn style={{ fontSize: "3rem" }} />
                <Email style={{ fontSize: "3rem" }} />
              </center>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default SocietyDefault;
