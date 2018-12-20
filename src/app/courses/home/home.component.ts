import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CoursesService} from "../services/courses.service";
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AllCoursesRequested } from '../courses.actions';
import { selectAllCourses, selectBeginnerCourses, selectAdvancedCourses, selectPromotionTotal } from '../course.selectors';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    // The store Store<AppState> is an observable of Application State
    // Because it is an observable we should not directly modify the data it emits.
    // To modify the data we dispatch an action
    constructor(private store: Store<AppState>) { }

    ngOnInit() {

        //Deprecated for use of NgRx , and use of effects and reducers
        //const courses$ = this.coursesService.findAllCourses();

        this.store.dispatch(new AllCoursesRequested()); // populate the store with courses

        this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));

        this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));

        this.promoTotal$ = this.store.pipe(select(selectPromotionTotal));
    }
}
