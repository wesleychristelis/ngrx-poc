import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, Logout } from './auth.actions';
import { tap } from 'rxjs/operators';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { Router } from '@angular/router';
import { defer } from 'rxjs/internal/observable/defer';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class AuthEffects {

  // We have an actions observable that emits everytime an action is dispatched
  constructor(private actions$: Actions, private router:Router) {}
  
  // We want to add the user to local storage
  @Effect({dispatch:false})
  login$ = this.actions$.pipe(
    // Our application could have a lot of actions
    // Using the ofType RxJs operator will help us idenoty our actions

    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem("user", JSON.stringify(action.payload.user)))
  );

  // We want to clear the user from local storage
  @Effect({dispatch:false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {

      localStorage.removeItem("user");
      this.router.navigateByUrl('/login');

    })
  );

  // On init we want to set local storage
  // We want to produce an action
  @Effect()
  init$ = defer(() => {

    const userData = localStorage.getItem("user");

    if (userData) {
        return of(new Login({user:JSON.parse(userData)}));
    }
    else {
      return <any> of(new Logout());
    }

  });
}