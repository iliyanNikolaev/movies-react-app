import { Link } from "react-router-dom";

export default function OwnerBtns({
    currentMovie, onDelete
}) {
    return (
        <div className='ownerBtns'>
            <Link to={`/edit/${currentMovie.objectId}`} className='editBtn'>Edit movie</Link>
            <Link onClick={onDelete} to='#' className='deleteBtn'>Delete movie</Link>
        </div>
    )
}
