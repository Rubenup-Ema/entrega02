import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RoutePaths } from '../../shared/utils/routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {


    constructor(private router:Router) {


    }

    ngOnInit(): void {
      
      const user = "" + sessionStorage.getItem("user");

      if (user.trim() === "") {

        this.router.navigate(['/login']);

      }

    }

    menu(id: number) {

      switch (id) {

         case 1: 
         this.router.navigate(['/home/'+ RoutePaths.COURSES ])
         break;

         case 2: 
         this.router.navigate(['/home/'+ RoutePaths.STUDENTS ])
         break;

         case 3: 
         this.router.navigate(['/'+ RoutePaths.LOGIN ])
         break;


      }



    }

}
