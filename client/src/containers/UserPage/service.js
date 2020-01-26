import sgapi from "../../api/sgapi";

const services = {
    listFn: async (filter = {}) => {
        const response = await sgapi.get("/user", filter);
        return response;
    },

    findFn: async _id => {
        const response = await sgapi.get(`/user/${_id}`);
        return response;
    },

    createFn: async user => {
        const response = await sgapi.post("/user", user);
        return response;
    },

    updateFn: async (_id, user) => {
        const response = await sgapi.patch(`/user/${_id}`, user);
        return response;
    },

    destroyFn: async _id => {
        const response = await sgapi.delete(`/user/${_id}`);
        return response;
    }
};

export default services;
