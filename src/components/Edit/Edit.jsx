import './Edit.css'
import { useContext, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { MovieContext } from "../../contexts/movieContext";
import { AuthContext } from "../../contexts/authContext";
import { useError } from '../../hooks/useError';

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMsg from '../ErrorMsg/ErrorMsg';

export default function Edit() {
    const [isLoading, setIsLoading] = useState(true);

    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        imgURL: ''
    });

    const onChange = (e) => {
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const { movieId } = useParams();

    const { auth } = useContext(AuthContext);

    const { hasError, reportError, errorText } = useError();

    if (!auth.username) {
        return <Navigate to='/404' />
    }

    const { editMovieHandler, getMovieById } = useContext(MovieContext);

    useEffect(() => {
        getMovieById(movieId)
            .then(data => {
                setFormValues({
                    title: data.title,
                    description: data.description,
                    imgURL: data.imgURL
                });

                setIsLoading(false);
            });
    }, [movieId]);

    const formSubmit = async (e) => {
        e.preventDefault();

        if (formValues.title == '', formValues.description == '', formValues.imgURL == '') {
            return reportError('Please fill all fields');
        }

        if(formValues.title.length < 2 || formValues.title.length > 20) {
            return reportError('The title must be between 2 and 20 characters!')
        }
        
        if(formValues.description.length < 2 || formValues.description.length > 1000) {
            return reportError('The description must be between 2 and 1000 characters!')
        }
        
        if(formValues.imgURL.length < 2 || formValues.imgURL.length > 300) {
            return reportError('The image URL must be between 2 and 300 characters!')
        }

        const data = {
            title: formValues.title.trim(),
            description: formValues.description.trim(),
            imgURL: formValues.imgURL.trim()
        }

        try {

            await editMovieHandler(movieId, data, auth.objectId);

        } catch (err) {
            console.log(err.message);
        }

    }

    return (
        <div className='edit-movie-page'>
            <h2>Edit movie</h2>

            { hasError ? <ErrorMsg text={errorText} /> : null }

            {isLoading
                ? <LoadingSpinner />
                : <form onSubmit={formSubmit} className="form">
                    <label htmlFor="title"><i class="fas fa-heading"></i>
                        <input
                            type="text"
                            placeholder="Movie Title" 
                            name="title"
                            id="title"
                            value={formValues.title}
                            onChange={onChange}
                        />
                    </label>
                    <label htmlFor="description"><i className="fas fa-envelope-open-text"></i>
                        <textarea
                            name="description"
                            placeholder="Movie Description" 
                            id="description"
                            cols="30"
                            rows="5"
                            value={formValues.description}
                            onChange={onChange}
                        ></textarea>
                    </label>
                    <label htmlFor="imgURL"><i className="fas fa-link"></i>
                        <input
                            type="text"
                            placeholder="Movie Poster URL"
                            name="imgURL"
                            id="imgURL"
                            value={formValues.imgURL}
                            onChange={onChange}
                        />
                    </label>

                    <button>Save</button>
                </form>}

        </div>
    )
}
