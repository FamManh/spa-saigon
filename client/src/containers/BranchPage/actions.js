import {
    BRANCH_GET_START,
    BRANCH_GET_SUCCESS,
    BRANCH_GET_ERROR,
    BRANCH_DESTROY_START,
    BRANCH_DESTROY_SUCCESS,
    BRANCH_DESTROY_ERROR,
    BRANCH_CREATE_START,
    BRANCH_CREATE_SUCCESS,
    BRANCH_CREATE_ERROR,
    BRANCH_UPDATE_START,
    BRANCH_UPDATE_SUCCESS,
    BRANCH_UPDATE_ERROR,
    ERROR_MESSAGE_CLEAR,
    BRANCH_FIND_START,
    BRANCH_FIND_SUCCESS,
    BRANCH_FIND_ERROR,
    TABLE_ROW_SELECTION,
    TABLE_ROW_CLICK
} from "./constants";
import { getHistory } from "../configureStore";
import Message from "../shared/message";

import services from "./service";

const messageUpdateSuccess = "Cập nhật chi nhánh thành công.";
const messageCreateSuccess = "Tạo chi nhánh thành công.";
const messageDeleteSuccess = "Xóa chi nhánh thành công.";

const actions = {
    doClearErrorMessage: () => {
        return { type: ERROR_MESSAGE_CLEAR };
    },

    list: (filter = {}) => async dispatch => {
        try {
            dispatch({ type: BRANCH_GET_START });

            let response = await services.listFn(filter);

            dispatch({ type: BRANCH_GET_SUCCESS, payload: response.data });
        } catch (error) {
            console.log(error);
        }
    },

    doTableRowSelection: (selectedRowKeys, selectedRows) => dispatch => {
        dispatch({
            type: TABLE_ROW_SELECTION,
            payload: { selectedRowKeys, selectedRows }
        });
    },

    doTableRowClick: (selectedRowKey, selectedRow) => dispatch => {
        dispatch({
            type: TABLE_ROW_CLICK,
            payload: {
                selectedRowKey,
                selectedRow
            }
        });
    },

    doFind: id => async dispatch => {
        try {
            dispatch({
                type: BRANCH_FIND_START
            });

            const response = await services.findFn(id);
            dispatch({
                type: BRANCH_FIND_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: BRANCH_FIND_ERROR
            });
        }
    },

    doCreate: data => async dispatch => {
        try {
            dispatch({
                type: BRANCH_CREATE_START
            });

            await services.createFn(data);

            dispatch({
                type: BRANCH_CREATE_SUCCESS
            });

            Message.success(messageCreateSuccess);
        } catch (error) {
            console.log(error);
            dispatch({
                type: BRANCH_CREATE_ERROR
            });
        }
    },

    doUpdate: (id, values) => async dispatch => {
        try {
            dispatch({
                type: BRANCH_UPDATE_START
            });

            await services.updateFn(id, values);

            dispatch({
                type: BRANCH_UPDATE_SUCCESS
            });

            Message.success(messageUpdateSuccess);

            getHistory().push("/branch");
        } catch (error) {
            dispatch({
                type: BRANCH_UPDATE_ERROR
            });
        }
    },

    doDestroyAll: ids => async dispatch => {
        try {
            await ids.forEach(async branchId => {
                dispatch(actions.doDestroy(branchId));
            });
        } catch (error) {
            console.log(error);
        }
    },

    doDestroy: id => async dispatch => {
        try {
            dispatch({
                type: BRANCH_DESTROY_START
            });

            await services.destroyFn(id);

            dispatch({
                type: BRANCH_DESTROY_SUCCESS,
                payload: id
            });
            Message.success(messageDeleteSuccess);
        } catch (error) {
            console.log(error);
        }
    }
};
export default actions;
