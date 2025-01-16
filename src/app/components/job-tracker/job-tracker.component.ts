import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { JobApplication, ApplicationStatus } from '../../models/job-application';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-job-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './job-tracker.component.html',
  styleUrls: ['./job-tracker.component.css']
})
export class JobTrackerComponent implements OnInit {
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

  constructor(
    private jobService: JobService,
    private fb: FormBuilder
  ) {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      status: [ApplicationStatus.PENDING, Validators.required],
      job_url: ['', Validators.required],
      cv: [null],
      cover_letter: [null]
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      status: [ApplicationStatus.PENDING, Validators.required],
      job_url: ['', Validators.required],
      cv: [null],
      cover_letter: [null]
    });
  }

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.jobService.getApplications().subscribe(
      data => {this.applications = data;
        console.log(this.applications);
  });
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      const formData = new FormData();
      const formValue = this.applicationForm.value;
      
      formData.append('name', formValue.name);
      formData.append('status', formValue.status);
      formData.append('job_url', formValue.job_url);
      
      if (formValue.cv) {
        formData.append('cv', formValue.cv);
      }
      if (formValue.cover_letter) {
        formData.append('cover_letter', formValue.cover_letter);
      }

      this.jobService.addApplication(formData).subscribe(
        () => {
          this.loadApplications();
          this.applicationForm.reset();
          this.clearFileInputs();
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
      this.applicationForm.patchValue({
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
      
      if (formValue.cv) {
        formData.append('cv', formValue.cv);
      }
      if (formValue.cover_letter) {
        formData.append('cover_letter', formValue.cover_letter);
      }

      this.jobService.updateApplication(this.editingApplication.id, formData).subscribe(
        () => {
          this.loadApplications();
          this.closeEditModal();
        }
      );
    }
  }


  deleteApplication(id: number | undefined) {
    if (id === undefined) return;
    
    if (confirm('Are you sure you want to delete this application?')) {
      this.jobService.deleteApplication(id).subscribe(
        () => {
          this.loadApplications();
        }
      );
    }
  }

}