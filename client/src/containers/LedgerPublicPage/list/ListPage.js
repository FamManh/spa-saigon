import React, { useEffect } from "react";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import PageTitle from "../../shared/styles/PageTitle";
import { useDispatch } from "react-redux";
import actions from '../actions';
import ListTable from "./ListTable";
import ListFilter from "./ListFilter";

const ListPage = () => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(actions.list());
    // },[])
    return (
        <React.Fragment>

            <ContentWrapper>
                <PageTitle>Tua</PageTitle>
                <ListFilter/>
                <ListTable />
            </ContentWrapper>
        </React.Fragment>
    );
};

export default ListPage;
