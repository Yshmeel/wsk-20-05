import http from './index'

const login = (login, pin) => {
    return http.post("/api/login", {
        login, pin
    });
};

const userRequests = {
    login,
};

export default userRequests;
