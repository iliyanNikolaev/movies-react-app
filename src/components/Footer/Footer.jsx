import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <p>&copy; React - "Good Movies" forum created by  <Link className='my-github' to='https://github.com/iliyanNikolaev' target='_blank'>iliyanNikolaev <i className="fab fa-github"></i></Link></p>
        </div>
    )
}
