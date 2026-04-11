import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StudentsService } from '../services/students-service';

@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.html',
  styleUrls: ['./payment-details.css'],
})
export class PaymentDetails implements OnInit, OnDestroy {
  paymentId!: number;

  pdfBlobUrl: SafeResourceUrl | null = null;
  private objectUrl: string | null = null;

  loading = true;
  errorMessage = '';

  constructor(
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.params['id']);

    this.studentsService.getPaymentDetails(this.paymentId).subscribe({
      next: (blob: Blob) => {
        console.log('Taille du PDF :', blob.size);

        if (!blob || blob.size === 0) {
          this.errorMessage = 'Le fichier PDF est vide ou invalide.';
          this.loading = false;
          this.cdr.detectChanges();
          return;
        }

        if (this.objectUrl) {
          URL.revokeObjectURL(this.objectUrl);
        }

        this.objectUrl = URL.createObjectURL(blob);
        this.pdfBlobUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);

        this.loading = false;
        this.errorMessage = '';

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur PDF :', err);
        this.errorMessage = 'Impossible de charger le fichier PDF.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }

  openInNewTab(): void {
    if (this.objectUrl) {
      window.open(this.objectUrl, '_blank');
    }
  }
}
