import { createSelector } from "reselect";

const selectRaw = state => state.ledger;

const selectInitLoading = createSelector(
    [selectRaw],
    ledger => ledger.initLoading
);

const selectDataLoading = createSelector(
    [selectRaw],
    ledger => ledger.dataLoading
);

const selectSaveLoading = createSelector(
    [selectRaw],
    ledger => ledger.saveLoading
);

const selectDestroyLoading = createSelector(
    [selectRaw],
    ledger => ledger.destroyLoading
);

const selectFindLoading = createSelector(
    [selectRaw],
    ledger => ledger.findLoading
);

const selectExportLoading = createSelector(
    [selectRaw],
    ledger => ledger.exportLoading
);

const selectErrorMessage = createSelector([selectRaw], ledger => ledger.error);

const selectLedgers = createSelector([selectRaw], ledger => ledger.ledgers);

const selectRecord = createSelector([selectRaw], ledger => ledger.record)

const selectSelectedRowKeys = createSelector(
    [selectRaw],
    ledger => ledger.selectedRowKeys
);

const selectSelectedRows = createSelector(
    [selectRaw],
    ledger => ledger.selectedRows
);

const selectLastSauna = createSelector(
    [selectRaw],
    ledger => ledger.lastSauna
);

const selectLastMasseur = createSelector(
    [selectRaw],
    ledger => ledger.lastMasseur
);


const selectLink = createSelector(
    [selectRaw],
    ledger => ledger.link
);

const selectClear = createSelector([selectRaw], ledger => ledger.clear);

const selectServiceItems = createSelector(
    [selectRaw],
    ledger => ledger.serviceItems
);

const selectDiscount = createSelector(
    [selectRaw],
    ledger => ledger.discount
);

const selectPaymentMethod = createSelector([selectRaw], ledger => ledger.paymentMethod);
const selectSumCash = createSelector([selectRaw], ledger => ledger.sumCash);
const selectSumCertificate = createSelector([selectRaw], ledger => ledger.sumCertificate);
const selectSumCashSelectedRow = createSelector([selectRaw], ledger => ledger.sumCashSelectedRow);
const selectSumCertificateSelectedRow = createSelector(
    [selectRaw],
    ledger => ledger.sumCertificateSelectedRow
);

const selectors = {
    selectDataLoading,
    selectInitLoading,
    selectSaveLoading,
    selectErrorMessage,
    selectLedgers,
    selectSelectedRows,
    selectSelectedRowKeys,
    selectDestroyLoading,
    selectRecord,
    selectFindLoading,
    selectExportLoading,
    selectLastSauna,
    selectLastMasseur,
    selectLink,
    selectClear,
    selectServiceItems,
    selectDiscount,
    selectPaymentMethod,
    selectSumCash,
    selectSumCertificate,
    selectSumCashSelectedRow,
    selectSumCertificateSelectedRow
};

export default selectors;
