'use client';

import { useState } from 'react';
import { Plus, Bus, Users, CreditCard } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusRoute, TransportFee, StudentTransportAssignment } from '@/types/transport';

// Mock data
const mockBusRoutes: BusRoute[] = [
  {
    id: '1',
    routeName: 'Route A - Downtown',
    stops: ['Main Street', 'City Center', 'School Campus'],
    driver: { name: 'John Smith', contact: '+1234567890' },
    vehicleNumber: 'ABC123',
    capacity: 30,
    assignedStudents: 25,
    status: 'active'
  },
  {
    id: '2',
    routeName: 'Route B - Suburbs',
    stops: ['Oak Avenue', 'Maple Road', 'Pine Street', 'School Campus'],
    driver: { name: 'Sarah Johnson', contact: '+0987654321' },
    vehicleNumber: 'XYZ789',
    capacity: 25,
    assignedStudents: 20,
    status: 'active'
  }
];

const mockTransportFees: TransportFee[] = [
  {
    id: '1',
    routeId: '1',
    routeName: 'Route A - Downtown',
    feeAmount: 150,
    paymentCycle: 'monthly',
    dueDate: new Date('2024-12-25'),
    status: 'pending'
  },
  {
    id: '2',
    routeId: '2',
    routeName: 'Route B - Suburbs',
    feeAmount: 120,
    paymentCycle: 'monthly',
    dueDate: new Date('2024-12-25'),
    status: 'paid'
  }
];

const mockStudentAssignments: StudentTransportAssignment[] = [
  {
    id: '1',
    studentId: '101',
    studentName: 'Alice Johnson',
    routeId: '1',
    routeName: 'Route A - Downtown',
    pickupStop: 'Main Street',
    dropoffStop: 'School Campus',
    assignedDate: new Date('2024-09-01')
  },
  {
    id: '2',
    studentId: '102',
    studentName: 'Bob Smith',
    routeId: '2',
    routeName: 'Route B - Suburbs',
    pickupStop: 'Oak Avenue',
    dropoffStop: 'School Campus',
    assignedDate: new Date('2024-09-01')
  }
];

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState<'routes' | 'students' | 'fees'>('routes');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transport Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('routes')}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            activeTab === 'routes'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Bus className="mr-2 h-4 w-4" />
          Bus Routes
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            activeTab === 'students'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Users className="mr-2 h-4 w-4" />
          Student Assignments
        </button>
        <button
          onClick={() => setActiveTab('fees')}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            activeTab === 'fees'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Transport Fees
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'routes' && (
          <Card>
            <CardHeader>
              <CardTitle>Bus Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBusRoutes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{route.routeName}</h3>
                        <p className="text-sm text-gray-600">
                          Vehicle: {route.vehicleNumber} | Driver: {route.driver.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Capacity: {route.assignedStudents}/{route.capacity} students
                        </p>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium">Stops:</h4>
                          <ul className="text-sm text-gray-600 list-disc list-inside">
                            {route.stops.map((stop, index) => (
                              <li key={index}>{stop}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          route.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {route.status}
                        </span>
                        <Button variant="primary" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'students' && (
          <Card>
            <CardHeader>
              <CardTitle>Student Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudentAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{assignment.studentName}</h3>
                        <p className="text-sm text-gray-600">
                          Route: {assignment.routeName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Pickup: {assignment.pickupStop} | Dropoff: {assignment.dropoffStop}
                        </p>
                        <p className="text-sm text-gray-600">
                          Assigned: {assignment.assignedDate.toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="primary" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'fees' && (
          <Card>
            <CardHeader>
              <CardTitle>Transport Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Route</th>
                      <th className="text-left py-2">Fee Amount</th>
                      <th className="text-left py-2">Payment Cycle</th>
                      <th className="text-left py-2">Due Date</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransportFees.map((fee) => (
                      <tr key={fee.id} className="border-b">
                        <td className="py-3">{fee.routeName}</td>
                        <td className="py-3">${fee.feeAmount}</td>
                        <td className="py-3 capitalize">{fee.paymentCycle}</td>
                        <td className="py-3">{fee.dueDate.toLocaleDateString()}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            fee.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : fee.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
