import './Register.css'

import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/authContext"
import { useForm } from "../../hooks/useForm"
import { useError } from '../../hooks/useError';

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMsg from '../ErrorMsg/ErrorMsg';

export default function Register() {

    const [isLoading, setIsLoading] = useState(false);

    const { formValues, onChange } = useForm({ username: '', password: '' });

    const { onRegisterSubmit } = useContext(AuthContext);

    const { hasError, reportError, errorText } = useError();

    const formSubmit = async (e) => {
        e.preventDefault();

        if(formValues.username == '' || formValues.password == '') {
            return reportError('Please fill all fields!')
        }

        if(formValues.username.length > 15 || formValues.username.length < 3) {
            return reportError('Username must be between 3 and 15 characters!');
        }

        if(formValues.password.length > 20 || formValues.password.length < 6) {
            return reportError('Password must be between 3 and 20 characters!');
        }

        try {
            setIsLoading(true);

            await onRegisterSubmit(formValues.username.trim(), formValues.password.trim());

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="register-page">
            <h2>Register page</h2>

            { hasError ? <ErrorMsg text={errorText}/> : null}

            <form className="register-form form" onSubmit={formSubmit}>
                <label htmlFor="username"><i className="fas fa-user"></i>
                    <input
                        type="text"
                        placeholder='username'
                        name="username"
                        id="username"
                        value={formValues.username}
                        onChange={onChange}
                    />
                </label>
                <label htmlFor="password"><i className="fas fa-lock"></i>
                    <input
                        type="password"
                        placeholder='password'
                        name="password"
                        id="password"
                        value={formValues.password}
                        onChange={onChange}
                    />
                </label>

                {isLoading ? <LoadingSpinner /> : <button>Register</button>}
            </form>
        </div>
    )
}
