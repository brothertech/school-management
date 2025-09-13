'use client';

import { useState } from 'react';
import Button from '@/components/ui/button/Button';

import Badge from '@/components/ui/badge/Badge';
import { Invoice } from '@/types/fee';
import { Card } from '@/components/ui/card';
import Input from '@/components/form/input/InputField';

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    studentId: 'S001',
    studentName: 'John Doe',
    className: 'Grade 10A',
    feeStructures: [
      {
        id: 'FS001',
        categoryId: '1',
        categoryName: 'Tuition Fee',
        amount: 5000,
        dueDate: new Date('2024-02-15'),
        academicYear: '2023-2024',
        term: 'term2',
        isRecurring: false,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
    ],
    totalAmount: 5000,
    paidAmount: 5000,
    dueAmount: 0,
    status: 'paid',
    issueDate: new Date('2024-01-15'),
    dueDate: new Date('2024-02-15'),
    academicYear: '2023-2024',
    term: 'Term 2',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
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
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    studentId: 'S004',
    studentName: 'Sarah Wilson',
    className: 'Grade 8A',
    feeStructures: [
      {
        id: 'FS005',
        categoryId: '1',
        categoryName: 'Tuition Fee',
        amount: 4000,
        dueDate: new Date('2024-01-31'),
        academicYear: '2023-2024',
        term: 'term2',
        isRecurring: false,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
    ],
    totalAmount: 4000,
    paidAmount: 0,
    dueAmount: 4000,
    status: 'overdue',
    issueDate: new Date('2024-01-15'),
    dueDate: new Date('2024-01-31'),
    academicYear: '2023-2024',
    term: 'Term 2',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export default function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'solid';
      case 'pending': return 'solid';
      case 'partial': return 'solid';
      case 'overdue': return 'solid';
      default: return 'solid';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'partial': return 'info';
      case 'overdue': return 'danger';
      default: return 'secondary';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.className.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getTotalStats = () => {
    const total = invoices.length;
    const paid = invoices.filter(i => i.status === 'paid').length;
    const pending = invoices.filter(i => i.status === 'pending').length;
    const partial = invoices.filter(i => i.status === 'partial').length;
    const overdue = invoices.filter(i => i.status === 'overdue').length;
    
    return { total, paid, pending, partial, overdue };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-3 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
          <div className="text-sm text-gray-600">Paid</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.partial}</div>
          <div className="text-sm text-gray-600">Partial</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          <div className="text-sm text-gray-600">Overdue</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search by invoice, student, or class..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="partial">Partial</option>
          <option value="overdue">Overdue</option>
        </select>
        <Button variant="outline">
          Export
        </Button>
      </div>

      {/* Invoices Table */}
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.className}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${invoice.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    ${invoice.paidAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    ${invoice.dueAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusBadgeVariant(invoice.status)} color={getStatusBadgeColor(invoice.status)}>
                      {invoice.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.dueDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No invoices found.</p>
          </div>
        )}
      </Card>
    </div>
  );
}