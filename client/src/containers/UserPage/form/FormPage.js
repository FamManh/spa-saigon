import React from "react";
import Layout from "../../Layout";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import PageTitle from "../../shared/styles/PageTitle";
import Breadcrumb from "../../shared/Breadcrumb";
import FormComp from "./FormComp";

const FormPage = ({match}) => {
    let isEditing = () => {
        return !!match.params.id;
    };

    let title = () => {
        return isEditing()
            ? "Chỉnh sửa người dùng"
            : "Thêm mới người dùng"
    };

    return (
        <React.Fragment>
            <Breadcrumb
                items={[
                    ["Trang chủ", "/"],
                    ["Người dùng", "/user"],
                    [title()]
                ]}
            />

            <ContentWrapper>
                <PageTitle>{title()}</PageTitle>

                <FormComp match={match} />
            </ContentWrapper>
        </React.Fragment>
    );
}

export default Layout(FormPage);
