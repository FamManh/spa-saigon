import { Table } from "antd";
import selectors from "../selectors";
import React from "react";
import TableWrapper from "../../shared/styles/TableWrapper";
import { useSelector } from "react-redux";



const ListTable = () => {
    const ledgers = useSelector(selectors.selectLedgers);

    let columns = [
        {
            title: "Dịch vụ",
            dataIndex: "vnname",
            key: "vnname",
            sorter: (a, b) => a.vnname.length - b.vnname.length
        },
        {
            title: "Nhân viên",
            dataIndex: "staff.name",
            key: "staff.name",
            sorter: (a, b) => a.staff.name.length - b.staff.name.length,
            sortDirections: ["descend", "ascend"],
            defaultSortOrder: "ascend"
        },
        {
            title: "Tiền",
            dataIndex: "sum",
            key: "sum",
            render: (_, record) => record.cash + record.certificate,
            sorter: (a, b) => a.vnname.length - b.vnname.length
        }
    ];

    return (
        <TableWrapper>
            <Table
                rowKey="id"
                loading={useSelector(selectors.selectDataLoading)}
                columns={columns}
                dataSource={ledgers}
                scroll={{ y: 500, x: 700 }}
                bordered={true}
                pagination={false}
            />
        </TableWrapper>
    );
}

export default ListTable;
