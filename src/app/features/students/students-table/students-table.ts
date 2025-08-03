import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { FullnamePipe } from '../../../shared/pipe/fullname-pipe';
import { Student } from '../../../shared/entities/entity';
import { ServiceStudents } from '../students-service/service.students';


@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, FullnamePipe, MatIconModule],
  templateUrl: './students-table.html',
  styleUrl: './students-table.scss'
})
export class StudentsTable implements OnInit {

  @Input() students: Student[] = [];
  @Output() studentEdit= new EventEmitter<Student>();
  @Output() studentDelete= new EventEmitter<Student>();

  displayedColumns: string[] = ['name', 'surname', 'fullname', 'age', 'dni', 'average', 'title' , 'acciones']

  constructor(private _servicios: ServiceStudents) {


  }

  ngOnInit(): void {
    
    this.loadStudents();

  }

  loadStudents() {

    this._servicios.loadStudents().subscribe(
      
        (data:any) => {

            if (data.ok.toString() === "true") {

              this.students = data.result;

            }

        }

      
    ) 

  }

  onDelete(student: Student){

    this.studentDelete.emit(student);

  }

  onEdit(student: Student){

    console.log(student);

    let editStudent!: Student;

    editStudent = { ...student };

    
    console.log(editStudent);

    this.studentEdit.emit(editStudent);

  }

}

