import {
    REPORT_GET_START,
    REPORT_GET_SUCCESS,
    REPORT_GET_ERROR,
    REPORT_FIND_START,
    REPORT_FIND_SUCCESS,
    REPORT_FIND_ERROR,
    REPORT_EXPORT_START,
    REPORT_EXPORT_SUCCESS,
    REPORT_EXPORT_ERROR,
    REPORT_ERROR_MESSAGE_CLEAR,
    REPORT_TABLE_ROW_SELECTION,
    REPORT_TABLE_ROW_CLICK,
    REPORT_FILTER_CHANGE
} from "./constants";
import Errors from "../shared/error/errors";
import services from "./service";
import { Excel } from "../shared/excel/excel";
const excelHeaderSchema = [];

const groupBy = (data, field) => {
    let result = data.reduce(function(r, a) {
        r[a[field]] = r[a[field]] || [];
        r[a[field]].push(a);
        return r;
    }, Object.create(null));
    return result;
};

const actions = {
    doClearErrorMessage: () => {
        return { type: REPORT_ERROR_MESSAGE_CLEAR };
    },

    doFilterChange: data => {
        return {
            type: REPORT_FILTER_CHANGE,
            payload: data
        };
    },

    list: (filter, branchs) => async dispatch => {
        try {
            dispatch({ type: REPORT_GET_START });
            if (filter.groupByBranch && filter.branch) {
                let reportData = [];
                let currentBranch = filter.branch;
                let reportAllBranch = await services.reportFn({
                    start: filter.start,
                    end: filter.end,
                    type: filter.type
                });
                reportAllBranch.data.forEach(item => {
                    if (item._id.branch === currentBranch) {
                        reportData.push(item);
                    }
                });
                // tạo field branch để group by
                let reportCurrentBranch = await services.reportFn(filter);
                reportCurrentBranch.data.forEach((item, index) => {
                    reportCurrentBranch.data[index].branch = item._id.branch;
                });
                // gộp chi nhánh
                let reportResult = groupBy(reportCurrentBranch.data, "branch");
                Object.keys(reportResult).forEach(item => {
                    let selectedBranch = branchs.filter(
                        branch => branch.id === item
                    )[0];
                    let tempItem = {
                        _id: {
                            _id: selectedBranch.id,
                            career: "masseur",
                            name: selectedBranch.name,
                            branch: selectedBranch.id,
                            runame: selectedBranch.name
                        },
                        count: 0,
                        duration: 0,
                        cash: 0,
                        certificate: 0
                    };
                    reportResult[item].forEach(ledger => {
                        tempItem.cash += ledger.cash;
                        tempItem.certificate += ledger.certificate;
                    });
                    reportData.push(tempItem);
                });
                dispatch({
                    type: REPORT_GET_SUCCESS,
                    payload: reportData
                });

                // làm gì ở đây sau khi đã group by xong.  -))
                // branchs.forEach(item=>{
                //     if(item.id)
                // });
                // if (item._id.branch !== currentBranch) {
                //     let selectedBranch = branchs.filter(
                //         branch => branch.id === item._id.branch
                //     )[0];
                //     let tempItem = {
                //         _id: {
                //             _id: selectedBranch.id,
                //             career: "masseur",
                //             name: selectedBranch.name,
                //             branch: selectedBranch.id,
                //             runame: selectedBranch.name
                //         },
                //         count: 0,
                //         duration: 0
                //     };
                // }
            } else {
                let response = await services.reportFn(filter);
                dispatch({ type: REPORT_GET_SUCCESS, payload: response.data });
            }
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: REPORT_GET_ERROR
            });
        }
    },

    doExport: data => dispatch => {
        try {
            dispatch({ type: REPORT_EXPORT_START });
            let tempDate = [];
            data.forEach(item => {
                let tempItem = {
                    ["Nhân viên"]: item._id.runame,
                    ["Chức vụ"]:
                        item._id.career === "masseur"
                            ? "Массажист"
                            : "Работник Сауны",
                    ["Ca"]: 26,
                    ["Thời gian"]: item.duration,
                    ["Tiền mặt"]: item.cash,
                    ["Certificate"]: item.certificate,
                    ["Khách yêu cầu"]: 1
                };
                tempDate.push(tempItem);
            });
            Excel.exportAsExcelFile(
                tempDate,
                excelHeaderSchema,
                "Báo cáo " + new Date().toISOString()
            );
            dispatch({ type: REPORT_EXPORT_SUCCESS });
        } catch (error) {
            dispatch({ type: REPORT_EXPORT_ERROR });
        }
    },

    doTableRowSelection: (selectedRowKeys, selectedRows) => dispatch => {
        dispatch({
            type: REPORT_TABLE_ROW_SELECTION,
            payload: { selectedRowKeys, selectedRows }
        });
    },

    doTableRowClick: (selectedRowKey, selectedRow) => dispatch => {
        dispatch({
            type: REPORT_TABLE_ROW_CLICK,
            payload: {
                selectedRowKey,
                selectedRow
            }
        });
    },

    doFind: id => async dispatch => {
        try {
            dispatch({
                type: REPORT_FIND_START
            });

            const response = await services.findFn(id);
            dispatch({
                type: REPORT_FIND_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: REPORT_FIND_ERROR
            });
        }
    }
};
export default actions;
