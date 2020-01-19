import sgapi from "../../api/sgapi";

const services = {
    listFn: async (filter = {}) => {
        const response = await sgapi.get("/service", filter);
        return response;
    },

    findFn: async _id => {
        const response = await sgapi.get(`/service/${_id}`);
        return response;
    },

    createFn: async service => {
        const response = await sgapi.post("/service", service);
        return response;
    },

    updateFn: async (_id, service) => {
        const response = await sgapi.patch(`/service/${_id}`, service);
        return response;
    },

    destroyFn: async _id => {
        const response = await sgapi.delete(`/service/${_id}`);
        return response;
    }
};

export default services;
