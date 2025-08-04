import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { FullnamePipe } from '../../../shared/pipe/fullname-pipe';
import { Student } from '../../../shared/entities/entity';



@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, FullnamePipe, MatIconModule],
  templateUrl: './students-table.html',
  styleUrl: './students-table.scss'
})
export class StudentsTable implements OnInit {

  @Input() students: Student[] = [];
  // students: Student[] = [];

  // @Input() set studentList(value: Student[]) {

  
   
  //     this.students = value;
  //     this.students = { ...value };

     
  
  // }

  @Output() studentEdit= new EventEmitter<Student>();
  @Output() studentDelete= new EventEmitter<Student>();

  displayedColumns: string[] = ['name', 'surname', 'fullname', 'age', 'dni', 'average', 'title' , 'acciones']

  constructor() {


  }

  ngOnInit(): void {
    
    this.students = [];

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

