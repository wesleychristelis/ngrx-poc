import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";
import { Lesson } from "./model/lesson";
import { CourseActions, CourseActionTypes } from "./courses.actions";

export interface LessonsState extends EntityState<Lesson> {
    loading:boolean;
}

// Set the default sort order on the adapter
export const adapter : EntityAdapter<Lesson> = createEntityAdapter<Lesson>({
      sortComparer: sortByCourseAndSeqNo
  });

function sortByCourseAndSeqNo(l1: Lesson, l2:Lesson) {
    const compare = l1.courseId - l2.courseId;
    if (compare != 0) {
        return compare;
    }
    else {
        return l1.seqNo - l2.seqNo;
    }
}

const initialLessonsState = adapter.getInitialState({
    loading: false
});

export function lessonsReducer(state: LessonsState = initialLessonsState, action: CourseActions): LessonsState {

    switch(action.type) {

        case CourseActionTypes.LessonsPageCancelled:{
    
          return {
                ...state,
                loading:false
            };
        }
    
        case CourseActionTypes.LessonsPageRequested: {
          return {
                ...state,
                loading:true
            };
        }
    
        case CourseActionTypes.LessonsPageLoaded:{
    
          return adapter.addMany(action.payload.lessons, {...state, loading:false});
        }

        default:
          return state;
      }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
  
  } = adapter.getSelectors();