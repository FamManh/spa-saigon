import sgapi from "../../api/sgapi";

const services = {
    reportFn: async ({ branch, type, flag, start, end}) => {
        let urlBranch = branch ? `&branch=${branch}` : "";
        let urlType = type ? `&type=${type}` : "";
        let urlFlag = flag ? `&flag=${flag}` : "";
        const response = await sgapi.get(
            `/ledger/report?start=${start}&end=${end}` +
                urlBranch +
                urlType +
                urlFlag
        );
        return response;
    }
};

export default services;
