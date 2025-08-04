import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Course } from '../../../shared/entities/entity';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  private url = "https://curso.sunsetmanager.com/api"

    constructor(private http:HttpClient) {


    }

    loadCourses() {

      return this.http.get(`${this.url}/course`).pipe (

        map( data=>{

          return data;

        }

        )
      )

    }

    addCourse(course:Course) {

       return this.http.post(`${this.url}/course`,course).pipe (

        map( data=>{

          return data;

        }

        )
      )

    }

     editCourse(course:Course) {

       return this.http.put(`${this.url}/course`,course).pipe (

        map( data=>{

          return data;

        }

        )
      )

    }

      deleteCourse(id:number) {

      return this.http.delete(`${this.url}/course?id=${id}`).pipe (

        map( data=>{

          return data;

        }

        )
      )

    }

}
