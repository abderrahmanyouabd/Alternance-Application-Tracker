import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { JobTrackerComponent } from './app/components/job-tracker/job-tracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JobTrackerComponent],
  template: '<app-job-tracker></app-job-tracker>'
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});