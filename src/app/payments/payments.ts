import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from '@angular/common/http';
import {StudentsService} from '../services/students-service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements OnInit, AfterViewInit {
  public payments: any[] = [];
  public dataSource: any;

  public displayedColumnsPayments = [
    "id",
    "date",
    "type",
    "status",
    "amount",
    "firstName",
    "lastName",
    "file"
  ];
  backendHost = environment.backendHost;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private http: HttpClient, private  studentsService: StudentsService,private router: Router) {
  }

  ngOnInit(): void {

    this.studentsService.getALLPayments()
      .subscribe({
        next: (data: any) => {
          this.payments = data;
          this.dataSource = new MatTableDataSource(this.payments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.error("Error fetching payments:", err);
        }
      });
  }

/*
    1ere version pour générer des noms aléatoires pour les étudiants, mais on va plutôt les récupérer depuis le backend
    function randomName(length: number) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }



    const types = ["CASH", "CHECK", "TRANSFER"];
    const statuses = ["CREATED", "VALIDATED", "REJECTED"];

    for (let i = 1; i <= 100; i++) {
      this.payments.push({
        id: i,
        date: new Date().toISOString().split('T')[0],
        type: types[Math.floor(Math.random() * types.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        amount: Math.floor(Math.random() * 10000),
        student: {
          // firstName: randomName(5)
        }
      });
    }
*/
  viewFile(payment: any) {
    if (!payment || payment.id == null) {
      console.error('Invalid payment:', payment);
      return;
    }

    this.router.navigateByUrl(`/admin/payment-details/${payment.id}`);
  }




  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterPayments(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }


}
