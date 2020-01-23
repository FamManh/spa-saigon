import { createSelector } from "reselect";

const selectRaw = state => state.report;

const selectDataLoading = createSelector(
    [selectRaw],
    report => report.dataLoading
);

const selectFindLoading = createSelector(
    [selectRaw],
    report => report.findLoading
);

const selectExportLoading = createSelector(
    [selectRaw],
    report => report.exportLoading
);

const selectReports = createSelector([selectRaw], report => report.reports);

const selectRecord = createSelector([selectRaw], report => report.record)

const selectSelectedRowKeys = createSelector(
    [selectRaw],
    report => report.selectedRowKeys
);

const selectSelectedRows = createSelector(
    [selectRaw],
    report => report.selectedRows
);

const selectSumCash = createSelector([selectRaw], ledger => ledger.sumCash);
const selectSumCertificate = createSelector(
    [selectRaw],
    ledger => ledger.sumCertificate
);
const selectSumCashSelectedRow = createSelector(
    [selectRaw],
    ledger => ledger.sumCashSelectedRow
);
const selectSumCertificateSelectedRow = createSelector(
    [selectRaw],
    ledger => ledger.sumCertificateSelectedRow
);

const selectors = {
    selectDataLoading,
    selectReports,
    selectSelectedRows,
    selectSelectedRowKeys,
    selectRecord,
    selectFindLoading,
    selectExportLoading,
    selectSumCash,
    selectSumCertificate,
    selectSumCashSelectedRow,
    selectSumCertificateSelectedRow
};

export default selectors;
