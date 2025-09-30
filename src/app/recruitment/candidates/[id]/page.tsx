'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Candidate, CandidateNote, Interview, InterviewFormData, InterviewFeedback, InterviewFeedbackFormData, FinalDecision, JobOffer, JobOfferFormData } from '../../job-openings/types';
import InterviewModal from '../../job-openings/components/InterviewModal';
import FeedbackModal from '../../job-openings/components/FeedbackModal';
import OfferModal from '../../job-openings/components/OfferModal';

// Mock data for candidate
const mockCandidate: Candidate = {
  id: '1',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  jobOpeningId: '1',
  jobTitle: 'Senior Frontend Developer',
  applicationDate: '2024-01-15',
  status: 'New',
  cvFile: { 
    name: 'john_doe_cv.pdf', 
    type: 'application/pdf',
    url: '/sample-cv.pdf'
  },
  additionalFiles: [
    { 
      name: 'portfolio.pdf', 
      type: 'application/pdf',
      url: '/sample-portfolio.pdf'
    },
    { 
      name: 'references.docx', 
      type: 'application/docx',
      url: '/sample-references.docx'
    }
  ],
  coverLetter: 'Experienced frontend developer with 5+ years in React and TypeScript. Strong background in building scalable web applications and leading development teams. Passionate about clean code and user experience.',
  whyGoodFit: 'I have extensive experience with modern frontend frameworks and a strong portfolio of successful projects. My skills align perfectly with your requirements, and I am excited about the opportunity to contribute to your innovative team.',
  notes: [
    {
      id: '1',
      author: 'HR Manager',
      content: 'Strong technical background. Good communication skills during initial screening.',
      createdAt: '2024-01-16T10:30:00',
      type: 'comment'
    },
    {
      id: '2',
      author: 'Tech Lead',
      content: 'Impressive portfolio. Recommended for technical interview.',
      createdAt: '2024-01-16T14:15:00',
      type: 'comment'
    }
  ]
};

const statusOptions: Candidate['status'][] = ['New', 'Shortlisted', 'Interview', 'Offer', 'Rejected'];

export default function CandidateProfilePage() {
  const params = useParams();
  const candidateId = params.id as string;
  
  const [candidate, setCandidate] = useState<Candidate>(mockCandidate);
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [feedbacks, setFeedbacks] = useState<InterviewFeedback[]>([]);
  const [finalDecision, setFinalDecision] = useState<FinalDecision | null>(null);
  const [selectedInterviewForFeedback, setSelectedInterviewForFeedback] = useState<Interview | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);

  const handleStatusChange = (newStatus: Candidate['status']) => {
    setCandidate(prev => ({
      ...prev,
      status: newStatus
    }));
    
    // Add status change note
    const statusNote: CandidateNote = {
      id: Date.now().toString(),
      author: 'HR Manager', // In real app, this would be the current user
      content: `Status changed to ${newStatus}`,
      createdAt: new Date().toISOString(),
      type: 'status_change'
    };
    
    setCandidate(prev => ({
      ...prev,
      notes: [...(prev.notes || []), statusNote]
    }));
  };

  const handleScheduleInterview = (interviewData: InterviewFormData) => {
    const newInterview: Interview = {
      id: Date.now().toString(),
      candidateId: candidate.id,
      candidateName: candidate.fullName,
      jobTitle: candidate.jobTitle,
      interviewDate: interviewData.interviewDate,
      interviewType: interviewData.interviewType,
      interviewers: interviewData.interviewers,
      notes: interviewData.notes,
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setInterviews(prev => [...prev, newInterview]);

    // Add interview note
    const interviewNote: CandidateNote = {
      id: Date.now().toString(),
      author: 'HR Manager',
      content: `Interview scheduled: ${new Date(interviewData.interviewDate).toLocaleString()} (${interviewData.interviewType})`,
      createdAt: new Date().toISOString(),
      type: 'interview_note'
    };

    setCandidate(prev => ({
      ...prev,
      notes: [...(prev.notes || []), interviewNote]
    }));

    // Update candidate status to Interview if not already
    if (candidate.status !== 'Interview') {
      handleStatusChange('Interview');
    }
  };

  const getUpcomingInterviews = () => {
    const now = new Date();
    return interviews
      .filter(interview => new Date(interview.interviewDate) > now)
      .sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime());
  };

  const getPastInterviews = () => {
    const now = new Date();
    return interviews
      .filter(interview => new Date(interview.interviewDate) <= now)
      .sort((a, b) => new Date(b.interviewDate).getTime() - new Date(a.interviewDate).getTime());
  };

  const handleSubmitFeedback = (feedbackData: InterviewFeedbackFormData) => {
    const newFeedback: InterviewFeedback = {
      id: Date.now().toString(),
      interviewId: feedbackData.interviewId,
      candidateId: candidate.id,
      interviewer: 'Current User', // In real app, this would be the logged-in user
      rating: feedbackData.rating,
      comments: feedbackData.comments,
      recommendation: feedbackData.recommendation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setFeedbacks(prev => [...prev, newFeedback]);

    // Add feedback note
    const feedbackNote: CandidateNote = {
      id: Date.now().toString(),
      author: 'Current User',
      content: `Interview feedback submitted: Rating ${feedbackData.rating}/5 - ${feedbackData.recommendation}`,
      createdAt: new Date().toISOString(),
      type: 'feedback'
    };

    setCandidate(prev => ({
      ...prev,
      notes: [...(prev.notes || []), feedbackNote]
    }));
  };

  const handleMakeFinalDecision = (decision: FinalDecision['decision'], notes?: string) => {
    const newDecision: FinalDecision = {
      candidateId: candidate.id,
      decision,
      notes,
      decidedBy: 'HR Manager', // In real app, this would be the logged-in user
      decidedAt: new Date().toISOString()
    };

    setFinalDecision(newDecision);

    // Update candidate status based on decision
    if (decision === 'Offer') {
      handleStatusChange('Offer');
    } else if (decision === 'Rejected') {
      handleStatusChange('Rejected');
    }

    // Add decision note
    const decisionNote: CandidateNote = {
      id: Date.now().toString(),
      author: 'HR Manager',
      content: `Final decision: ${decision}${notes ? ` - ${notes}` : ''}`,
      createdAt: new Date().toISOString(),
      type: 'decision'
    };

    setCandidate(prev => ({
      ...prev,
      notes: [...(prev.notes || []), decisionNote]
    }));
  };

  const getFeedbackForInterview = (interviewId: string) => {
    return feedbacks.find(feedback => feedback.interviewId === interviewId);
  };

  const handleGenerateOffer = (offerData: JobOfferFormData) => {
    const newOffer: JobOffer = {
      id: Date.now().toString(),
      candidateId: candidate.id,
      candidateName: candidate.fullName,
      positionTitle: offerData.positionTitle,
      salary: offerData.salary,
      benefits: offerData.benefits,
      startDate: offerData.startDate,
      notes: offerData.notes,
      status: 'Draft',
      createdBy: 'HR Manager', // In real app, this would be the logged-in user
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setJobOffers(prev => [...prev, newOffer]);

    // Add offer note
    const offerNote: CandidateNote = {
      id: Date.now().toString(),
      author: 'HR Manager',
      content: `Offer generated for position: ${offerData.positionTitle} with salary ${offerData.salary}`,
      createdAt: new Date().toISOString(),
      type: 'offer'
    };

    setCandidate(prev => ({
      ...prev,
      notes: [...(prev.notes || []), offerNote]
    }));

    // Update candidate status to Offer
    handleStatusChange('Offer');
  };

  const handleSendOffer = (offerId: string) => {
    setJobOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, status: 'Sent', sentAt: new Date().toISOString() }
        : offer
    ));

    // Add offer sent note
    const sentNote: CandidateNote = {
      id: Date.now().toString(),
      author: 'HR Manager',
      content: 'Offer sent to candidate',
      createdAt: new Date().toISOString(),
      type: 'offer'
    };

    setCandidate(prev => ({
      ...prev,
      notes: [...(prev.notes || []), sentNote]
    }));
  };

  const getActiveOffer = () => {
    return jobOffers.find(offer => offer.status === 'Sent' || offer.status === 'Draft');
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: CandidateNote = {
        id: Date.now().toString(),
        author: 'HR Manager', // In real app, this would be the current user
        content: newNote,
        createdAt: new Date().toISOString(),
        type: 'comment'
      };
      
      setCandidate(prev => ({
        ...prev,
        notes: [...(prev.notes || []), note]
      }));
      
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const getStatusColor = (status: Candidate['status']) => {
    const colors = {
      New: 'bg-blue-100 text-blue-800',
      Shortlisted: 'bg-purple-100 text-purple-800',
      Interview: 'bg-yellow-100 text-yellow-800',
      Offer: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800'
    };
    return colors[status];
  };

  const downloadFile = (fileName: string, url?: string) => {
    if (url) {
      // In real app, this would download the actual file
      window.open(url, '_blank');
    } else {
      // Mock download
      alert(`Downloading ${fileName}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link
            href="/recruitment/candidates"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-2"
          >
            ← Back to Candidates
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Candidate Profile</h1>
        </div>
        
        {/* Status Badge and Actions */}
        <div className="flex items-center gap-4">
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
            {candidate.status}
          </span>
          <button
            onClick={() => setIsInterviewModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Schedule Interview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-bold">
                  {candidate.fullName.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{candidate.fullName}</h2>
              <p className="text-gray-600">{candidate.jobTitle}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <p className="text-gray-900">{candidate.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                <p className="text-gray-900">{candidate.phone}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Application Date</h3>
                <p className="text-gray-900">
                  {new Date(candidate.applicationDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Status Management */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Update Status</h3>
              <div className="space-y-2">
                {statusOptions.map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={candidate.status === status}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      candidate.status === status
                        ? 'bg-blue-100 text-blue-800 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Move to {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Files Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
            
            <div className="space-y-3">
              {/* CV/Resume */}
              {candidate.cvFile && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm font-medium">CV</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{candidate.cvFile.name}</p>
                      <p className="text-xs text-gray-500">{candidate.cvFile.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadFile(candidate.cvFile!.name, candidate.cvFile!.url)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Download
                  </button>
                </div>
              )}

              {/* Additional Files */}
              {candidate.additionalFiles?.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm font-medium">Doc</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadFile(file.name, file.url)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Application Details */}
        <div className="lg:col-span-2">
          {/* Cover Letter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{candidate.coverLetter}</p>
            </div>
          </div>

          {/* Why Good Fit */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Why I'm a Good Fit</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{candidate.whyGoodFit}</p>
            </div>
          </div>

          {/* Upcoming Interviews Section */}
          {getUpcomingInterviews().length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h3>
              <div className="space-y-3">
                {getUpcomingInterviews().map((interview) => (
                  <div key={interview.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-blue-900">
                        {new Date(interview.interviewDate).toLocaleDateString()} at {' '}
                        {new Date(interview.interviewDate).toLocaleTimeString()}
                      </span>
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {interview.interviewType}
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      <strong>Interviewers:</strong> {interview.interviewers.join(', ')}
                    </p>
                    {interview.notes && (
                      <p className="text-sm text-blue-600">
                        <strong>Notes:</strong> {interview.notes}
                      </p>
                    )}
                    <div className="mt-2 pt-2 border-t border-blue-200">
                      <span className="text-xs text-blue-500">
                        Scheduled on {new Date(interview.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Interviews with Feedback Section */}
          {getPastInterviews().length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Interviews & Feedback</h3>
              <div className="space-y-4">
                {getPastInterviews().map((interview) => {
                  const feedback = getFeedbackForInterview(interview.id);
                  return (
                    <div key={interview.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {new Date(interview.interviewDate).toLocaleDateString()} at {' '}
                            {new Date(interview.interviewDate).toLocaleTimeString()}
                          </span>
                          <span className="inline-flex ml-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            {interview.interviewType}
                          </span>
                        </div>
                        {!feedback && (
                          <button
                            onClick={() => {
                              setSelectedInterviewForFeedback(interview);
                              setIsFeedbackModalOpen(true);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Add Feedback
                          </button>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Interviewers:</strong> {interview.interviewers.join(', ')}
                      </p>
                      
                      {interview.notes && (
                        <p className="text-sm text-gray-600 mb-3">
                          <strong>Notes:</strong> {interview.notes}
                        </p>
                      )}

                      {feedback && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Feedback</h4>
                          <div className="flex items-center mb-2">
                            <span className="text-sm text-gray-700 mr-3">Rating:</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className={`w-5 h-5 text-sm ${
                                    star <= feedback.rating
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="ml-2 text-sm text-gray-600">({feedback.rating}/5)</span>
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <span className="text-sm text-gray-700 mr-3">Recommendation:</span>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              feedback.recommendation === 'Pass'
                                ? 'bg-green-100 text-green-800'
                                : feedback.recommendation === 'Next Round'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {feedback.recommendation}
                            </span>
                          </div>
                          
                          {feedback.comments && (
                            <div className="mb-2">
                              <span className="text-sm text-gray-700 block mb-1">Comments:</span>
                              <p className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-200">
                                {feedback.comments}
                              </p>
                            </div>
                          )}
                          
                          <div className="text-xs text-gray-500">
                            Submitted by {feedback.interviewer} on {new Date(feedback.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Final Decision Section (HR/Admin Only) */}
          {getPastInterviews().length > 0 && !finalDecision && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Final Decision</h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Based on the interview feedback, make a final decision for this candidate.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleMakeFinalDecision('Offer')}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Make Offer
                  </button>
                  
                  <button
                    onClick={() => handleMakeFinalDecision('Next Round')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Schedule Next Round
                  </button>
                  
                  <button
                    onClick={() => handleMakeFinalDecision('Rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Reject Candidate
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Final Decision Display */}
          {finalDecision && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Final Decision</h3>
              <div className={`p-4 rounded-lg ${
                finalDecision.decision === 'Offer'
                  ? 'bg-green-100 border border-green-200'
                  : finalDecision.decision === 'Rejected'
                  ? 'bg-red-100 border border-red-200'
                  : 'bg-yellow-100 border border-yellow-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-lg font-semibold ${
                    finalDecision.decision === 'Offer'
                      ? 'text-green-800'
                      : finalDecision.decision === 'Rejected'
                      ? 'text-red-800'
                      : 'text-yellow-800'
                  }`}>
                    {finalDecision.decision}
                  </span>
                  <span className="text-sm text-gray-600">
                    Decided by {finalDecision.decidedBy}
                  </span>
                </div>
                
                {finalDecision.notes && (
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Notes:</strong> {finalDecision.notes}
                  </p>
                )}
                
                <p className="text-xs text-gray-500 mt-2">
                  Decision made on {new Date(finalDecision.decidedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {/* Offer Management Section */}
          {finalDecision?.decision === 'Offer' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Offer Management</h3>
              
              {!getActiveOffer() ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    This candidate has been selected for an offer. Generate an offer letter to proceed.
                  </p>
                  <button
                    onClick={() => setIsOfferModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Generate Offer
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Active Offer</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Position:</span>
                        <p className="font-medium">{getActiveOffer()?.positionTitle}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Salary:</span>
                        <p className="font-medium">{getActiveOffer()?.salary}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Start Date:</span>
                        <p className="font-medium">
                          {getActiveOffer()?.startDate ? new Date(getActiveOffer()!.startDate).toLocaleDateString() : 'Not set'}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getActiveOffer()?.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                          getActiveOffer()?.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                          getActiveOffer()?.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                          getActiveOffer()?.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getActiveOffer()?.status}
                        </span>
                      </div>
                    </div>
                    
                    {getActiveOffer()?.benefits && (
                      <div className="mt-3">
                        <span className="text-gray-600 block mb-1">Benefits:</span>
                        <p className="text-sm">{getActiveOffer()?.benefits}</p>
                      </div>
                    )}
                    
                    {getActiveOffer()?.notes && (
                      <div className="mt-3">
                        <span className="text-gray-600 block mb-1">Notes:</span>
                        <p className="text-sm">{getActiveOffer()?.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {getActiveOffer()?.status === 'Draft' && (
                      <button
                        onClick={() => handleSendOffer(getActiveOffer()!.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Send Offer to Candidate
                      </button>
                    )}
                    
                    {getActiveOffer()?.status === 'Sent' && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          Offer sent on {getActiveOffer()?.sentAt ? new Date(getActiveOffer()!.sentAt!).toLocaleDateString() : 'N/A'}
                        </p>
                        <div className="flex gap-2">
                          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Mark as Accepted
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Mark as Rejected
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notes Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Notes & Comments</h3>
              <button
                onClick={() => setIsAddingNote(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Note
              </button>
            </div>

            {/* Add Note Form */}
            {isAddingNote && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add your notes or comments..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddNote}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Save Note
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingNote(false);
                      setNewNote('');
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Notes List */}
            <div className="space-y-4">
              {candidate.notes?.map((note) => (
                <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-900">{note.author}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.content}</p>
                  {note.type && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded-full">
                      {note.type.replace('_', ' ')}
                    </span>
                  )}
                </div>
              ))}

              {(!candidate.notes || candidate.notes.length === 0) && !isAddingNote && (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No notes yet. Add the first note to track this candidate's progress.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interview Modal */}
      <InterviewModal
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
        onSubmit={handleScheduleInterview}
        candidateName={candidate.fullName}
        candidateId={candidate.id}
        jobTitle={candidate.jobTitle}
      />

      {/* Feedback Modal */}
      {selectedInterviewForFeedback && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => {
            setIsFeedbackModalOpen(false);
            setSelectedInterviewForFeedback(null);
          }}
          onSubmit={handleSubmitFeedback}
          candidateName={candidate.fullName}
          interviewDate={selectedInterviewForFeedback.interviewDate}
          interviewType={selectedInterviewForFeedback.interviewType}
          interviewId={selectedInterviewForFeedback.id}
          currentUser="Current User"
        />
      )}

      {/* Offer Modal */}
      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        onSubmit={handleGenerateOffer}
        candidateName={candidate.fullName}
        candidateId={candidate.id}
        currentUser="HR Manager"
      />
    </div>
  );
}