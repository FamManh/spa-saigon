import React from "react";
import ContentWrapper from "../../Layout/styles/ContentWrapper";
import PageTitle from "../../shared/styles/PageTitle";
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
