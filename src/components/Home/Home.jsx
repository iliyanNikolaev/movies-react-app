import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.slogansContainer}>
                <h1 className={styles.title}>Where Every Frame Tells a Story</h1>
                <p className={styles.slogan}>Recommend and Discuss Movies with Your Friends.</p>
            </div>

            <div className={styles.imgContainer}>
                <img className={styles.img} src="https://www.freeiconspng.com/uploads/blue-filmstrip-png-21.png" alt="image" />
            </div>
        </div>
    )
}
