import { useContext } from "react"
import { AuthContext } from "../../../contexts/authContext"

export default function DbCommentItem({
    comment,
    onDelete
}) {
    const { auth } = useContext(AuthContext);
    return (
        <p>
            <strong>{comment.username}</strong>: {comment.content}
            {auth?.objectId == 'WUPIIfvKlP'
                ? <button className="db-btn"
                    onClick={() => onDelete(comment.objectId, comment.content)}>Delete</button>
                : null}
        </p>
    )
}
