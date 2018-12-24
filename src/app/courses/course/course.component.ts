import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Course} from "../model/course";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent, Observable} from "rxjs";
import {LessonsDataSource} from "../services/lessons.datasource";
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { PageQuery } from '../courses.actions';
import { selectLessonsLoading } from '../course.selectors';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    dataSource: LessonsDataSource;

    displayedColumns= ["seqNo", "description", "duration"];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    loading$: Observable<boolean>;

    constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    }

    ngOnInit() {
        this.course = this.route.snapshot.data["course"]; // Resolver populates this snapshot

        this.loading$ = this.store.pipe(select(selectLessonsLoading));

        this.dataSource = new LessonsDataSource(this.store);

        const initialPage: PageQuery = {
            pageIndex: 0,
            pageSize: 3
        }

        this.dataSource.loadLessons(this.course.id, initialPage);
    }

    ngAfterViewInit() {
        // Paginator has an observable that we can subscribe to that lets us react to a page change
        this.paginator.page
        .pipe(
            tap(() => this.loadLessonsPage())
        )
        // we subscribe to the observable , otherwise the logic will not be triggered
        .subscribe();
    }

    loadLessonsPage() {
        const newPage: PageQuery = {
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize
          };
    
          this.dataSource.loadLessons(this.course.id, newPage);
    }
}