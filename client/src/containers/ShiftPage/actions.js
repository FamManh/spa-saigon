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
import { getHistory } from "../configureStore";
import Message from "../shared/message";
import Errors from "../shared/error/errors";
import moment from 'moment';
import services from "./service";
import { Excel } from "../shared/excel/excel";

const messageUpdateSuccess = "Cập nhật ca thành công.";
const messageCreateSuccess = "Tạo ca thành công.";
const messageDeleteSuccess = "Xóa ca thành công.";

const excelHeaderSchema = [];


const actions = {
    doClearErrorMessage: () => {
        return { type: SHIFT_ERROR_MESSAGE_CLEAR };
    },

    list: (filter) => async dispatch => {
        try {
            dispatch({ type: SHIFT_GET_START });
            let response = await services.listFn(filter);

            dispatch({ type: SHIFT_GET_SUCCESS, payload: response.data });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: SHIFT_GET_ERROR
            });
        }
    },

    doExport: data => dispatch => {
        try {
            dispatch({ type: SHIFT_EXPORT_START });
            let tempDate = [];
            data.forEach(item => {
                let tempItem = {
                    ["Ngày"]: moment(item.date).format("YYYY-MM-DD"),
                    ["Chi nhánh"]: item.branch.name,
                    ["Tiền mặt"]: item.cash,
                    ["Certificate"]: item.certificate,
                    ["-Tiền mặt-"]: 0,
                    ["-Certificate-"]: 0,
                    ["Tiền mặt (admin)"]: 0,
                    ["Certificate (admin)"]: 0
                };
                tempDate.push(tempItem);
            });
            Excel.exportAsExcelFile(
                tempDate,
                excelHeaderSchema,
                "Ca " + new Date().toISOString()
            );
            dispatch({ type: SHIFT_EXPORT_SUCCESS });
        } catch (error) {
            dispatch({ type: SHIFT_EXPORT_ERROR });
        }
    },

    doTableRowSelection: (selectedRowKeys, selectedRows) => dispatch => {
        dispatch({
            type: SHIFT_TABLE_ROW_SELECTION,
            payload: { selectedRowKeys, selectedRows }
        });
    },

    doTableRowClick: (selectedRowKey, selectedRow) => dispatch => {
        dispatch({
            type: SHIFT_TABLE_ROW_CLICK,
            payload: {
                selectedRowKey,
                selectedRow
            }
        });
    },

    doFind: id => async dispatch => {
        try {
            dispatch({
                type: SHIFT_FIND_START
            });

            const response = await services.findFn(id);
            dispatch({
                type: SHIFT_FIND_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: SHIFT_FIND_ERROR
            });
        }
    },

    doCreate: data => async dispatch => {
        try {
            dispatch({
                type: SHIFT_CREATE_START
            });

            let response = await services.createFn(data);

            dispatch({
                type: SHIFT_CREATE_SUCCESS
            });

            Message.success(messageCreateSuccess);
            getHistory().push(`/ledger/${response.data.id}`);
        } catch (error) {
            dispatch({
                type: SHIFT_CREATE_ERROR
            });
            if (Errors.errorCode(error)) {
                let shiftId =
                    error.response &&
                    error.response.data &&
                    error.response.data.id
                        ? error.response.data.id
                        : null;
                if (shiftId){
                    getHistory().push(`/ledger/${shiftId}`);
                    return;
                } 
                
            } 
            Errors.handle(error);
        }
    },

    doUpdate: (id, values, redirect = true) => async dispatch => {
        try {
            dispatch({
                type: SHIFT_UPDATE_START
            });

            let response = await services.updateFn(id, values);
            dispatch({
                type: SHIFT_UPDATE_SUCCESS,
                payload: response.data
            });

            Message.success(messageUpdateSuccess);

            if (redirect) getHistory().push("/shift");
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: SHIFT_UPDATE_ERROR
            });
        }
    },

    doDestroyAll: ids => async dispatch => {
        await ids.forEach(async shiftId => {
            dispatch(actions.doDestroy(shiftId));
        });
    },

    doDestroy: id => async dispatch => {
        try {
            dispatch({
                type: SHIFT_DESTROY_START
            });

            await services.destroyFn(id);

            dispatch({
                type: SHIFT_DESTROY_SUCCESS,
                payload: id
            });
            Message.success(messageDeleteSuccess);
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: SHIFT_DESTROY_ERROR
            });
        }
    }
};
export default actions;
