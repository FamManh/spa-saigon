import React, { useEffect } from "react";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import PageTitle from "../../shared/styles/PageTitle";
import Breadcrumb from "../../shared/Breadcrumb";
import View from "./View";
import actions from "../actions";
import ViewToolbar from "./ViewToolbar";
import { useDispatch } from "react-redux";

const ViewPage = ({ match }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.doFind(match.params.id));
    },[]);

    return (
        <React.Fragment>
            <Breadcrumb
                items={[
                    ["Trang chủ", "/"],
                    ["Chi nhánh", "/staff"],
                    ["Thông tin"]
                ]}
            />

            <ContentWrapper>
                <PageTitle>Thông tin nhân viên</PageTitle>

                <ViewToolbar match={match} />

                <View />
            </ContentWrapper>
        </React.Fragment>
    );
};
export default Layout(ViewPage);
