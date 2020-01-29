import {
    LEDGER_PUBLIC_GET_START,
    LEDGER_PUBLIC_GET_SUCCESS,
    LEDGER_PUBLIC_GET_ERROR,
} from "./constants";
import produce from "immer";
const initialState = {
    dataLoading: false,
    ledgers: []
};

const ledgerPublicReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case LEDGER_PUBLIC_GET_START:
                draft.dataLoading = true;
                draft.error = null;
                break;
            case LEDGER_PUBLIC_GET_SUCCESS:
                draft.dataLoading = false;
                draft.ledgers = payload;
                draft.error = null;
                break;
            case LEDGER_PUBLIC_GET_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            default:
                break;
        }
    });

export default ledgerPublicReducer;
