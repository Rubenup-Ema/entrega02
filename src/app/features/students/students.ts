import { Component } from '@angular/core';
import { StudentsTable } from "./students-table/students-table";

@Component({
  selector: 'app-students',
  imports: [StudentsTable],
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students {

}
