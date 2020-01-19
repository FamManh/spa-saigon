import { createSelector } from "reselect";

const selectRaw = state => state.service;

const selectInitLoading = createSelector(
    [selectRaw],
    service => service.initLoading
);

const selectDataLoading = createSelector(
    [selectRaw],
    service => service.dataLoading
);

const selectSaveLoading = createSelector(
    [selectRaw],
    service => service.saveLoading
);

const selectDestroyLoading = createSelector(
    [selectRaw],
    service => service.destroyLoading
);

const selectFindLoading = createSelector(
    [selectRaw],
    service => service.findLoading
);

const selectExportLoading = createSelector(
    [selectRaw],
    service => service.exportLoading
);

const selectErrorMessage = createSelector([selectRaw], service => service.error);

const selectServices = createSelector([selectRaw], service => service.services);

const selectRecord = createSelector([selectRaw], service => service.record)
const selectRecordItems = createSelector(
    [selectRecord],
    record => record ? record.items : null
);

const selectSelectedRowKeys = createSelector(
    [selectRaw],
    service => service.selectedRowKeys
);

const selectSelectedRows = createSelector(
    [selectRaw],
    service => service.selectedRows
);



const selectors = {
    selectDataLoading,
    selectInitLoading,
    selectSaveLoading,
    selectErrorMessage,
    selectServices,
    selectSelectedRows,
    selectSelectedRowKeys,
    selectDestroyLoading,
    selectRecord,
    selectRecordItems,
    selectFindLoading,
    selectExportLoading
};

export default selectors;
