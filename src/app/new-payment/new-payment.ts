import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaymentType } from '../model/students.model';
import { StudentsService } from '../services/students-service';

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.html',
  styleUrls: ['./new-payment.css'],
})
export class NewPayment implements OnInit, OnDestroy {
  paymentFormGroup!: FormGroup;
  studentCode!: string;
  paymentTypes: string[] = [];

  pdfFileUrl: SafeResourceUrl | null = null;
  private rawPdfUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.paymentTypes = Object.values(PaymentType);
    this.studentCode = this.activatedRoute.snapshot.params['studentCode'];

    this.paymentFormGroup = this.fb.group({
      date: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      type: ['', Validators.required],
      studentCode: [this.studentCode, Validators.required],
      fileName: [''],
      fileSource: [null, Validators.required],
    });
  }

  selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.paymentFormGroup.patchValue({
      fileSource: file,
      fileName: file.name,
    });

    if (this.rawPdfUrl) {
      URL.revokeObjectURL(this.rawPdfUrl);
    }

    this.rawPdfUrl = URL.createObjectURL(file);
    this.pdfFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawPdfUrl);
  }

  savePayment(): void {
    if (this.paymentFormGroup.invalid) {
      this.paymentFormGroup.markAllAsTouched();
      return;
    }

    const rawDate = this.paymentFormGroup.value.date;
    const date = new Date(rawDate);

    const formattedDate =
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear();

    const formData = new FormData();
    formData.set('date', formattedDate);
    formData.set('amount', String(this.paymentFormGroup.value.amount));
    formData.set('type', this.paymentFormGroup.value.type);
    formData.set('studentCode', this.paymentFormGroup.value.studentCode);
    formData.set('file', this.paymentFormGroup.value.fileSource);

    this.studentsService.savePayment(formData).subscribe({
      next: () => {
        alert('Payment saved successfully');
        this.router.navigateByUrl('/admin/payments');
      },
      error: (err) => {
        console.error('Error saving payment:', err);
        alert('Error saving payment');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.rawPdfUrl) {
      URL.revokeObjectURL(this.rawPdfUrl);
    }
  }
}
