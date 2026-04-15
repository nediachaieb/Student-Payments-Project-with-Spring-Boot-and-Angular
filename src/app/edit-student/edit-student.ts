import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../services/students-service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit-student',
  standalone: false,
  templateUrl: './edit-student.html',
  styleUrls: ['./edit-student.css'],
})
export class EditStudent implements OnInit, OnDestroy {
  studentFormGroup!: FormGroup;
  studentCode!: string;
  studentId!: number;

  photoFileUrl: SafeResourceUrl | string | null = null;
  private rawPhotoUrl: string | null = null;
  backendHost = environment.backendHost;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentCode = this.activatedRoute.snapshot.params['code'];

    this.studentFormGroup = this.fb.group({
      code: [{ value: '', disabled: true }, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      programId: ['', Validators.required],
      photoName: [''],
      photoSource: [null],
    });

    this.loadStudent();
  }

  loadStudent(): void {
    this.studentsService.getStudentByCode(this.studentCode).subscribe({
      next: (student: any) => {
        this.studentId = student.id;

        this.studentFormGroup.patchValue({
          code: student.code,
          firstName: student.firstName,
          lastName: student.lastName,
          programId: student.programId,
          photoName: '',
          photoSource: null,
        });

        this.photoFileUrl = `${this.backendHost}/students/${student.id}/photo`;
      },
      error: (err) => {
        console.error('Error loading student:', err);
        alert('Error loading student');
      },
    });
  }

  selectPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.studentFormGroup.patchValue({
      photoSource: file,
      photoName: file.name,
    });

    if (this.rawPhotoUrl) {
      URL.revokeObjectURL(this.rawPhotoUrl);
    }

    this.rawPhotoUrl = URL.createObjectURL(file);
    this.photoFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawPhotoUrl);
  }

  updateStudent(): void {
    if (this.studentFormGroup.invalid) {
      this.studentFormGroup.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.set('firstName', this.studentFormGroup.value.firstName);
    formData.set('lastName', this.studentFormGroup.value.lastName);
    formData.set('programId', this.studentFormGroup.value.programId);

    if (this.studentFormGroup.value.photoSource) {
      formData.set('photo', this.studentFormGroup.value.photoSource);
    }

    this.studentsService.updateStudent(this.studentCode, formData).subscribe({
      next: () => {
        alert('Student updated successfully');
        this.router.navigateByUrl('/admin/students');
      },
      error: (err) => {
        console.error('Error updating student:', err);
        alert('Error updating student');
      },
    });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/default-avatar.png';
  }

  ngOnDestroy(): void {
    if (this.rawPhotoUrl) {
      URL.revokeObjectURL(this.rawPhotoUrl);
    }
  }
}
