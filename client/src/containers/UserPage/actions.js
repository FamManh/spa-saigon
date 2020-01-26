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
import { getHistory } from "../configureStore";
import Message from "../shared/message";
import Errors from "../shared/error/errors";

import services from "./service";
import { Excel } from "../shared/excel/excel";

const messageUpdateSuccess = "Cập nhật người dùng thành công.";
const messageCreateSuccess = "Tạo người dùng thành công.";
const messageDeleteSuccess = "Xóa người dùng thành công.";

const excelHeaderSchema = ["id", "name"];


const actions = {
    doClearErrorMessage: () => {
        return { type: USER_ERROR_MESSAGE_CLEAR };
    },

    list: (filter = {}) => async dispatch => {
        try {
            dispatch({ type: USER_GET_START });

            let response = await services.listFn(filter);

            dispatch({ type: USER_GET_SUCCESS, payload: response.data });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: USER_GET_ERROR
            });
        }
    },

    doExport: data => dispatch => {
        try {
            dispatch({ type: USER_EXPORT_START });
            Excel.exportAsExcelFile(data, excelHeaderSchema, "demo");
            dispatch({ type: USER_EXPORT_SUCCESS });
        } catch (error) {
            console.log(error);
            dispatch({ type: USER_EXPORT_ERROR });
        }
    },

    doTableRowSelection: (selectedRowKeys, selectedRows) => dispatch => {
        dispatch({
            type: USER_TABLE_ROW_SELECTION,
            payload: { selectedRowKeys, selectedRows }
        });
    },

    doTableRowClick: (selectedRowKey, selectedRow) => dispatch => {
        dispatch({
            type: USER_TABLE_ROW_CLICK,
            payload: {
                selectedRowKey,
                selectedRow
            }
        });
    },

    doFind: id => async dispatch => {
        try {
            dispatch({
                type: USER_FIND_START
            });

            const response = await services.findFn(id);
            dispatch({
                type: USER_FIND_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: USER_FIND_ERROR
            });
        }
    },

    doCreate: data => async dispatch => {
        try {
            dispatch({
                type: USER_CREATE_START
            });

            await services.createFn(data);

            dispatch({
                type: USER_CREATE_SUCCESS
            });

            Message.success(messageCreateSuccess);
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: USER_CREATE_ERROR
            });
        }
    },

    doUpdate: (id, values) => async dispatch => {
        try {
            dispatch({
                type: USER_UPDATE_START
            });

            await services.updateFn(id, values);

            dispatch({
                type: USER_UPDATE_SUCCESS
            });

            Message.success(messageUpdateSuccess);

            getHistory().push("/user");
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: USER_UPDATE_ERROR
            });
        }
    },

    doDestroyAll: ids => async dispatch => {
        await ids.forEach(async userId => {
            dispatch(actions.doDestroy(userId));
        });
    },

    doDestroy: id => async dispatch => {
        try {
            dispatch({
                type: USER_DESTROY_START
            });

            await services.destroyFn(id);

            dispatch({
                type: USER_DESTROY_SUCCESS,
                payload: id
            });
            Message.success(messageDeleteSuccess);
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: USER_DESTROY_ERROR
            });
        }
    }
};
export default actions;
