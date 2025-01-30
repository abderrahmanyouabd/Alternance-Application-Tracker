import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobTrackerComponent } from '../../components/job-tracker/job-tracker.component';

@Component({
  selector: 'app-applications-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, JobTrackerComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">Applications List</h1>
      <app-job-tracker [showOnlyList]="true"></app-job-tracker>
    </div>
  `
})
export class ApplicationsListComponent {} 