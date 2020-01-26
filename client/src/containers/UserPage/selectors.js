import { createSelector } from "reselect";

const selectRaw = state => state.user;

const selectInitLoading = createSelector(
    [selectRaw],
    user => user.initLoading
);

const selectDataLoading = createSelector(
    [selectRaw],
    user => user.dataLoading
);

const selectSaveLoading = createSelector(
    [selectRaw],
    user => user.saveLoading
);

const selectDestroyLoading = createSelector(
    [selectRaw],
    user => user.destroyLoading
);

const selectFindLoading = createSelector(
    [selectRaw],
    user => user.findLoading
);

const selectExportLoading = createSelector(
    [selectRaw],
    user => user.exportLoading
);

const selectErrorMessage = createSelector([selectRaw], user => user.error);

const selectUsers = createSelector([selectRaw], user => user.users);

const selectRecord = createSelector([selectRaw], user => user.record)

const selectSelectedRowKeys = createSelector(
    [selectRaw],
    user => user.selectedRowKeys
);

const selectSelectedRows = createSelector(
    [selectRaw],
    user => user.selectedRows
);



const selectors = {
    selectDataLoading,
    selectInitLoading,
    selectSaveLoading,
    selectErrorMessage,
    selectUsers,
    selectSelectedRows,
    selectSelectedRowKeys,
    selectDestroyLoading,
    selectRecord,
    selectFindLoading,
    selectExportLoading
};

export default selectors;
