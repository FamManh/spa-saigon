import React from "react";
import Spinner from "../../shared/Spinner";
import ViewWrapper from "../../shared/styles/ViewWrapper";
import TextViewItem from "../../shared/view/TextViewItem";
import { useSelector } from "react-redux";
import selectors from "../selectors";


const View = () => {
    const findLoading = useSelector(selectors.selectFindLoading)
    const record = useSelector(selectors.selectRecord);
    let renderView = () => {
        return (
            <ViewWrapper>
                <TextViewItem
                    label={"ID"}
                    value={record.id}
                />

                <TextViewItem
                    label={"Tên chi nhánh"}
                    value={record.name}
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
