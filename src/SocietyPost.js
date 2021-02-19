import { Avatar, Button, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./SocietyPost.css";
import { db } from "./firebase";
import ReactPlayer from "react-player";
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

// swipper example

import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, {
  EffectFade,
  EffectFlip,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Zoom,
} from "swiper";

import "swiper/swiper.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/zoom/zoom.scss";
SwiperCore.use([EffectFlip, Navigation, Pagination, Scrollbar, A11y, Zoom]);

function SocietyPost({
  postId,
  profilePic,
  images,
  video,
  username,
  likes,
  uid,
  timestamp,
  message,
}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [{ user }] = useStateValue();
  const [liked, setLiked] = useState(false);
  const { societyId } = useParams();

  useEffect(() => {
    if (postId) {
      db.collection("societies")
        .doc(societyId)
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }
  }, [postId, societyId, liked]);

  useEffect(() => {
    if (postId) {      
      for (let i = 0; i < likes?.length; i++) {
        if (user?.uid === likes[i]) {
          setLiked(true);
          console.log(message + " is liked");
        }
      }

      if(likes===undefined){
        likes=[];
      }

      

      db.collection("societies")
        .doc(societyId)
        .collection("posts")
        .doc(postId)
        .update({
          likes: likes,
        })
        .then(function () {
          console.log(message + " Like Updated Successfully!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
      // console.log(liked);
    }
  }, [postId,liked]);



  const handleCommentDelete = (commentId)=>{
    db.collection("societies")
      .doc(societyId)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const societyPostComment = (event) => {
    event.preventDefault();
    if (user?.email.includes("gmail") === false) {
      db.collection("societies")
        .doc(societyId)
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
          text: comment,
          url: user?.photoURL,
          username: user?.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid: user?.uid,
        });
    } else {
      alert("Not a NSUT student! Please sign in with NSUT id to continue.");
    }

    setComment("");
  };
  const handlePostDelete = () => {
    db.collection("societies")
      .doc(societyId)
      .collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const body2 = <></>;
  const body = (
    <>
      {
        <Swiper
          effect="flip"
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          className="col-12"
        >
          {images?.map((image, el) => {
            return (
              <SwiperSlide>
                <img
                  style={{
                    objectFit: "contain",
                    height: "300px",
                    padding: "0px 0px 0px 0px",
                    width: "100%",
                  }}
                  src={image}
                  alt=""
                />
              </SwiperSlide>
            );
          })}
          {video !== undefined ? (
            <SwiperSlide className="col-12 ">
              <ReactPlayer
                url={video}
                // width="250px"
                objectFit="cover"
                style={{ height: "300px", padding: "0px 0px 30px 0px" }}
                controls={true}
                className="col-12 "
              />
            </SwiperSlide>
          ) : (
            ""
          )}
        </Swiper>
      }
    </>
  );

  const condition = () => {
    if (images === undefined && video === undefined) {
      return body2;
    } else if (
      images !== undefined &&
      video === undefined &&
      images.length === 1
    ) {
      return (
        <>
          <div className="post__image row justify-content-center">
            <img src={images[0]} alt="" />
          </div>
        </>
      );
    } else if (images === undefined && video !== undefined) {
      return (
        <>
          <ReactPlayer
            url={video}
            style={{ height: "250px", objectFit: "contain" }}
            controls={true}
            className="col-10 offset-1"
          />
        </>
      );
    } else {
      return body;
    }
  };
  
  const handleLikes = () => {
    if (liked) {
      for (var i = 0; i < likes.length; i++) {
        if (likes[i] === user?.uid) {
          likes.splice(i, 1);
        }
      }
      setLiked(false);
    } else {
      likes.push(user?.uid);
      setLiked(true);
    }
    // console.log(db.collection("home").doc(postId))
  };

  const checkColor = () => {
    for (let i = 0; i < likes?.length; i++) {
      if (user?.uid === likes[i]) {
        return "blue";
      }
    }
    return "gray";
  };



  return (
    <div className="post">
      <div className="post__top">
        <div className="post__info__container">
          <Avatar src={profilePic} className="post__avatar" alt="Profile Pic" />
          <div className="post__topInfo">
            <h3 style={{ margin: "0" }}>{username}</h3>
            <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
            {/* <p>timestamp....</p> */}
          </div>
        </div>
        {uid === user?.uid ? <DeleteIcon onClick={handlePostDelete} /> : ""}
      </div>
      <div className="post__bottom">
        <p style={{ overflowWrap: "anywhere" }}>{message}</p>
      </div>
      {/* <div className="post__image">
        <img src={image} alt="" />
      </div> */}
      {/* Carousel */}

      {condition()}
      {/* {images===undefined ? (body2): (body) } */}
      {/* cond-1 when both are null */}
      {/* {images===undefined && video===undefined ? (body2): (body) } */}

      {/* cond-2 when only one image is there , video being absent */}
      {/* cond-3 when only video is present */}
      {/* cond-4 when two or more images are present, video absent */}
      {/* cond-5 all present */}

      <div className="post__options">
        <div style={{ display: "flex" }}>
          <ThumbUpAltIcon
            onClick={handleLikes}
            style={{ color: checkColor(), marginRight: "8px" }}
          />
          <p>{likes?.length}</p>
        </div>
        <form className="post__commentBox">
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
            onClick={societyPostComment}
          >
            Post
          </Button>
        </form>
        <div className="post__comments">
        {!comments
            ? ""
            : comments.map(({ comment, id }) => {
                return (
                  <div className="comment__div__container">
                    <div className="comment__div">
                        <Avatar src={comment.url} alt="" />
                        <p>
                          <strong>{comment.username}</strong> {comment.text}
                        </p>
                    </div>
                    {user?.uid===comment.uid? (<DeleteIcon onClick={()=>handleCommentDelete(id)} />):("") }
                    
                  </div>
                  
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default SocietyPost;