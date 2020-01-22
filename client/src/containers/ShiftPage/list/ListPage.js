import React, { useEffect } from "react";
import ListToolbar from "./ListToolbar";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import PageTitle from "../../shared/styles/PageTitle";
import Breadcrumb from "../../shared/Breadcrumb";
import { useDispatch } from "react-redux";
import actions from '../actions';
import ListTable from "./ListTable";
import ListFilter from "./ListFilter";
import moment from 'moment';

const ListPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
                        dispatch(
                            actions.list({
                                date: moment(new Date()).format("x")
                            })
                        );
                    }, []);
    return (
        <React.Fragment>
            <Breadcrumb items={[["Trang chủ", "/"], ["Ca"]]} />

            <ContentWrapper>
                <PageTitle>Ca</PageTitle>

                <ListToolbar />
                <ListFilter/>
                <ListTable />
            </ContentWrapper>
        </React.Fragment>
    );
};

export default Layout(ListPage);
