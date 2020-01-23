import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import signin from "./SigninPage/reducer";
import layout from "./Layout/reducer";
import branch from "./BranchPage/reducer";
import staff from "./StaffPage/reducer";
import service from "./ServicePage/reducer";
import note from "./NotePage/reducer";
import shift from "./ShiftPage/reducer";
import ledger from "./LedgerPage/reducer";
import report from "./ReportPage/reducer";

export default history =>
    combineReducers({
        router: connectRouter(history),
        signin,
        layout,
        branch,
        staff,
        service,
        note,
        shift,
        ledger,
        report
    });
