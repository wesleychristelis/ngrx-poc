


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "./courses.service";



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private coursesService:CoursesService) {

    }

    // Every time we call the course page we are getting the information again
    // We must refactor to use the store
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        return this.coursesService.findCourseById(route.params['id']);
    }

}

