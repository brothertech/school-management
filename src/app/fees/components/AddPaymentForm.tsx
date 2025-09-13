'use client';

import { useState } from 'react';
import Button from '@/components/ui/button/Button';
import Badge from '@/components/ui/badge/Badge';
import { CreatePaymentData, Invoice } from '@/types/fee';
import { Card } from '@/components/ui/card';
import Input from '@/components/form/input/InputField';

const mockInvoices: Invoice[] = [
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    studentId: 'S002',
    studentName: 'Jane Smith',
    className: 'Grade 9B',
    feeStructures: [
      {
        id: 'FS002',
        categoryId: '1',
        categoryName: 'Tuition Fee',
        amount: 4500,
        dueDate: new Date('2024-02-15'),
        academicYear: '2023-2024',
        term: 'term2',
        isRecurring: false,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: 'FS003',
        categoryId: '2',
        categoryName: 'Examination Fee',
        amount: 1000,
        dueDate: new Date('2024-02-15'),
        academicYear: '2023-2024',
        term: 'term2',
        isRecurring: false,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
    ],
    totalAmount: 5500,
    paidAmount: 3000,
    dueAmount: 2500,
    status: 'partial',
    issueDate: new Date('2024-01-15'),
    dueDate: new Date('2024-02-15'),
    academicYear: '2023-2024',
    term: 'Term 2',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    studentId: 'S003',
    studentName: 'Mike Johnson',
    className: 'Grade 11C',
    feeStructures: [
      {
        id: 'FS004',
        categoryId: '1',
        categoryName: 'Tuition Fee',
        amount: 5500,
        dueDate: new Date('2024-02-15'),
        academicYear: '2023-2024',
        term: 'term2',
        isRecurring: false,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
    ],
    totalAmount: 5500,
    paidAmount: 0,
    dueAmount: 5500,
    status: 'pending',
    issueDate: new Date('2024-01-15'),
    dueDate: new Date('2024-02-15'),
    academicYear: '2023-2024',
    term: 'Term 2',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export default function AddPaymentForm() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentData, setPaymentData] = useState<CreatePaymentData>({
    invoiceId: '',
    amount: 0,
    paymentDate: new Date(),
    paymentMethod: 'cash',
    referenceNumber: '',
    bankName: '',
    transactionId: '',
    notes: '',
    collectedBy: 'Admin',
  });

  const filteredInvoices = mockInvoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentData({
      ...paymentData,
      invoiceId: invoice.id,
      amount: invoice.dueAmount,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInvoice && paymentData.amount > 0) {
      console.log('Processing payment:', paymentData);
      // Here you would typically send the payment data to your API
      alert(`Payment of $${paymentData.amount} recorded successfully!`);
      
      // Reset form
      setSelectedInvoice(null);
      setPaymentData({
        invoiceId: '',
        amount: 0,
        paymentDate: new Date(),
        paymentMethod: 'cash',
        referenceNumber: '',
        bankName: '',
        transactionId: '',
        notes: '',
        collectedBy: 'Admin',
      });
      setSearchTerm('');
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'partial': return 'info';
      case 'overdue': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Invoice Selection */}
      <Card>
        <h3 className="text-lg font-medium mb-4">Select Invoice</h3>
        <Input
          placeholder="Search by invoice number, student name, or class..."
          defaultValue={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedInvoice?.id === invoice.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSelectInvoice(invoice)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{invoice.invoiceNumber}</span>
                    <Badge variant={getStatusBadgeVariant(invoice.status) as 'success' | 'warning' | 'info' | 'danger' | 'secondary'}>
                      {invoice.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {invoice.studentName} - {invoice.className}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    ${invoice.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-red-600">
                    Due: ${invoice.dueAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredInvoices.length === 0 && (
            <p className="text-center text-gray-500 py-4">No invoices found</p>
          )}
        </div>
      </Card>

      {/* Payment Form */}
      {selectedInvoice && (
        <Card>
          <h3 className="text-lg font-medium mb-4">Record Payment</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number
                </label>
                <Input defaultValue={selectedInvoice.invoiceNumber} disabled />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student
                </label>
                <Input defaultValue={selectedInvoice.studentName} disabled />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Amount Due
                </label>
                <Input 
                  defaultValue={`$${selectedInvoice.dueAmount.toLocaleString()}`} 
                  disabled 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Amount *
                </label>
                <Input
                  type="number"
                  defaultValue={paymentData.amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentData({
                    ...paymentData,
                    amount: Math.max(0, Math.min(selectedInvoice.dueAmount, Number(e.target.value)))
                  })}
                  min="0"
                  max={selectedInvoice.dueAmount.toString()}
                
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Date *
                </label>
                <Input
                  type="date"
                  defaultValue={paymentData.paymentDate.toISOString().split('T')[0]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentData({
                    ...paymentData,
                    paymentDate: new Date(e.target.value)
                  })}
                 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method *
                </label>
                <select
                  value={paymentData.paymentMethod}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPaymentData({
                    ...paymentData,
                    paymentMethod: e.target.value as any
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>

              {paymentData.paymentMethod !== 'cash' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reference Number
                    </label>
                    <Input
                      defaultValue={paymentData.referenceNumber}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentData({
                        ...paymentData,
                        referenceNumber: e.target.value
                      })}
                      placeholder="Enter reference number"
                    />
                  </div>

                  {paymentData.paymentMethod === 'bank_transfer' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Name
                      </label>
                      <Input
                        defaultValue={paymentData.bankName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentData({
                          ...paymentData,
                          bankName: e.target.value
                        })}
                        placeholder="Enter bank name"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transaction ID
                    </label>
                    <Input
                      defaultValue={paymentData.transactionId}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentData({
                          ...paymentData,
                          transactionId: e.target.value
                        })}
                      placeholder="Enter transaction ID"
                    />
                  </div>
                </>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={paymentData.notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPaymentData({
                      ...paymentData,
                      notes: e.target.value
                    })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Additional notes about this payment"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
              >
                Record Payment
              </Button>
              <Button
                // type="button"
                variant="outline"
                onClick={() => setSelectedInvoice(null)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {!selectedInvoice && (
        <Card className="text-center p-8">
          <p className="text-gray-500">Select an invoice above to record a payment</p>
        </Card>
      )}
    </div>
  );
}