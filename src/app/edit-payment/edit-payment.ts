import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaymentType } from '../model/students.model';
import { StudentsService } from '../services/students-service';

@Component({
  selector: 'app-edit-payment',
  standalone: false,
  templateUrl: './edit-payment.html',
  styleUrl: './edit-payment.css',
})

export class EditPayment implements OnInit, OnDestroy {
  paymentFormGroup!: FormGroup;
  paymentId!: number;
  paymentTypes: string[] = [];

  pdfFileUrl: SafeResourceUrl | null = null;
  private rawPdfUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paymentTypes = Object.values(PaymentType);
    this.paymentId = Number(this.activatedRoute.snapshot.params['id']);

    this.paymentFormGroup = this.fb.group({
      date: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      type: ['', Validators.required],
      studentCode: ['', Validators.required],
      fileName: [''],
      fileSource: [null],
    });

    this.loadPayment();
  }

  loadPayment(): void {
    this.studentsService.getPaymentById(this.paymentId).subscribe({
      next: (payment: any) => {
        this.paymentFormGroup.patchValue({
          date: payment.date,
          amount: payment.amount,
          type: payment.type,
          studentCode: payment.student?.code,
          fileName: '',
          fileSource: null,
        });
      },
      error: (err) => {
        console.error('Error loading payment:', err);
        alert('Error loading payment');
      }
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

  updatePayment(): void {
    if (this.paymentFormGroup.invalid) {
      this.paymentFormGroup.markAllAsTouched();
      return;
    }

    const rawDate = this.paymentFormGroup.value.date;
    const date = new Date(rawDate);

    const formattedDate =
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0');

    const formData = new FormData();
    formData.set('date', formattedDate);
    formData.set('amount', String(this.paymentFormGroup.value.amount));
    formData.set('type', this.paymentFormGroup.value.type);
    formData.set('studentCode', this.paymentFormGroup.value.studentCode);

    if (this.paymentFormGroup.value.fileSource) {
      formData.set('file', this.paymentFormGroup.value.fileSource);
    }

    this.studentsService.updatePayment(this.paymentId, formData).subscribe({
      next: () => {
        alert('Payment updated successfully');
        this.router.navigateByUrl('/admin/payments');
      },
      error: (err) => {
        console.error('Error updating payment:', err);
        alert('Error updating payment');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.rawPdfUrl) {
      URL.revokeObjectURL(this.rawPdfUrl);
    }
  }
}
