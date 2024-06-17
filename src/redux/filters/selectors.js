import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectNameFilter = (state) => state.filters.name;

export const selectNumberFilter = (state) => state.filters.number;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, selectNameFilter) => {
    return contacts.filter((contact) => {
      contact.name.toLowerCase().includes(selectNameFilter.toLowerCase()) ||
        contact.number.includes(selectNameFilter);
    });
  }
);
