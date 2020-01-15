import {
    MENU_HIDE, MENU_SHOW, MENU_TOGGLE
} from "./constants";
import { getHistory } from "../configureStore";

const actions = {
    doToggleMenu: () => {
        return {
            type: MENU_TOGGLE
        };
    },

    doShowMenu: () => {
        return {
            type: MENU_SHOW
        };
    },

    doHideMenu: () => {
        return {
            type: MENU_HIDE
        };
    }
};
export default actions;
