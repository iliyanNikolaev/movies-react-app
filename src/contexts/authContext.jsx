import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, logout } from '../services/user.js';

export const AuthContext = createContext();

export function AuthCtxProvider({
    children
}) {
    const [auth, setAuth] = useState({});

    const navigate = useNavigate();

    const onLoginSubmit = async (username, password) => {
        try {
            const authData = await login(username, password);
            console.log(authData)
            setAuth({
                username,
                sessionToken: authData.sessionToken,
                objectId: authData.objectId
            });

            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }
    

    const onRegisterSubmit = async (username, password) => {
        try {
            const authData = await register(username, password);

            setAuth({
                username,
                sessionToken: authData.sessionToken,
                objectId: authData.objectId
            });

            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    const onLogoutSubmit = async () => {
        try {
            await logout();
            
            setAuth({});

            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    const ctx = {
        auth,
        onLoginSubmit,
        onRegisterSubmit,
        onLogoutSubmit
    }

    return (
        <>
            <AuthContext.Provider value={ctx}>
                {children}
            </AuthContext.Provider>
        </>
    )
}


