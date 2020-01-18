import { createSelector } from "reselect";

const selectRaw = state => state.staff;

const selectInitLoading = createSelector(
    [selectRaw],
    staff => staff.initLoading
);

const selectDataLoading = createSelector(
    [selectRaw],
    staff => staff.dataLoading
);

const selectSaveLoading = createSelector(
    [selectRaw],
    staff => staff.saveLoading
);

const selectDestroyLoading = createSelector(
    [selectRaw],
    staff => staff.destroyLoading
);

const selectFindLoading = createSelector(
    [selectRaw],
    staff => staff.findLoading
);

const selectExportLoading = createSelector(
    [selectRaw],
    staff => staff.exportLoading
);

const selectErrorMessage = createSelector([selectRaw], staff => staff.error);

const selectStaffs = createSelector([selectRaw], staff => staff.staffs);

const selectRecord = createSelector([selectRaw], staff => staff.record)

const selectSelectedRowKeys = createSelector(
    [selectRaw],
    staff => staff.selectedRowKeys
);

const selectSelectedRows = createSelector(
    [selectRaw],
    staff => staff.selectedRows
);



const selectors = {
    selectDataLoading,
    selectInitLoading,
    selectSaveLoading,
    selectErrorMessage,
    selectStaffs,
    selectSelectedRows,
    selectSelectedRowKeys,
    selectDestroyLoading,
    selectRecord,
    selectFindLoading,
    selectExportLoading
};

export default selectors;
