import './Navigation.css'
import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

export default function Navigation() {

    const { auth } = useContext(AuthContext);

    return (
        <header className='navigation'>
            <nav>
                <Link to='/'> <i className="fas fa-home"></i> Home</Link>
                <Link to='/catalog'> <i className="fas fa-film"></i> Movies</Link>
                <Link to='/DB'> <i className="fas fa-database"></i> { auth?.objectId == 'WUPIIfvKlP' ? 'ClearDB' : 'Check DB' }</Link>
                
                {auth.username
                    ? <>
                        <Link to='/create'> <i className="fas fa-plus"></i> Add Movie</Link>
                        <Link to='/logout'> <i className="fas fa-sign-out-alt"></i> Logout</Link>
                    </>
                    : <>
                        <Link to='/login'> <i className="fas fa-sign-in-alt"></i> Login</Link> 
                        <Link to='/register'> <i className="fas fa-registered"></i> Register</Link>
                    </>
                }

                    
                
                <p className='userGreeting'>Welcome, <span>{auth.username ? `${auth.username}` : 'guest'}</span>!</p>
            </nav>
        </header>
    )
}
//auth.objectId == 'WUPIIfvKlP'