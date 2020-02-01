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
    LEDGER_SERVICE_ITEM_REMOVE_CLICK
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
    redirectTo: "/ledger",
    selectedRowKeys: [],
    selectedRows: [],
    record: null,
    ledgers: [],
    lastSauna: "",
    lastMasseur: "",
    serviceItems: [],
    link: true,
    clear: true,
    discount: 0,
    paymentMethod: "certificate",
    sumCash: 0,
    sumCertificate: 0,
    sumCashSelectedRow: 0,
    sumCertificateSelectedRow: 0
};

const calculateFields = (data, field) => {
    let sum = 0;
    data.forEach(item=>{
        sum += item[field];
    })
    return sum;
}

const ledgerReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case LEDGER_SAUNA_CHANGE:
                draft.lastSauna = payload;
                break;
            case LEDGER_MASSEUR_CHANGE:
                draft.lastMasseur = payload;
                break;
            case LEDGER_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.sumCashSelectedRow = 0;
                draft.sumCertificateSelectedRow = 0;
                break;
            case LEDGER_CREATE_SUCCESS:
                draft.saveLoading = false;
                draft.ledgers.unshift(payload);
                draft.sumCash = calculateFields( draft.ledgers, "cash");
                draft.sumCertificate = calculateFields( draft.ledgers, "certificate");
                draft.error = null;
                break;
            case LEDGER_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case LEDGER_GET_START:
                draft.dataLoading = true;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.sumCashSelectedRow = 0;
                draft.sumCertificateSelectedRow = 0;
                draft.error = null;
                break;
            case LEDGER_GET_SUCCESS:
                draft.dataLoading = false;
                draft.ledgers = payload;
                draft.error = null;
                draft.sumCash = calculateFields(draft.ledgers, "cash");
                draft.sumCertificate = calculateFields(
                    draft.ledgers,
                    "certificate"
                );
                break;
            case LEDGER_GET_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            case LEDGER_UPDATE_START:
                draft.saveLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.sumCashSelectedRow = 0;
                draft.sumCertificateSelectedRow = 0;
                break;
            case LEDGER_UPDATE_SUCCESS:
                draft.saveLoading = false;
                draft.error = null;
                state.ledgers.forEach((item, key)=>{
                    if(item.id === payload.id){
                        draft.ledgers[key] = payload;
                    }
                })
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.sumCashSelectedRow = 0;
                draft.sumCertificateSelectedRow = 0;
                draft.sumCash = calculateFields(draft.ledgers, "cash");
                draft.sumCertificate = calculateFields(
                    draft.ledgers,
                    "certificate"
                );
                break;
            case LEDGER_UPDATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case LEDGER_DESTROY_START:
                draft.destroyLoading = true;
                draft.error = null;
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.sumCashSelectedRow = 0;
                draft.sumCertificateSelectedRow = 0;
                break;
            case LEDGER_DESTROY_SUCCESS:
                draft.destroyLoading = false;
                draft.ledgers = state.ledgers.filter(
                    ledger => ledger.id !== payload
                );
                draft.selectedRowKeys = [];
                draft.selectedRows = [];
                draft.sumCashSelectedRow = 0;
                draft.sumCertificateSelectedRow = 0;
                draft.sumCash = calculateFields(draft.ledgers, "cash");
                draft.sumCertificate = calculateFields(
                    draft.ledgers,
                    "certificate"
                );
                draft.error = null;
                break;
            case LEDGER_DESTROY_ERROR:
                draft.destroyLoading = false;
                draft.error = payload;
                break;
            case LEDGER_FIND_START:
                draft.findLoading = true;
                draft.error = null;
                break;
            case LEDGER_FIND_SUCCESS:
                draft.findLoading = false;
                draft.record = payload;
                draft.error = null;
                break;
            case LEDGER_FIND_ERROR:
                draft.findLoading = false;
                draft.error = payload;
                break;
            case LEDGER_EXPORT_START:
                draft.exportLoading = true;
                draft.error = null;
                break;
            case LEDGER_EXPORT_SUCCESS:
                draft.exportLoading = false;
                draft.error = null;
                break;
            case LEDGER_EXPORT_ERROR:
                draft.exportLoading = false;
                draft.error = payload;
                break;
            case LEDGER_ERROR_MESSAGE_CLEAR:
                draft.error = null;
                break;
            case LEDGER_TABLE_ROW_SELECTION:
                draft.selectedRowKeys = payload.selectedRowKeys;
                draft.selectedRows = payload.selectedRows;
                draft.sumCashSelectedRow = calculateFields(
                    payload.selectedRows, "cash"
                );
                draft.sumCertificateSelectedRow = calculateFields(
                    payload.selectedRows,
                    "certificate"
                );
                break;
            case LEDGER_TABLE_ROW_CLICK:
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
                draft.sumCashSelectedRow = calculateFields(
                    draft.selectedRows,
                    "cash"
                );
                draft.sumCertificateSelectedRow = calculateFields(
                    draft.selectedRows,
                    "certificate"
                );
                break;
            case LEDGER_SERVICE_SELECT:
                if (state.clear) {
                    draft.serviceItems = payload;
                } else {
                    draft.serviceItems = state.serviceItems.concat(payload);
                }
                break;
            case LEDGER_SERVICE_ITEMS_CHANGE:
                let { name, value, index } = payload;
                if (name === "staff" && state.link) {
                    state.serviceItems.forEach((item, index) => {
                        if (draft.serviceItems[index].sauna) {
                            draft.serviceItems[index][name] = state.lastSauna;
                        } else {
                            draft.serviceItems[index][name] = state.lastMasseur;
                        }
                    });
                }
                draft.serviceItems[index][name] = value;
                break;
            case LEDGER_SERVICE_ITEM_ADD_CLICK:
                draft.serviceItems.push(state.serviceItems[payload])
                break;
            case LEDGER_SERVICE_ITEM_REMOVE_CLICK:
                draft.serviceItems.splice(payload, 1);
                break;
            case LEDGER_CLEAR_CHANGE:
                draft.clear = !state.clear;
                break;
            case LEDGER_LINK_CHANGE:
                draft.link = !state.link;
                break;
            case LEDGER_DISCOUNT_CHANGE:
                draft.discount = payload;
                state.serviceItems.forEach((item, index) => {
                    draft.serviceItems[index].cash =
                        state.paymentMethod === "cash"
                            ? (+item.price / 100) * (100 - +payload)
                            : 0;
                    draft.serviceItems[index].certificate =
                        state.paymentMethod === "certificate"
                            ? (+item.price / 100) * (100 - +payload)
                            : 0;
                });
                break;
            case LEDGER_PAYMENT_METHOD_CHANGE:
                draft.paymentMethod = payload;
                state.serviceItems.forEach((item, index) => {
                    draft.serviceItems[index].cash = item.certificate;
                    draft.serviceItems[index].certificate = item.cash;
                });
                break;
            default:
                break;
        }
    });

export default ledgerReducer;
