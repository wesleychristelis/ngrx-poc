


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "./courses.service";
import { AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { selectCourseById } from "../course.selectors";
import { tap, filter, first } from "rxjs/operators";
import { CourseRequested } from "../courses.actions";



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private coursesService:CoursesService, private store: Store<AppState>) {

    }

    // Every time we call the course page we are getting the information again
    // We must refactor to use the store
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {

        //return this.coursesService.findCourseById(route.params['id']);

        const courseId = route.params['id'];

        return this.store.pipe(
            select(selectCourseById(courseId)), // look for course in store using selector
            tap(course => { // we either have a course or not
                if(!course){
                    this.store.dispatch(new CourseRequested({courseId})); // we have no course so dispatch action for this
                }
            }),
            filter(course => !!course), // if no course is present, we dont want the router transition to go through , so we filter out the undefined values
            first() // We make sure this observable terminates, only when it terminates will the router transition completes.
        )
    }

}

