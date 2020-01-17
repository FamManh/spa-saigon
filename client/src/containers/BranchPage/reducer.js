import {
    BRANCH_GET_START,
    BRANCH_GET_SUCCESS,
    BRANCH_GET_ERROR,
    BRANCH_ERROR_MESSAGE_CLEAR,
    BRANCH_TABLE_ROW_SELECTION,
    BRANCH_DESTROY_START,
    BRANCH_DESTROY_SUCCESS,
    BRANCH_DESTROY_ERROR,
    BRANCH_CREATE_START,
    BRANCH_CREATE_SUCCESS,
    BRANCH_CREATE_ERROR,
    BRANCH_UPDATE_START,
    BRANCH_UPDATE_SUCCESS,
    BRANCH_UPDATE_ERROR,
    BRANCH_FIND_START,
    BRANCH_FIND_SUCCESS,
    BRANCH_FIND_ERROR,
    BRANCH_TABLE_ROW_CLICK
} from "./constants";
import produce from "immer";
const initialState = {
    initLoading: true,
    dataLoading: false,
    findLoading: false,
    saveLoading: false,
    destroyLoading: false,
    error: null,
    redirectTo: "/branch",
    selectedRowKeys: [],
    selectedRows: [],
    record: null,
    branchs: []
};

const branchReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case BRANCH_ERROR_MESSAGE_CLEAR:
                draft.error = null;
                break;
            case BRANCH_TABLE_ROW_SELECTION:
                draft.selectedRowKeys = payload.selectedRowKeys;
                draft.selectedRows = payload.selectedRows;
                break;
            case BRANCH_TABLE_ROW_CLICK:
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
            case BRANCH_GET_START:
                draft.dataLoading = true;
                draft.error = null;
                break;
            case BRANCH_GET_SUCCESS:
                draft.dataLoading = false;
                draft.branchs = payload;
                draft.error = null;
                break;
            case BRANCH_GET_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            case BRANCH_DESTROY_START:
                draft.destroyLoading = true;
                draft.error = null;
                break;
            case BRANCH_DESTROY_SUCCESS:
                draft.destroyLoading = false;
                draft.branchs = state.branchs.filter(
                    branch => branch.id !== payload
                );
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.error = null;
                break;
            case BRANCH_DESTROY_ERROR:
                draft.destroyLoading = false;
                draft.error = payload;
                break;
            case BRANCH_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                break;
            case BRANCH_CREATE_SUCCESS:
                draft.saveLoading = false;
                // draft.branchs = payload;
                draft.error = null;
                break;
            case BRANCH_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;

            case BRANCH_UPDATE_START:
                draft.saveLoading = true;
                draft.error = null;
                break;
            case BRANCH_UPDATE_SUCCESS:
                draft.saveLoading = false;
                draft.error = null;
                break;
            case BRANCH_UPDATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;

            case BRANCH_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                break;
            case BRANCH_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.error = null;
                break;
            case BRANCH_FIND_ERROR:
                draft.findLoading = false;
                draft.error = payload;
                break;
            default:
                break;
        }
    });

export default branchReducer;
