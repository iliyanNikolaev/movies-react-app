import { useContext } from "react"
import { usePagination } from "../../../hooks/usePagination";
import { MovieContext } from '../../../contexts/movieContext'
import DbMovieItem from "./DbMovieItem";

export default function MoviesData() {
    const { movies } = useContext(MovieContext);

    const {start, end, next, prev} = usePagination(movies, 8);
    
    return (
        <div className="movies">
            <div>
                <h3>Movies</h3>

                {movies.slice(start, end).map(x => <DbMovieItem key={x.objectId} movie={x}/>)}
            </div>

            <div className="paginationBtns">
                <button onClick={prev} disabled={ start <= 0  ? true : false }>&lt; Prev</button>
                <button onClick={next} disabled={ end >= movies.length ? true : false }>Next &gt;</button>
            </div>
        </div>
    )
}
