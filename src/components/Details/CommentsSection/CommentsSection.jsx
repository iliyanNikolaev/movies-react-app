import './CommentsSection.css'
import { useEffect, useState } from "react"
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/authContext'
import { useForm } from '../../../hooks/useForm'
import { createCommentForMovie, deleteCommentById, getAllCommentsForMovie } from '../../../services/comment'
import { useError } from '../../../hooks/useError'

import CommentItem from './CommentItem/CommentItem'
import AddCommentForm from './AddCommentForm/AddCommentForm'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import ErrorMsg from '../../ErrorMsg/ErrorMsg'

export default function CommentsSection({
    movieId
}) {
    const [addLoading, setAddLoading] = useState(false);

    const [commentsLoading, setCommentsLoading] = useState(true);

    const [comments, setComments] = useState([]);

    const { auth } = useContext(AuthContext);

    const { formValues, onChange } = useForm({ content: '' });

    const { hasError, reportError, errorText } = useError();

    const formSubmit = async (e) => {
        e.preventDefault();

        const commentContent = formValues.content.trim();

        if (formValues.content == '') {
            return reportError('Comment cannot be an empty field!');
        }

        if(formValues.content.length < 2 || formValues.content.length > 300) {
            return reportError('Comment must be between 2 and 300 characters!');
        }

        try {
            setAddLoading(true);
            const createdComment = await createCommentForMovie({
                content: commentContent,
                username: auth.username,
                movieId
            }, auth.objectId);

            setComments(state => [...state, createdComment]);

            formValues.content = '';

            setAddLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    const onDeleteHandler = async (commentId, commentContent) => {
        try {
            const choice = confirm('Are you sure you want to delete this comment >>> ' + commentContent);

            if (choice) {
                await deleteCommentById(commentId);

                setComments(state => state.filter(x => x.objectId != commentId));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getAllCommentsForMovie(movieId)
            .then(data => {
                setComments(data.results)
                setCommentsLoading(false);
            });

    }, [movieId]);


    return (
        <div className="comments-section">
            <h2>Comments: </h2>

            { hasError ? <ErrorMsg text={errorText} /> : null }

            {commentsLoading
                ? <LoadingSpinner />
                : <>
                    {comments.length >= 1
                        ? <ul>
                            {comments.map(x => <CommentItem key={x.objectId} comment={x} onDeleteHandler={onDeleteHandler} />)}
                        </ul>
                        : <p>No comments yet for this movie...</p>
                    }

                    {
                        auth?.objectId != undefined
                            ? <>{addLoading ? <LoadingSpinner /> : <AddCommentForm formSubmit={formSubmit} formValues={formValues} onChange={onChange} />}</>
                            : null
                    }
                </>
            }

        </div>
    )
}
