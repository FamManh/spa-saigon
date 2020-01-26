import { Button, Popconfirm } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Toolbar from "../../shared/styles/Toolbar";
import selectors from "../selectors";
import actions from "../actions";
import { useSelector, useDispatch } from "react-redux";

const ViewToolbar = ({ match }) => {
    const record = useSelector(selectors.selectRecord);

    const saveLoading = useSelector(selectors.selectSaveLoading);
    const dispatch = useDispatch();

    let id = () => {
        return match.params.id;
    };

    let doUpdate = () => {
        dispatch(actions.doUpdate(id(), { isActive: !record.isActive }));
    };

    return (
        <Toolbar>
            <Link to={`/user/${id()}/edit`}>
                <Button type="primary" icon="edit">
                    Chỉnh sửa
                </Button>
            </Link>
            <Button type="primary" disabled={saveLoading} onClick={doUpdate}>
                {record && record.isActive ? "Khóa" : "Kích hoạt"}
            </Button>
        </Toolbar>
    );
};

export default ViewToolbar;
