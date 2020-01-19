import sgapi from "../../api/sgapi";

const services = {
    listFn: async ({limit = 20, skip=0}) => {
        const response = await sgapi.get(`/note?limit=${limit}&skip=${skip}`);
        return response;
    },

    findFn: async _id => {
        const response = await sgapi.get(`/note/${_id}`);
        return response;
    },

    createFn: async note => {
        const response = await sgapi.post("/note", note);
        return response;
    },

    updateFn: async (_id, note) => {
        const response = await sgapi.patch(`/note/${_id}`, note);
        return response;
    },

    destroyFn: async _id => {
        const response = await sgapi.delete(`/note/${_id}`);
        return response;
    }
};

export default services;
