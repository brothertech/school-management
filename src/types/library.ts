export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  publisher: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  status: 'available' | 'borrowed' | 'maintenance';
  location: string;
  addedDate: Date;
}

export interface BookIssue {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  borrowerType: 'student' | 'teacher';
  issueDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'issued' | 'returned' | 'overdue';
  fineAmount?: number;
}

export interface CreateBookData {
  title: string;
  author: string;
  isbn: string;
  publicationYear: number;
  publisher: string;
  category: string;
  totalCopies: number;
  location: string;
}

export interface IssueBookData {
  bookId: string;
  borrowerId: string;
  borrowerType: 'student' | 'teacher';
  dueDate: Date;
}

export interface ReturnBookData {
  issueId: string;
  returnDate: Date;
  condition: 'good' | 'damaged' | 'lost';
  notes?: string;
}