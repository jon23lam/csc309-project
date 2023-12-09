import React, { useContext, useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../../providers/RootProvider";
import { useParams } from "react-router-dom";
import "./Comments.scss";
import "../../../BaseStyles.scss";
import "../Applications/ApplicationsPage.scss";
import { getApplicationUsers } from "../../../requests/applicationRequests";

export const Comments = observer((props) => {
  const { applicationId } = useParams();
  const rootStore = useContext(RootStoreContext);
  const { commentsStore } = rootStore;
  const { commentList, commentCount, nextPage, isLoading } = commentsStore;
  const [shouldScrollToLatest, setShouldScrollToLatest] = useState(true);

  const seekerUser = props.seekerUser;
  const shelterUser = props.shelterUser;

  const containerRef = useRef(null); // Ref for the container element

  

  useEffect(() => {
    const fetchData = async () => {
      await commentsStore.initializeCommentsPage(applicationId);
    };

    fetchData();
  }, [applicationId]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollTop + containerRef.current.clientHeight >=
          containerRef.current.scrollHeight - 10
      ) {
        if (nextPage) {
          commentsStore.getCommentsNextPage();
        } else {
          setShouldScrollToLatest(false);
        }
      }
    };

    containerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [nextPage, applicationId]);

  function renderMessages() {
    return (
      <div className="MessagePage__messages" ref={containerRef}>
        {seekerUser && shelterUser ? 
        commentList.map((comment) => (
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
        )) : <></>}
      </div>
    );
  }

  const [newComment, setNewComment] = useState("");

  const handleCreateComment = () => {
    commentsStore.createComment(applicationId, newComment);
    setNewComment("");
  };

  return (
    <div className="Application__mainCol">
      {renderMessages()}
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
