import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceStudents {
  
    private url = "https://curso.sunsetmanager.com/api"

    constructor(private http:HttpClient) {


    }

    loadStudents() {

      return this.http.get(`${this.url}/student`).pipe (

        map( data=>{

          return data;

        }

        )
      )

    }

}
