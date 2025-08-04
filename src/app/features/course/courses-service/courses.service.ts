import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

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

      deleteCourse(id:number) {

      return this.http.delete(`${this.url}/course?id=${id}`).pipe (

        map( data=>{

          return data;

        }

        )
      )

    }

}
