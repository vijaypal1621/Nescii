import { Avatar, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./SocietyPost.css";
import { db } from "./firebase";
import ReactPlayer from 'react-player';
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router-dom";
import firebase from "firebase";


// swipper example

import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore, { EffectFade , EffectFlip,Navigation, Pagination, Scrollbar, A11y,Zoom } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';
import 'swiper/components/effect-flip/effect-flip.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/zoom/zoom.scss';
SwiperCore.use([EffectFlip,Navigation, Pagination, Scrollbar, A11y,Zoom]);



function SocietyPost({
  postId,
  profilePic,
  images,
  video,
  username,
  timestamp,
  message,
}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [{ user }] = useStateValue();
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
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [postId, societyId]);

  const societyPostComment = (event) => {
    event.preventDefault();

    db.collection("societies")
      .doc(societyId)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text: comment,
        url:user?.photoURL,
        username: user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setComment("");
  };

  console.log(societyId);
  console.log(postId);
  console.log(comments);

  const body2 = (
    <>
    </>
  )
  const body = (
    <>
    {
      <Swiper effect="flip" 
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }} 
      className="col-12"
      >
      {images?.map((image, el) => {
        return (
        <SwiperSlide >
          <img  style={{objectFit:"contain",height:"300px",padding:"0px 0px 0px 0px",width:"100%"}} src={image} alt="" />
        </SwiperSlide>)
      })}
      {video !==undefined ? (
        <SwiperSlide className="col-12 ">
        <ReactPlayer
                    url={video}
                    // width="250px"
                    objectFit="cover"
                    style={{height:"300px",padding:"0px 0px 30px 0px" }}
                    controls={true}
                    className="col-12 "
                  />
        </SwiperSlide>
      ): ("") }

    </Swiper>
  
      
    }
    </>
    
  );

  const condition = ()=> {
    if(images===undefined && video===undefined){
      return body2;
    }
    else if(images !== undefined && video === undefined && images.length===1){
      return (
        <>
        <div className="post__image row justify-content-center">
        <img src={images[0]} alt=""  />
      </div>
        </>
      )
    }
    else if(images===undefined && video !== undefined){
      return (
        <>
        <ReactPlayer
                    url={video}
                    style={{height:"250px",objectFit:"contain" }}
                    controls={true}
                    className="col-10 offset-1"
                    
                  />
        </>
      )
    }
    else {
      return body;
    }
  }




  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
      <p style={{ overflowWrap: "anywhere" }}>{message}</p>
      </div>
      {/* <div className="post__image">
        <img src={image} alt="" />
      </div> */}
      {/* Carousel */}
      
      {condition()}
      {/* {images===undefined ? (body2): (body) } */ }
      {/* cond-1 when both are null */}
      {/* {images===undefined && video===undefined ? (body2): (body) } */}

      {/* cond-2 when only one image is there , video being absent */}
      {/* cond-3 when only video is present */}
      {/* cond-4 when two or more images are present, video absent */}
      {/* cond-5 all present */}


      <div className="post__options">
        {/* <div className="post__option">
          <ThumbUp />
          <p>..1..</p>
        </div> */}
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
        </div>
      </div>
    </div>
  );
}

export default SocietyPost;
