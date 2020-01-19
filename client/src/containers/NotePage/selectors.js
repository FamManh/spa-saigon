import { createSelector } from "reselect";

const selectRaw = state => state.note;

const selectInitLoading = createSelector(
    [selectRaw],
    note => note.initLoading
);

const selectDataLoading = createSelector(
    [selectRaw],
    note => note.dataLoading
);

const selectSaveLoading = createSelector(
    [selectRaw],
    note => note.saveLoading
);

const selectNotes = createSelector([selectRaw], note => note.notes);

const selectVisible = createSelector(
    [selectRaw],
    note => note.visible
);

const selectUnReadCount = createSelector([selectRaw], note => note.unReadCount);

const selectors = {
    selectDataLoading,
    selectInitLoading,
    selectSaveLoading,
    selectNotes,
    selectVisible,
    selectUnReadCount
};

export default selectors;
