export interface JobOpening {
  id: string;
  jobTitle: string;
  department: string;
  hiringManager: string;
  numberOfPositions: number;
  jobType: 'Full-time' | 'Part-time' | 'Contract';
  salaryRange?: string;
  jobDescription?: string;
  requiredQualifications?: string;
  skills?: string[];
  experienceLevel: 'Entry-level' | 'Mid-level' | 'Senior' | 'Executive';
  postingType: 'Internal' | 'External' | 'Both';
  status: 'Open' | 'Closed' | 'Pending Approval';
  datePosted: string;
}

export interface JobOpeningFormData {
  jobTitle: string;
  department: string;
  hiringManager: string;
  numberOfPositions: number;
  jobType: 'Full-time' | 'Part-time' | 'Contract';
  salaryRange?: string;
  jobDescription?: string;
  requiredQualifications?: string;
  skills?: string[];
  experienceLevel: 'Entry-level' | 'Mid-level' | 'Senior' | 'Executive';
  postingType: 'Internal' | 'External' | 'Both';
  status: 'Open' | 'Closed' | 'Pending Approval';
}

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  jobOpeningId: string;
  jobTitle: string;
  applicationDate: string;
  status: 'New' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected';
  cvFile?: {
    name: string;
    type: string;
    url?: string;
  };
  additionalFiles?: Array<{
    name: string;
    type: string;
    url?: string;
  }>;
  coverLetter?: string;
  whyGoodFit?: string;
  notes?: CandidateNote[];
}

export interface CandidateNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  type?: 'comment' | 'status_change' | 'interview_note';
}

export interface CandidateFilters {
  jobOpeningId?: string;
  status?: Candidate['status'];
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  jobTitle: string;
  interviewDate: string;
  interviewType: 'Phone' | 'Video' | 'In-Person';
  interviewers: string[];
  notes?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';
  createdAt: string;
  updatedAt: string;
}

export interface InterviewFormData {
  candidateId: string;
  interviewDate: string;
  interviewType: 'Phone' | 'Video' | 'In-Person';
  interviewers: string[];
  notes?: string;
}

export interface InterviewFilters {
  candidateId?: string;
  interviewType?: Interview['interviewType'];
  status?: Interview['status'];
  startDate?: string;
  endDate?: string;
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  candidateId: string;
  interviewer: string;
  rating: number;
  comments: string;
  recommendation: 'Pass' | 'Fail' | 'Next Round';
  createdAt: string;
  updatedAt: string;
}

export interface InterviewFeedbackFormData {
  interviewId: string;
  rating: number;
  comments: string;
  recommendation: 'Pass' | 'Fail' | 'Next Round';
}

export interface FinalDecision {
  candidateId: string;
  decision: 'Offer' | 'Rejected' | 'Pending';
  notes?: string;
  decidedBy: string;
  decidedAt: string;
}

export interface JobOffer {
  id: string;
  candidateId: string;
  candidateName: string;
  positionTitle: string;
  salary: string;
  benefits: string;
  startDate: string;
  notes: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Withdrawn';
  sentAt?: string;
  respondedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobOfferFormData {
  positionTitle: string;
  salary: string;
  benefits: string;
  startDate: string;
  notes: string;
}