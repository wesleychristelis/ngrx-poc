import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Course} from "../model/course";
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";
import {LessonsDataSource} from "../services/lessons.datasource";
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { PageQuery } from '../courses.actions';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    dataSource: LessonsDataSource;

    displayedColumns= ["seqNo", "description", "duration"];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    }

    ngOnInit() {
        this.course = this.route.snapshot.data["course"]; // Resolver populates this snapshot

        this.dataSource = new LessonsDataSource(this.store);

        const initialPage: PageQuery = {
            pageIndex: 0,
            pageSize: 3
        }

        this.dataSource.loadLessons(this.course.id, initialPage);
    }

    ngAfterViewInit() {
        this.paginator.page
        .pipe(
            tap(() => this.loadLessonsPage())
        )
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
