import { Action } from '@ngrx/store';
import { User } from '../model/user.model';

// Enum of all the actions we want for this module
export enum AuthActionTypes {
  LoginAction = '[Login] Action', // Unique string that identofies what action is being dispatched
  LogoutAction = '[Logout] Action'
}

// We dispatch this action, with type property of AuthActionTypes.LoginAction
export class Login implements Action {
 
  constructor(public payload: {user: User}){}
 
  readonly type = AuthActionTypes.LoginAction;
}

export class Logout implements Action {

  constructor(){}

  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = Login | Logout; // union type
