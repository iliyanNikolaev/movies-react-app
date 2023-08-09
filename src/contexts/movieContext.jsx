import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMovies, getById, createMovie, editMovie, deleteMovie } from "../services/movie";
import { clearUnneccessaryComments } from "../utils/clearUnnecessaryComments";

export const MovieContext = createContext();

export function MovieCtxProvider({
    children
}) {
    const [movies, setMovies] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllMovies()
            .then(data => {
                setMovies(data.results);
            })
    }, []);

    const getMovieById = async (movieId) => {
        try {
            return getById(movieId);
        } catch (err) {
            throw err;
        }
    }

    const createMovieHandler = async (movieData, userId) => {
        try {
            
            const { objectId } = await createMovie(movieData, userId);
            const createdMovie = await getById(objectId);

            setMovies(state => [...state, createdMovie]);

            navigate('/catalog');

        } catch (err) {
            console.log(err.message);
        }

    }

    const editMovieHandler = async (movieId, movieData, userId) => {

        try {
            editMovie(movieId, movieData, userId);

            setMovies(state => state.map(x => x.objectId == movieId 
                ? {...x, title: movieData.title, description: movieData.description, imgURL: movieData.imgURL} 
                : {...x}));

            navigate(`/details/${movieId}`);
        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteMovieHandler = async (movieId, admin) => {
        try {
            await deleteMovie(movieId);
            await clearUnneccessaryComments();

            setMovies(state => state.filter(x => x.objectId != movieId));

            if(!admin) {
                navigate('/catalog');
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    const ctx = {
        movies, 
        createMovieHandler,
        editMovieHandler,
        deleteMovieHandler,
        getMovieById
    }

    return (
        <MovieContext.Provider value={ctx}>
            {children}
        </MovieContext.Provider>
    )
}
