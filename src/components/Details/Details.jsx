import './Details.css'
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { MovieContext } from '../../contexts/movieContext'

import CommentsSection from './CommentsSection/CommentsSection'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import OwnerBtns from './OwnerBtns/OwnerBtns'

export default function Details() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentMovie, setCurrentMovie] = useState({});

    const { movieId } = useParams();

    const { auth } = useContext(AuthContext);
    const { deleteMovieHandler, getMovieById } = useContext(MovieContext);

    useEffect(() => {
        getMovieById(movieId)
            .then(data => {
                setCurrentMovie(data);
                setIsLoading(false);
            })

    }, [movieId]);

    const onDelete = () => {
        if (auth.username !== undefined && auth.objectId == currentMovie.owner?.objectId) {
            const choice = confirm(`Are you sure you want to delete ${currentMovie.title}?`);

            if (choice) {
                deleteMovieHandler(movieId);
            }
        }
    }

    return (
        <div className='details-page'>
            {isLoading
                ? <div className='details-spinner'><LoadingSpinner /></div>
                : <>
                    <div className="movieCard">
                        <h2>{currentMovie.title} details</h2>
                        <p className="descr">{currentMovie.description}</p>

                        <img src={currentMovie.imgURL} alt="poster" className="poster" />

                        {auth.username !== undefined && auth.objectId == currentMovie.owner?.objectId
                            ? <OwnerBtns currentMovie={currentMovie} onDelete={onDelete} />
                            : null
                        }
                    </div>

                    <CommentsSection movieId={movieId} />
                </>
            }
        </div>
    )
}

// { "__type": "Pointer", "className": "_User", "objectId": "WUPIIfvKlP" }