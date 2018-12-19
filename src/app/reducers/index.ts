import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { authReducer, AuthState } from '../auth/auth.reducer';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {
  //auth: AuthState
}

// For each property in AppState we need to specify a reducer function
export const reducers: ActionReducerMap<AppState> = {
  //auth: authReducer
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];


