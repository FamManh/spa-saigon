import sgapi from "../../api/sgapi";

const services = {
    listFn: async ({date, branch}) => {
        console.log(date);
        console.log(branch);
        const response = await sgapi.get(
            `/ledger/info?branch=${branch}&date=${date}`
        );
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

    updateFn: async (_id, ledger) => {
        const response = await sgapi.patch(`/ledger/${_id}`, ledger);
        return response;
    },

    destroyFn: async _id => {
        const response = await sgapi.delete(`/ledger/${_id}`);
        return response;
    }
};

export default services;
