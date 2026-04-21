import { Component, OnInit, OnDestroy } from '@angular/core';

import { Student, Payment } from '../model/students.model';
import { Subscription, forkJoin } from 'rxjs';
import {StudentsService} from '../services/students-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: false,

})
export class Home implements OnInit, OnDestroy {

  images: string[] = [
    'assets/images/slide1.jpg',
    'assets/images/slide2.jpg',
    'assets/images/slide3.jpg'
  ];

  currentImage = 0;

  students: Student[] = [];
  payments: Payment[] = [];

  studentsCount = 0;
  paymentsCount = 0;

  studentsCountDisplay = 0;
  paymentsCountDisplay = 0;

  isLoading = false;
  errorMessage = '';

  private dataSubscription?: Subscription;
  private sliderInterval?: ReturnType<typeof setInterval>;
  private studentsCounterInterval?: ReturnType<typeof setInterval>;
  private paymentsCounterInterval?: ReturnType<typeof setInterval>;

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }

    if (this.studentsCounterInterval) {
      clearInterval(this.studentsCounterInterval);
    }

    if (this.paymentsCounterInterval) {
      clearInterval(this.paymentsCounterInterval);
    }
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dataSubscription = forkJoin({
      students: this.studentsService.getALLStudents(),
      payments: this.studentsService.getALLPayments()
    }).subscribe({
      next: (result) => {
        this.students = result.students;
        this.payments = result.payments;

        this.studentsCount = this.students.length;
        this.paymentsCount = this.payments.length;

        this.animateCounter(this.studentsCount, 'students');
        this.animateCounter(this.paymentsCount, 'payments');

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load dashboard data', error);
        this.errorMessage = 'Failed to load dashboard data.';
        this.isLoading = false;
      }
    });
  }

  nextImage(): void {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
  }

  goToImage(index: number): void {
    this.currentImage = index;
  }

  startAutoSlide(): void {
    this.sliderInterval = setInterval(() => {
      this.nextImage();
    }, 4000);
  }

  animateCounter(target: number, type: 'students' | 'payments'): void {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 25));

    if (type === 'students' && this.studentsCounterInterval) {
      clearInterval(this.studentsCounterInterval);
    }

    if (type === 'payments' && this.paymentsCounterInterval) {
      clearInterval(this.paymentsCounterInterval);
    }

    const interval = setInterval(() => {
      current += step;

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      if (type === 'students') {
        this.studentsCountDisplay = current;
      } else {
        this.paymentsCountDisplay = current;
      }
    }, 40);

    if (type === 'students') {
      this.studentsCounterInterval = interval;
    } else {
      this.paymentsCounterInterval = interval;
    }
  }
}
