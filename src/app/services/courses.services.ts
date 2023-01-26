import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {map, shareReplay} from "rxjs/operators";


@Injectable({
   providedIn:'root'
  })
export class CourseServices {

  constructor (private http:HttpClient){

  }

  loadAllCourses():Observable<Course[]>{
          return this.http.get<Course[]>('/api/courses')
            .pipe(
              map(result => result["payload"]),
              shareReplay()
            );
  }

  save(courseId:string, changes: Partial<Course>):Observable<any>{

    return this.http.put('/api/courses/'+courseId, changes).pipe(shareReplay());
  }
}
