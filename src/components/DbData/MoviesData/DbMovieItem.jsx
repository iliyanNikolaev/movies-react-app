import { useContext } from "react"
import { AuthContext } from "../../../contexts/authContext"
import { MovieContext } from "../../../contexts/movieContext";

export default function DbMovieItem({
    movie
}) {

    const { deleteMovieHandler } = useContext(MovieContext);

    const { auth } = useContext(AuthContext);

    const onDelete = () => {
        const choice = confirm(`Are you sure you want to delete ${movie.title}?`);

        if(choice) {
            deleteMovieHandler(movie.objectId, true);
        }
    }
 
    return (
        <p>{movie.title}
            {auth?.objectId == 'WUPIIfvKlP' ? <button className="db-btn" onClick={onDelete}>Delete</button> : null}
        </p>
    )
}
