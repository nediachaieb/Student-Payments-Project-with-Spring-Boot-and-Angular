import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {StudentsService} from '../services/students-service';
import {Student} from '../model/students.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit{
  public students! : Array<Student> ;
  public studentDataSource! : MatTableDataSource<Student, MatPaginator>;
  displayedColumnsStudent = ['id', 'photo', 'firstName', 'lastName', 'actions'];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  backendHost = environment.backendHost;
  constructor( private router : Router , private http: HttpClient , private studentsService : StudentsService) {
  }

  ngOnInit(): void {

   // this.http.get("http://localhost:8080/students")
    this.studentsService.getALLStudents()
      .subscribe({
        next: (data: any) => {
          this.students = data;
          this.studentDataSource = new MatTableDataSource(this.students);
          this.studentDataSource.paginator = this.paginator;
          this.studentDataSource.sort = this.sort;
        },
        error: (err) => {
          console.error("Error fetching students:", err);
        }
      });
  }

  // ngOnInit() {
  //   this.students=[];
  //   function randomName(length: number): string {
  //     const letters = 'abcdefghijklmnopqrstuvwxyz';
  //     let name = '';
  //     for (let i = 0; i < length; i++) {
  //       const index = Math.floor(Math.random() * letters.length);
  //       name += letters[index];
  //     }
  //     return name;
  //   }
  //
  //   for (let i = 1; i <= 100; i++) {
  //     this.students.push({
  //       id: i,
  //       firstName: randomName(5),
  //       lastName: randomName(5)
  //     });
  //   }
  //
  //   this.dataSource = new MatTableDataSource(this.students)
  // }

  filterStudents(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.studentDataSource.filter = value;
  }

   studentPayments(student : Student) {
     this.router.navigateByUrl(`/admin/student-details/${student.code}`);
   }
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.png';
  }

  editStudent(student: any): void {
    this.router.navigateByUrl(`/admin/edit-student/${student.id}`);
  }
  newStudent() {
    this.router.navigateByUrl('/admin/new-student');
  }
  // deleteStudent(student: any) {
  //   if (!confirm("Are you sure you want to delete this student?")) return;
  //
  //   this.studentsService.deleteStudent(student.id).subscribe({
  //     next: () => {
  //       alert("Student deleted");
  //       this.loadStudents(); // recharge la liste
  //     },
  //     error: err => {
  //       console.error(err);
  //       alert("Error deleting student");
  //     }
  //   });

}
