import {
    USER_CREATE_START,
    USER_CREATE_SUCCESS,
    USER_CREATE_ERROR,
    USER_GET_START,
    USER_GET_SUCCESS,
    USER_GET_ERROR,
    USER_UPDATE_START,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_ERROR,
    USER_DESTROY_START,
    USER_DESTROY_SUCCESS,
    USER_DESTROY_ERROR,
    USER_FIND_START,
    USER_FIND_SUCCESS,
    USER_FIND_ERROR,
    USER_EXPORT_START,
    USER_EXPORT_SUCCESS,
    USER_EXPORT_ERROR,
    USER_ERROR_MESSAGE_CLEAR,
    USER_TABLE_ROW_SELECTION,
    USER_TABLE_ROW_CLICK
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
    redirectTo: "/user",
    selectedRowKeys: [],
    selectedRows: [],
    record: null,
    users: []
};

const userReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case USER_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case USER_CREATE_SUCCESS:
                draft.saveLoading = false;
                // draft.users = payload;
                draft.error = null;
                break;
            case USER_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case USER_GET_START:
                draft.dataLoading = true;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.error = null;
                break;
            case USER_GET_SUCCESS:
                draft.dataLoading = false;
                draft.users = payload;
                draft.error = null;
                break;
            case USER_GET_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            case USER_UPDATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case USER_UPDATE_SUCCESS:
                draft.saveLoading = false;
                draft.error = null;
                break;
            case USER_UPDATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case USER_DESTROY_START:
                draft.destroyLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case USER_DESTROY_SUCCESS:
                draft.destroyLoading = false;
                draft.users = state.users.filter(
                    user => user.id !== payload
                );
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.error = null;
                break;
            case USER_DESTROY_ERROR:
                draft.destroyLoading = false;
                draft.error = payload;
                break;
            case USER_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                break;
            case USER_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.error = null;
                break;
            case USER_FIND_ERROR:
                draft.findLoading = false;
                draft.error = payload;
                break;
            case USER_EXPORT_START:
                draft.exportLoading = true;
                draft.error = null;
                break;
            case USER_EXPORT_SUCCESS:
                draft.exportLoading = false;
                draft.error = null;
                break;
            case USER_EXPORT_ERROR:
                draft.exportLoading = false;
                draft.error = payload;
                break;
            case USER_ERROR_MESSAGE_CLEAR:
                draft.error = null;
                break;
            case USER_TABLE_ROW_SELECTION:
                draft.selectedRowKeys = payload.selectedRowKeys;
                draft.selectedRows = payload.selectedRows;
                break;
            case USER_TABLE_ROW_CLICK:
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

export default userReducer;
