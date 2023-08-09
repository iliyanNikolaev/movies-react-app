import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/authContext"
import { Navigate } from "react-router-dom"

export default function Logout() {
    const {onLogoutSubmit} = useContext(AuthContext);

    useEffect(() => {
        onLogoutSubmit();
    }, []);

    return <Navigate to='/' />
}
