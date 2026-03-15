import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentsService} from '../services/students-service';
import {Payment} from '../model/students.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit {
  studentCode!: string;
  studentPayments!:Array<Payment>;
  paymentsDataSource!: MatTableDataSource<Payment>;
  public displayedColumnsPayments = [
    "id",
    "date",
    "type",
    "status",
    "amount",
    "firstName"
  ];

  constructor(private activatedRoute: ActivatedRoute,private studentsService: StudentsService ,private router: Router) {

  }

  ngOnInit() {
     this.studentCode = this.activatedRoute.snapshot.params['code'];
      this.studentsService.getStudentPayments(this.studentCode)
        .subscribe({
          next: (data) => {
            this.studentPayments = data;
              this.paymentsDataSource = new MatTableDataSource(this.studentPayments);
            console.log("Payments for student " + this.studentCode, data);
          },
          error: (err) => {
            console.error("Error fetching payments for student " + this.studentCode, err);
          }
        });
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`);

  }
}
