import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Course } from '../course';
import { CoursesService } from '../courses-service/courses.service';


@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule,  MatIconModule],
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.scss'
})
export class CoursesTable {

  @Input() Courses: Course[] = [];
  @Output() CourseEdit= new EventEmitter<Course>();
  @Output() CourseDelete= new EventEmitter<Course>();

  displayedColumns: string[] = ['id', 'title', 'description', 'tstudent' ,'acciones']

  constructor(private _servicios: CoursesService) {


  }

  ngOnInit(): void {
    
    this.loadCourses();

  }

  loadCourses() {

    this._servicios.loadCourses().subscribe(
      
        (data:any) => {

            if (data.ok.toString() === "true") {

              this.Courses = data.result;

            }

        }

      
    ) 

  }

  onDelete(Course: Course){

    this.CourseDelete.emit(Course);

  }

  onEdit(Course: Course){

    console.log(Course);

    let editCourse!: Course;

    editCourse = {...Course} ;

    
    console.log(editCourse);

    this.CourseEdit.emit(editCourse);

  }


}
