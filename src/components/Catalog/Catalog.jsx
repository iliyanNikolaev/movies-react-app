import styles from './Catalog.module.css'
import { useContext } from 'react'
import { MovieContext } from '../../contexts/movieContext'

import CatalogItem from './CatalogItem/CatalogItem'

export default function Catalog() {
    
    const { movies } = useContext(MovieContext);

    return (
        <div className={styles.container}>
            <h2>Movies discussed</h2>

            <div className={styles.catalog}>
                {movies.map(x => <CatalogItem key={x.objectId} movie={x} />)}
            </div>
        </div>
    )
}
