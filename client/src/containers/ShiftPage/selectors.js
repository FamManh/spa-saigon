import { createSelector } from "reselect";

const selectRaw = state => state.shift;

const selectInitLoading = createSelector(
    [selectRaw],
    shift => shift.initLoading
);

const selectDataLoading = createSelector(
    [selectRaw],
    shift => shift.dataLoading
);

const selectSaveLoading = createSelector(
    [selectRaw],
    shift => shift.saveLoading
);

const selectDestroyLoading = createSelector(
    [selectRaw],
    shift => shift.destroyLoading
);

const selectFindLoading = createSelector(
    [selectRaw],
    shift => shift.findLoading
);

const selectExportLoading = createSelector(
    [selectRaw],
    shift => shift.exportLoading
);

const selectErrorMessage = createSelector([selectRaw], shift => shift.error);

const selectShifts = createSelector([selectRaw], shift => shift.shifts);

const selectRecord = createSelector([selectRaw], shift => shift.record)

const selectSelectedRowKeys = createSelector(
    [selectRaw],
    shift => shift.selectedRowKeys
);

const selectSelectedRows = createSelector(
    [selectRaw],
    shift => shift.selectedRows
);

const selectFilter = createSelector(
    [selectRaw],
    shift => shift.filter
);



const selectors = {
    selectDataLoading,
    selectInitLoading,
    selectSaveLoading,
    selectErrorMessage,
    selectShifts,
    selectSelectedRows,
    selectSelectedRowKeys,
    selectDestroyLoading,
    selectRecord,
    selectFindLoading,
    selectExportLoading,
    selectFilter
};

export default selectors;
