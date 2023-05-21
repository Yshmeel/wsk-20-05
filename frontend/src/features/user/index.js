const USER_TOKEN_STORAGE_KEY = '@user_token';

const getUserToken = () => {
    return localStorage.getItem(USER_TOKEN_STORAGE_KEY) || '';
};

const setUserToken = (token) => {
    localStorage.setItem(USER_TOKEN_STORAGE_KEY, token);
};

const deleteUserToken = () => {
    localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
};

export {
    getUserToken,
    setUserToken,
    deleteUserToken
};
