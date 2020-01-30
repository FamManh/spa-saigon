import React, { useEffect } from "react";
import ListToolbar from "./ListToolbar";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import PageTitle from "../../shared/styles/PageTitle";
import Breadcrumb from "../../shared/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";
import ListTable from "./ListTable";
import ListFilter from "./ListFilter";
import moment from "moment";
import selectors from "../selectors";

const ListPage = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectors.selectFilter);

    useEffect(() => {
        let options = {
            start: filter.date.startOf("month").format("x"),
            end: filter.date.endOf("month").format("x")
        };
        if (filter && filter.branch) {
            options.branch = filter.branch;
        }
        dispatch(actions.list(options));
    }, []);
    return (
        <React.Fragment>
            <Breadcrumb items={[["Trang chủ", "/"], ["Ca"]]} />

            <ContentWrapper>
                <PageTitle>Ca</PageTitle>

                <ListToolbar />
                <ListFilter />
                <ListTable />
            </ContentWrapper>
        </React.Fragment>
    );
};

export default Layout(ListPage);
