import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoursesTable } from './courses-table/courses-table';
import { CoursesService } from './courses-service/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../shared/services/message';
import { ConfirmDialog } from '../../shared/utils/confirm-dialog/confirm-dialog';
import { Course } from '../../shared/entities/entity';


@Component({
  selector: 'app-course',
  imports: [CoursesTable],
  templateUrl: './course.html',
  styleUrl: './course.scss'
})
export class Courses implements OnInit{

  courses: Course[] = [];

  constructor(private _servicios: CoursesService, private dialog: MatDialog, private snackBar:Message) {



  }

  ngOnInit(): void {
    
     this.loadCourses();

  }

   loadCourses() {

    this._servicios.loadCourses().subscribe(
      
        (data:any) => {

            if (data.ok.toString() === "true") {

              this.courses = data.result;

            }

        }

      
    ) 

  }

   onDelete(courseDelete: Course) {
  
      const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { mensaje: '¿Estás seguro de eliminar el curso ' + courseDelete.title + '?' }
    });
  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this._servicios.deleteCourse(courseDelete.id).subscribe(
  
          (data:any) => {
  
              if(data.ok.toString() === "true") {
  
                this.courses = this.courses.filter(course => course.id !== courseDelete.id);
                
               
                this.snackBar.show(data.msg);
  
              } else {
  
                this.snackBar.show(data.msg);
  
              }
  
          }
  
        )
      } else {
        console.log('El usuario canceló');
      }
    });
  
    }


}
