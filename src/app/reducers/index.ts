import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

// Defines the data content / structure of the data inside the store.
export interface AppState {

}

//
export const reducers: ActionReducerMap<AppState> = {

};

//
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
