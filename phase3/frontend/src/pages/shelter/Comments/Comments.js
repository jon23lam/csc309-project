import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { useParams } from "react-router-dom";
import "./Comments.scss";
import "../../../BaseStyles.scss";
import "../Applications/ApplicationsPage.scss";

export const Comments = observer((props) => {
  const { applicationId } = useParams();
  const rootStore = useContext(RootStoreContext);
  const { commentsStore } = rootStore;
  const { commentList, commentCount, nextPage } = commentsStore;

  const { seekerUser, shelterUser } = props; // Receive seekerUser and shelterUser as props

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
            There are no messages for this application
          </h1>
        </div>
      );
    }

    return (
      <div className="MessagePage__messages">
        {commentList.map((comment) => (
          <div className="Message__message" key={comment.id}>
            {comment.author === seekerUser.id && (
              <div>
                <span className="Message__userName">
                  {seekerUser.first_name} {seekerUser.last_name}:
                </span>
                <span>{comment.content}</span>
              </div>
            )}

            {comment.author === shelterUser.id && (
              <div>
                <span className="Message__userName">
                  {shelterUser.shelter_name}:
                </span>
                <span>{comment.content}</span>
              </div>
            )}
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
        placeholder="Enter your message here"
        rows="4"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button className="Button__purple" onClick={handleCreateComment}>
        Send
      </button>
    </div>
  );
});
