import { action, makeObservable, observable } from "mobx";
import * as commentsService from "../requests/commentsRequests";
import app from "../App";

export class CommentsStore {
  commentList = [];
  commentCount = 0;
  isLoading = false;
  nextPage = null;

  constructor() {
    makeObservable(this, {
      commentList: observable,
      isLoading: observable,
      commentCount: observable,
      nextPage: observable,
      setIsLoading: action,
      setCommentCount: action,
      setCommentList: action,
      setNextPage: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setCommentList = (commentList) => {
    this.commentList = commentList;
  };

  setCommentCount = (commentCount) => {
    this.commentCount = commentCount;
  };

  setNextPage = (nextPage) => {
    this.nextPage = nextPage;
  };

  extendCommentList = (commentList) => {
    this.commentList = [...this.commentList, ...commentList];
  };

  extendCommentCount = (commentCount) => {
    this.commentCount = this.commentCount + commentCount;
  };

  initializeCommentsPage = async (applicationId) => {
    this.setIsLoading(true);

    try {
      const response = await commentsService.getComments(applicationId);

      const { count, results, next } = response.data;

      this.setCommentCount(count);
      this.setCommentList(results);
      if (next) {
        this.setNextPage(next);
      }
    } catch (err) {
      console.log("failed to get comments");
    }

    this.setIsLoading(false);
  };

  getCommentsNextPage = async () => {
    this.setIsLoading(true);

    try {
      const response = await commentsService.getCommentsNextPage(this.nextPage);

      const { count, results, next } = response.data;

      this.extendCommentCount(count);
      this.extendCommentList(results);
      if (next) {
        this.setNextPage(next);
      } else {
        this.setNextPage(null);
      }
    } catch (err) {
      console.log("failed to get comments");
    }

    this.setIsLoading(false);
  };

  createComment = async (applicationId, formData) => {
    this.setIsLoading(true);

    try {
      // Post the new comment
      const response = await commentsService.postCommentEndpoint(
        applicationId,
        { content: formData },
      );

      const newComment = response.data;

      this.commentList.push(newComment);

      this.commentCount += 1;
    } catch (error) {
      console.log("Failed to post comment", error);
    }

    this.setIsLoading(false);
  };

  
}

export default CommentsStore;
