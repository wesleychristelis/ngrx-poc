import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Course } from "./model/course";
import { CourseActions, CourseActionTypes } from './courses.actions';

// To easily create selectors and reducers for the Course entity we will use the NgRx entity adapter. IT exposes a lot of boiler palte functions
export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

// Features state that will contain all the courses in there. We need to decide how we store the courses in memory. See Commented section below.
// We decided to use NgRx Entity library.
// Why: Non repetitive way i.e. we dont have to repeat the redcuer logic

export interface CoursesState extends EntityState<Course> {  // Collection type of Course
    allCoursesLoaded:boolean;
}

export const initialCoursesState: CoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export function coursesReducer(state: CoursesState = initialCoursesState , action: CourseActions): CoursesState {

    switch(action.type) {
  
      case CourseActionTypes.CourseLoaded:{
  
        return adapter.addOne(action.payload.course, state); // add to state collection of courses
      }
  
      case CourseActionTypes.AllCoursesLoaded:{
  
        return adapter.addAll(action.payload.courses, {...state, allCoursesLoaded:true}); // spread operator to re assign the allCoursesLoaded flag
      }
  
      case CourseActionTypes.CourseSaved: {
  
        return adapter.updateOne(action.payload.course, state);
      }
      
      default: {
  
        return state;
      }
  
    }
  }

  // We expose entity selector for getting the courses
  export const {
    selectAll,
    selectIds,
    selectEntities,
    selectTotal
  } = adapter.getSelectors();