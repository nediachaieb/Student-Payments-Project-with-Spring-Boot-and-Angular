import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../services/students-service';
import * as pdfjsLib from 'pdfjs-dist';

(pdfjsLib as any).GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.css',
})
export class PaymentDetails implements OnInit, OnDestroy {
  paymentId!: number;
  pdfFileUrl: string | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private studentsService: StudentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.params['id']);
    console.log('Payment ID:', this.paymentId);

    this.studentsService.getPaymentDetails(this.paymentId).subscribe({
      next: (blob: Blob) => {
        console.log('Blob reçu', blob);

        if (blob.size === 0) {
          this.errorMessage = 'Le fichier PDF est vide.';
          this.loading = false;
          return;
        }

        this.pdfFileUrl = URL.createObjectURL(blob);
        console.log('URL du PDF', this.pdfFileUrl);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement PDF', err);
        this.errorMessage = 'Erreur lors du chargement du PDF.';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.pdfFileUrl) {
      URL.revokeObjectURL(this.pdfFileUrl);
    }
  }
}
