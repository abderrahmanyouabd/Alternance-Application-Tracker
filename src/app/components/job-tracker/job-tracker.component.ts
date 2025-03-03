import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { JobService } from '../../services/job.service';
import { JobApplication, ApplicationStatus } from '../../models/job-application';
import { HttpClientModule } from '@angular/common/http';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-job-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './job-tracker.component.html',
  styleUrls: ['./job-tracker.component.css']
})
export class JobTrackerComponent implements OnInit {
  @Input() showOnlyForm = false;
  @Input() showOnlyList = false;
  applications: JobApplication[] = [];
  applicationForm: FormGroup;
  statuses = Object.values(ApplicationStatus);
  filterStatus: string = '';
  filterCompany: string = '';
  @ViewChild('cvInput') cvInput!: ElementRef;
  @ViewChild('coverLetterInput') coverLetterInput!: ElementRef;

  editingApplication: JobApplication | null = null;
  showEditModal: boolean = false;
  editForm: FormGroup;

  loading = false;
  showToast = false;
  toastMessage = '';
  toastClass = '';

  constructor(
    private jobService: JobService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public languageService: LanguageService
  ) {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      status: [ApplicationStatus.TO_APPLY, Validators.required],
      job_url: ['', Validators.required],
      cv: [null],
      cover_letter: [null]
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      status: [ApplicationStatus.TO_APPLY, Validators.required],
      job_url: ['', Validators.required],
      cv: [null],
      cover_letter: [null]
    });
  }

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.loading = true;
    this.jobService.getApplications().subscribe(
      data => {
        this.applications = data;
        this.loading = false;
      },
      error => {
        this.showToastMessage('Error loading applications', 'error');
        this.loading = false;
      }
    );
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      this.loading = true;
      const formData = new FormData();
      const formValue = this.applicationForm.value;
      
      formData.append('name', formValue.name);
      formData.append('status', formValue.status);
      formData.append('job_url', formValue.job_url);
      
      // Check if CV is provided
      if (formValue.cv) {
        const cvName = `cv_${Date.now()}.pdf`; // Assuming PDF format for simplicity
        formData.append('cv', formValue.cv, cvName);
      }

      // Check if cover letter is provided
      if (formValue.cover_letter) {
        const coverLetterName = `cover_letter_${Date.now()}.pdf`; // Assuming PDF format for simplicity
        formData.append('cover_letter', formValue.cover_letter, coverLetterName);
      }

      this.jobService.addApplication(formData).subscribe(
        () => {
          this.loadApplications();
          this.applicationForm.reset();
          this.clearFileInputs();
          this.showToastMessage('Application added successfully', 'success');
          this.loading = false;
        },
        error => {
          this.showToastMessage('Error adding application', 'error');
          this.loading = false;
        }
      );
    }
  }

  clearFileInputs() {
    // Reset the form control values
    this.applicationForm.patchValue({
        cv: null,
        cover_letter: null
    });
    
    // Reset the actual file input elements
    if (this.cvInput) {
      this.cvInput.nativeElement.value = '';
    }
    if (this.coverLetterInput) {
      this.coverLetterInput.nativeElement.value = '';
    }
  }

  onFileChange(event: any, type: 'cv' | 'cover_letter') {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.editForm.patchValue({
            [type]: file
        });
    }
  }

  applyFilters() {
    this.jobService.filterApplications(this.filterStatus, this.filterCompany)
      .subscribe(data => this.applications = data);
  }

  clearFilters() {
    this.filterStatus = '';
    this.filterCompany = '';
    this.loadApplications();
  }

  openEditModal(application: JobApplication) {
    this.editingApplication = application;
    this.editForm.patchValue({
      name: application.name,
      status: application.status,
      job_url: application.job_url
    });
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingApplication = null;
    this.editForm.reset();
    this.clearFileInputs();
  }

  onUpdate() {
    if (this.editForm.valid && this.editingApplication && this.editingApplication.id) {
        const formData = new FormData();
        const formValue = this.editForm.value;

        formData.append('name', formValue.name);
        formData.append('status', formValue.status);
        formData.append('job_url', formValue.job_url);

        // Check if CV is provided and update it
        if (formValue.cv) {
            const cvName = `cv_${this.editingApplication.id}_${Date.now()}.pdf`;
            formData.append('cv', formValue.cv, cvName);
        } else {
            formData.append('cv', this.editingApplication.cv!);
        }

        // Check if cover letter is provided and update it
        if (formValue.cover_letter) {
            const coverLetterName = `cover_letter_${this.editingApplication.id}_${Date.now()}.pdf`;
            formData.append('cover_letter', formValue.cover_letter, coverLetterName);
        } else {
            formData.append('cover_letter', this.editingApplication.cover_letter!);
        }

        // Log FormData contents
        console.log('Sending data to backend:');
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        this.jobService.updateApplication(this.editingApplication.id, formData).subscribe(
            () => {
                this.loadApplications();
                this.closeEditModal();
            },
            error => {
                this.showToastMessage('Error updating application', 'error');
            }
        );
    }
  }

  deleteApplication(id: number | undefined) {
    if (id === undefined) return;

    const applicationToDelete = this.applications.find(app => app.id === id);
    if (applicationToDelete && confirm('Are you sure you want to delete this application?')) {
        this.jobService.deleteApplication(id, applicationToDelete.cv!, applicationToDelete.cover_letter!).subscribe(
            () => {
                this.loadApplications();
            }
        );
    }
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastClass = `toast toast-${type}`;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  exportToExcel() {
    if (this.applications.length > 0) {
      try {
        this.jobService.exportToExcel(this.applications);
        this.showToastMessage('Applications exported successfully', 'success');
      } catch (error) {
        this.showToastMessage('Error exporting applications', 'error');
      }
    } else {
      this.showToastMessage('No applications to export', 'error');
    }
  }

  sanitizeUrl(url: string): SafeUrl {
    // If URL doesn't start with http:// or https://, add https://
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}