'use client';

import { useState } from 'react';
import Button from '@/components/ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { X, BookOpen, Calendar, User } from 'lucide-react';
import { Book, BookIssue, IssueBookData, ReturnBookData } from '@/types/library';

interface IssueReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book;
  action: 'issue' | 'return';
  onIssue?: (data: IssueBookData) => void;
  onReturn?: (data: ReturnBookData) => void;
}

// Mock data for active issues
const mockActiveIssues: BookIssue[] = [
  {
    id: '1',
    bookId: '2',
    bookTitle: 'Advanced JavaScript',
    borrowerId: 'STU001',
    borrowerName: 'John Student',
    borrowerType: 'student',
    issueDate: new Date('2024-01-20'),
    dueDate: new Date('2024-02-03'),
    status: 'issued',
  },
];

export default function IssueReturnModal({
  isOpen,
  onClose,
  book,
  action,
  onIssue,
  onReturn,
}: IssueReturnModalProps) {
  const [borrowerId, setBorrowerId] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerType, setBorrowerType] = useState<'student' | 'teacher'>('student');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [returnCondition, setReturnCondition] = useState<'good' | 'damaged' | 'lost'>('good');
  const [notes, setNotes] = useState('');

  if (!isOpen || !book) return null;

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onIssue) {
      onIssue({
        bookId: book.id,
        borrowerId,
        borrowerType,
        dueDate: new Date(dueDate),
      });
    }
    
    // Reset form and close modal
    setBorrowerId('');
    setBorrowerName('');
    setBorrowerType('student');
    onClose();
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onReturn) {
      const issue = mockActiveIssues.find(issue => issue.bookId === book.id);
      if (issue) {
        onReturn({
          issueId: issue.id,
          returnDate: new Date(),
          condition: returnCondition,
          notes,
        });
      }
    }
    
    // Reset form and close modal
    setReturnCondition('good');
    setNotes('');
    onClose();
  };

  const calculateFine = () => {
    if (action === 'return' && book.status === 'borrowed') {
      const issue = mockActiveIssues.find(issue => issue.bookId === book.id);
      if (issue && issue.dueDate) {
        const today = new Date();
        const dueDate = new Date(issue.dueDate);
        const daysLate = Math.max(0, Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
        return daysLate * 5; // $5 per day late
      }
    }
    return 0;
  };

  const fineAmount = calculateFine();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {action === 'issue' ? 'Issue Book' : 'Return Book'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
            <h4 className="font-medium text-gray-900 dark:text-white">{book.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              by {book.author} • ISBN: {book.isbn}
            </p>
          </div>

          {action === 'issue' ? (
            <form onSubmit={handleIssueSubmit} className="space-y-4">
              <div>
                <Label htmlFor="borrowerId">Borrower ID *</Label>
                <Input
                  id="borrowerId"
                  type="text"
                  value={borrowerId}
                  onChange={(e) => setBorrowerId(e.target.value)}
                  placeholder="e.g., STU001 or TEA001"
                  required
                />
              </div>

              <div>
                <Label htmlFor="borrowerName">Borrower Name *</Label>
                <Input
                  id="borrowerName"
                  type="text"
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  placeholder="Enter borrower's full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="borrowerType">Borrower Type *</Label>
                <select
                  id="borrowerType"
                  value={borrowerType}
                  onChange={(e) => setBorrowerType(e.target.value as 'student' | 'teacher')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Issue Book
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleReturnSubmit} className="space-y-4">
              {fineAmount > 0 && (
                <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg dark:bg-yellow-900 dark:border-yellow-700">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Late Return Fine: ${fineAmount}
                  </p>
                </div>
              )}

              <div>
                <Label htmlFor="returnCondition">Book Condition *</Label>
                <select
                  id="returnCondition"
                  value={returnCondition}
                  onChange={(e) => setReturnCondition(e.target.value as 'good' | 'damaged' | 'lost')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                >
                  <option value="good">Good</option>
                  <option value="damaged">Damaged</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes about the return..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Return Book
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}