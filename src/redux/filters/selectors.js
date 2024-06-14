import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectNameFilter = (state) => state.filters.status;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, selectNameFilter) => {
    return contacts.filter((contact) => {
      if ("id" in contact && "name" in contact && "number" in contact) {
        if (
          typeof contact.id === "string" &&
          typeof contact.name === "string" &&
          typeof contact.number === "string"
        ) {
          return contact.name
            .toLowerCase()
            .includes(selectNameFilter.toLowerCase());
        }
      }
      return false;
    });
  }
);
