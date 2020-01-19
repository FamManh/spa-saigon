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
import { getHistory } from "../configureStore";
import Message from "../shared/message";
import Errors from "../shared/error/errors";

import services from "./service";
import { Excel } from "../shared/excel/excel";

const messageUpdateSuccess = "Cập nhật dịch vụ thành công.";
const messageCreateSuccess = "Tạo dịch vụ thành công.";
const messageDeleteSuccess = "Xóa dịch vụ thành công.";

const excelHeaderSchema = ["id", "name"];


const actions = {
    doClearErrorMessage: () => {
        return { type: SERVICE_ERROR_MESSAGE_CLEAR };
    },

    list: (filter = {}) => async dispatch => {
        try {
            dispatch({ type: SERVICE_GET_START });

            let response = await services.listFn(filter);

            dispatch({ type: SERVICE_GET_SUCCESS, payload: response.data });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: SERVICE_GET_ERROR
            });
        }
    },

    doExport: data => dispatch => {
        try {
            dispatch({ type: SERVICE_EXPORT_START });
            Excel.exportAsExcelFile(data, excelHeaderSchema, "demo");
            dispatch({ type: SERVICE_EXPORT_SUCCESS });
        } catch (error) {
            dispatch({ type: SERVICE_EXPORT_ERROR });
        }
    },

    doTableRowSelection: (selectedRowKeys, selectedRows) => dispatch => {
        dispatch({
            type: SERVICE_TABLE_ROW_SELECTION,
            payload: { selectedRowKeys, selectedRows }
        });
    },

    doTableRowClick: (selectedRowKey, selectedRow) => dispatch => {
        dispatch({
            type: SERVICE_TABLE_ROW_CLICK,
            payload: {
                selectedRowKey,
                selectedRow
            }
        });
    },

    doFind: id => async dispatch => {
        try {
            dispatch({
                type: SERVICE_FIND_START
            });

            const response = await services.findFn(id);
            dispatch({
                type: SERVICE_FIND_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: SERVICE_FIND_ERROR
            });
        }
    },

    doCreate: data => async dispatch => {
        try {
            dispatch({
                type: SERVICE_CREATE_START
            });

            await services.createFn(data);

            dispatch({
                type: SERVICE_CREATE_SUCCESS
            });

            Message.success(messageCreateSuccess);
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: SERVICE_CREATE_ERROR
            });
        }
    },

    doUpdate: (id, values) => async dispatch => {
        try {
            dispatch({
                type: SERVICE_UPDATE_START
            });

            await services.updateFn(id, values);

            dispatch({
                type: SERVICE_UPDATE_SUCCESS
            });

            Message.success(messageUpdateSuccess);

            getHistory().push("/service");
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: SERVICE_UPDATE_ERROR
            });
        }
    },

    doDestroyAll: ids => async dispatch => {
        await ids.forEach(async serviceId => {
            dispatch(actions.doDestroy(serviceId));
        });
    },

    doDestroy: id => async dispatch => {
        try {
            dispatch({
                type: SERVICE_DESTROY_START
            });

            await services.destroyFn(id);

            dispatch({
                type: SERVICE_DESTROY_SUCCESS,
                payload: id
            });
            Message.success(messageDeleteSuccess);
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: SERVICE_DESTROY_ERROR
            });
        }
    }
};
export default actions;
