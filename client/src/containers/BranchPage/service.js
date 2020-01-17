import sgapi from "../../api/sgapi";

const services = {
    listFn: async (filter = {}) => {
        const response = await sgapi.get("/branch", filter);
        return response;
    },

    findFn: async (_id) => {
        const response = await sgapi.get(`/branch/${_id}`);
        return response;
    },

    createFn: async branch => {
        const response = await sgapi.post("/branch", branch);
        return response;
    },

    updateFn: async (_id, branch) => {
        const response = await sgapi.patch(`/branch/${_id}`, branch);
        return response;
    },

    destroyFn: async _id => {
        const response = await sgapi.delete(`/branch/${_id}`);
        return response;
    }
};

export default services;
