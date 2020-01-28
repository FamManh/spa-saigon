import React from "react";
import Toolbar from "../../shared/styles/Toolbar";
import { Button, Tooltip, Popconfirm } from "antd";
import { useSelector, useDispatch } from "react-redux";
import shiftActions from '../../ShiftPage/actions';
import shiftSelectors from "../../ShiftPage/selectors";
import selectors from "../selectors";
import actions from "../actions";

const ListToolbar = () => {
    const destroyLoading = useSelector(selectors.selectDestroyLoading);
    const dataLoading = useSelector(selectors.selectDataLoading);
    const exportLoading = useSelector(selectors.selectExportLoading);
    const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys);
    const ledgers = useSelector(selectors.selectLedgers);
    const sumCash = useSelector(selectors.selectSumCash);
    const sumCertificate = useSelector(selectors.selectSumCertificate);
    const shiftRecord = useSelector(shiftSelectors.selectRecord);

    const dispatch = useDispatch();
    let doExport = () => {
        dispatch(actions.doExport(ledgers));
    };

    let doDestroyAllSelected = () => {
        dispatch(actions.doDestroyAll(selectedRowKeys));
    };

    let renderExportButton = () => {
        const disabled = !ledgers || dataLoading;

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

    let renderDestroyButton = () => {
        const disabled =
            (selectedRowKeys && !selectedRowKeys.length) || dataLoading;

        const button = (
            <Button
                disabled={disabled}
                loading={destroyLoading}
                type="primary"
                icon="delete"
            >
                Xóa
            </Button>
        );

        const buttonWithConfirm = (
            <Popconfirm
                title="Bạn có chắc chắn muốn xóa?"
                onConfirm={() => doDestroyAllSelected()}
                okText="Chắc chắn"
                cancelText="Hủy"
            >
                {button}
            </Popconfirm>
        );

        if (disabled) {
            return (
                <Tooltip title="Vui lòng chọn những trường muốn xóa">
                    {button}
                </Tooltip>
            );
        }

        return buttonWithConfirm;
    };

    const onReload = () => {
        dispatch(actions.list(shiftRecord.id));
    };

    const lockShift = () => {
        const tempShift = {
            lock: true,
            cash: sumCash,
            certificate: sumCertificate
        }
        dispatch(shiftActions.doUpdate(shiftRecord.id, tempShift, false));
        
    }

    const unlockShift = () => {
        const tempShift = {
            lock: false
        };
        dispatch(shiftActions.doUpdate(shiftRecord.id, tempShift, false));
    };

    return (
        <Toolbar>
            {shiftRecord && shiftRecord.lock ? (
                <Button type="primary" icon="unlock" onClick={unlockShift}>
                    Mở ca
                </Button>
            ) : (
                <Button type="primary" icon="lock" onClick={lockShift}>
                    Đóng ca
                </Button>
            )}

            {shiftRecord && !shiftRecord.lock && renderDestroyButton()}

            <Button type="primary" onClick={() => onReload()} icon="reload">
                Tải lại
            </Button>

            {renderExportButton()}
        </Toolbar>
    );
};

export default ListToolbar;
