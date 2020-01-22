import {
    SHIFT_CREATE_START,
    SHIFT_CREATE_SUCCESS,
    SHIFT_CREATE_ERROR,
    SHIFT_GET_START,
    SHIFT_GET_SUCCESS,
    SHIFT_GET_ERROR,
    SHIFT_UPDATE_START,
    SHIFT_UPDATE_SUCCESS,
    SHIFT_UPDATE_ERROR,
    SHIFT_DESTROY_START,
    SHIFT_DESTROY_SUCCESS,
    SHIFT_DESTROY_ERROR,
    SHIFT_FIND_START,
    SHIFT_FIND_SUCCESS,
    SHIFT_FIND_ERROR,
    SHIFT_EXPORT_START,
    SHIFT_EXPORT_SUCCESS,
    SHIFT_EXPORT_ERROR,
    SHIFT_ERROR_MESSAGE_CLEAR,
    SHIFT_TABLE_ROW_SELECTION,
    SHIFT_TABLE_ROW_CLICK
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
    redirectTo: "/shift",
    selectedRowKeys: [],
    selectedRows: [],
    record: null,
    shifts: []
};

const shiftReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case SHIFT_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case SHIFT_CREATE_SUCCESS:
                draft.saveLoading = false;
                // draft.shifts = payload;
                draft.error = null;
                break;
            case SHIFT_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case SHIFT_GET_START:
                draft.dataLoading = true;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.error = null;
                break;
            case SHIFT_GET_SUCCESS:
                draft.dataLoading = false;
                draft.shifts = payload;
                draft.error = null;
                break;
            case SHIFT_GET_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            case SHIFT_UPDATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case SHIFT_UPDATE_SUCCESS:
                draft.saveLoading = false;
                draft.error = null;
                draft.record = payload;
                break;
            case SHIFT_UPDATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case SHIFT_DESTROY_START:
                draft.destroyLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case SHIFT_DESTROY_SUCCESS:
                draft.destroyLoading = false;
                draft.shifts = state.shifts.filter(
                    shift => shift.id !== payload
                );
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.error = null;
                break;
            case SHIFT_DESTROY_ERROR:
                draft.destroyLoading = false;
                draft.error = payload;
                break;
            case SHIFT_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                break;
            case SHIFT_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.error = null;
                break;
            case SHIFT_FIND_ERROR:
                draft.findLoading = false;
                draft.error = payload;
                break;
            case SHIFT_EXPORT_START:
                draft.exportLoading = true;
                draft.error = null;
                break;
            case SHIFT_EXPORT_SUCCESS:
                draft.exportLoading = false;
                draft.error = null;
                break;
            case SHIFT_EXPORT_ERROR:
                draft.exportLoading = false;
                draft.error = payload;
                break;
            case SHIFT_ERROR_MESSAGE_CLEAR:
                draft.error = null;
                break;
            case SHIFT_TABLE_ROW_SELECTION:
                draft.selectedRowKeys = payload.selectedRowKeys;
                draft.selectedRows = payload.selectedRows;
                break;
            case SHIFT_TABLE_ROW_CLICK:
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

export default shiftReducer;
