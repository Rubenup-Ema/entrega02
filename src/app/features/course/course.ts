import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoursesTable } from './courses-table/courses-table';


@Component({
  selector: 'app-course',
  imports: [CoursesTable],
  templateUrl: './course.html',
  styleUrl: './course.scss'
})
export class Course {

 

}
