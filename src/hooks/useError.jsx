import { useState } from "react"

export const useError = () => {

    const [hasError, setHasError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const reportError = (text) => {
        setHasError(true);
        setErrorText(text);

        setTimeout(() => {
            setHasError(false);
            setErrorText('');
        }, 2000);
    }

    return {
        hasError,
        reportError,
        errorText
    }

}