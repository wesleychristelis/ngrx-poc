import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CoursesState } from "./course.reducers";
import * as fromCourse from './course.reducers'

// We need a selector for querying the store for a course with an Id if the course exists we will return it, otherwise we dispatch the "CourseRequested" Action

// We define a feature state for the courses state, we do this by using the "createFeatureSelector" utility function. this selector will return the "Courses" state.
export const selectCoursesState = createFeatureSelector<CoursesState>("courses"); // param is the property we will find the state in the dev tools

// Selector with param, 
export const selectCourseById = (courseId: number) => createSelector(
    selectCoursesState, // We return the courses state
    (coursesState) => coursesState.entities[courseId]
)

export const allCoursesLoaded = createSelector( 
    selectCoursesState,
    coursesState => coursesState.allCoursesLoaded
);

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourse.selectAll
);

export const selectBeginnerCourses = createSelector( 
    selectAllCourses,
    beginnerCourses => beginnerCourses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvancedCourses = createSelector( 
    selectAllCourses,
    advancedCourses => advancedCourses.filter(course => course.category == 'ADVANCED')
);

export const selectPromotionTotal = createSelector( 
    selectAllCourses,
    promotionTotal => promotionTotal.filter(course => course.promo).length
);