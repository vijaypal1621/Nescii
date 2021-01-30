import { Avatar, Button } from "@material-ui/core";
import { ThumbUp } from "@material-ui/icons";
import React,{useState,useEffect} from "react";
import "./SocietyPost.css";
import {db} from './firebase';
import {useStateValue} from './StateProvider';
import { useParams } from "react-router-dom";
import firebase from 'firebase';
<<<<<<< HEAD


function SocietyPost({postId, profilePic, image, username, timestamp, message }) {


  const [comments, setComments] = useState([]);
  const [comment,setComment]  = useState('');
  const [{user}] = useStateValue();
  const { societyId } = useParams();
  

  
  useEffect(() => {
    if(postId){
            db
            .collection('societies')
            .doc(societyId)
                .collection("posts")
                .doc(postId)
            .collection('comments')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data() ))
            });
    }
}, [postId, societyId]);

const societyPostComment = (event) => {
  event.preventDefault();

  db
  .collection('societies')
  .doc(societyId)
  .collection("posts")
  .doc(postId)
  .collection('comments').add({
      text: comment,
      username: user?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  setComment('');

}

=======


function SocietyPost({postId, profilePic, image, username, timestamp, message }) {


  const [comments, setComments] = useState([]);
  const [comment,setComment]  = useState('');
  const [{user}] = useStateValue();
  const { societyId } = useParams();
  

  
  useEffect(() => {
    if(postId){
            db
            .collection('societies')
            .doc(societyId)
                .collection("posts")
                .doc(postId)
            .collection('comments')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data() ))
            });
    }
}, [postId, societyId]);

const societyPostComment = (event) => {
  event.preventDefault();

  db
  .collection('societies')
  .doc(societyId)
  .collection("posts")
  .doc(postId)
  .collection('comments').add({
      text: comment,
      username: user?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  setComment('');

}

console.log(societyId);
console.log(postId);
  console.log(comments);
>>>>>>> 307a6bd65c1baf5603055341df00f6fa68ef6746
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
        <p>{message}</p>
      </div>
      <div className="post__image">
        <img src={image} alt="" />
      </div>
      <div className="post__options">
        {/* <div className="post__option">
          <ThumbUp />
          <p>..1..</p>
        </div> */ } 
        <form className="post__commentBox">
                <input className='post__input' type='text' placeholder='Add a comment..' value={comment} 
                        onChange={(e)=> setComment(e.target.value)} />
                <Button style={{justifyContent:"end"}} className='post__button' disabled={!comment} type='submit' onClick={societyPostComment}>Post</Button>
        </form>
        <div className='post__comments'>
              {!comments?(""): (comments.map((comment) => (
                <p style={{overflowWrap:"anywhere", margin:"0"}}>
                  <strong>{comment.username}</strong> {comment.text}
                </p>
              )))}
        </div>
            
      </div>
    </div>
  );
}

export default SocietyPost;
