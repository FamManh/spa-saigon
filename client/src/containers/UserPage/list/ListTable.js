import { Table, Tag } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React from "react";
import { Link } from "react-router-dom";
import TableWrapper from "../../shared/styles/TableWrapper";
import { useSelector, useDispatch } from "react-redux";



const ListTable = () => {
    const dispatch = useDispatch();
    const selectedRowKeys = useSelector(selectors.selectSelectedRowKeys)
    const users = useSelector(selectors.selectUsers);
    // let doDestroy = record => {
    //     dispatch(actions.doUpdate(record.id, {isActive: !record.isActive}));
    // };

    let columns = [
        {
            title: "Tên",
            dataIndex: "username",
            key: "username",
            sorter: (a, b) => a.username.length - b.username.length
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            sorter: (a, b) => a.role.length - b.role.length
        },
        {
            title: "Trạng thái",
            dataIndex: "isActive",
            key: "isActive",
            sorter: (a, b) => a.role.length - b.role.length,
            render: isActive =>
                isActive ? (
                    <Tag color="green">Đang kích hoạt</Tag>
                ) : (
                    <Tag color="red">Đang khóa</Tag>
                )
        },
        {
            title: "",
            dataIndex: "",
            width: "160px",
            render: (_, record) => (
                <div className="table-actions">
                    <Link to={`/user/${record.id}/view`}>Xem</Link>
                    <Link to={`/user/${record.id}/edit`}>Sửa</Link>
                    {/* <Popconfirm
                        title="Bạn có chắc chắn muốn xóa trường này?"
                        onConfirm={() => doDestroy(record)}
                        okText="Chắc chắn"
                        cancelText="Hủy"
                    >
                    <ButtonLink>{record && record.isActive ? "Khóa" : "Kích hoạt"}</ButtonLink>
                    </Popconfirm> */}
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
                dataSource={users}
                rowSelection={rowSelection}
                onRow={record => ({
                    onClick: () => handleRowClick(record)
                })}
                // footer={()=>users.length + ' chi nhánh'}
                scroll={{ x: 1000, y: 500 }}
                bordered={true}
                pagination={false}
            />
        </TableWrapper>
    );
}

export default ListTable;
