import React from "react";
import Spinner from "../../shared/Spinner";
import ViewWrapper from "../../shared/styles/ViewWrapper";
import TextViewItem from "../../shared/view/TextViewItem";
import { useSelector } from "react-redux";
import selectors from "../selectors";
import moment from "moment";


const View = () => {
    const findLoading = useSelector(selectors.selectFindLoading)
    const record = useSelector(selectors.selectRecord);
    let renderView = () => {
        return (
            <ViewWrapper>
                <TextViewItem label={"ID"} value={record.id} />

                <TextViewItem
                    label={"Tên chi nhánh"}
                    value={record.branch.name}
                />
                <TextViewItem
                    label={"Thời gian"}
                    value={moment(record.date).format("YYYY-MM-DD")}
                />
                <TextViewItem label={"Tiền mặt"} value={record.cash} />
                <TextViewItem
                    label={"Certificate"}
                    value={record.certificate}
                />
                <TextViewItem
                    label={"Tiền mặt (admin)"}
                    value={record.adminCash}
                />
                <TextViewItem
                    label={"Certificate (admin)"}
                    value={record.adminCertificate}
                />
            </ViewWrapper>
        );
    }


    if (findLoading || !record) {
        return <Spinner />;
    }

    return renderView();
}

export default View;
