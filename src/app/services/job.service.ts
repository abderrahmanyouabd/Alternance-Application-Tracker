import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../models/job-application';

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

  deleteApplication(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/applications/${id}`);
  }
}
