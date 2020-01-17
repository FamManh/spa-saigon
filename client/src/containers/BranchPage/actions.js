import {
    BRANCH_CREATE_START,
    BRANCH_CREATE_SUCCESS,
    BRANCH_CREATE_ERROR,
    BRANCH_GET_START,
    BRANCH_GET_SUCCESS,
    BRANCH_GET_ERROR,
    BRANCH_UPDATE_START,
    BRANCH_UPDATE_SUCCESS,
    BRANCH_UPDATE_ERROR,
    BRANCH_DESTROY_START,
    BRANCH_DESTROY_SUCCESS,
    BRANCH_DESTROY_ERROR,
    BRANCH_FIND_START,
    BRANCH_FIND_SUCCESS,
    BRANCH_FIND_ERROR,
    BRANCH_EXPORT_START,
    BRANCH_EXPORT_SUCCESS,
    BRANCH_EXPORT_ERROR,
    BRANCH_ERROR_MESSAGE_CLEAR,
    BRANCH_TABLE_ROW_SELECTION,
    BRANCH_TABLE_ROW_CLICK
} from "./constants";
import { getHistory } from "../configureStore";
import Message from "../shared/message";
import Errors from "../shared/error/errors";

import services from "./service";
import { Excel } from "../shared/excel/excel";

const messageUpdateSuccess = "Cập nhật chi nhánh thành công.";
const messageCreateSuccess = "Tạo chi nhánh thành công.";
const messageDeleteSuccess = "Xóa chi nhánh thành công.";

const excelHeaderSchema = ["id", "name"];


const actions = {
    doClearErrorMessage: () => {
        return { type: BRANCH_ERROR_MESSAGE_CLEAR };
    },

    list: (filter = {}) => async dispatch => {
        try {
            dispatch({ type: BRANCH_GET_START });

            let response = await services.listFn(filter);

            dispatch({ type: BRANCH_GET_SUCCESS, payload: response.data });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: BRANCH_GET_ERROR
            });
        }
    },

    doExport: data => dispatch => {
        try {
            dispatch({ type: BRANCH_EXPORT_START });
            Excel.exportAsExcelFile(data, excelHeaderSchema, "demo");
            dispatch({ type: BRANCH_EXPORT_SUCCESS });
        } catch (error) {
            console.log(error);
            dispatch({ type: BRANCH_EXPORT_ERROR });
        }
    },

    doTableRowSelection: (selectedRowKeys, selectedRows) => dispatch => {
        dispatch({
            type: BRANCH_TABLE_ROW_SELECTION,
            payload: { selectedRowKeys, selectedRows }
        });
    },

    doTableRowClick: (selectedRowKey, selectedRow) => dispatch => {
        dispatch({
            type: BRANCH_TABLE_ROW_CLICK,
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
            Errors.handle(error);
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
            Errors.handle(error);

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
            Errors.handle(error);

            dispatch({
                type: BRANCH_UPDATE_ERROR
            });
        }
    },

    doDestroyAll: ids => async dispatch => {
        await ids.forEach(async branchId => {
            dispatch(actions.doDestroy(branchId));
        });
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
            Errors.handle(error);
            dispatch({
                type: BRANCH_DESTROY_ERROR
            });
        }
    }
};
export default actions;
