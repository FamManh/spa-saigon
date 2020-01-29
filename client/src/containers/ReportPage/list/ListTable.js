import { Table } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import React from "react";
import TableWrapper from "../../shared/styles/TableWrapper";
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
    const reports = useSelector(selectors.selectReports);
     const sumCash = useSelector(selectors.selectSumCash);
     const sumCertificate = useSelector(selectors.selectSumCertificate);
     const sumCashSelectedRow = useSelector(selectors.selectSumCashSelectedRow);
     const sumCertificateSelectedRow = useSelector(
         selectors.selectSumCertificateSelectedRow
     );

    let columns = [
        {
            title: "Nhân viên",
            dataIndex: "_id.name",
            key: "_id.name",
            sorter: (a, b) => a._id.name.length - b._id.name.length
        },
        {
            title: "Tổng tiền",
            dataIndex: "sum",
            sorter: (a, b) => {
                return a.cash + a.certificate - (b.cash + b.certificate);
            },
            sortDirections: ["descend", "ascend"],
            defaultSortOrder: "descend",
            render: (text, row, index) => row.cash + row.certificate
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
            title: "Thời gian",
            dataIndex: "duration",
            key: "duration",
            sorter: (a, b) => a.duration - b.duration
        },
        {
            title: "Tua",
            dataIndex: "count",
            key: "count",
            sorter: (a, b) => a.count - b.count
        }
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: (_selectedRowKeys, _selectedRows) => {
            console.log(_selectedRowKeys);
            console.log(_selectedRows);

            dispatch(
                actions.doTableRowSelection(_selectedRowKeys, _selectedRows)
            );
        }
    };

    const handleRowClick = record => {
        dispatch(actions.doTableRowClick(record._id._id, record));
    };

    return (
        <TableWrapper>
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
                rowKey={record => record._id._id}
                loading={useSelector(selectors.selectDataLoading)}
                columns={columns}
                dataSource={reports}
                rowSelection={rowSelection}
                onRow={record => ({
                    onClick: () => handleRowClick(record)
                })}
                size="small"
                // footer={()=>reports.length + ' chi nhánh'}
                scroll={{ x: 1000}}
                bordered={true}
                pagination={false}
            />
        </TableWrapper>
    );
};

export default ListTable;
