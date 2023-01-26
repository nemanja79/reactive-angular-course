import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {CourseServices} from "../services/courses.services";
import {LoadingService} from "../loading/loading.service";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private courseServices:CourseServices, private loadingService:LoadingService) {

  }

  ngOnInit() {

    this.reloadCourses();
  }


   reloadCourses() {


    const courses$ = this.courseServices.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo))
      );

    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    courses$.subscribe(value => console.log(value));

    this.beginnerCourses$ = courses$.pipe(
      map(courses => courses.filter(courses => courses.category == "BEGINNER"))
    );

    this.advancedCourses$ = courses$.pipe(
      map(courses => courses.filter(courses => courses.category == "ADVANCED"))
    );
  }
}




