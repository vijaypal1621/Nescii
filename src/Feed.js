import React, { useState, useEffect } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import { db } from "./firebase";

function Feed() {
  const [posts, setPosts] = useState([]);
  //   var images = [
  //     "http://en.wikipedia.org/wiki/Special:FilePath/Netaji_Subhas_University_of_Technology.svg",
  //     "http://en.wikipedia.org/wiki/Special:FilePath/Netaji_Subhas_University_of_Technology.svg",
  //     "http://en.wikipedia.org/wiki/Special:FilePath/Netaji_Subhas_University_of_Technology.svg",
  // ]
  // var video=null;

  useEffect(() => {
    db.collection("home")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // every time a new post is added , this code fires off
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="feed col-12">
      <MessageSender />
      {posts.map(({ post, id }) => {
        return (
          <Post
            key={id}
            uid={post.uid}
            likes={post.likes}
            username={post.username}
            postId={id}
            message={post.message}
            profilePic={post.profilePic}
            timestamp={post.timestamp}
            images={post.images}
            video={post.video}
          />
        );
      })}
    </div>
  );
}

export default Feed;
