'use client';

import { useState } from 'react';



import FeeCategories from './components/FeeCategories';
import Button from '@/components/ui/button/Button';
import { Card } from '@/components/ui/card';
import InvoiceList from './components/InvoiceList';
import AddPaymentForm from './components/AddPaymentForm';


export default function FeesPage() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'categories' | 'payments' | 'assign'>('invoices');

  const tabs = [
    { id: 'invoices', label: 'Invoices', component: <InvoiceList /> },
    { id: 'categories', label: 'Fee Categories', component: <FeeCategories /> },
    { id: 'payments', label: 'Record Payment', component: <AddPaymentForm /> },
    // { id: 'assign', label: 'Assign Fees', component: <AssignFees /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Fees & Payments</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Generate Reports
          </Button>
        </div>
      </div>

      <Card className="p-0">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </Card>
    </div>
  );
}
