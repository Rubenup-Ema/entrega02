import { Component, OnInit } from '@angular/core';
import { StudentsTable } from "./students-table/students-table";
import { ServiceStudents } from './students-service/service.students';
import { Student } from '../../shared/entities/entity';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/utils/confirm-dialog/confirm-dialog';
import { Message } from '../../shared/services/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  imports: [StudentsTable, FormsModule, CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students implements OnInit {

  students: Student[] = [];

  constructor(private _servicios:ServiceStudents, private dialog: MatDialog, private snackBar:Message) {



  }

   ngOnInit() {
     this.loadStudents();
  }

   loadStudents() {

    this._servicios.loadStudents().subscribe({
      next:   (data:any) => {

            if (data.ok.toString() === "true") {

              this.students = data.result;
              this.students = [...this.students];
              

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
              
              console.log(this.students);
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
