export interface BusRoute {
  id: string;
  routeName: string;
  stops: string[];
  driver: {
    name: string;
    contact: string;
  };
  vehicleNumber: string;
  capacity: number;
  assignedStudents: number;
  status: 'active' | 'inactive';
}

export interface TransportFee {
  id: string;
  routeId: string;
  routeName: string;
  feeAmount: number;
  paymentCycle: 'monthly' | 'quarterly' | 'yearly';
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue';
}

export interface StudentTransportAssignment {
  id: string;
  studentId: string;
  studentName: string;
  routeId: string;
  routeName: string;
  pickupStop: string;
  dropoffStop: string;
  assignedDate: Date;
}