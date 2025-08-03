import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
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

}
