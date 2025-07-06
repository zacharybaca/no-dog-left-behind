import { FetcherContext } from './FetcherContext.jsx';
import { useNotification } from '../../hooks/useNotification.js';

export const FetcherProvider = ({ children }) => {
    const { addNotification } = useNotification();

    const fetcher = async (url, options = {}, fallbackError = 'An error occurred.') => {
        const config = {
            credentials: 'include',
            ...options,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            let message;
            try {
                const data = await response.json();
                message = data.message;
            } catch {
                message = fallbackError;
            }
            const errorMessage = message || fallbackError;

            addNotification('Error', errorMessage, '', 'danger');

            return { success: false, error: errorMessage };
        }

        const data = await response.json();
        return { success: true, data };
    };

    return (
        <FetcherContext.Provider value={{ fetcher }}>
            {children}
        </FetcherContext.Provider>
    );
};
