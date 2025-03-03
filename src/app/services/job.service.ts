import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../models/job-application';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:5000/api'; // Flask backend URL

  constructor(private http: HttpClient) {}

  getApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.apiUrl}/applications`);
  }

  addApplication(application: FormData): Observable<JobApplication> {
    return this.http.post<JobApplication>(`${this.apiUrl}/applications`, application);
  }

  filterApplications(status?: string, companyName?: string): Observable<JobApplication[]> {
    let url = `${this.apiUrl}/applications/filter?`;
    if (status) url += `status=${status}&`;
    if (companyName) url += `name=${companyName}`;
    return this.http.get<JobApplication[]>(url);
  }

  downloadCV(applicationId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/applications/${applicationId}/cv`, {
      responseType: 'blob',
    });
  }

  downloadCoverLetter(applicationId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/applications/${applicationId}/cover_letter`, {
      responseType: 'blob',
    });
  }

  updateApplication(id: number, application: FormData): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.apiUrl}/applications/${id}`, application);
  }

  deleteApplication(id: number, cvPath: string, coverLetterPath: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/applications/${id}`, {
        body: { cv: cvPath, cover_letter: coverLetterPath } // Send the paths in the request body
    });
  }

  exportToExcel(applications: JobApplication[]) {
    // Prepare data for export
    const exportData = applications.map(app => ({
      'Company Name': app.name,
      'Status': app.status,
      'Job URL': app.job_url,
      'CV': app.cv ? 'Uploaded' : 'Not uploaded',
      'Cover Letter': app.cover_letter ? 'Uploaded' : 'Not uploaded',
      'Application Date': new Date().toLocaleDateString() // You might want to add a date field to your model
    }));

    // Create worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Applications');

    // Save file
    const fileName = `job_applications_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }
}
