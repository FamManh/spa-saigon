import {
    LEDGER_PUBLIC_GET_START,
    LEDGER_PUBLIC_GET_SUCCESS,
    LEDGER_PUBLIC_GET_ERROR,
} from "./constants";
import { getHistory } from "../configureStore";
import Message from "../shared/message";
import Errors from "../shared/error/errors";
import shiftService from '../ShiftPage/service';
import services from "./service";

const actions = {
    

    list: (filter = {}) => async dispatch => {
        try {
            dispatch({ type: LEDGER_PUBLIC_GET_START });
            let response = await services.listFn(filter);

            dispatch({ type: LEDGER_PUBLIC_GET_SUCCESS, payload: response.data });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: LEDGER_PUBLIC_GET_ERROR
            });
        }
    },

};
export default actions;
