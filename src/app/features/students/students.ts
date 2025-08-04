import { Component, OnInit } from '@angular/core';
import { StudentsTable } from "./students-table/students-table";
import { ServiceStudents } from './students-service/service.students';
import { Course, Student } from '../../shared/entities/entity';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/utils/confirm-dialog/confirm-dialog';
import { Message } from '../../shared/services/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddStudent } from "./add-student/add-student";
import { CoursesService } from '../course/courses-service/courses.service';
import { EditStudent } from './edit-student/edit-student';

@Component({
  selector: 'app-students',
  imports: [StudentsTable, FormsModule, CommonModule, AddStudent,EditStudent],
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students implements OnInit {

  courses: Course[] = [];
  students: Student[] = [];
  editStudent!: Student;
  formVisible: boolean[] = [true,false,false]; // [list, add, edit]
  constructor(private _servicios:ServiceStudents, private _serviciosC: CoursesService, private dialog: MatDialog, private snackBar:Message) {



  }

   ngOnInit() {
     this.loadStudents();
     this.loadCourses();
     this.formVisible[0] = true;
  }

   loadStudents() {

    this._servicios.loadStudents().subscribe({
      next:   (data:any) => {

            if (data.ok.toString() === "true") {

              this.students = data.result;
              this.students = [...this.students];
             this.noChangeNewSudent(true);

            }

        }, error: (err) => {

          this.snackBar.show(err);

        },
        complete: ()=> {

          this.students = [...this.students];

        }
    }
      
      

      
    ) 

  }

   loadCourses() {

    this._serviciosC.loadCourses().subscribe(
      
        (data:any) => {

            if (data.ok.toString() === "true") {

              this.courses = data.result;
              
            }

        }

      
    ) 

  }

  newStudent() {

    this.formVisible = [false,true,false];

  }

  noChangeNewSudent(value: boolean) {


    this.formVisible = [value,false,false];


  }

 

   addStudent(student: Student) {


    this._servicios.addStudent(student).subscribe({

      next:(data:any) => {

        if (data.ok.toString() === "true") {
          this.snackBar.show(data.msg);
         
         
        } 

      },
      error: (err) =>{

         this.snackBar.show(err.message);

      },
      complete: ()=>{
        this.loadStudents();
      }
      }
    )


  }

  editedStudent(studentEdit: Student) {

    this._servicios.editStudent(studentEdit).subscribe({

      next:(data:any) => {

        if (data.ok.toString() === "true") {
          this.snackBar.show(data.msg);
          const index = this.students.findIndex(student => student.id === studentEdit.id);

  
          if (index !== -1) {
         
          var course = this.courses.find(course => course.id == studentEdit.courseId);
          studentEdit.title = "" + course?.title;
          this.students[index] = {...studentEdit};
          this.students = [...this.students];
          
          } 
          this.noChangeNewSudent(true);
      }
      },
      error: (err) =>{

         this.snackBar.show(err.message);

      }
      }
    )


  }

  onEdit(studentEdit: Student) {

    
    this.editStudent = studentEdit;   
    this.formVisible = [false,false,true]

  }

 onDelete(studentDelete: Student) {

    const dialogRef = this.dialog.open(ConfirmDialog, {
    width: '350px',
    data: { mensaje: '¿Estás seguro de eliminar al estudiante ' + studentDelete.name +  '?' }
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this._servicios.deleteStudent(studentDelete.id).subscribe(

        (data:any) => {

            if(data.ok.toString() === "true") {

              this.students = this.students.filter(student => student.id !== studentDelete.id);
              
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
