import {
    NOTE_CREATE_START,
    NOTE_CREATE_SUCCESS,
    NOTE_CREATE_ERROR,
    NOTE_GET_START,
    NOTE_GET_SUCCESS,
    NOTE_GET_ERROR,
    NOTE_UPDATE_START,
    NOTE_UPDATE_SUCCESS,
    NOTE_UPDATE_ERROR,
    NOTE_TOGGLE_VISIBLE,
    NOTE_READMORE_START,
    NOTE_READMORE_SUCCESS,
    NOTE_READMORE_ERROR
} from "./constants";
import Message from "../shared/message";
import Errors from "../shared/error/errors";

import services from "./service";

const actions = {
    list: ({ limit = 20, skip = 0 }) => async dispatch => {
        try {
            dispatch({ type: NOTE_GET_START });

            let response = await services.listFn({ limit, skip });

            dispatch({ type: NOTE_GET_SUCCESS, payload: response.data });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: NOTE_GET_ERROR
            });
        }
    },

    readmore: ({ limit = 20, skip = 0 }) => async dispatch => {
        try {
            dispatch({ type: NOTE_READMORE_START });

            let response = await services.listFn({ limit, skip });

            dispatch({ type: NOTE_READMORE_SUCCESS, payload: response.data });
        } catch (error) {
            Errors.handle(error);
            dispatch({
                type: NOTE_READMORE_ERROR
            });
        }
    },

    doCreate: data => async dispatch => {
        try {
            dispatch({
                type: NOTE_CREATE_START
            });

            const response = await services.createFn(data);

            dispatch({
                type: NOTE_CREATE_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: NOTE_CREATE_ERROR
            });
        }
    },

    doUpdate: (id, values) => async dispatch => {
        try {
            dispatch({
                type: NOTE_UPDATE_START
            });

            const response = await services.updateFn(id, values);
            dispatch({
                type: NOTE_UPDATE_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            Errors.handle(error);

            dispatch({
                type: NOTE_UPDATE_ERROR
            });
        }
    },

    doToggle: () => dispatch => {
        dispatch({
            type: NOTE_TOGGLE_VISIBLE
        });
    }
};
export default actions;
