import React, { useEffect } from "react";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import PageTitle from "../../shared/styles/PageTitle";
import Breadcrumb from "../../shared/Breadcrumb";
import FormComp from "./FormComp";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../selectors";
import { Redirect } from "react-router-dom";
import branchActions from "../../BranchPage/actions";
import actions from "../actions";
const FormPage = ({ match }) => {
    let isEditing = () => {
        return !!match.params.id;
    };
    const dispatch = useDispatch();
    

    let title = () => {
        return isEditing() ? "Chỉnh sửa dịch vụ" : "Thêm mới dịch vụ";
    };

    useEffect(() => {
        dispatch(branchActions.list());
        if (isEditing()) {
            dispatch(actions.doFind(match.params.id));
        }
    }, []);

    return (
        <React.Fragment>
            <Breadcrumb
                items={[
                    ["Trang chủ", "/"],
                    ["Dịch vụ", "/service"],
                    [title()]
                ]}
            />

            <ContentWrapper>
                <PageTitle>{title()}</PageTitle>

                <FormComp match={match} />
            </ContentWrapper>
        </React.Fragment>
    );
};

export default Layout(FormPage);
