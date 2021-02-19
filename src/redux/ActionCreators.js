import * as ActionTypes from "./ActionTypes";
import cheerioModule from "cheerio";
import { db, storage } from "../firebase";
import firebase from "firebase";

export const addNotices = (notices) => ({
  type: ActionTypes.ADD_NOTICES,
  payload: notices,
});

export const fetchNotices = () => (dispatch) => {
  dispatch(noticesLoading(true));
  fetch(
    "https://cors-anywhere.herokuapp.com/https://www.imsnsit.org/imsnsit/notifications.php"
  )
    .then((response) => response.text())
    .then((html) => {
      let noticesArray = [];
      const $ = cheerioModule.load(html);
      $("tr")
        .slice(4)
        .each((index, notice) => {
          if (notice.children.length !== 1) {
            const noticeObject = {
              url: $(notice).find("a").attr("href"),
              date: notice.firstChild.firstChild.firstChild.data.trim(),
              publisher: $(notice).find("b").text(),
              title: $(notice).find("a").text(),
            };
            noticesArray.push(noticeObject);
          }
        });
      return noticesArray;
    })
    .then((notices) => dispatch(addNotices(notices)))
    .catch((error) => dispatch(noticesFailed(error.message)));
};

export const noticesLoading = () => ({
  type: ActionTypes.NOTICES_LOADING,
});

export const noticesFailed = (errmess) => ({
  type: ActionTypes.NOTICES_FAILED,
  payload: errmess,
});

export const fetchPosts = () => (dispatch) => {
  dispatch(postsLoading(true));
  db.collection("home")
    .orderBy("timestamp", "desc")
    .onSnapshot(
      (snapshot) => {
        // every time a new post is added , this code fires off
        var posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }));
        dispatch(addPosts(posts));
      },
      (error) => {
        dispatch(postsFailed(error.message));
      }
    );
};

export const addPosts = (posts) => ({
  type: ActionTypes.ADD_POSTS,
  payload: posts,
});

export const postsLoading = () => ({
  type: ActionTypes.POSTS_LOADING,
});

export const postsFailed = (errmess) => ({
  type: ActionTypes.POSTS_FAILED,
  payload: errmess,
});


export const postPost = (user, caption,uid, videoURL, photosURL) => () => {
  if (videoURL !== null) {
    const uploadTask = storage.ref(`videos/${videoURL.name}`).put(videoURL);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Video Upload is ' + progress + '% done');
        // setProgress(progress);
      },
      (error) => {
        // error function...
        // console.log(error);
        alert(error.message);
      },
      () => {
        // complete function
        storage
          .ref("videos")
          .child(videoURL?.name)
          .getDownloadURL()
          .then((url) => {
            // console.log(url + " video url is generated");
            // console.log(finalVideo + " Finalvideo url is saved") ;
            //post image inside db
            db.collection("home")
              .add({
                message: caption,
                profilePic: user?.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user?.displayName,
                uid: user?.uid,
                video: url,
              })
              .then((docRef) => {
                if (photosURL.length !== 0) {
                  const promises = photosURL.map((file) => {
                    const ref = firebase
                      .storage()
                      .ref()
                      .child(`homeImages/${file.name}`);
                    return ref.put(file).then(() => ref.getDownloadURL());
                  });
                  Promise.all(promises)
                    .then((fileDownloadUrls) => {
                      db.collection("home")
                        .doc(docRef.id)
                        .update({
                          message: caption,
                          profilePic: user?.photoURL,
                          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                          username: user?.displayName,
                          images: fileDownloadUrls,
                        })
                    })
                    .catch((err) => console.log(err));
                }
                // console.log("Video Successfully Submitted!");
              })
              .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          });
      }
    );
  } else if (photosURL.length !== 0) {
    const promises = photosURL.map((file) => {
      const ref = firebase.storage().ref().child(`homeImages/${file.name}`);
      return ref.put(file).then(() => ref.getDownloadURL());
    });
    Promise.all(promises)
      .then((fileDownloadUrls) => {
        db.collection("home")
          .add({
            message: caption,
            profilePic: user?.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            username: user?.displayName,
            images: fileDownloadUrls,
            uid: user?.uid,
          })
      })
      .catch((err) => console.log(err));
  } else if (caption !== "") {
    db.collection("home")
      .add({
        message: caption,
        profilePic: user?.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user?.displayName,
        uid: user?.uid,
      })
  } else {
    alert("Post is empty !");
  }
};
