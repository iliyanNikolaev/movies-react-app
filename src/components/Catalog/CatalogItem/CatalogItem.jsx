import React from 'react'
import { Link } from 'react-router-dom'

export default function CatalogItem({
    movie
}) {
    return (
        <>
            <li key={movie.objectId} className='li-item'>
                <img src={movie.imgURL} alt="poster" className='li-poster'/>

                <strong>{movie.title}</strong>
                
                <Link to={`/details/${movie.objectId}`}>details</Link>
            </li>
        </>
    )
}
