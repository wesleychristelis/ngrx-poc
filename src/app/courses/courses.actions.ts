import { Action } from "@ngrx/store";
import { Course } from "./model/course";
import { Update } from "@ngrx/entity";

// All Ng Rx definitions linked to the course module
export enum CourseActionTypes {
    CourseRequested = '[View Course Page] Course Requested', // // The Action requested by the view course page that we are looking for a given course, that we did not find in the store
    CourseLoaded = '[Courses API] Course Loaded', // // The Action that takes place after the call to the backend has returned the course
    AllCoursesRequested = '[Courses Home Page] All Courses Requested',
    AllCoursesLoaded = '[Courses API] All Courses Loaded',
    CourseSaved = '[Edit Course Dialog] Course Saved'
  }
  
  
  export class CourseRequested implements Action {
  
    readonly type = CourseActionTypes.CourseRequested;
  
    constructor(public payload: { courseId: number }) {
  
    }
  }
    
  export class CourseLoaded implements Action {
  
    readonly type = CourseActionTypes.CourseLoaded;
  
    constructor(public payload: { course: Course }) {
    }
  }

  export class AllCoursesRequested implements Action {
    readonly type = CourseActionTypes.AllCoursesRequested;
  }

  export class AllCoursesLoaded implements Action {
    readonly type = CourseActionTypes.AllCoursesLoaded;
  
    constructor(public payload: { courses: Course[] }) {
    }
  }

  export class CourseSaved implements Action {

    readonly type = CourseActionTypes.CourseSaved;
  
    constructor(public payload: { course: Update<Course> }) {} // Update is a RxJs type used t update the entity in memory
  }


  export type CourseActions =
  CourseRequested
  | CourseLoaded
  | AllCoursesRequested
  | AllCoursesLoaded
  | CourseSaved;