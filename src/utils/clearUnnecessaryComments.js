import { deleteCommentById, getAllComments } from "../services/comment";
import { getAllMovies } from "../services/movie";

export async function clearUnneccessaryComments() {
    const commentsData = await getAllComments();
    const comments = commentsData.results;

    const moviesData = await getAllMovies();
    const movies = moviesData.results;

    const unnecessaryComments = [];

        comments.forEach(comment => {

            const isExist = movies.some(movie => movie.objectId == comment.movieId);

            if(!isExist) {
                unnecessaryComments.push(comment);
            }
        }); 

        unnecessaryComments.forEach((comment) => {
            deleteCommentById(comment.objectId);
        });
}