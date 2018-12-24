import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CoursesState } from "./course.reducers";
import * as fromCourse from './course.reducers'
import * as fromLesson from './lessons.reducers';
import { PageQuery } from "./courses.actions";
import { LessonsState } from "./lessons.reducers";

// We need a selector for querying the store for a course with an Id if the course exists we will return it, otherwise we dispatch the "CourseRequested" Action

// We define a feature state for the courses state, we do this by using the "createFeatureSelector" utility function. this selector will return the "Courses" state.
// param is the property we will find the state in the dev tools and module
export const selectCoursesState = createFeatureSelector<CoursesState>("courses"); 
export const selectLessonsState = createFeatureSelector<LessonsState>("lessons");

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

export const selectAllLessons = createSelector(
    selectLessonsState,
    fromLesson.selectAll
);

export const selectLessonsPage = (courseId:number, page:PageQuery) => createSelector(
    selectAllLessons,
    allLessons => {
        const start = page.pageIndex * page.pageSize,
              end = start + page.pageSize;
  
        return allLessons
            .filter(lesson => lesson.courseId == courseId) // based on course id
            .slice(start, end); // page the array
      }
);

export const selectLessonsLoading = createSelector(
    selectLessonsState,
    //Projector
    lessonsState => lessonsState.loading
)