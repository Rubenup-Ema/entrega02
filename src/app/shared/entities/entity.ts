export interface Student {
  id: number;
  name: string;
  surname: string;
  age: number;
  codigo: number;
  avg: number;
  courseId: number;
  email: string;
  title: string
}

export interface Course {
  id: number;
  title: string;
  description: string;
  tstudent: number;
}
