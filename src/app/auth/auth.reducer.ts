import { Action } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActionTypes, AuthActions } from './auth.actions';


export interface AuthState {
  loggedIn: boolean,
  user: User
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined
};

// Reducer Functions
// Takes the current state and the action and returns the new state
export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
   
  // What action are we processing
   switch(action.type){
      
    case AuthActionTypes.LoginAction: {
      // Always create a new object and not mutate an existing object
      return {
        loggedIn: true,
        user: action.payload.user
      };
    }

    case AuthActionTypes.LogoutAction: {
      // Always create a new object and not mutate an existing object
      return {
        loggedIn: false,
        user: undefined
      };
    }

    // If no action exists
    default:{
      return state;
    }
  }
}
