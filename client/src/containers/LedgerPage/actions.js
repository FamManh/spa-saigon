import {
    LEDGER_CREATE_START,
    LEDGER_CREATE_SUCCESS,
    LEDGER_CREATE_ERROR,
    LEDGER_GET_START,
    LEDGER_GET_SUCCESS,
    LEDGER_GET_ERROR,
    LEDGER_UPDATE_START,
    LEDGER_UPDATE_SUCCESS,
    LEDGER_UPDATE_ERROR,
    LEDGER_DESTROY_START,
    LEDGER_DESTROY_SUCCESS,
    LEDGER_DESTROY_ERROR,
    LEDGER_FIND_START,
    LEDGER_FIND_SUCCESS,
    LEDGER_FIND_ERROR,
    LEDGER_EXPORT_START,
    LEDGER_EXPORT_SUCCESS,
    LEDGER_EXPORT_ERROR,
    LEDGER_ERROR_MESSAGE_CLEAR,
    LEDGER_TABLE_ROW_SELECTION,
    LEDGER_TABLE_ROW_CLICK,
    LEDGER_SAUNA_CHANGE,
    LEDGER_MASSEUR_CHANGE,
    LEDGER_SERVICE_SELECT,
    LEDGER_SERVICE_ITEMS_CHANGE,
    LEDGER_LINK_CHANGE,
    LEDGER_CLEAR_CHANGE,
    LEDGER_DISCOUNT_CHANGE,
    LEDGER_PAYMENT_METHOD_CHANGE,
    LEDGER_SERVICE_ITEM_ADD_CLICK,
    LEDGER_SERVICE_ITEM_REMOVE_CLICK,
} from "./constants";
import Message from "../shared/message";
import Errors from "../shared/error/errors";
import services from "./service";
import { Excel } from "../shared/excel/excel";
import moment from "moment";
// import dataTemp from "./data.json";


const messageUpdateSuccess = "Cập nhật tua thành công.";
const messageCreateSuccess = "Tạo tua thành công.";
const messageDeleteSuccess = "Xóa tua thành công.";

const excelHeaderSchema = [];

const actions = {
    doClearErrorMessage: () => {
        return { type: LEDGER_ERROR_MESSAGE_CLEAR };
    },

    list: id => async dispatch => {
        try {
            dispatch({ type: LEDGER_GET_START });

            let response = await services.listFn(id);

            dispatch({ type: LEDGER_GET_SUCCESS, payload: response.data });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: LEDGER_GET_ERROR
            });
        }
    },

    doExport: data => dispatch => {
        try {
            dispatch({ type: LEDGER_EXPORT_START });
            let tempDate = [];
            data.forEach(item => {
                let tempItem = {
                    ["Tên"]: item.vnname,
                    ["Tên (tiếng nga)"]: item.runame,
                    ["Tiền mặt"]: item.cash,
                    ["Certificate"]: item.certificate,
                    ["Thời gian"]: item.duration,
                    // ["Chi nhánh"]: item.shift.branch,
                    ["Ngày"]: moment(item.shift.date).format("YYYY-MM-DD")
                };
                tempDate.push(tempItem);
            });
            Excel.exportAsExcelFile(
                tempDate,
                excelHeaderSchema,
                "Tua " + new Date().toISOString()
            );
            dispatch({ type: LEDGER_EXPORT_SUCCESS });
        } catch (error) {
            console.log(error);
            dispatch({ type: LEDGER_EXPORT_ERROR });
        }
    },

    doTableRowSelection: (selectedRowKeys, selectedRows) => dispatch => {
        dispatch({
            type: LEDGER_TABLE_ROW_SELECTION,
            payload: { selectedRowKeys, selectedRows }
        });
    },

    doTableRowClick: (selectedRowKey, selectedRow) => dispatch => {
        dispatch({
            type: LEDGER_TABLE_ROW_CLICK,
            payload: {
                selectedRowKey,
                selectedRow
            }
        });
    },

    doFind: id => async dispatch => {
        try {
            dispatch({
                type: LEDGER_FIND_START
            });

            const response = await services.findFn(id);
            dispatch({
                type: LEDGER_FIND_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: LEDGER_FIND_ERROR
            });
        }
    },

    doCreate: (data, shiftId) => async dispatch => {
        // console.log(dataTemp);
        // dataTemp.data.forEach(async item=>{
        //                            let temp = {
        //                                vnname: item.vnname,
        //                                runame: item.runame,
        //                                duration: item.duration,
        //                                cash: item.cash,
        //                                certificate: item.certificate,
        //                                flag: item.is_special_client,
        //                                shift: "5e27ffc1f581ef6429fab523",
        //                                staff: item.staff._id
        //                            };
        //                             await services.createFn(temp);
        //                        })
        let isError = false;
        data.forEach(async item => {
            if (item.staff === "") {
                isError = true;
                return;
            }
        });
        if (isError || !shiftId) {
            Message.error("Vui lòng điền đầy đủ thông tin");
            return;
        }
        data.forEach(async item => {
            dispatch({
                type: LEDGER_CREATE_START
            });
            try {
                const tempServiceItem = {
                    vnname: item.vnname,
                    runame: item.runame,
                    shift: shiftId,
                    cash: item.cash,
                    certificate: item.certificate,
                    staff: item.staff,
                    flag: item.flag,
                    duration: item.duration
                };

                const response = await services.createFn(tempServiceItem);

                dispatch({
                    type: LEDGER_CREATE_SUCCESS,
                    payload: response.data
                });
                Message.success(messageCreateSuccess);
            } catch (error) {
                Errors.handle(error);

                dispatch({
                    type: LEDGER_CREATE_ERROR
                });
            }
        });
    },

    doUpdate: (data) => async dispatch => {
        let isError = false;
        data.forEach(async item => {
            if (item.staff === "") {
                isError = true;
                return;
            }
        });
        if (isError) {
            Message.error("Vui lòng điền đầy đủ thông tin");
            return;
        }
        data.forEach(async item => {
            dispatch({
                type: LEDGER_UPDATE_START
            });
            try {

                const response = await services.updateFn(item.id, item);

                dispatch({
                    type: LEDGER_UPDATE_SUCCESS,
                    payload: response.data
                });
                Message.success(messageUpdateSuccess);
            } catch (error) {
                Errors.handle(error);

                dispatch({
                    type: LEDGER_UPDATE_ERROR
                });
            }
        });
    },

    doDestroyAll: ids => async dispatch => {
        await ids.forEach(async ledgerId => {
            dispatch(actions.doDestroy(ledgerId));
        });
    },

    doDestroy: id => async dispatch => {
        try {
            dispatch({
                type: LEDGER_DESTROY_START
            });

            await services.destroyFn(id);

            dispatch({
                type: LEDGER_DESTROY_SUCCESS,
                payload: id
            });
            Message.success(messageDeleteSuccess);
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: LEDGER_DESTROY_ERROR
            });
        }
    },
    doSaunaChange: id => dispatch => {
        dispatch({
            type: LEDGER_SAUNA_CHANGE,
            payload: id
        });
    },
    doMasseurChange: id => dispatch => {
        dispatch({
            type: LEDGER_MASSEUR_CHANGE,
            payload: id
        });
    },

    doServiceSelect: serviceItems => dispatch => {
        dispatch({
            type: LEDGER_SERVICE_SELECT,
            payload: serviceItems
        });
    },
    doServiceItemsChange: (name, value, index) => dispatch => {
        dispatch({
            type: LEDGER_SERVICE_ITEMS_CHANGE,
            payload: { name, value, index }
        });
    },
    doServiceItemAddClick: index => dispatch => {
        dispatch({
            type: LEDGER_SERVICE_ITEM_ADD_CLICK,
            payload: index
        });
    },
    doServiceItemRemoveClick: index => dispatch => {
        dispatch({
            type: LEDGER_SERVICE_ITEM_REMOVE_CLICK,
            payload: index
        });
    },
    doLinkChange: () => dispatch => {
        dispatch({
            type: LEDGER_LINK_CHANGE
        });
    },
    doClearChange: () => dispatch => {
        dispatch({
            type: LEDGER_CLEAR_CHANGE
        });
    },
    doDiscountChange: discount => dispatch => {
        dispatch({
            type: LEDGER_DISCOUNT_CHANGE,
            payload: discount
        });
    },
    doPaymentMethodChange: paymentMethod => dispatch => {
        dispatch({
            type: LEDGER_PAYMENT_METHOD_CHANGE,
            payload: paymentMethod
        });
    }
};
export default actions;
