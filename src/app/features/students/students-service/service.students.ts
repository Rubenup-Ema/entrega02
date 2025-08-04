import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Students } from '../students';
import { Student } from '../../../shared/entities/entity';

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

     addStudent(student: Student) {

      return this.http.post(`${this.url}/student`,student).pipe (

        map( data=>{

          return data;

        }

        )
      )
    }

    editStudent(student: Student) {

      return this.http.put(`${this.url}/student`,student).pipe (

        map( data=>{

          return data;

        }

        )
      )
    }
     
     deleteStudent(id:number) {

      return this.http.delete(`${this.url}/student?id=${id}`).pipe (

        map( data=>{

          return data;

        }

        )
      )

    }
}
