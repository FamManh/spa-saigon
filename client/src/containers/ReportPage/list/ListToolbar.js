import React from "react";
import Toolbar from "../../shared/styles/Toolbar";
import { Button, Tooltip, Popconfirm } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../selectors";
import actions from "../actions";
import { Link } from "react-router-dom";

const ListToolbar = () => {
    const dataLoading = useSelector(selectors.selectDataLoading);
    const exportLoading = useSelector(selectors.selectExportLoading);
    const reports = useSelector(selectors.selectReports);

    const dispatch = useDispatch();
    let doExport = () => {
        dispatch(actions.doExport(reports));
    };


    let renderExportButton = () => {
        const disabled = !reports || dataLoading;

        const button = (
            <Button
                disabled={disabled}
                icon="file-excel"
                onClick={doExport}
                loading={exportLoading}
            >
                Export to Excel
            </Button>
        );

        if (disabled) {
            return <Tooltip title="Không có dữ liệu">{button}</Tooltip>;
        }

        return button;
    };

    return (
        <Toolbar>
            {/* <Link to="/report/new">
                <Button type="primary" icon="plus">
                    Tạo
                </Button>
            </Link> */}

            {renderExportButton()}
        </Toolbar>
    );
};

export default ListToolbar;
