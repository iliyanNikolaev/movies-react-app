import './DbData.css'

import MoviesData from './MoviesData/MoviesData'
import CommentsData from './CommentsData/CommentsData'
import UsersData from './UsersData/UsersData'

export default function DbData() {

    return (
        <div className='wrapper'>
            <h2>Database</h2>

            <div className="section">
                <MoviesData />

                <CommentsData />

                <UsersData />
            </div>

        </div>
    )
}
