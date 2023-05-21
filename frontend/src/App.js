import React, {useCallback, useEffect, useState} from 'react'
import Router from './features/router';
import AppContext from './contexts/app.context';
import {deleteUserToken, getUserToken, setUserToken} from './features/user'
import http from './services/http'

const App = () => {
    const [authorized, setAuthorized] = useState(false);
    useEffect(() => {
        const token = getUserToken();

        if(token !== '') {
            http.setAuthorization(token);
            setAuthorized(true);
        }
    }, []);

    const login = useCallback((token) => {
        setUserToken(token);
        http.setAuthorization(token);
        setAuthorized(true);
    }, [setAuthorized]);

    const logout = useCallback(() => {
        deleteUserToken();
        http.setAuthorization('');
        setAuthorized(false);
    }, [setAuthorized]);

    const contextValue = {
        authorized,
        login,
        logout
    };

    return (
        <AppContext.Provider value={contextValue}>
            <Router />
        </AppContext.Provider>
    )
};

export default App;
