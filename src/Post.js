import { Avatar } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";
import React,{useState,useEffect} from "react";
import "./Post.css";
import {db} from './firebase';

function Post({ postId,profilePic, image, user, timestamp, message }) {

  const [comments, setComments] = useState([]);

  
    useEffect(() => {
      if(postId){
              db
              .collection('home')
              .doc(postId)
              .collection('comments')
              .orderBy('timestamp','desc')
              .onSnapshot((snapshot)=>{
                  setComments(snapshot.docs.map((doc)=>doc.data() ))
              });
      }
  }, [postId]);

  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" alt="Profile Pic" />
        <div className="post__topInfo">
          <h3 style={{margin:'0'}}>{user}</h3>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p style={{overflowWrap:"break-word"}}>{message}</p>
      </div>
      <div className="post__image">
        <img src={image} alt="" />
      </div>
      <div className="post__options">
        {/* <div className="post__option">
          <ThumbUp />
          <p>..1..</p>
        </div> */}
        <div className='post__comments'>
                {comments.map((comment)=>(
                    <p style={{overflowWrap:"anywhere"}}> <strong>{comment.user}</strong> {comment.text}</p>
                )
                )}
            </div>
      </div>
    </div>
  );
}

export default Post;
