import { Table, Popconfirm, Icon } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React from "react";
import { Link } from "react-router-dom";
import TableWrapper from "../../shared/styles/TableWrapper";
import ButtonLink from "../../shared/styles/ButtonLink";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';


const ListTable = () => {
    const dispatch = useDispatch();
    const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys)
    const shifts = useSelector(selectors.selectShifts);
    let doDestroy = id => {
        dispatch(actions.doDestroy(id));
    };

    let columns = [
        {
            title: "Thời gian",
            dataIndex: "date",
            sorter: (a, b) => a.date.length - b.date.length,
            render: (text, row, index)=>{
                console.log(row);
            return (
                <Link to={`/shift/${row.id}`}>
                    {moment(text).format("YYYY-MM-DD") + '   '} 
                    {row.lock ? <Icon type="lock"/> : null}
                </Link>
            );
            }
        },
        {
            title: "Chi nhánh",
            dataIndex: "branch.name",
            key: "branch.name",
            sorter: (a, b) => a.branch.name.length - b.branch.name.length
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
            title: "Tiền mặt (admin)",
            dataIndex: "adminCash",
            key: "adminCash",
            sorter: (a, b) => a.adminCash - b.adminCash
        },
        {
            title: "Certificate (admin)",
            dataIndex: "adminCertificate",
            key: "adminCertificate",
            sorter: (a, b) => a.adminCertificate - b.adminCertificate
        },
        {
            title: "",
            dataIndex: "",
            width: "160px",
            render: (_, record) => (
                <div className="table-actions">
                    <Link to={`/shift/${record.id}/view`}>Xem</Link>
                    <Link to={`/shift/${record.id}/edit`}>Sửa</Link>
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

    const handleRowClick = record => {
        dispatch(actions.doTableRowClick(record.id, record));
    };

    return (
        <TableWrapper>
            <Table
                rowKey="id"
                loading={useSelector(selectors.selectDataLoading)}
                columns={columns}
                dataSource={shifts}
                rowSelection={rowSelection}
                onRow={record => ({
                    onClick: () => handleRowClick(record)
                })}
                // footer={()=>shifts.length + ' chi nhánh'}
                scroll={{ x: 500, y: 900 }}
                bordered={true}
                pagination={false}
            />
        </TableWrapper>
    );
}

export default ListTable;
