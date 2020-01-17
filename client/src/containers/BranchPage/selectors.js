import { createSelector } from "reselect";

const selectRaw = state => state.branch;

const selectInitLoading = createSelector(
    [selectRaw],
    branch => branch.initLoading
);

const selectDataLoading = createSelector(
    [selectRaw],
    branch => branch.dataLoading
);

const selectSaveLoading = createSelector(
    [selectRaw],
    branch => branch.saveLoading
);

const selectDestroyLoading = createSelector(
    [selectRaw],
    branch => branch.destroyLoading
);

const selectFindLoading = createSelector(
    [selectRaw],
    branch => branch.findLoading
);

const selectErrorMessage = createSelector([selectRaw], branch => branch.error);

const selectBranchs = createSelector([selectRaw], branch => branch.branchs);

const selectRecord = createSelector([selectRaw], branch => branch.record)

const selectSelectedRowKeys = createSelector(
    [selectRaw],
    branch => branch.selectedRowKeys
);

const selectSelectedRows = createSelector(
    [selectRaw],
    branch => branch.selectedRows
);



const selectors = {
    selectDataLoading,
    selectInitLoading,
    selectSaveLoading,
    selectErrorMessage,
    selectBranchs,
    selectSelectedRows,
    selectSelectedRowKeys,
    selectDestroyLoading,
    selectRecord,
    selectFindLoading
};

export default selectors;
