import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StudentsService } from '../services/students-service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-student',
  standalone: false,
  templateUrl: './new-student.html',
  styleUrls: ['./new-student.css'],
})
export class NewStudent implements OnInit, OnDestroy {
  studentFormGroup!: FormGroup;

  photoFileUrl: SafeResourceUrl | null = null;
  private rawPhotoUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentFormGroup = this.fb.group({
      code: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      programId: ['', Validators.required],
      photoName: [''],
      photoSource: [null],
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

  saveStudent(): void {
    if (this.studentFormGroup.invalid) {
      this.studentFormGroup.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.set('code', this.studentFormGroup.value.code);
    formData.set('firstName', this.studentFormGroup.value.firstName);
    formData.set('lastName', this.studentFormGroup.value.lastName);
    formData.set('programId', this.studentFormGroup.value.programId);

    if (this.studentFormGroup.value.photoSource) {
      formData.set('photo', this.studentFormGroup.value.photoSource);
    }

    this.studentsService.saveStudent(formData).subscribe({
      next: () => {
        alert('Student saved successfully');
        this.router.navigateByUrl('/admin/students');
      },
      error: (err) => {
        console.error('Error saving student:', err);
        alert('Error saving student');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.rawPhotoUrl) {
      URL.revokeObjectURL(this.rawPhotoUrl);
    }
  }
}
