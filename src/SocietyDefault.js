import { Typography, Button, Drawer, Grow } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SocietySidebar from "./SocietySidebar";
import "./SocietyDefault.css";
import { Instagram, Facebook, LinkedIn, Email } from "@material-ui/icons";
import { useInView } from "react-intersection-observer";
import { db } from "./firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Zoom,
  EffectFade,
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/effect-cube/effect-cube.less";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/zoom/zoom.scss";
SwiperCore.use([
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Zoom,
]);

function SocietyDefault() {
  const [state, setState] = useState(false);
  const [ref, socsInView, entry] = useInView({
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
    db.collection("societies").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          category: doc.data().category,
          imageURL: doc.data().imageURL,
        }))
      )
    );
  }, []);

  return (
    <>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <SocietySidebar />
      </Drawer>
      <Swiper
        effect="fade"
        // navigation
        autoplay={{ delay: 3000 }}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        className="col-12"
      >
        <SwiperSlide>
          <header
            class="jumbotron jumbotron-fluid"
            style={{
              backgroundImage: `url(https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/74228915_410870179579729_1615985920475922432_o.jpg?_nc_cat=111&ccb=3&_nc_sid=730e14&_nc_ohc=ypWr6LU6q6YAX-GyI3p&_nc_ht=scontent.fdel17-1.fna&oh=46e4a9be06b6b4f2c412d5f7ff8f4663&oe=6057AEE9)`,
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
                    <strong style={{ color: "yellowgreen" }}>nescii</strong>,
                    the social media solution for all NSUTians.
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
        </SwiperSlide>

        <SwiperSlide>
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
        </SwiperSlide>
        <SwiperSlide>
          <header
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
                    Never miss a society meeting
                    <br />
                    with reminders to help you secure that <strong>POR</strong>!
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
        </SwiperSlide>
        <SwiperSlide>
          <header
            class="jumbotron jumbotron-fluid"
            style={{
              backgroundImage: `url(https://scontent.fdel17-1.fna.fbcdn.net/v/t1.0-9/52156568_2005858076149073_4842097725228974080_n.jpg?_nc_cat=109&ccb=3&_nc_sid=8bfeb9&_nc_ohc=ZJw8wryL20MAX_DsOI9&_nc_ht=scontent.fdel17-1.fna&oh=2c529616e811e7cba0519681c10aca3e&oe=60597423)`,
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
                    NSUT is a happening place. Avoid FOMO with{" "}
                    <strong style={{ color: "green" }}>nescii</strong>
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
        </SwiperSlide>
      </Swiper>

      <Grow in={socsInView} {...(socsInView ? { timeout: 1000 } : {})}>
        <div className="container-fluid p-2 m-0" ref={ref}>
          <div className="row m-0">
            {channels.map(({ category, imageURL }) => {
              return (
                <div className="col-md-2 col-6 mb-3 hover">
                  <img className="img-fluid" alt="Junoon" src={imageURL} />
                  <div class="overlay">
                    <div class="text">
                      <p>{category}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Grow>

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
                <Typography variant="h5">Made with ❤ by
                <br/>
                <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/aaryan-raj-sarda-8983781b1/" > Aaryan</a>  and
                <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/vijay-pal-b40950197/" > Vijay</a> (Team__OOC)</Typography>
              </center>
            </div>
            <div className="col-md-4 col-12 my-auto  p-2">
              <center>
              <a target="_blank" rel="noopener" style={{color:"black"}} href="https://www.instagram.com/vijay._.pal/" > <Instagram style={{ fontSize: "3rem" }} /></a>
              <a target="_blank" rel="noopener" style={{color:"black"}} href="https://www.facebook.com/aaryanraj.sarda" > <Facebook style={{ fontSize: "3rem" }} /></a>
              <a target="_blank" rel="noopener" style={{color:"black"}} href="https://www.linkedin.com/in/aaryan-raj-sarda-8983781b1/" > <LinkedIn style={{ fontSize: "3rem" }} /></a>
              <a href="mailto:nescii101@gmail.com"style={{color:"black"}} ><Email style={{ fontSize: "3rem" }} /></a>
                
                
              </center>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default SocietyDefault;
