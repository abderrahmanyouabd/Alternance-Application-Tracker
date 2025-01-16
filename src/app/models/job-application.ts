export interface JobApplication {
  id: number;
  name: string;
  status: ApplicationStatus;
  job_url: string;
  cv?: string;
  cover_letter?: string;
}

export enum ApplicationStatus {
  APPLIED = 'Applied',
  INTERVIEW = 'Interview',
  REJECTED = 'Rejected',
  ACCEPTED = 'Accepted',
  PENDING = 'Pending'
}