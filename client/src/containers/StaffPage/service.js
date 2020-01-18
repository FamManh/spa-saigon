import sgapi from "../../api/sgapi";

const services = {
    listFn: async (filter = {}) => {
        const response = await sgapi.get("/staff", filter);
        return response;
    },

    findFn: async _id => {
        const response = await sgapi.get(`/staff/${_id}`);
        return response;
    },

    createFn: async staff => {
        const response = await sgapi.post("/staff", staff);
        return response;
    },

    updateFn: async (_id, staff) => {
        const response = await sgapi.patch(`/staff/${_id}`, staff);
        return response;
    },

    destroyFn: async _id => {
        const response = await sgapi.delete(`/staff/${_id}`);
        return response;
    }
};

export default services;
