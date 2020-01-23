import sgapi from "../../api/sgapi";

const services = {
    reportFn: async ({date, branch, type, flag}) => {
        let urlBranch = branch ? `&branch=${branch}` : "";
        let urlType = type ? `&type=${type}` : "";
        let urlFlag = flag ? `&flag=${flag}` : "";
        const response = await sgapi.get(
            `/ledger/report?date=${date}` + urlBranch + urlType + urlFlag
        );
        return response;
    }
};

export default services;
