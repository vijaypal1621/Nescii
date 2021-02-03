import { Avatar, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Post.css";
import firebase from "firebase";
import ReactPlayer from 'react-player';
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
function Post({ postId, profilePic, image, username, timestamp, message }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [{ user }] = useStateValue();

  // useEffect(() => {
  //   if (postId) {
  //     db.collection("home")
  //       .doc(postId)
  //       .collection("comments")
  //       .orderBy("timestamp", "desc")
  //       .onSnapshot((snapshot) => {
  //         setComments(snapshot.docs.map((doc) => doc.data()));
  //       });
  //   }
  // }, [postId]);

  // const postComment = (event) => {
  //   event.preventDefault();

  //   db.collection("home").doc(postId).collection("comments").add({
  //     text: comment,
  //     username: user?.displayName,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  //   setComment("");
  // };

  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" alt="Profile Pic" />
        <div className="post__topInfo">
          <h3 style={{ margin: "0" }}>{username}</h3>
          {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
          <p>timestamp....</p>
        </div>
      </div>
      <div className="post__bottom">
        <p style={{ overflowWrap: "anywhere" }}>{message}</p>
      </div>
      {/* <div className="post__image">
        <img src={image} alt="" />
      </div> */}
      {/* Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="false">s
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div class="carousel-item col-8 offset-2 active">
      <img style={{height:"250px",objectFit:"contain"}} src="http://en.wikipedia.org/wiki/Special:FilePath/Netaji_Subhas_University_of_Technology.svg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item col-8 offset-2">
      <img style={{height:"250px",objectFit:"contain" }} src="https://ipl2020schedule.co.in/wp-content/uploads/2019/07/Vivo-IPL-2020-Schedule.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item col-8 offset-2">
      <img style={{height:"250px",objectFit:"contain" }} src="https://lh3.googleusercontent.com/a-/AOh14Gh95KiyNVSSbq7jC1c5nNE1XbCyP1yryz-OC8M7Xg=s96-c-rg-br100" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item col-8 offset-2">
      <img style={{height:"250px",objectFit:"contain" }} src="https://lh3.googleusercontent.com/a-/AOh14Gh95KiyNVSSbq7jC1c5nNE1XbCyP1yryz-OC8M7Xg=s96-c-rg-br100" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item col-8 offset-2">
    <ReactPlayer
                url="https://youtu.be/Z79N1EWXx3E"
                width="250px"
                // height="100%"
                style={{height:"250px",objectFit:"contain" }}
                controls={true}
                className="d-block w-100"
              />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon bg-primary" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon bg-dark text-danger" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>







      <div className="post__options">
        {/* <div className="post__option">
          <ThumbUp />
          <p>..1..</p>
        </div> */}
        {/* <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ justifyContent: "end" }}
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form> */}
        {/* <div className="post__comments">
          {!comments
            ? ""
            : comments.map((comment) => {
                return (
                  <div className="comment__div">
                    <Avatar src={comment.url} alt="" />
                    <p>
                      <strong>{comment.username}</strong> {comment.text}
                    </p>
                  </div>
                );
              })}
        </div> */}
      </div>
    </div>
  );
}

export default Post;
