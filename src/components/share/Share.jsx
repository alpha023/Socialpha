import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@material-ui/icons";
import React, { useContext, useRef, useState } from "react";
import "./share.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/Firebase";
import { SERVER_URL } from "../../Constants";

const Share = () => {
  const { user } = useContext(AuthContext);
  //TODO profile pic
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    // const newPost = {
    //   userId: user._id,
    //   desc: desc.current.value,
    // };
    console.log(file);
    if (file) {
      // const data = new FormData();
      // const filename = `${Date.now()}${file.name}`;
      // data.append("name", filename);
      // data.append("file", file);
      // newPost.img = filename;
      // console.log(`xjhiijixx${data}xxjojpojpjx`);
      // try {
      //   await axios.post(`http://localhost:8000/api/upload`, data);
      //   window.location.reload();
      // } catch (err) {
      //   console.log(err);
      // }
      const storageRef = ref(storage, `/posts/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            console.log(url);
            // const user = {
            //   username: username.current.value,
            //   email: email.current.value,
            //   password: password.current.value,
            //   profilePic: url,
            // };
            const newPost = {
              userId: user._id,
              desc: desc.current.value,
              img:url
            };

            try {
              await axios.post(`${SERVER_URL}/api/posts/createpost`, newPost);
              window.location.reload();
            } catch (err) {
              console.log(err);
            }
          });
        }
      );
    }

    // try {
    //   await axios.post(`http://localhost:8000/api/posts/createpost`, newPost);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePic} alt="" />
          <input
            placeholder={`What's in your mind ${user.username} ?`}
            type="text"
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
