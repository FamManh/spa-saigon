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
import produce from "immer";
const initialState = {
    initLoading: true,
    dataLoading: false,
    saveLoading: false,
    error: null,
    redirectTo: "/note",
    notes: [],
    visible: false,
    unReadCount: 0
};

const noteReducer = (state = initialState, { type, payload }) =>
    produce(state, draft => {
        switch (type) {
            case NOTE_CREATE_START:
                draft.saveLoading = true;
                draft.error = null;
                break;
            case NOTE_CREATE_SUCCESS:
                draft.saveLoading = false;
                draft.notes.unshift(payload);
                ++draft.unReadCount;
                draft.error = null;
                break;
            case NOTE_CREATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case NOTE_GET_START:
                draft.dataLoading = true;
                draft.error = null;
                break;
            case NOTE_GET_SUCCESS:
                draft.dataLoading = false;
                draft.notes = payload;
                draft.error = null;

                draft.unReadCount = 0;
                draft.notes.forEach(item => {
                    if (!item.isRead) {
                        ++draft.unReadCount;
                    }
                });
                break;
            case NOTE_GET_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            case NOTE_READMORE_START:
                draft.dataLoading = true;
                draft.error = null;
                break;
            case NOTE_READMORE_SUCCESS:
                draft.dataLoading = false;
                draft.notes = state.notes.concat(payload);
                draft.error = null;
                draft.unReadCount = 0;
                draft.notes.forEach(item => {
                    if (!item.isRead) {
                        ++draft.unReadCount;
                    }
                });
                break;
            case NOTE_READMORE_ERROR:
                draft.dataLoading = false;
                draft.error = payload;
                break;
            case NOTE_UPDATE_START:
                draft.saveLoading = true;
                draft.error = null;
                break;
            case NOTE_UPDATE_SUCCESS:
                draft.saveLoading = false;
                draft.unReadCount = 0;
                state.notes.forEach((item, index) => {
                    if (item.id === payload.id) {
                        draft.notes[index].isRead = payload.isRead;
                    }
                });
                draft.error = null;
                draft.notes.forEach(item => {
                    if (!item.isRead) {
                        ++draft.unReadCount;
                    }
                });
                break;
            case NOTE_UPDATE_ERROR:
                draft.saveLoading = false;
                draft.error = payload;
                break;
            case NOTE_TOGGLE_VISIBLE:
                draft.visible = !state.visible;
            default:
                break;
        }
    });

export default noteReducer;
