import http from "./index"

const list = () => {
    return http.get("/api/projects");
};

const create = () => {
    return http.post("/api/projects");
};

const one = (id) => {
    return http.get(`/api/projects/${id}`);
}

const editName = (id, name) => {
    return http.patch(`/api/projects/${id}`, {
        name
    });
};

const editContent = (id, content) => {
    return http.patch(`/api/projects/${id}`, {
        content
    });
};

const projectsRequests = {
    list,
    create,
    one,
    editName,
    editContent
};

export default projectsRequests;
