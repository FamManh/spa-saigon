import { Table, Popconfirm, Button, Dropdown, Menu } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import staffSelectors from "../../StaffPage/selectors";
import shiftSelectors from "../../ShiftPage/selectors";
import React from "react";
import { Link } from "react-router-dom";
import TableWrapper from "../../shared/styles/TableWrapper";
import ButtonLink from "../../shared/styles/ButtonLink";
import { useSelector, useDispatch } from "react-redux";
import Text from "antd/lib/typography/Text";

const descriptionTitle = (label, content) => {
    return (
        <Text style={{ fontSize: "14px", margin: "0px 5px" }}>
            {label}: <Text strong>{content}</Text>
        </Text>
    );
};

const ListTable = () => {
    const dispatch = useDispatch();
    const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys);
    const selectedRows = useSelector(selectors.selectSelectedRows);
    const ledgers = useSelector(selectors.selectLedgers);
    const staffs = useSelector(staffSelectors.selectStaffs);
    const sumCash = useSelector(selectors.selectSumCash);
    const sumCertificate = useSelector(selectors.selectSumCertificate);
    const sumCashSelectedRow = useSelector(selectors.selectSumCashSelectedRow);
    const sumCertificateSelectedRow = useSelector(
        selectors.selectSumCertificateSelectedRow
    );
    const shiftRecord = useSelector(shiftSelectors.selectRecord);

    let doDestroy = id => {
        dispatch(actions.doDestroy(id));
    };

    let columns = [
        {
            title: "Tên dịch vụ",
            dataIndex: "vnname",
            // key: "vnname",
            render: (_, record) => {
                return record.flag ? <Text type="danger">{_}</Text> : _;
            },
            sorter: (a, b) => {
                return a.vnname.localeCompare(b.vnname);
            }
        },
        {
            title: "Tiền mặt",
            dataIndex: "cash",
            key: "cash",
            sorter: (a, b) => a.cash - b.cash
        },
        {
            title: "Certificate",
            dataIndex: "certificate",
            key: "certificate",
            sorter: (a, b) => a.certificate - b.certificate
        },
        {
            title: "Nhân viên",
            dataIndex: "staff.name",
            key: "staff.name",
            sorter: (a, b) => {
                return a.staff.name.localeCompare(b.staff.name);
            }
        },
        {
            title: "Người cộng",
            dataIndex: "createdBy.username",
            key: "createdBy.username",
            sorter: (a, b) => {
                return a.createdBy.username.localeCompare(b.createdBy.username);
            }
        },
        {
            title: "",
            dataIndex: "",
            width: "160px",
            render: (_, record) => (
                <div className="table-actions">
                    <Link to={`/ledger/${record.id}/view`}>Xem</Link>
                    <Link to={`/ledger/${record.id}/edit`}>Sửa</Link>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa trường này?"
                        onConfirm={() => doDestroy(record.id)}
                        okText="Chắc chắn"
                        cancelText="Hủy"
                    >
                        <ButtonLink>Xóa</ButtonLink>
                    </Popconfirm>
                </div>
            )
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (_selectedRowKeys, _selectedRows) => {
            dispatch(
                actions.doTableRowSelection(_selectedRowKeys, _selectedRows)
            );
        }
    };

    const invertPaymentMethod = async () => {
        let data = [];
        selectedRows.forEach((item, key) => {
            let tempItem = {};
            tempItem.id = item.id;
            tempItem.cash = item.certificate;
            tempItem.certificate = item.cash;
            data.push(tempItem);
        });
        dispatch(actions.doUpdate(data));
    };

    const stickFlag = () => {
        let data = [];
        selectedRows.forEach((item, key) => {
            let tempItem = {};
            tempItem.id = item.id;
            tempItem.flag = true;
            data.push(tempItem);
        });
        dispatch(actions.doUpdate(data));
    };

    const unStickFlag = () => {
        let data = [];
        selectedRows.forEach((item, key) => {
            let tempItem = {};
            tempItem.id = item.id;
            tempItem.flag = false;
            data.push(tempItem);
        });
        dispatch(actions.doUpdate(data));
    };

    const changeStaff = staffId => {
        let data = [];
        selectedRows.forEach((item, key) => {
            let tempItem = {};
            tempItem.id = item.id;
            tempItem.staff = staffId;
            data.push(tempItem);
        });
        dispatch(actions.doUpdate(data));
    };

    const handleRowClick = record => {
        dispatch(actions.doTableRowClick(record.id, record));
    };

    const MenuSetting = () => {
        return (
            <Menu>
                <Menu.Item onClick={invertPaymentMethod}>
                    Đảo ngược thanh toán
                </Menu.Item>
                <Menu.Item onClick={stickFlag}>Đánh dấu</Menu.Item>
                <Menu.Item onClick={unStickFlag}>Bỏ đánh dấu</Menu.Item>
                <Menu.SubMenu title="Thay đổi nhân viên">
                    {staffs.map((item, key) => (
                        <Menu.Item
                            key={key}
                            onClick={() => changeStaff(item.id)}
                        >
                            {item.name}
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
        );
    };

    return (
        <TableWrapper>
            {shiftRecord && !shiftRecord.lock && (
                <Dropdown overlay={MenuSetting} trigger={["click"]}>
                    <Button type="primary" icon="setting" />
                </Dropdown>
            )}

            {sumCashSelectedRow || sumCertificateSelectedRow ? (
                <>
                    {!!sumCashSelectedRow &&
                        descriptionTitle("Tiền mặt", sumCashSelectedRow)}

                    {!!sumCertificateSelectedRow &&
                        descriptionTitle(
                            "Certificate",
                            sumCertificateSelectedRow
                        )}

                    {!!sumCashSelectedRow &&
                        !!sumCertificateSelectedRow &&
                        descriptionTitle(
                            "Tổng",
                            sumCertificateSelectedRow + sumCashSelectedRow
                        )}
                </>
            ) : (
                <>
                    {descriptionTitle("Tiền mặt", sumCash)}
                    {descriptionTitle("Certificate", sumCertificate)}
                </>
            )}

            <Table
                rowKey="id"
                loading={useSelector(selectors.selectDataLoading)}
                columns={columns}
                dataSource={ledgers}
                rowSelection={rowSelection}
                onRow={record => ({
                    onClick: () => handleRowClick(record)
                })}
                // footer={()=>ledgers.length + ' chi nhánh'}
                scroll={{ x: 1200, y: 500 }}
                bordered={true}
                pagination={false}
            />
        </TableWrapper>
    );
};

export default ListTable;
