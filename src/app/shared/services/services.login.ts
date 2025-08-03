import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesLogin {
  
    private url = "https://curso.sunsetmanager.com/api"

    constructor(private http:HttpClient) {


    }

    validarLogin(email: string, password: string) {

      return this.http.get(`${this.url}/login?email=${email}&password=${password}`).pipe (

        map( data=>{

          return data;

        }

        )
      )

    }

}
