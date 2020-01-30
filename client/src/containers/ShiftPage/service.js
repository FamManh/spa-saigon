import sgapi from "../../api/sgapi";

const services = {
    listFn: async ({start, end, branch}) => {
        let urlBranch = branch ? `&branch=${branch}` : "";
        const response = await sgapi.get(
            `/shift?start=${start}&end=${end}` + urlBranch
        );
        return response;
    },

    findFn: async _id => {
        const response = await sgapi.get(`/shift/${_id}`);
        return response;
    },

    createFn: async shift => {
        const response = await sgapi.post("/shift", shift);
        return response;
    },

    updateFn: async (_id, shift) => {
        const response = await sgapi.patch(`/shift/${_id}`, shift);
        return response;
    },

    destroyFn: async _id => {
        const response = await sgapi.delete(`/shift/${_id}`);
        return response;
    }
};

export default services;
