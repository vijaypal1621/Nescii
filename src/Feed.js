import React, { useEffect } from "react";
import "./Feed.css";
import MessageSender from "./MessageSender";
import Post from "./Post";
import { fetchPosts } from "./redux/ActionCreators";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { AnimatedList } from "react-animated-list";

function DisplayPosts({ posts, isLoading, errMess }) {
  if (isLoading) {
    return (
      <center>
        <Loading type={"spinningBubbles"} color={"#ff0000"} />
      </center>
    );
  } else if (errMess) {
    return (
      <center>
        <h4>{errMess}</h4>
      </center>
    );
  } else {
      return (
        <AnimatedList initialAnimationDuration={2000}>
          {posts?.map(({ post, id }) => {
            return (
              <Post
                key={id}
                uid={post?.uid}
                username={post?.username}
                postId={id}
                likes={post?.likes}
                message={post?.message}
                profilePic={post?.profilePic}
                timestamp={post?.timestamp}
                images={post?.images}
                video={post?.video}
              />
            );
          })}
        </AnimatedList>
      );
    }
  }


function Feed() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="feed col-12">
      <MessageSender />
      <DisplayPosts
        posts={posts.posts}
        isLoading={posts.isLoading}
        errMess={posts.errMess}
      />
    </div>
  );
}

export default Feed;
