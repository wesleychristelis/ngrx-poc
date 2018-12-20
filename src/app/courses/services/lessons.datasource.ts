


import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Lesson} from "../model/lesson";
import {CoursesService} from "./courses.service";
import {catchError, finalize, tap} from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { PageQuery, LessonsPageRequested } from "../courses.actions";
import { selectLessonsPage } from "../course.selectors";



export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private store: Store<AppState>) {

    }

    loadLessons(courseId:number, page: PageQuery) {

        this.store
          .pipe(
            select(selectLessonsPage(courseId, page)), // this will give us back the collection of lessons
            tap(lessons => {
              //if we have lessons we emit to the behavior subject of the datasource for the material desing data table  
              if (lessons.length > 0) {
                this.lessonsSubject.next(lessons);
              }
              // Otherwise request the lessons by dispatching an action
              else {
                this.store.dispatch(new LessonsPageRequested({courseId, page}));
              }
            }),
            catchError(() => of([])) // if something goes wrong, we emit an empty array
          )
          .subscribe(); // all observable need to be subsribed to to run
          
        // this.loadingSubject.next(true);

        // this.coursesService.findLessons(courseId, pageIndex, pageSize).pipe(
        //         catchError(() => of([])),
        //         finalize(() => this.loadingSubject.next(false))
        //     )
        //     .subscribe(lessons => this.lessonsSubject.next(lessons));

    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log("Connecting data source");
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

}

