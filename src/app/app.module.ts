import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {
    MatListModule,
    MatSidenavModule, MatToolbarModule,
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";

import {RouterModule, Routes} from "@angular/router";
import {AuthModule} from "./auth/auth.module";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";

import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';

const routes: Routes = [
    {
        path: 'courses',
        loadChildren: './courses/courses.module#CoursesModule', // Lazy loaded module , it will only load when we navigate to one of the courses screens
        canActivate: [],
    },
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        // login component has own module
        AuthModule.forRoot(),
        // new store add here:
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [], // Store dev tools only active if not in Production
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
