import { createSelector } from "@ngrx/store";

// Feature selector: It retruns one of the subtrees of the store
export const selectAuthenticationState = state => state.auth;

// Pure functions that remembers calculations it did before.
// i.e. we want this function to have memory    
export const isLoggedIn = createSelector(
    // Add list of selectors ...
    selectAuthenticationState,
    // Projector function: Is the last param. It takes all the outputs of all the selectors defined
    (auth) => {
        return auth.isLoggedIn;
    }
);

// Example of combining selectors
export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn) => !loggedIn
);