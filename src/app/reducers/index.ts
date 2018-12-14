import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { AuthActionTypes } from '../auth/auth.actions';

type AuthState = {
  loggedIn: boolean,
  user: User
};

// Defines the data content / structure of the data inside the store.
export interface AppState {
  auth: AuthState, // Anything to do with login will be held in this property
  // courses: CoursesState
  // lessons: LessonsState
}

// For each property in AppState we need to specify a reducer function
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};

/// Reducer Functions

// Takes the current state and the action and returns the new state
function authReducer(state: AuthState, action): AuthState {
  debugger;
    // What action are we processing
    switch(action.type){
      
      case AuthActionTypes.LoginAction: {

        console.log("LoginAction Reducer" + action.payload.user.email);

        // Always create a new object and not mutate an existing object
        return {
          loggedIn: true,
          user: action.payload.user
        };
      }

      // If no action exists
      default:{
        console.log("ACTION does not exists");
        return state;
      }

    }
}

//
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
