export interface FeeCategory {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeeStructure {
  id: string;
  categoryId: string;
  categoryName: string;
  classId?: string;
  className?: string;
  studentId?: string;
  studentName?: string;
  amount: number;
  dueDate: Date;
  academicYear: string;
  term: 'term1' | 'term2' | 'term3' | 'annual';
  isRecurring: boolean;
  recurrenceType?: 'monthly' | 'quarterly' | 'yearly';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  className: string;
  feeStructures: FeeStructure[];
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'paid' | 'pending' | 'partial' | 'overdue';
  issueDate: Date;
  dueDate: Date;
  academicYear: string;
  term: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  invoiceId: string;
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'cash' | 'bank_transfer' | 'credit_card' | 'debit_card' | 'online';
  referenceNumber?: string;
  bankName?: string;
  transactionId?: string;
  status: 'success' | 'pending' | 'failed' | 'refunded';
  notes?: string;
  collectedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFeeCategoryData {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface UpdateFeeCategoryData {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface CreateFeeStructureData {
  categoryId: string;
  classId?: string;
  studentId?: string;
  amount: number;
  dueDate: Date;
  academicYear: string;
  term: 'term1' | 'term2' | 'term3' | 'annual';
  isRecurring: boolean;
  recurrenceType?: 'monthly' | 'quarterly' | 'yearly';
  isActive: boolean;
}

export interface UpdateFeeStructureData {
  categoryId?: string;
  classId?: string;
  studentId?: string;
  amount?: number;
  dueDate?: Date;
  academicYear?: string;
  term?: 'term1' | 'term2' | 'term3' | 'annual';
  isRecurring?: boolean;
  recurrenceType?: 'monthly' | 'quarterly' | 'yearly';
  isActive?: boolean;
}

export interface CreatePaymentData {
  invoiceId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'cash' | 'bank_transfer' | 'credit_card' | 'debit_card' | 'online';
  referenceNumber?: string;
  bankName?: string;
  transactionId?: string;
  notes?: string;
  collectedBy: string;
}

export interface UpdatePaymentData {
  amount?: number;
  paymentDate?: Date;
  paymentMethod?: 'cash' | 'bank_transfer' | 'credit_card' | 'debit_card' | 'online';
  referenceNumber?: string;
  bankName?: string;
  transactionId?: string;
  status?: 'success' | 'pending' | 'failed' | 'refunded';
  notes?: string;
  collectedBy?: string;
}

export interface StudentFeeSummary {
  studentId: string;
  studentName: string;
  className: string;
  totalFees: number;
  totalPaid: number;
  totalDue: number;
  overdueAmount: number;
  status: 'paid' | 'pending' | 'partial' | 'overdue';
  recentPayment?: Payment;
  upcomingDue?: FeeStructure;
}

export interface ParentFeeView {
  studentId: string;
  studentName: string;
  className: string;
  invoices: Invoice[];
  payments: Payment[];
  totalOutstanding: number;
  upcomingDueDate?: Date;
  upcomingAmount?: number;
}