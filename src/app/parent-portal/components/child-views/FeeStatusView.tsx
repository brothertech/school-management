import React from "react";
import { ChildStudent } from "@/types/parent";

interface FeeStatusViewProps {
  child: ChildStudent;
}

export default function FeeStatusView({ child }: FeeStatusViewProps) {
  const feeStatus = child.feeStatus;
  
  const totalFees = feeStatus.paidFees + feeStatus.pendingFees;
  const paidPercentage = (feeStatus.paidFees / totalFees) * 100;
  const pendingPercentage = (feeStatus.pendingFees / totalFees) * 100;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Fee Status - {child.name}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              feeStatus.pendingFees === 0 
                ? "text-green-600 dark:text-green-400" 
                : "text-red-600 dark:text-red-400"
            }`}>
              {formatCurrency(feeStatus.pendingFees)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            feeStatus.pendingFees === 0 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : feeStatus.overdueFees > 0
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}>
            {feeStatus.pendingFees === 0 ? "All Paid" : feeStatus.overdueFees > 0 ? "Overdue" : "Pending"}
          </span>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(totalFees)}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Total Fees</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(feeStatus.paidFees)}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Paid</div>
        </div>
        
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {formatCurrency(feeStatus.pendingFees)}
          </div>
          <div className="text-sm text-red-700 dark:text-red-300">Pending</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Payment Progress
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {paidPercentage.toFixed(1)}% Paid
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${paidPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
          <span>Paid: {formatCurrency(feeStatus.paidFees)}</span>
          <span>Pending: {formatCurrency(feeStatus.pendingFees)}</span>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          Fee Breakdown
        </h3>
        
        <div className="space-y-3">
          {feeStatus.feeBreakdown.map((fee, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-800 dark:text-white">
                    {fee.category}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatCurrency(fee.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {fee.dueDate}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(fee.status)}`}>
                    {fee.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
          Payment History
        </h3>
        
        <div className="space-y-2">
          {feeStatus.paymentHistory?.slice(0, 5).map((payment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {formatCurrency(payment.amount)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {payment.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {payment.date}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {payment.method}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {(!feeStatus.paymentHistory || feeStatus.paymentHistory.length === 0) && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No payment history available
          </div>
        )}
      </div>

      {/* Overdue Notice */}
      {feeStatus.overdueFees > 0 && (
        <div className="border-t border-red-200 dark:border-red-700 pt-4 mt-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                Overdue Fees Notice
              </h3>
            </div>
            <p className="text-red-700 dark:text-red-300 mt-2">
              You have {formatCurrency(feeStatus.overdueFees)} in overdue fees. Please make payment 
              as soon as possible to avoid any disruptions to {child.name}'s education.
            </p>
          </div>
        </div>
      )}

      {/* Payment Instructions */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          Payment Instructions
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          To make a payment, please visit the school office or use our online payment portal. 
          For any questions regarding fees, please contact the accounts department.
        </p>
      </div>
    </div>
  );
}