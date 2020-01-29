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
    REPORT_TABLE_ROW_CLICK
} from "./constants";
import produce from "immer";
const initialState = {
    dataLoading: false,
    findLoading: false,
    exportLoading: false,
    error: null,
    redirectTo: "/report",
    selectedRowKeys: [],
    selectedRows: [],
    record: null,
    reports: [],
    sumCash: 0,
    sumCertificate: 0,
    sumCashSelectedRow: 0,
    sumCertificateSelectedRow: 0,
};

const calculateFields = (data, field) => {
    let sum = 0;
    data.forEach(item => {
        sum += item[field];
    });
    return sum;
};

const reportReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case REPORT_GET_START:
                draft.dataLoading = true;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.sumCashSelectedRow = 0;
                draft.sumCertificateSelectedRow = 0;
                draft.error = null;
                break;
            case REPORT_GET_SUCCESS:
                draft.dataLoading = false;
                draft.reports = payload;
                 draft.sumCash = calculateFields(draft.reports, "cash");
                 draft.sumCertificate = calculateFields(
                     draft.reports,
                     "certificate"
                 );
                draft.sumCash = calculateFields(draft.reports, "cash");
                draft.sumCertificate = calculateFields(
                    draft.reports,
                    "certificate"
                );
                draft.error = null;
                break;
            case REPORT_GET_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            case REPORT_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.sumCashSelectedRow = 0;
                draft.sumCertificateSelectedRow = 0;
                break;
            case REPORT_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.sumCash = calculateFields(state.reports, "cash");
                draft.sumCertificate = calculateFields(
                    state.reports,
                    "certificate"
                );
                draft.sumCash = calculateFields(draft.reports, "cash");
                draft.sumCertificate = calculateFields(
                    draft.reports,
                    "certificate"
                );
                draft.error = null;
                break;
            case REPORT_FIND_ERROR:
                draft.findLoading = false;
                draft.error = payload;
                break;
            case REPORT_EXPORT_START:
                draft.exportLoading = true;
                draft.error = null;
                break;
            case REPORT_EXPORT_SUCCESS:
                draft.exportLoading = false;
                draft.error = null;
                break;
            case REPORT_EXPORT_ERROR:
                draft.exportLoading = false;
                draft.error = payload;
                break;
            case REPORT_ERROR_MESSAGE_CLEAR:
                draft.error = null;
                break;
            case REPORT_TABLE_ROW_SELECTION:
                draft.selectedRowKeys = payload.selectedRowKeys;
                draft.selectedRows = payload.selectedRows;
                draft.sumCash = calculateFields(state.reports, "cash");
                draft.sumCertificate = calculateFields(
                    state.reports,
                    "certificate"
                );
                draft.sumCashSelectedRow = calculateFields(
                    payload.selectedRows,
                    "cash"
                );
                draft.sumCertificateSelectedRow = calculateFields(
                    payload.selectedRows,
                    "certificate"
                );
                break;
            case REPORT_TABLE_ROW_CLICK:
                if (state.selectedRowKeys.includes(payload.selectedRowKey)) {
                    draft.selectedRowKeys = state.selectedRowKeys.filter(
                        key => key !== payload.selectedRowKey
                    );
                    draft.selectedRows = state.selectedRows.filter(
                        item => item._id._id !== payload.selectedRowKey
                    );
                } else {
                    draft.selectedRowKeys.push(payload.selectedRowKey);
                    draft.selectedRows.push(payload.selectedRow);
                }
                draft.sumCash = calculateFields(state.reports, "cash");
                draft.sumCertificate = calculateFields(
                    state.reports,
                    "certificate"
                );
                 draft.sumCashSelectedRow = calculateFields(
                     draft.selectedRows,
                     "cash"
                 );
                 draft.sumCertificateSelectedRow = calculateFields(
                     draft.selectedRows,
                     "certificate"
                 );
                break;
            default:
                break;
        }
    });

export default reportReducer;
