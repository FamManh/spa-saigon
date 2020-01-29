import { createSelector } from "reselect";

const selectRaw = state => state.ledgerPublic;

const selectDataLoading = createSelector(
    [selectRaw],
    ledger => ledger.dataLoading
);

const selectLedgers = createSelector([selectRaw], ledger => ledger.ledgers);

const selectors = {
    selectDataLoading,
    selectLedgers,
};

export default selectors;
