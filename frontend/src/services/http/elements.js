import http from './index'

const all = () => {
    return http.get("/api/elements");
};

const elementsRequests = {
    all
};

export default elementsRequests;
