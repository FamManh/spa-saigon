import {
    STAFF_CREATE_START,
    STAFF_CREATE_SUCCESS,
    STAFF_CREATE_ERROR,
    STAFF_GET_START,
    STAFF_GET_SUCCESS,
    STAFF_GET_ERROR,
    STAFF_UPDATE_START,
    STAFF_UPDATE_SUCCESS,
    STAFF_UPDATE_ERROR,
    STAFF_DESTROY_START,
    STAFF_DESTROY_SUCCESS,
    STAFF_DESTROY_ERROR,
    STAFF_FIND_START,
    STAFF_FIND_SUCCESS,
    STAFF_FIND_ERROR,
    STAFF_EXPORT_START,
    STAFF_EXPORT_SUCCESS,
    STAFF_EXPORT_ERROR,
    STAFF_ERROR_MESSAGE_CLEAR,
    STAFF_TABLE_ROW_SELECTION,
    STAFF_TABLE_ROW_CLICK
} from "./constants";
import produce from "immer";
const initialState = {
    initLoading: true,
    dataLoading: false,
    findLoading: false,
    saveLoading: false,
    destroyLoading: false,
    exportLoading: false,
    error: null,
    redirectTo: "/staff",
    selectedRowKeys: [],
    selectedRows: [],
    record: null,
    staffs: []
};

const staffReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case STAFF_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case STAFF_CREATE_SUCCESS:
                draft.saveLoading = false;
                // draft.staffs = payload;
                draft.error = null;
                break;
            case STAFF_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case STAFF_GET_START:
                draft.dataLoading = true;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.error = null;
                break;
            case STAFF_GET_SUCCESS:
                draft.dataLoading = false;
                draft.staffs = payload;
                draft.error = null;
                break;
            case STAFF_GET_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            case STAFF_UPDATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case STAFF_UPDATE_SUCCESS:
                draft.saveLoading = false;
                draft.error = null;
                break;
            case STAFF_UPDATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case STAFF_DESTROY_START:
                draft.destroyLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case STAFF_DESTROY_SUCCESS:
                draft.destroyLoading = false;
                draft.staffs = state.staffs.filter(
                    staff => staff.id !== payload
                );
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.error = null;
                break;
            case STAFF_DESTROY_ERROR:
                draft.destroyLoading = false;
                draft.error = payload;
                break;
            case STAFF_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                break;
            case STAFF_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.error = null;
                break;
            case STAFF_FIND_ERROR:
                draft.findLoading = false;
                draft.error = payload;
                break;
            case STAFF_EXPORT_START:
                draft.exportLoading = true;
                draft.error = null;
                break;
            case STAFF_EXPORT_SUCCESS:
                draft.exportLoading = false;
                draft.error = null;
                break;
            case STAFF_EXPORT_ERROR:
                draft.exportLoading = false;
                draft.error = payload;
                break;
            case STAFF_ERROR_MESSAGE_CLEAR:
                draft.error = null;
                break;
            case STAFF_TABLE_ROW_SELECTION:
                draft.selectedRowKeys = payload.selectedRowKeys;
                draft.selectedRows = payload.selectedRows;
                break;
            case STAFF_TABLE_ROW_CLICK:
                if (state.selectedRowKeys.includes(payload.selectedRowKey)) {
                    draft.selectedRowKeys = state.selectedRowKeys.filter(
                        key => key !== payload.selectedRowKey
                    );
                    draft.selectedRows = state.selectedRows.filter(
                        item => item.id !== payload.selectedRowKey
                    );
                } else {
                    draft.selectedRowKeys.push(payload.selectedRowKey);
                    draft.selectedRows.push(payload.selectedRow);
                }
                break;
            default:
                break;
        }
    });

export default staffReducer;
