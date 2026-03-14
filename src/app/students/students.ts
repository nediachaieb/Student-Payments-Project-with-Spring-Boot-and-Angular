import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit ,AfterViewInit{
  public students : any;
  public dataSource : any;
  public displayedColumns =["id","firstName","lastName","payments"]
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  constructor( private router : Router , private http: HttpClient) {
  }

  ngOnInit(): void {

    this.http.get("http://localhost:8080/students")
      .subscribe({
        next: (data: any) => {
          this.students = data;
          this.dataSource = new MatTableDataSource(this.students);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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

  ngAfterViewInit() {

  }

  filterStudents(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  getPayments(student : any) {
    this.router.navigateByUrl("/payments")
  }


}
