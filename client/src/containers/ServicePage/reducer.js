import {
    SERVICE_CREATE_START,
    SERVICE_CREATE_SUCCESS,
    SERVICE_CREATE_ERROR,
    SERVICE_GET_START,
    SERVICE_GET_SUCCESS,
    SERVICE_GET_ERROR,
    SERVICE_UPDATE_START,
    SERVICE_UPDATE_SUCCESS,
    SERVICE_UPDATE_ERROR,
    SERVICE_DESTROY_START,
    SERVICE_DESTROY_SUCCESS,
    SERVICE_DESTROY_ERROR,
    SERVICE_FIND_START,
    SERVICE_FIND_SUCCESS,
    SERVICE_FIND_ERROR,
    SERVICE_EXPORT_START,
    SERVICE_EXPORT_SUCCESS,
    SERVICE_EXPORT_ERROR,
    SERVICE_ERROR_MESSAGE_CLEAR,
    SERVICE_TABLE_ROW_SELECTION,
    SERVICE_TABLE_ROW_CLICK
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
    redirectTo: "/service",
    selectedRowKeys: [],
    selectedRows: [],
    record: null,
    services: []
};

const serviceReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case SERVICE_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case SERVICE_CREATE_SUCCESS:
                draft.saveLoading = false;
                // draft.services = payload;
                draft.error = null;
                break;
            case SERVICE_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case SERVICE_GET_START:
                draft.dataLoading = true;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.error = null;
                break;
            case SERVICE_GET_SUCCESS:
                draft.dataLoading = false;
                draft.services = payload;
                draft.error = null;
                break;
            case SERVICE_GET_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            case SERVICE_UPDATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case SERVICE_UPDATE_SUCCESS:
                draft.saveLoading = false;
                draft.error = null;
                break;
            case SERVICE_UPDATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case SERVICE_DESTROY_START:
                draft.destroyLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                break;
            case SERVICE_DESTROY_SUCCESS:
                draft.destroyLoading = false;
                draft.services = state.services.filter(
                    service => service.id !== payload
                );
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.error = null;
                break;
            case SERVICE_DESTROY_ERROR:
                draft.destroyLoading = false;
                draft.error = payload;
                break;
            case SERVICE_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                break;
            case SERVICE_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.error = null;
                break;
            case SERVICE_FIND_ERROR:
                draft.findLoading = false;
                draft.error = payload;
                break;
            case SERVICE_EXPORT_START:
                draft.exportLoading = true;
                draft.error = null;
                break;
            case SERVICE_EXPORT_SUCCESS:
                draft.exportLoading = false;
                draft.error = null;
                break;
            case SERVICE_EXPORT_ERROR:
                draft.exportLoading = false;
                draft.error = payload;
                break;
            case SERVICE_ERROR_MESSAGE_CLEAR:
                draft.error = null;
                break;
            case SERVICE_TABLE_ROW_SELECTION:
                draft.selectedRowKeys = payload.selectedRowKeys;
                draft.selectedRows = payload.selectedRows;
                break;
            case SERVICE_TABLE_ROW_CLICK:
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

export default serviceReducer;
