import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { CoursesService } from "./services/courses.service";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { CourseRequested, CourseActionTypes, CourseLoaded, AllCoursesRequested, AllCoursesLoaded, LessonsPageRequested, LessonsPageCancelled, LessonsPageLoaded } from "./courses.actions";
import { mergeMap, map, catchError, withLatestFrom, filter } from "rxjs/operators";
import { throwError, of } from "rxjs";
import { allCoursesLoaded } from "./course.selectors";


@Injectable()
export class CourseEffects {
    
    constructor(private actions$ :Actions, private coursesService: CoursesService, private store: Store<AppState>) {

    }

    @Effect()
    loadCourse$ = this.actions$.pipe(
        ofType<CourseRequested>(CourseActionTypes.CourseRequested), // we are responding to this type of action
        mergeMap(action => this.coursesService.findCourseById(action.payload.courseId)), // we make a callto the backend for the course
        map(course => new CourseLoaded({course})), // we dispatch a CourseLoaded action
        catchError(error => {
            console.log('error loading course ', error);
            return throwError(error);
        })
    );

    @Effect()
    loadAllCourses$ = this.actions$.pipe(
        ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested), // Respond to this event type
        withLatestFrom(this.store.pipe(select(allCoursesLoaded))), // Check in store and return collection if any and combine with the action observable 
        filter(([action, allCoursesLoaded]) => !allCoursesLoaded), // define a tuple variable , one holding the action, and one holding the allcourses loaded falg. If you have no courses the mergmap will be called 
        mergeMap(() => this.coursesService.findAllCourses()), // we make a call to the back end
        map(courses => new AllCoursesLoaded({courses})), // dispatch to populate the store with courses, the reducer will do this
        catchError(err => {
          console.log('error loading all courses ', err);
          return throwError(err);
        })
      );
    
    @Effect()
    loadLessonsPage$ = this.actions$.pipe(
        ofType<LessonsPageRequested>(CourseActionTypes.LessonsPageRequested), // listen for this action
        mergeMap(({payload}) => // combines the observables
            this.coursesService.findLessons(payload.courseId, payload.page.pageIndex, payload.page.pageSize) // call the backend
            .pipe(
                catchError(err => {
                    console.log('error loading a lessons page ', err);
                    this.store.dispatch(new LessonsPageCancelled()); // if we have an error, dispatch cancel action
                    return of([]);
                })
            )
        ),
        map(lessons => new LessonsPageLoaded({lessons})) // dispatch we have the lessons
    );
}