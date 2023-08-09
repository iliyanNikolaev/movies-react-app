import './ErrorMsg.css'
import { useState, useEffect } from 'react'

export default function ErrorMsg({
    text
}) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false);
        }, 2000)
    }, [])

    return (

        <>
            {
                isVisible
                    ? <div className="error-msg">
                        < p className="error-text" > {text}</p >
                    </div >
                    : null
            }
        </>
    )
}
