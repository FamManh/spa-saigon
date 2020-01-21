import sgapi from "../../api/sgapi";

const services = {
    listFn: async id => {
        const response = await sgapi.get(`/ledger?shift=${id}`);
        return response;
    },

    findFn: async _id => {
        const response = await sgapi.get(`/ledger/${_id}`);
        return response;
    },

    createFn: async ledger => {
        const response = await sgapi.post("/ledger", ledger);
        return response;
    },

    updateFn: async (id, ledger) => {
        const response = await sgapi.patch(`/ledger/${id}`, ledger);
        return response;
    },

    destroyFn: async _id => {
        const response = await sgapi.delete(`/ledger/${_id}`);
        return response;
    }
};

export default services;
