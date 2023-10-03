import styles from './CommentItem.module.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/authContext";
import { editCommentById } from "../../../../services/comment";
import { useError } from "../../../../hooks/useError";

import EditCommentForm from "../EditCommentForm/EditCommentForm"
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";

export default function CommentItem({
  comment,
  onDeleteHandler
}) {

  const [currComment, setCurrComment] = useState(comment);

  const onChange = (e) => {
    setCurrComment(state => ({ ...state, content: e.target.value }))
  }

  const [isLoading, setIsLoading] = useState(false);

  const [onEdit, setOnEdit] = useState(false);

  const { auth } = useContext(AuthContext);

  const { hasError, reportError, errorText } = useError();

  const editClicked = (e) => {
    setOnEdit(true);
  }

  const onEditHandler = async () => {
    setIsLoading(true);

    if (currComment.content == '') {
      setIsLoading(false);
      return reportError('Comment cannot be an empty field!');
    }

    if (currComment.content.length < 2 || currComment.content.length > 300) {
      setIsLoading(false);
      return reportError('Comment must be between 2 and 300 characters!');
    }

    const commentContent = currComment.content.trim();

    try {
      const editedComment = await editCommentById(currComment.objectId, {
        content: commentContent,
        username: currComment.username,
        movieId: currComment.movieId,
        owner: currComment.owner
      });

      setCurrComment(editedComment);
      setIsLoading(false);
      setOnEdit(false);

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <li className={styles.comment}>
      <span className={styles.author}>{comment.username}</span>: {onEdit ? null : `${currComment.content}`}
      {currComment.owner.objectId == auth?.objectId
        ? <>
          {onEdit
            ? <>{isLoading
              ? <LoadingSpinner />
              : <EditCommentForm
                currComment={currComment}
                onChange={onChange}
                onEditHandler={onEditHandler}
                hasError={hasError}
                errorText={errorText}
              />}</>
            : <>
              <i className={`fas fa-edit ${styles.icon}`} onClick={editClicked}></i>
              <i className={`fas fa-trash-alt ${styles.icon}`} onClick={() => onDeleteHandler(currComment.objectId, currComment.content)}></i>
            </>
          }
        </>
        : null
      }
    </li>
  )
}
