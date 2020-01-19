import { Table, Popconfirm } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React from "react";
import { Link } from "react-router-dom";
import TableWrapper from "../../shared/styles/TableWrapper";
import ButtonLink from "../../shared/styles/ButtonLink";
import { useSelector, useDispatch } from "react-redux";



const ListTable = () => {
    const dispatch = useDispatch();
    const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys)
    const services = useSelector(selectors.selectServices);
    let doDestroy = id => {
        dispatch(actions.doDestroy(id));
    };

    let columns = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            sorter: (a, b) => a.code.length - b.code.length
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: "Chi nhánh",
            dataIndex: "branch.name",
            key: "branch.name",
            sorter: (a, b) => a.branch.name.length - b.branch.name.length
        },
        {
            title: "",
            dataIndex: "",
            width: "160px",
            render: (_, record) => (
                <div className="table-actions">
                    <Link to={`/service/${record.id}/view`}>Xem</Link>
                    <Link to={`/service/${record.id}/edit`}>Sửa</Link>
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
                dataSource={services}
                rowSelection={rowSelection}
                onRow={record => ({
                    onClick: () => handleRowClick(record)
                })}
                // footer={()=>services.length + ' dịch vụ'}
                scroll={{ x: 500, y: 900 }}
                bordered={true}
                pagination={false}
            />
        </TableWrapper>
    );
}

export default ListTable;
