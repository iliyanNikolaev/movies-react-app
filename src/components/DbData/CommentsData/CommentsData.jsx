import { useState, useEffect } from "react"
import { usePagination } from "../../../hooks/usePagination";
import { getAllComments, deleteCommentById } from "../../../services/comment";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import DbCommentItem from "./DbCommentItem";

export default function CommentsData() {

    const [isLoading, setIsLoading] = useState(true);

    const [comments, setComments] = useState([]);

    const { start, end, next, prev } = usePagination(comments, 3);

    const onDelete = async (commentId, content) => {
        const choice = confirm(`Are you sure you want to delete this comment >>> ${content}`);

        if(choice) {
            deleteCommentById(commentId);

            setComments(state => state.filter(x => x.objectId !== commentId));
        }
    }

    useEffect(() => {
        getAllComments()
            .then(data => {
                setComments(data.results);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="comments">
            {isLoading ? <LoadingSpinner className="db-loading"/>
                : <div className="comments-wrapper">
                    <h3>Comments</h3>
                    {
                        comments.slice(start, end).map(x => <DbCommentItem key={x.objectId} comment={x} onDelete={onDelete} />)
                    }

                    <div className="paginationBtns">
                        <button onClick={prev} disabled={ start <= 0 ? true : false}>&lt; Prev</button>
                        <button onClick={next} disabled={ end >= comments.length ? true : false}>Next &gt;</button>
                    </div>
                </div>
            }
        </div>

    )
}
