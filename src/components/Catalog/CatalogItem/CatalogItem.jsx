import styles from './CatalogItem.module.css';
import React from 'react'
import { Link } from 'react-router-dom'

export default function CatalogItem({
    movie
}) {
    return (
        <>
            <Link className={styles.project} to={`/details/${movie.objectId}`}>
                <img className={styles.imgURL} src={`${movie.imgURL}`} alt="poster" />
                <span className={styles.innerTitle}>{movie.title}</span>
            </Link>
        </>
    )
}
