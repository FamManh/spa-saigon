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
            sorter: (a, b) => {
                return a.vnname.localeCompare(b.vnname);
            }
        },
        {
            title: "Nhân viên",
            dataIndex: "staff.name",
            key: "staff.name",
            sorter: (a, b) => {
                return a.staff.name.localeCompare(b.staff.name);
            },
            sortDirections: ["descend", "ascend"],
            defaultSortOrder: "ascend"
        },
        {
            title: "Tiền",
            dataIndex: "sum",
            key: "sum",
            render: (_, record) => record.cash + record.certificate,
            sorter: (a, b) => {
                return a.cash + a.certificate - (b.cash + b.certificate);
            }
        }
    ];

    return (
        <TableWrapper>
            <Table
                rowKey="_id"
                loading={useSelector(selectors.selectDataLoading)}
                columns={columns}
                dataSource={ledgers}
                scroll={{ y: 500, x: 700 }}
                bordered={true}
                pagination={false}
                size="small"
            />
        </TableWrapper>
    );
};

export default ListTable;
