import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { useParams } from "react-router-dom";

export const Comments = observer((props) => {
  const { applicationId } = useParams();
  const rootStore = useContext(RootStoreContext);
  const { commentsStore } = rootStore;
  const { commentList, commentCount, nextPage } = commentsStore;
  const { seekerShelterStore } = rootStore;

  const [shelterUser, setShelterUser] = useState(null);
  const [seekerUser, setSeekerUser] = useState(null);

  //I have to add to the use effect to get the seeker shelter store to get the user and add it to the message
  useEffect(() => {
    const fetchData = async () => {
      await commentsStore.initializeCommentsPage(applicationId);
    };

    fetchData();
  }, []);

  function renderMessages() {
    if (commentCount === 0) {
      return (
        <div className="ApplicationsPage__pagination">
          <h1 className="BoldPurpleText">
            There are no messages that fit your search criteria
          </h1>
        </div>
      );
    }

    return (
      <div className="MessagePage__messages">
        {commentList.map((comment) => (
          <div className="Message__message" key={comment.id}>
            <h1 className="Message__messageHeader">{comment.user}</h1>
            <p className="Message__messageBody">{comment.content}</p>
          </div>
        ))}
      </div>
    );
  }

  const [newComment, setNewComment] = useState(""); // State to track the new comment text

  const handleCreateComment = () => {
    commentsStore.createComment(applicationId, newComment);

    setNewComment("");
  };

  return (
    <div className="Application__mainCol">
      <div className="MessagePage__messages">{renderMessages()}</div>
      <textarea
        className="Message__textarea"
        name="message"
        placeholder="Message Spongeboi here"
        rows="4"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button onClick={handleCreateComment}>Send</button>
    </div>
  );
});
